import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { deriveTripEntrySections, parseTripDocument, tripDocumentToMeta } from "../../../lib/trip-document.ts";

const source = readFileSync(new URL("./content.json", import.meta.url), "utf8");
const document = parseTripDocument(JSON.parse(source));
const blocks = document.pages.flatMap((page) => page.blocks);
const galleries = blocks.filter((block) => block.type === "gallery");
const sha = (value) => createHash("sha256").update(value).digest("hex");
const tripDirectory = dirname(fileURLToPath(import.meta.url));

test("Sanya retains the approved private bilingual identity, travel dates and user-selected scene cover", () => {
  assert.equal(document.slug, "sanya-winter-sun-2023");
  assert.equal(document.metadata.date, "2023-12-06");
  assert.equal(document.metadata.dateRange, "2023.12.06 — 12.09");
  assert.equal(document.metadata.private, true);
  assert.equal(document.metadata.style, "photo-story");
  assert.equal(document.metadata.coverImageId, "p-b354a787d58ac2d0");
  assert.deepEqual(document.metadata.title, {
    zh: "三亚，冬日暖阳",
    en: "Sanya, Winter in the Sun",
  });
  assert.deepEqual(blocks[0].title, document.metadata.title);
  assert.equal(blocks[0].backgroundImageId, document.metadata.coverImageId);
  const meta = tripDocumentToMeta(document, (filename) => `test:${filename}`);
  assert.equal(meta.private, true);
  assert.equal(meta.coverImage, "test:p-b354a787d58ac2d0.webp");
});

test("all 76 selected photos and 50 groups preserve their corrected bilingual order, captions and frames", () => {
  assert.equal(document.images.length, 76);
  assert.equal(galleries.length, 50);
  assert.equal(sha(document.images.map((image) => image.id).join("|")),
    "2dd0072776c1b37e4818152a97c5242691e2a37ff9907744bb16f69cf6631f28");
  const signature = document.pages.flatMap((page) => page.blocks
    .filter((block) => block.type === "gallery")
    .map((block) => ({
      id: block.id, sectionId: page.sectionId, layout: block.layout, images: block.images,
    })));
  assert.equal(sha(JSON.stringify(signature)),
    "85b349ac9486b5ea91821795cefb4dfd52155a38b58fce3b536b67821e203cdb");
  assert.equal(new Set(galleries.flatMap((gallery) => gallery.images.map((image) => image.imageId))).size, 76);
  assert.deepEqual(["one", "two", "three"].map((layout) =>
    galleries.filter((gallery) => gallery.layout === layout).length), [26, 22, 2]);
  const lawn = galleries.find((gallery) => gallery.id === "nanshan-lawn-pause");
  assert.equal(lawn.layout, "one");
  assert.deepEqual(lawn.images.map((image) => image.imageId), ["p-e7540a0b685f5d8c"]);
  assert.equal(lawn.images[0].shape, undefined);
  assert.ok(!document.images.some((image) => image.id === "p-d625e84667125e45"));
  for (const gallery of galleries) {
    assert.equal(gallery.images.length, { one: 1, two: 2, three: 3 }[gallery.layout]);
    assert.ok(gallery.images.every((image) => image.caption.zh && image.caption.en));
    assert.ok(gallery.images.every((image) => image.shape === gallery.images[0].shape));
    if (gallery.layout === "one") assert.equal(gallery.images[0].shape, undefined);
  }
  assert.ok(document.images.every((image) =>
    image.filename === `${image.id}.webp` && image.width > 0 && image.height > 0
    && image.alt.zh && image.alt.en));
});

test("the 51 approved Chinese paragraphs remain verbatim without the unrelated note's facts", () => {
  const paragraphs = [
    blocks[0].intro.zh,
    ...blocks.filter((block) => block.type === "prose")
      .flatMap((block) => block.paragraphs.map((paragraph) => paragraph.zh)),
  ];
  assert.equal(paragraphs.length, 51);
  assert.equal(sha(paragraphs.join("\n\n")),
    "43f12e2162a1837e1c3213c42c712bdb1f649e0ce9b36359b04ef6072c2eac9e");
  assert.doesNotMatch(source, /潜水|小土|湾仔|Wanzai|diving|GPSLatitude|DateTimeOriginal|\/Users\/|localhost|blob\.core/);
  assert.ok(blocks.every((block) => block.type !== "expense"));
  assert.deepEqual(document.sections.map((section) => section.id),
    ["overview", "day-06", "day-07", "day-08", "day-09", "closing"]);
  for (const locale of ["zh", "en"]) {
    assert.equal(deriveTripEntrySections(document, locale).length, 6);
    assert.match(readFileSync(new URL(`./${locale}.tsx`, import.meta.url), "utf8"),
      new RegExp(`createTripLocale\\(document, "${locale}", img\\)`));
  }
});

test("Sanya explicitly reuses scoped reading rules, complete compositions and a literal registry entry", () => {
  const css = readFileSync(resolve(tripDirectory, "../../../components/TripPresentation.module.css"), "utf8");
  const selector = '.presentation[data-trip-style="photo-story"]:has(:global([data-trip-document="sanya-winter-sun-2023"]))';
  assert.ok(css.includes(`${selector} {`));
  const scope = css.slice(css.indexOf(`${selector} {`), css.indexOf(
    '.presentation[data-trip-style="photo-story"]:has(:global([data-trip-document="beijing-winter-awakening-2022"]))'));
  assert.match(scope, /object-fit: contain/);
  assert.match(scope, /height: auto/);
  assert.match(scope, /img\.pt\) \{\s*aspect-ratio: 3 \/ 4/);
  assert.match(scope, /img\.ls\) \{\s*aspect-ratio: 4 \/ 3/);
  assert.match(scope, /@media \(max-width: 480px\)/);
  assert.match(scope, /grid-template-columns: 1fr/);
  const registry = readFileSync(resolve(tripDirectory, "../../../lib/trips.ts"), "utf8");
  assert.match(registry, /import \{ meta as sanyaWinterSun2023Meta \} from "@\/content\/trips\/sanya-winter-sun-2023\/meta"/);
  assert.match(registry, /export const trips: TripMeta\[\] = \[[\s\S]*sanyaWinterSun2023Meta,[\s\S]*\]\.sort/);
  const publication = registry.match(/"sanya-winter-sun-2023": "([^"]+)"/);
  assert.ok(publication && Number.isFinite(Date.parse(publication[1])));
  assert.equal(publication[1], "2026-10-10T15:48:53+00:00");
  assert.equal(document.metadata.publishedAt, undefined);
});
