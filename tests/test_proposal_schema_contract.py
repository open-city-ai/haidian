from __future__ import annotations

import json
import unittest
from pathlib import Path

import jsonschema

from scripts.validate_submission import REQUIRED_SECTIONS, REQUIRED_SECTIONS_EN


REPO_ROOT = Path(__file__).resolve().parents[1]


class ProposalSchemaContractTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        cls.schema = json.loads(
            (REPO_ROOT / "schema" / "proposal.schema.json").read_text(encoding="utf-8")
        )

    def payload(self, language: str, sections: list[str]) -> dict[str, object]:
        return {
            "metadata": {
                "title": "Complete proposal",
                "author_github": "alice",
                "language": language,
                "license": "CC-BY-4.0",
                "summary": "A complete proposal with every required section.",
            },
            "sections": sections,
        }

    def test_requires_every_language_specific_section(self) -> None:
        for language, required_sections in (
            ("zh", REQUIRED_SECTIONS),
            ("en", REQUIRED_SECTIONS_EN),
        ):
            jsonschema.validate(self.payload(language, required_sections), self.schema)
            for missing_index, missing_section in enumerate(required_sections):
                sections = list(required_sections)
                sections[missing_index] = required_sections[0 if missing_index else 1]
                with self.subTest(language=language, missing=missing_section):
                    with self.assertRaises(jsonschema.ValidationError):
                        jsonschema.validate(self.payload(language, sections), self.schema)

    def test_bilingual_contract_requires_v2_translation_metadata(self) -> None:
        payload = self.payload("zh", REQUIRED_SECTIONS)
        metadata = payload["metadata"]
        assert isinstance(metadata, dict)
        metadata.update(
            {
                "proposal_format_version": "2",
                "bilingual_contract_version": "1",
                "translation_file": "proposal.en.md",
            }
        )
        jsonschema.validate(payload, self.schema)

        for missing_key in ("proposal_format_version", "translation_file"):
            invalid = json.loads(json.dumps(payload))
            del invalid["metadata"][missing_key]
            with self.subTest(missing=missing_key):
                with self.assertRaises(jsonschema.ValidationError):
                    jsonschema.validate(invalid, self.schema)

        payload["metadata"]["proposal_format_version"] = "1"
        with self.assertRaises(jsonschema.ValidationError):
            jsonschema.validate(payload, self.schema)


if __name__ == "__main__":
    unittest.main()
