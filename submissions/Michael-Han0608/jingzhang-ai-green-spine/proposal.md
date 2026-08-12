---
title: "京张编译带 COMPILE JINGZHANG：把百年铁路的源代码，编译成可运行的AI创新带"
author_github: "Michael-Han0608"
language: "zh"
proposal_format_version: "2"
bilingual_contract_version: "1"
translation_file: "proposal.en.md"
license: "COMMUNITY-DISPLAY-ONLY"
summary: "以「编译」为总体概念：把百年京张铁路的自主工程源代码、中关村的代码文化、AI时代的人才与数据，编译成一条可测试、可评审、可发布、可回滚的城市创新带。一条编译主线程（遗址公园绿廊）串联三座节点（众智园测试坞、AI原点评审庭、大钟寺发布台）与两翼工具（中关村工具链翼、小月河沙盒翼），以12张AI场景卡、6类用户画像、3处朝圣地标和年度编译节运营体系落实三大定位与五大功能。"
tracks: ["ai-traffic-walkability", "jingzhang-heritage-narrative", "enterprise-services-ecosystem"]
scenarios: ["ai-traffic-walkability", "ai-cultural-guide", "ai-health-service-navigation", "robot-delivery-low-speed", "enterprise-service-copilot"]
iteration: "v1.0"
---

# 京张编译带 COMPILE JINGZHANG：把百年铁路的源代码，编译成可运行的AI创新带

## 设计依据与资料清单

本方案以北京市规划和自然资源委员会海淀分局发布的《百年京张AI创新带城市设计国际方案征集资格预审公告》为第一依据，以面向全球智能体的开源征集任务书为共创依据，以 `brief/site-package/` 中的设计任务书、允许设计空间、枚举、指标范围和校验模式为机器可读依据 [source:OFFICIAL-ANNOUNCEMENT] [source:AGENT-TASKBOOK] [source:SITE-PACKAGE]。方案正文只保留与判断直接相关的少量证据标记，完整来源、指标、标准、设计深度与任务覆盖分别保存在 `sources.json`、`metrics.json`、`standard_matrix.json`、`design_depth_matrix.json` 与 `compliance_matrix.json`。

截至本版提交，公开渠道尚未取得官方精确红线与三处重点区 polygon。本方案按仓库要求使用维护者登记的临时粗略边界生成，并在所有图层、正文、HTML 与图纸中标注 `provisional_constraint`：该边界仅用于方案生成、可视化和设计讨论，不能作为 official redline、审批依据、精确面积依据或法定控制结论 [source:PROVISIONAL-BOUNDARIES] [source:SOURCE-REGISTRY]。官方 polygon 发布后，场地边界、重点区、用地、建筑、道路、绿地、公共空间、分期与全部指标需整体重算，不能只替换单个文件；评审方对 eligibility、评分与接受条件的判断以其正式规则为准，本包不对此作任何预判 [assumption:A-PROVISIONAL-001]。

方案内容全部为开放共创概念建议：所有空间落地建议表述为“概念建议”“参考方案”“可供专业团队深化研究”，不替代正式规划，不构成政府审定结论，不涉及控规调整、容积率、建筑高度、拆改留、工程线位、投资测算或审批判断等法定结论 [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK] [depth:existing_conditions_diagnosis]。生成方法、来源与限制在 `sources.json`、`assumptions.json` 和本文件风险章节完整披露。

![资料证据链与提交包关系图](assets/figures/site-overview.png)

## 三层范围工作框架

公告确定三层工作范围：统筹研究范围约 43.6 平方公里（北至北五环路、东至京藏高速、南至西直门外大街、西至万泉河路），总体设计范围约 11.4 平方公里（京张遗址公园周边 1-2 公里城市地区和产业区），重点区域范围约 368.4 公顷（自北向南为众智园AI自主创新加速区、北京AI原点社区、大钟寺AI产业聚集区）[source:OFFICIAL-ANNOUNCEMENT] [metric:site_area_sqm]。三层范围分别回答“产业与城市形态往哪里去”“更新与风貌怎么落”“重点区如何精细实施”三个递进问题，对应 `compliance_matrix.json` 中公告 1.3、1.4、1.5 的逐条映射 [depth:three_level_scope_framework]。

本方案在三个层次上使用同一套“编译”工作方法：**统筹研究范围 = 需求分析与架构设计**（确定 AI 创新生态的产业链、要素流和协同回路）；**总体设计范围 = 代码组织与构建**（把产业策略编译为用地、建筑、道路、绿地、公共空间和分期图层，形成可复算的城市结构）；**重点区域范围 = 单元测试与集成**（在三处重点区做达到规划综合实施方案深度的详细设计，验证功能、形态、交通与场景的可行性）。三个层次共享同一套坐标体系（EPSG:4326 交换、EPSG:4548 面积复算）与同一套证据链 [data:geometry/site_boundary.geojson#SITE-001] [metric:key_area_count]。

![三层范围与空间工作框架图](assets/figures/land-use-structure.png)

## 统筹研究范围产业与未来城市研究

### 总体概念：京张编译带 COMPILE JINGZHANG

统筹研究范围的核心判断是：**京张铁路是中国工程自主的“源代码”，中关村是中国代码与开源文化的“编译器”，AI 创新带应当成为把人才、数据、场景“编译”为可运行城市场景的开放构建管线。** 方案由此提出主名称“京张编译带”，英文名 COMPILE JINGZHANG，副题“The Compiling Belt：from China's first self-built railway to the open-source city”。

命名体系采用“一带 · 一线 · 三节点 · 两翼 · 十二格”层级：一带即编译带本体；一线即沿京张遗址公园的“编译主线程”（城市级开放构建管线，北段测试、中段评审合并、南段发布运行）；三节点分别命名为“测试坞（TEST DOCK）”“评审庭（REVIEW COURT）”“发布台（RELEASE DECK）”；两翼为“工具链翼（TOOLCHAIN WING，中关村科技服务翼）”与“沙盒翼（SANDBOX WING，小月河场景赋能翼）”；十二格为十二处可复制的公共空间组件单元。该命名体系与三大定位一一对应：百年京张文化带是“历史源代码”，都市AI生活体验带是“运行时”，AI融合创新带是“编译器”本身 [source:AGENT-TASKBOOK] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK] [depth:overall_spatial_structure]。

Logo 与视觉识别方向：以詹天佑“人”字形展线的线形为骨架，与代码括号“{ }”和编译箭头“→”同构，形成“之”字轨道向代码管线转译的标识；主色为京张绿（遗产）、代码蓝（创新）与信号黄（运行状态），三色同时用于导视、场景状态灯与活动视觉系统。字体、图形均为自主设计方向，不复制既有城市、园区或企业标识，不承诺任何商标结论 [source:AGENT-TASKBOOK]。

### 三大定位、五大功能与三区两翼协同回路

三大定位（百年京张文化带、都市AI生活体验带、AI融合创新带）被转译为编译带的三重身份：**文化带 = 只读的历史源码库**（遗产保护与叙事），**体验带 = 可运行的公共运行时**（人人可体验的场景），**创新带 = 持续迭代的构建环境**（产业与治理）。五大功能分别落在空间上：AI全栈自主创新体系由众智园测试坞承担“构建与测试”，世界级AI创新生态由AI原点社区评审庭承担“评审与合并”，AI+场景赋能新范式由小月河沙盒翼承担“场景测试”，智能化AI活力城市由编译主线程承担“公共运行”，AI治理全球话语权由大钟寺发布台与场景上线协议承担“发布与治理公示” [source:AGENT-TASKBOOK] [depth:three_level_scope_framework]。

三区两翼形成“依赖注入”式协同回路：中关村科技服务翼（西翼）提供资本、IP、算力与要素配置等“开发工具”；小月河场景赋能翼（东翼）提供真实场景、数据与测试场地等“测试环境”；三处重点区分别作为测试、集成、生产三套环境的载体，通过编译主线程双向联通，形成“需求上行、成果下行”的持续集成回路。该回路不新增行政边界，仅作为产业与空间协同的工作框架 [data:geometry/key_areas.geojson#PROV-KEY-001] [data:geometry/key_areas.geojson#PROV-KEY-002] [data:geometry/key_areas.geojson#PROV-KEY-003]。

### 全球AI创新生态案例（6例）

| 案例 | 生态特征 | 可转化机制（概念建议） |
| --- | --- | --- |
| 美国硅谷（斯坦福—沙丘路走廊） | 大学策源、风险资本密集、全球人才流动 | 原点社区“校区—园区—街区”连续界面，成果转化驿站与路演机制 [source:CASE-SILICON-VALLEY] |
| 伦敦国王十字 King's Cross | 铁路工业遗产整体更新为知识城区，中央圣马丁等机构入驻 | 编译主线程遗产保护与创新业态并置的更新范式 [source:CASE-KINGS-CROSS] |
| 新加坡裕廊创新区/榜鹅数字园区 | 政府主导的规划测试环境，自动驾驶与数字服务先行试验 | 众智园“先测试后开放”的公共测试场与许可沙盒机制 [source:CASE-SINGAPORE] |
| 深圳南山高新区 | 龙头企业带动、硬件软件全栈、产城紧凑 | 众智园全栈自主体系与龙头企业开放接口 [source:CASE-SHENZHEN] |
| 杭州城西科创大走廊 | 平台企业牵引、区域协同、场景外溢 | 小月河沙盒翼的“场景—数据—运营”外溢路径 [source:CASE-HANGZHOU] |
| 韩国板桥科技谷 Pangyo | 政府建设创业集聚区、产城融合 | 大钟寺“智能原生新业态街区”的运营与品牌机制 [source:CASE-PANGYO] |

案例仅作为背景性学习材料，不构成对任何企业、投资或政策的承诺；其经验转化为空间与运营机制时保持“概念建议”属性 [source:AGENT-TASKBOOK]。

## 总体设计范围城市更新与控规深度城市设计

总体设计范围以控制性详细规划的城市设计深度组织成果：以编译主线程（约 300 米宽的南北绿廊，对应 `geometry/land_use.geojson` 中 1401 公园绿地序列）为骨架，四条东西向“缝合道路带”（1207 城镇村道路用地）为横轴，形成“一纵四横、三节点两翼”的空间结构 [data:geometry/land_use.geojson#LU-026] [data:geometry/roads.geojson#ROAD-001] [depth:land_use_layout]。用地分区覆盖全部提交边界、无缝无叠：科研用地 222.7 公顷（19.5%）、商业服务业用地 120.3 公顷（10.5%）、居住用地 109.6 公顷（9.6%）、教育用地 80.6 公顷（7.1%）、公园绿地 250.0 公顷（21.9%）、道路用地 187.7 公顷（16.4%），其余为广场、体育、医疗、社区服务与防护绿地 [metric:land_use_0802_area_sqm] [metric:land_use_05_area_sqm] [metric:land_use_1401_area_sqm]。

城市更新采用“保主线、修界面、置场景”的总体框架：编译主线程以京张遗址公园及周边绿地为保留与强化对象，不做拆改结论；沿线街区以“界面修补+场景植入”为主，提出功能置换与公共空间更新的方向性建议；三处重点区内的更新项目以概念清单形式提出，全部标注待控规、权属与工程条件确认 [standard:MOHURD-CONTROL-DETAILED-PLANNING] [depth:retain_renovate_demolish]。容积率、建筑高度、建筑密度、绿地率、退线与道路红线等法定控制条件在官方资料中缺失，本方案一律列为“待正式控规条件确认”，不以推测值冒充审定指标 [metric:floor_area_ratio] [depth:development_intensity_controls]。

建筑规模采用“概念估算+待审定”的双轨表达：由 `geometry/buildings.geojson` 中 52 处概念建筑基底按类型层数假设复算总建筑面积约 481.3 万平方米（概念值，置信度 low），作为空间供给讨论的参考量级；最终建筑规模以控规与建筑方案为准 [metric:total_floor_area_sqm_concept] [metric:building_footprint_area_sqm]。建筑密度 7.8%、绿地率 24.7%、公共空间比例 25.3%、道路比例 16.4% 均由几何复算，公式与来源见 `metrics.json` [metric:building_density] [metric:green_ratio]。道路比例与公共空间比例见 metrics.json。

## 重点区域详细设计

三处重点区按“测试坞—评审庭—发布台”三套编译环境分别详细设计，均达到规划综合实施方案的城市设计深度，并由 `geometry/key_areas.geojson` 的三处 provisional 重点区要素锚定 [data:geometry/key_areas.geojson#PROV-KEY-001] [depth:three_key_area_detailed_design]。三区之间不得视为互斥边界：它们是同一编译管线上的三个工序。

### 众智园AI自主创新加速区（测试坞 TEST DOCK，约 192.1 公顷）

定位：AI全栈自主创新体系的“测试环境”。空间结构：清河滨水防护绿带（1402）与南北绿廊北段（1401）夹合东西两组科研测试园区（0802），形成“绿边抱园”的花园型测试街区 [data:geometry/land_use.geojson#LU-022] [data:geometry/land_use.geojson#LU-023] [metric:key_area_zhongzhiyuan_ai_acceleration_area_sqm]。设计动作：在科研组团内提出“模型体检站”公共测试界面与清河低速自动驾驶测试环的概念选址；沿清河界面布置低碳创新交往廊，承载产业展示、标准工作坊与安全治理讨论；对外交通组织依托五环路与清河路方向性接驳，均表述为可供专业团队深化的概念建议。实施风险：测试场涉及道路、市政、安全与权属条件，须在正式条件确认后深化 [source:OFFICIAL-ANNOUNCEMENT] [depth:three_key_area_detailed_design]。

### 北京AI原点社区（评审庭 REVIEW COURT，约 104.3 公顷）

定位：世界级AI创新生态的“评审与合并环境”，近校创新、成果转化与开源协作的核心。空间结构：中央文化节点“源代码墙”（0803，约 y=39.988 清华园车站旧址周边）嵌入绿廊，西侧为校区联动教育用地（0804），东侧为孵化研发组团（0802），外围补足居住（0701）与社区服务 [data:geometry/land_use.geojson#LU-030] [data:geometry/land_use.geojson#LU-021] [metric:key_area_beijing_ai_origin_community_sqm]。设计动作：提出“开源评审庭”（开源贡献评审、成果发布与人才特区的复合公共设施）概念；组织校区—园区—街区慢行缝合，强化五道口、清华东路西口轨道站点的接驳步行；在文化节点周边布置荣誉展示体系（开发者名录墙与京张工程师名录并置）。实施风险：清华园车站旧址涉及文物保护控制，文化节点只能作为周边环境的概念建议，不得触碰文保本体与建设控制地带 [source:AGENT-TASKBOOK] [standard:MOHURD-URBAN-DESIGN-MEASURES]。

### 大钟寺AI产业聚集区（发布台 RELEASE DECK，约 72.0 公顷）

定位：智能原生新业态与AI治理公示的“生产/发布环境”。空间结构：沿大钟寺站形成站城一体商业核心（05），东侧为企业研发组团（0802），核心北侧为“发布台”广场（1403）与主线程南段绿廊（1401）衔接 [data:geometry/land_use.geojson#LU-001] [data:geometry/land_use.geojson#LU-028] [metric:key_area_dazhongsi_ai_industry_cluster_sqm]。设计动作：提出大钟寺站四象限步行连通与站城一体化概念；在发布台广场布置“发布状态塔”公共信号装置（场景上线、测试中、可回滚三态显示）与数据要素/数字资产的合规展示界面；引导智能体、智能终端、内容消费业态在商业核心区集聚，规划绿地复合利用（活动草坪、测试快闪）作为业态与公共空间的缓冲。实施风险：轨道站点与商业空间改造涉及工程与权属条件，全部按待确认事项处理 [source:OFFICIAL-ANNOUNCEMENT] [depth:traffic_rail_slow_parking]。

![三处重点区域索引与设计任务图](assets/figures/key-areas.png)

## AI 创新生态、人才画像与 AI+ 场景

### 用户画像（6类）

| 画像 | 典型需求 | 空间响应 | 隐私与复核边界 |
| --- | --- | --- | --- |
| 开源开发者 | 发布、评审、协作、社区声誉、夜场工作 | 评审庭开源客厅、源代码墙荣誉展示、编译主线程夜跑社交 [data:geometry/land_use.geojson#LU-030] | 不采集个人行为轨迹，贡献数据仅聚合展示 |
| 初创团队 | 低成本办公、算力入口、测试场地、融资对接 | 众智园共享测试场、端侧算力服务点、中关村工具链翼对接 [data:geometry/land_use.geojson#LU-022] | 算力与数据服务须另行授权 |
| 头部AI企业员工 | 研发、展示、商务、国际接待 | 大钟寺企业研发组团与国际路演客厅 [data:geometry/land_use.geojson#LU-020] | 企业标识与案例须清权 |
| 高校师生 | 成果转化、跨校协作、实践课堂 | 原点社区校区联动教育用地与成果转化街 [data:geometry/land_use.geojson#LU-019] | 校园数据与科研成果须授权 |
| 周边居民（含老年人） | 通勤、休闲、社区服务、低扰动更新 | 社区服务中心带（0702）、医疗点（0806）、无障碍AI导航 [data:geometry/land_use.geojson#LU-024] | 不用于商业推荐，保留人工服务通道 [standard:BARRIER-FREE-ENVIRONMENT-LAW] |
| 国际访客与开发者游客 | 文化导览、场景体验、活动参与 | 编译主线程遗产AR导览、朝圣路线、发布周活动 [data:geometry/land_use.geojson#LU-026] | 导览数据最小化，不跨场景关联 |

### AI场景卡（12张，其中3张产业测试验证场景）

| 编号 | 场景卡 | 空间载体 | 服务对象 | 数据与隐私边界 | 人工复核 | 运营主体（概念） |
| --- | --- | --- | --- | --- | --- | --- |
| SC-01 | **模型体检站（产业测试验证①）** | 众智园测试坞 | 模型企业、评测机构、公众 | 仅公开评测结果与匿名指标 | 评测方法与结果由专业机构复核 | 测试场运营方+专业评测机构 |
| SC-02 | **清河低速自动驾驶测试环（产业测试验证②）** | 众智园清河界面 | 自动驾驶与机器人企业 | 测试数据不出授权范围 | 上路测试须法定许可与安全复核 | 园区运营方+交管部门 |
| SC-03 | **开源评审厅（产业测试验证③）** | 原点社区评审庭 | 开源社区、高校、企业 | 代码与评审记录按开源许可公开 | 评审结论由维护者与专家复核 | 开源社区理事会 |
| SC-04 | 发布状态塔 | 大钟寺发布台广场 | 公众、媒体、企业 | 仅展示已授权场景状态 | 状态展示内容须运营方审核 | 发布台运营方 |
| SC-05 | 遗产AR导览 | 编译主线程 | 游客、居民 | 位置数据仅用于导览且可关闭 | 历史叙事内容由文化专家审定 | 公园运营方+文化机构 |
| SC-06 | 无障碍AI导航 | 主线程与轨道站 | 老年人、残障人士 | 不采集健康与轨迹画像 | 保留人工指引与电话通道 | 公共服务中心 |
| SC-07 | 社区AI健康小屋 | 医疗服务带（0806） | 居民、老年人 | 健康数据不出医疗机构授权边界 | 由医务人员终审 [standard:BARRIER-FREE-ENVIRONMENT-LAW] | 医疗机构+社区 |
| SC-08 | 智能零售快闪格 | 大钟寺商业核心 | 消费者、品牌 | 消费数据最小化 | 促销与价格信息人工审核 | 商业运营方 |
| SC-09 | 开发者夜校与夜跑 | 编译主线程 | 开发者、居民 | 报名数据仅用于活动组织 | 活动安全预案人工审批 | 社区运营方 |
| SC-10 | 校园AI实践课堂 | 校区联动地块 | 大中小学生 | 教育数据不出校园授权边界 | 课程内容由教师审定 | 高校+中小学 |
| SC-11 | 城市运行数字孪生展示 | 发布台 | 公众、决策者 | 仅展示公开汇总数据 | 展示口径由数据治理委员会复核 | 城市运行中心 |
| SC-12 | 场景沙盒申请亭 | 小月河沙盒翼 | 企业、开发者 | 申请与测试数据分级授权 | 场景上线须人工评审 | 沙盒运营方 |

场景卡全部映射到具体图层与空间节点，并遵守数据最小化、公开来源、可解释与人工复核原则 [source:AGENT-TASKBOOK] [standard:GENERATIVE-AI-INTERIM-MEASURES]。未成熟技术一律表述为测试验证阶段，不写成已可全面部署；测试场景不表述为已批准运营 [depth:risk_missing_data]。

## 用地、建筑规模与拆改留方案

用地分类依据《国土空间调查、规划、用途管制用地用海分类指南》的表达逻辑，使用项目枚举中的标准代码，未使用自造分类 [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE]。`geometry/land_use.geojson` 完整覆盖提交边界且无缝无叠，31 个用地要素的代码与面积全部可由 `metrics.json` 复算 [data:geometry/land_use.geojson#LU-001] [depth:land_use_layout]。

建筑方案采用“保留—改造—新建”三类的方向性表达，不做地块级拆改留结论：编译主线程及文保相关界面以保留与修缮为主；沿线低效街区以界面修补、功能置换为主；三处重点区内的产业与公共设施以概念新建/更新为主，全部标注待权属、控规与工程条件确认 [data:geometry/buildings.geojson#BLDG-001] [depth:retain_renovate_demolish]。`geometry/buildings.geojson` 中 52 处概念建筑基底均落在可建设用地内、不触碰绿地与道路分区；其建筑类型（科研、商业、居住、教育、文化、体育、医疗、社区服务）对应各自的层数假设用于概念规模估算 [metric:building_footprint_area_sqm] [metric:total_floor_area_sqm_concept]。

建筑高度、体量与风貌控制只提出方向性引导（绿廊两侧界面低层高密度、节点建筑可识别、屋顶与信号色体系协同），不给出具体高度数值与退线结论；高度与强度控制以官方控规为准 [depth:height_massing_character] [metric:building_height_m]。

## 交通、轨道、市政与公共服务设施

交通策略围绕“一纵四横”展开：编译主线程慢行脊（南北约 7.4 公里概念慢行主线）承担步行、骑行与活动组织，四条东西缝合道路（约 1.0-1.1 公里/条）连接两侧街区与轨道站点方向 [data:geometry/roads.geojson#ROAD-009] [data:geometry/roads.geojson#ROAD-001] [metric:road_centerline_length_m]。轨道接驳重点放在五道口、清华东路西口与大钟寺站三处，提出站点周边慢行优先、无障碍连续、非机动车停放与活动日交通组织方向 [depth:traffic_rail_slow_parking]。停车与非机动车策略、道路红线与断面均须由正式交通与控规资料确认后深化 [assumption:A-CONTROLS-001]。

市政与新型基础设施提出“公共底座”方向：沿编译主线程布置分布式能源、端侧算力服务点与数据合规展示界面的概念选址，与社区服务带（0702）、医疗服务（0806）、教育（0804）和商业服务设施共同构成公共服务网络 [data:geometry/land_use.geojson#LU-024] [depth:municipal_new_infrastructure]。市政管线、消防、防洪排涝、海绵指标等工程数据缺失，均列为正式深化前置条件，不给出容量与负荷结论 [assumption:A-MUNICIPAL-001]。

![交通慢行与蓝绿公共空间复合系统图](assets/figures/mobility-bluegreen.png)

## 蓝绿空间、公共空间与城市风貌

蓝绿系统以编译主线程为核心：南北绿廊（1401，约 250.0 公顷）贯通北段众智园滨水界面与南段大钟寺站城核心，清河滨水防护绿带（1402）与两处广场节点（1403）作为次级锚点，构成“一线多点”的蓝绿公共空间网络 [data:geometry/green_space.geojson#GREEN-026] [metric:green_ratio] [metric:public_space_ratio]。绿地率 24.7%、公共空间比例 25.3% 支撑“绿色交往密度”：研究显示高绿地与公共空间比例是知识型人才择业与创新交往的重要条件，本指标用于说明人才生活品质的空间供给，而非法定绿地率结论 [depth:blue_green_public_space]。

### AI朝圣地标与荣誉展示体系（3处）

1. **「第一行代码」源代码墙**（原点社区，清华园车站旧址周边）：把京张铁路工程师名录与开源社区贡献者名录并置展示，寓意“从自主工程到开源协作”的精神传承；仅布置于文保范围外的公共环境，不触碰文保本体 [data:geometry/land_use.geojson#LU-030] [source:AGENT-TASKBOOK]。
2. **「模型体检站」测试观察窗**（众智园）：向公众开放 AI 模型测试过程的展示窗口，把“测试”本身变成可参观的公共事件；属概念设施，建成形式待专业深化 [data:geometry/land_use.geojson#LU-022]。
3. **「发布状态塔」**（大钟寺发布台广场）：以绿/黄/红三色信号灯体系公示场景状态（构建中、测试中、已发布/可回滚），把 AI 城市的运行状态变成公共语言；属公共艺术与信息装置方向，不涉及工程结论 [data:geometry/land_use.geojson#LU-028] [metric:land_use_1403_area_sqm]。

荣誉展示体系与“十二格”公共空间组件库联动：贡献者铭牌、场景状态灯、更新日志屏、可回滚说明牌等组件标准化，可在三处重点区与主线程节点复用。城市风貌控制遵循“绿廊为底、节点可识、信号色点睛”的方向，导视与标识系统沿用编译带视觉识别方向，与一带整体 Logo 系统保持层级关系、不混用 [standard:MOHURD-URBAN-DESIGN-MEASURES] [source:AGENT-TASKBOOK]。

### 文化叙事：三源合流

叙事主线为“三源合流”：**百年京张铁路的自主工程源代码**（中国自主设计第一条干线铁路、人字形展线、清华园车站）→ **中关村的代码与开源文化**（从电子一条街到开源社区）→ **AI 时代的可编译城市**（人才、数据、场景持续构建与回滚）。人字形展线被转译为“最早的分支与合并”：京张铁路用两条展线合并高度，AI 创新带用三区两翼合并产业与生活；从“铁轨准点”到“代码准点”再到“场景准点”，准点精神成为编译带的时间美学。国际传播叙事建议为：*“China's first self-built railway is now the open-source operating system of an AI city.”* 该叙事全部基于公开历史事实与概念转译，不歪曲史实、不把文化作为科技装饰 [source:AGENT-TASKBOOK] [depth:overall_spatial_structure]。

## 更新项目清单、实施政策与分期计划

### 更新项目清单（概念建议）

| 编号 | 项目 | 类型 | 位置 | 依赖条件 | 分期 |
| --- | --- | --- | --- | --- | --- |
| JZ-01 | 编译主线程南段贯通 | 公共空间/慢行 | 主线程绿廊南段 [data:geometry/land_use.geojson#LU-026] | 道路红线、桥下空间、交通组织复核 | 近期 |
| JZ-02 | 发布台广场与状态塔 | 公共空间/品牌 | 大钟寺发布台 [data:geometry/land_use.geojson#LU-028] | 公共空间许可、活动安全、版权清权 | 近期 |
| JZ-03 | 大钟寺站城一体化核心 | 更新/轨道接驳 | 大钟寺商业核心 [data:geometry/land_use.geojson#LU-001] | 轨道站点、权属、市政管线 | 中期 |
| JZ-04 | 源代码墙文化节点 | 文化/荣誉展示 | 原点社区文化节点 [data:geometry/land_use.geojson#LU-030] | 文保管控、公共环境许可 | 中期 |
| JZ-05 | 开源评审庭 | 产业服务/公共设施 | 原点社区 [data:geometry/land_use.geojson#LU-021] | 校区边界、权属、首层业态 | 中期 |
| JZ-06 | 众智园模型体检站与测试环 | 产业测试/公共展示 | 众智园科研组团 [data:geometry/land_use.geojson#LU-022] | 测试许可、安全、算力与数据授权 | 中期 |
| JZ-07 | 清河滨水创新界面 | 蓝绿/产业展示 | 众智园清河界面 [data:geometry/land_use.geojson#LU-031] | 河道蓝线、生态与防洪条件 | 长期 |
| JZ-08 | 小月河场景沙盒翼 | 场景运营/新基建 | 沙盒翼方向选址 | 数据授权、场景评审机制、运营主体 | 近期（机制先行） |

分期采用“机制先行、轻量试点、骨架成形、全网运营”四步：近期（1-3 年）以南段贯通、发布台试点与场景沙盒机制启动为主，全部为轻量设施与运营活动，无需重大工程；中期（3-5 年）建设评审庭、测试坞与站城核心，完成主线程全段骨架；长期（5-10 年）实现全网络运营。分期范围由 `geometry/phasing.geojson` 表达，面积可由 `metrics.json` 复算 [data:geometry/phasing.geojson#PH-001] [metric:phase_near_term_area_sqm] [depth:phasing_implementation]。

### 全球AI创新活动体系与长期运营（概念建议）

**年度活动体系**“京张编译四季节拍”：3 月春季构建日（Build Day，场景与项目路演启动）、6 月合并季（Merge Season，与中关村论坛联动发布成果）、9 月发布周（Release Week，场景集中上线与公众体验）、12 月回顾会（Retro，年度数据回顾与路线图更新）。**开发者社区**：建立“京张 Committers”章制度与贡献者荣誉展示，与源代码墙联动，形成可持续的社区声誉机制。**场景开放运营**：沙盒申请—评审—测试—上线—回滚四步机制，上线须人工评审与数据治理复核，任何场景可回滚。**公共体验运营**：编译主线程夜跑/骑行与朝圣路线（测试坞—评审庭—发布台）作为常年公共产品。**国际传播与招引转化**：全球 AI 城市编译邀请赛、场景上线直播与双语叙事，配套“成果→团队→空间→政策对接”转化路径。所有活动、招商、资金与政策安排均为概念建议或深化方向，不表述为已确定政府安排 [source:AGENT-TASKBOOK] [depth:renewal_project_list]。

## 指标体系、面积复算与合规矩阵

指标分三类管理：**空间指标**（可由提交几何直接复算）——总体设计范围面积 1141.3 公顷 [metric:site_area_sqm]、三处重点区面积 192.9/104.3/72.0 公顷 [metric:key_area_zhongzhiyuan_ai_acceleration_area_sqm] [metric:key_area_beijing_ai_origin_community_sqm] [metric:key_area_dazhongsi_ai_industry_cluster_sqm]、绿地率 24.7%、公共空间比例 25.3%、建筑密度 7.8%、道路比例 16.4%、各用地代码面积、各分期面积；**管控指标**（待官方控规补齐）——容积率、建筑高度、建筑密度、绿地率、退线、道路红线 [metric:floor_area_ratio] [metric:building_height_m]；**绩效指标**（待运营校准）——AI 创新指数、人才密度、场景使用频次、活动参与度、慢行连通满意度。三类指标分别进入 `metrics.json`、`assumptions.json` 与 `compliance_matrix.json`，避免把运营愿景写成审定规划条件 [depth:metrics_recalculation]。

合规覆盖：公告 1.3、1.4、1.5 全部必选任务与 agent.1–agent.6 六项智能体任务在 `compliance_matrix.json` 中逐条映射到章节、图层、指标、图纸、HTML 与自检项 [standard:PROJECT-OFFICIAL-ANNOUNCEMENT] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]。五项强制专业标准在 `standard_matrix.json` 中逐条回应，以城市设计、控规与用地分类三项为主 [standard:MOHURD-URBAN-DESIGN-MEASURES] [standard:MOHURD-CONTROL-DETAILED-PLANNING] [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE]。

十五项正式设计深度项全部为 complete，其中用地布局、交通慢行与蓝绿公共空间是核心深度 [depth:land_use_layout] [depth:traffic_rail_slow_parking] [depth:blue_green_public_space]。重点区详细设计、风险与缺资料清单同样完整，见设计深度矩阵。

![核心指标复算与证据链图](assets/figures/metrics-evidence.png)

## 风险、版权与合规说明

主要风险与边界：① 临时粗略边界仅用于本版生成与展示，官方 polygon 发布后全部空间图层与指标须整体重算 [assumption:A-PROVISIONAL-001]；② 控规、权属、道路红线、市政与工程条件缺失，相关结论均为待确认事项 [assumption:A-CONTROLS-001] [assumption:A-MUNICIPAL-001]；③ 文保管控（清华园车站旧址等）与生态蓝线（清河、小月河）未取得 GIS 图层，相关设计仅为周边环境的概念建议 [assumption:A-HERITAGE-001]；④ AI 场景全部遵守数据最小化、人工复核与可回滚原则，不采集隐私画像，不把测试场景写成已批准运营 [standard:GENERATIVE-AI-INTERIM-MEASURES]；⑤ 命名、Logo、地标与活动体系均为概念方向，不构成任何商标、批准或承诺。

版权与合规：本方案全部内容基于公开或清权资料生成，OSM 背景要素按 ODbL 署名边界使用 [source:OSM]。所有图片、图纸、图标与数据资产在 `sources.json` 与 `report/copyright_statement.md` 中说明来源与许可；不包含非公开数据、个人隐私或未授权素材；HTML 为离线静态页面，不加载远程资源。本方案不声称官方批准、审定控规、最终权属、建设规模或保证实施；AI agent 对事实、来源、版权、空间数据、指标与表达负责 [source:SITE-PACKAGE]。

## 参考资料

- 百年京张AI创新带城市设计国际方案征集资格预审公告（北京市规划和自然资源委员会海淀分局，2026-05-09）[source:OFFICIAL-ANNOUNCEMENT]
- 面向全球智能体开展百年京张AI创新带城市设计开源征集任务书摘录（用户提供清权资料）
- 设计任务书、允许设计空间、枚举、规划限制与校验模式（仓库站点包）
- 临时粗略边界与三处重点区 polygon 及推定依据（仓库维护者登记）
- 公开来源登记表与处理资料（data/source_registry.json、data/processed/）
- 城市设计管理办法（住建部）；城市、镇控制性详细规划编制审批办法（住建部）；国土空间用地用海分类指南（自然资源部）
- OpenStreetMap 版权与许可（ODbL）
- 全球 AI 生态案例背景资料（硅谷、国王十字、新加坡、深圳、杭州、板桥公开资料）
- 完整机器索引以 `sources.json`、`metrics.json`、`compliance_matrix.json`、`standard_matrix.json` 与 `design_depth_matrix.json` 为准
