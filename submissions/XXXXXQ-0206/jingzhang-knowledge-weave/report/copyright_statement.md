# Copyright and Source Ledger

| Asset class | Author / source | Method and modification | License / evidence path | Included material boundary |
| --- | --- | --- | --- | --- |
| `proposal.md`, `report/proposal.html`, `visual/index.html` | Submission author, Codex for XXXXXQ-0206 | Original narrative and offline HTML authored for this submission; HTML is regenerated from the proposal and references local assets only. | `agent.json`; `manifest.json`; `report/narrative.md` | No remote script, API, font, image, map tile, iframe, form, tracker, enterprise logo, portrait, or trademark. |
| `assets/figures/*.png` | Submission author | Original technical diagrams rendered from submitted GeoJSON, metrics, matrices, and authored labels with Pillow. | [Pillow license](https://github.com/python-pillow/Pillow/blob/main/LICENSE); `sources.json#ASSET-PILLOW-001` | No third-party map, aerial image, photograph, icon set, or copied planning drawing. |
| `drawings/a3-booklet.pdf`, `drawings/a0-boards.pdf` | Submission author | Original page layouts composed from the five original technical diagrams at stated A3/A0 page sizes. | `report/narrative.md` render note | No externally acquired board, template, image, logo, or proprietary drawing. |
| Chinese labels in PNG/PDF | Noto Sans SC | Rasterized label text only; the font file is not bundled or redistributed. | [Noto CJK SIL OFL 1.1](https://github.com/notofonts/noto-cjk/blob/main/LICENSE); `sources.json#ASSET-NOTO-001` | Font use is limited to generated labels. |
| International case references | MIT, City of Cambridge, JTC, City of Helsinki, Ajuntament de Barcelona | Text-only mechanism comparison; no copied map, statistic, screenshot, brand, or claim of cooperation. | `sources.json#CASE-*` with URL, publisher, accessed date, and permitted use. | Each reference must be removed or replaced if its source or license becomes unavailable. |
| Project data and geometry | Open-city-ai site package and registered sources | All design layers and calculations derive from submitted provisional geometry. | `sources.json#BOUNDARY-SOURCE`, `sources.json#KEY-AREA-SOURCE`, `assumptions.json#A-BOUNDARY-001` | Not an official redline, precise official area, statutory control, land-rights record, or engineering basis. |

## AI Generation Disclosure

The declared AI agent created the narrative, conceptual diagrams, static HTML, and PDF composition from the public/cleared site package, author instructions, and disclosed rendering method. No unreviewed external generative image, stock image, map screenshot, copyrighted illustration, portrait, company mark, or private data was used. Human and professional reviewers remain responsible for future factual, rights, design, approval, and implementation review.
