#!/usr/bin/env python3
"""Process queued submission PRs from a trusted maintainer host.

This worker intentionally runs outside GitHub Actions. It never executes code from
the PR and only sends a package to AI after the required deterministic CI passes.

The worker polls open submission PRs, skips those that already have a review
comment matching the current head SHA, runs the four-gate self-check and AI
advisory review on each eligible package, and posts the result as a PR comment.
A concurrency lock prevents two worker instances from reviewing the same PR
simultaneously.

Security model
--------------
- Only processes PRs where the deterministic CI check has passed.
- Never executes contributor-supplied code; the review binary is the trusted
  worker host copy.
- Rate-limits AI API calls and retries on transient errors.
- Writes review artifacts to the gitignored .maintainer-review/ directory only.

Environment variables
---------------------
- ``GITHUB_TOKEN`` — required; needs ``pull-requests: write``,
  ``contents: write``, and ``issues: read`` permissions. GitHub Apps also
  need ``merge-queues: read`` when the base branch uses a merge queue.
- ``GITHUB_REPOSITORY`` — required; ``owner/repo`` format.
- ``OPENAI_API_KEY`` or ``AI_REVIEW_API_KEY`` — required for AI review.

Usage
-----
Run the review worker (typically called by a scheduled GitHub Action)::

    python3 scripts/auto_review_queue.py

Process a specific PR only::

    python3 scripts/auto_review_queue.py --pr-number 1234

Dry run without posting comments::

    python3 scripts/auto_review_queue.py --dry-run

Exit code is 0 when the queue processes without fatal errors and 1 otherwise.
"""
from __future__ import annotations

import argparse
from concurrent.futures import ThreadPoolExecutor, as_completed
from datetime import datetime, timezone
import json
import os
import re
import shutil
import subprocess
import sys
import threading
from dataclasses import dataclass
from pathlib import Path
from typing import Any

try:
    import fcntl
except ImportError:  # Windows has no fcntl; the worker lock uses msvcrt there.
    fcntl = None
    import msvcrt
else:
    msvcrt = None

from generate_submissions_data import package_sha256


REVIEW_MARKER = "<!-- haidian-auto-review:{head_sha} -->"
MERGE_PENDING_MARKER = "<!-- haidian-auto-review-merge-pending:{head_sha} -->"
CONFLICT_MARKER = "<!-- haidian-auto-review-conflict:{head_sha} -->"
SCORE_REVIEW_PATTERN = re.compile(
    r"<!-- haidian-auto-review:(?P<head>[0-9a-f]{40}) -->\s*"
    r"Maintainer intake decision: Review Agent score (?P<score>[0-9]+(?:\.[0-9]+)?)/100\."
)
DEFAULT_TRUSTED_REVIEWERS = frozenset({"cocosgt", "wakenmeng"})
TRUSTED_REVIEWERS_ENV = "HAIDIAN_TRUSTED_REVIEWERS"
GITHUB_LOGIN_PATTERN = re.compile(
    r"[a-z0-9](?:[a-z0-9-]{0,37}[a-z0-9])?(?:\[bot\])?"
)
TRUSTED_SCORE_LEDGER_PATH = Path("docs/trusted-score-high-water.json")
SCORE_GUARD_POLICY_SCHEMA_VERSION = 1
PASS = "SUCCESS"
WORKTREE_LOCK = threading.Lock()
GITHUB_WRITE_LOCK = threading.Lock()
HISTORY_LOCK = threading.Lock()
SUBMISSION_LOCKS_LOCK = threading.Lock()
SUBMISSION_LOCKS: dict[str, threading.Lock] = {}


class WorkerError(RuntimeError):
    pass


@dataclass(frozen=True)
class Decision:
    action: str
    score: float | None
    reason: str


@dataclass(frozen=True)
class ScoreGuardPolicy:
    """One explicit maintainer approval for score-high-water enforcement."""

    enabled: bool
    effective_at: datetime | None
    submission_dirs: frozenset[str]

    def applies_to(self, submission_dir: str) -> bool:
        return self.enabled and (
            "*" in self.submission_dirs or submission_dir in self.submission_dirs
        )


DISABLED_SCORE_GUARD_POLICY = ScoreGuardPolicy(False, None, frozenset())


def run(command: list[str], *, cwd: Path, capture: bool = True) -> subprocess.CompletedProcess[str]:
    completed = subprocess.run(
        command,
        cwd=cwd,
        text=True,
        capture_output=capture,
        encoding="utf-8",
        errors="replace",
        env={**os.environ, "PYTHONUTF8": "1", "PYTHONIOENCODING": "utf-8"},
        check=False,
    )
    if completed.returncode:
        stdout = completed.stdout or ""
        stderr = completed.stderr or ""
        detail = stderr.strip() or stdout.strip() or "command failed"
        raise WorkerError(f"{command[0]} failed: {detail}")
    return completed


def gh_json(repo: str, args: list[str], *, cwd: Path) -> Any:
    completed = run(["gh", *args, "--repo", repo], cwd=cwd)
    try:
        return json.loads(completed.stdout)
    except json.JSONDecodeError as exc:
        raise WorkerError(f"invalid JSON from gh {' '.join(args)}") from exc


def queued_prs(repo: str, label: str, cwd: Path) -> list[dict[str, Any]]:
    """Return queued PRs from object labels, without GitHub search indexing."""
    open_prs = gh_json(
        repo,
        [
            "pr",
            "list",
            "--state",
            "open",
            "--limit",
            "1000",
            "--json",
            "number,author,headRefOid,state,isDraft,mergeable,statusCheckRollup,labels",
        ],
        cwd=cwd,
    )
    return [
        item
        for item in open_prs
        if any(str(entry.get("name") or "") == label for entry in item.get("labels", []))
    ]


def closed_queued_pull_numbers(repo: str, label: str, cwd: Path) -> list[int]:
    """Read closed queued PRs from the paginated Issues endpoint, not search."""
    completed = run(
        [
            "gh",
            "api",
            "--method",
            "GET",
            "--paginate",
            "--slurp",
            f"repos/{repo}/issues",
            "-f",
            "state=closed",
            "-f",
            f"labels={label}",
            "-f",
            "per_page=100",
        ],
        cwd=cwd,
    )
    try:
        pages = json.loads(completed.stdout)
        return [
            int(item["number"])
            for page in pages
            for item in page
            if isinstance(item, dict) and item.get("pull_request")
        ]
    except (json.JSONDecodeError, KeyError, TypeError, ValueError) as exc:
        raise WorkerError("invalid closed queued PR list from GitHub") from exc


def pr_file_paths(repo: str, number: int, cwd: Path) -> list[str]:
    completed = run(
        ["gh", "api", "--paginate", "--slurp", f"repos/{repo}/pulls/{number}/files"],
        cwd=cwd,
    )
    try:
        pages = json.loads(completed.stdout)
        return [str(item["filename"]) for page in pages for item in page]
    except (json.JSONDecodeError, KeyError, TypeError) as exc:
        raise WorkerError(f"invalid file list from gh api for PR #{number}") from exc


def pr_comments(repo: str, number: int, cwd: Path) -> list[dict[str, Any]]:
    """Fetch every issue comment for a PR; pending markers must not be page-limited."""
    completed = run(
        [
            "gh",
            "api",
            "--paginate",
            "--slurp",
            f"repos/{repo}/issues/{number}/comments",
        ],
        cwd=cwd,
    )
    try:
        pages = json.loads(completed.stdout)
        return [item for page in pages for item in page]
    except (json.JSONDecodeError, TypeError) as exc:
        raise WorkerError(f"invalid comment list from gh api for PR #{number}") from exc


def pr_reviews(repo: str, number: int, cwd: Path) -> list[dict[str, Any]]:
    """Fetch every submitted review for exact-head approval reconciliation."""
    completed = run(
        [
            "gh",
            "api",
            "--paginate",
            "--slurp",
            f"repos/{repo}/pulls/{number}/reviews",
        ],
        cwd=cwd,
    )
    try:
        pages = json.loads(completed.stdout)
        return [item for page in pages for item in page]
    except (json.JSONDecodeError, TypeError) as exc:
        raise WorkerError(f"invalid review list from gh api for PR #{number}") from exc


def latest_validation_check(meta: dict[str, Any]) -> dict[str, Any] | None:
    checks = [
        (index, item)
        for index, item in enumerate(meta.get("statusCheckRollup", []))
        if item.get("name") == "submission-validation"
    ]
    if not checks:
        return None
    return max(
        checks,
        key=lambda pair: (
            str(pair[1].get("startedAt") or pair[1].get("completedAt") or ""),
            pair[0],
        ),
    )[1]


def ci_state(meta: dict[str, Any]) -> str:
    check = latest_validation_check(meta)
    if check is None or check.get("status") not in {None, "COMPLETED"}:
        return "pending"
    conclusion = str(check.get("conclusion") or "")
    if conclusion in {"FAILURE", "CANCELLED", "TIMED_OUT", "ACTION_REQUIRED"}:
        return "failure"
    if conclusion == PASS:
        return "success"
    return "pending"


def submission_dir_from_files(paths: list[str], author: str) -> str:
    roots: set[str] = set()
    prefix = f"submissions/{author.casefold()}/"
    for path in paths:
        parts = path.split("/")
        if len(parts) < 4 or "/".join(parts[:2]).casefold() + "/" != prefix:
            raise WorkerError(f"participant path outside submissions/{author}/: {path}")
        roots.add("/".join(parts[:3]))
    if len(roots) != 1:
        raise WorkerError(f"expected one submission directory, found {sorted(roots)}")
    return roots.pop()


def trusted_reviewer_logins() -> set[str]:
    """Return one validated full trusted-reviewer set.

    An absent environment variable selects the repository defaults. A present
    variable is an explicit full replacement; blank entries, duplicates and
    malformed GitHub logins fail closed instead of silently falling back.
    """
    raw = os.getenv(TRUSTED_REVIEWERS_ENV)
    if raw is None:
        return set(DEFAULT_TRUSTED_REVIEWERS)
    items = [item.strip().casefold() for item in raw.split(",")]
    if not items or any(not item for item in items):
        raise WorkerError(f"{TRUSTED_REVIEWERS_ENV} must be a non-empty full reviewer list")
    if len(set(items)) != len(items):
        raise WorkerError(f"{TRUSTED_REVIEWERS_ENV} contains duplicate reviewer logins")
    for item in items:
        if GITHUB_LOGIN_PATTERN.fullmatch(item) is None or "--" in item:
            raise WorkerError(f"{TRUSTED_REVIEWERS_ENV} contains invalid GitHub login: {item}")
    return set(items)


def validate_trusted_reviewer_identities(reviewers: set[str], cwd: Path) -> None:
    """Fail closed unless every configured reviewer resolves to that GitHub identity."""
    for reviewer in sorted(reviewers):
        completed = run(["gh", "api", f"users/{reviewer}"], cwd=cwd)
        try:
            identity = json.loads(completed.stdout)
        except json.JSONDecodeError as exc:
            raise WorkerError(f"invalid GitHub identity response for trusted reviewer {reviewer}") from exc
        if (
            str(identity.get("login", "")).casefold() != reviewer
            or identity.get("type") not in {"User", "Bot"}
            or not isinstance(identity.get("id"), int)
        ):
            raise WorkerError(f"trusted reviewer identity did not resolve exactly: {reviewer}")


def load_score_guard_policy(
    path: Path | None,
    trusted_reviewers: set[str],
    *,
    now: datetime | None = None,
) -> ScoreGuardPolicy:
    """Load an explicit, effective maintainer policy or leave the guard disabled.

    The repository intentionally carries no implicitly approved policy. A
    maintainer must provide a separate configuration that fixes the scope,
    effective date, migration status, compatibility decision, and rollback.
    """
    if path is None:
        return DISABLED_SCORE_GUARD_POLICY
    try:
        payload = json.loads(path.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as exc:
        raise WorkerError(f"invalid score guard policy: {path}") from exc
    if not isinstance(payload, dict) or payload.get("schema_version") != SCORE_GUARD_POLICY_SCHEMA_VERSION:
        raise WorkerError(f"unsupported score guard policy schema: {path}")
    if payload.get("status") != "approved":
        raise WorkerError("score guard policy status must be approved")
    if payload.get("history_scope") != "all-merged-history":
        raise WorkerError("score guard policy must explicitly select all-merged-history")
    if payload.get("ledger_migration") != "complete":
        raise WorkerError("score guard policy must confirm complete ledger migration")
    if payload.get("compatibility_decision") != "approved":
        raise WorkerError("score guard policy must record an approved compatibility decision")
    rollback_plan = payload.get("rollback_plan")
    if not isinstance(rollback_plan, str) or not rollback_plan.strip():
        raise WorkerError("score guard policy must include a rollback plan")

    raw_approvers = payload.get("approved_by")
    if not isinstance(raw_approvers, list) or not raw_approvers:
        raise WorkerError("score guard policy must name at least one trusted approver")
    approvers = [str(item).casefold() for item in raw_approvers]
    if len(set(approvers)) != len(approvers) or any(
        approver not in trusted_reviewers for approver in approvers
    ):
        raise WorkerError("score guard policy approvers must be unique trusted reviewers")

    raw_dirs = payload.get("submission_dirs")
    if not isinstance(raw_dirs, list) or not raw_dirs:
        raise WorkerError("score guard policy must define a non-empty submission scope")
    submission_dirs = [str(item) for item in raw_dirs]
    if len(set(submission_dirs)) != len(submission_dirs):
        raise WorkerError("score guard policy contains duplicate submission directories")
    if "*" in submission_dirs and len(submission_dirs) != 1:
        raise WorkerError("score guard wildcard scope cannot be combined with directories")
    for submission_dir in submission_dirs:
        if submission_dir == "*":
            continue
        if _submission_root_from_paths([f"{submission_dir}/manifest.json"]) != submission_dir:
            raise WorkerError(f"invalid score guard submission scope: {submission_dir}")

    raw_effective_at = payload.get("effective_at")
    if not isinstance(raw_effective_at, str) or not raw_effective_at.endswith("Z"):
        raise WorkerError("score guard effective_at must be an RFC3339 UTC timestamp")
    try:
        effective_at = datetime.fromisoformat(raw_effective_at[:-1] + "+00:00")
    except ValueError as exc:
        raise WorkerError("score guard effective_at must be an RFC3339 UTC timestamp") from exc
    current_time = now or datetime.now(timezone.utc)
    if effective_at > current_time:
        raise WorkerError("score guard policy is approved but not yet effective")
    return ScoreGuardPolicy(True, effective_at, frozenset(submission_dirs))


def submission_dir_lock(submission_dir: str) -> threading.Lock:
    """Return the process-local lock that serializes one package directory."""
    with SUBMISSION_LOCKS_LOCK:
        return SUBMISSION_LOCKS.setdefault(submission_dir, threading.Lock())


def load_trusted_score_ledger(
    repo_root: Path,
    trusted_reviewers: set[str] | None = None,
) -> list[dict[str, Any]]:
    """Load the maintainer-curated score ledger and fail closed on bad entries."""
    path = repo_root / TRUSTED_SCORE_LEDGER_PATH
    if not path.is_file():
        return []
    try:
        payload = json.loads(path.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as exc:
        raise WorkerError(f"invalid trusted score ledger: {path}") from exc
    if not isinstance(payload, dict) or payload.get("schema_version") != 1:
        raise WorkerError(f"unsupported trusted score ledger schema: {path}")
    entries = payload.get("entries")
    if not isinstance(entries, list):
        raise WorkerError(f"trusted score ledger entries must be a list: {path}")
    allowed = trusted_reviewers or trusted_reviewer_logins()
    normalized: list[dict[str, Any]] = []
    for index, item in enumerate(entries):
        if not isinstance(item, dict):
            raise WorkerError(f"trusted score ledger entry {index} is not an object")
        submission_dir = str(item.get("submission_dir", ""))
        score = item.get("score")
        head_sha = str(item.get("reviewed_head_sha", ""))
        reviewer = str(item.get("reviewer", "")).casefold()
        if (
            _submission_root_from_paths([f"{submission_dir}/manifest.json"]) != submission_dir
            or not re.fullmatch(r"[0-9a-f]{40}", head_sha)
            or not isinstance(score, (int, float))
            or isinstance(score, bool)
            or not 0 <= float(score) <= 100
            or reviewer not in allowed
        ):
            raise WorkerError(f"invalid trusted score ledger entry {index}: {submission_dir}")
        normalized.append(
            {
                "submission_dir": submission_dir,
                "score": float(score),
                "reviewed_head_sha": head_sha,
                "merged_pr": item.get("merged_pr"),
                "reviewer": reviewer,
            }
        )
    return normalized


def ledger_best_score(ledger: list[dict[str, Any]], submission_dir: str) -> float | None:
    scores = [
        float(item["score"])
        for item in ledger
        if str(item.get("submission_dir", "")) == submission_dir
    ]
    return max(scores) if scores else None


def official_score_from_review(
    review: dict[str, Any],
    head_sha: str,
    trusted_reviewers: set[str] | None = None,
) -> float | None:
    """Read only an approved exact-head score from an explicitly trusted reviewer."""
    if str(review.get("state", "")).upper() != "APPROVED":
        return None
    author = review.get("author") or review.get("user") or {}
    login = str(author.get("login", "")).casefold() if isinstance(author, dict) else ""
    if login not in (trusted_reviewers or trusted_reviewer_logins()):
        return None
    match = SCORE_REVIEW_PATTERN.search(str(review.get("body", "")))
    if match is None or match.group("head") != head_sha.casefold():
        return None
    return float(match.group("score"))


def _submission_root_from_paths(paths: list[str]) -> str | None:
    if not paths:
        return None
    if any(
        len(path.split("/")) < 4 or path.split("/")[0] != "submissions"
        for path in paths
    ):
        return None
    roots = {
        "/".join(path.split("/")[:3])
        for path in paths
    }
    return next(iter(roots)) if len(roots) == 1 else None


def _review_commit_sha(review: dict[str, Any]) -> str:
    """Return the commit reviewed by a GitHub REST or GraphQL review object."""
    commit_id = review.get("commit_id")
    if commit_id:
        return str(commit_id)
    commit = review.get("commit")
    if isinstance(commit, dict):
        return str(commit.get("oid", ""))
    return ""


def has_trusted_exact_head_approval(
    reviews: list[dict[str, Any]],
    head_sha: str,
    trusted_reviewers: set[str],
) -> bool:
    """Verify the exact reviewed commit, approval state, marker, and author."""
    marker = REVIEW_MARKER.format(head_sha=head_sha)
    for review in reviews:
        if str(review.get("state", "")).upper() != "APPROVED":
            continue
        author = review.get("author") or review.get("user") or {}
        login = str(author.get("login", "")).casefold() if isinstance(author, dict) else ""
        if (
            login in trusted_reviewers
            and _review_commit_sha(review).casefold() == head_sha.casefold()
            and str(review.get("body", "")).startswith(marker)
        ):
            return True
    return False


def trusted_score_records(
    merged_prs: list[dict[str, Any]],
    submission_dir: str,
    trusted_reviewers: set[str] | None = None,
) -> list[dict[str, Any]]:
    """Return trusted score/head pairs for one package directory."""
    records: list[dict[str, Any]] = []
    for pr in merged_prs:
        if _submission_root_from_paths([str(item.get("path", "")) for item in pr.get("files", [])]) != submission_dir:
            continue
        final_head_sha = str(pr.get("headRefOid", ""))
        for review in pr.get("reviews", []):
            # A merged PR can have several reviewed revisions. The final PR
            # head is not necessarily the revision that earned the score.
            review_sha = _review_commit_sha(review) or final_head_sha
            if not review_sha:
                continue
            score = official_score_from_review(review, review_sha, trusted_reviewers)
            if score is not None:
                records.append({"score": float(score), "head_sha": review_sha})
    return records


def ledger_score_records(
    ledger: list[dict[str, Any]], submission_dir: str
) -> list[dict[str, Any]]:
    """Normalize trusted ledger entries for snapshot-equivalence checks."""
    return [
        {"score": float(item["score"]), "head_sha": str(item["reviewed_head_sha"])}
        for item in ledger
        if str(item.get("submission_dir", "")) == submission_dir
    ]


def _package_tree_oid(
    commit: str,
    submission_dir: str,
    cwd: Path,
    *,
    fetch_missing: bool = False,
) -> str | None:
    """Resolve a package subtree, optionally hydrating one trusted exact commit."""
    command = ["git", "rev-parse", f"{commit}:{submission_dir}"]
    try:
        tree = run(command, cwd=cwd).stdout.strip()
    except WorkerError:
        if (
            not fetch_missing
            or not re.fullmatch(r"[0-9a-f]{40}", commit)
        ):
            return None
        try:
            # A shallow/blobless maintainer checkout may not contain a
            # non-final reviewed head even though it is a trusted record.
            with WORKTREE_LOCK:
                run(["git", "fetch", "--no-tags", "--quiet", "origin", commit], cwd=cwd)
                tree = run(command, cwd=cwd).stdout.strip()
        except WorkerError:
            return None
    return tree or None


def trusted_snapshot_score(
    repo_root: Path,
    candidate_worktree: Path,
    submission_dir: str,
    records: list[dict[str, Any]],
) -> float | None:
    """Return a trusted score when the candidate package tree is identical to it."""
    candidate_tree = _package_tree_oid("HEAD", submission_dir, candidate_worktree)
    if candidate_tree is None:
        return None
    matching_scores: list[float] = []
    for record in records:
        trusted_tree = _package_tree_oid(
            str(record["head_sha"]), submission_dir, repo_root, fetch_missing=True
        )
        if trusted_tree == candidate_tree:
            matching_scores.append(float(record["score"]))
    return max(matching_scores, default=None)


def historical_best_score(
    merged_prs: list[dict[str, Any]],
    submission_dir: str,
    trusted_reviewers: set[str] | None = None,
) -> float | None:
    """Return the highest trusted score for one package across merged PRs."""
    records = trusted_score_records(merged_prs, submission_dir, trusted_reviewers)
    return max((float(item["score"]) for item in records), default=None)


def merged_prs_for_author(repo: str, author: str, cwd: Path) -> list[dict[str, Any]]:
    """Fetch merged package PRs once per author for score-preservation checks."""
    return gh_json(
        repo,
        [
            "pr",
            "list",
            "--state",
            "merged",
            "--author",
            author,
            "--limit",
            "1000",
            "--json",
            "headRefOid,files,reviews",
        ],
        cwd=cwd,
    )


def score_guard_prs_for_author(repo: str, author: str, cwd: Path) -> list[dict[str, Any]]:
    """Fetch one snapshot containing merged history and open reservations."""
    return gh_json(
        repo,
        [
            "pr",
            "list",
            "--state",
            "all",
            "--author",
            author,
            "--limit",
            "1000",
            "--json",
            "number,state,headRefOid,files,reviews",
        ],
        cwd=cwd,
    )


def merge_reservation_body(head_sha: str) -> str:
    return (
        f"{MERGE_PENDING_MARKER.format(head_sha=head_sha)}\n"
        "Exact-head merge reservation: this package is fail-closed until GitHub confirms "
        "the PR as MERGED or a maintainer closes the PR."
    )


def has_trusted_merge_reservation(
    comments: list[dict[str, Any]],
    head_sha: str,
    trusted_reviewers: set[str],
) -> bool:
    """Verify a reservation by exact marker and its actual GitHub comment author."""
    expected = merge_reservation_body(head_sha)
    for comment in comments:
        author = comment.get("author") or comment.get("user") or {}
        login = str(author.get("login", "")).casefold() if isinstance(author, dict) else ""
        if login in trusted_reviewers and str(comment.get("body", "")) == expected:
            return True
    return False


def create_merge_reservation(
    repo: str,
    number: int,
    head_sha: str,
    trusted_reviewers: set[str],
    cwd: Path,
) -> None:
    """Create one reservation and verify the exact returned comment identity."""
    body = merge_reservation_body(head_sha)
    completed = run(
        [
            "gh",
            "api",
            "--method",
            "POST",
            f"repos/{repo}/issues/{number}/comments",
            "-f",
            f"body={body}",
        ],
        cwd=cwd,
    )
    try:
        comment = json.loads(completed.stdout)
    except json.JSONDecodeError as exc:
        raise WorkerError("invalid merge reservation creation response") from exc
    if not isinstance(comment, dict) or not isinstance(comment.get("id"), int):
        raise WorkerError("merge reservation creation did not return an exact comment")
    if not has_trusted_merge_reservation([comment], head_sha, trusted_reviewers):
        raise WorkerError("new merge reservation was not authored by a trusted reviewer")


def pending_trusted_intake_numbers(
    prs: list[dict[str, Any]],
    submission_dir: str,
    trusted_reviewers: set[str],
    repo: str,
    cwd: Path,
) -> set[int]:
    """Return open PR numbers carrying a trusted exact-head merge reservation."""
    pending: set[int] = set()
    for pr in prs:
        if str(pr.get("state", "")).upper() != "OPEN":
            continue
        number = int(pr.get("number") or 0)
        if number <= 0:
            continue
        paths = [str(item.get("path", "")) for item in pr.get("files", [])]
        if _submission_root_from_paths(paths) != submission_dir:
            continue
        head_sha = str(pr.get("headRefOid", "")).casefold()
        if not re.fullmatch(r"[0-9a-f]{40}", head_sha):
            continue
        if has_trusted_merge_reservation(
            pr_comments(repo, number, cwd),
            head_sha,
            trusted_reviewers,
        ):
            pending.add(number)
    return pending


def decide(
    review: dict[str, Any],
    decision: dict[str, Any],
    threshold: float,
    historical_best: float | None = None,
    restored_snapshot_score: float | None = None,
) -> Decision:
    mandatory = review.get("mandatory_rejection", {})
    if mandatory.get("result") != "pass":
        return Decision("request-changes", decision.get("weighted_score_100"), "mandatory rejection hit")
    gates = review.get("gate_checks", {})
    required = {
        "deterministic_validation",
        "spatial_review",
        "visual_review",
        "professional_evidence_review",
    }
    failed = sorted(name for name in required if gates.get(name, {}).get("status") != "pass")
    if failed:
        return Decision("request-changes", decision.get("weighted_score_100"), f"failed gates: {', '.join(failed)}")
    score = decision.get("weighted_score_100")
    if not isinstance(score, (int, float)):
        raise WorkerError("AI decision has no numeric weighted_score_100")
    if float(score) < threshold:
        return Decision("low-quality", float(score), f"score below {threshold:g}")
    intake_blocks = []
    if review.get("recommendation") != "formal-review-ready":
        intake_blocks.append("recommendation")
    if review.get("can_enter_formal_review") is not True:
        intake_blocks.append("can_enter_formal_review")
    if review.get("required_next_actions_zh") != []:
        intake_blocks.append("required_next_actions_zh")
    if intake_blocks:
        return Decision(
            "request-changes",
            float(score),
            f"intake blocked by review fields: {', '.join(intake_blocks)}",
        )
    if historical_best is not None and float(score) <= historical_best:
        if (
            restored_snapshot_score is not None
            and restored_snapshot_score >= historical_best
        ):
            return Decision(
                "restore-high-water",
                float(score),
                f"package tree exactly matches trusted retained snapshot {restored_snapshot_score:g}/100",
            )
        return Decision(
            "score-regression",
            float(score),
            f"score is not strictly above historical exact-head best {historical_best:g}",
        )
    return Decision(
        "accept",
        float(score),
        "threshold, gates, intake readiness, and score high-water passed",
    )


def pr_meta(repo: str, number: int, cwd: Path) -> dict[str, Any]:
    return gh_json(
        repo,
        [
            "pr",
            "view",
            str(number),
            "--json",
            "number,author,headRefOid,state,isDraft,mergeable,statusCheckRollup,labels",
        ],
        cwd=cwd,
    )


def assert_live(meta: dict[str, Any], expected_sha: str, *, require_success: bool) -> None:
    if meta.get("headRefOid") != expected_sha:
        raise WorkerError("PR head changed during review")
    if meta.get("state") != "OPEN" or meta.get("isDraft"):
        raise WorkerError("PR is no longer an open non-draft PR")
    if require_success and ci_state(meta) != "success":
        raise WorkerError("required CI is no longer successful")


def merge_request_snapshot(
    repo: str, number: int, head_sha: str, cwd: Path
) -> dict[str, Any]:
    """Return exact-head merge state and the PR node ID used by atomic mutations."""
    try:
        owner, name = repo.split("/", 1)
    except ValueError as exc:
        raise WorkerError(f"invalid repository name: {repo}") from exc
    query = """
query($owner:String!,$name:String!,$number:Int!){
  repository(owner:$owner,name:$name){
    pullRequest(number:$number){
      id
      state
      headRefOid
      isMergeQueueEnabled
      autoMergeRequest{enabledAt}
      mergeQueueEntry{state headCommit{oid}}
    }
  }
}
""".strip()
    completed = run(
        [
            "gh",
            "api",
            "graphql",
            "-f",
            f"query={query}",
            "-F",
            f"owner={owner}",
            "-F",
            f"name={name}",
            "-F",
            f"number={number}",
        ],
        cwd=cwd,
    )
    try:
        pull = json.loads(completed.stdout)["data"]["repository"]["pullRequest"]
    except (json.JSONDecodeError, KeyError, TypeError) as exc:
        raise WorkerError(f"invalid merge state response for PR #{number}") from exc
    if not isinstance(pull, dict):
        raise WorkerError(f"missing merge state for PR #{number}")
    if str(pull.get("headRefOid", "")) != head_sha:
        raise WorkerError("PR head changed while reconciling merge request")
    if not str(pull.get("id", "")):
        raise WorkerError(f"missing GraphQL node ID for PR #{number}")
    return pull


def merge_request_status(repo: str, number: int, head_sha: str, cwd: Path) -> str:
    """Return merged, pending, auto, absent, or closed from GitHub's state."""
    pull = merge_request_snapshot(repo, number, head_sha, cwd)
    state = str(pull.get("state", "")).upper()
    if state == "MERGED":
        return "merged"
    if state != "OPEN":
        return "closed"
    queue_entry = pull.get("mergeQueueEntry")
    if isinstance(queue_entry, dict):
        # mergeQueueEntry.headCommit is GitHub's synthetic queue/merge-group
        # commit. Exact-head binding comes from pullRequest.headRefOid above.
        return "pending"
    if pull.get("autoMergeRequest") is not None:
        # AutoMergeRequest has no expected-head field and can survive pushes by
        # write-capable users. It is not a durable exact-head reservation.
        return "auto"
    return "absent"


def disable_auto_merge(repo: str, number: int, cwd: Path) -> None:
    run(
        ["gh", "pr", "merge", str(number), "--repo", repo, "--disable-auto"],
        cwd=cwd,
    )


def submit_merge_request(
    repo: str,
    number: int,
    head_sha: str,
    cwd: Path,
    *,
    admin_merge: bool,
) -> str:
    """Atomically enqueue or merge the exact head without ever enabling auto-merge."""
    live = pr_meta(repo, number, cwd)
    assert_live(live, head_sha, require_success=True)
    pull = merge_request_snapshot(repo, number, head_sha, cwd)
    if str(pull.get("state", "")).upper() != "OPEN":
        raise WorkerError("PR is no longer open before merge submission")
    pull_id = str(pull["id"])

    if bool(pull.get("isMergeQueueEnabled")) and not admin_merge:
        mutation = """
mutation($pullRequestId:ID!,$expectedHeadOid:GitObjectID!){
  enqueuePullRequest(input:{pullRequestId:$pullRequestId,expectedHeadOid:$expectedHeadOid}){
    mergeQueueEntry{id state}
  }
}
""".strip()
        operation = "enqueuePullRequest"
    else:
        mutation = """
mutation($pullRequestId:ID!,$expectedHeadOid:GitObjectID!){
  mergePullRequest(input:{pullRequestId:$pullRequestId,expectedHeadOid:$expectedHeadOid,mergeMethod:MERGE}){
    pullRequest{state headRefOid}
  }
}
""".strip()
        operation = "mergePullRequest"

    completed = run(
        [
            "gh",
            "api",
            "graphql",
            "-f",
            f"query={mutation}",
            "-F",
            f"pullRequestId={pull_id}",
            "-F",
            f"expectedHeadOid={head_sha}",
        ],
        cwd=cwd,
    )
    try:
        result = json.loads(completed.stdout)["data"][operation]
    except (json.JSONDecodeError, KeyError, TypeError) as exc:
        raise WorkerError(f"invalid {operation} response for PR #{number}") from exc

    if operation == "enqueuePullRequest":
        if not isinstance(result, dict) or not isinstance(
            result.get("mergeQueueEntry"), dict
        ):
            raise WorkerError(f"GitHub did not confirm queue entry for PR #{number}")
        return "pending"

    merged_pull = result.get("pullRequest") if isinstance(result, dict) else None
    if (
        not isinstance(merged_pull, dict)
        or str(merged_pull.get("headRefOid", "")) != head_sha
        or str(merged_pull.get("state", "")).upper() != "MERGED"
    ):
        raise WorkerError(f"GitHub did not confirm exact-head merge for PR #{number}")
    return "merged"


def label_args(remove: list[str], add: list[str]) -> list[str]:
    args: list[str] = []
    for label in remove:
        args.extend(["--remove-label", label])
    for label in add:
        args.extend(["--add-label", label])
    return args


def mark_intake_accepted(repo: str, number: int, cwd: Path) -> None:
    run(
        [
            "gh",
            "pr",
            "edit",
            str(number),
            "--repo",
            repo,
            *label_args(["review/queued"], ["review/intake-accepted"]),
        ],
        cwd=cwd,
    )


def reconcile_merged_reservations(
    repo: str,
    label: str,
    trusted_reviewers: set[str],
    cwd: Path,
    *,
    apply: bool,
) -> list[dict[str, Any]]:
    """Finalize labels for queue reservations that merged between worker runs."""
    results: list[dict[str, Any]] = []
    for number in closed_queued_pull_numbers(repo, label, cwd):
        meta = pr_meta(repo, number, cwd)
        if str(meta.get("state", "")).upper() != "MERGED":
            continue
        head_sha = str(meta.get("headRefOid", ""))
        if not re.fullmatch(r"[0-9a-f]{40}", head_sha):
            raise WorkerError(f"merged reserved PR #{number} has no exact head")
        if not has_trusted_merge_reservation(
            pr_comments(repo, number, cwd), head_sha, trusted_reviewers
        ):
            continue
        if not has_trusted_exact_head_approval(
            pr_reviews(repo, number, cwd), head_sha, trusted_reviewers
        ):
            continue
        if apply:
            mark_intake_accepted(repo, number, cwd)
        results.append(
            {
                "number": number,
                "head_sha": head_sha,
                "result": "reconciled-merged" if apply else "would-reconcile-merged",
            }
        )
    return results


def apply_conflict_hold(repo: str, number: int, head_sha: str, cwd: Path) -> None:
    live = pr_meta(repo, number, cwd)
    assert_live(live, head_sha, require_success=True)
    if live.get("mergeable") != "CONFLICTING":
        raise WorkerError("PR is no longer conflicting")
    body = (
        f"{CONFLICT_MARKER.format(head_sha=head_sha)}\n"
        f"Exact head `{head_sha}` passed required CI but cannot enter paid review because it does not merge "
        "cleanly with the current base branch. Please update/rebase the branch and let trusted validation "
        "finish on the new head; the new exact head will then be queued again. No paid AI review was called."
    )
    run(["gh", "pr", "comment", str(number), "--repo", repo, "--body", body], cwd=cwd)
    run(
        [
            "gh",
            "pr",
            "edit",
            str(number),
            "--repo",
            repo,
            *label_args(["review/queued"], ["review/changes-requested"]),
        ],
        cwd=cwd,
    )


def load_cached_review(
    audit_dir: Path,
    submission_dir: str,
    checkout_root: Path,
    threshold: float,
    historical_best: float | None = None,
    restored_snapshot_score: float | None = None,
) -> tuple[dict[str, Any], dict[str, Any], Decision] | None:
    try:
        review = json.loads((audit_dir / "ai-review.json").read_text(encoding="utf-8"))
        decision = json.loads((audit_dir / "ai-decision.json").read_text(encoding="utf-8"))
        comment = (audit_dir / "pr-comment.md").read_text(encoding="utf-8")
    except (OSError, json.JSONDecodeError):
        return None
    if not comment.strip():
        return None
    if review.get("submission_dir") != submission_dir or decision.get("submission_dir") != submission_dir:
        return None
    if decision.get("dry_run") is not False or decision.get("model_output_schema_valid") is not True:
        return None
    try:
        expected_hash = package_sha256(checkout_root / submission_dir)
    except SystemExit:
        return None
    if decision.get("reviewed_package_sha256") != expected_hash:
        return None
    try:
        outcome = decide(
            review,
            decision,
            threshold,
            historical_best,
            restored_snapshot_score,
        )
    except WorkerError:
        return None
    return review, decision, outcome


def apply_review(
    repo: str,
    number: int,
    head_sha: str,
    outcome: Decision,
    comment_file: Path,
    cwd: Path,
    *,
    admin_merge: bool,
    historical_best: float | None = None,
    restored_snapshot_score: float | None = None,
    trusted_reviewers: set[str] | None = None,
) -> bool:
    live = pr_meta(repo, number, cwd)
    assert_live(live, head_sha, require_success=True)
    marker = REVIEW_MARKER.format(head_sha=head_sha)
    if outcome.action in {"accept", "restore-high-water"}:
        if live.get("mergeable") == "CONFLICTING":
            raise WorkerError("PR became conflicting before merge")
        if outcome.action == "restore-high-water":
            if restored_snapshot_score is None:
                raise WorkerError("restoration decision has no trusted snapshot score")
            body = (
                f"{marker}\nScore-preservation restoration: the candidate package tree exactly matches "
                f"a trusted retained snapshot at {restored_snapshot_score:g}/100. The candidate Review Agent "
                f"score was {outcome.score:g}/100, but this rollback does not replace the trusted package score. "
                "Mandatory rejection, all four local gates, and review readiness passed; "
                "accepted for repository intake only, "
                "not gallery publication, award selection, implementation approval, or government endorsement."
            )
        else:
            body = (
                f"{marker}\nMaintainer intake decision: Review Agent score {outcome.score:g}/100. "
                "Mandatory rejection, all four local gates, and review readiness passed. "
                "Accepted for repository intake only; "
                "this is not gallery publication, award selection, implementation approval, or government endorsement."
            )
            if historical_best is not None:
                body += f" Historical exact-head best for this submission: {historical_best:g}/100; this score does not regress it."
        allowed = trusted_reviewers or trusted_reviewer_logins()
        if not has_trusted_merge_reservation(
            pr_comments(repo, number, cwd), head_sha, allowed
        ):
            create_merge_reservation(repo, number, head_sha, allowed, cwd)

        # A pre-existing auto-merge request could consume the approval below
        # immediately. Remove that unsafe, non-exact-head state before approval
        # and prove it is gone. Disabling it is safe even if another actor races
        # a head update; the exact-head reread then fails closed.
        merge_status = merge_request_status(repo, number, head_sha, cwd)
        if merge_status == "auto":
            disable_auto_merge(repo, number, cwd)
            merge_status = merge_request_status(repo, number, head_sha, cwd)
            if merge_status == "auto":
                raise WorkerError(
                    "pre-existing auto-merge remained enabled; disabled fail closed"
                )
        if merge_status == "closed":
            raise WorkerError("PR closed before exact-head approval")

        if not has_trusted_exact_head_approval(
            pr_reviews(repo, number, cwd), head_sha, allowed
        ):
            if merge_status == "merged":
                raise WorkerError("PR merged without a trusted exact-head approval")
            run(
                ["gh", "pr", "review", str(number), "--repo", repo, "--approve", "--body", body],
                cwd=cwd,
            )
            if not has_trusted_exact_head_approval(
                pr_reviews(repo, number, cwd), head_sha, allowed
            ):
                raise WorkerError("exact-head approval was not written by a trusted reviewer")

        # Approval may immediately advance an existing exact-head queue entry,
        # so reconcile again before deciding whether an atomic request is needed.
        merge_status = merge_request_status(repo, number, head_sha, cwd)
        if merge_status == "auto":
            disable_auto_merge(repo, number, cwd)
            raise WorkerError(
                "auto-merge appeared after approval; disabled fail closed"
            )
        if merge_status == "absent":
            merge_status = submit_merge_request(
                repo,
                number,
                head_sha,
                cwd,
                admin_merge=admin_merge,
            )
        if merge_status == "pending":
            return False
        if merge_status != "merged":
            raise WorkerError("merge command completed without a confirmed merged PR")
        mark_intake_accepted(repo, number, cwd)
        return True

    body = comment_file.read_text(encoding="utf-8")
    if outcome.action == "score-regression" and historical_best is not None:
        body = (
            f"{marker}\nScore-preservation hold: Review Agent score {outcome.score:g}/100 does not strictly exceed the "
            f"historical exact-head best {historical_best:g}/100 for this submission, and the package tree is not "
            "an exact trusted snapshot restoration. Do not merge this PR; "
            "keep the higher-scoring merged version as the public recovery target.\n\n"
            + body
        )
    else:
        body = f"{marker}\n{body}"
    run(["gh", "pr", "review", str(number), "--repo", repo, "--request-changes", "--body", body], cwd=cwd)
    add = ["review/changes-requested"]
    if outcome.action == "low-quality":
        add.append("review/low-quality")
    run(
        ["gh", "pr", "edit", str(number), "--repo", repo, *label_args(["review/queued"], add)],
        cwd=cwd,
    )
    return True


def score_guard_context(
    repo_root: Path,
    candidate_worktree: Path,
    submission_dir: str,
    merged_prs: list[dict[str, Any]],
    score_ledger: list[dict[str, Any]],
    trusted_reviewers: set[str],
    score_guard_policy: ScoreGuardPolicy,
) -> tuple[float | None, float | None]:
    """Recompute the package high-water and exact-snapshot restoration score."""
    if not score_guard_policy.applies_to(submission_dir):
        return None, None
    live_best = historical_best_score(merged_prs, submission_dir, trusted_reviewers)
    ledger_best = ledger_best_score(score_ledger, submission_dir)
    trusted_records = trusted_score_records(
        merged_prs, submission_dir, trusted_reviewers
    ) + ledger_score_records(score_ledger, submission_dir)
    historical_best = max(
        [score for score in (live_best, ledger_best) if score is not None],
        default=None,
    )
    restored_snapshot_score = trusted_snapshot_score(
        repo_root, candidate_worktree, submission_dir, trusted_records
    )
    return historical_best, restored_snapshot_score


def apply_review_with_fresh_score_context(
    args: argparse.Namespace,
    number: int,
    head_sha: str,
    author: str,
    submission_dir: str,
    worktree: Path,
    review: dict[str, Any],
    ai_decision: dict[str, Any],
    comment_file: Path,
    repo_root: Path,
    history_cache: dict[str, list[dict[str, Any]]],
    score_ledger: list[dict[str, Any]],
    trusted_reviewers: set[str],
    score_guard_policy: ScoreGuardPolicy,
) -> tuple[Decision, float | None, float | None]:
    """Refresh history and candidate tree under the actual GitHub write lock."""
    with GITHUB_WRITE_LOCK:
        guard_prs = score_guard_prs_for_author(args.repo, author, repo_root)
        pending_numbers = pending_trusted_intake_numbers(
            guard_prs,
            submission_dir,
            trusted_reviewers,
            args.repo,
            repo_root,
        )
        other_pending = pending_numbers - {number}
        if other_pending:
            pending_list = ", ".join(f"#{item}" for item in sorted(other_pending))
            raise WorkerError(
                f"another exact-head merge reservation for {submission_dir} is still open "
                f"({pending_list}); wait for MERGED or close it before reviewing this candidate"
            )
        if score_guard_policy.applies_to(submission_dir):
            merged_prs = [
                pr for pr in guard_prs if str(pr.get("state", "")).upper() == "MERGED"
            ]
        else:
            merged_prs = []
        historical_best, restored_snapshot_score = score_guard_context(
            repo_root,
            worktree,
            submission_dir,
            merged_prs,
            score_ledger,
            trusted_reviewers,
            score_guard_policy,
        )
        outcome = decide(
            review,
            ai_decision,
            args.threshold,
            historical_best,
            restored_snapshot_score,
        )
        merged_or_written = apply_review(
            args.repo,
            number,
            head_sha,
            outcome,
            comment_file,
            repo_root,
            admin_merge=args.admin_merge,
            historical_best=historical_best,
            restored_snapshot_score=restored_snapshot_score,
            trusted_reviewers=trusted_reviewers,
        )
        if outcome.action in {"accept", "restore-high-water"} and not merged_or_written:
            outcome = Decision(
                "merge-pending",
                outcome.score,
                "exact-head approval is waiting for GitHub to confirm MERGED",
            )
        # The accepted path may just have merged a new score. Never let the
        # next candidate reuse the pre-write author history snapshot.
        with HISTORY_LOCK:
            history_cache.pop(author, None)
    return outcome, historical_best, restored_snapshot_score


def _process_submission_pr(
    args: argparse.Namespace,
    number: int,
    head_sha: str,
    author: str,
    submission_dir: str,
    repo_root: Path,
    history_cache: dict[str, list[dict[str, Any]]],
    score_ledger: list[dict[str, Any]],
    trusted_reviewers: set[str],
    score_guard_policy: ScoreGuardPolicy,
) -> dict[str, Any]:
    worktree = args.worktree_root / f"pr-{number}-{head_sha[:12]}"
    audit_dir = args.audit_root / f"pr-{number}" / head_sha
    ref = f"refs/codex-auto-review/pr-{number}-{head_sha[:12]}"
    with WORKTREE_LOCK:
        if worktree.exists():
            run(["git", "worktree", "remove", "--force", str(worktree)], cwd=repo_root)
        run(["git", "fetch", "--force", "origin", f"pull/{number}/head:{ref}"], cwd=repo_root)
        run(["git", "worktree", "add", "--detach", str(worktree), ref], cwd=repo_root)
    try:
        checked = run(["git", "rev-parse", "HEAD"], cwd=worktree).stdout.strip()
        if checked != head_sha:
            raise WorkerError("fetched worktree SHA does not match live PR head")
        if score_guard_policy.applies_to(submission_dir):
            with HISTORY_LOCK:
                if author not in history_cache:
                    history_cache[author] = merged_prs_for_author(args.repo, author, repo_root)
                merged_prs = history_cache[author]
        else:
            merged_prs = []
        historical_best, restored_snapshot_score = score_guard_context(
            repo_root,
            worktree,
            submission_dir,
            merged_prs,
            score_ledger,
            trusted_reviewers,
            score_guard_policy,
        )
        cached = load_cached_review(
            audit_dir,
            submission_dir,
            worktree,
            args.threshold,
            historical_best,
            restored_snapshot_score,
        )
        if cached is None:
            command = [
                sys.executable,
                str(repo_root / "scripts" / "ai_review_submission.py"),
                submission_dir,
                "--repo-root",
                str(worktree),
                "--pr-author",
                author,
                "--out",
                str(audit_dir),
                "--model",
                args.model,
                "--reasoning-effort",
                args.reasoning_effort,
                "--timeout",
                str(args.timeout),
                "--retries",
                str(args.retries),
                "--max-images",
                str(args.max_images),
                "--comment",
                "--json",
            ]
            run(command, cwd=worktree)
            review = json.loads((audit_dir / "ai-review.json").read_text(encoding="utf-8"))
            ai_decision = json.loads((audit_dir / "ai-decision.json").read_text(encoding="utf-8"))
            outcome = decide(
                review,
                ai_decision,
                args.threshold,
                historical_best,
                restored_snapshot_score,
            )
            reused_audit = False
        else:
            review, ai_decision, outcome = cached
            reused_audit = True
        result = {
            "number": number,
            "head_sha": head_sha,
            "submission_dir": submission_dir,
            "score": outcome.score,
            "result": outcome.action,
            "reason": outcome.reason,
            "historical_best_score": historical_best,
            "restored_snapshot_score": restored_snapshot_score,
            "package_sha256": ai_decision.get("reviewed_package_sha256"),
            "reused_audit": reused_audit,
        }
        if args.apply:
            outcome, historical_best, restored_snapshot_score = apply_review_with_fresh_score_context(
                args,
                number,
                head_sha,
                author,
                submission_dir,
                worktree,
                review,
                ai_decision,
                audit_dir / "pr-comment.md",
                repo_root,
                history_cache,
                score_ledger,
                trusted_reviewers,
                score_guard_policy,
            )
            result.update(
                {
                    "score": outcome.score,
                    "result": outcome.action,
                    "reason": outcome.reason,
                    "historical_best_score": historical_best,
                    "restored_snapshot_score": restored_snapshot_score,
                }
            )
            result["applied"] = True
        return result
    finally:
        if worktree.exists() and not args.keep_worktrees:
            with WORKTREE_LOCK:
                run(["git", "worktree", "remove", "--force", str(worktree)], cwd=repo_root)


def process_pr(
    args: argparse.Namespace,
    meta: dict[str, Any],
    repo_root: Path,
    history_cache: dict[str, list[dict[str, Any]]],
    score_ledger: list[dict[str, Any]],
    trusted_reviewers: set[str],
    score_guard_policy: ScoreGuardPolicy,
) -> dict[str, Any]:
    number = int(meta["number"])
    head_sha = str(meta["headRefOid"])
    author = str(meta["author"]["login"])
    state = ci_state(meta)
    if meta.get("isDraft"):
        return {"number": number, "result": "skipped-draft"}
    if state != "success":
        return {"number": number, "head_sha": head_sha, "result": f"skipped-ci-{state}"}
    if meta.get("mergeable") == "CONFLICTING":
        return {"number": number, "head_sha": head_sha, "result": "skipped-conflicting"}

    submission_dir = str(meta.get("_submission_dir") or "")
    if not submission_dir:
        submission_dir = submission_dir_from_files(
            pr_file_paths(args.repo, number, repo_root), author
        )
    with submission_dir_lock(submission_dir):
        return _process_submission_pr(
            args,
            number,
            head_sha,
            author,
            submission_dir,
            repo_root,
            history_cache,
            score_ledger,
            trusted_reviewers,
            score_guard_policy,
        )


def process_submission_group(
    args: argparse.Namespace,
    metas: list[dict[str, Any]],
    repo_root: Path,
    history_cache: dict[str, list[dict[str, Any]]],
    score_ledger: list[dict[str, Any]],
    trusted_reviewers: set[str],
    score_guard_policy: ScoreGuardPolicy,
) -> list[dict[str, Any]]:
    """Process one package directory in deterministic PR-number order."""
    results: list[dict[str, Any]] = []
    for meta in sorted(metas, key=lambda item: int(item["number"])):
        try:
            results.append(
                process_pr(
                    args,
                    meta,
                    repo_root,
                    history_cache,
                    score_ledger,
                    trusted_reviewers,
                    score_guard_policy,
                )
            )
        except Exception as exc:
            results.append(
                {"number": meta.get("number"), "result": "error", "error": str(exc)}
            )
    return results


def acquire_worker_lock(lock_path: Path) -> Any:
    """Hold a non-blocking inter-process lock on the worker lock file.

    The lock is released when the file object is closed or the process
    exits, matching the previous flock lifetime. Raises WorkerError when
    another live worker already holds the lock.
    """
    lock_file = lock_path.open("a+", encoding="utf-8")
    if fcntl is not None:
        try:
            fcntl.flock(lock_file.fileno(), fcntl.LOCK_EX | fcntl.LOCK_NB)
        except BlockingIOError as exc:
            lock_file.close()
            raise WorkerError("another auto-review worker is already running") from exc
        return lock_file
    # Windows fallback: lock one byte at the start of the file. The byte is
    # written only when the file is still empty; touching a byte range held
    # by another worker fails, and any such OSError means contention.
    try:
        lock_file.seek(0, os.SEEK_END)
        if lock_file.tell() == 0:
            lock_file.write("0")
            lock_file.flush()
        lock_file.seek(0)
        msvcrt.locking(lock_file.fileno(), msvcrt.LK_NBLCK, 1)
    except OSError as exc:
        lock_file.close()
        raise WorkerError("another auto-review worker is already running") from exc
    return lock_file


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--repo", default="open-city-ai/haidian")
    parser.add_argument("--label", default="review/queued")
    parser.add_argument("--limit", type=int, default=10)
    parser.add_argument("--concurrency", type=int, default=3)
    parser.add_argument("--threshold", type=float, default=60.0)
    parser.add_argument("--model", default=os.getenv("HAIDIAN_REVIEW_MODEL", "gpt-5.6-sol"))
    parser.add_argument("--reasoning-effort", default="high")
    parser.add_argument("--timeout", type=int, default=900)
    parser.add_argument("--retries", type=int, default=2)
    # Keep the queue default aligned with ai_review_submission's paired
    # bilingual packet: five figure pairs, two PDF first-page pairs, and two
    # HTML screenshot pairs (18 images total when all v2 counterparts exist).
    parser.add_argument("--max-images", type=int, default=18)
    parser.add_argument("--audit-root", type=Path, default=Path(".maintainer-review/queue"))
    parser.add_argument("--worktree-root", type=Path, default=Path(".pr-worktree/auto-review"))
    parser.add_argument("--apply", action="store_true", help="Post reviews, change labels, and merge accepted PRs")
    parser.add_argument("--admin-merge", action="store_true", help="Use the repository ruleset bypass during merge")
    parser.add_argument(
        "--score-guard-policy-file",
        type=Path,
        help=(
            "Enable score-high-water enforcement using an explicit maintainer-approved "
            "scope/effective-date policy; disabled when omitted"
        ),
    )
    parser.add_argument("--keep-worktrees", action="store_true")
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    repo_root = Path(__file__).resolve().parents[1]
    args.audit_root = args.audit_root.expanduser()
    args.worktree_root = args.worktree_root.expanduser()
    if not args.audit_root.is_absolute():
        args.audit_root = repo_root / args.audit_root
    if not args.worktree_root.is_absolute():
        args.worktree_root = repo_root / args.worktree_root
    args.audit_root = args.audit_root.resolve()
    args.worktree_root = args.worktree_root.resolve()
    if args.apply and not os.getenv("OPENAI_API_KEY"):
        raise WorkerError("OPENAI_API_KEY is required with --apply")
    if args.concurrency < 1:
        raise WorkerError("--concurrency must be at least 1")
    args.audit_root.mkdir(parents=True, exist_ok=True)
    lock_file = acquire_worker_lock(args.audit_root / ".worker.lock")
    selected = []
    results = []
    history_cache: dict[str, list[dict[str, Any]]] = {}
    trusted_reviewers = trusted_reviewer_logins()
    validate_trusted_reviewer_identities(trusted_reviewers, repo_root)
    if args.score_guard_policy_file is not None:
        policy_path = args.score_guard_policy_file.expanduser().resolve()
        score_guard_policy = load_score_guard_policy(policy_path, trusted_reviewers)
        score_ledger = load_trusted_score_ledger(repo_root, trusted_reviewers)
    else:
        score_guard_policy = DISABLED_SCORE_GUARD_POLICY
        score_ledger = []
    results.extend(
        reconcile_merged_reservations(
            args.repo,
            args.label,
            trusted_reviewers,
            repo_root,
            apply=args.apply,
        )
    )
    candidates = queued_prs(args.repo, args.label, repo_root)
    for candidate in sorted(candidates, key=lambda item: int(item["number"])):
        if len(selected) >= args.limit:
            break
        number = int(candidate["number"])
        try:
            live = pr_meta(args.repo, number, repo_root)
        except Exception as exc:
            results.append({"number": number, "result": "error", "error": str(exc)})
            continue
        state = ci_state(live)
        if live.get("isDraft") or live.get("state") != "OPEN" or state != "success":
            results.append({"number": number, "head_sha": live.get("headRefOid"), "result": f"skipped-ci-{state}"})
            continue
        if live.get("mergeable") == "CONFLICTING":
            try:
                if args.apply:
                    apply_conflict_hold(args.repo, number, str(live["headRefOid"]), repo_root)
            except Exception as exc:
                results.append({"number": number, "result": "error", "error": str(exc)})
                continue
            results.append(
                {
                    "number": number,
                    "head_sha": live.get("headRefOid"),
                    "result": "changes-requested-conflict" if args.apply else "skipped-conflicting",
                }
            )
            continue
        try:
            submission_dir = submission_dir_from_files(
                pr_file_paths(args.repo, number, repo_root),
                str(live["author"]["login"]),
            )
        except Exception as exc:
            results.append({"number": number, "result": "error", "error": str(exc)})
            continue
        live = {**live, "_submission_dir": submission_dir}
        selected.append(live)
    groups: dict[str, list[dict[str, Any]]] = {}
    for meta in selected:
        groups.setdefault(str(meta["_submission_dir"]), []).append(meta)
    with ThreadPoolExecutor(max_workers=args.concurrency) as executor:
        futures = {
            executor.submit(
                process_submission_group,
                args,
                metas,
                repo_root,
                history_cache,
                score_ledger,
                trusted_reviewers,
                score_guard_policy,
            ): submission_dir
            for submission_dir, metas in groups.items()
        }
        for future in as_completed(futures):
            try:
                group_results = future.result()
            except Exception as exc:
                group_results = [
                    {
                        "number": None,
                        "result": "error",
                        "error": f"submission group {futures[future]} failed: {exc}",
                    }
                ]
            results.extend(group_results)
            for result in group_results:
                print(json.dumps(result, ensure_ascii=False), flush=True)
    results.sort(key=lambda item: int(item.get("number") or 0))
    print(json.dumps(results, ensure_ascii=False, indent=2))
    return 1 if any(item.get("result") == "error" for item in results) else 0


if __name__ == "__main__":
    raise SystemExit(main())
