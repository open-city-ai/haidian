#!/usr/bin/env python3
"""Run trusted validation for a GitHub pull request.

This script is designed for pull_request_target. It checks out only trusted base
branch scripts, downloads PR files as inert data, validates them, and comments
on the PR. It does not call AI services or execute contributor code. The trusted
scripts also rerun the spatial, visual, and professional gates against the
hydrated package so a contributor-owned self_check.json is not treated as
independent execution provenance.
"""

from __future__ import annotations

import base64
import json
import os
import shlex
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
    PARTICIPANT_PROTECTED_GLOBAL_FILES,
    PROTECTED_REVIEW_ARTIFACT_PREFIXES,
    ValidationReport,
    format_report,
    validate_submission,
)


COMMENT_MARKER = "<!-- haidian-submission-validation -->"
API_ROOT = "https://api.github.com"
PUBLIC_WEB_ROOT = "https://github.com"
PUBLIC_RAW_ROOT = "https://raw.githubusercontent.com"
MAX_API_ATTEMPTS = 4
MAX_DIFF_BYTES = 25 * 1024 * 1024
MAX_DOWNLOAD_BYTES = 10 * 1024 * 1024
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


def _is_download_not_found(error: Exception, path: str) -> bool:
    """Recognize an optional manifest asset that is still absent after retries."""
    if isinstance(error, urllib.error.HTTPError):
        return error.code == 404
    return isinstance(error, RuntimeError) and (
        str(error).startswith(f"GitHub API download {path} failed with HTTP 404:")
        or str(error).startswith(f"GitHub raw download {path} failed with HTTP 404:")
    )


def _is_rate_limit_error(error: Exception) -> bool:
    """Recognize an exhausted GitHub API quota for safe public fallbacks."""
    message = str(error).lower()
    return "rate limit" in message or "abuse detection" in message


def _safe_diff_path(value: str) -> str:
    candidate = PurePosixPath(value)
    if candidate.is_absolute() or not candidate.parts or ".." in candidate.parts:
        raise RuntimeError(f"PR diff contained an unsafe path: {value!r}")
    normalized = candidate.as_posix()
    if normalized in {"", "."}:
        raise RuntimeError(f"PR diff contained an empty path: {value!r}")
    return normalized


def _safe_public_ref(value: object) -> str | None:
    """Return a conservative branch ref suitable for an argument-vector git call."""
    if not isinstance(value, str) or not value:
        return None
    if (
        value.startswith("/")
        or value.endswith("/")
        or ".." in value
        or "//" in value
        or "@{" in value
    ):
        return None
    allowed = frozenset("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789._-/")
    if any(character not in allowed for character in value):
        return None
    return value


def _safe_public_repository(value: object) -> str | None:
    """Return an owner/repository name that is safe to interpolate into a URL."""
    if not isinstance(value, str):
        return None
    parts = value.split("/")
    if len(parts) != 2 or not all(parts):
        return None
    allowed = frozenset("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789._-")
    if any(character not in allowed for part in parts for character in part):
        return None
    return value


def public_event_head_is_current(head_repo: object, head_ref: object, head_sha: object) -> bool:
    """Confirm an event head still resolves before a no-API validation fallback.

    The public diff is always for the current PR.  When the authenticated API
    is rate limited we cannot otherwise prove that it still represents this
    workflow event, so use the public git ref as a read-only exact-head guard.
    """
    repository = _safe_public_repository(head_repo)
    ref = _safe_public_ref(head_ref)
    if not repository or not ref or not isinstance(head_sha, str) or len(head_sha) != 40:
        return False
    expected_ref = f"refs/heads/{ref}"
    try:
        result = subprocess.run(
            ["git", "ls-remote", "--refs", f"https://github.com/{repository}.git", expected_ref],
            capture_output=True,
            check=False,
            text=True,
            timeout=30,
        )
    except (OSError, subprocess.TimeoutExpired):
        return False
    if result.returncode != 0:
        return False
    lines = [line.split() for line in result.stdout.splitlines() if line.strip()]
    return len(lines) == 1 and lines[0] == [head_sha, expected_ref]


def parse_pull_diff(diff: str) -> list[dict[str, str]]:
    """Parse file metadata from a public PR diff without reading patch content."""
    files: list[dict[str, str]] = []
    current: dict[str, str] | None = None

    def finish() -> None:
        if current is None:
            return
        old_path = current.pop("_old_path", "")
        new_path = current.pop("_new_path", "")
        if current.get("status") == "removed":
            current["filename"] = old_path
        elif current.get("status") == "added":
            current["filename"] = new_path
        else:
            current["filename"] = new_path
        if current.get("status") == "renamed":
            current["previous_filename"] = old_path
        if not current.get("filename"):
            raise RuntimeError("PR diff contained a file entry without a filename")
        files.append(current)

    for line in diff.splitlines():
        if line.startswith("diff --git "):
            finish()
            try:
                paths = shlex.split(line[len("diff --git ") :])
            except ValueError as exc:
                raise RuntimeError(f"could not parse PR diff header: {line!r}") from exc
            if len(paths) != 2:
                raise RuntimeError(f"could not parse PR diff header: {line!r}")
            old_raw, new_raw = paths
            old_path = "" if old_raw == "/dev/null" else _safe_diff_path(old_raw.removeprefix("a/"))
            new_path = "" if new_raw == "/dev/null" else _safe_diff_path(new_raw.removeprefix("b/"))
            current = {
                "_old_path": old_path,
                "_new_path": new_path,
                "status": "added" if not old_path else "modified",
            }
            if not new_path:
                current["status"] = "removed"
            continue
        if current is None:
            continue
        if line.startswith("new file mode "):
            current["status"] = "added"
        elif line.startswith("deleted file mode "):
            current["status"] = "removed"
        elif line.startswith("rename from "):
            current["status"] = "renamed"
            current["_old_path"] = _safe_diff_path(line[len("rename from ") :])
        elif line.startswith("rename to "):
            current["status"] = "renamed"
            current["_new_path"] = _safe_diff_path(line[len("rename to ") :])
    finish()
    if not files:
        raise RuntimeError("public PR diff contained no file entries")
    return files


class GitHubClient:
    def __init__(self, token: str, repository: str) -> None:
        self.token = token
        self.repository = repository
        self.prefer_public_fallback = False

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

    def fetch_pull_files(self, issue_number: int) -> list[dict[str, str]]:
        """List PR files, falling back to the public diff if API quota is exhausted."""
        if self.prefer_public_fallback:
            return self.fetch_pull_files_from_public_diff(issue_number)
        try:
            return self.paginate(f"/repos/{self.repository}/pulls/{issue_number}/files?per_page=100")
        except RuntimeError as exc:
            if not _is_rate_limit_error(exc):
                raise
            self.prefer_public_fallback = True
            print(
                "GitHub API rate limit reached; using the public PR diff and raw artifact fallback",
                file=sys.stderr,
            )
            return self.fetch_pull_files_from_public_diff(issue_number)

    def fetch_pull_files_from_public_diff(self, issue_number: int) -> list[dict[str, str]]:
        url = f"{PUBLIC_WEB_ROOT}/{self.repository}/pull/{issue_number}.diff"
        request = urllib.request.Request(
            url,
            method="GET",
            headers={
                "Accept": "text/plain",
                "User-Agent": "haidian-submission-validation",
            },
        )
        try:
            with urllib.request.urlopen(request, timeout=60) as response:
                raw = response.read(MAX_DIFF_BYTES + 1)
        except urllib.error.HTTPError as error:
            message = _http_error_message(error)
            raise RuntimeError(
                f"GitHub public PR diff {url} failed with HTTP {error.code}: {message}"
            ) from error
        if len(raw) > MAX_DIFF_BYTES:
            raise RuntimeError(f"GitHub public PR diff exceeds {MAX_DIFF_BYTES} byte cap")
        return parse_pull_diff(raw.decode("utf-8", errors="replace"))

    def download_raw_content(
        self,
        repo: str,
        path: str,
        ref: str,
        destination: Path,
        max_bytes: int = MAX_DOWNLOAD_BYTES,
    ) -> None:
        """Download inert bytes from a public fork without consuming API quota."""
        encoded_path = urllib.parse.quote(path, safe="/")
        encoded_ref = urllib.parse.quote(ref, safe="")
        url = f"{PUBLIC_RAW_ROOT}/{repo}/{encoded_ref}/{encoded_path}"
        request = urllib.request.Request(
            url,
            method="GET",
            headers={
                "Accept": "application/octet-stream",
                "User-Agent": "haidian-submission-validation",
            },
        )
        try:
            with urllib.request.urlopen(request, timeout=60) as response:
                content = response.read(max_bytes + 1)
        except urllib.error.HTTPError as error:
            message = _http_error_message(error)
            raise RuntimeError(
                f"GitHub raw download {path} failed with HTTP {error.code}: {message}"
            ) from error
        if len(content) > max_bytes:
            raise RuntimeError(f"{destination}: file exceeds download cap")
        destination.parent.mkdir(parents=True, exist_ok=True)
        destination.write_bytes(content)

    def _download_content_from_api(
        self,
        repo: str,
        path: str,
        ref: str,
        destination: Path,
        max_bytes: int,
    ) -> None:
        """Download one file through the authenticated Contents API."""
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
        else:
            raise AssertionError("unreachable")
        if len(content) > max_bytes:
            raise RuntimeError(f"{destination}: file exceeds download cap")
        destination.parent.mkdir(parents=True, exist_ok=True)
        destination.write_bytes(content)

    def download_content(
        self,
        repo: str,
        path: str,
        ref: str,
        destination: Path,
        max_bytes: int = MAX_DOWNLOAD_BYTES,
    ) -> None:
        if self.prefer_public_fallback:
            self.download_raw_content(repo, path, ref, destination, max_bytes)
            return
        try:
            self._download_content_from_api(repo, path, ref, destination, max_bytes)
        except RuntimeError as exc:
            if not _is_rate_limit_error(exc):
                raise
            self.prefer_public_fallback = True
            self.download_raw_content(repo, path, ref, destination, max_bytes)

    def fetch_content(self, repo: str, path: str, ref: str, destination: Path) -> bool:
        if self.prefer_public_fallback:
            try:
                self.download_raw_content(repo, path, ref, destination)
            except RuntimeError as exc:
                if _is_download_not_found(exc, path):
                    return False
                raise
            return True
        encoded_path = urllib.parse.quote(path)
        encoded_ref = urllib.parse.quote(ref)
        try:
            data, _ = self.request("GET", f"/repos/{repo}/contents/{encoded_path}?ref={encoded_ref}")
        except urllib.error.HTTPError as exc:
            if exc.code == 404:
                return False
            raise
        except RuntimeError as exc:
            if not _is_rate_limit_error(exc):
                raise
            self.prefer_public_fallback = True
            try:
                self.download_raw_content(repo, path, ref, destination)
            except RuntimeError as raw_exc:
                if _is_download_not_found(raw_exc, path):
                    return False
                raise
            return True
        if isinstance(data, list) or data.get("type") != "file":
            return False
        content = base64.b64decode(data.get("content", ""))
        destination.parent.mkdir(parents=True, exist_ok=True)
        destination.write_bytes(content)
        return True

    def upsert_comment(self, issue_number: int, body: str) -> None:
        comments = self.paginate(f"/repos/{self.repository}/issues/{issue_number}/comments?per_page=100")
        for comment in comments:
            if COMMENT_MARKER in comment.get("body", ""):
                self.request(
                    "PATCH",
                    f"/repos/{self.repository}/issues/comments/{comment['id']}",
                    {"body": body},
                )
                return
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


def is_review_queue_candidate(changed_files: list[str], pr_author: str) -> bool:
    """Return true only for a single participant-owned submission directory."""
    roots: set[str] = set()
    for filename in changed_files:
        parts = filename.split("/")
        if len(parts) < 4 or parts[0] != "submissions" or parts[1].casefold() != pr_author.casefold():
            return False
        roots.add("/".join(parts[:3]))
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
    head_repo = pull_request["head"]["repo"]["full_name"]
    head_ref = pull_request["head"].get("ref")
    head_sha = pull_request["head"]["sha"]
    base = pull_request.get("base") or {}
    base_repo = (base.get("repo") or {}).get("full_name") or repository
    base_sha = base.get("sha")
    client = GitHubClient(token, repository)

    # A queued event can refer to a superseded head.  Do not hydrate a mixed
    # set of paths from the current PR against the old event SHA.
    side_effects_allowed = True
    try:
        current_pr, _ = client.request("GET", f"/repos/{repository}/pulls/{pr_number}")
    except RuntimeError as exc:
        if not _is_rate_limit_error(exc):
            raise
        if not public_event_head_is_current(head_repo, head_ref, head_sha):
            print(
                f"Skipping validation for PR #{pr_number}: GitHub API is rate limited and "
                "the public branch ref cannot confirm this event head is current"
            )
            return 0
        client.prefer_public_fallback = True
        side_effects_allowed = False
        print(
            "GitHub API rate limit reached before PR state lookup; validating the confirmed "
            "public event head without PR comments or labels",
            file=sys.stderr,
        )
    else:
        if isinstance(current_pr, dict) and (
            current_pr.get("state") != "open" or current_pr.get("draft") is True
        ):
            state = current_pr.get("state", "unknown")
            draft = "draft" if current_pr.get("draft") is True else "not draft"
            print(f"Skipping validation for PR #{pr_number}: state={state}, {draft}")
            return 0
        current_head = current_pr.get("head") if isinstance(current_pr, dict) else None
        current_head_sha = current_head.get("sha") if isinstance(current_head, dict) else None
        if current_head_sha and current_head_sha != head_sha:
            print(
                f"Skipping stale validation event for PR #{pr_number}: "
                f"event_head={head_sha}, current_head={current_head_sha}"
            )
            return 0

    files = client.fetch_pull_files(pr_number)
    if side_effects_allowed and not is_current_pull_request_head(client, pr_number, head_sha):
        print(
            f"Skipping stale validation event for PR #{pr_number}: "
            f"the PR head changed while its file list was being read."
        )
        return 0
    if not side_effects_allowed and not public_event_head_is_current(head_repo, head_ref, head_sha):
        print(
            f"Skipping validation for PR #{pr_number}: public branch ref changed while "
            "retrieving the fallback diff"
        )
        return 0
    changed_files = [item["filename"] for item in files]
    bypass = [
        item.strip()
        for item in os.getenv("MAINTAINER_BYPASS_LOGINS", "").split(",")
        if item.strip()
    ]
    maintainer_bypass = pr_author.lower() in {item.lower() for item in bypass}
    validation_files = validation_paths_for(files, maintainer_bypass)
    queue_candidate = is_review_queue_candidate(changed_files, pr_author)

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
        if side_effects_allowed and not is_current_pull_request_head(client, pr_number, head_sha):
            print(
                f"Skipping stale validation side effects for PR #{pr_number}: "
                f"event head {head_sha} no longer matches the current PR head."
            )
            return 0
        write_step_summary(comment)
        if side_effects_allowed:
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
            )
            if validation_files and not base_sha:
                validation.add_error(
                    "pull_request.base.sha is required to establish the trusted readiness migration boundary"
                )
            trusted_repo_root = Path(__file__).resolve().parent.parent
            for proposal_path in sorted(proposal_paths):
                run_trusted_review_gates(
                    validation,
                    trusted_repo_root,
                    worktree / PurePosixPath(proposal_path).parent,
                )
        validation_markdown = format_report(validation)

        if side_effects_allowed and not is_current_pull_request_head(client, pr_number, head_sha):
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
        if side_effects_allowed:
            client.upsert_comment(pr_number, comment)

        if side_effects_allowed and validation.ok and queue_candidate:
            client.remove_labels(
                pr_number,
                ["review/ci-failed", "review/changes-requested", "review/low-quality"],
            )
            client.add_labels(pr_number, ["review/queued"])
        elif side_effects_allowed and queue_candidate:
            client.remove_labels(pr_number, ["review/queued"])
            client.add_labels(pr_number, ["review/ci-failed"])
        elif not side_effects_allowed:
            print(
                f"Validated public fallback for PR #{pr_number} without comments or labels; "
                "a normal API-backed event will publish review state when quota recovers"
            )

        return 0 if validation.ok else 1
    finally:
        shutil.rmtree(worktree, ignore_errors=True)


if __name__ == "__main__":
    raise SystemExit(main())
