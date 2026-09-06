from __future__ import annotations

import copy
import json
import sys
import unittest
from pathlib import Path

import jsonschema


ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "scripts"))

from render_exhibit import ExhibitError, safe_asset_path  # noqa: E402
from render_portal import PortalError, safe_local_link  # noqa: E402


SCHEMA = json.loads((ROOT / "schema" / "exhibit.schema.json").read_text(encoding="utf-8"))
VALIDATOR = jsonschema.Draft202012Validator(SCHEMA)
TEMPLATE = json.loads((ROOT / "templates" / "exhibit.json").read_text(encoding="utf-8"))


class ExhibitSchemaPathTests(unittest.TestCase):
    def test_template_and_safe_local_paths_are_valid(self) -> None:
        VALIDATOR.validate(TEMPLATE)
        cases = (
            ("card", "cover", "assets/cover.png"),
            ("card", "cover", "assets\\cover.png"),
            ("hero", "image", "assets/figures/hero image.webp"),
            ("hero", "image", "assets/figures\\hero.png"),
            ("links", "detail", "report/index.html"),
            ("links", "detail", "report\\index.html"),
            ("links", "detail", "report//index.html"),
            ("links", "showcase", "visual/index.html?mode=full#view"),
        )
        for parent, field, value in cases:
            with self.subTest(field=f"{parent}.{field}", value=value):
                data = copy.deepcopy(TEMPLATE)
                data[parent][field] = value
                VALIDATOR.validate(data)

    def test_asset_paths_rejected_by_renderer_are_rejected_by_schema(self) -> None:
        paths = (
            "assets/../secret.png",
            "assets/figures/../../secret.png",
            "assets\\..\\secret.png",
        )
        for parent, field in (("card", "cover"), ("hero", "image")):
            for value in paths:
                with self.subTest(field=f"{parent}.{field}", value=value):
                    with self.assertRaises(ExhibitError):
                        safe_asset_path(value)
                    data = copy.deepcopy(TEMPLATE)
                    data[parent][field] = value
                    with self.assertRaises(jsonschema.ValidationError):
                        VALIDATOR.validate(data)

    def test_links_rejected_by_portal_are_rejected_by_schema(self) -> None:
        paths = (
            "../outside.html",
            "report/../../outside.html",
            "/absolute.html",
            "//example.com/view",
            "https://example.com/view",
            "report\\..\\outside.html",
        )
        for field in ("detail", "showcase"):
            for value in paths:
                with self.subTest(field=field, value=value):
                    with self.assertRaises(PortalError):
                        safe_local_link(value, "index.html")
                    data = copy.deepcopy(TEMPLATE)
                    data["links"][field] = value
                    with self.assertRaises(jsonschema.ValidationError):
                        VALIDATOR.validate(data)


if __name__ == "__main__":
    unittest.main()
