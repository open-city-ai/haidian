---
title: "时间车站：百年京张的AI朝圣之路"
author_github: "qing3a"
language: "zh"
proposal_format_version: "2"
bilingual_contract_version: "1"
translation_file: "proposal.en.md"
license: "COMMUNITY-DISPLAY-ONLY"
summary: "以京张铁路 1909—2026 百年时间轴为叙事主轴，将遗址公园化作「时间脊」、三处重点区化为三座时代站台，形成可步行、可体验、可运营的 AI 朝圣之路与两翼场景带；全部空间结论为基于临时边界的概念建议。"
tracks: ["jingzhang-heritage-narrative", "youth-friendly-public-space", "ai-traffic-walkability"]
scenarios: ["ai-cultural-guide", "ai-traffic-walkability", "ai-health-service-navigation", "robot-delivery-low-speed"]
iteration: "v0.1.1"
---

# 时间车站：百年京张的AI朝圣之路

## 设计依据与资料清单

本方案以北京市规划和自然资源委员会海淀分局发布的《百年京张AI创新带城市设计国际方案征集资格预审公告》为第一依据 [source:DATA-SRC-OFFICIAL-ANNOUNCEMENT-20260509]，以仓库维护者登记的任务书摘录 [source:SRC-2026-0518-AGENT-OPEN-CALL-TASKBOOK]、临时粗略边界 [source:DATA-SRC-PROVISIONAL-BOUNDARIES-20260605]、标准快照与来源清单为机器可读依据。三层范围与面积（统筹研究范围约 43.6 平方公里、总体设计范围约 11.4 平方公里、重点区域范围约 368.4 公顷）、三处重点区域及设计任务 1.3/1.4/1.5 均按公告文字与官方页面引用 [source:DATA-SRC-OFFICIAL-ANNOUNCEMENT-20260509]。

边界透明度声明：截至本稿检索日（2026-08-10），公开渠道未发布官方 polygon 级红线，本方案全部空间边界为维护者登记的临时粗略范围（provisional_rough），仅用于概念生成、展示与自检 [data:geometry/site_boundary.geojson#SITE-001] [source:DATA-SRC-PROVISIONAL-BOUNDARIES-20260605]。凡面积、比例、长度类指标均在 EPSG:4548 下由几何图层复算并标注 provisional 口径 [metric:site_area_sqm]；官方 polygon 到位后必须整体替换并重算，不得以本稿数值作为审批或精确面积依据。现状条件研判基于公开公告、公开史料与仓库事实包完成，9 项数据缺口登记于 `assumptions.json` [depth:existing_conditions_diagnosis]。任务覆盖、标准响应与设计深度的完整机器索引见 `compliance_matrix.json`、`standard_matrix.json`、`design_depth_matrix.json`，正文不重复堆叠 [depth:three_level_scope_framework]。

本稿为 v0.1.1（2026-08-11）：已同步上游校验契约（persisted-self-check-v1）并完成四关自检持久化，详见 changelog.md。

![资料证据链与总体概念图](assets/figures/site-overview.png)

## 三层范围工作框架

三层范围逐级落实「产业战略—总体城市设计—重点片区详细设计」的传导关系 [source:DATA-SRC-OFFICIAL-ANNOUNCEMENT-20260509]。统筹研究范围（约 43.6 平方公里，北至北五环、东至京藏高速、南至西直门外大街、西至万泉河路）承担世界级 AI 创新生态、三区两翼协同与未来城市形态研究 [depth:three_level_scope_framework]；总体设计范围（约 11.4 平方公里，京张遗址公园周边 1—2 公里城市地区和产业区）承担控制性详细规划深度的城市更新设计 [metric:site_area_sqm]；重点区域范围（约 368.4 公顷）对众智园、北京 AI 原点社区、大钟寺三处重点区开展规划综合实施方案深度的详细设计 [data:geometry/key_areas.geojson#KA-001] [metric:key_area_total_area_sqm]。

本方案在三层范围上分别输出：统筹层给出时间车站命名体系、全球案例与三区两翼协同机制；总体层给出「时间脊 + 三处时代站台 + 两翼场景带」的空间结构、用地分区与更新框架 [depth:overall_spatial_structure]；重点区层对三处站台分别形成「定位 + 空间结构 + 建筑更新 + 交通慢行 + 公共空间 + AI 场景 + 实施风险」的可读小方案。因重点区 polygon 为临时矩形近似 [source:DATA-SRC-PROVISIONAL-BOUNDARIES-20260605]，重点区内的全部结论仅作方向性设计，具体地块边界、拆改留与建设规模待官方 polygon 与控规条件确认 [standard:MOHURD-CONTROL-DETAILED-PLANNING]。

![三层范围与空间工作框架图](assets/figures/land-use-structure.png)

## 统筹研究范围产业与未来城市研究

**命名与视觉识别。** 主名称「时间车站 The Time Station」，全称「时间车站：百年京张的 AI 朝圣之路 / The Time Station: the AI Pilgrimage Route of a Century of Jing-Zhang」 [depth:overall_spatial_structure]。命名体系以「站台」为元概念：整条创新带是一座「时间车站」，京张铁路遗址公园是「时间轨道」（时间脊），三处重点区是登上不同时代的「站台」——众智园为「原点站」（1909 自主创新起点），AI 原点社区为「人才站」（1950s 学院路科教兴国与 1980s 中关村创业），大钟寺为「未来站」（2026 AI 时代原点）。百年京张文化带、都市 AI 生活体验带、AI 融合创新带三大定位 [source:SRC-2026-0518-AGENT-OPEN-CALL-TASKBOOK] 分别落在时间脊的「记忆、体验、生长」三个界面；AI 全栈自主创新、世界级创新生态、场景赋能新范式、智能化活力城市、AI 治理话语权五大功能由三区两翼承载 [source:SRC-2026-BJ-KW-THREE-AREAS-WINGS]。Logo 方向为「钢轨刻度」：一条水平钢轨上叠加时间刻度与站点符号，1909—2026 跨度隐含其中，主色取钢轨灰蓝与信号琥珀，字体使用可商用开源字体族，不引用任何企业或机构标识，相关风险登记于风险矩阵 [depth:risk_missing_data]。

**三区两翼协同回路。** 众智园（全栈自主创新体系与 AI 治理话语权）—AI 原点社区（世界级创新生态与成果转化）—大钟寺（智能原生新业态）构成纵向创新链 [source:SRC-2026-BJ-KW-THREE-AREAS-WINGS]；中关村科技服务翼提供 IP、资本与要素全球化配置，小月河场景赋能翼提供场景开放与公共体验 [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]。回路机制：原点社区把高校原始创新转化为可孵化成果，沿时间脊向北进入众智园完成中试与全栈验证，向南进入大钟寺完成市场化与内容消费，两翼全程提供资本、场景与数据合规服务 [metric:case_study_count]。

**全球 AI 创新生态案例（机制借鉴，非空间照搬）。** ① 美国硅谷/帕洛阿尔托：大学-风险资本-企业循环与低密度花园园区；② 波士顿肯德尔广场：近校型创新街区与生命科学转化生态，对应原点社区「近校型」定位 [source:PUB-ACADEMY-ROAD-1950S]；③ 伦敦国王十字：以历史枢纽更新带动知识经济区，对应大钟寺枢纽更新；④ 巴黎 Station F：单点式超级孵化器与开放社区运营，对应众智园测试验证场；⑤ 多伦多-滑铁卢走廊：廊道式创新带与人才通勤网络，对应时间脊通勤与人才服务；⑥ 新加坡裕廊创新区：园区-城市融合与场景开放治理，对应小月河场景赋能翼。六例均提炼为可转移机制写入运营与空间设计，不复制其形态 [depth:overall_spatial_structure]。

**面向 AI 的城市形态。** 畅想「站台城市」：城市空间如车站时刻表一样可预告、可换乘、可回站——公共空间提供 AI 服务的「到站即用」接口，建筑与设施按「可进化」原则预留升级空间；AI 文化表现为「时间刻度」公共艺术系统，AI 社会表现为「人工复核 + 公众参与」的治理回路 [source:SRC-2026-0518-AGENT-OPEN-CALL-TASKBOOK] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]。

## 总体设计范围城市更新与控规深度城市设计

**总体空间结构：时间脊。** 沿京张铁路遗址公园方向贯通总体设计范围南北的概念绿带 [depth:overall_spatial_structure]，概念长度约 9.79 公里 [metric:spine_length_m]，公园绿地面积约 1.09 平方公里 [metric:spine_park_area_sqm]。时间脊承担三重功能：其一为「缝合器」，以绿道、骑行道与步行天桥缝合被铁路割裂的东西城区 [metric:spine_length_m]；其二为「展示带」，承载百年时间轴叙事、AI 场景与公共艺术 [depth:blue_green_public_space]；其三为「服务廊」，串联三处站台与两翼场景带 [source:SRC-2026-0518-AGENT-OPEN-CALL-TASKBOOK]。

**更新总体框架。** 以「留改为主、拆建为辅、逐期校核」为原则 [depth:retain_renovate_demolish]：保留文保与历史资源（清华园车站旧址等 [source:PUB-QHY-STATION]）、公园已实施区域与高校院所；改造低效产业空间与老旧社区服务设施；仅在更新潜力地块（约 60.4 公顷留白用地 [metric:reserved_area_sqm]）预留新建与产业空间，且明确为概念建议、待控规条件确认 [standard:MOHURD-CONTROL-DETAILED-PLANNING]。

功能比例概念方向：科研孵化（0802）约 318.2 公顷、商业服务（05）约 249.7 公顷、居住（0701）约 195.7 公顷、教育（0804）约 40.4 公顷、文化（0803）约 21.3 公顷 [metric:research_area_sqm] [metric:commercial_area_sqm] [metric:residential_area_sqm]；教育用地约 40.4 公顷、文化用地约 21.3 公顷 [metric:education_area_sqm] [metric:cultural_area_sqm]。职住商服均衡关系在重点区层面进一步校核。建筑总规模、高度与强度因控规条件缺失列为 unknown 并在 `metrics.json` 附原因 [metric:gross_floor_area_sqm] [metric:floor_area_ratio]，不虚构审定指标 [depth:development_intensity_controls]。

**创新网络与指标体系。** 提出「时间车站创新指数」概念框架：以人才密度、成果转化率、场景开放数、慢行连通度、公共空间供给为五个一级维度 [depth:metrics_recalculation]，其中可复算项（绿地率、公共空间率、慢行长度、场景节点数等）在 `metrics.json` 给出数值与公式 [metric:green_ratio] [metric:public_space_ratio] [metric:scenario_node_count]，人才与产值类指标因公开底数缺失标记 unknown [metric:population_density]。

## 重点区域详细设计

三处重点区对应三座时代站台 [data:geometry/key_areas.geojson] [depth:three_key_area_detailed_design]；因边界为临时近似，全部结论为方向性设计，待官方 polygon 后深化 [source:DATA-SRC-PROVISIONAL-BOUNDARIES-20260605]。

**众智园·原点站（约 192.1 公顷 [metric:zhongzhiyuan_area_sqm]）。** 定位：AI 全栈自主创新加速区，国家人工智能平台与标准治理的承载地 [source:DATA-SRC-OFFICIAL-ANNOUNCEMENT-20260509]。空间结构：「花园型创新街区」——围绕站台广场组织研发、中试、展示与花园绿地 [data:geometry/public_space.geojson#PS-004]；建筑更新以改造低效产业楼宇为主、新建为辅 [depth:retain_renovate_demolish]；交通上优化五环方向对外联系并预留清河站方向接驳 [data:geometry/roads.geojson#RD-TR-004]；公共空间设「原点钟」地标与全栈测试中试场 [metric:landmark_count]；AI 场景含全栈创新测试验证与 AI 治理公众听证 [data:geometry/public_space.geojson#SC-10]；实施风险：涉及跨权属更新与测试安全，需专业团队与主管部门把关。

**AI 原点社区·人才站（约 104.3 公顷 [metric:origin_area_sqm]）。** 定位：近校型创新街区，清华、北大、中科院等原始创新的孵化转化地 [source:DATA-SRC-OFFICIAL-ANNOUNCEMENT-20260509]。空间结构：「站台 + 学院路」结构——以五道口人才站台广场为核心 [data:geometry/public_space.geojson#PS-003]，向清华东路西口站与校区方向放射慢行联系 [data:geometry/roads.geojson#RD-TR-003]；建筑更新以低扰动有机更新为主，配套人才居住与成果展示空间 [depth:retain_renovate_demolish]。公共空间含「学院路时间站台」地标与开源广场 [data:geometry/public_space.geojson#SC-07]，AI 场景含教育实验室街区与成果发布空间 [data:geometry/public_space.geojson#SC-08]。

实施风险：高校权属与文保敏感（清华园车站旧址概念缓冲区见约束图层 [data:geometry/constraints.geojson#CST-HERITAGE-001]），更新须低扰动并守文保底线 [source:PUB-QHY-STATION]。

**大钟寺·未来站（约 72.0 公顷 [metric:dazhongsi_area_sqm]）。** 定位：城市型 AI 创新街区，智能体、智能终端与内容消费等 AI 原生业态集聚地 [source:DATA-SRC-OFFICIAL-ANNOUNCEMENT-20260509]。空间结构：「四象限步行连通 + 站城一体」——以轨道大钟寺站所在路口四象限步行体系 [source:DATA-SRC-OFFICIAL-ANNOUNCEMENT-20260509] 串联站前广场（未来站台 [data:geometry/public_space.geojson#PS-002]）、智能原生商业街区与文化展示用地 [data:geometry/land_use.geojson]；完善非机动车停放与静态交通组织；公共空间设「大钟寺 AI 钟楼」地标与时间胶囊投递站 [metric:landmark_count]；AI 场景含智能无人零售街区与 AI+医疗健康小屋 [data:geometry/public_space.geojson#SC-02]；实施风险：站点枢纽改造与商业更新涉及多方主体，须结合轨道一体化方案深化。

![三处重点区域索引与设计任务图](assets/figures/key-areas.png)

## AI 创新生态、人才画像与 AI+ 场景

**五类用户画像 [metric:persona_count]。** P1 AI 研发工程师（众智园/原点社区，需求：中试设施、开源协作、通勤效率）；P2 高校师生与科研人员（学院路-原点社区，需求：近校转化、学术交流、低成本创业空间）；P3 创业团队与开发者（全带，需求：孵化加速、算力数据、场景开放）；P4 社区居民与长者（全带，需求：日常生活服务、数字包容、人工帮办 [standard:BARRIER-FREE-ENVIRONMENT-LAW] [standard:ELDERLY-SMART-TECH-PLAN-2020-45]）；P5 游客与全球开发者访客（时间脊沿线，需求：文化导览、地标打卡、国际活动参与）。画像支撑场景卡与空间配置的对应关系 [depth:traffic_rail_slow_parking]。

**十二张 AI 场景卡 [metric:scenario_card_count]**（编号 SC-01…SC-12，节点见 `geometry/public_space.geojson` [data:geometry/public_space.geojson#SC-01]）：

| 编号 | 场景卡 | 服务对象 | 空间节点 | 运行数据 | 隐私边界 | 人工复核 | 运营主体 |
|---|---|---|---|---|---|---|---|
| SC-01 | AI城市书房（阅读与文献助手） | P2/P5 | 南端起点广场 | 文献检索记录 | 不采集个人身份 | 内容审核 | 公共文化机构 |
| SC-02 | 智能无人零售街区 | P1/P3/P4 | 大钟寺站前 | 商品与支付流水 | 匿名化 | 交易异常复核 | 商业运营方 |
| SC-03 | AI+医疗健康小屋（导诊与健康咨询） | P4 | 知春路南侧 | 咨询记录 | 不采集病历 | 执业医师复核 [standard:BARRIER-FREE-ENVIRONMENT-LAW] | 医疗机构 |
| SC-04 | 自动驾驶接驳测试点 | P1/P3 | 知春路东侧 | 车辆运行数据 | 无个人数据 | 安全员随车 | 测试运营主体 |
| SC-05 | AI+教育实验室街区 | P2 | 学院路东侧 | 教学记录 | 未成年人数据脱敏 | 教师人工审核 | 高校/教育机构 |
| SC-06 | 学院路人才服务驿站 | P1/P3 | 学院路东侧 | 服务预约 | 最小化采集 | 人工审批 | 人才服务机构 |
| SC-07 | AI原点开源广场（代码与模型贡献） | P1/P3 | 五道口站台 | 开源元数据 | 公开数据 | 社区评审 | 开发者社区 |
| SC-08 | 成果发布演播空间 | P1/P2/P3 | 原点社区东侧 | 发布内容 | 授权发布 | 内容审核 | 运营机构 |
| SC-09 | 机器人巡检试点带 | P4/P5 | 连接段 | 巡检影像 | 不采集人脸 | 人工抽查 | 物业/运营方 |
| SC-10 | AI治理公众听证亭 | P4/P5 | 众智园南 | 意见文本 | 匿名提交 | 公众参与复核 | 治理机构 |
| SC-11 | 全栈创新测试中试场 | P1/P3 | 众智园东 | 测试数据 | 无个人数据 | 安全评估 | 测试运营主体 |
| SC-12 | 低空配送示范点 | P4 | 众智园西 | 配送轨迹 | 匿名化 | 飞行审批 | 配送运营方 |

**三张产业测试验证场景 [metric:test_scenario_count]**：SC-04 自动驾驶接驳测试、SC-09 机器人巡检试点、SC-11 全栈创新测试中试场——均以试点方式提出，需行业许可与安全评估，不视为已批准运营 [standard:GENERATIVE-AI-INTERIM-MEASURES]。场景-空间-运营映射完整表见 `spatial.json` 与可视化页；所有场景遵循「最小数据、匿名优先、人工复核、可退出」四项边界 [source:SRC-2026-0518-AGENT-OPEN-CALL-TASKBOOK]。

## 用地、建筑规模与拆改留方案

用地布局遵循国土空间用地用海分类指南代码 [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE]，54 个分区无缝无重叠覆盖全部提交边界 [depth:land_use_layout] [data:geometry/land_use.geojson#LU-001]。

分区口径（EPSG:4548 复算，provisional）：科研孵化 0802 约 318.2 公顷、商业服务 05 约 249.7 公顷、居住 0701 约 195.7 公顷 [metric:research_area_sqm] [metric:commercial_area_sqm] [metric:residential_area_sqm]。

公园绿地 1401 约 109.1 公顷、道路用地 1207 约 85.4 公顷 [metric:park_area_sqm] [metric:road_area_sqm]；教育 0804 与文化 0803 用地分别约 40.4、21.3 公顷 [metric:education_area_sqm] [metric:cultural_area_sqm]。留白用地（更新潜力）约 60.4 公顷、社区服务 0702 约 13.0 公顷 [metric:reserved_area_sqm] [metric:community_service_area_sqm]。

建筑基底为概念示意（棋盘式布局、70 栋 [metric:building_count]、基底约 250.5 公顷 [metric:building_footprint_area_sqm]），不含高度与层数 [depth:height_massing_character]；建筑表达深度参照建筑专业深度规定，因官方文件缺失登记为数据缺口 [standard:MOHURD-ARCH-DESIGN-DEPTH-2016]。拆改留以原则策略表达：文保与公园资源保留、低效产业空间改造、更新潜力地块留白待定 [depth:retain_renovate_demolish]；因现状建筑与权属底数缺失（GAP-BUILDING-001、GAP-PARCEL-001），不针对具体建筑或地块下结论 [standard:MOHURD-CONTROL-DETAILED-PLANNING]。

## 交通、轨道、市政与公共服务设施

交通以「时间脊慢行主轴 + 东西缝合支路 + 站点一体化接驳」组织 [depth:traffic_rail_slow_parking] [data:geometry/roads.geojson#RD-SPINE-001]：时间脊绿道概念长度约 9.79 公里 [metric:spine_length_m]，配套骑行道与步行连接；东西向支路在约 39.949、39.965、39.985 等纬度跨脊缝合 [data:geometry/roads.geojson#RD-EW-001]；轨道站点一体化围绕大钟寺站、五道口站、清华东路西口站展开 [source:DATA-SRC-OFFICIAL-ANNOUNCEMENT-20260509]，清河站方向预留跨五环概念接驳 [data:geometry/roads.geojson#RD-TR-004]；停车与非机动车以站台周边集中组织，静态交通方案随轨道一体化深化。道路红线与断面缺失，概念线位不代表红线 [standard:MOHURD-CONTROL-DETAILED-PLANNING]。市政与新型基础设施提出系统级方向：分布式能源与端侧算力沿时间脊布局、与传统三大设施融合、AI 产业服务设施（算力、数据、测试）按站台分级配置 [depth:municipal_new_infrastructure]；不含工程测算与容量结论。

![交通慢行与蓝绿公共空间复合系统图](assets/figures/mobility-bluegreen.png)

## 蓝绿空间、公共空间与城市风貌

**蓝绿体系。** 时间脊公园带（1401，约 109.1 公顷 [metric:spine_park_area_sqm]）+ 清河滨水绿楔 + 小月河场景赋能翼绿带 [data:geometry/green_space.geojson#GS-XY-001]；绿地率概念口径约 14.2% [metric:green_ratio]，公共空间率约 0.83% [metric:public_space_ratio]，均待官方边界重算。

**五处站台广场 [metric:station_platform_count]。** 南端起点广场、大钟寺未来站台、五道口人才站台、众智园原点站台、北五环时间之门广场 [data:geometry/public_space.geojson#PS-001]。

**三个 AI 朝圣地标 [metric:landmark_count]。** ①「原点钟」：众智园站台的公共时间装置，以京张铁路自主创新精神为原点，钟声定时鸣响并同步开放 API 供开发者创作 [source:PUB-JZ-RW-1909]；②「学院路时间站台」：原点社区站台的文化档案装置，呈现八大学院—中关村—AI 原点三代人才叙事 [source:PUB-ACADEMY-ROAD-1950S] [source:PUB-ZGC-1980S]；③「大钟寺 AI 钟楼」：未来站台的地标，以公开算法生成钟声与时间胶囊投递功能 [depth:blue_green_public_space]。地标均为概念设计，非已批准建设，且不夸大功能 [source:SRC-2026-0518-AGENT-OPEN-CALL-TASKBOOK]。

**荣誉展示体系与组件库。** 「百年贡献者墙」：1909 建设者—1950s 科教工作者—1980s 创业者—2026 开源开发者与 AI 贡献者，逐代展示 [source:SRC-2026-0518-AGENT-OPEN-CALL-TASKBOOK]；公共空间组件库（座椅、灯杆、导视、胶囊装置）按「可复用、可升级、可维护」设计，供全带标准化部署 [depth:risk_missing_data]。风貌基调：钢轨灰蓝 + 信号琥珀 + 砖石暖灰；站台节点近低远高、留白留绿，屋顶形态鼓励光伏与绿色设施一体化，沿时间脊控制贴线率与界面连续度 [standard:MOHURD-URBAN-DESIGN-MEASURES]。

## 更新项目清单、实施政策与分期计划

**更新项目清单（概念）**：A 类贯通缝合（时间脊南北贯通、五处站台、断点缝合）；B 类节点活化（原点钟、学院路时间站台、AI 钟楼、开源广场）；C 类产业空间（众智园中试场、原点社区转化区、大钟寺智能商业街）；D 类服务配套（人才服务驿站、医疗健康小屋、社区服务更新）。每类项目标注依赖条件（官方边界、控规条件、文保确认、运营主体）与实施主体建议 [depth:renewal_project_list]。

**分期计划 [metric:phase1_area_sqm] [metric:phase2_area_sqm] [metric:phase3_area_sqm]**：一期缝合启动（2026—2028，约 179.4 公顷）：时间脊南段与大钟寺站台、南端起点广场；二期场景赋能（2028—2030，约 596.3 公顷）：学院路—原点社区—知春路场景激活；三期生态成熟（2030—2035，约 365.6 公顷）：众智园全栈自主与两翼协同 [data:geometry/phasing.geojson#PH-1]。分期为概念时序，实施由官方统筹 [depth:phasing_implementation]。

**全球 AI 创新活动体系与长期运营（agent.6）**：年度活动体系提出「京张时间节」（每年 9 月，纪念京张铁路通车月）、开发者马拉松、站台开放日与 AI 治理圆桌；品牌 IP 以「时间车站」统一视觉延展；开发者社区运营提出开源协作、贡献者荣誉与 PR 式公众参与机制；场景开放运营提出「试点—评估—推广」三步；国际传播提出「百年京张时间轴」叙事与朝圣路线推广；人才、企业与开发者转化路径沿「体验—参与—落地」设计 [source:SRC-2026-0518-AGENT-OPEN-CALL-TASKBOOK]。全部活动、招商、资金与政策安排均为概念建议或深化方向，不表述为已确定政府安排 [depth:risk_missing_data]。

## 指标体系、面积复算与合规矩阵

核心指标的设计含义：绿地率支撑人才生活与创新交往环境 [metric:green_ratio]，公共空间率支撑站台体验与公共参与 [metric:public_space_ratio]，时间脊长度支撑慢行连通与缝合度 [metric:spine_length_m]。留白用地支撑产业空间供给的不确定性缓冲 [metric:reserved_area_sqm]，场景节点与场景卡支撑 AI 场景可感知度 [metric:scenario_node_count]。

全部面积与比例指标由几何图层在 EPSG:4548 复算（`metrics.json` 共 39 项 [metric:site_area_sqm]），未知项（容积率、建筑规模、人口密度、平均高度）均附原因 [metric:floor_area_ratio]。合规覆盖：公告 1.3.1—1.5.3.3 与智能体任务 agent.1—agent.6 共 23 项在 `compliance_matrix.json` 逐项映射到正文章节、图层、指标、图纸、可视化节、来源与假设 [depth:metrics_recalculation]；5 项强制标准在 `standard_matrix.json` 全部 addressed，15 项设计深度项全部 complete [standard:PROJECT-OFFICIAL-ANNOUNCEMENT] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]。

![核心指标复算与证据链图](assets/figures/metrics-evidence.png)

## 风险、版权与合规说明

资料合法性：仅使用公开或清权资料，未使用秘密图件与非公开数据 [source:SRC-2026-0518-AGENT-OPEN-CALL-TASKBOOK]。版权：正文、图面、可视化与图纸均为本方案原创（COMMUNITY-DISPLAY-ONLY 许可），中文字体与图标选用可商用资源；历史照片与商标未使用 [depth:risk_missing_data]。隐私：场景卡逐张声明数据边界，不采集个人隐私，设人工复核与退出机制 [standard:GENERATIVE-AI-INTERIM-MEASURES]。AI 生成责任：本方案由 AI agent 生成并经人类参与者复核，生成方式与模型信息见 `agent.json` [depth:risk_missing_data]。边界条款：全部空间落地建议为「概念建议」「参考方案」，可供专业团队深化研究；不构成政府审定结论，不含控规调整、容积率、建筑高度、拆改留、道路线位、工程可行性、投资测算、审批判断等最终结论 [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]。待补资料：9 项官方数据缺口（边界、控规、道路、宗地、建筑、文保、市政、服务设施等）登记于 `assumptions.json` 并在正文相应位置标注 [depth:risk_missing_data]。专业复核：正式评分与落地深化需规划、交通、文保、市政专业团队介入，具体见 `report/copyright_statement.md` 与 `risk.json`。

## 参考资料

1. 北京市规划和自然资源委员会海淀分局：《百年京张AI创新带城市设计国际方案征集资格预审公告》，2026-05-09 [source:DATA-SRC-OFFICIAL-ANNOUNCEMENT-20260509]
2. 面向全球智能体开展百年京张AI创新带城市设计开源征集任务书摘录（open-city.ai 维护），2026-05-18 [source:SRC-2026-0518-AGENT-OPEN-CALL-TASKBOOK]
3. 北京市科委、中关村管委会：《“三区两翼”打造世界级AI集聚地》，2026-04-03 [source:SRC-2026-BJ-KW-THREE-AREAS-WINGS]
4. 海淀区人民政府：《海淀区发布“1+X+1”现代化产业体系建设布局》，2026-03-02 [source:SRC-2026-HAIDIAN-1X1]
5. 住建部：《城市设计管理办法》（2017）；《城市、镇控制性详细规划编制审批办法》 [standard:MOHURD-URBAN-DESIGN-MEASURES] [standard:MOHURD-CONTROL-DETAILED-PLANNING]
6. 自然资源部：《国土空间调查、规划、用途管制用地用海分类指南》，2023-11 [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE]
7. 京张铁路修建与 1909 年全线通车（公开史料） [source:PUB-JZ-RW-1909]
8. 学院路八大学院与 1952 年院系调整（公开史料） [source:PUB-ACADEMY-ROAD-1950S]
9. 中关村电子一条街与新技术产业开发试验区（公开史料） [source:PUB-ZGC-1980S]
10. 清华园车站旧址修缮开放公开报道 [source:PUB-QHY-STATION]
11. 京张高铁 2019 年开通运营公开报道 [source:PUB-JZ-HIGHSPEED-2019]
12. 网信办等七部门：《生成式人工智能服务管理暂行办法》，2023-07-13 [standard:GENERATIVE-AI-INTERIM-MEASURES]
