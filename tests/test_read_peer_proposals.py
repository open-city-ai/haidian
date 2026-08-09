import json
import os
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[1]


class ReadPeerProposalsEncodingTests(unittest.TestCase):
    def test_human_output_survives_gbk_console_with_superscript_two(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            item = {
                "id": "octocat/agent-city",
                "title": "Transit ²",
                "titleEn": "Transit ²",
                "summary": "A resident and vehicle test with ².",
                "summaryEn": "A resident and vehicle test with ².",
                "author": "octocat",
                "authorName": "Octo Cat",
                "date": "2026-08-09",
                "status": "正式评分就绪",
                "statusEn": "Formal review ready",
                "statusKey": "formal_review_ready",
                "sourceUrl": "submissions/octocat/agent-city/proposal.md",
                "proposalUrl": "submissions/octocat/agent-city/proposal.md",
                "visualUrl": "submissions/octocat/agent-city/visual/index.html",
            }
            (root / "submissions-data.js").write_text(
                "window.HAIDIAN_SUBMISSIONS = "
                + json.dumps([item], ensure_ascii=False)
                + ";\n",
                encoding="utf-8",
            )

            env = os.environ.copy()
            env["PYTHONIOENCODING"] = "gbk"
            completed = subprocess.run(
                [
                    sys.executable,
                    str(REPO_ROOT / "scripts" / "read_peer_proposals.py"),
                    "--repo-root",
                    str(root),
                    "--latest",
                    "1",
                ],
                cwd=REPO_ROOT,
                env=env,
                capture_output=True,
                check=False,
            )

            self.assertEqual(completed.returncode, 0, completed.stderr.decode("utf-8", "replace"))
            self.assertIn("Transit ²", completed.stdout.decode("utf-8"))


if __name__ == "__main__":
    unittest.main()
