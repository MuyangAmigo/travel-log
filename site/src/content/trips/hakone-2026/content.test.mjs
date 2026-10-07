import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import test from "node:test";
import { deriveTripEntrySections, parseTripDocument, tripDocumentToMeta } from "../../../lib/trip-document.ts";

const source = readFileSync(new URL("./content.json", import.meta.url), "utf8");
const document = parseTripDocument(JSON.parse(source));
const blocks = document.pages.flatMap((page) => page.blocks);
const galleries = blocks.filter((block) => block.type === "gallery");

test("Hakone keeps private bilingual field-journal metadata and the requested enhanced IMG_4221 cover", () => {
  assert.equal(document.slug, "hakone-2026");
  assert.equal(document.metadata.private, true);
  assert.equal(document.metadata.style, "field-journal");
  assert.equal(document.metadata.date, "2026-09-28");
  assert.equal(document.metadata.dateRange, "2026.09.28 — 10.05");
  assert.equal(document.metadata.coverImageId, "p4221");
  assert.deepEqual(document.metadata.subtitle, {
    zh: "从雨中温泉到多摩川花火",
    en: "From rainy hot springs to Tamagawa fireworks",
  });
  assert.deepEqual(blocks[0].title, document.metadata.title);
  assert.equal(blocks[0].backgroundImageId, "p4221");
  assert.deepEqual(document.sections.map((section) => section.id),
    ["overview", "day-0", "day-1", "day-2", "day-3", "day-4", "day-5", "day-6", "day-7", "spending"]);
  for (const locale of ["zh", "en"]) {
    assert.equal(deriveTripEntrySections(document, locale).length, 10);
    assert.match(readFileSync(new URL(`./${locale}.tsx`, import.meta.url), "utf8"),
      new RegExp(`createTripLocale\\(document, "${locale}", img\\)`));
  }
  assert.equal(tripDocumentToMeta(document, (filename) => `test:${filename}`).coverImage,
    "test:p4221-vivid.webp");
  assert.ok(blocks.filter((block) => block.type === "header")
    .every((block) => !/[\u4e00-\u9fff]/u.test(block.markerValue.en)));
});

test("all 51 Chinese essay paragraphs preserve the Word source verbatim and in order", () => {
  const essays = new Map();
  const order = [];
  for (const block of blocks.filter((block) => block.id.startsWith("essay-"))) {
    assert.equal(block.type, "prose");
    assert.equal(block.style, "handwritten-cn");
    const fragment = /^essay-(\d+)-part-(\d+)$/.exec(block.id);
    if (fragment) {
      const index = Number(fragment[1]);
      if (!essays.has(index)) order.push(index);
      essays.set(index, (essays.get(index) ?? "") + block.paragraphs[0].zh);
    } else {
      const indices = block.id.slice(6).split("-").map(Number);
      assert.equal(indices.length, block.paragraphs.length);
      indices.forEach((index, position) => {
        assert.ok(!essays.has(index));
        order.push(index);
        essays.set(index, block.paragraphs[position].zh);
      });
    }
    assert.ok(block.paragraphs.every((paragraph) => paragraph.zh && paragraph.en));
  }
  assert.equal(essays.size, 51);
  assert.deepEqual(order, [...order].sort((a, b) => a - b));
  const restored = order.map((index) => essays.get(index)).join("\n");
  assert.equal(createHash("sha256").update(restored).digest("hex"),
    "71987194bb20c002819e9fa2cbec6425944ae1738ec09c10cacaf8a1748822db",
    "Changing, shortening or omitting the author's source essays requires an explicit correction");
  assert.equal(blocks.filter((block) => block.id.startsWith("itinerary-"))
    .reduce((count, block) => count + block.paragraphs.length, 0), 192);
});

test("135 curated photos stay in both locales with individual capture times and matching scene context", () => {
  const imageIds = galleries.flatMap((gallery) => gallery.images.map((image) => image.imageId));
  assert.equal(document.images.length, 135);
  assert.equal(imageIds.length, 135);
  assert.equal(new Set(imageIds).size, 135);
  assert.deepEqual(new Set(imageIds), new Set(document.images.map((image) => image.id)));
  assert.ok(document.images.every((image) => /^p\d{4}(?:-vivid)?\.webp$/.test(image.filename)
    && Number.isInteger(image.width) && image.width > 0
    && Number.isInteger(image.height) && image.height > 0));
  for (const image of galleries.flatMap((gallery) => gallery.images)) {
    assert.match(image.caption.zh, /^\d{2}\.\d{2} \d{2}:\d{2}/);
    assert.match(image.caption.en, /^\d{2}\.\d{2} \d{2}:\d{2}/);
  }
  const unknownTime = galleries.flatMap((gallery) => gallery.images)
    .filter((image) => image.caption.en.includes("time from itinerary"));
  assert.deepEqual(unknownTime.map((image) => image.imageId).sort(), ["p4622", "p4629"]);
  for (const excluded of [4143, 4240, 4248, 4256, 4315, 4375, 4376, 4416, 4469, 4933, 4934]) {
    assert.ok(!imageIds.includes(`p${excluded}`));
  }
  const inventory = document.pages.find((page) => page.id === "spending-photos");
  assert.ok(inventory.blocks.filter((block) => block.type === "gallery").flatMap((block) => block.images)
    .every((image) => /10\.0[35] 00:/.test(image.caption.zh)));
  assert.doesNotMatch(source, /(?:\/Users\/|GPSLatitude|GPSLongitude|blob\.core|IMG_\d+|S06)/);
});

test("landscape, portrait, natural and hero images vary the rhythm while every collage remains symmetric", () => {
  const shapes = new Set();
  let squares = 0;
  for (const gallery of galleries) {
    const count = { one: 1, two: 2, four: 4 }[gallery.layout];
    assert.equal(gallery.images.length, count, gallery.id);
    for (const item of gallery.images) if (item.shape) shapes.add(item.shape);
    if (count > 1) {
      assert.ok(gallery.images.every((image) => image.shape === gallery.images[0].shape), gallery.id);
      if (gallery.images[0].shape === "square") squares += count;
    } else if (!gallery.images[0].shape) {
      assert.equal(document.images.find((image) => image.id === gallery.images[0].imageId).thumbnailFilename,
        undefined, gallery.id);
    }
  }
  assert.deepEqual(shapes, new Set(["square", "portrait", "landscape", "wide", "hero"]));
  assert.ok(squares / document.images.length < 0.25, "Square thumbnails must not dominate this revision");
  for (const id of ["p4181", "p4221", "p4431", "p4468", "p4576", "p4643", "p4758", "p4881", "p4896", "p4919", "p4971"]) {
    const gallery = galleries.find((gallery) => gallery.images.some((image) => image.imageId === id));
    assert.equal(gallery.layout, "one", id);
    assert.equal(gallery.images[0].shape, undefined, id);
  }
  for (const id of ["p4788", "p4789"]) {
    const image = document.images.find((image) => image.id === id);
    assert.equal(image.thumbnailFilename, undefined, "The original drawings must not be cropped");
  }
  const drawings = document.images.filter((image) => ["p4788", "p4789"].includes(image.id));
  assert.ok(Math.abs(drawings[0].width / drawings[0].height - drawings[1].width / drawings[1].height) < 0.003,
    "The natural-ratio drawing pair remains visually symmetric");
  for (const day of [0, 1, 2, 3, 4, 5, 6, 7]) {
    const dailyBlocks = document.pages.filter((page) => page.sectionId === `day-${day}`).flatMap((page) => page.blocks);
    assert.ok(dailyBlocks.some((block) => block.type === "gallery"));
    assert.ok(dailyBlocks.some((block) => block.id.startsWith("essay-")));
    assert.ok(dailyBlocks.some((block) => block.id.startsWith("itinerary-")));
  }
});

test("payment details live in the final ledger, retaining 89 expense and 32 food records without double counting", () => {
  for (const page of document.pages.filter((page) => page.sectionId !== "spending")) {
    assert.ok(!page.blocks.some((block) => block.type === "expense"));
    for (const block of page.blocks.filter((block) => block.id.startsWith("itinerary-"))) {
      assert.ok(block.paragraphs.every((paragraph) => !/¥|￥|JPY|[\d,.]+\s*(?:日元|円|元\/人)/.test(paragraph.zh)));
    }
  }
  const rows = blocks.filter((block) => /^expense-stage-/.test(block.id)).flatMap((block) => block.rows);
  assert.equal(rows.length, 89);
  const sum = rows.reduce((cents, row) => cents + Math.round(Number(row.amount.en.replace("CNY ", "").replaceAll(",", "")) * 100), 0);
  assert.equal(sum, 5765480);
  assert.equal(blocks.filter((block) => /^food-expenses-/.test(block.id)).flatMap((block) => block.rows).length, 32);
  const summary = blocks.find((block) => block.id === "ledger-summary");
  assert.equal(summary.rows.at(-1).amount.en, "CNY 57,654.80");
  assert.equal(summary.rows[2].amount.en, "CNY 21,753.61");
  assert.ok(blocks.find((block) => block.id === "ledger-clarification").body.en.includes("21,445.88"));
});
