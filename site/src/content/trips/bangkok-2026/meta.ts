import type { TripMeta } from "@/lib/trips";
import { tripImage } from "@/lib/blob";

export const SLUG = "bangkok-2026";

export const img = (filename: string) => tripImage(SLUG, filename);

export const meta: TripMeta = {
  slug: SLUG,
  date: "2026-04-02",
  dateRange: "2026.04.02 — 04.06",
  coverImage: img("IMG_1725.jpeg"),
  title: {
    zh: "曼谷 · 热浪漫游",
    en: "Bangkok · Heatwave Wanderings",
  },
  subtitle: {
    zh: "从浦东深夜落地，到素万那普清晨告别",
    en: "From a midnight touchdown to a morning farewell at Suvarnabhumi",
  },
  location: {
    zh: "泰国 · 曼谷",
    en: "Bangkok, Thailand",
  },
  private: true,
};
