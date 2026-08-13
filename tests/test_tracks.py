import json
import sys
import tempfile
import unittest
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(REPO_ROOT / "scripts"))

from render_portal import load_card, render_portal  # noqa: E402
from validate_submission import load_scenario_registry, load_track_registry, parse_track_metadata  # noqa: E402


class TrackFeatureTests(unittest.TestCase):
    def test_track_registry_has_unique_ids(self) -> None:
        data = json.loads((REPO_ROOT / "tracks.json").read_text(encoding="utf-8"))
        track_ids = [item["id"] for item in data["tracks"]]
        self.assertEqual(len(track_ids), len(set(track_ids)))
        self.assertIn("civic-agent-governance", track_ids)
        for item in data["tracks"]:
            self.assertTrue(item["title"])
            self.assertTrue(item["summary"])

    def test_parse_track_metadata_accepts_json_array_and_csv(self) -> None:
        self.assertEqual(
            parse_track_metadata('["ai-traffic-walkability", "civic-agent-governance"]'),
            ["ai-traffic-walkability", "civic-agent-governance"],
        )
        self.assertEqual(
            parse_track_metadata("ai-traffic-walkability, civic-agent-governance"),
            ["ai-traffic-walkability", "civic-agent-governance"],
        )

    def test_portal_renders_track_filter_and_card_tracks(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            proposal_dir = root / "proposal"
            (proposal_dir / "assets").mkdir(parents=True)
            (proposal_dir / "assets" / "cover.png").write_bytes(b"png")
            (proposal_dir / "proposal.md").write_text(
                """---
title: "Track Test"
author_github: "alice"
language: "zh"
license: "CC-BY-4.0"
summary: "测试主题赛道在 portal 中展示。"
tracks: ["civic-agent-governance", "youth-friendly-public-space"]
---

# Track Test
""",
                encoding="utf-8",
            )
            (proposal_dir / "exhibit.json").write_text(
                json.dumps(
                    {
                        "version": 1,
                        "card": {
                            "title": "Track Test",
                            "subtitle": "赛道测试",
                            "summary": "测试主题赛道在 portal 中展示。",
                            "cover": "assets/cover.png",
                            "tags": ["测试"],
                        },
                    },
                    ensure_ascii=False,
                ),
                encoding="utf-8",
            )

            registry = load_track_registry(REPO_ROOT)
            scenarios = load_scenario_registry(REPO_ROOT)
            card = load_card(proposal_dir, root / "portal", registry, scenarios)
            html = render_portal([card], "Track Portal")

            self.assertIn('data-track-filter="civic-agent-governance"', html)
            self.assertIn('data-tracks="civic-agent-governance youth-friendly-public-space"', html)
            self.assertIn("城市智能体治理", html)
            self.assertIn("青年友好公共空间", html)



    def test_track_count_does_not_exceed_eight(self) -> None:
        """The track registry should not grow beyond 8 entries without a rubric update."""
        data = json.loads((REPO_ROOT / "tracks.json").read_text(encoding="utf-8"))
        self.assertLessEqual(
            len(data["tracks"]),
            8,
            "More than 8 tracks are registered; update docs/tracks.md and the rubric if adding new ones",
        )


if __name__ == "__main__":
    unittest.main()
