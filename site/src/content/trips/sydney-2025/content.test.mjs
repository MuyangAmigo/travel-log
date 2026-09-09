import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import {
  deriveTripEntrySections,
  parseTripDocument,
} from "../../../lib/trip-document.ts";

const document = parseTripDocument(
  JSON.parse(readFileSync(new URL("./content.json", import.meta.url), "utf8"))
);

const selectedPhotoIds = `
file-2d5a4910154f img-4811 img-4814 img-4822
img-4835 img-4836 img-4838 img-4844 img-4846 img-4847
img-4879 img-4873 img-4883 img-4885 img-4887 img-4888
img-4901 img-4915 img-4927 img-4932 img-4955 img-5055
img-4973 img-5016 img-9520 img-5047 img-5059 img-5061
img-5072 img-5090 img-5092 img-5099 img-5110 img-5179
img-5155 img-5161 img-5190 file-19011866f603 img-5219 img-5220
img-5222 img-5224 img-5225 file-f4243d3e7c0a
file-102f324e1181 img-5259 file-c1ff132d57be img-5246 img-5238 img-5243
`.trim().split(/\s+/);

test("Sydney stays private with an aligned editorial title and a scene-setting cover", () => {
  assert.equal(document.metadata.private, true);
  assert.equal(document.metadata.date, "2025-09-01");
  assert.equal(document.metadata.dateRange, "2025.09.01 — 09.09");
  assert.equal(document.metadata.coverImageId, "img-4955");
  const cover = document.pages[0].blocks.find((block) => block.type === "cover");
  assert.deepEqual(cover.title, document.metadata.title);
  assert.equal(cover.backgroundImageId, document.metadata.coverImageId);
  assert.equal(document.pages[0].blocks.length, 1, "The fixed-height cover must not hide other content");
  assert.match(
    readFileSync(new URL("./meta.ts", import.meta.url), "utf8"),
    /private:\s*document\.metadata\.private/
  );
});

test("both locales use 25 matching thumbnail pairs backed by all 50 full photos", () => {
  assert.equal(document.images.length, 50);
  assert.deepEqual(document.images.map((image) => image.id), selectedPhotoIds);
  assert.deepEqual(
    document.images.map((image) => image.filename),
    selectedPhotoIds.map((id) => `${id}.webp`)
  );
  const galleries = document.pages.slice(1)
    .flatMap((page) => page.blocks)
    .filter((block) => block.type === "gallery");
  assert.equal(galleries.length, 25);
  const usedIds = galleries.flatMap((gallery) => gallery.images.map((image) => image.imageId));
  assert.equal(usedIds.length, 50);
  assert.deepEqual([...usedIds].sort(), [...selectedPhotoIds].sort());
  for (const gallery of galleries) {
    assert.equal(gallery.layout, "two");
    assert.equal(gallery.images.length, 2);
    for (const image of gallery.images) {
      assert.equal(image.shape, "portrait", "Every pair must use matching 3:4 frames");
      assert.equal(image.fit, undefined, "Thumbnails must use the shared cropped-image styling");
      assert.ok(image.caption.zh);
      assert.ok(image.caption.en);
    }
  }
});

test("all nine days remain in order, including the days without photos", () => {
  const sections = ["overview", ...Array.from({ length: 9 }, (_, index) => `day-${index + 1}`)];
  assert.deepEqual([...new Set(document.pages.map((page) => page.sectionId))], sections);
  for (const locale of ["zh", "en"]) {
    assert.equal(deriveTripEntrySections(document, locale).length, 10);
  }
  for (const section of ["day-3", "day-9"]) {
    const blocks = document.pages.filter((page) => page.sectionId === section)
      .flatMap((page) => page.blocks);
    assert.ok(blocks.some((block) => block.type === "prose"));
    assert.ok(blocks.every((block) => block.type !== "gallery"));
  }
});

test("flight, cafe and coastal-route uncertainty stays explicit in both locales", () => {
  const blocks = document.pages.flatMap((page) => page.blocks);
  const arrival = blocks.find((block) => block.id === "arrival-times");
  for (const locale of ["zh", "en"]) {
    assert.match(arrival.body[locale], /06:15/);
    assert.match(arrival.body[locale], /07:06/);
  }
  const drink = blocks.find((block) => block.id === "brunch-pair").images[0].caption;
  assert.match(drink.zh, /应该是拿铁/);
  assert.match(drink.en, /Probably a latte/);
  const coast = blocks.find((block) => block.id === "coast-story").paragraphs[1];
  assert.match(coast.zh, /不把它写成走完/);
  assert.match(coast.en, /not a claim that we completed/);
  const flights = blocks.find((block) => block.id === "flights");
  assert.equal(flights.items.length, 2);
  assert.match(flights.items[0].event.en, /HO1669/);
  assert.match(flights.items[1].event.en, /HO1670/);
});
