import sys
import unittest
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(REPO_ROOT / "scripts"))

from front_matter import parse_front_matter  # noqa: E402
from generate_submissions_data import parse_front_matter as parse_gallery_front_matter  # noqa: E402


class FrontMatterTests(unittest.TestCase):
    def test_folded_and_literal_block_scalars(self) -> None:
        text = """---
title: "Test"
summary: >-
  First summary line.
  Second summary line.
note: |-
  first
  second
---
Body
"""
        metadata, body = parse_front_matter(text)
        self.assertEqual(metadata["title"], "Test")
        self.assertEqual(metadata["summary"], "First summary line. Second summary line.")
        self.assertEqual(metadata["note"], "first\nsecond")
        self.assertEqual(body, "Body\n")
        self.assertEqual(parse_gallery_front_matter(text), metadata)

    def test_default_chomping_keeps_final_newline(self) -> None:
        metadata, _ = parse_front_matter("---\nsummary: >\n  one\n  two\n---\n")
        self.assertEqual(metadata["summary"], "one two\n")

    def test_folded_blocks_preserve_paragraphs_and_more_indented_lines(self) -> None:
        text = """---
summary: >-
  first paragraph

  second paragraph
    indented evidence
  final line
---
"""
        metadata, _ = parse_front_matter(text)
        self.assertEqual(
            metadata["summary"],
            "first paragraph\nsecond paragraph\n  indented evidence\nfinal line",
        )

    def test_default_chomping_clips_trailing_blank_lines(self) -> None:
        metadata, _ = parse_front_matter("---\nnote: |\n  one\n\n---\n")
        self.assertEqual(metadata["note"], "one\n")

    def test_unterminated_or_absent_front_matter_is_unchanged(self) -> None:
        self.assertEqual(parse_front_matter("Body"), ({}, "Body"))
        self.assertEqual(parse_front_matter("---\nsummary: x"), ({}, "---\nsummary: x"))


if __name__ == "__main__":
    unittest.main()
