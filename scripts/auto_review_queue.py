#!/usr/bin/env python3
"""Process queued submission PRs from a trusted maintainer host.

This worker intentionally runs outside GitHub Actions. It never executes code from
the PR and only sends a package to AI after the required deterministic CI passes.
"""

from __future__ import annotations

import argparse
from concurrent.futures import ThreadPoolExecutor, as_completed
import fcntl
import json
import os
import shutil
import subprocess
import sys
import threading
from dataclasses import dataclass
from pathlib import Path
from typing import Any

from generate_submissions_data import package_sha256


REVIEW_MARKER = "<!-- haidian-auto-review:{head_sha} -->"
CONFLICT_MARKER = "<!-- haidian-auto-review-conflict:{head_sha} -->"
PASS = "SUCCESS"
WORKTREE_LOCK = threading.Lock()
GITHUB_WRITE_LOCK = threading.Lock()


class WorkerError(RuntimeError):
    pass


@dataclass(frozen=True)
class Decision:
    action: str
    score: float | None
    reason: str


def run(command: list[str], *, cwd: Path, capture: bool = True) -> subprocess.CompletedProcess[str]:
    completed = subprocess.run(command, cwd=cwd, text=True, capture_output=capture, check=False)
    if completed.returncode:
        detail = completed.stderr.strip() or completed.stdout.strip() or "command failed"
        raise WorkerError(f"{command[0]} failed: {detail}")
    return completed


def gh_json(repo: str, args: list[str], *, cwd: Path) -> Any:
    completed = run(["gh", *args, "--repo", repo], cwd=cwd)
    try:
        return json.loads(completed.stdout)
    except json.JSONDecodeError as exc:
        raise WorkerError(f"invalid JSON from gh {' '.join(args)}") from exc


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


def decide(review: dict[str, Any], decision: dict[str, Any], threshold: float) -> Decision:
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
    return Decision("accept", float(score), "threshold and all gates passed")


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


def label_args(remove: list[str], add: list[str]) -> list[str]:
    args: list[str] = []
    for label in remove:
        args.extend(["--remove-label", label])
    for label in add:
        args.extend(["--add-label", label])
    return args


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
        outcome = decide(review, decision, threshold)
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
) -> None:
    live = pr_meta(repo, number, cwd)
    assert_live(live, head_sha, require_success=True)
    marker = REVIEW_MARKER.format(head_sha=head_sha)
    if outcome.action == "accept":
        if live.get("mergeable") == "CONFLICTING":
            raise WorkerError("PR became conflicting before merge")
        body = (
            f"{marker}\nMaintainer intake decision: Review Agent score {outcome.score:g}/100. "
            "Mandatory rejection and all four local gates passed. Accepted for repository intake only; "
            "this is not gallery publication, award selection, implementation approval, or government endorsement."
        )
        run(["gh", "pr", "review", str(number), "--repo", repo, "--approve", "--body", body], cwd=cwd)
        assert_live(pr_meta(repo, number, cwd), head_sha, require_success=True)
        merge = ["gh", "pr", "merge", str(number), "--repo", repo, "--merge"]
        if admin_merge:
            merge.append("--admin")
        run(merge, cwd=cwd)
        run(
            ["gh", "pr", "edit", str(number), "--repo", repo, *label_args(
                ["review/queued"],
                ["review/intake-accepted"],
            )],
            cwd=cwd,
        )
        return

    body = comment_file.read_text(encoding="utf-8")
    body = f"{marker}\n{body}"
    run(["gh", "pr", "review", str(number), "--repo", repo, "--request-changes", "--body", body], cwd=cwd)
    add = ["review/changes-requested"]
    if outcome.action == "low-quality":
        add.append("review/low-quality")
    run(
        ["gh", "pr", "edit", str(number), "--repo", repo, *label_args(["review/queued"], add)],
        cwd=cwd,
    )


def process_pr(args: argparse.Namespace, meta: dict[str, Any], repo_root: Path) -> dict[str, Any]:
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

    submission_dir = submission_dir_from_files(pr_file_paths(args.repo, number, repo_root), author)
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
        cached = load_cached_review(audit_dir, submission_dir, worktree, args.threshold)
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
            outcome = decide(review, ai_decision, args.threshold)
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
            "package_sha256": ai_decision.get("reviewed_package_sha256"),
            "reused_audit": reused_audit,
        }
        if args.apply:
            with GITHUB_WRITE_LOCK:
                apply_review(
                    args.repo,
                    number,
                    head_sha,
                    outcome,
                    audit_dir / "pr-comment.md",
                    repo_root,
                    admin_merge=args.admin_merge,
                )
            result["applied"] = True
        return result
    finally:
        if worktree.exists() and not args.keep_worktrees:
            with WORKTREE_LOCK:
                run(["git", "worktree", "remove", "--force", str(worktree)], cwd=repo_root)


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
    lock_file = (args.audit_root / ".worker.lock").open("w", encoding="utf-8")
    try:
        fcntl.flock(lock_file.fileno(), fcntl.LOCK_EX | fcntl.LOCK_NB)
    except BlockingIOError as exc:
        raise WorkerError("another auto-review worker is already running") from exc
    candidates = gh_json(
        args.repo,
        [
            "pr",
            "list",
            "--state",
            "open",
            "--label",
            args.label,
            "--limit",
            "1000",
            "--json",
            "number,author,headRefOid,state,isDraft,mergeable,statusCheckRollup,labels",
        ],
        cwd=repo_root,
    )
    selected = []
    results = []
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
        selected.append(live)
    with ThreadPoolExecutor(max_workers=args.concurrency) as executor:
        futures = {executor.submit(process_pr, args, meta, repo_root): meta for meta in selected}
        for future in as_completed(futures):
            meta = futures[future]
            try:
                results.append(future.result())
            except Exception as exc:  # Keep independent PR failures from stopping the queue.
                results.append({"number": meta.get("number"), "result": "error", "error": str(exc)})
            print(json.dumps(results[-1], ensure_ascii=False), flush=True)
    results.sort(key=lambda item: int(item.get("number") or 0))
    print(json.dumps(results, ensure_ascii=False, indent=2))
    return 1 if any(item.get("result") == "error" for item in results) else 0


if __name__ == "__main__":
    raise SystemExit(main())
