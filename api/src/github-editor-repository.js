import { createPrivateKey } from "node:crypto";
import { SignJWT } from "jose";
import { EditorApiError } from "./editor-errors.js";
import {
  assertDocumentSlug,
  isValidTripSlug,
  parseTripDocument,
} from "./trip-document.js";

const MAIN_BRANCH = "main";
const GIT_SHA_PATTERN = /^[0-9a-f]{40}$/u;
const REGISTRY_PATH = "site/src/lib/trips.ts";

function encodePath(path) {
  return path.split("/").map(encodeURIComponent).join("/");
}

function tripDocumentPath(slug) {
  return `site/src/content/trips/${slug}/content.json`;
}

export function parseRegisteredTripSlugs(source) {
  if (typeof source !== "string") {
    throw new EditorApiError(
      502,
      "invalid_trip_registry",
      "The repository trip registry is unreadable."
    );
  }

  const imports = new Map();
  const importPattern =
    /import\s+\{\s*meta\s+as\s+([A-Za-z_$][\w$]*)\s*\}\s+from\s+["']@\/content\/trips\/([a-z0-9]+(?:-[a-z0-9]+)*)\/meta["'];?/gu;
  for (const match of source.matchAll(importPattern)) {
    imports.set(match[1], match[2]);
  }

  const arrayMatch =
    /export\s+const\s+trips\b[\s\S]*?=\s*\[([\s\S]*?)\]\s*\.sort\s*\(/u.exec(
      source
    );
  if (!arrayMatch) {
    throw new EditorApiError(
      502,
      "invalid_trip_registry",
      "The repository trip registry format is not supported."
    );
  }

  const identifiers = arrayMatch[1]
    .replace(/\/\/[^\r\n]*/gu, "")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);
  const slugs = identifiers.map((identifier) => {
    if (!/^[A-Za-z_$][\w$]*$/u.test(identifier) || !imports.has(identifier)) {
      throw new EditorApiError(
        502,
        "invalid_trip_registry",
        "The repository trip registry contains an unsupported entry."
      );
    }
    return imports.get(identifier);
  });

  if (slugs.length === 0 || new Set(slugs).size !== slugs.length) {
    throw new EditorApiError(
      502,
      "invalid_trip_registry",
      "The repository trip registry is empty or contains duplicates."
    );
  }
  return slugs;
}

class GitHubApiFailure extends Error {
  constructor(status, operation) {
    super(`GitHub ${operation} failed with status ${status}.`);
    this.status = status;
    this.operation = operation;
  }
}

function gitObjectSha(payload, objectName) {
  const sha = payload?.sha;
  if (typeof sha !== "string" || !GIT_SHA_PATTERN.test(sha)) {
    throw new EditorApiError(
      502,
      "github_invalid_response",
      `GitHub returned an invalid ${objectName}.`
    );
  }
  return sha;
}

export class GitHubEditorRepository {
  constructor(config, { fetchImpl = fetch, now = () => Date.now() } = {}) {
    this.config = config;
    this.fetch = fetchImpl;
    this.now = now;
    this.installationToken = null;
    [this.owner, this.repository] = config.githubRepository.split("/");
  }

  async createAppJwt() {
    const issuedAt = Math.floor(this.now() / 1000) - 60;
    return new SignJWT({})
      .setProtectedHeader({ alg: "RS256" })
      .setIssuedAt(issuedAt)
      .setExpirationTime(issuedAt + 9 * 60)
      .setIssuer(this.config.githubAppId)
      .sign(createPrivateKey(this.config.githubPrivateKey));
  }

  async getInstallationToken() {
    if (
      this.installationToken &&
      this.installationToken.expiresAt > this.now() + 60_000
    ) {
      return this.installationToken.value;
    }

    let response;
    try {
      response = await this.fetch(
        `https://api.github.com/app/installations/${encodeURIComponent(
          this.config.githubInstallationId
        )}/access_tokens`,
        {
          method: "POST",
          headers: {
            Accept: "application/vnd.github+json",
            Authorization: `Bearer ${await this.createAppJwt()}`,
            "User-Agent": "travel-log-editor-api",
            "X-GitHub-Api-Version": "2022-11-28",
          },
          signal: AbortSignal.timeout(15_000),
        }
      );
    } catch {
      throw new EditorApiError(
        503,
        "github_unavailable",
        "GitHub is unavailable."
      );
    }
    if (!response.ok) {
      throw new EditorApiError(
        502,
        "github_app_authentication_failed",
        "The repository GitHub App could not authenticate."
      );
    }

    const payload = await response.json();
    if (
      typeof payload.token !== "string" ||
      !Number.isFinite(Date.parse(payload.expires_at))
    ) {
      throw new EditorApiError(
        502,
        "github_app_authentication_failed",
        "GitHub returned an invalid installation token."
      );
    }
    this.installationToken = {
      value: payload.token,
      expiresAt: Date.parse(payload.expires_at),
    };
    return payload.token;
  }

  async github(path, { method = "GET", body, operation = "request" } = {}) {
    let response;
    try {
      response = await this.fetch(`https://api.github.com${path}`, {
        method,
        headers: {
          Accept: "application/vnd.github+json",
          Authorization: `Bearer ${await this.getInstallationToken()}`,
          "Content-Type": "application/json",
          "User-Agent": "travel-log-editor-api",
          "X-GitHub-Api-Version": "2022-11-28",
        },
        body: body === undefined ? undefined : JSON.stringify(body),
        signal: AbortSignal.timeout(20_000),
      });
    } catch (error) {
      if (error instanceof EditorApiError) throw error;
      throw new EditorApiError(
        503,
        "github_unavailable",
        "GitHub is unavailable."
      );
    }
    if (!response.ok) {
      throw new GitHubApiFailure(response.status, operation);
    }
    try {
      return await response.json();
    } catch {
      throw new EditorApiError(
        502,
        "github_invalid_response",
        "GitHub returned an unreadable response."
      );
    }
  }

  repositoryPath(path) {
    return `/repos/${encodeURIComponent(this.owner)}/${encodeURIComponent(
      this.repository
    )}${path}`;
  }

  async getHeadSha() {
    let payload;
    try {
      payload = await this.github(
        this.repositoryPath(`/git/ref/heads/${MAIN_BRANCH}`),
        { operation: "load main branch" }
      );
    } catch (error) {
      if (error instanceof GitHubApiFailure) {
        throw new EditorApiError(
          502,
          "github_repository_invalid",
          "The configured repository main branch is unavailable."
        );
      }
      throw error;
    }
    const sha = payload?.object?.sha;
    if (typeof sha !== "string" || !GIT_SHA_PATTERN.test(sha)) {
      throw new EditorApiError(
        502,
        "github_invalid_response",
        "GitHub returned an invalid main branch reference."
      );
    }
    return sha;
  }

  async getFile(path, ref) {
    let payload;
    try {
      payload = await this.github(
        this.repositoryPath(
          `/contents/${encodePath(path)}?ref=${encodeURIComponent(ref)}`
        ),
        { operation: `load ${path}` }
      );
    } catch (error) {
      if (error instanceof GitHubApiFailure) {
        throw new EditorApiError(
          502,
          "github_repository_invalid",
          "A required repository file is unavailable."
        );
      }
      throw error;
    }
    if (
      payload?.type !== "file" ||
      typeof payload.content !== "string" ||
      typeof payload.sha !== "string" ||
      !GIT_SHA_PATTERN.test(payload.sha)
    ) {
      throw new EditorApiError(
        502,
        "github_invalid_response",
        "GitHub returned an invalid repository file."
      );
    }
    return {
      blobSha: payload.sha,
      content: Buffer.from(payload.content.replace(/\s/gu, ""), "base64").toString(
        "utf8"
      ),
    };
  }

  async getRegistry(ref) {
    const registry = await this.getFile(REGISTRY_PATH, ref);
    return parseRegisteredTripSlugs(registry.content);
  }

  async loadTripAtRef(slug, ref, registeredSlugs) {
    if (!isValidTripSlug(slug) || !registeredSlugs.includes(slug)) {
      throw new EditorApiError(
        404,
        "trip_not_registered",
        "Only an already-registered trip can be edited."
      );
    }

    const file = await this.getFile(tripDocumentPath(slug), ref);
    let document;
    try {
      document = parseTripDocument(JSON.parse(file.content));
      assertDocumentSlug(document, slug);
    } catch (error) {
      if (error instanceof SyntaxError) {
        throw new EditorApiError(
          502,
          "github_repository_invalid",
          "The registered trip document is not valid JSON."
        );
      }
      if (error instanceof EditorApiError) {
        throw new EditorApiError(
          502,
          "github_repository_invalid",
          "The registered trip document is invalid."
        );
      }
      throw error;
    }
    return { ...file, document };
  }

  async listTrips() {
    const baseSha = await this.getHeadSha();
    const slugs = await this.getRegistry(baseSha);
    const loadedTrips = await Promise.all(
      slugs.map((slug) => this.loadTripAtRef(slug, baseSha, slugs))
    );
    return {
      baseSha,
      trips: loadedTrips.map(({ blobSha, document }) => ({
        blobSha,
        slug: document.slug,
        date: document.metadata.date,
        dateRange: document.metadata.dateRange,
        title: document.metadata.title,
        subtitle: document.metadata.subtitle,
        location: document.metadata.location,
        private: document.metadata.private,
      })),
    };
  }

  async loadTrip(slug) {
    const baseSha = await this.getHeadSha();
    const slugs = await this.getRegistry(baseSha);
    const trip = await this.loadTripAtRef(slug, baseSha, slugs);
    return {
      baseSha,
      blobSha: trip.blobSha,
      document: trip.document,
    };
  }

  validateBaseShas(baseSha, blobSha) {
    if (!GIT_SHA_PATTERN.test(baseSha) || !GIT_SHA_PATTERN.test(blobSha)) {
      throw new EditorApiError(
        400,
        "invalid_base_revision",
        "baseSha and baseBlobSha must be Git object SHAs."
      );
    }
  }

  async assertDraftBase(slug, baseSha, baseBlobSha) {
    this.validateBaseShas(baseSha, baseBlobSha);
    const currentHead = await this.getHeadSha();
    if (currentHead !== baseSha) {
      throw new EditorApiError(
        409,
        "publish_conflict",
        "The main branch changed after this trip was loaded."
      );
    }
    const slugs = await this.getRegistry(currentHead);
    const current = await this.loadTripAtRef(slug, currentHead, slugs);
    if (current.blobSha !== baseBlobSha) {
      throw new EditorApiError(
        409,
        "publish_conflict",
        "The trip document changed after it was loaded."
      );
    }
    return current;
  }

  async publishTrip({ slug, document, baseSha, baseBlobSha }) {
    parseTripDocument(document);
    assertDocumentSlug(document, slug);
    await this.assertDraftBase(slug, baseSha, baseBlobSha);

    let baseCommit;
    let commitSha;
    try {
      baseCommit = await this.github(
        this.repositoryPath(`/git/commits/${baseSha}`),
        { operation: "load base commit" }
      );
      if (
        typeof baseCommit?.tree?.sha !== "string" ||
        !GIT_SHA_PATTERN.test(baseCommit.tree.sha)
      ) {
        throw new EditorApiError(
          502,
          "github_invalid_response",
          "GitHub returned an invalid base commit."
        );
      }
      const blob = await this.github(this.repositoryPath("/git/blobs"), {
        method: "POST",
        operation: "create document blob",
        body: {
          content: `${JSON.stringify(document, null, 2)}\n`,
          encoding: "utf-8",
        },
      });
      const blobSha = gitObjectSha(blob, "document blob");
      const tree = await this.github(this.repositoryPath("/git/trees"), {
        method: "POST",
        operation: "create document tree",
        body: {
          base_tree: baseCommit.tree.sha,
          tree: [
            {
              path: tripDocumentPath(slug),
              mode: "100644",
              type: "blob",
              sha: blobSha,
            },
          ],
        },
      });
      const treeSha = gitObjectSha(tree, "document tree");
      const commit = await this.github(this.repositoryPath("/git/commits"), {
        method: "POST",
        operation: "create document commit",
        body: {
          message: `Update ${slug} travel journal`,
          tree: treeSha,
          parents: [baseSha],
        },
      });
      commitSha = gitObjectSha(commit, "document commit");
      await this.github(
        this.repositoryPath(`/git/refs/heads/${MAIN_BRANCH}`),
        {
          method: "PATCH",
          operation: "update main branch",
          body: { sha: commitSha, force: false },
        }
      );
    } catch (error) {
      if (
        error instanceof GitHubApiFailure &&
        error.operation === "update main branch" &&
        [409, 422].includes(error.status)
      ) {
        throw new EditorApiError(
          409,
          "publish_conflict",
          "The main branch changed before the publish could complete."
        );
      }
      if (error instanceof GitHubApiFailure) {
        throw new EditorApiError(
          502,
          "github_publish_failed",
          "GitHub could not create the journal commit."
        );
      }
      throw error;
    }

    return {
      commitSha,
      commitUrl: `https://github.com/${this.owner}/${this.repository}/commit/${commitSha}`,
    };
  }
}
