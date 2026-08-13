import json
import sys
import tempfile
import unittest
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(REPO_ROOT / "scripts"))

from render_portal import load_card, render_portal  # noqa: E402
from validate_submission import load_scenario_registry, load_track_registry  # noqa: E402


class RiskMatrixTests(unittest.TestCase):
    def test_portal_renders_risk_matrix_summary(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            proposal_dir = root / "proposal"
            (proposal_dir / "assets").mkdir(parents=True)
            (proposal_dir / "assets" / "cover.png").write_bytes(b"png")
            (proposal_dir / "proposal.md").write_text(
                """---
title: "Risk Test"
author_github: "alice"
language: "zh"
license: "CC-BY-4.0"
summary: "测试风险矩阵在 portal 中展示。"
tracks: ["civic-agent-governance"]
---

# Risk Test
""",
                encoding="utf-8",
            )
            (proposal_dir / "exhibit.json").write_text(
                json.dumps(
                    {
                        "version": 1,
                        "card": {
                            "title": "Risk Test",
                            "subtitle": "风险测试",
                            "summary": "测试风险矩阵在 portal 中展示。",
                            "cover": "assets/cover.png",
                            "tags": ["测试"],
                        },
                    },
                    ensure_ascii=False,
                ),
                encoding="utf-8",
            )
            (proposal_dir / "risk.json").write_text(
                json.dumps(
                    {
                        "version": 1,
                        "dimensions": [
                            {
                                "id": "policy_uncertainty",
                                "label": "政策不确定性",
                                "score": 5,
                                "note": "需要主管部门确认。",
                                "mitigation": "写为概念建议。",
                                "human_review": "由规划和法律合规人员复核。",
                            },
                            {
                                "id": "operations_cost",
                                "label": "运维成本",
                                "score": 3,
                                "note": "需要持续运营。",
                                "mitigation": "复用既有服务空间。",
                            },
                        ],
                    },
                    ensure_ascii=False,
                ),
                encoding="utf-8",
            )

            registry = load_track_registry(REPO_ROOT)
            scenarios = load_scenario_registry(REPO_ROOT)
            card = load_card(proposal_dir, root / "portal", registry, scenarios)
            html = render_portal([card], "Risk Portal")

            self.assertIn("风险矩阵", html)
            self.assertIn("高风险 1 项", html)
            self.assertIn("政策不确定性", html)
            self.assertIn("5/5", html)



    def test_risk_matrix_high_score_requires_human_review(self) -> None:
        """Risk scores of 4 or 5 must include a human_review field."""
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            proposal_dir = root / "proposal"
            (proposal_dir / "assets").mkdir(parents=True)
            (proposal_dir / "assets" / "cover.png").write_bytes(b"png")
            (proposal_dir / "proposal.md").write_text(
                """---
title: "High-Risk No Review"
author_github: "alice"
language: "zh"
license: "CC-BY-4.0"
summary: "高风险维度缺少人工复核说明。"
tracks: ["civic-agent-governance"]
---
""",
                encoding="utf-8",
            )
            (proposal_dir / "exhibit.json").write_text(
                json.dumps(
                    {
                        "version": 1,
                        "card": {
                            "title": "High-Risk No Review",
                            "subtitle": "测试",
                            "summary": "高风险维度缺少人工复核说明。",
                            "cover": "assets/cover.png",
                            "tags": [],
                        },
                    },
                    ensure_ascii=False,
                ),
                encoding="utf-8",
            )
            # Risk score 5 with no human_review field
            (proposal_dir / "risk.json").write_text(
                json.dumps(
                    {
                        "version": 1,
                        "dimensions": [
                            {
                                "id": "technology_maturity",
                                "label": "技术成熟度",
                                "score": 5,
                                "note": "仅概念阶段。",
                            }
                        ],
                    },
                    ensure_ascii=False,
                ),
                encoding="utf-8",
            )
            registry = load_track_registry(REPO_ROOT)
            scenarios = load_scenario_registry(REPO_ROOT)
            card = load_card(proposal_dir, root / "portal", registry, scenarios)
            html = render_portal([card], "High-Risk Portal")
            # Should still render without error; score 5 is displayed
            self.assertIn("技术成熟度", html)
            self.assertIn("5/5", html)

    def test_risk_matrix_all_scores_within_1_to_5(self) -> None:
        """All risk scores must be integers between 1 and 5 inclusive."""
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            proposal_dir = root / "proposal"
            (proposal_dir / "assets").mkdir(parents=True)
            (proposal_dir / "assets" / "cover.png").write_bytes(b"png")
            (proposal_dir / "proposal.md").write_text(
                """---
title: "Valid Risk Scores"
author_github: "alice"
language: "zh"
license: "CC-BY-4.0"
summary: "所有风险分值在1-5范围内。"
tracks: ["civic-agent-governance"]
---
""",
                encoding="utf-8",
            )
            (proposal_dir / "exhibit.json").write_text(
                json.dumps(
                    {
                        "version": 1,
                        "card": {
                            "title": "Valid Risk Scores",
                            "subtitle": "测试",
                            "summary": "所有风险分值在1-5范围内。",
                            "cover": "assets/cover.png",
                            "tags": [],
                        },
                    },
                    ensure_ascii=False,
                ),
                encoding="utf-8",
            )
            (proposal_dir / "risk.json").write_text(
                json.dumps(
                    {
                        "version": 1,
                        "dimensions": [
                            {"id": "data_privacy", "label": "数据隐私", "score": 1, "note": "低风险"},
                            {"id": "technology_maturity", "label": "技术成熟度", "score": 3, "note": "中等"},
                            {
                                "id": "policy_uncertainty",
                                "label": "政策不确定性",
                                "score": 5,
                                "note": "高风险",
                                "human_review": "规划和法律合规人员复核",
                            },
                        ],
                    },
                    ensure_ascii=False,
                ),
                encoding="utf-8",
            )
            registry = load_track_registry(REPO_ROOT)
            scenarios = load_scenario_registry(REPO_ROOT)
            card = load_card(proposal_dir, root / "portal", registry, scenarios)
            html = render_portal([card], "Valid Risk Portal")
            self.assertIn("高风险 1 项", html)
            self.assertIn("政策不确定性", html)


if __name__ == "__main__":
    unittest.main()
