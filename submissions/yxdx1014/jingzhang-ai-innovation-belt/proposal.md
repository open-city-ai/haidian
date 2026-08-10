---
title: "京张智脉：可验证的AI城市创新织补系统"
author_github: "yxdx1014"
language: "zh"
translation_file: "proposal.en.md"
license: "COMMUNITY-DISPLAY-ONLY"
summary: "以京张遗址公园为公共脊，组织三处差异化创新核、两翼服务回路、六项更新项目与十二个可审计AI场景；全部空间判断可回到真实GeoJSON对象，临时边界保持可替换、可重算。"
tracks: ["ai-traffic-walkability", "enterprise-services-ecosystem", "civic-agent-governance"]
scenarios: ["ai-traffic-walkability", "enterprise-service-copilot", "public-safety-operations-review"]
iteration: "v2.0"
---

# 京张智脉：可验证的AI城市创新织补系统

## 设计依据与资料清单

### 已完成方案摘要：一条公共脊，三核两翼，十二个可审计场景

“京张智脉”把京张遗址公园理解为一条可步行、可学习、可试验、可追责的城市公共脊，而不是把 AI 园区理解为封闭地块的集合。方案已经形成“一脊、三核、两翼、六项目”的空间系统：`ROAD-SPINE` 串联南北公共空间；众智园、AI 原点、大钟寺三处重点区分别承担全栈验证、开源转化、智能原生城市服务；东翼承载场景赋能，西翼承载科技服务；六项更新项目按三期推进。[data:geometry/roads.geojson#ROAD-SPINE] [data:geometry/roads.geojson#ROAD-EAST-LOOP] [data:geometry/roads.geojson#ROAD-WEST-LOOP] [depth:overall_spatial_structure]

设计依据来自官方公告、面向智能体任务书和仓库登记的正式资料体系，而非通用智慧城市模板。[source:OFFICIAL-ANNOUNCEMENT] [source:AGENT-TASKBOOK] [source:SITE-PACKAGE] [source:SOURCE-REGISTRY] [source:PROCESSED-FACT-PACK] [standard:PROJECT-OFFICIAL-ANNOUNCEMENT] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]

本包没有官方精确红线。总体范围及三处重点区沿用仓库临时粗略几何，全部保持 `official_boundary=false`、`geometry_role=provisional_constraint`、`boundary_precision=provisional_rough`。它们只支撑方案生成、相对关系检查和 intake 复算，不支撑官方红线、审批或精确面积结论。[source:BOUNDARY-SOURCE] [source:KEY-AREA-SOURCE] [data:geometry/site_boundary.geojson#SITE-001] [depth:risk_missing_data]

`constraints.geojson` 目前为零 feature，因为仓库没有可清权、可定位的道路红线、权属、市政、消防、防洪或文保约束 polygon。[data:geometry/constraints.geojson] 本方案没有补画假约束；所有受影响判断降级为概念建议，并通过 `A-CONTROLS-001`、`A-BOUNDARY-002`、`A-BUILDING-003` 和 `A-OPERATIONS-004` 记录前置条件。官方资料到位后，应整体替换边界并重算图层、指标、五图、PDF 和 HTML，而不是局部修图。

![总体结构：公共脊、三核与两翼服务回路](assets/figures/site-overview.png)

## 三层范围工作框架

### 2.1 三层范围的传导关系

统筹研究范围回答“海淀 AI 生态如何形成跨机构协作”；总体设计范围回答“协作如何落到连续公共空间、功能分区和交通联系”；三处重点区回答“不同创新阶段需要什么建筑原型、开放空间和治理机制”。三层不是三套相互割裂的图，而是从生态机制到空间网络、再到局部项目的连续传导。[depth:three_level_scope_framework]

| 层级 | 已完成判断 | 空间落点 | 尚缺官方条件 |
| --- | --- | --- | --- |
| 统筹研究 | 形成“研究—验证—转化—服务—传播”创新链 | 三核分工与两翼回路 | 43.6平方公里完整产业、人才和设施底数 |
| 总体设计 | 形成公共脊、四类完整用地分区、六条联系线 | `LU-001`—`LU-004`、`ROAD-*` | 精确总体红线、现状用地、道路红线与控规 |
| 重点区域 | 形成三套差异化详细设计原型 | `PROV-KEY-001/002/003` | 三处官方 polygon、权属、建筑与市政测绘 |

### 2.2 现状诊断：不是“缺功能”，而是连接与治理断裂

第一处断裂是南北创新资源之间缺少可识别的公共联系，因此设置 `ROAD-SPINE` 与 `GREEN-SPINE` 叠合为公共脊；第二处断裂是校园、园区、社区和轨道站点各自成片，因此以 `ROAD-LINK-N/M/S` 形成三条东西缝合线；第三处断裂是试验活动缺少公开的准入、复核和退出界面，因此把公共空间节点与建筑原型配对，而不是只部署技术设备。[data:geometry/green_space.geojson#GREEN-SPINE] [data:geometry/roads.geojson#ROAD-LINK-N] [data:geometry/roads.geojson#ROAD-LINK-M] [data:geometry/roads.geojson#ROAD-LINK-S] [depth:existing_conditions_diagnosis]

诊断使用仓库允许的 provisional geometry，只能证明提交几何内部的相对组织关系。现状建筑、产权、客流、地下管线、生态本底和文保边界均未被仓库正式提供，因此本方案不做具体拆除判断，不声称某条概念联系线具备工程可行性。[standard:MOHURD-CONTROL-DETAILED-PLANNING]

## 统筹研究范围产业与未来城市研究

六个案例用于校准创新生态的运营机制，并与“研究—验证—转化—服务—传播”链条逐一对照；它们不提供北京项目的法定控制指标。[source:PROCESSED-FACT-PACK] [depth:future_city_industry_research]

### 六个案例的机制转译

案例只转译运营—空间机制，不移植境外指标或控制线：

1. **Kendall Square** 的社区协商机制转译为大钟寺“公共议题—原型测试—复盘公开”循环，落在 `PUBLIC-SOUTH`，不用于推导北京的开发强度。[source:CASE-KENDALL]
2. **one-north** 的 work-live-play-learn 混合与 living lab 转译为众智园“研发—测试—展示—人才服务”邻接，落在 `BLDG-NORTH-01/02` 与 `PUBLIC-NORTH`。[source:CASE-ONE-NORTH]
3. **STATION F** 的共享创业服务转译为众智园全栈测试共享平台，重点不是大空间，而是设备预约、风险分级和成果交接。[source:CASE-STATION-F]
4. **Knowledge Quarter London** 的跨机构联盟转译为沿公共脊的高校、园区、社区开放日历和步行知识路线，落在 `ROAD-SPINE` 与 `PUBLIC-HERITAGE`。[source:CASE-KQ-LONDON]
5. **Mila Agora** 的研究者—创始人—资本对话转译为 AI 原点的开源评审日与成果转化门诊，落在 `PUBLIC-ORIGIN` 与 `BLDG-ORIGIN-01`。[source:CASE-MILA]
6. **Maria 01** 的存量空间适应性利用转译为大钟寺低扰动路演与社区服务原型，落在 `BLDG-SOUTH-01/02`；是否保留具体建筑仍待测绘和权属核实。[source:CASE-MARIA01]

## 总体设计范围城市更新与控规深度城市设计

### 3.1 公共脊与两翼回路

`ROAD-SPINE` 是最强设计线索：它把 `PUBLIC-NORTH`、`PUBLIC-ORIGIN`、`PUBLIC-HERITAGE` 和 `PUBLIC-SOUTH` 串成公共体验序列。东翼 `ROAD-EAST-LOOP` 服务场景开放与社区接口，西翼 `ROAD-WEST-LOOP` 服务科研、企业和转化接口。三条横向联系在众智园、原点社区和大钟寺分别接入公共脊，形成“纵向识别、横向缝合”的网络，而不是让临时边界成为构图主角。[data:geometry/public_space.geojson#PUBLIC-NORTH] [data:geometry/public_space.geojson#PUBLIC-ORIGIN] [data:geometry/public_space.geojson#PUBLIC-HERITAGE] [data:geometry/public_space.geojson#PUBLIC-SOUTH]

六条概念联系总长按 EPSG:4548 从 `roads.geojson` 复算为 29,458.863 米；该数值描述提交网络，不等同于拟建道路里程。[metric:concept_mobility_length_m] [depth:traffic_rail_slow_parking]

## 用地、建筑规模与拆改留方案

四类完整用地与六个建筑原型共同表达功能关系；由于缺少现状测绘、权属和批准控规，本章不作具体拆改留判断。[data:geometry/land_use.geojson#LU-001] [data:geometry/buildings.geojson#BLDG-NORTH-01] [depth:retain_renovate_demolish]

### 四类用地是完整分区，不是法定用地调整

`LU-001` 创新研发与开源协作、`LU-002` 遗址公园与公共交往、`LU-003` 产业服务与场景验证、`LU-004` 人才社区与生活服务共同覆盖提交边界，使用共享边界坐标避免缝隙和重叠。[data:geometry/land_use.geojson#LU-001] [data:geometry/land_use.geojson#LU-002] [data:geometry/land_use.geojson#LU-003] [data:geometry/land_use.geojson#LU-004] [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE] [depth:land_use_layout]

用地表达用于比较功能关系，不是现行国土用途或控规修改。官方现状用地、规划用途和地块权属补齐后，需要逐地块建立现状—规划—建议对照，并重新核对完整覆盖。

### 3.3 建筑原型与拆改留边界

六个建筑 polygon 是功能原型：众智园设置全栈测试共享平台 `BLDG-NORTH-01` 与安全治理工坊 `BLDG-NORTH-02`；AI 原点设置开源协作发布原型 `BLDG-ORIGIN-01` 与成果转化驿站 `BLDG-ORIGIN-02`；大钟寺设置路演客厅 `BLDG-SOUTH-01` 与生活服务原型 `BLDG-SOUTH-02`。[data:geometry/buildings.geojson#BLDG-NORTH-01] [data:geometry/buildings.geojson#BLDG-NORTH-02] [data:geometry/buildings.geojson#BLDG-ORIGIN-01] [data:geometry/buildings.geojson#BLDG-ORIGIN-02] [data:geometry/buildings.geojson#BLDG-SOUTH-01] [data:geometry/buildings.geojson#BLDG-SOUTH-02]

六个概念基底面积合计 174,513.302 平方米，仅用于图层内部复算；它们不对应经核实的现状建筑，也不构成拆、改、留或投资结论。[metric:building_footprint_area_sqm] [depth:retain_renovate_demolish] [depth:height_massing_character] [standard:MOHURD-ARCH-DESIGN-DEPTH-2016]

容积率保持 unknown，因为缺少批准控规、官方红线和总建筑面积；高度、密度、退线同样进入待确认清单。[metric:floor_area_ratio] [depth:development_intensity_controls]

![空间结构与四类完整用地分区](assets/figures/land-use-structure.png)

## 交通、轨道、市政与公共服务设施

### 4.1 慢行优先的三种连接

南北公共脊承担连续识别与公共体验；东西三条缝合线分别处理清河两岸联系、校园园区联系和大钟寺站四象限联系；两翼回路把企业服务与社区场景接回公共脊。设计标注的是优先核验的连接关系，不是道路红线或工程线位。

轨道接驳、停车、消防、道路断面和交叉口渠化缺少正式资料。详细设计阶段应先完成站点出入口、峰时客流、非机动车停放、无障碍和消防通行测绘，再决定线位和断面；现阶段只保留可逆的小尺度导视、开放时段和活动路线建议。[depth:traffic_rail_slow_parking]

### 市政与数字基础设施

本方案采用“先接口、后容量”的策略：在三处建筑原型中预留端侧算力、设备预约、数据隔离和人工值守接口，但不虚构电力容量、机房等级、排水能力或管线位置。市政深化需取得管线、能源、排水、防洪、消防和通信资料后，完成负荷预测、冗余校核和专业会签。[depth:municipal_new_infrastructure]

## 蓝绿空间、公共空间与城市风貌

蓝绿空间与公共空间共同承担慢行、生态、交往和场景展示，但提交图层不替代法定绿线或公共用地权属。[standard:MOHURD-URBAN-DESIGN-MEASURES] [depth:blue_green_public_space]

### 蓝绿系统：一纵两横

`GREEN-SPINE` 形成遗址公园复合活力脊；`GREEN-NORTH` 将众智园与清河界面联结；`GREEN-MID` 将 AI 原点与小月河场景界面联结。[data:geometry/green_space.geojson#GREEN-SPINE] [data:geometry/green_space.geojson#GREEN-NORTH] [data:geometry/green_space.geojson#GREEN-MID]

按提交几何复算，概念绿地比例为 0.233614；该比例只描述本次设计图层，不替代法定绿地率或正式绿线。[metric:green_ratio] [depth:blue_green_public_space] [standard:MOHURD-URBAN-DESIGN-MEASURES]

### 四类公共空间承担四种公共价值

`PUBLIC-NORTH` 是全栈验证与治理共识界面；`PUBLIC-ORIGIN` 是开源发布与转化会客厅；`PUBLIC-SOUTH` 是轨道门户、社区服务和路演界面；`PUBLIC-HERITAGE` 是京张历史叙事与贡献展示节点。四处公共空间比例合计 0.030751，只代表概念节点覆盖。[metric:public_space_ratio]

![慢行、蓝绿公共空间与场景节点](assets/figures/mobility-bluegreen.png)

## 重点区域详细设计

三处范围均为临时粗略 polygon：`PROV-KEY-001` 众智园、`PROV-KEY-002` AI 原点、`PROV-KEY-003` 大钟寺。三者只用于组织局部设计，不是官方重点区红线。[data:geometry/key_areas.geojson#PROV-KEY-001] [data:geometry/key_areas.geojson#PROV-KEY-002] [data:geometry/key_areas.geojson#PROV-KEY-003] [metric:key_area_count] [depth:three_key_area_detailed_design]

### 5.1 众智园：全栈验证与安全治理

众智园的空间核心是 `PUBLIC-NORTH`，两侧分别配置 `BLDG-NORTH-01` 全栈测试共享平台和 `BLDG-NORTH-02` 安全治理与标准工坊，`ROAD-LINK-N` 把清河两侧及东西服务回路接入。功能流程为“设备预约—隔离测试—风险复核—公开摘要—成果交接”，使验证活动拥有可见的公共责任界面。

局部公共空间采用可分时开放的测试铺装、遮阴会谈带、设备缓冲区和公众观察边界；高风险测试不进入开放区域。正式实施依赖园区权属、清河防洪、设备安全、能源和交通组织核验。

### 5.2 AI 原点：开源协作与成果转化

AI 原点以 `PUBLIC-ORIGIN` 为开源客厅，`BLDG-ORIGIN-01` 承担代码评审、成果发布和同行复核，`BLDG-ORIGIN-02` 承担知识产权、产品定义、试点对接与人才服务，`ROAD-LINK-M` 连接校园、园区和社区。

局部设计采用首层共享、短时预约、安静研发与公开发布分层组织，避免把开放等同于全天候无边界进入。正式深化依赖校园边界、首层产权、消防疏散、活动噪声和数据安全条件。

### 5.3 大钟寺：智能原生城市服务与轨道门户

大钟寺以 `PUBLIC-SOUTH` 为城市客厅，`BLDG-SOUTH-01` 承担低门槛路演和城市服务原型展示，`BLDG-SOUTH-02` 承担人才生活、国际交往和社区服务，`ROAD-LINK-S` 标识四象限步行连续性的核验方向。

这里不复制众智园的产业测试逻辑，而是把 AI 服务放入轨道换乘、社区咨询、无障碍出行和日常消费场景。正式深化依赖站点出入口、地下空间、交叉口、市政管线、现状建筑和权属资料。

![三处重点区：差异化机制、项目抓手与实施条件](assets/figures/key-areas.png)

## AI 创新生态、人才画像与 AI+ 场景

### 6.1 六类用户对应六种空间契约

| 用户 | 核心任务 | 首要空间 | 方案提供的机制 | 风险边界 |
| --- | --- | --- | --- | --- |
| 基础研究者 | 复现、评审、跨校协作 | AI原点开源客厅 | 预约评审桌、公开摘要、版本留痕 | 未公开成果不进入公共展示 |
| 初创团队 | 验证产品并找到首个场景 | 众智园测试平台 | 分级准入、隔离测试、退出机制 | 测试不等于采购或背书 |
| 成熟企业工程师 | 接入场景与服务伙伴 | 西翼科技服务回路 | 问题清单、接口日、联合复盘 | 不获取无授权个人数据 |
| 社区居民 | 获得可理解、可拒绝的服务 | 大钟寺城市客厅 | 人工柜台、同意管理、投诉回路 | AI不替代人工公共服务 |
| 国际访客与投资人 | 理解生态并建立合作 | 公共脊与时空站 | 双语路线、证据卡、对接预约 | 不展示未清权商标与肖像 |
| 规划运营与安全人员 | 审核场景、维护空间 | 三处治理界面 | 风险分级、日志抽检、暂停权 | 不由模型替代审批和执法 |

### 6.2 十二张差异化场景卡

| 编号 | 场景与空间映射 | 服务对象 | 数据最小集 | 人工复核与退出 |
| --- | --- | --- | --- | --- |
| S01 | 公共脊无障碍路径助手；`ROAD-SPINE` | 居民、访客 | 路段状态与用户主动输入 | 现场标识兜底，可关闭定位 |
| S02★ | 众智园安全治理沙盒；`BLDG-NORTH-02` | 初创、审核人员 | 隔离测试日志 | 分级准入、人工放行、随时终止 |
| S03★ | 全栈设备互操作测试；`BLDG-NORTH-01` | 工程师、研究者 | 设备遥测与测试脚本 | 双人复核、限定时段、失败回滚 |
| S04 | 清河低碳运维建议；`GREEN-NORTH` | 运维人员 | 环境传感汇总 | 人工巡检确认，不控制防洪设施 |
| S05 | 开源成果评审桌；`PUBLIC-ORIGIN` | 研究者、开发者 | 自愿提交的版本与说明 | 同行评审、撤稿和版本回退 |
| S06 | 成果转化门诊；`BLDG-ORIGIN-02` | 初创、科研团队 | 主动提交的需求表 | 专业顾问签核，不作投资承诺 |
| S07 | 小月河公共空间共创；`GREEN-MID` | 居民、设计人员 | 匿名意见与时段偏好 | 公示异议、人工归纳、删除原始意见 |
| S08★ | 数据要素合规会客厅；`BLDG-ORIGIN-01` | 企业、法务 | 数据字段清单而非原始数据 | 法务/伦理复核，不通过即退出 |
| S09 | 大钟寺换乘可读性助手；`ROAD-LINK-S` | 通勤者、访客 | 公开交通状态 | 线下导视兜底，不代替交通指挥 |
| S10 | 社区公共服务协办；`BLDG-SOUTH-02` | 居民、服务人员 | 办事人主动输入 | 人工窗口确认，可全程转人工 |
| S11 | 智能原生路演字幕与问答；`BLDG-SOUTH-01` | 创业者、公众 | 演讲者授权音频 | 发布前校对，活动后删除录音 |
| S12 | 百年京张贡献检索；`PUBLIC-HERITAGE` | 公众、校友、访客 | 已清权档案元数据 | 馆员审核、纠错入口、争议下架 |

带★的 S02、S03、S08 是三类产业测试验证场，统一执行“申请—风险分级—限定范围测试—人工复核—公开摘要—退出或转常态”六步协议。十二个场景不是已获批准的政府项目；其数量由正文与离线页面共同计数。[metric:scenario_card_count]

## 7. 品牌、文化地标与长期运营

### 7.1 识别系统

中文名“京张智脉”同时指向铁路历史脉络、创新知识脉络和可审计的数据脉络；英文名采用 **Jingzhang AI Weave**，强调连接而非圈地。Logo 方向以一条连续轨迹穿过三个开放节点，主色使用轨道铜红、技术青绿和纸张暖白。标识只使用自绘几何和系统字体，不调用企业商标、人物肖像或未清权图像。

### 7.2 三个朝圣与荣誉节点

1. **治理共识厅**位于 `PUBLIC-NORTH`：展示测试规则、失败案例和安全贡献者，荣誉来自可验证贡献而非企业规模。
2. **AI 原点开源客厅**位于 `PUBLIC-ORIGIN`：展示开源版本、复现记录、同行评审和成果转化路径。
3. **百年京张时空站**位于 `PUBLIC-HERITAGE`：把铁路建设史、中关村创新史与 AI 公共责任并置，所有档案进入清权和纠错流程。

三节点构成一条可步行的贡献路线，数量由公共空间 feature 的地标角色复核。[metric:landmark_node_count]

### 7.3 年度运营闭环

春季“问题开放月”由社区、园区和高校发布真实问题；夏季“受控测试季”在众智园执行分级验证；秋季“开源评审周”在 AI 原点完成复现与转化；冬季“城市复盘会”在大钟寺和时空站公开成效、失败和下一年度退出清单。活动主体、许可和预算均待组织方、属地、产权方与运营方确认，不构成政府承诺。

运营评价不以流量为唯一目标，而看四类证据：问题是否被清楚定义、测试是否可退出、人工复核是否生效、公共空间是否保持可达。年度结果同步更新场景卡、风险登记和项目优先级。[depth:risk_missing_data]

## 更新项目清单、实施政策与分期计划

| 项目 | 差异化目标 | 真实空间映射 | 启动条件 | 分期 |
| --- | --- | --- | --- | --- |
| JZ-01 公共脊断点缝合 | 先建立连续识别与无障碍核验 | `ROAD-SPINE` | 道路红线、桥下空间、交通与消防复核 | `PHASE-01` |
| JZ-02 众智园验证界面 | 把测试责任公开化 | `PUBLIC-NORTH`、`BLDG-NORTH-01/02` | 清河防洪、园区权属、设备与能源安全 | `PHASE-03` |
| JZ-03 AI原点开源转化街 | 把评审与转化放在相邻空间 | `PUBLIC-ORIGIN`、`BLDG-ORIGIN-01/02` | 校园边界、首层权属、消防与噪声 | `PHASE-02` |
| JZ-04 大钟寺四象限连通 | 从轨道门户接入社区服务 | `ROAD-LINK-S`、`PUBLIC-SOUTH` | 站点出入口、交叉口、地下空间与管线 | `PHASE-01` |
| JZ-05 一纵两横蓝绿网络 | 让生态、慢行和交往叠合 | `GREEN-SPINE/NORTH/MID` | 绿线、河道、防洪、生态本底核验 | `PHASE-02` |
| JZ-06 贡献路线与年度运营 | 把文化传播连接到真实贡献 | `PUBLIC-HERITAGE` 与四处公共空间 | 版权清权、活动许可、安全与运营主体 | `PHASE-03` |

三期 polygon 是空间讨论顺序：南部门户与公共体验试点 `PHASE-01`、原点社区低扰动织补 `PHASE-02`、北部全栈创新与治理平台 `PHASE-03`。[data:geometry/phasing.geojson#PHASE-01] [data:geometry/phasing.geojson#PHASE-02] [data:geometry/phasing.geojson#PHASE-03] [depth:renewal_project_list] [depth:phasing_implementation]

分期不等于批准建设时序。每一期进入深化前均设置“资料闸门”：官方范围、现状测绘、权属、市政交通、生态文保、运营主体和公众参与任一关键项缺失时，只推进可逆的研究、导视或活动验证。

## 指标体系、面积复算与合规矩阵

提交边界在 EPSG:4548 下复算为 11,412,825.386 平方米；该结果基于临时粗略 polygon，仅用于检查各派生图层是否来自同一几何。[metric:site_area_sqm] 绿地、公共空间和建筑基底分别由对应 GeoJSON 投影复算，不从正文或图片抄录。[depth:metrics_recalculation]

| 指标 | 当前值 | 可说明什么 | 不能说明什么 |
| --- | ---: | --- | --- |
| 提交边界面积 | 11,412,825.386㎡ | 同源几何与覆盖关系 | 官方设计红线精确面积 |
| 概念建筑基底 | 174,513.302㎡ | 六类原型的图层规模 | 现状或批准建筑规模 |
| 概念绿地比例 | 0.233614 | 一纵两横网络在提交几何中的占比 | 法定绿地率 |
| 概念公共空间比例 | 0.030751 | 四类节点在提交几何中的占比 | 公共用地权属或实施量 |
| 概念联系总长 | 29,458.863m | 一脊、两翼、三横线的总长度 | 拟建道路里程 |
| 容积率 | unknown | 明确控规缺口 | 任何开发强度承诺 |

`compliance_matrix.json` 已把公告 1.3—1.5 与 agent.1—agent.6 共 23 项任务逐项映射到章节、图层、指标、图纸、来源、假设和自检；`standard_matrix.json` 对 6 项标准登记 addressed 或 data_gap；`design_depth_matrix.json` 对 15 项深度提供证据链。矩阵证明“证据在哪里”，正文解释“为什么这样设计”，两者不可互相替代。

![指标复算、证据链与风险闸门](assets/figures/metrics-evidence.png)

## 风险、版权与合规说明

本方案遵循城市设计对建筑布局、公共空间、风貌与立体空间的统筹原则，但所有法定控制均等待正式资料确认。[standard:MOHURD-URBAN-DESIGN-MEASURES] [standard:MOHURD-CONTROL-DETAILED-PLANNING]

正式深化前置资料包括：官方总体红线及三处重点区 polygon、现状与规划用地、道路红线、站点与客流、权属宗地、现状建筑测绘、市政与能源、排水防洪、消防、生态与文保、公共服务设施底数。缺项不会被几何推测或生成图替代。

五张核心图、A3/A0 与离线 HTML 均由本包 GeoJSON、metrics、矩阵和正文派生，不使用远程地图、新闻图、OSM、未清权图片、远程字体或追踪代码。图纸是解释层，GeoJSON 与 JSON 是复核层。所有品牌、活动和空间动作均为概念建议或可供专业团队深化的参考方案，不代表官方批准、投资承诺、工程可行性或政府行动。

最终校验记录保存在 `self_check.json` 与 manifest；官方 polygon 补齐后，需要以同一坐标系重算并重新走 render—finalize—self-check 全流程，而不能沿用当前临时面积。

## 参考资料

本方案使用的正式规则、场地包、已处理事实包、标准与六个案例来源均登记在 `sources.json`；正文只引用登记 ID，不复制网页图片或未清权材料。[source:OFFICIAL-ANNOUNCEMENT] [source:AGENT-TASKBOOK] [source:SITE-PACKAGE] [source:SOURCE-REGISTRY] [source:PROCESSED-FACT-PACK] [source:BOUNDARY-SOURCE] [source:KEY-AREA-SOURCE] [source:CASE-KENDALL] [source:CASE-ONE-NORTH] [source:CASE-STATION-F] [source:CASE-KQ-LONDON] [source:CASE-MILA] [source:CASE-MARIA01]
