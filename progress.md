# Progress

## 2026-08-07

- Branch: `main`
- Changes: Generated the complete `submissions/lumixraku/rail-life-rings/` professional design package, including proposal narrative, structured geometry and metrics, evidence matrices, five figures, offline HTML, and A3/A0 PDF drawings. Corrected geometry schema values, evidence references, visual markers, and land-use topology.
- Verification: `.venv/bin/python scripts/self_check_submission.py submissions/lumixraku/rail-life-rings --pr-author lumixraku` returned `PASS`; deterministic, spatial, visual packaging, and professional evidence reviews all passed.
- Remaining issues: Official site and key-area boundaries are not present in the repository. The package explicitly labels the three key-area geometries as provisional; spatial review reports only the expected non-blocking `KEY_AREA_PROVISIONAL` notices.

## 2026-08-08 图纸重制：真 A0/A3 矢量与逐站设计

- Branch: `main`
- Changes: Rebuilt both PDF drawings from scratch. The previous files were raster-only (15 objects, no embedded fonts, JPEG-only) and both measured A2 despite being labelled A0 and A3; 4 of their 9 embedded images were byte-identical across the two documents, and the 5/10/15-minute ring labels shared one baseline, which produced the reported text overlap. The new `a0-boards.pdf` (4 plates, true 841x1189mm) and `a3-booklet.pdf` (11 pages, true 297x420mm) are pure vector with embedded CJK fonts and a selectable, searchable text layer, and share no duplicated content: A0 carries corridor structure, severance diagnosis, per-station design and key-area detail; A3 is a reading document with one page per station.
- Station specificity: the package previously named no real station, because `assumptions.json` A-TOD-001 placed the three TOD cores at the geometric centroids of the key-area polygons. Every station inside the announced boundary is now identified by point-in-polygon test against `brief/site-package/geometry/provisional_boundaries.geojson`: 7 stations fall inside the 11.4km² overall design area (学知园、六道口、学院桥、西土城、蓟门桥、北京北、西直门) and receive per-station design depth (role, severance problem, 5-minute core programme, 10-minute ring programme, near-term moves, survey prerequisites); 14 stations fall inside the 43.6km² coordinated research area and receive corridor and interchange roles only. Scope follows the announced boundary per owner decision of 2026-08-08, so 上地、清河、西二旗 (2.5km, 3.3km and 4.6km beyond the nearest key area, all north of the 北五环) are excluded from per-station drawings and the exclusion is stated on plate L-03.
- Method: walk-time rings are no longer concentric circles around polygon centroids. Radius is `minutes x 75 m/min / 1.35 detour factor` from real station coordinates (278m, 556m, 833m), and motorway/trunk severance lines are overlaid so nominally-reachable-but-actually-detoured areas are legible. The base map uses 2343 classified OSM road ways, 244 rail ways, and green and water layers, replacing the previous 4 schematic lines.
- Verification: `.venv/bin/python scripts/self_check_submission.py submissions/lumixraku/rail-life-rings --pr-author lumixraku` returned `PASS`, and `validate_local_submission.py` returned `PASS`, with only the pre-existing provisional-boundary warnings. A span-level layout audit over all 15 pages reports 0 text runs outside the printable margin and 0 overlapping text boxes. `manifest.json` sha256 entries for both drawings were recalculated.
- Remaining issues: `PROV-KEY-003` is labelled 大钟寺 but its polygon lies at lat 39.944-39.950 while 大钟寺 station is at 39.965, a discrepancy of roughly 1.7km; the deviation is drawn and dimensioned on plate L-04 and A3 page 11 but the repository geometry was left unmodified pending official key-area boundaries. A `geometry/stations.geojson` layer could not be added because `ALLOWED_GEOMETRY_FILES` in `scripts/validate_submission.py` is a closed nine-file allowlist. Station coordinates remain provisional OSM data and require surveyed station entrances. Official redlines, regulatory controls, road redlines, ownership, municipal and heritage constraints remain unpublished.

## 2026-08-07 README 展示调整

- Branch: `main`
- Changes: Replaced the inherited repository homepage README with the `lumixraku` Rail Life Rings proposal, including the concept, spatial structure, focus nodes, AI scenarios, phasing, risks, generated figures, PDF links, and formal self-check status.
- Verification: Confirmed all README image and artifact paths resolve within the committed submission package; the previously passing full submission self-check remains the package verification baseline.
- Remaining issues: Official site and key-area boundaries remain provisional as documented above.
