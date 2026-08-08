---
title: "京张智环｜Jing-Zhang AI Loop"
author_github: "liberty-z"
language: "zh"
translation_file: "proposal.en.md"
license: "COMMUNITY-DISPLAY-ONLY"
summary: "把百年京张铁路廊道升级为城市级 AI 操作系统总线：一脉（京张文化·智能主脉）、三核（众智园验证核／AI原点开源核／大钟寺交往核）、双翼（中关村科技服务翼／小月河场景赋能翼）、十二环站，形成验证—开源—交往—实测的开放创新回路。"
tracks: ["jingzhang-heritage-narrative", "ai-origin-community", "enterprise-services-ecosystem"]
scenarios: ["ai-cultural-guide", "ai-health-service-navigation", "ai-traffic-walkability", "enterprise-service-copilot", "public-safety-operations-review", "robot-delivery-low-speed"]
iteration: "v1.0"
---

# 京张智环｜Jing-Zhang AI Loop

“京张智环”把百年京张铁路廊道视为城市级 AI 操作系统总线：铁路不再是遗址孤岛，而是承载文化、人流、数据、能源与场景的“主板总线”。方案以“一脉三核双翼十二环站”组织空间：一脉是京张文化·智能主脉（南北连续绿廊与慢行系统），三核分别是众智园“全栈验证核”、北京 AI 原点社区“开源转化核”、大钟寺“智能原生交往核”，双翼延续任务书中的中关村科技服务翼与小月河场景赋能翼，十二环站是沿线可进入、可测试、可人工复核的 AI 公共接口。三区两翼通过“验证→开源→交往→城市实测→再验证”形成开放创新回路。[source:SRC-2026-BJ-GH-QUAL-PREANNOUNCEMENT] [source:SRC-2026-0518-AGENT-OPEN-CALL-TASKBOOK] [standard:PROJECT-OFFICIAL-ANNOUNCEMENT] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK] 所有空间动作均为概念建议或参考方案，不替代正式规划，不构成政府审定或实施承诺。

## 设计依据与资料清单

本方案把事实分成三层。第一层是任务依据：资格预审公告确认项目名称、三层范围、公告约面积与设计任务；面向智能体任务书补充三大定位、五大功能、三区两翼、六项任务与公开合规边界；住建部、自然资源部资料用于城市设计、控规与用地分类语言。[source:SRC-2026-BJ-GH-QUAL-PREANNOUNCEMENT] [source:SRC-2026-0518-AGENT-OPEN-CALL-TASKBOOK] [source:SRC-2017-MOHURD-URBAN-DESIGN-MEASURES] [source:SRC-MOHURD-CONTROL-DETAILED-PLANNING] [source:SRC-2023-MNR-LAND-USE-CLASSIFICATION] [standard:MOHURD-URBAN-DESIGN-MEASURES] [standard:MOHURD-CONTROL-DETAILED-PLANNING] [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE]

第二层是只能用于 intake 的空间约束。`site_boundary.geojson` 与三处重点区来自仓库 provisional polygon，`official_boundary=false`，仅支持生成、可视化、拓扑与内容评审，不支持 official redline、精确面积、权属、控规或审批判断。[source:SRC-PROVISIONAL-BOUNDARIES-2026] [data:geometry/site_boundary.geojson#SITE-001] [data:geometry/key_areas.geojson#PROV-KEY-001] [metric:site_area_sqm] 官方 polygon 到位后必须整体替换边界并重算用地、建筑、道路、绿地、公共空间、分期、全部指标、五张图、HTML 与 PDF，不能只改一个数值。

第三层是本次生成的设计提案：用地由同一 provisional site 几何拓扑切分，覆盖完整且无重叠；建筑是可逆更新载体原型，不是现状测绘；道路是慢行与接驳概念线，不是道路红线；绿地、公共空间、环站与分期均为可讨论的设计层。[depth:existing_conditions_diagnosis] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK] 图纸与网页只解释这些机器数据，不新增事实。海淀“1+X+1”产业体系与“三区两翼”布局用于产业背景，不用于空间控制结论。[source:SRC-2026-HAIDIAN-1X1] [source:SRC-2026-BJ-KW-THREE-AREAS-WINGS]

![京张智环总体概念与资料边界](assets/figures/site-overview.png)

## 三层范围工作框架

统筹研究范围约 43.6 平方公里，回答“海淀如何形成世界级 AI 创新生态与未来城市形态”；总体设计范围公告约 11.4 平方公里，回答“产业、更新、交通、市政、蓝绿与风貌如何形成一套城市设计”；重点区域约 368.4 公顷，回答“三个核心片区如何以不同机制完成验证、转化与交往”。三层从战略、空间到项目证据逐级收敛。[depth:three_level_scope_framework] [depth:overall_spatial_structure] [data:geometry/site_boundary.geojson#SITE-001]

边界全部来自仓库 provisional polygon：总体范围按公告文字四至与约 11.4 平方公里拟合，三处重点区按名称、南北顺序、位置线索与公告约面积粗略定位。[source:SRC-PROVISIONAL-BOUNDARIES-2026] 因此本方案所有面积只用于方案内部复算与讨论；官方 polygon 补齐后，需要重算的图层与指标清单见 `assumptions.json` 的 A-BOUNDARY-001、A-KEYAREA-001。[depth:risk_missing_data] [metric:site_area_sqm]

![三层范围与南北六段用地结构](assets/figures/land-use-structure.png)

## 统筹研究范围产业与未来城市研究

### 命名与识别

主名称“京张智环”把铁路“脉络”与创新“回路”合一：中文“智环”既指智能环线，也指三区两翼的协同回路；英文 Jing-Zhang AI Loop（JZ-Loop）便于国际传播。命名体系为一带三核双翼十二环站：核心区用“验证核／开源核／交往核”，文化节点沿用京张、中关村语境，站点统一编号 SCN-01~12。[depth:overall_spatial_structure] [source:SRC-2026-0518-AGENT-OPEN-CALL-TASKBOOK]

Logo 方向以京张“人字形”铁路为母题：两条轨道线相交成“人”，端点闭合为回路环，象征“人本 × AI × 循环”；色彩取钢轨灰蓝（京张记忆）与创新青（AI 蓝绿）。该图形为原创概念，未使用受保护字体、商标或企业标识，使用边界见 `report/copyright_statement.md`。[standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]

### 全球 AI 创新生态案例与可转化机制

本方案从公开背景中提炼六个可转化为空间与运营机制的经验（仅作方法参考，不编造投资额或本地承诺）：硅谷的风险资本-原型网络，对应原点社区“开源转化核”的资本与 IP 接口；波士顿 Kendall Square 的科研-孵化同楼协同，对应近校科研带；伦敦 King's Cross 的铁路遗产更新为创新区，对应京张遗址廊道；新加坡裕廊创新区的测试沙箱与标准互认，对应众智园“验证核”与模型校场；东京丸之内 TOD 商务文化一体，对应大钟寺轨道站点一体化；首尔数码媒体城的内容集聚，对应智能原生市集与全球 AI 会客厅。[source:SRC-2026-BJ-KW-THREE-AREAS-WINGS] [depth:industry_space_mapping] [depth:overall_spatial_structure]

### 五大功能协同回路

三大定位（百年京张文化带、都市 AI 生活体验带、AI 融合创新带）与五大功能（AI 全栈自主创新体系、世界级 AI 创新生态、AI+场景赋能新范式、智能化 AI 活力城市、AI 治理全球话语权）落到“一脉三核双翼十二环站”的回路：众智园验证全栈技术，原点社区开源转化，大钟寺场景交往，小月河翼城市实测，中关村翼持续输入人才、资本、IP 与全球服务。[source:SRC-2026-0518-AGENT-OPEN-CALL-TASKBOOK] [depth:three_level_scope_framework]

## 总体设计范围城市更新与控规深度城市设计

总体设计范围形成“一脉三核双翼十二环站”结构：南北主脉为京张文化·智能主脉，串起三处重点区与十二环站；中关村科技服务翼承担要素全球化配置，小月河场景赋能翼承担城市服务验证与公共体验输出。用地按南北六段组织功能梯度：大钟寺智能原生商务与服务、人才生活与社区更新、近校教育科研协同、AI 原点开源转化、全栈自主创新研发、清河治理展示与低碳算力。[data:geometry/land_use.geojson#LU-01] [data:geometry/land_use.geojson#LU-04] [depth:land_use_layout] [metric:land_use_zone_count]

城市更新遵循“保留—改造—新建”的可逆逻辑：铁路遗址与文保周边以保留和低扰动改造为主，产业载体采用可逆更新原型，新增建筑集中于明确功能带内，强度与高度不给出审定数值。[data:geometry/buildings.geojson#BLDG-01] [depth:retain_renovate_demolish] [metric:building_footprint_ratio] 容积率、建筑高度、密度、绿地率、退线与建筑控制线等控规条件缺失，全部列为待确认（A-CONTROLS-001），本方案只提供方法不提供审定指标。[depth:development_intensity_controls] [depth:height_massing_character] [standard:MOHURD-CONTROL-DETAILED-PLANNING] [metric:floor_area_ratio]

![三处重点区域索引与设计任务](assets/figures/key-areas.png)

## 重点区域详细设计

三处重点区均以“定位＋空间结构＋建筑更新＋交通慢行＋公共空间＋AI 场景＋实施风险”展开，均为 provisional 粗略 polygon，只表达方向性设计。

### 众智园AI自主创新加速区（全栈验证核）

定位为 AI 全栈自主创新体系与治理话语权载体。空间结构为“模型校场—具身低速试验环—端侧算力站—验证穹顶”的验证链；建筑以研发与实验室载体更新为主，新增低碳算力与模型安全验证建筑原型；交通慢行依托众智园对外接驳概念线与北部社区横向联系；公共空间以验证穹顶与清河治理展示为核心。[data:geometry/key_areas.geojson#PROV-KEY-001] [data:geometry/public_space.geojson#SCN-02] [metric:scenario_node_count] 实施风险是缺少现状权属、控规与工程条件，测试场景须先取得安全、隐私与场地授权（A-KEYAREA-001、A-MUNICIPAL-001）。

### 北京AI原点社区（开源转化核）

定位为世界级 AI 创新生态的“开源零公里”。空间结构为“原点零公里柱—近校转化客厅—人才协作站”的开源转化链，衔接中关村科技服务翼；建筑以孵化器、办公与文化载体更新为主；交通慢行依托 AI 原点近校慢行缝合线；公共空间以原点零公里广场为核心，布置开源内核公共装置与荣誉展示系统。[data:geometry/key_areas.geojson#PROV-KEY-002] [data:geometry/public_space.geojson#SCN-01] 实施风险是近校与文保边界敏感，所有活动与装置须符合文保与校园安全要求（A-HERITAGE-001）。

### 大钟寺AI产业聚集区（智能原生交往核）

定位为智能原生新业态与城市交往场景。空间结构为“四象限步行缝合—智能原生市集—公共审计室—全球 AI 会客厅”的交往链；建筑以混合功能与商业服务载体更新为主；交通慢行依托大钟寺四象限步行缝合概念线与轨道站点一体化接驳；公共空间以智环客厅与场景市场为核心。[data:geometry/key_areas.geojson#PROV-KEY-003] [data:geometry/public_space.geojson#SCN-10] 实施风险是轨道站点周边人流与安全条件复杂，场景开放须分级授权并设置人工复核（A-PUBLIC-001、A-ROAD-001）。[depth:three_key_area_detailed_design]

## AI 创新生态、人才画像与 AI+ 场景

### 六类用户画像

P1 开发者与研究者：需要测试环境、基准评测、数据沙箱与开源社区；P2 AI 创业者与中小企业：需要孵化、资本、IP、合规与场景准入；P3 高校师生：需要科研协同、实习与近校转化；P4 居民与老年人：需要无障碍、公共服务与安全守护；P5 游客与访客：需要文化导览、公共体验与无障碍路线；P6 城市运营者与治理者：需要公共审计、人工复核与规则迭代。[source:SRC-2026-0518-AGENT-OPEN-CALL-TASKBOOK] [depth:overall_spatial_structure]

### 十二张 AI 场景卡（含三张产业测试验证场景）

场景卡与十二环站一一映射，全部使用公开或清权聚合数据，高风险场景必须人工批准、现场接管、日志审计与公开申诉。[data:geometry/public_space.geojson#SCN-01]

| 卡号 | 名称 | 空间映射 | 服务对象 | 数据边界 | 人工复核 | 运营主体 |
| --- | --- | --- | --- | --- | --- | --- |
| SC-01 | 原点零公里导览智能体 | SCN-01 | P5/P6 | 公开文化资料 | 内容审校 | 社区运营方 |
| SC-02 | 模型校场·基准评测（测试验证） | SCN-02 | P1/P2 | 公开基准+授权数据 | 评测标准委员会 | 验证核运营方 |
| SC-03 | 具身低速试验环（测试验证） | SCN-03 | P1/P2 | 现场授权+隐私遮蔽 | 安全员现场接管 | 试点运营方 |
| SC-04 | 城市数据沙箱（测试验证） | SCN-04 | P1/P2/P6 | 脱敏聚合数据 | 数据治理委员会 | 公共数据运营方 |
| SC-05 | AI 慢行守护 | SCN-05 | P4/P5 | 低敏人流聚合 | 异常告警复核 | 交通运营方 |
| SC-06 | 无障碍路径共创台 | SCN-06 | P4 | 公开地图+用户反馈 | 无障碍评审 | 社区共建方 |
| SC-07 | 京张记忆译站 | SCN-07 | P5 | 公开史料 | 历史专家审校 | 文化运营方 |
| SC-08 | 近校成果转化客厅 | SCN-08 | P2/P3 | 授权项目信息 | 成果披露审批 | 中关村翼服务方 |
| SC-09 | 人才生活协作站 | SCN-09 | P3/P4 | 公共服务数据 | 服务人工复核 | 社区服务中心 |
| SC-10 | 智能原生市集 | SCN-10 | P2/P5 | 商户公开信息 | 市集准入审核 | 大钟寺运营方 |
| SC-11 | 公共审计室 | SCN-11 | P6 | 治理公开记录 | 审计委员会议 | 治理委员会 |
| SC-12 | 全球 AI 会客厅 | SCN-12 | P1/P2/P6 | 国际公开信息 | 双语内容审校 | 国际运营方 |

三张测试验证场景（SC-02/03/04）均要求先取得安全、隐私与场地授权，测试结果进入公共知识库，不视为已批准运营。[depth:risk_missing_data] [metric:scenario_node_count]

## 用地、建筑规模与拆改留方案

用地采用南北六段功能带（LU-01~LU-06），由同一 provisional site 边界拓扑切分，覆盖完整且无重叠；中段连续开放空间降低临时边界的视觉权重，把设计重点放在廊道、横向缝合与公共节点。[data:geometry/land_use.geojson#LU-01] [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE] [metric:land_use_zone_count]

建筑以 18 个可逆更新载体原型表达：保留对象集中于文保与现状质量较高区域，改造对象为可逆产业载体，新建对象集中于功能带内的研发、服务与文化节点；建筑面积与比例仅用于方案内部复算，不代表开发强度或审批规模。[data:geometry/buildings.geojson#BLDG-01] [metric:building_count] [metric:building_footprint_area_sqm] 拆改留结论均表述为概念方向，具体地块方案待现状测绘、权属与控规数据补齐后由专业团队深化（A-BUILDING-001、A-CONTROLS-001）。[depth:development_intensity_controls] [depth:retain_renovate_demolish]

## 交通、轨道、市政与公共服务设施

交通组织采用“一脉五横十二站”：南北公共体验绿道为慢行主脉，五条东西缝合概念线连接两翼与站点，十二环站作为轨道/公交接驳与公共体验的双重接口。[data:geometry/roads.geojson#ROAD-SPINE-001] [data:geometry/roads.geojson#ROAD-CROSS-001] [metric:road_feature_count] [metric:crosslink_count] 道路均为概念线形，非道路红线或工程线形（A-ROAD-001）。[depth:traffic_rail_slow_parking]

市政与新型基础设施采用服务化建议：端侧算力站与分布式能源协同站作为公共接口，与既有市政设施融合；不给出管线、消防、防洪、能源容量等专业测算（A-MUNICIPAL-001）。公共服务设施依托环站与社区服务中心配置，底数待公共数据补齐。[depth:municipal_new_infrastructure] [standard:MOHURD-URBAN-DESIGN-MEASURES]

## 蓝绿空间、公共空间与城市风貌

蓝绿空间以“主脉绿廊＋三处东西缝合绿指”构成连续网络，绿地面积与比例用 EPSG:4548 复算，非法定绿线。[data:geometry/green_space.geojson#GREEN-SPINE-001] [metric:green_space_area_sqm] [metric:green_ratio] 公共空间以十二环站公共界面为核心，形成可体验、可测试、可人工复核的共享客厅。[data:geometry/public_space.geojson#PUBLIC-COMMONS-001] [metric:public_space_area_sqm] [metric:public_space_ratio] [depth:blue_green_public_space]

### AI 朝圣地标（不少于 3 个）

L1 原点零公里柱：AI 原点社区的开源内核纪念碑，以“数据年轮”记录社区贡献；L2 之字回廊：京张遗址公园“人字形”空中慢行回廊与观景台，致敬詹天佑之字形铁路；L3 智环客厅：大钟寺站智能原生公共交往厅与场景市场；L4 验证穹顶：众智园模型校场的公共展示厅。地标均为概念建议，须结合文保、绿地、蓝线与交通安全约束深化，不构成已批准建设（A-HERITAGE-001）。[depth:blue_green_public_space] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]

城市风貌以“钢轨灰蓝＋创新青”为基调，导视与标识系统区分“一带整体 Logo”与“文化标识系统”，不混用受保护标识。[source:SRC-2026-0518-AGENT-OPEN-CALL-TASKBOOK]

![交通慢行与蓝绿公共空间复合系统](assets/figures/mobility-bluegreen.png)

## 更新项目清单、实施政策与分期计划

更新项目按类型分为环站改造、绿廊贯通、建筑载体更新、接驳设施与场景试点五类，均对应 `geometry/phasing.geojson` 分期示意。[data:geometry/phasing.geojson#PHASE-001] [metric:phase_count] 分期为概念示意：阶段一“先行开放与原型试点”（南段大钟寺至原点），优先开放低风险场景与公共体验；阶段二“协同更新与网络成形”（中段原点社区及周边），在建筑、权属、交通、市政与文保调查完成后连成网络；阶段三“平台固化与治理迭代”（北段众智园及清河），把有效的场景准入、人工复核、运营责任与公共知识版本化。[depth:phasing_implementation] [depth:renewal_project_list]

实施政策与运营机制均为概念建议：年度活动采用四季循环（春：问题征集与场景招募；夏：低风险原型与公共体验；秋：全球 AI 城市周与同行评议；冬：结果审计、失败展与规则迭代）；开发者社区维护问题库与贡献积分；场景开放设置准入评审、分级开放与数据沙箱；国际传播以可复用规则包、双语路线与开发者驻留计划为主，不以投资承诺为卖点。[source:SRC-2026-0518-AGENT-OPEN-CALL-TASKBOOK] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]

## 指标体系、面积复算与合规矩阵

机器可复算指标分三类。第一类是几何一致性：总体设计范围面积、绿地面积与比例、公共空间面积与比例、概念建筑基底面积与比例，全部使用 EPSG:4548 复算。[metric:site_area_sqm] [metric:green_ratio] [metric:public_space_ratio] [metric:building_footprint_ratio] 第二类是结构数量：用地分区、重点区域、环站节点、建筑载体、概念道路、横向联系与分期数量。[metric:land_use_zone_count] [metric:key_area_count] [metric:scenario_node_count] [metric:building_count] [metric:road_feature_count] [metric:crosslink_count] [metric:phase_count] 第三类是待确认的官方控制：容积率、建筑高度等必须等待 official 或清权数据。[metric:floor_area_ratio] [metric:building_height_m] [depth:metrics_recalculation]

`compliance_matrix.json` 覆盖公告 1.3、1.4、1.5 与 agent.1~agent.6，逐条挂接正文、九类 GeoJSON、指标、A3/A0、HTML、来源、假设与自检；`standard_matrix.json` 对五项强制依据全部 addressed，建筑专业深度因缺官方文件保持 data_gap；`design_depth_matrix.json` 十五项 required depth 全部 complete。[depth:risk_missing_data] [standard:MOHURD-ARCH-DESIGN-DEPTH-2016]

![核心指标复算与证据链](assets/figures/metrics-evidence.png)

## 风险、版权与合规说明

主要数据缺口已进入 `assumptions.json`：official 总体边界、official 三处重点区、控规、道路交通、建筑与权属、文保、市政安全、法定蓝绿控制、公共空间运维与运营安排。最关键风险是把概念精度误读为规划精度，因此所有图面以低对比虚线表达 provisional 边界，所有派生数值仅用于方案内部复算；官方图件到位后若不整体重算，本方案即失去一致性。[data:geometry/site_boundary.geojson#SITE-001] [depth:risk_missing_data]

AI 风险采用场景级控制：不使用秘密、企业内部或个人隐私数据；医疗、法律、安全与公共服务输出仅作信息辅助；高风险场景必须人工批准、现场接管、日志审计与公开申诉；模型失败与少数意见进入公共审计室。任何活动、招商、政策、资金、伙伴、建设或运营表达均为概念建议，不构成已确定政府决定。[source:SRC-2026-0518-AGENT-OPEN-CALL-TASKBOOK] 原创生成与外部背景引用见 `report/copyright_statement.md` 与 `sources.json`，未使用受保护字体、商标、人物肖像或论文图像。[standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]

本方案因缺乏官方 polygon 与现状专业底数，只能作为内容评审与专业深化的高完整度起点，不能进入精确面积评分、法定规划、工程设计或投资决策。提交前执行 deterministic validation、spatial review、visual packaging check 与 professional evidence review；通过只代表具备机器检查与内容评审基础，不代表方案优秀、可建或获批。

## 参考资料

- 资格预审公告与范围任务：[source:SRC-2026-BJ-GH-QUAL-PREANNOUNCEMENT]
- 智能体六项任务与边界条款：[source:SRC-2026-0518-AGENT-OPEN-CALL-TASKBOOK]
- 三区两翼与产业背景：[source:SRC-2026-BJ-KW-THREE-AREAS-WINGS]
- 海淀“1+X+1”产业体系：[source:SRC-2026-HAIDIAN-1X1]
- 临时粗略边界：[source:SRC-PROVISIONAL-BOUNDARIES-2026]
- 城市设计、控规与用地分类标准：[standard:MOHURD-URBAN-DESIGN-MEASURES] [standard:MOHURD-CONTROL-DETAILED-PLANNING] [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE]
- 项目与任务标准：[standard:PROJECT-OFFICIAL-ANNOUNCEMENT] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]
- 建筑专业深度缺口：[standard:MOHURD-ARCH-DESIGN-DEPTH-2016]
- 全部图层索引：[data:geometry/site_boundary.geojson#SITE-001] [data:geometry/key_areas.geojson#PROV-KEY-001] [data:geometry/land_use.geojson#LU-01] [data:geometry/buildings.geojson#BLDG-01] [data:geometry/roads.geojson#ROAD-SPINE-001] [data:geometry/green_space.geojson#GREEN-SPINE-001] [data:geometry/public_space.geojson#SCN-01] [data:geometry/constraints.geojson#constraints-empty-by-design] [data:geometry/phasing.geojson#PHASE-001]
