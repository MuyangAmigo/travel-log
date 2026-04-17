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
  const trip = getTrip(slug);
  if (!trip) notFound();

  const Content = await loadTripContent(slug, locale as Locale);
  if (!Content) notFound();

  const t = dict[locale as Locale];

  return (
      <>
      <header className="trip-shell-header">
        <Link
          href={`/${locale}`}
          className="trip-shell-back"
        >
          ← {t.back}
        </Link>
        <LanguageSwitcher
          current={locale as Locale}
          basePath={`/trips/${slug}`}
        />
      </header>
      <Content />
    </>
  );
}
