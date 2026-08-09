"""Hash files as Git will store them after clean filters run."""

from __future__ import annotations

import hashlib
import os
import subprocess
import tempfile
from pathlib import Path
from typing import Iterable


def git_blob_sha256(paths: Iterable[Path], *, cwd: Path) -> dict[Path, str] | None:
    """Return SHA-256 digests of staged Git blobs without touching the real index.

    A contributor may have CRLF files in the worktree while Git stores their LF
    form. Manifests are checked against repository bytes in trusted CI, so use
    a temporary index to mirror the pending ``git add`` result. ``None`` means
    that no usable Git repository/HEAD is available; callers can then retain
    their file-byte fallback for standalone package work.
    """
    unique_paths = list(dict.fromkeys(Path(path).resolve() for path in paths))
    if not unique_paths:
        return {}

    completed = subprocess.run(
        ["git", "rev-parse", "--show-toplevel"],
        cwd=cwd,
        capture_output=True,
        text=True,
        check=False,
    )
    if completed.returncode:
        return None
    repo_root = Path(completed.stdout.strip()).resolve()

    relative_paths: dict[Path, str] = {}
    for path in unique_paths:
        if not path.is_file():
            return None
        try:
            relative_paths[path] = path.relative_to(repo_root).as_posix()
        except ValueError:
            return None

    environment = os.environ.copy()
    with tempfile.TemporaryDirectory(prefix="haidian-manifest-index-") as directory:
        environment["GIT_INDEX_FILE"] = str(Path(directory) / "index")
        for command in (
            ["git", "read-tree", "HEAD"],
            ["git", "add", "--all", "--", *relative_paths.values()],
        ):
            staged = subprocess.run(
                command,
                cwd=repo_root,
                capture_output=True,
                env=environment,
                check=False,
            )
            if staged.returncode:
                return None

        digests: dict[Path, str] = {}
        for path, relative_path in relative_paths.items():
            blob = subprocess.run(
                ["git", "show", f":{relative_path}"],
                cwd=repo_root,
                capture_output=True,
                env=environment,
                check=False,
            )
            if blob.returncode:
                return None
            digests[path] = hashlib.sha256(blob.stdout).hexdigest()
    return digests
