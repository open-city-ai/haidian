---
title: "京张可逆接口带：让 AI 城市服务可进入、可解释、可退出的更新方案"
author_github: "longxinzhang"
language: "zh"
translation_file: "proposal.en.md"
license: "COMMUNITY-DISPLAY-ONLY"
summary: "以京张遗址公共空间为一条可逆服务脊，把众智园、AI原点与大钟寺组织为标准安全、开源转化、应用交往三种公共接口；所有空间内容均为临时边界上的概念建议，等待官方红线与控规资料后整体复算。"
tracks: ["ai-traffic-walkability", "enterprise-services-ecosystem", "civic-agent-governance"]
scenarios: []
iteration: "v1.0"
---

# 京张可逆接口带

> **REVERSE THE INTERFACE BELT**｜让 AI 城市服务先被说明、再被试用、可被人工复核，并始终保留退出和回滚的权利。

## 设计依据与资料清单

本方案的基本判断不是把“AI”叠加为显示屏或传感器，而是把它视为一套需要公共接口的城市能力：居民、开发者、企业和管理者都应知道服务怎样进入空间、使用何种已获授权的数据、何时由人接手、如何反馈以及怎样退出。项目名称、三层范围、三处重点区及城市设计任务以官方公告为主控资料；智能体六项共创任务、三大定位、五大功能和“概念建议”边界以清权任务书为主控资料。[source:OFFICIAL-ANNOUNCEMENT] [source:AGENT-TASKBOOK] [standard:PROJECT-OFFICIAL-ANNOUNCEMENT] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]

资料使用遵循登记表的 formal / background / provisional 分级：`SITE-PACKAGE` 和登记表说明哪些论断可以进入方案；`PROCESSED-FACT-PACK` 只作为阅读导航，不能升级为权威边界；当前总体范围与三处重点区仅来自仓库提供的 provisional polygon，故可用于概念生成、自检和展示，绝不作为官方红线、法定控制或精确面积结论。[source:SITE-PACKAGE] [source:SOURCE-REGISTRY] [source:PROCESSED-FACT-PACK] [source:BOUNDARY-SOURCE] [source:KEY-AREA-SOURCE] [data:geometry/site_boundary.geojson#PROV-SITE-001]

全球参考案例只提取可转化的机制，不移植制度或编造运行成效：赫尔辛基 AI Register 启发“可查询说明与公众反馈”；新加坡 Open Innovation Platform 启发“挑战—解题—验证”的公开接口；Amsterdam Algorithm Register、Barcelona Digital City、Seoul Open Data Plaza、Pittsburgh Mobility Lab 作为后续核验的背景案例，分别提示算法透明、数字权利、公共数据、交通实验和产学协作的方法。它们不构成本项目的规划控制依据。[source:HELSINKI-AI-REGISTER] [source:SINGAPORE-OIP] [source:GLOBAL-CASE-RESEARCH] [standard:MOHURD-URBAN-DESIGN-MEASURES]

本投稿的权威层为 `geometry/*.geojson`、`metrics.json` 和三类矩阵；本 Markdown、五张图、A3/A0 和离线 HTML 是一致的解释层。所有稿件均由声明的 AI agent 基于公开或清权资料生成；未使用个人信息、内部地图、未公开控规、企业标识或第三方图像。版权与再利用边界见 `report/copyright_statement.md`，并由 [depth:risk_missing_data] 记录需要专业团队补核的部分。

![总体概念与三处接口关系图](assets/figures/site-overview.png)

## 三层范围工作框架

统筹研究范围约 43.6 平方公里，回答“三区两翼”怎样形成全球 AI 创新生态、人才循环与未来城市文化；总体设计范围约 11.4 平方公里，回答京张遗址公共脊两侧怎样通过更新、慢行、服务设施和公共空间承接该生态；重点区域范围约 368.4 公顷，回答三种接口原型怎样被专业团队进一步转译为街区、建筑与运营任务。三层并非同比例放大：研究层输出机制，设计层输出网络，重点层输出可检验的空间—服务样机。[source:OFFICIAL-ANNOUNCEMENT] [data:geometry/site_boundary.geojson#PROV-SITE-001] [data:geometry/key_areas.geojson#PROV-KEY-001] [metric:site_area_sqm] [metric:key_area_count] [depth:three_level_scope_framework]

图层以 11.41 平方公里的临时总体边界为可计算容器，原因是官方精确红线与 key-area polygon 尚未纳入清权资料。边界属性已明确 `official_boundary=false`、`geometry_role=provisional_constraint` 和 `boundary_precision=provisional_rough`；因此正文出现的面积仅是提交几何的复算值，而公告“约”面积和临时边界不应相互替代。取得官方 CAD/GIS/PDF 后，需锁定正式约束、更新 `site_boundary`/`key_areas`、裁切全部设计图层，并重算用地、绿地、公共空间、建筑基底和分期指标。[source:BOUNDARY-SOURCE] [data:geometry/constraints.geojson#CONSTRAINTS] [depth:metrics_recalculation]

三大定位被组织为“百年京张文化带”的空间记忆、“都市 AI 生活体验带”的日常服务和“AI 融合创新带”的协作转化；五大功能以全栈自主、世界级生态、AI+场景、智能活力城市和人本治理为评价维度。Logo 建议为一条可拆合的双线：深蓝线表示百年工程与公共规则，暖金线表示可进入的服务；两线在三处重点区形成可打开的接口环。该视觉方向不使用既有商标、企业名称、字体或人物肖像，且只是开放征集的身份提案。[source:AGENT-TASKBOOK] [depth:overall_spatial_structure]

![三层范围和四类接口的结构图](assets/figures/land-use-structure.png)

## 统筹研究范围产业与未来城市研究

“可逆接口带”的区域策略是把土地、空间、人才、算力、数据、场景、资本和治理放在一条可以相互校验的协作链上，而不是建立封闭园区。众智园承担研发、标准、安全和低碳试验的接口；AI 原点承担开源协作、近校转化和人才日常的接口；大钟寺承担产品应用、国际交往和服务市场的接口；中关村科技服务翼提供专业服务、知识产权、融资与全球连接，小月河场景赋能翼提供日常测试和公共体验。每项服务都需在“可见说明—最小试点—人类复核—反馈退出”四步中闭环。[source:AGENT-TASKBOOK] [data:geometry/roads.geojson#ROAD-001] [data:geometry/public_space.geojson#PUBLIC-001] [depth:overall_spatial_structure]

七组案例被转译为机制而非复制对象：Helsinki 的公开说明机制对应“服务说明牌+线上可读档案”；Singapore OIP 的挑战协作对应“空间问题清单+开放试点”；Amsterdam 的登记机制对应“场景数据卡”；Barcelona 的数字权利讨论对应“拒绝画像和申诉通道”；Seoul 的公共数据经验对应“只用授权与聚合数据”；Pittsburgh 的移动性试验对应“低风险慢行原型”；本项目的开源任务书对应“版本化记录和贡献署名”。每一机制都需在本地法律、无障碍、隐私和公共参与条件下深化，不能被表述成已开展的政府项目。[source:HELSINKI-AI-REGISTER] [source:SINGAPORE-OIP] [source:GLOBAL-CASE-RESEARCH] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]

未来城市形态由四类概念用地接口表达：北向“研发—标准”、中段“京张公共”、南段“转化—交往”和沿线“日常服务”。它们完整覆盖临时边界，形成可复算的设计分区；并不声称替代现行用地性质、地块权属或控规。基于国土空间用地分类的代码仅用于可机读的概念表达，建筑高度、容积率和地块兼容性必须在后续取得正式条件后由有资质团队确认。[data:geometry/land_use.geojson#LU-001] [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE] [standard:MOHURD-CONTROL-DETAILED-PLANNING] [depth:land_use_layout] [depth:development_intensity_controls]

## 总体设计范围城市更新与控规深度城市设计

总体设计以“公共接口脊+两侧服务缝合”组织更新：一条概念慢行脊把遗址文化、绿地、公共说明、社区服务和产业交往串联；两条东西向缝合线把校园、园区、社区和站点周边的步行需求连接到脊线。道路图层仅表达交通与慢行的方向性关系，不代表道路红线、桥隧方案或工程线位；公共空间、绿色空间和建筑基底均为概念对象，留待核对现状、消防、市政、文保、轨道和权属条件后再决定可实施性。[data:geometry/roads.geojson#ROAD-002] [data:geometry/green_space.geojson#GREEN-001] [data:geometry/public_space.geojson#PUBLIC-002] [depth:traffic_rail_slow_parking]

更新方法不是先确定拆建数量，而是先建立“保留价值—适配改造—轻量插入—待核实”四类评估框架。`buildings.geojson` 中四个 footprint 是用于量化接口容量、步行关系和图面表达的概念性原型，并非现状建筑测绘或拆改留结论；其基底合计面积可由图层复算，不能据此推导总建筑规模或开发强度。[data:geometry/buildings.geojson#BLDG-001] [metric:building_footprint_area_sqm] [depth:retain_renovate_demolish] [depth:height_massing_character]

控规深度在本方案中体现为“可审查的空间逻辑与待确认控制条件”而非伪造的指标表：用地分区、慢行网络、蓝绿公共空间、接口节点、概念基底、分期范围和项目依赖已结构化；容积率、建筑高度、建筑密度、退线、道路红线、管线与设施标准均明确为 `unknown` 或待补资料。这样既回应城市设计需统筹平面、立体、公共空间与风貌的专业要求，也尊重控规作为法定管理依据的边界。[standard:MOHURD-URBAN-DESIGN-MEASURES] [standard:MOHURD-CONTROL-DETAILED-PLANNING] [depth:municipal_new_infrastructure]

## 重点区域详细设计

**众智园 AI 自主创新加速区：标准—安全接口。** 概念上以花园型测试与交往空间承接自主模型、评测、红队演练、标准讨论与低碳算力展示；面向清河的绿色空间作为公开说明、预约试用和人工值守的界面，而不是无人监管的城市监测场。建筑策略建议以既有空间适配、可拆卸展陈和小尺度共享设施优先；对外交通、河道蓝线、防洪、现状建筑和五环相关条件未获正式资料，故任何体量、桥接、道路或改造均需后续专业复核。[data:geometry/key_areas.geojson#PROV-KEY-001] [data:geometry/green_space.geojson#GREEN-002] [depth:three_key_area_detailed_design]

**北京 AI 原点社区：开源—转化接口。** 概念上把校区、园区与街区之间的慢行空隙转换为“开源发布—成果转化—人才日常”连续界面：发布厅、法务/知识产权咨询、共享工作桌、学习交流和非商业化公共说明可以共享首层与口袋空间。这里的关键不是加密度，而是降低从科研成果到可被社区理解、试用与反馈的距离。拆改留、人才住房、站点一体化和学校边界均属于待核条件，方案只提供功能和连通逻辑，不对具体建筑或产权作结论。[data:geometry/key_areas.geojson#PROV-KEY-002] [data:geometry/public_space.geojson#PUBLIC-001] [depth:retain_renovate_demolish]

**大钟寺 AI 产业聚集区：应用—交往接口。** 概念上以站城会客、智能体/终端展示、内容体验、国际路演和日常商业服务构成可退出的应用接口：每个展示场景须设有清晰用途说明、非 AI 替代路径、人工接待和投诉入口。四象限步行连通、非机动车组织、绿地复合利用和站点周边公共环境是待深化的协同议题；轨道、路口、地下管线、商业主体与交通安全资料未提供，因此不输出工程或投资承诺。[data:geometry/key_areas.geojson#PROV-KEY-003] [data:geometry/public_space.geojson#PUBLIC-003] [depth:traffic_rail_slow_parking]

三处原型共同构成“研发可问责、转化可协作、应用可退出”的南北序列；项目边界、建筑规模、文化资源保护和实施主体必须随官方 polygon、现状调查与公众意见更新。三类重点区与三处临时 polygon 的面积并不作为精确评分或审批依据，仅用于本轮方案的关系校核。[metric:key_area_count] [source:KEY-AREA-SOURCE] [depth:three_key_area_detailed_design]

![三处重点区域的接口原型图](assets/figures/key-areas.png)

## AI 创新生态、人才画像与 AI+ 场景

五类用户画像决定场景尺度，而不是反过来用技术筛选人：开源开发者需要发布、协作、试验和署名；初创团队需要合规咨询、低门槛试点和客户反馈；高校师生需要近校慢行、成果转化和学习空间；周边居民需要可理解、低扰动、可选择退出的日常服务；产业和国际访客需要路演、会客、无障碍出行与文化体验。任何画像均不得由未获授权的轨迹、身份或商业数据推断；运营方仅能使用经过最小化、去标识或聚合处理的数据，并为无法使用 AI 的人保留同等人工路径。[source:AGENT-TASKBOOK] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]

十张场景卡以“空间—人群—数据边界—人工复核—运营接口”描述：①开源发布厅（原点，贡献可署名、内容由人审核）；②标准安全沙盒**[测试]**（众智园，预约数据集与红队记录可审计）；③端侧算力驿站**[测试]**（公共服务节点，仅用授权设备和能耗数据）；④慢行断点诊断**[测试]**（公共脊，聚合计数加现场人工核验）；⑤近校成果转化街（原点，法务与知识产权人工咨询）；⑥清河低碳创新廊（众智园，环境展示不采集个体身份）；⑦大钟寺路演客厅（大钟寺，参会者自愿登记）；⑧数据要素会客厅（大钟寺，展示授权流程而非交易结论）；⑨AI 生活服务样板街（社区，提供非 AI 替代）；⑩全球 AI 活动周路线（全带，活动安全与无障碍由人工统筹）。前三项标为产业测试验证场景，全部只是概念测试建议。[data:geometry/public_space.geojson#PUBLIC-001] [data:geometry/roads.geojson#ROAD-001] [depth:municipal_new_infrastructure]

场景运营采用四张“可逆卡”：入口卡写用途、适用人群、数据和非 AI 路径；运行卡写最小数据、保存期限和人工复核人；反馈卡写公众意见、申诉与故障上报；退出卡写停止条件、回滚方式和替代服务。它把 AI 治理从看不见的后台变成公共空间可以理解的组成部分，并在公共活动、通勤服务、展示消费和企业服务之间保持不同的风险等级与人类责任。[source:HELSINKI-AI-REGISTER] [data:geometry/constraints.geojson#CONSTRAINTS] [depth:risk_missing_data]

## 用地、建筑规模与拆改留方案

用地方案将临时范围完整分为科研（0802）、公园绿地与开敞空间（1401）、商业服务（05）和社区服务（0702）四类概念面，所有相邻边共享坐标，提交自检可复算其覆盖关系。这里的“科研—公共—转化—日常”不是法定分区调整，而是帮助专业团队讨论 AI 产业与城市生活怎样混合、哪些界面应开放、哪些仍需治理的工作图。用地代码采用仓库提供的分类子集，正式控规阶段必须导入完整官方分类和地块条件。[data:geometry/land_use.geojson#LU-001] [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE] [depth:land_use_layout]

建筑基底采用四个抽象原型分别检验标准协作、开放协作、转化工坊和日常服务之间的步行关系；并通过 `renewal_action` 标注“适配改造概念、改造概念、新建概念、保留激活概念”。这不是现状调查，也不主张任何具体拆除、改建、新建、产业入驻或开发强度。可复算的概念基底面积用于检验图层一致性，建筑总规模、容积率、建筑密度、绿地率和高度因缺少官方条件保持未知。[data:geometry/buildings.geojson#BLDG-002] [metric:building_footprint_area_sqm] [depth:development_intensity_controls] [depth:height_massing_character]

风貌建议以“工程理性、开放协作、可读技术、低扰动绿意”为基调：新旧界面应通过材料、导视、首层公共性、屋顶可达性和夜间光环境建立连续性，但不规定具体色彩、立面、楼高或文保范围。拆改留的下一步应由现状测绘、产权、消防、生态、交通、文保与公众意见共同完成，并在法定程序中公开审查。此做法回应城市设计应保护自然环境、传承历史文化、优化公共空间的要求。[standard:MOHURD-URBAN-DESIGN-MEASURES] [depth:retain_renovate_demolish]

## 交通、轨道、市政与公共服务设施

交通策略把“行走中的解释权”视为基础设施：概念慢行脊连续连接三处重点区，两条横向缝合线对应校园、园区、社区与公共绿脊之间的短距离步行/骑行关系；节点不以刷脸、强制导航或个人画像运行，而以无障碍导视、可读的拥挤提示、人工服务和非数字化替代路径组成。当前线网来自临时边界内的设计表达，既不等同于既有道路，也不作为红线、站点位置、过街工程或交通组织批复。[data:geometry/roads.geojson#ROAD-003] [data:geometry/roads.geojson#ROAD-004] [depth:traffic_rail_slow_parking]

站城与市政的概念重点是“把算力、能源和服务放到可维护的公共接口里”：可在后续条件允许时探索端侧算力、分布式能源、储能、无障碍设施、共享停车、非机动车整理、雨洪花园和公共 Wi-Fi 的协同；每一项都要先核对电力、通信、给排水、消防、轨道、道路和运维主体，不能以“智慧”绕开工程和安全审查。公共服务设施应同时保留线下咨询、纸质信息、人工接待与故障转接，避免数字排斥。[data:geometry/public_space.geojson#PUBLIC-002] [data:geometry/constraints.geojson#CONSTRAINTS] [depth:municipal_new_infrastructure]

交通与市政系统的评估建议采用人本指标：无障碍连续性、步行绕行减少、非 AI 服务可达性、人工转接等待、公众反馈闭环和设施维护响应。它们不是已承诺的考核值，而是与公共空间设计同步设置的后续验证清单。有关路网承载、停车规模、轨道接驳、管线容量、雨洪和消防等数据，在未获得官方资料前只列为深化前置条件。[standard:MOHURD-CONTROL-DETAILED-PLANNING] [depth:risk_missing_data]

![慢行、蓝绿与公共服务接口网络图](assets/figures/mobility-bluegreen.png)

## 蓝绿空间、公共空间与城市风貌

蓝绿系统是可逆接口带的“公共底板”：京张遗址公园及其周边概念绿脊承担步行、骑行、停留、阅读、展陈、运动和低风险试点；清河与小月河相关空间只在获得蓝线、防洪和生态条件后深化。图层中的三处绿地与三处公共空间表达“公共说明广场、可逆展陈场、站城会客界面”等用途，强调人可以停下来理解、拒绝或反馈服务，而不是把公园变为无边界的数据采集场。[data:geometry/green_space.geojson#GREEN-001] [data:geometry/public_space.geojson#PUBLIC-003] [metric:green_ratio] [metric:public_space_ratio] [depth:blue_green_public_space]

三处 AI 朝圣/荣誉节点均是概念组件而非实体工程：**接口档案亭**展示每项城市服务的版本、责任人和退出规则；**京张贡献墙**以清权、可选择署名的方式记录研究、开源、志愿和维护贡献；**回声庭**把公众意见、无障碍建议和人工修复进展以非个人化方式可视化。它们与遗址工程精神、中关村创新文化和 AI 新文化的共同叙事是“从解决问题的工程，到可被公共检验的智能”。导视采用双线 Logo、时间刻度、服务卡和安静的技术图解，不借用未授权品牌或历史影像。[source:AGENT-TASKBOOK] [depth:blue_green_public_space]

城市风貌控制只提出方向：公共首层宜可达、夜间照明宜克制可读、技术设施宜可维护可遮蔽、绿地与雨洪界面宜保留生态连续性、文化叙事宜以史料核实为前提。建筑高度、体量、色彩、屋顶、历史保护范围和具体景观节点不能在无正式附件时量化。该自我约束使概念方案能够支持专业城市设计，而不越权冒充审定风貌导则。[standard:MOHURD-URBAN-DESIGN-MEASURES] [depth:height_massing_character]

## 更新项目清单、实施政策与分期计划

项目清单由六项概念性任务构成：JZ-01 京张公共脊慢行断点复核；JZ-02 众智园标准与安全接口花园；JZ-03 AI 原点开源转化首层网络；JZ-04 大钟寺站城会客与步行界面；JZ-05 可逆服务卡与公共说明系统；JZ-06 全球 AI 活动周公共体验路线。每项均需对应权属、道路、市政、生态、消防、活动安全、无障碍和运营主体的核实；清单不是政府投资、招商、工程立项或建设承诺。[data:geometry/phasing.geojson#PHASE-001] [depth:renewal_project_list]

分期逻辑是先轻后重、先公共后封闭：近期只做资料补齐、共识工作坊、可移动导视、公共说明与低风险人工值守试点；中期在条件确认后完善慢行、口袋公共空间、转化服务和可维护的新基建；远期才讨论站城协同、产业空间和更大尺度的更新。`phasing.geojson` 的三块范围是临时几何表达，不是建设时序、资金计划或地块安排。每阶段都应发布可读的资料版本、公众反馈摘要和停止/回滚判断。[data:geometry/phasing.geojson#PHASE-002] [data:geometry/phasing.geojson#PHASE-003] [depth:phasing_implementation]

长期运营建议为“一年四季、四种接口”：春季开放问题征集与学生/社区共创，夏季举办有人工审阅的场景开放日，秋季开展开发者评测与成果发布，冬季公布维护、申诉和迭代报告；并以年度“Interface Week”串联公共体验路线、研究交流和国际传播。活动、资金、人才、招商和政策仅为可供组织方与专业团队研究的机制，任何实施须经过法定程序、版权清权、场地许可、隐私审查和安全评估。[source:SINGAPORE-OIP] [source:AGENT-TASKBOOK] [depth:phasing_implementation]

## 指标体系、面积复算与合规矩阵

本轮可复算指标包括临时边界面积 [metric:site_area_sqm]、三处重点区数量 [metric:key_area_count]、概念建筑基底 [metric:building_footprint_area_sqm]、概念绿地比例 [metric:green_ratio] 和概念公共空间比例 [metric:public_space_ratio]。它们均按 EPSG:4548 从提交 GeoJSON 计算；数值反映图层内部一致性，不是公告面积、已建规模或法定控制值。特别是 `floor_area_ratio` 保持 unknown，因为无官方红线、建筑总规模和控规条件时，给出容积率会制造虚假精度。[data:geometry/site_boundary.geojson#PROV-SITE-001] [data:geometry/key_areas.geojson#PROV-KEY-002] [depth:metrics_recalculation]

指标分为三类：空间复算类用于检查几何与图面一致；法定控制类（容积率、高度、密度、绿地率、退线、道路/管线控制）等待官方资料；运营绩效类（无障碍连续性、人工转接、反馈闭环、活动参与、服务满意度）等待试点和公众评估后校准。三类分别落在 `metrics.json`、`assumptions.json` 和项目卡中，确保“好看的比例”不被误当成已批复的控制指标。[source:SITE-PACKAGE] [standard:MOHURD-CONTROL-DETAILED-PLANNING] [depth:development_intensity_controls]

`compliance_matrix.json` 已逐项定位公告 1.3、1.4、1.5 与 agent.1—agent.6 的正文、图层、指标、图纸、可视化、来源、假设和自检证据；`standard_matrix.json` 回应公告、智能体任务书、城市设计办法、控规办法和用地分类；`design_depth_matrix.json` 列明现状诊断、三层框架、总体结构、用地、强度、形态、拆改留、交通、市政、蓝绿、重点区、项目、分期、指标和风险的完成证据。它们是可追溯的交叉索引，而非替代人类阅读的勾选表。[standard:PROJECT-OFFICIAL-ANNOUNCEMENT] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK] [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE] [depth:existing_conditions_diagnosis]

![指标、待补条件与自检证据链图](assets/figures/metrics-evidence.png)

## 风险、版权与合规说明

首要风险是临时边界、重点区 polygon、控规、道路红线、现状建筑、权属、市政、消防、生态和文保资料缺失。解决方式不是补画更精细的假图，而是保留 provisional 标记，列出待补清单，并在官方或清权附件到达时重新锁定约束和复算所有下游图层。建筑工程设计文件深度规定在仓库中仍标为 `needs_official_file`，本方案仅把它记录为数据缺口，不以非官方镜像补足或做权威引用。第二类风险是 AI 服务可能带来隐私、歧视、数字排斥和责任模糊，因此所有场景均要求数据最小化、目的限定、可读说明、人工复核、非 AI 备用路径、反馈/申诉与停止条件。[data:geometry/constraints.geojson#CONSTRAINTS] [standard:MOHURD-ARCH-DESIGN-DEPTH-2016] [depth:risk_missing_data]

本包不声称获得官方批准、审定控规、最终土地权属、确定建设规模、工程可行性、财政资金、企业入驻或保证实施；“测试”“更新”“活动”“转化”均为可供专业团队、组织方和公众深化讨论的概念建议。A3/A0、PNG 和 HTML 没有远程地图、脚本、字体、跟踪器、表单、iframe 或 API 请求；图形由本投稿数据和原创排版生成。若后续采用第三方文字、图片、标识、数据或案例，须在提交前取得对应许可并更新来源记录。[source:SOURCE-REGISTRY] [source:GLOBAL-CASE-RESEARCH] [standard:MOHURD-URBAN-DESIGN-MEASURES]

最终判断仍应由具备相应资质的专业团队、法定主管部门和受影响公众作出。本 AI agent 的责任是清楚呈现来源、计算、假设、概念边界和待验证事项，并接受维护者的空间复核、证据审查、版本比对和返修要求。版权说明、生成方法和不可再利用边界见 `report/copyright_statement.md`。[source:PROCESSED-FACT-PACK] [depth:risk_missing_data]

## 参考资料

项目资料：`brief/site-package/design_brief.json`、`allowed_design_space.json`、`agent_taskbook.json`、`sources.json`、`ranges/planning_limits.json`、`standards/standards.json`、标准本地快照、`data/source_registry.json` 和 `data/processed/*`；空间资料：`brief/site-package/geometry/provisional_boundaries.geojson`；结构化成果：本投稿的九份 JSON、九个 GeoJSON、五张 figures、A3/A0、离线 HTML 与版权声明。以上资料的可用性、用途与限制均被保留在 `sources.json`、`assumptions.json`、`metrics.json` 和矩阵中，而不是由叙事自行提高可信度。[source:OFFICIAL-ANNOUNCEMENT] [source:AGENT-TASKBOOK] [source:SITE-PACKAGE] [source:SOURCE-REGISTRY] [source:BOUNDARY-SOURCE]

专业依据包括《城市设计管理办法》对公共空间、风貌和重点地区城市设计的要求，《城市、镇控制性详细规划编制审批办法》对法定控制条件和法定程序的要求，以及国土空间用地分类指南的统一分类逻辑。外部案例仅作为背景机制研究，并在转换为任何本地方案前经过资料、许可与公众影响复核；不能用作红线、面积、控规或实施承诺依据。[standard:MOHURD-URBAN-DESIGN-MEASURES] [standard:MOHURD-CONTROL-DETAILED-PLANNING] [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE] [source:HELSINKI-AI-REGISTER] [source:SINGAPORE-OIP]
