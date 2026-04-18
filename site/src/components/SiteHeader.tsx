import Link from "next/link";
import type { Locale } from "@/lib/trips";

interface Props {
  locale: Locale;
}

export default function SiteHeader({ locale }: Props) {
  return (
    <header className="site-header">
      <Link href={`/${locale}`} className="site-brand" aria-label="Travel Journal">
        <svg width="28" height="28" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
          <path d="M16 1.5c-2.5 0-4.6 1.5-6 3.7-1.4 2.3-3 5.8-4.7 9.5-1.7 3.7-3 6.9-3.6 9.3-.3 1.2-.4 2.3-.4 3.2 0 1.6.5 2.8 1.3 3.7.8.9 2 1.4 3.3 1.4 1.6 0 3.2-.7 4.8-2 1.6-1.3 3.2-3.2 5.3-5.9 2.1 2.7 3.7 4.6 5.3 5.9 1.6 1.3 3.2 2 4.8 2 1.3 0 2.5-.5 3.3-1.4.8-.9 1.3-2.1 1.3-3.7 0-.9-.1-2-.4-3.2-.6-2.4-1.9-5.6-3.6-9.3-1.7-3.7-3.3-7.2-4.7-9.5-1.4-2.2-3.5-3.7-6-3.7z"/>
        </svg>
        <span>travel</span>
      </Link>
    </header>
  );
}
