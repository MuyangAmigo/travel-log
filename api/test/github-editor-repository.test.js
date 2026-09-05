import assert from "node:assert/strict";
import { generateKeyPairSync } from "node:crypto";
import { readFileSync } from "node:fs";
import test from "node:test";
import {
  GitHubEditorRepository,
  parseRegisteredTripSlugs,
} from "../src/github-editor-repository.js";
import {
  BLOB_SHA,
  COMMIT_SHA,
  editorConfig,
  minimalTripDocument,
  SHA,
  TREE_SHA,
} from "./helpers/editor-fixtures.js";

test("derives the allowlist only from entries in the registered trips array", () => {
  const source = readFileSync(
    new URL("../../site/src/lib/trips.ts", import.meta.url),
    "utf8"
  );
  const slugs = parseRegisteredTripSlugs(source);
  assert.equal(slugs.length, 11);
  assert.ok(slugs.includes("bangkok-2026"));
  assert.ok(slugs.includes("kota-kinabalu-2025"));

  const withUnusedImport = source.replace(
    'import { meta as bangkok2026Meta }',
    'import { meta as unregisteredMeta } from "@/content/trips/unregistered/meta";\nimport { meta as bangkok2026Meta }'
  );
  assert.equal(
    parseRegisteredTripSlugs(withUnusedImport).includes("unregistered"),
    false
  );
});

test("rejects unknown trips before trying to load a content path", async () => {
  const repository = new GitHubEditorRepository(editorConfig);
  repository.getFile = async () => {
    throw new Error("must not load an unknown path");
  };
  await assert.rejects(
    repository.loadTripAtRef("new-trip", SHA, ["existing-trip"]),
    (error) => error.status === 404 && error.code === "trip_not_registered"
  );
});

test("rejects stale base commits and blob revisions", async () => {
  const repository = new GitHubEditorRepository(editorConfig);
  repository.getHeadSha = async () => "9".repeat(40);
  await assert.rejects(
    repository.assertDraftBase("existing-trip", SHA, BLOB_SHA),
    (error) => error.status === 409 && error.code === "publish_conflict"
  );

  repository.getHeadSha = async () => SHA;
  repository.getRegistry = async () => ["existing-trip"];
  repository.loadTripAtRef = async () => ({
    blobSha: "8".repeat(40),
    document: minimalTripDocument(),
  });
  await assert.rejects(
    repository.assertDraftBase("existing-trip", SHA, BLOB_SHA),
    (error) => error.status === 409 && error.code === "publish_conflict"
  );
});

test("rejects a trip removed from the current registered allowlist", async () => {
  const repository = new GitHubEditorRepository(editorConfig);
  repository.getHeadSha = async () => SHA;
  repository.getRegistry = async () => ["another-trip"];
  await assert.rejects(
    repository.assertDraftBase("existing-trip", SHA, BLOB_SHA),
    (error) => error.status === 404 && error.code === "trip_not_registered"
  );
});

test("publishes one existing content file through a single non-forced ref update", async () => {
  const repository = new GitHubEditorRepository(editorConfig);
  const calls = [];
  repository.assertDraftBase = async (slug, baseSha, baseBlobSha) => {
    assert.deepEqual(
      { slug, baseSha, baseBlobSha },
      { slug: "existing-trip", baseSha: SHA, baseBlobSha: BLOB_SHA }
    );
  };
  repository.github = async (path, options = {}) => {
    calls.push({ path, options });
    if (path.endsWith(`/git/commits/${SHA}`)) {
      return { tree: { sha: TREE_SHA } };
    }
    if (path.endsWith("/git/blobs")) return { sha: BLOB_SHA };
    if (path.endsWith("/git/trees")) return { sha: TREE_SHA };
    if (path.endsWith("/git/commits")) return { sha: COMMIT_SHA };
    if (path.endsWith("/git/refs/heads/main")) return { object: { sha: COMMIT_SHA } };
    throw new Error(`Unexpected GitHub call: ${path}`);
  };

  const result = await repository.publishTrip({
    slug: "existing-trip",
    document: minimalTripDocument(),
    baseSha: SHA,
    baseBlobSha: BLOB_SHA,
  });

  const treeCall = calls.find((call) => call.path.endsWith("/git/trees"));
  assert.equal(treeCall.options.body.base_tree, TREE_SHA);
  assert.deepEqual(treeCall.options.body.tree, [
    {
      path: "site/src/content/trips/existing-trip/content.json",
      mode: "100644",
      type: "blob",
      sha: BLOB_SHA,
    },
  ]);
  const refCalls = calls.filter((call) =>
    call.path.endsWith("/git/refs/heads/main")
  );
  assert.equal(refCalls.length, 1);
  assert.deepEqual(refCalls[0].options.body, {
    sha: COMMIT_SHA,
    force: false,
  });
  assert.deepEqual(result, {
    commitSha: COMMIT_SHA,
    commitUrl: `https://github.com/owner/travel-log/commit/${COMMIT_SHA}`,
  });
});

test("maps a racing non-fast-forward main update to a publish conflict", async () => {
  const { privateKey } = generateKeyPairSync("rsa", { modulusLength: 2048 });
  const calls = [];
  const repository = new GitHubEditorRepository(
    {
      ...editorConfig,
      githubPrivateKey: privateKey.export({
        format: "pem",
        type: "pkcs8",
      }),
    },
    {
      fetchImpl: async (url, options) => {
        const href = String(url);
        calls.push({ href, options });
        if (href.includes("/app/installations/")) {
          return Response.json({
            token: "installation-token",
            expires_at: "2099-01-01T00:00:00Z",
          });
        }
        if (href.endsWith(`/git/commits/${SHA}`)) {
          return Response.json({ tree: { sha: TREE_SHA } });
        }
        if (href.endsWith("/git/blobs")) {
          return Response.json({ sha: BLOB_SHA });
        }
        if (href.endsWith("/git/trees")) {
          return Response.json({ sha: TREE_SHA });
        }
        if (href.endsWith("/git/commits")) {
          return Response.json({ sha: COMMIT_SHA });
        }
        if (href.endsWith("/git/refs/heads/main")) {
          return Response.json(
            { message: "Reference update failed" },
            { status: 409 }
          );
        }
        throw new Error(`Unexpected GitHub request: ${href}`);
      },
    }
  );
  repository.assertDraftBase = async () => {};

  await assert.rejects(
    repository.publishTrip({
      slug: "existing-trip",
      document: minimalTripDocument(),
      baseSha: SHA,
      baseBlobSha: BLOB_SHA,
    }),
    (error) => error.status === 409 && error.code === "publish_conflict"
  );
  const update = calls.find((call) =>
    call.href.endsWith("/git/refs/heads/main")
  );
  assert.deepEqual(JSON.parse(update.options.body), {
    sha: COMMIT_SHA,
    force: false,
  });
});

test("rejects a document renamed away from the selected registered trip", async () => {
  const repository = new GitHubEditorRepository(editorConfig);
  repository.assertDraftBase = async () => {};
  await assert.rejects(
    repository.publishTrip({
      slug: "existing-trip",
      document: minimalTripDocument("renamed-trip"),
      baseSha: SHA,
      baseBlobSha: BLOB_SHA,
    }),
    (error) => error.status === 409 && error.code === "trip_slug_mismatch"
  );
});
