import { createHmac, scryptSync, timingSafeEqual } from "node:crypto";

const LOCALES = new Set(["zh", "en"]);
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/u;

export function derivePrivateTripPassphrase(masterPassphrase, locale, slug) {
  if (!masterPassphrase) throw new Error("The master passphrase is required.");
  if (!LOCALES.has(locale)) throw new Error("The locale is invalid.");
  if (!SLUG_PATTERN.test(slug)) throw new Error("The trip slug is invalid.");

  return createHmac("sha256", masterPassphrase)
    .update(`travel-log-private-page:v1:${locale}:${slug}`)
    .digest("base64url");
}

export function isValidPrivatePasscode(candidate, expected) {
  if (typeof candidate !== "string" || typeof expected !== "string") {
    return false;
  }

  const salt = "travel-log-private-passcode:v1";
  const candidateDigest = scryptSync(candidate, salt, 64);
  const expectedDigest = scryptSync(expected, salt, 64);
  return timingSafeEqual(candidateDigest, expectedDigest);
}
