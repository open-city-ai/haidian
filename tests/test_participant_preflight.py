from __future__ import annotations

import importlib.util
import hashlib
import json
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


class ParticipantPreflightGitBlobTests(unittest.TestCase):
    def git(self, root: Path, *args: str) -> subprocess.CompletedProcess[str]:
        return subprocess.run(
            ["git", *args],
            cwd=root,
            capture_output=True,
            text=True,
            check=False,
        )

    def test_detects_manifest_hash_calculated_before_git_crlf_normalization(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            self.assertEqual(0, self.git(root, "init", "-b", "main").returncode)
            self.assertEqual(0, self.git(root, "config", "user.email", "test@example.com").returncode)
            self.assertEqual(0, self.git(root, "config", "user.name", "Test").returncode)
            (root / "README.md").write_text("base\n", encoding="utf-8")
            self.assertEqual(0, self.git(root, "add", "README.md").returncode)
            self.assertEqual(0, self.git(root, "commit", "-m", "base").returncode)
            self.assertEqual(0, self.git(root, "config", "core.autocrlf", "true").returncode)

            submission = root / "submissions" / "alice" / "line-endings"
            submission.mkdir(parents=True)
            proposal_bytes = b"# Proposal\r\n\r\nCRLF content\r\n"
            (submission / "proposal.md").write_bytes(proposal_bytes)
            (submission / "manifest.json").write_text(
                json.dumps(
                    {
                        "files": [
                            {
                                "path": "proposal.md",
                                "sha256": hashlib.sha256(proposal_bytes).hexdigest(),
                            }
                        ]
                    }
                ),
                encoding="utf-8",
            )

            report = participant_preflight.git_blob_manifest_hashes(
                root, "submissions/alice/line-endings"
            )

            self.assertFalse(report["ok"])
            self.assertEqual("", self.git(root, "diff", "--cached", "--name-only").stdout)
            self.assertEqual(["proposal.md"], [item["path"] for item in report["mismatches"]])
            self.assertEqual(
                hashlib.sha256(b"# Proposal\n\nCRLF content\n").hexdigest(),
                report["mismatches"][0]["git_blob_sha256"],
            )


if __name__ == "__main__":
    unittest.main()
