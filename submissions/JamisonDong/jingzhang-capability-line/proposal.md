---
title: "京张共能线：面向所有人的 AI 城市能力基础设施"
author_github: "JamisonDong"
language: "zh"
translation_file: "proposal.en.md"
license: "COMMUNITY-DISPLAY-ONLY"
summary: "以增强人的城市行动能力为核心，把京张遗址公共空间、三处AI重点区和两翼服务网络组织成一线三所两翼十二驿四标的可验证、可退出、可转人工城市创新体系。"
tracks: ["ai-traffic-walkability", "enterprise-services-ecosystem", "civic-agent-governance"]
scenarios: ["ai-traffic-walkability", "enterprise-service-copilot", "public-safety-operations-review"]
---

# 京张共能线：面向所有人的 AI 城市能力基础设施

Jing-Zhang Capability Line — 让 AI 扩展每个人的城市行动能力。全部空间动作均为概念建议、参考方案或可供专业团队深化研究，不替代正式规划，不构成政府审定或实施承诺。

## 设计依据与资料清单

本方案从一个可检验的问题出发：世界级 AI 创新带除了集聚模型、算力、企业和人才，能否让不同年龄、身体条件、语言背景与工作时段的人获得更多行动选择，而不是被新的数字门槛排除？依据官方公告，项目要同时构建世界级 AI 创新生态、适配 AI 新质生产力的城市形态和全球人才向往的高品质城区；面向 Agent 的任务书进一步要求 AI 原生场景、公共利益、人本治理、来源可追溯和人工最终判断。[source:OFFICIAL-ANNOUNCEMENT] [source:AGENT-TASKBOOK] [standard:PROJECT-OFFICIAL-ANNOUNCEMENT] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]

已确认事实包括：43.6 平方公里统筹研究范围、约 11.4 平方公里总体设计范围、三处重点区名称与约面积、三大定位、五大功能和六项 Agent 任务。合理推断是“京张共能线”的空间结构、场景和运营机制。待验证未知包括官方红线、控规、道路、权属、建筑、市政、文保和实施主体。[source:SOURCE-REGISTRY] [source:PROCESSED-FACT-PACK] [depth:existing_conditions_diagnosis]

提交采用仓库 `provisional_boundaries.geojson`。`geometry/site_boundary.geojson` 与 `geometry/key_areas.geojson` 均明确为 `provisional_constraint`，只用于生成、展示、拓扑和 intake 自检，不是 official redline，也不支撑精确法定面积。[source:BOUNDARY-SOURCE] [source:KEY-AREA-SOURCE] [data:geometry/site_boundary.geojson#SITE-001] [data:geometry/key_areas.geojson#PROV-KEY-001] [metric:site_area_sqm]

![总体概念、证据边界与空间结构](assets/figures/site-overview.png)

## 三层范围工作框架

统筹研究范围回答“怎样形成面向所有人的 AI 创新生态”；总体设计范围回答“怎样把能力公平转译为空间网络、更新项目与公共服务”；重点区域范围回答“怎样在三种创新环境中测试并形成可转化组件”。三层不是三套互不关联的图，而是从产业机制到空间载体再到场景验证的连续证据链。[depth:three_level_scope_framework] [depth:overall_spatial_structure]

总体结构为 一线、三所、两翼、十二驿、四标：一线是连续无障碍的京张共能公共主线；三所是众智园“共能验证工场”、AI 原点“共能学习公地”、大钟寺“共能城市客厅”；两翼是中关村科技服务翼与小月河场景赋能翼；十二驿承载场景卡；四标是可参与、可质询、可留下贡献记录的 AI 朝圣地标。这个结构以 [data:geometry/land_use.geojson#LU-005]、[data:geometry/roads.geojson#ROAD-001] 和 [data:geometry/public_space.geojson#PUBLIC-001] 表达，而不新增伪精确规划边界。

![三层传导与用地能力链](assets/figures/land-use-structure.png)

## 统筹研究范围产业与未来城市研究

方案提出“能力技术产业链”：无障碍智能交互、辅助机器人、可信健康与照护 AI、多语公共服务、包容性内容与商业、公共利益算法审计六类方向，共享算力、数据、场景、标准、法务、资本、人才与公众反馈八类要素。众智园侧重安全验证与标准，中关村科技服务翼提供知识产权、融资、合规和认证，AI 原点形成高校—开源社区—创业团队转化接口，小月河翼提供低风险实景试验，大钟寺承接产品体验、内容传播和国际交往。所有企业、资金和政策机制均为建议，不虚构名单、投资额或承诺。[standard:MOHURD-URBAN-DESIGN-MEASURES]

六个国际案例不是可复制模板，而是机制库：

1. 新加坡榜鹅数码园区：高校、企业、政府与开放数字平台共处，借数字孪生和生活实验室降低跨系统试验成本；转化为“三所共享的受控测试接口”。[source:GLOBAL-PUNGGOL]
2. 赫尔辛基 Kalasatama：以“轻松日常”为目标，用居民参与和敏捷试点把技术采购变成共同设计；转化为“小额、短周期、可退出”的场景准入。[source:GLOBAL-KALASATAMA]
3. 首尔数字包容计划：社区学习中心、上门教育、帮助台、老年讲师和 AI tutor 组合；转化为“技术培训—就业—互助”的能力循环。[source:GLOBAL-SEOUL-INCLUSION]
4. 新加坡 Enabling Village：通用设计、辅助技术、就业培训、零售与社区服务共址；转化为“产品验证必须与真实生活和就业机会相连”。[source:GLOBAL-ENABLING-VILLAGE]
5. Toyota Woven City：围绕人、货物、信息和能源移动建立共创测试场；本方案吸收其多主体试验方法，同时增加公共空间 opt-out、申诉和人工接管。[source:GLOBAL-WOVEN-CITY]
6. Barcelona Decidim：把提案、会议、公众意见和实施跟踪留在可追溯公共界面；转化为“共能场景账本”，记录为什么试、谁负责、何时停止。[source:GLOBAL-BARCELONA-DECIDIM] [metric:global_case_count]

品牌主名“京张共能线”中的“共”指公共、共同与共创，“能”指 capability 而非单纯算力。英文名 `Jing-Zhang Capability Line`；口号为“让 AI 扩展每个人的城市行动能力”。Logo 方向以开放的字母 C、京张轨迹和三枚节点构成，保持开口，象征系统可进入、可退出、可修正；使用原创几何和系统字体，不借用企业商标。

## 总体设计范围城市更新与控规深度城市设计

用地结构不是给传统地块贴 AI 标签，而是把研发验证、学习协作、社区服务、包容性商业和连续公园五类空间组成能力链。`land_use.geojson` 由同一提交边界顺序切分与差集生成，完整覆盖、无缝、无重叠；其面积只是 provisional geometry 下的设计复算。[standard:MNR-LAND-USE-CLASSIFICATION-GUIDE] [depth:land_use_layout] [data:geometry/land_use.geojson#LU-001]

建筑策略坚持“先调查、再复用、后新增”。`buildings.geojson` 中 9 个多边形不是现状建筑或拟拆建结论，而是三处重点区内的概念性适应性更新包络，用于测试无障碍智能、辅助机器人、开源协作、家庭支持和公共申诉等功能。容积率、建筑高度、建筑密度、退线与总建筑规模全部保持 unknown，等待官方控规、现状测绘和权属资料。[standard:MOHURD-CONTROL-DETAILED-PLANNING] [standard:MOHURD-ARCH-DESIGN-DEPTH-2016] [depth:development_intensity_controls] [depth:height_massing_character] [depth:retain_renovate_demolish] [data:geometry/buildings.geojson#BLDG-001] [metric:building_footprint_area_sqm]

更新项目以公共价值和可逆性排序：先做无障碍审计、导视与帮助台等轻量试点，再做有明确需求和运营方的适应性更新，最后才讨论需要法定规划、工程和产权协调的重资产项目。任何阶段都设置“停止条件”：安全事件、低使用率、歧视性结果、无法人工接管、公众反对或维护责任不清时暂停并复核。

## 重点区域详细设计

![三处重点区域的差异化角色与深化门槛](assets/figures/key-areas.png)

众智园｜共能验证工场。 重点建立辅助机器人共行、无障碍交互和可信照护 AI 的标准验证接口。绿色空间中的测试只在划定时段、可见标识、人工安全员和物理隔离条件下进行；“安全治理廊”向公众解释模型边界、失败案例与停止机制。清河界面、五环联系、河道与生态条件均待官方资料核实。[data:geometry/key_areas.geojson#PROV-KEY-001]

北京 AI 原点社区｜共能学习公地。 把高校策源、开源辅助技术、人才家庭服务与数字能力教育放在同一公共学习网络。空间组件包括开源能力墙、万语亭、亲子/老年帮助台、无障碍原型工坊和成果转化会客厅。涉及校区、园区、站点和现状建筑的动作只表达接口与步行联系意图，不越过权属和审批。[data:geometry/key_areas.geojson#PROV-KEY-002]

大钟寺｜共能城市客厅。 以包容性商业、智能终端、内容消费、多语服务和国际交往为重点，把大钟寺站周边定义为“任何人都能理解和使用 AI 服务”的公开体验入口。四象限步行连通、非机动车停放和站点一体化均为交通概念建议，需道路红线、管线、客流和消防复核。[data:geometry/key_areas.geojson#PROV-KEY-003] [depth:three_key_area_detailed_design] [metric:key_area_count]

## AI 创新生态、人才画像与 AI+ 场景

七类用户画像共同检验方案：[metric:persona_count]

- AI 研究者/工程师：需要可复现实验、可信评测、跨机构协作和生活支持。
- 初创企业与中小团队：需要低成本试验、合规咨询、用户反馈和产品展示。
- 周边居民与照护者：需要低扰动、可退出、可转人工的日常服务。
- 老年人：需要低学习门槛、普通电话/线下帮助台、重复练习和可信联系人。
- 残障与神经多样性使用者：需要共创权、无障碍连续性、多感官冗余和安静选项。
- 夜间工作者与服务人员：需要夜间安全、休息、交通信息和不依赖智能手机的入口。
- 国际学生、访客与人才家庭：需要多语、办事导航、儿童友好和跨文化公共生活。

十二张场景卡全部标注空间、数据边界、人工复核和退出方式；其中 01-04 为产业测试验证场景：[metric:scenario_card_count] [metric:testing_scenario_count]

1. 无障碍智能导航校准路（测试验证）：比较视觉、语音、触觉与人工引导；只记录匿名任务完成率，使用者可完全关闭 AI。
2. 辅助机器人共行场（测试验证）：测试人机让行、速度、急停与不同辅助器具；现场安全员拥有即时停机权。
3. 多模态包容性交互实验室（测试验证）：与残障和神经多样性共创界面；不得用单一“正常用户”基准替代真实测试。
4. 可信照护 AI 沙盒（测试验证）：只测试转介和提示，不做自动诊断；高风险输出必须转专业人员。
5. 双路径慢行助手：同时提供安静路线和活力路线；无手机也能通过实体导视完成行程。
6. 开源辅助技术发布厅：展示许可、贡献者、复现实验和适用边界，失败记录与成功案例同等可见。
7. 亲子 AI 学习亭：家长可见、教师可复核、儿童可随时退出；不做情绪操控和商业画像。
8. 老年数字帮助台：AI 先做低风险解释，复杂事项转人工；鼓励学员成为同伴导师。
9. 万语人才抵达站：多语办事和生活导航，明确机器翻译置信度与人工口译入口。
10. 包容性商业共创街：测试可达结账、低刺激时段、无障碍菜单与服务机器人，不绑定单一供应商。
11. 公共利益 AI 申诉站：任何人可查询场景规则、提出异议、要求删除数据或请求人工复核。
12. 京张记忆共述器：基于清权史料提供多语、无障碍文化叙事；不生成伪历史，不使用未经授权肖像。

## 用地、建筑规模与拆改留方案

五类用地占比由提交几何直接复算，但不作为已批用地：研发与可信测试、开放学习与科研协作、社区服务与人才家庭支持、包容性商业与国际交往、京张共能线公园绿地。相邻分区共享同一切割边界，避免独立手绘造成缝隙或叠压。[data:geometry/land_use.geojson#LU-005]

拆改留只给出方法，不给具体结论：具有历史、社区记忆、低碳再利用或适配能力的建筑优先保留；能够通过无障碍、消防、机电和首层公共性改造满足需求的建筑优先更新；仅在官方调查证明结构、安全、功能和公共利益无法通过改造实现时，才进入专业团队论证的重建选项。建筑风貌采用“铁路工程的清晰结构 + 中关村开放创新的可见过程 + AI 时代可解释界面”，避免赛博霓虹和装饰性科技贴片。

## 交通、轨道、市政与公共服务设施

交通系统由一条连续共能主线和五条东西缝合支线组成，长度 [metric:conceptual_mobility_network_length_m] 仅为 provisional geometry 下的概念线长。主线服务步行、骑行、轮椅、婴儿车和辅助移动设备；支线把站点、社区、园区和公园连接起来。任何 AI 导航都必须保留实体导视、人工帮助和无感知通行路径。[depth:traffic_rail_slow_parking] [data:geometry/roads.geojson#ROAD-001]

新型基础设施按“低侵入、边缘处理、最小数据、可断开”配置：公开 Wi-Fi 与辅助定位采用分区授权；端侧算力优先处理本地低风险任务；机器人设置地理围栏和物理急停；高风险照护、交通和公共安全信息转人工。能源、通信、排水、消防与算力容量均待专项复核，不给工程结论。[depth:municipal_new_infrastructure] [data:geometry/constraints.geojson#CONSTRAINTS]

![共能通行协议与蓝绿公共空间](assets/figures/mobility-bluegreen.png)

## 蓝绿空间、公共空间与城市风貌

共能线以京张遗址公园为连续公共骨架，叠加感官友好静心花园、可休息的短距离分段、遮阴与饮水、可读导视、夜间低眩光和不依赖手机的服务。概念绿地比例 [metric:green_ratio]、公共空间比例 [metric:public_space_ratio] 由对应 GeoJSON 与提交边界复算；官方边界、文保、蓝线和景观方案更新后整体重算。[depth:blue_green_public_space] [data:geometry/green_space.geojson#GREEN-001] [data:geometry/public_space.geojson#PUBLIC-001]

四个 AI 朝圣地标不是巨型屏幕或网红装置：[metric:pilgrimage_landmark_count]

- 共能零公里：标记“AI 从人的能力出发”的起点，并记录贡献者与公共问题。
- 可达性天平：把通行时间、失败率、人工求助和不同使用者体验公开展示为可讨论指标。
- 万语亭：提供多语、多模态、安静交流与人工接续，展示语言技术的局限。
- 人机共行场：把机器人速度、让行、急停和责任边界变成公众可观察规则。

文化叙事沿“自主筑路—自主创新—共同赋能”展开：京张铁路代表公开可检验的工程实践，中关村代表知识与创业协作，AI 新文化则必须加入透明、申诉、退出与人类责任。所有史料、字体、图像和标识需清权，地标选址需文保复核。

## 更新项目清单、实施政策与分期计划

参考项目包包括：共能线无障碍审计与导视、众智园验证工场、原点开源能力墙、大钟寺万语城市客厅、老年数字帮助台网络、人机共行安全协议、公共利益 AI 申诉站、京张记忆共述器。每个项目必须同时明确公共问题、目标人群、运营者、数据最小化方案、人工接管、退出方式、维护预算来源和停止条件。[depth:renewal_project_list]

`phasing.geojson` 表达三个参考顺序而不是确定时序：第一阶段先做低成本审计、共创和临时试点；第二阶段在权属、建筑和专业条件明确后推进适应性更新；第三阶段形成跨三区两翼的标准、数据和活动网络。任何固定年份、投资额、实施主体和审批结论均未确认。[depth:phasing_implementation] [data:geometry/phasing.geojson#PHASE-001]

长期运营采用“一本账、两道门、三类日历”：一本“共能场景账本”公开目标、风险、反馈和退出记录；技术门审查安全、隐私、无障碍与互操作，公共门审查需求、影响和申诉；日历包括月度开放测试、季度公共复盘和年度全球 Capability Week。活动是运营建议，不是已确定政府安排。

## 指标体系、面积复算与合规矩阵

![指标、证据链与未知项](assets/figures/metrics-evidence.png)

机器证据遵循 `geometry → metrics → matrices → proposal → figures/PDF/HTML` 的权威顺序。[depth:metrics_recalculation] 已知指标包括边界面积、概念建筑基底、绿地/公共空间比例、概念慢行线长、重点区/场景/画像/地标/案例数量；FAR 等法定强度保持 unknown。自检需验证土地覆盖、图层在界、指标一致、HTML 离线安全、专业标准与深度引用。

合规矩阵逐项覆盖公告 1.3、1.4、1.5 与 agent.1-agent.6；标准矩阵覆盖项目公告、Agent 任务书、城市设计管理、控规编制和用地分类。建筑工程设计深度标准当前缺少官方文件，仅作为数据缺口，不冒充已满足的强制依据。[standard:MOHURD-ARCH-DESIGN-DEPTH-2016]

## 风险、版权与合规说明

首要风险不是“方案不够精确”，而是在资料不足时制造虚假精确。官方边界、重点区 polygon、控规、道路、地块、现状建筑、市政、文保和公共服务底数缺失，已写入 `assumptions.json`；因此所有精度敏感指标、拆改留、工程线位和实施判断都降级为概念建议。[depth:risk_missing_data]

AI 场景遵守数据最小化、明确告知、可退出、人工复核、可申诉和可停止。不得用人脸识别、连续轨迹、个人健康或未成年人数据作为默认条件；不得把效率作为凌驾于尊严、安全和公共选择之上的理由。

所有核心图由本提交 GeoJSON、metrics 和原创版式程序生成；PDF 由 ReportLab 生成；未使用商业地图、远程瓦片、新闻截图、他人图纸、企业标识或未经授权字体。外部案例仅引用官方网页的文本机制，未复制图片。具体说明见 `report/copyright_statement.md`。

本方案不声称官方批准、审定控规、最终土地权属、确认建设规模、投资承诺或保证实施。官方 polygon 或任务资料更新后，应替换边界并重新生成全部几何、指标、图件、PDF、HTML 与自检结果。

## 参考资料

本节的设计意图是把“已确认事实、可转译机制、提交几何与待补资料”分开追溯。项目范围、任务要求与评审边界以官方公告、Agent 任务书及仓库资料包为首要证据；六个国际案例只用于提炼开放测试、数字包容、通用设计和可追溯参与机制，不用于证明北京场地现状或直接复制空间形式。[source:OFFICIAL-ANNOUNCEMENT] [source:AGENT-TASKBOOK]

几何与指标证据遵循 `site_boundary/key_areas → land_use/roads/green_space/public_space → metrics → matrices → proposal/figures`。其中边界与三处重点区仍是 provisional constraint，所以面积、比例和线长只承担提交自检与方案比较功能；正式红线替换后必须整体重算，不能把当前数值转写为控规或审批指标。[source:BOUNDARY-SOURCE] [source:KEY-AREA-SOURCE] [metric:site_area_sqm]

当前最关键的数据缺口是官方红线、控规强度、道路红线、权属、现状建筑、市政容量、消防和文保边界。它们直接限制拆改留、建筑高度、开发强度、交通组织和地标选址，因此相关结论均保持 unknown 或 conceptual recommendation；后续深化应先补齐这些资料，再由规划、建筑、交通、市政、文保与运营团队共同复核。[source:SOURCE-REGISTRY] [source:PROCESSED-FACT-PACK]

- [source:SITE-PACKAGE] `brief/site-package/`
- [source:SOURCE-REGISTRY] `data/source_registry.json`
- [source:PROCESSED-FACT-PACK] `data/processed/agent_fact_pack.md`
- [source:OFFICIAL-ANNOUNCEMENT] 官方资格预审公告本地快照
- [source:AGENT-TASKBOOK] 面向全球智能体开源征集任务书摘录
