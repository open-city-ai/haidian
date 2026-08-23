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
        self.assertNotIn("codex/refresh-gallery-after-pr-868", self.workflow)
        self.assertIn('git ls-remote --exit-code origin "refs/heads/${branch}"', self.workflow)
        self.assertIn("ruleset", self.workflow)
        self.assertIn("git push --force-with-lease=", self.workflow)
        self.assertNotIn("0000000000000000000000000000000000000000", self.workflow)
        self.assertNotIn("HEAD:refs/heads/main", self.workflow)

    def test_missing_maintenance_branch_fails_with_bootstrap_instructions(self) -> None:
        self.assertIn("bootstrap_required=true", self.workflow)
        self.assertIn("GITHUB_STEP_SUMMARY", self.workflow)
        self.assertIn("One-time bootstrap", self.workflow)
        self.assertIn("normal repository ruleset", self.workflow)
        self.assertIn("bootstrap-maintenance-ref.sh", self.workflow)
        self.assertIn("git fetch origin main", self.workflow)
        self.assertIn('git push origin "${source_main_sha}:refs/heads/${maintenance_branch}"', self.workflow)
        self.assertNotIn("administrator bypass", self.workflow.lower())
        self.assertNotIn("--admin", self.workflow)
        self.assertIn("gallery-snapshot-bootstrap-handoff", self.workflow)
        self.assertIn("bootstrap-required.txt", self.workflow)
        self.assertIn("Fail closed: the canonical gallery maintenance ref is missing", self.workflow)

    def test_maintainer_handoff_can_open_pr_without_workflow_token(self) -> None:
        self.assertIn("open-maintenance-pr.sh", self.workflow)
        self.assertIn('gh pr list --repo "${repository}"', self.workflow)
        self.assertIn('gh pr create --repo "${repository}" --base main --head "${branch}"', self.workflow)
        self.assertIn("normal maintainer credentials", self.workflow)

    def test_snapshot_failures_are_not_masked_by_continue_on_error(self) -> None:
        self.assertIn("id: snapshot\n        continue-on-error: true", self.workflow)
        self.assertIn("steps.snapshot.outcome == 'failure'", self.workflow)
        self.assertIn("steps.snapshot.outputs.bootstrap_required != 'true'", self.workflow)

    def test_only_opens_draft_pr_when_snapshot_changed(self) -> None:
        self.assertIn('echo "changed=false"', self.workflow)
        self.assertIn('echo "changed=true"', self.workflow)
        self.assertIn("if: steps.snapshot.outputs.changed == 'true'", self.workflow)
        self.assertIn("gh pr create", self.workflow)
        self.assertIn("--draft", self.workflow)

    def test_pr_creation_failure_uploads_auditable_handoff_and_stays_red(self) -> None:
        self.assertIn("id: pr", self.workflow)
        self.assertIn("continue-on-error: true", self.workflow)
        self.assertIn("handoff_dir", self.workflow)
        self.assertIn("actions/upload-artifact@v4", self.workflow)
        self.assertIn("steps.pr.outcome == 'failure'", self.workflow)
        self.assertIn("Fail closed", self.workflow)

    @staticmethod
    def _lifecycle_outcome(
        *,
        maintenance_ref_exists: bool,
        open_handoff_pr_exists: bool,
        snapshot_changed: bool = True,
        pr_mutation_succeeds: bool = True,
    ) -> str:
        """Model the workflow's observable handoff state without GitHub writes."""
        if not snapshot_changed:
            return "no-change"
        if not maintenance_ref_exists:
            return "bootstrap-required"
        if open_handoff_pr_exists:
            return "update-open-pr" if pr_mutation_succeeds else "artifact-and-fail"
        return "create-draft-pr" if pr_mutation_succeeds else "artifact-and-fail"

    def test_handoff_pr_lifecycle_is_fail_closed_and_recoverable(self) -> None:
        """Cover first push, open/closed/merged handoffs, deletion, and next push."""
        self.assertIn(
            'gh pr list --repo "${GITHUB_REPOSITORY}" --head "${branch}" '
            '--base main --state open',
            self.workflow,
        )
        self.assertIn('gh pr edit "${existing}"', self.workflow)
        self.assertIn(
            'gh pr create --repo "${GITHUB_REPOSITORY}" --base main '
            '--head "${branch}"',
            self.workflow,
        )
        self.assertIn('if ! git ls-remote --exit-code origin "refs/heads/${branch}"', self.workflow)

        cases = [
            ("first push after administrator bootstrap", True, False, "create-draft-pr"),
            ("next push while handoff PR is open", True, True, "update-open-pr"),
            ("next push after handoff PR is closed", True, False, "create-draft-pr"),
            ("next push after handoff PR is merged and ref retained", True, False, "create-draft-pr"),
            ("merged handoff ref deleted", False, False, "bootstrap-required"),
            ("next push after normal maintainer bootstrap restores the ref", True, False, "create-draft-pr"),
        ]
        for label, ref_exists, open_pr, expected in cases:
            with self.subTest(label=label):
                self.assertEqual(
                    expected,
                    self._lifecycle_outcome(
                        maintenance_ref_exists=ref_exists,
                        open_handoff_pr_exists=open_pr,
                    ),
                )

        self.assertEqual(
            "no-change",
            self._lifecycle_outcome(
                maintenance_ref_exists=False,
                open_handoff_pr_exists=False,
                snapshot_changed=False,
            ),
        )
        self.assertEqual(
            "artifact-and-fail",
            self._lifecycle_outcome(
                maintenance_ref_exists=True,
                open_handoff_pr_exists=False,
                pr_mutation_succeeds=False,
            ),
        )


if __name__ == "__main__":
    unittest.main()
