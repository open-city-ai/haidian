#!/usr/bin/env python3
"""Run trusted validation for a GitHub pull request.

This script is designed for pull_request_target. It checks out only trusted base
branch scripts, downloads PR files as inert data, validates them, and comments
on the PR. It does not call AI services or execute contributor code. The trusted
scripts also rerun the spatial, visual, and professional gates against the
hydrated package so a contributor-owned self_check.json is not treated as
independent execution provenance.

Security model
--------------
- Runs only from the trusted default branch checkout (``github.event.repository.default_branch``).
- Downloads changed files from the PR head via the GitHub Contents API as inert data blobs.
- Never executes contributor-supplied code; the validator binary is always the
  trusted branch copy.
- Comments on the PR with the validation result and retries on transient API
  errors (429, 500-504) up to ``MAX_API_ATTEMPTS`` times.

Environment variables
---------------------
- ``GITHUB_TOKEN`` — required; needs ``pull-requests: write`` permission.
- ``GITHUB_REPOSITORY`` — required; ``owner/repo`` format.
- ``GITHUB_EVENT_PATH`` — path to the GitHub Actions event JSON.

Usage
-----
Intended to be called by the ``submission-validation.yml`` GitHub Actions
workflow, not manually. For local testing, pass ``--pr`` to specify the PR
number and ensure ``GITHUB_TOKEN`` is set.

Exit code is 0 when the PR passes validation and 1 when it fails or errors.
"""

from __future__ import annotations

import base64
import json
import os
import shutil
import subprocess
import sys
import tempfile
import time
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path, PurePosixPath
from typing import Any

from validate_submission import (
    MAX_SINGLE_FILE_BYTES,
    PARTICIPANT_PROTECTED_GLOBAL_FILES,
    PROTECTED_REVIEW_ARTIFACT_PREFIXES,
    ValidationReport,
    format_report,
    validate_submission,
)
from participant_owner_aliases import (
    PARTICIPANT_OWNER_ALIASES_PATH,
    authorized_legacy_submission_dirs,
)


COMMENT_MARKER = "<!-- haidian-submission-validation -->"
API_ROOT = "https://api.github.com"
MAX_API_ATTEMPTS = 4
MAX_DOWNLOAD_BYTES = MAX_SINGLE_FILE_BYTES
MAX_RETRY_DELAY_SECONDS = 30
RETRYABLE_METHODS = frozenset({"GET", "HEAD", "OPTIONS"})
# A fork's Contents API can briefly lag the PR event's head commit. Keep 404
# retries bounded and limited to GETs; a permanent missing file still fails
# with the path and head-specific download error after the retry budget.
RETRYABLE_STATUS_CODES = frozenset({404, 429, 500, 502, 503, 504})
TRUSTED_REVIEW_GATE_TIMEOUT_SECONDS = 180


def _http_error_message(error: urllib.error.HTTPError) -> str:
    """Extract GitHub's safe error message without exposing auth headers."""
    try:
        raw = error.read().decode("utf-8", errors="replace")
    except OSError:
        raw = ""
    if raw:
        try:
            payload = json.loads(raw)
        except json.JSONDecodeError:
            payload = None
        if isinstance(payload, dict) and isinstance(payload.get("message"), str):
            return payload["message"]
        return raw[:300].replace("\n", " ")
    return str(error.reason or "request failed")


def _is_retryable_http_error(
    method: str, error: urllib.error.HTTPError, message: str
) -> bool:
    """Retry transient API throttling, but fail fast on permission errors."""
    if method.upper() not in RETRYABLE_METHODS:
        return False
    if error.code in RETRYABLE_STATUS_CODES:
        return True
    if error.code != 403:
        return False
    headers = {key.lower(): value for key, value in error.headers.items()}
    remaining = headers.get("x-ratelimit-remaining")
    return bool(
        headers.get("retry-after")
        or remaining == "0"
        or "rate limit" in message.lower()
        or "secondary rate limit" in message.lower()
        or "abuse detection" in message.lower()
    )


def _retry_delay_seconds(error: urllib.error.HTTPError, attempt: int) -> float:
    headers = {key.lower(): value for key, value in error.headers.items()}
    retry_after = headers.get("retry-after")
    if retry_after:
        try:
            return min(MAX_RETRY_DELAY_SECONDS, max(1.0, float(retry_after)))
        except ValueError:
            pass
    return min(MAX_RETRY_DELAY_SECONDS, float(2**attempt))


def _network_error_message(error: urllib.error.URLError) -> str:
    """Return a bounded network error description without request credentials."""
    return str(error.reason or "network request failed")[:300].replace("\n", " ")


def _is_download_not_found(error: Exception, path: str) -> bool:
    """Recognize an optional manifest asset that is still absent after retries."""
    if isinstance(error, urllib.error.HTTPError):
        return error.code == 404
    return isinstance(error, RuntimeError) and str(error).startswith(
        f"GitHub API download {path} failed with HTTP 404:"
    )


def _is_comment_patch_forbidden(error: RuntimeError) -> bool:
    """Allow fork validation to publish a fresh comment when PATCH is forbidden."""
    message = str(error)
    return message.startswith("GitHub API PATCH ") and " failed with HTTP 403:" in message


class GitHubClient:
    def __init__(self, token: str, repository: str) -> None:
        self.token = token
        self.repository = repository

    def request(self, method: str, url: str, data: dict | None = None) -> tuple[Any, dict[str, str]]:
        if url.startswith("/"):
            url = f"{API_ROOT}{url}"
        body = None if data is None else json.dumps(data).encode("utf-8")
        request = urllib.request.Request(
            url,
            data=body,
            method=method,
            headers={
                "Accept": "application/vnd.github+json",
                "Authorization": f"Bearer {self.token}",
                "Content-Type": "application/json",
                "X-GitHub-Api-Version": "2022-11-28",
            },
        )
        for attempt in range(MAX_API_ATTEMPTS):
            try:
                with urllib.request.urlopen(request, timeout=60) as response:
                    raw = response.read().decode("utf-8")
                    parsed = json.loads(raw) if raw else None
                    return parsed, dict(response.headers.items())
            except urllib.error.HTTPError as error:
                message = _http_error_message(error)
                if error.code == 404:
                    raise
                if attempt + 1 >= MAX_API_ATTEMPTS or not _is_retryable_http_error(
                    method, error, message
                ):
                    raise RuntimeError(
                        f"GitHub API {method} {url} failed with HTTP {error.code}: {message}"
                    ) from error
                time.sleep(_retry_delay_seconds(error, attempt))
        raise AssertionError("unreachable")

    def paginate(self, path: str) -> list[dict]:
        url = f"{API_ROOT}{path}"
        results: list[dict] = []
        while url:
            page, headers = self.request("GET", url)
            results.extend(page)
            url = next_link(headers.get("Link", ""))
        return results

    def download_content(
        self,
        repo: str,
        path: str,
        ref: str,
        destination: Path,
        max_bytes: int = MAX_DOWNLOAD_BYTES,
    ) -> None:
        # Fetch raw bytes through the Contents API on api.github.com. Unlike the
        # github.com raw_url, this honors the Bearer token on private repos (the
        # raw_url redirects to raw.githubusercontent.com, which drops the header
        # and 404s).
        encoded_path = urllib.parse.quote(path)
        encoded_ref = urllib.parse.quote(ref)
        url = f"{API_ROOT}/repos/{repo}/contents/{encoded_path}?ref={encoded_ref}"
        request = urllib.request.Request(
            url,
            method="GET",
            headers={
                "Authorization": f"Bearer {self.token}",
                "Accept": "application/vnd.github.raw",
                "X-GitHub-Api-Version": "2022-11-28",
            },
        )
        for attempt in range(MAX_API_ATTEMPTS):
            try:
                with urllib.request.urlopen(request, timeout=60) as response:
                    content = response.read(max_bytes + 1)
                    break
            except urllib.error.HTTPError as error:
                message = _http_error_message(error)
                if attempt + 1 >= MAX_API_ATTEMPTS or not _is_retryable_http_error(
                    "GET", error, message
                ):
                    raise RuntimeError(
                        f"GitHub API download {path} failed with HTTP {error.code}: {message}"
                    ) from error
                time.sleep(_retry_delay_seconds(error, attempt))
            except urllib.error.URLError as error:
                if attempt + 1 >= MAX_API_ATTEMPTS:
                    raise RuntimeError(
                        f"GitHub API download {path} failed after network error: "
                        f"{_network_error_message(error)}"
                    ) from error
                time.sleep(min(MAX_RETRY_DELAY_SECONDS, float(2**attempt)))
        else:
            raise AssertionError("unreachable")
        if len(content) > max_bytes:
            raise RuntimeError(f"{destination}: file exceeds download cap")
        destination.parent.mkdir(parents=True, exist_ok=True)
        destination.write_bytes(content)

    def fetch_content(self, repo: str, path: str, ref: str, destination: Path) -> bool:
        encoded_path = urllib.parse.quote(path)
        encoded_ref = urllib.parse.quote(ref)
        try:
            data, _ = self.request("GET", f"/repos/{repo}/contents/{encoded_path}?ref={encoded_ref}")
        except urllib.error.HTTPError as exc:
            if exc.code == 404:
                return False
            raise
        if isinstance(data, list) or data.get("type") != "file":
            return False
        content = base64.b64decode(data.get("content", ""))
        destination.parent.mkdir(parents=True, exist_ok=True)
        destination.write_bytes(content)
        return True

    def upsert_comment(self, issue_number: int, body: str) -> None:
        comments = self.paginate(f"/repos/{self.repository}/issues/{issue_number}/comments?per_page=100")
        marker_comments = [
            comment for comment in comments if COMMENT_MARKER in comment.get("body", "")
        ]
        # A forbidden PATCH can leave the old marker beside a newly-created
        # fallback marker. Check the complete marker set before attempting
        # another mutation, so repeated workflow runs remain idempotent.
        if any(comment.get("body") == body for comment in marker_comments):
            return
        for comment in marker_comments:
            try:
                self.request(
                    "PATCH",
                    f"/repos/{self.repository}/issues/comments/{comment['id']}",
                    {"body": body},
                )
                return
            except RuntimeError as exc:
                if not _is_comment_patch_forbidden(exc):
                    raise
                # A pull_request_target token may create a new comment but
                # cannot edit a bot-owned comment on a fork PR. Try another
                # marker first; POST only after every marker is uneditable.
                continue
        self.request("POST", f"/repos/{self.repository}/issues/{issue_number}/comments", {"body": body})

    def add_labels(self, issue_number: int, labels: list[str]) -> None:
        self.request(
            "POST",
            f"/repos/{self.repository}/issues/{issue_number}/labels",
            {"labels": labels},
        )

    def remove_labels(self, issue_number: int, labels: list[str]) -> None:
        for label in labels:
            encoded = urllib.parse.quote(label, safe="")
            try:
                self.request("DELETE", f"/repos/{self.repository}/issues/{issue_number}/labels/{encoded}")
            except urllib.error.HTTPError as exc:
                if exc.code != 404:
                    raise


def next_link(link_header: str) -> str | None:
    for part in link_header.split(","):
        section = part.strip()
        if 'rel="next"' not in section:
            continue
        start = section.find("<")
        end = section.find(">")
        if start != -1 and end != -1:
            return section[start + 1 : end]
    return None


def is_current_pull_request_head(
    client: GitHubClient, issue_number: int, expected_sha: str
) -> bool:
    """Return whether the event SHA is still the PR's current head."""
    payload, _ = client.request(
        "GET", f"/repos/{client.repository}/pulls/{issue_number}"
    )
    if not isinstance(payload, dict):
        raise RuntimeError("GitHub pull request response was not an object")
    if payload.get("state") != "open" or payload.get("draft") is True:
        return False
    head = payload.get("head")
    if not isinstance(head, dict) or not isinstance(head.get("sha"), str):
        raise RuntimeError("GitHub pull request response did not include head.sha")
    return head["sha"] == expected_sha


def proposal_paths_for(changed_files: list[str]) -> set[str]:
    proposals = set()
    for filename in changed_files:
        parts = filename.split("/")
        if len(parts) >= 3 and parts[0] == "submissions":
            proposals.add("/".join(parts[:3] + ["proposal.md"]))
    return proposals


def base_requires_persisted_readiness(manifest: object) -> bool:
    """Return whether a trusted base establishes the new ready-package contract.

    A package absent from the base, or not yet finalized there, is a new
    ready-package transition and must opt into the persisted self-check
    contract.  A historical ready package is the only case where an omitted
    contract remains intake-compatible during migration.  This decision is
    deliberately made from the trusted base, not from contributor-controlled
    head content, so deleting the field cannot downgrade a new package to the
    historical warning path.
    """
    if not isinstance(manifest, dict):
        return True
    if manifest.get("package_state") != "ready_for_review":
        return True
    claim = manifest.get("validation_claim")
    if not isinstance(claim, dict):
        return True
    return claim.get("readiness_contract") is not None


def readiness_contract_dirs_from_base(
    client: GitHubClient,
    base_repo: str,
    base_sha: str,
    proposal_paths: set[str],
    destination: Path,
) -> set[str]:
    """Read only trusted-base manifests to establish strict migration boundaries."""
    required: set[str] = set()
    for proposal_path in sorted(proposal_paths):
        proposal_dir = PurePosixPath(proposal_path).parent.as_posix()
        manifest_path = f"{proposal_dir}/manifest.json"
        manifest_destination = destination / manifest_path
        if not client.fetch_content(base_repo, manifest_path, base_sha, manifest_destination):
            required.add(proposal_dir)
            continue
        try:
            manifest = json.loads(manifest_destination.read_text(encoding="utf-8"))
        except (OSError, UnicodeDecodeError, json.JSONDecodeError):
            required.add(proposal_dir)
            continue
        if base_requires_persisted_readiness(manifest):
            required.add(proposal_dir)
    return required


def validation_paths_for(files: list[dict], maintainer_bypass: bool) -> list[str]:
    """Return paths present in the PR checkout for content validation."""
    return [
        item["filename"]
        for item in files
        if item.get("status") != "removed"
    ]


def strict_manifest_paths_for(files: list[dict]) -> list[str]:
    """Return newly introduced manifest paths that must adopt schema 0.2.x.

    GitHub reports copies and renames with statuses other than ``added``. Treat
    their current path as new too, so a contributor cannot evade the migration
    boundary by copying or renaming a legacy manifest.
    """
    paths: set[str] = set()
    for item in files:
        if item.get("status") not in {"added", "copied", "renamed"}:
            continue
        filename = item.get("filename")
        if isinstance(filename, str) and filename.endswith("/manifest.json"):
            paths.add(filename)
    return sorted(paths)


def reserved_legacy_login_user_id(repo_root: Path, login: str) -> int | None:
    """Return the trusted user ID that owns a released historical login."""
    try:
        policy = json.loads(
            (repo_root / PARTICIPANT_OWNER_ALIASES_PATH).read_text(encoding="utf-8")
        )
    except (OSError, UnicodeDecodeError, json.JSONDecodeError):
        return None
    aliases = policy.get("aliases") if isinstance(policy, dict) else None
    if not isinstance(aliases, list):
        return None
    for item in aliases:
        if not isinstance(item, dict):
            continue
        legacy_login = item.get("legacy_login")
        user_id = item.get("github_user_id")
        if (
            isinstance(legacy_login, str)
            and legacy_login.casefold() == login.casefold()
            and isinstance(user_id, int)
            and not isinstance(user_id, bool)
        ):
            return user_id
    return None


def is_review_queue_candidate(
    changed_files: list[str],
    pr_author: str,
    authorized_legacy_dirs: set[str] | None = None,
) -> bool:
    """Return true only for a single participant-owned submission directory."""
    authorized_legacy_dirs = authorized_legacy_dirs or set()
    roots: set[str] = set()
    for filename in changed_files:
        parts = filename.split("/")
        proposal_dir = "/".join(parts[:3])
        if (
            len(parts) < 4
            or parts[0] != "submissions"
            or (parts[1].casefold() != pr_author.casefold() and proposal_dir not in authorized_legacy_dirs)
        ):
            return False
        roots.add(proposal_dir)
    return bool(changed_files) and len(roots) == 1


def is_non_submission_pr(files: list[dict] | list[str]) -> bool:
    """Return true only for ordinary non-submission paths.

    Maintainer-controlled gallery data and local review artifacts must still
    enter the strict validator even though they live outside submissions/.
    """
    paths: list[str] = []
    for item in files:
        if isinstance(item, dict):
            filename = item.get("filename")
            if isinstance(filename, str):
                paths.append(filename)
            previous_filename = item.get("previous_filename")
            if isinstance(previous_filename, str):
                paths.append(previous_filename)
        elif isinstance(item, str):
            paths.append(item)
    return bool(paths) and all(
        filename.split("/", 1)[0] != "submissions"
        and filename not in PARTICIPANT_PROTECTED_GLOBAL_FILES
        and not filename.startswith(PROTECTED_REVIEW_ARTIFACT_PREFIXES)
        for filename in paths
    )


def safe_manifest_paths(manifest: object) -> set[str]:
    """Return inert, proposal-relative file paths declared by a manifest."""
    if not isinstance(manifest, dict) or not isinstance(manifest.get("files"), list):
        return set()
    paths: set[str] = set()
    for item in manifest["files"]:
        raw = item.get("path") if isinstance(item, dict) else None
        if not isinstance(raw, str):
            continue
        candidate = PurePosixPath(raw)
        if candidate.is_absolute() or not candidate.parts or ".." in candidate.parts:
            continue
        normalized = candidate.as_posix()
        if normalized in {".", ""}:
            continue
        paths.add(normalized)
    return paths


def hydrate_proposal_package(
    client: GitHubClient,
    head_repo: str,
    head_sha: str,
    worktree: Path,
    proposal_path: str,
) -> None:
    """Download the inert files needed to validate an existing proposal package."""
    proposal_dir = PurePosixPath(proposal_path).parent.as_posix()
    manifest_path = f"{proposal_dir}/manifest.json"
    manifest_destination = worktree / manifest_path
    if not manifest_destination.exists():
        if not client.fetch_content(head_repo, manifest_path, head_sha, manifest_destination):
            return
    try:
        manifest = json.loads(manifest_destination.read_text(encoding="utf-8"))
    except (UnicodeDecodeError, json.JSONDecodeError):
        return
    for relative in safe_manifest_paths(manifest):
        destination = worktree / proposal_dir / relative
        if destination.exists():
            continue
        try:
            client.download_content(
                head_repo,
                f"{proposal_dir}/{relative}",
                head_sha,
                destination,
            )
        except (urllib.error.HTTPError, RuntimeError) as exc:
            if not _is_download_not_found(exc, f"{proposal_dir}/{relative}"):
                raise


def write_step_summary(markdown: str) -> None:
    summary_path = os.getenv("GITHUB_STEP_SUMMARY")
    if summary_path:
        Path(summary_path).write_text(markdown, encoding="utf-8")


def _trusted_gate_summary(payload: object) -> str:
    """Return a bounded, non-content-bearing summary for the CI comment."""
    if not isinstance(payload, dict):
        return "no JSON report"
    parts: list[str] = []
    for key in ("issues", "errors", "warnings"):
        value = payload.get(key)
        if isinstance(value, list):
            parts.append(f"{key}={len(value)}")
    return ", ".join(parts) or "report parsed"


def run_trusted_review_gates(
    report: ValidationReport,
    trusted_repo_root: Path,
    submission_dir: Path,
) -> None:
    """Rerun all non-AI review gates using only trusted checkout scripts.

    The package is hydrated as inert data into a temporary worktree. These
    subprocesses execute scripts from the trusted default-branch checkout and
    never import or run contributor-supplied Python/JavaScript. Their results
    are intentionally recorded in the CI report rather than written back to
    contributor-owned ``self_check.json``.
    """
    gates = (
        (
            "SPATIAL_REVIEW",
            trusted_repo_root / "scripts" / "spatial_review.py",
            ["--repo-root", str(trusted_repo_root), "--json"],
        ),
        (
            "VISUAL_PACKAGING",
            trusted_repo_root / "scripts" / "visual_review.py",
            ["--json"],
        ),
        (
            "PROFESSIONAL_EVIDENCE",
            trusted_repo_root / "scripts" / "professional_review.py",
            ["--repo-root", str(trusted_repo_root), "--json"],
        ),
    )
    for gate_id, script, extra_args in gates:
        command = [sys.executable, str(script), str(submission_dir), *extra_args]
        try:
            completed = subprocess.run(
                command,
                cwd=trusted_repo_root,
                capture_output=True,
                text=True,
                encoding="utf-8",
                errors="replace",
                env={**os.environ, "PYTHONUTF8": "1", "PYTHONIOENCODING": "utf-8"},
                timeout=TRUSTED_REVIEW_GATE_TIMEOUT_SECONDS,
                check=False,
            )
        except (OSError, subprocess.SubprocessError) as exc:
            report.add_error(f"trusted gate {gate_id} could not run: {type(exc).__name__}")
            continue

        payload: object = None
        stdout = completed.stdout.strip()
        if stdout:
            try:
                payload = json.loads(stdout)
            except json.JSONDecodeError:
                report.add_error(f"trusted gate {gate_id} returned non-JSON output")
                continue
        passed = completed.returncode == 0 and isinstance(payload, dict) and payload.get("ok") is True
        summary = _trusted_gate_summary(payload)
        if passed:
            report.add_warning(f"trusted gate {gate_id}: PASS ({summary})")
        else:
            report.add_error(
                f"trusted gate {gate_id}: FAIL (exit={completed.returncode}, {summary})"
            )


def main() -> int:
    token = os.getenv("GITHUB_TOKEN")
    repository = os.getenv("GITHUB_REPOSITORY")
    event_path = os.getenv("GITHUB_EVENT_PATH")
    if not token or not repository or not event_path:
        print("GITHUB_TOKEN, GITHUB_REPOSITORY, and GITHUB_EVENT_PATH are required", file=sys.stderr)
        return 2

    event = json.loads(Path(event_path).read_text(encoding="utf-8"))
    pull_request = event.get("pull_request")
    if not pull_request:
        print("This workflow only supports pull_request_target events", file=sys.stderr)
        return 2

    pr_number = int(pull_request["number"])
    pr_author = pull_request["user"]["login"]
    pr_user_id = pull_request["user"].get("id")
    head_repo = pull_request["head"]["repo"]["full_name"]
    head_sha = pull_request["head"]["sha"]
    base = pull_request.get("base") or {}
    base_repo = (base.get("repo") or {}).get("full_name") or repository
    base_sha = base.get("sha")
    client = GitHubClient(token, repository)

    if not is_current_pull_request_head(client, pr_number, head_sha):
        print(
            f"Skipping stale validation event for PR #{pr_number}: "
            f"event head {head_sha} no longer matches the current PR head."
        )
        return 0

    files = client.paginate(f"/repos/{repository}/pulls/{pr_number}/files?per_page=100")
    if not is_current_pull_request_head(client, pr_number, head_sha):
        print(
            f"Skipping stale validation event for PR #{pr_number}: "
            f"the PR head changed while its file list was being read."
        )
        return 0
    changed_files = [item["filename"] for item in files]
    bypass = [
        item.strip()
        for item in os.getenv("MAINTAINER_BYPASS_LOGINS", "").split(",")
        if item.strip()
    ]
    maintainer_bypass = pr_author.lower() in {item.lower() for item in bypass}
    trusted_repo_root = Path(__file__).resolve().parent.parent
    authorized_legacy_dirs = authorized_legacy_submission_dirs(
        trusted_repo_root, pr_user_id, pr_author
    )
    reserved_legacy_user_id = reserved_legacy_login_user_id(trusted_repo_root, pr_author)
    blocked_submission_owners = (
        {pr_author}
        if reserved_legacy_user_id is not None and reserved_legacy_user_id != pr_user_id
        else set()
    )
    validation_files = validation_paths_for(files, maintainer_bypass)
    queue_candidate = is_review_queue_candidate(changed_files, pr_author, authorized_legacy_dirs)

    # Code/docs/test PRs do not need participant-package hydration.  Decide
    # this immediately after the file listing so a non-submission change
    # cannot spend API calls downloading its whole diff before receiving the
    # informational validation comment.
    if is_non_submission_pr(files):
        validation = ValidationReport(changed_files=changed_files)
        validation.add_warning(
            "non-submission code/docs/test PR; participant package validation was not applicable"
        )
        validation_markdown = format_report(validation)
        comment = (
            f"{COMMENT_MARKER}\n"
            "# Haidian Submission Validation\n\n"
            f"{validation_markdown}\n\n"
            "> This CI check is deterministic. It does not call AI models and does not make content-quality judgments."
        )
        if not is_current_pull_request_head(client, pr_number, head_sha):
            print(
                f"Skipping stale validation side effects for PR #{pr_number}: "
                f"event head {head_sha} no longer matches the current PR head."
            )
            return 0
        write_step_summary(comment)
        client.upsert_comment(pr_number, comment)
        return 0

    worktree = Path(tempfile.mkdtemp(prefix="haidian-pr-"))
    try:
        proposal_paths = proposal_paths_for(validation_files)
        if base_sha:
            required_readiness_contract_dirs = readiness_contract_dirs_from_base(
                client,
                base_repo,
                base_sha,
                proposal_paths,
                worktree / ".trusted-base",
            )
        else:
            # A pull_request_target event should always carry base.sha.  If it
            # is absent, fail closed for touched packages instead of treating
            # them as historical and allowing the contributor to choose the
            # migration branch.
            required_readiness_contract_dirs = {
                PurePosixPath(path).parent.as_posix() for path in proposal_paths
            }
        for item in files:
            filename = item["filename"]
            if item.get("status") == "removed":
                continue
            client.download_content(head_repo, filename, head_sha, worktree / filename)

        for proposal_path in proposal_paths:
            destination = worktree / proposal_path
            if not destination.exists():
                client.fetch_content(head_repo, proposal_path, head_sha, destination)
            hydrate_proposal_package(
                client,
                head_repo,
                head_sha,
                worktree,
                proposal_path,
            )

        if not validation_files and (maintainer_bypass or queue_candidate):
            validation = ValidationReport(
                changed_files=changed_files,
                maintainer_bypass=maintainer_bypass,
            )
            if maintainer_bypass:
                validation.add_warning(
                    "maintainer-authorized deletion-only PR; removed files were not executed or content-validated"
                )
            else:
                validation.add_warning(
                    "participant deletion-only PR; removed files were not content-validated"
                )
        else:
            validation = validate_submission(
                worktree,
                pr_author,
                validation_files,
                bypass,
                strict_manifest_paths=strict_manifest_paths_for(files),
                required_readiness_contract_dirs=required_readiness_contract_dirs,
                authorized_legacy_submission_dirs=authorized_legacy_dirs,
                blocked_submission_owners=blocked_submission_owners,
            )
            if validation_files and not base_sha:
                validation.add_error(
                    "pull_request.base.sha is required to establish the trusted readiness migration boundary"
                )
            for proposal_path in sorted(proposal_paths):
                run_trusted_review_gates(
                    validation,
                    trusted_repo_root,
                    worktree / PurePosixPath(proposal_path).parent,
                )
        validation_markdown = format_report(validation)

        if not is_current_pull_request_head(client, pr_number, head_sha):
            print(
                f"Skipping stale validation side effects for PR #{pr_number}: "
                f"event head {head_sha} no longer matches the current PR head."
            )
            return 0

        comment = (
            f"{COMMENT_MARKER}\n"
            "# Haidian Submission Validation\n\n"
            f"{validation_markdown}\n\n"
            "> This CI check is deterministic. It does not call AI models and does not make content-quality judgments."
        )
        write_step_summary(comment)
        client.upsert_comment(pr_number, comment)

        if validation.ok and queue_candidate:
            client.remove_labels(
                pr_number,
                ["review/ci-failed", "review/changes-requested", "review/low-quality"],
            )
            client.add_labels(pr_number, ["review/queued"])
        elif queue_candidate:
            client.remove_labels(pr_number, ["review/queued"])
            client.add_labels(pr_number, ["review/ci-failed"])

        return 0 if validation.ok else 1
    finally:
        shutil.rmtree(worktree, ignore_errors=True)


if __name__ == "__main__":
    raise SystemExit(main())
