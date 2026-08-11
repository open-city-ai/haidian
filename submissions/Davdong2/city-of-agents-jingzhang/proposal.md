---
title: "CITY OF AGENTS｜百年京张·城市智能生命走廊"
author_github: "Davdong2"
language: "zh"
translation_file: "proposal.en.md"
license: "COMMUNITY-DISPLAY-ONLY"
summary: "以京张铁路遗址公园为贯通北五环—清华园—大钟寺—北京北站的城市记忆主脊，把既有城区升级为万物可感知、可表达、可协作且由人的权利约束的 Urban Agent 系统。方案以一脊三段两翼、十个场景节点、三处测试验证场景和三处朝圣地标落实空间、产业、文化与长期运营。"
tracks: ["ai-traffic-walkability", "jingzhang-heritage-narrative", "civic-agent-governance"]
scenarios: ["ai-traffic-walkability", "robot-delivery-low-speed", "ai-cultural-guide", "enterprise-service-copilot", "public-safety-operations-review"]
iteration: "v1.0"
---

# CITY OF AGENTS｜百年京张·城市智能生命走廊

> **当万物成为 Agent，城市开始苏醒。** 过去，人走进城市；未来，城市会走向人。

本方案不把“AI 城市”理解为在街上堆叠机器人、蓝光屏幕和无人车，而是提出一套可被治理的 **Urban Agent System｜城市智能体系统**：树、灯、椅子、建筑、车辆、商店、机器人和京张铁路记忆都可以拥有身份、能力和受约束的记忆；它们通过统一接口协作，但人的安全、隐私、选择权和人工申诉始终高于系统效率。[standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK] [depth:overall_spatial_structure]

本方案所有空间表述均为**概念建议 / 参考方案 / 供专业团队深化**，不代表政府批准、实施承诺或法定规划结论。核心规划图由提交的 GeoJSON 和 `metrics.json` 程序化生成；17 张场景图和 7 张过程草案为参赛者定向生成并清权的 AI 概念表达，只说明体验意图或共创过程，不承担现状、红线、历史影像或指标证据。[source:USER-CONCEPT-IMAGES] [source:ASSET-CATALOG]

![北五环—北京北站城市尺度愿景鸟瞰：AI 生成概念表达，不作为现状、红线或审批证据](assets/scenes/full-corridor-aerial.jpg)

本次视觉迭代将“全景底图”置于方案表达中心：三张 A0 竖版展板分别承担总体概念、系统策略、场景实施；五张正式横向总图均持续显示北五环—清华园—五道口—北四环—大钟寺—北三环—北京北站的完整廊道。灰色城市肌理只提供阅读语境，不参与面积和工程计算；正式范围、道路、公共空间与节点仍从提交 GeoJSON 派生。原始 AI 展板草案连同可信度筛选结果记录于 `report/narrative.md`，避免把生成式文字或数值误当作正式结论。

![A0-01 总体概念展板：全域总图、城市尺度鸟瞰与场景条带](assets/figures/board-masterplan.png)

![CITY OF AGENTS 总体范围、中央记忆脊与三段城区](assets/figures/site-overview.png)

## 设计依据与资料清单

设计首先读取仓库 `data/source_registry.json`，并以仓库处理后的事实包作为导航而非新权威，将资料分为四类：①可直接用于正式论证的公告、任务书和国家标准；②可用于公共地图语境但不是法定底图的 OpenStreetMap；③参赛者清权的 AI 概念图；④仓库为缺资料场景提供的 provisional 边界。四类资料在 `sources.json` 中逐条登记，在 `assumptions.json` 中声明影响，在三张矩阵中完成“任务—标准—深度—成果”映射。[source:SOURCE-REGISTRY] [source:PROCESSED-FACT-PACK] [source:SITE-PACKAGE] [depth:risk_missing_data]

主要依据如下：

| 资料 | 可承担的证据 | 明确不能承担的证据 |
|---|---|---|
| 官方公告 | 三层范围方向、公告面积、任务目标和重点区名称 | 精确 polygon、道路红线、地块指标、批准结论 |
| 面向智能体任务书 | 六项 Agent 任务、案例/场景/地标/运营数量要求 | 法定控制指标或政府采购承诺 |
| provisional boundaries | 概念设计裁切、图层拓扑和临时面积复算 | 官方范围线、权属界、精确测绘 |
| OSM 走廊公开数据 | 主要道路、铁路和水系的概略语境 | 道路红线、铁路保护范围、工程测量 |
| 用户清权 AI 场景图 | 世界观、体验和氛围表达 | 现状照片、真实站名、历史档案、规划证据 |
| 国家标准与管理办法 | 用地分类、控规表达、城市设计与建筑设计深度校核 | 对本项目的审定值 |

关键文件关系：`sources.json` 记录来源，`assumptions.json` 管理待确认条件，`compliance_matrix.json` 覆盖公告和 Agent 六项任务，`standard_matrix.json` 记录标准转译，`design_depth_matrix.json` 记录十五项专业深度，`self_check.json` 记录机器校验结果。[standard:MOHURD-URBAN-DESIGN-MEASURES] [standard:MOHURD-CONTROL-DETAILED-PLANNING]

## 三层范围工作框架

方案采用“战略研究—总体城市设计—重点区实施接口”三级递进，而不是用一张总图包办不同精度的问题。[source:OFFICIAL-ANNOUNCEMENT] [standard:PROJECT-OFFICIAL-ANNOUNCEMENT] [depth:three_level_scope_framework]

| 层级 | 公告尺度 | 本方案回答 | 成果状态 |
|---|---:|---|---|
| 统筹研究范围 | 43.6 平方公里 | AI 生态、三区两翼、产业与人才协同、未来城市原则 | 公告面积 + 策略研究；无精确 polygon |
| 总体设计范围 | 约 11.4 平方公里 | 一脊三段两翼、用地框架、慢行蓝绿、市政和更新项目 | provisional polygon + 概念方案图层 |
| 三处重点区 | 368.4 公顷合计 | 众智园 192.1 公顷、原点社区 104.3 公顷、大钟寺 72.0 公顷的方向性详细设计 | 公告面积；polygon 为 provisional |

`geometry/site_boundary.geojson#SITE-001` 根据公告文字范围和约 11.4 平方公里约束形成临时粗略 polygon，在 EPSG:4548 下复算约 11.413 平方公里。[data:geometry/site_boundary.geojson#SITE-001] [metric:site_area_sqm] 它只用于裁切设计图层、检查拓扑和生成可替换的底图。收到 official polygon 后，应自动重跑用地面积、绿地/公共空间比例、建筑基底和全部图册；在此之前，矩形边不得解释为地块或道路红线。[source:BOUNDARY-SOURCE] [depth:metrics_recalculation]

三处重点区的公告面积是真实引用，但临时 polygon 只能说明北—中—南相对关系。[source:KEY-AREA-SOURCE] [data:geometry/key_areas.geojson#PROV-KEY-001] [data:geometry/key_areas.geojson#PROV-KEY-002] [data:geometry/key_areas.geojson#PROV-KEY-003] [metric:key_areas_announced_area_sqm] [metric:key_area_count]

![一脊三段两翼的概念用地与空间工作框架](assets/figures/land-use-structure.png)

## 统筹研究范围产业与未来城市研究

### 1. 名称、Logo 与三大定位

**中文名：百年京张·城市智能生命走廊；英文名：CITY OF AGENTS；口号：当万物成为 Agent，城市开始苏醒。** Logo 采用一条竖向琥珀色线穿过三个不同色温的节点，分别代表京张记忆脊、三段 Agent 城区和持续协作的开放接口。字标使用清晰、无装饰的中英文字体；琥珀色代表铁路记忆，蓝色代表公共服务，绿色代表生态生命，紫色代表文化和创造。[source:AGENT-TASKBOOK] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]

三大定位是：

1. **世界级 AI 全栈创新试验走廊**：让算法、算力、数据、硬件、机器人、自动驾驶和城市服务获得可测试、可退出、可复盘的真实场景。
2. **人与城市智能生命共同生活的原点社区**：AI 首先解决老年、儿童、残障、通勤、热舒适和公共服务问题，而不是制造额外操作负担。
3. **京张历史 × 中关村创新 × AI 新文化的时间铁路**：让过去能够被查询、被纠错和共同注释，形成具有北京辨识度的数字公共文化。

五大功能为“研发验证、人才生活、公共服务、文化体验、开放运营”；空间上形成北段众智园“自主创新与测试”、中段原点社区“人才生活与场景孵化”、南段大钟寺“产业聚集与时间铁路”，东翼连接高校与创新资源，西翼连接社区与产业载体，中央京张记忆脊承担跨段协作。[data:geometry/land_use.geojson#LU-001] [data:geometry/land_use.geojson#LU-002] [data:geometry/land_use.geojson#LU-003] [data:geometry/land_use.geojson#LU-004]

### 2. 六个全球案例与可转译机制

案例研究不复制造型，只提取“空间—平台—运营”机制。[depth:existing_conditions_diagnosis]

| 案例 | 公开特征 | 对京张的转译 |
|---|---|---|
| Toyota Woven City | 以人本、持续演化的 living laboratory 组织移动与生活测试 | 把铁路沿线定义为长期实验环境，测试必须有居民反馈和退出机制 [source:CASE-WOVEN-CITY] |
| 新加坡 Punggol Digital District | 产业、教育、社区与 Open Digital Platform 协同 | 以“Agent Passport + 街区开放接口”连接开发者、物业与公共服务 [source:CASE-PUNGGOL] |
| Seoul AI Hub / Yangjae | AI 企业、人才、研究和全球网络聚集 | 众智园形成轻资产加速器、测试场和国际路演接口 [source:CASE-SEOUL-AI-HUB] |
| Helsinki Kalasatama | 在真实社区中持续迭代智慧服务和低碳生活 | 原点社区以居民节省时间、无障碍与公共价值作为核心评价 [source:CASE-KALASATAMA] |
| Barcelona 22@ | 在既有城区中混合知识产业、住房与公共空间 | 大钟寺和沿线存量载体优先活化，避免封闭园区和单一办公 [source:CASE-BARCELONA-22] |
| Masdar City | 可持续城市、创新产业集群与智能移动结合 | 把端侧算力、低碳能源、机器人维护和自主移动纳入同一运营底座 [source:CASE-MASDAR] |

### 3. AI 全栈创新生态

生态不是一张招商清单，而是七个可闭环要素：

- **产业**：模型、机器人、移动智能、城市计算、数字文化和公共服务应用。
- **空间**：研发楼、开放实验亭、场景街道、人才社区、时间铁路和修理公社。
- **算力**：集中训练在合规设施，街区交互尽量采用可维护的端侧算力。
- **数据**：城市数据按公共、授权、敏感、禁止四级分层，默认最小采集。
- **资金**：概念建议采用“场景揭榜 + 里程碑采购 + 运营绩效”组合，具体政策待主管部门深化。
- **人才**：开发者、研究者、创业者、城市运营者和居民共同成为贡献者。
- **场景**：十个节点提供从安全沙盒、公众共测到长期运营的阶梯式进入机制。[data:geometry/public_space.geojson#S01] [metric:scenario_node_count]

年度“Agent 贡献榜”只记录经许可的开源组件、公共服务改进和安全修复，不公开个人轨迹，不用流量或人脸曝光定义荣誉。

## 总体设计范围城市更新与控规深度城市设计

### 1. 空间结构：一脊、三段、两翼、十点

京张铁路是设计的**中央路径**，不是把东西两侧切开的后院。`ROAD-001` 形成约 9.54 公里的概念记忆慢行主脊；七条东西缝合线在现状道路、桥下空间、路口和公园接口条件允许处连接两侧。[data:geometry/roads.geojson#ROAD-001] [metric:memory_spine_length_m] [metric:east_west_stitch_count] 新增穿越不预设工程形式，必须在铁路安全、道路交通、文保和权属资料齐备后专项论证。[depth:traffic_rail_slow_parking]

三段功能不是封闭分区：北段以科研与测试验证为主，中段以人才生活和公共服务为主，南段以历史文化、产业服务和夜间活力为主；中央公园和公共空间贯穿三段，七条横向连接把东翼高校创新资源与西翼社区产业载体接入同一网络。[data:geometry/land_use.geojson#LU-002] [data:geometry/land_use.geojson#LU-003] [data:geometry/land_use.geojson#LU-004]

### 2. 城市更新策略：P0—P3 四级动作

由于缺少官方现状建筑、产权、文保和质量鉴定，本方案**不做逐栋拆除结论**，而提出一套收到资料后可直接套用的分类程序：[depth:retain_renovate_demolish]

| 等级 | 对象 | 原则 | 允许动作 |
|---|---|---|---|
| P0 保护 | 京张历史遗存、依法保护对象、成熟古树等 | 原样保护、最小干预 | 监测、修缮、可逆展示；依法审批 |
| P1 保留 | 在用道路、轨道、结构安全且适用的建筑与设施 | 保持功能和主体 | 首层开放、节能、无障碍、导视与数字接口微改 |
| P2 更新 | 低效界面、桥下空间、闲置首层、断裂步行口 | 优先存量活化 | 轻量加建、功能置换、共享空间、夜间运营 |
| P3 待论证 | 确有安全、功能或公共利益冲突的对象 | 不预设拆除 | 完成价值、结构、权属、碳排、公众影响和替代方案论证后决策 |

`buildings.geojson` 中的八个建筑基底只是**可逆场景原型**，合计约 4.608 万平方米基底，不是现状建筑统计、规划建设总量或新增开发指标。[data:geometry/buildings.geojson#BLDG-001] [metric:building_footprint_area_sqm]

### 3. 控规与风貌接口

概念用地采用国家用地分类子集表达科研、社区服务、文化和公园绿地，完整覆盖临时总体边界且不重叠；其用途是检验结构完整性，不替代法定用地方案。[standard:MNR-LAND-USE-CLASSIFICATION-GUIDE] [depth:land_use_layout]

建筑总规模、容积率和审定高度保持 `unknown`：公开包没有地块边界、现状建筑、规划指标、文保控制和机场/铁路等限高资料。[metric:floor_area_ratio] [metric:approved_building_height_m] [depth:development_intensity_controls] 风貌采用不依赖具体高度的原则：铁路一侧控制连续公共界面和小尺度可逆构件；新体量避免长距离封闭底座；屋顶优先公共生态、设备整合和光伏可维护性；历史界面采用克制材料，不复制假古董，也不以大屏制造“未来感”。[standard:MOHURD-ARCH-DESIGN-DEPTH-2016] [depth:height_massing_character]

## 重点区域详细设计

![三处重点区域索引与落地逻辑](assets/figures/key-areas.png)

### A1 众智园 AI 自主创新加速区｜公告 192.1 公顷

定位为“AI 全栈研发与开放验证北门”。空间上以记忆脊为公共前厅，东西向接口连接创新载体和生活社区；建筑更新优先保留可适用载体，通过共享实验室、开放算力驿站和可逆测试亭降低创业团队进入门槛。慢行系统先连接现状断点，再讨论新建穿越；人格移动港只在可隔离、可限速、可人工接管的沙盒中试运行。[data:geometry/key_areas.geojson#PROV-KEY-001] [data:geometry/public_space.geojson#S02]

实施项目建议包括开放算力驿站、Mobility Personality Port、开发者共创厅和首层开放改造。风险是重点区 polygon、产权、在用企业、安全隔离和交通组织尚未确认，因此所有落位为方向性设计。[depth:three_key_area_detailed_design]

### A2 北京 AI 原点社区｜公告 104.3 公顷

定位为“人与城市智能生命共同生活的首发社区”。空间以 AI 城市客厅、树木议会、无屏路口和静默服务街形成连续日常体验；功能混合人才居住、社区服务、教育、健康和小型创新空间。建筑首先改善首层可达性、遮阴、夜间安全和无障碍，不以拆迁换形象。公共服务 Agent 默认语音/灯光/触觉多通道，并保留完全非数字化使用方式。[data:geometry/key_areas.geojson#PROV-KEY-002] [data:geometry/public_space.geojson#S03] [data:geometry/public_space.geojson#S05]

实施项目建议包括 AI 城市客厅、树木议会、无屏路口共测、长者与残障服务协议。风险是居民隐私、数字排斥、噪声和长期维护，应通过居民委员会、独立伦理审查和可撤回试点治理。[depth:three_key_area_detailed_design]

### A3 大钟寺 AI 产业聚集区｜公告 72.0 公顷

定位为“时间铁路 × AI 新文化 × 存量产业活化门户”。空间以京张1909、Agent 修理公社和北京节点01形成三处可朝圣地标；存量建筑优先导入机器人维修、开源硬件、数字文化、夜间工作室和创新服务，而不是整体推倒重来。慢行连接大钟寺及周边公共交通，夜间物流和机器人维护避开居民安静时段并设置人工调度。[data:geometry/key_areas.geojson#PROV-KEY-003] [data:geometry/public_space.geojson#S07] [data:geometry/public_space.geojson#S09] [data:geometry/public_space.geojson#S10]

实施项目建议包括 Time Railway 1909、Repair Commons、贡献者荣誉墙和夜间运营规则。风险是历史叙事准确性、商业同质化、夜间扰民和遗产控制，应引入史料委员会、社区共治和逐项审批。[depth:three_key_area_detailed_design]

## AI 创新生态、人才画像与 AI+ 场景

### 1. 六类用户画像

| 用户 | 核心需求 | 设计回应 |
|---|---|---|
| 开发者 / 创业团队 | 低成本算力、真实测试、客户和贡献声誉 | 开放算力驿站、三处测试场、Agent Passport、贡献者墙 |
| 科研者 / 高校学生 | 可复现实验、跨机构协作、公共数据 | 数据分级、实验日志、可引用的城市问题库 |
| 企业 / 国际访客 | 快速理解生态、对接场景和人才 | 醒城门、多语导览、开放日和产业路线 |
| 常住居民 / 长者 | 安全、安静、便利、不被迫数字化 | 无屏多通道服务、非数字备选、人工服务台和退出权 |
| 儿童 / 家庭 | 可理解的科技、自然教育和安全玩耍 | 树木议会、儿童人格车辆、分龄权限和监护同意 |
| 残障人士 / 临时行动不便者 | 连续无障碍、可靠导航、尊严和隐私 | 无障碍优先级最高、触觉/声音/灯光互补、人工协助 |

画像不是刻板标签。系统不得根据外貌自动推断年龄、残障、职业、情绪或支付能力；偏好由用户主动选择并可随时删除。[standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]

### 2. 十张场景卡

以下十个节点均写入 `public_space.geojson`，其中 S02、S04、S07 是明确的产业测试验证场景。[metric:test_validation_scene_count]

| 场景卡 | 位置与服务对象 | 运行数据与隐私边界 | 人工复核、运营与主要风险 |
|---|---|---|---|
| **S01 醒城门** | 北段门户；访客、居民、国际用户 | 只处理当次语言与无障碍偏好；默认不做人脸识别、不跨日追踪 | 公共服务台复核路线；运营方为街区公共服务平台；防止错误导览和商业偏置 [data:geometry/public_space.geojson#S01] |
| **S02 人格移动港｜测试** | 众智园；通勤者、开发者、儿童家庭 | 车辆状态、路线、安全事件；人格偏好本地保存，可使用匿名模式 | 安全员可立即接管，封闭/低速沙盒先行；防止拟人化掩盖安全责任 [data:geometry/public_space.geojson#S02] |
| **S03 树木议会** | 原点社区绿带；儿童、居民、研究者 | 树种、健康、温湿度、蒸腾和养护记录；不绑定路人身份 | 园林人员审核诊断和历史叙述；防止伪科学、错误树龄和设备伤树 [data:geometry/public_space.geojson#S03] |
| **S04 无屏路口｜测试** | 关键缝合口；行人、骑行者、视听障碍者 | 只处理即时流量与冲突轨迹，端侧聚合后删除原始数据 | 交警/交通工程师设定优先级和降级模式；防止误判、光污染与信号冲突 [data:geometry/public_space.geojson#S04] |
| **S05 AI 城市客厅** | 原点社区中心；全龄居民 | 人数、活动类型、热舒适和预约；不采集个体身份与私聊内容 | 社区运营者确认模式切换；防止多数人挤压安静、儿童或小众需求 [data:geometry/public_space.geojson#S05] |
| **S06 静默服务街** | 社区服务界面；长者、残障者、游客 | 服务请求和设备状态；敏感健康/法律事项转人工且最小留存 | 专业人员作最终决定；防止将 AI 建议误当医疗、法律或行政结论 [data:geometry/public_space.geojson#S06] |
| **S07 Agent 修理公社｜测试/地标** | 大钟寺存量载体；机器人团队、公众 | 设备日志、故障模型和安全测试；禁止无授权采集路人数据 | 认证工程师签字放行，测试区物理隔离；防止维修错误和机器人越界 [data:geometry/public_space.geojson#S07] |
| **S08 机器人夜班** | 全线运营节点；清洁、绿化、巡检人员 | 任务、能耗、故障、避让事件；不以机器人监控居民 | 夜班调度员和工会/一线人员共同复盘；防止噪声、就业伤害和无人负责 [data:geometry/public_space.geojson#S08] |
| **S09 京张1909｜地标** | 铁路历史节点；市民、学生、游客 | 公开档案、口述史、模型出处和置信度；个人口述史须授权 | 历史委员会审核，可公开纠错；防止 AI 生成内容冒充史实 [data:geometry/public_space.geojson#S09] |
| **S10 北京节点01｜地标** | 南段门户/线上全域；运营者、公众 | 公开环境与运营指标；个体数据不进入街区“总人格”播报 | 独立治理委员会审计算法和投诉；防止人格化遮蔽权责、形成全景监控 [data:geometry/public_space.geojson#S10] |

![人格移动港：AI 生成概念场景，不作为现状或审批证据](assets/scenes/mobility-personality-port.jpg)

### 3. Urban Agent Charter｜城市智能体公约

每个 Agent 必须公开六项信息：它是谁、能做什么、使用什么数据、数据保留多久、谁能人工接管、如何投诉/删除。Agent Passport 采用开放、可审计的设备与服务身份，不等同于居民数字身份；未经许可，系统之间不得拼接个人数据。所有影响安全、健康、法律权利、公共资源分配的决定必须有人类责任主体。[source:AGENT-TASKBOOK] [depth:municipal_new_infrastructure]

## 用地、建筑规模与拆改留方案

临时总体范围被四个不重叠概念用地单元完整覆盖：中央公园绿地、北段科研创新、中段社区服务、南段文化与创新服务。[data:geometry/land_use.geojson#LU-001] [depth:land_use_layout] 这种划分表达主导功能而非排他用途；真实地块应保持混合、短距离和首层活力，并在获得官方地块后细分。

概念绿地网络约占临时范围 12.0%，概念公共空间网络约占 7.2%；二者存在叠合，不能相加，也不能替代法定绿地率或公共服务设施指标。[metric:green_ratio] [metric:public_space_ratio] 八个可逆建筑原型只用于表达分布式空间供给，严禁将其推算为总建筑规模或新增量。[metric:building_footprint_area_sqm]

拆改留采用 P0—P3 程序而非预设结论。获得逐栋现状后，应对历史价值、结构安全、在用功能、碳排、权属和公众影响评分；优先保留和适应性再利用，只有 P3 完整论证后才可能讨论拆除。[standard:MOHURD-URBAN-DESIGN-MEASURES] [depth:retain_renovate_demolish]

## 交通、轨道、市政与公共服务设施

![交通慢行、中央记忆脊与蓝绿公共空间复合系统](assets/figures/mobility-bluegreen.png)

![A0-02 系统策略展板：空间结构与交通蓝绿两张全域总图](assets/figures/board-strategy.png)

移动优先级依次为：步行/无障碍、自行车/微出行、公共交通接驳、受控自动驾驶沙盒、一般机动车。已建道路和在运轨道保持原有功能；七条概念缝合线优先利用现有路口、桥下和公园接口，任何跨越铁路或主路的构筑物均待安全与工程论证。[source:OSM-CONTEXT] [data:geometry/constraints.geojson#CTX-001] [depth:traffic_rail_slow_parking]

停车策略是“外围共享、节点接驳、内部低速”，但车位数量保持待定；非机动车采用入口可见、小组团、可充电、可维护的设施，避免占用盲道和公园主路径。自动驾驶车辆不获得无条件路权，遇到行人、无障碍需求或系统异常时必须降级和人工接管。

市政与新基建采用“四层底座”：

1. **传统市政层**：供水、排水、电力、通信、燃气、消防和环卫先核承载，再部署数字设施。
2. **感知与端侧层**：最小必要传感器、端侧推理、标准机柜和可替换部件，避免重复立杆。
3. **Agent 协议层**：身份、权限、事件、日志、人工接管和投诉接口统一。
4. **公共治理层**：数据目录、风险分级、伦理审查、第三方安全评估和停机权。

端侧算力、充电和机器人设施采用模块化可逆构件；能源策略建议结合既有配电能力、屋顶光伏、储能和需求响应深化，但本包不宣称容量、投资或减碳量。[depth:municipal_new_infrastructure]

## 蓝绿空间、公共空间与城市风貌

中央记忆脊同时承担历史展示、慢行、连续生态、雨洪调蓄、降温和公共交往。五处生态口袋围绕树木议会、场景节点和热舒适形成“可说话的公园”，但 AI 只解释经园林专业人员确认的数据，不取代养护决策。[data:geometry/green_space.geojson#GREEN-001] [depth:blue_green_public_space]

公共空间由“一条主脊、七条缝合、十个节点”组成。[data:geometry/public_space.geojson#PUBLIC-001] 它遵循 **NO SCREEN CITY** 原则：不要求扫码、下载 App 或持续盯屏，交互可通过自然语言、灯光、声音、触觉和人工服务完成，并始终保留不使用 AI 的同等路径。

三处 AI 朝圣地标是：

- **S07 Agent 修理公社**：开源硬件、机器人维修与贡献者荣誉展示，强调“修复比炫技更有价值”。
- **S09 京张1909**：铁路数字灵魂、档案时间线和可纠错的历史共创，不把生成影像冒充档案。
- **S10 北京节点01**：街区运营与公共指标的可视化总 Agent，明确显示数据边界和责任人。[metric:pilgrimage_landmark_count]

导视采用琥珀主线、三段色彩和 Agent Passport 图标；字体、Logo、历史图片、人物肖像和企业标识在使用前逐项清权。场景图中的文字、站牌、人物和建筑仅是概念画面，不得直接作为实体导视或史实。[source:ASSET-CATALOG]

![京张1909与北京节点01：AI 生成概念场景](assets/scenes/time-railway-node01.jpg)

## 更新项目清单、实施政策与分期计划

![A0-03 场景节点与实施系统展板](assets/figures/board-experience.png)

| 编号 | 更新项目 | 位置/图层 | 阶段 | 依赖与实施建议 |
|---|---|---|---|---|
| P01 | 京张记忆慢行主脊 | ROAD-001 | 近期 | 公园、铁路和道路主管条件；先导视和可逆服务点 |
| P02 | 七条东西缝合线 | ROAD-002—008 | 近期—中期 | 逐点交通、安全、权属与无障碍审查 |
| P03 | 醒城门与多语公共服务 | S01 | 近期 | 公共服务运营方、人工柜台和无数字备选 |
| P04 | 人格移动港沙盒 | S02 | 近期 | 封闭/低速测试、保险、安全员和退出机制 |
| P05 | 树木议会与生态口袋 | S03 | 近期 | 园林普查、传感器不伤树、专业养护复核 |
| P06 | 无屏路口共测 | S04 | 近期 | 交通管理、标准信号优先、无障碍共测 |
| P07 | AI 城市客厅 | S05 | 近期 | 社区共治、安静时段和活动公平规则 |
| P08 | 静默服务街 | S06 | 中期 | 医疗/法律等高风险服务必须转人工 |
| P09 | Agent 修理公社 | S07 | 近期—中期 | 存量建筑安全、试验隔离、认证维修流程 |
| P10 | 机器人夜班系统 | S08 | 中期 | 劳动协商、噪声、调度员和事故责任 |
| P11 | 京张1909 | S09 | 中期 | 档案版权、史实审核、文保审批 |
| P12 | 北京节点01与贡献者墙 | S10 | 中期—远期 | 独立治理、公开指标和算法审计 |

`phasing.geojson` 以不重叠概念范围表达三期：一期先形成中央记忆脊、十大场景和开放接口；二期扩展北中段测试网络与公共服务；三期完善南段文化运营与全域协同。[data:geometry/phasing.geojson#PHASE-001] [data:geometry/phasing.geojson#PHASE-002] [data:geometry/phasing.geojson#PHASE-003] [depth:phasing_implementation]

### 年度活动与长期运营

提出“**CITY OF AGENTS WEEK｜城市智能生命周**”年度主品牌，下设：春季 Tree Council 城市生态大会、夏季 Mobility Sandbox 安全挑战、秋季 Time Railway 开源文化节、冬季 Agent Night Shift 城市维护公开课。每月举办居民共测日，每季度发布安全与公共价值报告，每年更新 Agent 公约和淘汰无效场景。[source:AGENT-TASKBOOK]

运营采用“一委一库一协议三条线”：独立治理委员会、公开城市问题库、Agent Passport 开放协议；公共体验线、开发者测试线、国际产业访问线。企业通过“问题报名—伦理与安全预审—沙盒测试—居民反馈—人工签字—有限上线—持续审计”进入，不以一次展演代替长期维护。资金、招商和政府采购均为政策深化建议，不表示已有安排。[depth:renewal_project_list]

## 指标体系、面积复算与合规矩阵

![核心指标、证据链和未知项](assets/figures/metrics-evidence.png)

指标被分成四种证据状态：公告事实、临时边界复算、概念方案指标、未知待补。这样可以在不伪造法定数据的情况下评估方案是否形成空间闭环。[depth:metrics_recalculation]

| 指标 | 当前值 | 设计含义 | 证据状态 |
|---|---:|---|---|
| 统筹研究面积 | 43.6 平方公里 | 检查产业与未来城市研究覆盖 | 公告事实 [metric:research_area_announced_sqm] |
| 总体设计面积 | 约 11.4 平方公里；临时 polygon 复算 11.413 平方公里 | 所有设计图层的临时裁切分母 | 公告 + provisional [metric:site_area_sqm] |
| 三处重点区 | 368.4 公顷 | 检查三处详细设计任务齐全 | 公告事实 [metric:key_areas_announced_area_sqm] |
| 记忆主脊 | 约 9.54 公里 | 连续公共路径是否贯通 | 概念图层复算 [metric:memory_spine_length_m] |
| 东西缝合线 | 7 条 | 片区割裂是否被系统回应 | 概念图层计数 [metric:east_west_stitch_count] |
| Agent 场景 | 10 个 | 产业、生活、服务、文化和运营是否形成组合 | 概念图层计数 [metric:scenario_node_count] |
| 测试验证场景 | 3 个 | 产业能力能否进入真实但受控的城市测试 | 概念图层计数 [metric:test_validation_scene_count] |
| 朝圣地标 | 3 个 | AI 新文化是否形成可识别公共节点 | 概念图层计数 [metric:pilgrimage_landmark_count] |
| 概念绿地网络比 | 约 12.0% | 生态连续、降温与人才生活环境 | 临时分母复算 [metric:green_ratio] |
| 概念公共空间比 | 约 7.2% | 创新交往、共测和公共服务空间供给 | 临时分母复算 [metric:public_space_ratio] |
| 法定容积率 / 高度 | unknown | 防止用概念图伪装审定指标 | 待官方资料 [metric:floor_area_ratio] [metric:approved_building_height_m] |

`compliance_matrix.json` 覆盖公告 1.3—1.5 和 agent.1—agent.6；`standard_matrix.json` 覆盖公告、任务书、城市设计、控规、用地分类和建筑深度；`design_depth_matrix.json` 覆盖现状诊断、范围、结构、用地、强度、高度、拆改留、交通、市政、蓝绿、重点区、项目、分期、指标和风险十五项。[standard:MOHURD-CONTROL-DETAILED-PLANNING] [depth:risk_missing_data]

## 完整视觉图集｜Visual Atlas

以下图集把本方案已经形成的全域鸟瞰、竞赛展板、系统推演和场景原型完整接入正文。正式规划表达与 AI 概念表达分层展示：五张核心规划图和三张整合展板用于解释空间结构；场景图用于表达体验愿景，不作为现状、红线、权属、工程或审批证据。

### 1. 全域展板与城市尺度愿景

![A0-01 总体概念总图：城市尺度鸟瞰、中央记忆脊与三段城区](assets/figures/board-masterplan.png)

![A0-02 系统策略：空间结构、交通慢行与蓝绿系统](assets/figures/board-strategy.png)

![A0-03 场景节点与实施系统](assets/figures/board-experience.png)

![北五环至北京北站全域概念鸟瞰：AI 生成概念表达，不作为现状或审批证据](assets/scenes/full-corridor-aerial.jpg)

### 2. 空间与系统推演图

![CITY OF AGENTS 概念结构：从中央记忆脊到分布式城市智能体](assets/scenes/concept-structure.jpg)

![京张中央路径连续性与东西缝合分析](assets/scenes/memory-spine-connectivity.jpg)

![保护、保留与适应性更新策略](assets/scenes/protection-renewal-strategy.jpg)

![三段 Agent 城区与系统分工](assets/scenes/three-agent-districts.jpg)

![从京张铁路到两侧城区的复合剖面](assets/scenes/railway-neighborhood-section.jpg)

![城市智能体四层系统](assets/scenes/urban-agent-system.jpg)

### 3. 城市智能生命场景原型

![CITY OF AGENTS 封面场景：AI 生成概念表达](assets/scenes/cover-hero.jpg)

![人格移动港：低速、限定、可退出的自动驾驶城市角色](assets/scenes/mobility-personality-port.jpg)

![树木议会：生态数据、公共教育与长期记忆](assets/scenes/tree-council.jpg)

![无 App 路口：环境交互替代手机操作](assets/scenes/no-app-crossing.jpg)

![AI 城市客厅：随人群和时间变化的公共空间](assets/scenes/ai-city-living-room.jpg)

![Agent 修理公社：机器人维护、开源硬件与公众共创](assets/scenes/agent-repair-commons.jpg)

![京张1909与北京节点01：历史铁路作为时间 Agent](assets/scenes/time-railway-node01.jpg)

![城市智能体身份证与公共权利界面](assets/scenes/urban-agent-passport.jpg)

![一座会随时间变化的城市：24 小时连续场景](assets/scenes/living-city-24h.jpg)

![24 小时体验编排展板：图内生成文字仅作视觉草案，以正文为准](assets/scenes/living-city-24h-board.jpg)

### 4. AI 共创过程档案｜不作为正式规划证据

下列图件记录“提示词—生成—校核—重绘”的共创过程。它们帮助追溯方案如何从概念走向正式图纸，但其中的文字、数字、边界和地图细节可能由生成模型虚构，不能替代正文、GeoJSON、`metrics.json` 或正式规划图。

![过程草案：总体规划展板](assets/process/draft-a0-masterplan.jpg)

![过程草案：分布式城市智能体系统](assets/process/draft-a0-agent-system.jpg)

![过程草案：会真正生活的城市](assets/process/draft-a0-living-city.jpg)

![过程草案：京张中央路径与东西缝合](assets/process/draft-a3-memory-spine.jpg)

![过程草案：保护、保留与适应性更新](assets/process/draft-a3-adaptive-city.jpg)

![过程草案：城市智能体身份证](assets/process/draft-a3-agent-passport.jpg)

![过程草案：从试点到长期城市运营](assets/process/draft-a3-implementation.jpg)

## 风险、版权与合规说明

1. **边界风险**：总体范围和重点区 polygon 为 provisional，不能进入法定规划或精确专业评分；收到 official polygon 后必须全量重算。[source:BOUNDARY-SOURCE]
2. **现状风险**：缺逐栋建筑、权属、结构、道路红线、管线、文保、铁路安全和环境资料，因此不作拆除、强度、高度或投资结论。[depth:risk_missing_data]
3. **AI 风险**：禁止人脸默认识别、隐性情绪推断、跨场景画像、无人工责任的高风险决定和“总人格”全景监控；所有 Agent 支持退出、删除、申诉、降级和人工接管。
4. **历史风险**：AI 复原、合成声音和推测画面必须显著标注，公开来源和置信度，不能冒充档案或詹天佑本人意见。
5. **版权风险**：核心规划图为本提交程序化原创；OSM 语境遵守 ODbL 并署名；17 张场景图和 7 张过程草案由参赛者定向生成和清权，逐项列入 `manifest.json` 并共同适用 `sources.json#ASSET-CATALOG` 的用途边界。详见 `report/copyright_statement.md`。[source:OSM-CONTEXT] [source:ASSET-CATALOG]
6. **实施风险**：任何建设强度、建筑高度、道路线位、跨铁路工程、资金、招商或政府运营均为概念建议，须由相应主管部门和专业团队深化、审查和批准。

## 参考资料

- [北京市规划和自然资源委员会海淀分局公开征集公告](https://ghzrzyw.beijing.gov.cn/zhengwuxinxi/tzgg/hd/202605/t20260509_4643047.html) [source:OFFICIAL-ANNOUNCEMENT]
- `brief/site-package/design_brief.json`、`allowed_design_space.json`、`agent_taskbook.json`、`planning_limits.json` [source:SITE-PACKAGE]
- `data/source_registry.json` [source:SOURCE-REGISTRY]
- OpenStreetMap contributors, ODbL 1.0 [source:OSM-CONTEXT]
- Toyota Woven City、JTC Punggol Digital District、Seoul AI Hub、City of Helsinki Kalasatama、Barcelona Innovation / 22@、Masdar City 官方页面（逐项链接见 `sources.json`）
- 《城市设计管理办法》《控制性详细规划编制审批办法》《国土空间调查、规划、用途管制用地用海分类指南》《建筑工程设计文件编制深度规定》[standard:MOHURD-URBAN-DESIGN-MEASURES] [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE]
