import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { EditorApiError } from "./editor-errors.js";
import { parseTripDocument } from "./trip-document.js";

const execFileAsync = promisify(execFile);
const AZURE_OPENAI_RESOURCE = "https://cognitiveservices.azure.com/";
const MAX_TRANSLATION_FIELDS = 100;
const PROTECTED_TOKEN_PATTERNS = [
  ["url", /https?:\/\/[^\s<>"']+/giu],
  ["filename", /\b[A-Za-z0-9._-]+\.(?:avif|gif|jpe?g|png|webp)\b/giu],
  ["date", /\b\d{4}[-./]\d{1,2}(?:[-./]\d{1,2})?\b/gu],
  ["time", /\b\d{1,2}:\d{2}(?::\d{2})?\b/gu],
  ["currency", /[$€£¥]|(?:CNY|EUR|GBP|JPY|RMB|THB|USD)\b/gu],
  ["number", /\d+(?:[.,]\d+)*/gu],
  ["emoji", /\p{Extended_Pictographic}\uFE0F?/gu],
];

function isRecord(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isLocalizedText(value) {
  if (!isRecord(value)) return false;
  const keys = Object.keys(value).sort();
  return (
    keys.length === 2 &&
    keys[0] === "en" &&
    keys[1] === "zh" &&
    typeof value.zh === "string" &&
    typeof value.en === "string"
  );
}

function itemPath(path, item, index) {
  return isRecord(item) && typeof item.id === "string"
    ? `${path}[id=${item.id}]`
    : `${path}[${index}]`;
}

export function collectLocalizedFields(document) {
  const fields = [];

  function visit(value, path, ancestorIds) {
    if (isLocalizedText(value)) {
      fields.push({
        id: ancestorIds.join("/") || "document",
        path,
        target: value,
        text: value.zh,
      });
      return;
    }
    if (Array.isArray(value)) {
      value.forEach((item, index) =>
        visit(item, itemPath(path, item, index), ancestorIds)
      );
      return;
    }
    if (!isRecord(value)) return;

    const ids =
      typeof value.id === "string"
        ? [...ancestorIds, value.id]
        : ancestorIds;
    for (const [key, child] of Object.entries(value)) {
      visit(child, `${path}.${key}`, ids);
    }
  }

  visit(document, "$", []);
  return fields;
}

function selectChangedFields(document, changedPaths) {
  if (!Array.isArray(changedPaths)) {
    throw new EditorApiError(
      400,
      "invalid_translation_paths",
      "changedPaths must be an array."
    );
  }
  if (changedPaths.length > MAX_TRANSLATION_FIELDS) {
    throw new EditorApiError(
      413,
      "too_many_translation_fields",
      `No more than ${MAX_TRANSLATION_FIELDS} fields can be translated at once.`
    );
  }

  const available = new Map(
    collectLocalizedFields(document).map((field) => [field.path, field])
  );
  const selected = [];
  const seen = new Set();
  for (const path of changedPaths) {
    if (typeof path !== "string" || !available.has(path)) {
      throw new EditorApiError(
        422,
        "unknown_translation_path",
        `The translatable field path "${String(path)}" does not exist.`
      );
    }
    if (seen.has(path)) {
      throw new EditorApiError(
        422,
        "duplicate_translation_path",
        `The translatable field path "${path}" was provided more than once.`
      );
    }
    seen.add(path);
    selected.push(available.get(path));
  }
  return selected;
}

function translationResponseSchema() {
  return {
    name: "travel_journal_translations",
    strict: true,
    schema: {
      type: "object",
      properties: {
        translations: {
          type: "array",
          items: {
            type: "object",
            properties: {
              path: { type: "string" },
              id: { type: "string" },
              text: { type: "string" },
            },
            required: ["path", "id", "text"],
            additionalProperties: false,
          },
        },
      },
      required: ["translations"],
      additionalProperties: false,
    },
  };
}

function literalCount(text, value) {
  let count = 0;
  let index = 0;
  while ((index = text.indexOf(value, index)) !== -1) {
    count += 1;
    index += value.length;
  }
  return count;
}

function protectedTokenCounts(text, protectedLiterals = []) {
  const counts = new Map();
  for (const [kind, pattern] of PROTECTED_TOKEN_PATTERNS) {
    for (const match of text.matchAll(pattern)) {
      const token = `${kind}:${match[0]}`;
      counts.set(token, (counts.get(token) ?? 0) + 1);
    }
  }
  for (const literal of protectedLiterals) {
    const count = literalCount(text, literal);
    if (count > 0) counts.set(`literal:${literal}`, count);
  }
  return counts;
}

function sameTokenCounts(left, right) {
  if (left.size !== right.size) return false;
  for (const [token, count] of left) {
    if (right.get(token) !== count) return false;
  }
  return true;
}

async function defaultAzureOpenAiTokenProvider(
  config,
  { environment = process.env, fetchImpl = fetch } = {}
) {
  if (environment.AZURE_FUNCTIONS_ENVIRONMENT === "Development") {
    let stdout;
    try {
      const executable =
        process.platform === "win32"
          ? environment.ComSpec || "cmd.exe"
          : "az";
      const arguments_ =
        process.platform === "win32"
          ? [
              "/d",
              "/s",
              "/c",
              `az account get-access-token --resource ${AZURE_OPENAI_RESOURCE} --output json`,
            ]
          : [
              "account",
              "get-access-token",
              "--resource",
              AZURE_OPENAI_RESOURCE,
              "--output",
              "json",
            ];
      ({ stdout } = await execFileAsync(executable, arguments_, {
        encoding: "utf8",
        timeout: 15_000,
        windowsHide: true,
      }));
      const token = JSON.parse(stdout).accessToken;
      if (typeof token !== "string" || !token) throw new Error("Missing token.");
      return token;
    } catch {
      throw new EditorApiError(
        503,
        "translation_authentication_failed",
        "Azure CLI authentication is required for local translation."
      );
    }
  }

  const endpoint = environment.IDENTITY_ENDPOINT;
  const identityHeader = environment.IDENTITY_HEADER;
  if (!endpoint || !identityHeader) {
    throw new EditorApiError(
      503,
      "translation_authentication_failed",
      "The Function managed identity is unavailable for Azure OpenAI."
    );
  }

  const url = new URL(endpoint);
  url.searchParams.set("api-version", "2019-08-01");
  url.searchParams.set("resource", AZURE_OPENAI_RESOURCE);
  if (config.azureOpenAiManagedIdentityClientId) {
    url.searchParams.set(
      "client_id",
      config.azureOpenAiManagedIdentityClientId
    );
  }

  let response;
  try {
    response = await fetchImpl(url, {
      headers: {
        "X-IDENTITY-HEADER": identityHeader,
        Metadata: "true",
      },
      signal: AbortSignal.timeout(10_000),
    });
  } catch {
    throw new EditorApiError(
      503,
      "translation_authentication_failed",
      "The Function managed identity is unavailable for Azure OpenAI."
    );
  }
  if (!response.ok) {
    throw new EditorApiError(
      503,
      "translation_authentication_failed",
      "The Function managed identity could not authorize Azure OpenAI."
    );
  }

  const payload = await response.json();
  if (typeof payload.access_token !== "string" || !payload.access_token) {
    throw new EditorApiError(
      502,
      "translation_authentication_failed",
      "Managed identity returned an invalid Azure OpenAI token."
    );
  }
  return payload.access_token;
}

export function validateTranslationResult(
  value,
  expectedFields,
  protectedLiterals = []
) {
  if (
    !isRecord(value) ||
    Object.keys(value).length !== 1 ||
    !Array.isArray(value.translations) ||
    value.translations.length !== expectedFields.length
  ) {
    throw new EditorApiError(
      502,
      "translation_shape_mismatch",
      "Azure OpenAI returned a translation with the wrong field cardinality."
    );
  }

  return value.translations.map((translation, index) => {
    const expected = expectedFields[index];
    if (
      !isRecord(translation) ||
      Object.keys(translation).sort().join(",") !== "id,path,text" ||
      translation.path !== expected.path ||
      translation.id !== expected.id ||
      typeof translation.text !== "string" ||
      translation.text.trim().length === 0
    ) {
      throw new EditorApiError(
        502,
        "translation_shape_mismatch",
        "Azure OpenAI changed a field path, ID, order, or value shape."
      );
    }
    if (
      !sameTokenCounts(
        protectedTokenCounts(expected.text, protectedLiterals),
        protectedTokenCounts(translation.text, protectedLiterals)
      )
    ) {
      throw new EditorApiError(
        502,
        "translation_content_mismatch",
        "Azure OpenAI changed a protected URL, filename, date, time, number, currency, or emoji."
      );
    }
    return translation;
  });
}

export class AzureOpenAiTranslator {
  constructor(
    config,
    {
      fetchImpl = fetch,
      tokenProvider = defaultAzureOpenAiTokenProvider,
    } = {}
  ) {
    this.config = config;
    this.fetch = fetchImpl;
    this.tokenProvider = tokenProvider;
  }

  async translateDocument(document, changedPaths) {
    const translatedDocument = structuredClone(
      parseTripDocument(document, { allowEmptyEnglish: true })
    );
    const fields = selectChangedFields(translatedDocument, changedPaths);
    if (fields.length === 0) {
      return parseTripDocument(translatedDocument);
    }

    const endpoint = new URL(
      `/openai/deployments/${encodeURIComponent(
        this.config.azureOpenAiDeployment
      )}/chat/completions`,
      this.config.azureOpenAiEndpoint
    );
    endpoint.searchParams.set(
      "api-version",
      this.config.azureOpenAiApiVersion
    );

    let response;
    try {
      const authenticationHeaders = this.config.azureOpenAiApiKey
        ? { "api-key": this.config.azureOpenAiApiKey }
        : {
            Authorization: `Bearer ${await this.tokenProvider(this.config, {
              fetchImpl: this.fetch,
            })}`,
          };
      response = await this.fetch(endpoint, {
        method: "POST",
        headers: {
          ...authenticationHeaders,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [
            {
              role: "system",
              content:
                "Translate travel-journal text from Simplified Chinese into natural English. Return every item exactly once, in the original order, with path and id unchanged. Preserve filenames, URLs, IDs, dates, times, numbers, amounts, currencies, emoji, and established place names unless the Chinese text explicitly localizes a display name. Do not add facts or commentary.",
            },
            {
              role: "user",
              content: JSON.stringify({
                translations: fields.map(({ id, path, text }) => ({
                  id,
                  path,
                  text,
                })),
              }),
            },
          ],
          response_format: {
            type: "json_schema",
            json_schema: translationResponseSchema(),
          },
        }),
        signal: AbortSignal.timeout(45_000),
      });
    } catch (error) {
      if (error instanceof EditorApiError) throw error;
      throw new EditorApiError(
        503,
        "translation_unavailable",
        "Azure OpenAI is unavailable."
      );
    }

    if (!response.ok) {
      throw new EditorApiError(
        502,
        "translation_failed",
        "Azure OpenAI rejected the translation request."
      );
    }

    let modelResult;
    try {
      const payload = await response.json();
      const choice = payload?.choices?.[0];
      if (typeof choice?.message?.refusal === "string") {
        throw new EditorApiError(
          502,
          "translation_refused",
          "Azure OpenAI refused the translation request."
        );
      }
      if (choice?.finish_reason !== "stop") {
        throw new EditorApiError(
          502,
          "translation_incomplete",
          "Azure OpenAI did not complete the translation."
        );
      }
      const content = choice.message?.content;
      if (typeof content !== "string") throw new Error("Missing content.");
      modelResult = JSON.parse(content);
    } catch (error) {
      if (error instanceof EditorApiError) throw error;
      throw new EditorApiError(
        502,
        "translation_invalid_response",
        "Azure OpenAI returned an unreadable translation."
      );
    }

    const translations = validateTranslationResult(
      modelResult,
      fields,
      translatedDocument.images.map((image) => image.filename)
    );
    translations.forEach((translation, index) => {
      fields[index].target.en = translation.text;
    });
    return parseTripDocument(translatedDocument);
  }
}
