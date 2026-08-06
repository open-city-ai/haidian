import json
import sys
import tempfile
import unittest
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(REPO_ROOT / "scripts"))

from render_portal import load_card, render_portal  # noqa: E402
from validate_submission import load_scenario_registry, load_track_registry  # noqa: E402


class SpatialConceptTests(unittest.TestCase):
    def test_portal_renders_spatial_concepts(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            proposal_dir = root / "proposal"
            (proposal_dir / "assets").mkdir(parents=True)
            (proposal_dir / "assets" / "cover.png").write_bytes(b"png")
            (proposal_dir / "proposal.md").write_text(
                """---
title: "Spatial Test"
author_github: "alice"
language: "zh"
license: "CC-BY-4.0"
summary: "测试概念空间节点在 portal 中展示。"
tracks: ["youth-friendly-public-space"]
scenarios: ["ai-traffic-walkability"]
---

# Spatial Test
""",
                encoding="utf-8",
            )
            (proposal_dir / "exhibit.json").write_text(
                json.dumps(
                    {
                        "version": 1,
                        "card": {
                            "title": "Spatial Test",
                            "subtitle": "空间测试",
                            "summary": "测试概念空间节点在 portal 中展示。",
                            "cover": "assets/cover.png",
                            "tags": ["公共空间"],
                        },
                    },
                    ensure_ascii=False,
                ),
                encoding="utf-8",
            )
            (proposal_dir / "spatial.json").write_text(
                json.dumps(
                    {
                        "version": 1,
                        "disclaimer": "concept-only",
                        "items": [
                            {
                                "id": "node-youth-hub",
                                "type": "node",
                                "title": "青年创新会客厅",
                                "summary": "面向青年团队和居民的公共活动节点。",
                                "source": "brief/public-brief.md",
                                "public_level": "public",
                                "geometry": {"mode": "concept", "label": "京张铁路遗址公园沿线"},
                            }
                        ],
                    },
                    ensure_ascii=False,
                ),
                encoding="utf-8",
            )

            tracks = load_track_registry(REPO_ROOT)
            scenarios = load_scenario_registry(REPO_ROOT)
            card = load_card(proposal_dir, root / "portal", tracks, scenarios)
            html = render_portal([card], "Spatial Portal")

            self.assertIn("概念空间", html)
            self.assertIn("concept-only", html)
            self.assertIn("青年创新会客厅", html)
            self.assertIn("京张铁路遗址公园沿线", html)


if __name__ == "__main__":
    unittest.main()
