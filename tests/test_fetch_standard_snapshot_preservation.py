from __future__ import annotations

import hashlib
import json
import sys
import tempfile
import unittest
from pathlib import Path
from unittest import mock


REPO_ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(REPO_ROOT / "scripts"))

import fetch_standard_references as fetcher  # noqa: E402


class FetchStandardSnapshotPreservationTests(unittest.TestCase):
    def write_standards(self, root: Path) -> None:
        (root / "standards.json").write_text(
            json.dumps(
                {
                    "standards": [
                        {
                            "standard_id": "STD-A",
                            "title_zh": "Standard A",
                            "source_url": "https://example.com/a",
                        }
                    ]
                }
            ),
            encoding="utf-8",
        )

    def run_fetcher(self, root: Path, result: fetcher.FetchResult) -> int:
        arguments = [
            "fetch_standard_references.py",
            "--repo-root",
            str(root),
            "--standards",
            "standards.json",
            "--output-dir",
            "references",
            "--accessed-date",
            "2026-08-12",
        ]
        with mock.patch.object(sys, "argv", arguments), mock.patch.object(
            fetcher, "fetch_url", return_value=result
        ):
            return fetcher.main()

    def test_transient_failure_preserves_last_successful_snapshot(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            self.write_standards(root)
            reference = root / "references" / "std-a.md"
            reference.parent.mkdir()
            fetcher.write_reference_markdown(
                reference,
                {
                    "standard_id": "STD-A",
                    "title_zh": "Standard A",
                    "source_url": "https://example.com/a",
                    "source_status": "official",
                },
                fetcher.FetchResult(
                    True,
                    "fetched",
                    final_url="https://example.com/final-a",
                    raw_sha256="a" * 64,
                    text="LAST KNOWN GOOD",
                ),
                "2026-08-01",
            )
            original = reference.read_bytes()

            return_code = self.run_fetcher(
                root, fetcher.FetchResult(False, "timeout", error="temporary timeout")
            )

            self.assertEqual(0, return_code)
            self.assertEqual(original, reference.read_bytes())
            record = json.loads((root / "references" / "index.json").read_text())[
                "references"
            ][0]
            self.assertEqual("fetched", record["fetch_status"])
            self.assertEqual("2026-08-01", record["accessed_date"])
            self.assertEqual("https://example.com/final-a", record["final_url"])
            self.assertEqual(hashlib.sha256(original).hexdigest(), record["local_reference_sha256"])

    def test_successful_fetch_replaces_existing_snapshot(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            self.write_standards(root)
            reference = root / "references" / "std-a.md"
            reference.parent.mkdir()
            reference.write_text("OLD SNAPSHOT", encoding="utf-8")

            return_code = self.run_fetcher(
                root,
                fetcher.FetchResult(
                    True,
                    "fetched",
                    final_url="https://example.com/new",
                    raw_sha256="b" * 64,
                    text="NEW SNAPSHOT",
                ),
            )

            self.assertEqual(0, return_code)
            self.assertIn("NEW SNAPSHOT", reference.read_text(encoding="utf-8"))
            self.assertNotIn("OLD SNAPSHOT", reference.read_text(encoding="utf-8"))

    def test_first_failed_fetch_writes_failure_placeholder(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            self.write_standards(root)

            return_code = self.run_fetcher(
                root, fetcher.FetchResult(False, "timeout", error="temporary timeout")
            )

            self.assertEqual(1, return_code)
            reference = root / "references" / "std-a.md"
            self.assertIn("fetch_status: timeout", reference.read_text(encoding="utf-8"))
            record = json.loads((root / "references" / "index.json").read_text())[
                "references"
            ][0]
            self.assertEqual("timeout", record["fetch_status"])


if __name__ == "__main__":
    unittest.main()
