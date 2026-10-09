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
const directory = dirname(fileURLToPath(import.meta.url));
const approvedRows = [
  ["p001"], ["p002", "p003"], ["p005"], ["p006", "p009"], ["p010"],
  ["p012", "p013"], ["p015"], ["p016", "p018"], ["p020", "p022"],
  ["p025"], ["p024", "p026"], ["p028", "p030"], ["p031"],
];

test("Changsha preserves the approved private bilingual title, dates and scene-setting cover", () => {
  assert.equal(document.slug, "changsha-2022");
  assert.equal(document.metadata.date, "2022-10-28");
  assert.equal(document.metadata.dateRange, "2022.10.28 — 10.30");
  assert.equal(document.metadata.private, true);
  assert.equal(document.metadata.style, "classic");
  assert.deepEqual(document.metadata.title, {
    zh: "岳麓听风，星城寻梦",
    en: "Yuelu Breezes, Changsha Dreams",
  });
  assert.deepEqual(blocks[0].title, document.metadata.title);
  assert.equal(blocks[0].backgroundImageId, "p028");
  const meta = tripDocumentToMeta(document, (filename) => `test:${filename}`);
  assert.equal(meta.private, true);
  assert.equal(meta.style, "classic");
  assert.equal(meta.coverImage, "test:p028.webp");
  assert.deepEqual(document.sections.map((section) => section.id), [
    "overview", "departure", "early-hours", "alleyways", "green-hills", "night-lights", "return",
  ]);
  for (const locale of ["zh", "en"]) {
    assert.equal(deriveTripEntrySections(document, locale).length, 7);
    assert.match(readFileSync(new URL(`./${locale}.tsx`, import.meta.url), "utf8"),
      new RegExp(`createTripLocale\\(document, "${locale}", img\\)`));
  }
});

test("the exact 20 approved photographs remain in seven complete pairs and six natural singles", () => {
  assert.deepEqual(document.images.map((image) => image.id), approvedRows.flat());
  assert.deepEqual(galleries.map((gallery) => gallery.images.map((image) => image.imageId)), approvedRows);
  assert.equal(new Set(approvedRows.flat()).size, 20);
  assert.equal(galleries.filter((gallery) => gallery.layout === "two").length, 7);
  assert.equal(galleries.filter((gallery) => gallery.layout === "one").length, 6);
  for (const image of document.images) {
    assert.equal(image.filename, `${image.id}.webp`);
    assert(image.width > 0 && image.height > 0);
    assert(image.alt.zh && image.alt.en);
  }
  for (const gallery of galleries) {
    assert(gallery.images[0].caption.zh && gallery.images[0].caption.en);
    assert(gallery.images.slice(1).every((image) => image.caption === undefined));
    if (gallery.layout === "two") {
      assert.equal(gallery.images[0].shape, gallery.images[1].shape);
      for (const item of gallery.images) {
        const image = document.images.find((image) => image.id === item.imageId);
        assert.equal(image.thumbnailFilename, `${image.id}-thumb.webp`);
      }
    } else {
      assert.equal(gallery.images[0].shape, undefined);
      assert.equal(document.images.find((image) => image.id === gallery.images[0].imageId).thumbnailFilename, undefined);
    }
  }
  assert.doesNotMatch(source, /p023|IMG_\d+|\/Users\/|blob\.core|localhost|DateTimeOriginal/);
  assert.equal(blocks.filter((block) => block.type === "expense").length, 0);
});

test("the approved Chinese prose and recalled unphotographed scenes stay verbatim and chronological", () => {
  const paragraphs = [
    blocks[0].intro.zh,
    ...blocks.filter((block) => block.type === "prose")
      .flatMap((block) => block.paragraphs.map((paragraph) => paragraph.zh)),
  ];
  assert.equal(createHash("sha256").update(paragraphs.join("\n\n")).digest("hex"),
    "511fd8d811f3ca35ffc3af9f77450ee85f5866fe03b2491161c68b35e9742d9b");
  const ids = document.pages.map((page) => page.id);
  assert(ids.indexOf("garden-and-hall") < ids.indexOf("campus-walk"));
  assert(ids.indexOf("campus-walk") < ids.indexOf("dinner-person"));
  assert(ids.indexOf("return-morning") < ids.indexOf("airport-cups"));
  for (const id of ["campus-walk", "return-morning"]) {
    assert(document.pages.find((page) => page.id === id).blocks.every((block) => block.type !== "gallery"));
  }
  const text = (id, locale) => blocks.find((block) => block.id === id).paragraphs
    .map((paragraph) => paragraph[locale]).join("\n");
  assert.match(text("trees-and-corridor-story", "zh"), /阴天.*下午.*书院.*惬意/);
  assert.match(text("trees-and-corridor-story", "en"), /overcast.*afternoon.*academy.*relaxed/s);
  assert.match(text("campus-walk-story", "zh"), /大学校园.*很舒适/);
  assert.match(text("campus-walk-story", "en"), /university campus.*comfortable/s);
  assert.match(text("return-morning-story", "zh"), /五一广场.*午饭后.*地铁.*黄花机场/);
  assert.match(text("return-morning-story", "en"), /Wuyi Square.*After lunch.*metro.*Huanghua Airport/s);
});

test("Changsha uses unchanged Default Classic presentation and cropped thumbnails with full-image viewing", () => {
  const css = readFileSync(resolve(directory, "../../../components/TripPresentation.module.css"), "utf8");
  assert.doesNotMatch(css, /data-trip-document="changsha-2022"/);
  assert.equal(document.images.filter((image) => image.thumbnailFilename).length, 14);
  const renderer = readFileSync(resolve(directory, "../../../components/TripDocumentRenderer.tsx"), "utf8");
  assert.match(renderer, /image\.thumbnailFilename \?\? image\.filename/);
  assert.match(renderer, /data-full-src=\{image\.thumbnailFilename \? imageUrl\(image\.filename\)/);
  assert(readFileSync(resolve(directory, "../../../lib/trips.ts"), "utf8")
    .includes('@/content/trips/changsha-2022/meta'));
});
