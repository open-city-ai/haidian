#!/usr/bin/env python3
"""Release stale pre-job submission-validation runs.

GitHub Actions can keep a ``pending`` or ``in_progress`` run without creating
a job.  A stale run in that state can occupy the workflow's concurrency group
indefinitely.  This helper is deliberately conservative: it only considers
old ``pull_request_target`` runs for this workflow that have zero jobs and no
longer point at the current head of an open, non-draft PR.

The default mode is a dry run.  The scheduled maintainer workflow passes
``--apply`` after the age and no-job guards have been checked.

A run is considered stuck when all of these conditions hold:

- Its event is ``pull_request_target``.
- Its status is ``pending`` or ``in_progress`` without a started job.
- Its ``head_sha`` is not the current head of any open non-draft PR.
- It has zero jobs associated.
- It was created at least ``--min-age-minutes`` minutes ago (default: 20).

Usage
-----
Dry run (print stuck runs without canceling)::

    python3 scripts/cleanup_submission_validation_runs.py \\
        --repo open-city-ai/haidian

Actually cancel the stuck runs::

    python3 scripts/cleanup_submission_validation_runs.py \\
        --repo open-city-ai/haidian --apply

Use a non-default workflow::

    python3 scripts/cleanup_submission_validation_runs.py \\
        --repo open-city-ai/haidian \\
        --workflow .github/workflows/custom-validation.yml

Requires the ``GITHUB_TOKEN`` environment variable with
``actions:read`` and ``actions:write`` permissions.
"""

from __future__ import annotations

import argparse
import datetime as datetime_module
import json
import os
import sys
from typing import Any
from urllib.error import HTTPError, URLError
from urllib.parse import quote, urlencode
from urllib.request import Request, urlopen


API_ROOT = "https://api.github.com"
DEFAULT_WORKFLOW = ".github/workflows/submission-validation.yml"
DEFAULT_MIN_AGE_MINUTES = 20


def parse_timestamp(value: Any) -> datetime_module.datetime | None:
    if not isinstance(value, str) or not value:
        return None
    try:
        return datetime_module.datetime.fromisoformat(value.replace("Z", "+00:00"))
    except ValueError:
        return None


def is_stuck_run(
    run: dict[str, Any],
    *,
    job_count: int,
    now: datetime_module.datetime,
    min_age_minutes: int,
    head_is_current: bool = False,
) -> bool:
    """Return whether a stale pre-job run is safe to cancel."""

    if run.get("event") != "pull_request_target":
        return False
    status = run.get("status")
    if status not in {"pending", "in_progress"}:
        return False
    if status == "in_progress" and run.get("run_started_at") is not None:
        return False
    if head_is_current:
        return False
    if job_count != 0:
        return False
    if not isinstance(run.get("head_sha"), str) or not run.get("head_sha"):
        return False
    created_at = parse_timestamp(run.get("created_at"))
    if created_at is None:
        return False
    if now.tzinfo is None:
        now = now.replace(tzinfo=datetime_module.timezone.utc)
    age = now - created_at
    return age >= datetime_module.timedelta(minutes=min_age_minutes)


class ActionsClient:
    def __init__(self, token: str, repository: str) -> None:
        self.token = token
        self.repository = repository

    def request(self, path: str, *, method: str = "GET", timeout_seconds: int = 10) -> Any:
        request = Request(
            API_ROOT + path,
            data=b"" if method != "GET" else None,
            method=method,
            headers={
                "Accept": "application/vnd.github+json",
                "Authorization": f"Bearer {self.token}",
                "X-GitHub-Api-Version": "2022-11-28",
                "User-Agent": "haidian-submission-validation-watchdog",
            },
        )
        try:
            with urlopen(request, timeout=timeout_seconds) as response:
                payload = response.read().decode("utf-8")
        except (HTTPError, URLError, TimeoutError) as exc:
            raise RuntimeError(f"GitHub Actions API request failed: {exc}") from exc
        if not payload:
            return {}
        parsed = json.loads(payload)
        return parsed

    def list_runs(self, workflow: str, status: str) -> list[dict[str, Any]]:
        if status not in {"pending", "in_progress"}:
            raise ValueError("status must be pending or in_progress")
        workflow_ref = quote(workflow, safe="")
        runs: list[dict[str, Any]] = []
        for page in range(1, 11):
            query = urlencode({"status": status, "per_page": "100", "page": str(page)})
            path = f"/repos/{self.repository}/actions/workflows/{workflow_ref}/runs?{query}"
            payload = self.request(path)
            if not isinstance(payload, dict):
                raise RuntimeError("GitHub Actions API returned a non-object workflow response")
            page_runs = payload.get("workflow_runs", [])
            if not isinstance(page_runs, list):
                raise RuntimeError("GitHub Actions API returned invalid workflow_runs")
            runs.extend(item for item in page_runs if isinstance(item, dict))
            if len(page_runs) < 100:
                break
        return runs

    def list_in_progress_runs(self, workflow: str) -> list[dict[str, Any]]:
        return self.list_runs(workflow, "in_progress")

    def list_pending_runs(self, workflow: str) -> list[dict[str, Any]]:
        return self.list_runs(workflow, "pending")

    def list_open_pull_request_head_shas(self) -> set[str]:
        """Return heads that must not be canceled as stale."""
        heads: set[str] = set()
        for page in range(1, 11):
            query = urlencode({"state": "open", "per_page": "100", "page": str(page)})
            payload = self.request(f"/repos/{self.repository}/pulls?{query}")
            if not isinstance(payload, list):
                raise RuntimeError("GitHub API returned invalid pull request data")
            for pull_request in payload:
                if not isinstance(pull_request, dict) or pull_request.get("draft") is True:
                    continue
                head = pull_request.get("head")
                sha = head.get("sha") if isinstance(head, dict) else None
                if isinstance(sha, str) and sha:
                    heads.add(sha)
            if len(payload) < 100:
                break
        return heads

    def job_count(self, run_id: int) -> int:
        payload = self.request(
            f"/repos/{self.repository}/actions/runs/{run_id}/jobs?per_page=1",
            timeout_seconds=10,
        )
        count = payload.get("total_count")
        if not isinstance(count, int):
            raise RuntimeError(f"run {run_id} returned an invalid job count")
        return count

    def cancel(self, run_id: int) -> None:
        self.request(f"/repos/{self.repository}/actions/runs/{run_id}/cancel", method="POST")


def run_watchdog(
    client: ActionsClient,
    *,
    workflow: str,
    min_age_minutes: int,
    apply: bool,
    now: datetime_module.datetime | None = None,
) -> int:
    if min_age_minutes < 1:
        raise ValueError("min_age_minutes must be at least 1")
    now = now or datetime_module.datetime.now(datetime_module.timezone.utc)
    runs = client.list_in_progress_runs(workflow) + client.list_pending_runs(workflow)
    current_heads = client.list_open_pull_request_head_shas()
    candidates: list[dict[str, Any]] = []
    for run in runs:
        run_id = run.get("id")
        if not isinstance(run_id, int):
            continue
        head_is_current = run.get("head_sha") in current_heads
        if head_is_current:
            continue
        # A run reported as pending is still waiting at the workflow
        # concurrency boundary, so it has no started job to preserve.  Runs
        # reported as in_progress still need the explicit zero-job check.
        if run.get("status") == "pending":
            jobs = 0
        else:
            try:
                jobs = client.job_count(run_id)
            except RuntimeError as exc:
                print(f"skip run {run_id}: could not verify job count: {exc}")
                continue
        if is_stuck_run(
            run,
            job_count=jobs,
            now=now,
            min_age_minutes=min_age_minutes,
            head_is_current=head_is_current,
        ):
            candidates.append(run)

    for run in candidates:
        run_id = run["id"]
        message = (
            f"stuck pre-job run {run_id}: created_at={run.get('created_at')} "
            f"head_sha={run.get('head_sha')}"
        )
        if apply:
            client.cancel(run_id)
            print(f"cancelled {message}")
        else:
            print(f"dry-run {message}")
    print(
        json.dumps(
            {
                "workflow": workflow,
                "inspected_pre_job_runs": len(runs),
                "stuck_pre_job_runs": len(candidates),
                "current_open_non_draft_heads": len(current_heads),
                "applied": apply,
            },
            ensure_ascii=False,
            sort_keys=True,
        )
    )
    return 0


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(
        description=__doc__,
        formatter_class=argparse.RawDescriptionHelpFormatter,
    )
    parser.add_argument(
        "--repo",
        default=os.environ.get("GITHUB_REPOSITORY", ""),
        help="Repository in owner/name format (default: $GITHUB_REPOSITORY)",
    )
    parser.add_argument(
        "--workflow",
        default=DEFAULT_WORKFLOW,
        help=f"Workflow file path (default: {DEFAULT_WORKFLOW})",
    )
    parser.add_argument(
        "--min-age-minutes",
        type=int,
        default=DEFAULT_MIN_AGE_MINUTES,
        help=f"Minimum run age in minutes before considering it stuck (default: {DEFAULT_MIN_AGE_MINUTES})",
    )
    parser.add_argument(
        "--apply",
        action="store_true",
        help="Cancel the matched stuck runs; default is dry run (print only)",
    )
    args = parser.parse_args(argv)
    token = os.environ.get("GITHUB_TOKEN")
    if not token:
        parser.error("GITHUB_TOKEN is required")
    if not args.repo:
        parser.error("--repo or GITHUB_REPOSITORY is required")
    try:
        return run_watchdog(
            ActionsClient(token, args.repo),
            workflow=args.workflow,
            min_age_minutes=args.min_age_minutes,
            apply=args.apply,
        )
    except (RuntimeError, ValueError) as exc:
        print(str(exc), file=sys.stderr)
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
