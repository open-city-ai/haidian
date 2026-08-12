from __future__ import annotations

import copy
import json
import unittest
from pathlib import Path

import jsonschema


ROOT = Path(__file__).resolve().parents[1]


def load_json(path: Path) -> dict:
    return json.loads(path.read_text(encoding="utf-8"))


def validator(schema_name: str) -> jsonschema.Draft202012Validator:
    schema = load_json(ROOT / "schema" / schema_name)
    jsonschema.Draft202012Validator.check_schema(schema)
    return jsonschema.Draft202012Validator(
        schema,
        format_checker=jsonschema.FormatChecker(),
    )


class RegistrySchemaContractTests(unittest.TestCase):
    def test_track_registry_matches_its_declared_schema(self) -> None:
        data = load_json(ROOT / "tracks.json")
        validator("track.schema.json").validate(data)

    def test_collections_and_template_match_their_declared_schema(self) -> None:
        collection_validator = validator("collection.schema.json")
        for path in sorted((ROOT / "collections").glob("*.json")):
            with self.subTest(path=path.relative_to(ROOT)):
                collection_validator.validate(load_json(path))

        template = load_json(ROOT / "templates" / "collection.json")
        template["items"][0]["proposal"] = "submissions/alice/example-proposal"
        collection_validator.validate(template)

    def test_structured_templates_match_their_declared_schemas(self) -> None:
        for stem in ("risk", "scenario", "spatial"):
            with self.subTest(schema=stem):
                validator(f"{stem}.schema.json").validate(
                    load_json(ROOT / "templates" / f"{stem}.json")
                )

    def test_structured_examples_match_their_declared_schemas(self) -> None:
        example = ROOT / "examples" / "agent-civic-loop"
        for stem in ("risk", "spatial"):
            with self.subTest(schema=stem):
                validator(f"{stem}.schema.json").validate(load_json(example / f"{stem}.json"))

    def test_unknown_top_level_fields_remain_rejected(self) -> None:
        cases = (
            ("track.schema.json", ROOT / "tracks.json"),
            ("collection.schema.json", ROOT / "collections" / "featured-civic-governance.json"),
            ("risk.schema.json", ROOT / "templates" / "risk.json"),
            ("scenario.schema.json", ROOT / "templates" / "scenario.json"),
            ("spatial.schema.json", ROOT / "templates" / "spatial.json"),
        )
        for schema_name, path in cases:
            with self.subTest(schema=schema_name):
                data = copy.deepcopy(load_json(path))
                data["unexpected"] = True
                with self.assertRaises(jsonschema.ValidationError):
                    validator(schema_name).validate(data)


if __name__ == "__main__":
    unittest.main()
