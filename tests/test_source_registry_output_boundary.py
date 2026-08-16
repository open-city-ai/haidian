import json
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
SCRIPT = ROOT / "scripts" / "generate_source_registry_data.py"


class SourceRegistryOutputBoundaryTests(unittest.TestCase):
    def make_registry(self, root: Path) -> Path:
        registry = root / "data" / "source_registry.json"
        registry.parent.mkdir(parents=True)
        registry.write_text(
            json.dumps(
                {
                    "updated_date": "2026-08-12",
                    "sources": [
                        {
                            "source_id": "SOURCE-1",
                            "review_status": "approved",
                            "usable_for_formal": "yes",
                        }
                    ],
                }
            )
            + "\n",
            encoding="utf-8",
        )
        return registry

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

    def test_output_cannot_overwrite_source_registry(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            registry = self.make_registry(root)
            original = registry.read_bytes()

            result = self.run_generator(root, registry)

            self.assertNotEqual(result.returncode, 0)
            self.assertIn("output must not overwrite a source registry input", result.stderr)
            self.assertEqual(registry.read_bytes(), original)

    def test_symlink_alias_to_source_registry_is_rejected(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            registry = self.make_registry(root)
            alias = root / "registry-output.js"
            alias.symlink_to(registry)
            original = registry.read_bytes()

            result = self.run_generator(root, alias)

            self.assertNotEqual(result.returncode, 0)
            self.assertIn("output must not overwrite a source registry input", result.stderr)
            self.assertEqual(registry.read_bytes(), original)

    def test_hardlink_alias_to_source_registry_is_rejected(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            registry = self.make_registry(root)
            alias = root / "registry-output.js"
            alias.hardlink_to(registry)
            original = registry.read_bytes()

            result = self.run_generator(root, alias)

            self.assertNotEqual(result.returncode, 0)
            self.assertIn("output must not overwrite a source registry input", result.stderr)
            self.assertEqual(registry.read_bytes(), original)

    def test_cross_root_canonical_registry_output_is_rejected(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            directory = Path(tmp)
            source_root = directory / "source"
            victim_root = directory / "victim"
            self.make_registry(source_root)
            victim = self.make_registry(victim_root)
            original = victim.read_bytes()

            result = self.run_generator(source_root, victim)

            self.assertNotEqual(result.returncode, 0)
            self.assertIn("output must not overwrite a source registry input", result.stderr)
            self.assertEqual(victim.read_bytes(), original)

    def test_cross_root_hardlink_alias_is_detached_before_writing(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            directory = Path(tmp)
            source_root = directory / "source"
            victim_root = directory / "victim"
            self.make_registry(source_root)
            victim = self.make_registry(victim_root)
            output = source_root / "registry-output.js"
            output.hardlink_to(victim)
            original = victim.read_bytes()
            self.assertTrue(output.samefile(victim))

            result = self.run_generator(source_root, output)

            self.assertEqual(result.returncode, 0, result.stdout + result.stderr)
            self.assertEqual(victim.read_bytes(), original)
            self.assertTrue(output.is_file())
            self.assertFalse(output.is_symlink())
            self.assertFalse(output.samefile(victim))
            self.assertIn(
                "window.HAIDIAN_SOURCE_REGISTRY",
                output.read_text(encoding="utf-8"),
            )
            self.assertEqual([], list(output.parent.glob(f".{output.name}-*.tmp")))

    def test_distinct_output_is_written(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            self.make_registry(root)
            output = root / "source-registry-data.js"

            result = self.run_generator(root, output)

            self.assertEqual(result.returncode, 0, result.stdout + result.stderr)
            self.assertIn("window.HAIDIAN_SOURCE_REGISTRY", output.read_text(encoding="utf-8"))


if __name__ == "__main__":
    unittest.main()
