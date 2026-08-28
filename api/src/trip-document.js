import { EditorApiError } from "./editor-errors.js";

const ID_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/u;
const SLUG_PATTERN = ID_PATTERN;
const ISO_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/u;
const IMAGE_FILENAME_PATTERN =
  /^(?!\.{1,2}$)[^\\/:*?"<>|\u0000-\u001f]+\.(?:avif|gif|jpe?g|png|webp)$/iu;
const LOCALES = ["zh", "en"];
const MAX_TEXT_LENGTH = 20_000;

function isRecord(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

class ValidationContext {
  issues = [];

  constructor({ allowEmptyEnglish = false } = {}) {
    this.allowEmptyEnglish = allowEmptyEnglish;
  }

  issue(path, message) {
    this.issues.push({ path, message });
  }

  object(value, path, allowedKeys, requiredKeys = allowedKeys) {
    if (!isRecord(value)) {
      this.issue(path, "must be an object");
      return null;
    }
    for (const key of Object.keys(value)) {
      if (!allowedKeys.includes(key)) {
        this.issue(`${path}.${key}`, "is not supported");
      }
    }
    for (const key of requiredKeys) {
      if (!(key in value)) {
        this.issue(`${path}.${key}`, "is required");
      }
    }
    return value;
  }

  array(value, path, { minimum = 0, maximum = 200 } = {}) {
    if (!Array.isArray(value)) {
      this.issue(path, "must be an array");
      return [];
    }
    if (value.length < minimum) {
      this.issue(path, `must contain at least ${minimum} item(s)`);
    }
    if (value.length > maximum) {
      this.issue(path, `must contain no more than ${maximum} items`);
    }
    return value;
  }

  string(value, path, { allowEmpty = false, pattern, maximum = MAX_TEXT_LENGTH } = {}) {
    if (typeof value !== "string") {
      this.issue(path, "must be a string");
      return;
    }
    if (!allowEmpty && value.trim().length === 0) {
      this.issue(path, "must not be empty");
    }
    if (value.length > maximum) {
      this.issue(path, `must contain no more than ${maximum} characters`);
    }
    if (pattern && !pattern.test(value)) {
      this.issue(path, "has an invalid format");
    }
  }

  boolean(value, path) {
    if (typeof value !== "boolean") this.issue(path, "must be a boolean");
  }

  enum(value, path, allowed) {
    if (!allowed.includes(value)) {
      this.issue(path, `must be one of: ${allowed.join(", ")}`);
    }
  }

  id(value, path) {
    this.string(value, path, { pattern: ID_PATTERN, maximum: 100 });
  }

  localized(value, path) {
    const localized = this.object(value, path, LOCALES);
    if (!localized) return;
    for (const locale of LOCALES) {
      this.string(localized[locale], `${path}.${locale}`, {
        allowEmpty: locale === "en" && this.allowEmptyEnglish,
      });
    }
  }
}

function validateUniqueIds(context, items, path, seen = new Set()) {
  items.forEach((item, index) => {
    if (!isRecord(item) || typeof item.id !== "string") return;
    if (seen.has(item.id)) {
      context.issue(`${path}[${index}].id`, `duplicates "${item.id}"`);
    }
    seen.add(item.id);
  });
  return seen;
}

function validateOptionalLocalized(context, record, key, path) {
  if (record[key] !== undefined) {
    context.localized(record[key], `${path}.${key}`);
  }
}

function validateOptionalString(context, record, key, path) {
  if (record[key] !== undefined) {
    context.string(record[key], `${path}.${key}`);
  }
}

function validateSpacing(context, spacing, path) {
  const value = context.object(spacing, path, ["top", "bottom"], []);
  if (!value) return;
  if (value.top !== undefined) {
    context.enum(value.top, `${path}.top`, [8, 12, 16, 20, 24]);
  }
  if (value.bottom !== undefined) {
    context.enum(value.bottom, `${path}.bottom`, [8, 12, 16, 20]);
  }
}

function validateLocalizedEnum(context, value, path, allowed) {
  const localized = context.object(value, path, LOCALES);
  if (!localized) return;
  for (const locale of LOCALES) {
    context.enum(localized[locale], `${path}.${locale}`, allowed);
  }
}

function validateImageReference(
  context,
  value,
  path,
  imageIds,
  referencedImageIds
) {
  context.id(value, path);
  if (typeof value !== "string") return;
  referencedImageIds.add(value);
  if (!imageIds.has(value)) {
    context.issue(path, `references unknown image "${value}"`);
  }
}

function blockObject(context, value, path, keys, required) {
  const block = context.object(
    value,
    path,
    ["id", "type", "spacing", ...keys],
    ["id", "type", ...required]
  );
  if (!block) return null;
  context.id(block.id, `${path}.id`);
  if (block.spacing !== undefined) {
    validateSpacing(context, block.spacing, `${path}.spacing`);
  }
  return block;
}

function validateBlock(
  context,
  value,
  path,
  imageIds,
  referencedImageIds
) {
  if (!isRecord(value)) {
    context.issue(path, "must be an object");
    return;
  }
  context.string(value.type, `${path}.type`);

  switch (value.type) {
    case "cover": {
      const block = blockObject(
        context,
        value,
        path,
        [
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
        ],
        ["eyebrow", "title", "subtitle", "date", "intro"]
      );
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
        const stamp = context.object(
          block.stamp,
          `${path}.stamp`,
          ["variant", "text"]
        );
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
      const block = blockObject(
        context,
        value,
        path,
        [
          "markerLabel",
          "markerValue",
          "title",
          "subtitle",
          "icon",
          "markerVariant",
          "markerTone",
        ],
        ["markerLabel", "markerValue", "title", "subtitle"]
      );
      if (!block) return;
      for (const key of ["markerLabel", "markerValue", "title", "subtitle"]) {
        context.localized(block[key], `${path}.${key}`);
      }
      validateOptionalString(context, block, "icon", path);
      if (block.markerVariant !== undefined) {
        context.enum(block.markerVariant, `${path}.markerVariant`, [
          "standard",
          "category",
        ]);
      }
      if (block.markerTone !== undefined) {
        context.enum(block.markerTone, `${path}.markerTone`, ["default", "coral"]);
      }
      return;
    }
    case "prose": {
      const block = blockObject(
        context,
        value,
        path,
        ["style", "align", "width", "paragraphs"],
        ["paragraphs"]
      );
      if (!block) return;
      if (block.style !== undefined) {
        context.enum(block.style, `${path}.style`, [
          "body",
          "handwritten",
          "handwritten-cn",
        ]);
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
        .array(block.paragraphs, `${path}.paragraphs`, {
          minimum: 1,
          maximum: 100,
        })
        .forEach((paragraph, index) =>
          context.localized(paragraph, `${path}.paragraphs[${index}]`)
        );
      return;
    }
    case "gallery": {
      const block = blockObject(
        context,
        value,
        path,
        ["layout", "variant", "width", "images"],
        ["layout", "images"]
      );
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
      context
        .array(block.images, `${path}.images`, { minimum: 1, maximum: 50 })
        .forEach((image, index) => {
          const imagePath = `${path}.images[${index}]`;
          const item = context.object(
            image,
            imagePath,
            ["imageId", "alt", "caption", "shape", "tone", "tilt", "focus"],
            ["imageId"]
          );
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
            context.enum(item.tilt, `${imagePath}.tilt`, [
              "none",
              "left",
              "right",
            ]);
          }
          if (item.focus !== undefined) {
            context.enum(item.focus, `${imagePath}.focus`, ["center", "upper"]);
          }
        });
      return;
    }
    case "timeline": {
      const block = blockObject(context, value, path, ["items"], ["items"]);
      if (!block) return;
      const items = context.array(block.items, `${path}.items`, {
        minimum: 1,
        maximum: 100,
      });
      validateUniqueIds(context, items, `${path}.items`);
      items.forEach((item, index) => {
        const itemPath = `${path}.items[${index}]`;
        const row = context.object(item, itemPath, [
          "id",
          "time",
          "event",
          "detail",
        ]);
        if (!row) return;
        context.id(row.id, `${itemPath}.id`);
        for (const key of ["time", "event", "detail"]) {
          context.localized(row[key], `${itemPath}.${key}`);
        }
      });
      return;
    }
    case "route": {
      const block = blockObject(
        context,
        value,
        path,
        ["compact", "stops"],
        ["stops"]
      );
      if (!block) return;
      if (block.compact !== undefined) {
        context.boolean(block.compact, `${path}.compact`);
      }
      const stops = context.array(block.stops, `${path}.stops`, {
        minimum: 2,
        maximum: 100,
      });
      validateUniqueIds(context, stops, `${path}.stops`);
      stops.forEach((stop, index) => {
        const stopPath = `${path}.stops[${index}]`;
        const item = context.object(stop, stopPath, ["id", "icon", "label"]);
        if (!item) return;
        context.id(item.id, `${stopPath}.id`);
        context.string(item.icon, `${stopPath}.icon`);
        context.localized(item.label, `${stopPath}.label`);
      });
      return;
    }
    case "divider": {
      const block = blockObject(context, value, path, ["icon"], ["icon"]);
      if (block) context.string(block.icon, `${path}.icon`);
      return;
    }
    case "note": {
      const block = blockObject(
        context,
        value,
        path,
        ["variant", "title", "body"],
        ["title", "body"]
      );
      if (!block) return;
      if (block.variant !== undefined) {
        context.enum(block.variant, `${path}.variant`, ["note", "warning"]);
      }
      context.localized(block.title, `${path}.title`);
      context.localized(block.body, `${path}.body`);
      return;
    }
    case "highlight": {
      const block = blockObject(
        context,
        value,
        path,
        ["tone", "title", "body"],
        ["title", "body"]
      );
      if (!block) return;
      if (block.tone !== undefined) {
        context.enum(block.tone, `${path}.tone`, ["default", "warning"]);
      }
      context.localized(block.title, `${path}.title`);
      context.localized(block.body, `${path}.body`);
      return;
    }
    case "rating": {
      const block = blockObject(
        context,
        value,
        path,
        ["tone", "starStyle", "title", "items"],
        ["title", "items"]
      );
      if (!block) return;
      if (block.tone !== undefined) {
        context.enum(block.tone, `${path}.tone`, ["default", "warning"]);
      }
      if (block.starStyle !== undefined) {
        context.enum(block.starStyle, `${path}.starStyle`, ["solid", "emoji"]);
      }
      context.localized(block.title, `${path}.title`);
      const items = context.array(block.items, `${path}.items`, {
        minimum: 1,
        maximum: 100,
      });
      validateUniqueIds(context, items, `${path}.items`);
      items.forEach((item, index) => {
        const itemPath = `${path}.items[${index}]`;
        const row = context.object(
          item,
          itemPath,
          ["id", "name", "score", "comment"],
          ["id", "name", "comment"]
        );
        if (!row) return;
        context.id(row.id, `${itemPath}.id`);
        context.localized(row.name, `${itemPath}.name`);
        if (
          row.score !== undefined &&
          (!Number.isInteger(row.score) || row.score < 0 || row.score > 5)
        ) {
          context.issue(`${itemPath}.score`, "must be an integer from 0 to 5");
        }
        context.localized(row.comment, `${itemPath}.comment`);
      });
      return;
    }
    case "shopping": {
      const block = blockObject(
        context,
        value,
        path,
        ["pricePosition", "products"],
        ["products"]
      );
      if (!block) return;
      if (block.pricePosition !== undefined) {
        context.enum(block.pricePosition, `${path}.pricePosition`, [
          "before-detail",
          "after-detail",
        ]);
      }
      const products = context.array(block.products, `${path}.products`, {
        minimum: 1,
        maximum: 100,
      });
      validateUniqueIds(context, products, `${path}.products`);
      products.forEach((product, index) => {
        const itemPath = `${path}.products[${index}]`;
        const item = context.object(
          product,
          itemPath,
          ["id", "imageId", "name", "price", "detail"],
          ["id", "name", "price"]
        );
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
      const block = blockObject(
        context,
        value,
        path,
        ["title", "rows"],
        ["rows"]
      );
      if (!block) return;
      validateOptionalLocalized(context, block, "title", path);
      const rows = context.array(block.rows, `${path}.rows`, {
        minimum: 1,
        maximum: 100,
      });
      validateUniqueIds(context, rows, `${path}.rows`);
      rows.forEach((row, index) => {
        const rowPath = `${path}.rows[${index}]`;
        const item = context.object(
          row,
          rowPath,
          ["id", "label", "detail", "amount", "total"],
          ["id", "label", "amount"]
        );
        if (!item) return;
        context.id(item.id, `${rowPath}.id`);
        context.localized(item.label, `${rowPath}.label`);
        validateOptionalLocalized(context, item, "detail", rowPath);
        context.localized(item.amount, `${rowPath}.amount`);
        if (item.total !== undefined) {
          context.boolean(item.total, `${rowPath}.total`);
        }
      });
      return;
    }
    case "tags": {
      const block = blockObject(
        context,
        value,
        path,
        ["variant", "items"],
        ["items"]
      );
      if (!block) return;
      if (block.variant !== undefined) {
        context.enum(block.variant, `${path}.variant`, ["outlined", "colored"]);
      }
      const items = context.array(block.items, `${path}.items`, {
        minimum: 1,
        maximum: 100,
      });
      validateUniqueIds(context, items, `${path}.items`);
      items.forEach((item, index) => {
        const itemPath = `${path}.items[${index}]`;
        const tag = context.object(item, itemPath, ["id", "label", "tone"]);
        if (!tag) return;
        context.id(tag.id, `${itemPath}.id`);
        context.localized(tag.label, `${itemPath}.label`);
        context.enum(tag.tone, `${itemPath}.tone`, [
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
      const block = blockObject(
        context,
        value,
        path,
        ["flag", "title", "subtitle", "stamp"],
        ["title", "subtitle"]
      );
      if (!block) return;
      validateOptionalString(context, block, "flag", path);
      context.localized(block.title, `${path}.title`);
      context.localized(block.subtitle, `${path}.subtitle`);
      validateOptionalLocalized(context, block, "stamp", path);
      return;
    }
    case "stamp": {
      const block = blockObject(
        context,
        value,
        path,
        ["text", "tilt"],
        ["text"]
      );
      if (!block) return;
      context.localized(block.text, `${path}.text`);
      if (block.tilt !== undefined) {
        context.enum(block.tilt, `${path}.tilt`, ["left", "none"]);
      }
      return;
    }
    case "spacer":
      blockObject(context, value, path, [], []);
      return;
    default:
      context.issue(`${path}.type`, `unsupported block type "${String(value.type)}"`);
  }
}

export function validateTripDocument(value, options) {
  const context = new ValidationContext(options);
  const document = context.object(value, "$", [
    "version",
    "slug",
    "metadata",
    "images",
    "sections",
    "pages",
  ]);
  if (!document) return context.issues;

  if (document.version !== 1) {
    context.issue("$.version", `must be 1; received ${String(document.version)}`);
  }
  context.string(document.slug, "$.slug", {
    pattern: SLUG_PATTERN,
    maximum: 100,
  });

  const metadata = context.object(document.metadata, "$.metadata", [
    "date",
    "dateRange",
    "coverImageId",
    "title",
    "subtitle",
    "location",
    "private",
  ]);
  if (metadata) {
    context.string(metadata.date, "$.metadata.date", {
      pattern: ISO_DATE_PATTERN,
      maximum: 10,
    });
    context.string(metadata.dateRange, "$.metadata.dateRange");
    context.id(metadata.coverImageId, "$.metadata.coverImageId");
    context.localized(metadata.title, "$.metadata.title");
    context.localized(metadata.subtitle, "$.metadata.subtitle");
    context.localized(metadata.location, "$.metadata.location");
    context.boolean(metadata.private, "$.metadata.private");
  }

  const images = context.array(document.images, "$.images", {
    minimum: 1,
    maximum: 500,
  });
  const imageIds = validateUniqueIds(context, images, "$.images");
  images.forEach((image, index) => {
    const path = `$.images[${index}]`;
    const item = context.object(image, path, ["id", "filename", "alt"]);
    if (!item) return;
    context.id(item.id, `${path}.id`);
    context.string(item.filename, `${path}.filename`, {
      pattern: IMAGE_FILENAME_PATTERN,
      maximum: 180,
    });
    context.localized(item.alt, `${path}.alt`);
  });

  const referencedImageIds = new Set();
  if (metadata?.coverImageId !== undefined) {
    validateImageReference(
      context,
      metadata.coverImageId,
      "$.metadata.coverImageId",
      imageIds,
      referencedImageIds
    );
  }

  const sections = context.array(document.sections, "$.sections", {
    minimum: 1,
    maximum: 100,
  });
  const sectionIds = validateUniqueIds(context, sections, "$.sections");
  sections.forEach((section, index) => {
    const path = `$.sections[${index}]`;
    const item = context.object(
      section,
      path,
      ["id", "navigation"],
      ["id"]
    );
    if (!item) return;
    context.id(item.id, `${path}.id`);
    if (item.navigation !== undefined) {
      const navigation = context.object(
        item.navigation,
        `${path}.navigation`,
        ["marker", "label", "detail"]
      );
      if (navigation) {
        context.localized(navigation.marker, `${path}.navigation.marker`);
        context.localized(navigation.label, `${path}.navigation.label`);
        context.localized(navigation.detail, `${path}.navigation.detail`);
      }
    }
  });

  const pages = context.array(document.pages, "$.pages", {
    minimum: 1,
    maximum: 100,
  });
  validateUniqueIds(context, pages, "$.pages");
  const usedSectionIds = new Set();
  const blockIds = new Set();
  pages.forEach((page, pageIndex) => {
    const path = `$.pages[${pageIndex}]`;
    const item = context.object(
      page,
      path,
      ["id", "sectionId", "cardVariant", "blocks"],
      ["id", "sectionId", "blocks"]
    );
    if (!item) return;
    context.id(item.id, `${path}.id`);
    context.id(item.sectionId, `${path}.sectionId`);
    if (item.cardVariant !== undefined) {
      context.enum(item.cardVariant, `${path}.cardVariant`, [
        "default",
        "inset-cover",
      ]);
    }
    if (typeof item.sectionId === "string") {
      usedSectionIds.add(item.sectionId);
      if (!sectionIds.has(item.sectionId)) {
        context.issue(
          `${path}.sectionId`,
          `references unknown section "${item.sectionId}"`
        );
      }
    }
    const blocks = context.array(item.blocks, `${path}.blocks`, {
      minimum: 1,
      maximum: 100,
    });
    validateUniqueIds(context, blocks, `${path}.blocks`, blockIds);
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

export function parseTripDocument(value, options) {
  const issues = validateTripDocument(value, options);
  if (issues.length > 0) {
    throw new EditorApiError(
      422,
      "invalid_trip_document",
      "The trip document does not match the supported schema.",
      issues.slice(0, 100)
    );
  }
  return value;
}

export function assertDocumentSlug(document, slug) {
  if (document.slug !== slug) {
    throw new EditorApiError(
      409,
      "trip_slug_mismatch",
      "The document slug cannot be created, renamed, or changed."
    );
  }
}

export function isValidTripSlug(slug) {
  return typeof slug === "string" && slug.length <= 100 && SLUG_PATTERN.test(slug);
}
