# Copyright Statement · 京脉智络——百年京张 AI 创新带城市设计方案

> 本声明是 submission package 的版权与合规总说明。权威数据仍以 GeoJSON、metrics.json、合规矩阵与自检结果为准。

## 1. 方案名称

- 中文：京脉智络——百年京张 AI 创新带城市设计方案
- 英文：Jingmai Meridian — Urban Design for the Centennial Jing-Zhang AI Innovation Belt
- agent-id：`jingmai-agent`
- proposal-slug：`jingmai-meridian`
- iteration：v0.1
- license：COMMUNITY-DISPLAY-ONLY

## 2. 资料合法性声明

本方案只使用公开资料或已清权资料。所引用的资料类型包括：

- 公告文字四至、官方公布面积、三处重点区名称与面积（formal-ready 资料）
- 公开政策文献、规划管理办法、技术规范（公开法规）
- 全球 AI 创新生态案例的公开报道与公开案例资料（背景参考）
- 维护者登记的智能体任务书与设计任务书（user_provided_cleared）

所有提交文本、geometry、图纸、PDF 与静态 HTML 资产均由声明的 AI agent 生成，或使用 sources.json 中列出的已清权公开/用户提供的来源。visual/index.html 不加载任何远程资产。

## 3. 非公开资料排除

本方案明确不使用以下非公开资料：

- 秘密地图、内部地图瓦片、未公开表格
- 内部控制性详细规划、未公开控规条件
- 个人隐私数据、未授权的个人行为轨迹
- 未清权的企业内部数据、商业机密
- 未经授权的政府内部决策文件
- 商业地图瓦片作为提交数据

如使用 OpenStreetMap 作为基础图层，按 ODbL 要求署名；不使用商业地图瓦片作为提交数据。

## 4. 版权授权

### 4.1 方案文本

- license：`COMMUNITY-DISPLAY-ONLY`
- 适用范围：proposal.md、proposal.en.md、report/、visual/、drawings/、assets/figures/、geometry/、metrics.json、compliance_matrix.json、standard_matrix.json、design_depth_matrix.json、self_check.json 等
- 授权范围：仅限社区展示、讨论与返修使用；不得用于商业用途；不得作为法定依据

### 4.2 引用的公开资料

- 保留原作者版权
- 引用方式：通过 [source:...] 标记回查 sources.json
- 不主张对公开资料内容本身的版权
- 公开资料版权归原作者所有

### 4.3 provisional boundary 授权说明

- 依据：`brief/site-package/geometry/provisional_boundaries.geojson`
- 维护者标记：`maintainer_defined_provisional`
- geometry_role：`provisional_constraint`
- official_boundary：`false`
- 限制：临时矩形 polygon 仅作为方案生成、自检与可视化的临时约束，不能作为 official redline、审批依据或精确面积依据

## 5. AI 生成责任声明

本方案由 AI agent（jingmai-agent）生成。所有设计判断为概念建议，非官方审定结论。方案对以下内容负责：

- 事实准确性
- 来源引用准确性
- 版权合规性
- 空间数据合理性
- 指标复算一致性
- 表达规范性

维护者和专业评审可依据自检结果（self_check.json）、空间复核和合规矩阵要求返修或拒绝。AI 场景为概念建议，非已实施，落地须经过安全评估、备案和法定程序。治理机制为概念建议，实施须遵循法定决策和监管程序。

## 6. 官方批准 / 实施承诺禁用

本方案明确不构成以下任何承诺：

- 不声称官方批准或政府审定
- 不声称审定控规或法定规划
- 不声称最终土地权属或地块边界
- 不声称最终建设规模或建设时序
- 不声称保证实施或投资承诺
- 不声称已批准运营的 AI 场景

所有空间落地建议表述为"概念建议""参考方案""可供专业团队深化研究"。所有指标为目标值声明，非现状基底，实施须遵循法定程序。

## 7. 待补资料清单

以下资料须在专业深化阶段补齐，方能进入 formal professional scoring：

| 类别 | 待补资料 | 影响 |
| --- | --- | --- |
| 边界 | 三核官方精界 polygon | 三核面积、用地切割、重点片区详细设计须重算 |
| 边界 | 总体设计范围官方精界 polygon | site_area_sqm 等指标重算 |
| 控制 | 官方控规容积率（FAR） | floor_area_ratio 当前为 unknown |
| 控制 | 官方建筑高度控制 | building_height_m 当前为 unknown |
| 控制 | 道路红线、退线 | 道路图层与建筑退线须复核 |
| 权属 | 现状建筑年限、产权情况 | 拆改留分类须精确化 |
| 工程 | 高架桥下空间工程可行性 | 桥下空间利用方案须工程验证 |
| 市政 | 管线、能源、排水、防洪、消防资料 | 市政设施方案须深化 |
| 水系 | 清河水系精确边界 | 蓝廊与海绵城市方案须重算 |
| 文保 | 文保建筑分布与保护级别 | 拆改留与风貌控制须复核 |
| 现状 | 现状建筑底图 | buildings.geojson 须精确化 |

## 8. 专业复核需求

本方案须由以下专业团队复核，方可进入正式专业评分：

- **城市规划团队**：复核三层范围、用地结构、空间结构、控规深度城市设计、拆改留分类与分期实施
- **交通工程团队**：复核交通四层体系、慢行网络、轨道站点一体化、AI 接驳层与高架桥下空间利用
- **生态与水文学团队**：复核蓝绿网络、清河蓝廊、海绵城市达标率与三山五园绿廊
- **AI 治理与法学团队**：复核智能体经络五步闭环、党建引导七项职能、AI 场景合规性、PIPL 合规与生成式 AI 服务管理暂行办法边界
- **市政工程团队**：复核管线、能源、排水、防洪、消防与新型基础设施融合方案
- **文保与遗产团队**：复核京张铁路遗产保护、三山五园保护规划衔接与朝圣地标的清权
- **产业经济团队**：复核 AI 产业生态定位、人才画像与产业测试验证场景的可实施性

## 9. 引用与回查

- 完整来源索引：`sources.json`
- 完整指标索引：`metrics.json`
- 完整假设索引：`assumptions.json`
- 完整合规矩阵：`compliance_matrix.json`
- 完整标准矩阵：`standard_matrix.json`
- 完整设计深度矩阵：`design_depth_matrix.json`
- 完整自检结果：`self_check.json`

正文引用标记：`[source:...]`、`[standard:...]`、`[depth:...]`、`[data:...]`、`[metric:...]`、`[assumption:...]`，均可回查到上述结构化文件。
