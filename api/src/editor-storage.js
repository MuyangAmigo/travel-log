import { createHmac } from "node:crypto";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { EditorApiError } from "./editor-errors.js";

const execFileAsync = promisify(execFile);
const STORAGE_API_VERSION = "2023-11-03";
const MAX_IMAGE_BYTES = 50 * 1024 * 1024;
const UPLOAD_LIFETIME_MS = 10 * 60 * 1000;
const DELEGATION_KEY_LIFETIME_MS = 60 * 60 * 1000;
const SAFE_UPLOAD_FILENAME_PATTERN =
  /^[A-Za-z0-9](?:[A-Za-z0-9._-]{0,158}[A-Za-z0-9])?\.(?:avif|gif|jpe?g|png|webp)$/u;
const EXISTING_FILENAME_PATTERN =
  /^(?!\.{1,2}$)[^\\/:*?"<>|\u0000-\u001f]+\.(?:avif|gif|jpe?g|png|webp)$/iu;
const MIME_BY_EXTENSION = new Map([
  ["avif", "image/avif"],
  ["gif", "image/gif"],
  ["jpeg", "image/jpeg"],
  ["jpg", "image/jpeg"],
  ["png", "image/png"],
  ["webp", "image/webp"],
]);

function xmlValue(xml, tag) {
  const match = new RegExp(`<${tag}>([^<]+)</${tag}>`, "u").exec(xml);
  if (!match) {
    throw new EditorApiError(
      502,
      "storage_invalid_response",
      "Azure Storage returned an invalid delegation key."
    );
  }
  return match[1];
}

function parseDelegationKey(xml) {
  return {
    signedObjectId: xmlValue(xml, "SignedOid"),
    signedTenantId: xmlValue(xml, "SignedTid"),
    signedStartsOn: xmlValue(xml, "SignedStart"),
    signedExpiresOn: xmlValue(xml, "SignedExpiry"),
    signedService: xmlValue(xml, "SignedService"),
    signedVersion: xmlValue(xml, "SignedVersion"),
    value: xmlValue(xml, "Value"),
  };
}

function formatStorageDate(date) {
  return date.toISOString().replace(".000Z", "Z");
}

function extensionFor(filename) {
  return filename.slice(filename.lastIndexOf(".") + 1).toLowerCase();
}

function expectedMimeType(filename) {
  return MIME_BY_EXTENSION.get(extensionFor(filename));
}

function normalizeMimeType(value) {
  if (typeof value !== "string") return "";
  const mimeType = value.split(";", 1)[0].trim().toLowerCase();
  return mimeType === "image/jpg" ? "image/jpeg" : mimeType;
}

async function mapWithConcurrency(values, limit, callback) {
  const results = new Array(values.length);
  let nextIndex = 0;
  async function worker() {
    while (nextIndex < values.length) {
      const index = nextIndex;
      nextIndex += 1;
      results[index] = await callback(values[index], index);
    }
  }
  await Promise.all(
    Array.from({ length: Math.min(limit, values.length) }, () => worker())
  );
  return results;
}

export function normalizeUploadFilename(filename) {
  if (typeof filename !== "string") {
    throw new EditorApiError(
      400,
      "invalid_image_filename",
      "An image filename is required."
    );
  }
  if (/[\\/\u0000-\u001f]/u.test(filename)) {
    throw new EditorApiError(
      400,
      "invalid_image_filename",
      "Image filenames cannot contain a path or control characters."
    );
  }
  const normalized = filename.normalize("NFKC").trim();
  const dot = normalized.lastIndexOf(".");
  if (dot <= 0) {
    throw new EditorApiError(
      415,
      "unsupported_image_type",
      "The image filename must include a supported extension."
    );
  }
  const extension = normalized.slice(dot + 1).toLowerCase();
  if (!MIME_BY_EXTENSION.has(extension)) {
    throw new EditorApiError(
      415,
      "unsupported_image_type",
      "The image extension is not supported."
    );
  }
  const base = normalized
    .slice(0, dot)
    .replace(/\s+/gu, "-")
    .replace(/[^A-Za-z0-9._-]+/gu, "-")
    .replace(/-{2,}/gu, "-")
    .replace(/^[._-]+|[._-]+$/gu, "");
  const result = `${base}.${extension}`;
  if (!SAFE_UPLOAD_FILENAME_PATTERN.test(result)) {
    throw new EditorApiError(
      400,
      "invalid_image_filename",
      "The normalized image filename is empty or too long."
    );
  }
  return result;
}

function validateImageDescriptor(
  descriptor,
  { requireSafeFilename, requireSize = true } = {}
) {
  if (
    typeof descriptor !== "object" ||
    descriptor === null ||
    Array.isArray(descriptor)
  ) {
    throw new EditorApiError(
      400,
      "invalid_image",
      "Each image must be an object."
    );
  }
  const allowedKeys = requireSize
    ? ["filename", "mimeType", "size"]
    : ["filename"];
  if (Object.keys(descriptor).some((key) => !allowedKeys.includes(key))) {
    throw new EditorApiError(
      400,
      "invalid_image",
      "The image contains unsupported fields."
    );
  }

  const filename = requireSafeFilename
    ? normalizeUploadFilename(descriptor.filename)
    : descriptor.filename;
  if (
    !requireSafeFilename &&
    (typeof filename !== "string" ||
      filename.length > 180 ||
      !EXISTING_FILENAME_PATTERN.test(filename))
  ) {
    throw new EditorApiError(
      422,
      "invalid_image_filename",
      "A referenced image filename is invalid."
    );
  }

  const expectedMime = expectedMimeType(filename);
  if (!expectedMime) {
    throw new EditorApiError(
      415,
      "unsupported_image_type",
      "The image type is not supported."
    );
  }
  if (!requireSize) return { filename, expectedMime };

  const mimeType = normalizeMimeType(descriptor.mimeType);
  if (mimeType !== expectedMime) {
    throw new EditorApiError(
      415,
      "image_type_mismatch",
      "The image MIME type does not match its filename."
    );
  }
  if (
    !Number.isSafeInteger(descriptor.size) ||
    descriptor.size <= 0 ||
    descriptor.size > MAX_IMAGE_BYTES
  ) {
    throw new EditorApiError(
      413,
      "image_size_invalid",
      `Images must be between 1 byte and ${MAX_IMAGE_BYTES} bytes.`
    );
  }
  return {
    filename,
    mimeType,
    size: descriptor.size,
  };
}

async function defaultStorageTokenProvider(config, environment = process.env) {
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
              "az account get-access-token --resource https://storage.azure.com/ --output json",
            ]
          : [
              "account",
              "get-access-token",
              "--resource",
              "https://storage.azure.com/",
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
        "storage_authentication_failed",
        "Azure CLI authentication is required for local image uploads."
      );
    }
  }

  const endpoint = environment.IDENTITY_ENDPOINT;
  const identityHeader = environment.IDENTITY_HEADER;
  if (!endpoint || !identityHeader) {
    throw new EditorApiError(
      503,
      "storage_authentication_failed",
      "The Function managed identity is unavailable."
    );
  }
  const url = new URL(endpoint);
  url.searchParams.set("api-version", "2019-08-01");
  url.searchParams.set("resource", "https://storage.azure.com/");
  if (config.storageManagedIdentityClientId) {
    url.searchParams.set("client_id", config.storageManagedIdentityClientId);
  }

  let response;
  try {
    response = await fetch(url, {
      headers: {
        "X-IDENTITY-HEADER": identityHeader,
        Metadata: "true",
      },
      signal: AbortSignal.timeout(10_000),
    });
  } catch {
    throw new EditorApiError(
      503,
      "storage_authentication_failed",
      "The Function managed identity is unavailable."
    );
  }
  if (!response.ok) {
    throw new EditorApiError(
      503,
      "storage_authentication_failed",
      "The Function managed identity could not authorize storage."
    );
  }
  const payload = await response.json();
  if (typeof payload.access_token !== "string" || !payload.access_token) {
    throw new EditorApiError(
      502,
      "storage_invalid_response",
      "Managed identity returned an invalid storage token."
    );
  }
  return payload.access_token;
}

export function createUserDelegationBlobSas({
  accountName,
  blobPath,
  containerName,
  delegationKey,
  expiresOn,
  startsOn,
}) {
  const signedPermissions = "c";
  const signedProtocol = "https";
  const signedResource = "b";
  const canonicalizedResource = `/blob/${accountName}/${containerName}/${blobPath}`;
  const fields = [
    signedPermissions,
    startsOn,
    expiresOn,
    canonicalizedResource,
    delegationKey.signedObjectId,
    delegationKey.signedTenantId,
    delegationKey.signedStartsOn,
    delegationKey.signedExpiresOn,
    delegationKey.signedService,
    delegationKey.signedVersion,
    "",
    "",
    "",
    "",
    signedProtocol,
    STORAGE_API_VERSION,
    signedResource,
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ];
  const signature = createHmac(
    "sha256",
    Buffer.from(delegationKey.value, "base64")
  )
    .update(fields.join("\n"), "utf8")
    .digest("base64");
  return new URLSearchParams({
    sp: signedPermissions,
    st: startsOn,
    se: expiresOn,
    skoid: delegationKey.signedObjectId,
    sktid: delegationKey.signedTenantId,
    skt: delegationKey.signedStartsOn,
    ske: delegationKey.signedExpiresOn,
    sks: delegationKey.signedService,
    skv: delegationKey.signedVersion,
    spr: signedProtocol,
    sv: STORAGE_API_VERSION,
    sr: signedResource,
    sig: signature,
  }).toString();
}

export class AzureStorageImageService {
  constructor(
    config,
    {
      fetchImpl = fetch,
      now = () => Date.now(),
      tokenProvider = defaultStorageTokenProvider,
    } = {}
  ) {
    this.config = config;
    this.fetch = fetchImpl;
    this.now = now;
    this.tokenProvider = tokenProvider;
    this.delegationKey = null;
  }

  blobUrl(slug, filename) {
    return `https://${this.config.storageAccountName}.blob.core.windows.net/${
      this.config.storageContainerName
    }/travel/${encodeURIComponent(slug)}/${encodeURIComponent(filename)}`;
  }

  async headBlob(slug, filename) {
    let response;
    try {
      response = await this.fetch(this.blobUrl(slug, filename), {
        method: "HEAD",
        cache: "no-store",
        signal: AbortSignal.timeout(15_000),
      });
    } catch {
      throw new EditorApiError(
        503,
        "storage_unavailable",
        "Azure Blob Storage is unavailable."
      );
    }
    return response;
  }

  async getDelegationKey() {
    if (
      this.delegationKey &&
      Date.parse(this.delegationKey.signedExpiresOn) >
        this.now() + UPLOAD_LIFETIME_MS + 60_000
    ) {
      return this.delegationKey;
    }

    const startsOn = formatStorageDate(new Date(this.now() - 5 * 60 * 1000));
    const expiresOn = formatStorageDate(
      new Date(this.now() + DELEGATION_KEY_LIFETIME_MS)
    );
    const serviceUrl = new URL(
      `https://${this.config.storageAccountName}.blob.core.windows.net/`
    );
    serviceUrl.searchParams.set("restype", "service");
    serviceUrl.searchParams.set("comp", "userdelegationkey");

    let response;
    try {
      response = await this.fetch(serviceUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${await this.tokenProvider(this.config)}`,
          "Content-Type": "application/xml",
          "x-ms-date": new Date(this.now()).toUTCString(),
          "x-ms-version": STORAGE_API_VERSION,
        },
        body: `<KeyInfo><Start>${startsOn}</Start><Expiry>${expiresOn}</Expiry></KeyInfo>`,
        signal: AbortSignal.timeout(15_000),
      });
    } catch (error) {
      if (error instanceof EditorApiError) throw error;
      throw new EditorApiError(
        503,
        "storage_unavailable",
        "Azure Blob Storage is unavailable."
      );
    }
    if (!response.ok) {
      throw new EditorApiError(
        502,
        "storage_delegation_failed",
        "Azure Storage did not issue an upload delegation key."
      );
    }
    this.delegationKey = parseDelegationKey(await response.text());
    return this.delegationKey;
  }

  async issueUpload(slug, descriptor) {
    const image = validateImageDescriptor(descriptor, {
      requireSafeFilename: true,
    });
    const existing = await this.headBlob(slug, image.filename);
    if (existing.ok) {
      throw new EditorApiError(
        409,
        "image_already_exists",
        "An image with this filename already exists."
      );
    }
    if (existing.status !== 404) {
      throw new EditorApiError(
        502,
        "image_existence_check_failed",
        "Azure Storage could not confirm that the image filename is unused."
      );
    }

    const startsOn = formatStorageDate(new Date(this.now() - 60_000));
    const expiresOn = formatStorageDate(
      new Date(this.now() + UPLOAD_LIFETIME_MS)
    );
    const blobPath = `travel/${slug}/${image.filename}`;
    const query = createUserDelegationBlobSas({
      accountName: this.config.storageAccountName,
      blobPath,
      containerName: this.config.storageContainerName,
      delegationKey: await this.getDelegationKey(),
      expiresOn,
      startsOn,
    });
    return {
      filename: image.filename,
      uploadUrl: `${this.blobUrl(slug, image.filename)}?${query}`,
      expiresAt: expiresOn,
      method: "PUT",
      headers: {
        "Content-Type": image.mimeType,
        "If-None-Match": "*",
        "x-ms-blob-type": "BlockBlob",
        "x-ms-version": STORAGE_API_VERSION,
      },
      maximumBytes: MAX_IMAGE_BYTES,
    };
  }

  async verifyFile(slug, descriptor, { uploaded = true } = {}) {
    const image = validateImageDescriptor(descriptor, {
      requireSafeFilename: uploaded,
      requireSize: uploaded,
    });
    if (uploaded && image.filename !== descriptor.filename) {
      throw new EditorApiError(
        422,
        "image_filename_not_normalized",
        "The uploaded image filename must match the normalized filename."
      );
    }

    const response = await this.headBlob(slug, image.filename);
    if (response.status === 404) {
      throw new EditorApiError(
        422,
        "image_not_found",
        `The image "${image.filename}" was not uploaded.`
      );
    }
    if (!response.ok) {
      throw new EditorApiError(
        502,
        "image_verification_failed",
        `The image "${image.filename}" could not be verified.`
      );
    }

    const contentLength = Number(response.headers.get("content-length"));
    const contentType = normalizeMimeType(response.headers.get("content-type"));
    const expectedMime = expectedMimeType(image.filename);
    if (
      !Number.isSafeInteger(contentLength) ||
      contentLength <= 0 ||
      contentLength > MAX_IMAGE_BYTES ||
      contentType !== expectedMime
    ) {
      throw new EditorApiError(
        422,
        "image_properties_invalid",
        `The image "${image.filename}" has invalid stored properties.`
      );
    }
    if (
      uploaded &&
      (contentLength !== image.size || contentType !== image.mimeType)
    ) {
      throw new EditorApiError(
        422,
        "uploaded_image_mismatch",
        `The uploaded image "${image.filename}" does not match the approved file.`
      );
    }
    return {
      filename: image.filename,
      mimeType: contentType,
      size: contentLength,
      etag: response.headers.get("etag"),
      url: this.blobUrl(slug, image.filename),
    };
  }

  async verifyFiles(slug, descriptors) {
    if (
      !Array.isArray(descriptors) ||
      descriptors.length < 1 ||
      descriptors.length > 100
    ) {
      throw new EditorApiError(
        400,
        "invalid_image_list",
        "Between 1 and 100 images must be verified at once."
      );
    }
    const filenames = descriptors.map((descriptor) => descriptor?.filename);
    if (new Set(filenames).size !== filenames.length) {
      throw new EditorApiError(
        422,
        "duplicate_image_filename",
        "An image filename can be verified only once."
      );
    }
    return mapWithConcurrency(
      descriptors,
      10,
      (descriptor) => this.verifyFile(slug, descriptor)
    );
  }

  async verifyDocumentImages(document) {
    const filenames = document.images.map((image) => image.filename);
    if (new Set(filenames).size !== filenames.length) {
      throw new EditorApiError(
        422,
        "duplicate_image_filename",
        "The document contains duplicate image filenames."
      );
    }
    return mapWithConcurrency(
      filenames,
      10,
      (filename) =>
        this.verifyFile(document.slug, { filename }, { uploaded: false })
    );
  }
}
