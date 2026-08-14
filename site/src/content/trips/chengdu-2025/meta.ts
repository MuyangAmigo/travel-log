import type { TripMeta } from "@/lib/trips";
import { tripImage } from "@/lib/blob";

export const SLUG = "chengdu-2025";

export const img = (filename: string) => tripImage(SLUG, filename);

export const meta: TripMeta = {
  slug: SLUG,
  date: "2025-01-01",
  dateRange: "2025.01.01 — 01.04",
  coverImage: img("two-people-outdoor-cafe.jpeg"),
  title: {
    zh: "成都 · 四天三夜",
    en: "Chengdu · Four Days, Three Nights",
  },
  subtitle: {
    zh: "花花、春熙路、蜀宴赋，还有吃不完的成都味道",
    en: "Huahua, Chunxi Road, Shuyan Fu, and more Chengdu flavors than we could finish",
  },
  location: {
    zh: "中国 · 成都",
    en: "Chengdu, China",
  },
  private: true,
};
