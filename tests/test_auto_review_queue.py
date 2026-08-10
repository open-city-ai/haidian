import json
import sys
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch


ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "scripts"))

from auto_review_queue import (  # noqa: E402
    Decision,
    WorkerError,
    append_review_observation,
    build_review_observation,
    ci_state,
    decide,
    load_cached_review,
    parse_args,
    submission_dir_from_files,
)
import ai_review_submission  # noqa: E402
from ai_review_submission import DEFAULT_BASE_URL, review_identity, review_policy_sha256  # noqa: E402


class AutoReviewQueueTests(unittest.TestCase):
    def test_default_image_budget_matches_bilingual_packet(self) -> None:
        with patch.object(sys, "argv", ["auto_review_queue"]):
            args = parse_args()
        self.assertEqual(18, args.max_images)

    def test_policy_hash_changes_for_transitive_review_dependencies(self) -> None:
        with tempfile.TemporaryDirectory() as temp_dir:
            repo = Path(temp_dir) / "checkout"
            scripts = repo / "scripts"
            scripts.mkdir(parents=True)
            for name in [
                "ai_review_submission.py",
                "auto_review_queue.py",
                "generate_submissions_data.py",
                "review_submission.py",
                "source_registry_utils.py",
                "validate_local_submission.py",
                "validate_submission.py",
                "self_check_submission.py",
                "spatial_review.py",
                "visual_review.py",
                "professional_review.py",
            ]:
                (scripts / name).write_text(name, encoding="utf-8")
            schema = repo / "brief" / "site-package" / "schemas" / "advisory_review.schema.json"
            schema.parent.mkdir(parents=True)
            schema.write_text("{}", encoding="utf-8")
            (repo / "brief" / "site-package").mkdir(exist_ok=True)
            (repo / "brief" / "site-package" / "agent_taskbook.json").write_text("{}", encoding="utf-8")
            (repo / "data").mkdir()
            (repo / "data" / "source_registry.json").write_text("{}", encoding="utf-8")

            original_file = ai_review_submission.__file__
            try:
                ai_review_submission.__file__ = str(scripts / "ai_review_submission.py")
                before = review_policy_sha256(repo)
                (scripts / "source_registry_utils.py").write_text("dependency changed", encoding="utf-8")
                after = review_policy_sha256(repo)
            finally:
                ai_review_submission.__file__ = original_file

            self.assertNotEqual(before, after)

    def test_policy_hash_changes_for_transitive_policy_inputs(self) -> None:
        with tempfile.TemporaryDirectory() as temp_dir:
            repo = Path(temp_dir) / "checkout"
            scripts = repo / "scripts"
            scripts.mkdir(parents=True)
            for name in ai_review_submission.TRUSTED_REVIEW_SCRIPT_NAMES:
                (scripts / name).write_text(name, encoding="utf-8")
            schema = repo / "brief" / "site-package" / "schemas" / "advisory_review.schema.json"
            schema.parent.mkdir(parents=True)
            schema.write_text("{}", encoding="utf-8")
            enums = repo / "brief" / "site-package" / "enums"
            enums.mkdir(parents=True)
            layers = enums / "layers.json"
            layers.write_text('{"layers": []}', encoding="utf-8")

            original_file = ai_review_submission.__file__
            try:
                ai_review_submission.__file__ = str(scripts / "ai_review_submission.py")
                before = review_policy_sha256(repo)
                layers.write_text('{"layers": [{"code": "new-layer"}]}', encoding="utf-8")
                after = review_policy_sha256(repo)
            finally:
                ai_review_submission.__file__ = original_file

            self.assertNotEqual(before, after)

    def test_review_observation_is_minimal_and_append_only(self) -> None:
        with tempfile.TemporaryDirectory() as temp_dir:
            ledger = Path(temp_dir) / "queue" / "review-observations.jsonl"
            review = {
                "rubric_scores": [
                    {"dimension_id": "brief_alignment", "score": 4, "required_repairs_zh": ["clarify scope"]},
                    {"dimension_id": "originality", "score": 3, "required_repairs_zh": []},
                ],
                "required_next_actions_zh": ["clarify scope"],
            }
            decision = {
                "reviewed_package_sha256": "a" * 64,
                "review_input_sha256": "b" * 64,
                "prompt_sha256": "c" * 64,
                "review_schema_sha256": "d" * 64,
                "review_policy_sha256": "e" * 64,
                "model": "gpt-test",
                "base_url": DEFAULT_BASE_URL,
                "reasoning_effort": "high",
                "weighted_score_100": 72.5,
                "publication_recommendation": "publish-qualified",
            }
            first = build_review_observation(
                number=1190,
                head_sha="f" * 40,
                submission_dir="submissions/alice/plan",
                review=review,
                decision=decision,
                outcome=Decision("accept", 72.5, "threshold and all gates passed"),
                reused_audit=False,
            )
            second = dict(first, recorded_at="later", cache_reused=True)
            append_review_observation(ledger, first)
            append_review_observation(ledger, second)

            rows = [json.loads(line) for line in ledger.read_text(encoding="utf-8").splitlines()]
            self.assertEqual(2, len(rows))
            self.assertEqual({"brief_alignment": 4, "originality": 3}, rows[0]["rubric_scores"])
            self.assertEqual(1, rows[0]["repair_count"])
            self.assertEqual(1, rows[0]["required_next_actions_count"])
            self.assertFalse(rows[0]["cache_reused"])
            self.assertTrue(rows[1]["cache_reused"])
            self.assertNotIn("required_repairs_zh", rows[0])
            self.assertNotIn("comment_zh", rows[0])

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
            audit = Path(temp_dir) / "audit"
            audit.mkdir()
            schema_path = checkout / "brief" / "site-package" / "schemas" / "advisory_review.schema.json"
            schema_path.parent.mkdir(parents=True)
            schema_path.write_text("{}", encoding="utf-8")
            review_input = {
                "submission_dir": "submissions/alice/plan",
                "author": "alice",
                "input_revision": "v1",
                "ai_visual_input_summary": {"included": [], "warnings": [], "preflight_issues": []},
                "ai_content_preflight_issues": [],
            }
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
            identity = review_identity(
                checkout,
                submission,
                review_input,
                {},
                "gpt-test",
                DEFAULT_BASE_URL,
                "high",
            )
            decision = {
                "submission_dir": "submissions/alice/plan",
                **identity,
                "model": "gpt-test",
                "base_url": DEFAULT_BASE_URL,
                "reasoning_effort": "high",
                "weighted_score_100": 61,
                "dry_run": False,
                "model_output_schema_valid": True,
            }
            (audit / "ai-review.json").write_text(json.dumps(review), encoding="utf-8")
            (audit / "ai-decision.json").write_text(json.dumps(decision), encoding="utf-8")
            (audit / "review-input.json").write_text(json.dumps(review_input), encoding="utf-8")
            (audit / "request-metadata.json").write_text(
                json.dumps(
                    {
                        **decision,
                        "visual_inputs": [],
                        "visual_warnings": [],
                        "visual_preflight_issues": [],
                        "content_preflight_issues": [],
                    }
                ),
                encoding="utf-8",
            )
            (audit / "pr-comment.md").write_text("review", encoding="utf-8")

            with patch("auto_review_queue.build_review_input", return_value=review_input):
                cached = load_cached_review(
                    audit,
                    "submissions/alice/plan",
                    checkout,
                    60,
                    model="gpt-test",
                    base_url=DEFAULT_BASE_URL,
                    reasoning_effort="high",
                )
            self.assertIsNotNone(cached)
            assert cached is not None
            self.assertEqual("accept", cached[2].action)

            self.assertIsNone(
                load_cached_review(
                    audit,
                    "submissions/alice/plan",
                    checkout,
                    60,
                    model="gpt-new",
                    base_url=DEFAULT_BASE_URL,
                    reasoning_effort="high",
                )
            )

            changed_input = dict(review_input, input_revision="v2")
            with patch("auto_review_queue.build_review_input", return_value=changed_input):
                self.assertIsNone(
                    load_cached_review(
                        audit,
                        "submissions/alice/plan",
                        checkout,
                        60,
                        model="gpt-test",
                        base_url=DEFAULT_BASE_URL,
                        reasoning_effort="high",
                    )
                )


if __name__ == "__main__":
    unittest.main()
