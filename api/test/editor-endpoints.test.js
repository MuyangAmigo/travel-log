import assert from "node:assert/strict";
import test from "node:test";
import { EditorApiError } from "../src/editor-errors.js";
import { createEditorHandlers } from "../src/functions/editor.js";
import {
  BLOB_SHA,
  COMMIT_SHA,
  editorConfig,
  minimalTripDocument,
  SHA,
} from "./helpers/editor-fixtures.js";

function request({
  authorization = "******",
  body,
  contentLength,
  method = "GET",
  origin = editorConfig.allowedOrigin,
  slug,
} = {}) {
  const source = body === undefined ? "" : JSON.stringify(body);
  const headers = new Headers({
    authorization,
    origin,
    ...(body === undefined ? {} : { "content-type": "application/json" }),
    ...(contentLength === undefined
      ? {}
      : { "content-length": String(contentLength) }),
  });
  return {
    headers,
    method,
    params: slug === undefined ? {} : { slug },
    text: async () => source,
  };
}

function context() {
  return {
    errors: [],
    warnings: [],
    error(...values) {
      this.errors.push(values);
    },
    warn(...values) {
      this.warnings.push(values);
    },
  };
}

function serviceMocks(overrides = {}) {
  return {
    repository: {
      assertDraftBase: async () => {},
      listTrips: async () => ({ baseSha: SHA, trips: [] }),
      loadTrip: async () => ({
        baseSha: SHA,
        blobSha: BLOB_SHA,
        document: minimalTripDocument(),
      }),
      publishTrip: async () => ({
        commitSha: COMMIT_SHA,
        commitUrl: `https://github.com/owner/travel-log/commit/${COMMIT_SHA}`,
      }),
      ...overrides.repository,
    },
    storage: {
      issueUpload: async (_slug, image) => ({ filename: image.filename }),
      verifyDocumentImages: async () => [],
      verifyFiles: async () => [],
      ...overrides.storage,
    },
    translator: {
      translateDocument: async (document) => document,
      ...overrides.translator,
    },
  };
}

test("lists trips only after owner editor authorization and disables caching", async () => {
  let authorizationChecked = false;
  const handlers = createEditorHandlers({
    authorize: async (incoming, config) => {
      authorizationChecked = true;
      assert.ok(incoming.headers.has("authorization"));
      assert.equal(config.allowedSubject, editorConfig.allowedSubject);
    },
    getConfig: () => editorConfig,
    services: serviceMocks(),
  });

  const result = await handlers.listTrips(request(), context());
  assert.equal(result.status, 200);
  assert.equal(authorizationChecked, true);
  assert.equal(result.headers["Cache-Control"], "no-store");
  assert.equal(
    result.headers["Access-Control-Allow-Origin"],
    editorConfig.allowedOrigin
  );
});

test("never treats a private passcode as editor authorization", async () => {
  let repositoryCalled = false;
  const handlers = createEditorHandlers({
    getConfig: () => editorConfig,
    services: serviceMocks({
      repository: {
        listTrips: async () => {
          repositoryCalled = true;
          return { baseSha: SHA, trips: [] };
        },
      },
    }),
  });

  const result = await handlers.listTrips(
    request({
      authorization: "",
      body: { passcode: "valid-private-passcode" },
    }),
    context()
  );
  assert.equal(result.status, 401);
  assert.equal(result.jsonBody.error.code, "editor_authentication_required");
  assert.equal(repositoryCalled, false);
});

test("enforces origin before authentication and handles preflight without auth", async () => {
  let authCalls = 0;
  const handlers = createEditorHandlers({
    authorize: async () => {
      authCalls += 1;
    },
    getConfig: () => editorConfig,
    services: serviceMocks(),
  });

  const forbidden = await handlers.listTrips(
    request({ origin: "https://example.com" }),
    context()
  );
  assert.equal(forbidden.status, 403);
  assert.equal(forbidden.headers["Cache-Control"], "no-store");

  const preflight = await handlers.listTrips(
    request({ authorization: "", method: "OPTIONS" }),
    context()
  );
  assert.equal(preflight.status, 204);
  assert.equal(authCalls, 0);
});

test("rejects oversized and structurally invalid document requests", async () => {
  const handlers = createEditorHandlers({
    authorize: async () => {},
    getConfig: () => editorConfig,
    services: serviceMocks(),
  });
  const validBody = {
    baseSha: SHA,
    baseBlobSha: BLOB_SHA,
    changedPaths: [],
    document: minimalTripDocument(),
  };
  const tooLarge = await handlers.translateTrip(
    request({
      method: "POST",
      slug: "existing-trip",
      body: validBody,
      contentLength: 2 * 1024 * 1024 + 1,
    }),
    context()
  );
  assert.equal(tooLarge.status, 413);
  assert.equal(tooLarge.jsonBody.error.code, "request_too_large");

  const invalid = minimalTripDocument();
  invalid.metadata.className = "unsafe";
  const invalidSchema = await handlers.translateTrip(
    request({
      method: "POST",
      slug: "existing-trip",
      body: { ...validBody, document: invalid },
    }),
    context()
  );
  assert.equal(invalidSchema.status, 422);
  assert.equal(invalidSchema.jsonBody.error.code, "invalid_trip_document");
});

test("rejects unknown and renamed trips with explicit errors", async () => {
  const handlers = createEditorHandlers({
    authorize: async () => {},
    getConfig: () => editorConfig,
    services: serviceMocks({
      repository: {
        loadTrip: async () => {
          throw new EditorApiError(
            404,
            "trip_not_registered",
            "Only an already-registered trip can be edited."
          );
        },
      },
    }),
  });
  const unknown = await handlers.loadTrip(
    request({ slug: "unknown-trip" }),
    context()
  );
  assert.equal(unknown.status, 404);
  assert.equal(unknown.jsonBody.error.code, "trip_not_registered");

  const renamed = await handlers.publishTrip(
    request({
      method: "POST",
      slug: "existing-trip",
      body: {
        approved: true,
        baseSha: SHA,
        baseBlobSha: BLOB_SHA,
        document: minimalTripDocument("renamed-trip"),
      },
    }),
    context()
  );
  assert.equal(renamed.status, 409);
  assert.equal(renamed.jsonBody.error.code, "trip_slug_mismatch");
});

test("exposes no create or delete method for whole trips", async () => {
  let repositoryCalls = 0;
  const handlers = createEditorHandlers({
    authorize: async () => {},
    getConfig: () => editorConfig,
    services: serviceMocks({
      repository: {
        listTrips: async () => {
          repositoryCalls += 1;
          return { baseSha: SHA, trips: [] };
        },
        loadTrip: async () => {
          repositoryCalls += 1;
          return {
            baseSha: SHA,
            blobSha: BLOB_SHA,
            document: minimalTripDocument(),
          };
        },
      },
    }),
  });

  const createAttempt = await handlers.listTrips(
    request({ method: "POST", body: minimalTripDocument("new-trip") }),
    context()
  );
  assert.equal(createAttempt.status, 405);
  assert.equal(createAttempt.jsonBody.error.code, "method_not_allowed");
  assert.equal(createAttempt.headers.Allow, "GET, OPTIONS");

  const deleteAttempt = await handlers.loadTrip(
    request({ method: "DELETE", slug: "existing-trip" }),
    context()
  );
  assert.equal(deleteAttempt.status, 405);
  assert.equal(deleteAttempt.jsonBody.error.code, "method_not_allowed");
  assert.equal(deleteAttempt.headers.Allow, "GET, OPTIONS");
  assert.equal(repositoryCalls, 0);
});

test("checks the registered-trip allowlist before issuing or verifying uploads", async () => {
  let storageCalls = 0;
  const handlers = createEditorHandlers({
    authorize: async () => {},
    getConfig: () => editorConfig,
    services: serviceMocks({
      repository: {
        loadTrip: async () => {
          throw new EditorApiError(
            404,
            "trip_not_registered",
            "Only an already-registered trip can be edited."
          );
        },
      },
      storage: {
        issueUpload: async () => {
          storageCalls += 1;
        },
        verifyFiles: async () => {
          storageCalls += 1;
        },
      },
    }),
  });

  const upload = await handlers.createUpload(
    request({
      method: "POST",
      slug: "new-trip",
      body: {
        filename: "photo.jpg",
        mimeType: "image/jpeg",
        size: 1024,
      },
    }),
    context()
  );
  assert.equal(upload.status, 404);
  assert.equal(upload.jsonBody.error.code, "trip_not_registered");

  const verification = await handlers.verifyImages(
    request({
      method: "POST",
      slug: "new-trip",
      body: {
        files: [
          {
            filename: "photo.jpg",
            mimeType: "image/jpeg",
            size: 1024,
          },
        ],
      },
    }),
    context()
  );
  assert.equal(verification.status, 404);
  assert.equal(verification.jsonBody.error.code, "trip_not_registered");
  assert.equal(storageCalls, 0);
});

test("requires approval, verifies every document image, then publishes atomically", async () => {
  const order = [];
  const handlers = createEditorHandlers({
    authorize: async () => {},
    getConfig: () => editorConfig,
    services: serviceMocks({
      repository: {
        assertDraftBase: async () => order.push("base"),
        publishTrip: async () => {
          order.push("publish");
          return {
            commitSha: COMMIT_SHA,
            commitUrl: `https://github.com/owner/travel-log/commit/${COMMIT_SHA}`,
          };
        },
      },
      storage: {
        verifyDocumentImages: async () => order.push("images"),
      },
    }),
  });
  const unapproved = await handlers.publishTrip(
    request({
      method: "POST",
      slug: "existing-trip",
      body: {
        approved: false,
        baseSha: SHA,
        baseBlobSha: BLOB_SHA,
        document: minimalTripDocument(),
      },
    }),
    context()
  );
  assert.equal(unapproved.status, 409);
  assert.equal(
    unapproved.jsonBody.error.code,
    "publish_approval_required"
  );
  assert.deepEqual(order, []);

  const published = await handlers.publishTrip(
    request({
      method: "POST",
      slug: "existing-trip",
      body: {
        approved: true,
        baseSha: SHA,
        baseBlobSha: BLOB_SHA,
        document: minimalTripDocument(),
      },
    }),
    context()
  );
  assert.equal(published.status, 201);
  assert.deepEqual(order, ["base", "images", "publish"]);
  assert.equal(published.jsonBody.commitSha, COMMIT_SHA);
});
