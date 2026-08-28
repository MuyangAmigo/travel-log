import type {
  LocalizedText,
  TripBlock,
  TripDocument,
  TripDocumentPage,
  TripImageAsset,
} from "./trip-document";

export const EDITOR_DRAFT_STORAGE_PREFIX = "travel-log-editor-draft:";

export type StoredEditorDraft = {
  baseSha: string;
  baseBlobSha: string;
  document: TripDocument;
  savedAt: number;
};

export type EditorDraftRecovery = {
  document: TripDocument;
  savedAt: number;
  status: "safe" | "conflict";
};

type LocalizedField = {
  path: string;
  value: LocalizedText;
};

function localized(zh: string, en = ""): LocalizedText {
  return { zh, en };
}

export function cloneDocument(document: TripDocument): TripDocument {
  return structuredClone(document);
}

export function createEditorId(prefix: string): string {
  const random = crypto.randomUUID().replaceAll("-", "").slice(0, 8);
  return `${prefix}-${Date.now().toString(36)}-${random}`;
}

export function moveItem<T>(items: readonly T[], from: number, to: number): T[] {
  if (
    from === to ||
    from < 0 ||
    to < 0 ||
    from >= items.length ||
    to >= items.length
  ) {
    return [...items];
  }
  const next = [...items];
  const [item] = next.splice(from, 1);
  next.splice(to, 0, item);
  return next;
}

function collectLocalizedFields(value: unknown): LocalizedField[] {
  const fields: LocalizedField[] = [];

  function visit(current: unknown, path: string) {
    if (
      typeof current === "object" &&
      current !== null &&
      !Array.isArray(current) &&
      Object.keys(current).length === 2 &&
      typeof (current as Record<string, unknown>).zh === "string" &&
      typeof (current as Record<string, unknown>).en === "string"
    ) {
      fields.push({ path, value: current as LocalizedText });
      return;
    }
    if (Array.isArray(current)) {
      current.forEach((item, index) => {
        const id =
          typeof item === "object" &&
          item !== null &&
          typeof (item as Record<string, unknown>).id === "string"
            ? `[id=${String((item as Record<string, unknown>).id)}]`
            : `[${index}]`;
        visit(item, `${path}${id}`);
      });
      return;
    }
    if (typeof current !== "object" || current === null) return;
    for (const [key, child] of Object.entries(current)) {
      visit(child, `${path}.${key}`);
    }
  }

  visit(value, "$");
  return fields;
}

export function collectChangedLocalizedPaths(
  original: TripDocument,
  draft: TripDocument
): string[] {
  const originalFields = new Map(
    collectLocalizedFields(original).map((field) => [field.path, field.value])
  );
  return collectLocalizedFields(draft)
    .filter(({ path, value }) => {
      const previous = originalFields.get(path);
      return !previous || previous.zh !== value.zh || value.en.trim() === "";
    })
    .map(({ path }) => path);
}

function reidentifyBlock(block: TripBlock): TripBlock {
  const next = structuredClone(block);
  next.id = createEditorId(next.type);
  switch (next.type) {
    case "timeline":
      next.items.forEach((item) => {
        item.id = createEditorId("timeline-item");
      });
      break;
    case "route":
      next.stops.forEach((stop) => {
        stop.id = createEditorId("route-stop");
      });
      break;
    case "rating":
      next.items.forEach((item) => {
        item.id = createEditorId("rating-item");
      });
      break;
    case "shopping":
      next.products.forEach((product) => {
        product.id = createEditorId("product");
      });
      break;
    case "expense":
      next.rows.forEach((row) => {
        row.id = createEditorId("expense-row");
      });
      break;
    case "tags":
      next.items.forEach((item) => {
        item.id = createEditorId("tag");
      });
      break;
  }
  return next;
}

export function duplicateBlock(block: TripBlock): TripBlock {
  return reidentifyBlock(block);
}

export function duplicatePage(page: TripDocumentPage): TripDocumentPage {
  return {
    ...structuredClone(page),
    id: createEditorId("page"),
    blocks: page.blocks.map(reidentifyBlock),
  };
}

export function createBlock(
  type: TripBlock["type"],
  fallbackImageId: string
): TripBlock {
  const id = createEditorId(type);
  switch (type) {
    case "cover":
      return {
        id,
        type,
        eyebrow: localized("旅行日记"),
        title: localized("新的旅程"),
        subtitle: localized("写下这一页的副标题"),
        date: localized("日期"),
        intro: localized("从这里开始记录。"),
        separators: true,
      };
    case "header":
      return {
        id,
        type,
        markerLabel: localized("DAY"),
        markerValue: localized("1"),
        title: localized("新的一天"),
        subtitle: localized("这一页的行程"),
        icon: "☀️",
      };
    case "prose":
      return {
        id,
        type,
        paragraphs: [localized("在这里写下旅途中的故事。")],
      };
    case "gallery":
      return {
        id,
        type,
        layout: "one",
        images: [{ imageId: fallbackImageId }],
      };
    case "timeline":
      return {
        id,
        type,
        items: [
          {
            id: createEditorId("timeline-item"),
            time: localized("09:00"),
            event: localized("新的行程"),
            detail: localized("补充细节"),
          },
        ],
      };
    case "route":
      return {
        id,
        type,
        stops: [
          {
            id: createEditorId("route-stop"),
            icon: "📍",
            label: localized("起点"),
          },
          {
            id: createEditorId("route-stop"),
            icon: "✨",
            label: localized("终点"),
          },
        ],
      };
    case "divider":
      return { id, type, icon: "✦" };
    case "note":
      return {
        id,
        type,
        title: localized("随手记"),
        body: localized("写下一条值得记住的提示。"),
      };
    case "highlight":
      return {
        id,
        type,
        title: localized("今日亮点"),
        body: localized("记录最喜欢的瞬间。"),
      };
    case "rating":
      return {
        id,
        type,
        title: localized("体验评分"),
        items: [
          {
            id: createEditorId("rating-item"),
            name: localized("体验"),
            score: 5,
            comment: localized("写下真实感受。"),
          },
        ],
      };
    case "shopping":
      return {
        id,
        type,
        products: [
          {
            id: createEditorId("product"),
            name: localized("旅行纪念"),
            price: localized("¥0"),
            detail: localized("购买记录"),
          },
        ],
      };
    case "expense":
      return {
        id,
        type,
        title: localized("花费小结"),
        rows: [
          {
            id: createEditorId("expense-row"),
            label: localized("项目"),
            amount: localized("¥0"),
          },
        ],
      };
    case "tags":
      return {
        id,
        type,
        items: [
          {
            id: createEditorId("tag"),
            label: localized("旅行"),
            tone: "red",
          },
        ],
      };
    case "ending":
      return {
        id,
        type,
        flag: "✨",
        title: localized("旅程未完待续"),
        subtitle: localized("下一站见"),
      };
    case "stamp":
      return { id, type, text: localized("珍藏这一刻") };
    case "spacer":
      return { id, type };
  }
}

export function createPage(
  sectionId: string,
  fallbackImageId: string
): TripDocumentPage {
  return {
    id: createEditorId("page"),
    sectionId,
    blocks: [createBlock("header", fallbackImageId)],
  };
}

export function addUploadedImage(
  document: TripDocument,
  pageId: string,
  image: TripImageAsset
): TripDocument {
  const next = cloneDocument(document);
  if (
    next.images.some(
      (candidate) =>
        candidate.id === image.id || candidate.filename === image.filename
    )
  ) {
    throw new Error("这张图片已经在当前旅程中。");
  }
  const page = next.pages.find((candidate) => candidate.id === pageId);
  if (!page) throw new Error("请选择一个页面后再上传图片。");
  next.images.push(image);
  page.blocks.push({
    id: createEditorId("gallery"),
    type: "gallery",
    layout: "one",
    images: [{ imageId: image.id }],
  });
  return next;
}

export function referencedImageIds(document: TripDocument): Set<string> {
  const references = new Set<string>([document.metadata.coverImageId]);
  for (const page of document.pages) {
    for (const block of page.blocks) {
      if (block.type === "cover" && block.backgroundImageId) {
        references.add(block.backgroundImageId);
      } else if (block.type === "gallery") {
        block.images.forEach((image) => references.add(image.imageId));
      } else if (block.type === "shopping") {
        block.products.forEach((product) => {
          if (product.imageId) references.add(product.imageId);
        });
      }
    }
  }
  return references;
}

export function detachImage(
  document: TripDocument,
  imageId: string
): TripDocument {
  if (document.images.length === 1) {
    throw new Error("旅程必须保留至少一张图片。");
  }
  if (!document.images.some((image) => image.id === imageId)) {
    return cloneDocument(document);
  }

  const next = cloneDocument(document);
  next.images = next.images.filter((image) => image.id !== imageId);
  if (next.metadata.coverImageId === imageId) {
    next.metadata.coverImageId = next.images[0].id;
  }

  next.pages.forEach((page) => {
    const retained: TripBlock[] = [];
    page.blocks.forEach((block) => {
      if (block.type === "cover" && block.backgroundImageId === imageId) {
        const { backgroundImageId: _removed, ...withoutBackground } = block;
        retained.push(withoutBackground);
      } else if (block.type === "gallery") {
        const images = block.images.filter((image) => image.imageId !== imageId);
        if (images.length > 0) retained.push({ ...block, images });
      } else if (block.type === "shopping") {
        retained.push({
          ...block,
          products: block.products.map((product) => {
            if (product.imageId !== imageId) return product;
            const { imageId: _removed, ...withoutImage } = product;
            return withoutImage;
          }),
        });
      } else {
        retained.push(block);
      }
    });
    page.blocks =
      retained.length > 0
        ? retained
        : [{ id: createEditorId("spacer"), type: "spacer" }];
  });
  return next;
}

export function editorDraftStorageKey(slug: string): string {
  return `${EDITOR_DRAFT_STORAGE_PREFIX}${slug}`;
}

export function parseStoredEditorDraft(
  value: string | null,
  slug: string
): StoredEditorDraft | null {
  if (!value) return null;
  try {
    const draft = JSON.parse(value) as Partial<StoredEditorDraft>;
    if (
      typeof draft.baseSha !== "string" ||
      typeof draft.baseBlobSha !== "string" ||
      typeof draft.savedAt !== "number" ||
      typeof draft.document !== "object" ||
      draft.document === null ||
      draft.document.version !== 1 ||
      draft.document.slug !== slug
    ) {
      return null;
    }
    return draft as StoredEditorDraft;
  } catch {
    return null;
  }
}

export function getEditorDraftRecovery(
  stored: StoredEditorDraft | null,
  loadedDocument: TripDocument,
  loadedBlobSha: string
): EditorDraftRecovery | null {
  if (
    !stored ||
    JSON.stringify(stored.document) === JSON.stringify(loadedDocument)
  ) {
    return null;
  }
  return {
    document: stored.document,
    savedAt: stored.savedAt,
    status: stored.baseBlobSha === loadedBlobSha ? "safe" : "conflict",
  };
}

export function isEditorOperationCurrent(
  slug: string,
  revision: number,
  currentDocument: TripDocument | null,
  currentRevision: number
): boolean {
  return (
    currentDocument?.slug === slug &&
    currentRevision === revision
  );
}
