import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { deriveTripEntrySections, parseTripDocument, tripDocumentToMeta } from "../../../lib/trip-document.ts";
import { localTripImage } from "../../../lib/local-trip-images.ts";

const source = readFileSync(new URL("./content.json", import.meta.url), "utf8");
const document = parseTripDocument(JSON.parse(source));
const blocks = document.pages.flatMap((page) => page.blocks);
const approvedIds = `
p0011 p0019 p0035 p0045 p0061 p0063
p0071 p0105 p0123 p0161 p0169 p0179 p0209 p0215 p0217 p0219 p0237 p0239
p0257 p0267 p0273 p0301 p0353 p0363 p0375 p0419 p0435 p0459 p0483 p0493 p0501 p0505
p0539 p0567 p0644 p0678 p0684 p0734 p0740 p0754 p0770 p0890 p0898 p0904 p0912
p0968 p0976 p1005 p1008 p1016 p1020 p1035 p1074 p1076 p1081 p1082 p1333
p1105 p1107 p1128 p1132 p1133 p1138 p1148 p1158 p1169 p1172 p1186 p1332
p1219 p1223 p1231 p1232 p1239 p1240 p1247 p1276 p1278 p1288 p1297 p1313 p1317
p1321`.trim().split(/\s+/);
const eventIds = `
apr30-flight apr30-honmachi apr30-umeda apr30-dinner
may01-brunch may01-shops may01-cafe may01-dinner
may02-brunch may02-castle may02-shops may02-dinner
may03-sanzenin may03-kifune may03-train may03-arashiyama may03-dinner
may04-rail may04-idakiso may04-kishi may04-hiraike may04-evening
may05-airport`.trim().split(/\s+/);

test("Kansai preserves the 83-photo library and separate P1154 cover", () => {
  const photos = blocks.filter((block) => block.type === "gallery").flatMap((block) => block.images);
  assert.equal(document.images.length, 84);
  assert.equal(photos.length, 83);
  assert.deepEqual(new Set(photos.map((photo) => photo.imageId)), new Set(approvedIds));
  assert.equal(new Set(photos.map((photo) => photo.imageId)).size, 83);
  assert.equal(document.metadata.coverImageId, "p1154");
  assert.equal(document.images.find((image) => image.id === "p1154").filename, "p1154.webp");
  assert.ok(photos.some((photo) => photo.imageId === "p1016"));
  assert.ok(!photos.some((photo) => photo.imageId === "p1154"));
  assert.deepEqual(new Set(document.images.map((image) => image.id)), new Set([...approvedIds, "p1154"]));
  for (const photo of photos) {
    const asset = document.images.find((image) => image.id === photo.imageId);
    assert.equal(asset.thumbnailFilename, `${photo.imageId}-thumb.webp`);
    assert.ok(photo.caption.zh);
    assert.ok(photo.caption.en);
  }
  assert.equal(document.images.find((image) => image.id === "p1154").thumbnailFilename, undefined);
});

test("Kansai weaves all 23 events into six chronological diary chapters", () => {
  const days = ["2025-04-30", "2025-05-01", "2025-05-02", "2025-05-03", "2025-05-04", "2025-05-05"];
  assert.equal(blocks.filter((block) => block.type === "timeline").length, 0);
  assert.deepEqual(document.pages.filter((page) => page.id.endsWith("-photos")).map((page) => page.id), eventIds.map((id) => `${id}-photos`));
  assert.deepEqual(document.sections.map((section) => section.id), ["overview", ...days.map((date) => `day-${date}`)]);
  for (const locale of ["zh", "en"]) {
    assert.equal(deriveTripEntrySections(document, locale).length, 7);
  }
  for (const id of eventIds) {
    const page = document.pages.find((page) => page.id === `${id}-photos`);
    assert.ok(page);
    assert.equal(page.blocks[0].type, "header");
    assert.ok(page.blocks.some((block) => block.type === "prose"));
  }
  assert.deepEqual(days.map((date) => {
    const pages = document.pages.filter((page) => page.sectionId === `day-${date}`);
    return [
      pages.filter((page) => page.id.endsWith("-photos")).length,
      pages.flatMap((page) => page.blocks).filter((block) => block.type === "gallery").flatMap((block) => block.images).length,
    ];
  }), [[4, 6], [4, 12], [4, 14], [5, 25], [5, 25], [1, 1]]);
  assert.equal(blocks.filter((block) => block.type === "expense").length, 0);
  for (const place of ["机上餐盘", "客舱屏幕", "Travelodge", "心斋桥商店街", "丰国神社", "水占纸", "嵯峨站", "御髪神社", "曹源池", "桂川", "善 / ZEN", "天王寺站", "和歌山站", "TAMA MUSEUM", "白色 TAMA", "伊太祈曽站", "伊太祁曽神社", "平池绿地公园", "甘露寺", "国际出发大厅"]) {
    assert.ok(source.includes(place), place);
  }
  assert.doesNotMatch(source, /待确认|尚未确认|待补|补记|证据|记录窗口|完整时间线|图库出现|入选照片|not evidence|unconfirmed|not arrival|selected photos|capture time/i);
  assert.doesNotMatch(source, /大池游园|入住了|登上天守阁|乘船游/);
  assert.equal(blocks.filter((block) => block.type === "note").length, 0);
});

test("Kansai uses balanced photo rows with full-composition single images", () => {
  const galleries = blocks.filter((block) => block.type === "gallery");
  for (const gallery of galleries) {
    if (gallery.layout === "one") {
      assert.equal(gallery.images[0].shape, undefined);
    } else {
      assert.equal(new Set(gallery.images.map((image) => image.shape)).size, 1);
      assert.ok(gallery.images.every((image) => image.shape));
      assert.equal(gallery.images.length, { two: 2, three: 3, four: 4 }[gallery.layout]);
    }
  }
  const rows = (id) => document.pages.find((page) => page.id === `${id}-photos`).blocks
    .filter((block) => block.type === "gallery").map((block) => [block.images[0].shape, block.images.map((image) => image.imageId)]);
  assert.deepEqual(rows("may01-shops"), [
    ["square", ["p0105", "p0123"]],
    ["portrait", ["p0161", "p0169", "p0179"]],
  ]);
  assert.deepEqual(rows("may02-castle"), [
    ["wide", ["p0353", "p0459"]],
    ["portrait", ["p0375", "p0363", "p0419", "p0435"]],
  ]);
  assert.deepEqual(rows("may03-arashiyama").at(-1), ["square", ["p1074", "p1076"]], "A wide crop would lose the waterbird");
  assert.deepEqual(rows("may04-idakiso")[1], ["portrait", ["p1169", "p1172"]], "Keep both full-body station portraits");
  assert.ok(galleries.flatMap((block) => block.images).every((image) => !/^\d\d:\d\d:\d\d/.test(image.caption.zh)));
});

test("Kansai metadata and both locales share the private structured presentation", () => {
  const meta = tripDocumentToMeta(document, (filename) => `test:${filename}`);
  assert.equal(meta.private, true);
  assert.equal(meta.style, "photo-story");
  assert.equal(meta.date, "2025-04-30");
  assert.equal(meta.dateRange, "2025.04.30 — 2025.05.05");
  assert.deepEqual(blocks[0].title, document.metadata.title);
  assert.equal(blocks[0].backgroundImageId, "p1154");
  assert.equal(document.pages[0].blocks.length, 1);
  for (const locale of ["zh", "en"]) {
    assert.match(readFileSync(new URL(`./${locale}.tsx`, import.meta.url), "utf8"), new RegExp(`createTripLocale\\(document, "${locale}", img\\)`));
  }
  assert.match(readFileSync(new URL("../../../lib/trips.ts", import.meta.url), "utf8"), /kansai2025Meta/);
  assert.doesNotMatch(source, /\/Users\/|GPS|source_sha256|localhost|127\.0\.0\.1|blob\.core/);
});

test("local image previews require an explicit development-only loopback mapping", () => {
  const options = { mode: "development", slug: "kansai-2025", origin: "http://127.0.0.1:4382" };
  assert.equal(localTripImage("kansai-2025", "p1154.webp", options), "http://127.0.0.1:4382/kansai-2025/p1154.webp");
  assert.equal(localTripImage("phuket-2026", "p1154.webp", options), undefined);
  assert.equal(localTripImage("kansai-2025", "p1154.webp", { ...options, mode: "production" }), undefined);
  assert.equal(localTripImage("kansai-2025", "p1154.webp", { ...options, origin: "" }), undefined);
  for (const origin of ["https://example.com", "http://localhost:4382", "http://127.0.0.1:4382/path", "http://user:password@127.0.0.1:4382", "http://127.0.0.1:4382?x=1"]) {
    assert.throws(() => localTripImage("kansai-2025", "p1154.webp", { ...options, origin }));
  }
  assert.throws(() => localTripImage("kansai-2025", "../photo.webp", options));
});
