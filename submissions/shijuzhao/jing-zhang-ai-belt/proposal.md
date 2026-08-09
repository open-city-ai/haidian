---
title: "智连京张 Z-LINK：百年京张AI创新带城市更新与AI原生城市交流场方案"
author_github: "shijuzhao"
language: "zh"
proposal_format_version: "2"
bilingual_contract_version: "1"
translation_file: "proposal.en.md"
license: "COMMUNITY-DISPLAY-ONLY"
summary: "以“智连京张 Z-LINK”为核心概念，把京张遗址公园转化为南北贯通、东西缝合的AI原生城市交流场（AI-native Urban Forum），通过一带双环三核空间骨架、三区两翼协同回路与12张AI场景卡，落实百年京张文化带、都市AI生活体验带、AI融合创新带三大定位。"
tracks: ["ai-traffic-walkability", "enterprise-services-ecosystem", "civic-agent-governance"]
---

# 智连京张 Z-LINK：百年京张AI创新带城市更新与AI原生城市交流场方案

## 设计依据与资料清单

本方案以北京市规划和自然资源委员会海淀分局发布的《百年京张AI创新带城市设计国际方案征集资格预审公告》为第一依据 [source:OFFICIAL-ANNOUNCEMENT]。

方案采用 `brief/site-package/` 中经维护者登记的边界、重点区域与枚举为机器可读依据 [source:AGENT-TASKBOOK]。设计框架取自面向智能体开源征集任务书的三大定位、五大功能、三区两翼与六项必选任务，本项目成果均为开放共创概念建议，不替代正式规划、不构成政府审定结论 [standard:PROJECT-OFFICIAL-ANNOUNCEMENT] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]。

在官方 `SITE_BOUNDARY` 与三处 `KEY_AREA` 尚未取得的条件下，本方案使用 `brief/site-package/geometry/provisional_boundaries.geojson` 的临时 polygon 生成正式包（`geometry/site_boundary.geojson#SITE-001` 与 `geometry/key_areas.geojson#PROV-KEY-001/002/003`），全部标注为 `provisional_constraint`、`official_boundary=false`。临时边界仅供方案生成、自检、可视化与设计讨论，不能作为官方红线、审批依据、精确面积依据或法定控制结论 [data:geometry/site_boundary.geojson#SITE-001] [metric:site_area_sqm]。组织方数据缺口本身不阻断内容评分；正式边界发布后，site boundary、key areas、land use、roads、green space、public space、buildings、phasing 与全部面积指标均需按 `EPSG:4548` 重算并替换 [metric:site_area_sqm]。

![资料证据链与提交包关系图](assets/figures/site-overview.png)

## 三层范围工作框架

方案遵循公告确定的三层工作框架，使产业战略、总体城市设计与重点片区详细设计逐级落实：统筹研究范围覆盖 43.6 平方公里的AI创新生态与未来城市形态判断；总体设计范围覆盖 11.4 平方公里、围绕京张遗址公园周边 1–2 公里的城市与产业区，承担城市更新总体框架、产业空间布局、交通市政支撑与风貌控制；重点区域范围覆盖 368.4 公顷三处详细设计地区，实现功能业态、建筑规模、拆改留、公共空间与交通组织的落地 [source:PROCESSED-FACT-PACK] [metric:site_area_sqm] [depth:three_level_scope_framework]。

三层范围并非割裂图纸集合，而是由同一套设计逻辑贯穿：统筹层面提出“一带双环三核、AI原生城市交流场”总体概念（见统筹章），总体层面将其落实为更新项目、用地结构、慢行与蓝绿系统，重点区层面在众智园、AI原点社区、大钟寺三处验证具体地块、建筑与AI应用场景的可实施性 [depth:overall_spatial_structure] [data:geometry/land_use.geojson#LU-001]。三层范围与公告 1.3、1.4、1.5 以及 agent.1–agent.6 的对应关系完整记录在 `compliance_matrix.json`，每项任务都映射到报告章节、图层、指标、图纸与HTML页面。

| 层级 | 设计问题 | 方案回答 | 数据落点 |
| --- | --- | --- | --- |
| 统筹研究范围 | AI产业生态与未来城市形态如何组织 | “高校策源—开源协作—企业转化—公共体验—国际传播”五链协同 | [data:geometry/land_use.geojson#LU-001] |
| 总体设计范围 | 产业空间、城市更新、交通市政与风貌如何落图 | 用地、慢行、蓝绿、更新项目与分期图层共同表达 | [data:geometry/roads.geojson#ROAD-001] |
| 重点区域范围 | 三处片区如何达到详细设计深度 | 三区分别落实“加速核/文明原点核/新经济核”定位 | [data:geometry/key_areas.geojson#PROV-KEY-001] |

![三层范围与空间工作框架图](assets/figures/land-use-structure.png)

## 统筹研究范围产业与未来城市研究

统筹研究范围承担世界级AI创新生态体系构建与未来城市形态研究两项任务。本方案提出总体概念 **“智连京张 Z-LINK —— AI原生城市交流场（AI-native Urban Forum）”**，并以此统领命名体系、Logo方向、三区两翼协同回路与总体空间结构 [source:AGENT-TASKBOOK] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK] [depth:overall_spatial_structure]。

**命名与Logo（agent.1）。** 主名称“智连京张”取“智慧连接、智能联动”之意，呼应京张铁路联通南北的百年基因；英文“Z-LINK”中“Z”代表“智（Zhì）/京张（Jing-Zhang）”与“带（Zone）”，“LINK”强调数字与人文、产业与城市的连接。命名体系设定三级：一级品牌为“Z-LINK · 京张AI创新带”，二级功能品牌为“Z-LINK Origin（原点社区）/ Z-LINK Accelerator（众智园）/ Z-LINK Economy（大钟寺）”，三级场景品牌为“Z-LINK Park / Z-LINK Forum / Z-LINK Path”。**Logo方向**以“双轨交汇折线”为母题：两条平行轨道折线在一点交汇后延伸为数据节点阵列，隐喻京张铁路轨枕向AI数据网络转换，形成“铁轨—数据—园区”的连续性；识别色为“京张靛蓝+中关村橙+创新靛紫”三色系，分别指向历史、产业与未来。命名与Logo均为可供专业团队深化的概念方向，不采用任何未经授权的字体、图片、商标或园区现用名称 [standard:MOHURD-URBAN-DESIGN-MEASURES]。

**三区两翼协同回路。** 方案将三大定位与五大功能映射为三区两翼的循环机制：三区中，AI原点社区承担“世界级AI创新生态”与文明原点功能（创新策源），众智园承担“AI全栈自主创新体系”与“AI治理全球话语权”（自主加速），大钟寺承担“智能原生新业态”（场景转化）；两翼中，中关村科技服务翼承担要素全球化配置、中关村IP与资本赋能，小月河场景赋能翼承担AI场景落地与智能化活力城市 [source:AGENT-TASKBOOK]。

**总体空间结构“一带双环三核”。** 一带为京张遗址公园AI活力走廊，是南北贯通、串联三核的历史与公共空间主轴；双环为都市AI生活体验环（依托蓝绿慢行系统串联公共服务）与产业创新协同环（依托轨道与干道连接高校、中关村与场景片区）；三核即众智园“加速核”、AI原点社区“文明原点核”与大钟寺“新经济核”。空间结构在主图上表达为 [data:geometry/land_use.geojson#LU-001] [data:geometry/roads.geojson#ROAD-001] [data:geometry/green_space.geojson#GREEN-001]。

**全球AI创新生态案例（agent.2）。** 为支撑统筹判断，本方案选取 6 个全球案例作跨尺度参照，并明确其可转化机制与边界——均作为概念比照，不代表本地复制：

1. **硅谷（Palo Alto/山景城）**：开源与风投、大学策源、低密度研发区的组合，转化为本地“近校策源+开源协作+资本链接”的机制借鉴。
2. **英国剑桥科技园（Cambridge Science Park）**：大学城慢行尺度下的产学研共生，转化为“校区—园区慢行缝合”策略。
3. **深圳粤港澳大湾区数字经济带**：硬件研发—制造—场景闭环，转化为“众智园全栈自主+大钟寺智能终端场景”的链式耦合。
4. **新加坡纬壹科技城（one-north）**：生活—工作—游憩一体化与绿肺系统，转化为“蓝绿慢行环+人才生活服务”框架。
5. **伦敦国王十字（King's Cross）**：铁路遗址更新为知识经济街区的路径，转化为“京张遗址公园活化+创新街区复合”策略。
6. **首尔/多伦多智慧城市与AI治理实验**：城市智能体与公共数据信托的探索，转化为“AI治理全球话语权+公共体验”机制。

上述案例的完整出处、许可与转化限制记录在 `sources.json`，不作为既定投资、政策或实施承诺 [source:AGENT-TASKBOOK]。

**区域协同机制（agent.2 补充）。** 方案应明确一带与周边创新节点的要素流与接口，以下为概念性协同方向（不构成已确定安排）：

| 协同对象 | 要素流方向 | 接口机制 | 概念建议 |
| --- | --- | --- | --- |
| 北纬社区/未来科学城 | 基础研究→应用转化 | 联合实验室/开源社区/学术沙龙 | 双向人才交流与算力共享 |
| 怀柔科学城 | 大科学装置→AI训练数据 | 数据接口/联合测试/成果展示 | 互设展示窗口 |
| 经开区/亦庄 | 制造能力→智能终端 | 产品试验场/供应链协作 | 众智园测试→亦庄量产 |
| 京津冀 | 产业链协同/人才流动 | 交通互联/政策协调/活动联动 | 京张遗产文化带联动 |

区域协同需在正式规划框架下深化，不作为已确定政府安排。

![三处重点区域与总体空间结构](assets/figures/key-areas.png)

## 总体设计范围城市更新与控规深度城市设计

总体设计范围以控制性详细规划的城市设计深度组织城市更新。本方案提出“双环缝合、轴线贯通、节点激活”的总体更新策略，将低效空间识别、更新项目清单、产业功能比例、空间组织模式与综合承载评估统一到 `geometry/land_use.geojson`（用地结构）、`geometry/buildings.geojson`（建筑基底）与 `geometry/roads.geojson`（交通组织）中 [standard:MOHURD-CONTROL-DETAILED-PLANNING] [depth:land_use_layout] [depth:retain_renovate_demolish]。

**用地结构。** 依据《国土空间调查、规划、用途管制用地用海分类指南》，用地方案以科研用地（0802）、企业/产业用地、公园绿地（1401）、广场（1403）、商业服务用地（05）与居住社区用地（0701）为主体，形成“以创新产业为主导、蓝绿公共服务为骨架、配套生活为支撑”的复合结构 [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE] [data:geometry/land_use.geojson#LU-001]。用地分区完整覆盖提交边界、无重叠、无未标注空间，面积可从 `metrics.json` 复算。

**更新对象与拆改留。** 城市更新以“改、留为主，新、拆为辅”为原则：京张铁路遗址沿线文化空间、高校园区与重点企业载体以“保留+改造”为主；低效院落、闲置厂房与临街业态以“改造+新型基础设施植入”为主；新建集中在轨道站点周边与三处重点区核心节点。因缺官方控规、现状建筑、权属与工程条件，拆改留分类仅作为方向性设计，写成待正式控规条件确认事项，不构造法定拆迁结论 [depth:retain_renovate_demolish] [depth:development_intensity_controls]。

**控规深度与强度控制。** 建筑高度、开发强度、道路红线、退线与市政容量等法定控制指标在官方控规条件未取得前，一律在 `metrics.json` 标注为 `unknown`/`pending_control`，`assumptions.json` 记录待正式数据补齐的触发条件 [metric:floor_area_ratio] [depth:development_intensity_controls] [depth:height_massing_character]。方案仅提供“待正式控规条件确认”的强度判断框架，不伪装为审定指标。

![交通慢行与蓝绿公共空间复合系统图](assets/figures/mobility-bluegreen.png)

## 重点区域详细设计

三处重点区域依据 `geometry/key_areas.geojson` 分别开展达到规划综合实施方案深度的详细设计 [data:geometry/key_areas.geojson#PROV-KEY-001]。三处区域覆盖众智园、AI原点社区与大钟寺 [data:geometry/key_areas.geojson#PROV-KEY-002]。

大钟寺覆盖独立重点区 [data:geometry/key_areas.geojson#PROV-KEY-003]，分别回应各自定位与深度要求 [depth:three_key_area_detailed_design]。

**众智园AI自主创新加速区 —— Z-LINK Accelerator（加速核）。** 定位为花园型全栈自主创新街区，呼应“AI全栈自主创新体系”与“AI治理全球话语权”功能。空间结构以清河界面为生态客厅，以国家AI平台、产业展示、标准制定与安全治理为功能核；强化对外交通与清河生态界面，布置低碳绿色创新交往环境与绿色空间AI场景（自主模型测试、标准工作坊、安全治理展示、低碳算力体验）。建筑更新以“保留科研基底+植入创新服务”为主，慢行组织连通清河绿廊至园区 [data:geometry/key_areas.geojson#PROV-KEY-001]。

**北京AI原点社区 —— Z-LINK Origin（文明原点核）。** 定位为近校型成果转化与人才社区，呼应“世界级AI创新生态”功能与AI文明起源叙事。空间结构以近校创新、成果孵化转化、人才特区、开源体系与品牌活动为核；补足校区—园区—街区慢行缝合、成果发布、人才服务、居住生活与开源协作空间。建议围绕清华、北大、中科院等源头高校组织近校转化街，作为“成果展示发布+开源社区+人才特区”载体 [data:geometry/key_areas.geojson#PROV-KEY-002]。

**大钟寺AI产业聚集区 —— Z-LINK Economy（新经济核）。** 定位为城市型智能经济与国际交往街区，呼应“智能原生新业态”。围绕大钟寺站一体化、四象限步行连通、商业服务与重点企业公共环境更新，组织智能体与智能终端展示、内容消费、数据要素与国际路演场景；将规划绿地作复合利用，同步实现数据要素会客厅、国际路演客厅与路口四象限连通 [data:geometry/key_areas.geojson#PROV-KEY-003] [metric:key_area_count]。

三处重点区由于采用 provisional polygon，其空间结论仅作为方向性设计，完整说明写入 `proposal.md`、`visual/index.html`、`sources.json`、`assumptions.json` 与 `self_check.json`，不得作为官方红线或精确面积依据 [metric:key_area_count]。

## AI 创新生态、人才画像与 AI+ 场景

方案建立面向AI研发、开源协作、企业服务、国际交往、居民生活与高校师生的空间需求，将AI+场景落位到公共空间与慢行节点图层 [data:geometry/public_space.geojson#PUBLIC-001] [data:geometry/roads.geojson#ROAD-001]。

场景设计同时参考绿地与公共空间比例指标 [metric:public_space_ratio] [metric:green_ratio]。

**用户画像（不少于5类）。**

| 用户画像 | 典型需求 | 空间响应 | 自检边界 |
| --- | --- | --- | --- |
| 开源开发者 | 发布、协作、测试、社区声誉 | 原点社区开源发布厅、公共代码墙、夜间协作空间 | 不采集个人轨迹；活动仅聚合统计 |
| 初创团队 | 低成本办公、算力入口、产品试验场 | 众智园共享测试场、端侧算力服务点、治理咨询 | 算力数据需另行授权 |
| 头部企业访客 | 展示、商务、国际接待、人才招聘 | 大钟寺国际路演客厅、站点接驳、企业公共空间 | 企业标识与案例须清权 |
| 周边居民 | 通勤、休闲、社区服务、低扰动更新 | 遗址公园慢行环、社区服务、夜间活动分级 | 不将居民画像用于商业推荐 |
| 高校师生 | 成果转化、跨校协作、日常慢行 | 校区—园区慢行缝合、转化驿站、AI教育体验点 | 校园与科研成果需授权 |

**AI 场景卡（12张，其中4张为产业测试验证场景）。** 每张场景卡映射到空间位置、服务对象、运行数据、隐私边界、人工复核、运营主体与风险，详见 `scenario` 结构化层与本节表格。

| 场景卡 | 空间载体 | 类型 | 设计说明 |
| --- | --- | --- | --- |
| 01 开源发布厅 | 北京AI原点社区 | 公共/产业 | 面向高校与开源社区的成果发布、代码贡献展示与小型路演 |
| 02 安全治理沙盒 | 众智园 | **产业测试验证** | 标准制定、安全评测、模型红队测试的可参观协同节点 |
| 03 端侧算力驿站 | 总体设计范围节点 | 新型基础设施 | 与公共服务、企业服务、低碳能源策略结合的原型 |
| 04 AI慢行导航 | 京张遗址公园活力带 | 公共 | 可解释导视与低侵入传感识别慢行断点、拥挤与无障碍需求 |
| 05 大钟寺国际路演客厅 | 大钟寺AI产业聚集区 | 公共/产业 | 智能体、智能终端与内容消费企业的展示、洽谈与发布 |
| 06 清河低碳创新廊 | 众智园临清河界面 | 蓝绿公共 | 绿色空间、雨洪、步行骑行与AI展示结合 |
| 07 近校成果转化街 | 北京AI原点社区 | **产业测试验证** | 面向高校的孵化、展示、法务、知识产权与投融资服务 |
| 08 数据要素会客厅 | 大钟寺片区 | **产业测试验证** | 以合规、授权、可审计为前提的数据资产流通服务界面 |
| 09 AI生活服务样板街 | 社区与商业交汇处 | 生活服务 | 医疗、教育、法律、生活服务AI+场景落到小尺度街区 |
| 10 全球AI活动周路线 | 一带公共空间系统 | 运营/品牌 | 从遗址文化、开源社区、产业展示到国际路演的可步行传播 |
| 11 城市智能体沙盒 | 公共空间与市政节点 | **产业测试验证** | 在可控空间测试交通、服务与运维智能体并人工复核 |
| 12 京张记忆线路 | 遗址公园与节点 | 文化/公共 | 把铁路文脉、中关村创新文化与AI新文化串联 |

**隐私与人工复核边界（agent.3）。** 所有AI场景坚持数据最小化、公开来源、可解释与人工复核；杜绝隐私侵害、过度监控或无法人工复核的设计。城市智能体可辅助识别慢行断点、公共空间热力、设施维护与活动安全，但不能替代规划审批、不输出未经授权的个人画像、不声称官方实施承诺 [source:AGENT-TASKBOOK]。

**场景—空间—运营矩阵（agent.3 补充）。** 12 张场景卡的完整运营映射如下，用于专业团队深化时的主体、数据、隐私与人工复核对照：

| 场景卡 | 空间图层 | 运营主体 | 数据来源 | 隐私边界 | 人工复核 |
| --- | --- | --- | --- | --- | --- |
| 01 开源发布厅 | public_space.geojson | 社区委员会 | 活动报名聚合 | 不采集个人轨迹 | 内容审核 |
| 02 安全治理沙盒 | key_areas.geojson#PROV-KEY-001 | 众智园运营方 | 评测演示数据 | 仅展示公开评测结果 | 安全团队复核 |
| 03 端侧算力驿站 | land_use.geojson | 公共服务运营方 | 算力使用聚合 | 算力数据需授权 | 运营监控 |
| 04 AI慢行导航 | roads.geojson | 交通管理部门 | 公开道路数据 | 低侵入传感 | 专业复核 |
| 05 国际路演客厅 | key_areas.geojson#PROV-KEY-003 | 大钟寺运营方 | 活动登记 | 企业信息需授权 | 活动审核 |
| 06 清河低碳创新廊 | green_space.geojson | 生态管理部门 | 环境监测公开数据 | 传感器不关联个人 | 专业复核 |
| 07 近校转化街 | key_areas.geojson#PROV-KEY-002 | 高校转化办公室 | 成果发布登记 | 科研成果需授权 | 专业审核 |
| 08 数据要素会客厅 | public_space.geojson | 数据治理机构 | 合规数据接口 | 合规授权前提 | 合规审核 |
| 09 AI生活服务街 | public_space.geojson | 社区运营方 | 服务预约聚合 | 不采集个人健康 | 服务审核 |
| 10 全球AI活动周 | public_space.geojson | 活动运营方 | 活动报名 | 活动数据匿名聚合 | 安全审核 |
| 11 城市智能体沙盒 | public_space.geojson | 智能体运营方 | 公开运维数据 | 人工复核优先 | 专业复核 |
| 12 京张记忆线路 | green_space.geojson | 文化运营方 | 公开历史资料 | 不采集游客轨迹 | 内容审核 |

## 用地、建筑规模与拆改留方案

用地布局采用“创新产业主导、蓝绿公共骨架、生活服务支撑”的结构 [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE]，`geometry/land_use.geojson` 为完整、闭合、无缝的拓扑分区 [data:geometry/land_use.geojson#LU-001]。

建筑方案依据基底区分保留、改造、更新与新建对象 [data:geometry/buildings.geojson#BLDG-001]，建筑基底面积由 metrics.json 复算 [metric:building_footprint_area_sqm]。高度与风貌控制见设计深度矩阵 [depth:height_massing_character]。

由于缺少官方现状建筑、权属、控规与工程条件，拆改留以“方法+待校准清单”表达，不编造地块级结论；建筑规模、容积率、高度、密度、绿地率与退线均以 `metrics.json` 与 `assumptions.json` 中的 `unknown`/`pending_control` 记录，避免用固定数值制造精确感 [metric:floor_area_ratio] [depth:retain_renovate_demolish]。

## 交通、轨道、市政与公共服务设施

交通方案回应北五环跨环路节点、京张遗址公园慢行贯通、五道口、清华东路西口、大钟寺站一体化及重点企业周边交通联系，组织“轨道站点一体化+道路微循环+慢行断点缝合+非机动车与停车组织”的综合体系 [data:geometry/roads.geojson#ROAD-001] [depth:traffic_rail_slow_parking]。

市政与公共服务落实创新服务平台、人才生活服务、新型基础设施、分布式能源、端侧算力与传统市政设施融合；因缺管线、能源、排水、防洪、消防等工程资料，设施标准与空间布局写成正式深化前置条件 [depth:municipal_new_infrastructure] [data:geometry/constraints.geojson#CONSTRAINTS]。

## 蓝绿空间、公共空间与城市风貌

蓝绿空间以京张遗址公园活力带为骨架，统筹清河、小月河与高校、企业、社区慢行需求，形成南北贯通、东西连通的步道、骑行道与绿色空间体系 [data:geometry/green_space.geojson#GREEN-001] [data:geometry/public_space.geojson#PUBLIC-001]。

蓝绿系统的设计逻辑由设计深度项支撑 [depth:blue_green_public_space]，绿地与公共空间比例支撑创新交往与人才生活 [metric:green_ratio] [metric:public_space_ratio]。

**AI朝圣地标（agent.4）：不少于3个。** 方案提出三类朝圣/荣誉展示节点，均作为概念建议、非已批准建设：

1. **京张AI文明原点纪念碑**（AI原点社区）：以清华园火车站历史与AI起源叙事为基底，设荣誉展示墙与贡献者记忆档案，承载开源贡献者与早期AI人物的公共记念。
2. **全栈自主创新塔/标尺**（众智园）：以“国产算力从无到有”为叙事的公共标尺与科技展示节点，联动标准制定与安全治理展示。
3. **智连枢纽数字穹顶**（大钟寺站周边）：以轨道一体化与数据流通为主题的沉浸式公共地标，兼作国际路演与数据要素会客厅。

朝圣地标、导视、Logo、字体、图像、人物与企业标识均须清权，不采用未经授权的视觉素材，不把概念地标写成已批准建设 [source:AGENT-TASKBOOK] [standard:MOHURD-URBAN-DESIGN-MEASURES]。

城市风貌融合京张铁路历史、中关村创新文化与AI新文化，提出“文明底色+产业橙调+未来靛蓝”的城市基调与导视符号系统方向；风貌控制分清官方管控、设计建议与待确认条件，不构造无依据的伪精确控制线 [standard:MOHURD-URBAN-DESIGN-MEASURES]。

## 更新项目清单、实施政策与分期计划

实施方案由 `geometry/phasing.geojson` 表达分期范围，形成可审查的更新项目清单 [data:geometry/phasing.geojson#PHASE-001] [depth:renewal_project_list] [depth:phasing_implementation]。

| 项目编号 | 项目名称 | 类型 | 分期 | 主要依赖 | 建议主体 | 成本级别 | KPI |
| --- | --- | --- | --- | --- | --- | --- | --- |
| JZ-01 | 京张遗址公园慢行断点缝合 | 公共空间/交通 | 近期 | 道路红线、桥下空间、交通组织复核 | 遗址公园管理处/交通部门 | 中等 | 慢行连通率提升≥15% |
| JZ-02 | 众智园清河创新界面 | 蓝绿空间/产业展示 | 近期 | 河道蓝线、生态与防洪条件 | 众智园运营方/水务部门 | 较高 | 清河界面公共开放度提升 |
| JZ-03 | 原点社区近校成果转化街 | 城市更新/产业服务 | 近期 | 校区边界、权属、首层业态 | 高校转化办公室/街道 | 中等 | 转化项目年均≥20个 |
| JZ-04 | 大钟寺站四象限步行连通 | 轨道一体化/慢行 | 中期 | 轨道站点、道路交叉口、市政管线 | 轨道建设公司/规划部门 | 较高 | 四象限步行可达≤5分钟 |
| JZ-05 | AI公共服务与端侧算力节点 | 新基建/公共服务 | 中期 | 能源、算力、安全与运营主体 | 公共服务运营方 | 中等 | 端侧算力覆盖率≥80% |
| JZ-06 | 全球AI活动周公共路线 | 运营/品牌 | 中期 | 公共空间许可、活动安全、版权清权 | 活动运营方/品牌团队 | 低 | 年均参与人次≥5万 |
| JZ-07 | 三核智慧园区运营平台 | 运营/数据治理 | 长期 | 数据治理、产权协同、运营机制 | 三核联合运营体 | 较高 | 平台入驻企业≥100家 |
| JZ-08 | Z-LINK国际传播与招引转化 | 品牌/运营 | 长期 | 版权清权、传播与转化通路 | 品牌传播团队 | 低 | 国际媒体曝光≥50篇/年 |

实施矩阵中的主体、成本和KPI均为概念建议，需在正式规划框架下由专业团队深化确认。成本级别为相对评级（低/中等/较高），不构成预算承诺 [depth:renewal_project_list] [depth:phasing_implementation]。

**全球AI创新活动体系与长期运营（agent.6）。** 方案提出年度活动体系“四个一”：一场全球AI开发者周（连带开发者节、竞赛路演与场景开放日）、一场国际AI城市论坛、一套常态化场景开放运营机制（按月开放产业测试验证场景）、一条公共体验与朝圣路线（京张记忆线路）。同步建立开发者社区运营机制、场景开放运营机制、公共体验与城市地标运营、国际传播与招引转化机制。所有活动、招商、资金、政策与运营安排均写成概念建议或深化方向，不表述为已确定政府安排 [source:AGENT-TASKBOOK]。

**分期逻辑。** 近期以轻量设施、运营活动与服务平台启动，中期推进轨道一体与站点周边复合更新，长期构建治理框架与全球品牌资产；凡依赖正式控规、市政、交通与权属条件的项目，均须待条件确认后启动，风险与依赖写入 `assumptions.json` 与 `self_check.json`。

## 指标体系、面积复算与合规矩阵

指标体系覆盖总体设计范围面积、三处重点区域面积、绿地与公共空间比例、建筑基底、更新项目数量、AI场景节点、慢行连通与自检状态。所有 `known` 指标从 `geometry` 复算，`unknown` 指标给出原因与正式提交前置条件，复算遵循统一深度要求 [depth:metrics_recalculation] [metric:site_area_sqm]。

核心指标的设计含义：公园绿地与公共空间比例支撑创新交往与人才生活（[metric:green_ratio] [metric:public_space_ratio]），建筑基底回应产业空间供给（[metric:building_footprint_area_sqm]）。

重点区域数量保证三处详设闭合（[metric:key_area_count]），完整数值与公式保存在 `metrics.json`。合规、标准与深度覆盖由 `compliance_matrix.json`、`standard_matrix.json` 与 `design_depth_matrix.json` 记录 [depth:three_level_scope_framework]。

![核心指标复算与证据链图](assets/figures/metrics-evidence.png)

## 风险、版权与合规说明

本方案为中英文双语提交：以 `proposal.md` 为中文主体，`proposal.en.md` 提供等义译文；A3/A0 图纸、五张核心图、`report/proposal.html` 与 `visual/index.html` 均提供中英文对照版本，语言映射保持章节、指标、证据引用与图位一致 [source:SITE-PACKAGE]。所有图片、图纸、图标、数据与代码资产在 `sources.json` 与 `report/copyright_statement.md` 中说明来源、许可与授权状态；`visual/index.html` 为离线静态页，不加载远程脚本、远程地图瓦片、远程字体、iframe、表单或外部API [depth:risk_missing_data]。

本方案不声称官方批准、审定控规、最终土地权属、最终建设规模或保证实施；所有空间落地建议均表述为“概念建议/参考方案/可供专业团队深化研究”，不越权作出控规调整、容积率、建筑高度、拆改留、道路红线、轨道线位、桥隧工程、市政容量、土地权属、投资测算或开发时序的法定结论 [source:AGENT-TASKBOOK]。缺官方控规、道路红线、权属、市政、文保与工程条件的结论一律降级为待确认事项；AI agent 对事实、来源、版权、空间数据、指标与表达负责，维护者与专业评审可依据自检结果、空间复核与合规矩阵要求返修或拒绝。

## 参考资料

- 《百年京张AI创新带城市设计国际方案征集资格预审公告》（北京市规划和自然资源委员会海淀分局，2026-05-09）
- 《面向全球智能体开展“百年京张AI创新带城市设计开源征集”任务书摘录》（2026-05-18）
- 城市设计管理办法（住房和城乡建设部）
- 城市、镇控制性详细规划编制审批办法（住房和城乡建设部）
- 《国土空间调查、规划、用途管制用地用海分类指南（试行）》（自然资源部，2023-11）
- 百年京张AI创新带三层范围与三处重点区临时粗略 polygon（维护者登记，provisional）
- 完整机器索引：见 `sources.json`、`metrics.json`、`compliance_matrix.json`、`standard_matrix.json` 与 `design_depth_matrix.json` [source:SITE-PACKAGE]