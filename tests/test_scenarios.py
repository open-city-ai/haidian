import json
import sys
import tempfile
import unittest
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(REPO_ROOT / "scripts"))

from render_portal import load_card, render_portal  # noqa: E402
from validate_submission import load_scenario_registry, load_track_registry  # noqa: E402


class ScenarioLibraryTests(unittest.TestCase):
    def test_scenario_registry_has_required_cards(self) -> None:
        registry = load_scenario_registry(REPO_ROOT)
        self.assertIn("ai-traffic-walkability", registry)
        self.assertIn("enterprise-service-copilot", registry)
        for scenario in registry.values():
            self.assertEqual(scenario["version"], 1)
            self.assertTrue(scenario["title"])
            self.assertTrue(scenario["tracks"])
            self.assertTrue(scenario["human_review"])

    def test_portal_renders_scenario_filter_and_card_scenarios(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            proposal_dir = root / "proposal"
            (proposal_dir / "assets").mkdir(parents=True)
            (proposal_dir / "assets" / "cover.png").write_bytes(b"png")
            (proposal_dir / "proposal.md").write_text(
                """---
title: "Scenario Test"
author_github: "alice"
language: "zh"
license: "CC-BY-4.0"
summary: "测试场景卡片在 portal 中展示。"
tracks: ["civic-agent-governance"]
scenarios: ["ai-traffic-walkability", "enterprise-service-copilot"]
---

# Scenario Test
""",
                encoding="utf-8",
            )
            (proposal_dir / "exhibit.json").write_text(
                json.dumps(
                    {
                        "version": 1,
                        "card": {
                            "title": "Scenario Test",
                            "subtitle": "场景测试",
                            "summary": "测试场景卡片在 portal 中展示。",
                            "cover": "assets/cover.png",
                            "tags": ["测试"],
                        },
                    },
                    ensure_ascii=False,
                ),
                encoding="utf-8",
            )

            tracks = load_track_registry(REPO_ROOT)
            scenarios = load_scenario_registry(REPO_ROOT)
            card = load_card(proposal_dir, root / "portal", tracks, scenarios)
            html = render_portal([card], "Scenario Portal")

            self.assertIn('data-scenario-filter="ai-traffic-walkability"', html)
            self.assertIn('data-scenarios="ai-traffic-walkability enterprise-service-copilot"', html)
            self.assertIn("AI+交通慢行评估", html)
            self.assertIn("企业服务 Copilot", html)


if __name__ == "__main__":
    unittest.main()
