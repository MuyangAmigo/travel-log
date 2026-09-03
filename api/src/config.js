import { createPrivateKey } from "node:crypto";

const GUID_PATTERN =
  /^[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}$/iu;
const GITHUB_REPOSITORY_PATTERN =
  /^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/u;
const GITHUB_ID_PATTERN = /^[1-9]\d*$/u;
const AZURE_OPENAI_DEPLOYMENT_PATTERN = /^[A-Za-z0-9_.-]+$/u;

function requireSetting(environment, name) {
  const value = environment[name]?.trim();
  if (!value) throw new Error(`Missing required application setting: ${name}`);
  return value;
}

function loadAllowedOrigin(environment) {
  const url = new URL(requireSetting(environment, "ALLOWED_ORIGIN"));
  const isLocalDevelopmentOrigin =
    url.protocol === "http:" &&
    ["127.0.0.1", "[::1]", "localhost"].includes(url.hostname);
  if (url.protocol !== "https:" && !isLocalDevelopmentOrigin) {
    throw new Error(
      "ALLOWED_ORIGIN must use HTTPS, except for a loopback development origin."
    );
  }
  return url.origin;
}

function loadMicrosoftConfig(environment) {
  const clientId = requireSetting(environment, "MICROSOFT_CLIENT_ID");
  if (!GUID_PATTERN.test(clientId)) {
    throw new Error("MICROSOFT_CLIENT_ID must be a GUID.");
  }

  return {
    allowedOrigin: loadAllowedOrigin(environment),
    allowedSubject: requireSetting(environment, "ALLOWED_MICROSOFT_SUB"),
    clientId,
  };
}

export function loadConfig(environment = process.env) {
  const microsoft = loadMicrosoftConfig(environment);
  const masterPassphrase = requireSetting(
    environment,
    "TRAVEL_LOG_PRIVATE_PASSWORD"
  );
  const privatePasscode = requireSetting(
    environment,
    "TRAVEL_LOG_PRIVATE_PASSCODE"
  );
  if (privatePasscode.length < 12) {
    throw new Error("TRAVEL_LOG_PRIVATE_PASSCODE must be at least 12 characters.");
  }
  if (privatePasscode === masterPassphrase) {
    throw new Error(
      "TRAVEL_LOG_PRIVATE_PASSCODE must not match the encryption master passphrase."
    );
  }

  return {
    ...microsoft,
    masterPassphrase,
    privatePasscode,
  };
}

export function loadEditorConfig(environment = process.env) {
  const microsoft = loadMicrosoftConfig(environment);
  const githubRepository = requireSetting(environment, "GITHUB_REPOSITORY");
  if (!GITHUB_REPOSITORY_PATTERN.test(githubRepository)) {
    throw new Error("GITHUB_REPOSITORY must use the owner/repository format.");
  }

  const githubAppId = requireSetting(environment, "GITHUB_APP_ID");
  const githubInstallationId = requireSetting(
    environment,
    "GITHUB_APP_INSTALLATION_ID"
  );
  if (!GITHUB_ID_PATTERN.test(githubAppId)) {
    throw new Error("GITHUB_APP_ID must be a positive integer.");
  }
  if (!GITHUB_ID_PATTERN.test(githubInstallationId)) {
    throw new Error("GITHUB_APP_INSTALLATION_ID must be a positive integer.");
  }

  const githubPrivateKey = requireSetting(
    environment,
    "GITHUB_APP_PRIVATE_KEY"
  ).replace(/\\n/gu, "\n");
  if (
    !githubPrivateKey.includes("-----BEGIN") ||
    !githubPrivateKey.includes("PRIVATE KEY-----")
  ) {
    throw new Error("GITHUB_APP_PRIVATE_KEY must be a PEM private key.");
  }
  try {
    const key = createPrivateKey(githubPrivateKey);
    if (key.asymmetricKeyType !== "rsa") {
      throw new Error("GitHub App keys must use RSA.");
    }
  } catch {
    throw new Error("GITHUB_APP_PRIVATE_KEY must be a valid RSA private key.");
  }

  const azureOpenAiEndpoint = new URL(
    requireSetting(environment, "AZURE_OPENAI_ENDPOINT")
  );
  if (azureOpenAiEndpoint.protocol !== "https:") {
    throw new Error("AZURE_OPENAI_ENDPOINT must use HTTPS.");
  }

  const azureOpenAiDeployment = requireSetting(
    environment,
    "AZURE_OPENAI_DEPLOYMENT"
  );
  if (!AZURE_OPENAI_DEPLOYMENT_PATTERN.test(azureOpenAiDeployment)) {
    throw new Error("AZURE_OPENAI_DEPLOYMENT has an invalid format.");
  }

  const storageAccountName = requireSetting(
    environment,
    "AZURE_STORAGE_ACCOUNT_NAME"
  );
  const storageContainerName = requireSetting(
    environment,
    "AZURE_STORAGE_CONTAINER_NAME"
  );
  if (storageAccountName !== "junjieblob") {
    throw new Error("AZURE_STORAGE_ACCOUNT_NAME must be junjieblob.");
  }
  if (storageContainerName !== "images") {
    throw new Error("AZURE_STORAGE_CONTAINER_NAME must be images.");
  }

  return {
    ...microsoft,
    azureOpenAiApiKey: environment.AZURE_OPENAI_API_KEY?.trim() || undefined,
    azureOpenAiApiVersion:
      environment.AZURE_OPENAI_API_VERSION?.trim() || "2024-10-21",
    azureOpenAiDeployment,
    azureOpenAiEndpoint: azureOpenAiEndpoint.origin,
    azureOpenAiManagedIdentityClientId:
      environment.AZURE_CLIENT_ID?.trim() || undefined,
    githubAppId,
    githubInstallationId,
    githubPrivateKey,
    githubRepository,
    storageAccountName,
    storageContainerName,
    storageManagedIdentityClientId:
      environment.AZURE_CLIENT_ID?.trim() || undefined,
  };
}
