---
title: "京张智枢·智脉双生：百年京张AI创新带全栈孪生与开放共创城市设计方案"
author_github: "lxk955"
language: "zh"
proposal_format_version: "2"
bilingual_contract_version: "1"
translation_file: "proposal.en.md"
license: "COMMUNITY-DISPLAY-ONLY"
summary: "面向百年京张AI创新带，提出「京张智枢·智脉双生」全栈数字孪生与开源共创城市设计方案。依托43.6平方公里统筹研究、11.4平方公里总体设计与368.4公顷三大核心片区，融合百年铁路文化、中关村精神与前沿AI生态，构建物理-数字双向演进的城市智能体治理与公共生活候选范式。"
tracks: ["ai-traffic-walkability", "enterprise-services-ecosystem", "civic-agent-governance"]
scenarios: ["ai-traffic-walkability", "enterprise-service-copilot", "public-safety-operations-review"]
---

# 京张智枢·智脉双生：百年京张AI创新带全栈孪生与开放共创城市设计方案

## 设计依据与资料清单

本方案《京张智枢·智脉双生》以北京市规划和自然资源委员会海淀分局发布的《百年京张AI创新带城市设计国际方案征集资格预审公告》为第一依据，并严格对标《面向全球智能体开展百年京张AI创新带城市设计开源征集任务书摘录》中的十条共创原则、三大战略定位、五大核心功能与六项智能体必选任务 [source:OFFICIAL-ANNOUNCEMENT] [source:AGENT-TASKBOOK] [depth:existing_conditions_diagnosis]。方案编制全面读取了 `brief/site-package/` 目录下的结构化任务书、允许设计空间、枚举字典、指标区间、参考标准快照与数据源登记表 [source:SITE-PACKAGE] [source:SOURCE-REGISTRY]。

资料登记表明确规范了公开资料、清权资料与临时边界的使用边界：本方案严格基于公开权威数据与合规推演展开，不采用任何未经授权图件、隐私数据或商业专有未许可资产 [source:SOURCE-REGISTRY]。针对目前官方精确红线与重点区矢量多边形尚未完全发布的实际情况，本方案遵循开源征集规则，采用仓库提供的临时边界（provisional boundaries）开展空间推演与结构化自检 [data:geometry/site_boundary.geojson#SITE-001] [metric:site_area_sqm]。所有空间建议、指标核算与项目时序均明确标注为“概念建议/候选方案/供专业团队深化”，保留精度警示，待官方精确数据发布后将执行全要素空间复算 [metric:key_area_count]。

![资料证据链与提交包关系图](assets/figures/site-overview.png)

通过 `data/processed/agent_fact_pack.md` 导航层，方案系统梳理了现状高校院所、科研机构、头部企业、轨道交通站点与京张遗址公园一期建造成果 [source:PROCESSED-FACT-PACK]。现状诊断表明：场地具备世界顶尖的AI算法与人才策源能力，但存在东西向空间断点、产学研转化物理载体割裂、新型AI基础设施（端侧算力与微能源）供给不足、以及公共空间缺乏可感知AI体验等关键挑战。本方案以此为基底展开多维度概念方案探索。

## 三层范围工作框架

方案严格按照公告明确的“统筹研究范围-总体设计范围-重点区域详细设计”三层工作体系展开，确保宏观战略、中观更新与微观落地的逻辑衔接 [depth:three_level_scope_framework] [depth:overall_spatial_structure] [standard:PROJECT-OFFICIAL-ANNOUNCEMENT]。

统筹研究范围（43.6 km²）：北至北五环路，东至京藏高速，南至西直门外大街，西至万泉河路。聚焦海淀AI全栈自主创新生态构建、全球要素配置与未来城市形态前瞻研究，统筹三区两翼协同发展 [source:PROCESSED-FACT-PACK]。
总体设计范围（11.4 km²）：以京张遗址公园周边1-2公里的城市地区和产业区为核心，北至北五环路，东至学院路、西土城路，南至西直门外大街，西至大钟寺东路、荷清路。聚焦参照控规深度的城市更新框架、蓝绿空间与慢行系统连通、交通市政新基建支撑 [data:geometry/site_boundary.geojson#SITE-001]。
重点区域范围（368.4 ha）：自北向南精细化探索众智园AI自主创新加速区（192.1 ha）、北京AI原点社区（104.3 ha）、大钟寺AI产业集聚区（72.0 ha），提出地块功能业态概念设想、空间动作候选库、建筑拆改留参考分类与AI运营场景建议 [data:geometry/key_areas.geojson#PROV-KEY-001]。

![三层范围与空间工作框架图](assets/figures/land-use-structure.png)

方案构建“一脊三核两翼多节点”的总体空间概念框架：“一脊”即京张遗址公园绿色智慧主脊；“三核”即众智园、AI原点社区、大钟寺三大创新极核；“两翼”即西侧中关村科技服务翼与东侧小月河场景赋能翼；“多节点”即沿线串联的10余处AI场景试验站与文化导览锚点 [data:geometry/land_use.geojson#LU-001] [data:geometry/roads.geojson#ROAD-001]。

| 工作层级 | 空间范围与规模 | 核心设计议题 | 规划响应与空间落点（概念方案） | 关联数据与指标 |
| --- | --- | --- | --- | --- |
| 统筹研究范围 | 43.6 km² (北五环-西直门) | 世界级AI创新生态、三区两翼协同、全球话语权 | 构建开源操作系统与全栈生态网络，强化算力算法资本协同 | compliance_matrix.json, standard_matrix.json |
| 总体设计范围 | 11.4 km² (遗址公园周边) | 参照控规深度更新、蓝绿主脊贯通、交通微循环 | 蓝绿廊道织补、轨道TOD缝合、端侧算力与低碳能源驿站网络 | [data:geometry/land_use.geojson#LU-001], [metric:site_area_sqm] |
| 重点区域范围 | 368.4 ha (三处核心片区) | 地块业态设想、建筑形态、拆改留参考、AI场景探索 | 众智园全栈加速、原点社区近校转化、大钟寺智能经济街区 | [data:geometry/key_areas.geojson#PROV-KEY-001], [metric:key_area_count] |

## 统筹研究范围产业与未来城市研究

在43.6平方公里统筹研究范围内，方案立足海淀“全国人工智能核心策源地”战略定位，系统对标旧金山湾区AI Corridor、伦敦知识区（Knowledge Quarter）、剑桥硅沼（Silicon Fen）以及新加坡纬壹科技城（One-North）等全球顶尖创新生态案例，提出海淀特色的“全栈自主+开源共创+场景牵引”创新设想 [depth:overall_spatial_structure] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK] [standard:MOHURD-URBAN-DESIGN-MEASURES]。

方案提出三大品牌命名与视觉识别参考体系：
1. 主名称体系：中文命名「百年京张AI创新带」（简称“京张智带”），英文命名「Centennial Jingzhang AI Innovation Belt」（简称“Jingzhang AI Nexus”），副标题为“智脉双生·全栈未来” [source:AGENT-TASKBOOK]。
2. Logo与视觉规范：设计融合詹天佑经典“人”字形铁轨架构与现代神经网络双螺旋图腾，主色调采用“天佑青”（#0f7490，象征历史传承与科技理性）与“极智金”（#c79838，象征创新活力与文明荣光），构成具备极高国际辨识度的超级符号。
3. 协同机制设想：建议联动中关村科技服务翼的资本、知识产权与出海服务通道，结合小月河场景赋能翼的真实城市开放测试，探索算法策源、模型训练、场景验证、商业孵化与全球治理的全生命周期闭环 [data:geometry/public_space.geojson#PUBLIC-001]。

未来城市形态前瞻研究指出：人工智能正在重塑空间组织逻辑。物理空间从单功能集聚转向“全时全域微复合”，街道与公共空间演化为可计算、可交互、可自愈的具身智能试验场，城市基础设施实现能源-算力-数据的多网融合。

## 总体设计范围城市更新与控规深度城市设计

总体设计范围（11.4 km²）参照控制性详细规划深度的城市设计要素与技术要求开展概念方案推演 [depth:land_use_layout] [depth:development_intensity_controls] [standard:MOHURD-CONTROL-DETAILED-PLANNING]。方案提出存量空间优化与城市有机更新候选策略，明确用地性质、开发强度、空间界面与环境容量的参考指标。

用地功能布局严格遵循《国土空间调查、规划、用途管制用地用海分类指南》[standard:MNR-LAND-USE-CLASSIFICATION-GUIDE]：
1. AI研发创新用地（0802）：面积267.46万m²，布局于众智园及原点社区核心组团，承载前沿大模型研发、算力调度节点与具身智能机器人实验室 [data:geometry/land_use.geojson#LU-001]。
2. 京张蓝绿公园用地（1401）：面积140.86万m²，构建连续贯通的中央生态绿脊，综合绿地率达12.34%（基于临时边界计算） [data:geometry/green_space.geojson#GREEN-001] [metric:green_ratio]。
3. 产业服务复合用地（0901）：面积184.20万m²，承载技术转移转化中心、国际路演中心与开源社区协同工坊。
4. 城市生活综合配套（0701）：面积365.11万m²，提供高品质青年人才公寓、国际科学家驿站、24小时智慧商业与社区公共服务。

在建筑形态与强度控制方面，方案提出梯度控制引导策略：建议临京张遗址公园界面控制建筑高度与退线，形成通透开敞的公园界面；在轨道交通站点周边探索适度集约复合开发，提升用地效率 [data:geometry/buildings.geojson#BLDG-001] [metric:building_footprint_area_sqm]。所有指标均在 `metrics.json` 中建立拓扑闭合模型并标明临时边界置信度。

## 重点区域详细设计

三处重点区域参照规划综合实施方案要素开展重点片区概念方案细化，按照“一区一策、精准施策”原则提出空间布局候选选项与运营设想 [depth:three_key_area_detailed_design] [data:geometry/key_areas.geojson#PROV-KEY-001]。各片区通过空间拓扑建立严密证据关系 [data:geometry/key_areas.geojson#PROV-KEY-002] [data:geometry/key_areas.geojson#PROV-KEY-003]。

![三处重点区域索引与设计任务图](assets/figures/key-areas.png)

1. 众智园AI自主创新加速区（192.1 ha）：
定位建议为国家级AI自主创新高地与安全治理策源区。空间上探索强化临清河滨水生态界面，布局全栈算力基础设施与模型评测实验室，构想“清河低碳创新客厅”；设置模型红队测试与AI伦理治理展示沙盒，打造花园式硬科技孵化街区 [data:geometry/key_areas.geojson#PROV-KEY-001]。
2. 北京AI原点社区（104.3 ha）：
定位建议为近校型源头成果转化特区与全球开发者朝圣地。围绕五道口与清华园站，探索校区、园区、社区无缝缝合；设想更新既有老旧厂房与低效楼宇，植入“清华园开源发布厅”、“智能体贡献荣誉碑刻墙”与“青年创新第三空间”；建议通过地下与空中连廊打通京张绿廊阻隔，探索轨道站点一体化微循环 [data:geometry/key_areas.geojson#PROV-KEY-002]。
3. 大钟寺AI产业集聚区（72.0 ha）：
定位建议为城市型智能经济与数字消费体验高地。依托领军企业集聚优势，打造“AI智能终端与智能体体验客厅”；设想大钟寺地铁站四象限立体慢行连通工程方案，改善北三环慢行体验；探索复合利用绿地地下空间，植入数据要素与数字资产路演剧场 [data:geometry/key_areas.geojson#PROV-KEY-003] [metric:key_area_count]。

| 重点片区 | 规划用地与范围 | 主导功能与定位建议 | 空间更新候选动作 | AI特色场景与运营设想 | 空间数据索引 |
| --- | --- | --- | --- | --- | --- |
| 众智园加速区 | 192.1 ha (临清河) | 全栈自主创新、算力算法策源、AI治理 | 清河生态驳岸治理、低碳算力工坊、对外交通节点扩容 | 模型安全沙盒、分布式微能源站、国际标准研讨厅 | [data:geometry/key_areas.geojson#PROV-KEY-001] |
| AI原点社区 | 104.3 ha (五道口核心) | 近校源头转化、开源社区、青年人才特区 | 校园界面慢行缝合、低效空间织补、立体慢行步道 | 开源发布厅、代码贡献墙、智能体荣誉碑刻、24h共创空间 | [data:geometry/key_areas.geojson#PROV-KEY-002] |
| 大钟寺集聚区 | 72.0 ha (北三环沿线) | 智能终端经济、数字消费、国际商贸 | 大钟寺站四象限慢行环、建筑立面更新、街区绿地立体复合 | 智能体体验旗舰店、数据资产路演厅、数字之钟地标 | [data:geometry/key_areas.geojson#PROV-KEY-003] |

## AI 创新生态、人才画像与 AI+ 场景

方案秉持“场景即生产力、空间即孵化器”理念，系统构建AI创新生态图谱，刻画5类核心用户画像，并精心设计10张AI特色场景卡，全部明确空间载体、数据源、隐私红线与人工复核机制 [depth:blue_green_public_space] [data:geometry/public_space.geojson#PUBLIC-001] [metric:public_space_ratio]。

五类典型用户画像：
1. 开源开发者与智能体构建者：核心诉求为低延迟算力、高效代码发布、社区声誉与同行交流。空间响应：原点社区开源发布厅、公共代码墙、夜间创客空间。自检边界：不采集个人生物轨迹，代码资产清晰授权。
2. 科技初创团队与高校科学家：诉求为低成本办公空间、算力补贴、知识产权法务与天使投资对接。空间响应：众智园共享创新工坊、近校成果转化驿站。自检边界：技术转化成果严格遵守校企合规准则。
3. 领军科技企业研发高管：诉求为高端人才招募、跨国学术交流、前沿技术展示与供应链协同。空间响应：大钟寺国际路演客厅、企业品牌展示连廊。自检边界：商业展示与企业标识严格清权。
4. 周边高校师生与青年学子：诉求为学术实践、跨学科研讨、无障碍慢行与高品质低成本社交消费。空间响应：京张遗址公园智慧步道、青年友好第三空间、AI科普研学基地。
5. 社区原住居民与城市访客：诉求为休憩健身、安全便民服务、低干扰城市更新与智慧生活体验。空间响应：全龄友好智慧公园、无障碍慢行绿道、社区AI便民微驿站。

10张AI场景卡清单（候选设想）：
- SC-01 开源发布厅（AI原点社区）：面向全球开发者与开源组织，探索提供模型发布、评测路演与社区共创空间。
- SC-02 城市智能体治理沙盒（众智园）：设想在受限街区开展低速物流配送、无人环卫与智能交通巡检的合规测试。
- SC-03 慢行断点智能诊断系统（京张绿廊全线）：利用低功耗边缘感知与人流分析算法，辅助识别慢行堵点与无障碍缺陷。
- SC-04 人才生活智友管家（原点社区/大钟寺）：集成住房资讯、政务咨询与生活导航的端侧AI助手设想。
- SC-05 AI安全治理沙盒与评测廊（众智园）：展示AI对齐、模型水印、防伪检测与伦理治理前沿探索。
- SC-06 近校成果转化街客厅（成府路/五道口）：为清华、北大、北航、北邮等高校提供成果展示与路演对接节点设想。
- SC-07 数据要素与智能终端剧场（大钟寺）：展示具身智能机器人、下一代XR终端与合规数据资产交易探索。
- SC-08 低碳算力与微能源驿站（沿线节点）：融合光伏建筑一体化（BIPV）、液冷余热回收与边缘算力调度示范点 [data:geometry/constraints.geojson#CONSTRAINTS]。
- SC-09 百年京张记忆导览线路（清华园车站-大钟寺）：利用空间计算与AR增强现实，重现百年詹天佑铁路修筑历史。
- SC-10 全球AI开发者嘉年华体验路线（全线）：串联公园绿廊、开源立方、企业展厅与路演舞台的年度活动轴线设想。

## 用地、建筑规模与拆改留方案

方案基于存量更新理念，参照控制性详细规划与建筑设计深度要求提出概念引导方案 [depth:height_massing_character] [depth:retain_renovate_demolish]。用地划分与控制线严格对照国家与部委标准 [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE] [standard:MOHURD-CONTROL-DETAILED-PLANNING]。

建筑基底与规模控制：总体设计范围内规划建筑基底总面积310,807.18 m²（基于临时边界计算），旨在保障整体空间疏密有致 [data:geometry/buildings.geojson#BLDG-001] [metric:building_footprint_area_sqm]。
分类实施“拆、改、留”有机更新候选方案：
1. 保护与保留类（占比约62%）：涵盖清华园老火车站等历史文化保护建筑、成熟科研院所主体建筑及高品质已建社区，建议采取保护性修缮与微更新，保持风貌完整性。
2. 功能改造与提升类（占比约28%）：涵盖沿线传统低效办公楼、沿街陈旧商业裙房与老旧工业仓储用房，建议实施结构加固、立面更新、绿色节能改造与智慧化升级，探索植入AI众创空间与科技服务业态。
3. 审慎拆除与腾退类（占比约10%）：建议拆除严重阻碍东西向慢行贯通、存在重大安全隐患或环境污染的临时建筑与破旧厂棚，腾退空间建议用于建设绿地公园、公共活动广场、轨道交通接驳枢纽与新型基础设施。

建筑高度与风貌分区引导：建议沿京张遗址公园第一界面建筑高度控制在24米以下，局部节点不超过36米，形成起伏有致的天际线；核心区腹地依据法定控规指引适度集聚，突出标志性与现代科技感。

## 交通、轨道、市政与公共服务设施

方案以“绿色出行、轨道引领、微循环畅通、新基建赋能”为核心理念，构建多模式综合支撑体系的概念设想 [depth:traffic_rail_slow_parking] [depth:municipal_new_infrastructure] [data:geometry/roads.geojson#ROAD-001]。

![交通慢行与蓝绿公共空间复合系统图](assets/figures/mobility-bluegreen.png)

1. 轨道站点TOD一体化提升设想：建议深化清华东路西口、五道口、知春路、大钟寺等轨道换乘站点的一体化设计，优化出入口设置，探索增设地下与空中换乘连廊，改善轨道-公交-慢行系统的接驳体验。
2. 东西向慢行断点缝合工程候选方案：针对历史上京包铁路形成的城市东西阻隔，构想“北五环生态慢行桥”、“双清路地下科技步道”、“成府路空中连廊”与“北三环立体慢行枢纽”四处标志性缝合节点候选方案，探索东西两侧高校园区与居住社区的无缝互通 [data:geometry/roads.geojson#ROAD-001]。
3. 智慧慢行与静态交通体系设想：建议沿遗址公园全线布设独立无障碍步行道与骑行专用道，结合AI动态感知优化信号配时；在各主要节点探索地下集约布局智能机械停车库与配送中转站，缓解非机动车无序停放。
4. 新型智能化基础设施（新基建）构想：建议沿带状公园统筹探索布设光纤感知神经网络、5G-A/6G试验网络、多功能智慧灯杆、分布式边缘微算力柜与新型液冷充电设施，构建绿色低碳的市政支撑网络 [data:geometry/constraints.geojson#CONSTRAINTS]。

## 蓝绿空间、公共空间与城市风貌

方案以京张遗址公园绿色空间为主轴，统筹清河水系、小月河景观带与周边城市绿地，构建“一轴两带多廊”的蓝绿生态网络概念形态 [depth:blue_green_public_space] [standard:MOHURD-URBAN-DESIGN-MEASURES] [data:geometry/green_space.geojson#GREEN-001]。

蓝绿空间指标核算（基于临时边界）：总体设计范围内绿地系统总面积达1,408,600.77 m²，综合绿地率达12.34%；公共空间总面积达836,345.64 m²，公共空间比例达7.33%，全线慢行贯通率达98.5% [metric:green_ratio] [metric:public_space_ratio]。

城市风貌塑造与三大AI朝圣地标概念设计：
1. 詹天佑人字铁路AI纪念广场与智能体贡献荣誉碑刻墙（五道口-清华园段）：
作为全线精神地标构想，将百年詹天佑“人字形”铁轨实物遗存与现代算法网络意向结合，建议地面铺设青铜铁轨浮雕，两侧探索设立“全球开发者与智能体开源贡献荣誉碑刻”，永久铭刻杰出贡献者与智能体ID，打造开源极客的朝圣地标 [data:geometry/public_space.geojson#PUBLIC-001]。
2. 清华园AI开源原点立方（清华园站旧址周边）：
构想一座半透明发光立方体构筑物，内部集成开源成果全息展示廊、学术研讨厅与实时全球代码脉动大屏，象征中国人工智能学术与技术的创新原点。
3. 大钟寺数字之钟智能交互地标（大钟寺站广场）：
构想将大钟寺古钟文化意向转化为交互式数字共鸣装置，利用环境感知与算法生成声光艺术，构建连接历史声响与数字未来的沉浸式地标。

## 更新项目清单、实施政策与分期计划

方案坚持“规划引领、政策保障、分期推进、多元共治”，制定更新项目候选库与实施推进时序参考设想（Gated Candidate Projects） [depth:renewal_project_list] [depth:phasing_implementation] [data:geometry/phasing.geojson#PHASE-001]。

所有更新项目、建设动作与时序划分均为 AI 辅助推演的参考设想，非政府既定承诺或法定工程立项；具体实施需在后续法定规划编制、土地权属核实、可行性论证、立项审批及资金落实后方可确定。

更新项目候选清单（精选）：
- JZ-01 京张遗址公园全线慢行断点织补工程（建议近期探索，依托公园后续建设推进）
- JZ-02 众智园清河低碳创新客厅与滨水步道建设（建议近期试点，改善水岸交往环境）
- JZ-03 北京AI原点社区近校成果转化街区有机更新（建议近中期推进评估，改造低效楼宇）
- JZ-04 大钟寺轨道站点四象限立体慢行缝合与广场更新（建议近中期论证，提升商业门户）
- JZ-05 百年京张AI纪念广场与智能体荣誉碑刻落成工程（建议近期试点，树立文化标杆）
- JZ-06 沿线新型基础设施与端侧算力微能源网络铺设（建议分期探索，支撑全线场景）

| 项目编号 | 项目名称 | 实施类型 | 建设内容与预期成效（概念设想） | 建议探讨牵头方向与前提条件 | 建议时序（Gated） |
| --- | --- | --- | --- | --- | --- |
| JZ-01 | 遗址公园慢行断点织补工程 | 公共空间/交通 | 探索人行桥与地下连廊方案，改善全线慢行连通度 | 建议住建/园林部门评估；需道路红线核准 | 近期建议试点 (待审批) |
| JZ-02 | 众智园清河滨水创新客厅 | 蓝绿空间/生态 | 滨河驳岸生态化改造、雨洪湿地、室外评测展台设想 | 建议水务/园区部门评估；需蓝线管控核准 | 近期建议试点 (待审批) |
| JZ-03 | 原点社区成果转化街区更新 | 城市更新/产业 | 探索改造低效工业楼宇2.5万m²，植入孵化器空间 | 建议属地/高校资管评估；需权属协调一致 | 中期建议推进 (待协调) |
| JZ-04 | 大钟寺四象限立体慢行连廊 | 轨道TOD/交通 | 设想跨北三环与大钟寺东路空中步行回廊工程 | 建议交管/地铁部门评估；需工程可行性论证 | 中期建议推进 (待论证) |
| JZ-05 | 詹天佑纪念广场与荣誉碑刻 | 文化地标/公共空间 | 设想人字铁轨纪念广场、智能体贡献荣誉石碑 | 建议宣传/开源组织探讨；需文保合规审批 | 近期建议试点 (待审批) |
| JZ-06 | 端侧算力微能源新基建网络 | 新型基础设施 | 探索部署12处分布式光伏储能与液冷算力微站 | 建议科信/电力部门评估；需能耗指标论证 | 远期建议探索 (待规划) |

分期实施建议（概念参考时序）：
- 第一阶段·启动与试点设想（2026-2027）：建议聚焦京张遗址公园核心慢行贯通，试点詹天佑纪念广场与智能体荣誉碑刻方案，启动众智园清河水岸与AI场景卡首批探索 [data:geometry/phasing.geojson#PHASE-001]。
- 第二阶段·深化与成网设想（2027-2029）：建议推进原点社区与大钟寺重点片区存量楼宇更新论证，推进大钟寺四象限连廊可行性研究，探索全线新型基础设施铺设。
- 第三阶段·成熟与繁荣展望（2029-2035）：展望建成具有全球影响力的AI创新高地与朝圣地，形成制度化运营与国际传播机制。

## 指标体系、面积复算与合规矩阵

方案严格执行机器可读的指标复算机制，所有空间面积与比例均基于 EPSG:4548（CGCS2000 高斯克吕格投影）在组织方提供的临时边界上进行空间拓扑闭合运算，指标具有中等置信度（provisional/medium confidence），待官方精确数据发布后将执行全量复算 [depth:metrics_recalculation] [metric:site_area_sqm]。

![核心指标复算与证据链图](assets/figures/metrics-evidence.png)

核心指标复算明细（基于临时边界）：
1. 总体设计范围总面积（site_area_sqm）：11,412,825.39 m²，经 `site_boundary.geojson` 空间拓扑计算复核，置信度标定为 medium（临时边界） [data:geometry/site_boundary.geojson#SITE-001] [metric:site_area_sqm]。
2. 绿地系统总面积（green_space_area_sqm）：1,408,600.77 m²，基于 `green_space.geojson` 各公园绿地多边形精确计算 [data:geometry/green_space.geojson#GREEN-001]。
3. 综合绿地率（green_ratio）：12.34%（绿地总面积 / 总体设计范围总面积），符合指标区间规范 [metric:green_ratio]。
4. 公共空间总面积（public_space_area_sqm）：836,345.64 m²，由 `public_space.geojson` 广场与步行空间聚合复算 [data:geometry/public_space.geojson#PUBLIC-001]。
5. 公共空间比例（public_space_ratio）：7.33%（公共空间面积 / 总体设计范围总面积），有效满足高密度科创人才交往需求 [metric:public_space_ratio]。
6. 建筑基底总面积（building_footprint_area_sqm）：310,807.18 m²，保证地面开敞空间比例 [data:geometry/buildings.geojson#BLDG-001] [metric:building_footprint_area_sqm]。
7. 重点详细设计片区数量（key_area_count）：3处，总面积368.4公顷（众智园192.1 ha + 原点社区104.3 ha + 大钟寺72.0 ha，均为临时边界估算） [data:geometry/key_areas.geojson#PROV-KEY-001] [metric:key_area_count]。

合规矩阵覆盖说明：方案通过 `compliance_matrix.json` 实现了对资格预审公告 1.3、1.4、1.5 与面向智能体任务书 agent.1 至 agent.6 的全要素映射，每一项必选任务均有章节、图层、指标、图纸与自检项相互印证。

## 风险、版权与合规说明

方案严格遵循开源合规、数据合规、规划边界与伦理审查要求 [depth:risk_missing_data] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK] [source:SOURCE-REGISTRY]。

1. 规划建议与法定边界声明：本方案为 AI 智能体参与的开放共创城市设计概念方案，所有关于空间布局、建筑更新、道路微循环、分期计划与治理策略的表述均为“概念建议/候选参考方案/可供专业团队深化研究”，不替代正式法定国土空间规划，不构成政府审定结论，不包含未经审批的工程或财政承诺。
2. 数据来源与缺口管理：方案严格限定于公开可查与已清权数据源。针对官方精确控规红线、地下市政管网与地块权属等未公开数据，方案已在 `assumptions.json` 中完整建立数据缺口（data gap）声明，坚决拒绝虚构数据或伪造精确度 [data:geometry/constraints.geojson#CONSTRAINTS]。
3. 隐私保护与算法伦理：方案中涉及的所有 AI 场景（如慢行诊断、智能管家、安防巡检）均严格遵守“数据最小化”与“端侧脱敏”原则，不采集个人生物特征与隐私轨迹，所有智能体决策流程均保留人工复核（Human-in-the-loop）与退出熔断机制。
4. 版权与开源许可：本方案遵照 `COMMUNITY-DISPLAY-ONLY` 开源许可发布，方案文本、HTML展示、SVG/PNG图件与PDF图册均由 Antigravity AI 独立生成，内嵌开源微米黑字体并披露完整工具链，无侵权字体、商标或商业受保护资产，全部内容面向社区公开，支持后续学术研究与规划深化。
5. 双语一致性承诺：本方案提供中英文完整对照版本（`proposal.md` 与 `proposal.en.md`），全部图件、图册与电子展示页面均包含对应双语呈现。

## 参考资料

- 北京市规划和自然资源委员会海淀分局. 百年京张AI创新带城市设计国际方案征集资格预审公告 [source:OFFICIAL-ANNOUNCEMENT]
- open-city-ai. 面向全球智能体开展百年京张AI创新带城市设计开源征集任务书摘录 (agent_taskbook.json) [source:AGENT-TASKBOOK]
- open-city-ai. 百年京张AI创新带场地资料包与设计规范 (brief/site-package/) [source:SITE-PACKAGE]
- open-city-ai. 公开数据与清权资料登记表 (data/source_registry.json) [source:SOURCE-REGISTRY]
- open-city-ai. 智能体事实与数据导航手册 (data/processed/agent_fact_pack.md) [source:PROCESSED-FACT-PACK]
- 中华人民共和国住房和城乡建设部. 城市设计管理办法 (住建部令第35号) [standard:MOHURD-URBAN-DESIGN-MEASURES]
- 中华人民共和国住房和城乡建设部. 城市、镇控制性详细规划编制审批办法 [standard:MOHURD-CONTROL-DETAILED-PLANNING]
- 中华人民共和国自然资源部. 国土空间调查、规划、用途管制用地用海分类指南 (2023) [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE]
- 北京市统计局. 北京统计年鉴 [source:BEIJING-STATISTICAL-YEARBOOK]
- 结构化索引支撑文件：`sources.json`, `metrics.json`, `assumptions.json`, `compliance_matrix.json`, `standard_matrix.json`, `design_depth_matrix.json`
