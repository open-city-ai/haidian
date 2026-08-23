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

    def test_reviewed_policy_sources_keep_formal_use_boundaries(self) -> None:
        registry = json.loads((REPO_ROOT / "data" / "source_registry.json").read_text(encoding="utf-8"))
        sources = {source["source_id"]: source for source in registry["sources"]}
        expected = {
            "DATA-SRC-GENERATIVE-AI-INTERIM-MEASURES": (
                "A0",
                "T1",
                "approved",
                "yes",
                "brief/site-package/standards/references/generative-ai-interim-measures.md",
            ),
            "DATA-SRC-BARRIER-FREE-ENVIRONMENT-LAW": (
                "A0",
                "T1",
                "approved",
                "yes",
                "brief/site-package/standards/references/barrier-free-environment-law.md",
            ),
            "DATA-SRC-ELDERLY-SMART-TECH-PLAN-2020-45": (
                "A0",
                "T4",
                "approved",
                "background_only",
                "brief/site-package/standards/references/elderly-smart-tech-plan-2020-45.md",
            ),
        }
        for source_id, (authority, timeliness, review, usable, local_path) in expected.items():
            with self.subTest(source_id=source_id):
                source = sources[source_id]
                self.assertEqual(source["authority_level"], authority)
                self.assertEqual(source["timeliness_level"], timeliness)
                self.assertEqual(source["review_status"], review)
                self.assertEqual(source["usable_for_formal"], usable)
                self.assertEqual(source["local_paths"], [local_path])
                self.assertTrue((REPO_ROOT / local_path).exists())

    def test_reviewed_policy_sources_encode_specific_scope_and_reuse_boundaries(self) -> None:
        registry = json.loads((REPO_ROOT / "data" / "source_registry.json").read_text(encoding="utf-8"))
        sources = {source["source_id"]: source for source in registry["sources"]}
        generative = sources["DATA-SRC-GENERATIVE-AI-INTERIM-MEASURES"]
        generative_allowed = "\n".join(generative["allowed_uses"])
        self.assertIn("Article 2 scope", generative_allowed)
        self.assertIn("not a general user opt-out", generative_allowed)
        self.assertIn("do not set a numeric statutory response deadline", generative_allowed.lower())
        self.assertIn("public-opinion or social-mobilization capacity", generative_allowed)
        barrier = sources["DATA-SRC-BARRIER-FREE-ENVIRONMENT-LAW"]
        self.assertIn("Article 39", "\n".join(barrier["allowed_uses"]))
        self.assertIn("2023-06-28", barrier["notes_zh"])
        self.assertIn("2023-06-29", barrier["notes_zh"])
        elderly = sources["DATA-SRC-ELDERLY-SMART-TECH-PLAN-2020-45"]
        for source in [generative, barrier, elderly]:
            self.assertIn("No reuse permission is inferred", source["license_summary"])
            self.assertIn("page chrome", source["license_summary"])
            self.assertIn("third-party editorial content", source["license_summary"])

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

    def test_invalid_registry_fails_for_impossible_dates_and_invalid_url(self) -> None:
        registry = json.loads((REPO_ROOT / "data" / "source_registry.json").read_text(encoding="utf-8"))
        registry["updated_date"] = "2026-99-99"
        registry["sources"][0]["accessed_date"] = "2026-02-31"
        registry["sources"][0]["published_date"] = "2026-13-01"
        registry["sources"][0]["url"] = "https://["
        registry["sources"][1]["url"] = None

        with tempfile.TemporaryDirectory() as tmp:
            path = Path(tmp) / "registry.json"
            path.write_text(json.dumps(registry), encoding="utf-8")
            completed = run_registry_validator(path)

        self.assertNotEqual(completed.returncode, 0)
        report = json.loads(completed.stdout)
        joined = "\n".join(report["errors"])
        self.assertIn("registry updated_date must be YYYY-MM-DD", joined)
        self.assertIn("accessed_date must be YYYY-MM-DD", joined)
        self.assertIn("published_date must be YYYY-MM-DD or null", joined)
        self.assertIn("public URL sources must use an http(s) url", joined)
        self.assertIn("url must be a non-empty string", joined)

    def test_public_urls_reject_invalid_authority_port_and_whitespace(self) -> None:
        invalid_urls = [
            "https://:443/path",
            "https://user@:443/path",
            "https://example.com:bad/path",
            "https://example.com:99999/path",
            "https://exa mple.com/path",
            "https://\nexample.com/path",
            "https://example.com/\x00path",
            "https://exa\u200bmple.com/path",
            "https://exa\u202emple.com/path",
            "https://exa\ud800mple.com/path",
            " https://example.com/path",
            "https://example.com/path ",
        ]
        baseline = json.loads((REPO_ROOT / "data" / "source_registry.json").read_text(encoding="utf-8"))

        with tempfile.TemporaryDirectory() as tmp:
            path = Path(tmp) / "registry.json"
            for invalid_url in invalid_urls:
                with self.subTest(url=repr(invalid_url)):
                    registry = json.loads(json.dumps(baseline))
                    registry["sources"][0]["url"] = invalid_url
                    path.write_text(json.dumps(registry), encoding="utf-8")
                    completed = run_registry_validator(path)

                    self.assertNotEqual(completed.returncode, 0)
                    report = json.loads(completed.stdout)
                    self.assertTrue(
                        any("public URL sources must use an http(s) url" in error for error in report["errors"]),
                        report["errors"],
                    )


if __name__ == "__main__":
    unittest.main()
