import assert from "node:assert/strict";
import test from "node:test";
import { createUnlockHandler } from "../src/functions/unlock.js";
import { PRIVATE_JOURNAL_READ_SCOPE } from "../src/microsoft-token.js";
import { derivePrivateTripPassphrase } from "../src/private-trip-key.js";

const config = {
  allowedOrigin: "https://muyangamigo.github.io",
  allowedSubject: "authorized-subject",
  clientId: "11111111-2222-3333-4444-555555555555",
  masterPassphrase: "server-only-passphrase",
  privatePasscode: "correct-passcode",
};

function request({
  authorization = "Bearer valid-token",
  method = "POST",
  origin = config.allowedOrigin,
  passcode,
} = {}) {
  return {
    headers: new Headers({ authorization, origin }),
    json: async () => ({ locale: "zh", passcode, slug: "bangkok-2026" }),
    method,
  };
}

function context() {
  return {
    error() {},
    log() {},
    warn() {},
  };
}

const passcodeLimiter = {
  check: async () => ({ blocked: false, retryAfter: 0 }),
  clear: async () => {},
  recordFailure: async () => ({ blocked: false, retryAfter: 0 }),
};

test("returns the passphrase only to the authorized account", async () => {
  let requiredScope;
  const handler = createUnlockHandler({
    getConfig: () => config,
    verifyToken: async (_token, _clientId, scope) => {
      requiredScope = scope;
      return {
        preferred_username: "authorized@example.com",
        sub: "authorized-subject",
      };
    },
  });

  const result = await handler(request(), context());
  assert.equal(result.status, 200);
  assert.deepEqual(result.jsonBody, {
    microsoftClientId: config.clientId,
    passphrase: derivePrivateTripPassphrase(
      config.masterPassphrase,
      "zh",
      "bangkok-2026"
    ),
  });
  assert.equal(result.headers["Cache-Control"], "no-store");
  assert.equal(requiredScope, PRIVATE_JOURNAL_READ_SCOPE);
});

test("rejects another valid Microsoft account", async () => {
  const handler = createUnlockHandler({
    getConfig: () => config,
    verifyToken: async () => ({
      preferred_username: "someone@example.com",
      sub: "other-subject",
    }),
  });

  const result = await handler(request(), context());
  assert.equal(result.status, 403);
  assert.equal(result.jsonBody.passphrase, undefined);
});

test("returns the page key for the valid private passcode", async () => {
  const handler = createUnlockHandler({
    getConfig: () => config,
    passcodeLimiter,
    verifyToken: async () => {
      throw new Error("Microsoft verification should not run.");
    },
  });

  const result = await handler(
    request({ authorization: "", passcode: "correct-passcode" }),
    context()
  );
  assert.equal(result.status, 200);
  assert.equal(
    result.jsonBody.passphrase,
    derivePrivateTripPassphrase(
      config.masterPassphrase,
      "zh",
      "bangkok-2026"
    )
  );
});

test("rejects an invalid private passcode", async () => {
  const handler = createUnlockHandler({
    getConfig: () => config,
    passcodeLimiter,
  });
  const result = await handler(
    request({ authorization: "", passcode: "wrong-passcode" }),
    context()
  );
  assert.equal(result.status, 401);
  assert.equal(result.jsonBody.passphrase, undefined);
});

test("returns retry guidance when passcode attempts are throttled", async () => {
  const handler = createUnlockHandler({
    getConfig: () => config,
    passcodeLimiter: {
      ...passcodeLimiter,
      check: async () => ({ blocked: true, retryAfter: 321 }),
    },
  });
  const result = await handler(
    request({ authorization: "", passcode: "wrong-passcode" }),
    context()
  );
  assert.equal(result.status, 429);
  assert.equal(result.headers["Retry-After"], "321");
  assert.equal(result.jsonBody.passphrase, undefined);
});

test("fails closed when durable passcode throttling is unavailable", async () => {
  const handler = createUnlockHandler({
    getConfig: () => config,
    passcodeLimiter: {
      ...passcodeLimiter,
      check: async () => {
        throw new Error("storage unavailable");
      },
    },
  });
  const result = await handler(
    request({ authorization: "", passcode: "wrong-passcode" }),
    context()
  );
  assert.equal(result.status, 503);
  assert.equal(result.jsonBody.passphrase, undefined);
});

test("rejects requests from another browser origin", async () => {
  const handler = createUnlockHandler({ getConfig: () => config });
  const result = await handler(
    request({ origin: "https://example.com" }),
    context()
  );
  assert.equal(result.status, 403);
});

test("answers an allowed CORS preflight without authenticating", async () => {
  const handler = createUnlockHandler({ getConfig: () => config });
  const result = await handler(request({ method: "OPTIONS" }), context());
  assert.equal(result.status, 204);
  assert.equal(
    result.headers["Access-Control-Allow-Origin"],
    config.allowedOrigin
  );
});
