---
title: "京张人本城市操作系统：从 AI 展台到 AI 时代人的城"
author_github: "147228"
language: "zh"
proposal_format_version: "2"
bilingual_contract_version: "1"
translation_file: "proposal.en.md"
license: "COMMUNITY-DISPLAY-ONLY"
iteration: "v2.9-candidate"
summary: "先发布人的最低版本，再调用机器。以一条公共脊、六个空间单元、三处重点区、四道推进门和十二周最小试点方法，把普通通行、人工服务、无屏恢复与退出回放设为 AI 场景进入城市的前置条件。临时几何、可重算设计量与未知结果分栏呈现。"
tracks: ["ai-traffic-walkability", "enterprise-services-ecosystem", "civic-agent-governance"]
scenarios: ["ai-traffic-walkability", "enterprise-service-copilot", "public-safety-operations-review"]
---

# 京张人本城市操作系统

> **先发布人的最低版本，再调用机器。** 城市的普通通行、人工服务、无屏停留和申诉退出不能成为 AI 上线后的补丁。

## 设计依据与资料清单｜城市先有人的底座，机器才有进入条件

京张 AI 创新带已有不少技术场景，本方案补上一套能回答“谁可以进入、谁有权拒绝、系统出错后谁接手”的空间秩序。城市被理解为可持续更新的操作系统。人的尊严是常驻版本，AI 是受限插件，能源、气候、安全与治理是不能绕过的硬约束。[source:AGENT-TASKBOOK] [depth:three_level_scope_framework]

空间上形成“一条公共脊、六个空间单元、三处重点区、四条受限廊道”。运行上采用“G0 包内回放 → G1 人工走读 → G2 受限试点 → G3 独立复核”四道门。每一项 AI 场景必须先证明普通人不用模型、账号或智能设备也能完成基本事务；随后才讨论最小权限调用。解释、人工接管或退出回放任一缺失，就停在上一道门。[data:visual/assets/reviewer-facing-atlas-v22.json] [data:geometry/phasing.geojson#PHASE-V01]

三处重点区承担不同任务。众智园把机器限制在可停机、可复盘的测试环境；北京 AI 原点先走通社区保留、技能转型和人工服务；大钟寺把创新转成普通人能理解、能质疑、能退出的公共产品。三处共同组成从受控测试、社会协商到日常验收的南北序列。[depth:overall_spatial_structure] [depth:three_key_area_detailed_design]

![图 01｜评审首屏｜一张同源空间底图、三处重点区与五段人本动作](assets/figures/site-overview.png)

当前总体范围与三处重点区均来自仓库临时几何，`official_boundary=false`。图面可用于概念空间关系、拓扑检查和 EPSG:4548 下的包内复算，不构成官方红线、权属、控规或工程定位。正式资料到位后，九组 GeoJSON、指标、图件、HTML 与 PDF 必须整体重算。[source:BOUNDARY-SOURCE] [data:geometry/site_boundary.geojson#SITE-001] [depth:metrics_recalculation]

## 三层范围工作框架｜把责任从策略传到空间

| 工作层级 | 要回答的问题 | 本方案的交付 | 进入下一层的条件 |
| --- | --- | --- | --- |
| 统筹研究范围 | 产业、人才、公共问题与区域能力如何交换 | 三区两翼协作接口、五类项目族、可分享的方法与失败记录 | 有真实问题、来源边界和待确认接收方 |
| 总体设计范围 | 人的最低版本与机器插件如何共同落位 | 一条公共脊、六个空间单元、四条受限廊道和蓝绿缓冲 | 普通路径连续，机器界面不挤占人工与公共空间 |
| 三处重点区域 | 一项场景怎样进入、停止并留下回放证据 | 三条首发路径、十七张场景卡、四道推进门 | G0 可回放；G1 以后必须有现场、授权与独立复核 |

任务书的三大定位在同一条链上分工。百年京张文化带保留铁路、时间与公共记忆；都市 AI 生活体验带让普通人比较人工基线与 AI 增量；AI 融合创新带承担研发、受控测试和可复制协议。五大功能分别回到测试、产业联系、场景、公共服务与治理，不再停在宣传口号。[source:OFFICIAL-ANNOUNCEMENT] [source:AGENT-TASKBOOK]

![图 02｜任务书到空间响应｜三大定位、五大功能、三区两翼与四条价值链](assets/figures/brief-alignment-atlas.png)

## 用地、建筑规模与拆改留方案｜六个空间单元先保留日常，再配置机器

总体设计以六个共享边界的概念单元覆盖临时范围。`LU-H01` 把原住民保留支撑与社区服务织补放在底层；`LU-D01` 承接国际服务和小团队生态；`LU-C01` 面向技能再造与公共数据学习；`LU-B01` 保留可逆留白；`LU-B02` 承接城市 API 与具身智能研发；`LU-C02` 留给无屏绿地与气候韧性。[data:geometry/land_use.geojson] [depth:land_use_layout]

| 空间单元 | 包内复算占比 | 优先保留的城市能力 | 机器边界 |
| --- | ---: | --- | --- |
| LU-H01 社区保留与服务织补 | 18.28% | 留居支撑、人工柜台、社区协商 | 不用空间代理值冒充居民保留率 |
| LU-D01 国际服务与小团队生态 | 17.68% | 多语人工服务、OPC 公平申请 | 不指定机构、企业或已签合作 |
| LU-C01 技能再造与公共数据学习 | 17.06% | 带薪转型、纸面咨询、公共解释 | 培训人次不能替代持续就业结果 |
| LU-B01 可逆留白与临时使用 | 15.09% | 临时活动、退出空间、普通停留 | 不锁定永久功能与不可逆建设 |
| LU-B02 城市 API 与具身研发 | 15.48% | 最小权限目录、受控接口 | 不接入未授权个人或市政数据 |
| LU-C02 无屏绿地与气候韧性 | 16.40% | 树荫、安静、雨洪与人工巡检 | 模拟不能替代水文、热环境和现场校准 |

![图 03｜六个空间单元｜面积、占比、日常能力与可逆边界同页呈现](assets/figures/land-use-structure.png)

六个单元只表达概念取舍，不承担法定用地结论。社区保留支撑与可逆留白先形成城市容量，机器研发只在可撤回界面中增量进入。容积率、建筑高度、权属、拆改量与正式道路仍为 `unknown`。[metric:community_retention_support_area_ratio] [metric:reversible_space_ratio] [depth:development_intensity_controls]

## 交通、轨道、市政与公共服务设施｜四条廊道各有人的优先、机器边界和停止动作

四条概念廊道把空间使用规则画出来，线位不作工程依据。技能再造走廊长 5.919 公里，先保证连续步行和人工职业咨询；硅基通行权测试廊长 4.586 公里，只允许申报时段、最小权限和人工接管；低空概念分层廊长 2.015 公里，地面普通路径必须持续可用；海绵韧性巡检线长 8.366 公里，先做静态避险、人工巡检与水文补证。[metric:skill_transition_corridor_length_m] [metric:silicon_right_of_way_length_m] [metric:low_altitude_concept_corridor_length_m]

![图 04｜人机共行与蓝绿韧性｜四条受限概念廊道及其停止条件](assets/figures/mobility-bluegreen.png)

交叉节点遵守状态可见、低速暂停、人工接管和事故回放四条规则。道路、空域、安全、保险或蓝线资料缺一项，对应机器场景不得从概念进入试点。夜间安心接驳脊保留普通交通退路，不把连续定位、人脸或个人风险评分作为通行条件。[depth:traffic_rail_slow_parking] [depth:blue_green_public_space]

## 重点区域详细设计｜各先验收一条普通人路径

三处重点区域共同形成操作系统的验证网络。众智园检验机器能否受限，北京 AI 原点检验公共服务能否保底，大钟寺检验知识与产品能否被普通人理解；同一套五段路径和四道推进门构成可比较的空间机制。

| 临时重点区 | 首要使用者 | 五段首发路径 | G1 最低证据 | 停止与回退 |
| --- | --- | --- | --- | --- |
| 众智园 | 步行者、测试观察者、现场服务人员 | 普通步行 → 人工授权 → 受限测试 → 海绵退避 → 事故回放 | 道路与无障碍走读、安全、保险、责任、人工接管 | 任一资料缺失，停在纸面与离线，不开放测试 |
| 北京 AI 原点 | 原住民、老人、低数字能力者、转岗劳动者 | 普通到达 → 人工/电话/纸面 → 共学与转岗 → 无屏恢复 → 申诉退出 | 服务目录、人工等效、居民与岗位基线、知情同意 | 没有可信基线，只保留普通服务，不发布保留或就业结果 |
| 大钟寺 | 小团队、首次到访者、国际访客、公共服务人员 | 问题登记 → 公平申请 → 版本回放 → 多语人工 → 退出撤回 | 权利与知识产权、最小授权、多语准确、投诉和独立复核 | 权利、语言或个案边界不清，关闭展示，保留人工服务 |

![图 05｜三处重点区｜优先使用者、五段路径、G0 至 G3 与最低证据](assets/figures/key-areas.png)

![图 06｜三区空间动作房间｜到达、解释、受限、无屏停留、退出回放](assets/figures/spatial-action-rooms-v21.png)

包内 G0 使用四张合成公共服务合同检查字段和拒绝逻辑。4/4 正样本可回放，8/8 缺少同意、人工入口、最小数据、权限、申诉、低影响边界、双语复核或空间锚点的负样本均被拒绝，4/4 双语字段一致。它只证明契约结构可复核；没有真实用户、现场排班、个人数据或外部系统，G1 仍为 HOLD。[data:visual/assets/human-city-public-service-tabletop-v1-evidence.json]

![图 07｜三处重点区空间动作图谱｜场景、人工接管与退出证据](assets/figures/spatial-action-atlas.png)

## AI 创新生态、人才画像与 AI+ 场景｜按九类人的不同否决点验收

六类基础 persona 包括原住民与老人、转岗劳动者、夜班 AI 从业者、小团队与 OPC、公共服务人员、行动不便或低数字能力者。三类扩展覆盖青年初入行者、开发者与研究者、首次到访者与国际访客。每一类都绑定普通入口、空间节点、人工替代、最小数据和停止条件；代表性路径不替代人口调查或真实参与。[data:visual/assets/personas-and-fairness.json] [data:visual/assets/public-interest-coverage-v26.json]

![图 08｜人本城市验收图谱｜使用者、场景、空间锚点与停止条件](assets/figures/human-city-acceptance-atlas.png)

十七张场景卡逐一回答五件事，分别是谁受益、落在哪个空间、AI 只做什么、谁能人工接管、什么情况必须停。`SC-A03` 的人工通道、`SC-B02` 的硅基通行权测试、`SC-C03` 的事故复盘、`SC-D03` 的多语服务分别代表人的最低版本、机器边界、硬约束和对外转化。[data:geometry/constraints.geojson#SC-A03] [data:geometry/constraints.geojson#SC-C03]

![图 09｜人机接口原型｜把人工停止与普通通行放进空间层](assets/figures/human-machine-interface-section.png)

## 总体设计范围城市更新与控规深度城市设计｜用 AI 暴露取舍

参数化推演在固定临时场地面积上生成 128 组候选，比较社区保留、可逆留白、机器可调用与气候缓冲四个代理镜头，再筛出非支配集合。它让评审者看到不同 share 如何改变派生面积，不把代理值写成居民结果、AI 能力或推荐方案。[data:visual/assets/parametric-search.json] [depth:metrics_recalculation]

三组可读候选进一步把差异压缩到同一张表。相对基线，`people_first` 提高社区保留与可逆留白，降低城市 API/具身研发占比；`machine_ready` 则相反。正式边界、法定控制和公众基线缺失时，候选只用于概念比较，不写入正式 geometry 或 metrics。[data:visual/assets/parametric-tradeoff-study.json] [data:visual/assets/parametric-tradeoff-study-evidence.json]

![图 10｜三组概念空间取舍｜基线、人本优先与机器调用](assets/figures/parametric-tradeoff-study.png)

城市 API 采用“目录 → 授权 → 调用 → 日志 → 审计 → 退出”六步序列。机器只在具名目的、最小字段和可撤销权限内工作；纸面、电话、人工解释与申诉始终并列。序列可离线回放，但不代表接口已部署或取得授权。[data:visual/assets/city-api-sequence-v23.json] [depth:municipal_new_infrastructure]

## 蓝绿空间、公共空间与城市风貌｜把文化、学习与版本治理接回日常

三座概念地标承担不同公共动作。“人的版本大厅”公开问题、变更与撤回；“轨道接口钟”把京张铁路的时间线转成可读的城市更新节奏；“无屏恢复灯塔”把树荫、声音、夜间安全和不强制交互放到技术体验旁边。这些地标面向公共解释和日常使用，不构成企业展示或建设承诺。[source:AGENT-TASKBOOK] [depth:renewal_project_list]

![图 11｜公共空间、文化与年度运营｜三座概念地标和五类项目族](assets/figures/public-culture-operations-atlas.png)

年度节奏只负责组织问题与证据。春季登记公共问题，夏季开展受控接口与具身测试，秋季复核工作转型和 OPC 共创，冬季发布城市版本差异与退出记录。没有场地、主体、经费、许可和公众程序，不进入运营日历。[data:visual/assets/public-culture-operations-atlas-v20.json]

区域接口交换方法，不交换未经授权的数据和结论。中关村科技服务翼承接法务、标准、算力与转化问题；小月河场景翼承接低风险公共问题和生态反馈。面向北纬社区、未来科学城、怀柔科学城、经开区与京津冀，只输出去地点化 schema、失败包和版本差异，不虚构合作主体。[data:visual/assets/regional-interface-ledger.json]

![图 12｜区域接口｜技术、标准、知识、生态与国际服务的输入输出](assets/figures/regional-interface-ledger.png)

标识系统采用轨道、接口和人工确认点三种语汇。颜色提示人的底座、机器接口、硬约束和退出回放；它服务导视、服务卡与版本记录，不冒充官方标识或政府背书。[data:visual/assets/brand-identity.json]

![图 13｜概念识别系统｜轨道、接口与人工确认点](assets/figures/brand-identity.png)

## 更新项目清单、实施政策与分期计划｜四道可否决的推进门

| 推进门 | 可以做什么 | 必须先有的证据 | 失败动作 |
| --- | --- | --- | --- |
| G0 包内回放 | 核对字段、引用、双语和停止逻辑 | 可解析空间锚点、人工路径、正负样本 | 缺字段或引用即退回修稿 |
| G1 人工走读 | 真实核对通行、服务、无障碍和解释 | 具名责任、授权场地、服务目录、知情流程 | 走不通或人工入口不可用即停止 |
| G2 受限试点 | 小范围、可逆、可停机的场景测试 | 安全、保险、最小数据、能源气候与事故协议 | 越权、不可撤销或风险失控即冻结 |
| G3 独立复核 | 决定保留、修改、退出或有限扩展 | 现场结果、公众异议、独立评估和版本差异 | 无责任回复或退出记录不发布 |

![图 14｜城市发布门｜进入条件、停止动作与退出证据](assets/figures/release-gates.png)

四道门由一份十二周最小试点合同接住。前两周冻结任务、资料边界和责任槽位；第 3 至 6 周只走人工基线、无障碍和多语路径；第 7 至 8 周允许合成或另行授权数据的影子调用；第 9 至 10 周专门演练故障、申诉与删除；最后两周由独立角色作出 HOLD、修改、受限试点或退出决定。ISO 人本设计、NIST AI 风险管理、GOV.UK 包容服务和 UN-Habitat 人本智慧城市方法只帮助定义过程，不构成京张已经符合这些标准。[source:METHOD-ISO-HCD-2019] [source:METHOD-NIST-AI-RMF-2023] [source:METHOD-UK-INCLUSIVE-SERVICE]

| 周次 | 这一段只做什么 | 进入下一段的判断尺 |
| --- | --- | --- |
| 1 至 2 周 | 冻结四项关键公共事务、禁入数据、人工入口和停止责任 | 任务、来源、权利和责任均有记录 |
| 3 至 4 周 | 按三处重点区、四项事务和昼晚两时段规划 24 次普通路径检查 | 每项关键事务至少有一条可用的非 AI 路径 |
| 5 至 6 周 | 规划 12 次独立无障碍走读和 24 个渠道语言等价案例 | 指定路径没有未关闭的严重无障碍阻断 |
| 7 至 8 周 | 只做可撤回的影子调用，高影响动作继续由人决定 | 拒绝 AI 不降低基本服务，权限和目的没有漂移 |
| 9 至 10 周 | 回放 8 个失败码，核对回执、申诉、修正和删除证明 | 每个失败都安全停住，每个个案都能申诉并按期删除 |
| 11 至 12 周 | 复核覆盖、失败、异议、劳动与资源，再决定去留 | 有一份披露冲突与未决问题的独立书面决定 |

24、24、12 和 8 都是覆盖矩阵的最低计划量，用于防止只测一条顺路样本。它们不具有人口代表性，也不表示已经招募或完成现场工作。真实参与要另行取得授权和知情同意，残障人士与低数字能力者不能由项目人员代演。任何关键事务缺少人工、电话或纸面入口，任何指定路径留有严重无障碍阻断，或者拒绝、申诉和删除证明不完整，默认结论都是 HOLD。[data:visual/assets/human-minimum-release-pilot-v29.json] [metric:planned_human_route_attempt_count] [metric:planned_service_equivalence_case_count]

六个责任槽位分别承担公共服务、无障碍、数据、安全、公众联络和独立复核，目前均未指定。资源分成三档。R1 只用既有人员、电话、纸本和便携标识；R2 增加临时有人服务点、可租用无障碍构件、翻译校对和独立审计；施工、真实城市 API、安全关键机械与低空运行属于 R3，不能塞进十二周试点。当前 G0 不留真实个案，未来获授权的编码观察原始记录建议不超过 30 天，非个人汇总不超过一年；确切期限仍要由有权的数据责任角色审批。[data:visual/assets/human-minimum-release-pilot-v29.json] [metric:planned_accessibility_walkthrough_count] [metric:planned_failure_appeal_drill_count]

五类项目族依次承担人本缓冲、城市 API 与可逆构件、人机/气候/算电、数据授权与版本治理、生态和区域外溢。十二周合同把六个行动包、覆盖规模、资源档位、责任槽位和退出证据接到项目族上，但场地、主体、经费和招募仍待授权。方案给出的是专业团队可以删改的起步方法，不把建议角色写成已落实主体，也不把资源档位写成预算承诺。[data:visual/assets/implementation-operation-matrix.json] [data:visual/assets/human-minimum-release-pilot-v29.json] [depth:phasing_implementation]

资料缺口也进入门。官方边界、权属、道路/空域、现状建筑、能源热网、蓝线水文、居民和就业基线、服务授权分别绑定受影响图层、指标和回退动作；一项资料变化，会触发相关几何、指标、图件和发布判断整体重算。[data:visual/assets/data-readiness-register.json]

![图 15｜资料就绪度｜缺口、责任槽位、进入门与重算触发器](assets/figures/data-readiness.png)

## 指标体系、面积复算与合规矩阵｜可复算的设计量与仍未知的结果

| 可复算设计量 | 当前值 | 证据边界 |
| --- | ---: | --- |
| 临时场地面积 | 11.41 km² | EPSG:4548 下包内几何复算，低置信 |
| 社区保留支撑单元 | 18.28% | 只表示用地设计占比，不代表居民保留率 |
| 可逆留白 | 15.09% | 只表示概念空间容量，不代表已批用地 |
| 绿地设计层 | 11.12% | 只表示包内设计几何，不代表现状或法定绿地率 |
| 公共空间设计层 | 1.06% | 包内设计几何，不证明公共可达结果 |
| 场景节点 | 16 个几何节点、17 张场景卡 | `SC-D04` 复用既有锚点 |

居民保留率、持续就业转型率、人工服务等效率、PUE、绿电占比和余热回收量继续为 `unknown/null`。每项都列出最低证据，不能用空间比例、培训人次、网页可访问性或政策参考值填补现实结果。[metric:resident_retention_rate] [metric:sustained_employment_transition_rate] [metric:manual_service_equivalence_rate]

![图 16｜指标与证据｜可复算几何和未知结果分栏呈现](assets/figures/metrics-evidence.png)

## 统筹研究范围产业与未来城市研究｜让方法与失败记录可以复用

统筹研究不以虚构企业、伙伴或活动补足产业叙事。它把高校策源、小团队转化、科技服务、公共问题与区域协作写成待确认接口，输出去地点化 schema、失败包和版本差异。七个仓库评审问题和任务书要求分别回到最短证据入口。任务契合看三层范围与三区两翼；原创性看人的最低版本、机器插件与四道门是否一致；AI 规划创新看参数化取舍与受限 API；实施可行性看十二周行动包、责任槽位、资源档位和停止动作；公共利益看九类 persona 和人工等效；风险合规看资料门与 unknown；表达完整度看双语图件、PDF 与离线网页。[data:visual/assets/reviewer-navigation-index.json]

![图 17｜七维评审证据地图｜问题、最短路径、证据边界与下一步](assets/figures/reviewer-scorecard-map.png)

![图 18｜任务书维度与工作流问题｜两套问题回到同一组包内证据](assets/figures/reviewer-navigation.png)

图组、A3/A0、HTML 和结构化证据使用同一 manifest 哈希链。离线 PASS 只能证明文件、引用、双语映射与约束逻辑一致，不等于官方评分、奖项、发布、许可或实施结果。[data:manifest.json] [depth:risk_missing_data]

## 风险、版权与合规说明｜权利与后续补证

本方案仅使用已登记的公开资料与包内临时几何，不处理个人数据或未对外发布的材料。公开来源按用途、日期、权利和限制登记在 `sources.json`；图件、脚本与结构化文件的作者和引用边界登记在版权声明与权利台账。外部案例只转译机制，不移植境外绩效、制度或法定标准。[source:SOURCE-REGISTRY] [data:report/copyright_statement.md]

当前最关键的缺口包括官方边界与法定控制、现状建筑与权属、交通/空域/安全/保险、能源/热网/水文、居民/商户/就业基线、具名运营与公众授权。它们由组织方、专业团队与未来获授权主体分别补齐；在此之前，场景保持 `not_authorized_not_run`，结果保持 `null`。[depth:risk_missing_data]

本方案的最低承诺很简单。任何技术周期里，普通人仍能到达、理解、拒绝、停留和退出；任何扩展之前，责任、证据与回滚路径都必须先被看见。

## 参考资料

征集公告、智能体任务书、场地资料包、来源登记、北京与海淀公开资料，以及 Barcelona、Busan、Kalasatama、Punggol、Quayside、Seoul 等案例均登记在 `sources.json`。完整 URL、访问日期、适用范围与权利说明以该文件为准；图面与正文不以案例替代京张现场证据。[source:OFFICIAL-ANNOUNCEMENT] [source:AGENT-TASKBOOK] [source:SOURCE-REGISTRY]

资料的使用顺序是公告与任务书确定问题，场地资料限定临时空间输入，公开政策和案例只帮助比较机制，包内 GeoJSON 与 metrics 承担复算。来源能够支持概念关系或方法参考时，正文不把它升级成现场事实；缺少官方边界、权属、建筑、市政、人口与运营资料时，相应结论继续标为 provisional、unknown 或 HOLD。任何新增资料都要先登记用途和权利，再触发受影响的几何、指标、图件、HTML、PDF 与发布门重算，不能只替换一句文字或一张图。
