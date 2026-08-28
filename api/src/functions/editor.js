import { app } from "@azure/functions";
import { loadEditorConfig } from "../config.js";
import { authorizeEditorRequest } from "../editor-auth.js";
import { EditorApiError, isEditorApiError } from "../editor-errors.js";
import { AzureStorageImageService } from "../editor-storage.js";
import { AzureOpenAiTranslator } from "../editor-translation.js";
import { GitHubEditorRepository } from "../github-editor-repository.js";
import {
  assertDocumentSlug,
  isValidTripSlug,
  parseTripDocument,
} from "../trip-document.js";

const DOCUMENT_REQUEST_LIMIT = 2 * 1024 * 1024;
const IMAGE_REQUEST_LIMIT = 128 * 1024;
const SIMPLE_REQUEST_LIMIT = 16 * 1024;

function corsHeaders(allowedOrigin) {
  return {
    "Access-Control-Allow-Headers": "Authorization, Content-Type",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Max-Age": "600",
    "Cache-Control": "no-store",
    "Content-Type": "application/json; charset=utf-8",
    Pragma: "no-cache",
    Vary: "Origin",
  };
}

function response(status, headers, jsonBody) {
  return { status, headers, jsonBody };
}

function errorResponse(error, headers) {
  return response(error.status, headers, {
    error: {
      code: error.code,
      message: error.message,
      ...(error.details === undefined ? {} : { details: error.details }),
    },
  });
}

function assertExactObject(value, keys, name = "request") {
  if (
    typeof value !== "object" ||
    value === null ||
    Array.isArray(value) ||
    Object.keys(value).some((key) => !keys.includes(key)) ||
    keys.some((key) => !(key in value))
  ) {
    throw new EditorApiError(
      400,
      "invalid_request",
      `The ${name} body has missing or unsupported fields.`
    );
  }
  return value;
}

async function readJsonBody(request, maximumBytes) {
  const contentType = request.headers.get("content-type") ?? "";
  if (!/^application\/json(?:\s*;|$)/iu.test(contentType)) {
    throw new EditorApiError(
      415,
      "json_content_type_required",
      "Content-Type must be application/json."
    );
  }

  const declaredLength = Number(request.headers.get("content-length"));
  if (
    Number.isFinite(declaredLength) &&
    declaredLength > maximumBytes
  ) {
    throw new EditorApiError(
      413,
      "request_too_large",
      `The request body cannot exceed ${maximumBytes} bytes.`
    );
  }

  let source;
  try {
    source = await request.text();
  } catch {
    throw new EditorApiError(
      400,
      "invalid_json",
      "The request body could not be read."
    );
  }
  if (Buffer.byteLength(source, "utf8") > maximumBytes) {
    throw new EditorApiError(
      413,
      "request_too_large",
      `The request body cannot exceed ${maximumBytes} bytes.`
    );
  }
  try {
    return JSON.parse(source);
  } catch {
    throw new EditorApiError(
      400,
      "invalid_json",
      "The request body must contain valid JSON."
    );
  }
}

function requestSlug(request) {
  const slug = request.params?.slug;
  if (!isValidTripSlug(slug)) {
    throw new EditorApiError(
      404,
      "trip_not_registered",
      "Only an already-registered trip can be edited."
    );
  }
  return slug;
}

function defaultServices(config) {
  return {
    repository: new GitHubEditorRepository(config),
    storage: new AzureStorageImageService(config),
    translator: new AzureOpenAiTranslator(config),
  };
}

export function createEditorHandlers({
  authorize = authorizeEditorRequest,
  getConfig = loadEditorConfig,
  services,
  serviceFactory = defaultServices,
} = {}) {
  let cachedServices = services;

  async function execute(request, context, allowedMethod, action) {
    let config;
    try {
      config = getConfig();
    } catch (error) {
      context.error("Editor API configuration is invalid.", error);
      return errorResponse(
        new EditorApiError(
          500,
          "editor_service_not_configured",
          "The editor service is not configured."
        ),
        { "Cache-Control": "no-store" }
      );
    }

    const headers = corsHeaders(config.allowedOrigin);
    if (request.headers.get("origin") !== config.allowedOrigin) {
      return errorResponse(
        new EditorApiError(
          403,
          "origin_forbidden",
          "Origin is not allowed."
        ),
        headers
      );
    }
    if (request.method === "OPTIONS") {
      return response(204, headers);
    }
    if (request.method !== allowedMethod) {
      return errorResponse(
        new EditorApiError(
          405,
          "method_not_allowed",
          "The request method is not allowed."
        ),
        { ...headers, Allow: `${allowedMethod}, OPTIONS` }
      );
    }

    try {
      await authorize(request, config);
    } catch (error) {
      const authError = isEditorApiError(error)
        ? error
        : new EditorApiError(
            401,
            "editor_authentication_failed",
            "Microsoft editor authentication failed."
          );
      context.warn("Editor authorization failed.", {
        code: authError.code,
      });
      return errorResponse(authError, headers);
    }

    try {
      cachedServices ??= serviceFactory(config);
      const result = await action(cachedServices);
      return response(result.status ?? 200, headers, result.jsonBody);
    } catch (error) {
      if (isEditorApiError(error)) {
        if (error.status >= 500) {
          context.error("Editor API dependency failed.", {
            code: error.code,
          });
        } else {
          context.warn("Editor API request was rejected.", {
            code: error.code,
          });
        }
        return errorResponse(error, headers);
      }
      context.error("Editor API request failed.", error);
      return errorResponse(
        new EditorApiError(
          500,
          "editor_request_failed",
          "The editor request could not be completed."
        ),
        headers
      );
    }
  }

  return {
    listTrips(request, context) {
      return execute(request, context, "GET", async ({ repository }) => ({
        jsonBody: await repository.listTrips(),
      }));
    },

    loadTrip(request, context) {
      return execute(request, context, "GET", async ({ repository }) => ({
        jsonBody: await repository.loadTrip(requestSlug(request)),
      }));
    },

    translateTrip(request, context) {
      return execute(
        request,
        context,
        "POST",
        async ({ repository, translator }) => {
          const slug = requestSlug(request);
          const body = assertExactObject(
            await readJsonBody(request, DOCUMENT_REQUEST_LIMIT),
            ["baseSha", "baseBlobSha", "document", "changedPaths"],
            "translation request"
          );
          const document = parseTripDocument(body.document, {
            allowEmptyEnglish: true,
          });
          assertDocumentSlug(document, slug);
          await repository.assertDraftBase(
            slug,
            body.baseSha,
            body.baseBlobSha
          );
          return {
            jsonBody: {
              baseSha: body.baseSha,
              baseBlobSha: body.baseBlobSha,
              document: await translator.translateDocument(
                document,
                body.changedPaths
              ),
            },
          };
        }
      );
    },

    createUpload(request, context) {
      return execute(
        request,
        context,
        "POST",
        async ({ repository, storage }) => {
          const slug = requestSlug(request);
          const body = assertExactObject(
            await readJsonBody(request, SIMPLE_REQUEST_LIMIT),
            ["filename", "mimeType", "size"],
            "upload request"
          );
          const snapshot = await repository.loadTrip(slug);
          return {
            jsonBody: {
              baseSha: snapshot.baseSha,
              baseBlobSha: snapshot.blobSha,
              upload: await storage.issueUpload(slug, body),
            },
          };
        }
      );
    },

    verifyImages(request, context) {
      return execute(
        request,
        context,
        "POST",
        async ({ repository, storage }) => {
          const slug = requestSlug(request);
          const body = assertExactObject(
            await readJsonBody(request, IMAGE_REQUEST_LIMIT),
            ["files"],
            "image verification request"
          );
          await repository.loadTrip(slug);
          return {
            jsonBody: {
              verified: await storage.verifyFiles(slug, body.files),
            },
          };
        }
      );
    },

    publishTrip(request, context) {
      return execute(
        request,
        context,
        "POST",
        async ({ repository, storage }) => {
          const slug = requestSlug(request);
          const body = assertExactObject(
            await readJsonBody(request, DOCUMENT_REQUEST_LIMIT),
            ["approved", "baseSha", "baseBlobSha", "document"],
            "publish request"
          );
          if (body.approved !== true) {
            throw new EditorApiError(
              409,
              "publish_approval_required",
              "Explicit bilingual preview approval is required before publishing."
            );
          }
          const document = parseTripDocument(body.document);
          assertDocumentSlug(document, slug);
          await repository.assertDraftBase(
            slug,
            body.baseSha,
            body.baseBlobSha
          );
          await storage.verifyDocumentImages(document);
          return {
            status: 201,
            jsonBody: await repository.publishTrip({
              slug,
              document,
              baseSha: body.baseSha,
              baseBlobSha: body.baseBlobSha,
            }),
          };
        }
      );
    },
  };
}

const handlers = createEditorHandlers();

app.http("editor-list-trips", {
  authLevel: "anonymous",
  handler: handlers.listTrips,
  methods: ["GET", "OPTIONS"],
  route: "editor/trips",
});

app.http("editor-load-trip", {
  authLevel: "anonymous",
  handler: handlers.loadTrip,
  methods: ["GET", "OPTIONS"],
  route: "editor/trips/{slug}",
});

app.http("editor-translate-trip", {
  authLevel: "anonymous",
  handler: handlers.translateTrip,
  methods: ["POST", "OPTIONS"],
  route: "editor/trips/{slug}/translate",
});

app.http("editor-create-upload", {
  authLevel: "anonymous",
  handler: handlers.createUpload,
  methods: ["POST", "OPTIONS"],
  route: "editor/trips/{slug}/uploads",
});

app.http("editor-verify-images", {
  authLevel: "anonymous",
  handler: handlers.verifyImages,
  methods: ["POST", "OPTIONS"],
  route: "editor/trips/{slug}/images/verify",
});

app.http("editor-publish-trip", {
  authLevel: "anonymous",
  handler: handlers.publishTrip,
  methods: ["POST", "OPTIONS"],
  route: "editor/trips/{slug}/publish",
});
