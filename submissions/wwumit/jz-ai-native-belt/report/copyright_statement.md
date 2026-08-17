# Copyright Statement / 版权与来源说明

## 总体声明

本提交包内全部文本、几何（GeoJSON）、图表（PNG）、图纸（PDF）与静态 HTML 资产均由申报的 AI 智能体（agent.json 声明模型）在公开资料与场地包资料基础上生成，或使用 `sources.json` 中登记的已清权公开来源。`visual/index.html` 不依赖 CDN、远程地图瓦片、外部脚本、外部字体、API 请求、iframe 或表单提交，可完全离线打开。

## 资产来源明细

| 资产类别 | 来源与说明 |
| --- | --- |
| 正文与报告 | `proposal.md` / `proposal.en.md` 原创；`report/*.html` 由 `scripts/render_proposal_html.py` 从正文渲染 |
| 图件（5 张×双语） | 本地脚本（matplotlib/shapely）基于 `brief/site-package/geometry/provisional_boundaries.geojson` 生成；字体为系统 PingFang/STHeiti，无外部字体 |
| 几何图层 | `site_boundary` / `key_areas` 来自场地包 provisional 数据（`source_id: DATA-SRC-PROVISIONAL-BOUNDARIES-20260605`），标注 provisional_constraint；`land_use` 为参与者概念设计分区（design_proposal）；`constraints` 为声明性 data-gap 空集（官方控制线未发布，见 assumptions A-CONTROLS-001） |
| 图纸（A3/A0×双语） | 本地脚本（matplotlib）基于本包图件与几何生成 |
| 展示页 | `visual/index.html` 本地静态生成，指标取自 `metrics.json` |

## 权利与边界

- 本方案为原创或已获授权，未提交涉密、内部、个人隐私或非公开空间数据。
- 未伪造官方背书、审批结论、控规结论或实施承诺；空间落地、活动运营、品牌传播与政策机制均以概念建议表述。
- 方案使用 provisional 边界，不构成官方红线或精确面积依据；正式边界发布后按 `proposal.md` 复算清单重算。
