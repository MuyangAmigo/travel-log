import {
  isAuthorizedEditor,
  TRAVEL_JOURNAL_EDIT_SCOPE,
  verifyMicrosoftAccessToken,
} from "./microsoft-token.js";
import { EditorApiError } from "./editor-errors.js";

export async function authorizeEditorRequest(
  request,
  config,
  verifyToken = verifyMicrosoftAccessToken
) {
  const authorization = request.headers.get("authorization") ?? "";
  const bearerMatch = /^Bearer\s+(\S+)$/iu.exec(authorization);
  if (!bearerMatch) {
    throw new EditorApiError(
      401,
      "editor_authentication_required",
      "A Microsoft bearer token is required."
    );
  }

  let payload;
  try {
    payload = await verifyToken(
      bearerMatch[1],
      config.clientId,
      TRAVEL_JOURNAL_EDIT_SCOPE
    );
  } catch {
    throw new EditorApiError(
      401,
      "editor_authentication_failed",
      "Microsoft editor authentication failed."
    );
  }
  if (!isAuthorizedEditor(payload, config)) {
    throw new EditorApiError(
      403,
      "editor_account_forbidden",
      "Microsoft account is not authorized to edit."
    );
  }

  return payload;
}
