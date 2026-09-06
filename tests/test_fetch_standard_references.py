from __future__ import annotations

import json
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[1]
FETCHER = REPO_ROOT / "scripts" / "fetch_standard_references.py"
sys.path.insert(0, str(REPO_ROOT / "scripts"))

from fetch_standard_references import validate_unique_reference_slugs  # noqa: E402


class FetchStandardReferencesTests(unittest.TestCase):
    def test_repo_standard_ids_have_unique_reference_filenames(self) -> None:
        data = json.loads(
            (REPO_ROOT / "brief" / "site-package" / "standards" / "standards.json").read_text(
                encoding="utf-8"
            )
        )
        validate_unique_reference_slugs(data["standards"])

    def test_filename_collisions_fail_before_fetch_or_output(self) -> None:
        collision_sets = [
            ("STD_A", "STD-A"),
            ("城市设计标准", "建筑设计标准"),
        ]
        for standard_ids in collision_sets:
            with self.subTest(standard_ids=standard_ids), tempfile.TemporaryDirectory() as tmp:
                root = Path(tmp)
                standards = {
                    "standards": [
                        {"standard_id": standard_id, "source_url": "https://example.invalid/standard"}
                        for standard_id in standard_ids
                    ]
                }
                (root / "standards.json").write_text(
                    json.dumps(standards, ensure_ascii=False), encoding="utf-8"
                )

                completed = subprocess.run(
                    [
                        sys.executable,
                        str(FETCHER),
                        "--repo-root",
                        str(root),
                        "--standards",
                        "standards.json",
                        "--output-dir",
                        "references",
                    ],
                    cwd=REPO_ROOT,
                    capture_output=True,
                    text=True,
                    check=False,
                )

                self.assertEqual(completed.returncode, 2, completed.stdout + completed.stderr)
                self.assertIn("filename collision", completed.stderr)
                for standard_id in standard_ids:
                    self.assertIn(standard_id, completed.stderr)
                self.assertFalse((root / "references").exists())


if __name__ == "__main__":
    unittest.main()
