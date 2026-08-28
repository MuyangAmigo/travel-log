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
    87
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
