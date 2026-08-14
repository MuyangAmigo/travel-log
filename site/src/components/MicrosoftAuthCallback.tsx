"use client";

import { useEffect, useState } from "react";
import {
  completeMicrosoftAuthentication,
  startMicrosoftAuthentication,
} from "@/lib/microsoft-auth";

export default function MicrosoftAuthCallback() {
  const [message, setMessage] = useState("正在连接 Microsoft / Connecting to Microsoft…");
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    async function continueAuthentication() {
      try {
        const parameters = new URLSearchParams(window.location.search);
        const microsoftError = parameters.get("error");
        if (microsoftError) {
          throw new Error(
            parameters.get("error_description") ?? "Microsoft sign-in was cancelled."
          );
        }

        if (parameters.get("start") === "1") {
          const returnUrl = parameters.get("returnUrl");
          if (!returnUrl) throw new Error("The private journal address is missing.");
          await startMicrosoftAuthentication(returnUrl);
          return;
        }

        const code = parameters.get("code");
        const state = parameters.get("state");
        if (!code || !state) throw new Error("The Microsoft sign-in response is incomplete.");

        const authentication = await completeMicrosoftAuthentication(code, state);
        const returnUrl = new URL(authentication.returnUrl);
        returnUrl.hash = new URLSearchParams({
          microsoft_access_token: authentication.accessToken,
        }).toString();
        window.location.replace(returnUrl);
      } catch (error) {
        console.error("Microsoft authentication failed", error);
        setMessage(
          error instanceof Error
            ? error.message
            : "Microsoft sign-in could not be completed."
        );
        setFailed(true);
      }
    }

    void continueAuthentication();
  }, []);

  return (
    <main className="auth-callback">
      <div className="auth-callback-card" role="status" aria-live="polite">
        <div className={failed ? "auth-callback-mark failed" : "auth-callback-mark"}>
          {failed ? "!" : "…"}
        </div>
        <h1>{failed ? "无法登录 / Sign-in failed" : "验证身份 / Verifying identity"}</h1>
        <p>{message}</p>
      </div>
    </main>
  );
}
