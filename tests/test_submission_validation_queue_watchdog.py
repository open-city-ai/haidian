import datetime as datetime_module
from unittest import mock
import sys
import unittest
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(REPO_ROOT / "scripts"))

from cleanup_submission_validation_runs import (  # noqa: E402
    ActionsClient,
    is_stuck_run,
    run_watchdog,
)


NOW = datetime_module.datetime(2026, 8, 10, 8, 0, tzinfo=datetime_module.timezone.utc)


def run(**overrides):
    value = {
        "id": 123,
        "event": "pull_request_target",
        "status": "in_progress",
        "run_started_at": None,
        "created_at": "2026-08-10T07:30:00Z",
        "head_sha": "stale-sha",
    }
    value.update(overrides)
    return value


class SubmissionValidationQueueWatchdogTests(unittest.TestCase):
    def test_workflow_filename_is_url_encoded_for_actions_api(self):
        client = ActionsClient("token", "open-city-ai/haidian")
        with mock.patch.object(client, "request", return_value={"workflow_runs": []}) as request:
            client.list_in_progress_runs(".github/workflows/submission-validation.yml")
        request.assert_called_once_with(
            "/repos/open-city-ai/haidian/actions/workflows/"
            ".github%2Fworkflows%2Fsubmission-validation.yml/runs?status=in_progress&per_page=100&page=1"
        )

    def test_old_startedless_run_without_jobs_is_stuck(self):
        self.assertTrue(
            is_stuck_run(run(), job_count=0, now=NOW, min_age_minutes=20)
        )

    def test_started_run_is_never_cancelled(self):
        self.assertFalse(
            is_stuck_run(
                run(run_started_at="2026-08-10T07:31:00Z"),
                job_count=0,
                now=NOW,
                min_age_minutes=20,
            )
        )

    def test_current_head_is_never_cancelled(self):
        self.assertFalse(
            is_stuck_run(
                run(),
                job_count=0,
                now=NOW,
                min_age_minutes=20,
                head_is_current=True,
            )
        )

    def test_stale_pending_run_is_cancel_candidate(self):
        self.assertTrue(
            is_stuck_run(
                run(status="pending"),
                job_count=0,
                now=NOW,
                min_age_minutes=20,
            )
        )

    def test_run_with_a_job_is_never_cancelled(self):
        self.assertFalse(
            is_stuck_run(run(), job_count=1, now=NOW, min_age_minutes=20)
        )

    def test_recent_run_is_left_for_github_to_start(self):
        self.assertFalse(
            is_stuck_run(
                run(created_at="2026-08-10T07:50:00Z"),
                job_count=0,
                now=NOW,
                min_age_minutes=20,
            )
        )

    def test_queued_or_other_event_is_not_a_zombie(self):
        self.assertFalse(
            is_stuck_run(
                run(status="queued"), job_count=0, now=NOW, min_age_minutes=20
            )
        )
        self.assertFalse(
            is_stuck_run(
                run(event="schedule"), job_count=0, now=NOW, min_age_minutes=20
            )
        )

    def test_open_head_listing_skips_drafts(self):
        client = ActionsClient("token", "open-city-ai/haidian")
        with mock.patch.object(
            client,
            "request",
            return_value=[
                {"draft": False, "head": {"sha": "open-sha"}},
                {"draft": True, "head": {"sha": "draft-sha"}},
            ],
        ) as request:
            self.assertEqual(client.list_open_pull_request_head_shas(), {"open-sha"})
        request.assert_called_once_with(
            "/repos/open-city-ai/haidian/pulls?state=open&per_page=100&page=1"
        )

    def test_watchdog_cancels_only_stale_head_without_jobs(self):
        client = mock.Mock(spec=ActionsClient)
        client.list_in_progress_runs.return_value = [
            run(id=1, status="in_progress", head_sha="old-sha")
        ]
        client.list_pending_runs.return_value = [
            run(id=2, status="pending", head_sha="current-sha"),
            run(id=3, status="pending", head_sha="old-sha"),
        ]
        client.list_open_pull_request_head_shas.return_value = {"current-sha"}
        client.job_count.return_value = 0
        with mock.patch("builtins.print"):
            run_watchdog(
                client,
                workflow=".github/workflows/submission-validation.yml",
                min_age_minutes=20,
                apply=True,
                now=NOW,
            )
        client.job_count.assert_called_once_with(1)
        self.assertEqual(client.cancel.call_args_list, [mock.call(1), mock.call(3)])


if __name__ == "__main__":
    unittest.main()
