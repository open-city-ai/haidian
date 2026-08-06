import re
import json
import subprocess
import sys
import unittest
import tempfile
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "scripts"))
from generate_submissions_data import load_publication_registry, package_sha256  # noqa: E402
DATA_FILE = ROOT / "submissions-data.js"
INDEX_FILE = ROOT / "index.html"
SUBMISSIONS_FILE = ROOT / "submissions.html"


class TestSubmissionsGallery(unittest.TestCase):
    def load_gallery_items(self):
        data = DATA_FILE.read_text(encoding="utf-8")
        match = re.search(r"window\.HAIDIAN_SUBMISSIONS = (\[.*\]);\s*$", data, re.S)
        self.assertIsNotNone(match)
        return json.loads(match.group(1))

    def test_only_maintainer_published_submissions_are_listed(self):
        registry = json.loads((ROOT / "gallery-publication.json").read_text(encoding="utf-8"))
        published = {entry["path"] for entry in registry["entries"] if entry["published"]}
        source_paths = {str(Path(item["sourceUrl"]).parent) for item in self.load_gallery_items()}
        self.assertEqual(published, source_paths)

    def test_homepage_featured_state_comes_from_publication_registry(self):
        registry = json.loads((ROOT / "gallery-publication.json").read_text(encoding="utf-8"))
        expected = {Path(entry["path"]).name: entry["featured"] for entry in registry["entries"] if entry["published"]}
        actual = {item["id"]: item["featured"] for item in self.load_gallery_items()}
        self.assertEqual(expected, actual)
        self.assertTrue(all("selectionReason" in item for item in self.load_gallery_items()))

    def test_publication_registry_rejects_missing_selection_metadata(self):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            (root / "gallery-publication.json").write_text(
                json.dumps({"version": 1, "entries": [{"path": "submissions/alice/example", "published": False, "featured": False}]}),
                encoding="utf-8",
            )
            with self.assertRaisesRegex(SystemExit, "missing fields"):
                load_publication_registry(root)

    def test_publication_registry_rejects_invalid_date_and_flag_types(self):
        base = {
            "path": "submissions/alice/example",
            "published": False,
            "featured": False,
            "review_status": "not_approved",
            "quality_tier": "qualified",
            "reviewed_by": "maintainer",
            "reviewed_at": "2026-08-05",
            "rights_reviewed": False,
            "reviewed_package_sha256": "0" * 64,
            "selection_reason_zh": "公开展示理由",
            "selection_reason_en": "Publication reason",
            "selected_at": "2026-08-05",
        }
        for field, value, message in [
            ("published", "yes", "published must be boolean"),
            ("selected_at", "August 5", "selected_at must be YYYY-MM-DD"),
        ]:
            with self.subTest(field=field), tempfile.TemporaryDirectory() as tmp:
                root = Path(tmp)
                entry = dict(base)
                entry[field] = value
                (root / "gallery-publication.json").write_text(
                    json.dumps({"version": 1, "entries": [entry]}), encoding="utf-8"
                )
                with self.assertRaisesRegex(SystemExit, message):
                    load_publication_registry(root)

    def test_publication_registry_requires_human_and_rights_approval(self):
        base = {
            "path": "submissions/alice/example",
            "published": True,
            "featured": False,
            "review_status": "approved_for_publication",
            "quality_tier": "qualified",
            "reviewed_by": "maintainer",
            "reviewed_at": "2026-08-05",
            "rights_reviewed": True,
            "reviewed_package_sha256": "0" * 64,
            "selection_reason_zh": "通过人工内容和版权审核",
            "selection_reason_en": "Approved after human content and rights review",
            "selected_at": "2026-08-05",
        }
        for field, value, message in [
            ("review_status", "not_approved", "needs approved_for_publication"),
            ("rights_reviewed", False, "needs rights_reviewed=true"),
            ("quality_tier", "featured", "quality_tier=featured requires featured=true"),
        ]:
            with self.subTest(field=field), tempfile.TemporaryDirectory() as tmp:
                root = Path(tmp)
                entry = dict(base)
                entry[field] = value
                submission = root / "submissions" / "alice" / "example"
                submission.mkdir(parents=True)
                (submission / "proposal.md").write_text("# proposal\n", encoding="utf-8")
                (root / "gallery-publication.json").write_text(
                    json.dumps({"version": 1, "entries": [entry]}), encoding="utf-8"
                )
                with self.assertRaisesRegex(SystemExit, message):
                    load_publication_registry(root)

    def test_publication_approval_is_invalidated_when_reviewed_package_changes(self):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            submission = root / "submissions" / "alice" / "example"
            submission.mkdir(parents=True)
            (submission / "proposal.md").write_text("# reviewed proposal\n", encoding="utf-8")
            (submission / "manifest.json").write_text(
                json.dumps({"files": [{"path": "proposal.md"}]}), encoding="utf-8"
            )
            entry = {
                "path": "submissions/alice/example",
                "published": True,
                "featured": False,
                "review_status": "approved_for_publication",
                "quality_tier": "qualified",
                "reviewed_by": "maintainer",
                "reviewed_at": "2026-08-05",
                "rights_reviewed": True,
                "reviewed_package_sha256": package_sha256(submission),
                "selection_reason_zh": "通过人工内容和版权审核",
                "selection_reason_en": "Approved after human content and rights review",
                "selected_at": "2026-08-05",
            }
            (root / "gallery-publication.json").write_text(
                json.dumps({"version": 1, "entries": [entry]}), encoding="utf-8"
            )
            load_publication_registry(root)
            (submission / "proposal.md").write_text("# changed after review\n", encoding="utf-8")
            with self.assertRaisesRegex(SystemExit, "reviewed package SHA-256 is stale"):
                load_publication_registry(root)

    def test_gallery_paths_exist(self):
        data = DATA_FILE.read_text(encoding="utf-8")
        paths = re.findall(
            r'"(?:thumbnailUrl|visualUrl|proposalUrl|sourceUrl)"\s*:\s*"([^"]+)"',
            data,
        )
        missing = [path for path in paths if not (ROOT / path).exists()]
        self.assertEqual([], missing)

    def test_generated_gallery_data_is_current(self):
        completed = subprocess.run(
            [sys.executable, str(ROOT / "scripts" / "generate_submissions_data.py"), "--check"],
            cwd=ROOT,
            capture_output=True,
            text=True,
            check=False,
        )
        self.assertEqual(completed.returncode, 0, completed.stdout + completed.stderr)

    def test_public_gallery_starts_empty_without_approved_submissions(self):
        proposal_paths = sorted((ROOT / "submissions").glob("*/*/proposal.md"))
        self.assertEqual([], proposal_paths)
        self.assertEqual([], self.load_gallery_items())

    def test_gallery_pages_explain_review_statuses(self):
        index = INDEX_FILE.read_text(encoding="utf-8")
        submissions = SUBMISSIONS_FILE.read_text(encoding="utf-8")
        self.assertIn("View All Proposals", index)
        self.assertIn("STATUS_META", index)
        self.assertIn("data-filter=\"formal\"", submissions)
        self.assertIn("data-filter=\"intake\"", submissions)
        self.assertIn("data-filter=\"revision\"", submissions)
        self.assertIn("data-filter=\"fixture\"", submissions)
        self.assertIn("formal_review_ready", submissions)
        self.assertIn("intake_provisional", submissions)


if __name__ == "__main__":
    unittest.main()
