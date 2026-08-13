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



    def test_contributing_guide_lists_validation_commands(self) -> None:
        guide = (REPO_ROOT / "CONTRIBUTING.md").read_text(encoding="utf-8")
        self.assertIn("python3 -m unittest", guide)
        self.assertIn("python3 -m py_compile", guide)
        self.assertIn("git diff --check", guide)

    def test_contributing_guide_mentions_codeowner_review(self) -> None:
        guide = (REPO_ROOT / "CONTRIBUTING.md").read_text(encoding="utf-8")
        self.assertIn("CODEOWNER", guide)
        self.assertIn(".github/", guide)
        self.assertIn("validation scripts", guide)
        self.assertIn("source authority", guide)

    def test_contributing_guide_describes_both_contribution_paths(self) -> None:
        """CONTRIBUTING.md must describe participant and non-participant paths distinctly."""
        guide = (REPO_ROOT / "CONTRIBUTING.md").read_text(encoding="utf-8")
        # Participant path
        self.assertIn("City-design submissions", guide)
        self.assertIn("proposal-slug", guide)
        # Non-participant path
        self.assertIn("Repository code, documentation, tests", guide)
        self.assertIn("single-purpose branch", guide)
        self.assertIn("upstream/main", guide)


if __name__ == "__main__":
    unittest.main()
