import { app } from "@azure/functions";
import { loadConfig } from "../config.js";
import {
  isAuthorizedReader,
  PRIVATE_JOURNAL_READ_SCOPE,
  verifyMicrosoftAccessToken,
} from "../microsoft-token.js";
import {
  derivePrivateTripPassphrase,
  isValidPrivatePasscode,
} from "../private-trip-key.js";
import { createPasscodeRateLimiter } from "../passcode-rate-limit.js";

function corsHeaders(allowedOrigin) {
  return {
    "Access-Control-Allow-Headers": "Authorization, Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Origin": allowedOrigin,
    "Cache-Control": "no-store",
    "Content-Type": "application/json; charset=utf-8",
    Pragma: "no-cache",
    Vary: "Origin",
  };
}

function response(status, headers, jsonBody) {
  return { status, headers, jsonBody };
}

export function createUnlockHandler({
  getConfig = loadConfig,
  passcodeLimiter = createPasscodeRateLimiter(),
  verifyToken = verifyMicrosoftAccessToken,
} = {}) {
  return async function unlock(request, context) {
    let config;
    try {
      config = getConfig();
    } catch (error) {
      context.error("Authentication API configuration is invalid.", error);
      return response(500, { "Cache-Control": "no-store" }, {
        error: "Authentication service is not configured.",
      });
    }

    const headers = corsHeaders(config.allowedOrigin);
    if (request.headers.get("origin") !== config.allowedOrigin) {
      return response(403, headers, { error: "Origin is not allowed." });
    }
    if (request.method === "OPTIONS") {
      return response(204, headers);
    }

    let requestedTrip;
    try {
      requestedTrip = await request.json();
    } catch {
      return response(400, headers, { error: "A trip request is required." });
    }

    const authorization = request.headers.get("authorization") ?? "";
    const bearerMatch = /^Bearer\s+(\S+)$/iu.exec(authorization);
    let authMethod;
    let subject;
    if (bearerMatch) {
      let payload;
      try {
        payload = await verifyToken(
          bearerMatch[1],
          config.clientId,
          PRIVATE_JOURNAL_READ_SCOPE
        );
      } catch (error) {
        context.warn("Microsoft access token validation failed.", error);
        return response(401, headers, { error: "Authentication failed." });
      }

      if (!isAuthorizedReader(payload, config)) {
        context.warn("Microsoft account is not authorized.", {
          subject: payload.sub,
        });
        return response(403, headers, { error: "Account is not authorized." });
      }
      authMethod = "microsoft";
      subject = payload.sub;
    } else {
      let throttle;
      try {
        throttle = await passcodeLimiter.check(
          request,
          config.masterPassphrase
        );
      } catch (error) {
        context.error("Passcode rate-limit check failed.", error);
        return response(503, headers, {
          error: "Authentication service is unavailable.",
        });
      }

      if (throttle.blocked) {
        return response(
          429,
          { ...headers, "Retry-After": String(throttle.retryAfter) },
          { error: "Too many authentication attempts." }
        );
      }

      if (
        isValidPrivatePasscode(
          requestedTrip?.passcode,
          config.privatePasscode
        )
      ) {
        try {
          await passcodeLimiter.clear(request, config.masterPassphrase);
        } catch (error) {
          context.error("Passcode rate-limit reset failed.", error);
          return response(503, headers, {
            error: "Authentication service is unavailable.",
          });
        }
        authMethod = "passcode";
      } else {
        context.warn("Private journal authentication failed.");
        try {
          throttle = await passcodeLimiter.recordFailure(
            request,
            config.masterPassphrase
          );
        } catch (error) {
          context.error("Passcode rate-limit update failed.", error);
          return response(503, headers, {
            error: "Authentication service is unavailable.",
          });
        }
        if (throttle.blocked) {
          return response(
            429,
            { ...headers, "Retry-After": String(throttle.retryAfter) },
            { error: "Too many authentication attempts." }
          );
        }
        return response(401, headers, { error: "Authentication failed." });
      }
    }

    let passphrase;
    try {
      passphrase = derivePrivateTripPassphrase(
        config.masterPassphrase,
        requestedTrip?.locale,
        requestedTrip?.slug
      );
    } catch {
      return response(400, headers, { error: "The trip request is invalid." });
    }

    context.log("Authorized request unlocked a private journal.", {
      authMethod,
      locale: requestedTrip.locale,
      slug: requestedTrip.slug,
      subject,
    });
    return response(200, headers, {
      microsoftClientId: config.clientId,
      passphrase,
    });
  };
}

app.http("unlock", {
  authLevel: "anonymous",
  handler: createUnlockHandler(),
  methods: ["POST", "OPTIONS"],
  route: "unlock",
});
