from __future__ import annotations

import json
import unittest
from pathlib import Path

from jsonschema import Draft202012Validator

from scripts.validate_sources import normalize_local_path


REPO_ROOT = Path(__file__).resolve().parents[1]


class SourceSchemaContractTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        schema = json.loads(
            (REPO_ROOT / "schema" / "source.schema.json").read_text(encoding="utf-8")
        )
        Draft202012Validator.check_schema(schema)
        cls.validator = Draft202012Validator(schema)

    def payload(self, path: str) -> dict[str, object]:
        return {
            "version": 1,
            "sources": [
                {
                    "id": "public-source",
                    "title": "Public source",
                    "type": "brief",
                    "path": path,
                    "publisher": "Project maintainers",
                    "published_at": "TBD",
                    "public_status": "public-draft",
                    "citation": "Public source citation",
                    "usage_note": "May be cited as public context.",
                    "risk_note": "Confirm before formal publication.",
                }
            ],
        }

    def test_path_safety_matches_runtime_normalization(self) -> None:
        path_cases = (
            ("brief/public-brief.md", True),
            (r"brief\public-brief.md", True),
            ("brief/..archive/public.md", True),
            ("../private.md", False),
            ("brief/../../private.md", False),
            (r"brief\..\private.md", False),
            ("/absolute/private.md", False),
            ("//server/private.md", False),
            ("https://example.com/source", False),
        )
        for path, expected_valid in path_cases:
            with self.subTest(path=path):
                try:
                    normalize_local_path(path)
                except ValueError:
                    runtime_valid = False
                else:
                    runtime_valid = True
                schema_valid = self.validator.is_valid(self.payload(path))
                self.assertEqual(runtime_valid, expected_valid)
                self.assertEqual(schema_valid, expected_valid)


if __name__ == "__main__":
    unittest.main()
