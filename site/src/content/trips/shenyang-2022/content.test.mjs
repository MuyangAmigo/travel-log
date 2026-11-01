import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import {
  deriveTripEntrySections,
  parseTripDocument,
  tripDocumentToMeta,
} from "../../../lib/trip-document.ts";

const source = readFileSync(new URL("./content.json", import.meta.url), "utf8");
const document = parseTripDocument(JSON.parse(source));
const blocks = document.pages.flatMap((page) => page.blocks);
const galleries = blocks.filter((block) => block.type === "gallery");
const tripDirectory = dirname(fileURLToPath(import.meta.url));
const hash = (value) => createHash("sha256").update(value).digest("hex");

test("Shenyang keeps the approved private bilingual identity, dates and courtyard cover", () => {
  assert.equal(document.slug, "shenyang-2022");
  assert.equal(document.metadata.date, "2022-10-03");
  assert.equal(document.metadata.dateRange, "2022.10.03 — 10.05");
  assert.equal(document.metadata.private, true);
  assert.equal(document.metadata.style, "photo-story");
  assert.deepEqual(document.metadata.title, {
    zh: "沈阳，把秋天留在红墙与大舞台",
    en: "Shenyang, Between Red Walls and the Grand Stage",
  });
  assert.deepEqual(blocks[0].title, document.metadata.title);
  assert.equal(blocks[0].backgroundImageId, "p-ff0819f09e227fa8");
  const meta = tripDocumentToMeta(document, (filename) => `test:${filename}`);
  assert.equal(meta.private, true);
  assert.equal(meta.coverImage, "test:p-ff0819f09e227fa8.webp");
  assert.deepEqual(document.sections.map((section) => section.id),
    ["overview", "day-1", "day-2", "day-3", "home"]);
  for (const locale of ["zh", "en"]) {
    assert.equal(deriveTripEntrySections(document, locale).length, 5);
    assert.match(readFileSync(new URL(`./${locale}.tsx`, import.meta.url), "utf8"),
      new RegExp(`createTripLocale\\(document, "${locale}", img\\)`));
  }
});

test("all 48 approved photos retain exact bilingual group order and complete compositions", () => {
  const rows = galleries.map((gallery) => gallery.images.map((image) => image.imageId));
  assert.equal(hash(JSON.stringify(rows)),
    "3ee2c8ba0905110f218a1703ae6ac128cdd59ac3a3d7d894441db0e5d174e59f");
  assert.deepEqual(document.images.map((image) => image.id), rows.flat());
  assert.equal(new Set(rows.flat()).size, 48);
  assert.equal(galleries.length, 29);
  assert.deepEqual(["one", "two", "three", "four"].map((layout) =>
    galleries.filter((gallery) => gallery.layout === layout).length), [13, 14, 1, 1]);
  for (const gallery of galleries) {
    assert.ok(gallery.images.every((image) => image.caption.zh && image.caption.en));
    assert.equal(new Set(gallery.images.map((image) => image.shape)).size, 1);
    if (gallery.layout === "one") assert.equal(gallery.images[0].shape, undefined);
  }
  assert.ok(document.images.every((image) =>
    image.filename === `${image.id}.webp` && image.width > 0 && image.height > 0
    && image.alt.zh && image.alt.en));
  const dayImages = (id) => document.pages.filter((page) => page.sectionId === id)
    .flatMap((page) => page.blocks).filter((block) => block.type === "gallery")
    .flatMap((gallery) => gallery.images);
  assert.deepEqual(["day-1", "day-2", "day-3"].map((id) => dayImages(id).length),
    [3, 39, 6]);
  assert.doesNotMatch(source, /(?:p-9b867a005ff5b098|p-abc4106ab93150db|\/Users\/|GPS|DateTimeOriginal|blob\.core|localhost)/);
});

test("the approved Chinese prose and unresolved meal remain intact with aligned English", () => {
  const paragraphs = [
    blocks[0].intro.zh,
    ...blocks.filter((block) => block.type === "prose")
      .flatMap((block) => block.paragraphs.map((paragraph) => paragraph.zh)),
  ];
  assert.equal(paragraphs.length, 33);
  assert.equal(hash(paragraphs.join("\n\n")),
    "6f4078cd7cd4c11e2f0b85ebde0928e508d4236ad950bec471424927e03a5f40");
  const story = (id, locale) => blocks.find((block) => block.id === id).paragraphs[0][locale];
  assert.match(story("last-table-review-story", "zh"), /麦当劳/);
  assert.match(story("last-table-review-story", "en"), /unconfirmed.*McDonald's.*13:45.*14:02/s);
  assert.match(story("stage-exterior-story", "en"), /19:00.*RMB 380.*not confirmation/s);
  assert.match(story("arrival-dumplings-story", "en"), /did not happen/);
  assert.match(story("last-hotel-story", "en"), /Museum did not happen/);
  assert.match(story("hotel-drink-story", "en"), /bottled drink/);
  assert.ok(blocks.filter((block) => block.type === "prose")
    .every((block) => block.paragraphs.every((paragraph) => paragraph.zh && paragraph.en)));
});

test("Shenyang explicitly opts into shared reading axes and contained symmetric groups", () => {
  const css = readFileSync(resolve(tripDirectory, "../../../components/TripPresentation.module.css"), "utf8");
  const selector = '.presentation[data-trip-style="photo-story"]:has(:global([data-trip-document="shenyang-2022"]))';
  const scope = css.slice(css.indexOf(`${selector} {`), css.indexOf(
    '.presentation[data-trip-style="photo-story"]:has(:global([data-trip-document="beijing-winter-awakening-2022"])) {'));
  assert.match(css, /\[data-trip-style="photo-story"\]:has\([^{}]*\[data-trip-document="shenyang-2022"\]/);
  assert.match(scope, /object-fit: contain/);
  assert.match(scope, /height: auto/);
  assert.match(scope, /aspect-ratio: 3 \/ 4/);
  assert.match(scope, /aspect-ratio: 4 \/ 3/);
  assert.match(scope, /aspect-ratio: 16 \/ 9/);
  assert.match(scope, /\.pgrid\.g4[\s\S]*grid-template-columns: repeat\(2, minmax\(0, 1fr\)\)/);
  assert.match(scope, /@media \(max-width: 480px\)/);
  assert.match(scope, /grid-template-columns: 1fr/);
  const registry = readFileSync(resolve(tripDirectory, "../../../lib/trips.ts"), "utf8");
  assert.match(registry, /import \{ meta as shenyang2022Meta \} from "@\/content\/trips\/shenyang-2022\/meta"/);
  assert.match(registry, /\n  shenyang2022Meta,/);
  assert.match(registry, /"shenyang-2022": "2026-11-01T18:09:54\+08:00"/);
});
