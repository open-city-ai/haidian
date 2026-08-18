from __future__ import annotations

import hashlib
import re
from pathlib import Path


CSS_FORBIDDEN_PATTERNS = [
    (re.compile(r"@import\s+(?:url\s*\(\s*)?['\"]?(?:https?:)?//", re.I), "CSS must not import remote styles"),
    (re.compile(r"url\s*\(\s*['\"]?(?:https?:)?//", re.I), "CSS must not load remote assets"),
]
JS_FORBIDDEN_PATTERNS = [
    (re.compile(r"\bfetch\s*\(", re.I), "JavaScript must not call fetch()"),
    (re.compile(r"\bXMLHttpRequest\b", re.I), "JavaScript must not use XMLHttpRequest"),
    (re.compile(r"\bWebSocket\b", re.I), "JavaScript must not open WebSocket connections"),
    (re.compile(r"\bEventSource\b", re.I), "JavaScript must not open EventSource connections"),
    (re.compile(r"\bsendBeacon\s*\(", re.I), "JavaScript must not send beacon requests"),
]
LEGACY_VISUAL_TREES = {
    # Existing xiaowuzicode/token-block-jingzhang-ai-belt visual. The complete
    # executable tree is pinned so no modified or copied page inherits this
    # compatibility exception from its vendored three.js file alone.
    ("xiaowuzicode", "token-block-jingzhang-ai-belt"): (
        "bae59cb57c5fcad6d636bc287024dff2aa0a98ab3396060f4cf2156dceb5dc80"
    ),
}
GENERATED_LOCALIZED_VISUAL_INDEXES = {"index.en.html", "index.zh.html"}


def present_visual_code_assets(submission_dir: Path) -> list[tuple[str, Path]]:
    assets_root = submission_dir / "visual" / "assets"
    if not assets_root.is_dir() or assets_root.is_symlink():
        return []
    assets: list[tuple[str, Path]] = []
    for path in assets_root.rglob("*"):
        if path.is_symlink() or not path.is_file():
            continue
        if path.suffix.lower() not in {".css", ".js"}:
            continue
        assets.append((path.relative_to(submission_dir).as_posix(), path))
    return sorted(assets)


def visual_tree_digest(submission_dir: Path) -> str | None:
    visual_root = submission_dir / "visual"
    if not visual_root.is_dir() or visual_root.is_symlink():
        return None
    paths = sorted(
        path
        for path in visual_root.rglob("*")
        if path.is_file()
        and path.relative_to(visual_root).as_posix()
        not in GENERATED_LOCALIZED_VISUAL_INDEXES
    )
    if not paths or any(path.is_symlink() for path in paths):
        return None
    digest = hashlib.sha256()
    try:
        for path in paths:
            rel_path = path.relative_to(visual_root).as_posix()
            payload = path.read_bytes()
            digest.update(rel_path.encode("utf-8"))
            digest.update(b"\0")
            digest.update(str(len(payload)).encode("ascii"))
            digest.update(b"\0")
            digest.update(payload)
            digest.update(b"\0")
    except OSError:
        return None
    return digest.hexdigest()


def visual_code_asset_issues(submission_dir: Path) -> list[tuple[str, str]]:
    issues: list[tuple[str, str]] = []
    assets_root = submission_dir / "visual" / "assets"
    if assets_root.is_symlink():
        return [("visual/assets", "visual code asset paths must not use symbolic links")]
    if assets_root.is_dir():
        for path in assets_root.rglob("*"):
            if path.is_symlink():
                issues.append(
                    (
                        path.relative_to(submission_dir).as_posix(),
                        "visual code asset paths must not use symbolic links",
                    )
                )
    for rel_path, path in present_visual_code_assets(submission_dir):
        try:
            text = path.read_text(encoding="utf-8")
        except UnicodeDecodeError:
            issues.append((rel_path, "visual code assets must be UTF-8 text"))
            continue
        except OSError as exc:
            issues.append((rel_path, f"unable to read visual code asset: {exc}"))
            continue
        patterns = CSS_FORBIDDEN_PATTERNS if path.suffix.lower() == ".css" else JS_FORBIDDEN_PATTERNS
        issues.extend(
            (rel_path, message) for pattern, message in patterns if pattern.search(text)
        )
    package_identity = tuple(submission_dir.parts[-2:])
    legacy_digest = LEGACY_VISUAL_TREES.get(package_identity)
    if (
        issues
        and legacy_digest is not None
        and legacy_digest == visual_tree_digest(submission_dir)
    ):
        return []
    return issues
