"use client";

import { useEffect } from "react";

function clearStaticryptRememberedPassword() {
  window.localStorage.removeItem("staticrypt_passphrase");
  window.localStorage.removeItem("staticrypt_expiration");
}

export default function PrivateTripAuthGuard() {
  useEffect(() => {
    let hasLeftPage = false;

    function forcePasswordPrompt() {
      clearStaticryptRememberedPassword();
      window.location.reload();
    }

    function handlePageHide() {
      hasLeftPage = true;
      clearStaticryptRememberedPassword();
    }

    function handlePageShow(event: PageTransitionEvent) {
      clearStaticryptRememberedPassword();
      if (event.persisted || hasLeftPage) {
        forcePasswordPrompt();
      }
    }

    window.addEventListener("pagehide", handlePageHide);
    window.addEventListener("pageshow", handlePageShow);
    clearStaticryptRememberedPassword();

    return () => {
      window.removeEventListener("pagehide", handlePageHide);
      window.removeEventListener("pageshow", handlePageShow);
    };
  }, []);

  return null;
}
