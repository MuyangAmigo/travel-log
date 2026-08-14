#!/usr/bin/env node

import { timingSafeEqual } from "node:crypto";
import { derivePrivateTripPassphrase } from "../api/src/private-trip-key.js";

function requireEnvironment(name) {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
}

const apiUrl = requireEnvironment("TRAVEL_LOG_AUTH_API_URL");
const origin = requireEnvironment("TRAVEL_LOG_AUTH_ORIGIN");
const microsoftClientId = requireEnvironment("MICROSOFT_CLIENT_ID");
const masterPassphrase = requireEnvironment("TRAVEL_LOG_PRIVATE_PASSWORD");
const privatePasscode = requireEnvironment("TRAVEL_LOG_PRIVATE_PASSCODE");
const locale = "zh";
const slug = "bangkok-2026";

const response = await fetch(apiUrl, {
  method: "POST",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Origin: origin,
  },
  body: JSON.stringify({ locale, passcode: privatePasscode, slug }),
});
if (!response.ok) {
  throw new Error(
    `Authentication API canary returned HTTP ${response.status}.`
  );
}

const result = await response.json();
const expected = derivePrivateTripPassphrase(
  masterPassphrase,
  locale,
  slug
);
if (
  result.microsoftClientId !== microsoftClientId ||
  typeof result.passphrase !== "string" ||
  result.passphrase.length !== expected.length ||
  !timingSafeEqual(Buffer.from(result.passphrase), Buffer.from(expected))
) {
  throw new Error(
    "Authentication API and site build use different identity or encryption settings."
  );
}

console.log("[auth-check] Function credentials and page-key derivation match.");
