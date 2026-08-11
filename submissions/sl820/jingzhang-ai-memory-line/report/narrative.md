# 正式叙事摘要

本文件是 `proposal.md` 的机器可读派生摘要，供审阅者快速核对：主题、结构、空间落地口径、数据精度与风险边界。完整论证以 `proposal.md` 为准，几何与指标以 `geometry/*.geojson`、`metrics.json` 为准。

## 方案主题与总体结构

- **方案名称**：京张AI记忆线——百年铁路与智能未来的城市缝合（`package_id=jingzhang-ai-memory-line`）。
- **总体结构**：提出「一脊三节点两翼」——记忆绿脊缝合东西、贯通南北；三个重点区域（众智园AI自主创新加速区、北京AI原点社区、大钟寺AI产业集聚区）作为节点；中关村科技服务翼与小月河场景赋能翼作为两翼，将「三区两翼」组织为世界级 AI 创新带。
- **设计层次**：按公告三层范围框架展开——统筹研究范围（约 43.6 km²）、总体设计范围（约 11.4 km²）、重点区域范围（三处重点区合计约 368.4 公顷）。

## 空间落地口径

- 本方案为 AI 智能体开放共创的**概念建议与参考方案**，不构成规划审批、法定控规、道路红线、工程可行性或政府实施承诺。
- 空间落地均表述为「概念建议/参考方案/可供专业团队深化研究」；不包含容积率、建筑高度、地块级拆改留、道路红线等结论性表述。
- 边界与重点区使用 `brief/site-package/geometry/provisional_boundaries.geojson` 的临时粗略范围，所有图层明确标注 `official_boundary=false`、`geometry_role=provisional_constraint`，待官方红线到达后复算。

## 成果清单

- 设计图层：9 个 GeoJSON（site_boundary、key_areas、land_use 39 个无缝分区、buildings 299 个概念基底、roads 12 条、green_space、public_space、constraints、phasing 3 期）。
- 机器可读证据：`metrics.json`（EPSG:4548 复算，含 `status:unknown` 的管理指标）、`compliance_matrix.json`（覆盖公告任务 1.3/1.4/1.5 与 agent.1—agent.6）、`standard_matrix.json`（五项强制标准）、`design_depth_matrix.json`（十五项设计深度全部 complete）。
- 展示成果：`assets/figures/` 五张证据图、`drawings/a3-booklet.pdf` 与 `drawings/a0-boards.pdf`、`visual/index.html`（纯离线静态页）、`report/proposal.html`（提案渲染版）。

## 关键指标（provisional 口径）

- `site_area_sqm` 约 11,412,825 m²（约 11.41 km²，与公告一致）；`green_ratio` 约 14.73%；`public_space_ratio` 约 6.70%。
- 三处重点区 provisional 面积与公告约面积偏差在 0.5% 以内（众智园约 1,929,202 m²、原点社区约 1,043,237 m²、大钟寺约 720,454 m²）。
- 概念道路中心线总长约 27.0 km；概念建筑基底总面积约 63.3 公顷、建筑密度约 5.5%。

## 数据与风险说明

- 正式依据仅来自 `usable_for_formal="yes"` 的已批准来源；provisional 几何仅用于生成、展示与自检，不作为 official redline、审批依据或精确面积复算依据。
- 官方控规、道路红线、权属、市政、文保控制线等缺失，相关结论均以待确认事项表达，需专业团队结合官方资料深化。
- 所有指标与图面结论以官方红线与控规资料到达后的复算为准。
