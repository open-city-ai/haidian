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
STANDARD_EXAMPLE_DIR = REPO_ROOT / "submissions" / "codex-final" / "jingzhang-ai-symbiotic-rail"
STANDARD_EXAMPLE_AUTHOR = "codex-final"

HAS_REVIEW_DEPS = all(
    importlib.util.find_spec(name) is not None for name in ["shapely", "pyproj", "jsonschema"]
)

if HAS_REVIEW_DEPS:
    from test_agent_scaffold_and_self_check import run_scaffold, write_official_site_package  # noqa: E402


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
    def test_provisional_package_blocks_formal_scorecard(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            out_dir = Path(tmp) / "scorecard"
            completed = run_scorecard(STANDARD_EXAMPLE_DIR, STANDARD_EXAMPLE_AUTHOR, out_dir=out_dir)
            self.assertNotEqual(completed.returncode, 0)
            scorecard = json.loads(completed.stdout)
            self.assertEqual(scorecard["scoring_status"], "blocked")
            self.assertFalse(scorecard["eligibility_gate"]["can_enter_formal_review"])
            self.assertTrue((out_dir / "formal-scorecard.json").exists())
            self.assertIn("Formal scoring is blocked", scorecard["pr_comment_markdown"])

    def test_official_ready_fixture_generates_draft_scorecard(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            write_official_site_package(root)
            submission_dir = root / "submissions" / "alice" / "topology-pass"
            scaffold = run_scaffold(submission_dir, cwd=root)
            self.assertEqual(scaffold.returncode, 0, scaffold.stdout + scaffold.stderr)
            out_dir = root / "scorecard"

            completed = run_scorecard(submission_dir, "alice", repo_root=root, out_dir=out_dir)
            self.assertEqual(completed.returncode, 0, completed.stdout + completed.stderr)
            scorecard = json.loads(completed.stdout)
            self.assertEqual(scorecard["scoring_status"], "draft")
            self.assertTrue(scorecard["eligibility_gate"]["can_enter_formal_review"])
            self.assertEqual(sum(item["weight_percent"] for item in scorecard["dimensions"]), 100)
            self.assertEqual(len(scorecard["dimensions"]), 7)
            self.assertTrue((out_dir / "formal-scorecard-comment.md").exists())


if __name__ == "__main__":
    unittest.main()
