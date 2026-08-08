---
title: "人字新轨：百年京张AI创新带人本智能城市概念设计"
author_github: "bitcoin2000"
language: "zh"
translation_file: "proposal.en.md"
license: "COMMUNITY-DISPLAY-ONLY"
summary: "以京张铁路青龙桥「人」字形展线为文化母题，提出「人字新轨 HUMAN-LINE」：一撇京张文化轴、一捺小月河场景轴、交汇于北京AI原点社区，把百年自主创新文脉转译为面向AI时代的人本智能城市空间语法、场景体系与长期运营机制。"
tracks: ["jingzhang-heritage-narrative", "ai-origin-community", "ai-traffic-walkability"]
scenarios: ["ai-traffic-walkability", "ai-cultural-guide", "enterprise-service-copilot", "public-safety-operations-review", "robot-delivery-low-speed", "ai-health-service-navigation"]
iteration: "v0.2"
---

# 人字新轨：百年京张AI创新带人本智能城市概念设计

## 设计依据与资料清单

本方案以北京市规划和自然资源委员会海淀分局发布的《百年京张AI创新带城市设计国际方案征集资格预审公告》为第一依据 [source:OFFICIAL-ANNOUNCEMENT]，并以面向全球智能体的开源征集任务书摘录 [source:AGENT-TASKBOOK]、仓库维护者登记的临时粗略边界与重点区 [source:BOUNDARY-SOURCE][source:KEY-AREA-SOURCE]、机器可读任务包 [source:SITE-PACKAGE]、公开资料登记表 [source:SOURCE-REGISTRY] 和加工后的阅读导航包 [source:PROCESSED-FACT-PACK] 为可追溯依据。方案同时遵循《城市设计管理办法》[source:MOHURD-URBAN-DESIGN-MEASURES][standard:MOHURD-URBAN-DESIGN-MEASURES]、《城市、镇控制性详细规划编制审批办法》[source:MOHURD-CONTROL-DETAILED-PLANNING][standard:MOHURD-CONTROL-DETAILED-PLANNING]、《国土空间调查、规划、用途管制用地用海分类指南》[source:MNR-LAND-USE-CLASSIFICATION][standard:MNR-LAND-USE-CLASSIFICATION-GUIDE] 与《建筑工程设计文件编制深度规定（2016年版）》[source:MOHURD-ARCH-DESIGN-DEPTH-2016][standard:MOHURD-ARCH-DESIGN-DEPTH-2016] 所代表的专业深度要求，按"控规深度城市设计＋规划综合实施方案深度"组织成果。

资料使用边界如下：`data/source_registry.json` 中 formal 可用资料 5 条（官方公告、智能体任务书、三项专业标准），provisional-only 资料 1 条（临时粗略 polygon）。本方案当前没有取得官方精确红线，因此 `geometry/site_boundary.geojson#SITE-001` 与 `geometry/key_areas.geojson` 均为 `provisional_constraint`、`official_boundary=false`，只能用于方案生成、自检、可视化与设计讨论，不得作为官方红线、审批依据、精确面积依据或法定控制结论 [source:BOUNDARY-SOURCE][data:geometry/constraints.geojson#CONS-SITE-001]；组织方数据缺口不阻断内容评分，但官方 polygon 发布后，全部图层与指标需要复算 [metric:site_area_sqm]。

正文证据链遵循可校验引用格式：`[source:...]` 指向 `sources.json`，`[standard:...]` 指向 `standard_matrix.json`，`[depth:...]` 指向 `design_depth_matrix.json`，`[data:geometry/*.geojson#feature]` 指向空间图层，`[metric:...]` 指向 `metrics.json`。每个章节都回答四个问题：设计判断是什么、为什么这样判断、落在哪个图层/指标/标准、还有什么资料缺口。

![资料证据链与提交包关系图](assets/figures/site-overview.png)

## 三层范围工作框架

公告确定的三个层次在本方案中依次落实为"战略—结构—实施"三级工作框架 [source:OFFICIAL-ANNOUNCEMENT][standard:PROJECT-OFFICIAL-ANNOUNCEMENT][depth:three_level_scope_framework]：

| 层级 | 公告范围 | 面积 | 本方案工作内容 | 数据落点 |
| --- | --- | --- | --- | --- |
| 统筹研究范围 | 北至北五环、东至京藏高速、南至西直门外大街、西至万泉河路 | 约 43.6 km² | 世界级AI创新生态、三区两翼协同、未来城市形态与命名/Logo体系 | [data:geometry/site_boundary.geojson#SITE-001]、[metric:site_area_sqm] |
| 总体设计范围 | 京张遗址公园周边1–2公里城市地区和产业区 | 约 11.4 km² | 空间结构、用地分区、交通市政、蓝绿公共空间、风貌与更新项目 | [data:geometry/land_use.geojson#LU-001]、[data:geometry/roads.geojson#ROAD-001] |
| 重点区域范围 | 众智园、北京AI原点社区、大钟寺三处 | 约 368.4 公顷 | 三处片区详细设计（功能、建筑、公共空间、交通、场景、实施） | [data:geometry/key_areas.geojson#KEY-001][data:geometry/key_areas.geojson#KEY-002][data:geometry/key_areas.geojson#KEY-003] |

三层范围不是三张割裂图纸：统筹研究决定产业链与城市形态判断，总体设计把判断落实到用地、设施与更新项目，重点区域详细设计验证具体地块、建筑、公共空间和AI场景的可实施性。`compliance_matrix.json` 按公告 1.3、1.4、1.5 与 `agent.1`–`agent.6` 逐条映射证据。

需要明确：三层边界目前均为临时粗略范围（由维护者依据公告文字四至与面积约束推定），本方案所有面积、比例与空间位置均基于该 provisional 数据 [depth:existing_conditions_diagnosis]，替换官方 polygon 后必须重算 `geometry/*.geojson` 与 `metrics.json` 中受影响指标（边界面积、用地比例、绿地率、公共空间率、路网密度、分期面积）。

![三层范围与空间工作框架图](assets/figures/land-use-structure.png)

## 统筹研究范围产业与未来城市研究

### 总体概念：人字新轨（HUMAN-LINE）

统筹研究范围的核心任务是回答"AI 时代的世界级创新带应当以什么为城市语法" [source:AGENT-TASKBOOK][standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK][depth:overall_spatial_structure]。

本方案提出**「人字新轨 HUMAN-LINE」**：1909 年，詹天佑在青龙桥用"人"字形展线让火车翻越八达岭，是中国人自主设计、自主建造的第一条干线铁路的标志性创举；一百多年后，当 AI 开始参与真实城市营造，海淀应该用同一个"人"字回答"城市为谁而智能"——**人本智能，而不是智能至上**。三大定位中，"百年京张文化带"对应"人"字的一撇（历史纵深与文化传承），"都市AI生活体验带"对应一捺（生活场景与日常体验），"AI融合创新带"则是两笔交汇后向前延伸的融合主轴 [source:OFFICIAL-ANNOUNCEMENT]。五大功能（AI全栈自主创新体系、世界级AI创新生态、AI+场景赋能新范式、智能化AI活力城市、AI治理全球话语权）构成"人"字的内在骨架：撇是自主与治理（硬实力与规则），捺是场景与生活（软实力与体验），交汇点是生态与人才 [source:AGENT-TASKBOOK]。

**命名体系**（原创，未使用受保护商标）：

| 层级 | 中文名 | 英文名 | 语义 |
| --- | --- | --- | --- |
| 一带 | 人字新轨 | HUMAN-LINE | 总概念：以"人"为原点的智能城市新轨道 |
| 文化带 | 辙线 | RAIL-LINE | 京张铁路文脉之"撇" |
| 生活带 | 生线 | LIVING-LINE | 都市AI生活体验之"捺" |
| 融合带 | 智线 | FUSION-LINE | 两笔交汇后的融合主轴 |
| 众智园 | 加速之核 | ACCEL-NODE | AI全栈自主创新加速区 |
| 原点社区 | 原点之核 | ORIGIN-NODE | 北京AI原点社区（人字交汇点） |
| 大钟寺 | 场景之核 | SCENE-NODE | 大钟寺AI产业聚集区 |
| 中关村翼 | 资本之翼 | CAPITAL-WING | 中关村科技服务翼 |
| 小月河翼 | 场景之翼 | SCENARIO-WING | 小月河场景赋能翼 |

**Logo 方向**（视觉识别概念，非最终商标）：双笔"人"字——一撇为钢轨笔触（京张工程文化），一捺为神经脉络笔触（AI 新文化），交汇处为一个发光的"原点"节点，可延展为"∞"或轨道岔道符号，表达开放、连接与无限可能。色彩体系：钢轨灰蓝（主色，工程与理性）、AI 青（辅色，智能与活力）、铁路赭石（点缀色，百年文化）。字体方向：中文无衬线（思源黑体类）+ 西文等宽（JetBrains Mono 类），体现"工程＋代码"气质 [depth:overall_spatial_structure]。Logo 及视觉系统为原创概念，不复制现有城市、园区或企业标识，不未经授权使用字体、图片、商标、人物或企业标识 [source:AGENT-TASKBOOK]。

### 全球AI创新生态案例（6个）

本方案从全球案例中提炼"可转化为海淀空间与机制"的经验，不照搬名称或宣称投资数据 [source:AGENT-TASKBOOK][depth:overall_spatial_structure]：

| # | 案例 | 可借鉴经验 | 向海淀的转化 |
| --- | --- | --- | --- |
| 1 | 美国硅谷（斯坦福—帕洛阿尔托） | 大学策源、教授创业、校友资本闭环 | 依托清华、北航、北邮等高校，沿京张带布置"近校创新走廊"与早期投资窗口（概念建议） |
| 2 | 美国波士顿肯德尔广场 | 旧工业区更新为"全球最具创新性一平方英里" | 铁路遗址沿线以"保留+更新+公共空间活化"组织更新项目，不以大拆大建为前提（概念建议） |
| 3 | 新加坡纬壹科技城（one-north） | 政府搭台、产城人一体、生活工作娱乐混合 | 总体设计范围内强化功能混合度与 15 分钟生活圈，见 [data:geometry/land_use.geojson#LU-001] |
| 4 | 以色列特拉维夫 | 国防技术溢出与全球极客网络 | 众智园承担"安全治理—民用转化"试验，呼应 AI 治理全球话语权（概念建议） |
| 5 | 中国深圳南山 | 硬件供应链与快速原型生态 | 大钟寺片区发展智能终端、机器人、数字内容等"智能原生新业态"（概念建议） |
| 6 | 英国伦敦国王十字 | 交通枢纽更新＋文化创意＋科技混合 | 清华园站、大钟寺站枢纽型更新与四象限步行联通（概念建议） |

### 三区两翼协同回路

三区两翼在本方案中构成可循环的创新回路 [source:AGENT-TASKBOOK][standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]：**原点社区**（原始创新与开源生态）→ **众智园**（全栈自主与加速转化）→ **大钟寺**（场景集聚与商业闭环），两侧由**中关村科技服务翼**（资本、IP、科技服务）与**小月河场景赋能翼**（场景开放、测试验证、公共体验）支撑，形成"策源—加速—场景—资本—治理"闭环。空间上，这一回路对应总体设计范围的"一撇一捺一交点"结构（见第三章空间结构）与 [data:geometry/land_use.geojson#LU-001] 中的科研、商业、混合用地布局。

## 总体设计范围城市更新与控规深度城市设计

### 空间结构：一撇一捺一交点

总体设计范围以"人字新轨"为空间语法 [depth:overall_spatial_structure][standard:MOHURD-URBAN-DESIGN-MEASURES]：

- **一撇（京张文化轴）**：沿京张铁路遗址公园形成南北贯通的绿色文化主轴，本方案以 `geometry/green_space.geojson` 中的概念绿带表达（暂为临时走向，待官方红线确认）[data:geometry/green_space.geojson#GREEN-001][metric:land_use_green_ratio]；
- **一捺（小月河场景轴）**：自原点社区向东沿小月河方向布置场景赋能绿道与低速测试环，以 `geometry/roads.geojson` 中的概念绿道表达 [data:geometry/roads.geojson#ROAD-024]；
- **一交点（AI原点）**：两轴交汇于北京AI原点社区，布置"人字原点"开源广场 [data:geometry/public_space.geojson#PUBLIC-001]；
- **五环（15分钟创新生活圈）**：以轨道站点与社区中心为核，组织五个"生活—创新—公共空间"复合环，保障青年人才与居民的日常可达性 [depth:land_use_layout]。

### 用地布局

`geometry/land_use.geojson` 按上述结构将总体设计范围完整划分为科研、商业、居住、教育、公共服务、道路、绿地、广场与留白等 91 个概念地块，无重叠、无缺口，总面积与边界一致 [data:geometry/land_use.geojson#LU-001][metric:land_use_parcel_count][metric:land_use_total_sqm][depth:land_use_layout]。当前 provisional 边界下的关键比例（概念建议）：绿地与开敞空间约 18.9% [metric:land_use_green_ratio]，道路约 10.4% [metric:land_use_road_ratio]，科研用地约 14.8% [metric:land_use_research_ratio]，商业服务业约 22.6% [metric:land_use_commercial_ratio]，科研与商业用地围绕三处重点区集中布局；比例与官方 polygon、控规条件发布后必须重算。

### 城市更新总体框架

总体设计遵循"**保留为主、更新为要、新建为辅**"的框架 [depth:retain_renovate_demolish][standard:MOHURD-CONTROL-DETAILED-PLANNING]：高校院所、文保单位与成熟社区以保留和织补为主；老旧园区与低效楼宇以功能更新和空间改造为主；铁路沿线空置地与留白用地用于公共空间与少量新建节点。具体拆改留比例必须待现状建筑、权属与控规条件确认，本方案不给出地块级拆改留结论 [source:AGENT-TASKBOOK]。`geometry/buildings.geojson` 中的 179 个建筑基底为概念性示意体量，表达"哪里可以更新、哪里保持低强度"，不代表审定建筑方案 [data:geometry/buildings.geojson#BLDG-001][metric:building_count][metric:building_footprint_area_sqm]。

## 重点区域详细设计

三处重点区域均达到"定位＋空间结构＋建筑更新＋交通慢行＋公共空间＋AI场景＋实施风险"的详细设计深度 [depth:three_key_area_detailed_design]；因重点区 polygon 为 provisional，以下结论均为方向性设计，供专业团队深化 [source:KEY-AREA-SOURCE]。

![三处重点区域索引与设计任务图](assets/figures/key-areas.png)

### 众智园AI自主创新加速区（约 192.1 公顷）

定位为"**加速之核 ACCEL-NODE**"：AI全栈自主创新体系与 AI 治理全球话语权的空间载体 [data:geometry/key_areas.geojson#KEY-001][metric:key_area_zhongzhiyuan_sqm][source:AGENT-TASKBOOK]。空间结构为"一轴两片"：沿园内主路形成创新加速轴，西片为算力、算法、数据要素与安全治理试验平台，东片为中试加速楼与产业展示。建筑更新以现状研发载体改造为主，公共空间强调低碳绿色交往环境与"AI 治理试验场"展示界面。实施风险：算力与试验场选址依赖专业评估，不作为已确定工程。

### 北京AI原点社区（约 104.3 公顷）

定位为"**原点之核 ORIGIN-NODE**"：人字交汇点，原始创新、开源生态与人才特区的城市界面 [data:geometry/key_areas.geojson#KEY-002][metric:key_area_origin_community_sqm]。空间结构为"一环一广场"：近校创新走廊环绕社区，中央为"人字原点"开源广场（[data:geometry/public_space.geojson#PUBLIC-001]）。功能强调近校孵化、成果展示发布、人才居住与轨道站点一体化；建筑以保留校园界面、改造沿街楼宇、织补公共空间为主。实施风险：人才住房、站点一体化均需权属与工程确认。

### 大钟寺AI产业聚集区（约 72.0 公顷）

定位为"**场景之核 SCENE-NODE**"：智能原生新业态与商业闭环的场景街区 [data:geometry/key_areas.geojson#KEY-003][metric:key_area_dazhongsi_sqm][metric:key_area_count]。空间结构为"四象限步行联通＋场景商业街"：以轨道站为核，四个象限通过步行网络连通；布局智能终端体验、机器人、数字内容与数据要素服务等业态（概念建议）。实施风险：站点四象限联通涉及地下空间与交通安全专业论证。

## AI 创新生态、人才画像与 AI+ 场景

### 人才与用户画像（6类）

[source:AGENT-TASKBOOK][depth:three_key_area_detailed_design]

| # | 画像 | 核心需求 | 对应场景 |
| --- | --- | --- | --- |
| P1 | 大学生开发者（22岁，北航/北邮等在校生） | 免费开源空间、算力、导师、实习通道 | 24h青年共创空间、开发者散步道 |
| P2 | 归国AI创业者（35岁，AGI应用公司创始人） | 孵化服务、场景开放、资本对接、人才房 | 原点社区孵化走廊、场景开放日 |
| P3 | 大厂算法工程师（30岁） | 通勤高效、交流活动、子女教育 | 轨道接驳、自适应学习街区 |
| P4 | 社区居民长辈（65岁） | 健康服务、无障碍、可人工复核的AI | AI健康驿站、智能法律咨询亭 |
| P5 | 国际AI研究者/访客（40岁） | 多语言导览、学术与开源网络 | AR导览、全球AI治理圆桌 |
| P6 | 园区/街道运营者（38岁） | 数据可视化、人工复核、运营闭环 | 城市智能体交通推演沙盘、运营中心 |

### AI 场景卡（12张，其中3张为产业测试验证场景）

每张场景卡均注明空间位置、服务对象、运行数据、隐私边界、人工复核、运营主体、可视化图层与风险 [source:AGENT-TASKBOOK][standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK][metric:scenario_node_count]。

| # | 场景卡 | 空间位置 | 服务对象 | 运行数据 | 隐私边界 | 人工复核 | 运营主体（概念） | 图层/指标 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| S1 | 京张智慧轨道慢行接驳 | 遗址公园南北主轴 | P1/P3 | 客流、接驳需求 | 匿名聚合，不留存个人轨迹 | 调度员复核 | 轨道/公交运营方 | roads.geojson、road_density |
| S2 | 开发者散步道AR导览 | 京张公园沿线 | P1/P5 | 位置、偏好 | 需用户授权，可退出 | 内容审核 | 文化运营方 | green_space.geojson |
| S3 | 开源成果展示廊数字孪生 | 清华园站时光站 | P1/P2/P5 | 开源项目元数据 | 公开数据，无个人隐私 | 项目方确认 | 开源社区+园区 | public_space.geojson |
| S4 | 智能体贡献荣誉墙 | 遗址公园南段 | 全体 | 贡献记录 | 仅公开贡献者署名 | 人工评审 | 组委会+社区 | phasing.geojson |
| S5 | AI健康驿站 | 社区服务地块 | P4 | 健康筛查（可选） | 医疗数据本地化、加密 | 医生复核 | 社区卫生中心 | land_use.geojson |
| S6 | 自适应学习街区 | 教育用地 | P1/P3子女 | 学习行为 | 未成年人数据最小化 | 教师复核 | 学校 | land_use.geojson |
| S7 | 智能法律咨询亭 | 公共空间节点 | P4/创业者 | 咨询文本 | 不保留可识别个人信息 | 律师复核 | 法律援助机构 | public_space.geojson |
| S8 | **无人配送与机器人巡检（测试验证#1）** | 大钟寺—小月河段 | 企业/居民 | 配送路径、设备状态 | 不采集面部等生物特征 | 安全员监管 | 企业与园区共营 | roads.geojson |
| S9 | **自动驾驶低速接驳环（测试验证#2）** | 小月河场景测试环 | P3/访客 | 车辆运行数据 | 匿名化 | 安全员+远程接管 | 测试运营方 | roads.geojson |
| S10 | **城市智能体交通推演沙盘（测试验证#3）** | 众智园治理试验场 | P6 | 公开交通数据推演 | 不接入个人实时定位 | 规划师复核 | 高校+园区 | land_use.geojson |
| S11 | 24h青年共创空间 | 原点社区近校走廊 | P1/P2 | 工位、活动预约 | 最小必要 | 空间管理员 | 孵化器 | buildings.geojson |
| S12 | AI场景实验室（商业体验） | 大钟寺场景街区 | P2/P3/访客 | 体验偏好 | 授权同意 | 商家合规审查 | 商业运营方 | land_use.geojson |

以上场景均为概念建议或测试验证设想，不是已批准运营项目；未成熟技术不表述为可全面部署，指定供应商不作为必要条件 [source:AGENT-TASKBOOK]。

## 用地、建筑规模与拆改留方案

用地与建筑策略已在前文表述，本节补充规模口径 [depth:land_use_layout][depth:development_intensity_controls][depth:height_massing_character][metric:building_footprint_area_sqm]：

- **用地**：`geometry/land_use.geojson` 完整覆盖边界（91 个地块），科研与商业用地围绕三处重点区，居住与公共服务沿社区带布置，绿地沿"撇捺"两轴展开 [data:geometry/land_use.geojson#LU-001][metric:land_use_parcel_count]；
- **建筑规模**：概念建筑基底 179 个、约 78.8 公顷（`building_footprint_area_sqm`），仅为示意体量；容积率、建筑高度、建筑密度等**待正式控规条件确认** [metric:floor_area_ratio]，本方案不给出审定数值；
- **拆改留逻辑**（概念建议，待现状核实）：保留现状高校院所、文保与成熟社区；更新老旧园区、低效楼宇与铁路沿线设施；新建集中于留白用地与关键节点（如"人字原点"广场周边少量建筑）[depth:retain_renovate_demolish]；
- **风貌**：总体以"钢轨灰蓝＋AI青"为基调，鼓励屋顶光伏与立体绿化等低碳界面，具体体量、退线与风貌导则待控规条件明确 [standard:MOHURD-URBAN-DESIGN-MEASURES]。

## 交通、轨道、市政与公共服务设施

### 交通与慢行

本方案以"轨道为骨、慢行为脉、测试为翼"组织交通 [depth:traffic_rail_slow_parking][standard:MOHURD-CONTROL-DETAILED-PLANNING]：

- 轨道站点一体化：清华园站、大钟寺站等沿线站点作为"站—园—街"一体化节点（概念建议，线位与站点以正式规划为准）；
- 道路微循环：`geometry/roads.geojson` 提供 24 条概念道路中心线（纵向创新通廊、横向社区支路、绿道），总长约 47 公里、路网密度约 41 米/公顷 [data:geometry/roads.geojson#ROAD-001][metric:road_length_m][metric:road_density_m_per_ha]；
- 慢行断点织补：以"人字"两轴串联步行与骑行网络，重点打通遗址公园东西缝合、南北贯通的断点（概念建议）；
- 停车与非机动车：枢纽周边集约停车，非机动车停放纳入站城一体设计（待专业测算）。

### 市政与新型基础设施

本方案提出分布式能源、端侧算力、智慧市政与公共安全 AI 值守四类"新基建"方向 [depth:municipal_new_infrastructure]：分布式光伏与储能节点、社区级边缘算力站、AI 巡检与应急值守辅助系统。所有市政容量、能源负荷与工程可行性**待专业评估**，不构成工程结论 [source:AGENT-TASKBOOK]。

![交通慢行与蓝绿公共空间复合系统图](assets/figures/mobility-bluegreen.png)

## 蓝绿空间、公共空间与城市风貌

### 蓝绿公共空间

蓝绿系统以"一撇一捺＋五环"组织 [depth:blue_green_public_space][standard:MOHURD-URBAN-DESIGN-MEASURES]：京张遗址公园概念绿带（约 215.7 公顷绿地，绿地率约 18.9%）[metric:green_ratio]、小月河场景绿道、AI原点广场与滨水步行空间（公共空间率约 2.9%）[metric:public_space_ratio]；五个 15 分钟圈内布置邻里公园，实现"出门见绿、步行见园"（概念建议）。`geometry/green_space.geojson` 与 `geometry/public_space.geojson` 为该系统的数据表达 [data:geometry/green_space.geojson#GREEN-001][data:geometry/public_space.geojson#PUBLIC-001]。

### AI 朝圣地标（4个，概念建议）

[source:AGENT-TASKBOOK][metric:landmark_count]

| # | 地标 | 位置 | 公共意义 |
| --- | --- | --- | --- |
| L1 | 「人字原点」开源纪念碑 | AI原点社区广场 | 纪念AI首次参与真实城市设计与开源贡献，强化"人本"原点 |
| L2 | 「清华园站」开发者时光站 | 清华园站遗址 | 老车站改造为开源成果展示与"时间胶囊"节点（概念） |
| L3 | 智能体贡献荣誉墙 | 遗址公园南段 | 碑刻式数字+实体荣誉体系，记录年度杰出贡献 |
| L4 | 大钟寺AI晨钟 | 大钟寺片区 | 每日由智能体生成"城市简报"的公共装置（概念，不涉宗教功能） |

地标均为概念方案，不构成已批准建设；涉及文保、绿地、蓝线与交通安全约束时须专业复核 [source:AGENT-TASKBOOK]。

## 更新项目清单、实施政策与分期计划

### 更新项目清单（15项，概念建议）

[source:AGENT-TASKBOOK][depth:renewal_project_list][metric:renewal_project_count][data:geometry/phasing.geojson#PHASE-001]

| # | 项目 | 类型 | 分期 | 依赖条件 |
| --- | --- | --- | --- | --- |
| R1 | 京张遗址公园"人字"文化主轴贯通（北段） | 公共空间 | 一期 | 遗址保护与绿线确认 |
| R2 | 清华园站开发者时光站改造 | 更新 | 一期 | 文保审批 |
| R3 | AI原点开源广场 | 公共空间 | 一期 | 权属确认 |
| R4 | 智能体贡献荣誉墙一期 | 文化设施 | 一期 | 纪念体系审批 |
| R5 | 众智园算力与治理试验场 | 产业更新 | 一期 | 专业评估 |
| R6 | 众智园中试加速楼更新 | 产业更新 | 二期 | 建筑评估 |
| R7 | 原点社区近校创新走廊 | 更新 | 一期 | 校企协调 |
| R8 | 原点社区人才公寓（概念） | 新建 | 二期 | 用地与住房政策 |
| R9 | 大钟寺站四象限步行联通 | 市政/慢行 | 一期 | 地下空间与交通安全论证 |
| R10 | 大钟寺智能终端场景街区 | 更新 | 二期 | 产业招商（概念） |
| R11 | 小月河滨水绿道 | 公共空间 | 一期 | 蓝线确认 |
| R12 | 小月河低速测试环 | 市政/测试 | 二期 | 交通与安全评估 |
| R13 | 学院路—西土城路慢行织补 | 慢行 | 二期 | 道路红线确认 |
| R14 | 分布式能源与端侧算力节点 | 新基建 | 三期 | 电网与市政评估 |
| R15 | 智慧市政与AI值守辅助系统 | 新基建 | 三期 | 数据治理合规 |

分期面积：一期约 6.73 km²、二期约 4.32 km²、三期约 0.37 km² [metric:phase_1_area_sqm][metric:phase_2_area_sqm][metric:phase_3_area_sqm]，对应 `geometry/phasing.geojson` [data:geometry/phasing.geojson#PHASE-001]。

### 全球AI创新活动体系与长期运营（概念建议）

[source:AGENT-TASKBOOK][depth:phasing_implementation]

- **年度活动体系**：每年 9 月"京张AI开源节"（呼应征集落地启动季）；每年 4 月中关村论坛期间"AI原点周"（与既有中关村论坛品牌概念联动）；季度"人字开发者马拉松"；每月"场景开放日"；年度"全球AI治理圆桌"；
- **品牌与传播视觉系统**：以"人字新轨"Logo 体系统一活动视觉，双语传播，公开成果进入开源展示网站；
- **开发者社区运营**：贡献积分制→荣誉墙记录→年度表彰，形成"参与—记录—纪念"闭环；
- **场景开放运营**：企业发布需求、社区众包、专业团队深化（对应 S8–S10 测试场景）；
- **国际传播与招引转化**：多语言内容＋GitHub 公开库；黑客松获奖团队直通孵化器与场景开放通道。

以上活动、招商、政策与资金安排均为概念建议，不表述为已确定的政府安排 [source:AGENT-TASKBOOK]。

## 指标体系、面积复算与合规矩阵

核心指标见下表，全部可由 `geometry/*.geojson` 或 `proposal.md` 复算 [depth:metrics_recalculation][standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]：

| 指标 | 值 | 单位 | 公式/来源 | 状态 |
| --- | --- | --- | --- | --- |
| site_area_sqm | 11,412,825 | m² | polygon_area(site_boundary, EPSG:4548) | known（provisional） |
| green_ratio | 0.189 | 比率 | green_area/site_area | known |
| public_space_ratio | 0.029 | 比率 | public_space_area/site_area | known |
| building_footprint_area_sqm | 788,361 | m² | sum(building footprints) | known |
| road_density_m_per_ha | 约41 | m/ha | road_length_m/(ha) | known |
| land_use_parcel_count | 91 | 个 | count(land_use) | known |
| key_area_count | 3 | 个 | count(key_areas) | known |
| scenario_node_count | 12 | 个 | 场景卡数 | known |
| renewal_project_count | 15 | 个 | 项目清单数 | known |
| landmark_count | 4 | 个 | 朝圣地标数 | known |
| floor_area_ratio | — | 比率 | 待控规条件 | unknown |

合规覆盖：`compliance_matrix.json` 覆盖公告 1.3/1.4/1.5 全部 17 项与 `agent.1`–`agent.6` 共 23 项必答要求；`standard_matrix.json` 覆盖 6 项强制专业标准；`design_depth_matrix.json` 15 项核心深度项全部 `complete` [depth:metrics_recalculation][metric:key_area_count]。

![核心指标复算与证据链图](assets/figures/metrics-evidence.png)

## 风险、版权与合规说明

1. **资料边界**：当前无官方精确红线，全部几何为 provisional，面积与位置须在官方 polygon 发布后复算 [source:BOUNDARY-SOURCE][depth:risk_missing_data]；
2. **法定控制缺失**：容积率、高度、密度、道路红线、权属、市政容量均待正式控规与工程条件确认，本方案不给出审定数值 [metric:floor_area_ratio]；
3. **概念属性**：所有空间落地建议均为概念建议、参考方案或供专业团队深化研究的材料，不替代正式规划，不构成政府审定结论 [source:AGENT-TASKBOOK]；
4. **版权与数据合规**：仅使用公开或清权资料；原创命名、Logo 与图件不侵犯第三方权利；不包含个人隐私、非公开规划资料或未授权数据 [source:SOURCE-REGISTRY]；AI 生成内容及责任边界见 `report/copyright_statement.md`；
5. **专业复核**：文保、绿线、蓝线、交通、市政、地下空间与工程可行性须由专业团队复核后进入深化。

## 参考资料

- `brief/site-package/design_brief.json`、`allowed_design_space.json`、`agent_taskbook.json`、`sources.json`、`enums/`、`ranges/planning_limits.json`、`standards/standards.json`
- `data/source_registry.json`、`data/processed/agent_fact_pack.md`
- `docs/formal-submission-guide.md`、`docs/data-workflow.md`
- `geometry/site_boundary.geojson`、`geometry/key_areas.geojson`、`geometry/land_use.geojson`、`geometry/buildings.geojson`、`geometry/roads.geojson`、`geometry/green_space.geojson`、`geometry/public_space.geojson`、`geometry/constraints.geojson`、`geometry/phasing.geojson`
- `metrics.json`、`compliance_matrix.json`、`standard_matrix.json`、`design_depth_matrix.json`、`assumptions.json`、`sources.json`

证据引用索引：[source:SITE-PACKAGE][source:SOURCE-REGISTRY][source:OFFICIAL-ANNOUNCEMENT][source:AGENT-TASKBOOK][source:BOUNDARY-SOURCE][source:KEY-AREA-SOURCE][source:MOHURD-URBAN-DESIGN-MEASURES][source:MOHURD-CONTROL-DETAILED-PLANNING][source:MNR-LAND-USE-CLASSIFICATION][source:MOHURD-ARCH-DESIGN-DEPTH-2016] · [standard:PROJECT-OFFICIAL-ANNOUNCEMENT][standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK][standard:MOHURD-URBAN-DESIGN-MEASURES][standard:MOHURD-CONTROL-DETAILED-PLANNING][standard:MNR-LAND-USE-CLASSIFICATION-GUIDE][standard:MOHURD-ARCH-DESIGN-DEPTH-2016] · [depth:existing_conditions_diagnosis][depth:metrics_recalculation] · [data:geometry/site_boundary.geojson#SITE-001][data:geometry/land_use.geojson#LU-001][data:geometry/constraints.geojson#CONS-SITE-001] · [metric:site_area_sqm][metric:green_ratio][metric:public_space_ratio][metric:building_footprint_area_sqm]
