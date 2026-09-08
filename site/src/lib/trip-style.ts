export const TRIP_STYLE_IDS = ["classic", "photo-story", "field-journal"] as const;
export type TripStyle = (typeof TRIP_STYLE_IDS)[number];

export const TRIP_STYLES = {
  classic: {
    label: { zh: "经典游记", en: "Classic" },
    description: { zh: "原有卡片与章节侧栏。", en: "Original cards and chapter rails." },
  },
  "photo-story": {
    label: { zh: "影像游记", en: "Photo story" },
    description: { zh: "对称图文双栏，宽幅影像与居中标题。", en: "Balanced text and photo columns, with centered titles." },
  },
  "field-journal": {
    label: { zh: "旅途手记", en: "Field journal" },
    description: { zh: "紧凑图片与清晰日期，沿着旅程慢慢读。", en: "A narrower reading column with clear day markers." },
  },
} as const satisfies Record<TripStyle, {
  label: Record<"zh" | "en", string>;
  description: Record<"zh" | "en", string>;
}>;

export function isTripStyle(value: unknown): value is TripStyle {
  return TRIP_STYLE_IDS.some((style) => style === value);
}

export function resolveTripStyle(value: unknown): TripStyle {
  if (value === undefined) return "classic";
  if (isTripStyle(value)) return value;
  const received = typeof value === "string" ? JSON.stringify(value) : String(value);
  throw new Error(
    `Unsupported trip style ${received} (type: ${typeof value}). Supported styles: ${TRIP_STYLE_IDS.join(", ")}.`,
  );
}
