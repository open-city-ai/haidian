---
title: "京张时权 · THE CITY TIMETABLE：从空间使用权到时间使用权"
author_github: "andyxu12341"
language: "zh"
proposal_format_version: "2"
bilingual_contract_version: "1"
translation_file: "proposal.en.md"
license: "COMMUNITY-DISPLAY-ONLY"
summary: "以时间使用权作为与空间使用权并列的规划变量，用 T0–T3 权利层级、TimeSlot Contract、12 个 AI+ 场景和时间扩展网络组织人机时序冲突；进一步把 AI 原点社区与已建成京张铁路遗址公园一期作为首个可执行小试，形成可公开、可拒绝、可人工接管和可回滚的城市时刻表。"
tracks: ["robotics-autonomous-mobility", "youth-friendly-public-space", "jingzhang-heritage-narrative"]
scenarios: ["robot-delivery-low-speed", "ai-traffic-walkability", "ai-cultural-guide"]
iteration: "v0.5-site-grounded-pilot"
---

# 京张时权 · THE CITY TIMETABLE
## 从空间使用权到时间使用权｜JINGZHANG TIME RIGHTS

传统城市设计主要回答“什么功能放在哪里”。AI 城市还必须回答：**同一空间在什么时候由谁优先使用，冲突时谁退出，失效后如何恢复。** 本方案因此把“时间使用权”提升为与空间使用权并列的规划变量。京张铁路的“时刻、会让、优先、延误、恢复”成为机制原型；`THE CITY TIMETABLE` 是运行系统，**京张时权**是规划主张。

![京张时权：空间权利、时间权利与 T0 公共保障的总体概念图](assets/figures/time-rights-hero.svg)

本成果为 open-call formal submission，不代表政府批准、法定规划、工程可行性、自动驾驶许可或现场实测绩效。

## 设计依据与资料清单

项目范围、三处重点区域和设计任务以官方征集公告为主控依据 [source:OFFICIAL-ANNOUNCEMENT]；六项 Agent 任务、场景卡、画像、地标和长期运营要求来自任务书 [source:AGENT-TASKBOOK]。城市设计、控规边界意识与用地分类参照官方标准 [standard:MOHURD-URBAN-DESIGN-MEASURES] [standard:MOHURD-CONTROL-DETAILED-PLANNING] [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE]。

官方精确 SITE_BOUNDARY、三处重点区 polygon，以及 FAR、高度、密度、退线、道路红线、权属、市政和文保等控制仍未完整取得，因此竞赛几何继续标记为 `provisional_constraint`、`official_boundary=false` [source:BOUNDARY-SOURCE] [assumption:A-BOUNDARY-001]。

本轮增加可支撑“为什么在这里先试”的真实场地证据：京张铁路遗址公园一期已建成开放，清华东路至知春路约 2.5 km、16.8 ha [source:JZ-PARK-PHASE1-OFFICIAL]；2026 年二期配套项目完工，北段约 30.01 ha，并形成骑行、慢跑、步行串联的鱼骨状慢行网络 [source:JZ-PARK-PHASE2-2026]。北京 AI 原点社区约 3 km²，公开信息显示汇聚 30 余所高校及科研机构、230 余家 AI 企业和约 10 万 AI 相关专业学子 [source:AI-ORIGIN-2026-BJFGW]。京张沿线人工智能创新街区街区控规草案亦已完成公开公示与意见采信环节 [source:JZ-CONTROL-PLAN-PUBLIC-2025]。

这些公开事实只用于确定现实背景和 Pilot 选择，**不替代竞赛 official polygon，也不推导未公开的法定指标。** 时间扩展网络只借鉴时变可达性的方法结构 [source:METHOD-TIME-EXPANDED-2026]。

![从场地基线、96 个时间层、T0–T3 时权到时序可达与冲突读数的研究方法链](assets/figures/temporal-network-method.svg)

## 三层范围工作框架

官方任务形成约 43.6 km² 统筹研究范围、约 11.4 km² 总体设计范围和三处重点区域合计约 368.4 ha [source:OFFICIAL-ANNOUNCEMENT]。

- **43.6 km²：创新协同运行域。** 研究高校、企业、公共服务、物流和活动的时间关系。
- **11.4 km²：City Timetable 主系统。** 建立恒定权利、日常节律、弹性预约和人工确认事件空间。
- **三重点区：三类时间治理实验。** 众智园验证测试安全；AI 原点验证青年共创与居民日常权利；大钟寺验证轨道客流、商业、夜间活动与物流错峰 [metric:key_area_count]。

![三层范围与时权总体框架](assets/figures/site-overview.png)

三层都使用 T0–T3 权利语法：上层研究节律，中层组织共享，重点区把规则变成可检查、可拒绝、可回滚的空间原型。

## 统筹研究范围产业与未来城市研究

京张时权增加四个问题：**什么时候发生、谁优先、什么证据允许切换、谁在冲突时退出。** 总体形成约 9.22 km 的概念时间主脊和三个重点区时序接口 [data:geometry/roads.geojson#ROAD-001] [metric:time_spine_length_m]。

六个案例只提取机制：NYC Open Streets 的时段开放、LADOT Code the Curb 与 OMF CDS 的机器可读路权、Singapore 的受控自动驾驶测试、TfL School Streets 的固定优先时段、Paris Rues aux écoles 的青年友好公共空间 [source:CASE-NYC-OPEN-STREETS-2026] [source:CASE-LADOT-CODE-THE-CURB] [source:CASE-OMF-CDS]。结论不是“部署更多传感器”，而是让规则**人能理解、机器能读、责任人能复核、失败能回滚**。

方法链为：**Planning Question → Time Rights → TimeSlot Contract → Time-expanded Network → Spatial Prototype → Validation / Rollback**。本案以 12 节点 × 96 个 15 分钟时片构造 proof-of-method；需求权重和运行窗均是设计假设 [assumption:A-TEMPORAL-MODEL-001]。

## 总体设计范围城市更新与控规深度城市设计

四级时权构成同一套空间运行语法 [data:visual/assets/timeslot_contract.json]：T0 为无障碍、应急、基础步行和必要非数字服务；T1 为通勤、学校、居民出入和日常慢行；T2 为机器人配送、低速测试、课程、展陈和青年活动；T3 为必须具名人工确认的高客流事件。

TimeSlot Contract 至少记录空间单元、时间窗、允许主体、优先级、无障碍保护、责任人、停止条件、回滚、日志、非 AI fallback 和验证方法。堵塞唯一无障碍/应急通道直接拒绝 [metric:validator_negative_case_count]。

![用地与时序结构](assets/figures/land-use-structure.png)

24h 可逆街道把规则落成“**剖面 + 时刻表 + 权利合同**”：07:30 人流优先，11:00 可进入受控 T2，19:30 可转青年活动，23:00 回到安静和必要服务；T0 始终连续。该剖面不代表已测道路宽度或法定红线 [assumption:A-CONTROLS-001]。

![24 小时可逆街道中 T0 连续权利与 T1/T2/T3 时段切换示意](assets/figures/street-section-24h.svg)

## 重点区域详细设计

三处重点区承担不同实验，不复制同一套“AI 设施” [depth:three_key_area_detailed_design]。

### 众智园：AI 时序测试场

早高峰人流优先，日间安排受控机器人配送/低速接驳测试，晚间可进入公众观察与 Demo，夜间维护并保留 T0。重点验证冲突降级、自动退出、人工接管与日志回放 [metric:test_validation_scenario_count]。

### 北京 AI 原点社区：24h 共创时序社区

现实基础使这里最适合作为第一处落地验证：约 3 km² 的近校创新街区与已建成京张一期公共空间相邻 [source:AI-ORIGIN-2026-BJFGW] [source:JZ-PARK-PHASE1-OFFICIAL]。

#### 首个可执行小试：AI 原点 × 京张一期「TIME RIGHTS 1.0」

首轮不等待新建道路、拆迁或大型资本工程，而以清华东路—知春路 2.5 km / 16.8 ha 已建公共空间为现实底板。Pilot 只验证：**在不牺牲 T0 的前提下，青年活动、公共服务、展示和有边界技术测试能否通过公开、可拒绝、可回滚的时间合同共存。** 机器可读协议见 `visual/assets/ai-origin-time-rights-pilot.json` [assumption:A-PILOT-001]。

- **P0｜2 周基线**：人工巡查主要出入口、无障碍连续性、早晚高峰、活动/安静节点、投诉管理接口和非数字服务入口；只记录聚合计数。
- **P1｜4 周可逆小试**：建议 07:30–09:30 人流优先；11:00–15:00 为待确认的有边界 T2；18:30–21:00 青年与社区活动；21:00 后回到安静和必要服务。首轮关闭 T3 大型事件。
- **P2｜条件式扩展**：只有 T0 连续性、人工接管、投诉响应、非 AI fallback 与日志完整度全部达标，才扩大时段、节点或场景，否则回到 P0。

责任链建议为“公园运营/管理方—属地街道与社区—AI 原点运营主体—高校/志愿者—测试企业—无障碍与居民代表—独立复核者”，**不表示任何单位已承诺参加**。唯一无障碍/应急路径被占、责任人缺席、隐私越界或非 AI 等价路径失效时，立即冻结该时段。

首轮 Gate 为 `T0_blocked_minutes=0`、应急/无障碍阻断事件=0、非 AI fallback 目标 100%、T2 责任人与停止条件记录目标 100%，并用 P0 实测基线比较 P1 高峰冲突分钟。以上均为**待验证目标，不是已实现绩效**。

![AI 原点社区与京张一期基于 P0 基线、P1 可逆小试和 P2 条件扩展的 TIME RIGHTS 1.0 试点框架](assets/figures/ai-origin-pilot.svg)

### 大钟寺：智能原生生活时序场

高峰坚持人流/换乘优先，日间商业与生活，晚间青年文化，夜间错峰补货。2026 年公开的“南部大钟寺 AI 产业集聚区更新片区”已提出实施单元统筹、近中远期更新、公益性/经营性空间统筹和城市设计引导，说明这里存在现实更新实施框架 [source:DAZHONGSI-URBAN-RENEWAL-2026]。但该公开项目边界**不自动等于竞赛 provisional key-area polygon** [assumption:A-DAZHONGSI-001]。

![三个重点区核心任务](assets/figures/key-areas.png)

三处 AI 朝圣节点为 **TIMETABLE HALL / 运行图大厅、TIME EXCHANGE / 时间交换站、CENTENNIAL DEPARTURE / 百年发车台** [data:geometry/public_space.geojson#PUBLIC-001]，共同公开当前状态、下一状态、T0 权利、责任人与异常回滚。

## AI 创新生态、人才画像与 AI+ 场景

品牌统一使用 **京张时权 · THE CITY TIMETABLE**；视觉语法来自铁路时刻轴、站点、会让线和恢复线。六类画像覆盖 AI 创业/开发者、高校学生与青年研究者、周边居民、无障碍与高龄使用者、商户与夜间服务者、物流/运维/应急角色 [metric:scenario_count]。

12 个场景包括机器人配送时间窗、低速接驳冲突降级、人群高峰自动退出、人工接管与日志回放、Demo Night 可逆客厅、免 App 导航、AI 文化导览 + 非数字路线、夜间学习与轻运动、场景预约准入、企业 Demo 时段共享、活动日多主体排程和公共时权表。至少四项属于测试验证场景 [metric:test_validation_scenario_count]。

所有场景要求人工复核和非 AI fallback，设计合同层覆盖率为 100%，但不等于真实运营绩效 [metric:human_override_coverage] [metric:non_ai_fallback_coverage] [assumption:A-METRICS-001]。长期运营包括 Open Timetable Week、Urban Agent Scheduling Challenge、Robotics Low-speed Test Week、Jing-Zhang Demo Night 与 Annual Time Rights Review。

## 用地、建筑规模与拆改留方案

`geometry/land_use.geojson` 仅表达概念功能结构，不构成控规批准 [data:geometry/land_use.geojson#LU-001] [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE]。FAR、正式高度、密度和退线保持 unknown [metric:floor_area_ratio]。建筑层 6 个 `candidate_retrofit` 单元概念基底约 88,629 m²，优先表达存量适应性改造和可逆首层界面，不据此推断拆迁或新建规模 [metric:building_footprint_area_sqm] [assumption:A-CONTROLS-001]。

## 交通、轨道、市政与公共服务设施

概念 Time Spine 和三个时序接口不是现状道路中心线或工程定线 [data:geometry/roads.geojson#ROAD-001]。T0 概念连续线约 12.33 km，用来表达无障碍、应急和基础步行在任何状态下保持连续 [metric:t0_constant_rights_corridor_length_m]。

![交通、蓝绿与 T0 恒定权利网络](assets/figures/mobility-bluegreen.png)

数字基础设施包括公开运行状态、机器可读规则、人工接管、异常日志、回滚记录和非数字备份。情景 proof 在保持机器服务总时长 10h/日不变的设定下，将高峰人机冲突 10h → 3h（-70%），高峰可逆空间可用率 63.0% → 88.9%（+25.9pp），30 分钟高峰时序可达 3.70 → 3.91（+5.7%）[metric:peak_conflict_reduction_ratio] [metric:peak_flexible_space_availability_gain_pp] [metric:temporal_reachability_gain_ratio]。这些不是现场效果 [assumption:A-TEMPORAL-MODEL-001]。

## 蓝绿空间、公共空间与城市风貌

概念绿地层按 provisional boundary 复算 `green_ratio=31.5058%`，不是批准绿地率 [metric:green_ratio]；六处可逆公共空间概念比例约 1.4959% [metric:public_space_ratio]。本方案不把蓝绿系统当作静态“背景绿量”，而把它作为 T0 恒定权利的低技术底板：连续步行、无障碍、遮阴停留、安静空间和应急通行优先于任何 T2/T3 活动。京张一期已经建成开放、二期配套已形成新的慢行网络，因此近期设计重点是识别可进入、可停留、可切换与必须始终保持通畅的空间，而不是先新增大体量构筑物 [source:JZ-PARK-PHASE1-OFFICIAL] [source:JZ-PARK-PHASE2-2026]。

公共空间的时权表达通过 `geometry/green_space.geojson` 与 `geometry/public_space.geojson` 的概念图层建立索引，六处时序空间只承担“规则可被看见和测试”的示范，不以 1.4959% 作为规划目标 [data:geometry/public_space.geojson#PUBLIC-001]。每个节点都应同时说明 T0 连续路径、可预约边界、安静时段、人工责任和失败回退；正式道路断面、树木现状、排水、市政、照明、文保和真实使用强度到位后再校核尺度与材料。城市风貌以“**空间权利 + 时间权利**”为叙事：铁路时刻轴、站点、会让线和恢复逻辑转译为导视、铺装、公共信息与活动系统，而不是用通用科技蓝光代替京张历史 [standard:MOHURD-URBAN-DESIGN-MEASURES]。

## 更新项目清单、实施政策与分期计划

实施策略遵循“**先运营验证，后空间扩展；先可逆小试，后资本建设**”。近期第一项目是 **AI 原点 × 京张一期 TIME RIGHTS 1.0**：先完成 P0 两周人工基线，再进入 P1 四周可逆小试，同步部署 TimeSlot Contract、公开时权表、T0 无障碍/应急校核和免 App 导航；其场地依据来自已建成开放的京张一期 [source:JZ-PARK-PHASE1-OFFICIAL]，机器可读协议位于 `visual/assets/ai-origin-time-rights-pilot.json` [data:visual/assets/ai-origin-time-rights-pilot.json]。近期项目还包括三重点区时权界面样机、公开状态牌、人工接管演练与 Annual Time Rights Review，均优先使用现有公共空间和可撤除设施。

中期只有在 official polygon、道路/站口、真实人流、活动、物流、市政与管理边界补齐后，才把 P0/P1 的现场基线替换当前 proof 假设，重新计算冲突分钟、时序可达和空间可用率 [metric:peak_conflict_reduction_ratio]。若 T0 连续性、非 AI fallback、投诉响应或具名责任任何一项不达标，项目停留在 P0/P1，不进入扩展。远期才讨论更高等级具身智能公共运行、重点区空间改造和跨片区联动，前提是交通、安全、规划、市政、文保、权属与运营许可分别取得专业确认。该分期因此既是建设时序，也是“证据成熟度—授权等级”的升级路径 [depth:phasing_implementation]。

## 指标体系、面积复算与合规矩阵

当前结构化指标包括：`site_area_sqm=11,412,825.386 m²`（provisional）、概念 retrofit 基底约 88,628.915 m²、`green_ratio=31.5058%`、`public_space_ratio=1.4959%`、Time Spine 约 9,216.69 m、12 个场景、人工接管与非 AI fallback 设计字段覆盖率 100%，FAR 保持 unknown [metric:site_area_sqm] [metric:floor_area_ratio]。

![指标、情景 proof 与证据边界的复核图](assets/figures/metrics-evidence.png)

任务、标准、设计深度、指标与风险追踪见 `compliance_matrix.json`、`standard_matrix.json`、`design_depth_matrix.json`、`metrics.json` 和 `assumptions.json` [depth:metrics_recalculation]。

## 风险、版权与合规说明

官方 polygon 缺失，所有 provisional-derived 数量和落位须重算 [source:OFFICIAL-ANNOUNCEMENT]。FAR、高度、道路、市政、文保、权属不自行推定 [standard:MOHURD-CONTROL-DETAILED-PLANNING]。AI 原点 Pilot 尚未授权、尚未运行，所有 Gate 均为待验证目标 [data:visual/assets/ai-origin-time-rights-pilot.json]。机器人测试不等于公共部署许可；-70%、+25.9pp、+5.7% 等情景模型结果不等于现场绩效 [metric:peak_conflict_reduction_ratio]。基本公共服务不依赖人脸识别、持续个人追踪、强制 App 或单一供应商；任何现场数据采集优先采用聚合计数和人工观察。核心图和模型为本方案原创/程序化生成，版权说明见 `report/copyright_statement.md`。

## 参考资料

官方征集与 Agent 任务 [source:OFFICIAL-ANNOUNCEMENT] [source:AGENT-TASKBOOK]；京张一期、二期与 AI 原点现实基础 [source:JZ-PARK-PHASE1-OFFICIAL] [source:JZ-PARK-PHASE2-2026] [source:AI-ORIGIN-2026-BJFGW]；控规公示采信与大钟寺更新框架 [source:JZ-CONTROL-PLAN-PUBLIC-2025] [source:DAZHONGSI-URBAN-RENEWAL-2026]；机制案例及 time-expanded network 方法详见 `sources.json` [source:METHOD-TIME-EXPANDED-2026]。
