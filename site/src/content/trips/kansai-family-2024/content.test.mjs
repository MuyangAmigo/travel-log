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
  assert.equal(document.metadata.coverImageId, "p9309");
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
  assert.equal(meta.coverImage, "test:p9309.webp");
  assert.equal(meta.title.en, "Kansai Family Trip — Osaka, Nara, Kyoto & Uji");
});

test("all 85 curated, metadata-stripped photos are in the shared bilingual reading flow", () => {
  assert.equal(document.images.length, 85);
  assert.equal(photoIds.length, 85);
  assert.equal(new Set(photoIds).size, 85);
  assert.deepEqual(new Set(photoIds), new Set(document.images.map((image) => image.id)));
  assert.ok(document.images.every((image) => /^p\d{4}\.webp$/.test(image.filename)
    && image.alt.zh && image.alt.en));
  assert.ok(galleries.every((gallery) => gallery.images[0].caption?.zh && gallery.images[0].caption?.en
    && gallery.images.slice(1).every((image) => image.caption === undefined)));
  for (const locale of ["zh", "en"]) {
    const captions = galleries.map((gallery) => gallery.images[0].caption[locale]);
    assert.equal(new Set(captions).size, captions.length, `${locale} repeats a caption`);
  }
  const familyScenes = {
    "day-3": ["p9287", "p9295"],
    "day-4": ["p9387"],
    "day-5": ["p9435", "p9436"],
  };
  for (const [sectionId, ids] of Object.entries(familyScenes)) {
    const photos = document.pages.filter((page) => page.sectionId === sectionId)
      .flatMap((page) => page.blocks).filter((block) => block.type === "gallery")
      .flatMap((block) => block.images.map((image) => image.imageId));
    for (const id of ids) {
      assert.ok(photos.includes(id), `${id} must be near its day's scene`);
    }
  }
  assert.ok(galleries.filter((gallery) => gallery.layout === "one")
    .every((gallery) => gallery.images.every((image) => image.shape === undefined)));
  assert.doesNotMatch(source, /(?:GPS|\/Users\/|blob\.core|IMG_\d+|FullSizeRender)/);
});

test("photo pairs have matching frames while family portraits and full meals retain their compositions", () => {
  for (const gallery of galleries) {
    assert.ok(["one", "two"].includes(gallery.layout), gallery.id);
    assert.equal(gallery.images.length, gallery.layout === "one" ? 1 : 2, gallery.id);
    if (gallery.layout === "two") {
      assert.ok(gallery.images[0].shape, `${gallery.id} needs an explicit paired frame`);
      assert.equal(gallery.images[0].shape, gallery.images[1].shape, gallery.id);
    } else {
      assert.equal(gallery.images[0].shape, undefined, gallery.id);
    }
  }
  for (const id of ["p9149", "p9193", "p9199", "p9287", "p9295", "p9318", "p9337", "p9387", "p9481", "p9484", "p9498", "p9511"]) {
    assert.equal(galleries.find((gallery) => gallery.images.some((image) => image.imageId === id))?.layout,
      "one", `${id} needs its complete composition`);
  }
  const familyPair = galleries.find((gallery) => gallery.images[0].imageId === "p9435");
  assert.deepEqual(familyPair.images.map((image) => image.imageId), ["p9435", "p9436"]);
  assert.ok(familyPair.images.every((image) => image.shape === "portrait"));
  assert.deepEqual(document.images.filter((image) => image.thumbnailFilename).map((image) => [
    image.id, image.filename, image.thumbnailFilename,
  ]), [
    ["p9404", "p9404.webp", "p9404-square.webp"],
    ["p9435", "p9435.webp", "p9435-paired.webp"],
    ["p9436", "p9436.webp", "p9436-paired.webp"],
  ], "balanced thumbnails must retain the complete original for the lightbox");
  assert.equal(galleries.find((gallery) => gallery.id === "photos-23").images[1].focus, "upper");
});

test("researched background stays bilingual, sourced and beside the relevant chapter", () => {
  const context = {
    "kasuga-background": ["day-2", "三千", "3,000"],
    "osaka-castle-background": ["day-3", "1931", "1931"],
    "namba-yasaka-background": ["day-3", "12 米", "12 metres"],
    "inari-background": ["day-5", "711", "711"],
    "byodoin-background": ["day-5", "1052", "1052"],
  };
  for (const [id, [section, zh, en]] of Object.entries(context)) {
    const page = document.pages.find((page) => page.blocks.some((block) => block.id === id));
    assert.equal(page?.sectionId, section);
    const block = page.blocks.find((block) => block.id === id);
    assert.equal(block.type, "prose");
    assert.ok(block.paragraphs[0].zh.includes(zh), id);
    assert.ok(block.paragraphs[0].en.includes(en), id);
    assert.equal(page.blocks[page.blocks.indexOf(block) + 1].type, "gallery");
  }
  const sources = blocks.find((block) => block.id === "background-sources");
  const urls = [
    "https://www.kasugataisha.or.jp/en/about_en/",
    "https://www.osakacastle.net/",
    "https://osaka-info.jp/en/spot/nanbayasakajinja/",
    "https://inari.jp/en/",
    "https://www.byodoin.or.jp/en/learn/history/",
  ];
  for (const locale of ["zh", "en"]) {
    for (const url of urls) assert.ok(sources.body[locale].includes(url));
  }
  assert.match(sources.body.zh, /不代表现行信息/);
  assert.match(sources.body.en, /not as current advice/);
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
