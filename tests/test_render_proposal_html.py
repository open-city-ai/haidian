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
    def test_render_html_supports_emphasis_without_reformatting_inline_code(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            submission_dir = Path(tmp)
            (submission_dir / "proposal.md").write_text(
                "正文 **重点**、*补充*、***都要***、\\*字面星号\\*，以及 `**不要格式化**`。\n\n"
                "```python\n"
                "score = 0.4 * density + 0.4 * load + 0.2 * activity\n"
                "```\n",
                encoding="utf-8",
            )

            html = render_html(submission_dir)

            self.assertIn("<strong>重点</strong>", html)
            self.assertIn("<em>补充</em>", html)
            self.assertIn("<strong><em>都要</em></strong>", html)
            self.assertIn("*字面星号*", html)
            self.assertIn("<code>**不要格式化**</code>", html)
            self.assertIn(
                "<pre><code>score = 0.4 * density + 0.4 * load + 0.2 * activity</code></pre>",
                html,
            )
            self.assertNotIn("0.4 <em>", html)

    def test_render_html_supports_blockquotes(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            submission_dir = Path(tmp)
            (submission_dir / "proposal.md").write_text(
                "> **引用结论** [source:SITE-PACKAGE]\n> 第二行。\n>\n> 独立第二段。\n",
                encoding="utf-8",
            )

            html = render_html(submission_dir)

            self.assertIn("<blockquote><p><strong>引用结论</strong> ", html)
            self.assertIn('class="evidence evidence-source"', html)
            self.assertIn("第二行。</p><p>独立第二段。</p></blockquote>", html)
            self.assertNotIn("&gt;", html)

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
            self.assertIn('data-evidence-kind="source"', html)
            self.assertIn('data-evidence-value="SITE-PACKAGE"', html)
            self.assertIn('>来源</sup>', html)

    def test_render_html_renders_markdown_tables(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            submission_dir = Path(tmp)
            (submission_dir / "proposal.md").write_text(
                """---
title: "测试方案"
summary: "离线阅读版"
---

# 测试方案

| ID | 场景 | 无AI兜底 |
| --- | :---: | ---: |
| SCN-01 | 模型红队交接台 | 人工评审 [metric:scenario_node_count] |
| SCN-02 | 机器人路权沙盒 | 安全员物理停机 |

表后正文。
""",
                encoding="utf-8",
            )

            html = render_html(submission_dir)

            self.assertIn('<div class="proposal-table"><table>', html)
            self.assertIn("<th>ID</th>", html)
            self.assertIn('<th class="align-center">场景</th>', html)
            self.assertIn('<td class="align-right">人工评审 ', html)
            self.assertIn("<td>SCN-01</td>", html)
            self.assertIn('class="evidence evidence-metric"', html)
            self.assertNotIn("<p>| ID |", html)
            self.assertIn("<p>表后正文。</p>", html)

    def test_render_html_supports_optional_outer_and_escaped_pipes(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            submission_dir = Path(tmp)
            (submission_dir / "proposal.md").write_text(
                """名称 | 表达式
--- | ---
逻辑或 | `a \\| b`
""",
                encoding="utf-8",
            )

            html = render_html(submission_dir)

            self.assertIn("<th>名称</th><th>表达式</th>", html)
            self.assertIn("<td>逻辑或</td><td><code>a | b</code></td>", html)

    def test_render_html_does_not_treat_a_heading_as_a_table_header(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            submission_dir = Path(tmp)
            (submission_dir / "proposal.md").write_text(
                "# 标题 | 补充\n--- | ---\n",
                encoding="utf-8",
            )

            html = render_html(submission_dir)

            self.assertNotIn("<table>", html)
            self.assertIn("<h1>标题 | 补充</h1>", html)

    def test_render_html_stops_a_table_before_following_block_content(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            submission_dir = Path(tmp)
            (submission_dir / "proposal.md").write_text(
                """| A | B |
| --- | --- |
| x | y |
1. 后续步骤
""",
                encoding="utf-8",
            )

            html = render_html(submission_dir)

            self.assertIn("<td>x</td><td>y</td>", html)
            self.assertNotIn("<td>1. 后续步骤</td>", html)
            self.assertIn("<p>1. 后续步骤</p>", html)

    def test_render_html_rejects_mismatched_table_header_and_delimiter(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            submission_dir = Path(tmp)
            (submission_dir / "proposal.md").write_text(
                "| A | B |\n| --- |\n| value |\n",
                encoding="utf-8",
            )

            html = render_html(submission_dir)

            self.assertNotIn("<table>", html)
            self.assertIn("<p>| A | B | | --- | | value |</p>", html)

    def test_render_html_keeps_non_table_pipe_lines_in_the_paragraph(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            submission_dir = Path(tmp)
            (submission_dir / "proposal.md").write_text(
                "|仅一行没有分隔行|\n后续正文。\n",
                encoding="utf-8",
            )

            html = render_html(submission_dir)

            self.assertNotIn("<table>", html)
            self.assertIn("<p>|仅一行没有分隔行| 后续正文。</p>", html)

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

English content [source:SITE-PACKAGE] [standard:STD-001] [depth:DEPTH-001]
[data:geometry/site_boundary.geojson#SITE] [metric:site_area_ha].

# 中文正式译文

## 设计依据与资料清单

中文内容 [source:SITE-PACKAGE]。
""",
                encoding="utf-8",
            )

            html = render_html(submission_dir)

            self.assertIn('<html lang="en">', html)
            self.assertIn('<section lang="en">', html)
            self.assertIn('<section lang="zh-CN"><h1>中文正式译文</h1>', html)
            self.assertIn('title="Source: SITE-PACKAGE">Source</sup>', html)
            self.assertIn('title="Standard: STD-001">Standard</sup>', html)
            self.assertIn('title="Depth: DEPTH-001">Depth</sup>', html)
            self.assertIn(
                'title="Spatial data: geometry/site_boundary.geojson#SITE">Spatial data</sup>',
                html,
            )
            self.assertIn('title="Metric: site_area_ha">Metric</sup>', html)
            self.assertIn('title="来源：SITE-PACKAGE">来源</sup>', html)

    def test_cli_renders_primary_and_standalone_translation(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            submission_dir = Path(tmp)
            (submission_dir / "proposal.md").write_text(
                '---\ntitle: "中文方案"\nsummary: "中文摘要"\nlanguage: "zh"\ntranslation_file: "proposal.en.md"\n---\n\n# 中文方案\n',
                encoding="utf-8",
            )
            (submission_dir / "proposal.en.md").write_text(
                '---\ntitle: "English Proposal"\nsummary: "English summary"\nlanguage: "en"\ntranslation_of: "proposal.md"\n---\n\n# English Proposal\n\nEvidence [source:SITE-PACKAGE].\n',
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
            self.assertIn('title="Source: SITE-PACKAGE">Source</sup>', translated)
            self.assertNotIn('>来源</sup>', translated)

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
