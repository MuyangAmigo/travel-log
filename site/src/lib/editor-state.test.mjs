import assert from "node:assert/strict";
import test from "node:test";
import {
  addUploadedImage,
  collectChangedLocalizedPaths,
  detachImage,
  duplicatePage,
  getEditorDraftRecovery,
  isEditorOperationCurrent,
  parseStoredEditorDraft,
  referencedImageIds,
} from "./editor-state.ts";

function documentFixture() {
  return {
    version: 1,
    slug: "existing-trip",
    metadata: {
      date: "2026-08-26",
      dateRange: "2026.08.26",
      coverImageId: "cover",
      title: { zh: "测试旅行", en: "Test Trip" },
      subtitle: { zh: "副标题", en: "Subtitle" },
      location: { zh: "测试地", en: "Testville" },
      private: false,
    },
    images: [
      { id: "cover", filename: "cover.jpg", alt: { zh: "封面", en: "Cover" } },
      { id: "detail", filename: "detail.jpg", alt: { zh: "细节", en: "Detail" } },
    ],
    sections: [{ id: "overview" }, { id: "day-one" }],
    pages: [
      {
        id: "cover-page",
        sectionId: "overview",
        blocks: [
          {
            id: "cover-block",
            type: "cover",
            eyebrow: { zh: "旅行日记", en: "Travel Journal" },
            title: { zh: "慢慢走", en: "Take It Slow" },
            subtitle: { zh: "测试之旅", en: "A Test Journey" },
            date: { zh: "2026.08.26", en: "2026.08.26" },
            intro: { zh: "这是一次测试。", en: "This is a test." },
            backgroundImageId: "cover",
          },
        ],
      },
      {
        id: "day-page",
        sectionId: "day-one",
        blocks: [
          {
            id: "gallery-block",
            type: "gallery",
            layout: "two",
            images: [{ imageId: "cover" }, { imageId: "detail" }],
          },
          {
            id: "shop-block",
            type: "shopping",
            products: [
              {
                id: "product-one",
                imageId: "detail",
                name: { zh: "纪念品", en: "Souvenir" },
                price: { zh: "¥20", en: "¥20" },
              },
            ],
          },
        ],
      },
    ],
  };
}

test("collects only changed and newly-empty English fields by stable ID path", () => {
  const original = documentFixture();
  const draft = structuredClone(original);
  draft.pages.reverse();
  draft.metadata.title.zh = "新的标题";
  draft.pages[0].blocks[1].products[0].name.zh = "新纪念品";
  draft.pages[0].blocks[1].products[0].name.en = "";

  assert.deepEqual(collectChangedLocalizedPaths(original, draft), [
    "$.metadata.title",
    "$.pages[id=day-page].blocks[id=shop-block].products[id=product-one].name",
  ]);
});

test("duplicates pages with fresh page, block, and nested item IDs", () => {
  const page = documentFixture().pages[1];
  const duplicate = duplicatePage(page);

  assert.notEqual(duplicate.id, page.id);
  assert.notEqual(duplicate.blocks[0].id, page.blocks[0].id);
  assert.notEqual(duplicate.blocks[1].id, page.blocks[1].id);
  assert.notEqual(
    duplicate.blocks[1].products[0].id,
    page.blocks[1].products[0].id
  );
  assert.equal(duplicate.blocks[0].images[0].imageId, "cover");
});

test("detaches an image from the document without deleting unrelated content", () => {
  const detached = detachImage(documentFixture(), "detail");

  assert.deepEqual(
    detached.images.map((image) => image.id),
    ["cover"]
  );
  assert.deepEqual(
    detached.pages[1].blocks[0].images.map((image) => image.imageId),
    ["cover"]
  );
  assert.equal(detached.pages[1].blocks[1].products[0].imageId, undefined);
  assert.equal(detached.metadata.coverImageId, "cover");
});

test("adds an uploaded image as a referenced gallery on the selected page", () => {
  const document = documentFixture();
  const added = addUploadedImage(document, "day-page", {
    id: "new-image",
    filename: "new-image.webp",
    alt: { zh: "新图片", en: "" },
  });

  assert.equal(added.images.at(-1).filename, "new-image.webp");
  assert.equal(referencedImageIds(added).has("new-image"), true);
  assert.equal(added.pages[1].blocks.at(-1).type, "gallery");
  assert.equal(document.images.length, 2, "the source document stays immutable");
});

test("recovers only drafts for the requested existing slug", () => {
  const stored = JSON.stringify({
    baseSha: "1".repeat(40),
    baseBlobSha: "2".repeat(40),
    document: documentFixture(),
    savedAt: 123,
  });

  assert.equal(parseStoredEditorDraft(stored, "existing-trip")?.savedAt, 123);
  assert.equal(parseStoredEditorDraft(stored, "other-trip"), null);
  assert.equal(parseStoredEditorDraft("{", "existing-trip"), null);
});

test("keeps drafts recoverable when only the repository head changes", () => {
  const document = documentFixture();
  const draft = {
    baseSha: "1".repeat(40),
    baseBlobSha: "2".repeat(40),
    document: structuredClone(document),
    savedAt: 123,
  };
  draft.document.metadata.title.zh = "尚未发布的标题";

  assert.equal(
    getEditorDraftRecovery(draft, document, "2".repeat(40))?.status,
    "safe"
  );
  assert.equal(
    getEditorDraftRecovery(draft, document, "3".repeat(40))?.status,
    "conflict"
  );
});

test("rejects stale full-document operation responses", () => {
  const document = documentFixture();
  assert.equal(isEditorOperationCurrent("existing-trip", 4, document, 4), true);
  assert.equal(isEditorOperationCurrent("other-trip", 4, document, 4), false);
  assert.equal(isEditorOperationCurrent("existing-trip", 4, document, 5), false);
});
