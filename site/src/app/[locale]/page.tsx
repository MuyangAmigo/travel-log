import Link from "next/link";
import { notFound } from "next/navigation";
import { trips, locales, dict, type Locale } from "@/lib/trips";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleHome({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();
  const t = dict[locale as Locale];

  return (
    <div className="index-wrap">
      <header className="index-header">
        <div>
          <h1 className="site-title">{t.siteTitle}</h1>
          <p className="site-sub">{t.siteSub}</p>
        </div>
        <LanguageSwitcher current={locale as Locale} />
      </header>

      <div className="dv mb20">
        <span>✈️</span>
      </div>

      <h2
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "20px",
          letterSpacing: "3px",
          textTransform: "uppercase",
          color: "var(--ink-light)",
          marginBottom: "4px",
        }}
      >
        {t.allTrips}
      </h2>
      <p
        style={{
          fontFamily: "var(--font-hand)",
          fontSize: "18px",
          color: "var(--ink-light)",
          marginBottom: "24px",
        }}
      >
        {t.tagline}
      </p>

      {trips.filter((trip) => !trip.private).map((trip) => (
        <Link
          key={trip.slug}
          href={`/${locale}/trips/${trip.slug}`}
          className="trip-card"
        >
          <img src={trip.coverImage} alt={trip.title[locale as Locale]} />
          <div>
            <div className="tc-title">{trip.title[locale as Locale]}</div>
            <div className="tc-sub">{trip.subtitle[locale as Locale]}</div>
            <div className="tc-meta">
              {trip.dateRange} · {trip.location[locale as Locale]}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
