import type { TripMeta } from "@/lib/trips";
import { tripImage } from "@/lib/blob";

export const SLUG = "hangzhou-concert-2026";

export const img = (filename: string) => tripImage(SLUG, filename);

export const meta: TripMeta = {
  slug: SLUG,
  date: "2026-03-14",
  dateRange: "2026.03.14 — 03.15",
  coverImage: img("IMG_1508.jpeg"),
  title: {
    zh: "杭州 · 为一场演唱会奔赴",
    en: "Hangzhou · A Trip for a Concert",
  },
  subtitle: {
    zh: "凤凰传奇、大莲花、老街巷和一顿辣到冒汗的宵夜",
    en: "Phoenix Legend, Big Lotus, old lanes, and a late-night spicy feast",
  },
  location: {
    zh: "中国 · 杭州",
    en: "Hangzhou, China",
  },
  private: true,
};
