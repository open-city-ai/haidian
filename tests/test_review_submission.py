import json
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[1]


class ReviewSubmissionScriptTests(unittest.TestCase):
    def test_review_script_generates_model_input_and_prompt(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            base = root / "submissions" / "alice" / "reviewable"
            base.mkdir(parents=True)
            (base / "proposal.md").write_text(
                """---
title: "Reviewable"
author_github: "alice"
language: "zh"
license: "CC-BY-4.0"
summary: "围绕百年京张 AI 创新带提出可审查方案。"
---

# Reviewable

## 摘要
内容足够长，用于测试。
## 问题理解
内容足够长。
## 核心概念
内容足够长。
## 空间与产业方案
内容足够长。
## AI 治理与创新场景
内容足够长。
## 落地路径
内容足够长。
## 风险与合规说明
内容足够长。
## 参考资料
- brief/public-brief.md
""",
                encoding="utf-8",
            )
            for name in ["manifest.json", "metrics.json", "assumptions.json", "sources.json", "self_check.json", "agent.json"]:
                (base / name).write_text("{}", encoding="utf-8")
            out_dir = root / "review-out"
            completed = subprocess.run(
                [
                    sys.executable,
                    str(REPO_ROOT / "scripts" / "review_submission.py"),
                    str(base),
                    "--repo-root",
                    str(root),
                    "--out",
                    str(out_dir),
                ],
                capture_output=True,
                text=True,
                check=False,
            )
            self.assertEqual(completed.returncode, 0, completed.stdout + completed.stderr)
            review_input = json.loads((out_dir / "review-input.json").read_text(encoding="utf-8"))
            prompt = (out_dir / "review-prompt.md").read_text(encoding="utf-8")
            self.assertIn("rubric_dimensions", review_input)
            self.assertIn("advisory_review_schema", review_input)
            self.assertIn("source_registry_summary", review_input)
            self.assertIn("approved_formal_sources", review_input["source_registry_summary"])
            self.assertEqual(
                review_input["advisory_review_schema_path"],
                "brief/site-package/schemas/advisory_review.schema.json",
            )
            self.assertEqual(review_input["rubric_dimensions"][0]["dimension_id"], "brief_alignment")
            self.assertIn("self_check", review_input)
            self.assertIn("spatial_review", review_input)
            self.assertIn("Seven-dimension", prompt)
            self.assertIn("advisory_review.schema.json", prompt)
            self.assertIn("source_registry_summary", prompt)
            self.assertIn("background_only", prompt)
            self.assertIn("Pull Request comment", prompt)
            self.assertIn("pr_comment_markdown", prompt)
            self.assertIn("submissions-data.js", prompt)
            self.assertIn("Version 2 bilingual deliverables are mandatory", prompt)
            self.assertIn("Organizer-owned missing geometry", prompt)
            self.assertIn("组织方：", prompt)
            self.assertTrue((out_dir / "advisory-review.md").exists())

    def test_advisory_review_schema_defines_pr_comment_contract(self) -> None:
        schema = json.loads(
            (REPO_ROOT / "brief" / "site-package" / "schemas" / "advisory_review.schema.json").read_text(
                encoding="utf-8"
            )
        )
        recommendation_enum = schema["properties"]["recommendation"]["enum"]
        self.assertEqual(
            recommendation_enum,
            ["reject", "request-changes", "intake-provisional", "formal-review-ready"],
        )
        dimension_enum = (
            schema["properties"]["rubric_scores"]["items"]["properties"]["dimension_id"]["enum"]
        )
        self.assertEqual(len(dimension_enum), 7)
        self.assertIn("brief_alignment", dimension_enum)
        self.assertIn("pr_comment_markdown", schema["required"])


if __name__ == "__main__":
    unittest.main()
