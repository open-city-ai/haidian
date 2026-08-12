from __future__ import annotations

import tempfile
import unittest
from pathlib import Path
import sys


REPO_ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(REPO_ROOT / "scripts"))

from validate_submission import (  # noqa: E402
    REQUIRED_SECTIONS,
    ValidationReport,
    validate_proposal_file,
)


class ProposalMetadataLengthTests(unittest.TestCase):
    def validate_metadata(self, title: str, summary: str) -> ValidationReport:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            relative = "submissions/alice/metadata-length/proposal.md"
            proposal = root / relative
            proposal.parent.mkdir(parents=True)
            sections = "\n\n".join(
                f"## {heading}\n{'完整设计证据与空间指标说明。' * 12}"
                for heading in REQUIRED_SECTIONS
            )
            proposal.write_text(
                "\n".join(
                    [
                        "---",
                        f"title: {title}",
                        'author_github: "alice"',
                        'language: "zh"',
                        'license: "CC-BY-4.0"',
                        f"summary: {summary}",
                        "---",
                        "",
                        "# Proposal",
                        "",
                        sections,
                    ]
                ),
                encoding="utf-8",
            )
            report = ValidationReport()
            validate_proposal_file(report, root, relative, "alice", "alice")
            return report

    def test_title_enforces_published_length_boundaries(self) -> None:
        summary = "s" * 10
        for length, valid in [(1, False), (2, True), (120, True), (121, False)]:
            with self.subTest(length=length):
                report = self.validate_metadata("t" * length, summary)
                length_errors = [
                    error for error in report.errors if "front matter `title`" in error
                ]
                self.assertEqual([] if valid else [length], [length] * len(length_errors))
                if not valid:
                    self.assertIn(f"got {length}", length_errors[0])

    def test_summary_enforces_published_length_boundaries(self) -> None:
        for length, valid in [(9, False), (10, True), (500, True), (501, False)]:
            with self.subTest(length=length):
                report = self.validate_metadata("Valid title", "s" * length)
                length_errors = [
                    error for error in report.errors if "front matter `summary`" in error
                ]
                self.assertEqual([] if valid else [length], [length] * len(length_errors))
                if not valid:
                    self.assertIn(f"got {length}", length_errors[0])


if __name__ == "__main__":
    unittest.main()
