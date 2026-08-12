---
title: "京张边界场 / EDGECASE JINGZHANG — 面向长尾条件的城市AI训练与共测带"
author_github: "siddhartha-yz"
language: "zh"
proposal_format_version: "2"
bilingual_contract_version: "1"
iteration: "v1.5"
translation_file: "proposal.en.md"
license: "COMMUNITY-DISPLAY-ONLY"
summary: "把百年京张从AI成果展示带转化为面向真实城市长尾条件的训练、共测与公开学习基础设施：先暴露边界，再扩大部署。"
tracks: ["ai-traffic-walkability", "enterprise-services-ecosystem", "civic-agent-governance"]
scenarios: ["ai-traffic-walkability", "robot-delivery-low-speed", "enterprise-service-copilot", "ai-health-service-navigation", "public-safety-operations-review", "ai-cultural-guide"]
---

# 京张边界场 / EDGECASE JINGZHANG

**一句话：先暴露边界，再扩大部署。 / Expose limits before scale.**

本方案不把“AI创新城区”理解成一条展示模型能力的橱窗，而把真实城市里最容易被平均值忽略的人、天气、时段、设备和制度摩擦视作创新资源：轮椅与盲杖、老人和儿童、跨语言访客、夜雨、拥挤、断网、传感冲突、机器人与行人混行、多个智能体互相移交失败，都应在规模化部署前被看见、被记录、被人工接管，并形成下一轮研发可复用的公共知识。空间因此形成 **T1受控试验—T2社区共测—T3日常开放** 的三级暴露梯度；京张遗址公园成为“边界里程线”，三处重点区分别承担技术边界、人因边界和市场边界的深做任务。[source:AGENT-TASKBOOK] [depth:overall_spatial_structure]

![EDGECASE 总体证据图](assets/figures/site-overview.png)

## 设计依据与资料清单

正式依据首先来自官方征集公告与仓库 Agent 任务书：前者给出 43.6 平方公里统筹研究、11.4 平方公里总体设计、368.4 公顷三处重点区域及专业成果深度；后者把三大定位、五大功能、三区两翼和 agent.1—agent.6 转成智能体必须响应的任务。[source:OFFICIAL-ANNOUNCEMENT] [source:AGENT-TASKBOOK] 本方案同时读取 `allowed_design_space.json`、`planning_limits.json`、`source_registry.json` 与缺资料清单，明确现阶段只有临时粗略总体边界和重点区 polygon 可用于生成与内容评审，不能冒充官方红线。[source:BOUNDARY-SOURCE] [source:SOURCE-REGISTRY]

因此本方案采用两条证据纪律。第一，**空间事实和设计假设分层**：`geometry/site_boundary.geojson` 与 `geometry/key_areas.geojson` 保持 provisional constraint；参与者自行生成的用地、建筑、道路、绿地、公共空间和分期全部标记为 design proposal，并通过 EPSG:4548 复算面积。[data:geometry/site_boundary.geojson#SITE-001] [metric:site_area_sqm] 第二，**未知值不填数字**：官方容积率、高度、建筑密度、道路红线、权属、市政、文保与消防条件仍进入 `assumptions.json`，不以“看起来专业”的伪精确数值替代。[standard:MOHURD-CONTROL-DETAILED-PLANNING] [depth:risk_missing_data]

为了避免概念闭门造车，方案只把全球案例当作“机制参照”而非复制形态：新加坡 Punggol Digital District 提供街区级真实测试床与数字基础设施协同 [source:CASE-PDD]；Toyota Woven City 强调 city-like living laboratory 和居民反馈 [source:CASE-WOVEN]；Seoul AI Hub 将创业孵化、R&D 基础设施、开放创新与 business validation 串联 [source:CASE-SEOUL-AI-HUB]；Mila 强在科研人才到创业公司的连续路径 [source:CASE-MILA]；Vector Institute 强在研究、产业采用与负责任部署之间的桥接 [source:CASE-VECTOR]。 京张的差异化不是再造一个“living lab”，而是把 **edge case coverage（边界条件覆盖）** 明确做成城市空间和运营的共同绩效。

## 三层范围工作框架

三层范围不是三张尺度不同但内容重复的图。统筹研究层回答“海淀为什么需要一条边界条件创新带”：AI产业竞争正在从模型能力延伸到真实世界部署，长尾条件、互操作、人工接管、可信评测和公共接受度会直接决定产品能否走出实验室。总体设计层把这一判断组织成一条连续公园脊、三种测试暴露等级、横向慢行缝合和可逆原型设施。重点区域层则把三种边界分配给三个场：众智园 T1 技术边界、AI原点社区 T2 人因边界、大钟寺 T3 市场边界。[source:AGENT-TASKBOOK] [depth:three_level_scope_framework]

| 层级 | EDGECASE 问题 | 空间回答 | 可核验证据 |
| --- | --- | --- | --- |
| 43.6 km² 统筹研究 | 如何形成世界级AI生态的差异化能力 | 将“长尾评测—场景开放—产品改进—公共回报”作为三区两翼协作协议 | sources / compliance / case studies |
| 11.4 km² 总体设计 | 如何把AI试验嵌入城市而不把城市变成实验对象 | T1→T2→T3暴露梯度 + Edgecase Mile + 6条慢行连接 | [data:geometry/land_use.geojson#LU-001] [metric:slow_mobility_link_count] |
| 3处重点区 | 如何让产业、人群和日常市场承担不同测试任务 | Controlled Edge Lab / Human Edge Commons / Market Edge Street | [data:geometry/key_areas.geojson#PROV-KEY-001] [metric:key_area_count] |

“三级暴露”不是安全等级，也不是法定分区，而是测试强度与社会开放程度的设计语法：T1 允许高频失败但必须环境受控；T2 允许真实人群参与但必须知情、可退出、可人工接管；T3 面向日常服务，只允许已经过前两级并满足停止条件的低风险试点。这个结构使“失败”从事故或公关问题转化为可被提前发现的研发输入，同时保护普通使用者不被迫成为测试样本。[source:AGENT-TASKBOOK] [metric:edgecase_test_tier_count]

![三层测试梯度与用地结构](assets/figures/land-use-structure.png)

## 统筹研究范围产业与未来城市研究

EDGECASE JINGZHANG 的产业定位是 **Urban Edgecase Infrastructure / 城市长尾条件基础设施**。它不与模型园区竞争算力规模，而补足从算法、机器人和智能体到真实城市采用之间最昂贵的一段：多源数据不一致、传感失真、空间不连续、人群差异、跨语言、弱网、设备互操作、责任移交和人工接管。对企业，这里提供“现实条件压测”；对高校和科研机构，这里提供可复现的真实问题；对政府与社区，这里提供规模化部署前的透明边界；对公众，这里首先提供退出权、替代服务和理解AI限制的界面。

“三区两翼”被重写为一条测试价值链，而不是五块孤立园区。众智园侧重全栈自主、安全治理、机器人和多模态系统的 T1 可控试验；AI原点社区连接高校、开源社区和居民，承担人因、无障碍、跨语言及服务公平的 T2 共测；大钟寺承担智能体商业服务、终端互操作、内容消费与高流动场景的 T3 日常验证。中关村科技服务翼提供知识产权、法务、资本、标准、评测和企业服务；小月河场景赋能翼提供真实环境变化、慢行、生态、社区和维护场景，形成从“研发问题”回到“真实反馈”的闭环。[source:AGENT-TASKBOOK]

五个国际参照带来五个可移植机制，而不是五种建筑风格：PDD 的 precinct-scale test-bed 提醒我们要让基础设施可接入 [source:CASE-PDD]；Woven City 提醒测试必须进入日常反馈循环 [source:CASE-WOVEN]；Seoul AI Hub 提醒验证能力必须和企业成长服务并置 [source:CASE-SEOUL-AI-HUB]；Mila 提醒人才应能从研究走到公司 [source:CASE-MILA]；Vector 提醒产业采用与负责任部署必须同时存在 [source:CASE-VECTOR]。 京张进一步提出一个新的城市指标：不是“部署多少AI”，而是 **在扩大部署前暴露了多少重要边界、多少边界有人工退路、多少经验可以被下一支团队复用**。

品牌系统采用 `EDGECASE JINGZHANG / 京张边界场`，主语不是“智能”而是“边界”。视觉符号以铁路里程标的连续刻度与编程中的方括号 `[ ]` 叠合：方括号表示条件被显式框出，里程刻度表示边界条件不是一次评测而是持续积累。三类状态只用 T1/T2/T3 和高对比形状编码，避免炫技式“赛博城市”视觉。品牌口号 **Expose limits before scale / 先暴露边界，再扩大部署** 同时适用于产业招商、公众沟通和专业审查。

## 总体设计范围城市更新与控规深度城市设计

总体设计范围采用 **一脊、三场、六缝、十二边界点** 的空间骨架。“一脊”是 Edgecase Mile：沿京张遗址公园构成连续公共慢行与证据展示界面；“三场”对应 T1/T2/T3 三类重点区；“六缝”由一条纵向绿道、四条东西向步行缝合和一条长尾复测骑行线组成；“十二边界点”是可移动、可撤除的小尺度场景节点。其目的不是把11.4平方公里全部改造成测试园区，而是在既有城市里建立一套最小、可逆、可以被专业团队继续深化的接口系统。[data:geometry/roads.geojson#ROAD-001] [metric:slow_mobility_link_count]

用地 GeoJSON 被重新切分为完整无缝的概念 partition，使用 MNR 子集中的科研、教育、社区服务、商业服务和公园绿地代码；中心连续公园脊约占临时边界面积的设计比例见 `green_ratio`，但该比例明确不是法定绿地率。[standard:MNR-LAND-USE-CLASSIFICATION-GUIDE] [data:geometry/land_use.geojson#LU-001] [metric:green_ratio] 六个建筑基底只是三处重点区各两个 **可逆原型亭** 的尺度证明，用来承载 Edge Lab、Human Override House、Market Edge Forum，不代表现状建筑、拆除对象或已批准建设量。[data:geometry/buildings.geojson#BLDG-001] [metric:building_footprint_area_sqm]

更新策略以“先运营、后固化”为原则。近期可先通过导视、临时路权、可移动家具、测试预约、人工接管岗和公开结果板启动，不依赖大拆大建；中期根据真实使用证据调整首层空间、慢行连接与企业服务接口；长期才在官方控规、权属、市政、文保和交通条件明确后讨论建筑更新。这样把本次 AI Agent 设计的最大优势——快速迭代——转化成一种城市更新方法，而不是用 AI 生成未经调查的永久形态。[depth:phasing_implementation] [data:geometry/phasing.geojson#PHASE-001]

## 重点区域详细设计

三处重点区采用同一测试协议，但面对完全不同的失败来源。**众智园 / Controlled Edge Lab（T1）**：允许机器人、视觉系统、多智能体调度、端侧算力和安全治理工具在受控环境高频暴露失败。空间动作包括可重构测试庭、不同铺装/坡度/光照条件、可切换门禁与电梯接口的模拟段、人工急停点和“失败复盘墙”。面向产业至少形成“低速配送机器人混行”“多模态感知雨夜/遮挡”“多智能体设施调度冲突”三类测试。任何从临时 polygon 推出的建筑尺度都只作概念建议。[data:geometry/key_areas.geojson#PROV-KEY-001] [data:geometry/public_space.geojson#PUBLIC-001]

**北京AI原点社区 / Human Edge Commons（T2）**：把“模型对平均用户有效”推进到“服务对不同人可用”。这里以高校源头创新和社区日常为优势，设置人类接管屋、无障碍共测环、跨语言导视试验、老人非智能手机替代入口、儿童与监护人边界场景、社区服务 Copilot 柜台。参与测试必须显式 opt-in；同一服务必须同时展示 AI 路径、人工路径和离线/无账号路径。空间上强调校区—园区—社区慢行缝合、开放首层和小型发布/复盘空间，不把居民画像用于商业推荐。[data:geometry/key_areas.geojson#PROV-KEY-002] [data:geometry/public_space.geojson#PUBLIC-002]

**大钟寺 / Market Edge Street（T3）**：面向已经过 T1/T2 的低风险能力，测试真实商业与高流动环境中的智能体交接、终端兼容、消费信息可信、排队/拥挤、弱网和人工售后。这里最重要的不是“无人化”，而是 **handoff quality / 交接质量**：当商家智能体、地图导航、支付终端、公共服务入口或内容生成发生冲突时，使用者是否知道谁负责、怎样退出、怎样找到人。由于仓库 Issue #1058 对 provisional KEY-003 位置提出有效疑问，本方案不使用该 polygon 计算站点半径、路口四象限或精准 TOD 指标；这些内容必须等 official geometry 后重算。[source:REPO-ISSUE-KEY003] [data:geometry/key_areas.geojson#PROV-KEY-003]

![三处重点区域与T1/T2/T3角色](assets/figures/key-areas.png)

## AI 创新生态、人才画像与 AI+ 场景

六类核心用户画像共同决定“边界”是什么：①机器人/智能体开发者需要真实而可控的失败条件；②高校研究者需要可复现问题与公开方法；③周边老人和照护者需要不用新设备也能完成服务；④轮椅、低视力或其他无障碍使用者需要连续路线和人工替代；⑤国际学生/研究者需要跨语言、跨文化和非本地账号路径；⑥小商户与一线运营人员需要知道智能体什么时候能帮忙、什么时候必须交回给人。人才服务因此不只提供公寓、办公、路演，还提供“真实问题库—测试环境—专业复盘—创业服务—首个场景”的完整链条。

十二张场景卡组成 `EDGE-01` 至 `EDGE-12`：

| ID | 边界条件 | 主要空间 | 人工退路 / 停止条件 |
| --- | --- | --- | --- |
| EDGE-01 | 轮椅/盲杖与AI慢行导航 | T2+Edgecase Mile | 人工导引；无障碍路线不连续即停 |
| EDGE-02 | 老人无智能手机服务 | T2 | 柜台/电话/纸面路径必须同等可达 |
| EDGE-03 | 跨语言访客导视 | T2/T3 | 人工翻译入口；低置信度拒答 |
| EDGE-04 | 儿童—监护人身份歧义 | T2 | 不做自动身份决策，转人工 |
| EDGE-05 | 夜间、雨雪、眩光感知 | T1→T3 | 受控重放后才允许开放试点 |
| EDGE-06 | 活动日拥挤与排队 | T3 | 容量阈值触发人工运营模式 |
| EDGE-07 | 低速配送机器人混行 | T1→T2 | 急停/人工遥控/限速 |
| EDGE-08 | 多源传感数据冲突 | T1 | 显示冲突而不是强行给唯一答案 |
| EDGE-09 | 弱网/断网/定位漂移 | 全线 | offline-first 导视和人工服务 |
| EDGE-10 | AI医疗/公共服务导航 | T2 | 仅导航不诊断；转人工专业服务 |
| EDGE-11 | 商户智能体跨系统交接 | T3 | 明确责任主体与人工售后 |
| EDGE-12 | 极端高温下路线建议 | T2/T3 | 以人工发布的安全规则优先 |

其中三项被定义为产业验证旗舰：**E1 Embodied Edge**（机器人在不同铺装、门禁、拥挤与人群混行条件下的安全退化）；**E2 Civic Service Edge**（多语言、无障碍、老人友好的公共服务智能体，比较 AI 成功率与人工接管率）；**E3 Agent Interop Edge**（企业服务、商户终端和公共入口之间的多智能体交接与责任链）。它们不追求“零失败演示”，而要求提交失败分类、复现条件、人工接管时刻、修复版本和重新测试结果。[metric:edgecase_scenario_count] [metric:human_override_court_count]

三座 AI 朝圣地标不是巨型雕塑，而是三种知识装置：**Mile Zero / 边界零公里** 记录每年新增的测试类别；**Human Override House / 人类接管屋** 把“人仍然有权接管”做成可见建筑；**Long-tail Atlas / 长尾图谱墙** 只展示经脱敏后的失败模式、修复版本与贡献团队。年度运营建议举办 `EDGECASE WEEK`：白天做开放场景与无障碍走测，夜间做夜雨/低照模拟和开发者复盘；形成开源问题单、企业 challenge、公众说明会和次年场景更新，而不是一次性科技节。[source:AGENT-TASKBOOK]

## 用地、建筑规模与拆改留方案

用地层的任务不是凭临时边界发明控规，而是验证 EDGECASE 机制能否被空间承载。九个 partition 单元完整覆盖 provisional site boundary，中心三段统一为 1401 公园绿地，其余按北部科研、中部教育/社区服务、南部商业服务形成“从受控研发到日常市场”的概念梯度。[data:geometry/land_use.geojson#LU-001] [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE] 这一切只代表“建议功能倾向”，不改变现状土地用途，也不替代官方国土空间调查或控规。

建筑层只画六个小型可逆原型基底，是有意降低设计权力：每个重点区两个，方便在 official parcel/ownership 到位后整体移动、缩放或删除。众智园原型偏实验室；原点社区偏社区服务/人工接管；大钟寺偏混合功能论坛。`building_footprint_area_sqm` 只是这六个概念基底的几何和，不是现状建筑面积、总建筑规模或批准建设量。[data:geometry/buildings.geojson#BLDG-001] [metric:building_footprint_area_sqm]

拆改留采用“**不调查，不拆除**”的硬原则。现状建筑数据、产权、结构安全、文保、消防和使用状态未提供，所以本包不对任何真实建筑标注 demolish。专业团队接手后应先补齐 building survey 与 ownership，再按“遗产/高价值保留—可适应性改造—低效但可再用—必要更新”建立对象清单。高度、容积率、建筑密度、退线和屋顶控制全部保留为 unknown/pending control；本阶段只建议首层透明度、可进入性、遮阴、无障碍和可拆装界面等与边界场运营直接相关的性能目标。[depth:retain_renovate_demolish] [depth:height_massing_character]

## 交通、轨道、市政与公共服务设施

交通设计先解决“测试可达”，再谈智能交通。`roads.geojson` 中一条纵向 Edgecase Mile、四条横向步行缝合和一条斜向复测骑行线均是概念 slow-mobility connection，不代表道路红线。[data:geometry/roads.geojson#ROAD-001] [metric:slow_mobility_link_count] 横向缝合的作用是避免京张只成为南北向观光线：社区、校园、企业员工必须能够从两侧进入同一套测试与公共服务节点；同时每个 EDGE 场景要有不依赖AI的基础导视，保证“被测试的智能系统失效时，人仍能走出去”。

轨道站点一体化仅提出方法：站口—公共空间—测试节点之间应核验无障碍连续性、夜间照度、遮阴雨棚、非机动车冲突和人流容量；正式线位、出入口、道路交叉口、停车与换乘参数必须等待官方交通资料。对大钟寺尤其遵守 A-KEY003-001，不从有争议的临时 polygon 生成精确 TOD 圈。[source:REPO-ISSUE-KEY003] [depth:traffic_rail_slow_parking]

新型基础设施被定义为“可拔插接口”而非重资产炫技：受控测试庭需要可断电、可隔离的端侧算力与网络；社区共测区需要本地化日志、隐私提示和人工接管通信；日常开放区需要状态公告、故障降级和线下服务。传感器原则是目的限定和最小化，优先环境级、计数级和设备状态数据，不默认采集可识别个人信息。市政能源、管线、排水、防洪、消防和通信冗余必须在专业深化前补齐；本包只提出接口需求，不给伪工程参数。[depth:municipal_new_infrastructure]

![慢行、蓝绿与人工退路系统](assets/figures/mobility-bluegreen.png)

## 蓝绿空间、公共空间与城市风貌

中心连续公园脊既是京张遗址公共空间的连续背景，也是“边界里程线”的低技术底座。AI装置必须服从树荫、雨水、步行、骑行、休息、运动和铁路文化体验，而不是反过来把公园铺满屏幕。三个公共 co-test court 只占 provisional 总体边界的一小部分设计比例，承担预约测试、人工接管、说明和复盘；其余公园保持普通城市公共空间属性。[data:geometry/green_space.geojson#GREEN-001] [data:geometry/public_space.geojson#PUBLIC-001] [metric:public_space_ratio]

风貌语言来自“铁路测量与调度”而不是泛赛博朋克：耐久金属刻度、黑白高对比信息、可触摸凸点、机械式状态牌、里程编号和可维护构件。每个节点先显示“这个系统在做什么、它不知道什么、怎样退出、谁负责”，再显示AI能力。夜间控制以最低必要亮度为原则；对低视力、色觉差异和认知负担使用形状/文字冗余编码。公共艺术优先把失败模式、修复历史、贡献者和京张工程文化并置，形成“技术不是魔法，它有边界并可被修复”的城市美学。[depth:blue_green_public_space] [standard:MOHURD-URBAN-DESIGN-MEASURES]

百年京张文化不被简单等同于“铁路=科技”。本方案只做一种方法性转译：铁路系统之所以能够成为公共基础设施，依赖明确线路、信号、责任、维护、复盘和人工处置；AI进入城市同样需要可理解的边界和运维制度。这个叙事不声称任何未经来源核验的历史技术细节，而把“可维护的公共技术”作为遗产与AI之间的桥梁。Mile Zero、Override House、Long-tail Atlas 三个地标也因此更像公共设施而不是拍照装置。

## 更新项目清单、实施政策与分期计划

首批项目强调小尺度、可撤销和可以验证：

| 编号 | 项目 | 首要产出 | 进入下一阶段条件 |
| --- | --- | --- | --- |
| EC-01 | Edgecase Mile 基础导视与6条慢行连接 | 非AI也可使用的连续路线 | 专业交通/无障碍核验 |
| EC-02 | 众智园 Controlled Edge Court | E1机器人与多模态压测 | 事故/急停机制通过审查 |
| EC-03 | 原点 Human Override House | E2公共服务共测与人工接管 | 参与同意、隐私、人工服务就绪 |
| EC-04 | 大钟寺 Market Edge Forum | E3多智能体/终端交接测试 | KEY-003 official geometry + 商户授权 |
| EC-05 | Long-tail Atlas | 失败类型、修复版本、复测记录 | 脱敏和版权审核 |
| EC-06 | EDGECASE WEEK | 年度问题征集、公开走测、开发者复盘 | 活动许可和公共安全方案 |

实施政策不是建立一个“AI特区”豁免监管，而是设置更严格的上线门槛：每个试点必须有 owner、测试问题、数据边界、成功/失败指标、人工接管、停止条件、复测版本和退出计划；只有完成 T1 才能申请 T2，完成 T2 才能进入 T3。公共空间不因试点而失去普通使用权，居民也不因为进入公园就自动同意参与实验。企业得到的是更高质量的真实反馈与场景接口，而不是对公众权利的折扣。

分期几何把南中北三段编码为可核验的 phase partition，但真正实施顺序应“先机制、后空间”：0—1年建立治理协议、问题库、基础慢行与三个可移动原型；1—3年根据使用证据扩充场景、企业服务和首层更新；3年以上才讨论在 official control 下的永久建设。任何阶段都允许某项AI能力退出而空间继续作为普通公园、社区服务或活动场地使用，这就是“可逆更新”的底线。[data:geometry/phasing.geojson#PHASE-001] [depth:renewal_project_list]

## 指标体系、面积复算与合规矩阵

指标分三组。**空间复算指标**从 GeoJSON 直接得到：provisional site area、概念绿地比例、公共共测空间比例、六个原型建筑基底面积、六条慢行连接和三个重点区。[metric:site_area_sqm] [metric:green_ratio] [metric:public_space_ratio] **设计结构指标**记录3级测试梯度、12张场景卡和3个人工接管庭，用来检查方案有没有把核心机制落成可数对象。[metric:edgecase_test_tier_count] [metric:edgecase_scenario_count] [metric:human_override_court_count] **法定/工程指标**如 FAR、高度、密度、道路红线、消防、市政容量继续 unknown，直到官方资料到位。

真正值得长期跟踪的运营 KPI 不写成已知数字，而定义计算方法：`edgecase_coverage = 已测试的重要边界条件 / 年度目标边界条件`；`human_handoff_success = 成功完成人工接管次数 / 触发接管次数`；`reproducible_failure_rate = 可由另一团队复现的失败记录 / 公开失败记录`；`public_exit_integrity = 无需AI即可完成核心公共路径的抽检通过率`；`fix-to-retest_cycle` 记录从失败到修复复测的时间。它们需要真实运营数据后再进入 metrics，而不是在设计阶段虚构基准线。

`compliance_matrix.json` 继续覆盖公告 1.3、1.4、1.5 与 agent.1—agent.6；`standard_matrix.json` 覆盖五项当前可用主控标准；`design_depth_matrix.json` 追踪现状诊断、用地、建筑、交通、市政、蓝绿、重点区、实施和风险等深度项。图面、HTML、PDF 和正文都必须回到同一 GeoJSON/metrics 证据，不允许“漂亮图一套、机器数据另一套”。[depth:metrics_recalculation]

![指标、失败证据与复测闭环](assets/figures/metrics-evidence.png)

## 风险、版权与合规说明

第一类风险是 **边界风险**：总体范围和三处重点区均为 provisional rough geometry；尤其 KEY-003 有公开 Issue 指出可能与大钟寺目标位置不一致。因此所有面积相关值只用于包内一致性与内容讨论，official polygon 发布后必须整体重跑空间层、指标、图、HTML 和 PDF。[source:BOUNDARY-SOURCE] [source:REPO-ISSUE-KEY003] 第二类是 **专业资料风险**：没有地块、产权、建筑、道路红线、市政、消防、文保和工程条件，因此不做拆除、开发强度或审批承诺。[depth:risk_missing_data]

第三类是 **AI治理风险**：边界场若设计不当，很容易把弱势使用者变成“免费测试数据”。本方案要求参与性测试 opt-in、个人数据最小化、优先聚合/环境数据、低置信度拒答、人工接管、公开退出方式、试点停止条件和结果脱敏。医疗场景只做服务导航不做诊断，儿童身份歧义不自动决策，公共安全智能体不替代现场负责人，商业智能体必须明确责任主体。任何更高风险能力需要在具体上线前接受独立法律、伦理、安全和专业审查。

第四类是 **版权与表达风险**：五张图由本方案 GeoJSON 和自有程序性图形生成，不使用商业地图瓦片、第三方品牌图形或未经许可照片；外部案例仅以文字归纳官方公开页面，来源记录于 `sources.json`。详细声明见 `report/copyright_statement.md`。本方案不声称政府采纳、不声称官方批准、不声称精确红线或已实施项目；所有空间动作均是概念建议，可供专业团队在正式资料到位后深化。

## 参考资料

- 北京市规划和自然资源委员会海淀分局：百年京张AI创新带城市设计国际方案征集资格预审公告 [source:OFFICIAL-ANNOUNCEMENT]
- `brief/site-package/agent_taskbook.json`：Agent 开源征集任务书 [source:AGENT-TASKBOOK]
- `brief/site-package/geometry/provisional_boundaries.geojson`：临时粗略边界 [source:BOUNDARY-SOURCE]
- `data/source_registry.json` 与 `data/processed/agent_fact_pack.md`：资料可用性与导航层 [source:SOURCE-REGISTRY] [source:PROCESSED-FACT-PACK]
- JTC Punggol Digital District / SIT precinct-scale test-bed [source:CASE-PDD]
- Toyota Woven City Living Laboratory [source:CASE-WOVEN]
- Seoul Metropolitan Government Seoul AI Hub [source:CASE-SEOUL-AI-HUB]
- Mila Ventures research-to-venture ecosystem [source:CASE-MILA]
- Vector Institute research-to-adoption ecosystem [source:CASE-VECTOR]
- `metrics.json`, `assumptions.json`, `compliance_matrix.json`, `standard_matrix.json`, `design_depth_matrix.json` 为本方案机器可读主索引。
