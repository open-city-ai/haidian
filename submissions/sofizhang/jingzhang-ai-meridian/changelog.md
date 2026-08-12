# 方案迭代记录

## v3.2 - 2026-08-11

- **写实风格效果图 / Photoreal-style render added.** 新增第四张双语效果图 `render-axis-goldenhour`（零北绿轴·黄金时刻）：遗址公园贯通绿道人视角单点透视场景——双骑行道、轨道记忆带、K5 站牌与站点证据牌、人字桥·智汇之门远景、逆光树影与黄昏天光。与前三张的『夜间线路图』品牌不同，本张为仿照片质感的写实风格：由 render_scenes.py 参数化自绘（透视投影、大气透视、逆光长影）并经开源 Pillow 程序化后期（光晕/颗粒/暗角），全程未使用照片、外部影像或图像生成模型，图内如实标注生成方式。嵌入正文（中英）蓝绿空间章节与 visual 看板（中英）交通慢行区；版权声明第 3 条同步补充程序化后期说明。A3/A0 图册保持 v3.0 版面。
- A fourth bilingual render, `render-axis-goldenhour` (The Green Axis at Golden Hour): a one-point-perspective, eye-level scene on the through-greenway atop the built relic park — twin cycle tracks, the rail-memory median, the K5 board with its Station Evidence Board, the Herringbone Gate in the distance, backlit long shadows and dusk light. Unlike the three night-brand renders it is photoreal-STYLE: drawn parametrically by render_scenes.py (perspective projection, aerial perspective, backlight) and finished with a procedural open-source Pillow post chain (bloom / grain / vignette) — still no photographs, external imagery or image-generation models, with the generation method stated inside the frame. Embedded in both proposals (blue-green chapter) and both dashboards (mobility section); copyright statement §3 updated accordingly. A3/A0 boards keep the v3.0 layout.

## v3.1 - 2026-08-11

- **效果图增强 / Concept renders added.** 新增三张双语概念渲染图并嵌入正文与离线看板：① `render-night-aerial` 全带夜景鸟瞰（绿轴发光、四大地标信标、按层数拉伸的概念体量、缝合环与河流走廊，方位以 K0 零公里为南端锚定）；② `render-herringbone-gate` 人字桥·智汇之门近景鸟瞰（『人』字双轨合流桥面为设计意向叠加，坡道落地、走廊轨道与清华园车站旧址广场人流为几何派生）；③ `render-k0-plaza` K0 零公里广场人视角（零公里纪念环、K0 站牌与 v3.0 站点证据牌三条公约状态实景化）。全部由自研开源脚本 render_scenes.py（matplotlib 参数化）自绘派生自 geometry/*.geojson，未使用图像生成模型、照片或第三方素材，图内均标注「概念渲染·非照片仿真」。正文（中英）、visual 看板（中英）与版权声明同步更新；A3/A0 图册保持 v3.0 不变。
- Three bilingual concept renders embedded in the proposals and offline dashboards: a night aerial of the whole belt, a close-up aerial of the Herringbone Gate ("two tracks merge" deck as declared design overlay), and an eye-level view of K0 Zero-Kilometre Plaza materializing the v3.0 Station Evidence Board covenants. All drawn parametrically from the package geometry by the self-built open-source script render_scenes.py — no image-generation model, photography, or third-party assets; each frame is labelled "concept render, not photorealistic". A3/A0 booklets unchanged from v3.0.

## v3.0 - 2026-08-11

- **治理与实证补强 / Governance & evidence hardening.** ① 场景治理运行表：12 张场景卡逐卡登记「无AI等价路径—停止条件—退出与空间回归」，确立全线『零北公约』三条（失败与成功等量公示 / 人工路径不得更慢更贵 / 公共空间默认不参与），K0-K9 站牌配套「站点证据牌」实体公示治理状态；② 指标诚实化：新增用地拓扑质检指标（覆盖缺口 85.2㎡、单元重叠 0、越界残差 105.2㎡）与「官方法定控规指标可得数=0」显式声明，明确几何复算/文档计数/运营目标三类口径；③ 已建成基底登记：遗址公园二期 2026-08-06 建成开放（西直门—北五环约9公里）登记为现状基底，绿轴表述改为「建成公园之上的叠加运营，不重复建设」；詹天佑致敬锚定带内清华园车站旧址——全线仅存「詹天佑书」手迹站匾（2023年市保、进京赶考第一站），Logo 释义明确『双轨合流』而非『折返』。A3/A0 图册保持 v2.0 版面，治理运行表以正文与结构化文件为准（结构化文件为权威数据层）。
- Governance operations table for all 12 scenario cards (non-AI equivalent path / stop conditions / exit & spatial reversion), the three-article North-of-Zero Covenant, and physical Station Evidence Boards paired with the K0-K9 boards; metrics honesty upgrade (land-use topology QC: gap 85.2 m², overlap 0, outside 105.2 m²; explicit "0 official planning controls available"; three metric calibres); built-baseline registration of the park's Phase II (opened 2026-08-06, Xizhimen to the North Fifth Ring) and the Zhan Tianyou homage anchored to the Tsinghuayuan Station historic site — the line's only surviving station plaque in his own hand; the herringbone read as "merger", not "switchback". A3/A0 boards keep the v2.0 layout; the governance table lives in the narrative and structured files (the authoritative data layer).

## v2.0 - 2026-08-11

- **主名称更名 / Renamed.** 「京张智脉 · The Jing-Zhang AI Meridian」→「**零公里以北 · NORTH OF ZERO**」：命名锚定京张铁路历史零公里标（西直门·北京北）——本带正是零公里以北的 9.7 公里；『零』兼指里程原点、从零到一的自主创新原点与"AI以人为原点"的价值原点。改名同步贯通正文（中英）、几何要素命名（零北绿轴/零北绿道）、五张图、A3/A0、离线看板与品牌章；K0-K9 站点系统、人字形双轨 Logo 方向不变，目录 slug 保持 jingzhang-ai-meridian 以维持提交历史连续。避免与其他参赛方案的名称元素重合。
- Renamed to NORTH OF ZERO, anchored on the railway's historic kilometre-zero marker at the corridor's south end; all bilingual artifacts regenerated; K0-K9 stations and the herringbone logo direction unchanged; directory slug intentionally retained.

## v1.3 - 2026-08-10

- **字体与可读性 / Typography.** 全套图纸与 PDF 换用思源黑体（Noto Sans CJK SC，含真粗体）与 Noto Sans（SIL OFL 1.1），全局字号提升约 15%，标题层级更清晰；版权与来源登记同步更新。
- Switched all drawings and PDFs to Noto Sans CJK SC (with true bold) and Noto Sans; global font sizes up ~15% for readability; rights records updated.

## v1.2 - 2026-08-10

- **专业规划图版换肤 / Professional planning-board re-skin.** 全套图纸改为浅色专业制图语言：淡彩用地（鼠尾草绿系）、公园树木肌理、建筑白底落影、道路双线画法；A0 展板一主视觉改为矢量总平面图；新增原点社区轴测效果页（2.5D 概念体块+人字桥）；五张正文图同步换肤。
- Re-skinned all drawings to a light professional palette (sage greens, dusty pastels), masterplan textures (tree stipple, building shadows, road casings); Board 1 hero is now a vector masterplan; added an axonometric concept view of the Origin Community with the Herringbone Gate.

## v1.1 - 2026-08-10

- **视觉系统重构 / Visual system rebuilt.** A3 图册重做为 12 页"夜间线路图"设计系统：地铁风格全方案线路图、三段城市设计断面（众智园/原点/大钟寺）、人字桥专页、12张场景票卡墙、6张乘客卡与一日旅程带、18项目时刻表与指标仪表盘；A0 展板全矢量重绘（线路图版+枢纽证据版）。
- Added the K0-K9 station-system table to both proposals; drawings and narrative now share one milestone vocabulary. Rebuilt A3 (12-page night transit-map system with sections, ticket wall, personas, timetable, dashboard) and fully vectorized A0 boards.

## v1.0 - 2026-08-10

- **京张智脉 · The Jing-Zhang AI Meridian 首版正式包 / First formal package.**
- 生成"一脉三枢、两翼六环"空间结构：33 个用地单元完整分区、64 处概念体量、22 条道路要素、六条缝合环、四处朝圣地标与 12 个场景节点，全部面积在 EPSG:4548 下复算。
- Built the full bilingual package (zh primary + en counterpart): proposal, five paired figures, offline visual dashboards, A3 booklet and A0 boards, matrices, metrics, sources and assumptions.
- 空间审查、可视化审查、专业证据审查与确定性校验本地全部通过；临时边界与数据缺口按规则登记于假设清单与风险章节。
