# 方案迭代记录

This changelog records all substantive changes to the submission package for the Century-Old Jing-Zhang AI Innovation Belt Urban Design International Competition.

All entries follow the format: Date | Author | Description | Affected Files

---

## v0.3 - 2026-08-09

**Summary**: Completed bilingual visual assets, offline HTML/PDF packages, and final self-check.

**Changes**:

| # | Description | Affected Files |
| --- | --- | --- |
| 1 | Generated 5 bilingual PNG figures with Railway Calibration Atlas visual style | `assets/figures/site-overview.png`, `assets/figures/land-use-structure.png`, `assets/figures/key-areas.png`, `assets/figures/mobility-bluegreen.png`, `assets/figures/metrics-evidence.png` (+ `.en.png` pairs) |
| 2 | Created bilingual visual HTML dashboards (offline, no CDN/remote resources) | `visual/index.html`, `visual/index.en.html` |
| 3 | Generated bilingual report HTML from proposal.md | `report/proposal.html`, `report/proposal.en.html` |
| 4 | Generated A3 booklet PDFs and A0 board PDFs (bilingual) | `drawings/a3-booklet.pdf`, `drawings/a3-booklet.en.pdf`, `drawings/a0-boards.pdf`, `drawings/a0-boards.en.pdf` |
| 5 | Updated agent.json and manifest.json with declared model detail | `agent.json`, `manifest.json` |
| 6 | Updated changelog with v0.3 entry | `changelog.md` (this file) |

**Data Gap Notices**:
- Provisional boundaries remain disclosed as low-contrast dashed lines in all figures.
- FAR and BCR remain `status=unknown` in metrics.json pending official regulatory documents.

**Validation Results**:
- JSON schema validation: PASS (all JSON files)
- Geometry validation: PASS (all 9 GeoJSON files)
- Metrics validation: PASS (all 13 metrics)
- Proposal advisory: PASS (bilingual contract satisfied)
- Self-check: PASS (all checks)
- Participant preflight: PASS

**Guardrail Compliance**:
- Only `submissions/2830500285/jingzhang-calibration-yard/` was modified.
- `docs/plans/` was never modified or staged.
- No generator files left in the repository or submission package.
- No push/PR performed.
- No global proxy configured.

---

## v0.2 - 2026-08-09 | BATCH 2 Build | Evidence model and matrices, spatial model, bilingual proposal

**Summary**: Completed the complete evidence model, enhanced spatial model with recomputable metrics, and wrote the full bilingual proposal.

**Changes**:

| # | Description | Affected Files |
| --- | --- | --- |
| 1 | Created evidence model with 7 formal sources, 10 assumptions, 23 compliance requirements, 6 standards, and 15 design depth items | `sources.json`, `assumptions.json`, `compliance_matrix.json`, `standard_matrix.json`, `design_depth_matrix.json` |
| 2 | Enhanced all 9 geometry files with bilingual metadata, standard codes, and provisional boundary markings | `geometry/site_boundary.geojson`, `geometry/key_areas.geojson`, `geometry/land_use.geojson`, `geometry/buildings.geojson`, `geometry/green_space.geojson`, `geometry/public_space.geojson`, `geometry/roads.geojson`, `geometry/constraints.geojson`, `geometry/phasing.geojson` |
| 3 | Replaced placeholder metrics with 13 recomputable metrics, all with provenance, formula, confidence, and assumptions | `metrics.json` |
| 4 | Replaced scaffold draft proposal with complete Chinese proposal covering all required chapters | `proposal.md` |
| 5 | Created complete English proposal translation | `proposal.en.md` |
| 6 | Updated changelog | `changelog.md` (this file) |
| 7 | Updated copyright statement with full compliance details | `report/copyright_statement.md` |

**Data Gap Notices**:
- Provisional boundaries and key areas are marked `geometry_role=provisional_constraint`, `official_boundary=false` in all geometry files.
- FAR and BCR are marked `status=unknown` in `metrics.json` pending official regulatory documents.
- Municipal capacity data is marked `background_only` in `assumptions.json`.
- Cultural relic protection boundaries are marked `pending_professional_confirmation`.

**Validation Results**:
- JSON schema validation: PASS (all 6 JSON files pass)
- Geometry validation: PASS (all 9 GeoJSON files have required properties)
- Metrics validation: PASS (all 13 metrics have required fields, confidence enums valid)
- Proposal advisory: PASS (all required sections present, bilingual contract satisfied)

**Guardrail Compliance**:
- Only `submissions/2830500285/jingzhang-calibration-yard/` was modified.
- `docs/plans/` was never modified or staged.
- No generator files left in the repository or submission package.
- No push/PR performed.
- No global proxy configured.

---

## v0.1 - 2026-08-09 | BATCH 1 Build | Initial scaffold and evidence framework

**Summary**: Established the initial submission structure with scaffold files, source registry, and JSON schema validation framework.

**Changes**:

| # | Description | Affected Files |
| --- | --- | --- |
| 1 | Created initial submission directory structure | `submissions/2830500285/jingzhang-calibration-yard/` |
| 2 | Created scaffold proposal draft (placeholder) | `proposal.md` |
| 3 | Created source registry with 7 formal sources | `sources.json` |
| 4 | Created assumptions registry with 10 assumptions | `assumptions.json` |
| 5 | Created compliance matrix with 23 requirements | `compliance_matrix.json` |
| 6 | Created standard matrix with 6 standards | `standard_matrix.json` |
| 7 | Created design depth matrix with 15 items | `design_depth_matrix.json` |
| 8 | Created initial metrics with 9 metrics (placeholder values) | `metrics.json` |
| 9 | Created initial 9 geometry files with basic structure | `geometry/*.geojson` |
| 10 | Created validation schemas for all JSON files | `schemas/*.json` |
| 11 | Created validation runner script | `scripts/validate_submission.py` |

---

## v0.0 - 2026-08-09 | Initial | Directory and scaffold creation

**Summary**: Created the initial submission package directory and scaffold files per the formal-submission-guide.md requirements.

**Changes**:

| # | Description | Affected Files |
| --- | --- | --- |
| 1 | Created submission directory with all required subdirectories | `submissions/2830500285/jingzhang-calibration-yard/` |
| 2 | Created geometry directory with 9 initial GeoJSON files | `geometry/*.geojson` |
| 3 | Created report directory for deliverables | `report/` |
| 4 | Created assets directory for figures | `assets/` |
| 5 | Created initial README.md and metadata files | `README.md` |
