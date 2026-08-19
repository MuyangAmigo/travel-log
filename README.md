```
+---------------------------------------------------------------------+
|  _______ _____       __      ________ _        _      ____   _____  |
| |__   __|  __ \     /\ \    / /  ____| |      | |    / __ \ / ____| |
|    | |  | |__) |   /  \ \  / /| |__  | |      | |   | |  | | |  __  |
|    | |  |  _  /   / /\ \ \/ / |  __| | |      | |   | |  | | | |_ | |
|    | |  | | \ \  / ____ \  /  | |____| |____  | |___| |__| | |__| | |
|    |_|  |_|  \_\/_/    \_\/   |______|______| |______\____/ \_____| |
|                                                                     |
|                                                                     |
+---------------------------------------------------------------------+
```

```
> bilingual travel journal · static export · client-side encryption
> paths walked. people met. meals eaten. 走过的路，遇过的人，吃过的饭。
```

## SYNOPSIS

A bilingual (中文 / English) travel journal running as a **fully static** Next.js export.
The shell is an Airbnb-inspired listing grid; every trip page is a 750px mobile-editorial
scrapbook with photo grids, timelines, and note cards. All nine trips are **private**:
their HTML is encrypted at build time, and a serverless Azure Function releases the
per-page decryption key only after **Microsoft sign-in** or a **passcode**.

```
LOCATION    : https://muyangamigo.github.io/travel-log/
STATUS      : [ OK ] static export · [ OK ] auth API · [ OK ] encrypted trips
TRIPS       : 9/9 encrypted · zh (default) + en
IMAGES      : azure blob storage (junjieblob/images/travel/<slug>/)
THEME       : rausch red #ff385c · warm near-black #111113 · auto light/dark
```

## THE STACK

| Layer      | Component |
|------------|-----------|
| Framework  | Next.js **16** (App Router, `output: "export"`) |
| UI         | React **19** · TypeScript **5.9** · Tailwind CSS **v4** |
| Shell      | Airbnb-style listing grid (Rausch Red `#ff385c`, 3-layer shadows) |
| Journal    | 750px mobile-editorial canvas, `.nbox` / `.rbox` / `.tlwrap` / `.route` |
| Privacy    | **Staticrypt** build-time HTML encryption |
| Auth       | Azure Functions · Microsoft OAuth (MSAL) · passcode · JWT (`jose`) |
| Rate limit | Azure Table Storage (passcode brute-force guard) |
| Assets     | Azure Blob Storage — `https://junjieblob.blob.core.windows.net/images/travel/<slug>/` |
| CI/CD      | GitHub Actions → GitHub Pages + Azure Functions |

## ARCHITECTURE

```
                              ┌──────────────────────────────────────────┐
                              │   GITHUB PAGES (static, zero-server)     │
                              │                                          │
   browser ──► listing grid ──│  trip page (encrypted <html> at rest)   │
                              │  unlock.js ── prompts for passcode      │
   ── passcode ──────────────►│       └─► decrypt with page key locally │
                              │  oauth/callback ─ Microsoft account     │
                              └───────────────┬──────────────────────────┘
                                              │ POST /api/unlock
                                              ▼
                              ┌──────────────────────────────────────────┐
                              │   AZURE FUNCTIONS  (travel-log-auth-api) │
                              │  ├─ verify MS OAuth token → issue JWT    │
                              │  ├─ verify passcode (rate-limited via    │
                              │  │   Azure Table Storage)                │
                              │  └─ sign a page-specific decryption key  │
                              └──────────────────────────────────────────┘
```

**The privacy contract:** static pages are shipped *encrypted*, so a plain `curl` of the
site returns gibberish. The decryption key never lives in the static bundle — it is minted
per-page by the auth API only after a valid credential. The API runs server-side with a
rate limiter, so passcodes can't be brute-forced from the CDN edge.

## REPO MAP

```
travel-log/
├── site/                        # Next.js static site (the whole UI)
│   └── src/
│       ├── content/trips/       # one folder per trip
│       │   └── <slug>/
│       │       ├── meta.ts      # dates, titles, cover, private flag
│       │       ├── zh.tsx       # 中文 journal component
│       │       └── en.tsx       # English journal component
│       └── lib/                 # trips registry, blob helper, base path
├── api/                         # Azure Functions auth service
│   ├── src/functions/unlock.js  # /api/unlock — issue page keys
│   └── test/                    # node:test suite (run in CI)
├── scripts/
│   ├── upload-trip-images.sh    # stage photos → Azure Blob
│   ├── encrypt-private-trips.mjs# build-time Staticrypt pass
│   └── check-auth-api.mjs       # post-deploy auth smoke test
├── .github/workflows/           # test → build → encrypt → deploy
└── docs/microsoft-auth.md       # OAuth app + Function setup guide
```

## QUICKSTART

```bash
# 1. run the site
cd site
npm install
npm run dev          # → http://localhost:3000

# 2. run the auth API locally
cd ../api
npm install
func start           # needs Azure Functions Core Tools

# 3. production build (with private-trip encryption)
cd ../site
NEXT_PUBLIC_MICROSOFT_CLIENT_ID=11111111-2222-3333-4444-555555555555 \
NEXT_PUBLIC_MICROSOFT_REDIRECT_URI=http://localhost:3000/auth/callback/ \
TRAVEL_LOG_AUTH_API_URL=http://localhost:7071/api/unlock \
TRAVEL_LOG_PRIVATE_PASSWORD=test \
npm run build
```

## DEPLOY PROTOCOL

Every push to `main` fires `.github/workflows/github-pages.yml`:

```
auth-api-test ──► build ──► auth-api-deploy ──► deploy
    │                │            │                │
  node --test    next build    azure function   github pages
  (unit tests)   + staticrypt  publish + smoke   artifact upload
                 (encrypt 9    check (scripts/   & publish
                  trip pages)  check-auth-api)
```

- **PRs** run the API tests and the encrypted production build — but never publish.
- **Images** stay in Azure Blob; the static bundle only references their URLs.
- Lockfile note: if the committed `site/package-lock.json` is stale, CI regenerates it
  during install — keep generated lockfile churn out of unrelated commits.

## ADD A TRIP

```bash
# 1. stage your photos locally (never commit them)
./scripts/upload-trip-images.sh <slug> <source-dir>     # → azure blob

# 2. scaffold the trip
site/src/content/trips/<slug>/
    ├── meta.ts     # SLUG, img(), TripMeta (dates · titles · cover · private)
    ├── zh.tsx      # 中文 editorial entry
    └── en.tsx      # English editorial entry

# 3. register it
#    append to the `trips` array in site/src/lib/trips.ts  (auto-sorted newest first)
```

**Editorial rules** — this repo is a journal, not a CMS:
- keep the first-person voice, prices, mishaps, and honest disappointments from the source note
- never invent venues, timings, or opinions
- trip names are editorial, e.g. `在成都，慢慢耍` / `曼谷热浪漫游` — never `四天三夜`
- every image goes through `img(filename)` from `meta.ts` — no hard-coded blob URLs
- keep the `zh`/`en` entries structurally aligned, translated not transliterated

## HARD REQUIREMENTS

- [ ] `<CardScaleController />` rendered exactly once at the top of each locale component
- [ ] `coverImage` is a scene-setting photo — never a portrait or selfie
- [ ] private trips must set `private: true` (the build then encrypts both locales)
- [ ] every uploaded blob URL must return **HTTP 200** before you call it done
- [ ] production build succeeds with the env block above and emits **encrypted** pages
- [ ] no new visual system for a single trip — compose from `globals.css`

## DOCS

- [Microsoft authentication setup](docs/microsoft-auth.md) — app registration, Function
  settings, GitHub configuration, and the secrets/vars each environment needs.

---

```
$ echo "happy trails" && exit 0
happy trails
```
