---
title: "AI生活·AI创造·AI极轴——百年京张AI（爱）创新带概念规划"
subtitle: "Centennial Jing-Zhang AI Innovation Belt Concept Plan"
author_github: "maxkane411-cell"
language: "zh"
translation_file: "proposal.en.md"
license: "CC-BY-4.0"
summary: "以京张铁路遗址绿脊为南北AI极轴，串联众智园AI自主创新加速区、北京AI原点社区、大钟寺AI产业聚集区三大重点片区，提出“AI生活·AI创造·AI极轴”的空间结构与10个可验证AI+场景，提交完整的专业设计开源包。"
project_id: "centennial-jingzhang-ai-belt"
proposal_format_version: "2"
bilingual_contract_version: "1"
package_type: "professional_design_package"
package_state: "ready_for_review"
status: "formal"
iteration: "v1.0.0"
tracks:
  - urban-design-ai-submission
scenarios:
  - ai-scenario-library
---

# AI生活·AI创造·AI极轴——百年京张AI（爱）创新带概念规划

## 设计依据与资料清单

本方案基于 open-city-ai/haidian 仓库发布的百年京张AI创新带开源征集文件体系编制。核心依据包括 `design_brief.json` 中提出的三层工作范围与11项设计任务、`agent_taskbook.json` 定义的六项 agent 任务与十项共创原则、以及 `allowed_design_space.json` 中明确的可编辑与锁定图层边界 [source:SITE-PACKAGE]。由于官方道路红线、权属、市政容量和文保控制线尚未完整公开，本次概念设计使用仓库提供的临时边界 `provisional_boundaries.geojson` 作为约束，并在所有面积与比例指标中声明为 provisional、confidence=low [data:geometry/site_boundary.geojson#official_boundary=false]。

在标准层面，方案对照 `standards.json` 中列出的《城市设计管理办法》《控制性详细规划编制办法》《国土空间调查、规划、用途管制用地用海分类指南》和《建筑工程设计文件编制深度规定》等六项标准进行自洽性检查 [standard:PROJECT-OFFICIAL-ANNOUNCEMENT]。空间数据来源注册表见 `data/source_registry.json`，主要用于界定区域边界、轨道站点与既有道路骨架 [source:SOURCE-REGISTRY]。所有用地分类代码采用仓库枚举 `brief/site-package/enums/land_use_codes.json`，确保与官方分类体系可对照 [source:MNR-LAND-USE-CLASSIFICATION-GUIDE]。

## 三层范围工作框架

本方案严格对应征集任务书的三层范围：统筹研究范围约43.6平方公里、总体设计范围约11.4平方公里、重点区域范围约3.7平方公里 [metric:site_area_sqm]。在 `geometry/site_boundary.geojson` 中，临时边界 PROV-SITE-001 的面积投影约为11.41平方公里 [metric:site_area_sqm]；三处重点片区 PROV-KEY-001/002/003 分别对应众智园、北京AI原点社区和大钟寺 [data:geometry/key_areas.geojson]。

工作方法上，统筹研究范围回答“AI Belt 在全球创新网络中的角色”；总体设计范围回答“11.4平方公里如何用空间承载 AI 生活、创造与极轴”；重点区域范围回答“三个片区如何以详细设计落地” [depth:three_level_scope_framework]。所有范围在 GeoJSON 中以 `geometry_role` 和 `official_boundary` 属性加以区分，便于后续官方法定边界替换后快速复算 [data:geometry/constraints.geojson]。

## 统筹研究范围产业与未来城市研究

京张铁路遗址是近代中国自主修建的第一条干线铁路，北联清河、南接西直门，周边集聚清华、北大、中科院、北航等高校院所，以及字节、百度、小米、快手等头部科技企业 [source:PROCESSED-FACT-PACK]。本方案提出“百年京张 AI（爱）创新带”的叙事：把工业遗产的线性空间转化为 AI 时代的“城市创新脊柱”，并以“爱”的谐音强调这条 spine 服务人的情感、创造与生活。

产业研究聚焦“AI 创新链 = 源头创新 + 工程化 + 产品化 + 场景验证 + 全球传播”。统筹研究范围内，北部依托清河与上地承载大模型训练、算力与国家级平台；中部依托高校周边承载开源社区、成果转化和人才社区；南部依托大钟寺传统商圈承载AI消费、智能体商业与城市级场景发布 [source:AGENT-TASKBOOK]。五到八个全球案例被转译为本地设计策略：硅谷 downtown 与校园间的“创新走廊”提供密度与混合参考，伦敦 King's Cross 提供铁路遗产活化参考，首尔 Digital Media City 提供内容产业与公共空间复合参考，新加坡 Punggol 提供产学研住一体化街区参考，蒙特利尔 Mile-Ex 提供旧工业楼宇改造为 AI 工作室的参考。案例来源见 `sources.json` [source:SOURCE-REGISTRY]。

## 总体设计范围城市更新与控规深度城市设计

总体设计以京张铁路遗址绿脊为南北“AI极轴”，构建“三区两翼、一带多节点”的空间结构。三区从北向南依次为：AI创造区（众智园）、AI极轴区（北京AI原点社区）、AI生活区（大钟寺）。两翼向东、向西延展，分别连接高校科研带和传统居住商业带，形成“源头创新—极轴转化—生活服务”的完整闭环 [depth:overall_spatial_structure]。

![京张AI创新带基地总览图（双语标注）](assets/figures/site-overview.png)

用地结构上，概念分区由 `geometry/land_use.geojson` 给出，用地代码覆盖科研、居住、商业商务、文化、教育、医疗、道路、绿地与广场等14类，无重叠、无缝覆盖临时边界 [data:geometry/land_use.geojson]。绿地与开敞空间用地合计约261公顷，绿地率达到22.898% [metric:green_ratio]；公共空间（广场用地1403）约3.38公顷，公共空间率2.957% [metric:public_space_ratio]。建筑总投影（union）约104公顷，建筑密度约9.13%，总建筑面积约1173万平方米 [metric:building_density]。道路用地约占30.4%，形成主干路、支路网、慢行环、绿脊绿道和轨道接驳五类体系 [data:geometry/roads.geojson]。

控规深度上，本阶段给出用地边界、主导功能、建筑更新方向、开发强度意向和高度分区意向，尚未达到地块级指标赋值，待官方红线、容量和权属明确后继续深化 [depth:development_intensity_controls]。

## 重点区域详细设计

### 众智园AI自主创新加速区

众智园位于场地北部，临时面积约1.93平方公里，是“AI创造”主题区 [metric:key_area_count]。设计以“花园型自主创新街区”为定位，保留清河沿岸工业遗迹与低密度研发楼宇，植入国家AI平台、开源实验室和模型评测中心。空间策略包括：沿绿脊设置“开源发布厅”与“城市智能体沙盒”，沿东西向支路设置“校企转化客厅” [depth:detailed_design_key_areas]。建筑更新以保留改建为主，部分低效厂房拆除后建设低层研发庭院，整体高度以24–45米为主，重要节点可至60米 [standard:MOHURD-ARCH-DESIGN-DEPTH-2016]。

### 北京AI原点社区

北京AI原点社区位于场地中部，临时面积约1.04平方公里，是“AI极轴”的核心锚点 [data:geometry/key_areas.geojson]。设计定位为“近校型成果转化街区”，紧邻高校，承载从论文、开源代码到原型产品的转化。空间结构以京张绿脊和轨道站点为双轴，在站点周边设置 TOD 混合街区，融合科研、居住、商业、文化和广场；AI原点广场作为“AI朝圣地标”之一，用于举办模型发布、开发者节和公共展览 [depth:detailed_design_key_areas]。

### 大钟寺AI产业聚集区

大钟寺片区位于场地南部，临时面积约0.72平方公里，是“AI生活”主题区 [data:geometry/key_areas.geojson]。设计定位为“城市型智能经济街区”，依托传统商圈更新，引入智能体商店、AI内容消费、数据要素交易展示和AI人才公寓。空间策略包括：路口四象限连通、立体步行网络、绿地复合利用和夜间经济活力走廊。大钟寺广场作为第二处AI朝圣地标，与大钟寺古建筑群形成“古钟×新算”的文化对话 [source:PROCESSED-FACT-PACK]。

![三大重点区域布局图（双语标注）](assets/figures/key-areas.png)

## AI 创新生态、人才画像与 AI+ 场景

本方案围绕三类人才构建服务场景：第一类是“实验室创新者”，以高校师生和科研人员为主，需要安静的研发空间、快速的成果转化通道和低成本原型测试场；第二类是“工程创业者”，以初创团队和技术公司为主，需要弹性办公、算力接驳、资本对接和场景验证；第三类是“城市生活者”，以居民、通勤者和消费者为主，需要安全、便利、有AI辅助的日常生活服务 [source:AGENT-TASKBOOK]。

10个AI+场景卡分别是：01开源发布厅、02城市智能体沙盒、03慢行断点诊断、04人才生活管家、05AI安全治理廊、06校企转化客厅、07数据要素剧场、08低碳算力驿站、09京张记忆线路、10全球AI活动周路线。每个场景都明确服务对象、空间落位、数据来源、隐私边界、人工复核节点和潜在运营主体。例如“城市智能体沙盒”落位于绿脊与广场节点，仅使用公开摄像头与模拟数据，关键决策需人工复核 [source:AGENT-TASKBOOK]。

此外，方案提出3个AI朝圣地标：AI原点广场、大钟寺AI广场和绿脊上的“开源发布厅”。它们既是空间锚点，也是 AI 文化叙事与全球传播节点 [depth:overall_spatial_structure]。

## 用地、建筑规模与拆改留方案

用地分区与建筑更新在 `geometry/land_use.geojson` 和 `geometry/buildings.geojson` 中完整提交。科研用地（0802）约149公顷，占总设计范围13.1%，是创新功能的核心载体；居住用地（0701）约203公顷，保障人才社区与职住平衡；商业商务用地（0901/0902）约67公顷，支撑生活与产业服务；绿地与开敞空间（14系列）约295公顷 [data:geometry/land_use.geojson]。

建筑更新策略分为“留、改、拆、建”四类。对于现状质量较好、功能适配的建筑予以保留；对于结构尚可但功能不符的建筑进行内部改造与功能置换；对于低效、安全隐患或阻碍公共空间连通的建筑予以拆除；对于重点片区新增节点进行新建。更新项目在 `geometry/buildings.geojson` 中以 `renewal_action_concept` 字段标记，共315个建筑面；建筑 footprint 经 union 去重后约104公顷 [metric:building_footprint_area_sqm] [depth:retain_renovate_demolish]。

![用地结构规划图（双语标注）](assets/figures/land-use-structure.png)

## 交通、轨道、市政与公共服务设施

交通系统提出“一脊、一环、多支、多接驳”的慢行优先结构。一脊即京张绿脊绿道，贯穿南北；一环即串联三区的慢行环；多支即150米间距的支路网，便于街区渗透；多接驳即轨道站点与公交微枢纽的步行接驳 [data:geometry/roads.geojson]。主干路保持既有骨架，支路宽度控制在12–20米，优先保障步行、骑行和微循环车辆 [standard:MOHURD-URBAN-DESIGN-MEASURES]。

![交通慢行与蓝绿网络图](assets/figures/mobility-bluegreen.png)

轨道站点与微枢纽周边采用 TOD 紧凑开发，站点500米步行范围内鼓励混合用地与高强度更新。停车策略以配建为主、公共为辅，重点片区推行共享停车与即停即走泊位，避免地面大规模停车场割裂街区 [depth:traffic_rail_slow_parking]。

市政与公共服务设施方面，由于官方市政容量、管廊与设施点位尚未完整提供，本阶段提出“分布式低碳算力驿站”概念：将边缘算力、能源微网、公共卫生间和应急设施整合到小型建筑或景观构筑物中，沿绿脊与广场节点布置。正式市政规划发布后，需复核容量与接口 [assumption:assumptions.json]。

## 蓝绿空间、公共空间与城市风貌

蓝绿系统以京张铁路遗址绿脊为核心，向北延续至清河滨水带、向南渗透至大钟寺城市公园。绿脊宽度控制在约190米，内部划分为主绿道、雨水花园、社区农园和弹性活动草坪 [data:geometry/green_space.geojson]。公共空间由广场用地1403构成，面积3.38公顷，布置在AI原点、大钟寺、众智园入口和轨道微枢纽 [data:geometry/public_space.geojson]。

城市风貌遵循“工业遗产×AI未来”的基调。绿脊保留铁轨、道岔、信号机等遗迹线索，以现代轻质构筑物覆盖形成可逆改造；重点片区建筑以现代简约为主，局部地标允许具有科技感的造型；夜景照明以低色温功能照明为主，地标节点可采用动态光艺术 [standard:MOHURD-URBAN-DESIGN-MEASURES]。风貌控制纲要见 `report/narrative.md`。

## 更新项目清单、实施政策与分期计划

实施分为三期。近期以北京AI原点社区为启动区，依托高校与轨道站点，率先建设AI原点广场、校企转化客厅和人才公寓，快速形成创新氛围 [data:geometry/phasing.geojson]。中期向北推进众智园，建设开源发布厅、城市智能体沙盒和国家级平台园区，形成“AI创造”引擎 [data:geometry/phasing.geojson]。远期向南完成大钟寺AI产业聚集区，推动传统商圈全面智能化更新，形成“AI生活”样板 [data:geometry/phasing.geojson]。

实施政策建议包括：建立“AI场景负面清单+正面清单”双轨机制；探索“研发用地兼容商业与居住”的弹性管控；设立百年京张AI创新带城市更新基金；推动政企校联合的片区统筹平台；将绿脊沿线工业遗产纳入城市更新与文化保护协同名录 [source:AGENT-TASKBOOK]。

## 指标体系、面积复算与合规矩阵

本提交包的指标核心为三大视觉指标：site_area_sqm=11412825.386、green_ratio=0.22898、public_space_ratio=0.029572 [metric:site_area_sqm] [metric:green_ratio] [metric:public_space_ratio]。三者均可由提交几何在 EPSG:4548 投影下复算，并在 `visual/index.html` 中以 `data-value` 形式公示。全部指标结构见 `metrics.json`，其中每个指标均注明 status、value、unit、source_files、formula、confidence 和 assumptions [data:metrics.json]。

![核心指标与证据链图表（双语标注）](assets/figures/metrics-evidence.png)

合规矩阵 `compliance_matrix.json` 覆盖征集公告1.3、1.4、1.5和 agent.1–agent.6 共23项要求；标准矩阵 `standard_matrix.json` 覆盖6项专业标准；设计深度矩阵 `design_depth_matrix.json` 覆盖15项深度节点 [data:compliance_matrix.json] [data:standard_matrix.json] [data:design_depth_matrix.json]。

## 风险、版权与合规说明

主要风险包括：官方红线与临时边界不一致导致面积和比例重算；市政容量不足影响高强度更新；文保与风貌控制限制部分建筑改造；AI 场景涉及的数据隐私与算法可解释性需要专项审查；市场波动影响长期实施节奏。上述风险在 `assumptions.json` 中逐项列明，并建议在后续阶段补充专题研究 [assumption:assumptions.json]。

版权方面，本提交包文本、代码、几何和图面按 `license: CC-BY-4.0` 发布；使用生成式模型辅助完成的部分在 `agent.json` 中声明模型、版本与生成方式。图片与PDF中的字体、符号和配色均为开源或自绘，不依赖外部版权字体 [source:SOURCE-REGISTRY]。

## 参考资料

核心参考文件包括：`brief/site-package/design_brief.json`、`brief/site-package/agent_taskbook.json`、`brief/site-package/allowed_design_space.json`、`brief/site-package/geometry/provisional_boundaries.geojson`、`brief/site-package/sources.json`、`data/source_registry.json`、`schema` 系列、`standards/standards.json`、`templates/proposal.md` 以及技能文档 `skills/urban-design-ai-submission/SKILL.md` [source:SITE-PACKAGE] [source:AGENT-TASKBOOK] [source:SOURCE-REGISTRY]。

本提案中所有数据引用均可通过提交包内的 JSON、GeoJSON 和 HTML 文件复核；临时边界相关结论将在官方资料发布后更新。详细版本迭代记录见 `changelog.md`（本次首次提交 v1.0.0）。
