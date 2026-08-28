import type { LocalizedText, TripDocument } from "./trip-document";

export type EditorTripSummary = {
  blobSha: string;
  slug: string;
  date: string;
  dateRange: string;
  title: LocalizedText;
  subtitle: LocalizedText;
  location: LocalizedText;
  private: boolean;
};

export type EditorTripList = {
  baseSha: string;
  trips: EditorTripSummary[];
};

export type EditorTripSnapshot = {
  baseSha: string;
  blobSha: string;
  document: TripDocument;
};

export type EditorUploadAuthorization = {
  filename: string;
  uploadUrl: string;
  expiresAt: string;
  method: "PUT";
  headers: Record<string, string>;
  maximumBytes: number;
};

export type VerifiedEditorImage = {
  filename: string;
  mimeType: string;
  size: number;
  etag: string | null;
  url: string;
};

export type EditorPublishResult = {
  commitSha: string;
  commitUrl: string;
};

type ErrorPayload = {
  error?: {
    code?: string;
    message?: string;
    details?: unknown;
  };
};

export class EditorApiError extends Error {
  readonly code: string;
  readonly details: unknown;
  readonly status: number;

  constructor(status: number, code: string, message: string, details?: unknown) {
    super(message);
    this.name = "EditorApiError";
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

function apiRoot(): string {
  const value = process.env.NEXT_PUBLIC_TRAVEL_LOG_EDITOR_API_URL?.trim();
  if (!value) {
    throw new EditorApiError(
      500,
      "editor_not_configured",
      "编辑服务尚未配置。"
    );
  }
  return value.replace(/\/+$/u, "");
}

async function parseResponse<T>(response: Response): Promise<T> {
  let payload: T | ErrorPayload;
  try {
    payload = (await response.json()) as T | ErrorPayload;
  } catch {
    throw new EditorApiError(
      response.status,
      "editor_invalid_response",
      "编辑服务返回了无法读取的响应。"
    );
  }
  if (!response.ok) {
    const error = (payload as ErrorPayload).error;
    throw new EditorApiError(
      response.status,
      error?.code ?? "editor_request_failed",
      error?.message ?? "编辑服务请求失败。",
      error?.details
    );
  }
  return payload as T;
}

export class EditorApi {
  private readonly accessToken: string;
  private readonly onUnauthorized: () => void;

  constructor(
    accessToken: string,
    onUnauthorized: () => void
  ) {
    this.accessToken = accessToken;
    this.onUnauthorized = onUnauthorized;
  }

  private async request<T>(path: string, init: RequestInit = {}): Promise<T> {
    const response = await fetch(`${apiRoot()}${path}`, {
      ...init,
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
        ...(init.body === undefined ? {} : { "Content-Type": "application/json" }),
        ...init.headers,
      },
    });
    if (response.status === 401 || response.status === 403) {
      this.onUnauthorized();
    }
    return parseResponse<T>(response);
  }

  listTrips(): Promise<EditorTripList> {
    return this.request("/trips");
  }

  loadTrip(slug: string): Promise<EditorTripSnapshot> {
    return this.request(`/trips/${encodeURIComponent(slug)}`);
  }

  translate(
    slug: string,
    body: {
      baseSha: string;
      baseBlobSha: string;
      document: TripDocument;
      changedPaths: string[];
    }
  ): Promise<{
    baseSha: string;
    baseBlobSha: string;
    document: TripDocument;
  }> {
    return this.request(`/trips/${encodeURIComponent(slug)}/translate`, {
      method: "POST",
      body: JSON.stringify(body),
    });
  }

  async uploadImage(
    slug: string,
    file: File
  ): Promise<VerifiedEditorImage> {
    const authorization = await this.request<{
      baseSha: string;
      baseBlobSha: string;
      upload: EditorUploadAuthorization;
    }>(`/trips/${encodeURIComponent(slug)}/uploads`, {
      method: "POST",
      body: JSON.stringify({
        filename: file.name,
        mimeType: file.type,
        size: file.size,
      }),
    });

    const upload = authorization.upload;
    const uploaded = await fetch(upload.uploadUrl, {
      method: upload.method,
      headers: upload.headers,
      body: file,
    });
    if (!uploaded.ok) {
      throw new EditorApiError(
        uploaded.status,
        "image_upload_failed",
        "图片未能上传到 Azure Blob Storage。"
      );
    }

    const verified = await this.request<{ verified: VerifiedEditorImage[] }>(
      `/trips/${encodeURIComponent(slug)}/images/verify`,
      {
        method: "POST",
        body: JSON.stringify({
          files: [
            {
              filename: upload.filename,
              mimeType: upload.headers["Content-Type"],
              size: file.size,
            },
          ],
        }),
      }
    );
    const image = verified.verified[0];
    if (!image) {
      throw new EditorApiError(
        502,
        "image_verification_failed",
        "编辑服务未返回已验证的图片。"
      );
    }
    return image;
  }

  publish(
    slug: string,
    body: {
      approved: true;
      baseSha: string;
      baseBlobSha: string;
      document: TripDocument;
    }
  ): Promise<EditorPublishResult> {
    return this.request(`/trips/${encodeURIComponent(slug)}/publish`, {
      method: "POST",
      body: JSON.stringify(body),
    });
  }
}
