import type { TripMeta } from "@/lib/trips";
import { tripImage } from "@/lib/blob";

export const SLUG = "seoul-2023";

export const img = (filename: string) => tripImage(SLUG, filename);

export const meta: TripMeta = {
  slug: SLUG,
  date: "2023-12-29",
  dateRange: "2023.12.29 — 2024.01.01",
  coverImage: img("cover-2026-08.jpeg"),
  title: {
    zh: "首尔 · 雪坡霓虹跨年夜",
    en: "Seoul · Snow, Slopes & Midnight Neon",
  },
  subtitle: {
    zh: "弘大逛店、南山雪路、梨泰院 City Walk，以及在烟花里迎来的 2024",
    en: "Hongdae browsing, snowy Namsan paths, an Itaewon city walk, and welcoming 2024 beneath fireworks",
  },
  location: {
    zh: "韩国 · 首尔",
    en: "Seoul, South Korea",
  },
  private: true,
};
