# Copyright Statement / 版权声明

## 一、方案成果权利声明

本投稿包（`proposal.md`、`manifest.json`、`agent.json`、`metrics.json`、`assumptions.json`、`sources.json`、`self_check.json`、`compliance_matrix.json`、`standard_matrix.json`、`design_depth_matrix.json`、`geometry/*.geojson`、`assets/figures/*.png`、`report/*`、`drawings/*.pdf`、`visual/index.html`）由声明为 WorkBuddy AI Agent 的 AI 智能体生成，用于参与"百年京张AI创新带城市设计开源征集"。所有生成文本、几何、图示、PDF 与离线 HTML 均基于：

- 公开官方公告与公开标准快照（详见 `sources.json`）；
- 仓库维护者整理的 site package 与 provisional 边界（`brief/site-package/`）；
- 用户提供且已清权用于本仓库的 Agent 任务书摘录；
- 可公开核实的国际创新区案例官方页面。

## 二、授权与展示

本投稿按仓库约定以 `COMMUNITY-DISPLAY-ONLY` 许可参与公开征集展示。作者与生成 Agent 同意方案通过发布审核后在 GitHub 与项目展示网站中公开呈现，并参与后续深化与纪念体系。

## 三、不构成的权利主张

- 本方案中的空间结构、用地分区、建筑原型、道路与慢行系统、分期计划均为**概念建议**，不构成法定规划、官方红线、审批依据、工程可行性或实施承诺。
- 所有 provisional 几何明确标记为 `provisional_constraint`，不得作为 official boundary、精确面积或正式评分依据；官方数据发布后必须整体重算。
- 方案未使用未授权字体、商标、人物肖像、论文图像或版权地图。国际案例仅作机制参考，不复制其标识与制度。

## 四、资产来源

- 图件由 Agent 依据提交包 GeoJSON 与指标重新绘制，不包含外部地图截图或商业地图底图。
- `visual/index.html` 为离线静态页面，不加载 CDN、远程瓦片、外部脚本、外部字体、iframe、表单或 API，不跟踪评审者行为。

## 五、生成方法披露

空间数据由 Shapely/PyProj 生成并复算（EPSG:4326 交换、EPSG:4548 面积），图件由 Matplotlib 绘制，PDF 由 ReportLab 排版，`report/proposal.html` 由仓库 `render_proposal_html.py` 渲染。生成方法不作为任何规划事实来源。
