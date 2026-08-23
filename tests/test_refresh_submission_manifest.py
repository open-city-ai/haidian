from __future__ import annotations

import json
import os
import stat
import sys
import tempfile
import unittest
from pathlib import Path
from unittest import mock


REPO_ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(REPO_ROOT / "scripts"))

from refresh_submission_manifest import refresh_manifest  # noqa: E402


class RefreshSubmissionManifestTests(unittest.TestCase):
    def write_manifest(self, root: Path, relative_path: str) -> Path:
        manifest_path = root / "manifest.json"
        manifest_path.write_text(
            json.dumps(
                {
                    "package_state": "ready_for_review",
                    "validation_claim": {"self_checked": True},
                    "files": [{"path": relative_path, "sha256": "0" * 64}],
                }
            ),
            encoding="utf-8",
        )
        return manifest_path

    def test_preserves_manifest_permissions(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            (root / "proposal.md").write_text("# Updated proposal\n", encoding="utf-8")
            manifest_path = self.write_manifest(root, "proposal.md")
            os.chmod(manifest_path, 0o640)
            expected_mode = stat.S_IMODE(manifest_path.stat().st_mode)
            if os.name == "posix":
                self.assertEqual(expected_mode, 0o640)

            with mock.patch(
                "refresh_submission_manifest.os.fchmod",
                side_effect=AssertionError("refresh must not require os.fchmod"),
                create=True,
            ):
                ok, error, _refreshed = refresh_manifest(root)

            self.assertTrue(ok, error)
            self.assertEqual(stat.S_IMODE(manifest_path.stat().st_mode), expected_mode)

    def test_chmod_failure_returns_error_and_removes_temporary_file(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            (root / "proposal.md").write_text("# Updated proposal\n", encoding="utf-8")
            manifest_path = self.write_manifest(root, "proposal.md")
            original_manifest = manifest_path.read_bytes()

            with mock.patch(
                "refresh_submission_manifest.os.chmod",
                side_effect=OSError("simulated chmod failure"),
            ):
                ok, error, refreshed = refresh_manifest(root)

            self.assertFalse(ok)
            self.assertIn("simulated chmod failure", error)
            self.assertEqual(refreshed, [])
            self.assertEqual(manifest_path.read_bytes(), original_manifest)
            self.assertEqual(list(root.glob(".manifest-*.tmp")), [])

    def test_read_failure_returns_error_without_updating_manifest(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            (root / "proposal.md").write_text("# Updated proposal\n", encoding="utf-8")
            manifest_path = self.write_manifest(root, "proposal.md")
            original_manifest = manifest_path.read_bytes()

            with mock.patch(
                "refresh_submission_manifest.manifest_digests",
                side_effect=OSError("simulated read failure"),
            ):
                ok, error, refreshed = refresh_manifest(root)

            self.assertFalse(ok)
            self.assertIn("proposal.md", error)
            self.assertIn("simulated read failure", error)
            self.assertEqual(refreshed, [])
            self.assertEqual(manifest_path.read_bytes(), original_manifest)


if __name__ == "__main__":
    unittest.main()
