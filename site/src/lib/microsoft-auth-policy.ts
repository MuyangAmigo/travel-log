export const PRIVATE_JOURNAL_READ_SCOPE = "PrivateJournal.Read";
export const TRAVEL_JOURNAL_EDIT_SCOPE = "TravelJournal.Edit";

export type MicrosoftAuthenticationFlow = "private-journal" | "editor";

export function isLocalEditorPreviewEnabled({
  flag,
  hostname,
  nodeEnv,
}: {
  flag: string | undefined;
  hostname: string;
  nodeEnv: string | undefined;
}): boolean {
  return (
    nodeEnv === "development" &&
    flag === "1" &&
    ["localhost", "127.0.0.1", "::1"].includes(hostname)
  );
}

export function parseMicrosoftAuthenticationFlow(
  value: unknown
): MicrosoftAuthenticationFlow {
  if (value === undefined || value === null || value === "") {
    return "private-journal";
  }
  if (value === "private-journal" || value === "editor") return value;
  throw new Error("The Microsoft authentication flow is invalid.");
}

export function getMicrosoftDelegatedScope(
  flow: MicrosoftAuthenticationFlow
) {
  return flow === "editor"
    ? TRAVEL_JOURNAL_EDIT_SCOPE
    : PRIVATE_JOURNAL_READ_SCOPE;
}

function escapeRegularExpression(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/gu, "\\$&");
}

export function getSafeMicrosoftReturnUrl(
  value: string,
  flow: MicrosoftAuthenticationFlow,
  origin: string,
  basePath: string
) {
  let returnUrl: URL;
  try {
    returnUrl = new URL(value);
  } catch {
    throw new Error("The Microsoft authentication return address is invalid.");
  }

  if (returnUrl.origin !== origin) {
    throw new Error("The Microsoft authentication return address is invalid.");
  }

  const escapedBasePath = escapeRegularExpression(basePath);
  const isAllowedPath =
    flow === "editor"
      ? new RegExp(`^${escapedBasePath}/edit/?$`, "u").test(returnUrl.pathname)
      : new RegExp(
          `^${escapedBasePath}/(?:zh|en)/trips/[a-z0-9]+(?:-[a-z0-9]+)*/?$`,
          "u"
        ).test(returnUrl.pathname);

  if (!isAllowedPath) {
    throw new Error("The Microsoft authentication return address is invalid.");
  }

  return returnUrl.href;
}
