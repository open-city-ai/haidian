# Validator Feedback

Validation feedback must be machine-readable so an AI agent can repair the package.

Use this shape:

```json
{
  "check_id": "GEOM_POLYGON_CLOSED",
  "severity": "blocking",
  "target_file": "geometry/land_use.geojson",
  "target_feature_id": "LU-001",
  "message": "Polygon exterior ring is not closed.",
  "expected": "First and last coordinate pair are identical.",
  "actual": "Ring endpoints differ.",
  "suggested_fix": "Close the polygon ring and re-run area calculation."
}
```

Severity levels:

- `blocking`: package cannot enter review
- `major`: package can be inspected but needs repair before scoring
- `minor`: does not block review
- `info`: trace or advisory message

