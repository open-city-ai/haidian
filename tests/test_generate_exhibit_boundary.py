from __future__ import annotations

import json
import sys
import tempfile
import unittest
from pathlib import Path
from unittest import mock


ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "scripts"))

import generate_exhibit  # noqa: E402


def write_collection(path: Path, properties: list[dict[str, object]]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(
        json.dumps(
            {
                "type": "FeatureCollection",
                "features": [
                    {
                        "type": "Feature",
                        "properties": item,
                        "geometry": {
                            "type": "Polygon",
                            "coordinates": [[[0, 0], [1, 0], [1, 1], [0, 0]]],
                        },
                    }
                    for item in properties
                ],
            }
        ),
        encoding="utf-8",
    )


class GenerateExhibitBoundaryTests(unittest.TestCase):
    def make_geometry(self, root: Path, *, provisional_key_area: bool = False) -> Path:
        submission = root / "submissions" / "alice" / "example"
        official = {
            "official_boundary": True,
            "geometry_role": "official_constraint",
        }
        write_collection(submission / "geometry" / "site_boundary.geojson", [official])
        key_areas = [dict(official) for _ in range(3)]
        if provisional_key_area:
            key_areas[-1] = {
                "official_boundary": False,
                "geometry_role": "provisional_constraint",
            }
        write_collection(submission / "geometry" / "key_areas.geojson", key_areas)
        (submission / "assets" / "figures").mkdir(parents=True)
        (submission / "assets" / "figures" / "site-overview.png").write_bytes(b"png")
        (submission / "proposal.md").write_text(
            "---\ntitle: Example\nsummary: A complete exhibit summary.\n---\n# Example\n",
            encoding="utf-8",
        )
        return submission

    def build_exhibit(self, repo_root: Path, submission: Path) -> dict:
        publication = {
            "published": True,
            "featured": False,
            "selection_reason_zh": "Selected for the fixture.",
        }
        rel = submission.relative_to(repo_root).as_posix()
        with mock.patch.object(
            generate_exhibit,
            "load_publication_registry",
            return_value={rel: publication},
        ):
            return generate_exhibit.build_exhibit(repo_root, submission)

    def test_complete_official_geometry_is_ready_without_legacy_self_check_signals(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            submission = self.make_geometry(Path(tmp))
            (submission / "self_check.json").write_text(
                json.dumps(
                    {
                        "checks": [
                            {"check_id": "DETERMINISTIC_VALIDATION", "severity": "blocking"},
                            {"check_id": "SPATIAL_REVIEW", "severity": "blocking"},
                        ]
                    }
                ),
                encoding="utf-8",
            )

            exhibit = self.build_exhibit(Path(tmp), submission)

        self.assertIn("官方边界就绪", exhibit["hero"]["caption"])
        self.assertNotIn("临时边界", exhibit["hero"]["caption"])

    def test_any_provisional_key_area_keeps_exhibit_provisional(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            submission = self.make_geometry(Path(tmp), provisional_key_area=True)

            exhibit = self.build_exhibit(Path(tmp), submission)

        self.assertIn("临时边界", exhibit["hero"]["caption"])


if __name__ == "__main__":
    unittest.main()
