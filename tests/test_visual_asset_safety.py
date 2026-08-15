import json
import shutil
import sys
import tempfile
import unittest
from pathlib import Path
from unittest import mock


ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "scripts"))

from validate_submission import ValidationReport, validate_ai_package_dir  # noqa: E402
from visual_asset_safety import (  # noqa: E402
    LEGACY_VISUAL_TREES,
    visual_code_asset_issues,
    visual_tree_digest,
)


class VisualAssetSafetyTests(unittest.TestCase):
    def validate_asset(
        self, rel_path: str, content: bytes, *, declared: bool = True
    ) -> ValidationReport:
        tmp = tempfile.TemporaryDirectory()
        self.addCleanup(tmp.cleanup)
        root = Path(tmp.name)
        proposal_dir = "submissions/alice/sample"
        base = root / proposal_dir
        asset = base / rel_path
        asset.parent.mkdir(parents=True, exist_ok=True)
        asset.write_bytes(content)
        (base / "manifest.json").write_text(
            json.dumps(
                {
                    "submission_stage": "formal",
                    "submission_type": "ai_agent",
                    "project_id": "centennial-jingzhang-ai-belt",
                    "files": ([{"path": rel_path, "role": "asset"}] if declared else []),
                }
            ),
            encoding="utf-8",
        )
        report = ValidationReport()
        validate_ai_package_dir(report, root, proposal_dir)
        return report

    def test_deterministic_gate_rejects_remote_or_active_code_assets(self):
        cases = (
            (
                "visual/assets/theme.css",
                b'@import "https://cdn.example.com/theme.css";',
                "CSS must not import remote styles",
            ),
            (
                "visual/assets/runtime.js",
                b'fetch("https://example.com/data.json");',
                "JavaScript must not call fetch()",
            ),
            (
                "visual/assets/runtime.js",
                b"\xff\xfe",
                "visual code assets must be UTF-8 text",
            ),
        )
        for rel_path, content, expected in cases:
            with self.subTest(rel_path=rel_path, expected=expected):
                report = self.validate_asset(rel_path, content)
                self.assertIn(f"{rel_path}: {expected}", "\n".join(report.errors))

    def test_undeclared_nested_code_assets_are_still_scanned(self):
        for rel_path, content, expected in (
            (
                "visual/assets/styles/theme.css",
                b'@import "https://cdn.example.com/theme.css";',
                "CSS must not import remote styles",
            ),
            (
                "visual/assets/scripts/runtime.js",
                b'fetch("https://example.com/data.json");',
                "JavaScript must not call fetch()",
            ),
        ):
            with self.subTest(rel_path=rel_path):
                report = self.validate_asset(rel_path, content, declared=False)
                self.assertIn(f"{rel_path}: {expected}", "\n".join(report.errors))

    def test_legacy_exception_ignores_generated_localizations_only(self):
        with tempfile.TemporaryDirectory() as tmp:
            submission = Path(tmp) / "submissions" / "alice" / "sample"
            assets = submission / "visual" / "assets"
            assets.mkdir(parents=True)
            index = submission / "visual" / "index.html"
            index_content = '<script src="assets/vendor.js"></script>'
            index.write_text(index_content, encoding="utf-8")
            vendor = assets / "vendor.js"
            vendor.write_text('fetch("local-data.json")', encoding="utf-8")
            digest = visual_tree_digest(submission)
            self.assertIsNotNone(digest)

            with mock.patch(
                "visual_asset_safety.LEGACY_VISUAL_TREES", {("alice", "sample"): digest}
            ):
                self.assertEqual([], visual_code_asset_issues(submission))
                copied = Path(tmp) / "submissions" / "bob" / "copy"
                shutil.copytree(submission, copied)
                self.assertTrue(visual_code_asset_issues(copied))

                localized = submission / "visual" / "index.zh.html"
                localized.write_text("<html>generated translation</html>", encoding="utf-8")
                self.assertEqual([], visual_code_asset_issues(submission))
                localized.write_text("<html>updated translation</html>", encoding="utf-8")
                self.assertEqual([], visual_code_asset_issues(submission))

                index.write_text("<html>changed primary page</html>", encoding="utf-8")
                self.assertTrue(visual_code_asset_issues(submission))
                index.write_text(index_content, encoding="utf-8")
                (assets / "companion.js").write_text("window.changed = true", encoding="utf-8")
                self.assertTrue(visual_code_asset_issues(submission))

    def test_current_legacy_package_matches_its_complete_tree_pin(self):
        submission = (
            ROOT
            / "submissions"
            / "xiaowuzicode"
            / "token-block-jingzhang-ai-belt"
        )
        identity = ("xiaowuzicode", "token-block-jingzhang-ai-belt")
        self.assertEqual(LEGACY_VISUAL_TREES[identity], visual_tree_digest(submission))
        self.assertEqual([], visual_code_asset_issues(submission))

    def test_local_code_and_json_assets_do_not_trigger_code_safety_errors(self):
        for rel_path, content in (
            ("visual/assets/theme.css", b"body { background: url(icons/grid.svg); }"),
            ("visual/assets/data.json", b'{"url": "https://example.com/data"}'),
        ):
            with self.subTest(rel_path=rel_path):
                report = self.validate_asset(rel_path, content)
                self.assertFalse(
                    any(
                        rel_path in error
                        and ("must not" in error or "visual code assets" in error)
                        for error in report.errors
                    ),
                    report.errors,
                )


if __name__ == "__main__":
    unittest.main()
