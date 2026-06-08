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
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path
from typing import Any

from validate_submission import format_report, validate_submission


COMMENT_MARKER = "<!-- haidian-submission-validation -->"
API_ROOT = "https://api.github.com"


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
        with urllib.request.urlopen(request, timeout=60) as response:
            raw = response.read().decode("utf-8")
            parsed = json.loads(raw) if raw else None
            return parsed, dict(response.headers.items())

    def paginate(self, path: str) -> list[dict]:
        url = f"{API_ROOT}{path}"
        results: list[dict] = []
        while url:
            page, headers = self.request("GET", url)
            results.extend(page)
            url = next_link(headers.get("Link", ""))
        return results

    def download_raw(self, raw_url: str, destination: Path, max_bytes: int = 6 * 1024 * 1024) -> None:
        request = urllib.request.Request(
            raw_url,
            headers={
                "Authorization": f"Bearer {self.token}",
                "Accept": "application/vnd.github.raw",
            },
        )
        with urllib.request.urlopen(request, timeout=60) as response:
            content = response.read(max_bytes + 1)
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

    worktree = Path(tempfile.mkdtemp(prefix="haidian-pr-"))
    try:
        for item in files:
            filename = item["filename"]
            if item.get("status") == "removed":
                continue
            raw_url = item.get("raw_url")
            if not raw_url:
                continue
            client.download_raw(raw_url, worktree / filename)

        for proposal_path in proposal_paths_for(changed_files):
            destination = worktree / proposal_path
            if not destination.exists():
                client.fetch_content(head_repo, proposal_path, head_sha, destination)

        bypass = [
            item.strip()
            for item in os.getenv("MAINTAINER_BYPASS_LOGINS", "").split(",")
            if item.strip()
        ]
        validation = validate_submission(worktree, pr_author, changed_files, bypass)
        validation_markdown = format_report(validation)

        comment = (
            f"{COMMENT_MARKER}\n"
            "# Haidian Submission Validation\n\n"
            f"{validation_markdown}\n\n"
            "> This CI check is deterministic. It does not call AI models and does not make content-quality judgments."
        )
        write_step_summary(comment)
        client.upsert_comment(pr_number, comment)

        return 0 if validation.ok else 1
    finally:
        shutil.rmtree(worktree, ignore_errors=True)


if __name__ == "__main__":
    raise SystemExit(main())

