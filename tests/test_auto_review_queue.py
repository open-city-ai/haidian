import json
import os
import sys
import tempfile
import threading
import unittest
from concurrent.futures import ThreadPoolExecutor
from datetime import datetime, timezone
from pathlib import Path
from types import SimpleNamespace
from unittest.mock import patch


ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "scripts"))

from auto_review_queue import (  # noqa: E402
    DISABLED_SCORE_GUARD_POLICY,
    Decision,
    MERGE_PENDING_MARKER,
    REVIEW_MARKER,
    ScoreGuardPolicy,
    TRUSTED_REVIEWERS_ENV,
    WorkerError,
    acquire_worker_lock,
    create_merge_reservation,
    apply_review_with_fresh_score_context,
    apply_review,
    ci_state,
    decide,
    historical_best_score,
    ledger_best_score,
    load_score_guard_policy,
    load_trusted_score_ledger,
    load_cached_review,
    official_score_from_review,
    merge_request_status,
    merge_reservation_body,
    parse_args,
    process_submission_group,
    process_pr,
    pr_comments,
    pr_file_paths,
    pr_reviews,
    reconcile_merged_reservations,
    queued_prs,
    submission_dir_from_files,
    submission_dir_lock,
    submit_merge_request,
    trusted_reviewer_logins,
    trusted_snapshot_score,
    validate_trusted_reviewer_identities,
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
                    patch(
                        "auto_review_queue.merge_request_status",
                        side_effect=["absent", "absent"],
                    ),
                    patch(
                        "auto_review_queue.pr_comments",
                        return_value=[
                            {
                                "user": {"login": "CocoSgt"},
                                "body": merge_reservation_body(head_sha),
                            }
                        ],
                    ),
                    patch(
                        "auto_review_queue.pr_reviews",
                        side_effect=[
                            [],
                            [
                                {
                                    "state": "APPROVED",
                                    "user": {"login": "CocoSgt"},
                                    "commit_id": head_sha,
                                    "body": REVIEW_MARKER.format(head_sha=head_sha),
                                }
                            ],
                        ],
                    ),
                    patch(
                        "auto_review_queue.submit_merge_request",
                        return_value="merged",
                    ) as submit_mock,
                    patch("auto_review_queue.run") as run_mock,
                ):
                    merged = apply_review(
                        "open-city-ai/haidian",
                        42,
                        head_sha,
                        Decision("accept", 90, "accepted"),
                        ROOT / "unused-comment.md",
                        ROOT,
                        admin_merge=admin_merge,
                    )

                    self.assertTrue(merged)

                    submit_mock.assert_called_once_with(
                        "open-city-ai/haidian",
                        42,
                        head_sha,
                        ROOT,
                        admin_merge=admin_merge,
                    )
                    review_command = next(
                        call.args[0]
                        for call in run_mock.call_args_list
                        if call.args[0][:3] == ["gh", "pr", "review"]
                    )
                    self.assertIn("review readiness passed", review_command[-1])

    def test_merge_queue_is_not_reported_as_confirmed_intake(self) -> None:
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
        with (
            patch("auto_review_queue.pr_meta", return_value=live),
            patch(
                "auto_review_queue.merge_request_status",
                side_effect=["absent", "absent"],
            ),
            patch(
                "auto_review_queue.pr_comments",
                return_value=[
                    {
                        "user": {"login": "CocoSgt"},
                        "body": merge_reservation_body(head_sha),
                    }
                ],
            ),
            patch(
                "auto_review_queue.pr_reviews",
                side_effect=[
                    [],
                    [
                        {
                            "state": "APPROVED",
                            "user": {"login": "CocoSgt"},
                            "commit_id": head_sha,
                            "body": REVIEW_MARKER.format(head_sha=head_sha),
                        }
                    ],
                ],
            ),
            patch(
                "auto_review_queue.submit_merge_request", return_value="pending"
            ),
            patch("auto_review_queue.run") as run_mock,
        ):
            merged = apply_review(
                "open-city-ai/haidian",
                42,
                head_sha,
                Decision("accept", 90, "accepted"),
                ROOT / "unused-comment.md",
                ROOT,
                admin_merge=False,
            )

        self.assertFalse(merged)
        self.assertFalse(
            any(
                call.args[0][:3] == ["gh", "pr", "edit"]
                and "review/intake-accepted" in call.args[0]
                for call in run_mock.call_args_list
            )
        )

    def test_merge_request_status_distinguishes_queue_auto_merge_and_absence(self) -> None:
        head_sha = "a" * 40

        def payload(**fields: object) -> SimpleNamespace:
            pull = {
                "id": "PR_node_42",
                "state": "OPEN",
                "headRefOid": head_sha,
                **fields,
            }
            return SimpleNamespace(
                stdout=json.dumps(
                    {"data": {"repository": {"pullRequest": pull}}}
                )
            )

        cases = [
            (
                payload(
                    mergeQueueEntry={
                        "state": "QUEUED",
                        "headCommit": {"oid": "b" * 40},
                    },
                    autoMergeRequest=None,
                ),
                "pending",
            ),
            (
                payload(mergeQueueEntry=None, autoMergeRequest={"enabledAt": "now"}),
                "auto",
            ),
            (
                payload(mergeQueueEntry=None, autoMergeRequest=None),
                "absent",
            ),
            (
                SimpleNamespace(
                    stdout=json.dumps(
                        {
                            "data": {
                                "repository": {
                                    "pullRequest": {
                                        "id": "PR_node_42",
                                        "state": "MERGED",
                                        "headRefOid": head_sha,
                                        "mergeQueueEntry": None,
                                        "autoMergeRequest": None,
                                    }
                                }
                            }
                        }
                    )
                ),
                "merged",
            ),
        ]
        for response, expected in cases:
            with self.subTest(expected=expected):
                with patch("auto_review_queue.run", return_value=response):
                    self.assertEqual(
                        expected,
                        merge_request_status(
                            "open-city-ai/haidian", 42, head_sha, ROOT
                        ),
                    )

    def test_submit_merge_request_uses_atomic_exact_head_graphql(self) -> None:
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
        queue_pull = {
            "id": "PR_node_42",
            "state": "OPEN",
            "headRefOid": head_sha,
            "isMergeQueueEnabled": True,
        }
        queue_response = SimpleNamespace(
            stdout=json.dumps(
                {
                    "data": {
                        "enqueuePullRequest": {
                            "mergeQueueEntry": {"id": "MQE_42", "state": "QUEUED"}
                        }
                    }
                }
            )
        )
        with (
            patch("auto_review_queue.pr_meta", return_value=live),
            patch("auto_review_queue.merge_request_snapshot", return_value=queue_pull),
            patch("auto_review_queue.run", return_value=queue_response) as run_mock,
        ):
            self.assertEqual(
                "pending",
                submit_merge_request(
                    "open-city-ai/haidian",
                    42,
                    head_sha,
                    ROOT,
                    admin_merge=False,
                ),
            )
        queue_command = run_mock.call_args.args[0]
        self.assertEqual(["gh", "api", "graphql"], queue_command[:3])
        self.assertIn("enqueuePullRequest", queue_command[4])
        self.assertIn(f"expectedHeadOid={head_sha}", queue_command)
        self.assertNotIn("--auto", queue_command)

        direct_pull = {**queue_pull, "isMergeQueueEnabled": False}
        direct_response = SimpleNamespace(
            stdout=json.dumps(
                {
                    "data": {
                        "mergePullRequest": {
                            "pullRequest": {
                                "state": "MERGED",
                                "headRefOid": head_sha,
                            }
                        }
                    }
                }
            )
        )
        with (
            patch("auto_review_queue.pr_meta", return_value=live),
            patch("auto_review_queue.merge_request_snapshot", return_value=direct_pull),
            patch("auto_review_queue.run", return_value=direct_response) as run_mock,
        ):
            self.assertEqual(
                "merged",
                submit_merge_request(
                    "open-city-ai/haidian",
                    42,
                    head_sha,
                    ROOT,
                    admin_merge=False,
                ),
            )
        direct_command = run_mock.call_args.args[0]
        self.assertEqual(["gh", "api", "graphql"], direct_command[:3])
        self.assertIn("mergePullRequest", direct_command[4])
        self.assertIn(f"expectedHeadOid={head_sha}", direct_command)
        self.assertNotIn("--auto", direct_command)

    def test_preexisting_auto_merge_is_disabled_before_approval(self) -> None:
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
        reservation = [
            {
                "user": {"login": "CocoSgt"},
                "body": merge_reservation_body(head_sha),
            }
        ]
        approval = {
            "state": "APPROVED",
            "user": {"login": "CocoSgt"},
            "commit_id": head_sha,
            "body": REVIEW_MARKER.format(head_sha=head_sha),
        }
        events: list[str] = []

        def record_run(command: list[str], **_: object) -> SimpleNamespace:
            if command[:3] == ["gh", "pr", "review"]:
                events.append("approve")
            return SimpleNamespace(stdout="")

        with (
            patch("auto_review_queue.pr_meta", return_value=live),
            patch("auto_review_queue.pr_comments", return_value=reservation),
            patch("auto_review_queue.pr_reviews", side_effect=[[], [approval]]),
            patch(
                "auto_review_queue.merge_request_status",
                side_effect=["auto", "absent", "absent"],
            ),
            patch(
                "auto_review_queue.disable_auto_merge",
                side_effect=lambda *_: events.append("disable"),
            ),
            patch("auto_review_queue.submit_merge_request", return_value="pending"),
            patch("auto_review_queue.run", side_effect=record_run),
        ):
            self.assertFalse(
                apply_review(
                    "open-city-ai/haidian",
                    42,
                    head_sha,
                    Decision("accept", 90, "accepted"),
                    ROOT / "unused-comment.md",
                    ROOT,
                    admin_merge=False,
                    trusted_reviewers={"cocosgt"},
                )
            )
        self.assertEqual(["disable", "approve"], events)

    def test_acceptance_state_machine_resumes_without_duplicate_writes(self) -> None:
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
        reservation = [
            {
                "user": {"login": "CocoSgt"},
                "body": (
                    f"{MERGE_PENDING_MARKER.format(head_sha=head_sha)}\n"
                    "Exact-head merge reservation: this package is fail-closed until GitHub confirms "
                    "the PR as MERGED or a maintainer closes the PR."
                ),
            }
        ]
        approval = {
            "state": "APPROVED",
            "user": {"login": "CocoSgt"},
            "commit_id": head_sha,
            "body": REVIEW_MARKER.format(head_sha=head_sha),
        }
        with (
            patch("auto_review_queue.pr_meta", return_value=live),
            patch("auto_review_queue.pr_comments", return_value=reservation),
            patch("auto_review_queue.pr_reviews", side_effect=[[], [approval]]),
            patch("auto_review_queue.merge_request_status", return_value="absent"),
            patch("auto_review_queue.submit_merge_request", return_value="pending") as submit_mock,
            patch("auto_review_queue.run") as run_mock,
        ):
            result = apply_review(
                "open-city-ai/haidian",
                42,
                head_sha,
                Decision("accept", 90, "accepted"),
                ROOT / "unused-comment.md",
                ROOT,
                admin_merge=False,
                trusted_reviewers={"cocosgt"},
            )
        self.assertFalse(result)
        self.assertEqual(
            1,
            sum(
                call.args[0][:3] == ["gh", "pr", "review"]
                for call in run_mock.call_args_list
            ),
        )
        submit_mock.assert_called_once()

        with (
            patch("auto_review_queue.pr_meta", return_value=live),
            patch("auto_review_queue.pr_comments", return_value=reservation),
            patch("auto_review_queue.pr_reviews", return_value=[approval]),
            patch("auto_review_queue.merge_request_status", return_value="pending"),
            patch("auto_review_queue.run") as idempotent_run,
        ):
            repeated = apply_review(
                "open-city-ai/haidian",
                42,
                head_sha,
                Decision("accept", 90, "accepted"),
                ROOT / "unused-comment.md",
                ROOT,
                admin_merge=False,
                trusted_reviewers={"cocosgt"},
            )
        self.assertFalse(repeated)
        idempotent_run.assert_not_called()

        with (
            patch("auto_review_queue.pr_meta", return_value=live),
            patch("auto_review_queue.pr_comments", return_value=reservation),
            patch("auto_review_queue.pr_reviews", return_value=[approval]),
            patch("auto_review_queue.merge_request_status", return_value="auto"),
            patch("auto_review_queue.submit_merge_request") as submit_mock,
            patch("auto_review_queue.disable_auto_merge") as disable_mock,
        ):
            with self.assertRaisesRegex(WorkerError, "disabled fail closed"):
                apply_review(
                    "open-city-ai/haidian",
                    42,
                    head_sha,
                    Decision("accept", 90, "accepted"),
                    ROOT / "unused-comment.md",
                    ROOT,
                    admin_merge=False,
                    trusted_reviewers={"cocosgt"},
                )
        self.assertEqual(1, disable_mock.call_count)
        submit_mock.assert_not_called()

    def test_new_reservation_verifies_the_returned_comment_author(self) -> None:
        head_sha = "a" * 40
        trusted = SimpleNamespace(
            stdout=json.dumps(
                {
                    "id": 123,
                    "user": {"login": "CocoSgt"},
                    "body": merge_reservation_body(head_sha),
                }
            )
        )
        with patch("auto_review_queue.run", return_value=trusted):
            create_merge_reservation(
                "open-city-ai/haidian",
                42,
                head_sha,
                {"cocosgt"},
                ROOT,
            )

        untrusted = SimpleNamespace(
            stdout=json.dumps(
                {
                    "id": 124,
                    "user": {"login": "someone-else"},
                    "body": merge_reservation_body(head_sha),
                }
            )
        )
        with patch("auto_review_queue.run", return_value=untrusted):
            with self.assertRaisesRegex(WorkerError, "not authored"):
                create_merge_reservation(
                    "open-city-ai/haidian",
                    42,
                    head_sha,
                    {"cocosgt"},
                    ROOT,
                )

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

    def test_trusted_reviewer_environment_is_an_explicit_full_replacement(self) -> None:
        with patch.dict(os.environ, {}, clear=True):
            self.assertEqual({"cocosgt", "wakenmeng"}, trusted_reviewer_logins())
        with patch.dict(
            os.environ,
            {TRUSTED_REVIEWERS_ENV: "Release-Bot,NewMaintainer"},
            clear=True,
        ):
            self.assertEqual(
                {"release-bot", "newmaintainer"}, trusted_reviewer_logins()
            )
        with patch.dict(
            os.environ,
            {TRUSTED_REVIEWERS_ENV: "Release-App[bot]"},
            clear=True,
        ):
            self.assertEqual({"release-app[bot]"}, trusted_reviewer_logins())
        for invalid in ("", "cocosgt,", "cocosgt,,wakenmeng", "-bad", "bad--login", "CocoSgt,cocosgt"):
            with self.subTest(invalid=invalid):
                with patch.dict(
                    os.environ, {TRUSTED_REVIEWERS_ENV: invalid}, clear=True
                ):
                    with self.assertRaises(WorkerError):
                        trusted_reviewer_logins()

    def test_trusted_reviewer_identities_must_resolve_exactly(self) -> None:
        def identity_response(command: list[str], *, cwd: Path, capture: bool = True) -> SimpleNamespace:
            login = "cocosgt" if command[-1] == "user" else command[-1].split("/", 1)[1]
            return SimpleNamespace(
                stdout=json.dumps({"login": login, "type": "User", "id": 123})
            )

        with patch("auto_review_queue.run", side_effect=identity_response) as run_mock:
            validate_trusted_reviewer_identities({"cocosgt", "wakenmeng"}, ROOT)
        self.assertEqual(2, run_mock.call_count)

        with patch(
            "auto_review_queue.run",
            return_value=SimpleNamespace(
                stdout=json.dumps({"login": "someone-else", "type": "User", "id": 123})
            ),
        ):
            with self.assertRaises(WorkerError):
                validate_trusted_reviewer_identities({"cocosgt"}, ROOT)

    def test_score_guard_is_disabled_without_an_approved_policy_file(self) -> None:
        self.assertEqual(
            DISABLED_SCORE_GUARD_POLICY,
            load_score_guard_policy(None, {"cocosgt"}),
        )

    def test_score_guard_policy_fixes_scope_effective_date_and_migration(self) -> None:
        payload = {
            "schema_version": 1,
            "status": "approved",
            "effective_at": "2026-08-01T00:00:00Z",
            "history_scope": "all-merged-history",
            "submission_dirs": ["submissions/alice/plan"],
            "ledger_migration": "complete",
            "compatibility_decision": "approved",
            "rollback_plan": "Stop the worker and omit the policy file on restart.",
            "approved_by": ["CocoSgt"],
        }
        with tempfile.TemporaryDirectory() as tmp:
            path = Path(tmp) / "policy.json"
            path.write_text(json.dumps(payload), encoding="utf-8")
            policy = load_score_guard_policy(
                path,
                {"cocosgt"},
                now=datetime(2026, 8, 24, tzinfo=timezone.utc),
            )
            self.assertTrue(policy.applies_to("submissions/alice/plan"))
            self.assertFalse(policy.applies_to("submissions/alice/other"))

            payload["ledger_migration"] = "partial"
            path.write_text(json.dumps(payload), encoding="utf-8")
            with self.assertRaises(WorkerError):
                load_score_guard_policy(
                    path,
                    {"cocosgt"},
                    now=datetime(2026, 8, 24, tzinfo=timezone.utc),
                )

    def test_final_write_refresh_blocks_second_concurrent_score_regression(self) -> None:
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
        args = SimpleNamespace(
            repo="open-city-ai/haidian", threshold=60, admin_merge=False
        )
        submission_dir = "submissions/alice/plan"
        merged_state: list[dict[str, object]] = []
        policy = ScoreGuardPolicy(
            True,
            datetime(2026, 8, 1, tzinfo=timezone.utc),
            frozenset({submission_dir}),
        )
        first_in_apply = threading.Event()
        release_first = threading.Event()

        def fake_merged(*_args: object, **_kwargs: object) -> list[dict[str, object]]:
            return list(merged_state)

        def fake_apply(
            _repo: str,
            number: int,
            head_sha: str,
            outcome: Decision,
            *_args: object,
            **_kwargs: object,
        ) -> None:
            if number == 1:
                first_in_apply.set()
                self.assertTrue(release_first.wait(timeout=2))
            if outcome.action == "accept":
                merged_state.append(
                    {
                        "number": number,
                        "state": "MERGED",
                        "headRefOid": head_sha,
                        "files": [{"path": f"{submission_dir}/manifest.json"}],
                        "reviews": [
                            {
                                "state": "APPROVED",
                                "author": {"login": "CocoSgt"},
                                "body": (
                                    f"<!-- haidian-auto-review:{head_sha} -->\n"
                                    f"Maintainer intake decision: Review Agent score {outcome.score:g}/100."
                                ),
                            }
                        ],
                    }
                )
            return True

        def finalize(number: int, score: int):
            return apply_review_with_fresh_score_context(
                args,
                number,
                str(number) * 40,
                "alice",
                submission_dir,
                ROOT,
                review,
                {"weighted_score_100": score},
                ROOT / "unused-comment.md",
                ROOT,
                {},
                [],
                {"cocosgt"},
                policy,
            )

        with (
            patch("auto_review_queue.score_guard_prs_for_author", side_effect=fake_merged),
            patch("auto_review_queue.trusted_snapshot_score", return_value=None),
            patch("auto_review_queue.apply_review", side_effect=fake_apply),
            ThreadPoolExecutor(max_workers=2) as executor,
        ):
            first = executor.submit(finalize, 1, 90)
            self.assertTrue(first_in_apply.wait(timeout=2))
            second = executor.submit(finalize, 2, 85)
            release_first.set()
            first_result = first.result(timeout=2)
            second_result = second.result(timeout=2)

        self.assertEqual("accept", first_result[0].action)
        self.assertEqual("score-regression", second_result[0].action)
        self.assertEqual(90, second_result[1])

    def test_open_merge_queue_approval_reserves_submission_directory(self) -> None:
        submission_dir = "submissions/alice/plan"
        first_head = "1" * 40
        pending_pr = {
            "number": 1,
            "state": "OPEN",
            "headRefOid": first_head,
            "files": [{"path": f"{submission_dir}/manifest.json"}],
            "comments": [
                {
                    "author": {"login": "CocoSgt"},
                    "body": merge_reservation_body(first_head),
                }
            ],
        }
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
        args = SimpleNamespace(
            repo="open-city-ai/haidian", threshold=60, admin_merge=False
        )
        policy = ScoreGuardPolicy(
            True,
            datetime(2026, 8, 1, tzinfo=timezone.utc),
            frozenset({submission_dir}),
        )
        with (
            patch("auto_review_queue.score_guard_prs_for_author", return_value=[pending_pr]),
            patch("auto_review_queue.pr_comments", return_value=pending_pr["comments"]),
            patch("auto_review_queue.apply_review") as apply_mock,
        ):
            with self.assertRaisesRegex(WorkerError, "still open"):
                apply_review_with_fresh_score_context(
                    args,
                    2,
                    "2" * 40,
                    "alice",
                    submission_dir,
                    ROOT,
                    review,
                    {"weighted_score_100": 95},
                    ROOT / "unused-comment.md",
                    ROOT,
                    {},
                    [],
                    {"cocosgt"},
                    policy,
                )
        apply_mock.assert_not_called()

        pending_pr["number"] = 2
        with (
            patch("auto_review_queue.score_guard_prs_for_author", return_value=[pending_pr]),
            patch("auto_review_queue.pr_comments", return_value=pending_pr["comments"]),
            patch("auto_review_queue.apply_review", return_value=False) as repeat_apply_mock,
        ):
            repeated = apply_review_with_fresh_score_context(
                args,
                2,
                first_head,
                "alice",
                submission_dir,
                ROOT,
                review,
                {"weighted_score_100": 95},
                ROOT / "unused-comment.md",
                ROOT,
                {},
                [],
                {"cocosgt"},
                DISABLED_SCORE_GUARD_POLICY,
            )
        self.assertEqual("merge-pending", repeated[0].action)
        repeat_apply_mock.assert_called_once()

    def test_process_pr_serializes_the_complete_same_directory_lifecycle(self) -> None:
        args = SimpleNamespace(repo="open-city-ai/haidian")
        first_entered = threading.Event()
        second_entered = threading.Event()
        release_first = threading.Event()

        def fake_process(
            _args: object,
            number: int,
            *_rest: object,
        ) -> dict[str, object]:
            if number == 1:
                first_entered.set()
                self.assertTrue(release_first.wait(timeout=2))
            else:
                second_entered.set()
            return {"number": number, "result": "done"}

        def meta(number: int) -> dict[str, object]:
            return {
                "number": number,
                "headRefOid": str(number) * 40,
                "author": {"login": "alice"},
                "isDraft": False,
                "mergeable": "MERGEABLE",
                "statusCheckRollup": [
                    {"name": "submission-validation", "conclusion": "SUCCESS"}
                ],
            }

        with (
            patch(
                "auto_review_queue.pr_file_paths",
                return_value=["submissions/alice/plan/manifest.json"],
            ),
            patch("auto_review_queue._process_submission_pr", side_effect=fake_process),
            ThreadPoolExecutor(max_workers=2) as executor,
        ):
            first = executor.submit(
                process_pr,
                args,
                meta(1),
                ROOT,
                {},
                [],
                {"cocosgt"},
                DISABLED_SCORE_GUARD_POLICY,
            )
            self.assertTrue(first_entered.wait(timeout=2))
            second = executor.submit(
                process_pr,
                args,
                meta(2),
                ROOT,
                {},
                [],
                {"cocosgt"},
                DISABLED_SCORE_GUARD_POLICY,
            )
            self.assertFalse(second_entered.wait(timeout=0.05))
            release_first.set()
            self.assertEqual("done", first.result(timeout=2)["result"])
            self.assertEqual("done", second.result(timeout=2)["result"])
        self.assertTrue(second_entered.is_set())

    def test_submission_group_processes_prs_oldest_first(self) -> None:
        observed: list[int] = []

        def fake_process(
            _args: object,
            meta: dict[str, object],
            *_rest: object,
        ) -> dict[str, object]:
            number = int(meta["number"])
            observed.append(number)
            return {"number": number, "result": "done"}

        metas = [
            {"number": 9, "_submission_dir": "submissions/alice/plan"},
            {"number": 2, "_submission_dir": "submissions/alice/plan"},
            {"number": 5, "_submission_dir": "submissions/alice/plan"},
        ]
        with patch("auto_review_queue.process_pr", side_effect=fake_process):
            results = process_submission_group(
                SimpleNamespace(),
                metas,
                ROOT,
                {},
                [],
                {"cocosgt"},
                DISABLED_SCORE_GUARD_POLICY,
            )
        self.assertEqual([2, 5, 9], observed)
        self.assertEqual([2, 5, 9], [item["number"] for item in results])

    def test_submission_directory_lock_is_shared_only_within_one_package(self) -> None:
        self.assertIs(
            submission_dir_lock("submissions/alice/plan"),
            submission_dir_lock("submissions/alice/plan"),
        )
        self.assertIsNot(
            submission_dir_lock("submissions/alice/plan"),
            submission_dir_lock("submissions/alice/other"),
        )

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

    def test_pr_comments_reads_every_paginated_page(self) -> None:
        payload = [
            [{"id": 1, "body": "older"}],
            [{"id": 2, "body": "merge reservation"}],
        ]
        with patch("auto_review_queue.run") as mocked_run:
            mocked_run.return_value.stdout = json.dumps(payload)
            comments = pr_comments("open-city-ai/haidian", 999, ROOT)
        self.assertEqual([1, 2], [item["id"] for item in comments])
        mocked_run.assert_called_once_with(
            [
                "gh",
                "api",
                "--paginate",
                "--slurp",
                "repos/open-city-ai/haidian/issues/999/comments",
            ],
            cwd=ROOT,
        )

    def test_pr_reviews_reads_every_paginated_page(self) -> None:
        payload = [[{"id": 1}], [{"id": 2}]]
        with patch("auto_review_queue.run") as mocked_run:
            mocked_run.return_value.stdout = json.dumps(payload)
            reviews = pr_reviews("open-city-ai/haidian", 999, ROOT)
        self.assertEqual([1, 2], [item["id"] for item in reviews])

    def test_merged_reservation_is_reconciled_after_leaving_open_queue(self) -> None:
        head_sha = "a" * 40
        comments = [
            {
                "user": {"login": "CocoSgt"},
                "body": merge_reservation_body(head_sha),
            }
        ]
        approvals = [
            {
                "state": "APPROVED",
                "user": {"login": "CocoSgt"},
                "commit_id": head_sha,
                "body": REVIEW_MARKER.format(head_sha=head_sha),
            }
        ]
        with (
            patch("auto_review_queue.closed_queued_pull_numbers", return_value=[42]),
            patch(
                "auto_review_queue.pr_meta",
                return_value={"state": "MERGED", "headRefOid": head_sha},
            ),
            patch("auto_review_queue.pr_comments", return_value=comments),
            patch("auto_review_queue.pr_reviews", return_value=approvals),
            patch("auto_review_queue.mark_intake_accepted") as mark_mock,
        ):
            results = reconcile_merged_reservations(
                "open-city-ai/haidian",
                "review/queued",
                {"cocosgt"},
                ROOT,
                apply=True,
            )
        self.assertEqual("reconciled-merged", results[0]["result"])
        mark_mock.assert_called_once_with("open-city-ai/haidian", 42, ROOT)

        with (
            patch("auto_review_queue.closed_queued_pull_numbers", return_value=[42]),
            patch(
                "auto_review_queue.pr_meta",
                return_value={"state": "MERGED", "headRefOid": head_sha},
            ),
            patch("auto_review_queue.pr_comments", return_value=comments),
            patch("auto_review_queue.pr_reviews", return_value=[]),
            patch("auto_review_queue.mark_intake_accepted") as missing_mark,
        ):
            skipped = reconcile_merged_reservations(
                "open-city-ai/haidian",
                "review/queued",
                {"cocosgt"},
                ROOT,
                apply=True,
            )
        self.assertEqual([], skipped)
        missing_mark.assert_not_called()

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
