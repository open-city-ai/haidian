import sys
import tempfile
import unittest
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(REPO_ROOT / "scripts"))

from render_proposal_html import render_html  # noqa: E402


class RenderProposalHtmlTests(unittest.TestCase):
    def test_render_html_rewrites_local_figure_paths(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            submission_dir = Path(tmp)
            figures = [
                "site-overview.png",
                "land-use-structure.png",
                "key-areas.png",
                "mobility-bluegreen.png",
                "metrics-evidence.png",
            ]
            for name in figures:
                path = submission_dir / "assets" / "figures" / name
                path.parent.mkdir(parents=True, exist_ok=True)
                path.write_bytes(b"\x89PNG\r\n\x1a\n")
            (submission_dir / "proposal.md").write_text(
                """---
title: "测试方案"
summary: "离线阅读版"
---

# 测试方案

## 三层范围工作框架

方案引用 [source:SITE-PACKAGE] 和 [data:geometry/land_use.geojson#LU-001]。

![资料证据链与提交包关系图](assets/figures/site-overview.png)
""",
                encoding="utf-8",
            )

            html = render_html(submission_dir)

            self.assertIn('<main>', html)
            self.assertIn('../assets/figures/site-overview.png', html)
            self.assertIn('class="evidence evidence-source"', html)

    def test_render_html_rejects_remote_images(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            submission_dir = Path(tmp)
            (submission_dir / "proposal.md").write_text(
                "![远程图](https://example.com/a.png)\n",
                encoding="utf-8",
            )

            with self.assertRaisesRegex(ValueError, "remote or unsafe image source"):
                render_html(submission_dir)

    def test_render_english_proposal_marks_both_languages(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            submission_dir = Path(tmp)
            (submission_dir / "proposal.md").write_text(
                """---
title: "English proposal"
summary: "Bilingual offline report"
language: "en"
---

# English proposal

English content.

# 中文正式译文

## 设计依据与资料清单

中文内容。
""",
                encoding="utf-8",
            )

            html = render_html(submission_dir)

            self.assertIn('<html lang="en">', html)
            self.assertIn('<section lang="en">', html)
            self.assertIn('<section lang="zh-CN"><h1>中文正式译文</h1>', html)


if __name__ == "__main__":
    unittest.main()
