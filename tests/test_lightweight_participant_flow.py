from __future__ import annotations

import json
import importlib.util
import os
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path
from types import SimpleNamespace
from unittest import mock


REPO_ROOT = Path(__file__).resolve().parents[1]


def load_bootstrap_module():
    spec = importlib.util.spec_from_file_location(
        "bootstrap_participant_workspace", REPO_ROOT / "scripts" / "bootstrap_participant_workspace.py"
    )
    assert spec and spec.loader
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


class LightweightParticipantFlowTests(unittest.TestCase):
    def run_command(
        self,
        command: list[str],
        cwd: Path,
        *,
        env: dict[str, str] | None = None,
        encoding: str | None = None,
    ) -> subprocess.CompletedProcess[str]:
        return subprocess.run(
            command,
            cwd=cwd,
            capture_output=True,
            text=True,
            encoding=encoding,
            env=env,
            check=False,
        )

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
        self.assertIn("/scenarios", report["sparse_paths"])
        self.assertIn("/sources", report["sparse_paths"])
        self.assertIn("/tracks.json", report["sparse_paths"])
        flattened = [token for command in report["commands"] for token in command]
        self.assertIn("--filter=blob:none", flattened)
        self.assertIn("sparse-checkout", flattened)
        self.assertIn("/scenarios", flattened)
        self.assertIn("/sources", flattened)
        self.assertIn("submissions/octocat/agent-city", flattened)
        self.assertIn("submission/octocat/agent-city", flattened)
        self.assertIn("upstream", flattened)
        self.assertIn("--no-cone", flattened)
        self.assertIn("/requirements-review.txt", flattened)
        self.assertIn("/requirements-translation.txt", flattened)
        self.assertIn("/tracks.json", flattened)

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

    def test_bootstrap_report_requires_scenario_registry_directory(self) -> None:
        bootstrap = load_bootstrap_module()
        args = SimpleNamespace(
            dry_run=False,
            github_login=None,
            proposal_slug=None,
            fork_owner=None,
            repo_url=bootstrap.CANONICAL_REPO,
            upstream_url=bootstrap.CANONICAL_REPO,
            branch="main",
            depth=50,
        )
        with tempfile.TemporaryDirectory() as tmp:
            target = Path(tmp)
            for relative_path in bootstrap.REQUIRED_FILES:
                required_file = target / relative_path
                required_file.parent.mkdir(parents=True, exist_ok=True)
                required_file.touch()

            with mock.patch.object(bootstrap, "run", return_value="true"):
                missing_report = bootstrap.build_report(args, target, [])
            self.assertFalse(missing_report["ok"])
            self.assertEqual(missing_report["missing_required_directories"], ["scenarios"])

            (target / "scenarios").mkdir()
            with mock.patch.object(bootstrap, "run", return_value="true"):
                complete_report = bootstrap.build_report(args, target, [])
            self.assertTrue(complete_report["ok"])

    def test_bootstrap_cli_reports_structured_validation_failure(self) -> None:
        bootstrap = load_bootstrap_module()
        with tempfile.TemporaryDirectory() as tmp:
            with mock.patch.object(bootstrap, "command_plan", return_value=[]), \
                mock.patch.object(bootstrap, "execute_plan"), \
                mock.patch.object(
                    bootstrap,
                    "build_report",
                    return_value={
                        "ok": False,
                        "missing_required_files": ["requirements-review.txt"],
                        "missing_required_directories": ["scenarios"],
                    },
                ), \
                mock.patch("builtins.print") as print_mock:
                return_code = bootstrap.main(["--target", tmp])

            self.assertEqual(return_code, 1)
            rendered = print_mock.call_args.args[0]
            self.assertIn("requirements-review.txt", rendered)
            self.assertIn("scenarios", rendered)
            self.assertNotIn("KeyError", rendered)

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
            encoding="utf-8",
        )
        self.assertEqual(completed.returncode, 0, completed.stdout + completed.stderr)
        report = json.loads(completed.stdout)
        self.assertTrue(report["ok"])
        self.assertGreater(report["total_proposals"], 0)
        self.assertEqual(report["shown"], 1)
        self.assertTrue(report["proposals"][0]["source_url"].startswith("https://raw.githubusercontent.com/"))
        self.assertNotIn("downloaded", report["proposals"][0])

    def test_peer_catalog_reconfigures_gbk_output_to_utf8(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            item = {
                "id": "alice/encoding-check",
                "sourceUrl": "submissions/alice/encoding-check/proposal.md",
                "title": "编码检查²",
                "titleEn": "Encoding check",
                "summary": "含有 superscript ² 的摘要",
                "summaryEn": "A summary containing ²",
                "author": "alice",
                "authorName": "Alice",
                "date": "2026-08-09",
                "statusKey": "ready",
                "statusEn": "Ready",
                "proposalUrl": "proposal-view.html?id=alice%2Fencoding-check",
                "visualUrl": "submissions/alice/encoding-check/visual/index.html",
            }
            (root / "submissions-data.js").write_text(
                "window.HAIDIAN_SUBMISSIONS = "
                + json.dumps([item], ensure_ascii=False)
                + ";\n",
                encoding="utf-8",
            )
            env = os.environ.copy()
            env["PYTHONIOENCODING"] = "gbk"
            completed = self.run_command(
                [
                    sys.executable,
                    str(REPO_ROOT / "scripts" / "read_peer_proposals.py"),
                    "--repo-root",
                    str(root),
                    "--latest",
                    "1",
                ],
                REPO_ROOT,
                env=env,
                encoding="utf-8",
            )
            self.assertEqual(0, completed.returncode, completed.stdout + completed.stderr)
            self.assertIn("²", completed.stdout)
            self.assertNotIn("UnicodeEncodeError", completed.stderr)

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
