#!/usr/bin/env python3
"""Check a submission's static visual packaging, rendering, and safety requirements.

The page is treated as a presentation artifact. This script never executes
contributor JavaScript; it checks static safety markers, consistency with
machine-readable metrics, and whether submitted drawing PDFs render with
more than a near-blank amount of visible content.
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

try:
    import fitz
    from PIL import Image
except ImportError:  # pragma: no cover - covered by the self-check dependency gate.
    fitz = None
    Image = None


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
DRAWINGS_DIRECTORY = "drawings"
PDF_RENDER_MAX_EDGE = 1024
PDF_GRID_SIZE = 12
PAPER_CHANNEL_THRESHOLD = 245
MIN_GRID_CELL_INK_RATIO = 0.002
# These thresholds intentionally identify only an almost empty rendered page.
# They are not a general score for visual quality: sparse but usable pages still
# need a human reviewer, who receives an advisory instead of an automatic fail.
NEAR_BLANK_MAX_INK_RATIO = 0.04
NEAR_BLANK_MAX_BBOX_RATIO = 0.40
NEAR_BLANK_MAX_OCCUPIED_CELLS = 36
SPARSE_PAGE_MAX_INK_RATIO = 0.09
SPARSE_PAGE_MAX_BBOX_RATIO = 0.55
SPARSE_PAGE_MAX_OCCUPIED_CELLS = 54
# A two-row band in the 12x12 screen is already 16.7% of the page.  Keep this
# as a minor advisory: paper margins and intentional whitespace must remain a
# human decision, but a large internal blank band should not disappear behind
# a healthy whole-page ink ratio.
LARGE_BLANK_RECT_MIN_RATIO = 0.15
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


def measure_rendered_page_content(page: Any) -> dict[str, float | int]:
    """Measure non-paper coverage from a bounded low-resolution PDF render."""
    if fitz is None or Image is None:
        raise RuntimeError("PyMuPDF and Pillow are required to inspect drawing PDFs.")

    longest_edge = max(float(page.rect.width), float(page.rect.height))
    if longest_edge <= 0:
        raise ValueError("PDF page has no renderable size.")
    scale = min(1.0, PDF_RENDER_MAX_EDGE / longest_edge)
    pixmap = page.get_pixmap(
        matrix=fitz.Matrix(scale, scale),
        colorspace=fitz.csRGB,
        alpha=False,
    )
    image = Image.frombytes("RGB", (pixmap.width, pixmap.height), pixmap.samples)
    width, height = image.size
    pixels = image.load()
    cell_ink = [0] * (PDF_GRID_SIZE * PDF_GRID_SIZE)
    cell_totals = [0] * (PDF_GRID_SIZE * PDF_GRID_SIZE)
    ink_pixels = 0
    min_x, min_y = width, height
    max_x = max_y = -1

    for y in range(height):
        row = min(PDF_GRID_SIZE - 1, y * PDF_GRID_SIZE // height)
        for x in range(width):
            column = min(PDF_GRID_SIZE - 1, x * PDF_GRID_SIZE // width)
            cell_index = row * PDF_GRID_SIZE + column
            cell_totals[cell_index] += 1
            red, green, blue = pixels[x, y]
            if min(red, green, blue) >= PAPER_CHANNEL_THRESHOLD:
                continue
            ink_pixels += 1
            cell_ink[cell_index] += 1
            min_x = min(min_x, x)
            min_y = min(min_y, y)
            max_x = max(max_x, x)
            max_y = max(max_y, y)

    total_pixels = width * height
    if not ink_pixels:
        return {
            "ink_ratio": 0.0,
            "bbox_ratio": 0.0,
            "occupied_cells": 0,
            "largest_blank_rect_ratio": 1.0,
        }
    bbox_pixels = (max_x - min_x + 1) * (max_y - min_y + 1)
    occupied_cells = sum(
        ink / total >= MIN_GRID_CELL_INK_RATIO
        for ink, total in zip(cell_ink, cell_totals)
        if total
    )
    blank_cells = [
        ink / total < MIN_GRID_CELL_INK_RATIO if total else True
        for ink, total in zip(cell_ink, cell_totals)
    ]
    largest_blank_cells = 0
    heights = [0] * PDF_GRID_SIZE
    for row in range(PDF_GRID_SIZE):
        for column in range(PDF_GRID_SIZE):
            cell_index = row * PDF_GRID_SIZE + column
            heights[column] = heights[column] + 1 if blank_cells[cell_index] else 0
        stack: list[int] = []
        for column in range(PDF_GRID_SIZE + 1):
            current_height = heights[column] if column < PDF_GRID_SIZE else 0
            while stack and current_height < heights[stack[-1]]:
                height_index = stack.pop()
                left = stack[-1] + 1 if stack else 0
                largest_blank_cells = max(
                    largest_blank_cells,
                    heights[height_index] * (column - left),
                )
            stack.append(column)
    return {
        "ink_ratio": ink_pixels / total_pixels,
        "bbox_ratio": bbox_pixels / total_pixels,
        "occupied_cells": occupied_cells,
        "largest_blank_rect_ratio": largest_blank_cells / (PDF_GRID_SIZE * PDF_GRID_SIZE),
    }


def review_drawing_pdfs(submission_dir: Path, report: VisualReport) -> None:
    drawings_dir = submission_dir / DRAWINGS_DIRECTORY
    pdf_paths = sorted(drawings_dir.rglob("*.pdf")) if drawings_dir.exists() else []
    if not pdf_paths:
        return
    if fitz is None or Image is None:
        report.add(
            "DRAWING_PDF_REVIEW_UNAVAILABLE",
            "blocking",
            DRAWINGS_DIRECTORY,
            "PyMuPDF and Pillow are required to inspect rendered drawing PDFs. "
            "Install with: python3 -m pip install -r requirements-review.txt",
        )
        return

    for pdf_path in pdf_paths:
        display_path = str(pdf_path.relative_to(submission_dir))
        try:
            with fitz.open(pdf_path) as document:
                if not len(document):
                    report.add(
                        "DRAWING_PDF_NO_PAGES",
                        "major",
                        display_path,
                        "Drawing PDF has no renderable pages.",
                    )
                    continue
                for page_number, page in enumerate(document, start=1):
                    coverage = measure_rendered_page_content(page)
                    ink_ratio = float(coverage["ink_ratio"])
                    bbox_ratio = float(coverage["bbox_ratio"])
                    occupied_cells = int(coverage["occupied_cells"])
                    largest_blank_rect_ratio = float(coverage["largest_blank_rect_ratio"])
                    details = (
                        f"page {page_number}: {ink_ratio:.2%} non-paper pixels, "
                        f"{bbox_ratio:.2%} content bounding box, "
                        f"{occupied_cells}/{PDF_GRID_SIZE * PDF_GRID_SIZE} occupied grid cells, "
                        f"largest blank block {largest_blank_rect_ratio:.2%}"
                    )
                    if (
                        ink_ratio <= NEAR_BLANK_MAX_INK_RATIO
                        and bbox_ratio <= NEAR_BLANK_MAX_BBOX_RATIO
                        and occupied_cells <= NEAR_BLANK_MAX_OCCUPIED_CELLS
                    ):
                        report.add(
                            "DRAWING_PAGE_NEAR_BLANK",
                            "major",
                            display_path,
                            f"Rendered drawing is near blank ({details}). Add substantial readable board content.",
                        )
                    elif (
                        ink_ratio <= SPARSE_PAGE_MAX_INK_RATIO
                        and bbox_ratio <= SPARSE_PAGE_MAX_BBOX_RATIO
                        and occupied_cells <= SPARSE_PAGE_MAX_OCCUPIED_CELLS
                    ):
                        report.add(
                            "DRAWING_PAGE_SPARSE_LAYOUT",
                            "minor",
                            display_path,
                            f"Rendered drawing is unusually sparse ({details}); human review should confirm layout readability.",
                        )
                    elif largest_blank_rect_ratio >= LARGE_BLANK_RECT_MIN_RATIO:
                        report.add(
                            "DRAWING_PAGE_LARGE_BLANK_REGION",
                            "minor",
                            display_path,
                            f"Rendered drawing leaves a large contiguous blank region ({details}); human review should confirm that the board is intentionally composed rather than underfilled.",
                        )
        except Exception as exc:  # MuPDF uses format-specific exception subclasses.
            report.add(
                "DRAWING_PDF_UNREADABLE",
                "major",
                display_path,
                f"Drawing PDF could not be rendered: {exc}",
            )


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
        if not isinstance(expected, (int, float)):
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
            report.add("VISUAL_METRIC_MISSING", "major", display_path, f"Missing data-metric `{name}`.")
    review_drawing_pdfs(submission_dir, report)
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
