import { createHmac } from "node:crypto";
import { TableClient } from "@azure/data-tables";

const ATTEMPT_LIMIT = 5;
const PARTITION_KEY = "private-journal";
const TABLE_NAME = "PasscodeRateLimits";
const WINDOW_MS = 15 * 60 * 1000;

function isStatus(error, statusCode) {
  return error && typeof error === "object" && error.statusCode === statusCode;
}

function retryAfterSeconds(expiresAt, now) {
  return Math.max(1, Math.ceil((expiresAt - now) / 1000));
}

function normalizeClientAddress(value) {
  const address = value.trim();
  const bracketed = address.match(/^\[([^\]]+)\](?::\d+)?$/u);
  if (bracketed) return bracketed[1].toLowerCase();

  const ipv4WithPort = address.match(/^(\d{1,3}(?:\.\d{1,3}){3}):\d+$/u);
  return (ipv4WithPort?.[1] ?? address).toLowerCase();
}

function sourceKey(request, secret) {
  const azureClientIp = request.headers.get("x-azure-clientip")?.trim();
  const forwardedFor = request.headers
    .get("x-forwarded-for")
    ?.split(",")
    .map((value) => value.trim())
    .filter(Boolean);
  const source =
    azureClientIp || forwardedFor?.at(-1) || "unknown-browser-source";

  return createHmac("sha256", secret)
    .update(normalizeClientAddress(source))
    .digest("hex");
}

export function createPasscodeRateLimiter({
  clock = () => Date.now(),
  connectionString = process.env.AzureWebJobsStorage,
  tableClient,
} = {}) {
  let client = tableClient;
  let ready;

  async function getClient() {
    if (!client) {
      if (!connectionString) {
        throw new Error("AzureWebJobsStorage is required for passcode throttling.");
      }
      client = TableClient.fromConnectionString(connectionString, TABLE_NAME);
    }

    ready ??= client.createTable().catch((error) => {
      ready = undefined;
      throw error;
    });
    await ready;
    return client;
  }

  async function getEntity(rowKey) {
    const table = await getClient();
    try {
      return await table.getEntity(PARTITION_KEY, rowKey);
    } catch (error) {
      if (isStatus(error, 404)) return null;
      throw error;
    }
  }

  async function check(request, secret) {
    const now = clock();
    const entity = await getEntity(sourceKey(request, secret));
    if (
      !entity ||
      typeof entity.windowExpiresAt !== "number" ||
      entity.windowExpiresAt <= now ||
      typeof entity.attempts !== "number" ||
      entity.attempts < ATTEMPT_LIMIT
    ) {
      return { blocked: false, retryAfter: 0 };
    }

    return {
      blocked: true,
      retryAfter: retryAfterSeconds(entity.windowExpiresAt, now),
    };
  }

  async function recordFailure(request, secret) {
    const table = await getClient();
    const rowKey = sourceKey(request, secret);

    for (let retry = 0; retry < 5; retry++) {
      const now = clock();
      const entity = await getEntity(rowKey);
      if (!entity) {
        const created = {
          attempts: 1,
          partitionKey: PARTITION_KEY,
          rowKey,
          windowExpiresAt: now + WINDOW_MS,
        };
        try {
          await table.createEntity(created);
          return { blocked: false, retryAfter: 0 };
        } catch (error) {
          if (isStatus(error, 409)) continue;
          throw error;
        }
      }

      const expired =
        typeof entity.windowExpiresAt !== "number" ||
        entity.windowExpiresAt <= now;
      const updated = {
        attempts: expired ? 1 : Number(entity.attempts ?? 0) + 1,
        partitionKey: PARTITION_KEY,
        rowKey,
        windowExpiresAt: expired ? now + WINDOW_MS : entity.windowExpiresAt,
      };
      try {
        await table.updateEntity(updated, "Replace", { etag: entity.etag });
        const blocked = updated.attempts >= ATTEMPT_LIMIT;
        return {
          blocked,
          retryAfter: blocked
            ? retryAfterSeconds(updated.windowExpiresAt, now)
            : 0,
        };
      } catch (error) {
        if (isStatus(error, 412)) continue;
        throw error;
      }
    }

    throw new Error("Could not update the passcode rate limit safely.");
  }

  async function clear(request, secret) {
    const table = await getClient();
    try {
      await table.deleteEntity(PARTITION_KEY, sourceKey(request, secret));
    } catch (error) {
      if (!isStatus(error, 404)) throw error;
    }
  }

  return { check, clear, recordFailure };
}
