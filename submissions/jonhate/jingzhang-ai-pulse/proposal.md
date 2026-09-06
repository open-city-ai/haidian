---
title: "京张智脉 · 百年新轨——百年京张AI创新带城市设计方案"
author_github: "jonhate"
language: "zh"
proposal_format_version: "2"
bilingual_contract_version: "1"
translation_file: "proposal.en.md"
license: "COMMUNITY-DISPLAY-ONLY"
summary: "以京张铁路遗址公园活力带为南北主轴，串联众智园、AI原点社区、大钟寺三处重点区，联动中关村科技服务翼与小月河场景赋能翼，形成「一带三核两翼、多点场景、蓝绿慢行复合环」的空间组织，并提出命名Logo、生态案例、场景卡、朝圣地标、文化叙事与长期运营机制。"
tracks: ["jingzhang-heritage-narrative", "ai-origin-community"]
scenarios: ["ai-cultural-guide", "ai-traffic-walkability", "enterprise-service-copilot"]
iteration: "v0.1"
---

# 京张智脉 · 百年新轨——百年京张AI创新带城市设计方案

## 设计依据与资料清单

本方案以北京市规划和自然资源委员会海淀分局《百年京张AI创新带城市设计国际方案征集资格预审公告》为第一权威依据，并以 `brief/site-package/` 中经维护者整理的机器可读任务书、允许设计空间、枚举、指标区间、来源清单与标准库为可追溯依据 [source:OFFICIAL-ANNOUNCEMENT] [standard:PROJECT-OFFICIAL-ANNOUNCEMENT]。面向智能体开源征集任务书（agent.1–agent.6）与十条共创原则是本文档组织成果的直接约束 [source:AGENT-TASKBOOK] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]；资料登记表区分正式可用、背景、临时与待复核材料，本方案只把 formal-ready 材料用于正式判断，provisional 材料一律标注 [source:SOURCE-REGISTRY] [source:PROCESSED-FACT-PACK]。

截至检索日（2026-08-10），官方公告正文未附精确多边形；方案沿用组织方发布的临时替代边界 `provisional_boundaries.geojson` 完成生成、自检与可视化 [source:BOUNDARY-SOURCE]。该边界仅可用于 AI 生成、展示与设计讨论，不得作为官方红线、审批依据或精确面积结论；官方 polygon 发布后，site boundary、key areas、land use、roads、green space、public space、buildings、phasing 与全部面积指标均需重算。组织方数据缺口本身不阻断内容评分，但本方案全部空间结论均按"可讨论、可复核、待官方数据替换后复算"的原则表述 [source:KEY-AREA-SOURCE]。

![资料证据链与提交包关系图](assets/figures/site-overview.png)

正文只保留与判断直接相关的少量证据锚点；完整来源、指标、标准、设计深度与任务覆盖分别保存在 `sources.json`、`metrics.json`、`standard_matrix.json`、`design_depth_matrix.json` 与 `compliance_matrix.json`，不在正文重复机器索引。删除引用标记后，每个句子仍自然完整 [source:SITE-PACKAGE]。

## 三层范围工作框架

方案按公告确定的三层范围组织工作 [standard:PROJECT-OFFICIAL-ANNOUNCEMENT] [depth:three_level_scope_framework]：

- **统筹研究范围（43.6 km²）**：北至北五环路、东至京藏高速、南至西直门外大街、西至万泉河路，回答 AI 产业生态、战略定位、创新链与未来城市形态问题 [data:geometry/site_boundary.geojson#SITE-001] [metric:site_area_sqm]。
- **总体设计范围（11.4 km²）**：以京张遗址公园周边 1–2 公里城市地区和产业区为对象，达到控制性详细规划的城市设计深度，落实更新框架、产业空间、交通市政与风貌控制 [metric:site_area_sqm] [depth:overall_spatial_structure]。
- **重点区域范围（368.4 ha）**：众智园、AI 原点社区、大钟寺三处重点区达到规划综合实施方案的城市设计深度，验证具体地块、建筑、交通、公共空间与 AI 场景的可实施性 [data:geometry/key_areas.geojson#PROV-KEY-001] [metric:key_area_count]。

三层范围逐级落实：统筹研究决定产业链与城市形态判断，总体设计把判断落到更新项目与设施承载，重点区域验证可实施性。三层任务在 `compliance_matrix.json` 中逐条映射公告 1.3、1.4、1.5 与 agent.1–agent.6 [depth:three_level_scope_framework] [depth:metrics_recalculation]。

![三层范围与空间工作框架图](assets/figures/land-use-structure.png)

本方案采用的边界为组织方 provisional 替代边界（`official_boundary=false`、`geometry_role=provisional_constraint`、`boundary_precision=provisional_rough`），全部空间图层与指标以该边界复算，并在正文、HTML、图纸、来源与假设中保留精度警示；替换 official polygon 后需重算所有图层与指标 [source:BOUNDARY-SOURCE] [metric:land_use_cover_sqm]。

## 统筹研究范围产业与未来城市研究

### 总体概念、命名体系与视觉识别（agent.1）

本方案提出总体概念「京张智脉 · 百年新轨」，英文名 **Jingzhang AI Pulse**，命名体系为"一带三核两翼"：一带即京张智脉（Jingzhang AI Pulse Corridor），三核即众智园 AI 自主创新加速区（Zhizhiyuan Acceleration Core）、北京 AI 原点社区（AI Origin Community）、大钟寺 AI 产业聚集区（Dazhongsi Industry Core），两翼即中关村科技服务翼（Zhongguancun Service Wing）与小月河场景赋能翼（Xiaoyuehe Scenario Wing）[source:AGENT-TASKBOOK]。

Logo 方向采用"人字形铁路 × 神经网络"的视觉转译：以詹天佑京张铁路"人"字形展线为骨，以节点化连接的神经元网络为肉，形成一条由南向北展开、在三个重点区汇聚成"脉冲节点"的识别符号。视觉规范建议使用京张铁锈红（历史）＋海淀科技蓝（创新）＋智脉青绿（公共空间）三色体系，字体优先开源字体，全部标识素材以自绘矢量为主，不引用未清权商标 [source:AGENT-TASKBOOK] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]。

三大定位（百年京张文化带、都市 AI 生活体验带、AI 融合创新带）、五大功能（AI 全栈自主创新体系、世界级 AI 创新生态、AI+ 场景赋能新范式、智能化 AI 活力城市、AI 治理全球话语权）与三区两翼的协同回路是总体结构的逻辑内核：众智园承担"全栈自主创新＋治理话语权"，AI 原点社区承担"世界级生态＋开源文化"，大钟寺承担"智能原生新业态"，中关村翼提供要素全球化配置与资本赋能，小月河翼承载场景赋能与活力生活 [source:AGENT-TASKBOOK] [depth:overall_spatial_structure]。

### 全球 AI 创新生态案例（agent.2）

方案选取六个可迁移的全球 AI 创新生态案例，作为空间、运营与机制设计的参照（完整来源与使用边界见 `sources.json`）[source:AGENT-TASKBOOK] [metric:ai_ecosystem_case_count]：

| 案例 | 关键经验 | 向海淀的转译 |
| --- | --- | --- |
| 美国硅谷 Sand Hill Road 创投带 | 资本密度与社交网络的步行化叠加 | 中关村科技服务翼组织"资本+服务"步行街 |
| 美国波士顿 Kendall Square | 高校-孵化-药企共生，"被遗忘区"再城市化 | AI 原点社区近校转化与人才特区 |
| 新加坡纬壹科技城 one-north | 统一品牌、分级公共空间、场景先导 | 一带整体品牌与"场景先行、运营反哺" |
| 英国伦敦国王十字（King's Cross） | 铁路遗产更新为创新城区，公共空间先导 | 京张遗址公园活力带更新路径 |
| 中国深圳南山科技园 | 大企业链主＋中小企业雨林生态 | 大钟寺领军企业与智能体生态组织 |
| 中国杭州未来科技城 | 平台-场景-人才一体化运营 | 小月河场景赋能翼与开放测试机制 |

这些案例不照搬，只提取"步行化资本网络、近校转化、品牌统一、遗产活化、链主生态、场景运营"六类机制，并落为后续章节的空间与运营动作 [depth:overall_spatial_structure]。

### 未来城市形态研究

AI 改变工作、生活、社交、学习、交通与公共服务的方式，在本方案中落实为可定位的功能区、节点、廊道与场景：创新链"高校策源—开源协作—企业转化—公共体验—国际传播"沿京张智脉主轴展开；端侧算力、机器人配送、自动驾驶接驳、AI 导览等能力按"可监管、可复核、可预约"原则进入特定街区 [source:AGENT-TASKBOOK] [standard:GENERATIVE-AI-INTERIM-MEASURES]。所有未来城市形态描述均为概念建议与可供专业团队深化研究的材料，不构成工程或运营承诺 [depth:three_level_scope_framework]。

## 总体设计范围城市更新与控规深度城市设计

### 总体空间结构

总体设计范围采用「一带三核两翼、多点场景、蓝绿慢行复合环」的空间结构 [depth:overall_spatial_structure] [data:geometry/land_use.geojson#LU-001]：

- **一带**：京张遗址公园活力带，为南北向主轴与最大公共资产，承载文化叙事、慢行通勤与 AI 公共体验；
- **三核**：三处重点区作为产业与场景锚点；
- **两翼**：西侧中关村科技服务翼（商业办公与科技服务）、东侧小月河场景赋能翼（宜居社区与场景体验）；
- **多点场景**：沿主轴与两翼布置 AI+ 场景节点与公共服务点；
- **蓝绿慢行复合环**：由公园带、清河/小月河蓝绿空间与慢行环共同构成，缝合东西、贯通南北。

用地结构由 `land_use.geojson` 表达，八类用地拓扑闭合覆盖提交边界、无重叠无缝隙（合计 11.41 km²）：公园绿地与开敞空间 2.08 km²（18.2%）、科研用地 3.14 km²（27.5%）、教育科研用地 0.61 km²、文化用地 0.38 km²、商业服务业用地 2.89 km²、居住用地 1.72 km²、社区服务用地 0.60 km² [data:geometry/land_use.geojson#LU-001] [metric:land_use_cover_sqm] [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE]。

### 城市更新与控规深度

更新逻辑遵循"保留—改造—新建"分类：京张铁路遗址、清华园车站旧址及周边文保环境整体保留并活化；存量产业楼宇按"微改造+功能置换"方式更新；三个重点区核心地块以新建和复合利用补充创新空间。涉及容积率、建筑高度、建筑密度、绿地率、退线与道路红线的内容，因官方控规条件尚未发布，全部标注为**待正式控规条件确认**，不以推测值冒充审定指标 [depth:development_intensity_controls] [depth:retain_renovate_demolish] [standard:MOHURD-CONTROL-DETAILED-PLANNING]。

建筑基底由 `buildings.geojson` 的 24 栋概念建筑表达（科研办公、教育科研、文化展馆、商业服务、居住与社区设施），建筑基底总面积约 17.5 万 m²，仅为设计讨论用示意规模，不构成建筑规模结论 [data:geometry/buildings.geojson#BLDG-001] [metric:building_footprint_area_sqm] [metric:building_count]。

## 重点区域详细设计

三处重点区分别达到规划综合实施方案的城市设计深度，各自形成"定位＋空间结构＋建筑更新＋交通慢行＋公共空间＋AI 场景＋实施风险"的可读小方案 [depth:three_key_area_detailed_design]。

![三处重点区域索引与设计任务图](assets/figures/key-areas.png)

### 众智园AI自主创新加速区（约 192.1 ha）

- **定位**：花园型全栈自主创新街区，承担"AI 全栈自主创新体系与 AI 治理全球话语权" [data:geometry/key_areas.geojson#PROV-KEY-001]。
- **空间结构**：依托清河界面形成低碳蓝绿交往带，中央组织产业展示与标准治理展示轴。
- **建筑更新**：保留科研与总部楼宇，改造低效产业空间为共享测试与标准工作坊，新建安全治理展示中心（概念建议）。
- **交通慢行**：强化对外交通组织与五环路接驳，内部以慢行优先组织。
- **公共空间**：入口创新广场与清河滨水低碳公共客厅 [data:geometry/public_space.geojson#PUBLIC-003]。
- **AI 场景**：自主模型测试场、标准制定工作坊、安全治理展示、低碳算力体验（可预约、可监管）。
- **实施风险**：工程与低碳测算需专业团队深化，未取得控规与权属资料前不得定为实施结论。

### 北京AI原点社区（约 104.3 ha）

- **定位**：近校型成果转化与人才社区，承担"世界级 AI 创新生态"与开源文化原点功能 [data:geometry/key_areas.geojson#PROV-KEY-002]。
- **空间结构**：组织校区—园区—街区三级慢行缝合，形成成果发布—孵化—展示—居住复合界面。
- **建筑更新**：保留高校与科研院所属地，改造沿街底商与旧楼为成果转化驿站与开源协作空间，新建开源发布厅与人才服务综合体（概念建议）。
- **交通慢行**：校区园区慢行联系、轨道站点一体化接驳（五道口方向）。
- **公共空间**：开源发布广场与清华园车站旧址纪念广场（概念示意，非官方文保红线）[data:geometry/public_space.geojson#PUBLIC-002]。
- **AI 场景**：开源发布厅、近校成果转化街、AI 教育体验点、荣誉展示体系。
- **实施风险**：涉及高校与科研院所权属空间，任何改造需先取得权属与文保许可。

### 大钟寺AI产业聚集区（约 72.0 ha）

- **定位**：城市型智能经济与国际交往街区，承担"智能原生新业态" [data:geometry/key_areas.geojson#PROV-KEY-003]。
- **空间结构**：围绕大钟寺站组织站点一体化与路口四象限步行连通，构建智能体/智能终端/内容消费商业界面。
- **建筑更新**：保留领军企业楼宇，改造老旧商业物业，新建国际路演客厅与数据要素会客厅（概念建议）。
- **交通慢行**：轨道接驳优先，四象限步行网络消除绕行断点。
- **公共空间**：大钟寺站前 AI 会客厅广场 [data:geometry/public_space.geojson#PUBLIC-001]。
- **AI 场景**：智能体与智能终端展示、内容消费、数据要素合规流通展示、国际路演。
- **实施风险**：商业更新涉及业主与运营商协调，路演与数据要素业务须满足合规与授权要求。

三处重点区边界均为 provisional，上述内容作为方向性概念建议，供专业团队深化；官方 polygon 与控规条件发布后重新复算 [source:KEY-AREA-SOURCE] [metric:key_area_zhongzhiyuan_sqm] [metric:key_area_origin_community_sqm]。

## AI 创新生态、人才画像与 AI+ 场景

### 五类用户画像（agent.3）

方案围绕五类用户组织空间与服务 [source:AGENT-TASKBOOK] [metric:persona_count]：

| 用户画像 | 典型需求 | 空间响应 | 自检边界 |
| --- | --- | --- | --- |
| 开源开发者 | 发布、协作、测试、社区声誉 | 原点社区开源发布厅、公共代码墙、夜间协作空间 | 不采集个人行为轨迹，活动数据只做聚合统计 |
| 初创团队 | 低成本办公、算力入口、产品试验场 | 众智园共享测试场、端侧算力服务点 | 算力与数据服务须另行授权 |
| 头部企业访客 | 展示、商务、国际接待、人才招聘 | 大钟寺国际路演客厅、轨道接驳、重点企业公共空间 | 企业标识与案例须清权 |
| 周边居民 | 通勤、休闲、社区服务、低扰动更新 | 公园活力带慢行环、社区服务嵌入、夜间活动分级 | 不将居民画像用于商业推荐 |
| 高校师生 | 成果转化、跨校协作、日常慢行 | 校区-园区慢行缝合、成果转化驿站、AI 教育体验点 | 校园数据与科研成果须授权 |

### 十张 AI 场景卡（agent.3）

每张场景卡均说明服务对象、空间载体、运行数据、隐私边界、人工复核与运营主体，并映射到图层或合规矩阵 [source:AGENT-TASKBOOK] [metric:ai_scenario_card_count]：

| # | 场景卡 | 空间载体 | 数据与隐私 | 人工复核/运营主体 |
| --- | --- | --- | --- | --- |
| 01 | 开源发布厅 | 原点社区发布广场周边 | 公开代码与活动聚合数据 | 社区自治+平台复核 |
| 02 | 自主模型测试场（测试验证） | 众智园共享测试区 | 测试数据隔离，脱敏后展示 | 第三方评测+人工抽检 |
| 03 | 标准制定工作坊（测试验证） | 众智园标准治理展示轴 | 会议纪要公开，涉密隔离 | 标准组织+专家复核 |
| 04 | 安全治理沙盒（测试验证） | 众智园安全展示中心 | 红队测试数据不出沙盒 | 安全团队+政府监管接口 |
| 05 | 端侧算力驿站 | 总体设计范围服务节点 | 端侧处理，最小化采集 | 运营商+隐私影响评估 |
| 06 | AI 慢行导航 | 公园活力带 | 低侵入传感，匿名化 | 公共管理+人工巡检 |
| 07 | 大钟寺国际路演客厅 | 大钟寺站前广场周边 | 商务数据授权使用 | 场馆运营+内容审核 |
| 08 | 数据要素会客厅 | 大钟寺片区 | 合规、授权、可审计 | 数据交易机构+法律复核 |
| 09 | AI 生活服务样板街 | 社区与商业交汇处 | 服务数据最小化 | 街道+服务商联合运营 |
| 10 | 全球 AI 活动周路线 | 一带公共空间系统 | 活动数据聚合统计 | 组委会+志愿者复核 |

其中 02、03、04 为产业测试验证场景 [metric:test_scenario_count]。所有场景遵循数据最小化、公开来源、可解释与人工复核原则，不替代规划审批，不输出未经授权的个人画像 [standard:GENERATIVE-AI-INTERIM-MEASURES] [standard:BARRIER-FREE-ENVIRONMENT-LAW] [depth:blue_green_public_space]。

## 用地、建筑规模与拆改留方案

用地布局以 `land_use.geojson` 的八类用地为准，产业功能比例（科研＋教育科研占约 33%、商业服务业占约 25%）支撑"全栈创新—场景体验—宜居服务"的复合结构 [data:geometry/land_use.geojson#LU-001] [metric:land_use_cover_sqm] [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE]。

建筑规模：`buildings.geojson` 24 栋概念建筑、基底约 17.5 万 m²，仅作设计讨论示意 [data:geometry/buildings.geojson#BLDG-001] [metric:building_footprint_area_sqm] [metric:building_count]。拆改留策略：**保留**——京张铁路遗址、清华园车站旧址及文保环境、现状高校与科研院所；**改造**——低效产业楼宇与沿街物业的功能置换与微更新；**新建**——三处重点区核心地块的创新空间与公共设施（均为概念建议）[depth:retain_renovate_demolish] [depth:development_intensity_controls]。容积率、建筑高度、建筑密度与绿地率等控制条件待官方控规确认，本方案不给出审定值 [standard:MOHURD-CONTROL-DETAILED-PLANNING]。

## 交通、轨道、市政与公共服务设施

- **道路与慢行**：京张智脉活力轴东、西辅路为南北主通道（概念线位），横向缝合路连接三核两翼；蓝绿慢行复合环串联公共空间与轨道站点 [data:geometry/roads.geojson#ROAD-001] [metric:road_density_m_per_ha] [depth:traffic_rail_slow_parking]。
- **轨道接驳**：大钟寺站、五道口方向站点一体化组织，概念性提出慢行优先换乘与四象限步行连通（工程线位待官方资料）[data:geometry/roads.geojson#ROAD-004]。
- **市政与新型基础设施**：端侧算力驿站、分布式能源与低碳能源体验结合公共服务设施布局；传统市政管线与消防通道要求待现状资料补充后校核 [depth:municipal_new_infrastructure]。
- **公共服务**：社区服务用地 0.60 km² 承载教育、医疗、养老、文化等设施，均按现行公开标准作为概念布局，具体设施标准待专业复核 [data:geometry/land_use.geojson#LU-008] [standard:ELDERLY-SMART-TECH-PLAN-2020-45]。

![交通慢行与蓝绿公共空间复合系统图](assets/figures/mobility-bluegreen.png)

## 蓝绿空间、公共空间与城市风貌

### 蓝绿系统

京张遗址公园活力带（约 2.08 km² 公园绿地）为南北主轴，与清河、小月河蓝绿空间及社区口袋公园共同构成连续蓝绿网络 [data:geometry/green_space.geojson#GREEN-001] [metric:green_ratio] [depth:blue_green_public_space]。公共空间节点 5 处（站前会客厅、开源发布广场、入口创新广场、清华园车站纪念广场、清河滨水客厅），公共空间占比约 0.83%，均可在 `public_space.geojson` 复算 [data:geometry/public_space.geojson#PUBLIC-001] [metric:public_space_ratio]。

### AI 朝圣地标与荣誉展示体系（agent.4）

本方案提出四处 AI 朝圣地标/荣誉展示节点（概念建议）[source:AGENT-TASKBOOK] [metric:ai_landmark_count]：

1. **AI 原点脉冲碑**（AI 原点社区发布广场）：开源成果与社区贡献的年度汇聚点；
2. **智能体贡献荣誉墙**（公园活力带北段）：面向入选 Agent 与贡献者的永久纪念体系，延续"京张铁路百年后刻上你的 GitHub ID"的项目愿景；
3. **AI 里程碑走廊**（众智园）：沿产业展示轴布置年度技术里程碑与开源成果展示节点；
4. **清华园车站·AI 文化驿站**（旧址纪念广场概念示意）：百年铁路文化、中关村文化与 AI 新文化的叙事交汇点。

地标、导视与标识素材均为自绘概念，不引用未清权商标、字体、肖像或图像；地标不写成已批准建设，不设过度娱乐化表达 [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK] [depth:height_massing_character]。

### 城市风貌

风貌基调为"历史铁锈红＋科技蓝＋智脉青绿"：遗址段保留历史肌理与尺度，创新段鼓励通透、低碳、可展示的建筑形态，屋顶与立面预留 AI 展示与交互界面（概念建议）[depth:height_massing_character] [standard:MOHURD-URBAN-DESIGN-MEASURES]。

## 更新项目清单、实施政策与分期计划

### 更新项目清单

| 项目 | 类型 | 位置 | 依赖条件 | 分期 |
| --- | --- | --- | --- | --- |
| 三重点区核心启动区 | 新建+改造 | 众智园/原点/大钟寺核心地块 | 控规条件、权属、文保许可 | 近期（2026–2028） |
| 遗址公园活力带缝合段 | 更新+景观 | 公园带全线 | 遗址保护与施工协调 | 中期（2029–2031） |
| 两翼功能导入与品质提升区 | 改造+服务 | 中关村翼、小月河翼 | 业主与运营商协调 | 远期（2032–2035） |

分期由 `phasing.geojson` 三期表达，与 `compliance_matrix.json` 的 1.5 类任务与 agent.6 对应 [data:geometry/phasing.geojson#PHASE-001] [metric:phase_count] [depth:renewal_project_list]。

### 全球 AI 创新活动体系与长期运营（agent.6）

方案提出"四季一周期"年度活动体系（概念建议）：春季 AI 原点开源周、夏季全球 AI 创新大会（京张智脉论坛）、秋季智能体年度荣誉授勋与 AI 里程碑发布、冬季开发者社区黑客马拉松与国际传播路演，并以"AI 朝圣路线"串联遗址文化、开源社区、产业展示与国际路演节点 [source:AGENT-TASKBOOK] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]。

长期运营机制包括：开发者社区积分与贡献可追溯体系、AI 场景开放运营（可预约、可监管、人工复核）、公共体验与城市地标运营、国际传播与招引转化通道（活动—考察—落地服务链）。所有活动、招商、资金与政策安排均为概念建议与深化方向，不表述为已确定的政府安排或实施承诺 [depth:phasing_implementation] [depth:risk_missing_data]。

## 指标体系、面积复算与合规矩阵

核心指标均按 EPSG:4548 从 `geometry/*.geojson` 复算，公式、来源与置信度见 `metrics.json` [depth:metrics_recalculation] [metric:site_area_sqm] [metric:land_use_cover_sqm]：

| 指标 | 复算值 | 公式/来源 | 状态 |
| --- | --- | --- | --- |
| 总体设计范围 | 11,412,825 m² | polygon_area(site_boundary) | provisional |
| 绿地率 | 18.4% | green_space / site_area | provisional |
| 公共空间占比 | 0.83% | public_space / site_area | provisional |
| 道路密度 | 22.2 m/ha | road_length / site_area | 概念线位 |
| 建筑基底 | 174,920 m²（24 栋） | sum(building_footprints) | 设计示意 |
| 重点区合计 | 3,692,893 m² | sum(key_areas) | provisional |
| 场景卡/测试场景/画像 | 10 / 3 / 5 | proposal.md 计数 | 满足 agent.3 |
| 生态案例/朝圣地标 | 6 / 4 | proposal.md 计数 | 满足 agent.2/4 |

公告 1.3、1.4、1.5 与 agent.1–agent.6 的全部任务在 `compliance_matrix.json` 逐条覆盖，专业标准在 `standard_matrix.json`，设计深度项在 `design_depth_matrix.json` 全部标记 complete（FAR/高度等依赖官方数据的项标注待确认）[depth:metrics_recalculation]。

![核心指标复算与证据链图](assets/figures/metrics-evidence.png)

## 风险、版权与合规说明

- **边界风险**：全部空间图层基于 provisional 边界生成，官方 polygon 发布后需重算 [source:BOUNDARY-SOURCE] [depth:risk_missing_data]。
- **数据风险**：控规、权属、现状建筑、交通市政与公共服务底数缺失，相关结论标注待确认，不伪装为审定值 [depth:risk_missing_data] [standard:MOHURD-CONTROL-DETAILED-PLANNING]。
- **合规边界**：本方案为开放共创概念建议，不替代正式规划，不构成政府审定结论；涉及空间落地、活动、招商、政策与运营的内容均为"概念建议/参考方案/可供专业团队深化研究" [source:AGENT-TASKBOOK] [standard:GENERATIVE-AI-INTERIM-MEASURES]。
- **版权与许可**：本方案以 COMMUNITY-DISPLAY-ONLY 许可提交展示；文字、图表、Logo 与几何均为本方案原创或引用已登记公开/清权来源，字体与素材避免未授权使用，详细声明见 `report/copyright_statement.md` [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]。
- **无障碍与伦理**：公共空间与导视遵循无障碍与适老化要求，AI 场景均设人工复核与隐私边界 [standard:BARRIER-FREE-ENVIRONMENT-LAW] [standard:ELDERLY-SMART-TECH-PLAN-2020-45]。

## 参考资料

以下书目是直接影响本方案判断的主要材料,完整机器索引以 `sources.json` 与三个矩阵文件为准 [source:OFFICIAL-ANNOUNCEMENT] [source:AGENT-TASKBOOK] [source:SITE-PACKAGE]。

1. 北京市规划和自然资源委员会海淀分局《百年京张AI创新带城市设计国际方案征集资格预审公告》（2026-05-09，官方第一权威依据）。
2. 面向智能体开源征集任务书摘录（`brief/site-package/agent_taskbook.json` 及本地标准参考 `agent-open-call-taskbook-0518.md`）。
3. 京张铁路遗址公园与清华园车站旧址公开资料（北京市文物局等公开渠道）。
4. 住房和城乡建设部《城市设计管理办法》（城市风貌、公共空间与建筑布局统筹依据）。
5. 自然资源部《国土空间调查、规划、用途管制用地用海分类指南（试行）》（2023-11，用地分类依据）。
6. 国家网信办等《生成式人工智能服务管理暂行办法》（AI 场景合规边界依据）。
7. 《中华人民共和国无障碍环境建设法》（公共空间与导视无障碍依据）。
8. 民政部等《关于切实解决老年人运用智能技术困难的实施方案》（适老化依据）。
9. OpenStreetMap 基础现状数据（ODbL 许可，仅作背景参考）。
10. 全球 AI 创新生态案例公开报道（硅谷、one-north、King's Cross 等，详见 `sources.json` 与正文案例表）。
