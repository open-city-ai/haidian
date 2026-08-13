from __future__ import annotations

import json
import subprocess
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
COVER_SCRIPT = ROOT / "proposal-cover.js"

NODE_RUNNER = r"""
globalThis.window = globalThis;
eval(process.argv[1]);
const item = JSON.parse(process.argv[2]);
const first = renderCover(item, 4, 'Rendered title');
const second = renderCover(item, 4, 'Rendered title');
let removed = 0;
let classRemoved = '';
const restored = [];
handleCoverImageError({
  closest(selector) {
    if (selector === '.cover-custom-layer') return {remove() { removed += 1; }};
    if (selector === '.cover-art') return {
      classList: {remove(name) { classRemoved = name; }},
      querySelector(selector) {
        return {style: {set visibility(value) { restored.push([selector, value]); }}};
      },
    };
    return null;
  },
});
process.stdout.write(JSON.stringify({first, second, removed, classRemoved, restored}));
"""


def render(item: dict) -> dict:
    completed = subprocess.run(
        ["node", "-e", NODE_RUNNER, COVER_SCRIPT.read_text(encoding="utf-8"), json.dumps(item)],
        capture_output=True,
        text=True,
        check=False,
    )
    if completed.returncode:
        raise AssertionError(completed.stdout + completed.stderr)
    return json.loads(completed.stdout)


class ProposalCoverTests(unittest.TestCase):
    def test_generated_cover_remains_deterministic(self) -> None:
        result = render({"title": "Plan", "author": "alice", "tags": ["rail"]})
        self.assertEqual(result["first"], result["second"])
        self.assertEqual(60, result["first"].count('class="cover-tile"'))
        self.assertNotIn("cover-custom-layer", result["first"])

    def test_custom_cover_keeps_generated_fallback_and_escapes_metadata(self) -> None:
        result = render(
            {
                "title": "Plan",
                "author": '<alice & bob>',
                "tags": [],
                "coverUrl": 'assets/media/cover.webp?x="quoted"&y=1',
            }
        )
        markup = result["first"]
        self.assertEqual(60, markup.count('class="cover-tile"'))
        self.assertIn('class="cover-art cover-art-custom"', markup)
        self.assertIn('class="cover-custom-layer"', markup)
        self.assertNotIn('cover-custom-layer" style="position:absolute;z-index:', markup)
        self.assertIn("onerror=\"handleCoverImageError(this)\"", markup)
        self.assertIn("cover.webp?x=&quot;quoted&quot;&amp;y=1", markup)
        self.assertIn("@&lt;alice &amp; bob&gt; · AGENT COVER", markup)
        self.assertIn("@&lt;alice &amp; bob&gt; · OPEN CITY PROPOSAL", markup)

    def test_image_error_removes_only_custom_layer_and_class(self) -> None:
        result = render({"title": "Plan", "author": "alice", "coverUrl": "cover.png"})
        self.assertEqual(1, result["removed"])
        self.assertEqual("cover-art-custom", result["classRemoved"])
        self.assertEqual(
            [[".cover-signal", ""], [".cover-default-copy", ""]],
            result["restored"],
        )


if __name__ == "__main__":
    unittest.main()
