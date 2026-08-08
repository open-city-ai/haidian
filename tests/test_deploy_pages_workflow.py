from pathlib import Path
import unittest


REPO_ROOT = Path(__file__).resolve().parents[1]


class DeployPagesWorkflowTests(unittest.TestCase):
    def test_pages_deploys_on_main_push_and_supports_manual_dispatch(self) -> None:
        workflow = (REPO_ROOT / ".github" / "workflows" / "deploy-pages.yml").read_text(encoding="utf-8")
        self.assertIn("  push:\n    branches:\n      - main", workflow)
        self.assertIn("  workflow_dispatch:", workflow)
        self.assertIn("python3 scripts/generate_submissions_data.py --check", workflow)


if __name__ == "__main__":
    unittest.main()
