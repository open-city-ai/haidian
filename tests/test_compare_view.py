import json
import sys
import tempfile
import unittest
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(REPO_ROOT / "scripts"))

from render_portal import load_card, render_portal  # noqa: E402
from validate_submission import load_scenario_registry, load_track_registry  # noqa: E402


class CompareViewTests(unittest.TestCase):
    def write_proposal(self, root: Path, name: str, track: str, module_type: str) -> Path:
        proposal_dir = root / name
        (proposal_dir / "assets").mkdir(parents=True)
        (proposal_dir / "assets" / "cover.png").write_bytes(b"png")
        (proposal_dir / "proposal.md").write_text(
            f"""---
title: "{name}"
author_github: "alice"
language: "zh"
license: "CC-BY-4.0"
summary: "{name} 的方案摘要。"
tracks: ["{track}"]
---

# {name}
""",
            encoding="utf-8",
        )
        (proposal_dir / "exhibit.json").write_text(
            json.dumps(
                {
                    "version": 1,
                    "card": {
                        "title": name,
                        "subtitle": "对比测试",
                        "summary": f"{name} 的方案摘要。",
                        "cover": "assets/cover.png",
                        "tags": ["公共空间", "产业服务"],
                    },
                    "modules": [
                        {
                            "type": module_type,
                            "title": "对比模块",
                            "items": ["慢行节点", "公共服务前台"],
                        }
                    ],
                },
                ensure_ascii=False,
            ),
            encoding="utf-8",
        )
        return proposal_dir

    def test_portal_outputs_compare_view_data(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            first = self.write_proposal(root, "方案A", "civic-agent-governance", "spatial_strategy")
            second = self.write_proposal(root, "方案B", "youth-friendly-public-space", "timeline")
            registry = load_track_registry(REPO_ROOT)
            scenarios = load_scenario_registry(REPO_ROOT)
            cards = [
                load_card(first, root / "portal", registry, scenarios),
                load_card(second, root / "portal", registry, scenarios),
            ]

            html = render_portal(cards, "Compare Portal")

            self.assertIn("window.PROPOSALS", html)
            self.assertIn("方案对比", html)
            self.assertIn("data-compare-check", html)
            self.assertIn("公共空间策略", html)
            self.assertIn("落地路径", html)
            self.assertIn("方案A", html)
            self.assertIn("方案B", html)


if __name__ == "__main__":
    unittest.main()
