import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import {
  deriveTripEntrySections,
  parseTripDocument,
} from "../../../lib/trip-document.ts";

function referencedImageIds(document) {
  const references = [document.metadata.coverImageId];
  for (const page of document.pages) {
    for (const block of page.blocks) {
      if (block.type === "cover" && block.backgroundImageId) {
        references.push(block.backgroundImageId);
      } else if (block.type === "gallery") {
        references.push(...block.images.map((image) => image.imageId));
      } else if (block.type === "shopping") {
        references.push(
          ...block.products.flatMap((product) => product.imageId ? [product.imageId] : [])
        );
      }
    }
  }
  return references;
}

test("preserves the complete bilingual Tokyo document and image set", () => {
  const source = readFileSync(new URL("./content.json", import.meta.url), "utf8");
  const document = parseTripDocument(JSON.parse(source));
  const references = referencedImageIds(document);

  assert.equal(document.pages.length, 12);
  assert.equal(document.sections.length, 12);
  assert.equal(document.images.length, 44);
  assert.equal(references.length, 44);
  assert.deepEqual(
    new Set(references),
    new Set(document.images.map((image) => image.id))
  );
  assert.equal(deriveTripEntrySections(document, "zh").length, 12);
  assert.equal(deriveTripEntrySections(document, "en").length, 12);
  assert.equal(document.metadata.private, true);
  assert.equal(
    document.images.find((image) => image.id === document.metadata.coverImageId)?.filename,
    "cover-2026-08.png"
  );

  const cover = document.pages[0].blocks[0];
  assert.equal(cover.type, "cover");
  assert.equal(cover.stamp?.text.en, "JAPAN\n2025");
  assert.equal(cover.boxStamp?.zh, "BOARDING PASS");

  const shoppingHeader = document.pages[9].blocks[0];
  assert.equal(shoppingHeader.type, "header");
  assert.equal(shoppingHeader.markerVariant, "category");
  assert.equal(shoppingHeader.markerTone, "coral");

  assert.deepEqual(
    document.pages.map((page) => page.id),
    [
      "cover",
      "arrival",
      "kamakura-coast",
      "kamakura-evening",
      "shinjuku",
      "city-walk",
      "disneysea-day",
      "disneysea-night",
      "chanel-and-department-stores",
      "shopping-records",
      "shared-expenses",
      "closing",
    ]
  );

  assert.match(source, /¥ 43,675/);
  assert.match(source, /长谷寺顾着写御朱印/);
  assert.match(source, /classic travel-brain fail/);
  assert.match(source, /七宝挂件一个，1451 RMB/);
  assert.match(source, /10,760 JPY \/ person/);
});
