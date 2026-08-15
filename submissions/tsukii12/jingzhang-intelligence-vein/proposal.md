---
title: "京张智脉·百年赓续——百年京张AI创新带综合城市设计方案"
author_github: "tsukii12"
language: "zh"
proposal_format_version: "2"
bilingual_contract_version: "1"
translation_file: "proposal.en.md"
license: "COMMUNITY-DISPLAY-ONLY"
summary: "以京张铁路百年文化为脉、AI创新生态为魂，构建'一带三核两翼多点'的空间结构，将43.6平方公里的统筹研究范围转化为世界级AI创新朝圣地。方案提出'京张智脉'总体概念、6大AI场景群、3处朝圣地标和全球AI活动体系，所有空间建议均为概念建议，待正式数据发布后复算。"
tracks: ["ai-traffic-walkability", "enterprise-services-ecosystem", "civic-agent-governance"]
scenarios: ["ai-traffic-walkability", "enterprise-service-copilot", "public-safety-operations-review", "ai-cultural-guide"]
iteration: "v1.0"
---

# 京张智脉·百年赓续——百年京张AI创新带综合城市设计方案

## 设计依据与资料清单

本方案以北京市规划和自然资源委员会海淀分局发布的《百年京张AI创新带城市设计国际方案征集资格预审公告》为第一法定依据 [source:OFFICIAL-ANNOUNCEMENT]，以面向全球智能体的开源征集任务书为agent任务依据 [source:AGENT-TASKBOOK]。场地资料包中经维护者登记的临时粗略边界、三处重点区域polygon、枚举、规划限值和来源清单构成机器可读依据 [source:SITE-PACKAGE]。

方案在生成前已读取 `design_brief.json`（三层范围与设计任务）、`agent_taskbook.json`（六项agent任务与共创原则）、`allowed_design_space.json`（设计空间边界）、`sources.json`（资料来源清单）、`planning_limits.json`（规划限值，容积率/高度/密度/绿地率/退线均为missing状态）和 `data/source_registry.json`（公开来源注册表）[source:SOURCE-REGISTRY]。当前formal可用资料7条、背景资料1条、provisional-only资料1条；agent不得将background或provisional资料升级为official boundary或法定控规 [source:PROCESSED-FACT-PACK]。

所有设计判断均拆分为可追溯来源、可复算指标、可校验图层和可人工复核假设。公告要求方案达到控制性详细规划的城市设计深度和规划综合实施方案的城市设计深度，因此文本叙述不替代GeoJSON、指标表、A3图册、A0展板和HTML电子展示成果 [depth:existing_conditions_diagnosis]。

![资料证据链与提交包关系图](assets/figures/site-overview.png)

本方案在官方SITE_BOUNDARY尚未取得时，使用 `brief/site-package/geometry/provisional_boundaries.geojson` 生成临时formal包 [data:geometry/site_boundary.geojson#SITE-001]。提交包中的site_boundary与key_areas均标注为 `provisional_constraint`、`official_boundary=false`，仅用于方案生成、自检、可视化和设计讨论，不作为official redline或审批依据 [metric:site_area_sqm]。该组织方数据缺口不阻断内容评分；替换official polygons后，所有图层和指标均需重算。

## 三层范围工作框架

方案按照公告确定的三个层次组织工作。统筹研究范围（43.6平方公里）关注AI产业生态、战略定位、创新链和未来城市形态；总体设计范围（11.4平方公里）关注京张遗址公园周边1-2公里城市地区，要求形成城市更新总体框架、产业空间布局、交通市政支撑和城市风貌控制；重点区域范围（368.4公顷）关注三处详细设计地区，要求明确功能业态、建筑规模、拆改留分类、公共空间连通和交通组织 [depth:three_level_scope_framework] [depth:overall_spatial_structure]。

三层工作框架的深度项由设计深度矩阵约束，空间证据以 [data:geometry/site_boundary.geojson#SITE-001] 与 [data:geometry/key_areas.geojson#PROV-KEY-001] 为准，任务依据以 [standard:PROJECT-OFFICIAL-ANNOUNCEMENT] 为准。

![三层范围与空间工作框架图](assets/figures/land-use-structure.png)

本方案提出"京张智脉共生带"总体空间概念：以京张遗址公园为历史与公共空间主轴，以众智园、北京AI原点社区、大钟寺三处重点片区为创新锚点，以高校、企业、社区和轨道站点为日常网络，形成"一带三核两翼多点"的空间组织结构。"一带"即京张铁路遗址公园文化活力带；"三核"对应三处重点区域；"两翼"为中关村科技服务翼和小月河场景赋能翼；"多点"为AI+公共服务、产业服务和城市生活的可运营节点。

| 层级 | 设计问题 | 方案回答 | 数据落点 |
| --- | --- | --- | --- |
| 统筹研究范围 | AI产业生态和未来城市形态如何组织 | 建立"高校策源-开源协作-企业转化-公共体验-国际传播"的创新链 | compliance_matrix.json、standard_matrix.json |
| 总体设计范围 | 产业空间、城市更新、交通市政和风貌如何落图 | 用地、建筑、道路、绿地、公共空间和分期图层共同表达 | [data:geometry/land_use.geojson#LU-001]、[data:geometry/roads.geojson#ROAD-001] |
| 重点区域范围 | 三处片区如何达到详细设计深度 | 分别提出定位、空间动作、AI场景和实施依赖 | [data:geometry/key_areas.geojson#PROV-KEY-001]、[data:geometry/key_areas.geojson#PROV-KEY-002]、[data:geometry/key_areas.geojson#PROV-KEY-003] |

## 统筹研究范围产业与未来城市研究

### 总体概念与命名体系（agent.1）

本方案提出"京张智脉"（Jingzhang Intelligence Vein，简称JZ-IV）作为一带总体名称。"京张"承续百年铁路的历史身份——1909年詹天佑主持修建的京张铁路是中国人自主设计建造的第一条干线铁路；"智脉"将铁路的物理脉络升华为AI时代的数据与智能脉络，形成从"铁脉"到"智脉"的百年赓续 [source:AGENT-TASKBOOK]。

命名体系如下：

| 层级 | 名称 | 英文 | 含义 |
| --- | --- | --- | --- |
| 一带总名 | 京张智脉 | Jingzhang Intelligence Vein (JZ-IV) | 百年铁路脉络与AI智能脉络的赓续 |
| 文化带 | 京张百年叙事带 | Centennial Narrative Belt | 铁路历史与工程精神的时空叙事 |
| 生活体验带 | AI都市生活带 | AI Urban Life Belt | AI+生活场景的可感知体验 |
| 创新融合带 | 智轨创新带 | Smart Rail Innovation Belt | 产业、算力与数据的融合创新 |
| 众智园 | 众智花园 | Zhongzhi Garden | "众智"寓意集体智慧与开源协作 |
| AI原点社区 | 智原社区 | AI Origin Community | AI创新的原点与策源地 |
| 大钟寺 | 智钟产业港 | Zhizhong Industry Port | "钟"承大钟寺地名，"智"注AI产业 |

Logo方向：以铁轨横截面的几何形态为基础骨架，融入数据流脉冲线条，形成兼具工程感与数字感的标识。主色建议为"京张铁灰"（#2C3E50）与"智脉蓝"（#3498DB）的组合，辅以"赓续红"（#E74C3C）点缀，体现历史厚度与创新活力 [source:AGENT-TASKBOOK]。Logo及视觉识别方向为概念建议，实际使用须另行清权和设计深化。

总体空间结构遵循"三大定位、五大功能、三区两翼"的协同框架 [source:AGENT-TASKBOOK]：
- **三大定位**：百年京张文化带、都市AI生活体验带、AI融合创新带
- **五大功能**：AI全栈自主创新体系、世界级AI创新生态、AI+场景赋能新范式、智能化AI活力城市、AI治理全球话语权
- **三区两翼**：众智园加速区（AI全栈自主创新+AI治理话语权）、AI原点社区（世界级AI创新生态）、大钟寺产业区（智能原生新业态）；中关村科技服务翼（要素全球化配置+资本赋能）、小月河场景赋能翼（AI场景赋能+智能化活力城市）

### 全球AI创新生态案例研究（agent.2）

方案梳理了8个全球AI创新生态案例，提取可转化为海淀空间策略的经验 [source:AGENT-TASKBOOK]：

| 编号 | 案例 | 核心特征 | 海淀转化策略 |
| --- | --- | --- | --- |
| EC-01 | 硅谷（美国） | 高校策源(斯坦福/伯克利)+风投+企业生态 | 强化清华/北大/北航策源，建立高校-园区-企业创新走廊 |
| EC-02 | 中关村（北京） | 中国硅谷，高校密集+科技企业集聚 | 作为"科技服务翼"承接要素配置和资本赋能 |
| EC-03 | 筑波科学城（日本） | 国家科研机构集中布局的规划型科学城 | 众智园可借鉴"花园型研发街区"空间模式 |
| EC-04 | One-North（新加坡） | 研发+商业+居住混合的创新街区 | AI原点社区采用混合用地促进创新交往 |
| EC-05 | Station F（巴黎） | 全球最大创业孵化器，集中共享设施 | 原点社区建设集中式开源孵化平台 |
| EC-06 | 马斯达尔城（阿联酋） | 可持续技术驱动的未来城市 | 众智园探索低碳算力与绿色创新交往环境 |
| EC-07 | 多伦多Quayside（加拿大） | 智慧城市街区，数据驱动治理 | 小月河翼试点AI+城市治理场景 |
| EC-08 | 赫尔辛基-Otaniemi（芬兰） | 高校+研发+创业的紧凑创新生态 | 强化校区-园区-社区慢行缝合和成果转化 |

以上案例为公开信息整理，不涉及企业内部数据。案例经验转化为空间策略时，均表述为概念建议，不构成政府实施承诺 [source:AGENT-TASKBOOK]。

### 未来城市形态研究

未来城市形态研究回答AI如何改变工作、生活、社交、学习、交通和公共服务。方案将AI交通系统、连续绿色空间、创新服务设施和国际化生活工作氛围落实为可定位的功能区、节点、廊道和场景 [standard:MOHURD-URBAN-DESIGN-MEASURES]。产业战略指标（AI创新指数、人才密度、空间供给类型）写入指标体系，标明哪些是官方、哪些是设计建议、哪些待正式数据校准 [data:geometry/land_use.geojson#LU-001] [data:geometry/public_space.geojson#PUBLIC-001]。

## 总体设计范围城市更新与控规深度城市设计

总体设计范围要求达到控制性详细规划的城市设计深度 [standard:MOHURD-CONTROL-DETAILED-PLANNING]。方案提出城市更新总体空间结构：以京张遗址公园为南北主轴，东西两侧组织产业服务与社区生活功能，形成"主轴贯通、东西缝合、节点激活"的更新框架。

用地布局依据国土空间用地用海分类指南 [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE]，在 [data:geometry/land_use.geojson#LU-001] 中分为四类：AI研发创新用地（0802）、公园绿地与开敞空间（1401）、产业服务与商业服务用地（05）、社区服务与配套用地（0702）。用地分区完整覆盖设计边界且无重叠 [depth:land_use_layout]。

建筑方案区分保留、改造、更新、新建四类 [data:geometry/buildings.geojson#BLDG-001]。若缺少现状建筑、权属、控规和工程条件，方案只提出方法和待校准清单 [depth:retain_renovate_demolish]。建筑高度、开发强度、退线等控制指标在 `planning_limits.json` 中均为missing状态，方案将其列为pending_control，不以推测值冒充审定指标 [depth:height_massing_character] [depth:development_intensity_controls]。

交通组织围绕轨道站点一体化、道路微循环和慢行断点缝合展开 [data:geometry/roads.geojson#ROAD-001] [depth:traffic_rail_slow_parking]。重点覆盖北五环跨环路节点、五道口、清华东路西口和大钟寺站。市政和公共服务设施覆盖AI产业服务设施、创新服务平台、人才生活服务设施、新型基础设施、分布式能源和端侧算力 [depth:municipal_new_infrastructure]。缺少管线、能源、消防等工程资料时列为正式深化前置条件。

## 重点区域详细设计

### 众智园AI自主创新加速区（192.1公顷）

**设计定位**：花园型全栈自主创新街区，承载AI全栈自主创新体系与AI治理全球话语权两大功能 [data:geometry/key_areas.geojson#PROV-KEY-001] [source:AGENT-TASKBOOK]。

**空间策略**：
- 强化清河界面，形成"清河低碳创新廊"，将绿色空间、雨洪管理、步行骑行和AI展示结合 [data:geometry/green_space.geojson#GREEN-001]
- 产业展示轴线连接北五环交通节点与核心研发区，提供自主模型测试、标准制定工作坊和低碳算力体验的可参观界面
- 以花园型街区组织研发办公空间，借鉴筑波科学城和马斯达尔城的低密度绿色研发模式
- 安全治理展示区将标准制定、安全评测、模型红队测试转译为可参观、可预约、可监管的协作节点

**AI场景**：自主模型测试场、标准制定工作坊、安全治理沙盒、低碳算力体验站

**实施依赖**：清河蓝线、生态防洪条件、对外交通组织复核——均为待确认事项

### 北京AI原点社区（104.3公顷）

**设计定位**：近校型成果转化与人才社区，承载世界级AI创新生态功能 [data:geometry/key_areas.geojson#PROV-KEY-002] [source:AGENT-TASKBOOK]。

**空间策略**：
- 校区-园区-街区慢行缝合，组织五道口/清华东路西口与社区内部的步行骑行连通 [data:geometry/roads.geojson#ROAD-001]
- 建设集中式开源孵化平台（借鉴Station F模式），提供成果发布、代码贡献展示和小型路演空间
- 成果转化街组织孵化、展示、法务、知识产权和投融资服务，面向高校成果转化
- 人才特区服务嵌入居住生活配套，提供国际化生活工作氛围

**AI场景**：开源发布厅、近校成果转化街、人才特区服务站、AI教育体验点

**实施依赖**：校区边界、权属、首层业态——均为待确认事项

### 大钟寺AI产业聚集区（72.0公顷）

**设计定位**：城市型智能经济与国际交往街区，承载智能原生新业态功能 [data:geometry/key_areas.geojson#PROV-KEY-003] [source:AGENT-TASKBOOK]。

**空间策略**：
- 大钟寺站一体化设计，实现四象限步行连通 [data:geometry/public_space.geojson#PUBLIC-001]
- 国际路演客厅服务智能体、智能终端和内容消费企业的展示、洽谈、媒体发布和国际交流
- 数据要素会客厅以合规、授权、可审计为前提，展示数据要素和数字资产流通的城市服务界面
- 重点企业周边公共环境更新，提升商业服务和国际接待品质

**AI场景**：大钟寺国际路演客厅、数据要素会客厅、智能终端展示街

**实施依赖**：轨道站点、道路交叉口、市政管线——均为待确认事项

![三处重点区域索引与设计任务图](assets/figures/key-areas.png)

三处重点区域详细设计必须达到规划综合实施方案的城市设计深度 [depth:three_key_area_detailed_design]。若polygon为provisional，正文结论只能作为方向性设计 [source:PROVISIONAL-BOUNDARIES-2026]。

## AI 创新生态、人才画像与 AI+ 场景

### 用户画像（agent.3）

方案建立6类用户画像，覆盖AI人才和企业的空间需求 [source:AGENT-TASKBOOK]：

| 用户画像 | 典型需求 | 空间响应 | 隐私边界 |
| --- | --- | --- | --- |
| 开源开发者 | 发布、协作、测试、社区声誉 | 原点社区开源发布厅、公共代码墙、夜间协作空间 | 不采集个人行为轨迹；活动数据只做聚合统计 |
| 初创团队 | 低成本办公、算力入口、产品试验场 | 众智园共享测试场、端侧算力服务点 | 算力和数据服务需另行授权 |
| 头部企业访客 | 展示、商务、国际接待、人才招聘 | 大钟寺国际路演客厅、轨道站点接驳 | 企业标识和案例须清权 |
| 周边居民 | 通勤、休闲、社区服务、低扰动更新 | 京张遗址公园慢行环、社区服务嵌入 | 不将居民画像用于商业推荐 |
| 高校师生 | 成果转化、跨校协作、日常慢行 | 校区-园区慢行缝合、成果转化驿站 | 校园数据和科研成果需授权 |
| 国际AI人才 | 国际化生活、工作签证服务、文化交流 | 国际人才服务站、多语言导视、国际公寓 | 个人信息按相关法律法规保护 |

### AI场景卡（agent.3）

方案提供13张AI场景卡，其中3张为产业测试验证场景 [source:AGENT-TASKBOOK]：

| 场景卡 | 空间载体 | 服务对象 | 设计说明 | 运营主体 | 隐私边界 |
| --- | --- | --- | --- | --- | --- |
| 01 开源发布厅 | AI原点社区 | 开发者/高校/初创 | 成果发布、代码贡献展示、小型路演 | 开源社区运营 | 聚合统计，不采集行为轨迹 |
| 02 安全治理沙盒 | 众智园 | 企业/监管/研究者 | 标准制定、安全评测、模型红队测试 | 治理平台运营 | 测试数据隔离，需授权 |
| 03 端侧算力驿站 | 总体设计范围节点 | 开发者/企业/居民 | 分布式算力服务、低碳能源结合 | 算力服务商 | 算力使用需授权 |
| 04 AI慢行导航 | 京张遗址公园 | 居民/访客/游客 | 可解释导视、低侵入传感识别慢行断点 | 城市运营平台 | 仅聚合流量数据，无个人画像 |
| 05 大钟寺国际路演客厅 | 大钟寺产业区 | 企业/投资人/媒体 | 展示、洽谈、媒体发布、国际交流 | 产业服务运营 | 企业信息须清权 |
| 06 清河低碳创新廊 | 众智园临清河界面 | 研发者/居民/游客 | 绿色空间+雨洪+步行骑行+AI展示 | 园区运营 | 环境数据公开 |
| 07 近校成果转化街 | AI原点社区 | 高校师生/初创/投资人 | 孵化、展示、法务、知识产权、投融资 | 成果转化平台 | 科研数据需授权 |
| 08 数据要素会客厅 | 大钟寺片区 | 企业/监管/研究者 | 数据要素和数字资产流通服务界面 | 数据交易平台 | 合规授权，可审计 |
| 09 AI生活服务样板街 | 社区与商业交汇处 | 居民/访客 | 医疗、教育、法律、生活服务AI+场景 | 社区服务运营 | 个人数据按法规保护 |
| 10 全球AI活动周路线 | 一带公共空间系统 | 全体用户 | 从遗址文化到国际路演的可步行体验路线 | 活动运营 | 公共活动数据 |
| 11 ★自动驾驶测试走廊 | 众智园-清河界面 | 企业/监管/研究者 | 封闭与半开放自动驾驶测试路段，含V2X基础设施 | 测试平台运营 | 测试数据隔离，需授权 |
| 12 ★城市智能体治理仿真平台 | 大钟寺片区 | 政府/企业/研究者 | 城市治理数字孪生仿真，公共安全运营预演 | 治理平台运营 | 治理数据脱敏，人工复核 |
| 13 ★AI+医疗应急响应测试区 | AI原点社区周边 | 医院/急救/居民 | AI辅助分诊、应急调度、远程医疗测试 | 医疗机构运营 | 医疗数据按法规保护，人工复核 |

★标注为产业测试验证场景。所有场景均表述为概念建议，不构成已批准运营 [source:AGENT-TASKBOOK]。

### AI朝圣地标（agent.4）

方案提出3处AI朝圣地标和荣誉展示节点 [source:AGENT-TASKBOOK]：

**1. 詹天佑智脉灯塔**——位于京张遗址公园北端（众智园临清河界面），以现代材料重构铁路信号塔意象，集成AI光影互动装置，夜间呈现京张铁路百年历史与AI创新数据流的对话。地标为概念建议，实际建设须清权、文保审核和工程可行性确认。

**2. 开源代码墙**——位于AI原点社区核心广场，以实体墙面投影展示全球开源贡献者代码片段和贡献统计，成为开发者朝圣和合影的标志节点。内容须遵循开源许可证，不展示个人隐私信息。

**3. 智能体荣誉长廊**——沿京张遗址公园设置，以碑刻或数字展板形式记录每年最杰出的AI agent和贡献者，形成可持续更新的纪念体系。荣誉展示须取得贡献者授权。

以上地标设计须遵守文保、绿地、蓝线和交通安全约束，不得违反相关法规 [source:AGENT-TASKBOOK]。

### 文化叙事（agent.5）

方案构建"百年京张·三重时间"的文化叙事体系 [source:AGENT-TASKBOOK]：

- **第一重时间·铁路百年（1909-2026）**：以詹天佑和京张铁路为历史主线，利用清华园火车站遗址、铁轨遗存和工程符号，讲述中国人自主设计建造第一条干线铁路的工程精神。文化导览路线从北端詹天佑智脉灯塔出发，沿遗址公园向南串联历史节点。
- **第二重时间·创新四十年（1980s-2026）**：以中关村电子一条街到科技园区的演进为线索，讲述中国科技创新从贸易到研发、从模仿到自主的转型。空间载体包括近校成果转化街和创新文化展廊。
- **第三重时间·AI新纪元（2026-）**：以AI原生场景、智能体协作和开源社区为内容，讲述AI如何改变城市生活和创新方式。空间载体包括开源发布厅、智能体荣誉长廊和AI场景体验路线。

文化叙事与Logo系统相互独立但风格协调：Logo系统管理一带整体视觉识别，文化叙事管理内容表达和导览体验 [source:AGENT-TASKBOOK]。导视标识系统采用"铁轨+数据流"的双线视觉语言，中英双语标注，遵循 `docs/terminology-glossary.md` 的推荐译法。

### 长期运营（agent.6）

方案提出"京张智脉"全球AI创新活动体系与长期运营机制 [source:AGENT-TASKBOOK]：

**年度活动体系**：
- 京张智脉AI创新周（每年秋季）：串联开源发布、产业路演、文化导览和公共体验
- 全球开源贡献者日：面向开发者社区的年度聚会和荣誉展示
- AI场景开放日：定期向公众开放测试验证场景参观体验
- 中关村-AI原点对话论坛：连接中关村创新文化与AI新文化的年度论坛

**活动品牌**：以"京张智脉"为主品牌，年度活动使用统一视觉系统（Logo方向为概念建议，须另行设计清权）。

**开发者社区运营**：建立开源社区运营机制，提供代码贡献展示、协作空间预约、社区声誉积累和活动组织支持。运营数据只做聚合统计，不采集个人行为轨迹。

**场景开放运营**：AI场景节点定期向公众、企业和研究者开放，实行预约制和容量管理。测试验证场景须在合规框架下运行，数据隔离和人工复核。

**国际传播**：通过全球AI活动周路线、国际路演客厅和多语言导视系统提升一带全球关注度。所有活动、招商、资金和政策安排均表述为概念建议，不构成已确定政府安排 [source:AGENT-TASKBOOK]。

**转化路径**：人才→企业→产业→生态。通过人才特区服务吸引AI人才，通过孵化平台和算力入口支持初创团队成长，通过产业路演和数据要素流通促进企业落地，最终形成可持续的AI创新生态。

## 用地、建筑规模与拆改留方案

用地方案依据国土空间调查、规划、用途管制用地用海分类指南 [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE] 表达，形成完整、闭合、无缝的用地分区 [data:geometry/land_use.geojson#LU-001]。建筑方案区分保留、改造、更新、新建或待确认对象 [data:geometry/buildings.geojson#BLDG-001] [depth:retain_renovate_demolish]。

建筑规模和强度指标必须与 `metrics.json` 和图层一致 [metric:building_footprint_area_sqm]。容积率、建筑高度、建筑密度、绿地率、退线和建筑控制线缺少官方条件，在指标体系中列为pending_control [depth:development_intensity_controls] [depth:height_massing_character]。A3图册给出更新项目清单和指标复核表，A0展板把关键空间结构和重点片区表达清楚。

## 交通、轨道、市政与公共服务设施

交通方案回应公告对轨道站点一体化、道路微循环、慢行断点、对外交通、停车和绿色交通系统的要求 [depth:traffic_rail_slow_parking]。重点覆盖北五环跨环路节点、五道口、清华东路西口和大钟寺站 [data:geometry/roads.geojson#ROAD-001]。道路和慢行图层保持在提交边界内，与公共空间、绿地和重点片区相互校核。

![交通慢行与蓝绿公共空间复合系统图](assets/figures/mobility-bluegreen.png)

市政和公共服务设施覆盖AI产业服务设施、创新服务平台、人才生活服务设施、新型基础设施、分布式能源、端侧算力和传统市政设施融合 [depth:municipal_new_infrastructure]。方案说明设施标准、空间布局、服务半径和分期实施逻辑。缺少管线、能源、排水、防洪、消防等工程资料时列为正式深化前置条件 [data:geometry/constraints.geojson#CONSTRAINTS]。

## 蓝绿空间、公共空间与城市风貌

蓝绿空间方案以京张遗址公园活力带为骨架，统筹清河、小月河和周边高校、企业、社区出行需求 [depth:blue_green_public_space]。提出南北贯通、东西连通的步道、骑行道和绿色空间体系 [data:geometry/green_space.geojson#GREEN-001] [data:geometry/public_space.geojson#PUBLIC-001]。识别慢行断点、上跨环路节点和景观节点，提出停车、体育、创新交往和科技测试复合利用策略。

绿地率 [metric:green_ratio] 和公共空间率 [metric:public_space_ratio] 在正文解释设计意义：绿地支撑人才生活品质和创新交往，公共空间支撑AI场景的可感知体验。完整数值保存在 `metrics.json`。

城市风貌方案融合京张铁路历史文化、中关村创新文化和AI创新文化 [standard:MOHURD-URBAN-DESIGN-MEASURES]。利用清华园火车站遗址等文化资源，提出城市基调、建筑风貌、屋顶形态和公共艺术引导。导视标识、文化符号、AI朝圣地标和荣誉展示体系须有清权来源，不得过度娱乐化或把概念地标写成已批准建设 [source:AGENT-TASKBOOK]。

## 更新项目清单、实施政策与分期计划

方案形成可审查的更新项目清单 [depth:renewal_project_list] [depth:phasing_implementation]：

| 项目编号 | 项目名称 | 类型 | 主要依赖 | 证据引用 |
| --- | --- | --- | --- | --- |
| JZ-01 | 京张遗址公园慢行断点缝合 | 公共空间/交通 | 道路红线、桥下空间 | [data:geometry/roads.geojson#ROAD-001] |
| JZ-02 | 众智园清河创新界面 | 蓝绿空间/产业展示 | 河道蓝线、防洪条件 | [data:geometry/green_space.geojson#GREEN-001] |
| JZ-03 | 原点社区近校成果转化街 | 城市更新/产业服务 | 校区边界、权属 | [data:geometry/buildings.geojson#BLDG-001] |
| JZ-04 | 大钟寺站四象限步行连通 | 轨道一体化/慢行 | 轨道站点、市政管线 | [data:geometry/public_space.geojson#PUBLIC-001] |
| JZ-05 | AI公共服务与端侧算力节点 | 新基建/公共服务 | 能源、算力、安全 | [data:geometry/constraints.geojson#CONSTRAINTS] |
| JZ-06 | 全球AI活动周公共路线 | 运营/品牌 | 公共空间许可、版权 | [data:geometry/phasing.geojson#PHASE-001] |
| JZ-07 | 詹天佑智脉灯塔 | 文化地标/公共艺术 | 文保审核、工程可行性 | [data:geometry/public_space.geojson#PUBLIC-001] |
| JZ-08 | 开源代码墙 | 文化地标/社区 | 产权、开源许可证 | [data:geometry/key_areas.geojson#PROV-KEY-002] |
| JZ-09 | 智能体荣誉长廊 | 纪念体系/公共空间 | 公园许可、贡献者授权 | [data:geometry/green_space.geojson#GREEN-001] |
| JZ-10 | 自动驾驶测试走廊 | 测试场景/新基建 | 交通组织、V2X设施 | [data:geometry/constraints.geojson#CONSTRAINTS] |

分期 [data:geometry/phasing.geojson#PHASE-001]：
- **近期试点（1-2年）**：慢行缝合、开源发布厅、AI活动周路线等轻量设施和运营活动
- **中期更新（3-5年）**：重点片区建筑更新、产业服务设施、端侧算力节点
- **长期治理（5年以上）**：全面空间实施、国际传播体系、长期运营机制

## 指标体系、面积复算与合规矩阵

指标体系包含三类 [depth:metrics_recalculation]：

**第一类·空间指标（可由提交几何直接复算）**：
- 总体设计范围面积 [metric:site_area_sqm]：11,412,825.39 sqm
- 绿地率 [metric:green_ratio]：12.34%
- 公共空间率 [metric:public_space_ratio]：7.33%
- 建筑基底面积 [metric:building_footprint_area_sqm]：310,807.18 sqm
- 重点区域数量 [metric:key_area_count]：3

**第二类·管控指标（需官方控规支撑，当前为pending_control）**：
- 容积率 [metric:floor_area_ratio]：unknown（缺少审定FAR控制条件）
- 建筑高度：missing（缺少高度控制条件）
- 建筑密度：missing
- 绿地率（管控值）：missing
- 退线：missing

**第三类·绩效指标（需运营数据持续校准）**：
- AI创新指数：概念指标，待运营数据校准
- 人才密度：概念指标，待产业数据校准
- 慢行可达性：概念指标，待交通数据校准
- 活动参与度：概念指标，待运营数据校准

![核心指标复算与证据链图](assets/figures/metrics-evidence.png)

合规矩阵覆盖公告1.3、1.4、1.5全部必选任务和agent.1至agent.6全部任务，保存在 `compliance_matrix.json`。专业标准响应保存在 `standard_matrix.json`，设计深度证据保存在 `design_depth_matrix.json`。

## 风险、版权与合规说明

**双语要求**：方案主文件使用中文（language: zh），通过 `proposal.en.md` 提供完整英文对照译文；A3/A0、HTML和含文字图件提供对应语言内容 [source:AGENT-TASKBOOK]。

**版权与合规**：所有图片、图纸、数据资产在 `sources.json` 或 `report/copyright_statement.md` 中说明来源和许可。HTML页面不加载远程脚本、远程地图瓦片、远程字体、iframe、表单或外部API [depth:risk_missing_data]。

**数据缺口**：official boundary、key area polygon、控规条件、道路红线、地块权属、建筑现状、市政管线和文保条件均缺失，已在 `assumptions.json` 和自检中登记 [source:PROVISIONAL-BOUNDARIES-2026]。

**概念建议属性**：所有空间落地建议均表述为"概念建议""参考方案""可供专业团队深化研究"，不替代正式规划，不构成政府审定结论 [source:AGENT-TASKBOOK]。

本方案不声称官方批准、审定控规、最终土地权属、最终建设规模或保证实施。AI agent对事实、来源、版权、空间数据、指标和表达负责；维护者和专业评审可依据自检结果、空间复核和合规矩阵要求返修或拒绝。

## 参考资料

- 北京市规划和自然资源委员会海淀分局，《百年京张AI创新带城市设计国际方案征集资格预审公告》（2026-05-09）
- 面向全球智能体的开源征集任务书摘录（2026-05-18）
- 北京市科学技术委员会，《"三区两翼"打造世界级AI集聚地》（2026-04-03）
- 住房和城乡建设部，《城市设计管理办法》（2017-03-14）
- 住房和城乡建设部，《城市、镇控制性详细规划编制审批办法》
- 自然资源部，《国土空间调查、规划、用途管制用地用海分类指南》（2023-11-22）
- 海淀区人民政府，《海淀区"1+X+1"现代化产业体系建设布局》（2026-03-02）
- 仓库维护者登记的临时粗略边界与重点区polygon（2026-06-05）
- 完整机器索引：见 `sources.json`、`metrics.json`、`compliance_matrix.json`、`standard_matrix.json`、`design_depth_matrix.json` [source:SITE-PACKAGE] [source:OFFICIAL-ANNOUNCEMENT] [source:AGENT-TASKBOOK]
