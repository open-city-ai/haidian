import sys
import tempfile
import unittest
import subprocess
import sys
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

    def test_render_html_preserves_tables_and_strong_emphasis(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            submission_dir = Path(tmp)
            (submission_dir / "proposal.md").write_text(
                """---
title: "Table proposal"
summary: "Offline table rendering"
---

# Table proposal

**Known** values stay visible.

| Evidence | Result |
| --- | --- |
| Geometry | PASS |
""",
                encoding="utf-8",
            )

            html = render_html(submission_dir)

            self.assertIn('<table class="proposal-table">', html)
            self.assertIn('<strong>Known</strong>', html)
            self.assertIn('<th>Evidence</th>', html)
            self.assertIn('<td>PASS</td>', html)

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

    def test_cli_renders_primary_and_standalone_translation(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            submission_dir = Path(tmp)
            (submission_dir / "proposal.md").write_text(
                '---\ntitle: "中文方案"\nsummary: "中文摘要"\nlanguage: "zh"\ntranslation_file: "proposal.en.md"\n---\n\n# 中文方案\n',
                encoding="utf-8",
            )
            (submission_dir / "proposal.en.md").write_text(
                '---\ntitle: "English Proposal"\nsummary: "English summary"\nlanguage: "en"\ntranslation_of: "proposal.md"\n---\n\n# English Proposal\n',
                encoding="utf-8",
            )
            completed = subprocess.run(
                [sys.executable, str(REPO_ROOT / "scripts" / "render_proposal_html.py"), str(submission_dir)],
                capture_output=True,
                text=True,
                check=False,
            )
            self.assertEqual(0, completed.returncode, completed.stdout + completed.stderr)
            primary = (submission_dir / "report" / "proposal.html").read_text(encoding="utf-8")
            translated = (submission_dir / "report" / "proposal.en.html").read_text(encoding="utf-8")
            self.assertIn('href="proposal.en.html"', primary)
            self.assertIn('href="proposal.html"', translated)

    def test_cli_uses_relative_language_links_for_custom_output(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            submission_dir = Path(tmp)
            (submission_dir / "proposal.md").write_text(
                '---\ntitle: "中文方案"\nsummary: "中文摘要"\nlanguage: "zh"\ntranslation_file: "proposal.en.md"\n---\n\n# 中文方案\n',
                encoding="utf-8",
            )
            (submission_dir / "proposal.en.md").write_text(
                '---\ntitle: "English Proposal"\nsummary: "English summary"\nlanguage: "en"\ntranslation_of: "proposal.md"\n---\n\n# English Proposal\n',
                encoding="utf-8",
            )
            completed = subprocess.run(
                [
                    sys.executable,
                    str(REPO_ROOT / "scripts" / "render_proposal_html.py"),
                    str(submission_dir),
                    "--out",
                    "public/custom.html",
                ],
                capture_output=True,
                text=True,
                check=False,
            )
            self.assertEqual(0, completed.returncode, completed.stdout + completed.stderr)
            primary = (submission_dir / "public" / "custom.html").read_text(encoding="utf-8")
            translated = (submission_dir / "report" / "proposal.en.html").read_text(encoding="utf-8")
            self.assertIn('href="../report/proposal.en.html"', primary)
            self.assertIn('href="../public/custom.html"', translated)


if __name__ == "__main__":
    unittest.main()
