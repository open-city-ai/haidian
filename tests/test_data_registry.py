from __future__ import annotations

import json
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[1]


def run_registry_validator(registry: Path, repo_root: Path = REPO_ROOT):
    return subprocess.run(
        [
            sys.executable,
            str(REPO_ROOT / "scripts" / "validate_data_registry.py"),
            "--repo-root",
            str(repo_root),
            "--registry",
            str(registry),
            "--json",
        ],
        capture_output=True,
        text=True,
        check=False,
    )


class DataRegistryTests(unittest.TestCase):
    def test_default_data_registry_passes(self) -> None:
        completed = run_registry_validator(REPO_ROOT / "data" / "source_registry.json")
        self.assertEqual(completed.returncode, 0, completed.stdout + completed.stderr)
        report = json.loads(completed.stdout)
        self.assertTrue(report["ok"])
        self.assertGreaterEqual(report["source_count"], 1)

    def test_registry_references_existing_local_paths(self) -> None:
        registry = json.loads((REPO_ROOT / "data" / "source_registry.json").read_text(encoding="utf-8"))
        for source in registry["sources"]:
            for local_path in source.get("local_paths", []):
                with self.subTest(source_id=source["source_id"], local_path=local_path):
                    self.assertTrue((REPO_ROOT / local_path).exists())

    def test_invalid_registry_fails_for_duplicate_and_restricted_approved_source(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            registry = {
                "schema_version": "0.1.0",
                "updated_date": "2026-06-07",
                "sources": [
                    {
                        "source_id": "DUPLICATE-SOURCE",
                        "title": "Bad Source",
                        "publisher": "Unknown",
                        "source_kind": "official_open_data",
                        "url": "https://example.com/bad",
                        "published_date": "2026-01-01",
                        "accessed_date": "2026-06-07",
                        "file_type": "webpage",
                        "authority_level": "A0",
                        "timeliness_level": "T0",
                        "public_access_status": "restricted_or_unknown",
                        "license_summary": "Unknown license.",
                        "review_status": "approved",
                        "usable_for_formal": "yes",
                        "allowed_uses": ["formal evidence"],
                        "prohibited_uses": ["none"],
                        "topics": ["bad"]
                    },
                    {
                        "source_id": "DUPLICATE-SOURCE",
                        "title": "Duplicate",
                        "publisher": "Unknown",
                        "source_kind": "provisional_repository_data",
                        "url": "missing.geojson",
                        "published_date": "2026-01-01",
                        "accessed_date": "2026-06-07",
                        "file_type": "geojson",
                        "authority_level": "PROVISIONAL_REPOSITORY",
                        "timeliness_level": "T0",
                        "public_access_status": "provisional_repository",
                        "license_summary": "Repository provisional.",
                        "review_status": "provisional",
                        "usable_for_formal": "yes",
                        "allowed_uses": ["intake"],
                        "prohibited_uses": ["formal scoring"],
                        "topics": ["bad"]
                    }
                ]
            }
            path = root / "registry.json"
            path.write_text(json.dumps(registry), encoding="utf-8")
            completed = run_registry_validator(path, repo_root=root)
            self.assertNotEqual(completed.returncode, 0)
            report = json.loads(completed.stdout)
            joined = "\n".join(report["errors"])
            self.assertIn("duplicate source_id", joined)
            self.assertIn("restricted_or_unknown sources cannot be approved", joined)
            self.assertIn("provisional sources cannot be formal-ready", joined)


if __name__ == "__main__":
    unittest.main()
