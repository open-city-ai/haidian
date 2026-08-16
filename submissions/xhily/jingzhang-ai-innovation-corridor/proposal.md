---
title: "百年京张AI创新带：从铁路遗产到AI原生活力走廊"
author_github: "xhily"
language: "zh"
proposal_format_version: "2"
bilingual_contract_version: "1"
translation_file: "proposal.en.md"
license: "COMMUNITY-DISPLAY-ONLY"
summary: "基于 provisional boundary 与结构化自检要求生成的 formal AI 城市设计方案包；保留精度警示与复算要求，组织方数据缺口不阻断内容评分。本版针对专业评审七维要求补齐 agent.1–agent.6 专属交付、无障碍包容性、JZ 更新项目与 GeoJSON feature_id 绑定、真实全球案例与三类指标分治。"
tracks: ["ai-traffic-walkability", "enterprise-services-ecosystem", "civic-agent-governance"]
scenarios: ["ai-traffic-walkability", "enterprise-service-copilot", "public-safety-operations-review"]
---

# 百年京张AI创新带：从铁路遗产到AI原生活力走廊

> 本方案所有空间落地建议均表述为"概念建议""参考方案""可供专业团队深化研究"。所有成果为开放共创建议，不替代正式规划，不构成政府审定结论 [standard:PROJECT-OFFICIAL-ANNOUNCEMENT] [source:AGENT-TASKBOOK]。

## 设计依据与资料清单

本 formal 方案以北京市规划和自然资源委员会海淀分局发布的《百年京张AI创新带城市设计国际方案征集资格预审公告》为第一依据，并以 `brief/site-package/` 中经维护者登记的临时粗略边界、重点区域、枚举、指标和来源清单为机器可读依据 [source:OFFICIAL-ANNOUNCEMENT]。生成前已读取 `design_brief.json`、`allowed_design_space.json`、`sources.json`、`enums/`、`ranges/`、`schemas/`、`data/source_registry.json` 与 `data/processed/agent_fact_pack.md`，并用 `project_scope_summary.csv`、`agent_task_requirements.csv`、`source_use_matrix.csv`、`missing_data_checklist.csv` 建立任务—范围—资料用途—缺口清单。

资料登记的使用边界如下 [source:SOURCE-REGISTRY]：
- `data/source_registry.json` 区分 formal 可用、background-only、provisional-only、needs-review 四类资料用途。
- 当前登记摘要：formal 可用资料 7 条，background-only 1 条，provisional-only 1 条。
- agent 不得把 background_only 或 provisional_only 资料升级为 official boundary、法定控规、正式评分依据或政府实施承诺。

`data/processed/agent_fact_pack.md` 是阅读导航层，不是新的权威来源 [source:PROCESSED-FACT-PACK]；事实判断仍需回到已登记原始材料，完整来源关系保存在 `sources.json`。

![资料证据链与提交包关系图](assets/figures/site-overview.png)

### 1.1 临时边界纪律与复算约定

官方 `SITE_BOUNDARY` 与三处 `KEY_AREA` polygon 尚未取得，本次使用 `brief/site-package/geometry/provisional_boundaries.geojson` 生成临时 formal 包。`geometry/site_boundary.geojson`（`PROV-SITE-001`）与 `geometry/key_areas.geojson`（`PROV-KEY-001/002/003`）均标注为 `provisional_constraint`、`official_boundary=false`，只能用于方案生成、自检、可视化与设计讨论，不能作为 official redline、审批依据、精确面积依据或法定控制结论 [data:geometry/site_boundary.geojson#PROV-SITE-001] [data:geometry/key_areas.geojson#PROV-KEY-001]。

可评分状态为：**临时边界，保留精度警示，待正式数据发布后整体复算；组织方数据缺口不阻断内容评分**。当官方边界与重点区 polygon 更新后，agent 必须重新运行脚手架、自检与图纸/HTML 生成，不能只替换单个文件。所有受 provisional boundary 限制的结论在正文均标注"待正式数据复算"。

## 三层范围工作框架

方案按公告确定的三个层次组织工作：**统筹研究范围**关注 43.6 km² 的 AI 产业生态、战略定位、创新链与未来城市形态；**总体设计范围**关注 11.4 km² 京张遗址公园周边 1–2 km 城市地区与产业区，要求形成城市更新总体框架、产业空间布局、交通市政支撑与城市风貌控制；**重点区域范围**关注 368.4 ha 三处详细设计地区，要求明确功能业态、建筑规模、拆改留分类、公共空间连通与交通组织 [source:OFFICIAL-ANNOUNCEMENT]。

三层工作不是割裂的图纸集合：统筹研究决定产业链与城市形态判断，总体设计把判断落实到更新项目、空间结构与设施承载，重点区域详细设计验证具体地块、建筑、交通、公共空间与 AI 应用场景的可实施性 [depth:three_level_scope_framework]。

本方案建议的总体概念为「**京张智脉共生带**」（英文命名 **Jing-Zhang Symbiotic AI Corridor**），以京张遗址公园为历史与公共空间主轴，以众智园、北京 AI 原点社区、大钟寺三处重点片区为创新锚点，以高校、企业、社区与轨道站点为日常网络，形成"一带三核、多点场景、蓝绿慢行复合环"的空间组织 [data:geometry/key_areas.geojson#PROV-KEY-001]。

| 层级 | 设计问题 | 方案回答 | 数据落点 |
| --- | --- | --- | --- |
| 统筹研究范围 | AI 产业生态与未来城市形态如何组织 | 建立"高校策源—开源协作—企业转化—公共体验—国际传播"的创新链 | compliance_matrix.json、agent.2 全球案例 |
| 总体设计范围 | 产业空间、城市更新、交通市政与风貌如何落图 | 用地、建筑、道路、绿地、公共空间、分期图层共同表达 | [data:geometry/land_use.geojson#LU-00-01]、[data:geometry/roads.geojson#ROAD-SPINE] |
| 重点区域范围 | 三处片区如何达到详细设计深度 | 分别提出定位、空间动作、AI 场景与实施依赖 | [data:geometry/key_areas.geojson#PROV-KEY-001]、[data:geometry/key_areas.geojson#PROV-KEY-002]、[data:geometry/key_areas.geojson#PROV-KEY-003] |

![三层范围与空间工作框架图](assets/figures/land-use-structure.png)

## 统筹研究范围产业与未来城市研究

### 3.1 一带总体概念与命名体系（回应 agent.1）

「京张智脉共生带 / Jing-Zhang Symbiotic AI Corridor」是贯穿三层范围的工作方法而非新增红线。命名体系由三层构成：

- **主名称**：京张智脉共生带（中文）/ Jing-Zhang Symbiotic AI Corridor（英文）；
- **副标识**：百年京张文化带 · 都市 AI 生活体验带 · AI 融合创新带（对应任务书三大定位）[source:AGENT-TASKBOOK]；
- **节点命名**：三处重点片区沿用任务书给出的 `zhongzhiyuan_ai_acceleration_area`、`beijing_ai_origin_community`、`dazhongsi_ai_industry_cluster` 内部标识，避免擅自更名。

**视觉识别与 Logo 方向（概念性，非定稿）**：以"铁轨—脉动—节点"为母题，将京张铁路的线性遗产转译为一条贯穿站点与街区的"智脉"曲线；色彩采用低饱和的工业灰蓝（遗产）与信号青（AI），形成可延展的标识、导视与活动主视觉语言。所有字体、图标、图像与企业标识须清权，禁止未经授权使用商标或人物肖像 [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]。

**国土空间规划创新思路**：方案把"综合规划内涵"理解为把产业策划、空间供给、设施承载与运营机制放进同一张可复算的图层体系，而非割裂的文本。用地、建筑、道路、绿地、公共空间、分期均从同一 `PROV-SITE-001` 边界派生，便于专业团队以官方边界替换后整体复算 [depth:overall_spatial_structure]。

### 3.2 三区两翼协同回路（回应 agent.1）

任务书的"三区两翼"是空间组织的骨架。本方案给出其协同回路，强调"片区—服务翼—场景翼"之间的要素流动 [source:AGENT-TASKBOOK]：

| 单元 | 角色 | 协同对象 | 协同回路 |
| --- | --- | --- | --- |
| 众智园AI自主创新加速区（PROV-KEY-001） | AI 全栈自主创新与治理话语权 | 中关村科技服务翼 | 自主模型/标准 → 中关村 IP 与资本赋能 → 原点社区孵化 |
| 北京AI原点社区（PROV-KEY-002） | 世界级 AI 创新生态 | 小月河场景赋能翼 | 高校策源 → 近校孵化 → 小月河公共体验路径 |
| 大钟寺AI产业集聚区（PROV-KEY-003） | 智能原生新业态 | 中关村科技服务翼 | 领军企业/智能终端 → 国际路演 → 人才与资本回流 |
| 中关村科技服务翼 | 要素全球化配置、IP 与资本 | 三区 | 资金/算力/数据要素跨区调度 |
| 小月河场景赋能翼 | AI 场景赋能与活力城市 | 三区 | 场景开放日/公共体验串联三区 |

### 3.3 全球 AI 创新生态案例（回应 agent.2，5–8 个真实公开案例）

以下为公开资料可查的城市/国家级 AI 生态实践，用于提炼可转移机制，**非本项目招商或财政承诺** [source:AGENT-TASKBOOK]：

| 案例 | 所在地 | 公开可查机制 | 可转移至本带的做法 | 资料性质 |
| --- | --- | --- | --- | --- |
| Vector Institute & MaRS | 多伦多，加拿大 | 学术—产业联合研究院 + 创新区集聚 | 高校策源到企业转化的"研究—孵化"近距回路 | 公开报道/机构官网 |
| Mila（魁北克 AI 研究所） | 蒙特利尔，加拿大 | 学术集群 + 开源与语言模型生态 | 开源协作与人才特区组织方式 | 公开报道/机构官网 |
| AI Singapore（国家 AI 战略） | 新加坡 | "100 Experiments" 政企共建 AI 落地 | 以"场景开放 + 共建试验"撬动产业服务 | 政府公开战略 |
| Helsinki AI Register & 城市 AI 战略 | 赫尔辛基，芬兰 | 公共部门 AI 登记与透明度 | 城市级 AI 应用的可审计、可信任治理 | 市政府公开文件 |
| Station F & Lab Ose | 巴黎，法国 | 大型初创园区 + 公共 AI 实验 | 国际路演与开发者社区运营空间 | 公开报道/机构官网 |
| 深圳南山—光明 AI 产业集群 | 中国深圳 | 硬件—AI 一体化与产业链配套 | 智能终端与端侧算力的产业空间组织 | 公开报道/政府公开信息 |
| Amsterdam Responsible AI & 城市 AI 中心 | 阿姆斯特丹，荷兰 | 负责任 AI  civic 试点 | 公共空间 AI 的伦理与人工复核边界 | 市政府公开文件 |
| Seoul AI Hub & 数字城市 | 首尔，韩国 | 城市级 AI 服务平台 | 公共体验与市民服务的场景贯通 | 政府公开战略 |

> 说明：上述案例仅作机制借鉴，未引用其投资额、产值或企业名单；任何产业招商、资金支持或政策安排均不得写为已确定事项 [source:AGENT-TASKBOOK]。

### 3.4 AI 创新生态图谱与要素保障（回应 agent.2）

要素保障机制按"土地—空间—产业—资金—人才—算力—数据—场景"八类组织：土地与空间由总体设计范围用地与建筑图层承载；产业由三区两翼定位；资金与人才由中关村科技服务翼的国际 IP 与资本、原点社区人才特区承接；算力以端侧算力驿站为原型（待深化，非审定设施）；数据以合规授权为前提；场景由 agent.3 的场景卡与开放运营机制落地 [depth:land_use_layout] [data:geometry/land_use.geojson#LU-00-01]。

## 总体设计范围城市更新与控规深度城市设计

总体设计范围需达到控制性详细规划的城市设计深度：提出总体空间结构、低效空间识别、更新项目清单、实施政策建议、产业功能比例、空间组织模式、建筑总规模与综合承载评估 [standard:MOHURD-CONTROL-DETAILED-PLANNING]。

- 用地结构：`geometry/land_use.geojson` 完整覆盖 `PROV-SITE-001` 且无重叠（674 个用地单元，如 `LU-00-01` 等）[data:geometry/land_use.geojson#LU-00-01]。
- 建筑基底：`geometry/buildings.geojson`（如 `BLD-00-01`）表达更新/保留建筑基底 [data:geometry/buildings.geojson#BLD-00-01]。
- 交通组织：`geometry/roads.geojson`（`ROAD-SPINE` 京张遗址公园主轴、`ROAD-TC` 大钟寺、`ROAD-GW` 北五环、`ROAD-H1/H2` 联络线）表达微循环与轨道接驳 [data:geometry/roads.geojson#ROAD-SPINE]。
- 指标复算：`metrics.json` 复算核心面积、比例与图层数量 [metric:site_area_sqm]。

涉及建筑高度、开发强度、道路红线、退线与设施标准的内容，若尚无官方控制条件，统一表述为"待正式控规条件确认"，不得以 agent 推测值冒充审定指标 [depth:development_intensity_controls]。

## 重点区域详细设计

三处重点区域详细设计是必选项，分别在 `geometry/key_areas.geojson` 中以 `PROV-KEY-001/002/003` 表达 [data:geometry/key_areas.geojson#PROV-KEY-001] [data:geometry/key_areas.geojson#PROV-KEY-002] [data:geometry/key_areas.geojson#PROV-KEY-003]。

![三处重点区域索引与设计任务图](assets/figures/key-areas.png)

| 重点片区 | 设计定位 | 空间动作（概念建议） | AI 产业与运营场景 | 证据引用 |
| --- | --- | --- | --- | --- |
| 众智园AI自主创新加速区（PROV-KEY-001） | 花园型全栈自主创新街区 | 强化清河界面、低碳创新交往、对外交通；以绿色空间承载开放测试与标准治理展示 | 自主模型测试床、标准制定工作坊、安全治理展示、低碳算力体验 | [data:geometry/key_areas.geojson#PROV-KEY-001]、[depth:three_key_area_detailed_design] |
| 北京AI原点社区（PROV-KEY-002） | 近校型成果转化与人才社区 | 校区—园区—街区慢行缝合；补足发布、人才服务、居住生活与开源协作空间 | 开源社区、成果发布、人才特区服务、近校孵化 | [data:geometry/key_areas.geojson#PROV-KEY-002]、[source:AGENT-TASKBOOK] |
| 大钟寺AI产业集聚区（PROV-KEY-003） | 城市型智能经济与国际交往街区 | 大钟寺站一体化、四象限步行连通、商业服务与重点企业公共环境更新 | 智能体与智能终端展示、内容消费、数据要素与国际路演 | [data:geometry/key_areas.geojson#PROV-KEY-003]、[metric:key_area_count] |

每个片区均含功能业态、建筑规模（设计建议，待控规确认）、建筑形态、拆改留分类（待权属与现状确认）、公共空间系统、交通组织、慢行连通与实施项目，并在 A3/A0 与 HTML 中可切换查看 [depth:retain_renovate_demolish]。

## AI 创新生态、人才画像与 AI+ 场景

### 6.1 用户画像（不少于 5 类）

| 用户画像 | 典型需求 | 空间响应 | 自检边界 |
| --- | --- | --- | --- |
| 开源开发者 | 发布、协作、测试、社区声誉 | 原点社区开源发布厅、公共代码墙、夜间协作空间 | 不采集个人行为轨迹；活动数据仅聚合统计 |
| 初创团队 | 低成本办公、算力入口、产品试验场 | 众智园共享测试场、端侧算力服务点、标准治理咨询 | 算力与数据服务需另行授权 |
| 头部企业访客 | 展示、商务、国际接待、招聘 | 大钟寺国际路演客厅、轨道接驳、企业周边公共空间 | 企业标识与案例须清权 |
| 周边居民 | 通勤、休闲、社区服务、低扰动更新 | 京张遗址公园慢行环、社区嵌入、夜间照明与活动分级 | 不将居民画像用于商业推荐 |
| 高校师生 | 成果转化、跨校协作、日常慢行 | 校区—园区慢行缝合、成果转化驿站、AI 教育体验点 | 校园数据与科研成果需授权 |

### 6.2 十张 AI 场景卡（回应 agent.3，≥10）

每张卡含：目标对象、空间载体、数据来源、隐私边界、人工复核、运营主体、关键指标（KPI）。

| 卡号 | 场景 | 空间载体 | 目标/数据/隐私/复核/运营/KPI |
| --- | --- | --- | --- |
| 01 开源发布厅 | 成果发布与协作 | 原点社区（PROV-KEY-002） | 对象：开发者；数据：公开贡献记录；隐私：仅聚合；复核：社区自治+人工仲裁；运营：开源基金会（概念）；KPI：月发布数、协作 PR 数 |
| 02 安全治理沙盒 | 模型红队与标准评测 | 众智园（PROV-KEY-001） | 对象：模型团队；数据：脱敏测试集；隐私：隔离环境；复核：专家委员会；运营：标准联盟（概念）；KPI：评测用例覆盖、红队发现数 |
| 03 端侧算力驿站 | 新型基础设施原型 | 总体设计范围节点 | 对象：初创/居民；数据：用量统计；隐私：不采集内容；复核：运维人工；运营：第三方服务商（待定）；KPI：服务人次、可用率 |
| 04 AI 慢行导航 | 慢行断点识别 | 京张遗址公园活力带（ROAD-SPINE） | 对象：全龄出行者；数据：匿名热力；隐私：边缘处理不留存；复核：规划师抽检；运营：市政（概念）；KPI：断点识别数、无障碍达标率 |
| 05 大钟寺国际路演客厅 | 展示与国际交流 | 大钟寺（PROV-KEY-003） | 对象：企业/访客；数据：活动报名（授权）；隐私：实名最小化；复核：人工审核；运营：运营公司（概念）；KPI：活动场次、洽谈转化 |
| 06 清河低碳创新廊 | 绿色+AI 展示 | 众智园临清河界面（GRN-00-00） | 对象：公众；数据：环境传感；隐私：区域级；复核：人工校验；运营：园区（概念）；KPI：碳排监测点、活动参与 |
| 07 近校成果转化街 | 孵化—法务—投融资 | 原点社区（PROV-KEY-002） | 对象：师生/初创；数据：成果登记（授权）；隐私：脱敏；复核：人工；运营：高校技转（概念）；KPI：落地项目数 |
| 08 数据要素会客厅 | 合规数据流通界面 | 大钟寺片区（PROV-KEY-003） | 对象：企业；数据：授权目录；隐私：可审计；复核：合规官；运营：数据交易所（概念）；KPI：合规流通量 |
| 09 AI 生活服务样板街 | 医疗/教育/法律/生活 | 社区与商业交汇 | 对象：居民；数据：授权服务；隐私：最小化；复核：人工；运营：服务商（待定）；KPI：服务覆盖、满意度 |
| 10 全球AI活动周路线 | 可步行体验路线 | 一带公共空间系统（PHASE-1） | 对象：公众/访客；数据：人流统计；隐私：聚合；复核：人工；运营：活动办公室（概念）；KPI：参与人次、传播量 |

### 6.3 三个产业测试验证场景（回应 agent.3，≥3，区别于运营）

测试验证场景是可评估、可终止的试验，明确写为"测试"而非"已批准运营" [source:AGENT-TASKBOOK]：

1. **T1 自主模型开放测试床（众智园 PROV-KEY-001）**：在隔离环境对自主大模型做红队与安全评测，输出评测报告与改进建议；测试期 6 个月，结束后公开方法论，不沉淀个人数据。
2. **T2 慢行断点与无障碍 AI 识别验证（京张遗址公园 ROAD-SPINE + PUB-03-01）**：用计算机视觉识别慢行断点与无障碍缺口，结果经规划师人工抽检后用于设计建议；测试数据边缘处理、不留存个人影像。
3. **T3 开源贡献度与声誉验证（原点社区 PROV-KEY-002）**：以公开仓库元数据聚合社区贡献与声誉，仅做聚合统计，不刻画个人行为轨迹；验证"贡献可记忆"机制的可信度。

### 6.4 场景—空间—运营映射与隐私/人工复核边界

所有场景落入结构化图层或合规矩阵，便于评审者看到场景与产业、空间、公共利益的关系。治理原则：数据最小化、公开来源、可解释、人工复核；城市智能体可辅助识别慢行断点、公共空间热力、设施维护与企业服务需求，但**不能替代规划审批、不能输出未授权个人画像、不能声称获得官方实施承诺** [depth:risk_missing_data]。

### 6.5 无障碍与包容性设计（回应公共利益与包容性）

方案将包容性作为公共空间与场景设计的硬约束，覆盖五类群体 [data:geometry/public_space.geojson#PUB-03-01]：

| 群体 | 空间响应 | AI 支持 | 隐私/边界 |
| --- | --- | --- | --- |
| 老年人 | 连续无障碍慢行环、休息节点、大字导视 | 语音导览、跌倒风险提示（区域级） | 不采集个体轨迹 |
| 儿童 | 近校安全路径、活动场地 |  crowding 预警（聚合） | 不识别人脸 |
| 残障人士 | 无障碍坡道、 tactile 引导、低位服务 | 导航与预约辅助 | 数据最小化 |
| 低数字素养人群 | 线下服务台、人工协助点、非数字化备选 | 人工复核兜底，不强制数字化 | 保留非数字通道 |
| 夜班/夜间工作者 | 夜间照明分级、夜间可达公共空间 | 夜间安全感知（区域级） | 匿名聚合 |

## 用地、建筑规模与拆改留方案

用地依据国土空间调查与用途管制分类表达，形成完整、闭合、无缝的用地分区 [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE]。建筑区分保留、改造、更新、新建或待确认，明确基底、功能、规模、风貌与高度控制建议层级 [depth:height_massing_character] [depth:retain_renovate_demolish]。

建筑规模与强度指标须与 `metrics.json` 和图层一致。若总建筑规模、容积率、建筑高度、建筑密度、绿地率、退线缺少官方条件，统一使用 `status=unknown` 并在 `assumptions.json` 说明待补条件与复算路径 [metric:building_footprint_area_sqm]。建筑基底面积 1,680,831.603 m²（占总体范围 0.147，设计建议，待正式控规确认），与绿地率 0.158、公共空间率 0.175 一并写入指标表 [metric:green_ratio] [metric:public_space_ratio]。

## 交通、轨道、市政与公共服务设施

交通回应公告对轨道站点一体化、道路微循环、慢行断点、对外交通、停车、非机动车停放与绿色交通的要求，重点覆盖北五环（`ROAD-GW`）、京张遗址公园跨环路节点、五道口、清华东路西口、大钟寺站（`ROAD-TC`）及重点企业周边 [data:geometry/roads.geojson#ROAD-GW] [data:geometry/roads.geojson#ROAD-TC]。道路与慢行图层保持在 `PROV-SITE-001` 内，与公共空间、绿地、产业节点相互校核 [depth:traffic_rail_slow_parking]。

![交通慢行与蓝绿公共空间复合系统图](assets/figures/mobility-bluegreen.png)

市政与公共服务设施覆盖 AI 产业服务、创新平台、人才生活、新型基础设施、分布式能源、端侧算力与传统市政融合；缺少管线、能源、排水、防洪、消防等工程资料时列为正式深化前置条件 [depth:municipal_new_infrastructure] [data:geometry/constraints.geojson#CONSTRAINT-RAIL]。

## 蓝绿空间、公共空间与城市风貌

### 9.1 蓝绿公共空间（agent.4）

以京张遗址公园活力带（`ROAD-SPINE` + `GRN-00-00`）为骨架，统筹清河、小月河、高校、企业、社区出行需求，提出南北贯通、东西连通的步道、骑行道与绿色空间体系，识别慢行断点、上跨环路节点与景观节点 [data:geometry/green_space.geojson#GRN-00-00] [data:geometry/public_space.geojson#PUB-03-01] [depth:blue_green_public_space]。

**AI 朝圣地标（不少于 3 个，回应 agent.4）**：
1. 清华园站铁路遗产地标（`CONSTRAINT-HERITAGE` 相邻）— 把京张铁路始发站遗产转为公共记忆节点；
2. 京张遗址公园慢行地标（ROAD-SPINE）— 线性遗产与 AI 公共空间的体验主轴；
3. 大钟寺国际路演客厅（PROV-KEY-003）— 智能原生消费与国际交往的展示窗口；
4. 众智园标准治理展厅（PROV-KEY-001）— AI 安全与标准治理的可参观节点。

**荣誉展示体系与公共空间组件库（agent.4）**：设立"贡献墙/荣誉节点"记录贡献者、方案与知识资产（呼应共创宪章 charter.9 "贡献可记忆"）；组件库包含导视柱、可解释屏、无障碍休息节点、低碳展示装置等可复制公共家具，均以清权或自绘素材表达 [source:AGENT-TASKBOOK]。

### 9.2 文化叙事与导视符号（agent.5）

百年京张文化、中关村创新文化与 AI 新文化构成三层叙事：以京张铁路历史文化资源（清华园站等 `CONSTRAINT-HERITAGE`）为根，以中关村创新文化为干，以 AI 新文化为叶 [source:AGENT-TASKBOOK]。空间文化系统沿"遗产—创新—智能"三段时间线组织；导视/标识/符号系统与一带整体 Logo 系统分离但风格统一，避免混淆（agent.5 禁止项）；国际传播叙事以"从铁路遗产到 AI 原生"为主线，提供英文主视觉与城市气质文案，强调可授权、可翻译。

## 更新项目清单、实施政策与分期计划

实施方案形成可审查的项目清单，明确位置、类型、责任主体、依赖、阶段、风险与评估指标 [depth:renewal_project_list] [depth:phasing_implementation]。下表将 JZ-01–JZ-06 绑定到明确的 GeoJSON `feature_id`，并标注实体类型、前置条件、分期、成本级别、审批依赖、风险与 KPI [data:geometry/phasing.geojson#PHASE-1]：

| 编号 | 项目名称 | 类型 | 绑定 feature_id | 实体类型 | 前置条件 | 分期 | 成本级别 | 审批依赖 | 主要风险 | KPI |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| JZ-01 | 京张遗址公园慢行断点缝合 | 公共空间/交通 | PUB-03-01, ROAD-SPINE | 公共空间+慢行廊道 | 道路红线、桥下空间复核 | PHASE-1 | 中 | 交通+园林 | 跨环节点工程不确定 | 断点闭合率 |
| JZ-02 | 众智园清河创新界面 | 蓝绿/产业展示 | GRN-00-00, PROV-KEY-001 | 绿地+界面 | 河道蓝线、防洪条件 | PHASE-1 | 中 | 水务+园林 | 蓝线约束 | 界面连通长度 |
| JZ-03 | 原点社区近校成果转化街 | 城市更新/产业服务 | PROV-KEY-002, BLD-00-01 | 街区+建筑 | 校区边界、权属、首层业态 | PHASE-2 | 中 | 规划+教育 | 权属不确定 | 落地项目数 |
| JZ-04 | 大钟寺站四象限步行连通 | 轨道一体化/慢行 | PROV-KEY-003, PUB-03-01 | 站点+公共空间 | 轨道站点、交叉口、市政管线 | PHASE-2 | 高 | 轨道+交通 | 管线迁改 | 步行连通指数 |
| JZ-05 | AI 公共服务与端侧算力节点 | 新基建/公共服务 | CONSTRAINT-RAIL, BLD-00-05 | 设施节点 | 能源、算力、安全、运营主体 | PHASE-2 | 中 | 发改+城管 | 运营主体未定 | 服务人次 |
| JZ-06 | 全球AI活动周公共路线 | 运营/品牌 | PHASE-1, ROAD-SPINE | 活动路线 | 公共空间许可、活动安全、版权清权 | PHASE-3 | 低 | 文旅+公安 | 活动安全 | 参与人次 |

分期与 100 天征集周期区分：征集周期是提交成果时间要求，实施分期是城市更新与项目建设的推进路径。近期试点（PHASE-1）以轻量设施、运营活动与服务台启动；中期（PHASE-2）等待正式控规、市政、交通与权属条件；长期（PHASE-3）转入治理与活动运营 [data:geometry/phasing.geojson#PHASE-2] [data:geometry/phasing.geojson#PHASE-3]。

### 全球 AI 创新活动体系与长期运营（回应 agent.6）

年度活动体系、活动品牌与传播视觉、开发者社区运营、AI 场景开放运营、公共体验与地标运营、国际传播与招引转化机制，均写为"概念建议/参考方案"，不得写成已确定政府安排 [source:AGENT-TASKBOOK]。

**年度活动体系（agent.6）**：
- 春季：全球 AI 创新活动周（路线 JZ-06，串联遗产—开源—产业—国际路演）；
- 夏季：开源黑客松与标准工作坊（原点社区/众智园）；
- 秋季：AI 场景开放日与公共体验（小月河场景赋能翼）；
- 冬季：年度治理与荣誉发布（贡献墙更新）。

**品牌/IP 系统**：以"京张智脉共生带"主视觉延展活动主 KV、徽章与荣誉体系；所有素材自绘或清权。
**开发者社区运营**：以开源发布厅（卡 01）与测试床（T1/T3）沉淀贡献者网络，提供持续协作入口。
**场景开放运营**：以卡 09/10 与活动周形成"场景可申请、可评测、可退出"的开放机制。
**转化路径**：人才（原点社区）→ 企业（大钟寺）→ 资本（中关村翼）→ 国际传播（活动周）的闭环转化，明确"不把招商/政策/资金写成确定承诺"。
**国际传播与招引**：以英文主视觉与城市气质文案提升全球辨识度，转化路径以公共知识沉淀（charter.8）为目标。

## 指标体系、面积复算与合规矩阵

指标体系包含总体设计范围面积、重点区域面积、绿地与公共空间比例、建筑基底、更新项目数量、AI 场景节点、慢行连通、产业空间、人才服务与自检状态。核心面积与建筑基底由 [metric:site_area_sqm] [metric:building_footprint_area_sqm] 复算；蓝绿与公共空间比例见 [metric:green_ratio] [metric:public_space_ratio]；重点片区数量见 [metric:key_area_count]。

![核心指标复算与证据链图](assets/figures/metrics-evidence.png)

指标分三类管理，避免把运营愿景误写为审定条件 [depth:metrics_recalculation]：
- **空间可复算类**（可由 `PROV-SITE-001` 派生）：边界面积、绿地率、公共空间率、建筑基底率、分期面积；
- **管控待确认类**（需官方控规/任务书附件）：容积率、建筑高度、建筑密度、退线、道路红线、设施标准（多数 `status=unknown`）；
- **绩效校准类**（需运营/产业数据持续校准）：AI 创新指数、人才密度、慢行可达性、活动参与度、场景使用频次。

合规矩阵 `compliance_matrix.json` 是任务响应性主控文件：每条公告任务与 agent.1–agent.6 必选任务均对应到报告章节、图层、指标、图纸、HTML、来源、假设与自检项，且本版已按任务逐项给出**差异化**证据（非通用模板）[standard:PROJECT-OFFICIAL-ANNOUNCEMENT]。

## 风险、版权与合规说明

**双语言要求**：主文件经 `proposal.en.md` 提供完整英文译文；A3/A0、HTML 与含文字图件均提供语言副本 [bilingual_contract_version: "1"]。所有图片、图纸、图标、数据与代码资产均在 `sources.json` 与 `report/copyright_statement.md` 逐项登记来源、许可与授权状态；HTML 不加载远程脚本、地图瓦片、字体、iframe、表单或外部 API [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]。

风险与缺资料清单由 `depth:risk_missing_data`、`geometry/constraints.geojson` 与场地包共同校核 [data:geometry/constraints.geojson#CONSTRAINT-HERITAGE] [data:geometry/constraints.geojson#CONSTRAINT-RAIL]。`missing_data_checklist.csv` 列出的 official boundary、key area、控规、道路、地块、建筑、市政、文保与公共服务缺口均进入 `assumptions.json`、自检与正文风险章节；任何缺官方条件的结论均降级为待确认事项 [assumption:A-CONTROLS-001]。

本方案不声称官方批准、审定控规、最终土地权属、最终建设规模或保证实施。AI agent 对事实、来源、版权、空间数据、指标与表达负责；维护者与专业评审可依据自检、空间复核与合规矩阵要求返修或拒绝。

## 参考资料

- brief/public-brief.md
- brief/site-package/design_brief.json
- brief/site-package/allowed_design_space.json
- brief/site-package/enums/
- brief/site-package/ranges/planning_limits.json
- brief/site-package/agent_taskbook.json
- brief/site-package/standards/standards.json
- data/processed/agent_fact_pack.md、project_scope_summary.csv、agent_task_requirements.csv、source_use_matrix.csv、missing_data_checklist.csv
- 完整机器索引：sources.json、metrics.json、compliance_matrix.json、standard_matrix.json、design_depth_matrix.json

上述资料包与机器可读索引均经 sources.json 注册，并标注使用边界、许可与授权状态 [source:SITE-PACKAGE] [source:OFFICIAL-ANNOUNCEMENT]。
