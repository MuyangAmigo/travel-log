import assert from "node:assert/strict";
import test from "node:test";
import { authorizeEditorRequest } from "../src/editor-auth.js";
import { TRAVEL_JOURNAL_EDIT_SCOPE } from "../src/microsoft-token.js";

const config = {
  allowedSubject: "authorized-subject",
  clientId: "11111111-2222-3333-4444-555555555555",
};

function request(authorization = "Bearer editor-token") {
  return {
    headers: new Headers({ authorization }),
  };
}

test("requires the edit scope and immutable subject for editor requests", async () => {
  let verificationArguments;
  const payload = await authorizeEditorRequest(
    request(),
    config,
    async (...arguments_) => {
      verificationArguments = arguments_;
      return { sub: config.allowedSubject };
    }
  );

  assert.deepEqual(verificationArguments, [
    "editor-token",
    config.clientId,
    TRAVEL_JOURNAL_EDIT_SCOPE,
  ]);
  assert.equal(payload.sub, config.allowedSubject);
});

test("rejects a valid edit token belonging to another subject", async () => {
  await assert.rejects(
    authorizeEditorRequest(request(), config, async () => ({
      sub: "other-subject",
    })),
    /not authorized to edit/u
  );
});

test("rejects editor requests without a bearer token", async () => {
  await assert.rejects(
    authorizeEditorRequest(request(""), config, async () => {
      throw new Error("Token verification should not run.");
    }),
    /bearer token is required/u
  );
});

test("maps missing edit scope failures to an editor-only authentication error", async () => {
  await assert.rejects(
    authorizeEditorRequest(request(), config, async () => {
      throw new Error("Token does not include TravelJournal.Edit.");
    }),
    (error) =>
      error.status === 401 &&
      error.code === "editor_authentication_failed" &&
      !error.message.includes("PrivateJournal.Read")
  );
});

test("does not accept a passcode in place of a Microsoft bearer token", async () => {
  await assert.rejects(
    authorizeEditorRequest(
      {
        headers: new Headers(),
        json: async () => ({ passcode: "valid-private-passcode" }),
      },
      config,
      async () => {
        throw new Error("Token verification should not run.");
      }
    ),
    (error) =>
      error.status === 401 &&
      error.code === "editor_authentication_required"
  );
});
