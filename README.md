# Travel Log

A bilingual travel journal. The shell is an Airbnb-inspired listing grid; trip inner pages use a 750px mobile-editorial travel-log style with white content sections, red accent badges, rounded photo grids, timelines, and note cards.

- **Stack**: Next.js 16 (App Router) · React 19 · TypeScript · Tailwind v4
- **Hosting**: Azure Static Web Apps (static export)
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

Pushes to `main` trigger `.github/workflows/azure-static-web-apps.yml`, which builds `site/out` and ships it to Azure Static Web Apps.
