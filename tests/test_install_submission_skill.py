from __future__ import annotations

import json
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[1]
INSTALLER = REPO_ROOT / "scripts" / "install_submission_skill.py"


class InstallSubmissionSkillTests(unittest.TestCase):
    def run_installer(self, codex_home: Path, *args: str) -> subprocess.CompletedProcess[str]:
        return subprocess.run(
            [sys.executable, str(INSTALLER), "--codex-home", str(codex_home), *args, "--json"],
            cwd=REPO_ROOT,
            capture_output=True,
            text=True,
            check=False,
        )

    def test_check_detects_stale_file_and_reinstall_removes_it(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            codex_home = Path(tmp)
            installed = self.run_installer(codex_home)
            self.assertEqual(installed.returncode, 0, installed.stdout + installed.stderr)

            target = codex_home / "skills" / "urban-design-ai-submission"
            stale = target / "stale.md"
            stale.write_text("obsolete\n", encoding="utf-8")

            checked = self.run_installer(codex_home, "--check")
            self.assertNotEqual(checked.returncode, 0, checked.stdout + checked.stderr)
            check_report = json.loads(checked.stdout)
            self.assertFalse(check_report["ok"])
            self.assertFalse(check_report["up_to_date"])

            reinstalled = self.run_installer(codex_home)
            self.assertEqual(reinstalled.returncode, 0, reinstalled.stdout + reinstalled.stderr)
            reinstall_report = json.loads(reinstalled.stdout)
            self.assertTrue(reinstall_report["ok"])
            self.assertTrue(reinstall_report["up_to_date"])
            self.assertFalse(stale.exists())


if __name__ == "__main__":
    unittest.main()
