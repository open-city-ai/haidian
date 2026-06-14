import json
import sys
import tempfile
import unittest
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(REPO_ROOT / "scripts"))

from validate_sources import validate_source_index  # noqa: E402


VALID_INDEX = {
    "version": 1,
    "sources": [
        {
            "id": "brief-public-brief",
            "title": "百年京张 AI 创新带公开任务书草案",
            "type": "brief",
            "path": "brief/public-brief.md",
            "publisher": "项目维护者",
            "published_at": "TBD",
            "public_status": "public-draft",
            "citation": "brief/public-brief.md",
            "usage_note": "参赛方案可作为任务背景引用。",
            "risk_note": "正式发布前仍需维护者确认。"
        }
    ]
}


class PublicSourcesTests(unittest.TestCase):
    def write_json(self, root: Path, rel: str, content: dict) -> None:
        path = root / rel
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text(json.dumps(content, ensure_ascii=False, indent=2), encoding="utf-8")

    def test_repo_public_sources_index_is_valid(self) -> None:
        report = validate_source_index(REPO_ROOT)
        self.assertTrue(report.ok, report.errors)
        self.assertGreaterEqual(report.source_count, 1)

    def test_valid_source_index_passes(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            (root / "brief").mkdir()
            (root / "brief" / "public-brief.md").write_text("# brief", encoding="utf-8")
            self.write_json(root, "sources/public-sources.json", VALID_INDEX)

            report = validate_source_index(root)

            self.assertTrue(report.ok, report.errors)
            self.assertEqual(report.source_count, 1)

    def test_missing_referenced_path_fails(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            self.write_json(root, "sources/public-sources.json", VALID_INDEX)

            report = validate_source_index(root)

            self.assertFalse(report.ok)
            self.assertIn("referenced path is missing", "\n".join(report.errors))

    def test_duplicate_source_id_fails(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            (root / "brief").mkdir()
            (root / "brief" / "public-brief.md").write_text("# brief", encoding="utf-8")
            bad_index = json.loads(json.dumps(VALID_INDEX))
            bad_index["sources"].append(json.loads(json.dumps(VALID_INDEX["sources"][0])))
            self.write_json(root, "sources/public-sources.json", bad_index)

            report = validate_source_index(root)

            self.assertFalse(report.ok)
            self.assertIn("duplicate id", "\n".join(report.errors))

    def test_unsafe_local_path_fails(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            bad_index = json.loads(json.dumps(VALID_INDEX))
            bad_index["sources"][0]["path"] = "../private.md"
            self.write_json(root, "sources/public-sources.json", bad_index)

            report = validate_source_index(root)

            self.assertFalse(report.ok)
            self.assertIn("unsafe path", "\n".join(report.errors))


if __name__ == "__main__":
    unittest.main()
