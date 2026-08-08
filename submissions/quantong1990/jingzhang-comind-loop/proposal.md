---
title: "智轨共生：京张共智脉 AI Commons Loop"
author_github: "quantong1990"
language: "zh"
license: "COMMUNITY-DISPLAY-ONLY"
summary: "以京张遗址公园为共智公地，提出一条开放创新脉、三类共创核、两翼协同回路与十二个可审计AI场景。"
tracks: ["ai-traffic-walkability", "enterprise-services-ecosystem", "civic-agent-governance"]
scenarios: ["ai-traffic-walkability", "enterprise-service-copilot", "public-safety-operations-review"]
---


# 智轨共生：京张共智脉 AI Commons Loop

## 设计依据与资料清单

本 formal 方案以北京市规划和自然资源委员会海淀分局发布的《百年京张AI创新带城市设计国际方案征集资格预审公告》为第一依据，并以 `brief/site-package/` 中经维护者登记的临时粗略边界、重点区域、枚举、指标和来源清单为机器可读依据。AI agent 在生成方案前必须读取 `design_brief.json`、`allowed_design_space.json`、`sources.json`、`enums/`、`ranges/`、`schemas/`、`data/source_registry.json` 和 `data/processed/agent_fact_pack.md`，并用 `project_scope_summary.csv`、`agent_task_requirements.csv`、`source_use_matrix.csv`、`missing_data_checklist.csv` 建立任务、范围、资料用途和缺口清单。所有设计判断都要拆分为可追溯来源、可复算指标、可校验图层和可人工复核假设。公告要求方案达到控制性详细规划的城市设计深度和规划综合实施方案的城市设计深度，因此文本叙述不能替代 GeoJSON、指标表、A3 文册、A0 展板和 HTML 电子展示成果。

本节证据链引用 [source:OFFICIAL-ANNOUNCEMENT]、[source:AGENT-TASKBOOK]、[source:SITE-PACKAGE]、[source:SOURCE-REGISTRY]、[source:PROCESSED-FACT-PACK]、[source:BOUNDARY-SOURCE]、[source:KEY-AREA-SOURCE]、[standard:PROJECT-OFFICIAL-ANNOUNCEMENT]、[standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]、[standard:MOHURD-URBAN-DESIGN-MEASURES]、[standard:MOHURD-CONTROL-DETAILED-PLANNING]、[standard:MNR-LAND-USE-CLASSIFICATION-GUIDE]、[standard:MOHURD-ARCH-DESIGN-DEPTH-2016] 和 [depth:existing_conditions_diagnosis]，用于说明方案不是独立愿景文本，而是从公告、面向智能体任务书、标准、边界、处理资料包和资料清单出发组织成果。

资料登记表的使用边界如下：

- data/source_registry.json 登记公开、清权与临时资料的用途边界。
- 当前登记摘要：formal 可用资料 5 条，背景资料 0 条，provisional-only 资料 1 条。
- agent 不得把 background_only 或 provisional_only 资料升级为 official boundary、法定控规、正式评分依据或政府实施承诺。

`data/processed/agent_fact_pack.md` 是本方案的阅读导航层，不是新的权威来源。[source:PROCESSED-FACT-PACK] 只帮助 agent 把三层范围、三处重点区、公告任务、agent.1-agent.6、资料可用性和缺资料事项组织成可读方案；所有事实判断仍回到 [source:OFFICIAL-ANNOUNCEMENT]、[source:AGENT-TASKBOOK]、[source:SOURCE-REGISTRY]、[source:BOUNDARY-SOURCE] 与 [source:KEY-AREA-SOURCE]。

![资料证据链与提交包关系图](assets/figures/site-overview.png)

本脚手架在官方 `SITE_BOUNDARY` 或三处 `KEY_AREA` 尚未取得时，使用 `brief/site-package/geometry/provisional_boundaries.geojson` 生成临时 formal 包。提交包中的 `geometry/site_boundary.geojson` 与 `geometry/key_areas.geojson` 均必须标注为 `provisional_constraint`、`official_boundary=false`，只能用于方案生成、自检、可视化和设计讨论，不能作为 official redline、审批依据、精确面积依据或法定控制结论。该组织方数据缺口本身不阻断内容评分；替换 official polygons 后，site boundary、key areas、land use、roads、green space、public space、buildings、phasing 和 metrics 均需重算。

本次脚手架生成的可评分状态为：**临时边界，保留精度警示并待正式数据发布后复算；不阻断内容评分**。因此，正文中的空间结构、场景、项目和指标均按“可讨论、可复核、可替换官方边界后重算”的原则写入；当官方边界和重点区 polygon 更新后，agent 必须重新运行脚手架、自检和图纸/HTML生成，不能只替换单个文件。

边界和重点区域的可读解释对应 [data:geometry/site_boundary.geojson#SITE-001]、[data:geometry/key_areas.geojson#PROV-KEY-001] 和 [metric:site_area_sqm]、[metric:key_area_count]。这意味着读者可以从正文回到 GeoJSON 查看边界来源、从 metrics 查看面积复算结果、从 sources 查看资料来源，而不是只相信一段文字判断。

## 三层范围工作框架

方案按照公告确定的三个层次组织工作：统筹研究范围关注 43.6 平方公里的AI产业生态、战略定位、创新链和未来城市形态；总体设计范围关注 11.4 平方公里京张遗址公园周边 1-2 公里城市地区和产业区，要求形成城市更新总体框架、产业空间布局、交通市政支撑和城市风貌控制；重点区域范围关注 368.4 公顷三处详细设计地区，要求明确功能业态、建筑规模、拆改留分类、公共空间连通和交通组织。三层范围在 `compliance_matrix.json` 中逐条映射，保证公告 1.3、1.4、1.5 与 agent.1-agent.6 的必选任务都有章节、图层、指标、图纸和 HTML 证据。

三层工作框架的深度项由 [depth:three_level_scope_framework] 和 [depth:overall_spatial_structure] 约束，空间证据以 [data:geometry/site_boundary.geojson#SITE-001] 与 [data:geometry/key_areas.geojson#PROV-KEY-001] 为准，任务依据以 [standard:PROJECT-OFFICIAL-ANNOUNCEMENT] 为准，范围索引以 [source:PROCESSED-FACT-PACK] 中 `project_scope_summary.csv` 的三层范围表为导航。

![三层范围与空间工作框架图](assets/figures/land-use-structure.png)

三层工作不是互相割裂的图纸集合。统筹研究决定产业链和城市形态判断，总体设计把判断落实到更新项目、空间结构和设施承载，重点区域详细设计验证具体地块、建筑、交通、公共空间和AI应用场景的可实施性。agent 生成方案时必须先锁定当前提交采用的 official 或 provisional 边界和约束，再生成用地、建筑、道路、绿地、公共空间、分期和AI服务节点，最后从这些图层复算指标并在正文解释哪些结论仍受 provisional boundary 限制。任何无法从结构化数据复算的面积、比例、规模或项目数量，不得写入正式结论。

本方案建议的总体概念为“京张共智脉”：以京张遗址公园为历史与公共空间主轴，以众智园、北京AI原点社区、大钟寺三处重点片区为创新锚点，以高校、企业、社区和轨道站点为日常网络，形成“一带三核、多点场景、蓝绿慢行复合环”的空间组织。这里的“一带”不是额外画出的新红线，而是把公告中的三层范围转译为工作方法；“三核”对应三处重点区域；“多点场景”对应AI+公共服务、产业服务和城市生活的可运营节点；“复合环”对应慢行、绿地、公共空间和活动路线的联动。

| 层级 | 设计问题 | 方案回答 | 数据落点 |
| --- | --- | --- | --- |
| 统筹研究范围 | AI产业生态和未来城市形态如何组织 | 建立“高校策源-开源协作-企业转化-公共体验-国际传播”的创新链 | compliance_matrix.json、standard_matrix.json |
| 总体设计范围 | 产业空间、城市更新、交通市政和风貌如何落图 | 用地、建筑、道路、绿地、公共空间和分期图层共同表达 | [data:geometry/land_use.geojson#LU-001]、[data:geometry/roads.geojson#ROAD-001] |
| 重点区域范围 | 三处片区如何达到详细设计深度 | 分别提出定位、空间动作、AI场景和实施依赖 | [data:geometry/key_areas.geojson#PROV-KEY-001]、[data:geometry/key_areas.geojson#PROV-KEY-002]、[data:geometry/key_areas.geojson#PROV-KEY-003] |

## 统筹研究范围产业与未来城市研究

方案把“产业园”问题改写为“创新公地”问题：不以封闭园区和一次性形象工程聚集资源，而以可共享、可预约、可审计的公共界面连接高校策源、开源协作、企业转化、居民体验和国际传播。总体主名为“京张共智脉”，英文工作名为 **Jing-Zhang AI Commons Loop**；“脉”指百年铁路时序和南北公共空间连续性，“共智”指知识、算力、数据、场景与荣誉记录在公共利益边界内循环。[source:AGENT-TASKBOOK] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK] [depth:overall_spatial_structure]

视觉识别采用“轨枕 + 对话回路”的原创几何语法：两条平行线代表京张历史轨迹，三枚开放节点代表三处重点区，一条不闭合回路代表允许新贡献持续接入。主色“铁路深蓝”用于证据层，“公地青”用于开放共享，“治理珊瑚”用于风险和人工复核。Logo 只给出几何方向，不调用第三方商标、字体或人物肖像；可供专业品牌团队深化研究。

空间结构是“一脉三核、两翼回路、十二触点”：一脉为京张遗址公园共智公地；北部众智园形成全栈验证与治理核，中部原点社区形成近校开源转化核，南部大钟寺形成智能原生城市服务核；中关村科技服务翼提供资本、法务、知识产权和国际链接，小月河场景赋能翼提供公共测试、居民体验和运营反馈。十二触点把三大定位与五大功能变成可体验、可审计的日常界面，而不是新的法定红线。[data:geometry/roads.geojson#ROAD-001] [data:geometry/public_space.geojson#PUBLIC-001]

### 六个全球机制案例对照

下表仅比较组织机制，不转用案例的面积、投资、绩效或空间控制数据，全部标记为 background-only：

| 案例 | 可验证机制 | 对京张的转化 | 使用边界 |
| --- | --- | --- | --- |
| 多伦多 Vector Institute [source:CASE-VECTOR] | 研究、人才与产业采用之间设置桥接机构 | 设置“一次入口、多方转介”的技术采用台 | 不复制资金或企业名单 |
| 蒙特利尔 Mila / Mile-Ex [source:CASE-MILA] | 研究、创业、企业实验与社区交流近距离耦合 | 原点社区采用“开放首层 + 安静研发层” | 不推断本地建筑规模 |
| AI Singapore [source:CASE-AISG] | 研究、人才、开源工具、产业共创一体化 | 建立场景沙盒的培训-测试-复盘闭环 | 不转用国家政策承诺 |
| Seoul AI Hub [source:CASE-SEOUL] | 创业空间、专家培养与社区交换共址 | 众智园设置共享评测与透明研究界面 | 不引用实时业绩作本地目标 |
| Amii [source:CASE-AMII] | 基础研究、负责任采用和技能体系协同 | 把治理审查嵌入每张场景卡 | 不将机构做法视为本地批准政策 |
| 巴黎 STATION F [source:CASE-STATIONF] | 大型创业社区提供多方服务入口 | 大钟寺构建可步行的城市型服务会客厅 | 不复制园区体量或运营合同 |

案例提炼为“六个可运营接口”：研究接口、开源接口、测试接口、企业服务接口、公共体验接口、国际传播接口。每一接口同时注明空间载体、数据权限、人工复核、运营主体建议与退出机制，从而回应世界级 AI 创新生态而不编造企业、产值、投资或政府承诺。[source:OFFICIAL-ANNOUNCEMENT] [depth:existing_conditions_diagnosis]

## 总体设计范围城市更新与控规深度城市设计

总体设计采用“先公共性、后容量；先可逆、后永久”的更新判断。`land_use.geojson` 用同一边界切分形成完整无缝功能分区，说明产业、生活、教育、服务与开放空间的关系；它不是控规修改。[data:geometry/land_use.geojson#LU-001] [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE] [depth:land_use_layout]

功能组织遵循四项规则：沿共智脉优先布置开放首层、展廊、共享会议和公共服务；三核内部安排安静研发与受控测试；两翼接口提供知识产权、算力、法务和场景运营；居住与社区服务以日常步行可达为判断，不以职住平衡口号替代设施底数。原型建筑避让公共空间与蓝绿脉，采用小基底、可拼接、可转换的证据图层，但不对应现状单体或权属。[data:geometry/buildings.geojson#BLDG-001] [depth:retain_renovate_demolish]

建筑更新使用“留、改、增、撤”四级方法而不直接给出拆除对象：有价值且适配的对象优先保留；可通过首层开放和设备升级改善的对象建议改造；经权属、控规、消防和结构复核后才研究增补；临时构筑物允许撤回。当前仅绘制“可逆更新原型”，总建筑面积、容积率、建筑高度、密度、退线和具体拆改留全部等待官方控规与现状调查。[standard:MOHURD-CONTROL-DETAILED-PLANNING] [depth:development_intensity_controls] [depth:height_massing_character]

风貌不是统一科技表皮，而是“铁路材料记忆 + 中关村可编辑界面 + AI 时代透明治理”：下层界面耐久、朴素、可触摸；公共层允许贡献记录、模型说明和活动信息更新；安静研发层控制眩光和广告干扰。所有控制均为概念建议，可供专业团队在文保、日照、消防、结构和控规条件齐备后深化研究。

## 重点区域详细设计

三处临时重点区 polygon 只用于组织设计讨论，并保留淡色虚线表达。[data:geometry/key_areas.geojson#PROV-KEY-001] [data:geometry/key_areas.geojson#PROV-KEY-002] [data:geometry/key_areas.geojson#PROV-KEY-003] [depth:three_key_area_detailed_design]

![三处重点区域的差异化设计与项目抓手](assets/figures/key-areas.png)

| 重点区 | 核心矛盾 | 三个空间动作 | 首批概念项目 | 前置复核 |
| --- | --- | --- | --- | --- |
| 众智园全栈验证与治理核 | 高强度研发与开放交流如何兼容 | 清河界面形成低碳测试花园；封闭园区边界设置预约共享门厅；北门户形成标准与治理展示节点 | 安全治理沙盒、端侧算力驿站、清河算法花园 | 清河蓝线、防洪、五环交通、园区权属 |
| AI 原点近校开源转化核 | 校园成果如何跨过“最后一公里”且不扰民 | 校-园-街慢行缝合；首层形成开源发布与知识产权服务；夜间活动分级 | 开源发布厅、成果转化街、贡献档案馆 | 校园边界、消防、社区承载、现状建筑 |
| 大钟寺智能原生城市服务核 | 轨道客流、企业服务与公共生活如何互利 | 四象限步行优先；站城会客厅连接企业与社区；绿地嵌入可退出的消费测试 | 智能体路演厅、数据权利会客厅、可解释服务街 | 轨道保护、道路红线、地下管线、商业权属 |

每区采用同一“空间-场景-运营-退出”模板：空间先定义公共性和安全边界；场景说明最小数据；运营说明建议责任方和人工复核；退出条款保证试点失败时可撤除并恢复。这样把精细化设计落到可审查构件，同时避免在 official 边界、权属和工程资料缺失时制造伪精确结论。[source:BOUNDARY-SOURCE] [source:KEY-AREA-SOURCE]

## AI 创新生态、人才画像与 AI+ 场景

六类用户画像是：基础研究者需要安静深度工作和跨学科碰撞；开源开发者需要贡献可记忆和低门槛协作；初创团队需要算力、测试、法务与首批用户；企业产品团队需要合规验证和国际发布；周边居民需要低扰动、无障碍和可信公共服务；访客与青少年需要可理解、可参与且不被过度采集的体验。画像不来自个人追踪，只用于空间需求假设。[source:AGENT-TASKBOOK] [depth:existing_conditions_diagnosis]

### 十二张 AI 场景卡

| # | 场景 / 类型 | 空间 | 最小数据与人工复核 | 运营与退出 |
| --- | --- | --- | --- | --- |
| 01 | 开源发布厅 | 原点社区 | 仅公开项目元数据；作者确认后发布 | 社区策展；可删除、更正 |
| 02 | 模型安全治理沙盒 / **产业测试** | 众智园 | 隔离测试集；专家批准测试范围 | 预约制；失败模型不外放 |
| 03 | 端侧算力与能效试验站 / **产业测试** | 众智园 | 设备遥测匿名聚合；工程师复核 | 小规模可撤设备 |
| 04 | 无障碍慢行协助 | 京张共智脉 | 用户主动请求、短时定位；人工客服兜底 | 默认关闭持续追踪 |
| 05 | 大钟寺智能体路演厅 / **产业测试** | 大钟寺 | 合成或授权数据；红队审核 | 活动结束清除测试数据 |
| 06 | 清河算法花园 | 北部蓝绿界面 | 环境数据只做聚合；生态专家复核 | 不控制自然系统，仅解释 |
| 07 | 近校成果转化驿站 | 原点社区 | 项目自愿登记；法务人工核验 | 转介制，不承诺融资 |
| 08 | 数据权利会客厅 | 大钟寺 | 模拟授权账本；隐私官复核 | 公众可查询与申诉 |
| 09 | AI 生活服务样板街 | 社区界面 | 明示同意；不做人脸识别 | 服务员可随时接管 |
| 10 | 公共空间维护助手 | 共智公地 | 设施工单、非个人图像；人工派单 | 不自动处罚或执法 |
| 11 | 京张记忆对话站 | 历史节点 | 已清权档案；史实编辑复核 | 错误可溯源修订 |
| 12 | 全球 AI Commons Week 路线 | 一带公共空间 | 报名最小化；活动安全人工指挥 | 每年复盘，不承诺固定举办 |

三类产业测试场景都采用“测试前清权—测试中隔离—测试后复盘—不通过即退出”的闸门；城市服务场景采用“可解释—可拒绝—可人工接管—可申诉”四条公共利益规则。任何智能体不得替代规划审批、公安执法、医疗诊断或资源分配的最终人类决定。[data:geometry/public_space.geojson#PUBLIC-001] [data:geometry/roads.geojson#ROAD-001] [metric:scenario_node_count] [depth:municipal_new_infrastructure]

### 三处 AI 朝圣地标与荣誉系统

“开源原点档案馆”记录可核验的开源贡献而非名人崇拜；“全栈透明塔”以可解释剖面展示模型、算力、数据与安全治理关系；“百年信号亭”把铁路信号语言转译为公共 AI 素养装置；“城市智能体剧场”作为可变路演与公众质询空间。地标均为轻量、可逆、低眩光概念组件，需文保、结构、消防和版权专业审查。荣誉展示只接受可验证贡献、允许更正撤回，并将团队、维护者、数据贡献者和公共反馈者共同纳入记录。

## 用地、建筑规模与拆改留方案

用地分区只承担“功能关系测试”：科研与产业服务靠近三核，居住和社区服务形成日常支持，共智公地与公园绿地维持南北连续。每个 polygon 由同一 submitted boundary 裁剪，接边共享坐标、无空隙无重叠；面积在 EPSG:4548 复算。[data:geometry/land_use.geojson#LU-001] [metric:land_use_0802_area_sqm] [metric:land_use_05_area_sqm] [metric:land_use_0701_area_sqm] [metric:land_use_0702_area_sqm] [metric:land_use_1401_area_sqm] [metric:land_use_1403_area_sqm] [metric:land_use_0804_area_sqm] [depth:land_use_layout]

![功能分区、共智公地与三层范围传导](assets/figures/land-use-structure.png)

建筑图层是十余个可逆更新原型，不对应真实建筑。原型优先形成小基底、通透首层和可变共享空间；建筑密度只是原型对 provisional boundary 的几何比值，不是审定指标。[data:geometry/buildings.geojson#BLDG-001] [metric:building_footprint_area_sqm] [metric:building_density] [depth:height_massing_character]

正式深化必须先叠合现状建筑轮廓、年代、结构、用途、权属、控规、消防、日照和文保条件，再逐栋形成“保留/修缮/功能转换/增补/撤除待论证”证据卡。当前不指定任何既有建筑拆除，也不确认总建筑规模、容积率或高度。

## 交通、轨道、市政与公共服务设施

交通设计以“慢行连续优先、轨道换乘清楚、机动车微循环待核”为原则。一条南北共智慢行主脉连接三核，五条东西缝合线连接高校、园区与社区，两条翼向接驳线表达科技服务和场景赋能关系；所有线均是概念中心线，不是道路红线或工程线位。[data:geometry/roads.geojson#ROAD-001] [metric:road_centerline_length_m] [depth:traffic_rail_slow_parking]

![交通慢行、蓝绿连续与十二场景触点](assets/figures/mobility-bluegreen.png)

大钟寺站概念策略是地面过街优先、四象限路径可读、非机动车停放有序、换乘信息无障碍；五道口和清华东路西口概念策略是减少校-园-街绕行，设置共享门厅和雨棚连续界面；五环和桥下空间只提出“断点识别与多专业会诊”，不判断桥隧可行性。[source:OFFICIAL-ANNOUNCEMENT]

新型基础设施采用“小站点、低负荷、可退出”：端侧算力节点与公共服务合设，默认不存储个人原始数据；分布式能源只提出负荷协同和能效展示界面；市政、消防、防洪、排水、管线与通信容量均列为前置核验。[data:geometry/constraints.geojson#CONSTRAINTS] [depth:municipal_new_infrastructure]

## 蓝绿空间、公共空间与城市风貌

蓝绿系统把 provisional boundary 降为淡色约束，以京张遗址公园方向性的南北共智脉为主角。连续绿带与四个门户/枢纽公园原型形成“走得到、停得下、看得懂、可退出”的公共空间；五处东西缝合界面叠加步行、骑行、雨洪花园、休息和公共 AI 素养设施。[data:geometry/green_space.geojson#GREEN-001] [data:geometry/public_space.geojson#PUBLIC-001] [metric:green_space_area_sqm] [metric:green_ratio] [metric:public_space_area_sqm] [metric:public_space_ratio] [depth:blue_green_public_space]

文化叙事采用“三种时间”：铁路时间记录百年工程、迁移与城市生长；中关村时间记录试验、开源、失败与再创业；AI 时间强调模型迭代、责任和可撤回。导视用“里程标”表示空间位置，用“版本号”表示内容更新，用“责任卡”说明数据来源、模型用途和人工联系人。国际传播短句为 **A century on the rail, a commons for intelligence**，中文正式解释为“百年轨迹之上，共建面向公共利益的智能公地”。[standard:MOHURD-URBAN-DESIGN-MEASURES]

所有节点避免大屏支配和过度照明：历史节点以材料、刻度和声音为主；创新节点以开放接口和贡献记录为主；生活节点以无障碍、遮荫、座椅、饮水和卫生间等基础体验为先。清河、小月河、文保控制和既有公园实施范围未获得精确附件，须坚持低扰动并由生态、文保、交通专业复核。[depth:risk_missing_data]

## 更新项目清单、实施政策与分期计划

更新项目按“先可逆公共层—再协同更新—后长期治理”排序。阶段一以轻量导视、开放活动、公共空间维护和三类测试沙盒为主；阶段二在权属与交通核验后研究近校成果转化、轨道接驳与园区边界开放；阶段三在官方控规、市政和文保资料完备后，才讨论永久建筑和工程项目。[data:geometry/phasing.geojson#PHASE-001] [metric:phase_001_area_sqm] [metric:phase_002_area_sqm] [metric:phase_003_area_sqm] [depth:phasing_implementation]

| 项目 | 概念成果 | 决策闸门 | 失败时退出 |
| --- | --- | --- | --- |
| C-01 共智导视与责任卡 | 12 个触点统一识别 | 文保、无障碍、版权 | 撤除并恢复场地 |
| C-02 开源原点发布厅 | 发布、贡献与纠错流程 | 权属、消防、运营主体 | 转为普通社区活动空间 |
| C-03 众智园安全治理沙盒 | 预约评测与公众解释 | 数据清权、网络安全、专家审核 | 关闭外部访问并销毁测试数据 |
| C-04 大钟寺智能体路演厅 | 合成数据演示与国际交流 | 轨道保护、商业权属、活动安全 | 改为普通路演会客厅 |
| C-05 慢行断点多专业会诊 | 断点清单和替代路径 | 道路红线、交通仿真、市政 | 保留信息改善，不实施工程 |
| C-06 AI Commons Week | 年度议题、开发者社区、公众体验 | 场地许可、安保、预算与伙伴清权 | 改为分散小型活动 |

年度运营提出四季节奏：春季开源与人才季、夏季公共场景测试季、秋季全球 AI Commons Week、冬季治理复盘与荣誉归档。开发者从活动报名进入社区，从问题单进入小型验证，从复盘进入公开知识库；企业从需求诊断进入受控测试；居民从议题提出进入共创和申诉。所有活动均为建议机制，不构成确定安排、招商承诺或资金承诺。[depth:renewal_project_list] [source:AGENT-TASKBOOK]

## 指标体系、面积复算与合规矩阵

指标分为三组：几何可复算、官方待补、运营试验。几何指标来自 submitted GeoJSON 并受 provisional boundary 精度限制；官方待补指标保持 unknown；运营指标只定义采集方式，不预设绩效目标。[depth:metrics_recalculation]

![核心指标、复算链与数据缺口](assets/figures/metrics-evidence.png)

当前机器可读 known 指标索引为：[metric:site_area_sqm] [metric:building_footprint_area_sqm] [metric:building_density] [metric:green_space_area_sqm] [metric:green_ratio] [metric:public_space_area_sqm] [metric:public_space_ratio] [metric:key_area_count] [metric:scenario_node_count] [metric:road_centerline_length_m] [metric:land_use_05_area_sqm] [metric:land_use_0701_area_sqm] [metric:land_use_0702_area_sqm] [metric:land_use_0802_area_sqm] [metric:land_use_0804_area_sqm] [metric:land_use_1401_area_sqm] [metric:land_use_1403_area_sqm] [metric:phase_001_area_sqm] [metric:phase_002_area_sqm] [metric:phase_003_area_sqm]。其中 site、用地、绿地、公共空间、建筑原型与分期面积均在 EPSG:4548 复算；道路只有概念中心线长度；场景数来自十二张场景卡。容积率、总建筑面积、道路面积与比例因缺官方条件保持 unknown，不用设计数值填补。[data:geometry/site_boundary.geojson#SITE-001] [data:geometry/land_use.geojson#LU-001]

指标使用有两条硬边界：第一，provisional polygon 的 calculated area 只用于包内一致性，不替代公告“约 11.4 平方公里”或 official redline；第二，原型建筑密度、绿地和公共空间比例只用于比较设计结构，不是法定指标。`compliance_matrix.json` 将公告 1.3、1.4、1.5 与 agent.1-agent.6 映射到章节、图层、指标、图纸、来源、假设和自检；`standard_matrix.json` 与 `design_depth_matrix.json` 记录专业证据和数据缺口。[source:SOURCE-REGISTRY] [source:PROCESSED-FACT-PACK]

## 风险、版权与合规说明

本方案是开源 AI 共创建议，不替代正式规划，不构成政府审定结论。空间落地表述均为概念建议、参考方案或可供专业团队深化研究。official boundary、三处重点区 polygon、控规、道路红线、现状建筑、权属、文保、蓝绿线、市政、消防和公共服务底数缺失，已写入 assumptions；官方资料到位后必须从边界开始重算所有图层、指标、图面、HTML 和 PDF。[source:SITE-PACKAGE] [source:BOUNDARY-SOURCE] [data:geometry/constraints.geojson#CONSTRAINTS] [depth:risk_missing_data]

AI 风险按“数据—模型—空间—运营”四层控制：数据最小化且可撤回；模型说明适用范围和错误模式；空间设施低扰动、无障碍、可退出；运营保留人工负责人、申诉、事件记录和年度复盘。禁止持续个人追踪、自动执法、未经授权的人脸识别、把推荐结果作为公共资源分配决定，或以智能体替代法定审批。

五张核心图、离线 HTML 与 PDF 均由本地脚本依据 submission GeoJSON、metrics 和正文确定性生成，不使用商业地图、远程底图、新闻图片、第三方商标或人物肖像。案例只引用机构公开网页作 background-only 机制对照。版权与生成方法见 `report/copyright_statement.md`；中文正文控制解释。[standard:MOHURD-ARCH-DESIGN-DEPTH-2016]

## 参考资料

- brief/public-brief.md
- brief/site-package/design_brief.json
- brief/site-package/allowed_design_space.json
- brief/site-package/enums/
- brief/site-package/ranges/planning_limits.json
- data/processed/agent_fact_pack.md
- data/processed/project_scope_summary.csv
- data/processed/agent_task_requirements.csv
- data/processed/source_use_matrix.csv
- data/processed/missing_data_checklist.csv
- 机器可读引用索引：[source:OFFICIAL-ANNOUNCEMENT]、[source:AGENT-TASKBOOK]、[source:SITE-PACKAGE]、[source:SOURCE-REGISTRY]、[source:PROCESSED-FACT-PACK]、[standard:PROJECT-OFFICIAL-ANNOUNCEMENT]、[standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]、[depth:metrics_recalculation]、[data:geometry/site_boundary.geojson#SITE-001]、[metric:site_area_sqm]
