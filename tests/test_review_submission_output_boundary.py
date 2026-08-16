import os
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[1]


class ReviewSubmissionOutputBoundaryTests(unittest.TestCase):
    def run_review(
        self, root: Path, submission: Path, out_dir: Path
    ) -> subprocess.CompletedProcess:
        return subprocess.run(
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

    def test_nested_repo_root_cannot_hide_submission_output(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            owner_root = Path(tmp) / "submissions" / "alice"
            submission = owner_root / "demo"
            submission.mkdir(parents=True)
            (submission / "proposal.md").write_text("original proposal\n", encoding="utf-8")
            out_dir = submission / "review-inputs"

            completed = self.run_review(owner_root, submission, out_dir)

            self.assertNotEqual(completed.returncode, 0)
            self.assertIn("must not be written inside `submissions/`", completed.stderr)
            self.assertFalse(out_dir.exists())

    def test_dangling_submission_output_symlink_is_rejected_lexically(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp) / "repo"
            submission = root / "submissions" / "alice" / "demo"
            submission.mkdir(parents=True)
            (submission / "proposal.md").write_text("original proposal\n", encoding="utf-8")
            outside = Path(tmp) / "outside-review"
            out_dir = submission / "review-link"
            try:
                out_dir.symlink_to(outside, target_is_directory=True)
            except OSError as exc:
                self.skipTest(f"symlinks unavailable: {exc}")

            completed = self.run_review(root, submission, out_dir)

            self.assertNotEqual(completed.returncode, 0)
            self.assertFalse(outside.exists())

    def test_external_output_file_aliases_do_not_overwrite_submission(self) -> None:
        for link_kind in ("symlink", "hardlink"):
            for output_name in (
                "review-input.json",
                "review-prompt.md",
                "advisory-review.md",
            ):
                with self.subTest(link_kind=link_kind, output_name=output_name):
                    with tempfile.TemporaryDirectory() as tmp:
                        root = Path(tmp) / "repo"
                        submission = root / "submissions" / "alice" / "demo"
                        submission.mkdir(parents=True)
                        proposal = submission / "proposal.md"
                        original = b"original proposal\n"
                        proposal.write_bytes(original)
                        out_dir = Path(tmp) / "external-review"
                        out_dir.mkdir()
                        output = out_dir / output_name
                        try:
                            if link_kind == "symlink":
                                output.symlink_to(proposal)
                            else:
                                os.link(proposal, output)
                        except OSError as exc:
                            self.skipTest(f"{link_kind} unavailable: {exc}")

                        completed = self.run_review(root, submission, out_dir)

                        self.assertEqual(
                            completed.returncode,
                            0,
                            completed.stdout + completed.stderr,
                        )
                        self.assertEqual(original, proposal.read_bytes())
                        self.assertFalse(output.is_symlink())
                        self.assertFalse(output.samefile(proposal))
                        self.assertEqual([], list(out_dir.glob(f".{output_name}.*.tmp")))

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
