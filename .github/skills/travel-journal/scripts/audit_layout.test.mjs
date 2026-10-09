import assert from "node:assert/strict";
import test from "node:test";
import { auditLayout } from "./audit_layout.mjs";

function setup({ frames = [{ x: 200, y: 100, width: 300, height: 200 }, { x: 516, y: 100, width: 300, height: 200 }],
  viewport = 1440, treatment = "contain", fit = "contain", overflow = false, loaded = true, layout = "two" } = {}) {
  const ownerDocument = {
    baseURI: "http://127.0.0.1:3000/zh/trips/example/",
    documentElement: { scrollWidth: overflow ? viewport + 40 : viewport },
    defaultView: { innerWidth: viewport, getComputedStyle: () => ({ objectFit: fit }), setTimeout, clearTimeout },
  };
  const card = { getBoundingClientRect: () => ({ x: 100, y: 0, width: 816, height: 800 }) };
  const images = frames.map((frame, index) => ({
    complete: loaded, naturalWidth: loaded ? 1200 : 0, naturalHeight: loaded ? 800 : 0,
    src: `http://127.0.0.1:3000/p-${index}.webp`,
    getBoundingClientRect: () => frame,
  }));
  const gallery = {
    getBoundingClientRect: () => ({ x: 200, y: 100, width: 616, height: 600 }),
    querySelectorAll: () => images,
    closest: (selector) => selector === ".card" ? card : { getAttribute: () => "day-one" },
  };
  const content = { querySelectorAll: (selector) => selector === ".pgrid" ? [gallery] : [] };
  const root = { ownerDocument, lang: "zh-CN", querySelector: () => content };
  globalThis.document = { querySelector: () => root };
  const selection = { selectionRows: [{
    id: "row-one", sectionId: "day-one", layout, treatment, photoIds: frames.map((frame, index) => `p-${index}`),
  }] };
  return { selection, locale: "zh" };
}

test("complete equal contained frames pass in the rendered reading axis", async () => {
  const report = await auditLayout(setup());
  assert.deepEqual(report.errors, []);
  assert.deepEqual(report.measurements[0].columnsPerRow, [2]);
});

test("unequal rendered heights and crop mismatch fail even with correct JSON", async () => {
  const report = await auditLayout(setup({
    frames: [{ x: 200, y: 100, width: 300, height: 200 }, { x: 516, y: 100, width: 300, height: 300 }],
    fit: "cover",
  }));
  assert.ok(report.errors.some((error) => error.includes("more than 2px")));
  assert.ok(report.errors.some((error) => error.includes("cropped/stretched")));
});

test("two-pixel peer tolerance passes; three-pixel differences fail", async () => {
  for (const difference of [2, 3]) {
    const report = await auditLayout(setup({
      frames: [{ x: 200, y: 100, width: 300, height: 200 }, { x: 516, y: 100, width: 300, height: 200 + difference }],
    }));
    assert.equal(report.errors.some((error) => error.includes("more than 2px")), difference > 2);
  }
});

test("lazy images are decoded eagerly with their loading policy restored", async () => {
  const options = setup();
  const images = document.querySelector().querySelector().querySelectorAll(".pgrid")[0].querySelectorAll();
  for (const image of images) {
    image.loading = "lazy";
    image.decode = async () => { assert.equal(image.loading, "eager"); };
  }
  const report = await auditLayout(options);
  assert.deepEqual(report.errors, []);
  assert.ok(images.every((image) => image.loading === "lazy"));
});

test("unloaded images and document overflow fail", async () => {
  const report = await auditLayout(setup({ loaded: false, overflow: true }));
  assert.ok(report.errors.some((error) => error.includes("not fully loaded")));
  assert.ok(report.errors.includes("Horizontal overflow"));
});

test("phone three-image rows must actually stack", async () => {
  const report = await auditLayout(setup({
    layout: "three", viewport: 390,
    frames: [
      { x: 0, y: 100, width: 100, height: 150 },
      { x: 110, y: 100, width: 100, height: 150 },
      { x: 220, y: 100, width: 100, height: 150 },
    ],
  }));
  assert.ok(report.errors.some((error) => error.includes("must stack")));
});

test("phone stacking passes peer-frame checks while preserving source order", async () => {
  const report = await auditLayout(setup({
    layout: "three", viewport: 390,
    frames: [
      { x: 200, y: 100, width: 300, height: 200 },
      { x: 200, y: 316, width: 300, height: 200 },
      { x: 200, y: 532, width: 300, height: 200 },
    ],
  }));
  assert.deepEqual(report.errors, []);
  assert.deepEqual(report.measurements[0].columnsPerRow, [1, 1, 1]);
});
