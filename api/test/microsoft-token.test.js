import assert from "node:assert/strict";
import test from "node:test";
import { generateKeyPair, SignJWT } from "jose";
import {
  CONSUMER_ISSUER,
  CONSUMER_TENANT_ID,
  createMicrosoftTokenVerifier,
  isAuthorizedIdentity,
  REQUIRED_SCOPE,
} from "../src/microsoft-token.js";

const clientId = "11111111-2222-3333-4444-555555555555";

async function signToken(privateKey, overrides = {}) {
  return new SignJWT({
    scp: REQUIRED_SCOPE,
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
  const payload = await verify(await signToken(privateKey), clientId);
  assert.equal(payload.sub, "immutable-subject");
});

test("rejects a token without the private journal scope", async () => {
  const { privateKey, publicKey } = await generateKeyPair("RS256");
  const verify = createMicrosoftTokenVerifier(publicKey);
  await assert.rejects(
    verify(await signToken(privateKey, { scp: "profile" }), clientId),
    /PrivateJournal\.Read/u
  );
});

test("authorizes only the immutable subject", () => {
  assert.equal(
    isAuthorizedIdentity(
      { preferred_username: "authorized@example.com", sub: "wrong" },
      {
        allowedSubject: "expected",
      }
    ),
    false
  );
  assert.equal(
    isAuthorizedIdentity(
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
