import Link from "next/link";
import { dict, type Locale } from "@/lib/trips";
import ThemeToggle from "@/components/ThemeToggle";

interface Props {
  locale: Locale;
  showEditorLink?: boolean;
  index?: boolean;
}

const EDITOR_LABELS: Record<Locale, string> = {
  zh: "编辑",
  en: "Edit",
};

export default function SiteHeader({
  locale,
  showEditorLink = true,
  index = false,
}: Props) {
  const editorLabel = EDITOR_LABELS[locale];
  const photo = (
    <img
      className="site-avatar"
      src="https://muyangamigo.github.io/junjieweb/images/profile_photo.jpeg"
      alt=""
      width={48}
      height={48}
      decoding="async"
    />
  );

  if (index) {
    return (
      <header className="index-hero">
        <Link href={`/${locale}`} className="index-brand">
          {photo}
          <div>
            <h1 className="site-title">{dict[locale].siteTitle}</h1>
            <p className="site-sub">{dict[locale].tagline}</p>
          </div>
        </Link>
      </header>
    );
  }

  return (
    <header className="site-header">
      <Link href={`/${locale}`} className="site-brand">
        {photo}
        <span>{dict[locale].siteTitle}</span>
      </Link>
      <div className="site-actions">
        {showEditorLink && (
          <Link
            href="/edit"
            className="site-edit-link"
            aria-label={editorLabel}
            title={editorLabel}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M13.5 6.5l4 4M4 20l4.4-1 10.3-10.3a2.8 2.8 0 00-4-4L4.4 15 4 20z" />
            </svg>
            <span>{editorLabel}</span>
          </Link>
        )}
        <ThemeToggle locale={locale} />
      </div>
    </header>
  );
}
