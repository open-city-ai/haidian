from __future__ import annotations

import importlib.util
import io
import os
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

    def test_run_forces_python_child_tree_to_utf8_under_legacy_locale(self) -> None:
        with patch.dict(
            os.environ,
            {"PYTHONUTF8": "0", "PYTHONIOENCODING": "cp936"},
        ):
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
        expected = subprocess.CompletedProcess(
            ["git", "status"],
            0,
            stdout="海淀规划\n",
            stderr="",
        )
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


class ParticipantPreflightPushRemoteTests(unittest.TestCase):
    def test_check_push_uses_selected_remote_and_quotes_display_command(self) -> None:
        completed = subprocess.CompletedProcess(
            ["git", "push"],
            0,
            stdout="Everything up-to-date\n",
            stderr="",
        )
        with patch.object(participant_preflight, "run", return_value=completed) as mocked:
            report = participant_preflight.check_push(
                REPO_ROOT,
                "submission/alice/example",
                "fork;echo-unsafe",
            )

        mocked.assert_called_once_with(
            [
                "git",
                "push",
                "--dry-run",
                "fork;echo-unsafe",
                "HEAD:refs/heads/submission/alice/example",
            ],
            REPO_ROOT,
        )
        self.assertTrue(report["ok"])
        self.assertEqual(
            report["command"],
            "git push --dry-run 'fork;echo-unsafe' HEAD:refs/heads/submission/alice/example",
        )

    def test_upload_command_quotes_selected_remote(self) -> None:
        self.assertEqual(
            participant_preflight.shell_push_command(
                "fork;echo-unsafe",
                "HEAD",
                set_upstream=True,
            ),
            "git push -u 'fork;echo-unsafe' HEAD",
        )

    def test_cli_accepts_push_remote(self) -> None:
        report = {"ok": True, "blockers": [], "warnings": []}
        with (
            patch.object(participant_preflight, "inspect", return_value=report) as mocked,
            patch("sys.stdout", new_callable=io.StringIO),
        ):
            returncode = participant_preflight.main(
                [
                    "submissions/alice/example",
                    "--pr-author",
                    "alice",
                    "--check-push",
                    "--push-remote",
                    "fork",
                    "--json",
                ]
            )

        self.assertEqual(returncode, 0)
        self.assertEqual(mocked.call_args.args[0].push_remote, "fork")


if __name__ == "__main__":
    unittest.main()
