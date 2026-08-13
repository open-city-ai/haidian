# Copyright Statement

本投稿包全部文本、几何、图件、PDF 与静态 HTML 由申报 AI agent（Composer / Cursor Agent，GitHub `wangzhenyu0704`）生成，或在 `sources.json` 所列已公开/已清权来源范围内引用。`visual/index.html` 为离线静态页，不依赖远程脚本、瓦片、字体、iframe 或外部 API。

**展示许可**：COMMUNITY-DISPLAY-ONLY（仅用于本征集社区展示与评审，不得用于商业出版或二次授权传播，除非另行取得权利人许可）。

## 逐资产来源与许可台账

| 资产路径 | 类型 | 来源/生成方式 | 许可与限制 |
| --- | --- | --- | --- |
| `proposal.md` | 文本 | Agent 撰写，依据 `brief/site-package/` 与 GeoJSON 复算 | COMMUNITY-DISPLAY-ONLY |
| `report/proposal.html` | HTML | `scripts/render_proposal_html.py` 由 proposal.md 渲染 | COMMUNITY-DISPLAY-ONLY |
| `report/narrative.md` | 文本 | Agent 摘要 | COMMUNITY-DISPLAY-ONLY |
| `geometry/*.geojson` | 空间数据 | Agent 在 provisional 边界内生成的概念方案几何；边界来源见 `sources.json#BOUNDARY-SOURCE` | COMMUNITY-DISPLAY-ONLY；非官方审定红线 |
| `metrics.json` | 指标 | 由本包 GeoJSON 脚本复算 | COMMUNITY-DISPLAY-ONLY |
| `assets/figures/site-overview.png` | 图件 | Agent（matplotlib + PingFang/系统中文 Sans）由 GeoJSON 绘制 | COMMUNITY-DISPLAY-ONLY |
| `assets/figures/land-use-structure.png` | 图件 | 同上 | COMMUNITY-DISPLAY-ONLY |
| `assets/figures/key-areas.png` | 图件 | 同上 | COMMUNITY-DISPLAY-ONLY |
| `assets/figures/mobility-bluegreen.png` | 图件 | 同上 | COMMUNITY-DISPLAY-ONLY |
| `assets/figures/metrics-evidence.png` | 图件 | 同上；数值与 `metrics.json` 一致 | COMMUNITY-DISPLAY-ONLY |
| `assets/figures/3d-corridor-axon.png` | 图件 | Agent 等轴测概念体量示意，非真实街景照片 | COMMUNITY-DISPLAY-ONLY |
| `assets/figures/3d-key-nodes.png` | 图件 | 同上 | COMMUNITY-DISPLAY-ONLY |
| `assets/figures/operation-conversion.png` | 图件 | Agent 绘制年度运营与转化路径 | COMMUNITY-DISPLAY-ONLY |
| `assets/figures/logo-vi-direction.png` | 图件 | Agent 原创 Logo/VI 概念（几何折线+突触点） | COMMUNITY-DISPLAY-ONLY |
| `assets/figures/regional-synergy.png` | 图件 | Agent 绘制区域协同概念图 | COMMUNITY-DISPLAY-ONLY |
| `assets/figures/ecosystem-map.png` | 图件 | Agent 绘制八要素生态图谱 | COMMUNITY-DISPLAY-ONLY |
| `assets/figures/scenario-cards-grid.png` | 图件 | Agent 绘制 10 场景卡 | COMMUNITY-DISPLAY-ONLY |
| `assets/figures/test-validation-flows.png` | 图件 | Agent 绘制 3 测试流程 | COMMUNITY-DISPLAY-ONLY |
| `assets/figures/public-space-components.png` | 图件 | Agent 绘制公共空间组件库 | COMMUNITY-DISPLAY-ONLY |
| `assets/figures/culture-bilingual-signage.png` | 图件 | Agent 绘制双语导视方向 | COMMUNITY-DISPLAY-ONLY |
| `assets/figures/phasing-plan.png` | 图件 | Agent 由 phasing.geojson 绘制分期 | COMMUNITY-DISPLAY-ONLY |
| `assets/figures/scenario-governance-matrix.png` | 图件 | Agent 绘制 10 场景治理矩阵 | COMMUNITY-DISPLAY-ONLY |
| `drawings/a3-booklet.pdf` | PDF | ReportLab 嵌入上述 PNG | COMMUNITY-DISPLAY-ONLY |
| `drawings/a0-boards.pdf` | PDF | ReportLab 嵌入上述 PNG | COMMUNITY-DISPLAY-ONLY |
| `visual/index.html` | HTML | `scripts/scaffold_ai_submission.py` 模板 + Agent 定制 gallery | COMMUNITY-DISPLAY-ONLY；无 CDN |
| `compliance_matrix.json` 等矩阵 | JSON | Agent 对照 `agent_taskbook.json` 与公告任务填写 | COMMUNITY-DISPLAY-ONLY |
| `sources.json` | 元数据 | 引用 `brief/site-package/`、`data/source_registry.json`、官方公告 URL | 仓库公开材料 |
| 系统字体（PingFang / STHeiti 等） | 字体 | macOS 系统自带，仅用于本地出图栅格化 | 遵循 Apple 系统字体许可；出图为 PNG/PDF 嵌入 |

## 未使用或未清权内容声明

- 未嵌入第三方商业地图瓦片、卫星影像或 Street View。
- 未使用未授权企业商标、产品界面截图或人物肖像。
- 文化叙事中提及的京张铁路、清华园火车站、北影等仅为公开历史/地名参考，不构成权属主张。
- 3D 概念图为示意体量，不代表真实建筑设计或摄影师作品。

## 维护与复核

若维护者要求替换资产或补充清权材料，应更新本表与 `sources.json`，并刷新 `manifest.json` 哈希后重新提交 PR。
