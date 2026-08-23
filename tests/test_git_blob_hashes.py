import hashlib
import json
import os
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path
from unittest import mock


REPO_ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(REPO_ROOT / "scripts"))

from git_blob_hashes import git_blob_sha256  # noqa: E402
from finalize_submission import manifest_digests  # noqa: E402
from refresh_submission_manifest import refresh_manifest  # noqa: E402
from validate_submission import ValidationReport, validate_manifest_file  # noqa: E402


class GitBlobHashTests(unittest.TestCase):
    def git(self, root: Path, *args: str) -> subprocess.CompletedProcess[str]:
        return subprocess.run(
            ["git", *args], cwd=root, capture_output=True, text=True, check=False
        )

    def make_autocrlf_package(self, root: Path) -> tuple[Path, Path, str]:
        self.assertEqual(0, self.git(root, "init").returncode)
        self.assertEqual(
            0,
            self.git(root, "config", "user.email", "test@example.com").returncode,
        )
        self.assertEqual(
            0,
            self.git(root, "config", "user.name", "Test User").returncode,
        )
        self.assertEqual(0, self.git(root, "config", "core.autocrlf", "true").returncode)
        (root / ".gitattributes").write_text("*.md text\n", encoding="utf-8")
        package = root / "submissions" / "alice" / "git-hashes"
        package.mkdir(parents=True)
        proposal = package / "proposal.md"
        proposal.write_text("initial\n", encoding="utf-8")
        self.assertEqual(0, self.git(root, "add", ".").returncode)
        self.assertEqual(0, self.git(root, "commit", "-m", "initial package").returncode)

        proposal.write_bytes(b"updated proposal\r\n")
        expected = hashlib.sha256(b"updated proposal\n").hexdigest()
        return package, proposal, expected

    def test_hashes_pending_git_clean_blobs_without_mutating_real_index(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            _package, proposal, expected = self.make_autocrlf_package(root)

            hashes = git_blob_sha256([proposal], cwd=root)

            self.assertIsNotNone(hashes)
            self.assertEqual(expected, hashes[proposal.resolve()])
            self.assertNotEqual(expected, hashlib.sha256(proposal.read_bytes()).hexdigest())
            self.assertEqual(0, self.git(root, "diff", "--cached", "--quiet").returncode)

    def test_ignored_path_fails_closed_inside_git_repository(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            self.assertEqual(0, self.git(root, "init").returncode)
            (root / ".gitignore").write_text("ignored.md\n", encoding="utf-8")
            ignored = root / "ignored.md"
            ignored.write_text("must not use raw bytes\n", encoding="utf-8")

            with self.assertRaisesRegex(RuntimeError, "could not stage manifest paths"):
                git_blob_sha256([ignored], cwd=root)

    def test_tracked_path_ignores_user_global_excludes_file(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            self.assertEqual(0, self.git(root, "init").returncode)
            self.assertEqual(
                0,
                self.git(root, "config", "user.email", "test@example.com").returncode,
            )
            self.assertEqual(
                0, self.git(root, "config", "user.name", "Test User").returncode
            )
            excludes_file = root / "user-global-excludes"
            excludes_file.write_text("*.pdf\n", encoding="utf-8")
            global_config = root / "user-global-gitconfig"
            self.assertEqual(
                0,
                self.git(
                    root,
                    "config",
                    "--file",
                    str(global_config),
                    "core.excludesFile",
                    str(excludes_file),
                ).returncode,
            )
            drawing = root / "drawings" / "a3-booklet.pdf"
            drawing.parent.mkdir()
            drawing.write_bytes(b"tracked drawing\n")
            self.assertEqual(0, self.git(root, "add", "--force", str(drawing)).returncode)
            self.assertEqual(
                0, self.git(root, "commit", "-m", "track drawing").returncode
            )
            drawing.write_bytes(b"updated drawing\n")

            with mock.patch.dict(
                os.environ, {"GIT_CONFIG_GLOBAL": str(global_config)}
            ):
                hashes = git_blob_sha256([drawing], cwd=root)

            self.assertIsNotNone(hashes)
            self.assertEqual(
                hashlib.sha256(b"updated drawing\n").hexdigest(),
                hashes[drawing.resolve()],
            )
            self.assertEqual(0, self.git(root, "diff", "--cached", "--quiet").returncode)

    def test_manifest_validation_uses_the_same_git_blob_bytes(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            package, _proposal, expected = self.make_autocrlf_package(root)
            (package / "manifest.json").write_text(
                json.dumps(
                    {
                        "submission_stage": "formal",
                        "package_type": "professional_design_package",
                        "package_state": "ready_for_review",
                        "submission_type": "ai_agent",
                        "project_id": "centennial-jingzhang-ai-belt",
                        "files": [{"path": "proposal.md", "sha256": expected}],
                    }
                ),
                encoding="utf-8",
            )

            report = ValidationReport()
            validate_manifest_file(report, root, "submissions/alice/git-hashes")

            self.assertFalse(
                any("sha256 mismatch for `proposal.md`" in item for item in report.errors)
            )

    def test_finalizer_hashes_the_pending_git_blob(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            package, _proposal, expected = self.make_autocrlf_package(root)

            hashes = manifest_digests(package, ["proposal.md"])

            self.assertEqual(expected, hashes["proposal.md"])

    def test_refresh_restores_missing_hash_from_pending_git_blob(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            package, proposal, expected = self.make_autocrlf_package(root)
            (package / "manifest.json").write_text(
                json.dumps(
                    {
                        "submission_stage": "formal",
                        "package_type": "professional_design_package",
                        "package_state": "ready_for_review",
                        "submission_type": "ai_agent",
                        "project_id": "centennial-jingzhang-ai-belt",
                        "validation_claim": {"self_checked": True},
                        "files": [{"path": "proposal.md"}],
                    }
                ),
                encoding="utf-8",
            )

            ok, error, refreshed = refresh_manifest(package)

            self.assertTrue(ok, error)
            self.assertEqual(["proposal.md"], refreshed)
            manifest = json.loads((package / "manifest.json").read_text(encoding="utf-8"))
            self.assertEqual(expected, manifest["files"][0]["sha256"])
            self.assertNotEqual(expected, hashlib.sha256(proposal.read_bytes()).hexdigest())
            report = ValidationReport()
            validate_manifest_file(report, root, "submissions/alice/git-hashes")
            self.assertFalse(
                any("sha256 mismatch for `proposal.md`" in item for item in report.errors),
                report.errors,
            )

    def test_refresh_rejects_symlink_before_hashing(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            package = root / "submissions" / "alice" / "symlink-refresh"
            package.mkdir(parents=True)
            target = package / "target.md"
            target.write_text("safe bytes\n", encoding="utf-8")
            (package / "proposal.md").symlink_to(target.name)
            (package / "manifest.json").write_text(
                json.dumps(
                    {
                        "package_state": "ready_for_review",
                        "validation_claim": {"self_checked": True},
                        "files": [{"path": "proposal.md"}],
                    }
                ),
                encoding="utf-8",
            )

            ok, error, refreshed = refresh_manifest(package)

            self.assertFalse(ok)
            self.assertIn("symbolic link", error)
            self.assertEqual([], refreshed)
            manifest = json.loads((package / "manifest.json").read_text(encoding="utf-8"))
            self.assertNotIn("sha256", manifest["files"][0])


if __name__ == "__main__":
    unittest.main()
