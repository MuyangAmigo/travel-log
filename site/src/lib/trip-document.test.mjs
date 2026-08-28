import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import {
  deriveTripEntrySections,
  parseTripDocument,
  tripDocumentToMeta,
  TripDocumentValidationError,
  validateTripDocument,
} from "./trip-document.ts";

const minimalDocument = {
  version: 1,
  slug: "test-trip",
  metadata: {
    date: "2026-08-26",
    dateRange: "2026.08.26",
    coverImageId: "cover",
    title: { zh: "测试旅行", en: "Test Trip" },
    subtitle: { zh: "副标题", en: "Subtitle" },
    location: { zh: "测试地", en: "Testville" },
    private: false,
  },
  images: [
    {
      id: "cover",
      filename: "cover.jpeg",
      alt: { zh: "封面图", en: "Cover image" },
    },
  ],
  sections: [{ id: "overview" }],
  pages: [
    {
      id: "cover-page",
      sectionId: "overview",
      blocks: [
        {
          id: "cover-block",
          type: "cover",
          eyebrow: { zh: "旅行日记", en: "Travel Journal" },
          title: { zh: "慢慢走", en: "Take It Slow" },
          subtitle: { zh: "测试之旅", en: "A Test Journey" },
          date: { zh: "2026.08.26", en: "2026.08.26" },
          intro: { zh: "这是一次测试。", en: "This is a test." },
        },
      ],
    },
  ],
};

function readTripDocument(slug) {
  const source = readFileSync(
    new URL(`../content/trips/${slug}/content.json`, import.meta.url),
    "utf8"
  );
  return { source, document: parseTripDocument(JSON.parse(source)) };
}

function collectReferencedImageIds(document) {
  const references = new Set([document.metadata.coverImageId]);
  for (const page of document.pages) {
    for (const block of page.blocks) {
      if (block.type === "cover" && block.backgroundImageId) {
        references.add(block.backgroundImageId);
      } else if (block.type === "gallery") {
        block.images.forEach((image) => references.add(image.imageId));
      } else if (block.type === "shopping") {
        block.products.forEach((product) => {
          if (product.imageId) references.add(product.imageId);
        });
      }
    }
  }
  return references;
}

function assertCompleteImageReferences(document, expectedFilenames) {
  assert.deepEqual(
    [...document.images.map((image) => image.filename)].sort(),
    [...expectedFilenames].sort()
  );
  assert.deepEqual(
    [...collectReferencedImageIds(document)].sort(),
    [...document.images.map((image) => image.id)].sort(),
    "every declared image must be referenced and every reference must resolve"
  );
}

test("parses a versioned document and derives localized navigation and metadata", () => {
  const document = parseTripDocument(minimalDocument);

  assert.deepEqual(deriveTripEntrySections(document, "en"), [
    {
      id: "overview",
      marker: "PAGE 01",
      label: "Take It Slow",
      detail: "A Test Journey · 2026.08.26",
    },
  ]);
  assert.deepEqual(tripDocumentToMeta(document, (filename) => `/images/${filename}`), {
    slug: "test-trip",
    date: "2026-08-26",
    dateRange: "2026.08.26",
    coverImage: "/images/cover.jpeg",
    title: { zh: "测试旅行", en: "Test Trip" },
    subtitle: { zh: "副标题", en: "Subtitle" },
    location: { zh: "测试地", en: "Testville" },
    private: false,
  });
});

test("rejects unsupported versions and unknown schema fields", () => {
  const invalid = structuredClone(minimalDocument);
  invalid.version = 2;
  invalid.metadata.untrustedClassName = "arbitrary-css";
  invalid.images[0].filename = "active-content.svg";

  const issues = validateTripDocument(invalid);
  assert.ok(issues.some((issue) => issue.path === "$.version"));
  assert.ok(
    issues.some((issue) => issue.path === "$.metadata.untrustedClassName"),
    "unknown presentation fields must not bypass constrained variants"
  );
  assert.ok(
    issues.some((issue) => issue.path === "$.images[0].filename"),
    "editable image documents must be limited to safe raster formats"
  );
  assert.throws(() => parseTripDocument(invalid), TripDocumentValidationError);
});

test("rejects dangling references, duplicate block IDs, and unreferenced images", () => {
  const invalid = structuredClone(minimalDocument);
  invalid.images.push({
    id: "unused",
    filename: "unused.png",
    alt: { zh: "未使用", en: "Unused" },
  });
  invalid.pages.push({
    id: "second-page",
    sectionId: "missing-section",
    blocks: [
      {
        id: "cover-block",
        type: "gallery",
        layout: "one",
        images: [{ imageId: "missing-image" }],
      },
    ],
  });

  const messages = validateTripDocument(invalid).map(
    (issue) => `${issue.path}: ${issue.message}`
  );
  assert.ok(messages.some((message) => message.includes('duplicates "cover-block"')));
  assert.ok(messages.some((message) => message.includes('unknown section "missing-section"')));
  assert.ok(messages.some((message) => message.includes('unknown image "missing-image"')));
  assert.ok(messages.some((message) => message.includes('image "unused" is not referenced')));
});

test("accepts constrained highlight, rating, shopping, warning, stamp, and spacer blocks", () => {
  const document = structuredClone(minimalDocument);
  document.pages[0].blocks.push(
    {
      id: "warning",
      type: "note",
      variant: "warning",
      title: { zh: "注意", en: "Watch out" },
      body: { zh: "小心台阶。", en: "Mind the step." },
    },
    {
      id: "highlight",
      type: "highlight",
      tone: "default",
      title: { zh: "亮点", en: "Highlight" },
      body: { zh: "值得记住。", en: "Worth remembering." },
    },
    {
      id: "rating",
      type: "rating",
      title: { zh: "评分", en: "Ratings" },
      items: [
        {
          id: "food-rating",
          name: { zh: "餐饮", en: "Food" },
          score: 5,
          comment: { zh: "很好吃", en: "Delicious" },
        },
      ],
    },
    {
      id: "shopping",
      type: "shopping",
      products: [
        {
          id: "souvenir",
          imageId: "cover",
          name: { zh: "纪念品", en: "Souvenir" },
          price: { zh: "¥10", en: "RMB 10" },
          detail: { zh: "留作纪念", en: "A keepsake" },
        },
      ],
    },
    {
      id: "stamp",
      type: "stamp",
      text: { zh: "旅行纪念章", en: "Trip stamp" },
      tilt: "none",
    },
    { id: "spacer", type: "spacer" }
  );

  assert.deepEqual(validateTripDocument(document), []);
});

test("validates the migrated Chengdu reference document and both locale sections", () => {
  const source = readFileSync(
    new URL("../content/trips/chengdu-2025/content.json", import.meta.url),
    "utf8"
  );
  const document = parseTripDocument(JSON.parse(source));
  const zhSections = deriveTripEntrySections(document, "zh");
  const enSections = deriveTripEntrySections(document, "en");

  assert.equal(document.pages.length, 7);
  assert.equal(document.images.length, 20);
  assert.deepEqual(
    document.pages.map((page) => page.blocks.map((block) => block.type)),
    [
      ["cover"],
      ["header", "prose", "gallery", "timeline", "note"],
      ["header", "gallery", "prose", "gallery", "gallery", "note"],
      ["header", "prose", "gallery", "route", "note"],
      ["header", "gallery", "prose", "gallery", "gallery", "note"],
      ["header", "prose", "gallery", "gallery", "note"],
      ["header", "expense", "divider", "ending", "tags"],
    ]
  );
  assert.equal(document.metadata.coverImageId, "panda-huahua");
  assert.match(source, /10,474 RMB/);
  assert.match(source, /Stone Island 3,126/);
  assert.match(source, /269 元 \/ 80 分钟/);
  assert.equal(zhSections.length, 7);
  assert.equal(enSections.length, 7);
  assert.equal(zhSections[0].label, "在成都，慢慢耍");
  assert.equal(enSections[3].label, "Chunxi Road Wanderers · Night");
  assert.equal(enSections[6].marker, "¥ 10K");
});

test("preserves the complete bilingual Shaoxing document and image set", () => {
  const { source, document } = readTripDocument("shaoxing-2025");
  const zhSections = deriveTripEntrySections(document, "zh");
  const enSections = deriveTripEntrySections(document, "en");

  assert.equal(document.pages.length, 6);
  assert.equal(document.sections.length, 6);
  assert.equal(zhSections.length, 6);
  assert.equal(enSections.length, 6);
  assert.deepEqual(
    document.pages.map((page) => page.blocks.map((block) => block.type)),
    [
      ["cover"],
      ["header", "gallery", "prose", "timeline"],
      ["header", "gallery", "prose", "route"],
      ["header", "prose", "gallery", "note"],
      ["header", "gallery", "gallery", "prose"],
      ["header", "gallery", "gallery", "note", "expense", "divider", "ending", "tags"],
    ]
  );
  assert.equal(document.metadata.private, true);
  assert.equal(document.metadata.coverImageId, "cover");
  assert.equal(zhSections[0].label, "水巷墨香");
  assert.equal(enSections[4].label, "Walking into Lanting through Calligraphy");
  assert.match(source, /20:22/);
  assert.match(source, /70 元 \/ 人/);
  assert.match(source, /RMB 70 \/ person/);
  assertCompleteImageReferences(document, [
    "cover-2026-08.png",
    "traditional-water-town-mural.jpeg",
    "traditional-canal-boats-alley.jpeg",
    "hand-adjusting-world-map-art.jpeg",
    "person-posing-with-blue-statue.jpeg",
    "mushroom-tofu-chicken-stirfry.jpeg",
    "spicy-seafood-hot-pot.jpeg",
    "steamed-square-rice-cakes.jpeg",
    "creamy-vegetable-seafood-soup.jpeg",
    "char-siu-bao-buns.jpeg",
    "tofu-and-pickled-mustard-stew.jpeg",
    "kuaijishan-lanting-display.jpeg",
    "arched-bridge-over-river.jpeg",
    "goose-pond-stone-tablet.jpeg",
    "calligraphy-zhi-wall.jpeg",
    "calligraphy-ribbon-corridor-group.jpeg",
    "person-in-black-jacket.jpeg",
    "two-people-standing-outdoors.jpeg",
  ]);
});

test("preserves the complete bilingual Hangzhou concert document and image set", () => {
  const { source, document } = readTripDocument("hangzhou-concert-2026");
  const zhSections = deriveTripEntrySections(document, "zh");
  const enSections = deriveTripEntrySections(document, "en");

  assert.equal(document.pages.length, 7);
  assert.equal(document.sections.length, 7);
  assert.equal(zhSections.length, 7);
  assert.equal(enSections.length, 7);
  assert.deepEqual(
    document.pages.map((page) => page.blocks.map((block) => block.type)),
    [
      ["cover"],
      ["header", "prose", "gallery", "divider", "note", "timeline"],
      ["header", "gallery", "divider", "prose", "gallery", "note"],
      ["header", "prose", "gallery", "gallery", "rating"],
      ["header", "prose", "gallery", "divider", "prose", "gallery", "note"],
      ["header", "gallery", "divider", "prose", "gallery", "gallery", "note"],
      [
        "header",
        "prose",
        "gallery",
        "gallery",
        "divider",
        "route",
        "note",
        "spacer",
        "divider",
        "prose",
      ],
    ]
  );
  assert.equal(document.metadata.private, true);
  assert.equal(document.metadata.coverImageId, "concert-rose");
  assert.equal(document.pages[0].cardVariant, "inset-cover");
  assert.equal(zhSections[2].label, "凤凰传奇「吉祥如意」");
  assert.equal(enSections[6].label, "Dongpo noodles, then back to Shanghai");
  assert.match(source, /滨江区滨盛路1786号/);
  assert.match(source, /Section C2, Row 9/);
  assert.match(source, /C2区9排26号/);
  assert.match(source, /1\.5-2 hours/);
  assertCompleteImageReferences(document, [
    "IMG_1546.jpeg",
    "IMG_1534.jpeg",
    "IMG_1508.jpeg",
    "IMG_1549.jpeg",
    "IMG_1550.jpeg",
    "IMG_1553.jpeg",
    "IMG_1551.jpeg",
    "IMG_1552.jpeg",
    "IMG_1562.jpeg",
    "IMG_1556.jpeg",
    "IMG_1558.jpeg",
    "IMG_1563.jpeg",
    "IMG_1555.jpeg",
    "IMG_1566.jpeg",
    "IMG_1572.jpeg",
    "IMG_1578.jpeg",
    "IMG_1580.jpeg",
    "IMG_1579.jpeg",
    "IMG_1575.jpeg",
    "IMG_1581.jpeg",
    "IMG_1582.jpeg",
    "IMG_1588.jpeg",
    "IMG_1590.jpeg",
    "IMG_1593.jpeg",
    "IMG_1591.jpeg",
    "IMG_1592.jpeg",
  ]);
});

test("preserves the complete bilingual Japan 2023 document and image set", () => {
  const { source, document } = readTripDocument("japan-2023");
  const zhSections = deriveTripEntrySections(document, "zh");
  const enSections = deriveTripEntrySections(document, "en");

  assert.equal(document.pages.length, 12);
  assert.equal(document.sections.length, 12);
  assert.equal(zhSections.length, 12);
  assert.equal(enSections.length, 12);
  assert.deepEqual(
    document.pages.map((page) => page.blocks.map((block) => block.type)),
    [
      ["cover", "stamp"],
      ["header", "prose", "timeline", "gallery"],
      ["header", "prose", "gallery", "gallery", "gallery"],
      ["header", "prose", "gallery", "gallery"],
      ["header", "prose", "gallery", "gallery"],
      ["header", "prose", "gallery"],
      ["header", "prose", "gallery", "gallery"],
      ["header", "prose", "gallery"],
      ["header", "prose", "gallery"],
      ["header", "prose", "gallery", "gallery"],
      ["header", "expense", "note", "rating", "note"],
      ["header", "prose", "divider", "prose", "tags", "stamp"],
    ]
  );
  assert.equal(document.metadata.private, true);
  assert.equal(document.metadata.coverImageId, "mount-fuji-lake-view");
  assert.equal(document.pages[0].cardVariant, "inset-cover");
  assert.equal(zhSections[0].label, "富士静景，\n东京热游");
  assert.equal(enSections[11].label, "A Quiet Mountain First, Then Tokyo Packed into the Suitcase");
  assert.match(source, /RMB 19,198\.33/);
  assert.match(source, /5,698\.85 元/);
  assert.match(source, /富士山留在窗外/);
  assert.match(source, /Mount Fuji stayed outside the window/);
  assertCompleteImageReferences(document, [
    "tokyo-city-one-day-tour.jpeg",
    "lake-kawaguchi-hotel-areas-map.jpeg",
    "mount-fuji-lake-view.png",
    "kawaguchiko-station-sign-entrance.png",
    "chureito-pagoda-overlooking-fujiyoshida.png",
    "group-at-japanese-temple.jpeg",
    "two-people-under-tree.jpeg",
    "hanazono-inari-shrine-banners.png",
    "hand-holding-japanese-temple-charm.png",
    "japanese-shrine-incense-burner.png",
    "sensoji-temple-japanese-signboard.png",
    "tokyo-urban-street-intersection.png",
    "tokyo-night-shopping-street.png",
    "night-city-view-observatory-couple.jpeg",
    "two-people-outdoors-near-building.jpeg",
    "friends-on-observation-deck.png",
    "group-city-night-view.jpeg",
    "two-people-city-night-view.jpeg",
    "modern-city-intersection-buildings.png",
    "ginza-six-shopping-center.png",
    "tokyo-business-district-parkway.png",
    "rainy-japanese-city-street-night.png",
    "modern-cube-building-exterior.png",
    "urban-plaza-with-tall-buildings.png",
    "tokyo-urban-train-overpass.png",
    "tokyo-street-with-crane.png",
    "tokyo-anime-district-nightscape.png",
    "yokohama-landmark-tower-skyline.png",
    "wizard-robe-by-display-case.jpeg",
    "harry-potter-undesirable-no-1-poster.png",
    "harry-potter-poster-display.png",
    "wizard-stirring-glowing-cauldron.jpeg",
    "nike-shoes-in-open-boxes.png",
    "folded-puffer-jacket-and-pants.png",
    "black-backpack-and-khaki-pants.png",
    "packaged-bape-crewneck-shirt.png",
    "atmo-black-shirts-packaged.png",
    "uniqlo-kaws-graphic-tshirts.png",
    "paris-saint-germain-clothing-set.png",
    "arcteryx-black-jackets-folded.png",
    "harry-potter-souvenir-items.png",
    "japanese-snack-boxes-on-carpet-2.png",
    "japanese-healthcare-products-flatlay.png",
    "three-ceramic-kitchen-knives.png",
    "japanese-eye-and-cold-medicines.png",
    "japanese-snack-boxes-on-carpet.png",
    "korean-skincare-products-flatlay.png",
  ]);
});

test("preserves the complete bilingual Kansai 2024 document and image set", () => {
  const { source, document } = readTripDocument("japan-kansai-2024");
  const zhSections = deriveTripEntrySections(document, "zh");
  const enSections = deriveTripEntrySections(document, "en");

  assert.equal(document.pages.length, 13);
  assert.equal(document.sections.length, 13);
  assert.equal(zhSections.length, 13);
  assert.equal(enSections.length, 13);
  assert.equal(document.metadata.private, true);
  assert.equal(document.metadata.coverImageId, "cover-2026-08");
  assert.equal(document.pages[0].cardVariant, "inset-cover");
  assert.equal(zhSections[0].label, "关西 ·\n樱灯、魔法与抹茶");
  assert.equal(enSections[12].label, "Six days, one ledger, many bags");
  assert.match(source, /31,092 CNY/);
  assert.match(source, /8,656 CNY/);
  assert.match(source, /超级美/);
  assert.match(source, /really was “stunning,”/);
  assertCompleteImageReferences(document, [
    "kyoto-temple-and-tower.jpg",
    "japanese-temple-garden-pond.jpg",
    "busy-city-nightlife-selfie.jpeg",
    "korean-bbq-table-grill.jpg",
    "japanese-izakaya-drinks-toast.jpg",
    "hogwarts-castle-turrets.jpg",
    "universal-studios-japan-nintendo-world-tickets.jpg",
    "palm-lined-city-street-scene.jpg",
    "doraemon-adventureland-entrance-signs.jpg",
    "sesame-street-central-park-mascot.jpg",
    "usj-concrete-attraction-building.jpg",
    "super-mario-mushroom-kingdom-castle.jpg",
    "super-nintendo-world-entrance.jpeg",
    "friends-in-bunny-hats.jpeg",
    "cookie-monster-restaurant-sign.jpg",
    "shinkyogoku-shopping-arcade-kyoto.jpg",
    "grilled-eel-rice-bowl-meal.jpg",
    "illuminated-pagoda-cherry-blossoms-night.jpg",
    "cherry-blossoms-around-temple-at-night.jpg",
    "illuminated-japanese-pagoda-night.jpg",
    "traditional-japanese-teahouse-entrance.jpg",
    "japanese-garden-shrine-altar.jpg",
    "night-temple-selfie-japan.jpeg",
    "kyoto-okonomiyaki-restaurant-sign.jpg",
    "human-made-store-mirror.jpg",
    "two-people-by-cat-mural.jpeg",
    "cat-mural-under-pine-tree.jpg",
    "hanshin-railway-umeda-station-sign.jpg",
    "the-north-face-store-display.jpg",
    "narrow-japanese-residential-street.jpg",
    "barista-behind-coffee-counter.jpg",
    "person-reading-on-park-bench.jpg",
    "japanese-shrine-torii-gate.jpg",
    "river-dam-and-wooded-hills.jpg",
    "two-people-by-riverside.jpeg",
    "japanese-temple-garden-pond.jpg",
    "weathered-wooden-building-japan-street.jpg",
    "white-stucco-cafe-exterior-planter.jpg",
    "urban-office-building-street-traffic.jpg",
    "holding-passionfruit-drinks-outdoors.jpg",
    "cover-2026-08.jpeg",
  ]);
});

test("preserves the complete bilingual Seoul 2023 document and image set", () => {
  const { source, document } = readTripDocument("seoul-2023");
  const zhSections = deriveTripEntrySections(document, "zh");
  const enSections = deriveTripEntrySections(document, "en");

  assert.equal(document.pages.length, 11);
  assert.equal(document.sections.length, 11);
  assert.equal(zhSections.length, 11);
  assert.equal(enSections.length, 11);
  assert.equal(document.metadata.private, true);
  assert.equal(document.metadata.coverImageId, "cover-2026-08");
  assert.equal(document.pages[0].cardVariant, "inset-cover");
  assert.equal(zhSections[0].label, "首尔，\n雪坡霓虹跨年夜");
  assert.equal(enSections[10].label, "Seoul Shops Brilliantly—and Rewards Preparation");
  assert.match(source, /3,500 \/ 3,600 韩币/);
  assert.match(source, /KRW 3,500 \/ 3,600/);
  assert.match(source, /向鸡家/);
  assert.match(source, /Xiangjijia/);
  assertCompleteImageReferences(document, [
    "20-seoul-attractions-map.webp",
    "22-hotel-location-map.webp",
    "23-incheon-airport-route.webp",
    "01-hongdae-night-street.webp",
    "02-neon-night-street.webp",
    "03-hongdae-shopping-map.webp",
    "06-seoul-cityscape.webp",
    "07-namsan-tower-city-view.webp",
    "08-snowy-city-buildings.webp",
    "10-snowy-city-bus.webp",
    "04-snowy-city-friends.webp",
    "05-city-overlook-friends.webp",
    "09-wanta-store-group.webp",
    "11-gyeongbokgung-poster.webp",
    "19-gyeongbokgung-light-show.webp",
    "18-designer-toy-citywalk.webp",
    "12-new-year-fireworks.webp",
    "13-namsan-hike-friends.webp",
    "14-namsan-tower-hillside.webp",
    "15-namsan-hillside-road.webp",
    "16-snowy-winter-trail.webp",
    "17-winter-park-path.webp",
    "21-seoul-four-day-guide.webp",
    "cover-2026-08.jpeg",
  ]);
});
