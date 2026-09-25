# Travel journal entry workflow

Use these instructions when creating or revising a trip in this repository.
Read [DESIGN.md, reusable TravelEntry authoring](DESIGN.md#12-reusable-travelentry-authoring)
before choosing the reading sequence or layout. It is the visual source of truth;
its common design rules apply to every new TravelEntry, not just Phuket or a
particular destination. The reference trip demonstrates the design; it does not
limit who can reuse it. This file defines the creation and delivery workflow.
Read applicable child instructions before editing files in `site/`.

## Repository architecture

- This is a bilingual (`zh`/`en`) travel journal. The shell (index, header, trip
  chrome) uses an adaptive light/dark, photography-first design with Inter and
  Rausch Red (`#ff385c`); trip pages use a separate mobile-editorial visual
  language. [DESIGN.md](DESIGN.md) is the visual specification.
- `site/` is a Next.js 16 App Router / React 19 / TypeScript / Tailwind v4
  static export. Run `npm install`, `npm run dev`, and `npm run build` from
  `site/`. CI uses Node 22. The live GitHub Pages site is served under
  `/travel-log` via `NEXT_PUBLIC_BASE_PATH`.
- `api/` contains the Azure Functions authentication and editor API.
  `.github/workflows/github-pages.yml` validates pull requests and deploys
  the site and API on `main`. `scripts/upload-trip-images.sh` uploads photos;
  `scripts/encrypt-private-trips.mjs` protects private pages after the build.
- Locale is the URL segment (`/[locale]/...`); `site/src/lib/trips.ts` defines
  `locales`, listing metadata, and UI translations. The dynamic trip route
  generates pages from that registry, so new trips must be registered there.
- Each trip in `site/src/content/trips/<slug>/` has `content.json`, `meta.ts`,
  `zh.tsx`, and `en.tsx`. The structured document is the source for metadata
  and the shared renderer; see the creation workflow below. Images resolve
  through `img(filename)` in `meta.ts`. Production uses blob URLs; development
  can use the configured local-image preview override in
  `site/src/lib/local-trip-images.ts`.
- `site/src/app/[locale]/trips/[slug]/page.tsx` wraps content in
  `TripPresentation`. It owns `TripEntryLayout`, `CardScaleController`, and
  `ImageLightbox`; locale modules must not duplicate them. The default Classic
  presentation uses a 750px card canvas, scales on tablet, flows at phone
  widths, and has a centered reading column with chapter rails on desktop.
  `TripEntryLayout` derives fallback anchors from cards when no explicit
  chapter metadata is supplied.
- The optional structured `metadata.style` accepts `classic`, `photo-story`,
  or `field-journal` (default Classic). The editor's `TripPreviewFrame` uses
  the same renderer and presentation in isolated viewport frames. Keep style
  validation aligned between the site and API; do not override published
  styles through query parameters or browser storage. Browser effects in
  previews must use the rendered root's `ownerDocument` and `defaultView`.

## Shared presentation vocabulary

Reuse the classes and tokens in `site/src/app/globals.css` and the scoped
styles in `site/src/components/TripPresentation.module.css` rather than
introducing trip-specific visual systems. The common photo-story reading rules
currently opt in the Phuket, Kansai 2025, and Kansai family 2024 documents explicitly; selecting
`photo-story` alone does not apply those rules to a new trip.

- Shell: `.site-header`, `.site-brand`, `.theme-toggle`, `.trip-grid`,
  `.trip-card`, `.tc-media`, `.tc-badge`, `.trip-shell-header`, and
  `.lang-switch`. Theme tokens include `--palette-bg-primary-core`,
  semantic surface/text colors, `--ab-radius-*`, and `--ab-shadow-card`.
- Trip content: `.card-wrap > .card`, `.pf` with aspect classes
  `.sq|.ls|.wd|.pt|.hero`, `.pgrid` with `.g1|.g2|.g3|.g4|.g12|.g21`,
  `.day-header`, `.tlwrap`, `.route`, `.sgrid`, `.bill`, `.rbox`, `.nbox`,
  `.tags`, `.stamp-circle`, and `.dv`. Legacy `.tape`, `.deco`, and
  `.sticker` are hidden by the active editorial styling.
- `--font-ui` supplies Inter for the shell; trip content uses the Chinese
  sans/serif font stacks. `ThemeToggle` follows the system preference until
  the visitor chooses a theme, saved as `travel-log-theme`; the private-trip
  gate uses the same preference.

## Private trips and deployment

- A private trip remains on the public index with a private badge. During
  `npm run build`, `scripts/encrypt-private-trips.mjs` discovers private slugs
  from `content.json` metadata, encrypts each locale's exported HTML with
  staticrypt, and removes plaintext route payloads. `npm run dev` does not
  encrypt. Blob images, including private-trip images, remain publicly
  accessible.
- The gate supports Microsoft personal-account authorization with PKCE or a
  rate-limited passcode. The Azure Function validates the request and releases
  a page-specific key, not the reusable server-side password. See
  [docs/microsoft-auth.md](docs/microsoft-auth.md) for configuration. Private
  builds require `TRAVEL_LOG_PRIVATE_PASSWORD`,
  `NEXT_PUBLIC_MICROSOFT_CLIENT_ID`, `NEXT_PUBLIC_MICROSOFT_REDIRECT_URI`,
  and `TRAVEL_LOG_AUTH_API_URL`.
- On GitHub Pages, keep `next/link` routes root-relative; use
  `withBasePath()` from `site/src/lib/base-path.ts` for raw anchors and
  document-level redirects. Pull requests validate the production-path
  build but do not get a Pages preview deployment.
- Changing a production image path requires uploading the new blob. A browser may retain
  cached plaintext HTML after a trip is changed from public to private until
  a hard refresh; the encrypted page itself specifies no-cache behavior.

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
- In structured `content.json`, reference assets by image ID and filename; pass `img` to the shared renderer through `createTripLocale`.
- For `junjieblob`, explicitly target:
  - Subscription: `Visual Studio Enterprise Subscription`
  - Subscription ID: `a0adf30d-bf1c-4bff-9a92-b6d937d0154f`
  - Resource group: `junjieweb`
  - Container: `images`
- Do not rely on the active Azure CLI subscription; it may point to a different account.
- Pass `--subscription a0adf30d-bf1c-4bff-9a92-b6d937d0154f` explicitly to Azure CLI operations. The existing `scripts/upload-trip-images.sh` helper does not pin a subscription; invoking it unchanged is not sufficient to meet this requirement.
- Migrate supplied images into the trip-scoped path before wiring the entry. Exclude blank banners and other non-content filler.
- Verify every uploaded image and ensure both locales reference the intended complete image set.

## Creation workflow

1. Reconcile the source note and user corrections, then inventory the required
   photographs, chronology, costs, reactions, and privacy state. Choose the
   editorial name and scene-setting cover before composing the aligned locales.
2. Upload and verify the trip-scoped images before wiring the entry. Exclude only
   blank banners and non-content filler, not inconvenient crops or essential
   photographs.
3. Create `site/src/content/trips/<slug>/content.json`, `meta.ts`, `zh.tsx`, and
   `en.tsx`. Follow the existing structured-trip pattern (see the
   [`meta.ts` example](site/src/content/trips/phuket-2026/meta.ts) and its locale
   modules): parse with `parseTripDocument`, export `SLUG`, `img`, `document`, and
   locale-keyed `TripMeta` via `tripDocumentToMeta`, and use `createTripLocale` for
   both locale components and section exports. Keep directory, `SLUG`, and
   document slug consistent. Use only fields supported by
   [`trip-document.ts`](site/src/lib/trip-document.ts).
4. Preserve privacy in `content.json`'s `metadata.private` and the resolved meta;
   a private trip must resolve to `private: true`. The current encryption script
   reads structured metadata and requires a valid `content.json` beside every
   trip's `meta.ts`; a JSX-only entry is not a complete new-trip implementation.
5. Compose a named cover, chronological chapters, relevant photo groups, personal
   transitions, candid notes and disappointments, and source-backed expenses.
   Follow [reading rhythm](DESIGN.md#reading-rhythm) rather than dumping notes
   or using a product-landing-page formula. Keep each paragraph close to its
   photographs; timelines clarify movement without revealing a whole day between
   a scene and its image.
6. Keep `.card-wrap > .card` and stable chapter identity. For structured entries,
   set `pages[].sectionId` and optional localized `sections[].navigation`; the
   renderer emits `data-trip-section` on every `.card-wrap` in the chapter and
   the matching anchor `id` on its first `.card-wrap`. When revising authored
   JSX, keep those attributes on `.card-wrap` and export a localized `sections`
   array when curated labels or descriptions are needed. Keep `.day-title`,
   `.day-sub`, and `.day-circle` for the shared chapter navigation.
7. Let the shared route own `TripPresentation`, `TripEntryLayout`,
   `CardScaleController`, and `ImageLightbox`; do not render them inside locale
   components. Compose existing renderer blocks and `globals.css` classes, not a
   new visual system, per-trip presentation JavaScript, or arbitrary wrappers.
8. Apply the [common reading layout and photo rules](DESIGN.md#reading-axis-and-photography)
   to the new entry, regardless of destination. Verify that the selected shared
   presentation actually supports the design; a style name alone is not proof.
   Include any required shared presentation wiring in the entry's implementation
   following the [implementation notes](DESIGN.md#presentation-scope-and-reuse);
   reuse is a normal part of the creation workflow. Preserve unrelated published
   trips; do not
   work around a gap with duplicated components, unsupported metadata, a fourth
   style, query parameters, or browser storage.
9. Register the trip in [`site/src/lib/trips.ts`](site/src/lib/trips.ts), keeping
   the newest trips first. Preview and complete the checks below before delivery.

## Writing quality

- Keep the personal details that make the diary specific, including small mishaps, disagreements, purchases, unexpectedly good value, and honest disappointments.
- Expand transitions and sensory context only when supported by the note or photos.
- Avoid generic tourism copy, fabricated recommendations, and promotional language.
- Captions should add context rather than repeat the alt text.
- English place names should be readable and consistent; retain a useful romanized or established venue name when no natural translation exists.

## Validation and delivery

For content or implementation changes, run the existing structured-content tests
with `npm run test:trip-document` from `site/`, then the production build:

```bash
cd site
NEXT_PUBLIC_MICROSOFT_CLIENT_ID=11111111-2222-3333-4444-555555555555 \
NEXT_PUBLIC_MICROSOFT_REDIRECT_URI=http://localhost:3000/auth/callback/ \
TRAVEL_LOG_AUTH_API_URL=http://localhost:7071/api/unlock \
TRAVEL_LOG_PRIVATE_PASSWORD=test npm run build
```

These are local test values, not deployment credentials or a working sign-in
service. A successful private-trip build must generate and encrypt both locale
pages and remove their plaintext route payloads. `npm run dev` does not encrypt.
Images remain publicly reachable even for private entries; do not promise image
privacy. See [authentication documentation](docs/microsoft-auth.md).

- If dependencies are absent and the committed lockfile has the known invalid-version issue, follow CI behavior: regenerate the lockfile for local installation, build, then avoid committing unrelated generated lockfile changes.
- Next.js may modify `site/next-env.d.ts` or regenerate agent-guidance files
  in `site/`. Do not include unrelated generated changes with a trip unless
  intentionally updating them.
- Commit only files belonging to the requested change. When a PR already exists, push follow-up commits and keep its description accurate.
- For documentation-only changes, check links, paths, documented commands and
  schema/style claims against code, and run `git diff --check`; do not install
  dependencies or build the site unnecessarily. State any implementation
  dependency in the PR rather than implying documentation enabled a feature.

### Completion checklist

- [ ] Source facts, chronology, costs, personal reactions, negative opinions, and
  requested privacy are preserved. Both locales have the same chapter/block order
  and complete required image set; listing and cover names agree, dates stay separate.
- [ ] Every uploaded image and the scene-setting cover return HTTP 200; inspect
  the actual images as well as status codes. No source photos or temporary upload
  copies are committed; remove temporary copies after upload and verification.
- [ ] Preview the Chinese index and trip locally; check cover crop, name, and
  privacy badge. Inspect both locale trip pages and the editor's bilingual preview
  at 1440px, 900px, and 390px, plus a narrow 320px phone.
- [ ] Every new entry is checked against the
  [common reading axis targets](DESIGN.md#reading-axis-and-photography), including
  authored width constraints. Verify locale handling and actual presentation
  coverage; if reusing the reference CSS, check its document/style selector and
  `lang`. Meet the same design standard for each destination rather than assuming
  a style setting automatically supplies it. Unrelated published trips remain unchanged.
- [ ] Desktop prose and galleries share a center axis; tablet and phone layouts
  have readable text and no horizontal overflow. Natural-ratio portraits and
  full-table images retain their compositions; phone three-image groups stack
  in the common reading layout. Check full image loading and layout shifts, not
  just the cover or first screen.
- [ ] Chapter anchors, current-section tracking, the applicable desktop rails or
  quiet menu, tablet menu, mobile flow, and keyboard navigation work. Lightbox
  opening, closing with Escape, and focus return work in pages and isolated
  preview frames.
- [ ] Light/dark themes and reduced-motion behavior remain usable. No gratuitous
  motion, hidden essential photos, new media, or duplicated presentation effects.
- [ ] Structured-content tests and the production build succeed; private trips
  produce encrypted Chinese and English pages without plaintext route payloads.
  Exclude unrelated generated files and lockfile changes from the PR.
