from __future__ import annotations

import tempfile
import unittest
from pathlib import Path

from tests.test_export_review_packet import make_submission

from scripts.export_review_packet import ReviewPacketError, export_review_packet


class ReviewPacketJsonIntegrityTests(unittest.TestCase):
    def test_existing_invalid_json_aborts_before_creating_output(self) -> None:
        invalid_files = {
            "sources.json": b'{"sources": [',
            "risk.json": b"\xff\xfe",
            "manifest.json": b"[]",
        }
        for filename, content in invalid_files.items():
            with self.subTest(filename=filename), tempfile.TemporaryDirectory() as tmp:
                repo_root = Path(tmp)
                submission_dir = make_submission(repo_root, "alice", "proposal-a", "AI network")
                (submission_dir / filename).write_bytes(content)
                out_dir = repo_root / "packet"

                with self.assertRaisesRegex(ReviewPacketError, filename):
                    export_review_packet(repo_root, [submission_dir], out_dir, "Review packet")

                self.assertFalse(out_dir.exists())

    def test_missing_optional_risk_json_still_exports(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            repo_root = Path(tmp)
            submission_dir = make_submission(repo_root, "alice", "proposal-a", "AI network")
            (submission_dir / "risk.json").unlink()
            out_dir = repo_root / "packet"

            files = export_review_packet(repo_root, [submission_dir], out_dir, "Review packet")

            self.assertTrue(Path(files["manifest"]).is_file())


if __name__ == "__main__":
    unittest.main()
