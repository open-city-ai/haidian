---
title: "京张可验证生活线"
title_en: "Jingzhang Verifiable Life Line"
author_github: "light07-Y"
language: "zh"
proposal_format_version: "2"
bilingual_contract_version: "1"
translation_file: "proposal.en.md"
license: "COMMUNITY-DISPLAY-ONLY"
summary: "把'验证'变成城市的公共基础设施：以京张铁路遗址公园带为永远处于试运行状态的公共线，用'一证一屏一哨一闸一票一会'的 Proofline 协议，让每一次 AI 承诺都被看见、质询、暂停与复盘。全部空间建议为概念建议，基于 provisional 边界，待官方数据发布后重算，组织方数据缺口不阻断内容评分。"
tracks: ["civic-agent-governance", "ai-public-services", "jingzhang-heritage-narrative"]
scenarios: ["ai-cultural-guide", "ai-traffic-walkability", "robot-delivery-low-speed", "ai-health-service-navigation", "enterprise-service-copilot", "public-safety-operations-review"]
---

# 京张可验证生活线 · Jingzhang Verifiable Life Line

## 设计依据与资料清单

本方案以北京市规划和自然资源委员会海淀分局发布的《百年京张AI创新带城市设计国际方案征集资格预审公告》为第一依据，并以 `brief/site-package/` 中经维护者登记的临时粗略边界、重点区域、枚举、指标区间和来源清单为机器可读依据 [source:OFFICIAL-ANNOUNCEMENT] [source:SITE-PACKAGE] [source:AGENT-TASKBOOK]。面向智能体的任务书补充了十条共创原则、持续参与要求、统一评审维度与统一边界条款，本方案全部空间与运营建议均按"概念建议、参考方案、可供专业团队深化研究"表述，不替代正式规划，不构成政府审定结论 [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]。

官方 `SITE_BOUNDARY` 与三处 `KEY_AREA` 精确多边形尚未公开（资格预审文件下载仍受密码保护），本方案使用 `brief/site-package/geometry/provisional_boundaries.geojson` 生成临时 formal 包 [source:BOUNDARY-SOURCE] [source:KEY-AREA-SOURCE] [source:DATA-SRC-PROVISIONAL-BOUNDARIES-20260605]。提交包中 `geometry/site_boundary.geojson` 与 `geometry/key_areas.geojson` 均标注 `provisional_constraint`、`official_boundary=false`、置信度 `medium`，只能用于方案生成、自检、可视化和设计讨论，不能作为 official redline、审批依据、精确面积依据或法定控制结论 [depth:risk_missing_data]。现状诊断以公告、任务书与公开资料为基（无踏勘），既有铁路、遗址带、清河与主要道路以 `constraints.geojson` 低置信概念层表达 [depth:existing_conditions_diagnosis]。该组织方数据缺口本身不阻断内容评分；官方多边形发布后，边界、用地、建筑、道路、绿地、公共空间、分期与全部几何派生指标均需重算（复算方法见第十一章）[metric:site_area_sqm]。

资料登记表的使用边界如下 [source:SOURCE-REGISTRY]：formal 可用资料 7 条（公告、任务书、城市设计管理办法、控规编制审批办法、用地用海分类指南、生成式人工智能服务管理暂行办法、无障碍环境建设法），provisional-only 1 条（临时边界），background-only 1 条（智能技术适老化政策背景）。agent 不得把 background_only 或 provisional_only 资料升级为官方边界、法定控规、正式评分依据或政府实施承诺 [source:PROCESSED-FACT-PACK]。

![资料证据链与提交包关系图](assets/figures/site-overview.png)

**核心主张**：AI 不应以"更聪明的建筑"或"科技橱窗"的姿态出现在城市里，而应以**可验证的公共服务**出现。城市为水、电、光提供基础设施，也应提供"证明"的基础设施——让每一次 AI 承诺都能被看见、被质询、被暂停、被复盘。京张可验证生活线，就是这样一条**永远处于试运行状态的公共线**：它不是"建好即交付"的工程线，而是信号永远点亮、运行图永远公开、任何服务都可以被停下检查的生活线。本方案与同主题方案的差异在于：我们不做"验证基础设施"的机构化表达，而是做**验证的日常生活化**——买菜、通勤、就医、遛弯时随手可得的凭证体验。

## 三层范围工作框架

方案按公告确定的三个层次组织工作 [source:OFFICIAL-ANNOUNCEMENT] [depth:three_level_scope_framework]：

| 层级 | 官方范围 | 本方案的承载 | 数据落点 |
| --- | --- | --- | --- |
| 统筹研究范围 | 43.6 km²，北至北五环路、东至京藏高速、南至西直门外大街、西至万泉河路 | 验证协议作为城市治理方法的创新链与生态框架（第三章） | compliance_matrix.json、[data:geometry/site_boundary.geojson#SITE-001] |
| 总体设计范围 | 11.4 km²，京张遗址公园周边 1-2 公里城市地区与产业区 | "一条线+三个验证站+四个节点"的总体空间结构（第四章至第九章） | [data:geometry/land_use.geojson#LU-001]、[data:geometry/roads.geojson#ROAD-001] |
| 重点区域范围 | 368.4 公顷三处详细设计地区 | 三站=安全验证站/解释翻译站/日常服务验证站（第五章） | [data:geometry/key_areas.geojson#PROV-KEY-001]、[data:geometry/key_areas.geojson#PROV-KEY-002]、[data:geometry/key_areas.geojson#PROV-KEY-003] |

三层不是互相割裂的图纸集合：统筹研究决定"验证"作为治理方法的产业与生态价值，总体设计把方法落实到空间结构与设施承载，重点区域把协议落地为可体验、可复核、可运营的站点场景。全部几何派生面积与比例由 `metrics.json` 复算并标注 provisional 限制 [metric:site_area_sqm] [metric:green_ratio] [metric:public_space_ratio]；任何无法从结构化数据复算的数量不得写入正式结论 [depth:metrics_recalculation]。

## 统筹研究范围产业与未来城市研究

### 3.1 命名体系与视觉识别（回应 agent.1）

- **主名称**：京张可验证生活线 / Jingzhang Verifiable Life Line (JZ-VLL)
- **口号**：让每一次 AI 承诺都被看见、质询、暂停与复盘 / Every AI promise on the line can be seen, questioned, stopped, and reviewed.
- **命名体系**：线（验证线=遗址公园主轴）→ 站（众智园站=安全验证站、原点社区站=解释翻译站、大钟寺站=日常服务验证站）→ 节点（信号楼、里程碑廊、扳道站、站台广场）→ 系统（Proofline 验证协议六件套）。"站"是铁路语言的自然转译：京张铁路沿线曾以站为生活中心，今天让 AI 服务沿线设"站"，公众可进站质询、离站退出 [standard:PROJECT-OFFICIAL-ANNOUNCEMENT] [source:AGENT-TASKBOOK]。
- **Logo 方向**：三色竖排信号灯柱（绿=试运行/黄=限速/红=停运），柱身取"京张"首字母 J 的变形，底座为里程碑刻度——信号、铁轨、里程碑三合一，与京张铁路遗产文化同源、与"验证"语义同构。
- **五大功能映射**：AI 全栈自主创新体系→众智园安全验证站；世界级 AI 创新生态→原点社区解释翻译站；AI+场景赋能新范式→大钟寺日常服务验证站；智能化 AI 活力城市→全带场景体系；AI 治理全球话语权→Proofline 协议与验证节 [source:AGENT-TASKBOOK]。
- **三区两翼协同回路**：三站=三重点片区；中关村科技服务翼承接要素全球化配置与资本赋能（与验证站的"一证"登记联动）；小月河场景赋能翼承接 AI 场景赋能与智能活力城市（LSC-06 可解释拥堵管理落点）。两翼是验证协议的供给端与场景端，形成"协议—要素—场景"闭环。
- **差异化声明**：同属"验证"主题的既有方案侧重验证基础设施的机构化表达（轨迹站点、运行图、评测流水线）；本方案把验证协议绑定到**日常生活场景**（买菜、通勤、就医、遛弯），并首次把"信号→调度→道岔→里程碑→回执→复盘"串成一条可执行、可首尾追溯的完整协议链。

### 3.2 全球 AI 创新生态案例（回应 agent.2）

从公开资料选取五例（均为公开知识，供设计参考而非实施承诺）[source:AGENT-TASKBOOK]：① 多伦多 Quayside——过度承诺与缺乏可验证机制的失败教训，反向证明"验证先行的城市数字服务"的必要性；② 新加坡智慧国（Smart Nation）——以统一数字身份与公开服务目录支撑公共数字服务的可追溯运营；③ 赫尔辛基 AI 登记册——以公开登记（对应本方案"一证"）让市民可查服务用法与数据边界；④ 巴塞罗那 22@——以创新区更新实现产业与公共空间共生，验证"以公共空间承载产业展示"的形态；⑤ 中国多地政务大模型上线规范——上线前评测、上线中监督、上线后复盘的公共大模型运营基线。五例共同指向：**可验证是 AI 城市公共服务的通行证，而非附加项**。

### 3.3 众智园全栈自主创新与 AI 治理话语权

众智园AI自主创新加速区承担 AI 全栈自主创新体系与 AI 治理全球话语权定位 [source:OFFICIAL-ANNOUNCEMENT] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]：以安全验证站承接自主模型测试、标准制定、安全治理展示与低碳算力体验；以"试验线"形态把产业测试验证场景（见 6.2）组织为可参观、可预约、可监管的开放验证场域 [data:geometry/key_areas.geojson#PROV-KEY-001]。治理话语权来自可复制的验证方法——本方案提出以"验证协议六件套"作为可国际传播的城市治理产品，通过验证节国际专场与年度运行图发布持续输出。

## 总体设计范围城市更新与控规深度城市设计

总体设计范围要求达到控制性详细规划的城市设计深度 [standard:MOHURD-CONTROL-DETAILED-PLANNING] [depth:overall_spatial_structure]。本方案提出**"一脊三站、沿线设站、闭环复验"**的总体空间结构 [depth:land_use_layout]：

- **一脊**：京张遗址公园带作为验证线主脊（proofline 主廊道），串联慢行、蓝绿与 AI 服务节点 [data:geometry/roads.geojson#ROAD-001] [data:geometry/green_space.geojson#GREEN-001]；
- **三站**：三重点片区各自承载一种验证站职能（见第五章）[data:geometry/key_areas.geojson#PROV-KEY-001] [data:geometry/key_areas.geojson#PROV-KEY-002] [data:geometry/key_areas.geojson#PROV-KEY-003]；
- **沿线设站**：AI 服务以"站"的形态沿线布置，每个站具备六件套协议属性，公众可进站质询、离站退出；
- **闭环复验**：每项服务 12 个月强制复验（"检修"制度），试运行永不结束。

城市更新总体框架遵循"先验证、后更新"原则：低效空间识别以公开资料为基（无踏勘、无内部数据），更新项目清单（第十章）全部为概念项目，**不指定具体地块拆改留**（属边界条款禁止项，见第十二章）[depth:retain_renovate_demolish]。建筑总规模以概念体量表达（约 150 个概念建筑基底，见第七章），开发强度、建筑高度等控规指标在官方控制条件缺失前一律标 unknown [depth:development_intensity_controls] [depth:height_massing_character]。新型基础设施（端侧算力、分布式能源、低干扰传感）作为待深化的概念原型提出，不作工程可行性结论 [depth:municipal_new_infrastructure]。

## 重点区域详细设计

三处重点区域是本方案的"三个验证站"——把公告要求的详细设计任务 [source:OFFICIAL-ANNOUNCEMENT] 与验证协议三站分工合而为一 [depth:three_key_area_detailed_design]：

| 重点片区 | 验证站职能 | 设计定位 | 空间动作 | AI 场景与协议落点 | 证据引用 |
| --- | --- | --- | --- | --- | --- |
| 众智园AI自主创新加速区 | 安全验证站（编组站/试验线） | 花园型全栈自主创新街区 | 强化清河界面、产业展示、低碳创新交往与对外交通组织；以绿色空间承载开放测试场与标准治理展示 | TVS-01/02/03 产业测试验证、试验线状态屏、测试工程师值班 | [data:geometry/key_areas.geojson#PROV-KEY-001]、[depth:three_key_area_detailed_design] |
| 北京AI原点社区 | 解释翻译站（信号楼） | 近校型成果转化与人才社区 | 校区园区街区慢行缝合；补足成果发布、人才服务、居住生活与开源协作空间；设信号楼与公众质询台 | LSC-01 导览、LSC-05 事实核验、质询广场、解释回执 | [data:geometry/key_areas.geojson#PROV-KEY-002] |
| 大钟寺AI产业聚集区 | 日常服务验证站（客运站） | 城市型智能经济与国际交往街区 | 大钟寺站一体化、四象限步行连通、商业服务与重点企业公共环境更新；设站台广场与日常服务状态屏 | LSC-03 夜间配送协调、站台广场活动调度、日常服务回执 | [data:geometry/key_areas.geojson#PROV-KEY-003]、[metric:key_area_count] |

**四个 AI 朝圣地标（回应 agent.4，≥3 个）**：① 信号楼（原点社区站内，验证指挥中心，透明可参观，公众可观看"为什么这么决策"的解释屏）；② 里程碑廊（沿线中段，以铁路里程碑转译验证事件记录，铭刻验证启动时间、复核记录与智能体贡献者名册，形成荣誉展示体系）；③ 扳道站（互动公共空间，公众可亲手切换 AI/人工服务模式，体验"道岔"机制）；④ 站台广场（大钟寺站，公共状态大屏+活动集散+验证节主场地）[data:geometry/public_space.geojson#PUBLIC-001] [source:AGENT-TASKBOOK]。荣誉展示体系与公共空间组件库（状态屏、里程碑、信号灯导视、回执亭）共同构成可复用的组件库方向，纳入第十一章组件清单 [depth:three_key_area_detailed_design]。

![三站验证分工示意图](assets/figures/key-areas.png)

## AI 创新生态、人才画像与 AI+ 场景

### 6.1 用户画像（回应 agent.3，6 类，作为"审查席位"而非标签）

| 画像 | 典型需求 | 空间响应 | 协议边界 |
| --- | --- | --- | --- |
| P01 王奶奶·78岁独居（大钟寺社区） | 不依赖手机的 AI 服务入口 | 纸质服务入口、人工代办点、LSC-04 | 服务不采集行为画像；人工兜底 |
| P02 陈默·29岁AI工程师（众智园） | 测试验证、开源贡献、社区声誉 | 试验线、里程碑荣誉墙、TVS 系列 | 代码与测试数据自愿贡献 |
| P03 李师傅·40岁配送骑手（小月河翼） | 夜间配送分时、人机交接 | 配送时段窗、机器人交接点、LSC-03 | 定位数据最小化；人工交接兜底 |
| P04 张琳·35岁带娃妈妈（原点社区） | 导览、安全、热舒适 | 无障碍可切换路线、热舒适告警、LSC-01/02/07 | 不采集儿童轨迹 |
| P05 Alex·28岁海外开发者访客 | 多语言、公开协议、国际活动 | 质询台、验证节国际专场、LSC-05 | 多语言解释；匿名参与 |
| P06 赵总·45岁中小企业主 | 场景开放申请、资源对接 | 场景开放四步流程、企业服务 Copilot | 数据授权另行签约 |

### 6.2 AI 场景卡（回应 agent.3，12 张：3 产业测试验证 + 9 日常）

每张场景卡遵循同一**协议卡字段**（对齐官方"从一张场景卡一路追到空间、责任、开始条件和结果凭证"的验收标准）：空间落位｜运营者（责任角色）｜基线来源与当前状态｜观察对象/样本边界/时间窗｜成功阈值｜停止阈值｜独立停机复核角色（人类）｜等价人工服务｜数据留存/删除凭证/复核周期｜申诉入口/扩容前复盘条件｜协议链映射（一证一屏一哨一闸一票一会）。**基线、阈值均为设计建议目标值，非已取得现场数据，现场基线待落地后采集（unknown）** [source:AGENT-TASKBOOK]。

**产业测试验证场景 ×3（众智园站，TVS-01~03）**：

| 场景 | 成功阈值（目标） | 停止阈值（硬性） | 人工复核 | 恢复路径 | 协议链 |
| --- | --- | --- | --- | --- | --- |
| TVS-01 自动驾驶接驳验证线 | 准点率≥95% | **任何一次人车接触事故即停** | 每趟车配备安全员 | 整改后重走"一证"流程 | 一证登记→试验线状态屏→测试工程师值守→试验急停闸→测试报告回执→试验复盘会 |
| TVS-02 公共大模型服务验证（政务/城市问答） | 事实核验通过率≥98% | 连续 3 次错误事实或 1 次高危错误 | 值班员抽检+公众质询台 | 版本回滚后复验 | 一证+解释屏+值班哨+停用闸+解释回执+月度复盘 |
| TVS-03 机器人配送与低空物流验证 | 配送时效达成率≥95% | 行人安全事件 | 骑手交接确认 | 临时转人工配送 | 一证+时段窗状态屏+调度哨+急停闸+交接回执+复盘 |

TVS-02 的内容合规与数据边界遵循《生成式人工智能服务管理暂行办法》边界 [source:DATA-SRC-GENERATIVE-AI-INTERIM-MEASURES]：违法内容处置条款不等同于一般用户退出权，用户删除与退出的数字响应时限在办法中无法定硬性数值，本方案据此不虚构"法定 N 天删除"承诺，而以"删除凭证+复核周期"的运营设计回应。

**日常场景 ×9（LSC-01~09）**：LSC-01 公众AI导览（解释站，多语言可解释、可切换人工讲解，引用标准场景 ai-cultural-guide）；LSC-02 无障碍可切换路线（沿线，依据《无障碍环境建设法》第 39 条边界——仅限医疗、社会保障、金融、生活缴费等法定列举服务场所，不泛化为所有公共空间 [source:DATA-SRC-BARRIER-FREE-ENVIRONMENT-LAW]，引用 ai-traffic-walkability）；LSC-03 夜间配送与安静空间协调（大钟寺，静音时段、配送时段窗，引用 robot-delivery-low-speed）；LSC-04 纸质服务入口（沿线社区，老人不依赖手机的等价人工入口，服务回执纸质化）；LSC-05 公共AI事实核验（质询台，公众提交 AI 内容，核验台给出来源结论与解释回执，引用 ai-health-service-navigation 的导航式服务路径）；LSC-06 可解释拥堵管理（小月河翼，信号联动向公众展示"为什么这么调度"）；LSC-07 热舒适告警（公共空间，极端天气 AI 告警+人工应急值守）；LSC-08 社区服务资源匹配（社区，AI 撮合+人类社工复核，引用 enterprise-service-copilot 的企业/组织服务模式）；LSC-09 数据删除与退出回执（沿线，退出 AI 服务即获删除凭证，回应"可退出"底线，引用 public-safety-operations-review 的活动与运营复核机制）。每张卡均含完整协议链与人工兜底；12 张卡清单、阈值表与空间落位全量进入 `visual/index.html` 与 A3/A0 图纸 [metric:scenario_card_count] [metric:industrial_tvs_count]。

**AI 治理边界**：城市智能体只做辅助整理、推演、反馈与复核，不替代专业判断；不输出未经授权的个人画像；不声称获得官方实施承诺；所有场景节点进入结构化图层与合规矩阵 [data:geometry/public_space.geojson#PUBLIC-001] [metric:user_persona_count]。

## 用地、建筑规模与拆改留方案

概念用地布局覆盖总体设计边界、无重叠，用地代码遵循《国土空间调查、规划、用途管制用地用海分类指南》语义 [source:DATA-SRC-MNR-LAND-USE-CLASSIFICATION-202311] [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE]，空间落点与深度要求分别见 [data:geometry/land_use.geojson#LU-001] 与 [depth:land_use_layout]：

| 用地类别 | 代码 | 概念布局 |
| --- | --- | --- |
| 科研用地 | 0802 | 众智园、原点社区核心 |
| 教育科研配套 | 0804 | 原点社区近校缝合带 |
| 文化用地 | 0803 | 三站文化展示节点、里程碑廊 |
| 商业服务业用地 | 05 | 大钟寺商圈、站点周边 |
| 居住与社区服务 | 0701/0702 | 原点社区人才居住、沿线社区 |
| 绿地与开敞空间 | 1401/1402 | 遗址带绿廊、防护绿地 |
| 广场用地 | 1403 | 三站站前广场与节点 |
| 道路用地 | 1207 | 道路微循环 |
| 留白用地 | 16 | 待验证用途的预留空间（呼应"永远试运行"） |

![概念用地结构图](assets/figures/land-use-structure.png)

建筑规模以约 150 个**概念建筑体量**表达（众智园约 55、原点社区约 50、大钟寺约 40、沿线少量），类型覆盖 enums/building_types.json 全部 13 类（AI 研发、实验室、孵化器、办公、混合功能、教育科研配套、居住、人才公寓、社区服务、商业、文化展示、交通接驳、现状保留）[data:geometry/buildings.geojson#BLDG-001] [metric:building_footprint_area_sqm]。建筑高度与容积率为概念示意值，**不构成法定控制**；拆改留按"保留遗产与现状锚点、更新低效空间、留白待验证"三原则作概念分类 [depth:retain_renovate_demolish]，不指定具体地块 [depth:height_massing_character] [metric:building_density]。

## 交通、轨道、市政与公共服务设施

交通组织围绕"验证线主廊道"展开 [data:geometry/roads.geojson#ROAD-001] [depth:traffic_rail_slow_parking]：遗址带主廊道承载步行与骑行（road_class=绿道/步行），三站间以慢行接驳串联；轨道站点（大钟寺站等）一体化接驳与四象限步行连通列入重点区动作；道路微循环与地块出入道路为概念建议，不涉及道路线形工程方案 [standard:MOHURD-URBAN-DESIGN-MEASURES]。LSC-06 可解释拥堵管理落点小月河场景赋能翼：信号联动时向公众显示"为什么这么调度"，调度依据与回执进复盘会。市政与新型基础设施（端侧算力点、分布式能源、低干扰传感）作为概念原型，不给出工程可行性结论 [depth:municipal_new_infrastructure]；公共服务设施（社区服务、无障碍、养老适老）布局遵循无障碍法第 39 条边界 [source:DATA-SRC-BARRIER-FREE-ENVIRONMENT-LAW] [metric:road_centerline_length_m]。

## 蓝绿空间、公共空间与城市风貌

蓝绿体系以遗址公园带为主轴（绿廊+防护绿地+站内公园）[data:geometry/green_space.geojson#GREEN-001] [depth:blue_green_public_space] [metric:green_ratio]；公共空间系统由三站站前广场、四节点与社区公共空间构成 [data:geometry/public_space.geojson#PUBLIC-001] [metric:public_space_ratio]。城市风貌控制以"信号语言"为导视系统方向（回应 agent.5 导视/标识/符号系统）：三色信号作为公共服务状态色进入导视体系，里程碑为空间记忆符号，运行图式为信息排版语言，文化标识系统与一带整体 Logo 系统明确区分、不混淆 [source:AGENT-TASKBOOK] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]。三幕文化叙事"信号（詹天佑人字形与安全规则）→扳道（中关村方向切换）→验证（AI 时代新信号体系）"落点于**从设计铁路的人，到设计规则的人**，作为国际传播叙事主轴（agent.5 国际传播文案）[source:OFFICIAL-ANNOUNCEMENT]。

![慢行与蓝绿连续性示意图](assets/figures/mobility-bluegreen.png)

## 更新项目清单、实施政策与分期计划

**概念更新项目清单（10 项，全部"概念建议"）**：① 众智园试验线及测试场公共化改造；② 信号楼（原点社区解释枢纽）；③ 里程碑廊及沿线里程碑带；④ 扳道站互动公共空间；⑤ 大钟寺站台广场与状态屏系统；⑥ 遗址带慢行主廊道织补；⑦ 三站纸质服务入口与回执亭；⑧ 小月河可解释拥堵管理场景带；⑨ 社区 AI 服务驿站（含人工值班席）；⑩ 验证节活动场地与运行图发布厅 [depth:renewal_project_list]。每项均标注验证协议关联与实施依赖（官方边界、场地条件、运营主体）。

**分期实施（回应 agent.6 落地路径）** [data:geometry/phasing.geojson#PHASE-001] [depth:phasing_implementation]：

| 分期 | 范围 | 内容 | 验证状态 |
| --- | --- | --- | --- |
| 一期·验证启动（PHASE-001） | 三重点区及站点周边 | 三站建成验证职能、TVS-01/02/03 上线、信号楼与站台广场投用 | 首批服务进入"一证"登记，试运行 |
| 二期·全带织补（PHASE-002） | 遗址带全线 | 主廊道慢行织补、里程碑带、扳道站、社区驿站铺开 | 全带服务纳入 12 个月强制复验 |
| 三期·两翼协同（PHASE-003） | 中关村科技服务翼、小月河场景赋能翼 | 要素配置联动、可解释拥堵落地、验证节国际专场 | 协议成为带际治理产品，输出国际传播 |

**政策建议（概念）**：AI 服务上线"一证"登记建议（非法定要求）、场景开放"公开申请→沙盒测试→人工复核→公开展示"四步流程、验证结果与回执的公开披露机制、开发者社区运营（开源协议+贡献者入册+荣誉墙）——全部为可深化研究的方向，不构成政府承诺 [source:AGENT-TASKBOOK]。

## 指标体系、面积复算与合规矩阵

**指标分两类**：可复算指标（known，全部可由提交包几何与结构化数据复算，13 项完整清单、复算方法与数值见 `metrics.json`，几何派生指标置信度 medium，标注 provisional 限制，例如 [metric:site_area_sqm]、[metric:building_footprint_area_sqm]、[metric:green_ratio]）；**待官方数据确认指标**（unknown，诚实标注 reason：FAR、建筑高度、规划绿地率、退线等控规条件缺失；停闸响应时间、事实核验通过率等协议目标值属运营设计目标而非已实现指标，例如 [metric:floor_area_ratio]）。**本方案不把概念目标值伪装成已实现数值**——HTML 中 unknown 一律显示"unknown/pending"文本，不渲染为 data-value 数字 [depth:metrics_recalculation]。

复算方法：面积与长度在 EPSG:4548（CGCS2000 3 度带 CM117E）下计算，输出 EPSG:4326；provisional 边界复算值与公告数值并存、不互相替代 [source:BOUNDARY-SOURCE]。合规矩阵 compliance_matrix.json 覆盖公告 1.3/1.4/1.5 与 agent.1-agent.6 全部 23 条必答项，每条提供章节、图层、指标、图纸、HTML 段落、来源、假设与自检证据（23 条×8 字段零空缺）；设计深度矩阵覆盖 15 项深度要求；标准矩阵覆盖 5 个强制标准（addressed）与 1 个资料缺口（建筑工程设计文件编制深度规定，官方文件未纳入公开仓库，诚实标注 data_gap [standard:MOHURD-ARCH-DESIGN-DEPTH-2016]）。

![指标与证据链图](assets/figures/metrics-evidence.png)

## 风险、版权与合规说明

**统一边界条款**：本方案全部成果为开放共创建议，不替代正式规划，不构成政府审定结论 [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]。遵循边界条款，本方案不给出：控规调整/容积率/建筑高度等法定规划判断、具体地块拆改留方案、道路线形/轨道线位/桥隧/市政管线工程方案、地下空间与市政容量专业测算、土地权属/投资测算/开发时序与审批判断、非公开数据与个人隐私数据、不符合公共安全伦理合规文物保护生态管控的内容、未授权使用的商标字体图片肖像论文图像版权材料、将概念建议表述为已确定政府决策的内容。所有空间落地建议表述为"概念建议/参考方案/可供专业团队深化研究" [source:AGENT-TASKBOOK]。

**风险分级（详见 risk.json，风险 1-5 级，4 级以上含人工复核安排）**：R1 边界数据风险（provisional 边界→medium 置信度+重算承诺，组织方缺口不扣分）；R2 场地现状风险（未踏勘→基线待采集，unknown 表达）；R3 技术可行性风险（概念原型不承诺工程可行性）；R4 隐私与合规风险（数据最小化、删除凭证、无障碍法第 39 条边界）；R5 政策不确定性（活动与政策建议为概念，不冒充安排）。**生成方法披露**：本包由智能体生成，生成工具、字体、图片、地图、图标、数据与代码的权利与许可逐项登记于 `report/copyright_statement.md`；交付物字体使用 Noto Sans SC（OFL 许可），可嵌入、可署名、可再分发。**状态语义**：formal-review-ready 仅表示机器门禁与内容审稿就绪；空间几何为 provisional，正式专业评分及法定/工程判断仍待官方 polygons 与专业资料，不把任何临时多边形称为官方红线 [source:SOURCE-REGISTRY]。

## 参考资料

1. 百年京张AI创新带城市设计国际方案征集资格预审公告（北京市规划和自然资源委员会海淀分局）[source:OFFICIAL-ANNOUNCEMENT]
2. 面向全球智能体开展"百年京张AI创新带城市设计开源征集"的任务书摘录（用户提供清权文件）[source:AGENT-TASKBOOK]
3. 城市设计管理办法（住建部）[source:DATA-SRC-MOHURD-URBAN-DESIGN-MEASURES]
4. 城市、镇控制性详细规划编制审批办法（住建部）[source:DATA-SRC-MOHURD-CONTROL-DETAILED-PLANNING]
5. 国土空间调查、规划、用途管制用地用海分类指南（自然资源部）[source:DATA-SRC-MNR-LAND-USE-CLASSIFICATION-202311]
6. 生成式人工智能服务管理暂行办法（网信办等七部门）[source:DATA-SRC-GENERATIVE-AI-INTERIM-MEASURES]
7. 中华人民共和国无障碍环境建设法 [source:DATA-SRC-BARRIER-FREE-ENVIRONMENT-LAW]
8. 三层范围与重点区域临时粗略 polygon（provisional_only）[source:DATA-SRC-PROVISIONAL-BOUNDARIES-20260605]
9. brief/site-package 全部机器可读资料（design_brief/allowed_design_space/enums/ranges/schemas）[source:SITE-PACKAGE]
10. 来源可用性登记与处理资料包 [source:SOURCE-REGISTRY] [source:PROCESSED-FACT-PACK]

（全文中英镜像：proposal.en.md；图纸、报告 HTML 与视觉 HTML 均出中英版本。）
