from __future__ import annotations

import json
import re
import subprocess
import sys
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
DATA_FILE = ROOT / "source-registry-data.js"
AGENT_FILE = ROOT / "agent.html"


class SourceRegistryFrontendTests(unittest.TestCase):
    def load_data(self) -> dict:
        text = DATA_FILE.read_text(encoding="utf-8")
        match = re.search(r"window\.HAIDIAN_SOURCE_REGISTRY = (\{.*\});\s*$", text, re.S)
        self.assertIsNotNone(match)
        return json.loads(match.group(1))

    def test_generated_source_registry_data_is_current(self) -> None:
        completed = subprocess.run(
            [sys.executable, str(ROOT / "scripts" / "generate_source_registry_data.py"), "--check"],
            cwd=ROOT,
            capture_output=True,
            text=True,
            check=False,
        )
        self.assertEqual(completed.returncode, 0, completed.stdout + completed.stderr)

    def test_source_registry_frontend_data_shape(self) -> None:
        data = self.load_data()
        self.assertIn("counts", data)
        self.assertIn("formal", data)
        self.assertIn("background", data)
        self.assertIn("provisional", data)
        self.assertGreaterEqual(data["counts"]["total"], 1)

    def test_agent_page_renders_source_registry_panel(self) -> None:
        html = AGENT_FILE.read_text(encoding="utf-8")
        self.assertIn("source-registry-data.js", html)
        self.assertIn("sourceRegistryPanel", html)
        self.assertIn("renderSourceRegistry", html)
        self.assertIn("registry.formal", html)


if __name__ == "__main__":
    unittest.main()
