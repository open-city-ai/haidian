# Copyright Statement / 版权声明

## 1. Overall authorship

All text, GeoJSON geometry, diagrams, HTML markup, CSS, inline SVG, JSON data files (metrics, matrices, manifest, self-check, agent/compliance/design-depth/standard matrices), and PDF composition in `submissions/yuaiccc/human-centered-ai-belt/` were authored by the submitter (Junshan Xu / `@yuaiccc`) and the declared AI agent pipeline. No proprietary third-party text, maps, drawings, photographs, or proprietary datasets are embedded in the deliverable.

The package is released under the `COMMUNITY-DISPLAY-ONLY` license declared in `manifest.json`, which grants the organizer display and review rights for the duration of the open call. All other rights remain with the author.

## 2. Asset-by-asset provenance

| Asset class | Paths | Author / source | License | Notes |
|---|---|---|---|---|
| Proposal text | `proposal.md`, `proposal.en.md`, `report/proposal.html`, `report/proposal.en.html`, `report/narrative.md` | Author + declared AI agent | COMMUNITY-DISPLAY-ONLY | English text is a human/AI translation of the Chinese source, not machine-copied from any third party. |
| Geometry | `geometry/*.geojson` | Author, derived from public brief and `brief/site-package/geometry/provisional_boundaries.geojson` | COMMUNITY-DISPLAY-ONLY | Boundaries flagged `provisional_constraint`/`provisional_only`; must be recalculated from official polygons. |
| Structured data | `metrics.json`, `assumptions.json`, `agent.json`, `compliance_matrix.json`, `standard_matrix.json`, `design_depth_matrix.json`, `manifest.json`, `self_check.json` | Author | COMMUNITY-DISPLAY-ONLY | Metrics are computed from the submitted geometry; see `metrics.json` for confidence and source files. |
| Concept figures | `assets/figures/*.png` | Author, generated with Python Pillow + macOS STHeiti system font | COMMUNITY-DISPLAY-ONLY | Both `zh` and `.en` variants are distinct rasterizations with translated labels; the `.en` files are not byte-duplicates of the zh files. |
| HTML viewer | `visual/index.html`, `visual/index.en.html` | Author | COMMUNITY-DISPLAY-ONLY | No remote scripts, no remote fonts, no iframes, no tracking, no map tiles. All SVG and CSS inline. |
| PDF boards | `drawings/a3-booklet.pdf`, `drawings/a3-booklet.en.pdf`, `drawings/a0-boards.pdf`, `drawings/a0-boards.en.pdf` | Author, rendered with headless Google Chrome from self-authored HTML | COMMUNITY-DISPLAY-ONLY | Fonts are referenced by family name only; no font file is embedded from a third-party distribution. See §3. |

## 3. Fonts

No third-party font file is bundled or redistributed inside this package. The HTML, SVG and CSS reference fonts by family name only, relying on fonts already installed on the viewer's machine:

- CJK body text: `"PingFang SC", "Noto Sans CJK SC", "Microsoft YaHei", "Heiti SC", "STHeiti", "WenQuanYi Zen Hei", sans-serif`
- Latin / monospace: system default sans-serif / `ui-monospace, SFMono-Regular, Menlo, monospace`

The concept PNGs in `assets/figures/` were rasterized with macOS **STHeiti Light/Medium**, which is a pre-installed Apple system font used for local rendering only; no STHeiti font data is shipped in the submission.

Organizers and reviewers who open the HTML on a machine without any CJK font installed may see fallback glyphs, but this is a viewer-environment issue rather than a licensing issue.

## 4. Icons, logos and brand elements

- The "烨脉 / Ye Pulse" wordmark and the forked-cursor node motif described in the proposal are **concept proposals by the author**, not an adopted or approved brand. They are not derived from any third-party logo, and the proposal explicitly states that they are not a government-approved brand, statutory plan name, or implementation commitment.
- No third-party icon set (Font Awesome, Material Icons, Noun Project, etc.) is used. All diagram shapes (rectangles, circles, lines) are drawn with raw CSS/SVG.
- The favicon / apple-touch-icon assets referenced by the top-level site (if any) belong to the repository shell, not to this submission package.

## 5. Maps, aerial imagery and basemaps

The package contains **no** external map tiles, no aerial/satellite imagery, no proprietary basemap, and no tracing of a third-party map. All spatial data is authored as GeoJSON and shown either as inline SVG or as rasterized schematic diagrams. The only geographic input is the `provisional_boundaries.geojson` shipped with the public site package (`BOUNDARY-SOURCE` / `KEY-AREA-SOURCE` in `sources.json`), which is itself provisional and must be replaced by official geometry.

## 6. Data, standards and references

- Brief, scope, task book and announcement: see `OFFICIAL-ANNOUNCEMENT`, `AGENT-TASKBOOK`, `SITE-PACKAGE`, `SOURCE-REGISTRY`, `PROCESSED-FACT-PACK` in `sources.json`.
- Professional standards referenced in `standard_matrix.json` (MOHURD control-detailed planning, MOHURD urban-design measures, MNR land-use classification) are cited by name/number only; no copyrighted standard text is reproduced.
- No code snippets, trained-model weights, or proprietary datasets are embedded.

## 7. AI-generated content disclosure

The text, geometry suggestions, diagram layouts and tabular content were produced with AI-agent assistance under the author's direction and verification. The author reviewed all quantitative claims, all confidence labels, and all boundary statements. The AI pipeline did not ingest any copyrighted third-party work product for this submission beyond the publicly cleared materials listed in `sources.json`.

## 8. Third-party rights not obtained

If the organizer or a future implementation stage wishes to use the "烨脉 / Ye Pulse" mark, the concept diagrams, or any of the proposed project names (JZ-01 … JZ-06) outside the review context, naming, trademark and any relevant public-space review must be cleared separately. Nothing in this package grants a license to any third-party trademark or service mark referenced in the text (e.g. names of operating companies, research institutions or existing products); those references are descriptive and nominative only.
