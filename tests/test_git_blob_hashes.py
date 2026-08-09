import hashlib
import json
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(REPO_ROOT / "scripts"))

from git_blob_hashes import git_blob_sha256  # noqa: E402
from finalize_submission import manifest_digests  # noqa: E402
from validate_submission import ValidationReport, validate_manifest_file  # noqa: E402


class GitBlobHashTests(unittest.TestCase):
    def git(self, root: Path, *args: str) -> subprocess.CompletedProcess[str]:
        return subprocess.run(
            ["git", *args], cwd=root, capture_output=True, text=True, check=False
        )

    def make_autocrlf_package(self, root: Path) -> tuple[Path, Path, str]:
        self.assertEqual(0, self.git(root, "init").returncode)
        self.assertEqual(0, self.git(root, "config", "user.email", "test@example.com").returncode)
        self.assertEqual(0, self.git(root, "config", "user.name", "Test User").returncode)
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
            package, proposal, expected = self.make_autocrlf_package(root)

            hashes = git_blob_sha256([proposal], cwd=package)

            self.assertIsNotNone(hashes)
            self.assertEqual(expected, hashes[proposal.resolve()])
            self.assertNotEqual(expected, hashlib.sha256(proposal.read_bytes()).hexdigest())
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

            self.assertFalse(any("sha256 mismatch for `proposal.md`" in item for item in report.errors))

    def test_finalizer_hashes_the_pending_git_blob(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            package, _proposal, expected = self.make_autocrlf_package(root)

            hashes = manifest_digests(package, ["proposal.md"])

            self.assertEqual(expected, hashes["proposal.md"])


if __name__ == "__main__":
    unittest.main()
