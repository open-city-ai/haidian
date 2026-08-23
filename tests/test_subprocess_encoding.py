from __future__ import annotations

import json
import os
import sys
import unittest
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(REPO_ROOT / "scripts"))

import auto_review_queue  # noqa: E402
import maintainer_review  # noqa: E402
import prelaunch_check  # noqa: E402
import review_submission  # noqa: E402


# Chinese text plus full-width punctuation and symbols that are absent from
# GBK/CP936 round-trips.  A bare text=True decodes these with the locale
# encoding, which corrupts or crashes on a non-UTF-8 parent.
SAMPLE_TEXT = "校验完成——全角标点·符号「」以及²和✓"

# The child reports the encoding environment it actually received, so a
# regression that drops env= is visible even on a UTF-8 host.
CHILD_SCRIPT = (
    "import json, os, sys\n"
    "json.dump(\n"
    "    {\n"
    f"        'msg': {SAMPLE_TEXT!r},\n"
    "        'pythonutf8': os.environ.get('PYTHONUTF8'),\n"
    "        'pythonioencoding': os.environ.get('PYTHONIOENCODING'),\n"
    "    },\n"
    "    sys.stdout,\n"
    "    ensure_ascii=False,\n"
    ")\n"
)


class SimulatedNonUtf8Parent:
    """Strip the UTF-8 hints from the parent environment for a test body.

    Each fixed helper injects PYTHONUTF8/PYTHONIOENCODING itself.  Removing
    them from the parent means the child only sees them when the helper
    supplies them, so dropping ``env=`` makes these assertions fail.
    """

    def __enter__(self) -> None:
        self._saved = {
            name: os.environ.pop(name)
            for name in ("PYTHONUTF8", "PYTHONIOENCODING")
            if name in os.environ
        }

    def __exit__(self, *exc: object) -> None:
        os.environ.update(self._saved)


class SubprocessEncodingTests(unittest.TestCase):
    """Recursive Python children must decode as UTF-8 regardless of locale."""

    def assert_utf8_payload(self, payload: dict) -> None:
        self.assertEqual(payload["msg"], SAMPLE_TEXT)
        self.assertEqual(payload["pythonutf8"], "1")
        self.assertEqual(payload["pythonioencoding"], "utf-8")

    def test_maintainer_review_run_json_command(self) -> None:
        with SimulatedNonUtf8Parent():
            result = maintainer_review.run_json_command(
                [sys.executable, "-c", CHILD_SCRIPT]
            )
        self.assertTrue(result["ok"], result["stderr"])
        self.assert_utf8_payload(result["stdout"])

    def test_review_submission_run_json_command(self) -> None:
        with SimulatedNonUtf8Parent():
            result = review_submission.run_json_command(
                [sys.executable, "-c", CHILD_SCRIPT]
            )
        self.assertEqual(result["returncode"], 0, result["stderr"])
        self.assert_utf8_payload(result["stdout"])

    def test_prelaunch_check_run_command(self) -> None:
        with SimulatedNonUtf8Parent():
            completed = prelaunch_check.run_command(
                REPO_ROOT, [sys.executable, "-c", CHILD_SCRIPT]
            )
        self.assertEqual(completed.returncode, 0, completed.stderr)
        self.assert_utf8_payload(json.loads(completed.stdout))

    def test_auto_review_queue_run(self) -> None:
        with SimulatedNonUtf8Parent():
            completed = auto_review_queue.run(
                [sys.executable, "-c", CHILD_SCRIPT], cwd=REPO_ROOT
            )
        self.assert_utf8_payload(json.loads(completed.stdout))

    def test_no_replacement_characters_leak_through(self) -> None:
        """errors='replace' must not be masking a decode failure."""
        with SimulatedNonUtf8Parent():
            completed = prelaunch_check.run_command(
                REPO_ROOT, [sys.executable, "-c", CHILD_SCRIPT]
            )
        self.assertNotIn("�", completed.stdout)


class EmptyStreamTests(unittest.TestCase):
    """A silent child must not make callers trip over ``None.strip()``."""

    SILENT = [sys.executable, "-c", ""]

    def test_maintainer_review_handles_empty_output(self) -> None:
        result = maintainer_review.run_json_command(self.SILENT)
        self.assertTrue(result["ok"])
        self.assertEqual(result["stdout"], {})
        self.assertEqual(result["stderr"], "")

    def test_review_submission_handles_empty_output(self) -> None:
        result = review_submission.run_json_command(self.SILENT)
        self.assertEqual(result["returncode"], 0)
        self.assertEqual(result["stdout"], {})
        self.assertEqual(result["stderr"], "")

    def test_auto_review_queue_reports_failure_without_output(self) -> None:
        """The uncaptured path leaves stdout/stderr None; the error must still format."""
        with self.assertRaises(auto_review_queue.WorkerError) as raised:
            auto_review_queue.run(
                [sys.executable, "-c", "raise SystemExit(3)"],
                cwd=REPO_ROOT,
                capture=False,
            )
        self.assertIn("command failed", str(raised.exception))


if __name__ == "__main__":
    unittest.main()
