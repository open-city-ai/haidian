import json
import sys
import tempfile
import unittest
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(REPO_ROOT / "scripts"))

from score_submission import (  # noqa: E402
    STATUS_MISSING,
    STATUS_NEEDS_WORK,
    STATUS_PASS,
    format_report,
    score_proposal,
)


VALID_BODY = """
---
title: "AI Urban Loop"
author_github: "alice"
language: "zh"
license: "CC-BY-4.0"
summary: "围绕百年京张 AI 创新带提出城市智能体、慢行网络和产业场景协同方案。"
---

# AI Urban Loop

## 摘要

本方案面向海淀百年京张 AI 创新带，提出以城市智能体为组织内核，把京张遗址公园、AI 原点社区、中关村创新文化和青年友好公共空间联动起来。方案关注产业、交通、文化、治理和公共服务的协同，强调公开资料边界和可验证试点。

## 问题理解

海淀具备高校、企业、科研机构和 AI 产业生态优势，但京张铁路遗址公园沿线仍需要更强的东西缝合、南北贯通、公共空间活力和产业服务能力。方案把人工智能视为城市治理、产业协同和生活服务的共同基础设施。

## 核心概念

核心概念是 AI Urban Loop，即一条可学习、可反馈、可迭代的创新生活环。它由公共空间网络、产业服务体系、数据治理机制和文化体验场景组成，强调 agent 参与规划评估，但所有结论都接受人工复核。

## 空间与产业方案

空间上，围绕京张遗址公园组织连续慢行网络、开放式创新会客厅、青年第三空间和 AI 展示节点。产业上，强化高校一公里创新生态圈、企业试验场和公共服务场景，支持 AI+医疗、AI+教育、AI+法律、AI+交通和机器人测试服务。

## AI 治理与创新场景

建立城市智能体工作台，用公开数据、居民反馈和场景指标生成治理建议。场景包括无人接驳预约、机器人配送测试、公共空间热力评估、无障碍路线推荐、企业服务问答和活动安全预警。系统只使用公开或授权数据，并输出可解释建议。

## 落地路径

第一阶段选取两个公开空间节点做 0-6 个月轻量试点，参与主体包括政府部门、高校、企业、社区和维护者。指标包括步行连通性、活动停留时间、青年参与度、公众反馈数量和企业服务满意度。第二阶段扩展到产业服务和慢行网络。第三阶段形成开放评估报告。

## 风险与合规说明

方案仅基于 brief 公开资料和公开政策描述，不使用非公开图件、个人隐私或内部控制指标。涉及建设强度、道路组织和设施布局的内容均为概念建议，需要规划、交通、数据安全、公众参与和相关主管部门程序进一步复核。图片和图表将注明来源和版权授权。

## 参考资料

- `brief/public-brief.md`
- `brief/README.md`
"""


class ScoreSubmissionTests(unittest.TestCase):
    def write_proposal(self, root: Path, body: str = VALID_BODY) -> Path:
        path = root / "submissions" / "alice" / "ai-urban-loop" / "proposal.md"
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text(body, encoding="utf-8")
        return path

    def write_source_index(self, root: Path) -> None:
        index = {
            "version": 1,
            "sources": [
                {
                    "id": "brief-public-brief",
                    "citation": "brief/public-brief.md",
                    "path": "brief/public-brief.md",
                },
                {
                    "id": "brief-public-boundary",
                    "citation": "brief/README.md",
                    "path": "brief/README.md",
                },
            ],
        }
        path = root / "sources" / "public-sources.json"
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text(json.dumps(index, ensure_ascii=False), encoding="utf-8")

    def write_package_source_index(self, proposal: Path) -> None:
        index = {
            "schema_version": "0.1.0",
            "package_id": "ai-urban-loop",
            "sources": [
                {
                    "id": "OFFICIAL-ANNOUNCEMENT",
                    "registry_source_id": "DATA-SRC-OFFICIAL-ANNOUNCEMENT-20260509",
                    "title": "公开征集公告",
                    "url": "https://example.com/announcement",
                }
            ],
        }
        (proposal.parent / "sources.json").write_text(
            json.dumps(index, ensure_ascii=False), encoding="utf-8"
        )

    def check_map(self, report):
        return {check.dimension: check.status for check in report.checks}

    def test_valid_proposal_passes_core_self_checks(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            self.write_source_index(root)
            proposal = self.write_proposal(root)

            report = score_proposal(root, proposal)
            checks = self.check_map(report)

            self.assertTrue(report.ready)
            self.assertEqual(checks["任务书相关性"], STATUS_PASS)
            self.assertEqual(checks["可实施性"], STATUS_PASS)
            self.assertEqual(checks["风险合规"], STATUS_PASS)
            self.assertEqual(checks["公开资料引用"], STATUS_PASS)
            self.assertEqual({item.id for item in report.matched_sources}, {"brief-public-brief", "brief-public-boundary"})

    def test_missing_required_section_is_reported(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            self.write_source_index(root)
            proposal = self.write_proposal(root, VALID_BODY.replace("## 落地路径", "## 推进计划"))

            report = score_proposal(root, proposal)
            checks = self.check_map(report)

            self.assertFalse(report.ready)
            self.assertIn("落地路径 / 实施计划", report.required_sections_missing)
            self.assertEqual(checks["表达完整度"], STATUS_MISSING)

    def test_missing_indexed_source_reference_needs_work(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            self.write_source_index(root)
            body = VALID_BODY.replace("- `brief/public-brief.md`\n- `brief/README.md`", "- 参赛团队自行整理资料")
            proposal = self.write_proposal(root, body)

            report = score_proposal(root, proposal)
            checks = self.check_map(report)

            self.assertEqual(checks["公开资料引用"], STATUS_NEEDS_WORK)
            self.assertEqual(report.matched_sources, [])

    def test_formal_package_source_registry_is_used_for_v2_markers(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            body = VALID_BODY.replace(
                "- `brief/public-brief.md`\n- `brief/README.md`",
                "- `[source:OFFICIAL-ANNOUNCEMENT]`\n- `[source:DATA-SRC-OFFICIAL-ANNOUNCEMENT-20260509]`",
            )
            proposal = self.write_proposal(root, body)
            self.write_package_source_index(proposal)

            report = score_proposal(root, proposal)
            checks = self.check_map(report)

            self.assertEqual(checks["公开资料引用"], STATUS_PASS)
            self.assertEqual(
                [item.id for item in report.matched_sources],
                ["OFFICIAL-ANNOUNCEMENT"],
            )
            self.assertEqual(report.unmatched_reference_lines, [])

    def test_local_package_artifacts_do_not_require_public_source_records(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            self.write_source_index(root)
            body = VALID_BODY.replace(
                "- `brief/public-brief.md`\n- `brief/README.md`",
                "- `brief/public-brief.md`\n- `metrics.json`, `assumptions.json` 与 `compliance_matrix.json`",
            )
            proposal = self.write_proposal(root, body)

            report = score_proposal(root, proposal)

            self.assertEqual(self.check_map(report)["公开资料引用"], STATUS_PASS)
            self.assertEqual(report.unmatched_reference_lines, [])

    def test_package_artifact_does_not_hide_descriptive_source_claim(self) -> None:
        claims = [
            "居民访谈与现场观察结论见 metrics.json",
            "未公开内部数据已汇总到 assumptions.json",
            "第三方商业热力数据见 metrics.json",
        ]
        for claim in claims:
            with self.subTest(claim=claim), tempfile.TemporaryDirectory() as tmp:
                root = Path(tmp)
                self.write_source_index(root)
                body = VALID_BODY.replace(
                    "- `brief/public-brief.md`\n- `brief/README.md`",
                    f"- `brief/public-brief.md`\n- {claim}",
                )
                proposal = self.write_proposal(root, body)

                report = score_proposal(root, proposal)

                self.assertEqual(self.check_map(report)["公开资料引用"], STATUS_NEEDS_WORK)
                self.assertEqual(report.unmatched_reference_lines, [claim])

    def test_unknown_local_reference_still_needs_source_status_note(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            self.write_source_index(root)
            body = VALID_BODY.replace(
                "- `brief/public-brief.md`\n- `brief/README.md`",
                "- `brief/public-brief.md`\n- `research/field-observations.json`",
            )
            proposal = self.write_proposal(root, body)

            report = score_proposal(root, proposal)

            self.assertEqual(self.check_map(report)["公开资料引用"], STATUS_NEEDS_WORK)
            self.assertEqual(report.unmatched_reference_lines, ["`research/field-observations.json`"])

    def test_nested_package_artifact_name_still_needs_source_status_note(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            self.write_source_index(root)
            body = VALID_BODY.replace(
                "- `brief/public-brief.md`\n- `brief/README.md`",
                "- `brief/public-brief.md`\n- `research/manifest.json`",
            )
            proposal = self.write_proposal(root, body)

            report = score_proposal(root, proposal)

            self.assertEqual(self.check_map(report)["公开资料引用"], STATUS_NEEDS_WORK)
            self.assertEqual(report.unmatched_reference_lines, ["`research/manifest.json`"])

    def test_weak_landing_path_needs_work(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            self.write_source_index(root)
            body = VALID_BODY.replace(
                "第一阶段选取两个公开空间节点做 0-6 个月轻量试点，参与主体包括政府部门、高校、企业、社区和维护者。指标包括步行连通性、活动停留时间、青年参与度、公众反馈数量和企业服务满意度。第二阶段扩展到产业服务和慢行网络。第三阶段形成开放评估报告。",
                "第一阶段先做轻量试点，第二阶段逐步推广，并根据情况优化。",
            )
            proposal = self.write_proposal(root, body)

            report = score_proposal(root, proposal)
            checks = self.check_map(report)

            self.assertEqual(checks["可实施性"], STATUS_NEEDS_WORK)

    def test_format_report_contains_advisory_note(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            self.write_source_index(root)
            proposal = self.write_proposal(root)

            markdown = format_report(score_proposal(root, proposal))

            self.assertIn("Proposal self-check", markdown)
            self.assertIn("advisory", markdown)
            self.assertIn("Formal readiness: not assessed", markdown)
            self.assertIn("scripts/self_check_submission.py", markdown)
            self.assertIn("Matched indexed sources", markdown)

    def test_json_marks_formal_readiness_as_not_assessed(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            self.write_source_index(root)
            proposal = self.write_proposal(root)

            payload = score_proposal(root, proposal).to_dict()

            self.assertEqual(payload["check_scope"], "advisory_proposal_only")
            self.assertEqual(payload["formal_readiness"], "not_assessed")
            self.assertEqual(payload["next_required_check"], "scripts/self_check_submission.py")



    def test_placeholder_text_causes_missing_completeness(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            self.write_source_index(root)
            # Inject a known placeholder string
            body = VALID_BODY + "\n方案标题\n"
            proposal = self.write_proposal(root, body)

            report = score_proposal(root, proposal)
            checks = self.check_map(report)

            self.assertEqual(checks["表达完整度"], STATUS_MISSING)

    def test_score_proposal_returns_all_eight_dimensions(self) -> None:
        """score_proposal must always return exactly the eight rubric dimensions."""
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            self.write_source_index(root)
            proposal = self.write_proposal(root)

            report = score_proposal(root, proposal)

            dimension_names = {check.dimension for check in report.checks}
            expected = {
                "任务书相关性",
                "原创性",
                "AI 与城市规划创新性",
                "可实施性",
                "公共利益",
                "风险合规",
                "表达完整度",
                "公开资料引用",
            }
            self.assertEqual(dimension_names, expected)

if __name__ == "__main__":
    unittest.main()
