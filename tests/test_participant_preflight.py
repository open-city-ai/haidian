from __future__ import annotations

import importlib.util
import subprocess
import sys
import unittest
from pathlib import Path
from unittest.mock import patch


REPO_ROOT = Path(__file__).resolve().parents[1]
SCRIPT = REPO_ROOT / "scripts" / "participant_preflight.py"
SPEC = importlib.util.spec_from_file_location("participant_preflight", SCRIPT)
assert SPEC and SPEC.loader
participant_preflight = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(participant_preflight)


class ParticipantPreflightEncodingTests(unittest.TestCase):
    def test_run_decodes_utf8_non_ascii_subprocess_output(self) -> None:
        completed = participant_preflight.run(
            [
                sys.executable,
                "-c",
                "import sys; sys.stdout.buffer.write('海淀/路径\\n'.encode('utf-8'))",
            ],
            REPO_ROOT,
        )

        self.assertEqual(completed.returncode, 0)
        self.assertEqual(completed.stdout, "海淀/路径\n")

    def test_run_forces_utf8_and_replaces_invalid_bytes(self) -> None:
        expected = subprocess.CompletedProcess(
            ["git", "status"],
            0,
            stdout="海淀规划\n",
            stderr="",
        )
        with patch.object(participant_preflight.subprocess, "run", return_value=expected) as mocked:
            completed = participant_preflight.run(["git", "status"], REPO_ROOT)

        mocked.assert_called_once_with(
            ["git", "status"],
            cwd=REPO_ROOT,
            capture_output=True,
            text=True,
            encoding="utf-8",
            errors="replace",
            check=False,
        )
        self.assertEqual(completed.stdout, "海淀规划\n")


if __name__ == "__main__":
    unittest.main()
