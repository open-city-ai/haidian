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
        self.assertIn("cancel-in-progress: false", jobs_scope)
        self.assertIn("queue: max", jobs_scope)


if __name__ == "__main__":
    unittest.main()
