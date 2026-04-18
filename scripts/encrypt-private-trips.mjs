#!/usr/bin/env node
// Post-build step: AES-encrypt the HTML of trips marked `private: true`
// so that only viewers with the shared password (TRAVEL_LOG_PRIVATE_PASSWORD)
// can decrypt and read them in the browser. See the project CLAUDE.md + the
// `private` field on TripMeta (site/src/lib/trips.ts) for context.
//
// Private slugs are discovered by regex-scanning each trip's meta.ts for
// `private: true` — avoids needing ts-node / tsconfig-paths to import the
// TypeScript registry from a vanilla Node script.

import {
  readFileSync,
  readdirSync,
  existsSync,
  copyFileSync,
  rmSync,
  mkdirSync,
} from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const REPO_ROOT = join(__dirname, "..");
const TRIPS_SRC = join(REPO_ROOT, "site", "src", "content", "trips");
const OUT_DIR = join(REPO_ROOT, "site", "out");
const LOCALES = ["zh", "en"];

function findPrivateSlugs() {
  if (!existsSync(TRIPS_SRC)) return [];
  const slugs = [];
  for (const slug of readdirSync(TRIPS_SRC, { withFileTypes: true })) {
    if (!slug.isDirectory()) continue;
    const metaPath = join(TRIPS_SRC, slug.name, "meta.ts");
    if (!existsSync(metaPath)) continue;
    const src = readFileSync(metaPath, "utf8");
    if (/^\s*private\s*:\s*true\s*,?\s*$/m.test(src)) {
      slugs.push(slug.name);
    }
  }
  return slugs;
}

const password = process.env.TRAVEL_LOG_PRIVATE_PASSWORD;
const slugs = findPrivateSlugs();

if (slugs.length === 0) {
  console.log("[encrypt] no private trips found, skipping.");
  process.exit(0);
}

if (!password) {
  console.error(
    "[encrypt] private trips exist but TRAVEL_LOG_PRIVATE_PASSWORD is not set:"
  );
  console.error("[encrypt]   " + slugs.join(", "));
  console.error("[encrypt] refusing to ship unprotected content. aborting.");
  process.exit(1);
}

if (!existsSync(OUT_DIR)) {
  console.error(`[encrypt] ${OUT_DIR} does not exist — run next build first.`);
  process.exit(1);
}

const tmpRoot = join(OUT_DIR, "_encrypt-tmp");
rmSync(tmpRoot, { recursive: true, force: true });
mkdirSync(tmpRoot, { recursive: true });

let encryptedCount = 0;
try {
  for (const slug of slugs) {
    for (const locale of LOCALES) {
      const htmlPath = join(OUT_DIR, locale, "trips", slug, "index.html");
      if (!existsSync(htmlPath)) {
        console.warn(`[encrypt] missing (skipping): ${htmlPath}`);
        continue;
      }
      const tmpDir = join(tmpRoot, `${locale}-${slug}`);
      mkdirSync(tmpDir, { recursive: true });
      console.log(`[encrypt] ${locale}/trips/${slug}/`);
      execSync(
        `npx --yes staticrypt ${JSON.stringify(htmlPath)} --short -d ${JSON.stringify(tmpDir)}`,
        {
          stdio: "inherit",
          env: { ...process.env, STATICRYPT_PASSWORD: password },
        }
      );
      copyFileSync(join(tmpDir, "index.html"), htmlPath);
      encryptedCount++;
    }
  }
} finally {
  rmSync(tmpRoot, { recursive: true, force: true });
}

console.log(
  `[encrypt] done. ${encryptedCount} file(s) encrypted across ${slugs.length} trip(s).`
);
