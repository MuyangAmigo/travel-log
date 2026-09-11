# Kansai 2025: local implementation, not published

`site/src/content/trips/kansai-2025/` contains the private bilingual entry
**关西，沿着绿意去看猫** (30 April–5 May 2025). Its 23 media-supported events
are woven into six chronological day chapters, without a separate timeline or
production/verification commentary. The photo library groups the 83 approved
photos by scene, with deliberately balanced rows rather than strict timestamp
order inside each scene. Shared chapter navigation and full-image lightboxes
remain available. P1154 (`IMG_2858.JPG`, the white TAMA
train) is an additional cover-only image; P1016 remains in the library.

This checkout has no separate photo-library schema. The entry composes existing
`header`, `prose`, and `gallery` blocks in `photo-story`. Only this entry opts
into the photo-library frames: equal-size square, landscape or tall-portrait
previews within each row; important standalone compositions keep natural ratios.
The user explicitly requested balanced thumbnail crops in the diary revision;
the lightbox always retains the complete composition.
Phuket's existing reading-axis rules are reused without changing other trips.
The optional shared `images[].thumbnailFilename` field supplies a 640px WebP
for the library; the existing lightbox opens the separate, full-composition
WebP (up to 2400px). Images without this field retain their existing behavior.
The API and site validate the field, and publication verifies both files.
Deploy the matching API validator before any future publication that uses it.
No new style, viewer or dependency was added.
The existing lightbox offers previous/next buttons, a photo counter and arrow-key
navigation for thumbnail-backed library images. Older entries without thumbnails
keep their original single-image viewer. Escape and focus return remain
document-local, including in editor preview frames.
The new cover alone uses an 80%-vertical listing focal point so the white train's
ears, front and wheels remain visible in the index's square and phone-wide frames.
Its inner cover follows the existing Photo Story overlay treatment, with white
editorial text over the train photograph and a contrast gradient.

## Local images

Only the 84 approved original images were processed. Originals stay read-only.
The local manifest records source ID, filename and SHA-256, chronological event,
and the optimized full/thumbnail filenames and checksums. It is kept with the
local review artifacts, not inside the repository. WebP derivatives contain no
EXIF, GPS or XMP. No source photographs, derivatives, precise coordinates,
tickets or credentials are added to Git.

Serve the derivative-only asset root (containing a `kansai-2025/` directory),
not the original photo folder or the review artifact root:

```bash
python3 -m http.server 4382 --bind 127.0.0.1 --directory /absolute/path/to/kansai-local-assets
```

Then run the site:

```bash
cd site
NEXT_PUBLIC_LOCAL_TRIP_SLUG=kansai-2025 \
NEXT_PUBLIC_LOCAL_TRIP_IMAGE_ORIGIN=http://127.0.0.1:4382 \
npm run dev -- --hostname 127.0.0.1 --port 4381 --webpack
```

Open `http://127.0.0.1:4381/zh/`,
`http://127.0.0.1:4381/zh/trips/kansai-2025/`, or
`http://127.0.0.1:4381/en/trips/kansai-2025/`.
These private pages render **unencrypted in development**: keep both servers
bound to loopback. The explicit image override also applies to the existing
editor preview. It permits only an `http://127.0.0.1:<port>` origin and one
named trip, and is disabled in production regardless of environment flags.
It never changes stored content or production image URLs.

## Upload blocker and draft PR

The owner approved preparing the Azure upload and opening a PR after reviewing
the revised diary. **The upload remains blocked, and this entry must not be
merged or deployed until its remote images have been verified.** No images
were uploaded by this implementation.

The management-plane checks confirmed the destination:

- Subscription: `Visual Studio Enterprise Subscription`
  (`a0adf30d-bf1c-4bff-9a92-b6d937d0154f`)
- Resource group: `junjieweb`
- Storage account/container/prefix: `junjieblob` / `images` /
  `travel/kansai-2025/`
- Container access model: `publicAccess: Blob`, allowing anonymous reads of
  individual blob URLs.

The current Entra-authenticated Azure CLI identity was denied both blob listing
and a non-overwriting cover upload. The cover URL subsequently returned HTTP
404. No storage keys were read, no access permissions were changed, and no
batch upload was attempted.

All **167 referenced files** (84 full images and 83 thumbnails, excluding the
unused cover thumbnail) have been checked locally against their manifest
hashes and decoded without EXIF/XMP metadata. An authorized uploader, or the
current identity with appropriate container-scoped data permissions, must
complete the upload after the owner confirms the public-image access model.
Compare any existing blobs by content before writing; do not overwrite
unrelated or mismatching files silently.

Production metadata still resolves the intended standard path
`https://junjieblob.blob.core.windows.net/images/travel/kansai-2025/<filename>`.
Those 167 references have not completed remote upload/content verification.
The production build checks rendering and bilingual encryption, not image
availability or publication readiness. The matching `thumbnailFilename` API
support must also be deployed before using the editor's publication workflow.
Opening the draft PR does not merge it or deploy the site.

`private: true` encrypts the generated entry, not publicly hosted image URLs.
The local test password and auth endpoints in [the repository workflow](../AGENTS.md)
are dummy validation values, not working authentication or deployment settings.
