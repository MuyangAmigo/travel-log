import Link from "next/link";
import type { Locale } from "@/lib/trips";
import { locales } from "@/lib/trips";

interface Props {
  current: Locale;
  basePath?: string;
}

const LABELS: Record<Locale, string> = {
  zh: "中文",
  en: "EN",
};

export default function LanguageSwitcher({ current, basePath = "" }: Props) {
  return (
    <nav className="lang-switch" aria-label="Language">
      {locales.map((l) => (
        <Link
          key={l}
          href={`/${l}${basePath}`}
          className={l === current ? "active" : ""}
        >
          {LABELS[l]}
        </Link>
      ))}
    </nav>
  );
}
