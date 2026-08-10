from __future__ import annotations

import importlib.util
import json
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(Path(__file__).resolve().parent))
HAS_REVIEW_DEPS = all(
    importlib.util.find_spec(name) is not None for name in ["shapely", "pyproj", "jsonschema"]
)

if HAS_REVIEW_DEPS:
    from test_agent_scaffold_and_self_check import (  # noqa: E402
        complete_scaffold,
        mark_self_checked,
        run_scaffold,
        write_official_site_package,
        write_provisional_site_package,
    )


def make_provisional_fixture(root: Path) -> Path:
    write_provisional_site_package(root)
    submission_dir = root / "submissions" / "alice" / "provisional-pass"
    scaffold = run_scaffold(submission_dir, cwd=root)
    if scaffold.returncode != 0:
        raise AssertionError(scaffold.stdout + scaffold.stderr)
    finalized = complete_scaffold(submission_dir)
    if finalized.returncode != 0:
        raise AssertionError(finalized.stdout + finalized.stderr)
    marked = mark_self_checked(submission_dir)
    if marked.returncode != 0:
        raise AssertionError(marked.stdout + marked.stderr)
    return submission_dir


def run_maintainer_review(submission_dir: Path, pr_author: str, repo_root: Path = REPO_ROOT, out_dir: Path | None = None):
    command = [
        sys.executable,
        str(REPO_ROOT / "scripts" / "maintainer_review.py"),
        str(submission_dir),
        "--repo-root",
        str(repo_root),
        "--pr-author",
        pr_author,
        "--json",
    ]
    if out_dir is not None:
        command.extend(["--out", str(out_dir)])
    return subprocess.run(command, capture_output=True, text=True, check=False)


def run_maintainer_comment(submission_dir: Path, pr_author: str, repo_root: Path = REPO_ROOT, out_dir: Path | None = None):
    command = [
        sys.executable,
        str(REPO_ROOT / "scripts" / "maintainer_review.py"),
        str(submission_dir),
        "--repo-root",
        str(repo_root),
        "--pr-author",
        pr_author,
        "--comment",
    ]
    if out_dir is not None:
        command.extend(["--out", str(out_dir)])
    return subprocess.run(command, capture_output=True, text=True, check=False)


@unittest.skipUnless(HAS_REVIEW_DEPS, "Install requirements-review.txt to run maintainer review tests")
class MaintainerReviewTests(unittest.TestCase):
    def test_provisional_package_is_not_blocked_by_organizer_data_gap(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            submission_dir = make_provisional_fixture(root)
            out_dir = root / "review"
            completed = run_maintainer_review(submission_dir, "alice", repo_root=root, out_dir=out_dir)
            self.assertEqual(completed.returncode, 0, completed.stdout + completed.stderr)
            summary = json.loads(completed.stdout)
            self.assertEqual("formal-review-ready", summary["recommendation"])
            self.assertTrue(summary["can_enter_formal_review"])
            self.assertTrue((out_dir / "review-summary.json").exists())
            self.assertTrue((out_dir / "maintainer-comment.md").exists())
            advisory = (out_dir / "advisory-review.md").read_text(encoding="utf-8")
            self.assertNotIn("TODO", advisory)

    def test_default_output_is_local_ignored_directory(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            write_official_site_package(root)
            submission_dir = root / "submissions" / "alice" / "topology-pass"
            scaffold = run_scaffold(submission_dir, cwd=root)
            self.assertEqual(scaffold.returncode, 0, scaffold.stdout + scaffold.stderr)
            self.assertEqual(complete_scaffold(submission_dir).returncode, 0)
            self.assertEqual(mark_self_checked(submission_dir).returncode, 0)

            completed = run_maintainer_review(submission_dir, "alice", repo_root=root)
            self.assertEqual(completed.returncode, 0, completed.stdout + completed.stderr)
            self.assertTrue((root / ".maintainer-review" / "topology-pass" / "maintainer-comment.md").exists())
            self.assertFalse((root / "docs" / "reviews" / "topology-pass").exists())

    def test_comment_mode_prints_pr_comment_only(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            submission_dir = make_provisional_fixture(root)
            out_dir = root / "review"
            completed = run_maintainer_comment(submission_dir, "alice", repo_root=root, out_dir=out_dir)
            self.assertEqual(completed.returncode, 0, completed.stdout + completed.stderr)
            self.assertIn("# Maintainer Review Summary", completed.stdout)
            self.assertIn("Recommendation: **formal-review-ready**", completed.stdout)
            self.assertNotIn(str(out_dir), completed.stdout)

    def test_failed_package_outputs_request_changes(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            submission_dir = make_provisional_fixture(root)
            out_dir = root / "review"
            completed = run_maintainer_review(submission_dir, "wrong-author", repo_root=root, out_dir=out_dir)
            self.assertNotEqual(completed.returncode, 0)
            summary = json.loads(completed.stdout)
            self.assertEqual("request-changes", summary["recommendation"])
            self.assertFalse(summary["ok"])
            self.assertIn("deterministic_validation", summary["checks"])

    def test_official_fixture_outputs_formal_review_ready(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            write_official_site_package(root)
            submission_dir = root / "submissions" / "alice" / "topology-pass"
            scaffold = run_scaffold(submission_dir, cwd=root)
            self.assertEqual(scaffold.returncode, 0, scaffold.stdout + scaffold.stderr)
            self.assertEqual(complete_scaffold(submission_dir).returncode, 0)
            self.assertEqual(mark_self_checked(submission_dir).returncode, 0)
            out_dir = root / "review"

            completed = run_maintainer_review(submission_dir, "alice", repo_root=root, out_dir=out_dir)
            self.assertEqual(completed.returncode, 0, completed.stdout + completed.stderr)
            summary = json.loads(completed.stdout)
            self.assertEqual("formal-review-ready", summary["recommendation"])
            self.assertTrue(summary["can_enter_formal_review"])
            self.assertEqual("PASS", summary["checks"]["spatial_review"])


if __name__ == "__main__":
    unittest.main()
