import type { TripMeta } from "@/lib/trips";
import { tripImage } from "@/lib/blob";

export const SLUG = "japan-kansai-2024";

export const img = (filename: string) => tripImage(SLUG, filename);

export const meta: TripMeta = {
  slug: SLUG,
  date: "2024-04-10",
  dateRange: "2024.04.10 — 04.15",
  coverImage: img("illuminated-pagoda-cherry-blossoms-night.jpg"),
  title: {
    zh: "关西 · 樱灯、魔法与抹茶",
    en: "Kansai · Cherry Lights, Magic & Matcha",
  },
  subtitle: {
    zh: "大阪环球影城、京都夜樱与宇治河岸，夹在两轮购物冲刺之间的春日六天",
    en: "Six spring days of USJ, Kyoto's night blossoms, Uji river walks, and two determined shopping runs",
  },
  location: {
    zh: "日本 · 大阪、京都、宇治",
    en: "Osaka, Kyoto & Uji, Japan",
  },
  private: true,
};
