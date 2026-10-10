import assert from "node:assert/strict";
import test from "node:test";
import { runInNewContext } from "node:vm";
import { auditLayout } from "./audit_layout.mjs";

function setup({ frames = [{ x: 200, y: 100, width: 300, height: 200 }, { x: 516, y: 100, width: 300, height: 200 }],
  viewport = 1440, treatment = "contain", fit = "contain", overflow = false, loaded = true, layout = "two" } = {}) {
  const ownerDocument = {
    baseURI: "http://127.0.0.1:3000/zh/trips/example/",
    documentElement: { scrollWidth: overflow ? viewport + 40 : viewport },
    defaultView: { innerWidth: viewport, getComputedStyle: () => ({ objectFit: fit }), setTimeout, clearTimeout },
  };
  const card = { getBoundingClientRect: () => ({ x: 100, y: 0, width: 816, height: 800 }) };
  const images = frames.map((frame, index) => {
    const attributes = new Map([["src", `/p-${index}.webp`]]);
    return {
      complete: loaded, naturalWidth: loaded ? 1200 : 0, naturalHeight: loaded ? 800 : 0,
      loading: "lazy",
      get src() {
        const source = this.getAttribute("src");
        if (source === null) return "";
        return URL.canParse(source, ownerDocument.baseURI) ? new URL(source, ownerDocument.baseURI).href : source;
      },
      set src(source) { this.setAttribute("src", source); },
      getAttribute: (name) => attributes.get(name) ?? null,
      setAttribute: (name, value) => attributes.set(name, String(value)),
      removeAttribute: (name) => attributes.delete(name),
      getBoundingClientRect: () => frame,
    };
  });
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
  return { options: { selection, locale: "zh" }, images, ownerDocument };
}

test("complete equal contained frames pass in the rendered reading axis", async () => {
  const report = await auditLayout(setup().options);
  assert.deepEqual(report.errors, []);
  assert.deepEqual(report.measurements[0].columnsPerRow, [2]);
});

test("unequal rendered heights and crop mismatch fail even with correct JSON", async () => {
  const report = await auditLayout(setup({
    frames: [{ x: 200, y: 100, width: 300, height: 200 }, { x: 516, y: 100, width: 300, height: 300 }],
    fit: "cover",
  }).options);
  assert.ok(report.errors.some((error) => error.includes("more than 2px")));
  assert.ok(report.errors.some((error) => error.includes("cropped/stretched")));
});

test("two-pixel peer tolerance passes; three-pixel differences fail", async () => {
  for (const difference of [2, 3]) {
    const report = await auditLayout(setup({
      frames: [{ x: 200, y: 100, width: 300, height: 200 }, { x: 516, y: 100, width: 300, height: 200 + difference }],
    }).options);
    assert.equal(report.errors.some((error) => error.includes("more than 2px")), difference > 2);
  }
});

test("lazy images are decoded eagerly with their loading policy restored", async () => {
  const { options, images } = setup();
  for (const [index, image] of images.entries()) {
    image.loading = index === 0 ? "lazy" : "";
    image.decode = async () => { assert.equal(image.loading, "eager"); };
  }
  const report = await auditLayout(options);
  assert.deepEqual(report.errors, []);
  assert.deepEqual(images.map((image) => image.loading), ["lazy", ""]);
});

test("deferred sources are populated before eager decoding and loading policies are restored", async () => {
  const { options, images, ownerDocument } = setup({ loaded: false });
  const decoded = [];
  for (const [index, image] of images.entries()) {
    const source = index === 0 ? `/p-${index}.webp` : `http://127.0.0.1:3000/p-${index}.webp`;
    image.removeAttribute("src");
    image.setAttribute("data-deferred-src", ` ${source} `);
    image.loading = index === 0 ? "lazy" : "eager";
    image.decode = async () => {
      assert.equal(image.loading, "eager");
      assert.equal(image.getAttribute("src"), source);
      assert.equal(image.src, new URL(source, ownerDocument.baseURI).href);
      decoded.push(index);
      image.complete = true;
      image.naturalWidth = 1200;
      image.naturalHeight = 800;
    };
  }
  const report = await auditLayout(options);
  assert.deepEqual(report.errors, []);
  assert.deepEqual(decoded, [0, 1]);
  assert.deepEqual(images.map((image) => image.loading), ["lazy", "eager"]);
  assert.deepEqual(report.measurements[0].columnsPerRow, [2]);
});

test("source activation uses DOM attributes, not a normalized src property or inherited dataset value", async () => {
  const { options, images, ownerDocument } = setup({ loaded: false });
  for (const [index, image] of images.entries()) {
    const source = `/p-${index}.webp`;
    const src = Object.getOwnPropertyDescriptor(image, "src");
    image.removeAttribute("src");
    image.setAttribute("data-deferred-src", source);
    image.dataset = Object.create({ deferredSrc: "/wrong.webp" });
    Object.defineProperty(image, "src", {
      get() { return this.getAttribute("src") === null ? ownerDocument.baseURI : src.get.call(this); },
      set: src.set,
    });
    image.decode = async () => {
      assert.equal(image.getAttribute("src"), source);
      assert.equal(image.loading, "eager");
      image.complete = true;
      image.naturalWidth = 1200;
      image.naturalHeight = 800;
    };
  }
  const report = await auditLayout(options);
  assert.deepEqual(report.errors, []);
  assert.ok(images.every((image) => image.loading === "lazy"));
});

test("serialized audit activates deferred images using only the rendered document and window", async () => {
  const { options, images, ownerDocument } = setup({ loaded: false });
  const timers = [];
  const cleared = [];
  ownerDocument.defaultView.setTimeout = (callback, delay) => {
    assert.equal(delay, 15000);
    const timer = setTimeout(callback, delay);
    timers.push(timer);
    return timer;
  };
  ownerDocument.defaultView.clearTimeout = (timer) => {
    cleared.push(timer);
    clearTimeout(timer);
  };
  for (const [index, image] of images.entries()) {
    image.removeAttribute("src");
    image.setAttribute("data-deferred-src", `/p-${index}.webp`);
    image.decode = async () => {
      assert.equal(image.getAttribute("src"), `/p-${index}.webp`);
      assert.equal(image.loading, "eager");
      image.complete = true;
      image.naturalWidth = 1200;
      image.naturalHeight = 800;
    };
  }
  const serializedAudit = runInNewContext(`(${auditLayout.toString()})`, { document, URL });
  const report = await serializedAudit(options);
  assert.equal(report.errors.length, 0);
  assert.equal(timers.length, 2);
  assert.deepEqual(cleared, timers);
  assert.ok(images.every((image) => image.loading === "lazy"));
});

test("missing, blank, and malformed deferred sources remain explicit audit failures", async (t) => {
  for (const source of [null, "", " \t\n ", "http://["]) {
    await t.test(`deferred source ${JSON.stringify(source)}`, async () => {
      const { options, images } = setup({ loaded: false });
      let decodeCalls = 0;
      for (const image of images) {
        image.removeAttribute("src");
        if (source !== null) image.setAttribute("data-deferred-src", source);
        image.decode = async () => {
          decodeCalls++;
          assert.equal(image.loading, "eager");
          throw new Error("No decodable image source");
        };
      }
      const report = await auditLayout(options);
      assert.equal(report.errors.filter((error) => error.includes("failed to decode/load")).length, 2);
      assert.equal(report.errors.filter((error) => error.includes("not fully loaded")).length, 2);
      assert.equal(decodeCalls, source === "http://[" ? 0 : 2);
      assert.ok(images.every((image) => image.getAttribute("src") === null && image.loading === "lazy"));
    });
  }
});

test("a deferred source that fails decoding is not reported as loaded and restores loading", async () => {
  const { options, images } = setup({ loaded: false });
  for (const [index, image] of images.entries()) {
    image.removeAttribute("src");
    image.setAttribute("data-deferred-src", `/p-${index}.webp`);
    image.loading = index === 0 ? "lazy" : "";
    image.decode = async () => {
      assert.equal(image.getAttribute("src"), `/p-${index}.webp`);
      assert.equal(image.loading, "eager");
      throw new Error("Image request failed");
    };
  }
  const report = await auditLayout(options);
  assert.deepEqual(report.errors.filter((error) => error.includes("failed to decode/load")), [
    "Image failed to decode/load: http://127.0.0.1:3000/p-0.webp",
    "Image failed to decode/load: http://127.0.0.1:3000/p-1.webp",
  ]);
  assert.equal(report.errors.filter((error) => error.includes("not fully loaded")).length, 2);
  assert.deepEqual(images.map((image) => image.loading), ["lazy", ""]);
});

test("deferred image decode timeouts use the frame window and restore loading", async () => {
  const { options, images, ownerDocument } = setup({ loaded: false });
  const timers = [];
  const cleared = [];
  ownerDocument.defaultView.setTimeout = (callback, delay) => {
    assert.equal(delay, 15000);
    const timer = { callback };
    timers.push(timer);
    queueMicrotask(callback);
    return timer;
  };
  ownerDocument.defaultView.clearTimeout = (timer) => { cleared.push(timer); };
  for (const [index, image] of images.entries()) {
    image.removeAttribute("src");
    image.setAttribute("data-deferred-src", `/p-${index}.webp`);
    image.decode = () => {
      assert.equal(image.loading, "eager");
      assert.equal(image.getAttribute("src"), `/p-${index}.webp`);
      return new Promise(() => {});
    };
  }
  const report = await auditLayout(options);
  assert.equal(report.errors.filter((error) => error.includes("failed to decode/load")).length, 2);
  assert.equal(report.errors.filter((error) => error.includes("not fully loaded")).length, 2);
  assert.equal(timers.length, 2);
  assert.deepEqual(cleared, timers);
  assert.ok(images.every((image) => image.loading === "lazy"));
});

test("already-populated sources are preserved even if their deferred declarations differ", async () => {
  const { options, images } = setup();
  for (const [index, image] of images.entries()) {
    image.setAttribute("data-deferred-src", "/wrong.webp");
    image.decode = async () => {
      assert.equal(image.getAttribute("src"), `/p-${index}.webp`);
      assert.equal(image.loading, "eager");
    };
  }
  const report = await auditLayout(options);
  assert.deepEqual(report.errors, []);
  assert.ok(images.every((image) => image.loading === "lazy"));
});

test("a pre-existing mismatching src is not repaired from the approved deferred source", async () => {
  const { options, images } = setup();
  images[0].src = "/wrong.webp";
  images[0].setAttribute("data-deferred-src", "/p-0.webp");
  images[0].decode = async () => {
    assert.equal(images[0].getAttribute("src"), "/wrong.webp");
    assert.equal(images[0].loading, "eager");
  };
  const report = await auditLayout(options);
  assert.deepEqual(report.errors, ["row-one: image 1 does not match approved ID p-0"]);
  assert.equal(images[0].getAttribute("src"), "/wrong.webp");
  assert.equal(images[0].loading, "lazy");
});

test("an explicit empty src is preserved rather than hiding an unusable rendered image", async () => {
  const { options, images } = setup({ loaded: false });
  for (const [index, image] of images.entries()) {
    image.src = "";
    image.setAttribute("data-deferred-src", `/p-${index}.webp`);
    image.decode = async () => {
      assert.equal(image.getAttribute("src"), "");
      assert.equal(image.loading, "eager");
      throw new Error("Empty source");
    };
  }
  const report = await auditLayout(options);
  assert.equal(report.errors.filter((error) => error.includes("failed to decode/load")).length, 2);
  assert.equal(report.errors.filter((error) => error.includes("not fully loaded")).length, 2);
  assert.ok(images.every((image) => image.getAttribute("src") === "" && image.loading === "lazy"));
});

test("unloaded images and document overflow fail", async () => {
  const report = await auditLayout(setup({ loaded: false, overflow: true }).options);
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
  }).options);
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
  }).options);
  assert.deepEqual(report.errors, []);
  assert.deepEqual(report.measurements[0].columnsPerRow, [1, 1, 1]);
});
