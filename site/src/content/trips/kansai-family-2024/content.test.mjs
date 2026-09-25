import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { deriveTripEntrySections, parseTripDocument, tripDocumentToMeta } from "../../../lib/trip-document.ts";

const source = readFileSync(new URL("./content.json", import.meta.url), "utf8");
const document = parseTripDocument(JSON.parse(source));
const blocks = document.pages.flatMap((page) => page.blocks);
const galleries = blocks.filter((block) => block.type === "gallery");
const photoIds = galleries.flatMap((block) => block.images.map((image) => image.imageId));

test("private Kansai family trip has matching bilingual titles, cover and six dated chapters", () => {
  assert.equal(document.slug, "kansai-family-2024");
  assert.equal(document.metadata.date, "2024-11-10");
  assert.equal(document.metadata.dateRange, "2024.11.10 — 11.15");
  assert.equal(document.metadata.private, true);
  assert.equal(document.metadata.style, "photo-story");
  assert.equal(document.metadata.coverImageId, "p9402");
  assert.deepEqual(blocks[0].title, document.metadata.title);
  assert.equal(blocks[0].backgroundImageId, document.metadata.coverImageId);
  assert.deepEqual(document.sections.map((section) => section.id), [
    "overview", "day-1", "day-2", "day-3", "day-4", "day-5", "day-6", "spending",
  ]);
  for (const locale of ["zh", "en"]) {
    assert.equal(deriveTripEntrySections(document, locale).length, 8);
    assert.match(readFileSync(new URL(`./${locale}.tsx`, import.meta.url), "utf8"),
      new RegExp(`createTripLocale\\(document, "${locale}", img\\)`));
  }
  const meta = tripDocumentToMeta(document, (filename) => `test:${filename}`);
  assert.equal(meta.private, true);
  assert.equal(meta.coverImage, "test:p9402.webp");
  assert.equal(meta.title.en, "Kansai Family Trip — Osaka, Nara, Kyoto & Uji");
});

test("all 80 curated, metadata-stripped photos are in the shared bilingual reading flow", () => {
  assert.equal(document.images.length, 80);
  assert.equal(photoIds.length, 80);
  assert.equal(new Set(photoIds).size, 80);
  assert.deepEqual(new Set(photoIds), new Set(document.images.map((image) => image.id)));
  assert.ok(document.images.every((image) => /^p\d{4}\.webp$/.test(image.filename)
    && image.alt.zh && image.alt.en));
  assert.ok(galleries.every((gallery) => gallery.images.every((image) => image.caption.zh && image.caption.en)));
  assert.ok(galleries.filter((gallery) => gallery.layout === "one")
    .every((gallery) => gallery.images.every((image) => image.shape === undefined)));
  assert.doesNotMatch(source, /(?:GPS|\/Users\/|blob\.core|IMG_\d+|FullSizeRender)/);
});

test("six days retain source details, spending and corrected Fushimi-to-Uji order", () => {
  assert.deepEqual(document.pages.filter((page) => page.blocks[0]?.type === "header")
    .map((page) => page.sectionId), [
    "day-1", "day-2", "day-3", "day-4", "day-5", "day-6",
  ]);
  for (const day of [1, 2, 3, 4, 5, 6]) {
    assert.ok(document.pages.some((page) => page.sectionId === `day-${day}`
      && page.blocks.some((block) => block.type === "gallery")));
  }
  const fifth = document.pages.filter((page) => page.sectionId === "day-5")
    .flatMap((page) => page.blocks).filter((block) => block.type === "prose")
    .flatMap((block) => block.paragraphs);
  const chinese = fifth.map((paragraph) => paragraph.zh).join(" ");
  const english = fifth.map((paragraph) => paragraph.en).join(" ");
  assert.ok(chinese.indexOf("先到伏见稻荷") < chinese.indexOf("再坐 JR 奈良线前往宇治"));
  assert.ok(english.indexOf("Fushimi Inari Taisha first") < english.indexOf("continued to Uji"));
  for (const detail of ["钱包", "若草山", "US Keyboard", "Mikimoto", "7mm", "19,000", "11,000", "15,000", "96,000", "90,000", "27,000", "80,000", "60,000", "Haruka", "Lelabo", "500", "2,200", "150", "13,000"]) {
    assert.ok(source.includes(detail), detail);
  }
  assert.match(source, /只看看，没有买/);
  assert.match(source, /disappointing train bento/);
  assert.match(source, /only average/);
  const expense = blocks.find((block) => block.type === "expense");
  assert.equal(expense.rows.length, 25);
  assert.match(expense.title.en, /not a trip total/);
  assert.ok(expense.rows.every((row) => row.amount.zh.includes("JPY") && row.amount.en.includes("JPY")));
  const css = readFileSync(resolve(dirname(fileURLToPath(import.meta.url)), "../../../components/TripPresentation.module.css"), "utf8");
  assert.match(css, /\[data-trip-style="photo-story"\]:has\([^{}]*\[data-trip-document="kansai-family-2024"\]/);
});
