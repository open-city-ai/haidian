import hashlib
import json
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[1]
SCRIPT = REPO_ROOT / "scripts" / "refresh_manifest_hashes.py"


def digest(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


class RefreshManifestHashesTests(unittest.TestCase):
    def make_package(self, root: Path) -> tuple[Path, Path]:
        package = root / "submissions" / "alice" / "hash-refresh"
        package.mkdir(parents=True)
        proposal = package / "proposal.md"
        proposal.write_text("updated proposal\n", encoding="utf-8")
        manifest = {
            "package_state": "ready_for_review",
            "files": [
                {"path": "proposal.md", "sha256": "0" * 64},
                {"path": "manifest.json"},
            ],
        }
        manifest_path = package / "manifest.json"
        manifest_path.write_text(json.dumps(manifest, indent=2) + "\n", encoding="utf-8")
        return package, manifest_path

    def run_script(self, package: Path, *args: str) -> subprocess.CompletedProcess[str]:
        return subprocess.run(
            [sys.executable, str(SCRIPT), str(package), *args],
            capture_output=True,
            text=True,
            check=False,
        )

    def test_refreshes_stale_hashes_without_hashing_manifest_itself(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            package, manifest_path = self.make_package(Path(tmp))

            completed = self.run_script(package)

            self.assertEqual(0, completed.returncode, completed.stderr)
            manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
            self.assertEqual(digest(package / "proposal.md"), manifest["files"][0]["sha256"])
            self.assertNotIn("sha256", manifest["files"][1])

    def test_check_reports_stale_hashes_without_writing(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            package, manifest_path = self.make_package(Path(tmp))
            before = manifest_path.read_bytes()

            completed = self.run_script(package, "--check")

            self.assertEqual(1, completed.returncode)
            self.assertIn("need refresh", completed.stdout)
            self.assertEqual(before, manifest_path.read_bytes())

    def test_invalid_manifest_fails_before_writing(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            package, manifest_path = self.make_package(Path(tmp))
            manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
            manifest["files"].append({"path": "../outside.txt", "sha256": "0" * 64})
            manifest_path.write_text(json.dumps(manifest, indent=2) + "\n", encoding="utf-8")
            before = manifest_path.read_bytes()

            completed = self.run_script(package)

            self.assertEqual(1, completed.returncode)
            self.assertIn("unsafe path", completed.stderr)
            self.assertEqual(before, manifest_path.read_bytes())

    def test_symlink_outside_package_fails_before_writing(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            package, manifest_path = self.make_package(root)
            outside = root / "outside.txt"
            outside.write_text("outside package\n", encoding="utf-8")
            try:
                (package / "outside-link.txt").symlink_to(outside)
            except (NotImplementedError, OSError):
                self.skipTest("symbolic links are not available on this platform")
            manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
            manifest["files"].append({"path": "outside-link.txt", "sha256": "0" * 64})
            manifest_path.write_text(json.dumps(manifest, indent=2) + "\n", encoding="utf-8")
            before = manifest_path.read_bytes()

            completed = self.run_script(package)

            self.assertEqual(1, completed.returncode)
            self.assertIn("resolves outside the package", completed.stderr)
            self.assertEqual(before, manifest_path.read_bytes())

    def test_refresh_preserves_manifest_file_mode(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            package, manifest_path = self.make_package(Path(tmp))
            manifest_path.chmod(0o640)
            expected_mode = manifest_path.stat().st_mode & 0o777

            completed = self.run_script(package)

            self.assertEqual(0, completed.returncode, completed.stderr)
            self.assertEqual(expected_mode, manifest_path.stat().st_mode & 0o777)


if __name__ == "__main__":
    unittest.main()
