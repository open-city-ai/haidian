import json
import sys
import tempfile
import unittest
from pathlib import Path
from types import SimpleNamespace
from unittest.mock import patch


ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "scripts"))

from auto_review_queue import (  # noqa: E402
    Decision,
    WorkerError,
    acquire_worker_lock,
    apply_review,
    ci_state,
    decide,
    historical_best_score,
    ledger_best_score,
    load_trusted_score_ledger,
    load_cached_review,
    official_score_from_review,
    parse_args,
    pr_file_paths,
    queued_prs,
    submission_dir_from_files,
    trusted_snapshot_score,
)
from generate_submissions_data import package_sha256  # noqa: E402


class AutoReviewQueueTests(unittest.TestCase):
    def test_merge_is_bound_to_reviewed_head_for_all_merge_modes(self) -> None:
        head_sha = "a" * 40
        live = {
            "headRefOid": head_sha,
            "state": "OPEN",
            "isDraft": False,
            "mergeable": "MERGEABLE",
            "statusCheckRollup": [
                {"name": "submission-validation", "conclusion": "SUCCESS"}
            ],
        }
        for admin_merge in (False, True):
            with self.subTest(admin_merge=admin_merge):
                with (
                    patch("auto_review_queue.pr_meta", return_value=live),
                    patch("auto_review_queue.run") as run_mock,
                ):
                    apply_review(
                        "open-city-ai/haidian",
                        42,
                        head_sha,
                        Decision("accept", 90, "accepted"),
                        ROOT / "unused-comment.md",
                        ROOT,
                        admin_merge=admin_merge,
                    )

                    run_mock.assert_any_call(
                        [
                            "gh",
                            "pr",
                            "merge",
                            "42",
                            "--repo",
                            "open-city-ai/haidian",
                            "--merge",
                            "--match-head-commit",
                            head_sha,
                            *(["--admin"] if admin_merge else []),
                        ],
                        cwd=ROOT,
                    )
                    review_command = next(
                        call.args[0]
                        for call in run_mock.call_args_list
                        if call.args[0][:3] == ["gh", "pr", "review"]
                    )
                    self.assertIn("review readiness passed", review_command[-1])

    def test_trusted_score_ledger_supplies_a_package_high_water_mark(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            docs = root / "docs"
            docs.mkdir()
            (docs / "trusted-score-high-water.json").write_text(
                json.dumps(
                    {
                        "schema_version": 1,
                        "entries": [
                            {
                                "submission_dir": "submissions/alice/plan",
                                "score": 94,
                                "reviewed_head_sha": "a" * 40,
                                "merged_pr": 12,
                                "reviewer": "CocoSgt",
                            }
                        ],
                    }
                ),
                encoding="utf-8",
            )
            ledger = load_trusted_score_ledger(root, {"cocosgt"})
        self.assertEqual(94, ledger_best_score(ledger, "submissions/alice/plan"))
        self.assertIsNone(ledger_best_score(ledger, "submissions/alice/other"))

    def test_current_newer_147228_packages_have_explicit_high_water_baselines(self) -> None:
        ledger = load_trusted_score_ledger(ROOT, {"cocosgt", "wakenmeng"})
        self.assertEqual(
            67,
            ledger_best_score(ledger, "submissions/147228/commute-co-benefit-jingzhang"),
        )
        self.assertEqual(
            76,
            ledger_best_score(ledger, "submissions/147228/enterprise-resident-flow-commons"),
        )

    def test_trusted_score_ledger_rejects_untrusted_or_malformed_entries(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            docs = root / "docs"
            docs.mkdir()
            (docs / "trusted-score-high-water.json").write_text(
                json.dumps(
                    {
                        "schema_version": 1,
                        "entries": [
                            {
                                "submission_dir": "submissions/alice/plan",
                                "score": 100,
                                "reviewed_head_sha": "b" * 40,
                                "merged_pr": 13,
                                "reviewer": "untrusted",
                            }
                        ],
                    }
                ),
                encoding="utf-8",
            )
            with self.assertRaises(WorkerError):
                load_trusted_score_ledger(root, {"cocosgt"})

    def test_default_image_budget_matches_bilingual_packet(self) -> None:
        with patch.object(sys, "argv", ["auto_review_queue"]):
            args = parse_args()
        self.assertEqual(18, args.max_images)

    def test_accepts_score_at_threshold_when_intake_ready_even_if_not_publishable(self) -> None:
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
            "recommendation": "formal-review-ready",
            "can_enter_formal_review": True,
            "required_next_actions_zh": [],
        }
        decision = {
            "weighted_score_100": 60,
            "publication_recommendation": "do-not-publish",
        }
        self.assertEqual("accept", decide(review, decision, 60).action)

    def test_non_formal_recommendation_blocks_intake(self) -> None:
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
            "recommendation": "request-changes",
            "can_enter_formal_review": True,
            "required_next_actions_zh": [],
        }
        outcome = decide(review, {"weighted_score_100": 90}, 60)
        self.assertEqual("request-changes", outcome.action)
        self.assertEqual("intake blocked by review fields: recommendation", outcome.reason)

    def test_false_formal_review_flag_blocks_intake(self) -> None:
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
            "recommendation": "formal-review-ready",
            "can_enter_formal_review": False,
            "required_next_actions_zh": [],
        }
        outcome = decide(review, {"weighted_score_100": 90}, 60)
        self.assertEqual("request-changes", outcome.action)
        self.assertEqual("intake blocked by review fields: can_enter_formal_review", outcome.reason)

    def test_required_participant_actions_block_intake(self) -> None:
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
            "recommendation": "formal-review-ready",
            "can_enter_formal_review": True,
            "required_next_actions_zh": ["补充权属证明。"],
        }
        outcome = decide(review, {"weighted_score_100": 90}, 60)
        self.assertEqual("request-changes", outcome.action)
        self.assertEqual("intake blocked by review fields: required_next_actions_zh", outcome.reason)

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
            "recommendation": "formal-review-ready",
            "can_enter_formal_review": True,
            "required_next_actions_zh": [],
        }
        outcome = decide(review, {"weighted_score_100": 79}, 60, historical_best=93)
        self.assertEqual("score-regression", outcome.action)
        self.assertIn("historical exact-head best 93", outcome.reason)

    def test_exact_trusted_snapshot_can_be_restored_after_lower_revert_score(self) -> None:
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
            "recommendation": "formal-review-ready",
            "can_enter_formal_review": True,
            "required_next_actions_zh": [],
        }
        outcome = decide(
            review,
            {"weighted_score_100": 77},
            60,
            historical_best=88,
            restored_snapshot_score=88,
        )
        self.assertEqual("restore-high-water", outcome.action)
        self.assertIn("trusted retained snapshot 88/100", outcome.reason)

    def test_low_absolute_score_cannot_bypass_restoration_guard(self) -> None:
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
        self.assertEqual(
            "low-quality",
            decide(
                review,
                {"weighted_score_100": 59.9},
                60,
                historical_best=88,
                restored_snapshot_score=88,
            ).action,
        )

    def test_snapshot_match_is_package_tree_scoped(self) -> None:
        with patch("auto_review_queue.run") as mocked_run:
            mocked_run.side_effect = [
                SimpleNamespace(stdout="candidate-tree\n"),
                SimpleNamespace(stdout="candidate-tree\n"),
                SimpleNamespace(stdout="different-tree\n"),
            ]
            score = trusted_snapshot_score(
                Path("/repo"),
                Path("/worktree"),
                "submissions/alice/plan",
                [
                    {"score": 94, "head_sha": "a" * 40},
                    {"score": 88, "head_sha": "b" * 40},
                ],
            )
        self.assertEqual(94, score)

    def test_snapshot_match_fetches_missing_historical_commit(self) -> None:
        historical_head = "a" * 40
        with patch("auto_review_queue.run") as mocked_run:
            mocked_run.side_effect = [
                SimpleNamespace(stdout="candidate-tree\n"),
                WorkerError("historical commit is missing"),
                SimpleNamespace(stdout=""),
                SimpleNamespace(stdout="candidate-tree\n"),
            ]
            score = trusted_snapshot_score(
                Path("/repo"),
                Path("/worktree"),
                "submissions/alice/plan",
                [{"score": 94, "head_sha": historical_head}],
            )
        self.assertEqual(94, score)
        self.assertEqual(
            ["git", "fetch", "--no-tags", "--quiet", "origin", historical_head],
            mocked_run.call_args_list[2].args[0],
        )

    def test_equal_historical_score_is_held_without_exact_snapshot(self) -> None:
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
            "recommendation": "formal-review-ready",
            "can_enter_formal_review": True,
            "required_next_actions_zh": [],
        }
        outcome = decide(review, {"weighted_score_100": 93}, 60, historical_best=93)
        self.assertEqual("score-regression", outcome.action)
        self.assertIn("not strictly above historical exact-head best 93", outcome.reason)

    def test_equal_historical_score_can_restore_exact_snapshot(self) -> None:
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
            "recommendation": "formal-review-ready",
            "can_enter_formal_review": True,
            "required_next_actions_zh": [],
        }
        self.assertEqual(
            "restore-high-water",
            decide(
                review,
                {"weighted_score_100": 93},
                60,
                historical_best=93,
                restored_snapshot_score=93,
            ).action,
        )

    def test_exact_snapshot_cannot_bypass_intake_readiness(self) -> None:
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
            "recommendation": "request-changes",
            "can_enter_formal_review": False,
            "required_next_actions_zh": ["补齐评分前内容证据。"],
        }
        outcome = decide(
            review,
            {"weighted_score_100": 93},
            60,
            historical_best=93,
            restored_snapshot_score=93,
        )
        self.assertEqual("request-changes", outcome.action)
        self.assertIn("intake blocked by review fields", outcome.reason)

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

    def test_worker_lock_rejects_second_holder_until_released(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            lock_path = Path(tmp) / ".worker.lock"
            first = acquire_worker_lock(lock_path)
            try:
                with self.assertRaises(WorkerError):
                    acquire_worker_lock(lock_path)
            finally:
                first.close()
            third = acquire_worker_lock(lock_path)
            third.close()

    def test_pr_file_paths_preserve_unicode_from_paginated_json(self) -> None:
        payload = [[
            {"filename": "submissions/alice/plan/proposal.md"},
            {"filename": "submissions/alice/plan/visual/assets/01-总体方案图.png"},
        ]]
        with patch("auto_review_queue.run") as mocked_run:
            mocked_run.return_value.stdout = json.dumps(payload, ensure_ascii=False)
            paths = pr_file_paths("open-city-ai/haidian", 999, ROOT)

        self.assertEqual(payload[0][1]["filename"], paths[1])
        self.assertEqual("submissions/alice/plan", submission_dir_from_files(paths, "alice"))
        mocked_run.assert_called_once_with(
            [
                "gh",
                "api",
                "--paginate",
                "--slurp",
                "repos/open-city-ai/haidian/pulls/999/files",
            ],
            cwd=ROOT,
        )

    def test_queued_prs_filter_object_labels_without_search(self) -> None:
        open_prs = [
            {"number": 101, "labels": [{"name": "review/queued"}]},
            {"number": 102, "labels": [{"name": "review/ci-failed"}]},
            {"number": 103, "labels": []},
        ]
        with patch("auto_review_queue.gh_json", return_value=open_prs) as mocked_gh_json:
            self.assertEqual([open_prs[0]], queued_prs("open-city-ai/haidian", "review/queued", ROOT))

        args = mocked_gh_json.call_args.args[1]
        self.assertNotIn("--label", args)
        self.assertIn("labels", args[-1])

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
                "recommendation": "formal-review-ready",
                "can_enter_formal_review": True,
                "required_next_actions_zh": [],
            }
            decision = {
                "submission_dir": "submissions/alice/plan",
                "reviewed_package_sha256": digest,
                "weighted_score_100": 61,
                "publication_recommendation": "publish-qualified",
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
