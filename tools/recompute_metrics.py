#!/usr/bin/env python3
"""Canonical metric recomputation for the jingzhang-platform submission.

Single source of truth for every spatial metric in metrics.json. It:
  1. loads the submission GeoJSON layers,
  2. projects WGS84 (EPSG:4326) -> CGCS2000 / 3-degree Gauss-Kruger zone 39
     (EPSG:4548), the coordinate system used by spatial_review.py,
  3. recomputes areas, lengths, counts and ratios,
  4. writes metrics.json,
  5. synchronises `area_sqm_declared` in every polygon layer so declared
     areas equal projected recomputation (fixing DECLARED_AREA_MISMATCH),
  6. writes tools/metrics_report.json as a reproducibility record.

Usage:
  python3 tools/recompute_metrics.py [submission-dir]

Run from the submission package directory by default. Requires:
  python3 -m pip install shapely pyproj jsonschema  (see requirements-review.txt)
"""

from __future__ import annotations

import argparse
import json
import sys
from datetime import datetime, timezone
from pathlib import Path

try:
    from pyproj import Transformer
    from shapely.geometry import shape
    from shapely.ops import transform, unary_union
except ImportError as exc:  # pragma: no cover
    print(
        "recompute_metrics.py requires shapely and pyproj. Install with: "
        "python3 -m pip install -r requirements-review.txt",
        file=sys.stderr,
    )
    raise SystemExit(2) from exc

CRS_SOURCE = "EPSG:4326"
CRS_PROJECTED = "EPSG:4548"
SCRIPT_VERSION = "0.2.0"

TRANSFORMER = Transformer.from_crs(CRS_SOURCE, CRS_PROJECTED, always_xy=True)

# Layers that should carry area_sqm_declared and get it synchronised.
AREA_LAYERS = [
    "site_boundary",
    "key_areas",
    "land_use",
    "green_space",
    "public_space",
    "buildings",
    "phasing",
]


def load_geojson(path: Path) -> dict:
    return json.loads(path.read_text(encoding="utf-8"))


def project(feature: dict):
    geom = shape(feature["geometry"])
    return transform(TRANSFORMER.transform, geom)


def union_area(features: list[dict]) -> float:
    geoms = [g for f in features if not (g := project(f)).is_empty]
    if not geoms:
        return 0.0
    return float(unary_union(geoms).area)


def sum_areas(features: list[dict]) -> float:
    return float(sum(project(f).area for f in features))


def count(features: list[dict]) -> int:
    return len(features)


def total_line_length(features: list[dict]) -> float:
    return float(sum(project(f).length for f in features))


def sync_declared_area(path: Path, features: list[dict]) -> dict[str, dict]:
    """Rewrite area_sqm_declared on polygon features; return per-feature diffs."""
    changes: dict[str, dict] = {}
    changed = False
    for feature in features:
        geom = project(feature)
        if geom.geom_type not in {"Polygon", "MultiPolygon"}:
            continue
        props = feature.setdefault("properties", {})
        computed = round(float(geom.area), 1)
        declared = props.get("area_sqm_declared")
        if declared != computed:
            changes[feature.get("id", "?")] = {
                "declared_before": declared,
                "computed": computed,
            }
            props["area_sqm_declared"] = computed
            changed = True
    if changed:
        data = json.loads(path.read_text(encoding="utf-8"))
        data["features"] = features
        path.write_text(
            json.dumps(data, ensure_ascii=False, indent=1) + "\n",
            encoding="utf-8",
        )
    return changes


def build_metric(
    status: str,
    value,
    unit: str,
    source_files: list[str],
    formula: str,
    confidence: str,
    assumptions: list[str] | None = None,
    reason: str | None = None,
) -> dict:
    metric: dict = {
        "status": status,
        "value": value,
        "unit": unit,
        "source_files": source_files,
        "formula": formula,
        "confidence": confidence,
        "assumptions": assumptions or [],
    }
    if reason is not None:
        metric["reason"] = reason
    return metric


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("submission_dir", nargs="?", default=".")
    args = parser.parse_args()

    root = Path(args.submission_dir).resolve()
    geo = root / "geometry"
    metrics_path = root / "metrics.json"

    layers: dict[str, dict] = {}
    for layer_name in AREA_LAYERS + ["roads", "constraints"]:
        path = geo / f"{layer_name}.geojson"
        if path.exists():
            layers[layer_name] = load_geojson(path)

    def features(layer: str) -> list[dict]:
        return layers[layer].get("features", [])

    site_features = features("site_boundary")
    site_area = union_area(site_features)
    if site_area <= 0:
        print("ERROR: site boundary is empty or invalid.", file=sys.stderr)
        return 1

    green_features = features("green_space")
    public_features = features("public_space")
    building_features = features("buildings")
    land_features = features("land_use")
    key_features = features("key_areas")
    phasing_features = features("phasing")
    road_features = features("roads")

    green_area = union_area(green_features)
    public_area = union_area(public_features)
    building_area = sum_areas(building_features)
    road_length = total_line_length(road_features)
    phasing_area = union_area(phasing_features)

    provisional_note = (
        "Provisional boundary from the site package; recalculate when the "
        "official polygon is published."
    )

    metrics: dict[str, dict] = {
        "site_area_sqm": build_metric(
            "known",
            round(site_area, 1),
            "sqm",
            ["geometry/site_boundary.geojson"],
            "polygon_area(submitted_site_boundary) in EPSG:4548",
            "high",
            [provisional_note],
        ),
        "green_space_area_sqm": build_metric(
            "known",
            round(green_area, 1),
            "sqm",
            ["geometry/green_space.geojson"],
            "union_area(green_space_polygons) in EPSG:4548",
            "medium",
            ["Green polygons are derived from the provisional boundary partition."],
        ),
        "public_space_area_sqm": build_metric(
            "known",
            round(public_area, 1),
            "sqm",
            ["geometry/public_space.geojson"],
            "union_area(public_space_polygons) in EPSG:4548",
            "medium",
            ["Public-space polygons are derived from the provisional boundary partition."],
        ),
        "green_ratio": build_metric(
            "known",
            round(green_area / site_area, 6),
            "ratio",
            ["geometry/green_space.geojson", "geometry/site_boundary.geojson"],
            "green_space_area_sqm / site_area_sqm",
            "medium",
            [provisional_note],
        ),
        "public_space_ratio": build_metric(
            "known",
            round(public_area / site_area, 6),
            "ratio",
            ["geometry/public_space.geojson", "geometry/site_boundary.geojson"],
            "public_space_area_sqm / site_area_sqm",
            "medium",
            [provisional_note],
        ),
        "key_area_count": build_metric(
            "known",
            count(key_features),
            "count",
            ["geometry/key_areas.geojson"],
            "count(key_detailed_design_areas)",
            "high",
            [provisional_note],
        ),
        "key_area_total_area_sqm": build_metric(
            "known",
            round(sum_areas(key_features), 1),
            "sqm",
            ["geometry/key_areas.geojson"],
            "sum(polygon_area(key_areas)) in EPSG:4548",
            "medium",
            [provisional_note],
        ),
        "land_use_block_count": build_metric(
            "known",
            count(land_features),
            "count",
            ["geometry/land_use.geojson"],
            "count(land_use_features)",
            "high",
            [],
        ),
        "building_footprint_area_sqm": build_metric(
            "known",
            round(building_area, 1),
            "sqm",
            ["geometry/buildings.geojson"],
            "sum(polygon_area(building_footprints)) in EPSG:4548",
            "medium",
            ["Conceptual massing footprints for design discussion only."],
        ),
        "building_count": build_metric(
            "known",
            count(building_features),
            "count",
            ["geometry/buildings.geojson"],
            "count(building_footprints)",
            "medium",
            [],
        ),
        "road_network_length_m": build_metric(
            "known",
            round(road_length, 1),
            "m",
            ["geometry/roads.geojson"],
            "sum(line_length(road_centerlines)) in EPSG:4548",
            "medium",
            [],
        ),
        "phasing_area_sqm": build_metric(
            "known",
            round(phasing_area, 1),
            "sqm",
            ["geometry/phasing.geojson"],
            "union_area(phasing_polygons) in EPSG:4548",
            "medium",
            ["Phasing polygons partition the provisional boundary."],
        ),
    }

    # ---- synchronise declared areas in polygon layers ----
    declared_changes: dict[str, dict] = {}
    for layer_name in AREA_LAYERS:
        path = geo / f"{layer_name}.geojson"
        if layer_name not in layers:
            continue
        declared_changes[layer_name] = sync_declared_area(path, layers[layer_name]["features"])

    # ---- write metrics.json ----
    data = {
        "schema_version": "0.1.0",
        "recompute": {
            "script": "tools/recompute_metrics.py",
            "script_version": SCRIPT_VERSION,
            "crs_source": CRS_SOURCE,
            "crs_projected": CRS_PROJECTED,
            "generated_at": datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
        },
        "units": {"length": "m", "area": "sqm"},
        "metrics": metrics,
    }
    metrics_path.write_text(json.dumps(data, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")

    # ---- reproducibility record ----
    report = {
        "script": "tools/recompute_metrics.py",
        "script_version": SCRIPT_VERSION,
        "crs_source": CRS_SOURCE,
        "crs_projected": CRS_PROJECTED,
        "generated_at": data["recompute"]["generated_at"],
        "layer_areas_sqm": {
            name: {
                "feature_count": len(layers[name].get("features", [])) if name in layers else 0,
                "area_or_length": round(
                    union_area(layers[name].get("features", []))
                    if name in AREA_LAYERS
                    else total_line_length(layers[name].get("features", [])),
                    1,
                ),
            }
            for name in AREA_LAYERS + ["roads"]
            if name in layers
        },
        "ratios": {
            "green_ratio": metrics["green_ratio"]["value"],
            "public_space_ratio": metrics["public_space_ratio"]["value"],
        },
        "declared_area_sync": declared_changes,
    }
    tools_dir = root / "tools"
    tools_dir.mkdir(exist_ok=True)
    (tools_dir / "metrics_report.json").write_text(
        json.dumps(report, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
    )

    print(f"site_area_sqm        = {metrics['site_area_sqm']['value']}")
    print(f"green_space_area_sqm = {metrics['green_space_area_sqm']['value']}")
    print(f"green_ratio          = {metrics['green_ratio']['value']}")
    print(f"public_space_area_sqm= {metrics['public_space_area_sqm']['value']}")
    print(f"public_space_ratio   = {metrics['public_space_ratio']['value']}")
    print(f"key_area_total_sqm   = {metrics['key_area_total_area_sqm']['value']}")
    print(f"building_footprint   = {metrics['building_footprint_area_sqm']['value']}")
    print(f"road_network_length  = {metrics['road_network_length_m']['value']}")
    print(f"phasing_area_sqm     = {metrics['phasing_area_sqm']['value']}")
    print("declared-area sync:")
    for layer, changes in declared_changes.items():
        if changes:
            print(f"  {layer}: {len(changes)} feature(s) updated")
    print(f"wrote {metrics_path.name} and tools/metrics_report.json")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
