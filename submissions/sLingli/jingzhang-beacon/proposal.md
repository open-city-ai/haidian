---
title: "京张信标：把 AI 城市的运行状态变成公共信号语言"
author_github: "sLingli"
language: "zh"
translation_file: "proposal.en.md"
license: "COMMUNITY-DISPLAY-ONLY"
summary: "以百年京张铁路信号体系为原型，提出 JINGZHANG BEACON 京张信标：用绿、黄、红三色信号语言把 AI 城市的运行状态变成人人可读的公共信号。一脊三核双翼的空间结构与信号格网，让三处重点区分别成为验证信标、开源信标与体验信标，形成可体验、可复核、可回滚的 AI 城市公共界面。"
tracks: ["ai-traffic-walkability", "ai-origin-community", "enterprise-services-ecosystem"]
scenarios: ["ai-cultural-guide", "ai-traffic-walkability", "enterprise-service-copilot", "public-safety-operations-review"]
iteration: "v1.4"
---

# 京张信标：把 AI 城市的运行状态变成公共信号语言

> **JINGZHANG BEACON**｜京张铁路曾用臂板信号与信号灯把"前方路况"告诉每一趟列车；本方案用同一套公共信号逻辑，把 AI 城市的运行状态——哪些服务可体验、哪些正在受控测试、哪些已停用——转译为绿、黄、红三色公共信号，让市民、开发者与治理者都能读懂、都能复核、都能回退。

本方案的全部空间、活动、政策、招商、投资与分期均为**开放共创概念建议、参考方案或可供专业团队深化研究的材料**，不替代正式规划，不构成政府审定结论，不代表任何地块拆改留、道路红线或工程实施结论 [source:AGENT-TASKBOOK]。方案在官方 `SITE_BOUNDARY` 与三处 `KEY_AREA` 精确 polygon 尚未取得时，使用仓库维护者登记的临时粗略边界生成；所有几何均为 `official_boundary=false`、`geometry_role=provisional_constraint`，只能用于生成、展示、讨论与包内自检 [source:BOUNDARY-SOURCE] [source:KEY-AREA-SOURCE]。official polygons 发布后，须依次替换 site boundary、key areas，重做 land use、buildings、roads、green/public space、phasing、metrics、五图、HTML 与 PDF。

> **执行摘要（七行）**
> 1. 核心命题：把 AI 城市的运行状态转译为绿/黄/红三色公共信号语言——可体验、可复核、可回滚。
> 2. 空间响应：一脊三核双翼；三处重点区分别成为验证、开源、体验信标。
> 3. 合规锚点：红灯停用、申诉时限、无 AI 等价路径不是自我约束，而是生成式 AI 暂行办法、无障碍环境建设法与国办发〔2020〕45 号下的现行义务。
> 4. 实施起点：近期从慢行断点缝合与限期试点场景开始；三期是三道合并门槛，不是时间表。
> 5. 公共价值：信号是公共信息，人人可读、可申诉、可触发复核；不使用 AI 仍可获得不更慢、不更差的服务。
> 6. 证据状态：全部几何为 provisional；空间指标可由包内几何复算到同一位（EPSG:4548）。
> 7. 决策边界：所有空间与运营建议均为概念建议，不构成法定规划与政府审定结论。

## 1. 设计依据与资料清单

本 formal 方案以北京市规划和自然资源委员会海淀分局发布的《百年京张AI创新带城市设计国际方案征集资格预审公告》为第一依据 [standard:PROJECT-OFFICIAL-ANNOUNCEMENT] [source:OFFICIAL-ANNOUNCEMENT]，以面向全球智能体开源征集任务书为第二依据 [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK] [source:AGENT-TASKBOOK]，并以 `brief/site-package/` 中登记的设计任务书、允许设计空间、来源清单、枚举、规划限制、标准快照与 schema 为机器可读依据 [source:SITE-PACKAGE]。公开来源登记表 `data/source_registry.json` 用于区分 formal-ready、background-only 与 provisional-only 资料 [source:SOURCE-REGISTRY]；处理资料包 `data/processed/agent_fact_pack.md` 只作为阅读导航层，不构成新的权威来源 [source:PROCESSED-FACT-PACK]。

依据 `data/source_registry.json` 的用途边界，本方案只把官方公告、清权任务书、仓库登记标准快照与临时边界作为证据；不使用非公开地图、内部表格、未清权图片或伪造官方背书。公告要求方案达到控制性详细规划的城市设计深度和规划综合实施方案的城市设计深度 [standard:MOHURD-CONTROL-DETAILED-PLANNING]，用地分类按国土空间用地用海分类表达 [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE]，城市设计统筹依据城市设计管理办法 [standard:MOHURD-URBAN-DESIGN-MEASURES]。建筑工程设计深度标准因官方正文尚未纳入仓库，仅登记为待补参照项，不作为已满足的权威依据 [standard:MOHURD-ARCH-DESIGN-DEPTH-2016]。

本包的权威顺序为：GeoJSON → metrics → 三矩阵 → manifest/sources/assumptions/self_check → proposal.md → figures → HTML → PDF。`proposal.md` 是唯一的主语言可读提案，正文中的每个空间判断都可回到图层、指标与来源：边界看 [data:geometry/site_boundary.geojson#SITE-001]，重点区看 [data:geometry/key_areas.geojson#PROV-KEY-001] 至 [data:geometry/key_areas.geojson#PROV-KEY-003]，面积复算看 [metric:site_area_sqm] 与 [metric:key_area_count]，任务响应看 `compliance_matrix.json` [depth:existing_conditions_diagnosis] [depth:risk_missing_data]。

![总体概念、三色信号语言与一脊三核双翼结构](assets/figures/site-overview.png)

## 2. 三层范围工作框架

三层范围共用同一套"公共信号语言"：**绿色 = 可体验（稳定开放）**，**黄色 = 受控测试（试行验证）**，**红色 = 停用或退役（退出与回滚）**。这一语言把抽象的 AI 治理原则转译为街道上可感知、可复核的状态接口，并贯穿统筹研究、总体设计与重点区详细设计三个层次 [source:AGENT-TASKBOOK]。

| 层级 | 设计问题 | 信号语言落点 | 方案回答 | 数据落点 |
| --- | --- | --- | --- | --- |
| 统筹研究范围（约 43.6 平方公里） | AI 产业生态与未来城市形态如何组织 | 建立"策源—验证—开源—体验—治理"的信号链 | 三区两翼协同回路与全球 AI 创新活动体系 | `compliance_matrix.json`、`standard_matrix.json` [depth:three_level_scope_framework] |
| 总体设计范围（约 11.4 平方公里） | 产业空间、城市更新、交通市政与风貌如何落图 | 用地分区按功能着色，信号脊绿带贯通南北 | 用地、建筑、道路、绿地、公共空间与分期图层共同表达 | [data:geometry/land_use.geojson#LU-001]、[data:geometry/roads.geojson#ROAD-001] [depth:overall_spatial_structure] |
| 重点区域范围（约 368.4 公顷） | 三处片区如何达到详细设计深度 | 三座信标：验证（黄）/开源（绿）/体验（红蓝） | 每区给出定位、空间动作、AI 场景与实施依赖 | [data:geometry/key_areas.geojson#PROV-KEY-001]、[data:geometry/key_areas.geojson#PROV-KEY-002]、[data:geometry/key_areas.geojson#PROV-KEY-003] |

边界与重点区当前均为 provisional：`geometry/site_boundary.geojson` 来自仓库维护者登记的粗略 polygon，公告文字四至为北五环、学院路/西土城路、西直门外大街、大钟寺东路/荷清路 [source:BOUNDARY-SOURCE]；三处重点区也是临时位置代理 [source:KEY-AREA-SOURCE]。临时边界面积复算为 [metric:site_area_sqm]，它只检查包内一致性，不替代公告约值或 official polygon；provisional 边界不得作为 official redline、审批、权属、征拆或精确面积依据。official polygons 到位后，须按 `allowed_design_space.json` 的顺序重算全部设计图层与指标 [depth:metrics_recalculation]。

## 3. 统筹研究范围产业与未来城市研究

### 命名、Logo 与三区两翼回路

主名称为"**京张信标**"，英文为 **JINGZHANG BEACON**。命名逻辑取自京张铁路的信号系统：铁路用臂板、色灯与信号旗告诉司机"前方是否可通行"，本方案用同一语义告诉每个进入创新带的人"这里的 AI 服务处于什么状态"。命名体系下设四类信号动作：

- **GREEN / 点亮（可体验）**：稳定、公开、人人可用的人工智能公共服务；
- **AMBER / 闪烁（受控测试）**：试点、评测、限期试行的产业验证场景；
- **RED / 熄灭（停用与回滚）**：试点到期、评测未过、设备退役的退出机制；
- **BEACON / 信标节点**：承载信号语言的城市公共界面与荣誉展示点。

Logo 方向取"一枚立在轨距规上的信号灯"：底座两条平行线象征京张铁路与中国自主创新的历史轨距，灯头三色象征状态语言，灯柱上留一段"人工复核缺口"——所有自动判断都可回到有职责的人。VI 主色为深蓝（可信公共底座）、绿（开放）、琥珀（受控）、红（停用），并提供高对比、触觉与中英图文并置版本；不使用企业商标、人物、铁路现成标志或未经授权字体 [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]。

三大定位被转译为三层内容：百年京张文化带保留"自主、连通、向世界证明"的历史叙事；都市 AI 生活体验带提供可选择、可退出、可申诉的日常服务；AI 融合创新带提供从虚拟评测到受控场景的测试阶梯。五大功能分别落在：众智园的全栈自主与治理验证（黄灯主场）、AI 原点的世界级创新生态与开源体系（绿灯主场）、大钟寺与小月河方向的 AI+ 场景与智能原生消费（红蓝体验）、整条信号脊的 AI 活力城市、中关村科技服务翼的资本/知识产权/算力/数据/合规接口。三区不是三个孤岛，两翼也不是单向输送通道：公共问题向北进入研发验证，失败与改进意见向南回到城市生活，构成闭环 [source:AGENT-TASKBOOK]。

### 七个全球机制案例

本方案只借鉴机制，不移植形象、不声称案例方认可本方案：

| 案例 | 可转化机制 | 京张信标落点 |
| --- | --- | --- |
| 英国 Arup 智慧城市与城市信号系统 | 把城市运行状态做成可读仪表盘与公众界面 | 三色信号语言与信标广场 [source:CASE-ARUP-SIGNAL] |
| 新加坡 Punggol Digital District | 先在数字平台验证运营与空间协同再落地 | 总体层先模拟、再小规模试点 [source:CASE-SG-PDD] |
| 欧盟 Testing and Experimentation Facilities（TEF） | 虚拟、受控、真实环境逐级测试 | 众智园黄灯三级验证门 [source:CASE-EU-TEF] |
| NIST AI Risk Management Framework | 治理、映射、测量、管理形成持续风险循环 | 场景卡最低门槛与三色状态审计 [source:CASE-NIST-AI-RMF] |
| 赫尔辛基 Kalasatama 敏捷试点 | 居民、企业与研究者共同定义小额敏捷试点 | AI 原点共同转译场与限期试点 [source:CASE-FI-KALASATAMA] |
| 伦敦国王十字 King's Cross 公共空间运营 | 站城一体公共空间与活动运营机制 | 大钟寺站前四象限与信号脊活动路线 [source:CASE-KX-PUBLIC] |
| 杭州城市大脑与公众反馈闭环 | 城市数字平台与人工复核相结合的治理回路 | 信标节点的人工复核缺口与申诉入口 [source:CASE-HZ-CITY-BRAIN] |

案例数量为 [metric:global_case_study_count]。生态图谱由八个可审查接口组成：土地提供可逆载体、空间提供分级边界、产业提出真实问题、资金支持限期原型、人才跨界组队、算力按风险分级、数据最小化、场景由使用者和运营者共同结项。任何接口都写明申请者、维护者、复核者、期限、退出条件与公共知识输出；不编造企业名单、投资额、产值或政策承诺 [depth:phasing_implementation]。

### 区域创新协同：信号接力

任务书要求体现与北纬社区、未来科学城、怀柔科学城、经开区及京津冀的创新协同 [source:AGENT-TASKBOOK]。本方案把协同组织为一条**信号接力**（概念建议）：未来科学城与怀柔科学城承担基础研究与源头创新，是信号链的"策源端"；一带之内，众智园完成全栈验证（验证端）、AI 原点完成开源转化（开源端）、大钟寺完成体验与消费放大（体验端）；经开区与京津冀城市群承接制造化、规模化落地场景，是"放大端"；北纬社区作为带上的生活配套与人才中转节点。接力的规则沿用信号语言：成果在上游节点转绿（验证通过、权属清晰、许可齐备）后才进入下一节点，红灯成果就地回滚、不向下游转嫁风险。区域协同只表达机制方向，不构成任何跨区投资、政策或实施承诺。

### 区级公开统计：用来收敛问题，不用来制造目标

依据公开发布的《北京市海淀区 2025 年国民经济和社会发展统计公报》（2026-04-10 发布）[source:SRC-HAIDIAN-STATS-2025]，三条可核验发现各自收敛了一个设计判断，并写明它不能证明什么：

- 备案上线大模型 123 款（约占全市六成）→ 验证场景按"备案—评估—受控上线—退出"组织，与众智园三级验证门对应；不能证明这些模型位于一带之内或愿意参与。
- 在区全国重点实验室 92 家 → 本带不重复建设研究能力，只承担成果交出与独立验证的接口（信号接力的"策源—验证"交接）；不能证明其会使用本带设施。
- 常住人口 311.1 万人 → 更新不以人口增长为前提，空间供给跟随信号状态而非规模预测。

全部区级统计只作背景参考（evidence_class=background_only，not_spatially_allocable=true）：不进入 `metrics.json`，不改变任何几何、面积、线位与分期——区级口径无法分配到 43.6 平方公里的走廊，方案因此"给出口径而不给出数值"。

## 4. 总体设计范围城市更新与控规深度城市设计

总体设计不从"新建多少"开始，而从"哪些判断必须先公开"开始。35 个共享边界用地单元完整覆盖临时 site，形成西侧科技服务、中部信号脊绿带、东侧科研生活、南北门户留白交替的结构 [data:geometry/land_use.geojson#LU-001] [depth:land_use_layout]。用地以国土空间分类表达：科研用地（0802）集中于众智园与原点两侧 [data:geometry/land_use.geojson#LU-013]、[data:geometry/land_use.geojson#LU-011]，商业服务业用地（05）沿门户与产业带分布 [data:geometry/land_use.geojson#LU-001]、[data:geometry/land_use.geojson#LU-035]，居住用地（0701）组织为小月河翼生活片 [data:geometry/land_use.geojson#LU-029]，文化用地（0803）锚定大钟寺文化体验 [data:geometry/land_use.geojson#LU-009]，教育用地（0804）服务中段教育科研 [data:geometry/land_use.geojson#LU-024]，留白用地（16）保留北门户弹性 [data:geometry/land_use.geojson#LU-014]。该分区用于验证功能组合、连续开放空间和拓扑，不代表现状或法定用地；official parcel 与控规到位后须重构。

更新采用"**限期试点—年度评估—扩大或退役**"方法，与三色信号语言一一对应：绿灯服务直接开放并接受申诉；黄灯试点明确期限、测评与人工复核；红灯试点到期后评估、整改或退役，设备可拆除、数据可回滚 [depth:retain_renovate_demolish]。概念建筑基底由非开放空间用地内缩生成，仅测试空间容量，不表示现实建筑，也不作逐栋保留、改造、拆除或新建结论 [data:geometry/buildings.geojson#BLDG-001]。逐栋深化必须先补年代、结构、用途、权属、文保、消防、日照与全生命周期碳评估 [depth:development_intensity_controls]。

建筑高度、总建筑面积、容积率、退线与密度控制缺官方依据，保持 unknown [metric:floor_area_ratio] [metric:building_height_max_m]；本方案只提出风貌方法：沿信号脊保持首层开放、低位信息面、可拆组件和连续檐下空间，避免以高塔、大屏或仿古构件替代公共性。精确高度、体量、屋顶、色彩和界面需在正式控规与文保资料下由专业团队深化 [depth:height_massing_character] [standard:MOHURD-CONTROL-DETAILED-PLANNING]。

市政与新型基础设施遵循"可维护、可断网、可退役"：端侧算力与传感设备共用可拆设备带，保留基本照明、座椅、厕所、饮水与无障碍通行；每件设备建立责任人、能耗、断网行为、人工替代和退役日期 [depth:municipal_new_infrastructure]。因缺管线、能源、消防、防洪和排涝资料，本稿不作容量或工程线位结论。

总体设计的底层机制是**信号机制体系**：空间、设施、场景、活动四类对象统一接入绿/黄/红状态体系，形成"发布（绿）—试点（黄）—退役（红）"的闭环；每次状态变更都留下记录、责任人与人工复核缺口。这套机制体系让更新项目清单、分期计划与指标复算共用同一套状态语言，也使方案本身成为可被继续深化的开放体系而非一次性蓝图 [depth:overall_spatial_structure]。

### 空间产业融合：信号格网的产业职能

任务书规划创新性维度要求对空间产业融合提出有价值思路 [source:AGENT-TASKBOOK]。本方案的回答是：产业不按"地块"一次配齐，而按**信号状态**动态供给——用地分区提供载体，信号层决定供给方式：

| 用地分类 | 信号格网中的产业职能 | 供给方式 |
| --- | --- | --- |
| 科研用地 0802 | 验证与策源载体（众智园验证门、原点开源街区） | 长期稳定供给；黄灯试验空间按期限供给 [data:geometry/land_use.geojson#LU-013] |
| 商业服务业用地 05 | 体验与消费界面（大钟寺站前、门户场景街） | 绿灯服务稳定开放；场景空间随信号审计更替 [data:geometry/land_use.geojson#LU-001] |
| 居住用地 0701 | 生活承载（小月河翼生活片） | 服务嵌入社区；无 AI 等价路径保底 [data:geometry/land_use.geojson#LU-029] |
| 公园绿地 1401 | 公共信号界面（信号脊、信标广场） | 全时开放；组件可拆可撤 [data:geometry/green_space.geojson#GREEN-001] |
| 留白用地 16 | 信号状态待定的弹性载体（北门户） | 留白至信号状态明确，不预置功能 [data:geometry/land_use.geojson#LU-014] |

融合规则有三条：其一，黄灯产业空间限期供给——试点到期即评估，扩绿或转红，不形成事实上的永久占用；其二，绿灯服务空间稳定供给——公共服务的空间承诺不因运营方更替而中断；其三，红灯空间可收回再配置——退役设施拆除后，载体回到可再分配状态。空间供给跟随产业信号的状态而非一次锁定的招商图纸；本机制不构成招商、投资或产值承诺 [depth:land_use_layout]。

## 5. 重点区域详细设计

三处重点区以三座信标组织，共用"先公开、后运行"的门槛：每个 AI 场景进入前都要回答"为谁服务、使用什么数据、谁来复核、失败如何退出、公共收益如何留下" [depth:three_key_area_detailed_design]。三处临时 polygon 的包内复算面积分别约 192.9 万㎡（众智园）、104.3 万㎡（AI 原点）与 72.0 万㎡（大钟寺），合计 [metric:key_area_total_sqm]，与公告公开的约 192.1 / 104.3 / 72.0 公顷接近，说明临时位置的量级合理；official polygon 到位后以官方边界重算 [data:geometry/key_areas.geojson#PROV-KEY-001] 至 [data:geometry/key_areas.geojson#PROV-KEY-003]。

![三座信标：验证（黄）、开源（绿）、体验（红蓝）与信号脊连接](assets/figures/key-areas.png)

### 5.1 众智园验证信标｜AMBER｜全栈自主验证区（约 192.9 万㎡）

众智园承担"AI 全栈自主创新体系与 AI 治理全球话语权" [source:AGENT-TASKBOOK]。空间结构为"清河界面—验证中轴—科研单元"：清河一侧组织低碳创新廊 [data:geometry/green_space.geojson#GREEN-004]（依生成 id 对应信号脊北段 [data:geometry/green_space.geojson#GREEN-007]），中轴设验证信标广场 [data:geometry/public_space.geojson#PUBLIC-001]，两侧为科研用地 [data:geometry/land_use.geojson#LU-013]、[data:geometry/land_use.geojson#LU-027] 与商业服务 [data:geometry/land_use.geojson#LU-034]。验证门按黄灯三级组织：虚拟评测 → 受控实验室 → 真实街区试点；每个试点有期限、有测评、有人工复核、有退出通道。建筑以 AI 研发与孵化器为主 [data:geometry/buildings.geojson#BLDG-001]，概念基底不表示现实建筑；对外交通、清河界面与跨环路节点需待道路红线和工程条件确认 [depth:traffic_rail_slow_parking]。实施风险主要是 official polygon、控规指标与清河蓝线未到位 [depth:risk_missing_data]。

### 5.2 AI 原点开源信标｜GREEN｜近校开源社区（约 104.3 万㎡）

AI 原点社区承担"世界级 AI 创新生态"与开源体系 [source:AGENT-TASKBOOK]。空间结构为"校区—园区缝合轴—开源广场—生活片"：开源信标广场 [data:geometry/public_space.geojson#PUBLIC-002] 组织成果发布、代码贡献展示与共同转译；科研用地 [data:geometry/land_use.geojson#LU-011]、[data:geometry/land_use.geojson#LU-025] 承载孵化与协作，教育用地与生活片 [data:geometry/land_use.geojson#LU-032] 服务人才居住。近校成果转化街提供孵化、展示、法务、知识产权与投融资服务，强调"先开源、后转化"的机制：公共知识进入公共库，成果按许可回馈社区 [source:AGENT-TASKBOOK]。慢行缝合、轨道站点一体化与建筑拆改留需待校区边界、权属与首层业态确认。

### 5.3 大钟寺体验信标｜RED-BLUE｜智能原生体验区（约 72.0 万㎡）

大钟寺承担"智能原生新业态"与城市入口、国际交流 [source:AGENT-TASKBOOK]。空间结构为"站前四象限—文化体验片—商业服务环"：体验信标广场 [data:geometry/public_space.geojson#PUBLIC-003] 设多语导览、AI 权利说明与人工服务；文化用地 [data:geometry/land_use.geojson#LU-009] 组织智能原生内容与数字资产展示，商业用地 [data:geometry/land_use.geojson#LU-002]、[data:geometry/land_use.geojson#LU-023] 承载消费与商务，站前绿带 [data:geometry/green_space.geojson#GREEN-002] 复合规划绿地与公共活动。轨道接驳只提出四象限步行连续、非机动车有序停放和清楚换乘的方向性策略，待道路红线、客流、出入口和市政资料核验 [depth:traffic_rail_slow_parking]。所有体验场景均以"可选择、可退出"为底线：不使用 AI 仍可获得基本服务，高影响判断回到人工。

## 6. AI 原生城市形态与规划方法（信号态城市）

公告要求正面回答 AI 如何改变城市形态与规划方法 [standard:PROJECT-OFFICIAL-ANNOUNCEMENT]。京张信标的回答是：当 AI 成为城市基础设施，改变的不是天际线，而是空间的**状态层**——城市获得一套可读、可复核、可回滚的运行界面 [source:AGENT-TASKBOOK]。

### 6.1 城市形态：从静态分区到信号格网

城市功能要素（算力节点、场景设施、数据服务、公共设施）在本方案中被组织为**可寻址的信号节点**：每个要素有位置、有状态（绿/黄/红）、有责任主体、有生命周期。空间组织方式因此从"一次画定、长期不变"转向"可寻址、有状态、可替换"的信号格网；用地分区提供载体，信号层提供状态，两层分轨表达、互不冒充。

AI 同时改变生产方式与生活方式，并要求对应的空间响应：模型训练与仿真替代部分实体中试，需要可封闭、可计量、可停机的小型试验空间而非大跨厂房（对应众智园三级验证门）；机器人配送进入首层，需要人机分流的到达界面与受控货运时段（对应大钟寺四象限试点）；端侧算力分散到街区，市政从集中机房转向可拆设备带与独立计量。生活方式上，居民通过信号选择服务：信号是公共信息，不是个性化推荐；不使用智能终端的人群保有**不更慢、不更差的无 AI 等价路径**，这是体验信标的底线设计 [depth:three_key_area_detailed_design]。

由此给出**自适应、可进化的城市发展模式**的可操作定义：把城市更新当作有版本、可回滚的信号提交——绿灯发布相当于合并上线，黄灯试点相当于评审中，红灯停用相当于回滚。三期不是时间表，而是三道合并门槛：数据、权属与专业评估全部通过才允许进入下一阶段，未过就回滚到上一个可用状态。一座不能撤销自己决定的城市，不可能自适应。

### 6.2 可感知、可交互与感知边界

**可感知**：三色信号就是感知界面，状态是人人可读的公共信息，不依赖 App、不依赖账号。**可交互**：每个信号节点带申诉、复核与回退入口（人工复核缺口），交互的结果是状态变更并留下记录。可感知不等于监控，本方案划出感知边界：只采集设备状态、聚合拥挤度与路面障碍；不采集人脸、身份与个人轨迹；不做身份通行优先级、不做动态定价、不以装 App 为通行前提 [source:AGENT-TASKBOOK]。

### 6.3 多智能体协作：四角色制衡

共创宪章要求鼓励多智能体协作，并接受智能体方案被筛选排序、最终判断由人完成 [source:AGENT-TASKBOOK]。本方案把协作落为四角色分工制衡：**生成**（智能体设计与迭代）、**验证**（脚本与第三方可复现复核）、**复核**（维护者与专业团队）、**异议**（公众申诉与 Issue 讨论）。四角色不得由同一方兼任，生成方不得自证，任何一方可触发停用，最终判断归人。本方案本身即这套流程的产物：智能体生成、脚本验证、维护者复核、公众可异议。

### 6.4 规划方法与国土空间规划创新

综合规划内涵与国土空间规划创新收敛为三条主张：**其一，信号态规划成果**——规划成果从静态图册变为可复算数据包（GeoJSON → metrics → 三矩阵 → 可读文本），任何数字都能回到几何、公式与假设；**其二，双轨表达**——设计结论（概念层）与法定控制（控规层）始终分栏，互不冒充，法定指标缺依据就保持 unknown；**其三，把"不知道"写进成果**——未知项连同口径与触发条件一起登记（如 [metric:floor_area_ratio]、[metric:building_height_max_m]），官方数据到位即触发整包重算。与数字孪生的区别在于：不追求实时镜像，只追求可复算与可审计 [depth:metrics_recalculation]。

## 7. AI 创新生态、人才画像与 AI+ 场景

AI 创新生态按"策源、验证、开源、体验、治理"五段组织，与三区两翼一一对应 [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]。本方案形成 5 类用户画像：

| 用户画像 | 典型需求 | 空间响应 | 自检边界 |
| --- | --- | --- | --- |
| 开源开发者 | 发布、协作、测试、社区声誉 | 原点开源广场、公共代码墙、夜间协作空间 | 不采集个人行为轨迹；活动数据只做聚合统计 |
| 初创与科研团队 | 低成本办公、算力入口、产品试验场 | 众智园共享测试场、端侧算力服务点、验证门 | 算力和数据服务需另行授权 |
| 头部企业与国际访客 | 展示、商务、国际接待、人才招聘 | 大钟寺站前复合界面、信标广场、国际路演客厅 | 企业标识和案例须清权 |
| 周边居民 | 通勤、休闲、社区服务、低扰动更新 | 信号脊慢行环、社区服务嵌入、活动分级 | 不将居民画像用于商业推荐 |
| 高校师生 | 成果转化、跨校协作、日常慢行 | 校区-园区缝合、成果转化街、AI 教育体验点 | 校园数据和科研成果需授权 |

用户画像数量为 [metric:user_persona_count]。AI 场景卡（概念）共 12 张，其中至少 3 张为产业测试验证场景 [metric:ai_scenario_node_count] [metric:ai_test_scenario_count]：

| 编号 | 场景卡 | 空间载体 | 场景类型 | 状态信号 |
| --- | --- | --- | --- | --- |
| SC-01 | 开源发布厅 | AI 原点开源广场 | 社区运营场景 | 绿 |
| SC-02 | 模型评测与红队沙盒 | 众智园验证信标广场 | **产业测试验证场景** | 黄 |
| SC-03 | 端侧算力驿站 | 信号脊公共服务节点 | 新基建场景 | 绿/黄 |
| SC-04 | AI 慢行导航 | 信号脊绿道 [data:geometry/roads.geojson#ROAD-006] | 公共服务场景 | 绿 |
| SC-05 | 大钟寺国际路演客厅 | 大钟寺站前复合界面 | 产业服务场景 | 绿 |
| SC-06 | 清河低碳创新廊 | 众智园临清河界面 | 绿色场景 | 黄 |
| SC-07 | 近校成果转化街 | AI 原点社区 | 产业孵化场景 | 绿 |
| SC-08 | 数据要素会客厅 | 大钟寺片区 | 数据治理场景 | 黄 |
| SC-09 | AI 生活服务样板街 | 社区与商业交汇处 | 公共服务场景 | 绿 |
| SC-10 | 全球 AI 活动周路线 | 信号脊公共空间系统 | 运营活动场景 | 绿 |
| SC-11 | 全栈模型受控试运营 | 众智园受控实验室 | **产业测试验证场景** | 黄 |
| SC-12 | 城市智能体公开审计台 | 众智园治理展示节点 | **产业测试验证场景** | 黄/红 |

每个场景卡说明服务对象、空间位置、运行数据、隐私边界、人工复核、运营主体与风险，并进入 `compliance_matrix.json` 与 `visual/index.html` [depth:metrics_recalculation]。上表即**场景-空间-运营映射**：每张卡同时给出空间载体、信号状态与运营要求（期限、评测、人工复核、退出通道），重点回应小月河场景赋能翼的公共体验路径；映射可随官方资料继续深化。所有场景均为概念建议，不构成已批准运营；隐私与数据使用遵循数据最小化、公开来源、可解释和人工复核原则 [source:AGENT-TASKBOOK]。城市智能体可辅助识别慢行断点、公共空间热力、设施维护与活动安全风险，但不能替代规划审批、不能输出未经授权的个人画像、不能声称获得官方实施承诺。

## 8. 用地、建筑规模与拆改留方案

用地方案依据 [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE] 表达，35 个用地单元完整覆盖临时 site 且无重叠无缝隙（包内复算覆盖率 100%，用地单元数 [metric:land_use_count]）[data:geometry/land_use.geojson#LU-001] [metric:land_use_area_sqm]。

![概念用地结构与三层范围传导](assets/figures/land-use-structure.png)

用地结构以科研（0802，约 341.6 万㎡）、商业（05，约 256.2 万㎡）与居住（0701，约 251.0 万㎡）为主体 [metric:land_use_0802_sqm] [metric:land_use_05_sqm] [metric:land_use_0701_sqm]，绿地（1401）约 129.5 万㎡ 沿信号脊组织 [metric:green_space_area_sqm]，留白（16）约 83.0 万㎡ 保留北门户弹性。

概念建筑基底共 107 个单元，总面积约 362.3 万㎡，建筑密度约 0.32 [metric:building_footprint_area_sqm] [metric:building_density]；它们只用于验证空间容量与产业空间供给逻辑，不表示现实建筑，也不作逐栋拆改留结论 [depth:retain_renovate_demolish]。建筑功能以 AI 研发、办公、孵化器与居住为主 [data:geometry/buildings.geojson#BLDG-001]。容积率、建筑高度、密度、退线与绿地率等法定指标缺官方控规条件，保持 unknown 或待确认，不制造精确感 [metric:floor_area_ratio]。

## 9. 交通、轨道、市政与公共服务设施

交通方案回应轨道站点一体化、道路微循环、慢行断点、停车与非机动车组织 [depth:traffic_rail_slow_parking]。概念道路网含次干路、支路与绿道共约 32.4 公里 [metric:road_length_m]，其中信号脊绿道约 9.7 公里 [metric:greenway_length_m] [data:geometry/roads.geojson#ROAD-006]。重点覆盖大钟寺站四象限步行连通、五道口与清华东路西口慢行衔接、京张遗址公园跨环路节点；所有道路均为方向性策略，道路红线、断面与交叉口渠化需待官方道路资料确认 [source:BOUNDARY-SOURCE]。

市政与公共服务设施覆盖创新服务平台、人才生活服务、新型基础设施、分布式能源与端侧算力 [depth:municipal_new_infrastructure]；缺少管线、能源、排水、防洪、消防等工程资料，列为正式深化前置条件 [depth:risk_missing_data]。

![交通慢行与蓝绿公共空间复合系统图](assets/figures/mobility-bluegreen.png)

## 10. 蓝绿空间、公共空间与城市风貌

蓝绿空间以京张遗址公园信号脊为骨架 [data:geometry/green_space.geojson#GREEN-001] 至 [data:geometry/green_space.geojson#GREEN-007]，统筹清河、小月河与南北门户绿楔 [data:geometry/green_space.geojson#GREEN-001]、[data:geometry/green_space.geojson#GREEN-007] [depth:blue_green_public_space]。信号脊绿带同时承担**东西缝合、南北连通**：南北方向贯通慢行与活动走廊，东西方向以缝合轴连接校区、园区与站点，打通既有铁路遗存造成的东西割裂。绿地比例约 11.3% [metric:green_ratio]，三座信标广场约 4.1 万㎡ [metric:public_space_area_sqm] [metric:public_space_ratio] [data:geometry/public_space.geojson#PUBLIC-001] 至 [data:geometry/public_space.geojson#PUBLIC-003]，与慢行、活动与 AI 展示复合利用 [standard:MOHURD-URBAN-DESIGN-MEASURES]。

**公共空间组件库**（概念）：信号灯柱、信号信息亭、信号铺装带、状态展示屏与无障碍读信设施组成一套可组合的组件库。所有组件遵循可拆、可撤、可退役原则，共用可拆设备带与独立计量；停用即恢复素状，不留下不可逆的城市痕迹；组件规格、材质与文保相容性待专业团队深化 [depth:blue_green_public_space]。

**荣誉展示体系**（概念）：开源原点石铭刻开源贡献者，贡献者墙记录方案、数据与工具的公共知识沉淀，年度信标点亮仪式纪念城市信号的运营者与复核者；荣誉展示只记录公共贡献，不做商业冠名，不与一带整体 Logo 系统混淆 [source:AGENT-TASKBOOK]。

城市风貌融合京张铁路历史、中关村创新文化与 AI 新文化，形成三个 AI 朝圣地标（概念）[metric:ai_pilgrimage_landmark_count]：

1. **信标灯塔**（众智园）：立于清河界面的可攀登公共灯塔，以三色灯光实时反映园区 AI 服务状态，既是地标也是状态公告屏；
2. **开源原点石**（AI 原点社区）：面向开源贡献者的荣誉节点，铭刻贡献者与公共知识沉淀，承载"贡献可记忆"原则 [source:AGENT-TASKBOOK]；
3. **钟寺信号钟**（大钟寺）：站前广场的可触摸信号钟，把"可体验/受控/停用"状态转译为多语言公共提示。

地标、导视、Logo、字体、图像与人物标识全部清权；不把概念地标写成已批准建设，不追求网红化、低俗化 [source:AGENT-TASKBOOK]。

## 11. 更新项目清单、实施政策与分期计划

实施方案以 `geometry/phasing.geojson` 的三期空间表达 [data:geometry/phasing.geojson#PHASE-01] 至 [data:geometry/phasing.geojson#PHASE-07] [depth:renewal_project_list] [depth:phasing_implementation]：

| 项目编号 | 项目名称 | 类型 | 分期 | 主要依赖 | 证据引用 |
| --- | --- | --- | --- | --- | --- |
| JZ-01 | 京张信号脊慢行断点缝合 | 公共空间/交通 | 近期 | 道路红线、桥下空间复核 | [data:geometry/roads.geojson#ROAD-006] |
| JZ-02 | 众智园清河低碳创新界面 | 蓝绿空间/产业展示 | 近期 | 清河蓝线、防洪条件 | [data:geometry/green_space.geojson#GREEN-004] |
| JZ-03 | 原点近校成果转化街 | 城市更新/产业服务 | 近期 | 校区边界、权属、首层业态 | [data:geometry/buildings.geojson#BLDG-001] |
| JZ-04 | 大钟寺站四象限步行连通 | 轨道一体化/慢行 | 中期 | 站点、道路交叉口、市政管线 | [data:geometry/public_space.geojson#PUBLIC-003] |
| JZ-05 | 三座信标广场实施 | 公共空间/品牌 | 中期 | 用地许可、活动安全、版权清权 | [data:geometry/public_space.geojson#PUBLIC-001] 至 [data:geometry/public_space.geojson#PUBLIC-003] |
| JZ-06 | AI 公共服务与端侧算力节点 | 新基建/公共服务 | 中期 | 能源、算力、安全与运营主体 | [data:geometry/constraints.geojson#CONSTRAINT-01] 至 [data:geometry/constraints.geojson#CONSTRAINT-03] |
| JZ-07 | 全球 AI 活动周公共路线 | 运营/品牌 | 远期 | 公共空间许可、活动安全 | [data:geometry/phasing.geojson#PHASE-01] |

### 全球 AI 创新活动体系与长期运营（概念建议）

- **年度活动体系**：以"京张信标节"为年度主线，分春（开源共创周）、夏（受控测试季）、秋（成果发布周）、冬（治理评议周）四季节奏；所有活动为概念建议，不表述为已确定政府安排 [source:AGENT-TASKBOOK]。
- **活动品牌与传播视觉系统**：以三色信号灯为视觉母题，扩展为中英双语、高对比与触觉版本，与一带 Logo 系统区分但不冲突。
- **开发者社区运营**：按"进站（Onboarding）—换乘（Transfer）—发车（Release）—正点（On-time）"四段组织，明确贡献路径、评审门槛与公共知识输出。
- **AI 场景开放运营**：场景开放日、限期试点、公开结项与退役公示，配合三色状态审计台。
- **公共体验与城市地标运营**：信标灯塔、原点石、信号钟作为长期品牌资产，附维护与退役机制。
- **国际传播与招引转化机制**：把"可体验/受控/停用"的状态透明度作为城市治理话语，吸引全球开发者、企业与治理者参与；招商、资金与政策均写为概念方向，不构成承诺。

**实施主体与年度评估**（概念建议）：政府与专业团队深化法定层与工程条件；企业与高校共建场景和试验空间；居民与开发者通过申诉、复核与活动参与评估；维护者与评审团队负责证据链与状态审计。年度评估指标建议为可衡量项：场景开放数量、试点按期完成率、申诉响应时长、回滚执行率、公共空间活动场次与满意度抽样；全部指标需运营数据持续校准，本稿只给出指标框架，不预设目标值 [depth:renewal_project_list]。

### 落位清单与深化移交（空间明确性与可转化性）

任务书补充维度要求说明方案适合落在哪些片区、节点或空间类型，以及能否被专业团队继续深化 [source:AGENT-TASKBOOK]。本方案逐项给出落位与移交对象：

| 方案成果 | 适合落位（片区/节点） | 空间类型 | 前置依赖 | 深化接收方 |
| --- | --- | --- | --- | --- |
| 三级验证门 | 众智园验证中轴与受控实验室簇 [data:geometry/key_areas.geojson#PROV-KEY-001] | 科研用地 + 试验空间 | 官方边界、控规条件 | 专业规划团队 + 技术测评机构 |
| 开源广场与成果转化街 | AI 原点校区—园区缝合轴 [data:geometry/key_areas.geojson#PROV-KEY-002] | 公共空间 + 首层业态 | 校区边界、权属 | 运营团队 + 知识产权/法务服务 |
| 四象限步行连通与体验广场 | 大钟寺站前四象限 [data:geometry/key_areas.geojson#PROV-KEY-003] | 站域公共空间 | 道路红线、客流、出入口 | 轨道与城市设计团队 |
| 信号脊绿道与组件库 | 京张遗址公园及两侧 [data:geometry/green_space.geojson#GREEN-001] | 蓝绿空间 | 文保控制、蓝线 | 景观团队 + 文保顾问 |
| 信号态平台与审计台 | 包内数据层（GeoJSON/metrics/审计记录） | 数字成果 | 无（已可运行） | 开发者社区 + 维护者复核 |
| 合规基线映射 | 全部信号节点运营机制 | 制度接口 | 法规更新跟踪 | 法务/合规团队 |

移交原则：本包交付的是机制、接口与证据链；量化、法定化与工程化留给后续专业团队，任何接收方都可在官方数据到位后重算并覆盖本包的 provisional 结论 [depth:renewal_project_list]。

### 七个交付问题：专业交接表

为便于维护者与接收团队在不开包通读全文的情况下完成交接，本方案把交接必须回答的七个问题逐一落到可核验对象与下一责任位；每行的“可核验对象”均可在本包内直接打开复核 [depth:renewal_project_list]：

| 交付问题 | 本包的回答 | 可核验对象 | 下一责任位 |
| --- | --- | --- | --- |
| 任务贴合：是否覆盖任务书全部必选任务？ | 六项必选任务全覆盖，逐条映射 | `compliance_matrix.json` requirements 全条目 | 维护者 intake 复核 |
| 原创与可复现：结论能否被第三方重算？ | 全部空间指标可由提交几何用 `scripts/spatial_review.py` 复算到同一位 | `metrics.json` 复算值 + `geometry/*.geojson` | 专业测绘/规划团队按官方边界重算 |
| AI—空间耦合：AI 机制如何落到空间？ | 三色信号分级到三级空间载体（实验室/街区/公共界面） | 第 5 章重点区 + `geometry/key_areas.geojson` | 运营团队 + 技术测评机构 |
| 实施入口：第一步从哪里开始、谁批准？ | 一期以众智园验证中轴为入口，五问门槛逐项过闸 | 第 11 章分期计划 + 落位清单 | 政府与专业团队深化法定层 |
| 公共利益：公共收益如何留下、损害如何救济？ | 申诉入口与人工复核缺口随每个信号节点配置，回滚即救济 | 第 13 章合规基线 + 风险矩阵 | 运营团队 + 法务/合规团队 |
| 风险与约束：什么不知道、什么不可做？ | 几何 provisional、控规 unknown，逐条登记原因 | `assumptions.json` + 风险矩阵 R-01~R-04 | 官方数据供给方 + 复核团队 |
| 继续深化：接收方拿到后做什么？ | 官方 polygon 到位后的整包重算序列已写明 | 第 1 章替换序列 + 落位清单移交对象列 | 下一轮迭代参与者 |

交接表不新增任何承诺：所有“下一责任位”都是建议性的深化接收方，正式责任分配以法定程序为准 [source:AGENT-TASKBOOK]。

## 12. 指标体系、面积复算与合规矩阵

指标体系包含空间指标（可由提交几何直接复算）、管控指标（需官方控规支撑）与绩效指标（需运营数据持续校准）三类 [depth:metrics_recalculation]。空间指标保留完整复算值（如场地面积 11,412,825.386 ㎡ [metric:site_area_sqm]）；小数位的含义是"第三方可用同一几何复现到同一位"，不代表外部事实具有同等精度，也不因此把约数改写成伪精确：

- **空间指标（known）**：总体设计范围面积 [metric:site_area_sqm]、重点区面积 [metric:key_area_total_sqm]、用地覆盖 [metric:land_use_area_sqm]、建筑基底 [metric:building_footprint_area_sqm]、建筑密度 [metric:building_density]、绿地面积与比例 [metric:green_space_area_sqm] [metric:green_ratio]、公共空间面积与比例 [metric:public_space_area_sqm] [metric:public_space_ratio]、道路与绿道长度 [metric:road_length_m] [metric:greenway_length_m]、三期面积 [metric:phase_1_area_sqm] [metric:phase_2_area_sqm] [metric:phase_3_area_sqm]；
- **管控指标（unknown）**：容积率 [metric:floor_area_ratio]、建筑高度 [metric:building_height_max_m]，缺官方控规条件，原因已登记；
- **绩效指标（known 计数）**：AI 场景卡 [metric:ai_scenario_node_count]、测试验证场景 [metric:ai_test_scenario_count]、用户画像 [metric:user_persona_count]、朝圣地标 [metric:ai_pilgrimage_landmark_count]、全球案例 [metric:global_case_study_count]。

`compliance_matrix.json` 逐条覆盖公告 1.3、1.4、1.5 与 agent.1–agent.6 全部必选任务，每条映射到报告章节、图层、指标、图纸、HTML 页面、来源、假设与自检项；`standard_matrix.json` 覆盖全部必选专业标准；`design_depth_matrix.json` 全部必选深度项标记为 complete。`scripts/spatial_review.py` 与 `scripts/visual_review.py` 的结果作为 formal 自检证据，指标与 HTML 显示值保持一致 [data:geometry/site_boundary.geojson#SITE-001]。

![核心指标复算与三色信号证据链](assets/figures/metrics-evidence.png)

## 13. 风险、版权与合规说明

### 风险矩阵

| 风险 | 本轮处理 | 进入深化的必要动作 | 登记编号 |
| --- | --- | --- | --- |
| 官方边界与重点区 polygon 缺失 | 全部标注 provisional_constraint，指标只证包内一致性 | 官方数据到位后整包重算 [depth:risk_missing_data] | R-01 |
| 控规指标缺失（容积率/高度/密度） | 保持 unknown 并登记原因 [metric:floor_area_ratio] | 依审定控规条件深化 | R-02 |
| 道路红线、权属、文保、市政容量缺失 | 全部降级为方向性策略 [data:geometry/constraints.geojson#CONSTRAINT-01] | 工程与权属资料齐备后复核 | R-03 |
| 外部数据许可与复用条款 | 只用公开/清权资料，逐条登记 [source:SITE-PACKAGE] | 持续核查并登记变更 | R-04 |

### 故障演练设计：48 小时合成联调（桌面推演，未实际执行）

红灯机制的可信度取决于“停用与回滚”是否真的可执行。本方案设计一场 48 小时合成联调作为深化移交的演练剧本：**不接触公众、不使用真实个人数据、不连接真实城市系统**，仅在测试环境对信号机制本身注入四类故障，验证三色信号的状态迁移是否如设计收敛 [depth:risk_missing_data]：

| 故障注入 | 期望信号迁移 | 验证点 | 退出与恢复 |
| --- | --- | --- | --- |
| F1 服务不可用（模型接口中断） | 绿→黄→红，界面即时降级为人工指引 | 降级公告是否在时限内发出、人工等价路径是否可用 | 恢复后重新过虚拟评测再回绿灯 |
| F2 评测不通过（输出质量/安全未达标） | 黄→红，试点资格即刻冻结 | 冻结动作是否可一键执行、是否留审计记录 | 整改后从黄灯重新申请 |
| F3 用户申诉升级（集中投诉） | 红灯复核，人工接管并暂停自动决策 | 申诉入口可达性、响应时限、人工复核记录 | 复核结论公示后决定恢复或退役 |
| F4 数据撤回（参与方收回数据授权） | 相关场景整体回滚，派生数据可删除 | 回滚脚本可执行性、数据最小化是否成立 | 重新取得授权前保持停用 |

演练要求由未参与本方案设计的团队复演并出具偏差清单；演练结论、偏差与整改都应写入公开记录。本节是演练设计而非执行结果——本包不声称已运行该演练，实际执行需要运营方、测评机构与监督方在场 [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]。

### 合规基线：三条红线的法定依据

方案的三条红线——任何智能服务必须可停止、申诉入口必须便捷且有时限、不使用 AI 者保有等价路径——不是设计者的自我约束，而是现行法规下的义务；本节把红线逐条锚定到依据，只引条款要义与出处，不构成法律意见：

| 本方案红线 | 现行依据 | 依据要点 | 空间与运营落位 |
| --- | --- | --- | --- |
| 任何智能服务必须可停止 | 《生成式人工智能服务管理暂行办法》第十四条（七部门联合发布，2023-08-15 施行）[source:STATUTORY-GENERATIVE-AI-MEASURES] | 发现违法内容应及时停止生成、停止传输、消除 | 红灯退役机制：到期或评测未过即停用，设备可拆、数据可回滚 |
| 申诉与投诉入口便捷且有时限 | 同上第十五条 | 建立投诉举报机制，设置便捷入口，公布处理流程与反馈时限 | 每个信号节点带申诉入口与人工复核缺口；响应时长纳入年度评估 |
| 涉舆论属性服务先评估 | 同上第十七条 | 具有舆论属性或社会动员能力的服务应开展安全评估 | 黄灯场景准入门槛：虚拟评测→受控实验室→街区试点三级递进 |
| 公共服务保留人工办理 | 《中华人民共和国无障碍环境建设法》第三十九条（2023-09-01 施行）[source:STATUTORY-BARRIER-FREE-LAW] | 医疗健康、社会保障、金融业务、生活缴费等公共服务场所应保留现场指导与人工办理 | 绿灯服务保留人工替代；高影响判断回到人工 |
| 智能化不得取消传统渠道 | 国办发〔2020〕45 号《关于切实解决老年人运用智能技术困难的实施方案》[source:POLICY-GUOBAN-2020-45] | 坚持传统服务方式与智能化服务创新并行 | 无 AI 等价路径不更慢、不更差，不以装 App 为通行前提 |

这也解释了方案为什么把"可逆"放在"智能"之前：在既有法规下，一个不能停止、不能投诉、不能由人工替代的智能服务，本来就不具备进入公共空间的资格。

本方案不声称官方批准、审定控规、最终土地权属、最终建设规模或保证实施；所有空间与活动建议均为开放共创概念建议，不替代正式规划，不构成政府审定结论 [source:AGENT-TASKBOOK]。图片、图纸、图标、数据与代码资产的来源与许可状态见 `sources.json` 与 `report/copyright_statement.md`。AI agent 对事实、来源、版权、空间数据、指标与表达负责；维护者和专业评审可依据自检结果、空间复核与合规矩阵要求返修或拒绝。

## 14. 参考资料

- `brief/public-brief.md`
- `brief/site-package/design_brief.json`
- `brief/site-package/agent_taskbook.json`
- `brief/site-package/allowed_design_space.json`
- `brief/site-package/sources.json`
- `brief/site-package/enums/`
- `brief/site-package/ranges/planning_limits.json`
- `brief/site-package/standards/standards.json`
- `brief/site-package/standards/references/`
- `brief/site-package/schemas/`
- `brief/site-package/geometry/provisional_boundaries.geojson`
- `data/source_registry.json`
- `data/processed/agent_fact_pack.md`
- `data/processed/project_scope_summary.csv`
- `data/processed/agent_task_requirements.csv`
- `data/processed/source_use_matrix.csv`
- `data/processed/missing_data_checklist.csv`
- 机器可读引用索引：[source:OFFICIAL-ANNOUNCEMENT]、[source:AGENT-TASKBOOK]、[source:SITE-PACKAGE]、[source:SOURCE-REGISTRY]、[source:PROCESSED-FACT-PACK]、[source:STATUTORY-GENERATIVE-AI-MEASURES]、[source:STATUTORY-BARRIER-FREE-LAW]、[source:POLICY-GUOBAN-2020-45]、[source:SRC-HAIDIAN-STATS-2025]、[standard:PROJECT-OFFICIAL-ANNOUNCEMENT]、[standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]、[standard:MOHURD-URBAN-DESIGN-MEASURES]、[standard:MOHURD-CONTROL-DETAILED-PLANNING]、[standard:MNR-LAND-USE-CLASSIFICATION-GUIDE]、[depth:metrics_recalculation]、[data:geometry/site_boundary.geojson#SITE-001]、[metric:site_area_sqm]
