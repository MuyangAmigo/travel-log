import assert from "node:assert/strict";
import test from "node:test";
import { loadConfig } from "../src/config.js";

const baseEnvironment = {
  ALLOWED_MICROSOFT_SUB: "immutable-subject",
  ALLOWED_ORIGIN: "https://muyangamigo.github.io/travel-log/",
  MICROSOFT_CLIENT_ID: "11111111-2222-3333-4444-555555555555",
  TRAVEL_LOG_PRIVATE_PASSCODE: "separate-passcode",
  TRAVEL_LOG_PRIVATE_PASSWORD: "test-passphrase",
};

test("loads and normalizes the authentication settings", () => {
  assert.deepEqual(loadConfig(baseEnvironment), {
    allowedOrigin: "https://muyangamigo.github.io",
    allowedSubject: "immutable-subject",
    clientId: "11111111-2222-3333-4444-555555555555",
    masterPassphrase: "test-passphrase",
    privatePasscode: "separate-passcode",
  });
});

test("requires an immutable subject allowlist", () => {
  assert.throws(
    () =>
      loadConfig({
        ...baseEnvironment,
        ALLOWED_MICROSOFT_SUB: "",
      }),
    /Missing required application setting: ALLOWED_MICROSOFT_SUB/u
  );
});

test("requires a separate high-entropy private passcode", () => {
  assert.throws(
    () =>
      loadConfig({
        ...baseEnvironment,
        TRAVEL_LOG_PRIVATE_PASSCODE: "short",
      }),
    /at least 12 characters/u
  );
  assert.throws(
    () =>
      loadConfig({
        ...baseEnvironment,
        TRAVEL_LOG_PRIVATE_PASSCODE: baseEnvironment.TRAVEL_LOG_PRIVATE_PASSWORD,
      }),
    /must not match/u
  );
});
