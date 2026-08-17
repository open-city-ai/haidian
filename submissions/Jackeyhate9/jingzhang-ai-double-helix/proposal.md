---
title: "京张智脉 · 双螺旋：百年铁路上的AI创新双螺旋"
author_github: "Jackeyhate9"
language: "zh"
proposal_format_version: "2"
bilingual_contract_version: "1"
translation_file: "proposal.en.md"
license: "COMMUNITY-DISPLAY-ONLY"
summary: "以京张遗址公园为中央绿轴，将百年京张铁路文化基因与AI融合创新基因编织为「双螺旋」，三区两翼沿廊道协同生长，形成面向全球AI产业高地与朝圣地的城市设计概念方案。"
iteration: "v0.1"
---

# 京张智脉 · 双螺旋：百年铁路上的AI创新双螺旋

## 设计依据与资料清单

本方案以北京市规划和自然资源委员会海淀分局发布的《百年京张AI创新带城市设计国际方案征集资格预审公告》为第一依据，并以面向全球智能体的开源征集任务书为任务响应依据 [source:OFFICIAL-ANNOUNCEMENT] [source:AGENT-TASKBOOK]。机器可读依据来自 `brief/site-package/` 的设计任务书、枚举、用地分类、指标范围和临时几何，以及 `data/source_registry.json` 的来源用途登记 [source:SOURCE-REGISTRY]。

由于征集组织方尚未公开可验证坐标系的精确红线（资格预审文件下载受密码保护），本方案采用仓库维护者依据公告文字四至与面积约束推定的临时粗略边界，并在全部图层与指标中保留「临时约束范围（provisional constraint）」标注，不作为官方红线、审批或精确面积复算依据 [source:BOUNDARY-SOURCE] [depth:existing_conditions_diagnosis]。这一组织方数据缺口不阻断内容评分；替换官方多边形后，边界、用地、建筑、道路、绿地、公共空间与分期均需重算。

完整来源、标准、设计深度与任务覆盖分别保存在 `sources.json`、`standard_matrix.json`、`design_depth_matrix.json` 与 `compliance_matrix.json`，正文不重复机器索引。边界解释可回到总体范围图层与面积复算 [data:geometry/site_boundary.geojson#SITE-001] [metric:site_area_sqm]，三处重点区由独立图层核对 [data:geometry/key_areas.geojson#KEY-001] [metric:key_area_count]。

![资料证据链与提交包关系图](assets/figures/site-overview.png)

## 三层范围工作框架

方案按公告三个层次组织工作：统筹研究范围关注约 43.6 平方公里的AI产业生态、战略定位与未来城市形态；总体设计范围关注约 11.4 平方公里京张遗址公园周边 1–2 公里城市地区，要求达到控规深度城市设计；重点区域范围关注约 368.4 公顷三处详细设计地区，要求达到规划综合实施方案深度 [data:geometry/site_boundary.geojson#SITE-001] [standard:PROJECT-OFFICIAL-ANNOUNCEMENT]。

本方案提出的总体空间结构为「一带三核、三区两翼、双螺旋共生」：以京张遗址公园为南北向文化—绿色主轴（一条螺旋链），以AI创新产业带为另一条螺旋链，两条链在众智园、北京AI原点社区、大钟寺三处重点区（碱基对节点）处交织，中关村科技服务翼与小月河场景赋能翼向东西两侧展开 [data:geometry/land_use.geojson#LU-001] [depth:overall_spatial_structure]。

三层工作不是割裂的图纸集合：统筹研究决定产业链与城市形态判断，总体设计把判断落实到更新项目与设施承载，重点区详细设计验证具体地块、建筑、交通与AI场景的可实施性 [depth:three_level_scope_framework]。当前空间结构按临时边界讨论，属「概念建议、参考方案，可供专业团队深化研究」。

![三层范围与空间工作框架图](assets/figures/land-use-structure.png)

## 统筹研究范围产业与未来城市研究

统筹研究范围的核心是构建世界级AI创新生态体系。本方案以「高校策源—开源协作—企业转化—公共体验—国际传播」为创新链，并将三大定位转译为空间语言：百年京张文化带是一条文化基因链，AI融合创新带是一条创新基因链，都市AI生活体验带是连接两链的体验横档，三者共同构成「双螺旋」整体辨识度 [source:AGENT-TASKBOOK] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]。

**命名体系与Logo方向（agent.1）**：一带主名称为「京张智脉」（英文 Jing-Zhang Intelligence Vein，简称 ZhiMai），取京张铁路「人」字形展线意象与DNA双螺旋意象相融合。三区两翼命名：智脉中枢·众智园、智脉原点·原点社区、智脉前沿·大钟寺、智脉服务翼·中关村、智脉场景翼·小月河。Logo方向以「双螺旋铁轨」为母题：两条交错上升的轨道曲线（一条赭红象征百年铁路文化，一条科技蓝象征AI创新）缠绕为DNA双螺旋，中央结点即三处重点区。视觉识别以赭红×科技蓝双色为基调，可延展到导视、活动视觉与国际传播。

**5–8 个全球AI创新生态案例（agent.2）**，用于提取可转化为空间与运营机制的启示：

| 案例 | 关键启示 | 对本带的空间转译 |
| --- | --- | --- |
| 巴黎 Station F | 旧货运车站改造为世界级创业园区 | 京张遗址公园沿线的「站改园」再利用范式 |
| 伦敦国王十字 | 铁路遗产与科技企业（DeepMind等）共生 | 遗址文化与国际创新社区的缝合 |
| 美国 Kendall Square | 大学锚定的高密度创新生态 | 近校成果转化与原点社区 |
| 硅谷 Stanford–Sand Hill | 产学研与资本要素融合 | 中关村科技服务翼的资本与IP赋能 |
| 多伦多–滑铁卢走廊 | AI研究院牵引的走廊式生态 | 三区两翼沿廊道协同 |
| 首尔板桥 Techno Valley | 政府驱动的数字产业新城 | 众智园全栈自主创新组织 |
| 深圳南山 | 智能终端与内容生态 | 大钟寺智能原生新业态 |

这些经验不构成法定规划结论，仅作为设计参照 [source:AGENT-TASKBOOK] [depth:overall_spatial_structure]。

## 总体设计范围城市更新与控规深度城市设计

总体设计范围达到控规深度，要求把产业战略落到用地、建筑、交通、市政与风貌。本方案以中央绿轴（京张遗址公园活力带，用地代码 1401 公园绿地）为骨架，西侧以科研与科技服务用地（0802）为主承载中关村科技服务翼，东侧以生活服务与场景用地（0904）为主承载小月河场景赋能翼，三处重点区按定位落位商务金融（0902）与消费商业（0901） [data:geometry/land_use.geojson#LU-001] [standard:MOHURD-CONTROL-DETAILED-PLANNING]。

建筑基底、道路中心线、绿地与公共空间均由提交几何复算 [data:geometry/buildings.geojson#B-001] [data:geometry/roads.geojson#R-001] [metric:building_footprint_area_sqm]。由于缺少官方控规、现状建筑、权属与工程条件，容积率、建筑高度、建筑强度与具体拆改留统一记为待正式数据补齐（`status=unknown`），不冒充审定指标 [depth:development_intensity_controls] [metric:floor_area_ratio]。

更新总体框架以「留改并举、渐进更新」为原则：优先缝合慢行断点、激活遗址公园界面与轨道站点周边，再推进低效空间功能置换 [depth:land_use_layout] [depth:retain_renovate_demolish]。

## 重点区域详细设计

三处重点区是「双螺旋」的三个碱基对节点，均需达到规划综合实施方案深度 [depth:three_key_area_detailed_design]。

**众智园AI自主创新加速区（智脉中枢）** 定位为花园型全栈自主创新街区，承载AI全栈自主创新体系与AI治理全球话语权。空间动作为强化清河界面、构建低碳创新交往环与产业展示廊，以绿色空间承载自主模型测试与标准治理展示 [data:geometry/key_areas.geojson#KEY-001]。

**北京AI原点社区（智脉原点）** 定位为近校型成果转化与人才社区，承载世界级AI创新生态。空间动作为组织校区、园区、街区慢行缝合，补足成果发布、人才服务、开源协作与居住生活空间，并设「原点代码纪念碑」作为荣誉展示节点 [data:geometry/key_areas.geojson#KEY-002]。

**大钟寺AI产业聚集区（智脉前沿）** 定位为城市型智能经济与国际交往街区，承载智能原生新业态。空间动作为围绕大钟寺站一体化组织四象限步行连通，更新重点企业周边公共环境，培育智能体、智能终端、内容消费与数据要素场景 [data:geometry/key_areas.geojson#KEY-003]。

![三处重点区域索引与设计任务图](assets/figures/key-areas.png)

## AI 创新生态、人才画像与 AI+ 场景

面向智能体任务书要求不少于10张场景卡、3个产业测试验证场景与5类用户画像（agent.3）。每张场景卡说明服务对象、空间位置、数据来源、隐私边界、人工复核与运营主体 [source:AGENT-TASKBOOK] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]。

**5类用户画像**：开源开发者、初创团队、头部企业访客、周边居民、高校师生，各自映射到原点社区开源发布厅、众智园共享测试场、大钟寺国际路演客厅、遗址公园慢行环与近校转化街 [data:geometry/public_space.geojson#PS-001]。

**10张AI场景卡**：开源发布厅、安全治理沙盒、端侧算力驿站、AI慢行导航、大钟寺国际路演客厅、清河低碳创新廊、近校成果转化街、数据要素会客厅、AI生活服务样板街、全球AI活动周路线，覆盖AI+交通、医疗、教育、法律、生活服务与公共空间 [metric:public_space_ratio] [metric:green_ratio]。

**3个产业测试验证场景**（需清权与人工复核）：众智园自主模型红队测试场、原点社区开源协作沙盒、大钟寺智能终端适老化/无障碍实测场。所有场景均设数据最小化、公开来源、可解释与人工复核边界，不采集未授权个人行为轨迹 [data:geometry/roads.geojson#R-001]。

## 用地、建筑规模与拆改留方案

用地分区遵循国土空间用地用海分类指南，形成完整闭合无缝的用地分区 [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE]。中央绿轴为公园绿地（1401），西侧科研与科技服务（0802），东侧生活服务与场景（0904），重点区分别落位商务金融（0902）与消费商业（0901），构成与「双螺旋」呼应的用地结构 [data:geometry/land_use.geojson#LU-001]。

建筑以AI研发、人才公寓、智能原生办公为主体，集中布局于三处重点区内 [data:geometry/buildings.geojson#B-001]。建筑基底面积由几何复算 [metric:building_footprint_area_sqm]。拆改留仅提出「方法 + 待校准清单」：保留京张遗址公园沿线的历史文化资源，改造低效产业与首层业态，新建集中于三处重点区的研发、公寓与公共设施；具体地块级拆改留结论待现状权属、控规与工程条件补齐后深化，不在此给出法定判断 [depth:retain_renovate_demolish] [depth:height_massing_character]。

## 交通、轨道、市政与公共服务设施

交通方案围绕轨道站点一体化、道路微循环与慢行断点缝合：沿遗址公园设置南北向慢行绿道，横向次干道串联三区，东部布置城市主干道与轨道接驳，实现东西缝合、南北贯通 [data:geometry/roads.geojson#R-001] [depth:traffic_rail_slow_parking]。

市政与新型基础设施提出分布式能源、端侧算力与智慧市政融合策略，服务AI产业与人才生活 [depth:municipal_new_infrastructure]。道路红线、管线、消防与市政条件缺失时，一律写为待正式数据补齐，不把策略写成审定条件 [data:geometry/constraints.geojson#CONSTRAINTS]。

![交通慢行与蓝绿公共空间复合系统图](assets/figures/mobility-bluegreen.png)

## 蓝绿空间、公共空间与城市风貌

蓝绿空间以京张遗址公园活力带为骨架，统筹清河、小月河蓝绿脉络，形成南北贯通、东西连通的步道骑行系统与公共空间网络 [data:geometry/green_space.geojson#GS-001] [depth:blue_green_public_space]。绿地率与公共空间率由几何复算，正文解释其设计含义：连续绿轴支撑创新交往，三处AI公共广场承载可体验场景 [metric:green_ratio] [metric:public_space_ratio]。

**3个AI朝圣地标与荣誉展示体系（agent.4）**：其一「京张智脉之脊」，即遗址公园主体，以轨道遗址与AI艺术装置共构朝圣主轴线；其二「原点代码纪念碑」，位于原点社区，以开源贡献者荣誉墙与首行代码意象表达AI原点纪念；其三「大钟寺·钟声广场」，以古钟与AI声景结合，作为国际交往与发布地标。所有地标、导视、字体与图像均须清权，不把概念地标写成已批准建设 [data:geometry/public_space.geojson#PS-001]。

## 更新项目清单、实施政策与分期计划

更新项目按近期（众智园）、中期（原点社区）、远期（大钟寺）分期，每期同步实施公共空间与慢行网络 [data:geometry/phasing.geojson#P1] [depth:phasing_implementation]。项目清单覆盖慢行断点缝合、清河创新界面、近校转化街、大钟寺站步行连通、端侧算力节点与全球AI活动路线 [depth:renewal_project_list]。

**长期运营设计（agent.6）**：提出年度活动体系——「京张AI峰会」（全球产业议题）、「智脉开源黑客松」（开发者社区）、「京张开发者节」（公共体验）；建立开发者社区运营、场景开放运营与招引转化通道，形成「活动—社区—场景—转化」闭环。所有活动、招商、资金与政策安排均表述为概念建议与深化方向，不写成已确定政府安排。

## 指标体系、面积复算与合规矩阵

核心指标由提交几何复算：总体范围面积、绿地率、公共空间率、建筑基底面积、建筑密度与重点区数量 [metric:site_area_sqm] [metric:green_ratio] [metric:public_space_ratio]。容积率、建筑高度等依赖未公开官方控制条件的指标记为待正式数据补齐 [metric:floor_area_ratio] [depth:metrics_recalculation]。

指标分三类管理：可由提交几何直接复算的空间指标、需官方控规支撑的管控指标、需运营数据持续校准的绩效指标，分别进入 `metrics.json`、`assumptions.json` 与 `compliance_matrix.json`。公告 1.3/1.4/1.5 与 agent.1–agent.6 的全部必选任务均已在合规矩阵中映射到章节、图层、指标与图纸。

![核心指标复算与证据链图](assets/figures/metrics-evidence.png)

## 风险、版权与合规说明

本方案为双语言包，中文正文与 `proposal.en.md` 对照译文等义，A3/A0、HTML 与图件提供语言副本。全部文本、几何、图纸与静态HTML由声明智能体生成或使用已清权公开来源，版权与许可见 `report/copyright_statement.md` 与 `sources.json` [source:SITE-PACKAGE]。

本方案不声称官方批准、审定控规、最终土地权属、最终建设规模或保证实施；所有空间落地建议均为概念建议、参考方案，供专业团队深化研究，不替代正式规划，不构成政府审定结论 [depth:risk_missing_data] [data:geometry/constraints.geojson#CONSTRAINTS]。

## 参考资料

- 百年京张AI创新带城市设计国际方案征集资格预审公告（北京市规自委海淀分局）
- 面向全球智能体开展百年京张AI创新带城市设计开源征集任务书摘录
- 《城市设计管理办法》（住建部）
- 《城市、镇控制性详细规划编制审批办法》（住建部）
- 《国土空间调查、规划、用途管制用地用海分类指南》（自然资源部）
- 场地包临时粗略边界（provisional_boundaries.geojson）
- 完整机器索引见 `sources.json`、`metrics.json`、`compliance_matrix.json`、`standard_matrix.json` 与 `design_depth_matrix.json` [source:SITE-PACKAGE]
