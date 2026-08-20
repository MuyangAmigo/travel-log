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
import ImageLightbox from "@/components/ImageLightbox";
import CardScaleController from "@/components/CardScaleController";
import TripEntryLayout from "@/components/TripEntryLayout";

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

  const tripContent = await loadTripContent(slug, loc);
  if (!tripContent) notFound();
  const { Content, sections } = tripContent;

  const t = dict[loc];

  return (
    <>
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
        <TripEntryLayout locale={loc} sections={sections}>
          <CardScaleController />
          <Content />
        </TripEntryLayout>
      </div>
      <ImageLightbox locale={loc} />
    </>
  );
}
