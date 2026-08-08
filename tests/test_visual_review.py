import json
import sys
import tempfile
import unittest
from pathlib import Path

import fitz


REPO_ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(REPO_ROOT / "scripts"))

from visual_review import review_visual  # noqa: E402


VALID_HTML = """<!doctype html>
<html lang="zh-CN"><head><meta charset="utf-8"><title>Visual</title></head>
<body>
<h1>总览地图</h1>
<p>三层范围 重点区域 用地分区 交通慢行 蓝绿公共空间 建筑 更新项目 AI 场景 核心指标 任务覆盖 自检状态 来源 假设</p>
<span data-metric="site_area_sqm" data-value="100">100</span>
<span data-metric="green_ratio" data-value="0.2">0.2</span>
<span data-metric="public_space_ratio" data-value="0.1">0.1</span>
</body></html>
"""


def write_valid_visual_package(root: Path) -> Path:
    submission = root / "submissions" / "alice" / "visual-ok"
    (submission / "visual").mkdir(parents=True)
    (submission / "visual" / "index.html").write_text(VALID_HTML, encoding="utf-8")
    (submission / "metrics.json").write_text(
        json.dumps(
            {
                "metrics": {
                    "site_area_sqm": {"status": "known", "value": 100},
                    "green_ratio": {"status": "known", "value": 0.2},
                    "public_space_ratio": {"status": "known", "value": 0.1},
                }
            }
        ),
        encoding="utf-8",
    )
    return submission


def write_drawing_pdf(path: Path, *, sparse: bool) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    document = fitz.open()
    page = document.new_page(width=842, height=1191)
    if sparse:
        page.insert_text((32, 40), "Minimal board label", fontsize=12, color=(0, 0, 0))
    else:
        page.draw_rect(fitz.Rect(40, 40, 802, 1151), color=(0, 0, 0), fill=(0.15, 0.35, 0.55))
        page.insert_text((80, 120), "Substantial board content", fontsize=30, color=(1, 1, 1))
    document.save(path)
    document.close()


def write_top_heavy_drawing_pdf(path: Path) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    document = fitz.open()
    page = document.new_page(width=842, height=1191)
    page.draw_rect(fitz.Rect(40, 40, 802, 470), color=(0, 0, 0), fill=(0.15, 0.35, 0.55))
    page.insert_text((80, 120), "Top-heavy board content", fontsize=30, color=(1, 1, 1))
    document.save(path)
    document.close()


def write_border_only_drawing_pdf(path: Path) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    document = fitz.open()
    page = document.new_page(width=842, height=1191)
    page.draw_rect(fitz.Rect(20, 20, 822, 1171), color=(0, 0, 0), width=1)
    document.save(path)
    document.close()


def write_uniform_drawing_pdf(path: Path) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    document = fitz.open()
    page = document.new_page(width=842, height=1191)
    page.draw_rect(page.rect, color=(0.15, 0.35, 0.55), fill=(0.15, 0.35, 0.55))
    document.save(path)
    document.close()


class VisualReviewTests(unittest.TestCase):
    def test_valid_static_visual_passes(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            submission = write_valid_visual_package(Path(tmp))
            report = review_visual(submission)
            self.assertTrue(report.ok, [issue.__dict__ for issue in report.issues])

    def test_missing_html_fails(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            submission = Path(tmp) / "submissions" / "alice" / "missing"
            submission.mkdir(parents=True)
            report = review_visual(submission)
            self.assertFalse(report.ok)
            self.assertIn("VISUAL_HTML_MISSING", {issue.check_id for issue in report.issues})

    def test_remote_script_fails(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            submission = write_valid_visual_package(Path(tmp))
            html = VALID_HTML.replace("</head>", '<script src="https://cdn.example.com/app.js"></script></head>')
            (submission / "visual" / "index.html").write_text(html, encoding="utf-8")
            report = review_visual(submission)
            self.assertFalse(report.ok)
            self.assertIn("VISUAL_REMOTE_OR_ACTIVE_CONTENT", {issue.check_id for issue in report.issues})

    def test_fetch_external_url_fails(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            submission = write_valid_visual_package(Path(tmp))
            html = VALID_HTML.replace("</body>", '<script>fetch("https://example.com/data.json")</script></body>')
            (submission / "visual" / "index.html").write_text(html, encoding="utf-8")
            report = review_visual(submission)
            self.assertFalse(report.ok)
            self.assertIn("VISUAL_REMOTE_OR_ACTIVE_CONTENT", {issue.check_id for issue in report.issues})

    def test_metric_mismatch_fails(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            submission = write_valid_visual_package(Path(tmp))
            html = VALID_HTML.replace('data-metric="green_ratio" data-value="0.2"', 'data-metric="green_ratio" data-value="0.9"')
            (submission / "visual" / "index.html").write_text(html, encoding="utf-8")
            report = review_visual(submission)
            self.assertFalse(report.ok)
            self.assertIn("VISUAL_METRIC_MISMATCH", {issue.check_id for issue in report.issues})

    def test_metric_attribute_order_does_not_change_validation(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            submission = write_valid_visual_package(Path(tmp))
            html = VALID_HTML.replace(
                'data-metric="green_ratio" data-value="0.2"',
                'data-value="0.2" data-metric="green_ratio"',
            )
            (submission / "visual" / "index.html").write_text(html, encoding="utf-8")

            report = review_visual(submission)

        self.assertTrue(report.ok, [issue.__dict__ for issue in report.issues])
        self.assertEqual(0.2, report.metrics_seen["green_ratio"])

    def test_unknown_extra_metric_claim_fails(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            submission = write_valid_visual_package(Path(tmp))
            metrics_path = submission / "metrics.json"
            metrics = json.loads(metrics_path.read_text(encoding="utf-8"))
            metrics["metrics"]["floor_area_ratio"] = {
                "status": "unknown",
                "value": None,
                "reason": "Official planning controls are not available.",
            }
            metrics_path.write_text(json.dumps(metrics), encoding="utf-8")
            html = VALID_HTML.replace(
                "</body>",
                '<span data-metric="floor_area_ratio" data-value="2.0">2.0</span></body>',
            )
            (submission / "visual" / "index.html").write_text(html, encoding="utf-8")

            report = review_visual(submission)

            self.assertFalse(report.ok)
            self.assertIn("VISUAL_METRIC_NON_KNOWN_CLAIM", {issue.check_id for issue in report.issues})

    def test_unknown_extra_metric_claim_is_order_independent(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            submission = write_valid_visual_package(Path(tmp))
            metrics_path = submission / "metrics.json"
            metrics = json.loads(metrics_path.read_text(encoding="utf-8"))
            metrics["metrics"]["floor_area_ratio"] = {
                "status": "unknown",
                "value": None,
                "reason": "Official planning controls are not available.",
            }
            metrics_path.write_text(json.dumps(metrics), encoding="utf-8")
            html = VALID_HTML.replace(
                "</body>",
                '<span data-value="2.0" data-metric="floor_area_ratio">2.0</span></body>',
            )
            (submission / "visual" / "index.html").write_text(html, encoding="utf-8")

            report = review_visual(submission)

            self.assertFalse(report.ok)
            self.assertIn("VISUAL_METRIC_NON_KNOWN_CLAIM", {issue.check_id for issue in report.issues})

    def test_unregistered_extra_metric_claim_fails(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            submission = write_valid_visual_package(Path(tmp))
            html = VALID_HTML.replace(
                "</body>",
                '<span data-metric="unregistered_ratio" data-value="0.4">0.4</span></body>',
            )
            (submission / "visual" / "index.html").write_text(html, encoding="utf-8")

            report = review_visual(submission)

            self.assertFalse(report.ok)
            self.assertIn("VISUAL_METRIC_SOURCE_MISSING", {issue.check_id for issue in report.issues})

    def test_nonfinite_metric_cannot_bypass_consistency_check(self) -> None:
        for raw_value in ["NaN", "Inf"]:
            with self.subTest(raw_value=raw_value), tempfile.TemporaryDirectory() as tmp:
                submission = write_valid_visual_package(Path(tmp))
                html = VALID_HTML.replace(
                    'data-metric="green_ratio" data-value="0.2"',
                    f'data-metric="green_ratio" data-value="{raw_value}"',
                )
                (submission / "visual" / "index.html").write_text(html, encoding="utf-8")

                report = review_visual(submission)

            self.assertFalse(report.ok)
            self.assertIn("VISUAL_METRIC_NONFINITE_VALUE", {issue.check_id for issue in report.issues})

    def test_near_blank_drawing_page_fails(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            submission = write_valid_visual_package(Path(tmp))
            write_drawing_pdf(submission / "drawings" / "a0-boards.pdf", sparse=True)
            report = review_visual(submission)
            self.assertFalse(report.ok)
            self.assertIn("DRAWING_PAGE_NEAR_BLANK", {issue.check_id for issue in report.issues})

    def test_near_blank_localized_drawing_page_fails(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            submission = write_valid_visual_package(Path(tmp))
            write_drawing_pdf(submission / "drawings" / "a0-boards.en.pdf", sparse=True)
            report = review_visual(submission)
            self.assertFalse(report.ok)
            self.assertIn("DRAWING_PAGE_NEAR_BLANK", {issue.check_id for issue in report.issues})

    def test_border_only_drawing_page_fails(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            submission = write_valid_visual_package(Path(tmp))
            write_border_only_drawing_pdf(submission / "drawings" / "a0-boards.pdf")
            report = review_visual(submission)
            self.assertFalse(report.ok)
            self.assertIn("DRAWING_PAGE_NEAR_BLANK", {issue.check_id for issue in report.issues})

    def test_uniform_drawing_page_fails(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            submission = write_valid_visual_package(Path(tmp))
            write_uniform_drawing_pdf(submission / "drawings" / "a0-boards.pdf")
            report = review_visual(submission)
            self.assertFalse(report.ok)
            self.assertIn("DRAWING_PAGE_NEAR_UNIFORM", {issue.check_id for issue in report.issues})

    def test_substantial_drawing_page_passes(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            submission = write_valid_visual_package(Path(tmp))
            write_drawing_pdf(submission / "drawings" / "a0-boards.pdf", sparse=False)
            report = review_visual(submission)
            self.assertTrue(report.ok, [issue.__dict__ for issue in report.issues])

    def test_large_blank_region_is_human_review_advisory(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            submission = write_valid_visual_package(Path(tmp))
            write_top_heavy_drawing_pdf(submission / "drawings" / "a0-boards.pdf")
            report = review_visual(submission)
            self.assertTrue(report.ok, [issue.__dict__ for issue in report.issues])
            self.assertIn("DRAWING_PAGE_LARGE_BLANK_REGION", {issue.check_id for issue in report.issues})


if __name__ == "__main__":
    unittest.main()
