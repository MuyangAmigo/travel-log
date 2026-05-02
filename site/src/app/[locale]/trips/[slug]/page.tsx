import { notFound } from "next/navigation";
import Link from "next/link";
import {
  locales,
  getAllTripSlugs,
  getTrip,
  loadTripContent,
  dict,
  type Locale,
} from "@/lib/trips";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import SiteHeader from "@/components/SiteHeader";
import PrivateTripAuthGuard from "@/components/PrivateTripAuthGuard";

export function generateStaticParams() {
  const slugs = getAllTripSlugs();
  return locales.flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const trip = getTrip(slug);
  if (!trip) return {};
  return {
    title: trip.title[locale as Locale] ?? trip.title.zh,
  };
}

export default async function TripPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!locales.includes(locale as Locale)) notFound();
  const loc = locale as Locale;
  const trip = getTrip(slug);
  if (!trip) notFound();

  const Content = await loadTripContent(slug, loc);
  if (!Content) notFound();

  const t = dict[loc];

  return (
    <>
      {trip.private && <PrivateTripAuthGuard />}
      <SiteHeader locale={loc} />
      <header className="trip-shell-header">
        <Link href={`/${loc}`} className="trip-shell-back">
          <span className="arrow" aria-hidden="true">←</span>
          {t.back}
        </Link>
        <LanguageSwitcher
          current={loc}
          basePath={`/trips/${slug}`}
          forceDocumentNavigation={trip.private}
        />
      </header>
      <div className="trip-content">
        <Content />
      </div>
    </>
  );
}
