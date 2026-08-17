---
title: "京张信号站 / Jing-Zhang Signal Stations"
language: "zh"
author_github: "565431hzhang"
proposal_format_version: "2"
bilingual_contract_version: "1"
translation_file: "proposal.en.md"
license: "COMMUNITY-DISPLAY-ONLY"
summary: "以京张铁路信号站为方法：每项AI服务上线前必须回答——它让谁的日常更方便了？说不清的服务，红灯。六条任务路线逐条检查到达→过街→进入→停留→接手→退出六步，有AI与无AI是否等价。"
tracks: ["ai-traffic-walkability", "ai-public-services", "civic-agent-governance"]
scenarios: ["ai-traffic-walkability", "enterprise-service-copilot", "public-safety-operations-review"]
---

# 京张信号站 / Jing-Zhang Signal Stations

## 一页执行摘要

京张铁路的信号站控制列车能否通行——红灯停、绿灯行。本方案把信号站转化为AI城市设计规则：每项AI服务上线前必须回答一个问题——它让谁的日常生活更方便了？说不清楚的服务，保持红灯 [source:AGENT-TASKBOOK] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]。

方案把11.4平方公里视作一条信号走廊。北段众智园是技术信号站，负责受控测试；中段AI原点是学习信号站，负责知识协作与公共服务；南段大钟寺是日用信号站，负责通勤、休息和办事的真实检验。六条任务路线贯穿三站，每条路线检查六步：到达→过街→进入→停留→接手→退出。每步标注有AI和无AI两种体验——两者必须等价，否则该步保持红灯 [depth:overall_spatial_structure] [data:geometry/roads.geojson#ROAD-001]。

评审可以用一句话检验本方案：关闭所有AI服务后，一个没有智能手机的老人能否到达公共服务站、获得帮助、完成任务并安全离开？做不到的AI服务不应上线。（假设 A-FIELD-001）

## 设计依据与资料清单

方案以《百年京张AI创新带城市设计国际方案征集资格预审公告》为第一依据 [source:OFFICIAL-ANNOUNCEMENT]。公告给出统筹研究范围约43.6平方公里、总体设计范围约11.4平方公里、三处重点区合计约368.4公顷。提交包中的11,412,825.386平方米来自临时polygon在EPSG:4548下的计算，只能用于拓扑校核，不能包装成法定精确面积 [source:BOUNDARY-SOURCE] [metric:site_area_sqm]。

所有geometry文件标注`provisional_constraint`、`official_boundary=false`。组织方数据缺口不阻断内容评分；官方边界发布后全部图层与指标必须重算 [depth:risk_missing_data]。（假设 A-BOUNDARY-001）

![资料证据链与提交包关系图](assets/figures/site-overview.png)

| 参数 | 证据级别 | 依据 |
|------|----------|------|
| 场地面积 11,412,825 ㎡ | A 结构化复算 | [metric:site_area_sqm]；provisional边界 |
| 绿地率 48.7% | A 结构化复算 | 由green_space图层复算 |
| 建筑基底 648,798 m² | A 结构化复算 | 由buildings图层复算 |
| 三个重点区 368.4 ha | A 结构化复算 | 由key_areas图层复算 |
| 建筑数量/高度/功能比例 | B 概念示意 | 待现状调查确认（假设 A-BUILDING-001） |
| 分期年份与资金渠道 | C 实施假设 | 待权属、资金确认（假设 A-INVESTMENT-001） |

## 三层范围工作框架

统筹研究范围处理产业与未来城市关系。它用"三站两翼"组织资源流：三站分别承担测试、学习和日用环节。中关村科技服务翼提供知识产权、资本与标准服务；小月河场景翼提供城市问题、居民反馈和运行环境 [source:AGENT-TASKBOOK] [depth:three_level_scope_framework]。

总体设计范围处理城市系统。概念用地完整覆盖临时边界，以产业研发、公共服务、生活配套、文化教育和绿地六类功能形成南北连续结构 [data:geometry/land_use.geojson#LU-001] [depth:land_use_layout]。

重点区域范围处理可以被运营和复查的信号站原型。每处都有功能组合、建筑更新方法、慢行序列、公共空间节点和AI场景 [data:geometry/key_areas.geojson#PROV-KEY-001] [depth:three_key_area_detailed_design]。

![三层范围与空间工作框架图](assets/figures/land-use-structure.png)

## 统筹研究范围产业与未来城市研究

品牌名称"京张信号站"是一句公共判断，也是一套工作方法。标志以铁路信号灯为核心符号——红灯表示halted、黄灯表示pilot、绿灯表示released。暖白、煤黑、信号橙与钴蓝来自铁路工作单和公共服务手册的视觉经验。所有图形为原创矢量与程序绘制 [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]。（假设 A-BRAND-001）

产业生态按"问题→验证→采用→维护"组织。高校和研究机构提出方法，企业完成产品化，技术信号站提供隔离测试，场景翼提供真实任务，科技服务翼处理知识产权和资本，公共运营单位决定是否采用 [depth:overall_spatial_structure]。

## 总体设计范围城市更新与控规深度城市设计

总体结构是一条服务脊柱、三座信号站、六条横向连接和两条资源回路。服务脊柱优先利用京张遗址公园及其邻接公共空间的连续性，承载步行、休息、问路和改进记录。横向连接针对"到达后仍进不去"的问题，逐条检查过街、坡道、门槛、照明、树荫和座椅 [data:geometry/roads.geojson#ROAD-001] [depth:traffic_rail_slow_parking]。

用地14宗，覆盖率100% [metric:land_use_coverage_ratio]。建筑基底648,798 m²，129栋 [metric:building_footprint_area_sqm]。道路网络42.3km [metric:road_network_total_length_m]。绿地率48.7% [metric:green_ratio]。公共空间率2.5% [metric:public_space_ratio]。容积率为unknown，待正式控规确认 [depth:development_intensity_controls]。

## 重点区域详细设计

三处重点区共用一套信号协议，但各自承担不同任务。每处都有一个无需注册的公开入口、一个受控试验界面、一个人工接手点和一份可见的改进记录 [depth:three_key_area_detailed_design] [data:geometry/key_areas.geojson#PROV-KEY-001]。

![三处重点区域索引与设计任务图](assets/figures/key-areas.png)

### 众智园·技术信号站 (192.92 ha)

受控测试工场。AI技术在这里放进隔离环境测试——通过六步检验后才能进入公共空间。概念示意约80-100栋建筑，AI研发办公60%、中试15%、展示10%、配套15%。沿清河布局2-3栋标志性研发总部(60-80m)，内部4-6层低密花园式。绿地率≥40%。

AI场景：自主模型测试场、安全治理沙盒、低碳算力体验馆、创新成果展厅。每个场景须标注失败模式和人工接手路径——没有标注的不通过信号站G1试点闸。（假设 A-BUILDING-001）

### AI原点社区·学习信号站 (104.32 ha)

知识协作与公共服务工场。近校型成果转化与人才社区。约40-50栋建筑，孵化45%、人才居住25%、开源协作15%、配套15%。紧邻高校3-5层过渡，骨干路6-8层混合。800m知识共享走廊。绿地率≥35%。

AI场景：开源发布厅、成果孵化展示、人才特区服务、夜间协作空间。每个场景的AI能力只生成草稿和提示，不作公共决定 [source:AGENT-TASKBOOK]。

### 大钟寺·日用信号站 (72.05 ha)

日用检验工场。城市型智能经济与国际交往街区。约30-40栋建筑，总部50%、智能体展示20%、商业20%、数据要素10%。站周边200m TOD(80-100m)，外围6-8层。四象限步行连通系统。绿地率≥30%。

AI场景：智能体测试场、数据要素会客厅、国际路演中心、AI+消费体验街。（假设 A-DAZHONGSI-001）

## AI 创新生态、人才画像与 AI+ 场景

人物画像按要完成的任务划分，不建立永久个人档案。六类使用者包括无智能手机老人、轮椅使用者、低视力访客、儿童与照护者、附近居民、学生创客。同一个人可以在不同任务中切换角色。系统不推断健康、收入、情绪或社会关系。（假设 A-DATA-001）

六条任务路线使用同一六步检验规则。表中的"绿灯"只表示设计结构完整，不等于现场通过——现场绩效全部保持`unknown` [metric:scenario_ready_count]。

| 任务路线 | 使用者 | 六步检验 | 有AI体验 | 无AI体验 |
| --- | --- | --- | --- | --- |
| L1 到达公共服务 | 无智能手机老人 | 到达→过街→进入→停留→接手→退出 | 需求预测减少排队 | 电话预约+人工柜台等价 |
| L2 穿越公园 | 轮椅使用者 | 到达→过街→进入→停留→接手→退出 | 无障碍路线推荐 | 静态地图+人工引导等价 |
| L3 获得导航 | 低视力访客 | 到达→过街→进入→停留→接手→退出 | 语音导航+触觉导引 | 纸质大字地图+人工问询等价 |
| L4 安全通行 | 儿童与照护者 | 到达→过街→进入→停留→接手→退出 | 人流预测+安全提醒 | 家长陪同+社区志愿者等价 |
| L5 测试产品 | 学生创客 | 到达→过街→进入→停留→接手→退出 | 代码审查+协作图谱 | 纸质清单+人工审查等价 |
| L6 体验创新 | 国际访客 | 到达→过街→进入→停留→接手→退出 | 多语言导览+活动推荐 | 纸质多语言手册+前台等价 |

所有AI场景遵守数据最小化、公开来源、可解释和人工复核原则。城市智能体辅助识别慢行断点和公共空间热力，但不替代规划审批、不输出未授权个人画像 [source:AGENT-TASKBOOK] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]。

**Agent任务响应**：Agent.1品牌（信号灯标志，`assets/logo.svg`）；Agent.2 AI生态（8个全球案例+8项本地设施）；Agent.3 AI场景（6条任务路线+3个产业测试场景）；Agent.4公共空间（3个朝圣地标+12个组件+5维荣誉体系）；Agent.5文化叙事（铁路→中关村→AI三层）；Agent.6活动运营（AI创新周+开放日+朝圣路线）。详见 `compliance_matrix.json`。

> 以上Agent任务内容均为概念建议，不构成已确定的政府活动或实施安排。

## 用地、建筑规模与拆改留方案

用地分区以临时边界为计算容器，采用0802科研、05商业服务、0702社区服务、0804教育、0803文化和1401公园绿地等概念类别。六个polygon通过共同切分边界生成，在EPSG:4548下校核覆盖率。它们表达功能优先级，不能替代法定用地或现状调查 [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE]。建筑高度、体量和风貌控制分三档：众智园沿河60-80m/内部4-6层低密、原点社区3-5层近校/6-8层骨干、大钟寺80-100m TOD/外围6-8层，概念建议待控规确认 [depth:height_massing_character]。拆改留采用微更新原则：保留~35%（现状结构良好）、改造~40%（功能需调整）、新建~25%（用地条件许可），分类为概念假设待质量鉴定和结构评估 [depth:retain_renovate_demolish]。容积率为unknown，待正式控规条件补齐 [depth:development_intensity_controls]。建筑基底648,798 m²，129栋 [data:geometry/buildings.geojson#BLDG-001] [metric:building_footprint_area_sqm]。

## 交通、轨道、市政与公共服务设施

交通策略从六条任务路线开始，逐条检查到达、过街、进入、停留、接手和退出。南北服务脊柱只表达连续慢行意图，横向连接只表达园区、校园、社区与轨道候选入口之间需要修补的关系 [data:geometry/roads.geojson#ROAD-001] [depth:traffic_rail_slow_parking]。

无障碍设计覆盖所有公共空间主通道——触觉地面导引+语音提示，覆盖关键岔路与设施入口。市政设施：端侧算力5-10节点、AI公共服务站三站各1处、分布式能源 [depth:municipal_new_infrastructure]。

![交通慢行与蓝绿公共空间复合系统图](assets/figures/mobility-bluegreen.png)

## 蓝绿空间、公共空间与城市风貌

京张遗址公园是服务脊柱的优先候选，不被当作科技设备展廊。绿地先解决遮阴、休息、饮水、夜间照明、安静和连续通行，再承载低侵入测试。清河与小月河相关空间必须等待防洪、生态和河道管理条件，概念绿地polygon只表达连接意图 [data:geometry/green_space.geojson#GREEN-001] [depth:blue_green_public_space]。绿地面积5,561,347 m²，绿地率48.7% [metric:green_space_area_sqm] [metric:green_ratio]。公共空间279,961 m²，占比2.5% [metric:public_space_area_sqm] [metric:public_space_ratio]。

三个标志性节点让信号系统在街上看得见：先问台让人无需注册就能问路和获得公共服务帮助。人工接手亭是AI失效时可见、可达、有人负责的接口。公开改进墙展示问题、责任人、截止时间、处理结果和停用记录。它们采用可移动、可撤回的原型，先验证到达、停留、接手和退出，再讨论永久工程 [standard:MOHURD-URBAN-DESIGN-MEASURES]。（假设 A-PUBLIC-001）

城市风貌融合三层文化：铁路遗产（清华园车站、铁轨枕木记忆）、中关村精神（电子一条街到AI策源地）、AI新文化（开源共享、人机协作）。

## 更新项目清单、实施政策与分期计划

近期九十天只做可逆试点。工作包括完成六个观察点和六条任务路线的踏勘，选择一处已授权接口，安装临时先问台与接手标识，运行两项公共服务和一项产业测试，按周公开问题与修复 [data:geometry/phasing.geojson#PHASE-001] [depth:phasing_implementation]。

若无障碍、安全、隐私或责任主体任一条件不成立，试点停止并撤场。中期一至三年根据试点结果扩展。远期七至十五年形成完整AI产业链与朝圣地标。（假设 A-OPERATION-001）

| 项目 | 类型 | 分期 | 依赖 |
| --- | --- | --- | --- |
| JZ-01 慢行断点缝合 | 公共空间 | 近期 | 道路红线 |
| JZ-02 清河创新界面 | 蓝绿 | 近期 | 河道蓝线 |
| JZ-03 成果转化街 | 城市更新 | 中期 | 权属 |
| JZ-04 大钟寺站城连通 | 轨道 | 中期 | 轨道工程 |
| JZ-05 AI算力节点 | 新基建 | 近期试点 | 能源/运营 |
| JZ-06 AI活动周路线 | 运营 | 近期 | 公共空间许可 |

每个项目须通过四道信号：G0资格（条件齐备）→G1试点（轻量先行90天）→G2放行（Go/No-Go评审）→G3退役（退出留痕）。缺任一道，信号灯保持红灯。（假设 A-GATE-001）

> 投资估算仅给相对层级。所有项目可先以轻量设施启动 [depth:renewal_project_list]。概念分期不构成实施承诺。

## 指标体系、面积复算与合规矩阵

指标分为图形复算、任务准备度和现场绩效三层。图形复算由EPSG:4548计算临时边界、概念建筑基底、绿地与公共空间面积——这些是A级指标，可从GeoJSON直接复算。任务准备度由六步检验完整性确定——六条任务路线各六步，当前全部`halted`，结构完整不等于现场通过。现场绩效需要真实踏勘或试点，目前全部保持`unknown`，不冒充已验证 [depth:metrics_recalculation] [metric:site_area_sqm]。

三层指标不得混用：图形复算回答空间多大，任务准备度回答设计完了吗，现场绩效回答真的能用吗。完整数值保存在 `metrics.json`，合规映射保存在 `compliance_matrix.json`。

![核心指标复算与证据链图](assets/figures/metrics-evidence.png)

## 风险、版权与合规说明

首要风险是临时边界。所有空间结论保持概念层级，并设置官方geometry到位后的整体重算路径 [depth:risk_missing_data] [source:BOUNDARY-SOURCE]。第二类风险是现场证据缺失——当前文件只提供踏勘协议，不填写时间、照片和步行结果（假设 A-FIELD-001）。第三类风险是AI伤害，包括误导、歧视、隐私泄露和自动化责任漂移。六步检验把人工接手与停止条件作为上线前置项——任一步骤缺人工等价路径，该服务保持红灯。

所有视觉资产为原创矢量设计与程序绘制，不使用企业商标、人物肖像或第三方照片。字体许可：文泉驿微米黑（开源GPLv2）、DejaVu Sans（开源Bitstream Vera）。HTML不加载远程脚本、地图瓦片、字体、iframe、表单或外部API，不跟踪评审者行为。双语对照：proposal.md与proposal.en.md提供完整中英对照 [source:SOURCE-REGISTRY]。

## 参考资料

本方案的证据链由以下来源支撑，每条来源在 `sources.json` 中登记了用途边界和可用性层级。formal可用资料7条，背景资料1条，provisional-only资料1条。所有空间结论可在GeoJSON图层和metrics.json中复算；所有假设在assumptions.json中登记；所有标准覆盖在standard_matrix.json和design_depth_matrix.json中逐项映射。临时边界不影响内容评分，官方数据发布后全部图层与指标须整体重算。

- [source:OFFICIAL-ANNOUNCEMENT] — 竞赛资格预审公告
- [source:AGENT-TASKBOOK] — 面向智能体任务书
- [source:BOUNDARY-SOURCE] — 临时边界来源
- [source:SITE-PACKAGE] — 机器可读设计任务书与边界数据
- [source:SOURCE-REGISTRY] — 来源用途边界
- [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK] — 智能体任务书标准
- [standard:MOHURD-URBAN-DESIGN-MEASURES] — 住建部城市设计措施
- [standard:MOHURD-CONTROL-DETAILED-PLANNING] — 住建部控规
- [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE] — 自然资源部用地分类
