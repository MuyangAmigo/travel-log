# Travel journal entry workflow

Use these instructions when creating or revising a trip in this repository.

## Source of truth

- Start from the travel note supplied by the user. Preserve its chronology, facts, prices, personal reactions, and first-person voice.
- If the note conflicts with a direct user correction, the user's correction wins. Record non-obvious corrections in the PR description.
- Lightly expand sparse writing by connecting existing events, atmosphere, and emotions. Do not invent venues, timings, experiences, or opinions.
- Keep the Chinese and English entries structurally aligned. Translate naturally rather than literally, while preserving the same facts and tone.

## Trip identity

- Give every trip a distinctive editorial name based on its actual character, such as `在成都，慢慢耍` or `曼谷热浪漫游`.
- Do not use generic duration phrases such as `四天三夜`, `Four Days, Three Nights`, or similar wording as the listing or cover title.
- The localized listing title and the inner cover title must express the same trip name.
- Dates belong in `date` and `dateRange`, not in the title.

## Cover image

- Use a place, landscape, architecture, food, performance, animal, or other scene-setting image for `coverImage`.
- Do not use a portrait, couple photo, selfie, or any image whose main subject is a person as the listing cover.
- A people-focused photo may still appear inside the trip entry when it supports the story.
- Confirm that the chosen blob URL returns HTTP 200 before finishing.

## Images and Azure Blob Storage

- Do not commit source photos. Stage them only in an ignored local directory and remove temporary copies after upload.
- Store trip images at:
  `https://junjieblob.blob.core.windows.net/images/travel/<slug>/<filename>`
- Use `img(filename)` from the trip's `meta.ts` for every image in trip content. Do not hard-code blob URLs in JSX.
- For `junjieblob`, explicitly target:
  - Subscription: `Visual Studio Enterprise Subscription`
  - Subscription ID: `a0adf30d-bf1c-4bff-9a92-b6d937d0154f`
  - Resource group: `junjieweb`
  - Container: `images`
- Do not rely on the active Azure CLI subscription; it may point to a different account.
- Migrate supplied images into the trip-scoped path before wiring the entry. Exclude blank banners and other non-content filler.
- Verify every uploaded image and ensure both locales reference the intended complete image set.

## Implementation

1. Create `site/src/content/trips/<slug>/meta.ts`, `zh.tsx`, and `en.tsx`.
2. In `meta.ts`, export `SLUG`, `img`, and localized `TripMeta`.
3. Preserve the requested privacy state. A private trip must set `private: true`.
4. Render `<CardScaleController />` exactly once at the top of each locale component.
5. Compose the existing classes from `globals.css`; do not introduce a new visual system for one trip.
6. Build the entry as an editorial sequence rather than a raw note dump:
   - named cover
   - chronological day sections
   - photo grids with useful captions and descriptive alt text
   - timelines or route summaries where they clarify movement
   - candid notes, tips, highlights, and disappointments from the source
   - expense summary when the source includes costs
7. Register the trip in `site/src/lib/trips.ts`, keeping the newest trips first.

## Writing quality

- Keep the personal details that make the diary specific, including small mishaps, disagreements, purchases, unexpectedly good value, and honest disappointments.
- Expand transitions and sensory context only when supported by the note or photos.
- Avoid generic tourism copy, fabricated recommendations, and promotional language.
- Captions should add context rather than repeat the alt text.
- English place names should be readable and consistent; retain a useful romanized or established venue name when no natural translation exists.

## Validation and delivery

- Run the production build from `site/`:
  `TRAVEL_LOG_PRIVATE_PASSWORD=test npm run build`
- A successful private-trip build must generate and encrypt both locale pages.
- If dependencies are absent and the committed lockfile has the known invalid-version issue, follow CI behavior: regenerate the lockfile for local installation, build, then avoid committing unrelated generated lockfile changes.
- Next.js may modify `site/next-env.d.ts` or generate `site/AGENTS.md` and `site/CLAUDE.md`. Do not include these unrelated generated changes with a trip unless intentionally updating them.
- Preview the Chinese index and trip page locally after changes. Check the cover crop, title, mobile card layout, and image loading.
- Commit only files belonging to the requested change. When a PR already exists, push follow-up commits and keep its description accurate.
