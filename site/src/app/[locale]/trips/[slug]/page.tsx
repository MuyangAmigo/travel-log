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
      <header
        style={{
          width: "min(1200px, calc(100vw - 40px))",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingBottom: "4px",
          fontFamily: "var(--font-display)",
          fontSize: "13px",
          letterSpacing: "2px",
          textTransform: "uppercase",
          color: "var(--ink-light)",
        }}
      >
        <Link
          href={`/${locale}`}
          style={{ color: "var(--ink-light)", textDecoration: "none" }}
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
