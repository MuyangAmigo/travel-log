import { createHash } from "node:crypto";
import { readFile, readdir } from "node:fs/promises";
import { createServer } from "node:http";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const HOST = "127.0.0.1";
const PORT = 7072;
const ALLOWED_ORIGIN = "http://localhost:3000";
const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const TRIPS_ROOT = join(ROOT, "site", "src", "content", "trips");
const TRIPS_REGISTRY = join(ROOT, "site", "src", "lib", "trips.ts");
const MAX_BODY_BYTES = 2 * 1024 * 1024;
const documents = new Map();
let headSha = "";

function sha(value) {
  return createHash("sha1").update(value).digest("hex");
}

function json(response, status, body) {
  response.writeHead(status, {
    "Access-Control-Allow-Headers": "Authorization, Content-Type",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
    "Cache-Control": "no-store",
    "Content-Type": "application/json; charset=utf-8",
    Vary: "Origin",
  });
  response.end(JSON.stringify(body));
}

function error(response, status, code, message) {
  json(response, status, { error: { code, message } });
}

function blobSha(document) {
  return sha(JSON.stringify(document));
}

function refreshHead() {
  headSha = sha(
    [...documents.entries()]
      .sort(([left], [right]) => left.localeCompare(right))
      .map(([slug, document]) => `${slug}:${blobSha(document)}`)
      .join("|")
  );
}

async function loadDocuments() {
  const registry = await readFile(TRIPS_REGISTRY, "utf8");
  const registered = new Set(
    [...registry.matchAll(/@\/content\/trips\/([a-z0-9]+(?:-[a-z0-9]+)*)\/meta/gu)]
      .map((match) => match[1])
  );
  const directories = await readdir(TRIPS_ROOT, { withFileTypes: true });
  for (const directory of directories) {
    if (!directory.isDirectory() || !registered.has(directory.name)) continue;
    const source = await readFile(
      join(TRIPS_ROOT, directory.name, "content.json"),
      "utf8"
    );
    documents.set(directory.name, JSON.parse(source));
  }
  refreshHead();
}

async function readBody(request) {
  const chunks = [];
  let size = 0;
  for await (const chunk of request) {
    size += chunk.length;
    if (size > MAX_BODY_BYTES) throw new Error("request_too_large");
    chunks.push(chunk);
  }
  return JSON.parse(Buffer.concat(chunks).toString("utf8"));
}

function summary(document) {
  return {
    blobSha: blobSha(document),
    slug: document.slug,
    date: document.metadata.date,
    dateRange: document.metadata.dateRange,
    title: document.metadata.title,
    subtitle: document.metadata.subtitle,
    location: document.metadata.location,
    private: document.metadata.private,
  };
}

function translateForPreview(value) {
  if (Array.isArray(value)) return value.map(translateForPreview);
  if (!value || typeof value !== "object") return value;
  if (
    Object.keys(value).length === 2 &&
    typeof value.zh === "string" &&
    typeof value.en === "string"
  ) {
    return { zh: value.zh, en: `[Local preview] ${value.zh}` };
  }
  return Object.fromEntries(
    Object.entries(value).map(([key, child]) => [
      key,
      translateForPreview(child),
    ])
  );
}

function matchTripRoute(pathname) {
  return /^\/editor\/trips\/([a-z0-9]+(?:-[a-z0-9]+)*)(?:\/(translate|publish))?$/u.exec(
    pathname
  );
}

await loadDocuments();

createServer(async (request, response) => {
  if (request.headers.origin && request.headers.origin !== ALLOWED_ORIGIN) {
    error(response, 403, "origin_forbidden", "Origin is not allowed.");
    return;
  }
  if (request.method === "OPTIONS") {
    json(response, 204, {});
    return;
  }

  const url = new URL(request.url ?? "/", `http://${HOST}:${PORT}`);
  if (request.method === "GET" && url.pathname === "/editor/trips") {
    json(response, 200, {
      baseSha: headSha,
      trips: [...documents.values()]
        .map(summary)
        .sort((left, right) => right.date.localeCompare(left.date)),
    });
    return;
  }

  const match = matchTripRoute(url.pathname);
  if (!match || !documents.has(match[1])) {
    error(response, 404, "trip_not_registered", "Trip is not registered.");
    return;
  }
  const [_, slug, action] = match;
  const current = documents.get(slug);

  if (request.method === "GET" && !action) {
    json(response, 200, {
      baseSha: headSha,
      blobSha: blobSha(current),
      document: current,
    });
    return;
  }

  if (request.method !== "POST") {
    error(response, 405, "method_not_allowed", "Method is not allowed.");
    return;
  }

  try {
    const body = await readBody(request);
    if (body.baseSha !== headSha || body.baseBlobSha !== blobSha(current)) {
      error(
        response,
        409,
        "draft_conflict",
        "The in-memory preview changed. Reload the trip and try again."
      );
      return;
    }
    if (body.document?.slug !== slug) {
      error(response, 400, "slug_mismatch", "Document slug does not match.");
      return;
    }

    if (action === "translate") {
      json(response, 200, {
        baseSha: headSha,
        baseBlobSha: blobSha(current),
        document: translateForPreview(body.document),
      });
      return;
    }
    if (action === "publish") {
      documents.set(slug, body.document);
      refreshHead();
      json(response, 201, {
        commitSha: headSha,
        commitUrl: "http://localhost:3000/edit/",
      });
      return;
    }
  } catch (caught) {
    error(
      response,
      caught instanceof SyntaxError ? 400 : 413,
      "invalid_request",
      "The preview request could not be read."
    );
    return;
  }

  error(
    response,
    501,
    "preview_operation_unavailable",
    "This operation is unavailable in local preview mode."
  );
}).listen(PORT, HOST, () => {
  console.log(`Editor preview API ready at http://${HOST}:${PORT}/editor`);
});
