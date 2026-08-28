export class EditorApiError extends Error {
  constructor(status, code, message, details) {
    super(message);
    this.name = "EditorApiError";
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

export function isEditorApiError(error) {
  return error instanceof EditorApiError;
}
