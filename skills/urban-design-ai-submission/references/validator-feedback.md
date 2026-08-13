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

## Proposed Check ID Taxonomy

The tables below define a target taxonomy for future machine-readable validation feedback.
They are not emitted by `scripts/validate_submission.py`, whose `ValidationReport` currently
contains plain error and warning strings. Do not build repair routing against these IDs yet.
The structured review scripts (`professional_review.py`, `spatial_review.py`, and
`visual_review.py`) emit their own established `check_id` values; consume those values directly
from each review report.

### Geometry Checks

| Check ID | Severity | Description |
|---|---|---|
| `GEOM_POLYGON_CLOSED` | blocking | Exterior ring first and last coordinate do not match |
| `GEOM_SELF_INTERSECTION` | blocking | Polygon ring crosses itself |
| `GEOM_INVALID_COORDINATE` | blocking | Coordinate outside `[-180,180]` / `[-90,90]` range |
| `GEOM_OUTSIDE_SITE_BOUNDARY` | blocking | Feature geometry extends beyond `site_boundary.geojson` |
| `GEOM_LAND_USE_OVERLAP` | blocking | Two land-use polygons share interior area |
| `GEOM_LAND_USE_GAP` | major | Union of land-use polygons does not cover submitted boundary |
| `GEOM_BUILDING_OUTSIDE_PARCEL` | major | Building footprint lies outside designable parcel |
| `GEOM_EMPTY_FEATURE` | blocking | Feature has null or empty geometry |
| `GEOM_WRONG_CRS` | blocking | Coordinates appear to use a projected CRS instead of `EPSG:4326` |
| `GEOM_MISSING_REQUIRED_FILE` | blocking | Required GeoJSON layer absent from package |
| `GEOM_MISSING_FEATURE_ID` | blocking | Feature lacks a non-empty `id` property |
| `GEOM_MISSING_LAYER` | blocking | Feature lacks a `layer` property |
| `GEOM_MISSING_CONFIDENCE` | major | Feature lacks a `confidence` property |
| `GEOM_PROVISIONAL_NOT_DECLARED` | blocking | Geometry uses provisional boundary without `geometry_role="provisional_constraint"` |

### Manifest and Metadata Checks

| Check ID | Severity | Description |
|---|---|---|
| `MANIFEST_MISSING` | blocking | `manifest.json` absent from package root |
| `MANIFEST_PLACEHOLDER` | blocking | `agent_id`, `model`, or `proposal_slug` still holds a scaffold placeholder |
| `MANIFEST_HASH_MISMATCH` | blocking | A listed file's SHA-256 does not match its actual content |
| `MANIFEST_UNLISTED_FILE` | blocking | A file exists in the package but is not declared in the manifest |
| `MANIFEST_MISSING_FILE` | blocking | A file declared in the manifest does not exist on disk |
| `MANIFEST_BAD_PACKAGE_STATE` | blocking | `package_state` is still `scaffold`; must be `ready_for_review` |
| `MANIFEST_BAD_PACKAGE_TYPE` | blocking | `package_type` is not `professional_design_package` |
| `MANIFEST_MISSING_TIMESTAMP` | major | `submission_timestamp` field absent or empty |
| `MANIFEST_MISSING_VALIDATION_STATUS` | major | `validation_status` field absent or empty |
| `MANIFEST_UNKNOWN_ROLE` | minor | A file entry uses an unrecognized `role` value |
| `MANIFEST_MODEL_PLACEHOLDER` | blocking | `model` field holds a known placeholder string |

### Proposal Structure Checks

| Check ID | Severity | Description |
|---|---|---|
| `PROPOSAL_MISSING` | blocking | `proposal.md` absent |
| `PROPOSAL_TOO_SHORT` | blocking | Compact character count below `MIN_FORMAL_PROPOSAL_COMPACT_CHARS` (5000) |
| `PROPOSAL_SECTION_MISSING_ZH` | blocking | A required Chinese section heading is absent |
| `PROPOSAL_SECTION_MISSING_EN` | blocking | A required English section heading is absent (English-primary proposals) |
| `PROPOSAL_SECTION_TOO_SHORT` | blocking | A required section is below `MIN_REQUIRED_SECTION_COMPACT_CHARS` (280 chars) |
| `PROPOSAL_SCAFFOLD_MARKER` | blocking | `SCAFFOLD-DRAFT` marker still present |
| `PROPOSAL_EVIDENCE_DUMP` | major | More than `MAX_INLINE_REFERENCES_PER_BLOCK` (8) consecutive evidence markers |
| `PROPOSAL_MISSING_FIGURE` | blocking | A required figure (`site-overview.png` etc.) is not embedded in the proposal |
| `PROPOSAL_REMOTE_FIGURE` | blocking | An embedded figure uses an external URL instead of a local path |
| `PROPOSAL_PLACEHOLDER_TEXT` | blocking | Known placeholder text still present in proposal body |
| `PROPOSAL_PII_RISK` | blocking | Hard-risk pattern detected (ID card, phone number, false official approval) |
| `PROPOSAL_SENSITIVE_PATTERN` | major | Soft-risk pattern detected (classified material claim, unenforceable promise) |

### Bilingual Contract Checks

| Check ID | Severity | Description |
|---|---|---|
| `BILINGUAL_TRANSLATION_FILE_MISSING` | blocking | `proposal.en.md` or `proposal.zh.md` absent when `bilingual_contract_version: "1"` declared |
| `BILINGUAL_TRANSLATION_OF_MISSING` | blocking | Translation file lacks `translation_of` front-matter pointing to main file |
| `BILINGUAL_LANGUAGE_MISMATCH` | blocking | Main and translation declare the same language |
| `BILINGUAL_HTML_COUNTERPART_MISSING` | blocking | `report/proposal.zh.html` or `.en.html` absent |
| `BILINGUAL_PDF_COUNTERPART_MISSING` | blocking | Bilingual drawing counterpart (`.zh.pdf` / `.en.pdf`) absent |
| `BILINGUAL_STALE_MANIFEST_HASH` | blocking | Manifest hash for a bilingual file does not match current content |

### Changelog Checks

| Check ID | Severity | Description |
|---|---|---|
| `CHANGELOG_MISSING_TITLE` | blocking | `changelog.md` present but does not begin with `# 方案迭代记录` |
| `CHANGELOG_MISSING_VERSION` | blocking | `changelog.md` has no `## vX.Y - YYYY-MM-DD` heading |
| `CHANGELOG_BAD_VERSION_FORMAT` | major | A version heading does not match the expected pattern |

## Repair Workflow

When validation returns errors, repair in this order:

1. **blocking geometry errors first** — a bad polygon prevents area recalculation, which cascades
   into `metrics.json` and scoring. Fix topology, re-run `scripts/validate_local_submission.py`.
2. **manifest hash mismatches** — regenerate hashes after every file change with
   `scripts/finalize_submission.py`.
3. **bilingual contract errors** — ensure both language files exist, front-matter is correct, and
   `manifest.json` hashes are refreshed.
4. **proposal structure errors** — expand short sections, remove scaffold markers, fix figure paths.
5. **major and minor warnings** — address before final submission; they do not block entry but
   affect scoring.

After repairing, always re-run the full four-gate validation:

```bash
python3 scripts/self_check_submission.py submissions/<login>/<slug> --mark-self-checked --json
```

## Handling Multiple Errors

The structured review scripts return issues with `target_file` or `path`; group those issues by
file before routing repairs. For the plain strings returned by `validate_submission.py`, use the
path prefix in each message until it gains a structured output contract. Repair `manifest.json`
last because every upstream file change invalidates manifest hashes.
