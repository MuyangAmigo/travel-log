import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import {
  deriveTripEntrySections,
  parseTripDocument,
} from "../../../lib/trip-document.ts";

const source = readFileSync(new URL("./content.json", import.meta.url), "utf8");
const document = parseTripDocument(JSON.parse(source));

const expectedImages = [
  "cover-2026-08.png",
  "01-airport-lounge-meal.jpeg",
  "02-fukuoka-airport-arrival.jpeg",
  "03-the-b-hakata-room.jpeg",
  "04-shin-shin-order-ticket.jpeg",
  "05-shin-shin-ramen.jpeg",
  "06-hakata-station-night.jpeg",
  "07-hakata-marui-night.jpeg",
  "08-kushida-shrine-approach-night.jpeg",
  "09-kushida-shrine-night.jpeg",
  "10-tenjin-shop-display.jpeg",
  "11-tochoji-pagoda.png",
  "12-mangyoji-temple-cat.png",
  "13-tenjin-rainy-street.webp",
  "14-kego-shrine.webp",
  "15-tenjin-green-installation.webp",
  "16-kego-park.webp",
  "17-one-fukuoka-building.webp",
  "18-musashi-wagyu-bowl.webp",
  "19-canal-city-daytime.webp",
  "20-seaside-torii.webp",
  "21-seaside-pine-path.webp",
  "22-seaside-coast-path.webp",
  "23-ohori-park-bench.webp",
  "24-fukuoka-castle-ruins-sign.webp",
  "25-fukuoka-castle-ruins-park.webp",
  "26-senko-tsukemen-entrance.webp",
  "27-senko-tsukemen.webp",
  "28-seven-eleven-night.webp",
  "29-hakata-station-bakery.webp",
  "30-hakata-station-bread.webp",
  "31-dazaifu-tenmangu-approach.webp",
  "32-dazaifu-tenmangu-pond.webp",
  "33-dazaifu-goshuin.webp",
  "34-kyushu-national-museum.webp",
  "35-kyushu-national-museum-ticket.webp",
  "36-museum-textile.webp",
  "37-museum-exhibit.webp",
  "38-kamado-shrine-selfie.webp",
  "39-kamado-shrine-approach.webp",
  "40-kamado-shrine-garden.webp",
  "41-kamado-shrine-path.webp",
  "42-kamado-shrine-hall.webp",
  "43-kamado-shrine-goshuin.webp",
  "44-umegae-mochi.webp",
  "45-hakata-station-ice-cream.webp",
  "46-maedaya-entrance.webp",
  "47-maedaya-motsunabe.webp",
  "48-maedaya-sign.webp",
  "49-maedaya-finale.webp",
  "50-flight-home.webp",
];

test("preserves the complete bilingual Fukuoka document and image set", () => {
  assert.equal(document.metadata.private, true);
  assert.equal(document.metadata.coverImageId, "cover-2026-08");
  assert.equal(document.pages.length, 16);
  assert.equal(
    document.pages.reduce((count, page) => count + page.blocks.length, 0),
    90
  );
  assert.deepEqual(
    document.pages.map((page) => page.sectionId),
    [
      "overview",
      "route",
      "day-1",
      "day-1",
      "day-2",
      "day-2",
      "day-3",
      "day-3",
      "day-4",
      "day-4",
      "day-4",
      "day-4",
      "day-5",
      "notes",
      "notes",
      "notes",
    ]
  );
  assert.deepEqual(
    document.images.map((image) => image.filename),
    expectedImages
  );
  assert.equal(deriveTripEntrySections(document, "zh").length, 8);
  assert.equal(deriveTripEntrySections(document, "en").length, 8);
  assert.match(source, /Microsoft Build/);
  assert.match(source, /¥89,418 \/ RMB ¥3,794/);
  assert.match(source, /原来我不是害怕一个人/);
  assert.match(source, /I had simply never tried to be with myself properly/);
});
