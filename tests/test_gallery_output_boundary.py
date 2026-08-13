import json
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
SCRIPT = ROOT / "scripts" / "generate_submissions_data.py"


class GalleryOutputBoundaryTests(unittest.TestCase):
    def make_publication(self, root: Path) -> Path:
        root.mkdir(parents=True, exist_ok=True)
        publication = root / "gallery-publication.json"
        publication.write_text(
            json.dumps({"version": 1, "entries": []}) + "\n",
            encoding="utf-8",
        )
        return publication

    def run_generator(self, root: Path, output: Path) -> subprocess.CompletedProcess[str]:
        return subprocess.run(
            [
                sys.executable,
                str(SCRIPT),
                "--repo-root",
                str(root),
                "--out",
                str(output),
            ],
            cwd=ROOT,
            capture_output=True,
            text=True,
            check=False,
        )

    def assert_rejected_without_change(self, root: Path, output: Path, victim: Path) -> None:
        original = victim.read_bytes()
        result = self.run_generator(root, output)

        self.assertNotEqual(result.returncode, 0)
        self.assertIn("output must not overwrite a gallery publication input", result.stderr)
        self.assertEqual(victim.read_bytes(), original)

    def assert_detached_without_changing_victim(self, root: Path, output: Path, victim: Path) -> None:
        original = victim.read_bytes()
        self.assertTrue(output.samefile(victim))

        result = self.run_generator(root, output)

        self.assertEqual(result.returncode, 0, result.stdout + result.stderr)
        self.assertEqual(victim.read_bytes(), original)
        self.assertTrue(output.is_file())
        self.assertFalse(output.is_symlink())
        self.assertFalse(output.samefile(victim))
        self.assertIn("window.HAIDIAN_SUBMISSIONS = []", output.read_text(encoding="utf-8"))
        self.assertEqual([], list(output.parent.glob(f".{output.name}-*.tmp")))

    def test_output_cannot_overwrite_gallery_publication(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            publication = self.make_publication(root)
            self.assert_rejected_without_change(root, publication, publication)

    def test_symlink_and_hardlink_aliases_are_rejected(self) -> None:
        for kind in ("symlink", "hardlink"):
            with self.subTest(kind=kind), tempfile.TemporaryDirectory() as tmp:
                root = Path(tmp)
                publication = self.make_publication(root)
                alias = root / "gallery-output.js"
                if kind == "symlink":
                    alias.symlink_to(publication)
                else:
                    alias.hardlink_to(publication)
                self.assert_rejected_without_change(root, alias, publication)

    def test_cross_root_canonical_publication_output_is_rejected(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            directory = Path(tmp)
            source_root = directory / "source"
            victim_root = directory / "victim"
            self.make_publication(source_root)
            victim = self.make_publication(victim_root)
            self.assert_rejected_without_change(source_root, victim, victim)

    def test_cross_root_hardlink_alias_is_detached_before_writing(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            directory = Path(tmp)
            source_root = directory / "source"
            victim_root = directory / "victim"
            self.make_publication(source_root)
            victim = self.make_publication(victim_root)
            output = source_root / "gallery-output.js"
            output.hardlink_to(victim)

            self.assert_detached_without_changing_victim(source_root, output, victim)

    def test_output_symlink_alias_is_detached_before_writing(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            directory = Path(tmp)
            source_root = directory / "source"
            victim_root = directory / "victim"
            self.make_publication(source_root)
            victim = self.make_publication(victim_root)
            victim_alias = victim_root / "publication-alias.js"
            victim_alias.hardlink_to(victim)
            output = source_root / "gallery-output.js"
            output.symlink_to(victim_alias)

            self.assert_detached_without_changing_victim(source_root, output, victim)

    def test_output_through_symlinked_directory_is_detached_before_writing(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            directory = Path(tmp)
            source_root = directory / "source"
            victim_root = directory / "victim"
            self.make_publication(source_root)
            victim = self.make_publication(victim_root)
            victim_alias = victim_root / "publication-alias.js"
            victim_alias.hardlink_to(victim)
            output_parent = source_root / "linked-output"
            output_parent.symlink_to(victim_root, target_is_directory=True)
            output = output_parent / victim_alias.name

            self.assert_detached_without_changing_victim(source_root, output, victim)

    def test_failed_replace_removes_temporary_file(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            self.make_publication(root)
            output = root / "output-directory"
            output.mkdir()

            result = self.run_generator(root, output)

            self.assertNotEqual(result.returncode, 0)
            self.assertTrue(output.is_dir())
            self.assertEqual([], list(root.glob(f".{output.name}-*.tmp")))

    def test_distinct_output_is_written(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            self.make_publication(root)
            output = root / "submissions-data.js"

            result = self.run_generator(root, output)

            self.assertEqual(result.returncode, 0, result.stdout + result.stderr)
            self.assertIn("window.HAIDIAN_SUBMISSIONS = []", output.read_text(encoding="utf-8"))


if __name__ == "__main__":
    unittest.main()
