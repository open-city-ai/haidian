---
title: "AI公地协议 · 百年京张AI创新带城市设计"
author_github: "Elong-svg"
language: "zh"
translation_file: "proposal.en.md"
license: "COMMUNITY-DISPLAY-ONLY"
summary: "以 AI 公地协议为总体命题，以一条公共价值主轴串联知识、协议、应用三处公地，用三条生活副轴把创新带转译为可使用、可解释、可反馈的日常城市体验。"
tracks: ["ai-origin-community", "enterprise-services-ecosystem", "civic-agent-governance"]
iteration: "v0.2"
---

# AI公地协议 · 百年京张AI创新带城市设计

## 设计依据与资料清单

本方案的主命题是“AI公地协议 / AI Commons Protocol”：AI 不只作为园区效率工具或展示内容，而是成为可以被使用、理解、反馈、复核和撤回的城市公共基础设施。方案以本次百年京张AI创新带开源征集公告、面向智能体任务书和维护者登记的 site package 为依据，使用公开、已登记和可追溯的资料，不将概念愿景写成已批准的规划条件。[source:OFFICIAL-ANNOUNCEMENT] [source:AGENT-TASKBOOK] [source:SITE-PACKAGE] [source:SOURCE-REGISTRY]

当前提交包中的总体边界与三处重点区均为任务包提供的 provisional rough polygons。它们保留 `official_boundary=false`、`geometry_role=provisional_constraint` 和来源链，只用于 AI 方案生成、展示、临时自检与设计讨论，不能作为 official redline、审批依据、法定控制结论或精确面积依据。[source:BOUNDARY-SOURCE] [source:KEY-AREA-SOURCE] [data:geometry/site_boundary.geojson#SITE-001] [data:geometry/key_areas.geojson#PROV-KEY-001] [depth:risk_missing_data]

资料使用分成三层：第一层是公告、任务书和标准，用来确定目标、范围和成果深度；第二层是 site package 中的边界、重点区、枚举、范围、来源和缺资料清单，用来建立机器可读证据链；第三层是本方案派生的 GeoJSON、指标、场景和版面，用来表达设计判断。`data/processed/agent_fact_pack.md` 只负责导航，不升级任何事实等级。[source:PROCESSED-FACT-PACK] [standard:PROJECT-OFFICIAL-ANNOUNCEMENT] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]

本包采用 `COMMUNITY-DISPLAY-ONLY` 许可，供开源征集展示与评审使用。正式深化前需要补充官方边界、道路红线、文保、市政、现状建筑、权属、工程和控规条件；缺失条件在 `assumptions.json`、`self_check.json`、图纸、HTML 和下文中重复披露。[standard:MOHURD-URBAN-DESIGN-MEASURES] [standard:MOHURD-CONTROL-DETAILED-PLANNING] [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE]

## 三层范围工作框架

方案把征集要求转译为三个互相回流的尺度，而不是把创新带理解为一条孤立景观带。[depth:three_level_scope_framework] [data:geometry/site_boundary.geojson#SITE-001] [metric:site_area_sqm] [standard:PROJECT-OFFICIAL-ANNOUNCEMENT]

- **统筹研究范围：百年京张文化带。** 研究京张铁路记忆、海淀高校与科研网络、中关村创新文化、AI 产业服务和公共生活之间的关系，形成“文化记忆—创新源头—公共协议—日常应用”的城市叙事。该层回答为什么在这里做、与周边创新网络如何协同，并把北纬社区、未来科学城、怀柔科学城、经开区及京津冀协同作为合作方向，而不是未经核实的项目承诺。
- **总体设计范围：AI创新带公共回路。** 在暂代范围内建立“一主轴，三副轴，两翼，三处公地”的结构。一主轴是公共价值回路，三副轴分别表达知识、协议和生活，两翼是中关村科技服务翼与小月河场景赋能翼；用地、建筑基底、慢行、蓝绿和分期作为可复核的设计层。
- **重点区域：三处公地。** 北端众智园AI自主创新加速区作为知识公地，中部北京AI原点社区作为协议公地，南端大钟寺AI产业聚集区作为应用公地。三处范围目前均为 provisional，重点是提出角色、空间接口、场景和运营关系，不能把矩形暂代范围解释为地块或道路红线。[data:geometry/key_areas.geojson#PROV-KEY-001] [data:geometry/key_areas.geojson#PROV-KEY-002] [data:geometry/key_areas.geojson#PROV-KEY-003] [metric:key_area_count]

这三个尺度对应“研究—组织—体验”的闭环：统筹层建立创新带的公共叙事与区域协同，总体层把叙事落到用地和回路，重点区层把回路变成可以学习、评测、消费、休息和反馈的日常动作。[depth:overall_spatial_structure] [depth:three_key_area_detailed_design]

## 统筹研究范围产业与未来城市研究

### 三大定位与五大功能

本方案承接任务书要求的三大定位：**百年京张文化带、都市AI生活体验带、AI融合创新带**。对应的五大功能是：**AI全栈自主创新体系、世界级AI创新生态、AI+场景赋能新范式、智能化AI活力城市、AI治理全球话语权**。这些是设计目标与工作框架，不是对现状产业规模、企业名单、投资额或政府政策的事实宣称。[source:AGENT-TASKBOOK] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]

三大定位通过两翼和三处公地转化为一条创新回路：中关村科技服务翼提供科研转化、企业服务、算力与数据治理的组织接口；小月河场景赋能翼把这些能力导入街区、公共空间、消费、慢行和照护。知识公地产生方法，协议公地审查方法，应用公地让方法被日常使用，使用反馈再回到知识端。

### AI创新生态图谱与空间映射

生态图谱采用八个要素节点：**土地、空间、产业、资金、人才、算力、数据、场景**。不预设具体供应商，而是为专业团队预留可替换的接口：土地与空间提供开放底盘；产业与人才通过共享实验、学习和路演进入；算力与数据必须在安全、低敏、可撤回的边界内服务；场景以公共体验和产业测试承接验证；资金与政策只提出协同机制，不写成已确定安排。[depth:existing_conditions_diagnosis] [depth:land_use_layout] [metric:building_footprint_area_sqm]

空间映射如下：众智园侧重“源头—实验—学习—转化”；AI原点社区侧重“标准—评测—安全—公共讨论”；大钟寺侧重“接驳—市集—商务—生活服务”。一主轴把三个节点串成公共价值回路，三条副轴将每个节点的能力导入街区。

### 6个全球案例镜像（方法参照，不复制事实）

下列案例只用于方法比较，不把他地的组织关系、指标、企业、财政或审批条件移植为本项目事实。正式深化时应补充原始链接、访问日期和清权记录；本方案只提取“如何组织创新与公共空间”的可复用机制。

- **赫尔辛基开放城市实验：** 以城市问题为题面，将政府、研究、开发者和居民组织到可验证的试点流程中；本方案对应“协议公地”的公共评测台。
- **巴塞罗那城市数据与公共技术：** 关注公共数据、城市基础设施和市民权利之间的关系；本方案对应低敏、可解释、可撤回的数据边界。
- **阿姆斯特丹 Smart City 协作网络：** 以开放协作和场景试验连接企业、研究机构与城市问题；本方案对应中关村科技服务翼的跨组织接口。
- **新加坡公共创新挑战机制：** 将明确的问题、数据和验证过程开放给多方参与；本方案对应“城市协议台”和产业测试场景。
- **维也纳智慧城市研究与生活场景：** 关注能源、居住、移动和日常体验的综合验证；本方案对应小月河场景赋能翼的生活化测试。
- **首尔数字公共服务实验：** 将数字服务、公共体验与城市运营结合；本方案对应大钟寺的智能原生消费、接驳和反馈回路。

案例镜像的共同结论不是“复制一个智慧城市名片”，而是把开放问题、清楚的数据边界、专业人工复核和可退出机制写进空间。由此形成八要素的关系图：源头能力 → 公共协议 → 可控测试 → 日常应用 → 低敏反馈 → 下一轮迭代。[depth:overall_spatial_structure] [depth:metrics_recalculation]

### agent.1 / 总体概念与功能统筹

主名称为 **AI公地协议**，英文为 **AI Commons Protocol**。品牌语法使用“开放括号 + 三个节点 + 一条回路”：开放括号表示公共接口，三个节点对应知识、协议、应用，回路线表示反馈而非单向导流。视觉识别采用纸白、石墨、氧化红、河流绿、黄铜五色，避免霓虹紫和科技炫光；所有导视、节点、网页、图纸和活动物料都使用同一套色彩、线宽、圆角和“来源/复核/状态”标签。[depth:three_level_scope_framework] [standard:MOHURD-ARCH-DESIGN-DEPTH-2016]

三区两翼的协同回路是本设计的总体概念：知识公地提供开放学习与科研转化，协议公地提供标准、评测与安全治理，应用公地提供街区体验与消费服务；中关村科技服务翼支撑专业能力，小月河场景赋能翼支撑公共体验。空间结构图见 `assets/figures/site-overview.png`，空间底盘见 [data:geometry/land_use.geojson#LU-001]、[data:geometry/roads.geojson#ROAD-001]。

## 总体设计范围城市更新与控规深度城市设计

总体设计采用“先回路、后节点；先公共界面、后强度深化”的更新策略。用地图层完整覆盖暂代范围、无重叠；建筑图层只表达概念建筑基底与保留/改造/新建关系；道路图层表达慢行中心线与轨道接驳关系；蓝绿和公共空间图层表达可停留、可观察、可复核的公共界面。[standard:MOHURD-CONTROL-DETAILED-PLANNING] [depth:land_use_layout] [data:geometry/land_use.geojson#LU-001] [data:geometry/buildings.geojson#BLDG-001] [data:geometry/roads.geojson#ROAD-001]

### 空间结构与更新原则

一主轴是从北到南的公共价值回路，连接三处公地，并把开放学习、公共评测、日常服务和年度活动串成一条可步行、可回访的体验路径。三副轴分别从主轴向街区伸出：知识副轴进入学习和实验空间，协议副轴进入标准展示和企业服务，日常副轴进入市集、照护、运动和社区服务。主轴不是一条新的道路红线，而是由现有道路条件、慢行路径、口袋公园、首层界面和活动家具共同构成的概念空间系统。[depth:overall_spatial_structure] [depth:traffic_rail_slow_parking]

用地组织为四类设计容器：AI研发与成果转化公地、一主轴蓝绿公共回路、协议服务与产业协同、日常生活与社区服务。分类遵循登记的用地代码子集，并明确“概念性用途组织 ≠ 法定控规结论”。绿地率、公共空间率和建筑基底比只由提交几何复算，容积率、总建筑规模、建筑高度、退线和道路红线保持 unknown / pending control。[standard:MNR-LAND-USE-CLASSIFICATION-GUIDE] [depth:development_intensity_controls] [depth:height_massing_character] [metric:green_ratio] [metric:public_space_ratio] [metric:building_footprint_ratio]

### 城市更新项目清单（概念）

- **P01 公共价值回路先行：** 完成一主轴慢行、导视、可停留节点和低敏反馈设施的连续表达，证据为 [data:geometry/roads.geojson#ROAD-001] 与 [data:geometry/green_space.geojson#GREEN-001]。
- **P02 协议公地大厅：** 将标准、评测、治理和城市讨论组织在可见的首层公共空间，保留人工复核和退出机制。
- **P03 知识公地学习林荫场：** 以开放学习、实验室街和成果转化客厅连接北端重点区，不对现状权属或建筑做未经资料支持的判断。
- **P04 智能原生市集口：** 在大钟寺重点区组织低干扰消费、商务会客、慢行接驳和生活服务，避免把技术展陈替代真实生活。
- **P05 反馈环廊节点：** 在主轴中段以可删除反馈、无障碍导视和公共休息组成“使用—理解—反馈”的小型循环。
- **P06 端侧算力驿站（概念）：** 以低功耗、可维护、可解释的公共服务接口为研究题，不对能源、市政或工程可行性做结论。
- **P07 京张记忆回路门（概念）：** 以经过专业复核的史料和低版权风险的文字、材料、线性构件讲述铁路记忆与当代创新，不把概念装置写成已存在遗产。
- **P08 年度活动与开放运营：** 以开发者周、场景开放日、协议评测季和生活回访季形成年度循环，活动均为待共创提案。[depth:renewal_project_list]

### 建筑与强度边界

建筑基底图层包含 10 个概念对象，分为保留、改造和新建三种策略，表达的是城市界面与公共首层的关系，不代表现状建筑、产权、拆迁、建设许可或设计深度。建筑高度采用“低—中层、待控规确认”的区间语言；总建筑规模和容积率严格保持 unknown，见 [metric:floor_area_sqm] [metric:floor_area_ratio]。拆改留应在官方现状建筑、权属、文保、市政和工程条件到位后重新评估。[depth:height_massing_character] [depth:retain_renovate_demolish] [data:geometry/buildings.geojson#BLDG-001]

## 重点区域详细设计

三处重点区不是三个孤立的建筑组团，而是同一公共价值回路的三种接口。各区的空间边界目前为 provisional；设计意图、场景和运营主体可先行讨论，精确地块和控制指标必须等待官方 polygon 和专业条件。[depth:three_key_area_detailed_design] [data:geometry/key_areas.geojson#PROV-KEY-001] [data:geometry/key_areas.geojson#PROV-KEY-002] [data:geometry/key_areas.geojson#PROV-KEY-003]

### 01 众智园AI自主创新加速区 / 知识公地

关键词是“开放学习台、实验室街、成果转化客厅”。建筑和公共空间围绕一条可见的知识副轴布置：外部访客先进入开放学习台，再通过可预约的实验展示、公开讲解和成果路演进入转化客厅。空间上保留可拆分、可复用的共享桌、边界可开合的展廊和低干扰休息点；运营上由高校、研究团队、开发者社区和企业服务团队共同维护，具体主体待共创。它不是把科研内部空间全部公共化，而是设置清楚的开放等级、预约、人工接待和数据不出场规则。[data:geometry/buildings.geojson#BLDG-001] [data:geometry/public_space.geojson#PUBLIC-002] [metric:public_space_area_sqm]

### 02 北京AI原点社区 / 协议公地

关键词是“城市协议台、安全治理沙盒、公共评测廊”。协议公地把看不见的模型、数据和标准关系变成能被人理解的公共展示：每个场景都标注数据来源、适用范围、人工复核人、有效期、撤回路径和反馈方式。空间上以公共大厅、可视化评测桌、安静咨询室和中庭链构成层次；运营上组织跨专业评审、开发者工作坊和居民体验日，不把测试写成已批准运营。[data:geometry/public_space.geojson#PUBLIC-001] [data:geometry/constraints.geojson#CONSTRAINT-001] [depth:blue_green_public_space]

### 03 大钟寺AI产业聚集区 / 应用公地

关键词是“智能原生市集、慢行接驳、低干扰生活服务”。应用公地不以巨型展馆作为主角，而以可进入的首层商业、会客、休息、照护、运动和公共服务节点承接 AI 体验；系统只在用户主动请求、可见授权和人工可介入的条件下工作。南端先行期将主轴、生活副轴、公共节点和接驳线作为最小可用单元，观察真实使用后再扩展空间供给。[data:geometry/roads.geojson#ROAD-004] [data:geometry/public_space.geojson#PUBLIC-003] [metric:conceptual_loop_length_m]

### 三个AI朝圣地标与荣誉展示体系

“朝圣”在本方案中是学习、理解和参与的公共行动，不是娱乐化打卡。四个概念地标为：**原点开放台**（知识公地的开放学习和年度开源发布）、**协议公地大厅**（公共标准、评测和安全治理）、**应用剧场**（大钟寺的生活服务与场景开放）、**京张记忆回路门**（经过专业核验的铁路记忆与当代创新叙事）。每个地标配备“开放括号”标识、来源卡、复核状态、无障碍说明和可撤回反馈入口；荣誉展示只记录公开贡献、可复现成果和共同维护者，不擅自使用企业商标、人物肖像或未清权论文图像。[depth:three_key_area_detailed_design] [standard:MOHURD-ARCH-DESIGN-DEPTH-2016]

## AI 创新生态、人才画像与 AI+ 场景

### AI场景卡（12张）

每张场景卡都包含“空间接口—公开或低敏输入—公共价值—风险—人工复核—运营主体”六项，不以个人隐私、非公开数据、指定供应商或未成熟技术作为必要条件。场景全部是提案，需在小规模测试、人工复核和公众回访后决定是否继续。[source:AGENT-TASKBOOK] [depth:overall_spatial_structure] [metric:scenario_card_count]

1. **开放学习台：** 位置为知识公地前场；输入为公开课程、公开模型说明和访客主动选择；输出为可理解的学习路径；由讲解员人工复核，不采集未授权身份。
2. **城市协议台：** 位置为协议公地大厅；输入为场景规则、来源、版本和适用范围；输出为可视化的“能做什么/不能做什么”；由跨专业评审确认后公开。
3. **安全治理沙盒：** 位置为协议公地的隔离测试桌；输入为合成或公开样例；输出为风险测试记录；禁止个人敏感数据，出现异常即停止并由人工复盘。
4. **慢行断点诊断：** 位置为一主轴和三副轴；输入为公开道路、无障碍和人工观察数据；输出为断点清单；结果只给出建议，不替代交通安全审查。[data:geometry/roads.geojson#ROAD-001]
5. **低干扰无障碍导航：** 位置为公共回路节点；输入为用户主动选择的通行偏好；输出为可关闭的路线提示；不持续追踪，不推断健康状况，人工服务可随时接管。
6. **蓝绿步行助手：** 位置为绿廊和口袋公园；输入为公开天气与空间开放状态；输出为阴影、座椅、饮水和休息点提示；不做医疗判断。[data:geometry/green_space.geojson#GREEN-001] [metric:green_area_sqm]
7. **校企转化客厅：** 位置为知识公地成果转化客厅；输入为参与者主动提交的公开摘要；输出为需求匹配和路演顺序；不承诺投资、采购或政策支持。
8. **端侧算力驿站：** 位置为主轴中段和应用端节点；输入为公开计算任务说明和设备状态；输出为低敏、短时的公共计算体验；能源、网络和市政条件必须后续核验。
9. **智能原生市集：** 位置为大钟寺应用公地；输入为用户主动请求和公开商品/服务信息；输出为可解释的消费辅助；不根据身份画像定价，不保存非必要数据。
10. **公共服务会客厅：** 位置为应用副轴；输入为居民主动提出的服务问题；输出为事项解释、办理入口和人工联系人；系统不能作最终行政决定。
11. **全球AI活动周路线：** 位置为三处地标和公共回路；输入为公开活动日程与空间容量；输出为分时、无障碍、可退出的参观路径；活动效果不预先承诺。
12. **反馈回路站：** 位置为公共节点；输入为匿名或低敏的主动反馈；输出为问题分类、处理状态和撤回入口；每轮反馈进入季度公共复核，而不是自动改变规划。[data:geometry/public_space.geojson#PUBLIC-001] [metric:public_space_ratio]

### 产业测试与验证场景（3个）

- **V01 安全治理与公共评测：** 在协议公地使用合成样例和公开规则，验证“来源—版本—人工复核—撤回”链路；通过条件是可重复、可解释、可审计，不通过则不进入公共体验。
- **V02 数据互操作与城市服务：** 在协议台连接公开道路、公共空间和活动信息，验证不同格式能否被同一条公共回路解释；不接入个人数据、内部数据或未登记数据，结果由专业人员复核。
- **V03 端侧算力与低碳生活：** 在应用公地的短时公共节点验证低敏计算、能耗提示和服务可用性；不对电力、市政或工程可行性作结论，只有在安全、成本和维护条件明确后才考虑扩展。[metric:validation_scenario_count]

### 用户画像（6类）

- **P01 开源开发者：** 需要清楚的协议、公开样例、可复现入口和可见贡献记录；不接受黑箱排名。
- **P02 创业/研究团队：** 需要小规模验证、场地预约、企业服务和人工评审；不把展示等同于投资或采购。
- **P03 企业访问者：** 需要在有限时间理解产业生态、城市服务和合作接口；可以关闭个性化推荐。
- **P04 周边居民：** 需要舒适的绿荫、休息、照护、无障碍和不被打扰的日常服务；享有不使用 AI 的权利。
- **P05 学生与青年人才：** 需要低门槛学习、社群活动、公开课程和生活配套；输出只保留主动提交的作品信息。
- **P06 照护者与老年使用者：** 需要低认知负担、人工接待、清楚标识和可回到线下的服务；不以摄像或自动推断替代照护关系。[metric:persona_count]

### 场景—空间—运营映射与隐私边界

空间映射采用“知识公地承载学习与转化、协议公地承载评测与治理、应用公地承载生活与消费；主轴负责串联、副轴负责渗透”的原则。运营映射采用“场地管理员 + 专业复核人 + 社区/开发者观察员”的三角色：管理员维护开放时间、容量和安全；专业复核人判断数据、模型和内容；观察员收集低敏反馈并可提出暂停建议。系统默认最小化采集、主动授权、短期保存、可查看、可删除、可撤回；涉及个人、敏感、内部或非公开数据的需求不进入本包。[depth:risk_missing_data] [data:geometry/constraints.geojson#CONSTRAINT-001]

## 用地、建筑规模与拆改留方案

用地采用 `0802 / 1401 / 05 / 0702` 四类概念分区，分别承担知识公地、公共回路、协议服务和日常生活。四个 polygon 完整覆盖暂代 site boundary 且无重叠，面积与代码由 [data:geometry/land_use.geojson#LU-001] 和 `metrics.json` 复核；用途命名是设计语言，不替代法定用地分类审查。[standard:MNR-LAND-USE-CLASSIFICATION-GUIDE] [depth:land_use_layout]

建筑层以 10 个概念基底表达首层界面、共享空间和保留/改造/新建策略：北端重点区以实验、孵化和教育配套为主；中部以协议大厅、公共服务、会客和人才生活配套为主；南端以市集、接驳、文化展示和公共服务为主。建筑图层中的保留对象不是现状认定，改造对象不是权属判断，新建对象不是建设许可。[data:geometry/buildings.geojson#BLDG-001] [depth:retain_renovate_demolish]

强度策略采用三条边界：一是建筑底盘低干扰、首层开放、体量可分期；二是高强度和高敏感功能后置到控规、权属、消防、交通、市政和文保资料确认之后；三是所有运营指标与空间强度分开管理。当前建筑基底面积为约 308,523 sqm、概念建筑基底比约 2.70%，仅供提交几何比较，见 [metric:building_footprint_area_sqm] [metric:building_footprint_ratio]；总建筑规模和容积率分别为 unknown，见 [metric:floor_area_sqm] [metric:floor_area_ratio]。[depth:development_intensity_controls] [depth:height_massing_character]

## 交通、轨道、市政与公共服务设施

交通策略是“慢行优先但不假设新建工程”：ROAD-001 为一主轴公共价值回路，ROAD-002—004 为知识、协议、日常三条慢行副轴，ROAD-005 为概念性轨道站点接驳线。它们是中心线与体验关系，不是道路红线、交通组织审批或工程长度；正式深化需要官方道路、轨道、停车、公交、消防、管线和无障碍资料。[data:geometry/roads.geojson#ROAD-001] [depth:traffic_rail_slow_parking]

公共服务设施以“节点 + 首层 + 导视 + 人工接待”组织，优先配置座椅、遮荫、饮水、无障碍、公共厕所、充电、信息展示、志愿者服务和可撤回反馈入口。市政和算力设施采用“可插拔模块”思路，先以短时、低敏、低维护的概念节点测试，再由专业团队校核能源、网络、消防、结构与运维，不能由本方案给出桥隧、地下空间或工程可行性结论。[depth:municipal_new_infrastructure] [depth:existing_conditions_diagnosis]

## 蓝绿空间、公共空间与城市风貌

蓝绿系统以主轴连续绿廊、北端学习林荫场、中部协议中庭链和南端应用口袋公园组成；公共空间以三处重点区前场、反馈环廊节点和端侧算力驿站节点组成。绿地和公共空间可发生功能复合，指标按 union 计算，不简单相加；当前概念绿地约 3,142,950 sqm、绿地率约 27.54%，概念公共空间约 278,241 sqm、公共空间率约 2.44%，均由提交几何复算并非法定指标。[data:geometry/green_space.geojson#GREEN-001] [data:geometry/public_space.geojson#PUBLIC-001] [metric:green_area_sqm] [metric:green_ratio] [metric:public_space_area_sqm] [metric:public_space_ratio] [depth:blue_green_public_space] [standard:MOHURD-URBAN-DESIGN-MEASURES]

城市风貌使用“纸张、石墨、氧化红、河流绿、黄铜”的低饱和系统：石墨负责文字和结构，氧化红标示公共价值主轴，河流绿标示蓝绿和生活，黄铜标示知识和荣誉，纸白提供呼吸。建筑与景观不追求赛博城市，而是把铁路的线性记忆、校园/科研的开放尺度、街区的日常停留和 AI 的状态标签放进同一套导视。标识系统区分一带品牌、方案品牌和场景标识，不使用未经授权的企业商标、人物肖像或第三方图片。[depth:height_massing_character]

## 更新项目清单、实施政策与分期计划

### 三期公共回路

- **第一期：应用先行（南端大钟寺）。** 先完成主轴南端、日常副轴、应用剧场、市集口、慢行接驳和反馈环廊；以少量场景卡做真实但低风险的回访。阶段目标是让创新带先被生活使用，而不是先建一个大型名片项目。
- **第二期：协议成形（中部AI原点社区）。** 建立协议公地大厅、城市协议台、公共评测廊、安全治理沙盒和中庭链；将场景的来源、版本、人工复核、撤回和运营责任公开。
- **第三期：知识扩展（北端众智园）。** 连接开放学习台、实验室街、成果转化客厅、人才生活配套和年度开发者活动；把前两期的反馈带回知识端，形成可复制的城市创新方法。[data:geometry/phasing.geojson#PHASE-001] [metric:phase_count] [depth:phasing_implementation]

### 实施政策与治理建议

1. **数据与隐私：** 只使用登记的公开/清权资料和主动提供的低敏反馈，建立数据目录、保存期限、撤回和人工复核记录。
2. **空间与权属：** 先以公共空间、临时展陈、活动家具和可拆卸界面试验，任何建筑、道路、市政、文保和权属动作必须转交专业审批链。
3. **产业与人才：** 以公开题面、共享实验、企业服务和开发者社区提供协作入口；不写入具体企业、投资额、产值或财政承诺。
4. **公共评议：** 每季度发布场景开放清单、问题清单、暂停清单和复核摘要，每年根据公开反馈决定保留、改造、撤回或扩展。
5. **国际传播：** 用中英双语的图解、来源卡、无障碍替代文本和可复现仓库链接传播方案，始终区分投稿、评审、入选和落地状态。

### agent.6 / 年度活动与长期运营

年度活动分为四季：春季“开发者与学习季”开放课程和开源发布；夏季“场景开放季”做步行、生活和公共服务体验；秋季“协议评测季”做安全、数据互操作和人工复核；冬季“公共回访季”发布指标、问题、撤回和下一年题面。运营资产不是一次性活动，而是场景卡、协议模板、视觉识别、公共组件库、可复现数据和贡献者荣誉系统的持续积累。转化路径为“公开题面 → 小规模测试 → 人工复核 → 公共回访 → 专业深化/撤回”，不把招商、政策、资金和活动效果写成确定承诺。[depth:phasing_implementation] [source:AGENT-TASKBOOK]

## 指标体系、面积复算与合规矩阵

### 可复算指标

所有面积在 EPSG:4548 中计算；图层是权威证据，`metrics.json` 是复算摘要，图片、PDF、HTML 是可读展示层。[depth:metrics_recalculation]

- 暂代 site area：**11,412,825.39 sqm**，见 [metric:site_area_sqm]。
- 重点区数量：**3**，见 [metric:key_area_count]。
- 概念建筑基底：**308,522.76 sqm**，基底比约 **2.70%**，见 [metric:building_footprint_area_sqm] [metric:building_footprint_ratio]。
- 概念绿地：**3,142,949.85 sqm**，绿地率约 **27.54%**，见 [metric:green_area_sqm] [metric:green_ratio]。
- 概念公共空间：**278,241.29 sqm**，公共空间率约 **2.44%**，见 [metric:public_space_area_sqm] [metric:public_space_ratio]。
- 主轴与副轴概念中心线合计约 **11,830.13 m**，见 [metric:conceptual_loop_length_m]；它不是工程长度。
- 分期 **3**，场景卡 **12**，产业测试/验证场景 **3**，用户画像 **6**，分别见 [metric:phase_count] [metric:scenario_card_count] [metric:validation_scenario_count] [metric:persona_count]。

总建筑规模、容积率以及与其相关的建筑高度、退线、道路红线、停车、市政容量和工程成本保持 unknown / pending control，不由概念建筑基底倒推。[metric:floor_area_sqm] [metric:floor_area_ratio] [source:BOUNDARY-SOURCE] [depth:risk_missing_data]

### 六项智能体任务与官方设计任务覆盖

- **agent.1：** 总体概念、英文命名、Logo/视觉方向、三大定位、五大功能、三区两翼回路和总体结构图，见本方案开头、`assets/figures/site-overview.png` 与 `compliance_matrix.json`。
- **agent.2：** 六个全球案例镜像、AI创新生态图谱、众智园全栈体系、AI原点社区、科技服务翼以及土地/空间/产业/资金/人才/算力/数据/场景机制，见统筹研究章节。
- **agent.3：** 12 张场景卡、3 个测试验证场景、6 类用户画像、场景—空间—运营映射、隐私与人工复核边界，见本章。
- **agent.4：** AI公共空间、东西缝合与南北贯通、智能原生消费、大钟寺场景、4 个朝圣地标、荣誉展示和公共组件，见重点区域与蓝绿公共空间章节。
- **agent.5：** 京张铁路记忆、中关村创新文化、AI新文化、导视/符号系统和国际传播叙事，见文化叙事与风貌章节。
- **agent.6：** 年度活动体系、品牌 IP、开发者社区、场景开放运营、公共体验和转化路径，见分期和长期运营章节。

公告的 1.3.1、1.3.2、1.3.3、1.4.1、1.4.2、1.4.3、1.5.1.1、1.5.1.2、1.5.2.1—1.5.2.5、1.5.3.required、1.5.3.1—1.5.3.3 由 `compliance_matrix.json` 逐项映射到正文、GeoJSON、指标、A3/A0 和 HTML。矩阵不是替代设计的清单，而是让评审可以从每一项任务回到可读证据。[standard:PROJECT-OFFICIAL-ANNOUNCEMENT] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]

## 风险、版权与合规说明

最大风险是资料精度而不是概念缺失：官方 boundary、key areas、道路红线、控规、现状建筑、权属、市政、文保和工程资料当前不完整，因此所有空间边界和依赖指标都显式标注 provisional 或 unknown；官方资料到位后，site boundary、key areas、land use、buildings、roads、green space、public space、constraints、phasing 与 metrics 必须整体重算。[source:SOURCE-REGISTRY] [depth:risk_missing_data] [data:geometry/constraints.geojson#CONSTRAINT-001]

AI 场景的主要风险包括隐私、误导、过度监控、技术不成熟、运营成本、公众接受度、公平性和空间争议。缓解方法是数据最小化、主动授权、可删除、可撤回、人工复核、公开版本、暂停机制、无障碍线下服务和年度公共评议。任何未经核实的企业、投资、审批、工程、政策、文保事实或政府背书都不出现在本方案中。

正式图纸、HTML 和 PNG 只使用本包生成的本地资源，不加载 CDN、远程地图瓦片、外部脚本、外部字体、API 或 iframe。前期 AI image generation 只用于审美方向参考，没有作为正式空间证据嵌入本包；正式证据以 GeoJSON、`metrics.json`、矩阵和自检为准。版权与资料使用记录见 `report/copyright_statement.md`。[standard:MOHURD-URBAN-DESIGN-MEASURES] [standard:MOHURD-ARCH-DESIGN-DEPTH-2016]

## 参考资料

- [source:OFFICIAL-ANNOUNCEMENT]：征集公告与正式设计任务。
- [source:AGENT-TASKBOOK]：面向智能体的六项任务、场景、品牌、文化、运营和边界要求。
- [source:SITE-PACKAGE]：站点包结构、枚举、范围、schema 和缺资料边界。
- [source:SOURCE-REGISTRY]：公开/清权/provisional 资料的用途和禁用边界。
- [source:PROCESSED-FACT-PACK]：供 agent 使用的处理事实导航层。
- [source:BOUNDARY-SOURCE]、[source:KEY-AREA-SOURCE]：暂代边界与重点区的来源链。
- [standard:PROJECT-OFFICIAL-ANNOUNCEMENT]、[standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]：项目公告和智能体任务书标准映射。
- [standard:MOHURD-URBAN-DESIGN-MEASURES]：城市设计管理相关要求。
- [standard:MOHURD-CONTROL-DETAILED-PLANNING]：控规深度与空间、强度、实施表达要求。
- [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE]：用地分类代码子集与使用边界。
- [standard:MOHURD-ARCH-DESIGN-DEPTH-2016]：建筑设计深度与表达边界。
- 机器可读空间证据：[data:geometry/site_boundary.geojson#SITE-001]、[data:geometry/key_areas.geojson#PROV-KEY-001]、[data:geometry/land_use.geojson#LU-001]、[data:geometry/buildings.geojson#BLDG-001]、[data:geometry/roads.geojson#ROAD-001]、[data:geometry/green_space.geojson#GREEN-001]、[data:geometry/public_space.geojson#PUBLIC-001]、[data:geometry/constraints.geojson#CONSTRAINT-001]、[data:geometry/phasing.geojson#PHASE-001]。
- 设计深度证据：[depth:existing_conditions_diagnosis] [depth:three_level_scope_framework] [depth:overall_spatial_structure] [depth:land_use_layout] [depth:development_intensity_controls] [depth:height_massing_character] [depth:retain_renovate_demolish] [depth:traffic_rail_slow_parking] [depth:municipal_new_infrastructure] [depth:blue_green_public_space] [depth:three_key_area_detailed_design] [depth:renewal_project_list] [depth:phasing_implementation] [depth:metrics_recalculation] [depth:risk_missing_data]。

本提案的可读图件为：

![一主轴三副轴总体空间结构图](assets/figures/site-overview.png)

![四类公地用地结构图](assets/figures/land-use-structure.png)

![三处公地详细设计关系图](assets/figures/key-areas.png)

![慢行蓝绿公共回路图](assets/figures/mobility-bluegreen.png)

![指标复算与证据链图](assets/figures/metrics-evidence.png)

本次修订将总体空间结构图更新为 QGIS 大字可读版：左侧总图继续表达一主轴、三副轴和三处重点区的关系，右侧以三张详图强化重点区阅读；标题为 32 pt，说明为 24 pt。配套 A1 图纸见 `drawings/qgis-readable-plan-a1.pdf`。其中道路、铁路和水系仅作为低对比度城市语境，来源为 [source:OSM-CONTEXT]，不参与边界、面积、道路红线或法定控制判断。[assumption:A-OSM-CONTEXT-006]
