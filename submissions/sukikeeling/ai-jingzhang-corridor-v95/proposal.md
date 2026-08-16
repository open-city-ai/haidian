---
proposal_format_version: "2"
bilingual_contract_version: "1"
translation_file: "proposal.en.md"
title: "京张智谷：人字形折返治理走廊"
author_github: "sukikeeling"
language: "zh"
license: "COMMUNITY-DISPLAY-ONLY"
summary: "以京张铁路人字形展线与折返换向为制度原型，建立城市AI'折返评估—坡度准入—K标版本'的治理走廊，让每一次城市智能都沿轨道可查、可停、可回头。"
tracks: ["ai-traffic-walkability", "enterprise-services-ecosystem", "civic-agent-governance"]
scenarios: ["ai-traffic-walkability", "enterprise-service-copilot", "public-safety-operations-review"]
---

# 京张智谷：人字形折返治理走廊

**英文名：Jingzhang AI Valley — Switchback Governance Corridor；口号：让每一次城市智能，都沿轨道可查、可停、可回头。**

## Executive Summary (English)

**Jingzhang AI Valley — Switchback Governance Corridor.** An AI innovation corridor along the Centennial Jingzhang Railway Heritage Park in Haidian, Beijing (43.6 km² strategic study area / 11.4 km² overall design area / 368.4 ha three key areas). Core institution: the **Switchback Governance Protocol**, modeled on the "Ren-shaped" switchback line at Qinglongqiao — a train climbing a steep grade must stop at a switchback point, change direction, continue. Urban AI follows the same discipline: no scenario continues automatically; each stops at its switchback node for three-party review (responsible entity / professional review / public representative) deciding **pass / turn back / pull into depot**. Four mechanisms: (1) Switchback Nodes — any party's veto forces turn-back; (2) Grade-based Access — gentle/medium/steep, stricter admission at higher grades; (3) K-marker Versioning — each official data update or recalculation records a new version; (4) Switch States — mainline / siding turn-back / depot maintenance, no automatic recovery. Spatial structure: one belt (heritage park spine), three cores (Zhongzhi Park full-stack validation / AI Origin Community / Dazhongsi), two wings (Zhongguancun service / Xiaoyue River scenario). Twelve scenario cards each bind a grade and a switchback condition. Metrics are evaluation criteria, not target values — baselines marked pending until the first survey; no fabricated output or investment figures. All spatial boundaries are provisional; full recalculation required when official polygons are released.

## 设计依据与资料清单

本成果是开放共创的概念城市设计，不替代法定规划、政府审定或工程设计。依据官方公告 [source:OFFICIAL-ANNOUNCEMENT]、智能体任务书 [source:AGENT-TASKBOOK]、公开场地包 [source:SITE-PACKAGE] 及仓库登记资料 [source:SOURCE-REGISTRY]。

SITE_BOUNDARY 与三处 KEY_AREA 均来自仓库 provisional geometry [source:BOUNDARY-SOURCE]：仅用于生成、讨论、展示与入口自检，不是 official redline，不支撑容积率、高度、拆改留、权属、道路红线或精确面积结论；官方图件发布后需整体复算 [depth:metrics_recalculation]。方法为"证据—折返—指标—版本"四联单：每项策略绑定来源、空间图层、折返条件、可复核指标与版本记录。所有城市AI遵循最小数据、可选择、可申诉、人工终审、日志留痕与独立评测 [standard:PROJECT-OFFICIAL-ANNOUNCEMENT] [depth:existing_conditions_diagnosis]。

![资料证据链与场地概念总览](assets/figures/site-overview.png)

## 折返治理协议（本方案核心制度）

以京张铁路青龙桥"人字形"展线为制度原型——列车在陡坡上无法直行，必须在折返点停车换向后继续；城市AI场景同样如此，到达能力极限前应在折返点接受重新评估，而非沿原方向自动续行。四类机制：

- **折返点（Switchback Node）**：每个AI场景运行轨道上设固定折返点，到达即停车，由三方——场景责任人（决策）、专业复核（技术）、公众代表（权益）——共同决定"放行 / 折返 / 入段"。任何一方否决即强制折返，不自动续行 [depth:switchback_governance]。
- **坡度分级准入（Grade-based Access）**：参照铁路33‰极限坡度，场景按"爬坡难度"分三级——缓坡（普惠体验，社区级准入）、中坡（行业验证，需专业预审）、陡坡（科研攻坚，需联合攻关协议）。坡度越高准入复审越严 [depth:grade_based_access]。
- **K标版本制（Kilometer-marker Versioning）**：以铁路K标为版本锚点，每次官方数据更新、重大事件或复算，记入新K标，形成可追溯版本链 [depth:kmarker_versioning]。
- **道岔三态（Switch States）**：场景运行状态用"正线运行 / 侧线折返 / 入段检修"三态表达，不设自动恢复；检修态回正线须经折返点重评 [depth:switch_states]。

### 折返点＝拔线点（AI关闭等价操作层）

折返点不只是"停车评估"，更是一个**拔线测试点**：每个场景在折返点必须声明五项可机器核对字段——`ai_off_path`（AI关闭后的等价路径，不得指向仍依赖同一系统的线上办理）、`human_handoff`（人工接管角色）、`gate_id`（所处闸门）、`operating_mode`（正线/侧线/入段）、`responsible_role`（责任专业）；缺任一字段的点位不得计入服务覆盖 [data:geometry/constraints.geojson#SWB-01]。本方案已为 8 个折返点（覆盖三级坡度与三态）声明完整五字段，完备率与人工接管指定率均为 1.0，可逐点核对 [metric:ai_off_path_completeness] [metric:human_handoff_designation_rate]。把折返点做成拔线点，是把"人字三义"从哲学落到数据：到站必须由人确认，而"由人确认"的第一条证据，就是城市在AI关闭时仍可用。停止与恢复规则集（8 项风险维度的 mitigation 与 human_review，触发即停、恢复须交证据而非承诺）见 `risk.json` [depth:risk_missing_data]。

## 折返等价基准 SWB（可取走即用的公共产品）

把散在场景卡、闸门、指标与风险条目里的判据，封装成一件独立的、可被任何城市取走即用的东西：**折返等价基准（Switchback Equivalence Baseline，SWB）v0.1** [source:AGENT-TASKBOOK]。机器可读规范位于 `visual/assets/swb-spec.json`，与本章逐项一致。

| 基准组件 | 规范内容 | 本包内机器可读位置 | 复用时必须一并接受的约束 |
| --- | --- | --- | --- |
| 折返点 schema | 每点位声明 ai_off_path/human_handoff/gate_id/operating_mode/responsible_role 五字段，缺一不计覆盖 | `geometry/constraints.geojson` 中 constraint_type=ai_off_equivalence_point 的 8 个折返等价点（SWB-01..08）属性表 | 五字段必填非可选；ai_off_path 不得填写"引导至线上办理"一类仍依赖同一系统的路径 |
| 评分口径 | 等价与兜底指标的分子分母定义，覆盖路径完备率、人工接管指定率、AI开关服务等价差 | `metrics.json` 中三项指标的 numerator_definition/denominator_definition | **分母不得删除失败样本**：撤回、技术故障与非完成原因须与完成数一并报告，删除任一类即作废 |
| 等级定义 | G0 资料许可/G1 可逆原型/G2 封闭成对测试/G3 限定开放与常态运行四级，每级绑准入、停止、恢复证据与责任主体 | `risk.json` 的 gate_binding + 实施路线闸门表 | 等级以"场景×点位"为单位；允许降级且不附加程序门槛；检修态回正线须经折返点重评 |
| 判定规则 | data_privacy 等 8 项风险维度各自的停止条件(mitigation)与恢复证据(human_review) | `risk.json` 中 8 项 dimensions 的 mitigation 与 human_review 字段 | 停止条件触发即停止，不以"限期整改"替代；恢复须提交证据而非承诺 |

**版本治理已转动一次。** 把折返点判据写成可执行 schema 时撞到一处缺口——v8.1（K0）的折返点只在正文散文描述，constraints.geojson 未声明任何 constraint_type=ai_off_equivalence_point 要素，"AI关闭后仍可用"无法被机器逐点核对。该缺口被登记进变更回执 **CR-2026-08-14-001**（见 `visual/assets/governance-receipts.json`）而非就地绕过，随后带着失败样本登记与复算说明交付：新增 8 点五字段、新增三项指标定义，零既有指标数值受影响 [depth:kmarker_versioning]。**复用场景：** 北纬社区初创团队可只取 node_schema 的 ai_off_path 与 human_handoff 两项做"AI关闭后仍可用"自测；未来科学城能源/医药专业设备界面可只取服务等价差一项；任意政务大厅可只取 G0–G2 三级先完成一轮成对测试 [source:BJ-AI-INNOVATION-DISTRICTS-20260121]。基准不构成合规结论或认证资格，只把"怎样才算做到了"写成可逐项核对的形式；托管主体、发布渠道与许可仍待授权主体确认 [source:SOURCE-REGISTRY]。

## 三层范围工作框架

沿百年京张历史线展开的**公共价值折返走廊**：问题由市民与企业提出，原型在三区研发，在两翼获得要素与场景，进入公共测试带小规模验证，最终以公开结果决定放行、折返或入段。一带：京张遗址公园"可走、可学、可测试、可复盘"的公共主轴。三区：众智园（全栈工具与安全评测）、AI原点社区（科研—创业—社区共创）、大钟寺（智能原生消费与公众体验）。两翼：中关村科技服务翼（资本、知识产权、人才、国际服务）、小月河场景翼（交通、生态、健康、机器人受控测试）。四环节：发现问题→沙盒验证→公众体验→折返审议，形成可逆的城市更新机制。空间证据见 [data:geometry/site_boundary.geojson#SITE-001]、[data:geometry/key_areas.geojson#PROV-KEY-001] 与 [data:geometry/roads.geojson#RD-001]。总体控制优先激活存量建筑首层、铁路节点、桥下与边角空间，非新增大拆大建；桥隧、地下空间、文保和交通方案均需专项论证 [depth:three_level_scope_framework] [depth:overall_spatial_structure]。

![三层范围与三区两翼工作框架](assets/figures/land-use-structure.png)

### 视觉识别

Logo 方向为"人字形折返 + 轨道双轨 + K标锚点"，以深轨蓝、验证绿、历史铜三色构成；字符标识独立绘制，不使用企业商标或受限字体。导视为文化棕、公共服务蓝、试验状态黄/绿三套，不与主Logo混用 [depth:brand_identity]。

## 统筹研究范围产业与未来城市研究

折返走廊把产业政策转译为八类可共享要素：算力券、可信数据空间、模型评测、开源法务、首试场景、耐心资本、国际人才服务与公共采购证据。所有支持均为机制建议，不代表财政、招商或企业承诺。

### 6个对标案例及可迁移要点
六个对标案例提供方法背景，不支撑法定空间控制：[source:CASE-SG-AIVERIFY]（新加坡 Smart Nation/AI Verify：公共利益目标与标准化测试）、[source:CASE-BCN-22B]（巴塞罗那 22@：旧工业区混合更新）、[source:CASE-EHV-BRAINPORT]（埃因霍温 Brainport：企业—高校—政府协作）。

另外三个案例：[source:CASE-TOR-WATERFRONT]（多伦多 Waterfront：从数据治理争议中学习公众同意）、[source:CASE-BOS-KENDALL]（波士顿 Kendall Square：高密度科研转化）、[source:CASE-SZ-NANSHAN]（深圳南山科技园：产业链与快速场景迭代）。可迁移要点：城市AI公共评测协议、铁路遗产+存量空间渐进激活、三区两翼任务型联盟、数据影响评估与折返入段、步行创新网络、全栈验证+市场反馈；不可照搬：国家级身份条件、大尺度地产更新、单一龙头依赖、平台企业主导治理、高租金排斥、速度替代安全评估。

## 区域协同矩阵 [depth:regional_collaboration]

区域协同为**可核查的任务、要素与运营清单**，非愿景口号；每项协同绑定具体任务、可交换要素、闭环回路与协作主体，待与各方签署合作协议后形成正式执行机制 [source:AGENT-TASKBOOK]。协同对象包括：北纬社区（商务服务疏解与通勤联动）、未来科学城（前沿科研向京张转化）、怀柔科学城（大科学装置与AI交叉）、北京经开区（智能制造与AI应用）、京津冀（产业链协同与跨域调度）。对标仅作方法背景，不支撑法定空间控制；正式空间与任务结论以仓库登记资料为准 [source:SOURCE-REGISTRY]。生态指标采用"评测口径而非目标值"，基线缺失项标为待调查，不编造产值和投资额。

## 总体设计范围城市更新与控规深度城市设计

总体设计以"铁路文化脊+折返治理环+横向缝合口"为骨架，保留可再用存量、补足连续慢行与公共服务，新增量只在官方控规、权属、文保和市政条件确认后落位。

四类概念用地承担创新研发、混合服务、文化公共与蓝绿开放功能 [data:geometry/land_use.geojson#LU-001]，登记产业用地比例 [metric:ai_industry_land_ratio] 与绿地面积 [metric:green_space_area_sqm] [depth:land_use_layout]。

建筑规模仅复算概念基底 [data:geometry/buildings.geojson#BLD-001] 与基底面积指标 [metric:building_footprint_area_sqm]，不推导法定容量 [depth:development_intensity_controls]，深度对应控规深度的城市设计阶段 [standard:MOHURD-CONTROL-DETAILED-PLANNING]。

更新对象分为保留利用、适应性改造、条件性拆除与可逆新建：现状建筑普查缺失时不判定具体拆除；高度、体量、天际线以低层公共界面和铁路视廊保护为方向，待控规核验 [depth:height_massing_character] [depth:retain_renovate_demolish]。市政采用需求侧减量、分布式能源和端侧算力概念，工程容量待专项论证 [depth:municipal_new_infrastructure]。

## 重点区域详细设计

- **众智园AI自主创新加速区** [data:geometry/key_areas.geojson#PROV-KEY-001]：花园型验证栈，首层共享工具链、模型评测与安全实验；慢行连到清河，机器人测试限速、限时、可接管。
- **北京AI原点社区** [data:geometry/key_areas.geojson#PROV-KEY-002]：近校成果转化街区，以小街区、共享首层、开源穹顶和生活服务形成步行创新网络。
- **大钟寺AI产业聚集区** [data:geometry/key_areas.geojson#PROV-KEY-003]：城市型智能经济街区，四象限缝合商业、数据要素剧场与公共体验，避免封闭园区化。

三处范围均位于《京张铁路遗址公园沿线（人工智能创新街区重点地区）HD00-1601等街区控制性详细规划》覆盖范围内；蓝景丽家(HD00-1603-01)已取得官方规划条件（容积率2.45/限高60m，京规自（海）供审函〔2025〕0006号），学院路北端A/B/C/J地块用地性质与文号已取得（2018规土（海）条供字0001号），见 `visual/assets/plot-conditions.json`。边界仍为概念多边形，规模/拆改留/道路接口/建筑形态只表达方向；控规各地块图则与官方边界替换后重做面积、冲突与可达性复算 [metric:key_area_count] [depth:three_key_area_detailed_design]。

![三处重点区域与验证任务](assets/figures/key-areas.png)

## AI 创新生态、人才画像与 AI+ 场景

按智能体开放任务书展开用户、场景、测试与运营，而非把AI当作装饰标签 [source:AGENT-TASKBOOK] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]。六类用户：通勤居民、老人/残障人士、学生与科研人员、创业团队与中小企业、游客与亲子家庭、基层运营者。每个场景必须公示目的、数据、模型局限、人工责任人、折返点与停用条件。

### 12张场景卡（含坡度分级与折返点）
|#|场景—空间—运营|坡度级|折返条件（到达即停车评估）|成功指标（评测口径）|
|---|---|---|---|---|
|01|无障碍路径助手—全带慢行网—社区共测|缓坡|路线建议连续3次被拒|可达路线覆盖、纠错时长|
|02|拥挤疏导建议—节点广场—现场调度|中坡|误报率超阈值|等待时长、误报率|
|03|多语文化导览—铁路遗址—文博审校|缓坡|史实错误被纠|纠错率、可理解度|
|04|社区服务导航—原点社区—街区服务台|缓坡|一次办成率低于基线|一次办成率|
|05|中小企业合规助手—科技服务翼—专业复核|中坡|采纳率与撤回率异常|建议采纳与撤回率|
|06|开源算力调度—众智园—资源委员会|陡坡|资源分配公平性投诉|中小团队可得性|
|07|机器人低速配送—小月河翼—限定时窗|陡坡|任何一次接管失败|零伤害、接管率|
|08|公共空间微气候建议—公园节点—园林复核|缓坡|建议被园林部门驳回|热舒适改善|
|09|适老健康服务导航—社区节点—医务转介|中坡|误导率超阈值|误导率、转介完成率|
|10|消费服务翻译—大钟寺—商户共治|缓坡|投诉率超阈值|投诉率、响应时长|
|11|公共安全复盘助手—运营中心—事后审查|陡坡|复盘结论被质疑|复盘闭环率|
|12|市民议题归纳—共智议事厅—随机抽审|中坡|公平性抽查不过|观点覆盖、公平误差|

### 三类折返测试场
A"模型上街前"评测场：偏见、幻觉、鲁棒、隐私和无障碍测试；B"机器人慢行共存"场：限定区域、速度、时段、远程接管与事故入段；C"公共服务智能体联测"场：跨部门流程沙盒，只用合成/清权数据，未通过不接生产系统。测试状态用"正线/侧线/入段"三态公开，任何非正线状态不得表述为已部署。

## OP-01 桌面配对试点档案（方法学演示）

SWB 评分口径的一次实物演示：在 SC-01 无障碍路径助手（折返点 SWB-01，五道口/原点社区）做一组配对测试，把"AI关闭时城市是否仍可用"从口号变成可逐案核对的数据。**这是方法学演示，使用合成测试用例，非真实世界普查基线**——价值在于方法与数据公开，任何人可复算等价差读数；真实基线在 K3-K6 一期普查建立后填入，建立前不冒充真实测量 [depth:metrics_recalculation]。

方法：同一组 12 项无障碍路线请求，在 (A) AI开启 与 (B) AI关闭（ai_off_path=线下引导岗+纸质大字街区图+触觉导引带）两种条件下各跑一遍，记录是否完成；撤回、技术故障与非完成原因与完成数一并登记，不删除失败样本。完整 12 案与逐案结果见 `visual/assets/pilot-evidence.json`，可独立复演。

**复算读数（任何人可重算）：** AI开启完成率 12/12=1.0；AI关闭完成率 8/12=0.667；**等价差 0.333** [metric:ai_off_service_equivalence_gap]。缺口集中在 4 项需实时数据重算的路线（临时占用绕行、夜间无引导岗、雨后改道、施工大幅绕行）——AI关闭时引导岗未掌握实时占用/封路数据。这不是真实基线，但它把"哪些路线在AI关闭后仍可用、哪些不可"变成可逐案核对的数据。真实运行后，实时数据补齐与引导岗扩窗是缩小缺口的具体方向。复算脚本：`count(ai_on_completed==true)/12` 与 `count(ai_off_completed==true)/12`，分母含全部 12 案（含 4 个非完成），未删失败样本。

## 用地、建筑规模与拆改留方案

概念用地以混合创新、公共服务、文化展示和蓝绿开放四类互补，不将研发办公单一化；图层面积可复算，规划比例与容积率待官方边界和控规确定 [data:geometry/land_use.geojson#LU-002] [metric:floor_area_ratio] [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE]。建筑图层只表达适应性改造基底 [data:geometry/buildings.geojson#BLD-001]：优先"留结构、改首层、补无障碍"，拆除须经过安全、文保、碳排与公众程序，新增采用可拆卸小体量 [standard:MOHURD-ARCH-DESIGN-DEPTH-2016]。

## 交通、轨道、市政与公共服务设施

折返走廊优先步行、骑行和公共交通接驳，以一条概念慢行脊连接三区，横向缝合既有道路断点 [data:geometry/roads.geojson#RD-001] [metric:road_length_m] [depth:traffic_rail_slow_parking]。站点与河道线位已按 OpenStreetMap 公开要素核验（含 Overpass 查询与 ODbL 署名，见 `visual/assets/osm-context.json`）[source:OSM-BASE]，仅作现状参照，非测绘级精度。停车以共享、错峰和外围转换为深化方向；新增桥隧不作为承诺。公共服务嵌入15分钟节点，含无障碍咨询、人才服务、开源法务和人工兜底窗口；新型基础设施实行端侧优先、最小采集、分布式能源与传统市政协同，容量和站点均待专项复核 [depth:municipal_new_infrastructure]。

![交通慢行与蓝绿公共空间复合系统](assets/figures/mobility-bluegreen.png)

## 蓝绿空间、公共空间与城市风貌

**已建成事实与规划目标分层（可复核）：** 京张铁路遗址公园**一期已于 2023 年 6 月建成开放**，长 2.4 公里、面积 16.8 公顷，形成面向市民的公园、慢步道与骑行空间 [source:JZ-PARK-PHASE1-OPENED]，相关城市更新行动案例见 [source:JZ-PARK-PHASE1-REPORT]；五道口启动区于 2019 年 9 月完成约 800 米、约 1.7 公顷的绿化景观初步提升 [source:JZ-PARK-STARTUP-2019]。

公园一期 2025 年举办 60 余场主题活动、接待游客 430 余万人次（运营方统计口径）[source:JZ-PARK-2025-EVENTS]。**二期仍为在建/推进中**，"全长约 9 公里、服务沿线近 70 个社区约 45 万人"为规划服务目标，非已建成现状 [source:JZ-PARK-PHASE2-PLANNED]。本方案"约 9.7km 主轴"均指规划目标，空间证据以 provisional 边界为准。

概念蓝绿基底由京张遗址公园、清河/小月河联系与口袋花园组成 [data:geometry/green_space.geojson#GRN-001] [depth:blue_green_public_space]。

公共空间采用"连续慢行脊—横向缝合口—折返验证站"三级结构 [metric:scenario_node_count] [metric:public_space_area_sqm]；验证站以可移动、可拆卸组件嵌入存量空间 [data:geometry/public_space.geojson#PUB-001] [metric:public_space_ratio]。三个公共节点：AI原点·开源穹顶（开源成果年轮与实时评测墙，不展示商业排名）、京张百年·时序站（用折返信号语言串联1909与创新年代，史实由专业机构审校）、折返议事厅（市民/开发者/运营者共同审议城市AI，设静音室、无障碍席、儿童视角台和人工申诉窗口）。大钟寺探索"智能原生但不无人工"新业态；组件不得遮挡文保本体、消防、盲道或交通视距。荣誉体系只记录可复核贡献。

## 5. 三种文化的一条时空叙事（agent.5）

叙事不是"铁路+代码"装饰拼贴，而是三种共同价值：京张铁路的自主工程与公共连接、中关村的开放试验与知识转化、AI时代的可验证协作。游线分三幕：**从自主建造出发—在折返换向中迭代—向人本智能共同负责**。导视采用轨枕节奏、坐标刻度与折返印章；文化标识讲"时间与地点"，整体Logo讲"折返与验证"，两者严格分层。所有历史图片、字体、肖像和标识仅使用自制、公共领域或明确授权材料。

## 更新项目清单、实施政策与分期计划

项目清单以可逆原型、公共证据设施、慢行缝合和存量首层更新为四类；概念分期图层记录近期试点、折返点和退出条件 [data:geometry/phasing.geojson#PHASE-001] [depth:renewal_project_list] [depth:phasing_implementation]，不代表政府投资、招商或审批安排。年度节律以真实城市问题而非会展流量为主线：春季城市问题开源季（居民与基层运营者发布任务）→夏季"模型上街前挑战"（安全、公平、无障碍红队与复现）→秋季京张城市AI周（开放演示、失败案例展、专业评审）→冬季公共价值复盘会（公布指标、折返、入段、事故、停用与下年预算建议）。测试场景经"提出—伦理/安全预审—小规模试验—公众反馈—独立评估—放行/折返/入段"六关。国际合作只输出开放协议、评测集与可复用组件，不输出未经授权数据。

## 7. 实施路线与K标
|阶段|低后悔行动|进入下一阶段门槛|
|---|---|---|
|K0—K3（0-6个月）|官方资料补齐、无障碍审计、问题征集、存量空间清单|来源清权、公众代表参与、风险台账完成|
|K3—K6（6-18个月）|3个可逆原型、公共评测协议、贡献者系统|独立评估通过、重大风险可入段|
|K6—K9（18-36个月）|三区两翼联动、年度活动、开放组件复用|公共价值指标持续改善|
|K9后|在法定程序和专项论证后择优深化|人类专业团队最终判断|

每个K标对应一次官方数据复算与版本记录 [depth:kmarker_versioning]。**本包为 K2**（v9.3）：在 K1（v9.1，79 分）基线上做正文压缩与表达锐化（baobao 路径），架构与全部数据不变；K1 在 K0（v8.1，84 分评审通过）基线上补入折返等价基准 SWB、拔线测试操作层与 OP-01 试点，并登记变更回执 CR-2026-08-14-001（见 `visual/assets/governance-receipts.json`），证明 K标版本治理是跑过的机制而非承诺。治理结构由公共价值委员会（含居民与无障碍代表）、技术与安全组、空间与文保组、独立评测组、运营秘书处构成。高影响决策禁止自动化；涉及健康、安全、权益、执法或资源分配的输出必须有人类责任人。数据默认不采集，确需采集则最小化、限定期限、用途隔离、可撤回并接受审计。

## 指标体系、面积复算与合规矩阵

![核心指标与公共证据闭环](assets/figures/metrics-evidence.png)
空间数值 [metric:site_area_sqm] [metric:green_ratio] [metric:public_space_ratio] 仅是 provisional geometry 下的机器复算结果，不是规划控制指标。方案承诺的是评测口径：公共利益（问题关闭率、弱势群体参与率、无障碍任务完成率）；可信AI（独立评测覆盖率、严重缺陷拦截率、人工接管率、申诉关闭时长）；创新生态（公开任务数、中小团队参与率、成果复用数、跨区协作数）；空间体验（连续可达节点比例、热舒适反馈、公共活动时段覆盖）；运营韧性（维护责任明确率、到期复审率、入段演练通过率）。

可复算指标登记（可信AI 与公共服务维度）：独立评测覆盖率 [metric:independent_ai_evaluation_coverage]、公众问题关闭率 [metric:public_issue_closure_rate]、申诉关闭时长 [metric:appeal_resolution_time_hours]、人工接管率 [metric:human_override_rate]。

可复算指标登记（折返治理维度）：折返/入段记录数 [metric:sunset_clause_trigger_count]、AI关闭路径完备率 [metric:ai_off_path_completeness]、人工接管指定率 [metric:human_handoff_designation_rate]、AI开关服务等价差 [metric:ai_off_service_equivalence_gap]。基线在一期普查建立；未获真实数据前不填虚假目标值（ai_off_service_equivalence_gap 首个读数由 OP-01 方法演示给出 0.333，非真实基线）。风险优先级：① provisional 边界与法定条件缺失——获取官方包后全量替换、EPSG:4548复算；②算法歧视与数字排斥——离线/人工替代、分组评测、无障碍共测；③监控扩张——禁止人脸识别默认部署、数据影响评估和折返条款；④机器人安全——物理隔离、限速、远程接管、事故即入段；⑤文保与工程冲突——文保、消防、交通、市政专项论证；⑥运营烂尾——每项场景绑定责任人、预算来源假设、维护SLA和退出计划。

## 风险、版权与合规说明

现状约束图层目前为空，明确表示权属、文保、市政、消防、洪涝与道路红线尚未获得，不得误读为"无约束" [data:geometry/constraints.geojson#CON-999] [depth:risk_missing_data] [source:SOURCE-REGISTRY]。五张核心图：总体证据与概念、三区两翼结构、三重点区角色、慢行蓝绿与折返环、指标治理闭环。机器可读：geometry（含 8 个 SWB 折返点）、metrics（含 3 项等价指标）、risk（8项风险维度停止/恢复规则）、assumptions、sources、compliance/standard/depth matrices，以及 visual/assets 下的 swb-spec、governance-receipts、pilot-evidence；导航层处理资料 [source:PROCESSED-FACT-PACK]（非权威来源）。人类可读：本报告、离线 visual、A3文册与A0展板。版权：文本、图表与图形由本次智能体协作生成；第三方事实只作引用，不嵌入未授权图片、字体、商标或人物素材。本方案响应三大定位、五大功能、三区两翼和 agent.1—agent.6。核心不是预测一座"全自动城市"，而是建立一套让城市AI在真实公共空间中**沿轨道可查、可停、可回头**的制度与空间基础设施。人类与专业团队保留最终判断。

## 品牌与标识规范 [depth:brand_identity]

色号系统：深轨蓝 #071A2B（主色）、验证绿 #00D8C6（可用色）、历史铜 #C8964A（强调色）、试验黄 #FFC857（警示色）、轨道银 #A0AAB5（辅助色）、人工确认红 #FF6B6B（高危色）。主标识为「人」字形折返符号 + JZ Valley 标准字组合；A0 展板与 A3 文册统一以深轨蓝为底色、验证绿为数据色；数字展示用深色模式。禁用：不改色、不加描边、不置于复杂背景、不旋转。

## 公共参与机制 [depth:public_participation]

公众代表分类：通勤居民、老人/残障人士、学生科研人员、中小企业主、游客家庭、基层运营者各 2-4 名，公开招募+社区/组织推荐，不设学历或技术配额；任期每期 6 个月可连任。参与补偿按北京市最低小时工资×1.5 倍发放，每次会议不少于 2 小时，含交通与看护补偿。无数字渠道：公共参与点提供纸质意见表、人工辅助填写、电话反馈和现场投递箱；重大决策前至少一次线下说明会，提前 14 天公布。各项参与效果按代表分类分组评估，年底公开含分组满意度、问题关闭率、响应时长。**公众代表否决权：** 涉及数据采集、监控部署、限制性措施等场景，公众代表有权在折返点否决（触发强制折返）；否决权行使范围、程序与效力在折返点制度和公众参与章程中明确 [depth:switchback_governance]。

## 参考资料
- [source:OFFICIAL-ANNOUNCEMENT] 官方资格预审公告。
- [source:AGENT-TASKBOOK] 面向全球智能体的开源征集任务书摘录。
- [source:SOURCE-REGISTRY] 仓库公开资料登记表。
- [standard:MOHURD-URBAN-DESIGN-MEASURES] 城市设计管理办法本地快照。
- [standard:MOHURD-CONTROL-DETAILED-PLANNING] 控制性详细规划编制审批办法本地快照。
- [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE] 用地用海分类指南本地快照。
