# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

A bilingual (zh/en) travel journal with a **two-layer visual system**:
- **Shell** (index, site header, trip-page chrome): clean Airbnb-inspired design — adaptive light/dark canvas, Rausch Red (`#ff385c`) as singular accent, Inter typography, photography-first listing grid with three-layer warm shadows. Spec lives in `DESIGN.md`.
- **Trip content** (inner pages): hand-authored mobile-editorial travel logs inspired by Chinese social travel posts — 750px fixed canvas, theme-aware editorial surfaces, #ff2442 red badges, rounded photo grids, timelines, note cards, and clean PingFang/LXGW typography. Each trip is still bespoke JSX, but presentation is now controlled by the trip-content override block at the end of `globals.css`.

## Stack

- **`site/`** — Next.js 16 App Router · React 19 · TypeScript · Tailwind v4 · static export (`output: "export"`)
- **`scripts/upload-trip-images.sh`** — uploads a trip's photos to `junjieblob` blob storage
- **`scripts/encrypt-private-trips.mjs`** — post-build step that AES-encrypts any trip marked `private: true` using staticrypt and injects the Microsoft authentication gate; runs as part of `npm run build`
- **`api/`** — Azure Functions API that validates the pinned Microsoft personal account or rate-limited private passcode before releasing a page-specific key
- **`.github/workflows/github-pages.yml`** — builds `site/out` and deploys to GitHub Pages on push to `main`

Mirrors the PersonalWeb (`../PersonalWeb/site-next/`) tech stack by design — same Tailwind v4 setup and static export pattern. CI runs Node 22.

Live at https://muyangamigo.github.io/travel-log/. GitHub Pages serves this project beneath `/travel-log`, configured at build time through `NEXT_PUBLIC_BASE_PATH`.

## Dev commands

```bash
cd site
npm install
npm run dev        # localhost:3000
npm run build      # produces site/out/
```

## Architecture

### Trip content lives in `site/src/content/trips/<slug>/`

Each trip is **three files**:
- `meta.ts` — exports `meta: TripMeta` and `img(filename)`, which resolves to the blob URL `https://junjieblob.blob.core.windows.net/images/travel/<slug>/<filename>`
- `zh.tsx` / `en.tsx` — full React components, one per locale

Trip pages are hand-authored JSX (not markdown) because each card has bespoke layout. Don't try to shoehorn trips into MDX or a generic template.

New trips must be added to the `trips` array in `site/src/lib/trips.ts`. The dynamic route `site/src/app/[locale]/trips/[slug]/page.tsx` uses `generateStaticParams` over that registry, so an unregistered trip will 404 at build time.

### Images are in Azure Blob Storage

All `<img>` src attributes in trip content go through `img(filename)` from `meta.ts`, which prefixes `travel/<slug>/`. The source photos are never committed — `IMGSource/` is gitignored. Upload order matters: **upload first, then the live site can render**. Local dev against unuploaded images will 404.

### Card rendering (750px canvas + scale-transform)

Every `.card` is displayed at a fixed 750px width by the final trip-content CSS override in `globals.css`. On tablet, `.card-wrap` computes `--s = min((100vw - gutter)/750, 1)` and `transform: scale(var(--s))` shrinks it to fit. On phones (`max-width: 760px`), transforms are disabled and cards become fluid `width: 100%` with true mobile font sizes so text doesn't render too small. On desktop (`min-width: 1280px`), the default editorial layout renders cards fluidly in a 720px center column between two rails.

`site/src/app/[locale]/trips/[slug]/page.tsx` wraps every trip in `TripEntryLayout` and renders `CardScaleController` once. Locale components must not add either component themselves.

### Default editorial rails

`TripEntryLayout.tsx` is the shared responsive frame for every trip. Desktop pages get symmetrical sticky chapter/current-section rails, tablets get a compact sticky chapter menu, and phones retain the single-column card flow.

The layout discovers `.card-wrap` elements and derives chapter copy from existing `.cover-title`, `.day-title`, `.day-sub`, and `.day-circle` content. It assigns stable generated anchors when an entry has no explicit section metadata. For authored grouping, use the same `data-trip-section` on every card in a chapter, place the matching `id` on its first card, and optionally export a localized `sections` array typed as `TripEntrySection`; `loadTripContent()` forwards that metadata to the shared layout.

### Design tokens in `globals.css`

Two token families coexist in `:root`:

**Shell (Airbnb-style)** — `--palette-bg-primary-core` (Rausch Red `#ff385c`), semantic page/surface/text variables with `[data-theme="dark"]` overrides, `--ab-radius-sm|badge|card|lg` (8 / 14 / 20 / 32 px), `--ab-shadow-card` (three-layer warm lift: ring + soft blur + stronger blur), `--ab-shadow-hover`. Full palette/role list is in `DESIGN.md`.

**Theme behavior** — `components/ThemeToggle.tsx` follows `prefers-color-scheme` until a visitor chooses a theme, then saves `light` or `dark` under `travel-log-theme`. The root layout applies that preference before first paint. `scripts/microsoft-auth-template.html` uses the same key and behavior for private-trip authentication pages.

**Legacy scrapbook tokens** — `--ink`, `--accent-gold/coral/teal/blue/pink`, `--tape-*`, `--stamp-red`, `--bg`, `--kraft-*` still exist because old class names are reused, but the active trip inner-page look is defined by the final “Trip inner pages — mobile editorial / red-note style” block in `globals.css`.

Font stack: **Inter** (`--font-ui`) for all shell UI — stands in for the proprietary Airbnb Cereal VF, weight range 400–700. Trip content uses `--font-sans-cn` / `--font-serif-cn`, with LXGW 霞鹜文楷 loaded via jsDelivr and system Chinese fallbacks. EB Garamond / Homemade Apple / Caveat remain available for legacy classes but are no longer the dominant inner-page style.

### Reusable class vocabulary

Composed, not written from scratch. Key classes defined in `globals.css`:

**Shell (Airbnb-style)**:
- **Header / nav**: `.site-header`, `.site-brand` (Rausch Red logo mark), `.theme-toggle` — rendered by `components/SiteHeader.tsx`
- **Index**: `.index-wrap`, `.index-hero`, `.index-eyebrow`, `.site-title`, `.site-sub`, `.index-tagline`, `.trip-grid` (4→3→2→1 cols)
- **Listing card**: `.trip-card` + `.tc-media` (1:1 aspect, 20px radius, three-layer shadow, hover scales image + lifts shadow) + `.tc-badge` (+`.private` for Rausch Red variant) + `.tc-body`, `.tc-title-row`, `.tc-title`, `.tc-date`, `.tc-location`, `.tc-sub`
- **Trip chrome**: `.trip-shell-header`, `.trip-shell-back` (rounded pill back button), `.trip-content` (theme-aware mobile-editorial wrapper), `.trip-entry-layout` + `.trip-entry-rail` + `.trip-entry-compact` (default responsive chapter navigation)
- **Language switch**: `.lang-switch` (pill-track group, `.active` = elevated theme surface with soft shadow)

**Trip content classes**:
- **Photo frames**: `.pf` + aspect `.sq|.ls|.wd|.pt|.hero`; legacy filter/tilt classes may remain in JSX but the active style normalizes them into clean rounded image cards.
- **Grids**: `.pgrid` + `.g1|.g2|.g3|.g4|.g12|.g21`
- **Decorative legacy no-ops**: `.tape`, `.deco`, `.sticker` are hidden in the active mobile-editorial style.
- **Structural**: `.day-header` + `.day-circle`, `.tlwrap` + `.tl-item` (timeline cards), `.route` + `.rs` + `.ra`, `.sgrid` + `.sc` (shopping), `.bill` + `.br` (receipt), `.pol`, `.rbox` (+`.warn`), `.nbox`, `.tags` + `.tag-*`, `.stamp-circle` + `.stamp-box`, `.dv` (divider), `.cover-border`, `.spacer`

> Note: `.tl`/`.tr` (tilt) were renamed to `.tl-tilt`/`.tr-tilt` when porting from `plog.html` to avoid a collision with Tailwind's top/right utilities. The raw CSS timeline wrapper was renamed `.tlwrap` for the same reason.

### i18n

Lightweight. Locale lives in the URL segment (`/[locale]/...`). `locales = ["zh", "en"]` and a `dict` object live in `lib/trips.ts`. No i18n library. `/` redirects to `/zh`.

### Private trips (Microsoft account + passcode gate)

A trip with `private: true` in its `meta.ts` is **still listed on the public locale index** (with a Rausch-Red "Private" pill badge overlaid on the cover image), but clicking it lands on a dual Microsoft personal-account / private-passcode gate. The generated HTML is AES-encrypted at build time. The flow:

1. `npm run build` runs `next build`, then `scripts/encrypt-private-trips.mjs` regex-scans every `site/src/content/trips/*/meta.ts` for `private: true`, finds the rendered `site/out/<locale>/trips/<slug>/index.html` for each slug × locale, overwrites it with a staticrypt-encrypted payload, and removes the route's plaintext React Server Component `.txt` payloads.
2. The gate either starts Microsoft authorization-code flow with PKCE through `/auth/callback/` and requests the custom `PrivateJournal.Read` scope, or sends the entered passcode directly to the HTTPS Function. The callback carries the access token once in the URL fragment; the encrypted page removes it from the URL immediately and never retains it in Web Storage.
3. The Azure Function validates the Microsoft consumer token and configured identity, or checks the durably rate-limited `TRAVEL_LOG_PRIVATE_PASSCODE`, before deriving a locale-and-trip-specific key from `TRAVEL_LOG_PRIVATE_PASSWORD`. Neither reusable credential is returned to the browser.
4. The build script aborts if the password, Microsoft client ID, callback URL, or authentication API URL is missing or malformed. The salt in `site/.staticrypt.json` remains committed so encrypted output is stable.

**Caveat:** images live in the public blob container, so cover images and any blob URLs referenced inside a private trip are still directly reachable. Encryption covers the trip page's text + layout only — if image privacy matters, that's a separate change (private container + SAS tokens).

## Gotchas

- Changing image paths means re-uploading to blob storage. The dev site points at blob URLs in every environment.
- CI runs Node 22 and regenerates `site/package-lock.json` on every build — a workaround for a stale empty-version entry that local npm keeps re-adding to the lockfile. Don't restore `npm ci` without verifying the lockfile parses cleanly on the runner.
- Any build that includes a `private: true` trip needs `TRAVEL_LOG_PRIVATE_PASSWORD`, `NEXT_PUBLIC_MICROSOFT_CLIENT_ID`, `NEXT_PUBLIC_MICROSOFT_REDIRECT_URI`, and `TRAVEL_LOG_AUTH_API_URL`. See `docs/microsoft-auth.md` for local and deployment values. `npm run dev` never encrypts; private trips render normally in dev.
- GitHub Pages production builds set `NEXT_PUBLIC_BASE_PATH=/travel-log`. Keep application routes root-relative when using `next/link`; use `withBasePath()` from `site/src/lib/base-path.ts` only for raw anchors and document-level redirects.
- GitHub Pages does not create per-pull-request preview environments. Pull requests run the production-path build as validation, while only `main` and manual workflow runs deploy.
- After flipping a trip's `private` flag, existing visitors may still see the stale cached HTML until a hard refresh (`Cmd+Shift+R`) — the encrypted page itself ships `no-cache` meta headers, but anything cached before the flip is held by the browser.
- The original single-file prototype (`plog.html`) was removed after porting. Recover via `git show <sha>:plog.html` if you ever want to visually diff against it.
