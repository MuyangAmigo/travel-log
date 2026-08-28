import assert from "node:assert/strict";
import test from "node:test";
import {
  getMicrosoftDelegatedScope,
  getSafeMicrosoftReturnUrl,
  isLocalEditorPreviewEnabled,
  parseMicrosoftAuthenticationFlow,
  PRIVATE_JOURNAL_READ_SCOPE,
  TRAVEL_JOURNAL_EDIT_SCOPE,
} from "./microsoft-auth-policy.ts";

const origin = "https://muyangamigo.github.io";
const basePath = "/travel-log";

test("keeps private-journal authentication on localized trip routes", () => {
  assert.equal(
    getSafeMicrosoftReturnUrl(
      `${origin}${basePath}/zh/trips/bangkok-2026/?from=gate#unlock`,
      "private-journal",
      origin,
      basePath
    ),
    `${origin}${basePath}/zh/trips/bangkok-2026/?from=gate#unlock`
  );
  assert.throws(
    () =>
      getSafeMicrosoftReturnUrl(
        `${origin}${basePath}/edit/`,
        "private-journal",
        origin,
        basePath
      ),
    /return address is invalid/u
  );
  assert.throws(
    () =>
      getSafeMicrosoftReturnUrl(
        `${origin}${basePath}/zh/trips/bangkok-2026/extra`,
        "private-journal",
        origin,
        basePath
      ),
    /return address is invalid/u
  );
});

test("allows editor authentication only to return to the exact static edit route", () => {
  assert.equal(
    getSafeMicrosoftReturnUrl(
      `${origin}${basePath}/edit/?trip=bangkok-2026`,
      "editor",
      origin,
      basePath
    ),
    `${origin}${basePath}/edit/?trip=bangkok-2026`
  );
  for (const unsafeUrl of [
    `${origin}${basePath}/edit/trip/`,
    `${origin}${basePath}/zh/trips/bangkok-2026/`,
    `https://example.com${basePath}/edit/`,
  ]) {
    assert.throws(
      () =>
        getSafeMicrosoftReturnUrl(unsafeUrl, "editor", origin, basePath),
      /return address is invalid/u
    );
  }
});

test("uses separate delegated scopes for reader and editor flows", () => {
  assert.equal(
    getMicrosoftDelegatedScope(parseMicrosoftAuthenticationFlow(null)),
    PRIVATE_JOURNAL_READ_SCOPE
  );
  assert.equal(
    getMicrosoftDelegatedScope(parseMicrosoftAuthenticationFlow("editor")),
    TRAVEL_JOURNAL_EDIT_SCOPE
  );
  assert.throws(
    () => parseMicrosoftAuthenticationFlow("TravelJournal.Edit"),
    /flow is invalid/u
  );
});

test("allows auth bypass only for an explicit development loopback preview", () => {
  assert.equal(
    isLocalEditorPreviewEnabled({
      flag: "1",
      hostname: "localhost",
      nodeEnv: "development",
    }),
    true
  );
  assert.equal(
    isLocalEditorPreviewEnabled({
      flag: "1",
      hostname: "muyangamigo.github.io",
      nodeEnv: "development",
    }),
    false
  );
  assert.equal(
    isLocalEditorPreviewEnabled({
      flag: "1",
      hostname: "localhost",
      nodeEnv: "production",
    }),
    false
  );
  assert.equal(
    isLocalEditorPreviewEnabled({
      flag: undefined,
      hostname: "localhost",
      nodeEnv: "development",
    }),
    false
  );
});
