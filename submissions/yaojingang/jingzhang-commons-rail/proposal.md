---
title: "京张共智轨：面向开源 AI 城市共同体的可验证更新框架"
author_github: "yaojingang"
language: "zh"
translation_file: "proposal.en.md"
license: "COMMUNITY-DISPLAY-ONLY"
summary: "以京张铁路公共记忆为线索，把开源协作、产业测试和城市体验组织为可复算、可追溯、可由专业团队继续深化的城市更新参考方案。"
tracks: ["ai-traffic-walkability", "enterprise-services-ecosystem", "civic-agent-governance"]
scenarios: ["ai-traffic-walkability", "enterprise-service-copilot", "public-safety-operations-review"]
---

# 京张共智轨：面向开源 AI 城市共同体的可验证更新框架

京张共智轨的英文名为 **Jing-Zhang Commons Rail**，简称 **JZ Commons Rail**。识别图形由一段铁路线和一个开放圆环组成，铁路线对应百年京张的公共记忆，圆环对应持续开放的代码、数据、场景和评价接口。方案采用“一轨三场两翼”的总体结构：京张遗址公园公共记忆脊连接众智园可信 AI 测试场、北京 AI 原点开源成果转化场和大钟寺智能原生城市体验场，中关村科技服务翼与小月河场景赋能翼向周边延伸。所有空间数值来自当前临时边界下的概念复算，官方边界、控规条件和现状调查资料补齐后需整包重算。

## 设计依据与资料清单

方案读取了征集公告、面向智能体的开源任务书、仓库资料登记表和处理后的事实包。公告给出三层研究范围、三处重点区域和专业成果要求，任务书补充 AI 创新生态、人才画像、场景卡、命名标识、文化叙事与长期运营任务。城市设计管理、控制性详细规划、国土空间用地分类和建筑工程设计深度文件用于约束成果表达。对应证据为 [source:DATA-SRC-OFFICIAL-ANNOUNCEMENT-20260509]、[source:DATA-SRC-AGENT-TASKBOOK-20260518]、[source:DATA-SRC-MOHURD-URBAN-DESIGN-MEASURES]、[source:DATA-SRC-MOHURD-CONTROL-DETAILED-PLANNING]、[source:DATA-SRC-MNR-LAND-USE-CLASSIFICATION-202311]、[source:SOURCE-REGISTRY]、[source:PROCESSED-FACT-PACK] 以及 [standard:PROJECT-OFFICIAL-ANNOUNCEMENT]、[standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]、[standard:MOHURD-URBAN-DESIGN-MEASURES]、[standard:MOHURD-CONTROL-DETAILED-PLANNING]、[standard:MNR-LAND-USE-CLASSIFICATION-GUIDE]、[standard:MOHURD-ARCH-DESIGN-DEPTH-2016]。

仓库暂未提供法定总体边界、三处重点区域的正式多边形、现状建筑地块、权属、道路红线、轨道接口、管线容量、文保控制线和控规强度。本提交采用仓库登记的临时多边形 [source:DATA-SRC-PROVISIONAL-BOUNDARIES-20260605]，站点边界图层明确记录 `official_boundary=false`。现状诊断把缺口写入 `assumptions.json` 和约束图层 [data:geometry/constraints.geojson#CONSTRAINT-001]，并由 [depth:existing_conditions_diagnosis] 管理。该图层是数据缺口的空间索引，不构成行政边界、规划红线或工程条件。正式资料到位后的顺序为替换边界、裁切全部设计图层、重算面积和比例、复核专业矩阵、重绘图纸、重新运行自检。

本方案的资料用途分为正式依据、背景案例和临时约束。六个国际案例只支撑组织机制和运营方法，不能推导海淀的建设规模、用地控制或投资安排。所有规划动作均标注为概念建议、参考方案或待专业团队深化研究，实施主体、财政预算、审批程序和建设时序留待主办方及相关专业团队确认。

## 三层范围工作框架

统筹研究范围约 43.6 平方公里，适合讨论人工智能创新链、人才链、城市服务链和全球协作网络；总体设计范围约 11.4 平方公里，适合组织更新结构、用地、建筑、交通、市政、蓝绿空间和项目分期；重点区域公布总面积约 368.4 公顷，适合验证功能业态、空间形态、拆改留、慢行连通和 AI 场景。当前临时总体边界的复算面积为 11.4128 平方公里 [metric:site_area_sqm]，三处临时重点区域数量为 3 [metric:key_area_count]，公告给出的三处总面积为 3,684,000 平方米 [metric:announced_key_area_total_sqm]。两组面积口径分别保留，避免临时几何覆盖公告数字。

三层工作共用一条证据链。统筹层提出定位和机制，总体层将其写入完整覆盖的用地、公共空间和交通网络，重点层以三个详细设计片区检验日常使用与运营条件。空间索引来自 [data:geometry/site_boundary.geojson#SITE-001] 和 [data:geometry/key_areas.geojson#PROV-KEY-001]，任务深度由 [depth:three_level_scope_framework] 管理。临时边界变化会传导至所有地类面积、建筑基底、绿地、公共空间、道路长度和分期范围，因此每一项已知指标都绑定来源、图层、公式与假设。

![京张共智轨总体概念与三处重点场示意](assets/figures/site-overview.png)

“一轨”承担文化记忆、慢行串联、公共展示和开源贡献记录；“三场”分别承担可信测试、开源转化和城市体验；“两翼”把科技服务与生活场景接入沿线社区。三层范围使用同一套标识与场景语言，空间控制深度随范围逐级增加。当前图面表达属于参考方案，官方多边形发布后可沿这套关系更新，无需改写概念逻辑。

## 统筹研究范围产业与未来城市研究

“京张共智轨”把五类功能放进日常城市网络：原创研究与开源协作、可信测试与标准共研、企业孵化与成果转化、公共服务与生活体验、国际传播与人才交往。三区对应众智园、北京 AI 原点和大钟寺，两翼对应中关村科技服务资源与小月河沿线社区场景。公共记忆脊负责跨区识别，开放接口让高校、企业、居民和专业机构按权限参与。总体空间结构由 [depth:overall_spatial_structure] 管理，建议网络落在 [data:geometry/public_space.geojson#PUBLIC-001] 和 [data:geometry/roads.geojson#ROAD-001] 中。

六个全球案例为运营机制提供参照，共计 6 个 [metric:ecosystem_case_count]。Vector Institute 连接研究、产业和人才，本方案转译为联合课题、人才驿站和公开演示日 [source:CASE-VECTOR-INSTITUTE]。Mila 的 Community of Practice 提供持续的学术与产业交流，本方案转译为月度跨界工作坊 [source:CASE-MILA-COMMUNITY]。AI Singapore 的 100 Experiments 把问题定义、原型开发和交接组织成连续流程，本方案用于设计“需求登记、受控原型、人工验收、成果交接”的测试机制 [source:CASE-AI-SINGAPORE-100E]。

MIT 对 Kendall Square 创新生态的研究强调创业者、资本、大企业、政府和高校等多类主体，本方案据此设置五方联席议题 [source:CASE-MIT-KENDALL-SQUARE]。伦敦 Knowledge Quarter 把铁路门户周边的机构连接、知识交换与公众开放结合，本方案用于沿线品牌和公共知识活动 [source:CASE-LONDON-KNOWLEDGE-QUARTER]。STATION F 的多项目共址和共享服务体系启发开源团队、企业加速项目及城市服务共同使用一套基础设施 [source:CASE-STATION-F]。案例只支撑机制选择，海淀的空间尺度和专业指标继续以本地正式资料为准。

品牌活动建议形成四季节奏。春季开源贡献周发布模型卡、数据卡和城市问题清单；夏季可信测试季开放受控场景；秋季京张全球 AI 开放周串联三处重点场；冬季城市智能体治理复盘公开记录故障、申诉和调整。活动名称、主办单位、资源投入与举办日期均需另行确认。公共品牌可以持续积累开源贡献记录，京张铁路文化内容由史料核验和专业策展支撑。

## 总体设计范围城市更新与控规深度城市设计

总体空间采用“一轨三场两翼、六线四环多节点”。一轨沿京张遗址公园组织公共记忆与慢行；三场形成北、中、南三个功能锚点；两翼向中关村科技服务和小月河生活场景连接；六条概念中心线表达铁路公共脊、东西向慢行、社区接驳和滨水联系；四类环路分别服务日常通勤、绿色休闲、开源活动和重点区内部步行。道路中心线概念总长 15,308.776 米 [metric:road_centerline_length_m]，线位用于网络关系和步行连续性研究，正式道路红线、断面和通行能力仍待交通专项确认。

![临时边界下的完整用地覆盖、概念建筑和公共节点](assets/figures/land-use-structure.png)

更新结构由完整用地分区、十组概念建筑原型、三片绿地、六个公共节点和三期实施带共同表达。用地布局由 [depth:land_use_layout] 管理，强度控制由 [depth:development_intensity_controls] 管理，建筑体量与风貌由 [depth:height_massing_character] 管理。证据分别位于 [data:geometry/land_use.geojson#LU-001]、[data:geometry/buildings.geojson#BLDG-001]、[data:geometry/green_space.geojson#GREEN-001]、[data:geometry/public_space.geojson#PUBLIC-001] 和 [data:geometry/phasing.geojson#PHASE-001]。所有建筑均为容量测试原型，现状测绘和权属核验完成前不对应具体拆除或新建决定。

总体设计形成四个可滚动项目包：公共记忆脊与慢行连续性、三处重点场公共界面、开源协作与可信测试设施、蓝绿和新型基础设施。每个项目包均设置启动条件、数据需求、人工复核和退出机制。概念期优先处理低风险、可逆、公共性强的导视、临时活动、开放接口和步行断点；涉及建设强度、建筑拆除、道路工程、市政迁改和文保影响的项目进入专业论证。

## 重点区域详细设计

三处重点场通过同一组设计问题对照：产业定位、公共空间、建筑更新、交通接驳、测试场景、数据治理和运营主体。三片临时区域总量与公告范围存在口径差异，片区数值只用于概念复算。众智园临时面积 1,929,201.877 平方米 [metric:zhongzhiyuan_ai_acceleration_area_provisional_area_sqm]，北京 AI 原点临时面积 1,043,236.909 平方米 [metric:beijing_ai_origin_community_provisional_area_sqm]，大钟寺临时面积 720,454.219 平方米 [metric:dazhongsi_ai_industry_cluster_provisional_area_sqm]。详细设计深度由 [depth:three_key_area_detailed_design] 管理。

![众智园、北京 AI 原点和大钟寺三处重点场设计索引](assets/figures/key-areas.png)

| 重点场 | 主要定位 | 空间与建筑动作 | 交通及公共空间 | 试验与运营 |
| --- | --- | --- | --- | --- |
| 众智园可信 AI 测试场 | 全栈自主创新、标准共研与安全治理 | 保留可复用研发载体，设置可逆测试盒、评测廊和低碳算力服务节点 | 连续清河绿色界面，组织园区接驳、步行骑行和访客分流 | 可信 AI 沙盒、园区物流协同、标准工作坊，敏感数据留在授权环境 |
| 北京 AI 原点开源成果转化场 | 近校开源协作、成果转化与人才社区 | 以首层开放、院落共享和小尺度增补形成发布、孵化、法务及人才服务组合 | 缝合校区、园区与轨道站点，形成昼夜分级的开源街 | 开源发布、城市服务原型、人机协作课堂，成果发布保留许可和来源记录 |
| 大钟寺智能原生城市体验场 | 智能体、智能终端、内容消费与国际交往 | 激活站城首层和存量商业界面，配置城市客厅、路演厅和公共体验单元 | 研究站点一体化和四象限步行连通，补足遮荫、等候与无障碍空间 | 站城导航、企业服务助手、内容体验，公共决策保留人工确认与申诉入口 |

众智园以开放绿地作为安全测试的外层界面，核心评测留在可控室内环境。北京 AI 原点把开源贡献记录和成果转化服务放在可进入的首层，居住与夜间安静区维持清晰边界。大钟寺把轨道门户、商业界面与国际交流空间相连，公共体验提供访客模式和居民模式。三片区对应 [data:geometry/key_areas.geojson#PROV-KEY-001]、[data:geometry/key_areas.geojson#PROV-KEY-002]、[data:geometry/key_areas.geojson#PROV-KEY-003]，片区形态将在官方边界发布后重新裁切与复核。

## AI 创新生态、人才画像与 AI+ 场景

六类用户画像覆盖开源开发者、AI 初创团队、高校师生与科研人员、企业访客和运营人员、周边居民、城市治理及专业审查人员，共计 6 类 [metric:persona_count]。开发者需要发布、协作、测试和声誉记录；初创团队需要低成本空间、合规数据与算力入口；高校人员需要近校转化和跨机构交流；企业访客需要展示、招聘和商务服务；居民关注通勤、休闲、低扰动更新及申诉渠道；审查人员需要来源、假设、指标和图层可追溯。画像只描述服务任务，不建立个人追踪档案。

方案形成 12 张场景卡 [metric:scenario_card_count]，其中 4 个属于产业测试验证场景 [metric:industrial_test_scenario_count]。每张卡包含服务对象、空间载体、输入数据、隐私边界、人工复核、运营主体概念和失败后的降级方式。

| 编号 | 场景与地点 | 数据及人工边界 | 类型 |
| --- | --- | --- | --- |
| 01 | 众智园可信 AI 评测沙盒 | 授权样本在隔离环境运行，结论由评测人员签署 | 产业测试 |
| 02 | 众智园园区物流协同 | 采用脱敏订单与设备状态，异常时切回人工调度 | 产业测试 |
| 03 | 原点开源发布与许可助手 | 只读公开仓库和授权材料，发布前由贡献者确认 | 产业测试 |
| 04 | 大钟寺企业服务助手 | 处理企业主动提交的问题，政策解释由服务人员复核 | 产业测试 |
| 05 | 京张慢行无障碍导航 | 使用公开路网与现场核验数据，保留人工报错入口 | 城市服务 |
| 06 | 公园活动客流提示 | 只发布分区级聚合信息，现场管理人员决定限流 | 城市服务 |
| 07 | 清河蓝绿设施巡检 | 识别设施维护线索，工单由专业人员核验 | 城市服务 |
| 08 | 近校成果转化匹配 | 使用团队授权的成果简介，法务与投资建议由专业人员提供 | 产业服务 |
| 09 | 城市智能体验预约 | 收集完成服务所需的最少信息，支持撤回与删除 | 生活服务 |
| 10 | 多语种公共导览 | 内容来自清权资料库，文化事实经策展人员复核 | 公共文化 |
| 11 | 社区公共议题整理 | 对公开意见做主题聚合，原始意见和少数观点均可查 | 社区协作 |
| 12 | 城市运行演练台 | 采用合成或脱敏数据，任何处置建议由责任人员确认 | 治理演练 |

场景节点分布在公共空间、绿地和慢行网络，对应 [data:geometry/public_space.geojson#PUBLIC-001]、[data:geometry/green_space.geojson#GREEN-001] 和 [data:geometry/roads.geojson#ROAD-001]。所有高影响建议保留人工复核、日志、申诉与关闭开关。正式运营前还需完成数据保护影响评估、网络安全审查、无障碍测试、责任主体确认和小范围试运行。

## 用地、建筑规模与拆改留方案

临时边界下的五类概念用地完整覆盖且无重叠：代码 05 商业服务业用地约 3,603,465.831 平方米 [metric:land_use_05_area_sqm]，0701 城镇住宅用地约 890,856.157 平方米 [metric:land_use_0701_area_sqm]，0702 城镇社区服务设施用地约 2,377,305.049 平方米 [metric:land_use_0702_area_sqm]，0802 科研用地约 2,577,595.042 平方米 [metric:land_use_0802_area_sqm]，1401 公园绿地约 1,963,612.349 平方米 [metric:land_use_1401_area_sqm]。分类依据和限制记录在 [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE]，具体分区见 [data:geometry/land_use.geojson#LU-001]。

概念建筑基底面积约 1,366,845.151 平方米 [metric:building_footprint_area_sqm]，概念总建筑面积约 5,997,967.069 平方米 [metric:conceptual_total_floor_area_sqm]，建筑密度概念值为 0.119764 [metric:conceptual_building_density]，容积率概念值为 0.525546 [metric:conceptual_floor_area_ratio]。这些数值来自十组抽象建筑原型与临时边界，主要用途是检验公共空间、地类覆盖和容量计算链。正式容积率 [metric:floor_area_ratio] 与建筑高度 [metric:building_height_m] 保持 unknown，等待控规、日照、消防、文保、航空和城市设计条件。

拆改留采用调查驱动的四级方法，并由 [depth:retain_renovate_demolish] 管理。具有历史、产业记忆、结构适应性和社区使用价值的建筑进入保留核验；结构可用、首层封闭或能耗较高的建筑进入改造核验；小尺度可逆增补用于补足公共服务、共享会议和测试空间；拆除候选需经过权属、结构、历史价值、安置、碳排和方案比选。当前 [data:geometry/buildings.geojson#BLDG-001] 只表达新旧体量关系和容量测试，现场普查完成前不为具体建筑分配拆改留结论。

## 交通、轨道、市政与公共服务设施

交通框架优先组织步行、骑行、轨道接驳和重点场内部微循环。六条概念中心线连接京张公共记忆脊、三处重点场、东西向社区和滨水空间，网络由 [depth:traffic_rail_slow_parking] 管理。站点周边研究连续遮荫步行、无障碍过街、骑行停放、共享接驳、访客落客和分时物流；四象限连通、道路断面、信号配时、停车供给和轨道接口需取得正式交通资料后深化。道路面积 [metric:road_area_sqm] 和道路比例 [metric:road_ratio] 保持 unknown，当前仅报告中心线长度。

![慢行、公共记忆脊、蓝绿空间和重点场接驳关系](assets/figures/mobility-bluegreen.png)

市政与新型基础设施采用分布式服务节点。众智园布置受控算力与评测节点，原点社区布置开源协作、知识产权和成果发布服务，大钟寺布置站城信息、企业服务与多语导览接口。能源侧建议评估光伏、储能、余热和需求响应的组合，水务侧评估海绵设施与维护监测，数据侧保留本地处理、分级授权、日志审计和人工降级。具体容量、设备、管线路由、消防和防洪排涝需专项计算，[depth:municipal_new_infrastructure] 记录当前深度与待补资料。

公共服务设施采用日常共享与活动切换机制。社区服务、人才服务、法务知识产权、教育体验、公共卫生、无障碍支持和国际交往可以共用可预约空间，服务对象和开放时段由运营方公示。高峰活动使用临时设施和分区预约，日常阶段维持居民通行与安静界面。涉及医疗、教育、法律的 AI 场景只提供辅助信息和流程导航，专业决定继续由相应责任人员作出。

## 蓝绿空间、公共空间与城市风貌

概念绿地面积约 3,074,769.676 平方米 [metric:green_space_area_sqm]，占临时边界 26.9414% [metric:green_ratio]；概念公共空间面积约 894,473.716 平方米 [metric:public_space_area_sqm]，占 7.8374% [metric:public_space_ratio]。绿地数值含完整地类中的公园绿地与专项绿地表达，公共空间是叠加层，两者用途不同，不能直接相加。蓝绿与公共空间深度由 [depth:blue_green_public_space] 管理，官方水系、绿线、海绵和文保控制条件补齐后重算。

四个概念地标对应 4 处 [metric:landmark_count]。北京 AI 原点设置“开源里程碑”，用可更新的贡献年轮记录项目、许可和维护状态；众智园设置“可信 AI 试验花园”，把公开科普放在安全测试区之外；大钟寺设置“智能原生城市客厅”，连接轨道门户、企业展示和居民服务；京张公共记忆脊中段设置“京张开源荣誉站”，展示经过核验的铁路史料与当代开源贡献。地标采用轻介入、可逆、可维护的装置，具体位置需避让文保、生态、消防和市政条件。

城市风貌采用“铁路测绘图册”的设计语言。暖白基底承接历史纸张质感，墨黑用于信息，氧化铁红对应铁路线和重点动作，公园绿对应公共空间，蓝灰用于交通和数据。建筑首层强调开放界面、遮荫、可坐和夜间安全，新增体量控制对遗址公园的压迫感，屋顶优先服务低碳设施和公共活动。文化叙事沿“蒸汽铁路、知识网络、开源协作”展开，史实部分只使用清权材料，策展文本需由历史与文保专业人员核验。

## 更新项目清单、实施政策与分期计划

项目清单由八个概念包组成：京张公共记忆脊连续工程、三处重点场首层开放工程、开源成果转化服务站、可信 AI 测试与治理中心、站城慢行和无障碍补缝、蓝绿设施与维护系统、分布式算力能源服务节点、全球 AI 开放周运营系统。项目包由 [depth:renewal_project_list] 管理，每项需要补充责任主体、正式边界、现状权属、投资估算、审批路径、工程条件和公共参与记录。空间分期见 [data:geometry/phasing.geojson#PHASE-001]。

近期阶段建议开展资料补齐、现状普查、官方边界替换、步行断点诊断、临时导视、开源活动和小范围受控测试。中期阶段可推进重点场首层更新、站城接驳、共享服务设施、绿地连通和新型基础设施试点。远期阶段根据监测结果、居民反馈、产业需求和专业评估调整建设规模，逐步形成沿线协作网络。分期由 [depth:phasing_implementation] 管理，日期、投资与建设承诺需由实施主体另行确定。

长期运营采用“问题清单、受控原型、公开评测、人工验收、版本记录”的循环。城市问题由居民、企业、高校和运营人员提出，跨专业小组确认数据和风险，原型在限定空间测试，结果公开到可复核粒度，责任人员决定上线、修改或关闭。空间资源可按日常、活动、测试三种模式预约，居民基本通行和公共服务持续保留。年度报告披露场景使用、故障、申诉、能源、水务和公共空间维护情况。

政策建议包括公共空间开放协议、临时使用许可、开源成果许可与署名指引、受控数据沙盒、跨机构设施预约、企业服务单一入口、居民申诉和独立评估。所有建议属于可供专业团队深化的参考框架，涉及行政许可、财政投入、土地供应和监管权责时，应回到现行法律、规划和部门职责。

## 指标体系、面积复算与合规矩阵

指标复算链为 `sources.json`、GeoJSON、`metrics.json`、假设与三类矩阵，再进入自检报告。用地分区采用同一投影下的拓扑运算，建筑、绿地、公共空间和重点区域面积由几何计算，比例统一除以临时边界面积。专业深度由 [depth:metrics_recalculation] 管理。指标图展示已知值、未知值和补数条件，便于官方多边形到位后逐项更新。

![指标状态、计算链和待补官方资料](assets/figures/metrics-evidence.png)

| 指标组 | 当前概念结果 | 复算用途 |
| --- | --- | --- |
| 边界与重点场 | 11.4128 平方公里，3 处临时重点场，公告总面积 368.4 公顷 | 检查三层范围与口径差异 |
| 概念建筑 | 基底 136.68 万平方米，总建筑面积 599.80 万平方米，概念密度 12.0%，概念容积率 0.526 | 容量测试与公共空间关系检查 |
| 蓝绿公共空间 | 绿地 307.48 万平方米，概念比例 26.9%；公共空间 89.45 万平方米，概念比例 7.8% | 检查连续性、公共性和叠加关系 |
| 交通 | 概念中心线 15.31 公里 | 检查节点连接，等待正式红线后计算道路面积 |
| AI 生态 | 6 个案例、6 类画像、12 张场景卡、4 个产业测试场景、4 个地标 | 检查任务书内容覆盖 |

矩阵把公告条目、专业深度、标准、正文、图层、指标、图纸和自检相互连接。已知指标同时引用了各地类和重点场面积，未知指标保留原因与所需资料。指标结果的空间来源包括 [data:geometry/site_boundary.geojson#SITE-001]、[data:geometry/land_use.geojson#LU-001]、[data:geometry/buildings.geojson#BLDG-001]、[data:geometry/roads.geojson#ROAD-001]、[data:geometry/green_space.geojson#GREEN-001]、[data:geometry/public_space.geojson#PUBLIC-001] 和 [data:geometry/phasing.geojson#PHASE-001]。面积、比例和数量可以在替换官方数据后整包复算，历史版本继续保留来源和哈希记录。

## 风险、版权与合规说明

主要风险由 [depth:risk_missing_data] 管理。边界风险会影响所有面积和项目落位；控规风险会影响用途、强度、高度、退线和设施规模；现状风险会影响拆改留、权属和安置；交通市政风险会影响道路、轨道、管线、消防、防洪和能源；文保生态风险会影响地标、照明、活动及建设方式；运营风险会影响数据许可、算法责任、维护资金和长期主体。每类风险均在 `assumptions.json` 中设置状态和影响，临时图面不会升级为审批结论。

正式数据到位后的复算动作固定为六步：验证坐标参考和拓扑；替换总体与重点场多边形；裁切或重建用地、建筑、道路、绿地、公共空间和分期；重算全部 known 指标；复核专业深度、标准和公告矩阵；重绘 A3、A0、离线网页并运行自检。任何已发布版本继续保留原来源、假设和计算状态，避免新旧指标混用。

本提交采用 `COMMUNITY-DISPLAY-ONLY` 许可，版权声明见 `report/copyright_statement.md`。方案原创文字、图形、结构化数据和图纸可按仓库规则用于本次开源征集展示。官方资料与外部案例的权利归原权利人，引用只用于说明依据和背景。图形未使用远程字体、商业地图、第三方照片或未清权标志。品牌名称与标识属于概念提案，正式使用前需完成商标、名称和文化表述审查。

AI 治理遵循最少数据、授权使用、可解释记录、人工复核、申诉入口和可关闭原则。系统输出不能代替规划审批、专业诊断、执法决定、医疗教育法律决定或公共安全指挥。高影响场景上线前应经过专业评估、利益相关方参与、小范围试运行和独立复核，故障与纠错记录纳入年度运营报告。

## 参考资料

- 百年京张 AI 创新带城市设计国际方案征集资格预审公告，[source:DATA-SRC-OFFICIAL-ANNOUNCEMENT-20260509]。
- 百年京张 AI 创新带城市设计 Agent 开源征集任务书，[source:DATA-SRC-AGENT-TASKBOOK-20260518]。
- 城市设计管理、控制性详细规划、用地分类和建筑设计深度资料，[source:DATA-SRC-MOHURD-URBAN-DESIGN-MEASURES]、[source:DATA-SRC-MOHURD-CONTROL-DETAILED-PLANNING]、[source:DATA-SRC-MNR-LAND-USE-CLASSIFICATION-202311]。
- 仓库临时边界、资料登记表和处理事实包，[source:DATA-SRC-PROVISIONAL-BOUNDARIES-20260605]、[source:SOURCE-REGISTRY]、[source:PROCESSED-FACT-PACK]。
- Vector Institute、Mila Community of Practice 与 AI Singapore 100 Experiments，[source:CASE-VECTOR-INSTITUTE]、[source:CASE-MILA-COMMUNITY]、[source:CASE-AI-SINGAPORE-100E]。
- MIT Kendall Square、Knowledge Quarter London 与 STATION F，[source:CASE-MIT-KENDALL-SQUARE]、[source:CASE-LONDON-KNOWLEDGE-QUARTER]、[source:CASE-STATION-F]。
- 设计深度索引：[depth:existing_conditions_diagnosis]、[depth:three_level_scope_framework]、[depth:overall_spatial_structure]、[depth:land_use_layout]、[depth:development_intensity_controls]、[depth:height_massing_character]、[depth:retain_renovate_demolish]、[depth:traffic_rail_slow_parking]、[depth:municipal_new_infrastructure]、[depth:blue_green_public_space]、[depth:three_key_area_detailed_design]、[depth:renewal_project_list]、[depth:phasing_implementation]、[depth:metrics_recalculation]、[depth:risk_missing_data]。

本方案在当前资料条件下形成可审阅的概念参考包。官方边界、控规、现状、道路、轨道、市政、权属、文保和生态条件补齐后，专业团队可沿现有证据链继续深化与复算。
