---
title: "京张编组场 JINGZHANG MARSHALLING YARD：把创新在城市轨道上重新编组"
author_github: "littlejimmywang"
language: "zh"
proposal_format_version: "2"
bilingual_contract_version: "1"
translation_file: "proposal.en.md"
license: "COMMUNITY-DISPLAY-ONLY"
summary: "以詹天佑京张铁路的『编组智慧』为总体概念，把百年京张创新带组织为一座可重连、可折返、可对账的AI创新编组场：一条主轨、三座编组场、两翼支线、多道岔与一张运行图，让人才、模型、数据、算力、资本与场景在城市轨道上安全拆解、按需重组、验证后发车。"
tracks: ["jingzhang-heritage-narrative", "enterprise-services-ecosystem", "civic-agent-governance"]
scenarios: ["ai-cultural-guide", "ai-traffic-walkability", "enterprise-service-copilot", "public-safety-operations-review", "ai-health-service-navigation", "robot-delivery-low-speed"]
iteration: "v0.1"
---

# 京张编组场 JINGZHANG MARSHALLING YARD

一百年前，詹天佑主持修建的京张铁路不是一条孤立的钢轨，而是一套会“编组”的运输体系：列车在编组场里按去向拆解、重连、换向、发车，靠精确的运行图和信号体系安全运行。今天，海淀拿出 43.6 平方公里的 AI 创新带，需要的正是同一种“编组智慧”——把人才、模型、数据、算力、资本与场景当作一列列“创新车列”，在城市的轨道上安全拆解、按需重连、测试后再发车。

本方案以 **京张编组场（JINGZHANG MARSHALLING YARD, JZ-YARD）** 为总体概念，提出“一主轨、三编组场、两翼支线、多道岔、一张运行图”的空间与运营框架，让百年京张的工程传统转译为 AI 时代的城市机制。

## 设计依据与资料清单

本方案以北京市规划和自然资源委员会海淀分局《百年京张AI创新带城市设计国际方案征集资格预审公告》为第一依据 [source:OFFICIAL-ANNOUNCEMENT] [standard:PROJECT-OFFICIAL-ANNOUNCEMENT]，并依据面向智能体开源征集任务书展开六项必答任务 [source:AGENT-TASKBOOK] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]。场地机器可读资料来自 `brief/site-package/` 的设计任务书、允许设计空间、枚举、指标区间与模式，公开资料用途边界以 `data/source_registry.json` 为准 [source:SOURCE-REGISTRY]。

依据中央资料登记表，本方案可作 formal 任务依据的包括：官方资格预审公告、面向智能体任务书、城市设计管理办法、控规编制审批办法与用地分类指南等本地标准快照；provisional-only 资料为仓库提供的临时粗略边界 [source:BOUNDARY-SOURCE] [source:KEY-AREA-SOURCE]。方案使用的边界与三处重点区均为 `provisional_constraint`、`official_boundary=false`，仅用于生成、自检、可视化与设计讨论，不得作为官方红线、审批依据或精确面积依据；官方多边形发布后需整体复算。

阅读导航层来自 `data/processed/agent_fact_pack.md` 与其中四张工作表，正文只回引直接支撑判断的 source id，完整来源与覆盖保存在 `sources.json`、`standard_matrix.json` 与 `design_depth_matrix.json` [source:PROCESSED-FACT-PACK]。总体边界与面积复核可回接总体范围图层与指标 [data:geometry/site_boundary.geojson#SITE-001] [metric:site_area_sqm]。

![总体概念：京张编组场空间组织总览](assets/figures/site-overview.png)

## 三层范围工作框架

三层范围是同一套“编组逻辑”在不同尺度的展开。统筹研究范围（约 43.6 平方公里）回答“创新车流从哪里来、到哪里去”，确定产业链、五大功能与三区两翼的编组关系 [source:OFFICIAL-ANNOUNCEMENT] [depth:three_level_scope_framework]。总体设计范围（约 11.4 平方公里）把编组逻辑落为轨道网络、编组场、道岔节点与运行图 [data:geometry/site_boundary.geojson#SITE-001] [depth:overall_spatial_structure]。重点区域范围（约 368.4 公顷）是三座实体编组场，要求达到规划综合实施方案深度 [depth:three_key_area_detailed_design] [data:geometry/key_areas.geojson#PROV-KEY-001]。

三层范围逐级落实：产业战略与未来城市形态 → 总体城市更新与控规深度设计 → 三处重点区详细设计，任何一层的面积、比例与项目数量都可由提交几何复算 [metric:site_area_sqm] [metric:key_area_area_sqm]。使用 provisional 边界时，本方案只把矩形粗略范围作为低对比约束表达，并把设计重点放在廊道、节点、编组场界面与实施逻辑上；官方红线发布后，site boundary、key areas、land use、roads、green/public space、buildings、phasing 与全部相关指标均需重算。

| 层级 | 编组语义 | 设计重点 | 证据落点 |
| --- | --- | --- | --- |
| 统筹研究范围 | 车流组织 | 创新链、五大功能、三区两翼协同 | compliance_matrix、standard_matrix |
| 总体设计范围 | 轨道与道岔 | 主轨、路网、用地、更新框架、风貌 | [data:geometry/land_use.geojson#LU-0802-000] [data:geometry/roads.geojson#ROAD-001] |
| 重点区域范围 | 三座编组场 | 众智园/原点/大钟寺详细设计 | [data:geometry/key_areas.geojson#PROV-KEY-002] [data:geometry/key_areas.geojson#PROV-KEY-003] |

![三层范围传导与空间工作框架](assets/figures/land-use-structure.png)

## 统筹研究范围产业与未来城市研究

统筹研究范围的核心是“为创新车流建立目的地系统”。方案把三大定位转译为编组场语言：百年京张文化带是历史底版（铁轨、道岔、信号、里程碑），都市AI生活体验带是“到发体验”（场景在街上被看见、被消费），AI融合创新带是“编组作业”（要素在园区被重组）[source:AGENT-TASKBOOK] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]。

五大功能分别对应编组场的五类作业：AI全栈自主创新体系对应重载编组（全栈堆场），世界级AI创新生态对应国际编组（始发/到发联运），AI+场景赋能新范式对应场景编组（车列重组），智能化AI活力城市对应信号与运行图（城市智能调度），AI治理全球话语权对应编组作业标准与安全规程（城市级安全治理）。三区两翼形成“主轨—支线”协同回路：中关村科技服务翼输送资本与服务，小月河场景赋能翼输送场景与体验，三座重点区编组验证并回发 [depth:overall_spatial_structure]。

面向全球的 AI 创新生态案例是本方案产业策略的可读依据，共选取七个案例并说明其可转化机制 [source:AGENT-TASKBOOK]：

| 案例 | 编组特征 | 可转化机制 |
| --- | --- | --- |
| 美国硅谷与斯坦福大学 | 大学策源+风投“始发编组” | 原点社区构建近校成果始发站与资本直连 |
| 深圳华强北—无人机产业链 | 供应链快反编组 | 众智园构建重载测试与供应链试验场 |
| 杭州城西科创大走廊 | 平台型企业生态编组 | 龙头牵引+中小团队挂车接入 |
| 伦敦科技城与知识园区 | 城市更新型编组 | 遗址公园周边低效空间更新承载创新 |
| 新加坡纬壹科技城 | 复合园区运营编组 | 园区级运营公司与年度运营日历 |
| 韩国板桥—上岩数字媒体城 | 文化科技融合编组 | 大钟寺内容消费与数字资产界面 |
| 中关村国家实验室与软件园体系 | 全栈自主编组 | 众智园承接全栈验证与标准治理 |

命名体系采用“轨道词表”：主名“京张编组场”，英文 JINGZHANG MARSHALLING YARD，简称 JZ-YARD；主轨、编组场、道岔、信号、运行图、里程、折返构成命名与导视的同一词汇体系。Logo 方向为蓝图式轨道符号：一条主线分岔成三条支线，在三处汇成三个“场”形节点，配红、黄、绿三色信号点，隐喻可暂停、可测试、可放行的公共信号语言。以上命名与视觉均为概念建议，商标、字体与图样使用需清权。

## 总体设计范围城市更新与控规深度城市设计

总体设计范围按控规深度城市设计组织为“一主轨、三编组场、两翼支线、多道岔、一张运行图” [depth:overall_spatial_structure] [depth:land_use_layout]。主轨即京张遗址公园慢行与文化主脊，是连接三座编组场的“正线”，也是蓝绿、慢行、文化与AI体验复合的城市公共基线 [standard:MOHURD-URBAN-DESIGN-MEASURES] [data:geometry/roads.geojson#ROAD-001]。

用地布局以主轨为界形成西产业、东生活、中蓝绿的结构：西翼以科研与成果转化用地承载重载研发 [data:geometry/land_use.geojson#LU-0802-000] [metric:land_use_area_0802]，东翼以居住、教育、医疗与社区服务承载人才生活 [data:geometry/land_use.geojson#LU-0701-000]，中脊以公园绿地与广场承载公共交往 [data:geometry/land_use.geojson#LU-1401-000] [metric:green_ratio]。道路用地、防护绿地与留白用地保证用地分区无缝完整且无重叠 [metric:land_use_area_1207]。

建筑规模与开发强度坚持“可复算、可讨论、待确认”三层表达：建筑基底面积由提交图层复算 [metric:building_footprint_area_sqm] [depth:development_intensity_controls]，容积率与建筑高度因缺少批准控规条件列为待正式数据补齐 [depth:height_massing_character]，不得以推测值冒充审定指标。更新框架按“保留文化肌理—改造低效空间—新建场景界面—留白远期用地”分类推进 [depth:retain_renovate_demolish]，所有拆改留结论均为概念建议，须待权属、控规与工程条件确认。

## 重点区域详细设计

三处重点区即三座编组场，分别承担“重载、始发、到发”三类作业 [depth:three_key_area_detailed_design]。所有重点区范围均为 provisional 粗略多边形，其边界只作方向性设计底版，不构成精确面积或审批依据 [data:geometry/key_areas.geojson#PROV-KEY-001] [data:geometry/key_areas.geojson#PROV-KEY-002] [data:geometry/key_areas.geojson#PROV-KEY-003]。

**众智园AI自主创新加速区＝重载编组场（约 192.1 公顷）** [metric:zhongzhiyuan_area_sqm]。定位为全栈自主创新的重载试验场：承接大模型训练、评测、安全红队与标准制定的“重载编组”。空间结构沿清河界面组织低碳创新交往廊，西区布置重载测试与算力场景界面，沿主轨布置验证成果展示。建筑以 AI 研发与实验室为主 [data:geometry/buildings.geojson#BLDG-001]，公共空间强化清河蓝绿界面与折返观景台。实施依赖国家平台与算力条件，风险在于清河蓝线、防洪与产业审批，均列为待确认。

**北京AI原点社区＝始发编组场（约 104.3 公顷）** [metric:ai_origin_area_sqm]。定位为近校成果转化的“始发站”：高校实验室成果在此“挂车编组”，从 0 到 1 发车。空间以近校成果转化街为纵轴，配置始发站台、挂车编组坞、守车（夜间共创空间）与文化发布厅；教育、研发与文化用地相邻布置，校区—园区慢行缝合至主轨 [data:geometry/land_use.geojson#LU-0804-000]。实施依赖校区边界、权属与首层业态，风险为校园数据与成果知识产权授权。

**大钟寺AI产业聚集区＝到发集结场（约 72.0 公顷）** [metric:dazhongsi_area_sqm]。定位为智能原生新业态的“到发场”：智能体、智能终端与内容消费在此集结、展示、对账并发车。空间围绕大钟寺站组织四象限步行连通，商业与文化用地承载智能消费街、数据对账台与国际路演客厅 [data:geometry/land_use.geojson#LU-05-000]。实施依赖轨道站点一体化、路口工程与市政管线，风险为站点改造与消费场景审批。

![三处编组场索引与设计任务](assets/figures/key-areas.png)

## AI 创新生态、人才画像与 AI+ 场景

编组场最终为“人”服务，五类用户画像是场景设计的原点 [source:AGENT-TASKBOOK]：

| 用户画像 | 典型需求 | 空间响应 | 数据与隐私边界 |
| --- | --- | --- | --- |
| 开源开发者 | 发布、协作、测试、社区声誉 | 守车共创空间、信号楼、开源展示廊 | 不采集个人行为轨迹，活动只做聚合统计 |
| 初创团队 | 低成本办公、算力入口、验证场 | 始发站台、挂车编组坞、端侧算力驿站 | 算力与数据服务另行授权 |
| 头部企业/场景采购方 | 展示、商务、国际接待、采购 | 大钟寺路演客厅、到发场数据对账台 | 企业标识与案例须清权 |
| 周边居民 | 通勤、休闲、低扰动更新 | 主轨慢行、集结车厢消费街、社区服务 | 居民画像不用于商业推荐 |
| 高校师生/科研人员 | 成果转化、跨校协作、日常慢行 | 近校转化街、教育科研用地、主轨缝合 | 校园数据与成果需授权 |

本方案提供 **12 张 AI 场景卡**，其中 3 张为 AI 产业测试验证场景 [metric:scenario_card_count] [metric:ai_test_scenario_count]：

| 编号 | 场景卡 | 空间载体 | 类型 |
| --- | --- | --- | --- |
| SC-01 | 重载试车台：大模型重载评测与安全红队 | 众智园重载编组场西区 | 产业测试验证 |
| SC-02 | 折返测试线：AI服务可暂停、可回退、可复现 | 主轨北段折返观景台 | 产业测试验证 |
| SC-03 | 挂车编组坞：高校成果0-1集成测试 | 原点近校成果转化街 | 产业测试验证 |
| SC-04 | 始发站台：初创发车与路演 | 原点始发站台 | 生活/服务 |
| SC-05 | 信号楼·治理沙盒：AI治理信号展示与协作 | 众智园信号楼 | 治理/测试 |
| SC-06 | 到发场·数据对账台：数据要素合规对账 | 大钟寺到发场 | 生活/服务 |
| SC-07 | 集结车厢·智能消费街 | 大钟寺四象限 | 生活/服务 |
| SC-08 | 道岔驿站·AI慢行导航与无障碍 | 主轨沿线道岔节点 | 生活/服务 |
| SC-09 | 守车·夜间开发者共创 | 原点守车空间 | 生活/服务 |
| SC-10 | 编组广播·城市智能调度 | 总体范围交通节点 | 治理/服务 |
| SC-11 | 文化导览·朝圣专列 | 主轨文化导览线 | 文化/运营 |
| SC-12 | 运行图·年度编组大会 | 全带公共空间 | 文化/运营 |

每张场景卡都映射到空间图层与运营主体：公共空间场景落于公共空间与绿地图层 [data:geometry/public_space.geojson#PUBLIC-001] [data:geometry/green_space.geojson#GREEN-001]，交通场景落于道路图层 [data:geometry/roads.geojson#ROAD-001]，并明确服务对象、运行数据、隐私边界、人工复核与运营机制。所有测试验证场景均以“可预约、可监管、可退出”为原则，不把未成熟技术写成已全面部署，也不把测试场景写成已批准运营 [metric:scenario_card_count] [metric:persona_count]。

## 用地、建筑规模与拆改留方案

用地分类依据国土空间用地用海分类逻辑组织，形成完整、闭合、无缝的用地分区 [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE] [data:geometry/land_use.geojson#LU-0802-000]。总体比例按设计建议表达：科研与成果转化用地、商业服务业用地、住宅用地构成三大主体，公园绿地与防护绿地合计占比约三成，道路用地约一成四，配以文化、教育、医疗、社区服务与留白用地 [metric:green_ratio] [metric:land_use_area_05] [metric:land_use_area_0701]。

建筑方案以概念建筑基底表达“哪里承载创新”：AI研发与实验室基底集中于众智园与原点西区，商业服务基底集中于大钟寺与东翼节点，住宅与人才公寓基底沿东翼与轨道沿线组织 [data:geometry/buildings.geojson#BLDG-001] [metric:building_footprint_area_sqm]。建筑高度、体量、界面与风貌控制按 [depth:height_massing_character] 表达为设计层级建议；容积率、建筑密度、高度、退线与建筑控制线因缺少批准控规条件，一律列为待正式数据补齐 [depth:development_intensity_controls] [depth:retain_renovate_demolish]，不制造伪精确数值。

拆改留逻辑遵循“文化优先、权属优先、低扰动优先”：保留京张遗址公园、文保单位与历史肌理，改造低效产业与老旧空间，在允许范围引入新建场景界面，并为远期功能留白 [depth:retain_renovate_demolish] [depth:renewal_project_list]。现状建筑底数、权属、控规与工程条件缺失，全部列为待确认事项，正文不给出地块级拆改留结论。

## 交通、轨道、市政与公共服务设施

交通系统按“编组路网”组织：主轨为贯通南北的慢行与文化活动正线 [data:geometry/roads.geojson#ROAD-001] [metric:road_centerline_length_m]，次干路与支路构成到发集散网格，道岔节点解决慢行断点与轨道站点接驳 [depth:traffic_rail_slow_parking]。轨道一体化重点覆盖大钟寺站四象限、五道口、清华东路西口及重点企业周边；非机动车停放、无障碍路径与活动日交通组织作为设计建议写入图层与分期，不构成工程结论 [data:geometry/constraints.geojson#CON-RAIL-001]。

市政与公共服务按“新基建融入传统市政”表达：端侧算力驿站、分布式能源、AI场景用电与公共数据界面与道路、电力、排水等传统设施复合，服务半径与运营模式列为深化前置条件 [depth:municipal_new_infrastructure]。创新服务平台、人才生活服务、国际交往与公共治理服务沿主轨与三座编组场布置，覆盖人才通勤、生活与交往需求 [source:OFFICIAL-ANNOUNCEMENT]。缺少管线、能源、防洪、消防等工程资料时一律列为待补，不把策略写成审定条件。

![交通慢行与蓝绿公共空间复合系统](assets/figures/mobility-bluegreen.png)

## 蓝绿空间、公共空间与城市风貌

主轨遗址公园是蓝绿空间与城市风貌的骨架，清河与小月河构成东西生态界面，步道、骑行道与公共活动空间沿主轨连续贯通 [data:geometry/green_space.geojson#GREEN-001] [data:geometry/public_space.geojson#PUBLIC-001] [depth:blue_green_public_space]。绿地与公共空间比例支撑“创新交往”而非装饰：主轨公共界面承载散步、骑行、测试展示与活动 [metric:green_ratio] [metric:public_space_ratio]。

城市风貌融合百年京张铁路文化、中关村创新文化与 AI 新文化，提出三处 AI 朝圣地标与荣誉展示节点 [source:AGENT-TASKBOOK] [depth:height_massing_character]：

| 地标 | 位置 | 意义 |
| --- | --- | --- |
| 零公里里程碑 | 北京AI原点社区 | 编组起点与 AI 发展原点纪念，承接“从零发车”叙事 |
| 折返观景台 | 主轨北段（众智园界面） | 青龙桥之字折返线原型，让“试验可折返”可见 |
| 信号楼荣誉墙 | 主轨南段（大钟寺界面） | 智能体贡献荣誉墙、开源成果展示廊与里程碑记忆 |

风貌控制表达为“基调—界面—屋顶—公共艺术”四个层级，导视标识采用编组词汇体系（主轨/道岔/信号/里程），与一带 Logo 体系区分但同源 [standard:MOHURD-URBAN-DESIGN-MEASURES]。所有品牌、字体、图像、肖像与企业标识均须清权，地标均为概念建议，不写成已批准建设；文保与控规依据缺失时，不给出伪精确控制线 [depth:risk_missing_data]。

## 更新项目清单、实施政策与分期计划

本方案提出 8 项概念性更新项目，每项说明位置、类型、依赖条件与责任边界 [depth:renewal_project_list] [metric:renewal_project_count]：

| 编号 | 项目 | 类型 | 主要依赖 |
| --- | --- | --- | --- |
| JZ-01 | 主轨慢行断点缝合 | 公共空间/交通 | 道路红线、桥下空间、交通组织复核 |
| JZ-02 | 众智园重载编组场界面 | 产业/蓝绿 | 清河蓝线、防洪、算力条件 |
| JZ-03 | 原点始发站台与近校转化街 | 更新/产业服务 | 校区边界、权属、首层业态 |
| JZ-04 | 大钟寺到发场四象限连通 | 轨道一体化 | 站点改造、路口工程、市政管线 |
| JZ-05 | 信号楼·治理沙盒 | 新基建/治理 | 安全规程、评测标准、运营主体 |
| JZ-06 | 道岔驿站与AI场景节点 | 公共空间/新基建 | 能源、算力、安全、运营主体 |
| JZ-07 | 到发场·数据对账台 | 数据要素/治理 | 数据合规、授权与审计机制 |
| JZ-08 | 年度编组大会公共路线 | 运营/品牌 | 公共空间许可、活动安全、版权清权 |

实施分期对应三阶段：一期聚焦三座编组场与主轨咽喉 [data:geometry/phasing.geojson#PHASE-1-0] [metric:phase_1_area_sqm]，二期以路网与道岔织补连接腹地 [data:geometry/phasing.geojson#PHASE-2-0] [metric:phase_2_area_sqm]，三期推进两翼腹地更新 [data:geometry/phasing.geojson#PHASE-3-0] [metric:phase_3_area_sqm]。征集周期是提交成果的时间要求，实施分期是真实建设推进路径，二者不混用 [depth:phasing_implementation]。

面向全球的运营设计以“一张运行图”为机制：年度“京张编组大会”承担发布、颁奖与发车仪式，季度“发车仪式”见证新场景上线，月度“联调联试日”组织跨区测试，周度“道岔巡检”复核 AI 场景可回退状态 [source:AGENT-TASKBOOK]。开发者社区以“运行图开放项目”沉淀代码、数据与评测，场景开放运营以“可预约、可监管、可退出”为协议，公共体验路线即主轨朝圣专列，国际传播以信号语言与里程碑叙事输出。所有活动、招商、资金、政策与运营安排均为概念建议，不表述为已确定政府安排 [depth:phasing_implementation] [depth:risk_missing_data]。

## 指标体系、面积复算与合规矩阵

指标体系分三类表达：可由提交几何直接复算的空间指标，如总体范围面积 [metric:site_area_sqm]、绿地比例 [metric:green_ratio]、公共空间比例 [metric:public_space_ratio]、建筑基底面积 [metric:building_footprint_area_sqm]、路网长度、重点区面积与分期面积；需官方控规或附件支撑的管控指标，如容积率、建筑高度、建筑密度、退线与绿地率，现列为待正式数据补齐 [depth:metrics_recalculation]；需运营或产业数据持续校准的绩效指标，如 AI 创新指数、人才密度、活动参与度与场景使用频次，作为长期运营观测对象写入正文与运营章节 [source:AGENT-TASKBOOK]。

所有 known 指标均能在 EPSG:4548 下从提交 GeoJSON 复算，公式、来源文件、置信度与假设保存在 `metrics.json` [metric:land_use_area_1401] [depth:metrics_recalculation]。正文解释指标的设计含义：绿地比例支撑人才生活品质，公共空间比例支撑创新交往密度，建筑基底回应产业空间供给，主轨长度回应慢行与文化连续性 [metric:road_centerline_length_m] [metric:key_area_count]。

![核心指标复算与证据链](assets/figures/metrics-evidence.png)

合规矩阵 `compliance_matrix.json` 逐条覆盖公告 1.3、1.4、1.5 与 agent.1–agent.6 全部必答任务，专业标准矩阵 `standard_matrix.json` 覆盖全部强制标准，设计深度矩阵 `design_depth_matrix.json` 覆盖全部必需深度项 [depth:metrics_recalculation] [source:PROCESSED-FACT-PACK]。任一必答任务缺少章节、图层、指标、图纸或 HTML 证据即视为未完成；覆盖情况同时体现在正文、A3/A0、可视化页与自检结果中。

## 风险、版权与合规说明

本方案主要风险包括：provisional 边界与官方红线不一致导致面积与图层整体复算 [depth:risk_missing_data]；批准控规、道路红线、权属、市政与工程条件缺失使开发强度与拆改留保持待确认 [source:SOURCE-REGISTRY]；数据要素与场景运营涉及隐私、授权与人工复核，采用数据最小化与可解释原则 [source:AGENT-TASKBOOK]；文化地标与品牌涉及文保、商标、字体与肖像清权 [source:SITE-PACKAGE]。

版权与合规边界：全部资料来自公开或清权来源，AI 生成内容由作者对事实、引用、版权与最终表达负责；不采用未获授权或未公开的资料与个人隐私数据；不以概念建议冒充官方批准、审定控规、最终权属或保证实施 [depth:risk_missing_data] [data:geometry/constraints.geojson#CON-HERITAGE-001]。HTML 可视化与图纸均为离线静态展示，来源与假设说明见 `sources.json`、`assumptions.json`、`report/copyright_statement.md` 与本方案对应章节 [source:SITE-PACKAGE]。

## 参考资料

本方案的核心参考如下，完整机器索引见 `sources.json` 与三个矩阵文件：

1. 北京市规划和自然资源委员会海淀分局：《百年京张AI创新带城市设计国际方案征集资格预审公告》（2026-05-09）。
2. 面向全球智能体开展百年京张AI创新带城市设计开源征集任务书摘录（用户提供清权摘要，2026-05-18）。
3. 中华人民共和国住房和城乡建设部：《城市设计管理办法》。
4. 中华人民共和国住房和城乡建设部：《城市、镇控制性详细规划编制审批办法》。
5. 中华人民共和国自然资源部：《国土空间调查、规划、用途管制用地用海分类指南（试行）》。
6. 本项目 `brief/site-package/` 设计任务书、允许设计空间、枚举、指标区间与场地模式。
7. 本项目 `data/source_registry.json` 公开资料登记表与 `data/processed/agent_fact_pack.md` 事实包。
8. 仓库临时粗略边界 `brief/site-package/geometry/provisional_boundaries.geojson`（provisional-only）。

以上文献与资料用于形成本方案的设计判断、空间策略、指标口径与合规边界；其中边界类资料仅作 provisional 依据，待官方红线补齐后整体复算 [source:SITE-PACKAGE]。
