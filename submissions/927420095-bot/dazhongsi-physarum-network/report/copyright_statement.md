# Copyright & Provenance Statement / 版权与来源声明

This package is the author's original work. Methodologies are cited public literature; every text, geometry, figure, PDF, HTML, and font asset below lists its origin and license. No remote/CDN asset is loaded by any HTML deliverable. No confidential, internal, personal, or non-public spatial data is submitted.

本方案为作者原创；方法学为公开文献并已引用。下列每类文本、几何、图件、PDF、HTML 与字体资产均列明来源与许可。所有 HTML 成品均不加载远程/CDN 资产；未提交任何涉密、内部、个人或非公开空间数据。

## Per-asset inventory / 资产清单

| Asset / 资产 | Origin / 来源 | License / 许可 |
| --- | --- | --- |
| `proposal.md`, `proposal.en.md` (text) | AI agent (author), original writing | Original / 原创 |
| `report/proposal.html`, `report/proposal.en.html` | Derived from the above via `scripts/render_proposal_html.py` | Original (derived) / 原创（派生） |
| `visual/index.html`, `visual/index.en.html` | AI agent (author), original writing | Original / 原创 |
| `geometry/*.geojson` (site boundary, key areas, land use, buildings, roads, green space, public space, constraints, phasing) | `agent_generated_design` conceptual geometry; provisional boundary sourced from `brief/site-package/geometry/provisional_boundaries.geojson` (official public) | Original design geometry; provisional boundary per site package / 原创设计几何；临时边界来自站点包 |
| `assets/figures/*.png`, `assets/figures/*.en.png` | AI agent (author), plotted with matplotlib | Original / 原创 |
| `drawings/a3-booklet.pdf`, `drawings/a0-boards.pdf`, `*.en.pdf` | AI agent (author), assembled with matplotlib PdfPages | Original / 原创 |
| Embedded CJK font (Noto Sans SC subset, inlined as base64 `@font-face` in `report/*.html` and `visual/*.html`) | Noto Sans SC by Google (subset generated with fontTools, SIL OFL 1.1) | SIL Open Font License 1.1 / SIL OFL 1.1 |
| `simulation.json` | Author's real Physarum + NSGA-II run logs (recorded faithfully) | Original (author's own run data) / 原创（作者运行数据） |
| `metrics.json`, `assumptions.json`, `sources.json`, `compliance_matrix.json`, `standard_matrix.json`, `design_depth_matrix.json`, `self_check.json`, `agent.json`, `manifest.json` | AI agent (author), original structured records | Original / 原创 |

## Method references (cited, not reproduced) / 方法引用（仅引用，未复制）

| Reference | License note |
| --- | --- |
| Tero A. et al. (2010), *Rules for biologically inspired adaptive network design*, Science 327(5964): 439–442. DOI 10.1126/science.1177894 | Cited for method only; journal content not reproduced. / 仅方法引用 |
| Deb K. et al. (2002), *A fast and elitist multiobjective genetic algorithm: NSGA-II*, IEEE TEVC 6(2): 182–197. DOI 10.1109/4235.996017 | Cited for method only. / 仅方法引用 |

## Software libraries (build-time only; not redistributed) / 软件库（仅构建期使用，未再分发）

| Library | License |
| --- | --- |
| matplotlib | PSF-based (Matplotlib license) |
| NumPy | BSD-3-Clause |
| pymoo | Apache-2.0 |
| shapely | BSD-3-Clause |
| pyproj | MIT |
| fontTools | MIT |

## Font note / 字体说明

Figure rendering uses **Noto Sans SC (SIL OFL 1.1)**, and the offline HTML deliverables embed a WOFF **subset** of Noto Sans SC so Chinese text renders without tofu on any machine. No proprietary system font (e.g. Microsoft YaHei) is embedded, redistributed, or relied upon.

图件渲染使用 **Noto Sans SC（SIL OFL 1.1）**，离线 HTML 成品内嵌 Noto Sans SC 的 WOFF **子集**，保证中文在任意机器上无「豆腐块」正常显示。未内嵌、再分发或依赖任何专有系统字体（如微软雅黑）。
