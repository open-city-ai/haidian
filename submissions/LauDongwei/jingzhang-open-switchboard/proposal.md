---
title: "京张开源换乘台：把 AI 验证带回城市日常"
author_github: "LauDongwei"
contributors: ["LauDongwei", "Wang Yilin"]
language: "zh"
proposal_format_version: "2"
translation_file: "proposal.en.md"
license: "CC-BY-4.0"
summary: "以京张遗址公园活力带为公共骨架，把研发验证、公共体验和社区服务组织成一条可步行、可复核、可暂停的开放网络。三处重点区分别承担加速、原点和转化，场景由小规模人工复核开始，逐步形成全球 AI 社区的可见入口。"
tracks: ["ai-traffic-walkability"]
iteration: "v0.1"
---

# 京张开源换乘台：把 AI 验证带回城市日常

**共同参与者：LauDongwei、Wang Yilin**

## 设计依据与资料清单
本方案把“开源”理解为一套可以被公众看见、被专业团队复核、被智能体继续修改的城市工作方式，而不是把技术装饰贴在普通园区上。项目任务、三层范围和三处重点区来自征集公告与已清权任务书；场地包同时明确了当前没有可验证正式红线，因此本包所有空间图层都保留临时约束标记。[source:OFFICIAL-ANNOUNCEMENT] [source:AGENT-TASKBOOK] [standard:PROJECT-OFFICIAL-ANNOUNCEMENT]

公开资料登记表把正式可用资料、背景资料和临时资料分开，本方案只把临时 polygon 用于生成和展示，不把它升级为审批依据。[source:SOURCE-REGISTRY] [source:BOUNDARY-SOURCE]

方案名称是“京张开源换乘台”，英文为 **JINGZHANG OPEN SWITCHBOARD**。Logo 方向是一条深红色历史轨迹线与一条青绿色开放线路在三个圆角方格中交接，三个方格代表“看见—验证—回到生活”；使用自绘线性符号，不调用任何企业商标、人物肖像或未清权字体。五张核心图从同一套 GeoJSON、指标和矩阵派生，正文是人类阅读层，JSON/GeoJSON 是机器复核层。[data:geometry/site_boundary.geojson#SITE-001] [data:geometry/key_areas.geojson#KEY-001] [depth:existing_conditions_diagnosis]

![总体概念与证据链](assets/figures/site-overview.png)

## 三层范围工作框架
统筹研究范围约 43.6 平方公里，承担产业协同、人才体系和未来城市研究；总体设计范围约 11.4 平方公里，以京张遗址公园及周边城市地区和产业区为主体，承担城市更新、用地、交通、市政、蓝绿网络和风貌策略；重点区域总计约 368.4 公顷，按北向南形成众智园加速、AI 原点社区、大钟寺产业聚集三处详细设计入口。[source:OFFICIAL-ANNOUNCEMENT] [depth:three_level_scope_framework] [metric:coordinated_research_area_sqm]

空间传导采用“上层定机制、中层定网络、下层定节点”：上层把高校、企业、资本、算力、数据和场景组织成开放交换机制；中层以京张记忆慢行主廊、AI 公共服务骨架和水岸横向联系形成连续空间；下层以公共验证广场、原点开放台、众智园共创前厅等节点承接具体场景。[data:geometry/roads.geojson#ROAD-001] [data:geometry/public_space.geojson#PUBLIC-003] [depth:overall_spatial_structure]

临时 polygon 来自仓库维护者根据公告文字四至和约面积形成的 rough constraint。它可以帮助本次方案先跑通，但不代表道路红线、权属或法定边界；正式资料到位后，site boundary、key areas、用地分区、项目分期、图纸和指标必须整体重算。[source:KEY-AREA-SOURCE] [standard:MOHURD-CONTROL-DETAILED-PLANNING] [depth:risk_missing_data]

![三层范围与空间结构](assets/figures/land-use-structure.png)

## 统筹研究范围产业与未来城市研究
方案提出“验证回路”而非单向招商链：高校和实验室提出问题，众智园提供可控测试，AI 原点社区把技术变成学习、照护、出行和公共服务体验，大钟寺承担内容消费与企业转化，中关村科技服务翼提供专业服务，小月河场景赋能翼提供真实但可退出的公共场景。这个回路同时回应百年京张文化带、都市 AI 生活体验带和 AI 融合创新带三大定位，以及 AI 全栈自主创新、世界级创新生态、AI+场景赋能、智能化活力城市、AI 治理全球话语权五项功能。[source:AGENT-TASKBOOK] [depth:overall_spatial_structure]

作为公开资料导向的参照案例，方案吸收六类机制而不复制其品牌：MIT Media Lab 的跨学科原型协作、Vector Institute 的人才与产业连接、Mila 的研究社区共享、one-north 的研发—生活混合、Barcelona Supercomputing Center 的算力公共性、Helsinki AI Register 的公共可解释性。它们转译成京张的六个空间动作：共享工坊、研究展廊、跨机构客厅、混合街区、低碳算力驿站和公共 AI 说明台；这些案例只是背景研究，正式判断仍以项目公告、任务书和本地专业资料为准。[source:SOURCE-REGISTRY] [metric:ai_scenario_node_count]

视觉识别采用“线路 + 方格 + 复核点”三件套：历史线用京张红，公共空间用水岸青，创新空间用铅灰和橙色，所有图面都把临时边界置于低对比虚线层。空间结构不是造一座孤立科技地标，而是让每次模型测试都能留下公众可读的解释、人工复核记录和可暂停出口。[data:geometry/land_use.geojson#LU-001] [data:geometry/green_space.geojson#GREEN-001] [depth:blue_green_public_space]

## 总体设计范围城市更新与控规深度城市设计
总体结构为“一廊、一骨架、三换乘、两翼、多点”：一廊是京张记忆慢行主廊，沿遗址公园形成南北连续的步行与骑行体验；一骨架是 AI 公共服务骨架，把公共验证广场、社区服务节点和场景开放运营中心串联；三换乘对应三处重点区的工作方式切换；两翼承接技术服务和小月河真实场景；多点则是十张场景卡与三处朝圣地标的可见接口。[data:geometry/roads.geojson#ROAD-001] [data:geometry/public_space.geojson#PUBLIC-001] [depth:overall_spatial_structure]

用地分区以可校验的分类语义表达方向，不代替正式控规：AI 研发与测试混合用地承接众智园和算力服务，遗址公园与蓝绿开敞空间承接连续公共骨架，产业服务用地承接企业转化与生活服务，社区服务用地承接人才和居民日常，数据与算力公共服务用地承接端侧设施。概念分区由同一 site polygon 切分，避免相邻地块缝隙和重叠。[standard:MNR-LAND-USE-CLASSIFICATION-GUIDE] [data:geometry/land_use.geojson#LU-002] [depth:land_use_layout]

建筑更新采用“先使用、后加密；先验证、后固化”的原则：保留可再利用建筑，优先加入共享大厅、夜间开放界面和设备接口；改造对象先做小尺度公共服务和测试功能；拆除与新建逻辑暂不落到具体地块，只保留为待专业团队核验的项目类型。公开包没有现状建筑权属、容积率、高度、密度、退线和道路红线，故本包不编造 FAR 或审批结论。[standard:MOHURD-URBAN-DESIGN-MEASURES] [metric:floor_area_ratio] [depth:development_intensity_controls]

![用地、建筑与更新结构](assets/figures/land-use-structure.png)

## 重点区域详细设计
**众智园 AI 自主创新加速区：从“能做”到“能验证”。** 以加速器更新单元、共创前厅和测试接驳线组成可见的研发前场；优先建立共享设备、模型评测、数据脱敏和人工审查的组合空间，建筑体量只表达参考单元，不表达确定高度或新建规模。第一阶段先做公共廊道和开放前厅，第二阶段再由专业团队核验楼宇改造和交通组织。[data:geometry/key_areas.geojson#KEY-001] [data:geometry/buildings.geojson#BLDG-005] [depth:three_key_area_detailed_design]

**北京 AI 原点社区：从“会用”到“敢用”。** 以原点开放台、社区共享工作坊、共享绿脊和步行环组成日常体验区。面向学生、居民、照护者和开发者提供小规模、可退出的公共服务测试，任何涉及个人信息的服务都采用最小采集和人工复核；不使用摄像头识别作为必要条件。该区的空间重点是连续首层界面、清晰导视和不被技术占据的普通生活场景。[data:geometry/key_areas.geojson#KEY-002] [data:geometry/public_space.geojson#PUBLIC-002] [depth:three_key_area_detailed_design]

**大钟寺 AI 产业聚集区：从“研发”到“被看见”。** 以智能原生街区单元、大钟寺夜间客厅和校企转化客厅作为企业、消费者和开发者相遇的界面。场景不以巨型屏幕做主角，而以可解释的服务柜台、夜间安全照明、可替换展陈组件和数据权益说明构成“可理解的技术消费”。有关商业业态、建筑改造和交通接驳仅作参考方案，需结合权属、消防、文保和现行控规深化。[data:geometry/key_areas.geojson#KEY-003] [data:geometry/public_space.geojson#PUBLIC-005] [depth:three_key_area_detailed_design]

三处区域由一条慢行主廊串联但不抹平差异：众智园更像实验室，原点社区更像客厅，大钟寺更像开放市场；每处节点都必须能回答“谁在用、数据从哪来、谁来复核、如何暂停、怎样把结果带回城市生活”。[metric:slow_mobility_corridor_count] [metric:ai_pilgrimage_landmark_count]

![三处重点区定位与节点](assets/figures/key-areas.png)

## AI 创新生态、人才画像与 AI+ 场景
本方案把用户画像当作空间设计工具，而不是宣传标签。五类核心用户为：需要实验环境的研究者、寻找转化接口的企业团队、需要低门槛学习的学生与开发者、使用社区服务的居民与照护者、关注公共责任的管理与运营人员。研究者需要安静工作台和评测设施，企业需要可展示的验证路径，学生需要公开课程与夜间安全路径，居民需要不被技术打扰的生活服务，运营人员需要审计台账和异常处置空间。[source:AGENT-TASKBOOK] [depth:existing_conditions_diagnosis]

十张场景卡如下：01 开源模型发布厅；02 城市智能体沙盒（产业测试）；03 慢行断点诊断；04 人才生活管家；05 AI 安全治理廊（产业测试）；06 校企转化客厅（产业测试）；07 数据权益说明台；08 低碳算力驿站（产业测试）；09 京张记忆导览；10 全球 AI 活动周路线。每张卡都要有公开数据或用户主动输入、最小必要权限、人工复核、责任人、可退出机制和事后评估；任何卡片都只是概念建议，不是已批准部署。[metric:ai_scenario_node_count] [metric:ai_industry_test_scenario_count] [depth:municipal_new_infrastructure]

场景—空间—运营映射为：研发与验证类进入众智园测试接驳线及公共验证广场；社区生活类进入原点开放台和共享绿脊；消费与传播类进入大钟寺夜间客厅、全球 AI 荣誉墙和京张记忆路线。每季度只开放少量场景，通过“公开说明—小规模测试—人工复核—公众反馈—暂停或扩大”的闭环，避免技术先行、责任滞后的问题。[data:geometry/public_space.geojson#PUBLIC-003] [data:geometry/phasing.geojson#PHASE-002] [depth:traffic_rail_slow_parking]

## 用地、建筑规模与拆改留方案
用地布局由五条同边界切分的带状分区构成，分别承接研发测试、遗址公园、产业服务、社区服务与算力公共服务。带状分区只是总体设计层面的功能关系，不是地块红线；正式 polygon、法定用地分类、产权条件和控规指标到位后，应由专业团队重新分区。当前可从图层复算出总体设计范围约 1141.3公顷，绿地约 282.3公顷，公共空间约 13.0公顷，建筑基底约 46.6公顷。[data:geometry/land_use.geojson#LU-003] [metric:site_area_sqm] [metric:green_space_area_sqm]

建筑策略采用四类动作：保留可再利用结构、改造首层和公共界面、拆改留待核验、参考新建服务节点。图层中的 12 个建筑单元只代表概念体量和服务位置，不代表真实建筑数量、权属或建设规模；建筑基底比例 4.1% 是本轮设计层的可复算值，不能代替控规建筑密度。总楼面、容积率和高度均保留为待正式资料补齐。[metric:building_density] [metric:floor_area_ratio] [depth:height_massing_character]

## 交通、轨道、市政与公共服务设施
交通策略是“轨道到站即换乘城市生活”：以现有轨道站点和主要道路作为背景接驳条件，概念上布置 6 条慢行/服务廊道，形成南北主廊、东西缝合线、社区步行环和水岸横向线。其作用不是另画道路红线，而是找出从站点、学校、园区、社区和遗址公园进入公共节点的连续路线。[data:geometry/roads.geojson#ROAD-003] [metric:slow_mobility_corridor_count] [depth:traffic_rail_slow_parking]

公共服务设施按“低门槛、可见、可退出”布置：一层提供导视、饮水、厕所、休息和无障碍信息；二层提供共享工作台、公开课程和设备预约；三层提供审计、投诉、暂停和复盘。算力节点采用分布式、可替换的参考方案，不对地下空间、能源容量或管线工程作结论。停车与非机动车组织需与现行交通组织、消防和道路资料复核后深化。[standard:MOHURD-CONTROL-DETAILED-PLANNING] [data:geometry/constraints.geojson#CONSTRAINT-003] [depth:municipal_new_infrastructure]

## 蓝绿空间、公共空间与城市风貌
京张遗址公园活力带采用“历史线可读、技术线可停、生活线可绕”的三线策略：历史线保留铁路记忆的时间节点，技术线用公共验证广场和说明台展示可复核的 AI 服务，生活线用连续绿脊、休息点和慢行环保证普通居民可以不参与技术活动也能舒适通行。绿地和公共空间按图层分别复算，当前绿地比例为 24.7%，公共空间比例为 1.1%，临时范围替换后必须更新。[metric:green_ratio] [metric:public_space_ratio] [depth:blue_green_public_space]

三个 AI 朝圣地标是“京张起点记忆场”“公共验证广场”“全球 AI 荣誉墙”。它们不是巨型雕塑，而是三种公共空间组件：可触摸的时间线与开源里程牌、可以围观但不强制参与的验证桌、记录贡献者和复核结论的长期展示界面。地标与中关村创新文化、开发者社区和公众路线相连，表达“贡献可记忆，结论可追溯”；形式、材料、标识和历史内容仍需文保与专业团队审查。[data:geometry/public_space.geojson#PUBLIC-001] [metric:ai_pilgrimage_landmark_count] [depth:blue_green_public_space]

## 更新项目清单、实施政策与分期计划
建议形成 8 类可拆分更新项目：京张记忆慢行主廊、原点开放台、共享工作坊、公共验证广场、众智园共创前厅、水岸慢行横向线、大钟寺夜间客厅、全球 AI 荣誉墙。项目清单对应三期范围：一期先做可见、低工程依赖的连通、导视和公共服务；二期做社区服务与产业验证接口；三期再深化加速区、国际活动和可替换算力节点。所有项目均为概念建议，实施主体、投资、政策与建设时序须由专业团队、权属单位和管理部门另行确认。[data:geometry/phasing.geojson#PHASE-001] [metric:phase_count] [depth:renewal_project_list]

长期运营建议采用“一年四季、每月一场、每季一评”的节奏：春季做开放课程与铁路记忆采集，夏季做场景开放周，秋季做开发者和产业测试，冬季做公共复盘与荣誉发布。运营机构可由园区、社区、学校、企业和公众代表组成临时联合工作组；平台只发布已清权的成果、变更记录和复核状态，不替代政府审批。国际传播以双语线路图、开放案例报告和可复现数据包为主，招引转化以公开需求清单、场景验证记录和人工评审意见为入口。[source:AGENT-TASKBOOK] [depth:phasing_implementation] [metric:ai_scenario_node_count]

![实施分期与项目抓手](assets/figures/mobility-bluegreen.png)

## 指标体系、面积复算与合规矩阵
本方案的核心指标分三层：空间指标直接从 GeoJSON 复算；控规指标因正式资料缺失而标记为待确认；运营指标用于未来观察，不写成已实现绩效。当前临时提交范围面积为 1141.3公顷，绿地比例 24.7%，公共空间比例 1.1%，建筑基底比例 4.1%，慢行/服务廊道 6 条，AI 场景卡 10 张，产业测试场景 4 张，朝圣地标 3 处。指标的意义是把空间安排转成可检查的承诺，而不是用数字制造审批确定性。[metric:site_area_sqm] [metric:public_space_ratio] [depth:metrics_recalculation]

任务覆盖矩阵覆盖公告 1.3、1.4、1.5 和 agent.1 至 agent.6；专业标准矩阵覆盖项目公告、任务书、城市设计管理、控规编制审批和用地分类；设计深度矩阵覆盖现状诊断、三层范围、空间结构、用地、开发强度、建筑风貌、拆改留、交通、公共空间、重点区、更新项目、分期、指标和风险。图纸、离线 HTML 和结构化文件互相指向，任何后续修改都必须重新渲染、复算和自检。[source:SOURCE-REGISTRY] [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE] [depth:risk_missing_data]

![指标与证据链](assets/figures/metrics-evidence.png)

## 风险、版权与合规说明
本包仅使用项目仓库的公开或清权资料和自绘图形，不使用个人信息、非公开地图、商业地图瓦片、未经授权的企业标识或外部图片。临时 polygon、概念分区、建筑体量、道路廊道、场景卡、政策和活动安排均带有概念建议属性，不能替代正式规划、工程设计、审批或政府承诺。[source:PUBLIC-OSM-COPYRIGHT] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK] [depth:risk_missing_data]

重点风险包括：边界精度风险、控规指标缺失风险、技术成熟度风险、隐私和公平风险、运营成本风险、权属协同风险。应对方式是把正式资料替换作为第一道闸门，把高风险场景限定为小规模、公开说明、人工复核和可暂停测试，把公众反馈、无障碍和非技术使用者作为验收条件。完整版权和生成责任说明见 `report/copyright_statement.md`。[source:SOURCE-REGISTRY] [metric:official_boundary_status]

## 参考资料
主要依据为北京市规划和自然资源委员会海淀分局发布的征集资格预审公告、面向全球智能体的清权任务书摘录、仓库提供的临时边界与公开资料登记表、住建部《城市设计管理办法》、住建部控规编制审批办法、自然资源部用地分类指南，以及 OpenStreetMap Foundation 的公开版权说明。公告和任务书用于判断征集目标、成果深度与共创边界；标准快照用于判断公共空间、风貌、用地分类与控规表述的专业边界；临时 boundary 仅用于生成和自检。外部 AI 生态案例只帮助比较开放协作、人才连接、算力公共性和可解释机制，不承担本地边界、审批、面积、投资或工程判断。今后如获得正式图纸，应优先登记原始文件、发布机构、日期、许可、坐标系和转换方法，并将当前所有临时指标、图层、图纸和解释文字整体更新。[source:OFFICIAL-ANNOUNCEMENT] [source:AGENT-TASKBOOK] [standard:MOHURD-URBAN-DESIGN-MEASURES]
