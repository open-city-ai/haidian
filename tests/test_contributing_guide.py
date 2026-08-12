import unittest
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[1]


class ContributingGuideTests(unittest.TestCase):
    def test_guide_separates_submission_and_repository_paths(self) -> None:
        guide = (REPO_ROOT / "CONTRIBUTING.md").read_text(encoding="utf-8")

        self.assertIn("## 1. City-design submissions", guide)
        self.assertIn("## 2. Repository code, documentation, tests, and website improvements", guide)
        self.assertIn("submissions/<your-github-login>/<proposal-slug>/", guide)
        self.assertIn("trusted non-submission validation route", guide)
        self.assertIn("do **not** run `participant_preflight.py`", guide)
        self.assertIn("submissions-data.js", guide)
        self.assertIn("gallery-publication.json", guide)
        self.assertIn(".maintainer-review/", guide)
        self.assertIn("docs/reviews/", guide)
        self.assertIn("data/source_registry.json", guide)
        self.assertIn("Do not bypass required reviews", guide)
        self.assertIn("Respect a thread owner's request", guide)


if __name__ == "__main__":
    unittest.main()
