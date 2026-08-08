---
title: "京张开源带：从自主铁路到开源城市的城市级开源协议"
author_github: "liulingfei-1"
language: "zh"
license: "CC-BY-4.0"
summary: "把城市当作开源项目来运营：以京张铁路遗址公园为主线（TRUNK），以功能片区为提交节点（COMMIT），以东西缝合廊道为提案连廊（PR），以三区两翼为发布与测试环境，让每个空间决策都可提交、可评审、可合并、可回滚，形成百年京张文化带、都市AI生活体验带与AI融合创新带。"
tracks: ["ai-public-services", "youth-friendly-public-space", "civic-agent-governance"]
scenarios: ["ai-cultural-guide", "ai-health-service-navigation", "ai-traffic-walkability", "enterprise-service-copilot", "public-safety-operations-review", "robot-delivery-low-speed"]
iteration: "v1.0"
version: "1.0.0"
---

# 京张开源带：从自主铁路到开源城市的城市级开源协议

英文名：JINGZHANG OPEN BELT（JZ·OPEN）

副标题：从自主铁路到开源城市 / From the Self-Reliant Railway to the Open-Source City

核心宣言：**城市，像开源代码一样开放——每个空间决策都可提交、可评审、可合并、可回滚。**

本成果是面向社区开源征集的概念建议、参考方案与可供专业团队深化研究的材料；它不替代正式规划，不构成政府审定结论。所有基于临时边界的面积和比率只是可复算的工作值，official polygons 到位后必须整体重算。

## 设计依据与资料清单

“京张开源带”把证据分为四级：官方公告与法定标准回答“任务与责任是什么”；官方历史、遗产与建设公开信息回答“为什么这条铁路值得延续”；全球案例回答“哪些机制值得比较”；仓库 provisional geometry 只回答“怎样先跑通拓扑、图面与自检”。四级不得混写。项目名称、43.6 平方公里统筹研究范围、11.4 平方公里总体设计范围、368.4 公顷重点区域以及三处片区约值来自公告 [source:DATA-SRC-OFFICIAL-ANNOUNCEMENT-20260509]；实际提交 polygon 来自 [source:DATA-SRC-PROVISIONAL-BOUNDARIES-20260605]，在 [data:geometry/site_boundary.geojson#SITE-001] 与 [data:geometry/key_areas.geojson#KEY-001] 中均标为 `official_boundary=false`、`geometry_role=provisional_constraint`、`boundary_precision=provisional_rough`。

数据治理遵循 [source:DATA-SRC-AGENT-TASKBOOK-20260518] 的十条共创原则，用途分级遵循公开来源登记表 [source:SOURCE-REGISTRY]，任务范围清单与缺口核对使用处理资料包 [source:PROCESSED-FACT-PACK]，EPSG:4326 交换与 EPSG:4548 量算规则遵循站点包 [source:SITE-PACKAGE]。用地、公共空间与城市风貌响应 [standard:MOHURD-URBAN-DESIGN-MEASURES] 及其来源 [source:DATA-SRC-MOHURD-URBAN-DESIGN-MEASURES]；控规法定边界响应 [standard:MOHURD-CONTROL-DETAILED-PLANNING] 及其来源 [source:DATA-SRC-MOHURD-CONTROL-DETAILED-PLANNING]；分类术语响应 [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE] 及其来源 [source:DATA-SRC-MNR-LAND-USE-CLASSIFICATION-202311]。公告与智能体任务分别由 [standard:PROJECT-OFFICIAL-ANNOUNCEMENT]、[standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK] 统领；[standard:MOHURD-ARCH-DESIGN-DEPTH-2016] 因官方文件未入库维持 data gap，不冒充已满足依据。[depth:existing_conditions_diagnosis]

![总体概念、主线绿带与临时边界状态图](assets/figures/site-overview.png)

本包不使用商业地图截图、远程瓦片、人物肖像或品牌图形。几何、指标、矩阵和图纸由本地确定性脚本生成；文字与设计候选由 AI 协助，但来源选择、许可证、概念方向和远端发布由人类用户决定。原创文字、图解、设计图层、HTML 与 PDF 采用 CC-BY-4.0，第三方材料保留原权利与用途边界。[source:SITE-PACKAGE]

## 三层范围工作框架

三层工作通过同一条“开放协议链”上下传导。统筹研究范围（约 43.6 平方公里）讨论创新生态、区域协同与公共价值，不绘制新的精确红线；总体设计范围（约 11.4 平方公里）以“主线 TRUNK—提交节点 COMMIT—提案连廊 PR—测试环境 FORK—议题网格 ISSUE”形成空间语法；三处重点区域验证不同类型的开放与创新机制。范围级别见 [data:geometry/site_boundary.geojson#SITE-001]，重点区索引见 [data:geometry/key_areas.geojson#KEY-001]、[data:geometry/key_areas.geojson#KEY-002]、[data:geometry/key_areas.geojson#KEY-003]。[depth:three_level_scope_framework]

“主线 TRUNK”借用开源软件的主分支概念：京张铁路遗址公园是城市的 main branch，一切公共创新沿主线生长；“提交节点 COMMIT”把一项城市功能绑定到一个片区、一组空间接口和一条可复算的证据链；“提案连廊 PR”是东西向步行、骑行、无障碍与服务接续的廊道，让两侧社区、高校、园区可以向主线“提交提案”；“测试环境 FORK”允许机器人、智能体或新业态先在有限时间、有限人群、有限空间中沙盒试验，通过评审后才合并；“议题网格 ISSUE”把居民反馈当作城市问题追踪器，公开、可追踪、可关闭、可回滚。总体结构不是一张技术覆盖网，而是一套优先保护老人、儿童、照护者、残障人士、夜间劳动者和普通居民选择权的城市规则。[depth:overall_spatial_structure]

![主线、提交节点、提案连廊与用地结构图](assets/figures/land-use-structure.png)

三处重点区承担不同角色：众智园AI自主创新加速区是“持续集成场（CI）”与开源验收场；北京AI原点社区是“核心仓库”与开源协议零点；大钟寺AI产业集聚区是“发布中心”与社区参与大厅。两翼提供要素与场景：中关村科技服务翼是“包管理仓库（Registry）”，提供资本、IP 与全球化配置；小月河场景赋能翼是“暂存环境（Staging）”，提供真实场景测试。所有位置只是对临时边界的概念映射，不能推导权属、拆建、道路红线或工程可行性。[source:DATA-SRC-AGENT-TASKBOOK-20260518]

## 统筹研究范围产业与未来城市研究

国际比较只提取机制，不复制形态。Helsinki 3D 城市模型说明开放数据格式、版本与公共复用是城市智能化的基础 [source:CASE-HELSINKI-3D]；新加坡榜鹅数码园区（PDD）说明物理 AI 需要研究、测试、部署、运营反馈的分级安排 [source:CASE-PUNGGOL-PDD]；伦敦 King's Cross 展示铁路工业遗产更新需要长期公共空间与混合使用组织 [source:CASE-KINGS-CROSS]；巴塞罗那 Decidim 说明提案、讨论、决策与反馈应留下可追溯记录 [source:CASE-BARCELONA-DECIDIM]；阿姆斯特丹算法登记册把上线后的监测与退役纳入责任 [source:CASE-AMSTERDAM-ALGORITHM]；巴黎十五分钟城市强调日常服务可达与照护绩效 [source:CASE-PARIS-15M]；Milton Keynes MK:Smart 把技术试验放进城市产业与服务战略而非孤立展项 [source:CASE-MILTON-KEYNES]；多伦多 Quayside 作为负面治理提醒：数据治理、公众信任和退出权应先于技术规模化 [source:CASE-TORONTO-QUAYSIDE]。

据此形成四层创新生态：第一层是高校、研究机构和开源社区的知识策源（对应 AI 原点社区与中部教育集群 [data:geometry/land_use.geojson#LU-005]）；第二层是算力、数据、评测、安全与标准等共享基础设施（对应众智园 [data:geometry/land_use.geojson#LU-009]）；第三层是企业、公共部门与社区共同提出的场景（对应大钟寺 [data:geometry/land_use.geojson#LU-003]）；第四层是申诉、审计、故障档案与退役机制。产业价值不只统计企业或活动数量，还要观察复用协议、跨运营商互操作、问题关闭时间、无 AI 替代通道与公众异议处理。[depth:overall_spatial_structure]

京张铁路由中国人自主设计建造的历史意义（1905 年开工、1909 年通车，詹天佑任总工程师，创造“人”字形展线），支持“可验证、自主负责、开放共享”的叙事，但不能被简化成科技装饰 [source:JINGZHANG-HISTORY-NRA]。遗址公园的公开规划与阶段建设说明这条线已经承担城市缝合和公共空间角色 [source:JINGZHANG-PARK-BJGH]。中关村从 1988 年“电子一条街”到国家自主创新示范区的历程，说明“开放—试验—迭代—扩散”正是海淀创新的原生节奏 [source:ZHONGGUANCUN-ZGC]。未来城市研究把 AI 看作可撤回的公共服务能力，而不是无处不在的感知基础设施；中关村与 AI 原点社区背景只用于识别策源与转化关系，不编造企业名单、产值或招商承诺。[source:DATA-SRC-OFFICIAL-ANNOUNCEMENT-20260509]

## 总体设计范围城市更新与控规深度城市设计

总体设计把约 11.413 平方公里临时 polygon 划分为 11 个连续响应单元（10 个功能带 + 1 条主线绿带），完整覆盖且不重叠；这只是从同一边界确定性切分出的概念功能倾向，不能替代控规 [standard:MOHURD-CONTROL-DETAILED-PLANNING]。用地证据位于 [data:geometry/land_use.geojson#LU-001] 至 [data:geometry/land_use.geojson#LU-010] 与 [data:geometry/land_use.geojson#LU-TRUNK]，建筑原型位于 [data:geometry/buildings.geojson#BLDG-RD-1]，概念慢行位于 [data:geometry/roads.geojson#ROAD-TRUNK]，待补约束以数据缺口标记位于 [data:geometry/constraints.geojson#GAP-BOUNDARY]。[depth:land_use_layout]

城市更新不先做“拆、改、留”结论，而是设置三道门，对应开源的“评审—合并”流程。第一道是证据门：核对权属、年代、结构、使用、消防、文保和控规；第二道是公共价值门：比较保留修缮、适应性再利用和新建的碳、可达与服务影响；第三道是授权门：由责任部门、权利人、专业团队和公众程序决定。当前 buildings.geojson 仅是“未来专业深化可替换的空间接口原型”，其总基底工作值不能识别任何现状建筑，更不能支持拆除。[depth:retain_renovate_demolish] [depth:height_massing_character]

每项 AI 服务使用“草稿 Draft—评审 Review—合并 Merge—发布 Release—回滚 Rollback”五状态生命周期，与开源软件发布流程同构。服务护照必须写明 owner、purpose、data、retention、model/version、evaluation、human review、non-AI channel、appeal、release trigger、rollback trigger、incident、audit 与 retirement。未通过评审的服务不进入公共空间；观测到安全、公平、可达或隐私异常时转人工或回滚。该机制参考 [source:NIST-AI-RMF] 与 [source:UNESCO-AI-ETHICS]，并服从 [source:PIPL]。它是治理建议，不是既有行政流程。[depth:development_intensity_controls]

## 重点区域详细设计

**众智园AI自主创新加速区——“持续集成场（CI）”**。概念动作包括：开源验收场（Open Testbed）承担多运营商机器人会车、标准与安全工作坊、低碳算力解释节点和清河文化学习界面；试验侧线按时段封闭、限速、人工值守和事件记录运行；任何设备进入公共道路前仍需交通、安全和运营许可。片区详细设计引用 [data:geometry/key_areas.geojson#KEY-001]，不能把粗略 polygon 当作园区或地块边界。

**北京AI原点社区——“核心仓库（Core Repository）”**。概念动作包括：开源协议零点（Protocol Zero）作为城市开源协议 v0.1.0 的发布地、无障碍服务台、开源成果发布厅、照护者与儿童共用的可转换空间、夜间安全路线和非数字服务窗口。这里优先测试公共 AI 是否真的减少办事负担，而不是增加登录、授权和设备门槛。片区详细设计引用 [data:geometry/key_areas.geojson#KEY-002]，站点一体化与建筑更新必须等待交通、权属与现状调查。

**大钟寺AI产业集聚区——“发布中心（Release Hub）”**。概念动作包括：发布广场、Changelog 长廊、青年开源夜校、可核验遗产学习、公共设施公平预约、节庆人流响应和长期故障档案展。商业、内容与智能终端体验保留无追踪、无个性化的普通选择。片区详细设计引用 [data:geometry/key_areas.geojson#KEY-003]。[depth:three_key_area_detailed_design]

![三处重点区定位、空间抓手与专业深化条件图](assets/figures/key-areas.png)

三区共同设置四类朝圣地标（详见“蓝绿空间、公共空间与城市风貌”）：0.1.0 里程碑广场、合并桥（Merge Bridge）、开源验收场、Changelog 长廊。地标应轻触地面、可逆、不依附文物本体，落位前须取得文物与场地专业意见 [source:TSINGHUAYUAN-HERITAGE]。这种“可见的开放过程”比大型屏幕或拟人机器人更能形成持久辨识度。

## AI 创新生态、人才画像与 AI+ 场景

六类合成画像用于挑战设计，不对应真实个人：青年开发者与创业者关注开源协作、算力与数据访问、活动与融资路径；高校师生与研究者关注共学空间、真实数据与评测基准；银发居民关注阴凉、休息、人工服务与紧急求助；带娃家庭与照护者关注可见边界、低刺激与不持续追踪；残障人士关注连续无障碍与设备失效后的接续；夜间维护与配送劳动者关注照明、补给、限速和人机协同。画像只定义需求，不采集个人轨迹或推断身份 [source:WCAG22]。

十二张场景卡均包含用户、空间、数据、AI 作用、人工兜底和停止条件：

- S01 主线漫游：沿京张主线绿带提供无障碍步行、骑行与休息路线提示，设备失效时保留固定导视。
- S02 PR 提案亭：居民在公共节点向城市提交改进提案，提案公开、可追踪、可合并或关闭。
- S03 ISSUE 报修：公共设施故障通过议题网格报修，修复状态公开，超时自动升级人工。
- S04 沙盒体验：低速机器人与无人配送在限定侧线运行，具备人工遥停、让行与事故记录。
- S05 开源夜校：面向开发者与市民的 AI 共学空间，线上线下结合，保留无设备通道。
- S06 智能接驳：轨道、慢行与共享出行的接续服务，优先解决下车后的无障碍与照明。
- S07 城市仪表盘：公共数据以可读形式展示，不追踪个人，聚合指标可复算。
- S08 隐私哨兵：在人脸识别或感知设备边界设置提示，说明用途、留存与退出方式。
- S09 遗产讲解：每个历史解释回指权威来源，争议内容提供人工勘误渠道。
- S10 绿色运维：蓝绿系统监测数据公开，支持公众认养与观察。
- S11 应急回滚：暴雨、断网、传感器失效时触发安全降级，以人工安全命令优先。
- S12 荣誉墙：贡献者与开放成果展示，透明记录谁做了什么、如何被验证。

四项产业测试形成可审计门：T01 多主体机器人联锁，验证让行、遥停和日志互认（众智园 CI 场）；T02 公共 AI 服务协议互操作，验证服务护照、身份最小化与人工转接；T03 极端天气降级，验证断网、传感器失效与权威预警冲突时安全退出；T04 无障碍与公平挑战，邀请不同能力和语言用户发现失败。任何测试未达到预设门槛时停留在沙盒，不因展示需求提前合并或发布。[depth:municipal_new_infrastructure]

## 用地、建筑规模与拆改留方案

land_use.geojson 由同一临时 SITE_BOUNDARY 在 EPSG:4548 中切分后再交换为 EPSG:4326，因此相邻单元共享边界、全域覆盖、无重叠。分类使用自然资源部指南登记的代码，但只表达概念功能倾向 [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE] [source:DATA-SRC-MNR-LAND-USE-CLASSIFICATION-202311] [data:geometry/land_use.geojson#LU-001]。当前分区工作值如下（均为临时边界内设计分区，不构成法定用地性质）：

- 05 商业服务业用地：南部门户（约 53.5 公顷）与大钟寺智能原生消费（约 33.7 公顷）两个分区，合计约 87.2 公顷；表达轨道接驳、发布与消费的功能倾向。
- 0701 城镇住宅用地：中部宜居社区约 176.9 公顷；表达主线两侧高密度宜居生活带的功能倾向。
- 0702 城镇社区服务设施用地：众智园南过渡带约 77.7 公顷；表达社区服务与创新配套接续的功能倾向。
- 0802 科研用地：原点社区南区约 72.5 公顷与众智园约 168.7 公顷；表达 AI 策源与加速的功能倾向。
- 0803 文化用地：大钟寺文化学习约 33.4 公顷与原点社区文化中心约 49.9 公顷；表达文化叙事与发布的功能倾向。
- 0804 教育用地：中部共学集群约 117.1 公顷；表达高校协同的功能倾向。
- 0902 二类工业用地：北部门户约 98.9 公顷；表达 AI 研发制造中试的功能倾向。
- 1401 公园绿地：京张主线绿带约 258.8 公顷 [metric:green_space_area_sqm]；表达城市主线与公共空间的功能倾向。

建筑层不使用虚构的现状底数。buildings.geojson 中的 9 个原型表达“什么类型的空间接口可能需要”：AI 研发、实验室、孵化器、文化中心、教育、社区服务、混合功能、人才公寓与交通接驳；总基底工作值 [metric:building_footprint_area_sqm] [metric:building_footprint_ratio]。每个原型标注 `conceptual_only=true`、`geometry_role=design_proposal`，不对应具体建筑、产权或层数。[data:geometry/buildings.geojson#BLDG-RD-1]

拆改留使用“证据—公共价值—授权”三门，不用一张颜色图预先决定命运。保留优先核对历史、社区和碳价值；改造优先检验结构安全、消防、无障碍与适应性再利用；新建只在功能缺口、专业条件和法定程序同时满足时讨论。容积率、总建筑面积、建筑高度和法定建筑密度均保持 unknown，原因与解锁条件写入 metrics 与 assumptions。[depth:development_intensity_controls] [depth:retain_renovate_demolish]

## 交通、轨道、市政与公共服务设施

交通策略不是绘制新道路，而是把“接续是否可靠”作为第一指标。roads.geojson 包含一条概念主线绿道（TRUNK）与三条提案连廊（PR-C1/PR-C2/PR-C3）：主线服务步行、骑行、遗产学习与低速试验；连廊连接东西两侧的站点、社区、高校与公共服务。所有线都由临时边界裁切，线长工作值见 [metric:road_centerline_length_m] [data:geometry/roads.geojson#ROAD-TRUNK]，不代表道路红线、桥隧方案或施工可行性。[depth:traffic_rail_slow_parking]

对轨道接驳，方案先描绘用户旅程：下车后能否找到无障碍路径、阴凉休息点、人工服务与夜间照明；对机器人，方案先确定让行、限速、遥停与事故处理；对自行车，方案先解决断点与安全停放；对小汽车，方案只提出停车需求调查与共享评估，不给出供给数量。关键接口以 [data:geometry/constraints.geojson#GAP-ROAD] 标为待核数据，进入专业深化前必须取得道路、站点与交通专项。

市政与公共服务采用“接口清单”而非容量承诺：端侧算力需要能源、散热、网络与维修责任；遮阴、饮水、厕所与休息需要设施底数与运维；暴雨绕行需要权威预警、排水与封控；应急服务需要明确人工指挥。没有管线、消防、防洪、能源与设施容量时，不做设备数量或负荷测算。[data:geometry/constraints.geojson#GAP-MUNICIPAL] [depth:municipal_new_infrastructure]

![交通慢行、蓝绿主线与AI场景节点关系图](assets/figures/mobility-bluegreen.png)

## 蓝绿空间、公共空间与城市风貌

蓝绿系统把连续性、阴凉、休息、雨洪安全与生境放在技术展示之前。green_space.geojson 由主线绿带构成，临时边界内工作面积约 258.8 公顷、比率约 22.7%；public_space.geojson 由三条 PR 连廊与四处广场节点组成，工作面积约 50.2 公顷、比率约 4.4%。[data:geometry/green_space.geojson#GREEN-TRUNK] [data:geometry/public_space.geojson#PUBLIC-PLAZA-ORIGIN] [metric:green_ratio] [metric:public_space_ratio]

这些比率不是官方绿地率或公共空间标准，只是当前设计 geometry 的可复算结果。图面把 provisional boundary 用低对比虚线表示，把主线绿廊、连廊节点、重点区与安全接续置于前景。空间组件包括可移动遮阴、不同高度座椅、无障碍补给台、人工服务窗口、低刺激提示、离线导视、机器人遥停点与事件公告牌；每个组件都能在技术撤出后继续作为普通城市家具使用。[depth:blue_green_public_space]

**命名体系与视觉识别（agent.1）**。主名称“京张开源带”，英文 JINGZHANG OPEN BELT（JZ·OPEN）；命名体系以“提交—评审—合并—发布—回滚”为动词库，形成“主线 TRUNK / 提交节点 COMMIT / 提案连廊 PR / 测试环境 FORK / 议题网格 ISSUE / 变更日志 CHANGELOG”的空间命名族，任何新节点都可按该语法命名。Logo 方向：铁轨分叉与代码分支（branch）同构的“人”字形——致敬詹天佑的“人”字形铁路，同时表达开源合并；三色信号灯（红=回滚/停止、黄=评审/待合并、绿=合并/放行）构成状态语言。配色：炭黑（轨道与责任）、砖红（历史与公共行动）、信号绿/黄/红（开放状态）、米白（阅读背景）。状态同时用形状、文字、线型表达，不依赖颜色。该命名与 Logo 为概念方向，不申请商标，不使用未经授权字体、图片或人物肖像。[standard:MOHURD-URBAN-DESIGN-MEASURES] [depth:height_massing_character]

**四处 AI 朝圣地标（agent.4）**。L01 0.1.0 里程碑广场（AI 原点社区）：纪念城市开源协议 v0.1.0 发布，轻触地面、可逆；L02 合并桥 Merge Bridge（主线与 PR 连廊交汇处）：东西缝合的仪式空间，展示“提案—评审—合并”过程；L03 开源验收场 Open Testbed（众智园）：可重复测试、证据存档的公共实验场；L04 Changelog 长廊（大钟寺）：1909 京张通车、1988 中关村电子一条街、2026 开源带发布等里程碑事件墙。地标须经文物与场地专业审查，不依附文物本体，不发布未授权肖像或商标。[source:TSINGHUAYUAN-HERITAGE]

城市风貌以“铁路秩序 + 北京砖色 + 中关村开源文化”为方向，融合百年京张文化、中关村创新文化与 AI 新文化：炭黑表达轨道与责任，砖红表达历史与公共行动，信号色表达开放状态。清华园车站旧址与遗址公园相关节点必须轻触、可逆并经文物专业审查；历史叙事回引国家铁路局史料 [source:JINGZHANG-HISTORY-NRA]，不复制未授权图片。[standard:MOHURD-URBAN-DESIGN-MEASURES] [depth:height_massing_character]

## 更新项目清单、实施政策与分期计划

phasing.geojson 把临时范围切成四个可重算阶段，但阶段不是确定开发时序 [data:geometry/phasing.geojson#PHASE-01]。第一阶段“协议与共识”（v0.x，2026-2027）建立边界替换、设施调查、服务护照与公众问题库；第二阶段“沙盒试验”（v1.0，2027-2028）在可控空间开展互操作、无障碍与极端天气测试；第三阶段“条件放行”（v2.0，2028-2030）要求责任主体、数据合法性、评测、人工接管与保险等门槛齐备；第四阶段“观察与演进”（v3.0+，长期）公开事件、申诉、修复与退出记录。[depth:phasing_implementation]

八个更新项目包均为概念建议：P01 城市开源协议 v0.1.0（制度基础设施）；P02 京张主线绿带贯通（TRUNK）；P03 PR 连廊系统（东西缝合）；P04 开源验收场（众智园 CI）；P05 原点社区核心仓库（AI 原点社区）；P06 发布广场与 Changelog 长廊（大钟寺）；P07 服务护照与回滚机制（治理）；P08 京张 OPEN 四季运营（活动体系）。项目先满足资料、权属、专业和公众程序，再讨论投资或建设。[metric:renewal_project_count] [depth:renewal_project_list]

长期运营称为“京张 OPEN 四季”（agent.6）：春季 Open Call 发布年度可测试问题与数据缺口；夏季 Bug Bash 与无障碍挑战；秋季 Release Day 年度版本发布与评审；冬季 Retrospective 公开失败档案、修复结果与下一年度路线图。运营组织由公共部门、社区、专业机构、高校、企业与独立评测角色共同组成，任何单一平台不得同时拥有规则、数据、评测与申诉最终权。活动、品牌、资金与场地均需责任主体后续确认，当前不视为既定安排。[source:CASE-BARCELONA-DECIDIM] [source:CASE-AMSTERDAM-ALGORITHM]

## 指标体系、面积复算与合规矩阵

所有几何在 GeoJSON 中以 EPSG:4326 交换，在 EPSG:4548 中量算。当前 site_area_sqm 工作值 [metric:site_area_sqm] 约 11,412,603 平方米，来源是临时 boundary；land_use 分区面积复算 [metric:land_use_partition_area_sqm] 与 phasing 面积 [metric:phasing_area_sqm] 均与 site 一致；green_ratio [metric:green_ratio] 约 0.2267，public_space_ratio [metric:public_space_ratio] 约 0.0440，分别由 union 后面积除以 site 面积。数字保留是为了复算与发现错误，不意味着边界达到测绘精度。[metric:green_space_area_sqm] [metric:public_space_area_sqm] [depth:metrics_recalculation]

机器指标索引如下；每个 known 值都给出单位、公式、来源文件、置信度与 assumptions，unknown 值给出原因与正式数据触发条件：

- [metric:site_area_sqm]：约 11,412,603 sqm；area(submitted_site_boundary) in EPSG:4548；置信度 medium。
- [metric:land_use_partition_area_sqm]：与 site_area 一致；sum(area(land_use_features))；置信度 medium。
- [metric:building_footprint_area_sqm]：约 121,000 sqm；sum(area(concept_building_footprints))；置信度 medium。
- [metric:building_footprint_ratio]：约 0.0106；building_footprint_area_sqm / site_area_sqm；置信度 medium。
- [metric:green_space_area_sqm]：约 2,588,000 sqm；area(union(green_space))；置信度 medium。
- [metric:green_ratio]：约 0.2267；green_space_area_sqm / site_area_sqm；置信度 medium。
- [metric:public_space_area_sqm]：约 502,000 sqm；area(union(public_space))；置信度 medium。
- [metric:public_space_ratio]：约 0.0440；public_space_area_sqm / site_area_sqm；置信度 medium。
- [metric:road_centerline_length_m]：约 12,820 m；sum(length(concept_road_centerlines))；置信度 medium。
- [metric:phasing_area_sqm]：与 site_area 一致；area(union(phasing))；置信度 medium。
- [metric:key_area_count]：3 count；count(required_key_areas)；置信度 high。
- [metric:land_use_unit_count]：11 count；count(land_use_features)；置信度 high。
- [metric:renewal_project_count]：8 count；count(unique conceptual project_ids)；置信度 high。
- [metric:scenario_count]：12 count；count(S01..S12 scenario cards)；置信度 high。
- [metric:test_scenario_count]：4 count；count(T01..T04 test scenarios)；置信度 high。
- [metric:persona_count]：6 count；count(synthetic personas)；置信度 high。
- [metric:global_case_count]：8 count；count(formal positive international cases)；置信度 high。

compliance_matrix.json 覆盖公告 1.3/1.4/1.5 全部条目与 agent.1–agent.6 六项任务；standard_matrix.json 覆盖五项 mandatory 标准并保留一项 non-mandatory data gap；design_depth_matrix.json 覆盖十五项 formal 深度。矩阵的每一行都回到正文、GeoJSON、指标、图纸、来源、假设与 self-check，而不是把“complete”作为自证。A3 文册与 A0 展板是解释层，结构化数据仍是复算权威。[standard:PROJECT-OFFICIAL-ANNOUNCEMENT] [depth:risk_missing_data]

![核心指标、来源、假设与验收门证据链图](assets/figures/metrics-evidence.png)

机器可读图层总索引：[data:geometry/site_boundary.geojson#SITE-001]、[data:geometry/key_areas.geojson#KEY-001]、[data:geometry/land_use.geojson#LU-001]、[data:geometry/buildings.geojson#BLDG-RD-1]、[data:geometry/roads.geojson#ROAD-TRUNK]、[data:geometry/green_space.geojson#GREEN-TRUNK]、[data:geometry/public_space.geojson#PUBLIC-PLAZA-ORIGIN]、[data:geometry/constraints.geojson#GAP-BOUNDARY]、[data:geometry/phasing.geojson#PHASE-01]。该索引确保九个文件均可从正文到达。

## 风险、版权与合规说明

最高风险不是模型“不够聪明”，而是责任、边界与退出不可见。空间风险包括 official polygon、道路、地块、现状建筑、文保、市政与设施底数缺失；AI 风险包括目的漂移、过度采集、差异性错误、供应商锁定、无法申诉与退出后仍保留数据。对应控制是 fail closed：资料不足则标 unknown 或 provisional，测试不达门则停在沙盒，运行异常则转人工或回滚。[data:geometry/constraints.geojson#GAP-BOUNDARY] [depth:risk_missing_data]

隐私控制遵循最小必要、明确目的、最短留存、分级访问与可撤回原则 [source:PIPL]。明确禁止人脸识别式全域识别、社会评分、儿童持续追踪、基于脆弱特征的商业引导，以及模型单独作出高影响公共决定。公开指标只使用聚合或确定性几何；场景如需个体信息，必须由未来责任主体另行完成合法性、敏感信息、自动化决策与安全评估。本方案不是法律意见，也不声明任何具体系统已合规。

AI 输出边界参照 [source:NIST-AI-RMF] 与 [source:UNESCO-AI-ETHICS]：模型可以提出候选、解释与检查线索；schema、几何、指标、哈希与拒绝条件由确定性代码执行；专业人员确认规划、工程、文保与安全；公众拥有非 AI 通道、申诉与更正；维护者保留发布与现实采用判断。Toronto 经验提醒应把信任与退出放在扩张之前 [source:CASE-TORONTO-QUAYSIDE]。[depth:development_intensity_controls]

原创方案文字、视觉图解、agent 设计图层、HTML 与 PDF 采用 CC-BY-4.0。仓库 provisional geometry 不被本方案重新许可，外部网页、法律、标准与案例保留各自权利；本包不嵌入其照片、地图截图、商标或远程资产。版权细则见 report/copyright_statement.md。所有空间动作均为“概念建议”“参考方案”或“可供专业团队深化研究”，不构成法定规划、审批、工程、权属、投资或政府承诺。[source:SITE-PACKAGE] [source:WCAG22]

## 参考资料

以下清单按来源角色说明如何使用，而不是把链接数量当作研究质量。官方任务与法律承担权威事实，国际案例承担机制比较，仓库数据承担生成与自检；任何来源都不能超出其记录的 limitations。完整 URL、访问日期、许可摘要与禁止用途见 sources.json。

- [source:DATA-SRC-OFFICIAL-ANNOUNCEMENT-20260509] 百年京张AI创新带城市设计国际方案征集资格预审公告，发布者：北京市规划和自然资源委员会海淀分局。用途：确认项目名称、三层范围约值、三处重点区约值与设计任务。限制：不提供 official polygon、控规指标、工程线位或政府实施承诺。
- [source:DATA-SRC-AGENT-TASKBOOK-20260518] 面向全球智能体开展百年京张AI创新带城市设计开源征集任务书摘录，发布者：用户提供清权任务书/仓库维护者。用途：确认十条共创原则、三大定位、五大功能、六项智能体任务与边界条款。限制：不是官方红线、法定规划、工程可行性或政府决策依据。
- [source:SITE-PACKAGE] 百年京张AI创新带机器可读 site package，发布者：open-city-ai/haidian 仓库维护者。用途：读取临时边界、枚举、指标、schema、规划限制与标准清单。限制：provisional 数据不构成官方依据。
- [source:SOURCE-REGISTRY] 公开来源登记表，发布者：仓库维护者。用途：区分 formal-ready、background 与 provisional-only 来源。限制：登记表本身不新增事实。
- [source:PROCESSED-FACT-PACK] 处理资料包（任务清单、范围、来源用途矩阵、缺口清单），发布者：仓库维护者。用途：导航与任务核对。限制：原始来源仍为权威。
- [source:DATA-SRC-PROVISIONAL-BOUNDARIES-20260605] provisional boundaries GeoJSON，发布者：仓库维护者。用途：临时生成、可视化与自检。限制：provisional_rough，不得作为 official redline 或精确面积依据。
- [source:DATA-SRC-MOHURD-URBAN-DESIGN-MEASURES] 城市设计管理办法，发布者：住建部。用途：城市设计原则依据。
- [source:DATA-SRC-MOHURD-CONTROL-DETAILED-PLANNING] 控规编制审批办法，发布者：住建部。用途：控规框架依据。
- [source:DATA-SRC-MNR-LAND-USE-CLASSIFICATION-202311] 用地用海分类指南，发布者：自然资源部。用途：用地分类术语依据。
- [source:JINGZHANG-HISTORY-NRA] 京张铁路历史公开资料，发布者：国家铁路局/中国铁路公开史料。用途：确认 1905-1909 自主设计建造、詹天佑与“人”字形展线等历史事实。限制：仅作历史叙事，不复制图片。
- [source:JINGZHANG-PARK-BJGH] 京张铁路遗址公园公开规划信息，发布者：北京市规划和自然资源委员会等公开渠道。用途：确认遗址公园承担城市缝合与公共空间角色。限制：公开信息，不替代正式设计文件。
- [source:ZHONGGUANCUN-ZGC] 中关村科技园区公开发展历程资料，发布者：中关村科技园区管委会/北京市人民政府公开渠道。用途：确认 1988 电子一条街至国家自主创新示范区的历程。限制：仅作背景叙事。
- [source:CASE-HELSINKI-3D] Helsinki 3D city model 公开资料。用途：开放城市数据机制比较。
- [source:CASE-PUNGGOL-PDD] Singapore Punggol Digital District 公开资料（JTC）。用途：物理 AI 分级测试机制比较。
- [source:CASE-KINGS-CROSS] London King's Cross 更新公开资料。用途：铁路工业遗产长期更新机制比较。
- [source:CASE-BARCELONA-DECIDIM] Barcelona Decidim 参与式平台公开资料。用途：参与式治理与可追溯记录机制比较。
- [source:CASE-AMSTERDAM-ALGORITHM] Amsterdam Algorithm Register 公开资料。用途：算法透明与退役机制比较。
- [source:CASE-PARIS-15M] Paris 15-minute city 公开资料。用途：日常可达与照护绩效机制比较。
- [source:CASE-MILTON-KEYNES] Milton Keynes MK:Smart 公开资料。用途：数据基础设施与产业战略融合机制比较。
- [source:CASE-TORONTO-QUAYSIDE] Toronto Quayside 公开治理研究资料。用途：负面案例——数据治理、信任与退出权先于扩张。
- [source:NIST-AI-RMF] NIST AI Risk Management Framework（AI RMF 1.0）。用途：AI 风险管理框架参照。
- [source:UNESCO-AI-ETHICS] UNESCO Recommendation on the Ethics of AI。用途：AI 伦理原则参照。
- [source:PIPL] 中华人民共和国个人信息保护法。用途：隐私与个人信息处理边界。
- [source:WCAG22] WCAG 2.2 无障碍指南。用途：公共界面无障碍要求。
- [source:TSINGHUAYUAN-HERITAGE] 清华园车站旧址等文物保护公开信息。用途：文保节点轻触式设计约束。
