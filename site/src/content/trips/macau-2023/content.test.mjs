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
const approvedRows = [
  ["m001"], ["m004"], ["m006"], ["m007", "m017"], ["m011", "m013"],
  ["m019", "m020"], ["m022", "m026"], ["m029"], ["m028", "m032"],
  ["m035", "m036"], ["m039", "m040"], ["m041", "m042"], ["m044", "m045"],
  ["m046"], ["m048", "m049"], ["m054", "m055"], ["m066"], ["m067"], ["m069"],
];
const approvedIds = approvedRows.flat();

test("Macau uses the approved private bilingual identity, corrected 2023 dates and scene cover", () => {
  assert.equal(document.slug, "macau-2023");
  assert.equal(document.metadata.date, "2023-02-10");
  assert.equal(document.metadata.dateRange, "2023.02.10 — 02.12");
  assert.equal(document.metadata.private, true);
  assert.equal(document.metadata.style, "photo-story");
  assert.deepEqual(document.metadata.title, {
    zh: "澳门，拎着购物袋逛小巷",
    en: "Macau, Side Streets and Shopping Bags",
  });
  assert.deepEqual(blocks[0].title, document.metadata.title);
  assert.equal(blocks[0].backgroundImageId, "m017");
  const meta = tripDocumentToMeta(document, (filename) => `test:${filename}`);
  assert.equal(meta.private, true);
  assert.equal(meta.coverImage, "test:m017.webp");
  assert.deepEqual(document.sections.map((section) => section.id), [
    "overview", "arrival", "taipa", "peninsula", "home", "spending",
  ]);
  for (const locale of ["zh", "en"]) {
    assert.equal(deriveTripEntrySections(document, locale).length, 6);
    assert.match(readFileSync(new URL(`./${locale}.tsx`, import.meta.url), "utf8"),
      new RegExp(`createTripLocale\\(document, "${locale}", img\\)`));
  }
});

test("all 30 approved unique photos stay in the shared bilingual flow as 11 pairs and eight singles", () => {
  assert.deepEqual(document.images.map((image) => image.id), approvedIds);
  assert.deepEqual(galleries.map((gallery) => gallery.images.map((image) => image.imageId)), approvedRows);
  assert.equal(new Set(approvedIds).size, 30);
  assert.equal(galleries.filter((gallery) => gallery.layout === "two").length, 11);
  assert.equal(galleries.filter((gallery) => gallery.layout === "one").length, 8);
  assert.ok(document.images.every((image) =>
    image.filename === `${image.id}.webp` && image.width > 0 && image.height > 0
    && image.alt.zh && image.alt.en));
  for (const gallery of galleries) {
    assert.equal(gallery.images.length, gallery.layout === "one" ? 1 : 2);
    const caption = gallery.layout === "two" ? gallery.caption : gallery.images[0].caption;
    assert.ok(caption.zh && caption.en);
    if (gallery.layout === "two") {
      assert.ok(gallery.images.every((image) => image.caption === undefined));
      assert.equal(gallery.images[0].shape, gallery.images[1].shape);
    } else {
      assert.equal(gallery.images[0].shape, undefined);
    }
  }
  assert.ok(galleries.find((gallery) => gallery.id === "r11").images.every((image) => image.shape === "portrait"));
  assert.ok(["r05", "r10", "r16"].every((id) =>
    galleries.find((gallery) => gallery.id === id).images.every((image) => image.shape === undefined)));
  assert.doesNotMatch(source, /(?:m060|m068|\/Users\/|GPS|DateTimeOriginal|IMG_\d+|blob\.core|localhost)/);
});

test("the approved Chinese story remains verbatim and ordered across cover and chapters", () => {
  const paragraphs = [
    blocks[0].intro.zh,
    ...blocks.filter((block) => block.type === "prose")
      .flatMap((block) => block.paragraphs.map((paragraph) => paragraph.zh)),
  ];
  assert.equal(paragraphs.length, 24);
  assert.equal(createHash("sha256").update(paragraphs.join("\n\n")).digest("hex"),
    "fce85fef09945a7b2b6cc3227c2f491e6cdc8cca97ea7d2451487757c9c13ffe");
  const sectionImages = (id) => document.pages.filter((page) => page.sectionId === id)
    .flatMap((page) => page.blocks).filter((block) => block.type === "gallery")
    .flatMap((gallery) => gallery.images.map((image) => image.imageId));
  assert.deepEqual(sectionImages("arrival"), ["m001", "m004", "m006"]);
  assert.deepEqual(sectionImages("home"), ["m069"]);
  assert.ok(!sectionImages("peninsula").includes("m069"));
  const text = (id, locale) => blocks.find((block) => block.id === id).paragraphs[0][locale];
  assert.match(text("arrival-story-3", "zh"), /零点以后/);
  assert.match(text("arrival-story-3", "en"), /after midnight on February 11/);
  assert.match(text("taipa-story-8", "zh"), /非常不推荐，很一般/);
  assert.match(text("taipa-story-8", "en"), /strongly not recommended, very average/);
  assert.match(text("peninsula-story-3", "zh"), /就是普通汽水/);
  assert.match(text("peninsula-story-3", "en"), /just ordinary soda/);
  assert.match(text("taipa-story-9", "en"), /DFA.*15%.*CPB.*Maison Margiela/);
  assert.match(text("peninsula-story-1", "en"), /no duty-free.*no extra discount.*gifts.*Armani Crema Nera/);
  assert.equal(blocks.find((block) => block.id === "recorded-costs").rows.length, 4);
});

test("Macau explicitly opts into shared reading rules without broadening other styles", () => {
  const css = readFileSync(resolve(tripDirectory, "../../../components/TripPresentation.module.css"), "utf8");
  assert.match(css, /\[data-trip-style="photo-story"\]:has\([^{}]*\[data-trip-document="macau-2023"\]/);
  assert.match(css, /^\.presentation\[data-trip-style="photo-story"\]:has\(:global\(\[data-trip-document="macau-2023"\]\)\) \{/m);
  const scope = css.slice(css.lastIndexOf('.presentation[data-trip-style="photo-story"]:has(:global([data-trip-document="macau-2023"]))'));
  assert.match(scope, /object-fit: contain/);
  assert.match(scope, /height: auto/);
  assert.match(scope, /img\.pt\) \{\s*aspect-ratio: 3 \/ 4/);
  assert.match(scope, /img\.ls\) \{\s*aspect-ratio: 4 \/ 3/);
  assert.match(scope, /@media \(max-width: 480px\)/);
  assert.match(scope, /grid-template-columns: 1fr/);
  assert.doesNotMatch(scope, /width: calc\(200%/);
  assert.doesNotMatch(scope, /display: contents|grid-row: 3/);
  assert.ok(readFileSync(resolve(tripDirectory, "../../../lib/trips.ts"), "utf8")
    .includes('@/content/trips/macau-2023/meta'));
});
