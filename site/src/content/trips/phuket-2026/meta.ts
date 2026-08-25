import type { TripMeta } from "@/lib/trips";
import { tripImage } from "@/lib/blob";

export const SLUG = "phuket-2026";

export const img = (filename: string) => tripImage(SLUG, filename);

export const meta: TripMeta = {
  slug: SLUG,
  date: "2026-08-20",
  dateRange: "2026.08.20 — 08.24",
  coverImage: img("beach-palms-ocean.jpeg"),
  title: {
    zh: "普吉 · 一场不期而遇的潜水",
    en: "Phuket · An Unexpected Dive",
  },
  subtitle: {
    zh: "从延误的夜航，到自然醒的海岛早晨",
    en: "From a delayed red-eye to waking up slowly in island time",
  },
  location: {
    zh: "泰国 · 普吉岛",
    en: "Phuket, Thailand",
  },
  private: true,
};
