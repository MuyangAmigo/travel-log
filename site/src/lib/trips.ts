import type { ReactNode } from "react";
import type { TripEntrySection } from "@/components/TripEntryLayout";
import type { TripStyle } from "./trip-style";

export type Locale = "zh" | "en";
export const locales: Locale[] = ["zh", "en"];
export const defaultLocale: Locale = "zh";

export interface TripMeta {
  slug: string;
  date: string;
  dateRange: string;
  coverImage: string;
  style: TripStyle;
  title: Record<Locale, string>;
  subtitle: Record<Locale, string>;
  location: Record<Locale, string>;
  /**
   * When true, the trip remains listed but its generated HTML is encrypted at
   * build time. The server-side authentication API releases a page-specific
   * decryption key after Microsoft account or passcode authentication.
   */
  private?: boolean;
}

import { meta as bangkok2026Meta } from "@/content/trips/bangkok-2026/meta";
import { meta as chengdu2025Meta } from "@/content/trips/chengdu-2025/meta";
import { meta as phuket2026Meta } from "@/content/trips/phuket-2026/meta";
import { meta as fukuokaSolo2026Meta } from "@/content/trips/fukuoka-solo-2026/meta";
import { meta as hangzhouConcert2026Meta } from "@/content/trips/hangzhou-concert-2026/meta";
import { meta as japan2023Meta } from "@/content/trips/japan-2023/meta";
import { meta as japanKansai2024Meta } from "@/content/trips/japan-kansai-2024/meta";
import { meta as jiuzhaigou2024Meta } from "@/content/trips/jiuzhaigou-2024/meta";
import { meta as kansaiFamily2024Meta } from "@/content/trips/kansai-family-2024/meta";
import { meta as kansai2025Meta } from "@/content/trips/kansai-2025/meta";
import { meta as kotaKinabalu2025Meta } from "@/content/trips/kota-kinabalu-2025/meta";
import { meta as seoul2023Meta } from "@/content/trips/seoul-2023/meta";
import { meta as shaoxing2025Meta } from "@/content/trips/shaoxing-2025/meta";
import { meta as sydney2025Meta } from "@/content/trips/sydney-2025/meta";
import { meta as taizhou2025Meta } from "@/content/trips/taizhou-2025/meta";
import { meta as tokyo2025Meta } from "@/content/trips/tokyo-2025/meta";

// Publication is a listing property, distinct from the trip's travel date.
// Existing timestamps reflect the first addition of each trip to the index.
const listings: { trip: TripMeta; publishedAt: string }[] = [
  { trip: phuket2026Meta, publishedAt: "2026-08-21T14:20:22+07:00" },
  { trip: fukuokaSolo2026Meta, publishedAt: "2026-08-14T16:01:09+08:00" },
  { trip: bangkok2026Meta, publishedAt: "2026-04-18T00:54:52+08:00" },
  { trip: hangzhouConcert2026Meta, publishedAt: "2026-05-02T23:41:17+08:00" },
  { trip: tokyo2025Meta, publishedAt: "2026-08-14T14:50:29+08:00" },
  { trip: sydney2025Meta, publishedAt: "2026-09-09T13:53:16+08:00" },
  { trip: taizhou2025Meta, publishedAt: "2026-09-11T15:08:44+08:00" },
  { trip: kotaKinabalu2025Meta, publishedAt: "2026-09-05T23:56:55+08:00" },
  { trip: kansai2025Meta, publishedAt: "2026-09-11T23:49:38+08:00" },
  { trip: kansaiFamily2024Meta, publishedAt: "2026-09-25T16:31:49+08:00" },
  { trip: japanKansai2024Meta, publishedAt: "2026-08-14T19:15:08+08:00" },
  { trip: jiuzhaigou2024Meta, publishedAt: "2026-09-25T16:49:17+08:00" },
  { trip: shaoxing2025Meta, publishedAt: "2026-08-14T16:39:24+08:00" },
  { trip: chengdu2025Meta, publishedAt: "2026-08-14T13:27:57+08:00" },
  { trip: seoul2023Meta, publishedAt: "2026-08-14T16:33:42+08:00" },
  { trip: japan2023Meta, publishedAt: "2026-08-14T23:41:17+08:00" },
];

export const trips = listings
  .map(({ trip, publishedAt }) => ({ ...trip, publishedAt }))
  .sort((a, b) => b.date.localeCompare(a.date));

export const publishedTripOrder = trips
  .map((_, index) => index)
  .sort(
    (a, b) =>
      Date.parse(trips[b].publishedAt) - Date.parse(trips[a].publishedAt) ||
      a - b
  );

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
): Promise<{
  Content: () => ReactNode;
  sections?: readonly TripEntrySection[];
} | null> {
  try {
    const mod = (await import(`@/content/trips/${slug}/${locale}`)) as {
      default: () => ReactNode;
      sections?: readonly TripEntrySection[];
    };
    return {
      Content: mod.default,
      sections: mod.sections,
    };
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
    viewSwitcher: "切换旅行列表视图",
    galleryView: "画廊视图",
    listView: "列表视图",
    sortBy: "排序方式",
    recentPublication: "最近发布",
    travelDate: "出游时间",
    siteTitle: "Junjie 的旅行手记",
    controls: "阅读偏好",
    moreOptions: "更多选项",
    edit: "编辑旅行手记",
    siteSub: "一本慢慢写下去的手帐",
  },
  en: {
    allTrips: "Journeys",
    tagline: "Paths walked. People met. Meals eaten.",
    date: "Date",
    location: "Location",
    readJournal: "Open the journal",
    back: "Back",
    viewSwitcher: "Change trip list view",
    galleryView: "Gallery view",
    listView: "List view",
    sortBy: "Sort by",
    recentPublication: "Recently published",
    travelDate: "Travel date",
    siteTitle: "Junjie's Travel Journal",
    controls: "Reading preferences",
    moreOptions: "More options",
    edit: "Edit journal",
    siteSub: "A journal kept slowly, one trip at a time.",
  },
} as const;
