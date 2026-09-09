import Link from "next/link";
import { notFound } from "next/navigation";
import { trips, locales, dict, type Locale } from "@/lib/trips";
import { withBasePath } from "@/lib/base-path";
import IndexViewSwitcher from "@/components/IndexViewSwitcher";
import SiteHeader from "@/components/SiteHeader";
import LanguageSwitcher from "@/components/LanguageSwitcher";

function PrivateBadge({ locale, inline = false }: { locale: Locale; inline?: boolean }) {
  return (
    <span className={inline ? "tc-private-inline" : "tc-badge private"}>
      <svg width="10" height="12" viewBox="0 0 10 12" fill="none" aria-hidden="true">
        <path d="M5 1a2 2 0 012 2v2H3V3a2 2 0 012-2zM1 6h8v5H1V6z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
      </svg>
      {locale === "zh" ? "私密" : "Private"}
    </span>
  );
}

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
    <main className="index-wrap">
      <SiteHeader locale={loc} index />

      <IndexViewSwitcher
        locale={loc}
        languageSwitcher={<LanguageSwitcher current={loc} />}
        labels={{
          group: t.viewSwitcher,
          gallery: t.galleryView,
          list: t.listView,
          controls: t.controls,
          moreOptions: t.moreOptions,
          edit: t.edit,
        }}
      >
        {trips.map((trip, index) => {
          const route = `/${loc}/trips/${trip.slug}`;
          const content = (
            <>
              <div className="tc-media">
                <img
                  src={trip.coverImage}
                  alt={trip.title[loc]}
                  loading={index === 0 ? "eager" : "lazy"}
                  decoding="async"
                  fetchPriority={index === 0 ? "high" : "auto"}
                />
                {trip.private && <PrivateBadge locale={loc} />}
              </div>
              <div className="tc-body">
                <div className="tc-title-row">
                  <h2 className="tc-title">{trip.title[loc]}</h2>
                </div>
                <div className="tc-meta">
                  <p className="tc-location">{trip.location[loc]}</p>
                  <span className="tc-date">{trip.dateRange}</span>
                  {trip.private && <PrivateBadge locale={loc} inline />}
                </div>
                <p className="tc-sub">{trip.subtitle[loc]}</p>
              </div>
            </>
          );

          if (trip.private) {
            return (
              <a key={trip.slug} href={withBasePath(route)} className="trip-card">
                {content}
              </a>
            );
          }

          return (
            <Link key={trip.slug} href={route} className="trip-card">
              {content}
            </Link>
          );
        })}
      </IndexViewSwitcher>
    </main>
  );
}
