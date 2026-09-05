from pathlib import Path
import unittest

from scripts.check_public_gallery import GalleryDataError, compare_gallery_data, parse_gallery_data


class PublicGalleryParityTests(unittest.TestCase):
    def test_parses_generated_gallery_wrapper(self) -> None:
        payload = parse_gallery_data(
            'window.HAIDIAN_SUBMISSIONS = [{"sourceUrl": "submissions/a/proposal.md"}];\n'
        )
        self.assertEqual("submissions/a/proposal.md", payload[0]["sourceUrl"])

    def test_reports_missing_and_unexpected_source_urls(self) -> None:
        expected = 'window.HAIDIAN_SUBMISSIONS = [{"sourceUrl": "submissions/a/proposal.md"}];\n'
        public = 'window.HAIDIAN_SUBMISSIONS = [{"sourceUrl": "submissions/b/proposal.md"}];\n'
        missing, unexpected, changed = compare_gallery_data(expected, public)
        self.assertEqual({"submissions/a/proposal.md"}, missing)
        self.assertEqual({"submissions/b/proposal.md"}, unexpected)
        self.assertEqual(set(), changed)

    def test_reports_changed_entry_with_same_source_url(self) -> None:
        expected = (
            'window.HAIDIAN_SUBMISSIONS = ['
            '{"sourceUrl": "submissions/a/proposal.md", "title": "Current"}'
            '];\n'
        )
        public = (
            'window.HAIDIAN_SUBMISSIONS = ['
            '{"title": "Stale", "sourceUrl": "submissions/a/proposal.md"}'
            '];\n'
        )
        missing, unexpected, changed = compare_gallery_data(expected, public)
        self.assertEqual(set(), missing)
        self.assertEqual(set(), unexpected)
        self.assertEqual({"submissions/a/proposal.md"}, changed)

    def test_rejects_duplicate_source_urls(self) -> None:
        payload = (
            'window.HAIDIAN_SUBMISSIONS = ['
            '{"sourceUrl": "submissions/a/proposal.md"},'
            '{"sourceUrl": "submissions/a/proposal.md"}'
            '];\n'
        )
        with self.assertRaises(GalleryDataError):
            compare_gallery_data(payload, 'window.HAIDIAN_SUBMISSIONS = [];\n')

    def test_workflow_checks_on_schedule_and_manual_dispatch(self) -> None:
        workflow = (Path(__file__).resolve().parents[1] / ".github" / "workflows" / "public-site-parity.yml").read_text(encoding="utf-8")
        self.assertIn('cron: "*/15 * * * *"', workflow)
        self.assertIn("  workflow_dispatch:\n", workflow)
        self.assertIn("scripts/check_public_gallery.py", workflow)


if __name__ == "__main__":
    unittest.main()
