#!/usr/bin/env python3
"""Validate an ordered photo plan and its exact structured-trip mapping."""

import argparse
from collections import Counter
from datetime import date
import json
from pathlib import Path
import re
import sys

COUNTS = {"one": 1, "two": 2, "three": 3, "four": 4}
SHAPES = {None, "square", "landscape", "wide", "portrait", "hero"}
ID = re.compile(r"^[a-z0-9]+(?:-[a-z0-9]+)*$")


def read_json(path):
    return json.loads(Path(path).read_text(encoding="utf-8"))


def text(value):
    return isinstance(value, str) and bool(value.strip())


def records(value, name, errors):
    if not isinstance(value, list) or not all(isinstance(item, dict) for item in value):
        errors.append(f"{name}: expected an array of objects")
        return []
    return value


def ids(value, name, errors):
    if not isinstance(value, list) or not all(isinstance(item, str) and ID.fullmatch(item) for item in value):
        errors.append(f"{name}: expected an array of stable lower-kebab-case IDs")
        return []
    if len(value) != len(set(value)):
        errors.append(f"{name}: duplicate IDs")
    return value


def valid_day(value):
    if not isinstance(value, str) or not re.fullmatch(r"\d{4}-\d{2}-\d{2}", value):
        return False
    try:
        date.fromisoformat(value)
        return True
    except ValueError:
        return False


def check(selection, metadata, document=None, assets=None):
    errors = []
    if not isinstance(selection, dict) or not isinstance(metadata, dict):
        return ["selection and metadata must be JSON objects"]
    if selection.get("version") != 1 or metadata.get("version") != 1:
        errors.append("selection and metadata require version: 1")
    if metadata.get("metadataErrors"):
        errors.append("metadata extraction errors remain unresolved; fix extraction before export")
    if not text(selection.get("revision")):
        errors.append("selection.revision is required")
    inventory = records(metadata.get("files"), "metadata.files", errors)
    photo_ids = ids([item.get("id") for item in inventory], "metadata file IDs", errors)
    photos = dict(zip(photo_ids, inventory))
    chosen = records(selection.get("selected"), "selected", errors)
    chosen_ids = ids([item.get("photoId") for item in chosen], "selected photo IDs", errors)
    selected = dict(zip(chosen_ids, chosen))
    if not chosen:
        errors.append("selected must not be empty")
    excluded = ids(selection.get("exclusions"), "exclusions", errors)
    for photo_id in excluded:
        if photo_id not in photos:
            errors.append(f"excluded photo {photo_id} is absent from inventory")
    for photo_id, item in selected.items():
        photo = photos.get(photo_id, {})
        if photo.get("kind") != "image" or photo.get("status") != "ready":
            errors.append(f"{photo_id}: not a successfully decoded image")
        if photo_id in excluded:
            errors.append(f"{photo_id}: excluded image selected")
        if not valid_day(item.get("day")):
            errors.append(f"{photo_id}: invalid or unresolved day")
        if not text(item.get("eventId")) or not text(item.get("reason")):
            errors.append(f"{photo_id}: eventId and selection reason are required")
        caption = item.get("caption")
        if not isinstance(caption, dict) or not all(text(caption.get(lang)) for lang in ("zh", "en")):
            errors.append(f"{photo_id}: bilingual caption is required")
    source_hashes = Counter(
        photos[photo_id]["sha256"] for photo_id in selected
        if photo_id in photos and isinstance(photos[photo_id].get("sha256"), str)
    )
    if any(count > 1 for count in source_hashes.values()):
        errors.append("selected includes byte-identical photo copies; retain one source ID")
    cover_id = selection.get("coverId")
    if not isinstance(cover_id, str) or cover_id not in selected:
        errors.append("coverId must name an image in selected (cover reuse is separate)")
    rows = records(selection.get("selectionRows"), "selectionRows", errors)
    ids([row.get("id") for row in rows], "row IDs", errors)
    placed = []
    motifs = []
    days = []
    for row in rows:
        label = str(row.get("id", "<missing-row-id>"))
        row_ids = ids(row.get("photoIds"), f"{label}.photoIds", errors)
        placed.extend(row_ids)
        layout = row.get("layout")
        shape = row.get("shape")
        treatment = row.get("treatment")
        if not isinstance(layout, str) or layout not in COUNTS:
            errors.append(f"{label}: unsupported symmetry-first layout")
        elif len(row_ids) != COUNTS[layout]:
            errors.append(f"{label}: {layout} requires exactly {COUNTS[layout]} images; no orphan cells")
        if not isinstance(shape, (str, type(None))) or shape not in SHAPES:
            errors.append(f"{label}: unsupported shape; natural means null/omitted")
        if treatment not in ("contain", "crop"):
            errors.append(f"{label}: treatment must be contain or crop")
        if layout == "one" and (shape is not None or treatment != "contain"):
            errors.append(f"{label}: singles must preserve the natural full composition")
        if not valid_day(row.get("day")):
            errors.append(f"{label}: invalid or unresolved day")
        else:
            days.append(row["day"])
        if not text(row.get("eventId")) or not text(row.get("reason")):
            errors.append(f"{label}: eventId and composition reason are required")
        if not isinstance(row.get("sectionId"), str) or not ID.fullmatch(row["sectionId"]):
            errors.append(f"{label}: stable sectionId is required")
        if treatment == "crop":
            reviewed = ids(row.get("cropReviewedIds"), f"{label}.cropReviewedIds", errors)
            if set(reviewed) != set(row_ids) or not row_ids:
                errors.append(f"{label}: every crop needs explicit visual crop review")
        ratios = []
        for photo_id in row_ids:
            item = selected.get(photo_id)
            if item is None:
                errors.append(f"{label}: unselected image {photo_id}")
                continue
            if item.get("day") != row.get("day"):
                errors.append(f"{label}: {photo_id} belongs to a different day")
            if item.get("eventId") != row.get("eventId") and not text(row.get("crossEventReason")):
                errors.append(f"{label}: cross-event pairing requires crossEventReason")
            photo = photos.get(photo_id, {})
            width, height = photo.get("width"), photo.get("height")
            if not all(isinstance(n, int) and not isinstance(n, bool) and n > 0 for n in (width, height)):
                errors.append(f"{label}: {photo_id} is missing oriented source dimensions")
            else:
                ratios.append(width / height)
        if len(ratios) > 1 and shape is None and max(ratios) / min(ratios) > 1.02:
            errors.append(f"{label}: natural ratios differ by more than 2%; choose equal contain frames")
        motifs.append((str(layout), str(shape), str(treatment)))
    if days != sorted(days):
        errors.append("selectionRows must remain in chronological day order")
    missing = set(chosen_ids) - set(placed)
    extra = set(placed) - set(chosen_ids)
    repeated = [key for key, count in Counter(placed).items() if count > 1]
    if missing or extra or repeated:
        errors.append(f"row coverage mismatch: missing={sorted(missing)}, extra={sorted(extra)}, repeated={repeated}")
    exceptions = records(selection.get("layoutExceptions"), "layoutExceptions", errors)
    waived = set()
    for exception in exceptions:
        rule = exception.get("rule")
        if rule not in ("diversity", "repetition") or not text(exception.get("reason")):
            errors.append("layoutExceptions require a supported rule and concrete review-visible reason")
        else:
            waived.add(rule)
    if len(rows) >= 6 and len(set(motifs)) < 2 and "diversity" not in waived:
        errors.append("layout diversity: six or more groups require at least two composition motifs")
    run = 0
    previous = None
    for motif in motifs:
        run = run + 1 if motif == previous else 1
        previous = motif
        if run == 4 and "repetition" not in waived:
            errors.append("layout repetition: more than three consecutive identical motifs")
    if document is not None:
        errors.extend(check_document(document, rows, chosen_ids, cover_id, assets))
    return errors


def check_document(document, rows, selected_ids, cover_id, assets):
    errors = []
    if not isinstance(document, dict):
        return ["document must be a JSON object; run repository schema tests as well"]
    images = records(document.get("images"), "document.images", errors)
    image_ids = ids([image.get("id") for image in images], "document image IDs", errors)
    if set(image_ids) != set(selected_ids):
        errors.append("document image set differs from the selected image set")
    meta = document.get("metadata", {})
    if not isinstance(meta, dict):
        errors.append("document.metadata must be an object")
        meta = {}
    if meta.get("coverImageId") != cover_id:
        errors.append("document cover differs from selected cover")
    pages = records(document.get("pages"), "document.pages", errors)
    galleries = []
    for page in pages:
        for block in records(page.get("blocks"), "page.blocks", errors):
            if block.get("type") == "gallery":
                galleries.append((page.get("sectionId"), block))
            if block.get("type") == "cover":
                if block.get("title") != meta.get("title"):
                    errors.append("document listing and inner cover titles differ")
                if block.get("backgroundImageId", cover_id) != cover_id:
                    errors.append("document inner cover image differs from selected cover")
    if len(galleries) != len(rows):
        errors.append("document gallery count differs from approved rows")
    for row, (section, gallery) in zip(rows, galleries):
        label = str(row.get("id"))
        items = records(gallery.get("images"), f"{label} gallery images", errors)
        if gallery.get("id") != row.get("id") or section != row.get("sectionId"):
            errors.append(f"{label}: document gallery identity/section differs")
        if gallery.get("layout") != row.get("layout"):
            errors.append(f"{label}: document layout differs")
        if [item.get("imageId") for item in items] != row.get("photoIds"):
            errors.append(f"{label}: document photo order differs")
        if any(item.get("shape") != row.get("shape") for item in items):
            errors.append(f"{label}: document shape differs or frames are unequal")
        if gallery.get("variant", "framed") != "framed" or any(
            item.get("tilt", "none") != "none" or item.get("tone", "normal") != "normal"
            for item in items
        ):
            errors.append(f"{label}: symmetric untinted frames required")
    if assets is not None:
        if not isinstance(assets, dict) or assets.get("version") != 1:
            errors.append("assets must be a v1 exporter manifest")
        else:
            exported = records(assets.get("images"), "assets.images", errors)
            exported_ids = ids([item.get("photoId") for item in exported], "exported IDs", errors)
            if set(exported_ids) != set(selected_ids):
                errors.append("exported assets differ from selected image set")
            by_id = dict(zip(exported_ids, exported))
            for image in images:
                expected = by_id.get(image.get("id"), {})
                if any(image.get(key) != expected.get(key) for key in ("filename", "width", "height")):
                    errors.append(f"{image.get('id')}: document asset mapping/dimensions differ")
    return errors


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--selection", required=True)
    parser.add_argument("--metadata", required=True)
    parser.add_argument("--document")
    parser.add_argument("--assets")
    args = parser.parse_args()
    try:
        selection = read_json(args.selection)
        errors = check(
            selection, read_json(args.metadata),
            read_json(args.document) if args.document else None,
            read_json(args.assets) if args.assets else None,
        )
    except (OSError, ValueError, TypeError) as exc:
        print(f"ERROR: {exc}", file=sys.stderr)
        return 1
    if errors:
        for error in errors:
            print(f"ERROR: {error}", file=sys.stderr)
        return 1
    for exception in selection["layoutExceptions"]:
        print(f"REVIEW EXCEPTION [{exception['rule']}]: {exception['reason']}")
    print(f"PASS: {len(selection['selected'])} unique photos, {len(selection['selectionRows'])} complete groups")
    print("JSON gate only: verify cover subject, crops, equal rendered frames and responsive CSS in browser.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
