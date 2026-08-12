import subprocess
import sys
import tempfile
import unittest
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[1]


class ReviewSubmissionOutputBoundaryTests(unittest.TestCase):
    def test_repository_output_must_stay_under_maintainer_review(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            submission = root / "submissions" / "alice" / "demo"
            submission.mkdir(parents=True)
            proposal = submission / "proposal.md"
            proposal.write_text("original proposal\n", encoding="utf-8")
            out_dir = submission / "review-inputs"

            completed = subprocess.run(
                [
                    sys.executable,
                    str(REPO_ROOT / "scripts" / "review_submission.py"),
                    str(submission),
                    "--repo-root",
                    str(root),
                    "--out",
                    str(out_dir),
                ],
                capture_output=True,
                text=True,
                check=False,
            )

            self.assertNotEqual(completed.returncode, 0)
            self.assertIn("must not be written inside `submissions/`", completed.stderr)
            self.assertFalse(out_dir.exists())
            self.assertEqual("original proposal\n", proposal.read_text(encoding="utf-8"))

    def test_repository_maintainer_review_output_remains_allowed(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            submission = root / "submissions" / "alice" / "demo"
            submission.mkdir(parents=True)
            (submission / "proposal.md").write_text("# Demo\n", encoding="utf-8")
            out_dir = root / ".maintainer-review" / "demo" / "review-packet"

            completed = subprocess.run(
                [
                    sys.executable,
                    str(REPO_ROOT / "scripts" / "review_submission.py"),
                    str(submission),
                    "--repo-root",
                    str(root),
                    "--out",
                    str(out_dir),
                ],
                capture_output=True,
                text=True,
                check=False,
            )

            self.assertEqual(completed.returncode, 0, completed.stdout + completed.stderr)
            self.assertTrue((out_dir / "review-input.json").is_file())


if __name__ == "__main__":
    unittest.main()
