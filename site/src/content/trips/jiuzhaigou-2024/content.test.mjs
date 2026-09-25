import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { deriveTripEntrySections, parseTripDocument, tripDocumentToMeta } from "../../../lib/trip-document.ts";

const source = readFileSync(new URL("./content.json", import.meta.url), "utf8");
const document = parseTripDocument(JSON.parse(source));
const blocks = document.pages.flatMap((page) => page.blocks);

test("Jiuzhaigou includes each of the 175 supplied stills exactly once in both locales", () => {
  const galleryPhotos = blocks.filter((block) => block.type === "gallery")
    .flatMap((block) => block.images.map((image) => image.imageId));
  assert.equal(document.images.length, 175);
  assert.equal(galleryPhotos.length, 175);
  assert.deepEqual(new Set(galleryPhotos), new Set(document.images.map((image) => image.id)));
  assert.equal(document.metadata.coverImageId, "img-6184");
  assert.equal(document.images.find((image) => image.id === "img-6184").filename, "img_6184.webp");
  for (const image of document.images) {
    assert.match(image.filename, /\.webp$/);
    assert.equal(image.thumbnailFilename, image.filename.replace(/\.webp$/, "-thumb.webp"));
    assert.ok(image.alt.zh && image.alt.en);
  }
});

test("Jiuzhaigou uses the private bilingual photo-story with chronological sections", () => {
  const meta = tripDocumentToMeta(document, (filename) => `test:${filename}`);
  assert.equal(document.slug, "jiuzhaigou-2024");
  assert.equal(meta.private, true);
  assert.equal(meta.style, "photo-story");
  assert.equal(meta.date, "2024-08-07");
  assert.deepEqual(document.pages[0].blocks[0].title, document.metadata.title);
  assert.equal(document.pages[0].blocks[0].backgroundImageId, "img-6184");
  assert.equal(document.pages.length, 15);
  assert.deepEqual(document.sections.map((section) => section.id), [
    "cover", "arrival", "huanglong", "evening", "jiuzhai-woods", "jiuzhai-falls",
    "jiuzhai-blue", "jiuzhai-night", "last-morning", "departure", "expenses",
  ]);
  assert.ok(blocks.some((block) => block.type === "note" && block.body.zh.includes("返程")));
  assert.ok(blocks.some((block) => block.type === "expense" && block.rows.length === 9));
  for (const locale of ["zh", "en"]) {
    assert.equal(deriveTripEntrySections(document, locale).length, 11);
    assert.match(readFileSync(new URL(`./${locale}.tsx`, import.meta.url), "utf8"),
      new RegExp(`createTripLocale\\(document, "${locale}", img\\)`));
  }
  assert.doesNotMatch(source, /\/Users\/|GPS|localhost|blob\.core/);
});
