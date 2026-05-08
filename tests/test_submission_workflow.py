import sys
import tempfile
import unittest
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(REPO_ROOT / "scripts"))

from validate_submission import validate_submission  # noqa: E402


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


class SubmissionWorkflowTests(unittest.TestCase):
    def write(self, root: Path, rel: str, content: str = VALID_BODY) -> None:
        path = root / rel
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text(content, encoding="utf-8")

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


if __name__ == "__main__":
    unittest.main()
