---
title: "京张开放接口：城市接口协议与三种公共端点"
author_github: "SharkyyIvy"
language: "zh"
proposal_format_version: "2"
bilingual_contract_version: "1"
translation_file: "proposal.en.md"
license: "COMMUNITY-DISPLAY-ONLY"
summary: "以连续公共接口、三种差异化端点和并行人工路径，把AI创新转译为可定位、可申诉、可停用、可复算的城市更新项目。"
tracks: ["ai-traffic-walkability", "enterprise-services-ecosystem", "civic-agent-governance"]
scenarios: ["ai-traffic-walkability", "enterprise-service-copilot", "public-safety-operations-review"]
---

# 京张开放接口：城市接口协议与三种公共端点

> **核心判断** 京张沿线不缺封闭园区或数字展示，缺少的是一套把高校成果、企业验证与市民权利放在同一公共界面上接受检验的城市规则。JZOI 将约 11.4 平方公里总体设计范围组织为一条连续的 `MAIN-IF-01` 公共接口，在众智园、北京AI原点社区和大钟寺分别设置“受控测试院”“多孔协作院”“城市交换台”。任何自动服务都与 `PARALLEL-HUMAN-01` 人工路径并行：不使用智能手机、不授权个人信息或不同意自动决策的人，仍能获得同等基本服务。

本成果是基于临时范围的概念城市设计，不是法定规划、建设许可或政府承诺。图中控制线、建筑动作和运营主体均需在正式边界、控规、权属、交通、市政、消防、文保与公众协商条件齐备后校准。[source:OFFICIAL-ANNOUNCEMENT] [source:SITE-PACKAGE]

## 设计依据与资料清单

证据按用途分三级管理。**Formal** 是可直接约束本方案表达的公开文件：征集公告、面向智能体任务书、国土空间用地分类、个人信息保护法和无障碍环境建设法。**Background** 仅用于提炼方法：NIST AI 风险管理框架、WCAG 2.2，以及巴塞罗那超级街区、赫尔辛基 Kalasatama、伦敦 King's Cross 的公开案例；它们不证明北京现状，也不替代中国规范。**Provisional** 只有 `SITE-001` 与 `PROV-KEY-001..003` 临时几何，用于在统一坐标框架内讨论方案，不能解释为红线或地块。[source:SOURCE-REGISTRY] [source:PIPL-2021] [source:BARRIER-FREE-LAW-2023]

| 证据级别 | 可支持的判断 | 不可支持的判断 | 本方案处理 |
| --- | --- | --- | --- |
| Formal | 任务范围、公共利益、数据权利、用地分类、无障碍义务 | 具体地块权属、容积率、道路红线 | 直接进入标准与合规矩阵 |
| Background | 风险治理、共创、遗产更新和低速公共空间的方法 | 场地事实、法定参数、照搬空间形态 | 只记录“可迁移原则/拒绝照搬项” |
| Provisional | 方案对象相对位置、数量、证据链测试 | 精确面积、审批、征拆、工程定位 | 所有派生结果标注待重算 |

对照案例产生三条取舍：从巴塞罗那借鉴“把道路空间还给日常公共生活”，但不复制规则网格；从 Kalasatama 借鉴“城市实验与居民共同定义问题”，但拒绝设备优先；从 King's Cross 借鉴“遗产构筑物与新混合功能共同形成公共场所”，但拒绝以私有园区规则替代公共申诉机制。[source:CASE-BARCELONA] [source:CASE-KALASATAMA] [source:CASE-KINGS-CROSS]

![证据等级、案例转译与成果链](assets/figures/site-overview.png)

## 三层范围工作框架

43.6 平方公里统筹研究范围用于理解“高校策源、开源协作、企业验证、公共采用”的关系，不新增空间红线；11.4 平方公里总体设计范围承载 `MAIN-IF-01`、蓝绿网络、服务边缘和十二个更新项目；三处共约 368.4 公顷重点区则验证三种不同端点。三层分别回答生态关系、连续城市结构和可实施原型，避免把同一张示意图重复用于所有尺度。[source:OFFICIAL-ANNOUNCEMENT] [depth:three_level_scope_framework]

空间协议由八类构件组成：`MAIN-IF` 连续公共主接口；`GW` 穿越道路、校园和站点边界的门户；`EP` 可容纳研发或服务的端点建筑；`SB` 可隔离风险的测试院；`HRG` 有姓名和时限的人工复核门；`FS` 不依赖设备的人工服务台；`OSC` 开源协作公地；`EDGE` 面向河流、社区或交通基础设施的公共边缘。构件不是造型词汇，而是每个项目验收时可逐项检查的功能接口。[data:geometry/roads.geojson#MAIN-IF-01] [data:geometry/public_space.geojson#ZZY-SB-01] [metric:endpoint_count]

![城市接口协议、三层范围与功能结构](assets/figures/land-use-structure.png)

## 统筹研究范围产业与未来城市研究

产业生态以“问题进入、受控验证、人工复核、公共采用、持续退出”五步链替代一般性的产业名录。高校和开源社群在 `ORG-OSC-01` 定义公共问题与依赖；企业和研究机构在 `ZZY-SB-01` 进行限定范围测试；受影响居民、法律与无障碍顾问在 `ZZY-HRG-01` 或 `DZS-HRG-01` 完成人工复核；通过的服务在 `DZS-SWITCH-01` 接入城市服务；未达标项目退出并公布原因。空间供应因此包括低成本共修桌、合规测试仓、人工申诉厅、无屏服务窗和可撤除部署位，而非只有办公面积。[data:geometry/buildings.geojson#ORG-OSC-01] [data:geometry/buildings.geojson#ZZY-HRG-01]

**视觉识别系统。** 中文主名“京张开放接口”，英文主名 **JINGZHANG OPEN INTERFACE**，缩写 **JZOI**。标志是两个不闭合方括号夹住一条连续基线：方括号表示可接入与可退出，基线表示铁路公共连续性。主色为 Protocol Black `#111820`、Review Orange `#FF5A36`、Interface Cyan `#00A6B2`，辅助色 Commons Green `#4C8B62`、Sandbox Yellow `#F1C84C`；颜色从不单独传递状态，必须同时使用文字和线型。编号采用 `站点-构件-序号`，导视只回答“在哪里、谁能用、谁负责、如何人工办理”四个问题。

“未来城市”不等于传感器密度。JZOI 的判断标准是：公共路径是否连续，自动决策是否可拒绝，人工服务是否同等可达，试验是否可停止，贡献是否有证据，运营责任是否可追究。总体目标以 `no_device_fallback_coverage=1.0`、12 个 `human_review_gate` 场景、48 小时人工首次响应目标和公共接口可用时段目标进行验证；后两项是试点目标，不是既有绩效。[metric:no_device_fallback_coverage] [metric:appeal_response_target_hours]

## 总体设计范围城市更新与控规深度城市设计

总体空间由四个连续带状用地单元和嵌入其中的精细对象构成：研发验证界面 `LU-RD-01`、京张公共公地 `LU-COMMONS-01`、产业与公共服务混合界面 `LU-MIX-01`、社区生活与人才服务界面 `LU-LIFE-01`。四个单元完整覆盖临时边界，仅用于控制方案结构；容积率、高度、密度和退线保持 unknown。沿 `MAIN-IF-01` 的首层每隔一段设置公共房间或人工窗口，避免产业空间形成连续封闭围墙。[data:geometry/land_use.geojson#LU-COMMONS-01] [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE]

更新方法为“保留骨架、改造首层、可逆加建、最后判断拆除”。12 个建筑基底均记录 `retain_action`；在缺少房屋安全、消防、权属和文保调查时，不作拆除结论。新建部分优先采用可逆轻型构件，屋顶加建不突破现状可核高度基准，面向公共接口一侧形成 6-12 米可停留前场；具体数值须在测绘与控规条件取得后转换为地块控制。[data:geometry/buildings.geojson#DZS-HRG-01] [depth:retain_renovate_demolish]

综合承载采用“空间容量+运营容量”双门槛。空间容量关注连续步行、消防与无障碍、雨洪和设备检修；运营容量关注人工班次、申诉积压、数据保留、测试并发量和停用能力。任一门槛未通过，系统只能留在沙盒，不进入城市服务。`GAP-ROAD-01`、`GAP-HERITAGE-01`、`GAP-WATER-01`、`GAP-UTILITY-01` 显示必须由专业资料替换的四类接口，不把资料缺口藏在总注释中。[data:geometry/constraints.geojson#GAP-UTILITY-01] [assumption:A-UTILITIES-009]

## 重点区域详细设计

三处重点区共享协议但空间性格不同，不使用同一套“园区+展厅”复制。

### 众智园 / ZZY：CONTROLLED YARD 受控测试院

`ZZY-SB-01` 是带明确边界、预约时段和停止条件的测试院。南侧 `ZZY-EP-01` 为模型与机器人验证仓，东侧 `ZZY-HRG-01` 为人工复核与标准中心，北侧 `ZZY-EDGE-01` 面向清河设置低碳工坊；`ZZY-GW-01` 连接东西门户，`ZZY-FS-01` 在非测试区提供无设备企业服务。测试设备不得占用 `PARALLEL-HUMAN-01`，异常时先恢复普通步行、人工登记与纸质告知。建筑策略以改造现有大跨空间和可逆设施为主，生态策略先采用可见雨水花园和遮阴，再决定是否接入传感控制。[data:geometry/public_space.geojson#ZZY-SB-01] [data:geometry/roads.geojson#ZZY-GW-01]

### 北京AI原点社区 / ORG：POROUS COMMONS 多孔协作院

`ORG-OSC-COURT` 不设单一主入口，校园、社区和企业可从四向进入。`ORG-OSC-01` 提供开放依赖诊所和共修桌，`ORG-EP-01` 将科研成果翻译为可测试原型，`ORG-FS-01` 处理无屏咨询、知识产权和社区权益，`ORG-EDGE-01` 把人才生活服务放在街道首层而非封闭会所。`ORG-GW-01` 只描述需要打通的校城通廊，实施前须与校园边界、道路和产权协商。院内贡献展示只发布经本人同意的项目、版本和公共价值，不制作个人行为排行榜。[data:geometry/public_space.geojson#ORG-OSC-COURT] [data:geometry/buildings.geojson#ORG-FS-01]

### 大钟寺 / DZS：URBAN SWITCHBOARD 城市交换台

`DZS-SWITCH-01` 位于东西 `DZS-GW-01` 与南北 `DZS-GW-02` 的交点，将轨道接驳、商业服务、数据授权、申诉和文化展示并置。西厅 `DZS-EP-01` 承接城市服务与企业接口，东厅 `DZS-HRG-01` 专门处理授权、解释和申诉，`DZS-FS-01` 提供工作人员办理，`DZS-EDGE-01` 展示终端与内容但不得阻断通行。四象限连通优先解决过街等待、无障碍高差和夜间可见性，媒体屏与活动设施退到主通道之外。[data:geometry/public_space.geojson#DZS-SWITCH-01] [data:geometry/roads.geojson#DZS-GW-02]

![三种端点概念总图与构件索引](assets/figures/key-areas.png)

## AI 创新生态、人才画像与 AI+ 场景

六类主要使用者为：需要低成本验证的初创团队、需要成果转译的师生、承担合规责任的企业运营者、依赖线下服务的老人和无智能手机居民、需要连续无障碍路径的残障人士、受测试噪声与数据处理影响的周边居民。最后三类不是“体验者”，而是具有拒绝、解释、申诉和退出权的共同决策者。[source:PIPL-2021] [source:BARRIER-FREE-LAW-2023]

| ID | 场景与空间 | 最小数据 | 人工路径与停止条件 | 建议运营方 / 验收指标 |
| --- | --- | --- | --- | --- |
| SC-01 | 模型审计窗 / ZZY-SB-01 | 测试集版本、错误类型；不含身份 | HRG 逐项签字；严重偏差即停测 | 第三方评测+园区；审计记录完整率 100% |
| SC-02 | 机器人礼让场 / ZZY-SB-01 | 设备轨迹与匿名事件 | 安全员物理停机，普通步行始终开放 | 场地运营方；零侵入人工通道事件 |
| SC-03 | 清河低碳调度台 / ZZY-FS-COURT | 公共环境与设备能耗聚合值 | 手动灌溉与巡检可独立运行 | 物业+水务顾问；人工模式季度演练 |
| SC-04 | 无屏企业服务窗 / ZZY-FS-COURT | 企业主动提交事项 | 纸质、电话、工作人员三种入口 | 企业服务机构；线下同等办结率 |
| SC-05 | 开放依赖诊所 / ORG-OSC-COURT | 软件物料清单，不采参与者画像 | 专家面谈；未清许可证不得发布 | 开源社群+法务；依赖许可清晰率 |
| SC-06 | 原型共修桌 / ORG-OSC-COURT | 项目版本与自愿贡献 | 现场导师；危险原型不得离开工作台 | 高校+社区实验室；可复现原型数 |
| SC-07 | 邻里权益翻译台 / ORG-FS-COURT | 居民主动作出的服务请求 | 人工解释、撤回、申诉全程可用 | 社区服务中心；48小时首次回应目标 |
| SC-08 | 人才生活交换柜 / ORG-FS-COURT | 物品与时段，不做信用评分 | 人工登记；无人值守故障即开放人工领取 | 社区运营方；非数字用户完成率 |
| SC-09 | 数据授权闸 / DZS-SWITCH-01 | 单次服务授权凭证 | 可拒绝并转人工，不因拒绝降低基本服务 | 数据合规机构；撤回成功率 100% |
| SC-10 | 城市服务申诉台 / DZS-SWITCH-01 | 申诉材料与处理日志 | 具名工作人员受理；自动结论不得终局 | 公共服务协调方；超时案件公开计数 |
| SC-11 | 百年技术时间台 / DZS-EDGE-COURT | 经清权的档案元数据 | 纸本、触摸模型与讲解员并行 | 文化机构；版权记录完整率 100% |
| SC-12 | 静默导航灯带 / DZS-SWITCH-01 | 不采个人数据，仅固定时段状态 | 触觉、实体标识和工作人员并行 | 站城运营方；无障碍路径可用率 |

所有场景遵循“目的明确、最小收集、显著告知、便捷撤回、人工解释、限期删除”。公共空间不部署身份识别；自动决策不得成为获得基本服务的唯一入口。NIST AI RMF 的 Govern-Map-Measure-Manage 只作为风险工作表结构，不替代中国法律或审批。[source:NIST-AI-RMF] [metric:human_review_gate_count]

## 用地、建筑规模与拆改留方案

用地层保持完整、闭合和无重叠，精细功能由建筑与公共空间对象表达，避免在临时矩形边界上制造伪地块。`LU-RD-01` 对应科研类，`LU-COMMONS-01` 对应公园绿地，`LU-MIX-01` 对应商业服务，`LU-LIFE-01` 对应社区服务；分类仅用于本轮结构校验。[data:geometry/land_use.geojson#LU-RD-01] [metric:site_area_sqm]

建筑台账以 `retain_action` 管理：`retain` 表示保持主体并开放首层，`renovate` 表示对内部与界面进行适应性改造，`add_reversible` 表示可拆卸的小型服务构件。没有任何对象被标为拆除。建筑基底总面积由 12 个概念基底复算；总建筑面积、容积率、法定高度、建筑密度与停车配建均为 unknown，直至取得正式控制条件。[data:geometry/buildings.geojson#ORG-EP-01] [metric:building_footprint_area_sqm]

体量控制采用三条可审查规则：面向 `MAIN-IF` 的首层保持视觉和步行通透；新增体量退后于可核实的既有檐口；文化与河流界面只用可逆、低眩光、低噪声设施。规则在建筑测绘、日照、消防和文保审查后才能转换为数值控制，不以概念图尺寸代替法定条件。[depth:height_massing_character] [assumption:A-BUILDING-004]

## 交通、轨道、市政与公共服务设施

交通体系先保证 `MAIN-IF-01` 与 `PARALLEL-HUMAN-01` 南北连续，再通过三个 `GW` 系列解决横向连接。两条纵向路径功能不同：主接口容纳场景、导视和活动，人工路径保持安静、无广告、无强制数字交互。众智园以测试骑行环与东西门户组织园区；原点社区以校城通廊和共享街组织短距离协作；大钟寺以四象限连通和站城南北接口减少绕行。道路精确位置须待红线、站口和交通调查确认。[data:geometry/roads.geojson#PARALLEL-HUMAN-01] [assumption:A-MOBILITY-005]

无障碍不止是坡道。连续路径需要无阶差、触觉与高对比信息、可停留座椅、安静等待点、清楚的人工求助位置，以及不依赖颜色和手机的导视。离线 HTML 参照 WCAG 2.2 的可感知、可操作、可理解、稳健原则；实体空间仍以中国无障碍法律和后续专业规范为准。[source:W3C-WCAG22] [source:BARRIER-FREE-LAW-2023]

市政采用“低技术先行、数字增强可退出”：雨水花园在传感器失效时仍能滞蓄；照明有本地手动控制；导视在断网时仍可读；边缘计算柜不占公共通道；设备电源、散热、消防和检修在 `GAP-UTILITY-01` 完成专业校核前不得承诺容量。服务半径和班次以试点记录校准，不使用未观测的需求数据制造精确值。[data:geometry/constraints.geojson#GAP-WATER-01]

![公共路径、门户、蓝绿空间与人工替代系统](assets/figures/mobility-bluegreen.png)

## 蓝绿空间、公共空间与城市风貌

`GREEN-MAIN-01` 提供连续生态基底，三处重点区分别形成清河海绵测试园、原点共享林下公地和大钟寺站前雨水公园。绿地率是概念几何复算值，不是控规指标。生态设施公开展示进水、溢流和维护状态，但不以屏幕替代真实树荫、土壤和排水；传感系统停用后仍维持基本生态功能。[data:geometry/green_space.geojson#GREEN-MAIN-01] [metric:green_ratio]

城市风貌采用 **Civic Protocol Modernism / 公共协议现代主义**：黑色结构线表示责任边界，橙色表示需要人工复核，青色表示可接入路径，绿色表示无需设备即可使用的公共公地，黄色表示限定测试。组件库包括五类：`IF-MARK` 接口路标、`CONSENT-POST` 授权告知柱、`HUMAN-DESK` 人工台、`TEST-RAIL` 可移动测试围栏、`QUIET-BEACON` 静默导航灯。每件组件都显示 feature ID、运营方、开放时段、数据处理和投诉方式。

文化地图不是景点拼贴，而是一条“基础设施如何成为公共知识”的路线：铁路工程记忆、清河生态修复、高校开源协作、城市服务申诉和智能终端消费依次出现。朝圣地标 **OPEN BRACKET / 开放括号** 位于 `DZS-EDGE-COURT`，由两组可进入的实体括号与一条百年时间尺构成；不使用人脸、排名或动态广告。贡献系统只记录经同意公开的项目版本、修复事项、公共价值和复核结论，可撤回姓名并保留匿名项目记录。[data:geometry/public_space.geojson#DZS-EDGE-COURT]

## 更新项目清单、实施政策与分期计划

| 项目 | 可交付成果 | 建议责任角色 | 前置门槛 | 验收与退出 |
| --- | --- | --- | --- | --- |
| JZOI-P01 连续公共接口 | MAIN-IF+人工路径+基础导视 | 区级公共空间协调方 | 红线、无障碍、消防 | 连续通行；任一数字设施可独立停用 |
| JZOI-P02 众智受控测试院 | SB、验证仓、复核中心 | 园区+第三方评测 | 安全边界、责任保险 | 物理停机演练通过，否则停测 |
| JZOI-P03 清河人工与生态界面 | FS、雨水园、低碳工坊 | 园区+水务/园林顾问 | 蓝线、防洪、运维 | 手动模式可运行，否则不接入自动控制 |
| JZOI-P04 原点开源公地 | OSC、转译仓、共修桌 | 高校+开源社群 | 校城协商、许可审查 | 公共开放时段与依赖清单达标 |
| JZOI-P05 原点邻里服务边缘 | 人工窗口、共享街、人才服务 | 社区+企业服务机构 | 权属、首层改造 | 非数字用户获得同等办理 |
| JZOI-P06 大钟寺交换台 | 四象限连通、授权与申诉厅 | 站城协调方+合规机构 | 站口、交通、市政 | 拒绝授权仍可办基本服务 |
| JZOI-P07 大钟寺文化前庭 | 开放括号、终端展廊、静默导视 | 文化机构+商业运营方 | 版权、噪声、活动安全 | 主通道零占用、版权台账完整 |
| JZOI-P08 研发首层开放计划 | 可预约评测与展示房间 | 产权方+园区 | 建筑与消防调查 | 公共时段兑现，否则取消激励 |
| JZOI-P09 服务边缘混合更新 | 公共服务与企业服务交替界面 | 街道+产权方 | 业态、租约、消防 | 免费公共设施不被商业挤出 |
| JZOI-P10 无设备服务网络 | 台席、电话、纸本、工作人员 | 各场景运营方 | 人员和长期预算 | 覆盖率 100%，不足即暂停自动扩张 |
| JZOI-P11 贡献与证据账本 | 项目版本、复核、退出公开页 | 独立秘书处 | 同意、版权、审计 | 可撤名、可更正、季度公开 |
| JZOI-P12 年度公共运营 | 四季活动与公开复盘 | 公益运营联盟 | 场地许可、资金、安全 | 每年公开保留/调整/退出清单 |

分期不是按地块一次性建设。`PHASE-01` 在 0-18 个月测试大钟寺、原点和连续公共接口的轻量组件；`PHASE-02` 在 18-36 个月进行原点和总体首层更新；`PHASE-03` 在 36-60 个月推进众智测试院和生态界面。每期进入下一阶段前必须通过公共路径、无障碍、数据治理、运营预算和专业审批五道门；未通过的项目缩回可逆试点。[data:geometry/phasing.geojson#PHASE-01] [depth:phasing_implementation]

年度运营以四个季度形成闭环：春季“问题入库”由居民、高校和企业共同定义任务；夏季“受控验证”只在沙盒测试；秋季“公共采用听证”展示证据与异议；冬季“退出与维护月”公布停用、修复和下一年预算。每月安排一次无设备服务日，每季度演练一次断网、人工接管与投诉转交。长期治理由公共部门监督、场地运营方负责安全与开放、数据处理者承担法定义务、独立评测方验证风险、社区代表参与续期决定。

## 指标体系、面积复算与合规矩阵

指标分为三类。**几何复算值**包括 `site_area_sqm`、建筑基底、绿地与公共空间比例、主接口和人工路径长度；**设计交付计数**包括 3 个端点、12 个场景、12 个复核门和 12 个项目；**运营目标**包括 48 小时人工首次响应和 99% 计划开放时段可用率。第三类只有建立基线后才能成为绩效，不得与现状事实混用。[metric:main_interface_length_m] [metric:scenario_node_count]

三个矩阵不再共享一组泛化证据。`compliance_matrix.json` 为每条公告和 agent 任务指定最窄章节、feature ID、指标、图纸面板、来源、假设和自检；`standard_matrix.json` 区分法定依据、专业方法与数据缺口；`design_depth_matrix.json` 分别验证诊断、结构、用地、体量、拆改留、交通、市政、蓝绿、重点区、项目、分期和风险。图纸和 HTML 使用同一 ID，评审者可从场景卡追到空间对象、责任人和退出条件。[depth:metrics_recalculation] [standard:PROJECT-OFFICIAL-ANNOUNCEMENT]

![指标、项目、分期与证据闭环](assets/figures/metrics-evidence.png)

## 风险、版权与合规说明

最高风险不是算法精度，而是公共空间被试验占用、拒绝授权后服务降级、人工窗口名存实亡、临时几何被误认作红线，以及运营经费中断。对应控制为：人工路径物理独立；基本服务不以同意为前提；人工班次和响应时间公开；所有图纸显示 provisional；项目续期必须同时披露预算、投诉、停用和无障碍记录。[source:PIPL-2021] [depth:risk_missing_data]

著作权与许可逐项记录在 `report/copyright_statement.md`。方案文字、图形、GeoJSON 设计对象和代码化图件由本次 AI agent 原创生成；官方网页只作事实和规范引用；案例网页只作背景研究；未复制第三方照片、图标、地图瓦片、商标或字体文件。PDF/PNG 使用本机系统字体渲染，字体文件不进入提交包。离线 HTML 不加载远程资源、不追踪评审者、不提交表单。

在 official boundary、重点区 polygon、控规、道路和轨道、市政、现状建筑、权属、文保与公共服务资料到位后，重跑顺序为：替换约束图层；重新相交并校正设计对象；复算 metrics；更新图件/PDF/HTML；刷新三矩阵和 manifest；由规划、建筑、交通、景观、市政、无障碍、数据合规和运营专业人员联合签认。此前成果只进入概念内容评分，不进入施工或法定审批。

## 参考资料

- 项目任务与本地登记：[source:OFFICIAL-ANNOUNCEMENT] [source:AGENT-TASKBOOK] [source:SOURCE-REGISTRY]
- 中国法律与分类依据：[source:PIPL-2021] [source:BARRIER-FREE-LAW-2023] [source:MNR-LAND-USE]
- 风险与可访问性背景方法：[source:NIST-AI-RMF] [source:W3C-WCAG22]
- 城市案例背景：[source:CASE-BARCELONA] [source:CASE-KALASATAMA] [source:CASE-KINGS-CROSS]
- 机器可读完整索引：`sources.json`、`metrics.json`、`assumptions.json`、`compliance_matrix.json`、`standard_matrix.json`、`design_depth_matrix.json`
