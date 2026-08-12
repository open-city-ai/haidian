from __future__ import annotations

import tempfile
import unittest
from pathlib import Path


import sys


ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "scripts"))

from export_review_packet import ReviewPacketError, validate_output_dir  # noqa: E402


class ReviewPacketOutputBoundaryTests(unittest.TestCase):
    def test_submission_output_is_rejected_before_writes(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            repo_root = Path(tmp)
            out_dir = repo_root / "submissions" / "alice" / "plan" / "review"

            with self.assertRaisesRegex(ReviewPacketError, "must not be inside submissions"):
                validate_output_dir(repo_root, out_dir)

        self.assertFalse(out_dir.exists())

    def test_local_maintainer_and_external_outputs_are_allowed(self) -> None:
        with tempfile.TemporaryDirectory() as tmp, tempfile.TemporaryDirectory() as external:
            repo_root = Path(tmp)

            validate_output_dir(repo_root, repo_root / ".maintainer-review" / "packet")
            validate_output_dir(repo_root, Path(external) / "packet")


if __name__ == "__main__":
    unittest.main()
