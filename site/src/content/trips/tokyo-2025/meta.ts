import type { TripMeta } from "@/lib/trips";
import { tripImage } from "@/lib/blob";

export const SLUG = "tokyo-2025";

export const img = (filename: string) => tripImage(SLUG, filename);

export const meta: TripMeta = {
  slug: SLUG,
  date: "2025-10-05",
  dateRange: "2025.10.05 — 10.10",
  coverImage: img("cover-2026-08.png"),
  title: {
    zh: "东京 · 海岸、迪士尼与买买买",
    en: "Tokyo · Coasts, Disney & a Shopping Spree",
  },
  subtitle: {
    zh: "镰仓海风、新宿扫货、东京迪士尼海洋，还有香奈儿百年展的收尾",
    en: "Kamakura sea breeze, Shinjuku hauls, Tokyo DisneySea, and a Chanel century exhibition finale",
  },
  location: {
    zh: "日本 · 东京",
    en: "Tokyo, Japan",
  },
  private: true,
};
