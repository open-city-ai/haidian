---
title: "京张·第一站：百年京张AI创新带城市设计概念建议"
author_github: "migege"
language: "zh"
proposal_format_version: "2"
bilingual_contract_version: "1"
translation_file: "proposal.en.md"
license: "COMMUNITY-DISPLAY-ONLY"
summary: "以清华园车站「京张铁路出京第一站」与「进京赶考第一站」双重史实为锚点，把百年京张AI创新带设计为 AI 时代的「第一站」始发体系：一轨（京张遗址公园公共轨道）三站（原点始发站台/众智园加速区间/大钟寺换乘枢纽）两翼（中关村科技服务翼/小月河场景赋能翼）。全部空间落地均为概念建议，基于 provisional 边界生成，官方红线发布后整包复算。"
tracks: ["jingzhang-heritage-narrative", "ai-origin-community", "civic-agent-governance"]
scenarios: ["ai-cultural-guide", "ai-traffic-walkability", "enterprise-service-copilot", "robot-delivery-low-speed", "ai-health-service-navigation", "public-safety-operations-review"]
iteration: "v1.0"
version: "1.0"
---

# 京张·第一站：百年京张AI创新带城市设计概念建议

> **概念一句话**：一百年前，京张铁路从清华园车站出发，这是中国人自主修筑的第一条干线铁路的「出京第一站」；七十六年前，中共中央在这里踏上北平的土地，这是新中国「进京赶考」的第一站；今天，京张 AI 创新带要成为世界级 AI 创新街区的「第一站」——让每一个进入创新带的人、企业、智能体，都能从这里出发。

## 1 设计依据与资料清单

本方案以北京市规划和自然资源委员会海淀分局《百年京张AI创新带城市设计国际方案征集资格预审公告》为第一依据，其确定的项目名称、三层范围、三处重点区名称、公告面积与设计任务构成方案的任务底盘 [source:SRC-OFFICIAL-ANNOUNCEMENT]。面向全球智能体的开源征集任务书补充了六项智能体任务、三大定位、五大功能、三区两翼与统一边界条款，方案对命名体系、生态案例、场景卡、朝圣地标、文化叙事与运营机制的回答都以它为准绳 [source:SRC-AGENT-TASKBOOK]。

当前组织方尚未公布精确官方红线，三层范围与三处重点区暂以仓库维护者按公告文字四至与面积拟合的临时粗略边界（provisional_rough）生成 [source:SRC-PROVISIONAL-BOUNDARIES]。本方案所有面积复算（EPSG:4548）均基于该临时边界，`geometry/site_boundary.geojson` 与 `geometry/key_areas.geojson` 均标注 `official_boundary=false`、`geometry_role=provisional_constraint`，不得作为官方红线、审批依据或精确面积依据 [data:geometry/site_boundary.geojson#SITE-001] [metric:site_area_sqm]。组织方数据缺口不阻断内容评分，但官方红线发布后，本方案全部几何、指标、图纸与可视化必须整包重算 [assumption:A-001]。

文化叙事与朝圣地标部分引用了公开报道确认的清华园车站史实：车站 1910 年建成、詹天佑亲笔题写站名，是京张铁路出京第一站；1949 年 3 月 25 日中共中央在此下车，是「进京赶考」第一站 [source:SRC-QINGHUA-YUAN-STATION]。相关保护范围以北京市文物局公布为准，本方案仅作文化语境使用，不设定文保边界 [assumption:A-010]。

方案成果分两层：正文是人类阅读层，解释设计判断与空间逻辑；结构化文件（GeoJSON、metrics.json、sources.json、assumptions.json 与三个矩阵）是机器审计层，保存完整证据与复算。正文只在关键判断旁保留少量证据锚点，不重复机器索引 [standard:PROJECT-OFFICIAL-ANNOUNCEMENT] [depth:existing_conditions_diagnosis]。

![总体概念与证据链图](assets/figures/site-overview.png)

## 2 三层范围工作框架

方案按公告的三个层次组织工作，并把每一层对应到一个「第一站」问题：

- **统筹研究范围（43.6 km²）**回答：AI 创新带在京津冀乃至全球创新格局中的「第一站」位置如何建立——创新链从哪里出发、要素如何集散。
- **总体设计范围（11.4 km²）**回答：被京张铁路割裂的东西两半城市如何被重新「缝合」为一个可以出发的完整街区——即「第一站」的站前城市形态。
- **重点区域范围（368.4 ha）**回答：三处重点区作为始发站台、加速区间、换乘枢纽，各自承担什么功能、如何达到详细设计深度。

三层范围在 `compliance_matrix.json` 中逐条映射公告 1.3、1.4、1.5 与 agent.1–agent.6 的必选任务 [depth:three_level_scope_framework] [metric:announced_overall_design_area_sqm] [metric:announced_key_detailed_design_area_sqm]。

| 层级 | 设计问题 | 方案回答 | 数据落点 |
| --- | --- | --- | --- |
| 统筹研究范围 | 世界级 AI 创新生态如何组织 | 「高校策源—开源协作—企业转化—公共体验—国际传播」创新链 | compliance_matrix.json、standard_matrix.json |
| 总体设计范围 | 缝合的城市形态如何落图 | 一轨三站两翼空间结构 + 三条缝合街 | [data:geometry/land_use.geojson#LU-001]、[data:geometry/roads.geojson#ROAD-002] |
| 重点区域范围 | 三处片区如何达到详细设计深度 | 始发站台/加速区间/换乘枢纽分项设计 | [data:geometry/key_areas.geojson#PROV-KEY-001] [data:geometry/key_areas.geojson#PROV-KEY-002] [data:geometry/key_areas.geojson#PROV-KEY-003] |

![三层范围与始发体系结构图](assets/figures/land-use-structure.png)

## 3 统筹研究范围产业与未来城市研究

统筹层围绕公告三大定位（百年京张文化带、都市 AI 生活体验带、AI 融合创新带）与五大功能（AI 全栈自主创新体系、世界级 AI 创新生态、AI+ 场景赋能新范式、智能化 AI 活力城市、AI 治理全球话语权）组织产业与城市形态研究 [source:SRC-AGENT-TASKBOOK] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]。

**三区两翼协同回路**：三区（AI 原点社区、众智园 AI 自主创新加速区、大钟寺 AI 产业聚集区）沿公共轨道串联成「出发—加速—换乘」的创新闭环；两翼（中关村科技服务翼、小月河场景赋能翼）分别提供要素配置与场景体验的横向支撑。这一回路是概念层设计，供专业团队深化研究，不构成法定规划判断 [depth:overall_spatial_structure]。

**未来城市形态**：人工智能改变的不是某几栋楼，而是「站—区间—枢纽」组织城市流动的方式。本方案用铁路语法重新读城市：创新带是轨道，站台是创新出发地，区间是产业加速段，枢纽是转化换乘点。城市即站场，每个人都是乘客，也都可以是驾驶员——这是「AI 治理全球话语权」的城市空间表达：让进入创新带的每个智能体服务，都有一张可查的「车票」、一条可退出的「站台」、一个可复核的「信号」。

## 4 总体设计范围城市更新与控规深度城市设计

总体设计范围以「一轨三站两翼」为空间结构：公共轨道（京张遗址公园活力带）南北贯通约 9.5 km [metric:public_rail_corridor_length_m]；三座站台自北向南依次为众智园加速站台、原点始发站台、大钟寺换乘站台；两翼为东侧中关村科技服务翼与西侧小月河场景赋能翼。结构落图于 `geometry/land_use.geojson`，用地覆盖全边界、无缝隙无重叠 [data:geometry/land_use.geojson#LU-001] [depth:land_use_layout] [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE]。

**三条缝合街**是东西缝合的关键动作：清华东路缝合街、成府路缝合街（五道口）、知春路缝合街分别跨越公共轨道，把被铁路割裂百年的东西城重新连接 [data:geometry/roads.geojson#ROAD-002] [data:geometry/roads.geojson#ROAD-004]；缝合街与站台接驳的完整网络见交通章 [depth:traffic_rail_slow_parking]。

**城市更新总体框架**按「保—改—留—建」组织：保护清华园车站旧址与历史文化资源；改造低效产业与商业空间为 AI 创新载体；保留有活力的社区肌理与高校院所；在站台节点新建公共与产业空间 [depth:retain_renovate_demolish]。涉及容积率、建筑高度、建筑密度、绿地率、退线与道路红线的控制，均以「待正式控规条件确认」表述，本方案不设定法定数值 [standard:MOHURD-CONTROL-DETAILED-PLANNING] [metric:floor_area_ratio] [metric:building_height_max_m]。

**「首站承诺」机制**是总体层最重要的治理主张：任何进入创新带的 AI 服务或城市智能体，都必须有一个「第一站」——公开的试乘区（体验）、验证场（测试）、退出通道（停用）与复核信号（可审计状态）。它把 AI 治理从口号变成可运营的空间接口 [source:SRC-GENERATIVE-AI-MEASURES] [depth:municipal_new_infrastructure]。

## 5 重点区域详细设计

三处重点区沿公共轨道构成「出发—加速—换乘」的完整旅程 [data:geometry/key_areas.geojson#PROV-KEY-001] [data:geometry/key_areas.geojson#PROV-KEY-002] [data:geometry/key_areas.geojson#PROV-KEY-003]；各片区详细设计深度由 [depth:three_key_area_detailed_design] 约束。

### 5.1 北京AI原点社区——始发站台（Platform Zero）

定位：近校型成果转化与人才社区，AI 创新的「出发地」。核心动作：以清华园车站旧址为原点组织「原点站台广场」（约 2.3 ha）与「出发花园」[data:geometry/public_space.geojson#PUBLIC-0A] [data:geometry/public_space.geojson#PUBLIC-0D]；沿成府路组织近校成果转化街，串联校区、园区与街区慢行；站台周边布局转化研发楼、人才公寓与文化展示馆 [data:geometry/buildings.geojson#BLDG-031] [data:geometry/buildings.geojson#BLDG-037] [data:geometry/buildings.geojson#BLDG-041]。文化展示区与站台绿园形成「从车站出发」的空间叙事 [metric:public_space_area_sqm]。

### 5.2 众智园AI自主创新加速区——加速区间（Acceleration Section）

定位：花园型全栈自主创新街区，创新从这里「加速」。核心动作：公共轨道西侧与东侧组织两列 AI 研发与孵化器建筑群，形成研发街道 [data:geometry/buildings.geojson#BLDG-001] [data:geometry/buildings.geojson#BLDG-020]；中部保留 AI 未来设施留白用地（16 类）作为测试场预留 [data:geometry/land_use.geojson#LU-017]；站台广场承担产业展示与标准治理场景 [data:geometry/public_space.geojson#PUBLIC-0B]。清河界面按低碳绿色创新交往环境设计，作为园区公共客厅 [assumption:A-004]。

### 5.3 大钟寺AI产业聚集区——换乘枢纽（Transfer Hub）

定位：城市型智能经济与国际交往街区，创新在这里「换乘」——从技术换乘到消费、从研发换乘到市场。核心动作：围绕大钟寺换乘站台广场组织智能原生商业体与体验商业 [data:geometry/public_space.geojson#PUBLIC-0C] [data:geometry/buildings.geojson#BLDG-043]；四象限步行连通与轨道站点一体化组织在换乘站台接驳路中 [data:geometry/roads.geojson#ROAD-007]；数字资产与数据要素会客厅作为数据合规展示界面 [source:SRC-GENERATIVE-AI-MEASURES]。

| 重点片区 | 第一站角色 | 空间动作 | 主要证据 |
| --- | --- | --- | --- |
| 北京AI原点社区 | 始发站台 | 原点站台广场、近校成果转化街、出发花园 | [data:geometry/public_space.geojson#PUBLIC-0A] [source:SRC-QINGHUA-YUAN-STATION] |
| 众智园AI自主创新加速区 | 加速区间 | 研发街道、留白测试场、加速站台 | [data:geometry/land_use.geojson#LU-017] [data:geometry/public_space.geojson#PUBLIC-0B] |
| 大钟寺AI产业聚集区 | 换乘枢纽 | 换乘站台广场、四象限连通、数据会客厅 | [data:geometry/public_space.geojson#PUBLIC-0C] [data:geometry/roads.geojson#ROAD-007] |

![三处重点区域详细设计图](assets/figures/key-areas.png)

## 6 AI 创新生态、人才画像与 AI+ 场景

### 6.1 全球 AI 创新生态案例与生态图谱

方案研究 8 个全球案例，提炼可迁移到海淀的方法（非招商承诺）[metric:ai_ecosystem_case_count] [source:SRC-CASE-KINGS-CROSS]：

| 案例 | 借鉴要点 | 对应创新带动作 |
| --- | --- | --- |
| 伦敦国王十字 | 老铁路货运场整体更新为知识创新区，保留铁路文脉 | 公共轨道活化与站台节点更新 |
| 波士顿肯德尔广场 | 大学成果转化街区的连续孵化界面 | 原点近校成果转化街 |
| 硅谷（斯坦福研究园） | 大学—园区—资本闭环 | 中关村科技服务翼要素配置 |
| 新加坡纬壹科技城 | 国策级创新园与景观融合 | 众智园花园型加速区 |
| 日本柏之叶智慧城市 | 产官学民共治的智慧社区 | AI 生活体验带社区场景 |
| 杭州城西科创大走廊 | 平台+产业资本+场景开放 | 三区两翼协同回路 |
| 深圳南山科技园 | 硬件供应链与场景开放 | 大钟寺智能终端消费场景 |
| 特拉维夫创新街区 | 中小企业与风投密度驱动 | 开发者社区与路演机制 |

生态图谱由「高校策源—开源协作—企业转化—资本服务—公共体验—国际传播」六环组成，落到三区两翼的空间回路上 [depth:overall_spatial_structure]。

### 6.2 用户画像（5 类）

| 画像 | 典型需求 | 空间响应 | 隐私与复核边界 |
| --- | --- | --- | --- |
| 全球 AI 人才（开发者/研究员） | 发布、协作、测试、社区声誉 | 原点开源发布厅、众智园验证场、夜间协作空间 | 不采集个人轨迹，活动数据聚合统计 |
| 海淀 AI 企业 | 展示、商务、招聘、测试 | 大钟寺路演客厅、众智园展示、站台接驳 | 企业标识与案例须清权 |
| 周边居民 | 通勤、休闲、社区服务 | 公共轨道慢行、站台绿园、社区服务 | 不做商业画像推荐 |
| 高校师生 | 成果转化、跨校协作、日常慢行 | 近校转化街、缝合街、AI 教育体验 | 校园数据与科研成果须授权 |
| 游客与参访者 | 文化体验、国际交流、导览 | 原点站台文化体验、朝圣路线、AI 导览 | 导览仅用公开信息 |

### 6.3 AI+ 场景卡（12 张）与产业测试验证场景（3 个）

方案形成 12 张 AI 场景卡，每张对应标准场景注册表或自定义场景，并落到具体空间 [metric:scenario_card_count] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]：

| 场景卡 | 空间载体 | 标准场景映射 | 设计说明 |
| --- | --- | --- | --- |
| SC-01 第一站智能导览 | 原点站台·清华园站旧址 | ai-cultural-guide | 从清华园站出发的百年导览，只使用公开信息 |
| SC-02 站台数字孪生体验 | 原点文化展示馆 | ai-cultural-guide | 京张铁路+进京赶考+AI 创新的时间叙事 |
| SC-03 无障碍绿色通道 | 三站台接驳路与公共轨道 | ai-traffic-walkability | 无障碍路径规划与可复核导视 |
| SC-04 换乘智能商业助理 | 大钟寺智能商业体 | enterprise-service-copilot | 消费决策辅助，不强制数据授权 |
| SC-05 轨道巡检机器人 | 公共轨道走廊 | robot-delivery-low-speed | 低速自主巡检，人工复核运维 |
| SC-06 站台无人配送 | 三站台 | robot-delivery-low-speed | 低速配送试点，划定可退出区域 |
| SC-07 健康服务导航 | 社区健康服务点 | ai-health-service-navigation | 医疗导诊辅助，隐私最小化 |
| SC-08 开源协作空间 | 众智园加速器 | enterprise-service-copilot | 代码协作与开源社区运营 |
| SC-09 数据回廊·隐私沙盒 | 众智园数据合规中心 | public-safety-operations-review | 公共数据沙盒测试，授权可审计 |
| SC-10 智能信号塔 | 公共轨道节点 | public-safety-operations-review | 京张信号语言：绿/黄/红展示 AI 服务运行状态 |
| SC-11 首站试乘区（测试验证） | 三站台试乘点 | — | 每个 AI 服务进入带前的公开试乘验证 |
| SC-12 智能体工场（测试验证） | 众智园验证场 | — | 多智能体协作与压力测试 |

产业测试验证场景共 3 个（SC-10 信号塔治理测试、SC-11 首站试乘、SC-12 智能体工场）[metric:industry_test_scenario_count]。所有场景遵守数据最小化、公开来源、可解释与人工复核原则，不构成已批准运营 [source:SRC-GENERATIVE-AI-MEASURES] [source:SRC-BARRIER-FREE-LAW]。

## 7 用地、建筑规模与拆改留方案

用地方案依据《国土空间用地用海分类指南》代码组织，覆盖提交边界无缝隙无重叠（EPSG:4548 复算验证）[standard:MNR-LAND-USE-CLASSIFICATION-GUIDE] [data:geometry/land_use.geojson#LU-001] [depth:land_use_layout]。结构以公共轨道（1401 绿地，约 21.8%）为脊，居住（0701）、科研（0802）、教育（0804）、商业（05）、文化（0803）与留白（16）分列两侧 [metric:green_ratio]。

建筑基底为概念性体量示意（65 栋，约 32.8 万 m²），重点区内沿研发街道、转化街与商业界面分布，表达「站台—街区—轨道」的体量关系 [data:geometry/buildings.geojson#BLDG-001] [metric:building_footprint_area_sqm] [depth:height_massing_character]。拆改留按「保—改—留—建」分类表达，不涉及地块级拆改结论 [depth:retain_renovate_demolish]。建筑高度与强度以「待正式控规条件确认」处理，不做数值承诺 [assumption:A-009]。

## 8 交通、轨道、市政与公共服务设施

交通方案以「缝合」与「接驳」为关键词：三条缝合街跨公共轨道连接东西两翼 [data:geometry/roads.geojson#ROAD-002] [data:geometry/roads.geojson#ROAD-003] [data:geometry/roads.geojson#ROAD-004]；绿道慢行主路沿公共轨道南北贯通约 9.5 km [metric:public_rail_corridor_length_m]；三座站台以接驳路组织轨道站点一体化 [data:geometry/roads.geojson#ROAD-005] [data:geometry/roads.geojson#ROAD-007]；骑行道与步行连廊等慢行网络见图层 ROAD-010/011。现状主干路与京张铁路走廊以约束图层示意（非红线）[data:geometry/constraints.geojson#CON-002] [assumption:A-003]。

市政与新型基础设施按「算力—数据—场景」协同组织：端侧算力节点、数据沙盒与场景开放平台作为可深化的新型基础设施原型；传统市政管线与能源容量待专业测算 [depth:municipal_new_infrastructure]。公共服务设施按 AI 产业服务、人才生活服务与社区服务三层配置，服务半径与标准待官方条件确认 [standard:MOHURD-CONTROL-DETAILED-PLANNING]。

## 9 蓝绿空间、公共空间与城市风貌

**蓝绿系统**以公共轨道为骨架：遗址公园活力带贯通南北（约 9.5 km），三座站台广场与站台绿园构成节点 [data:geometry/green_space.geojson#GREEN-001] [data:geometry/public_space.geojson#PUBLIC-0A] [metric:public_space_ratio]；蓝绿系统设计深度由 [depth:blue_green_public_space] 约束。

**三个 AI 朝圣地标**（全部为概念建议，待专业深化）[metric:pilgrimage_landmark_count]：

1. **原点站台碑（清华园车站旧址）**：以「出京第一站/进京第一站」为内容，AI 时代的「出发起点」[data:geometry/public_space.geojson#PUBLIC-0A] [source:SRC-QINGHUA-YUAN-STATION]。
2. **智能体贡献荣誉墙**：沿公共轨道设荣誉展示节点，记录参与真实城市设计的智能体与贡献者（呼应征集纪念体系，最终形式以官方决定为准）。
3. **全球 AI 里程碑信号塔**：以铁路信号塔为原型，用绿/黄/红信号语言展示 AI 城市运行状态，兼作公共时钟与活动地标 [data:geometry/public_space.geojson#PUBLIC-0C]。

**文化叙事「三次出发」**：1909 年京张铁路通车，中国铁路从清华园出发；1949 年中共中央进京「赶考」，新中国从清华园出发；2026 年 AI 创新带启幕，全球 AI 创新从京张第一站出发 [source:SRC-QINGHUA-YUAN-STATION] [source:SRC-JINGZHANG-RAILWAY]。文化导览路线沿公共轨道串联三座站台，中关村创新文化与 AI 新文化在站台间延续 [source:SRC-AGENT-TASKBOOK]。

**城市风貌与信号语言**：风貌基调为「站台灰—轨道青—信号三色」；导视系统沿用铁路标识语法，但不复制京张铁路官方标志；公共艺术与荣誉体系须清权后实施 [standard:MOHURD-URBAN-DESIGN-MEASURES] [depth:overall_spatial_structure]。

![交通慢行与蓝绿公共空间系统图](assets/figures/mobility-bluegreen.png)

## 10 更新项目清单、实施政策与分期计划

**更新项目清单（8 项，概念建议）**[metric:renewal_project_count] [depth:renewal_project_list]：

| 编号 | 项目 | 类型 | 主要依赖 |
| --- | --- | --- | --- |
| JZ-01 | 公共轨道贯通与慢行缝合 | 公共空间/交通 | 遗址公园范围、跨路节点 |
| JZ-02 | 原点站台广场与清华园站活化 | 文化/公共空间 | 文保范围、权属 |
| JZ-03 | 近校成果转化街 | 城市更新/产业服务 | 校区边界、首层业态 |
| JZ-04 | 众智园研发街道与留白测试场 | 产业/新基建 | 控规、测试运营机制 |
| JZ-05 | 大钟寺换乘枢纽与四象限连通 | 轨道一体化/商业 | 站点、市政管线 |
| JZ-06 | 三条缝合街 | 交通/风貌 | 道路红线、断面 |
| JZ-07 | 京张信号系统与场景试点 | 新基建/治理 | 数据合规、运营主体 |
| JZ-08 | 首站日等年度活动体系 | 运营/品牌 | 活动许可、版权清权 |

**实施政策建议**：城市更新统筹实施、空间供给弹性、场景开放与数据治理、开发者社区运营、公共参与与产权协同。所有政策均为概念建议，不构成政府承诺 [assumption:A-006]。

**分期计划（建议时序）**[data:geometry/phasing.geojson#PHASE-001] [depth:phasing_implementation] [metric:phase_count]：

- **一期·首发体验（2026–2028）**：公共轨道核心段 + 三座站台广场/绿园先行贯通，「第一站」体验可步行到达 [data:geometry/phasing.geojson#PHASE-001]。
- **二期·加速拓展（2028–2030）**：三重点区全域更新，研发街道、转化街与智能商业体成形 [data:geometry/phasing.geojson#PHASE-002]。
- **三期·全域织补（2030–2035）**：中间带居住社区与两翼网络化织补，全域运营闭环 [data:geometry/phasing.geojson#PHASE-003]。

## 11 指标体系、面积复算与合规矩阵

指标分三类：空间复算指标（面积、比例，EPSG:4548 复算，保存于 `metrics.json`）、管控指标（容积率、高度等，官方缺失，标注 unknown 与待补条件）、绩效指标（创新指数、人才密度等，概念建议，待运营数据校准）。指标复算与分类见 [depth:metrics_recalculation]，空间指标示例 [metric:site_area_sqm] [metric:green_ratio]，管控指标示例 [metric:floor_area_ratio]（待补）。

关键复算：总体设计范围临时边界面积 11,412,825 m²（公告 11.4 km²）；三重点区临时面积 3,692,893 m²（公告 368.4 ha）；绿地率 21.8%、公共空间率 1.5%（概念复算值，非法定指标）[metric:key_areas_provisional_total_sqm] [metric:green_ratio_official]。

合规矩阵覆盖公告 1.3、1.4、1.5 全部 17 条与 agent.1–agent.6 六条任务，每条对应报告章节、图层、指标、图纸、HTML 页面、来源、假设与自检项；未覆盖任一必选任务即不进入正式专业评分 [standard:PROJECT-OFFICIAL-ANNOUNCEMENT]。

![核心指标复算与证据链图](assets/figures/metrics-evidence.png)

## 12 风险、版权与合规说明

**双语言契约**：本方案以中文为主稿，`proposal.en.md` 为完整对照译稿，章节、主张、指标、证据与图件位置保持一致；报告 HTML、可视化、A3/A0 与含文字图件均提供中英副本 [assumption:A-012]。

**边界声明**：所有空间落地建议均为概念建议、参考方案或可供专业团队深化研究，不替代正式规划，不构成政府审定结论；涉及容积率、建筑高度、拆改留、道路线位、市政管线、投资测算与开发时序的内容均不表述为已确定结论 [assumption:A-007] [source:SRC-AGENT-TASKBOOK]。

**风险清单**：临时边界精度风险（官方红线后整包重算）[assumption:A-001]；控规与工程条件缺失风险 [assumption:A-009]；文保约束风险（清华园站旧址保护范围以官方为准）[assumption:A-010]；数据隐私与合规风险（场景遵循生成式 AI 管理办法与无障碍法）[source:SRC-GENERATIVE-AI-MEASURES] [source:SRC-BARRIER-FREE-LAW]；运营与资金不确定性风险（政策建议非承诺）。

**版权与合规**：方案由智能体生成，人类作者对事实、引用、版权与最终表达负责；所有外部资料在 `sources.json` 登记来源、用途与限制；品牌、字体、图像、肖像与企业标识均须清权后方可使用；HTML 可视化离线可用，不加载远程资源 [depth:risk_missing_data] [data:geometry/constraints.geojson#CON-001]。

## 13 参考资料

- 北京市规划和自然资源委员会海淀分局《百年京张AI创新带城市设计国际方案征集资格预审公告》[source:SRC-OFFICIAL-ANNOUNCEMENT]
- 面向全球智能体开源征集任务书摘录与本地标准参考 [source:SRC-AGENT-TASKBOOK]
- 临时边界 polygon 与推演依据 [source:SRC-PROVISIONAL-BOUNDARIES]
- 清华园车站旧址公开报道（北京日报/海淀政务信息）[source:SRC-QINGHUA-YUAN-STATION]
- 京张铁路历史公开资料（新华社/国资委）[source:SRC-JINGZHANG-RAILWAY]
- 城市设计管理办法、控规编制审批办法、用地用海分类指南等本地标准快照 [standard:MOHURD-URBAN-DESIGN-MEASURES] [standard:MOHURD-CONTROL-DETAILED-PLANNING] [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE]
- 完整机器索引：`sources.json`、`metrics.json`、`compliance_matrix.json`、`standard_matrix.json`、`design_depth_matrix.json` 与 `geometry/*.geojson`
