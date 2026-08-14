import assert from "node:assert/strict";
import test from "node:test";
import { createPasscodeRateLimiter } from "../src/passcode-rate-limit.js";

function storageError(statusCode) {
  return Object.assign(new Error(`Storage error ${statusCode}`), {
    statusCode,
  });
}

class FakeTableClient {
  entities = new Map();
  nextEtag = 1;

  async createTable() {}

  async getEntity(partitionKey, rowKey) {
    const entity = this.entities.get(`${partitionKey}/${rowKey}`);
    if (!entity) throw storageError(404);
    return { ...entity };
  }

  async createEntity(entity) {
    const key = `${entity.partitionKey}/${entity.rowKey}`;
    if (this.entities.has(key)) throw storageError(409);
    this.entities.set(key, { ...entity, etag: String(this.nextEtag++) });
  }

  async updateEntity(entity, _mode, options) {
    const key = `${entity.partitionKey}/${entity.rowKey}`;
    const current = this.entities.get(key);
    if (!current || current.etag !== options.etag) throw storageError(412);
    this.entities.set(key, { ...entity, etag: String(this.nextEtag++) });
  }

  async deleteEntity(partitionKey, rowKey) {
    const deleted = this.entities.delete(`${partitionKey}/${rowKey}`);
    if (!deleted) throw storageError(404);
  }
}

function request(source) {
  return {
    headers: new Headers({ "x-forwarded-for": `spoofed, ${source}` }),
  };
}

function azureRequest(source) {
  return {
    headers: new Headers({ "x-azure-clientip": source }),
  };
}

test("durably throttles a source after five failures", async () => {
  let now = Date.UTC(2026, 7, 14);
  const limiter = createPasscodeRateLimiter({
    clock: () => now,
    tableClient: new FakeTableClient(),
  });
  const source = request("203.0.113.8");

  for (let attempt = 1; attempt <= 4; attempt++) {
    assert.deepEqual(await limiter.recordFailure(source, "master"), {
      blocked: false,
      retryAfter: 0,
    });
  }

  const fifth = await limiter.recordFailure(source, "master");
  assert.equal(fifth.blocked, true);
  assert.equal(fifth.retryAfter, 900);
  assert.deepEqual(await limiter.check(source, "master"), fifth);
  assert.equal(
    (await limiter.check(request("203.0.113.9"), "master")).blocked,
    false
  );

  now += 15 * 60 * 1000;
  assert.equal((await limiter.check(source, "master")).blocked, false);
});

test("ignores Azure client source ports when identifying a source", async () => {
  const limiter = createPasscodeRateLimiter({
    tableClient: new FakeTableClient(),
  });

  for (let attempt = 1; attempt <= 5; attempt++) {
    const result = await limiter.recordFailure(
      azureRequest(`203.0.113.11:${4000 + attempt}`),
      "master"
    );
    assert.equal(result.blocked, attempt === 5);
  }

  assert.equal(
    (await limiter.check(azureRequest("203.0.113.11:9999"), "master")).blocked,
    true
  );
});

test("successful authentication clears prior failures", async () => {
  const limiter = createPasscodeRateLimiter({
    tableClient: new FakeTableClient(),
  });
  const source = request("203.0.113.10");
  await limiter.recordFailure(source, "master");
  await limiter.clear(source, "master");
  assert.equal((await limiter.check(source, "master")).blocked, false);
});

test("retries table initialization after a transient storage failure", async () => {
  const tableClient = new FakeTableClient();
  let attempts = 0;
  tableClient.createTable = async () => {
    attempts += 1;
    if (attempts === 1) throw new Error("storage unavailable");
  };
  const limiter = createPasscodeRateLimiter({ tableClient });
  const source = request("203.0.113.12");

  await assert.rejects(limiter.check(source, "master"), /storage unavailable/u);
  assert.equal((await limiter.check(source, "master")).blocked, false);
  assert.equal(attempts, 2);
});
