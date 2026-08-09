import hashlib
import json
import os
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[1]
SCRIPT = REPO_ROOT / "scripts" / "refresh_manifest_hashes.py"


class RefreshManifestHashesTests(unittest.TestCase):
    def write_manifest(self, package: Path, files: list[dict]) -> None:
        (package / "manifest.json").write_text(
            json.dumps({"files": files}, ensure_ascii=False), encoding="utf-8"
        )

    def run_refresh(self, package: Path) -> subprocess.CompletedProcess:
        return subprocess.run(
            [sys.executable, str(SCRIPT), str(package)],
            capture_output=True,
            text=True,
            check=False,
        )

    def test_refreshes_only_manifest_listed_files(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            package = Path(tmp)
            proposal = package / "proposal.md"
            proposal.write_text("proposal body\n", encoding="utf-8")
            self.write_manifest(package, [{"path": "proposal.md", "sha256": "old"}])

            completed = self.run_refresh(package)

            self.assertEqual(0, completed.returncode, completed.stdout + completed.stderr)
            manifest = json.loads((package / "manifest.json").read_text(encoding="utf-8"))
            self.assertEqual(
                hashlib.sha256(proposal.read_bytes()).hexdigest(),
                manifest["files"][0]["sha256"],
            )

    def test_rejects_paths_outside_the_package(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            package = Path(tmp)
            self.write_manifest(package, [{"path": "../outside.txt"}])

            completed = self.run_refresh(package)

            self.assertNotEqual(0, completed.returncode)
            self.assertIn("must stay inside the package", completed.stdout)

    def test_rejects_symlinked_parent_escaping_package(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            package = Path(tmp) / "package"
            outside = Path(tmp) / "outside"
            package.mkdir()
            outside.mkdir()
            (outside / "secret.txt").write_text("outside package\n", encoding="utf-8")
            if not hasattr(os, "symlink"):
                self.skipTest("symlink support is unavailable")
            os.symlink(outside, package / "assets")
            self.write_manifest(package, [{"path": "assets/secret.txt"}])

            completed = self.run_refresh(package)

            self.assertNotEqual(0, completed.returncode)
            self.assertIn("must stay inside the package", completed.stdout)

    def test_rejects_symlinked_manifest_without_modifying_its_target(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            package = Path(tmp) / "package"
            outside = Path(tmp) / "outside-manifest.json"
            package.mkdir()
            outside.write_text('{"files": []}', encoding="utf-8")
            if not hasattr(os, "symlink"):
                self.skipTest("symlink support is unavailable")
            os.symlink(outside, package / "manifest.json")
            original = outside.read_bytes()

            completed = self.run_refresh(package)

            self.assertNotEqual(0, completed.returncode)
            self.assertIn("manifest.json must stay inside the package", completed.stderr)
            self.assertEqual(original, outside.read_bytes())
