---
title: "京张智源带——百年京张AI创新带城市设计概念方案"
author_github: "Zikkying"
language: "zh"
proposal_format_version: "2"
bilingual_contract_version: "1"
translation_file: "proposal.en.md"
license: "COMMUNITY-DISPLAY-ONLY"
version: "v1.0"
summary: "以“一轴三核、双环多点”为空间骨架的百年京张AI创新带概念方案：京张遗址文化智轴南北贯通，众智园、北京AI原点社区、大钟寺三核锚定，慢行活力环与蓝绿生态环复合，12 个 AI 场景节点与 3 处朝圣地标概念节点沿线布局。方案基于场地包粗略替代边界生成，全部空间建议为概念方案，供专业团队深化研究。"
tracks: ["ai-traffic-walkability", "jingzhang-heritage-narrative", "enterprise-services-ecosystem"]
scenarios: ["ai-traffic-walkability", "enterprise-service-copilot", "ai-cultural-guide"]
---

# 京张智源带——百年京张AI创新带城市设计概念方案

**主名称：京张智源带**（“智”承 AI 创新，“源”承京张铁路百年之源与中关村创新之源）
**英文名称：Centennial Jing-Zhang AI Origin Belt（简称 JZ-AI Origin Belt）**
**Logo 方向建议**：以“铁轨轨距线”演化为“数据流双线”的图形母题——两条由枕木单元渐变而来的平行线向北汇聚为一点（原点），辅以京张铁路“人”字形线路的折角符号，寓意从历史轨道到智能轨道的接力；色彩建议采用“铁路黛蓝 + 算力青绿”双色体系，字体与标识须使用可商用授权字体原创绘制（概念方向，供专业团队深化）。

## 设计依据与资料清单

本方案以北京市规划和自然资源委员会海淀分局发布的《百年京张AI创新带城市设计国际方案征集资格预审公告》为第一依据，并以 `brief/site-package/` 中经维护者登记的临时粗略边界、重点区域、枚举、指标和来源清单为机器可读依据 [source:OFFICIAL-ANNOUNCEMENT]。生成前已通读 `design_brief.json`、`allowed_design_space.json`、`sources.json`、`enums/`、`ranges/planning_limits.json`、`standards/`、`schemas/` 与 `data/source_registry.json`，并据此建立任务、范围、资料用途和缺口清单 [source:SITE-PACKAGE]。公告要求总体设计范围达到控制性详细规划的城市设计深度、重点区域达到规划综合实施方案的城市设计深度，因此文本叙述不替代 GeoJSON、指标表、A3 文册、A0 展板和 HTML 展示成果，二者互为证据 [depth:existing_conditions_diagnosis]。

资料使用边界严格执行来源登记：formal 可用资料用于事实判断，背景资料只作语境，临时资料只作过渡 [source:SOURCE-REGISTRY]。本方案没有、也不允许把任何背景或临时资料升级为官方边界、法定控规、正式评分依据或实施承诺。面向智能体的任务要求（agent.1–agent.6）来自开源征集任务书摘录，属于设计任务而非规划控制条件 [source:AGENT-TASKBOOK]。

![场地证据链与方案总览](assets/figures/site-overview.png)

**边界声明**：官方 `SITE_BOUNDARY` 与三处 `KEY_AREA` 精确多边形尚未随场地包发布，本方案使用 `brief/site-package/geometry/provisional_boundaries.geojson` 的粗略替代边界（面积约 11.41 平方公里，与公告 11.4 平方公里文字值吻合）[source:BOUNDARY-SOURCE]。提交包中 `geometry/site_boundary.geojson` 与 `geometry/key_areas.geojson` 均标注 `provisional_constraint`、`official_boundary=false`、`boundary_precision=provisional_rough`，只能用于方案生成、自检、可视化与设计讨论 [data:geometry/site_boundary.geojson#SITE-001]。正式边界发布后，用地、建筑、道路、绿地、公共空间、分期图层与全部面积指标必须复算；该组织方数据缺口不阻断内容评分，但正文所有面积数值均应理解为“粗略替代边界下的复算值” [metric:site_area_sqm]。

## 三层范围工作框架

方案按公告确定的三个层次组织：统筹研究范围（约 43.6 平方公里）研究 AI 产业生态与未来城市形态；总体设计范围（约 11.4 平方公里）落实城市更新总体框架与控规深度城市设计；重点区域范围（约 368.4 公顷）开展三处片区详细设计 [source:OFFICIAL-ANNOUNCEMENT]。三层范围逐条映射到 `compliance_matrix.json`，保证公告 1.3、1.4、1.5 与 agent.1–agent.6 必选任务均有章节、图层、指标与图纸证据 [depth:three_level_scope_framework]。

本方案的总体概念为 **“京张智源带：一轴三核、双环多点”**：

- **一轴**：京张遗址公园文化智轴——以京张铁路旧址廊道为骨架的南北向公园绿轴，串联历史记忆、慢行通勤与 AI 公共场景 [data:geometry/green_space.geojson#GREEN-001]；
- **三核**：众智园 AI 自主创新加速区（北）、北京 AI 原点社区（中）、大钟寺 AI 产业集聚区（南），与公告三处重点区域一一对应 [data:geometry/key_areas.geojson#PROV-KEY-001]；
- **双环**：慢行活力环（遗址绿道 + 三条片区微循环环 + 五条东西向慢行联络道）与蓝绿生态环（清河—小月河滨水廊道 + 口袋公园网络）[data:geometry/roads.geojson#ROAD-001]；
- **多点**：10 个 AI 场景节点与 3 个 AI 朝圣地标概念节点沿轴布局，构成可步行体验的“智源之路” [data:geometry/public_space.geojson#NODE-01]。

| 层级 | 设计问题 | 方案回答 | 数据落点 |
| --- | --- | --- | --- |
| 统筹研究范围 | AI 产业生态与未来城市形态如何组织 | “高校策源—开源协作—企业转化—公共体验—国际传播”创新链与三区两翼协同 | compliance_matrix.json、standard_matrix.json |
| 总体设计范围 | 更新框架、产业空间、交通市政与风貌如何落图 | 16 个用地区块全覆盖分区、42 个建筑基底组团、9 条慢行与微循环廊道 | [data:geometry/land_use.geojson#LU-001] |
| 重点区域范围 | 三处片区如何达到详细设计深度 | 众智园“全栈之谷”、原点社区“开源街坊”、大钟寺“智能商都”三套装配式详细设计 | [data:geometry/key_areas.geojson#PROV-KEY-002] |

![三层范围与用地结构图](assets/figures/land-use-structure.png)

## 统筹研究范围产业与未来城市研究

统筹研究范围的核心是构建世界级 AI 创新生态体系。海淀集聚了全国领先的 AI 高校院所、基础模型企业、算力与数据要素平台，本方案建议以“京张智源带”为空间组织工具，把散点分布的创新资源编织为“策源—协作—转化—体验—传播”的连续链条 [standard:PROJECT-OFFICIAL-ANNOUNCEMENT]。任务书要求的“三区两翼”中，AI 原点社区承载世界级创新生态，众智园承载全栈自主创新体系与 AI 治理话语权，大钟寺承载智能原生新业态，中关村科技服务翼与小月河场景赋能翼提供资本服务与场景试验场 [source:AGENT-TASKBOOK]。

**全球 AI 创新生态案例对标**（agent.2，6 个案例；均为公开常识性对标，不引用未经核实的数据）：

| 案例 | 可借鉴机制 | 对智源带的转译 |
| --- | --- | --- |
| 美国硅谷—斯坦福生态 | 大学策源 + 风险投资 + 开源文化 | 原点社区近校孵化与开源发布机制 |
| 波士顿 Kendall Square | 校区与产业区步行缝合 | 校—园—街区慢行缝合环 |
| 伦敦 King’s Cross 知识区 | 铁路遗产更新 + 科技总部 + 公共领域 | 京张遗址廊道的遗产—创新复合更新 |
| 慕尼黑 Werksviertel 等工业遗产创新区 | 工业遗存改造为创意与测试空间 | 沿线低效空间改造为测试验证场 |
| 特拉维夫创新街区 | 高密度初创社群与国际化活动 | 全球 AI 活动周与开发者社区运营 |
| 深圳湾科技生态 | 场景开放与产业链配套 | “场景开放日”与产业测试验证场景机制 |

未来城市形态判断：AI 改变的不只是产业，还有通勤、学习、消费与公共服务的空间组织。方案把“智能化 AI 活力城市”转译为可定位的空间类型——端侧算力驿站、场景开放街区、AI 生活服务样板街与可解释的城市智能体辅助系统，并明确其隐私与人工复核边界 [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]。产业战略指标（AI 创新指数、人才密度等）属于第三类绩效指标，需运营数据持续校准，本方案不给出伪精确数值，只在 `metrics.json` 中登记可复算的空间指标 [depth:metrics_recalculation]。

## 总体设计范围城市更新与控规深度城市设计

总体设计范围按控规深度城市设计要求组织 [standard:MOHURD-CONTROL-DETAILED-PLANNING]。在粗略替代边界内，方案形成 16 个无缝拼接的用地区块：科研用地（0802）约 395.0 万平方米，是产业空间的主体；公园绿地与防护绿地（1401/1402）合计约 316.0 万平方米，构成遗址智轴与蓝绿廊道；商业服务业用地（05）约 123.3 万平方米，集中于大钟寺与五道口；社区服务（0702）与居住（0701）保障人才生活；另设文化、教育、广场与战略留白 [data:geometry/land_use.geojson#LU-014] [metric:land_use_area_0802_sqm]。用地方案为概念分区：正式边界与控规条件发布后须重算，用地代码以场地包枚举的过渡性分类表达，正式使用前应导入官方分类全表 [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE]。

城市更新逻辑为“低扰动、渐进式、可运营”：优先以公共空间、首层界面与运营活动激活既有街区，低效空间识别与更新项目清单见实施章节；拆改留只给出分类方法（保留、改造、更新、新建、待确认），不给出具体地块结论 [depth:retain_renovate_demolish]。开发强度方面，容积率、建筑高度、建筑密度等指标因缺少官方控制条件一律列为待确认，不得以推测值冒充审定指标 [depth:development_intensity_controls]。

交通与市政在总体层面协同布局：轨道站点一体化以大钟寺站、五道口—成府路、清华东路西口为关键节点；道路系统尊重既有骨架，新增内容限于慢行、微循环与地块出入层面 [data:geometry/roads.geojson#ROAD-LOOP-DZS]。新型基础设施（分布式能源、端侧算力驿站、感知设施）以“轻量嵌入、试点先行”的方式与公共服务设施复合布局，工程可行性结论待正式资料 [depth:municipal_new_infrastructure]。

## 重点区域详细设计

三处重点区域分别形成“性格化”详细设计，均按规划综合实施方案深度组织功能业态、空间结构、公共空间、交通组织与实施依赖 [depth:three_key_area_detailed_design]。

**众智园 AI 自主创新加速区——“全栈之谷”**（粗略范围约 192.1 公顷，北区）：以花园型研发街区组织全栈自主创新体系，沿清河界面布置产业展示与低碳创新廊，设置“安全治理沙盒”与“全栈之塔展厅”（朝圣地标概念节点）承载标准制定、安全评测与公众展示；对外交通依托北侧环路衔接，内部以创新微循环环组织慢行 [data:geometry/key_areas.geojson#PROV-KEY-001] [data:geometry/public_space.geojson#NODE-13]。

**北京 AI 原点社区——“开源街坊”**（粗略范围约 104.3 公顷，中区）：以“校区—园区—街区”三区缝合为主线，组织近校成果转化街、开源发布广场、AI 原点纪念碑广场（朝圣地标概念节点）与人才生活服务；建筑以改造利用为主、点状新建为辅，首层优先布置成果展示、路演、知识产权与投融资服务 [data:geometry/key_areas.geojson#PROV-KEY-002] [data:geometry/public_space.geojson#NODE-12]。

**大钟寺 AI 产业集聚区——“智能商都”**（粗略范围约 72.0 公顷，南区）：围绕大钟寺站一体化与路口四象限步行连通，组织智能体与智能终端展示交易、内容消费、数据要素会客厅与国际路演客厅；规划绿地复合利用与站前广场共同构成南向门户 [data:geometry/key_areas.geojson#PROV-KEY-003] [data:geometry/public_space.geojson#PUBLIC-001]。

![三处重点区域详细设计索引](assets/figures/key-areas.png)

三处片区的空间落位均基于粗略替代范围，精确边界待官方发布后复核；片区内的功能、建筑与交通建议均为概念方案，供专业团队深化研究，不构成法定规划或实施结论 [source:BOUNDARY-SOURCE]。

### 三处核心场景概念表达

下列场景图把三处重点区域的空间策略转译为人的日常体验：众智园强调铁路工业遗存、研发协作与公共绿谷的共生；北京 AI 原点社区强调开源活动、社区服务和青少年共创；大钟寺强调轨道门户、智能商业与城市会客厅。图像由 OpenAI 图像生成工具制作，仅表达空间氛围与使用愿景，不作为现状照片、法定边界、面积指标或工程可行性证据；权威依据仍为本包 GeoJSON、指标文件与来源登记。[depth:three_key_area_detailed_design]

![众智园“全栈之谷”概念场景](assets/media/scene-zhongzhiyuan.jpg)

![北京 AI 原点社区“开源街坊”概念场景](assets/media/scene-ai-origin-community.jpg)

![大钟寺“智能商都”概念场景](assets/media/scene-dazhongsi.jpg)

## AI 创新生态、人才画像与 AI+ 场景

AI 创新生态的空间载体是“要素—空间—运营”的对应关系：土地与空间提供研发、孵化、展示与居住的梯度供给；资金与算力通过科技服务翼与端侧算力驿站触达；数据与场景通过“场景开放日”机制合规开放；人才通过人才特区服务与 15 分钟生活圈留存 [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]。生态图谱与机制细表见 `compliance_matrix.json` 与 HTML 展示页。

**用户画像（agent.3，5 类）**：

| 用户画像 | 典型需求 | 空间响应 | 治理边界 |
| --- | --- | --- | --- |
| 开源开发者 | 发布、协作、测试、社区声誉 | 开源发布厅、公共代码墙、夜间协作空间 | 不采集个人行为轨迹，活动数据只做聚合统计 |
| 初创团队 | 低成本办公、算力入口、试验场 | 共享测试场、端侧算力驿站、治理咨询 | 算力与数据服务需另行授权 |
| 企业与商务访客 | 展示、路演、国际接待 | 国际路演客厅、站点接驳、公共空间 | 企业标识与案例须清权后使用 |
| 周边居民 | 通勤、休闲、低扰动更新 | 遗址公园慢行环、社区服务嵌入、活动分级 | 居民画像不用于商业推荐 |
| 高校师生 | 成果转化、跨校协作 | 成果转化驿站、校—园慢行缝合、AI 教育体验点 | 校园数据与科研成果需授权 |

**AI 场景卡（agent.3，10 张）与产业测试验证场景（3 个）**：10 张场景卡分别为 01 开源发布厅、02 安全治理沙盒、03 端侧算力驿站、04 AI 慢行导航、05 大钟寺国际路演客厅、06 清河低碳创新廊、07 近校成果转化街、08 数据要素会客厅、09 AI 生活服务样板街、10 全球 AI 活动周路线，均已落位为结构化场景节点 [data:geometry/public_space.geojson#NODE-01] [metric:scenario_node_count]。3 个产业测试验证场景为：（a）智轴低速无人接驳与配送测试段（限定时段与路段、人工监督、可退出）；（b）公共空间城市智能体辅助管理试点（慢行断点识别、设施报修、活动安全预警，人工复核决策）；（c）建筑与园区能耗—算力协同调度试验（与分布式能源策略联动）。所有测试场景均为概念建议，落地前须完成审批、安全评估与隐私影响评估，不得写成已批准运营 [depth:risk_missing_data]。

场景—空间—运营映射：公共空间场景锚定广场与公园图层，慢行场景锚定道路与绿廊图层，运营主体、数据最小化原则与人工复核机制逐场景登记在合规矩阵与 HTML 场景页中 [data:geometry/green_space.geojson#GREEN-001]。

## 用地、建筑规模与拆改留方案

用地分区遵循“完整、闭合、无缝”原则：16 个用地区块由同一矩形网格裁剪自提交边界，相邻区块共享边界坐标，经拓扑校验无空洞、无重叠 [data:geometry/land_use.geojson#LU-001]。建筑方案共 42 个基底组团，按保留、改造、新建三类表达：大钟寺以保留利用为主，众智园与成府路以改造为主，原点社区成果转化区布置点状新建（均为概念布局，不代表现状调查结论）[data:geometry/buildings.geojson#BLDG-ZZY-01] [metric:building_footprint_area_sqm]。

建筑形态与风貌引导由 [depth:height_massing_character] 管理：遗址智轴两侧建议低多层与开放界面，研发组团采用院落式布局，轨道站点周边允许相对集约的综合体形态；具体高度、退线与体量控制一律待正式控规条件确认。建筑基底面积约 138.3 万平方米为粗略替代边界下的概念复算值，不能作为建设规模结论。

拆改留方法（[depth:retain_renovate_demolish]）：第一步完成现状建筑测绘与权属核查；第二步按结构安全、历史价值、功能适配三维度分类；第三步匹配保留、改造、更新、新建路径；第四步纳入更新项目清单与分期。缺少现状资料前，本方案只提交方法与待校准清单。

## 交通、轨道、市政与公共服务设施

交通策略为“轨道为骨、慢行为脉、微循环为络”[depth:traffic_rail_slow_parking]。南北向以京张遗址文化智轴绿道贯通全带（约 9.7 公里概念线位），东西向布置 5 条慢行联络道缝合被铁路与环路切割的街区，三处重点片区各设一条微循环环；概念慢行网络总长约 28.1 公里（复算值，非道路红线）[data:geometry/roads.geojson#ROAD-001] [metric:slow_mobility_network_length_m]。重点节点包括大钟寺站四象限步行连通、北五环跨环节点、五道口与清华东路西口轨道接驳；停车与非机动车停放以“轨道站点 + 片区入口”集中布局为原则，具体规模待交通专项资料。

![交通慢行与蓝绿公共空间复合系统图](assets/figures/mobility-bluegreen.png)

市政与新型基础设施：传统市政（给排水、能源、消防）资料缺失，列为正式深化前置条件；新型基础设施采取“端侧算力驿站 + 分布式能源 + 低侵入感知”的轻量原型路线，与公共服务设施复合设置，涉及管线与工程的内容不作可行性结论 [depth:municipal_new_infrastructure] [data:geometry/constraints.geojson#CONSTRAINTS]。公共服务设施按 15 分钟生活圈与 AI 产业服务双标准配置：人才居住、社区服务、医疗教育法律服务与 AI 企业服务设施在用地分区中预留空间，设施标准待官方条件。

## 蓝绿空间、公共空间与城市风貌

蓝绿系统以“一轴两廊多点”组织：京张遗址文化智轴绿廊南北贯通，小月河—清河滨水廊道与清河生态防护绿廊构成北部蓝绿界面，众智园门户公园与原点社区口袋公园补足日常绿地 [data:geometry/green_space.geojson#GREEN-002]。绿地复算比例约 25.3%（粗略替代边界下），公共空间（广场类）约 2.8%，二者共同支撑通勤、交往、活动与展示功能 [metric:green_ratio] [metric:public_space_ratio]。

公共空间体系强调“可运营的开放空间”：三处核心广场（大钟寺站前、开源发布、众智园展示前区）分别承担门户礼仪、社区日常与产业展示功能，沿线布局 13 个场景与地标节点 [data:geometry/public_space.geojson#PUBLIC-002]。

城市风貌融合三层文化叙事（agent.5）：**百年京张文化**（铁路遗产、人字形线路、詹天佑精神）、**中关村文化**（创业、开放、试错）、**AI 新文化**（开源、智能体、人机协作）。表达载体包括：遗址构筑物活化展示、“轨距线”导视标识系统、贡献者荣誉墙与年度刻名机制、三处 AI 朝圣地标概念节点——京张铁路记忆馆、AI 原点纪念碑广场、全栈之塔展厅 [data:geometry/public_space.geojson#NODE-11]。荣誉展示体系（agent.4）建议为“京张 AI 贡献者大道”：沿智轴设置可更新的荣誉铭牌与数字贡献墙，记录对一带建设有实质贡献的研究者、开发者、团队与智能体；公共空间组件库包括智慧座椅、可解释导视牌、模块化展亭三类原型。全部标识、字体与图像须原创或清权使用，地标设计避免娱乐化与网红化 [standard:MOHURD-URBAN-DESIGN-MEASURES]。

## 更新项目清单、实施政策与分期计划

更新项目清单按“位置—类型—依赖—阶段—证据”组织，全部项目为概念建议 [depth:renewal_project_list]：

| 项目编号 | 项目名称 | 类型 | 主要依赖 | 证据引用 |
| --- | --- | --- | --- | --- |
| JZ-01 | 京张遗址文化智轴绿道贯通 | 公共空间/慢行 | 遗址廊道权属、跨环路节点工程条件 | [data:geometry/roads.geojson#ROAD-001] |
| JZ-02 | 大钟寺站四象限步行连通与国际路演客厅 | 轨道一体化/运营 | 轨道站点条件、道路交叉口、市政管线 | [data:geometry/public_space.geojson#PUBLIC-001] |
| JZ-03 | 原点社区开源街坊与成果转化街 | 城市更新/产业服务 | 校区边界、权属、首层业态 | [data:geometry/buildings.geojson#BLDG-YDS-01] |
| JZ-04 | 众智园清河创新界面与低碳创新廊 | 蓝绿空间/产业展示 | 河道蓝线、生态与防洪条件 | [data:geometry/green_space.geojson#GREEN-003] |
| JZ-05 | 端侧算力驿站与新基建试点 | 新基建/公共服务 | 能源、安全评估、运营主体 | [data:geometry/public_space.geojson#NODE-03] |
| JZ-06 | 小月河—清河蓝绿生态廊道 | 蓝绿空间 | 蓝线、雨洪与生态条件 | [data:geometry/land_use.geojson#LU-012] |
| JZ-07 | 京张 AI 贡献者大道与荣誉展示体系 | 公共文化/品牌 | 公共空间许可、版权清权 | [data:geometry/public_space.geojson#NODE-12] |
| JZ-08 | 全球 AI 活动周公共路线 | 运营/品牌 | 活动审批、安全保障 | [data:geometry/phasing.geojson#PHASE-001] |

实施政策建议：以“轻启动、快反馈、渐进更新”为原则——一期（大钟寺—五道口示范段，约 189.4 万平方米）以运营活动、场景开放日与轻量设施先行；二期（原点社区—成府路更新段，约 714.1 万平方米）推进校—园—街区缝合与成果转化空间；三期（众智园—清河提升段，约 237.8 万平方米）完成全栈展示与蓝绿界面提升 [data:geometry/phasing.geojson#PHASE-001] [metric:phase_1_area_sqm]。分期面积为粗略替代边界下的复算值，实施须以正式控规、权属、资金与审批路径为前提 [depth:phasing_implementation]。

**长期运营机制（agent.6）**：建议设立“京张智源带运营共同体”作为概念性统筹平台，年度活动体系包括——春季全球 AI 开发者大会周、夏季 AI 城市场景开放日系列、秋季京张文化—AI 双年展、冬季开源贡献者年会；开发者社区运营采取“线上代码贡献 + 线下场景共创”双轨制，场景开放运营以“申请—评估—开放—复盘”闭环管理；国际传播以 JZ-AI Origin Belt 品牌与多语种内容矩阵推进，人才、企业与开发者的转化路径为“活动参与—社区留存—场景共创—落地服务”四级漏斗。以上均为运营机制建议，不构成政府活动安排或资金承诺 [source:AGENT-TASKBOOK]。

## 指标体系、面积复算与合规矩阵

指标体系分三类管理 [depth:metrics_recalculation]：第一类为可复算空间指标，全部登记在 `metrics.json` 并可由 GeoJSON 独立重算——总体范围面积 11,412,825 平方米（粗略替代边界）、建筑基底约 138.3 万平方米、绿地比例约 25.3%、公共空间比例约 2.8%、概念慢行网络约 28.1 公里、场景与地标节点 13 个、分期与用地面积分组 [metric:site_area_sqm]；第二类为管控指标（容积率、建筑高度、建筑密度、道路红线、设施标准），因缺少官方条件一律登记为 unknown 并说明前置条件 [metric:floor_area_ratio]；第三类为绩效指标（AI 创新指数、人才密度、活动参与度、场景使用频次），需运营数据持续校准，本方案不编造数值。

![核心指标复算与证据链](assets/figures/metrics-evidence.png)

合规矩阵是任务响应性的主控文件：公告 1.3、1.4、1.5 全部任务与 agent.1–agent.6 逐项映射到报告章节、图层、指标、图纸与 HTML 页面，见 `compliance_matrix.json`；强制性专业标准响应见 `standard_matrix.json`，设计深度证据见 `design_depth_matrix.json`。任一必选任务未覆盖即不进入正式专业评审，本方案已按此标准逐项自查 [standard:PROJECT-OFFICIAL-ANNOUNCEMENT]。

## 风险、版权与合规说明

**数据缺口风险**：官方边界、重点区精确多边形、控规条件、现状建筑、权属、市政、文保资料均未随场地包发布；本方案以粗略替代边界工作，全部空间结论带“待正式数据补齐”标签，正式边界发布后须整体复算 [source:SITE-PACKAGE] [data:geometry/constraints.geojson#CONSTRAINTS]。

**合规边界**：本方案不声称官方批准、审定控规、最终土地权属、最终建设规模或实施保证；所有空间建议、场景、地标、活动与运营机制均为概念建议、参考方案或可供专业团队深化研究的材料 [depth:risk_missing_data]。AI 治理场景遵循数据最小化、公开来源、可解释与人工复核原则，不输出个人画像，不以未成熟技术冒充可全面部署。

**版权与双语**：本提交包主文件为中文，`proposal.en.md` 为完整英文对照版；图纸、图件与 HTML 均提供中英双份。所有文本、几何、图件由智能体基于场地包公开资料原创生成，许可为 COMMUNITY-DISPLAY-ONLY；引用资料的范围与许可见 `sources.json` 与 `report/copyright_statement.md`。HTML 页面完全离线，不加载远程资源、不跟踪访问行为。

## 参考资料

- brief/site-package/design_brief.json（设计任务书结构化摘要）
- brief/site-package/agent_taskbook.json（面向智能体开源征集任务书摘录）
- brief/site-package/allowed_design_space.json（设计空间与数据政策）
- brief/site-package/geometry/provisional_boundaries.geojson（粗略替代边界与重点区）
- brief/site-package/enums/、ranges/planning_limits.json、standards/
- data/source_registry.json（公开来源登记与用途边界）
- 完整机器索引见 `sources.json`、`metrics.json`、`compliance_matrix.json`、`standard_matrix.json`、`design_depth_matrix.json` [source:SITE-PACKAGE]
