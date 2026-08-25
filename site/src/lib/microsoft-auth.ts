"use client";

import { siteBasePath } from "@/lib/base-path";

const PENDING_AUTH_STORAGE_KEY = "travel-log-microsoft-pkce";
export const MICROSOFT_AUTH_SESSION_STORAGE_KEY =
  "travel-log-microsoft-auth-session";
const CONSUMER_TENANT_ID = "9188040d-6c67-4c5b-b112-36a304b66dad";
const AUTHORIZATION_ENDPOINT =
  "https://login.microsoftonline.com/consumers/oauth2/v2.0/authorize";
const TOKEN_ENDPOINT =
  "https://login.microsoftonline.com/consumers/oauth2/v2.0/token";

interface PendingAuthentication {
  codeVerifier: string;
  createdAt: number;
  nonce: string;
  redirectUri: string;
  returnUrl: string;
  state: string;
}

interface TokenResponse {
  access_token?: string;
  error?: string;
  error_description?: string;
  expires_in?: number;
  id_token?: string;
}

interface IdTokenPayload {
  aud?: string;
  nonce?: string;
  tid?: string;
}

function getClientId() {
  const clientId = process.env.NEXT_PUBLIC_MICROSOFT_CLIENT_ID?.trim();
  if (!clientId) {
    throw new Error("Microsoft authentication is not configured.");
  }
  return clientId;
}

function getRedirectUri() {
  const redirectUri =
    process.env.NEXT_PUBLIC_MICROSOFT_REDIRECT_URI?.trim();
  if (!redirectUri) {
    throw new Error("Microsoft authentication callback is not configured.");
  }
  return redirectUri;
}

function toBase64Url(bytes: Uint8Array) {
  const binary = Array.from(bytes, (byte) => String.fromCharCode(byte)).join("");
  return btoa(binary)
    .replaceAll("+", "-")
    .replaceAll("/", "_")
    .replace(/=+$/u, "");
}

function randomBase64Url(byteLength: number) {
  return toBase64Url(crypto.getRandomValues(new Uint8Array(byteLength)));
}

async function createCodeChallenge(codeVerifier: string) {
  const digest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(codeVerifier)
  );
  return toBase64Url(new Uint8Array(digest));
}

function decodeJwtPayload(token: string): IdTokenPayload {
  const payload = token.split(".")[1];
  if (!payload) throw new Error("Microsoft returned an invalid ID token.");

  const normalized = payload.replaceAll("-", "+").replaceAll("_", "/");
  const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, "=");
  const bytes = Uint8Array.from(atob(padded), (character) =>
    character.charCodeAt(0)
  );
  return JSON.parse(new TextDecoder().decode(bytes)) as IdTokenPayload;
}

function getSafeReturnUrl(value: string) {
  const returnUrl = new URL(value);
  const privateRoutePrefix = `${siteBasePath}/`;
  const isPrivateTrip =
    returnUrl.pathname.startsWith(`${privateRoutePrefix}zh/trips/`) ||
    returnUrl.pathname.startsWith(`${privateRoutePrefix}en/trips/`);

  if (returnUrl.origin !== window.location.origin || !isPrivateTrip) {
    throw new Error("The private journal return address is invalid.");
  }

  return returnUrl.href;
}

export async function startMicrosoftAuthentication(returnUrl: string) {
  const clientId = getClientId();
  const redirectUri = getRedirectUri();
  const codeVerifier = randomBase64Url(64);
  const codeChallenge = await createCodeChallenge(codeVerifier);
  const state = randomBase64Url(32);
  const nonce = randomBase64Url(32);
  const safeReturnUrl = getSafeReturnUrl(returnUrl);

  const pending: PendingAuthentication = {
    codeVerifier,
    createdAt: Date.now(),
    nonce,
    redirectUri,
    returnUrl: safeReturnUrl,
    state,
  };
  window.sessionStorage.setItem(
    PENDING_AUTH_STORAGE_KEY,
    JSON.stringify(pending)
  );

  const parameters = new URLSearchParams({
    client_id: clientId,
    code_challenge: codeChallenge,
    code_challenge_method: "S256",
    nonce,
    prompt: "select_account",
    redirect_uri: redirectUri,
    response_mode: "query",
    response_type: "code",
    scope: `openid profile email api://${clientId}/PrivateJournal.Read`,
    state,
  });

  window.location.assign(`${AUTHORIZATION_ENDPOINT}?${parameters}`);
}

export async function completeMicrosoftAuthentication(
  code: string,
  returnedState: string
) {
  const stored = window.sessionStorage.getItem(PENDING_AUTH_STORAGE_KEY);
  window.sessionStorage.removeItem(PENDING_AUTH_STORAGE_KEY);
  if (!stored) throw new Error("The sign-in request has expired.");

  const pending = JSON.parse(stored) as PendingAuthentication;
  if (
    returnedState !== pending.state ||
    Date.now() - pending.createdAt > 10 * 60 * 1000
  ) {
    throw new Error("The sign-in request could not be verified.");
  }

  const clientId = getClientId();
  if (pending.redirectUri !== getRedirectUri()) {
    throw new Error("The sign-in callback does not match this site.");
  }

  const body = new URLSearchParams({
    client_id: clientId,
    code,
    code_verifier: pending.codeVerifier,
    grant_type: "authorization_code",
    redirect_uri: pending.redirectUri,
    scope: `openid profile email api://${clientId}/PrivateJournal.Read`,
  });
  const response = await fetch(TOKEN_ENDPOINT, {
    body,
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    method: "POST",
  });
  const tokenResponse = (await response.json()) as TokenResponse;
  if (
    !response.ok ||
    !tokenResponse.access_token ||
    !tokenResponse.id_token ||
    typeof tokenResponse.expires_in !== "number" ||
    tokenResponse.expires_in <= 0
  ) {
    throw new Error(
      tokenResponse.error_description ?? "Microsoft sign-in did not complete."
    );
  }

  const idToken = decodeJwtPayload(tokenResponse.id_token);
  if (
    idToken.aud !== clientId ||
    idToken.nonce !== pending.nonce ||
    idToken.tid !== CONSUMER_TENANT_ID
  ) {
    throw new Error("The Microsoft sign-in response could not be verified.");
  }

  return {
    accessToken: tokenResponse.access_token,
    expiresAt: Date.now() + tokenResponse.expires_in * 1000,
    returnUrl: getSafeReturnUrl(pending.returnUrl),
  };
}

export function saveMicrosoftAuthenticationSession(
  accessToken: string,
  expiresAt: number
) {
  window.sessionStorage.setItem(
    MICROSOFT_AUTH_SESSION_STORAGE_KEY,
    JSON.stringify({ accessToken, expiresAt })
  );
}
