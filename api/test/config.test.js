import assert from "node:assert/strict";
import test from "node:test";
import { loadConfig, loadEditorConfig } from "../src/config.js";

const baseEnvironment = {
  ALLOWED_MICROSOFT_SUB: "immutable-subject",
  ALLOWED_ORIGIN: "https://muyangamigo.github.io/travel-log/",
  MICROSOFT_CLIENT_ID: "11111111-2222-3333-4444-555555555555",
  TRAVEL_LOG_PRIVATE_PASSCODE: "separate-passcode",
  TRAVEL_LOG_PRIVATE_PASSWORD: "test-passphrase",
};

test("loads and normalizes the authentication settings", () => {
  assert.deepEqual(loadConfig(baseEnvironment), {
    allowedOrigin: "https://muyangamigo.github.io",
    allowedSubject: "immutable-subject",
    clientId: "11111111-2222-3333-4444-555555555555",
    masterPassphrase: "test-passphrase",
    privatePasscode: "separate-passcode",
  });
});

test("requires an immutable subject allowlist", () => {
  assert.throws(
    () =>
      loadConfig({
        ...baseEnvironment,
        ALLOWED_MICROSOFT_SUB: "",
      }),
    /Missing required application setting: ALLOWED_MICROSOFT_SUB/u
  );
});

test("requires HTTPS origins except for loopback development", () => {
  assert.throws(
    () =>
      loadConfig({
        ...baseEnvironment,
        ALLOWED_ORIGIN: "http://example.com",
      }),
    /must use HTTPS/u
  );
  assert.throws(
    () =>
      loadConfig({
        ...baseEnvironment,
        ALLOWED_ORIGIN: "data:text/plain,unsafe",
      }),
    /must use HTTPS/u
  );
  assert.equal(
    loadConfig({
      ...baseEnvironment,
      ALLOWED_ORIGIN: "http://127.0.0.1:3000",
    }).allowedOrigin,
    "http://127.0.0.1:3000"
  );
});

test("requires a separate high-entropy private passcode", () => {
  assert.throws(
    () =>
      loadConfig({
        ...baseEnvironment,
        TRAVEL_LOG_PRIVATE_PASSCODE: "short",
      }),
    /at least 12 characters/u
  );
  assert.throws(
    () =>
      loadConfig({
        ...baseEnvironment,
        TRAVEL_LOG_PRIVATE_PASSCODE: baseEnvironment.TRAVEL_LOG_PRIVATE_PASSWORD,
      }),
    /must not match/u
  );
});

const editorEnvironment = {
  ALLOWED_MICROSOFT_SUB: "immutable-subject",
  ALLOWED_ORIGIN: "https://muyangamigo.github.io/travel-log/",
  AZURE_OPENAI_API_KEY: "server-only-key",
  AZURE_OPENAI_DEPLOYMENT: "travel-translator",
  AZURE_OPENAI_ENDPOINT: "https://travel-openai.openai.azure.com/",
  AZURE_STORAGE_ACCOUNT_NAME: "junjieblob",
  AZURE_STORAGE_CONTAINER_NAME: "images",
  GITHUB_APP_ID: "123",
  GITHUB_APP_INSTALLATION_ID: "456",
  GITHUB_APP_PRIVATE_KEY:
    "-----BEGIN PRIVATE KEY-----\\nlocal-example\\n-----END PRIVATE KEY-----",
  GITHUB_REPOSITORY: "MuyangAmigo/travel-log",
  MICROSOFT_CLIENT_ID: "11111111-2222-3333-4444-555555555555",
};

test("loads editor dependency settings without unlock passcode credentials", () => {
  assert.deepEqual(loadEditorConfig(editorEnvironment), {
    allowedOrigin: "https://muyangamigo.github.io",
    allowedSubject: "immutable-subject",
    azureOpenAiApiKey: "server-only-key",
    azureOpenAiApiVersion: "2024-10-21",
    azureOpenAiDeployment: "travel-translator",
    azureOpenAiEndpoint: "https://travel-openai.openai.azure.com",
    clientId: "11111111-2222-3333-4444-555555555555",
    githubAppId: "123",
    githubInstallationId: "456",
    githubPrivateKey:
      "-----BEGIN PRIVATE KEY-----\nlocal-example\n-----END PRIVATE KEY-----",
    githubRepository: "MuyangAmigo/travel-log",
    storageAccountName: "junjieblob",
    storageContainerName: "images",
    storageManagedIdentityClientId: undefined,
  });
});

test("pins editor uploads to junjieblob and repository configuration to main", () => {
  assert.throws(
    () =>
      loadEditorConfig({
        ...editorEnvironment,
        AZURE_STORAGE_ACCOUNT_NAME: "another-account",
      }),
    /must be junjieblob/u
  );
  assert.throws(
    () =>
      loadEditorConfig({
        ...editorEnvironment,
        GITHUB_REPOSITORY: "not-a-repository",
      }),
    /owner\/repository/u
  );
  assert.throws(
    () =>
      loadEditorConfig({
        ...editorEnvironment,
        AZURE_OPENAI_ENDPOINT: "http://insecure.example.com",
      }),
    /must use HTTPS/u
  );
});
