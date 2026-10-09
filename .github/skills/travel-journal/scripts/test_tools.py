import copy
from contextlib import redirect_stderr, redirect_stdout
import io
import json
from pathlib import Path
import sys
import tempfile
import unittest
from unittest.mock import patch

from PIL import Image

from check_layout import check, main as check_main
import photos


def plan(photo_ids):
    return {
        "version": 1, "revision": "v1", "coverId": photo_ids[0],
        "selected": [
            {"photoId": key, "day": "2025-01-01", "eventId": "walk",
             "reason": "Distinct scene", "caption": {"zh": "场景", "en": "Scene"}}
            for key in photo_ids
        ],
        "selectionRows": [
            {"id": f"scene-{index}", "day": "2025-01-01", "eventId": "walk",
             "sectionId": "walk", "layout": "one", "photoIds": [key],
             "shape": None, "treatment": "contain", "reason": "Full composition"}
            for index, key in enumerate(photo_ids)
        ],
        "exclusions": [], "layoutExceptions": [],
    }


def inventory(photo_ids):
    return {
        "version": 1,
        "files": [
            {"id": key, "kind": "image", "status": "ready", "width": 120, "height": 80}
            for key in photo_ids
        ],
    }


class LayoutTests(unittest.TestCase):
    def setUp(self):
        self.keys = ["p-a", "p-b", "p-c"]
        self.selection = plan(self.keys)
        self.metadata = inventory(self.keys)

    def test_natural_singles_and_equal_pairs(self):
        self.assertEqual(check(self.selection, self.metadata), [])
        self.selection["selectionRows"] = [
            {**self.selection["selectionRows"][0], "layout": "two", "photoIds": self.keys[:2]},
            self.selection["selectionRows"][2],
        ]
        self.assertEqual(check(self.selection, self.metadata), [])

    def test_complete_row_counts_for_every_supported_layout(self):
        for layout, count in (("one", 1), ("two", 2), ("three", 3), ("four", 4)):
            with self.subTest(layout=layout):
                keys = [f"p-{index}" for index in range(count)]
                selection = plan(keys)
                selection["selectionRows"] = [
                    {**selection["selectionRows"][0], "layout": layout, "photoIds": keys}
                ]
                self.assertEqual(check(selection, inventory(keys)), [])
                selection["selectionRows"][0]["photoIds"].append("p-extra")
                self.assertTrue(any("requires exactly" in error for error in check(selection, inventory(keys))))

    def test_mixed_ratios_need_equal_frames(self):
        self.selection["selectionRows"] = [
            {**self.selection["selectionRows"][0], "layout": "three", "photoIds": self.keys}
        ]
        self.metadata["files"][1].update(width=80, height=120)
        self.assertTrue(any("natural ratios" in error for error in check(self.selection, self.metadata)))
        self.selection["selectionRows"][0]["shape"] = "portrait"
        self.assertEqual(check(self.selection, self.metadata), [])
        self.selection["selectionRows"][0]["treatment"] = "crop"
        self.assertTrue(any("crop" in error for error in check(self.selection, self.metadata)))
        self.selection["selectionRows"][0]["cropReviewedIds"] = self.keys
        self.assertEqual(check(self.selection, self.metadata), [])

    def test_duplicate_missing_excluded_and_wrong_day_are_failures(self):
        mutations = [
            lambda item: item["selectionRows"][1].update(photoIds=["p-a"]),
            lambda item: item["selectionRows"].pop(),
            lambda item: item["exclusions"].append("p-a"),
            lambda item: item["selectionRows"][0].update(day="2025-01-02"),
            lambda item: item["selectionRows"][0].update(day="2025-02-30"),
            lambda item: item["selectionRows"][0].update(layout="weighted-left"),
            lambda item: item["selectionRows"][0].update(shape="natural"),
        ]
        for mutation in mutations:
            changed = copy.deepcopy(self.selection)
            mutation(changed)
            self.assertTrue(check(changed, self.metadata))

    def test_exact_duplicate_content_and_extraction_errors_block_export(self):
        self.metadata["files"][0]["sha256"] = "same-content"
        self.metadata["files"][1]["sha256"] = "same-content"
        self.assertTrue(any("byte-identical" in error for error in check(self.selection, self.metadata)))
        self.metadata["files"][1]["sha256"] = "different-content"
        self.metadata["metadataErrors"] = ["GPS extraction failed"]
        self.assertTrue(any("extraction errors" in error for error in check(self.selection, self.metadata)))

    def test_natural_ratio_threshold(self):
        self.selection["selectionRows"] = [
            {**self.selection["selectionRows"][0], "layout": "three", "photoIds": self.keys}
        ]
        self.metadata["files"][0].update(width=100, height=100)
        self.metadata["files"][1].update(width=102, height=100)
        self.metadata["files"][2].update(width=100, height=100)
        self.assertEqual(check(self.selection, self.metadata), [])
        self.metadata["files"][1]["width"] = 103
        self.assertTrue(any("natural ratios" in error for error in check(self.selection, self.metadata)))

    def test_cross_event_requires_disclosure(self):
        self.selection["selected"][0]["eventId"] = "other"
        self.assertTrue(any("cross-event" in error for error in check(self.selection, self.metadata)))
        self.selection["selectionRows"][0]["crossEventReason"] = "Related views within this day"
        self.assertEqual(check(self.selection, self.metadata), [])

    def test_rhythm_gates_and_only_documented_exceptions(self):
        keys = [f"p-{index}" for index in range(6)]
        selection, metadata = plan(keys), inventory(keys)
        errors = check(selection, metadata)
        self.assertTrue(any("diversity" in error for error in errors))
        self.assertTrue(any("repetition" in error for error in errors))
        selection["layoutExceptions"] = [
            {"rule": "diversity", "reason": "Only six distinct full-composition portraits exist"},
            {"rule": "repetition", "reason": "An approved portrait sequence"},
        ]
        self.assertEqual(check(selection, metadata), [])
        selection["layoutExceptions"].append({"rule": "wrong-day", "reason": "No"})
        self.assertTrue(check(selection, metadata))

    def test_document_mapping_and_no_tilt(self):
        document = {
            "images": [{"id": key, "filename": key + ".webp", "width": 120, "height": 80} for key in self.keys],
            "metadata": {"coverImageId": self.keys[0], "title": {"zh": "标题", "en": "Title"}},
            "pages": [{"sectionId": "walk", "blocks": [
                {"id": row["id"], "type": "gallery", "layout": row["layout"],
                 "images": [{"imageId": key} for key in row["photoIds"]]}
                for row in self.selection["selectionRows"]
            ]}],
        }
        assets = {"version": 1, "images": [
            {"photoId": key, "filename": key + ".webp", "width": 120, "height": 80} for key in self.keys
        ]}
        self.assertEqual(check(self.selection, self.metadata, document, assets), [])
        for mutate in (
            lambda doc: doc["pages"][0]["blocks"][0]["images"][0].update(tilt="left"),
            lambda doc: doc["pages"][0]["blocks"][0]["images"][0].update(shape="square"),
            lambda doc: doc["images"][0].update(filename="wrong.webp"),
            lambda doc: doc["metadata"].update(coverImageId="p-other"),
        ):
            changed = copy.deepcopy(document)
            mutate(changed)
            self.assertTrue(check(self.selection, self.metadata, changed, assets))

    def test_malformed_inputs_report_errors_not_success(self):
        self.assertTrue(check({}, {}))
        for field, value in (("selectionRows", "bad"), ("selected", [{}]), ("layoutExceptions", [{}])):
            changed = copy.deepcopy(self.selection)
            changed[field] = value
            self.assertTrue(check(changed, self.metadata))
        self.assertTrue(check(self.selection, self.metadata, {"images": [], "metadata": [], "pages": []}))

    def test_cli_fails_and_passes(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            photos.save_json(root / "selection.json", self.selection)
            photos.save_json(root / "metadata.json", self.metadata)
            args = ["check_layout.py", "--selection", str(root / "selection.json"),
                    "--metadata", str(root / "metadata.json")]
            with patch.object(sys, "argv", args), redirect_stdout(io.StringIO()):
                self.assertEqual(check_main(), 0)
            self.selection["selectionRows"].pop()
            photos.save_json(root / "selection.json", self.selection)
            with patch.object(sys, "argv", args), redirect_stderr(io.StringIO()):
                self.assertEqual(check_main(), 1)


class PhotoTests(unittest.TestCase):
    def setUp(self):
        self.temporary = tempfile.TemporaryDirectory()
        self.root = Path(self.temporary.name)
        self.source = self.root / "source"
        self.workspace = self.root / "workspace"
        self.source.mkdir()
        (self.source / "nested").mkdir()
        exif = Image.Exif()
        exif[274] = 6
        exif[306] = "2025:01:01 13:00:00"
        exif[34665] = {36867: "2025:01:01 13:00:00", 36881: "+08:00", 37521: "123"}
        Image.new("RGB", (120, 80), "red").save(self.source / "same.jpg", exif=exif)
        (self.source / "nested" / "same.jpg").write_bytes((self.source / "same.jpg").read_bytes())
        Image.new("RGB", (100, 50), "blue").save(self.source / "landscape.png")
        self.hashes = {path: photos.digest(path) for path in self.source.rglob("*") if path.is_file()}

    def tearDown(self):
        self.temporary.cleanup()

    def scan(self):
        with patch.object(photos, "batch_exif", return_value=({}, ["test fallback"])):
            return photos.scan(self.source, self.workspace, workers=2)

    def test_nested_inventory_orientation_duplicates_and_all_contact_sheets(self):
        for index in range(21):
            Image.new("RGB", (30, 20), (index * 10, 80, 100)).save(self.source / f"photo-{index}.jpg")
        (self.source / "live.mov").write_bytes(b"video registered without pretending it was reviewed")
        (self.source / "context.txt").write_text("registered", encoding="utf-8")
        manifest = self.scan()
        self.assertEqual(len(manifest["files"]), 26)
        self.assertEqual(len(manifest["contactSheets"]), 2)
        same = [item for item in manifest["files"] if item["sourcePath"].endswith("same.jpg")]
        self.assertNotEqual(same[0]["id"], same[1]["id"])
        self.assertEqual((same[0]["width"], same[0]["height"]), (80, 120))
        self.assertEqual(same[0]["rawExif"]["DateTime"], "2025:01:01 13:00:00")
        self.assertEqual(same[0]["rawExif"]["Exif"]["DateTimeOriginal"], "2025:01:01 13:00:00")
        self.assertEqual(same[0]["rawExif"]["Exif"]["OffsetTimeOriginal"], "+08:00")
        self.assertIn([item["id"] for item in same], manifest["exactDuplicateGroups"])
        self.assertEqual(next(item for item in manifest["files"] if item["kind"] == "video")["status"], "registered")
        for index, name in enumerate(manifest["contactSheets"]):
            with Image.open(self.workspace / name) as sheet:
                self.assertEqual(sheet.size, (1400, 920 if index == 0 else 230))
        for path, value in self.hashes.items():
            self.assertEqual(photos.digest(path), value)

    def test_rerun_skips_decode_and_exif_batch(self):
        original = self.scan()
        with patch.object(photos, "open_photo", side_effect=AssertionError("cache must avoid decoding")), \
                patch.object(photos, "batch_exif", side_effect=AssertionError("cache must avoid EXIF batch")):
            again = photos.scan(self.source, self.workspace, workers=2)
        self.assertEqual(original["files"], again["files"])
        self.assertEqual(original["fingerprint"], again["fingerprint"])
        with self.assertRaisesRegex(ValueError, "another source"):
            other = self.root / "other"
            other.mkdir()
            photos.scan(other, self.workspace)
        with self.assertRaisesRegex(ValueError, "non-nested"):
            photos.scan(self.source, self.source / "workspace")

    def test_errors_are_saved_and_metadata_failures_are_retried(self):
        (self.source / "bad.jpg").write_bytes(b"not a photo")
        manifest = self.scan()
        self.assertEqual(next(item for item in manifest["files"] if item["sourcePath"] == "bad.jpg")["status"], "error")
        with patch.object(photos, "batch_exif", side_effect=ValueError("exif failed")):
            (self.source / "context.txt").write_text("new inventory", encoding="utf-8")
            failed = photos.scan(self.source, self.workspace)
        self.assertIn("exif failed", failed["metadataErrors"])
        with patch.object(photos, "batch_exif", return_value=({}, [])) as extractor:
            fixed = photos.scan(self.source, self.workspace)
        extractor.assert_called_once()
        self.assertEqual(fixed["metadataErrors"], [])
        args = ["photos.py", "scan", "--source", str(self.source), "--workspace", str(self.workspace)]
        with patch.object(sys, "argv", args), patch.object(photos, "batch_exif", return_value=({}, [])), \
                redirect_stdout(io.StringIO()), redirect_stderr(io.StringIO()):
            self.assertEqual(photos.main(), 2)

    def test_selected_only_exports_are_uncropped_metadata_free_and_cached(self):
        manifest = self.scan()
        keys = [item["id"] for item in manifest["files"] if item["sourcePath"] in ("same.jpg", "landscape.png")]
        selection = plan(keys)
        selection["selectionRows"] = [
            {**selection["selectionRows"][0], "layout": "two", "photoIds": keys, "shape": "portrait"}
        ]
        selected_file = self.workspace / "selection.json"
        photos.save_json(selected_file, selection)
        exported = photos.export(self.workspace, selected_file, workers=2)
        self.assertEqual(len(list((self.workspace / "web").iterdir())), 2)
        self.assertEqual(len(exported["groups"]), 1)
        cells = exported["groups"][0]["cells"]
        self.assertEqual((cells[0]["width"], cells[0]["height"]), (cells[1]["width"], cells[1]["height"]))
        self.assertEqual(exported["groups"][0]["treatment"], "contain")
        for asset in exported["images"]:
            with Image.open(self.workspace / asset["webPath"]) as image:
                self.assertEqual(len(image.getexif()), 0)
                self.assertNotIn("xmp", image.info)
                expected = next(item for item in manifest["files"] if item["id"] == asset["photoId"])
                self.assertEqual(image.size, (expected["width"], expected["height"]))
        with Image.open(self.workspace / exported["groups"][0]["path"]) as image:
            # Mixed portrait/landscape compositions are letterboxed, never cropped.
            self.assertGreater(image.getpixel((2, 2))[0], 200)
        with patch.object(photos, "open_photo", side_effect=AssertionError("cached export must not decode")):
            self.assertEqual(photos.export(self.workspace, selected_file), exported)
        for path, value in self.hashes.items():
            self.assertEqual(photos.digest(path), value)
        (self.source / "same.jpg").write_bytes(b"changed")
        with self.assertRaisesRegex(ValueError, "source changed"):
            photos.export(self.workspace, selected_file)

    def test_symlinks_are_registered_without_reading_targets(self):
        (self.source / "linked.jpg").symlink_to(self.root / "outside.jpg")
        manifest = self.scan()
        linked = next(item for item in manifest["files"] if item["sourcePath"] == "linked.jpg")
        self.assertEqual(linked["status"], "unsupported")
        self.assertNotIn("sha256", linked)


if __name__ == "__main__":
    unittest.main()
