import Link from "next/link";
import type { Locale } from "@/lib/trips";
import { locales } from "@/lib/trips";

interface Props {
  current: Locale;
  basePath?: string;
  forceDocumentNavigation?: boolean;
}

const LABELS: Record<Locale, string> = {
  zh: "中文",
  en: "EN",
};

export default function LanguageSwitcher({
  current,
  basePath = "",
  forceDocumentNavigation = false,
}: Props) {
  return (
    <nav className="lang-switch" aria-label="Language">
      {locales.map((l) => {
        const href = `/${l}${basePath}`;
        const className = l === current ? "active" : "";

        if (forceDocumentNavigation) {
          return (
            <a key={l} href={href} className={className}>
              {LABELS[l]}
            </a>
          );
        }

        return (
          <Link key={l} href={href} className={className}>
            {LABELS[l]}
          </Link>
        );
      })}
    </nav>
  );
}
