#!/usr/bin/env python3
"""Run deterministic validation for a GitHub pull request.

This script is designed for pull_request_target. It checks out only trusted base
branch scripts, downloads PR files as inert data, validates them, and comments
on the PR. It does not call AI services or execute contributor code.
"""

from __future__ import annotations

import base64
import json
import os
import shutil
import sys
import tempfile
import time
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path, PurePosixPath
from typing import Any

from validate_submission import ValidationReport, format_report, validate_submission


COMMENT_MARKER = "<!-- haidian-submission-validation -->"
API_ROOT = "https://api.github.com"
MAX_API_ATTEMPTS = 4
MAX_RETRY_DELAY_SECONDS = 30
RETRYABLE_METHODS = frozenset({"GET", "HEAD", "OPTIONS"})
RETRYABLE_STATUS_CODES = frozenset({429, 500, 502, 503, 504})


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
        max_bytes: int = 6 * 1024 * 1024,
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
                if error.code == 404:
                    raise
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


def proposal_paths_for(changed_files: list[str]) -> set[str]:
    proposals = set()
    for filename in changed_files:
        parts = filename.split("/")
        if len(parts) >= 3 and parts[0] == "submissions":
            proposals.add("/".join(parts[:3] + ["proposal.md"]))
    return proposals


def validation_paths_for(files: list[dict], maintainer_bypass: bool) -> list[str]:
    """Exclude maintainer-authorized removals from content validation."""
    return [
        item["filename"]
        for item in files
        if not (maintainer_bypass and item.get("status") == "removed")
    ]


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
    """Return true only when current and renamed paths are outside submissions/."""
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
    return bool(paths) and all(filename.split("/", 1)[0] != "submissions" for filename in paths)


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
        except urllib.error.HTTPError as exc:
            if exc.code != 404:
                raise


def write_step_summary(markdown: str) -> None:
    summary_path = os.getenv("GITHUB_STEP_SUMMARY")
    if summary_path:
        Path(summary_path).write_text(markdown, encoding="utf-8")


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
    head_sha = pull_request["head"]["sha"]
    client = GitHubClient(token, repository)

    files = client.paginate(f"/repos/{repository}/pulls/{pr_number}/files?per_page=100")
    changed_files = [item["filename"] for item in files]
    bypass = [
        item.strip()
        for item in os.getenv("MAINTAINER_BYPASS_LOGINS", "").split(",")
        if item.strip()
    ]
    maintainer_bypass = pr_author.lower() in {item.lower() for item in bypass}
    validation_files = validation_paths_for(files, maintainer_bypass)

    worktree = Path(tempfile.mkdtemp(prefix="haidian-pr-"))
    try:
        for item in files:
            filename = item["filename"]
            if item.get("status") == "removed":
                continue
            client.download_content(head_repo, filename, head_sha, worktree / filename)

        for proposal_path in proposal_paths_for(validation_files):
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

        queue_candidate = is_review_queue_candidate(changed_files, pr_author)
        if is_non_submission_pr(files):
            validation = ValidationReport(changed_files=changed_files)
            validation.add_warning(
                "non-submission code/docs/test PR; participant package validation was not applicable"
            )
        elif not validation_files and maintainer_bypass:
            validation = ValidationReport(
                changed_files=changed_files,
                maintainer_bypass=True,
            )
            validation.add_warning(
                "maintainer-authorized deletion-only PR; removed files were not executed or content-validated"
            )
        else:
            validation = validate_submission(worktree, pr_author, validation_files, bypass)
        validation_markdown = format_report(validation)

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
