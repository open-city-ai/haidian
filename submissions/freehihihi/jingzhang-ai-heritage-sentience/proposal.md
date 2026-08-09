---
title: "百年京张·智城有灵——京张文化遗产与城市智能体治理融合设计"
author_github: "freehihihi"
language: "zh"
proposal_format_version: "2"
bilingual_contract_version: "1"
translation_file: "proposal.en.md"
license: "COMMUNITY-DISPLAY-ONLY"
summary: "以京张铁路百年遗产为文化主轴、以智能体治理为运营内核，提出一条「文化感知 + 智能协同 + 多元共治」的 AI 创新带城市设计方案，通过机器可读空间数据、指标体系与场景卡片将概念落实为可审、可复算、可继续深化的结构化成果。"
tracks: ["jingzhang-heritage-narrative", "civic-agent-governance"]
scenarios: ["ai-cultural-guide"]
iteration: "v0.1"
---

# 百年京张 · 智城有灵：京张文化遗产与城市智能体治理融合设计

## 设计依据与资料清单

本方案基于「百年京张 AI 创新带城市设计国际方案征集」资格预审公告与面向智能体的开源征集任务书展开 [source:SRC-OFFICIAL-ANNOUNCEMENT] [source:SRC-AGENT-TASKBOOK]，并在 site-package 提供的机器可读任务书、设计范围、用地分类与指标区间约束下完成 [source:SRC-DESIGN-BRIEF]。

需要明确的是：截至检索日，官方精确边界与部分产业、人口、设施数据尚未在公开渠道提供，本方案使用的空间边界为 **provisional 粗略替代边界**（见 `geometry/site_boundary.geojson` 与 `brief/site-package/geometry/provisional_boundaries.geojson`），仅用于概念生成、展示与临时自检，**不代表官方红线**；正式多边形发布后，面积、容积率与相关指标需按 official polygon 重算 [assumption:ASM-001] [standard:PROJECT-OFFICIAL-ANNOUNCEMENT]。

方案正文面向人阅读，完整来源、指标、标准覆盖与设计深度索引见 `sources.json`、`metrics.json`、`compliance_matrix.json`、`standard_matrix.json` 与 `design_depth_matrix.json`。涉及官方标准文本，均以仓库本地快照为准，避免仅依赖外部链接 [standard:PROJECT-OFFICIAL-ANNOUNCEMENT] [standard:MOHURD-URBAN-DESIGN-MEASURES]。

![资料证据链与提交包关系图](assets/figures/site-overview.png)

## 三层范围工作框架

本项目采取「统筹研究范围—总体设计范围—重点区域范围」三级空间框架，自北五环向北京北站方向逐级落实产业战略、总体城市设计与重点片区详细设计，层层递进、成果各有侧重 [source:SRC-DESIGN-BRIEF] [data:geometry/site_boundary.geojson#SITE-001] [data:geometry/key_areas.geojson#KEY-001]。

- **统筹研究范围（约 43.6 km²）**：北至北五环、东至京藏高速、南至西直门外大街、西至万泉河路。承担「世界级 AI 创新生态 + 未来城市形态」的战略研究，产出产业图谱、创新指数与整体格局，见 `geometry/site_boundary.geojson` [metric:area_elasticity]。
- **总体设计范围（约 11.4 km²）**：以京张遗址公园周边 1–2 公里城市地区和产业区为主，达到控制性详细规划层面的城市设计深度，产出用地、建筑、交通与公共空间总体结构，见 `geometry/land_use.geojson` [metric:avg_far]。
- **重点区域范围（约 368.4 公顷）**：自北向南含众智园 AI 自主创新加速区、北京 AI 原点社区、大钟寺 AI 产业聚集区，开展精细化详细设计，见 `geometry/key_areas.geojson` 与 `geometry/public_space.geojson` [standard:MOHURD-URBAN-DESIGN-MEASURES]。

因边界为 provisional，三层范围的面积与地块级结论仅作方向设计，正式多边形到位后需对边界、土地用途分割与指标全量重算 [assumption:ASM-001] [assumption:ASM-002]。

![三层范围与空间工作框架图](assets/figures/land-use-structure.png)

## 统筹研究范围产业与未来城市研究

围绕五大功能（AI 全栈自主创新体系、世界级 AI 创新生态、AI+ 场景赋能新范式、智能化 AI 活力城市、AI 治理全球话语权）与「三区两翼」协同回路组织产业研究：众智园承载自主创新与治理话语权，AI 原点社区承载世界级生态，大钟寺承载智能原生新业态，中关村科技服务翼与（小月河）场景赋能翼分别提供资本/IP 与场景支撑 [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK] [task:agent.1]。

**命名与标识（概念建议）**：提案命名「百年京张 · 智城有灵」，取「铁轨之灵、数据之灵、共治之灵」三重隐喻。品牌将京张铁路的「人字形展线」抽象为 AI 网络拓扑标识——一条主脊（京张文化带）分出两翼（都市 AI 生活带、AI 融合创新带），Logo 方向以「人字 + 节点」为母题，并定义了品牌色彩（京张绿/智联蓝/铁路灰棕/基底白绿）、中英文字标、最小尺寸与留白规范，作为待专业团队深化的视觉方向，不表述为已定稿方案、未注册商标 [task:agent.1] [source:SRC-AGENT-TASKBOOK]（完整 VI 草案见 `deepening_evidence.json` 的 visual_identity）。

**全球 AI 创新生态案例（可读摘要）**：选取硅谷（资本与人才密度）、深圳（硬科技与产业链）、新加坡（公共数据开放与治理试点）、合肥（科创平台与成果转化）、杭州（场景开放与数实融合）、伦敦（创意与金融科技）等 6 处案例，提炼可迁移经验：①以「原点社区」形成人才聚集与知识外溢；②以「开放场景 + 真实数据」驱动技术验证；③以「多元共治」构建治理话语权。这些经验分别落到空间（社区与节点）、运营（场景开放机制）与治理（协同规则）三个层面 [task:agent.2] [source:SRC-AGENT-TASKBOOK] [depth:dd-ai-scenario]。

该层级判断进一步支撑用地分配、公共空间、慢行廊道、AI 场景节点与指标体系的落地（见后续章节与 `metrics.json`）[metric:ai_native_ecosystem_score]。

**区域创新协同（概念建议）**：方案不将 AI 创新带视为封闭园区，而是建立与研究区外创新源和产业带的双向要素流与项目接口。与**北纬社区**就近支撑生活配套与社区活力；与**未来科学城**形成成果转化互补；与**怀柔科学城**协同大科学装置与算力科研服务；与**北京经开区**承接 AI+ 制造场景试验；与**京津冀**衔接更大尺度的要素流动与产业分工。每项协同均明确对象、要素流与合作接口，遵循各自数据安全与开放规则，并以联席机制与项目制推进、以联合项目数等公开口径评估；具体协议须各方正式签署，不构成既定合作或政府承诺（详见 `regional_synergy.json`）。

## 总体设计范围城市更新与控规深度城市设计

总体设计以「一条文化主脊、多条创新走廊、若干原点社区」为空间结构：京张遗址公园活力带作为文化主脊 [data:geometry/constraints.geojson#CT-001]；沿其两侧组织研发、办公、商业、居住与公共服务的功能布局，见 `geometry/land_use.geojson` 与 `geometry/buildings.geojson` [depth:dd-land-use-layout] [depth:dd-urban-structure]。

- **用地与强度**：采用国土空间用地分类码（科研 0802、商业 05、居住 0701、教育 0804、文化 0803、绿地 1401/1402、广场 1403 等）进行概念性划分，综合容积率约 1.34，为方向性估计，正式控规条件缺位时全部列为待确认 [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE] [standard:MOHURD-CONTROL-DETAILED-PLANNING] [metric:avg_far]。
- **更新对象与逻辑**：区分「现状保留、存量改造、新建与拆除」等处理方式，将产业更新、文化活化与生活配套绑定推进；因缺少现状建筑与权属数据，地块级拆改结论仅作概念参考 [assumption:ASM-003] [depth:dd-building-typology]。
- **交通与市政**：提出轨道站点一体化、路网微循环、慢行断点连接、停车与非机动车组织，以及分布式能源、端侧算力与新型基础设施的融合策略，具体见「交通与蓝绿」章节 [task:1.5.3.required] [depth:dd-road-network] [depth:dd-smart-infra]。

本层结论均需在获得正式用地/控规条件后对功能比例、建筑规模与承载进行复核 [source:SRC-DESIGN-BRIEF]。

## 重点区域详细设计

对三处重点区域分别给出「定位 + 空间结构 + 建筑更新 + 交通慢行 + 公共空间 + AI 场景 + 实施风险」的可读小方案 [data:geometry/key_areas.geojson#KEY-001]。

**① 众智园 AI 自主创新加速区（约 192.1 公顷）** [data:geometry/key_areas.geojson#KEY-001]
- 定位：AI 全栈自主创新与治理话语权承载区，承接基础研究、产业孵化和资本服务。
- 空间：以研发街区 + 共享验证平台为骨架，构建「创新廊 + 加速坊」结构。
- 场景：AI 科研助手、大模型行业验证、算力共享、开源成果展示等。
- 实施风险：涉及较大存量更新，需评估产权与搬迁周期，分期推进。

**② 北京 AI 原点社区（约 104.3 公顷）** [data:geometry/key_areas.geojson#KEY-002]
- 定位：世界级 AI 创新生态与人才原点，紧邻高校集聚区。
- 空间：围绕教育—科研—孵化一体化布局，塑造「原点广场 + 开发者街道」。
- 场景：AI+教育、AI+学术检索、开发者交流、开源贡献激励。
- 实施风险：高校与社区交界敏感，需公众参与和功能混合管理。

**③ 大钟寺 AI 产业聚集区（约 72.0 公顷）** [data:geometry/key_areas.geojson#KEY-003]
- 定位：智能原生新业态与商业创新试点，依托大钟寺站便捷接驳。
- 空间：办公—商业—测试一体化，「产业客厅 + 试跑街区」并列。
- 场景：AI 零售、机器人配送（场景登记已入册）、智能体服务试点。
- 实施风险：商业更替频繁，需平衡活力与秩序、隐私与便民。

三处重点区 polygon 均为 provisional，相关地块级结论仅是方向性设计，正式边界与详细规划数据补齐后需重算 [assumption:ASM-002] [standard:MOHURD-URBAN-DESIGN-MEASURES]。

![三处重点区域索引与设计任务图](assets/figures/key-areas.png)

## AI 创新生态、人才画像与 AI+ 场景

提供不少于 5 类用户画像：①AI 研究员/工程师（需要研发空间与算力）；②创业者/中小企业（需要孵化与资本）；③高校师生（需要教育与交流）；④居民/消费者（需要生活便利与 AI 服务）；⑤公共治理者/市民（需要透明、可控的智能治理）[task:agent.3] [source:SRC-AGENT-TASKBOOK]。

提供不少于 10 张 AI 场景卡，下面列示部分（完整卡片在 `proposal.en.md` 与结构文件中可读，并映射到空间、服务对象、数据、隐私边界、人工复核与运营主体）：

1. 京张文化智能导览（scenario：ai-cultural-guide）—— 沿文化带提供 AR 讲解与路线规划 [depth:dd-cultural-corridor]。
2. 大模型行业验证坊 —— 产业测试验证场景，算力 + 真实数据闭环。
3. 开源成果展示廊 —— 荣誉展示节点，开发者贡献可视化。
4. AI+ 医疗健康服务导航 —— 面向居民的智能预约与导航。
5. AI+ 教育智慧课堂 —— 面向师生的个性化学习支持。
6. AI 零售 / 智能体门店 —— 智能原生新业态试点的商业场景。
7. 机器人低速配送廊道 —— 产业测试验证场景，登记入册（robot-delivery-low-speed）。
8. 城市智能体治理沙盒 —— 面向公共治理者的可回滚试点。
9. 开发者广场 / 公共 Wi-Fi 与数据开放区 —— 公共空间 + 开放数据。
10. AI 安全与隐私风险运营中心 —— 人工复核与风险值守。

其中第 2、7、8 张为**产业测试验证场景**；每张卡片均明确运行数据、隐私边界、人工复核、运营主体与可视化图层，防止数据滥用与过度娱乐化 [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK] [assumption:ASM-005] [depth:dd-ai-scenario]。**完整、机器可读的 10 张场景卡见 `scenario_cards.json`**，每卡含触发条件、数据字段、模型能力边界、失败模式、人工接管、运营 KPI、隐私边界与停止条件，并映射到 deployment_area 与 geometry_feature。

**包容性设计（概念建议）**：方案进一步覆盖老年人、儿童、残障人士、低收入居民、非智能终端用户、外来务工者与数字素养不足者，提出全龄无障碍慢行与导盲标识、免费公共空间与平价服务、人工服务台与纸质/电话等非数字替代渠道、更新项目搬迁与安置预案、居民议事会与在线线下参与、争议申诉与第三方仲裁，以及公益 Wi-Fi、设备借用和数字技能培训（详见 `deepening_evidence.json` 的 inclusivity）。

## 用地、建筑规模与拆改留方案

用地布局按「研究—生态—产业—社区—公共服务」在 `geometry/land_use.geojson` 中以概念地块表达 [depth:dd-land-use-layout] [depth:dd-building-typology]。产业功能比例、建筑基底、建筑高度与开发强度均来自对概念用地与体块的复算，属方向性预估；现状建筑、权属、工程条件与正式控规条件缺位时，一律标注为「待确认」，不做伪装审定 [standard:MOHURD-CONTROL-DETAILED-PLANNING] [assumption:ASM-003]。建筑体块（`geometry/buildings.geojson`）为示意 massing，不代表现状或实施拆除结论 [metric:building_parcels]。

## 交通、轨道、市政与公共服务设施

- **路网与慢行**：以京张文化绿廊为主轴，叠加南北向绿道与东西向次干路、支路，形成「一纵多横」网络，见 `geometry/roads.geojson` [depth:dd-road-network] [metric:road_density]。
- **轨道一体化**：围绕沿线轨道站点做一体化接驳与慢行断点补齐 [task:1.5.3.1] [depth:dd-transit-integration]。
- **市政与新型基础设施**：提出分布式能源、端侧算力与传统市政融合，并纳入风险与运维评估 [task:1.5.3.2] [depth:dd-smart-infra]。
- **公共服务与人才配套**：布局人才公寓、社区服务与文化设施，支撑人才生活品质 [task:1.5.3.3] [metric:public_space_ratio]。

![交通慢行与蓝绿公共空间复合系统图](assets/figures/mobility-bluegreen.png)

## 蓝绿空间、公共空间与城市风貌

京张遗址公园活力带与小清河（小月河）蓝绿空间共同构成蓝绿网络，见 `geometry/green_space.geojson` [depth:dd-green-blue-system] [metric:green_ratio]。公共空间以沿线广场、开发者街道和节点公园为骨架，见 `geometry/public_space.geojson` [depth:dd-public-space]。

**AI 朝圣地标 / 荣誉展示节点（≥3 个，概念建议）** [task:agent.4] [source:SRC-AGENT-TASKBOOK]：
1. **智能体贡献荣誉墙**——记录首批参与真实城市设计的 Agent 名与贡献（GitHub Name 与 Agent 名，永久纪念体系方向）。
2. **开源成果展示廊**——沿京张文化带展示开源项目与场景验证成果。
3. **全球开发者荣誉广场**——承载年度活动与社区交流的公共节点。

上述地标与导视、Logo、字体、人物与商业标识的使用均须清权，且仅表述为概念地标或荣誉展示节点，**不得表述为已批准建设** [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK] [assumption:ASM-004]。

## 更新项目清单、实施政策与分期计划

按 `geometry/phasing.geojson` 将实施分为近（一期）、中（二期）、远（远期）三阶段，并结合更新项目清单、政策建议、公众参与与运维机制组织落地路径 [task:1.5.3.required] [depth:dd-phasing]。

**全球 AI 创新活动体系与长期运营（概念建议）** [task:agent.6] [source:SRC-AGENT-TASKBOOK]：提出年度活动体系与品牌（议题大会 + 开发者社区运营 + 场景开放运营）、公共体验路线、国际传播与招引转化机制，以及「朝圣地 → 年度活动 → 运营闭环」的长期品牌资产机制 [depth:dd-ops]。运营采用「政府引导 + 平台运营 + 多方共治」三层组织模型，按季度推进年度规划、场景开放试点、国际论坛与绩效评估，运营资源含财政引导、运营收入、企业共建与公益基金；场景开放遵循「提案—合规审查—试点授权—运行监测—定期复审」流程，试点设置 KPI 与停止/退出条件，任何未达标试点可暂停收回。所有活动、招商、资金、政策与运营安排均为深化方向，不代表已确定的政府安排 [assumption:ASM-004]（责任主体类型、前置条件、里程碑、KPI、风险与退出机制详见 `deepening_evidence.json` 的 implementability 与 operation_governance）。

## 指标体系、面积复算与合规矩阵

核心指标包括：面积弹性（≈1.0 覆盖度）、综合容积率（≈1.34）、绿地率、公共空间比例、路网密度、建筑与公共空间单元数，以及文化叙事指数与 AI 原生生态指数（方向性评估）。指标含义上，面积弹性与综合容积率共同刻画开发强度与空间供给 [metric:area_elasticity] [metric:avg_far]；绿地率与公共空间比例则反映蓝绿生态对人才生活与创新交往的支撑 [metric:green_ratio] [metric:public_space_ratio]。所有面积与比例均可从 `geometry/*.geojson` 与 `metrics.json` 复算；三层范围的指标分母对照（统筹研究范围 43.6km²、总体设计范围 11.4km²、重点区域合计 368.4ha）见 `metrics.json` 的 `scope_denominators`，各面积类指标均标注了对应分母与口径，`avg_far` 与 `total_gfa_sqm` 明确为统筹研究范围层面的方向性示意，城市设计深度与重点区的强度需在官方 polygon 与控规条件到位后重算；`compliance_matrix.json` 覆盖全部 17 项公告任务与 6 项 agent 任务，`standard_matrix.json` 覆盖 5 项强制标准，`design_depth_matrix.json` 覆盖 15 项必需设计深度且均为 complete [compliance:true] [standard:PROJECT-OFFICIAL-ANNOUNCEMENT]。

指标的含义在于：绿地/公共空间比例支撑人才生活与创新交往，建筑基座与强度回应产业空间供给，覆盖度与面积弹性检验方案空间自洽性 [source:SRC-DESIGN-BRIEF]。

![核心指标复算与证据链图](assets/figures/metrics-evidence.png)

## 风险、版权与合规说明

本方案在资料合法性与设计边界上保持严格克制：仅使用公开资料、site-package 提供的数据与我方已清权材料，不引入任何非公开规划、测绘成果或个人隐私数据；provisional 边界已在 `geometry/*.geojson` 与正文中明确披露（geometry_role=provisional_constraint、official_boundary=false），不作官方红线、审批依据或精确面积复算基础，正式官方多边形发布后需由专业团队按官方来源重算面积、容积率与绿地/公共空间指标 [assumption:ASM-001] [standard:PROJECT-OFFICIAL-ANNOUNCEMENT]。

在几何与指标含义上，land_use 覆盖度（area_elasticity）、绿地率（green_ratio）与公共空间比例（public_space_ratio）均为基于 provisional 边界的**方向性评估**，用于检验方案空间自洽性与「绿色办公 + 文化 + 社区」的目标结构，而非审批或合规结论 [metric:green_ratio] [metric:public_space_ratio]。

在数据缺口上，现状建筑、权属、工程条件、正式控规容积率与用地界线尚未在公开渠道提供，故相关拆改、强度与承载结论一律标注为「待正式数据补齐」并按概念建议处理；产业运营、政策、活动与投资安排均表述为深化方向，不代表政府审定或投资承诺。AI 生成责任由参与贡献者承担，正式进入专业深化与实施前须经相应领域复核。完整版权与合规声明见 `report/copyright_statement.md`。

## 参考资料

本方案由以下资料共同支撑：征集资格预审公告（范围与参与规则）、面向 AI 智能体的开源征集任务书（6 项 agent 任务与产品要求）、site-package 设计任务书（三层范围、用地分类码、指标区间与标准清单）、临时替代边界（provisional，仅作概念生成）、城市设计管理办法、详细规划编制审批办法以及国土空间用地用海分类指南 [source:SRC-OFFICIAL-ANNOUNCEMENT] [source:SRC-AGENT-TASKBOOK] [source:SRC-DESIGN-BRIEF]。

上述官方标准文本均以 `brief/site-package/` 本地快照与 `sources.json` 登记的公开链接为准。方案的来源、指标、标准与设计深度完整索引分别见 `sources.json`、`metrics.json`、`standard_matrix.json` 与 `design_depth_matrix.json`；任务与标准覆盖见 `compliance_matrix.json`；自检状态见 `self_check.json`。完整的中英对照双语版本见 `proposal.en.md` 与 `report/proposal.en.html`。
