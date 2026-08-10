---
title: "京张协议 / THE JINGZHANG PROTOCOL"
author_github: "Garylauchina"
language: "zh"
proposal_format_version: "2"
bilingual_contract_version: "1"
translation_file: "proposal.en.md"
license: "COMMUNITY-DISPLAY-ONLY"
summary: "以 BUILD—TEST—LIVE—LEARN/UPDATE 城市生命周期与七类公共接口为骨架，把百年京张 AI 创新带设计为可验证、可申诉、可更新的人机共生城市协议；V0.5 已完成拓扑闭合空间底稿、12 个场景节点、依赖式实施包、双语展示与本地正式包收口，仍使用临时边界。"
tracks: ["ai-traffic-walkability", "enterprise-services-ecosystem", "civic-agent-governance"]
scenarios: ["ai-traffic-walkability", "enterprise-service-copilot", "public-safety-operations-review"]
---

# 京张协议 / THE JINGZHANG PROTOCOL

**A Civic Protocol for Human–AI Coevolution**  
**一座城市，如何学会与 AI 共存**

## V0.5 核心命题

本方案不把“AI 城市”理解为设备、屏幕和演示项目的叠加，而把百年京张 AI 创新带设想为一套可见、可测试、可申诉、可回滚、可持续修订的城市协议：AI 在这里被制造、进入真实社会前接受验证、在日常场景中创造公共价值，并把运行证据与失败经验带回规则更新。所有制度、空间与运营内容均为概念建议，仍需规划、工程、法律、伦理和公众参与等专业程序深化 [source:AGENT-TASKBOOK] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]。

京张铁路的历史价值不只是一条可借用的“轨道”意象。国家铁路局将 1905—1909 年建设的京张铁路界定为中国人自己勘测、设计、施工和管理的第一条国有干线铁路；北京市现有遗址公园则通过恢复老正线、保留清华园站房和缝合铁路两侧空间，让工程遗产继续成为开放公共生活的一部分 [source:HIST-JINGZHANG-RAILWAY] [source:HIST-JINGZHANG-PARK]。方案据此提出一种明确的当代转译：铁路时代把自主工程能力写入地理，AI 时代则要把可问责、可互操作、可修订的机器智能写入社会。后一句是设计论题，不是史料原句。

空间上，方案以 **BUILD → TEST → LIVE → LEARN / UPDATE** 作为“三区两翼”之上的运行生命周期：众智园侧重 BUILD，北京 AI 原点社区侧重 TEST，大钟寺侧重 LIVE，中关村科技服务翼与小月河场景赋能翼共同支撑跨区服务、公共体验和证据回流，全带通过 LEARN / UPDATE 形成版本化的治理闭环。它不新增法定分区，也不替代官方任务书的三层范围与三区两翼结构 [data:geometry/key_areas.geojson#PROV-KEY-001] [depth:three_level_scope_framework]。

V0.3 提出两项可供专业团队深化的城市公共基础设施：其一是 **AI City API / Jing-Zhang AI Civic Protocol**，它不是单一中心平台，也不只是项目准入闸门，而是不同部门、企业和公共服务运营者都可实现的最低公共接口；其二是 **Jing-Zhang AI Constitution / 京张 AI 城市公约**，它不是一次性宣言，而是由场景讨论、公众参与、专业审查和运行证据共同更新的版本化公约。二者共同规定身份与来源、数据目的与期限、能力与限制、人工权责与替代、申诉与补救、互操作与迁移、版本与退出七类接口。它们均不是已建平台、法定许可或已生效法律。

## 设计依据与资料清单

本方案以北京市规划和自然资源委员会海淀分局发布的《百年京张AI创新带城市设计国际方案征集资格预审公告》为第一依据，并以 `brief/site-package/` 中经维护者登记的任务、范围、枚举、指标和来源清单为机器可读依据。所有判断均拆分为可追溯来源、可复算指标、可校验图层和可人工复核假设。公告要求达到控制性详细规划的城市设计深度和规划综合实施方案的城市设计深度；V0.5 已把概念空间、证据结构、双语 HTML、A3 文册、A0 展板、机器清单与自检收口为本地 review-ready 正式包。由于官方精确边界、控制条件与独立专业签核尚未取得，它仍是使用临时约束的开源概念成果，不是审批成果。V0.5 正式包沿用未改写的 V0.3 几何与指标证据快照和 V0.4 图纸版式，因此内嵌的五组分析图保留 V0.3 标签。

方案不是独立愿景文本，而是从公告、面向智能体任务书和场地资料出发组织成果；本节只把最关键依据放在判断旁边 [source:OFFICIAL-ANNOUNCEMENT] [source:AGENT-TASKBOOK] [depth:existing_conditions_diagnosis]。完整来源和标准覆盖分别保存在 `sources.json`、`standard_matrix.json` 与 `design_depth_matrix.json`，不在正文重复机器索引。

资料登记表的使用边界如下 [source:SOURCE-REGISTRY]：

- data/source_registry.json 登记公开、清权与临时资料的用途边界。
- 当前登记摘要：formal 可用资料 7 条，背景资料 1 条，provisional-only 资料 1 条。
- agent 不得把 background_only 或 provisional_only 资料升级为 official boundary、法定控规、正式评分依据或政府实施承诺。

`data/processed/agent_fact_pack.md` 是本方案的阅读导航层，不是新的权威来源 [source:PROCESSED-FACT-PACK]。它帮助 agent 把三层范围、三处重点区、公告任务、agent.1-agent.6、资料可用性和缺资料事项组织成可读方案；事实判断仍需回到已登记的原始材料 [source:OFFICIAL-ANNOUNCEMENT] [source:AGENT-TASKBOOK]，完整来源关系由 `sources.json` 保存。

![资料证据链与提交包关系图](assets/figures/site-overview.png)

官方 `SITE_BOUNDARY` 与三处 `KEY_AREA` 精确 polygon 尚未提供，V0.3 继续使用仓库登记的临时粗略几何。`geometry/site_boundary.geojson` 与 `geometry/key_areas.geojson` 均明确标注 `provisional_constraint`、`official_boundary=false`，只能用于方案生成、自检、可视化和设计讨论，不能作为官方红线、审批依据、精确面积依据或法定控制结论 [data:geometry/site_boundary.geojson#SITE-001] [source:BOUNDARY-SOURCE] [source:KEY-AREA-SOURCE]。

因此本轮状态是：**临时边界内的设计拓扑与治理闭环已经可复算，但仍须在官方几何发布后整体重算**。替换边界时必须同步重生成用地、道路、绿地、公共空间、建筑、场景节点、分期、指标和图件，不能只替换单个文件。

边界解释可回到总体范围图层和面积复算 [data:geometry/site_boundary.geojson#SITE-001] [metric:site_area_sqm]。三处重点区则由独立图层和数量指标核对 [data:geometry/key_areas.geojson#PROV-KEY-001] [metric:key_area_count]。这意味着读者可以从正文进入证据，但不必先读一串机器编号。

## 三层范围工作框架

方案按照公告确定的三个层次组织工作：统筹研究范围使用公告约 **43.6 平方公里**的数值，但当前没有对应 polygon；总体设计范围使用公告约 **11.4 平方公里**及临时 SITE-001（EPSG:4548 实算约 11.413 平方公里）；重点区域使用公告约 **368.4 公顷**及三处临时粗略 polygon。前者只做产业与未来城市研究，后两者承载可复算空间设计；三种范围不得互相替代 [metric:announced_coordinated_research_area_sqm] [metric:announced_overall_design_area_sqm] [metric:announced_key_detailed_design_area_sqm]。

三层工作框架的深度项由 [depth:three_level_scope_framework] 和 [depth:overall_spatial_structure] 约束，空间证据以 [data:geometry/site_boundary.geojson#SITE-001] 与 [data:geometry/key_areas.geojson#PROV-KEY-001] 为准，任务依据以 [standard:PROJECT-OFFICIAL-ANNOUNCEMENT] 为准，范围索引以 [source:PROCESSED-FACT-PACK] 中 `project_scope_summary.csv` 的三层范围表为导航。

![三层范围与空间工作框架图](assets/figures/land-use-structure.png)

三层工作不是互相割裂的图纸集合。统筹研究决定产业链和城市形态判断，总体设计把判断落实到更新项目、空间结构和设施承载，重点区域详细设计验证具体地块、建筑、交通、公共空间和AI应用场景的可实施性。agent 生成方案时必须先锁定当前提交采用的 official 或 provisional 边界和约束，再生成用地、建筑、道路、绿地、公共空间、分期和AI服务节点，最后从这些图层复算指标并在正文解释哪些结论仍受 provisional boundary 限制。任何无法从结构化数据复算的面积、比例、规模或项目数量，不得写入正式结论。

本方案建议的总体概念为“京张协议”：以京张遗址公园为历史与公共空间主轴，以众智园、北京 AI 原点社区、大钟寺三处重点片区为 BUILD、TEST、LIVE 的空间锚点，以高校、企业、社区和轨道站点为日常网络，以两翼承接服务与场景扩散，形成可持续 LEARN / UPDATE 的城市运行回路。这里的生命周期不是额外画出的新红线，而是把官方三层范围、三区两翼和六项 Agent 任务转译为可验证的工作方法。

| 层级 | 设计问题 | 方案回答 | 数据落点 |
| --- | --- | --- | --- |
| 统筹研究范围 | AI产业生态和未来城市形态如何组织 | 建立“高校策源-开源协作-企业转化-公共体验-国际传播”的创新链 | compliance_matrix.json、standard_matrix.json |
| 总体设计范围 | 产业空间、城市更新、交通市政和风貌如何落图 | 3×4 用地矩阵、双纵轴、四横链、绿脊、公共空间和实施包共同表达 | [data:geometry/land_use.geojson#LU-BUILD-01]、[data:geometry/roads.geojson#ROAD-SPINE-001] |
| 重点区域范围 | 三处片区如何达到详细设计深度 | 分别提出定位、空间动作、AI场景和实施依赖 | [data:geometry/key_areas.geojson#PROV-KEY-001]、[data:geometry/key_areas.geojson#PROV-KEY-002]、[data:geometry/key_areas.geojson#PROV-KEY-003] |

## 统筹研究范围产业与未来城市研究

统筹研究范围的核心任务是构建世界级 AI 创新生态体系。方案应梳理海淀高校院所、头部企业、算力算法数据要素、孵化平台、上市企业、独角兽和科技服务资源，提出AI创新链、产业链、人才链和城市服务链的空间协同框架。命名方案和 logo 设计应服务于“百年京张文化带、都市AI生活体验带、AI融合创新带”的整体辨识度，不能只停留在口号，应说明与产业生态、公共空间和文化资源的关联。面向智能体任务书还要求回应“五大功能”和“三区两翼”协同，形成可继续深化的命名系统、视觉识别、总体空间结构图、场景开放和运营机制；本节必须用 [source:AGENT-TASKBOOK] 与 [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK] 标注这些要求来自 agent 开源征集任务，而不是法定规划控制。

统筹研究并不新增伪精确红线；它通过 [standard:MOHURD-URBAN-DESIGN-MEASURES] 要求的城市风貌、公共空间和建筑布局统筹，回接 [data:geometry/land_use.geojson#LU-BUILD-01]、[data:geometry/public_space.geojson#PUBLIC-BUILD-001] 与 [depth:overall_spatial_structure]，说明产业策略最终要落到可见、可复核的空间结构。

未来城市形态研究应回答人工智能如何改变工作、生活、社交、学习、交通和公共服务。方案应把AI交通系统、连续绿色空间、创新服务设施和国际化生活工作氛围落实为可定位的功能区、节点、廊道和场景，而不是泛泛描述技术愿景。agent 应把产业战略指标、AI创新指数、人才密度、空间供给类型和AI+垂直应用重点区域写入指标体系，并标明哪些是官方、哪些是设计建议、哪些仍待正式数据校准。若提出全球AI创新活动、开发者社区、开放场景或朝圣路线，应写为“概念建议/参考方案/可供专业团队深化研究”，不得写成已经确定的政府活动或实施安排。

V0.3 保留六组互补案例，刻意区分实体创新区、分布式测试网络、城市公开制度、公众共创方法、组织风险框架和未落地项目。它们不是同类排名，也不用于移植境外制度，而用于提炼京张协议需要同时具备的空间、技术与公共治理机制 [metric:global_case_group_count]：

| 案例类型与案例 | 经一手来源核验的机制 | 对京张协议的转译 | 不复制的边界 |
| --- | --- | --- | --- |
| 实体创新区：新加坡榜鹅数字园区 ODP | 把实体设施、城区运行数据、API 和安全测试环境组织为可接入的园区底座 | 形成跨运营者的公共接口与测试环境，连接 BUILD 和 TEST [source:CASE-PUNGGOL-ODP] | 平台效率不等于公共合法性；不照搬规模、绩效或集中控制模式 |
| 分布式测试网络：欧盟 AI Testing and Experimentation Facilities | 在真实或近真实环境中完成集成、测试、验证和展示，并让终端用户参与定义场景、协议和指标 | 建立“实验室—受控街区—日常服务”的测试梯级 [source:CASE-EU-TEF] | 测试服务不等于监管批准，也不能替代本地专业审批 |
| 城市公开制度：赫尔辛基与阿姆斯特丹算法登记 | 公开城市所用 AI/算法的用途和信息，并提供反馈或责任联系 | 每个 LIVE 场景必须有公众可读的系统卡、负责人和纠错入口 [source:CASE-HELSINKI-AI-REGISTER] [source:CASE-AMSTERDAM-ALGORITHM-REGISTER] | 登记不等于独立审计、申诉裁决或部署许可 |
| 公众共创：蒙特利尔负责任 AI 宣言 | 通过多场景、公众与专家共同讨论形成原则 | 用教育、健康、城市服务等真实场景共同修订京张 AI 城市公约 [source:CASE-MONTREAL-DECLARATION] | 原则宣言必须继续绑定责任人、场景卡和版本日志 |
| 全生命周期框架：NIST AI RMF | 以 Govern—Map—Measure—Manage 形成持续风险循环，并纳入清退和外部反馈 | 将 LEARN/UPDATE 变成持续监测、复审、暂停和退出机制 [source:CASE-NIST-AI-RMF] | 自愿性组织框架不是城市设计标准、法律合规证明或法定审批 |
| 治理警示：多伦多 Quayside / Sidewalk Toronto | 官方文件曾要求开放标准、数据最小化、公众参与和独立顾问，但项目合作最终终止 | 在技术和空间定型前先明确公共权责、开放接口、社会许可和退出安排 [source:CASE-SIDEWALK-QUAYSIDE] | 不把数据治理争议写成项目终止的唯一原因，也不把未落地设想当成建成绩效 |

这些案例共同指向一个差异化选择：京张协议不是又一条“验证流水线”或统一交通灯，而是城市级公共宪章与多运营方互操作层。不同运营者保留各自系统，但必须向公众和彼此提供最低一致的七类接口：①身份/来源；②数据目的/保存期限；③能力/限制；④人工权责/非数字替代；⑤申诉/补救；⑥互操作/可迁移；⑦版本/暂停/退出/公共记忆。BUILD 发布能力契约，TEST 生成试验协议卡，LIVE 落实服务界面权利，LEARN/UPDATE 公开修订规则；任何测试通过都不被表述为政府批准。

## 总体设计范围城市更新与控规深度城市设计

V0.3 将协议转译为一个可复算的空间矩阵：南北方向依次为 **BUILD、TEST、LIVE** 三个生命周期段，东西方向依次为 **知识研发、公共绿脊、公民接口、日常服务** 四类界面带，形成 12 个共享切割线的概念用地单元。LEARN/UPDATE 不另划第四片区，而通过全带的反馈网络回到每一段。12 个 polygon 完整覆盖 SITE-001，实质 gap、outside 与 overlap 均为 0；分类是功能建议而非现状或法定用地 [data:geometry/land_use.geojson#LU-BUILD-01] [metric:land_use_coverage_ratio] [metric:land_use_overlap_area_sqm]。

矩阵上叠加两条纵向公共联系——**京张协议公共绿脊**与**七接口城市服务链**——以及 BUILD、TEST、LIVE、LEARN/UPDATE 四条横链，构成一张连通的“梯形网络”。它表达慢行、服务和场景关系，不是道路红线或工程线位 [data:geometry/roads.geojson#ROAD-SPINE-001] [data:geometry/roads.geojson#ROAD-INTERFACE-001] [metric:slow_mobility_length_m]。三个 1401 单元直接派生为连续绿脊，避免用地与绿地分别手画；六处公共界面和六个小型概念承载原型锚定重点区。所有建筑原型均位于临时边界和相应重点区内，并与 1401、1403 及公共空间保持零冲突。

在临时边界分母下，V0.3 实算设计绿地约 **256.32 万㎡ / 22.459%**，六处公共界面约 **43.26 万㎡ / 3.7905%**，概念建筑基底 **2.7775 万㎡ / 0.2434%**，概念慢行与服务联系约 **24.15 km** [metric:green_ratio] [metric:public_space_ratio] [metric:concept_building_coverage_ratio]。这些数值只用于检验方案选择，不是审定绿地率、建筑密度或道路指标。

本节按照 [standard:MOHURD-CONTROL-DETAILED-PLANNING] 把控规深度内容拆成可审查对象：用地拓扑、概念承载体、慢行服务网、项目清单、已知/未知控制状态和复算方法分别进入图层与矩阵。由于缺少现状建筑、权属、控规、道路红线与工程条件，总建筑规模、容积率、建筑密度、高度、退线、道路面积和道路率均保持 `unknown`；完成的是控制条件状态表，不是取得了法定数值 [metric:floor_area_ratio] [metric:setback_m] [depth:development_intensity_controls]。

总体设计还必须支撑交通、轨道、市政和配套设施。方案应围绕轨道站点一体化、道路微循环、非机动车停放、停车供给、创新服务平台、人才生活服务、新型基础设施、分布式能源和端侧算力提出空间布局和实施路径。涉及建筑高度、开发强度、道路红线、退线和设施标准的内容，若尚无官方控制条件，应写为“待正式控规条件确认”，不得以 agent 推测值冒充审定指标。

## 重点区域详细设计

重点区域详细设计是必选项。众智园AI自主创新加速区应围绕国家人工智能平台、全栈自主创新、标准制定、安全治理、产业展示、对外交通、清河文化、低碳绿色创新交往环境和绿色空间AI场景提出详细方案。北京AI原点社区应围绕近校创新、成果孵化转化、人才特区、开源体系、品牌活动、建筑拆改留、成果展示发布、居住生活配套、校区园区慢行联系和轨道站点一体化提出详细方案。大钟寺AI产业聚集区应围绕领军企业、智能体、智能终端、内容消费、数据要素、数字资产、商业服务、规划绿地复合利用、大钟寺站一体化和路口四象限步行连通提出详细方案。

三处重点区域详细设计必须引用 [data:geometry/key_areas.geojson#PROV-KEY-001]、[data:geometry/key_areas.geojson#PROV-KEY-002]、[data:geometry/key_areas.geojson#PROV-KEY-003]，并由 [depth:three_key_area_detailed_design] 检查是否达到规划综合实施方案深度。若只描述“打造示范区”而没有功能、建筑、交通、公共空间和实施项目证据，应被视为未完成。

![三处重点区域索引与设计任务图](assets/figures/key-areas.png)

三处重点区域必须在 `geometry/key_areas.geojson` 中出现。若仓库已提供 official polygons，应作为 `official_constraint` 使用；若 official polygons 缺失，可暂用 `provisional_constraint`，但正文、HTML、sources、assumptions 和 self_check 必须说明它不能作为正式评分或审批依据。`compliance_matrix.json` 应分别覆盖公告 1.5.3.1、1.5.3.2、1.5.3.3。设计表达应包含功能业态、建筑规模、建筑形态、拆改留分类、公共空间系统、交通组织、慢行连通和实施项目。HTML 页面应能切换查看三处重点区域，A3 文册和 A0 展板应至少包含重点片区总图、局部详图和指标说明。

| 重点片区 | 设计定位 | V0.3 空间抓手 | 场景与实施门槛 | 证据引用 |
| --- | --- | --- | --- | --- |
| 众智园 / BUILD | 花园型全栈自主创新街区 | 城市智能试验场、能力契约发布庭、安全评测实验室、标准协作馆 | S01、S02、S10；受控测试路线与公众旁观路线分离，进入公共试验前须具备人工停止、事件记录与能力边界 | [data:geometry/key_areas.geojson#PROV-KEY-001] [data:geometry/public_space.geojson#SCENARIO-S01] [metric:scenario_node_zhongzhiyuan_count] |
| AI 原点 / TEST | 近校型成果转化与公民测试社区 | 协议零号站、社区服务接口庭、学习工作室、人工复核与申诉站 | S03、S04、S05、S07，并为 S08 提供专业转介；公开试验卡必须先于服务上线 | [data:geometry/key_areas.geojson#PROV-KEY-002] [data:geometry/public_space.geojson#SCENARIO-S04] [metric:scenario_node_ai_origin_count] |
| 大钟寺 / LIVE | 城市型智能经济、文化与国际交往街区 | 京张贡献档案馆、大钟寺城市客厅、活态遗产工作室、AI 原生商业空间 | S11、S12，并与 S09 遗产路线连接；扩大服务前须完成独立评估、消费者告知、申诉和退出安排 | [data:geometry/key_areas.geojson#PROV-KEY-003] [data:geometry/public_space.geojson#SCENARIO-S12] [metric:scenario_node_dazhongsi_count] |

## AI 创新生态、人才画像与 AI+ 场景

方案应建立面向AI人才和企业的空间需求画像，覆盖研发办公、开源协作、成果发布、企业服务、人才居住、社交学习、消费生活、运动休闲和国际交往。AI+场景应围绕公告提出的交通、服务、消费、医疗、教育、法律、生活服务等方向，形成产业发展场景和AI赋能城市功能场景。每个场景应说明服务对象、空间位置、数据来源、隐私边界、人工复核机制和运营主体。

V0.3 已把 12 个场景写入允许的 `public_space.geojson` 容器，其中 S01—S03 为产业测试验证场景 [data:geometry/public_space.geojson#SCENARIO-S01] [metric:scenario_node_count] [metric:industry_validation_scenario_count]。每个点都包含 `carrier_space_id`、`host_feature_ids`、`key_area_id`（适用时）、实施包、用户画像、运营角色、数据边界、人工复核、非 AI 备选、申诉通道和 `deployment_status=concept_only`；12/12 完成人工复核、空间载体和实施包映射 [metric:scenario_human_review_coverage_ratio] [metric:scenario_spatial_assignment_coverage_ratio] [metric:scenario_phase_assignment_coverage_ratio]。25 个去重 persona 标签服务于多主体测试，不代表人口统计画像或对个人作出的推断 [metric:persona_count]。

| 用户画像 | 典型需求 | 空间响应 | 自检边界 |
| --- | --- | --- | --- |
| 开源开发者 | 发布、协作、测试、社区声誉 | 原点社区开源发布厅、公共代码墙、夜间协作空间 | 不采集个人行为轨迹；活动数据只做聚合统计 |
| 初创团队 | 低成本办公、算力入口、产品试验场 | 众智园共享测试场、端侧算力服务点、标准治理咨询 | 算力和数据服务需另行授权 |
| 头部企业访客 | 展示、商务、国际接待、人才招聘 | 大钟寺国际路演客厅、轨道站点接驳、重点企业周边公共空间 | 企业标识和案例须清权 |
| 周边居民 | 通勤、休闲、社区服务、低扰动更新 | 京张遗址公园慢行环、社区服务嵌入、夜间照明和活动分级 | 不将居民画像用于商业推荐 |
| 高校师生 | 成果转化、跨校协作、日常慢行 | 校区-园区慢行缝合、成果转化驿站、AI教育体验点 | 校园数据和科研成果需授权 |

| 场景卡 | 生命周期 / 空间载体 | 设计说明与治理门槛 |
| --- | --- | --- |
| 01 模型与 Agent 安全沙盒（产业测试验证） | BUILD / TEST；众智园共享实验空间 | 红队、安全评测、审计与停止规则必须先于公开展示；不得把测试通过表述为监管批准 |
| 02 具身智能街区试验场（产业测试验证） | BUILD / TEST；受控室内外试验场 | 采用限定时段、地理围栏、现场管理员、事件日志和一键停机，正式位置待交通与权属核验 |
| 03 城市多模态评测实验室（产业测试验证） | TEST；AI 原点社区 | 与真实用户共同验证偏差、无障碍、误报和失败模式，结果进入公开可读的评测卡 |
| 04 AI City API 场景接入台 | TEST / LEARN；三片区公共服务界面 | 登记场景、数据用途、模型能力、人工复核、投诉申诉、停止回滚和版本号 |
| 05 公共服务导航助手 | TEST / LIVE；社区服务点 | 只辅助查找与办理引导，不替代资格或行政判断，并保留现场人工和非数字服务路径 |
| 06 包容性慢行协同助手 | TEST / LIVE；京张遗址公园及站点联系 | 以最小化感知支持无障碍与慢行绕行；不得建立居民商业画像 |
| 07 学习与职业协作工作室 | TEST / LIVE；AI 原点学习空间 | 提供可解释资源匹配与导师协作，不进行自动录取、就业资格或信用决策 |
| 08 健康服务导引助手 | TEST / LIVE；社区与交通节点 | 仅做服务导航和分级提示，不进行自主诊断；高风险情形转人工专业服务 |
| 09 京张活态遗产路线 | LIVE / LEARN；铁路遗产公共空间主轴 | 用可追溯史料、多语无障碍内容和公众纠错机制连接铁路工程史、中关村文化与 AI 新文化 |
| 10 低碳算力与能源观察站 | BUILD / LEARN；众智园基础设施展示节点 | 展示经测量的能耗与算力指标及不确定性，不虚构能源容量或减排绩效 |
| 11 AI 原生商业与创意市集 | LIVE；大钟寺公共与复合空间 | 对生成内容、来源和消费者界面进行清晰标识，保留人工服务并完成版权清权 |
| 12 城市议事与证据观察站 | LEARN / UPDATE；贡献档案馆与公共论坛 | 汇总运行证据、投诉、事件、独立评审和版本变更，支持决定“扩大、修改、暂停或终止” |

agent 生成的AI治理建议必须遵守数据最小化、公开来源、可解释和人工复核原则。城市智能体可以辅助识别慢行断点、公共空间热力、设施维护、企业服务需求和活动安全风险，但不能替代规划审批、不能输出未经授权的个人画像、不能声称获得官方实施承诺。所有AI场景节点应进入结构化图层或合规矩阵，便于评审者看到它们与产业、空间和公共利益之间的关系。

## 用地、建筑规模与拆改留方案

用地方案应依据国土空间调查、规划、用途管制分类等公开标准表达，形成完整、闭合、无缝的用地分区。建筑方案应区分保留、改造、更新、新建或待确认对象，明确建筑基底、功能、规模、风貌、屋顶、体量和高度控制的建议层级。若缺少现状建筑、权属、控规和工程条件，方案只能提出方法和待校准清单，不能编造拆改留结论。

用地分类依据 [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE]，建筑高度、体量、界面和风貌控制由 [depth:height_massing_character] 管理，拆改留方法由 [depth:retain_renovate_demolish] 管理。V0.3 的 12 个用地面仅是概念功能分区；6 个建筑面均标为 `conceptual_envelope=true` 和 `adaptive_reuse_or_lightweight_infill_subject_to_survey`。它们证明承载方法与空间兼容性，不证明现状建筑或拆改留决定；6/6 均列入待调查分类 [data:geometry/land_use.geojson#LU-BUILD-03] [data:geometry/buildings.geojson#BLDG-BUILD-001] [metric:building_action_pending_count]。

建筑规模和强度指标必须与 `metrics.json` 和图层一致。若总建筑规模、容积率、建筑高度、建筑密度、绿地率、退线和建筑控制线缺少官方条件，应在指标体系中列为 unknown 或 pending_control，不得用固定数值制造精确感。A3 文册应给出更新项目清单和指标复核表，A0 展板应把关键空间结构和重点片区表达清楚，HTML 页面应提供指标和图层联动查看。

## 交通、轨道、市政与公共服务设施

交通方案应回应公告对轨道站点一体化、道路微循环、慢行断点、对外交通、停车、非机动车停放和绿色交通系统的要求。重点应覆盖北五环、京张遗址公园跨环路节点、五道口、清华东路西口、大钟寺站及重点企业周边交通联系。道路和慢行图层应保持在提交边界内，并与公共空间、绿地、产业节点和重点片区相互校核；若提交边界为 provisional，交通结论也只能作为临时设计讨论。

交通和市政专业深度分别由 [depth:traffic_rail_slow_parking] 与 [depth:municipal_new_infrastructure] 约束；设计关系引用 [data:geometry/roads.geojson#ROAD-SPINE-001]、[data:geometry/roads.geojson#ROAD-INTERFACE-001] 和 [data:geometry/public_space.geojson#SCENARIO-S06]。`geometry/constraints.geojson` 当前有意保持空层，因为没有可核验、可清权的铁路线位、河道与防洪、道路红线、轨道出入口、权属、市政消防、文保或树木数据 [data:geometry/constraints.geojson]。因此“站城连接”“清河界面”等均是待核实的设计关系，不能读作已确认线位。

![交通慢行与蓝绿公共空间复合系统图](assets/figures/mobility-bluegreen.png)

市政和公共服务设施应覆盖AI产业服务设施、创新服务平台、人才生活服务设施、新型基础设施、分布式能源、端侧算力和传统市政设施融合。方案应说明设施标准、空间布局、服务半径、运营模式和分期实施逻辑。缺少管线、能源、排水、防洪、消防等工程资料时，应列为正式深化前置条件。

## 蓝绿空间、公共空间与城市风貌

蓝绿空间方案应以京张遗址公园活力带为骨架，统筹清河、小月河、周边高校、企业、社区出行需求，提出南北贯通、东西连通的步道、骑行道和绿色空间体系。方案应识别慢行断点、上跨环路节点、公园南端和北端景观节点，提出停车、体育、创新交往、科技测试、应用展示和公共服务复合利用策略。

蓝绿公共空间由设计深度项和绿地、公共空间图层共同校核 [depth:blue_green_public_space] [data:geometry/green_space.geojson#GREEN-BUILD-001] [data:geometry/public_space.geojson#PUBLIC-TEST-001]。绿地层由三个 1401 用地面直接派生，几何对称差为 0；绿地和公共空间比例在正文只解释设计意义，完整复算保存在 `metrics.json`。城市风貌、公共空间和建筑控制的统筹则回到专业标准矩阵 [standard:MOHURD-URBAN-DESIGN-MEASURES]。

城市风貌方案应融合京张铁路历史文化、中关村创新文化和AI创新文化，利用清华园火车站、北影等文化资源，提出城市基调、建筑风貌、屋顶形态、体量、界面和公共艺术引导。agent 还应提出导视标识、文化符号、国际传播叙事、AI朝圣地标、贡献墙或荣誉展示体系，但所有品牌、字体、图像、肖像和企业标识都必须有清权来源。风貌控制应分清官方管控、设计建议和待确认条件，严禁在没有文保或控规依据时给出伪精确控制线。

V0.3 提出三个相互关联、可供专业团队深化研究的 AI 公共地标。**协议零号站 / Protocol Station Zero** 位于北京 AI 原点社区的公共界面，负责让访客理解 AI 身份、数据用途、权利、人工复核与申诉入口；**城市智能试验场 / Civic AI Test Yard** 位于众智园，以可预约、可旁观、可审计的方式展示测试流程、失败模式与停止机制；**京张贡献档案馆 / Jing-Zhang Commons Ledger** 位于大钟寺重点区的概念公共界面，记录贡献者、协议版本、重要事件、纠错与失败教训，把“朝圣”从观看技术奇观转化为理解公共知识如何积累 [metric:landmark_count]。三处地标的具体位置、尺度、建筑方式和文保关系均待官方边界、权属、文保和工程条件补齐后深化 [source:AGENT-TASKBOOK] [depth:blue_green_public_space]。

## 更新项目清单、实施政策与分期计划

实施方案应形成可审查的更新项目清单，说明项目位置、类型、功能、责任主体、依赖条件、实施阶段、风险和评估指标。政策建议应覆盖城市更新统筹实施、空间供给、运营机制、产业服务、公共参与、数据治理和产权协同。`geometry/phasing.geojson` 应表达分期范围，`compliance_matrix.json` 应把每个任务与分期和图纸挂接。

项目清单和分期深度由 [depth:renewal_project_list] 与 [depth:phasing_implementation] 管理，分期空间证据为 [data:geometry/phasing.geojson#PHASE-001]。如果没有权属、资金、实施主体和审批路径，方案必须把它写成实施风险，而不是承诺落地。

| 项目编号 | 项目名称 | 概念实施包 | 主要依赖 / 进入门槛 | 证据引用 |
| --- | --- | --- | --- | --- |
| JZ-01 | 京张公共绿脊慢行断点缝合 | P1 公共绿脊与七接口先导 | 道路红线、桥下空间、无障碍与交通组织复核 | [data:geometry/roads.geojson#ROAD-SPINE-001] |
| JZ-02 | 众智园创新绿界与公开测试路线 | P1 公共绿脊与七接口先导 | 河道/生态/防洪条件、测试与旁观路线分离 | [data:geometry/green_space.geojson#GREEN-BUILD-001] |
| JZ-03 | 原点社区近校成果转化与复核站 | P2 西侧知识研发与专业验证 | 校区边界、权属、现状建筑调查、服务主体 | [data:geometry/buildings.geojson#BLDG-TEST-002] |
| JZ-04 | 大钟寺站城与四象限步行连接 | P3 东侧日常服务与城市扩散 | 轨道出入口、道路交叉口、市政管线与客流复核 | [data:geometry/roads.geojson#ROAD-LIVE-001] |
| JZ-05 | AI 公共服务与低碳算力观察节点 | P2 西侧知识研发与专业验证 | 能源、算力、安全、消防和运营主体；当前约束层为空 | [data:geometry/public_space.geojson#SCENARIO-S10] [data:geometry/constraints.geojson] |
| JZ-06 | 京张协议大会与公共体验路线 | P3 东侧日常服务与城市扩散 | 公共空间许可、独立评估、活动安全和版权清权 | [data:geometry/phasing.geojson#PHASE-003] |

V0.3 的三期不是“近期/中期/远期”工期承诺，而是三组可相互检验的依赖包：**P1** 先建立绿脊、七接口、人工替代与事件通道；**P2** 在权属、建筑调查、专业安全与交通条件核实后推进知识研发和验证空间；**P3** 只有在独立评估、申诉能力、互操作与退出计划得到证明后，才扩大日常服务和城市传播 [data:geometry/phasing.geojson#PHASE-001] [data:geometry/phasing.geojson#PHASE-002] [data:geometry/phasing.geojson#PHASE-003]。三面完整覆盖临时边界且零实质重叠 [metric:phase_coverage_ratio] [metric:phase_overlap_area_sqm]。

长期运营的核心不是重复举办科技节，而是让协议具有更新能力。V0.3 建议形成“季度场景开放日—半年证据审查—年度京张协议大会—持续版本日志”的节奏：开发者和运营方提交测试证据，居民与用户提出问题或申诉，专业团队评估空间、技术、法律与伦理影响，再公开说明某个场景为何扩大、修改、暂停或终止。年度大会可把全球案例、开源工具、失败复盘、贡献荣誉与下一版协议草案集中展示；这是一项运营概念，不代表主办方已确定活动、预算或政策安排 [source:AGENT-TASKBOOK] [depth:phasing_implementation]。

## 指标体系、面积复算与合规矩阵

V0.3 把指标分为三类：可由 GeoJSON 在 EPSG:4548 复算的设计指标；来自公告的近似范围数字；以及因缺少官方条件而保持 `unknown` 的法定/工程指标。任何设计值都不能升级为审定指标，任何 unknown 都不能用 0 或“平均值”填补 [depth:metrics_recalculation]。

| 证据状态 | 当前结果 | 解释边界 |
| --- | --- | --- |
| 公告近似值 | 统筹研究约 43.6 km²；总体设计约 11.4 km²；三重点区合计约 368.4 ha | 43.6 km² 无提交 polygon；三个范围层级不可互相替代 |
| 临时几何实算 | SITE-001 约 11.413 km²；用地与分期 coverage 1.0、实质 overlap 0 | 仅对临时粗略边界成立 [metric:site_area_sqm] [metric:land_use_coverage_ratio] [metric:phase_coverage_ratio] |
| 设计配置 | 绿地 22.459%；公共界面 3.7905%；概念线网约 24.15 km；6 个建筑承载原型 | 仅检验空间选择与连通逻辑 [metric:green_ratio] [metric:public_space_ratio] [metric:slow_mobility_length_m] |
| 场景与治理 | 12 个场景、3 个产业验证、7 类协议接口、3 个地标、6 个更新项目 | 数量可核，运营主体与授权尚待确认 [metric:scenario_node_count] [metric:industry_validation_scenario_count] [metric:protocol_interface_count] |
| 保持 unknown | 总建面、容积率、建筑密度、高度、退线、道路面积/比率 | 待官方控规、现状、权属、道路和工程资料 [metric:total_floor_area_sqm] [metric:floor_area_ratio] [metric:setback_m] |

![核心指标复算与证据链图](assets/figures/metrics-evidence.png)

合规矩阵是任务响应性的主控文件。每条公告任务和 agent_taskbook 任务必须对应到报告章节、图层、指标、图纸、HTML 页面、来源、假设和自检项。未能覆盖公告 1.3、1.4、1.5 或 agent.1-agent.6 的任一必选任务，方案不得进入 formal professional scoring。

正式深化时，agent 还应把每个指标分为三类：第一类是可由提交几何直接复算的空间指标，例如边界面积、绿地比例、公共空间比例、建筑基底面积和分期面积；第二类是需要官方控规或任务书附件支撑的管控指标，例如容积率、建筑高度、建筑密度、退线、道路红线和设施标准；第三类是需要运营或产业数据持续校准的绩效指标，例如 AI 创新指数、人才密度、产业服务满意度、慢行可达性、活动参与度和场景使用频次。三类指标应分别进入 `metrics.json`、`assumptions.json` 和 `compliance_matrix.json`，避免把运营愿景误写成审定规划条件。

## 风险、版权与合规说明

**要求双语言。** 方案主文件可使用中文或英文，但必须通过 `proposal.en.md` 或 `proposal.zh.md` 提供完整对照译文；A3/A0、HTML 和含文字图件也必须提供对应语言副本，并优先使用 `docs/terminology-glossary.md` 的赛事推荐译法。v2 包缺少任一必需译稿、语言映射或有效文件时，finalize 与 CI 会阻断提交。所有图片、图纸、图标、数据和代码资产必须在 `sources.json` 或 `report/copyright_statement.md` 中说明来源、许可和授权状态。HTML 页面不得加载远程脚本、远程地图瓦片、远程字体、iframe、表单或外部 API，不得跟踪评审者行为。

风险和缺资料清单由风险深度项、空的约束图层和场地包共同校核 [depth:risk_missing_data] [data:geometry/constraints.geojson] [source:SITE-PACKAGE]。`missing_data_checklist.csv` 中列出的 official boundary、key area、控规、道路、地块、建筑、市政、文保和公共服务缺口均进入 `assumptions.json`、自检和正文风险章节。任何缺少官方控规、道路红线、权属、市政、消防或文保条件的结论，都降级为待确认事项；完整专业核对保存在标准矩阵中。

本方案不声称官方批准、审定控规、最终土地权属、最终建设规模或保证实施。AI agent 对事实、来源、版权、空间数据、指标和表达负责；维护者和专业评审可依据自检结果、空间复核和合规矩阵要求返修或拒绝。V0.5 已完成本地 review-ready 正式包、双语清单映射与完整自检；官方/专业资料缺口继续作为深化前提，不被伪装成已知条件。本版本仅保存在本机，尚未推送或创建正式 PR。

## 参考资料

- brief/public-brief.md
- brief/site-package/design_brief.json
- brief/site-package/allowed_design_space.json
- brief/site-package/enums/
- brief/site-package/ranges/planning_limits.json
- data/processed/agent_fact_pack.md
- data/processed/project_scope_summary.csv
- data/processed/agent_task_requirements.csv
- data/processed/source_use_matrix.csv
- data/processed/missing_data_checklist.csv
- 完整机器索引：见 `sources.json`、`metrics.json`、`compliance_matrix.json`、`standard_matrix.json` 与 `design_depth_matrix.json`
- 本节书目入口依据场地包登记，完整出处和许可见结构化来源清单 [source:SITE-PACKAGE]
