from __future__ import annotations

import hashlib
import json
import os
import stat
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
            f'author_github: "{author}"\ntracks: ["sample-track"]\n'
            'scenarios: ["sample-scenario"]\n---\n# Sample\n',
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

        schema = root / "schema" / "exhibit.schema.json"
        schema.parent.mkdir()
        schema.write_bytes((ROOT / "schema" / "exhibit.schema.json").read_bytes())
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
            ("exhibit schema", schema),
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
        labels = (
            "proposal",
            "self-check",
            "manifest",
            "publication registry",
            "exhibit schema",
            "proposal figure",
            "reviewed package artifact",
        )
        for label in labels:
            with self.subTest(label=label), tempfile.TemporaryDirectory() as tmp:
                root = Path(tmp)
                submission, inputs, _other_files = self.make_fixture(root)
                input_path = dict(inputs)[label]
                original = input_path.read_bytes()

                result = self.run_generator(root, submission, input_path)

                self.assertNotEqual(result.returncode, 0)
                self.assertIn(f"output must not overwrite the {label} input", result.stderr)
                self.assertEqual(input_path.read_bytes(), original)

    def test_output_cannot_overwrite_another_published_package(self):
        labels = (
            "proposal",
            "self-check",
            "manifest",
            "reviewed package artifact",
            "proposal figure",
        )
        for label in labels:
            with self.subTest(label=label), tempfile.TemporaryDirectory() as tmp:
                root = Path(tmp)
                submission, _inputs, other_files = self.make_fixture(root)
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
        labels = (
            "proposal",
            "self-check",
            "manifest",
            "publication registry",
            "exhibit schema",
            "proposal figure",
            "reviewed package artifact",
        )
        for label in labels:
            with self.subTest(label=label), tempfile.TemporaryDirectory() as tmp:
                root = Path(tmp)
                submission, inputs, _other_files = self.make_fixture(root)
                target = dict(inputs)[label]
                alias = root / f"{label.replace(' ', '-')}-alias"
                os.link(target, alias)
                original = target.read_bytes()

                result = self.run_generator(root, submission, alias)

                self.assertNotEqual(result.returncode, 0)
                self.assertIn(f"output must not overwrite the {label} input", result.stderr)
                self.assertEqual(target.read_bytes(), original)

    def test_output_cannot_overwrite_input_through_symlink(self):
        for package in ("selected", "other"):
            with self.subTest(package=package), tempfile.TemporaryDirectory() as tmp:
                root = Path(tmp)
                submission, inputs, other_files = self.make_fixture(root)
                target = (
                    dict(inputs)["proposal"]
                    if package == "selected"
                    else other_files["proposal"]
                )
                alias = root / f"{package}-proposal-symlink.md"
                alias.symlink_to(target)
                original = target.read_bytes()

                result = self.run_generator(root, submission, alias)

                self.assertNotEqual(result.returncode, 0)
                self.assertEqual(target.read_bytes(), original)

    def test_external_hardlink_to_other_package_is_replaced_atomically(self):
        labels = (
            "proposal",
            "self-check",
            "manifest",
            "reviewed package artifact",
            "proposal figure",
        )
        for label in labels:
            with self.subTest(label=label), tempfile.TemporaryDirectory() as tmp:
                root = Path(tmp)
                submission, _inputs, other_files = self.make_fixture(root)
                target = other_files[label]
                alias = root / f"external-{label.replace(' ', '-')}-hardlink"
                os.link(target, alias)
                original = target.read_bytes()

                result = self.run_generator(root, submission, alias)

                self.assertEqual(result.returncode, 0, result.stdout + result.stderr)
                self.assertEqual(target.read_bytes(), original)
                self.assertFalse(alias.samefile(target))
                self.assertEqual(json.loads(alias.read_text(encoding="utf-8"))["version"], 1)

    def test_default_output_alias_to_other_package_is_replaced_atomically(self):
        for alias_kind in ("symlink", "hardlink"):
            with self.subTest(alias_kind=alias_kind), tempfile.TemporaryDirectory() as tmp:
                root = Path(tmp)
                submission, _inputs, other_files = self.make_fixture(root)
                target = other_files["proposal"]
                output = submission / "exhibit.json"
                if alias_kind == "symlink":
                    output.symlink_to(target)
                else:
                    os.link(target, output)
                original = target.read_bytes()

                result = self.run_generator(root, submission)

                self.assertEqual(result.returncode, 0, result.stdout + result.stderr)
                self.assertEqual(target.read_bytes(), original)
                self.assertFalse(output.is_symlink())
                self.assertFalse(output.samefile(target))
                self.assertEqual(json.loads(output.read_text(encoding="utf-8"))["version"], 1)

    def test_output_cannot_create_files_in_another_package(self):
        targets = (
            "exhibit.json",
            "assets/figures/injected.png",
            "report/proposal.html",
        )
        for relative in targets:
            with self.subTest(relative=relative), tempfile.TemporaryDirectory() as tmp:
                root = Path(tmp)
                submission, _inputs, other_files = self.make_fixture(root)
                other_submission = other_files["proposal"].parent
                output = other_submission / relative

                result = self.run_generator(root, submission, output)

                self.assertNotEqual(result.returncode, 0)
                self.assertIn("output must not write a new file inside submissions/", result.stderr)
                self.assertFalse(output.exists())

    def test_dangling_symlink_inside_submissions_cannot_escape(self):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            submission, _inputs, other_files = self.make_fixture(root)
            outside = root / "outside" / "escaped.json"
            outside.parent.mkdir()
            output = other_files["proposal"].parent / "dangling-output.json"
            output.symlink_to(outside)

            result = self.run_generator(root, submission, output)

            self.assertNotEqual(result.returncode, 0)
            self.assertIn("output must not write a new file inside submissions/", result.stderr)
            self.assertTrue(output.is_symlink())
            self.assertFalse(outside.exists())

    def test_default_output_can_be_regenerated(self):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            submission, _inputs, _other_files = self.make_fixture(root)

            first = self.run_generator(root, submission)
            output = submission / "exhibit.json"
            output.chmod(0o640)
            second = self.run_generator(root, submission)

            self.assertEqual(first.returncode, 0, first.stdout + first.stderr)
            self.assertEqual(second.returncode, 0, second.stdout + second.stderr)
            self.assertEqual(stat.S_IMODE(output.stat().st_mode), 0o640)
            self.assertEqual(
                json.loads(output.read_text(encoding="utf-8"))["version"],
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
