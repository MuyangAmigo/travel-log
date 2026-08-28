export const TRIP_DOCUMENT_VERSION = 1 as const;

export type TripDocumentLocale = "zh" | "en";
export type LocalizedText = Record<TripDocumentLocale, string>;
export type ContentWidth = "narrow" | "medium" | "full";
export type LocalizedContentWidth = Record<TripDocumentLocale, ContentWidth>;
export type TopSpacingSize = 8 | 12 | 16 | 20 | 24;
export type BottomSpacingSize = 8 | 12 | 16 | 20;

export type BlockSpacing = {
  top?: TopSpacingSize;
  bottom?: BottomSpacingSize;
};

export type TripImageAsset = {
  id: string;
  filename: string;
  alt: LocalizedText;
};

export type TripDocumentMetadata = {
  date: string;
  dateRange: string;
  coverImageId: string;
  title: LocalizedText;
  subtitle: LocalizedText;
  location: LocalizedText;
  private: boolean;
};

export type TripDocumentSection = {
  id: string;
  navigation?: {
    marker: LocalizedText;
    label: LocalizedText;
    detail: LocalizedText;
  };
};

type TripBlockBase = {
  id: string;
  spacing?: BlockSpacing;
};

export type CoverBlock = TripBlockBase & {
  type: "cover";
  eyebrow: LocalizedText;
  title: LocalizedText;
  subtitle: LocalizedText;
  date: LocalizedText;
  intro: LocalizedText;
  introStyle?: "default" | "quote";
  introWidth?: LocalizedContentWidth;
  separators?: boolean;
  backgroundImageId?: string;
  stamp?: {
    variant: "circle" | "box";
    text: LocalizedText;
  };
  boxStamp?: LocalizedText;
  boxStampSpacing?: "default" | "relaxed";
};

export type HeaderBlock = TripBlockBase & {
  type: "header";
  markerLabel: LocalizedText;
  markerValue: LocalizedText;
  title: LocalizedText;
  subtitle: LocalizedText;
  icon?: string;
  markerVariant?: "standard" | "category";
  markerTone?: "default" | "coral";
};

export type ProseBlock = TripBlockBase & {
  type: "prose";
  style?: "body" | "handwritten" | "handwritten-cn";
  align?: "left" | "center";
  width?: LocalizedContentWidth;
  paragraphs: LocalizedText[];
};

export type GalleryBlock = TripBlockBase & {
  type: "gallery";
  layout: "one" | "two" | "three" | "four" | "weighted-left" | "weighted-right";
  variant?: "framed" | "polaroid";
  width?: "full" | "medium" | "narrow";
  images: {
    imageId: string;
    alt?: LocalizedText;
    caption?: LocalizedText;
    shape?: "square" | "landscape" | "wide" | "portrait" | "hero";
    tone?: "normal" | "warm" | "cool" | "soft" | "golden" | "vivid" | "crisp";
    tilt?: "none" | "left" | "right";
    focus?: "center" | "upper";
  }[];
};

export type TimelineBlock = TripBlockBase & {
  type: "timeline";
  items: {
    id: string;
    time: LocalizedText;
    event: LocalizedText;
    detail: LocalizedText;
  }[];
};

export type RouteBlock = TripBlockBase & {
  type: "route";
  compact?: boolean;
  stops: {
    id: string;
    icon: string;
    label: LocalizedText;
  }[];
};

export type DividerBlock = TripBlockBase & {
  type: "divider";
  icon: string;
};

export type NoteBlock = TripBlockBase & {
  type: "note";
  variant?: "note" | "warning";
  title: LocalizedText;
  body: LocalizedText;
};

export type HighlightBlock = TripBlockBase & {
  type: "highlight";
  tone?: "default" | "warning";
  title: LocalizedText;
  body: LocalizedText;
};

export type RatingBlock = TripBlockBase & {
  type: "rating";
  tone?: "default" | "warning";
  starStyle?: "solid" | "emoji";
  title: LocalizedText;
  items: {
    id: string;
    name: LocalizedText;
    score?: number;
    comment: LocalizedText;
  }[];
};

export type ShoppingBlock = TripBlockBase & {
  type: "shopping";
  pricePosition?: "before-detail" | "after-detail";
  products: {
    id: string;
    imageId?: string;
    name: LocalizedText;
    price: LocalizedText;
    detail?: LocalizedText;
  }[];
};

export type ExpenseBlock = TripBlockBase & {
  type: "expense";
  title?: LocalizedText;
  rows: {
    id: string;
    label: LocalizedText;
    detail?: LocalizedText;
    amount: LocalizedText;
    total?: boolean;
  }[];
};

export type TagsBlock = TripBlockBase & {
  type: "tags";
  variant?: "outlined" | "colored";
  items: {
    id: string;
    label: LocalizedText;
    tone: "gold" | "coral" | "teal" | "blue" | "pink" | "red" | "yellow" | "green";
  }[];
};

export type EndingBlock = TripBlockBase & {
  type: "ending";
  flag?: string;
  title: LocalizedText;
  subtitle: LocalizedText;
  stamp?: LocalizedText;
};

export type StampBlock = TripBlockBase & {
  type: "stamp";
  text: LocalizedText;
  tilt?: "left" | "none";
};

export type SpacerBlock = TripBlockBase & {
  type: "spacer";
};

export type TripBlock =
  | CoverBlock
  | HeaderBlock
  | ProseBlock
  | GalleryBlock
  | TimelineBlock
  | RouteBlock
  | DividerBlock
  | NoteBlock
  | HighlightBlock
  | RatingBlock
  | ShoppingBlock
  | ExpenseBlock
  | TagsBlock
  | EndingBlock
  | StampBlock
  | SpacerBlock;

export type TripDocumentPage = {
  id: string;
  sectionId: string;
  cardVariant?: "default" | "inset-cover";
  blocks: TripBlock[];
};

export type TripDocumentV1 = {
  version: typeof TRIP_DOCUMENT_VERSION;
  slug: string;
  metadata: TripDocumentMetadata;
  images: TripImageAsset[];
  sections: TripDocumentSection[];
  pages: TripDocumentPage[];
};

export type TripDocument = TripDocumentV1;

export type TripDocumentValidationIssue = {
  path: string;
  message: string;
};

export class TripDocumentValidationError extends Error {
  readonly issues: readonly TripDocumentValidationIssue[];

  constructor(issues: readonly TripDocumentValidationIssue[]) {
    super(
      `Invalid trip document:\n${issues
        .map((issue) => `- ${issue.path}: ${issue.message}`)
        .join("\n")}`
    );
    this.name = "TripDocumentValidationError";
    this.issues = issues;
  }
}

type UnknownRecord = Record<string, unknown>;

const ID_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const SLUG_PATTERN = ID_PATTERN;
const ISO_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const IMAGE_FILENAME_PATTERN =
  /^(?!\.{1,2}$)[^\\/:*?"<>|\u0000-\u001f]+\.(?:avif|gif|jpe?g|png|webp)$/i;
const TOP_SPACING_VALUES = [8, 12, 16, 20, 24] as const;
const BOTTOM_SPACING_VALUES = [8, 12, 16, 20] as const;
const LOCALES = ["zh", "en"] as const;

function isRecord(value: unknown): value is UnknownRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

class ValidationContext {
  readonly issues: TripDocumentValidationIssue[] = [];

  issue(path: string, message: string) {
    this.issues.push({ path, message });
  }

  record(value: unknown, path: string, allowedKeys: readonly string[]): UnknownRecord | null {
    if (!isRecord(value)) {
      this.issue(path, "must be an object");
      return null;
    }

    for (const key of Object.keys(value)) {
      if (!allowedKeys.includes(key)) {
        this.issue(`${path}.${key}`, "is not supported");
      }
    }
    return value;
  }

  array(value: unknown, path: string, minimum = 0): unknown[] {
    if (!Array.isArray(value)) {
      this.issue(path, "must be an array");
      return [];
    }
    if (value.length < minimum) {
      this.issue(path, `must contain at least ${minimum} item${minimum === 1 ? "" : "s"}`);
    }
    return value;
  }

  string(value: unknown, path: string, options?: { allowEmpty?: boolean; pattern?: RegExp }) {
    if (typeof value !== "string") {
      this.issue(path, "must be a string");
      return;
    }
    if (!options?.allowEmpty && value.trim().length === 0) {
      this.issue(path, "must not be empty");
    }
    if (options?.pattern && !options.pattern.test(value)) {
      this.issue(path, "has an invalid format");
    }
  }

  boolean(value: unknown, path: string) {
    if (typeof value !== "boolean") this.issue(path, "must be a boolean");
  }

  enum(value: unknown, path: string, allowed: readonly (string | number)[]) {
    if (!allowed.includes(value as string | number)) {
      this.issue(path, `must be one of: ${allowed.join(", ")}`);
    }
  }

  localized(value: unknown, path: string) {
    const record = this.record(value, path, LOCALES);
    if (!record) return;
    for (const locale of LOCALES) {
      this.string(record[locale], `${path}.${locale}`);
    }
  }

  id(value: unknown, path: string) {
    this.string(value, path, { pattern: ID_PATTERN });
  }
}

function validateSpacing(context: ValidationContext, value: unknown, path: string) {
  const record = context.record(value, path, ["top", "bottom"]);
  if (!record) return;
  if (record.top !== undefined) {
    context.enum(record.top, `${path}.top`, TOP_SPACING_VALUES);
  }
  if (record.bottom !== undefined) {
    context.enum(record.bottom, `${path}.bottom`, BOTTOM_SPACING_VALUES);
  }
}

function validateOptionalLocalized(
  context: ValidationContext,
  record: UnknownRecord,
  key: string,
  path: string
) {
  if (record[key] !== undefined) context.localized(record[key], `${path}.${key}`);
}

function validateLocalizedEnum(
  context: ValidationContext,
  value: unknown,
  path: string,
  allowed: readonly string[]
) {
  const record = context.record(value, path, LOCALES);
  if (!record) return;
  for (const locale of LOCALES) {
    context.enum(record[locale], `${path}.${locale}`, allowed);
  }
}

function validateOptionalString(
  context: ValidationContext,
  record: UnknownRecord,
  key: string,
  path: string
) {
  if (record[key] !== undefined) context.string(record[key], `${path}.${key}`);
}

function validateImageReference(
  context: ValidationContext,
  value: unknown,
  path: string,
  imageIds: ReadonlySet<string>,
  referencedImageIds: Set<string>
) {
  context.id(value, path);
  if (typeof value !== "string") return;
  referencedImageIds.add(value);
  if (!imageIds.has(value)) context.issue(path, `references unknown image "${value}"`);
}

function checkUniqueIds(
  context: ValidationContext,
  values: unknown[],
  path: string,
  seen: Set<string>
) {
  values.forEach((value, index) => {
    if (!isRecord(value) || typeof value.id !== "string") return;
    if (seen.has(value.id)) {
      context.issue(`${path}[${index}].id`, `duplicates "${value.id}"`);
    }
    seen.add(value.id);
  });
}

function validateBlock(
  context: ValidationContext,
  value: unknown,
  path: string,
  imageIds: ReadonlySet<string>,
  referencedImageIds: Set<string>
) {
  if (!isRecord(value)) {
    context.issue(path, "must be an object");
    return;
  }

  context.id(value.id, `${path}.id`);
  context.string(value.type, `${path}.type`);
  if (value.spacing !== undefined) validateSpacing(context, value.spacing, `${path}.spacing`);

  switch (value.type) {
    case "cover": {
      const block = context.record(value, path, [
        "id",
        "type",
        "spacing",
        "eyebrow",
        "title",
        "subtitle",
        "date",
        "intro",
        "introStyle",
        "introWidth",
        "separators",
        "backgroundImageId",
        "stamp",
        "boxStamp",
        "boxStampSpacing",
      ]);
      if (!block) return;
      for (const key of ["eyebrow", "title", "subtitle", "date", "intro"]) {
        context.localized(block[key], `${path}.${key}`);
      }
      if (block.introStyle !== undefined) {
        context.enum(block.introStyle, `${path}.introStyle`, ["default", "quote"]);
      }
      if (block.introWidth !== undefined) {
        validateLocalizedEnum(context, block.introWidth, `${path}.introWidth`, [
          "narrow",
          "medium",
          "full",
        ]);
      }
      if (block.separators !== undefined) {
        context.boolean(block.separators, `${path}.separators`);
      }
      if (block.backgroundImageId !== undefined) {
        validateImageReference(
          context,
          block.backgroundImageId,
          `${path}.backgroundImageId`,
          imageIds,
          referencedImageIds
        );
      }
      if (block.stamp !== undefined) {
        const stamp = context.record(block.stamp, `${path}.stamp`, ["variant", "text"]);
        if (stamp) {
          context.enum(stamp.variant, `${path}.stamp.variant`, ["circle", "box"]);
          context.localized(stamp.text, `${path}.stamp.text`);
        }
      }
      validateOptionalLocalized(context, block, "boxStamp", path);
      if (block.boxStampSpacing !== undefined) {
        context.enum(block.boxStampSpacing, `${path}.boxStampSpacing`, [
          "default",
          "relaxed",
        ]);
      }
      return;
    }
    case "header": {
      const block = context.record(value, path, [
        "id",
        "type",
        "spacing",
        "markerLabel",
        "markerValue",
        "title",
        "subtitle",
        "icon",
        "markerVariant",
        "markerTone",
      ]);
      if (!block) return;
      for (const key of ["markerLabel", "markerValue", "title", "subtitle"]) {
        context.localized(block[key], `${path}.${key}`);
      }
      validateOptionalString(context, block, "icon", path);
      if (block.markerVariant !== undefined) {
        context.enum(block.markerVariant, `${path}.markerVariant`, ["standard", "category"]);
      }
      if (block.markerTone !== undefined) {
        context.enum(block.markerTone, `${path}.markerTone`, ["default", "coral"]);
      }
      return;
    }
    case "prose": {
      const block = context.record(value, path, [
        "id",
        "type",
        "spacing",
        "style",
        "align",
        "width",
        "paragraphs",
      ]);
      if (!block) return;
      if (block.style !== undefined) {
        context.enum(block.style, `${path}.style`, ["body", "handwritten", "handwritten-cn"]);
      }
      if (block.align !== undefined) {
        context.enum(block.align, `${path}.align`, ["left", "center"]);
      }
      if (block.width !== undefined) {
        validateLocalizedEnum(context, block.width, `${path}.width`, [
          "narrow",
          "medium",
          "full",
        ]);
      }
      context
        .array(block.paragraphs, `${path}.paragraphs`, 1)
        .forEach((paragraph, index) =>
          context.localized(paragraph, `${path}.paragraphs[${index}]`)
        );
      return;
    }
    case "gallery": {
      const block = context.record(value, path, [
        "id",
        "type",
        "spacing",
        "layout",
        "variant",
        "width",
        "images",
      ]);
      if (!block) return;
      context.enum(block.layout, `${path}.layout`, [
        "one",
        "two",
        "three",
        "four",
        "weighted-left",
        "weighted-right",
      ]);
      if (block.variant !== undefined) {
        context.enum(block.variant, `${path}.variant`, ["framed", "polaroid"]);
      }
      if (block.width !== undefined) {
        context.enum(block.width, `${path}.width`, ["full", "medium", "narrow"]);
      }
      context.array(block.images, `${path}.images`, 1).forEach((image, index) => {
        const imagePath = `${path}.images[${index}]`;
        const item = context.record(image, imagePath, [
          "imageId",
          "alt",
          "caption",
          "shape",
          "tone",
          "tilt",
          "focus",
        ]);
        if (!item) return;
        validateImageReference(
          context,
          item.imageId,
          `${imagePath}.imageId`,
          imageIds,
          referencedImageIds
        );
        validateOptionalLocalized(context, item, "alt", imagePath);
        validateOptionalLocalized(context, item, "caption", imagePath);
        if (item.shape !== undefined) {
          context.enum(item.shape, `${imagePath}.shape`, [
            "square",
            "landscape",
            "wide",
            "portrait",
            "hero",
          ]);
        }
        if (item.tone !== undefined) {
          context.enum(item.tone, `${imagePath}.tone`, [
            "normal",
            "warm",
            "cool",
            "soft",
            "golden",
            "vivid",
            "crisp",
          ]);
        }
        if (item.tilt !== undefined) {
          context.enum(item.tilt, `${imagePath}.tilt`, ["none", "left", "right"]);
        }
        if (item.focus !== undefined) {
          context.enum(item.focus, `${imagePath}.focus`, ["center", "upper"]);
        }
      });
      return;
    }
    case "timeline": {
      const block = context.record(value, path, ["id", "type", "spacing", "items"]);
      if (!block) return;
      const items = context.array(block.items, `${path}.items`, 1);
      checkUniqueIds(context, items, `${path}.items`, new Set());
      items.forEach((item, index) => {
        const itemPath = `${path}.items[${index}]`;
        const row = context.record(item, itemPath, ["id", "time", "event", "detail"]);
        if (!row) return;
        context.id(row.id, `${itemPath}.id`);
        for (const key of ["time", "event", "detail"]) {
          context.localized(row[key], `${itemPath}.${key}`);
        }
      });
      return;
    }
    case "route": {
      const block = context.record(value, path, ["id", "type", "spacing", "compact", "stops"]);
      if (!block) return;
      if (block.compact !== undefined) context.boolean(block.compact, `${path}.compact`);
      const stops = context.array(block.stops, `${path}.stops`, 2);
      checkUniqueIds(context, stops, `${path}.stops`, new Set());
      stops.forEach((stop, index) => {
        const stopPath = `${path}.stops[${index}]`;
        const item = context.record(stop, stopPath, ["id", "icon", "label"]);
        if (!item) return;
        context.id(item.id, `${stopPath}.id`);
        context.string(item.icon, `${stopPath}.icon`);
        context.localized(item.label, `${stopPath}.label`);
      });
      return;
    }
    case "divider": {
      const block = context.record(value, path, ["id", "type", "spacing", "icon"]);
      if (block) context.string(block.icon, `${path}.icon`);
      return;
    }
    case "note": {
      const block = context.record(value, path, [
        "id",
        "type",
        "spacing",
        "variant",
        "title",
        "body",
      ]);
      if (!block) return;
      if (block.variant !== undefined) {
        context.enum(block.variant, `${path}.variant`, ["note", "warning"]);
      }
      context.localized(block.title, `${path}.title`);
      context.localized(block.body, `${path}.body`);
      return;
    }
    case "highlight": {
      const block = context.record(value, path, [
        "id",
        "type",
        "spacing",
        "tone",
        "title",
        "body",
      ]);
      if (!block) return;
      if (block.tone !== undefined) {
        context.enum(block.tone, `${path}.tone`, ["default", "warning"]);
      }
      context.localized(block.title, `${path}.title`);
      context.localized(block.body, `${path}.body`);
      return;
    }
    case "rating": {
      const block = context.record(value, path, [
        "id",
        "type",
        "spacing",
        "tone",
        "starStyle",
        "title",
        "items",
      ]);
      if (!block) return;
      if (block.tone !== undefined) {
        context.enum(block.tone, `${path}.tone`, ["default", "warning"]);
      }
      if (block.starStyle !== undefined) {
        context.enum(block.starStyle, `${path}.starStyle`, ["solid", "emoji"]);
      }
      context.localized(block.title, `${path}.title`);
      const items = context.array(block.items, `${path}.items`, 1);
      checkUniqueIds(context, items, `${path}.items`, new Set());
      items.forEach((item, index) => {
        const itemPath = `${path}.items[${index}]`;
        const row = context.record(item, itemPath, ["id", "name", "score", "comment"]);
        if (!row) return;
        context.id(row.id, `${itemPath}.id`);
        context.localized(row.name, `${itemPath}.name`);
        if (row.score !== undefined) {
          if (
            typeof row.score !== "number" ||
            !Number.isInteger(row.score) ||
            row.score < 0 ||
            row.score > 5
          ) {
            context.issue(`${itemPath}.score`, "must be an integer from 0 to 5");
          }
        }
        context.localized(row.comment, `${itemPath}.comment`);
      });
      return;
    }
    case "shopping": {
      const block = context.record(value, path, [
        "id",
        "type",
        "spacing",
        "pricePosition",
        "products",
      ]);
      if (!block) return;
      if (block.pricePosition !== undefined) {
        context.enum(block.pricePosition, `${path}.pricePosition`, [
          "before-detail",
          "after-detail",
        ]);
      }
      const products = context.array(block.products, `${path}.products`, 1);
      checkUniqueIds(context, products, `${path}.products`, new Set());
      products.forEach((product, index) => {
        const itemPath = `${path}.products[${index}]`;
        const item = context.record(product, itemPath, [
          "id",
          "imageId",
          "name",
          "price",
          "detail",
        ]);
        if (!item) return;
        context.id(item.id, `${itemPath}.id`);
        if (item.imageId !== undefined) {
          validateImageReference(
            context,
            item.imageId,
            `${itemPath}.imageId`,
            imageIds,
            referencedImageIds
          );
        }
        context.localized(item.name, `${itemPath}.name`);
        context.localized(item.price, `${itemPath}.price`);
        validateOptionalLocalized(context, item, "detail", itemPath);
      });
      return;
    }
    case "expense": {
      const block = context.record(value, path, ["id", "type", "spacing", "title", "rows"]);
      if (!block) return;
      validateOptionalLocalized(context, block, "title", path);
      const rows = context.array(block.rows, `${path}.rows`, 1);
      checkUniqueIds(context, rows, `${path}.rows`, new Set());
      rows.forEach((row, index) => {
        const rowPath = `${path}.rows[${index}]`;
        const item = context.record(row, rowPath, [
          "id",
          "label",
          "detail",
          "amount",
          "total",
        ]);
        if (!item) return;
        context.id(item.id, `${rowPath}.id`);
        context.localized(item.label, `${rowPath}.label`);
        validateOptionalLocalized(context, item, "detail", rowPath);
        context.localized(item.amount, `${rowPath}.amount`);
        if (item.total !== undefined) context.boolean(item.total, `${rowPath}.total`);
      });
      return;
    }
    case "tags": {
      const block = context.record(value, path, ["id", "type", "spacing", "variant", "items"]);
      if (!block) return;
      if (block.variant !== undefined) {
        context.enum(block.variant, `${path}.variant`, ["outlined", "colored"]);
      }
      const items = context.array(block.items, `${path}.items`, 1);
      checkUniqueIds(context, items, `${path}.items`, new Set());
      items.forEach((tag, index) => {
        const itemPath = `${path}.items[${index}]`;
        const item = context.record(tag, itemPath, ["id", "label", "tone"]);
        if (!item) return;
        context.id(item.id, `${itemPath}.id`);
        context.localized(item.label, `${itemPath}.label`);
        context.enum(item.tone, `${itemPath}.tone`, [
          "gold",
          "coral",
          "teal",
          "blue",
          "pink",
          "red",
          "yellow",
          "green",
        ]);
      });
      return;
    }
    case "ending": {
      const block = context.record(value, path, [
        "id",
        "type",
        "spacing",
        "flag",
        "title",
        "subtitle",
        "stamp",
      ]);
      if (!block) return;
      validateOptionalString(context, block, "flag", path);
      context.localized(block.title, `${path}.title`);
      context.localized(block.subtitle, `${path}.subtitle`);
      validateOptionalLocalized(context, block, "stamp", path);
      return;
    }
    case "stamp": {
      const block = context.record(value, path, ["id", "type", "spacing", "text", "tilt"]);
      if (!block) return;
      context.localized(block.text, `${path}.text`);
      if (block.tilt !== undefined) {
        context.enum(block.tilt, `${path}.tilt`, ["left", "none"]);
      }
      return;
    }
    case "spacer": {
      context.record(value, path, ["id", "type", "spacing"]);
      return;
    }
    default:
      context.issue(`${path}.type`, `unsupported block type "${String(value.type)}"`);
  }
}

export function validateTripDocument(value: unknown): TripDocumentValidationIssue[] {
  const context = new ValidationContext();
  const document = context.record(value, "$", [
    "version",
    "slug",
    "metadata",
    "images",
    "sections",
    "pages",
  ]);
  if (!document) return context.issues;

  if (document.version !== TRIP_DOCUMENT_VERSION) {
    context.issue(
      "$.version",
      `must be ${TRIP_DOCUMENT_VERSION}; received ${String(document.version)}`
    );
  }
  context.string(document.slug, "$.slug", { pattern: SLUG_PATTERN });

  const metadata = context.record(document.metadata, "$.metadata", [
    "date",
    "dateRange",
    "coverImageId",
    "title",
    "subtitle",
    "location",
    "private",
  ]);
  if (metadata) {
    context.string(metadata.date, "$.metadata.date", { pattern: ISO_DATE_PATTERN });
    context.string(metadata.dateRange, "$.metadata.dateRange");
    context.id(metadata.coverImageId, "$.metadata.coverImageId");
    context.localized(metadata.title, "$.metadata.title");
    context.localized(metadata.subtitle, "$.metadata.subtitle");
    context.localized(metadata.location, "$.metadata.location");
    context.boolean(metadata.private, "$.metadata.private");
  }

  const images = context.array(document.images, "$.images", 1);
  const imageIds = new Set<string>();
  checkUniqueIds(context, images, "$.images", imageIds);
  images.forEach((image, index) => {
    const path = `$.images[${index}]`;
    const item = context.record(image, path, ["id", "filename", "alt"]);
    if (!item) return;
    context.id(item.id, `${path}.id`);
    context.string(item.filename, `${path}.filename`, { pattern: IMAGE_FILENAME_PATTERN });
    context.localized(item.alt, `${path}.alt`);
  });

  const referencedImageIds = new Set<string>();
  if (metadata?.coverImageId !== undefined) {
    validateImageReference(
      context,
      metadata.coverImageId,
      "$.metadata.coverImageId",
      imageIds,
      referencedImageIds
    );
  }

  const sections = context.array(document.sections, "$.sections", 1);
  const sectionIds = new Set<string>();
  checkUniqueIds(context, sections, "$.sections", sectionIds);
  sections.forEach((section, index) => {
    const path = `$.sections[${index}]`;
    const item = context.record(section, path, ["id", "navigation"]);
    if (!item) return;
    context.id(item.id, `${path}.id`);
    if (item.navigation !== undefined) {
      const navigation = context.record(item.navigation, `${path}.navigation`, [
        "marker",
        "label",
        "detail",
      ]);
      if (navigation) {
        context.localized(navigation.marker, `${path}.navigation.marker`);
        context.localized(navigation.label, `${path}.navigation.label`);
        context.localized(navigation.detail, `${path}.navigation.detail`);
      }
    }
  });

  const pages = context.array(document.pages, "$.pages", 1);
  checkUniqueIds(context, pages, "$.pages", new Set());
  const usedSectionIds = new Set<string>();
  const blockIds = new Set<string>();
  pages.forEach((page, pageIndex) => {
    const path = `$.pages[${pageIndex}]`;
    const item = context.record(page, path, ["id", "sectionId", "cardVariant", "blocks"]);
    if (!item) return;
    context.id(item.id, `${path}.id`);
    context.id(item.sectionId, `${path}.sectionId`);
    if (item.cardVariant !== undefined) {
      context.enum(item.cardVariant, `${path}.cardVariant`, ["default", "inset-cover"]);
    }
    if (typeof item.sectionId === "string") {
      usedSectionIds.add(item.sectionId);
      if (!sectionIds.has(item.sectionId)) {
        context.issue(`${path}.sectionId`, `references unknown section "${item.sectionId}"`);
      }
    }
    const blocks = context.array(item.blocks, `${path}.blocks`, 1);
    checkUniqueIds(context, blocks, `${path}.blocks`, blockIds);
    blocks.forEach((block, blockIndex) =>
      validateBlock(
        context,
        block,
        `${path}.blocks[${blockIndex}]`,
        imageIds,
        referencedImageIds
      )
    );
  });

  for (const sectionId of sectionIds) {
    if (!usedSectionIds.has(sectionId)) {
      context.issue("$.sections", `section "${sectionId}" is not used by any page`);
    }
  }
  for (const imageId of imageIds) {
    if (!referencedImageIds.has(imageId)) {
      context.issue("$.images", `image "${imageId}" is not referenced`);
    }
  }

  return context.issues;
}

export function parseTripDocument(value: unknown): TripDocument {
  const issues = validateTripDocument(value);
  if (issues.length > 0) throw new TripDocumentValidationError(issues);
  return value as TripDocument;
}

export function localize(value: LocalizedText, locale: TripDocumentLocale): string {
  return value[locale];
}

export type StructuredTripEntrySection = {
  id: string;
  marker: string;
  label: string;
  detail: string;
};

const SECTION_COPY = {
  zh: {
    marker: (page: string) => `页面 ${page}`,
    label: (page: string) => `第 ${page} 页`,
  },
  en: {
    marker: (page: string) => `PAGE ${page}`,
    label: (page: string) => `Page ${page}`,
  },
} satisfies Record<
  TripDocumentLocale,
  { marker: (page: string) => string; label: (page: string) => string }
>;

export function deriveTripEntrySections(
  document: TripDocument,
  locale: TripDocumentLocale
): StructuredTripEntrySection[] {
  return document.sections.map((section) => {
    if (section.navigation) {
      return {
        id: section.id,
        marker: localize(section.navigation.marker, locale),
        label: localize(section.navigation.label, locale),
        detail: localize(section.navigation.detail, locale),
      };
    }

    const pageIndex = document.pages.findIndex((page) => page.sectionId === section.id);
    const page = document.pages[pageIndex];
    const pageNumber = String(pageIndex + 1).padStart(2, "0");
    const lead = page.blocks.find(
      (block): block is CoverBlock | HeaderBlock =>
        block.type === "cover" || block.type === "header"
    );

    if (lead?.type === "cover") {
      return {
        id: section.id,
        marker: SECTION_COPY[locale].marker(pageNumber),
        label: localize(lead.title, locale),
        detail: [localize(lead.subtitle, locale), localize(lead.date, locale)].join(" · "),
      };
    }

    if (lead?.type === "header") {
      return {
        id: section.id,
        marker: [
          localize(lead.markerLabel, locale),
          localize(lead.markerValue, locale),
        ].join(" "),
        label: localize(lead.title, locale),
        detail: localize(lead.subtitle, locale),
      };
    }

    return {
      id: section.id,
      marker: SECTION_COPY[locale].marker(pageNumber),
      label: SECTION_COPY[locale].label(pageNumber),
      detail: "",
    };
  });
}

export function tripDocumentToMeta(
  document: TripDocument,
  imageUrl: (filename: string) => string
) {
  const coverImage = document.images.find(
    (image) => image.id === document.metadata.coverImageId
  );
  if (!coverImage) {
    throw new TripDocumentValidationError([
      {
        path: "$.metadata.coverImageId",
        message: `references unknown image "${document.metadata.coverImageId}"`,
      },
    ]);
  }

  return {
    slug: document.slug,
    date: document.metadata.date,
    dateRange: document.metadata.dateRange,
    coverImage: imageUrl(coverImage.filename),
    title: document.metadata.title,
    subtitle: document.metadata.subtitle,
    location: document.metadata.location,
    private: document.metadata.private,
  };
}
