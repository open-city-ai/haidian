import hashlib
import json
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[1]
SCRIPT = REPO_ROOT / "scripts" / "refresh_manifest_hashes.py"


class RefreshManifestHashesTests(unittest.TestCase):
    def run_script(self, submission: Path) -> subprocess.CompletedProcess:
        return subprocess.run(
            [sys.executable, str(SCRIPT), str(submission)],
            capture_output=True,
            text=True,
            check=False,
        )

    def test_refreshes_declared_files_and_removes_manifest_self_hash(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            submission = Path(tmp) / "submission"
            submission.mkdir()
            (submission / "proposal.md").write_text("revised proposal\n", encoding="utf-8")
            manifest = {
                "files": [
                    {"path": "manifest.json", "sha256": "0" * 64},
                    {"path": "proposal.md", "sha256": "stale"},
                ]
            }
            manifest_path = submission / "manifest.json"
            manifest_path.write_text(json.dumps(manifest), encoding="utf-8")

            completed = self.run_script(submission)

            self.assertEqual(0, completed.returncode, completed.stdout + completed.stderr)
            updated = json.loads(manifest_path.read_text(encoding="utf-8"))
            self.assertNotIn("sha256", updated["files"][0])
            self.assertEqual(
                hashlib.sha256((submission / "proposal.md").read_bytes()).hexdigest(),
                updated["files"][1]["sha256"],
            )

    def test_missing_or_unsafe_file_aborts_without_rewriting_manifest(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            submission = Path(tmp) / "submission"
            submission.mkdir()
            manifest = {
                "files": [
                    {"path": "manifest.json"},
                    {"path": "missing.txt", "sha256": "keep"},
                    {"path": "../outside.txt", "sha256": "keep"},
                ]
            }
            manifest_path = submission / "manifest.json"
            original = json.dumps(manifest)
            manifest_path.write_text(original, encoding="utf-8")

            completed = self.run_script(submission)

            self.assertEqual(1, completed.returncode)
            self.assertIn("listed file is missing", completed.stdout)
            self.assertIn("unsafe manifest path", completed.stdout)
            self.assertEqual(original, manifest_path.read_text(encoding="utf-8"))
