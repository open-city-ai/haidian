#!/usr/bin/env python3
"""Check a submission's static visual packaging and safety requirements.

The page is treated as a presentation artifact. This script never executes
contributor JavaScript; it only checks static safety markers and consistency
with machine-readable metrics.

Checks performed
----------------
- ``visual/index.html`` exists and is valid UTF-8.
- The page contains no remote-resource patterns (no ``<iframe>``, ``fetch()``,
  ``WebSocket``, remote ``<script src>``, remote CSS ``@import``, etc.).
- SVG files under ``visual/assets`` are well-formed, passive, and self-contained.
- The page contains the 14 required Chinese-language content markers
  (总览地图, 三层范围, 重点区域, …).
- Metric ``data-metric`` / ``data-value`` attributes declare finite numeric
  values that match ``metrics.json`` within a 1 ppm tolerance.
- The three required metrics (``site_area_sqm``, ``green_ratio``,
  ``public_space_ratio``) are present and declared.

Usage
-----
Human-readable output::

    python3 scripts/visual_review.py submissions/<login>/<slug>

Machine-readable JSON::

    python3 scripts/visual_review.py submissions/<login>/<slug> --json

This script is gate 3 of the four-gate self-check. Run it directly or through
``self_check_submission.py``; there are no optional dependencies.
"""

from __future__ import annotations

import argparse
import html
import json
import math
import re
from dataclasses import dataclass, field
from html.parser import HTMLParser
from pathlib import Path
from typing import Any

from metric_types import is_json_number
from svg_asset_safety import visual_svg_asset_issues


REQUIRED_TEXT_MARKERS = [
    "总览地图",
    "三层范围",
    "重点区域",
    "用地分区",
    "交通慢行",
    "蓝绿公共空间",
    "建筑",
    "更新项目",
    "AI 场景",
    "核心指标",
    "任务覆盖",
    "自检状态",
    "来源",
    "假设",
]
REQUIRED_METRICS = ["site_area_sqm", "green_ratio", "public_space_ratio"]
FORBIDDEN_PATTERNS = [
    (re.compile(r"<iframe\b", re.I), "HTML must not contain iframe embeds"),
    (re.compile(r"<form\b", re.I), "HTML must not contain form submission UI"),
    (re.compile(r"\bfetch\s*\(", re.I), "HTML must not call fetch()"),
    (re.compile(r"\bXMLHttpRequest\b", re.I), "HTML must not use XMLHttpRequest"),
    (re.compile(r"\bWebSocket\b", re.I), "HTML must not open WebSocket connections"),
    (re.compile(r"\bEventSource\b", re.I), "HTML must not open EventSource connections"),
    (re.compile(r"\bsendBeacon\s*\(", re.I), "HTML must not send beacon requests"),
    (re.compile(r"@import\s+(?:url\s*\(\s*)?['\"]?(?:https?:)?//", re.I), "HTML/CSS must not import remote styles"),
    (re.compile(r"url\s*\(\s*['\"]?(?:https?:)?//", re.I), "HTML/CSS must not load remote assets"),
    (re.compile(r"<script\b[^>]*\bsrc\s*=\s*['\"]?(?:https?:)?//", re.I), "HTML must not load remote scripts"),
    (re.compile(r"<link\b[^>]*\bhref\s*=\s*['\"]?(?:https?:)?//", re.I), "HTML must not load remote linked resources"),
    (re.compile(r"<(?:img|source|video|audio)\b[^>]*\bsrc\s*=\s*['\"]?(?:https?:)?//", re.I), "HTML must not load remote media"),
    (re.compile(r"<(?:video|audio)\b[^>]*\bautoplay\b", re.I), "HTML must not autoplay media"),
]


@dataclass
class VisualIssue:
    check_id: str
    severity: str
    path: str
    message: str


@dataclass
class VisualReport:
    ok: bool = True
    issues: list[VisualIssue] = field(default_factory=list)
    metrics_seen: dict[str, float] = field(default_factory=dict)

    def add(self, check_id: str, severity: str, path: str, message: str) -> None:
        self.issues.append(VisualIssue(check_id, severity, path, message))
        if severity in {"blocking", "major"}:
            self.ok = False

    def to_dict(self) -> dict[str, Any]:
        return {
            "ok": self.ok,
            "issues": [issue.__dict__ for issue in self.issues],
            "metrics_seen": self.metrics_seen,
        }


def load_metrics(path: Path) -> dict[str, Any]:
    if not path.exists():
        return {}
    try:
        data = json.loads(path.read_text(encoding="utf-8"))
    except (UnicodeDecodeError, json.JSONDecodeError):
        return {}
    metrics = data.get("metrics")
    return metrics if isinstance(metrics, dict) else {}


class VisualMetricParser(HTMLParser):
    """Collect numeric metric declarations without depending on attribute order."""

    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.metrics: dict[str, float] = {}
        self.declarations: list[tuple[str, float]] = []
        self.nonfinite_metrics: set[str] = set()

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        attributes = {name.lower(): value for name, value in attrs}
        name = attributes.get("data-metric")
        raw_value = attributes.get("data-value")
        if not isinstance(name, str) or not isinstance(raw_value, str):
            return
        name = html.unescape(name)
        try:
            value = float(html.unescape(raw_value))
        except ValueError:
            return
        if not math.isfinite(value):
            self.nonfinite_metrics.add(name)
            return
        self.declarations.append((name, value))
        self.metrics[name] = value

    def handle_startendtag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        self.handle_starttag(tag, attrs)


def extract_visual_metrics(text: str) -> dict[str, float]:
    parser = VisualMetricParser()
    parser.feed(text)
    parser.close()
    return parser.metrics


def review_visual(submission_dir: Path) -> VisualReport:
    report = VisualReport()
    index_path = submission_dir / "visual" / "index.html"
    display_path = "visual/index.html"
    if not index_path.exists():
        report.add("VISUAL_HTML_MISSING", "blocking", display_path, "Missing required static visualization page.")
        return report
    try:
        text = index_path.read_text(encoding="utf-8")
    except UnicodeDecodeError:
        report.add("VISUAL_HTML_ENCODING", "blocking", display_path, "visual/index.html must be UTF-8 text.")
        return report

    for pattern, message in FORBIDDEN_PATTERNS:
        if pattern.search(text):
            report.add("VISUAL_REMOTE_OR_ACTIVE_CONTENT", "blocking", display_path, message)
    for rel_path, message in visual_svg_asset_issues(submission_dir):
        report.add("VISUAL_REMOTE_OR_ACTIVE_CONTENT", "blocking", rel_path, message)

    plain = re.sub(r"<[^>]+>", " ", text)
    plain = html.unescape(re.sub(r"\s+", " ", plain))
    for marker in REQUIRED_TEXT_MARKERS:
        if marker not in plain:
            report.add(
                "VISUAL_REQUIRED_SECTION_MISSING",
                "major",
                display_path,
                f"Visualization must visibly include `{marker}`.",
            )

    parser = VisualMetricParser()
    parser.feed(text)
    parser.close()
    declarations = parser.declarations
    declared = parser.metrics
    report.metrics_seen = declared
    metrics = load_metrics(submission_dir / "metrics.json")
    for name in sorted(parser.nonfinite_metrics):
        report.add(
            "VISUAL_METRIC_NONFINITE_VALUE",
            "major",
            display_path,
            f"HTML metric `{name}` must use a finite numeric data-value.",
        )
    for name, value in declarations:
        metric = metrics.get(name)
        if not isinstance(metric, dict):
            report.add(
                "VISUAL_METRIC_SOURCE_MISSING",
                "major",
                display_path,
                f"HTML declares unregistered metric `{name}`; add it to metrics.json before displaying a numeric value.",
            )
            continue
        if metric.get("status") != "known":
            issue_id = "VISUAL_METRIC_SOURCE_MISSING" if name in REQUIRED_METRICS else "VISUAL_METRIC_NON_KNOWN_CLAIM"
            report.add(
                issue_id,
                "major",
                display_path,
                f"HTML declares numeric metric `{name}` but metrics.json status is `{metric.get('status')!r}`; unknown or not_applicable metrics must remain explicitly non-numeric.",
            )
            continue
        expected = metric.get("value")
        if not is_json_number(expected):
            report.add(
                "VISUAL_METRIC_SOURCE_MISSING",
                "major",
                display_path,
                f"`metrics.json` metric `{name}` has no numeric value.",
            )
            continue
        tolerance = max(abs(float(expected)) * 1e-6, 1e-6)
        if abs(value - float(expected)) > tolerance:
            report.add(
                "VISUAL_METRIC_MISMATCH",
                "major",
                display_path,
                f"HTML metric `{name}` value {value} does not match metrics.json value {expected}.",
            )
    for name in REQUIRED_METRICS:
        if name not in declared:
            metric = metrics.get(name)
            status = metric.get("status") if isinstance(metric, dict) else None
            detail = f" (metrics.json status is `{status}`)" if status is not None else ""
            report.add(
                "VISUAL_METRIC_MISSING",
                "major",
                display_path,
                f"Missing numeric data-metric `{name}`{detail}. Formal core visual metrics must be known finite "
                "design-model outputs recomputable from submitted geometry; add or repair the relevant geometry "
                "and metric, then declare its matching numeric data-value. Do not substitute unknown, "
                "not_applicable, or a geometry-free placeholder.",
            )
    return report


def format_markdown(report: VisualReport) -> str:
    lines = ["# Visual packaging check", "", f"Result: {'PASS' if report.ok else 'FAIL'}"]
    if report.metrics_seen:
        lines.extend(["", "Metrics seen:"])
        for name, value in sorted(report.metrics_seen.items()):
            lines.append(f"- `{name}`: {value}")
    if report.issues:
        lines.extend(["", "Issues:"])
        for issue in report.issues:
            lines.append(f"- `{issue.check_id}` [{issue.severity}] {issue.path}: {issue.message}")
    return "\n".join(lines)


def main() -> int:
    parser = argparse.ArgumentParser(
        description=__doc__,
        formatter_class=argparse.RawDescriptionHelpFormatter,
    )
    parser.add_argument(
        "submission_dir",
        help="Path to the proposal directory, e.g. submissions/<login>/<slug>",
    )
    parser.add_argument(
        "--json",
        action="store_true",
        help="Emit machine-readable JSON instead of human-readable Markdown",
    )
    parser.add_argument(
        "--markdown",
        action="store_true",
        help="Emit Markdown output (default when --json is not passed)",
    )
    args = parser.parse_args()

    report = review_visual(Path(args.submission_dir))
    if args.json:
        print(json.dumps(report.to_dict(), ensure_ascii=False, indent=2))
    else:
        print(format_markdown(report))
    return 0 if report.ok else 1


if __name__ == "__main__":
    raise SystemExit(main())
