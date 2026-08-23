# Copyright and Asset Statement

## Submission text and design

The Chinese and English proposal text, the EVERY SENSE JING-ZHANG name, the line “One city. Many ways to sense it.”, the spatial framework, scenario cards, personas, diagrams, offline HTML, and drawing layouts were newly generated for this submission by the declared AI agent under the direction of GitHub user `lqqk7`.

The package selects `COMMUNITY-DISPLAY-ONLY`. The repository root does not declare a licence that would justify assuming broader reuse rights. This statement does not waive third-party rights or convert cited public pages into openly licensed assets.

## Repository data and materials

- `brief/site-package/geometry/provisional_boundaries.geojson` is reused as repository-maintained provisional intake geometry. It is visibly labelled as rough, non-official, and unsuitable for official redlines, precise areas, statutory controls, ownership, engineering, or approval.
- The official announcement snapshot, Agent taskbook, enums, standards, source registry, and processed fact pack are referenced according to their recorded use limits in `sources.json`.
- No peer proposal text, image, diagram, HTML, PDF, geometry, or brand asset is copied into this package. Peer metadata was used only to avoid duplicating an existing concept.

## External references

External pages from the Chinese Government, W3C, WHO, Cornell Tech, MIT, NTU, Barcelona City Council, Amsterdam, and JTC are paraphrased as linked background evidence. No page screenshot, photograph, logo, layout, long quotation, or downloadable media is redistributed. Where a page does not state an open reuse licence, this package treats it as citation-only.

OpenStreetMap background context is credited to © OpenStreetMap contributors and is available under the Open Database License (ODbL) 1.0 (`https://www.openstreetmap.org/copyright`). From v6.4 through v7.6 every delivered figure was drawn plain-ground from the submitted GeoJSON and no OSM background data appeared in any deliverable. From v7.7 the zh and en versions of four plates (`site-overview`, `land-use-structure`, `mobility-bluegreen`, `dual-state-plan`) and the seven geometry verification sheets carry, as their bottom layer, a road-and-rail basemap generated from the bounded reduced snapshot shipped in `visual/assets/osm-fabric/` under ODbL 1.0; the attribution and the licence are printed on those sheets themselves. The snapshot holds highway and railway elements only, so the basemap carries no buildings and no water. From v8.7 both language versions of `site-overview` also carry, above that basemap, a heritage park corridor reference line derived from the same snapshot -- the OpenStreetMap rail corridor centreline used as a positional proxy, not a park boundary -- whose readings are registered in `visual/assets/alignment-reference.json`. The registration below is retained for the historical Overpass snapshot and for earlier published versions. Wherever the background is used, it serves only background orientation and explanatory rendering of publicly mapped roads, rail, buildings, green/water features, and stations. It is not used to derive, revise, validate, or replace project or key-area boundaries, statutory controls, road redlines, engineering alignments, heritage controls, ownership, precise areas, site-accessibility compliance, or implementation commitments.

## Generated assets and software

- Figures and PDF drawings are generated locally from the submission's GeoJSON, metrics, matrices, risks, assumptions, and authored labels using Python, SVG, `rsvg-convert`/Cairo, and `pdfunite`. The temporary generation source is not included in the submission package.
- The OSM background was retired in v6.4 and no figure delivered between v6.4 and v7.6 carried it; from v7.7 the four main plates (zh and en) and the seven geometry verification sheets, and from v8.2 `district-strategy.png`, carry a road-and-rail basemap as their bottom layer, generated from the bounded reduced snapshot in `visual/assets/osm-fabric/` and attributed on the sheets themselves. Where an earlier version's figure included OSM background context, that background was generated locally from the bounded Overpass snapshot recorded in `visual/assets/osm-context/provenance.json`. From v6.9 exactly one OSM-derived database is redistributed with this package: the bounded compact snapshot (two parts, `visual/assets/osm-fabric/osm-fabric-snapshot-part1.json` and `-part2.json`, whose field-level merge re-serialised reproduces the original byte-exactly), distributed under ODbL 1.0 share-alike with attribution © OpenStreetMap contributors, used solely to compute the registered as-is fabric readings; the raw Overpass response and map tiles remain unredistributed (the response byte count and hash are registered in the snapshot metadata). This follows the separate ODbL attribution and share-alike review this ledger reserved for any derivative-database distribution.
- `report/proposal.html` and `report/proposal.en.html` are generated by the repository's `scripts/render_proposal_html.py` from the corresponding Markdown source.
- `visual/index.html` and `visual/index.en.html` are authored as self-contained offline HTML and use no remote scripts, fonts, map tiles, images, APIs, forms, iframes, or tracking.
- Source Han Sans SC is used from a locally installed copy under the SIL Open Font License 1.1 and is subset-embedded in the PDF outputs. No font file is redistributed as a standalone submission asset. A full-book font audit (pypdf, 2026-08-13) confirms the four drawing PDFs embed only SourceHanSansSC Regular/Medium/Bold subsets with zero non-OFL entries; earlier builds had picked up system-font subsets through the browser print pipeline's font-stack fallback, which this version removes with a build-time normaliser and a repeatable audit script.
- The visual system uses original geometric lines, circles, colour fields, labels, diagrams, and evidence cards. It does not use stock icons, third-party illustrations, or peer-submission visual assets.

## AI-generation responsibility

AI generation does not establish factual authority, accessibility compliance, user consent, planning approval, engineering feasibility, or representation of disabled and neurodivergent people. All facts, sources, licences, geometry, metrics, translations, and claims remain subject to human and professional review. Future co-design and task testing must use voluntary participation, reasonable accommodation, privacy protection, and a clear right to withdraw.

---

# 逐资产权利台账 / Per-Asset Rights Ledger

The ledger below restates, asset by asset, what the sections above declare in prose. It covers all 153 file entries registered in `manifest.json`. Every row is compiled from a record that already exists inside this package — no new rights fact, tool record, or licence claim is introduced here — and the last column of each table names the file the entry was compiled from, so any row can be checked word for word against its source. Tables are written in Chinese with bilingual headings; where a field is not registered anywhere in the package, the entry reads「包内未登记」rather than a guessed value, and all such gaps are listed in the final section.

## 一、编制口径 / Compilation rule

本台账汇编自以下八处既有登记：本文件（作者归属、许可选择、生成方法、字体许可、OSM 署名与用途限制）、`manifest.json`（文件清单、角色、语言、翻译关系、校验和；其中 `manifest.json` 自身条目按结构性排除不带 `sha256`——自引用不可能自含自身哈希，该排除已登记于随包自检闸门 PG-06 的判据）、`agent.json`（申报智能体与模型）、`sources.json`（四十四条来源的允许与禁止用途）、`visual/assets/osm-context/provenance.json`（OSM 取数与再分发状态）、`assets/media/audio-guide.md` 与 `journey.md` 与 `cover.md`（三件媒体资产的工具、方法与权利记录）、`metrics.json`（复算投影）、`proposal.md`（品牌字体策略、随包代码零依赖声明、基准许可授予）。

**许可总则：** 全包整体 `COMMUNITY-DISPLAY-ONLY`，仅用于本次征集的社区展示与评审场景；不放弃任何第三方权利。
**署名总则：** 署名主体为 GitHub 用户 `lqqk7` 指导下的申报智能体「柱子 / Zhuzi」；模型与撰写工具见 `agent.json`，媒体合成工具在各自说明文件中单独披露。

## 二、资产类别总表 / Asset classes at a glance

| 类别 / Class | 文件数 | 作者或生成方式 | 主要工具 | 权利信息主要出处 |
| --- | --- | --- | --- | --- |
| A 方案正文与结构化文件 | 13 | 申报智能体原创生成 | Claude Fable 5 via Claude Code（含 Claude Opus 子代理）；v1.0 阶段为 GPT-5.6 Sol via Codex | 本文件 · `agent.json` |
| B 报告与说明文件 | 4 | 原创撰写；两份 HTML 由仓库脚本渲染 | `scripts/render_proposal_html.py` | 本文件 |
| C 图版 | 41 | 由本包 GeoJSON、指标、矩阵、风险、假设与自撰标签本地生成；其中四张主图、七张几何核验图与片区策略图版另铺随包 OSM 快照底图，三张概念推演图只铺该快照的干道与轨道两层 | Python、SVG、`rsvg-convert`/Cairo | 本文件 |
| D 图纸 PDF | 4 | 同上，并合并为册 | Python、SVG、`rsvg-convert`/Cairo、`pdfunite` | 本文件 |
| E 几何 | 9 | 基于仓库临时边界与本方案概念几何 | 复算投影 EPSG:4548（`scripts/spatial_review.py`） | 本文件 · `sources.json` · `metrics.json` |
| F 离线展示与随包代码 | 55 | 原创手写，自含离线；含 SEB 许可授予文件、四个历史版本快照、OSM 精简快照两片与肌理读数、三维主脊视图与第三方组件 three.js r160 及其许可正本、法律接口登记与审查过程归档 | SEB 判据工具零依赖（仅 Node 内置模块）；展示层含唯一第三方组件 three.js r160（MIT，许可正本 `three-license.json`） | 本文件 · `proposal.md` |
| G 媒体 | 18 | 手写 HTML/SVG 渲染 + 语音合成（中英导览与数据可听化）+ 本包页面逐帧实录 | Playwright/Chromium、MiniMax `speech-2.8-hd`（`mmx` 1.0.7）、x264/AAC、Pillow | `journey.md` · `audio-guide.md` · `cover.md` · `audible-break.md` |
| H 品牌标志 | 1 | 原创矢量几何 | 手写 SVG | 本文件 · `cover.md` |
| I 场景概念图 | 6 | AI 图像生成 + 包内标注层排版合成 | OpenAI 图像生成（经 Codex CLI 原生图像生成工具，GPT-5.6 Sol 智能体调用）；标注层为手写 HTML 经 Chromium（Playwright）渲染 | 本文件 · `sources.json` |
| J 触觉交付（折叠纸模） | 2 | 原创参数化 SVG（A4 双语纸模，凸点阵与折线） | 手写 SVG | 本文件 · 展示页第 07 章 |

**件数口径与本版更正：** 十类件数按 `manifest.json` 的 153 条声明逐路径归类得出，十类之和恒等于 153。v8.6 版按此口径重新逐路径对账，更正三处存量偏差：C 类由 37 更正为 38（v8.2 新增的 `assets/figures/district-strategy.png` 未计入，v8.3 新增两张关系图版时又只加计一件）；F 类由 43 更正为 47（v8.0 新增的 `visual/assets/seb-spec-v0.4.0.json` 与 `seb-change-receipt-v05.json`、v8.2 新增的 `visual/assets/district-strategy.json` 与 `field-verification-plan.json` 共四件未计入）；G 类由 23 更正为 18（v8.1 精简包体时删除的 `assets/media/dual-state-walk.mp4`、`dual-state-walk-poster.webp`、`dual-state-walk.vtt`、`dual-state-walk-en.vtt`、`dual-state-walk.md` 五件未从计数中扣除，同批删除使 G 类叙述中的「AI 生成场景双态短片」一语失去对应文件，本版一并删去）。三处偏差方向相反、数量恰好互相抵消，总和在当时始终为 142，因此历次自检未能发现。同轮补齐 F 类逐资产登记的十六个漏列文件，F、G 两类的逐资产登记行现与 `manifest.json` 逐路径一一对应。v8.7 版新增 `visual/assets/alignment-reference.json` 一件，F 类由 47 增至 48，总数由 142 增至 143，逐资产登记行同批补入。v8.8 版新增三张概念推演图与其设想要素登记文件一件，C 类由 38 增至 41、F 类由 48 增至 49，总数由 143 增至 147，四件的逐资产登记行同批补入。v9.1 版新增 `visual/assets/changelog-archive.json` 一件（迭代记录早期条目的原样归档），F 类由 49 增至 50，总数由 147 增至 148，逐资产登记行同批补入。v9.2 版新增 `visual/assets/plan-b-register.json` 与 `visual/assets/scenario-matrix.json` 两件（三区方案 B 登记与外部情景矩阵），F 类由 50 增至 52，总数由 148 增至 150，两件的逐资产登记行同批补入。v9.3 版新增 `visual/assets/institutional-scaffold.json` 与 `visual/assets/finance-structure-model.json` 两件（条件化制度载体谱系与五年财政结构模型），F 类由 52 增至 54，总数由 150 增至 152，两件的逐资产登记行同批补入。v9.5 版新增 `visual/assets/seb-crosscheck-run.js` 一件（SEB 双实现对拍脚本，把 PG-10 闸门原以叙述文本记录的读数与两句承诺改写为可执行断言），F 类由 54 增至 55，总数由 152 增至 153，逐资产登记行同批补入。

## 三、逐资产登记 / Per-asset register

### A 方案正文与结构化文件 / Proposal text and structured files

| 文件路径 | 作者或生成方式 | 工具及版本 | 署名与复用限制 | 登记出处 |
| --- | --- | --- | --- | --- |
| `proposal.md` | 申报智能体原创撰写 | Claude Fable 5 via Claude Code；版本演进见 `agent.json` `model_detail` | 署名 `lqqk7` / 柱子；`COMMUNITY-DISPLAY-ONLY` | 本文件 §Submission text and design |
| `proposal.en.md` | 同上，`proposal.md` 的翻译件 | 同上；不以机器翻译结果作为正式版本 | 同上 | `manifest.json` `translation_of`；`proposal.md` 国际传播段 |
| `manifest.json` · `agent.json` | 申报智能体生成 | `scripts/scaffold_ai_submission.py` 初始化 | 同上 | `agent.json` `generated_with` |
| `metrics.json` | 由提交几何复算与逐项人工登记生成 | `scripts/spatial_review.py`，投影 EPSG:4548 | 同上；数值不构成法定指标或评分承诺 | `sources.json` `PACKAGE-SPATIAL-RECALCULATION-METHOD` |
| `assumptions.json` · `self_check.json` · `compliance_matrix.json` · `standard_matrix.json` · `design_depth_matrix.json` · `risk.json` | 申报智能体原创编制 | 同 `proposal.md` | 同上 | 本文件 §Submission text and design |
| `sources.json` | 逐条登记来源的允许与禁止用途 | 同上 | 同上；条目内的第三方页面为引用，不再分发 | 本文件 §External references |
| `changelog.md` | 申报智能体逐版本登记 | 同上 | 同上 | `manifest.json` `role: changelog` |

### B 报告与说明文件 / Report and statement files

| 文件路径 | 作者或生成方式 | 工具及版本 | 署名与复用限制 | 登记出处 |
| --- | --- | --- | --- | --- |
| `report/proposal.html` · `report/proposal.en.html` | 分别由 `proposal.md` 与 `proposal.en.md` 渲染 | 仓库脚本 `scripts/render_proposal_html.py`（版本号包内未登记） | 同 A 类 | 本文件 §Generated assets and software |
| `report/narrative.md` | 由结构化包派生的摘要，申报智能体撰写 | 同 A 类 | 同上 | 本文件 §Submission text and design |
| `report/copyright_statement.md`（本文件） | 申报智能体原创撰写 | 同上 | 同上 | 本文件 |

### C 图版 / Figure plates

四十一个文件，全部位于 `assets/figures/`：`site-overview`、`land-use-structure`、`key-areas`、`mobility-bluegreen`、`mobility-bluegreen-audit`、`dual-state-plan`、`metrics-evidence`、`metrics-evidence-audit`、`brand-system`、`ecosystem-map`、`section-profiles`、`enterprise-journey`、`op04-detail` 十三题各中英两版（`*.png` 与 `*.en.png`，共二十六个文件）；`verification-overlay-00-all.png` 至 `-06-keyareas.png` 七张几何核验图（中英双语同图，不分中英两版）；以及 v8.0 新增的 `tactile-corridor-map.png` 与 `green-section-principle.png`、v8.2 新增的 `district-strategy.png`、v8.3 新增的 `bluegreen-structure.png` 与 `heritage-sequence.png`、v8.8 新增的 `district-concept-sections.png`、`transport-system-concept.png` 与 `bluegreen-system-concept.png` 八张（同为中英双语同图单件，`manifest.json` 按 `language: neutral` 登记；末三张为概念推演图，体裁与其余图版不同，另见下表逐件登记）。本类只计图版位图文件；`assets/tactile/` 下 OP-04 断面折叠纸模中英两版 SVG（可打印折叠为手持断面，盲道区凸点阵用发泡油墨或点字打印机输出即成可触纹理）单列为 J 类，不重复计入本类，此前版本曾在本段文字内一并叙述并同时漏列 `dual-state-plan` 两版，两处误差互相抵消使件数仍为三十三，本版按实际文件逐项更正。生态图谱、断面、企业旅程与 OP-04 节点深化图版均由正文对应章节内容排版生成（手写 HTML 经 Chromium 渲染，深化图版几何取自本包 GeoJSON 投影），不含第三方素材；深化图版全部尺寸为设计目标值，依据框架登记于 `sources.json`（GB 55019-2021 条目）。

| 项目 | 登记内容 |
| --- | --- |
| 作者或生成方式 | 由本投稿包的 GeoJSON、指标、矩阵、风险、假设与自撰标签本地生成；临时生成源不随包提交 |
| 工具 | Python、SVG、`rsvg-convert`/Cairo（版本号包内未登记） |
| 地图背景 | v6.4 至 v7.6 期间全部交付图版为素底自绘、不含 OSM 背景；v7.7 起 `site-overview`、`land-use-structure`、`mobility-bluegreen`、`dual-state-plan` 四张主图的中英两版（共八个文件）与七张几何核验图、v8.2 起 `district-strategy.png` 在最底层铺设 OSM 路网/轨道底图，数据取自随包分发的定界精简快照 `visual/assets/osm-fabric/`（ODbL 1.0，署名与相同方式共享条件见本文件 §OpenStreetMap 条目），底图署名印在图面上；该快照只含 highway 与 railway 要素，故底图无建筑与水系，图注已如实说明。v8.7 起 `site-overview` 中英两版在底图之上另叠一条由同一快照派生的遗址公园廊道参考线（OSM 铁路廊道中心线，作位置代理，非公园边界），其读数登记于 `visual/assets/alignment-reference.json`。更早历史版本曾用背景由 `visual/assets/osm-context/provenance.json` 记录的定界 Overpass 快照本地生成，该登记保留 |
| 第三方素材 | 无。不使用图库图标、第三方插画或同行投稿视觉资产 |
| 署名与复用限制 | 署名 `lqqk7` / 柱子；`COMMUNITY-DISPLAY-ONLY`；概念建议，不得作为现状证据或效果承诺引用 |
| 登记出处 | 本文件 §Generated assets and software |

v8.0 至 v8.8 新增的八张图版另按逐件口径登记：

| 文件路径 | 数据来源与生成方式 | 第三方数据与许可 | 字体 | 已登记的局限 |
| --- | --- | --- | --- | --- |
| `assets/figures/tactile-corridor-map.png` | 程序绘制：线位与点位读自本包 `geometry/roads.geojson`、`geometry/constraints.geojson` 与 `geometry/key_areas.geojson`，经图面容差 2.5 mm 的 Douglas-Peucker 简化、一轮 Chaikin 转角圆化与安静线沿主脊法向外推三步泛化后排版（手写 HTML 经 Chromium/Playwright 渲染），三步参数与最大位移量印在图面上 | `roads.geojson` 的线位走向按随包 OpenStreetMap 精简快照（`visual/assets/osm-fabric/`）取样加密，故本图为 ODbL 1.0 衍生作品：「© OpenStreetMap 贡献者 · ODbL 1.0」署名已印在图面页脚，相同方式共享条件按本文件 §OpenStreetMap 条目履行 | 生成期 HTML 内嵌 Source Han Sans SC（SIL OFL 1.1）三个字重子集，该 HTML 不随包提交；PNG 内字形为位图，不嵌入、不分发任何字体文件。图面盲文为按 GB/T 15720 点位尺寸自绘的几何图形，不使用任何盲文字体，也不复制该标准的数值表 | 盲文标题为英文 UEB 一级逐字母转写，未经盲文使用者或持证校对员校对；全图未经视障使用者测试，打印成功不等于触觉可用——两条均如实印在图面上，并登记于 `visual/assets/qa-proofing-record.json` |
| `assets/figures/green-section-principle.png` | 程序绘制：图面四栏内容逐条取自 `proposal.md` 蓝绿空间章「一段真深化：众智园段线性绿带」四行深化表的正文用语，断面本身为原创示意几何，不取自任何现状测绘、地形图或工程断面（手写 HTML 经 Chromium/Playwright 渲染） | 无。本图不含 OSM 背景、也不由 OSM 数据派生，因此不适用 ODbL 的署名与相同方式共享条件 | 同上一行 | 图中不标任何尺寸数值，宽度只表示相对关系；净宽、坡度、基准标高与材质均为现场核定条件，非工程断面 |
| `assets/figures/district-strategy.png` | 程序绘制：全部数值、坐标与 way 编号直读本包 `visual/assets/district-strategy.json`；候选街块轮廓按该文件自述的 FAB-03 构面口径（可步行网络平面图 polygonize）由随包 OSM 精简快照就地复算，并以面积、周长、质心三项逐候选校验与登记值一致后才入图；重点区范围、五条中心线与十个完成点读自本包 `geometry/key_areas.geojson`、`roads.geojson` 与 `constraints.geojson`（手写 HTML 经 Chromium/Playwright 渲染，v9.1 版另经 pngquant `--quality=82-96 --speed 1 --strip` 与 zopflipng `-y --filters=0me` 再压一轮，图面内容未改） | 底图与街块面均由随包 OpenStreetMap 精简快照（`visual/assets/osm-fabric/`）派生，故本图为 ODbL 1.0 衍生作品：「© OpenStreetMap 贡献者 · ODbL 1.0」署名与快照编号已印在图面页脚，相同方式共享条件按本文件 §OpenStreetMap 条目履行 | 同上一行 | 重点区范围为临时多边形（`official_boundary=false`）；街块轮廓为 OSM 拓扑闭合面，不代表产权边界或围墙；入口间距参考标尺为快照口径派生的参考值，非法定值；界面分类按 `frontage_rules` 的适用条款派生，不是逐段实测分配——四条均如实印在图面上 |
| `assets/figures/bluegreen-structure.png` | 程序绘制：三层带的载体与职能、三条层间关系判据、三类铺装径流去向判据全称与十节点归类、三类「雨天断点」成因与指向，全部直读本包 `visual/assets/sensory-design-code.json` 的 `bluegreen_stormwater` 一节；图面短句只对该文件既有字段作压缩，不新增主张（手写 HTML 经 Chromium/Playwright 渲染） | 无。本图为关系图，不含 OSM 背景，也不由 OSM 数据或随包快照几何派生，因此不适用 ODbL 的署名与相同方式共享条件 | 生成期 HTML 内嵌 Source Han Sans SC（SIL OFL 1.1）三个字重子集，该 HTML 不随包提交；PNG 内字形为位图，不嵌入、不分发任何字体文件 | 类型判据而非工程参数，现场核定前不构成工程结论；图上不出现容积、渗透系数、溢流标高、管径与照度的任何数值；本图为关系图，层带与打点不表示位置、长度、面积或比例——四条均如实印在图面上 |
| `assets/figures/heritage-sequence.png` | 程序绘制：三段的名称、绑定节点与地标、解说载体清单与四条材料再利用判据，全部直读本包 `visual/assets/sensory-design-code.json` 的 `heritage_interpretation` 一节；图面短句只对该文件既有字段作压缩（手写 HTML 经 Chromium/Playwright 渲染） | 无。本图不含 OSM 背景、也不由 OSM 数据派生，因此不适用 ODbL 的署名与相同方式共享条件 | 同上一行 | 解说组织建议，不是文物保护规划，也不构成史实结论；图上不标注文物保护等级、保护范围与控制线，不做线路复原，不引用未经核验的站场史实，历史锚点一律留在正文——四条均如实印在图面上 |
| `assets/figures/district-concept-sections.png` | 程序绘制：三分幅的街块编号、候选动作、界面规则与入口间距直读本包 `visual/assets/district-strategy.json`，服务桌四工位与节点属性直读 `geometry/public_space.geojson` 与 `geometry/constraints.geojson`，重点区范围、中心线与绿地读自 `geometry/key_areas.geojson`、`roads.geojson` 与 `green_space.geojson`；建筑体量、通道线位与界面分段为按上述既有判据落笔的设计设想（手写 HTML 经 Chromium/Playwright 渲染，输出 3000 × 1875（CSS 1200 × 750，DSF 2.5，CSS 字号下限 12 px），再经 pngquant `--quality=55-90 --speed 1` 与 zopflipng `-y --filters=0 -m` 量化压缩） | 底图仅取随包 OpenStreetMap 精简快照（`visual/assets/osm-fabric/`）的干道（motorway/trunk/primary 一族）与轨道两层，故本图为 ODbL 1.0 衍生作品：「© OpenStreetMap 贡献者 · ODbL 1.0」署名与快照编号 osm-fabric-snapshot-20260815 已印在图面页脚，相同方式共享条件按本文件 §OpenStreetMap 条目履行 | 生成期 HTML 内嵌 Source Han Sans SC（SIL OFL 1.1）三个字重子集，另按缺字码位以 `unicode-range` 追加一份同族补字子集；该 HTML 不随包提交，包内不以独立资产形式再分发任何字体文件 | 概念推演图：建筑体量、通道线位与界面划分均为设计设想，不基于权属、红线或测绘资料，不代表现状或规划真实情况；图面以实线／虚线区分数据派生与概念设想，逐要素判据来源、数据与设想的划分登记于 `visual/assets/concept-design-register.json`，未登记的设想要素不得出现在图上；三分幅同取向同比例尺 1 CSS px = 3.3 m，比例尺为图面换算口径，非测绘精度 |
| `assets/figures/transport-system-concept.png` | 程序绘制：轨道接入点簇及其到最近中心线的垂足与距离按 EPSG:4548 就地复算并与 `visual/assets/district-strategy.json` 登记值逐条校验一致后才入图，五条中心线的 A／B／C 三类判据占比与主脊唯一连续共存段同源复算，既有骑行要素 45 条 21.1 km 直读随包 OSM 精简快照；骑行走向、节点停放点、换乘步行接驳与保障车时段分离为设计设想（手写 HTML 经 Chromium/Playwright 渲染，输出 3000 × 1875（CSS 1200 × 750，DSF 2.5，CSS 字号下限 12 px），再经 pngquant `--quality=55-90 --speed 1` 与 zopflipng `-y --filters=0 -m` 量化压缩） | 底图仅取随包 OpenStreetMap 精简快照（`visual/assets/osm-fabric/`）的干道（motorway/trunk/primary 一族）与轨道两层，故本图为 ODbL 1.0 衍生作品：「© OpenStreetMap 贡献者 · ODbL 1.0」署名与快照编号 osm-fabric-snapshot-20260815 已印在图面页脚，相同方式共享条件按本文件 §OpenStreetMap 条目履行 | 同上一行 | 概念推演图：建筑体量、通道线位与界面划分均为设计设想，不基于权属、红线或测绘资料，不代表现状或规划真实情况；图面以实线／虚线区分数据派生与概念设想，逐要素判据来源、数据与设想的划分登记于 `visual/assets/concept-design-register.json`，未登记的设想要素不得出现在图上；图上不出现车道数、断面、路权划分、停放规模与任何钟点值 |
| `assets/figures/bluegreen-system-concept.png` | 程序绘制：六块绿地、十节点的 DR-A／DR-B／DR-C 排水类型归类、蓝绿三层与三条层间关系判据全部直读本包 `visual/assets/sensory-design-code.json` 的 `bluegreen_stormwater` 一节，节点位置读自 `geometry/constraints.geojson`；汇水概念分区、遮荫间断风险位、热环境对比与夜间照明分级为设计设想（手写 HTML 经 Chromium/Playwright 渲染，输出 3000 × 1875（CSS 1200 × 750，DSF 2.5，CSS 字号下限 12 px），再经 pngquant `--quality=55-90 --speed 1` 与 zopflipng `-y --filters=0 -m` 量化压缩） | 底图仅取随包 OpenStreetMap 精简快照（`visual/assets/osm-fabric/`）的干道（motorway/trunk/primary 一族）与轨道两层，故本图为 ODbL 1.0 衍生作品：「© OpenStreetMap 贡献者 · ODbL 1.0」署名与快照编号 osm-fabric-snapshot-20260815 已印在图面页脚，相同方式共享条件按本文件 §OpenStreetMap 条目履行 | 同上一行 | 概念推演图：建筑体量、通道线位与界面划分均为设计设想，不基于权属、红线或测绘资料，不代表现状或规划真实情况；图面以实线／虚线区分数据派生与概念设想，逐要素判据来源、数据与设想的划分登记于 `visual/assets/concept-design-register.json`，未登记的设想要素不得出现在图上；包内无高程与水文资料，汇水概念分区按既有判据 BG-R2「就地滞留为先」以三处重点区各自成区，不表示实际汇水边界；图上不出现容积、渗透系数、溢流标高、管径与照度的任何数值；图版写出的设计张力 CB-03-T1 为已识别未解决状态，其处置判据为两条既有条款，本图不提出照度数值、巡查频次或任何人群安全统计结论 |

### D 图纸 / Drawing sets

四个文件：`drawings/a3-booklet.pdf`、`a3-booklet.en.pdf`、`a0-boards.pdf`、`a0-boards.en.pdf`。

| 项目 | 登记内容 |
| --- | --- |
| 作者或生成方式 | 与 C 类同源生成，合并成册 |
| 工具 | Python、SVG、`rsvg-convert`/Cairo、`pdfunite`（版本号包内未登记） |
| 字体 | Source Han Sans SC，取自本地安装副本，SIL Open Font License 1.1，以子集形式嵌入 PDF；不作为独立资产随包分发 |
| 署名与复用限制 | 同 C 类 |
| 登记出处 | 本文件 §Generated assets and software |

### E 几何 / Geometry

九个文件：`geometry/` 下 `site_boundary`、`key_areas`、`land_use`、`green_space`、`public_space`、`roads`、`buildings`、`constraints`、`phasing`。

| 项目 | 登记内容 |
| --- | --- |
| 来源 | 场地边界复用仓库维护的临时接入几何 `brief/site-package/geometry/provisional_boundaries.geojson`；其余为本方案概念几何 |
| 性质标注 | 粗略、非官方，不适用于官方红线、精确面积、法定控制、权属、工程或审批 |
| 复算投影 | EPSG:4548（`scripts/spatial_review.py`），用于面积、比例、拓扑与计数复算 |
| 与 OSM 的关系 | OSM 快照不得用于推导、修订、验证或替代本包项目边界与重点区几何；v6.9 起随包分发一份定界精简快照（ODbL 1.0 派生数据库，仅用于肌理读数），偏差读数为情境描述而非几何验证，详见第五节 |
| 署名与复用限制 | 署名 `lqqk7` / 柱子；`COMMUNITY-DISPLAY-ONLY` |
| 登记出处 | 本文件 §Repository data and materials；`sources.json` `BOUNDARY-SOURCE`、`KEY-AREA-SOURCE`、`PACKAGE-SPATIAL-RECALCULATION-METHOD`；`metrics.json` `projection` |

### F 离线展示与随包代码 / Offline display and bundled code

| 文件路径 | 作者或生成方式 | 依赖与许可 | 登记出处 |
| --- | --- | --- | --- |
| `visual/index.html` · `visual/index.en.html` | 原创撰写的自含离线 HTML | 不使用远程脚本、字体、地图瓦片、图片、API、表单、iframe 或统计代码 | 本文件 §Generated assets and software |
| `visual/assets/scene.js` · `scene.css` | 原创撰写 | 浏览器原生实现，无第三方库 | 同上 |
| `visual/assets/scene-data.js` | 由 `geometry/*.geojson` 经本地构建步骤生成 | 文件头登记投影与临时概念几何性质 | 该文件头部注释 |
| `visual/assets/scene-fallback.png` · `scene-fallback.en.png` | 交互场景的静态后备图 | 同 C 类生成路径 | `manifest.json` `role: visualization` |
| `visual/assets/seb-tabletop-run.js` | 原创撰写的校验器 | 零依赖离线文件，仅使用 Node 内置 `fs`、`path` | `proposal.md`「OP-01 桌面配对试点档案」章 |
| `visual/assets/seb-op04-chain-run.js` | 原创撰写的复演器 | 零依赖离线文件，仅使用 Node 内置 `fs`、`path`、`child_process`；投影以纯 Node 内置数学实现 | `proposal.md`「OP-04 配对试点全过程证据链」章 |
| `visual/assets/seb-crosscheck-run.js` | 原创撰写的双实现对拍脚本 | 零依赖离线文件，仅使用 Node 内置 `fs`、`os`、`path`、`child_process`；镜像建在系统临时目录下并在结束时删除，包内文件只读 | `visual/assets/package-integrity-gates.json` PG-10 闸门 |
| `visual/assets/seb-spec.json` | 原创编制的机器可读规范 v0.5.0 | CC BY-SA 4.0，已由提交方以著作权人身份经 `seb-license-grant.json` 实际授予；托管主体与发布渠道仍待授权主体确认（许可与托管两事分立） | `seb-spec.json` `license` 与授予文件 |
| `visual/assets/seb-spec-v0.2.0.json` · `seb-spec-v0.3.0.json` · `seb-spec-v0.3.1.json` · `seb-spec-v0.4.0.json` | 历史版本按字节从上游提交提取的快照四件（提交号与哈希登记于规范 `version_snapshots`） | 同上（CC BY-SA 4.0 已授予） | `seb-spec.json` `version_snapshots` |
| `visual/assets/seb-license-grant.json` | 许可授予文件：授予声明为原创撰写；内嵌 CC BY-SA 4.0 法定正文取自 Creative Commons 官方发布（CC 许可条文本身不受版权限制可自由复制），含重建哈希 | 授予声明随授予生效；法定正文按 CC 官方口径复制 | 该文件自身与 `sources.json` |
| `visual/assets/seb-tabletop-fixtures.json` · `seb-change-receipt-sample.json` · `seb-op04-chain-data.json` · `seb-change-receipt-op04.json` · `seb-change-receipt-v03.json` · `seb-change-receipt-v04.json` · `seb-change-receipt-v05.json` · `seb-op04-90day-pack.json` · `op04-pilot-readiness.json` · `op04-tactile-map.json`（STL 封装）· `braille-core-statement.json` · `ethics-protocol.json` · `qa-proofing-record.json` · `scene-provenance.json` · `package-integrity-gates.json` · `service-desk-gonogo.json` · `district-strategy.json` · `field-verification-plan.json` · `sensory-design-code.json` | 原创编制的样例、回执（v0.3、v0.4、v0.5 三系各一份一版一号回执，另含样例与 OP-04 回执）、链路档案、九十天实施包与对接就绪材料、协议模板、自查记录、场景图生成档案、随包自检闸门台账、服务桌开办条件档案，以及 v8.2 新增的片区策略判据文件与零授权现场验证计划（前者的量算读数由随包 OSM 精简快照派生，来源与许可见本文件 §OpenStreetMap 条目）、v8.3 新增的感官设计准则文件（五节判据与矩阵，无 OSM 派生内容） | 随包整体许可；均不含任何参与者数据 | `proposal.md` 对应各章 |
| `visual/assets/plan-b-register.json` · `visual/assets/scenario-matrix.json` | v9.2 新增：三区方案 B 登记（每处重点区一个可辩的替代空间组合与一组三元决策条件，逐条标注即时可判与须预注册后可判两类）与外部情景矩阵（三条世界分岔各自的不变量、可变项与退出条件，另登记三条不予收录的分岔与理由）。两件全部由包内既有判据、读数与登记文件派生，本轮未发起任何新抓取、未引入任何包外来源，不给出任何阈值数值，也不作任何人群安全统计结论 | 随包整体许可；均不含任何参与者数据 | `proposal.md` 「片区策略」与「更新项目清单、实施政策与分期计划」两章的对应挂载段 |
| `visual/assets/institutional-scaffold.json` · `visual/assets/finance-structure-model.json` | v9.3 新增：条件化制度载体谱系（五类发起主体各给触发条件，沿 A 角色归属、G3 复核席任命路径、回避规则、经费来源与底线暴露面、审批路径五条轴逐类展开配置差异，全部条目状态为 unknown）与五年财政结构模型（建设、年度运维、人力、采购模式四科目对四种承担机制，各给激励、风险与对底线三项承诺的威胁路径）。两件全部由包内既有判据与登记文件派生，本轮未发起任何新抓取、未引入任何包外来源；不点名任何真实机构、企业、高校或社会组织，不表述任何一方已同意、已接洽或已表达意向；不含任何金额、单价、比例、分摊系数或增长率 | 随包整体许可；均不含任何参与者数据 | 两件本版未挂载正文，随包以自述字段（`document_zh` / `document_en`）与 `manifest.json` 登记为准，正文挂载的英文字节缺口见 `changelog.md` v9.3 条目 |
| `visual/assets/scene-time.css` · `spine3d.js` · `spine3d.css` | 原创撰写：交互场景四时段控件样式，以及三维主脊场景与其章节样式（几何全部同源于 `scene-data.js`，无 WebGL 时静态降级） | 浏览器原生实现；三维渲染调用同目录的唯一第三方组件 three.js r160（MIT） | `proposal.md` 三维主脊章；本文件 §四 three.js 行 |
| `visual/assets/three.min.js` · `three-license.json` | 第三方组件与其许可登记：`three.min.js` 由官方 module 构建机械可复现重封装为离线单文件（唯一改动为末尾 export 语句换全局赋值），`three-license.json` 载上游 URL、哈希、重封装步骤与 MIT 许可正本 | three.js r160，MIT，© 2010-2023 three.js authors；MIT 许可随包履行，不构成对上游项目的背书 | `visual/assets/three-license.json`；本文件 §四 |
| `visual/assets/font-license-ofl.json` | 随包收录的 SIL Open Font License 1.1 许可正本与重建哈希（对应四册 PDF 内嵌的思源黑体子集） | OFL 1.1 允许再分发许可文本本身；本包不以独立资产形式分发任何字体文件 | 本文件 §四字体台账 |
| `visual/assets/review-archive.json` · `spatial-audit-readings.json` · `legal-interface-register.json` | 原创编制的审查过程归档（基线提交、方法、发现分级与处置去向，含两份盲审报告全文与哈希）、六项空间审计型读数的定义与责任方（当前全部为零值）、三条法律谱系的触点与触发条件（全部未触发） | 随包整体许可；均不含任何参与者数据，且不作合规结论 | `proposal.md` 对应各章 |
| `visual/assets/changelog-archive.json` | 由 `changelog.md` 逐字节原样搬移的早期版本条目（v7.9 及更早共 52 条），零编辑，仅按版本标题分块存放；搬移动因为 Markdown 单文件 262,144 字节上限，被搬移文本的内容指纹与还原方法登记在该文件 `moved_text` 字段内 | 随包整体许可；内容全部为本包既有迭代记录，不含任何参与者数据，未引入任何包外来源 | `changelog.md` 顶部归档说明；该文件 `editing_policy_zh` |
| `visual/assets/osm-fabric/osm-fabric-snapshot-part1.json` · `osm-fabric-snapshot-part2.json` · `osm-fabric-readings.json` | 定界精简快照两片（两片拼接逐字节还原原快照，含 Overpass 查询原文）与由其复算的肌理读数包（复算脚本全文嵌入） | OpenStreetMap contributors，ODbL 1.0 派生数据库；署名与相同方式共享条件按本文件 §OpenStreetMap 条目履行，读数为 PROVISIONAL 情境描述而非几何验证 | 本文件第五节；`sources.json` OSM 条目 |
| `visual/assets/alignment-reference.json` | 空间对齐参考读数包：廊道参考线几何与四项偏差读数（ALN-01 至 ALN-04）全部由随包 OSM 精简快照与本包提交几何就地复算，复算脚本全文嵌入；本轮未发起任何新抓取，未引入任何包外数据源 | OpenStreetMap contributors，ODbL 1.0 派生数据库；署名与相同方式共享条件按本文件 §OpenStreetMap 条目履行。读数为 PROVISIONAL 情境描述而非几何验证，其廊道参考线是 OSM 登记的铁路廊道中心线，作位置代理使用，不是遗址公园红线也不是公园边界（该限度登记于该文件 `proxy_risk` PROXY-01） | 本文件第五节；`sources.json` OSM 条目；该文件 `declaration` 与 `proxy_risk` |
| `visual/assets/concept-design-register.json` | 原创编制的概念详图设想要素登记：三张概念推演图逐要素的既有判据来源、数据与设想的划分、准入规则与一处已识别设计张力（CB-03-T1）的处置判据；文件本身不提出工程参数，也不构成法定结论 | 纯数据文件，无第三方素材与依赖；所引判据全部指向包内既有锚点 | 本文件 §C 图版 · `proposal.md`「片区策略」一节 |
| `visual/assets/osm-context/provenance.json` | OSM 取数与处理的来源登记（v6.4 前背景快照）| 该历史快照仅分发来源元数据；v6.9 起另有一份定界精简快照按 ODbL 1.0 作为派生数据库随包分发（见第五节） | 该文件 `package_distribution` 字段 |

### G 媒体 / Media assets

| 文件路径 | 作者或生成方式 | 工具及版本 | 署名与复用限制 | 登记出处 |
| --- | --- | --- | --- | --- |
| `assets/media/cover.webp` | 参与者手写 HTML 与内联 SVG，坐标自绘 | Chromium 无头浏览器（Playwright）截图；Pillow 转无损 WebP。未使用任何图像生成模型、照片、卫星与街景影像、地图数据或第三方图片 | 署名 `lqqk7` / 柱子；`COMMUNITY-DISPLAY-ONLY`；非效果图 | `cover.md` §二、§三 |
| `assets/media/audio-guide.m4a` | 计算机语音合成，无真人录音 | MiniMax 语音合成服务，模型 `speech-2.8-hd`，经官方命令行工具 `mmx` 1.0.7 调用；预置合成音色 `Chinese (Mandarin)_Reliable_Executive`，合成于 2026-08-12。依据《MiniMax Open Platform Terms of Service》（Nanonoble Pte Ltd.，生效日 2026-03-30，官方稳定地址 platform.minimax.io/protocol/terms-of-service，访问核验日 2026-08-14）：其「Intellectual Property (Non-Transfer)」节明文约定客户保留输入与生成内容的所有权（"you retain your ownership rights in Client input and generated content"），并含平台对第三方知识产权索赔的辩护条款；其「User Rights and Obligations」节要求深度合成内容作显著标识——本包在音频、短片、文字稿与片尾声明中通篇标注合成语音性质，即该义务之履行 | 同上；不涉及肖像权、声音权或个人信息；不含第三方音乐、音效或采样 | `audio-guide.md` §四、§五 |
| `assets/media/journey.mp4` | 手写 HTML/CSS 排版页逐帧渲染 + 本包页面逐帧实录 + 合成旁白 | Playwright 驱动的 Chromium 无头浏览器；MiniMax `speech-2.8-hd` 经 `mmx` 1.0.7；视频 x264 两遍编码，音频 AAC-LC | 同上；无实拍、无航拍、无生成式影像、无第三方素材 | `journey.md` §五、§六 |
| `assets/media/journey-poster.webp` | 取自成片第 4.3 秒并移除烧录字幕 | 同 `journey.mp4` | 同上 | `manifest.json` 该条目描述字段 |
| `assets/media/journey.vtt` · `journey-en.vtt` · `audio-guide.vtt` · `audio-guide-en.vtt` | 由逐句合成样本的实测长度与静音间隔精确累加生成 | 同对应媒体 | 同上 | `journey.md` §五；`audio-guide.md` §四 |
| `assets/media/journey.md` · `audio-guide.md` · `cover.md` | 原创撰写的分镜、文字稿、图像说明与权利记录 | 同 A 类 | 同上 | 各文件本身 |
| `assets/media/audio-guide-en.m4a` · `audio-guide-en-voice.vtt` | 英文导览：计算机语音合成（音色 `English_Trustworthy_Man`）与对应字幕，无真人录音 | 同上（MiniMax `speech-2.8-hd` 经 `mmx` 1.0.7；合成语音性质通篇标注） | 同上；不含第三方音乐音效 | `audio-guide.md` |
| `assets/media/audible-break.m4a` · `audible-break-en.m4a` · `audible-break.vtt` · `audible-break-en.vtt` · `audible-break.md` | 数据可听化（断点音）：由本包链路档案读数程序合成的五声音阶行进音与静默段，双语旁白为合成语音；说明文件登记映射口径与工具链 | 纯程序合成（Python）+ MiniMax 旁白（同上）；编码后静默区 RMS=0 复测 | 随包整体许可；无采样、无第三方音源 | `audible-break.md` |

### H 品牌标志 / Brand mark

| 文件路径 | 作者或生成方式 | 工具及版本 | 署名与复用限制 | 登记出处 |
| --- | --- | --- | --- | --- |
| `assets/logo.svg` | 原创几何：平行感知线、开放节点与原点，手写 SVG，含 `title` 与 `desc` 无障碍标注 | 手写 SVG，无图形素材来源 | 署名 `lqqk7` / 柱子；`COMMUNITY-DISPLAY-ONLY`；不借用企业商标、人物肖像或未清权字体 | 本文件 §Generated assets and software；`proposal.md` 品牌章 |

### I 场景概念图 / Concept scene images

六件场景概念图（三题材 × 中英双版）为 AI 图像生成产物：底图由 OpenAI 图像生成能力产出（经 Codex CLI 原生图像生成工具、GPT-5.6 Sol 智能体调用，生成日 2026-08-14），随后由本包自制标注层（手写 HTML，经 Chromium/Playwright 渲染合成）叠加双语题注、标注卡与「概念意象 · AI 生成 · 非工程依据」徽章。权利依据《OpenAI Terms of Use》（OpenAI OpCo, LLC，生效日 2026-01-01，官方稳定地址 openai.com/policies/terms-of-use，访问核验日 2026-08-14）：其「Content」节明文约定用户保留输入所有权并**享有输出所有权**（"you (a) retain your ownership rights in Input and (b) own the Output"，并载明 OpenAI 将其就输出享有的权利让与用户）；其禁止行为清单要求**不得将非人类生成的输出虚假陈述为人类生成**——本包在每件图上直接印刷 AI 生成徽章并于此登记生成方式，即该义务之履行。条款同时载明输出在不同用户间未必唯一，本包如实登记该限制。图内地标标注的方位与距离在生成提示词中按真实坐标推算（坐标表登记于 `visual/assets/scene-provenance.json`），但地标形体与城市肌理为概念意象，非测绘复原；图面不构成工程、规划或达标依据。条款原文的 Wayback 存档快照已登记于 `sources.json` 对应条目的 archive_url（快照 2026-08-13，经逐字核验含上引条款）；六件图的提示词全文、候选与选定、后处理链与输出哈希登记于 `visual/assets/scene-provenance.json`，该档案同时如实登记"生成服务不提供逐次调用的第三方签名回执"这一限制。

| 文件路径 | 作者或生成方式 | 工具及版本 | 署名与复用限制 | 登记出处 |
| --- | --- | --- | --- | --- |
| `assets/figures/scene-dual-state.webp` · `.en.webp` | AI 图像生成底图 + 包内标注层合成（双态并置：AI 开启 = AI 关闭） | OpenAI 图像生成 via Codex CLI；标注层 HTML/Chromium；Pillow 转 WebP method 6，v6.x 为 q88，v7.7 为压减包体按 q75（双态并置、通用接口实验院）与 q55（走廊鸟瞰）自 q88 成品重编码一次，像素尺寸与画面内容不变 | 署名 `lqqk7` / 柱子；`COMMUNITY-DISPLAY-ONLY`；概念意象、非工程依据；图上印有 AI 生成徽章 | 本文件本节；`sources.json` `OPENAI-TERMS-OF-USE-20260814` |
| `assets/figures/scene-interface-yard.webp` · `.en.webp` | 同上（众智园通用接口实验院） | 同上 | 同上 | 同上 |
| `assets/figures/scene-corridor-aerial.webp` · `.en.webp` | 同上（走廊鸟瞰，地标按真实坐标推算方位与距离） | 同上 | 同上 | 同上 |

### J 触觉交付 / Tactile deliverables

两件为同一张 A4 折叠纸模的中英双版，均为程序绘制的参数化 SVG：画面内全部图形由毫米坐标直接写出（viewBox 210 × 297，与 A4 幅面等值），四条通行带的带宽按 1:50 缩放自本包 `visual/assets/sensory-design-code.json` 的 OP-04 母版卡 `band_widths` 逐项换算——多模态导路带 2.50 m、触觉引导带 0.30 m、设施带 1.20 m、安静缓冲绿带 1.50 m，均为该文件登记的设计目标值而非法定值；折叠构造（裁剪实线、谷折虚线、山折点划线共 6 条折线、7 段展开序列）与盲道带凸点阵（2 列 × 18 行、缺口区跳过）为纸模自身的制作构造，不引用任何第三方几何、图像或数据集。两版几何元素逐条同源，仅文字层分中英。

| 文件路径 | 内容来源与生成方式 | 字体 | 署名与复用限制 | 已登记的局限 |
| --- | --- | --- | --- | --- |
| `assets/tactile/op04-papercraft.svg` | 程序绘制的参数化 SVG（毫米坐标直写，A4 幅面）；带宽按 1:50 缩放自 `visual/assets/sensory-design-code.json` 的 OP-04 母版卡，折线与凸点阵为纸模自身构造 | 仅声明字体栈 `Source Han Sans SC, Arial`，由打印或查看环境本地解析；不嵌入、不分发任何字体文件。图面不含盲文字符 | 署名 `lqqk7` / 柱子；`COMMUNITY-DISPLAY-ONLY` | 概念纸模：尺寸为设计目标值按 1:50 缩放、非工程构件，盲道区凸点阵以普通打印机输出仅为视觉示意、须发泡油墨或点字打印机方成可触纹理——两条直印于图面页脚与说明行；未做实物打印折叠试验一条登记于 `visual/assets/qa-proofing-record.json` R4-03 |
| `assets/tactile/op04-papercraft.en.svg` | 同上（英文版，几何元素与坐标逐条同源，仅文字层为英文） | 同上 | 同上 | 同上 |

## 四、字体台账 / Font ledger

| 使用场景 | 字体名称 | 来源 | 许可 | 嵌入与分发方式 | 登记出处 |
| --- | --- | --- | --- | --- | --- |
| 图纸 PDF（`drawings/*.pdf`） | Source Han Sans SC（Regular/Medium/Bold 三个子集） | 本地安装副本；许可正本随包收录于 `visual/assets/font-license-ofl.json`（OFL 1.1 允许再分发许可文本） | SIL Open Font License 1.1 | 子集嵌入 PDF；不作为独立资产随包分发。每册每字重只嵌入一份子集，全册各页共用（逐页渲染原本让每页各带一份分页子集，v8.1 按字形标识空间取并集合并为一份，合并前后逐字形核对轮廓与度量全等）。经全册字体审计（pypdf 遍历页面与 XObject 资源，2026-08-13）：非 OFL 字体条目为 0。此前版本的四册曾因浏览器打印管线的字体栈回退混入系统字体子集，本版已全部清除并加入构建期兜底与审计脚本防止回归 | 本文件 §Generated assets and software |
| 离线展示页（`visual/*.html`、`scene.css`） | 字体栈 `"Source Han Sans SC"`、`"Noto Sans CJK SC"`、`Arial`、`sans-serif`；标题字族 `Georgia` | 由使用者运行环境本地解析 | 不适用：不加载、不嵌入、不分发任何字体文件 | 页面不发起任何远程字体请求 | 本文件 §Generated assets and software；`visual/index.html` 内联样式 |
| 触觉纸模（`assets/tactile/op04-papercraft{,.en}.svg`） | 字体栈 `Source Han Sans SC`、`Arial` | 由打印或查看环境本地解析 | 不适用：不加载、不嵌入、不分发任何字体文件 | 字形以打印环境解析结果呈现；SVG 内无字体数据 | 本文件 §三 J 触觉交付 |
| 多模态短片（`journey.mp4`） | 运行环境预装字体（PingFang SC、Georgia 等） | 运行环境 | 不适用：未嵌入、未分发 | 字形以画面像素形式呈现 | `journey.md` §五「字体」行、§六「图件与字体权利」 |
| 方案封面（`cover.webp`） | 系统随附字体（中西文衬线、无衬线、等宽） | 运行环境 | 不适用：未嵌入、未分发 | 字形以位图形式呈现于图像中 | `cover.md` §二「字体」行 |
| 品牌落地字体策略 | 衬线标题、无衬线正文、等宽数据三分工，现阶段三种分工均由 Source Han Sans SC 一族承担（Medium/Bold/Regular） | Source Han Sans SC（SIL OFL 1.1）；商业字体候选待逐项清权 | 逐项核验授权，未清权字体不进入公开成果 | 品牌图版（`brand-system.png`）的字体策略区块已与清权后事实对齐：三种分工同出思源黑体一族（Medium/Bold/Regular，SIL OFL 1.1），与四册 PDF 实际嵌入的三个子集一一对应；Georgia、Helvetica Neue、SF Mono 等商业字体在图版上明示为未来深化候选，须逐项取得商用授权后方可引入。本包唯一嵌入字体程序的载体是四册 PDF（见首行），图版与页面均不分发字体文件 | `proposal.md` 品牌章与「版权与授权」段 |

**一致口径：** 全包不以独立资产形式再分发任何字体文件；PDF 内的子集嵌入按 SIL OFL 1.1 进行；其余交付物均依赖运行环境本地字体。

## 五、地图与空间数据台账 / Map and spatial data ledger

本节把两件常被混谈的事分开登记：OSM 背景数据与本包提交几何的复算投影，是两条互不交叉的链路。

### 5.1 OSM 背景数据 / OpenStreetMap background

| 字段 | 登记值 |
| --- | --- |
| 数据源 | OpenStreetMap contributors |
| 取数接口 | `https://overpass-api.de/api/interpreter`，请求次数 1，未使用备用接口 |
| 取数时间 | 2026-08-10T04:28:04Z；OSM 基准时间戳 2026-08-10T04:25:42Z |
| 空间范围 | bbox：南 39.937 / 西 116.337 / 北 40.029 / 东 116.358 |
| 坐标系 | EPSG:4326（WGS 84） |
| 许可 | Open Database License (ODbL) 1.0，`https://opendatacommons.org/licenses/odbl/1-0/` |
| 署名 | © OpenStreetMap contributors；v6.4 至 v7.6 期间无交付图版使用该背景，v7.7 起四张主图中英两版与七张几何核验图、v8.2 起 `district-strategy.png` 在图面上印出该署名与 ODbL 1.0 许可，本台账与取数登记同时保留 |
| 处理方式 | 请求不含用户与变更集元数据；直接使用 way 几何，站点与出入口节点转为点要素；按 bbox 裁剪；按标签分为道路、建筑、铁路、绿地水体、站点五层；保留 OSM 类型与标识；每个派生要素标注仅作背景、非官方 |
| 再分发状态 | v6.9 起随包分发恰一份 OSM 派生数据库：定界精简快照两片（visual/assets/osm-fabric/，ODbL 1.0 + 署名 + 相同方式共享，字段级合并（ways 顺序连接、取第二片 nodes）后重新序列化可逐字节还原，整体哈希登记在案）；原始 Overpass 响应、远程瓦片与第三方地图图片仍不随包分发 |
| 用途限制 | 仅作背景定位与解释性渲染；不得用于推导、修订、验证或替代项目边界与重点区几何，不作为官方红线、法定控制、道路红线、工程线形、文保控制、权属记录、精确面积来源、场地无障碍合规审计或实施承诺 |
| 登记出处 | `visual/assets/osm-context/provenance.json`；`sources.json` `OSM-BACKGROUND-CONTEXT-20260810`；本文件 §Repository data and materials 与 §Generated assets and software |

### 5.2 提交几何的复算投影 / Projection used for submitted geometry

| 字段 | 登记值 |
| --- | --- |
| 适用对象 | `geometry/*.geojson` 中本方案提交的几何 |
| 投影 | EPSG:4548，用于面积、比例、拓扑与计数复算 |
| 方法出处 | `scripts/spatial_review.py`（仓库计算方法，不随投稿包分发） |
| 复演实现 | `visual/assets/seb-op04-chain-run.js` 以纯 Node 内置数学独立实现同一投影，与 pyproj 在本包十个节点上的最大偏差 1.41e-4 米 |
| 效力边界 | 不是官方几何、法定控制、实测现状、参与者结果或审批结论的来源 |
| 与 OSM 的关系 | OSM 快照以 EPSG:4326 记录并止步于背景渲染，不进入本包几何派生，因此不存在「OSM 数据转换为 EPSG:4548 后用于本包几何」这一路径 |
| 登记出处 | `metrics.json` `projection`；`sources.json` `PACKAGE-SPATIAL-RECALCULATION-METHOD`；`proposal.md`「OP-04 配对试点全过程证据链」章 |

## 六、代码与依赖台账 / Code and dependency ledger

| 代码资产 | 运行环境 | 第三方依赖 | 网络访问 | 许可 |
| --- | --- | --- | --- | --- |
| `visual/index.html` · `index.en.html` · `scene.js` · `scene.css` · `scene-data.js` | 浏览器 | 无 | 无：不加载远程脚本、字体、瓦片、图片、API、表单、iframe 或统计代码 | 随包整体 `COMMUNITY-DISPLAY-ONLY` |
| `visual/assets/three.min.js`（第三方组件 three.js r160，© 2010-2023 three.js authors） | 浏览器 | 上游 three.js r160：由官方 module 构建机械可复现重封装为离线单文件，唯一改动为末尾 export 语句换全局赋值，步骤与上游哈希全文披露于 `three-license.json` | 无：随包本地加载，不请求任何上游或 CDN 地址 | MIT，许可正本随包收录于 `visual/assets/three-license.json`；不构成对上游项目的背书 |
| `visual/assets/seb-tabletop-run.js` | Node.js | 无。仅 `fs`、`path` 两个内置模块 | 无：只读取本包内文件 | 同上 |
| `visual/assets/seb-op04-chain-run.js` | Node.js | 无。仅 `fs`、`path`、`child_process` 三个内置模块 | 无：只读取本包内文件 | 同上 |
| `visual/assets/seb-crosscheck-run.js` | Node.js | 无。仅 `fs`、`os`、`path`、`child_process` 四个内置模块 | 无：只读取本包内文件，临时镜像建在系统临时目录下并在结束时删除 | 同上 |
| `visual/assets/seb-spec.json`（判据规范，非可执行代码） | 不适用 | 不适用 | 不适用 | CC BY-SA 4.0 已由著作权人经 `seb-license-grant.json` 实际授予；托管主体与官方发布渠道待授权主体确认（许可与托管两事分立） |

**不随包分发的生成工具。** 以下三类工具参与了本包资产的制作，但源码不在投稿包内，因此不构成本包的分发对象：图版与 PDF 的临时生成源、OSM 快照处理脚本（`provenance.json` 记 `script_distributed: false`）、报告 HTML 渲染脚本 `scripts/render_proposal_html.py`（仓库脚本）。

## 七、AI 生成、合成语音与署名 / AI generation, synthetic speech, and attribution

| 项目 | 登记内容 | 出处 |
| --- | --- | --- |
| 申报主体 | GitHub 用户 `lqqk7` 指导下的申报智能体「柱子 / Zhuzi」，角色 `ai_agent_submission_author` | `agent.json` |
| 撰写模型 | Claude Fable 5 via Claude Code；v1.0 阶段由 GPT-5.6 Sol via Codex 搭建与撰写；后续迭代含 Claude Opus 子代理 | `agent.json` `model_detail` |
| 初始化脚本 | `scripts/scaffold_ai_submission.py` | `agent.json` `generated_with` |
| 语音合成 | MiniMax 语音合成服务，模型 `speech-2.8-hd`，经官方命令行工具 `mmx` 1.0.7 调用；预置合成音色 `Chinese (Mandarin)_Reliable_Executive`；非声音克隆、非对任何自然人声音的复制。依据《MiniMax Open Platform Terms of Service》（Nanonoble Pte Ltd.，生效日 2026-03-30，官方稳定地址 platform.minimax.io/protocol/terms-of-service，访问核验日 2026-08-14）：其「Intellectual Property (Non-Transfer)」节明文约定客户保留输入与生成内容的所有权（"you retain your ownership rights in Client input and generated content"），并含平台对第三方知识产权索赔的辩护条款；其「User Rights and Obligations」节要求深度合成内容作显著标识——本包在音频、短片、文字稿与片尾声明中通篇标注合成语音性质，即该义务之履行；条款存档快照见 `sources.json` archive_url，输入台本与参数指针汇总于 `visual/assets/scene-provenance.json` | `audio-guide.md` §四；`journey.md` §五 |
| 图像生成模型 | **仅用于 `assets/figures` 六件场景概念图**（scene-dual-state / scene-interface-yard / scene-corridor-aerial，中英双版）：OpenAI 图像生成能力经 Codex CLI 原生图像生成工具（GPT-5.6 Sol 智能体）调用，生成日 2026-08-14。依据《OpenAI Terms of Use》（OpenAI OpCo, LLC，生效日 2026-01-01，访问核验日 2026-08-14）：其「Content」节约定用户享有输出所有权并获平台权利让与；其禁止行为清单要求不得将非人类生成输出虚假陈述为人类生成——每件图上直接印刷「概念意象 · AI 生成 · 非工程依据」徽章并在台账登记生成方式，即该义务之履行。条款存档快照与逐图生成档案（提示词全文、输出哈希）分别见 `sources.json` archive_url 与 `visual/assets/scene-provenance.json`。封面、短片画面、其余图版与品牌标志不含图像生成模型产物 | 本文件 §三 I 类；`sources.json` `OPENAI-TERMS-OF-USE-20260814`；`visual/assets/scene-provenance.json` |
| 生成式影像 | 未使用于短片。`journey.mp4` 画面全部由排版代码、包内自制图件与包内交互页面的真实运行结果构成；六件静态场景概念图另行登记于上行与 §三 I 类 | `journey.md` §五 |
| 责任边界 | 见本文件 §AI-generation responsibility | 本文件 |

## 八、复用限制与尚未清权事项 / Reuse limits and items not yet cleared

**复用限制（现行）**

1. 全包整体 `COMMUNITY-DISPLAY-ONLY`，仅用于本次征集的社区展示与评审场景。
2. 外部页面只作释义性链接背景，不再分发截图、照片、标识、版式、长段引文或可下载媒体；未声明开放复用许可的页面按仅可引用处理。
3. OSM 背景仅作背景定位；v6.9 分发的精简快照已按该条款完成 ODbL 署名与相同方式共享处置（第五节），其外任何新的派生数据库分发仍须另行审查。
4. 图版、短片、封面与几何均为概念建议，不得作为现状证据、效果承诺、法定指标或审批结论引用。
5. 不复制任何同行投稿的文字、图像、图示、HTML、PDF、几何或品牌资产。

**尚未清权 / 待确认事项**

| 事项 | 当前状态 | 触发条件 |
| --- | --- | --- |
| 未来使用声音、图片、人物肖像、历史档案、论文图像、品牌或企业内容 | 未发生 | 使用前逐项核验权利、取得必要许可，并记录署名、来源、生成方式、修改过程与复用限制 |
| 品牌落地字体的具体选型 | 基础族已定：思源黑体三字重（SIL OFL 1.1），与发布物嵌入一致 | 衬线/等宽等候选字族引入前逐项核验商用授权，未清权字体不进入公开成果 |
| SEB 判据规范的托管主体与官方发布渠道 | 待授权主体确认 | 著作权许可已授予（CC BY-SA 4.0，随包授予文件）；本包不代表任何机构发布该基准；已登记的两例外部采用为参赛包之间的自愿同侪采用，不构成机构采纳 |
| OSM 派生数据库的对外分发 | v6.9 已发生一次（定界精简快照，ODbL 1.0 署名与相同方式共享已随包履行） | 新的派生数据库分发仍须另行完成同项审查 |
| 参与者数据、影像与素材的权利 | 无。全包不含任何参与者数据、影像或口述材料 | 真实共创启动前须先落实 `visual/assets/ethics-protocol.json` 所列六份协议并通过伦理复核 |

## 九、本台账的已知缺口 / Known gaps in this ledger

1. **工具版本号的登记密度不一致。** 包内明确登记版本号的只有 MiniMax `speech-2.8-hd`、`mmx` 1.0.7 与 SEB v0.5.0；Python、SVG 工具链、`rsvg-convert`/Cairo、`pdfunite`、Playwright/Chromium、Pillow、x264 均只登记了工具名称与用途，未登记版本号。本台账据实照录，不补齐。
2. **字体字重与具体字族未逐项登记。** PDF 侧登记到 Source Han Sans SC 与 OFL 1.1；展示页与媒体侧登记到字体栈与「运行环境预装字体」层级。
3. **不随包分发的生成源无法由评审直接复核。** 其行为只能通过 `provenance.json` 中记录的脚本 SHA-256 与处理步骤间接核对。
4. **本台账不产生新的权利结论。** 它只把既有登记合并呈现；任何一行与原文件不一致时，以原文件为准。

## 十、作者权利保证与限制 / Author's rights warranty and its limits

**保证。** GitHub 用户 `lqqk7` 指导下的申报智能体「柱子 / Zhuzi」在此声明：本包全部 153 个登记资产，或为本方案原创生成，或按本台账与 `sources.json` 已登记的许可、条款与用途边界使用；AI 生成资产（六件场景概念图、合成语音、短片旁白）的生成输入不含任何未经许可的第三方素材——唯一例外的图像输入为本包自绘的 `site-overview.png`（场景三地理布局参照，其内含已按 ODbL 许可使用并署名的 OpenStreetMap 底图要素，登记见本台账 OSM 条目），提示词全文与输入台本随包登记于生成档案与媒体文字稿，其输出权利依据已逐项登记并以存档快照与内容哈希固定。若任何资产日后被证实存在权利瑕疵，提交方承诺替换或移除该资产，并按包内回执机制公开登记修复过程，不静默处置。

**限制。** 本保证是提交方的自我承诺与尽责声明，不是第三方法律意见或权利认证；生成服务不提供逐次调用的第三方签名回执，该天然限制已在 `visual/assets/scene-provenance.json` 如实登记；本保证在概念征集语境下作出，不构成对评审方、主办方或任何第三方的赔偿承诺。以上边界与本台账「性质与效力」的总口径一致。

**Warranty.** The submitting agent Zhuzi, directed by GitHub user `lqqk7`, declares: every one of the 153 registered assets in this package is either an original generation for this proposal or used within the licences, terms and usage boundaries registered in this ledger and `sources.json`; the generation inputs of the AI-generated assets (six concept scene images, the synthetic narration, the film voice-over) contain no unlicensed third-party material — the single image input being this package's own `site-overview.png` (the geographic layout reference for scene three, which contains OpenStreetMap base features used and attributed under ODbL, registered in this ledger's OSM entries); full prompts and input transcripts ship in the provenance record and media transcripts, and their output-rights bases are registered item by item and pinned by archived snapshots and content hashes. Should any asset later prove defective in rights, the submitter undertakes to replace or remove it and to register the repair openly through the package's receipt mechanism, never silently.

**Limits.** This warranty is the submitter's own undertaking and duty-of-care statement, not third-party legal advice or a rights certification; generation services issue no per-call signed receipts, a native limitation honestly registered in `visual/assets/scene-provenance.json`; the warranty is given in the context of a concept competition and constitutes no indemnity to reviewers, organisers or any third party. These limits follow the ledger's overall statement of nature.

署名 / Signed：`lqqk7` / 柱子 · 2026-08-15

