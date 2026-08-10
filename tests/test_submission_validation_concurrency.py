from pathlib import Path
import unittest


REPO_ROOT = Path(__file__).resolve().parents[1]
WORKFLOW = REPO_ROOT / ".github" / "workflows" / "submission-validation.yml"


class SubmissionValidationConcurrencyTests(unittest.TestCase):
    def test_superseded_heads_cancel_without_parallelizing_api_hydration(self) -> None:
        workflow = WORKFLOW.read_text(encoding="utf-8")
        workflow_scope, jobs_scope = workflow.split("\njobs:\n", 1)

        self.assertIn(
            "group: submission-validation-pr-${{ github.event.pull_request.number }}",
            workflow_scope,
        )
        self.assertIn("cancel-in-progress: true", workflow_scope)
        self.assertNotIn("queue: max", workflow_scope)

        self.assertIn("group: submission-validation-api", jobs_scope)
        self.assertIn("timeout-minutes: 15", jobs_scope)
        self.assertIn("cancel-in-progress: false", jobs_scope)
        self.assertIn("queue: max", jobs_scope)
        self.assertNotIn("queue: single", jobs_scope)

    def test_watchdog_is_manual_dry_run_and_scheduled_apply(self) -> None:
        workflow = (
            REPO_ROOT / ".github" / "workflows" / "submission-validation-queue-watchdog.yml"
        ).read_text(encoding="utf-8")
        self.assertIn('cron: "*/15 * * * *"', workflow)
        self.assertIn("workflow_dispatch:", workflow)
        self.assertIn("actions: write", workflow)
        self.assertIn("scripts/cleanup_submission_validation_runs.py", workflow)
        self.assertIn('APPLY_CLEANUP: ${{ github.event_name == \'schedule\' }}', workflow)
        self.assertIn("python3 scripts/cleanup_submission_validation_runs.py --apply", workflow)
        self.assertIn("python3 scripts/cleanup_submission_validation_runs.py\n", workflow)


if __name__ == "__main__":
    unittest.main()
