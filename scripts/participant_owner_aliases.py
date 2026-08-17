"""Resolve maintainer-controlled participant login aliases.

Aliases are accepted only when both the current login and GitHub's stable
numeric user ID match the repository policy.  Invalid or unavailable policy
data always fails closed.
"""

from __future__ import annotations

import json
from pathlib import Path, PurePosixPath


PARTICIPANT_OWNER_ALIASES_PATH = "data/participant_owner_aliases.json"


def authorized_legacy_submission_dirs(
    repo_root: Path, github_user_id: object, current_login: str
) -> set[str]:
    """Return legacy package directories owned by a verified current identity."""
    if not isinstance(github_user_id, int) or isinstance(github_user_id, bool):
        return set()
    policy_path = repo_root / PARTICIPANT_OWNER_ALIASES_PATH
    try:
        policy = json.loads(policy_path.read_text(encoding="utf-8"))
    except (OSError, UnicodeDecodeError, json.JSONDecodeError):
        return set()
    aliases = policy.get("aliases") if isinstance(policy, dict) else None
    if not isinstance(aliases, list):
        return set()
    for item in aliases:
        if not isinstance(item, dict):
            continue
        configured_user_id = item.get("github_user_id")
        if (
            not isinstance(configured_user_id, int)
            or isinstance(configured_user_id, bool)
            or configured_user_id != github_user_id
        ):
            continue
        configured_login = item.get("current_login")
        if not isinstance(configured_login, str) or configured_login.casefold() != current_login.casefold():
            continue
        legacy_login = item.get("legacy_login")
        if not isinstance(legacy_login, str) or not legacy_login:
            return set()
        legacy_dirs = item.get("legacy_submission_dirs")
        if not isinstance(legacy_dirs, list):
            return set()
        result: set[str] = set()
        for value in legacy_dirs:
            if not isinstance(value, str):
                return set()
            parts = PurePosixPath(value).parts
            if (
                len(parts) != 3
                or parts[0] != "submissions"
                or parts[1] != legacy_login
                or ".." in parts
            ):
                return set()
            result.add(PurePosixPath(value).as_posix())
        return result
    return set()
