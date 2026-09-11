import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import test from "node:test";
import {
  deriveTripEntrySections,
  parseTripDocument,
  tripDocumentToMeta,
} from "../../../lib/trip-document.ts";
import { tripImage } from "../../../lib/blob.ts";

const document = parseTripDocument(
  JSON.parse(readFileSync(new URL("./content.json", import.meta.url), "utf8"))
);
const blocks = document.pages.flatMap((page) => page.blocks);
const galleries = blocks.filter((block) => block.type === "gallery");

// Frozen v3 selection order; source IDs remain stable despite schema-required lowercase IDs.
const approvedPairs = [
  ["d1-01", "P003", "P008", "square", "16:20", "16:52"],
  ["d1-02", "P014", "P017", "portrait", "18:45", "18:45"],
  ["d1-03", "P020", "P023", "landscape", "18:58", "19:10"],
  ["d1-08", "P028", "P031", "square", "19:18", "19:46"],
  ["d1-04", "P030", "P056", "portrait", "19:43", "20:54"],
  ["d1-05", "P043", "P054", "portrait", "20:22", "20:50"],
  ["d1-09", "P068", "P069", "portrait", "21:20", "21:22"],
  ["d1-06", "P049", "P075", "square", "20:35", "21:43"],
  ["d1-07", "P078", "P079", "portrait", "22:42", "22:43"],
  ["d2-01", "P082", "P084", "square", "12:19", "12:44"],
  ["d2-10", "P089", "P106", "square", "14:58", "15:10"],
  ["d2-02", "P091", "P093", "square", "15:02", "15:03"],
  ["d2-03", "P097", "P098", "portrait", "15:03", "15:04"],
  ["d2-11", "P107", "P117", "portrait", "15:11", "15:16"],
  ["d2-04", "P124", "P130", "square", "15:22", "15:26"],
  ["d2-12", "P133", "P138", "portrait", "15:28", "15:31"],
  ["d2-13", "P140", "P145", "portrait", "15:39", "15:50"],
  ["d2-05", "P149", "P156", "portrait", "15:52", "15:59"],
  ["d2-06", "P142", "P158", "portrait", "15:42", "16:04"],
  ["d2-07", "P159", "P162", "portrait", "16:05", "16:08"],
  ["d2-14", "P161", "P169", "portrait", "16:06", "16:22"],
  ["d2-08", "P172", "P173", "portrait", "16:31", "16:31"],
  ["d2-09", "P174", "P177", "portrait", "16:41", "16:48"],
];
const approvedIds = approvedPairs.flatMap(([, left, right]) =>
  [left, right].map((id) => id.toLowerCase())
);

test("Taizhou stays private with the approved name, dates and P023 scene-setting cover", () => {
  const meta = tripDocumentToMeta(document, (filename) => tripImage(document.slug, filename));
  assert.equal(document.slug, "taizhou-2025");
  assert.equal(meta.private, true);
  assert.equal(meta.date, "2025-04-12");
  assert.equal(meta.dateRange, "2025.04.12 — 04.13");
  assert.deepEqual(meta.title, {
    zh: "台州：一夜灯海，一寺春光",
    en: "Taizhou: Stage Lights and Temple Spring",
  });
  assert.equal(document.metadata.coverImageId, "p023");
  assert.equal(meta.coverImage, "https://junjieblob.blob.core.windows.net/images/travel/taizhou-2025/p023.webp");
  const [cover] = document.pages[0].blocks;
  assert.equal(cover.type, "cover");
  assert.deepEqual(cover.title, meta.title);
  assert.equal(cover.backgroundImageId, "p023");
  assert.equal(document.pages[0].blocks.length, 1);
  assert.match(readFileSync(new URL("./meta.ts", import.meta.url), "utf8"), /private:\s*document\.metadata\.private/);
});

test("all 46 unique photos appear once in the 23 approved pairs, with matching frame ratios", () => {
  assert.equal(document.images.length, 46);
  assert.equal(new Set(approvedIds).size, 46);
  assert.deepEqual(document.images.map((image) => image.id), approvedIds);
  assert.deepEqual(document.images.map((image) => image.filename), approvedIds.map((id) => `${id}.webp`));
  assert.equal(galleries.length, 23);
  assert.deepEqual(galleries.map((gallery) => gallery.id), approvedPairs.map(([id]) => id));
  assert.deepEqual(galleries.flatMap((gallery) => gallery.images.map((image) => image.imageId)), approvedIds);
  for (const [index, gallery] of galleries.entries()) {
    const [, left, right, shape, leftTime, rightTime] = approvedPairs[index];
    assert.equal(gallery.layout, "two");
    assert.deepEqual(gallery.images.map((image) => image.imageId), [left.toLowerCase(), right.toLowerCase()]);
    assert.equal(gallery.images.length, 2);
    for (const [column, image] of gallery.images.entries()) {
      assert.equal(image.shape, shape, "Both previews in a pair must use the same authored frame ratio");
      assert.equal(image.focus, undefined, "Use the shared centered, symmetrical preview crop");
      assert.equal(image.tone, undefined, "Do not recolor the approved photographs");
      for (const locale of ["zh", "en"]) {
        assert.ok(image.caption[locale]);
        assert.equal(image.caption[locale].split("\n").at(-1), [leftTime, rightTime][column]);
      }
    }
  }
});

test("day boundaries, chapter meaning and bilingual renderer wiring stay aligned", () => {
  const sectionIds = ["overview", "day-1", "day-2", "afterword"];
  assert.deepEqual([...new Set(document.pages.map((page) => page.sectionId))], sectionIds);
  for (const [sectionId, prefix, count] of [["day-1", "d1-", 18], ["day-2", "d2-", 28]]) {
    const pairs = document.pages.filter((page) => page.sectionId === sectionId)
      .flatMap((page) => page.blocks).filter((block) => block.type === "gallery");
    assert.equal(pairs.flatMap((pair) => pair.images).length, count);
    assert.ok(pairs.every((pair) => pair.id.startsWith(prefix)));
  }
  for (const locale of ["zh", "en"]) {
    assert.deepEqual(deriveTripEntrySections(document, locale).map((section) => section.id), sectionIds);
    const entry = readFileSync(new URL(`./${locale}.tsx`, import.meta.url), "utf8");
    assert.ok(entry.includes(`createTripLocale(document, "${locale}", img)`));
    assert.match(entry, /export const sections = trip\.sections/);
    assert.match(entry, /className=\{styles\.entry\}/);
    assert.doesNotMatch(entry, /CardScaleController|TripEntryLayout|https?:\/\//);
    assert.ok(document.images.every((image) => image.alt[locale].length > 0));
  }
});

test("all 25 approved Chinese prose paragraphs remain verbatim and in order", () => {
  const paragraphs = blocks.filter((block) => block.type === "prose")
    .flatMap((block) => block.paragraphs.map((paragraph) => paragraph.zh));
  assert.equal(paragraphs.length, 25);
  assert.equal(
    createHash("sha256").update(paragraphs.join("\n\n")).digest("hex"),
    "5c68d8018673e4c216c9a5516bd228b6881a29ac4913dcd2a2c520608bb36eee"
  );
});

test("confirmed facts and uncertain meals, songs and transport survive in both locales", () => {
  const block = (id) => blocks.find((item) => item.id === id);
  assert.match(block("before-the-show-story").paragraphs[1].en, /Hilton Taizhou, the one near the stadium/);
  assert.match(block("day-1-route").items[2].event.zh, /台州市体育中心体育场/);
  assert.match(block("day-1-route").items[2].event.en, /Taizhou Sports Center Stadium/);
  assert.match(block("late-night-story").paragraphs[0].zh, /我记得，散场后应该是去了西塔老太太/);
  assert.match(block("late-night-story").paragraphs[0].en, /As I recall, we probably went to Xita Laotaitai/);
  const songText = block("favorite-songs").paragraphs[0];
  assert.match(songText.zh, /这场演唱会之后，我很喜欢/);
  assert.match(songText.en, /After this concert, I really liked/);
  for (const locale of ["zh", "en"]) {
    assert.match(songText[locale], /绿旋风/);
    assert.match(songText[locale], /光芒/);
    assert.match(block("transport-note").body[locale], /17:06/);
    for (const id of ["p028", "p031", "p068", "p069"]) {
      const image = document.images.find((item) => item.id === id);
      const item = galleries.flatMap((gallery) => gallery.images).find((item) => item.imageId === id);
      assert.match(image.alt[locale], locale === "zh" ? /玲花/ : /Linghua/);
      assert.match(item.caption[locale], locale === "zh" ? /玲花/ : /Linghua/);
      assert.doesNotMatch(item.caption[locale], /绿旋风|光芒|Lü Xuanfeng|Guang Mang/);
    }
  }
  assert.match(block("transport-note").body.zh, /具体乘车方式、之后的返程待补/);
  assert.match(block("transport-note").body.en, /exact transport.*return journey are still to be filled in/);
  assert.match(block("coffee-table-story").paragraphs[0].zh, /等补上记忆再写/);
  assert.match(block("coffee-table-story").paragraphs[0].en, /can wait until I remember/);
  assert.match(block("pairing-note").body.zh, /不表示同时拍摄，也不完全按拍摄时刻排列/);
  assert.match(block("pairing-note").body.en, /not simultaneous moments or strict capture-time order/);
  assert.match(block("song-photo-note").body.en, /do not identify which song/);
  assert.ok(blocks.every((item) => item.type !== "expense"));
});

test("the document contains no original file paths, raw metadata or local preview URLs", () => {
  const source = JSON.stringify(document);
  assert.doesNotMatch(source, /\/Users\/|IMG_\d+|sourceSha256|sourcePath|GPSLatitude|GPSLongitude|localhost|127\.0\.0\.1/);
});

test("both locales distinguish cropped previews from the full-photo lightbox", () => {
  const note = blocks.find((block) => block.id === "pairing-note").body;
  assert.match(note.zh, /居中对称的裁剪预览图，点击可查看完整照片/);
  assert.match(note.en, /centered, symmetrically cropped previews; click to view the full photo/);
  assert.doesNotMatch(note.zh, /留边/);
  assert.doesNotMatch(note.en, /Padding/);
});

test("both days use chronological shared timelines instead of numbered route tiles", () => {
  assert.ok(blocks.every((block) => block.type !== "route"));
  const timelines = blocks.filter((block) => block.type === "timeline");
  assert.deepEqual(timelines.map((block) => block.id), ["day-1-route", "day-2-route"]);
  assert.deepEqual(timelines[0].items.map((item) => item.id), ["station", "hilton", "stadium", "late-meal", "hotel-return"]);
  assert.deepEqual(timelines[1].items.map((item) => item.id), ["lunch", "tiantai", "guoqing", "sanmu"]);
  assert.deepEqual(timelines[0].items.map((item) => item.time.zh), ["下午", "入住后", "傍晚至夜间", "散场后", "夜里"]);
  assert.deepEqual(timelines[1].items.map((item) => item.time.zh), ["中午", "午饭后", "下午", "随后"]);
  for (const timeline of timelines) {
    for (const item of timeline.items) {
      for (const locale of ["zh", "en"]) {
        assert.ok(item.time[locale] && item.event[locale] && item.detail[locale]);
        assert.doesNotMatch(item.time[locale], /\d/, "Do not invent precise times or number the phases");
      }
    }
  }
  assert.match(timelines[0].items[3].detail.zh, /记得应该/);
  assert.match(timelines[0].items[3].detail.en, /Probably.*as I recall/);
  assert.match(timelines[1].items[1].detail.en, /transport is still to be filled in/);
  assert.match(timelines[1].items[3].detail.en, /return journey is still unrecorded/);
});
