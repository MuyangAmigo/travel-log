# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

A bilingual (zh/en) travel journal rendered as scrapbook-style "cards". The aesthetic (washi tape, polaroids, rubber stamps, timelines, handwritten captions) is the whole point — see how it renders before changing visual tokens.

## Stack

- **`site/`** — Next.js 16 App Router · React 19 · TypeScript · Tailwind v4 · static export (`output: "export"`)
- **`scripts/upload-trip-images.sh`** — uploads a trip's photos to `junjieblob` blob storage
- **`.github/workflows/azure-static-web-apps.yml`** — builds `site/out` and deploys to Azure Static Web Apps on push to `main`

Mirrors the PersonalWeb (`../PersonalWeb/site-next/`) tech stack by design — same Node 20, same Tailwind v4 setup, same static export + SWA deploy pattern.

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

`:root` has the scrapbook palette (`--ink`, `--accent-gold/coral/teal/blue/pink`, `--tape-*`, `--stamp-red`, `--bg`, `--kraft-*`). Fonts (Playfair Display · Noto Serif SC · Caveat · Noto Sans SC) are loaded as variable fonts in `layout.tsx` and exposed as `--font-display`, `--font-hand`, `--font-serif-cn`, `--font-sans-cn`. Change tokens here to reskin the whole journal.

### Reusable class vocabulary

Composed, not written from scratch. Key classes defined in `globals.css`:

- **Photo frames**: `.pf` + aspect `.sq|.ls|.wd|.pt|.hero` + filter `.fw|.ff|.fg|.fc|.fv|.fs|.fn` + optional tilt `.tl-tilt|.tr-tilt`
- **Grids**: `.pgrid` + `.g1|.g2|.g3|.g4|.g12|.g21`
- **Washi tape**: `.tape` + color `.ty|.tp|.tg|.tb` + position `.t-tl|.t-tr|.t-tc` — parent needs `position: relative`
- **Structural**: `.day-header` + `.day-circle`, `.tlwrap` + `.tl-item` (timeline), `.route` + `.rs` + `.ra`, `.sgrid` + `.sc` (shopping), `.bill` + `.br` (receipt), `.pol` (polaroid), `.rbox` (+`.warn`), `.nbox`, `.tags` + `.tag-*`, `.stamp-circle` + `.stamp-box`, `.dv` (divider), `.cover-border`, `.spacer`

> Note: `.tl`/`.tr` (tilt) were renamed to `.tl-tilt`/`.tr-tilt` when porting from `plog.html` to avoid a collision with Tailwind's top/right utilities. The raw CSS timeline wrapper was renamed `.tlwrap` for the same reason.

### i18n

Lightweight. Locale lives in the URL segment (`/[locale]/...`). `locales = ["zh", "en"]` and a `dict` object live in `lib/trips.ts`. No i18n library. `/` redirects to `/zh`.

## Gotchas

- Changing image paths means re-uploading to blob storage. The dev site points at blob URLs in every environment.
- The root `plog.html` is the original design reference — leave it in place as a source of truth for the visual vocabulary, even after the port.
- Node 20 is pinned in CI. Match locally if you see `engines` warnings.
