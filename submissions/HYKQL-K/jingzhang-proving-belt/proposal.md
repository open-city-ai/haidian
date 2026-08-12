---
title: "京张智带 · 城市验证长廊"
author_github: "HYKQL-K"
language: "zh"
proposal_format_version: "2"
bilingual_contract_version: "1"
translation_file: "proposal.en.md"
license: "COMMUNITY-DISPLAY-ONLY"
summary: "把百年京张AI创新带设计成一条持续运转、可被公众审计的城市验证长廊。方案提出可复制的最小单位——验证单元，由空间载体、验证协议、公示看板和退出机制四件套构成，沿京张遗址公园形成九段五带的空间骨架，串联众智园、AI原点社区、大钟寺三区，并由中关村科技服务翼与小月河场景赋能翼供给资源和需求。核心机制是提案、验证、公示、转化的闭环，并配套三条硬约束：失败必须公示、人工兜底路径不得更慢更贵、默认不参与。方案在主办方临时粗略范围上完成拓扑无缝的用地分区、指标复算和分期安排，官方精确红线公开后可整体复算。"
tracks: ["ai-traffic-walkability", "enterprise-services-ecosystem", "civic-agent-governance"]
scenarios: ["ai-traffic-walkability", "enterprise-service-copilot", "public-safety-operations-review", "ai-cultural-guide", "ai-health-service-navigation", "robot-delivery-low-speed"]
---

# 京张智带 · 城市验证长廊

## 设计依据与资料清单

本方案的第一依据是北京市规划和自然资源委员会海淀分局发布的《百年京张AI创新带城市设计国际方案征集资格预审公告》，它确定了三层范围、三处重点区域、设计深度和成果语境 [standard:PROJECT-OFFICIAL-ANNOUNCEMENT]。第二依据是用户清权的面向全球智能体开源征集任务书摘录，它补充了三大定位、五大功能、三区两翼、六项任务和统一边界条款 [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]。设计深度按城市设计管理办法和控规编制审批办法把握 [standard:MOHURD-URBAN-DESIGN-MEASURES]，用地分类严格采用国土空间用地用海分类指南的代码体系，不自造分类 [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE]。

资料的可用边界被显式区分为四类：可用于正式成果、仅作背景、仅作临时替代、需要补充核验。方案登记的全部来源保存在 `sources.json`，标准覆盖保存在 `standard_matrix.json`，本节只把最关键的依据放在判断旁边 [source:OFFICIAL-ANNOUNCEMENT] [source:AGENT-TASKBOOK]。资料登记表的用途边界由仓库统一维护 [source:SOURCE-REGISTRY]，导航层不构成新的权威来源 [source:PROCESSED-FACT-PACK]。

必须在开篇讲清楚的一件事是：**本方案没有取得官方精确红线**。公告给出了三层范围的面积和文字四至，但没有附边界图或 GIS 数据；因此方案使用主办方登记的临时粗略 polygon 作为工作范围 [source:BOUNDARY-SOURCE]，全部要素标注为 `official_boundary=false` 与 `geometry_role=provisional_constraint`。这些几何只承担生成、展示和讨论的占位作用，不表达道路红线、地块权属或审批结论 [data:geometry/site_boundary.geojson#SITE-001]。范围面积以 EPSG:4548 复算并与公告约数核对 [metric:site_area_sqm]。

![证据链与提交包关系总览图，展示公告、任务书、标准、临时边界与本提交包各文件之间的引用关系](assets/figures/site-overview.png)

同样必须讲清楚的是，公开渠道目前没有本项目经批准的容积率、建筑高度、建筑密度、绿地率和退线控制值，五项官方控制指标全部缺失 [metric:official_planning_controls_available]。方案对此的处理不是回避，而是把这个缺口做成一个显式指标写进指标体系，并把所有受其影响的结论标注为待复算 [depth:risk_missing_data]。官方边界与控制条件公布后，需要重新生成全部图层、图纸、指标和电子展示成果，而不是只替换单个文件。

## 三层范围工作框架

公告确定的三个层次对应三种不同的工作方法，方案据此分层组织 [depth:three_level_scope_framework]。统筹研究范围约 43.6 平方公里，回答的是产业生态与未来城市形态问题，本方案在此层次只做研究性判断，不落空间方案，其临时范围作为上位背景原样引用 [data:geometry/constraints.geojson#PROV-RESEARCH-001]。

总体设计范围约 11.4 平方公里，是本方案的主战场，要求形成城市更新总体框架、产业空间布局、交通市政支撑和城市风貌控制，达到控规深度的城市设计 [standard:MOHURD-CONTROL-DETAILED-PLANNING]。方案在这一层次完成了拓扑无缝的用地分区、慢行骨架、蓝绿公共空间和分期安排 [depth:overall_spatial_structure]。

重点区域范围约 368.4 公顷，由众智园AI自主创新加速区、北京AI原点社区、大钟寺AI产业聚集区三处组成，自北向南排列 [data:geometry/key_areas.geojson#PROV-KEY-001]，其合并范围作为深度校核依据 [data:geometry/constraints.geojson#PROV-KEY-SCOPE-001]，数量与公告一致 [metric:key_area_count]。

| 层次 | 公告约面积 | 本方案工作深度 | 主要成果 |
| --- | ---: | --- | --- |
| 统筹研究范围 | 43.6 km² | 研究性判断，不落空间方案 | 产业生态与未来城市形态结论 |
| 总体设计范围 | 11.4 km² | 控规深度城市设计 | 用地分区、慢行骨架、蓝绿公共空间、分期 |
| 重点详细设计范围 | 368.4 ha | 详细设计 | 功能业态、建筑规模量级、拆改留、公共空间连通 |

三个层次之间不是简单的放大缩小关系。统筹层解决"为什么是这里"，总体层解决"骨架怎么搭"，重点层解决"第一块砖怎么砌"。方案把这条逻辑链固化为验证单元的三级投放规则：统筹层判断需求真伪，总体层确定投放位置，重点层确定建造标准。

## 统筹研究范围产业与未来城市研究

在 43.6 平方公里的统筹层面，方案的核心判断是：海淀不缺 AI 研发能力，缺的是**让 AI 在真实城市里被反复试错、被公开评判、被制度性采纳的通道** [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]。全球 AI 集聚区的通行做法是建园区、给补贴、办大会，这些海淀已经具备；真正的稀缺资源是可合法进入的真实场景、可承受失败的试错空间，以及能把验证结果转化为采购与标准的制度接口。

因此本方案不再增加一个"AI 主题园区"，而是提出把百年京张这条线性遗产廊道改造成一条**城市验证长廊**：它既是公共空间，也是一套持续运转的城市级验证基础设施。这一定位同时回应三大定位——百年京张文化带提供叙事与场所，都市AI生活体验带提供真实人群，AI融合创新带提供产业接口 [source:AGENT-TASKBOOK]。

从全球经验看，创新地区的竞争力来自三种能力的叠加：一是全栈自主创新体系的技术纵深，二是场景开放的制度成熟度，三是把失败沉淀为公共知识的能力。第三种能力在多数地区是缺失的，恰恰是本方案希望在京张沿线建立的差异化优势 [depth:existing_conditions_diagnosis]。方案不列举具体企业名单、投资额或产值预测，因为这些数据在公开渠道无法核验，虚构会直接损害方案的可信度。

未来城市形态方面，方案判断京张沿线将呈现"研发在带上、生活在带侧、验证在带中"的空间关系，AI 全栈自主创新体系的算力、模型、中试环节需要连续可控的空间，而不是分散的写字楼 [metric:research_and_development_land_area_sqm]。为此在众智园段设置留白用地承接尚不确定的算力与中试需求 [metric:reserved_land_area_sqm]。

## 总体设计范围城市更新与控规深度城市设计

总体设计范围的空间骨架是**九段五带** [depth:overall_spatial_structure]。纵向以京张遗址公园走廊为轴分为九段，自南向北依次是大钟寺南门户段、大钟寺AI产业聚集区核心段、北下关缝合衔接段、学院路科教衔接段、原点社区南接口段、北京AI原点社区核心段、小月河场景赋能段、众智园验证核心段、众智园中试与算力段。横向自西向东分为五带：中关村科技服务翼界面、西侧创新发展带、京张遗址公园验证主廊、东侧创新发展带、小月河场景赋能翼界面 [data:geometry/land_use.geojson#LU-001]。

这个骨架的关键在于中间那条验证主廊。它同时承担四重身份：连续公园绿地、南北慢行主线、低速自动驾驶与配送机器人的验证主线、以及公众可直接看到验证过程的展示界面 [data:geometry/roads.geojson#ROAD-001]，主线长度可复算 [metric:validation_spine_length_m]。

![用地分区结构图，九段五带的概念用地布局与三处重点区位置关系](assets/figures/land-use-structure.png)

城市更新方面，方案的总体策略是"以廊带面、以点促段"：先在三处重点区各建成一个验证单元，形成可见样板，再沿主廊向南北延伸，最后处理北下关与学院路两段更复杂的存量地区 [depth:phasing_implementation]。这一顺序把制度磨合成本前置在条件最成熟的地段，避免在权属复杂地区消耗启动期。

风貌控制上，方案建议建立"遗产为底、验证为形"的原则：铁路遗产要素以低干预方式保留，新建体量沿廊道两侧退让形成连续公共前庭，验证设施采用可拆卸、可更换的轻质构件，使长廊具备随技术迭代而更新的能力 [standard:MOHURD-URBAN-DESIGN-MEASURES]。建筑高度控制待官方指标公布后确认 [metric:max_building_height_m]。

## 重点区域详细设计

三处重点区不是三个同质园区，而是验证链条上的三个不同环节 [depth:three_key_area_detailed_design]。

**众智园AI自主创新加速区**（约 192.1 公顷，北段）承担全栈自主创新体系与中试验证 [data:geometry/key_areas.geojson#PROV-KEY-001]。方案在此布置研发用地与留白用地并置的结构：留白用地不预设功能，用于承接算力设施、中试线和尚未出现的新型设施，是方案应对技术不确定性的空间弹性安排。核心公共空间是众智园验证广场，配套算力开放日机制，让独立开发者和创业团队能够申请公共算力配额 [data:geometry/constraints.geojson#SCN-11]。

**北京AI原点社区**（约 104.3 公顷，中段）承担生活场景与公众参与 [data:geometry/key_areas.geojson#PROV-KEY-002]。这里布置人才居住、社区服务、文化展示和研发孵化的混合结构，核心是 AI 原点验证广场——公众提案与公示的物理场所 [data:geometry/constraints.geojson#SCN-06]。方案主张把公示做成实体空间而不只是网页：验证中的项目、已公示的结果、失败的记录，都在广场上有固定的展示位置。

**大钟寺AI产业聚集区**（约 72.0 公顷，南段）承担智能原生消费与交通接驳验证 [data:geometry/key_areas.geojson#PROV-KEY-003]。依托轨道站点条件布置智能原生消费街区和首末公里接驳验证 [data:geometry/constraints.geojson#SCN-02]，是三区中与日常城市生活联系最紧密的一段。

三处重点区共享同一套验证单元建造标准：每个单元必须包含一处不小于社区级的开放广场或廊段、一块公示看板、一条无障碍连续通行面、一个纯人工服务窗口。这套标准使验证单元可被复制到带外地区，也使评审者可以按统一口径核对建成质量。

## AI 创新生态、人才画像与 AI+ 场景

方案沿长廊布置 12 个 AI 场景节点，覆盖消费、交通、照护、科教、医疗、治理、文化、配送、健身与算力开放等方向 [metric:scenario_node_count]，其中 4 个为产业验证场景，需要行业主管部门与企业共同确认准入条件 [metric:industry_validation_scenario_count]。

| 场景节点 | 主要人群画像 | 数据边界要点 |
| --- | --- | --- |
| 大钟寺智能原生消费街区 | 通勤上班族、周边居民 | 仅统计匿名总量，不做人脸识别 [data:geometry/constraints.geojson#SCN-01] |
| 大钟寺站首末公里接驳 | 携大件行李旅客、行动不便者 | 车端脱敏，不发布可识别个人的原始影像 |
| 北下关社区AI照护站 | 独居老年人、照护者 | 居民主动授权，本地处理优先 |
| 学院路科教开放实验界面 | 高校学生、青年研究者 | 不接入个人学籍与成绩数据 |
| AI+健康验证院区 | 慢病患者、基层医生 | 医疗数据不出院区，仅公开脱敏效果指标 |
| AI原点验证广场 | 全体市民、提案人 | 提案以匿名编号公开，不公开提案人身份 |
| 原点人才社区智能生活 | 新就业青年、双职工家庭 | 不与就业单位共享居住与出行数据 |
| 京张文化AI导览 | 外地访客、国际访客、儿童 | 不采集人脸，会话结束即删除位置数据 |
| 小月河滨水机器人配送 | 骑手、商户、沿线居民 | 接管与避让失败事件必须公开 |
| 全民智能健身与无障碍出行 | 轮椅使用者、视障人士、老年人 | 不记录残障状态标签 |
| 众智园算力开放日 | 创业团队、独立开发者 | 配额分配结果公开，商业秘密不公开 |
| 众智园城市治理复盘 | 街道工作人员、应急人员 | 自动结论须人工复核后方可采纳 |

人才画像方面，方案识别出五类关键人群并给出空间回应：一是全栈研发人才，需要连续可控的研发与中试空间；二是创业者与独立开发者，需要低门槛的算力与场景准入；三是新就业青年，需要可负担的居住与通勤条件；四是原住居民与老年人，需要不被智能化排斥的日常服务；五是访客与国际同行，需要可理解的叙事与标识。

生态构建上，中关村科技服务翼作为供给侧，聚集企业服务、概念验证与成果转化资源 [data:geometry/constraints.geojson#AIZ-WING-W]；小月河场景赋能翼作为需求侧，提供生活服务、文化体验与滨水公共生活场景 [data:geometry/constraints.geojson#AIZ-WING-E]。两翼一带构成"资源—验证—需求"的完整回路，这是三区两翼在本方案中的具体含义。

## 用地、建筑规模与拆改留方案

用地分区采用国土空间用地用海分类指南的代码体系，共形成 45 个分区单元，构成对总体设计范围的无缝无叠剖分 [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE]。拓扑质量可被独立复核：分区合计面积与范围面积的残差远小于校验容差 [metric:land_use_partition_gap_sqm]，合计面积与范围面积一致 [metric:land_use_total_area_sqm]。

主要用地构成为科研用地、商业服务业用地、城镇住宅用地、城镇社区服务设施用地、公园绿地、防护绿地、广场用地、文化用地、教育用地、体育用地、医疗卫生用地与留白用地 [data:geometry/land_use.geojson#LU-001]。其中科研用地是产业空间的主体 [metric:research_and_development_land_area_sqm]，广场用地承载验证单元的公共界面 [metric:plaza_land_area_sqm]。

建筑规模必须谨慎表述。方案生成了 30 处示意建筑基底，基底总面积与覆盖率均可复算 [metric:building_footprint_area_sqm] [metric:site_coverage_ratio]。基于假定平均层数推算的建筑面积量级仅用于表达规模关系 [metric:assumed_gross_floor_area_sqm]。**这个数字不是容积率结论，也不构成建设规模承诺**——官方容积率控制缺失 [metric:floor_area_ratio]，任何用假定层数反推容积率的做法都是不成立的 [depth:development_intensity_controls]。建筑高度、体量与风貌的控制原则见总体设计章节 [depth:height_massing_character]。

拆改留分类方面，方案提出以验证价值而非建筑年代作为首要判据 [depth:retain_renovate_demolish]：铁路遗产要素与具备叙事价值的建构筑物一律保留；结构安全且可承载验证功能的存量建筑优先改造，改造后作为验证单元的室内载体；仅在确无保留与改造价值、且妨碍南北贯通或东西缝合的情况下才建议拆除。具体到单栋建筑的分类结论需要现场普查与权属核实后确定，本方案不做个案判定。

## 交通、轨道、市政与公共服务设施

慢行系统由一条主线、七处东西缝合连接和三处轨道接驳连接构成 [depth:traffic_rail_slow_parking]，全部为概念线位，不表达道路红线 [data:geometry/roads.geojson#ROAD-001]。主线沿验证主廊南北贯通 [metric:validation_spine_length_m]，全部提案线位总长可复算 [metric:total_proposed_centerline_length_m]。

东西缝合是本方案对公告"东西缝合、南北贯通"要求的直接回应 [metric:east_west_stitch_count]。铁路走廊长期形成的东西向阻隔，使两侧居民的实际步行距离远大于直线距离；方案在七处关键位置布设缝合连接 [metric:east_west_stitch_length_m]，每一处都必须配置无障碍坡道或垂直电梯，并保留不依赖手机的人工问询点。跨越方式采用地道、天桥还是平交，需要专业团队结合铁路运营与市政管线条件深化，本方案不预设结论。

轨道接驳方面，三处重点区各设一条接驳慢行连接，承载首末公里验证 [data:geometry/roads.geojson#ROAD-009]。接驳段的设计要求是连续无障碍通行面加实体标识，服务不得仅依赖扫码——这是方案的硬约束而非建议 [standard:BARRIER-FREE-ENVIRONMENT-LAW]。

市政与新型基础设施方面，验证长廊需要三类支撑：一是沿廊道的低时延通信与边缘算力节点，二是可承载机器人与低速车辆的连续硬质通行面与充换电点，三是公示看板所需的稳定供电与数据链路 [depth:municipal_new_infrastructure]。这些设施的具体容量、位置与管线路由必须以市政主管部门资料为准，公开渠道当前无法获取，方案明确将其列为待补充事项。公共服务设施按社区生活圈原则沿两翼布置，重点补充照护、健身与文化展示功能。

## 蓝绿空间、公共空间与城市风貌

蓝绿空间以京张遗址公园验证主廊为南北连续骨架，配合小月河滨水绿地与沿线防护绿带构成网络 [depth:blue_green_public_space]。绿地总量与绿地率可复算 [metric:green_space_area_sqm] [metric:green_ratio]，公共空间总量与占比同样可复算 [metric:public_space_area_sqm] [metric:public_space_ratio]。

![交通慢行与蓝绿公共空间结构图，展示验证主廊、东西缝合连接、轨道接驳与绿地网络](assets/figures/mobility-bluegreen.png)

公共空间由两类构成：一类是验证广场，位于三处重点区核心，是验证单元的主载体；另一类是贴廊公共前庭，即建筑退线与验证主廊之间的开放空间 [data:geometry/public_space.geojson#PUBLIC-001]。前庭的设计意图是让沿廊建筑的首层向公共空间开放，使验证过程可被路过的人看见——可见性是公众监督的前提。公共空间与建筑基底、绿地在几何上互不重叠，面积不重复计入 [data:geometry/green_space.geojson#GREEN-001]。

风貌方面，方案主张长廊呈现"可读的技术性"：不掩饰设备与设施，而是把传感器、机器人通道、公示看板作为可辨识的景观要素组织起来，同时用统一的材质与色彩控制避免视觉杂乱 [standard:MOHURD-URBAN-DESIGN-MEASURES]。京张铁路的历史要素以低干预方式保留并纳入叙事系统，形成从蒸汽时代到智能时代的连续阅读线索。标识系统采用中英双语加图形符号的三重编码，确保老年人、儿童、视障人士与国际访客都能理解。

## 更新项目清单、实施政策与分期计划

实施分三期推进，分期范围由用地分区单元聚合而成 [depth:renewal_project_list]。一期为 2026 至 2028 年，在大钟寺、AI原点社区、众智园三处重点区各建成一处验证广场与一段验证主廊样板段，跑通提案、验证、公示、转化的完整闭环 [data:geometry/phasing.geojson#PHASE-001]，一期范围面积与占比可复算 [metric:phase_1_area_sqm] [metric:phase_1_share_of_site]。

| 期次 | 时间 | 核心任务 | 可衡量指标 |
| --- | --- | --- | --- |
| 一期 | 2026—2028 | 三处验证单元建成，闭环跑通 | 建成验证单元 3 处；公示项目累计不少于 30 项；失败公示率 100% |
| 二期 | 2029—2031 | 南北贯通、东西缝合、两翼落地 | 主廊连续贯通；缝合连接建成 7 处；无障碍连续通行面全线覆盖 |
| 三期 | 2032—2035 | 全带缝合与运营转化 | 验证结果进入采购或标准的转化率可公开统计；运营主体实现常态化 |

实施政策的关键是三项制度设计 [depth:implementation_policy]。第一是**验证协议**：每个验证单元投放前必须签署一份公开协议，写明数据采集范围、保留期限、退出方式和责任主体，协议本身向公众公开。第二是**失败公示**：验证失败、暂停、接管事件必须与成功案例同等公示，不得选择性披露；这项制度是方案区别于常规示范区的核心，因为只有失败被记录，后来者才不必重复付费。第三是**转化通道**：验证结果需有明确的采纳路径，包括纳入政府采购目录、转为地方标准或团体标准、或形成公开的技术指引。

更新项目清单按"廊道段—验证单元—配套设施"三级组织，每个项目对应明确的空间范围、责任层级和验收标准。三期对应近期、中期、远期三个实施阶段，各阶段的参与主体分工建议为：政府部门与街道负责场景准入、公共空间移交和公示制度的行政保障；实施主体或运营团队负责验证单元的建设、日常运维与公示看板更新；企业与创业团队作为验证申请方投放技术并承担失败披露义务；高校与科研机构承担第三方评估；社区居民与使用者通过提案和反馈参与场景遴选与退出判断。各阶段的可衡量指标见上表，建议由实施主体按年度公开监测数据，指标口径与本方案 `metrics.json` 保持一致。清单的具体投资与主体安排需要在权属核实与资金渠道明确后由实施机构确定，本方案不做财政承诺或投资额估算。

## 指标体系、面积复算与合规矩阵

全部面积与长度在 EPSG:4548（CGCS2000 3度带，中央经线117°E）下计算，GeoJSON 交换坐标为 EPSG:4326，单位统一为米与平方米 [depth:metrics_recalculation]。指标体系共 25 项，每项均声明状态、数值、单位、来源文件、计算公式、置信度与假设。

![指标与证据关系图，展示核心指标的计算链路、数据来源与复算口径](assets/figures/metrics-evidence.png)

| 指标 | 数值 | 说明 |
| --- | ---: | --- |
| 总体设计范围面积 | 11 412 825 sqm | 临时范围复算值，与公告约 11.4 km² 一致 [metric:site_area_sqm] |
| 用地分区残差 | 83.7 sqm | 远小于容差，证明分区无缝 [metric:land_use_partition_gap_sqm] |
| 绿地率 | 0.294 | 由绿地图层复算 [metric:green_ratio] |
| 公共空间占比 | 0.114 | 与建筑、绿地不重叠 [metric:public_space_ratio] |
| 官方控制指标可得数 | 0 | 显式声明缺口 [metric:official_planning_controls_available] |

![重点区域详细设计图，三处重点区的功能组织、验证单元布局与公共空间关系](assets/figures/key-areas.png)

指标可分为三类：第一类是几何复算指标，可由 `geometry/` 中的图层独立重算，任何第三方使用同样的 CRS 都应得到相同结果；第二类是假设推导指标，如建筑面积量级，其可信度受假设约束，已在指标条目中标注 `caveat`；第三类是缺口声明指标，如官方控制指标可得数，其存在的意义正是让缺口可见 [depth:metrics_recalculation]。

合规矩阵在 `compliance_matrix.json` 中逐条映射公告的 17 项必选任务与开源征集的 6 项智能体任务，每条要求都关联到章节、图层、指标、图纸、可视化区块、来源与自检项 [standard:PROJECT-OFFICIAL-ANNOUNCEMENT]。标准覆盖与设计深度覆盖分别保存在 `standard_matrix.json` 与 `design_depth_matrix.json`，不在正文重复机器索引。

## 风险、版权与合规说明

**数据与边界风险**是首要风险 [depth:risk_missing_data]。本方案全部空间结论建立在临时粗略范围之上，官方精确红线公布后可能出现范围偏移，届时必须整体复算而非局部修补 [metric:site_area_sqm]。五项官方规划控制指标缺失，使强度与高度相关结论只能停留在量级判断 [metric:floor_area_ratio]。铁路运营条件、文物保护范围、市政管线与地块权属均未取得公开资料，东西缝合的跨越方式与拆改留的个案判定因此保留开放。

**隐私与数据合规风险**方面，方案的处理原则是三条硬约束：默认不参与，即居民无需操作即处于不被采集状态；本地处理优先，能在端侧或本地完成的处理不上传；最小留存，数据保留期限写入公开的验证协议。涉及生成式 AI 服务的场景须符合国家相关管理要求 [standard:GENERATIVE-AI-INTERIM-MEASURES]。所有自动化结论在进入治理决策前必须人工复核 [data:geometry/constraints.geojson#SCN-12]。

**包容性风险**是智能化地区最容易被忽视的风险。方案设定的红线是：每个场景都必须保留不依赖智能终端的人工办理路径，且人工路径不得更慢、更贵或需要额外往返 [standard:ELDERLY-SMART-TECH-PLAN-2020-45]。无障碍连续通行面是所有验证单元的强制配置，验证活动不得占用无障碍通行宽度 [standard:BARRIER-FREE-ENVIRONMENT-LAW]。

**表述边界与版权**方面，本方案的全部空间建议均为概念建议与参考方案，可供专业团队深化研究，不构成任何审批依据、权属结论或建设承诺 [source:AGENT-TASKBOOK]。方案只使用公开渠道可核验的资料与主办方登记的清权资料，未使用任何未经公开发布的受限材料，未使用个人隐私数据，未虚构企业名单、投资额、产值或财政承诺，未声称取得政府批准。图纸与电子展示成果均为本次生成的原创内容，采用社区展示授权，版权声明见 `report/copyright_statement.md`。

## 参考资料

本方案的依据分为四类，完整索引保存在结构化文件中，本节只列出主干 [source:SITE-PACKAGE]。

**官方公开资料**：北京市规划和自然资源委员会海淀分局《百年京张AI创新带城市设计国际方案征集资格预审公告》（2026年5月9日发布），是三层范围、三处重点区、设计任务与深度要求的主控依据 [standard:PROJECT-OFFICIAL-ANNOUNCEMENT]。

**清权任务书**：面向全球智能体开展开源征集的任务书摘录，提供三大定位、五大功能、三区两翼、六项任务与统一边界条款 [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]。

**国家标准与法规**：住房和城乡建设部《城市设计管理办法》与《城市、镇控制性详细规划编制审批办法》[standard:MOHURD-CONTROL-DETAILED-PLANNING]；自然资源部《国土空间调查、规划、用途管制用地用海分类指南》[standard:MNR-LAND-USE-CLASSIFICATION-GUIDE]；《中华人民共和国无障碍环境建设法》与国办发〔2020〕45号文《关于切实解决老年人运用智能技术困难实施方案》[standard:ELDERLY-SMART-TECH-PLAN-2020-45]；《生成式人工智能服务管理暂行办法》[standard:GENERATIVE-AI-INTERIM-MEASURES]。

**仓库登记资料**：临时粗略边界及其推定说明 [source:BOUNDARY-SOURCE]，三处重点区临时范围 [source:KEY-AREA-SOURCE]，资料可用性登记表 [source:SOURCE-REGISTRY]，以及阅读导航层 [source:PROCESSED-FACT-PACK]。全部来源的完整清单与用途边界见 `sources.json`，方案假设见 `assumptions.json`。
