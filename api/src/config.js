const GUID_PATTERN =
  /^[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}$/iu;

function requireSetting(environment, name) {
  const value = environment[name]?.trim();
  if (!value) throw new Error(`Missing required application setting: ${name}`);
  return value;
}

export function loadConfig(environment = process.env) {
  const clientId = requireSetting(environment, "MICROSOFT_CLIENT_ID");
  if (!GUID_PATTERN.test(clientId)) {
    throw new Error("MICROSOFT_CLIENT_ID must be a GUID.");
  }

  const allowedSubject = requireSetting(
    environment,
    "ALLOWED_MICROSOFT_SUB"
  );

  const allowedOrigin = new URL(
    requireSetting(environment, "ALLOWED_ORIGIN")
  ).origin;
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
    allowedOrigin,
    allowedSubject,
    clientId,
    masterPassphrase,
    privatePasscode,
  };
}
