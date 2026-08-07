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


if __name__ == "__main__":
    unittest.main()
