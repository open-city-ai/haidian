import sys
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "scripts"))

from auto_review_queue import WorkerError, ci_state, decide, submission_dir_from_files  # noqa: E402


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


if __name__ == "__main__":
    unittest.main()
