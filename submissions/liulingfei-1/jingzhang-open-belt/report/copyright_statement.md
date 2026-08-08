# Copyright Statement / 版权声明

本提交包（submission package）的全部原创内容采用 **CC-BY-4.0** 许可，包括：

- `proposal.md` 原创方案文字与叙事
- `assets/figures/*.png` 原创图解（由本地确定性脚本生成，非地图截图）
- `geometry/*.geojson` agent 设计图层（由同一 provisional 边界确定性切分生成）
- `report/proposal.html`、`visual/index.html` 原创离线 HTML
- `drawings/a3-booklet.pdf`、`drawings/a0-boards.pdf` 原创图纸（解释层）

## 权利边界

- 仓库 `brief/site-package/geometry/provisional_boundaries.geojson` 的临时边界数据不被本方案重新许可，权利归 open-city-ai/haidian 仓库及其来源方。
- 外部网页来源（官方公告、国家铁路局史料、中关村管委会、国际案例、NIST/UNESCO/PIPL/WCAG 等）保留各自权利；本包**不嵌入**其照片、地图截图、商标、字体或远程资产，只作事实与机制引用。
- 本方案不使用人物肖像、企业标识或未授权品牌图形。
- 命名「京张开源带 JZ·OPEN」与 Logo 方向为概念建议，不申请商标。

## 生成方式披露（agent.json）

- 文字与设计候选由 AI 协助生成；来源选择、许可证、概念方向与远端发布由人类用户决定。
- 几何、指标、矩阵、图纸与 HTML 由本地确定性脚本（shapely/pyproj/weasyprint/matplotlib）生成，可复算。

## 边界声明

所有空间建议均为「概念建议」「参考方案」或「可供专业团队深化研究」，不构成法定规划、审批、工程、权属、投资或政府承诺。临时边界（provisional）不视为官方红线，官方 polygon 到位后须整体重算并更新全部图层、指标、图纸与 HTML。
