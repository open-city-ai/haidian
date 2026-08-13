from __future__ import annotations

import hashlib
import json
import os
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
SCRIPT = ROOT / "scripts" / "generate_exhibit.py"


class GenerateExhibitOutputBoundaryTests(unittest.TestCase):
    def make_submission(
        self, root: Path, author: str, slug: str
    ) -> tuple[Path, dict[str, Path]]:
        submission = root / "submissions" / author / slug
        figure = submission / "assets" / "figures" / "site-overview.png"
        figure.parent.mkdir(parents=True)
        proposal = submission / "proposal.md"
        proposal.write_text(
            f'---\ntitle: "{slug}"\nsummary: "Sample published exhibit"\n'
            f'author_github: "{author}"\n---\n# Sample\n',
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
        return submission, {
            "proposal": proposal,
            "self-check": self_check,
            "manifest": manifest_path,
            "proposal figure": figure,
            "reviewed package artifact": evidence,
        }

    def make_fixture(
        self, root: Path
    ) -> tuple[Path, list[tuple[str, Path]], dict[str, Path]]:
        submission, own_files = self.make_submission(root, "alice", "sample")
        other_submission, other_files = self.make_submission(root, "bob", "other")

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
                        },
                        {
                            "path": "submissions/bob/other",
                            "published": True,
                            "featured": False,
                            "review_status": "approved_for_publication",
                            "quality_tier": "qualified",
                            "reviewed_by": "maintainer",
                            "reviewed_at": "2026-08-12",
                            "rights_reviewed": True,
                            "reviewed_package_sha256": package_sha256(other_submission),
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
            ("proposal", own_files["proposal"]),
            ("self-check", own_files["self-check"]),
            ("manifest", own_files["manifest"]),
            ("publication registry", registry),
            ("proposal figure", own_files["proposal figure"]),
            ("reviewed package artifact", own_files["reviewed package artifact"]),
        ], other_files

    def run_generator(
        self, root: Path, submission: Path, output: Path | None = None
    ) -> subprocess.CompletedProcess[str]:
        command = [
            sys.executable,
            str(SCRIPT),
            str(submission),
            "--repo-root",
            str(root),
        ]
        if output is not None:
            command.extend(["--output", str(output)])
        return subprocess.run(
            command,
            cwd=ROOT,
            capture_output=True,
            text=True,
            check=False,
        )

    def test_output_cannot_overwrite_generation_inputs(self):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            submission, inputs, _other_files = self.make_fixture(root)

            for label, input_path in inputs:
                with self.subTest(label=label):
                    original = input_path.read_bytes()
                    result = self.run_generator(root, submission, input_path)

                    self.assertNotEqual(result.returncode, 0)
                    self.assertIn(f"output must not overwrite the {label} input", result.stderr)
                    self.assertEqual(input_path.read_bytes(), original)

    def test_output_cannot_overwrite_another_published_package(self):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            submission, _inputs, other_files = self.make_fixture(root)

            for label in (
                "proposal",
                "manifest",
                "reviewed package artifact",
                "proposal figure",
            ):
                with self.subTest(label=label):
                    target = other_files[label]
                    original = target.read_bytes()
                    result = self.run_generator(root, submission, target)

                    self.assertNotEqual(result.returncode, 0)
                    self.assertIn(
                        "output must not overwrite an existing file inside submissions/",
                        result.stderr,
                    )
                    self.assertEqual(target.read_bytes(), original)

    def test_output_cannot_overwrite_input_through_hardlink(self):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            submission, inputs, _other_files = self.make_fixture(root)
            proposal = dict(inputs)["proposal"]
            alias = root / "proposal-alias.md"
            os.link(proposal, alias)
            original = proposal.read_bytes()

            result = self.run_generator(root, submission, alias)

            self.assertNotEqual(result.returncode, 0)
            self.assertIn("output must not overwrite the proposal input", result.stderr)
            self.assertEqual(proposal.read_bytes(), original)

    def test_default_output_can_be_regenerated(self):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            submission, _inputs, _other_files = self.make_fixture(root)

            first = self.run_generator(root, submission)
            second = self.run_generator(root, submission)

            self.assertEqual(first.returncode, 0, first.stdout + first.stderr)
            self.assertEqual(second.returncode, 0, second.stdout + second.stderr)
            self.assertEqual(
                json.loads((submission / "exhibit.json").read_text(encoding="utf-8"))["version"],
                1,
            )

    def test_distinct_output_is_written(self):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            submission, _inputs, _other_files = self.make_fixture(root)
            output = root / "generated" / "exhibit.json"

            result = self.run_generator(root, submission, output)

            self.assertEqual(result.returncode, 0, result.stdout + result.stderr)
            self.assertEqual(json.loads(output.read_text(encoding="utf-8"))["version"], 1)


if __name__ == "__main__":
    unittest.main()
