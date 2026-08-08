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

    def write_package_sources(self, root: Path, sources: list[dict]) -> None:
        package_dir = root / "submissions" / "alice" / "ai-urban-loop"
        package_dir.mkdir(parents=True, exist_ok=True)
        for source in sources:
            locations = []
            for field_name in ("path", "local_paths"):
                value = source.get(field_name)
                if isinstance(value, str):
                    locations.append(value)
                elif isinstance(value, list):
                    locations.extend(value)
            for location in locations:
                source_path = root / location
                source_path.parent.mkdir(parents=True, exist_ok=True)
                source_path.write_text("registered source", encoding="utf-8")
        (package_dir / "sources.json").write_text(
            json.dumps({"schema_version": "0.1.0", "sources": sources}, ensure_ascii=False),
            encoding="utf-8",
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

    def test_structured_evidence_anchor_is_not_public_source_unmatched(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            self.write_source_index(root)
            body = VALID_BODY + (
                "\n- [standard:PROJECT-STANDARD]\n"
                "- [depth:metrics_recalculation] [data:geometry/site_boundary.geojson#SITE-001] "
                "[metric:site_area_sqm]\n"
            )
            proposal = self.write_proposal(root, body)

            report = score_proposal(root, proposal)

            self.assertEqual(self.check_map(report)["公开资料引用"], STATUS_PASS)
            self.assertEqual(report.unmatched_reference_lines, [])

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

    def test_registered_package_source_is_reported_separately(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            body = VALID_BODY.replace(
                "- `brief/public-brief.md`\n- `brief/README.md`",
                "- [source:external-weather]",
            )
            proposal = self.write_proposal(root, body)
            self.write_package_sources(
                root,
                [
                    {
                        "id": "external-weather",
                        "url": "https://example.org/weather",
                        "source_type": "official_public",
                        "usage": "Background context only; no site-specific values are claimed.",
                    }
                ],
            )

            report = score_proposal(root, proposal)
            checks = self.check_map(report)

            self.assertEqual(checks["公开资料引用"], STATUS_PASS)
            self.assertEqual(report.matched_sources, [])
            self.assertEqual(
                [item.id for item in report.registered_external_or_package_sources],
                ["external-weather"],
            )
            self.assertEqual(report.unmatched_reference_lines, [])

    def test_complete_source_register_is_scanned_with_references(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            body = VALID_BODY.replace(
                "- `brief/public-brief.md`\n- `brief/README.md`",
                "- [source:external-standard]",
            )
            body += "\n## 完整来源与证据登记\n\n- [source:external-standard]\n"
            proposal = self.write_proposal(root, body)
            self.write_package_sources(
                root,
                [
                    {
                        "id": "external-standard",
                        "title": "Official public standard snapshot",
                        "publisher": "Public standards body",
                        "accessed_date": "2026-08-08",
                        "url": "https://example.org/standard",
                        "usable_for": ["Design principles only"],
                        "not_usable_for": ["Project approval"],
                    }
                ],
            )

            report = score_proposal(root, proposal)
            checks = self.check_map(report)

            self.assertEqual(checks["公开资料引用"], STATUS_PASS)
            self.assertEqual(
                [item.id for item in report.registered_external_or_package_sources],
                ["external-standard"],
            )
            self.assertEqual(report.unmatched_reference_lines, [])

    def test_package_source_schema_variants_are_normalized(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            body = VALID_BODY.replace(
                "- `brief/public-brief.md`\n- `brief/README.md`",
                "- [source:DATA-SRC-OFFICIAL-ANNOUNCEMENT-20260509]",
            )
            proposal = self.write_proposal(root, body)
            self.write_package_sources(
                root,
                [
                    {
                        "source_id": "DATA-SRC-OFFICIAL-ANNOUNCEMENT-20260509",
                        "url": "brief/site-package/standards/references/official.md",
                        "local_paths": ["brief/site-package/standards/references/official.md"],
                        "allowed_uses": ["project_name", "design_tasks"],
                        "review_status": "approved",
                        "usable_for_formal": "yes",
                    }
                ],
            )

            report = score_proposal(root, proposal)
            checks = self.check_map(report)

            self.assertEqual(checks["公开资料引用"], STATUS_PASS)
            self.assertEqual(
                [item.id for item in report.registered_external_or_package_sources],
                ["DATA-SRC-OFFICIAL-ANNOUNCEMENT-20260509"],
            )

    def test_package_source_without_use_boundary_is_not_upgraded(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            body = VALID_BODY.replace(
                "- `brief/public-brief.md`\n- `brief/README.md`",
                "- [source:external-weather]",
            )
            proposal = self.write_proposal(root, body)
            self.write_package_sources(
                root,
                [
                    {
                        "id": "external-weather",
                        "url": "https://example.org/weather",
                        "source_type": "official_public",
                    }
                ],
            )

            report = score_proposal(root, proposal)
            checks = self.check_map(report)

            self.assertEqual(checks["公开资料引用"], STATUS_NEEDS_WORK)
            self.assertEqual(report.registered_external_or_package_sources, [])

    def test_provisional_package_source_remains_unresolved(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            body = VALID_BODY.replace(
                "- `brief/public-brief.md`\n- `brief/README.md`",
                "- [source:provisional-map]",
            )
            proposal = self.write_proposal(root, body)
            self.write_package_sources(
                root,
                [
                    {
                        "id": "provisional-map",
                        "path": "brief/provisional-map.geojson",
                        "source_kind": "provisional_repository_data",
                        "usage": "Temporary design geometry only.",
                    }
                ],
            )

            report = score_proposal(root, proposal)
            checks = self.check_map(report)

            self.assertEqual(checks["公开资料引用"], STATUS_NEEDS_WORK)
            self.assertEqual(report.registered_external_or_package_sources, [])

    def test_inferred_boundary_source_type_remains_unresolved(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            body = VALID_BODY.replace(
                "- `brief/public-brief.md`\n- `brief/README.md`",
                "- [source:inferred-boundary]",
            )
            proposal = self.write_proposal(root, body)
            self.write_package_sources(
                root,
                [
                    {
                        "id": "inferred-boundary",
                        "path": "brief/inferred-boundary.geojson",
                        "source_type": "agent_inferred_from_public_data",
                        "usage": "Submitted site boundary geometry source (provisional); not an official redline.",
                    }
                ],
            )

            report = score_proposal(root, proposal)
            checks = self.check_map(report)

            self.assertEqual(checks["公开资料引用"], STATUS_NEEDS_WORK)
            self.assertEqual(report.registered_external_or_package_sources, [])

    def test_source_disabled_for_formal_use_remains_unresolved(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            body = VALID_BODY.replace(
                "- `brief/public-brief.md`\n- `brief/README.md`",
                "- [source:background-map]",
            )
            proposal = self.write_proposal(root, body)
            self.write_package_sources(
                root,
                [
                    {
                        "id": "background-map",
                        "url": "https://example.org/map",
                        "source_type": "official_public",
                        "usage": "Public context only.",
                        "not_usable_for": ["formal review", "official boundary"],
                    }
                ],
            )

            report = score_proposal(root, proposal)
            checks = self.check_map(report)

            self.assertEqual(checks["公开资料引用"], STATUS_NEEDS_WORK)
            self.assertEqual(report.registered_external_or_package_sources, [])

    def test_narrow_disabled_scope_does_not_disqualify_registered_source(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            body = VALID_BODY.replace(
                "- `brief/public-brief.md`\n- `brief/README.md`",
                "- [source:official-method]",
            )
            proposal = self.write_proposal(root, body)
            self.write_package_sources(
                root,
                [
                    {
                        "id": "official-method",
                        "url": "https://example.org/method",
                        "source_type": "official_public",
                        "usage": "Design principles and method reference only.",
                        "not_usable_for": [
                            "official redline",
                            "statutory planning control",
                            "engineering approval",
                        ],
                    }
                ],
            )

            report = score_proposal(root, proposal)

            self.assertEqual(self.check_map(report)["公开资料引用"], STATUS_PASS)
            self.assertEqual(
                [item.id for item in report.registered_external_or_package_sources],
                ["official-method"],
            )

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
            self.assertIn("Matched public sources", markdown)


if __name__ == "__main__":
    unittest.main()
