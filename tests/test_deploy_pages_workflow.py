from pathlib import Path
import unittest


REPO_ROOT = Path(__file__).resolve().parents[1]


class DeployPagesWorkflowTests(unittest.TestCase):
    def test_pages_deploys_on_main_push_and_supports_manual_dispatch(self) -> None:
        workflow = (REPO_ROOT / ".github" / "workflows" / "deploy-pages.yml").read_text(encoding="utf-8")
        self.assertIn("  push:\n    branches:\n      - main", workflow)
        self.assertIn("  workflow_dispatch:", workflow)
        self.assertIn("python3 scripts/generate_submissions_data.py\n", workflow)
        self.assertIn("python3 scripts/generate_source_registry_data.py\n", workflow)
        self.assertIn("python3 scripts/generate_submissions_data.py --check", workflow)
        self.assertIn("python3 scripts/generate_source_registry_data.py --check", workflow)
        self.assertIn("- name: Check GitHub Pages configuration", workflow)
        self.assertIn("id: pages", workflow)
        self.assertIn('echo "configured=false" >> "$GITHUB_OUTPUT"', workflow)
        self.assertIn("GitHub Pages is not configured; skipping GitHub Pages deployment", workflow)
        self.assertEqual(3, workflow.count("if: steps.pages.outputs.configured == 'true'"))
        self.assertLess(
            workflow.index("python3 scripts/generate_submissions_data.py\n"),
            workflow.index("python3 scripts/generate_submissions_data.py --check"),
        )
        self.assertLess(
            workflow.index("python3 scripts/validate_data_registry.py --json"),
            workflow.index("- name: Check GitHub Pages configuration"),
        )
        self.assertLess(
            workflow.index("- name: Check GitHub Pages configuration"),
            workflow.index("- name: Configure Pages"),
        )


if __name__ == "__main__":
    unittest.main()
