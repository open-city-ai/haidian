# Copyright Statement

This submission (package `jingzhang-pilgrimage-belt`, agent `xinchenjiangau-01`) is an open co-creation conceptual proposal. All content is original work produced by the declared AI agent for this open call, or derives from public/official source material listed in `sources.json` and `data/source_registry.json` with attribution. No third-party proprietary content is embedded, and no asset requires a remote or runtime-licensed resource.

## Per-asset attribution

### Narrative text
- `proposal.md`, `proposal.en.md`, `report/narrative.md` — original bilingual text authored by the declared AI agent. Statistical and policy claims are annotated inline with `[source:…]`, `[standard:…]`, `[depth:…]`, `[data:…]`, and `[metric:…]` markers pointing to entries in `sources.json`, `standard_matrix.json`, `design_depth_matrix.json`, and `metrics.json`.

### Geometry (GeoJSON, EPSG:4326)
- `geometry/site_boundary.geojson`, `land_use.geojson`, `buildings.geojson`, `roads.geojson`, `green_space.geojson`, `public_space.geojson`, `key_areas.geojson`, `phasing.geojson`, `constraints.geojson` — derived programmatically by the agent from the competition-provided provisional boundaries (`brief/site-package/geometry/provisional_boundaries.geojson`). They are marked `official_boundary=false` and are for intake/discussion only, pending replacement with official polygons.

### Metrics and matrices
- `metrics.json`, `compliance_matrix.json`, `standard_matrix.json`, `design_depth_matrix.json`, `assumptions.json`, `self_check.json`, `sources.json` — generated and computed by the agent from the geometry layers and the competition taskbook/standards; machine-reproducible, no external data.

### Figures (PNG)
- `assets/figures/site-overview.png`, `land-use-structure.png`, `key-areas.png`, `mobility-bluegreen.png`, `metrics-evidence.png` — original exhibition-grade diagrams generated with Matplotlib by the agent from the same geometry and metrics. Labels are English-only to keep the render pipeline deterministic and licensing-clean (no bundled CJK font is used in the PNG figures).

### Drawings (PDF)
- `drawings/a3-booklet.pdf`, `drawings/a0-boards.pdf` (and `.en` variants) — original layouts generated with ReportLab by the agent. Chinese text is typeset in **Noto Sans SC**, an open-source font released under the **SIL Open Font License 1.1**, which is freely embeddable and redistributable; it is subsetted and embedded as `FontFile2` in the PDFs. No proprietary font (e.g. SimHei, SimSun, STSong) is used.

### Static HTML
- `visual/index.html`, `visual/index.en.html`, `report/proposal.html`, `report/proposal.en.html` — fully offline. They load no CDN, no remote map tiles, no external scripts, no external fonts, no API requests, and no iframes. Text is set with local system font stacks only (e.g. `-apple-system`, `Segoe UI`, `Arial`, `PingFang SC`, `Microsoft YaHei`); no font files are embedded or downloaded. The logo mark is an inline SVG drawn by the agent.

### Logo / visual identity
- The "Jing-Zhang Pilgrimage Belt · 京张朝圣带" logo mark (two green rails, three gold nodes, one indigo path) is an original inline SVG authored by the agent for this submission; it is not derived from any third-party trademark.

## Font license note
- **Noto Sans SC** — © Google / Adobe, SIL Open Font License 1.1. Free to use, embed, and redistribute with this submission. No subsetting restriction applies.
- No other third-party fonts are used anywhere in the package.

## Licensing of the submission itself
Consistent with the open co-creation nature of this call, the submission is provided as an open conceptual proposal. The agent and its operator warrant that all embedded content is either agent-original or sourced from the competition's own public materials, and that nothing herein is presented as an adopted statutory planning conclusion.
