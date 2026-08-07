import unittest

import sys
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(REPO_ROOT / "scripts"))

from discover_public_sources import (  # noqa: E402
    classify_authority,
    classify_recency,
    content_type_kind,
    extract_links_from_html,
    parse_dateish,
    parse_html_metadata,
    score_candidate,
)


class DiscoverPublicSourcesTests(unittest.TestCase):
    def test_parse_html_metadata_extracts_title_meta_and_links(self) -> None:
        metadata = parse_html_metadata(
            """
            <html><head>
            <title>北京市海淀区人民政府</title>
            <meta name="ArticleTitle" content="百年京张 AI 创新带公告">
            <meta name="description" content="海淀公开资料">
            </head><body>
            <a href="/foo.html">政策文件</a>
            </body></html>
            """
        )
        self.assertEqual(metadata.title, "百年京张 AI 创新带公告")
        self.assertEqual(metadata.description, "海淀公开资料")
        links = extract_links_from_html(
            '<a href="/foo.html">政策文件</a>', "https://www.beijing.gov.cn/root/index.html"
        )
        self.assertEqual(links[0][0], "https://www.beijing.gov.cn/foo.html")

    def test_parse_dateish_handles_common_government_patterns(self) -> None:
        self.assertEqual(parse_dateish("2026年04月07日"), "2026-04-07")
        self.assertEqual(parse_dateish("t20260509_4643047.html"), "2026-05-09")
        self.assertEqual(parse_dateish("P020250117535098047096.docx"), "2025-01-17")

    def test_authority_classification_prefers_formal_government_documents(self) -> None:
        self.assertEqual(
            classify_authority(
                "https://www.beijing.gov.cn/zhengce/zhengcefagui/202604/t20260407.html",
                "北京市国民经济和社会发展第十五个五年规划纲要",
            ),
            "A0",
        )
        self.assertEqual(
            classify_authority(
                "https://kw.beijing.gov.cn/xwdt/kcyx/xwdtshgg/202601/t20260121.html",
                "北京发布首批4个人工智能创新街区",
            ),
            "A1",
        )
        self.assertEqual(
            classify_authority(
                "https://www.oecd.org/en/publications/smart-cities-and-inclusive-growth.html",
                "Smart Cities and Inclusive Growth",
            ),
            "A3",
        )

    def test_recency_classification_understands_fresh_and_planning_horizons(self) -> None:
        self.assertEqual(classify_recency("2026-04-07", "", "", 2026), "T0")
        self.assertEqual(classify_recency("2025-04-07", "", "", 2026), "T1")
        self.assertEqual(classify_recency("2021-09-03", "北京市慢行系统规划 2020-2035", "", 2026), "T2")
        self.assertEqual(classify_recency("2023-03-01", "清华园车站旧址历史资料", "", 2026), "T3")

    def test_scoring_rewards_authoritative_fresh_relevant_documents(self) -> None:
        score, authority, recency, hits, _notes = score_candidate(
            "https://ghzrzyw.beijing.gov.cn/zhengwuxinxi/tzgg/hd/202605/t20260509.html",
            "百年京张 AI 创新带城市设计国际方案征集资格预审公告",
            "海淀 京张铁路遗址公园 人工智能 原点社区",
            "2026-05-09",
            "text/html",
            2026,
        )
        self.assertEqual(authority, "A0")
        self.assertEqual(recency, "T0")
        self.assertGreaterEqual(score, 80)
        self.assertIn("百年京张", hits)

    def test_content_type_kind_uses_header_and_extension(self) -> None:
        self.assertEqual(content_type_kind("application/pdf", "https://x/y"), "pdf")
        self.assertEqual(content_type_kind("", "https://x/y.docx"), "docx")
        self.assertEqual(content_type_kind("text/html", "https://x/y"), "html")


if __name__ == "__main__":
    unittest.main()
