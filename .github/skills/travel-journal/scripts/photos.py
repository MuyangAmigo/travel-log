#!/usr/bin/env python3
"""Local, cached photo inventory/contact sheets and selected-only export."""

import argparse
from collections import Counter
from concurrent.futures import ThreadPoolExecutor
from contextlib import contextmanager
import hashlib
import json
import os
from pathlib import Path
import shutil
import subprocess
import sys
import tempfile

try:
    from PIL import ExifTags, Image, ImageDraw, ImageOps, UnidentifiedImageError
except ImportError:
    sys.exit("ERROR: Pillow is missing. Install Pillow in a workspace virtual environment, then retry.")

from check_layout import check, read_json

IMAGES = {".jpg", ".jpeg", ".png", ".webp", ".avif", ".gif", ".tif", ".tiff",
          ".heic", ".heif", ".dng", ".cr2", ".cr3", ".nef", ".arw", ".orf", ".raf", ".rw2"}
RAW = {".heic", ".heif", ".dng", ".cr2", ".cr3", ".nef", ".arw", ".orf", ".raf", ".rw2"}
VIDEOS = {".mov", ".mp4", ".m4v", ".avi", ".mts"}
RATIOS = {"square": 1, "landscape": 4 / 3, "wide": 16 / 9, "portrait": 3 / 4, "hero": 16 / 9}
PIPELINE = 1


def digest(path):
    with Path(path).open("rb") as handle:
        return hashlib.file_digest(handle, "sha256").hexdigest() if hasattr(hashlib, "file_digest") else _digest(handle)


def _digest(handle):
    value = hashlib.sha256()
    for chunk in iter(lambda: handle.read(1024 * 1024), b""):
        value.update(chunk)
    return value.hexdigest()


def json_hash(value):
    return hashlib.sha256(json.dumps(value, sort_keys=True).encode()).hexdigest()


def save_json(path, value):
    path = Path(path)
    temporary = path.with_suffix(".tmp")
    temporary.write_text(json.dumps(value, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    temporary.replace(path)


def raw_value(value):
    if isinstance(value, bytes):
        return {"bytes": len(value), "sha256": hashlib.sha256(value).hexdigest()}
    if isinstance(value, dict):
        return {str(key): raw_value(item) for key, item in value.items()}
    if isinstance(value, (tuple, list)):
        return [raw_value(item) for item in value]
    if isinstance(value, (str, int, float, type(None))):
        return value
    return str(value)


def pillow_exif(image):
    exif = image.getexif()
    result = {ExifTags.TAGS.get(key, str(key)): raw_value(value) for key, value in exif.items()}
    for ifd, name, tags in ((34665, "Exif", ExifTags.TAGS), (34853, "GPS", ExifTags.GPSTAGS)):
        if ifd in exif:
            result[name] = {tags.get(key, str(key)): raw_value(value) for key, value in exif.get_ifd(ifd).items()}
    return result


@contextmanager
def open_photo(path):
    try:
        image = Image.open(path)
    except (UnidentifiedImageError, OSError):
        if path.suffix.lower() not in RAW:
            raise
        with tempfile.TemporaryDirectory(prefix="travel-decode-") as temporary:
            converted = Path(temporary) / "decoded.png"
            if shutil.which("sips") and path.suffix.lower() in {".heic", ".heif"}:
                command = ["sips", "-s", "format", "png", str(path), "--out", str(converted)]
            elif shutil.which("magick"):
                command = ["magick", str(path) + "[0]", str(converted)]
            else:
                raise ValueError(f"No decoder for {path.suffix}; use available HEIC/RAW tools")
            subprocess.run(command, check=True, capture_output=True, timeout=120)
            with Image.open(converted) as image:
                yield image, "converted"
        return
    with image:
        yield image, "pillow"


def rgb(image):
    if image.mode in ("RGBA", "LA") or (image.mode == "P" and "transparency" in image.info):
        rgba = image.convert("RGBA")
        background = Image.new("RGB", image.size, "white")
        background.paste(rgba, mask=rgba.getchannel("A"))
        return background
    return image.convert("RGB")


def pixels(image, edge):
    image.draft("RGB", (edge, edge))
    oriented = ImageOps.exif_transpose(image)
    oriented.thumbnail((edge, edge), Image.Resampling.LANCZOS)
    return rgb(oriented)


def batch_exif(paths):
    if not shutil.which("exiftool"):
        return {}, ["ExifTool unavailable: Pillow fallback covers readable image EXIF only; video/RAW metadata may be incomplete."]
    targets = [str(path) for path in paths if not path.is_symlink() and path.suffix.lower() in IMAGES | VIDEOS]
    if not targets:
        return {}, []
    if any("\n" in path or "\r" in path for path in targets):
        raise ValueError("ExifTool batch paths cannot contain newlines; handle these files explicitly")
    with tempfile.TemporaryDirectory(prefix="travel-exif-") as temporary:
        arguments = Path(temporary) / "paths.txt"
        arguments.write_text("\n".join(targets) + "\n", encoding="utf-8")
        command = ["exiftool", "-json", "-n", "-G1", "-a", "-time:all", "-gps:all",
                   "-Make", "-Model", "-ImageWidth", "-ImageHeight", "-Orientation", "-FileType",
                   "-@", str(arguments)]
        result = subprocess.run(command, capture_output=True, text=True, timeout=300)
    if result.returncode:
        raise ValueError(f"ExifTool extraction failed: {result.stderr.strip()}")
    values = json.loads(result.stdout)
    mapping = {}
    for value in values:
        source_file = next((item for key, item in value.items() if key.split(":")[-1] == "SourceFile"), None)
        if source_file:
            mapping[str(Path(source_file).resolve())] = value
    warnings = [result.stderr.strip()] if result.stderr.strip() else []
    return mapping, warnings


def scan(source, workspace, workers=4):
    source, workspace = Path(source).expanduser().resolve(), Path(workspace).expanduser().resolve()
    if not source.is_dir():
        raise ValueError(f"Photo directory is not accessible: {source}")
    if workspace.is_relative_to(source) or source.is_relative_to(workspace):
        raise ValueError("Source and workspace must be separate, non-nested directories")
    previous_path = workspace / "metadata.json"
    previous = read_json(previous_path) if previous_path.exists() else {}
    if previous and (previous.get("version") != 1 or previous.get("sourceRoot") != str(source)):
        raise ValueError("Workspace belongs to another source or metadata version")
    workspace.mkdir(parents=True, exist_ok=True)
    (workspace / "previews").mkdir(exist_ok=True)
    def traversal_error(error):
        raise error

    paths = []
    for directory, folders, filenames in os.walk(source, onerror=traversal_error, followlinks=False):
        paths.extend(Path(directory) / name for name in filenames)
        paths.extend(Path(directory) / name for name in folders if (Path(directory) / name).is_symlink())
    paths.sort(key=lambda path: path.relative_to(source).as_posix())
    prior = {item["id"]: item for item in previous.get("files", [])}

    def inspect(path):
        relative = path.relative_to(source).as_posix()
        photo_id = "p-" + hashlib.sha256(relative.encode()).hexdigest()[:16]
        kind = "image" if path.suffix.lower() in IMAGES else "video" if path.suffix.lower() in VIDEOS else "unsupported"
        record = {"id": photo_id, "sourcePath": relative, "format": path.suffix.lower(), "kind": kind}
        if path.is_symlink():
            return {**record, "status": "unsupported", "error": "Symbolic link registered but not followed"}
        try:
            content_hash = digest(path)
            record.update(sha256=content_hash, bytes=path.stat().st_size)
            cached = prior.get(photo_id, {})
            preview = workspace / "previews" / f"{photo_id}.jpg"
            if (cached.get("sha256") == content_hash and cached.get("pipeline") == PIPELINE
                    and cached.get("status") in ("ready", "registered", "unsupported")
                    and (kind != "image" or preview.exists())):
                return cached
            record["pipeline"] = PIPELINE
            if kind != "image":
                record["status"] = "registered" if kind == "video" else "unsupported"
                return record
            with open_photo(path) as (image, backend):
                width, height = image.size
                orientation = image.getexif().get(274, 1)
                if orientation in (5, 6, 7, 8):
                    width, height = height, width
                record.update(width=width, height=height, orientation=orientation,
                              metadataBackend=backend, rawExif=pillow_exif(image))
                thumbnail = pixels(image, 360)
                thumbnail.save(preview, "JPEG", quality=78)
            record.update(status="ready", previewPath=preview.relative_to(workspace).as_posix())
        except (OSError, ValueError, SyntaxError, subprocess.SubprocessError, Image.DecompressionBombError) as exc:
            record.update(status="error", error=str(exc))
        return record

    with ThreadPoolExecutor(max_workers=workers) as pool:
        files = list(pool.map(inspect, paths))
    if len({item["id"] for item in files}) != len(files):
        raise ValueError("Stable ID collision; stop before selection")
    fingerprint = json_hash({"pipeline": PIPELINE, "files": [
        (item["id"], item.get("sha256"), item.get("status"), item.get("width"), item.get("height"))
        for item in files
    ]})
    metadata_errors = []
    if (fingerprint == previous.get("fingerprint")
            and previous.get("exifToolAvailable") == bool(shutil.which("exiftool"))
            and not previous.get("metadataErrors")):
        tool_values, warnings = {}, previous.get("warnings", [])
        metadata_errors = previous.get("metadataErrors", [])
    else:
        try:
            tool_values, warnings = batch_exif(paths)
        except (OSError, ValueError, subprocess.SubprocessError) as exc:
            tool_values, warnings = {}, []
            metadata_errors.append(str(exc))
        for item in files:
            value = tool_values.get(str(source / item["sourcePath"]))
            if value:
                item["rawExifTool"] = value
    groups = {}
    for item in files:
        if item.get("sha256"):
            groups.setdefault(item["sha256"], []).append(item["id"])
    ready = [item for item in files if item["status"] == "ready"]
    sheet_paths = [f"contact-sheets/sheet-{index // 20 + 1:03}.jpg" for index in range(0, len(ready), 20)]
    if fingerprint != previous.get("fingerprint") or any(not (workspace / name).is_file() for name in sheet_paths):
        (workspace / "contact-sheets").mkdir(exist_ok=True)
        for start, name in zip(range(0, len(ready), 20), sheet_paths):
            batch = ready[start:start + 20]
            sheet = Image.new("RGB", (1400, ((len(batch) + 4) // 5) * 230), "#f5f3ee")
            draw = ImageDraw.Draw(sheet)
            for index, item in enumerate(batch):
                x, y = index % 5 * 280, index // 5 * 230
                with Image.open(workspace / item["previewPath"]) as thumbnail:
                    tile = ImageOps.contain(thumbnail, (264, 190))
                    sheet.paste(tile, (x + (280 - tile.width) // 2, y + (190 - tile.height) // 2))
                draw.text((x + 8, y + 198), item["id"], fill="#222222")
            sheet.save(workspace / name, "JPEG", quality=82)
    result = {"version": 1, "sourceRoot": str(source), "fingerprint": fingerprint, "files": files,
              "contactSheets": sheet_paths, "exactDuplicateGroups": [group for group in groups.values() if len(group) > 1],
              "exifToolAvailable": bool(shutil.which("exiftool")), "warnings": warnings, "metadataErrors": metadata_errors}
    save_json(previous_path, result)
    return result


def export(workspace, selection_path, workers=4):
    workspace = Path(workspace).expanduser().resolve()
    metadata = read_json(workspace / "metadata.json")
    selection = read_json(selection_path)
    errors = check(selection, metadata)
    if errors:
        raise ValueError("Layout gate failed:\n" + "\n".join(errors))
    source = Path(metadata["sourceRoot"]).resolve()
    previous = read_json(workspace / "assets.json") if (workspace / "assets.json").exists() else {}
    cached_images = {item["photoId"]: item for item in previous.get("images", [])}
    cached_groups = {item["rowId"]: item for item in previous.get("groups", [])}
    inventory = {item["id"]: item for item in metadata["files"]}
    for folder in ("web", "groups"):
        (workspace / folder).mkdir(exist_ok=True)

    def convert(item):
        photo_id = item["photoId"]
        record = inventory[photo_id]
        path = (source / record["sourcePath"]).resolve()
        if not path.is_relative_to(source) or (source / record["sourcePath"]).is_symlink():
            raise ValueError(f"{photo_id}: source path escapes source directory")
        if digest(path) != record["sha256"]:
            raise ValueError(f"{photo_id}: source changed; rescan and re-review before export")
        output = workspace / "web" / f"{photo_id}.webp"
        cached = cached_images.get(photo_id, {})
        if (cached.get("sourceSha256") == record["sha256"] and cached.get("pipeline") == PIPELINE
                and output.is_file() and digest(output) == cached.get("sha256")):
            return cached
        with open_photo(path) as (image, backend):
            full = pixels(image, 2000)
            full.save(output, "WEBP", quality=85, method=4)
        return {"photoId": photo_id, "sourcePath": record["sourcePath"], "sourceSha256": record["sha256"],
                "filename": output.name, "webPath": output.relative_to(workspace).as_posix(),
                "width": full.width, "height": full.height, "sha256": digest(output), "pipeline": PIPELINE}

    with ThreadPoolExecutor(max_workers=workers) as pool:
        images = list(pool.map(convert, selection["selected"]))
    by_id = {item["photoId"]: item for item in images}
    groups = []
    for row in selection["selectionRows"]:
        photo_ids = row["photoIds"]
        signature = json_hash({"row": row, "images": [by_id[key]["sha256"] for key in photo_ids], "pipeline": PIPELINE})
        output = workspace / "groups" / f"{row['id']}.jpg"
        cached = cached_groups.get(row["id"], {})
        if cached.get("signature") == signature and output.is_file() and digest(output) == cached.get("sha256"):
            groups.append(cached)
            continue
        ratio = RATIOS[row["shape"]] if row.get("shape") else inventory[photo_ids[0]]["width"] / inventory[photo_ids[0]]["height"]
        # Keep full compositions even for exceptionally tall/wide source photos.
        width, height = max(1, round(min(640, 960 * ratio))), max(1, round(min(960, 640 / ratio)))
        columns = 2 if row["layout"] == "four" else len(photo_ids)
        row_count = (len(photo_ids) + columns - 1) // columns
        gap = 16
        canvas = Image.new("RGB", (columns * width + (columns - 1) * gap,
                                  row_count * height + (row_count - 1) * gap), "#f5f3ee")
        cells = []
        for index, photo_id in enumerate(photo_ids):
            x, y = index % columns * (width + gap), index // columns * (height + gap)
            with Image.open(workspace / by_id[photo_id]["webPath"]) as image:
                contained = ImageOps.contain(image, (width, height), Image.Resampling.LANCZOS)
                canvas.paste(contained, (x + (width - contained.width) // 2, y + (height - contained.height) // 2))
            cells.append({"photoId": photo_id, "x": x, "y": y, "width": width, "height": height})
        canvas.save(output, "JPEG", quality=88)
        groups.append({"rowId": row["id"], "path": output.relative_to(workspace).as_posix(),
                       "signature": signature, "sha256": digest(output), "cells": cells,
                       "treatment": "contain", "width": canvas.width, "height": canvas.height})
    result = {"version": 1, "revision": selection["revision"], "selectionSha256": digest(selection_path),
              "images": images, "groups": groups}
    save_json(workspace / "assets.json", result)
    return result


def worker_count(value):
    count = int(value)
    if not 1 <= count <= 8:
        raise argparse.ArgumentTypeError("workers must be between 1 and 8")
    return count


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    commands = parser.add_subparsers(dest="command", required=True)
    scan_args = commands.add_parser("scan")
    scan_args.add_argument("--source", required=True)
    export_args = commands.add_parser("export")
    export_args.add_argument("--selection", required=True)
    for child in (scan_args, export_args):
        child.add_argument("--workspace", required=True)
        child.add_argument("--workers", type=worker_count, default=4)
    args = parser.parse_args()
    try:
        if args.command == "scan":
            result = scan(args.source, args.workspace, args.workers)
            counts = Counter(item["status"] for item in result["files"])
            print(f"Saved metadata.json: {dict(counts)}; {len(result['contactSheets'])} contact sheets")
            for warning in result["warnings"]:
                print(f"WARNING: {warning}", file=sys.stderr)
            failures = [f"{item['sourcePath']}: {item['error']}" for item in result["files"] if item["status"] == "error"]
            failures.extend(result["metadataErrors"])
            for failure in failures:
                print(f"ERROR: {failure}", file=sys.stderr)
            return 2 if failures else 0
        result = export(args.workspace, args.selection, args.workers)
        print(f"Saved assets.json: {len(result['images'])} selected web images, {len(result['groups'])} uncropped groups")
        return 0
    except (OSError, ValueError, KeyError, TypeError, subprocess.SubprocessError) as exc:
        print(f"ERROR: {exc}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    sys.exit(main())
