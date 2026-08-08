---
title: "京张共食线｜JINGZHANG COMMON TABLE"
author_github: "shawnshi"
language: "zh"
translation_file: "proposal.en.md"
license: "COMMUNITY-DISPLAY-ONLY"
summary: "以从共厨生产到土壤回用的可审计闭环，连接食物科技、小微经营、公共市集、冷链协同与生产性景观；所有空间边界、合作关系和运营绩效均保留临时或未知状态。"
tracks: ["enterprise-services-ecosystem", "ai-origin-community", "robotics-autonomous-mobility"]
scenarios: ["enterprise-service-copilot", "robot-delivery-low-speed", "ai-traffic-walkability", "ai-cultural-guide", "public-safety-operations-review"]
---

# 京张共食线｜JINGZHANG COMMON TABLE

## 从共厨生产到土壤回用：一条可审计的食物运营闭环

京张共食线不是“AI 餐厅”的合集，也不替任何人决定吃什么。它把食物科技研发、共享生产、小微经营、市集交换、低速配送、剩余物分流和生产性景观连成一条**可追溯、可人工接管、可暂停、可退出**的城市运营系统。它的规范主链是七个生产到土壤的交接门：

`G1 题源准入 → G2 原料/对象接收 → G3 共厨生产 → G4 市集交换 → G5 剩余物分流 → G6 材料接收 → G7 土壤回用`

`来源 Source → 计划 Plan → 制作 Cook → 交换 Exchange → 循环 Cycle` 只是便于公众阅读的五段物质流速记，不替代 G1—G7。只有通过稳定化、土壤/污染检测、用途审查和景观环境专业批准的土壤或生产性景观回用，才可沿条件回箭头进入下一轮来源端或种植试验；未获批准的材料在合规处置后终止，不能为了画成闭环而返回系统。

与物质主链并行但不等同的七段经营转化路径为：`题源 → 配桌 → 盘点 → 共作 → 上桌 → 成业 → 回用`。它描述团队和小微经营项目如何进入、试作、经营、暂停或退出，不把企业成立、融资或持续经营写成既定结果。

每次跨界交接都产生一条“共食账页”：对象或批次、来源与权利、时间与位置、责任运营者、必要的温度/过敏原/去向字段、人工签核、异常与退出状态。账页只追踪食物、器具和材料，不默认追踪个人。AI 可提出排程、匹配、告警和翻译候选，但食品安全、过敏原、可食性、召回、材料去向和公共开放的最终判断始终属于具备资质或权限的人类主体。[source:NIST-AI-RMF] [depth:risk_missing_data]

![从生产到土壤回用的可审计食物闭环](assets/figures/site-overview.png)

## 设计依据与资料清单

公告文字给出约 43.6 平方公里统筹研究范围、约 11.4 平方公里总体设计范围、约 368.4 公顷重点区域总量，并列出众智园约 192.1 公顷、北京 AI 原点社区约 104.3 公顷、大钟寺约 72.0 公顷。当前仓库没有可验证坐标系的官方精确 polygon；本包的总体与三处重点区几何因此均为临时粗略约束。[source:DATA-SRC-OFFICIAL-ANNOUNCEMENT-20260509] [source:BOUNDARY-SOURCE] [source:KEY-AREA-SOURCE] [standard:PROJECT-OFFICIAL-ANNOUNCEMENT] [depth:three_level_scope_framework]

所有提交图层坚持 `official_boundary=false`、`geometry_role="provisional_constraint"`、`boundary_precision="provisional_rough"`。它们可用于本方案内部的拓扑检查、面积复算和方案讨论，不能作为法定红线、地块、权属、拆改留、审批或工程定位依据。[data:geometry/site_boundary.geojson#SITE-001] [data:geometry/key_areas.geojson#PROV-KEY-001] [metric:site_area_sqm]

容积率、总建筑面积、官方建筑密度、建筑高度、退线、道路红线、轨道站界、遗产控制、市政容量、消防、防洪、污染和土壤条件仍是 `unknown`。九处建筑基底只是功能载体，是否保留、改造或新建须在正式测绘、权属、结构、文保和专业审查后决定。[standard:MOHURD-CONTROL-DETAILED-PLANNING] [standard:MOHURD-ARCH-DESIGN-DEPTH-2016] [depth:development_intensity_controls] [depth:height_massing_character] [depth:retain_renovate_demolish]

本方案不声称已有高校、实验室、厨房、市集、商户、物流企业、材料接收者、场地、资金或政府合作。任何真实食品生产、销售、试吃、运输、再分配、堆肥或种植活动，都要在后续由具备资格的运营主体完成许可、保险、卫生、环境、消防、劳动和数据审查。[source:DATA-SRC-AGENT-TASKBOOK-20260518] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]

### 机器可读证据索引

来源：[source:SITE-PACKAGE] [source:SOURCE-REGISTRY] [source:PROCESSED-FACT-PACK] [source:BOUNDARY-SOURCE] [source:KEY-AREA-SOURCE] [source:DATA-SRC-OFFICIAL-ANNOUNCEMENT-20260509] [source:DATA-SRC-AGENT-TASKBOOK-20260518] [source:DATA-SRC-MOHURD-URBAN-DESIGN-MEASURES] [source:DATA-SRC-MOHURD-CONTROL-DETAILED-PLANNING] [source:DATA-SRC-MNR-LAND-USE-CLASSIFICATION-202311] [source:DATA-SRC-MOHURD-ARCH-DESIGN-DEPTH-2016] [source:COMMON-TABLE-JTC-AFIP] [source:COMMON-TABLE-LA-COCINA] [source:COMMON-TABLE-EASTERN-MARKET-SHED5] [source:COMMON-TABLE-TEURASTAMO] [source:COMMON-TABLE-MILAN-FOOD-HUBS] [source:COMMON-TABLE-PARISCULTEURS] [source:NIST-AI-RMF]

标准：[standard:PROJECT-OFFICIAL-ANNOUNCEMENT] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK] [standard:MOHURD-URBAN-DESIGN-MEASURES] [standard:MOHURD-CONTROL-DETAILED-PLANNING] [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE] [standard:MOHURD-ARCH-DESIGN-DEPTH-2016]

深度：[depth:existing_conditions_diagnosis] [depth:three_level_scope_framework] [depth:overall_spatial_structure] [depth:land_use_layout] [depth:development_intensity_controls] [depth:height_massing_character] [depth:retain_renovate_demolish] [depth:traffic_rail_slow_parking] [depth:municipal_new_infrastructure] [depth:blue_green_public_space] [depth:three_key_area_detailed_design] [depth:renewal_project_list] [depth:phasing_implementation] [depth:metrics_recalculation] [depth:risk_missing_data]

图层：[data:geometry/site_boundary.geojson#SITE-001] [data:geometry/key_areas.geojson#PROV-KEY-001] [data:geometry/land_use.geojson#LU-001] [data:geometry/buildings.geojson#BLDG-001] [data:geometry/roads.geojson#ROAD-001] [data:geometry/green_space.geojson#GREEN-001] [data:geometry/public_space.geojson#PUBLIC-001] [data:geometry/constraints.geojson#CONSTRAINT-001] [data:geometry/phasing.geojson#PHASE-001]

指标：[metric:site_area_sqm] [metric:total_floor_area_sqm] [metric:floor_area_ratio] [metric:building_footprint_area_sqm] [metric:submitted_concept_building_density] [metric:official_building_density] [metric:green_space_area_sqm] [metric:green_ratio] [metric:public_space_area_sqm] [metric:public_space_ratio] [metric:road_area_sqm] [metric:road_ratio] [metric:key_area_count] [metric:scenario_count] [metric:controlled_industry_studio_count] [metric:persona_count] [metric:food_system_loop_stage_count] [metric:global_case_count]

完整指标登记：[metric:site_area_sqm] [metric:land_use_area_sqm_05] [metric:land_use_area_sqm_0702] [metric:land_use_area_sqm_0802] [metric:land_use_area_sqm_0803] [metric:land_use_area_sqm_0804] [metric:land_use_area_sqm_1401] [metric:total_floor_area_sqm] [metric:floor_area_ratio] [metric:building_footprint_area_sqm] [metric:submitted_concept_building_density] [metric:official_building_density] [metric:green_space_area_sqm] [metric:green_ratio] [metric:public_space_area_sqm] [metric:public_space_ratio] [metric:road_area_sqm] [metric:road_ratio] [metric:spatial_phase_1_area_sqm] [metric:spatial_phase_2_area_sqm] [metric:spatial_phase_3_area_sqm] [metric:spatial_phase_polygon_count] [metric:key_area_count] [metric:submitted_provisional_key_area_zhongzhiyuan_sqm] [metric:submitted_provisional_key_area_beijing_ai_origin_sqm] [metric:submitted_provisional_key_area_dazhongsi_sqm] [metric:scenario_count] [metric:controlled_industry_studio_count] [metric:persona_count] [metric:food_system_loop_stage_count] [metric:key_table_count] [metric:supply_chain_count] [metric:global_case_count] [metric:public_landmark_count] [metric:operations_event_count] [metric:conversion_pathway_stage_count] [metric:official_research_area_approx_sqm] [metric:official_overall_area_approx_sqm] [metric:official_key_area_total_approx_sqm] [metric:official_zhongzhiyuan_area_approx_sqm] [metric:official_ai_origin_area_approx_sqm] [metric:official_dazhongsi_area_approx_sqm] [metric:approved_building_height_m] [metric:confirmed_food_enterprise_count] [metric:confirmed_vendor_count] [metric:food_commission_completion_rate] [metric:open_recipe_code_publication_rate] [metric:vendor_incubation_conversion_rate] [metric:organic_material_circulation_rate] [metric:verified_accessible_link_ratio] [metric:public_space_component_type_count]

## 统筹研究范围产业与未来城市研究

### 一条共食粮廊

共食粮廊是一条连接铁路遗址公园公共界面与两侧产业空间的概念性网络，不是粮食生产基地，也不是已经落实的设施。它把公众步行、供应骑行、限定时段配送、器具回流和有机材料收集分成可辨识的线，普通步行、无障碍通行和应急使用优先。[data:geometry/roads.geojson#ROAD-001] [data:geometry/green_space.geojson#GREEN-001] [depth:traffic_rail_slow_parking] [depth:blue_green_public_space]

### 三张桌

1. **众智食物系统实验桌｜Food Systems Lab Table**：隔离或受控地测试厨房机器人、人机工位、冷链排程、包装与资源效率。结果不是食品安全认证。
2. **原点共厨桌｜Commons Kitchen Table**：厨师、小微经营者、学生、居民和开发者共同试作课程、流程与经营工具；合格厨房负责人掌握操作权。
3. **大钟寺世界市集桌｜World Market Table**：把经过人工核验的商品、服务、课程与铁路饮食文化内容带到市集和公共长桌；不实施消费者画像或差别定价。

### 两条责任链

- **中关村技术—经营链**：把研发、算力、设计、知识产权、财务、采购和经营辅导作为待撮合服务，不把任何机构写成已加入伙伴。
- **小月河食物—材料链**：把题源、限定时段配送、可复用器具、剩余物分流、经批准接收和生产性景观试验连成可审计路径，不假定现有处理设施。[depth:overall_spatial_structure]

![用地结构与共食粮廊](assets/figures/land-use-structure.png)

### 视觉识别方向

标识由一条连续铁路轨迹折成桌边，三个节点嵌入其中，末端回到一枚土壤环。蓝色表示数据与企业服务，绿色表示材料与景观，橙色表示市集与公共交换。图形避免使用碗筷、机械厨师和无人餐厅的直白符号；字体只使用可合法分发的系统字体或提交者自制字形。[depth:overall_spatial_structure]

## 三层范围工作框架

| 层级 | 工作内容 | 当前证据边界 |
|---|---|---|
| 约 43.6 km² 统筹研究 | 比较食品研发、共享生产、市集孵化、配送、剩余物与生产性景观机制；研究两条责任链 | 只有文字四至和约面积，无官方 polygon |
| 约 11.4 km² 总体设计 | 用共食粮廊组织三桌、四个公共节点、慢行优先与材料回流；形成九个可回读图层 | 提交边界为临时粗略几何，不是法定红线 |
| 约 368.4 ha 重点区域 | 分别深化食物系统实验、共厨孵化、世界市集及相邻公共空间 | 三处 polygon 均为临时约束，不能定位地块或建筑 |

产业协同不是招商清单，而是问题—能力—场地—责任的配对。研究团队提出方法，经营者提出真实且合法公开的问题，专业人员签核食品和空间安全，公共主持人维护可达与申诉界面，最终由在地主体决定是否继续经营。[source:DATA-SRC-AGENT-TASKBOOK-20260518] [depth:existing_conditions_diagnosis]

### 六个机制案例：只迁移方法，不复制承诺

| 一手来源 | 可支持的窄机制 | 对京张的设计推演 | 不可外推 |
|---|---|---|---|
| JTC Sungei Kadut / Agri-Food Innovation Park | 研发、试制和高技术生产的集聚及共享设施 | 在众智园设置共享公用设施和对公众可见的试制界面 | 不证明北京已有需求、土地或 AI 平台 [source:COMMON-TABLE-JTC-AFIP] |
| La Cocina | 申请、预孵化、共享商业厨房、技术支持和毕业门槛 | 小微经营路径采用公开关口，避免无限期占用补贴空间 | 旧金山资格、费用和许可不可照搬 [source:COMMON-TABLE-LA-COCINA] |
| Eastern Market Shed 5 | 市集组织内的孵化厨房及可预约课程/活动 | 共厨紧邻摊位，非生产时段可在规则隔离下教学 | 不证明经营成效或本地许可 [source:COMMON-TABLE-EASTERN-MARKET-SHED5] |
| Helsinki Teurastamo | 小规模生产、餐饮、商店与公共庭院共同组织 | 把庭院当作连接可见制作、小店与长桌的公共基础设施 | 所有权、气候和运营结构不可迁移 [source:COMMON-TABLE-TEURASTAMO] |
| Milan Neighbourhood Food Hubs | 记录可食剩余物的接收、分发、合作协议与流量 | 预留与公众就餐、商业生产隔离的后场分流节点；冷藏要求由本地食品安全设计另行确定 | 不是商业收益或营养成效证据 [source:COMMON-TABLE-MILAN-FOOD-HUBS] |
| Parisculteurs | 识别屋顶、停车设施和绿地等候选场地，并以申请和遴选过程开放 | 为屋顶、庭院边缘和铁路侧试验地发布本方案的约束卡 | 不证明产量、结构安全或食物可用性 [source:COMMON-TABLE-PARISCULTEURS] |

案例图像、品牌、平面图和长段原文不进入本包；只对官方/机构页面的机制做归因释义。案例转换是本方案的设计推演，不是原项目声明。[depth:risk_missing_data]

## 总体设计范围城市更新与控规深度城市设计

| 门 | 对象与最小账页 | 人工权力 | 失败退出 |
|---|---|---|---|
| G1 题源准入 | 问题所有者、数据来源、使用权、公开范围 | 数据与经营责任人确认 | 权利不清则不进入工作室 |
| G2 原料/对象接收 | 批次、供应来源、接收时间、储存条件 | 合格运营者验收 | 拒收、隔离并记录原因 |
| G3 共厨生产 | 工位、设备状态、批次、过敏原字段、责任厨师 | 厨房负责人签核流程和标签 | 暂停、封存、人工处置 |
| G4 市集交换 | 经营者资格、定价规则、摊位、批次、反馈渠道 | 市集运营者决定开放和撤场 | 立即停售/撤展并保留人工服务 |
| G5 剩余物分流 | 可食剩余与不可食有机物分开记录，标明时间和去向 | 有权主体决定再分配或废弃路径 | 混装、超时或来源不清即转合规处置 |
| G6 材料接收 | 重量、污染筛查、承运者、批准接收者 | 环境/运营责任人确认 | 无批准接收者则不运输、不堆存 |
| G7 土壤回用 | 稳定化记录、土壤/污染检测、地块用途、维护者 | 景观与环境专业人员批准 | 未满足条件则不进入种植或公众接触区 |

这七门构成方案规范的“生产—交换—材料—土壤”操作主链。G7 不是自动回到 G1：只有经检测并由景观、环境及运营责任人批准的土壤或生产性景观回用，才可条件返回下一轮来源端；其他材料转入合规处置并结束账页。任何数字界面都必须提供纸质/人工替代；离线时允许停止智能排程，但不能中断食品安全记录、应急通道和必要的人工服务。[source:NIST-AI-RMF] [depth:municipal_new_infrastructure]

## AI 创新生态、人才画像与 AI+ 场景

### 十二个场景卡

仅 CT-01 至 CT-04 属于受控产业工作室。所有状态均为 `not_assessed`；它们是需专业确认的试验协议，不是已运行服务。[metric:scenario_count] [metric:controlled_industry_studio_count]

| ID | 场景与位置 | 数据/对象 | 公共价值 | 风险与人工复核 |
|---|---|---|---|---|
| CT-01 ★ | 人机厨房协作室｜众智园 | 合成工序、设备状态、清权操作说明 | 减少工位冲突，形成可读手册 | 机器人不判断可食性；厨房负责人控制启动、暂停和清洁 |
| CT-02 ★ | 冷链与配送编排室｜众智园 | 合成/公开/授权的批次、温度、路线、时窗 | 比较排程和异常响应 | 不承诺真实性能；校准传感器并由人员处置温度异常 |
| CT-03 ★ | 食品服务机器人共作室｜众智园 | 动作谱、占用区、速度、停止状态 | 检查人机分工与空间接口 | 物理隔离、限定时段、急停；未经确认不直接服务公众 |
| CT-04 ★ | 市集经营工作室｜大钟寺 | 商品目录、汇总库存、排队与多语内容 | 支持小微经营与非个性化信息 | 禁止消费者画像和不透明差价；经营者审核输出 |
| CT-05 | 原点共厨课｜AI 原点 | 课程材料、预约名额、设备清单 | 厨师、学生、居民共同学习 | 纸质报名与人工讲解并存；合格负责人控制厨房 |
| CT-06 | 小店共作首单｜三桌 | 经营者公开的问题、成本与交付条件 | 把技术试作转成可报价服务 | 不保证成交、融资或注册；双方签核范围与退出 |
| CT-07 | 京张百年餐桌故事｜大钟寺 | 清权史料、口述授权、双语文本 | 连接铁路、市场和日常生活 | AI 只辅助整理；事实、权利和叙事由编辑审核 |
| CT-08 | 多语市集导览｜大钟寺 | 摊位、活动、价格与无障碍公开信息 | 降低访问信息门槛 | 不追踪行为，不生成饮食建议；人工服务台兜底 |
| CT-09 | 无屏共食服务｜四节点 | 纸质菜单、实体排队标记、人工柜台 | 不使用智能设备也能获得服务 | 数字故障不影响基本服务；运营者处理申诉 |
| CT-10 | 可复用器具与包装池｜小月河 | 资产 ID、借还、清洗和调拨状态 | 降低一次性器具依赖的试验成本 | 追踪物不追踪人；不声称已有清洗体系 |
| CT-11 | 厨房副产物匹配｜小月河 | 材料类别、重量、污染状态、批准接收者 | 让材料去向可见、可计量 | 不把副产物改称可食食品；授权主体决定去向 |
| CT-12 | 钟轨世界市集首发｜大钟寺 | 经核验的产品、课程、服务和反馈 | 公共首发与本地客户发现 | 试吃和销售由具备资格的真实运营者负责 |

### 七类人物、四个公共节点、五类活动

七类人物用于逐项走查：食物科技/AI 研发者；本地餐馆、摊位或小店经营者；厨师及厨房运营人员；物流、冷链和材料循环从业者；高校学生和开源开发者；居民与公共餐桌主持人（含不使用数字设备的人）；食物文化策展人与多语内容生产者。[metric:persona_count]

四个公共节点均有实体导视、人工柜台、无障碍路径和停止条件：[data:geometry/public_space.geojson#PUBLIC-001]

1. **铁路食材站**：展示经核验题单、批次路径和供应关系，不储存未经许可的食品。
2. **共享厨房庭**：用透明窗分隔公众界面与受控操作区。
3. **钟市长桌**：承载市集、课程与公共首发，同时保留普通休憩座位。
4. **有机物循环站**：只展示计量与批准去向；真实收集、运输和接收等待许可闭合。

五类候选活动为季度共食题单发布、月度开放共厨日、季度小月河食材与材料季、年度钟轨世界市集周、双月在地经营者共建会。频率只是运营建议，不代表已有主办方、预算、场地或审批。

![三张桌的空间与建筑载体](assets/figures/key-areas.png)

## 用地、建筑规模与拆改留方案

### 用地与建筑

用地图层按自然资源部分类语言登记 `05 / 0702 / 0802 / 0803 / 0804 / 1401`，用于表达商业、社区服务、研发、文化、教育和公园建议，不替代正式用地审批。[standard:MNR-LAND-USE-CLASSIFICATION-GUIDE] [source:DATA-SRC-MNR-LAND-USE-CLASSIFICATION-202311] [data:geometry/land_use.geojson#LU-001] [depth:land_use_layout]

九个概念建筑载体分为：众智园的食物系统实验室、厨房机器人工作室、冷链仿真室；AI 原点的共享厨房、摊主孵化室、开放食谱与代码室；大钟寺的世界市场厅、公共长桌厅、小微商户服务台。建筑面积、层数、高度、结构和拆改留均待确认。[data:geometry/buildings.geojson#BLDG-001] [metric:building_footprint_area_sqm]

## 交通、轨道、市政与公共服务设施

### 交通与后勤

交通组织以连续步行、无障碍与应急到达为第一优先，供应骑行、低速配送和器具回流沿概念支线运行。三张桌分别设置限定装卸时窗与明确停靠位，装卸不得侵占公共长桌、儿童活动区、盲道或消防界面；站点与轨道设施的实际边界未取得，图中线路只表达关系，不表达工程接驳。[data:geometry/roads.geojson#ROAD-001] [depth:traffic_rail_slow_parking]

批次冷链只记录完成运营所必要的温度、时间、异常和去向字段；传感器必须先校准，温度告警由合格人员复核并决定隔离、召回或处置，模型不得替代食品安全判断。有机材料运输与公众餐饮、食品供应和儿童活动在空间、容器、时段及责任账页上分离，无批准接收者时不得运输或临时堆存。市政与公共服务侧先保留清洗排水、通风排烟、用电、垃圾暂存、消防、普通休憩和人工服务的接口，但不推定现有容量足够。[depth:municipal_new_infrastructure]

道路宽度与红线、站界、交叉口条件、停车供给、地下管线、市政容量和消防条件均为未知；因此道路图层只含概念中心线，`road_area_sqm` 与 `road_ratio` 保持 `unknown`，不能从图面线宽反推道路面积、比例或通行能力。[metric:road_area_sqm] [metric:road_ratio]

## 蓝绿空间、公共空间与城市风貌

### 生产性景观

共食粮廊首先是一条连续公园和公共通行界面：树荫、普通休憩、无障碍停留、雨水与维护路线优先于消费场景。铁路食材站、共享厨房庭、钟市长桌和有机物循环站四个公共节点都保留非商业座位、实体导视、人工服务和可绕行路径；低技术标识沿铁路遗存视线布置，不以屏幕、消费或个人数据作为进入条件。[data:geometry/public_space.geojson#PUBLIC-001] [depth:blue_green_public_space]

屋顶、庭院边缘和铁路侧试验地采用本方案推导的“场地卡”制度，逐项公开结构承载、土壤与污染、水源、维护责任、食物用途和公众接触限制。未完成检测与许可时，只可进行非食用示范或封闭试验，不得以景观图推定产量或安全；只有检测合格且经景观、环境与运营责任人批准的回用材料，才可条件进入下一轮来源端或种植试验。[source:COMMON-TABLE-PARISCULTEURS] [data:geometry/green_space.geojson#GREEN-001]

`green_space_area_sqm`、`green_ratio`、`public_space_area_sqm` 与 `public_space_ratio` 均来自提交者的临时概念几何，只说明本包内部构图，不是法定指标或审批控制。官方生态基线、既有树木、水系、防洪、土壤污染、铁路遗产控制和真实公共空间权属仍待取得，后续必须用权威资料重建图层并复算。[metric:green_space_area_sqm] [metric:green_ratio] [metric:public_space_area_sqm] [metric:public_space_ratio]

![慢行优先、供应物流与材料回流](assets/figures/mobility-bluegreen.png)

## 重点区域详细设计

### 众智园：食物系统实验桌

以三类相邻但隔离的空间组织研发：干式数据/仿真室、受控设备工作室、需具备资格运营者管理的试制厨房。公众通过透明窗和只读展台理解问题、数据、失败与人工责任，不能进入受控操作区。概念建筑朝向和基底不构成工程结论。[data:geometry/key_areas.geojson#PROV-KEY-001] [depth:three_key_area_detailed_design]

### 北京 AI 原点社区：共厨与小微经营孵化

共享厨房、课程桌、辅导室和普通休憩庭院围绕可关闭的后勤环组织。准入采用 `申请 → 安全/经营基础课 → 共厨试作 → 市集测试 → 毕业或退出`，公布空间分配和检查点，避免无限期占用公共资源。[source:COMMON-TABLE-LA-COCINA] [source:COMMON-TABLE-EASTERN-MARKET-SHED5] [data:geometry/key_areas.geojson#PROV-KEY-002]

### 大钟寺：世界市集与公共长桌

市集厅、长桌厅和小微商户服务台围绕可分时使用的公共庭组织。后场明确批次接收、冷藏、清洗、剩余物分流和撤场路线；前场保留非消费座席、纸质双语信息与人工服务。公共性不以消费或提交个人信息为条件。[source:COMMON-TABLE-TEURASTAMO] [data:geometry/key_areas.geojson#PROV-KEY-003]

## 更新项目清单、实施政策与分期计划

| 项目 | 位置 | 阶段 | 进入条件 | 退出条件 |
|---|---|---|---|---|
| P1 来源与权利台账 | 全域 | 1 | 官方/清权资料可定位 | 来源失效或权利不清即停用 |
| P2 小型共食题单试点 | 三桌候选点 | 1 | 运营责任、保险、卫生和场地许可闭合 | 无责任主体或事件处置失败 |
| P3 共享厨房与孵化路径 | AI 原点 | 2 | 厨房资格、可负担规则、遴选与毕业门槛明确 | 无法保证安全或公平准入 |
| P4 世界市集委托 | 大钟寺 | 2 | 市集运营、摊主资格、后勤和公共空间方案确认 | 批次/撤场/申诉记录不完整 |
| P5 器具与材料回流 | 小月河 | 3 | 清洗、计量、运输及批准接收者落实 | 混装、污染或无去向 |
| P6 生产性景观试验 | 多点场地卡 | 3 | 结构、土壤、水、维护与用途通过专业审查 | 监测不合格或维护主体退出 |

空间分期图仅表达三段概念范围；阶段编号不是工期、投资或审批承诺。[data:geometry/phasing.geojson#PHASE-001] [depth:renewal_project_list] [depth:phasing_implementation]

每次委托采用 `1 食物科技团队 + 1 在地经营者/厨房 + 1 专业导师 + 1 公共主持人` 的四方结构。这是一条与 G1—G7 物质交接主链分开的七段经营转化路径，依次为题源、配桌、盘点、共作、上桌、成业、回用；可能结果包括继续经营、开源发布、转为课程、修订、暂停或退出，不把融资和企业成立当作必然结果。

## 指标体系、面积复算与合规矩阵

### 可从提交几何复算

`metrics.json` 使用 EPSG:4548 从序列化 GeoJSON 复算提交边界面积、各用地代码面积、建筑基底面积、绿地面积/比例、公共空间面积/比例、三段空间分期面积和三处临时重点区面积。[metric:green_space_area_sqm] [metric:green_ratio] [metric:public_space_area_sqm] [metric:public_space_ratio] [depth:metrics_recalculation]

### 必须保持未知

总建筑面积、容积率、官方建筑密度、高度、道路面积/比例和真实运营绩效没有合格分子或分母，均以 `status="unknown"`、`value=null`、原因、公式、来源文件和假设记录。图面目标不得覆盖这些状态。[metric:total_floor_area_sqm] [metric:floor_area_ratio] [metric:official_building_density]

### 未来运营指标的合格定义

- 共厨委托完成率：只有签署范围、责任人、批次/数据权利、验收和退出记录完整的委托进入分母。
- 小微经营转化率：必须先定义合格毕业与核验窗口；不把媒体曝光或一次市集出现计为企业形成。
- 器具回流率：以资产 ID 的借出与合格清洗/归还记录计算，不追踪个人。
- 有机材料循环率：以称重且被批准接收者确认的材料为分子；污染或去向不明批次不计入。
- 生产性景观回用率：只有通过土壤/污染和用途审查的稳定化材料才可计入；当前全部为未知。

![机器指标、来源与闭环状态](assets/figures/metrics-evidence.png)

## 风险、版权与合规说明

AI 负责检索公开资料、生成候选结构、辅助图层计算、排程和翻译；人类负责来源权利、规划判断、建筑与工程、食品安全、厨房操作、环境处理、市场开放、采购、伦理、可达性和最终提交。任何真实事故或食品风险优先进入既有人工应急流程，不等待模型回答。

本包的文字、图形、GeoJSON、HTML 和 PDF 为 Shawn Shi 与 Codex 在公开/清权资料基础上的 AI 辅助原创表达；第三方事实只作归因释义，未嵌入第三方图片、Logo、平面图或可识别人物。逐项权利清单见 `report/copyright_statement.md`。

正式深化交接顺序：获取官方范围与清权现状 → 重建九个图层 → 核验土地/建筑/交通/遗产/市政/消防/环境条件 → 确认运营与专业责任人 → 重新计算指标 → 复画五张图 → 重生成双语 HTML/PDF → 组织无障碍、经营者、食品与环境专业复核 → 再决定是否进入下一阶段。[standard:MOHURD-URBAN-DESIGN-MEASURES] [source:DATA-SRC-MOHURD-URBAN-DESIGN-MEASURES]

## 参考资料

`sources.json` 逐条登记发布者、标题、URL、访问日期、来源类型、采集方法、可支持范围、权利摘要、方案侧转换、用途和限制；`standard_matrix.json` 记录适用标准、本地快照路径与 SHA-256，用于发现引用漂移而不是声称符合性认证。项目范围、约面积和征集任务首先以官方公告与仓库任务书为权威入口，附加建筑资料仍只作为 `data_gap` 线索，不能补写官方 polygon、地块或控制条件。[source:DATA-SRC-OFFICIAL-ANNOUNCEMENT-20260509] [standard:PROJECT-OFFICIAL-ANNOUNCEMENT] [depth:risk_missing_data]

六个国际案例只支持表中列出的窄机制：例如 La Cocina 的公开准入与毕业门、Milan 食物枢纽的剩余物接收与分发记录。冷藏配置、场地约束卡、空间落位和交接账页均是京张方案侧的设计推演，不是来源项目对本投稿的认可、合作或绩效保证。[source:COMMON-TABLE-LA-COCINA] [source:COMMON-TABLE-MILAN-FOOD-HUBS]

正文、机器登记和本地快照共同构成可定位证据链；任何访问失败、覆盖不足、许可不明或事实更新都必须保留为缺口。案例图片、标识、平面图和长段原文均未嵌入，本包也不以图形或 AI 输出替代原始权威资料。

**状态说明：本文件是开源征集投稿，不代表已评审、入选、批准、签约或建成。**
