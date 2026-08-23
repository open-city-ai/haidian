"""Hash files as Git will store them after trusted clean filters run."""

from __future__ import annotations

import hashlib
import os
import subprocess
import tempfile
from pathlib import Path
from typing import Iterable


def git_blob_sha256(paths: Iterable[Path], *, cwd: Path) -> dict[Path, str] | None:
    """Return SHA-256 digests of pending Git blobs without touching the real index.

    A contributor may have CRLF files in the worktree while Git stores their LF
    form. Manifests are checked against repository bytes in trusted CI, so use
    a temporary index to mirror the pending ``git add`` result. ``None`` means
    that no Git repository is available; callers can retain their file-byte
    fallback for standalone packages. Once a repository is found, failures are
    fatal so callers cannot silently hash bytes Git would refuse to stage.
    """
    unique_paths = list(dict.fromkeys(Path(path).resolve() for path in paths))
    if not unique_paths:
        return {}

    completed = subprocess.run(
        ["git", "rev-parse", "--show-toplevel"],
        cwd=cwd,
        capture_output=True,
        text=True,
        encoding="utf-8",
        errors="replace",
        check=False,
    )
    if completed.returncode:
        return None
    repo_root = Path(completed.stdout.strip()).resolve()

    relative_paths: dict[Path, str] = {}
    for path in unique_paths:
        if not path.is_file():
            raise RuntimeError(f"Git blob path is not a regular file: {path}")
        try:
            relative_paths[path] = path.relative_to(repo_root).as_posix()
        except ValueError:
            raise RuntimeError(f"Git blob path is outside the repository: {path}") from None

    environment = os.environ.copy()
    with tempfile.TemporaryDirectory(prefix="haidian-manifest-index-") as directory:
        temporary_root = Path(directory)
        environment["GIT_INDEX_FILE"] = str(temporary_root / "index")
        empty_global_excludes = temporary_root / "global-excludes"
        empty_global_excludes.write_text("", encoding="utf-8")
        staged = subprocess.run(
            # User-level excludes must not change deterministic manifest
            # hashes. Override only core.excludesFile; repository .gitignore
            # and .git/info/exclude rules remain fail-closed.
            [
                "git",
                "-c",
                f"core.excludesFile={empty_global_excludes}",
                "add",
                "--all",
                "--",
                *relative_paths.values(),
            ],
            cwd=repo_root,
            capture_output=True,
            env=environment,
            check=False,
        )
        if staged.returncode:
            detail = staged.stderr.decode(errors="replace").strip()
            raise RuntimeError(f"Git could not stage manifest paths: {detail or 'unknown error'}")

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
                detail = blob.stderr.decode(errors="replace").strip()
                raise RuntimeError(
                    f"Git could not read the pending blob for {relative_path}: "
                    f"{detail or 'path was not staged'}"
                )
            digests[path] = hashlib.sha256(blob.stdout).hexdigest()
    return digests
