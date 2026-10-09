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
const directory = dirname(fileURLToPath(import.meta.url));
const blocks = document.pages.flatMap((page) => page.blocks);
const galleries = blocks.filter((block) => block.type === "gallery");
const approvedGroups = [
  ["b001"], ["b002"], ["b007"], ["b005", "b011"],
  ["b013", "b014", "b015", "b016"], ["b022", "b024", "b025", "b026"],
  ["b028"], ["b021", "b031"], ["b032"], ["b042", "b044"],
  ["b045", "b047"], ["b050", "b054", "b056", "b059"], ["b066", "b070"],
  ["b088"], ["b078", "b093"], ["b095", "b096"], ["b098"], ["b100"],
  ["b102", "b104"], ["b108", "b120"], ["b123", "b125", "b126", "b128"],
  ["b135"], ["b140"], ["b144", "b145", "b146", "b147"], ["b150"],
  ["b161"], ["b165", "b166", "b168", "b169"], ["b172", "b173"],
  ["b174", "b175"], ["b177"], ["b179"], ["b182"], ["b183"],
];
const readingGroups = [
  ["b001"], ["b002"], ["b007"], ["b005", "b011"],
  ["b013", "b014", "b015"], ["b016"], ["b022"], ["b024"], ["b025", "b026"],
  ["b028"], ["b021", "b031"], ["b032"], ["b042"], ["b044"], ["b045"], ["b047"],
  ["b050", "b054", "b056"], ["b059"], ["b066"], ["b070"], ["b088"], ["b078"], ["b093"],
  ["b095", "b096"], ["b098"], ["b100"], ["b102", "b104"], ["b108"], ["b120"],
  ["b123", "b125", "b126", "b128"], ["b135"], ["b140"], ["b144"], ["b145"], ["b146", "b147"],
  ["b150"], ["b161"], ["b165", "b168"], ["b166", "b169"], ["b172"], ["b173"],
  ["b174", "b175"], ["b177"], ["b179"], ["b182"], ["b183"],
];

test("Beijing uses the approved private bilingual identity and cross-year dates", () => {
  assert.equal(document.slug, "beijing-winter-awakening-2022");
  assert.equal(document.metadata.date, "2022-12-29");
  assert.equal(document.metadata.dateRange, "2022.12.29 — 2023.01.01");
  assert.equal(document.metadata.private, true);
  assert.equal(document.metadata.style, "photo-story");
  assert.deepEqual(document.metadata.title, {
    zh: "北京，重新出门的冬天",
    en: "Beijing, a Winter Back Outside",
  });
  assert.deepEqual(blocks[0].title, document.metadata.title);
  assert.equal(blocks[0].backgroundImageId, "b028");
  const meta = tripDocumentToMeta(document, (filename) => `test:${filename}`);
  assert.equal(meta.private, true);
  assert.equal(meta.coverImage, "test:b028.webp");
  assert.deepEqual(document.sections.map((section) => section.id), [
    "overview", "arrival", "universal", "city", "palace", "reflection", "spending",
  ]);
  for (const locale of ["zh", "en"]) {
    assert.equal(deriveTripEntrySections(document, locale).length, 7);
    assert.match(readFileSync(new URL(`./${locale}.tsx`, import.meta.url), "utf8"),
      new RegExp(`createTripLocale\\(document, "${locale}", img\\)`));
  }
});

test("all 62 approved photographs appear once in both locales with the mixed photo-diary order", () => {
  assert.deepEqual(document.images.map((image) => image.id), approvedGroups.flat());
  assert.equal(new Set(approvedGroups.flat()).size, 62);
  assert.deepEqual(galleries.map((gallery) => gallery.images.map((image) => image.imageId)), readingGroups);
  assert.deepEqual([...readingGroups.flat()].sort(), [...approvedGroups.flat()].sort());
  assert.equal(galleries.filter((gallery) => gallery.layout === "two").length, 9);
  assert.equal(galleries.filter((gallery) => gallery.layout === "three").length, 2);
  assert.equal(galleries.filter((gallery) => gallery.layout === "four").length, 1);
  const singles = galleries.filter((gallery) => gallery.layout === "one");
  assert.equal(singles.filter((gallery) => gallery.images[0].shape === "wide").length, 11);
  assert.equal(singles.filter((gallery) => gallery.images[0].shape === undefined).length, 23);
  assert.ok(document.images.every((image) => image.filename === `${image.id}.webp`
    && image.width > 0 && image.height > 0 && image.alt.zh && image.alt.en));
  for (const gallery of galleries) {
    assert.equal(gallery.images.length, { one: 1, two: 2, three: 3, four: 4 }[gallery.layout]);
    assert.ok(gallery.images[0].caption.zh && gallery.images[0].caption.en);
    assert.ok(gallery.images.slice(1).every((image) => image.caption === undefined));
    for (let index = 0; index + 1 < gallery.images.length; index += 2) {
      assert.equal(gallery.images[index].shape, gallery.images[index + 1].shape);
    }
    if (gallery.layout !== "one") {
      assert.equal(new Set(gallery.images.map((image) => image.shape)).size, 1);
    }
    assert.equal(gallery.width, undefined);
  }
  assert.equal(galleries.find((gallery) => gallery.id === "r022").images[0].shape, undefined);
  assert.equal(galleries.find((gallery) => gallery.id === "r011").images[0].shape, undefined);
  for (const id of ["b022", "b047", "b078", "b144", "b145", "b161"]) {
    const group = galleries.find((gallery) => gallery.images.some((image) => image.imageId === id));
    assert.equal(group.layout, "one", `${id} must remain centered and complete`);
    assert.equal(group.images[0].shape, undefined);
  }
  assert.doesNotMatch(source, /(?:b130|b132|\/Users\/|DateTimeOriginal|GPS|IMG_\d+|blob\.core|localhost)/);
});

test("the 40 approved Chinese paragraphs stay verbatim and corrected facts remain bilingual", () => {
  const prose = [blocks[0].intro.zh,
    ...blocks.filter((block) => block.type === "prose").flatMap((block) => block.paragraphs.map((paragraph) => paragraph.zh))];
  assert.equal(prose.length, 40);
  assert.equal(createHash("sha256").update(prose.join("\n\n")).digest("hex"),
    "470251312f65092798dbe2c0ec87c837abf7c1d1cd9cc020ab9aee8cef0745d2");
  const paragraph = (id, locale) => blocks.find((block) => block.id === id).paragraphs[0][locale];
  assert.match(paragraph("story-05", "zh"), /10:30/);
  assert.match(paragraph("story-05", "en"), /10:30/);
  assert.match(paragraph("story-18", "zh"), /西城万豪/);
  assert.match(paragraph("story-18", "en"), /Xicheng Marriott/);
  assert.match(paragraph("story-20", "zh"), /天坛，门票 40 元/);
  assert.match(paragraph("story-20", "en"), /Temple of Heaven.*RMB 40/);
  assert.match(paragraph("story-16", "en"), /wouldn't recommend.*wasn't good value/);
  assert.match(paragraph("story-24", "en"), /Baye Shuanrou.*not getting a table/);
  assert.match(paragraph("story-36", "en"), /Beijing Capital.*Hongqiao/);
  assert.doesNotMatch(source, /(?:地坛|Westin|9:30)/);
  const costs = blocks.find((block) => block.id === "recorded-costs").rows;
  assert.equal(costs.length, 2);
  assert.deepEqual(costs.map((row) => row.amount.zh), ["¥180", "¥40"]);
  assert.ok(costs.every((row) => !row.total));
  const sectionCount = (id) => document.pages.filter((page) => page.sectionId === id)
    .flatMap((page) => page.blocks).filter((block) => block.type === "gallery")
    .flatMap((gallery) => gallery.images).length;
  assert.deepEqual(["arrival", "universal", "city", "palace"].map(sectionCount), [2, 28, 12, 20]);
});

test("Beijing fills matched thumbnail frames without padding and preserves important complete compositions", () => {
  const css = readFileSync(resolve(directory, "../../../components/TripPresentation.module.css"), "utf8");
  assert.match(css, /\[data-trip-style="photo-story"\]:has\([^{}]*\[data-trip-document="beijing-winter-awakening-2022"\]/);
  assert.match(css, /^\.presentation\[data-trip-style="photo-story"\]:has\(:global\(\[data-trip-document="beijing-winter-awakening-2022"\]\)\) \{/m);
  const scoped = css.slice(css.lastIndexOf('.presentation[data-trip-style="photo-story"]:has(:global([data-trip-document="beijing-winter-awakening-2022"]))'));
  assert.match(scoped, /object-fit: cover/);
  assert.doesNotMatch(scoped, /object-fit: contain/);
  assert.match(scoped, /aspect-ratio: 3 \/ 4/);
  assert.match(scoped, /aspect-ratio: 4 \/ 3/);
  assert.match(scoped, /grid-template-columns: repeat\(2, minmax\(0, 1fr\)\)/);
  assert.match(scoped, /max-width: 800px/);
  assert.doesNotMatch(scoped, /max-width: (?:320|680)px !important/);
  assert.match(scoped, /\[data-trip-block="r020-tall"\][^{}]*img\.pt\) \{\s*aspect-ratio: 9 \/ 16/);
  assert.match(scoped, /grid-row: 3/);
  assert.match(scoped, /@media \(max-width: 480px\)/);
  assert.match(scoped, /grid-template-columns: 1fr/);
  assert.match(scoped, /grid-template-columns: repeat\(3, minmax\(0, 1fr\)\)/);
  assert.match(scoped, /@media \(max-width: 760px\)/);
  assert.match(scoped, /grid-row: 4/);
  assert.doesNotMatch(scoped, /data-trip-document="(?:phuket|macau|kansai)/);
  const renderer = readFileSync(resolve(directory, "../../../components/TripDocumentRenderer.tsx"), "utf8");
  assert.match(renderer, /data-trip-block=\{block\.id\}/);
  assert.ok(readFileSync(resolve(directory, "../../../lib/trips.ts"), "utf8")
    .includes(`@/content/trips/${document.slug}/meta`));
});
