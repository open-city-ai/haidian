from __future__ import annotations

import json
import sys
import tempfile
import unittest
from pathlib import Path
from unittest import mock


REPO_ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(REPO_ROOT / "scripts"))

from export_review_packet import (  # noqa: E402
    ReviewPacketError,
    export_review_packet,
    normalize_submission_dirs,
    render_pdf,
)


def write_json(path: Path, data: object) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")


def make_submission(repo_root: Path, owner: str, slug: str, title: str) -> Path:
    submission_dir = repo_root / "submissions" / owner / slug
    figures = submission_dir / "assets" / "figures"
    figures.mkdir(parents=True, exist_ok=True)
    (figures / "site-overview.png").write_bytes(b"\x89PNG\r\n\x1a\n")
    (submission_dir / "proposal.md").write_text(
        f"""---
title: "{title}"
summary: "面向专家离线评审的测试方案。"
iteration: "v0.2"
version: "0.2"
---

# {title}

## 设计依据与资料清单

方案引用 [source:SITE-PACKAGE]，并说明公开资料边界。

![资料证据链](assets/figures/site-overview.png)
""",
        encoding="utf-8",
    )
    write_json(
        submission_dir / "manifest.json",
        {
            "submission_stage": "formal",
            "generated_at": "2026-06-14T10:00:00Z",
            "agent": {"agent_id": owner, "agent_name": "Codex"},
            "validation_claim": {"known_blockers": []},
        },
    )
    write_json(submission_dir / "agent.json", {"agent_name": "Codex"})
    write_json(
        submission_dir / "sources.json",
        {
            "sources": [
                {
                    "id": "SITE-PACKAGE",
                    "path": "brief/site-package/",
                    "source_type": "official_public",
                    "usage": "任务书与结构化资料。",
                }
            ]
        },
    )
    write_json(
        submission_dir / "assumptions.json",
        {
            "assumptions": [
                {
                    "id": "A-BOUNDARY",
                    "status": "provisional_intake_only",
                    "statement": "当前边界为临时边界。",
                    "impact": "正式评分前需替换。",
                }
            ]
        },
    )
    write_json(
        submission_dir / "metrics.json",
        {
            "metrics": {
                "site_area_sqm": {
                    "status": "known",
                    "value": 1000,
                    "unit": "sqm",
                    "confidence": "medium",
                    "formula": "polygon_area(site)",
                }
            }
        },
    )
    write_json(
        submission_dir / "self_check.json",
        {
            "checks": [
                {
                    "check_id": "BOUNDARY_TRUST",
                    "result": "pass",
                    "severity": "major",
                    "target": "geometry/site_boundary.geojson",
                    "message": "Provisional boundary is present.",
                }
            ]
        },
    )
    write_json(
        submission_dir / "risk.json",
        {
            "dimensions": [
                {
                    "id": "implementation_complexity",
                    "label": "实施复杂度",
                    "score": 4,
                    "note": "需要多部门协同。",
                    "mitigation": "先做轻量试点。",
                }
            ]
        },
    )
    return submission_dir


class ExportReviewPacketTests(unittest.TestCase):
    def test_export_single_submission_markdown_and_html(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            repo_root = Path(tmp)
            submission_dir = make_submission(repo_root, "alice", "proposal-a", "AI 慢行网络")
            out_dir = repo_root / "packet"

            files = export_review_packet(
                repo_root=repo_root,
                submission_dirs=[submission_dir],
                out_dir=out_dir,
                title="测试评审包",
            )

            markdown = Path(files["markdown"]).read_text(encoding="utf-8")
            html = Path(files["html"]).read_text(encoding="utf-8")
            manifest = json.loads(Path(files["manifest"]).read_text(encoding="utf-8"))

            self.assertIn("# 测试评审包", markdown)
            self.assertIn("### 快速判断", markdown)
            self.assertIn("### 风险与待补条件", markdown)
            self.assertIn("### 完整方案正文", markdown)
            self.assertIn("../submissions/alice/proposal-a/assets/figures/site-overview.png", markdown)
            self.assertIn("AI 慢行网络", html)
            self.assertIn("quick-grid", html)
            self.assertIn("../submissions/alice/proposal-a/assets/figures/site-overview.png", html)
            self.assertEqual(manifest["submissions"][0]["path"], "submissions/alice/proposal-a")

    def test_discover_all_submissions_and_export_multi_packet(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            repo_root = Path(tmp)
            make_submission(repo_root, "alice", "proposal-a", "方案 A")
            make_submission(repo_root, "bob", "proposal-b", "方案 B")
            out_dir = repo_root / "multi"

            submissions = normalize_submission_dirs(repo_root, [], include_all=True)
            files = export_review_packet(repo_root, submissions, out_dir, "短名单评审包")

            markdown = Path(files["markdown"]).read_text(encoding="utf-8")
            self.assertIn("## 1. 方案 A", markdown)
            self.assertIn("## 2. 方案 B", markdown)
            self.assertIn("| 2 | 方案 B | bob |", markdown)

    def test_pdf_export_reports_missing_engine(self) -> None:
        original_exists = Path.exists

        def fake_exists(path: Path) -> bool:
            if path.as_posix().startswith("/Applications/Google Chrome.app"):
                return False
            return original_exists(path)

        with mock.patch("export_review_packet.shutil.which", return_value=None), mock.patch(
            "export_review_packet.Path.exists", fake_exists
        ):
            with self.assertRaisesRegex(ReviewPacketError, "PDF export requested"):
                render_pdf(Path("/tmp/missing.html"), Path("/tmp/review-packet.pdf"))


if __name__ == "__main__":
    unittest.main()
