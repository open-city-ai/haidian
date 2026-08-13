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


def run_scorecard(submission_dir: Path, pr_author: str, repo_root: Path = REPO_ROOT, out_dir: Path | None = None):
    command = [
        sys.executable,
        str(REPO_ROOT / "scripts" / "generate_formal_scorecard.py"),
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


class FormalScorecardSchemaTests(unittest.TestCase):
    def test_formal_scorecard_schema_defines_weighted_dimensions(self) -> None:
        schema = json.loads(
            (REPO_ROOT / "brief" / "site-package" / "schemas" / "formal_scorecard.schema.json").read_text(
                encoding="utf-8"
            )
        )
        self.assertIn("pr_comment_markdown", schema["required"])
        self.assertEqual(schema["properties"]["scoring_status"]["enum"], ["blocked", "draft", "final"])
        dimension_enum = schema["properties"]["dimensions"]["items"]["properties"]["dimension_id"]["enum"]
        self.assertEqual(len(dimension_enum), 7)
        self.assertIn("implementation_feasibility", dimension_enum)


@unittest.skipUnless(HAS_REVIEW_DEPS, "Install requirements-review.txt to run formal scorecard tests")
class FormalScorecardScriptTests(unittest.TestCase):
    def test_provisional_package_is_scoreable_despite_organizer_data_gap(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            write_provisional_site_package(root)
            submission_dir = root / "submissions" / "alice" / "provisional-pass"
            self.assertEqual(run_scaffold(submission_dir, cwd=root).returncode, 0)
            self.assertEqual(complete_scaffold(submission_dir).returncode, 0)
            self.assertEqual(mark_self_checked(submission_dir).returncode, 0)
            out_dir = root / "scorecard"
            completed = run_scorecard(submission_dir, "alice", repo_root=root, out_dir=out_dir)
            self.assertEqual(completed.returncode, 0, completed.stdout + completed.stderr)
            scorecard = json.loads(completed.stdout)
            self.assertEqual(scorecard["scoring_status"], "draft")
            self.assertTrue(scorecard["eligibility_gate"]["can_enter_formal_review"])
            self.assertTrue((out_dir / "formal-scorecard.json").exists())
            self.assertIn("eligible for formal professional scoring", scorecard["pr_comment_markdown"])

    def test_official_ready_fixture_generates_draft_scorecard(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            write_official_site_package(root)
            submission_dir = root / "submissions" / "alice" / "topology-pass"
            scaffold = run_scaffold(submission_dir, cwd=root)
            self.assertEqual(scaffold.returncode, 0, scaffold.stdout + scaffold.stderr)
            self.assertEqual(complete_scaffold(submission_dir).returncode, 0)
            self.assertEqual(mark_self_checked(submission_dir).returncode, 0)
            out_dir = root / "scorecard"

            completed = run_scorecard(submission_dir, "alice", repo_root=root, out_dir=out_dir)
            self.assertEqual(completed.returncode, 0, completed.stdout + completed.stderr)
            scorecard = json.loads(completed.stdout)
            self.assertEqual(scorecard["scoring_status"], "draft")
            self.assertTrue(scorecard["eligibility_gate"]["can_enter_formal_review"])
            self.assertEqual(sum(item["weight_percent"] for item in scorecard["dimensions"]), 100)
            self.assertEqual(len(scorecard["dimensions"]), 7)
            self.assertTrue((out_dir / "formal-scorecard-comment.md").exists())

    def test_dimension_weights_sum_to_100(self) -> None:
        """The seven dimension weights must sum to exactly 100."""
        from generate_formal_scorecard import DIMENSION_WEIGHTS
        total = sum(DIMENSION_WEIGHTS.values())
        self.assertEqual(total, 100, f"Dimension weights sum to {total}, expected 100")

    def test_scorecard_has_four_reviewer_panel_roles(self) -> None:
        """The scorecard template must include four expert panel roles."""
        from generate_formal_scorecard import build_scorecard
        summary = {
            "submission_dir": "submissions/alice/test",
            "can_enter_formal_review": True,
            "recommendation": "formal-review-ready",
            "ok": True,
        }
        scorecard = build_scorecard(summary)
        self.assertEqual(len(scorecard["reviewer_panel"]), 4)
        roles = [r["role_zh"] for r in scorecard["reviewer_panel"]]
        self.assertIn("城市规划/城市设计专家", roles)
        self.assertIn("AI 产业与运营专家", roles)

    def test_blocked_scorecard_does_not_accept_scores(self) -> None:
        """A blocked scorecard must set scoring_status to 'blocked'."""
        from generate_formal_scorecard import build_scorecard
        summary = {
            "submission_dir": "submissions/alice/test",
            "can_enter_formal_review": False,
            "recommendation": "request-changes",
            "ok": False,
        }
        scorecard = build_scorecard(summary)
        self.assertEqual(scorecard["scoring_status"], "blocked")
        for row in scorecard["dimensions"]:
            self.assertIsNone(row["score_0_to_5"])
            self.assertIsNone(row["weighted_score_100"])



if __name__ == "__main__":
    unittest.main()
