import re
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
WORKFLOW = ROOT / ".github" / "workflows" / "gallery-snapshot-maintenance.yml"


class GallerySnapshotMaintenanceWorkflowTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        cls.workflow = WORKFLOW.read_text(encoding="utf-8")

    def test_only_trusted_main_pushes_and_manual_dispatch_trigger_it(self) -> None:
        self.assertIn("  push:\n    branches:\n      - main", self.workflow)
        self.assertIn("  workflow_dispatch:\n", self.workflow)
        self.assertNotRegex(self.workflow, r"(?m)^\s+pull_request(?:_target)?:")
        self.assertIn("if: github.repository == 'open-city-ai/haidian'", self.workflow)

    def test_permissions_are_limited_to_maintenance_outputs(self) -> None:
        self.assertIn("  contents: write\n  pull-requests: write", self.workflow)
        self.assertNotIn("issues: write", self.workflow)
        self.assertNotIn("actions: write", self.workflow)

    def test_checks_out_event_sha_and_never_contributor_pr_code(self) -> None:
        self.assertIn("ref: ${{ github.sha }}", self.workflow)
        self.assertNotIn("github.event.pull_request", self.workflow)
        self.assertNotIn("pull_request_target", self.workflow)
        self.assertIn("python3 scripts/generate_submissions_data.py", self.workflow)
        self.assertIn("python3 scripts/generate_submissions_data.py --check", self.workflow)
        self.assertIn("node --check submissions-data.js", self.workflow)
        self.assertIn("tests.test_submissions_gallery", self.workflow)
        self.assertIn("tests.test_prelaunch_check", self.workflow)

    def test_uses_stable_branch_and_safe_force_lease(self) -> None:
        self.assertIn("MAINTENANCE_BRANCH: automation/gallery-snapshot", self.workflow)
        self.assertIn('git ls-remote --exit-code origin "refs/heads/${branch}"', self.workflow)
        self.assertIn("git push --force-with-lease=", self.workflow)
        self.assertNotIn("0000000000000000000000000000000000000000", self.workflow)
        self.assertNotIn("HEAD:refs/heads/main", self.workflow)

    def test_missing_maintenance_branch_fails_with_bootstrap_instructions(self) -> None:
        self.assertIn("bootstrap-required=true", self.workflow)
        self.assertIn("GITHUB_STEP_SUMMARY", self.workflow)
        self.assertIn("One-time bootstrap", self.workflow)
        self.assertIn("administrator must create it", self.workflow)
        self.assertIn("git push origin origin/main:refs/heads/${branch}", self.workflow)

    def test_only_opens_draft_pr_when_snapshot_changed(self) -> None:
        self.assertIn('echo "changed=false"', self.workflow)
        self.assertIn('echo "changed=true"', self.workflow)
        self.assertIn("if: steps.snapshot.outputs.changed == 'true'", self.workflow)
        self.assertIn("gh pr create", self.workflow)
        self.assertIn("--draft", self.workflow)


if __name__ == "__main__":
    unittest.main()
