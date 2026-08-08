---
title: "回环成带：京张百年线上的AI原生公共生活"
author_github: "ta1ended"
language: "zh"
translation_file: "proposal.en.md"
license: "COMMUNITY-DISPLAY-ONLY"
summary: "由 Codex Urban Design Agent 独立生成的、以公开资料和临时边界为基础的可验证概念城市设计包。"
tracks: ["ai-traffic-walkability", "enterprise-services-ecosystem", "civic-agent-governance"]
scenarios: ["ai-traffic-walkability", "enterprise-service-copilot", "public-safety-operations-review"]
iteration: "v0.1"
version: "0.1.0"
---

# 回环成带：京张百年线上的AI原生公共生活

> 独立 Agent 设计声明：本包由 Codex Urban Design Agent 生成；人类专业团队仍负责最终判断、法定审查和实施决策。
## 设计依据与资料清单

本方案由 Codex Urban Design Agent 独立完成，命题是“回环成带”：把百年京张的线性记忆转译为一条可步行、可验证、可退出的 AI 原生公共生活网络。它是公开资料边界内的概念性城市设计，不替代法定规划、工程设计或政府实施安排。设计证据从 `brief/site-package` 的公开任务书、范围描述、枚举和 schema 出发；所有临时 polygon 均显式标记为 provisional。公告文字可以支持项目名称、三层范围的叙事和任务响应，但不能把临时粗略边界升级为红线。

资料链为 [source:SITE-PACKAGE]、[source:SOURCE-REGISTRY]、[source:PROCESSED-FACT-PACK]、[source:OFFICIAL-ANNOUNCEMENT]、[source:AGENT-TASKBOOK]、[source:BOUNDARY-SOURCE]、[source:KEY-AREA-SOURCE]。其中 [source:BOUNDARY-SOURCE] 与 [source:KEY-AREA-SOURCE] 只用于生成、讨论、离线展示和 intake 自检；正式边界或重点区资料一旦公开，必须替换 [data:geometry/site_boundary.geojson#design]、[data:geometry/key_areas.geojson#design]、[data:geometry/land_use.geojson#design]、[data:geometry/buildings.geojson#design]、[data:geometry/roads.geojson#design]、[data:geometry/green_space.geojson#design]、[data:geometry/public_space.geojson#design]、[data:geometry/constraints.geojson#design]、[data:geometry/phasing.geojson#design] 并复算 [metric:site_area_sqm]、[metric:building_footprint_area_sqm]、[metric:green_space_area_sqm]、[metric:public_space_area_sqm]、[metric:public_node_count]、[metric:green_ratio]、[metric:public_space_ratio]、[metric:road_centerline_length_m]、[metric:building_count]、[metric:key_area_count]、[metric:scenario_card_count]、[metric:pilot_scenario_count]、[metric:persona_count]、[metric:global_case_count]、[metric:phase_count]。

本方案的设计方法是“先证据、后形式”：先登记来源和缺口，再生成空间层、指标、任务矩阵、图纸和离线页面；任何面积、数量和比例均不从叙事手填。

![总体空间与证据关系图](assets/figures/site-overview.png)

## 三层范围工作框架

统筹研究范围（公告文字约 43.6 平方公里）负责回答创新带为何存在、怎样形成产业与文化协同；总体设计范围（公告文字约 11.4 平方公里）负责回答京张遗址公园周边城市更新、交通、市政、蓝绿与风貌如何成网；重点区域范围（公告文字约 368.4 公顷）负责回答众智园、北京 AI 原点社区、大钟寺三处片区如何各自承担一个可运营的经济角色。三层不是三套互不相干的图纸，而是“策略—空间—节点”的同一条证据链。

统筹层以 [standard:PROJECT-OFFICIAL-ANNOUNCEMENT] 和 [depth:three_level_scope_framework] 为任务边界；总体层回到 [data:geometry/site_boundary.geojson#design]、[data:geometry/key_areas.geojson#design]、[data:geometry/land_use.geojson#design]、[data:geometry/buildings.geojson#design]、[data:geometry/roads.geojson#design]、[data:geometry/green_space.geojson#design]、[data:geometry/public_space.geojson#design]、[data:geometry/constraints.geojson#design]、[data:geometry/phasing.geojson#design]；重点层用 [data:geometry/key_areas.geojson#PROV-KEY-001]、[data:geometry/key_areas.geojson#PROV-KEY-002]、[data:geometry/key_areas.geojson#PROV-KEY-003] 表达三处片区。空间关系只作概念讨论，临时几何的精度限制写入 [source:BOUNDARY-SOURCE] 和 assumptions.json。

空间结构采用“一带、三核、两翼、五环”：一带是京张记忆与公共生活连续线；三核是验证工坊、原点客厅、服务街区；两翼是中关村科技服务翼与小月河场景赋能翼；五环是创新转化、人才日常、蓝绿慢行、文化叙事、数据治理五种循环。

![三层范围与用地结构图](assets/figures/land-use-structure.png)

## 统筹研究范围产业与未来城市研究

“回环成带”的经济逻辑不是新增一座孤立的科技园，而是缩短五个环节之间的距离：高校和开源社区提出问题，众智园提供测试与安全验证，北京 AI 原点社区提供人才生活和跨学科协作，大钟寺提供企业服务、智能终端和内容消费，京张遗址公园把成果转化为公众可理解的城市体验。由此形成“知识—原型—服务—公共价值”的循环。它可以支持咨询、活动、场景测试和城市运营等多种收入或公共价值来源，但不在本包中虚构投资额、产值、企业名单或政策承诺。

五大功能的空间翻译是：全栈自主创新对应众智园，世界级生态对应原点社区，AI+场景对应小月河和遗址公园，智能活力城市对应大钟寺公共生活，治理话语权对应公开评测与荣誉展示。三处片区与两翼之间通过“开放挑战—场景验证—企业服务—公众体验—国际传播”的协同回路连接。[source:AGENT-TASKBOOK] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK] [depth:overall_spatial_structure]

案例研究不直接照搬城市形式，而是建立六类待核验的公开案例观察：创新街区的混合用地、城市 living lab、数字孪生的透明边界、开发者社区运营、公共 AI 伦理登记、遗产与新技术共存。每类案例只提供方法启发，正式专业研究应补充原始出处和适用条件。品牌识别以“环、线、点、开口”为视觉语法：深蓝代表铁路记忆，青绿代表公共生活，橙色代表转化，珊瑚色代表人的选择权；不使用未经授权的企业标识。

## 全球 AI 创新生态案例：从观察到本地试验

本包以 [metric:global_case_count] 个具名、可回查的公开案例完成任务书要求的 5–8 个案例研究；完整结构化清单见 `visual/assets/global-ai-ecosystem-cases.json`。案例的作用不是替海淀寻找一个现成模板，而是把“生态”拆成可以进入一期试点验证的机制：试验如何被授权、研究如何转化、人才如何被服务、企业如何获得低成本验证、以及公共空间如何保留人类解释与退出权。

| 案例 | 已观察机制 | 本地转化动作 | 不可照搬 | 公开出处 |
|---|---|---|---|---|
| Punggol Digital District（新加坡） | 以数字孪生作为运行界面，把园区设施、企业、院校与日常运营放入同一套可迭代的测试框架。 | 在众智园先建立“场地责任人—试验协议—数据说明—退出复盘”的轻资产测试链。 | 不移植其开发规模、地块强度、企业名单、设备参数或投资安排。 | [source:CASE-PDD-JTC] |
| Smart Kalasatama（芬兰赫尔辛基） | 以城市部门、居民、企业和研究者共同参与的小规模试验，把新服务嵌入真实生活区并公开复盘。 | 把慢行断点诊断和公共服务原型限定为有基线、有人工复核、有停止条件的短周期试点。 | 不把其他城市的居民数据、治理规则、采购方式或试验结果视为海淀事实。 | [source:CASE-KALASATAMA-FVH] |
| Mila Ventures（加拿大蒙特利尔） | 将研究网络、创业支持、商业化辅导与资本对接放入连续服务，而不是只举办一次性路演。 | 在 AI 原点社区设置可复用的研究—原型—展示—服务转化界面，并以公开准入规则管理。 | 不承诺基金、企业投资、孵化名额或任何特定机构合作。 | [source:CASE-MILA-VENTURES] |
| Vector Institute ecosystem（加拿大多伦多） | 研究机构、人才培养、行业伙伴与公共部门围绕共享能力建设形成长期 AI 采用网络。 | 把人才训练、可信评测、企业服务和公共解释拆成可独立采购、可公开评估的服务模块。 | 不引用其合作伙伴、经费、模型能力或采用效果为本地承诺。 | [source:CASE-VECTOR-ECOSYSTEM] |
| NYC AI Nexus（美国纽约） | 将创业团队、企业需求、导师、试验与市场进入支持组织成长期可进入的服务节点。 | 在大钟寺把企业验证、场景展示、合规说明和活动路演组织为可计成本、可退出的服务包。 | 不把其他城市的政策、品牌、场地条件或企业生态直接套用到本地。 | [source:CASE-NYC-AI-NEXUS] |
| Seoul AI Hub（韩国首尔） | 通过专业空间、创业培育、人才支持和行业交流组织城市级 AI 创业服务入口。 | 为三处重点区建立统一的服务目录、预约入口、责任主体和年度复盘，而不是只增加展示空间。 | 不复制其组织架构、补贴政策、场地规模或招商承诺。 | [source:CASE-SEOUL-AI-HUB] |

六个案例共同对应本地八要素图谱：土地与空间提供可进入的界面，产业与人才提供真实问题，算力与数据只在获得授权后进入试验，场景提供可复盘的验证，资本与服务则以公开规则而非口头承诺连接。外部观察的原始出处为 [source:CASE-PDD-JTC]、[source:CASE-KALASATAMA-FVH]、[source:CASE-MILA-VENTURES]、[source:CASE-VECTOR-ECOSYSTEM]、[source:CASE-NYC-AI-NEXUS]、[source:CASE-SEOUL-AI-HUB]；它们仅用于方法研究，不能替代海淀的边界、权属、控规、投资、企业或实施依据。

![全球案例到本地八要素生态图谱](assets/figures/ecosystem-map.png)

## 总体设计范围城市更新与控规深度城市设计

总体设计范围的形态策略是“让转化过程可见”：用地层形成科研、遗产绿地、企业服务、人才生活、文化展示五种可互换的功能带；建筑层只提出保留、更新、轻量新建三类动作，不提供法定容积率、建筑高度、道路红线或工程规模。现状和权属资料缺失时，所有建筑基底都是设计提议，不暗示拆迁或产权调整。

[data:geometry/site_boundary.geojson#design]、[data:geometry/key_areas.geojson#design]、[data:geometry/land_use.geojson#design]、[data:geometry/buildings.geojson#design]、[data:geometry/roads.geojson#design]、[data:geometry/green_space.geojson#design]、[data:geometry/public_space.geojson#design]、[data:geometry/constraints.geojson#design]、[data:geometry/phasing.geojson#design] 共同表达“回环”的空间骨架。[standard:PROJECT-OFFICIAL-ANNOUNCEMENT]、[standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]、[standard:MOHURD-URBAN-DESIGN-MEASURES]、[standard:MOHURD-CONTROL-DETAILED-PLANNING]、[standard:MNR-LAND-USE-CLASSIFICATION-GUIDE]、[standard:MOHURD-ARCH-DESIGN-DEPTH-2016] 约束用地分类、城市设计、控规深度和建筑设计深度；[depth:land_use_layout]、[depth:development_intensity_controls]、[depth:height_massing_character] 要求将强度和高度写成“分级引导、待正式条件确认”，而不是伪精确数值。

更新项目采用三种可实施性级别：A 类是可逆公共空间与导视，依赖最少；B 类是既有建筑的低干预共享服务，依赖权属与消防确认；C 类是长期片区更新和基础设施深化，必须等待正式边界、控规、权属、市政和工程资料。每个项目先有证据门，再有设计门，再有专业审批门。

## 重点区域详细设计

众智园 AI 自主创新加速区是“验证工坊”：以低碳交往花园、开放评测广场、模型安全与标准展示、清河文化接口组成可重复测试的创新环境。重点不是再造封闭园区，而是让测试协议、场景结果和公众解释能够在同一条慢行线路上被看见。北京 AI 原点社区是“原点客厅”：以近校成果转化、人才日常、开源发布、共享学习和生活配套为核心，保留现状可用建筑，增加轻量公共服务界面。大钟寺 AI 产业聚集区是“服务街区”：以智能体企业服务、终端体验、数据要素说明、夜间公共客厅和站点四象限慢行连通形成城市型创新消费。

三处重点区均用 [data:geometry/key_areas.geojson#PROV-KEY-001]、[data:geometry/key_areas.geojson#PROV-KEY-002]、[data:geometry/key_areas.geojson#PROV-KEY-003] 标注为 provisional；[depth:three_key_area_detailed_design] 要求每处同时说明功能、建筑、拆改留、交通、公共空间和实施依赖。[data:geometry/site_boundary.geojson#design]、[data:geometry/key_areas.geojson#design]、[data:geometry/land_use.geojson#design]、[data:geometry/buildings.geojson#design]、[data:geometry/roads.geojson#design]、[data:geometry/green_space.geojson#design]、[data:geometry/public_space.geojson#design]、[data:geometry/constraints.geojson#design]、[data:geometry/phasing.geojson#design] 中的建筑、道路、公共空间和分期层提供相互可读的节点证据。

![三处重点区域与经济角色图](assets/figures/key-areas.png)

## AI 创新生态、人才画像与 AI+ 场景

本方案设置十张场景卡，且把每张卡写成“用户—空间—运营—边界”的最小单元。前三张产业测试验证场景分别检验城市交通诊断、模型与智能体安全评测、校企成果转化服务；它们只作为可申请、可撤回、可人工复核的概念测试，不视为已批准部署。

| 编号 | 场景 | 空间与运营入口 | 关键边界 |
|---|---|---|---|
| 01 | 开源发布厅 | 成果发布、模型评测、开发者交流 | 公开内容；不收集非必要身份信息 |
| 02 | 城市智能体沙盒 | 可逆测试、人工复核、退出机制 | 仅用授权测试数据；不直接做行政决定 |
| 03 | 慢行断点诊断 | 公开数据、人工核验、无障碍回路 | 诊断建议须由专业人员复核 |
| 04 | 人才生活管家 | 居住、学习、运动与日常服务 | 人工窗口兜底；不建立个人画像 |
| 05 | AI 安全治理廊 | 标准展示、可信评测、公众解释 | 公开评测方法；保留申诉和退出 |
| 06 | 校企转化客厅 | 近校创新、路演、原型服务 | 合作关系以协议和采购为准 |
| 07 | 数据要素剧场 | 终端、内容消费、数据说明 | 解释数据用途；不展示敏感数据 |
| 08 | 低碳算力驿站 | 端侧算力、能源与公共服务 | 设备容量和工程条件待核 |
| 09 | 京张记忆线路 | 铁路文脉、中关村与 AI 新文化 | 文保边界和史料由专业团队确认 |
| 10 | 全球 AI 活动周路线 | 开发者节、开放日、国际传播 | 活动需另行审批、招采和安全评估 |

五类用户画像是：高校研究者、初创团队成员、产业服务人员、附近居民与照护者、来访开发者/公众。每类画像均有不依赖识别个人的服务入口、可见的人工解释和退出机制；任何敏感数据只作最小化、短周期、经授权的测试材料。运营主体建议由专业团队、场地运营者和公众代表共同组成，Agent 只提供结构化建议。

AI 创新生态采用“资源不承诺、接口先开放”的策略：空间提供共享会议、原型展示、可逆测试、开放数据说明和公共反馈，不指定供应商、不编造投资支持。场景空间与运营矩阵写入 [source:AGENT-TASKBOOK]、[depth:municipal_new_infrastructure] 和 [depth:risk_missing_data]；十张场景卡、五类画像与三类测试场景的数量由 [metric:scenario_card_count]、[metric:persona_count]、[metric:pilot_scenario_count] 复核。

## 用地、建筑规模与拆改留方案

用地方案以五种功能带形成完整候选分区：科研用地承担策源与验证，公园绿地承担遗产与公共生活，商业服务承担转化与消费，居住与社区服务承担人才日常，文化用地承担传播与记忆。[data:geometry/land_use.geojson#LU-001] 通过垂直分带保持无缝无重叠的候选 partition；它是设计模型，不是规划许可。

建筑框架不追求一次性重建，而是把十二个概念基底分为现状保留、保留更新和轻量新建三类。现状保留优先承载文化、教育和公共服务；保留更新优先承载实验室、孵化器和企业服务；轻量新建只作为节点型公共接口。高度、退线、容积率、地下空间和消防均保留为待正式条件确认项，[metric:floor_area_ratio] 为 unknown。

建筑基底面积 321,264.6 平方米、建筑数量 11 个只代表本次设计图层的复算结果，见 [metric:building_footprint_area_sqm]、[metric:building_count] 和 [data:geometry/buildings.geojson#BLDG-001]；不代表现状测绘或开发规模。拆改留清单先按动作级别表达，任何地块级决定必须等待权属、文保和工程资料。

## 交通、轨道、市政与公共服务设施

交通策略是“先接驳、再微循环、最后讨论工程”：把既有轨道站点和三处重点区用接驳线、连续步行缝、自行车廊与绿道复合环连接；把园区内部车辆从公共生活主线上退后，把交付、共享停车和无障碍接送集中到可管理的边缘节点。道路中心线是 [data:geometry/roads.geojson#ROAD-001] 等概念线，不替代道路红线、断面或交通组织设计。

市政与新型基础设施采用“可解释、可退出”的节点策略：低碳算力驿站、分布式能源接口、雨洪调蓄、公共 Wi-Fi 与数据说明牌可作为研究方向；不把任何供应商、算力指标、管线容量或工程方案写成既定事实。公共服务优先覆盖人才、居民、老年人、儿童和来访者的日常需求，服务可由人工窗口兜底。

道路中心线总长 29,207.2 米是本包几何的测量值 [metric:road_centerline_length_m]；正式交通评价还需流量、站点、无障碍和消防资料。[standard:PROJECT-OFFICIAL-ANNOUNCEMENT]、[standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]、[standard:MOHURD-URBAN-DESIGN-MEASURES]、[standard:MOHURD-CONTROL-DETAILED-PLANNING]、[standard:MNR-LAND-USE-CLASSIFICATION-GUIDE]、[standard:MOHURD-ARCH-DESIGN-DEPTH-2016] [depth:traffic_rail_slow_parking] 只用于说明工作深度，不构成工程结论。

![交通、蓝绿与公共节点图](assets/figures/mobility-bluegreen.png)

## 蓝绿空间、公共空间与城市风貌

蓝绿系统是回环的公共底盘，不是装饰带。四条设计绿廊分别承担京张遗产连续叙事、小月河场景赋能、众智园低碳交往和大钟寺日常共享；三个公共节点分别承担开放评测、人才生活和城市服务。绿地与公共空间之间通过可见的导视、座椅、遮阴、夜间安全和无障碍连续性组织，避免把“AI”变成只在室内发生的技术展览。

本次图层复算绿地面积 1,703,424.1 平方米、绿地比例 0.1493，[metric:green_space_area_sqm]、[metric:green_ratio]、[data:geometry/green_space.geojson#GREEN-001] 可回查；公共空间面积 174,923.4 平方米、比例 0.0153，见 [metric:public_space_area_sqm]、[metric:public_space_ratio]、[data:geometry/public_space.geojson#PUBLIC-001]。这些比例不是法定绿地率或公共服务标准。

城市风貌用“旧线性、开放性、可读性、克制的技术感”四个词控制。Logo 方向为一条断续的铁路线与开放环叠合，导视以“环—点—门”三级层级组织；三处 AI 朝圣地标是京张记忆环门、原点开源塔、可验证街角剧场，均是概念节点，不侵犯文保、绿地或交通控制。

## 更新项目清单、实施政策与分期计划

项目清单按“证据门—设计门—专业门”推进。A1 京张记忆步行缝、A2 三核接驳与无障碍补链、A3 开放评测广场属于可逆公共界面；B1 众智园验证工坊、B2 原点社区共享客厅、B3 大钟寺可验证街角属于既有建筑低干预更新；C1 蓝绿系统连通、C2 市政与新型基础设施深化、C3 片区综合更新属于长期研究。每个项目都需要明确负责人、来源、前置条件、公众反馈和退出方式。

分期为三段：一期先做公开导视、可逆活动、慢行断点诊断和三个小尺度测试；二期把三核与两翼接入连续公共生活，形成开发者社区、人才服务和企业服务的日常回路；三期在正式边界、控规、权属、交通、市政和文保资料齐全后，交由专业团队深化。分期图层见 [data:geometry/phasing.geojson#PHASE-001] 和 [depth:phasing_implementation]。任何活动、招商、政策和资金安排均为参考机制，不是确定承诺。

经济评价采用可量化的过程指标：公开测试场景数量、复用的公共节点数量、参与者反馈闭环、企业/高校接口是否形成，以及每一阶段是否能在不增加不可逆建设的前提下产生学习。它把城市设计的经济效益从一次性形象投资转成持续的转化能力。

## 可采用性审查与第一期 90 天试点

 本版本不请求人类直接批准一套总规或建设方案，只请求一个更小、更可逆的决策：是否允许在明确的节点和责任边界内做三项轻资产测试。把“先试、可量化、可退出”作为采用入口，可以让真实管理者用一次小决策判断方案是否值得继续，而不必先接受全部空间叙事。

一期执行表如下，全部动作均需在正式或清权资料确认后由专业与运营团队落地；本包的 [data:geometry/phasing.geojson#PHASE-001] 只表达概念分期。[depth:existing_conditions_diagnosis]、[depth:three_level_scope_framework]、[depth:overall_spatial_structure]、[depth:land_use_layout]、[depth:development_intensity_controls]、[depth:height_massing_character]、[depth:retain_renovate_demolish]、[depth:traffic_rail_slow_parking]、[depth:municipal_new_infrastructure]、[depth:blue_green_public_space]、[depth:three_key_area_detailed_design]、[depth:renewal_project_list]、[depth:phasing_implementation]、[depth:metrics_recalculation]、[depth:risk_missing_data] 中的 [depth:phasing_implementation]、[depth:risk_missing_data] 约束证据门和停止条件。

| 阶段 | 名称 | 时间 | 交付物 | 进入下一步的门槛 |
|---|---|---|---|---|
| P1 | 证据对齐与基线 | 第 1–30 天 | 边界替换包、步行与公共空间基线、责任人清单、数据与版权登记。 | 任何一项关键筛查缺失，都不进入现场 AI 服务测试。 |
| P2 | 三项轻资产测试 | 第 31–60 天 | 运行日志、匿名反馈、人工复核记录、退出演练、单位成本台账。 | 三项测试都要有基线、人工复核和退出记录，且不得留下未处置的安全或隐私事件。 |
| P3 | 复盘与扩展决策 | 第 61–90 天 | 公开复盘包、问题清单、可复用组件、下一期条件和停止建议。 | 只有证据支持的组件才能进入下一期；长期建设必须另行取得正式规划和工程条件。 |

采用纪律：一期不新增不可逆建筑，不采集非必要个人身份数据，不把模型输出当作行政或工程结论；每次测试都必须有人工兜底、公开说明、反馈入口和退出方式。[source:AGENT-TASKBOOK] [depth:risk_missing_data]

## 经济效益路径与资金纪律

 经济效益在本方案中不等同于虚构产值，而是回答“谁为哪项可验收的服务付费、公共部门减少了什么重复成本、哪些资产可以被下一次复用”。下面四条是待合同、招采和现场报价验证的价值假设，不是收入承诺、投资测算或政府支持结论。

| 价值路径 | 可能付费方 | 可交付服务 | 可验证价值 |
|---|---|---|---|
| 公共服务采购 | 公共部门或授权运营主体 | 可解释的慢行诊断、公共空间运营和 AI 场景评测 | 把一次性研究转成可验收的服务包，减少重复调研 |
| 企业验证服务 | 企业、科研团队或联合实验室 | 短周期场景测试、人工复核、标准说明和结果展示 | 让企业先用小成本验证，再决定是否扩大投入 |
| 活动与空间运营 | 活动主办方、场地使用方和合作机构 | 开发者活动、开放日、路演和公共展陈的组合运营 | 用可复用节点形成持续客流和合作接口，而非一次性地标投资 |
| 开放资产复用 | 公共生态共同承担 | 公开协议、组件库、匿名化反馈模板和复盘资料 | 降低后续项目重新设计、采购和解释的成本 |

资金纪律分三层：第一期先用现有场地、短期设备和可撤回导视，金额以询价和采购规则为准；第二期只为通过复盘的组件追加运维；第三期的建设、融资或招商必须另行提交可审计的成本、责任和收益模型。每一笔支出都应归集到“空间、人员、安全与无障碍、评测、维护”五类，并计算“每完成一个测试的单位成本”。建议把参与者反馈闭环率、复用现有空间比例、未处置安全/隐私事件数和可复用组件数作为经济决策的先行指标，而不是用未经核验的 GDP、投资额或客流预测替代证据。

## 人类采用条件与当前成熟度

 采用不是二元的“赞成/否决”，而是分层决策。当前包适合进入公开评审和专业讨论，不适合直接进入法定规划、工程采购或投资承诺。以下表格把下一位人类决策者需要承担的责任写清楚：

| 决策层级 | 当前判断 | 仍需补齐的证据 |
|---|---|---|
| 提交开源概念包 | 可以 | 完成最终 hash、边界披露和人类审阅 |
| 授权一期现场试点 | 暂不能直接 | 正式或清权试点边界、场地负责人、询价和安全/隐私方案 |
| 纳入法定规划或工程 | 不能 | 控规、权属、文保、交通、市政、消防和专业审查资料 |
| 形成投资或长期运营承诺 | 不能 | 可审计的商业模型、采购路径、责任分配和独立风险评估 |

因此，本版的真正产品不是“已经完成的城市”，而是一套可以被专业团队接管、替换数据、运行小试、复盘和停止的决策接口。若没有场地负责人和正式资料，最合理的采用方式是把它当作公开研究和试点招募框架，而不是承诺建设。

## 指标体系、面积复算与合规矩阵

本包的权威顺序是 GeoJSON → metrics.json → 合规/标准/深度矩阵 → proposal.md → HTML/PDF。所有已知指标均从当前设计图层以 EPSG:4548 复算；未知的法定强度不填数字。

当前设计图层复算：总体设计范围面积 11,412,825.4 平方米（[metric:site_area_sqm]）；建筑基底 321,264.6 平方米（[metric:building_footprint_area_sqm]）；绿地 1,703,424.1 平方米（[metric:green_space_area_sqm]）；公共空间 174,923.4 平方米（[metric:public_space_area_sqm]）；三处重点区 [metric:key_area_count]；十张场景卡 [metric:scenario_card_count]；三类测试场景 [metric:pilot_scenario_count]；五类画像 [metric:persona_count]。[data:geometry/site_boundary.geojson#design]、[data:geometry/key_areas.geojson#design]、[data:geometry/land_use.geojson#design]、[data:geometry/buildings.geojson#design]、[data:geometry/roads.geojson#design]、[data:geometry/green_space.geojson#design]、[data:geometry/public_space.geojson#design]、[data:geometry/constraints.geojson#design]、[data:geometry/phasing.geojson#design] 均有图层落点。

合规矩阵逐条绑定公告任务、章节、图层、指标、图纸、来源、假设和自检；标准矩阵覆盖 [standard:PROJECT-OFFICIAL-ANNOUNCEMENT]、[standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]、[standard:MOHURD-URBAN-DESIGN-MEASURES]、[standard:MOHURD-CONTROL-DETAILED-PLANNING]、[standard:MNR-LAND-USE-CLASSIFICATION-GUIDE]、[standard:MOHURD-ARCH-DESIGN-DEPTH-2016]；设计深度矩阵覆盖 [depth:existing_conditions_diagnosis]、[depth:three_level_scope_framework]、[depth:overall_spatial_structure]、[depth:land_use_layout]、[depth:development_intensity_controls]、[depth:height_massing_character]、[depth:retain_renovate_demolish]、[depth:traffic_rail_slow_parking]、[depth:municipal_new_infrastructure]、[depth:blue_green_public_space]、[depth:three_key_area_detailed_design]、[depth:renewal_project_list]、[depth:phasing_implementation]、[depth:metrics_recalculation]、[depth:risk_missing_data]。指标是方案透明度工具，不是法定指标表。

![指标、证据与复算链图](assets/figures/metrics-evidence.png)

## 风险、版权与合规说明

第一风险是数据可信度：临时边界不能作为红线、审批依据或精确面积；正式资料到位后需要统一替换并复算。第二风险是权属与工程：现状建筑、道路、地下空间、市政、文保和消防条件缺失，因此本包只给动作级建议。第三风险是 AI 场景治理：场景默认最小化数据、人工复核、可退出、公开说明，不提供个人画像或不可逆监控。第四风险是经济误读：方案中的转化回路是设计假设，不是投资、产值或政府支持承诺。

全部图形与图表由本 Agent 生成；不使用外部图片、远程字体、地图瓦片、商标或人物肖像。来源、生成方式、限制和替换规则登记在 sources.json、assumptions.json 和 report/copyright_statement.md。作品许可证为 COMMUNITY-DISPLAY-ONLY：允许本次征集的展示与评审，不授权把临时数据或本包内容直接包装成法定规划、商业宣传或工程文件。 [source:BOUNDARY-SOURCE] [source:SOURCE-REGISTRY] [depth:risk_missing_data]

## 参考资料

正式依据包括项目公开公告、面向智能体的清权任务书摘录、主办仓库的 site package、公开标准索引和临时边界说明。外部案例只作为方法研究方向，不把未核验的项目数据写成海淀现状。

来源索引：[source:SITE-PACKAGE]、[source:SOURCE-REGISTRY]、[source:PROCESSED-FACT-PACK]、[source:OFFICIAL-ANNOUNCEMENT]、[source:AGENT-TASKBOOK]、[source:BOUNDARY-SOURCE]、[source:KEY-AREA-SOURCE]

标准索引：[standard:PROJECT-OFFICIAL-ANNOUNCEMENT]、[standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]、[standard:MOHURD-URBAN-DESIGN-MEASURES]、[standard:MOHURD-CONTROL-DETAILED-PLANNING]、[standard:MNR-LAND-USE-CLASSIFICATION-GUIDE]、[standard:MOHURD-ARCH-DESIGN-DEPTH-2016]

设计深度索引：[depth:existing_conditions_diagnosis]、[depth:three_level_scope_framework]、[depth:overall_spatial_structure]、[depth:land_use_layout]、[depth:development_intensity_controls]、[depth:height_massing_character]、[depth:retain_renovate_demolish]、[depth:traffic_rail_slow_parking]、[depth:municipal_new_infrastructure]、[depth:blue_green_public_space]、[depth:three_key_area_detailed_design]、[depth:renewal_project_list]、[depth:phasing_implementation]、[depth:metrics_recalculation]、[depth:risk_missing_data]

数据索引：[data:geometry/site_boundary.geojson#design]、[data:geometry/key_areas.geojson#design]、[data:geometry/land_use.geojson#design]、[data:geometry/buildings.geojson#design]、[data:geometry/roads.geojson#design]、[data:geometry/green_space.geojson#design]、[data:geometry/public_space.geojson#design]、[data:geometry/constraints.geojson#design]、[data:geometry/phasing.geojson#design]

指标索引：[metric:site_area_sqm]、[metric:building_footprint_area_sqm]、[metric:green_space_area_sqm]、[metric:public_space_area_sqm]、[metric:public_node_count]、[metric:green_ratio]、[metric:public_space_ratio]、[metric:road_centerline_length_m]、[metric:building_count]、[metric:key_area_count]、[metric:scenario_card_count]、[metric:pilot_scenario_count]、[metric:persona_count]、[metric:global_case_count]、[metric:phase_count]

本方案版本为 v0.1；下一版本的唯一高优先级输入是官方或清权的 site/key-area polygon，以及道路、权属、文保、市政和现状建筑资料。
