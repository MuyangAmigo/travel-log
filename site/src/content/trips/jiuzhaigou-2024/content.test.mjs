import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { deriveTripEntrySections, parseTripDocument, tripDocumentToMeta } from "../../../lib/trip-document.ts";

const source = readFileSync(new URL("./content.json", import.meta.url), "utf8");
const document = parseTripDocument(JSON.parse(source));
const blocks = document.pages.flatMap((page) => page.blocks);

test("Jiuzhaigou keeps a non-repeating, people-free selection of 40 photos", () => {
  const selected = `
    6009 6012 6020 6022 6029 6039 6048 6051 6064 6067
    6073 6074 6078 6084 6089 6094 6103 6110 6119 6125
    6135 6151 6154 6168 6176 6184 6190 6192 6194 6197
    6205 6212 6216 6219 6221 6222 6226 6228 6232 6239
  `.trim().split(/\s+/).map((number) => `img-${number}`);
  const galleries = blocks.filter((block) => block.type === "gallery");
  const galleryPhotos = galleries.flatMap((block) => block.images.map((image) => image.imageId));
  assert.equal(document.images.length, 40);
  assert.equal(galleryPhotos.length, 40);
  assert.deepEqual(galleryPhotos, selected);
  assert.deepEqual(new Set(galleryPhotos), new Set(document.images.map((image) => image.id)));
  assert.equal(galleries.length, 20);
  assert.ok(galleries.every((gallery) =>
    gallery.layout === "two" &&
    gallery.images.length === 2 &&
    gallery.images.every((image) => image.shape === "square")
  ));
  assert.equal(document.metadata.coverImageId, "img-6205");
  assert.equal(document.images.find((image) => image.id === "img-6205").filename, "img_6205.webp");
  for (const image of document.images) {
    assert.match(image.filename, /\.webp$/);
    assert.equal(image.thumbnailFilename, image.filename.replace(/\.webp$/, "-square.webp"));
    assert.ok(image.alt.zh && image.alt.en);
  }
  for (const removed of ["performance-stage", "family-group", "lakeside-silhouette", "img-6010", "img-6011", "img-6077", "img-6187", "img-6188", "img-6201"]) {
    assert.ok(!galleryPhotos.includes(removed), removed);
  }
  assert.doesNotMatch(source, /自拍|合影|背影|portrait|selfie|silhouette/i);
});

test("Jiuzhaigou uses the private bilingual photo-story with chronological sections", () => {
  const meta = tripDocumentToMeta(document, (filename) => `test:${filename}`);
  assert.equal(document.slug, "jiuzhaigou-2024");
  assert.equal(meta.private, true);
  assert.equal(meta.style, "photo-story");
  assert.equal(meta.date, "2024-08-07");
  assert.deepEqual(document.pages[0].blocks[0].title, document.metadata.title);
  assert.equal(document.pages[0].blocks[0].backgroundImageId, "img-6205");
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
