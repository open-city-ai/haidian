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
        SpatialReport,
        check_land_use_coverage,
        review_submission,
    )
    from pyproj import Transformer  # noqa: E402
    from shapely.geometry import box, shape  # noqa: E402
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

    def test_boolean_metric_value_is_rejected_before_spatial_recalculation(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            base = "submissions/alice/spatial-boolean-metric"
            write_valid_spatial_package(root, base)
            write_json(
                root,
                f"{base}/metrics.json",
                {
                    "schema_version": "0.1.0",
                    "units": {"length": "m", "area": "sqm"},
                    "metrics": {
                        "green_ratio": {"status": "known", "value": True, "unit": "ratio"},
                    },
                },
            )

            report = review_submission(root / base, REPO_ROOT, "formal")

        self.assertFalse(report.ok)
        self.assertIn("METRIC_VALUE_TYPE", {issue.check_id for issue in report.issues})

    def test_huge_integer_metric_value_is_rejected_before_spatial_recalculation(self) -> None:
        for value in (10**1000, -(10**1000)):
            with self.subTest(sign=value > 0), tempfile.TemporaryDirectory() as tmp:
                root = Path(tmp)
                base = "submissions/alice/spatial-huge-integer-metric"
                write_valid_spatial_package(root, base)
                write_json(
                    root,
                    f"{base}/metrics.json",
                    {
                        "schema_version": "0.1.0",
                        "units": {"length": "m", "area": "sqm"},
                        "metrics": {
                            "green_ratio": {"status": "known", "value": value, "unit": "ratio"},
                        },
                    },
                )

                report = review_submission(root / base, REPO_ROOT, "formal")

            self.assertFalse(report.ok)
            self.assertIn("METRIC_VALUE_TYPE", {issue.check_id for issue in report.issues})

    def test_nonfinite_metric_value_is_rejected_before_spatial_recalculation(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            base = "submissions/alice/spatial-nonfinite-metric"
            write_valid_spatial_package(root, base)
            write_json(
                root,
                f"{base}/metrics.json",
                {
                    "schema_version": "0.1.0",
                    "units": {"length": "m", "area": "sqm"},
                    "metrics": {
                        "green_ratio": {
                            "status": "known",
                            "value": float("nan"),
                            "unit": "ratio",
                        },
                    },
                },
            )

            report = review_submission(root / base, REPO_ROOT, "formal")

        self.assertFalse(report.ok)
        self.assertIn("METRIC_VALUE_TYPE", {issue.check_id for issue in report.issues})

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
            overlap_issues = [issue for issue in report.issues if issue.check_id == "LAND_USE_OVERLAP"]
            self.assertEqual(len(overlap_issues), 1)
            self.assertNotIn("projection-chord sliver", overlap_issues[0].message)

    def test_projection_chord_sliver_gets_guidance_without_relaxing_threshold(self) -> None:
        transformer = Transformer.from_crs("EPSG:4326", "EPSG:4548", always_xy=True)
        lat = 39.947
        west, east = 116.3407, 116.3553
        polygon_a = box(west, lat, (west + east) / 2, lat + 0.001)
        polygon_b = box(west, lat - 0.001, east, lat)
        projected_a = transform(transformer.transform, polygon_a)
        projected_b = transform(transformer.transform, polygon_b)
        site = transform(
            transformer.transform,
            box(west, lat - 0.001, east, lat + 0.001),
        )

        report = SpatialReport()
        check_land_use_coverage(
            report,
            site,
            [("LU-A", projected_a, {}), ("LU-B", projected_b, {})],
        )

        overlap_issues = [issue for issue in report.issues if issue.check_id == "LAND_USE_OVERLAP"]
        self.assertEqual(len(overlap_issues), 1)
        self.assertFalse(report.ok)
        self.assertIn("projection-chord sliver", overlap_issues[0].message)
        self.assertIn("threshold remains unchanged", overlap_issues[0].message)
        self.assertAlmostEqual(float(overlap_issues[0].actual), 7.961, places=3)

    def test_projected_first_shared_cut_has_no_overlap_or_gap(self) -> None:
        transformer = Transformer.from_crs("EPSG:4326", "EPSG:4548", always_xy=True)
        wgs84_site = box(116.3407, 39.946, 116.3553, 39.948)
        projected_site = transform(transformer.transform, wgs84_site)
        min_x, min_y, max_x, max_y = projected_site.bounds
        cut_x = (min_x + max_x) / 2
        cut_window = box(min_x - 1, min_y - 1, cut_x, max_y + 1)
        projected_left = projected_site.intersection(cut_window)
        projected_right = projected_site.difference(projected_left)

        report = SpatialReport()
        check_land_use_coverage(
            report,
            projected_site,
            [("LU-LEFT", projected_left, {}), ("LU-RIGHT", projected_right, {})],
        )

        self.assertTrue(report.ok, [issue.__dict__ for issue in report.issues])
        self.assertNotIn("LAND_USE_OVERLAP", {issue.check_id for issue in report.issues})
        self.assertNotIn("LAND_USE_COVERAGE_GAP", {issue.check_id for issue in report.issues})

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

    def test_provisional_key_area_ignores_non_authoritative_area_field(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            base = "submissions/alice/spatial-provisional-key-area"
            write_valid_spatial_package(root, base)
            path = root / base / "geometry/key_areas.geojson"
            data = json.loads(path.read_text(encoding="utf-8"))
            props = data["features"][0]["properties"]
            props.update(
                source_type="agent_generated_design",
                confidence="medium",
                geometry_role="design_proposal",
                official_boundary=False,
                official_area_sqm=True,
            )
            write_json(root, f"{base}/geometry/key_areas.geojson", data)

            report = review_submission(root / base, REPO_ROOT, "formal")

        check_ids = {issue.check_id for issue in report.issues}
        self.assertNotIn("KEY_AREA_AREA_TYPE", check_ids)
        self.assertIn("KEY_AREA_NOT_OFFICIAL", check_ids)

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


if __name__ == "__main__":
    unittest.main()
