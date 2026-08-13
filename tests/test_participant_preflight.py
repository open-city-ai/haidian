from __future__ import annotations

import importlib.util
import os
import subprocess
import sys
import tempfile
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
            [sys.executable, "-c", "import sys; sys.stdout.buffer.write('海淀/路径\\n'.encode('utf-8'))"],
            REPO_ROOT,
        )
        self.assertEqual(completed.returncode, 0)
        self.assertEqual(completed.stdout, "海淀/路径\n")

    def test_run_forces_python_child_tree_to_utf8_under_legacy_locale(self) -> None:
        with patch.dict(os.environ, {"PYTHONUTF8": "0", "PYTHONIOENCODING": "cp936"}):
            completed = participant_preflight.run(
                [sys.executable, "-c", "print('海淀路径')"],
                REPO_ROOT,
            )
        self.assertEqual(completed.returncode, 0, completed.stderr)
        self.assertEqual(completed.stdout, "海淀路径\n")

    def test_run_replaces_invalid_subprocess_bytes(self) -> None:
        completed = participant_preflight.run(
            [sys.executable, "-c", "import sys; sys.stdout.buffer.write(b'\\xff')"],
            REPO_ROOT,
        )
        self.assertEqual(completed.returncode, 0, completed.stderr)
        self.assertEqual(completed.stdout, "\ufffd")

    def test_run_passes_explicit_utf8_contract(self) -> None:
        expected = subprocess.CompletedProcess(["git", "status"], 0, stdout="海淀规划\n", stderr="")
        with patch.object(participant_preflight.subprocess, "run", return_value=expected) as mocked:
            completed = participant_preflight.run(["git", "status"], REPO_ROOT)
        mocked.assert_called_once()
        args, kwargs = mocked.call_args
        self.assertEqual((["git", "status"],), args)
        self.assertEqual(REPO_ROOT, kwargs["cwd"])
        self.assertTrue(kwargs["capture_output"])
        self.assertTrue(kwargs["text"])
        self.assertEqual("utf-8", kwargs["encoding"])
        self.assertEqual("replace", kwargs["errors"])
        self.assertFalse(kwargs["check"])
        self.assertEqual("1", kwargs["env"]["PYTHONUTF8"])
        self.assertEqual("utf-8", kwargs["env"]["PYTHONIOENCODING"])
        self.assertEqual(completed.stdout, "海淀规划\n")

    def test_file_inventory_reports_total_bytes(self) -> None:
        """file_inventory must return total size and per-file sizes."""
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            (root / "proposal.md").write_bytes(b"x" * 1000)
            (root / "manifest.json").write_bytes(b"y" * 500)
            inventory, total = participant_preflight.file_inventory(root)
            self.assertEqual(total, 1500)
            paths = [item["path"] for item in inventory]
            self.assertIn("proposal.md", paths)
            self.assertIn("manifest.json", paths)
            sizes = {item["path"]: item["bytes"] for item in inventory}
            self.assertEqual(sizes["proposal.md"], 1000)
            self.assertEqual(sizes["manifest.json"], 500)

    def test_render_text_includes_blockers_and_warnings(self) -> None:
        """render_text must show blockers and warnings sections."""
        report = {
            "ok": False,
            "submission_dir": "submissions/alice/test",
            "branch": "submission/alice/test",
            "changed_files": [],
            "package_bytes": 0,
            "blockers": ["submission path must be submissions/<github-login>/<proposal-slug>"],
            "warnings": ["workspace is not a blobless partial clone"],
            "next_commands": [],
        }
        text = participant_preflight.render_text(report)
        self.assertIn("FAIL", text)
        self.assertIn("Blockers:", text)
        self.assertIn("submission path must be", text)
        self.assertIn("Warnings:", text)
        self.assertIn("blobless partial clone", text)


if __name__ == "__main__":
    unittest.main()
