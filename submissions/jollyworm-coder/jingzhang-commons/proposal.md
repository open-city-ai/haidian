---
title: "京张共智线：一条可验证、可参与、可持续进化的城市公共智能带"
author_github: "jollyworm-coder"
language: "zh"
translation_file: "proposal.en.md"
license: "COMMUNITY-DISPLAY-ONLY"
summary: "以百年京张铁路为公共叙事轴，把海淀AI创新优势转化为可验证、可选择、可共同改进的城市公共智能；以众智园、AI原点社区和大钟寺分别承担可信验证、开放协作和城市交互三类原型。"
tracks: ["ai-traffic-walkability", "enterprise-services-ecosystem", "civic-agent-governance"]
scenarios: ["ai-traffic-walkability", "enterprise-service-copilot", "public-safety-operations-review"]
iteration: "v1.1-competition-upgrade"
version: "1.1.0"
---

# 京张共智线

百年前，京张铁路把工程知识变成跨越山河的公共基础设施；今天，人工智能同样需要从封闭系统走向可被城市使用、检验和共同维护的公共能力。本方案将一带命名为“京张共智线”，英文名为 **Jingzhang Commons**。其中“线”同时指铁路遗产、公共空间连续体和创新协作链；“共智”强调技术不只服务少数机构，而应增进居民、开发者、企业、高校和城市治理者的共同能力。

方案不是为现有园区贴上AI标签，而是建立一套“先验证、再开放、可退出、有人复核”的城市试验制度，并以空间设计让这套制度可见。所有空间动作均为概念建议或可供专业团队深化研究的参考方案，不替代正式规划，不构成政府审定结论。

## 核心概念与差异化机制

**京张共智线不是一条装满智能设备的展示带，而是一套运行在城市空间中的“公共智能协议”。** 它把每项 AI 服务都置于六个连续动作之中：`TEST 验证 → DISCLOSE 说明 → CHOOSE 选择 → REVIEW 复核 → EXIT 退出 → LEARN 学习`。验证回答技术是否可靠，说明让公众理解数据与责任，选择保留人的自主权，复核确保关键决定有人负责，退出允许停止失败试点，学习则把结果沉淀为下一轮开放知识。[source:AGENT-TASKBOOK] [depth:overall_spatial_structure]

这套协议通过“一线三站、两翼多点”落地：众智园负责 TEST 与 REVIEW，AI 原点社区负责 DISCLOSE 与 LEARN，大钟寺负责 CHOOSE 与城市反馈，两翼把知识、人才、资本服务和测试需求连接起来，多点则让协议进入公园、社区、学校和交通节点。与传统智慧城市“先部署再治理”、传统科技园“以企业办公为主体”、普通体验街区“以炫技展示为主”相比，本方案把**可验证的创新、可选择的服务和可撤回的空间**组合为一个制度—空间—运营闭环。

公共智能协议同时是品牌和评估工具。任何拟进入共智线的场景，都必须回答六个问题：测了什么、向谁说明、谁可拒绝、谁来复核、何时退出、学到了什么。不能完成六问的项目不进入公共空间；完成试验但无法证明公共价值的项目不扩大；产生可复用知识的项目以开放案例卡进入年度“城市测试账本”。这使“Jingzhang Commons”具有可复制、可审计和可持续进化的原创机制，而不只是口号或空间造型。

## 设计依据与资料清单

方案的任务依据来自官方公告、公开任务背景、清权任务书摘录和仓库 machine-readable site package。[source:OFFICIAL-ANNOUNCEMENT] 确认三层范围、三处重点区域及城市设计任务；[source:PUBLIC-BRIEF] 提供公开愿景与评审维度；[source:AGENT-TASKBOOK] 确认三大定位、五大功能、三区两翼与六项智能体任务；[source:SOURCE-REGISTRY] 用于判断资料能否支撑 formal、background 或 provisional 用途。[standard:PROJECT-OFFICIAL-ANNOUNCEMENT] 与 [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK] 共同控制内容范围与表达边界。

当前官方精确红线、道路红线、地块权属、建筑现状、文保控制线、市政条件和法定控规指标尚未进入仓库。因此，`geometry/site_boundary.geojson` 与三处 `KEY_AREA` 采用 [source:BOUNDARY-SOURCE]、[source:KEY-AREA-SOURCE] 提供的临时粗略 polygon，并明确标记 `provisional_constraint`、`official_boundary=false`。[data:geometry/site_boundary.geojson#SITE-001] 仅用于开源征集生成、拓扑自检、图面表达和讨论；不作为 official redline、精确面积或审批依据。[depth:existing_conditions_diagnosis]

专业表达参照 [standard:MOHURD-URBAN-DESIGN-MEASURES]、[standard:MOHURD-CONTROL-DETAILED-PLANNING] 和 [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE]。尚无官方正文的 [standard:MOHURD-ARCH-DESIGN-DEPTH-2016] 只列为待补资料，不用于证明建筑专业法定深度。正式附件到位后，边界、用地、建筑、道路、绿地、公共空间、分期、指标、图纸和HTML必须整体重算，不能只替换一张底图。

![总体概念与资料边界](assets/figures/site-overview.png)

## 三层范围工作框架

统筹研究范围 43.6 平方公里回答“海淀AI生态如何彼此连接”；总体设计范围约11.4平方公里回答“公共智能如何进入城市空间”；重点区域约368.4公顷回答“哪些原型先被验证”。三层不是三套平行材料，而是“区域创新链—公共智能主线—重点原型站”的传导关系。[source:PROCESSED-FACT-PACK] [depth:three_level_scope_framework]

空间结构概括为“一线三站、两翼多点”。“一线”是京张铁路遗址公园串联的公共智能线；“三站”是众智园可信验证站、AI原点社区开放协作站、大钟寺城市交互站；“两翼”沿中关村科技服务翼和小月河场景赋能翼扩散；“多点”是可预约、可退出、可复核的场景节点。它落实三大定位：文化带提供时间叙事，生活体验带提供公众界面，融合创新带提供产业转化。[data:geometry/key_areas.geojson#PROV-KEY-001] [depth:overall_spatial_structure]

临时总体边界的概念用地被完整划分为开放研发与验证、遗址公园与蓝绿界面、共智服务与城市客厅、人才生活与学习社区四类。分区使用共享边界坐标，不留空隙、不重叠；比例只描述当前 design geometry，不构成法定用地调整。[data:geometry/land_use.geojson#LU-001] [metric:site_area_sqm]

![三层范围与功能传导](assets/figures/land-use-structure.png)

## 统筹研究范围产业与未来城市研究

“京张共智线”把世界级AI生态拆为六个可循环环节：基础研究、开源协作、可信验证、企业转化、公共应用、国际传播。众智园侧重验证与标准，原点社区侧重知识与人才，大钟寺侧重市场与城市体验；两翼提供资本、法务、知识产权、场景对接和公共服务。由此形成“研究成果不直接进入城市，而是经过沙盒验证、公众说明和人工复核后再扩散”的产业—城市接口。[standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]

七个对标案例只提取可验证机制，不复制空间外观、企业名单或资金数字：

| 案例 | 第一方证据所支持的机制 | 京张转译 | 明确不照搬 |
|---|---|---|---|
| Vector Institute，多伦多 | 连接研究、人才与组织应用 | 众智园形成“研究—评测—组织采用”接口 | 不承诺企业入驻或采用规模 [source:CASE-VECTOR] |
| Mila，蒙特利尔 | 研究共同体与产业实践社区并行 | 原点社区设置跨机构实践共同体 | 不复制机构治理与成员数据 [source:CASE-MILA] |
| Station F，巴黎 | 多项目并行、导师与伙伴服务密集 | 科技服务翼提供模块化创业服务菜单 | 不引用其投资额或企业成绩作海淀预测 [source:CASE-STATIONF] |
| King’s Cross，伦敦 | 铁路遗产更新与知识区公共界面结合 | 遗址公园承担知识机构与社区的共享前厅 | 不复制地产开发强度 [source:CASE-KINGS-CROSS] |
| Kendall Square，剑桥 | “人才近邻”与高校转化空间 | 近校成果转化街连接学习、原型与许可服务 | 不推导海淀土地或建筑结论 [source:CASE-KENDALL] |
| Testbed Helsinki | 城市向企业和研发主体开放真实测试环境 | 建立公开申请、限定范围、结果发布的测试平台 | 不把国外试验规则视为本地审批依据 [source:CASE-HELSINKI] |
| 深圳南山 Model Camp | 公共服务平台、硬件实验和场景需求对接 | 两翼组织算力、数据、合规、资本和场景接口 | 不引用补贴、产值或招商承诺 [source:CASE-NANSHAN] |

区域协同采用“能力交换”而非同质化招商。海淀输出开源模型、人才与公共智能协议；未来科学城连接央企应用需求和季度场景对接机制；怀柔科学城连接大科学装置、仪器与科研问题；经开区连接智能制造、机器人和规模验证；京津冀伙伴承接跨城市复测与标准比较。北纬社区作为青年人才与日常生活接口，验证创新服务能否进入真实社区。所有协作均为概念建议，需由相关主体另行确认。[source:REGION-FUTURE-SCIENCE-CITY] [source:REGION-HUAIROU] [depth:industry_ecosystem_strategy]

区域协同的四类交换对象分别是：`QUESTION` 城市与产业问题、`PROTOTYPE` 可测试原型、`EVIDENCE` 公开测试结果、`STANDARD` 可复用协议。共智线不以“吸走资源”为目标，而以缩短问题—原型—证据—标准的循环时间为竞争力；每次跨区域协作必须留下责任人、数据边界、复测条件和公开摘要。

未来城市的关键不是“无人”，而是“人拥有更强的判断和行动能力”。方案提出公共智能四条规则：公共利益优先、默认最小采集、关键决定有人复核、居民能够知道和退出。城市智能体可辅助导览、设施维护、企业服务和活动组织，但不得生成未经授权的个人画像，不得替代规划审批，也不得把试验写成已获批准运营。[depth:risk_missing_data]

品牌识别采用原创“双轨开环”方向：两条平行线象征铁路与人机协作，三个节点对应三站，一处开口表示系统保持可进入、可修正。主色为京张铁轨深蓝、公共绿、验证橙；Logo和导视只给出方向，不使用企业商标、人物肖像或未清权字体。

## 总体设计范围城市更新与控规深度城市设计

总体设计以“公共界面优先、轻量试验先行、存量空间可逆更新”为原则。第一类界面是铁路遗址公园及两侧首层空间，用于慢行、文化、开源展示和公共服务；第二类界面是轨道站点、校区—园区接缝及跨路断点，用于改善步行连续性；第三类界面是产业园内部可共享的展厅、会议室和测试场，用于降低创新协作门槛。[standard:MOHURD-URBAN-DESIGN-MEASURES]

概念用地完整覆盖 provisional boundary；建筑图层只表达“可逆式共享试验建筑基底”的设计示意，不代表现状建筑、权属、拆除或新建决定。[data:geometry/land_use.geojson#LU-001] [data:geometry/buildings.geojson#BLDG-001] [metric:building_footprint_area_sqm] 在缺少官方建筑普查与控规条件时，容积率、建筑高度、建筑密度、退线和总建筑规模保持 unknown，由专业团队在正式附件到位后校准。[standard:MOHURD-CONTROL-DETAILED-PLANNING] [depth:development_intensity_controls]

更新方式分为“开放、嵌入、改造、待核”四种：开放指延长现有公共空间和共享设施使用时段；嵌入指以可撤除组件增加服务；改造指在权属和结构条件确认后优化首层界面；待核指涉及道路、桥隧、文保、市政或产权的项目。该分类替代缺乏证据的逐栋拆改留结论，并把不可逆工程推迟到专业核查之后。[depth:retain_renovate_demolish]

## 重点区域详细设计

众智园定位“TRUST LAB｜可信验证站”。概念建议在花园型创新街区中组织模型安全评测、机器人封闭测试、端侧算力展示和标准治理工作坊，并以清河界面串联低碳休憩与产业展示。测试必须预约、分级、留痕并具备人工停止机制；河道、生态、防洪和五环交通条件待官方资料核验。[data:geometry/key_areas.geojson#PROV-KEY-001]

AI原点社区定位“OPEN COMMONS｜开放协作站”。围绕近校优势设置开源发布厅、成果转化街、知识产权与法务驿站、青年人才24小时学习客厅。公共空间不追求高强度建设，而强调校区、园区和街区之间的步行界面与可进入的一层；任何高校或园区改造均须征得权属主体同意。[data:geometry/key_areas.geojson#PROV-KEY-002]

大钟寺定位“CITY INTERFACE｜城市交互站”。以大钟寺站四象限的步行体验为研究对象，配置智能原生商业试场、国际路演厅、公众体验与媒体发布空间。站点连通、非机动车组织和公共空间更新均为概念建议，不代表批准的交通工程。[data:geometry/key_areas.geojson#PROV-KEY-003]

三站共同构成“验证—协作—交互”闭环：技术在众智园完成可信测试，在原点社区形成开源知识和创业团队，在大钟寺接受城市用户反馈，反馈再回到测试和迭代。三处临时面积只用于当前 intake 图面；正式重点区 polygon 到位后重新复算。[metric:key_area_count] [depth:three_key_area_detailed_design]

![三处重点区域原型](assets/figures/key-areas.png)

## AI 创新生态、人才画像与 AI+ 场景

六类核心人物是开源开发者、初创团队、高校师生、企业创新负责人、周边居民、老年人与无障碍使用者。每类都对应“到达—使用—判断—反馈—退出”的完整旅程。开发者需要可复现的测试条件，团队需要从原型到用户证据的通道，高校师生需要开放学习界面，企业负责人需要可信采用证据，居民需要知情与申诉，老年人与无障碍使用者必须始终拥有人工入口。[source:AGENT-TASKBOOK]

十二张场景卡把“场景—空间—数据—复核—指标—退出”绑定在一起：

| # | 场景 / 主要用户 | 空间与最小数据 | 人工复核与成功指标 | 退出条件 |
|---|---|---|---|---|
| 01 | 开源发布厅 / 开发者、学生 | 原点社区；仅记录主动公开的版本和贡献 | 社区维护者复核许可；指标为可复现项目数 | 许可不清或无法复现即下架 |
| 02 | 模型安全治理沙盒 / 研发团队 | 众智园隔离环境；测试集分级授权 | 独立评测人签署结果；指标为问题闭环率 | 高风险缺陷未关闭不得外放 |
| 03 | 机器人封闭测试 / 企业、运维人员 | 预约测试场；设备状态和匿名事件日志 | 现场安全员可急停；指标为人工接管响应 | 越界、失联或异常行为立即停测 |
| 04 | 端侧算力驿站 / 初创团队、社区服务者 | 限额算力；不上传非必要原始数据 | 运维者审计调用；指标为能耗与任务完成率 | 超预算、越权调用或无法追溯即停用 |
| 05 | 可退出慢行辅助 / 游客、居民 | 遗址公园；按需位置、不保存身份轨迹 | 人工服务点兜底；指标为迷失和求助闭环 | 定位误差持续超阈值时转人工导览 |
| 06 | 无障碍多模态导览 / 视障、听障使用者 | 三站路径；用户主动选择语音、文字或触觉 | 无障碍共测组复核；指标为独立完成率 | 任一关键节点不可用即停止宣称无障碍 |
| 07 | 清河低碳创新花园 / 园区员工、居民 | 众智园公共界面；环境数据匿名聚合 | 园林与公众共同复核；指标为舒适时段覆盖 | 传感失准或生态扰动时撤除设备 |
| 08 | 近校成果转化街 / 师生、创业团队 | 原点社区首层；仅展示获授权成果 | 法务与知识产权人员复核；指标为有效对接 | 权属争议或误导性宣传立即撤展 |
| 09 | 国际路演客厅 / 海内外团队 | 大钟寺共享空间；报名信息最小化 | 主持人和翻译复核；指标为后续复测合作 | 不形成公开问题或复测计划则不续办 |
| 10 | 社区 AI 公共服务台 / 居民、老年人 | 社区节点；不自动汇聚跨部门个人档案 | 人工窗口负责最终答复；指标为转人工闭环 | 不得自动决定福利资格或公共权利 |
| 11 | 开源贡献荣誉墙 / 贡献者、公众 | 公园节点；只记录主动授权的公开贡献 | 贡献者可更正与撤回；指标为授权完整率 | 授权撤回后按时删除展示 |
| 12 | 全球公共智能周 / 公众、机构 | 一线三站活动网络；匿名客流与公开议题 | 独立观察员发布年度账本；指标为问题复测率 | 不公开失败与改进记录则暂停下一届 |

其中 02、03、04 构成三类产业测试验证场。统一采用五道闸门：`G0 问题与责任登记`、`G1 离线/封闭验证`、`G2 限定人群共测`、`G3 限定公共试点`、`G4 复盘后扩大或退出`。每次过闸必须同时具备责任主体、数据清单、人工接管、事件记录和停止阈值；模型表现好但公共价值不足，也不能进入下一阶段。[data:geometry/public_space.geojson#PUBLIC-001] [depth:traffic_rail_slow_parking]

空间—运营映射为：众智园承载受控测试与标准共创，原点社区承载开源协作与人才服务，大钟寺承载用户体验与国际交流，遗址公园承载文化导览和低侵入公共服务，两翼承载企业服务和场景对接。场景节点需要在官方底图和权属条件到位后定位，当前只表达空间类型和相互关系，不声称具体点位已获批准。

## 用地、建筑规模与拆改留方案

用地代码遵循统一分类逻辑，形成四类概念分区：08.02开放研发与验证、14.01遗址公园与蓝绿公共界面、05共智服务与城市客厅、07.02人才生活与学习社区。[standard:MNR-LAND-USE-CLASSIFICATION-GUIDE] 每类分区既有产业功能，也配置公众可接近的首层或开放时段，避免把创新带做成封闭办公飞地。[data:geometry/land_use.geojson#LU-001] [depth:land_use_layout]

建筑策略不逐栋给出拆除结论，而建立证据门槛：具有历史、结构和持续使用价值的对象优先保留；适合开放首层与共享设施的对象建议微改造；新增可逆构件用于临时服务；只有在权属、结构、文保、消防和控规条件齐备后才讨论不可逆建设。当前 [data:geometry/buildings.geojson#BLDG-001] 是概念基底，不是测绘现状。[depth:height_massing_character]

风貌建议采用“清晰结构、克制科技、可读界面”。材料与灯光不模拟科幻场景，而通过可维护的导视、开放式展陈、可看见的治理说明和夜间分级照明表现AI文化。建筑总量、层数、高度、密度、容积率保持待确认；[metric:floor_area_ratio] 明确为 unknown，以避免 provisional geometry 产生伪精确开发指标。

## 交通、轨道、市政与公共服务设施

交通概念由一条南北绿色公共主线、若干东西缝合节点和三处轨道/重点区接口组成。南北线优先连续步行和骑行，东西节点聚焦校区、园区、社区与站点之间的界面，大钟寺四象限和五环跨越只提出问题与体验目标，不给出桥隧线位或工程可行性结论。[data:geometry/roads.geojson#ROAD-001] [depth:traffic_rail_slow_parking]

公共智能服务线与慢行系统并行，但坚持低侵入：导览以手机端、可见标识和按需触发设备为主，不默认采集人脸或连续位置；无障碍服务允许人工接管；活动人流只做匿名聚合与现场管理辅助。道路红线、交叉口渠化、停车数量和非机动车设施需交通专项进一步核查。

新型基础设施采用“分布、共享、可审计”原则。端侧算力驿站为公共服务和受控试验提供有限能力，数据分级授权并记录调用；能源、通信、排水、消防与算力负荷必须由专业单位核算。[data:geometry/constraints.geojson#CONSTRAINTS] [depth:municipal_new_infrastructure] 当前空约束图层表示官方工程约束资料缺失，并非场地没有约束。

![交通、蓝绿与公共智能复合网络](assets/figures/mobility-bluegreen.png)

## 蓝绿空间、公共空间与城市风貌

京张铁路遗址公园是全案的公共性骨架。方案不把公园变成设备展厅，而以“少设备、多解释、可停留”为原则：核心空间用于步行、骑行、休憩和文化叙事，AI服务嵌入可撤除节点；三站和东西缝合点提供较高强度活动。清河、小月河及绿地关系均待蓝线、防洪、生态和公园实施资料核实。[data:geometry/green_space.geojson#GREEN-001] [metric:green_ratio]

公共空间组件库包含共智桌、开放发布台、可移动评测舱、低刺激导视、贡献铭牌和人工服务按钮。每个组件必须显示服务目的、数据使用、责任主体和退出方式，使“可信AI”成为空间可见规则。[data:geometry/public_space.geojson#PUBLIC-001] [metric:public_space_ratio] [depth:blue_green_public_space]

文化叙事分三幕：铁路时代讲自主工程与连接；中关村时代讲知识、试验与创业；AI时代讲开源协作、公共价值与人机共治。三处“朝圣地标”分别为詹天佑工程精神时间门、开源贡献荣誉墙、公共智能验证灯塔。名称和形态均为原创方向，不使用未授权肖像或企业标识；涉及文保范围的空间必须服从正式保护要求。

## 国际传播与品牌识别

品牌主标识采用原创“双轨开环”：深蓝轨道代表百年工程理性，公共绿轨道代表人的选择权，验证橙节点代表进入城市前必须通过的测试闸门；两轨不闭合，表示公共智能永远保留质疑、修正和退出入口。中文主名“京张共智线”、英文主名“Jingzhang Commons”和协议短句 `PUBLIC · PROVABLE · CHOICE · HUMAN` 组成三级识别系统。导视只使用本方案自制图形和已声明字体，不调用企业 Logo 或铁路历史人物肖像。

对外叙事统一为：**From a railway built by ourselves to intelligence governed together.** 京张铁路代表自主建造现代基础设施，京张共智线则提出下一代基础设施必须可验证、可选择并由人共同治理。国际传播不把海淀描述为已建成的“全球第一”，而以开放测试协议、城市测试账本和跨城复测邀请全球伙伴参与。

> **English executive summary.** Jingzhang Commons transforms the Centennial Jing-Zhang corridor into a civic AI testbed rather than a technology showroom. Its six-step public-intelligence protocol — Test, Disclose, Choose, Review, Exit and Learn — connects three urban prototypes: Trust Lab at Zhongzhiyuan, Open Commons at the Beijing AI Origin Community, and City Interface at Dazhongsi. Every pilot must disclose its purpose, minimum data, human responsibility, appeal channel and exit threshold. The proposal is conceptual and uses provisional geometry pending official spatial data.

## 更新项目清单、实施政策与分期计划

实施不以一次性建设为起点，而采用“90 日证明规则、1 年证明原型、3 年证明网络”的闸门式路径。[data:geometry/phasing.geojson#PHASE-001] [depth:phasing_implementation]

| 阶段 | 概念任务 | 责任组合 | 必须交付的证据 | 进入下一阶段的门槛 |
|---|---|---|---|---|
| 0—90 日 | 共创公共智能协议；完成慢行与无障碍审计；搭建两处可撤除服务原型 | 维护者/专业团队牵头，社区、高校、企业参与 | 责任表、数据清单、事件模板、退出预案、公众测试记录 | 六问协议完整；无未关闭重大安全问题 |
| 3—12 个月 | 三站各运行一个受控试点；发布首版城市测试账本 | 场地主体负责许可，测试团队负责技术，独立观察者负责复核 | 三份试点报告、失败记录、无障碍共测、能耗与运维记录 | 公共价值、可维护性和申诉闭环同时达标 |
| 1—3 年 | 形成一线多点网络；开展跨区域复测和年度公共智能周 | 建议设立多方“京张共智理事会”，由公共、科研、产业和社区席位共同监督 | 开放场景目录、复测协议、年度账本、停止/扩大决定 | 只扩大可复现、可审计、可承担长期运维的项目 |

项目清单包括 JZ-01 共智线慢行体验审计、JZ-02 众智园可信验证花园、JZ-03 原点开源发布厅、JZ-04 大钟寺城市交互客厅、JZ-05 公共智能服务台网络、JZ-06 三代创新文化路线、JZ-07 全球公共智能周。资源按“人力组织、临时空间、设备与算力、数据治理、传播与维护”五类登记，不虚构投资额；涉及权属、控规、交通、市政、文保或消防的项目，在专业条件确认前只停留于研究和可逆原型。[depth:renewal_project_list]

运营责任采用 RACI 逻辑：场地主体对空间许可负责，测试团队对技术与事件响应负责，独立评测者对证据可信度负责，社区代表对公众影响提出复核意见，维护者负责公开版本和年度账本。重大安全事件、连续两期低使用、人工接管失效、数据越权或维护成本无法承担，均触发暂停或退出，而不是为了展示效果继续运行。

年度节奏形成“每周开放时段—每月场景复盘—每季公众评议—年度全球公共智能周”。开发者通过公开议题和贡献记录进入社区；企业通过受控测试、场景复盘和用户反馈转化；公众通过体验、反馈和申诉影响场景是否延续。评价采用十二项运营指标：问题闭环率、人工接管响应、退出执行率、无障碍独立完成率、公众知情率、申诉处理时长、测试复现率、跨主体协作数、开放成果数、单位任务能耗、设施可用率、年度复测率。当前不虚构基线；首轮试点负责建立基线，随后才由多方确认目标。

## 指标体系、面积复算与合规矩阵

当前 [metric:site_area_sqm]、[metric:green_ratio]、[metric:public_space_ratio]、[metric:building_footprint_area_sqm] 与 [metric:key_area_count] 均由提交 GeoJSON 复算；它们描述当前 provisional intake package，不是官方面积或法定指标。[metric:floor_area_ratio] 因缺少法定控规与建筑总量保持 unknown。[depth:metrics_recalculation]

绩效指标另设四类：公共可达性（步行连续、无障碍使用）、可信治理（场景说明、人工复核、申诉闭环）、创新转化（开源贡献、测试完成、团队协作）、城市活力（公共空间使用、跨主体活动）。这些指标需在运营后以聚合数据校准，当前不虚构基线和目标值。

`compliance_matrix.json` 覆盖公告1.3、1.4、1.5和agent.1-agent.6；`standard_matrix.json` 把判断映射至本地标准；`design_depth_matrix.json` 证明十五项成果深度；`self_check.json` 记录确定性、空间、可视化和专业证据复核。所有图面、HTML和PDF均从同一组结构化数据与方案逻辑生成。[source:SITE-PACKAGE]

![指标、证据与自检链](assets/figures/metrics-evidence.png)

## 风险、版权与合规说明

最高风险不是技术不足，而是把临时数据写成确定结论。当前 official boundary、重点区 polygon、控规、道路、地块、建筑、文保、市政和公共服务底数均需补充；因此所有空间落地建议均表述为概念建议、参考方案或可供专业团队深化研究。[depth:risk_missing_data] 正式资料到位后必须全量重算并重新自检。

数据风险通过最小采集、用途明示、分级授权、人工复核、申诉与退出降低；公平风险通过无障碍服务、人工通道和不以数字能力作为公共服务门槛降低；实施风险通过轻量试点、阶段评估和可逆组件降低。涉及公共安全、文保、河道、交通、消防和市政的内容必须由相应专业单位确认。

方案文字、图解、HTML和PDF由本次AI协作生成；底层任务与 provisional geometry 来自仓库登记资料。未使用商业地图瓦片、外部图片、远程字体、企业Logo或人物肖像。许可按 `COMMUNITY-DISPLAY-ONLY` 声明，具体知识产权与公开展示遵循征集规则和 `report/copyright_statement.md`。

## 参考资料

本方案主要引用 [source:OFFICIAL-ANNOUNCEMENT]、[source:AGENT-TASKBOOK]、[source:SITE-PACKAGE]、[source:SOURCE-REGISTRY]、[source:PROCESSED-FACT-PACK]、[source:BOUNDARY-SOURCE] 与 [source:KEY-AREA-SOURCE]。专业依据包括 [standard:PROJECT-OFFICIAL-ANNOUNCEMENT]、[standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]、[standard:MOHURD-URBAN-DESIGN-MEASURES]、[standard:MOHURD-CONTROL-DETAILED-PLANNING]、[standard:MNR-LAND-USE-CLASSIFICATION-GUIDE]；[standard:MOHURD-ARCH-DESIGN-DEPTH-2016] 仅作为待补项。

- `brief/public-brief.md`：公开任务背景、愿景、重点方向与评审维度。
- `brief/README.md`：公开资料使用边界。

## 案例与区域公开来源登记

- `brief/site-package/agent_taskbook.json`：三大定位、五大功能、六项任务与边界条款。
- Vector Institute 官方网站：https://vectorinstitute.ai/
- Mila Community of Practice：https://mila.quebec/en/industry/partnerships/mila-community-of-practice
- STATION F 官方网站：https://stationf.co/
- King’s Cross Knowledge Quarter 案例：https://www.kingscross.co.uk/press/2021/10/08/the-kings-cross-estate-celebrates-10-year-anniversary
- MIT InnovationHQ：https://tlo.mit.edu/resources/office-innovationhq
- Testbed Helsinki：https://testbed.hel.fi/en/
- 深圳市南山区政府 Model Camp 公开介绍：https://www.szns.gov.cn/english/news/features/content/post_11397283.html
- 北京未来科学城 AI 场景供需对接：https://kw.beijing.gov.cn/xwdt/kcyx/xwdtscyqld/202505/t20250526_4097658.html
- 怀柔科学城公开项目背景：https://www.beijing.gov.cn/ywdt/gqrd/202504/t20250430_4078937.html

原始入口分别位于 `brief/site-package/`、`data/source_registry.json`、`data/processed/agent_fact_pack.md` 与 `brief/site-package/geometry/provisional_boundaries.geojson`。任何二次摘要只作阅读导航，事实仍回到 source registry 中的原始 source id。官方附件发布后，应补充文件名、发布机构、日期、许可、哈希、坐标系与转换方法，再替换 provisional layers、复算 metrics、重做图纸与HTML，并运行完整自检。
