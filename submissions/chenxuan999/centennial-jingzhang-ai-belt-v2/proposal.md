---
title: "百年京张AI创新带城市设计：京张·人字带 RenLine 方案"
author_github: "chenxuan999"
language: "zh"
proposal_format_version: "2"
bilingual_contract_version: "1"
translation_file: "proposal.en.md"
license: "COMMUNITY-DISPLAY-ONLY"
summary: "以京张铁路青龙桥人字形展线为超级符号，提出『京张·人字带 Jing-Zhang RenLine Belt』：一撇一捺一轨、三点两翼一原点。从自主造路到自主造AI，构建世界级AI创新带的空间、产业、场景与运营一体化方案。"
tracks: ["jingzhang-heritage-narrative", "ai-origin-community", "enterprise-services-ecosystem"]
scenarios: ["ai-traffic-walkability", "ai-cultural-guide", "enterprise-service-copilot"]
iteration: "v2.0"
---

# 百年京张AI创新带城市设计：京张·人字带 RenLine 方案

## 设计依据与资料清单

本方案以《百年京张AI创新带城市设计国际方案征集资格预审公告》为第一依据，公告明确了三层范围（统筹研究范围约43.6 km²、总体设计范围约11.4 km²、重点区域范围约368.4公顷）、三处重点区域（公告约值：众智园AI自主创新加速区约192.1公顷、北京AI原点社区约104.3公顷、大钟寺AI产业集聚区约72.0公顷；本方案 provisional 几何复算值分别为 192.9202、104.3237、72.0454 公顷，见 metrics.json）与全部设计任务 [source:SRC-2026-BJ-GH-QUAL-PREANNOUNCEMENT]。面向智能体开源征集任务书补充了三大定位、五大功能、三区两翼、六项任务（agent.1–agent.6）与十条共创原则 [source:SRC-2026-0518-AGENT-OPEN-CALL-TASKBOOK]。

截至检索日（2026-08-10），官方精确 polygon 与控规条件未在公开渠道发布，本方案依照仓库维护者核定的临时粗略边界（PROV-SITE-001、PROV-RESEARCH-001、PROV-KEY-001/002/003）进行生成与展示，并在全链路标注 `provisional_constraint`、`official_boundary=false` [source:SRC-PROVISIONAL-BOUNDARIES-2026]。官方边界发布后，site boundary、key areas、land use、roads、green space、public space、buildings、phasing 与全部指标必须整体重算，不能只替换单个文件 [depth:existing_conditions_diagnosis]。

产业背景依据海淀区"1+X+1"现代化产业体系布局与市科委"三区两翼"世界级AI集聚地表述 [source:SRC-2026-HAIDIAN-1X1] [source:SRC-2026-BJ-KW-THREE-AREAS-WINGS]。用地分类采用自然资源部《国土空间调查、规划、用途管制用地用海分类指南》，城市设计深度依据住建部《城市设计管理办法》与《城市、镇控制性详细规划编制审批办法》组织 [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE] [standard:MOHURD-URBAN-DESIGN-MEASURES] [standard:MOHURD-CONTROL-DETAILED-PLANNING]。

资料边界说明：本方案不把任何背景性或临时性资料升级为官方红线、法定控规、正式评分证据或实施承诺；所有空间落地建议均表述为"概念建议""参考方案"或"供专业团队深化研究" [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK] [standard:PROJECT-OFFICIAL-ANNOUNCEMENT]。完整来源、指标、标准、设计深度与任务覆盖分别保存在 `sources.json`、`metrics.json`、`standard_matrix.json`、`design_depth_matrix.json` 与 `compliance_matrix.json`，正文不重复机器索引。

![资料证据链与提交包关系图](assets/figures/site-overview.png)

## 三层范围工作框架

本方案按公告要求建立三层范围工作框架：**统筹研究范围**回答"为什么在这里、往哪个方向走"，聚焦产业战略、未来城市形态与区域协同；**总体设计范围**回答"空间怎么组织、更新怎么做"，达到控制性详细规划的城市设计深度；**重点区域范围**回答"三个片区怎么落地"，达到规划综合实施方案方向的城市设计深度 [source:SRC-2026-BJ-GH-QUAL-PREANNOUNCEMENT]。

| 层级 | 官方约面积 | 本方案工作内容 | 主要图层 |
|---|---|---|---|
| 统筹研究范围 | 43.6 km² | 三区两翼协同回路、未来城市形态、命名与Logo、生态案例 | site_boundary、constraints |
| 总体设计范围 | 11.4 km² | 城市更新总体框架、用地布局、交通市政、京张带活力带、风貌 | land_use、buildings、roads、green_space、public_space、phasing |
| 重点区域范围 | 368.4公顷 | 三处片区精细化设计（定位+结构+建筑+交通+公共空间+场景+风险） | key_areas、land_use、buildings |

三层范围通过"产业战略→总体城市设计→重点片区详细设计"逐级落实：统筹层结论必须落到总体层图层，总体层判断必须支撑重点区详细设计，重点区方案反向校验总体结构。面积依据以 `brief/site-package/ranges/planning_limits.json` 官方值优先 [metric:site_area_sqm] [metric:key_area_count]。总体范围边界与三处重点区分别对应独立图层 [data:geometry/site_boundary.geojson#SITE-001] [data:geometry/key_areas.geojson#PROV-KEY-001]。

**临时边界使用说明**：三层范围与三处重点区均使用 provisional 粗略多边形，其几何由公告文字四至与约面积推定，矩形边不表达道路红线、地块边界或权属边界；本方案不将其用于官方红线、精确面积复算或法定控制 [depth:three_level_scope_framework]。官方 polygon 补齐后，本框架的图层切分与全部指标需整体重算。

![三层范围与空间工作框架图](assets/figures/land-use-structure.png)

## 统筹研究范围产业与未来城市研究

### 核心概念：京张·人字带 RenLine

1905年詹天佑在八达岭青龙桥以"人字形"展线化解陡坡难题——这是中国自主工程创新的原点；120年后，海淀要在此生长出中国自主AI的原点。本方案以人字形为超级符号，提出**"人字带 RenLine"**：一条人字形的自主创新骨架，叠加一条京张轨道时间线，讲述"从自主造路到自主造AI"的百年叙事 [source:SRC-DESIGN-PROPOSAL-RENLINE]。

- **主名称**：京张·人字带（Jing-Zhang RenLine Belt），英文简称 RenLine（Ren=人/仁 + Line=京张线）；
- **空间口号**：一撇一捺一轨，三点两翼一原点；
- **Logo方向**：钢轨弧线（历史）与数据流折线（未来）相交成"人"字，交点即AI原点光点；采用技术图解/极简蓝本风格，双色体系（钢轨青灰+数据流蓝），全程自绘、清权，可延展为导视符号系统与活动品牌系统 [depth:overall_spatial_structure]。

### 三大定位与五大功能的空间转译

三大定位——百年京张文化带、都市AI生活体验带、AI融合创新带——分别由京张轨道时间线（文化）、小月河场景赋能翼（生活体验）、三区与中关村科技服务翼（融合创新）承载。五大功能对应空间分区：AI全栈自主创新体系→众智园；世界级AI创新生态→AI原点社区；AI+场景赋能新范式→小月河翼与大钟寺；智能化AI活力城市→京张带与全带；AI治理全球话语权→众智园治理展示与全带活动体系 [source:SRC-2026-0518-AGENT-OPEN-CALL-TASKBOOK]。

### 全球AI创新生态案例（7个）

本方案从全球知名AI与知识经济集聚区提炼可转化机制，案例均来自公开资料，不作为"已确定引进"承诺 [source:SRC-DESIGN-PROPOSAL-RENLINE]：

1. **硅谷斯坦福研究园（Stanford Research Park）**：校区-园区-街区融合，近校成果转化；→ 映射AI原点社区"近校型"定位；
2. **波士顿肯德尔广场（Kendall Square）**：生命科学/AI集聚与城市更新互馈，活力公共界面；→ 映射众智园花园型街区；
3. **伦敦国王十字更新区（King's Cross）**：工业遗产更新+知识经济街区，站城一体；→ 映射大钟寺站城联动与京张遗产活化；
4. **杭州梦想小镇**：场景开放+创业社区运营，低门槛入驻；→ 映射场景开放机制与开发者社区；
5. **新加坡裕廊湖AI区**：花园城市+AI测试验证场景；→ 映射京张带"AI+公共空间"测试场景；
6. **德国慕尼黑AI测试场**：公共空间AI场景测试与治理；→ 映射3个测试验证场景的边界与复核机制；
7. **日本柏之叶智慧城市**：产官学民协同与长期运营；→ 映射一带运营联盟与长期品牌资产机制。

每个案例提炼2–3条经验，转化为空间动作（近校缝合、站城一体、遗产活化）、运营机制（场景开放、社区运营、活动体系）与治理机制（人工复核、公开测试），构成AI创新生态图谱的输入 [depth:overall_spatial_structure]。

### 未来城市形态

本方案畅想AI对城市的影响并定义三个"面向未来"：**AI文化**（以"自主造路→自主造AI"为母题的文化叙事）、**AI社会**（人本治理、无障碍、代际包容）、**AI城市**（以京张带慢行评估 SC-03、机器人低速配送 SC-05 等场景为触点的 AI+ 交通体系，以及蓝绿主脊连续无界的绿色空间）[source:SRC-2026-0518-AGENT-OPEN-CALL-TASKBOOK]。空间上提出以京张轨道主轴为骨架、以 24 个格网化用地单元为可迭代模块、以 10 个 AI 场景节点为感知触角的城市发展模式，支撑人才与企业的全生命周期需求 [depth:three_level_scope_framework] [metric:ai_industry_space_sqm]。

## 总体设计范围城市更新与控规深度城市设计

### 总体空间结构：一撇一捺一轨，三点两翼一原点

总体设计范围（约11.4 km²）形成南北狭长的"人字带"结构 [metric:site_area_sqm] [data:geometry/land_use.geojson#LU-00]：

- **一撇（自主创新之撇）**：众智园（北）→ AI原点社区（中），承载AI全栈自主创新体系与AI治理全球话语权；
- **一捺（产业转化之捺）**：AI原点社区（中）→ 大钟寺（南），承载原始创新→成果转化→智能经济的完整链条；
- **一轨（京张轨道时间线）**：南北贯通的京张遗址公园活力带，是历史记忆、公共生活与AI体验的三重复合主轴 [data:geometry/roads.geojson#ROAD-001]；
- **一原点**：AI原点社区即"人"字交汇点，也是全带创新起点；
- **两翼**：中关村科技服务翼（西）、小月河场景赋能翼（东），像"人"字展开的双臂向外输送服务与场景 [data:geometry/land_use.geojson#LU-03] [data:geometry/land_use.geojson#LU-32]。

这一结构将任务书"三区两翼协同回路"转化为可落图的空间闭环：创新→转化→赋能→回馈 [source:SRC-2026-BJ-KW-THREE-AREAS-WINGS]。

### 城市更新总体框架

本方案以城市更新为抓手构建总体框架 [standard:MOHURD-CONTROL-DETAILED-PLANNING]：

- **更新空间结构**：以京张带为更新主轴，三处重点区为更新引擎，两翼为更新延伸带；
- **低效空间识别**：按用地单元评估更新潜力，科研占比约29.7% [metric:land_use_0802_area_sqm]、居住约24.3% [metric:land_use_0701_area_sqm]、社区服务约17.0%、商业约9.3%、教育约6.2%、绿地约13.5%，各代码面积在 metrics.json 独立复算 [metric:land_use_05_area_sqm] [metric:land_use_0804_area_sqm]；
- **职住商服均衡**：科研/居住/商业/社区服务形成"产-居-服-商"均衡结构，支撑AI人才"工作-生活-社交-学习"一体化 [metric:land_use_0702_area_sqm]；
- **AI企业聚集目标**：产业空间概念供给（科研+商业）约409.6万㎡、占比约35.9%，作为AI企业聚集的空间容量方向 [metric:ai_industry_space_sqm]；
- **更新项目清单**：JZ-01至JZ-06六项概念项目（详见"更新项目清单"章节）[metric:renewal_project_count]；
- **实施政策建议**：城市更新统筹实施、空间供给、运营机制、产业服务、公共参与、数据治理与产权协同等政策方向 [depth:renewal_project_list]。

### 控规深度落实要点

- **用地布局**：land_use.geojson 以24个格网单元完整覆盖提交边界，无缝隙、无重叠 [data:geometry/land_use.geojson#LU-00]；
- **开发强度**：容积率、建筑密度、绿地率、退线等法定控制全部列为待确认事项（metrics 中 status=unknown+reason），本方案仅给概念性引导方向，不虚构审定数值 [metric:floor_area_ratio] [metric:building_height_m]；其余控制条件如建筑密度与官方绿地率同样列为待补 [metric:building_density] [metric:green_ratio_official]；
- **建筑规模**：概念性建筑基底28处、合计约251.0万㎡，表达空间供给逻辑而非已批准规模 [metric:building_footprint_area_sqm] [data:geometry/buildings.geojson#BLDG-001]；
- **设计深度**：用地布局与开发强度由设计深度矩阵约束 [depth:land_use_layout] [depth:development_intensity_controls]，高度与体量引导由 [depth:height_massing_character] 管理。

![三处重点区域索引与设计任务图](assets/figures/key-areas.png)

## 重点区域详细设计

三处重点区域均达到"定位+空间结构+建筑更新+交通慢行+公共空间+AI场景+实施风险"的完整小方案深度 [depth:three_key_area_detailed_design]。重点区 polygon 均为 provisional，相关结论为方向性设计，不作为地块级拆改留结论 [data:geometry/key_areas.geojson#PROV-KEY-001]。

### 众智园AI自主创新加速区（约1,929,201.9 ㎡ / 192.9202 公顷，provisional）

- **定位**：花园型全栈自主创新街区（呼应公告"更具智慧型与未来感"）[metric:key_area_zhongzhiyuan_area_sqm]；
- **空间结构**：清河创新界面 + 自主创新组团 + 产业展示轴 [data:geometry/land_use.geojson#LU-60] [data:geometry/land_use.geojson#LU-62]；
- **建筑更新**：潜力用地优化布局，低碳绿色创新交往环境，建筑高度/强度为概念引导（待控规确认）；
- **交通**：结合五环路区域一体化提出对外交通优化方向（概念建议）[data:geometry/constraints.geojson#CONSTRAINT-003]；
- **公共空间**：绿地水系一体化设计，清河文化挖掘展示，绿色空间服务AI的功能场景 [data:geometry/green_space.geojson#GREEN-1401-1]；
- **AI场景**：自主模型测试验证场、标准制定工作坊、安全治理展示、低碳算力体验；
- **实施风险**：五环路交通方案、清河蓝线约束、现状权属待确认 [depth:risk_missing_data]。

### 北京AI原点社区（约1,043,236.9 ㎡ / 104.3237 公顷，provisional）

- **定位**：近校型成果转化与人才社区（呼应公告"人才吸引力、创新活力、成果转化能力"）[metric:key_area_origin_area_sqm]；
- **空间结构**："人"字交汇原点，校区-园区-街区融合 [data:geometry/land_use.geojson#LU-40] [data:geometry/land_use.geojson#LU-44]；
- **建筑更新**：低扰动有机更新示范，拆改留分类建议（成果发布、居住生活配套方向）[data:geometry/buildings.geojson#BLDG-014]；
- **交通**：五道口、清华东路西口轨道站点一体化方向，校区园区慢行缝合 [data:geometry/roads.geojson#ROAD-003]；
- **公共空间**：成果发布广场、开源协作空间、人才服务街 [data:geometry/public_space.geojson#PUBLIC-004]；
- **AI场景**：开源社区日、成果发布会、人才特区服务、近校孵化器；
- **实施风险**：高校权属边界、有机更新实施模式需专业深化 [depth:risk_missing_data]。

### 大钟寺AI产业聚集区（约720,454.2 ㎡ / 72.0454 公顷，provisional）

- **定位**：城市型智能经济与国际交往街区（呼应公告"世界影响力、城市发展活力"）[metric:key_area_dazhongsi_area_sqm]；
- **空间结构**：大钟寺站四象限步行连通 + 智能经济组团 + 绿地复合利用 [data:geometry/land_use.geojson#LU-20] [data:geometry/land_use.geojson#LU-21] [data:geometry/land_use.geojson#LU-22]；
- **建筑更新**：重点企业周边公共环境品质提升，潜力地块功能研判（概念建议）；
- **交通**：轨道站点一体化、非机动车停放等静态交通组织方向 [data:geometry/roads.geojson#ROAD-002]；
- **公共空间**：规划绿地复合利用、国际交往街区界面 [data:geometry/public_space.geojson#PUBLIC-002]；
- **AI场景**：智能体与智能终端展示、内容消费体验、数据要素路演；
- **实施风险**：站点一体化工程、四象限步行连通受道路与管线约束 [depth:risk_missing_data]。

## AI 创新生态、人才画像与 AI+ 场景

### AI创新生态图谱

本方案构建"要素-空间-机制"三层生态图谱：**要素层**（人才、企业、高校院所、算力、算法、数据、资本、场景、标准、治理）→ **空间层**（三区两翼承载）→ **机制层**（全生命周期空间供给、场景开放、政策服务、活动运营）[source:SRC-2026-0518-AGENT-OPEN-CALL-TASKBOOK]。众智园承担全栈自主体系（基础模型、算力、数据、标准、安全治理），AI原点社区承担原始创新策源与开源生态，中关村科技服务翼承担要素全球化配置与IP资本赋能，形成"研发-转化-服务"协同 [depth:overall_spatial_structure] [metric:ai_industry_space_sqm]。

### 五类用户画像（agent.3）

| 编号 | 画像 | 核心需求 | 对应空间 |
|---|---|---|---|
| P-01 | AI研发工程师/科学家 | 工作-生活-社交-学习一体化、算力与实验空间 | 众智园、AI原点社区 |
| P-02 | AI创业团队/开发者 | 低成本起步、场景开放、社区协作、融资对接 | AI原点社区、大钟寺 |
| P-03 | 高校学生/科研人员 | 近校通勤、成果转化、灵感空间、开源参与 | AI原点社区近校配套 |
| P-04 | 周边居民/银发群体 | 无障碍、AI公共服务、蓝绿健康、代际包容 | 京张带、小月河翼 |
| P-05 | 全球访客/国际机构 | AI体验、国际交往、文化叙事、会议会展 | 大钟寺、京张带 |

画像驱动空间与场景配置：P-01/P-02驱动产业空间与人才公寓 [metric:talent_service_space_sqm]，P-03驱动教育科研配套，P-04驱动无障碍与AI公共服务 [source:SRC-2023-BARRIER-FREE-ENVIRONMENT-LAW]，P-05驱动国际交往与展示空间 [depth:overall_spatial_structure] [metric:persona_count]。

### AI场景卡（10张，含3张测试验证场景）

以下 10 张场景卡完整展开全部字段（编号、名称、类型、主空间、服务对象、运行数据、隐私边界、人工复核、运营主体、可视化图层、风险），与 `compliance_matrix.json` 中 agent.3 的 `scenario_card_refs` 逐卡声明一一对应 [metric:ai_scenario_node_count]。

| 字段说明 | SC-01 京张遗址公园AI导览 | SC-02 AI健康服务导航 | SC-03 AI交通慢行评估（测试验证） |
|---|---|---|---|
| 类型 | 公共服务 | 公共服务 | **测试验证** |
| 主空间 | 京张带 | 小月河翼 | 京张带+全带 |
| 服务对象 | 游客、学生、居民、活动参与者 | 园区青年、居民、游客 | 居民、学生、游客、通勤者 |
| 运行数据 | 公开历史资料、授权图片文字、人工策展文本、公开活动信息 | 公开公共服务信息、授权活动信息、人工整理的服务目录 | 公开道路资料、公开轨道站点资料、人工调研、授权反馈 |
| 隐私边界 | 不采集个人位置轨迹，导览仅基于公开史料与策展文本 | 仅做服务导航不诊疗，不采集健康档案；医疗建议越界即终止 | 不采集个人出行轨迹，仅用公开路网与站点资料 |
| 人工复核 | 文化、版权与事实核查人员复核导览文本与图片 | 医疗、法律与数据安全专业人员复核，保留人工咨询入口 | 规划、交通、无障碍与公众参与程序复核 |
| 运营主体 | 公共空间运营团队+文化策展方 | 公共空间运营团队+医疗法律顾问 | 规划交通专业团队+公众参与机制 |
| 可视化图层 | public_space、green_space | land_use、public_space | roads、public_space |
| 风险 | 史实错误、素材版权不清、AI内容混同事实 | 医疗建议越界、服务信息过期、健康信息误采集 | 数据代表性不足、自动判断替代现场调研、路线建议被误解为审定方案 |

| 字段说明 | SC-04 企业服务Copilot | SC-05 机器人低速配送试点（测试验证） | SC-06 自主模型测试验证场（测试验证） |
|---|---|---|---|
| 类型 | 产业服务 | **测试验证** | **测试验证** |
| 主空间 | 中关村翼 | 众智园/大钟寺 | 众智园 |
| 服务对象 | AI企业、创业团队、开发者、园区运营者 | 园区员工、商户、居民、访客 | 模型研发团队、标准制定机构、安全治理团队 |
| 运行数据 | 公开政策、公开服务目录、授权园区活动信息、人工维护问答 | 公开道路和步道信息、现场人工调研、授权运营数据 | 公开基准数据集、测试日志（脱敏）、标准草案 |
| 隐私边界 | 不采集企业商业秘密，政策解释不过度延伸 | 试点边界、速度、避让规则受控，不采集行人影像 | 测试数据脱敏，基准与日志仅用于标准制定 |
| 人工复核 | 政策、法律、知识产权与数据合规专业人员复核 | 交通、安全、运营与公众参与团队复核 | 安全治理与标准专业团队复核 |
| 运营主体 | 产业服务公司+政策法务顾问 | 公共空间运营团队+交通管理部门 | 众智园运营主体+标准/安全机构 |
| 可视化图层 | land_use、phasing | roads、public_space | land_use、constraints |
| 风险 | 政策解释过度、替代专业法律意见、服务目录滞后 | 人机混行安全、噪声占道、公众接受度不足 | 基准被误用、测试结果被当作已批准结论 |

| 字段说明 | SC-07 智能体应用展示橱窗 | SC-08 智能消费内容体验 | SC-09 开源协作与成果发布 |
|---|---|---|---|
| 类型 | 产业展示 | 消费场景 | 社区场景 |
| 主空间 | 大钟寺 | 大钟寺 | AI原点社区 |
| 服务对象 | 全球访客、国际机构、开发者、公众 | 青年消费者、居民、游客 | 开发者、学生、科研人员、创业者 |
| 运行数据 | 展品说明（清权）、公开技术介绍、活动信息 | 公开商品与活动信息、授权展示素材 | 公开开源仓库元数据、活动排期、署名记录 |
| 隐私边界 | 展品版权清权，不采集参观者行为画像 | 未成年人保护，消费推荐不做过度画像 | 署名与许可合规，不采集开发者个人敏感信息 |
| 人工复核 | 版权与产业专业团队复核展示内容 | 版权、未成年人保护与消费者权益复核 | 开源许可与社区治理团队复核 |
| 运营主体 | 大钟寺运营主体+产业服务公司 | 商业运营团队+消费者权益顾问 | 开发者社区运营组+开源基金会 |
| 可视化图层 | land_use、public_space | land_use | public_space、land_use |
| 风险 | 展品侵权、展示被误读为已批准运营 | 版权纠纷、未成年人保护不足 | 许可争议、署名缺失 |

| 字段说明 | SC-10 公共安全活动运营复核 |
|---|---|
| 类型 | 治理场景 |
| 主空间 | 全带活动体系 |
| 服务对象 | 维护者、运营团队、公众参与团队 |
| 运行数据 | 公开活动信息、人工巡查记录、授权反馈、公开空间管理规则 |
| 隐私边界 | 只做风险提示清单，不做人群监控画像；防止过度监控 |
| 人工复核 | 公共安全、运营、无障碍与公众参与机制复核 |
| 运营主体 | 公共空间运营团队+公共安全管理部门 |
| 可视化图层 | phasing、public_space |
| 风险 | 误判风险等级、过度监控倾向、公共安全判断被自动化替代 |

所有场景为概念建议：不把未成熟技术写成已可全面部署，不把测试场景写成已批准运营，不采集个人隐私数据 [source:SRC-2026-0518-AGENT-OPEN-CALL-TASKBOOK]。场景卡的完整机读映射（含 proposal_anchor 与逐条复核字段）见 `compliance_matrix.json` agent.3 条目。

## 用地、建筑规模与拆改留方案

### 用地布局

land_use.geojson 以24个格网单元构成"人字带"用地结构，完整覆盖总体设计范围且无缝隙、无重叠 [data:geometry/land_use.geojson#LU-00] [depth:land_use_layout]。用地代码与面积（EPSG:4548复算）如下 [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE]：

| 代码 | 用地类型 | 面积（㎡） | 占比 |
|---|---|---|---|
| 0802 | 科研用地（AI研发/转化/服务） | 3,384,158.5 | 29.7% |
| 0701 | 城镇住宅用地（存量/人才社区） | 2,768,342.2 | 24.3% |
| 0702 | 城镇社区服务设施用地 | 1,943,373.0 | 17.0% |
| 05 | 商业服务业用地（智能消费/科技服务） | 1,060,409.4 | 9.3% |
| 0804 | 教育用地（近校配套） | 711,540.9 | 6.2% |
| 1401 | 公园绿地（京张蓝绿主脊） | 1,314,607.5 | 11.5% |
| 1402 | 防护绿地（北五环防护带） | 59,709.4 | 0.5% |
| 1403 | 广场用地（AI原点广场） | 170,711.6 | 1.5% |
| — | **合计** | **11,412,825.4** | **100%** |

各代码面积由 metrics.json 独立复算，与 geometry/land_use.geojson 严格一致。科研与居住为两大主体：科研用地 3,384,158.5 ㎡ [metric:land_use_0802_area_sqm]，居住用地 2,768,342.2 ㎡ [metric:land_use_0701_area_sqm]；商业服务业用地 1,060,409.4 ㎡ [metric:land_use_05_area_sqm]。社区服务与教育配套分别为 1,943,373.0 ㎡ [metric:land_use_0702_area_sqm] 与 711,540.9 ㎡ [metric:land_use_0804_area_sqm]。蓝绿体系由公园绿地 1,314,607.5 ㎡ [metric:land_use_1401_area_sqm]、防护绿地 59,709.4 ㎡ [metric:land_use_1402_area_sqm] 与广场用地 170,711.6 ㎡ [metric:land_use_1403_area_sqm] 共同构成。

### 建筑规模与拆改留

建筑基底为概念性体量示意（28处、约251.0万㎡），表达产业与生活空间供给逻辑，不代表现状轮廓、权属或已批准建设规模 [metric:building_footprint_area_sqm] [data:geometry/buildings.geojson#BLDG-001]。拆改留采用"保留-改造-新建"分类方向 [depth:retain_renovate_demolish]：

- **保留**：京张铁路遗址公园已实施段、文保要素周边、品质良好的存量社区与校园；
- **改造**：低效产业空间、老旧街区沿街界面、站点周边公共环境（低扰动有机更新）；
- **新建**：产业展示轴、AI原点广场、清河界面等概念性新增（待控规与权属确认）。

现状建筑轮廓、权属、高度、层数与建成年代缺失，拆改留结论仅为方向性建议，待官方底图补齐后重做 [depth:risk_missing_data]。

## 交通、轨道、市政与公共服务设施

### 交通与慢行

- **京张带慢行主脊**：南北贯通的步道+骑行复合通道，概念道路中心线全长约12.9 km [metric:road_centerline_length_m] [data:geometry/roads.geojson#ROAD-001]；
- **片区联络道**：大钟寺南联络道、原点社区东西缝合道、众智园对外联络道，改善道路微循环 [data:geometry/roads.geojson#ROAD-002] [data:geometry/roads.geojson#ROAD-003] [data:geometry/roads.geojson#ROAD-004]；
- **轨道站点一体化**：五道口、清华东路西口（原点社区）、大钟寺站（四象限步行连通）一体化方向 [source:SRC-2026-BJ-GH-QUAL-PREANNOUNCEMENT]；
- **慢行断点**：京张带跨路断点缝合作为JZ-01更新项目（概念建议） [depth:traffic_rail_slow_parking]；
- **无障碍**：按《无障碍环境建设法》第39条列举服务事项边界设计无障碍路径与人工服务 [source:SRC-2023-BARRIER-FREE-ENVIRONMENT-LAW]。

### 市政与新型基础设施

- **产业服务设施**：创新服务平台、AI产业服务设施体系与空间布局方向；
- **人才生活服务设施**：人才公寓、教育配套、社区服务（0702/0804 用地承载）[metric:talent_service_space_sqm]；
- **新型基础设施**：分布式能源、端侧算力与三大传统设施融合的发展模式与实施路径（方向性策略）[depth:municipal_new_infrastructure]；
- **市政承载**：管线、排水、电力、燃气、消防、防洪等市政底数缺失，不进行容量测算，列为待补资料 [depth:risk_missing_data]。

![交通慢行与蓝绿公共空间复合系统图](assets/figures/mobility-bluegreen.png)

## 蓝绿空间、公共空间与城市风貌

### 京张遗址公园活力带与蓝绿系统

- **京张轨道蓝绿主脊**：以公园绿地（1401，约131.5万㎡）为核心，南北贯通、东西连通，步道骑行道与绿色空间体系连续无界 [metric:land_use_1401_area_sqm] [data:geometry/green_space.geojson#GREEN-1401-1]；
- **清河界面**：众智园段清河文化展示与蓝绿一体化（概念建议）[data:geometry/constraints.geojson#CONSTRAINT-003]；
- **小月河水系**：小月河场景赋能翼滨水空间（概念示意）[data:geometry/constraints.geojson#CONSTRAINT-004]；
- **防护绿地**：北五环防护带（1402）缓冲城市快速路影响 [metric:land_use_1402_area_sqm]。

### 公共空间与AI公共空间

公共空间以京张带活动主脊为核心，形成5个节点：南端公共节点、大钟寺绿地复合公共空间、中段公共空间、AI原点广场、北段公共空间 [metric:public_space_area_sqm] [metric:public_space_ratio]。节点空间与图层一一对应，从南到北依次为 PUBLIC-001 至 PUBLIC-005 [data:geometry/public_space.geojson#PUBLIC-001] [data:geometry/public_space.geojson#PUBLIC-005]。公共空间组件库方向：可移动智能终端、AI导览屏、机器人服务点、无障碍设施、活动电源与可回收舞台等标准化组件，支撑场景快速落地与活动运营 [source:SRC-2026-0518-AGENT-OPEN-CALL-TASKBOOK] [depth:blue_green_public_space]。

### AI朝圣地标与荣誉展示体系（≥3个）

1. **AI原点光点**（AI原点社区广场）："人"字交汇点的发光地标，象征自主AI起点 [data:geometry/public_space.geojson#PUBLIC-004]；
2. **人字交汇桥**（京张带中段）：钢轨弧线与数据流折线相交的空间装置，纪念人字形展线 [data:geometry/public_space.geojson#PUBLIC-003]；
3. **轨道时间线记忆轴**（京张带南段）：以轨道、枕木、站台等工业遗存要素串联的百年叙事步道 [data:geometry/green_space.geojson#GREEN-1401-1]。

荣誉展示体系与公共空间组件库结合：开发者/企业/人才的荣誉节点（开源之星、场景先锋、治理贡献）沿京张带分布，形成"可抵达、可更新、可传播"的荣誉展示系统。地标、导视、Logo、字体、图像、人物与企业标识全部清权，不把概念地标写成已批准建设 [source:SRC-2026-0518-AGENT-OPEN-CALL-TASKBOOK] [depth:blue_green_public_space]。

### 京张铁路工业遗产保护专项策略

针对京张铁路工业遗产设置**独立专项保护策略**，统筹建设开发强度与历史风貌管控：

- **保护对象分级**：① 清华园车站旧址等文保单位（严格管控，精确范围与建设控制地带待文物部门官方图层，constraints.geojson 仅以示意点位表达）[data:geometry/constraints.geojson#CONSTRAINT-002]；② 京张铁路遗址公园已实施段（延续原设计方案意图，不主张新建侵入）；③ 轨道、枕木、站台、信号等工业遗存要素（活化利用为记忆轴与展示节点）；④ 沿线历史风貌协调区（建筑高度、体量、风貌管控引导，待控规确认）。
- **建设强度与风貌协调**：文保范围与建设控制地带内不做新建开发主张；周边开发强度、建筑高度、退线全部标注"待正式控规条件确认"，不编造审定数值 [metric:building_height_m]。
- **统筹机制**：更新项目与遗产保护"一张图"校核——constraints.geojson 承载文保示意与蓝线示意，涉及文物、绿地、蓝线、交通安全的空间动作均标注"须专业复核"，不给出桥隧、地下空间或工程可行性结论 [data:geometry/constraints.geojson#CONSTRAINT-001]。
- **文化叙事载体**：轨道时间线→节点故事化：车站旧址（原点记忆）→ 遗址公园（活力生活）→ 中关村（创新接力）→ AI 原点（未来开源），与"人字带"叙事主线呼应 [source:SRC-2026-0518-AGENT-OPEN-CALL-TASKBOOK]。

### 城市风貌

**城市基调"百年京张·AI原点"**：以京张铁路工业遗产、中关村创新文化与AI新文化三线融合 [source:SRC-2026-0518-AGENT-OPEN-CALL-TASKBOOK]：

- **建筑风貌**：工业遗存（钢构、红砖、轨道元素）与现代AI建筑（玻璃、金属、数据立面）对话；
- **屋顶形态**：呼应人字形展线的折线屋顶、绿色屋顶与端侧算力设施复合（概念引导）；
- **体量与界面**：沿京张带低强度连续界面，重点区适度集聚（待控规确认）；
- **景观节点**：南端、北端与上跨环路段标志性节点（概念建议）[depth:height_massing_character]。

## 更新项目清单、实施政策与分期计划

### 更新项目清单（概念建议）

| 编号 | 项目 | 类型 | 空间位置 | 依赖条件 | 分期 |
|---|---|---|---|---|---|
| JZ-01 | 京张遗址公园慢行断点缝合 | 公共空间/交通 | 京张带跨路节点 | 道路红线、桥下空间复核 | 近期 |
| JZ-02 | 众智园清河创新界面 | 蓝绿/产业展示 | 众智园北界 | 河道蓝线、生态防洪条件 | 中期 |
| JZ-03 | 原点社区近校成果转化街 | 城市更新/产业 | AI原点社区 | 校区边界、权属、首层业态 | 近期 |
| JZ-04 | 大钟寺站四象限步行连通 | 轨道一体/慢行 | 大钟寺站周边 | 轨道站点、道路、管线复核 | 远期 |
| JZ-05 | AI公共服务与端侧算力节点 | 新基建/公共服务 | 两翼与重点区 | 能源、算力、安全与运营主体 | 中期 |
| JZ-06 | 全球AI活动周公共路线 | 运营/品牌 | 京张带+三区 | 公共空间许可、活动安全、版权清权 | 近期 |

项目清单、政策建议与分期空间证据由 `geometry/phasing.geojson` 表达 [metric:renewal_project_count] [data:geometry/phasing.geojson#PHASE-001]。更新项目清单与分期实施深度分别由设计深度矩阵管理 [depth:renewal_project_list] [depth:phasing_implementation]。

### 分期计划（概念建议）

| 分期 | 时间 | 核心任务 | 依赖/约束 |
|---|---|---|---|
| 近期（PHASE-001，约597.8万㎡） | 0–3年 | 原点社区低扰动有机更新示范；京张带南段慢行缝合；3个测试验证场景试点；命名与视觉系统落地 | 官方边界补齐、权属协调、场景运营主体成立 [metric:phase_001_area_sqm] |
| 中期（PHASE-002，约392.3万㎡） | 3–6年 | 众智园花园街区与清河界面；大钟寺站一体与四象限连通；两翼走廊成形 | 控规条件、轨道交通方案、工程可行性 [metric:phase_002_area_sqm] |
| 远期（PHASE-003，约151.2万㎡） | 6–10年 | 大钟寺智能经济与国际交往深化；全带品质提升；全球AI活动体系常态化 | 长期运营机制、国际传播、持续迭代 [metric:phase_003_area_sqm] |

分期实施遵循本项目逻辑：近期以 AI 原点社区低扰动有机更新与 SC-03/SC-05/SC-06 三个测试验证场景试点建立实施信心，中期以众智园花园街区与京张带北段建设形成骨架，远期以运营联盟与大钟寺智能经济深化沉淀全带价值 [depth:phasing_implementation]。

### 实施政策建议

城市更新统筹实施、空间供给政策、运营机制、产业服务、公共参与、数据治理与产权协同等政策方向按概念建议提出，不构成已确定政府安排 [source:SRC-2026-0518-AGENT-OPEN-CALL-TASKBOOK]。

### 全球AI创新活动体系与长期运营设计（agent.6）

- **运营主体架构（概念建议）**："政府引导 + 市场化运营公司 + 社区/开发者组织"三方协同的**一带运营联盟（JZ-RenLine Operation Alliance）**，下设产业服务公司（招商/场景开放）、公共空间运营团队（公园/活动/商业）、开发者社区运营组（开源/活动/国际传播）；
- **多元化收益模式（6类）**：①产业空间租售与资产运营；②场景开放服务费与数据合规服务；③活动品牌冠名与展会经济；④公共空间商业反哺（特许经营）；⑤技术测试/标准验证服务；⑥国际交流与知识服务 [depth:renewal_project_list]；
- **年度活动体系**：全球AI活动周、开源开发者大会、京张文化季、人才峰会（概念建议）[depth:overall_spatial_structure]；
- **开发者社区运营**：周常工作坊、月度路演、场景开放准入规则；
- **转化路径**：参加活动→入驻空间→场景试点→政策对接，形成人才/企业/开发者转化闭环；
- **长期品牌资产**：视觉系统、活动IP、荣誉展示体系持续沉淀 [depth:blue_green_public_space]。

所有活动、招商、资金、政策与运营安排均表述为概念建议或深化方向，不夸大政府承诺或活动效果 [source:SRC-2026-0518-AGENT-OPEN-CALL-TASKBOOK]。

## 指标体系、面积复算与合规矩阵

### 指标体系

本方案指标分为**复算型**与**待补型**两类。复算型指标全部由 GeoJSON 在 EPSG:4548 下复算得出（与 spatial_review 结果一致）：总体设计范围面积 11,412,825.4 ㎡ [metric:site_area_sqm]，绿地面积与比例 [metric:green_space_area_sqm] [metric:green_ratio]，公共空间面积与比例 [metric:public_space_area_sqm] [metric:public_space_ratio]，建筑基底面积 2,509,609.3 ㎡ [metric:building_footprint_area_sqm]。

慢行主脊长度约12.9 km [metric:road_centerline_length_m]；三处重点区面积由 geometry/key_areas.geojson 在 EPSG:4548 复算，与 metrics.json 完全一致：众智园 1,929,201.877 ㎡（192.9202 公顷）[metric:key_area_zhongzhiyuan_area_sqm]、AI原点社区 1,043,236.909 ㎡（104.3237 公顷）[metric:key_area_origin_area_sqm]、大钟寺 720,454.221 ㎡（72.0454 公顷）[metric:key_area_dazhongsi_area_sqm]；产业空间概念供给 4,095,709.4 ㎡ [metric:ai_industry_space_sqm]。

待补型指标（容积率 [metric:floor_area_ratio]、建筑高度 [metric:building_height_m]、建筑密度 [metric:building_density]、官方绿地率 [metric:green_ratio_official]、慢行连通指数 [metric:slow_corridor_continuity_index]）均标注 `status=unknown` 与原因，等待正式控规与现状数据补齐 [depth:metrics_recalculation]。

指标设计含义：概念示意绿地率 13.54%（本方案概念示意值，非官方审定指标，官方绿地率 green_ratio_official 仍为 unknown）支撑人才与居民的日常蓝绿接触论证（P-04画像）；公共空间比例 8.72% 支撑创新交往与公共活动（P-01/P-05画像）；科研用地 29.7% 支撑产业空间供给（P-01/P-02画像）；建筑基底面积表达更新与新建空间逻辑。

### 面积复算与合规矩阵

- **面积复算**：全部几何在 EPSG:4548 复算，metrics.json 与 spatial_review 输出一致；provisional 面积与官方约面积偏差在公告推定误差范围内，不视为精确面积依据 [data:geometry/site_boundary.geojson#SITE-001]；
- **合规矩阵**：`compliance_matrix.json` 覆盖公告 17 项任务（1.3.1–1.5.3.3）与智能体 6 项任务（agent.1–agent.6），每项映射报告章节、图层、指标、图纸、可视化、来源、假设与自检 [source:SRC-2026-BJ-GH-QUAL-PREANNOUNCEMENT]；
- **专业标准矩阵**：`standard_matrix.json` 覆盖 5 项强制标准（公告、智能体任务书、城市设计管理办法、控规办法、用地分类指南）[standard:PROJECT-OFFICIAL-ANNOUNCEMENT] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]；
- **设计深度矩阵**：`design_depth_matrix.json` 覆盖 15 项必需深度，全部 `complete` [depth:metrics_recalculation]。

![核心指标复算与证据链图](assets/figures/metrics-evidence.png)

## 风险、版权与合规说明

### 风险矩阵

| 风险维度 | 风险描述 | 发生概率 | 影响等级 | 缓解措施 | 人工复核节点 |
|---|---|---|---|---|---|
| 数据隐私 | AI场景误采集个人信息 | 中 | 高 | 仅用公开/清权数据，人工复核边界 | 场景上线前 |
| 实施复杂度 | 更新项目依赖权属与工程条件 | 高 | 高 | 分期实施、成熟一个推进一个 | 近期项目启动前 |
| 公众接受度 | 机器人试点与夜间活动争议 | 中 | 中 | 公众参与、低速可撤回 | 试点前 |
| 运维成本 | 公共空间与场景长期运维 | 中 | 中 | 多元收益模式、运营联盟 | 年度评估 |
| 政策不确定性 | 控规与政策条件未定 | 高 | 高 | 指标标注待补，不虚构审定 | 官方资料发布 |
| 空间争议 | provisional边界与片区范围 | 中 | 中 | 全链路披露provisional | 官方polygon发布 |
| 技术成熟度 | 未成熟AI技术表述过满 | 中 | 中 | 场景标注概念建议 | 专业评审 |
| 公平与包容性 | 数字鸿沟与无障碍不足 | 中 | 中 | 传统+智能服务并行、无障碍设计 | 公众参与 |

发生概率与影响等级定级依据、缓解措施与人工复核路径的完整说明见 `risk.json`（遵循 risk.schema.json，每条含 likelihood/impact/score）。

### 版权与合规说明

- **资料合法性**：本方案仅使用公开官方资料、用户提供清权资料与自生成设计内容，来源与许可记录于 `sources.json` [source:SRC-DESIGN-PROPOSAL-RENLINE]；
- **版权授权**：Logo、导视、字体、图片、人物与企业标识全部自绘或清权，不包含未授权第三方素材 [depth:risk_missing_data]；
- **非公开资料排除**：未使用内部地图、非公开表格、个人隐私或伪造官方背书；
- **AI生成责任**：本方案由AI智能体生成，作者为 GitHub ID `chenxuan999`，模型与生成方式披露于 `agent.json` 与 `report/copyright_statement.md`；专业判断经人类贡献者复核；
- **官方批准禁用**：本方案不声称任何官方批准、已确定的政府安排、投资承诺或工程可行性结论；
- **待补资料**：官方边界、控规条件、现状建筑、权属、市政底数、文保范围等列为待补，补齐后需整体重算 [depth:risk_missing_data]。

### 术语与单位

全案单位规则：面积以平方米（㎡/sqm）为基准，大尺度范围（统筹研究 43.6 km²、总体设计 11.4 km²）在正文以平方公里表述并标注换算；重点区域以公顷（ha）表述并标注㎡换算。provisional 面积仅作讨论用途，不用于精确面积主张。

## 参考资料

本方案主要材料来源如下（完整机器索引见 `sources.json` 与三个矩阵文件）[source:SRC-DESIGN-PROPOSAL-RENLINE]：

1. 北京市规划和自然资源委员会海淀分局：《百年京张AI创新带城市设计国际方案征集资格预审公告》（2026-05-09）
2. 面向全球智能体开展"百年京张AI创新带城市设计开源征集"任务书摘录（2026-05-18，用户提供清权）
3. 北京市科委、中关村管委会：《"三区两翼"打造世界级AI集聚地》（2026-04-03）
4. 海淀区人民政府：《海淀区发布"1+X+1"现代化产业体系建设布局》（2026-03-02）
5. 住建部：《城市设计管理办法》（2017-03-14）
6. 住建部：《城市、镇控制性详细规划编制审批办法》
7. 自然资源部：《国土空间调查、规划、用途管制用地用海分类指南》（2023-11-22）
8. 国家网信办等七部门：《生成式人工智能服务管理暂行办法》（2023-07-13）
9. 全国人大常委会：《中华人民共和国无障碍环境建设法》（2023-06-28）
10. 仓库站点包：`brief/site-package/`（design_brief、agent_taskbook、allowed_design_space、provisional_boundaries、planning_limits、standards、schemas）
11. 本方案自生成内容：`submissions/chenxuan999/centennial-jingzhang-ai-belt-v2/`（作者 chenxuan999）
