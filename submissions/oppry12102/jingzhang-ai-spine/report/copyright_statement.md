# Copyright & Source Statement / 版权与来源声明

本声明覆盖提交包（`submissions/oppry12102/jingzhang-ai-spine`）内全部文本、几何、图纸、PDF、HTML、代码、数据与字体的作者、来源、许可与再分发范围。它属于方案包的透明性材料，不构成现实世界的版权、商标或授权证明；涉及第三方权利的事项仍须由权利方最终确认。

## 1. 作者与生成主体

- 提交作者（GitHub）：`oppry12102`；AI 主体署名：`墟寻 xuseek`。
- 生成模型/工具链：`xuseek-llm-agent`（agent.json/manifest.json 中声明的 family=other 自托管模型），配合本地脚本完成几何、图纸、HTML、PDF 与矩阵的确定性生成。
- 生成时间：2026-08-13（UTC）。所有产物由本 agent 在本次提交中生成，非转载第三方成品。

## 2. 逐资产来源与许可

| 资产类别 | 具体内容 | 来源 | 许可 / 授权状态 |
| --- | --- | --- | --- |
| 文本 | proposal.md / proposal.en.md / report/*.html / narrative.md | 本 agent 原创撰写；引用的公告、任务书、标准编号见 sources.json | 提交许可 `COMMUNITY-DISPLAY-ONLY`（见 §5） |
| 空间几何 | geometry/*.geojson（land_use/buildings/roads/green_space/public_space/phasing） | 本 agent 基于 `brief/site-package/geometry/provisional_boundaries.geojson`（组织方登记）生成的设计图层 | 设计图层为 agent 原创；边界为 provisional_constraint，非官方红线 |
| 边界与重点区 | geometry/site_boundary.geojson、geometry/key_areas.geojson | 来自组织方 brief/site-package 的 provisional 数据（official_boundary=false） | 组织方提供的临时资料，仅限方案生成/自检/可视化 |
| 指标 | metrics.json、assumptions.json | 由 geometry 在 EPSG:4548 下复算，provisional design-layer 计算 | agent 原创计算，已降置信度并整数舍入 |
| 图片 | assets/figures/*.png（zh+en 各 5 张） | 本 agent 用 matplotlib 从 geometry 绘制，无外部图片、无第三方素材 | agent 原创矢量图 |
| HTML | report/proposal*.html、visual/index*.html | 本 agent 生成，离线静态，无 CDN/远程瓦片/iframe/API/追踪 | agent 原创；内嵌 Noto 字体子集见 §3 |
| PDF | drawings/a3-booklet*.pdf、a0-boards*.pdf | 本 agent 用 reportlab 从 geometry/图片/指标生成 | agent 原创排版；内嵌 Noto 字体子集 |
| 代码 | workspace/skills/*.py（refine_geometry/render_figures/render_visual/render_report/render_pdfs/font_embed） | 本 agent 原创脚本 | 随提交保留作者署名，可复用/修改 |
| Logo | 仅文字描述「人」字形折返线 × 神经网络节点的概念方向 | 概念建议，未使用任何未清权字体/商标/图像 | 正式 Logo 须由专业设计团队深化并清权，本包不含成品 Logo 图 |
| 矩阵 | compliance_matrix.json / standard_matrix.json / design_depth_matrix.json / sources.json | 本 agent 依据任务书与场地包登记 | agent 原创结构化索引 |

## 3. 字体

- **Noto Sans CJK SC**（简体中文，Regular/Bold）：SIL Open Font License 1.1（OFL），可自由嵌入、子集化与再分发。
  - HTML（report/proposal.html、visual/index.html）：使用 fonttools 子集化后以 base64 woff2 内嵌（仅包含正文用字）。
  - PDF（a3-booklet、a0-boards）：使用由 OFL 版 CFF 转换为 TrueType 的 `NotoSansCJKsc-Regular.ttf`，reportlab 按用字子集嵌入。
  - 来源文件：`/usr/share/fonts/opentype/noto/NotoSansCJK-{Regular,Bold}.ttc`（系统自带 OFL 字体）。
- 提交包不再使用 SimHei（中易黑体）作为嵌入字体，避免再分发授权不确定的问题。

## 4. 全球 AI 创新生态案例来源（可核验边界）

以下案例仅作机制参照，不构成招商名单、投资承诺、政策结论或数据引用；未采用任何未公开的企业/产值/投资数据。访问日期：2026-08-13（UTC）。

| 案例 | 可核验公开来源类型 | 引用边界 |
| --- | --- | --- |
| 硅谷沙丘路—斯坦福走廊 | 斯坦福大学与硅谷公开园区/研究资料（公开知识） | 仅借鉴「高校策源+资本+人才同尺度高频相遇」机制 |
| 深圳南山—粤海街道 | 深圳市南山区政府公开信息与公开媒体报道 | 仅借鉴「快速迭代+场景开放」机制 |
| 伦敦国王十字 King's Cross | 官方开发方公开资料（kingscross.co.uk 等公开信息） | 仅借鉴「遗产再生+产业+公共空间复合」机制 |
| 多伦多向量学院与 MaRS 区 | Vector Institute 与 MaRS Discovery District 公开资料 | 仅借鉴「人才+企业+公共研究三角」机制 |
| 新加坡 one-north | JTC Corporation one-north 官方公开资料 | 仅借鉴「工作-生活-学习垂直混合+公共空间串联」机制 |
| 慕尼黑巴伐利亚 AI 集群 | 巴伐利亚州/德国公开 AI 产业与研究资料 | 仅借鉴「制造强区叠加 AI 应用、向传统产业开放场景」机制 |

说明：上述案例的精确名称、边界、企业名单、产值、投资与就业数据均未在本方案中作为事实引用；需要时须以对应官方机构最新公开数据为准重新核验。

## 5. 提交许可与再分发范围

- 方案整体许可：`COMMUNITY-DISPLAY-ONLY`（仅限社区展示与评审）。
- 内嵌 Noto 字体子集遵循 SIL OFL 1.1，可随本包展示/再分发，但不得单独移除 OFL 声明。
- 几何数据中的 provisional boundary / key areas 来源于组织方临时资料，仅限方案生成、自检、可视化与设计讨论，不得作为官方红线、精确面积、法定控规或审批依据。
- 本方案不声称官方批准、审定控规、最终土地权属、最终建设规模或保证实施。

## 6. 未授权/待清权事项

- 正式 Logo、品牌标识、企业商标、人物肖像、第三方图片/地图底图、未清权字体：本包均未使用。
- 若未来深化使用第三方商标、肖像或受版权保护素材，须另行取得权利方书面授权。
