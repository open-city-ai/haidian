import sys
import tempfile
import unittest
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(REPO_ROOT / "scripts"))

import review_submission  # noqa: E402
import self_check_submission  # noqa: E402


class TrustedReviewScriptTests(unittest.TestCase):
    def test_review_never_executes_script_from_submission_checkout(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            untrusted = Path(tmp)
            candidate = untrusted / "scripts" / "self_check_submission.py"
            candidate.parent.mkdir()
            candidate.write_text("raise RuntimeError('untrusted')\n", encoding="utf-8")

            resolved = review_submission.script_path(untrusted, candidate.name)

            self.assertEqual(REPO_ROOT / "scripts" / candidate.name, resolved)

    def test_self_check_keeps_subprocesses_on_trusted_version(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            untrusted = Path(tmp)
            candidate = untrusted / "scripts" / "validate_local_submission.py"
            candidate.parent.mkdir()
            candidate.write_text("raise RuntimeError('untrusted')\n", encoding="utf-8")

            resolved = self_check_submission.script_path(untrusted, candidate.name)

            self.assertEqual(REPO_ROOT / "scripts" / candidate.name, resolved)


if __name__ == "__main__":
    unittest.main()
