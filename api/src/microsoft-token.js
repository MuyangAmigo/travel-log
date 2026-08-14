import { createRemoteJWKSet, jwtVerify } from "jose";

export const CONSUMER_TENANT_ID = "9188040d-6c67-4c5b-b112-36a304b66dad";
export const CONSUMER_ISSUER =
  `https://login.microsoftonline.com/${CONSUMER_TENANT_ID}/v2.0`;
export const REQUIRED_SCOPE = "PrivateJournal.Read";

const microsoftKeySet = createRemoteJWKSet(
  new URL("https://login.microsoftonline.com/consumers/discovery/v2.0/keys")
);

export function createMicrosoftTokenVerifier(keySet = microsoftKeySet) {
  return async function verifyMicrosoftAccessToken(token, clientId) {
    const { payload } = await jwtVerify(token, keySet, {
      algorithms: ["RS256"],
      audience: [clientId, `api://${clientId}`],
      issuer: CONSUMER_ISSUER,
    });

    if (payload.tid !== CONSUMER_TENANT_ID) {
      throw new Error("Token was not issued for a Microsoft personal account.");
    }

    const scopes =
      typeof payload.scp === "string" ? payload.scp.split(/\s+/u) : [];
    if (!scopes.includes(REQUIRED_SCOPE)) {
      throw new Error(`Token does not include ${REQUIRED_SCOPE}.`);
    }

    return payload;
  };
}

export const verifyMicrosoftAccessToken = createMicrosoftTokenVerifier();

export function isAuthorizedIdentity(payload, config) {
  return payload.sub === config.allowedSubject;
}
