import importlib.util
import json
import sys
import tempfile
import unittest
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(REPO_ROOT / "scripts"))


HAS_SPATIAL_DEPS = all(
    importlib.util.find_spec(name) is not None for name in ["shapely", "pyproj"]
)

if HAS_SPATIAL_DEPS:
    from spatial_review import (  # noqa: E402
        AREA_TOLERANCE_SQM,
        RATIO_REPORTING_TOLERANCE,
        SpatialReport,
        check_metric_close,
        review_submission,
    )
    from pyproj import Transformer  # noqa: E402
    from shapely.geometry import shape  # noqa: E402
    from shapely.ops import transform  # noqa: E402


def write_json(root: Path, rel: str, content: object) -> None:
    path = root / rel
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(content, ensure_ascii=False, indent=2), encoding="utf-8")


def feature(feature_id: str, layer: str, geometry: dict, **props) -> dict:
    properties = {
        "id": feature_id,
        "layer": layer,
        "source_type": "agent_generated_design",
        "confidence": "medium",
        "geometry_role": "design_proposal",
    }
    properties.update(props)
    return {
        "type": "Feature",
        "id": feature_id,
        "properties": properties,
        "geometry": geometry,
    }


def projected_area(geometry: dict) -> float:
    transformer = Transformer.from_crs("EPSG:4326", "EPSG:4548", always_xy=True)
    return float(transform(transformer.transform, shape(geometry)).area)


def polygon(x1: float, y1: float, x2: float, y2: float) -> dict:
    return {
        "type": "Polygon",
        "coordinates": [[[x1, y1], [x2, y1], [x2, y2], [x1, y2], [x1, y1]]],
    }


def write_valid_spatial_package(root: Path, base: str) -> None:
    site = feature(
        "SITE-001",
        "SITE_BOUNDARY",
        polygon(116.300, 39.900, 116.310, 39.910),
        source_type="official_public",
        confidence="high",
        geometry_role="official_constraint",
        official_boundary=True,
    )
    key_areas = []
    for index, (area_id, geom) in enumerate(
        [
            ("zhongzhiyuan_ai_acceleration_area", polygon(116.301, 39.901, 116.302, 39.902)),
            ("beijing_ai_origin_community", polygon(116.303, 39.901, 116.304, 39.902)),
            ("dazhongsi_ai_industry_cluster", polygon(116.305, 39.901, 116.306, 39.902)),
        ],
        start=1,
    ):
        key_areas.append(
            feature(
                f"KEY-{index:03d}",
                "KEY_AREA",
                geom,
                area_id=area_id,
                source_type="official_public",
                confidence="high",
                geometry_role="official_constraint",
                official_boundary=True,
                official_area_sqm=round(projected_area(geom), 3),
            )
        )
    land = feature("LU-001", "LAND_USE", polygon(116.300, 39.900, 116.310, 39.910), land_use_code="0802")
    building = feature("BLDG-001", "BUILDING_FOOTPRINT", polygon(116.302, 39.902, 116.304, 39.904), building_type="office")
    green = feature("GREEN-001", "GREEN_SPACE", polygon(116.305, 39.905, 116.307, 39.907), land_use_code="1401")
    public = feature("PUBLIC-001", "PUBLIC_SPACE", polygon(116.307, 39.907, 116.309, 39.909))
    for filename, features in [
        ("site_boundary.geojson", [site]),
        ("key_areas.geojson", key_areas),
        ("land_use.geojson", [land]),
        ("buildings.geojson", [building]),
        ("green_space.geojson", [green]),
        ("public_space.geojson", [public]),
    ]:
        write_json(root, f"{base}/geometry/{filename}", {"type": "FeatureCollection", "features": features})
    write_json(root, f"{base}/metrics.json", {"schema_version": "0.1.0", "units": {"length": "m", "area": "sqm"}, "metrics": {}})


@unittest.skipUnless(HAS_SPATIAL_DEPS, "Install requirements-review.txt to run spatial review tests")
class SpatialReviewTests(unittest.TestCase):
    def test_valid_small_polygon_package_passes(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            base = "submissions/alice/spatial-ok"
            write_valid_spatial_package(root, base)
            report = review_submission(root / base, REPO_ROOT, "formal")
            self.assertTrue(report.ok, [issue.__dict__ for issue in report.issues])

    def test_land_use_gap_fails(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            base = "submissions/alice/spatial-gap"
            write_valid_spatial_package(root, base)
            land = feature("LU-001", "LAND_USE", polygon(116.300, 39.900, 116.305, 39.905), land_use_code="0802")
            write_json(root, f"{base}/geometry/land_use.geojson", {"type": "FeatureCollection", "features": [land]})
            report = review_submission(root / base, REPO_ROOT, "formal")
            self.assertFalse(report.ok)
            self.assertIn("LAND_USE_COVERAGE_GAP", {issue.check_id for issue in report.issues})

    def test_land_use_overlap_fails(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            base = "submissions/alice/spatial-overlap"
            write_valid_spatial_package(root, base)
            land_a = feature("LU-A", "LAND_USE", polygon(116.300, 39.900, 116.307, 39.910), land_use_code="0802")
            land_b = feature("LU-B", "LAND_USE", polygon(116.303, 39.900, 116.310, 39.910), land_use_code="1401")
            write_json(root, f"{base}/geometry/land_use.geojson", {"type": "FeatureCollection", "features": [land_a, land_b]})
            report = review_submission(root / base, REPO_ROOT, "formal")
            self.assertFalse(report.ok)
            self.assertIn("LAND_USE_OVERLAP", {issue.check_id for issue in report.issues})

    def test_building_outside_site_fails(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            base = "submissions/alice/spatial-outside"
            write_valid_spatial_package(root, base)
            building = feature("BLDG-001", "BUILDING_FOOTPRINT", polygon(116.320, 39.920, 116.322, 39.922), building_type="office")
            write_json(root, f"{base}/geometry/buildings.geojson", {"type": "FeatureCollection", "features": [building]})
            report = review_submission(root / base, REPO_ROOT, "formal")
            self.assertFalse(report.ok)
            self.assertIn("GEOMETRY_OUTSIDE_SITE", {issue.check_id for issue in report.issues})

    def test_declared_area_mismatch_fails(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            base = "submissions/alice/spatial-area"
            write_valid_spatial_package(root, base)
            data = json.loads((root / base / "geometry/green_space.geojson").read_text(encoding="utf-8"))
            data["features"][0]["properties"]["area_sqm_declared"] = 1
            write_json(root, f"{base}/geometry/green_space.geojson", data)
            report = review_submission(root / base, REPO_ROOT, "formal")
            self.assertFalse(report.ok)
            self.assertIn("DECLARED_AREA_MISMATCH", {issue.check_id for issue in report.issues})

    def test_key_area_area_mismatch_fails(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            base = "submissions/alice/spatial-key-area"
            write_valid_spatial_package(root, base)
            data = json.loads((root / base / "geometry/key_areas.geojson").read_text(encoding="utf-8"))
            data["features"][0]["properties"]["official_area_sqm"] = 1
            write_json(root, f"{base}/geometry/key_areas.geojson", data)
            report = review_submission(root / base, REPO_ROOT, "formal")
            self.assertFalse(report.ok)
            self.assertIn("KEY_AREA_AREA_MISMATCH", {issue.check_id for issue in report.issues})

    def test_absolute_metric_drift_is_reported_without_blocking_legacy_package(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            base = "submissions/alice/spatial-absolute-metric-drift"
            write_valid_spatial_package(root, base)
            green = projected_area(polygon(116.305, 39.905, 116.307, 39.907))
            metrics = {
                "schema_version": "0.1.0",
                "units": {"length": "m", "area": "sqm"},
                "metrics": {
                    "green_space_area_sqm": {
                        "status": "known",
                        "value": round(green + AREA_TOLERANCE_SQM * 2, 3),
                        "unit": "sqm",
                        "source_files": ["geometry/green_space.geojson"],
                        "formula": "sum(non-overlapping concept green-space polygons)",
                    }
                },
            }
            write_json(root, f"{base}/metrics.json", metrics)

            report = review_submission(root / base, REPO_ROOT, "formal")

            self.assertTrue(report.ok, [issue.__dict__ for issue in report.issues])
            self.assertIn("METRIC_RECALC_DRIFT", {issue.check_id for issue in report.issues})

    def test_ratio_drift_is_reported_without_blocking_legacy_package(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            base = "submissions/alice/spatial-ratio-drift"
            write_valid_spatial_package(root, base)
            public = projected_area(polygon(116.307, 39.907, 116.309, 39.909))
            site = projected_area(polygon(116.300, 39.900, 116.310, 39.910))
            metrics = {
                "schema_version": "0.1.0",
                "units": {"length": "m", "area": "sqm"},
                "metrics": {
                    "public_space_ratio": {
                        "status": "known",
                        "value": round(public / site + 0.0001, 6),
                        "unit": "ratio",
                        "source_files": [
                            "geometry/public_space.geojson",
                            "geometry/site_boundary.geojson",
                        ],
                        "formula": "public_space_area_sqm / site_area_sqm",
                    }
                },
            }
            write_json(root, f"{base}/metrics.json", metrics)

            report = review_submission(root / base, REPO_ROOT, "formal")

            self.assertTrue(report.ok, [issue.__dict__ for issue in report.issues])
            self.assertIn("METRIC_RECALC_DRIFT", {issue.check_id for issue in report.issues})

    def test_absolute_metric_mismatch_remains_blocking(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            base = "submissions/alice/spatial-absolute-metric-mismatch"
            write_valid_spatial_package(root, base)
            green = projected_area(polygon(116.305, 39.905, 116.307, 39.907))
            metrics = {
                "schema_version": "0.1.0",
                "units": {"length": "m", "area": "sqm"},
                "metrics": {
                    "green_space_area_sqm": {
                        "status": "known",
                        "value": round(green * 1.02, 3),
                        "unit": "sqm",
                        "source_files": ["geometry/green_space.geojson"],
                        "formula": "sum(non-overlapping concept green-space polygons)",
                    }
                },
            }
            write_json(root, f"{base}/metrics.json", metrics)

            report = review_submission(root / base, REPO_ROOT, "formal")

            self.assertFalse(report.ok)
            self.assertIn("METRIC_RECALC_MISMATCH", {issue.check_id for issue in report.issues})

    def test_ratio_reporting_boundary_ignores_binary_float_noise(self) -> None:
        report = SpatialReport(stage="formal")
        expected = 0.25
        actual = expected + RATIO_REPORTING_TOLERANCE

        check_metric_close(
            report,
            {"ratio": {"value": actual}},
            "ratio",
            expected,
            "ratio",
        )

        self.assertTrue(report.ok, [issue.__dict__ for issue in report.issues])
        self.assertNotIn("METRIC_RECALC_DRIFT", {issue.check_id for issue in report.issues})

    def test_ratio_reporting_drift_above_boundary_is_visible(self) -> None:
        report = SpatialReport(stage="formal")
        expected = 0.25
        actual = expected + RATIO_REPORTING_TOLERANCE * 2

        check_metric_close(
            report,
            {"ratio": {"value": actual}},
            "ratio",
            expected,
            "ratio",
        )

        self.assertTrue(report.ok, [issue.__dict__ for issue in report.issues])
        self.assertIn("METRIC_RECALC_DRIFT", {issue.check_id for issue in report.issues})

if __name__ == "__main__":
    unittest.main()
