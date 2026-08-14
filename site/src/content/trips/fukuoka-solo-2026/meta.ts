import type { TripMeta } from "@/lib/trips";
import { tripImage } from "@/lib/blob";

export const SLUG = "fukuoka-solo-2026";

export const img = (filename: string) => tripImage(SLUG, filename);

export const meta: TripMeta = {
  slug: SLUG,
  date: "2026-06-03",
  dateRange: "2026.06.03 — 06.07",
  coverImage: img("20-seaside-torii.webp"),
  title: {
    zh: "福冈 · 一个人慢慢走",
    en: "Fukuoka · Wandering at My Own Pace",
  },
  subtitle: {
    zh: "雨中的神社、临时起意的海边，还有第一次真正和自己同行",
    en: "Rainy shrines, an unplanned seaside, and learning to enjoy my own company",
  },
  location: {
    zh: "日本 · 福冈与太宰府",
    en: "Fukuoka & Dazaifu, Japan",
  },
  private: true,
};
