import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { registerHooks } from "node:module";
import test from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import ts from "typescript";
import { parseTripDocument } from "../lib/trip-document.ts";

const rendererUrl = new URL("./TripDocumentRenderer.tsx", import.meta.url);
const hooks = registerHooks({
  resolve(specifier, context, nextResolve) {
    return nextResolve(
      specifier === "@/lib/trip-document"
        ? new URL("../lib/trip-document.ts", import.meta.url).href
        : specifier,
      context
    );
  },
  load(url, context, nextLoad) {
    if (url !== rendererUrl.href) return nextLoad(url, context);
    return {
      format: "module",
      shortCircuit: true,
      source: ts.transpileModule(readFileSync(rendererUrl, "utf8"), {
        compilerOptions: {
          module: ts.ModuleKind.ESNext,
          jsx: ts.JsxEmit.ReactJSX,
        },
      }).outputText,
    };
  },
});
const { default: TripDocumentRenderer } = await import(rendererUrl.href);
hooks.deregister();

const beijing = parseTripDocument(JSON.parse(readFileSync(
  new URL("../content/trips/beijing-winter-awakening-2022/content.json", import.meta.url),
  "utf8"
)));

function renderGallery(gallery, locale = "en", deferImages = false) {
  return renderToStaticMarkup(createElement(TripDocumentRenderer, {
    document: {
      ...beijing,
      pages: [{ id: "gallery-page", sectionId: "overview", blocks: [gallery] }],
    },
    locale,
    imageUrl: (filename) => `/images/${filename}`,
    deferImages,
  }));
}

function readingSequence(markup) {
  return [...markup.matchAll(/<img\b([^>]*)>|<div class="(?:cap|pol-t)">/gu)]
    .map((match) => match[1] === undefined
      ? "caption"
      : /(?:src|data-deferred-src)="\/images\/([^"]*)"/u.exec(match[1])?.[1]);
}

test("gallery-level captions follow all images in serialized DOM order", () => {
  const gallery = {
    id: "shared-caption",
    type: "gallery",
    layout: "two",
    caption: { zh: "两个视角。\n第二行 & <细节>", en: "Two views.\nSecond line & <details>" },
    images: [{ imageId: "b001" }, { imageId: "b002" }],
  };
  for (const locale of ["zh", "en"]) {
    const markup = renderGallery(gallery, locale);
    assert.deepEqual(readingSequence(markup), ["b001.webp", "b002.webp", "caption"]);
    assert.match(markup, /<\/div><div class="cap">/u, "caption must be outside the image frame");
    assert.ok(markup.includes(locale === "zh"
      ? "两个视角。<br/>第二行 &amp; &lt;细节&gt;"
      : "Two views.<br/>Second line &amp; &lt;details&gt;"));
  }
});

test("legacy per-image captions retain their adjacent DOM order and frame classes", () => {
  for (const variant of ["framed", "polaroid"]) {
    const gallery = {
      id: "individual-captions",
      type: "gallery",
      layout: "two",
      variant,
      images: [
        { imageId: "b001", caption: { zh: "第一个视角", en: "First view" } },
        { imageId: "b002", caption: { zh: "第二个视角", en: "Second view" } },
      ],
    };
    const markup = renderGallery(gallery);
    assert.deepEqual(readingSequence(markup), ["b001.webp", "caption", "b002.webp", "caption"]);
    const frameClass = variant === "polaroid" ? "pol" : "pf";
    assert.equal(markup.match(new RegExp(`<div class="${frameClass}">`, "gu")).length, 2);
    assert.ok(markup.includes("First view") && markup.includes("Second view"));
    assert.doesNotMatch(markup, /<\/div><div class="cap">/u);
    assert.deepEqual(readingSequence(renderGallery({
      ...gallery,
      images: gallery.images.map(({ imageId }) => ({ imageId })),
    })), ["b001.webp", "b002.webp"]);
  }
});

test("every Beijing group caption follows every photo in both locale pages and deferred previews", () => {
  const galleries = beijing.pages.flatMap((page) => page.blocks)
    .filter((block) => block.type === "gallery");
  for (const locale of ["zh", "en"]) {
    for (const deferImages of [false, true]) {
      for (const gallery of galleries) {
        const markup = renderGallery(gallery, locale, deferImages);
        const expected = gallery.images.flatMap((item) => {
          const image = beijing.images.find((image) => image.id === item.imageId);
          return [image.filename, ...(item.caption ? ["caption"] : [])];
        });
        if (gallery.caption) expected.push("caption");
        assert.deepEqual(readingSequence(markup), expected, `${gallery.id} / ${locale} / deferred=${deferImages}`);
        if (gallery.images.length > 1) {
          assert.ok(gallery.caption, `${gallery.id} requires a gallery-level caption`);
          assert.ok(gallery.images.every((item) => !item.caption));
          assert.ok(markup.includes(renderToStaticMarkup(createElement("div", {
            className: "cap",
          }, gallery.caption[locale]))));
        }
      }
    }
  }
});

test("all journal captions render in both locales and deferred editor previews", () => {
  const root = new URL("../content/trips/", import.meta.url);
  for (const entry of readdirSync(root, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const document = parseTripDocument(JSON.parse(readFileSync(
      new URL(`${entry.name}/content.json`, root), "utf8"
    )));
    for (const locale of ["zh", "en"]) {
      for (const deferImages of [false, true]) {
        const markup = renderToStaticMarkup(createElement(TripDocumentRenderer, {
          document: {
            ...document,
            pages: document.pages.map((page) => ({
              ...page,
              blocks: page.blocks.filter((block) => block.type === "gallery"),
            })),
          },
          locale,
          imageUrl: (filename) => `/images/${filename}`,
          deferImages,
        }));
        const expected = document.pages.flatMap((page) => page.blocks)
          .filter((block) => block.type === "gallery")
          .flatMap((gallery) => {
            const sequence = gallery.images.flatMap((item) => {
              const image = document.images.find((image) => image.id === item.imageId);
              return [image.thumbnailFilename ?? image.filename, ...(item.caption ? ["caption"] : [])];
            });
            if (gallery.caption) sequence.push("caption");
            for (const caption of [
              ...gallery.images.map((item) => item.caption),
              gallery.caption,
            ].filter(Boolean)) {
              const escaped = renderToStaticMarkup(createElement("span", null, caption[locale]))
                .replace(/^<span>|<\/span>$/gu, "").replace(/\n/gu, "<br/>");
              assert.ok(markup.includes(escaped), `${entry.name}: missing rendered ${locale} caption`);
            }
            return sequence;
          });
        assert.deepEqual(readingSequence(markup), expected,
          `${entry.name} / ${locale} / deferred=${deferImages}`);
      }
    }
  }
});
