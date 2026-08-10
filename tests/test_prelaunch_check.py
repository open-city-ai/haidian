from __future__ import annotations

import json
import re
import subprocess
import sys
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]


class PrelaunchCheckTests(unittest.TestCase):
    def test_public_html_pages_include_cloudflare_analytics_once(self) -> None:
        pages = [
            "index.html",
            "agent.html",
            "brief.html",
            "review.html",
            "submissions.html",
            "examples/agent-civic-loop/index.html",
            "examples/portal/index.html",
        ]
        for rel in pages:
            with self.subTest(path=rel):
                text = (ROOT / rel).read_text(encoding="utf-8")
                self.assertEqual(1, text.count("https://static.cloudflareinsights.com/beacon.min.js"))
                self.assertEqual(1, text.count("d2ed9f664e384c4889e4dfbbbc706dc6"))

    def test_prelaunch_check_json_passes(self) -> None:
        completed = subprocess.run(
            [sys.executable, str(ROOT / "scripts" / "prelaunch_check.py"), "--json"],
            cwd=ROOT,
            capture_output=True,
            text=True,
            check=False,
        )
        self.assertEqual(completed.returncode, 0, completed.stdout + completed.stderr)
        report = json.loads(completed.stdout)
        self.assertTrue(report["ok"])
        names = {item["name"] for item in report["checks"]}
        self.assertIn("workflow_uses_trusted_base", names)
        self.assertIn("review_results_comment_only", names)
        self.assertIn("boundary_language_consistent", names)
        self.assertIn("public_intake_open", names)

    def test_public_site_uses_formal_open_date(self) -> None:
        status = json.loads((ROOT / "activity-status.json").read_text(encoding="utf-8"))
        self.assertEqual("open", status["status"])
        self.assertTrue(status["public_intake_open"])
        self.assertEqual("2026-08-07", status["public_intake_open_date"])
        self.assertEqual("2026-08-31", status["submission_deadline"])
        self.assertEqual("2026-09", status["implementation_begins"])
        self.assertEqual("Asia/Shanghai", status["timezone"])
        for rel in ["index.html", "agent.html", "brief.html", "review.html", "submissions.html", "README.md"]:
            with self.subTest(path=rel):
                text = (ROOT / rel).read_text(encoding="utf-8")
                self.assertTrue("2026年8月7日" in text or "August 7, 2026" in text)
                self.assertNotIn("当前未开放公共", text)
                self.assertNotIn("暂未开放公共", text)
                self.assertNotIn("独立社区公开征集", text)
                self.assertNotIn("非政府或主办方官方报名", text)

    def test_public_docs_do_not_use_old_boundary_failure_language(self) -> None:
        public_docs = [
            ROOT / "README.md",
            ROOT / "submissions" / "README.md",
            ROOT / "agent.html",
            ROOT / ".github" / "PULL_REQUEST_TEMPLATE.md",
            ROOT / "docs" / "formal-submission-guide.md",
        ]
        forbidden = [
            re.compile(r"缺少官方边界[^。\n]*都会失败"),
            re.compile(r"没有官方边界时，formal 脚手架会失败"),
            re.compile(r"missing official boundary[^.\n]*fail", re.I),
        ]
        hits = []
        for path in public_docs:
            text = path.read_text(encoding="utf-8")
            for pattern in forbidden:
                for match in pattern.finditer(text):
                    hits.append(f"{path.relative_to(ROOT)}: {match.group(0)}")
        self.assertEqual([], hits)

    def test_workflow_keeps_pull_request_target_safe(self) -> None:
        workflow = (ROOT / ".github" / "workflows" / "submission-validation.yml").read_text(encoding="utf-8")
        self.assertIn("pull_request_target", workflow)
        self.assertIn("github.event.repository.default_branch", workflow)
        self.assertNotIn("github.event.pull_request.head.sha", workflow)
        self.assertIn("python3 scripts/github_pr_validation.py", workflow)
        self.assertIn("pip install", workflow)
        self.assertIn("requirements-review.txt", workflow)

    def test_pr_template_and_gallery_keep_review_results_out_of_public_index(self) -> None:
        template = (ROOT / ".github" / "PULL_REQUEST_TEMPLATE.md").read_text(encoding="utf-8")
        submissions_page = (ROOT / "submissions.html").read_text(encoding="utf-8")
        index_page = (ROOT / "index.html").read_text(encoding="utf-8")

        self.assertIn("本 PR 不修改 `gallery-publication.json` 或 `submissions-data.js`", template)
        self.assertIn("已合并方案自动进入展示页，首页精选由维护者决定", template)
        self.assertIn("PR comment", submissions_page)
        self.assertIn("不展示维护者审核正文", submissions_page)

        public_text = submissions_page + "\n" + index_page
        self.assertNotIn("Maintainer Review Summary", public_text)
        self.assertNotIn("review-summary.json", public_text)
        self.assertNotIn("advisory-review.md", public_text)


if __name__ == "__main__":
    unittest.main()
