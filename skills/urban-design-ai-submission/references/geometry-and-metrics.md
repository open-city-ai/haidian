# Geometry And Metrics

## GeoJSON Rules

- Use `FeatureCollection`.
- Use `EPSG:4326` coordinates in `[longitude, latitude]` order.
- Polygons must be closed and non-empty.
- Each feature needs:
  - `id`
  - `layer`
  - `source_type`
  - `confidence`
  - `geometry_role`
  - `area_sqm_declared` for polygon features when area is relevant

The validator may reject self-intersections, unclosed rings, invalid coordinates, geometry outside the site boundary, overlapping land-use polygons, gaps in land-use coverage, and buildings outside designable parcels.

Formal submissions also require `geometry/key_areas.geojson` with three `KEY_AREA` polygons. Use trusted official polygons when available; if they are missing, use the repository's provisional rough polygons and label them as `geometry_role="provisional_constraint"` and `official_boundary=false`:

- `zhongzhiyuan_ai_acceleration_area`
- `beijing_ai_origin_community`
- `dazhongsi_ai_industry_cluster`

These features must be inside `site_boundary.geojson` and non-overlapping. Official features are area-checked against official values. Provisional features must be called out in `proposal.md`, `visual/index.html`, `sources.json`, `assumptions.json`, and `self_check.json` as unsuitable for official redline or precise-area claims. The organizer data gap itself does not block content scoring.

## FeatureCollection Template

Use this as a starting point for any geometry layer. Replace `<feature-id-prefix>` with a stable
identifier prefix (often the file stem, such as `land_use` or `buildings`). Replace
`<LAYER_CODE>` with the canonical code for that feature type from
`brief/site-package/enums/layers.json`, such as `LAND_USE` or `BUILDING_FOOTPRINT`:

```json
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "id": "<feature-id-prefix>-001",
      "properties": {
        "id": "<feature-id-prefix>-001",
        "layer": "<LAYER_CODE>",
        "source_type": "agent_inferred_from_public_data",
        "confidence": "medium",
        "geometry_role": "design_proposal",
        "area_sqm_declared": 0,
        "label_zh": "",
        "label_en": ""
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [116.300, 40.050],
            [116.310, 40.050],
            [116.310, 40.060],
            [116.300, 40.060],
            [116.300, 40.050]
          ]
        ]
      }
    }
  ]
}
```

Key points:
- The first and last coordinate pair of every ring **must be identical** (closed ring).
- Longitude comes first (`[lon, lat]`), not latitude-first.
- `EPSG:4326` longitude range: `[-180, 180]`; latitude range: `[-90, 90]`.
  Haidian area: approximately `[116.27–116.38, 39.95–40.07]`.
- Projected coordinates (e.g. values like `439000, 4427000`) indicate a wrong CRS.

## Topology-Safe Generation

Treat `geometry/land_use.geojson` as a complete zoning partition of the submitted boundary:

- Start from `site_boundary.geojson`.
- Split or overlay the boundary to create land-use polygons.
- Use the same cut lines and coordinates on both sides of every shared edge.
- The union of all land-use polygons must equal the submitted boundary.
- Land-use polygons must not overlap each other.

Avoid these failure patterns:

- independent hand-drawn rectangles for adjacent land-use areas
- partial concept bands that leave unlabeled gaps
- a `site_boundary.geojson` outline that does not include vertices used by the land-use partition
- metrics copied from narrative text instead of recomputed from geometry

For a safe starter package, run `scripts/scaffold_ai_submission.py --stage formal`. It prefers trusted official geometry and falls back to `brief/site-package/geometry/provisional_boundaries.geojson` when official polygons are absent. The result is intentionally `package_state=scaffold`; replace its design content and placeholder drawings, run `scripts/finalize_submission.py`, then run `scripts/self_check_submission.py --mark-self-checked --json` before opening a PR.

## Common Topology Errors and Fixes

| Error | Cause | Fix |
|---|---|---|
| Self-intersection | Ring crosses itself (bowtie shape) | Split into two valid polygons or reshape the crossing segment |
| Unclosed ring | First ≠ last coordinate | Append a copy of the first coordinate as the last |
| Gap between parcels | Shared edge coordinates differ by rounding | Snap adjacent vertices to identical coordinates |
| Overlap between parcels | Two polygons share interior area | Clip one polygon to the boundary of the other |
| Building outside parcel | Building footprint extends beyond a designable parcel | Clip to parcel boundary or move inside |

## Metric Rules

Metrics must be reproducible from geometry or explicitly marked unknown. Required metric families:

- site area
- land-use area by code
- total floor area
- floor area ratio
- building density
- green-space area and ratio
- public-space area and ratio
- road area and ratio
- phasing area
- key detailed-design area count and areas

Each metric object should include:

```json
{
  "status": "known",
  "value": 0,
  "unit": "sqm",
  "source_files": ["geometry/site_boundary.geojson"],
  "formula": "polygon_area(site_boundary)",
  "confidence": "high",
  "assumptions": []
}
```

Use `brief/site-package/ranges/planning_limits.json` for known official area facts and missing official control indicators.

Any metric displayed in `visual/index.html` must match `metrics.json`. Use `data-metric="<metric_name>"` and `data-value="<numeric_value>"` markers for core displayed metrics so `scripts/visual_review.py` can compare them.

## Metric Formula Reference

| Metric | Formula | Unit |
|---|---|---|
| Site area | `polygon_area(site_boundary)` | sqm |
| Land-use area (by code) | `sum(polygon_area(f) for f in land_use if f.land_use_code == code)` | sqm |
| Floor area ratio (FAR) | `total_floor_area / site_area` | dimensionless |
| Building density | `sum(footprint_area(b) for b in buildings) / site_area` | dimensionless (0–1) |
| Green-space ratio | `green_space_area / site_area` | dimensionless (0–1) |
| Public-space ratio | `public_space_area / site_area` | dimensionless (0–1) |
| Road area ratio | `road_area / site_area` | dimensionless (0–1) |

When official boundary polygons are unavailable, put `geometry_role="provisional_constraint"`
and `boundary_precision="provisional_rough"` on the relevant GeoJSON boundary feature. Metrics
derived from that feature must retain a valid `status` (`known`, `unknown`, or `not_applicable`),
use low or otherwise appropriate `confidence`, and include a plain-string assumption such as
`"Calculated from repository provisional rough boundary geometry; not suitable for official area claims."`
Recalculate all precision-sensitive metrics once official polygons arrive.
