import assert from "node:assert/strict";
import test from "node:test";
import { generateKeyPair, SignJWT } from "jose";
import {
  CONSUMER_ISSUER,
  CONSUMER_TENANT_ID,
  createMicrosoftTokenVerifier,
  isAuthorizedEditor,
  isAuthorizedReader,
  PRIVATE_JOURNAL_READ_SCOPE,
  TRAVEL_JOURNAL_EDIT_SCOPE,
} from "../src/microsoft-token.js";

const clientId = "11111111-2222-3333-4444-555555555555";

async function signToken(privateKey, overrides = {}) {
  return new SignJWT({
    scp: PRIVATE_JOURNAL_READ_SCOPE,
    sub: "immutable-subject",
    tid: CONSUMER_TENANT_ID,
    ...overrides,
  })
    .setProtectedHeader({ alg: "RS256" })
    .setAudience(clientId)
    .setIssuer(CONSUMER_ISSUER)
    .setIssuedAt()
    .setExpirationTime("5m")
    .sign(privateKey);
}

test("validates consumer token audience, issuer, and scope", async () => {
  const { privateKey, publicKey } = await generateKeyPair("RS256");
  const verify = createMicrosoftTokenVerifier(publicKey);
  const payload = await verify(
    await signToken(privateKey),
    clientId,
    PRIVATE_JOURNAL_READ_SCOPE
  );
  assert.equal(payload.sub, "immutable-subject");
});

test("rejects a token without the private journal scope", async () => {
  const { privateKey, publicKey } = await generateKeyPair("RS256");
  const verify = createMicrosoftTokenVerifier(publicKey);
  await assert.rejects(
    verify(
      await signToken(privateKey, { scp: "profile" }),
      clientId,
      PRIVATE_JOURNAL_READ_SCOPE
    ),
    /PrivateJournal\.Read/u
  );
});

test("enforces the endpoint-specific delegated scope", async () => {
  const { privateKey, publicKey } = await generateKeyPair("RS256");
  const verify = createMicrosoftTokenVerifier(publicKey);
  const editToken = await signToken(privateKey, {
    scp: TRAVEL_JOURNAL_EDIT_SCOPE,
  });

  const payload = await verify(
    editToken,
    clientId,
    TRAVEL_JOURNAL_EDIT_SCOPE
  );
  assert.equal(payload.sub, "immutable-subject");
  await assert.rejects(
    verify(editToken, clientId, PRIVATE_JOURNAL_READ_SCOPE),
    /PrivateJournal\.Read/u
  );
});

test("fails closed when an endpoint omits its required scope", async () => {
  const { privateKey, publicKey } = await generateKeyPair("RS256");
  const verify = createMicrosoftTokenVerifier(publicKey);
  await assert.rejects(
    verify(await signToken(privateKey), clientId),
    /required Microsoft delegated scope/u
  );
});

test("authorizes only the immutable editor subject", () => {
  assert.equal(
    isAuthorizedEditor(
      { preferred_username: "authorized@example.com", sub: "wrong" },
      {
        allowedSubject: "expected",
      }
    ),
    false
  );
  assert.equal(
    isAuthorizedEditor(
      {
        preferred_username: "Authorized@Example.com",
        sub: "expected",
      },
      {
        allowedSubject: "expected",
      }
    ),
    true
  );
});

test("authorizes every immutable reader subject", () => {
  const config = {
    allowedReaderSubjects: ["owner", "reader"],
  };

  assert.equal(isAuthorizedReader({ sub: "owner" }, config), true);
  assert.equal(isAuthorizedReader({ sub: "reader" }, config), true);
  assert.equal(isAuthorizedReader({ sub: "someone-else" }, config), false);
});
