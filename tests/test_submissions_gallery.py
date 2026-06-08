import re
import json
import subprocess
import sys
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
DATA_FILE = ROOT / "submissions-data.js"
INDEX_FILE = ROOT / "index.html"
SUBMISSIONS_FILE = ROOT / "submissions.html"


class TestSubmissionsGallery(unittest.TestCase):
    def load_gallery_items(self):
        data = DATA_FILE.read_text(encoding="utf-8")
        match = re.search(r"window\.HAIDIAN_SUBMISSIONS = (\[.*\]);\s*$", data, re.S)
        self.assertIsNotNone(match)
        return json.loads(match.group(1))

    def test_every_submission_proposal_is_listed(self):
        data = DATA_FILE.read_text(encoding="utf-8")
        proposal_paths = sorted(
            str(path.relative_to(ROOT))
            for path in (ROOT / "submissions").glob("*/*/proposal.md")
        )
        missing = [path for path in proposal_paths if path not in data]
        self.assertEqual([], missing)

    def test_gallery_paths_exist(self):
        data = DATA_FILE.read_text(encoding="utf-8")
        paths = re.findall(
            r'"(?:thumbnailUrl|visualUrl|proposalUrl|sourceUrl)"\s*:\s*"([^"]+)"',
            data,
        )
        missing = [path for path in paths if not (ROOT / path).exists()]
        self.assertEqual([], missing)

    def test_generated_gallery_data_is_current(self):
        completed = subprocess.run(
            [sys.executable, str(ROOT / "scripts" / "generate_submissions_data.py"), "--check"],
            cwd=ROOT,
            capture_output=True,
            text=True,
            check=False,
        )
        self.assertEqual(completed.returncode, 0, completed.stdout + completed.stderr)

    def test_standard_example_is_the_only_submission_and_not_formal_ready(self):
        proposal_paths = sorted((ROOT / "submissions").glob("*/*/proposal.md"))
        self.assertEqual(
            [ROOT / "submissions" / "codex-final" / "jingzhang-ai-symbiotic-rail" / "proposal.md"],
            proposal_paths,
        )
        by_id = {item["id"]: item for item in self.load_gallery_items()}
        self.assertEqual(["jingzhang-ai-symbiotic-rail"], sorted(by_id))
        self.assertEqual(
            "intake_provisional",
            by_id["jingzhang-ai-symbiotic-rail"]["statusKey"],
        )
        self.assertNotEqual(
            "formal_review_ready",
            by_id["jingzhang-ai-symbiotic-rail"]["statusKey"],
        )

    def test_gallery_pages_explain_review_statuses(self):
        index = INDEX_FILE.read_text(encoding="utf-8")
        submissions = SUBMISSIONS_FILE.read_text(encoding="utf-8")
        self.assertIn("View All Proposals", index)
        self.assertIn("STATUS_META", index)
        self.assertIn("data-filter=\"formal\"", submissions)
        self.assertIn("data-filter=\"intake\"", submissions)
        self.assertIn("data-filter=\"revision\"", submissions)
        self.assertIn("data-filter=\"fixture\"", submissions)
        self.assertIn("formal_review_ready", submissions)
        self.assertIn("intake_provisional", submissions)


if __name__ == "__main__":
    unittest.main()
