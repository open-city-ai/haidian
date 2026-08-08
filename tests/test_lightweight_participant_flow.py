import json
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[1]


class LightweightParticipantFlowTests(unittest.TestCase):
    def run_command(self, command: list[str], cwd: Path) -> subprocess.CompletedProcess[str]:
        return subprocess.run(command, cwd=cwd, capture_output=True, text=True, check=False)

    def test_bootstrap_dry_run_uses_partial_sparse_fork_workflow(self) -> None:
        completed = self.run_command(
            [
                sys.executable,
                str(REPO_ROOT / "scripts" / "bootstrap_participant_workspace.py"),
                "--fork-owner",
                "octocat",
                "--github-login",
                "octocat",
                "--proposal-slug",
                "agent-city",
                "--target",
                "unused",
                "--dry-run",
                "--json",
            ],
            REPO_ROOT,
        )
        self.assertEqual(completed.returncode, 0, completed.stdout + completed.stderr)
        report = json.loads(completed.stdout)
        self.assertTrue(report["ok"])
        self.assertEqual(report["partial_clone_filter"], "blob:none")
        self.assertEqual(report["depth"], 50)
        self.assertIn("sources", report["sparse_paths"])
        flattened = [token for command in report["commands"] for token in command]
        self.assertIn("--filter=blob:none", flattened)
        self.assertIn("sparse-checkout", flattened)
        self.assertIn("sources", flattened)
        self.assertIn("submissions/octocat/agent-city", flattened)
        self.assertIn("submission/octocat/agent-city", flattened)
        self.assertIn("upstream", flattened)

    def test_bootstrap_defaults_fork_to_case_preserving_login(self) -> None:
        completed = self.run_command(
            [
                sys.executable,
                str(REPO_ROOT / "scripts" / "bootstrap_participant_workspace.py"),
                "--github-login",
                "OctoCat",
                "--proposal-slug",
                "agent-city",
                "--target",
                "unused",
                "--dry-run",
                "--json",
            ],
            REPO_ROOT,
        )
        self.assertEqual(completed.returncode, 0, completed.stdout + completed.stderr)
        report = json.loads(completed.stdout)
        self.assertEqual(report["origin_url"], "https://github.com/OctoCat/haidian.git")
        self.assertEqual(report["submission_path"], "submissions/OctoCat/agent-city")

    def test_peer_catalog_reads_local_index_without_materializing_media(self) -> None:
        completed = self.run_command(
            [
                sys.executable,
                str(REPO_ROOT / "scripts" / "read_peer_proposals.py"),
                "--repo-root",
                str(REPO_ROOT),
                "--latest",
                "1",
                "--json",
            ],
            REPO_ROOT,
        )
        self.assertEqual(completed.returncode, 0, completed.stdout + completed.stderr)
        report = json.loads(completed.stdout)
        self.assertTrue(report["ok"])
        self.assertGreater(report["total_proposals"], 0)
        self.assertEqual(report["shown"], 1)
        self.assertTrue(report["proposals"][0]["source_url"].startswith("https://raw.githubusercontent.com/"))
        self.assertNotIn("downloaded", report["proposals"][0])

    def test_preflight_accepts_own_scope_and_rejects_outside_changes(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            self.assertEqual(self.run_command(["git", "init", "-b", "main"], root).returncode, 0)
            self.run_command(["git", "config", "user.email", "test@example.com"], root)
            self.run_command(["git", "config", "user.name", "Test"], root)
            (root / ".gitignore").write_text(".peer-proposals/\n", encoding="utf-8")
            self.run_command(["git", "add", ".gitignore"], root)
            self.run_command(["git", "commit", "-m", "base"], root)
            self.run_command(["git", "switch", "-c", "submission/octocat/agent-city"], root)
            self.run_command(
                ["git", "remote", "add", "origin", "https://github.com/octocat/haidian.git"], root
            )
            self.run_command(["git", "update-ref", "refs/remotes/origin/main", "HEAD"], root)
            proposal = root / "submissions" / "octocat" / "agent-city"
            proposal.mkdir(parents=True)
            (proposal / "proposal.md").write_text("# Test\n", encoding="utf-8")

            command = [
                sys.executable,
                str(REPO_ROOT / "scripts" / "participant_preflight.py"),
                "submissions/octocat/agent-city",
                "--repo-root",
                str(root),
                "--pr-author",
                "octocat",
                "--skip-self-check",
                "--json",
            ]
            passed = self.run_command(command, root)
            self.assertEqual(passed.returncode, 0, passed.stdout + passed.stderr)
            passed_report = json.loads(passed.stdout)
            self.assertTrue(passed_report["ok"])
            self.assertEqual(passed_report["outside_scope_files"], [])

            oversized = proposal / "drawings" / "oversized.pdf"
            oversized.parent.mkdir()
            with oversized.open("wb") as handle:
                handle.seek(100 * 1024 * 1024)
                handle.write(b"x")
            size_failed = self.run_command(command, root)
            self.assertNotEqual(size_failed.returncode, 0)
            size_report = json.loads(size_failed.stdout)
            self.assertTrue(any("100 MiB" in item for item in size_report["blockers"]))
            oversized.unlink()

            (root / "README.md").write_text("outside scope\n", encoding="utf-8")
            failed = self.run_command(command, root)
            self.assertNotEqual(failed.returncode, 0)
            failed_report = json.loads(failed.stdout)
            self.assertIn("README.md", failed_report["outside_scope_files"])

    def test_peer_cache_is_ignored(self) -> None:
        ignore = (REPO_ROOT / ".gitignore").read_text(encoding="utf-8")
        self.assertIn(".peer-proposals/", ignore)


if __name__ == "__main__":
    unittest.main()
