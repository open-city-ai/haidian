---
title: "京张 AI 人才生活实验带"
author_github: "ChrysFu"
language: "zh"
translation_file: "proposal.en.md"
license: "COMMUNITY-DISPLAY-ONLY"
summary: "以三区十五分钟创新生活圈和可审计服务闭环，将 AI 研发验证、人才日常生活、公共反馈与企业服务转化连接为一条连续的京张公共创新网络。"
tracks: ["enterprise-services-ecosystem", "ai-origin-community", "youth-friendly-public-space"]
scenarios: ["enterprise-service-copilot", "ai-health-service-navigation", "ai-cultural-guide"]
iteration: "v1.0"
---

# 京张 AI 人才生活实验带

本方案把“吸引 AI 人才”从一次性招商或形象工程，转化为可以在日常生活中持续验证的城市服务能力：人提出真实需求，系统只在明确规则内推荐，空间与运营以柔性方式响应，服务过程可追溯，公众可以反馈、纠正或退出，下一轮迭代再据此调整。六阶段闭环为：**需求感知 → 受控推荐 → 柔性服务 → 质量追溯 → 公共反馈 → 持续迭代**。

总体空间由三处十五分钟创新生活圈、京张公共创新轴和两翼构成。众智园承担“服务原型与质量验证”，北京 AI 原点社区承担“近校人才生活与公共反馈”，大钟寺承担“企业服务与规模转化”；中关村科技服务翼提供公开政策、知识产权、合规和资本服务入口，小月河场景赋能翼提供公共空间、生态与日常体验反馈。所有空间动作均为**概念建议、参考方案、可供专业团队深化研究**，不替代正式规划，不构成政府审定或实施承诺。[source:AGENT-TASKBOOK] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]

![总体结构与可审计服务闭环](assets/figures/site-overview.png)

## 设计依据与资料清单

方案以官方资格预审公告、面向智能体任务书、仓库 site package、本地标准参考快照和公开资料登记表为主控依据。[source:OFFICIAL-ANNOUNCEMENT] [source:AGENT-TASKBOOK] [source:SITE-PACKAGE] [source:SOURCE-REGISTRY] [source:PROCESSED-FACT-PACK] 公告提出三层范围、三区重点设计和控规深度城市设计要求；任务书提出三大定位、五大功能、三区两翼及 agent.1-agent.6 六项任务。[standard:PROJECT-OFFICIAL-ANNOUNCEMENT] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]

专业响应以《城市设计管理办法》、控制性详细规划相关公开参考和国土空间用地分类指南为依据，分别约束总体空间、法定与建议边界、用地代码和可读证据链。[standard:MOHURD-URBAN-DESIGN-MEASURES] [standard:MOHURD-CONTROL-DETAILED-PLANNING] [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE] `MOHURD-ARCH-DESIGN-DEPTH-2016` 当前缺少可核验的官方源文件，只作为已披露资料缺口，不声明已正式采用。[standard:MOHURD-ARCH-DESIGN-DEPTH-2016]

当前仓库没有官方精确总体边界和三处重点区 polygon。本方案使用 `provisional_boundaries.geojson` 中的临时粗略几何：[source:BOUNDARY-SOURCE] [source:KEY-AREA-SOURCE] [data:geometry/site_boundary.geojson#SITE-001] [data:geometry/key_areas.geojson#PROV-KEY-001]。这些几何仅用于概念生成、可视化、相对位置表达和入口自检，不是官方红线、地块边界、道路红线、审批依据或精确面积依据；官方 polygon 发布后，全部设计图层、指标、图件、网页与 PDF 必须统一复算。[depth:existing_conditions_diagnosis]

外部案例只提取公开机制，不复制图片、图纸、商标或控制指标。七项案例来源分别为新加坡 one-north、巴黎 STATION F、多伦多 MaRS、赫尔辛基 Maria 01、埃因霍温 High Tech Campus、剑桥创新经济区和新加坡 BLOCK71。[source:CASE-ONE-NORTH] [source:CASE-STATION-F] [source:CASE-MARS] [source:CASE-MARIA01] [source:CASE-HTCE] [source:CASE-KENDALL] [source:CASE-BLOCK71]

## 三层范围工作框架

统筹研究范围回答“海淀 AI 创新生态如何与未来城市形态协同”；总体设计范围回答“京张轴线周边如何把产业、人才生活、公共空间、交通与城市更新组织成连续系统”；重点区域回答“三个片区分别验证什么、由什么空间承载、哪些条件必须人工与专业复核”。[depth:three_level_scope_framework] [depth:overall_spatial_structure]

总体设计范围的提交几何复算约为 11.41 平方公里，仅代表临时粗略 polygon 自身，不等于官方面积结论。[metric:site_area_sqm] 三处重点区数量为 3；公告约面积仍作为任务背景，提交 polygon 只用于位置和设计角色表达。[metric:key_area_count]

三层传导关系不是“从大到小画三套图”，而是从产业目标到公共规则，再到可验证节点：统筹层定义三大定位和五大功能；总体层用用地、公共轴、两翼、蓝绿慢行和服务节点组织网络；重点区层为每项服务设置负责主体、数据边界、人工复核和退出机制。用地完整分区见 [data:geometry/land_use.geojson#LU-001]，公共网络见 [data:geometry/roads.geojson#ROAD-001]，12 个节点见 [data:geometry/public_space.geojson#SCN-01]。

![三区十五分钟创新生活圈](assets/figures/land-use-structure.png)

## 统筹研究范围产业与未来城市研究

### 三大定位、五大功能与三区两翼

方案同时回应“百年京张文化带、都市 AI 生活体验带、AI 融合创新带”三大定位。文化带通过京张历史叙事、可解释导览和贡献荣誉系统建立时间纵深；生活体验带通过可退出的日常服务、十五分钟生活圈和公共反馈建立人才黏性；融合创新带通过原型验证、企业服务接口和规模转化复核形成产业闭环。[source:AGENT-TASKBOOK]

五大功能被转译为可定位机制：AI 全栈自主创新体系落在众智园验证圈；世界级 AI 创新生态落在原点社区与两翼的开放协作；AI+场景赋能新范式落在 12 个节点；智能化 AI 活力城市落在公共轴与日常路线；AI 治理全球话语权落在安全、互操作、质量追溯、人工复核和公开规则。[depth:overall_spatial_structure]

三区之间不是同质化“展示园区”。众智园产出经过记录的服务原型；原点社区用自愿体验和公共反馈判断其是否有用、公平和可退出；大钟寺检查企业接口、运营责任与公众接受度，再决定是否进入更大范围的概念性推广。中关村科技服务翼不指向特定合作方，而是提供公开政策、合规、知识产权与专业服务入口；小月河场景赋能翼不采集个人画像，而以公共空间、生态、无障碍和聚合反馈验证城市体验。

### 全球案例及可转化机制

| 案例 | 公开机制 | 京张可转化内容 | 不直接照搬的内容 |
| --- | --- | --- | --- |
| one-north [source:CASE-ONE-NORTH] | 研发、企业、居住和公共空间混合组织 | 将创新工作与日常生活放入同一可步行网络 | 土地控制、规模和治理模式 |
| STATION F [source:CASE-STATION-F] | 可见的创业服务入口与社区活动 | 建立企业服务接口台和公开服务目录 | 单一大型运营主体假设 |
| MaRS [source:CASE-MARS] | 研究转化、创业支持与行业服务连接 | 形成“验证—专业服务—转化复核”链条 | 机构名单、资金与绩效数据 |
| Maria 01 [source:CASE-MARIA01] | 适应性再利用与创始人社区 | 优先可逆改造、共享协作和低门槛活动 | 未经调查的具体建筑改造结论 |
| High Tech Campus Eindhoven [source:CASE-HTCE] | 共享技术设施与开放创新社区 | 共享验证工坊、质量追溯和跨团队使用规则 | 园区开发强度和企业配置 |
| Cambridge innovation economy [source:CASE-KENDALL] | 创新区公共空间、交通和城市社区接口 | 把公共利益、慢行和社区反馈纳入创新区绩效 | 房地产与税收机制 |
| BLOCK71 [source:CASE-BLOCK71] | 高校邻近、创业社区与共享支持 | 强化原点社区的近校协作和成果转化入口 | 指定高校、企业或投资网络 |

命名与视觉识别采用“连续轨迹 + 六节点闭环”方向：轨迹回应百年京张，六个节点回应服务闭环，三种主色分别标识验证、公共反馈和企业转化。Logo 只使用自绘几何和通用字体方向，不使用企业标识或未授权素材；它是传播系统概念，不是已审定官方标识。

## 总体设计范围城市更新与控规深度城市设计

总体结构为“一轴、三圈、两翼、多点”。京张公共创新轴承担慢行、蓝绿、文化与公共服务连续性；三圈形成差异化十五分钟创新生活单元；两翼连接科技服务和公共体验；多点是可预约、可退出、可追溯的服务与验证节点。[data:geometry/roads.geojson#ROAD-001] [data:geometry/green_space.geojson#GREEN-001] [data:geometry/public_space.geojson#PUBLIC-001]

用地分区完整覆盖提交边界且不重叠：AI 研发与服务原型、京张蓝绿公共轴、企业服务与智能原生商务、人才社区与日常服务配套四类分区分别由 LU-001 至 LU-004 表达。[depth:land_use_layout] 对应复算指标为 [metric:land_use_0802_area_sqm] [metric:land_use_1401_area_sqm] [metric:land_use_05_area_sqm] [metric:land_use_0702_area_sqm]。这些数值只描述提交 geometry 的拓扑分区，不能被解释为正式用地指标。

建筑图层只放置三个“空间原型基底”，用于说明工坊、协作站和企业服务客厅的空间关系，不对现状建筑作拆、改、留结论。[data:geometry/buildings.geojson#BLDG-001] [metric:building_footprint_area_sqm] [metric:building_density] 实际保留、改造、新建、建筑高度、体量、风貌和首层业态必须在官方建筑、权属、控规、消防、结构和文保资料补齐后由专业团队确认。[depth:development_intensity_controls] [depth:height_massing_character] [depth:retain_renovate_demolish]

更新策略优先采用可逆、低侵入和运营先行：先以服务台、导视、反馈设施、临时展陈和预约机制验证需求，再决定是否进入建筑或工程深化。任何道路线形、桥隧、市政管线、地下空间、能源负荷或开发时序都保持待确认，不在本方案中形成工程结论。[standard:MOHURD-CONTROL-DETAILED-PLANNING]

## 重点区域详细设计

![三处重点区差异化验证任务](assets/figures/key-areas.png)

### 众智园 AI 自主创新加速区：服务原型与质量验证圈

定位是把全栈自主创新、安全治理和标准研究转化为公众可理解、产业可复核的验证界面。[data:geometry/key_areas.geojson#PROV-KEY-001] 空间结构建议为“研发工坊—安全与互操作沙盒—质量追溯开放庭院—公共展示界面”，以公共轴连接清河与园区日常路线。三个产业验证场景 SCN-01 至 SCN-03 分别检查需求登记是否最小化、推荐是否受规则约束、服务输出是否有质量记录和责任主体。[data:geometry/public_space.geojson#SCN-01] [data:geometry/public_space.geojson#SCN-02] [data:geometry/public_space.geojson#SCN-03]

建筑动作仅建议对适合的既有空间开展适应性再利用调查，不指定具体楼栋，不给出拆改留结论。交通动作仅表达对外接驳、步行骑行和公共展示的关系，不形成道路工程线位。实施前置条件包括 official polygon、权属、现状建筑、消防、交通、生态与安全评估。[depth:three_key_area_detailed_design]

### 北京 AI 原点社区：近校人才生活与公共反馈圈

定位是让高校师生、开发者、初创团队、居民和国际访客在十五分钟日常生活中自愿体验服务，并能看到推荐依据、责任主体、反馈入口和退出方式。[data:geometry/key_areas.geojson#PROV-KEY-002] 空间结构建议为“近校协作站—人才日常需求站—自愿体验与退出台—公共反馈论坛—开源贡献荣誉带”。SCN-04 至 SCN-07 只使用公开服务目录、授权活动信息和自愿聚合反馈，不建立商业化个人画像。[data:geometry/public_space.geojson#SCN-04] [data:geometry/public_space.geojson#SCN-07]

公共空间强调全天候但分级运营：安静学习、协作发布、社区服务、运动休憩和活动模式有不同时间与声环境规则。任何校园数据、科研成果、个人健康、消费或行为轨迹都不作为默认输入。数字入口必须有人工窗口和非数字替代。[depth:blue_green_public_space]

### 大钟寺 AI 产业聚集区：企业服务与规模转化圈

定位是把通过验证的服务原型转译为可对接企业、城市商务和公共消费的服务模块，同时保留运营复核和公众退出权。[data:geometry/key_areas.geojson#PROV-KEY-003] 空间结构建议为“轨道接驳概念联系—企业服务接口台—柔性服务城市客厅—规模转化复核台—贡献展示界面”。SCN-08 至 SCN-10 不指定企业、合作名单或供应商，也不提出投资、招商、营收或政府承诺。[data:geometry/public_space.geojson#SCN-08] [data:geometry/public_space.geojson#SCN-10]

四象限步行连通、站城一体化、地下空间和交通组织均只提出问题框架，必须由轨道、交通、市政、消防、无障碍和权属专业资料深化。智能原生消费的重点不是炫技，而是透明推荐、质量追溯、服务可替换和纠纷可处理。

## AI 创新生态、人才画像与 AI+ 场景

### 六类用户画像

| 画像 | 核心需求 | 空间与服务响应 | 数据边界 |
| --- | --- | --- | --- |
| 开源开发者 | 协作、发布、贡献被看见 | 原点协作站、开源荣誉带、活动路线 | 不追踪个人代码或行为；只展示自愿公开贡献 |
| 初创与研发团队 | 低门槛测试、合规与企业服务 | 众智园验证工坊、大钟寺企业接口 | 不公开企业内部数据、预测或合作名单 |
| 高校师生 | 成果转化、学习社交、近校生活 | 原点社区十五分钟生活圈 | 科研成果、校园和个人数据须另行授权 |
| 企业专业人员 | 商务接待、服务组合、人才交流 | 大钟寺城市客厅、公共轴活动节点 | 不建立商业个人画像，不指定供应商 |
| 周边居民与家庭 | 通勤、健康、休闲、社区服务 | 蓝绿轴、健康导航、人工服务窗口 | 不用居民画像做强制推荐或差异定价 |
| 国际访客与活动参与者 | 易懂导览、无障碍、可信信息 | 双语导视、文化导览、公共路线 | 只用公开策展与活动信息，事实人工复核 |

[metric:persona_count]

### 十二张场景卡

| 编号 | 场景 | 类型 | 位置 | 输入与人工复核 | 公共价值 |
| --- | --- | --- | --- | --- | --- |
| SCN-01 | 服务原型登记台 | **产业验证 1** | 众智园 | 自愿需求、最小字段；运营与合规人员复核 | 防止“先有技术后找场景” |
| SCN-02 | 质量追溯验证工坊 | **产业验证 2** | 众智园 | 测试记录、质量问题、责任链；专业复核 | 让服务结果可解释、可追责 |
| SCN-03 | 安全与互操作沙盒 | **产业验证 3** | 众智园 | 公开规范、合成测试、授权数据；安全人员复核 | 检查跨系统接口和退出机制 |
| SCN-04 | 人才日常需求站 | 公共服务 | 原点社区 | 自愿选择、聚合需求；人工服务台 | 识别真实日常缺口 |
| SCN-05 | 自愿体验与退出台 | 公共服务 | 原点社区 | 明示规则、同意与撤回记录；人工处理 | 保证拒绝 AI 后仍可获得服务 |
| SCN-06 | 公共反馈论坛 | 公共空间 | 原点社区 | 匿名或实名自选反馈；社区复核 | 把争议和改进纳入下一轮 |
| SCN-07 | 开源贡献荣誉带 | 文化/荣誉 | 原点社区 | 自愿公开贡献与策展文本；事实版权复核 | 让长期公共贡献被记忆 |
| SCN-08 | 企业服务接口台 | 企业服务 | 大钟寺 | 公开政策与服务目录；专业人员复核 | 降低企业寻找合规服务的成本 |
| SCN-09 | 柔性服务城市客厅 | 生活/商务 | 大钟寺 | 公开目录、现场选择；运营人员负责 | 让服务组合随时段和人群调整 |
| SCN-10 | 规模转化复核台 | 企业服务 | 大钟寺 | 试点记录、公众反馈、风险清单；多专业复核 | 防止未经验证直接扩大部署 |
| SCN-11 | 京张文化可解释导览 | 文化 | 公共轴 | 公开史料、人工策展；史实版权复核 | 连接铁路历史与 AI 新文化 |
| SCN-12 | 无障碍慢行与健康导航 | 公共服务 | 公共轴 | 公开服务信息、现场调研；交通医疗复核 | 降低人才与居民日常服务门槛 |

[metric:scenario_node_count] [metric:industry_validation_scenario_count] [metric:service_loop_stage_count]

推荐系统只可在“公开规则 + 用户明确选择 + 可解释结果 + 人工复核 + 可退出”条件下运行。公共空间不得采用以身份识别、过度监控或不可申诉评分为基础的体验。健康、法律、政策和安全相关输出只做导航或提示，不替代专业意见和行政判断。[source:SOURCE-REGISTRY]

### 四个 AI 朝圣与荣誉节点

1. **百年轨迹记忆门**：以时间轨迹和公开史料连接京张铁路历史，不使用未经授权的历史图片。
2. **原点开源论坛**：面向发布、协作、贡献展示和公共讨论，贡献者自愿署名。
3. **质量追溯瞭望台**：把安全、互操作、质量记录和责任链变成可理解的公共展示。
4. **全球贡献荣誉带**：记录长期公共知识、开源贡献与城市共创，不以商业排名替代公共价值。

四个节点是可逆公共空间组件和策展机制，不是大型地标建筑或确定建设项目。[metric:pilgrimage_honor_node_count]

## 用地、建筑规模与拆改留方案

用地以 0802、1401、05、0702 四类代码构成完整拓扑分区；代码遵循仓库登记的国土空间用地分类参考，不自造法定分类。[standard:MNR-LAND-USE-CLASSIFICATION-GUIDE] 各分区面积仅用于校验 union、gap 和 overlap，不作为正式供地或比例结论。[data:geometry/land_use.geojson#LU-002]

建筑基底仅表达三类空间原型：验证工坊、人才生活协作站、企业服务与城市体验客厅。总建筑面积、容积率和道路面积保持 unknown：[metric:total_floor_area_sqm] [metric:floor_area_ratio] [metric:road_area_sqm]。建筑基底面积与密度只描述设计示意 polygon：[metric:building_footprint_area_sqm] [metric:building_density]。

拆改留采用“先调查、再分类、后决策”流程：建立建筑年代、结构、使用、权属、消防、能耗、文化价值与首层界面清单；再由专业团队确定保留、修缮、适应性再利用、更新或拆除。没有这些资料时，本方案不对任何具体地块或建筑给出结论。[depth:retain_renovate_demolish]

## 交通、轨道、市政与公共服务设施

京张公共创新轴优先服务步行、骑行、无障碍和公共体验；中关村科技服务翼与小月河场景赋能翼只表达概念联系；大钟寺站城接驳只表达换乘问题，不是道路或轨道线位。[data:geometry/roads.geojson#ROAD-001] [data:geometry/roads.geojson#ROAD-004] 提交中心线总长度仅用于图层复算，不等于批准道路长度。[metric:road_centerline_length_m] [depth:traffic_rail_slow_parking]

![公共轴、两翼与低侵入日常路线](assets/figures/mobility-bluegreen.png)

市政和新型基础设施采用“共享、可计量、可停用、有人负责”的原则。端侧算力、传感、充电、雨洪、照明和信息设施应优先结合既有设施和可逆设备；涉及能源负荷、管线容量、防洪、消防、网络安全和设备参数时必须另行专业测算，本方案不提供这些数值。[depth:municipal_new_infrastructure]

公共服务设施强调数字与人工双入口：AI 导航可降低检索门槛，但健康、法律、政策、安全与纠纷处理必须保留人工渠道。无障碍路线、夜间安全、儿童与老年人需求应在现场调研和公众参与后深化。

## 蓝绿空间、公共空间与城市风貌

蓝绿系统以京张连续公共轴为骨架，以三处公共空间节点和小月河场景赋能翼形成支线。提交绿地和公共空间的面积与比例为 geometry 复算结果：[metric:green_space_area_sqm] [metric:green_ratio] [metric:public_space_area_sqm] [metric:public_space_ratio]。它们不代表正式绿地率或公共空间指标。[data:geometry/green_space.geojson#GREEN-001] [data:geometry/public_space.geojson#PUBLIC-002]

公共空间组件包括可移动座椅、遮阴与雨棚、双语导视、人工服务窗口、可关闭显示界面、匿名反馈设施和活动电源接口。所有组件应满足无障碍、消防、文保、生态和公共安全要求，避免把公共空间变成持续监控或强制消费界面。[standard:MOHURD-URBAN-DESIGN-MEASURES] [depth:blue_green_public_space]

文化叙事沿“铁路工程—中关村创新—开源协作—可信 AI 城市”展开。城市风貌以清晰结构、耐久材料、可逆技术层和夜间低扰动为原则；生成内容必须标注，史实和人物机构叙述必须人工核查。整体 Logo 与文化标识分层使用，避免把企业商标或活动视觉误作城市公共标识。

## 更新项目清单、实施政策与分期计划

| 项目 | 概念动作 | 依赖条件 | 可审计结果 |
| --- | --- | --- | --- |
| P1 公共服务闭环最小试点 | 需求站、人工窗口、反馈台、公开规则 | 场地许可、运营主体、隐私与安全评估 | 使用与退出记录、问题清单、改进决定 |
| P2 众智园验证工坊 | 原型登记、安全互操作、质量追溯展示 | 建筑与消防调查、测试规则、责任主体 | 测试记录、质量问题、是否进入下一阶段 |
| P3 原点人才生活圈 | 近校协作、日常服务、公共反馈、开源荣誉 | 校园与社区协调、活动和声环境规则 | 公共反馈、服务修订、非数字替代可用性 |
| P4 大钟寺企业接口 | 服务目录、城市客厅、规模转化复核 | 轨道交通、权属、企业与公众规则 | 服务接口质量、公众接受度、风险门结论 |
| P5 京张公共创新轴 | 慢行、蓝绿、文化导览、无障碍导航 | 道路、文保、生态、交通和市政复核 | 慢行问题清单、无障碍修正、史实复核 |
| P6 年度共创运营 | 开发者季、场景开放日、公共反馈月、国际交流周 | 独立审批、活动安全、版权、运营责任 | 公开复盘、贡献记录、下一年调整清单 |

分期不是政府开发时序。近期概念阶段优先可逆服务和验证节点；中期概念阶段连接三圈公共空间和企业接口；长期概念阶段再讨论轴翼协同和制度化迭代。[data:geometry/phasing.geojson#PHASE-001] [metric:phase_1_area_sqm] [metric:phase_2_area_sqm] [metric:phase_3_area_sqm] [depth:phasing_implementation]

年度活动体系建议采用“开发者与开源贡献季—人才生活场景开放日—公共反馈与可信 AI 月—京张文化与国际交流周”的循环。活动必须逐次审批并公开责任边界，不宣称已确定举办。开发者、企业、居民和专业团队的贡献进入可追溯 changelog；任何服务扩大部署前必须经过质量、公众和专业复核。[depth:renewal_project_list]

## 指标体系、面积复算与合规矩阵

![指标、证据与待确认边界](assets/figures/metrics-evidence.png)

权威顺序为 GeoJSON、metrics、三类矩阵、manifest/sources/assumptions/self_check、proposal、图件、HTML、PDF。图件和网页是解释层，不能反向成为边界、面积或法定控制依据。[depth:metrics_recalculation]

known 指标分为三类：第一类是提交几何复算，包括总体边界、四类用地、建筑基底、绿地、公共空间、中心线和三期 polygon；第二类是明确计数，包括 3 个重点区、12 个场景、3 个产业验证、6 类画像、4 个荣誉节点和 6 个闭环阶段；第三类是公告约面积等背景事实。unknown 指标包括建筑总量、容积率、道路面积以及所有缺少官方条件的工程与法定数据。[metric:site_area_sqm] [metric:key_area_count] [metric:scenario_node_count]

合规矩阵逐条覆盖公告 1.3、1.4、1.5 和 agent.1-agent.6；标准矩阵覆盖 mandatory 标准；设计深度矩阵覆盖现状诊断、三层范围、总体结构、用地、强度待确认、体量风貌、拆改留、交通、市政、蓝绿、三区、项目、分期、指标与风险。[depth:risk_missing_data]

## 风险、版权与合规说明

风险边界由待补官方控制条件包络和缺资料深度项共同记录：[data:geometry/constraints.geojson#CONSTRAINTS-001] [depth:risk_missing_data] [source:SITE-PACKAGE]。该 feature 只记录“缺少 official control geometry”这一事实，不是控制线或审批边界。

1. **几何风险**：SITE_BOUNDARY 和三个 KEY_AREA 均为 provisional rough geometry。正式 polygon 到位后必须全量复算，不能只替换图片。
2. **专业条件风险**：缺少控规、权属、建筑、市政、交通、文保、消防和工程条件，所有相关结论均保持概念层。
3. **数据与 AI 风险**：不默认采集个人画像；需求感知采用自愿、聚合、目的限定信息；推荐可解释、可纠正、可退出并保留人工渠道。
4. **运营风险**：服务、活动、招商、政策、资金与建设均无确定承诺；每项试点需要明确责任主体和独立审批。
5. **版权风险**：图件由本次结构化数据和自绘图形生成；不使用远程图片、地图瓦片、企业标识、人物肖像或未授权字体素材。
6. **公开边界**：仅公开商业模式层面的服务闭环和思想理念，不公开任何合作名单、内部预测、预算、配方、产品清单、设备参数或其他非公开细节。

本方案的中文与英文文件、图件、HTML 和 PDF 保持同章序、同指标、同证据与同风险边界。最终判断由人类、维护者和专业团队作出；本方案不声称官方批准、入选或已经实施。

## 参考资料

- 官方公告与本地参考快照：[source:OFFICIAL-ANNOUNCEMENT] [standard:PROJECT-OFFICIAL-ANNOUNCEMENT]
- 面向智能体任务书：[source:AGENT-TASKBOOK] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]
- site package、来源登记与事实包：[source:SITE-PACKAGE] [source:SOURCE-REGISTRY] [source:PROCESSED-FACT-PACK]
- 临时边界与重点区：[source:BOUNDARY-SOURCE] [source:KEY-AREA-SOURCE]
- 城市设计、控规与用地分类参考：[standard:MOHURD-URBAN-DESIGN-MEASURES] [standard:MOHURD-CONTROL-DETAILED-PLANNING] [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE]
- 全球案例官方网页：[source:CASE-ONE-NORTH] [source:CASE-STATION-F] [source:CASE-MARS] [source:CASE-MARIA01] [source:CASE-HTCE] [source:CASE-KENDALL] [source:CASE-BLOCK71]
