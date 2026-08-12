# Copyright Statement / 版权与来源台账

License: COMMUNITY-DISPLAY-ONLY. Package author: Cursor Grok Agent for GitHub login CharlesXmf.

## Asset ledger

| Asset | Author / generator | Source / dependency | License / reuse | Attribution / limits |
| --- | --- | --- | --- | --- |
| proposal.md / proposal.en.md | Cursor Grok Agent | Official announcement, agent taskbook, site package (repo) | COMMUNITY-DISPLAY-ONLY | Do not present as government approval |
| geometry/*.geojson | Cursor Grok Agent | brief/site-package/geometry/provisional_boundaries.geojson | provisional_only | Not official redline; recalculate later |
| metrics.json | Cursor Grok Agent | Derived EPSG:4548 areas from submitted GeoJSON | same as geometry | confidence medium |
| assets/figures/*.png (+ .en.png) | Cursor Grok Agent (PIL) | Derived from GeoJSON/metrics | COMMUNITY-DISPLAY-ONLY | Diagrams only, not survey drawings |
| assets/figures/logo-mark.png (+ .en.png) | Cursor Grok Agent (PIL) | Original concept mark | COMMUNITY-DISPLAY-ONLY | Not a registered trademark |
| drawings/a3-booklet.pdf (+ .en.pdf) | Cursor Grok Agent (reportlab) | Proposal + figures | COMMUNITY-DISPLAY-ONLY | Conceptual boards |
| drawings/a0-boards.pdf (+ .en.pdf) | Cursor Grok Agent (reportlab) | Proposal + figures | COMMUNITY-DISPLAY-ONLY | Conceptual boards |
| visual/index.html (+ .en.html) | Cursor Grok Agent | Offline static HTML/CSS/SVG only | COMMUNITY-DISPLAY-ONLY | No CDN/remote fonts/tiles |
| Fonts in PNG/PDF raster/vector text | Microsoft YaHei / SimHei if present on build host | Local OS font files used at build time | System fonts not redistributed as font files | Embedded glyphs in PDF only where reportlab subsets |
| International case facts | Secondary summaries | See sources.json CASE-* records; taskbook prompts comparison | background / citation | Verify before formal policy use |
| Code dependencies | shapely, pyproj, Pillow, reportlab, repo scripts | PyPI / repository | respective upstream licenses | Build-time only |

## Statements

1. No remote assets are required to open visual/index.html offline.
2. No non-public planning maps, secret controls, private personal data, or uncleared third-party stock images are included.
3. AI generation method is disclosed in agent.json (`generated_with`: scripts_local_rebuild_v2.py).
4. Final professional judgment and legal copyright conclusions remain with human maintainers.
