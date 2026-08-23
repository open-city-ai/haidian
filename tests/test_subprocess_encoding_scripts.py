from __future__ import annotations

import ast
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[1]
SCRIPTS_DIR = REPO_ROOT / "scripts"
sys.path.insert(0, str(SCRIPTS_DIR))

import bootstrap_participant_workspace  # noqa: E402
import git_blob_hashes  # noqa: E402


# Chinese text with full-width punctuation and symbols that are not in GBK.
SAMPLE_TEXT = "工作区已就绪——全角标点·符号「」以及²和✓"

# scripts/ call sites still awaiting the fix in PR #1515. The guard below
# asserts the violation set is a *subset* of these, so it fails on any new
# violation while staying green both before and after that PR merges.
PENDING_FIX_IN_PR_1515 = {
    "auto_review_queue.py",
    "maintainer_review.py",
    "prelaunch_check.py",
    "review_submission.py",
}


def decoding_violations() -> set[str]:
    """Return scripts that decode subprocess output without an explicit encoding.

    ``text=True`` without ``encoding`` decodes with the locale encoding, which
    corrupts or crashes on a non-UTF-8 console such as Chinese Windows (GBK).
    """
    violations: set[str] = set()
    for path in sorted(SCRIPTS_DIR.glob("*.py")):
        tree = ast.parse(path.read_text(encoding="utf-8"), filename=str(path))
        for node in ast.walk(tree):
            if not isinstance(node, ast.Call):
                continue
            func = node.func
            if not (
                isinstance(func, ast.Attribute)
                and func.attr == "run"
                and isinstance(func.value, ast.Name)
                and func.value.id == "subprocess"
            ):
                continue
            keywords = {kw.arg for kw in node.keywords if kw.arg}
            decodes_text = bool(keywords & {"text", "universal_newlines"})
            if decodes_text and "encoding" not in keywords:
                violations.add(path.name)
    return violations


class SubprocessDecodingGuardTests(unittest.TestCase):
    def test_scripts_declare_an_explicit_subprocess_encoding(self) -> None:
        unexpected = decoding_violations() - PENDING_FIX_IN_PR_1515
        self.assertEqual(
            set(),
            unexpected,
            "subprocess.run(text=True) without encoding= decodes with the locale "
            f"encoding and breaks on a non-UTF-8 console: {sorted(unexpected)}",
        )

    def test_guard_detects_a_missing_encoding(self) -> None:
        """The guard must actually catch the pattern it is meant to prevent."""
        source = "import subprocess\nsubprocess.run(['x'], capture_output=True, text=True)\n"
        tree = ast.parse(source)
        call = next(
            node
            for node in ast.walk(tree)
            if isinstance(node, ast.Call)
            and isinstance(node.func, ast.Attribute)
            and node.func.attr == "run"
        )
        keywords = {kw.arg for kw in call.keywords if kw.arg}
        self.assertIn("text", keywords)
        self.assertNotIn("encoding", keywords)


class BootstrapWorkspaceDecodingTests(unittest.TestCase):
    """bootstrap_participant_workspace.run() drives git/gh on participant machines."""

    def test_utf8_stdout_is_decoded_intact(self) -> None:
        script = f"import sys; sys.stdout.write({SAMPLE_TEXT!r})"
        self.assertEqual(
            SAMPLE_TEXT,
            bootstrap_participant_workspace.run([sys.executable, "-c", script]),
        )

    def test_utf8_stderr_survives_in_the_error_detail(self) -> None:
        script = f"import sys; sys.stderr.write({SAMPLE_TEXT!r}); raise SystemExit(2)"
        with self.assertRaises(bootstrap_participant_workspace.BootstrapError) as raised:
            bootstrap_participant_workspace.run([sys.executable, "-c", script])
        message = str(raised.exception)
        self.assertIn(SAMPLE_TEXT, message)
        self.assertNotIn("�", message)


class GitBlobHashesDecodingTests(unittest.TestCase):
    """git rev-parse reports the repository root, which may contain Chinese."""

    def test_repository_root_with_non_ascii_path(self) -> None:
        with tempfile.TemporaryDirectory() as raw:
            repo = Path(raw) / "京张工作区"
            repo.mkdir()
            init = subprocess.run(
                ["git", "init", "-q", str(repo)],
                capture_output=True,
                text=True,
                encoding="utf-8",
                errors="replace",
                check=False,
            )
            if init.returncode:
                self.skipTest(f"git init unavailable: {init.stderr.strip()}")

            target = repo / "文件.txt"
            target.write_text("hello\n", encoding="utf-8")
            hashes = git_blob_hashes.git_blob_sha256([target], cwd=repo)

            self.assertIsNotNone(hashes, "the temp directory should be a git repository")
            self.assertIn(target.resolve(), hashes)
            self.assertRegex(hashes[target.resolve()], r"^[0-9a-f]{64}$")


if __name__ == "__main__":
    unittest.main()
