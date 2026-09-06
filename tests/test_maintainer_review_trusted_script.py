from __future__ import annotations

import tempfile
import unittest
from pathlib import Path
from unittest import mock
import sys


REPO_ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(REPO_ROOT / "scripts"))

import maintainer_review  # noqa: E402


class MaintainerReviewTrustedScriptTests(unittest.TestCase):
    def test_script_path_ignores_participant_checkout_script(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            checkout = Path(tmp)
            untrusted = checkout / "scripts" / "self_check_submission.py"
            untrusted.parent.mkdir()
            untrusted.write_text("raise RuntimeError('participant code ran')\n", encoding="utf-8")

            resolved = maintainer_review.script_path(checkout, untrusted.name)

            self.assertEqual(REPO_ROOT / "scripts" / untrusted.name, resolved)

    def test_review_command_uses_trusted_self_check_script(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            checkout = Path(tmp)
            submission = checkout / "submissions" / "alice" / "proposal"
            submission.mkdir(parents=True)
            untrusted = checkout / "scripts" / "self_check_submission.py"
            untrusted.parent.mkdir()
            untrusted.write_text("raise RuntimeError('participant code ran')\n", encoding="utf-8")
            output = checkout / "review-output"
            self_check = {
                "returncode": 1,
                "ok": False,
                "stdout": {},
                "stderr": "fixture failure",
            }
            with mock.patch.object(
                maintainer_review, "run_json_command", return_value=self_check
            ) as run_command, mock.patch.object(
                maintainer_review,
                "build_review_input",
                return_value={
                    "submission_dir": "submissions/alice/proposal",
                    "rubric_dimensions": [],
                },
            ):
                maintainer_review.run_maintainer_review(
                    checkout, submission, "alice", output
                )

            command = run_command.call_args.args[0]
            self.assertEqual(
                REPO_ROOT / "scripts" / "self_check_submission.py", Path(command[1])
            )
            self.assertNotEqual(untrusted, Path(command[1]))


if __name__ == "__main__":
    unittest.main()
