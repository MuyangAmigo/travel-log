#!/usr/bin/env node

function requireEnvironment(name) {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
}

const authApiUrl = new URL(requireEnvironment("TRAVEL_LOG_AUTH_API_URL"));
const origin = new URL(requireEnvironment("TRAVEL_LOG_AUTH_ORIGIN")).origin;
if (!/\/unlock\/?$/u.test(authApiUrl.pathname)) {
  throw new Error(
    "TRAVEL_LOG_AUTH_API_URL must end with the authentication unlock route."
  );
}

authApiUrl.pathname = authApiUrl.pathname.replace(
  /\/unlock\/?$/u,
  "/editor/trips"
);
authApiUrl.search = "";
authApiUrl.hash = "";

const response = await fetch(authApiUrl, {
  method: "OPTIONS",
  headers: {
    Origin: origin,
    "Access-Control-Request-Headers": "authorization",
    "Access-Control-Request-Method": "GET",
  },
});
if (response.status !== 204) {
  throw new Error(
    `Editor API configuration canary returned HTTP ${response.status}.`
  );
}
if (response.headers.get("access-control-allow-origin") !== origin) {
  throw new Error("Editor API configuration canary returned an invalid origin.");
}

const unauthorized = await fetch(authApiUrl, {
  headers: { Origin: origin },
});
let payload;
try {
  payload = await unauthorized.json();
} catch {
  throw new Error("Editor API authentication canary returned invalid JSON.");
}
if (
  unauthorized.status !== 401 ||
  payload?.error?.code !== "editor_authentication_required"
) {
  throw new Error(
    `Editor API authentication canary returned HTTP ${unauthorized.status}.`
  );
}

console.log("[editor-check] Configuration, CORS, and authentication are ready.");
