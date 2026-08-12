from __future__ import annotations

import copy
import json
import unittest
from pathlib import Path

import jsonschema


ROOT = Path(__file__).resolve().parents[1]
SCHEMA = json.loads(
    (ROOT / "schema" / "gallery-publication.schema.json").read_text(encoding="utf-8")
)
VALIDATOR = jsonschema.Draft202012Validator(
    SCHEMA,
    format_checker=jsonschema.FormatChecker(),
)


def entry(**updates: object) -> dict[str, object]:
    value: dict[str, object] = {
        "path": "submissions/alice/example-proposal",
        "published": False,
        "featured": False,
        "review_status": "not_approved",
        "quality_tier": "qualified",
        "reviewed_by": "maintainer",
        "reviewed_at": "2026-08-12",
        "rights_reviewed": False,
        "reviewed_package_sha256": "0" * 64,
        "selection_reason_zh": "维护者审核记录",
        "selection_reason_en": "Maintainer review record",
        "selected_at": "2026-08-12",
    }
    value.update(updates)
    return value


def registry(item: dict[str, object]) -> dict[str, object]:
    return {"version": 1, "entries": [item]}


class GalleryPublicationSchemaTests(unittest.TestCase):
    def test_schema_accepts_consistent_publication_states(self) -> None:
        cases = (
            entry(),
            entry(review_status="approved_for_publication", rights_reviewed=True),
            entry(published=True, review_status="approved_for_publication", rights_reviewed=True),
            entry(
                published=True,
                featured=True,
                review_status="approved_for_publication",
                quality_tier="featured",
                rights_reviewed=True,
            ),
        )
        for item in cases:
            with self.subTest(item=item):
                VALIDATOR.validate(registry(item))

    def test_schema_rejects_states_rejected_by_gallery_generation(self) -> None:
        cases = (
            entry(published=True, rights_reviewed=True),
            entry(published=True, review_status="approved_for_publication"),
            entry(featured=True, quality_tier="featured"),
            entry(
                featured=True,
                published=True,
                review_status="approved_for_publication",
                rights_reviewed=True,
            ),
            entry(quality_tier="featured"),
        )
        for item in cases:
            with self.subTest(item=item):
                with self.assertRaises(jsonschema.ValidationError):
                    VALIDATOR.validate(registry(item))

    def test_unknown_fields_remain_rejected(self) -> None:
        item = copy.deepcopy(entry())
        item["unexpected"] = True
        with self.assertRaises(jsonschema.ValidationError):
            VALIDATOR.validate(registry(item))


if __name__ == "__main__":
    unittest.main()
