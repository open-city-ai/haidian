## v1.4 - 2026-08-31 (CocoSgt 5061381133 CHANGES_REQUESTED Repair)\r\n\r\n- **Fact-boundary repair**: Replaced unsupported present-condition wording about buildings and railway-related elements in proposal.md/proposal.en.md, bilingual key-areas figures, all four HTML deliverables, and regenerated A0/A3 PDFs with survey-and-archival-confirmation conditions; provisional/data-gap boundaries remain explicit.\r\n- **Offline CJK rendering**: Embedded the locally redistributable Noto Sans SC subset as a WOFF data URI in visual/index.html and synchronized the English visual page and report HTML surfaces; font coverage was rechecked for title, navigation, warning, body, caption, and node text.\r\n- **Derived outputs**: Regenerated 14 bilingual figure PNGs, 4 A0/A3 PDFs, and 4 HTML deliverables; refreshed figure_qc.json and manifest.json with current hashes plus 8 figure and 4 PDF preview PNGs.\r\n\r\n## v1.5 - 2026-08-31 (CocoSgt 5062208469 Repair)

- **Canonical node naming**: Replaced residual short forms with `留改工坊` / `单元工坊` across assumptions, compliance/standard/design-depth matrices, GeoJSON mappings, bilingual proposal/report HTML, and evidence/QC records; node IDs and the three-area mapping remain unchanged.
- **Figure layout repair**: Rebuilt the bilingual `land-use-structure`, `metrics-evidence`, and `key-areas` source figures with separated title/PROVISIONAL/content bands, bounded notes, and a wrapped English middle node title. Corrected `land_use_zone_count` to the declared 27-feature GeoJSON count.
- **Derived deliverables**: Regenerated 4-page A0 boards, 8-page A3 booklets, report HTML, visual HTML, and the existing figure/PDF previews; refreshed `figure_qc.json` for CocoSgt review `5062208469`.

# 方案迭代记录

## v1.3 - 2026-08-30 (CocoSgt 72.0 Review Closure & Package Repair)

- **HTML CJK Font Embedding**: Embedded 100% CJK font subset coverage into all 4 HTML surfaces (`report/proposal.html`, `visual/index.html`, `report/proposal.en.html`, `visual/index.en.html`) using `refs/fonts/NotoSansSC-Static.ttf` via `scripts/embed_fonts.py`; verified 0 missing glyphs and zero tofu boxes via `check_font_coverage.py`.
- **Green Ratio Reconciliation & Provisional Decimals**: Reconciled green space share to ~11.0% single caliber across all figures, tables, text, and `metrics.json` (`green_ratio = 11.0044%`); updated concept land use distribution to R&D 36.0%, Commercial 24.0%, Green & Water 11.0%, Residential 17.0%, Infrastructure 12.0% (summing to 100.0%). Cleaned and rounded provisional derived quantities (~192 ha, ~104 ha, ~72 ha, ~10.2 km, ~11.4 km², ~368 ha) and labeled as non-statutory provisional test calibers.
- **English Node Names & Figure Readability**: Strictly unified English node names across all assets: North / Zhongzhiyuan = `UNIT WORKSHOP` (`UNIT·BLOCK`), Central / Origin Community = `RETENTION & RENOVATION WORKSHOP` (`KEEP·BLOCK`), South / Dazhongsi = `SUPERVISION PAVILION` (completely eliminated Gov Pavilion / Governance Pavilion variants). Expanded left axis margin to 0.18 on `metrics-evidence(.en).png` to guarantee zero y-axis label clipping. Repositioned warning stamp banners below titles on all figures (especially `land-use-structure(.en).png`) to ensure clean visibility. Cleared all residual Chinese in English figures and tables.
- **Drawings & Visual Previews**: Re-rendered high-resolution A0 boards (`a0-boards.pdf`, `a0-boards.en.pdf`) and A3 booklets (`a3-booklet.pdf`, `a3-booklet.en.pdf`), refreshed visual previews, and updated `manifest.json` hashes.
- **Four Gates Validation**: Successfully passed Deterministic, Spatial, Visual Packaging, and Professional Evidence checks via `self_check_submission.py`.

## v1.2 - 2026-08-30 (CocoSgt 76.0 CHANGES_REQUESTED Repair Closure)

- **Two Wings Naming Alignment**: In all Chinese and English text, figures, HTML, and PDFs, strictly unified Two Wings naming to "中关村科技服务翼 / Zhongguancun Technology Service Wing" and "小月河场景赋能翼 / Xiaoyuehe Scenario Empowerment Wing". Future Science City, Huairou Science City, E-Town, and Beijing-Tianjin-Hebei marked as supplemental external synergy interfaces.
- **Three Key Areas & Nodes Mapping**: Unified mapping and colors across proposal narrative, matrices, GeoJSON attributes, and figures:
  - North / Zhongzhiyuan (众智园): 单元工坊 / UNIT WORKSHOP (UNIT·BLOCK, teal `#0E7C82`)
  - Central / AI Origin Community (北京AI原点社区): 留改工坊 / RETENTION & RENOVATION WORKSHOP (KEEP·BLOCK, amber `#C47B1A`)
  - South / Dazhongsi (大钟寺): 督行亭 / SUPERVISION PAVILION (SUPERVISION PAVILION, blue `#2E5E96`)
- **Figure Readability & PDF Overhauls**: Re-rendered all 7 canonical figure pairs (14 PNGs) to eliminate title/footer clipping, legend obstruction, label collision, and card text truncation; ink >= 0.08, zero edge clipping, clear typography (title >=18pt, labels >=13pt, annotations >=11pt), with scale bars, north arrows, and prominent PROVISIONAL stamp banners.
- **Drawings**: Re-rendered A0 boards (4 pages, zh+en) and A3 booklets (8 pages, zh+en) with safe margins, high legibility, and prominent disclaimers.
- **HTML & Previews**: Updated `report/proposal.html`, `report/proposal.en.html`, `visual/index.html`, and `visual/index.en.html` offline previews with responsive single-column layout and horizontal scroll tables.

## v1.1 - 2026-08-25 (REPAIR ROUND-1)

- 统一命名：确定「更新枢（RENEW·JZ）」为总体框架品牌名、三节点统一为「留改工坊/单元工坊/督行亭」，全文/图件/指标/GeoJSON 属性/HTML 同步；十张编号场景卡（SC-01—SC-10）合并原两份五类清单，三项测试协议（TP-01—TP-03）落地。
- 全文重写 proposal.md（13 节齐全，每节≥280 紧凑字符）：三区两翼空间—产业—运营闭环表、品牌识别与视觉系统、文化叙事与国际传播双语文案、荣誉体系（更新勋章/坊主议事会/督行公示榜）、可逆组件库（更新构件库）、实施台账（牵头/协作、前置依赖、试点准入/退出、指标基线、数据周期、年度复盘、成本级别）、年度活动品牌（开放日/市集/体检季）、更新开发者社区与长期运营转化路径、品牌在先权利与使用边界段、AI 治理三句式与意见通道/复核流程。
- proposal.en.md 全文英文翻译（13 节英文标题一致、谕语仅以引号注释出现），中英实质等值经人工核对。
- 图件重绘并新增：site-overview（三区两翼协同）、key-areas（节点卡）、mobility-bluegreen（分时街道）、land-use（单一口径）、metrics-evidence（比值与计数分轴）、ecosystem-map、logo-update-hub 共 7 张 × 中英文 14 张；figsize 12x8@150dpi、图例/比例尺/指北针/provisional 警示齐全，ink≥0.08 且 edge-clip 通过（生成期文本包围盒检查如 layout 参数所示）。
- A0/A3 图纸重绘并新增英文版（a0-boards.en.pdf / a3-booklet.en.pdf）。
- metrics.json 更新（global_case_count=8、新增 scenario_card_count=10）；sources.json 新增 8 个案例条目（机构网址/里程碑时点/复用边界，2026-08-25 网页核验）与 3 个资产条目（logo/字体/图件，含 license 字段）；compliance/standard/design-depth 矩阵 evidence_summary 全部改为各自真实内容。
- 报告与可视化：report/proposal.html 与 proposal.en.html 经 render_proposal_html.py 重新生成，visual/index.html 重写并新增 index.en.html（14 内容标记、18 项 data-metric、图像替代文本、无脚本交互后备说明），4 个 HTML 页内嵌 Noto Sans SC 子集字体。
- manifest.json 按 0.2 契约重写：英文对应文件全部登记 language=en + translation_of；data_confidence 如实改为 low；品牌与资产角色说明与 sources.json/copyright_statement.md 一致。
- 图件机器质检：self_check.json[figure_qc]（ink 与 edge-clip 实测，全部通过；文本重叠事后不可机器复核，如实标注 not_verified）。

## v0.1.0 - 2026-08-24

- Initial assembly (concept package) for urban-renewal-framework.
- Proposal drafted via the package assembly workflow, session unknown; edited for structure.
- Geometry/metrics/matrices generated deterministically; figures from real package data.
- Valroot gates run on 2026-08-24 (results persisted in self_check.json).
