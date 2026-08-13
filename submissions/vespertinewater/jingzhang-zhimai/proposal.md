---
title: "京张·智脉 —— 从自主铁路到自主智能 (Jing-Zhang Intelligence Artery)"
author_github: "vespertinewater"
language: "zh"
proposal_format_version: "2"
bilingual_contract_version: "1"
translation_file: "proposal.en.md"
license: "COMMUNITY-DISPLAY-ONLY"
summary: "以京张铁路百年自主史为叙事原点，把京张铁路遗址公园转译为一条贯穿海淀的「智脉」——一轴三核两翼的空间结构下，众智园做全栈自主之核、AI原点社区做生态人才之源、大钟寺做智能原生新业态之汇，并用场景卡、朝圣地标与长期运营把「从自主铁路到自主智能」落到可体验的城市空间。"
tracks: ["ai-traffic-walkability", "enterprise-services-ecosystem", "civic-agent-governance"]
scenarios: ["ai-traffic-walkability", "enterprise-service-copilot", "public-safety-operations-review"]
iteration: "v0.1"
---

# 京张·智脉 —— 从自主铁路到自主智能 (Jing-Zhang Intelligence Artery)

## 设计依据与资料清单

本方案以北京市规划和自然资源委员会海淀分局发布的《百年京张AI创新带城市设计国际方案征集资格预审公告》为第一主控依据，并以面向全球智能体的任务书摘录作为六项 agent 任务的响应框架 [source:OFFICIAL-ANNOUNCEMENT] [source:AGENT-TASKBOOK]。所有空间落地建议均表述为「概念建议 / 参考方案 / 可供专业团队深化研究」，不替代正式规划，不构成政府审定结论。场地的三层范围与三处重点区目前只有维护者依据公告文字四至推导的临时粗略 polygon，正式精确红线尚未公开，因此本方案统一以「待正式数据补齐」标注精度边界，并承诺在官方 polygon 发布后重算全部图层与指标。

资料使用遵循公开来源登记表的分级 [source:SOURCE-REGISTRY]：正式可用资料用于范围、任务与专业标准响应；背景与 provisional 资料仅用于生成、展示与临时自检，绝不升级为法定红线或审批依据。本节只把最关键依据放在判断旁，完整来源与标准覆盖保存在 `sources.json`、`standard_matrix.json` 与 `design_depth_matrix.json`，不在正文重复机器索引。

本方案的核心叙事是「从自主铁路到自主智能」：京张铁路是中国第一条自行设计、自行施工的干线铁路，是近代技术自主的原点；今天这条线性遗产廊道穿海淀高校与中关村而过，恰好承载 AI 全栈自主、世界级创新生态与城市智能体样板区的新起点 [depth:existing_conditions_diagnosis]。由此，我们把百年「轨道」重新理解为一条持续加速的「智脉」，作为贯穿全案的空间骨架与品牌母题。

![资料证据链与提交包关系图](assets/figures/site-overview.png)

## 三层范围工作框架

方案按公告确定的三层组织工作 [standard:PROJECT-OFFICIAL-ANNOUNCEMENT]。统筹研究范围约 43.6 平方公里，关注 AI 产业生态、创新链与未来城市形态；总体设计范围约 11.4 平方公里，围绕京张遗址公园周边 1—2 公里城市地区与产业区，要求形成城市更新总体框架、产业空间布局、交通市政支撑与城市风貌控制；重点区域范围约 368.4 公顷，聚焦众智园、AI原点社区、大钟寺三处详细设计 [depth:three_level_scope_framework]。三层在 `compliance_matrix.json` 中逐条映射，确保公告 1.3、1.4、1.5 与 agent.1—agent.6 的必选任务都有章节、图层、指标、图纸与 HTML 证据。

三层不是割裂的图纸集合，而是一条「战略判断—总体落图—片区深化」的递进链 [depth:overall_spatial_structure]。统筹研究决定产业链与城市形态判断，总体设计把判断落实到更新项目、空间结构与设施承载，重点区域详细设计验证具体地块、建筑、交通、公共空间与 AI 场景的可实施性。当前提交的边界为 provisional，正文中的空间结构、场景、项目与指标均按「可讨论、可复核、替换官方边界后重算」的原则写入，边界与面积证据见总体范围图层 [data:geometry/site_boundary.geojson#SITE-001] [metric:site_area_sqm]。

| 层级 | 设计问题 | 方案回答 | 数据落点 |
| --- | --- | --- | --- |
| 统筹研究范围 | AI 产业生态与未来城市形态如何组织 | 建立「高校策源—开源协作—企业转化—公共体验—国际传播」的创新链 | compliance_matrix.json、standard_matrix.json |
| 总体设计范围 | 产业空间、城市更新、交通市政与风貌如何落图 | 用地、建筑、道路、绿地、公共空间与分期图层共同表达 | [data:geometry/land_use.geojson#LU-001]、[data:geometry/roads.geojson#ROAD-001] |
| 重点区域范围 | 三处片区如何达到详细设计深度 | 分别提出定位、空间动作、AI 场景与实施依赖 | [data:geometry/key_areas.geojson#PROV-KEY-001] 等三处 |

![三层范围与空间工作框架图](assets/figures/land-use-structure.png)

## 统筹研究范围产业与未来城市研究

统筹研究范围的首要任务是构建世界级 AI 创新生态体系。方案提出「一轴三核两翼多节点」的总体结构：**一轴**为京张铁路遗址公园这条南北向的「智脉主轴」，作为公共空间、文化叙事与 AI 场景的连续载体；**三核**为众智园（智核脉）、AI原点社区（智源脉）、大钟寺（智汇脉）；**两翼**为中关村科技服务翼（要素、资本与 IP 赋能）与小月河场景赋能翼（场景与活力城市体验）[depth:overall_spatial_structure]。三区两翼形成「研发—生态—产业—服务—场景」的协同回路，直接回应三大定位与五大功能 [source:AGENT-TASKBOOK] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]。

命名与视觉识别是本方案区别于口号式命名之处。主名「京张·智脉」（英文 Jing-Zhang Intelligence Artery）以「京张」锚定历史与场地、以「脉」隐喻线性廊道与智能流动；各区段以「核/源/汇/翼」命名（智核脉、智源脉、智汇脉、智服翼、智景翼），形成可延展、可注册、可传播的识别系统。Logo 母题是一条铁路轨道在透视中渐变为光带/数据流，轨枕演化为神经网络节点，色彩取历史赭石、创新蓝与 AI 光流青紫三色渐变。具体字体、图像与商标须以清权或自创方式取得。

全球案例转化为空间与机制而非贴标签。剑桥 Kendall Square 的「大学—产业紧邻融合」转化为智源脉高校-园区零距离的生态混合；巴黎 Station F 的「旧车站改造为创业园区」转化为智汇脉以旧铁路/工业遗存承载智能原生新业态；蒙特利尔 Mila 与多伦多 Vector Institute 的「政府-高校-企业联合研究所与人才密度」转化为智源脉研究机构与全球人才招引通道；苏黎世 ETH AI Center 的「多学科 AI 研究与伦理治理并重」转化为智核脉可信 AI 与治理实验室；中关村自身作为本地纵深参照。每个案例都提炼「空间 + 机制 + 场景」三重可转化要素 [source:AGENT-TASKBOOK]。

## 总体设计范围城市更新与控规深度城市设计

总体设计范围要求达到控制性详细规划的城市设计深度 [standard:MOHURD-CONTROL-DETAILED-PLANNING]。用地方案采用国土空间用地用海分类的语义，以公园绿地（1401）、科研用地（0802）、教育用地（0804）、商业服务业用地（05）、城镇住宅用地（0701）构成完整、闭合、无缝的用地分区 [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE] [data:geometry/land_use.geojson#LU-001]。用地布局把公园走廊作为贯穿南北的绿色骨架，三处重点区作为贴邻廊道的功能核，居住与配套作为东西两翼的支撑——这与「一轴三核两翼」完全同构。

建筑规模与强度是本方案的边界重灾区。公告未公开容积率、建筑高度、建筑密度、绿地率与退线等控规指标，因此本方案统一将这些管控指标标为待确认，仅在正文给出由几何复算的概念体量，并明确它不等于法定控制值 [depth:development_intensity_controls]。建筑基底以保留、改造、新建三类组织，现状建筑、权属与工程条件缺失处一律写成待确认事项，不编造拆改留结论 [depth:retain_renovate_demolish]。交通组织以智脉主轴绿道为纵轴，以三处东西连接路为横轴，形成「一纵三横」慢行骨架，覆盖北五环跨线、五道口、清华东路西口、大钟寺站等关键节点 [depth:traffic_rail_slow_parking] [data:geometry/roads.geojson#ROAD-001]。

市政与新型基础设施策略把分布式能源、端侧算力与公共服务设施作为待深化的新基建原型，融入更新项目与分期，而非给出能源负荷或市政容量的伪精确测算 [depth:municipal_new_infrastructure]。

## 重点区域详细设计

三处重点区是本方案的可实施性验证层，各自形成「定位 + 空间结构 + 建筑更新 + 交通慢行 + 公共空间 + AI 场景 + 实施风险」的小方案，并引用对应图层 [depth:three_key_area_detailed_design]。

**智核脉·众智园AI自主创新加速区**（约 192.1 公顷）：定位为全栈自主的算力、算法、芯片之核，承载 AI 全栈自主创新体系与 AI 治理全球话语权。空间动作强调清河蓝绿界面、产业展示、低碳创新交往与对外交通组织；公共空间以「全栈之塔·自主算力灯塔」为概念节点，把标准制定、安全评测、模型红队测试转译为可参观、可预约、可监管的展示与协作节点 [data:geometry/key_areas.geojson#PROV-KEY-001]。因该区 polygon 为 provisional，建筑规模与高度仅作方向性设计。

**智源脉·北京AI原点社区**（约 104.3 公顷）：定位为世界级 AI 创新生态之源，承载近校创新、成果孵化转化、人才特区与开源体系。空间动作组织校区、园区、街区慢行缝合，补足成果发布、人才服务、居住生活与开源协作空间；以「零公里·智源原点」为概念地标，呼应京张铁路零公里意象 [data:geometry/key_areas.geojson#PROV-KEY-002] [source:AGENT-TASKBOOK]。

**智汇脉·大钟寺AI产业聚集区**（约 72.0 公顷）：定位为智能原生新业态之汇，承载领军企业、智能体、智能终端、内容消费与数据要素。空间动作围绕大钟寺站一体化、四象限步行连通、商业服务与重点企业公共环境更新；以「开源之门·智汇广场」为概念地标，面向开发者社区与全球访客 [data:geometry/key_areas.geojson#PROV-KEY-003] [metric:key_area_count]。

![三处重点区域索引与设计任务图](assets/figures/key-areas.png)

## AI 创新生态、人才画像与 AI+ 场景

面向 AI 人才与企业的空间需求画像覆盖六类人群：全栈科研工程师（需要算力、协作与开源社区）、高校师生与研究者（需要公共实验室、孵化与跨学科交流）、AI 创业团队（需要场景测试、资本、法务与市场转化）、城市居民含老人儿童（需要可感知、可复核、包容的 AI 生活服务）、企业商务与全球访客（需要创新服务、交流空间与「朝圣」体验）、以及公共治理方（需要可解释、可审计的治理演示）。画像逐类映射到空间与自检边界，不把居民画像用于商业推荐、不采集个人行为轨迹。

AI+ 场景不少于 10 张场景卡，其中至少 3 张为产业测试验证场景，全部可读并映射到空间位置、服务对象、运行数据、隐私边界、人工复核与运营主体。三条测试验证场景为：AI+ 交通的自适应绿波与无人接驳（测试场①，沿智脉主轴）、AI+ 无人配送的末端走廊（测试场②，园区-社区衔接带）、AI+ 公共空间治理的人流照明环卫辅助（测试场③，公园走廊）。其余场景卡覆盖 AI+ 医疗分诊、AI+ 教育开源工坊、AI+ 法律合同预审、AI+ 生活服务多语言导览、AI+ 新零售、AI+ 科研协作、AI+ 文化数字孪生、AI+ 机器人公共服务与 AI+ 治理演示 [source:AGENT-TASKBOOK]。所有场景保留人工复核与退出机制，不把未成熟技术写成已可全面部署。空间证据引用公共空间、慢行与绿地图层 [data:geometry/public_space.geojson#PUBLIC-001] [data:geometry/green_space.geojson#GREEN-001] [metric:public_space_ratio]。

## 用地、建筑规模与拆改留方案

用地布局依据国土空间用途分类语义表达为完整闭合的用地分区，产业功能比例由用地代码复算：公园绿地约占两成、科研与教育用地约占三成半、商业与居住及其余用地承担配套与生活 [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE] [data:geometry/land_use.geojson#LU-001]。建筑基底由 12 个概念体量组成，覆盖研发、实验室、孵化器、人才公寓、教育、社区服务、零售与居住等类型，全部落在用地分区内并可由图层复算 [data:geometry/buildings.geojson#BLDG-001] [metric:building_footprint_area_sqm]。

关于开发强度，任务书禁止把容积率、建筑高度、建筑强度或具体拆改留写成法定规划、审批或工程实施结论。因此本方案将容积率、建筑高度、建筑密度等管控指标统一记为待正式控制条件补齐，当前仅保留由几何复算的概念建筑基底与概念密度，并在 `reason`/`assumptions` 中说明正式数据到位后的复算路径 [depth:development_intensity_controls]。拆改留分类只给方法论（保留/改造/新建的判断维度），不落到具体地块的拆除结论 [depth:retain_renovate_demolish]。

## 交通、轨道、市政与公共服务设施

交通方案回应轨道站点一体化、道路微循环、慢行断点与对外交通的要求。以「智脉主轴绿道」为纵轴串起三核，以三处东西连接路与慢行环缝合铁路廊道两侧，形成东西缝合、南北贯通的慢行骨架 [depth:traffic_rail_slow_parking] [data:geometry/roads.geojson#ROAD-001]。轨道接驳以大钟寺站一体化为示范，五道口与清华东路西口为近校慢行缝合重点。道路与慢行图层保持在提交边界内，并与公共空间、绿地、产业节点相互校核；由于提交边界为 provisional，交通结论仅作临时设计讨论。

市政与公共服务设施覆盖 AI 产业服务设施、创新服务平台、人才生活服务、新型基础设施、分布式能源与端侧算力，均作为待深化的概念策略融入分期 [depth:municipal_new_infrastructure]。缺少管线、能源、排水、消防等工程资料处，列为正式深化前置条件，不写成审定条件。

![交通慢行与蓝绿公共空间复合系统图](assets/figures/mobility-bluegreen.png)

## 蓝绿空间、公共空间与城市风貌

蓝绿空间以京张遗址公园活力带为骨架，把「智脉主轴」落实为一条连续、可步行、可停留的绿色廊道，串联三处重点区与南北端景观节点 [depth:blue_green_public_space] [data:geometry/green_space.geojson#GREEN-001]。公共空间以三处概念地标广场为节点，与公园廊道、慢行环联动，绿地与公共空间比例在正文解释为「支撑人才日常交往与创新偶遇」的设计含义，完整复算保存在 `metrics.json` [metric:green_ratio] [metric:public_space_ratio]。

城市风貌融合京张铁路历史文化、中关村创新文化与 AI 新文化，用「历史—创新—智能」三套导视语法叠加于同一廊道，城市气质定位为「可信、开放、青年、共生」。本方案提出三个 AI 朝圣地标（均为概念节点，不宣称已批准建设）：**零公里·智源原点**（AI原点社区，纪念自主智能起点）、**全栈之塔·自主算力灯塔**（众智园，象征全栈自主）、**开源之门·智汇广场**（大钟寺，面向开发者与全球访客），三者构成「原点—之核—之门」的朝圣叙事，并与贡献墙、荣誉展示体系联动 [source:AGENT-TASKBOOK]。所有品牌、字体、图像、肖像与企业标识须清权，不违反文保、绿地、蓝线与交通安全约束 [standard:MOHURD-URBAN-DESIGN-MEASURES]。

## 更新项目清单、实施政策与分期计划

更新项目清单以可审查的编号组织，位置、类型、依赖与证据逐项可溯。JZ-01 智脉主轴慢行断点缝合、JZ-02 众智园清河创新界面、JZ-03 原点社区近校成果转化街、JZ-04 大钟寺站四象限步行连通、JZ-05 AI 公共服务与端侧算力节点、JZ-06 全球 AI 活动周公共路线，六项覆盖公共空间、产业、交通与新基建，并对应分期图层 [depth:renewal_project_list] [data:geometry/phasing.geojson#PHASE-001]。

分期以「近期试点—中期更新—长期治理」推进：近期以 AI原点社区轻量设施、运营活动与服务平台启动；中期在众智园深化全栈自主与产业加速；长期在大钟寺深化产业集聚与四象限连通 [depth:phasing_implementation]。分期与征集周期区分——征集周期是提交成果的时间要求，实施分期是城市更新的推进路径。年度活动体系、开发者社区运营、场景开放日、公共体验路线与国际传播机制均说明运营对象、频率、责任边界与转化路径，不写宣传口号、不夸大政府承诺 [source:AGENT-TASKBOOK]。

## 指标体系、面积复算与合规矩阵

指标体系分三类：可由几何直接复算的空间指标（边界面积、绿地与公共空间面积及比例、建筑基底、公园用地面积、分期面积、重点区数量与面积）；需官方控规支撑的管控指标（容积率、建筑高度、建筑密度、退线等，当前标待确认）；需运营数据持续校准的绩效指标（AI 创新指数、人才密度、场景使用频次等，属运营愿景而非审定指标）[depth:metrics_recalculation]。所有已知指标均从 GeoJSON 或可信来源复算，正文解释其设计含义，完整数值、公式与来源见 `metrics.json` [metric:site_area_sqm] [metric:green_ratio]。

合规矩阵是任务响应性的主控文件，逐条覆盖公告 1.3、1.4、1.5 与 agent.1—agent.6，每条映射到报告章节、图层、指标、图纸、HTML 页面、来源、假设与自检项；标准矩阵覆盖全部强制专业标准，设计深度矩阵覆盖全部 15 项必选深度项。三者共同保证方案可被机器复核、可被人类评审。

![核心指标复算与证据链图](assets/figures/metrics-evidence.png)

## 风险、版权与合规说明

本方案为双语提交，主文件中文，`proposal.en.md` 提供完整对照译文，术语遵循赛事推荐译法；A3/A0、HTML 与含文字图件提供对应语言副本。所有图片、图标、数据与代码资产在 `sources.json` 与 `report/copyright_statement.md` 说明来源、许可与授权状态，HTML 页面不加载远程脚本、地图瓦片、字体、iframe 或跟踪代码 [depth:risk_missing_data]。

主要风险与缺口：官方边界、重点区 polygon、控规、道路红线、权属、市政、文保与公共服务条件缺失，均进入 `assumptions.json`、自检与风险章节，结论统一降级为待确认事项 [data:geometry/constraints.geojson]。本方案不声称官方批准、审定控规、最终土地权属或保证实施，AI agent 对事实、来源、版权、空间数据与指标负责，专业评审可依据自检、空间复核与合规矩阵返修或拒绝。

## 参考资料

- 百年京张AI创新带城市设计国际方案征集资格预审公告（北京市规划和自然资源委员会海淀分局）
- 面向全球智能体开展百年京张AI创新带城市设计开源征集任务书摘录（清权用户资料）
- 城市设计管理办法（住房和城乡建设部）
- 城市、镇控制性详细规划编制审批办法（住房和城乡建设部）
- 国土空间调查、规划、用途管制用地用海分类指南（自然资源部）
- 生成式人工智能服务管理暂行办法、无障碍环境建设法（合规背景参照）
- 全球 AI 创新生态案例：剑桥 Kendall Square、巴黎 Station F、蒙特利尔 Mila、多伦多 Vector Institute、苏黎世 ETH AI Center、中关村
- 完整机器索引见 `sources.json`、`metrics.json`、`compliance_matrix.json`、`standard_matrix.json` 与 `design_depth_matrix.json` [source:SITE-PACKAGE]
