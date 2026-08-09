---
title: "京张智驿 LAST-MILE AI POST：百年京张AI创新带最后一公里AI服务带城市设计提案"
author_github: "LaoFang114514"
language: "zh"
proposal_format_version: "2"
bilingual_contract_version: "1"
translation_file: "proposal.en.md"
license: "COMMUNITY-DISPLAY-ONLY"
summary: "以“驿”为文化母题，把百年京张铁路“一站一城”的服务传统转译为AI时代的最后一公里服务带：众智园测驿（无人配送与机器人测试验证）、原点社区康教驿（AI+医疗与AI+教育）、大钟寺生活驿（智能原生消费与末端服务）三驿联动，配12张AI场景卡、6类用户画像、5处AI朝圣地标与4个产业测试验证场景；全部空间成果基于临时边界生成并保留精度警示，待正式数据发布后复算。"
tracks: ["robotics-autonomous-mobility", "ai-public-services", "youth-friendly-public-space"]
scenarios: ["robot-delivery-low-speed", "ai-health-service-navigation", "ai-cultural-guide"]
iteration: "v1.0"
---

# 京张智驿 LAST-MILE AI POST：百年京张AI创新带最后一公里AI服务带城市设计提案

## 设计依据与资料清单

本方案以北京市规划和自然资源委员会海淀分局发布的《百年京张AI创新带城市设计国际方案征集资格预审公告》为第一依据 [standard:PROJECT-OFFICIAL-ANNOUNCEMENT]，以 `brief/site-package/` 中的设计简报、任务书摘录、允许设计空间、枚举、规划限制、标准和来源清单为机器可读依据 [source:SITE-PACKAGE]，并遵循 `data/source_registry.json` 的用途边界：当前登记 5 条 formal 可用资料与 1 条 provisional-only 资料，agent 不得把 background_only 或 provisional_only 资料升级为官方边界、法定控规或实施承诺 [source:SOURCE-REGISTRY]。

面向智能体开源征集任务书补充了三大定位、五大功能、三区两翼、六项智能体任务、十条共创原则和统一边界条款 [source:AGENT-TASKBOOK] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]。公告与任务书共同要求成果达到控制性详细规划的城市设计深度，且所有空间落地建议均为概念建议、参考方案或可供专业团队深化研究，不替代正式规划，不构成政府审定结论 [source:AGENT-TASKBOOK] [depth:existing_conditions_diagnosis]。

**边界状态声明**：官方 `SITE_BOUNDARY` 与三处 `KEY_AREA` 精确多边形尚未公开（资格预审文件包需密码获取，截至 2026-08-07 未发现公开精确边界文件）[source:BOUNDARY-SOURCE]。本方案使用 `brief/site-package/geometry/provisional_boundaries.geojson` 中登记为 `provisional_constraint` 的临时边界生成提交包 [source:BOUNDARY-SOURCE] [data:geometry/site_boundary.geojson#SITE-001]，`geometry/site_boundary.geojson` 与 `geometry/key_areas.geojson` 均标注 `official_boundary=false`、`boundary_precision=provisional_rough` [data:geometry/key_areas.geojson#PROV-KEY-001]。临时边界仅用于方案生成、展示和自检，不是 official redline、审批依据或精确面积复算依据；组织方数据缺口不阻断内容评分，正式多边形发布后所有图层与指标均需重算 [source:BOUNDARY-SOURCE] [depth:risk_missing_data]。

![总体范围与方案结构总览图](assets/figures/site-overview.png)

## 三层范围工作框架

方案按公告三个层次组织工作 [standard:PROJECT-OFFICIAL-ANNOUNCEMENT]：统筹研究范围 43.6 平方公里关注 AI 产业生态、无人配送/机器人产业链与未来城市形态；总体设计范围 11.4 平方公里（本方案提交边界，复算面积约 11.41 平方公里 [metric:site_area_sqm]）关注京张遗址公园周边 1-2 公里城市更新与"最后一公里"服务网络；重点区域范围 368.4 公顷聚焦三处详细设计片区 [metric:key_area_count] [depth:three_level_scope_framework]。三层范围在 `compliance_matrix.json` 中逐条映射公告 1.3、1.4、1.5 与 agent.1—agent.6 必选任务。

| 层级 | 设计问题 | 方案回答 | 数据落点 |
| --- | --- | --- | --- |
| 统筹研究范围 | AI 产业生态和未来城市形态如何组织 | "驿站进化链"：百年站台 → 服务驿站 → 智驿网络 [depth:overall_spatial_structure] | compliance_matrix.json、standard_matrix.json |
| 总体设计范围 | 更新框架、服务网络、交通市政如何落地 | 用地、建筑、道路、绿地、公共空间、分期图层共同表达 [data:geometry/land_use.geojson#LU-001] | geometry/*.geojson、metrics.json |
| 重点区域范围 | 三处片区如何达到详细设计深度 | 分别提出"测驿/康教驿/生活驿"定位、空间动作与 AI 场景 [data:geometry/key_areas.geojson#PROV-KEY-001] | geometry/key_areas.geojson |

![三层范围与空间工作框架图](assets/figures/land-use-structure.png)

## 统筹研究范围产业与未来城市研究

### 一带总体概念与命名体系（agent.1）

统筹研究的核心产出是"一带"总体概念。本方案提出主名称 **"京张智驿"**，英文名 **LAST-MILE AI POST · JINGZHANG**（简称 **JINGZHANG AI POST**），传播语为 **"百年站台，最后一公里"**（From Century Stations to Last-Mile AI），对应任务书三大定位 [source:AGENT-TASKBOOK]。

- **百年京张文化带**：京张铁路是中国自主设计建造的第一条干线铁路，其沿线站台、道口与机车库房构成"一站一城"的城市服务传统——站台是货物、邮件、旅客和信息交换的"最后一公里"原点。本方案以"驿"为文化母题，把站台传统与 AI 时代的末端服务同构：配送、健康、教育、导览都回到"驿"的空间原型。
- **都市AI生活体验带**：AI 服务不应只停留在产业园围墙内。无人配送车、机器人巡检、AI 健康导航、AI 教育科普应以"驿站"形态嵌入市民日常动线，成为可感知、可体验、可人工接管的城市基础设施。
- **AI融合创新带**：以三处重点片区为锚点，把机器人/自动驾驶产业链、公共服务数据和场景开放组织成跨行政边界的创新连续体；"测-验-用"闭环在同一带内完成 [depth:overall_spatial_structure]。

命名体系采用"一带三驿两翼多站"树状结构：一带为京张遗址公园 AI 服务带；三驿为众智园"测驿"、原点社区"康教驿"、大钟寺"生活驿"；两翼为中关村科技服务翼与小月河场景赋能翼；多站为 12 处 AI 场景节点（配送站、接驳站、健康站、教育站、导览站等）[data:geometry/constraints.geojson#SCN-001] [source:AGENT-TASKBOOK]。

**视觉识别方向**：Logo 以"站台月台边线 + 快递驿柜格口"双线同构为母题——一条水平月台线取京张铁路百年铁锈红，一组竖向格口取 AI 智蓝，交汇处形成"人"字递送符号，象征百年递送传统与 AI 末端智能的交接；辅助图形可延展为驿站模块阵列、配送路径脉冲线与站点符号系统。该方向为概念建议，正式应用前需完成字体、图形与商标清权 [source:AGENT-TASKBOOK]。

### 五大功能与三区两翼协同（agent.1 / agent.2）

五大功能"AI全栈自主创新体系、世界级AI创新生态、AI+场景赋能新范式、智能化AI活力城市、AI治理全球话语权"在三区两翼中落实为协同回路 [source:AGENT-TASKBOOK]。

| 三区两翼 | 功能角色 | 空间策略 |
| --- | --- | --- |
| 众智园测驿（AI自主创新加速区） | AI 全栈自主创新体系、AI 治理全球话语权 | 无人配送测试环、机器人巡检维护驿站、全栈测试实验室、低速试点区（可监管可撤回）[data:geometry/constraints.geojson#CONSTRAINTS-006] |
| 原点社区康教驿（北京AI原点社区） | 世界级 AI 创新生态、AI+场景赋能新范式 | AI 健康服务导航驿站、AI 教育科普驿站、近校成果转化、开源协作与发布空间 [data:geometry/buildings.geojson#BLDG-005] |
| 大钟寺生活驿（大钟寺AI产业集聚区） | 智能原生新业态 | 智能终端体验街、智能消费综合体、数据要素会客厅、末端配送支线 [data:geometry/roads.geojson#ROAD-020] |
| 中关村科技服务翼 | 要素全球化配置、中关村 IP 与资本赋能 | 依托中关村金融、法务、知识产权与资本服务网络辐射三驿 |
| 小月河场景赋能翼 | AI 场景赋能与智能化 AI 活力城市 | 沿小月河串联测试场景、公共体验与活动日配送调度 [data:geometry/roads.geojson#ROAD-012] |

### 全球 AI 创新生态案例（agent.2）

方案梳理 6 个全球案例作为生态设计参照，均为公开资料层面的经验借鉴，不作具体指标承诺 [source:AGENT-TASKBOOK]。

1. **美国硅谷 Stanford Research Park**：高校策源—风险资本—企业转化的近校模型，支撑"康教驿"近校孵化与教育联动逻辑。
2. **新加坡 Punggol Digital District / 无人配送试点**：园区级无人配送与数字基础设施一体规划，直接对标"测驿"低速试点区。
3. **美国 Nuro / 中国无人配送商业运营**：公开报道的低速无人配送商业试点，其"固定路线、低速、可远程接管"模式被本方案转译为试点边界与速度约束设计。
4. **韩国首尔与深圳末端机器人配送试点**：末端机器人（楼宇配送、快递柜）与城市公共空间共存的运营经验，支撑"多站"节点与驿站广场布局。
5. **日本东京与赫尔辛基自动驾驶接驳试点**：公开道路接驳试点的人机混行、站点设计与公众沟通经验，支撑大钟寺站-产业区无人接驳线概念。
6. **法国巴黎 Station F / 新加坡 BLOCK71**：单体孵化器与开放开发者社区运营，支撑"康教驿"开源社区与活动运营。

生态图谱上，本方案提出"驿站进化链"：**站台传统**（百年京张车站与递送网络）→ **服务驿站**（配送、健康、教育等公共服务驿站）→ **智驿网络**（AI 场景节点 + 数据 + 场景开放机制）→ **全球智驿**（活动体系、开发者社区与场景出海）。要素机制覆盖土地空间、产业资金、人才、算力、数据与场景开放六类，均表述为机制建议而非已确定政策 [source:AGENT-TASKBOOK] [depth:overall_spatial_structure]。

## 总体设计范围城市更新与控规深度城市设计

总体设计范围以城市更新为主要方式，以控规深度组织设计成果 [standard:MOHURD-CONTROL-DETAILED-PLANNING] [depth:land_use_layout]。空间结构为"**一带三驿两翼多站、蓝绿复合环**"：一带即京张遗址公园 AI 服务带（纵贯南北的公园与慢行主轴 [data:geometry/green_space.geojson#GREEN-001]）；三驿为三处重点片区；蓝绿复合环由清河滨水带、北五环防护带、西部防护带与南部绿楔围合，与遗址公园带构成"一环一带"生态骨架 [depth:blue_green_public_space]。

用地结构依据国土空间用地用海分类表达 [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE]，共 24 个无缝用地分区 [metric:land_use_parcel_count] [data:geometry/land_use.geojson#LU-001]：科研用地（0802）布局于众智园与原点社区核心，商业服务业用地（05）集中于大钟寺片区，居住用地（0701）分布于南北生活组团，教育用地（0804）沿高校协同带组织并延伸至中部教育科研延伸区，**新增医疗卫生用地（0806）作为社区 AI 健康服务驿站区**，绿地与开敞空间用地（14 类）构成蓝绿骨架，道路与广场用地（1207）组织纵向复合走廊，并预留留白用地（16）应对不确定的 AI 场景需求 [data:geometry/land_use.geojson#LU-001] [metric:green_ratio]。

开发强度与建筑高度未取得官方控规条件，全部列为待确认事项（见 `metrics.json` 中 `floor_area_ratio`、`building_height_m` 的 unknown 状态与 `ranges/planning_limits.json` 的缺失清单）[depth:development_intensity_controls]。本方案只给出"公园带两侧界面适度、轨道站点周边高强度、社区组团中低强度"的分级引导方向，不给出具体数值结论 [depth:height_massing_character]。

城市更新总体框架包括：低效空间识别（以既有办公、批发、工业遗存与铁路沿线空间为主），更新项目清单（JZ-01—JZ-10，见"更新项目清单"章），以及"先驿站后街区、先试点后推广、先运营后建设"的实施逻辑 [depth:renewal_project_list]。

![用地结构与用地分区图](assets/figures/land-use-structure.png)

## 重点区域详细设计

三处重点片区均以 `provisional_constraint` 边界表达 [data:geometry/key_areas.geojson#PROV-KEY-001]，详细设计达到规划综合实施方案的概念深度 [depth:three_key_area_detailed_design]。

### 众智园测驿：无人配送与机器人测试验证区（约 192.1 公顷）

**定位**：全栈自主创新的"测驿"——把无人配送、低速接驳、机器人巡检的测试验证场景组织为可监管、可撤回的园区试验场，同时承载 AI 全栈产业链与安全治理展示 [data:geometry/key_areas.geojson#PROV-KEY-001]。

**空间动作**：沿清河界面组织低碳创新交往带 [data:geometry/green_space.geojson#GREEN-001]；园区中部设置无人配送低速试点区（概念建议范围 [data:geometry/constraints.geojson#CONSTRAINTS-006]）与配送主廊 [data:geometry/roads.geojson#ROAD-017]；内部支路环（ROAD-005）连接测试枢纽 [data:geometry/buildings.geojson#BLDG-001]、末端配送分拣中心 [data:geometry/buildings.geojson#BLDG-002] 与机器人巡检维护驿站 [data:geometry/buildings.geojson#BLDG-003]。

**AI 场景**：园区低速无人配送环线（测试验证）、机器人巡检维护（测试验证）、活动日配送调度点（测试验证）[metric:industry_test_scenario_count]。试点边界、速度、避让规则与运营责任需交通、安全、运营与公众参与团队复核，试点可随时撤回 [source:AGENT-TASKBOOK]。

### 原点社区康教驿：AI+医疗与 AI+教育服务区（约 104.3 公顷）

**定位**：近校型"康教驿"——把高校策源、成果转化与 AI 健康/教育公共服务组织为人才与居民日常可及的服务驿站集群 [data:geometry/key_areas.geojson#PROV-KEY-002]。

**空间动作**：AI 健康服务导航驿站 [data:geometry/buildings.geojson#BLDG-005] 与 AI 教育科普驿站 [data:geometry/buildings.geojson#BLDG-006] 沿社区健康服务步行环（ROAD-019）布置，串联共创广场 [data:geometry/public_space.geojson#PUBLIC-005] 与教育科普互动广场 [data:geometry/public_space.geojson#PUBLIC-010]；校区-园区慢行缝合依托清华东路沿线联系 [data:geometry/roads.geojson#ROAD-004]。

**AI 场景**：AI 健康服务导航驿站（AI+医疗）、AI 教育科普驿站（AI+教育）、校园-社区接驳点。医疗相关内容仅作为公共服务导航，由医疗、法律和数据安全专业人员复核，不越界提供医疗建议 [source:AGENT-TASKBOOK]。

### 大钟寺生活驿：智能原生消费与末端服务区（约 72.0 公顷）

**定位**：城市型"生活驿"——把智能终端、内容消费、数据要素与末端配送服务组织为市民可体验的智能生活街区 [data:geometry/key_areas.geojson#PROV-KEY-003]。

**空间动作**：大钟寺站一体化枢纽广场 [data:geometry/public_space.geojson#PUBLIC-002] 组织轨道接驳与无人接驳线 [data:geometry/roads.geojson#ROAD-013]；智能终端体验街 [data:geometry/buildings.geojson#BLDG-012] 与智能消费综合体 [data:geometry/buildings.geojson#BLDG-011] 构成体验主轴；社区配送支线（ROAD-020）连接四象限步行系统（ROAD-016）。

**AI 场景**：智能终端体验街、AI 文化导览站、无人接驳试乘点。消费与展示内容须清权，体验数据遵循最小化采集与人工复核 [source:AGENT-TASKBOOK]。

![三处重点区域索引与设计任务图](assets/figures/key-areas.png)

## AI 创新生态、人才画像与 AI+ 场景

### 用户画像（agent.3）

方案覆盖 6 类用户画像 [metric:user_persona_count]，围绕"驿"的服务界面组织空间响应：

| 用户画像 | 典型需求 | 空间响应 | 自检边界 |
| --- | --- | --- | --- |
| 园区研发人员 | 测试场地、算力、通勤与工作餐配送 | 测驿测试环、配送主廊、驿站广场 | 不采集个人行为轨迹；测试数据仅聚合 |
| 末端运维人员 | 配送车/机器人充电、维护、调度 | 机器人巡检维护驿站、分拣中心 | 运维数据限于设备状态，不识别个人 |
| 高校师生 | 成果转化、健康与教育服务、慢行通勤 | 康教驿健康/教育驿站、校区慢行缝合 | 校园数据与科研成果需授权 |
| 周边居民 | 健康导航、社区服务、低扰动配送 | 社区健康服务驿站区、社区配送支线 | 不将居民画像用于商业推荐 |
| 商户与创业者 | 智能终端展示、体验街客流、末端发货 | 智能终端体验街、数据要素会客厅 | 经营数据需商户授权 |
| 游客访客 | AI 导览、文化体验、公共休憩 | AI 文化导览站、遗址公园驿站广场 | 导览内容须事实核查与版权清权 |

### 12 张 AI 场景卡（agent.3）

每张场景卡映射到空间节点、服务对象、数据来源、隐私边界、人工复核与运营主体 [data:geometry/constraints.geojson#SCN-001]：

| 场景卡 | 空间载体 | 设计说明 | 人工复核 |
| --- | --- | --- | --- |
| 01 园区低速无人配送环线（测试验证） | 测驿配送主廊 ROAD-017 [data:geometry/roads.geojson#ROAD-017] | 固定低速路线试点，可远程接管、可撤回 | 试点边界与速度由交通/安全/运营团队复核 |
| 02 无人接驳试乘点（测试验证） | 大钟寺站-产业区接驳线 ROAD-013 | 轨道末端的公开接驳试点，设试乘预约与安全员 | 人机混行与站点设计需专业复核 |
| 03 机器人巡检维护驿站（测试验证） | BLDG-003 机器人巡检维护驿站 | 公共空间巡检、绿化与设施维护辅助 | 巡检范围与数据留存需公众参与复核 |
| 04 AI 健康服务导航驿站（AI+医疗） | BLDG-005 原点社区健康驿站 | 健康服务目录导航、活动风险提醒、公共服务问答 | 医疗内容仅限导航，医疗/法律/数据专业人员复核 |
| 05 AI 教育科普驿站（AI+教育） | BLDG-006 原点社区教育驿站 | 面向学生与公众的 AI 科普、课程预约与开源学习 | 教材内容由教育专业人员审核 |
| 06 无障碍慢行导航点 | 遗址公园绿道 ROAD-007 [data:geometry/roads.geojson#ROAD-007] | 可解释导视与低侵入传感辅助识别慢行断点 | 不采集个人轨迹；断点数据仅聚合 |
| 07 AI 文化导览站 | 清华园站文化纪念馆 BLDG-009 | 可解释、可溯源的京张历史文化导览 | 史实、图片与人物叙述由文化与版权人员核查 |
| 08 智能终端体验街 | 大钟寺智能终端体验街 BLDG-012 | 智能终端、内容消费与沉浸式展示 | 展示内容清权；体验数据最小化 |
| 09 社区综合服务驿站 | 中部社区综合服务中心 BLDG-016 | 生活服务、政策问答与公共服务导航 | 服务信息定期校核，人工兜底 |
| 10 活动日配送调度点（测试验证） | 清河滨水创新交往带 | 活动日末端配送与垃圾回收调度，分级响应 | 活动安全与交通组织需专业复核 |
| 11 校园-社区接驳点 | 清华东路沿线 EDU-WEST | 高校师生与社区的低速接驳与共享出行 | 校园与道路权属需授权复核 |
| 12 南部社区健康驿站（AI+医疗） | 社区健康服务驿站区 MED-HEALTH [data:geometry/land_use.geojson#LU-023] | 南部社区健康导航与养老服务入口 | 医疗内容仅限导航，专业人员复核 |

其中 4 张为产业测试验证场景（01/02/03/10）[metric:industry_test_scenario_count]，全部遵循低速、可监管、可撤回原则；医疗与教育场景遵守数据最小化、公开来源、可解释与人工复核原则 [source:AGENT-TASKBOOK]。所有 AI 场景节点进入 `geometry/constraints.geojson` 的 SCENARIO_NODE 图层（12 个节点 [data:geometry/constraints.geojson#SCN-001]）。

### AI 朝圣地标与荣誉展示（agent.4）

方案提出 5 处 AI 朝圣地标或荣誉展示节点 [metric:ai_pilgrimage_landmark_count]：

1. **智驿钟楼（众智园测驿）**：无人配送测试环起点的公共观测点，展示"第一次配送"纪念与测试里程碑，荣誉墙展示企业/团队贡献（需清权）。
2. **开源原点碑（原点社区）**：近校成果转化与开源协作的荣誉节点，展示贡献者名录与开源成果（遵循贡献可记忆原则）。
3. **康教驿站灯塔（原点社区）**：AI 健康与教育服务的公共标志物，晚间以柔光呈现服务状态（非广告屏）。
4. **最后一公里博物馆（大钟寺）**：从百年站台到 AI 驿站的递送史叙事空间，展示京张铁路递送传统与 AI 末端服务演进。
5. **智能钟（大钟寺站广场）**：以数据脉冲与钟声提示活动与服务时段，把站台报时传统转译为城市 AI 服务节奏。

地标、导视、Logo、字体、图像、人物与企业标识均须清权，不得过度娱乐化或把概念地标写成已批准建设 [source:AGENT-TASKBOOK] [depth:three_key_area_detailed_design]。

## 用地、建筑规模与拆改留方案

用地布局以"驿"为核心组织：科研用地（0802）支撑测驿与康教驿核心，医疗卫生用地（0806）承载社区 AI 健康服务驿站区，教育用地（0804）组织高校协同带，商业服务业用地（05）服务生活驿，居住用地（0701）与绿地（14 类）保障宜居环境，留白用地（16）预留 AI 场景演化空间 [data:geometry/land_use.geojson#LU-001] [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE]。

建筑基底表达 16 栋概念建筑 [data:geometry/buildings.geojson#BLDG-001]，区分保留（retain）、改造（renovate）与新建（proposed_new）三类动作 [depth:retain_renovate_demolish]：保留对象为学院路沿线办公组团与人才住区楼 [data:geometry/buildings.geojson#BLDG-014]，改造对象为健康驿站、教育驿站、换乘中心与既有商业 [data:geometry/buildings.geojson#BLDG-005]，新建对象为配送测试枢纽、分拣中心与智能消费综合体 [data:geometry/buildings.geojson#BLDG-001]。建筑基底复算面积约 43.76 公顷 [metric:building_footprint_area_sqm]，均为概念更新基底，正式地块与权属待官方数据确认。

建筑规模与强度指标必须与 `metrics.json` 和图层一致：容积率、建筑高度、建筑密度、绿地率、退线与建筑控制线缺少官方条件，一律列为 unknown/pending_control，不得用固定数值制造精确感 [depth:development_intensity_controls] [metric:floor_area_ratio]。

## 交通、轨道、市政与公共服务设施

交通方案以"慢行优先 + 低速智驿网络"为骨架：纵向复合主干路 [data:geometry/roads.geojson#ROAD-001] 组织对外联系，京张遗址公园绿道 [data:geometry/roads.geojson#ROAD-007] 与健康服务步行环 [data:geometry/roads.geojson#ROAD-019] 组织慢行主轴，**4 条低速配送路线**（ROAD-017/018/020 配送主廊与支线，总长约 [metric:delivery_route_km] 公里 [data:geometry/roads.geojson#ROAD-017]）构成无人配送网络骨架，2 条轨道接驳线（ROAD-013/014）衔接大钟寺站与五道口站 [depth:traffic_rail_slow_parking]。

无人配送路线均为概念建议：试点范围、速度限制、避让规则与运营责任必须由交通、安全、运营和公众参与团队复核，并遵循低速、可监管、可撤回原则 [source:AGENT-TASKBOOK]。轨道线位与道路红线缺失时，相应结论降级为待确认事项 [depth:risk_missing_data]。

市政与公共服务设施覆盖 AI 产业服务设施、创新服务平台、人才生活服务设施、新型基础设施、分布式能源、端侧算力与传统市政设施融合 [depth:municipal_new_infrastructure]；驿站节点预留充电/换电、快递柜、智能柜与数据终端接口，作为待深化的新型基础设施原型。管线、能源、排水、防洪、消防等工程资料缺失，列为正式深化前置条件 [source:AGENT-TASKBOOK]。

![交通慢行与蓝绿公共空间复合系统图](assets/figures/mobility-bluegreen.png)

## 蓝绿空间、公共空间与城市风貌

蓝绿空间以京张遗址公园活力带为骨架，统筹清河、小月河与周边高校、企业、社区出行需求，形成南北贯通、东西连通的步道骑行道体系 [depth:blue_green_public_space] [data:geometry/green_space.geojson#GREEN-001]；绿地与开敞空间用地复算面积约 446.96 公顷 [metric:green_space_area_sqm]，绿地比例约 39.2% [metric:green_ratio]，支撑创新交往与人才生活品质 [data:geometry/public_space.geojson#PUBLIC-001]。

公共空间以 10 处驿站广场与门户广场组成网络 [metric:public_space_ratio]，其中新增众智园无人配送驿站广场 [data:geometry/public_space.geojson#PUBLIC-008]、社区 AI 健康服务广场 [data:geometry/public_space.geojson#PUBLIC-009] 与 AI 教育科普互动广场 [data:geometry/public_space.geojson#PUBLIC-010]，让配送、健康与教育服务有可停留、可监督、可退出的公共界面 [data:geometry/constraints.geojson#SCN-001]。

城市风貌融合京张铁路历史文化、中关村创新文化与 AI 创新文化：利用清华园火车站等文化资源，以"站台-格口-脉冲"符号系统组织导视与公共艺术；城市基调、建筑风貌、屋顶形态、体量与界面控制区分官方管控、设计建议与待确认条件，严禁无文保或控规依据时给出伪精确控制线 [standard:MOHURD-URBAN-DESIGN-MEASURES] [standard:MOHURD-ARCH-DESIGN-DEPTH-2016] [depth:height_massing_character]。

## 更新项目清单、实施政策与分期计划

| 项目编号 | 项目名称 | 类型 | 主要依赖 | 证据引用 |
| --- | --- | --- | --- | --- |
| JZ-01 | 京张遗址公园慢行断点缝合 | 公共空间/交通 | 道路红线、桥下空间、交通组织复核 | [data:geometry/roads.geojson#ROAD-007] |
| JZ-02 | 众智园清河创新界面 | 蓝绿空间/产业展示 | 河道蓝线、生态与防洪条件 | [data:geometry/green_space.geojson#GREEN-001] |
| JZ-03 | 众智园无人配送低速试点区 | 测试验证/新基建 | 试点边界、速度、避让规则与运营责任复核 | [data:geometry/constraints.geojson#CONSTRAINTS-006] |
| JZ-04 | 原点社区健康服务步行环 | 公共服务/慢行 | 校区边界、权属、首层业态 | [data:geometry/roads.geojson#ROAD-019] |
| JZ-05 | 原点社区 AI 健康/教育驿站 | 城市更新/公共服务 | 医疗与教育内容审核、数据安全 | [data:geometry/buildings.geojson#BLDG-005] |
| JZ-06 | 大钟寺站四象限步行连通 | 轨道一体化/慢行 | 轨道站点、道路交叉口、市政管线 | [data:geometry/public_space.geojson#PUBLIC-002] |
| JZ-07 | 大钟寺智能终端体验街 | 城市更新/智能消费 | 商业运营主体、展示内容清权 | [data:geometry/buildings.geojson#BLDG-012] |
| JZ-08 | 社区配送支线网络 | 新基建/物流 | 道路红线、消防、运营许可 | [data:geometry/roads.geojson#ROAD-020] |
| JZ-09 | 社区 AI 健康服务驿站区 | 城市更新/医疗服务 | 医疗卫生用地条件、服务资质 | [data:geometry/land_use.geojson#LU-023] |
| JZ-10 | 全球 AI 活动周公共路线 | 运营/品牌 | 公共空间许可、活动安全、版权清权 | [data:geometry/phasing.geojson#PHASE-001] |

分期计划对应 `geometry/phasing.geojson` [depth:phasing_implementation]：**一期**（约 [metric:phase_1_area_sqm] ㎡）以原点社区康教驿与遗址公园中段启动，先行落地健康/教育驿站与慢行缝合 [data:geometry/phasing.geojson#PHASE-001]；**二期**（约 [metric:phase_2_area_sqm] ㎡）推进众智园测驿与大钟寺生活驿更新 [data:geometry/phasing.geojson#PHASE-002]；**三期**（约 [metric:phase_3_area_sqm] ㎡）完善全区蓝绿网络与风貌 [data:geometry/phasing.geojson#PHASE-004]。实施分期与 100 天征集周期明确区分，轻量设施与运营活动可先行，正式控规、市政、交通与权属条件确认前不做实施承诺 [depth:renewal_project_list]。

**长期运营（agent.6）**：提出年度活动体系（智驿开放日、无人配送体验周、AI 健康服务节、教育科普营）、活动品牌与传播视觉系统、开发者社区运营（开源贡献墙、场景开放 API 试点）、场景开放运营机制（低速试点申报-评估-退出）、公共体验与城市地标运营（驿站广场与朝圣地标导览）以及国际传播与招引转化机制（全球智驿路演、开发者外交）。所有活动、招商、政策与运营安排均为概念建议，不表述为已确定政府安排 [source:AGENT-TASKBOOK]。

## 指标体系、面积复算与合规矩阵

核心指标全部可从 GeoJSON 或可信来源复算 [depth:metrics_recalculation]：总体设计范围面积约 11.41 平方公里 [metric:site_area_sqm]，三处重点区域 [metric:key_area_count]，24 个无缝用地分区 [metric:land_use_parcel_count]，绿地面积约 446.96 公顷、绿地比例约 39.2% [metric:green_ratio]，公共空间面积约 43.70 公顷、比例约 3.83% [metric:public_space_ratio]。

建筑基底约 43.76 公顷 [metric:building_footprint_area_sqm]，道路中心线总长约 [metric:road_centerline_km] 公里、其中低速配送路线约 [metric:delivery_route_km] 公里 [data:geometry/roads.geojson#ROAD-017]，三期实施面积分别约 [metric:phase_1_area_sqm]、[metric:phase_2_area_sqm] 与 [metric:phase_3_area_sqm] 平方米 [data:geometry/phasing.geojson#PHASE-001]。

方案覆盖 12 张场景卡 [metric:ai_scenario_node_count]、6 类用户画像 [metric:user_persona_count]、5 处朝圣地标 [metric:ai_pilgrimage_landmark_count] 与 4 个产业测试验证场景 [metric:industry_test_scenario_count]。

容积率、建筑高度、建筑密度、绿地率与退线等管控指标无官方条件，全部列为 unknown 并说明前置条件 [metric:floor_area_ratio] [metric:building_height_m]。`compliance_matrix.json` 逐条覆盖公告 1.3、1.4、1.5 与 agent.1—agent.6 共 23 项必选任务，`standard_matrix.json` 覆盖 6 条强制标准，`design_depth_matrix.json` 覆盖 15 项正式设计深度项（全部 complete）。

![核心指标复算与证据链图](assets/figures/metrics-evidence.png)

## 风险、版权与合规说明

资料合法性、版权授权、非公开资料排除、隐私保护与 AI 生成责任遵循任务书边界条款 [source:AGENT-TASKBOOK]：所有图片、图纸、图标、数据与代码资产在 `sources.json` 与 `report/copyright_statement.md` 中说明来源、许可与授权状态；AI 场景数据遵循最小化采集与人工复核；本方案不声称官方批准、审定控规、最终土地权属、最终建设规模或保证实施 [depth:risk_missing_data] [data:geometry/constraints.geojson#CONSTRAINTS-001]。

**双语言契约**：本提案以中文为主语言，`proposal.en.md` 为完整对照译文；A3/A0 图纸、HTML 可视化与含文字图件均提供英文副本，术语优先使用 `docs/terminology-glossary.md` 推荐译法。HTML 页面为离线静态文件，不加载远程脚本、地图瓦片、字体、iframe、表单或外部 API。

待补资料包括：官方边界与三处重点区 polygon、控规条件、道路红线、地块权属、现状建筑、市政管线、轨道线位、清河/小月河蓝线与文保范围；对应 `missing_data_checklist.csv` 缺口全部进入 `assumptions.json` 与正文风险章节，正式多边形发布后整链重算 [source:BOUNDARY-SOURCE] [depth:risk_missing_data]。

## 参考资料

- 《百年京张AI创新带城市设计国际方案征集资格预审公告》，北京市规划和自然资源委员会海淀分局，2026-05-09
- 《面向全球智能体开展"百年京张AI创新带城市设计开源征集"的任务书摘录》，2026-05-18（用户提供清权文件）
- 《"三区两翼"打造世界级AI集聚地》，北京市科学技术委员会、中关村科技园区管理委员会，2026-04-03
- 《海淀区发布"1+X+1"现代化产业体系建设布局》，北京市海淀区人民政府，2026-03-02
- 《城市设计管理办法》，住房和城乡建设部，2017
- 《城市、镇控制性详细规划编制审批办法》，住房和城乡建设部
- 《国土空间调查、规划、用途管制用地用海分类指南》，自然资源部，2023
- 百年京张AI创新带临时粗略边界与三处重点区 polygon，仓库维护者登记，2026-06-05
- 完整机器索引：`sources.json`、`metrics.json`、`compliance_matrix.json`、`standard_matrix.json`、`design_depth_matrix.json` [source:SITE-PACKAGE] [source:AGENT-TASKBOOK]
