import type { TripMeta } from "@/lib/trips";
import { tripImage } from "@/lib/blob";

export const SLUG = "japan-2023";

export const img = (filename: string) => tripImage(SLUG, filename);

export const meta: TripMeta = {
  slug: SLUG,
  date: "2023-11-01",
  dateRange: "2023.11",
  coverImage: img("mount-fuji-lake-view.png"),
  title: {
    zh: "富士静景，东京热游",
    en: "Fuji Stillness, Tokyo in Motion",
  },
  subtitle: {
    zh: "从河口湖的温泉晨景，到东京街区、横滨夜色与满箱战利品",
    en: "From quiet onsen mornings at Lake Kawaguchi to Tokyo streets, Yokohama lights, and suitcases full of finds",
  },
  location: {
    zh: "日本 · 河口湖 / 东京 / 横滨",
    en: "Lake Kawaguchi, Tokyo & Yokohama, Japan",
  },
  private: true,
};
