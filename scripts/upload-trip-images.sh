#!/usr/bin/env bash
# Upload a trip's photos to Azure Blob Storage.
# Usage:  ./scripts/upload-trip-images.sh <trip-slug> <source-dir>
# Example: ./scripts/upload-trip-images.sh bangkok-2026 ./IMGSource
#
# Blobs land at: https://$STORAGE_ACCOUNT.blob.core.windows.net/$CONTAINER/travel/<slug>/<filename>
# which matches what src/lib/blob.ts expects.

set -euo pipefail

STORAGE_ACCOUNT="${AZURE_STORAGE_ACCOUNT:-junjieblob}"
CONTAINER="${AZURE_STORAGE_CONTAINER:-images}"
PREFIX="travel"

if [ $# -lt 2 ]; then
  echo "Usage: $0 <trip-slug> <source-dir>"
  echo "Example: $0 bangkok-2026 ./IMGSource"
  exit 1
fi

SLUG="$1"
SRC_DIR="$2"

if [ ! -d "$SRC_DIR" ]; then
  echo "Error: source directory not found: $SRC_DIR"
  exit 1
fi

BLOB_BASE="https://${STORAGE_ACCOUNT}.blob.core.windows.net/${CONTAINER}/${PREFIX}/${SLUG}"

echo "Uploading images from $SRC_DIR"
echo "  → $BLOB_BASE/"
echo ""

UPLOADED=0
SKIPPED=0

shopt -s nullglob
for FILE in "$SRC_DIR"/*.{jpeg,jpg,png,webp,JPEG,JPG,PNG,WEBP}; do
  [ -f "$FILE" ] || continue
  FNAME=$(basename "$FILE")
  BLOB_NAME="${PREFIX}/${SLUG}/${FNAME}"

  if az storage blob show \
        --account-name "$STORAGE_ACCOUNT" \
        --container-name "$CONTAINER" \
        --name "$BLOB_NAME" \
        --auth-mode login \
        >/dev/null 2>&1; then
    echo "  [skip] $FNAME  (already in blob)"
    SKIPPED=$((SKIPPED + 1))
    continue
  fi

  echo "  [up]   $FNAME"
  az storage blob upload \
    --account-name "$STORAGE_ACCOUNT" \
    --container-name "$CONTAINER" \
    --file "$FILE" \
    --name "$BLOB_NAME" \
    --auth-mode login \
    --only-show-errors >/dev/null
  UPLOADED=$((UPLOADED + 1))
done

echo ""
echo "Done. Uploaded: $UPLOADED · Skipped: $SKIPPED"
echo "Base URL: $BLOB_BASE/"
