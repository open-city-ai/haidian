---
title: "AI 朝圣·铁轨新生带——京张可验证场景线"
author_github: "xyh202131"
language: "zh"
translation_file: "proposal.en.md"
proposal_format_version: "2"
bilingual_contract_version: "1"
license: "COMMUNITY-DISPLAY-ONLY"
summary: "把百年京张从承载AI应用的线性走廊升级为一条可共创、可验证、可暂停、可复现、可向社会交付的AI公共创新生产线。"
tracks:
  - ai-traffic-walkability
  - jingzhang-heritage-narrative
  - ai-origin-community
  - public-interest-ai-governance
scenarios:
  - ai-cultural-guide
  - accessibility-route-assistant
  - slow-mobility-crowding
  - robot-delivery-sandbox
  - enterprise-service-copilot
  - open-source-collaboration
  - public-space-energy
  - community-health-navigation
  - education-workshop
  - safety-human-review
---

# AI 朝圣·铁轨新生带

- 英文名称：Jing-Zhang AI Pilgrimage & Proof Line
- 核心系统：JZ-AIOS（Jing-Zhang Auditable Innovation Operating System，京张可验证场景操作系统）

## 设计依据与资料清单

本次二次规划先承认一个事实：现有方案虽然通过 8/8 基础评分和空间、视觉、专业自检，但“校验通过”只说明文件齐全、格式正确、引用存在，并不能证明方案已经形成独特的城市方法。V1 的“一脊三锚六门多点”仍接近常规廊道规划，三锚有定位而两翼缺席，十个 AI 场景只有一句话说明，三个公共空间节点不足以支撑连续公共生活，任务矩阵又大量重复同一组证据。V2 因此不再增加孤立应用，而把所有空间、产业、文化、场景与运营收束到“一条可审计的城市创新生产线” [depth:existing_conditions_diagnosis]。

| 当前不足 | 可核验证据 | V2 二次规划动作 |
|---|---|---|
| 三锚并列、三区两翼没有运行回路 | 正文有三处定位，但没有问题输入、验证、发布和反馈接力 | 建立“小月河问题输入—原点共创—众智验证—大钟寺发布—中关村转化—公众反馈”状态机 |
| 十个场景是功能清单，不是运行协议 | `scenario_count` 只由正文编号计数 | 建立 12 个机器可读场景节点；十个服务场景加两个公共审计节点都配置护照、风险、人工兜底、到期与回滚 |
| 六门只是口号 | 没有 Feature ID、位置、功能和验收口径 | 将六门落为 `PUBLIC-004`—`PUBLIC-009`，并绑定横向缝合路线、非 AI 通道、安静时段和暂停权 |
| 重点区空间表达过稀 | V1 只有少量随机体量，无法表现街坊—界面—场景关系 | 将体量原型集中深化到三处临时重点区，补充保留评估、适应性改造、新建候选三类属性 |
| 公共空间与用地口径冲突 | V1 `PUBLIC_SPACE` 仅三个节点，而 1403 用地是大范围功能包络 | 明确“用地功能包络”和“直接设计干预足迹”两种口径，扩展为九处可逆公共节点 |
| 指标偏几何 | 没有护照、人工兜底、非 AI 通道和安静无屏指标 | 指标扩展为空间、治理、公共价值、产业验证、文化可信、运营和韧性七类 |
| 运营只有组织与年报 | 缺少年度节律、准入门、成果转化和失败公开 | 建立问题季—开源季—城市 Beta 季—Proof Week 四季协议 |

### 2026 年 8 月 6 日之后的现实起点

公开报道显示，京张铁路遗址公园二期已于 2026 年 8 月 6 日开放，南段社区活力区和北段自然休闲区已形成约 9 公里的连续绿色廊道，并报告了社区连通、全龄活动、慢行与海绵设施等既有成果 [source:HAIDIAN-JZ-PHASE2-OPEN-2026]。这改变了方案的基本判断：JZ-AIOS 不再把“建成一条连续公园”当作自身成果，而只在既有公园之上提出可逆、低占用、可退出的公共服务与验证增量。下表是桌面研究形成的设计起点，不是现场踏勘、竣工图核验或法定红线确认；位置、运行状态和人群使用仍须逐项复核 [data:visual/assets/site-grounding-register.json#SG-001] [assumption:A-SITE-LOCATION-008]。

| 公开基线 | 本方案的设计增量 | 待现场核验 |
|---|---|---|
| 二期已开放；南段已报告服务周边社区并打开横向联系 | 六门降级为审计/服务界面类型，优先复用既有入口、人工服务和慢行节点，不预设新建地标 | 每门准确位置、无障碍连续性、高峰绕行、产权与运维边界 |
| 北段已报告形成鱼骨慢行联系、滨水与公园网络 | 只叠加可暂停的场景护照、离线导视和公共复测接口，不重复建设基础绿道 | 步行、骑行、跑步冲突，夜间照明，雨洪与铁路安全条件 |
| 全龄活动、遗产再利用和海绵设施已被公开报道 | AI 必须证明对既有日常生活的净增益，不以设备数量、屏幕或活动流量替代公共价值 | 开园后 30 日使用观察、不同人群任务成功、噪声、投诉与维护负担 |

#### 已建公园增量协议 / Built-Park Delta Protocol（INNOV-006）

任何 G1/G2 试点须先完成“非 AI 现状基线—AI 增量假设—最小占地与时段—停止与恢复—独立复测”的同页记录。AI 必须证明相对人工、纸质、实体导视或既有服务的增量价值；不得造成无障碍公共空间或静音时段的净损失。若不能证明增量、恢复后不能回到不低于基线的状态，或独立复测失败，试点退回 G0 或退出。当前开园后 30 日现场审计完成数为 0，协议完整只代表设计字段覆盖，不代表现场有效 [data:visual/assets/innovation-register.json#INNOV-006] [assumption:A-POST-OPENING-007] [metric:completed_post_opening_field_audit_count]。

#### G1 预注册：先写失败条件，再申请现场

`visual/assets/g1-preregistration-register.json` 将 12 个现有场景逐一转成“可执行但尚未执行”的首测合同：测试前必须锁定非 AI 对照任务、唯一主指标及分母、受影响人群、采样框、时间窗、禁止伤害条件、停止与恢复、独立复测输入和版本。12/12 只表示必填字段已覆盖；已完成预注册、获批 G1 窗口、现场执行和已知结果仍全部为 **0**，因此任何场景都不能据此从 G0 升级 [data:visual/assets/g1-preregistration-register.json#G1-PREREG-001] [metric:g1_preregistration_required_field_coverage_ratio] [metric:completed_g1_preregistration_count]。

| 首批最小测试包 | 同任务非 AI 对照 | 唯一主指标 | 不得协商的停止条件 | 当前状态 |
|---|---|---|---|---|
| T-03 / SCENE-009 无障碍路径 | 同起终点的人工服务、纸质或实体导视 | 各共同测试人群的任务成功数 / 已同意任务数 | 出现关键障碍、过期路径状态或非 AI 路径不可用即停止并恢复 | 阈值待现场预注册；未执行 |
| T-02 / SCENE-011 企业服务 | 同一冻结问题集的人工窗口或可追溯静态指南 | 有来源且边界正确的回答数 / 冻结问题数 | 输出无来源结论、泄露禁采数据或人工接管不可用即停止 | 阈值待责任与专业复核；未执行 |
| T-01 / SCENE-001 低速配送 | 相同任务的人工配送或静态路线 | 无碰撞、无越界且可急停的任务数 / 获批受控任务数 | 任一碰撞、越界、实体急停失败或接管链断裂即停止 | 安全红线固定；效率阈值待预注册；未执行 |

![G1 首测：预注册、停止、恢复与独立复测](assets/figures/implementation-roadmap.png)

### 创新不是口号：可证伪登记表

V2 进一步补上一个仍然存在的缺口：方案已经提出验证线、四门制、可逆公共空间和失败公开，但“看起来新”仍不能证明“创新成立”。`visual/assets/innovation-register.json` 把六项核心创新逐一绑定到基线不足、新颖性主张、可证伪假设、最小证据、通过标准、失败信号和退出动作，其中 INNOV-006 专门检验方案对已开放公园是否产生可证明、可恢复的净增量；缺少失败信号或退出动作的主张不得登记为正式创新，尚未发生的运营结果继续保持 `unknown` [data:visual/assets/innovation-register.json#INNOV-001] [data:visual/assets/innovation-register.json#INNOV-006]。这使评审者不仅能问“新在哪里”，还可以直接判断“什么证据会证明它没有成立”。

依据分为四级，各级只承担与其权威程度相称的作用：

- 第一级是征集公告、智能体任务书和项目场地包，用于确认任务与提交边界 [source:OFFICIAL-ANNOUNCEMENT] [source:AGENT-TASKBOOK] [source:SITE-PACKAGE]。
- 第二级是仓库资料登记、标准索引和处理导航，用于定位证据及其用途限制 [source:SOURCE-REGISTRY] [source:PROCESSED-FACT-PACK]。
- 第三级是北京市关于原点社区、百年京张实景测试和“一核多点”创新街区的公开背景，只用于判断协同方向，不代表项目已批准或任何机构承诺参与 [source:BEIJING-AI-ORIGIN-2026] [source:BEIJING-AI-DISTRICTS-2026]。
- 第四级是国家数据、AI 内容标识和“人工智能+”政策，与六个全球案例一起用于机制启发和治理边界 [source:NATIONAL-DATA-INFRA-2025] [source:AI-CONTENT-LABEL-2025] [source:AI-PLUS-2025]。

### 证据不是一次性快照：失效必须向下游传播

`sources.json` 已记录 29 条来源及访问日期，但同一天访问不等于内容永久有效，也不能发现修订、替代、失联或临时边界被正式资料取代。新增 `visual/assets/evidence-freshness-policy.json`，把来源分成项目资料、临时空间数据、城市背景、政策标准和案例参考五类，规定复核触发点、建议最长未核时间、责任角色和失效动作；来源变为 `review_due`、`superseded` 或 `unavailable` 时，受影响主张、矩阵项和场景门级必须同步降级或冻结。当前只确认已有访问日期，尚未形成带内容摘要的刷新审计，因此完成刷新审计数保持为 0，临时空间数据无论多新也仍然只是 `provisional_only` [data:visual/assets/evidence-freshness-policy.json#FRESH-01] [data:visual/assets/evidence-freshness-policy.json#FRESH-02]。

专业响应按问题拆分，而不是把标准编号堆在一个结论后：

- 项目任务与智能体任务由征集公告和任务书约束 [standard:PROJECT-OFFICIAL-ANNOUNCEMENT] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]。
- 城市设计范围与控规程序边界分别由两项住建领域材料约束 [standard:MOHURD-URBAN-DESIGN-MEASURES] [standard:MOHURD-CONTROL-DETAILED-PLANNING]。
- 用地术语和建筑设计深度缺口分别登记，不把缺口记录冒充已核条文 [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE] [standard:MOHURD-ARCH-DESIGN-DEPTH-2016]。

当前精确红线、现状建筑、权属、控规指标、市政、交通工程与文保控制仍未取得。`geometry/site_boundary.geojson` 和三处重点区继续使用仓库临时替代范围，只能支撑概念复核 [data:geometry/site_boundary.geojson#SITE-001] [source:BOUNDARY-SOURCE] [source:KEY-AREA-SOURCE]。它们不得用于审批、征地、精确面积或工程实施，边界与控制条件假设保持显式 [assumption:A-BOUNDARY-001] [assumption:A-CONTROLS-001]。

## 三层范围工作框架

三层范围采用不同问题、不同精度、同一证据链。约 43.6 平方公里统筹研究范围回答产业、科研、城市问题和外部创新节点怎样协同；约 11.4 平方公里总体设计范围回答百年京张怎样组织公共空间、慢行、功能与场景；三处临时重点区回答“共创—验证—发布”三种状态站怎样形成街坊、建筑、公共界面和运行门。面积只表达任务层级，不能反推法定边界 [metric:site_area_sqm] [metric:key_area_total_sqm] [depth:three_level_scope_framework]。

### 唯一核心机制

百年京张不是一条摆放 AI 产品的科技走廊，而是一条把城市问题转化为**可共创、可验证、可暂停、可复现、可向社会交付**的 AI 公共创新生产线。“AI 朝圣”不是对技术的崇拜，而是公众沿线完成“认知历史—提出问题—参与共测—看见失败—贡献留名”的知识旅程。英文名称中的 **Proof** 同时指空间实证、技术验证和公共价值证明。

总体结构从“一脊三锚六门多点”升级为“一条验证线、三座状态站、两条供给翼、六个城市接口”。三座状态站不是三种同质园区：北京 AI 原点社区负责共创和公共评议，众智园负责技术、安全与治理验证，大钟寺负责公共发布、城市服务和成果转化；小月河场景赋能翼输入真实问题与体验反馈，中关村科技服务翼提供建议性的知识产权、合规、人才、资本和转化支撑。任何外部机构角色都是规划建议，不代表合作已经达成 [assumption:A-EXTERNAL-COLLAB-005] [depth:overall_spatial_structure]。

六门按南北概念顺序定义为：G1 大钟寺传播门、G2 城市服务门、G3 小月河体验门、G4 高校共创门、G5 众智验证门、G6 清河生态校准门；对应 `geometry/public_space.geojson` 的 `PUBLIC-004`—`PUBLIC-009`。它们是待现场复核的审计/服务界面类型，不是已选址的新建地标；每类界面要求同时核对公共空间、横向慢行、海绵缝合、非 AI 通道、静音时段和场景接力，并优先复用已建入口与服务设施 [data:geometry/public_space.geojson#PUBLIC-004] [data:visual/assets/site-grounding-register.json#SG-003] [metric:gateway_count]。

Logo 方向采用两条不闭合轨线构成字母 **JZ**，中间的开放缺口形成“人工可介入的校验门”，六个短刻度对应六门。Logo 只使用几何线段和项目自有字标，不调用企业商标、人物肖像或受限字体。整体视觉为铁轨银、海淀蓝、开源绿、校验橙、钟声金；文化导视另用“里程—年份—来源”三行语法，避免把文化标识与整体 Logo 混为一套。

![总体概念与证据边界](assets/figures/site-overview.png)

## 统筹研究范围产业与未来城市研究

### 三锚两翼产业状态机

产业不是按企业名单划地，而按任务状态配置空间和要素。小月河翼汇集居民、城市服务者和公共部门愿意公开的问题；原点社区把问题转为开源任务、用户旅程和对照基线；众智园在离线、影子和限域环境中完成模型、机器人、安全、伦理与互操作验证；大钟寺把通过的成果转成公众可理解的城市服务、企业服务和国际交流；中关村科技服务翼在每一环提供建议性的合规、知识产权、人才、算力和转化支持；投诉、事故、失败和公共价值结果回流下一年度。北京市公开资料提出以原点社区、北纬社区和百年京张开放城市治理与民生服务实景测试场景，为“验证带”而非普通展示带提供了现实接口，但本方案不把公开方向写成项目授权 [source:BEIJING-AI-ORIGIN-2026]。

八类要素采用“公共底座 + 有条件接入”：土地只提供可逆使用接口；空间提供共享实验室、公共客厅和限域测试面；产业由问题牵引而非供应商牵引；资金只提出多方评审和里程碑拨付机制，不编造额度；人才通过开发者、居民和专业人员共同测试；算力优先使用可审计的共享环境；数据遵循最小必要、源端保留和受控计算；场景必须持有护照并到期失效。国家数据基础设施指引对可信数据空间的共识规则、可信管控和可审计生命周期提供政策背景，但不等于本项目的数据系统已经获批 [source:NATIONAL-DATA-INFRA-2025]。

### 六个案例的“机制—本地动作—验证—禁区”

| 案例 | 可迁移机制 | 京张本地动作 | 建议验证 | 不可直接迁移 |
|---|---|---|---|---|
| Kendall Square | 科研、企业、住房和公共空间共同组织 | 原点社区的共创街与生活服务并置 | 跨机构共创和居民使用是否同时发生 | 土地制度、租金与企业密度 [source:CASE-KENDALL] |
| one-north | 分主题片区由共享设施和步行网络连接 | 三座状态站共用护照和复测包 | 跨站接力是否保留同一证据版本 | 开发制度和园区管理权 [source:CASE-ONE-NORTH] |
| Barcelona 22@ | 产业升级与街区更新、知识转移并行 | 六门优先修补日常公共界面 | 公共利益交付是否先于规模扩展 | 用地政策和财政工具 [source:CASE-22AT] |
| King’s Cross | 遗产再利用、无车公共空间与混合功能 | 铁路工程史与当代公共生活同线呈现 | 居民是否在非活动日持续使用 | 产权、保护等级和商业模型 [source:CASE-KINGS-CROSS] |
| STATION F | 实体空间依靠项目、导师和伙伴网络运营 | 四季运营协议与问题到 Proof 的漏斗 | 问题到限域原型的周期 | 单一大型园区和私人运营条件 [source:CASE-STATION-F] |
| MaRS | 实验室、办公、活动和社群服务耦合 | 大钟寺把发布、合规咨询和人工服务并置 | 人工转接和后续服务成功率 | 医疗、投资与机构体系 [source:CASE-MARS] |

区域协同采用“测试接力”而非泛泛结盟。建议由未来科学城承接基础科学或前沿装备复测、怀柔科学城承接科学设施相关验证、经开区承接制造和具身系统工程复测、其他首批创新街区承接其擅长的文化或产业场景，京津冀节点承接跨区域可复制性检查；每次接力只传递任务、协议、匿名结果和失败记录，不要求传递原始敏感数据。公开的“一核多点”格局只说明这种分工有讨论基础，不代表任何节点已同意参与 [source:BEIJING-AI-DISTRICTS-2026]。

## 总体设计范围城市更新与控规深度城市设计

总体范围以已开放公园的南北绿廊、已报告横向联系和全龄公共活动为公开基线，而非待本方案从零建设的对象 [source:HAIDIAN-JZ-PHASE2-OPEN-2026]。在此之上才组织“轨旁历史阅读层—既有慢行与蓝绿层—可逆创新服务层”三层剖面：铁路侧只建议低干预阅读，中部先保护日常步行、骑行和停留，街区侧以六类界面审计断点并叠加小尺度服务。任何跨铁路、跨河、跨城市道路、桥隧或地下空间动作都只是待核问题和设计方向，必须另行开展现场、交通、防洪、铁路安全和工程论证。

用地从 12 个大色块深化为 36 个不规则、拓扑闭合的概念单元，覆盖科研、教育、居住、社区服务、商业服务、文化、绿地、广场和弹性留白九类项目枚举。单元数量和类别可由 GeoJSON 复算 [metric:land_use_unit_count] [metric:land_use_category_count]；它们表达空间—产业功能包络，不是法定地块或已批用途 [data:geometry/land_use.geojson#LU-001] [depth:land_use_layout]。

六条横向门线与南北主线形成“鱼骨式”可达网络：每一门都将慢行、公共空间、雨洪缝合与一个可测试的城市问题绑定。九处公共空间不是把公园变成全天候试验场，而采用可逆时空规则：日常生活为默认，公共学习按预约，限域 Beta 仅在批准时段，22:00—07:00 进入静音，任何人始终可以选择非 AI 通道。设计的创新不在“城市适应 AI”，而在“AI 必须适应城市日常生活”。

建筑图层用体量原型表达优先干预容量，不模拟完整现状城市。每个原型标注保留评估、适应性改造候选或新建候选，但在测绘、权属、结构、文保和控规证据缺失时不得转成拆除或建设结论。容积率、总建筑面积、建筑高度、道路红线、停车和市政容量继续保持 `unknown` [assumption:A-SPATIAL-REPRESENTATION-002] [depth:development_intensity_controls] [depth:height_massing_character]。

![用地结构与空间传导](assets/figures/land-use-structure.png)

## 重点区域详细设计

三处重点区使用同一套回答框架：场地矛盾、空间结构、核心项目、AI 场景、进入门与验收，并按重点区详细设计深度组织表达 [depth:three_key_area_detailed_design]。下述范围仍为临时替代，三处面积和体量覆盖只用于概念复核 [data:geometry/key_areas.geojson#PROV-KEY-001] [data:geometry/key_areas.geojson#PROV-KEY-002] [data:geometry/key_areas.geojson#PROV-KEY-003]。

### 众智园：验证站 / VERIFY

矛盾是自主技术需要真实问题和复合测试，但城市公共空间不能成为无边界试验场。结合海淀最新公开目标，众智园把 AI4S、AI 安全治理和规则互认作为建议验证主题，不据此宣称已有平台、伙伴或国际机制 [source:HAIDIAN-JZ-MIDTERM-2026]。空间采用“一园、一栈、两界面”：清河测试花园承载环境和低风险共测，可验证模型公共栈承载离线基准、安全与互操作检查，面向社区设置公众观察与申诉界面，后勤侧设置人工接管和设备维护。`AI-ZONE-001` 绑定低速配送、能耗、安全研判与失败档案四个节点 [data:geometry/constraints.geojson#AI-ZONE-001] [data:geometry/constraints.geojson#SCENE-001]。进入条件是来源、责任人、风险级、对照基线和实体急停齐全；任何碰撞、越界、未经授权数据处理或人工接管失效立即停止。验收不以“演示成功”计，而以复测包完整、失败可复现、人工接管可用和公共价值门通过计。

### 北京 AI 原点社区：共创站 / CO-CREATE

矛盾是高密度创新资源与居民日常、低成本创业和公共参与之间缺少稳定接口。公开材料把原点社区描述为约 3 平方公里范围、具有“十分钟创新圈”背景的科技社区；其中规模数字只作背景，不作本项目资源盘点、选址或合作证明 [source:HAIDIAN-AI-TRIAL-FIELD-2026]。空间采用“一街、两院、四节点”，并把五分钟日常生活支持单元嵌入十分钟创新背景和更广域的十五分钟公共服务规划框架：开源发布街连接高校与社区，共创院落承载问题拆解和团队匹配，公共评议院落承载居民共测、未成年人教育和无屏讨论。`AI-ZONE-002` 绑定可信文化导览、开源匹配、教育工坊和气候无障碍共测 [data:geometry/constraints.geojson#AI-ZONE-002] [data:geometry/constraints.geojson#SCENE-005]。进入条件是问题来自明确公共需求、参与者可撤回、推荐不用于录用评价；验收关注跨角色共创、撤回响应、非技术参与和不同人群任务成功差距。

### 大钟寺：发布站 / PUBLISH

矛盾是站城流量、企业服务和消费展示容易把 AI 变成屏幕化营销，并挤压人工服务与安静空间。这里先承认已开放南段的社区、通勤与全龄活动基线，不把既有连通改善重复包装为本方案成果 [source:HAIDIAN-JZ-PHASE2-OPEN-2026]。空间采用“四象限步行 + 一厅一台”：四象限只表达待现场复核的连接方向；钟轨会客厅呈现通过、失败和修正的证据；城市服务台并置智能导航与人工窗口；发布界面设置无屏默认区和静音时段。海淀“十五五”公开文本提出到 2030 年成为全球人工智能创新策源地和产业高地，并要求高质量推进城市更新；这里仅把它作为区级方向，不由此推断大钟寺任何具体地块已纳入更新、权利已确定或实施已承诺 [source:HAIDIAN-15FYP-2026]。`AI-ZONE-003` 绑定无障碍路径、慢行提示、企业服务和健康导航 [data:geometry/constraints.geojson#AI-ZONE-003] [data:geometry/constraints.geojson#SCENE-009]。验收关注来源命中、过期提示、人工转接、投诉闭环和相对既有服务的增量，而不是活动人流或曝光量。

三个朝圣地标被重新定义为同一知识旅程的三个章节：众智园“开源火种塔”记录可复验贡献，不展示个人排名；原点社区“算法里程碑”把京张工程史、中关村创新史与 AI 纠错史并排；大钟寺“钟轨会客厅”设置失败与修正档案。贡献者可选择实名、化名或匿名，荣誉只记录可验证的公共贡献，不与财富、流量、招聘或行政评价绑定。名称和形象均需完成版权、商标、肖像、史料和无障碍审查 [assumption:A-CULTURE-CONTENT-006]。

![三处状态站的空间深化](assets/figures/key-areas.png)

## AI 创新生态、人才画像与 AI+ 场景

### 七类共测画像

海淀最新公开要求聚焦顶尖科研人才、青年创新创业者和常住居民三类主要人群；本方案不另造一套画像，而将其映射到既有七类：顶尖科研人才主要对应开源开发者与高校师生，青年创新创业者对应创业团队并与企业服务团队相接，常住居民对应周边居民、老年人与行动不便者，同时保留游客与国际来访者作为传播和可读性校验者。三类政策人群是需求优先级，七类画像是共同测试与风险分解工具，两者都不代表已取得样本或完成调研 [source:HAIDIAN-JZ-MIDTERM-2026] [data:visual/assets/site-grounding-register.json#SG-006]。

| 画像 | 核心需要 | 可能受损 | 硬保护 |
|---|---|---|---|
| 开源开发者 | 算力、协议、复测和协作者 | 贡献被平台占有 | 可撤回、许可证清楚、贡献可携带 |
| 创业团队 | 低成本验证、合规和转化 | 被演示指标误导 | 失败公开、禁止暗示政府背书 |
| 企业服务团队 | 来源清楚的办事与市场信息 | 过期内容造成损失 | 来源时间、人工转接、责任边界 |
| 高校师生 | 学习、研究和成果转化 | 教育数据外泄 | 本地沙盒、教师复核、未成年人最小数据 |
| 周边居民 | 安静、可达、日常服务 | 噪声、拥挤、监控与排斥 | 日常优先、静音无屏、申诉与暂停权 |
| 老年人与行动不便者 | 连续无障碍和人工帮助 | 被数字门槛排除 | 非 AI 通道、共同测试、人工服务不撤销 |
| 游客与国际来访者 | 可信多语言文化内容 | 错误叙事和过度采集 | 来源标识、策展复核、无账户浏览 |

### 非 AI 选项必须能完成同一基本任务

现有指标能证明九处公共节点写入了非 AI 通道、十二个场景写入了人工兜底，却不能证明这些替代路径真的可用。新增 `visual/assets/non-ai-parity-contract.json`，要求任何申请进入 G2/G3 的公共服务同时比较开放时段、基本结果、费用、权利与申诉、安全与无障碍、完成时间六个维度；非 AI 使用者不得因不用账户、智能手机或算法而获得较低资格、较高费用或较弱复核权。当前没有现场共测结果，四条测试旅程全部保持 `unknown`，完成时间容许差也必须在取得基线后预注册，而不是在方案中虚构 [data:visual/assets/non-ai-parity-contract.json#PARITY-001] [data:visual/assets/non-ai-parity-contract.json#PARITY-004]。

### 四门制与场景护照

JZ-AIOS 规定任何场景依次经过 G0 概念/离线、G1 影子比对、G2 限时限域 Beta、G3 经批准的公共运行；不得跨级。当前提交中的全部节点均为 **G0 概念状态**，没有任何场景正在运行或已获批准。每张护照必须包括版本、责任角色、风险级、数据最小集、地理与时段边界、可能受损人群、人工接管、申诉、非 AI 选项、进入条件、停止条件、复测包和到期日期 [assumption:A-SCENARIO-PROTOCOL-004]。

十张服务场景卡如下；空间 Feature 只是概念落位，不代表部署：

| ID / 节点 | 场景与空间 | 最小输入 → 输出 | 责任与人工兜底 | 进入 / 停止 / 退役 |
|---|---|---|---|---|
| SC-01 / `SCENE-005` | 京张可信文化导览；原点—里程标路径 | 清权史料、主动语言选择 → 带来源内容 | 人工策展人；无账户纸质/音频替代 | 来源与 AI 标识完整；争议无法核实即下架；年度复审 |
| SC-02 / `SCENE-009` | 无障碍路径助手；大钟寺与六门 | 坡度、临时障碍、设施状态 → 建议路径 | 现场服务人员确认；实体导视保留 | 路测和共测通过；出现关键障碍即停推该路线；数据变化即失效 |
| SC-03 / `SCENE-010` | 慢行拥堵提示；公共绿道 | 分段匿名流量 → 绕行建议 | 管理人员发布，不自动管制 | 不使用人脸；误报影响通行即回退静态导视；活动结束失效 |
| SC-04 / `SCENE-001` | 低速配送沙盒；众智园授权面 | 车辆状态、围栏、障碍 → 低速任务 | 现场安全员、实体急停、人工牵引 | 离线和封闭场通过后才可申请 G2；碰撞/越界一次即停止；每次测试后退役配置 |
| SC-05 / `SCENE-011` | 企业服务智能体；大钟寺服务台 | 公开政策与用户主动问题 → 来源化导航 | 工作人员受理正式事项 | 来源与更新时间完整；错误影响办事即停；政策更新触发失效 |
| SC-06 / `SCENE-006` | 开源协作匹配；原点共创院 | 自愿公开技能与议题 → 团队建议 | 社区运营者处理撤回；不进入招聘评价 | 可撤回与许可证确认；歧视性匹配即停；项目结束清理 |
| SC-07 / `SCENE-002` | 公共空间能耗助手；众智园与六门 | 设备和环境数据 → 照明建议 | 运维人员保留优先权；人工开关可用 | 不采身份；影响安全照明即回退；季节参数到期重测 |
| SC-08 / `SCENE-012` | 社区健康导航；大钟寺人工服务旁 | 公开机构和主动咨询 → 科普与预约入口 | 不诊断；紧急情况转专业机构 | 边界提示清楚；出现诊断性输出即停；机构信息变化即失效 |
| SC-09 / `SCENE-007` | 教育体验工坊；原点社区 | 本地教学数据 → 偏差与编程练习 | 教师全程复核；未成年人数据不外传 | 家长/学校规则与本地沙盒齐全；数据外发即停；课程结束销毁临时数据 |
| SC-10 / `SCENE-003` | 安全事件辅助研判；众智园控制室 | 设备告警和人工报告 → 待核事件摘要 | 授权人员决定；不得自动执法 | 权限、日志、对照基线齐全；越权或误导处置即停；模型变更重审 |

另设两个公共治理节点：`SCENE-004`“失败与修正公开档案”记录暂停、纠错和主动退役；`SCENE-008`“气候与无障碍共同测试”让老年人、儿童和行动不便者在早期成为共同测试者，而非完工后的被动验收对象。节点和服务区数量可由机器数据核验 [metric:mapped_scenario_node_count] [metric:ai_service_zone_count]。护照与人工兜底的字段覆盖另行计数，不能被解释为现场效果 [metric:scenario_passport_coverage_ratio] [metric:manual_fallback_coverage_ratio]。

### 三项先行产业测试协议

- T-01 机器人安全毕业协议：G0 数字与封闭场基线 → G1 影子任务 → 申请 G2。建议硬门为实体急停在受控测试中全部成功、零碰撞、零越界、人工接管链完整；任何一次安全红线触发停止、复盘和重新从低门开始。数值是设计验收建议，不是已测结果。
- T-02 来源化企业服务协议：建立固定问题集和过期信息对照，检查回答来源、更新时间、拒答和人工转接。建议只有来源覆盖、过期提示和人工转接均达到预先公布阈值才进入限域服务；错误影响正式办事即暂停。
- T-03 全民可达路径协议：由轮椅使用者、视障者、老年人、儿童照护者和普通步行者共同完成同一任务。任何关键断点未提供非 AI 替代路径即不毕业；运行后继续比较群体间任务成功差距并公开改进。

毕业采用“技术成熟度 × 公共价值成熟度 × 治理成熟度”三维立方体，任一维不合格都只能修正或退役。国家“人工智能+”文件强调开放共享、安全可控和全民共享成果，本方案把这些方向转成公共价值门，但不替代具体法律、审批与专业责任 [source:AI-PLUS-2025] [depth:municipal_new_infrastructure]。

![JZ-AIOS 四门制与场景护照](assets/figures/innovation-system.png)

## 用地、建筑规模与拆改留方案

用地分类使用项目允许的 0701、0702、0802、0803、0804、05、1401、1403 和 16，36 个单元完整覆盖临时总体范围，不用调色图冒充法定用地。1403 表示适宜承担公共活动的功能包络；`PUBLIC_SPACE` 只记录九处已经直接设计的公共节点，因此两者面积不会相等，待正式地块与公共空间资料到位后再统一口径 [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE] [assumption:A-PUBLIC-SPACE-SCOPE-003]。

建筑层由概念体量原型组成，数量、基底面积和总体表示比例可复算 [metric:building_count] [metric:building_footprint_area_sqm] [metric:building_representation_ratio]。重点区内原型数量和基底覆盖用于判断图纸是否真正深化三处状态站，不代表现状密度或法定建筑密度 [metric:key_area_building_count] [metric:key_area_building_footprint_ratio]。原型分为三类：`retain_for_assessment` 表示进入历史、结构和使用价值调查；`adaptive_reuse_candidate` 表示优先比较适应性改造；`new_build_candidate` 表示只在控规、权属、消防、日照、交通和市政均确认后才可能深化。当前没有“拆除”分类，因为没有足够证据作出该判断 [data:geometry/buildings.geojson#BLDG-001] [depth:retain_renovate_demolish]。

建筑形态原则服务于公共界面而非追求科技造型：轨旁降低首层压迫并增加通透界面；研发组团围绕共享庭院；原点社区优先小尺度、混合使用与生活服务；大钟寺确保人工服务、后勤和公众界面分开；历史和居住界面避免突兀体量。建筑高度、容积率、总建面、层数和建设规模均保持未知，A3/A0 中的体量只用于空间关系解释，不可用于投资估算或审批。

## 交通、轨道、市政与公共服务设施

交通证据分两层。现状道路、铁路和水系来自 OpenStreetMap，只用于方向识别并保留 ODbL 署名，不能建立道路红线、铁路保护区或水系蓝线 [source:OSM-CONTEXT] [assumption:A-OSM-001]。设计中心线是概念慢行、横向缝合、接驳和服务翼建议，可复算路线数量与长度 [metric:design_road_count] [metric:design_road_length_m]。路线图层和专业表达深度分别提供机器证据与人工复核入口 [data:geometry/roads.geojson#ROAD-001] [depth:traffic_rail_slow_parking]。

六门采用同一接口协议：先记录现状断点与绕行，再提出步行和无障碍最低连续线，再叠加骑行与公交接驳，最后才讨论跨路、跨河或轨道工程。每门必须配置日常非 AI 通道、清晰人工联系人、静音与无测试时段；机器人和测试车辆不得占用通勤、夜间安静或高峰公共通行。概念图上的道路宽度、转弯、桥梁、地下连接和站点接驳不能替代勘察与专项设计。

市政与新基建采用“边缘、最小、可替换、可降级”。三处服务区只记录功能，不声明设备容量：L0 正常状态提供经批准的数字服务，L1 降级状态关闭个性化与自动控制，L2 离线状态保留实体导视、人工服务、照明与急停。可信数据空间只交换任务、权限、匿名结果和审计证据，敏感原始数据尽可能留在源端；任何算力、能源、网络、消防、防洪和管线容量必须在正式工程资料取得后确认。

公共服务采用“外层十五分钟规划框架 + 内层五分钟支持单元”的嵌套逻辑：十五分钟层建议连接人才咨询、托育、健康、法律、会议、无障碍和社区活动；五分钟层规定共创或测试期间必须可步行到达人工求助、休息、卫生间、基础补给和无屏信息。五分钟要求来自海淀公开目标，但没有真实人口、设施容量、步行网络和服务半径数据时不声称“已经覆盖” [source:HAIDIAN-JZ-MIDTERM-2026]。所有智能服务必须与人工窗口、电话、纸质或实体导视并存；非 AI 通道覆盖由公共空间属性复算 [metric:non_ai_access_coverage_ratio]。

![六门、慢行、蓝绿与场景节点](assets/figures/mobility-bluegreen.png)

## 蓝绿空间、公共空间与城市风貌

蓝绿系统不再声称从零建设主绿脊。公开报道的约 9 公里绿色廊道、南北分段、鱼骨慢行和海绵设施作为待现场核验的既有基线；本方案的增量仅是六类横向界面的连续性审计、三处状态站的低风险学习接口，以及在不损害日常游憩前提下的可逆组件 [source:HAIDIAN-JZ-PHASE2-OPEN-2026] [data:visual/assets/site-grounding-register.json#SG-004]。绿地面积与数量仍由提交包设计几何复算 [metric:green_space_area_sqm] [metric:green_space_count]，不能用来声称竣工现状；比例使用临时边界作分母，置信度必须继承为低 [metric:green_ratio] [depth:blue_green_public_space]。

九处公共空间由三个朝圣地标客厅和六门组成，形成线—面—点网络。每处默认日常生活模式，只有在公示、授权、限时和可回滚条件齐全时才进入公共学习或限域 Beta；22:00—07:00 静音，默认设置无屏区，禁止把“高亮大屏、持续播报和密集摄像头”当成科技感。公共节点数量与面积可复算 [metric:public_space_node_count] [metric:public_space_area_sqm]。比例仍是低置信概念值，无屏默认与空间图层分别保留独立核验入口 [metric:public_space_ratio] [metric:screen_free_public_node_ratio] [data:geometry/public_space.geojson#PUBLIC-001]。

公共空间组件库包含六类可替换组件：双语/触觉里程标、离线地图与人工呼叫点、可关闭低位导光、移动共测桌、雨水花园与遮阴座椅、带实体急停的限域测试边界。每一组件都必须做到不依赖账户也能使用、失电后保留基本功能、维护责任可识别；桥隧、设备基础和管线条件另行论证。

文化采用“可信叙事双螺旋”。物理线讲铁路工程—城市生长—中关村创新，学习线讲提出问题—模型失败—人工修正—公共验证。北京市公开资料表明京张铁路遗址公园一期通过铁路遗存、绿色公共空间与功能织补连接高校、科研和居民生活；既有项目的公众参与与责任规划师机制也说明文化空间需要持续专业把关 [source:JZ-PARK-2023] [source:JZ-COCREATION-2021]。V2 不复制既有景观，而把“来源、纠错和失败”变成新的文化内容。

所有 AI 生成文字、图像、音频、视频或虚拟场景都同时设置公众可感知的显式标识和适用时的文件元数据标识；争议内容进入人工策展复核，无法核实则下架。该规则与 2025 年生成合成内容标识制度方向一致，但正式运营仍须法律审查 [source:AI-CONTENT-LABEL-2025]。国际传播语为 **“Build in public. Test with people. Keep the evidence.”**，强调公开建构、共同测试与证据留存，而不是宣称全球领先或已经落地。

## 更新项目清单、实施政策与分期计划

本节把阶段、试点、参与主体和可衡量指标放在同一实施框架中：每个项目先写前置条件，再写责任组合和验收指标；任何阶段都必须根据监测、居民反馈和专业评估决定继续、修正或退出。

八个项目形成空间、协议和运营一一对应的更新包 [depth:renewal_project_list]：

| 项目 | 主要内容与 Feature | 前置条件 | 建议责任组合 | 概念验收 |
|---|---|---|---|---|
| JZ-01 六门无障碍缝合 | `PUBLIC-004`—`009` 与横向门线 | 现状测绘、交通与无障碍审查 | 公共部门 + 交通/景观专业 + 社区 | 六门均有非 AI 连续线、断点台账和回滚方案 |
| JZ-02 可逆时空公园 | 九处公共空间、主绿脊和海绵缝合 | 绿地、水务、铁路与运维条件 | 景观/生态专业 + 社区运营 | 日常、学习、Beta、静音、离线模式可切换 |
| JZ-03 众智验证公共栈 | `AI-ZONE-001` 与四节点 | 安全、网络、消防和责任主体 | 技术测试 + 安全/伦理 + 现场运营 | 可复测、可急停、失败可公开 |
| JZ-04 原点开源共创街 | `AI-ZONE-002` 与四节点 | 社区共创、教育和版权规则 | 高校/开发者 + 社区 + 策展 | 撤回、许可、非技术参与和共同测试可核验 |
| JZ-05 大钟寺城市服务门户 | `AI-ZONE-003` 与人工服务台 | 站城、交通、商业与公共服务条件 | 企业服务 + 人工窗口 + 运维 | 来源、过期提示、人工转接和安静无屏同时成立 |
| JZ-06 可信叙事双螺旋 | 三地标、里程标、失败档案 | 史料、版权、商标和无障碍审查 | 策展 + 文保/历史专业 + 公众 | 来源、AI 标识、纠错和替代媒介全覆盖 |
| JZ-07 场景护照与开放基准 | JZ-AIOS、复测包与年度失效 | 法律、安全、数据与专业审查 | 独立评测 + 责任运营 + 社区席位 | 护照字段、人工兜底和停止阈值完整 |
| JZ-08 四季运营与 Proof Week | 年度问题、开源、Beta 和证据发布 | 预算、场地、主体和活动审批 | 京张开放协作台建议主体 | 同时公开通过、失败、修正和主动退役 |

`visual/assets/pilot-readiness-register.json` 为 JZ-01—JZ-08 和 T-01—T-03 逐项补齐概念级 RACI、审批触发、禁止数据、事故与停机责任、社区共测、退出恢复、独立复测和 go/no-go 证据。这里的“覆盖”仅表示 8 个项目和 3 个试点都有字段，不表示责任主体已接受、审批已取得或试点已运行；当前状态统一保持 G0/`concept_only`，现场结果与恢复时间保持 `unknown` [data:visual/assets/pilot-readiness-register.json#JZ-01] [metric:pilot_readiness_protocol_coverage_ratio]。

分期采用“年份窗口 + 证据门”，年份从不自动赋予进入下一阶段的资格 [data:geometry/phasing.geojson#PHASE-1] [metric:phase_count] [depth:phasing_implementation]：

| 窗口 | 状态 | 进入门 | 毕业门 | 回滚 |
|---|---|---|---|---|
| 0—2 年 | G0 概念/离线与 G1 影子 | 来源、责任、风险、基线、人工兜底齐全 | 可安全回滚、公共价值门通过、复测包完整 | 任一重大安全、隐私、无障碍或公共价值失败 |
| 3—5 年 | 经批准的 G2 限域 Beta | 独立复测、社区评议、专业审查和场地许可 | 三维毕业立方体通过并发布证据 | 连续失败、申诉无响应、公共红利未交付 |
| 5 年后 | G3 申请、扩展、修正或退役 | 正式审批和运行资源明确 | 年度报告确认继续、改正或主动退役 | 边界、控制条件、技术或社会影响发生重大变化 |

年度运营采用四季协议。第一季度“问题季”由社区、高校和城市服务者发布可公开问题；第二季度“开源季”形成团队、协议和离线基线；第三季度“城市 Beta 季”只运行获批的限域测试；第四季度“Proof Week”发布通过、失败、投诉、修正和主动退役，并形成下一年问题。开发者转化漏斗为“公开问题 → 共创队伍 → 离线基线 → 限域申请 → 公开证据 → 人工服务/企业转化/外部复测”；任何环节都不得把参与写成招商、资金或政策承诺。活动品牌采用同一 Logo 的季节色，不额外制造与一带主品牌冲突的 IP。

运营建议设“京张开放协作台”，公共部门只在法定职责内明确规则，专业机构负责空间、数据、安全与无障碍审查，高校和企业提供可撤回的项目，社区代表拥有议题席位、申诉和暂停建议权。年度报告必须同时披露服务、公共红利、投诉、数据事件、人工接管、能耗、失败与改进；实测数据不存在时不得用目标值冒充成绩。

## 指标体系、面积复算与合规矩阵

指标仍分七类，但按可读问题拆开呈现：

- 场地与重点区规模：临时场地面积、重点区数量及总面积 [metric:site_area_sqm] [metric:key_area_count] [metric:key_area_total_sqm]。
- 用地结构：用地单元数量和类别数量 [metric:land_use_unit_count] [metric:land_use_category_count]。
- 建筑表达：体量原型数量、基底面积和总体表示比例 [metric:building_count] [metric:building_footprint_area_sqm] [metric:building_representation_ratio]。
- 重点区体量：重点区原型数量和基底覆盖 [metric:key_area_building_count] [metric:key_area_building_footprint_ratio]。
- 蓝绿系统：绿地面积、数量和比例 [metric:green_space_area_sqm] [metric:green_space_count] [metric:green_ratio]。
- 公共空间：公共空间面积、节点数量和比例 [metric:public_space_area_sqm] [metric:public_space_node_count] [metric:public_space_ratio]。
- 交通：设计路线数量和长度 [metric:design_road_count] [metric:design_road_length_m]。

AI 与公共价值指标同样按核验问题拆开：

- 场景规模：服务场景、映射节点和服务区数量 [metric:scenario_count] [metric:mapped_scenario_node_count] [metric:ai_service_zone_count]。
- 运行接口：六门、护照字段覆盖和人工兜底字段覆盖 [metric:gateway_count] [metric:scenario_passport_coverage_ratio] [metric:manual_fallback_coverage_ratio]。
- 公共可达：非 AI 通道覆盖与无屏默认覆盖 [metric:non_ai_access_coverage_ratio] [metric:screen_free_public_node_ratio]。
- 实施：三个阶段门 [metric:phase_count]。
- 实地与交接准备：场地落地观察、八项目责任字段覆盖、三试点责任字段覆盖，以及仍为 0 的开园后现场审计 [metric:site_grounding_observation_count] [metric:pilot_readiness_project_coverage_ratio] [metric:completed_post_opening_field_audit_count]。
- 首测文档：12 个场景均有预注册记录，必填字段覆盖率为 100% [metric:g1_preregistration_record_count] [metric:g1_preregistration_required_field_coverage_ratio]。
- 首测现实证据：完成预注册和获批窗口均为 0 [metric:completed_g1_preregistration_count] [metric:approved_g1_test_window_count]；现场执行和已知独立复测结果也均为 0 [metric:g1_field_execution_count] [metric:known_g1_result_count]。

这些指标只证明提交包中“设计了什么”，不证明现实运行效果。

所有使用临时边界作分母的面积比例统一为 `low` 置信度；设计对象的数量和属性完整率可为 `high`；路线长度和体量面积为概念设计的 `medium` 或受边界影响的 `low`。容积率、总建面、平均高度、道路面积、停车供给、实测恢复时间和单位有效服务能耗保持 `unknown`，直到取得法定资料或受控测试证据。证据链固定为“公开来源/明确假设 → GeoJSON → EPSG:4548 复算或属性计数 → `metrics.json` → 正文/图纸/HTML → 机器自检 → 人工专业判断” [depth:metrics_recalculation]。

`compliance_matrix.json` 不再让 23 项任务共享同一证据组合：agent.1 指向品牌与三区两翼，agent.2 指向案例和产业状态机，agent.3 指向场景护照与测试协议，agent.4 指向九处公共空间、三地标和组件库，agent.5 指向可信叙事与生成内容标识，agent.6 指向四季运营与转化漏斗；公告任务也分别映射到对应章节、图层、指标、来源、假设和自检。`standard_matrix.json` 与 `design_depth_matrix.json` 同样按专业问题分配真实证据，不再使用批量复制总结。

![从字段覆盖到证据成熟度](assets/figures/metrics-evidence.png)

## 风险、版权与合规说明

- 边界与规划风险：官方 GIS/CAD、权属、控规、道路红线和工程条件缺失，任何空间结论都只是概念建议；正式资料到位后必须替换、差异比对和全量重算。
- 空间表达风险：36 个单元和体量原型是设计表达，不是现状调查；不得把表示比例解释为建筑密度或建设规模 [assumption:A-SPATIAL-REPRESENTATION-002]。
- 公共利益风险：测试可能造成噪声、拥堵、数字排斥或公共空间私有化；日常生活、非 AI 通道、静音无屏、共同测试和申诉暂停构成硬门。
- AI 与数据风险：偏差、幻觉、隐私泄露、越权自动化和供应商锁定通过最小数据、源端保留、日志、人工责任、复测、到期和退役控制；不得自动执法、诊断或替代正式审批。
- 安全与韧性风险：机器人、车辆和设备测试只在授权范围；实体急停、现场安全员、离线人工和 L0/L1/L2 降级必须可用。能源和恢复指标未实测时保持未知。
- 文化与历史风险：史实、人物、文物和工程资料需由官方/馆藏/清权来源复核；AI 生成内容显式与元数据标识，争议内容可纠错、下架和追溯 [assumption:A-CULTURE-CONTENT-006]。
- 版权与品牌风险：逐文件权利状态台账覆盖 manifest 中 51 个路径，并区分自述原创、仓库临时资料派生与待审计生成物；当前独立逐文件清权审计完成数为 0，总体状态为 `not_fully_cleared`。`COMMUNITY-DISPLAY-ONLY` 仍缺完整条款，OSM ODbL 义务、PDF 字体、生成工具条款、可编辑源以及 Logo/地标商标均需后续复核，不能声称已经全部清权 [data:visual/assets/rights-clearance-ledger.json#RIGHTS-01] [data:visual/assets/rights-clearance-ledger.json#RIGHTS-GATE-02]。
- 外部协同风险：未来科学城、怀柔科学城、经开区、其他创新街区和京津冀只作为可选复测角色，未经书面确认不得写成合作方、投资方或落地承诺 [assumption:A-EXTERNAL-COLLAB-005]。
- 运营与公平风险：活动热度不能替代居民满意、可达、公平与投诉闭环；贡献荣誉不得用于流量排名、就业筛选或行政评价。
- 工具与证据风险：机器检查只验证结构、拓扑、引用和一致性，不替代规划、建筑、交通、市政、景观、生态、消防、铁路、数据安全、无障碍、社区与法律专业判断 [depth:risk_missing_data]。
- 公开报道与现场差异风险：本轮 Firecrawl 桌面研究只保存公开页面的来源、日期、摘要和内容摘要值，用于引用与设计判断；未进行现场踏勘、竣工图核验或设施运行审计。凡涉及准确位置、已建状态、使用强度和无障碍表现的判断，均须在进入 G1 前现场复核 [data:visual/assets/site-grounding-register.json#SG-001]。

当前全部 AI 场景处于 G0 概念状态，八个项目和四季活动均为建议，未获批准、未建设、未运行、无机构承诺。只有在法定审批、责任主体、专业审查、公众参与、资金运维和事故响应全部明确后，才可讨论进入更高运行门。

## 参考资料

项目主依据：[source:OFFICIAL-ANNOUNCEMENT] 北京市规划自然资源委征集公告；[source:AGENT-TASKBOOK] 仓库智能体任务书；[source:SITE-PACKAGE] 场地包；[source:SOURCE-REGISTRY] 资料登记；[source:PROCESSED-FACT-PACK] 处理导航。临时空间依据为 [source:BOUNDARY-SOURCE] 与 [source:KEY-AREA-SOURCE]，仅用于生成、展示和非正式复核。

仓库公开资料索引的直接入口为 `brief/public-brief.md`，公开边界与用途说明见 `brief/README.md`；两者只提供可公开的任务背景和数据边界，不能生成法定控制值。

本地专业资料包括 `brief/site-package/standards/standards.json` 及其 references：[source:STD-URBAN-DESIGN] 城市设计管理、[source:STD-CONTROL-PLAN] 控制性详细规划编制审批、[source:STD-LAND-USE] 国土空间用地用海分类，以及 [source:STD-ARCH-DEPTH-GAP] 建筑工程设计文件编制深度的资料缺口记录；引用这些材料是为了限定表达深度和风险边界，不代表本方案已经成为法定规划，缺口记录更不能被当作已核验条文。

近期政策与场地背景：[source:BEIJING-AI-ORIGIN-2026] 北京市发展改革委 2026 年原点社区与百年京张公开信息；[source:BEIJING-AI-DISTRICTS-2026] 北京首批 AI 创新街区“一核多点”背景；[source:HAIDIAN-JZ-PHASE2-OPEN-2026] 2026 年 8 月二期开放报道；[source:HAIDIAN-AI-TRIAL-FIELD-2026] 海淀 AI 试验场与原点社区背景；[source:HAIDIAN-JZ-MIDTERM-2026] 京张人工智能创新带中期成果与三类人群、五分钟生活支持目标；[source:HAIDIAN-15FYP-2026] 海淀“十五五”规划中的人工智能、城市更新与公共服务方向。后四项来自本轮公开网页桌面研究，只用于形成现实基线、政策意向和待核验问题，不是现场调查、竣工证明、地块批准或机构承诺。

治理与方法背景还包括 [source:NATIONAL-DATA-INFRA-2025] 国家数据基础设施建设指引；[source:AI-CONTENT-LABEL-2025] 人工智能生成合成内容标识办法；[source:AI-PLUS-2025] 国务院“人工智能+”意见；[source:JZ-PARK-2023] 京张铁路遗址公园一期公开资料；[source:JZ-COCREATION-2021] 京张遗址公园公众共创与专业连续性资料。它们只支撑方向、方法和治理边界，不产生本项目审批、资金、伙伴或控制值。

全球案例对照包括 [source:CASE-KENDALL]、[source:CASE-ONE-NORTH] 与 [source:CASE-22AT]。同一对照集还包括 [source:CASE-KINGS-CROSS]、[source:CASE-STATION-F] 与 [source:CASE-MARS]。现状方向背景为 [source:OSM-CONTEXT]，其 ODbL 数据只用于道路、铁路和水系识别，不能作为官方边界或工程依据。

生成方法：空间设计由公开临时边界、项目枚举、OSM 背景和确定性脚本派生；面积与长度在 EPSG:4548 中复算；场景护照、服务区、公共空间模式和阶段门以 GeoJSON 属性记录；PNG、A3/A0 与离线 HTML 是解释层，`geometry/*.geojson`、`metrics.json`、三类矩阵和 `self_check.json` 是证据层。`COMMUNITY-DISPLAY-ONLY` 仅作为当前许可标签记录，其完整条款未随包提供；逐文件状态、未完成事项与使用限制见 `visual/assets/rights-clearance-ledger.json` 和 `report/copyright_statement.md`。
