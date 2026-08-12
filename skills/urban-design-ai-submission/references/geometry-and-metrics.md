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
