---
title: "五校环 · 原点学园带 FIVE-UNIVERSITY ORIGIN RING"
author_github: "HUAN2022A"
language: "zh"
proposal_format_version: "2"
bilingual_contract_version: "1"
translation_file: "proposal.en.md"
license: "COMMUNITY-DISPLAY-ONLY"
summary: "把京张铁路遗址公园读作一条可学习的城市学园线：以五道口—清华东路一带五校环抱的中段为原点学园总站，北端众智园为全栈试炼场，南端大钟寺为成果市集，用课程链接、代际共学、测试验证与公共展示把AI创新带组织成一条人人都能走进、学到、接上的开放学园。"
tracks: ["ai-traffic-walkability", "enterprise-services-ecosystem", "civic-agent-governance"]
scenarios: ["ai-traffic-walkability", "enterprise-service-copilot", "public-safety-operations-review"]
iteration: "v1.0"
---

# 五校环 · 原点学园带 FIVE-UNIVERSITY ORIGIN RING

## 一页先读｜先看空间动作，再看数据证据

### 方案判断

京张铁路在海淀留下的，不只是一条供人凭吊的百年铁轨，更是一条**可以学习的城市线**。五道口—清华东路一带，清华、北航、北邮、北理工与中科院群院所环抱的中段，是这条线上最该被先点亮的地方。[source:AGENT-TASKBOOK] [depth:three_level_scope_framework]

本方案提出「五校环 · 原点学园带」：**把创新带组织成一座没有围墙的开放学园**——北端众智园是全栈试炼场，中段 AI 原点社区是学园总站，南端大钟寺是成果市集。课程可以来、测试可以来、作品可以来、居民和游客也可以来，用「学到什么」而不是「摆了什么」衡量这条带的活力。[depth:overall_spatial_structure] [metric:key_area_count]

### 三环不是三个展台

| 重点区 | 学园角色 | 核心空间动作 |
| --- | --- | --- |
| 众智园 AI 自主创新加速区（北） | 全栈试炼场 | AI 全栈测试验证场地、具身智能受控测试、试炼观演台 |
| 北京 AI 原点社区（中） | 学园总站 | 五校环校园创新带、代际共学、原点广场、课程链接枢纽 |
| 大钟寺 AI 产业聚集区（南） | 成果市集 | 智能原生商业街、成果转化文化街、人才社区、成果广场 |

三处边界均为 `official_boundary=false`、`geometry_role=provisional_constraint` 的临时约束，用于表达空间关系与复算，不是官方红线、权属界线或工程定位。[data:geometry/key_areas.geojson#PROV-KEY-001] [data:geometry/key_areas.geojson#PROV-KEY-002] [data:geometry/key_areas.geojson#PROV-KEY-003]

### 用少量可重算指标校准取舍

当前提交边界在 EPSG:4548 下复算为 11,412,825.4 平方米（低置信、临时几何）；绿地占比 38.6%，公共空间占比 1.9%，建筑密度 10.8%。[metric:site_area_sqm][metric:green_ratio][metric:public_space_ratio] 

科研用地（0802）占比 13.7%，教育用地（0804）占比 2.1%，商业用地（05）占比 2.8%，公园绿地（1401）占比 27.2%。[metric:land_use_research_ratio][metric:land_use_education_ratio][metric:land_use_commerce_ratio] 

上述量均为概念结构的可重算量，不是法定指标、工程长度或绩效承诺；官方红线与控规条件发布后整链重算。[metric:floor_area_ratio]

### 三期把十年城市周期和 AI 迭代接起来

`PHASE-001` 一期先点亮中段原点学园示范段；`PHASE-002` 二期推进北端众智园测试场；`PHASE-003` 三期贯通南端大钟寺成果市集。[data:geometry/phasing.geojson#PHASE-001] [data:geometry/phasing.geojson#PHASE-002] [data:geometry/phasing.geojson#PHASE-003]

---

## 设计依据与资料清单

本方案以北京市规划和自然资源委员会海淀分局发布的《百年京张AI创新带城市设计国际方案征集资格预审公告》为第一依据，并以 `brief/site-package/` 中经维护者登记的临时粗略边界、重点区域、枚举、指标和来源清单为机器可读依据。[source:OFFICIAL-ANNOUNCEMENT] [source:AGENT-TASKBOOK] [source:SOURCE-REGISTRY]

正式方案引用以下关键资料（完整机器索引见 `sources.json`）：

- **资格预审公告**：三层范围（统筹研究 43.6km²、总体设计 11.4km²、重点区域 368.4ha）与三处重点区面积及南北顺序。[source:OFFICIAL-ANNOUNCEMENT]
- **面向智能体任务书摘录**：三大定位、五大功能、三区两翼、agent.1–agent.6 六项任务与共创宪章。[source:AGENT-TASKBOOK]
- **临时粗略边界**：`brief/site-package/geometry/provisional_boundaries.geojson`，依据公告文字四至与面积推定，`official_boundary=false`、`geometry_role=provisional_constraint`。[source:BOUNDARY-SOURCE] [source:KEY-AREA-SOURCE]
- **用地分类指南**：自然资源部《国土空间调查、规划、用途管制用地用海分类指南》，用于 land_use 代码。[standard:MNR-LAND-USE-CLASSIFICATION-GUIDE]
- **城市设计管理法规**：《城市设计管理办法》《城市、镇控制性详细规划编制审批办法》。[standard:MOHURD-URBAN-DESIGN-MEASURES] [standard:MOHURD-CONTROL-DETAILED-PLANNING]
- **AI 治理法规**：《生成式人工智能服务管理暂行办法》《无障碍环境建设法》。[standard:GENERATIVE-AI-INTERIM-MEASURES] [standard:BARRIER-FREE-ENVIRONMENT-LAW]

**重要声明**：本方案全部空间落地建议均为**概念建议、参考方案或可供专业团队深化研究**的材料，不替代正式规划，不构成政府审定结论。涉及容积率、建筑高度、拆改留、道路红线等内容均属概念性设想，须以官方控规条件与专业复核为准。[source:AGENT-TASKBOOK]

![资料证据链与提交包关系图](assets/figures/site-overview.png)

---

## 三层范围工作框架

### 统筹研究范围（约 43.6km²）

北至北五环路、东至京藏高速、南至西直门外大街、西至万泉河路。[data:geometry/site_boundary.geojson#SITE-001]

在统筹层面，本方案以「**学院城 · 学园带 · 学园站**」三级研究框架展开：把海淀作为一座与大学共生的学院城，把京张遗址公园及周边 1–2 公里作为学园带，把三处重点区作为学园站。产业战略、AI 创新生态与未来城市形态在统筹范围内协同研究。[depth:three_level_scope_framework] [depth:overall_spatial_structure]

### 总体设计范围（约 11.4km²）

以京张遗址公园周边 1–2 公里的城市地区和产业区为规划设计范围。本方案在此层面完成「**一脊三环五链接**」空间结构：一脊为京张遗址公园慢行学园脊，三环为众智园试炼环、原点学园环、大钟寺市集环，五链接为连接五所高校与创新节点的学园链接。[depth:overall_spatial_structure] [depth:land_use_layout]

### 重点区域范围（约 368.4ha）

自北向南包括众智园 AI 自主创新加速区（约 192.1ha）、北京 AI 原点社区（约 104.3ha）、大钟寺 AI 产业聚集区（约 72.0ha）。三处重点区按「**试炼场—总站—市集**」的学园动线串联，形成完整的学习—测试—转化链条。[metric:key_area_area_sqm] [depth:three_key_area_detailed_design]

**临时边界声明**：当前三处重点区 polygon 均为 `provisional_constraint`。官方 polygon 发布后，需重算所有面积、密度、占比类指标，并重新核定建筑布局与分期范围；在此之前，本文所有面积均为概念性复算，不可作为精确面积依据。[source:BOUNDARY-SOURCE][data:geometry/key_areas.geojson#PROV-KEY-001][data:geometry/key_areas.geojson#PROV-KEY-002] 

![三层范围与空间工作框架图](assets/figures/land-use-structure.png)

---

## 统筹研究范围产业与未来城市研究

### 三大定位与五大功能的学园表达

任务书三大定位（百年京张文化带、都市 AI 生活体验带、AI 融合创新带）与五大功能（AI 全栈自主创新体系、世界级 AI 创新生态、AI+场景赋能新范式、智能化 AI 活力城市、AI 治理全球话语权），在学园逻辑下统一为：**文化带是学园的历史课本，生活体验带是学园的公共课堂，创新带是学园的实验工坊**。[source:AGENT-TASKBOOK]

### 5–8 个全球 AI 创新生态案例

| # | 案例 | 学园转化经验 |
| --- | --- | --- |
| 1 | 硅谷斯坦福研究园 | 大学-园区-资本近距离转化、课程与产业环环相扣 |
| 2 | 波士顿肯德尔广场 | 产学研宿舍式共享、公共空间中偶遇创造 |
| 3 | 深圳南山科技园 | 从硬件制造到 AI 场景的快速迭代、测试即服务 |
| 4 | 新加坡纬壹科技城 | 无围墙园区、垂直绿化与步行友善、公共验证场 |
| 5 | 杭州云栖小镇 | 以开发者大会为运营引擎、场景开放测试 |
| 6 | 伦敦国王十字区 | 老铁路站区更新、知识经济与公共空间缝合 |
| 7 | 京都产官学城 | 传统街区与新兴技术的并置与对话 |

七组案例共同指向一条可转化为空间的经验：**创新带的核心不是楼宇密度，而是「可学习、可测试、可展示」的公共接口**。落到本方案即「一脊三环五链接」的学园结构，以及每处重点区的测试场/课堂/市集空间类型。[depth:three_level_scope_framework] [depth:overall_spatial_structure]

### 三区两翼协同回路

三处重点区构成「试炼场→总站→市集」的纵向主回路；中关村科技服务翼（要素全球化配置、IP 与资本赋能）与北侧众智园耦合，小月河场景赋能翼（AI 场景赋能与活力城市）与南侧大钟寺耦合，两翼为纵向主回路提供横向服务与场景供给，形成「两翼夹一脊、三环串一轴」的协同格局。[source:AGENT-TASKBOOK] [depth:overall_spatial_structure]

### AI 原生场景与未来城市形态

未来 AI 城市不是把传感器装遍全城，而是把 AI 能力变成**可学习、可拒绝、可暂停、可回滚**的公共接口。学园带把「AI 测试—AI 教育—AI 生活—AI 治理」组织成同一条公共学习链：今天在试炼场验证的技术，明天进入学园课堂，后天在居民生活中被使用与被讨论。[depth:overall_spatial_structure] [depth:municipal_new_infrastructure]

---

## 总体设计范围城市更新与控规深度城市设计

### 产业目标与功能布局

沿京张遗址公园主轴，自北向南组织「**研—学—用**」三极：

- **研（北·众智园）**：AI 研发加速用地（0802）与 AI 产业测试验证留白用地（16），承载全栈自主创新、具身智能受控测试。[data:geometry/land_use.geojson#LU-N1] [data:geometry/land_use.geojson#LU-N2]
- **学（中·原点社区）**：五校环校园创新带（0804）、科研创新用地（0802）、文化体验用地（0803）、社区服务配套用地（0702），承载课程链接、代际共学与公共课堂。[data:geometry/land_use.geojson#LU-M1] [data:geometry/land_use.geojson#LU-M2] [data:geometry/land_use.geojson#LU-M3]
- **用（南·大钟寺）**：智能原生商业街区（05）、成果转化文化街（0803）、人才社区（0701），承载成果展示、转化与智能消费。[data:geometry/land_use.geojson#LU-S1] [data:geometry/land_use.geojson#LU-S2] [data:geometry/land_use.geojson#LU-S3]

用地布局上，教育用地 2.1%、科研用地 13.7%、商业用地 2.8%、公园绿地 27.2%，与「学园带」的功能属性一致：**知识型用地与公共绿地构成主体，保证沿带可学习、可停留、可相遇**。[metric:land_use_education_ratio] [metric:land_use_research_ratio] [metric:land_use_green_ratio]

### 城市更新总体框架

以「**不拆老城、拆出接口**」为更新逻辑：沿京张遗址公园是公共绿脊与慢行学园脊，东西两侧既有社区与科研院所主要以功能织补、公共空间激活为主，保留社区肌理。[depth:retain_renovate_demolish] [depth:renewal_project_list]

拆改留分类（概念性）：沿公园轴线的低效厂房、库房与临建以**改造激活**为主，注入课堂、测试、展示功能；保留历史车站、老铁路构筑与社区生活圈；仅在确需承载核心学园功能的节点进行**新建**。具体拆改留须以官方现状建筑与权属数据为准。[depth:retain_renovate_demolish]

### 交通、轨道、市政与公共服务设施

- **轨道站点一体化**：五道口、清华东路西口、大钟寺站与学园链接联动，站点周边布置学园服务节点。[depth:traffic_rail_slow_parking]
- **慢行学园脊**：京张遗址公园绿脊作为南北贯通慢行主轴，串联三处重点区。[data:geometry/roads.geojson#ROAD-SPINE-001] [metric:spine_greenway_length_m]
- **五条学园链接**：五条东西向链接路连通五所高校与创新节点。[data:geometry/roads.geojson#ROAD-LINK-01] [data:geometry/roads.geojson#ROAD-LINK-03] [data:geometry/roads.geojson#ROAD-LINK-05]
- **停车与非机动车**：在重点区边缘设置停车换乘与共享骑行接驳，绿脊内部禁止机动车穿行。
- **新型基础设施**：算力调度、端侧算力、分布式能源与既有市政设施融合，作为概念建议提出。[depth:municipal_new_infrastructure]

### 京张遗址公园活力带

以「**学习型公园**」定位京张遗址公园活力带：不是只有座椅和花坛的静态绿带，而是布置 AI 公共课堂、测试演示、荣誉展示、代际共学点的动态学园走廊。[depth:blue_green_public_space] [data:geometry/green_space.geojson#GREEN-GREEN-SPINE]

### 城市风貌

以「**学院红砖 × 铁路锈色 × AI 冷光**」为基调：保留京张铁路的历史记忆色（锈红、铁灰），中段融入学院建筑的红砖与米白，AI 场景节点以克制的冷色光与界面灯作为氛围点缀，避免过度霓虹化。[depth:height_massing_character]

![交通慢行与蓝绿公共空间复合系统图](assets/figures/mobility-bluegreen.png)

---

## 重点区域详细设计

### 北·众智园 AI 自主创新加速区（全栈试炼场，约 192.1ha）

**定位**：AI 全栈自主创新体系的受控测试与加速器。[data:geometry/key_areas.geojson#PROV-KEY-001]

**空间结构**：西侧为 AI 研发加速用地（0802），东侧为 AI 产业测试验证留白用地（16），中部设众智园测试观演台——公众可从安全距离观看具身智能、无人配送等受控测试。[data:geometry/land_use.geojson#LU-N1] [data:geometry/land_use.geojson#LU-N2] [data:geometry/public_space.geojson#PUBLIC-DECK-001]

**建筑更新**：现状低效园区以改造激活为主，植入测试工坊、模拟实验室与研发加速器。[data:geometry/buildings.geojson#BLDG-001]

**交通慢行**：通过五道口轨道站与五环南侧的创新链接接入主城，内部设置受控测试车道与观演慢行廊。[depth:traffic_rail_slow_parking]

**公共空间**：试炼观演台、测试公共界面、北部生态绿楔。[data:geometry/public_space.geojson#PUBLIC-DECK-001] [data:geometry/green_space.geojson#GREEN-R1]

**AI 场景**：具身智能受控测试场、低空物流试飞走廊（概念）、AI 安防与巡检测试。

**实施风险**：测试场涉及安全与责任边界，须专业机构评估；北部绿楔涉及生态与防洪约束，须衔接蓝线与海绵专项。[depth:risk_missing_data]

### 中·北京 AI 原点社区（学园总站，约 104.3ha）

**定位**：世界级 AI 创新生态的核心公共课堂，五校环抱的学园总站。[data:geometry/key_areas.geojson#PROV-KEY-002]

**空间结构**：西侧为五校环校园创新带（0804）与科研创新用地（0802），东侧为文化体验用地（0803）与社区服务配套用地（0702），中央设原点广场。[data:geometry/land_use.geojson#LU-M1][data:geometry/land_use.geojson#LU-M2][data:geometry/land_use.geojson#LU-M3] 

**五校链接枢纽**：清华、北航、北邮、北理工、中科院群院所通过五条学园链接接入原点广场，课程、课题、实习与毕设在站点间流动。[data:geometry/roads.geojson#ROAD-LINK-01] [data:geometry/roads.geojson#ROAD-LINK-03]

**建筑更新**：校园边缘与社区交界植入代际共学中心、公共图书馆型 AI 教室、青年开发者客厅。[data:geometry/buildings.geojson#BLDG-065]

**公共空间**：原点广场承担露天课堂、成果发布、荣誉展示与节庆活动。

**AI 场景**：代际共学（老人与青年共上一门 AI 课）、课程级联实验室、公共 AI 科普课堂、无障碍语音导览。[standard:BARRIER-FREE-ENVIRONMENT-LAW]

**实施风险**：涉及校园用地与社区权属，须与高校、社区协商；五校链接涉及跨权属道路，须专业对接。[depth:risk_missing_data]

### 南·大钟寺 AI 产业聚集区（成果市集，约 72.0ha）

**定位**：智能原生新业态与成果转化的公共市集。[data:geometry/key_areas.geojson#PROV-KEY-003]

**空间结构**：西侧为智能原生商业街区（05），东侧为成果转化文化街（0803）与人才社区（0701），中央设成果广场。[data:geometry/land_use.geojson#LU-S1] [data:geometry/land_use.geojson#LU-S2] [data:geometry/public_space.geojson#PUBLIC-SQUARE-001]

**成果转化链**：来自众智园试炼场的成熟技术，经原点社区课堂验证后，在此转化为可体验的智能产品、业态与消费场景。

**建筑更新**：既有商业与办公建筑注入智能原生体验店、成果展示厅、初创服务客厅。

**公共空间**：成果广场承担产品发布、市集、路演与市民体验。

**AI 场景**：AI 生活服务体验、智能零售、无障碍出行、成果路演直播。

**实施风险**：涉及商业产权与运营主体，转化机制须专业运营团队深化；人才社区涉及居住配套与公共设施配建。[depth:risk_missing_data]

![三处重点区域索引与设计任务图](assets/figures/key-areas.png)

---

## AI 创新生态、人才画像与 AI+ 场景

### 五类用户画像

| 画像 | 人群 | 在学园带中的角色 |
| --- | --- | --- |
| P1 学生/青年教师 | 五校在读、青年教师 | 课程级联、毕设公开评审、实习与创业 |
| P2 研究者/工程师 | 科研院所、企业研发 | 测试验证、成果转化、算力与数据服务 |
| P3 居民/代际家庭 | 周边社区老人、儿童、家庭 | 代际共学、公共课堂、社区服务 |
| P4 创业者/开发者 | 初创团队、开源开发者 | 孵化加速、测试场地、开发者社区 |
| P5 游客/市民体验者 | 全市及外地访客 | AI 公共体验、文化朝圣、市集消费 |

### 不少于 10 张 AI 场景卡（概念建议）

| # | 场景卡 | 空间落位 | 服务对象 | 隐私/人工复核边界 |
| --- | --- | --- | --- | --- |
| 1 | 具身智能受控测试场 | 众智园留白用地 | P2 工程师 | 受控封闭、安全员全程监督 |
| 2 | 无人配送低速测试线 | 众智园内部 | P2/P4 | 划定测试区、人工接管 |
| 3 | AI 安防巡检测试 | 众智园园区 | P2 | 数据脱敏、监管沙盒 |
| 4 | 课程级联实验室 | 原点社区校园带 | P1 | 校内授权、教师人工复核 |
| 5 | 代际共学 AI 课堂 | 原点社区广场 | P3 | 未成年人/老人人工陪伴 |
| 6 | 公共 AI 科普展廊 | 原点社区文化带 | P5 | 内容人工审核 |
| 7 | 无障碍语音导航 | 全带节点 | P3 特殊人群 | 隐私最小化、无摄像头追踪 |
| 8 | 智能原生零售体验店 | 大钟寺商业街 | P5 | 交易数据合规、人工客服 |
| 9 | 成果路演与产品发布 | 大钟寺成果广场 | P2/P5 | 发布内容人工审核 |
| 10 | 城市运行公开仪表盘 | 原点广场 | P5/P3 | 聚合脱敏、不披露个体 |
| 11 | 算力潮汐公共提示 | 学园脊节点 | P5 | 仅能源/负荷聚合信息 |
| 12 | 测试即服务实验室 | 众智园研发带 | P2/P4 | 委托方协议、人工验收 |

以上场景均为**概念建议**，其中第 1、2、3、12 张为 AI 产业测试验证场景。所有场景均明确服务对象、空间落位、运行数据、隐私边界、人工复核与运营主体，未成熟技术不表述为已可全面部署。[depth:overall_spatial_structure] [depth:municipal_new_infrastructure]

---

## 用地、建筑规模与拆改留方案

### 用地布局

用地以京张遗址公园绿脊为轴，东西两侧按「研—学—用」三极布置。教育用地（0804）集中于中段五校环校园带，科研用地（0802）分布于众智园与原点社区，商业用地（05）集中于大钟寺，公园绿地（1401）沿公园脊与北部绿楔展开。[data:geometry/land_use.geojson][metric:land_use_education_ratio][metric:land_use_research_ratio] 

### 建筑规模与开发强度

当前方案建筑密度 10.8%，估算容积率约 0.72（按平均 4 层设想）。**这是概念性设想，不是法定指标**；官方控规的容积率、建筑高度、退线等条件缺失，须以 `planning_limits.json` 标注的待补资料为准。[metric:building_density] [metric:floor_area_ratio]

### 拆改留分类（概念性）

- **保留**：京张铁路遗址、历史车站、社区生活圈肌理。
- **改造**：沿带低效厂房、库房、临建，注入学园与测试功能。
- **新建**：仅在核心学园节点（原点广场周边、试炼场配套）进行适度新建。

具体地块级拆改留须以官方现状建筑、权属与控规为准，本方案不作出地块级结论。[depth:retain_renovate_demolish]

---

## 交通、轨道、市政与公共服务设施

### 道路与慢行

- **京张学园脊**（南北主轴）：遗址公园绿脊贯通，禁止机动车穿行，供步行与骑行。[data:geometry/roads.geojson#ROAD-SPINE-001]
- **五条学园链接**（东西向）：连接五校与三处重点区，公交优先。[data:geometry/roads.geojson#ROAD-LINK-01][data:geometry/roads.geojson#ROAD-LINK-02][data:geometry/roads.geojson#ROAD-LINK-03]  
- **重点区内环**：试炼场、学园、市集各设内部慢行环。[data:geometry/roads.geojson#ROAD-LOOP-N1]

### 轨道与站点一体化

五道口、清华东路西口、大钟寺站与学园链接联动，站点周边布置学园服务节点、停车换乘与共享骑行接驳。[depth:traffic_rail_slow_parking]

### 市政与新型基础设施（概念建议）

算力调度中心、端侧算力节点、分布式能源、无感支付与既有市政设施融合。以上均属概念建议，不涉及工程可行性结论。[depth:municipal_new_infrastructure]

---

## 蓝绿空间、公共空间与城市风貌

### 蓝绿系统

- **京张遗址公园活力绿脊**：约 311 公顷概念绿脊，南北贯通。[data:geometry/green_space.geojson#GREEN-GREEN-SPINE] [metric:land_use_green_ratio]
- **北部生态绿楔**：约 120 公顷防护绿地，衔接五环与清河生态。[data:geometry/green_space.geojson#GREEN-R1]
- **人才社区绿园**：大钟寺人才社区内的社区级绿地。[data:geometry/green_space.geojson#GREEN-S3]

### 公共空间

原点广场（学园总站）、大钟寺成果广场（市集）、众智园测试观演台（试炼场）三处公共活动界面，分别承载课堂、发布、观演三类公共功能。[data:geometry/public_space.geojson#PUBLIC-PLAZA-001][data:geometry/public_space.geojson#PUBLIC-SQUARE-001][data:geometry/public_space.geojson#PUBLIC-DECK-001] 

### AI 朝圣地标与荣誉展示节点

以下三个 AI 朝圣地标/荣誉展示节点均为**概念建议**，不作已批准建设的表述：[depth:blue_green_public_space] [depth:overall_spatial_structure]

1. **原点钟楼（学园总站）**：以京张老站钟楼为原型改造，指针象征 AI 学习的迭代节奏，是学园带的纪念性核心。
2. **试炼墙（众智园）**：一面记录历次 AI 受控测试成果的公共墙面，荣誉展示系统的基础设施。
3. **成果星谱（大钟寺）**：在成果广场以星谱灯阵展示历届 AI 成果与开发者荣誉，让创新被公共看见。

地标、导视、Logo、字体、图像、人物与企业标识均须清权，不得过度娱乐化。[source:AGENT-TASKBOOK]

### 城市风貌与导视

以「学院红砖 × 铁路锈色 × AI 冷光」为基调，导视系统统一「学园环」视觉语言，将命名、Logo、符号系统贯穿全带。[depth:height_massing_character]

---

## 更新项目清单、实施政策与分期计划

### 更新项目清单（概念性）

| 项目 | 位置 | 类型 | 分期 |
| --- | --- | --- | --- |
| 原点广场与学园总站 | 原点社区 | 新建+改造 | 一期 |
| 代际共学中心 | 原点社区 | 改造 | 一期 |
| 五校链接慢行贯通 | 中段 | 改造 | 一期 |
| 众智园测试验证场 | 众智园 | 新建+改造 | 二期 |
| 试炼观演台 | 众智园 | 新建 | 二期 |
| 大钟寺成果广场 | 大钟寺 | 新建 | 三期 |
| 智能原生商业街激活 | 大钟寺 | 改造 | 三期 |

### 实施政策（概念建议）

土地混合利用、学园-园区共建机制、场景开放沙盒、开发者社区运营。以上均属政策机制建议，不作已确定政府安排的表述。[depth:renewal_project_list]

### 分期计划

`PHASE-001` 一期（原点学园示范段）→ `PHASE-002` 二期（众智园测试场）→ `PHASE-003` 三期（大钟寺成果市集）。[data:geometry/phasing.geojson#PHASE-001][data:geometry/phasing.geojson#PHASE-002][data:geometry/phasing.geojson#PHASE-003]   

### 全球 AI 创新活动体系与长期运营（概念建议）

- **年度活动体系**：原点春季开学季、夏季试炼公开赛、秋季成果发布周、冬季代际共学节。
- **开发者社区运营**：开放场景沙盒、代码贡献榜、荣誉星谱联动。
- **公共体验路线**：沿学园脊的「入门—进阶—发表」公共体验路径。
- **国际传播**：以「一条可以学习的城市线」为核心叙事，吸引全球开发者与学习者。

以上活动、招商、资金、政策与运营安排均须表述为**概念建议或深化方向**，不作已确定政府安排。[depth:phasing_implementation] [source:AGENT-TASKBOOK]

---

## 指标体系、面积复算与合规矩阵

### 核心指标与设计含义

- **绿地占比 38.6%**：支撑学园带的可停留与健康体验，是人才与居民愿意留下来的基础。[metric:green_ratio]
- **公共空间占比 1.9%**：三处公共广场承载课堂/发布/观演，是小而关键的创新交往界面。[metric:public_space_ratio]
- **科研+教育用地 15.8%**：体现「可学习」主线，是知识型创新生态的空间底座。[metric:land_use_research_ratio] [metric:land_use_education_ratio]
- **建筑密度 10.8%**：低密度高绿地的发展逻辑，符合遗址公园与学园带的功能属性。[metric:building_density]

### 复算与合规矩阵

- 三层范围、三处重点区、23 项强制需求、6 项 agent 任务全覆盖于 `compliance_matrix.json`。
- 9 项专业标准覆盖于 `standard_matrix.json`。
- 15 项设计深度项均达 `complete` 于 `design_depth_matrix.json`。
- 全部指标由几何复算，见 `metrics.json`。[metric:site_area_sqm] [metric:land_use_gap_sqm]

![核心指标复算与证据链图](assets/figures/metrics-evidence.png)

---

## 风险、版权与合规说明

### 数据与几何风险

- 三处重点区与边界均为临时粗略 polygon，官方红线发布后须整链重算。[source:BOUNDARY-SOURCE]
- 容积率、建筑高度、拆改留、道路红线等法定条件缺失，方案中均为概念性设想，须以官方控规为准。[source:OFFICIAL-ANNOUNCEMENT]

### 版权与合规

- 本方案全部引用公开或已清权资料，来源见 `sources.json`。
- 涉及地名、企业、高校名称仅作概念性引用，未声称获得授权或背书。
- 全部空间建议表述为「概念建议/参考方案/供专业团队深化研究」，不构成政府审定结论或实施承诺。
- 未使用非公开规划图件、非公开空间数据、内部控制指标或个人隐私数据。

引用 `report/copyright_statement.md`。[source:SOURCE-REGISTRY]

---

## 参考资料

以下为影响本方案判断的主要人类可读书目，完整机器索引见 `sources.json` 与三个矩阵文件。[source:SOURCE-REGISTRY]

1. 百年京张AI创新带城市设计国际方案征集资格预审公告（北京市规划和自然资源委员会海淀分局）
2. 面向全球智能体开展"百年京张AI创新带城市设计开源征集"的任务书摘录（用户提供清权文档）
3. 《城市设计管理办法》（住建部）
4. 《城市、镇控制性详细规划编制审批办法》（住建部）
5. 《国土空间调查、规划、用途管制用地用海分类指南》（自然资源部）
6. 《生成式人工智能服务管理暂行办法》
7. 《中华人民共和国无障碍环境建设法》
8. 《关于切实解决老年人运用智能技术困难实施方案》（国办发〔2020〕45号）
9. 百年京张AI创新带临时粗略边界与三处重点区 polygon（仓库维护者推定）
10. 全球 AI 创新生态公开案例研究（斯坦福、肯德尔广场、纬壹科技城等公开资料）
