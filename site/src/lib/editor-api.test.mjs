import assert from "node:assert/strict";
import test from "node:test";
import { EditorApi, EditorApiError } from "./editor-api.ts";

const originalFetch = globalThis.fetch;
process.env.NEXT_PUBLIC_TRAVEL_LOG_EDITOR_API_URL =
  "https://editor.example/api/editor/";

test.afterEach(() => {
  globalThis.fetch = originalFetch;
});

test("uses the existing editor API routes with bearer authentication", async () => {
  const requests = [];
  globalThis.fetch = async (url, init) => {
    requests.push({ url, init });
    return Response.json({
      baseSha: "1".repeat(40),
      trips: [],
    });
  };
  const api = new EditorApi("owner-access-token", () => {});

  const result = await api.listTrips();

  assert.deepEqual(result.trips, []);
  assert.equal(requests[0].url, "https://editor.example/api/editor/trips");
  assert.equal(
    requests[0].init.headers.Authorization,
    "Bearer owner-access-token"
  );
  assert.equal(requests[0].init.cache, "no-store");
});

test("surfaces API errors and expires rejected editor sessions", async () => {
  let unauthorized = false;
  globalThis.fetch = async () =>
    Response.json(
      {
        error: {
          code: "editor_authentication_required",
          message: "Sign in again.",
        },
      },
      { status: 401 }
    );
  const api = new EditorApi("expired-access-token", () => {
    unauthorized = true;
  });

  await assert.rejects(
    api.listTrips(),
    (error) =>
      error instanceof EditorApiError &&
      error.code === "editor_authentication_required" &&
      error.message === "Sign in again."
  );
  assert.equal(unauthorized, true);
});

test("uploads directly with the issued headers and verifies the normalized file", async () => {
  const requests = [];
  globalThis.fetch = async (url, init) => {
    requests.push({ url, init });
    if (url === "https://blob.example/photo.jpg?sig=test") {
      return new Response(null, { status: 201 });
    }
    if (url.endsWith("/uploads")) {
      return Response.json({
        baseSha: "1".repeat(40),
        baseBlobSha: "2".repeat(40),
        upload: {
          filename: "Photo.jpg",
          uploadUrl: "https://blob.example/photo.jpg?sig=test",
          expiresAt: "2026-08-26T08:10:00Z",
          method: "PUT",
          headers: {
            "Content-Type": "image/jpeg",
            "If-None-Match": "*",
            "x-ms-blob-type": "BlockBlob",
            "x-ms-version": "2025-05-05",
          },
          maximumBytes: 50 * 1024 * 1024,
        },
      });
    }
    return Response.json({
      verified: [
        {
          filename: "Photo.jpg",
          mimeType: "image/jpeg",
          size: 3,
          etag: '"etag"',
          url: "https://blob.example/photo.jpg",
        },
      ],
    });
  };
  const api = new EditorApi("owner-access-token", () => {});
  const file = new File([new Uint8Array([1, 2, 3])], "Photo.JPG", {
    type: "image/jpeg",
  });

  const verified = await api.uploadImage("existing-trip", file);

  assert.equal(verified.filename, "Photo.jpg");
  assert.equal(requests[1].url, "https://blob.example/photo.jpg?sig=test");
  assert.equal(requests[1].init.headers["If-None-Match"], "*");
  assert.equal(requests[2].url.endsWith("/images/verify"), true);
  assert.deepEqual(JSON.parse(requests[2].init.body).files, [
    {
      filename: "Photo.jpg",
      mimeType: "image/jpeg",
      size: 3,
    },
  ]);
});
