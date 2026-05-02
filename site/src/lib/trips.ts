import type { ReactNode } from "react";

export type Locale = "zh" | "en";
export const locales: Locale[] = ["zh", "en"];
export const defaultLocale: Locale = "zh";

export interface TripMeta {
  slug: string;
  date: string;
  dateRange: string;
  coverImage: string;
  title: Record<Locale, string>;
  subtitle: Record<Locale, string>;
  location: Record<Locale, string>;
  /**
   * When true, the trip is hidden from the public index and its generated
   * HTML is encrypted at build time by scripts/encrypt-private-trips.mjs.
   * Viewers must enter the shared password to decrypt.
   */
  private?: boolean;
}

import { meta as bangkok2026Meta } from "@/content/trips/bangkok-2026/meta";
import { meta as hangzhouConcert2026Meta } from "@/content/trips/hangzhou-concert-2026/meta";

export const trips: TripMeta[] = [hangzhouConcert2026Meta, bangkok2026Meta];

export function getTrip(slug: string): TripMeta | undefined {
  return trips.find((t) => t.slug === slug);
}

export function getAllTripSlugs(): string[] {
  return trips.map((t) => t.slug);
}

export function getPrivateTripSlugs(): string[] {
  return trips.filter((t) => t.private).map((t) => t.slug);
}

export async function loadTripContent(
  slug: string,
  locale: Locale
): Promise<(() => ReactNode) | null> {
  try {
    const mod = await import(`@/content/trips/${slug}/${locale}`);
    return mod.default as () => ReactNode;
  } catch {
    return null;
  }
}

export const dict = {
  zh: {
    allTrips: "旅行记录",
    tagline: "走过的路，遇过的人，吃过的饭。",
    date: "日期",
    location: "地点",
    readJournal: "翻开手帐",
    back: "返回",
    siteTitle: "Junjie's Travel Journal",
    siteSub: "一本慢慢写下去的手帐",
  },
  en: {
    allTrips: "Journeys",
    tagline: "Paths walked. People met. Meals eaten.",
    date: "Date",
    location: "Location",
    readJournal: "Open the journal",
    back: "Back",
    siteTitle: "Junjie's Travel Journal",
    siteSub: "A journal kept slowly, one trip at a time.",
  },
} as const;
