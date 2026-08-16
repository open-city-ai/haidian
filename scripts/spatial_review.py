#!/usr/bin/env python3
"""Trusted spatial review for AI urban design packages.

This script is intended for local/maintainer use. It depends on geospatial
libraries (``shapely``, ``pyproj``, and optionally ``jsonschema``) and should
not replace the dependency-free required PR validator.

Checks performed
----------------
- ``site_boundary.geojson`` is non-empty and forms a valid polygon.
- ``key_areas.geojson`` has exactly the three required key-area polygons, each
  inside the site boundary and non-overlapping.  Official area values are
  compared against known announcement figures (±3 % tolerance).
- ``land_use.geojson`` completely covers the site boundary with no gaps or
  overlaps between polygons (topology-safe partition check).
- ``buildings.geojson``, ``green_space.geojson``, and ``public_space.geojson``
  are all inside the site boundary.
- Computed spatial metrics (site area, green ratio, public-space ratio, building
  footprint area) are compared against declared ``metrics.json`` values (1 %
  relative tolerance for areas, 1 % absolute tolerance for ratios).
- When ``jsonschema`` is installed, GeoJSON layers are validated against the
  repository's schema files.

Spatial metrics computed
------------------------
- ``site_area_sqm`` — projected area of site boundary (EPSG:4548)
- ``green_space_area_sqm`` — union of green-space features
- ``public_space_area_sqm`` — union of public-space features
- ``building_footprint_area_sqm`` — union of building footprints
- ``green_ratio`` — ``green_space_area_sqm / site_area_sqm``
- ``public_space_ratio`` — ``public_space_area_sqm / site_area_sqm``

Usage
-----
Human-readable output::

    python3 scripts/spatial_review.py submissions/<login>/<slug>

Machine-readable JSON::

    python3 scripts/spatial_review.py submissions/<login>/<slug> --json

Install required dependencies first::

    python3 -m pip install -r requirements-review.txt

This script is gate 2 of the four-gate self-check. Run it directly or through
``self_check_submission.py``.
"""

from __future__ import annotations

import argparse
import json
import math
import sys
from dataclasses import dataclass, field
from pathlib import Path
from typing import Any

from metric_types import is_json_number


try:
    from pyproj import Transformer
    from shapely.geometry import shape
    from shapely.ops import transform, unary_union
    from shapely.validation import explain_validity
except ImportError as exc:  # pragma: no cover - exercised through subprocess smoke checks
    print(
        "spatial_review.py requires review dependencies. Install with: "
        "python3 -m pip install -r requirements-review.txt",
        file=sys.stderr,
    )
    raise SystemExit(2) from exc


try:
    import jsonschema
except ImportError:  # pragma: no cover
    jsonschema = None


AREA_TOLERANCE_SQM = 1.0
RELATIVE_AREA_TOLERANCE = 0.01
# Keep the existing compatibility envelope for legacy packages, but surface a
# non-blocking finding when a declared absolute area drifts beyond ordinary
# three-decimal reporting precision.
AREA_REPORTING_COMPARISON_EPSILON = 1e-9
TOPOLOGY_RELATIVE_AREA_TOLERANCE = 0.0001
KEY_AREA_RELATIVE_TOLERANCE = 0.03
# These thresholds are diagnostic only. They must not weaken the strict
# overlap check above; they identify a common projection-chord sliver shape
# so contributors get a useful remediation hint alongside the failure.
SLIVER_OVERLAP_MAX_AREA_SQM = 10.0
SLIVER_OVERLAP_MAX_AREA_PERIMETER_RATIO_M = 0.05
OFFICIAL_KEY_AREA_AREAS = {
    "zhongzhiyuan_ai_acceleration_area": 1921000.0,
    "beijing_ai_origin_community": 1043000.0,
    "dazhongsi_ai_industry_cluster": 720000.0,
}


@dataclass
class SpatialIssue:
    check_id: str
    severity: str
    target_file: str
    message: str
    target_feature_id: str | None = None
    expected: str | float | None = None
    actual: str | float | None = None


@dataclass
class SpatialReport:
    ok: bool = True
    stage: str = "formal"
    issues: list[SpatialIssue] = field(default_factory=list)
    metrics: dict[str, float] = field(default_factory=dict)

    def add(self, issue: SpatialIssue) -> None:
        if issue.severity in {"blocking", "major"}:
            self.ok = False
        self.issues.append(issue)

    def to_dict(self) -> dict[str, Any]:
        return {
            "ok": self.ok,
            "stage": self.stage,
            "issues": [issue.__dict__ for issue in self.issues],
            "metrics": self.metrics,
        }


def load_json(path: Path) -> Any:
    return json.loads(path.read_text(encoding="utf-8"))


def load_schema(repo_root: Path, name: str) -> dict | None:
    path = repo_root / "brief" / "site-package" / "schemas" / name
    if not path.exists():
        return None
    return load_json(path)


def validate_schema(report: SpatialReport, repo_root: Path, path: Path, schema_name: str) -> None:
    if jsonschema is None:
        report.add(
            SpatialIssue(
                "SCHEMA_DEPENDENCY_MISSING",
                "minor",
                str(path),
                "jsonschema is not installed; schema validation skipped.",
            )
        )
        return
    schema = load_schema(repo_root, schema_name)
    if schema is None:
        return
    try:
        jsonschema.validate(load_json(path), schema)
    except jsonschema.ValidationError as exc:
        report.add(
            SpatialIssue(
                "JSON_SCHEMA_VALIDATION",
                "major",
                str(path),
                exc.message,
            )
        )


def project_geometry(geom: Any, transformer: Transformer) -> Any:
    return transform(transformer.transform, geom)


def load_feature_geometries(
    report: SpatialReport,
    repo_root: Path,
    submission_dir: Path,
    filename: str,
    transformer: Transformer,
) -> list[tuple[str, Any, dict]]:
    path = submission_dir / "geometry" / filename
    if not path.exists():
        report.add(SpatialIssue("GEOMETRY_FILE_MISSING", "major", str(path), "Missing geometry file."))
        return []
    validate_schema(report, repo_root, path, "geojson_feature.schema.json")
    data = load_json(path)
    features = data.get("features", []) if isinstance(data, dict) else []
    items: list[tuple[str, Any, dict]] = []
    for index, feature in enumerate(features):
        feature_id = str(feature.get("id") or f"feature-{index}")
        props = feature.get("properties") or {}
        try:
            geom = project_geometry(shape(feature["geometry"]), transformer)
        except Exception as exc:  # noqa: BLE001 - report invalid contributor data
            report.add(
                SpatialIssue(
                    "GEOMETRY_PARSE",
                    "major",
                    str(path),
                    f"Cannot parse geometry: {exc}",
                    feature_id,
                )
            )
            continue
        if not geom.is_valid:
            report.add(
                SpatialIssue(
                    "GEOMETRY_VALIDITY",
                    "major",
                    str(path),
                    explain_validity(geom),
                    feature_id,
                )
            )
        declared = props.get("area_sqm_declared")
        if isinstance(declared, bool):
            report.add(
                SpatialIssue(
                    "DECLARED_AREA_TYPE",
                    "major",
                    str(path),
                    "Declared area must be a JSON number, not a boolean.",
                    feature_id,
                    actual=declared,
                )
            )
        elif is_json_number(declared) and geom.geom_type in {"Polygon", "MultiPolygon"}:
            delta = abs(float(declared) - float(geom.area))
            allowed_delta = max(AREA_TOLERANCE_SQM, abs(float(geom.area)) * RELATIVE_AREA_TOLERANCE)
            if delta > allowed_delta:
                report.add(
                    SpatialIssue(
                        "DECLARED_AREA_MISMATCH",
                        "major",
                        str(path),
                        "Declared area differs from projected geometry area.",
                        feature_id,
                        expected=round(float(geom.area), 3),
                        actual=round(float(declared), 3),
                    )
                )
        items.append((feature_id, geom, props))
    return items


def union_geometries(items: list[tuple[str, Any, dict]]) -> Any | None:
    geometries = [geom for _feature_id, geom, _props in items if not geom.is_empty]
    if not geometries:
        return None
    return unary_union(geometries)


def projection_chord_sliver_hint(overlap: Any) -> str | None:
    """Return a remediation hint for a small, very thin projected overlap."""
    area = float(overlap.area)
    perimeter = float(overlap.length)
    if (
        area <= SLIVER_OVERLAP_MAX_AREA_SQM
        and perimeter > 0
        and area / perimeter <= SLIVER_OVERLAP_MAX_AREA_PERIMETER_RATIO_M
    ):
        ratio = area / perimeter
        return (
            " Possible projection-chord sliver: the overlap is "
            f"{area:.3f} m² with an area/perimeter ratio of {ratio:.4f} m. "
            "If adjacent edges follow a constant latitude, generate them "
            "with the same densified vertices before projecting to EPSG:4548; "
            "the 1 m² overlap threshold remains unchanged."
        )
    return None


def check_inside_site(
    report: SpatialReport,
    site: Any,
    items: list[tuple[str, Any, dict]],
    target_file: str,
) -> None:
    allowed_outside = max(AREA_TOLERANCE_SQM, float(site.area) * TOPOLOGY_RELATIVE_AREA_TOLERANCE)
    for feature_id, geom, _props in items:
        outside = geom.difference(site)
        if not outside.is_empty and outside.area > allowed_outside:
            report.add(
                SpatialIssue(
                    "GEOMETRY_OUTSIDE_SITE",
                    "major",
                    target_file,
                    "Geometry extends outside site boundary.",
                    feature_id,
                    expected="inside site boundary",
                    actual=round(float(outside.area), 3),
                )
            )


def check_land_use_coverage(report: SpatialReport, site: Any, land_items: list[tuple[str, Any, dict]]) -> None:
    land_union = union_geometries(land_items)
    if land_union is None:
        report.add(
            SpatialIssue(
                "LAND_USE_EMPTY",
                "major",
                "geometry/land_use.geojson",
                "Land-use layer has no polygons.",
            )
        )
        return
    gap = site.difference(land_union)
    allowed_gap = max(AREA_TOLERANCE_SQM, float(site.area) * TOPOLOGY_RELATIVE_AREA_TOLERANCE)
    if not gap.is_empty and gap.area > allowed_gap:
        report.add(
            SpatialIssue(
                "LAND_USE_COVERAGE_GAP",
                "major",
                "geometry/land_use.geojson",
                "Land-use polygons do not fully cover site boundary.",
                expected=round(float(site.area), 3),
                actual=round(float(site.area - gap.area), 3),
            )
        )
    for index, (feature_id, geom, _props) in enumerate(land_items):
        for other_id, other_geom, _other_props in land_items[index + 1 :]:
            overlap = geom.intersection(other_geom)
            if not overlap.is_empty and overlap.area > AREA_TOLERANCE_SQM:
                message = f"Land-use polygon overlaps `{other_id}`."
                hint = projection_chord_sliver_hint(overlap)
                if hint:
                    message += hint
                report.add(
                    SpatialIssue(
                        "LAND_USE_OVERLAP",
                        "major",
                        "geometry/land_use.geojson",
                        message,
                        feature_id,
                        expected="no overlap",
                        actual=round(float(overlap.area), 3),
                    )
                )


def check_key_areas(report: SpatialReport, site: Any, key_items: list[tuple[str, Any, dict]]) -> None:
    if not key_items:
        report.add(
            SpatialIssue(
                "KEY_AREAS_EMPTY",
                "major",
                "geometry/key_areas.geojson",
                "Key detailed-design area layer has no polygons.",
            )
        )
        return

    seen_area_ids: set[str] = set()
    for index, (feature_id, geom, props) in enumerate(key_items):
        area_id = str(props.get("area_id") or feature_id)
        seen_area_ids.add(area_id)
        is_official = (
            props.get("official_boundary") is True
            and props.get("geometry_role") == "official_constraint"
        )
        is_provisional = (
            props.get("official_boundary") is False
            and props.get("geometry_role") == "provisional_constraint"
        )
        if not is_official and not is_provisional:
            report.add(
                SpatialIssue(
                    "KEY_AREA_NOT_OFFICIAL",
                    "major",
                    "geometry/key_areas.geojson",
                    "Formal key area must be official_constraint or provisional_constraint with explicit official_boundary flag.",
                    feature_id,
                )
            )
        elif is_provisional:
            report.add(
                SpatialIssue(
                    "KEY_AREA_PROVISIONAL",
                    "minor",
                    "geometry/key_areas.geojson",
                    "Key detailed-design area is provisional; do not use it as an official redline or precise-area basis. Content scoring remains eligible.",
                    feature_id,
                )
            )
        outside = geom.difference(site)
        if not outside.is_empty and outside.area > AREA_TOLERANCE_SQM:
            report.add(
                SpatialIssue(
                    "KEY_AREA_OUTSIDE_SITE",
                    "major",
                    "geometry/key_areas.geojson",
                    "Key detailed-design area extends outside site boundary.",
                    feature_id,
                    expected="inside site boundary",
                    actual=round(float(outside.area), 3),
                )
            )
        expected_area = props.get("official_area_sqm")
        if is_official and isinstance(expected_area, bool):
            report.add(
                SpatialIssue(
                    "KEY_AREA_AREA_TYPE",
                    "major",
                    "geometry/key_areas.geojson",
                    "Official key-area area must be a JSON number, not a boolean.",
                    feature_id,
                    actual=expected_area,
                )
            )
        elif not is_json_number(expected_area) and is_official:
            expected_area = OFFICIAL_KEY_AREA_AREAS.get(area_id)
        if is_json_number(expected_area) and is_official:
            delta = abs(float(expected_area) - float(geom.area))
            allowed = max(AREA_TOLERANCE_SQM, float(expected_area) * KEY_AREA_RELATIVE_TOLERANCE)
            if delta > allowed:
                report.add(
                    SpatialIssue(
                        "KEY_AREA_AREA_MISMATCH",
                        "major",
                        "geometry/key_areas.geojson",
                        "Key detailed-design area differs from official announcement/declared area.",
                        feature_id,
                        expected=round(float(expected_area), 3),
                        actual=round(float(geom.area), 3),
                    )
                )
        for other_id, other_geom, _other_props in key_items[index + 1 :]:
            overlap = geom.intersection(other_geom)
            if not overlap.is_empty and overlap.area > AREA_TOLERANCE_SQM:
                report.add(
                    SpatialIssue(
                        "KEY_AREA_OVERLAP",
                        "major",
                        "geometry/key_areas.geojson",
                        f"Key area overlaps `{other_id}`.",
                        feature_id,
                        expected="no overlap",
                        actual=round(float(overlap.area), 3),
                    )
                )

    missing = sorted(set(OFFICIAL_KEY_AREA_AREAS) - seen_area_ids)
    if missing:
        report.add(
            SpatialIssue(
                "KEY_AREA_MISSING",
                "major",
                "geometry/key_areas.geojson",
                f"Missing required key detailed-design area(s): {', '.join(missing)}.",
            )
        )


def metric_value(metrics: dict, name: str) -> float | None:
    metric = metrics.get(name)
    if not isinstance(metric, dict):
        return None
    value = metric.get("value")
    if is_json_number(value):
        return float(value)
    return None


def check_metric_close(
    report: SpatialReport,
    metrics: dict,
    name: str,
    expected: float,
    unit: str,
) -> None:
    actual = metric_value(metrics, name)
    if actual is None:
        return
    if unit == "ratio" and (actual < 0 or actual > 1):
        report.add(
            SpatialIssue(
                "METRIC_RATIO_RANGE",
                "major",
                "metrics.json",
                f"{name} must be between 0 and 1.",
                expected="0..1",
                actual=actual,
            )
        )
        return
    delta = abs(actual - expected)
    allowed_delta = max(AREA_TOLERANCE_SQM if unit == "sqm" else 0.01, abs(expected) * RELATIVE_AREA_TOLERANCE)
    if delta > allowed_delta:
        report.add(
            SpatialIssue(
                "METRIC_RECALC_MISMATCH",
                "major",
                "metrics.json",
                f"{name} does not match spatial recomputation.",
                expected=round(expected, 6),
                actual=round(actual, 6),
            )
        )
    elif unit == "sqm" and delta > AREA_TOLERANCE_SQM and not math.isclose(
        delta,
        AREA_TOLERANCE_SQM,
        rel_tol=0.0,
        abs_tol=AREA_REPORTING_COMPARISON_EPSILON,
    ):
        report.add(
            SpatialIssue(
                "METRIC_RECALC_DRIFT",
                "minor",
                "metrics.json",
                f"{name} is within the legacy tolerance but drifts beyond ordinary reporting precision; reconcile before publication.",
                expected=round(expected, 6),
                actual=round(actual, 6),
            )
        )


def load_metrics(submission_dir: Path) -> dict:
    path = submission_dir / "metrics.json"
    if not path.exists():
        return {}
    data = load_json(path)
    if not isinstance(data, dict):
        return {}
    metrics = data.get("metrics")
    return metrics if isinstance(metrics, dict) else {}


def review_submission(submission_dir: Path, repo_root: Path, stage: str) -> SpatialReport:
    report = SpatialReport(stage=stage)
    transformer = Transformer.from_crs("EPSG:4326", "EPSG:4548", always_xy=True)

    site_items = load_feature_geometries(
        report, repo_root, submission_dir, "site_boundary.geojson", transformer
    )
    site = union_geometries(site_items)
    if site is None or site.is_empty:
        report.add(
            SpatialIssue(
                "SITE_BOUNDARY_EMPTY",
                "blocking",
                "geometry/site_boundary.geojson",
                "Site boundary is empty.",
            )
        )
        return report

    layer_items = {
        "key_areas.geojson": load_feature_geometries(
            report, repo_root, submission_dir, "key_areas.geojson", transformer
        ),
        "land_use.geojson": load_feature_geometries(
            report, repo_root, submission_dir, "land_use.geojson", transformer
        ),
        "buildings.geojson": load_feature_geometries(
            report, repo_root, submission_dir, "buildings.geojson", transformer
        ),
        "green_space.geojson": load_feature_geometries(
            report, repo_root, submission_dir, "green_space.geojson", transformer
        ),
        "public_space.geojson": load_feature_geometries(
            report, repo_root, submission_dir, "public_space.geojson", transformer
        ),
    }
    check_key_areas(report, site, layer_items["key_areas.geojson"])
    check_land_use_coverage(report, site, layer_items["land_use.geojson"])
    for filename in ["buildings.geojson", "green_space.geojson", "public_space.geojson"]:
        check_inside_site(report, site, layer_items[filename], f"geometry/{filename}")

    site_area = float(site.area)
    green_union = union_geometries(layer_items["green_space.geojson"])
    public_union = union_geometries(layer_items["public_space.geojson"])
    building_union = union_geometries(layer_items["buildings.geojson"])
    green_area = float(green_union.area) if green_union is not None else 0.0
    public_area = float(public_union.area) if public_union is not None else 0.0
    building_area = float(building_union.area) if building_union is not None else 0.0
    report.metrics = {
        "site_area_sqm": round(site_area, 3),
        "green_space_area_sqm": round(green_area, 3),
        "public_space_area_sqm": round(public_area, 3),
        "building_footprint_area_sqm": round(building_area, 3),
        "green_ratio": round(green_area / site_area, 6) if site_area else math.nan,
        "public_space_ratio": round(public_area / site_area, 6) if site_area else math.nan,
    }

    metrics = load_metrics(submission_dir)
    for name, metric in metrics.items():
        if (
            isinstance(metric, dict)
            and metric.get("status") == "known"
            and not is_json_number(metric.get("value"))
        ):
            report.add(
                SpatialIssue(
                    "METRIC_VALUE_TYPE",
                    "major",
                    "metrics.json",
                    f"{name} must use a finite JSON number.",
                    actual=metric.get("value"),
                )
            )
    check_metric_close(report, metrics, "site_area_sqm", site_area, "sqm")
    check_metric_close(report, metrics, "green_space_area_sqm", green_area, "sqm")
    check_metric_close(report, metrics, "public_space_area_sqm", public_area, "sqm")
    check_metric_close(report, metrics, "building_footprint_area_sqm", building_area, "sqm")
    check_metric_close(report, metrics, "green_ratio", green_area / site_area if site_area else 0, "ratio")
    check_metric_close(
        report, metrics, "public_space_ratio", public_area / site_area if site_area else 0, "ratio"
    )
    for name, metric in metrics.items():
        if isinstance(metric, dict) and metric.get("unit") == "ratio":
            value = metric.get("value")
            if is_json_number(value) and not 0 <= float(value) <= 1:
                report.add(
                    SpatialIssue(
                        "METRIC_RATIO_RANGE",
                        "major",
                        "metrics.json",
                        f"{name} must be between 0 and 1.",
                        expected="0..1",
                        actual=float(value),
                    )
                )
    return report


def format_markdown(report: SpatialReport) -> str:
    lines = ["# Spatial Review", ""]
    lines.append(f"Result: {'PASS' if report.ok else 'FAIL'}")
    lines.append(f"Stage: {report.stage}")
    if report.metrics:
        lines.extend(["", "Metrics:"])
        for key, value in sorted(report.metrics.items()):
            lines.append(f"- `{key}`: {value}")
    if report.issues:
        lines.extend(["", "Issues:"])
        for issue in report.issues:
            target = f" `{issue.target_feature_id}`" if issue.target_feature_id else ""
            lines.append(f"- [{issue.severity}] {issue.check_id}{target}: {issue.message}")
    return "\n".join(lines)


def stage_from_manifest(submission_dir: Path) -> str:
    path = submission_dir / "manifest.json"
    if not path.exists():
        return "formal"
    try:
        data = load_json(path)
    except (UnicodeDecodeError, json.JSONDecodeError):
        return "formal"
    stage = data.get("submission_stage")
    return stage if stage == "formal" else "formal"


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("submission_dir")
    parser.add_argument("--repo-root", default=".")
    parser.add_argument("--stage", choices=["formal"])
    output = parser.add_mutually_exclusive_group()
    output.add_argument("--json", action="store_true")
    output.add_argument("--markdown", action="store_true")
    args = parser.parse_args()

    submission_dir = Path(args.submission_dir)
    repo_root = Path(args.repo_root)
    if not submission_dir.is_absolute():
        submission_dir = repo_root / submission_dir
    stage = args.stage or stage_from_manifest(submission_dir)
    report = review_submission(submission_dir, repo_root, stage)
    if args.json:
        print(json.dumps(report.to_dict(), ensure_ascii=False, indent=2))
    else:
        print(format_markdown(report))
    return 0 if report.ok else 1


if __name__ == "__main__":
    raise SystemExit(main())
