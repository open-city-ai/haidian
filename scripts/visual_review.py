#!/usr/bin/env python3
"""Check a submission's static visual packaging and safety requirements.

The page is treated as a presentation artifact. This script never executes
contributor JavaScript; it only checks static safety markers and consistency
with machine-readable metrics.
"""

from __future__ import annotations

import argparse
import html
import json
import re
from dataclasses import dataclass, field
from pathlib import Path
from typing import Any


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
    (re.compile(r"@import\s+url\s*\(\s*['\"]?(?:https?:)?//", re.I), "HTML/CSS must not import remote styles"),
    (re.compile(r"url\s*\(\s*['\"]?(?:https?:)?//", re.I), "HTML/CSS must not load remote assets"),
    (re.compile(r"<script\b[^>]*\bsrc\s*=\s*['\"]?(?:https?:)?//", re.I), "HTML must not load remote scripts"),
    (re.compile(r"<link\b[^>]*\bhref\s*=\s*['\"]?(?:https?:)?//", re.I), "HTML must not load remote linked resources"),
    (re.compile(r"<(?:img|source|video|audio)\b[^>]*\bsrc\s*=\s*['\"]?(?:https?:)?//", re.I), "HTML must not load remote media"),
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


def extract_visual_metrics(text: str) -> dict[str, float]:
    metrics: dict[str, float] = {}
    pattern = re.compile(
        r"data-metric\s*=\s*['\"]([^'\"]+)['\"][^>]*data-value\s*=\s*['\"]([^'\"]+)['\"]",
        re.I,
    )
    for name, raw_value in pattern.findall(text):
        try:
            metrics[html.unescape(name)] = float(raw_value)
        except ValueError:
            continue
    return metrics


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

    declared = extract_visual_metrics(text)
    report.metrics_seen = declared
    metrics = load_metrics(submission_dir / "metrics.json")
    for name in REQUIRED_METRICS:
        if name not in declared:
            report.add("VISUAL_METRIC_MISSING", "major", display_path, f"Missing data-metric `{name}`.")
            continue
        metric = metrics.get(name)
        if not isinstance(metric, dict) or metric.get("status") != "known":
            report.add("VISUAL_METRIC_SOURCE_MISSING", "major", display_path, f"`metrics.json` has no known metric `{name}`.")
            continue
        expected = metric.get("value")
        if not isinstance(expected, (int, float)):
            report.add("VISUAL_METRIC_SOURCE_MISSING", "major", display_path, f"`metrics.json` metric `{name}` has no numeric value.")
            continue
        tolerance = max(abs(float(expected)) * 1e-6, 1e-6)
        if abs(declared[name] - float(expected)) > tolerance:
            report.add(
                "VISUAL_METRIC_MISMATCH",
                "major",
                display_path,
                f"HTML metric `{name}` value {declared[name]} does not match metrics.json value {expected}.",
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
    parser = argparse.ArgumentParser()
    parser.add_argument("submission_dir")
    parser.add_argument("--json", action="store_true")
    parser.add_argument("--markdown", action="store_true")
    args = parser.parse_args()

    report = review_visual(Path(args.submission_dir))
    if args.json:
        print(json.dumps(report.to_dict(), ensure_ascii=False, indent=2))
    else:
        print(format_markdown(report))
    return 0 if report.ok else 1


if __name__ == "__main__":
    raise SystemExit(main())
