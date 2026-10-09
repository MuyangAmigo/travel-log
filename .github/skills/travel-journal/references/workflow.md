# Workflow and persistent artifacts

## Contents

- Evidence and resume protocol
- Local review and approval
- Travel Log delivery
- Offline NoteBrain delivery
- Script behavior and commands

## Evidence and resume protocol

Use a unique trip directory in the session's persistent files area. Never
overwrite another reconstruction. Do not copy the entire source photo tree:
read it in place; make small review derivatives and only selected final copies.
Tell the user where the workspace lives. Preserve:

| File | Contract |
| --- | --- |
| `metadata.json` | Script-owned v1 inventory: source root, relative paths, path-derived IDs, SHA-256, status, raw EXIF, oriented sizes, preview mapping, errors, exact duplicate groups |
| `analysis.json` | Agent-owned v1: reviewed sheet/ID coverage, visual descriptions, comparison/alternatives, uncertainty and normalized time/GPS interpretation with its basis |
| `itinerary.json` | Agent-owned v1: chronological days/events, evidence IDs, file/visual/user/document/public-source types, unresolved details |
| `user-context.json` | Agent-owned v1: user statements/corrections in order, qualifiers and resolutions; never overwrite raw EXIF |
| `exclusions.json` | Agent-owned v1: excluded IDs and reasons; mirror IDs in `selection.json.exclusions` |
| `selection.json` | Checker-owned format in `layout.md`; current revision, cover, selected IDs, final ordered rows and layout exceptions |
| `draft.md` | Real first-person Chinese journal, with row IDs marking media positions |
| `review/` | Local complete visual review, using local derivatives; alternatives and full-image access |
| `assets.json` | Exporter-owned v1 mappings: source IDs/hashes, web filenames/sizes/hashes, offline compositions and their cell geometry |
| `approval.json` | Agent-owned v1: exact approval text, revision, SHA-256 of draft/selection/cover/user-context, named destinations and separately authorized operations |

For agent-owned JSON use `{ "version": 1, ... }`, document any additional keys
in the file's associated evidence note, and keep photo/event/row IDs consistent.
Resume by reading these files and the last approval, not rescanning/researching
from scratch. Recheck source hashes and invalidate affected evidence/approval
if source content changes. Regenerate only affected previews/exports.
If `metadata.json` changes, do not drop existing user corrections/exclusions.

Use capture EXIF as evidence, not download/mtime dates. Preserve offset,
subseconds, GPS clock and raw fields. Normalize only with supported timezone
evidence; flag device clock disagreement, DST, midnight/country crossings.
Distinguish receipt/event dates from capture dates, scheduled/live/actual flights,
and camera GPS from landmark position. ExifTool extraction is more complete
than Pillow fallback: label tool/limits, never assume missing GPS means absent
from an unsupported source format.

Every supplied file has a record, including unsupported files and videos.
Inspect every ready image via all contact sheets, then enlarge selected or
ambiguous candidates and text. Process unresolved images with available
tools or surface the block; `error`/`unsupported` is not visual review.
Verify near-duplicates visually; do not discard different expressions,
interactions or viewpoints solely from hashes/similarity.

Keep unphotographed days. Ask for missing memories; once provided, mark them
as recollection rather than an unknown gap. Exclude user-identified unrelated
material from itinerary, alternatives, open questions and all outputs permanently.
Do not inspect unrelated NoteBrain journals or send private context to web search.
Public landmark research may use minimal nonsensitive venue clues only.

## Local review and approval

Generate a local review containing full prose, daily routes, actual selected
photos/captions/frame treatment, alternatives and duplicate comparisons, stable
IDs, evidence, undated files and real open questions. Use expandable evidence,
not an investigation report in the main journal. No remote fonts/maps/analytics.
Prefer existing browser tools. If HTTP is needed:

```bash
python3 -m http.server 8765 --bind 127.0.0.1 --directory "$WORKSPACE"
```

Check readiness, open the actual URL, and keep the server alive only as needed
for user review (follow runtime background-service rules). Do not expose the
source root/home directory as HTTP root. Copy only selected readable large
review derivatives or explicit needed alternatives into the workspace.
State what could not be inspected when browser tooling is missing.

Show exact final destinations, revision/title/dates/slug, cover, unique photo
and group counts, private/public state, full/thumbnail treatment and upload path.
Explain the current Blob access model before upload. Ask explicitly to approve
the **current journal and selected photos** for the two named local outputs.
Record approval verbatim and bind it to artifact hashes. Do not infer it from
silence, small corrections, old plan approval or autonomous mode.
Content approval alone does not authorize upload/commit/push/PR/deployment.
Significant later changes require renewed approval of the changed version.

## Travel Log delivery

After content approval, read current repository instructions and examples such
as `site/src/content/trips/phuket-2026/{meta.ts,zh.tsx,en.tsx}` and
`macau-2023/content.test.mjs`. Use current helpers/schema rather than freezing
those examples here.

Create `site/src/content/trips/<slug>/{content.json,meta.ts,zh.tsx,en.tsx}`.
Use `parseTripDocument`, `tripDocumentToMeta`, `createTripLocale`, `SLUG` and
`img(filename)` as current examples do. Keep directory/document/meta slug
consistent, bilingual block order and all required images aligned. Preserve
`metadata.private: true` and resolved meta privacy unless approved otherwise.
Register newest-first in `site/src/lib/trips.ts`. The route owns presentation,
chapter navigation, scale controller and lightbox; never duplicate them.
Use only supported metadata/gallery fields. Include a named cover, stable
chapter IDs, nearby prose/photos and expenses only if supplied.

Use the approved web derivatives. Production destination:
`https://junjieblob.blob.core.windows.net/images/travel/<slug>/<filename>`.
Require explicit upload approval to this destination, explain that these
images are publicly accessible even for private pages, and stop if that fails
the user's privacy requirement. Never upload archival originals/EXIF,
sensitive ticket codes, excluded files or the whole source folder.
Target subscription `a0adf30d-bf1c-4bff-9a92-b6d937d0154f`
(`Visual Studio Enterprise Subscription`), resource group `junjieweb`,
account `junjieblob`, container `images`; pass `--subscription` explicitly on
**every Azure operation**. The old `scripts/upload-trip-images.sh` omits it.
Check the target account/group, use non-overwriting uploads, and compare hashes
before reusing same-name blobs. A failed blob lookup is an error, not proof it
does not exist. Never print account keys/SAS/credentials.
Verify every URL returns HTTP 200 **and the intended actual image**, including cover.
Keep originals/staging outside git; remove only this run's temporary upload copies.

No upload authorization/credentials: do not bypass. Prepare safe local files,
use the existing `local-trip-images.ts` development override if needed
(`NEXT_PUBLIC_LOCAL_TRIP_SLUG`, `NEXT_PUBLIC_LOCAL_TRIP_IMAGE_ORIGIN`, loopback
root origin and lowercase-hyphen `.webp` filenames), and report remote assets
as a delivery dependency. Never claim the production entry is complete/published.

Read DESIGN §12 presentation scope; wire the new slug into required shared
selectors deliberately. Run checker + current repository tests/build, and
actual index/both-language/editor-frame previews at all prescribed widths.
Validate private HTML encryption and absence of plaintext route payloads;
`npm run dev` does not encrypt. Use AGENTS' safe test values, not real secrets.
Keep generated Next files/lockfile churn and unrelated changes out of delivery.

## Offline NoteBrain delivery

Read applicable vault instructions only after the needed access is established.
Use the approved journal, not a fresh speculative rewrite. Default:
`Journal/Travel Journal/YYYY-MM-DD-<Chinese-title>-english-slug.md`, using trip start
date (never today's date for an unknown trip date).
Follow current vault naming/frontmatter rules; include title, date,
`categories: [Travel]`, lowercase relevant tags, optional confirmed `date_end`.
Do not overwrite an existing matching note without authorization.

Store assets in `Journal/Travel Journal/assets/<slug>/photos/` and `/pairs/`.
Copy every approved individual original byte-identically, verify SHA-256, and
disclose that local originals retain possible GPS/time. Never upload these.
Use exported equal-frame **uncropped** group composites for reliable Markdown
symmetry without vault-wide CSS/plugins. For every composite retain relative
links to each independent original immediately below it.
Resolve all links from the final note location, percent-encoding paths when
necessary; ensure offline use without localhost/session paths/Azure.
Store evidence/manifest under the asset folder, not as duplicate journal notes.

Only add a canonical Travel Log URL if the actual published page was verified.
Otherwise label it prepared locally, not published. Leave existing notes,
Obsidian settings and dashboards untouched. Hand off actual paths/states,
unique-photo/group counts and remaining uncertainty/blockers.

## Script behavior and commands

Require Python 3.10+ and Pillow (`python3 -m pip install Pillow` in a workspace
virtual environment **only after missing-dependency failure**). Use available
ExifTool, sips or ImageMagick without sending files to external services.
`photos.py` runs at most eight workers (default four); keep tool processes
bounded. Hash files once per scan and decode at thumbnail size when possible.
Save records in sorted relative-path order; IDs depend on relative path, not
basename, and remain stable unless a source is renamed.

Scan exits **2** with a saved manifest if any file fails; inspect explicit errors.
Unsupported files and videos remain registered but are not ready images.
If ExifTool fails, preserve partial metadata/previews, report the error and fix
it before claiming complete extraction. Pillow fallback explicitly labels its
metadata limitations. No automatic timezone/identity inference occurs.
Reusing the workspace with another source root is rejected.

Export requires a valid selection/metadata and unchanged selected source hashes.
It creates `web/<photo-id>.webp` (long edge ≤2000px), uncropped `groups/<row-id>.jpg`
with identical contained cells, and `assets.json`; reruns reuse matching outputs.
It does not upload, create final notes, approve a draft, generate CSS thumbnails
or claim browser checks. Copy group files for local notes; map web files via
`img`. If review uses a CSS crop, show that treatment separately from the
uncropped offline composite.

Run bundled checks without installing the site:

```bash
python3 -B -m unittest discover -s "$SKILL_DIR/scripts" -p 'test_*.py'
node --test "$SKILL_DIR/scripts/audit_layout.test.mjs"
```
