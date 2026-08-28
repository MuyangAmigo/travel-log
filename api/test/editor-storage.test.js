import assert from "node:assert/strict";
import { createHmac } from "node:crypto";
import test from "node:test";
import {
  AzureStorageImageService,
  createUserDelegationBlobSas,
  normalizeUploadFilename,
} from "../src/editor-storage.js";
import { editorConfig } from "./helpers/editor-fixtures.js";

const delegationKey = {
  signedObjectId: "11111111-1111-1111-1111-111111111111",
  signedTenantId: "22222222-2222-2222-2222-222222222222",
  signedStartsOn: "2026-08-26T06:50:00Z",
  signedExpiresOn: "2026-08-26T08:00:00Z",
  signedService: "b",
  signedVersion: "2023-11-03",
  value: Buffer.from("delegation-secret").toString("base64"),
};

test("normalizes safe upload names and rejects unsupported extensions", () => {
  assert.equal(normalizeUploadFilename("  My photo (1).JPG  "), "My-photo-1.jpg");
  assert.throws(
    () => normalizeUploadFilename("payload.svg"),
    (error) => error.status === 415 && error.code === "unsupported_image_type"
  );
  assert.throws(
    () => normalizeUploadFilename("../photo.jpg"),
    (error) => error.code === "invalid_image_filename"
  );
});

test("constructs a create-only, blob-scoped user delegation SAS", () => {
  const startsOn = "2026-08-26T06:59:00Z";
  const expiresOn = "2026-08-26T07:10:00Z";
  const blobPath = "travel/existing-trip/new-photo.jpg";
  const query = createUserDelegationBlobSas({
    accountName: "junjieblob",
    blobPath,
    containerName: "images",
    delegationKey,
    startsOn,
    expiresOn,
  });
  const parameters = new URLSearchParams(query);
  const expectedSignature = createHmac(
    "sha256",
    Buffer.from(delegationKey.value, "base64")
  )
    .update(
      [
        "c",
        startsOn,
        expiresOn,
        `/blob/junjieblob/images/${blobPath}`,
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
        "https",
        "2023-11-03",
        "b",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
      ].join("\n")
    )
    .digest("base64");

  assert.equal(parameters.get("sp"), "c");
  assert.equal(parameters.has("w"), false);
  assert.equal(parameters.get("sr"), "b");
  assert.equal(parameters.get("spr"), "https");
  assert.equal(parameters.get("sig"), expectedSignature);
});

test("issues a short-lived upload only when the blob does not exist", async () => {
  const calls = [];
  const service = new AzureStorageImageService(editorConfig, {
    now: () => Date.parse("2026-08-26T07:00:00Z"),
    tokenProvider: async () => "managed-identity-token",
    fetchImpl: async (url, init) => {
      calls.push({ url: String(url), init });
      if (init.method === "HEAD") {
        return new Response(null, { status: 404 });
      }
      return new Response(
        `<UserDelegationKey>
          <SignedOid>${delegationKey.signedObjectId}</SignedOid>
          <SignedTid>${delegationKey.signedTenantId}</SignedTid>
          <SignedStart>${delegationKey.signedStartsOn}</SignedStart>
          <SignedExpiry>${delegationKey.signedExpiresOn}</SignedExpiry>
          <SignedService>${delegationKey.signedService}</SignedService>
          <SignedVersion>${delegationKey.signedVersion}</SignedVersion>
          <Value>${delegationKey.value}</Value>
        </UserDelegationKey>`,
        { status: 200 }
      );
    },
  });

  const upload = await service.issueUpload("existing-trip", {
    filename: "New Photo.JPG",
    mimeType: "image/jpeg",
    size: 1234,
  });

  assert.equal(upload.filename, "New-Photo.jpg");
  assert.match(
    upload.uploadUrl,
    /^https:\/\/junjieblob\.blob\.core\.windows\.net\/images\/travel\/existing-trip\/New-Photo\.jpg\?/u
  );
  assert.equal(new URL(upload.uploadUrl).searchParams.get("sp"), "c");
  assert.equal(upload.expiresAt, "2026-08-26T07:10:00Z");
  assert.equal(upload.headers["If-None-Match"], "*");
  assert.equal(upload.headers["x-ms-blob-type"], "BlockBlob");
  assert.equal(calls[1].init.headers.Authorization, "Bearer managed-identity-token");
});

test("rejects overwrite attempts and MIME or size mismatches", async () => {
  const existingService = new AzureStorageImageService(editorConfig, {
    fetchImpl: async () =>
      new Response(null, {
        status: 200,
        headers: {
          "content-length": "10",
          "content-type": "image/jpeg",
        },
      }),
  });
  await assert.rejects(
    existingService.issueUpload("existing-trip", {
      filename: "existing.jpg",
      mimeType: "image/jpeg",
      size: 10,
    }),
    (error) => error.status === 409 && error.code === "image_already_exists"
  );
  await assert.rejects(
    existingService.issueUpload("existing-trip", {
      filename: "wrong.png",
      mimeType: "image/jpeg",
      size: 10,
    }),
    (error) => error.status === 415 && error.code === "image_type_mismatch"
  );
  await assert.rejects(
    existingService.issueUpload("existing-trip", {
      filename: "huge.jpg",
      mimeType: "image/jpeg",
      size: 51 * 1024 * 1024,
    }),
    (error) => error.status === 413 && error.code === "image_size_invalid"
  );
});

test("verifies uploaded content length and MIME before accepting a file", async () => {
  const service = new AzureStorageImageService(editorConfig, {
    fetchImpl: async () =>
      new Response(null, {
        status: 200,
        headers: {
          "content-length": "1234",
          "content-type": "image/jpeg",
          etag: "\"etag\"",
        },
      }),
  });
  const verified = await service.verifyFiles("existing-trip", [
    {
      filename: "photo.jpg",
      mimeType: "image/jpeg",
      size: 1234,
    },
  ]);
  assert.deepEqual(verified[0], {
    filename: "photo.jpg",
    mimeType: "image/jpeg",
    size: 1234,
    etag: "\"etag\"",
    url: "https://junjieblob.blob.core.windows.net/images/travel/existing-trip/photo.jpg",
  });

  await assert.rejects(
    service.verifyFiles("existing-trip", [
      {
        filename: "photo.jpg",
        mimeType: "image/jpeg",
        size: 1235,
      },
    ]),
    (error) => error.code === "uploaded_image_mismatch"
  );
});

test("verifies every referenced document image, including the cover", async () => {
  const checked = [];
  const service = new AzureStorageImageService(editorConfig, {
    fetchImpl: async (url, init) => {
      checked.push({ url: String(url), method: init.method });
      const isPng = String(url).endsWith("/gallery.png");
      return new Response(null, {
        status: 200,
        headers: {
          "content-length": isPng ? "456" : "123",
          "content-type": isPng ? "image/png" : "image/jpeg",
        },
      });
    },
  });

  const verified = await service.verifyDocumentImages({
    slug: "existing-trip",
    images: [
      { filename: "cover.jpeg" },
      { filename: "gallery.png" },
    ],
  });

  assert.equal(verified.length, 2);
  assert.deepEqual(
    checked.map(({ url, method }) => ({ url, method })),
    [
      {
        url: "https://junjieblob.blob.core.windows.net/images/travel/existing-trip/cover.jpeg",
        method: "HEAD",
      },
      {
        url: "https://junjieblob.blob.core.windows.net/images/travel/existing-trip/gallery.png",
        method: "HEAD",
      },
    ]
  );
});
