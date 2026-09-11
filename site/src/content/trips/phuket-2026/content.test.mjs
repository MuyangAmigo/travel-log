import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import {
  deriveTripEntrySections,
  parseTripDocument,
} from "../../../lib/trip-document.ts";

const source = readFileSync(new URL("./content.json", import.meta.url), "utf8");
const document = parseTripDocument(JSON.parse(source));

const expectedImages = `
goose-island.jpeg
airport-hotdog-fries.jpeg
sassy-shrimp-salad.jpeg
sassy-pad-thai.jpeg
breakfast-poolside.jpeg
private-beach.jpeg
beach-view.jpeg
pool-swimmer.jpeg
pool-palms.jpeg
resort-pool-view.jpeg
pool-building.jpeg
dive-shop-cat.jpeg
dive-shop-cat2.jpeg
siam-tomyum.jpeg
siam-fish.jpeg
siam-somtam.jpeg
sunset-paragliding.jpeg
patong-sunset.jpeg
selfie-paragliding.jpeg
selfie-peace.jpeg
malin-shrimp.jpeg
malin-abalone.jpeg
malin-clams.jpeg
malin-fish.jpeg
malin-shrimp-grilled.jpeg
malin-crab.jpeg
malin-yum.jpeg
malin-spread.jpeg
malin-stall.jpeg
towel-elephant.jpeg
dive-dive1.jpeg
dive-jj-underwater.jpeg
dive-rope2.jpeg
dive-rope3.jpeg
dive-farewell.jpeg
naughty-ribs.jpeg
naughty-sausage.jpeg
naughty-satay.jpeg
naughty-pig.jpeg
naughty-table.jpeg
towel-elephant2.jpeg
massage-lobby.jpeg
massage-lounge.jpeg
massage-shampoo.jpeg
day4-breakfast.jpeg
jungceylon-ship.jpeg
bigc-shopping.jpeg
phutawan-box.jpeg
phutawan-receipt.jpeg
beach-palms-ocean.jpeg
beach-rocks-ocean.jpeg
beach-palms-lawn.jpeg
beach-chair-view.jpeg
beach-warning.jpeg
day4-sassy-padthai.jpeg
day4-sassy-tomyum.jpeg
day4-sassy-fish.jpeg
day4-sassy-platter.jpeg
relax-3rd-st.jpeg
`.trim().split("\n");

test("preserves the complete bilingual Phuket document and image set", () => {
  assert.equal(document.metadata.private, true);
  assert.equal(document.metadata.coverImageId, "beach-palms-ocean");
  assert.equal(document.pages.length, 7);
  assert.equal(
    document.pages.reduce((count, page) => count + page.blocks.length, 0),
    100
  );
  assert.deepEqual(
    document.pages.map((page) => page.sectionId),
    [
      "overview",
      "day-1",
      "day-2-morning",
      "day-2-sunset",
      "day-3",
      "day-4",
      "food-bill",
    ]
  );
  assert.deepEqual(
    document.images.map((image) => image.filename),
    expectedImages
  );
  assert.equal(deriveTripEntrySections(document, "zh").length, 7);
  assert.equal(deriveTripEntrySections(document, "en").length, 7);
  assert.match(source, /4,400 THB \/ 人/);
  assert.match(source, /8,800 THB for two/);
  assert.match(source, /¥ 17,063\.42\+/);
  assert.match(source, /Trip over · Rest well/);
});

function blocksFor(sectionId) {
  const page = document.pages.find((page) => page.sectionId === sectionId);
  assert.ok(page, `Missing section ${sectionId}`);
  return page.blocks;
}

test("keeps every photo in the reading flow exactly once, with bilingual captions", () => {
  const galleries = document.pages.flatMap((page) =>
    page.blocks.filter((block) => block.type === "gallery")
  );
  const images = galleries.flatMap((gallery) => gallery.images);
  assert.deepEqual(
    images.map((image) => image.imageId).sort(),
    document.images.map((image) => image.id).sort()
  );
  for (const image of images) {
    assert.ok(image.caption?.zh.trim(), `${image.imageId}: missing Chinese caption`);
    assert.ok(image.caption?.en.trim(), `${image.imageId}: missing English caption`);
  }
});

test("paces breakfast and the night market as prose, photographs, and reflection", () => {
  const morning = blocksFor("day-2-morning");
  const breakfast = morning.findIndex((block) => block.id === "page-03-prose-1");
  assert.equal(morning[breakfast + 1].images[0].imageId, "breakfast-poolside");
  assert.equal(morning[breakfast + 1].images[0].shape, undefined, "retain the complete portrait");
  assert.equal(morning[breakfast + 2].id, "page-03-prose-breakfast-pause");
  assert.match(morning[breakfast + 2].paragraphs[0].zh, /不赶路，不打卡/);
  assert.match(morning[breakfast + 2].paragraphs[0].en, /No plans, no ticking clock/);

  const market = blocksFor("day-2-sunset");
  const arrival = market.findIndex((block) => block.id === "page-04-prose-3");
  assert.equal(market[arrival + 1].images[0].imageId, "malin-stall");
  assert.equal(market[arrival + 2].id, "page-04-prose-market-prices");
  const feast = market.findIndex((block) => block.id === "page-04-prose-market-feast");
  assert.ok(feast > arrival + 2);
  assert.equal(market[feast + 1].layout, "one");
  assert.deepEqual(market[feast + 1].images.map((image) => image.imageId), ["malin-spread"]);
  assert.equal(market[feast + 1].images[0].shape, undefined, "do not crop the full table into a banner");
  assert.notEqual(market[feast + 1].width, "narrow");
  assert.equal(market[feast + 2].id, "page-04-prose-4");
});

test("reveals the third dive after the first two and preserves the complete timeline", () => {
  const blocks = blocksFor("day-3");
  const reveal = blocks.findIndex((block) => block.id === "page-05-prose-third-dive");
  assert.ok(blocks.findIndex((block) => block.id === "page-05-gallery-1") < reveal);
  assert.equal(blocks[reveal - 1].items[0].time.zh, "14:00");
  assert.equal(blocks[reveal + 1].images[0].imageId, "dive-farewell");
  assert.equal(blocks[reveal + 1].width, "full");
  assert.match(blocks[reveal].paragraphs[0].zh, /第一次感觉自己不是被水推着走/);
  assert.match(blocks[reveal].paragraphs[0].en, /for the first time I felt/);
  const timeline = blocks.filter((block) => block.type === "timeline");
  assert.ok(timeline.every((block) => block.items.length <= 4));
  assert.deepEqual(
    timeline.flatMap((block) => block.items.map((item) => item.id)),
    Array.from({ length: 10 }, (_, index) => `page-05-timeline-1-item-${index + 1}`)
  );
});
