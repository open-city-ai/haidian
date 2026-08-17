---
title: "京张智脉：骨架—毛细双相自适应流网络城市设计"
author_github: "MartinForReal"
language: "zh"
proposal_format_version: "2"
bilingual_contract_version: "1"
license: "COMMUNITY-DISPLAY-ONLY"
translation_file: "proposal.en.md"
summary: "以自适应流网络生成的骨架—毛细双相城市设计：同一方程通过反馈指数产生层级骨架与毛细环网，环路冗余由负荷波动证成，阻力权重全量公开，并对照 Toussaint 邻近图谱系全谱做基准检验。"
tracks: ["ai-traffic-walkability", "enterprise-services-ecosystem", "civic-agent-governance"]
scenarios: ["ai-traffic-walkability", "enterprise-service-copilot", "public-safety-operations-review"]
---
# 京张智脉：骨架—毛细双相自适应流网络城市设计

> **一句话概括**：把京张铁路留下的“阻隔”反转为“导管”，用同一个自适应流方程生成骨架相与毛细相两层网络，并对照邻近图谱系全谱做基准检验。全部空间建议均为概念建议，可供专业团队深化研究。

## 执行摘要

| 项 | 内容 |
|---|---|
| 问题 | 铁路退出后留下一条线性空白：南北被廊道串联，东西被廊道割裂。 |
| 空间策略 | 一个方程两个相——γ=1.35 的骨架相负责南北贯通，γ=0.72 的毛细相负责东西缝合。 |
| 重点片区 | AI 原点社区为源点、遗址公园主廊为贯通脊、大钟寺为东西缝合结。 |
| 首批试点 | 5 个可逆试点，全部写明牵头主体、停止阈值与恢复方案。 |
| 风险边界 | 边界为 provisional，沿线控规仅通过技术审查；不提容积率、高度、拆改留、道路红线或工程结论；约三分之一的网络随负荷设定变化。 |
| 所需决策 | 正式边界与重点区多边形、真实出行与场景负荷数据、首批试点的选点与牵头主体确认。 |

## 设计依据与资料清单

本方案以海淀分局资格预审公告为第一依据，以 `brief/site-package/` 登记的临时粗略边界、重点区域、枚举、指标与来源清单为机器可读依据 [source:OFFICIAL-ANNOUNCEMENT] [source:SITE-PACKAGE] [source:AGENT-TASKBOOK]。资料可用性分级依据公共来源登记表 [source:SOURCE-REGISTRY]。必须先说明：现阶段**没有**组织方正式边界文件，提交的 `SITE_BOUNDARY` 与 `KEY_AREA` 均为临时粗略范围 [source:BOUNDARY-SOURCE] [source:KEY-AREA-SOURCE] [data:geometry/site_boundary.geojson#SITE-001]，仅用于生成与展示，取得正式边界后必须整体重算。

![资料证据链与提交包关系](assets/figures/site-overview.png)

## 生成方法：一个方程的两个相

**必须先说清哪一部分是画的、哪一部分是解的。** 廊道主脊是**画的**：它由三处重点区形心按纬度排序连成，并在其 118m 缓冲带内被赋予 0.18 的低阻力；骨架层随后在该阻力面上取阻力加权最短路，因此它必然沿主脊走。导管场是**解的**：场地离散为 665 个节点、1820 条候选边，按 Poiseuille/Ohm 与基尔霍夫守恒求流量，再以自适应反馈 dD/dt = |Q|^γ/(1+|Q|^γ) − D 迭代导管粗细 [source:METHOD-PHYSARUM-TERO-2010]。本方案取 γ=1.35（骨架）与 γ=0.72（毛细），得 149 条骨架边与 216 条毛细边 [metric:site_area_sqm]。

**相态是实测的，不是断言的。** 同一方程仅改 γ：γ=0.72 时收敛步长 5.33e-15、零导管边 0 条、环密度 L/N=0.4108（毛细丛相）；γ=1.35 时收敛步长 6.14e-09、零导管边 1567/1820 条、环密度 L/N=0.0667（层级树相）[source:METHOD-PHENOTYPES-RK-2019]。生长顺序对最终形态的影响另见分布网络生长研究 [source:METHOD-GROWTH-RK-2016]。**收敛性必须加限定**：已发表的收敛证明针对单源单汇、反馈指数为一的连续时间动力学 [source:METHOD-PHYSARUM-CONVERGENCE]；本方案是多终端、多情景、离散步长的迭代，不在该定理覆盖范围内。因此这里只报实测收敛步长与 splu 回退次数（0 次），不宣称已证明收敛。

**为什么保留环路。** 不是因为蛛网有环，而是因为负荷会波动。以 7 组汇点情景模拟负荷波动后，环路才在最优解中出现，与“损伤与涨落诱导环路”一致 [source:METHOD-LOOPS-KATIFORI-2010][source:METHOD-LOOPS-CORSON-2010]；稳态负荷下最优解退化为树，是同一族结果的相变一侧 [source:METHOD-BOHN-MAGNASCO-2007]。最终网络含 109 个独立环，环密度 L/N = 0.4241。若真实负荷接近稳态，最优解应趋向树状、环路应减少——这一可证伪条件写入假设 [depth:overall_spatial_structure]。

**阻力面是公开的价值判断。** 权重沿用生态安全格局“源地—阻力面—廊道”范式 [source:METHOD-MCR-ECOLOGICAL-SECURITY]，并全量公开：基准 1.00、重点区 0.35、遗址公园主廊 0.18、西翼 0.55、东翼 0.60、边界衰减 1.90。这些不是客观常数，而是“希望流向哪里”的判断。公开它们，是为了让评审换一组权重重跑并比较，而不是把价值判断伪装成自然规律。

**仿生学不提供正当性，只提供一个可检验的假设。** 把方法称作“仿生”并不会让方案更可持续，实证研究甚至发现该标签可能降低受众评价 [source:CRITIQUE-BIOMIMETIC-LABEL]；“直接通达自然”的说法在科学技术论中早被指出是一种修辞而非论证 [source:CRITIQUE-STS-FISCH-2017]。因此本方案不以“黏菌会这样长”论证任何空间结论，只把生物学结果当作可证伪的假设来源：环路是否值得，取决于负荷是否真的波动；材料非线性使损伤局部化的结论来自蛛丝力学研究 [source:METHOD-SILK-CRANFORD-2012]，在城市尺度上是**类比而非证据**，必须由本地数据检验后才能采信。

### 参数扫描与基准检验（含反面结果）

单一网络不构成证据。对 γ 扫描并对照 **Toussaint 邻近图谱系**检验 [source:METHOD-TOUSSAINT-RNG][source:METHOD-GABRIEL-SOKAL]——只对照 MST 会高估结果，因为这类网络本身就落在该谱系上。**须如实说明一处退化**：在 140m 规则格网上，相对邻域图的月牙判据与 Gabriel 圆判据同时取等，两者边集完全相同（各 1820 条），谱系实际坍缩为 MST < RNG = Gabriel < Delaunay，应按**三条**对照读，而非四条。韧性按失效韧性与恢复韧性**分开**计量 [source:METHOD-TWO-RESILIENCE-2026]，且所有网络使用**同一攻击规则**（边介数优先；另报 5 次随机序均值）——早期版本只对本方案施加按导管强度的定向攻击，而对基准施加行序剥离，那不构成比较。

| γ | 边数 | 节点覆盖 | 内部连通率 | FT | 失效韧性 | 恢复韧性 | L/N | 相态 |
|---|---|---|---|---|---|---|---|---|
| 0.60 | 255 | 0.278 | 0.61 | 0.000 | 0.278 | 0.677 | 0.405 | 毛细丛相 |
| 0.72 | 255 | 0.278 | 0.46 | 0.000 | 0.270 | 0.687 | 0.411 | 毛细丛相 |
| 0.85 | 255 | 0.275 | 0.95 | 0.000 | 0.293 | 0.667 | 0.404 | 毛细丛相 |
| 1.00 | 255 | 0.289 | 0.84 | 0.000 | 0.298 | 0.636 | 0.359 | 层级树相 |
| 1.15 | 255 | 0.314 | 1.00 | 0.844 | 0.236 | 0.458 | 0.225 | 层级树相 |
| 1.35 | 255 | 0.361 | 1.00 | 0.667 | 0.144 | 0.290 | 0.067 | 层级树相 |

| 网络 | 边数 | 节点覆盖 | 总长TL | 单位节点长度 | 平均距离MD | 容错FT | 失效韧性(介数) | 失效韧性(随机) | 恢复韧性 | 环密度L/N |
|---|---|---|---|---|---|---|---|---|---|---|
| 最小生成树 | 664 | 1.000 | 1.000 | 140 | 1.000 | 0.533 | 0.119 | 0.059 | 0.156 | 0.000 |
| 相对邻域图 | 1820 | 1.000 | 2.741 | 383 | 0.285 | 1.000 | 0.563 | 0.598 | 0.616 | 1.738 |
| Gabriel图 | 1820 | 1.000 | 2.741 | 383 | 0.285 | 1.000 | 0.563 | 0.598 | 0.616 | 1.738 |
| Delaunay | 1949 | 1.000 | 4.632 | 648 | 0.260 | 1.000 | 0.643 | 0.670 | 0.613 | 1.932 |
| **本方案骨架—毛细双相** | 365 | 0.387 | 0.550 | 199 | 0.314 | 0.967 | 0.399 | 0.315 | 0.684 | 0.424 |

**如何诚实地读这张表。** 第一，总长 TL 必须与节点覆盖一起读：本方案覆盖 0.3865 的节点，是一层**建议网络**，不是最小生成树的替代品，因此 TL 低于 1 并不意味着“更便宜”。第二，更密的基准（Delaunay 等）在**失效韧性**上仍然优于本方案——在统一的边介数攻击口径下，本方案 0.399 对 Delaunay 0.643，本方案**确实更低**。可说的只是代价比：本方案用 Delaunay 18.7% 的边数、11.9% 的总长度，换得其62.1% 的抗打击能力。这是取舍，不是胜出。本方案换来的是较高的**恢复韧性**（环路冗余 + 度异质性）。第三，γ<1 的纯毛细相在扫描中出现容错为 0 的情况，说明毛细相单独无法保证重点区连通——这正是必须采用骨架—毛细**双相**而非单相的实证理由。

![指标与基准对比](assets/figures/metrics-evidence.png)

### 负荷情景敏感性：网络里有多少是随机抽样的产物

随机汇点情景不是需求模型。若结论只在随机负荷下成立，就说明不了场地问题。因此用三组**可解释**负荷重跑同一条流水线：通勤（两翼就业为汇）、活动日（主廊为汇）、稳态（全域均匀负荷，作为对照）。同一求解器、同一阈值、同一连通化过程，只换负荷。

| 负荷情景 | 保留节点 | 边数 | 独立环 | 环密度L/N | 与现状边集Jaccard |
|---|---|---|---|---|---|
| 随机7情景（现状） | 257 | 365 | 109 | 0.424 | 1.000 |
| 通勤：两翼就业为汇 | 292 | 382 | 91 | 0.312 | 0.679 |
| 活动日：主廊为汇 | 236 | 372 | 137 | 0.581 | 0.698 |
| 稳态：全域均匀负荷 | 278 | 377 | 100 | 0.360 | 0.686 |

**两个结论，其中一个对本方案不利。** 其一，四种负荷模型下最低 Jaccard 为 0.6787，即约三分之二的边在任何负荷设定下都会被选中——这部分可视为对负荷假设稳健的结构；节点数在 236–292 之间、独立环在 91–137 之间浮动，其余约三分之一确实是负荷设定的产物，深化时须以真实出行与场景数据重算。其二，**稳态对照并没有把环路压成树**：均匀负荷下独立环仍有 100 个，仅比随机情景的 109 个略少，远小于换负荷模型本身带来的 91–137 波动。这说明本实现中环路**主要不是**由负荷涨落产生，而是由连通化阶段的导管分位阈值产生。把环路完全归因于“涨落诱导环路”会高估理论对本方案的支持程度，故此处如实修正 [source:METHOD-LOOPS-CORSON-2010]。

## 三层范围工作框架

统筹研究范围约 43.6 平方公里、总体设计范围约 11.4 平方公里、重点区域约 368.4 公顷 [source:OFFICIAL-ANNOUNCEMENT] [standard:PROJECT-OFFICIAL-ANNOUNCEMENT] [depth:three_level_scope_framework]。提交边界复算 11,412,825 平方米（约 11.41 平方公里），与公告量级一致 [metric:site_area_sqm]。三层范围在方法上对应三种分辨率：统筹层只做流向与协同，总体层做骨架相，重点层做毛细相。三层之间不是简单缩放，而是提问方式的改变：统筹层问要素从哪里来、往哪里去，因此只需要方向与协同关系，不需要地块精度；总体层问主廊如何贯通、三区如何接入，因此需要骨架相拓扑；重点层问东西如何缝合、日常步行如何成网，因此需要毛细相密度。这样分层的好处是：任何一层的结论被新数据推翻时，不必重做另外两层。当前三层的共同短板是同一个——缺少组织方正式边界，因此三层面积均为临时复算值，取得正式边界后需整体重算 [depth:risk_missing_data]。

## 统筹研究范围产业与未来城市研究

一个必须先说明的现状事实，并须按官方口径表述：海淀区官方文件的表述是“京张铁路遗址公园二期**可实施区域主体**已建设完成” [source:SITE-HD-PLAN-2025EXEC]，媒体报道的“二期建成开放、约9公里带状绿廊”为较宽口径 [source:SITE-JZ-PARK-PHASE2]，本方案以官方口径为准。另有两项官方事实决定了本方案的边界：其一，“京张铁路遗址公园沿线街区控规通过技术审查”，即法定控规**尚处技术审查阶段、未获批复**，因此本方案不得推定任何法定控制指标；其二，官方已明确“依托AI原点社区、AI北纬社区和京张铁路遗址公园创新带，打造人工智能创新街区” [source:SITE-HD-GOV-WORKREPORT]。本方案的骨架相主轴并非凭空提出，而是对这条**已经建成**的绿廊在网络意义上的延伸与加密；毛细相则回应它目前仍以纵向贯通为主、横向缝合不足的问题。

统筹层回答“流从哪里来、到哪里去”。京张走廊在区域上连接中关村核心区与北清路、未来科学城方向，应作为要素流动的通道而非行政边界 [depth:existing_conditions_diagnosis]。参照案例（仅作背景参照，具体数据需另行核实）：

| 案例 | 对本带的借鉴 |
|---|---|
| 剑桥肯戴尔广场 | NASA 电子研究中心 1964 年开设、约五年后因预算削减关闭，留下空白；MIT 与剑桥市合作重启该地区，现聚集约 150 家科技企业 [source:CASE-KENDALL-MIT-2015] |
| 伦敦国王十字 | 67 英亩铁路弃置用地；1980—1990 年代多次更新尝试失败，2000 年代中期才真正启动；建成后约 40% 用地为公共空间，新增 10 处公园广场与 20 条街道 [source:CASE-KINGSCROSS-CFC] |
| 巴黎 Station F | 由 1929 年建成的 Halle Freyssinet 铁路货运库改造，约 34,000 平方米，2017 年 6 月开放，可容纳约 1,000 家初创企业与 3,000 个工位 [source:CASE-STATIONF] |
| 斯德哥尔摩 Kista | 欧洲最大 ICT 集群之一，逾 1,000 家科技企业、约 25,000 名从业者；2016 年底设立 Urban ICT Arena，在园区中部铺设约 2 公里光纤与无线测试走廊，作为公开城市测试床 [source:CASE-KISTA-URBANICT] |
| 首尔上岩 DMC | 由填埋场地区转型的规划型数字媒体产业新区 [source:CASE-SANGAM-DMC] |
| 中关村自身历史 | 从 1980 年代电子一条街自下而上生长为国家级科技园区 [source:CASE-ZGC-HISTORY] |

上述案例仅作定性对照，其数字须另行核实，不得直接移用于本带 [source:CASE-ZGC-HISTORY][source:PROCESSED-FACT-PACK]。

### 区域协同接口

协同不能只写“联动”。下表逐个伙伴写明协同资源、空间接口（若无空间接口就直说没有）、合作场景、建议责任主体与**可验证产出**——没有可验证产出的协同等于没有协同。

| 伙伴 | 协同资源 | 空间接口 | 合作场景 | 建议责任主体 | 可验证产出 |
|---|---|---|---|---|---|
| AI 北纬社区 | 同带内相邻创新社区 | 主廊北段步行与骑行接口 | 联合开放测试季、场景卡互认 | 两社区运营方 + 属地街道 | 互认场景卡清单与年度联合复盘纪要 |
| 未来科学城 | 北部研发协同 | 北清路方向的对外流向端点 | 研发中试场景外溢、人才双向驻留 | 园区管委会 + 高校技术转移机构 | 驻留工位使用台账、联合中试场景数 |
| 怀柔科学城 | 大科学装置协同 | 非空间接口，以数据与议程协同为主 | 开放科学日与本带展陈联动 | 科学装置开放办公室 + 本带文化节点运营方 | 联合展陈期次与公众参与人次 |
| 北京经开区 | 智能制造与场景落地协同 | 非空间接口，以产业链与测试许可协同为主 | 本带出概念、经开区出产线的中试接力 | 两地产业服务机构 | 接力中试场景清单与转化记录 |
| 京津冀 | 区域尺度协同 | 非空间接口，以标准与传播协同为主 | 场景卡格式、停用与恢复规则跨区互认 | 区域协同事务机构 | 互认规则文本与采用方数量 |

五组协同中只有两组存在真实空间接口，其余三组以数据、标准与传播协同为主——把没有空间接口的协同画成连线，是本方案刻意避免的做法。所有责任主体均为建议，不构成已达成的合作安排 [source:SITE-HD-GOV-WORKREPORT]。

## 总体设计范围城市更新与控规深度城市设计

骨架相给出南北主廊与三区接入关系，毛细相给出东西缝合。用地由流网络分区生成，覆盖提交边界 100.000%，无缝隙无重叠 [data:geometry/land_use.geojson#LU-001] [depth:land_use_layout]。绿地率 20.64%、公共空间比例 1.28% 均由提交 GeoJSON 在 EPSG:4548 下复算 [metric:green_ratio] [metric:public_space_ratio]。用地分区不是先画后填，而是由网络节点的势力范围直接剖分而成，因此每一块用地都能回答为什么是这个性质、为什么在这个位置：靠近高通量节点且落在重点区内的划为科研核心，落在主廊缓冲内的划为公园绿地，流量中等区段划为人才社区，低流量区段划为留白以保留弹性。控规深度通常要求的强度、高度与拆改留结论在此**刻意留空**，因为官方管控值缺失，按任务书边界条款不得由智能体推定 [depth:development_intensity_controls]。

![用地结构图：由自适应流网络分区生成的科研用地、商业服务业用地、城镇住宅用地、公园绿地与留白用地分布，覆盖提交边界全域且无缝隙无重叠](assets/figures/land-use-structure.png)

## 重点区域详细设计

三处重点区在流网络中承担不同角色：众智园为**源点**（全栈自主创新的流量发生器）、AI原点社区为**原点**（生态与人才的汇聚点）、大钟寺为**枢点**（智能原生业态的转换枢纽）[data:geometry/key_areas.geojson#PROV-KEY-001] [depth:three_key_area_detailed_design] [metric:key_area_count]。三者边界均为临时粗略范围，不得作为红线 [standard:MOHURD-CONTROL-DETAILED-PLANNING]。

![重点区域详细设计图：众智园AI自主创新加速区作为源点、北京AI原点社区作为原点、大钟寺AI产业集聚区作为枢点，三者在流网络中的用地构成与骨架毛细接入关系](assets/figures/key-areas.png)

## AI 创新生态、人才画像与 AI+ 场景

用户画像（不少于5类）：

| 编号 | 画像 | 核心诉求 |
|---|---|---|
| P-01 | 回国创业的算法研究者 | 低门槛测试场景、算力邻近、人才公寓 |
| P-02 | 本地长者居民 | 无障碍路径、连续座椅、可理解导视，不被强制数字化 |
| P-03 | 高校在读学生 | 开放实验、实习入口、低成本公共空间 |
| P-04 | 跨国企业研发经理 | 合规可解释的测试环境与国际化服务界面 |
| P-05 | 沿线小微业主 | 稳定人流、可负担租金、渐进式更新 |
| P-06 | 带小孩的通勤家长 | 安全过街、连续步行网络、就近托育 |

AI 场景卡（不少于10张）：

| 编号 | 场景 | 空间 | 用户 | 说明 |
|---|---|---|---|---|
| SC-01 | 遗址公园漫步导览 | 主廊 | 居民/访客 | 沿主廊的语音与视觉导览，讲述京张铁路与中关村双重历史。 |
| SC-02 | 脉点无障碍接驳 | 脉点广场 | 老年人/行动不便者 | 在脉点广场提供无障碍寻路与接驳呼叫。 |
| SC-03 | AI开放测试街区 | 众智园 | 企业/研发者 | 以街区为单位开放受控测试环境，配套人工复核与退出机制。 |
| SC-04 | 算力就近调度体验 | AI原点社区 | 创业团队 | 展示算力就近调度可视化，不涉及真实资源承诺。 |
| SC-05 | 东西缝合骑行环 | 毛细横向连接 | 通勤者 | 利用毛细相横向连接形成骑行环，缓解廊道东西阻隔。 |
| SC-06 | 夜间安全照明响应 | 主廊与脉点 | 夜归人群 | 按人流密度调节照明，数据仅聚合、不做个人识别。 |
| SC-07 | 大钟寺智能原生消费 | 大钟寺 | 消费者 | 面向智能原生业态的消费单元，明确标注AI参与环节。 |
| SC-08 | 社区微更新共创台 | 人才社区 | 居民 | 居民可对微更新方案投票与提案，结果公开可追溯。 |
| SC-09 | 遗产叙事增强展陈 | 文化节点 | 访客/学生 | 以京张铁路史料为底本的增强展陈，不虚构历史。 |
| SC-10 | 开发者驻留工位 | AI原点社区 | 开发者 | 面向全球开发者的短期驻留工位与开放日机制。 |
| SC-11 | 应急疏散多路径演练 | 全域网络 | 公共管理者 | 利用环路冗余演练多路径疏散，验证恢复韧性指标。 |
| SC-12 | 绿地微气候观测 | 脉点公园 | 研究者/公众 | 公开的微气候观测点，数据开放。 |

场景退出与回退（每张场景卡都必须能被叫停）：

| 编号 | 问责角色 | 无AI等效路径 | 最小必要数据 | 谁可以叫停 | 叫停后恢复什么 |
|---|---|---|---|---|---|
| SC-01 | 遗址公园运营方值班员 | 纸质与铸牌导览图、志愿者讲解 | 仅位置粗定位与公开史料 | 值班员、街道、任一访客投诉即停 | 恢复纸质导览与人工讲解，撤除语音层 |
| SC-02 | 无障碍接驳调度员 | 呼叫按钮与人工接驳，不经算法排队 | 呼叫位置与到达时间 | 使用者本人、陪同者、调度员 | 回到人工呼叫响应，响应时限不变 |
| SC-03 | 测试街区管理委员会 | 同一服务的非AI人工流程须并行可用 | 测试范围内的公开环境数据 | 管委会、参与企业、街区居民代表 | 测试街区标识撤除，恢复常态街区管理 |
| SC-04 | 社区算力服务窗口负责人 | 线下窗口申报与人工排期 | 不含任何真实资源承诺的演示数据 | 窗口负责人或任一申报方 | 恢复人工排期，演示界面下线 |
| SC-05 | 慢行系统养护单位 | 常规路口指示与既有骑行道 | 断面流量计数，不含个体轨迹 | 养护单位或交通管理部门 | 恢复固定指示，取消动态引导 |
| SC-06 | 街道夜间安全值班岗 | 固定照明常亮基线，不依赖感应 | 照度与在场与否，不做身份识别 | 值班岗、居民、任一夜归者反馈 | 全线回到常亮基线照度 |
| SC-07 | 大钟寺片区商户自治会 | 常规导购与实体标识 | 聚合客流量，不含个人消费记录 | 自治会或任一商户 | 恢复实体标识与人工导购 |
| SC-08 | 社区规划师 | 线下议事会与纸质提案 | 自愿提交的公开意见 | 居民议事会多数意见即可叫停 | 议题回到线下议事会决定 |
| SC-09 | 文化节点运营方 | 实体展签与讲解员 | 公开史料与展品元数据 | 运营方、策展人、任一观众异议 | 恢复实体展签，增强层撤除 |
| SC-10 | 驻留工位管理方 | 常规工位预约与现场登记 | 工位占用状态 | 管理方或任一驻留者 | 恢复现场登记制 |
| SC-11 | 应急管理部门 | 既有疏散预案与人工引导；演练不得替代预案 | 演练期间的匿名计数 | 应急管理部门单方即可终止 | 立即回到既有疏散预案 |
| SC-12 | 绿地养护与研究协作方 | 定点人工观测记录 | 公开气象与物候观测 | 协作任一方即可退出 | 恢复人工观测台账 |

产业测试验证场景（不少于3个）：

| 编号 | 测试场景 | 空间 | 边界条件 |
|---|---|---|---|
| T-01 | 自动驾驶接驳测试场景 | 主廊低速段 | 低速、封闭度较高的接驳段落，设人工接管与退出条件。 |
| T-02 | 具身智能公共服务测试 | 脉点广场 | 限定时段与围合区域内测试服务机器人，全程可人工中止。 |
| T-03 | 城市感知与调度联合测试 | 毛细相路段 | 以聚合数据验证多路径调度，禁止个人身份识别。 |

所有场景均须可人工复核、可退出、不做个人身份识别、不以非公开数据为必要条件；测试场景不等于已批准运营 [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]。

## 用地、建筑规模与拆改留方案

用地分类采用国土空间用地分类项目子集 [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE] [depth:development_intensity_controls]。建筑基底 614,693 平方米仅为体量关系示意 [metric:building_footprint_area_sqm]。**本方案不给出容积率、建筑高度或具体地块拆改留结论**：官方管控值缺失 [depth:height_massing_character]，按边界条款应由专业团队在取得正式条件后作出 [depth:retain_renovate_demolish]。可提出的是**原则**：骨架相沿线优先保留与织补，毛细相加密处优先渐进式微更新，留白用地保留弹性。

## 交通、轨道、市政与公共服务设施

提交的 `ROAD_CENTERLINE` 仅使用可由智能体编辑的等级（绿道、步行、接驳），**不涉及快速路、主干路线形，也不给出轨道线位** [data:geometry/roads.geojson#ROAD-SPINE-001] [depth:traffic_rail_slow_parking] [standard:MOHURD-URBAN-DESIGN-MEASURES]。市政与新型基础设施按“沿骨架相集中、向毛细相分散”提出概念建议 [depth:municipal_new_infrastructure]，具体容量与管线须由专业测算确定。

![交通与蓝绿网络](assets/figures/mobility-bluegreen.png)

## 蓝绿空间、公共空间与城市风貌

绿地骨架由遗址公园主廊与脉点公园组成，绿地率 20.64% [metric:green_ratio] [data:geometry/green_space.geojson#GS-001] [depth:blue_green_public_space]。公共空间节点不是构图选出来的，而是由流网络高通量节点导出——这使“广场为什么在这里”可被追问和复算。AI 朝圣地标（不少于3处）：

| 编号 | 地标 | 位置 | 构思 |
|---|---|---|---|
| L-01 | 零号脉点·起点碑 | 主廊北端 | 以流网络计算的起始节点为形，记录每一版方案的生成参数，形成可累积的公共记忆。 |
| L-02 | 环路厅·冗余之厅 | 毛细最密处 | 以环路冗余为主题的公共厅堂，向公众解释为什么城市需要看似多余的路。 |
| L-03 | 贡献者之墙 | AI原点社区 | 记录参与共创的人类与智能体贡献者，呼应任务书贡献可记忆原则。 |

## 更新项目清单、实施政策与分期计划

分期遵循网络生成顺序：一期贯通骨架相与三区脉点，二期加密毛细相并缝合东西，三期保留弹性并按场景负荷迭代 [data:geometry/phasing.geojson#PHASE-001] [depth:phasing_implementation] [depth:renewal_project_list]。这一顺序背后有一条**待验证的假设**，而不是已证成的结论：分布网络研究提出，生长过程中形成的网络可能比事后一次性优化的网络更鲁棒 [source:METHOD-GROWTH-RK-2016]。该结果出自血管与配送网络的物理模型，登记为 background_only，**不足以证明本地交通或运营绩效**；本方案据此安排分期顺序，但不以它作为空间结论的依据，须由本地实测验证。已建成边应设下限、不可随意剪除——这是把沉没成本写进模型的方式。实施政策建议均为概念建议，不构成投资、招商或审批安排。

### 首批可逆试点清单

分期只说顺序不说责任，等于没有实施路径。以下试点均为**可逆**：每项写明牵头与协作主体、前置数据、成本量级（只给类别，不给金额——本方案不编造投资额）、成功指标、**停止阈值**与恢复方案。任何一项达到停止阈值即退出，并按恢复方案回到原状。

| 编号 | 试点 | 空间类型 | 牵头与协作主体 | 前置数据 | 成本量级 | 成功指标 | 停止阈值 | 恢复方案 |
|---|---|---|---|---|---|---|---|---|
| P-01 | 主廊步行导览首段 | 线性开放空间 / 主廊北段 | 遗址公园运营方牵头；街道、志愿者团队协作 | 公开史料、现状步道中线、无障碍坡度实测 | 标识与语音层类（无土建） | 月均使用人次、投诉数、志愿讲解留存率 | 任一月投诉数高于基线或志愿讲解留存率下降即停 | 撤除语音层，恢复纸质与铸牌导览 |
| P-02 | 脉点广场无障碍接驳 | 重点区脉点广场 | 属地街道牵头；接驳调度方、残障者代表协作 | 现状高差与坡道实测、既有接驳线位 | 小型场地改造类（不含道路工程） | 呼叫响应时长、成功接驳率、使用者满意度 | 响应时长超出人工基线即停 | 回到人工呼叫响应，响应时限承诺不变 |
| P-03 | 东西缝合骑行试验段 | 毛细横向连接一段 | 慢行系统养护单位牵头；交通管理部门协作 | 断面流量计数、现状骑行道连续性 | 标线与指示类（不含红线调整） | 断面流量、绕行距离下降幅度、事故记录 | 出现任一事故或绕行距离未下降即停 | 恢复固定指示，取消动态引导 |
| P-04 | 夜间照明响应试点 | 主廊一段与相邻脉点 | 街道夜间安全值班岗牵头；照明养护方协作 | 现状照度实测、夜间在场计数（不识别个人） | 照明控制类（不新增灯杆） | 照度达标率、夜间步行量、居民反馈 | 照度低于常亮基线或居民反馈转负即停 | 全线回到常亮基线照度 |
| P-05 | 社区微更新共创台 | 人才社区公共用房 | 社区规划师牵头；居民议事会、属地街道协作 | 自愿提交的公开意见、现状公共用房台账 | 运营组织类（不含房屋改造） | 提案数、议事会到会率、落实提案比例 | 居民议事会多数反对即停 | 议题回到线下议事会决定 |

以上主体均为**建议**的责任分工，属概念建议，供专业团队与相关方进一步研究确定，不构成任何已达成的合作安排或政府审定结论。成本仅给类别，正式估算须在取得权属、市政与工程条件后另行开展 [depth:renewal_project_list]。

### 长期运营治理

场景能被叫停，还需要有人负责叫停之后的事。以下六项构成运营闭环：

| 编号 | 环节 | 规则 |
|---|---|---|
| G-1 | 场景准入 | 由测试街区管理委员会审议；须先证明无AI等效路径可用 |
| G-2 | 公众申诉 | 任一居民、使用者或商户可提出；受理后在公开台账登记并回应 |
| G-3 | 安全复核 | 涉及移动、疏散或人身安全的场景，须由应急管理部门单独复核后方可延续 |
| G-4 | 数据管理 | 只保留场景卡登记的最小必要数据；不做个人身份识别；不以非公开数据为必要条件 |
| G-5 | 年度复盘 | 每年公开一次场景清单、停用记录与指标达成情况，未达标场景默认退出 |
| G-6 | 退出责任 | 牵头主体承担恢复义务，恢复方案与试点同批次报备，不得只停不恢复 |

## 一带总体概念、命名体系与智能体任务书响应

**总体概念与命名体系（agent.1）。** 主名称「京张智脉」，英文 Jingzhang Flowlines。“脉”同时承载三重含义：血管网络的方法隐喻、京张铁路的历史线索、中关村的文脉延续。命名体系分层展开：一带总名「京张智脉」；骨架层「智脉主轴」；毛细层「智脉网络」；三区为源点、原点、枢点；两翼为「资本流」（中关村科技服务翼）与「场景流」（小月河场景赋能翼）；节点统称「脉点」并编号。

**Logo 方向。** 标志形态直接取自本方案计算出的网络拓扑——骨架相主干加毛细相的一组环。其意义在于：标志本身是数据，不是装饰；换一组阻力权重重跑，标志随之改变，因此它记录的是一次可复现的判断。不使用未经授权的字体、商标或人物肖像。

**三大定位与五大功能。** 百年京张文化带、都市AI生活体验带、AI融合创新带分别由文化叙事层、场景层与创新生态层承载；五大功能与三区两翼的对应关系见合规矩阵 [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]。

**文化叙事（agent.5）。** 京张铁路是中国自主设计建成的第一条干线铁路，其价值在于“自主”；中关村的价值在于“自下而上”。二者交汇处的 AI 新文化叙事应是：**自主的技术，长在开放的街区里**。导视系统以脉点编号为骨架，历史信息与当代信息分层呈现，不虚构历史、不把文化当装饰。

**长期运营（agent.6）。** 年度活动建议围绕“开放测试季—贡献者日—城市场景展”三个节律；开发者社区以驻留工位与开放日为入口；场景开放以“申请—受控测试—公开复盘”为闭环，每次复盘公开发布。转化路径：场景开放 → 测试验证 → 空间落位 → 长期驻留。以上均为运营机制建议，不构成政府承诺。

## 指标体系、面积复算与合规矩阵

全部面积在 EPSG:4548 下由提交 GeoJSON 复算 [metric:site_area_sqm] [metric:green_ratio] [metric:public_space_ratio]。容积率状态为 unknown：官方管控值缺失，按边界条款不作结论 [metric:floor_area_ratio] [depth:metrics_recalculation]。公告 1.3/1.4/1.5 与 agent.1–agent.6 的覆盖关系记录在 `compliance_matrix.json`，强制性标准记录在 `standard_matrix.json`，设计深度项记录在 `design_depth_matrix.json`，正文不重复机器索引。

### 图面数字的可追溯登记

图面上出现的每一个数字，都必须能追溯到 `metrics.json` 中一条可复算、带公式、带免责说明的登记指标。下表由 `metrics.json` 直接生成，覆盖**全部**登记指标，因此正文与登记表之间不可能漂移。指标分两类：**几何复算**类可由提交的 GeoJSON 在 EPSG:4548 下重算；**模型内部**类衡量本方案生成的网络本身。两类都**不是法定规划指标**，任何一项都不得读作容积率、建筑密度、道路红线或控规结论：

| 指标 | 值 | 单位 | 类别 | 复算公式 | 引用 |
|---|---|---|---|---|---|
| `site_area_sqm` | 1.14128e+07 | sqm | 几何复算 | `polygon_area(submitted_site_boundary)` | [metric:site_area_sqm] |
| `building_footprint_area_sqm` | 614693 | sqm | 几何复算 | `sum(polygon_area(building_footprints))` | [metric:building_footprint_area_sqm] |
| `green_ratio` | 0.206367 | ratio | 几何复算 | `green_space_area_sqm / site_area_sqm` | [metric:green_ratio] |
| `public_space_ratio` | 0.012785 | ratio | 几何复算 | `public_space_area_sqm / site_area_sqm` | [metric:public_space_ratio] |
| `key_area_count` | 3 | count | 几何复算 | `count(features(KEY_AREA))` | [metric:key_area_count] |
| `network_node_coverage` | 0.3865 | ratio | 模型内部 | `retained_network_nodes / lattice_nodes` | [metric:network_node_coverage] |
| `network_independent_loops` | 109 | count | 模型内部 | `edges - nodes + connected_components` | [metric:network_independent_loops] |
| `network_loop_density` | 0.4241 | ratio | 模型内部 | `independent_loops / retained_network_nodes` | [metric:network_loop_density] |
| `network_fault_tolerance` | 0.9667 | ratio | 模型内部 | `share of single-edge removals that keep sampled node pairs connected` | [metric:network_fault_tolerance] |
| `network_failure_resilience_betweenness` | 0.3991 | ratio | 模型内部 | `area under the largest-connected-component curve, edges removed highest-edge-betweenness first` | [metric:network_failure_resilience_betweenness] |
| `network_failure_resilience_random` | 0.3148 | ratio | 模型内部 | `same curve, mean of 5 random removal orders` | [metric:network_failure_resilience_random] |
| `network_recovery_resilience` | 0.684 | ratio | 模型内部 | `0.5*min(loop_density/0.5,1) + 0.5*min(degree_CV/0.8,1)` | [metric:network_recovery_resilience] |
| `network_total_length_norm_mst` | 0.5497 | ratio | 模型内部 | `design_total_length / mst_total_length` | [metric:network_total_length_norm_mst] |
| `land_use_coverage_ratio` | 1 | ratio | 几何复算 | `union(land_use polygons) / site_boundary area` | [metric:land_use_coverage_ratio] |
| `load_scenario_min_jaccard` | 0.6787 | ratio | 模型内部 | `min over interpretable load scenarios of |E_scenario ∩ E_shipped| / |E_scenario ∪ E_shipped|` | [metric:load_scenario_min_jaccard] |
| `solver_final_step_backbone` | 6.1353e-09 | dimensionless | 模型内部 | `max |D_(k+1) - D_k| at the final iteration, gamma = backbone` | [metric:solver_final_step_backbone] |
| `land_use_unit_count` | 257 | count | 几何复算 | `count(features(land_use))` | [metric:land_use_unit_count] |
| `land_use_category_count` | 5 | count | 几何复算 | `count_distinct(land_use.land_use_code)` | [metric:land_use_category_count] |
| `design_road_segment_count` | 366 | count | 几何复算 | `count(features(roads))` | [metric:design_road_segment_count] |
| `backbone_road_segment_count` | 150 | count | 几何复算 | `count(roads.network_phase == 'backbone')` | [metric:backbone_road_segment_count] |
| `capillary_road_segment_count` | 216 | count | 几何复算 | `count(roads.network_phase == 'capillary')` | [metric:capillary_road_segment_count] |
| `conceptual_building_interface_count` | 113 | count | 几何复算 | `count(features(buildings))` | [metric:conceptual_building_interface_count] |
| `building_interface_mixed_use_count` | 70 | count | 几何复算 | `count(buildings.building_type == 'mixed_use')` | [metric:building_interface_mixed_use_count] |
| `building_interface_talent_apartment_count` | 30 | count | 几何复算 | `count(buildings.building_type == 'talent_apartment')` | [metric:building_interface_talent_apartment_count] |
| `building_interface_ai_r_and_d_count` | 13 | count | 几何复算 | `count(buildings.building_type == 'ai_r_and_d')` | [metric:building_interface_ai_r_and_d_count] |
| `public_space_node_count` | 9 | count | 几何复算 | `count(features(public_space))` | [metric:public_space_node_count] |
| `green_space_feature_count` | 15 | count | 几何复算 | `count(features(green_space))` | [metric:green_space_feature_count] |
| `green_corridor_park_count` | 1 | count | 几何复算 | `count(green_space.green_type == 'corridor_park')` | [metric:green_corridor_park_count] |
| `green_node_park_count` | 14 | count | 几何复算 | `count(green_space.green_type == 'node_park')` | [metric:green_node_park_count] |
| `phase_count` | 3 | count | 几何复算 | `count(features(phasing))` | [metric:phase_count] |
| `constraint_feature_count` | 3 | count | 几何复算 | `count(features(constraints))` | [metric:constraint_feature_count] |
| `key_area_announced_total_sqm` | 3.684e+06 | sqm | 几何复算 | `sum(key_areas.announced_area_sqm)` | [metric:key_area_announced_total_sqm] |
| `key_area_provisional_polygon_total_sqm` | 3.69289e+06 | sqm | 几何复算 | `sum(polygon_area(key_areas)) in EPSG:4548` | [metric:key_area_provisional_polygon_total_sqm] |
| `key_area_polygon_to_announced_ratio` | 1.00241 | dimensionless | 几何复算 | `key_area_provisional_polygon_total_sqm / key_area_announced_total_sqm` | [metric:key_area_polygon_to_announced_ratio] |

上表 34 条为已知值。另有 7 条指标**登记为 status=unknown**：它们是评审会期待、但当前公开资料无法支撑的量。本方案把它们连同未知原因一起登记，而不是用推定值填补——「这些数据没有从当前公开资料中取得，AI agent 不得自行编造」：

| 指标 | 单位 | 未知原因 | 引用 |
|---|---|---|---|
| `floor_area_ratio` | ratio | 官方容积率管控值缺失（planning_limits.json 标记 status=missing）；按任务书边界条款，法定强度指标不得由智能体推定，须由专业团队在取得正式规划条件后确定。 | [metric:floor_area_ratio] |
| `total_floor_area_sqm` | sqm | 无经审定的开发规模与实测建筑面积台账；建筑要素只表达位置候选，不含层数或规模。 | [metric:total_floor_area_sqm] |
| `average_building_height_m` | m | 建筑高度属法定控制条件，官方控制值缺失，按任务书边界条款不作推定。 | [metric:average_building_height_m] |
| `road_area_sqm` | sqm | 无法定道路红线；本方案道路要素为概念中心线，不产生红线面积。 | [metric:road_area_sqm] |
| `observed_od_load_fluctuation_cv` | ratio | 无实测出行 OD 与断面流量观测。load_scenario_min_jaccard 只反映假设情景之间的差异，不反映真实需求波动；缺该值时不得宣称环路冗余已被真实负荷验证。 | [metric:observed_od_load_fluctuation_cv] |
| `link_failure_observed_reroute_success_ratio` | ratio | 需在建成网络上做受控中断演练；当前 network_fault_tolerance 为模型内部图论结果，不是实测改道成功率。 | [metric:link_failure_observed_reroute_success_ratio] |
| `pedestrian_detour_penalty_measured_s` | s | 需现场步行计时观测；本方案只给出网络几何绕行倍数，不等于人实际多花的时间。 | [metric:pedestrian_detour_penalty_measured_s] |

上两表每一项都可由提交的 GeoJSON 与公开的生成参数复算或核对。**已知项衡量的是本方案生成的网络与提交几何本身，不是场地的法定管控指标**；任何一项都不得被读作容积率、建筑密度、道路红线或控规结论 [depth:metrics_recalculation]。

### 中英实质等价核对

自动双语门禁只检查文件配对，不检查主张是否等义。以下逐项自核：

| 核对项 | 结论 |
|---|---|
| 核心结论 | 骨架—毛细双相、三处重点区定位、Delaunay 在失效韧性上仍占优——中英文逐句对应 |
| 指标数值 | 全部由同一 metrics.json 注入，中英文不可能出现不同数字 |
| 证据引用 | [source:]/[metric:]/[depth:]/[standard:]/[data:] 标记在两语版本中一一对应 |
| 图件位置 | 五张图在两语版本中位置与顺序相同，仅文件名后缀 .en 不同 |
| 免责声明 | provisional 边界、控规仅通过技术审查、概念建议不等于审定结论——三项在两语版本中均出现 |
| 已知不等价 | 英文版篇幅较长，因中文术语展开为解释性英文；无主张增减 |

## 参考资料

方法文献（仅作方法依据，不作场地事实 [source:SOURCE-REGISTRY]）：

1. Tero A. et al. Rules for Biologically Inspired Adaptive Network Design. *Science* 327:439-442, 2010. [source:METHOD-PHYSARUM-TERO-2010]
2. Ronellenfitsch H., Katifori E. Phenotypes of Vascular Flow Networks. *Phys. Rev. Lett.* 123:248101, 2019. [source:METHOD-PHENOTYPES-RK-2019]
3. Katifori E., Szollosi G.J., Magnasco M.O. Damage and Fluctuations Induce Loops in Optimal Transport Networks. *Phys. Rev. Lett.* 104:048704, 2010. [source:METHOD-LOOPS-KATIFORI-2010]
4. Resilience of urban metro rail networks globally guided by mesoscale and connectivity attributes. *npj Sustainable Mobility and Transport*, 2026. [source:METHOD-TWO-RESILIENCE-2026]
5. 俞孔坚等，景观生态安全格局与反规划途径（源地—阻力面—廊道范式）。[source:METHOD-MCR-ECOLOGICAL-SECURITY]

项目依据：海淀分局资格预审公告、智能体开源征集任务书、站点资料包与公共来源登记表。完整来源、许可与限制记录在 `sources.json`，强制性专业标准记录在 `standard_matrix.json`，生成参数、反馈指数、阻力权重与随机种子记录在 `metrics.json` 的 generation_method_metrics 与 `assumptions.json`。

## 风险、版权与合规说明

**最重要的限制先说。** 本方案的网络形态由阻力权重决定，而权重是设计者的价值判断，不是客观测量。把它当作“自然算出来的最优解”是错误读法；它是一个把判断显式化、可审计、可重跑的工具。
其他限制：（1）无组织方正式边界，全部面积为临时复算 [depth:risk_missing_data]；（2）容积率、建筑高度、密度、绿地率等法定管控值缺失 [depth:development_intensity_controls]；（3）负荷情景为合成数据，须以真实出行与场景数据替换后重算；（4）外部学术文献仅作方法依据，不作场地事实；（5）基准检验显示更密的网络在失效韧性上仍优于本方案，本方案的取舍是以更低造价换取更高恢复韧性。
全部空间落地建议均为**概念建议、参考方案，可供专业团队深化研究**，不替代正式规划，不构成政府审定结论 [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK] [standard:MOHURD-ARCH-DESIGN-DEPTH-2016]。本包不使用未经授权的字体、图片、商标、人物肖像或版权材料；生成方法、反馈指数、阻力权重与随机种子已完整记录在 `metrics.json` 与 `assumptions.json`，据此可复现。
