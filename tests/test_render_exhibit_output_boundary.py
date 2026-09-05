from __future__ import annotations

import json
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[1]
SCRIPT = REPO_ROOT / "scripts" / "render_exhibit.py"


class RenderExhibitOutputBoundaryTests(unittest.TestCase):
    def test_output_cannot_overwrite_an_input(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            proposal = root / "proposal.md"
            exhibit = root / "exhibit.json"
            proposal.write_text("---\ntitle: Test\n---\n\n# Test\n", encoding="utf-8")
            exhibit.write_text(json.dumps({"version": 1, "modules": []}), encoding="utf-8")

            for label, output in (("proposal", proposal), ("exhibit", exhibit)):
                with self.subTest(label=label):
                    original = output.read_bytes()
                    completed = subprocess.run(
                        [sys.executable, str(SCRIPT), str(proposal), str(exhibit), str(output)],
                        capture_output=True,
                        text=True,
                        check=False,
                    )

                    self.assertNotEqual(completed.returncode, 0)
                    self.assertIn(f"output must not overwrite the {label} input", completed.stderr)
                    self.assertEqual(output.read_bytes(), original)


if __name__ == "__main__":
    unittest.main()
