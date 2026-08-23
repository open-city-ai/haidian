import json
import sys
import tempfile
import unittest
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(REPO_ROOT / "scripts"))

from render_portal import load_card, load_collections, render_portal  # noqa: E402
from validate_submission import load_scenario_registry, load_track_registry  # noqa: E402


class CollectionTests(unittest.TestCase):
    def write_proposal(self, root: Path) -> Path:
        proposal_dir = root / "examples" / "agent-civic-loop"
        (proposal_dir / "assets").mkdir(parents=True)
        (proposal_dir / "assets" / "cover.png").write_bytes(b"png")
        (proposal_dir / "proposal.md").write_text(
            """---
title: "Collection Test"
author_github: "agent-civic-loop"
language: "zh"
license: "CC-BY-4.0"
summary: "测试精选合集。"
tracks: ["civic-agent-governance"]
---

# Collection Test
""",
            encoding="utf-8",
        )
        (proposal_dir / "exhibit.json").write_text(
            json.dumps(
                {
                    "version": 1,
                    "card": {
                        "title": "Collection Test",
                        "subtitle": "合集测试",
                        "summary": "测试精选合集。",
                        "cover": "assets/cover.png",
                        "tags": ["城市智能体"],
                    },
                },
                ensure_ascii=False,
            ),
            encoding="utf-8",
        )
        return proposal_dir

    def test_portal_renders_collection_section(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            proposal_dir = self.write_proposal(root)
            collections_dir = root / "collections"
            collections_dir.mkdir()
            (collections_dir / "featured.json").write_text(
                json.dumps(
                    {
                        "version": 1,
                        "title": "最佳 AI 治理",
                        "summary": "关注公开资料、公众反馈和人工复核。",
                        "selection_reason": "强调 AI 不替代专业判断。",
                        "badge": "AI 治理",
                        "items": [
                            {
                                "proposal": "examples/agent-civic-loop",
                                "reason": "把 agent 推演和人工复核组织成闭环。",
                                "highlight": "治理闭环",
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
            collections = load_collections(collections_dir, [card])
            html = render_portal([card], "Collection Portal", collections=collections)

            collection_item = collections[0]["items"][0]
            self.assertTrue(collection_item["loaded"])
            self.assertEqual(
                collection_item["url"],
                "../examples/agent-civic-loop/index.html",
            )
            self.assertIn("精选专题", html)
            self.assertIn("最佳 AI 治理", html)
            self.assertIn("治理闭环", html)
            self.assertIn("Collection Test", html)
            self.assertIn('../examples/agent-civic-loop/index.html', html)
            self.assertNotIn("未载入 portal", html)


if __name__ == "__main__":
    unittest.main()
