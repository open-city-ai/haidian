---
title: "百年京张AI创新带城市设计提案——京张智脉共生带"
author_github: "bbbkawaii"
language: "zh"
proposal_format_version: "2"
bilingual_contract_version: "1"
translation_file: "proposal.en.md"
license: "COMMUNITY-DISPLAY-ONLY"
version: "v0.5"
summary: "以临时边界生成的一带三核两翼正式城市设计提案（v0.5）：京张遗址公园活力带为轴，众智园、AI原点社区、大钟寺三处重点区为核，中关村科技服务翼与小月河场景赋能翼协同，含结构化几何、指标、矩阵、A3/A0 图纸与离线可视化。"
tracks: ["ai-traffic-walkability", "enterprise-services-ecosystem", "civic-agent-governance"]
scenarios: ["ai-traffic-walkability", "enterprise-service-copilot", "public-safety-operations-review"]
---

# 百年京张AI创新带城市设计提案

## 设计依据与资料清单

本方案以《百年京张AI创新带城市设计国际方案征集》公告所确定的三层范围、三处重点区域和设计任务为第一依据 [source:OFFICIAL-ANNOUNCEMENT]，并以面向全球智能体开源征集任务书规定的三项定位、五大功能、三区两翼和 agent.1–agent.6 六项必答任务为任务依据 [source:AGENT-TASKBOOK]。机器可读依据来自 `brief/site-package/` 中的 `design_brief.json`、`allowed_design_space.json`、`sources.json`、`enums/`、`ranges/planning_limits.json`、`schemas/` 与 `data/source_registry.json` [source:SITE-PACKAGE]。资料用途边界以 `data/processed/agent_fact_pack.md` 为导航层 [source:PROCESSED-FACT-PACK]，正式依据、背景资料与 provisional-only 资料的区分以 `source_use_matrix.csv` 为准，缺资料清单以 `missing_data_checklist.csv` 为准。

由于官方 `SITE_BOUNDARY` 与三处 `KEY_AREA` polygon 尚未发布，本包使用 `brief/site-package/geometry/provisional_boundaries.geojson` 生成临时边界 [source:BOUNDARY-SOURCE] [source:KEY-AREA-SOURCE]。提交包中的 `geometry/site_boundary.geojson` 与 `geometry/key_areas.geojson` 均标注为 `provisional_constraint`、`official_boundary=false` [data:geometry/site_boundary.geojson#SITE-001] [data:geometry/key_areas.geojson#PROV-KEY-001]，只能用于方案生成、自检、可视化和设计讨论，不能作为 official redline、审批依据或精确面积复算依据；组织方数据缺口不阻断内容评分，正式 polygon 发布后全部图层与指标需重算。本包的面积、比例等数值均由提交几何在 EPSG:4548 下复算得到 [metric:site_area_sqm]。

![资料证据链与提交包总览](assets/figures/site-overview.png)

## 三层范围工作框架

方案按公告确定的三层范围组织工作：统筹研究范围约 43.6 平方公里，负责 AI 产业生态、战略定位、创新链与未来城市形态研究；总体设计范围约 11.4 平方公里，负责城市更新总体框架、产业空间布局、交通市政支撑与城市风貌控制；重点区域范围约 368.4 公顷，负责三处重点区域的详细设计 [source:OFFICIAL-ANNOUNCEMENT] [depth:three_level_scope_framework]。三层范围逐级落实到 `geometry/land_use.geojson`、`geometry/roads.geojson`、`geometry/green_space.geojson`、`geometry/public_space.geojson`、`geometry/buildings.geojson` 与 `geometry/phasing.geojson`，并在 `compliance_matrix.json` 中逐条映射公告 1.3、1.4、1.5 与 agent.1–agent.6 必选任务 [depth:overall_spatial_structure]。

| 层级 | 面积 | 设计问题 | 方案回答 |
| --- | --- | --- | --- |
| 统筹研究范围 | 43.6 km² | 产业生态与未来城市形态 | 高校策源—开源协作—企业转化—公共体验—国际传播创新链 [data:geometry/land_use.geojson#LU-001] |
| 总体设计范围 | 11.4 km² | 更新、交通、市政与风貌落图 | 一带三核两翼空间结构 + 蓝绿慢行复合环 [data:geometry/roads.geojson#ROAD-001] |
| 重点区域范围 | 368.4 ha | 三处片区详细设计 | 三核分别达到规划综合实施方案深度 [data:geometry/key_areas.geojson#PROV-KEY-002] |

## 统筹研究范围产业与未来城市研究

统筹研究范围的核心任务是构建世界级 AI 创新生态 [source:AGENT-TASKBOOK] [standard:PROJECT-OFFICIAL-ANNOUNCEMENT]。方案提出"京张智脉共生带"总体概念：以京张遗址公园为历史与公共空间主轴，把众智园AI自主创新加速区、北京AI原点社区、大钟寺AI产业集聚区三处片区作为创新锚点，以中关村科技服务翼、小月河场景赋能翼作为要素配置与场景开放两翼，形成"一带三核、两翼多点、蓝绿慢行复合环"的空间组织 [depth:overall_spatial_structure]。对应 agent.1（一带总体概念与功能统筹方案设计），命名体系围绕"百年京张文化带、都市AI生活体验带、AI融合创新带"三项定位展开：中文主名"京张智脉共生带"，英文建议名 "Jingzhang AI Smart-Vein Belt"；Logo 方向以京张铁路人字形展线与神经网络节点同构的"Z"形符号，配以铁路灰、中关村红与 AI 靛蓝三色体系 [source:AGENT-TASKBOOK]。

对应 agent.2（AI全栈自主创新体系与世界级AI创新生态设计），对标全球 AI 创新生态案例，方案提炼五条可转化机制 [source:AGENT-TASKBOOK] [source:PROCESSED-FACT-PACK]：一是"校区—园区—街区"三区叠加（参考斯坦福研究园与波士顿肯德尔广场）；二是"开源社区—标准治理—安全评测"三位一体（参考 Linux 基金会与伦敦国王十字知识区）；三是"场景开放—数据合规—产业测试"闭环（参考新加坡纬壹科技城与深圳南山区）；四是"人才特区—成果转化—投融资服务"配套（参考杭州未来科技城与首尔 DMC）；五是"国际路演—开发者社区—品牌资产"长期运营（参考特拉维夫与全球开发者生态）。以上均为参考机制表述，不构成实施承诺 [source:AGENT-TASKBOOK]。

未来城市形态研究围绕人工智能如何改变工作、生活、社交、学习、交通与公共服务展开，把 AI 交通系统、连续绿色空间、创新服务设施与国际化生活工作氛围落实为可定位的功能区、节点、廊道与场景，产业战略类指标列入 `metrics.json` 并标注数据校准状态 [depth:metrics_recalculation]。

![三层范围与用地结构图](assets/figures/land-use-structure.png)

## 总体设计范围城市更新与控规深度城市设计

总体设计范围要求达到控制性详细规划的城市设计深度 [standard:MOHURD-CONTROL-DETAILED-PLANNING] [depth:land_use_layout]。方案以京张遗址公园活力带为骨架，识别沿线低效空间，提出"缝合断点—植入服务—提升界面—预留节点"的更新策略：用地结构上，把 AI 研发创新用地、教育科研用地、产业服务与商业用地沿主轴集聚，以京张绿带和公共活动界面分隔居住与创新功能，形成完整、闭合、无缝的用地分区 [data:geometry/land_use.geojson#LU-001] [metric:land_use_zone_count]。建筑方案区分保留、改造、更新、新建与待确认对象，AI 研发示范建筑、孵化器、实验室与产业服务复合体作为更新重点 [data:geometry/buildings.geojson#BLDG-001] [metric:building_footprint_area_sqm]；因缺少官方控规、权属与工程资料，建筑高度、容积率、退线等强度指标列为待确认事项 [depth:development_intensity_controls] [depth:retain_renovate_demolish]。

交通与市政策略围绕轨道站点一体化、道路微循环、慢行断点缝合与新型基础设施展开：以京张绿道为慢行主轴，以学院路—西土城路联络线组织东西联通，以轨道站点接驳横轴连接大钟寺站等轨道节点 [data:geometry/roads.geojson#ROAD-001] [metric:road_total_length_m]，并预留端侧算力、分布式能源与 AI 公共服务节点与市政设施融合的原型空间 [depth:traffic_rail_slow_parking] [depth:municipal_new_infrastructure]。涉及建筑高度、开发强度、道路红线与设施标准的结论，在官方控制条件发布前一律表述为待正式控规确认 [source:SITE-PACKAGE]。

## 重点区域详细设计

三处重点区域按规划综合实施方案的城市设计深度展开详细设计 [depth:three_key_area_detailed_design]。

众智园AI自主创新加速区定位为"花园型全栈自主创新街区"：围绕国家人工智能平台、全栈自主创新、标准制定与安全治理，沿清河界面组织低碳绿色创新交往环境，把模型测试、标准工作坊与安全治理展示转译为可参观、可预约的公共节点 [data:geometry/key_areas.geojson#PROV-KEY-001] [source:AGENT-TASKBOOK]。北京AI原点社区定位为"近校型成果转化与人才社区"：以清华、北大、中科院等高校为源头，组织校区、园区、街区慢行缝合，补足成果发布、人才服务、居住生活与开源协作空间，形成"原点社区近校成果转化街" [data:geometry/key_areas.geojson#PROV-KEY-002] [source:AGENT-TASKBOOK]。大钟寺AI产业集聚区定位为"城市型智能经济与国际交往街区"：围绕领军企业、智能体与智能终端新业态，依托大钟寺站组织四象限步行连通与商业服务更新，把数据要素、数字资产与内容消费场景落入站城一体空间 [data:geometry/key_areas.geojson#PROV-KEY-003] [metric:key_area_count]。三处片区均给出功能业态、建筑规模、拆改留分类、公共空间系统、交通组织、慢行连通与实施项目，实施依赖与权属条件列于 `assumptions.json`。

![三处重点区域详细设计图](assets/figures/key-areas.png)

## AI 创新生态、人才画像与 AI+ 场景

方案面向 AI 人才与企业建立五类用户画像 [source:AGENT-TASKBOOK] [depth:existing_conditions_diagnosis]：开源开发者（发布、协作、测试与社区声誉需求，对应原点社区开源发布厅）、初创团队（低成本办公、算力入口与产品试验场需求，对应众智园共享测试场）、头部企业访客（展示、商务、国际接待与招聘需求，对应大钟寺国际路演客厅）、周边居民（通勤、休闲、社区服务与低扰动更新需求，对应京张遗址公园慢行环与社区服务嵌入）、高校师生（成果转化、跨校协作与日常慢行需求，对应校区—园区慢行缝合与转化驿站）。每类画像的空间响应、隐私边界与人工复核机制在 `compliance_matrix.json` 中登记，不采集个人行为轨迹，活动数据仅做聚合统计 [source:AGENT-TASKBOOK]。

对应 agent.3（AI+场景赋能新范式与智能化AI活力城市设计），方案形成 10 张 AI 场景卡 [metric:scenario_node_count]：01 开源发布厅、02 安全治理沙盒、03 端侧算力驿站、04 AI 慢行导航、05 大钟寺国际路演客厅、06 清河低碳创新廊、07 近校成果转化街、08 数据要素会客厅、09 AI 生活服务样板街、10 全球AI活动周路线；每张场景卡说明服务对象、空间载体、数据来源、隐私边界、人工复核与运营主体 [source:AGENT-TASKBOOK]。产业测试验证场景不少于 3 个：自主模型安全评测场（众智园，面向标准制定与红队测试）、端侧算力与低碳能源测试点（总体设计范围节点）、智能体城市服务沙盒（公共空间可控测试），全部表述为概念建议与测试原型，不构成已批准运营 [source:AGENT-TASKBOOK]。AI 治理遵守数据最小化、公开来源、可解释与人工复核原则，城市智能体仅辅助识别慢行断点、公共空间热力、设施维护与企业服务需求，不替代规划审批，不输出未经授权的个人画像 [source:AGENT-TASKBOOK]。

![交通慢行与蓝绿公共空间复合系统图](assets/figures/mobility-bluegreen.png)

## 用地、建筑规模与拆改留方案

用地方案依据国土空间用地分类标准表达 [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE]，`geometry/land_use.geojson` 覆盖提交边界且无缝隙无重叠 [data:geometry/land_use.geojson#LU-001]：AI 研发创新用地沿京张主轴北段集聚，教育科研与人才社区用地衔接高校，京张遗址公园绿带居中贯通，产业服务与商业用地、文化展示与国际交往用地围绕大钟寺组织，品质居住与社区服务用地布置于东侧，留白与战略预留用地为未来弹性保留 [metric:land_use_zone_count]。建筑更新以保留与改造为主、新建为辅，拆改留结论在缺少现状建筑、权属与控规资料时仅给出方法和待校准清单，不编造地块级拆除结论 [depth:retain_renovate_demolish]。建筑基底面积由 `geometry/buildings.geojson` 复算 [metric:building_footprint_area_sqm]，总建筑规模、容积率等强度指标因缺官方控制条件列为 unknown 并说明前置条件 [metric:floor_area_ratio]。

## 交通、轨道、市政与公共服务设施

交通方案回应公告对轨道站点一体化、道路微循环、慢行断点与对外交通的要求 [standard:PROJECT-OFFICIAL-ANNOUNCEMENT] [depth:traffic_rail_slow_parking]：以京张绿道慢行主轴贯通南北，以学院路—西土城路联络线解决东西缝合，以轨道站点接驳横轴连接五道口、大钟寺等站点 [data:geometry/roads.geojson#ROAD-001] [data:geometry/public_space.geojson#PUBLIC-001]，重点处理京张遗址公园跨环路节点与四象限步行连通 [metric:road_total_length_m]。道路红线、管线、消防与市政条件缺失部分列入 `assumptions.json` 待补，策略表述不构成审定条件 [source:SITE-PACKAGE]。市政与公共服务设施覆盖 AI 产业服务设施、创新服务平台、人才生活服务、新型基础设施、分布式能源与端侧算力原型，设施标准与服务半径在正式工程资料发布前列为深化前置条件 [depth:municipal_new_infrastructure]。

## 蓝绿空间、公共空间与城市风貌

蓝绿空间以京张遗址公园活力带为骨架，统筹清河、小月河、高校与企业社区出行需求，提出南北贯通、东西连通的步道、骑行道与绿色空间体系 [depth:blue_green_public_space]：京张遗址公园活力绿带居中贯通 [data:geometry/green_space.geojson#GREEN-001] [metric:green_ratio]，清河滨水防护绿地承载生态与低碳创新交往 [data:geometry/green_space.geojson#GREEN-002]，一带三核公共活动界面与大钟寺站四象限广场组织日常交往与活动 [data:geometry/public_space.geojson#PUBLIC-001] [data:geometry/public_space.geojson#PUBLIC-002] [metric:public_space_ratio]。对应 agent.5（百年京张文化、中关村文化与AI新文化融合叙事设计），城市风貌融合京张铁路历史文化、中关村创新文化与 AI 新文化，利用清华园火车站等文化资源提出城市基调、屋顶形态、体量与公共艺术引导；对应 agent.4（AI公共空间、智能原生新业态与朝圣地标设计），方案提出不少于 3 个 AI 朝圣地标（京张记忆灯塔、众智园治理方舟、大钟寺智音广场）与贡献墙、荣誉展示体系、公共空间组件库方向，品牌、字体、图像与企业标识均需清权来源，风貌控制分清官方管控、设计建议与待确认条件 [source:AGENT-TASKBOOK]。

## 更新项目清单、实施政策与分期计划

方案形成 6 项更新项目清单 [metric:renewal_project_count]：JZ-01 京张遗址公园慢行断点缝合、JZ-02 众智园清河创新界面、JZ-03 原点社区近校成果转化街、JZ-04 大钟寺站四象限步行连通、JZ-05 AI 公共服务与端侧算力节点、JZ-06 全球AI活动周公共路线；每项说明位置、类型、功能、依赖条件、实施阶段与评估指标 [source:OFFICIAL-ANNOUNCEMENT] [depth:renewal_project_list]。分期与征集周期区分：一期以近校创新试点区启动轻量设施、运营活动与服务平台 [data:geometry/phasing.geojson#PHASE-001] [metric:phase_count]，二期推进站城一体更新 [data:geometry/phasing.geojson#PHASE-002]，三期进入全域治理与品牌运营框架 [data:geometry/phasing.geojson#PHASE-003] [depth:phasing_implementation]。政策建议覆盖城市更新统筹实施、空间供给、运营机制、产业服务、公共参与、数据治理与产权协同；对应 agent.6（一带全球AI创新活动体系与长期运营设计），年度活动体系、开发者社区运营、场景开放日、公共体验路线与国际传播机制均说明运营对象、频率、责任边界、转化路径与风险，不写成宣传口号或已确定安排。

![核心指标复算与证据链图](assets/figures/metrics-evidence.png)

## 指标体系、面积复算与合规矩阵

指标体系分为三类 [depth:metrics_recalculation]：可由提交几何直接复算的空间指标（site_area_sqm、building_footprint_area_sqm、green_ratio、public_space_ratio、road_total_length_m、land_use_zone_count、phase_count、key_area_count）[metric:site_area_sqm] [metric:green_ratio] [metric:public_space_ratio]；需要官方控规支撑的管控指标（容积率、建筑高度、建筑密度、退线等，当前为 unknown 并给出前置条件）[metric:floor_area_ratio]；需要运营数据持续校准的绩效指标（AI 创新指数、人才密度、产业服务满意度、慢行可达性、场景使用频次等），列入 `assumptions.json` 与 `compliance_matrix.json`，不把运营愿景写成审定规划条件 [source:SITE-PACKAGE]。所有 known 指标均可由 GeoJSON 或可信来源复算，`scripts/spatial_review.py` 与 `scripts/visual_review.py` 的结果作为正式自检证据。

合规矩阵是任务响应性的主控文件：公告 1.3、1.4、1.5 与 agent.1–agent.6 每条必选任务对应到报告章节、图层、指标、图纸、HTML 页面、来源、假设与自检项 [source:OFFICIAL-ANNOUNCEMENT] [source:AGENT-TASKBOOK]；标准矩阵覆盖六项专业标准 [standard:MOHURD-URBAN-DESIGN-MEASURES] [standard:MOHURD-ARCH-DESIGN-DEPTH-2016]，深度矩阵十五项设计深度全部达到 complete [depth:metrics_recalculation]。

## 风险、版权与合规说明

**双语言要求。** 方案主文件为中文，`proposal.en.md` 提供完整对照译文；A3/A0 图纸、报告 HTML 与离线可视化均提供英文副本，术语优先采用赛事推荐译法。所有图片、图纸、图标、数据与代码资产在 `sources.json` 与 `report/copyright_statement.md` 中说明来源、许可与授权状态；HTML 页面为离线静态文件，不加载远程脚本、远程地图瓦片、远程字体、iframe、表单或外部 API，不跟踪评审者行为 [source:SITE-PACKAGE]。

风险与缺资料清单由风险深度项、约束图层与场地包共同校核 [depth:risk_missing_data] [data:geometry/constraints.geojson#CON-001] [source:SITE-PACKAGE]：official boundary、重点区 polygon、控规、道路红线、地块、建筑、市政、文保与公共服务缺口全部列入 `assumptions.json` 与正文风险章节；缺少官方依据的结论一律降级为待确认事项 [source:SOURCE-REGISTRY]。本方案不声称官方批准、审定控规、最终土地权属、最终建设规模或保证实施，所有空间落地建议均为概念建议、参考方案或可供专业团队深化研究的内容 [source:AGENT-TASKBOOK]。AI agent 对事实、来源、版权、空间数据、指标与表达负责，维护者和专业评审可依据自检结果、空间复核与合规矩阵要求返修或拒绝。

## 参考资料

- brief/public-brief.md 与 brief/site-package/design_brief.json [source:SITE-PACKAGE]
- brief/site-package/agent_taskbook.json 与 standards/references/agent-open-call-taskbook-0518.md [source:AGENT-TASKBOOK]
- brief/site-package/allowed_design_space.json、enums/、ranges/planning_limits.json、schemas/
- brief/site-package/geometry/provisional_boundaries.geojson [source:BOUNDARY-SOURCE] [source:KEY-AREA-SOURCE]
- data/source_registry.json 与 data/processed/agent_fact_pack.md [source:SOURCE-REGISTRY] [source:PROCESSED-FACT-PACK]
- data/processed/project_scope_summary.csv、agent_task_requirements.csv、source_use_matrix.csv、missing_data_checklist.csv
- 官方公告：北京市规划和自然资源委员会海淀分局《百年京张AI创新带城市设计国际方案征集资格预审公告》 [source:OFFICIAL-ANNOUNCEMENT]
- 完整机器索引见 `sources.json`、`metrics.json`、`compliance_matrix.json`、`standard_matrix.json` 与 `design_depth_matrix.json`
