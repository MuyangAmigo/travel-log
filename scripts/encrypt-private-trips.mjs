#!/usr/bin/env node
// Post-build step: AES-encrypt the HTML of trips marked `private: true`.
// The passphrase remains server-side and is released by the authentication API
// only after it validates the authorized Microsoft personal account.
//
// Private slugs are discovered by regex-scanning each trip's meta.ts for
// `private: true` — avoids needing ts-node / tsconfig-paths to import the
// TypeScript registry from a vanilla Node script.

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
import { execSync } from "node:child_process";
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
    if (entry.isFile() && entry.name.endsWith(".txt")) {
      rmSync(join(routeDirectory, entry.name));
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
        console.warn(`[encrypt] missing (skipping): ${htmlPath}`);
        continue;
      }
      const tmpDir = join(tmpRoot, `${locale}-${slug}`);
      mkdirSync(tmpDir, { recursive: true });
      console.log(`[encrypt] ${locale}/trips/${slug}/`);
      execSync(
        [
          "npx --yes staticrypt",
          JSON.stringify(htmlPath),
          "--short",
          "--remember=false",
          "--template",
          JSON.stringify(TEMPLATE_PATH),
          "--template-title",
          JSON.stringify("Private Travel Log"),
          "--template-instructions",
          JSON.stringify("使用 Microsoft 个人账号或私密口令继续阅读。Sign in with Microsoft or use the private passcode."),
          "--template-placeholder",
          JSON.stringify("输入密码 / Password"),
          "--template-button",
          JSON.stringify("Unlock entry"),
          "--template-error",
          JSON.stringify("密码不对，请再试一次。"),
          "--template-toggle-show",
          JSON.stringify("显示密码"),
          "--template-toggle-hide",
          JSON.stringify("隐藏密码"),
          "-d",
          JSON.stringify(tmpDir),
        ].join(" "),
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
      removedPayloadCount += removePlaintextRoutePayloads(dirname(htmlPath));
      encryptedCount++;
    }
  }
} finally {
  rmSync(tmpRoot, { recursive: true, force: true });
}

console.log(
  `[encrypt] done. ${encryptedCount} file(s) encrypted and ${removedPayloadCount} plaintext route payload(s) removed across ${slugs.length} trip(s).`
);
