import type { TripMeta } from "@/lib/trips";
import { tripImage } from "@/lib/blob";

export const SLUG = "shaoxing-2025";

export const img = (filename: string) => tripImage(SLUG, filename);

export const meta: TripMeta = {
  slug: SLUG,
  date: "2025-03-28",
  dateRange: "2025.03.28 — 03.30",
  coverImage: img("traditional-canal-boats-alley.jpeg"),
  title: {
    zh: "绍兴 · 水巷墨香",
    en: "Shaoxing · Canals and Ink",
  },
  subtitle: {
    zh: "从鲁迅故里到曲水兰亭，沿着课本里的江南走一个周末",
    en: "A weekend through the canals, courtyards, and calligraphy of familiar textbook pages",
  },
  location: {
    zh: "中国 · 绍兴",
    en: "Shaoxing, China",
  },
};
