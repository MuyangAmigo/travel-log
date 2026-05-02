import Link from "next/link";
import { notFound } from "next/navigation";
import { trips, locales, dict, type Locale } from "@/lib/trips";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import SiteHeader from "@/components/SiteHeader";

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
  const loc = locale as Locale;
  const t = dict[loc];

  return (
    <>
      <SiteHeader locale={loc} />
      <main className="index-wrap">
        <section className="index-hero">
          <div>
            <p className="index-eyebrow">{t.allTrips}</p>
            <h1 className="site-title">{t.siteTitle}</h1>
            <p className="site-sub">{t.siteSub}</p>
          </div>
          <LanguageSwitcher current={loc} />
        </section>

        <p className="index-tagline">{t.tagline}</p>

        <div className="trip-grid">
          {trips.map((trip) => {
            const href = `/${loc}/trips/${trip.slug}`;
            const content = (
              <>
                <div className="tc-media">
                  <img src={trip.coverImage} alt={trip.title[loc]} loading="lazy" />
                  {trip.private && (
                  <span className="tc-badge private" aria-label={loc === "zh" ? "需要密码" : "Password protected"}>
                    <svg width="10" height="12" viewBox="0 0 10 12" fill="none" aria-hidden="true">
                      <path d="M5 1a2 2 0 012 2v2H3V3a2 2 0 012-2zM1 6h8v5H1V6z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
                    </svg>
                    {loc === "zh" ? "私密" : "Private"}
                  </span>
                )}
              </div>
              <div className="tc-body">
                <div className="tc-title-row">
                  <h2 className="tc-title">{trip.title[loc]}</h2>
                  <span className="tc-date">{trip.dateRange.split(" — ")[0]}</span>
                </div>
                <p className="tc-location">{trip.location[loc]}</p>
                <p className="tc-sub">{trip.subtitle[loc]}</p>
              </div>
              </>
            );

            if (trip.private) {
              return (
                <a key={trip.slug} href={href} className="trip-card">
                  {content}
                </a>
              );
            }

            return (
              <Link key={trip.slug} href={href} className="trip-card">
                {content}
              </Link>
            );
          })}
        </div>
      </main>
    </>
  );
}
