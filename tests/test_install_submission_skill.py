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

    def test_symlinked_skills_parent_outside_codex_home_is_rejected(self) -> None:
        for args in [(), ("--check",)]:
            with self.subTest(args=args), tempfile.TemporaryDirectory() as tmp:
                root = Path(tmp)
                codex_home = root / "home"
                outside = root / "outside"
                codex_home.mkdir()
                outside.mkdir()
                (codex_home / "skills").symlink_to(outside, target_is_directory=True)

                target = outside / "urban-design-ai-submission"
                target.mkdir()
                (target / "SKILL.md").write_text("external skill\n", encoding="utf-8")
                sentinel = target / "sentinel.txt"
                sentinel.write_text("DO NOT DELETE\n", encoding="utf-8")

                completed = self.run_installer(codex_home, *args)

                self.assertNotEqual(completed.returncode, 0, completed.stdout + completed.stderr)
                report = json.loads(completed.stdout)
                self.assertEqual(report["action"], "unsafe-target")
                self.assertFalse(report["target_safe"])
                self.assertFalse(report["installed"])
                self.assertEqual(sentinel.read_text(encoding="utf-8"), "DO NOT DELETE\n")

    def test_install_is_noop_when_source_and_target_are_the_same(self) -> None:
        skill_file = REPO_ROOT / "skills" / "urban-design-ai-submission" / "SKILL.md"
        original = skill_file.read_bytes()

        completed = self.run_installer(REPO_ROOT)

        self.assertEqual(completed.returncode, 0, completed.stdout + completed.stderr)
        report = json.loads(completed.stdout)
        self.assertTrue(report["ok"])
        self.assertTrue(report["up_to_date"])
        self.assertEqual(report["source_sha256"], report["target_sha256"])
        self.assertEqual(skill_file.read_bytes(), original)


if __name__ == "__main__":
    unittest.main()
