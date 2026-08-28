import assert from "node:assert/strict";
import test from "node:test";
import {
  AzureOpenAiTranslator,
  collectLocalizedFields,
  validateTranslationResult,
} from "../src/editor-translation.js";
import {
  editorConfig,
  minimalTripDocument,
} from "./helpers/editor-fixtures.js";

test("collects stable paths and IDs for localized fields", () => {
  const fields = collectLocalizedFields(minimalTripDocument());
  const metadataTitle = fields.find(
    (field) => field.path === "$.metadata.title"
  );
  const coverTitle = fields.find(
    (field) =>
      field.path ===
      "$.pages[id=cover-page].blocks[id=cover-block].title"
  );

  assert.deepEqual(
    {
      id: metadataTitle.id,
      path: metadataTitle.path,
      text: metadataTitle.text,
    },
    {
      id: "document",
      path: "$.metadata.title",
      text: "测试旅行",
    }
  );
  assert.equal(coverTitle.id, "cover-page/cover-block");
});

test("translates only requested Chinese fields and merges validated English", async () => {
  const document = minimalTripDocument();
  document.metadata.title.zh = "新的旅行标题";
  document.metadata.title.en = "";
  let requestBody;
  const translator = new AzureOpenAiTranslator(editorConfig, {
    fetchImpl: async (_url, init) => {
      requestBody = JSON.parse(init.body);
      return Response.json({
        choices: [
          {
            finish_reason: "stop",
            message: {
              content: JSON.stringify({
                translations: [
                  {
                    id: "document",
                    path: "$.metadata.title",
                    text: "A New Trip Title",
                  },
                ],
              }),
            },
          },
        ],
      });
    },
  });

  const translated = await translator.translateDocument(document, [
    "$.metadata.title",
  ]);

  assert.equal(translated.metadata.title.en, "A New Trip Title");
  assert.equal(translated.metadata.subtitle.en, "Subtitle");
  assert.equal(
    requestBody.messages[1].content,
    JSON.stringify({
      translations: [
        {
          id: "document",
          path: "$.metadata.title",
          text: "新的旅行标题",
        },
      ],
    })
  );
  assert.equal(
    "minItems" in
      requestBody.response_format.json_schema.schema.properties.translations,
    false,
    "Azure structured outputs reject minItems and maxItems"
  );
  assert.equal(
    "maxItems" in
      requestBody.response_format.json_schema.schema.properties.translations,
    false
  );
});

test("rejects an untranslated empty English field after translation", async () => {
  const document = minimalTripDocument();
  document.metadata.subtitle.en = "";
  const translator = new AzureOpenAiTranslator(editorConfig, {
    fetchImpl: async () =>
      Response.json({
        choices: [
          {
            finish_reason: "stop",
            message: {
              content: JSON.stringify({
                translations: [
                  {
                    id: "document",
                    path: "$.metadata.title",
                    text: "Test Trip",
                  },
                ],
              }),
            },
          },
        ],
      }),
  });

  await assert.rejects(
    translator.translateDocument(document, ["$.metadata.title"]),
    (error) => error.code === "invalid_trip_document"
  );
});

test("rejects missing, added, reordered, and malformed translation fields", () => {
  const expected = [
    {
      id: "document",
      path: "$.metadata.title",
      text: "标题",
    },
  ];
  assert.throws(
    () => validateTranslationResult({ translations: [] }, expected),
    (error) => error.code === "translation_shape_mismatch"
  );
  assert.throws(
    () =>
      validateTranslationResult(
        {
          translations: [
            {
              id: "wrong-id",
              path: "$.metadata.title",
              text: "Title",
            },
          ],
        },
        expected
      ),
    (error) => error.code === "translation_shape_mismatch"
  );
  assert.throws(
    () =>
      validateTranslationResult(
        {
          translations: [
            {
              id: "document",
              path: "$.metadata.title",
              text: "Title",
              extra: true,
            },
          ],
        },
        expected
      ),
    (error) => error.code === "translation_shape_mismatch"
  );
});

test("rejects translations that alter protected dates, amounts, filenames, or emoji", () => {
  const expected = [
    {
      id: "cover-page/cover-block",
      path: "$.pages[id=cover-page].blocks[id=cover-block].intro",
      text: "2026-08-26 10:30 花了 ¥200，见 photo.jpg 😊",
    },
  ];
  assert.throws(
    () =>
      validateTranslationResult(
        {
          translations: [
            {
              id: expected[0].id,
              path: expected[0].path,
              text: "At 10:30 on 2026-08-26, spent ¥250; see photo.jpg 😊",
            },
          ],
        },
        expected
      ),
    (error) => error.code === "translation_content_mismatch"
  );
});

test("preserves exact document filenames even when they contain spaces or Unicode", () => {
  const expected = [
    {
      id: "cover-page/cover-block",
      path: "$.pages[id=cover-page].blocks[id=cover-block].intro",
      text: "请查看 杭州 夜景 01.jpg",
    },
  ];
  assert.throws(
    () =>
      validateTranslationResult(
        {
          translations: [
            {
              id: expected[0].id,
              path: expected[0].path,
              text: "See Hangzhou night 01.jpg",
            },
          ],
        },
        expected,
        ["杭州 夜景 01.jpg"]
      ),
    (error) => error.code === "translation_content_mismatch"
  );
});

test("rejects unknown and duplicate changed paths before calling Azure OpenAI", async () => {
  let called = false;
  const translator = new AzureOpenAiTranslator(editorConfig, {
    fetchImpl: async () => {
      called = true;
      throw new Error("must not run");
    },
  });

  await assert.rejects(
    translator.translateDocument(minimalTripDocument(), ["$.unknown"]),
    (error) => error.code === "unknown_translation_path"
  );
  await assert.rejects(
    translator.translateDocument(minimalTripDocument(), [
      "$.metadata.title",
      "$.metadata.title",
    ]),
    (error) => error.code === "duplicate_translation_path"
  );
  assert.equal(called, false);
});

test("rejects refused or incomplete model responses explicitly", async () => {
  const refusal = new AzureOpenAiTranslator(editorConfig, {
    fetchImpl: async () =>
      Response.json({
        choices: [
          {
            finish_reason: "stop",
            message: { refusal: "Cannot translate this content." },
          },
        ],
      }),
  });
  await assert.rejects(
    refusal.translateDocument(minimalTripDocument(), ["$.metadata.title"]),
    (error) => error.code === "translation_refused"
  );

  const incomplete = new AzureOpenAiTranslator(editorConfig, {
    fetchImpl: async () =>
      Response.json({
        choices: [
          {
            finish_reason: "length",
            message: { content: '{"translations":[]}' },
          },
        ],
      }),
  });
  await assert.rejects(
    incomplete.translateDocument(minimalTripDocument(), ["$.metadata.title"]),
    (error) => error.code === "translation_incomplete"
  );
});
