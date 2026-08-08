import sys
import unittest
from pathlib import Path
from unittest import mock


ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "scripts"))

from auto_review_queue import (  # noqa: E402
    WorkerError,
    ci_state,
    decide,
    edit_review_labels_verified,
    reconcile_merged_review_labels,
    review_label_changes,
    submission_dir_from_files,
)


class AutoReviewQueueTests(unittest.TestCase):
    def test_accepts_score_at_threshold_when_all_gates_pass(self) -> None:
        review = {
            "mandatory_rejection": {"result": "pass"},
            "gate_checks": {
                name: {"status": "pass"}
                for name in [
                    "deterministic_validation",
                    "spatial_review",
                    "visual_review",
                    "professional_evidence_review",
                ]
            },
        }
        self.assertEqual("accept", decide(review, {"weighted_score_100": 60}, 60).action)

    def test_low_score_is_not_merged(self) -> None:
        review = {
            "mandatory_rejection": {"result": "pass"},
            "gate_checks": {
                name: {"status": "pass"}
                for name in [
                    "deterministic_validation",
                    "spatial_review",
                    "visual_review",
                    "professional_evidence_review",
                ]
            },
        }
        self.assertEqual("low-quality", decide(review, {"weighted_score_100": 59.9}, 60).action)

    def test_failed_gate_overrides_high_score(self) -> None:
        review = {
            "mandatory_rejection": {"result": "pass"},
            "gate_checks": {
                "deterministic_validation": {"status": "pass"},
                "spatial_review": {"status": "pass"},
                "visual_review": {"status": "fail"},
                "professional_evidence_review": {"status": "pass"},
            },
        }
        self.assertEqual("request-changes", decide(review, {"weighted_score_100": 95}, 60).action)

    def test_mandatory_rejection_overrides_score(self) -> None:
        review = {"mandatory_rejection": {"result": "fail"}, "gate_checks": {}}
        self.assertEqual("request-changes", decide(review, {"weighted_score_100": 95}, 60).action)

    def test_submission_scope_requires_one_author_directory(self) -> None:
        paths = ["submissions/Alice/plan/proposal.md", "submissions/Alice/plan/agent.json"]
        self.assertEqual("submissions/Alice/plan", submission_dir_from_files(paths, "alice"))
        with self.assertRaises(WorkerError):
            submission_dir_from_files(paths + ["README.md"], "alice")

    def test_ci_state(self) -> None:
        self.assertEqual(
            "success",
            ci_state({"statusCheckRollup": [{"name": "submission-validation", "conclusion": "SUCCESS"}]}),
        )
        self.assertEqual(
            "failure",
            ci_state({"statusCheckRollup": [{"name": "submission-validation", "conclusion": "FAILURE"}]}),
        )
        self.assertEqual(
            "pending",
            ci_state({"statusCheckRollup": [{"name": "submission-validation", "conclusion": ""}]}),
        )
        self.assertEqual(
            "success",
            ci_state(
                {
                    "statusCheckRollup": [
                        {"name": "submission-validation", "conclusion": "SUCCESS"},
                        {"name": "unrelated", "conclusion": "FAILURE"},
                    ]
                }
            ),
        )
        self.assertEqual(
            "success",
            ci_state(
                {
                    "statusCheckRollup": [
                        {"name": "submission-validation", "conclusion": "SKIPPED"},
                        {"name": "submission-validation", "conclusion": "SUCCESS"},
                    ]
                }
            ),
        )

    def test_draft_reconciliation_replaces_active_review_labels(self) -> None:
        remove, add = review_label_changes(
            {
                "isDraft": True,
                "labels": [
                    {"name": "review/queued"},
                    {"name": "review/changes-requested"},
                    {"name": "unrelated"},
                ],
                "statusCheckRollup": [],
            }
        )
        self.assertEqual(["review/changes-requested", "review/queued"], remove)
        self.assertEqual(["review/draft"], add)

    def test_ready_failure_reconciliation_adds_ci_label_without_erasing_review(self) -> None:
        remove, add = review_label_changes(
            {
                "isDraft": False,
                "labels": [{"name": "review/changes-requested"}],
                "statusCheckRollup": [
                    {"name": "submission-validation", "conclusion": "FAILURE"}
                ],
            }
        )
        self.assertEqual([], remove)
        self.assertEqual(["review/ci-failed"], add)

    def test_ready_success_only_removes_stale_draft_label(self) -> None:
        remove, add = review_label_changes(
            {
                "isDraft": False,
                "labels": [
                    {"name": "review/draft"},
                    {"name": "review/changes-requested"},
                ],
                "statusCheckRollup": [
                    {"name": "submission-validation", "conclusion": "SUCCESS"}
                ],
            }
        )
        self.assertEqual(["review/draft"], remove)
        self.assertEqual([], add)

    def test_reconciliation_is_noop_when_labels_already_match(self) -> None:
        self.assertEqual(
            ([], []),
            review_label_changes(
                {
                    "isDraft": True,
                    "labels": [{"name": "review/draft"}],
                    "statusCheckRollup": [],
                }
            ),
        )

    def test_merged_queued_pr_is_reconciled_as_intake_accepted(self) -> None:
        with mock.patch("auto_review_queue.edit_review_labels_verified") as edit:
            result = reconcile_merged_review_labels(
                "open-city-ai/haidian",
                [{"number": 346, "labels": [{"name": "review/queued"}]}],
                ROOT,
            )
        edit.assert_called_once_with(
            "open-city-ai/haidian",
            346,
            ["review/queued"],
            ["review/intake-accepted"],
            ROOT,
        )
        self.assertEqual(
            [{"number": 346, "removed": ["review/queued"], "added": ["review/intake-accepted"]}],
            result,
        )

    def test_label_write_retries_when_first_result_does_not_persist(self) -> None:
        states = [
            {"labels": [{"name": "review/queued"}]},
            {"labels": [{"name": "review/queued"}]},
            {"labels": [{"name": "review/queued"}]},
            {"labels": [{"name": "review/intake-accepted"}]},
        ]
        with mock.patch("auto_review_queue.pr_meta", side_effect=states), mock.patch(
            "auto_review_queue.run"
        ) as run_mock:
            edit_review_labels_verified(
                "open-city-ai/haidian",
                346,
                ["review/queued"],
                ["review/intake-accepted"],
                ROOT,
            )
        self.assertEqual(2, run_mock.call_count)


if __name__ == "__main__":
    unittest.main()
