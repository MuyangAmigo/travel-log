import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import test from "node:test";
import { parseTripDocument, tripDocumentToMeta } from "../../../lib/trip-document.ts";

const source = readFileSync(new URL("./content.json", import.meta.url), "utf8");
const document = parseTripDocument(JSON.parse(source));
const blocks = document.pages.flatMap((page) => page.blocks);
const galleries = blocks.filter((block) => block.type === "gallery");
const approvedRows = [
  ["p-a7661c82346dde11"],
  ["p-d046e0048842c23a", "p-290f1ecb27b100bf"],
  ["p-e1a0abf8058ca429"],
  ["p-3e19d869fa615faf"],
  ["p-8b21ce17978fbeb3"],
  ["p-5ce29c5405f51ab9"],
  ["p-0e51288ec8b512e3", "p-c254bfecf1d3db80"],
  ["p-70a9865c84e362cb"],
  ["p-884b86d5d9efebac"],
  ["p-0ad9e9bd1cecff97", "p-89f0cde567165a9f"],
  ["p-01a39c4edc45714c", "p-b2881eeb910f8e42"],
  ["p-71d5296ab5fa91b5", "p-e75b24a9ef8ef62c"],
  ["p-5bd3ded160c3e9ce", "p-1306dffd4da9e561"],
  ["p-d5eed95898705829"],
  ["p-9930245dfadeae53"],
  ["p-a1a8af4c40e12b7c"],
  ["p-6a2faadb71b2996f", "p-2e1681acdd7911d2"],
  ["p-6e1b9f5a647ba22e"],
];

test("Guangzhou preserves its approved private bilingual identity and 2022 evidence-based dates", () => {
  assert.equal(document.slug, "guangzhou-weekend-2022");
  assert.equal(document.metadata.date, "2022-08-26");
  assert.equal(document.metadata.private, true);
  assert.equal(document.metadata.style, "photo-story");
  assert.deepEqual(document.metadata.title, {
    zh: "广州，把周末交给珠江",
    en: "Guangzhou, a Weekend by the Pearl River",
  });
  assert.deepEqual(blocks[0].title, document.metadata.title);
  assert.equal(document.metadata.coverImageId, "p-89f0cde567165a9f");
  assert.equal(blocks[0].backgroundImageId, document.metadata.coverImageId);
  const meta = tripDocumentToMeta(document, (filename) => filename);
  assert.equal(meta.private, true);
  assert.equal(meta.coverImage, "p-89f0cde567165a9f.webp");
  for (const locale of ["zh", "en"]) {
    assert.match(readFileSync(new URL(`./${locale}.tsx`, import.meta.url), "utf8"),
      new RegExp(`createTripLocale\\(document, "${locale}", img\\)`));
  }
});

test("all 25 approved photos remain once in 18 aligned groups with matching complete frames", () => {
  assert.deepEqual(galleries.map((gallery) => gallery.images.map((image) => image.imageId)), approvedRows);
  assert.deepEqual(document.images.map((image) => image.id), approvedRows.flat());
  assert.equal(galleries.filter((gallery) => gallery.layout === "two").length, 7);
  assert.equal(galleries.filter((gallery) => gallery.layout === "one").length, 11);
  for (const gallery of galleries) {
    for (const image of gallery.images) assert.ok(image.caption.zh && image.caption.en);
    if (gallery.layout === "two") assert.equal(gallery.images[0].shape, gallery.images[1].shape);
    else assert.equal(gallery.images[0].shape, undefined);
  }
  assert.ok(document.images.every((image) =>
    image.filename === `${image.id}.webp` && image.width > 0 && image.height > 0));
  assert.doesNotMatch(source, /\/Users\/|GPS|DateTimeOriginal|blob\.core|localhost/);
});

test("the approved Chinese narrative, cancelled plans and uncertain payments stay intact", () => {
  const paragraphs = [blocks[0].intro.zh, ...blocks.filter((block) => block.type === "prose")
    .flatMap((block) => block.paragraphs.map((paragraph) => paragraph.zh))];
  assert.equal(paragraphs.length, 25);
  assert.equal(createHash("sha256").update(paragraphs.join("\n\n")).digest("hex"),
    "e5a50287959f2ca36285b51128429f466049f6985de5b902efebf430ee7915e5");
  assert.match(source, /粤剧博物馆，最后没有去/);
  assert.match(source, /2024 年尚待确认/);
  assert.match(source, /实付未确认/);
  assert.match(source, /not a confirmed ride/);
});
