# Asset Rights and Copyright Statement

## Scope and responsibility

Author and submitting agent: Qian hairui / `qian-123456`. This ledger covers every file in this submission package. The package is a conceptual design submission only. It contains no commissioned photography, aerial imagery, map tiles, third-party logos, portraits, proprietary datasets, or remote web assets. The submitter is responsible for correcting or removing any item if contrary evidence is found before publication.

## Asset ledger

| Files | Author / method | Source and clearance | Reuse restriction |
| --- | --- | --- | --- |
| `proposal.md`, `report/narrative.md`, `report/proposal.html`, `visual/index.html` | Original Chinese design narrative and offline HTML assembled by the declared AI agent under author direction. | Factual inputs are limited to the public/cleared entries in `sources.json`; no external scripts, fonts, APIs, map tiles, tracking, iframe, or web fonts are loaded. | `COMMUNITY-DISPLAY-ONLY`; do not represent as official planning approval. |
| `geometry/*.geojson`, `metrics.json`, `assumptions.json`, matrices and `self_check.json` | Agent-generated conceptual geometry and EPSG:4548 calculations using the recorded local build method. | Boundary input is `brief/site-package/geometry/provisional_boundaries.geojson`, registered in `sources.json` as provisional. | Provisional / discussion use only; not an official redline, statutory control, precise-area basis, engineering survey, or property record. |
| `assets/figures/*.png` | Original vector-style diagrams rendered locally from the submission GeoJSON and metrics with Matplotlib. No photographic or downloaded image layer is used. | Derived only from the package geometry, metrics and public task inputs identified in `sources.json`. | Same display-only license; do not crop out the provisional-boundary or data-source note. |
| `drawings/a3-booklet.pdf`, `drawings/a0-boards.pdf` | Original PDF layouts rendered locally from the listed figures by Matplotlib. | No imported drawing, CAD, map, photograph, font file, or commercial template. | Same display-only license; print output remains conceptual and provisional. |
| OPENRAIL mark, color palette, node codes, wayfinding text and `1909 - 2026 - infinity` motif | Original conceptual graphic and wording created for this submission. | No third-party mark, typeface, logo, mascot, photo, or trademark is incorporated. System fonts only: browser `-apple-system`, `BlinkMacSystemFont`, `PingFang SC`, `Microsoft YaHei`, Arial; Matplotlib default fonts at render time. | Do not imply sponsorship, registration, exclusive trademark rights, or organizer endorsement. |

## Software and third-party notices

The local build used Python 3.13 with Matplotlib, Shapely and PyProj to generate original output. These are build-time dependencies only; their code, fonts and brand assets are not redistributed in the package. No code dependency or third-party asset is loaded by `visual/index.html`. The source registry may mention public standards and organizer materials for citation; that citation does not transfer copyright or authorize republication beyond the stated conceptual use.

## Verification and removal rule

Before reuse outside this submission, verify the current source, license, attribution and applicable organizer terms for the specific asset. Remove or replace any asset whose authorship, source or reuse right cannot be demonstrated. The pending status of `MOHURD-ARCH-DESIGN-DEPTH-2016` is expressly recorded in `sources.json` and `standard_matrix.json`; it is a design-depth reference pending professional source verification, not a claimed cleared formal source.
