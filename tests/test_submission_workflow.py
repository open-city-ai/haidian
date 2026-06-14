import sys
import tempfile
import unittest
import json
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(REPO_ROOT / "scripts"))

from validate_submission import validate_submission  # noqa: E402
from render_exhibit import render_html  # noqa: E402
from render_portal import load_card, render_portal  # noqa: E402


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

核心概念是 AI Urban Loop，即一条可学习、可反馈、可迭代的创新生活环。它由公共空间环、产业服务环、数据治理环和文化体验环组成，强调 agent 参与规划评估，但所有结论都接受人工复核。

## 空间与产业方案

空间上，围绕京张遗址公园组织连续慢行网络、开放式创新会客厅、青年第三空间和 AI 展示节点。产业上，强化高校一公里创新生态圈、企业试验场和公共服务场景，支持 AI+医疗、AI+教育、AI+法律、AI+交通和机器人测试服务。

## AI 治理与创新场景

建立城市智能体工作台，用公开数据、居民反馈和场景指标生成治理建议。场景包括无人接驳预约、机器人配送测试、公共空间热力评估、无障碍路线推荐、企业服务问答和活动安全预警。系统只使用公开或授权数据，并输出可解释建议。

## 落地路径

第一阶段选取两个公开空间节点做轻量试点，指标包括步行连通性、活动停留时间、青年参与度和企业服务满意度。第二阶段扩展到产业服务和慢行网络。第三阶段形成开放评估报告，继续通过 GitHub 征集方案迭代。

## 风险与合规说明

方案仅基于 brief 公开资料和公开政策描述，不使用非公开图件、个人隐私或内部控制指标。涉及建设强度、道路组织和设施布局的内容均为概念建议，需要规划、交通、数据安全和公众参与程序进一步复核。图片和图表将注明来源。

## 参考资料

- brief/public-brief.md
- 北京市与海淀区公开政策资料
"""


OFFTOPIC_BODY = """
---
title: "Coffee Shop Coupon"
author_github: "alice"
language: "zh"
license: "CC-BY-4.0"
summary: "这个方案主要讨论咖啡优惠券。"
---

# Coffee Shop Coupon

## 摘要
优惠券。
## 问题理解
优惠券。
## 核心概念
优惠券。
## 空间与产业方案
优惠券。
## AI 治理与创新场景
优惠券。
## 落地路径
优惠券。
## 风险与合规说明
优惠券。
## 参考资料
无。
"""


VALID_EXHIBIT = {
    "version": 1,
    "theme": "civic-lab",
    "card": {
        "title": "AI Urban Loop",
        "subtitle": "可学习、可复核的城市智能体环",
        "summary": "以京张铁路遗址公园为公共空间主线，串联公共服务、慢行网络和产业服务场景。",
        "cover": "assets/hero.png",
        "tags": ["城市智能体", "慢行网络", "公开数据"],
        "highlights": ["公开资料驱动", "人工复核", "低风险试点"],
        "status": "featured"
    },
    "links": {
        "proposal": "proposal.md",
        "detail": "index.html"
    },
    "hero": {
        "eyebrow": "AI 城市方案展示",
        "tagline": "把京张铁路遗址公园沿线组织为可学习、可复核的城市智能体环。",
        "image": "assets/hero.png",
        "caption": "示意图，由投稿者提供。"
    },
    "badges": ["城市智能体", "慢行网络", "公开数据"],
    "modules": [
        {
            "type": "executive_summary",
            "title": "方案摘要",
            "body": "本展示摘要来自结构化 exhibit.json。"
        },
        {
            "type": "concept_cards",
            "title": "核心概念",
            "cards": [
                {
                    "title": "城市智能体",
                    "body": "读取公开资料，生成建议，并接受人工复核。"
                }
            ]
        },
        {
            "type": "references",
            "title": "参考资料",
            "items": ["brief/public-brief.md"]
        }
    ]
}

VALID_CHANGELOG = """# 方案迭代记录

## v0.1 - 2026-06-14

### 改动摘要

- 创建方案初稿，说明核心概念、空间与产业方案、AI 治理场景和落地路径。

### 采纳反馈

- 暂无，首版提交。

### 暂未采纳或待复核事项

- 具体建设强度、道路线位、设施落位和权属判断均需基于公开资料进一步复核。

### 公开资料与合规说明

- 本版本仅使用公开任务书和可公开资料，不包含个人隐私、涉密资料、内部图件或未审定规划控制指标。
"""


class SubmissionWorkflowTests(unittest.TestCase):
    def write(self, root: Path, rel: str, content: str = VALID_BODY) -> None:
        path = root / rel
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text(content, encoding="utf-8")

    def write_json(self, root: Path, rel: str, content: dict) -> None:
        self.write(root, rel, json.dumps(content, ensure_ascii=False, indent=2))

    def test_valid_submission_passes_hard_validation(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            rel = "submissions/alice/ai-urban-loop/proposal.md"
            self.write(root, rel)
            report = validate_submission(root, "alice", [rel])
            self.assertTrue(report.ok, report.errors)

    def test_user_cannot_modify_another_user_folder(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            rel = "submissions/bob/ai-urban-loop/proposal.md"
            self.write(root, rel)
            report = validate_submission(root, "alice", [rel])
            self.assertFalse(report.ok)
            self.assertIn("may not change", "\n".join(report.errors))

    def test_user_cannot_modify_repo_infrastructure(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            self.write(root, "README.md", "# changed")
            report = validate_submission(root, "alice", ["README.md"])
            self.assertFalse(report.ok)
            self.assertIn("participant PRs may only change", "\n".join(report.errors))

    def test_missing_required_section_fails(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            rel = "submissions/alice/ai-urban-loop/proposal.md"
            self.write(root, rel, VALID_BODY.replace("## 参考资料", "## 资料"))
            report = validate_submission(root, "alice", [rel])
            self.assertFalse(report.ok)
            self.assertIn("missing required section", "\n".join(report.errors))

    def test_disallowed_asset_extension_fails(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            proposal = "submissions/alice/ai-urban-loop/proposal.md"
            asset = "submissions/alice/ai-urban-loop/assets/run.py"
            self.write(root, proposal)
            self.write(root, asset, "print('nope')")
            report = validate_submission(root, "alice", [proposal, asset])
            self.assertFalse(report.ok)
            self.assertIn("assets must use", "\n".join(report.errors))

    def test_privacy_pattern_fails_validation(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            rel = "submissions/alice/ai-urban-loop/proposal.md"
            self.write(root, rel, VALID_BODY + "\n联系人手机号 13812345678")
            report = validate_submission(root, "alice", [rel])
            self.assertFalse(report.ok)
            self.assertIn("疑似手机号", "\n".join(report.errors))

    def test_exhibit_submission_passes_hard_validation(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            proposal = "submissions/alice/ai-urban-loop/proposal.md"
            exhibit = "submissions/alice/ai-urban-loop/exhibit.json"
            asset = "submissions/alice/ai-urban-loop/assets/hero.png"
            self.write(root, proposal)
            self.write_json(root, exhibit, VALID_EXHIBIT)
            self.write(root, asset, "placeholder")
            report = validate_submission(root, "alice", [proposal, exhibit, asset])
            self.assertTrue(report.ok, report.errors)
            self.assertEqual(report.exhibit_files, [exhibit])

    def test_exhibit_external_image_fails_validation(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            proposal = "submissions/alice/ai-urban-loop/proposal.md"
            exhibit = "submissions/alice/ai-urban-loop/exhibit.json"
            bad_exhibit = json.loads(json.dumps(VALID_EXHIBIT))
            bad_exhibit["hero"]["image"] = "https://example.com/hero.png"
            self.write(root, proposal)
            self.write_json(root, exhibit, bad_exhibit)
            report = validate_submission(root, "alice", [proposal, exhibit])
            self.assertFalse(report.ok)
            self.assertIn("external asset URLs", "\n".join(report.errors))

    def test_exhibit_path_traversal_fails_validation(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            proposal = "submissions/alice/ai-urban-loop/proposal.md"
            exhibit = "submissions/alice/ai-urban-loop/exhibit.json"
            bad_exhibit = json.loads(json.dumps(VALID_EXHIBIT))
            bad_exhibit["hero"]["image"] = "../secrets/hero.png"
            self.write(root, proposal)
            self.write_json(root, exhibit, bad_exhibit)
            report = validate_submission(root, "alice", [proposal, exhibit])
            self.assertFalse(report.ok)
            self.assertIn("unsafe asset path", "\n".join(report.errors))

    def test_exhibit_unknown_module_fails_validation(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            proposal = "submissions/alice/ai-urban-loop/proposal.md"
            exhibit = "submissions/alice/ai-urban-loop/exhibit.json"
            bad_exhibit = json.loads(json.dumps(VALID_EXHIBIT))
            bad_exhibit["modules"][0]["type"] = "custom_html"
            self.write(root, proposal)
            self.write_json(root, exhibit, bad_exhibit)
            self.write(root, "submissions/alice/ai-urban-loop/assets/hero.png", "placeholder")
            report = validate_submission(root, "alice", [proposal, exhibit])
            self.assertFalse(report.ok)
            self.assertIn("unsupported module type", "\n".join(report.errors))

    def test_exhibit_invalid_json_fails_validation(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            proposal = "submissions/alice/ai-urban-loop/proposal.md"
            exhibit = "submissions/alice/ai-urban-loop/exhibit.json"
            self.write(root, proposal)
            self.write(root, exhibit, "{not-json")
            report = validate_submission(root, "alice", [proposal, exhibit])
            self.assertFalse(report.ok)
            self.assertIn("invalid JSON", "\n".join(report.errors))

    def test_changelog_submission_passes_hard_validation(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            proposal = "submissions/alice/ai-urban-loop/proposal.md"
            changelog = "submissions/alice/ai-urban-loop/changelog.md"
            self.write(root, proposal, VALID_BODY.replace('summary: "围绕百年京张 AI 创新带提出城市智能体、慢行网络和产业场景协同方案。"', 'summary: "围绕百年京张 AI 创新带提出城市智能体、慢行网络和产业场景协同方案。"\niteration: "v0.1"'))
            self.write(root, changelog, VALID_CHANGELOG)

            report = validate_submission(root, "alice", [proposal, changelog])

            self.assertTrue(report.ok, report.errors)
            self.assertEqual(report.changelog_files, [changelog])

    def test_changelog_bad_version_heading_fails_validation(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            proposal = "submissions/alice/ai-urban-loop/proposal.md"
            changelog = "submissions/alice/ai-urban-loop/changelog.md"
            self.write(root, proposal)
            self.write(root, changelog, VALID_CHANGELOG.replace("## v0.1 - 2026-06-14", "## 首版"))

            report = validate_submission(root, "alice", [proposal, changelog])

            self.assertFalse(report.ok)
            self.assertIn("version heading", "\n".join(report.errors))

    def test_invalid_iteration_metadata_fails_validation(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            proposal = "submissions/alice/ai-urban-loop/proposal.md"
            self.write(root, proposal, VALID_BODY.replace(
                'summary: "围绕百年京张 AI 创新带提出城市智能体、慢行网络和产业场景协同方案。"',
                'summary: "围绕百年京张 AI 创新带提出城市智能体、慢行网络和产业场景协同方案。"\niteration: "first draft"',
            ))

            report = validate_submission(root, "alice", [proposal])

            self.assertFalse(report.ok)
            self.assertIn("iteration must look like", "\n".join(report.errors))

    def test_renderer_outputs_nonempty_escaped_html(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            proposal = root / "proposal.md"
            exhibit = root / "exhibit.json"
            proposal.write_text(
                VALID_BODY.replace(
                    'title: "AI Urban Loop"',
                    'title: "<script>alert(1)</script> 城市智能体环"',
                )
                + "\n## 额外说明\n\n<script>bad()</script>",
                encoding="utf-8",
            )
            render_exhibit = json.loads(json.dumps(VALID_EXHIBIT))
            render_exhibit["hero"].pop("image")
            exhibit.write_text(json.dumps(render_exhibit, ensure_ascii=False), encoding="utf-8")

            html = render_html(proposal, exhibit)

            self.assertIn("&lt;script&gt;alert(1)&lt;/script&gt; 城市智能体环", html)
            self.assertNotIn("<script>alert(1)</script>", html)
            self.assertIn("&lt;script&gt;bad()&lt;/script&gt;", html)
            self.assertNotIn("<script>bad()</script>", html)
            self.assertIn("本展示摘要来自结构化 exhibit.json。", html)
            self.assertIn("完整方案正文", html)
            self.assertIn("海淀具备高校、企业、科研机构", html)
            self.assertGreater(len(html), 1000)

    def test_portal_renderer_outputs_card(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            proposal_dir = root / "examples" / "agent-civic-loop"
            output = root / "examples" / "portal" / "index.html"
            proposal_dir.mkdir(parents=True)
            (proposal_dir / "proposal.md").write_text(VALID_BODY, encoding="utf-8")
            (proposal_dir / "exhibit.json").write_text(
                json.dumps(VALID_EXHIBIT, ensure_ascii=False),
                encoding="utf-8",
            )
            (proposal_dir / "assets").mkdir()
            (proposal_dir / "assets" / "hero.png").write_text("placeholder", encoding="utf-8")

            card = load_card(proposal_dir, output.parent)
            html = render_portal([card], "Portal Test")

            self.assertIn("Portal Test", html)
            self.assertIn("AI Urban Loop", html)
            self.assertIn("可学习、可复核的城市智能体环", html)
            self.assertIn("../agent-civic-loop/index.html", html)
            self.assertIn("../agent-civic-loop/assets/hero.png", html)


if __name__ == "__main__":
    unittest.main()
