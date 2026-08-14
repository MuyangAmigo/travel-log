import type { Metadata } from "next";
import MicrosoftAuthCallback from "@/components/MicrosoftAuthCallback";

export const metadata: Metadata = {
  title: "Microsoft sign-in",
  robots: { index: false, follow: false },
};

export default function AuthCallbackPage() {
  return <MicrosoftAuthCallback />;
}
