---
title: "京张量带 JINGZHANG QUANTUM BELT：从铁轨到量子比特——量子×AI创新带城市设计方案"
author_github: "kuwoo"
language: "zh"
proposal_format_version: "2"
bilingual_contract_version: "1"
translation_file: "proposal.en.md"
license: "COMMUNITY-DISPLAY-ONLY"
summary: "以「从铁轨到量子比特」为总叙事，将量子信息产业、量子安全底座与量子物理美学空间语言融入百年京张AI创新带，形成「一轴三态两翼多点」空间结构、12张AI场景卡、4处朝圣地标与量子-AI长期运营体系的正式城市设计方案包。"
tracks: ["enterprise-services-ecosystem", "jingzhang-heritage-narrative", "civic-agent-governance"]
scenarios: ["ai-traffic-walkability", "enterprise-service-copilot", "public-safety-operations-review"]
iteration: "v0.1"
---

# 京张量带 JINGZHANG QUANTUM BELT：从铁轨到量子比特

## 设计依据与资料清单

本方案以北京市规划和自然资源委员会海淀分局发布的《百年京张AI创新带城市设计国际方案征集资格预审公告》为第一依据，以 `brief/site-package/` 的机器可读任务书、设计空间约束、枚举、指标区间与来源登记为工作基础，并叠加"量子×AI"主题下的已核实公开事实（北京量子信息科学研究院官网公开信息等）[source:OFFICIAL-ANNOUNCEMENT] [source:AGENT-TASKBOOK] [source:BAQIS-2026]。方案面向公告三层范围（统筹研究范围 43.6 km²、总体设计范围约 11.4 km²、重点区域 368.4 公顷）与智能体任务书 agent.1–agent.6 逐项回应，覆盖映射见 `compliance_matrix.json`。

当前官方精确边界与三处重点区域 polygon 尚未公开发布，本包按规则使用 `brief/site-package/geometry/provisional_boundaries.geojson` 的临时粗略边界生成：`geometry/site_boundary.geojson` 与 `geometry/key_areas.geojson` 均标注 `geometry_role=provisional_constraint`、`official_boundary=false`，仅用于方案生成、展示与自检讨论，不得作为官方红线、审批依据或精确面积依据 [data:geometry/site_boundary.geojson#SITE-001] [source:SITE-PACKAGE]。组织方数据缺口不阻断内容评分；官方 polygon 发布后，边界、用地、道路、绿地、公共空间、建筑、分期与全部面积指标需统一重算。

资料登记边界如下 [source:SOURCE-REGISTRY]：formal 可用资料用于支撑正式判断；背景资料与 provisional 资料只用于叙事、生成与讨论，不得升级为法定控制或实施承诺。量子主题事实仅采用北京量子信息科学研究院官网公开披露并经本次访问核实的内容（机构地址、院长及获奖信息、量子云算力集群发布、量子直接通信应用、Quafu 杯真机挑战赛等），完整出处与访问日期登记于 `sources.json` [source:BAQIS-2026]；未核实的企业名单、投资额、政策与工程数据一律不采用。

![资料证据链与提交包关系图](assets/figures/site-overview.png)

## 三层范围工作框架

方案按公告三层范围组织：统筹研究范围（43.6 km²）回答"量子×AI 创新生态与未来城市形态"；总体设计范围（约 11.4 km²）把产业战略落实为城市更新总体框架、空间结构、交通市政与风貌控制；重点区域范围（368.4 公顷）对众智园、北京 AI 原点社区、大钟寺三处片区达到规划综合实施方案深度的详细设计 [depth:three_level_scope_framework] [depth:overall_spatial_structure]。

三层范围逐级传导：统筹研究层提出"量子-经典混合算力"与"AI 全栈自主创新"的产业判断，总体设计层将其转译为"一轴三态两翼多点"空间结构与三类设计图层（用地、公共空间、实施分期），重点区域层在叠加场、纠缠社区、隧穿坊三处验证具体功能、建筑、交通与 AI 场景的可实施性 [data:geometry/key_areas.geojson#PROV-KEY-001] [data:geometry/key_areas.geojson#PROV-KEY-002] [data:geometry/key_areas.geojson#PROV-KEY-003]。provisional 边界下的全部面积与比例仅作讨论性复算，正文与指标均保留"待正式数据复算"标注。

| 层级 | 设计问题 | 方案回答 | 数据落点 |
| --- | --- | --- | --- |
| 统筹研究范围 | 量子×AI 产业生态与未来城市形态 | "从铁轨到量子比特"百年接力；量子-经典混合算力产业带 | compliance_matrix.json、standard_matrix.json |
| 总体设计范围 | 空间结构、城市更新、交通市政与风貌 | 一轴三态两翼多点；隧穿廊道缝合；蓝绿慢行复合环 | [data:geometry/land_use.geojson#LU-001]、[data:geometry/roads.geojson#ROAD-001] |
| 重点区域范围 | 三处片区详细设计 | 叠加场、纠缠社区、隧穿坊三个概念化详细设计 | [data:geometry/key_areas.geojson#PROV-KEY-001]、#PROV-KEY-002、#PROV-KEY-003 |

![三层范围与空间工作框架图](assets/figures/land-use-structure.png)

## 统筹研究范围产业与未来城市研究

统筹研究范围的核心判断：海淀 AI 创新带不应只做"算力堆叠"，而应把**量子信息作为下一代算力的战略锚点**，与经典 AI 算力构成"量子-经典混合"的双层创新体系，回应"AI 全栈自主创新体系"与"AI 治理全球话语权"两项功能定位 [source:AGENT-TASKBOOK] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]。

**命名与视觉识别（agent.1）**。方案主名"京张量带 JINGZHANG QUANTUM BELT"："量"字双关——丈量百年铁路的勘测精神与量子计算；英文保留 JINGZHANG 主品牌，以 QUANTUM BELT 表达量子创新带属性。命名体系沿"三区两翼"展开：众智园命名为**叠加场 SUPERPOSITION YARD**（全栈自主创新与量子算力试验的空间叠加），北京 AI 原点社区命名为**纠缠社区 ENTANGLED COMMUNITY**（高校、企业、人才之间物理分离而逻辑关联的纠缠生态），大钟寺命名为**隧穿坊 TUNNELING QUARTER**（智能原生新业态穿越传统商圈的隧穿效应）；中关村科技服务翼为**相干翼 COHERENCE WING**（要素配置的相干性），小月河场景赋能翼为**观测翼 OBSERVATION WING**（场景即测量、公众即观测者）。

Logo 概念方向（下图）：以詹天佑"人字形"展线为骨架（金色钢轨线条），叠加量子比特叠加态圆点轨道（量子蓝紫/青蓝色），构成"从铁轨到量子比特"的视觉符号；字体采用无衬线几何风格，标准色为钢轨灰、量子蓝紫与中关村金三色。导视系统采用"圆点-连线"的量子比特语言，站点与节点以叠加态符号标识 [depth:brand_identity_system]。

![京张量带 Logo 概念稿](assets/figures/logo.png)

**量子×AI 产业生态（agent.2）**。产业判断分三层：基础层由高校与新型研发机构构成（清华量子信息研究、北京量子信息科学研究院等公开资源）；平台层以量子云算力、开源社区与公共测试场构成；应用层聚焦 AI×量子融合场景（量子安全通信、量子随机数、量子算法与 AI 结合）。全球 8 个创新生态案例的机制提炼如下 [source:BAQIS-2026] [source:AGENT-TASKBOOK]：

| 案例 | 可转化机制 | 海淀落点 |
| --- | --- | --- |
| 北京量子信息科学研究院（本地锚点） | 新型研发机构"基础研究-工程化-产业转化"一体化 | 叠加场科研与测试功能 |
| 合肥量子信息产业集聚（本源量子、国盾量子等公开报道） | 龙头企业带动量子产业链集聚与专项政策 | 叠加场产业孵化机制 |
| IBM Quantum Network | 量子云平台开放接入与开发者生态 | 量子云开放测试场运营 |
| 波士顿 Kendall Square | 高校-产业步行可达的转化社区 | 纠缠社区近校转化模式 |
| 巴黎 Station F | 大型孵化器+全球活动运营 | 隧穿坊创业与路演机制 |
| 新加坡 one-north 纬壹科技城 | 科研-产业-居住一体化园区 | 三态片区职住平衡 |
| 深圳河套深港科技创新合作区 | 跨境创新与制度试验 | 国际交往与规则试验 |
| 上海张江人工智能岛 | AI 场景集聚展示与园区运营 | 观测翼公共体验运营 |

案例提炼均来自公开报道层面的模式归纳，作为"可供专业团队深化研究"的参考机制，不构成企业引进或投资承诺 [source:AGENT-TASKBOOK]。

**量子安全产业赋能（agent.2/agent.3 产业结合）**。方案把量子密钥服务定位为"城市级安全基础设施"，提出三个产业赋能层次：其一，**量子密钥服务化（QaaS）**——量子密钥分发/量子直接通信以按需订阅方式向金融、政务、能源、交通等行业提供加密通道，行业无需自建设备即可接入，对齐已核实的量子直接通信商业银行应用事实 [source:BAQIS-2026]；其二，**行业试点通道**——金融（跨行清算、支付与长期数据保密性）、政务与公共数据（社保医保数据共享）、能源（电网调度）、交通（轨道信号与车路协同）四类概念试点；其三，**产业生态层**——在叠加场设立量子密钥检测认证中心与产业联盟机制，把测试验证场景转化为标准输出与产业服务能力 [depth:ai_scenario_operation]。

**量子安全城市生命线（agent.2/agent.3/agent.4 深化）**。方案把量子安全从"通道服务"升级为**城市生命线**定位：城市生命线（电力、供水、燃气、通信、交通）全面数字化后，安全成为支撑一切生命线运转的底层生命线——"量子安全城市生命线"以 QKD 网络为骨骼、量子安全实验室为心脏、密钥服务体系为血液，沿京张走廊构筑城市级量子安全基础设施骨架（概念建议）[source:BAQIS-2026]。

**沿线 QKD 网络：骨干-中继-接入三层拓扑（概念建议）**。京张铁路走廊是天然的线状载体，与量子密钥分发网络"节点-链路"拓扑同构；方案提出沿京张遗址公园主轴构筑三层网络骨架 [data:geometry/public_space.geojson#SCN-15] [data:geometry/public_space.geojson#SCN-16] [data:geometry/public_space.geojson#SCN-17]：**骨干层**——三处枢纽节点（北端清华园站旧址方向、中段五道口方向、南端大钟寺站），承载密钥交换与路由；**中继层**——四处中继节点（清河桥、知春路、蓟门桥、西直门方向），应对量子信号传输距离限制、延长网络覆盖 [data:geometry/public_space.geojson#SCN-19] [data:geometry/public_space.geojson#SCN-22]；**接入层**——沿线园区、高校、政务、金融等接入点，通过量子安全通道接入骨干（产业接入点、政务试点点、公众体验点三类功能）。三枢纽+四中继构成"测试网络"骨架，验证覆盖、中继与运维机制后可作为专业团队深化的城市级量子安全网络基础；节点间距、中继方式（可信中继/量子中继）与工程条件均待专业确认。

**量子安全实验室集群（产业基础设施）**。在叠加场（众智园）设立量子安全实验室集群 [data:geometry/public_space.geojson#SCN-18]：检测认证实验室（QKD 设备检测、密钥管理合规认证）、安全攻防实验室（量子安全渗透测试、抗量子密码迁移测试）、标准化工作坊（量子安全标准与测评规范输出），把测试验证场景转化为产业标准与认证服务能力 [depth:ai_scenario_operation]。

**产业与就业生态**。量子安全产业链条（概念）：设备器件（QKD 设备、单光子探测）→ 系统集成 → 密钥服务（QaaS）→ 安全运营（量子安全 SOC）→ 检测认证 → 教育培训。沿此链条提出六类就业岗位方向：量子网络工程师、密钥管理工程师、量子安全运维分析师、检测认证工程师、量子科普教育专员、产业服务人员；在纠缠社区/观测翼设量子安全产业就业服务中心，联动高校与量子院资源形成培训与岗位对接机制（概念建议）[data:geometry/public_space.geojson#SCN-23]。

文化叙事上，这条干线延续"1909 铁路电报线传递信息 → 2026 量子密钥线守护信息"的通信基础设施百年进化线，并进一步升华为"**从钢铁生命线到量子安全生命线**"——京张铁路曾是工业时代城市的生命线（物资与人员），量子安全网络是数字时代城市的生命线（数据与信任）[standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]。上述全部为概念建议与试点方向，不构成已确定的产业安排或技术承诺。

**未来城市形态**。本方案提出"叠加生活"概念：以量子叠加态隐喻复合功能空间——同一空间在时间维度上叠加工作、学习、社交与公共生活，减少专类空间空置；以"测量坍缩"隐喻公众参与——城市治理状态因公众"观测"（参与、反馈、监督）而呈现，呼应人本治理原则 [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]。

## 总体设计范围城市更新与控规深度城市设计

总体设计范围形成"**一轴三态两翼多点**"空间结构：一轴为京张遗址公园"相干时间轴"（南北主轴，串联清华园站旧址方向至大钟寺方向的文化与创新节点）；三态为叠加场、纠缠社区、隧穿坊三处核心区；两翼为相干翼、观测翼；多点即 12 个 AI 场景节点网络 [depth:overall_spatial_structure] [depth:land_use_layout]。三条东西向"隧穿廊道"（北、中、南）跨京张遗址公园缝合东西城市片区，以量子隧穿隐喻表达"穿越屏障的连接" [data:geometry/land_use.geojson#LU-001] [data:geometry/roads.geojson#ROAD-001]。

用地布局以产业功能与公共空间协同为目标：沿遗址公园主轴布局绿地与公共空间，两侧布局 AI 研发、教育科研、商业商务与混合用地，居住与公共服务用地均衡嵌入，形成职住平衡的创新街区 [data:geometry/land_use.geojson#LU-002] [metric:green_ratio]。建筑规模与开发强度：由于缺少官方控规条件，容积率、建筑高度、建筑密度一律登记为 `unknown`，本包仅提供"概念体量"级别的建筑基底图层（`geometry/buildings.geojson`，标注 `design_proposal` 与低置信度），并明确其不等于法定控制值 [data:geometry/buildings.geojson#BLDG-001] [depth:development_intensity_controls]。

更新框架遵循"保留-改造-新建"分级与"轻量先启动"原则：轨道站点周边与低效产业空间作为更新重点，文化保护与高校周边以保留和改造为主，概念性新建集中在大钟寺站城一体化与叠加场试验带；具体拆改留结论需待权属与工程条件确认，本方案仅提出方法框架与待校准清单 [depth:retain_renovate_demolish]。总体设计深度的空间证据由用地、建筑、道路、绿地、公共空间、分期六类图层共同承载 [depth:height_massing_character] [standard:MOHURD-URBAN-DESIGN-MEASURES]。

## 重点区域详细设计

### 叠加场 SUPERPOSITION YARD（众智园 AI 自主创新加速区，约 192.1 公顷）

定位：**量子-经典混合算力试验带与全栈自主创新街区**。空间动作：沿清河界面组织低碳创新走廊与公共客厅；中部布局量子-经典混合算力试验带（含量子真机测试场、安全治理沙盒、产业展示廊）；西部与北部衔接产业研发与标准治理功能 [data:geometry/key_areas.geojson#PROV-KEY-001]。建筑更新以"保留改造为主、概念新建为辅"，开发强度待控规确认。AI 场景：量子真机测试场（T1）、安全治理沙盒、清河低碳创新廊 [depth:three_key_area_detailed_design]。

### 纠缠社区 ENTANGLED COMMUNITY（北京 AI 原点社区，约 104.3 公顷）

定位：**近校成果转化与开源协作社区**。空间动作：以观测广场为公共锚点，组织校区-园区-街区慢行缝合；沿近校界面布局成果转化街（孵化、法务、知识产权、投融资）；建设开源发布厅与量子科普体验馆 [data:geometry/key_areas.geojson#PROV-KEY-002]。建筑以保留、改造与功能置换为主。AI 场景：观测广场（公众参与）、纠缠实验室、开源发布厅、量子科普体验馆 [depth:three_key_area_detailed_design]。

### 隧穿坊 TUNNELING QUARTER（大钟寺 AI 产业聚集区，约 72.0 公顷）

定位：**智能原生消费与数据要素国际交往街区**。空间动作：围绕大钟寺站推进站城一体化概念设计，组织路口四象限步行连通；沿主要商业界面布局智能原生消费与内容体验；设置数据要素会客厅与国际路演客厅 [data:geometry/key_areas.geojson#PROV-KEY-003]。建筑以更新与概念新建为主，站点周边高强度开发需待轨道与控规条件确认。AI 场景：隧穿商业街、数据要素会客厅、国际路演客厅 [depth:three_key_area_detailed_design]。

![三处重点区域索引与设计任务图](assets/figures/key-areas.png)

## AI 创新生态、人才画像与 AI+ 场景

**用户画像（7 类）** [source:AGENT-TASKBOOK]：

| 用户画像 | 典型需求 | 空间响应 | 自检边界 |
| --- | --- | --- | --- |
| 量子科研人员 | 真机测试、学术交流、成果转化 | 叠加场量子真机测试场、量子科普体验馆 | 科研数据须授权；不采集个人轨迹 |
| 开源开发者 | 发布、协作、测试、社区声誉 | 纠缠社区开源发布厅、公共代码墙 | 活动数据仅聚合统计 |
| 初创团队 | 低成本办公、算力入口、测试场地 | 叠加场共享测试场、端侧算力驿站 | 算力与数据服务另行授权 |
| 头部企业访客 | 展示、商务、国际接待 | 隧穿坊国际路演客厅、轨道接驳 | 企业标识与案例须清权 |
| 高校师生 | 成果转化、跨校协作、日常慢行 | 纠缠社区成果转化街、慢行缝合 | 校园数据与科研成果需授权 |
| 周边居民 | 通勤、休闲、社区服务、低扰动更新 | 相干时间轴步道、观测广场、社区服务嵌入 | 不将居民画像用于商业推荐 |
| 国际人才 | 国际交往、文化体验、长期居留 | 隧穿坊国际界面、观测翼公共体验、职住平衡 | 遵循数据最小化与合规要求 |
| 量子安全工程师 | 真机运维、密钥管理、安全审计、职业发展 | 叠加场实验室集群、中继节点、就业服务中心 | 运维数据分级授权；不采集个人行为 |

**AI 场景卡（12 张，含 3 张产业测试验证场景）** [source:AGENT-TASKBOOK] [data:geometry/public_space.geojson#PUBLIC-001]：

| 编号 | 场景卡 | 类型 | 空间载体 | 服务对象 | 运营主体（建议） | 人工复核边界 |
| --- | --- | --- | --- | --- | --- | --- |
| 01 | 量子真机测试场 | **测试验证 T1** | 叠加场 | 科研机构、量子企业、高校团队 | 量子院/产业平台联合运营 | 测试资格审核；结果可追溯、可复核 |
| 02 | 量子安全政务通道 | **测试验证 T2** | 观测翼/政务节点 | 政务部门、公共服务机构 | 主管部门试点委托 | 试点范围与数据分级须主管部门确认 |
| 03 | 真随机数公共基准站 | **测试验证 T3** | 观测广场 | 公众、公证机构、社会组织 | 公共事业运营方 | 流程公开审计；不涉及个人数据 |
| 04 | 叠加站台 | 公共空间 | 相干时间轴北端 | 全体市民、游客 | 公园管理机构 | 文保约束优先 |
| 05 | 纠缠实验室 | 产业协作 | 纠缠社区 | 高校-企业联合团队 | 高校与企业共建 | 科研保密边界 |
| 06 | 隧穿商业街 | 智能原生消费 | 隧穿坊 | 消费者、创业团队 | 商业运营机构 | 隐私与未成年人保护 |
| 07 | 观测广场 | 公众参与治理 | 纠缠社区 | 市民、社区组织 | 街道/社区运营 | 投票规则公开；防刷票 |
| 08 | 量子科普体验馆 | 科普朝圣 | 纠缠社区/原点 | 青少年、市民、研学团体 | 科普场馆运营方 | 内容科学审查 |
| 09 | 相干时间轴步道 | 文化体验 | 京张遗址公园 | 市民、游客、开发者 | 公园管理机构 | 历史事实审定 |
| 10 | 开源发布厅 | 开发者社区 | 纠缠社区 | 开发者、开源社区 | 社区基金会/平台 | 版权与授权核查 |
| 11 | AI 慢行导航 | AI+交通 | 全域慢行网络 | 行人、骑行与无障碍人群 | 交通管理部门 | 不采集个人轨迹 |
| 12 | 数据要素会客厅 | 数据要素 | 隧穿坊 | 数据服务企业、合规机构 | 专业运营机构 | 合规审查与审计 |
| 13 | 量子安全金融通道 | 产业场景 | 叠加场/金融节点 | 金融机构、清算机构 | 金融科技与量子平台联合运营 | 密钥管理审计；试点范围须监管确认 |
| 14 | 量子密钥检测认证中心 | 产业场景 | 叠加场 | 量子设备商、行业用户、检测机构 | 产业联盟/检测认证机构 | 检测标准公开；结果第三方复核 |
| 15 | QKD 北端节点（清华园站旧址方向） | 产业接入 | 相干时间轴北端 | 沿线园区、高校、科研机构 | 网络运营方+园区联合 | 密钥管理与访问审计 |
| 16 | QKD 中段节点（五道口方向） | 产业接入 | 主线中段 | 沿线企业、政务试点 | 网络运营方+主管部门 | 试点范围与数据分级确认 |
| 17 | QKD 南端节点（大钟寺站） | 公共体验 | 大钟寺站周边 | 公众、游客 | 网络运营方+场馆运营 | 科普内容科学审查 |
| 18 | 量子安全实验室 | 产业基础设施 | 叠加场 | 量子设备商、行业用户、检测机构 | 实验室集群运营方 | 检测标准公开；结果第三方复核 |
| 19 | 量子中继节点·清河桥 | 网络中继 | 北段沿线 | 网络运营方、沿线园区 | 网络运营方 | 中继安全审计 |
| 20 | 量子中继节点·知春路 | 网络中继 | 中北段沿线 | 网络运营方、接入企业 | 网络运营方 | 中继安全审计 |
| 21 | 量子中继节点·蓟门桥 | 网络中继 | 中南段沿线 | 网络运营方、接入企业 | 网络运营方 | 中继安全审计 |
| 22 | 量子中继节点·西直门方向 | 网络中继 | 南段沿线 | 网络运营方、政务试点 | 网络运营方+主管部门 | 试点范围与数据分级确认 |
| 23 | 量子安全产业就业服务中心 | 产业服务 | 观测翼/纠缠社区 | 企业、求职者、高校 | 产业服务运营方 | 岗位与培训信息合规 |

场景-空间-运营映射、运行数据来源、隐私边界与可视化图层完整登记于 `compliance_matrix.json`，正文表格为可读摘要 [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK] [depth:ai_scenario_operation]。

## 用地、建筑规模与拆改留方案

用地方案覆盖总体设计范围全边界、无缝无重叠分区，含 AI 研发创新用地、教育科研用地、商业商务用地、居住用地、公园绿地与开敞空间、公共服务设施用地、混合用地与道路交通设施用地八类 [data:geometry/land_use.geojson#LU-001] [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE]。绿地与公共空间沿遗址公园主轴与两翼界面连续布局，支撑"叠加生活"的日常交往 [metric:green_ratio] [metric:public_space_ratio]。

建筑基底图层表达概念性"保留-改造-新建"分级（`retain`/`renovate`/`new_build`/`to_be_confirmed`），面积与占比由 `geometry/buildings.geojson` 复算 [data:geometry/buildings.geojson#BLDG-001] [metric:building_footprint_area_sqm]。容积率、建筑高度、建筑密度、退线与道路红线因缺少官方控规条件，统一 `status=unknown`，在 `metrics.json` 与 `assumptions.json` 中说明待补条件与复算路径 [depth:development_intensity_controls] [depth:retain_renovate_demolish]；本包不提供任何伪精确法定数值。

## 交通、轨道、市政与公共服务设施

交通概念围绕"轨道锚点+慢行优先"组织：以五道口、清华东路西口、大钟寺站等轨道站点为换乘锚点，提出站点一体化与路口四象限步行连通概念；以相干时间轴步道与三条隧穿廊道构成慢行主骨架，缝合遗址公园东西两侧 [data:geometry/roads.geojson#ROAD-001] [depth:traffic_rail_slow_parking]。道路线位、红线与停车设施均待官方条件确认，图层仅表达概念性网络。

市政与新型基础设施：提出分布式能源、端侧算力驿站、量子安全公共服务通道与数据要素基础设施的概念框架 [data:geometry/constraints.geojson#CONSTRAINTS] [depth:municipal_new_infrastructure]；管线、能源、消防与工程条件缺失项列入正式深化前置条件。公共服务设施沿观测翼与社区节点布局，覆盖创新服务、人才生活与日常公共服务 [standard:MOHURD-URBAN-DESIGN-MEASURES]。

![交通慢行与蓝绿公共空间复合系统图](assets/figures/mobility-bluegreen.png)

## 蓝绿空间、公共空间与城市风貌

蓝绿空间以京张遗址公园"相干时间轴"为骨架，统筹清河界面、小月河界面与节点绿地，形成南北贯通、东西缝合的连续步道骑行网络 [data:geometry/green_space.geojson#GREEN-001] [depth:blue_green_public_space]。公共空间系统由观测广场、叠加站台、隧穿廊道节点与站点广场构成，承载 AI 场景、文化叙事与公众参与 [data:geometry/public_space.geojson#PUBLIC-001] [metric:public_space_ratio]。

**AI 朝圣地标与荣誉展示体系（agent.4，4 处）** [source:AGENT-TASKBOOK]：

| 地标 | 位置 | 设计概念 | 状态边界 |
| --- | --- | --- | --- |
| 量子比特纪念碑（叠加站台） | 相干时间轴北端（清华园站旧址方向概念选址） | 以量子比特叠加态圆点装置纪念"从铁轨到量子比特"的自主创新接力 | 概念建议；文保与审批前置 |
| 观测广场 | 纠缠社区 | 公众参与即"测量"的治理隐喻空间，含真随机数基准站 | 概念建议；活动审批前置 |
| 相干时间轴文化节点 | 京张遗址公园沿线 | 1909/2013/2026 三线叙事的文化装置与导视节点 | 概念建议；历史事实审定 |
| 智能体贡献荣誉墙 | 开源发布厅旁 | 记录智能体与开发者贡献的荣誉展示体系，呼应赛事纪念机制 | 展示内容须清权与审核 |

城市风貌控制提出"钢轨灰+量子蓝紫+中关村金"基调与"圆点-连线"导视语言，作为概念性风貌引导；涉及文保、建筑高度与风貌管控的结论均以待确认条件处理，不提供伪精确控制线 [standard:MOHURD-URBAN-DESIGN-MEASURES] [depth:height_massing_character]。

## 更新项目清单、实施政策与分期计划

更新项目清单（8 项，概念建议）[data:geometry/phasing.geojson#PHASE-001] [depth:renewal_project_list]：

| 编号 | 项目名称 | 类型 | 主要依赖 | 分期 |
| --- | --- | --- | --- | --- |
| JZ-01 | 相干时间轴步道缝合 | 公共空间/文化 | 道路红线、桥下空间、文保复核 | 近期 |
| JZ-02 | 叠加场量子算力试验带 | 产业/新基建 | 算力、能源、安全与运营主体 | 近期试点 |
| JZ-03 | 观测广场 | 公共空间/治理 | 用地权属、活动审批 | 近期 |
| JZ-04 | 隧穿廊道（北中南三处） | 交通/公共空间 | 道路红线、市政管线 | 中期 |
| JZ-05 | 纠缠社区近校成果转化街 | 城市更新/产业服务 | 校区边界、权属、首层业态 | 中期 |
| JZ-06 | 隧穿坊站城一体化 | 轨道一体化/更新 | 轨道站点、控规条件 | 中期 |
| JZ-07 | 量子科普体验馆 | 文化/公共服务 | 场馆条件、科学内容审查 | 中期 |
| JZ-08 | 全球AI活动周路线 | 运营/品牌 | 公共空间许可、活动安全、版权清权 | 近期启动 |

实施政策建议覆盖城市更新统筹、产业空间供给、场景开放运营、数据治理与公众参与机制；所有政策、资金、活动安排均表述为概念建议，不构成政府承诺 [depth:phasing_implementation]。分期逻辑：近期（2026-2028）以轻量设施、运营活动与公共测试场景启动；中期（2029-2032）推进廊道缝合与核心区更新；远期（2033 以后）完成产业升级与治理框架沉淀。

**全球量子-AI 活动体系与长期运营（agent.6）**：年度活动体系建议为"一论坛两赛一周一节"——量子-AI 双年论坛（对接中关村论坛机制）、Quafu 杯量子计算真机挑战赛（联办建议）、京张开源马拉松、国际量子-AI 开发者周、叠加节公众开放日；开发者社区运营依托开源发布厅、贡献荣誉墙与场景开放运营机制；转化路径为"测试场→场景验证→企业服务→政策对接"。全部活动为概念建议 [source:AGENT-TASKBOOK] [source:BAQIS-2026]。

## 指标体系、面积复算与合规矩阵

指标体系分三类：空间可复算指标（site_area_sqm、key_area_count、green_ratio、public_space_ratio、building_footprint_area_sqm、scenario_node_count、test_scenario_count、landmark_count、renewal_project_count）；待官方控规支撑的管控指标（容积率、建筑高度、建筑密度、退线，`status=unknown`）；运营绩效指标（活动参与度、场景使用频次等，待运营校准）[depth:metrics_recalculation] [metric:site_area_sqm]。

当前由本包几何复算的核心指标（provisional 边界）：总体设计范围面积 11,412,825 m²；三处重点区域 3 处；绿地率与公共空间率由 `geometry/green_space.geojson`、`geometry/public_space.geojson` 复算；建筑基底面积由 `geometry/buildings.geojson` 复算；场景节点 12 个；测试验证场景 3 个；朝圣地标 4 处；更新项目 8 项 [metric:green_ratio] [metric:public_space_ratio] [metric:building_footprint_area_sqm]。所有 `unknown` 指标在 `metrics.json` 中说明原因与正式数据到位后的复算路径，正文不制造伪精确数值。

合规矩阵 `compliance_matrix.json` 覆盖公告 1.3、1.4、1.5 全部必选任务与 agent.1–agent.6 六项任务，每项映射到报告章节、图层、指标、图纸、HTML 页面、来源、假设与自检项 [standard:PROJECT-OFFICIAL-ANNOUNCEMENT] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]。

![核心指标复算与证据链图](assets/figures/metrics-evidence.png)

## 风险、版权与合规说明

**双语言契约**：本方案以中文为主稿，`proposal.en.md` 为完整等义译稿；A3/A0 图纸、HTML 与含文字图件提供英文副本，术语遵循赛事中英术语表。缺少任一必需译稿、语言映射或失效文件将阻断 finalize 与 CI。

**风险清单**：量子技术成熟度风险（量子计算、量子通信均处于发展早期，方案全部表述为概念建议与测试验证场景）；数据缺口风险（官方边界、控规、权属、市政、文保条件待补，全部登记于 `assumptions.json` 与 `missing_data_checklist`）；合规风险（企业名单、投资额、政策承诺一律不编造）；运营风险（活动与运营安排为概念建议，需专业团队深化）[depth:risk_missing_data] [data:geometry/constraints.geojson#CONSTRAINTS]。

**版权与合规**：本方案仅使用公开或已核实资料，量子事实来自北京量子信息科学研究院官网公开页面（访问日期 2026-08-11，登记于 `sources.json`）；未使用未经公开披露的规划资料、未授权图片、字体、商标与人物肖像；全部 AI 生成内容由作者负责事实、引用与表达 [source:BAQIS-2026]。HTML 页面离线可用，无远程资源与跟踪代码。本方案不声称官方批准、审定控规、最终土地权属、建设规模或保证实施。

## 参考资料

- 北京市规划和自然资源委员会海淀分局《百年京张AI创新带城市设计国际方案征集资格预审公告》（第一权威公告，见 `data/source_registry.json` 登记）
- 面向全球智能体开展百年京张AI创新带城市设计开源征集任务书摘录（`brief/site-package/agent_taskbook.json`）
- 百年京张 AI 创新带公开任务书草案（`brief/public-brief.md`）
- 北京量子信息科学研究院官网公开信息（baqis.ac.cn，2026-08-11 访问）
- `brief/site-package/design_brief.json`、`allowed_design_space.json`、`ranges/planning_limits.json`
- `data/processed/agent_fact_pack.md` 及同目录处理工作表
- 完整机器索引：`sources.json`、`metrics.json`、`compliance_matrix.json`、`standard_matrix.json`、`design_depth_matrix.json` [source:BAQIS-2026] [source:OFFICIAL-ANNOUNCEMENT]
