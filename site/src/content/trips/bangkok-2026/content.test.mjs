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

test("preserves the complete bilingual Bangkok document and image set", () => {
  const source = readFileSync(new URL("./content.json", import.meta.url), "utf8");
  const document = parseTripDocument(JSON.parse(source));
  const references = referencedImageIds(document);

  assert.equal(document.pages.length, 11);
  assert.equal(document.sections.length, 11);
  assert.equal(document.images.length, 37);
  assert.equal(references.length, 38);
  assert.deepEqual(
    new Set(references),
    new Set(document.images.map((image) => image.id))
  );
  assert.equal(deriveTripEntrySections(document, "zh").length, 11);
  assert.equal(deriveTripEntrySections(document, "en").length, 11);
  assert.equal(document.metadata.private, true);
  assert.equal(
    document.images.find((image) => image.id === document.metadata.coverImageId)?.filename,
    "cover-2026-08.png"
  );

  const cover = document.pages[0].blocks[0];
  assert.equal(cover.type, "cover");
  assert.equal(cover.stamp?.text.zh, "THAILAND\n2026");
  assert.equal(cover.boxStamp?.en, "BOARDING PASS");

  const foodHeader = document.pages[9].blocks[0];
  assert.equal(foodHeader.type, "header");
  assert.equal(foodHeader.markerVariant, "category");
  assert.equal(foodHeader.markerTone, "coral");

  const watPaknamGallery = document.pages[4].blocks.find(
    (block) =>
      block.type === "gallery" &&
      block.images.some((image) => image.imageId === "img-1854")
  );
  assert.equal(watPaknamGallery?.type, "gallery");
  assert.equal(watPaknamGallery.images[0].focus, "upper");

  const duplicatePhotoAlts = document.pages
    .flatMap((page) => page.blocks)
    .filter((block) => block.type === "gallery")
    .flatMap((block) => block.images)
    .filter((image) => image.imageId === "img-1812")
    .map((image) => image.alt?.zh);
  assert.deepEqual(duplicatePhotoAlts, ["Basil squid", "Stir fry"]);

  assert.match(source, /¥ 20,548\.28/);
  assert.match(source, /星巴克百元咖啡杯事变/);
  assert.match(source, /hundred-yuan Starbucks cup incident/);
  assert.match(source, /878\.88 THB/);
});
