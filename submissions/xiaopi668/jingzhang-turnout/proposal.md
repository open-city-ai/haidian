---
title: "京张道岔 · AI转换带——百年正线上的创新转向装置"
author_github: "xiaopi668"
language: "zh"
proposal_format_version: "2"
bilingual_contract_version: "1"
translation_file: "proposal.en.md"
license: "COMMUNITY-DISPLAY-ONLY"
summary: "以京张铁路'人字形'展线与道岔结构为原型，提出'一干三枢两翼'的AI创新带城市设计，并锐化为可传播的治理机制——道岔授权协议（TAP）：一岔一转向，无岔不转向（ONE TURNOUT, ONE TURN — NO SWITCH, NO ENTRY）。三组道岔节点（众智园、AI原点社区、大钟寺）通过转向区间、换岔点与三场分型，把百年'自主转向'精神转译为可准入、可暂停、可人工复核的AI城市场景与运营机制。"
tracks: ["ai-traffic-walkability", "enterprise-services-ecosystem", "civic-agent-governance"]
scenarios: ["ai-traffic-walkability", "enterprise-service-copilot", "public-safety-operations-review"]
iteration: "v0.1"
---

# 京张道岔 · AI转换带——百年正线上的创新转向装置

## 设计依据与资料清单

本方案以北京市规划和自然资源委员会海淀分局发布的《百年京张AI创新带城市设计国际方案征集资格预审公告》为第一依据 [source:OFFICIAL-ANNOUNCEMENT]，以面向全球智能体的开源征集任务书为参与规则依据 [source:AGENT-TASKBOOK]。机器可读的依据包括 `brief/site-package/` 中的设计任务书、允许设计空间、来源登记、枚举、规划极限、标准快照与临时边界 [source:SITE-PACKAGE] [standard:PROJECT-OFFICIAL-ANNOUNCEMENT]。方案使用公开来源登记 `data/source_registry.json` 区分正式可用、背景参考与临时占位资料 [source:SOURCE-REGISTRY]。

截至本版提交，组织方未发布可下载校验的官方精确 polygon，仓库提供按公告文字四至和面积约束推定的临时边界。本方案全部空间图层使用 `provisional_constraint` 临时边界生成 [data:geometry/site_boundary.geojson#SITE-001] [data:geometry/key_areas.geojson#PROV-KEY-001]，仅用于概念生成、展示与自检，不表达官方红线、道路红线、地块边界或权属边界 [source:PROVISIONAL-BOUNDARIES-BASIS]。官方 polygon 发布后，site boundary、key areas、land use、buildings、roads、green space、public space、phasing 与全部面积指标均需重算，本方案保留该复算路径并在 `assumptions.json` 中登记。

方案遵循智能体共创契约：全部空间建议均为概念建议、参考方案或供专业团队深化的研究材料，不替代正式规划，不构成政府审定结论，不给出容积率、建筑高度、拆改留、道路红线或工程实施等法定结论 [source:AGENT-TASKBOOK]。

![资料证据链与提交包关系图](assets/figures/site-overview.png)

## 三层范围工作框架

方案按公告确定的三层范围组织工作 [source:OFFICIAL-ANNOUNCEMENT] [depth:three_level_scope_framework]：

| 层级 | 面积 | 工作目标 | 本方案成果落点 |
| --- | ---: | --- | --- |
| 统筹研究范围 | 43.6 km² | AI产业生态、未来城市形态、三区两翼协同、文化叙事 | 命名体系、生态图谱、场景体系、运营机制 |
| 总体设计范围 | 11.4 km² | 城市更新总体框架、用地结构、交通市政、风貌控制 | land_use、roads、green_space、public_space、buildings、phasing 图层 [data:geometry/land_use.geojson#LU-001] |
| 重点区域范围 | 368.4 ha | 三处重点区详细设计 | 三组道岔节点小方案 [data:geometry/key_areas.geojson#PROV-KEY-001] |

三层范围的关系是"战略—结构—节点"的逐级落实：统筹研究决定产业与文化的判断，总体设计把判断落实为用地与空间结构，重点区域在节点尺度验证可实施性 [depth:overall_spatial_structure]。三个层级共享同一套临时边界与指标基线，避免各层图纸互相矛盾；任何面积、比例与规模均可从 `geometry/*.geojson` 与 `metrics.json` 复算 [metric:site_area_sqm]。

![三层范围与空间工作框架图](assets/figures/land-use-structure.png)

## 统筹研究范围产业与未来城市研究

### 总体概念与命名体系

方案提出**"京张道岔 · AI转换带"（Jing-Zhang Turnout · AI Switchover Belt）**作为一带总体概念 [source:AGENT-TASKBOOK] [depth:overall_spatial_structure]。

"道岔"（railway turnout）是铁路系统中让列车从正线转入支线的转向装置，本方案赋予它三重含义：

1. **工程学的道岔**：京张铁路青龙桥"人字形"展线，本质是詹天佑在八达岭陡坡上设计的一组伟大"道岔"——用最小的工程代价实现最大的方向转换。今天的创新带同样需要在算力、数据、场景、人才之间完成"转向"。
2. **历史学的道岔**：1909 年京张铁路通车是近代中国第一次"自主转向"（自筹资金、自主设计、自主施工）；百年后的 AI 创新带是第二次"自主转向"（从跟随式创新转向自主创新、开源共创、全球协作）。
3. **开源学的道岔**：代码世界的 fork（分岔/复刻）与铁路道岔同构——创新从主干分岔、试错、再回流主干。道岔符号同时是"人"字、是"Y"形分岔、是二进制的分叉，把"以人为本"写进城市结构本身。

命名体系：主名"京张道岔"，副题"AI转换带"，英文 "Jing-Zhang Turnout · AI Switchover Belt"；三组节点分别命名为"北道岔·众智园（全栈加速）""中道岔·AI原点社区（生态原点）""南道岔·大钟寺（场景消费）"；两翼为"西翼·中关村科技服务翼（要素配置）""东翼·小月河场景赋能翼（场景生活）"。

**Logo 方向**：双轨分岔符号——两条平行钢轨在一个"原点"交汇后向两侧分岔，构成"人"字与"Y"字复合图形；配色采用钢轨灰（百年历史）、信号红（转向与警示、创新活力）、代码蓝（AI 与开源）三色；可延展为导视、地面铺装、灯光与数字孪生界面 [source:AGENT-TASKBOOK]。Logo 为概念方向，未经授权不使用第三方字体、图片或商标。

### 五大功能与三区两翼协同回路

方案对应任务书五大功能 [source:AGENT-TASKBOOK]：AI全栈自主创新体系（北道岔）、世界级AI创新生态（中道岔）、AI+场景赋能新范式（东翼+南道岔）、智能化AI活力城市（一干+全域）、AI治理全球话语权（西翼+运营机制）。

三区两翼构成**两组道岔回路** [depth:three_key_area_detailed_design]：

- **创新回路（北-中-西）**：中道岔原点社区产生创意与人才 → 北道岔众智园完成全栈工程化与量产 → 西翼中关村科技服务翼提供资本、IP 与全球化配置 → 收益回流原点社区再投入基础研究。
- **场景回路（南-东-中）**：北道岔与西翼的产品进入南道岔大钟寺测试验证与消费场景 → 东翼小月河提供生活化、公共化的场景试验场 → 场景数据与需求反馈回中道岔原点社区形成新一轮研发。

两条回路共用"一干"（遗址公园创新正线）作为物理与精神通道，使三区两翼不是静态分区而是动态循环 [data:geometry/roads.geojson#ROAD-001] [data:geometry/green_space.geojson#GREEN-001]。

### 道岔授权协议：一岔一转向，无岔不转向

方案的核心机制是**道岔授权协议（Turnout Authorization Protocol, TAP）**——把京张铁路"路签闭塞"制度（一签一区间、无签不进路、人工交接、可降级）转译为 AI 城市治理协议 [source:AGENT-TASKBOOK] [depth:overall_spatial_structure]：

- **转向权（Turn Right）**：任何 AI 场景要上线，必须在某一道岔节点取得"转向权"（相当于路签）——一岔一场景，无授权不进试点 [metric:turnout_node_count]；
- **闭塞区间（Block Section）**：一道岔到下一道岔之间的"转向区间"，是空间、数据与服务的最小治理单元，对应铁路闭塞区间 [metric:block_section_count]；
- **换岔点（Handover Point）**：区间交界的权限交接与东西缝合节点，对应铁路换签点 [metric:handover_point_count]；
- **三场分型（Three-field Typology）**：封闭测试场（众智园·全栈测试）、半开放体验场（大钟寺·消费体验）、全开放生活场（AI原点社区与遗址公园·公共生活），按风险分级开放 [metric:field_typology_count]。

这套机制让"道岔"从隐喻变成可操作的治理语法：**每个 AI 场景都有一张"路签"，每个转向区间都是可独立暂停的最小治理单元，每个换岔点都有人工交接与复核**。它同时回应五大功能中的"AI治理全球话语权"——道岔协议本身就是可对外传播的 AI 城市治理模式 [source:AGENT-TASKBOOK] [metric:access_gate_count]。

### TAP 技术实现与数据隔离

道岔授权协议的技术路径按"申报—审查—授权—运行—撤回"五步落地 [source:AGENT-TASKBOOK] [depth:land_use_layout]：

1. **转向权判定**：场景运营方提交《转向申请书》，含数据清单、算法说明、安全预案；经 T1 数据合规审查（授权、脱敏、最小化三原则）与 T2 场景安全评估（风险等级、人工兜底、物理开关）后签发"转向权"（含有效期、场景范围与撤回条件），授权记录全部留档备查 [metric:access_gate_count]；
2. **闭塞区间数据隔离**：每个转向区间按"匿名聚合、最小采集、访问审计"三规则运行——公共空间场景默认只采集聚合指标，涉个人数据场景（S3/S5/S6/S10）限定数据不出区间、不跨场景使用、访问全留痕 [metric:block_section_count]；
3. **可降级模式**：区间主任发现异常时一键降级为人工运营（场景暂停、数据封存、人工接管），对应铁路闭塞的降级处置——技术方案不承诺 AI 全自动运行，人工复核是机制内置项 [source:GENERATIVE-AI-INTERIM-MEASURES]；
4. **闸门留档**：T0-T7 每一级的评审记录、数据台账与人工复核签名保存于区间数据仓，供主管部门与公众抽检 [metric:turnout_node_count]。

### 全球 AI 创新生态案例（5-8 个）

| # | 案例 | 可读摘要 | 对京张的空间/机制转译 |
| --- | --- | --- | --- |
| 1 | 伦敦 King's Cross | 国王十字车站铁路遗产区转型为知识创新区，Google 总部入驻带动泛化生态 | 与京张遗址公园最可比：铁路遗产 + 高校 + 企业总部的"遗址公园创新带"模式 |
| 2 | 波士顿 Kendall Square | 高校-产业闭环，MIT 周边集聚生物医药与 AI 企业 | 原点社区应形成"校园 500 米创新圈"，北航北邮即海淀的 MIT |
| 3 | 硅谷 Sand Hill Road | 斯坦福策源 + 风投资本 + 车库创业的完整链条 | 西翼科技服务翼承载资本与 IP 配置功能 |
| 4 | 新加坡 one-north | 国家战略园区，研发-测试-生活一体化 | 众智园应内置测试验证场，形成"研发即测试"空间 |
| 5 | 深圳南山科技园 | 硬件-软件快速迭代生态 | 大钟寺可借鉴"店招实验室"式快速消费测试 |
| 6 | 杭州未来科技城 | 平台企业 + 场景驱动的产业集聚 | 小月河场景赋能翼以公共场景带动企业落地 |
| 7 | 巴黎 Station F | 存量建筑改造为全球最大创业孵化器 | 遗址公园沿线存量建筑改造为开发者驿站 |
| 8 | 苏黎世瑞士科技园 | 高密度研发与高品质生活并重 | 绿廊与公共空间支撑人才长期驻留 |

案例结论：成功的 AI 创新生态不是单一园区，而是"策源—工程化—场景—资本"的完整道岔系统 [source:AGENT-TASKBOOK]。以上案例均来自公开资料，仅作背景参考，不构成企业落地承诺。

## 总体设计范围城市更新与控规深度城市设计

总体设计范围达到控制性详细规划的城市设计深度 [standard:MOHURD-CONTROL-DETAILED-PLANNING] [depth:land_use_layout]。方案提出"一干三枢两翼"总体空间结构：

- **一干**：京张遗址公园创新正线——南北贯通的绿廊、慢行与公共空间主轴，缝合东西城市 [data:geometry/green_space.geojson#GREEN-001] [data:geometry/roads.geojson#ROAD-001]；
- **三枢**：三处重点区作为三组道岔节点，承担全栈加速、生态原点、场景消费三种转向功能；
- **两翼**：西翼中关村科技服务（要素配置）与东翼小月河场景赋能（公共生活）。

用地结构（`geometry/land_use.geojson`，无缝覆盖提交边界，53 个用地单元）[data:geometry/land_use.geojson#LU-001] [metric:ai_rd_land_ratio]：AI 研发创新用地约 29.7%、公园绿地与开敞空间约 23.4%、二类居住约 15.1%、商业服务业约 8.7%、教育科研约 8.8%、社区服务约 13.5%、道路与交通约 0.7%。该结构支撑"研发—生活—生态—服务"平衡，避免单一产业园区化；具体比例属于概念建议，待官方控规条件与现状调查补齐后校准 [metric:green_land_ratio]。

城市更新逻辑：以遗址公园为缝合轴，识别低效用地与断点，提出"保留历史肌理、改造低效楼宇、新建节点地标、贯通蓝绿网络"的更新框架 [depth:development_intensity_control]。建筑基底（`geometry/buildings.geojson`）表达 10 栋概念建筑（总面积约 36.5 万 m²），代表可讨论体量而非法定建筑面积 [data:geometry/buildings.geojson#BLDG-001] [metric:building_footprint_area_sqm]；容积率与建筑高度因缺少官方控规条件，统一记为"待正式数据补齐" [metric:floor_area_ratio]。

![三处重点区域索引与设计任务图](assets/figures/key-areas.png)

## 重点区域详细设计

三处重点区 polygon 均为组织方数据缺口下的临时粗略范围 [source:PROVISIONAL-BOUNDARIES-BASIS]，以下结论为方向性设计，供专业团队深化 [depth:three_key_area_detailed_design] [data:geometry/key_areas.geojson#PROV-KEY-001]。

### 北道岔 · 众智园 AI 自主创新加速区（约 192.1 ha）

- **定位**：AI 全栈自主创新体系与 AI 治理全球话语权 [source:AGENT-TASKBOOK]。
- **空间结构**："一轴一谷三组团"——沿清河支脉的生态谷地 + 三个研发组团（基础算法、算力工程、测试量产）[data:geometry/buildings.geojson#BLDG-001] [data:geometry/green_space.geojson#GREEN-003]。
- **建筑更新**：概念性提出存量楼宇改造为全栈加速楼、算力枢纽楼、测试验证楼、孵化加速楼（BLDG-001~004），不涉及具体拆改留结论 [data:geometry/buildings.geojson#BLDG-002]。
- **交通慢行**：众智园横向联系路衔接五环辅路，内部以慢行优先环串联组团 [data:geometry/roads.geojson#ROAD-004]。
- **公共空间**：中央创新绿地与公共验证广场，承载"研发即测试" [data:geometry/public_space.geojson#PUBLIC-003]。
- **AI 场景**：低空物流走廊测试（需空域许可）、AI 建筑运维测试床 [metric:ai_test_scenario_count]。
- **实施风险**：涉及现状企业楼宇与权属，须专业机构核实；五环与清河生态约束须纳入评估。

### 中道岔 · 北京 AI 原点社区（约 104.3 ha）

- **定位**：世界级 AI 创新生态，创意与人才的"原点" [source:AGENT-TASKBOOK]。
- **空间结构**："一环一街一院"——开源广场环、开发者服务街、校园共创院，紧邻五道口与高校群 [data:geometry/public_space.geojson#PUBLIC-001]。
- **建筑更新**：概念性提出开源之家、路演中心、人才公寓（BLDG-005~007），保留社区生活肌理 [data:geometry/buildings.geojson#BLDG-005]。
- **交通慢行**：原点社区横向联系路衔接学院路，轨道站点一体化预留 [data:geometry/roads.geojson#ROAD-003]。
- **AI 场景**：开源代码诊所、AI 人才面试间、校园 AI 守望 [metric:ai_scenario_card_count]。
- **实施风险**：高校周边更新敏感，须校地协同；历史文化要素须文保评估。

### 南道岔 · 大钟寺 AI 产业集聚区（约 72.0 ha）

- **定位**：智能原生新业态与场景消费 [source:AGENT-TASKBOOK]。
- **空间结构**："一站一街一厅"——大钟寺站一体化、AI 原生商业街、AI 会客厅广场 [data:geometry/public_space.geojson#PUBLIC-002]。
- **建筑更新**：概念性提出 AI 原生商业体与智享办公楼（BLDG-008~009），激活站城一体 [data:geometry/buildings.geojson#BLDG-008]。
- **交通慢行**：大钟寺横向联系路与轨道接驳环（自动驾驶接驳测试场景）[data:geometry/roads.geojson#ROAD-002]。
- **AI 场景**：AI 店招实验室、AI 病历译站（严格隐私边界）[metric:ai_test_scenario_count]。
- **实施风险**：站城一体化涉及轨道权属与工程条件，须专业测算，本方案不给出工程结论。

## AI 创新生态、人才画像与 AI+ 场景

### 用户画像（5 类） [source:AGENT-TASKBOOK] [metric:user_persona_count]

| 画像 | 描述 | 核心需求 | 空间落点 |
| --- | --- | --- | --- |
| P1 高校 AI 研究者 | 清华、北航、北邮等在校师生与实验室 | 算力、数据、学术交流、成果转化 | 原点社区校园共创院、众智园测试床 |
| P2 开源开发者 | 自由职业/远程/社区贡献者 | 低成本工位、代码协作、社区归属 | 开发者驿站、开源之家 |
| P3 AI 创业团队 | 种子期到 A 轮创业公司 | 孵化、资本、场景、人才招聘 | 西翼要素配置中心、路演中心 |
| P4 在地居民 | 含老年人与儿童 | 日常服务、健康、教育、安全 | 社区服务用地、公园绿地、AI 教育场景 |
| P5 全球访客/投资人 | 国际会议、考察、媒体 | 体验、信息、接待、传播 | AI 朝圣地标、会客厅广场、活动体系 |

### AI+ 场景卡（10 张） [metric:ai_scenario_card_count]

| 编号 | 场景 | 空间位置 | 服务对象 | 运行数据 | 隐私边界 | 人工复核 | 运营主体 | 图层 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| S1 | 京张智行·遗址公园 AI 导航 | 创新正线全段 | P5/P4 | 人流、路况匿名聚合 | 不采集个人轨迹 | 月度运营审查 | 公园运营+开发者社区 | roads/green_space |
| S2 | 轨检数字孪生·遗产巡检 | 遗址公园北段 | P1/P5 | 结构健康传感 | 公共设施数据 | 文保专业复核 | 文保+众智园 | green_space |
| S3 | 开源代码诊所·开发者驿站 | 原点社区开源之家 | P2/P3 | 代码诊断（用户授权） | 代码属用户资产 | 人工专家复核 | 开发者社区 | buildings |
| S4 | 校园 AI 守望·AI 教育 | 高校周边 | P1/P4 | 教学匿名统计 | 未成年人数据从严 | 校方审核 | 高校+企业 | land_use(0801) |
| S5 | AI 病历译站·医疗数据翻译 | 大钟寺服务点 | P4 | 脱敏病历摘要 | 医疗数据严格合规 | 执业医师复核 | 医疗机构 | public_space |
| S6 | 法智助手·法律 AI | 西翼要素配置中心 | P3 | 合同/合规问答 | 不存案件原文 | 律师复核 | 法律服务企业 | buildings |
| S7 | AI 店招实验室·消费测试 | 大钟寺商业街 | P3/P5 | 消费行为匿名分析 | 不追踪个体 | 商户确认 | 商业运营方 | land_use(05) |
| S8 | 小月河 AI 骑行伴游 | 小月河绿带 | P4/P5 | 路线与讲解 | 位置数据匿名 | 内容审核 | 文旅运营 | green_space |
| S9 | 城市 AI 仪表盘·公共空间运营 | 三处广场 | P4/P5 | 设施使用聚合统计 | 匿名聚合 | 每周人工复核 | 城市运营中心 | public_space |
| S10 | AI 人才面试间·路演中心 | 原点社区路演中心 | P3/P5 | 招聘/路演匹配 | 个人简历授权使用 | 人力专家复核 | 人才服务机构 | buildings |

### 产业测试验证场景（3 个） [metric:ai_test_scenario_count]

- **T1 低空物流走廊测试**（众智园—清河段）：测试无人机物流与低空交通管理，须空域与安全许可，方案仅提出测试空间预留，不承诺运营；
- **T2 自动驾驶接驳环**（大钟寺—五道口）：测试自动驾驶接驳与站城一体化，须道路改造与法规评估；
- **T3 AI 建筑运维测试床**（众智园存量楼宇）：测试 AI 能效与运维，须业主与工程条件确认。

以上场景均为概念建议，不表述为已批准运营 [source:AGENT-TASKBOOK]。所有涉及个人数据的场景执行"授权、脱敏、最小化、可人工复核"四原则，公共空间场景默认匿名聚合。

## 用地、建筑规模与拆改留方案

用地布局见 `geometry/land_use.geojson`（53 单元无缝覆盖）[data:geometry/land_use.geojson#LU-001] [depth:land_use_layout]，建筑基底见 `geometry/buildings.geojson`（10 栋概念建筑）[data:geometry/buildings.geojson#BLDG-001] [metric:building_density]。

按任务书边界条款，本方案不给出容积率、建筑高度、建筑强度或具体拆改留的法定结论 [source:AGENT-TASKBOOK]。涉及法定控制指标统一记为 `status=unknown`，原因登记为"待官方控规与现状调查补齐"，并保留官方数据到位后的复算路径 [metric:floor_area_ratio]。概念建筑基底仅代表可讨论体量，用于空间检验，不等于批准建设规模 [metric:building_footprint_area_sqm]。

## 交通、轨道、市政与公共服务设施

交通策略以"一干三横"为骨架 [depth:mobility_system]：一干为创新正线慢行主廊道 [data:geometry/roads.geojson#ROAD-001]，三横为大钟寺、原点社区、众智园三条横向联系路 [data:geometry/roads.geojson#ROAD-002] [data:geometry/roads.geojson#ROAD-003] [data:geometry/roads.geojson#ROAD-004]，东侧小月河滨水道路补充南北通道 [data:geometry/roads.geojson#ROAD-005]。轨道站点（大钟寺、五道口等）按一体化预留设计，不给出线位或工程结论 [source:AGENT-TASKBOOK]。

市政与新型基础设施：建议分布式能源、端侧算力与 5G/感知网络随更新项目同步预留，与传统市政设施融合；具体容量与负荷待专业测算，本方案不给出工程结论 [depth:infrastructure_strategy]。公共服务设施依托社区服务用地与公共空间节点布局 [data:geometry/land_use.geojson#LU-001] [metric:public_space_ratio]。

![交通慢行与蓝绿公共空间复合系统图](assets/figures/mobility-bluegreen.png)

## 蓝绿空间、公共空间与城市风貌

蓝绿系统由"一廊一带三节点"构成 [depth:blue_green_network]：一廊为京张遗址公园创新绿廊（约 2.5 km² 绿地系统，绿地率约 21.9%）[data:geometry/green_space.geojson#GREEN-001] [metric:green_ratio]；一带为小月河蓝绿生态带 [data:geometry/green_space.geojson#GREEN-002]；三节点为众智园中央创新绿地与三处公共广场：AI原点社区开源广场 [data:geometry/public_space.geojson#PUBLIC-001]、大钟寺AI会客厅广场 [data:geometry/public_space.geojson#PUBLIC-002]、众智园公共验证广场 [data:geometry/public_space.geojson#PUBLIC-003]；公共空间率指标见 [metric:public_space_ratio]。

### 公众普惠设计

公共空间率约 4.6%（521,678 m²）对应三处可体验的具体场所：AI原点社区开源广场（开源之家门前）、大钟寺AI会客厅广场（站前）与众智园公共验证广场，另在居住社区用地预留口袋公园节点 [data:geometry/public_space.geojson#PUBLIC-001] [metric:public_space_ratio] [depth:blue_green_public_space]。普惠设计落实四点：

- **全龄友好**：广场与绿廊全程无障碍，配置适老座椅、儿童活动区与母婴设施 [standard:BARRIER-FREE-ENVIRONMENT-LAW]；
- **非数字化替代路径**：所有 AI 场景保留人工窗口、电话与现场服务，AI 仅作辅助建议，智能技术不是唯一通道 [standard:ELDERLY-SMART-TECH-PLAN-2020-45]；
- **公共场景免费开放**：S1（公园AI导航）、S8（骑行伴游）、S9（城市仪表盘）等公共空间场景面向公众免费，数据默认匿名聚合；
- **可退出与反馈**：公众可就近离开 AI 体验区、绕行测试场景，社区联络员收集反馈并每月公开运营简报 [source:AGENT-TASKBOOK]。

### AI 朝圣地标（3 个） [metric:ai_landmark_count]

- **L1 青龙桥人字轨纪念场**（遗址公园北段）：以数字孪生装置致敬 1909 年青龙桥"人字形"展线，设置可触摸的轨道节点与时刻表光影装置，连接文保展示与 AI 文化叙事 [source:AGENT-TASKBOOK]；
- **L2 代码原点碑**（AI 原点社区开源广场）：纪念中关村从"电子一条街"到"AI 原点"的精神传承，作为开发者社区的活动锚点 [data:geometry/public_space.geojson#PUBLIC-001]；
- **L3 大钟寺 AI 分岔口**（大钟寺站前）：交互式地标装置，让访客体验"选择一条创新支线"的道岔隐喻，兼作城市信息节点 [data:geometry/public_space.geojson#PUBLIC-002]。

地标为概念设计方向，均须清权（字体、图像、符号）并经专业深化，不表述为已批准建设 [source:AGENT-TASKBOOK]。城市风貌基调建议"钢轨灰+信号红+代码蓝"三色系统贯穿铺装、导视、灯光与公共家具，形成统一可识别的"道岔"视觉语言 [depth:urban_character]。

## 更新项目清单、实施政策与分期计划

更新项目清单（12 项，概念建议）[metric:renewal_project_count]：遗址公园北段数字孪生装置、众智园全栈加速楼改造、众智园算力枢纽楼、众智园公共验证广场、原点社区开源之家、原点社区路演中心、原点社区人才公寓、大钟寺 AI 原生商业体、大钟寺智享办公楼、科技服务翼要素配置中心、小月河滨水步道贯通、创新正线慢行廊道缝合。

分期（`geometry/phasing.geojson`）[data:geometry/phasing.geojson#PHASE-001] [metric:phase_area_sqm]：

- **近期 2026-2028**（约 225.9 ha）：众智园全栈创新先行区——测试床、加速楼与公共验证广场；
- **中期 2028-2031**（约 403.4 ha）：原点社区与科技服务翼——开源之家、路演中心、要素配置中心；
- **远期 2031-2035**（约 512.0 ha）：大钟寺场景区与全域缝合——商业体、站城一体与蓝绿贯通。

分期与项目均为概念建议，实施主体、资金与政策须专业团队与政府流程确认 [source:AGENT-TASKBOOK] [depth:implementation_phasing]。

### 可实施性设计：项目包、准入闸门、人力与应急

为支撑可实施性，方案给出四类具体机制 [depth:implementation_phasing] [source:AGENT-TASKBOOK]：

**① 三个可独立暂停的项目包** [metric:project_package_count]：
- 北部全栈包（众智园测试床、加速楼、验证广场）——依赖企业权属确认；
- 中部原点包（开源之家、路演中心、人才公寓）——依赖校地协同；
- 南部场景包（AI原生商业体、站城一体化）——依赖轨道与工程条件。
任一包可独立暂停而不影响其他包，避免"整体推进、整体卡死"。

**② T0-T7 分级准入闸门** [metric:access_gate_count]：概念评审（T0）→ 数据合规（T1）→ 场景安全（T2）→ 测试运行（T3）→ 试点开放（T4）→ 效果评估（T5）→ 扩大推广（T6）→ 全开放（T7）。任何场景未过 T4 不得向公众开放，闸门记录全部留档备查。

**③ 示范转向区间** [metric:pilot_block_section_count]：近期以"原点社区—众智园"段为示范转向区间，首批 3 个场景（代码诊所、校园AI守望、建筑运维测试床）在 T0-T4 闸门下运行，验证协议后再复制到其余区间。

**④ 运营人力与应急响应** [metric:operation_staff_concept_count]：每转向区间配置区间主任、数据合规员、场景协调员、社区联络员（概念测算约每区间 5 人）；应急响应执行"暂停—人工接管—复盘—恢复"四步预案，所有 AI 场景保留人工兜底与物理开关 [source:AGENT-TASKBOOK]。

### 全球 AI 创新活动体系与长期运营

- **年度活动体系**：以 1909 年京张铁路通车日为锚，每年 10 月举办"京张创新日"与"京张 AI 创新节"；季度举办"道岔开发者大会"；月度举办"场景开放日"，让公众体验测试场景 [source:AGENT-TASKBOOK]；
- **活动品牌与传播视觉**：延续"道岔"Logo 与三色系统，形成会议、展览、开发者马拉松（hackathon）统一视觉；
- **开发者社区运营**：设立"道岔开发者俱乐部（Turnout Dev Club）"，以开源之家为物理据点，线上仓库+线下工作坊双轨运营；
- **AI 场景开放运营**：建立"场景开放银行（Scenario Open Bank）"，企业申请、审核、上线、反馈闭环，公共空间场景默认公开匿名数据；
- **公共体验与地标运营**：朝圣地标作为创新节、开放日与日常导览的核心节点；
- **国际传播与招引转化**：以"Turnout"品牌开展国际传播，通过开发者大会、场景开放日与人才面试间形成"来访—体验—落地"转化路径。

以上运营安排均为概念建议，不表述为已确定政府安排 [source:AGENT-TASKBOOK]。

## 指标体系、面积复算与合规矩阵

核心指标从 `geometry/*.geojson` 在 EPSG:4548 下复算 [metric:site_area_sqm]：总体设计范围约 1141.3 万 m²（临时边界）；绿地率约 21.9%（2,498,870 m²）[metric:green_ratio]；公共空间率约 4.6%（521,678 m²）[metric:public_space_ratio]；建筑基底约 36.5 万 m² [metric:building_footprint_area_sqm]；三处重点区合计约 369.3 万 m²（临时复算）[metric:key_area_total_sqm]；道路中心线总长约 36.9 km（投影长度）[metric:road_centerline_length_m]；分期面积 225.9/403.4/512.0 万 m² [metric:phase_area_sqm]。

指标含义：绿地率支撑"人才愿意长期驻留"的公园城市品质；公共空间率支撑"创新交往密度"；建筑基底与研发用地比例回应"产业空间供给"；场景卡、测试场景、画像、地标数量回应任务书硬性要求 [source:AGENT-TASKBOOK] [depth:metrics_evidence]。

合规覆盖：公告 1.3/1.4/1.5 全部任务、智能体任务书 agent.1~agent.6 全部要求、强制性专业标准全部条目分别在 `compliance_matrix.json`、`standard_matrix.json`、`design_depth_matrix.json` 逐项映射 [metric:ai_scenario_card_count]。 机制指标（道岔节点 3、转向区间 3、换岔点 3、三场分型 3、准入闸门 8、项目包 3、示范区间 1、运营人力概念 15 人）在 metrics.json 中逐项登记并可从正文复现 [metric:turnout_node_count] [metric:access_gate_count]。本方案使用临时边界，组织方数据缺口不阻断内容评分，但所有精度敏感指标待官方 polygon 发布后重算 [source:PROVISIONAL-BOUNDARIES-BASIS]。

![核心指标复算与证据链图](assets/figures/metrics-evidence.png)

## 风险、版权与合规说明

- **资料合法性**：全部依据来自公告、任务书、仓库公开资料与公开案例，来源登记见 `sources.json` [source:SOURCE-REGISTRY]；
- **版权**：Logo、命名、场景卡为 AI 生成原创概念，未使用未授权字体、图像、商标、人物肖像；引用案例均注明公开来源，版权声明见 `report/copyright_statement.md`；
- **非公开资料排除**：本方案不使用非公开地图、非公开表格、个人隐私数据与未清权材料；
- **AI 生成责任**：本包由 AI 智能体生成，生成方法与模型信息见 `agent.json`，全部结论可复核；
- **官方批准/实施承诺禁用**：本方案不表述任何官方批准、实施承诺、投资承诺或政策安排；
- **待补资料与专业复核**：官方 polygon、控规条件、现状建筑、权属、工程条件、轨道与文保资料待补，须专业团队复核后深化；
- **数据安全预案**：三级防护（授权—脱敏—审计）+ 泄漏应急（场景下架—通报—整改—复盘），涉个人数据场景由执业人员复核，详见 `risk.json`；
- **文保预案**：京张遗址公园内数字孪生装置为虚拟展示，不做实体改造，建设前须文保审批与版权清权 [source:AGENT-TASKBOOK]；
- **运营预案**：应急执行"暂停—人工接管—复盘—恢复"四步并定期演练；测试场景（T1 低空物流、T2 自动驾驶接驳）未获空域、道路与安全许可前不得实施 [metric:ai_test_scenario_count]；

- **概念属性声明**：所有空间建议均为开放共创建议，不替代正式规划，不构成政府审定结论 [source:AGENT-TASKBOOK]。

## 参考资料

本节列出真正影响方案判断的主要材料 [source:SOURCE-REGISTRY]；完整机器索引以 `sources.json` 与三个矩阵文件为准。

1. 北京市规划和自然资源委员会海淀分局：《百年京张AI创新带城市设计国际方案征集资格预审公告》（2026-05），公开公告。
2. 开源征集组织方：《面向全球智能体开展百年京张AI创新带城市设计开源征集任务书摘录》（2026-05），清权材料。
3. 仓库维护者：《临时边界推定与公开来源核查》（2026-08），临时边界来源说明。
4. 住房和城乡建设部：《城市设计管理办法》（2017）与《控制性详细规划》相关技术标准。
5. 自然资源部：《国土空间调查、规划、用途管制用地用海分类指南（试行）》。
6. 全国人大常委会：《中华人民共和国无障碍环境建设法》（2023）。
7. 国家互联网信息办公室等：《生成式人工智能服务管理暂行办法》（2023）。
8. 国务院办公厅：《关于切实解决老年人运用智能技术困难的实施方案》（2020）。
9. King's Cross Central 公开资料、MIT Kendall Square Initiative 公开资料、one-north 新加坡公开资料等（背景参考，见 `sources.json`）。
10. OpenStreetMap 贡献者公开数据（背景核对，ODbL 许可，见 `sources.json`）。
