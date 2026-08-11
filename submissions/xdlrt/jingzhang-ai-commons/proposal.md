---
title: "京张智脉：一条可学习、可验证、可共同治理的 AI 公共知识带"
author_github: "xdlrt"
language: "zh"
translation_file: "proposal.en.md"
license: "CC-BY-4.0"
summary: "以百年京张铁路遗产为公共知识脊柱，用一脊三站、双环六缝、十二个可退出的 AI 场景，把海淀的科研、产业、社区与公共生活组织成可验证、可滚动修编的城市创新共同体。"
tracks: ["ai-traffic-walkability", "enterprise-services-ecosystem", "civic-agent-governance"]
scenarios: ["ai-traffic-walkability", "enterprise-service-copilot", "public-safety-operations-review"]
version: "1.0.0"
---

# 京张智脉：一条可学习、可验证、可共同治理的 AI 公共知识带

## 设计依据与资料清单

本方案参加的是 open-city.ai 发起的独立社区 AI Agent 开源征集，不是原政府主办国际方案征集的官方报名或应征通道。方案以官方资格预审公告确定的项目名称、三层范围、设计目的和任务为主控依据，以面向智能体任务书补充的三大定位、五大功能、三区两翼与六项任务为共创依据，以仓库标准快照、来源登记表和处理事实包为证据导航。[source:OFFICIAL-ANNOUNCEMENT] [source:AGENT-TASKBOOK] [source:SITE-PACKAGE] [source:SOURCE-REGISTRY] [source:PROCESSED-FACT-PACK] [standard:PROJECT-OFFICIAL-ANNOUNCEMENT] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]

当前资料存在决定性的空间精度限制：仓库尚未获得 official `SITE_BOUNDARY` 和三个 official `KEY_AREA` polygon。本包原样采用仓库临时粗略 polygon，只用于结构化生成、拓扑自检、内容评审和设计讨论；它不是 official redline，不支撑审批、权属、法定控制或精确面积结论。[source:BOUNDARY-SOURCE] [source:KEY-AREA-SOURCE] [data:geometry/site_boundary.geojson#SITE-001] [data:geometry/key_areas.geojson#PROV-KEY-001]。临时范围投影复算值为 [metric:site_area_sqm]，只表示本提交的计算范围；公告“约 11.4 平方公里”仍是任务层面的官方文字面积。official polygons 到位后，必须整体重算用地、建筑探针、道路、绿地、公共空间、分期和全部指标。

现状诊断因此采用“可确认事实—设计假设—待补数据”三栏法：可以确认三层工作范围、三重点区名称与公告面积、任务目标和专业原则；可以提出公共脊柱、功能接口、场景节点和运营协议等概念建议；不能确认道路红线、宗地权属、现状建筑、控规指标、文保控制线、市政容量与工程可行性。缺口统一进入 `assumptions.json` 与约束图层 [data:geometry/constraints.geojson#CONSTRAINTS-001]，并由 [depth:existing_conditions_diagnosis] 和 [depth:risk_missing_data] 管理。城市设计原则遵守以人为本、历史文化传承、公共空间塑造与规划边界清晰的要求。[standard:MOHURD-URBAN-DESIGN-MEASURES] [standard:MOHURD-CONTROL-DETAILED-PLANNING]

![总体概念、临时边界和空间语法图](assets/figures/site-overview.png)

## 三层范围工作框架

方案把三个尺度理解为一条连续的决策链，而不是三套互不相干的图纸。43.6 平方公里统筹研究范围回答“怎样形成世界级 AI 创新生态和未来城市机制”；约 11.4 平方公里总体设计范围回答“怎样把机制翻译成空间结构、更新项目、交通市政与公共生活”；三处重点区回答“怎样以可见、可运营、可评估的节点验证机制”。三层之间以同一套任务矩阵、来源、假设和指标传导。[depth:three_level_scope_framework] [depth:overall_spatial_structure] [data:geometry/site_boundary.geojson#SITE-001]

总体概念为“一脊三站、双环六缝、十二场景”。“一脊”是京张 AI 公共知识脊柱，把铁路遗产、连续慢行、贡献展示、公共学习和可审计 AI 服务放在同一公共界面；“三站”是众智园可信全栈站、AI 原点开源转化站、大钟寺智能业态站；“双环”是西侧科研生活环和东侧产业服务环；“六缝”是跨越京张走廊、连接社区—园区—校区的六道东西公共联系；“十二场景”是可进入、可退出、可审计的 AI 场景节点。空间关系记录于 [data:geometry/roads.geojson#ROAD-001]、[data:geometry/public_space.geojson#SCENARIO-001] 和 [metric:scenario_node_count]。

品牌主名为“京张智脉”，英文名为 **Jing-Zhang AI Commons**。名称强调 commons 不是“技术园区”，而是共同生产知识、共同验证技术、共同治理风险的公共制度。识别符号建议以“两条铁路平行线 + 一对开源花括号”构成：平行线指向百年京张，花括号表示开源代码与共同规则；红色是铁路信号，青色是公共验证状态，黄色标记可参与节点。命名子体系包括 Commons Line（空间）、Commons Lab（测试）、Commons Walk（公众路线）、Commons Week（年度活动）和 Commons Mark（贡献/荣誉记录）。这套视觉方向为原创几何语言，不使用企业商标、人物肖像或未经授权图形，后续可由专业品牌团队深化。

![完整用地分区、公共脊柱与五类城市接口图](assets/figures/land-use-structure.png)

## 统筹研究范围产业与未来城市研究

统筹范围的产业逻辑不是简单“把企业聚到一条带上”，而是组织六个循环：高校与研究机构产生知识，开源社区降低协作门槛，中试与验证把知识变成可复核原型，企业与公共部门形成真实问题，城市体验收集匿名、聚合的反馈，贡献记录再回到人才声誉与下一轮研究。众智园负责“规则—测试—治理”，AI 原点负责“研究—开源—转化”，大钟寺负责“产品—体验—国际协作”，两翼分别提供科技服务和城市场景。所有产业建议都是机制与空间接口建议，不含企业入驻、产值、投资或财政承诺。[source:AGENT-TASKBOOK] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]

六个全球案例仅作为 `background_only` 的机制参照，不用于本项目边界、用地或控制指标：① Cambridge Kendall Square 显示创新核心需要住房、餐饮、街道和邻里公共利益共同支撑，转译为“创新区必须有公共回报”；② Singapore one-north/LaunchPad 显示模块化空间、孵化器、资本与试验场可在同一片区联动，转译为“空间供给按成长阶段变化”；③ Paris-Saclay 把科研、孵化、开放创新和年度活动连接为网络，转译为“活动不是宣传，而是持续撮合机制”；④ Helsinki Maria 01 将旧医院适应性再利用为创业共同体，转译为“存量建筑可先运营、后建设”；⑤ Seoul AI Hub 将人才、算力、初创支持、验证和全球协作组合为公共平台，转译为“公共部门提供可验证的基础能力”；⑥ Toronto Vector Institute 把研究、人才与企业采用连接起来，转译为“人才服务必须通向真实项目而非停留在培训”。[source:CASE-KENDALL] [source:CASE-ONE-NORTH] [source:CASE-PARIS-SACLAY] [source:CASE-MARIA01] [source:CASE-SEOUL-AI-HUB] [source:CASE-VECTOR]

面向未来的城市形态以“可学习、可验证、可共同治理”为三条性能线。可学习意味着公共空间、首层界面和活动体系允许跨机构交流；可验证意味着产业试验有边界、指标、退出条件与人工复核；可共同治理意味着居民、开发者、企业与专业团队能查看目标、风险、数据用途和阶段性结果。方案以开放空间而不是封闭园区作为基础设施，以可逆更新而不是一次性大拆大建作为适应方式，以场景运营协议而不是未经核验的硬件堆叠作为 AI 原生性。这一框架可供后续产业规划、国土空间规划和运营团队共同深化，不替代任何法定规划。

## 总体设计范围城市更新与控规深度城市设计

总体设计以公共脊柱优先组织空间：中部的 `1401` 概念公共绿地连接南北，左右两侧按六个城市接口配置科研中试、开源转化、社区服务、文化公共知识和智能原生业态。用地面由同一边界切分生成，完整覆盖临时提交范围且无缝、无重叠；用地代码遵守仓库提供的国土空间分类子集，但只是方案功能建议，不代表已批用地性质。[standard:MNR-LAND-USE-CLASSIFICATION-GUIDE] [depth:land_use_layout] [data:geometry/land_use.geojson#LU-001] [metric:land_use_area_0802_sqm] [metric:land_use_area_05_sqm] [metric:land_use_area_0702_sqm] [metric:land_use_area_1401_sqm]

城市更新采用“三层可逆度”。第一层是无需改变法定条件即可讨论的运营与轻设施，如临时展陈、贡献标记、活动路线和预约式测试；第二层是需核验权属、现状建筑与消防条件的首层开放、院落共享和适应性再利用；第三层是必须取得 official 控规、道路、市政、文保和审批条件后才能深化的建筑、桥隧或大尺度工程。`buildings.geojson` 中的 35 个建筑基底是体量与公共界面探针，不是现状建筑调查、拆改留结论或获批规模。[data:geometry/buildings.geojson#BLDG-001] [metric:building_probe_count] [metric:building_footprint_area_sqm] [metric:building_density]

建筑与街区建议坚持“小单元、共享首层、可变内部、清晰后勤”。科研与中试单元需要可分合空间、设备共享和安全分区；转化与社区单元需要开放首层、法务/IP/人才服务；文化与商业单元需要延续铁路工业尺度与可步行界面。高度、容积率、法定建筑密度、退线、日照、消防和停车均保持 unknown，体量风貌只表达“低扰动、街墙连续、屋顶可利用、遗产节点留白”的原则性方向。[depth:development_intensity_controls] [depth:height_massing_character] [depth:retain_renovate_demolish] [standard:MOHURD-ARCH-DESIGN-DEPTH-2016]

## 重点区域详细设计

三重点区采用“规则—空间—运营—触发条件”四格表达，并全部以 provisional polygon 为临时索引。[depth:three_key_area_detailed_design] [data:geometry/key_areas.geojson#PROV-KEY-001] [data:geometry/key_areas.geojson#PROV-KEY-002] [data:geometry/key_areas.geojson#PROV-KEY-003] [metric:key_area_count]

**众智园 / 可信全栈站。** 概念建议形成“治理沙盒—端侧算力驿站—清河创新界面”三节点。治理沙盒面向模型安全、标准与红队测试，强调预约、隔离和结果分级公开；端侧算力驿站展示能源、算力与隐私的可审计关系；清河界面把低碳、步行、交流和技术展示叠合。空间上先形成公共绿指和共享测试庭院，再讨论建筑更新。深化触发条件包括 official 片区边界、河道蓝线、防洪、现状建筑、权属和对外交通资料；在这些条件缺失时，不给出建设规模或工程线位。

**北京 AI 原点社区 / 开源转化站。** 概念建议形成“开源发布厅—近校成果转化街—人才共居服务”。发布厅记录代码、数据集、标准和社会贡献；成果街串联原型展示、知识产权、法务、伦理和产品验证；人才服务同时面向研究者、开发者、创业者、家庭与周边居民。空间上以六道东西联系中的中部两道缝合校区、园区和街区，优先改善可步行界面。任何校园边界、建筑再利用和轨道站点一体化建议都须在权属、消防、交通和控规资料补齐后由专业团队深化。

**大钟寺 / 智能业态站。** 概念建议形成“国际路演客厅—数据授权会客厅—四象限步行接口”。路演客厅服务智能体、智能终端、内容与城市服务原型，数据授权会客厅让公众和企业看见数据用途、期限、撤回与审计机制；四象限步行接口只表达需要被解决的连通关系，不构成桥隧、道路或轨道工程方案。先以首层公共界面、非机动车秩序和活动编排测试需求，再依据 official 道路红线、站点条件和市政管线深化。

![三重点区定位、设计判据与临时边界状态图](assets/figures/key-areas.png)

## AI 创新生态、人才画像与 AI+ 场景

六类用户画像决定空间与运营：开源开发者需要可信发布、协作和贡献声誉；高校师生需要成果转化、跨校交流和低门槛原型测试；初创团队需要弹性空间、算力入口、法务/IP 和真实场景；成长企业需要人才、国际合作和合规验证；周边居民与一线服务人员需要可达公共空间、低扰动活动、明确申诉渠道；国际访客需要一条能看懂京张历史、海淀创新与 AI 治理的公共路线。任何用户画像都不通过个人追踪或商业画像生成，运营只使用主动参与和匿名聚合数据。[data:geometry/public_space.geojson#SCENARIO-001]

十二张场景卡及其空间—运营映射如下。SC-02、SC-03、SC-07 是三项产业测试验证场景；其余为公共学习、交通、文化、服务与治理场景。所有场景都必须有明确运营主体、数据责任人、人工复核人、试点期限和退出条件，且不得把未成熟技术写成已全面部署。[metric:industry_test_scenario_count]

| ID | 场景 | 服务对象 | 空间载体 | 运营与治理边界 |
| --- | --- | --- | --- | --- |
| SC-01 | 开源发布厅 | 师生、开发者 | AI 原点社区 | 公开成果、授权核验、人工编辑 |
| SC-02 | 模型安全治理沙盒 | 研发团队、治理研究者 | 众智园 | 隔离测试、风险分级、结果可审计 |
| SC-03 | 端侧算力驿站 | 初创团队、公共服务者 | 众智园 | 用途限定、能耗披露、数据不出域优先 |
| SC-04 | 可解释慢行导航 | 居民、访客 | 京张公共脊柱 | 匿名聚合、可关闭、不做人脸识别 |
| SC-05 | 国际路演客厅 | 企业、合作机构 | 大钟寺 | 清权材料、非招商承诺、双语解释 |
| SC-06 | 清河低碳创新廊 | 居民、科研团队 | 众智园 | 生态约束优先，不替代环境评估 |
| SC-07 | 近校成果转化街 | 师生、初创团队 | AI 原点社区 | IP 授权、真实问题、人工专业服务 |
| SC-08 | 数据授权会客厅 | 企业、公众 | 大钟寺 | 明示同意、用途/期限限定、可撤回 |
| SC-09 | AI 生活服务样板街 | 居民、服务人员 | 沿线社区 | 不做个人商业推荐，保留人工窗口 |
| SC-10 | 百年京张贡献站 | 公众、开发者 | 遗产脊柱 | 来源可追溯、异议与纠错通道 |
| SC-11 | 无障碍共创工坊 | 残障人士、照护者 | 原点社区 | 参与式设计，辅助技术不得替代照护 |
| SC-12 | 城市运维透明窗 | 居民、维护人员 | 沿线节点 | 只公开聚合指标，建议可申诉、可撤销 |

## 用地、建筑规模与拆改留方案

用地结构不是以“最大开发量”为目标，而是以公共脊柱两侧的五类城市接口形成均衡：科研中试承接全栈研发，开源转化连接高校与企业，社区服务支撑人才日常，文化公共知识保存京张与中关村记忆，智能原生业态连接产品体验和国际交流。每个分区都保持可转换的首层与院落接口，避免用单一封闭园区切断公共生活。用地面积由统一拓扑分区复算，方案不将这些概念比例写成法定指标。[data:geometry/land_use.geojson#LU-001] [metric:land_use_area_0802_sqm]

建筑策略不是对现状逐栋判定，而是建立后续调查的决策树：先核验文保与安全，再核验结构与能耗，再核验产权和使用需求，最后比较保留、修缮、适应性再利用、局部增补与新建的全生命周期成本。缺任何一环，都不能下“拆”或“建”的结论。当前 35 个可逆院落仅测试开敞空间比例、公共界面连续性和功能分布；概念建筑基底面积 [metric:building_footprint_area_sqm] 与概念密度 [metric:building_density] 不代表现状或审定控制。[data:geometry/buildings.geojson#BLDG-001]

风貌建议建立“三种时间纹理”：铁路遗产使用克制的红褐钢、砖和可读构造；中关村创新文化使用可改装的模块、开放工坊和贡献展示；AI 新文化使用显示数据来源与运行状态的透明界面，而不是霓虹化“未来感”。建筑高度和天际线只提出“遗产节点留白、公共脊柱两侧形成有节奏的低—中尺度界面、重点门户可识别”的概念方向。正式高度、体量和屋顶控制必须来自 official 控规、文保、景观和安全资料。

## 交通、轨道、市政与公共服务设施

交通概念由一条主线、两条回游环和六道东西缝合组成：京张遗产慢行主线承担连续步行、骑行、文化与场景体验；西环连接科研、社区和高校日常；东环连接产业、商务与轨道服务；六道横向联系把“到公园”升级为“穿过公园去日常目的地”。本次提交的概念中心线总长为 [metric:conceptual_mobility_length_m]，只是连通关系和任务量的量化，不是道路红线或工程线位。[depth:traffic_rail_slow_parking] [data:geometry/roads.geojson#ROAD-001]

轨道站点策略采用“先步行、再换乘、后建设”。先通过导视、首层开放、遮阴休息和非机动车秩序减少换乘摩擦；再用公开、匿名的步行观察评估需求；只有 official 站点、道路、市政与安全资料齐全后，才讨论站城一体化或工程改造。大钟寺四象限、五道口与清华东路西口的名称来自任务要求，但本方案不提供桥隧、出入口或施工结论。

市政与新型基础设施采用“可见的服务栈”：底层是供电、通信、排水、消防与无障碍等传统保障，中层是端侧算力、设备共享、预约和身份授权，上层是公共场景与运营；每层都应显示责任主体、服务水平、故障模式和人工兜底。算力驿站优先研究余热、能耗披露与边缘处理，但能源负荷和容量保持待核。公共服务设施以“复合共享 + 人工窗口保留”为原则，服务清单可先形成，规模与服务半径须在设施底数补齐后由专业团队深化。[depth:municipal_new_infrastructure]

![六道缝合、双环回游、场景节点与数据治理原则图](assets/figures/mobility-bluegreen.png)

## 蓝绿空间、公共空间与城市风貌

蓝绿系统把京张走廊作为连续生态慢行脊，并在众智园、AI 原点和大钟寺形成三道横向“知识绿指”。绿指不是装饰绿化，而是把清河/城市生态、开放测试、社区休息和公共交流放在同一断面中。提交中的设计绿地面积和比例为 [metric:green_space_area_sqm]、[metric:green_ratio]，仅由概念图层与临时边界复算，不等于 statutory 绿地率；正式方案必须叠加河道、绿线、文保、海绵城市和树木调查。[depth:blue_green_public_space] [data:geometry/green_space.geojson#GREEN-001]

十二个 AI Commons 节点形成小而密的公共空间网络，union 面积与比例为 [metric:public_space_area_sqm]、[metric:public_space_ratio]。每个节点采用同一组件库：可关闭的低功耗显示、无需手机也能读取的实体说明、人工服务按钮、数据用途牌、无障碍坐席、可移动遮阴和可替换展陈。组件先以轻量、可逆方式试点，再依据使用反馈决定保留、移动或撤除。[data:geometry/public_space.geojson#PUBLIC-001]

文化叙事以“轨道—计算—共同体”三章展开：第一章讲京张铁路如何组织速度、时间与现代城市；第二章讲中关村如何以科研、教育和创业组织创新；第三章讲 AI 时代如何把模型、数据与人的判断重新置于公共规则下。三处 AI 朝圣/荣誉节点作为概念建议：众智园“可信之门”展示公开标准与测试方法，AI 原点“零号贡献站”记录可核验的开源和公共贡献，大钟寺“百年—未来信号台”把铁路信号语言转成技术状态、责任与国际协作展示。荣誉展示只记录经授权、可追溯、可纠错的贡献，不做商业排名或个人崇拜。

## 更新项目清单、实施政策与分期计划

项目清单以“触发条件先于时间表”为原则。JZ-01 公共脊柱轻量试点需公共空间许可与数据治理规则；JZ-02 众智园可信全栈花园需 official 片区、河道与交通条件；JZ-03 原点社区开源转化街需权属、校园边界和控规条件；JZ-04 大钟寺步行织补需道路红线、轨道与市政复核；JZ-05 沿线可逆更新院落需现状建筑调查与专业安全评估；JZ-06 全球 AI Commons 运营需公开合作机制、活动许可和绩效评估。每一项目都可拆成“研究—轻量试点—独立评估—专业深化—滚动修编”，不承诺建设、投资或政府安排。[depth:renewal_project_list]

空间分期由 [data:geometry/phasing.geojson#PHASE-001] 表达，共 [metric:phase_count] 期。近期优先公共脊柱、导视、贡献展示和可退出场景，验证公共价值与运营能力；中期在 official polygons、控规、权属、文保和市政资料补齐后深化三重点区；远期依据真实绩效与公众参与织补沿线街区。各阶段 polygon 是方案管理分区，不是行政实施边界或确定开发时序。[depth:phasing_implementation]

长期运营建议建立 **Commons Protocol**：所有场景公布问题、数据、模型、人工责任、退出条件和评估结果；开发者社区通过月度开放问题、季度原型评审和年度贡献归档持续运转；年度 **Jing-Zhang AI Commons Week** 由开放实验、城市体验、治理论坛、开发者维护日和国际协作日组成；三站之间形成公众步行路线和专业访问路线；通过“问题发布—原型验证—公共反馈—合规复核—空间/产业转化”形成招引转化机制。它是一套可供运营团队深化的参考方案，不是已确定活动或政策承诺。

## 指标体系、面积复算与合规矩阵

指标分三类。第一类是可由提交几何直接复算的“包内指标”：临时设计范围 [metric:site_area_sqm]，科研、商业、社区服务和公共绿地分区面积 [metric:land_use_area_0802_sqm] [metric:land_use_area_05_sqm] [metric:land_use_area_0702_sqm] [metric:land_use_area_1401_sqm]，建筑探针面积与概念密度 [metric:building_footprint_area_sqm] [metric:building_density]，设计绿地与公共空间 [metric:green_space_area_sqm] [metric:green_ratio] [metric:public_space_area_sqm] [metric:public_space_ratio]，概念慢行网络 [metric:conceptual_mobility_length_m]，场景、测试、建筑探针、重点区和分期数量 [metric:scenario_node_count] [metric:industry_test_scenario_count] [metric:building_probe_count] [metric:key_area_count] [metric:phase_count]。这些值全部使用同一套 GeoJSON，在 EPSG:4548 投影复算。[depth:metrics_recalculation]

第二类是必须保持 unknown 的法定/工程指标：总楼面面积、容积率、建筑高度、法定建筑密度、退线、道路红线、市政容量、消防和文保控制；它们没有 official attachments 时不应被“合理推测”。第三类是运营绩效指标：参与覆盖、无障碍满意度、场景退出率、人工复核响应、开源贡献、原型转化和公共问题解决率；这些需在试点前公布口径，运行后按隐私保护原则采集，不能现在伪造目标值。

`compliance_matrix.json` 已逐条覆盖公告 1.3、1.4、1.5 与 agent.1—agent.6，`standard_matrix.json` 覆盖强制专业标准，`design_depth_matrix.json` 把十五项设计深度映射到正文、图层、图纸、指标、来源、假设与自检。图面、HTML 与 PDF 是解释层，GeoJSON、metrics 与矩阵是可复核证据层；两者不一致时应以结构化证据为准并返修。

![核心指标、未知项与证据链关系图](assets/figures/metrics-evidence.png)

## 风险、版权与合规说明

最大风险不是“方案不够精确”，而是用临时资料制造伪精确。本包明确保留 official boundary、key areas、控规、道路、地块、建筑、文保、市政和公共设施底数九类缺口；任何空间落地建议均为概念建议、参考方案或可供专业团队深化研究，不替代法定规划，不构成政府审定、权属、投资、建设或活动承诺。[data:geometry/constraints.geojson#CONSTRAINTS-001] [depth:risk_missing_data]

AI 风险以五条底线控制：不做人脸识别与个人轨迹，不默认采集个人数据，不用黑箱分数替代公共服务资格，不让模型替代规划审批或专业安全判断，不把试点锁定给特定供应商。每个场景都必须支持主动选择、最小采集、边缘处理优先、人工复核、申诉与撤回；对儿童、老年人、残障人士和数字弱势群体保留非数字渠道。涉及公共安全的建议只做辅助提示，责任仍由有资质的人类与机构承担。

本提案文本、原创图解、结构化设计数据与离线展示以 `CC-BY-4.0` 许可发布；引用的官方公告、标准快照、仓库 provisional geometry 和外部案例页面仍各自遵循原来源条件。五张 PNG、PDF 和 HTML 均由 Codex 基于本包 GeoJSON、metrics、矩阵与文字生成；未使用远程地图瓦片、商业地图截图、企业 logo、人物肖像或第三方渲染图。生成方式、字体与资产边界详见 `report/copyright_statement.md`。提交者对事实、引用、版权和最终表达负责。

## 参考资料

- 项目任务与规则：[source:OFFICIAL-ANNOUNCEMENT]、[source:AGENT-TASKBOOK]、[source:SITE-PACKAGE]、[source:SOURCE-REGISTRY]、[source:PROCESSED-FACT-PACK]。
- 临时空间资料：[source:BOUNDARY-SOURCE]、[source:KEY-AREA-SOURCE]；仅供 intake 生成、自检和可视化。
- 专业依据：[standard:PROJECT-OFFICIAL-ANNOUNCEMENT]、[standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]、[standard:MOHURD-URBAN-DESIGN-MEASURES]、[standard:MOHURD-CONTROL-DETAILED-PLANNING]、[standard:MNR-LAND-USE-CLASSIFICATION-GUIDE]、[standard:MOHURD-ARCH-DESIGN-DEPTH-2016]。
- 全球机制参照（仅 background）：[source:CASE-KENDALL]、[source:CASE-ONE-NORTH]、[source:CASE-PARIS-SACLAY]、[source:CASE-MARIA01]、[source:CASE-SEOUL-AI-HUB]、[source:CASE-VECTOR]。
- 可读证据索引：[data:geometry/site_boundary.geojson#SITE-001]、[data:geometry/key_areas.geojson#PROV-KEY-001]、[data:geometry/land_use.geojson#LU-001]、[data:geometry/buildings.geojson#BLDG-001]、[data:geometry/roads.geojson#ROAD-001]、[data:geometry/green_space.geojson#GREEN-001]、[data:geometry/public_space.geojson#PUBLIC-001]、[data:geometry/constraints.geojson#CONSTRAINTS-001]、[data:geometry/phasing.geojson#PHASE-001]。
- 设计深度索引：[depth:existing_conditions_diagnosis] [depth:three_level_scope_framework] [depth:overall_spatial_structure] [depth:land_use_layout] [depth:development_intensity_controls] [depth:height_massing_character] [depth:retain_renovate_demolish] [depth:traffic_rail_slow_parking] [depth:municipal_new_infrastructure] [depth:blue_green_public_space] [depth:three_key_area_detailed_design] [depth:renewal_project_list] [depth:phasing_implementation] [depth:metrics_recalculation] [depth:risk_missing_data]。
