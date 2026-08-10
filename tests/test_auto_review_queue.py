import json
import sys
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch


ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "scripts"))

from auto_review_queue import (  # noqa: E402
    WorkerError,
    ci_state,
    decide,
    historical_best_score,
    load_cached_review,
    official_score_from_review,
    parse_args,
    submission_dir_from_files,
)
from generate_submissions_data import package_sha256  # noqa: E402


class AutoReviewQueueTests(unittest.TestCase):
    def test_default_image_budget_matches_bilingual_packet(self) -> None:
        with patch.object(sys, "argv", ["auto_review_queue"]):
            args = parse_args()
        self.assertEqual(18, args.max_images)

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

    def test_score_regression_is_not_merged_even_above_absolute_threshold(self) -> None:
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
        outcome = decide(review, {"weighted_score_100": 79}, 60, historical_best=93)
        self.assertEqual("score-regression", outcome.action)
        self.assertIn("historical exact-head best 93", outcome.reason)

    def test_equal_historical_score_remains_eligible(self) -> None:
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
        self.assertEqual("accept", decide(review, {"weighted_score_100": 93}, 60, historical_best=93).action)

    def test_historical_score_requires_exact_head_marker_and_package_path(self) -> None:
        head = "a" * 40
        body = (
            f"<!-- haidian-auto-review:{head} -->\n"
            "Maintainer intake decision: Review Agent score 93/100. Mandatory rejection and all four local gates passed."
        )
        approved = {"state": "APPROVED", "author": {"login": "CocoSgt"}, "body": body}
        self.assertEqual(93, official_score_from_review(approved, head, {"cocosgt"}))
        self.assertIsNone(official_score_from_review(approved, "b" * 40, {"cocosgt"}))
        self.assertIsNone(
            official_score_from_review(
                {**approved, "state": "CHANGES_REQUESTED"}, head, {"cocosgt"}
            )
        )
        self.assertIsNone(
            official_score_from_review(
                {**approved, "author": {"login": "untrusted-contributor"}}, head, {"cocosgt"}
            )
        )
        merged_prs = [
            {
                "headRefOid": head,
                "files": [{"path": "submissions/alice/plan/manifest.json"}],
                "reviews": [approved],
            },
            {
                "headRefOid": head,
                "files": [{"path": "submissions/alice/other/manifest.json"}],
                "reviews": [approved],
            },
        ]
        self.assertEqual(93, historical_best_score(merged_prs, "submissions/alice/plan", {"cocosgt"}))

    def test_non_approved_or_untrusted_reviews_never_raise_historical_best(self) -> None:
        head = "b" * 40
        body = (
            f"<!-- haidian-auto-review:{head} -->\n"
            "Maintainer intake decision: Review Agent score 100/100. Mandatory rejection and all four local gates passed."
        )
        merged_prs = [
            {
                "headRefOid": head,
                "files": [{"path": "submissions/alice/plan/manifest.json"}],
                "reviews": [
                    {"state": "CHANGES_REQUESTED", "author": {"login": "CocoSgt"}, "body": body},
                    {"state": "APPROVED", "author": {"login": "untrusted-contributor"}, "body": body},
                ],
            }
        ]
        self.assertIsNone(historical_best_score(merged_prs, "submissions/alice/plan", {"cocosgt"}))

    def test_mixed_scope_merged_pr_cannot_establish_package_history(self) -> None:
        head = "b" * 40
        body = (
            f"<!-- haidian-auto-review:{head} -->\n"
            "Maintainer intake decision: Review Agent score 100/100. Mandatory rejection and all four local gates passed."
        )
        merged_prs = [
            {
                "headRefOid": head,
                "files": [
                    {"path": "submissions/alice/plan/manifest.json"},
                    {"path": "scripts/auto_review_queue.py"},
                ],
                "reviews": [
                    {"state": "APPROVED", "author": {"login": "CocoSgt"}, "body": body}
                ],
            }
        ]
        self.assertIsNone(historical_best_score(merged_prs, "submissions/alice/plan", {"cocosgt"}))

    def test_historical_best_keeps_higher_score_from_non_final_merged_pr_revision(self) -> None:
        reviewed_head = "c" * 40
        final_head = "d" * 40
        body = (
            f"<!-- haidian-auto-review:{reviewed_head} -->\n"
            "Maintainer intake decision: Review Agent score 94/100. Mandatory rejection and all four local gates passed."
        )
        merged_prs = [
            {
                "headRefOid": final_head,
                "files": [{"path": "submissions/alice/plan/proposal.md"}],
                "reviews": [
                    {
                        "state": "APPROVED",
                        "author": {"login": "CocoSgt"},
                        "body": body,
                        "commit": {"oid": reviewed_head},
                    }
                ],
            }
        ]
        self.assertEqual(94, historical_best_score(merged_prs, "submissions/alice/plan", {"cocosgt"}))

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

    def test_ci_state_uses_latest_validation_run(self) -> None:
        self.assertEqual(
            "success",
            ci_state(
                {
                    "statusCheckRollup": [
                        {
                            "name": "submission-validation",
                            "status": "COMPLETED",
                            "conclusion": "FAILURE",
                            "startedAt": "2026-08-08T15:00:00Z",
                        },
                        {
                            "name": "submission-validation",
                            "status": "COMPLETED",
                            "conclusion": "SUCCESS",
                            "startedAt": "2026-08-08T16:00:00Z",
                        },
                    ]
                }
            ),
        )
        self.assertEqual(
            "pending",
            ci_state(
                {
                    "statusCheckRollup": [
                        {
                            "name": "submission-validation",
                            "status": "COMPLETED",
                            "conclusion": "SUCCESS",
                            "startedAt": "2026-08-08T15:00:00Z",
                        },
                        {
                            "name": "submission-validation",
                            "status": "IN_PROGRESS",
                            "conclusion": "",
                            "startedAt": "2026-08-08T16:00:00Z",
                        },
                    ]
                }
            ),
        )

    def test_reuses_only_complete_matching_exact_head_audit(self) -> None:
        with tempfile.TemporaryDirectory() as temp_dir:
            checkout = Path(temp_dir) / "checkout"
            submission = checkout / "submissions" / "alice" / "plan"
            submission.mkdir(parents=True)
            (submission / "proposal.md").write_text("proposal", encoding="utf-8")
            (submission / "manifest.json").write_text('{"files": []}', encoding="utf-8")
            digest = package_sha256(submission)
            audit = Path(temp_dir) / "audit"
            audit.mkdir()
            review = {
                "submission_dir": "submissions/alice/plan",
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
            decision = {
                "submission_dir": "submissions/alice/plan",
                "reviewed_package_sha256": digest,
                "weighted_score_100": 61,
                "dry_run": False,
                "model_output_schema_valid": True,
            }
            (audit / "ai-review.json").write_text(json.dumps(review), encoding="utf-8")
            (audit / "ai-decision.json").write_text(json.dumps(decision), encoding="utf-8")
            (audit / "pr-comment.md").write_text("review", encoding="utf-8")

            cached = load_cached_review(audit, "submissions/alice/plan", checkout, 60)
            self.assertIsNotNone(cached)
            assert cached is not None
            self.assertEqual("accept", cached[2].action)

            (submission / "proposal.md").write_text("updated", encoding="utf-8")
            self.assertIsNone(load_cached_review(audit, "submissions/alice/plan", checkout, 60))


if __name__ == "__main__":
    unittest.main()
