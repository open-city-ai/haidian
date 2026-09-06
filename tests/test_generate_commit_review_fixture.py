from __future__ import annotations

import os
import subprocess
import tempfile
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
SCRIPT = ROOT / "tools" / "generate_commit_review_fixture.sh"


def run(command: list[str], *, env: dict[str, str] | None = None) -> subprocess.CompletedProcess[str]:
    return subprocess.run(command, text=True, capture_output=True, check=False, env=env)


def git(repo: Path, *args: str, env: dict[str, str] | None = None) -> subprocess.CompletedProcess[str]:
    return run(["git", "-C", str(repo), *args], env=env)


def controlled_git_env(root: Path) -> dict[str, str]:
    global_config = root / "global.gitconfig"
    global_config.write_text("", encoding="utf-8")
    return {**os.environ, "GIT_CONFIG_GLOBAL": str(global_config), "GIT_CONFIG_NOSYSTEM": "1"}


def install_failing_hook(root: Path, env: dict[str, str]) -> None:
    hooks = root / "hooks"
    hooks.mkdir()
    pre_commit = hooks / "pre-commit"
    pre_commit.write_text("#!/bin/sh\nexit 1\n", encoding="utf-8")
    pre_commit.chmod(0o755)
    subprocess.run(
        ["git", "config", "--file", env["GIT_CONFIG_GLOBAL"], "core.hooksPath", str(hooks)],
        check=True,
    )


def init_repo(path: Path, *, env: dict[str, str]) -> None:
    path.mkdir()
    subprocess.run(["git", "-C", str(path), "init", "--quiet", "--initial-branch=main"], check=True, env=env)
    subprocess.run(["git", "-C", str(path), "config", "user.name", "Fixture Base"], check=True, env=env)
    subprocess.run(["git", "-C", str(path), "config", "user.email", "base@example.invalid"], check=True, env=env)


def read_summary(path: Path) -> dict[str, str]:
    return dict(line.split("=", 1) for line in path.read_text(encoding="utf-8").splitlines())


class CommitReviewFixtureTests(unittest.TestCase):
    def test_standalone_history_and_bundle_are_self_contained(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            env = controlled_git_env(root)
            install_failing_hook(root, env)
            output = root / "fixture"
            completed = run([str(SCRIPT), "3", str(output), "review/test"], env=env)
            self.assertEqual(completed.returncode, 0, completed.stdout + completed.stderr)
            summary = read_summary(output / "summary.txt")
            self.assertEqual(summary["base"], "standalone")
            self.assertEqual(summary["commits"], "3")
            self.assertEqual(summary["merges"], "0")
            self.assertTrue(summary["clone_command"].endswith(" review-fixture-clone"))
            self.assertEqual(len((output / "commits.tsv").read_text().splitlines()), 3)

            clone = Path(tmp) / "clone"
            cloned = run(["git", "clone", "--quiet", "-b", "review/test", str(output / "review-fixture.bundle"), str(clone)])
            self.assertEqual(cloned.returncode, 0, cloned.stdout + cloned.stderr)
            self.assertEqual(git(clone, "rev-list", "--count", "HEAD").stdout.strip(), "3")

    def test_base_snapshot_uses_head_tree_with_sparse_and_ignored_files(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            env = controlled_git_env(root)
            base = root / "base"
            init_repo(base, env=env)
            (base / "keep").mkdir()
            (base / "drop").mkdir()
            (base / "keep" / "k.txt").write_text("keep\n", encoding="utf-8")
            (base / "drop" / "d.txt").write_text("drop\n", encoding="utf-8")
            (base / "tracked.log").write_text("tracked\n", encoding="utf-8")
            (base / ".gitignore").write_text("*.log\n*.jsonl\n", encoding="utf-8")
            subprocess.run(["git", "-C", str(base), "add", "--all", "--force"], check=True, env=env)
            subprocess.run(["git", "-C", str(base), "commit", "--quiet", "-m", "base"], check=True, env=env)
            subprocess.run(["git", "-C", str(base), "sparse-checkout", "set", "keep"], check=True, env=env)

            global_config = Path(env["GIT_CONFIG_GLOBAL"])
            global_config.write_text("[commit]\n\tgpgSign = true\n[gpg]\n\tprogram = false\n", encoding="utf-8")
            install_failing_hook(root, env)
            output = root / "fixture"
            completed = run([str(SCRIPT), "3", str(output), "review/test", str(base)], env=env)
            self.assertEqual(completed.returncode, 0, completed.stdout + completed.stderr)

            summary = read_summary(output / "summary.txt")
            expected = git(base, "ls-tree", "-r", "--name-only", "HEAD").stdout.splitlines()
            actual = git(output / "repo", "ls-tree", "-r", "--name-only", summary["base"]).stdout.splitlines()
            self.assertEqual(actual, expected)
            self.assertIn("drop/d.txt", actual)
            self.assertIn("tracked.log", actual)
            self.assertEqual(git(output / "repo", "rev-list", "--count", f'{summary["base"]}..HEAD').stdout.strip(), "3")
            self.assertEqual((output / "repo" / ".review-load-fixture" / "audit-events.jsonl").read_text().count("\n"), 3)

    def test_empty_count_is_rejected_without_creating_output(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            env = controlled_git_env(root)
            output = root / "fixture"
            completed = run([str(SCRIPT), "", str(output)], env=env)
            self.assertEqual(completed.returncode, 2)
            self.assertIn("COUNT must be a positive integer", completed.stderr)
            self.assertFalse(output.exists())

    def test_copy_failure_removes_partial_output(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            env = controlled_git_env(root)
            base = root / "base"
            init_repo(base, env=env)
            (base / "tracked.txt").write_text("tracked\n", encoding="utf-8")
            subprocess.run(["git", "-C", str(base), "add", "tracked.txt"], check=True, env=env)
            subprocess.run(["git", "-C", str(base), "commit", "--quiet", "-m", "base"], check=True, env=env)

            fake_bin = root / "bin"
            fake_bin.mkdir()
            fake_tar = fake_bin / "tar"
            fake_tar.write_text("#!/bin/sh\nexit 44\n", encoding="utf-8")
            fake_tar.chmod(0o755)
            env = {**env, "PATH": f"{fake_bin}:{os.environ['PATH']}"}
            output = root / "fixture"
            completed = run([str(SCRIPT), "3", str(output), "review/test", str(base)], env=env)
            self.assertNotEqual(completed.returncode, 0)
            self.assertFalse(output.exists())


if __name__ == "__main__":
    unittest.main()
