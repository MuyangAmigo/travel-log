# Layout contract

## Contents

- Selection schema
- Symmetry and rhythm gates
- Travel Log mapping
- Browser acceptance

## Selection schema

Keep this intermediate file **outside the final repositories**. It is not a
TripDocument. Copy the structure, not the example facts/IDs.

```json
{
  "version": 1,
  "revision": "v1",
  "coverId": "p-0123456789abcdef",
  "selected": [
    {
      "photoId": "p-0123456789abcdef",
      "day": "2025-01-01",
      "eventId": "arrival",
      "reason": "Approved scene-setting view",
      "caption": {"zh": "从这里开始。", "en": "Where the trip began."}
    }
  ],
  "selectionRows": [
    {
      "id": "arrival-view",
      "day": "2025-01-01",
      "eventId": "arrival",
      "sectionId": "arrival",
      "layout": "one",
      "photoIds": ["p-0123456789abcdef"],
      "shape": null,
      "treatment": "contain",
      "reason": "The whole composition needs a quiet pause"
    }
  ],
  "exclusions": [],
  "layoutExceptions": []
}
```

Require each selected ID exactly once in rows; do not select byte-identical
copies under different IDs. Use `selected` as the unique
curation set, `selectionRows` as final reading order, and `coverId` as a separate
reuse of an image in that set. Record other cover-only use explicitly by extending
the plan and checker before approval, not by slipping an extra image into output.
Store alternatives, comparison notes and source confidence in `analysis.json`.
Every selected caption has nonempty `zh`/`en`. Every row has a concrete
composition reason. Use ISO dates backed by evidence/correction; undated material
stays out until placed by evidence or the user.

Additional row fields:

| Field | Use |
| --- | --- |
| `cropReviewedIds` | Required for `treatment: "crop"`; exactly every ID in the row after visual inspection |
| `crossEventReason` | Required if a row pairs different events within the same day |

`shape` is `null`, `square`, `landscape`, `wide`, `portrait` or `hero`.
`null` means **omit** `shape` in content, never write `"natural"`.
Fixed review frame ratios are 1:1, 4:3, 16:9, 3:4 and 16:9 respectively;
verify current CSS actually matches these in the chosen trip scope.

## Symmetry and rhythm gates

`check_layout.py` exits nonzero for violations. Treat its output as a gate,
not optional advice.

| Layout | Required count | Contract |
| --- | --- | --- |
| `one` | 1 | Centered, natural ratio, `shape: null`, `contain` |
| `two` | 2 | Identical frames; relate subject/scale; equal widths |
| `three` | 3 | Complete equal-frame row, not 2+an orphan; stack on phones |
| `four` | 4 | Complete group; prefer two equal rows of two through scoped shared CSS |

For natural-ratio multi-image rows require oriented source ratios within **2%**
of each other. Otherwise choose one shared shape with `contain`; letterboxing
is preferable to lost faces/bodies/spires. `crop` requires `cropReviewedIds`;
all row items still have the same shape. Do not use weighted-left/right,
polaroid tilt, filters or fake extra cells for this symmetry-first workflow.

For **six or more groups**, require at least **two distinct motifs**
(`layout`, `shape`, `treatment`). Allow at most **three consecutive identical
motifs**. These are practical authoring defaults, not universal taste laws:
for a source-limited or intentionally repetitive sequence, add
`{"rule":"diversity","reason":"Concrete source/story reason"}` or
`{"rule":"repetition","reason":"Concrete source/story reason"}` to
`layoutExceptions`, show that reason and the affected groups during review,
and include it in content approval. Do not invent weak singles/crops just to
pass a number. Exceptions do not waive missing photos, wrong days or unequal
frames. Reject unsupported exception rules.

Begin around 5–10 photos on a photographed day, without a cap. Add a genuinely
complementary photo beyond ten when it improves the composition. Preserve
essential images even when inconvenient; propose honest singles rather than
near-duplicates. Keep image pairing chronological within the day, and disclose
cross-event pairing without moving the events in the itinerary.

## Travel Log mapping

Re-read `site/src/lib/trip-document.ts`, `TripDocumentRenderer.tsx`,
`TripPresentation.module.css` and `globals.css` before implementation.
Use `row.id` as gallery block ID and `row.sectionId` as `page.sectionId`;
create one gallery per row, in row order. Set `layout` to the contract value and
apply the row's one non-null `shape` to **every** gallery item.
Use source photo IDs as `images[].id`, and exported filenames/intrinsic dimensions
from `assets.json`. Those IDs already satisfy the lower-kebab-case schema.
Use the image's localized captions or an approved shared caption on the first
item; if using shared captions, wire their width and mobile order intentionally.

Map `contain`/`crop` to scoped shared presentation CSS and inspected thumbnails:
they are **not** supported GalleryBlock fields. Natural single photos must be
centered, full compositions and at most 420px. With mixed native ratios, use
one matching shape plus `object-fit: contain; height: auto`, verified in both
locales. Never rely on `object-fit: cover` just because the frames are equal.
The exporter makes uncropped full derivatives; it does not implement approved
CSS crops. If generating `thumbnailFilename`, preserve `filename` as the complete
image and verify the lightbox opens it, not the thumbnail.

The default `.g4` is four columns; selected reading-flow scopes override it to
two columns. Both are symmetric, but a 2×2 plan requires actual scope wiring.
`photo-story` alone does not opt a new document into common reading rules.
Add only the new document slug to necessary shared selectors, respecting style
and locale; preserve unrelated trips. Do not add a fourth style or content fields.

Run the checker with `--document` and `--assets` to require exact row IDs,
ordered photos, layout, shape, section, cover and exported filenames/dimensions.
This supplements, not replaces, repository schema tests and encryption builds.

## Browser acceptance

Measure rendered frame rectangles, not just source image dimensions. In each
multi-column row, frame width/height differences must be **at most 2px**,
and rows must share the prose/gallery center axis. No orphan cell, stretch,
cropped essential subject, horizontal overflow or hidden selected image.
At 1440/900/390/320px inspect both locales, full image load and editor iframes.
Use the DESIGN prose/gallery width targets, correct document/style selector and
`lang`; inspect real mobile stacking rather than trusting a layout enum.

Record screenshots/measurements and crop decisions in the workspace. A contact
sheet, equal-frame offline composite or passing JSON checker cannot prove the
website layout; mark browser checks blocked if tooling is unavailable.

Use `scripts/audit_layout.mjs` as a deterministic browser gate. With existing
Playwright tooling import `auditLayout`, then at each viewport invoke:

```js
const report = await page.evaluate(auditLayout, {
  selection,
  locale: "zh",
  imageAssets: content.images,
});
```

Use `frame.evaluate` for an isolated editor preview, not the parent editor
document. The function is self-contained for serialization and uses the
rendered root's ownerDocument/defaultView. With browser evaluation tools rather
than a Node harness, evaluate the function body in that document with the same
arguments. Save `report` to workspace `layout-audit-<locale>-<width>.json`.
Require `errors.length === 0` in every route and frame. It checks loaded assets
against source IDs, equal rendered peer rectangles (≤2px), natural/contain
compositions, document overflow, orphan cells, reading caps/axis and phone
three-image stacking. It does not decide photographic quality, compare draft
facts or test lightbox/keyboard/theme behavior; inspect those separately.
