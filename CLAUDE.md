# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

A bilingual (zh/en) travel journal rendered as scrapbook-style "cards". The aesthetic (washi tape, polaroids, rubber stamps, timelines, handwritten captions) is the whole point — see how it renders before changing visual tokens.

## Stack

- **`site/`** — Next.js 16 App Router · React 19 · TypeScript · Tailwind v4 · static export (`output: "export"`)
- **`scripts/upload-trip-images.sh`** — uploads a trip's photos to `junjieblob` blob storage
- **`scripts/encrypt-private-trips.mjs`** — post-build step that AES-encrypts any trip marked `private: true` using staticrypt; runs as part of `npm run build`
- **`.github/workflows/azure-static-web-apps.yml`** — builds `site/out` and deploys to Azure Static Web Apps on push to `main`

Mirrors the PersonalWeb (`../PersonalWeb/site-next/`) tech stack by design — same Tailwind v4 setup, same static export + SWA deploy pattern. CI runs Node 22.

Live at https://agreeable-tree-0b1f10200.7.azurestaticapps.net. Azure SWA `travel-log` lives in resource group `junjieweb`, region `eastasia`, Free tier. Deploy token is stored as `AZURE_STATIC_WEB_APPS_API_TOKEN` in the GitHub repo secrets.

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

### Card rendering (1200px canvas + scale-transform)

Every `.card` is authored at a fixed 1200px width. `.card-wrap` computes `--s = min((100vw-40px)/1200, 1)` and `transform: scale(var(--s))` shrinks it to fit. A client component — `CardScaleController.tsx` — measures the unscaled card height and writes `height = card.offsetHeight * s` back to the wrapper, otherwise the surrounding layout collapses (transformed elements don't contribute to layout size).

Every trip component must render `<CardScaleController />` once at the top of its tree.

### Design tokens in `globals.css`

`:root` has the scrapbook palette (`--ink`, `--accent-gold/coral/teal/blue/pink`, `--tape-*`, `--stamp-red`, `--bg`, `--kraft-*`). Font stack: EB Garamond (`--font-display`, structured English serif) · Homemade Apple (`--font-script`, large handwritten cursive for cover/ending titles) · Caveat (`--font-hand`, small handwritten labels/captions) — all via `next/font/google` in `layout.tsx`. Chinese is LXGW 霞鹜文楷 loaded via a jsDelivr CDN `<link>`, used as the primary family in `--font-serif-cn` and `--font-sans-cn`. The script face doesn't tolerate `letter-spacing` or all-caps — keep it for `.cover-title` / `.ending-title` / `.site-title` only. Change tokens here to reskin the whole journal.

### Reusable class vocabulary

Composed, not written from scratch. Key classes defined in `globals.css`:

- **Photo frames**: `.pf` + aspect `.sq|.ls|.wd|.pt|.hero` + filter `.fw|.ff|.fg|.fc|.fv|.fs|.fn` + optional tilt `.tl-tilt|.tr-tilt`
- **Grids**: `.pgrid` + `.g1|.g2|.g3|.g4|.g12|.g21`
- **Washi tape**: `.tape` + color `.ty|.tp|.tg|.tb` + position `.t-tl|.t-tr|.t-tc` — parent needs `position: relative`
- **Structural**: `.day-header` + `.day-circle`, `.tlwrap` + `.tl-item` (timeline), `.route` + `.rs` + `.ra`, `.sgrid` + `.sc` (shopping), `.bill` + `.br` (receipt), `.pol` (polaroid), `.rbox` (+`.warn`), `.nbox`, `.tags` + `.tag-*`, `.stamp-circle` + `.stamp-box`, `.dv` (divider), `.cover-border`, `.spacer`

> Note: `.tl`/`.tr` (tilt) were renamed to `.tl-tilt`/`.tr-tilt` when porting from `plog.html` to avoid a collision with Tailwind's top/right utilities. The raw CSS timeline wrapper was renamed `.tlwrap` for the same reason.

### i18n

Lightweight. Locale lives in the URL segment (`/[locale]/...`). `locales = ["zh", "en"]` and a `dict` object live in `lib/trips.ts`. No i18n library. `/` redirects to `/zh`.

### Private trips (staticrypt password gate)

A trip with `private: true` in its `meta.ts` is **still listed on the public locale index** (with a small 🔒 badge on the card title), but clicking it lands on a staticrypt password prompt — the generated HTML is AES-encrypted at build time. The flow:

1. `npm run build` runs `next build`, then `scripts/encrypt-private-trips.mjs` regex-scans every `site/src/content/trips/*/meta.ts` for `private: true`, finds the rendered `site/out/<locale>/trips/<slug>/index.html` for each slug × locale, and overwrites it in place with a staticrypt-encrypted payload (via a temp dir hop so the source isn't open-while-written).
2. The shared password comes from the `TRAVEL_LOG_PRIVATE_PASSWORD` env var. The script **aborts the build** if a private trip exists but the password is unset — unprotected content never ships.
3. The salt in `site/.staticrypt.json` is committed so the password-hash output is stable across builds.

**Caveat:** images live in the public blob container, so cover images and any blob URLs referenced inside a private trip are still directly reachable. Encryption covers the trip page's text + layout only — if image privacy matters, that's a separate change (private container + SAS tokens).

## Gotchas

- Changing image paths means re-uploading to blob storage. The dev site points at blob URLs in every environment.
- CI runs Node 22 and regenerates `site/package-lock.json` on every build — a workaround for a stale empty-version entry that local npm keeps re-adding to the lockfile. Don't restore `npm ci` without verifying the lockfile parses cleanly on the runner.
- Any build that includes a `private: true` trip needs `TRAVEL_LOG_PRIVATE_PASSWORD` set — stored as a GitHub Actions repo secret for CI and passed through the workflow's `env:` block. For a local production preview: `TRAVEL_LOG_PRIVATE_PASSWORD=test npm run build`. `npm run dev` never encrypts; private trips render normally in dev.
- After flipping a trip's `private` flag, existing visitors may still see the stale cached HTML until a hard refresh (`Cmd+Shift+R`) — the encrypted page itself ships `no-cache` meta headers, but anything cached before the flip is held by the browser.
- The original single-file prototype (`plog.html`) was removed after porting. Recover via `git show <sha>:plog.html` if you ever want to visually diff against it.
