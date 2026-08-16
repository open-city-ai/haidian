from __future__ import annotations

import subprocess
import sys
import tempfile
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
SCRIPT = ROOT / "scripts" / "audit_bilingual_backfill.py"


class BilingualAuditCliTests(unittest.TestCase):
    def run_audit(self, repo_root: Path) -> subprocess.CompletedProcess[str]:
        return subprocess.run(
            [sys.executable, str(SCRIPT), "--repo-root", str(repo_root)],
            capture_output=True,
            text=True,
            check=False,
        )

    def test_empty_submission_corpus_fails(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            completed = self.run_audit(Path(tmp))

        self.assertEqual(2, completed.returncode)
        self.assertIn("no bilingual submissions found", completed.stdout)
        self.assertNotIn("Audit passed for 0", completed.stdout)

    def test_valid_bilingual_pair_is_audited(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            repo_root = Path(tmp)
            submission = repo_root / "submissions" / "alice" / "example"
            submission.mkdir(parents=True)
            (submission / "proposal.md").write_text(
                """---
title: Example
language: zh
translation_file: proposal.en.md
---
# Example

[data:metrics.json#site_area]
""",
                encoding="utf-8",
            )
            (submission / "proposal.en.md").write_text(
                """---
title: Example
language: en
translation_of: proposal.md
---
# Example

[data:metrics.json#site_area]
""",
                encoding="utf-8",
            )

            completed = self.run_audit(repo_root)

        self.assertEqual(0, completed.returncode, completed.stdout + completed.stderr)
        self.assertIn("Audit passed for 1 bilingual submissions", completed.stdout)


if __name__ == "__main__":
    unittest.main()
