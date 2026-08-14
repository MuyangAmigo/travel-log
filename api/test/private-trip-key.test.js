import assert from "node:assert/strict";
import test from "node:test";
import {
  derivePrivateTripPassphrase,
  isValidPrivatePasscode,
} from "../src/private-trip-key.js";

test("derives stable, page-specific passphrases", () => {
  const first = derivePrivateTripPassphrase("master", "zh", "bangkok-2026");
  assert.equal(
    first,
    derivePrivateTripPassphrase("master", "zh", "bangkok-2026")
  );
  assert.notEqual(
    first,
    derivePrivateTripPassphrase("master", "en", "bangkok-2026")
  );
  assert.notEqual(
    first,
    derivePrivateTripPassphrase("master", "zh", "chengdu-2025")
  );
});

test("rejects malformed route identifiers", () => {
  assert.throws(
    () => derivePrivateTripPassphrase("master", "fr", "bangkok-2026"),
    /locale/u
  );
  assert.throws(
    () => derivePrivateTripPassphrase("master", "zh", "../private"),
    /slug/u
  );
});

test("compares private passcodes without exposing the master key", () => {
  assert.equal(isValidPrivatePasscode("correct-passcode", "correct-passcode"), true);
  assert.equal(isValidPrivatePasscode("wrong-passcode", "correct-passcode"), false);
});
