import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import test from "node:test";
import {
  assertDocumentSlug,
  parseTripDocument,
  validateTripDocument,
} from "../src/trip-document.js";
import { minimalTripDocument } from "./helpers/editor-fixtures.js";

test("accepts every registered structured trip document", () => {
  const tripsDirectory = new URL("../../site/src/content/trips/", import.meta.url);
  const validated = [];
  for (const slug of readdirSync(tripsDirectory)) {
    try {
      const source = readFileSync(
        new URL(`${slug}/content.json`, tripsDirectory),
        "utf8"
      );
      assert.deepEqual(
        validateTripDocument(JSON.parse(source)),
        [],
        `${slug} must match the API schema`
      );
      validated.push(slug);
    } catch (error) {
      if (error?.code !== "ENOENT") throw error;
    }
  }
  assert.equal(validated.length, 11);
});

test("rejects unknown fields, dangling references, and duplicate IDs", () => {
  const document = minimalTripDocument();
  document.metadata.className = "arbitrary-css";
  document.images.push({
    id: "cover",
    filename: "active-content.svg",
    alt: { zh: "重复", en: "Duplicate" },
  });
  document.pages[0].sectionId = "missing";

  const issues = validateTripDocument(document);
  assert.ok(
    issues.some((issue) => issue.path === "$.metadata.className"),
    "unknown schema fields must be rejected"
  );
  assert.ok(issues.some((issue) => issue.message.includes('duplicates "cover"')));
  assert.ok(
    issues.some((issue) => issue.path === "$.images[1].filename"),
    "editable image documents must be limited to safe raster formats"
  );
  assert.ok(
    issues.some((issue) =>
      issue.message.includes('unknown section "missing"')
    )
  );
  assert.throws(
    () => parseTripDocument(document),
    (error) =>
      error.status === 422 && error.code === "invalid_trip_document"
  );
});

test("accepts omitted style without rewriting legacy documents and preserves allowed styles", () => {
  const legacy = minimalTripDocument();
  assert.deepEqual(parseTripDocument(legacy), legacy);
  assert.equal(Object.hasOwn(parseTripDocument(legacy).metadata, "style"), false);

  for (const style of ["classic", "photo-story", "field-journal"]) {
    const document = minimalTripDocument();
    document.metadata.style = style;
    assert.deepEqual(validateTripDocument(document), []);
    assert.deepEqual(parseTripDocument(document), document);
    assert.equal(parseTripDocument(document).metadata.style, style);
  }
});

test("rejects unknown, null, and incorrectly typed styles in both validation modes", () => {
  for (const style of [
    "unknown", "", "Classic", " classic ", null, undefined, 1, true, [], {},
  ]) {
    const document = minimalTripDocument();
    document.metadata.style = style;
    for (const allowEmptyEnglish of [false, true]) {
      assert.ok(
        validateTripDocument(document, { allowEmptyEnglish }).some(
          (issue) => issue.path === "$.metadata.style"
        ),
        `must reject style ${String(style)}`
      );
      assert.throws(
        () => parseTripDocument(document, { allowEmptyEnglish }),
        (error) => error.status === 422 && error.code === "invalid_trip_document"
      );
    }
  }
});

test("keeps every existing metadata field required when style is present", () => {
  for (const key of [
    "date", "dateRange", "coverImageId", "title", "subtitle", "location", "private",
  ]) {
    const document = minimalTripDocument();
    document.metadata.style = "classic";
    delete document.metadata[key];
    assert.ok(
      validateTripDocument(document).some(
        (issue) => issue.path === `$.metadata.${key}` && issue.message === "is required"
      ),
      `${key} must remain required`
    );
  }
});

test("rejects renamed documents independently of schema validation", () => {
  const document = parseTripDocument(minimalTripDocument("renamed-trip"));
  assert.throws(
    () => assertDocumentSlug(document, "existing-trip"),
    (error) => error.status === 409 && error.code === "trip_slug_mismatch"
  );
});

test("allows an empty English draft only during translation validation", () => {
  const document = minimalTripDocument();
  document.metadata.title.en = "";

  assert.ok(
    validateTripDocument(document).some(
      (issue) => issue.path === "$.metadata.title.en"
    )
  );
  assert.deepEqual(
    validateTripDocument(document, { allowEmptyEnglish: true }),
    []
  );
});
