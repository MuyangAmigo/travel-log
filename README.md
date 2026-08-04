# Travel Log

A bilingual travel journal. The shell is an Airbnb-inspired listing grid; trip inner pages use a 750px mobile-editorial travel-log style with white content sections, red accent badges, rounded photo grids, timelines, and note cards.

- **Stack**: Next.js 16 (App Router) · React 19 · TypeScript · Tailwind v4
- **Hosting**: GitHub Pages (static export)
- **Images**: Azure Blob Storage — `junjieblob/images/travel/<slug>/`
- **Languages**: zh (default) · en

## Develop

```bash
cd site
npm install
npm run dev        # http://localhost:3000
```

## Add a new trip

1. Drop source photos in a local `IMGSource/` (gitignored) — or wherever you like.
2. Upload them:
   ```bash
   ./scripts/upload-trip-images.sh <slug> <source-dir>
   ```
3. Scaffold the trip under `site/src/content/trips/<slug>/`:
   - `meta.ts` — dates, titles, cover image
   - `zh.tsx`, `en.tsx` — one React component per locale
4. Register the trip in `site/src/lib/trips.ts` (`trips` array).

## Deploy

The site is published at https://muyangamigo.github.io/travel-log/.

Pushes to `main` trigger `.github/workflows/github-pages.yml`, which builds `site/out` with the `/travel-log` base path, encrypts private trips using the `TRAVEL_LOG_PRIVATE_PASSWORD` repository secret, and deploys the artifact to GitHub Pages. Pull requests run the same build as a validation check without publishing a preview site.

Trip images remain hosted in Azure Blob Storage.
