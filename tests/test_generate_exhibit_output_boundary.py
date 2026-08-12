from __future__ import annotations

import hashlib
import json
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
SCRIPT = ROOT / "scripts" / "generate_exhibit.py"


class GenerateExhibitOutputBoundaryTests(unittest.TestCase):
    def make_fixture(self, root: Path) -> tuple[Path, list[tuple[str, Path]]]:
        submission = root / "submissions" / "alice" / "sample"
        figure = submission / "assets" / "figures" / "site-overview.png"
        figure.parent.mkdir(parents=True)
        proposal = submission / "proposal.md"
        proposal.write_text(
            '---\ntitle: "Sample"\nsummary: "Sample published exhibit"\n'
            'author_github: "alice"\n---\n# Sample\n',
            encoding="utf-8",
        )
        figure.write_bytes(b"fixture image")
        self_check = submission / "self_check.json"
        self_check.write_text('{"checks": []}\n', encoding="utf-8")
        evidence = submission / "evidence.json"
        evidence.write_text('{"status": "reviewed"}\n', encoding="utf-8")
        manifest = {
            "files": [
                {
                    "path": "proposal.md",
                    "sha256": hashlib.sha256(proposal.read_bytes()).hexdigest(),
                },
                {
                    "path": "assets/figures/site-overview.png",
                    "sha256": hashlib.sha256(figure.read_bytes()).hexdigest(),
                },
                {
                    "path": "self_check.json",
                    "sha256": hashlib.sha256(self_check.read_bytes()).hexdigest(),
                },
                {
                    "path": "evidence.json",
                    "sha256": hashlib.sha256(evidence.read_bytes()).hexdigest(),
                },
            ]
        }
        manifest_path = submission / "manifest.json"
        manifest_path.write_text(json.dumps(manifest), encoding="utf-8")

        sys.path.insert(0, str(ROOT / "scripts"))
        from generate_submissions_data import package_sha256

        registry = root / "gallery-publication.json"
        registry.write_text(
            json.dumps(
                {
                    "version": 1,
                    "entries": [
                        {
                            "path": "submissions/alice/sample",
                            "published": True,
                            "featured": False,
                            "review_status": "approved_for_publication",
                            "quality_tier": "qualified",
                            "reviewed_by": "maintainer",
                            "reviewed_at": "2026-08-12",
                            "rights_reviewed": True,
                            "reviewed_package_sha256": package_sha256(submission),
                            "selection_reason_zh": "通过内容与版权审核。",
                            "selection_reason_en": "Approved after content and rights review.",
                            "selected_at": "2026-08-12",
                        }
                    ],
                }
            ),
            encoding="utf-8",
        )
        return submission, [
            ("proposal", proposal),
            ("self-check", self_check),
            ("manifest", manifest_path),
            ("publication registry", registry),
            ("proposal figure", figure),
            ("reviewed package artifact", evidence),
        ]

    def run_generator(
        self, root: Path, submission: Path, output: Path
    ) -> subprocess.CompletedProcess[str]:
        return subprocess.run(
            [
                sys.executable,
                str(SCRIPT),
                str(submission),
                "--repo-root",
                str(root),
                "--output",
                str(output),
            ],
            cwd=ROOT,
            capture_output=True,
            text=True,
            check=False,
        )

    def test_output_cannot_overwrite_generation_inputs(self):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            submission, inputs = self.make_fixture(root)

            for label, input_path in inputs:
                with self.subTest(label=label):
                    original = input_path.read_bytes()
                    result = self.run_generator(root, submission, input_path)

                    self.assertNotEqual(result.returncode, 0)
                    self.assertIn(f"output must not overwrite the {label} input", result.stderr)
                    self.assertEqual(input_path.read_bytes(), original)

    def test_distinct_output_is_written(self):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            submission, _inputs = self.make_fixture(root)
            output = root / "generated" / "exhibit.json"

            result = self.run_generator(root, submission, output)

            self.assertEqual(result.returncode, 0, result.stdout + result.stderr)
            self.assertEqual(json.loads(output.read_text(encoding="utf-8"))["version"], 1)


if __name__ == "__main__":
    unittest.main()
