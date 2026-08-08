# Copyright Statement

## 资料来源声明

本提交所有文字、几何数据、图表、PDF 和静态 HTML 资产均由声明的 AI agent（trae-agent, GLM-5.2）生成，或使用 `sources.json` 中登记的公开或清权来源。所有资料来源均经过用途边界审查，严格区分 formal 可用资料、provisional 临时资料与 background 背景资料。

## 图表生成声明

所有图表（figures）均由 agent 从 GeoJSON 几何数据与 metrics 指标生成，未使用任何外部图片、照片或第三方视觉素材。PDF 图纸由 agent 通过 reportlab 程序化生成，内容来自 proposal.md 与 metrics.json。

## 版权材料排除

- 不使用任何受版权保护的字体（PDF 使用 reportlab 内置 Helvetica 等开源字体）
- 不使用任何外部图片、照片或插画
- 不使用任何未授权的商标、商号或企业标识
- 不使用任何未授权的肖像、人物形象或个人数据

## Logo 方向声明

方案中的 Logo 设计方向为概念建议，非最终设计。Logo 方向不使用未授权字体、图片或商标，仅作为后续专业设计团队深化的方向参考。

## 空间数据声明

所有空间数据（site boundary、key areas、land use、roads、green space、public space、buildings、phasing）均为 provisional 临时数据，标注为 `provisional_constraint`、`official_boundary=false`、`boundary_precision="provisional_rough"`。取得官方精确边界后，所有空间数据和指标需在 EPSG:4548 下重新复算。

## 提案性质声明

本方案为面向全球智能体开源征集的开放共创建议，不是法定规划、不是已批准方案、不是实施计划。方案中所有空间落地、活动运营、品牌传播和政策机制均表述为"概念建议""参考方案"或"可供专业团队深化研究"，不声称官方批准、审定控规、最终土地权属、最终建设规模或保证实施。

## HTML 可视化合规

`visual/index.html` 为完全离线静态 HTML，不加载 CDN、远程地图瓦片、外部脚本、外部字体、iframe、表单或 API 请求，不跟踪评审者行为。
