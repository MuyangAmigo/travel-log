#!/usr/bin/env node
// Post-build step: AES-encrypt the HTML of trips marked `private: true`.
// The master passphrase remains server-side. The authentication API releases
// only a page-specific key after Microsoft-account or passcode validation.
//
// Private slugs are discovered from each trip's structured content document,
// which is also the source used by the runtime metadata adapter.

import {
  readFileSync,
  writeFileSync,
  readdirSync,
  existsSync,
  copyFileSync,
  rmSync,
  mkdirSync,
} from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";
import { createRequire } from "node:module";
import { derivePrivateTripPassphrase } from "../api/src/private-trip-key.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const REPO_ROOT = join(__dirname, "..");
const TRIPS_SRC = join(REPO_ROOT, "site", "src", "content", "trips");
const OUT_DIR = join(REPO_ROOT, "site", "out");
const TEMPLATE_PATH = join(
  REPO_ROOT,
  "scripts",
  "microsoft-auth-template.html"
);
const LOCALES = ["zh", "en"];

function resolveStaticryptCli() {
  const siteRequire = createRequire(join(REPO_ROOT, "site", "package.json"));
  let packagePath;
  try {
    packagePath = siteRequire.resolve("staticrypt/package.json");
  } catch (error) {
    throw new Error(
      "[encrypt] staticrypt is not installed. Run npm install in site/ before building.",
      { cause: error }
    );
  }

  const packageJson = JSON.parse(readFileSync(packagePath, "utf8"));
  const binPath =
    typeof packageJson.bin === "string"
      ? packageJson.bin
      : packageJson.bin?.staticrypt;
  if (!binPath) {
    throw new Error(
      "[encrypt] the installed staticrypt package does not declare a staticrypt CLI."
    );
  }

  const cliPath = join(dirname(packagePath), binPath);
  if (!existsSync(cliPath)) {
    throw new Error(
      `[encrypt] the staticrypt CLI declared by the package does not exist: ${cliPath}`
    );
  }
  return cliPath;
}

const STATICRYPT_CLI = resolveStaticryptCli();

function findPrivateSlugs() {
  if (!existsSync(TRIPS_SRC)) return [];
  const slugs = [];
  for (const slug of readdirSync(TRIPS_SRC, { withFileTypes: true })) {
    if (!slug.isDirectory()) continue;
    const metaPath = join(TRIPS_SRC, slug.name, "meta.ts");
    if (!existsSync(metaPath)) continue;
    const contentPath = join(TRIPS_SRC, slug.name, "content.json");
    if (!existsSync(contentPath)) {
      throw new Error(
        `[encrypt] registered trip source is missing: ${contentPath}`
      );
    }

    let document;
    try {
      document = JSON.parse(readFileSync(contentPath, "utf8"));
    } catch (error) {
      throw new Error(
        `[encrypt] registered trip source is not valid JSON: ${contentPath}`,
        { cause: error }
      );
    }
    if (
      document?.slug !== slug.name ||
      typeof document?.metadata?.private !== "boolean"
    ) {
      throw new Error(
        `[encrypt] registered trip source has invalid slug or privacy metadata: ${contentPath}`
      );
    }
    if (document.metadata.private) {
      slugs.push(slug.name);
    }
  }
  return slugs;
}

const password = process.env.TRAVEL_LOG_PRIVATE_PASSWORD?.trim();
const microsoftClientId =
  process.env.NEXT_PUBLIC_MICROSOFT_CLIENT_ID?.trim();
const authApiUrl = process.env.TRAVEL_LOG_AUTH_API_URL?.trim();
const authCallbackUrl =
  process.env.NEXT_PUBLIC_MICROSOFT_REDIRECT_URI?.trim();
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

function requireGuid(name, value) {
  if (!value || !/^[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}$/iu.test(value)) {
    console.error(`[encrypt] ${name} must be a Microsoft application client ID.`);
    process.exit(1);
  }
}

function requireSecureUrl(name, value) {
  let parsed;
  try {
    parsed = new URL(value);
  } catch {
    console.error(`[encrypt] ${name} must be an absolute URL.`);
    process.exit(1);
  }

  const isLocalDevelopment =
    parsed.protocol === "http:" &&
    (parsed.hostname === "localhost" || parsed.hostname === "127.0.0.1");
  if (parsed.protocol !== "https:" && !isLocalDevelopment) {
    console.error(`[encrypt] ${name} must use HTTPS (except on localhost).`);
    process.exit(1);
  }
}

function injectAuthConfig(htmlPath, { locale, slug }) {
  let html = readFileSync(htmlPath, "utf8");
  const replacements = new Map([
    ["__TRAVEL_LOG_AUTH_API_URL__", JSON.stringify(authApiUrl)],
    ["__TRAVEL_LOG_AUTH_CALLBACK_URL__", JSON.stringify(authCallbackUrl)],
    ["__TRAVEL_LOG_LOCALE__", JSON.stringify(locale)],
    ["__TRAVEL_LOG_SLUG__", JSON.stringify(slug)],
  ]);

  for (const [marker, replacement] of replacements) {
    const occurrences = html.split(marker).length - 1;
    if (occurrences !== 1) {
      throw new Error(
        `[encrypt] expected one ${marker} marker in ${htmlPath}, found ${occurrences}`
      );
    }
    html = html.replace(marker, replacement);
  }

  writeFileSync(htmlPath, html, "utf8");
}

function removePlaintextRoutePayloads(routeDirectory) {
  let removed = 0;
  for (const entry of readdirSync(routeDirectory, { withFileTypes: true })) {
    const entryPath = join(routeDirectory, entry.name);
    if (entry.isDirectory()) {
      removed += removePlaintextRoutePayloads(entryPath);
    } else if (entry.isFile() && entry.name.endsWith(".txt")) {
      rmSync(entryPath);
      removed++;
    }
  }
  return removed;
}

requireGuid("NEXT_PUBLIC_MICROSOFT_CLIENT_ID", microsoftClientId);
requireSecureUrl("TRAVEL_LOG_AUTH_API_URL", authApiUrl);
requireSecureUrl("NEXT_PUBLIC_MICROSOFT_REDIRECT_URI", authCallbackUrl);

if (!existsSync(OUT_DIR)) {
  console.error(`[encrypt] ${OUT_DIR} does not exist — run next build first.`);
  process.exit(1);
}

const tmpRoot = join(OUT_DIR, "_encrypt-tmp");
rmSync(tmpRoot, { recursive: true, force: true });
mkdirSync(tmpRoot, { recursive: true });

let encryptedCount = 0;
let removedPayloadCount = 0;
try {
  for (const slug of slugs) {
    for (const locale of LOCALES) {
      const htmlPath = join(OUT_DIR, locale, "trips", slug, "index.html");
      if (!existsSync(htmlPath)) {
        throw new Error(`[encrypt] missing private route HTML: ${htmlPath}`);
      }
      const tmpDir = join(tmpRoot, `${locale}-${slug}`);
      mkdirSync(tmpDir, { recursive: true });
      console.log(`[encrypt] ${locale}/trips/${slug}/`);
      execFileSync(
        process.execPath,
        [
          STATICRYPT_CLI,
          htmlPath,
          "--short",
          "--remember=false",
          "--template",
          TEMPLATE_PATH,
          "--template-title",
          "Private Travel Log",
          "--template-instructions",
          "使用 Microsoft 个人账号或私密口令继续阅读。Sign in with Microsoft or use the private passcode.",
          "--template-placeholder",
          "输入密码 / Password",
          "--template-button",
          "Unlock entry",
          "--template-error",
          "密码不对，请再试一次。",
          "--template-toggle-show",
          "显示密码",
          "--template-toggle-hide",
          "隐藏密码",
          "-d",
          tmpDir,
        ],
        {
          stdio: "inherit",
          env: {
            ...process.env,
            STATICRYPT_PASSWORD: derivePrivateTripPassphrase(
              password,
              locale,
              slug
            ),
          },
        }
      );
      copyFileSync(join(tmpDir, "index.html"), htmlPath);
      injectAuthConfig(htmlPath, { locale, slug });
      const routePayloadCount = removePlaintextRoutePayloads(dirname(htmlPath));
      if (routePayloadCount === 0) {
        throw new Error(
          `[encrypt] no plaintext route payloads found for ${locale}/trips/${slug}; refusing to deploy`
        );
      }
      removedPayloadCount += routePayloadCount;
      encryptedCount++;
    }
  }
} finally {
  rmSync(tmpRoot, { recursive: true, force: true });
}

console.log(
  `[encrypt] done. ${encryptedCount} file(s) encrypted and ${removedPayloadCount} plaintext route payload(s) removed across ${slugs.length} trip(s).`
);
