from __future__ import annotations

import json
import re
import subprocess
import sys
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]


class PrelaunchCheckTests(unittest.TestCase):
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
        self.assertIn("github.event.pull_request.base.sha", workflow)
        self.assertNotIn("github.event.pull_request.head.sha", workflow)
        self.assertIn("python3 scripts/github_pr_validation.py", workflow)

    def test_pr_template_and_gallery_keep_review_results_out_of_public_index(self) -> None:
        template = (ROOT / ".github" / "PULL_REQUEST_TEMPLATE.md").read_text(encoding="utf-8")
        submissions_page = (ROOT / "submissions.html").read_text(encoding="utf-8")
        index_page = (ROOT / "index.html").read_text(encoding="utf-8")

        self.assertIn("本 PR 不修改 `submissions-data.js`", template)
        self.assertIn("展示索引由维护者合并后生成", template)
        self.assertIn("PR comment", submissions_page)
        self.assertIn("不展示维护者审核正文", submissions_page)

        public_text = submissions_page + "\n" + index_page
        self.assertNotIn("Maintainer Review Summary", public_text)
        self.assertNotIn("review-summary.json", public_text)
        self.assertNotIn("advisory-review.md", public_text)


if __name__ == "__main__":
    unittest.main()
