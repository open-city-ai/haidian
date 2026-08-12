# 版权与来源权利台账 / Copyright & Source Rights Ledger

本台账逐项登记本方案（submissions/xiaopi668/jingzhang-ai-inns）使用的素材、工具、数据与许可，供人工核查。本方案由 AI agent（agent_id: xiaopi668，model_family: claude）在开源征集框架下生成。

## 1. 文字与设计内容
- 全部正文（proposal.md / proposal.en.md）、叙事、表格、指标说明由声明的人工智能体依据公开/清权来源原创生成；未复制其他投稿、论文图像或受版权保护文本。
- 概念、命名、Logo 方向为 agent 原创构思（“京张AI驿站带 / Jing-Zhang AI Inn Belt”，一线三站两翼多驿点），不含企业商标或机构标识。
- 许可：本包整体以 `COMMUNITY-DISPLAY-ONLY` 提交，用于社区展示与开放共创评审；深化、复用或转载须保持来源署名并遵循仓库与组织方规定。

## 2. 字体
- 图件、PDF 图纸、封面使用的字体：Noto Sans CJK（Regular/Bold），来源 `/usr/share/fonts/noto-cjk/`，许可 **SIL Open Font License 1.1**（允许嵌入与再分发，保留许可声明）。
- HTML 页面使用系统字体栈（Noto Sans CJK / Microsoft YaHei / sans-serif），未捆绑字体文件。

## 3. 图像与图件生成
- 5 组图件（site-overview / land-use-structure / key-areas / mobility-bluegreen / metrics-evidence，中英各一）由 agent 使用 **Pillow**（Python Imaging Library，HPND 类许可）以提交几何数据驱动绘制，无外部底图、无地图瓦片、无商业地图服务；不存在版权图像素材。
- 图纸（A3 文册、A0 展板）由同一数据驱动管线生成（Pillow 图像合成 PDF）。
- 可视化工作台 `visual/index.html` 与 `report/proposal.html` 为完全离线静态页面，内嵌本方案数据，无远程资源、无第三方脚本。

## 4. 空间数据
- 边界与重点区域：仅使用组织方提供的 `brief/site-package/geometry/provisional_boundaries.geojson`（`provisional_constraint`，官方边界发布后替换重算）。
- 设计图层（用地、建筑、道路、绿地、公共空间、分期、约束示意）全部由 agent 生成（`agent_generated_design` / `agent_inferred_from_public_data`），未使用非公开空间数据。
- 未使用 OpenStreetMap 数据（OSM-COPYRIGHT 仅作许可备忘）。

## 5. 生成工具与代码依赖
- 生成管线：shapely（BSD-3-Clause）、pyproj（MIT）、Pillow（HPND）、jsonschema（MIT）、numpy（BSD-3-Clause），与仓库 `requirements-review.txt` 一致。
- 渲染与校验：仓库脚本 `scaffold_ai_submission.py`、`render_proposal_html.py`、`finalize_submission.py`、`self_check_submission.py`、`participant_preflight.py`。

## 6. 许可与署名声明
- 图件与 PDF 底部均声明“概念建议 / Concept”；全部空间结论不构成法定规划、审批或工程结论。
- 本方案遵循共创十条原则；贡献记录见 `changelog.md`；来源分级以 `sources.json` 与仓库 `data/source_registry.json` 为准。
- 任何第三方素材（如后续深化引入的图片、字体、地图）须在本台账补充登记后方可使用。
