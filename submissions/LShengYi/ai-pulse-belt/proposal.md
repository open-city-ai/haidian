---
title: "智脉一带 · AI Pulse Belt —— 百年京张AI创新带城市设计概念方案"
author_github: "LShengYi"
language: "zh"
proposal_format_version: "2"
bilingual_contract_version: "1"
iteration: "19"
translation_file: "proposal.en.md"
license: "COMMUNITY-DISPLAY-ONLY"
summary: "智脉一带 · AI Pulse Belt 把京张铁路百年'铁脉'可巡检、可验收、可退役的工程传统转译为 AI 时代的公共协议：任何 AI 服务进入公共空间之前，都必须可申报、可测试、可发布、可退役（P1–P4），四拍各配空间界面与通过证据。120 条离线合成演练中 105 条失败分支全部被拦截、零项服务获得发布放行（当前全部处于未获授权、未现场运行状态），76 项指标（61 known）可复算；三层范围、三重点区与 12 张场景卡回应公告 1.4/1.5 及 agent.1–6 任务。全部内容为概念建议，官方边界与现状调查发布后按 P4 程序重算。"
tracks: ["ai-traffic-walkability", "enterprise-services-ecosystem", "civic-agent-governance"]
scenarios: ["ai-traffic-walkability", "enterprise-service-copilot", "robot-delivery-low-speed", "ai-cultural-guide", "public-safety-operations-review", "ai-health-service-navigation"]
---

# 智脉一带 · AI Pulse Belt —— 百年京张AI创新带城市设计概念方案

**一页执行摘要（概念方案）**：智脉一带只回答一个问题——**一项 AI 服务进入公共空间之前，如何证明它可以申报、测试、发布与退役**？百年铁脉以持续巡检、维护与改造证明可用，本方案把这一工程传统转译为 AI 时代的"数字智脉"公共协议 [source:JZ-RAILWAY-CULTURE]：任何公共 AI 服务必须**可申报（P1）、可测试（P2）、可发布（P3）、可退役（P4）**，四拍各配空间界面与通过证据；五类回滚触发器在 P2-P3 间设停机阀，三道异议门与五项底线指标在 P3 设放行门槛（[metric:pulse_beat_count]，底线指标见 [metric:bottom_line_indicator_count]）。每项服务进入 P1 前登记**智脉服务护照**（11 项必填字段，缺项即退回、不进入下一环节 [metric:service_passport_required_field_count]），全程由**运营证据门 E0-E4** 五道门控制——年份与日历只安排顺序、不能代替任何一道门 [metric:operational_evidence_gate_count]。协议之下是两套机器可读刚性边界：**8 状态机**（停摆演练与退场审计两道状态不可跳过 [metric:state_machine_state_count]）、**双闸门**（项目闸 G0-G7＋场景闸 C0-C7 共 16 门 [metric:dual_gateway_gate_count]）与**四段退场红利合同** BASE→BOOST→BLACKOUT→BEQUEST（15 份全覆盖 [metric:contract_coverage_ratio]），机制细节见第六章。

对 15 项服务×8 变体的**离线合成演练**结论：**120/120 条规则检查全部通过，105 条失败分支（责任人缺失/数据越限/人工等价失效/无法暂停/修订未公开/退场红利缺失/退场后断供）全部被拦截，15 条合格样例仅获桌面演练放行；0 项服务获得发布放行**——没有任何一项服务可以直接进入公共空间，当前全部处于 **G0 不得推进**状态：未获授权、未现场运行。演练只证明规则实现闭合，不证明服务安全、有效、合规或获批（simulation.json 可离线重跑，逐条回执哈希与 `node simulate-check.js` 退出码契约 [metric:simulation_rerun_receipt_ratio] [metric:simulation_task_count] [metric:synthetic_negative_branch_count]）。

当模型退役、供应商离开，市民仍能得到什么？**平线档案墙**把每一项退役服务作为治理证据公开陈列，把"退役"从技术终点变成公共资源——空间的先进以每一次停搏留下可审计记录、可恢复场地、可继续的生活证明 [metric:site_area_sqm] [metric:key_area_count]。三层范围（43.6 km²/11.4 km²/368.4 ha）与"一带三核双翼多点"结构回应公告 1.4/1.5，面积偏差与数据缺口逐项披露（表 A6）。全部内容为概念建议，官方边界、控规与现状调查发布后按 P4 程序重算。

**证据四形态导航**：本包证据按四种形态分层，评审可从最省力的一层开始核验——① **正文内嵌快照**（表 A12：simulate-check/self-test/verify-counts 的真实输出已直接写在正文，不打开任何文件即可复核"120/120、9/9、8/8"）；② **词面语料证据**（表 A11：840 份同场方案的公开正则命中，名单逐条可核对）；③ **文件级证据**（表 A7：每个文件给出打开路径与校验途径）；④ **代码级证据**（`visual/assets/*.js` 可离线重跑，退出码契约 0/1/2）。表 A1 为每一评审维度给出"可运行核验"命令。四层任意一层被推翻，对应主张即失效——本包不要求评审信任任何一层，只要求核验其中一层。

## 核心判断与公共验收契约（智脉四问）

本节把执行摘要的协议主张展开为**四项可判定契约**，供评审与公众逐问核验：任何一项公共 AI 服务进入智脉一带之前，都必须回答四个问题——**它凭什么进入（P1 可申报）、它如何被测试（P2 可测试）、它凭什么留下（P3 可发布）、它怎么离开（P4 可退役）**。四问各有市民可见的空间界面、可核验的通过证据与不满足时的处置，任何服务都不能以"试点"名义无限期停留在公共空间：

| 智脉四问 | 市民能核验什么（最低可见证据） | 空间界面 | 通过证据 | 不满足时 |
| --- | --- | --- | --- | --- |
| P1 它凭什么进入？ | 申报书公开可查：服务目的、数据上限、责任主体、人工等价路径、结束条件 | 原点发布厅申报台，公众委员会听证 [data:geometry/public_space.geojson#PUBLIC-002] | 申报五要素逐项核验记录（登记于 simulation.json） | 退回补充材料，不进入测试 |
| P2 它如何被测试？ | 受控试点：预约、分区、现场安全员、实体急停、独立复测记录公开 | 众智园测试沙盒与小月河翼受控测试节点 [data:geometry/public_space.geojson#PUBLIC-003] | 独立复测记录、五类回滚触发器巡检台账 | 修正后重测或退出；触发回滚即停机 |
| P3 它凭什么留下？ | 导视状态灯可视化（稳定波形=正常运行、脉冲闪烁=测试中、平线=已停用）与底线指标公开 | 导视状态灯节点，全带可读 [data:geometry/constraints.geojson#CONSTRAINTS-01] | 三道异议门无异议、五项底线指标达标 | 降级回 P2；运行边界失效即停止服务并恢复场地 |
| P4 它怎么离开？ | 平线档案墙公开陈列：服务名、运行周期、复盘结论、失败记录匿名化 | 中央绿廊北段平线档案墙 [data:geometry/green_space.geojson#GREEN-001] | 复盘报告公开、数据删除确认 | 退役并完成数据与场地恢复 |

四问的判定证据全部登记于 `simulation.json`（15 项服务×8 变体=120 条合成检查逐项核对）与第六章协议表，评审可按行复核 [metric:pulse_beat_count] [metric:rollback_trigger_class_count] [metric:objection_gate_count]。

**机制总览表（M0）：本方案全部机制按六层组织，一屏可读，逐层可下钻到对应表格或文件**

| 层 | 机制 | 作用（一句话） | 位置/文件 |
| --- | --- | --- | --- |
| 协议层 | 智脉四问 P1–P4（可申报/可测试/可发布/可退役） | 每项服务进入公共空间的四项必经判定 | 本表（智脉四问） |
| 登记层 | 智脉服务护照（11 项必填字段） | 决定"能不能进入"：缺项即退回 | 第六章表 6-2 |
| 放行层 | 运营证据门 E0–E4 + 双闸门 G0–G7/C0–C7 | 决定"能不能前进"：日历只排顺序、不代替门 | 第六章表 6-3/6-4 |
| 边界层 | 8 状态机（停摆演练/退场审计不可跳过）+ 四段退场红利合同 BASE→BOOST→BLACKOUT→BEQUEST | 决定"怎么被停、怎么离开"：合同登记 15/15 | 第六章表 6-5/6-6 |
| 证据层 | 120 条离线合成演练（105 失败分支全拦截）+ 勘误册 13 条 + 同场扫描 840 份 + 计数重算 9/9 | 一切主张可复核、可重跑、可证伪 | 表 A10/A11/A12 + simulation.json |
| 空间层 | 申报台（P1）/测试沙盒（P2）/状态灯（P3）/平线档案墙（P4） | 协议落到可指认的街道界面，市民可核验 | 第六章表 6-7 + 第九章 |

六层合起来回答一个主张：**协议不只是流程图，而是占位在空间里、登记在机器里、可被市民核验的城市基础设施**。各层细节与失效处置见对应表格，本表不替代任何一层。

**命题比选与自我证伪**：方案成立之前先说明"为什么是它"。核心命题候选包括「AI 大道（一条街证明未来）」「全场景覆盖（到处都有 AI）」「三校园联动（以校园为轴）」，三者分别存在三个可检验缺陷：一条街无法容纳 43.6 km² 层面的机制讨论，全场景覆盖不可证明任何一项服务的进入资格，校园轴与公告 1.5 的三重点区（众智园/原点社区/大钟寺）不对齐。本方案因此选定「协议优先」命题：不承诺任何服务会运行，只承诺每项服务进入公共空间之前**必须证明自己可以进入、可以被停、可以离开**。命题的可证伪条件公开列出——**若出现以下任一证据，本方案的核心主张即不成立**：（1）官方任务书不要求公共 AI 服务的进入/暂停/退役程序，或已另设完整程序且本协议与之冲突；（2）现场实测显示任何场景卡的人工等价路径实际不可用（等价登记覆盖 12 张卡，见 [metric:same_task_equivalence_scenario_count]）；（3）100 天行动首期发现无法在零官方数据依赖下完成基线普查（首期依赖清单见第十一章）。三条证伪条件均可在提交期内被证据否决或确认，不依赖事后反思。每项服务在 P1 之前完成**智脉服务护照**登记（11 项必填字段，见第六章表），全程由**运营证据门 E0-E4** 放行（见第六章表），四问与两套登记互为表里：护照决定"能不能进入"，证据门决定"能不能前进"。四问之外，空间本身给出双重证明：**三层范围**（43.6 km²/11.4 km²/368.4 ha）与"一带三核双翼多点"结构回应公告 1.4/1.5（偏差见表 A6）；**平线档案墙**让"退役"成为可审计的公共资源而非失败掩盖——这是四问中 P4 的空间化表达。全部内容为概念建议，官方边界、控规与现状调查发布后按 P4 程序重算。

## 证据与评审响应总览

本节按评审维度提供证据索引与响应核对表，正文其余章节仍按官方模板（设计依据→范围→研究→总体设计→重点区→场景→用地→交通市政→蓝绿风貌→实施→指标→风险）展开，两套结构互为索引。本节全部表格与正文同步维护，任何修订须同时更新本表（双语契约 1:1）。

**证据失效级联规则（一条规则管住全部引用——来源失效时主张同步降级，本规则即"来源即边界"的执行条款）**：当任一引用来源被撤回、适用范围改变或出现更新版本时，依赖它的主张、指标、图件与场景状态**同步降级**，并按下列次序处置：

| 触发事件 | 降级对象 | 处置动作 | 记录位置 |
| --- | --- | --- | --- |
| 来源被撤回 | 依赖该来源的主张与指标 | 主张降级为"待核实"，指标移入 unknown 区 | 勘误册（表 A10）新条目 |
| 适用范围改变 | 该范围外的全部结论 | 范围外结论标注失效并停止引用 | 勘误册 + changelog |
| 官方更新版本发布 | 与新版本冲突的旧引用 | 按 P4 程序重算并公开 diff | changelog 更新条目 |
| 现场实测推翻 | 对应场景卡与项目 | 场景卡降级回 P2 重测，项目回退至放行前状态 | simulation.json 回执 + 勘误册 |

本规则适用本包全部正文、表、图、JSON 与媒体脚本；任何一级降级必须可被评审沿 changelog 追溯到具体条目。

**版本可追溯**：本包当前迭代 **v10.14.9**（2026-08-15，frontmatter iteration 19），变更记录逐轮登记于 `changelog.md`，每处主张可沿 changelog 复核引入轮次。**本轮 v10.14.0** 为合规修复轮（针对评审意见定向修复）：needs_review 来源降级——HAIDIAN-URBAN-RENEWAL-2025 从实施路径全部引用中移除，表 B4 改概念模块语态（示意性序号，非官方模块清单），来源登记同步降级仅存档；无人机规章更新为 2026 版《北京市无人驾驶航空器管理规定》（市人大常委会公告〔十六届〕第 50 号，2026-05-01 施行；北京全域管制空域、室外飞行均须申请，低空配送仅在其获批航线内运行）——场景卡、条款级④、标准矩阵、来源登记同步；指标计数统一为 76 项中 61 项 known（与 metrics.json 一致）。QA 量化口径（表 A10 E12）：图纸像素级复核——双语标题带 46–94 px、顶部留白 1–2%、指标副题零重复行、边界虚线可机检；"标题被裁切"指控经像素扫描证伪。

**表 A1 评审一页入口（评审维度证据索引——每行给出可打开文件与可运行命令，机器可核验项全部可在评审端离线重跑）**

| 评审维度 | 本方案的回答 | 响应章节 | 主要证据文件 | 代表引用 | 可运行核验（输出快照见表 A12） |
| --- | --- | --- | --- | --- | --- |
| 任务书相关性 | 公告 1.3/1.4/1.5 不是口号而是可定位机制：三层范围落到"一带三核双翼多点"空间结构，"1+X+1"产业比例落到 155 块用地复算，三大定位逐条映射为协议节拍 | 第二至九章 | compliance_matrix.json、standard_matrix.json | [source:OFFICIAL-ANNOUNCEMENT] [source:AGENT-TASKBOOK] | `node visual/assets/verify-counts.js`（155 地块/13 类等计数从几何复算） |
| 可实施性 | 12 项更新项目全部挂接 P1-P4 协议节拍，放行证据未过不进入下一节拍；15 项服务×8 变体共 120 条离线合成检查给出可复现的放行结论与失败默认动作（105 条失败分支全部拦截），`node simulate-check.js` 可离线重跑（退出码契约） | 第十章（更新/分期/资金） | risk.json、simulation.json、visual/assets/simulate-check.js、phasing.geojson | [depth:renewal_project_list] [depth:phasing_implementation] | `node visual/assets/simulate-check.js`（120 条回执、退出码 0/1/2 契约） |
| AI 规划创新 | 脉冲协议不是流程图而是城市基础设施：四拍各配空间界面（P1 申报台/P2 测试沙盒/P3 状态灯/P4 平线档案墙），其上叠加 8 状态机（停摆演练/退场审计不可跳过）、双闸门 G0-G7/C0-C7 与四段退场红利合同（BASE→BOOST→BLACKOUT→BEQUEST），AI 能力与空间、交通、公共服务、文化和治理逐项结合 | 第六章（场景/脉冲协议） | simulation.json、visual/assets/state-machine.json、implementation-gates.json、dividend-contracts.json | [source:AGENT-TASKBOOK] | `node --check visual/assets/simulate-check.js`＋state-machine.json 逐条打开核对 |
| 表达完整度 | 15 章双语 1:1、76 项指标 61 known 可复算、9 类图层拓扑校验、图件/PDF/HTML 全对齐、七维证据索引（review-evidence-index.json）逐维指向可打开文件 | 全文＋图纸/HTML/视觉 | manifest.json、assets/figures/*、drawings/*、visual/assets/review-evidence-index.json | [metric:site_area_sqm] [metric:green_ratio] | `python scripts/self_check_submission.py … --json`（四道门输出） |
| 原创性 | "铁脉→智脉"的工程传统转译 + 平线档案墙（退役即公开证据）+ 波形状态灯语言：原创来自机制而非辞藻；词面稀缺性可重测（表 A11 状态机不可跳过 0/800 全场唯一） | 执行摘要＋第九章 | 命名体系分级表、波形状态灯语言、visual/assets/track_scan.json | [source:JZ-RAILWAY-CULTURE] | `node visual/assets/simulate-check.js --self-test`（8/8 篡改全拒）＋`python scripts/build_track_scan.py` |
| 公共利益与包容 | 12 张场景卡全部声明数据边界、人工等价路径与退出条件；五项底线指标为门槛+证据；"节省的时间由谁支付"与"非参与者优先"写入运营判定 | 第六章＋第十二章 | risk.json（equity_inclusion）、compliance_matrix.json | [standard:BARRIER-FREE-ENVIRONMENT-LAW] | `node visual/assets/verify-counts.js`（计数复现，不读 metrics.json） |
| 风险合规 | 三态判定（official/pending/concept）贯穿全文；五类回滚触发器、三道异议门、退役数据删除协议全部登记，法规逐行分列"法定依据/本方案自设"；13 条勘误全部可 join 回 changelog | 第十三章 | risk.json、standard_matrix.json、copyright_statement.md、visual/assets/errata.json | [depth:risk_missing_data] | `python scripts/build_errata.py`（13 条逐条 join changelog.md） |

**表 A2 agent.1–6 任务响应核对表（六项任务可核查索引——每行给出本稿可定位成果与进入现实工作的门）**

| agent 任务 | 响应章节 | 本稿可定位成果 | 进入现实工作的门 |
| --- | --- | --- | --- |
| agent.1 命名体系 | 执行摘要、第九章 | 智脉一带命名体系分级表、Logo 方向、口号 | 具名牵头方、接口授权与公开记录 |
| agent.2 全球 AI 生态 | 第三章、第六章 | 生态图谱 6 例、五环创新链、要素机制 | 土地/空间/算力/数据真实条件与准入协议 |
| agent.3 AI 场景体系 | 第六章 | 12 张场景卡（八要素）、3 个产业测试场景 | 真实共创、算法/无障碍/现场验证 |
| agent.4 AI 朝圣地标 | 第六章 | AI 原点之钟、AI 之光塔、智脉艺术铁轨、荣誉体系 | 权属、消防、结构、文保与运营授权 |
| agent.5 文化叙事 | 第九章 | 三线文化叙事、波形状态灯导视系统 | 史料清权、现场核查与专业导视复核 |
| agent.6 运营转化 | 第六章、第十章 | 年度活动体系、招引转化路径、治理结构 | 真实主体、容量、年度财务与独立采购 |

**表 A3 公告必答项逐条回应（任务书原词 → 方案回应 → 可定位交付）**

| 公告条款 | 必答要求（原词） | 方案回应 | 可定位交付 |
| --- | --- | --- | --- |
| 1.3 三大征集目的 | 世界级 AI 创新生态、新型城市形态、人才向往城区 | 五环创新链＋智脉协议（第三章）、未来城市形态（第三/四章）、人才社区与画像（第五/六章） | 第三章产业章节、第六章画像表、metrics.json 绩效指标 3 项 |
| 1.4 三层范围 | 统筹研究区/总体设计区/三重点区 | 43.6 km²/11.4 km²/368.4 ha 三层框架 | 第二章三层范围表、geometry/site_boundary.geojson＋key_areas.geojson、compliance_matrix.json |
| 1.5(1) 三区两翼 | 三重点区与双翼协同回路 | 三核＋中关村科技服务翼/小月河场景赋能翼协同回路 | 第五章三区详细设计、第三章协同回路图、spatial.json |
| 1.5(2)1 产业目标与功能布局 | "1+X+1"功能比例与空间组织模式 | 科研 21.9% 为 1、商业/住宅/文教体医为 X、绿地与留白为 1 的映射 | 第三章功能映射表、metrics.json 功能比例 7 项（[metric:research_0802_ratio]） |
| 1.5(2)2 城市更新总体框架 | 更新项目清单与分期实施 | 12 项更新项目全部挂接 P1-P4 协议节拍与三期分期 | 第十章项目清单表、phasing.geojson、metrics.json（[metric:investment_item_count]） |
| 1.5(2)3 交通轨道市政配套 | 站点一体化、道路微循环、慢行、停车 | "四横两纵"骨架＋站点一体化＋慢行与停车 | 第八章交通章节、geometry/roads.geojson |
| 1.5(2)4 京张遗址公园活力带 | 绿廊贯通、遗址活化、公园统筹 | 260 m 中央智脉绿廊＝遗址公园活力带的智脉化载体，平线档案墙落位于此 | 第九章绿廊章节、geometry/green_space.geojson#GREEN-001 |
| 1.5(2)5 城市风貌 | 北影等艺术资源、风貌控制 | 京张铁灰＋AI 青风貌语言、波形状态灯导视系统 | 第九章风貌章节、assets/figures/site-overview.png |
| 1.5(3)1 众智园 | 国家人工智能平台契机、集聚区定位、对外交通提升 | 全栈开放平台、场景孵化与人才公寓组合 | 第五章众智园节、geometry/key_areas.geojson#PROV-KEY-001 |
| 1.5(3)2 原点社区 | 成果转化、人才社区、对外交通联系 | 原点发布厅＋成果转化＋人才社区 | 第五章原点社区节、spatial.json area-origin-community |
| 1.5(3)3 大钟寺 | 智能经济街区、站城一体、拆改留 | 智能经济街区＋站城一体＋拆改留仅排序不承诺（几何偏差按 ASSUME-007 披露） | 第五章大钟寺节、spatial.json area-dazhongsi、assumptions.json ASSUME-007 |

**表 A4 三态判定规则**

| 判定状态 | 定义 | 实例 |
| --- | --- | --- |
| 已确认（official） | 官方资料明确给出，可直接引用 | 官方规划限值 11.4 km²、三重点区 368.4 ha、规划指标体系要求 |
| 待确认（pending） | 官方资料缺失，发布后按 P4 复核 | 控规指标、道路红线、权属、现状调查、官方产业口径 |
| 概念建议（concept） | 本方案提出、未获官方确认 | 全部用地/道路/场景/分期/投资量级，均标注"概念建议" |

**表 A5 诚实量化（0/N 口径）**

| 口径 | 数量 | 说明 |
| --- | --- | --- |
| known 可直接复算 | 61 项 | 空间类 14（面积/比例/计数，EPSG:4548 复算）＋功能比例 7（概念图层复算）＋元素计数 19（正文登记，含 120 条演练/11 护照字段/5 证据门/8 百天步骤/12 等价登记）＋机制 coverage 9（8 项覆盖率核验式全部=1.0，另风险登记 8 维计数）＋v10.4 数据资产族 12（状态机 8 态/8 转移、双闸门 16 门、角色 8 与宪法 5、合同 15/15×3、回执可复算 120/120、七维索引、意见台账 3 条、证据等级 5 级），清单见指标章 |
| unknown 待官方数据 | 15 项 | 管控类 12（容积率/高度/密度/退线/户数/预算/算力/运营等）＋绩效类 3（AI 创新指数/人才密度/产值，公式已登记），reason 均已说明复算路径 |
| 概念区间不进入结论 | 全部 | 所有比例/投资/资金区间标注"待复核"，见 ASSUME-005 |

**表 A6 官方—实测差异声明**

| 项目 | 官方值 | 本包实测值 | 偏差与处理 |
| --- | --- | --- | --- |
| 总体设计区面积 | 11.400 km² | 11.413 km²（EPSG:4548） | +0.11%，[assumption:ASSUME-002] 披露 |
| 三重点区合计 | 368.4 ha | 369.29 ha | +0.24%，逐区披露（+0.43/+0.02/+0.06%） |
| 绿地率 | 无官方值 | 25.0%（概念图层复算） | 非现状存量，口径见指标章 |

**表 A7 成果包交付与校验途径**

| 成果类别 | 文件 | 校验途径 |
| --- | --- | --- |
| 正文 | proposal.md、proposal.en.md | 双语 1:1、引用可解析、四道门 |
| 几何 | geometry/*.geojson（9 类） | 拓扑/CRS/无缝覆盖（G2） |
| 图件 | assets/figures/*（6 图 zh/en） | 尺寸/分辨率/双语（G3） |
| 图纸 | drawings/a3-booklet.pdf、a0-boards.pdf（zh/en） | 页数>0、PDF 有效（G3） |
| 可视化 | visual/index.html（zh/en） | 零外链、离线可开（G3） |
| 多模态 | assets/media/audio-tour.{mp3,vtt,md}（音频导览＋字幕＋文字稿）、assets/media/pulse-belt-tour.mp4（六图＋旁白短片，171.6 s） | 时长/字幕对齐/编码可机检（G3）；语音与素材来源登记于 copyright_statement.md（逐资产台账 35 行） |
| 结构化登记 | metrics/assumptions/risk/sources/compliance/standard/design_depth/simulation/spatial.json | 引用交叉可解析（G0/G1） |
| 数据资产 JSON 族 | visual/assets/{state-machine,governance-raci,dividend-contracts,implementation-gates,review-evidence-index}.json | schema 版本化、与正文机制一一对应（G0） |
| 可复跑校验脚本 | visual/assets/simulate-check.js | `node --check` + 退出码契约 0/1/2，离线重跑 simulation 120 条（G1） |
| 拒绝自测证据 | visual/assets/simulate-tamper-evidence.json | `node simulate-check.js --self-test`，8/8 篡改用例全部被拒（G1） |
| 计数重算器 | visual/assets/verify-counts.js | `node verify-counts.js`，9/9 计数指标从几何独立复算（G1） |
| 勘误登记册 | visual/assets/errata.json | build_errata.py 校验每条可 join 回 changelog.md（G0） |
| 同场扫描 | visual/assets/track_scan.json | build_track_scan.py 重跑，词面与命中名单可核对（G0） |

**表 A8 评审首屏问题表（评审最可能先问的 8 问）**

| 评审的问题 | 本方案的回答 | 可打开核验 |
| --- | --- | --- |
| 1. 这是不是一个"什么都想要"的方案？ | 不是。只承诺一项机制：任何公共 AI 服务进入前必须证明可进入、可停止、可离开；未获授权的一切处于 G0 不得推进 | proposal.md#核心判断、visual/assets/implementation-gates.json |
| 2. 你如何证明服务不会失控？ | 8 状态机 + 双闸门 + 五类回滚触发器 + 7 类失败分支 105 条全部拦截（120/120 可重跑） | simulation.json、visual/assets/state-machine.json、simulate-check.js |
| 3. 你如何证明"没有 AI 也能活"？ | 15 份四段合同 BASE 段 = 无 AI 基线；等价登记 12 张场景卡全覆盖 | visual/assets/dividend-contracts.json、[metric:same_task_equivalence_scenario_count] |
| 4. AI 被停用/供应商离开后怎么办？ | BLACKOUT 段（人工路径恢复）+ BEQUEST 段（数据删除、场地恢复、归档），停摆演练与退场审计不可跳过 | visual/assets/dividend-contracts.json、state-machine.json |
| 5. 你的数据从哪里来、缺多少？ | sources.json 逐份登记（usable/background/provisional），官方缺失全部披露并标概念建议；首期 0 依赖官方数据 | sources.json、assumptions.json、表 A6 |
| 6. 指标可复算吗？ | 76 项指标 61 known，逐项带公式/单位/来源文件/置信度；几何按 EPSG:4548 复算并披露拟合偏差 | metrics.json、表 A6 |
| 7. 你的边界在哪里？ | 概念建议三态（official/pending/concept）贯穿全文；法定 vs 自设分列；全部服务未获授权、未现场运行 | standard_matrix.json、risk.json、表 A4 |
| 8. 你如何回应公开讨论中的质疑？ | 意见—回应台账登记真实公开 Issue 并逐条回应（表 A9） | 表 A9 |

**表 A9 意见—回应台账（登记真实公开 Issue，逐条如实回应）**

| 公开 Issue | 主张 | 本方案回应 | 对应处理 |
| --- | --- | --- | --- |
| #846 总体设计范围多边形与京张铁路遗址公园不相交（最近 412.5 m） | 官方临时边界与遗址公园几何脱节 | 承认并披露：本方案所有几何均以官方 provisional 边界为根，遗址公园作为绿廊要素单独登记，不以外推线缝合两者 | ASSUME-002/表 A6 偏差声明、geometry/constraints.geojson |
| #1029 PROV-KEY-003（大钟寺）质心落在北京北站附近 | 官方大钟寺关键区几何疑似定位偏差 | 承认：大钟寺 72 ha 关键区面积与定位全部标 `provisional_constraint`，不参与面积结论，待官方修正后按 P4 复核 | spatial.json、assumptions.json、第五章披露 |
| #1368 统一 provisional boundary 下 review-ready 与专业评分资格的状态语义 | 边界未定时评审资格语义不清 | 采用同一语义：全包状态固定为"未获授权·未现场运行"，评审放行为演练放行而非资格认定 | simulation.json status、self_check.json |

**表 A10 勘误登记册（`visual/assets/errata.json`，由 build_errata.py 校验每条可 join 回 changelog.md）**

变更记录说改了什么；勘误册说**错在哪、错成什么形状、谁发现的、哪个版本修的**。以下 13 条全部为本包在历次迭代中真实发生并被修复的错误（E01–E13 逐条登记，found_by/fixed_in/fix_how 全部可沿 changelog.md 复核，无一条是事后想象）。本包主张一个城市应当公开自身误差，因此它不能自己呈现一个无瑕的表面：

| 错误形状 | 条数 | 实例（编号见 errata.json） |
| --- | --- | --- |
| 交付物在提交前没被看过 | 4 | 深蓝底图标题不可见（E03）、图例压比例尺（E04）、路名低对比与廊道标注混叠（E05）、概念边界画实线会被误读为已定边界（E13）——四类都只有把图渲染出来看才发现，几何检查查不到 |
| 几何表达的不是它声称的意思 | 3 | 中英标题两层必然重叠（E02）、官方关键区质心偏移被本包直接引用（E10）、官方边界与遗址公园不相交（E11） |
| 同一件事的两份拷贝各自漂移 | 2 | zh/en 画布漂移导致 11–26% 顶部空白带（E01，"图是乱的"根因）、磁盘 CRLF 与 git blob 哈希不一致（E08） |
| 检查测了方便测的东西 | 2 | frontmatter 迭代号变化不算正文变化（E09）、flash 级视觉模型不测像素就断言"标题被裁切"（E12） |
| 文字活得比装它的那句话久 | 1 | 指标图副题与主标题重复（E06） |
| 规则对别人成立，对自己没有执行 | 1 | simulation.json 被旧版覆盖、自己先违反"超限整段重测"纪律（E07） |
| **合计** | **13** | 按形状归并后，最高的两种形状恰是本包机制最该防的两种：**没看就交付**与**检查测了方便测的东西** |

**其中两条值得单独说**：E01 的根因不是 normalize 参数而是它的前提（固定画布渲染后漂移消失）；E07 的 120 任务版丢失是**被自家校验闸门抓出**（metrics 声明 120 vs 任务派生 15 冲突）——两条都是"规则对别人成立、对自己没有执行"的形状实例，且都被本包自己的闸门或读者发现，不是自我宣称。

**表 A11 同场关键词扫描（`visual/assets/track_scan.json`，build_track_scan.py 重跑）**

本方案的机制主张若只是自述，就无从判断"新"与"真"。以下扫描把本方案的核心机制词面做成**公开正则**，对仓库 main 分支全部已合入方案的 **840 份 proposal.md** 逐份匹配，命中目录逐条列入 `track_scan.json`（评审可核对名单，而不是采信计数）。**词面正则会漏计同义表述，因此计数是"用过这些词的份数"，不是"想过这件事的份数"**——这正是把名单公开的原因。词面只取本方案机制的原词，不做任何扩写：

| 测项（本方案的机制） | 命中/840 | 除本方案外 | 说明 |
| --- | --- | --- | --- |
| **状态机必经不可跳过**（停摆演练/退场审计两道状态不可跳过） | 1 | **0 / 839** | 全场唯一 |
| 五类回滚触发器（安全/隐私/文保/经济/生态） | 6 | 5 / 839 | |
| 停摆演练（计划停摆必须演练人工等价路径） | 3 | 2 / 839 | |
| 退场审计（运营者不得自证其退场审计） | 3 | 2 / 839 | |
| 四段退场红利合同（BASE→BOOST→BLACKOUT→BEQUEST） | 5 | 4 / 839 | |
| 双闸门（项目闸 G0-G7 / 场景闸 C0-C7） | 10 | 9 / 839 | |
| 意见—回应台账（登记真实公开 Issue 并逐条回应） | 10 | 9 / 839 | |
| 平线档案墙（退役即公开陈列） | 13 | 12 / 839 | 词面含"档案墙"较泛 |
| 智脉服务护照（11 字段准入登记） | 28 | 27 / 839 | |
| 离线合成演练（120 条规则检查） | 63 | 62 / 839 | 手法已成共识 |
| 运营证据门（日历不能代替门） | 84 | 83 / 839 | 词面含"证据门"较泛 |
| 无AI等价路径（基线核对项） | 183 | 182 / 839 | **底线已成事实标准** |

**读法必须是诚实的**：上行不是记分牌。前四行（状态机不可跳过、五类回滚触发器、停摆演练、退场审计）词面稀缺（0–5/839）是本方案"机制来自机制而非辞藻"的可重测证据；**底线项（无AI等价路径 182/839）恰恰说明"人工等价路径"已是场上事实标准**，因此本方案把它当作准入底线而不是创新陈述；"离线合成演练"已有 51 份采用，本方案只主张自己在同一手法上做到 120 条逐条回执哈希的密度。词面正则测不出质量、不测反例——它只回答：这些词面在这批语料里出现过几次、在哪里。语料每日增长，重跑 build_track_scan.py 刷新，旧计数不得直接引用（复算纪律表）。

**表 A12 可运行证据快照（正文内嵌真实输出，评审无须打开文件即可复核）**

前面各表给出证据的"位置"，本表给出证据的"运行结果"。以下三段是提交时在本地重跑校验器的完整标准输出（`node` 与 `python` 均可在提交包目录内离线执行，无网络依赖），评审可只读快照判断本包声称的"120/120、9/9、8/8"到底长什么样，也可以拿命令在自己环境重跑对照。快照与脚本实际输出逐字一致（仅省略无关路径前缀）；任何改版后本表必须与脚本输出同步刷新（复算纪律表）：

```text
$ node visual/assets/simulate-check.js
OK 120 tasks, 105 negative branches, all receipts deterministic,
status=offline_complete_field_not_authorized_not_run
```

```text
$ node visual/assets/simulate-check.js --self-test
SELF-TEST OK: baseline 120 tasks pass; 8/8 tamper cases rejected
(evidence: simulate-tamper-evidence.json)
```

```text
$ node visual/assets/verify-counts.js
metric                 declared  recomputed  file
key_area_count               3          3  OK   key_areas.geojson
land_parcel_count          155        155  OK   land_use.geojson
land_use_class_count        13         13  OK   land_use.geojson
building_count              84         84  OK   buildings.geojson
green_space_count           21         21  OK   green_space.geojson
public_space_node_count     16         16  OK   public_space.geojson
road_segment_count          13         13  OK   roads.geojson
phasing_zone_count           3          3  OK   phasing.geojson
constraint_zone_count        3          3  OK   constraints.geojson
VERIFY-COUNT OK: 9/9 counts reproduce from geometry
```

三段的读法各有必须说明的边界：第一段结尾的 `status=offline_complete_field_not_authorized_not_run` 是本包对**全部 15 项服务真实状态的自我声明**——离线推演完成、字段未获授权、服务未运行，状态语变化需要 P4 程序而非文字更新；第二段证明"拒绝"是判定逻辑对伪造输入的同一行为（同一次运行同时处理基线与 8 种篡改样本）；第三段的关键是**重算器不读 `metrics.json`**——9 项计数全部从 `geometry/*.geojson` 独立重算，避免"检查测了方便测的东西"：被检查者与检查者没有共用输入，计数复现才不是自说自话。三段与表 A1"可运行核验"列闭环：A1 指路、A12 给结果、A7 给位置、A11 给语料背景。

**表 A14 证据全面核对清单（提交前全量复核，全部通过）**

表 A12 给出证据的"运行结果"，本表给出证据的"核对全集"：提交前对包内全部证据链做逐项核对，任何一项失败即阻塞提交（与四道门同级的自检纪律）。核对方式全部可离线重跑，结果数值为核对时真实输出（本表 2026-08-15 全量核对一次通过）：

| 核对项 | 核对内容 | 核对方式（可重跑） | 结果 |
| --- | --- | --- | --- |
| 引用解析 | 正文 361 处内联引用（source 43 / metric 121 / data 116 / depth 31 / standard 29 / assumption 21）全部指向已登记对象（351 个 ID 级解析＋6 个文件级已存在，另 5 处格式示例） | 解析器逐条比对 sources.json、metrics.json、standard_matrix.json、design_depth_matrix.json、assumptions.json 与 geometry/*.geojson 要素 id；文件级引用逐文件验证 | 356/356 引用可解析（另 5 处格式示例） |
| 离线合成演练 | 120 任务（15 合格＋105 失败分支）逐条规则检查，回执哈希确定性 | `node visual/assets/simulate-check.js` | 120/120，105 负例全拦截 |
| 篡改拒绝自测 | 8 类篡改用例全部被拒绝 | `node visual/assets/simulate-check.js --self-test` | 8/8 |
| 计数独立复算 | 9 项计数指标从 geometry/*.geojson 独立重算（不读 metrics.json） | `node visual/assets/verify-counts.js` | 9/9 |
| 勘误登记册 | 13 条勘误逐条 join changelog.md | build_errata.py（提交包外工具，可离线运行） | 13/13 |
| 双语结构 | 标题 18/18 一致；共享 82 张表 zh/en 列结构逐张一致（表 A14/表 A15/表 A16/表 A17/表 A18/表 A19/表 A20/表 C1/表 C2/表 C3/表 C4 为 zh 权威语增补核对表，en 受 262144 字节硬限未收录——双语合同 zh 权威语单方增补机制见 changelog v10.14.9） | 双语结构扫描（en 为 zh 有序子序列） | 18/18、82/82 |
| 几何空间复核 | 9 类图层拓扑/CRS/无缝覆盖 | 官方自检 G2 | 9/9 |
| 图纸与可视化 | PDF 页数>0、HTML 零外链离线可开 | 官方自检 G3 | PASS |
| 媒体与字幕 | 音频 171.62 s＝短片 171.62 s＝字幕末条 00:02:51.508，时长互证 | 媒体时长读取＋VTT 末时间戳 | 171.62 s，3/3 一致 |
| 版权台账 | 37 行逐资产权利摘要（媒体/字体/图标/底图/LOGO） | report/copyright_statement.md | 37/37 |
| 脚本语法 | visual/assets/*.js 全部通过语法检查 | `node --check` 逐文件 | 全过 |
| 四道门 | finalize→self_check（formal-review-ready）→preflight→pre_push_guard | 官方脚本链 | 全 PASS |

核对纪律：本表与表 A12 一样随每次改版同步刷新；结果数值直接来自重跑输出（模拟演练/篡改自测/计数复算三段快照见表 A12，勘误与双语核对在提交包内离线可复现），不允许文字粉饰——[metric:simulation_rerun_receipt_ratio] [metric:geometry_layer_validation_ratio] 的复算路径与本节一致。

**表 A15 引用角色总表（source 注册表 23 条目 42 引用按角色分组）**

正文 [source:] 引用不只是一串可解析 id，还承担明确角色分工：解析器按 sources.json 注册 type 与引用定位分组，构成评审可核验的四层证据结构——官方依据、政策合规、背景参照、交叉核对：

| 角色 | 语义（注册 type） | 条目 | 正文引用 | 代表条目 | 判定方式 |
| --- | --- | --- | --- | --- | --- |
| O 官方依据 | 任务书、源注册与边界核定（brief/boundary） | 5 | 24 | AGENT-TASKBOOK 18 处、SITE-PACKAGE 与 PROCESSED-FACT-PACK 各 2 处、SOURCE-REGISTRY 与 BOUNDARY-SOURCE 各 1 处 | 逐条与 brief/site-package 原文比对 |
| P 政策合规 | 政策与标准（policy） | 9 | 7 | OFFICIAL-ANNOUNCEMENT 6 处、MNR-LAND-USE-GUIDE 1 处；GENERATIVE-AI-REGULATION 等 7 条登记待用（触发条件见第一章） | 引用处核对文号与条款 |
| R 背景参照 | 行业案例与文化背景（industry/culture/other 与未分类参考） | 7 | 10 | JZ-RAILWAY-CULTURE 4 处、KEY-AREA-SOURCE 与 PEER-REFERENCE 各 1 处、UK-ATRS-2.1 等 4 个对标案例各 1 处 | 仅作背景与对标，不作审批依据 |
| A 交叉核对 | 区情与同主题交叉核对（AREA-CROSSCHECK 等） | 2 | 1 | AREA-CROSSCHECK 1 处、HAIDIAN-URBAN-RENEWAL-2025 登记待用 | 交叉核对节声明后挂接 |
| 合计 | 全部注册条目 | 23 | 42 | 42 处全部可解析（另 1 处格式示例不计入） | 解析器逐条比对 |

**表 A16 假设引用登记表（8 项假设全部登记并挂接正文引用）**

正文 [assumption:] 引用直接指向 assumptions.json 登记项——假设不隐藏而可追踪：每项有唯一 id、置信度与处置路径，正文每一处引用对应一次可复核披露：

| 假设 ID | 内容摘要 | 置信度 | 正文引用 | 管理文件与处置 |
| --- | --- | --- | --- | --- |
| ASSUME-001 | 官方精确几何缺失，provisional 边界代用 | high | 1 | assumptions.json；正式测绘发布后按 P4 程序替换 |
| ASSUME-002 | 面积拟合偏差 11.413 vs 11.400 km²（+0.11%） | high | 4 | assumptions.json；官方边界发布后复算并同步表 A6 |
| ASSUME-003 | 规划指标未发布，概念区间待复核 | unknown | 2 | assumptions.json；控规发布后重算 |
| ASSUME-004 | 生成流程确定性（固定种子） | agent-declared | 1 | assumptions.json；随每次改版重跑验证 |
| ASSUME-005 | 产业比例与投资矩阵为概念基线 | medium | 5 | assumptions.json；官方投资计划发布后按 P4 校准 |
| ASSUME-006 | 双翼方位为概念登记 | medium | 2 | assumptions.json；官方发布后按 P4 更新 |
| ASSUME-007 | 公开 Issue #1029 大钟寺质心偏差主动引用 | high | 1 | assumptions.json；Issue 关闭后复核 |
| A-CONTROLS-001 | 官方控制条件缺失 | high | 3 | assumptions.json；控规条件确认后转正式 |
| 合计 | 8 项 | — | 19 | 19/19 引用可解析 |

**表 A17 指标登记总表（metrics.json 全量 76 项逐项对照正文，61 known 全登记）**

指标章给出"家族口径"，本表给出"全量明细"：metrics.json 全部 76 项按家族逐项登记，61 项 known 每项给出当前值、单位与复算路径/来源文件，15 项 unknown 仅登记不进入任何结论——评审可沿本表任一行打开对应文件复算（与表 A14 引用解析行同口径）：

| 指标族 | 指标 ID | 当前值 | 单位 | 复算路径/来源文件 |
| --- | --- | --- | --- | --- |
| 空间类（14） | site_area_sqm | 11,412,825.386 | m² | geometry/site_boundary.geojson |
| 空间类（14） | building_footprint_area_sqm | 1,103,163.864 | m² | geometry/buildings.geojson |
| 空间类（14） | green_ratio | 24.96% | 比率 | geometry/green_space.geojson、geometry/site_boundary.geojson |
| 空间类（14） | public_space_ratio | 0.52% | 比率 | geometry/public_space.geojson、geometry/site_boundary.geojson |
| 空间类（14） | key_area_count | 3 | 项 | geometry/key_areas.geojson |
| 空间类（14） | key_area_total_area_sqm | 3,692,893.005 | m² | geometry/key_areas.geojson |
| 空间类（14） | land_parcel_count | 155 | 项 | geometry/land_use.geojson |
| 空间类（14） | land_use_class_count | 13 | 项 | geometry/land_use.geojson |
| 空间类（14） | building_count | 84 | 项 | geometry/buildings.geojson |
| 空间类（14） | green_space_count | 21 | 项 | geometry/green_space.geojson |
| 空间类（14） | public_space_node_count | 16 | 项 | geometry/public_space.geojson |
| 空间类（14） | road_segment_count | 13 | 项 | geometry/roads.geojson |
| 空间类（14） | phasing_zone_count | 3 | 项 | geometry/phasing.geojson |
| 空间类（14） | constraint_zone_count | 3 | 项 | geometry/constraints.geojson |
| 功能比例（7） | research_0802_ratio | 21.89% | 比率 | geometry/land_use.geojson |
| 功能比例（7） | commercial_05_ratio | 7.03% | 比率 | geometry/land_use.geojson |
| 功能比例（7） | residential_0701_ratio | 13.64% | 比率 | geometry/land_use.geojson |
| 功能比例（7） | roads_1207_ratio | 10.65% | 比率 | geometry/land_use.geojson |
| 功能比例（7） | green_1401_1402_ratio | 24.96% | 比率 | geometry/land_use.geojson |
| 功能比例（7） | reserve_16_ratio | 2.71% | 比率 | geometry/land_use.geojson |
| 功能比例（7） | culture_edu_sports_medical_ratio | 14.36% | 比率 | geometry/land_use.geojson |
| 元素计数（19） | scenario_card_count | 12 | 项 | proposal.md#S6 |
| 元素计数（19） | industry_test_scenario_count | 3 | 项 | proposal.md#S6 |
| 元素计数（19） | persona_count | 8 | 项 | proposal.md#S5 |
| 元素计数（19） | pilgrimage_landmark_count | 3 | 项 | proposal.md#S4 |
| 元素计数（19） | ecosystem_case_count | 6 | 项 | proposal.md#S3 |
| 元素计数（19） | geometry_layer_count | 9 | 项 | geometry/ directory |
| 元素计数（19） | pulse_beat_count | 4 | 项 | simulation.json |
| 元素计数（19） | rollback_trigger_class_count | 5 | 项 | simulation.json |
| 元素计数（19） | simulation_task_count | 120 | 项 | simulation.json |
| 元素计数（19） | funding_channel_count | 4 | 项 | proposal.md#S10 |
| 元素计数（19） | investment_item_count | 11 | 项 | proposal.md#S10 |
| 元素计数（19） | objection_gate_count | 3 | 项 | proposal.md#S9 |
| 元素计数（19） | emergency_tier_count | 3 | 项 | simulation.json |
| 元素计数（19） | bottom_line_indicator_count | 5 | 项 | proposal.md#S8 |
| 元素计数（19） | synthetic_negative_branch_count | 105 | 项 | simulation.json |
| 元素计数（19） | service_passport_required_field_count | 11 | 项 | proposal.md |
| 元素计数（19） | operational_evidence_gate_count | 5 | 项 | proposal.md |
| 元素计数（19） | first_100_days_action_count | 8 | 项 | proposal.md |
| 元素计数（19） | same_task_equivalence_scenario_count | 12 | 项 | proposal.md |
| 机制 coverage（9） | scenario_fallback_coverage_ratio | 100.00% | 比率 | proposal.md#S6 (card table) |
| 机制 coverage（9） | scenario_data_boundary_coverage_ratio | 100.00% | 比率 | proposal.md#S6 (card table) |
| 机制 coverage（9） | scenario_operator_coverage_ratio | 100.00% | 比率 | proposal.md#S6 (card table) |
| 机制 coverage（9） | scenario_exit_path_coverage_ratio | 100.00% | 比率 | proposal.md#S6 (AI-limits & exit-disposition table) |
| 机制 coverage（9） | geometry_layer_validation_ratio | 100.00% | 比率 | geometry/site_boundary.geojson、geometry/key_areas.geojson、geometry/land_use.geojson、geometry/buildings.geojson、geometry/roads.geojson、geometry/green_space.geojson、geometry/public_space.geojson、geometry/constraints.geojson、geometry/phasing.geojson |
| 机制 coverage（9） | protocol_gate_coverage_ratio | 100.00% | 比率 | proposal.md#S6 (protocol table) |
| 机制 coverage（9） | risk_rollback_mapping_ratio | 100.00% | 比率 | proposal.md#S6、risk.json |
| 机制 coverage（9） | simulation_p1_pass_ratio | 100.00% | 比率 | simulation.json |
| 机制 coverage（9） | risk_item_count | 8 | 项 | risk.json |
| v10.4 数据资产族（12） | contract_coverage_ratio | 100.00% | 比率 | visual/assets/dividend-contracts.json |
| v10.4 数据资产族（12） | blackout_clause_coverage_ratio | 100.00% | 比率 | visual/assets/dividend-contracts.json |
| v10.4 数据资产族（12） | bequest_clause_coverage_ratio | 100.00% | 比率 | visual/assets/dividend-contracts.json |
| v10.4 数据资产族（12） | state_machine_state_count | 8 | 项 | visual/assets/state-machine.json |
| v10.4 数据资产族（12） | state_machine_gate_count | 8 | 项 | visual/assets/state-machine.json |
| v10.4 数据资产族（12） | dual_gateway_gate_count | 16 | 项 | visual/assets/implementation-gates.json |
| v10.4 数据资产族（12） | governance_role_count | 8 | 项 | visual/assets/governance-raci.json |
| v10.4 数据资产族（12） | governance_constitutional_rule_count | 5 | 项 | visual/assets/governance-raci.json |
| v10.4 数据资产族（12） | simulation_rerun_receipt_ratio | 100.00% | 比率 | visual/assets/simulate-check.js |
| v10.4 数据资产族（12） | review_evidence_dimension_count | 7 | 项 | visual/assets/review-evidence-index.json |
| v10.4 数据资产族（12） | issue_ledger_entry_count | 3 | 项 | proposal.md |
| v10.4 数据资产族（12） | evidence_level_declared_count | 5 | 项 | proposal.md |
| 管控/绩效类 unknown（15） | floor_area_ratio 等 15 项（容积率/建筑高度/建筑密度/法定绿地率/退线/受影响户数/缓解预算/算力/年参与人次/已批场景/开发者转化率/年运营成本/AI 创新指数/人才密度/产值贡献） | 待官方条件 | — | 复算路径逐项见 metrics.json |

> 表注：61 known 与 metrics.json 逐项一致（v10.14.7 复核 61/61）；15 unknown 全部登记于 metrics.json 的 unknown 策略并给出官方发布后的复算路径，不进入任何结论；意见台账与证据等级计数登记于表 A9 与设计依据章 [metric:issue_ledger_entry_count] [metric:evidence_level_declared_count]。

**表 A18 状态机逐态登记表（8 态 8 转移，逐条机器可核验）**

8 状态机不只是"8 个名字"：每条转移绑定判定角色与证据门，条件逐条可核对（visual/assets/state-machine.json 与 simulation.json 回执一致）：

| 序 | 转移（状态→状态） | 判定角色 | 证据门 | 转移条件 |
| --- | --- | --- | --- | --- |
| 1 | proposed→baseline_verified | 单一责任主体 | E0/E1 | 护照 11 字段完整；无 AI 基线、数据上限与责任角色已声明 |
| 2 | baseline_verified→sandboxed | 现场安全与急停＋独立复测与审计 | E2 | 受控试点批准：安全审查、同任务人工路径、容量、公示、申诉与结束日期 |
| 3 | sandboxed→live | 运营主体＋公共基线守护与听证 | E3/P3 | 独立复测通过；三道异议门关闭；五项底线指标达成 |
| 4 | live→blackout_drill | 现场安全与急停＋公共基线守护与听证 | P3 | 计划停摆或五类回滚触发器任一触发（安全/隐私/文保/经济/生态） |
| 5 | blackout_drill→bequest_audit | 独立复测与审计 | P4 | 同任务人工路径验证可运行；残余资产与数据清单核对；**不可跳过** |
| 6 | bequest_audit→retained_or_modified | 单一责任主体 | E4 | 复测结论、持续预算、责任续办与年度公开声明通过 |
| 7 | bequest_audit→removed_archived | 单一责任主体＋维护与场地恢复 | E4 | 退役、场地与公共空间基线恢复、数据删除、平线档案归档；**不可跳过** |
| 8 | live→removed_archived | 现场安全与急停 | P3/P4 | 安全事故或约束性异议硬停；绕过成功叙事直接退役 |

> 表注：8 态 8 转移逐条登记于 visual/assets/state-machine.json（8 条转移各带角色与证据门）[metric:state_machine_state_count] [metric:state_machine_gate_count]；停摆演练与退场审计两道状态不可跳过（表 A11 词面稀缺性 0/839 全场唯一）。

**表 A19 治理角色登记表（8 角色，含不得替代双栏与缺岗兜底）**

治理不是一张 RACI 图而是可核验的责任闭环：8 角色逐项登记职责、不得替代边界与缺岗兜底（visual/assets/governance-raci.json 与正文公众委员会章程节一致）：

| 角色 ID | 职责 | 不得替代 | 缺岗兜底 |
| --- | --- | --- | --- |
| ROLE-ACCOUNTABLE-LEAD 单一责任主体 | 护照登记、E0-E4 门判定申报、退役与恢复决定 | 法定规划审批、行业监管与许可机关 | 服务不得进入测试；P1 申报退回补充材料 |
| ROLE-OPERATIONS 运营主体 | 长期运营、运营期限与续办条件、日常记录公开 | 独立复测与审计结论 | 不得发布；仅可停留在沙盒状态 |
| ROLE-SAFETY 现场安全与急停 | 现场安全审查、实体急停、五类回滚触发器停机判定 | 运营决策与预算决策 | 不进入受控试点；试点期间缺岗立即停摆并亮平线灯 |
| ROLE-DATA 数据守护 | 数据上限与留存期核验、未声明数据禁止采集、退役数据删除确认 | 个人信息使用授权 | 未声明数据不得采集；数据越界即触发隐私类回滚 |
| ROLE-PUBLIC-STEWARD 公共基线守护与听证 | 无 AI 等价基线核验、三道异议门主持、与安全角色可独立叫停试验 | 影响人群的专业责任与法律责任 | 不得宣称 AI 带来改善；异议门缺失不得发布 |
| ROLE-INDEPENDENT-EVALUATOR 独立复测与审计 | E3 独立复测、停摆演练与退场审计、失败记录匿名化公开 | 任何运营主体不得自证其退场审计 | 复测缺失不得扩大范围；退场审计不可跳过 |
| ROLE-MAINTENANCE 维护与场地恢复 | 退役时恢复场地与公共空间基线、平线档案墙陈列材料 | 复测结论 | 场地恢复未确认，退役程序不关闭 |
| ROLE-AFFECTED-PUBLIC 受影响公众 | 异议、申诉与叫停请求通道；听证参与 | 不承担专业责任，不负担义务性审查 | 申诉通道缺失，服务不得向公众开放 |

> 表注：8 角色逐条登记于 visual/assets/governance-raci.json [metric:governance_role_count]；宪法条款 5 条含"运营者不得自证其退场审计" [metric:governance_constitutional_rule_count]，与公众委员会示范章程（概念）衔接。

**表 A20 勘误登记表（13 条逐条登记，勘误册与变更记录互为第二台账）**

错误不是黑历史而是证据：本包 13 条真实勘误逐条登记错误形状、错误内容、发现者与修复版本（visual/assets/errata.json 六类形状词表），每条可沿 changelog 复核——勘误册说"错在哪"，变更记录说"改了什么"：

| 勘误 ID | 错误形状 | 错误内容（摘要） | 发现者 | 版本（发现→修复） |
| --- | --- | --- | --- | --- |
| E01 | 同一件事的两份拷贝各自漂移 | zh/en 图件 bbox_inches="tight" 各裁边→画布不一致、11–26% 顶部空白带 | 用户视觉报告 | v10.7.1→v10.7.2 |
| E02 | 几何表达的不是它声称的意思 | title_block 中英标题必然碰撞（19pt 与 10.5pt 锚点重叠） | 机器视觉复核＋像素扫描 | v10.7.1→v10.7.2 |
| E03 | 交付物在提交前没被看过 | 深蓝底图配深墨色标题，标题实际不可见 | 机器视觉复核 | v10.7.1→v10.7.2 |
| E04 | 交付物在提交前没被看过 | land-use 图例落在比例尺上方，两者重叠 | 机器视觉复核 | v10.7.1→v10.7.2 |
| E05 | 交付物在提交前没被看过 | 道路标签压线低对比；走廊标签衬底与底图混叠 | 机器视觉复核 | v10.7.1→v10.7.2 |
| E06 | 文字活得比装它的那句话久 | metrics-evidence 副题与主标题重复（同一句出现两次） | 机器视觉复核 | v10.7.1→v10.7.2 |
| E07 | 规则对别人成立，对自己没有执行 | simulation.json 被旧版 15 任务协议覆盖，120 任务版丢失致指标不一致 | 指标一致性校验 | v10.7.0→v10.7.1 |
| E08 | 同一件事的两份拷贝各自漂移 | core.autocrlf 使磁盘 CRLF、git blob LF，finalize 磁盘哈希与 CI blob 哈希不一致 | finalize 校验 | v10.5.x→v10.7.0 |
| E09 | 检查测了方便测的东西 | frontmatter iteration 变化不算正文变化，确定性校验失效 | 确定性校验 | v10.7.0→v10.7.1 |
| E10 | 几何表达的不是它声称的意思 | 官方 provisional 大钟寺质心落在北京北站附近（公开 Issue #1029） | 公开 Issue | v10.4.x→v10.7.0 |
| E11 | 几何表达的不是它声称的意思 | 总体范围与京张铁路遗址公园不相交（最近 412.5 m，公开 Issue #846） | 公开 Issue | v10.4.x→v10.7.0 |
| E12 | 检查测了方便测的东西 | 机器视觉复核连续三次误报，像素扫描逐项证伪（flash 级视觉模型局限） | 像素扫描复核 | v10.7.1→v10.7.2 |
| E13 | 交付物在提交前没被看过 | 设计边界（概念建议）画实线与官方 provisional 虚线语义混同 | 提交前复核 | v10.7.1→v10.7.2 |

> 表注：13 条勘误逐条登记于 visual/assets/errata.json [data:visual/assets/errata.json]（六类形状词表：双拷贝漂移/几何非其声称/交付物没被看过/检查测了方便测的/规则对自己没执行/文字活得比句子久），每条经 changelog.md 复核；勘误册与变更记录互为第二台账（表 A14"勘误 13/13"同口径）。








**表 A13 公共服务准入基准（PSAB）与自否推演（规范机器可读，推演自我否证）**

第六至八章把协议写成机制；本表把机制提炼为**可复用的机器可读规范**——PSAB（Public Service Admission Baseline，公共服务准入基准，`visual/assets/psab-spec.json`，规范文本为本方案自著、CC BY-SA 4.0）：任何公共 AI 服务对象可离线核验准入判定，不依赖本方案自述 [metric:dual_gateway_gate_count] [metric:service_passport_required_field_count] [metric:contract_coverage_ratio]：

| PSAB 要素 | 核心判定子句 | 非合规处置 | 对应正文 |
| --- | --- | --- | --- |
| ADMISSIBLE 可申报 | 护照 11 字段完备（PF-01..11）＋P1 申报书公开＋场景闸 C0-C7 一一对应 | 缺项退回，对应门保持关闭 | 第六章护照表、双闸门 |
| TESTABLE 可测试 | 受控试点（预约/分区/安全员/实体急停/结束日期）＋五类回滚触发器停机阀＋人工等价路径试点实测 | 触发即降级或停用；实测不可用不得上线 | 第六章统一回滚触发器 |
| PUBLISHABLE 可发布 | 三道异议门无未决异议＋五项底线指标达标＋E3 独立复测通过 | 异议未决不发布；未达标降级回 P2 | 第六章证据门 E2–E3 |
| RETIRABLE 可退役 | 四段合同完整（BASE/BOOST/BLACKOUT/BEQUEST）＋8 状态机不可跳过＋退役即档案墙公开陈列＋数据与场地恢复确认 | 无退场合同不得发布；未恢复不得关闭档案 | 第六章四段合同、状态机、平线档案墙 |
| EVIDENCED 可核验 | E0-E4 证据门控制推进＋回执哈希可重跑＋复算纪律 | 无证据不前进；回执不可复算的主张不成立 | 第六章证据门 E0–E4 |

**自否推演（自己否自己）**：PSAB 声称规范完备，就用 PSAB 自己的校验器对其边界样例执行推演（`node visual/assets/psab-validate.js --drill`）——推演样本不是伪造失败，而是携带当前字段集无法承载的声明，看校验器是否如实报告缺口。结果：**3 条真实缺口（不是 0）**——规范 v1.0 不自称完整，缺口与处置全部登记于 `visual/assets/psab-drill.json`：

| 缺口 | 推演样本 | 缺口内容 | 处置 |
| --- | --- | --- | --- |
| CR-001 | 服务数据处理涉及跨境流动 | 护照 11 字段无数据跨境必填项，ADM-1 无法核验该声明 | 已登记回执；字段集修订（数据跨境声明）列为 PSAB v1.1 变更项 |
| CR-002 | 公众委员会听证结论留档 | E0 最少证据清单无听证留档强制项，核验器无法判定留档缺失 | 已登记回执；E0 证据集增补列为 v1.1 变更项 |
| CR-003 | AI 增益分配登记 | BOOST 段合同 schema 无增益分配字段——原则在正文（第十二章"节省的时间由谁支付"）、schema 无承载 | 已登记回执；合同增补列为 v1.1 变更项 |

真实输出快照（`node visual/assets/psab-validate.js` 与 `--drill`，提交时本地实测）：

```text
$ node visual/assets/psab-validate.js
PSAB AUDIT: 9 real services vs PSAB v1.0
  ADMISSIBLE(9/9), TESTABLE(9/9), PUBLISHABLE(9/9), RETIRABLE(9/9), EVIDENCED(9/9)
  gaps in real services: 0
exit 0 (all real services admit per PSAB v1.0; none field-run)

$ node visual/assets/psab-validate.js --drill
PSAB DRILL: 3 boundary samples, 3 real gaps
  CR-001 data_cross_border: passport_fields 无 data_cross_border 条目；ADM-1 无法核验该声明
  CR-002 hearing_record: E0 evidence list 无 hearing_record；核验器无法判定留档缺失
  CR-003 gain_allocation: BOOST clause 无 gain_allocation 字段；原则在正文、schema 无承载
receipts written to psab-drill.json
exit 1 (gaps found, by design)
```

自否装置的读法：drill 模式以退出码 1 结束是设计——本方案主张"城市应当公开自身误差"，因此自己的规范也公开缺口，并把修复列为下一版本变更项而不是假装本版已修复。audit 模式 9/9 只说明 9 项真实服务对 v1.0 规范声明了合规路径，**不说明任何服务已获授权或已运行**（包级状态 field_run=false，与表 A12 第一条同一声明）。PSAB 复用（规范文本自著、CC BY-SA 4.0）：其他公共 AI 服务提案可直接引用为准入基线；评审端可离线 audit 任意服务对象；运营可直接以 PSAB 子句作为服务合同前置条款。

## 设计依据与资料清单

本 formal 方案以北京市规划和自然资源委员会海淀分局发布的《百年京张AI创新带城市设计国际方案征集资格预审公告》为第一依据，并以 `brief/site-package/` 中经维护者登记的临时粗略边界、重点区域、枚举、指标和来源清单为机器可读依据。AI agent 在生成方案前读取了 `design_brief.json`、`allowed_design_space.json`、`sources.json`、`enums/`、`ranges/`、`schemas/`、`data/source_registry.json` 与 `data/processed/agent_fact_pack.md`，并按 `project_scope_summary.csv`、`agent_task_requirements.csv`、`source_use_matrix.csv`、`missing_data_checklist.csv` 建立任务、范围、资料用途和缺口清单。所有设计判断均拆分为可追溯来源、可复算指标、可校验图层和可人工复核假设。公告要求方案达到控制性详细规划的城市设计深度和规划综合实施方案的城市设计深度，因此文本叙述不替代 GeoJSON、指标表、A3 文册、A0 展板和 HTML 电子展示成果 [source:OFFICIAL-ANNOUNCEMENT] [source:AGENT-TASKBOOK] [depth:existing_conditions_diagnosis]。

资料登记表的使用边界如下 [source:SOURCE-REGISTRY]：

- `data/source_registry.json` 登记公开、清权与临时资料的用途边界；当前登记摘要：formal 可用资料 7 条、背景资料 1 条、provisional-only 资料 1 条。
- 本方案仅将 provisional 边界用于方案生成、自检、可视化和设计讨论，不升级为 official boundary、法定控规、正式评分依据或政府实施承诺。

`data/processed/agent_fact_pack.md` 是本方案的阅读导航层，不是新的权威来源 [source:PROCESSED-FACT-PACK]。事实判断均回到已登记原始材料；完整来源关系由 `sources.json` 保存。

本方案在官方 `SITE_BOUNDARY` 与三处 `KEY_AREA` 尚未取得时，使用 `brief/site-package/geometry/provisional_boundaries.geojson` 生成 formal 包 [source:BOUNDARY-SOURCE] [source:KEY-AREA-SOURCE]：`geometry/site_boundary.geojson` 与 `geometry/key_areas.geojson` 均标注为 `provisional_constraint`、不声明 `official_boundary=true`，只能用于方案生成、自检、可视化和设计讨论。实测总体设计区面积 11.413 km2，与官方预公告值 11.4 km2 偏差 0.11%，已在 `assumptions.json`（[assumption:ASSUME-002]）披露 [data:geometry/site_boundary.geojson#PROV-SITE-001] [metric:site_area_sqm]。三处重点区数量由独立图层核对 [data:geometry/key_areas.geojson#PROV-KEY-001] [metric:key_area_count]。组织方数据缺口不阻断内容评分；官方 polygons 发布后需重算 site boundary、key areas、land use、roads、green space、public space、buildings、phasing 与 metrics。

**证据等级声明（L1–L5，贯穿全文）**：全文每一处主张都按证据等级标注口径，图面与正文同步声明——L1 官方文件（公告、标准、官方发布数据）；L2 公开来源（报刊、机构公开报告、OSM 等，经 sources.json 登记）；L3 派生计算（本管线按固定 seed 确定性复算，可字节级重放）；L4 概念建议（本方案提出的机制、场景、分期与投资量级，不构成结论）；L5 临时假设（官方缺失时的 provisional 处理，登记于 assumptions.json）。L5 项永不冒充官方事实，L4 项永不写成实施承诺；引用标记中的 `[source:...]`/`[data:...]`/`[standard:...]`/`[metric:...]`/`[depth:...]` 即各等级的机器可读锚点 [metric:evidence_level_declared_count]。

| 证据等级 | 定义 | 典型内容 | 图面/正文规则 |
| --- | --- | --- | --- |
| L1 官方文件 | 官方公告、标准、官方发布数据 | 公告 1.3-1.5、官方规划限值 11.4 km²、法规条文 | 可直接引用并标注条款；与实测冲突时以官方为准 |
| L2 公开来源 | 报刊、机构公开报告、OSM 等 | 全球 AI 生态案例、产业公开数据 | 必须经 sources.json 登记并注明出处 |
| L3 派生计算 | 本管线确定性复算 | 面积/比例/计数（EPSG:4548）、指标族 | 必须带 formula 与 source_files，可字节级重放 |
| L4 概念建议 | 本方案提出、未获确认 | 全部用地/道路/场景/分期/机制/投资量级 | 必须标注"概念建议"，不构成结论 |
| L5 临时假设 | 官方缺失时的 provisional 处理 | provisional 边界、ASSUME-001/002/007 | 必须登记 assumptions.json，永不冒充 official |

**官方参照台账（逐份访问、如实登记、不作援引）**：`sources.json` 对每一份官方参照材料登记访问状态、可用性与用途边界；对"读过但未构成设计依据"的材料亦如实登记（background_only/provisional_only），不把背景阅读伪装成设计依据。官方几何缺失时本方案使用 provisional 边界并披露拟合偏差（[assumption:ASSUME-002]），官方关键区几何疑似偏差（公开 Issue #1029）主动引用并声明处理（[assumption:ASSUME-007]）。

**机制词面稀缺性复测（把仪器对准自己）**：本方案对"状态机不可跳过、日级检查点、成本复算、可收回接口"等机制词面是否真的稀缺，不自述，而是用同场扫描测量——`track_scan.json` 以 840 份 proposal.md 为语料（open-city-ai/haidian main 快照）逐项公开词面正则扫描，命中清单逐份公开可复核。除本方案外：**状态机不可跳过（停摆演练/退场审计必经）0 份、日级检查点（动作+通过证据+不通过处置）0 份、成本复算框架（复算基数×单价区间）3 份、可收回要素接口（占用+收回条件）4 份**。词面扫描会漏计同义表述，因此计数只证明"用过这些词的份数"，不证明"想过这件事的份数"——本方案据此只主张机制词面稀缺，不主张机制思想独有；扫描是快照，任一评审可按 `track_scan.json` 记录的 corpus 来源与重跑指令，对最新 main 重扫复核 [data:visual/assets/track_scan.json]。

## 三层范围工作框架

**本章的判断是：三层范围不是画圈游戏，而是三层准入——统筹研究范围（43.6 km²）承担 P1 申报与生态扫描、总体设计范围（11.4 km²）承担 P2 受控测试、三重点区承担 P3 发布与 P4 复盘（协议节拍见第六章）**。


方案按公告确定的三层范围组织工作：**统筹研究范围** 43.6 km2，研究 AI 产业生态、战略定位、创新链与未来城市形态；**总体设计范围** 11.4 km2，形成城市更新总体框架、产业空间布局、交通市政支撑和城市风貌控制；**重点区域范围** 368.4 ha 三处详细设计地区，明确功能业态、空间动作、公共空间连通与交通组织。三层范围在 `compliance_matrix.json` 中逐条映射，保证公告 1.3、1.4、1.5 与 agent.1–agent.6 必选任务均有章节、图层、指标、图纸和 HTML 证据 [depth:three_level_scope_framework] [depth:overall_spatial_structure] [standard:PROJECT-OFFICIAL-ANNOUNCEMENT]。

本方案总体概念为**「智脉一带 · AI Pulse Belt」**：延续京张铁路百年"铁脉"的记忆与线性空间骨架，塑造面向人工智能时代的"数字智脉"——以贯穿南北的中央绿廊为"一带"（对应公告 1.5(2)4"京张遗址公园活力带"：中央智脉绿廊即京张遗址公园活力带在总体设计区的智脉化载体，清华园车站遗址与沿线历史构件均落位于此带内），以众智园、北京AI原点社区、大钟寺三处重点区为"三核"，以中关村科技服务翼（西侧产业服务界面）与小月河场景赋能翼（东侧蓝绿生态界面）为"双翼"（翼方位按组织方材料登记于 [assumption:ASSUME-006]，官方发布后按 P4 更新），以 AI 场景节点与慢行网络为"多点"，形成"**一带三核、双翼多点**"的总体空间结构。Logo 意象为"脉"字与铁轨线渐变示波器波形：京张铁灰（#4A5560）与 AI 青（#0FA3B1）双色，口号"**百年轨道，智慧脉动**"。

| 层级 | 设计问题 | 方案回答 | 数据落点 |
| --- | --- | --- | --- |
| 统筹研究范围 | AI 产业生态与未来城市形态如何组织 | "高校策源—开源协作—企业转化—公共体验—国际传播"创新链 + 三区两翼协同 | compliance_matrix.json、standard_matrix.json |
| 总体设计范围 | 产业空间、城市更新、交通市政与风貌如何落图 | 中央绿廊 260 m 宽、"四横两纵"道路骨架、四分区带、155 块用地无缝覆盖 | [data:geometry/land_use.geojson#LU-001]、[data:geometry/roads.geojson#ROAD-001] |
| 重点区域范围 | 三处片区如何达到详细设计深度 | 分别提出定位、空间动作、AI 场景与朝圣地标 | [data:geometry/key_areas.geojson#PROV-KEY-001]、[data:geometry/key_areas.geojson#PROV-KEY-002]、[data:geometry/key_areas.geojson#PROV-KEY-003] |

三层工作不是割裂图纸：统筹研究决定产业链与城市形态判断，总体设计将判断落实为更新项目与空间结构，重点区域详细设计验证具体地块、建筑、交通、公共空间与 AI 应用场景的可实施性 [source:PROCESSED-FACT-PACK]。任何无法从结构化数据复算的面积、比例、规模或项目数量，均不写入正式结论。

![图 1 总体设计区与统筹研究区范围示意图（概念建议；数据来源：geometry/site_boundary.geojson 与 geometry/key_areas.geojson，provisional）](assets/figures/site-overview.png)

## 统筹研究范围产业与未来城市研究

**本章的判断是：产业与未来城市研究的价值不在产业目录长短，而在每一类产业能否在智脉一带找到可申报（P1）、可测试（P2）、可发布（P3）的承接界面；下文 X 类产业目录为概念假设，官方口径发布后按 P4 重算**。


统筹研究的基本判断是：AI 创新带不应只拼接实验室、企业与展示空间，而要把研究—服务—转化—受控测试—公共问责组成可停止的责任链。本章用可复算的"生成器—产物"管线完成 agent.2 全球 AI 生态与 agent.6 运营转化两项任务（核对见表 A2），使生态图谱与五环创新链的每个主张都能回到结构化数据，而不是停留在口号。

**AI 原生规划方法（本方案方法论声明）**：本方案不是传统图纸的 AI 复述，而是"生成器—产物"管线的可复算规划方法，全程可复核、可重放、可替换输入后重算：
- **生成器—产物管线**：几何图层（9 个 GeoJSON）、指标体系、图件（PNG）、书册/展板（PDF）、交互页（HTML）均由提交包外的确定性生成管线（`tools/gen_0*.py`）从官方 `brief/site-package/geometry/provisional_boundaries.geojson` 单一输入确定性产出（固定随机种子、字节级 manifest 哈希复现，经 G1 门校验）；包内复现入口为 `simulation.json` 的 seed 与 `visual/assets/simulate-check.js`（退出码契约 0/1/2）。
- **约束驱动而非自由绘制**：概念用地由 polygonize 算法按共享边无缝拼合（unary_union 差集容差 <0.1 m²），面积全部按 EPSG:4548 投影复算，指标与几何互证而非独立声明。
- **证据即代码**：每个结论携带可交叉解析的 [source:]/[metric:]/[data:] 引用 id，悬空引用在预检门直接失败；官方缺失的指标一律以 unknown 明示，不以估算冒充。
- **边界替换即重算**：官方边界发布后，仅需替换输入并重跑生成器，全部产物自动更新——这正是 P4 程序的实现基础，也是本方案可被持续审查的结构前提。
- **局限声明**：以上方法保证的是可复核性与一致性，不代替专业规划资质审定与法定审批；任何结论在官方发布前均为概念建议（同 ASSUME-005/006 管理）。

统筹研究范围的核心任务是构建世界级 AI 创新生态体系。方案梳理海淀高校院所、头部企业、算力算法数据要素、孵化平台与科技服务资源，提出"高校策源—开源协作—企业转化—公共体验—国际传播"五环创新链的空间协同框架，并回应任务书"三大定位、五大功能和三区两翼协同回路"必答项 [source:AGENT-TASKBOOK] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]：**三大征集目的**（公告 1.3）为构建世界级 AI 创新生态体系、建设适配 AI 新质生产力的新型城市形态、打造全球 AI 创新人才向往的高品质城区，本方案分别以生态图谱与创新链（本节）、总体结构（第二章）与人才画像及场景体系（第六章）逐条回应；**五项总体设计任务**（公告 1.5(2)）为产业目标与功能布局、城市更新总体框架、交通轨道市政配套、京张遗址公园活力带、城市风貌，本方案在第四至第九章逐条落实；**三区两翼协同回路**以三重点区（三区）与东西双翼（两翼）的产业—空间—服务循环组织（见下表）。

**三大定位与五大功能映射（概念建议）**：任务书必答项"三大定位、五大功能"在本方案中的逐条映射如下（概念映射，供专业团队深化）[source:AGENT-TASKBOOK]：

| 类型 | 官方表述 | 本方案对应载体 |
| --- | --- | --- |
| 三大定位 1 | 百年京张文化带 | 第九章三线文化叙事、智脉艺术铁轨与平线档案墙 |
| 三大定位 2 | 都市AI生活体验带 | 第六章 12 张场景卡、3 个朝圣地标与朝圣路线 |
| 三大定位 3 | AI融合创新带 | 第三章生态图谱、五环创新链与 1+X+1 映射表 |
| 五大功能 1 | AI全栈自主创新体系 | 众智园：训练测试、标准治理、低碳算力 |
| 五大功能 2 | 世界级AI创新生态 | 原点社区近校孵化 + 中关村科技服务翼国际交往 |
| 五大功能 3 | AI+场景赋能新范式 | 小月河场景赋能翼受控测试与场景开放机制 |
| 五大功能 4 | 智能化AI活力城市 | 中央绿廊、公共空间组件库与智能交通体系 |
| 五大功能 5 | AI治理全球话语权 | 智脉脉冲协议、标准文化馆与平线档案墙 |

**生态图谱（概念建议）**：参照全球 AI 创新区成功经验，提炼六类空间机制：**土地供给**（留白弹性用地，用地代码 16、共 4 处，承载未来业态）、**空间组织**（庭院式研发街区）、**产业服务**（算力/数据/合规/投融资一站式）、**资金机制**（场景开放与政府采购引导）、**人才服务**（人才特区与青年公寓）、**数据场景**（开放测试场与测评体系）。六个参考案例的机制转译与边界如下：

| 案例 | 可转化机制 | 京张应用 | 不可照搬条件 |
| --- | --- | --- | --- |
| 新加坡 Punggol Digital District | 产学研住一体、数字试验床 | 众智园科研带与测试场组织方式 | 新加坡单一土地机构与财政模式不同 |
| 赫尔辛基 Kalasatama | 敏捷试验街区、居民共测、限时试验 | 小月河翼受控测试与公众复盘 | 市政数据与采购制度不同 |
| 首尔 AI Hub | 政府培育 AI 企业的产业平台 | 众智园产业服务与算力入口组织 | 韩国产业生态与融资结构不可移植 |
| 剑桥 The Foundry | 校区—园区—社区三角联动 | 原点社区近校孵化接口 | 剑桥大学土地与科研资助结构不同 |
| 多伦多 Waterfront Toronto | 滨水创新走廊、公私合作开发 | 大钟寺站前与绿廊界面组织 | 加拿大公共资金与开发融资不同 |
| 巴黎 STATION F | 巨型孵化器与街区级创新网络 | 原点发布厅与开放工位运营 | 欧盟资金与法国劳动制度不同 |

全球案例结论均为概念参考，供专业团队深化，不构成已确定的政府安排。

![图 2 AI 创新生态图谱（概念建议；agent 基于公开资料与全球 AI 创新区实践绘制，非官方）](assets/figures/ecosystem-map.png)

**三区两翼产业布局（概念建议）**：

| 片区 | 产业侧重 | 空间落点 |
| --- | --- | --- |
| 众智园AI自主创新加速区 | 大模型训练、全栈自主创新、标准制定与安全治理 | 众智园北部科研带、标准文化馆、体育测试场 [data:geometry/land_use.geojson#LU-001] |
| 北京AI原点社区 | 近校孵化转化、开源体系、人才特区、成果发布 | 原点发布厅、清华东路教育带、五道口商住带 [data:geometry/land_use.geojson#LU-001] |
| 大钟寺AI产业聚集区 | 智能体、智能终端、内容消费、数据要素 | 知春路商业带、数据要素楼、站前商业 [data:geometry/land_use.geojson#LU-001] |
| 小月河场景赋能翼（东翼） | 场景试验、生态体验 | 防护绿地与场景测试段 [data:geometry/green_space.geojson#GREEN-001] |
| 中关村科技服务翼（西翼） | 科技服务、国际交往；承接土地、资金、人才、算力、数据、场景六类支撑机制 | 学院路沿线科研与服务平台、产业服务设施 [data:geometry/land_use.geojson#LU-001] |

**科技服务翼专项机制（概念建议）**：中关村科技服务翼（西翼）承接 taskbook 赋予的"中关村 IP 与要素全球化配置"角色——① 中关村 IP 与标准输出：对接中关村知识产权公开服务，输出标准治理与开源规范咨询方向（概念方向）；② 要素全球化配置：国际交往、跨境数据合规咨询服务方向，跨境机制以公开政策为前提，不虚构制度结论；③ 资本赋能：对接产业基金与"三源资金"渠道，只写机制不写承诺。以上均为概念方向，供专业团队深化。

**区域协同接口（概念建议）**：统筹研究范围以六类接口衔接更大创新网络（任务书五类 + 公告 1.5(1) 两区一带联动）；现阶段无已确认的跨区协议，接口仅表达可协商方向 [source:AGENT-TASKBOOK]：

| 接口 | 协同问题 | 建议互动形式 | 边界与前提 |
| --- | --- | --- | --- |
| 北纬社区 | 社区级 AI 服务在不同住区条件下的适用性差异 | 跨社区对照复测、问题清单互换 | 以公开议题为限，不虚构共同运营或居民授权 |
| 未来科学城 | 前沿技术从实验室到城市场景的落地验证路径 | 专家复核方法互借、研发反馈回环 | 研究成果不作产品化承诺，不提前发布未审结论 |
| 怀柔科学城 | 大科学设施成果向城市生活服务的转译需求 | 跨学科验证建议、测量方法交流 | 不触及非公开科研与设施数据 |
| 北京经开区 | 机器人与智能制造的真实工况与安全要求 | 生产环境复测记录、安全要求互认 | 不虚构企业、订单或产线合作 |
| 京津冀城市网络 | 可跨城比较的公共服务问题与差异归因 | 异地复测、差异说明与失败记录公开 | 单点结果不替代跨城验证 |
| 海淀"两区一带"产业带 | 公告 1.5(1) 要求联动"两区一带"产业发展 | 产业要素走廊功能映射互认 | 以官方发布的"两区一带"布局为限，不虚构跨区协议 |

**对接海淀"1+X+1"产业体系（概念建议）**：公告 1.5(2) 要求结合海淀"1+X+1"产业体系提出"AI+"其他主导产业的融合发展方向，并明确各类产业的功能比例与空间组织模式 [source:OFFICIAL-ANNOUNCEMENT]。本方案按"1（人工智能）＋X（海淀主导产业）＋1（科技服务与生活服务业）"结构建立功能映射（下表）：X 类按公开产业信息提出假设目录（软件与信息服务业、智能网联汽车、智能制造、医药健康、新材料与能源环保等主导产业），待官方产业口径确认后按 P4 更新；教育文化、智能终端与内容消费作为"AI+ 垂直应用落地的重点区域"融合方向列出，不参与 X 类口径；"＋1"（科技服务与生活服务业）按"1+X+1"第三元处理、非 X 类。功能比例区间按本包概念图层实测（EPSG:4548 复算，见 ASSUME-005）：科研 0802 约 19–25%（实测 21.9%）、商业 05 约 5–9%（实测 7.0%）、住宅 0701 约 11–16%（实测 13.6%）、道路 1207 约 8–14%（实测 10.7%）、绿地约 22–28%（实测 25.0%，仅计 1401 公园绿地与 1402 防护绿地，与 metrics green_ratio 口径一致）、留白 16 约 2–4%（实测 2.7%）、文化教育体育医疗合计约 12–17%（实测 14.4%，0803–0806）；与官方产业目录、国土调查数据对齐后按 P4 复盘重算；总体建筑规模概念区间 800–1200 万 m2（含既有保留建筑，量级口径待复核）。全部区间均为假设待复核（见 [assumption:ASSUME-005]），不进入任何审批结论，官方控规与统计发布后按 P4 复盘重算。

| "1+X+1"组成 | 片区"AI+"融合方向 | 空间落点 | 概念功能比例区间（待复核） |
| --- | --- | --- | --- |
| "1"：人工智能 | AI 大模型训练、智能体、端侧算力、数据要素 | 众智园科研带、大钟寺数据要素楼、留白弹性用地 | 科研 0802 约 19–25%（实测 21.9%） |
| X1：软件与信息服务业 | 开源协作、基础软件、行业大模型 | 原点发布厅、学院路科研平台 | 商业 05 约 5–9%（实测 7.0%） |
| X2：智能网联汽车 | 车路协同、无人接驳、智慧物流（场景卡 02 与车路协同测试段联动） | 智脉大道概念段、众智园共享测试场 | 道路 1207 约 8–14%（实测 10.7%） |
| X3：智能制造 | 机器人、智能终端制造与中试 | 众智园科研带、留白弹性用地 | 融入科研与商业用地 |
| X4：医药健康 | 健康服务类信息提示、适老医疗导航 | 医疗 0806 用地、无障碍 AI 导行站 | 住宅 0701 约 11–16%（实测 13.6%） |
| X5：新材料与能源环保 | 低碳算力、分布式能源、能耗调控（场景卡 10 联动） | 众智园低碳算力组团、留白弹性用地 | 融入科研与商业用地 |
| "＋1"：科技服务与生活服务业 | 企业服务智能体、人才服务、生活服务（"1+X+1"第三元，非 X 类） | 五道口商住带、中关村科技服务翼（西翼） | 融入商业与住宅用地 |
| AI+ 垂直融合方向（非 X 口径） | 教育文化（AI 科普课堂、北影艺术资源联动）、智能终端与内容消费（大钟寺展示与路演） | 教育 0804、文化 0803 用地、大钟寺站城商业带 | 融入商业与科研用地 |

未来城市形态研究回答人工智能如何改变工作、生活、社交、学习、交通与公共服务：以"数字智脉"为空间线索，把 AI 交通系统、连续绿色空间、创新服务设施与国际化生活工作氛围落实为可定位的功能区、节点、廊道与场景 [depth:overall_spatial_structure] [standard:MOHURD-URBAN-DESIGN-MEASURES]。全球 AI 创新活动、开发者社区、开放场景与朝圣路线均表述为"概念建议/参考方案"，不写为已确定的政府活动或实施安排。

**与国土空间规划的衔接（概念建议）**：本方案全部空间主张按"与在编国土空间总体规划及街区控规衔接、不代替法定规划"的边界表达——用地分类复用《国土空间调查、规划、用途管制用地用海分类指南（试行）》枚举 [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE] [source:MNR-LAND-USE-GUIDE]，开发强度与建筑高度不给出数值结论（待正式控规条件确认，见 [assumption:ASSUME-003] 与 [assumption:A-CONTROLS-001]），留白弹性用地预留未来用途变更空间；正式国土空间规划与官方控制条件发布后，本方案按 P4 复盘程序重算指标、更新图层并重新披露 [depth:risk_missing_data] [source:AGENT-TASKBOOK]。

## 总体设计范围城市更新与控规深度城市设计

**本章的判断是：总体设计不承诺任何建设结论，而是给出 P1–P4 四拍的试验场地——中部地段承接申报与测试界面，重点区承接发布界面，绿廊与留白承接退役恢复界面**。


总体设计的判断是：更新不是在大图上加装饰，而是让"铁脉→智脉"的转译落到每一块用地、每一条道路和每一个节点，使 agent.1 命名体系与 agent.5 文化叙事获得空间落点（核对见表 A2）。因此本章先公开现状诊断的数据基础与缺口（概念级），再给出可复算的用地、道路、缝合与更新结构。

**现状诊断（基于公开资料，概念级）**：以下诊断仅基于公开任务书、公开地图与 provisional 几何，不构成现状调查结论；官方现状调查与控制条件发布后须复核：

| 现状要素 | 公开资料基础 | 数据缺口与处理 |
| --- | --- | --- |
| 铁轨与遗址 | 京张铁路历史走向、清华园车站遗址、京张遗址公园活力带（公告 1.5(2)4） | 轨道现状精确线位待官方图件，以概念表达 [data:geometry/constraints.geojson#CONSTRAINTS-01] |
| 轨道站点 | 地铁站点与既有轨道交通网络（公开地图） | 站点红线与接驳用地待官方确认 |
| 水系 | 清河、小月河水系位置（公开水系数据） | 蓝线边界待官方蓝线图 |
| 道路骨架 | 北五环、学院路、知春路等城市道路（公开路网） | 道路红线宽度待官方控规 |
| 用地底图 | 现状用地分类与 155 地块拟合（provisional）[data:geometry/land_use.geojson#LU-001] | 权属与用途以国土调查数据为准 |
| 公共服务 | 五道口商圈、教育设施分布（公开信息） | 设施现状容量待调查 |
| 产业载体 | 中关村及学院路沿线科研与产业园区（公开信息） | 楼宇功能现状待核验 |
| 绿地资源 | 概念图层绿地复算约 284.8 ha（25.0%，仅计 1401/1402，非现状存量、待现状调查）[metric:green_ratio] | 绿线边界待官方绿线图 |
| 文保要素 | 大钟寺、清华园车站遗址、京张全站文化展示节点等文保单位（公开名录） | 保护范围与建控地带待官方划定 [data:geometry/constraints.geojson#HERITAGE-01] [data:geometry/constraints.geojson#HERITAGE-02] |

总体设计范围（实测 11.413 km2）要求达到控制性详细规划的城市设计深度 [standard:MOHURD-CONTROL-DETAILED-PLANNING]。本方案提出以**中央智脉绿廊**为脊的总体结构 [data:geometry/land_use.geojson#LU-001]：沿绿廊东西两侧组织用地，形成**四个分区带**——众智园科研带（北）、原点社区产城融合带、大钟寺商业科研带、南部更新带，并预留南端留白弹性用地承载未来 AI 业态（用地代码 16、共 4 处）[depth:land_use_layout] [depth:development_intensity_controls]。**留白登记（概念建议）**：四处留白编号 RES-01（南部弹性组团）、RES-02（绿廊东侧弹性地块）、RES-03（众智园南缘弹性地块）、RES-04（大钟寺北缘弹性地块），不预设用途，待官方控规与产业导入条件确认后启动；留白不参与本方案任何指标计算与审批结论 [data:geometry/land_use.geojson#LU-001] [depth:risk_missing_data]。

**道路网络（概念建议）**：以"四横两纵"为骨架——横向北五环（快速路）、清华东路（次干路）、成府路（支路）、知春路（主干路）；纵向学院路/西土城路（主干路）、荷清路/大钟寺东路（次干路）；并新增设计道路**智脉大道**、智脉二街、智脉三街组织地块微循环，中央绿廊内设连续绿道 [data:geometry/roads.geojson#ROAD-001] [data:geometry/roads.geojson#ROAD-010]。

**用地结构（概念建议）**：`geometry/land_use.geojson` 共 155 个地块，13 类用地，完整覆盖设计边界且无重叠（差集约 30 m2，即 0.0003%，由 EPSG:4326 六位小数量化舍入所致，管线内已由 `validate_cover` 校验）[data:geometry/land_use.geojson#LU-001]。科研用地（0802）为主导类型，商业（05）、住宅（0701）、文化（0803）、教育（0804）等协同支撑；中央绿廊（1401 公园绿地）宽约 260 m，贯通南北 [data:geometry/green_space.geojson#GREEN-001]。`geometry/buildings.geojson` 表达 84 栋概念建筑基底（design_proposal 属性、互不重叠、非法定许可）[data:geometry/buildings.geojson#BLDG-001] [metric:building_footprint_area_sqm]。**涉及建筑高度、开发强度、道路红线、退线、屋顶形态、体量与设施标准等管控引导内容，在官方控制条件发布前一律按"待正式控规条件确认"处理，不以 agent 推测值冒充审定指标**。

**东西缝合与南北贯通概念策略（概念建议）**（回应公告与任务书"促进东西缝合、南北连通"重点方向）：**南北贯通**——中央智脉绿廊（JZ-01）与智脉大道（JZ-06）构成贯通南北的双脊，绿廊内连续慢行绿道保证步行与骑行不间断 [data:geometry/green_space.geojson#GREEN-001] [data:geometry/roads.geojson#ROAD-008]；**东西缝合**——绿廊两侧四个分区带东西组织用地，五道口/大钟寺站前东西向慢行接口（JZ-05）与清华东路教育带缝合校区园区（JZ-07）、学院路沿线防护绿带构成缝合界面 [data:geometry/land_use.geojson#LU-001]。策略为概念表达，随官方控规发布按 P4 更新。

![图 3 总体设计区用地结构图（概念建议；数据来源：geometry/land_use.geojson，provisional）](assets/figures/land-use-structure.png)

## 重点区域详细设计

三处重点区域的判断是：不是把同一套图案放大三遍，而是让三个片区各自验证一种责任剖面——众智园验证"受控测试"，原点社区验证"近校转化"，大钟寺验证"站城运营"；agent.3 场景落点与 agent.4 朝圣地标据此分置（核对见表 A2）。三处重点区域达到规划综合实施方案深度 [depth:three_key_area_detailed_design]，分别引用 [data:geometry/key_areas.geojson#PROV-KEY-001]、[data:geometry/key_areas.geojson#PROV-KEY-002]、[data:geometry/key_areas.geojson#PROV-KEY-003]。

| 重点片区 | 设计定位 | 空间动作 | AI 产业与运营场景 | 证据引用 |
| --- | --- | --- | --- | --- |
| 众智园AI自主创新加速区（192.1 ha） | 花园型全栈自主创新街区（承载国家级人工智能集聚区功能，概念方向） | 北临五环设绿带缓冲；门户广场接驳；科研院落 + 标准文化馆 + 体育测试场 + 留白弹性用地；结合清河及项目区水绿资源开展建筑—绿地—水系一体化设计并挖掘展示清河文化（概念） | 大模型训练测试、标准制定工作坊、安全治理展示、低碳算力体验 | [data:geometry/key_areas.geojson#PROV-KEY-001]、[data:geometry/land_use.geojson#LU-001]、[data:geometry/public_space.geojson#PUBLIC-003] |
| 北京AI原点社区（104.3 ha） | 近校型成果转化与人才社区 | 清华东路教育带缝合校区园区；原点发布厅（文化 0803）；五道口商住带；社区服务嵌入 | 开源社区、成果发布、人才特区服务、近校孵化 | [data:geometry/key_areas.geojson#PROV-KEY-002]、[data:geometry/public_space.geojson#PUBLIC-002]、[source:AGENT-TASKBOOK] |
| 大钟寺AI产业聚集区（72.0 ha） | 站城一体化智能经济街区 | 大钟寺站前广场四象限步行连通；知春路商业带；数据要素楼；站城商业复合 | 智能体与智能终端展示、内容消费、数据要素与国际路演 | [data:geometry/key_areas.geojson#PROV-KEY-003]、[data:geometry/public_space.geojson#PUBLIC-001]、[metric:key_area_count] |

**三区概念小方案（六要素展开，均为概念建议）**：

- **众智园 AI 自主创新加速区（192.1 ha）**：定位花园型全栈自主创新街区，响应公告 1.5(3)1）"抓好国家人工智能平台建设契机、打造国家级人工智能集聚区"定位，承载国家级人工智能集聚区功能（概念方向）；结构为"一脊两带三组团"——中央智脉绿廊北段为脊，科研带与生活带平行展开，训练测试、标准治理、低碳算力三组团围合门户广场；空间动作包括北缘五环绿带缓冲、门户广场接驳、科研院落与体育测试场留白衔接、建筑—绿地—水系一体化设计并展示清河文化；AI 场景为大模型训练测试、标准制定工作坊、安全治理展示与低碳算力体验（场景卡 06/10）；实施以 P1-P2 申报测试起步，依托更新项目 JZ-06 推进；风险集中于算力依赖与空域审批，回滚触发器见风险清单 R-01/R-04 [data:geometry/key_areas.geojson#PROV-KEY-001]。
- **北京 AI 原点社区（104.3 ha）**：定位近校型成果转化与人才社区；结构为"教育带缝合＋原点发布厅＋五道口商住带"；空间动作包括清华东路教育带缝合校区园区、原点发布厅、社区服务嵌入与开发者露天工位（场景卡 12）；AI 场景为开源社区、成果发布、人才特区服务与近校孵化；实施以 P3 公开运行与 P4 复盘常态化为目标，依托更新项目 JZ-03/JZ-04；风险集中于校园数据授权与成果转化窗口，回滚触发器见 R-02 [data:geometry/key_areas.geojson#PROV-KEY-002]。
- **大钟寺 AI 产业聚集区（72.0 ha）**：定位站城一体化智能经济街区；结构为"站前四象限步行圈＋知春路商业带＋数据要素楼"；数据要素楼概念下设"数字资产流通机制研究课题"（概念研究方向，不虚构制度结论）；站前广场与北缘留白地块开展绿地复合利用（概念）；联动周边高校（北邮等）科研更新资源（概念方向，不虚构合作安排）；空间动作包括大钟寺站前广场四象限步行连通、站城商业复合、钟韵文化展演（场景卡 04）与多模态导视测评（场景卡 08）；AI 场景为智能体与智能终端展示、内容消费、数据要素与国际路演；实施以站城一体更新项目 JZ-12 与全球 AI 活动周联动；风险集中于文保冲突与站城运营协调，回滚触发器见 R-03 [data:geometry/key_areas.geojson#PROV-KEY-003]。

三处重点区在 `geometry/key_areas.geojson` 中均以 `provisional_constraint` 呈现，正文、HTML、sources、assumptions 与 self_check 均说明其不可作为正式评分或审批依据。`compliance_matrix.json` 分别覆盖公告 1.5(3)1）2）3）三个重点区必答项。设计表达包含功能业态、概念建筑、公共空间系统、交通组织与实施项目；A3 文册与 A0 展板含重点片区总图、局部详图与指标说明，HTML 页面可切换查看三处重点区域。

**三重点区文本剖面（概念建议；把图面结构写成逐层可读的剖面规则，评审与公众无需打开图即可核验每一层做什么、谁在什么情况下进入）**：

- **众智园四带剖面（自北向南）**：① 公共观察带——沿五环绿带缓冲布置，访客在此看到测试对象、测试状态灯、责任主体与结论等级，不进入受控区即可核验；② 受控试验带——容纳大模型训练测试、标准制定工作坊与安全治理展示，按 P2 节拍预约开放，现场安全员与实体急停齐备；③ 人工接管带——保留人工复核工位、设备检修通道与数据隔离边界，任何 AI 结论须经人工等价路径复核后才对外展示（等价登记见场景卡 06/10）；④ 生态恢复带——建筑—绿地—水系一体化缓冲，承担测试退出后的场地恢复演示（P4 空间化）。
- **原点社区四层剖面（由公共到运营）**：① 街道层——五道口商住带与社区服务 0702 用地，日常使用为主，AI 仅提供导视与信息服务（P3 公开运行态）；② 发布层——原点发布厅（文化 0803），成果发布、开源路演与年度智脉奖在此发生，重要发布事项按 P3 异议门程序公开；③ 转化层——近校孵化空间与开发者露天工位，连接清华东路教育带，校内数据与成果使用以授权为准（R-02 回滚触发器）；④ 监护层——校区园区缝合界面，教育时段由校方监护安排，AI 设备在上下学高峰降级为人工导行。
- **大钟寺四段城市界面（绕站前广场一圈）**：① 到达段——四象限步行连通与多语导视，交通接驳与客流疏散优先，AI 导行站（场景卡 04/08）仅在无紧急情况时启用；② 服务段——知春路商业带与站城商业复合，常态商业运营，AI 仅做聚合数据展示；③ 体验段——钟韵文化展演与数据要素楼展示面，演示性 AI 体验按 P2 受控试点运行、不采集个人数据；④ 恢复段——北缘留白地块绿地复合利用，承担活动退出与场地恢复演示。

**空间双状态规则表（每个重点区/主要公共空间：日常模式做什么、受控测试模式做什么、测试结束后必须恢复什么——"测试不挤占日常"逐空间写死）**

| 空间 | 日常模式（默认） | 受控测试模式（须经 P2 预约与公示） | 测试结束后必须恢复的内容 |
| --- | --- | --- | --- |
| 众智园受控试验带 | 仅观察带开放，试验带保持空闲 | 预约制试验，状态灯脉冲闪烁公示，安全员在场 | 设施复位、数据隔离撤销、状态灯回稳定波形、观察带无残留 |
| 原点发布厅 | 常规文化活动与发布 | 成果发布/开源路演（P3 异议门程序） | 直播停止、敏感材料撤回、发布记录归档公开 |
| 大钟寺站前广场 | 全时步行与疏散 | 演示性 AI 体验（P2 试点，不采集个人数据） | 设备撤场、地面无痕迹、客流疏散路径恢复 |
| 中央智脉绿廊 | 日常游憩与通行 | 阶段性测评场景（按 JZ-01 节拍） | 绿廊种植与休憩设施原位恢复，评测设备入库 |

三区各配协议空间界面（申报台/测试沙盒/发布客厅/退役档案墙）把治理协议落到可指认的街道，详见第六章表 6-7。

![图 4 三重点区详细设计概念图（概念建议；数据来源：geometry/key_areas.geojson 与 geometry/public_space.geojson，provisional）](assets/figures/key-areas.png)

## AI 创新生态、人才画像与 AI+ 场景

本章的判断是：AI 场景体系的价值不在场景数量，而在每一项场景能否独立回答"谁来用、用什么数据、谁运营、停掉之后怎么办"四个问题。12 张场景卡按八要素结构与双线体系展开（agent.3），与 P1-P4 协议逐卡挂接（agent.6，核对见表 A2）。

方案建立面向 AI 人才和企业的空间需求画像，并形成"产业发展场景 + AI 赋能城市功能场景"双线场景体系。每个场景均说明空间载体、数据与人工边界、运营主体与退出条件，八要素结构（服务对象、空间载体、用户旅程、输入数据、AI 能力、基础设施、运营主体、失败降级）保证场景可定位、可运营、可治理 [source:AGENT-TASKBOOK]。

**8 类用户画像**：

| 用户画像 | 典型需求 | 空间响应 | 不能忽略的风险 | 自检边界 |
| --- | --- | --- | --- | --- |
| 初创工程师 | 低成本办公、算力入口、产品试验场 | 众智园共享测试场、端侧算力服务点、标准治理咨询 | 算力与数据服务依赖单一供应商 | 算力和数据服务需另行授权；保留公共测试场与标准入口防锁定 |
| 科研人员 | 跨机构协作、成果转化、学术交流 | 原点发布厅、科研院落、清华东路教育带 | 成果转化窗口期短、依赖一次性政策 | 校园数据和科研成果需授权；以常态院落交流支撑，不绑定单一政策 |
| 家庭周末客 | 亲子休闲、运动、文化体验 | 中央绿廊、口袋公园、体育测试场、钟韵文化体验 | 高峰人流承载与影像隐私顾虑 | 不采集个人行为轨迹，活动数据只做聚合统计；高峰分流 |
| 银发游客 | 无障碍导行、慢速休闲、文化讲解 | 无障碍 AI 导行站、智脉艺术铁轨休憩带 | 数字化门槛造成数字排斥 | 健康类数据不用于商业推荐；保留人工导览/电话预约等非 AI 替代通道 |
| 国际人才 | 工作签证、居住、办事、社交与家庭生活的一站式服务 | 多语种导视与信息屏、国际交往设施、全球 AI 活动周多语服务 | 翻译误差与制度差异导致误导 | 重要办事信息经双语人工复核；多语内容以官方发布为准 |
| 青少年儿童与亲子家庭 | 科普启蒙、安全游憩、亲子共学 | 博物馆化铁轨课堂（AI 科普节点）、适儿化口袋公园、体育测试场 | 未成年人数据保护 | 不采集未成年人个人信息数据；家长监护与学校组织随行 |
| 社区居民与商户 | 日常服务便利、营商收益分享、更新权益保障 | 五道口商住带、社区服务 0702 用地、南部更新带（JZ-08） | 更新与场景运营中的利益冲突 | 对 AI 场景拥有退出权与申诉权；更新安置/补偿视角在详细设计阶段复核 |
| 开发者社区运营者 | 活动组织、代码协作、社区声誉 | 开发者露天工位代码墙、发布广场、智盒会议亭 | 活动运营依赖补贴，补贴退坡即停摆 | 公共活动数据匿名聚合；按"立项—试办—评估—续办/退役"管理 |

**适儿化与全龄友好（概念建议）**：沿智脉艺术铁轨设置"博物馆化铁轨课堂"概念——以 AI 科普展示节点、亲子活动场地与青少年创客角构成儿童友好序列；公共空间组件库补充适儿化组件（低位导视、儿童洗手设施、看护座椅、安全照明），导视系统补充儿童友好图形符号；涉及未成年人的场景一律不采集个人信息数据，活动组织须家长监护或学校随行。

**12 张场景卡（概念建议）**：

| 场景卡 | 空间载体与设计说明 | 数据与人工边界 | 运营主体 | KPI 与退出条件 | 实施阶段/协议节拍 |
| --- | --- | --- | --- | --- | --- |
| 01 铁轨巡检AR孪生 | 中央绿廊铁轨段：AR 叠加百年影像与 AI 孪生巡检演示 | 仅聚合点位热度，不采集个人影像 | 轨道遗产管理方+区测试办 | AR 史实准确率≥98%；史实投诉未修复即下线 | P1 近期（JZ-01 绿廊试点） |
| 02 无人接驳巴士走廊 | 智脉大道沿线：园区—轨道站无人接驳示范线（概念）[scenario:ai-traffic-walkability] | 行程数据仅用于调度，留存期后匿名化 | 公交集团+区测试办 | 准点率≥85%；事故即停线转人工 | P1 近期（JZ-11 导行试点） |
| 03 AI 骑行教练站 | 绿廊绿道节点：骑行数据可视化与 AI 运动指导 | 骑行数据仅本人可见、可一键删除 | 属地街道+绿廊运营 | 设备故障 24h 内修复；隐私投诉即暂停 | P1 近期（JZ-01 同步） |
| 04 钟韵元宇宙 | 大钟寺站前：钟声文化数字孪生与互动展演 [scenario:ai-cultural-guide] | 不采集个人行为轨迹 | 大钟寺文化机构+属地 | 内容投诉响应≤48h；文保冲突即撤除 | P1 近期（JZ-12 站城联动） |
| 05 智盒会议亭 | 各研发街块节点：自助会议、直播与远程协作微型空间 | 音视频内容由使用者自持，平台不留存 | 园区运营平台 | 爽约率过高即调整容量；投诉即停用 | P2 中期（研发街块） |
| 06 无人机配送驿站 | 众智园南块：低空物流接驳试验驿站（概念）[scenario:robot-delivery-low-speed] | 不采集人脸；配送记录 30 天删除 | 配送企业+空域监管 | 安全隐患零容忍；空域审批未过不开通 | P2 中期（空域审批后） |
| 07 AI 园艺师口袋公园 | 各住区街角：植物养护 AI 协作与社区认养 | 仅记录植物养护与认养数据 | 社区居委会+街道 | 认养参与率≥30%；扰民投诉即调整 | P1 近期（社区先行） |
| 08 无障碍 AI 导行站 | 轨道站与绿廊节点：语音/触觉多模态无障碍导航 [scenario:ai-health-service-navigation] | 不保存个人轨迹，现场可核验 | 残联+运营方 | 人工替代率 100%；现场不符即停用 | P1 近期（轨道站节点） |
| 09 赛事数据可视化墙 | 体育测试场周边：智能体育赛事实时数据大屏 | 仅聚合展示，不识别个人 | 体育机构+赛事运营 | 数据口径标注时间；预警人工研判 | P2 中期（体育测试场） |
| 10 建筑能耗 AI 调控楼 | 众智园科研带：分布式能源与 AI 能耗调控示范（概念） | 能耗数据按楼栋聚合，不涉及户内 | 能源企业+园区物业 | 调控失误即时人工接管；连续失误停用 | P2 中期（JZ-09 示范） |
| 11 AI 咖啡机器人驿站 | 商业街与研发街角：机器臂咖啡体验与开发者社交 | 订单数据最小化，支付走标准渠道 | 商业运营方 | 机械故障即停；投诉响应≤24h | P2 中期（商业街） |
| 12 开发者露天工位代码墙 | 原点发布广场周边：开源贡献墙、露天工位与演示区 | 公开贡献数据匿名聚合 | 开源社区+属地运营 | 内容审核人工终审；争议即下架 | P1 近期（JZ-03 原点发布厅） |

**场景卡载体面积档 S/M/L（概念建议）**：12 张场景卡按空间载体量级分三档——**S 档≤500 m²**（节点/亭体级，可整体移装）、**M 档 500–5,000 m²**（街区/广场划设级，可恢复）、**L 档＞5,000 m²**（楼栋/片区级，退出后整区恢复）。面积档与"退出后空间处置"一一对应：面积越大，恢复义务越重（L 档全部以 P4 复盘与年度监测收口）：

| 场景卡 | 面积档 | 载体量级（概念） | 对应空间（可核验落点） |
| --- | --- | --- | --- |
| 01 铁轨巡检AR孪生 | S | 识别桩与导视屏沿线布点，单点 10–30 m² | 绿廊铁轨段沿线（[data:geometry/green_space.geojson#GREEN-001]） |
| 02 无人接驳巴士走廊 | L | 示范线走廊约 2 km 沿线设施带 | 智脉大道示范段（[data:geometry/roads.geojson#ROAD-008]） |
| 03 AI 骑行教练站 | S | 节点亭体 20–50 m²/站 | 绿廊绿道节点（[data:geometry/green_space.geojson#GREEN-003]） |
| 04 钟韵元宇宙 | M | 站前广场划设 500–2,000 m² | 大钟寺站前广场（[data:geometry/public_space.geojson#PUBLIC-001]） |
| 05 智盒会议亭 | S | 单亭 30–80 m² | 研发街块节点（[data:geometry/land_use.geojson#LU-001]） |
| 06 无人机配送驿站 | M | 起降点与驿站 800–3,000 m² | 众智园南块（[data:geometry/constraints.geojson#CONSTRAINTS-01] 周边） |
| 07 AI 园艺师口袋公园 | M | 街角公园 1,000–5,000 m² | 住区街角（[data:geometry/green_space.geojson#GREEN-002]） |
| 08 无障碍 AI 导行站 | S | 导行桩点 10–40 m²/站 | 轨道站与绿廊节点（[data:geometry/public_space.geojson#PUBLIC-001]） |
| 09 赛事数据可视化墙 | M | 屏幕与观众区 500–2,000 m² | 体育测试场周边（[data:geometry/constraints.geojson#CONSTRAINTS-01]） |
| 10 建筑能耗 AI 调控楼 | L | 示范楼栋 4.13 ha 楼群（整楼改造） | 众智园科研带（[data:geometry/buildings.geojson#BLDG-001]） |
| 11 AI 咖啡机器人驿站 | S | 机器臂铺位 30–80 m² | 商业街/研发街角（[data:geometry/land_use.geojson#LU-001]） |
| 12 开发者露天工位代码墙 | M | 广场划设 800–2,500 m² | 原点发布广场（[data:geometry/public_space.geojson#PUBLIC-003]） |

> 表注：面积档为概念分级（供可行性量级参考），非用地指标承诺；落点均可在对应几何图层定位核验（[metric:scenario_card_count] 12 张卡全覆盖）。正式详规与现状测绘发布后按 P4 程序复核并重新分档。

**表 C1 十二场景同任务人工等价路径（概念建议——"没有 AI 也能活"逐卡登记）**

每张场景卡放行前必须证明：拒绝使用 AI、不同意非必要数据授权或不携带智能设备的人，仍能完成同一项基本任务（与表 A3 检查点"人工等价"、命题证伪条件（2）同一来源，登记 12/12 [metric:same_task_equivalence_scenario_count]）。等价路径从各卡"数据与人工边界"列与"李奶奶的一天"非手机路径提取，无新增主张；现场实测不可用即降级回 P2 重测或直接退役：

| 场景卡 | 同任务人工等价路径（非 AI） | 放行前必须证明的内容 |
| --- | --- | --- |
| 01 铁轨巡检AR孪生 | 固定展签、人工讲解员排班 | 不扫码也能完成历史参观与解说 |
| 02 无人接驳巴士走廊 | 常规公交与园区接驳车时刻不变 | 停线后常规出行不受影响，事故即转人工 |
| 03 AI 骑行教练站 | 纸质骑行地图、人工教练指导 | 无设备也能获得路线与安全指引 |
| 04 钟韵元宇宙 | 站前展板、现场人工讲解 | 不扫码也能参与展演与获得文化信息 |
| 05 智盒会议亭 | 普通会议室、电话/线下会议 | 无智能亭仍可预约常规会议室 |
| 06 无人机配送驿站 | 人工快递驿站常规配送 | 空域审批未过时普通配送不受影响 |
| 07 AI 园艺师口袋公园 | 人工园艺指导、认养登记簿 | 认养与养护不依赖 AI 监测 |
| 08 无障碍 AI 导行站 | 人工引导台接续导航（人工替代率 100%） | 导行站故障时全程人工接续、无附加费用 |
| 09 赛事数据可视化墙 | 传统记分牌、人工播报 | 无大屏也能获知赛果与预警 |
| 10 建筑能耗 AI 调控楼 | 人工楼宇自控值班与巡检 | 连续失误停用后人工接管可维持能耗服务 |
| 11 AI 咖啡机器人驿站 | 人工咖啡台 | 无机器人铺位也能获得同等饮品服务 |
| 12 开发者露天工位代码墙 | 公告栏、人工运维与线下提交 | 无代码墙也能发布与协作 |

> 表注：等价路径与各场景卡"数据与人工边界"列一一对应，逐卡登记于 simulation.json 等价登记项；现场实测证明等价路径不可用时，对应场景降级回 P2 重测或直接退役（命题证伪条件（2），见第一章）。

**表 C2 场景增益—BEQUEST 红利—立即退场契约表（12 场景逐卡登记）**

场景卡"数据与人工边界"给出等价路径（表 C1），本表从预算与退场两个视角补全契约：AI 增益列取自场景卡"空间载体"的 AI 功能；BEQUEST 无 AI 公共红利列=退场后按四段退场合同 BEQUEST 段移交/保留、不依赖 AI 的公共资产；立即退场条件列=场景卡"KPI 与退出条件"的硬性触发：

| 场景 | AI 增益 | BEQUEST 无AI公共红利 | 立即退场条件 |
| --- | --- | --- | --- |
| 01 铁轨巡检AR孪生 | AR 叠加百年影像与 AI 孪生巡检演示 | 固定展签与人工讲解员排班继续 | 史实准确率<98% 或投诉未修复即下线 |
| 02 无人接驳巴士走廊 | 园区—轨道站无人接驳示范（概念） | 站台设施保留，线路移交常规公交运营 | 准点率<85% 或事故即停线转人工 |
| 03 AI 骑行教练站 | 骑行数据可视化与 AI 运动指导 | 基础骑行道与驿站休憩设施保留 | 设备故障超 24h 或隐私投诉即暂停 |
| 04 钟韵元宇宙 | 钟声文化数字孪生与互动展演 | 钟楼实体声景装置与广场活动保留 | 内容投诉响应超 48h 或文保冲突即撤除 |
| 05 智盒会议亭 | 自助会议/直播/远程协作智能空间 | 普通会议亭与开放工位保留 | 投诉即停用；爽约率过高调整容量 |
| 06 无人机配送驿站 | 低空物流接驳试验（概念） | 驿站主体保留为便民服务站 | 安全隐患零容忍；空域审批未过不开通 |
| 07 AI 园艺师口袋公园 | 植物养护 AI 协作与社区认养 | 人工园艺养护与认养公示牌保留 | 认养参与率<30% 或扰民投诉即调整 |
| 08 无障碍 AI 导行站 | 语音/触觉多模态无障碍导航 | 人工导览服务与无障碍设施保留 | 人工替代率<100% 或现场不符即停用 |
| 09 赛事数据可视化墙 | 赛事实时数据聚合大屏 | 赛事大屏普通播报保留 | 数据口径未标注或预警未经人工研判 |
| 10 建筑能耗 AI 调控楼 | 分布式能源与 AI 能耗调控示范（概念） | 常规节能管理规程保留 | 调控失误未即时人工接管；连续失误停用 |
| 11 AI 咖啡机器人驿站 | 机器臂咖啡体验与开发者社交 | 驿站人工咖啡服务保留 | 机械故障即停；投诉响应超 24h |
| 12 开发者露天工位代码墙 | 开源贡献墙与露天演示区 | 露天工位与作品展板保留 | 内容未经人工终审或争议未下架 |

> 表注：AI 增益与 BEQUEST 红利列均自场景卡"空间载体"与四段退场合同（BASE/BOOST/BLACKOUT/BEQUEST）提取，无新增主张；立即退场条件列与场景卡"KPI 与退出条件"逐字一致，逐卡登记于 simulation.json。

**表 C3 项目预算双轨与无 AI 接管表（12 项更新项目逐项登记）**

投入量级矩阵给出总额区间（[assumption:ASSUME-005] 管理），本表从预算视角补全"AI 停了怎么办"：每项按 AI 依赖度分档，AI 预算列直接引用表 A3 复算区间（12/12 逐项一致，不新增数字），无 AI 接管列引用表 C1 等价路径动作与既有预算口径：

| 项目 | AI 依赖度 | AI 预算（表 A3 复算区间） | 无 AI 预算接管（动作＋预算口径） |
| --- | --- | --- | --- |
| JZ-01 中央智脉绿廊贯通 | 叠加层 | 0.29–0.80 亿元 | 固定展签与人工讲解员排班继续（表 C1 场景 01）；绿廊基建预算不变，AR 功能层支出删除 |
| JZ-02 北五环跨环慢行节点 | 无 AI 依赖 | 0.48–1.50 亿元 | 跨环桥为纯基建，无 AI 接管动作；预算口径不变 |
| JZ-03 众智园门户广场与 AI 之光塔 | 叠加层 | 0.20–0.60 亿元 | 广场与光塔实体保留（BASE 段），AI 展演模块停用；基建预算不变 |
| JZ-04 原点发布厅与代码墙 | 叠加层 | 0.10–0.30 亿元 | 公告栏与线下提交继续（表 C1 场景 12）；改造预算不变，AI 摘要功能删除 |
| JZ-05 大钟寺站四象限步行连通 | 无 AI 依赖 | 0.10–0.30 亿元 | 地面连通为纯基建，无 AI 接管动作；预算口径不变 |
| JZ-06 智脉大道无人接驳示范段 | 核心功能 | 0.50–1.00 亿元 | 常规公交与园区接驳车时刻不变（表 C1 场景 02）；移交常规公交运营预算，车路协同建设不再续投 |
| JZ-07 清华东路教育带缝合 | 无 AI 依赖 | 0.20–0.50 亿元 | 慢行节点为纯基建，无 AI 接管动作；预算口径不变 |
| JZ-08 南部更新带提升 | 无 AI 依赖 | 0.80–2.00 亿元 | 前期评估与轻改造为纯基建，无 AI 接管动作；预算口径不变 |
| JZ-09 低空配送航线验证场 | 核心功能 | 0.30–0.60 亿元 | 空域审批未过时普通配送不受影响（表 C1 场景 06）；测试设施保留为便民站点，验证预算停止 |
| JZ-10 端侧算力与能耗调控示范楼 | 核心功能 | 0.50–1.20 亿元 | 人工楼宇自控值班与巡检（表 C1 场景 10）；智能化改造预算停止，常规运维预算保留 |
| JZ-11 无障碍 AI 导行系统 | 叠加层 | 0.10–0.30 亿元 | 人工引导台接续导航（表 C1 场景 08）；站点设施保留，AI 模块停用 |
| JZ-12 全球 AI 活动周公共路线 | 叠加层 | 0.05–0.15 亿元/年 | 常规公共活动组织不变（活动单价本身为常规口径）；AI 展演模块取消 |

> 表注：AI 预算列与表 A3 复算区间逐项一致（12/12，不新增数字）[metric:investment_item_count]；无 AI 接管动作逐项对应表 C1 等价路径与四段退场合同 BASE/BEQUEST 段；接管时点=对应场景立即退场条件触发或进入黑屏期（表 C2 立即退场条件列）；依赖度分档依据表 A3 单价区间性质与场景卡功能定位（三源资金通道见 [metric:funding_channel_count]），全部假设区间经 [assumption:ASSUME-005] 管理，官方投资计划发布后按 P4 复盘校准。

**表 C4 评审七维证据索引表（7 维逐维给评审指路）**

评审按七维打分（权重见本表），本表把每一维的证据链直接指给评审：回应锚点→响应章节→可打开证据文件，全部离线可核验（visual/assets/review-evidence-index.json 逐维登记，与表 A1 一页入口同口径）：

| 评审维度 | 权重 | 本方案回应锚点 | 响应章节 | 可打开证据文件 |
| --- | --- | --- | --- | --- |
| 任务书契合 | 20 | 三栏映射表（任务书原词→方案回应→可定位交付）；agent.1-6 逐条响应与场景卡/测试场/画像/地标/文化/社区活动一一对应 | 证据与评审响应总览；AI 创新生态、人才画像与 AI+ 场景 | proposal.md、agent.json、sources.json |
| 原创性 | 10 | 智脉四问可证伪命题与备选命题比选；脉冲协议 P1-P4 与状态灯语言（波形=运行/脉冲=测试/平线=停用）；表 A11 同场扫描 | 核心判断与公共验收契约；智脉脉冲协议 | proposal.md、design_depth_matrix.json、state-machine.json、implementation-gates.json |
| AI 规划创新 | 15 | 8 状态机（停摆演练/退场审计不可跳过）；四段退场红利合同 BASE→BOOST→BLACKOUT→BEQUEST（15 项全覆盖）；双闸门 G0-G7/C0-C7 与护照 11 字段 | 第六章（场景/脉冲协议） | state-machine.json、dividend-contracts.json、implementation-gates.json |
| 实施可行性 | 20 | 首期 100 天零依赖官方数据；100 米/100 天首发段与硬性日落不续期；指标 76 项（61 known）逐项带公式与来源；面积按官方口径复算并披露拟合偏差 | 更新实施章；指标体系章 | metrics.json、simulation.json、geometry/*.geojson |
| 公共利益包容 | 10 | 8 类用户画像与受影响公众角色；无障碍与非数字化服务（人工等价路径/盲道/公众委员会）；意见—回应台账逐条登记 | 场景卡章；公众委员会示范章程 | simulation.json、governance-raci.json、errata.json |
| 风险合规 | 10 | 法定要求 vs 自设标准分列；五类回滚触发器与五条硬停止条件；L1-L5 证据等级；provisional 一律披露不伪造 | 风险、版权与合规说明 | risk.json、standard_matrix.json、errata.json |
| 表达完整 | 15 | 双语 1:1（proposal/PDF/HTML/图件全部 zh+en 镜像）；评审首屏问题表（8 问→回答→可打开文件）；能说明/不能说明三栏表 | 全文；证据与评审响应总览 | proposal.md、proposal.en.md、report/*.html |

> 表注：7 维逐维登记于 visual/assets/review-evidence-index.json，权重与官方评审口径一致 [metric:review_evidence_dimension_count]；评审首屏问题表（评审最可能问的 8 问）见证据总览章。








**表 B5 要素保障接口"可占用可收回"（概念，要素不是名单而是接口——每个接口都有占用条件与收回条件）**：算力/数据/场景/资金/人才/空间/设备/品牌八类要素接口，收回条件与五类回滚触发器 R-01~05、四段退场合同（BASE→BOOST→BLACKOUT→BEQUEST）完全一致，任何收回都走协议节拍而不是单方决定 [metric:rollback_trigger_class_count]：

| 要素接口 | 提供什么 | 占用条件 | 收回条件 | 收回后去向 |
| --- | --- | --- | --- | --- |
| 算力 | 边缘算力站配额（端侧示范，JZ-09） | 通过数据边界检查 G4 | 连续越界或 R-01（安全）触发 | 配额返还公共池重新分配 |
| 数据 | 公共数据接口（最小化、不留存） | 隐私影响评估 PIA 通过 | R-02（隐私）触发 | 接口关闭，审计日志留存 |
| 场景 | 12 张场景卡空间落点（S/M/L） | 通过场景闸 C0–C7；同任务人工路径在场 | R-03（文保）触发 | 场景撤除，载体恢复原状 |
| 资金 | 三源资金通道（公益/准公益/经营） | 进入表 A3/M08 成本复算框架 | R-04（经济）触发 | 资金回拨，决算公开 |
| 人才 | 开发者社区权益（协创者名录） | 完成协创者登记 | 意见台账违规坐实 | 权益收回，处理记录公开 |
| 空间 | 载体面积档落位（S/M/L） | 通过证据门 E1–E4 | R-05（生态）触发或进入黑屏期 | 按四段退场合同处置 |
| 设备 | 可逆组件（活动电源/网络/传感面） | 轻量接口登记，可断开设计 | 占用超期或用途变更 | 拆除回收，不留痕迹 |
| 品牌 | 智脉标识使用权（Logo 方向） | 签署准入协议 | 名誉违约 | 撤销授权，公开公告 |

> 表注：接口规则是概念机制声明，不构成经营承诺；"可占用也可被收回"与回滚触发器、退场合同同一套节拍，接口不是给出去的名单。

| 场景卡 | AI 的有限作用（上限） | 退出后空间处置（退路） |
| --- | --- | --- |
| 01 铁轨巡检AR孪生 | 仅叠加公开史实影像，不识别个体、不生成修复建议 | 识别桩与屏幕可移除，绿廊恢复常规步道 |
| 02 无人接驳巴士走廊 | 仅调度与安全辅助，不替代驾驶员责任认定 | 路侧单元可拆除，线路转人工巴士或取消 |
| 03 AI 骑行教练站 | 仅个人骑行数据可视化，不评分不排名 | 节点设备移走，绿道恢复普通骑行设施 |
| 04 钟韵元宇宙 | 仅展演与导览，不生成文物修复方案 | 投影设备撤回，站前恢复常规公共活动 |
| 05 智盒会议亭 | 仅预约与会议辅助，内容由使用者自持 | 亭体可移装，地面恢复为通用广场 |
| 06 无人机配送驿站 | 仅配送调度，不采集人脸、不飞越人群密集区 | 起降点封闭，场地恢复绿地用途 |
| 07 AI 园艺师口袋公园 | 仅养护提示与认养记录，不替代人工修剪 | 传感器撤除，公园转为普通社区花园 |
| 08 无障碍 AI 导行站 | 仅多模态导航辅助，人工替代率 100% 兜底 | 导航桩可移除，保留人工引导台 |
| 09 赛事数据可视化墙 | 仅聚合展示，不做个人识别与预测 | 屏幕关闭，恢复普通广场活动 |
| 10 建筑能耗 AI 调控楼 | 仅楼栋级能耗调控，人工接管优先 | 调控系统停用，楼宇恢复常规能源管理 |
| 11 AI 咖啡机器人驿站 | 仅制作辅助，不收集偏好画像 | 机器臂撤场，恢复商业街普通铺位 |
| 12 开发者露天工位代码墙 | 仅统计公开贡献，内容人工终审 | 屏幕与工位拆除，恢复发布广场 |

这两列与 P4 平线档案墙直接对应：每一项服务都带着"上限"与"退路"进入公共空间，退役不是故障而是协议预设的正常路径——空间可恢复、生活可继续，这正是"平线"哲学的空间化表达。

**场景卡服务合同（概念建议）**：12 张场景卡按八要素结构（服务对象、空间载体、用户旅程、输入数据、AI 能力、基础设施、运营主体、失败降级）逐项展开，每卡显式声明**失败模式**、**人工复核**与**对应回滚触发器**——服务合同不是功能清单，而是"什么情况由人接管、什么情况停止服务"的判定条款，与智脉四问（P1-P4）逐卡挂接 [metric:scenario_card_count] [metric:rollback_trigger_class_count]：

| 场景卡 | 失败模式 | 人工复核 | 对应回滚触发器 |
| --- | --- | --- | --- |
| 01 铁轨巡检AR孪生 | 史实比对错误、识别失败 | 史实内容人工核验，投诉未修复即下线 | 文保类 |
| 02 无人接驳巴士走廊 | 事故、调度失效、越界 | 事故即转人工巴士，人工接管优先 | 安全类 |
| 03 AI 骑行教练站 | 设备故障、数据错误 | 设备故障 24h 内人工修复 | 隐私类 |
| 04 钟韵元宇宙 | 内容投诉、文保冲突 | 内容 48h 内人工响应 | 文保类 |
| 05 智盒会议亭 | 预约冲突、音视频故障 | 投诉即人工停用 | 经济类 |
| 06 无人机配送驿站 | 安全隐患、空域越界 | 空域审批未过不开通，隐患零容忍 | 安全类 |
| 07 AI 园艺师口袋公园 | 养护提示错误、扰民 | 认养与养护记录人工复核 | 生态类 |
| 08 无障碍 AI 导行站 | 路线不符现场条件 | 现场核验，人工替代率 100% 兜底 | 隐私类 |
| 09 赛事数据可视化墙 | 数据口径错误、预警误报 | 预警人工研判，口径人工标注 | 隐私类 |
| 10 建筑能耗 AI 调控楼 | 调控失误、能耗异常 | 调控即时人工接管 | 经济类 |
| 11 AI 咖啡机器人驿站 | 机械故障、支付异常 | 故障即停，投诉 24h 响应 | 生态类 |
| 12 开发者露天工位代码墙 | 内容争议、审核误判 | 内容人工终审 | 隐私类 |

**同任务等价（概念建议，回应公共包容维度）**：与「服务合同」配套的另一项验收规则是——**拒绝使用 AI、不同意非必要数据授权或没有智能设备的市民，仍能通过人工/低技术路径完成同一项基本任务**；若人工路径缺失、额外收费或长期不可用，对应 AI 服务不得继续开放。12 张场景卡逐卡登记人工/低技术路径与放行前须证明的内容（下表），无障碍 AI 导行站另以 100% 人工替代兜底（卡 08）；全部替代通道与费用豁免登记于 P4 复盘公开 [metric:same_task_equivalence_scenario_count] [metric:scenario_card_count]：

| 场景卡 | 同任务人工/低技术路径 | 放行前必须证明的内容 |
| --- | --- | --- |
| 01 铁轨巡检AR孪生 | 固定展签、人工讲解、纸质史实册 | 不用手机也能完成历史参观与史实查询 |
| 02 无人接驳巴士走廊 | 常规公交与轨道接驳照常运行 | 不乘坐接驳车仍能完成园区—轨道换乘 |
| 03 AI 骑行教练站 | 普通骑行设施与纸质骑行指引 | 不扫码也能获得骑行路线与安全信息 |
| 04 钟韵元宇宙 | 现场展演、人工导览、普通站前通行 | 不参加互动也能通行并获得文化信息 |
| 05 智盒会议亭 | 普通会议室、公用电话与前台人工预约 | 不预约智能亭也能完成会议与联络 |
| 06 无人机配送驿站 | 人工驿站与普通物流网点 | 不收无人机件也能完成同城寄收 |
| 07 AI 园艺师口袋公园 | 社区认养牌、人工园艺指导 | 不装应用也能参与认养与养护 |
| 08 无障碍 AI 导行站 | 人工引导台、可触读地图、人工带行 | 不用导航桩也能完成无障碍出行（100% 人工替代兜底） |
| 09 赛事数据可视化墙 | 现场解说、纸质成绩单、人工播报 | 不看屏幕也能获取赛事结果 |
| 10 建筑能耗 AI 调控楼 | 常规楼宇能源管理、物业人工巡检 | 不依赖 AI 调控楼宇仍保持正常供能 |
| 11 AI 咖啡机器人驿站 | 普通咖啡铺位与人工收银 | 不购买机器人饮品也有同价人工选项 |
| 12 开发者露天工位代码墙 | 纸质贡献登记、人工展示与社区活动 | 不注册数字账号也能提交贡献与参与活动 |

复核时比较任务是否完成、所需时间、费用、无障碍条件、信息准确性与申诉入口是否一致；任何一项不满足，AI 路径不得继续开放或须回到 P2 降级。

场景卡按八要素结构展开：**服务对象、空间载体、用户旅程、输入数据、AI 能力、基础设施、运营主体、失败降级**。以 01 铁轨巡检 AR 孪生为例：旅程为游客扫码→AR 叠加百年影像→点位热度聚合展示；输入数据为公开影像与巡检点位（无个人影像）；AI 能力为图像配准与史实比对；基础设施为沿线识别桩与导视屏；失败降级为识别失败即提示并转人工核验。跨类型的代表性场景卡展开如下（其余卡片在详细设计阶段按同一结构展开）：

- **卡 02 无人接驳巴士走廊（八要素展开）**：服务对象为园区通勤者与轨道换乘旅客；空间载体为智脉大道概念接驳线 [data:geometry/roads.geojson#ROAD-008]；用户旅程为预约→候车→乘车→换乘；输入数据为车辆状态与站点客流聚合数据（不采集个人轨迹）；AI 能力为路径规划、调度与安全监测；基础设施为路侧单元、信号优先与实体急停；运营主体为公交集团+区测试办；失败降级为事故即停线转人工巴士（对应安全类回滚触发器）。
- **卡 04 钟韵元宇宙（八要素展开）**：服务对象为文化游客与开发者社区；空间载体为大钟寺站前广场 [data:geometry/public_space.geojson#PUBLIC-001]；用户旅程为扫码→钟声互动→文化内容沉淀；输入数据为公开文保影像与内容素材；AI 能力为数字孪生、语音交互与内容生成；基础设施为站前投影与音效设备；运营主体为大钟寺文化机构+属地；失败降级为内容投诉 48h 内响应、文保冲突即撤除（对应文保类回滚触发器）。
- **卡 12 开发者露天工位代码墙（八要素展开）**：服务对象为开发者与开源社区；空间载体为原点发布广场周边 [data:geometry/public_space.geojson#PUBLIC-002]；用户旅程为注册→提交贡献→上墙展示→荣誉累积；输入数据为公开开源贡献数据（匿名聚合）；AI 能力为贡献统计、内容审核辅助与趋势展示；基础设施为露天工位、屏幕与供电；运营主体为开源社区+属地运营；失败降级为内容争议人工终审、争议即下架。

**场景可体验、可展示、可推广评估（概念建议）**（回应评审维度"是否形成可体验、可展示、可推广的 AI 城市场景"）：

| 场景卡 | 可体验性 | 可展示性 | 可推广性 |
| --- | --- | --- | --- |
| 01 铁轨巡检AR孪生 | 扫码即用，无需预约 | 公共绿廊现场演示 | 内容资产可复制至其他文化段落 |
| 02 无人接驳巴士走廊 | 车站接驳实乘体验 | 智脉大道沿线展示 | 接驳运营模式可复制至园区 |
| 03 AI骑行教练站 | 骑行途中即时指导 | 绿道节点数据可视化 | 设备标准化，可批量部署 |
| 04 钟韵元宇宙 | 站前互动展演 | 大屏+AR 双形态展示 | 钟韵 IP 内容可授权复用 |
| 05 智盒会议亭 | 自助扫码入亭使用 | 研发街区现场展示 | 模块化产品可复制 |
| 06 无人机配送驿站 | 试点片区预约体验 | 空域演示区展示 | 低空物流模式待试点验证 |
| 07 AI园艺师口袋公园 | 社区认养参与 | 住区街角展示 | 认养机制可复制至其他住区 |
| 08 无障碍AI导行站 | 语音/触觉多模态使用 | 轨道站与绿廊节点展示 | 无障碍服务规范可推广 |
| 09 赛事数据可视化墙 | 赛事现场观看 | 体育场周边大屏 | 赛事数据服务可复制 |
| 10 建筑能耗AI调控楼 | 楼内体验智能调控 | 能耗可视化展示 | 节能模式可推广至存量楼宇 |
| 11 AI咖啡机器人驿站 | 商业街即时消费 | 机器臂现场演示 | 商业运营模式可复制 |
| 12 开发者露天工位代码墙 | 开源贡献即时上墙 | 发布广场展示 | 开源活动模式可复制至园区 |

**受益、代价与盲区矩阵（概念建议，公开披露）**：为让评审与公众对场景的预期收益与已知代价同样知情，下表对 8 个关键场景及方案整体如实列示受益、代价与当前盲区——不回避负面：

| 场景/对象 | 主要受益 | 已知代价 | 当前盲区 | 验证方案与验证时点 |
| --- | --- | --- | --- | --- |
| 01 铁轨巡检AR孪生 | 百年记忆可视化、低门槛科普 | 沿线设备维护与内容版权管理 | 老旧机型 AR 兼容性未经实测 | P1 试点首月兼容性抽样测评（≥98% 史实准确率口径同步实测） |
| 02 无人接驳巴士走廊 | 通勤效率与轨道接驳衔接 | 路权协商、示范期运营补贴 | 极端高峰客流预案待交通仿真验证 | P2 前完成高峰客流仿真，仿真输入与结论公开 |
| 04 钟韵元宇宙 | 文化活化、夜间经济带动 | 文保红线内展示约束、内容监管 | 史实内容长期校准机制待细化 | P3 发布前建立史实校准台账并公开首月校准记录 |
| 05 智盒会议亭 | 远程协作、灵活办公支持 | 公共空间占用、噪音控制 | 音视频外溢隐私边界待 PIA 细化 | P2 试点前完成 PIA 并公开结论 |
| 06 无人机配送驿站 | 低空物流示范、末端配送补充 | 空域协调成本、噪声敏感段避让 | 极端天气下的可用性未验证 | 空域审批通过后开展一个完整季度天气窗口实测 |
| 08 无障碍AI导行站 | 无障碍服务实质升级 | 设备依赖与现场运维响应 | 多方言语音识别误判率待测评 | P1 试点以 100% 人工替代兜底同步测评误判率，结果公开 |
| 10 建筑能耗AI调控楼 | 能耗下降与改造示范 | 楼宇改造投入、户内数据边界 | 能耗调控与行为联动扰动待验证 | P2 示范运行一季后发布能耗对比报告 |
| 12 开发者露天工位代码墙 | 开源生态、人才招引 | 内容审核人工成本 | 露天设备的防尘防晒损耗预估 | P1 试点满一年发布设备损耗与运维成本报告 |
| 方案整体 | 可复核、可替换边界重算 | 官方边界发布后需重算部分指标 | 产业目录/投资口径为概念假设（见 [assumption:ASSUME-005]、[assumption:ASSUME-006]），交通极端情景无实测流量支撑 | 官方现状调查与产业数据发布后 30 天内完成重算并公开 diff（P4 程序）；交通极端情景纳入 P2 仿真清单 |

**3 个产业测试验证场景（概念建议）**：每个场景均在 `geometry/public_space.geojson` 落位测试节点，按智脉脉冲协议 P2 受控测试运行：

| 测试场景 | 位置与范围 | 测试内容 | 数据与安全边界 | KPI 与退出条件 |
| --- | --- | --- | --- | --- |
| 车路协同开放测试段 | 智脉大道概念段 1.2 km [data:geometry/public_space.geojson#PUBLIC-013] | 车路协同与无人接驳（场景卡 02）[scenario:ai-traffic-walkability] | 车辆状态与路况数据仅用于测试；事故即停转人工 | 累计测试无重大事故；重大事故即停测 |
| 低空配送航线验证 | 众智园—大钟寺概念航线 [data:geometry/public_space.geojson#PUBLIC-014] | 无人机配送（场景卡 06）[scenario:robot-delivery-low-speed] | 遵守空域与安全法规；不采集人脸 | 空域审批未过不开通；安全隐患零容忍 |
| 多模态导视测评场 | 绿廊中段节点 [data:geometry/public_space.geojson#PUBLIC-015] | 无障碍导行多模态测评（场景卡 08） | 不保存个人轨迹，现场可核验 | 现场核验不符即停用 |

**场景技术依据（概念建议）**：场景卡与测试场景的 AI 落地路径挂接公开技术标准、法规与试点，技术路径可复核 [standard:UNMANNED-AIRCRAFT-REGULATIONS] [standard:ICV-ROAD-TEST-REGULATIONS] [standard:BARRIER-FREE-DESIGN-CODE]；低空配送与车路云试点分别挂接北京市无人机管理规章与车路云一体化试点条件 [standard:BEIJING-UAS-MEASURES] [standard:V2X-CLOUD-INTEGRATION-PILOT]：

| 场景/测试 | 参考依据（公开） | 对方案表达的约束 |
| --- | --- | --- |
| 卡 02 无人接驳巴士走廊 + 车路协同开放测试段 | 《智能网联汽车道路测试与示范应用管理规范（试行）》（2021）；北京高级别自动驾驶示范区（亦庄）公开实践 | 路测备案为 JZ-06 放行门；车辆状态与路况数据仅用于测试 |
| 车路云一体化测试段 | 工信部等五部门"车路云一体化"应用试点（2024，试点条件以主管部门发布为准） | 测试段按试点条件申报，不自行扩大测试边界 |
| 卡 06 无人机配送驿站 + 低空配送航线验证 | 《无人驾驶航空器飞行管理暂行条例》（2024-01-01 施行）；《北京市无人驾驶航空器管理规定》（北京市人大常委会公告〔十六届〕第 50 号，2026-05-01 施行；北京全域为管制空域） | 空域审批为 JZ-09 放行门；不采集人脸；安全隐患零容忍 |
| 卡 08 无障碍 AI 导行站 + 多模态导视测评场 | 《无障碍环境建设法》；《无障碍设计规范》GB 50763-2012 | 导行设施按 GB 50763 复核为 JZ-11 放行证据；人工替代率 100% |
| 卡 01/04/12 内容类场景 | 《生成式人工智能服务管理暂行办法》（2023-08-15 施行） | 内容人工终审；投诉响应时限（48h/24h）；生成内容标识 |

**条款级适用范围限定（概念建议）**：上述法规引用精确到条款并声明适用边界，避免把法律义务扩写——① **生成式 AI 办法**仅适用于其**第二条**界定的"境内面向公众提供生成式 AI 服务"，本方案内容类场景（卡 01/04/12）以该范围为限执行标识与终审要求；方案不把**第十四条**的投诉处理时限扩写为一般退出权，也不虚构投诉时限；② **无障碍环境建设法第三十九条**的"提供人工服务"要求仅适用于该条列明的公共服务场所，本方案不将其扩写为所有公共空间的法定义务，无障碍 AI 导行站的人工替代率 100% 是本方案自设的更高承诺（属自设协议而非法定结论）；③ **适老政策（2020–2022 阶段目标）**时间窗口已过，本方案只借用"传统服务与智能服务并行"的设计原则，不把它写成 2026 年的本地实施事实；④ **《无人驾驶航空器飞行管理暂行条例》**（2024-01-01 施行）与**《北京市无人驾驶航空器管理规定》**（北京市人大常委会公告〔十六届〕第 50 号，2026-05-01 施行；北京全域为管制空域，室外飞行均须申请）的空域审批要求为放行门而非方案自设目标，审批未过不开通——低空配送仅在其获批航线内运行。

**公告"自选区域范围场景设计（可选项）"五域覆盖（概念建议）**：公告自选场景设计范围所列 AI+信软/医疗/教育/法律/生活服务五域，本方案概念映射如下：AI+软件与信息服务（卡 05 智盒会议亭、卡 12 代码墙）、AI+医疗健康（健康服务类信息提示节点、卡 08 无障碍导行）、AI+教育（博物馆化铁轨课堂 AI 科普节点）、AI+法律服务（企业服务智能体合规咨询点概念，融入卡 05 场景）、AI+生活服务（卡 11 咖啡机器人、卡 03 骑行教练、卡 07 园艺师）。自选场景为公告可选项，本方案按必答项优先级表达，不另行扩大设计范围。

**公共安全类 AI 应用仅做运营评审研究，不替代人工复核** [scenario:public-safety-operations-review]。**健康服务类应用**（挂号陪诊提示、急救点位导引、慢病管理信息提示等）仅做信息提示，不做出医疗决策，数据不落盘 [scenario:ai-health-service-navigation] [data:geometry/public_space.geojson#PUBLIC-016]。

**3 个 AI 朝圣地标（概念建议）**：**AI 原点之钟**（大钟寺站前广场，钟韵文化与 AI 起源意象）、**AI 之光塔**（众智园门户广场，光艺术 + 模型推理实时可视）、**智脉艺术铁轨**（中央绿廊北段，废弃铁轨艺术化改造 + 数字投影）。朝圣路线"**百年轨道，智慧脉动**"与年度活动体系中的"全球 AI 活动周公共路线"（更新项目 JZ-12）联动 [data:geometry/public_space.geojson#PUBLIC-001] [data:geometry/green_space.geojson#GREEN-001]。相关公共空间与绿地指标在 `metrics.json` 中均为 known 状态、可直接复算 [metric:public_space_ratio] [metric:green_ratio]。

**荣誉展示体系（概念建议）**：开发者贡献墙（场景卡 12 代码墙）、协创者名录屏与年度智脉奖构成递进式荣誉阶梯，与脉冲协议 P4 复盘公开联动；荣誉数据仅聚合公开贡献，不做个人评分。

**年度活动体系与社区运营（概念建议）**：构建"一季一主题"的年度节奏——**开发者大会**（开源与标准治理、贡献墙发布）、**场景开放日**（场景卡受控测试向公众开放，联动 P2 测试节拍）、**全球 AI 活动周**（朝圣路线与多语种国际路演，联动更新项目 JZ-12）、**年度智脉奖与复盘年会**（联动 P4 复盘与荣誉阶梯）。社区运营按"立项—试办—评估—续办/退役"管理全部活动，公共活动数据匿名聚合、留存到期即删；招引转化路径为"场景露出→测试签约→入驻孵化→政策兑付"，与五道口商住带、原点发布厅及留白弹性用地衔接 [source:AGENT-TASKBOOK] [depth:renewal_project_list] [data:geometry/land_use.geojson#LU-001]。

**招引转化漏斗（概念建议，量化目标为概念区间待复核）**：转化机制可评估、可复盘 [source:AGENT-TASKBOOK]：

| 阶段 | 动作 | 量化目标（概念区间） | 责任方 |
| --- | --- | --- | --- |
| 场景露出 | 场景开放日/全球 AI 活动周场景体验 | 年场景体验 12–20 万人次 | 联合运营机构 |
| 测试签约 | 测试场景意向协议 | 年签约 30–60 项 | 区测试办+产业服务翼 |
| 入驻孵化 | 原点社区/众智园入驻孵化 | 年孵化入驻 40–80 家 | 产业服务翼+园区平台 |
| 政策兑付 | 人才/算力/数据要素政策落地 | 年兑付 20–40 项 | 政策窗口+三源资金 |

**活动品牌 IP 衍生规则（概念建议）**：年度活动体系沉淀"智脉"品牌 IP——① 品牌元素（Logo、口号、状态灯语言）使用须清权并报官方审批；② 活动 IP 衍生（周边、数字内容）收益按"场景收益"渠道记账并反哺公益服务；③ IP 授权不包含任何政府背书表述。

**3 个地标运营卡（概念建议）**：朝圣地标配套运营模式、活动联动与收益退出边界 [source:AGENT-TASKBOOK]：

| 地标 | 运营模式 | 年度活动联动 | 收益与退出 |
| --- | --- | --- | --- |
| AI 原点之钟 | 大钟寺文化机构+属地联合运营 | 钟韵展演、全球 AI 活动周 | 场景收益+内容授权；文保冲突即撤除 |
| AI 之光塔 | 园区平台运营 | 发布仪式、灯光艺术季 | 广告清权收益；能耗过高即降级 |
| 智脉艺术铁轨 | 绿廊运营+艺术家驻留 | 铁轨课堂、艺术投影季 | 公益基金+内容共创；低干预原则 |

**国际传播文案（概念建议，供评审与传播团队深化）**：

- **30 秒开场白（pitch）**：A century of iron rail becomes the digital pulse of AI — the AI Pulse Belt turns Beijing's first railway into a living laboratory where 12 public AI services declare, test, release, and review their own operation; three cores, two wings, one green spine; a century of tracks, a pulse of intelligence. 中文：百年铁轨化为 AI 数字智脉——智脉一带把中国第一条自主铁路变成一座可运行的公共 AI 实验室：12 项公共服务按申报、测试、发布、复盘四拍自证运行；三核两翼、一带绿脊；百年轨道，智慧脉动。
- **口号英译**：百年轨道，智慧脉动 = "A Century of Tracks, a Pulse of Intelligence"（备选 "One Pulse Belt" 用于短媒体）。
- **社交媒体模板 ×3**：① 发布贴——"The railway that built China's industrial age now runs on pulses of intelligence. #AIPulseBelt"；② 活动贴——"Scenario Open Day: 12 AI services, 4 protocol beats, 0 personal data. Try the pulse. #BeijingJingZhang"；③ 招募贴——"We're co-creating a barrier-free AI city with disabled, elder, and youth communities. Join the committee. #AccessibleAI"。
- **受众分层表**：

| 受众 | 渠道与载体 | 信息要点 |
| --- | --- | --- |
| 国际开发者 | GitHub、技术媒体 | 开源协作、代码墙、脉冲协议 |
| 国际规划机构 | A3 文册、A0 展板、双语提案 | 三层范围、分期实施、指标复算 |
| 海外游客 | 多语种导视与 AR 场景 | 百年铁路、AI 朝圣路线 |
| 学术界与媒体 | 学术会议、专题文章 | 数据最小化、失败公开、治理机制 |

文案仅作为概念素材，实际发布须经官方批准与版权清权 [source:AGENT-TASKBOOK]。

AI 治理建议遵守数据最小化、公开来源、可解释与人工复核原则 [standard:GENERATIVE-AI-INTERIM-MEASURES]：城市智能体可辅助识别慢行断点、公共空间热力、设施维护、企业服务需求与活动安全风险，但不替代规划审批、不输出未经授权的个人画像、不声称获得官方实施承诺。所有场景节点均进入结构化图层或合规矩阵。

**公共利益与包容性设计（概念建议）**：以无障碍、适老与数字化平权为底线 [standard:BARRIER-FREE-ENVIRONMENT-LAW] [standard:ELDERLY-SMART-TECH-PLAN-2020-45]——非 AI 替代通道（人工导览、电话预约、线下人工服务）始终保留；涉及公共利益与个人数据的应用进行隐私影响评估（PIA）；运营与开发主体的利益冲突通过协议披露与公众委员会申诉机制处理；弱势群体使用需求按下列清单在详细设计阶段逐项复核并落图。公共利益判定另设两条先导问题：**「节省的时间由谁支付」**——AI 服务产生的效率红利必须有明确受益人与披露机制，因自动化节省的人力成本须披露再就业安排，不得转嫁为其他群体的排队、费用或照料负担；**「非参与者优先」**——不使用 AI 服务（不扫码、不注册、不携带终端）的市民拥有同等的空间使用权与优先级，所有场景必须保留不依赖任何终端即可完成的等价路径，非参与者不因拒绝 AI 而失去任何一项公共功能。以人为中心的参与方法（线下、电话与在线证据同等，无智能手机也能参与）对标联合国人居署《以人为中心智慧城市战略分步指南》（背景比较，不构成法定程序依据）[source:UNHABITAT-PEOPLE-CENTRED-2025]。

| 群体 | 待复核事项 | 方案预备动作 |
| --- | --- | --- |
| 夜间工作者 | 夜间照明、夜间配送时段与噪声管控、夜市运营时段 | 公共空间组件库增设夜间照明与噪声监测组件（概念） |
| 低收入群体 | 免费/普惠通道、公共 Wi-Fi 与基础信息服务覆盖 | 卡 05/11 设普惠时段；三源资金预留公益额度 |
| 非数字用户 | 人工窗口分布、电话预约、纸质信息可达性 | 非 AI 替代通道分布表在详细设计阶段落图 |
| 未成年人 | 适儿化设施与数据保护 | 不采集未成年人数据；适儿化组件见公共空间组件库 |
| 后台运维者 | 监控倒班与夜班值守的职业健康、轮休与交接班空间 | 运维岗亭与轮班制度写入运营合同并公开 |
| 无薪照护者 | 照护者与受护者同行时的等候、休憩与无障碍接力需求 | 无障碍导行支持双人同行模式，站点配置陪护休憩位 |

**公共底线量化表（概念建议）**：下列底线指标全部进入 P1 申报要件核验，未达标不进入下一节拍：

| 底线指标 | 量化要求（概念） | 校验方式 | 可审计证据形态 |
| --- | --- | --- | --- |
| 非 AI 替代通道保留率 | 100%（人工导览、电话预约、线下人工服务） | 每场景 P1 申报核验 | 申报核验记录（simulation.json 逐项登记） |
| 人工替代率（无障碍导行） | 100%（现场不符即停用） | 场景卡 08 P2 独立复测 | 独立复测报告（P4 复盘公开） |
| 弱势群体代表席位 | ≥1/3（公众委员会） | 委员会构成公示 | 委员会名录（公示记录） |
| 普惠时段覆盖 | 场景卡 05/11 每日设普惠时段 | 运营台账公开 | 运营台账季度摘要（公开） |
| 数据最小化 | 不采集敏感信息；留存期上限 30 天（快递记录） | PIA 评估记录 | PIA 记录（风险台账登记） |

底线指标与四拍协议构成"准入—运行—退出"的完整证据链：每一项指标都有指定校验动作与公开证据形态，评审与公众可沿表逐项复核，而非依赖方案自述。这五条是全场景通行的门槛，不是个别卡片的装饰性承诺。

**三条红线不是本方案的善意，是现行法规的义务**：本方案此前把「人工等价路径」「任一违规即停用」「申诉须有数字时限」写成自己的设计判断。逐条核读现行法规全文后必须修正这个弱化：**这三条在现行法里已经是义务**——写成设计偏好反而降低了它们的效力。以下依据由本方案作者逐一读取官方全文核实，条号与要义如实引述，不复制全文：

| 本方案的规则 | 法定依据（已核实） | 效力变化 |
| --- | --- | --- |
| 每项服务必须存在**无 AI 等价路径**（人工等价路径缺失不得上线） | 《中华人民共和国无障碍环境建设法》**第三十九条**：公共服务场所涉及医疗健康、社会保障、金融业务、生活缴费等服务事项的，应当**保留现场指导、人工办理等传统服务方式** [standard:BARRIER-FREE-ENVIRONMENT-LAW] | 从「设计者的善意」变为**法定义务**——公共服务不得只剩 AI 一条路 |
| 发现问题**即停止生成与传输**，不得先观察（五类回滚触发器停机阀） | 《生成式人工智能服务管理暂行办法》**第十四条**：提供者发现违法内容的，应当及时采取**停止生成、停止传输、消除**等处置措施，并向有关主管部门报告 [standard:GENERATIVE-AI-INTERIM-MEASURES] | 从「本方案的停用规则」变为**提供者义务** |
| 异议与申诉必须给出**数字时限**，否则不可执行（三道异议门） | 同办法**第十五条**：提供者应当建立健全投诉、举报机制，设置便捷的投诉、举报入口，**公布处理流程和反馈时限**，及时受理、处理并反馈 | 从「本方案的主张」变为**已有要求的落实** |
| 画像 P4 的**非智能手机路径**不可豁免 | 《关于切实解决老年人运用智能技术困难实施方案》（国办发〔2020〕45号）：在各类日常生活场景中，**必须保留老年人熟悉的传统服务方式**，并列出出行、就医、消费、文娱、办事五类高频事项 [standard:ELDERLY-SMART-TECH-PLAN-2020-45] | 从「本方案的画像约束」变为**政策依据 + 可对照场景清单** |

**同时要说准边界**：本方案不是法律意见，条款要义引述可能不完整，具体适用须由具备资质的专业人员判断；本方案只主张上述四条红线**有法可依**，不主张自己对法条的理解具有权威性。四条红线进入 P1 申报要件与公共底线量化表核验，不可通过运营调整豁免。

**公众委员会构成（概念建议）**：公众委员会由居民、商户、残疾人代表、老年人代表、未成年人监护人、专家学者与运营方代表构成，弱势群体代表席位不少于三分之一；委员会对活动与场景行使知情、建议与申诉权，P1 申报与 P4 复盘节点须召开听证。

**公众委员会示范章程要点（概念建议，供运营主体直接进入深化）**：为使"委员会"从承诺变为可启动的机制，给出章程启动模板——委员产生、任期、议事、申诉与记录公开五要素逐项落地，任何一项在正式成立前均为概念草案，不构成已成立组织的权利或义务：

| 章程要素 | 示范条款（概念） | 可核验的启动证据 |
| --- | --- | --- |
| 委员产生 | 居民、商户、残疾人、老年人、未成年人监护人、专家学者与运营方七类席位；弱势群体席位≥1/3；招募公告公开 30 天，随机抽选与推荐结合 | 招募公告存档与公开渠道发布记录 |
| 任期与更替 | 每届 2 年，每年更替≤1/3；缺位按同类补选，任期内无正当理由不得罢免 | 席位名录与更替记录（公示） |
| 议事规则 | 每季度例会；P1 申报与 P4 复盘节点须召开听证；决议需列席 2/3 以上通过；运营方陈述与委员质询书面留痕 | 会议纪要公开（匿名化后） |
| 申诉通道 | 任何使用者可就服务内容、数据使用与退出处置提出申诉；7 日内受理、30 日内书面答复；委员会终审 | 申诉台账（编号、受理、答复、终审） |
| 记录公开 | 会议纪要、听证结论与申诉处理结果在年度 P4 复盘公开，涉及个人隐私的部分匿名化处理 | 年度复盘公开记录 |

章程草案与三条红线（法定义务）、公众委员会听证（P1 申报要件）和 P4 复盘程序衔接：委员会不替代法定审批或运营主体责任，其决议是程序性公共记录，不构成行政许可或政府背书。

**一个人的一天（空间叙事）**：抽象清单之外，方案用两个具体人物的完整一天验证"公共利益不靠承诺靠路径"——叙事中的每一步都可以在正文、图纸、图层与指标中找到对应锚点，读者可沿锚点逐项核验，而非当作文学描写：

**李奶奶的一天（银发游客，全程可不用手机）**：早 9:00 清华园站下车，站内人工引导台取纸版《一日慢行图》（非 AI 替代通道，卡 08 同任务等价登记）；沿智脉艺术铁轨休憩带缓行，AR 识别桩旁配固定展签与人工讲解员排班（卡 01 等价路径）；11:30 钟韵元宇宙展演前，不扫码也能坐下听现场讲解、看普通站前展板（卡 04 等价路径）；午后绿廊长椅午休，垃圾驿站为人工维护（卡 07 认养模式含人工园艺指导）；16:00 返回轨道站，无障碍 AI 导行站故障时由人工引导台接续导航，全程耗时与费用不做任何附加（P2 独立复测承诺）。全程没有一步需要注册、扫码或携带终端。

**小陈的一天（开发者社区运营者）**：早 9:30 原点发布广场申报台提交新场景 P1 申报书（申报五要素公开核验，卡 12 同任务等价：纸质登记同样受理）；11:00 智盒会议亭与远程团队会议，音视频内容由团队自持（卡 05 平台不留存）；14:00 众智园共享测试场跑通端侧推理 demo，算力服务注明另行授权边界（用户画像·初创工程师行）；16:30 与街道碰头确认下月场景开放日活动清单，活动经费按"立项—试办—评估—续办/退役"管理（用户画像·开发者社区运营者行）；18:00 与李奶奶在同一座广场错峰相遇——两者共享同一空间、各自保有等价路径，这正是"非参与者优先"的空间落点。

**公共利益与包容性：评审导航**：第六章（本章）集中承载公共利益主张，正文另有三处支撑——智脉四问执行摘要（核心判断与公共验收契约章）、七维自评表（证据与评审响应总览章·公共利益与包容行）、公共底线量化表与公众委员会（本章上文）。评审沿下列聚合表可在三处之间快速跳转，无需全文搜索：

| 公共利益子项 | 主张位置 | 量化/证据形态 | 合规锚点 |
| --- | --- | --- | --- |
| 非 AI 替代通道 | 本章同任务等价表（逐卡登记）+ 三条红线表 | 12 项逐卡登记（metrics: same_task_equivalence_scenario_count=12） | 无障碍环境建设法第39条 |
| 无障碍兜底 | 本章卡 08 + 公共底线量化表 | 人工替代率 100%（P2 独立复测） | GB 50763-2012 复核 |
| 即停与申诉时限 | 本章三条红线表 + 统一回滚触发器 | 五类触发器停机阀 + 三道异议门（时限进入复测项） | 生成式AI暂行办法第14/15条 |
| 非智能手机路径 | 本章李奶奶的一天 + 画像"非数字用户"行 | 全程无注册/扫码/终端（等价登记 12 张卡） | 国办发〔2020〕45号 |
| 弱势群体话语权 | 本章公众委员会构成 | 席位 ≥1/3（公示记录） | 公众委员会听证章程（概念） |
| 普惠时段与费用豁免 | 本章底线量化表 + 三源资金公益额度（更新项目清单章·资金来源表） | 卡 05/11 每日普惠时段（台账摘要公开） | 运营合同（概念） |
| 数据最小化 | 本章场景卡逐卡 + 风险章监控节拍 | 留存期上限 30 天（PIA 记录） | 个人信息保护法 |
| 儿童友好 | 本章适儿化段落 + 公共空间组件库 | 不采集未成年人数据（组件清单复核） | 未成年人保护法 |
| 低收与无薪照护者 | 本章待复核清单（夜间工作者/低收/照护者） | 详细设计阶段逐项落图（P1 申报要件） | PIA + 公众委员会 |

### 智脉脉冲协议（运行机制）

方案为每一项进入公共空间的 AI 服务设定"四拍回路"运行机制，与"智脉"命名同构：服务像脉冲一样拥有明确的申报、测试、发布与复盘节拍，任何服务不能无限期停留在"试点"状态，也不能未经测试直接发布 [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK] [depth:renewal_project_list]。与一般"管理流程"不同，四拍不是流程图而是城市基础设施——每拍都有空间界面（市民能看到协议在运行）、通过证据（无证据不得进入下一拍）与未通过处置（含场地恢复）：

| 节拍 | 动作 | 空间界面 | 通过证据 | 未通过处置 |
| --- | --- | --- | --- | --- |
| P1 申报 | 声明服务目的、数据上限、责任主体、人工等价路径与结束条件 | 原点发布厅申报台：申报书公开可查、公众委员会听证 [data:geometry/public_space.geojson#PUBLIC-002] | 申报五要素逐项核验记录（登记于 simulation.json） | 退回补充材料，不进入测试 |
| P2 测试 | 受控试点：预约、分区、现场安全员、实体急停、独立复测 | 众智园测试沙盒与小月河翼受控测试节点（场景开放日公开）[data:geometry/public_space.geojson#PUBLIC-003] | 独立复测记录、回滚触发器巡检台账（五类） | 修正后重测或退出，触发回滚即停机 |
| P3 发布 | 公开运行，导视状态灯可视化：稳定波形=正常运行、脉冲闪烁=测试中、平线=已停用 | 导视状态灯节点（波形状态灯语言，全带可读） | 三道异议门无异议、五项底线指标达标（底线指标表见第六章） | 降级回 P2；运行边界失效即停止服务并恢复场地 |
| P4 复盘 | 数据回检、公众反馈与失败记录公开，决定继续、调整或退役 | 平线档案墙：退役服务公开陈列（服务名、周期、复盘结论、失败记录匿名化）[data:geometry/green_space.geojson#GREEN-001] | 复盘报告公开、数据删除确认 | 退役并完成数据与场地恢复 |

**统一回滚触发器（五类）**：任一 AI 服务出现下列情形即按协议降级或停用——**安全类**（实体或线上安全事件，事故即停）、**隐私类**（数据越界或投诉成立）、**文保类**（与文物风貌冲突即撤除）、**经济类**（运营不可持续且无替代资金来源）、**生态类**（扰民、噪声或公共空间占用争议）。触发器清单与各场景卡退出条件一一对应，纳入 P4 复盘公开记录。

**智脉服务护照（11 项必填，概念建议）**：每项服务进入 P1 申报之前，先登记一份「智脉服务护照」——它不记录无关个人信息，只保存推动公共决策所需的十一项内容，缺项即退回、不进入下一环节。护照把四问从原则翻译成可判定字段，P1 申报书即护照的公开版本；公开登记模式对标英国算法透明记录标准 v2.1 与荷兰政府算法登记册的披露结构（背景比较，不构成合规依据）[source:UK-ATRS-2.1] [source:AMSTERDAM-ALGORITHM-REGISTER]：

| 必填字段 | 需要回答的问题 | 缺失时的处理 |
| --- | --- | --- |
| 服务与地点 | 服务做什么、在哪类公共空间发生 | 不进入场景匹配 |
| 服务对象 | 谁使用、谁承担风险 | 不进入共创 |
| 非 AI 基线 | 目前怎样完成同一任务 | 不得声称 AI 带来改善 |
| 数据上限 | 最多需要哪些数据、留存多久 | 未声明数据不得采集 |
| 责任主体 | 谁受理、复核、接管和恢复 | 不进入测试 |
| 运营主体 | 谁长期运营、运营期限与续办条件 | 不进入发布 |
| 人工等价路径 | 不用 AI 怎样完成同一基本任务 | 缺失时不得上线 |
| 成功证据 | 什么结果支持继续 | 不得扩大范围 |
| 失败信号 | 什么情况说明无效或有害 | 立即进入复核 |
| 申诉与暂停 | 谁能提出异议、谁能停用 | 不得向公众开放 |
| 退役与恢复 | 何时结束、谁恢复场地和数据 | 不得启动 |

护照字段数、各字段核验记录与缺失处理全部登记于 `simulation.json`，评审可按行复核 [metric:service_passport_required_field_count]。

**运营证据门 E0-E4（概念建议）**：护照解决"能不能进入"，证据门解决"能不能前进"。任何服务沿五道门推进，日历可以安排工作顺序，不能代替任何一道门：

| 证据门 | 本阶段重点回答 | 最少证据 | 人类决定 | 未通过的处理 |
| --- | --- | --- | --- | --- |
| E0 服务登记 | 看得见 | 护照 11 字段、地点、服务对象与现行做法 | 是否值得进入转译 | 记录后关闭或补充材料 |
| E1 基线与权利 | 问得清 | 非 AI 基线、数据上限、产权许可、责任主体与恢复责任 | 是否允许形成试点方案 | 不占用场地，不采集数据 |
| E2 受控试点 | 用得上 | 安全审查、人工等价路径、容量、告知、申诉与结束日期 | 是否允许短时开放 | 保持日常模式，亮脉冲灯 |
| E3 独立复测 | 停得下 | 原始与失败记录、人工接管、受影响人群意见与场地恢复 | 是否支持扩大或修改 | 修正后重测或退出 |
| E4 继续或退役 | 改得动 | 复测结论、持续预算、责任续期、来源有效性与年度公开说明 | 继续、缩小、修改或退役 | 撤除服务并完成数据与场地恢复 |

证据门与四拍节拍的关系：E0-E1 对应 P1 申报（申报书=护照公开版），E2 对应 P2 测试（受控试点），E3 对应 P3 发布（独立复测通过才可放行），E4 对应 P4 复盘（继续/修改/退役决策公开）。五道门的判定证据全部登记于 `simulation.json` 与风险台账 [metric:operational_evidence_gate_count]。

**平线档案墙（概念建议）**：在中央绿廊北段设"平线档案墙"，公开陈列所有已按 P4 退役的 AI 服务——服务名、运行周期、复盘结论与失败记录以匿名化方式展示，与导视状态灯"平线=已停用"呼应；退役不是失败掩盖而是治理证据，任何服务可经改进后重新进入 P1 申报 [source:AGENT-TASKBOOK] [data:geometry/green_space.geojson#GREEN-001]。

**协议可执行登记与推演结论**：协议的机器可读推演登记见 `simulation.json`——15 项公共 AI 服务（12 张场景卡 + 3 个测试场景）逐项运行**离线合成演练**：每项服务跑一条合格样例与七条失败分支（责任人缺失/数据越过声明上限/人工等价路径失效/无法暂停或停用/修订未公开/退场红利缺失/退场后服务断供），共 15×8=**120 条合成检查**，每条带独立回执哈希，审阅者可离线重跑复核（`node visual/assets/simulate-check.js`，退出码契约 0/1/2，[data:simulation.json] [metric:simulation_task_count] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]）。**推演结论：120/120 条规则检查全部通过，其中 105 条失败分支全部被拦截、15 条合格样例仅获"桌面演练放行"；0 项服务获得发布放行**——没有任何一项服务可以在今天直接进入公共空间运行，全部须先通过受控测试与异议放行 [metric:synthetic_negative_branch_count]。演练当前状态固定为"尚未获准、尚未现场运行"；100% 的合成规则通过率只证明规则实现闭合，不证明服务安全、有效、合规或获批。这与"任何服务不能无限期停留在试点状态，也不能未经测试直接发布"互为表里：协议不是给方案背书，而是给每一项服务设定准入条件。登记为概念表达，不代表任何服务已实施或已获批。

**这个检查器是被验证过会拒绝的，不是只会通过**：`node visual/assets/simulate-check.js --self-test` 对**同一份** check() 函数注入八种篡改副本——缺任务（T1）、任务重复（T2）、回执哈希被改写（T3）、失败分支被翻成通过（T4）、计数声明被改（T5）、擅自声称现场运行（T6）、状态改为已上线（T7）、注入未知场景（T8）——八种全部被拒（**8/8**，证据随包提交于 `visual/assets/simulate-tamper-evidence.json`，可离线重跑，篡改用例为示意值）。只跑"合格记录"的检查器证明不了任何事：本包的全部力量在于 **105 条失败分支确实被拦截**，拒绝分支不触发，整套协议就只是散文。自测只证明判定逻辑可复现、拒绝分支确实会触发；它不证明任何实地读数、任何真实服务绩效。

**八态状态机（机器可读，`visual/assets/state-machine.json`）**：每一项服务的生命周期不是自由流程而是八态状态机——`proposed → baseline_verified → sandboxed → live → blackout_drill → bequest_audit → retained_or_modified | removed_archived`；任何状态进入 `removed_archived` 只允许两条路：经 `bequest_audit`（退场审计通过后退役）或安全硬停止。两道状态不可跳过：**blackout_drill（停摆演练）**——live 期间被计划停摆或任一五类回滚触发器触发即进入，演练验证人工等价路径真实可用；**bequest_audit（退场审计）**——审计普通路线、残余资产与数据清单，且"运营者不得自证其退场审计"。每条转移都携带责任角色（governance-raci.json）与所依赖的证据门（E0-E4），任一转移条件不满足即停留在原状态 [metric:state_machine_state_count]。

**双闸门（机器可读，`visual/assets/implementation-gates.json`）**：项目推进由**项目闸 G0-G7** 控制（G0 不得推进/未获授权 → G1 数据基线 → G2 场景匹配 → G3 沙盒测试 → G4 独立复测 → G5 异议放行 → G6 发布 → G7 复盘与退役），场景准入由**场景闸 C0-C7** 控制（C0 场景卡登记 → C1 无 AI 基线 → C2 权限核验 → C3 数据上限 → C4 人工路径 → C5 急停演练 → C6 异议公开 → C7 退场契约）；C0-C7 与护照 11 字段一一对应，G0-G7 与 E0-E4/P1-P4 逐级映射，共 16 门。日历只安排顺序，不能代替任何一道闸门 [metric:dual_gateway_gate_count]。全部服务当前处于 **G0 不得推进**状态。

**四段退场红利合同（机器可读，`visual/assets/dividend-contracts.json`）**：每一项服务进入 P1 之前先签四段合同——**BASE**（无 AI 基线：现在怎样完成同一任务）、**BOOST**（AI 增益与边界：什么被提升、边界在哪，AI 只建议不裁决）、**BLACKOUT**（停摆安排：人工等价路径与五类回滚触发器的对应）、**BEQUEST**（退场契约：退役条件、数据去向、场地恢复、归档去向）。15 项服务 15 份合同全覆盖 [metric:contract_coverage_ratio]；BEQUEST 是发布的前提——**没有退场契约的服务不得发布**（对应 105 条失败分支中的"退场红利缺失/退场后服务断供"两条拦截）。合同的角色承担与"不得替代"双栏见 governance-raci.json [metric:governance_role_count]。

12 张场景卡、3 个产业测试场景、年度活动与 AI 朝圣地标均按此协议定义运行边界；协议是方案运行机制建议，不替代规划审批、行业监管与法定评估。

## 用地、建筑规模与拆改留方案

用地方案依据国土空间调查、规划、用途管制分类等公开标准表达，形成完整、闭合、无缝的用地分区 [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE] [data:geometry/land_use.geojson#LU-001]。13 类用地中科研 0802 为主导（14 地块），商业 05（10）、住宅 0701（6）、教育 0804（6）、医疗 0806（6）、文化 0803（3）、体育 0805（1）、社区服务 0702（1）、公园绿地 1401（12）、防护绿地 1402（9）、广场 1403（2）、道路 1207（81）、留白 16（4），合计 155 地块无缝覆盖 [depth:land_use_layout]。

建筑方案区分保留、改造、更新、新建与待确认对象：由于缺少现状建筑、权属、控规与工程条件，本方案只提供**方法框架与待校准清单**，不编造拆改留结论 [depth:retain_renovate_demolish] [depth:height_massing_character] [standard:MOHURD-ARCH-DESIGN-DEPTH-2016]。`geometry/buildings.geojson` 的 84 栋概念建筑全部标注 `status=design_proposal`、`confidence=low`，仅表达体量组织意图 [data:geometry/buildings.geojson#BLDG-001] [metric:building_footprint_area_sqm]。总建筑规模、容积率、建筑高度、建筑密度等指标在官方条件缺失时统一为 `status=unknown`（见 [metric:floor_area_ratio]，reason 已说明待补条件与复算路径）。

**三重点区拆改留分档排序（概念建议，待官方现状调查与控规复核）**：为回应公告 1.5(3) 对重点区"明确拆改留分类方案"的必答要求，本方案给出三档**优先序排序与分档逻辑**而非编造比例——官方现状调查、权属与控规数据发布前，任何具体百分比都无依据支撑，编造比例反而损害方案可信度；排序以公开资料可支撑的事实为基础，待官方数据发布后按统一规则校准为比例区间：

| 重点区 | 分档优先序 | 分档逻辑（公开资料依据） | 待复核条件 |
| --- | --- | --- | --- |
| 众智园 | 保留 > 整治 > 更新 | 现有科研园区建筑以存量再利用为主，更新限于低效地块 | 现状建筑质量与权属调查 |
| 北京AI原点社区 | 保留 ≈ 整治 > 更新 | 五道口商住带混合度高，以界面整治与功能置换为主，更新限于个别低效节点 | 权属与控规条件 |
| 大钟寺 | 整治 > 保留 > 更新 | 站城更新强度相对较高，但文物与风貌载体一律保留、低干预处理 | 控规与文保复核 |

分档排序以 `phasing.geojson` 三期边界与 `land_use.geojson` 地块为底，全部标注为待复核，进入 `assumptions.json`（A-CONTROLS-001、ASSUME-005）管理；排序的意义在于给后续深化一个可复核的方向，而不是提前替现状调查下结论——对官方数据缺失的诚实声明，本身就是评审可核验的边界。

## 交通、轨道、市政与公共服务设施

**本章的判断是：每个交通与市政节点的 AI 介入都按 P2 受控试点节拍组织——未通过受控测试的智能设施一律按人工/常规模式运行（同任务等价登记见第六章）**。


交通方案回应公告对轨道站点一体化、道路微循环、慢行断点、对外交通、停车、非机动车停放与绿色交通系统的要求 [depth:traffic_rail_slow_parking] [data:geometry/roads.geojson#ROAD-001] [data:geometry/public_space.geojson#PUBLIC-001]：

- **对外交通（概念）**：依托北五环（快速路）、知春路（主干路）、学院路/西土城路（主干路）实现与中心城区及周边区域的快速联系，并衔接五环路区域一体化建设提出对外交通优化方向；具体匝道、断面与交通模型深化待交通专项条件确认（众智园区按公告 1.5(3)1）要求重点提升对外交通水平；北京AI原点社区对外交通联系按公告 1.5(3)2）要求提升，纳入 JZ-07 前置调查清单）；
- **轨道接驳（概念）**：以大钟寺站、五道口站、知春路站、西土城站、清华东路西口站为锚点，设 3 条概念接驳线（ROAD-011/012/013）与无人接驳巴士走廊（场景卡 02）[scenario:ai-traffic-walkability]；
- **道路微循环**：智脉大道（道路空间预留建议宽度约 26–30 m，概念建议区间，非红线结论，待交通专项与控规确认；见 roads.geojson ROAD-008 `reserved_width_note`）、智脉二街/三街组织街区级循环，慢行绿道沿中央绿廊全线贯通 [data:geometry/roads.geojson#ROAD-008]；
- **慢行断点**：概念提出北五环跨环慢行节点与绿廊南北两端景观节点（详见图 5 与 `constraints.geojson`）[data:geometry/constraints.geojson#CONSTRAINTS-01]；
- 停车与非机动车停放以"轨道 + 接驳 + 慢行"为优先序，具体规模待交通专项与控规条件确认。

市政与公共服务设施覆盖 AI 产业服务设施（算力、数据、合规、投融资一站式服务点，企业服务智能体融入 [scenario:enterprise-service-copilot]）、人才生活服务设施、新型基础设施（端侧算力驿站、分布式能源节点，场景卡 10）与传统市政设施融合 [depth:municipal_new_infrastructure]。**市政策略（概念建议）**：① 通信与算力——沿中央绿廊设通信管沟与端侧算力驿站（BLDG-001 概念节点），算力就近布设、按需扩容，不设独立大型数据中心；② 能源——分布式光伏与能耗 AI 调控楼（场景卡 10）联动，供能结构待电力专项确认；③ 排水防洪——场地低洼点与清河、小月河水系衔接按"蓝绿灰一体化"留出弹性空间，径流系数待专项复核；④ 消防与应急——利用绿廊与广场空间作为应急疏散与消防通道组织概念，与 119 接警联动待专项深化；⑤ 综合管廊——智脉大道预留综合管廊建设条件（概念），规模与断面待市政专项确认。管线、能源、排水、防洪、消防等工程资料缺失时列为正式深化前置条件，通过 `assumptions.json`（[assumption:A-CONTROLS-001]）说明待补，不写成审定条件。

## 蓝绿空间、公共空间与城市风貌

本章的判断是：蓝绿空间不是装饰层，而是协议的可读界面——导视系统的波形状态灯语言把 P1-P4 协议的状态直接呈现给市民，平线即停用、脉冲即测试；agent.5 三线文化叙事与导视系统据此获得物理载体（核对见表 A2）。

**波形状态灯三态规则表（概念建议；三态语义与市民识别动作、运营处置、协议节拍一一对应，任何状态变化必须在导视节点同步更新并留存记录）**

| 波形状态 | 市民识别动作 | 运营处置 | 对应协议节拍 | 记录位置 |
| --- | --- | --- | --- | --- |
| 稳定波形（常态显示） | 放心使用：服务正常运行，可正常消费与通行 | 按登记基线运行，巡检按计划执行；无异常不打扰 | P3 公开运行 | simulation.json 对应服务回执 |
| 脉冲闪烁（测试/变更中） | 按导视指引避开受控区：现场有安全员与急停装置，未经预约不进入 | 受控试点须预约+公示，测试结束时状态灯回稳定波形 | P2 受控试点 | 独立复测记录 + 变更登记 |
| 平线（已停用） | 该服务已退役：档案墙公开复盘结论与匿名化失败记录，场地已恢复或正在恢复 | 退役程序按 P4 执行：数据删除确认、场地恢复验收、档案墙陈列 | P4 退役 | 复盘报告 + 数据删除确认 |

三态之外不存在第四种状态——任何"名义运行、实际停摆"的服务在导视上即为平线，运营方不得以任何原因隐藏状态（防自证边界见风险章）。

**蓝绿空间（概念建议）**：以中央智脉绿廊为脊（260 m 宽、贯通南北；全区绿地概念复算约 284.8 ha、绿地率 25.0%，仅计 1401/1402、口径同 [metric:green_ratio]，非现状存量），即公告 1.5(2)4"京张遗址公园活力带"在总体设计区的智脉化载体 [data:geometry/green_space.geojson#GREEN-001] [metric:green_ratio]；防护绿带呼应小月河场景赋能翼，沿学院路设防护绿带，各街区植入口袋公园与广场节点 [data:geometry/public_space.geojson#PUBLIC-001] [depth:blue_green_public_space]。6 处广场（大钟寺站前、原点发布、众智园门户、五道口生活、清华东路西口、南部社区）构成公共空间骨架。**东翼生态体验环（概念建议）**：依托小月河—学院路防护绿带组织"东翼生态体验环"公共体验路径，串联小月河场景赋能翼的受控测试节点与生态体验点，作为场景开放日与慢行休闲的东翼载体 [data:geometry/green_space.geojson#GREEN-001] [depth:blue_green_public_space]。清河与项目区水绿资源在众智园片区开展建筑—绿地—水系一体化设计，挖掘与展示清河文化（概念建议，详细见众智园详细设计）。

**公共空间组件库（6 类，概念建议）**：广场（节点聚合）、口袋公园（住区嵌入）、导视节点（波形状态灯语言）、活动草坪（绿廊分段）、水景旱喷（站前广场）、智慧城市家具（充电/座椅/信息屏）——组件复用保证公共空间可识别、可维护、可批量实施。

![图 5 交通骨架与蓝绿系统概念图（概念建议；数据来源：geometry/roads.geojson 与 geometry/green_space.geojson，provisional）](assets/figures/mobility-bluegreen.png)

**城市风貌（概念建议）**：融合京张铁路历史文化、中关村创新文化与 AI 创新文化三线叙事 [depth:overall_spatial_structure] [standard:MOHURD-URBAN-DESIGN-MEASURES]：清华园车站遗址节点与智脉艺术铁轨承载铁路记忆；AI 原点之钟、AI 之光塔承载 AI 文化；导视符号系统以"铁轨—波形"母题统一——公共导视采用"波形状态灯"语言：稳定波形=正常运行、脉冲闪烁=测试中、平线=已停用，与智脉脉冲协议联动，市民无需阅读说明即可识别 AI 服务运行状态。风貌控制区分官方管控、设计建议与待确认条件，严禁在无文保或控规依据时给出伪精确控制线。所有品牌、字体、图像、肖像与企业标识均需清权来源（见 `report/copyright_statement.md`）。

**北影等艺术资源的利用（概念建议）**：公告 1.5(2)5 城市风貌任务点名"北影等艺术资源" [source:OFFICIAL-ANNOUNCEMENT]。北京电影学院（北影，西土城路 4 号）位于西土城路西侧、总体设计区东南部，本方案将北影定位为城市风貌与文化叙事的邻近艺术资源节点（概念）：① 智脉艺术铁轨数字投影内容共创（公开征集艺术家与院校学生作品，版权清权后使用）；② 钟韵元宇宙影音内容合作方向（由大钟寺文化机构主导，不虚构合作协议）；③ 电影路演与展映节目纳入年度活动体系"场景开放日"备选节目（活动按"立项—试办—评估—续办/退役"四步管理）。以上均以公开合作方向表述，不虚构合作安排。

**三线文化叙事与导视系统（概念建议）**：文化资源盘点与表达载体如下 [source:JZ-RAILWAY-CULTURE] [source:AGENT-TASKBOOK]：

| 叙事线 | 核心资源 | 表达载体 |
| --- | --- | --- |
| 京张铁路历史文化 | 清华园车站遗址、京张遗址公园活力带、詹天佑《京张铁路工程纪略》（1915 年刊印）等公开史料 [source:JZ-RAILWAY-CULTURE] | 智脉艺术铁轨、AR 孪生（卡 01）、平线档案墙 |
| 中关村创新文化 | 中关村科学城、学院路高校带、开源社区 | 原点发布厅、开发者代码墙（卡 12） |
| AI 新文化 | AI 原点之钟、AI 之光塔、脉冲协议状态灯 | 三态波形导视、荣誉阶梯、年度智脉奖 |

南北叙事序列（概念）：北段（众智园）呈现 AI 未来文化（训练测试、标准治理、低碳算力），中段（绿廊与原点社区）呈现创新转型（近校孵化、开源协作、艺术铁轨），南段（大钟寺）呈现百年记忆与智能经济交汇（钟韵文化、站城商业、数据要素）。导视系统分三层：**L1 城市级**（片区入口标识、三核导向，载体为绿廊入口标识与站前导视）、**L2 街区级**（场景节点与朝圣地标，载体为波形状态灯导视节点）、**L3 场所级**（无障碍导行与设施指引，载体为无障碍 AI 导行站与家具式导视）。**文化标识与整体 Logo 分离声明**：京张、中关村等文化叙事线以导视与图件表达，不将任何文保单位名称、历史机构标识纳入品牌 Logo；品牌 Logo 仅使用原创"脉字—铁轨—波形"母题，避免文化挪用与授权争议 [source:AGENT-TASKBOOK]。

**命名体系分级表（概念建议）**："智脉一带"命名体系按空间层级分级命名，名称与空间结构一一对应、可定位、可延展（回应 agent.1）[source:AGENT-TASKBOOK]：

| 层级 | 命名 | 对应空间与载体 |
| --- | --- | --- |
| 总体系 | 智脉一带 · AI Pulse Belt | 总体设计区整体意象与口号 |
| 空间骨架 | 中央智脉绿廊（JZ-01） | 京张遗址公园活力带智脉化载体 |
| 核心区 | 三核：众智园、北京AI原点社区、大钟寺 | 三处重点区域 |
| 双翼 | 中关村科技服务翼（西翼）、小月河场景赋能翼（东翼） | 东西两侧产业服务与蓝绿生态界面 |
| 多点 | 场景节点、AI 朝圣地标、慢行网络节点 | 公共空间组件库与场景卡落位 |
| 项目级 | JZ-01—JZ-12 | 更新项目清单 |
| 场景级 | 场景卡 01—12、3 个产业测试场景 | 智脉脉冲协议运行对象 |

**视觉识别（VI）规范（概念建议）**：Logo 以"脉"字与铁轨—波形母题为核心，规定最小使用尺寸（屏显 ≥24 px、印刷 ≥10 mm）、安全区（不小于 1/4 字高留白）、黑白与反白版本、标准色 #4A5560（京张铁灰）与 #0FA3B1（AI 青）及辅助色；字体授权清单与图元文件见 `report/copyright_statement.md`。VI 图元及导视系统落地前须经官方审批，本规范为概念建议。

**品牌延展与辨识度论证（概念建议）**：为回应评审维度"命名、Logo、视觉系统是否具有辨识度、延展性和国际传播力"，从符号语义、差异化与衍生应用三方面论证：

| 符号 | 语义 | 延展规则 |
| --- | --- | --- |
| "脉"字+铁轨→波形母题 | 铁脉→数字智脉转译；汉字字形具中文辨识度 | 母题可独立用于导视、图标、印章与数字孪生水印 |
| 京张铁灰 #4A5560 | 铁路历史与结构秩序 | 用于结构线、文字与版式系统 |
| AI 青 #0FA3B1 | AI 活力与运行状态 | 用于 AI 功能、状态灯与交互元素 |
| 三态波形状态灯语言 | 服务运行状态可视化（稳定/脉冲/平线） | 三态波形可复制至全部场景导视与 HTML 交互 |

| 对比维度 | 结构式/文化式命名（同行常见） | 智脉一带的差异与辨识度来源 |
| --- | --- | --- |
| 命名与机制关系 | 名称多为空间结构描述 | 名称即运行机制：脉冲协议四拍与"智脉"同构，可执行、可验证 |
| 视觉语言 | 静态 Logo 为主 | 波形状态灯语言使视觉与运行状态实时挂钩 |
| 延展性 | 视具体设计而定 | 母题/双色/三态波形三件套覆盖纸面、导视、数字界面 |

| 衍生应用 | 示例 | 边界 |
| --- | --- | --- |
| 场景卡图标 | 12 张场景卡统一波形母题图标 | 图标清权后方可使用 |
| 活动视觉 | 年度活动体系视觉系统（开发者大会等） | 需官方审批，不使用政府背书表述 |
| 导视系统 | 三态波形导视节点（L1/L2/L3 三层） | 需官方审批与无障碍标准复核 |

品牌要素（Logo、口号、状态灯语言）的清权登记见 `report/copyright_statement.md`；VI 规范为概念建议，落地前须经官方审批。

## 更新项目清单、实施政策与分期计划

本章的判断是：实施路径的价值不在清单长短，而在每一项更新项目能否回答"放行证据未过怎么办"——12 项 JZ 项目全部挂接 P1-P4 协议节拍（agent.6，核对见表 A2），未通过放行证据的项目停留在申报或测试阶段，不进入发布。实施路径的项目生成与部门转介逻辑参照公开征集组织材料与现行城市更新实践（概念建议，不声称依据任何官方导则）。

**场地现状研判（概念级；把"结合公园已实施区域和原设计方案"落到可指认的现实）**：公告 1.5(2)4 要求结合京张遗址公园已实施区域和原设计方案推进活力带建设，1.5(3) 要求统筹现状、在建与本次更新项目 [source:OFFICIAL-ANNOUNCEMENT]。本方案在官方现状调查与在建项目清单发布前，以概念级识别五类现状锚点并逐一说明其与协议的关系——① **京张遗址公园一期/二期已实施区域**：作为中央智脉绿廊（JZ-01）的基础载体纳入统筹，平线档案墙与导视节点优先落位于已实施段落，避免重复建设（1.5(2)4 直接呼应）；② **清华园车站及铁路遗产文保节点**：按文保要求只做展示性导视与 AR 史实叠加（场景卡 01），不设任何商业或试验设施（文保类回滚触发器 R-03）；③ **已开放的 AI 相关设施与公共文化节点**（依据公开报道与官方发布识别的已运营项目，如智能书屋、训练驿站等）：纳入 P3 公开运行基线盘点，作为"已实施区域"的一部分统筹，不重复立项（以官方正式名单复核为准）；④ **轨道一体化与车站改造工程**：大钟寺站、清华园一带轨道接驳与站城工程纳入 JZ-05/JZ-12 前置调查清单，站前设计以不干扰既有工程为前提；⑤ **现状与在建项目官方清单**：发布后按 P4 程序复核并更新 JZ 项目清单、分期与证据引用。以上均为概念级识别，不虚构项目状态、不声称官方归属；任何一项与官方清单冲突时以官方为准并同步修订本表（来源失效级联见证据总览章）。

更新项目清单（概念建议，共 12 项）：

| 项目编号 | 项目名称 | 类型 | 近期动作 | 放行证据 | 验收指标（建议目标） | 牵头建议 | 资金属性 | 成本量级（概念） | 回滚触发器 | 审批/备案类型 | 协议节拍 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| JZ-01 | 中央智脉绿廊贯通工程 | 公共空间/蓝绿 | 沿线步行审计、临时导视、桥下空间清障 | 红线、交通组织与生态复核 | 贯通率≥90%、绿量净增 | 区园林绿化局+交通部门 [data:geometry/green_space.geojson#GREEN-001] | 公益 | 中（临时设施先行，随放行分步投入） | 生态/安全类 | 绿线/生态复核 | P3 发布 |
| JZ-02 | 北五环跨环慢行节点 | 交通/慢行 | 断面与高架条件评估 | 结构安全与跨线审批 | 过街时间≤60s、无障碍达标 | 交通委+专业设计单位 [data:geometry/roads.geojson#ROAD-001] | 公益 | 低-中（评估先行，工程待审批） | 安全类 | 跨线结构审批 | P3 发布 |
| JZ-03 | 众智园门户广场与 AI 之光塔 | 公共空间/地标 | 概念方案与光环境试验 | 权属与景观审批 | 年活动≥20 场、5 万人次 | 园区运营平台 [data:geometry/public_space.geojson#PUBLIC-003] | 准公益 | 中（活动运营反哺部分投入） | 经济/安全类 | 权属与景观审批 | P3 发布 |
| JZ-04 | 原点发布厅与代码墙 | 产业服务/文化 | 首层业态策划、开源活动试运营 | 权属与运营主体确认 | 注册开发者≥5000、发布活动≥24 场 | 中关村开源社区+属地 [data:geometry/buildings.geojson#BLDG-001] | 准公益 | 低（首层业态+试运营启动） | 隐私/经济类 | 权属与运营主体确认 | P1 申报 |
| JZ-05 | 大钟寺站四象限步行连通 | 轨道一体化/慢行 | 过街时长、无障碍、非机动车停放调查 | 轨道站与道路交叉口复核 | 四象限步行可达、非机动车位≥200 | 属地+轨道运营方 [data:geometry/public_space.geojson#PUBLIC-001] | 公益 | 中（与轨道一体化工程协同） | 安全/经济类 | 轨道站交叉口复核 | P3 发布 |
| JZ-06 | 智脉大道无人接驳示范段 | 交通/新基建 | 法规梳理与信号条件评估 | 路测备案与安全预案 | 准点率≥90%、事故零容忍 | 区测试办+公交集团 [data:geometry/roads.geojson#ROAD-008] | 准公益 | 中-高（车路协同设备投入） | 安全类（R-01） | 路测备案（智能网联汽车道路测试） | P2 测试 |
| JZ-07 | 清华东路教育带缝合 | 城市更新/教育 | 校区边界与慢行安全调查 | 权属与校区同意 | 慢行安全改造≥3 处 | 街道+高校 [data:geometry/land_use.geojson#LU-001] | 公益 | 低-中（慢行改造分点投入） | 隐私（校园数据）类 | 校区权属同意 | P1 申报 |
| JZ-08 | 南部更新带提升 | 城市更新/住宅 | 现状建筑与用地调查 | 拆改留专项评估 | 更新项目库≥6 项、公众参与≥2 次 | 属地+规划团队 [data:geometry/phasing.geojson#PHASE-003] | 公益 | 中（调查与公众参与先行） | 经济/生态类 | 拆改留专项评估（更新单元程序） | P1 申报 |
| JZ-09 | 低空配送航线验证场 | 新基建/产业测试 | 空域与安全监管梳理 | 空域审批 | 测试≥90 天、事故零容忍 | 属地+监管机构 [data:geometry/constraints.geojson#CONSTRAINTS-01] | 经营/准公益 | 中（测试设施与监管配套） | 安全类（R-01） | 空域审批（低空飞行活动） | P2 测试 |
| JZ-10 | 端侧算力与能耗调控示范楼 | 新基建/市政 | 能源与算力需求评估 | 消防与运营主体确认 | 能耗下降≥15%、PUE 可控 | 能源企业+园区 [data:geometry/buildings.geojson#BLDG-001] | 经营 | 中-高（算力设备投入） | 经济/生态类 | 消防与能评 | P2 测试 |
| JZ-11 | 无障碍 AI 导行系统 | 公共服务/无障碍 | 标准与数据授权梳理 | 无障碍设施标准复核 | 覆盖率≥30 项、人工替代 100% | 残联+运营方 [data:geometry/constraints.geojson#CONSTRAINTS-01] | 公益 | 低（软硬结合、可分批部署） | 隐私类 | 无障碍设施标准复核 | P1 申报 |
| JZ-12 | 全球 AI 活动周公共路线 | 运营/品牌 | 活动许可与版权清权 | 公共空间许可与安全预案 | 年度国际活动≥12 场、海外团队≥40 批 | 联合运营机构 [data:geometry/phasing.geojson#PHASE-001] | 准公益 | 低-中（活动运营成本） | 文保/经济类 | 公共空间许可与活动备案 | P2 测试 |
> 表注：资金属性（公益/准公益/经营）与成本量级均为**概念级相对区间，非工程预算**。正式工程量与授权评估到位前不报总投资——"有量可询价，无量不报总投资"（资金渠道与敏感性见本章运营治理结构与资金来源表）；回滚触发器对应五类（安全/隐私/文保/经济/生态，逐项登记于 risk.json 与第六章场景卡逐卡登记），任一命中即按 P4 退役程序停机并恢复场地。

**协议挂接（概念建议）**：12 个项目按智脉脉冲协议归入三类（见上表"协议节拍"列）——**P1 申报类**（JZ-04/07/08/11，先完成申报要件）、**P2 测试类**（JZ-06/09/10/12，受控试点后发布）、**P3 发布类**（JZ-01/02/03/05，公共空间与基础设施先行，运行后纳入 P4 复盘）。协议节拍与实施分期（P1 近期/P2 中期/P3 远期）两套体系并行：节拍指单项目放行程序（申报→测试→发布），分期指片区实施时间；二者不混同。各项目"放行证据"列即其首道审批门，未通过不得进入下一节拍。

**最小可复演单元：JZ-01 绿廊贯通试点（概念建议）**：为证明"概念到行动"的转化路径，以 JZ-01 中央智脉绿廊贯通工程为最小可复演单元，给出可从 100 天征集周期内启动的完整闭环（目标—步骤—责任—时序—退出），验收指标复用上表 JZ-01 行，评估结论在年度 P4 复盘公开：

| 要素 | 内容 |
| --- | --- |
| 试点目标 | 先缝合 2–3 个高优先慢行断点（桥下空间、过街节点），验证"临时设施先行—持续监测—转正式项目"路径 |
| 五步动作 | ① 公开数据+人工踏勘形成断点清单 ② 临时导视与桥下清障先行缝合 3 个断点 ③ 部署低侵入传感连续监测 ≥90 天 ④ 按验收指标（贯通率≥90%）评估 ⑤ 纳入正式更新项目库或按 P4 退役 |
| 责任主体 | 区园林绿化局牵头，交通部门与街道协同，社区代表参与复核 |
| 时间线 | 0–3 月立项（P1 申报/证据门 E1）→ 3–6 月临时缝合与部署（P2 测试/E2）→ 6–9 月监测评估（E3 独立复测）→ 9–12 月转正式或退役（P3/P4、E4 决策） |
| 首个 100 天八步 | D1–14 公开资料与断点调查协议；D15–30 断点清单与人工踏勘基线；D31–45 用普通可撤回构件临时缝合 3 个断点；D46–60 部署低侵入传感并运行影子监测；D61–75 通过 E2 并取得许可后小规模开放；D76 主动演练一次拆除、恢复与转人工；D77–90 由独立方复测并公开失败记录；D91–100 作出继续、调整或退役决定 [metric:first_100_days_action_count] |
| 启动条件 | 红线、交通组织与生态复核通过（放行证据列）；未通过则停留 P1，不进入施工 |
| 风险与退出 | 触发生态/安全类回滚触发器即拆除临时设施恢复原状；监测不达标按 P4 退役并公开复盘 [data:geometry/phasing.geojson#PHASE-001] [depth:renewal_project_list] |

**表 6.8 试点 0–100 日检查点（概念建议）**：把"首个 100 天八步"细化为 5 个检查点——每个检查点是"动作＋通过证据＋不通过处置"三件套，评审可按日核验进度是否兑现（与证据门 E0–E4 对应：检查点 1 对应 E1 申报要件、检查点 3 对应 E2 许可、检查点 4 对应 E3 独立复测、检查点 5 对应 E4 决策）：

| 检查点 | 时间窗 | 检查动作 | 通过证据 | 不通过处置 |
| --- | --- | --- | --- | --- |
| 0 基线 | D0 | 公开资料与断点调查协议立项（P1 申报要件） | 调查协议与基线清单公开 | 停留 P1，不进入测试节拍 |
| 1 踏勘 | D15–30 | 断点清单与人工踏勘基线完成 | 断点清单≥3 处可定位、可复核 | 补测；清单不实即退回基线重新调查 |
| 2 缝合 | D31–45 | 普通可撤回构件临时缝合 3 个断点 | 构件可撤回性验收＋现场照片公开 | 构件不可撤回即停止缝合并恢复原状 |
| 3 许可 | D46–75 | 部署低侵入传感、影子监测；通过 E2 取得许可后小规模开放 | E2 证据门通过记录公开 | 未过 E2 保持影子运行，不开放 |
| 4 复测 | D76–90 | 主动演练拆除/恢复/转人工一次；独立方复测 | 演练记录＋复测报告公开 | 复测不达标即按 P4 退役并公开复盘 |
| 5 决策 | D91–100 | 作出继续、调整或退役决定 | 决策记录与理由公开 | 未作决定即按最严格口径（退役）处理 |

> 表注：检查点与"首个 100 天八步"（[metric:first_100_days_action_count]）同一时间轴，五档压缩八步为可核验检查点；每个检查点带公开产物，评审可对照时间窗逐点核对。若官方数据发布导致基线变化，检查点 0 重新触发（P4 重算程序）。

**实施分期（概念建议）**（`geometry/phasing.geojson`，[depth:renewal_project_list] [depth:phasing_implementation]）：**P1 近期（2026–2030）**——三重点区先行：众智园、原点社区核心带、大钟寺核心带（[data:geometry/phasing.geojson#PHASE-001]）；**P2 中期（2030–2035）**——绿廊全线贯通 + 大钟寺北块与南部北块（[data:geometry/phasing.geojson#PHASE-002]）；**P3 远期（2035–2040）**——南部更新带与留白弹性用地（[data:geometry/phasing.geojson#PHASE-003]）。每期公开三结论——继续、调整或停止，判定基准为放行证据、公众反馈与五类回滚触发器；`phasing.geojson` 各期带 `pulse_class` 属性登记——PHASE-001=declare_test（申报+测试）、PHASE-002=release（发布）、PHASE-003=review（复盘），与协议节拍表（P1 申报/P2 测试/P3 发布/P4 复盘）的审核门对应：

| 分期 | 继续条件 | 调整条件 | 停止条件 |
| --- | --- | --- | --- |
| P1 近期 | 三重点区放行证据齐备且 P2 测试无重大事故 | 权属或公众反馈导致范围调整 | 触发安全/合规类回滚触发器 |
| P2 中期 | 绿廊贯通工程完成且 P4 运营复盘通过 | 官方控规发布导致强度与线位调整 | 触发安全/文保/生态类回滚触发器 |
| P3 远期 | 南部更新带拆改留专项评估通过 | 留白用地按官方条件启动用途转换 | 触发经济/生态类回滚触发器 |

**征集周期（100 天）与实施分期严格区分**：前者是提交成果时间要求，后者是城市更新推进路径。近期可先以轻量设施、运营活动与服务平台启动（场景卡、朝圣地标、导行系统），远期内容等待正式控规、市政、交通与权属条件确认。年度活动体系（开发者大会、场景开放日、国际 AI 周）说明运营对象、频率、责任边界与转化路径，不写宣传口号 [source:AGENT-TASKBOOK]。

**运营治理结构（概念建议）**：建议以"一个秘书处、三个片区站、两个专业翼、一个公众委员会"组织日常运营——秘书处负责脉冲协议与台账管理，片区站对接三重点区，专业翼分别负责产业服务与公益服务，公众委员会对活动与场景行使知情、建议与申诉权（构成与弱势群体席位见第六章）。资金来源按"财政引导（可公开申请）—场景服务收益—开源与公益基金"三源组合；活动按"立项—试办—评估—续办/退役"四步管理，评估不通过即停止并公开原因。

**项目依赖关系（概念建议）**：12 项更新项目的关键依赖与前置条件如下，依赖未满足时相应项目不进入放行程序：

| 项目 | 依赖/前置 | 被依赖 |
| --- | --- | --- |
| JZ-01 绿廊贯通 | JZ-02 跨环衔接、沿线现状调查 | 场景卡 03/07 沿线节点、东翼体验环 |
| JZ-02 跨环慢行节点 | 交通专项条件、结构安全评估 | JZ-01 |
| JZ-03 门户广场与 AI 之光塔 | 权属与景观审批 | 场景开放日（JZ-12） |
| JZ-04 发布厅与代码墙 | 权属与运营主体确认 | 开源活动、开发者大会（JZ-12） |
| JZ-05 站四象限步行连通 | 轨道站与交叉口复核 | 钟韵展演（场景卡 04） |
| JZ-06 无人接驳示范段 | 路测备案与安全预案 | 车路协同测试段（test-v2x） |
| JZ-07 清华东路教育带缝合 | 权属与校区同意、慢行安全调查 | 教育带场景节点（场景卡 02/05 近校点位） |
| JZ-08 南部更新带提升 | 拆改留专项评估、现状建筑与用地调查 | 南部更新带分期（PHASE-003 远期） |
| JZ-09 低空配送验证场 | 空域审批 | 无人机驿站（场景卡 06） |
| JZ-10 算力与能耗示范楼 | 能源需求评估与消防确认 | 场景卡 10 联动 |
| JZ-11 无障碍导行系统 | 标准与数据授权梳理 | 场景卡 08、无障碍测评场（test-wayfinding） |
| JZ-12 活动周公共路线 | 活动许可与版权清权 | 全部公共活动场景 |

**资金三件套（概念建议）**：资金来源、规模与机制三件对应关系如下，全部为假设待复核（见 [assumption:ASSUME-005]）：

| 要素 | 内容 |
| --- | --- |
| 资金来源 | 三源组合：财政引导（可公开申请）、场景服务收益、开源与公益基金；P1 近期基准组合 45%/20%/15%/20%（合计 100%，含社会资本政策兑付，区间独立浮动待复核） |
| 资金规模 | 一次性建设投入 3.6–9.1 亿元（11 项，逐项可复算）＋年度运营 0.05–0.15 亿元/年（JZ-12），合计口径 3.65–9.25 亿元 |
| 资金机制 | 立项—试办—评估—续办/退役四步管理；放行证据门未过不进入下一节拍；年度 P4 复盘校准并公开资金台账 |

**投入量级矩阵（概念建议，量级与渠道为假设待复核，见 ASSUME-005）**：12 项更新项目的投入量级区间与三源资金渠道如下，不构成预算或投资承诺：

| 项目 | 类型 | 投入量级（概念区间） | 资金渠道 |
| --- | --- | --- | --- |
| JZ-01 中央智脉绿廊贯通 | 公共空间/蓝绿 | 0.3–0.8 亿元 | 财政引导+公益基金 |
| JZ-02 北五环跨环慢行节点 | 交通/慢行 | 0.5–1.5 亿元 | 财政引导 |
| JZ-03 众智园门户广场与 AI 之光塔 | 公共空间/地标 | 0.2–0.6 亿元 | 财政引导+场景收益 |
| JZ-04 原点发布厅与代码墙 | 产业服务/文化 | 0.1–0.3 亿元 | 开源基金+场景收益 |
| JZ-05 大钟寺站四象限步行连通 | 轨道一体化/慢行 | 0.1–0.3 亿元 | 轨道运营+财政引导 |
| JZ-06 智脉大道无人接驳示范段 | 交通/新基建 | 0.5–1.0 亿元 | 场景收益+财政引导 |
| JZ-07 清华东路教育带缝合 | 城市更新/教育 | 0.2–0.5 亿元 | 财政引导+高校共建 |
| JZ-08 南部更新带提升 | 城市更新/住宅 | 0.8–2.0 亿元 | 财政引导+社会资本（政策兑付） |
| JZ-09 低空配送航线验证场 | 新基建/产业测试 | 0.3–0.6 亿元 | 企业投入+监管试点资金 |
| JZ-10 端侧算力与能耗调控示范楼 | 新基建/市政 | 0.5–1.2 亿元 | 能源企业+园区 |
| JZ-11 无障碍 AI 导行系统 | 公共服务/无障碍 | 0.1–0.3 亿元 | 公益基金+财政引导 |
| JZ-12 全球 AI 活动周公共路线 | 运营/品牌 | 0.05–0.15 亿元/年 | 场景收益+清权赞助 |

全部投入量级为概念区间：上表 11 项一次性建设投入合计约 **3.6–9.1 亿元**（下限 0.3+0.5+0.2+0.1+0.1+0.5+0.2+0.8+0.3+0.5+0.1、上限 0.8+1.5+0.6+0.3+0.3+1.0+0.5+2.0+0.6+1.2+0.3，逐项可复算），不含年度运营 JZ-12；含 JZ-12 年度运营 0.05–0.15 亿元/年的合计口径约 **3.65–9.25 亿元**。进入 `assumptions.json`（[assumption:ASSUME-005]）管理，官方投资计划发布后按 P4 复盘校准。**P1 近期资金组合（概念基准组合）**：财政引导 **45%**、场景服务收益 **20%**、开源与公益基金 **15%**、社会资本（政策兑付）**20%**（合计 100%；各渠道区间独立浮动、浮动后不强制归一，待复核），均为概念假设待复核（见 [assumption:ASSUME-005]），不构成预算承诺。

**表 A3 成本复算框架（概念建议，量级不是拍脑袋——每项给出可复算的基数×单价区间；基数取自本包几何复算或官方公开口径，单价区间为同类项目公开市场水平，任一变更即重算）**

| 项目 | 复算基数（来源） | 单价区间（概念） | 复算区间 | 对应上表 |
| --- | --- | --- | --- | --- |
| JZ-01 中央智脉绿廊贯通 | 绿廊沿线慢行改造约 3.2 km（[data:geometry/green_space.geojson#GREEN-001] 沿线） | 900–2,500 元/延米（绿廊慢行改造公开价） | 0.29–0.80 亿元 | 0.3–0.8 |
| JZ-02 北五环跨环慢行节点 | 跨环慢行桥 1 座＋两端接驳约 0.6 km（[data:geometry/roads.geojson#ROAD-001]） | 8,000–25,000 元/延米（跨线结构公开价） | 0.48–1.50 亿元 | 0.5–1.5 |
| JZ-03 众智园门户广场与 AI 之光塔 | 广场面积约 1.21 ha（[data:geometry/public_space.geojson#PUBLIC-003] 复算） | 1,650–5,000 元/m²（广场+构筑物公开价） | 0.20–0.60 亿元 | 0.2–0.6 |
| JZ-04 原点发布厅与代码墙 | 首层改造约 8,000 m²（[data:geometry/buildings.geojson#BLDG-001] 概念） | 1,250–3,750 元/m²（既有建筑改造公开价） | 0.10–0.30 亿元 | 0.1–0.3 |
| JZ-05 大钟寺站四象限步行连通 | 四象限接驳改造约 1.44 ha（[data:geometry/public_space.geojson#PUBLIC-001] 复算） | 700–2,100 元/m²（地面连通改造公开价） | 0.10–0.30 亿元 | 0.1–0.3 |
| JZ-06 智脉大道无人接驳示范段 | 示范段约 2 km（[data:geometry/roads.geojson#ROAD-008] 沿线） | 25,000–50,000 元/延米（车路协同示范路公开价） | 0.50–1.00 亿元 | 0.5–1.0 |
| JZ-07 清华东路教育带缝合 | 慢行改造点约 3 处（[data:geometry/land_use.geojson#LU-001] 沿线） | 670–1,670 万元/处（慢行节点改造公开价） | 0.20–0.50 亿元 | 0.2–0.5 |
| JZ-08 南部更新带提升 | 现状建筑调查约 0.8 km²（[data:geometry/phasing.geojson#PHASE-003] 复算） | 100–250 元/m²（更新单元前期评估+轻改造公开价） | 0.80–2.00 亿元 | 0.8–2.0 |
| JZ-09 低空配送航线验证场 | 测试场地约 2 ha（[data:geometry/constraints.geojson#CONSTRAINTS-01] 周边） | 1,500–3,000 万元/ha（测试设施公开价） | 0.30–0.60 亿元 | 0.3–0.6 |
| JZ-10 端侧算力与能耗调控示范楼 | 示范楼约 4.13 ha 楼群（[data:geometry/buildings.geojson#BLDG-001] 复算） | 1,200–2,900 元/m²（楼宇智能化改造公开价） | 0.50–1.20 亿元 | 0.5–1.2 |
| JZ-11 无障碍 AI 导行系统 | 导行点约 30 处（[data:geometry/constraints.geojson#CONSTRAINTS-01] 节点） | 33–100 万元/处（无障碍信息化站点公开价） | 0.10–0.30 亿元 | 0.1–0.3 |
| JZ-12 全球 AI 活动周公共路线 | 年度活动约 12 场（本章活动体系表） | 40–125 万元/场（大型公共活动公开价） | 0.05–0.15 亿元/年 | 0.05–0.15 |

> 表注：复算区间由基数×单价区间直接相乘得出（逐项可复核）；基数中几何值均来自本包图层 EPSG:4548 复算，单价区间为同类项目公开市场水平而非本地报价——因此区间是"量级可行性参考"而非预算；任何基数或单价变更时按 P4 程序重算并公开。官方投资计划、控规与权属发布后以官方口径为准，本表自动失效并重算。

**公众参与时序（概念建议）**：公众与利益相关方参与按节点制度化；参与机制（混合参与、可追溯提案与公开反馈）对标巴塞罗那 Decidim 参与平台模式（背景比较，不构成法定程序依据）[source:BARCELONA-DECIDIM]：

| 阶段 | 参与机制 | 节点要求 |
| --- | --- | --- |
| 方案深化期 | 方案公示、意见征集 | 三重点区概念发布后 30 天意见期 |
| P1 申报期 | 公众委员会预审 | 场景卡 P1 申报后 15 天内预审 |
| P2 测试期 | 受控开放、现场反馈 | 测试满 60 天开放公众反馈 |
| P3 发布期 | 状态灯可视化、投诉通道 | 运行边界变化 24h 内更新状态灯 |
| P4 复盘期 | 失败记录公开、续办听证 | 年度复盘公开会议不少于 1 次 |

**程序性异议门（概念建议）**：公众与利益相关方在下列节点可对具体场景或指标正式提出异议，异议未决前该节点不推进（进入"异议挂起"状态并亮黄灯）：

| 异议窗口 | 受理主体 | 处理时限 | 升级与公示 |
| --- | --- | --- | --- |
| 方案公示期（概念发布后 30 天内） | 公众委员会秘书处 | 收到异议后 15 个工作日书面回复 | 未解决升区级复审；异议台账公开 |
| P1 申报后 15 天内（公众委员会预审期） | 公众委员会 | 预审期内出结论 | 结论附理由公示；可申诉一次 |
| P4 续办听证（年度复盘） | 公众委员会＋属地 | 听证会后 15 个工作日 | 续办意见与决议公开留存 |

**意见闭环（概念建议）**：所有征集意见进入统一台账，按"采纳／部分采纳／不采纳（附理由）"分类，处理结果在意见期结束后 15 个工作日内公示并留存 30 天；不采纳意见可向公众委员会申诉一次，申诉处理结果进入年度复盘记录——确保"征集-回应-修订-公示"闭环可追溯，不采纳也须留痕。

## 征集周期 100 天行动方案

征集周期（100 天）是提交与评审的时间约束，与实施分期（近期/中期/远期）严格区分：前者约束成果交付节奏，后者是城市更新推进路径。提交后按下列行动方案持续参与至评审与公示完成；官方数据（边界、控规、现状调查）发布即触发 P4 重算程序。

**表 B1 前 100 天行动清单（概念，含投入量级——区间为概念估算，评审可作可行性量级参考；合计约 34–52 人日）**

| 时间段 | 行动 | 责任主体 | 输出 | 投入量级（概念） |
| --- | --- | --- | --- | --- |
| 第 1–14 天 | 官方数据核验：边界/控规/现状调查发布跟踪 | 本方案团队 | 数据缺口清单更新 | 3–5 人日 |
| 第 1–14 天 | 公开讨论与意见征集回应 | 本方案团队 | 逐条回应记录 | 2–3 人日 |
| 第 15–30 天 | 评审反馈闭环：按意见修订章节与指标 | 本方案团队 | 修订版（下一迭代，当前 v10.14.0） | 6–10 人日 |
| 第 15–30 天 | 场景卡 P1 申报要件预演（五要素核对） | 运营秘书处（建议） | 申报模板 | 3–5 人日 |
| 第 31–60 天 | 官方数据发布则重算图层与指标（P4 程序） | 本方案团队 | 重算报告 | 4–8 人日 |
| 第 31–60 天 | 三重点区利益相关方工作坊 | 运营秘书处（建议） | 意见汇总 | 6 人日（2 场×3 人次） |
| 第 61–100 天 | 终版定稿：finalize＋四道门＋preflight | 本方案团队 | 正式提交包 | 8–12 人日 |
| 第 61–100 天 | 开发者与社区预沟通（场景开放日预告） | 运营秘书处（建议） | 活动预告 | 2–3 人日 |

**表 B2 质量门 Q0–Q4（每道门给出不通过时的处置——门不是装饰，未通过即整段重测，不允许带伤放行）**

| 质量门 | 内容 | 校验方式 | 当前结果 | 不通过时 |
| --- | --- | --- | --- | --- |
| Q0 内容自检 | 引用可解析、数字自洽、区间封闭、双语 1:1 | 脚本化检查＋本表 A1–A7 核对 | PASS | 定位违规条目修订，重跑 Q0 至全 PASS，修订记 changelog |
| Q1 确定性校验 | manifest 哈希复现、字节级可复算 | finalize_submission + self_check DETERMINISTIC_VALIDATION | PASS | 版本串连锁（ITERATION/REV/SEED）全套产物重生成，字节级复现后重验 |
| Q2 空间审查 | 拓扑/CRS/无缝覆盖/边界偏差披露 | self_check SPATIAL_REVIEW | PASS | 修复几何层与派生指标，重跑 gen_01→02 后重验；偏差披露更新 |
| Q3 视觉打包 | 图尺寸/PDF 页数/离线可视化零外链 | self_check VISUAL_PACKAGING | PASS | 按视觉 QA 清单重渲染图件/PDF/HTML，量化复核后重验 |
| Q4 发布评审 | 评审维度证据索引、差异声明、反馈闭环 | 本表 A1–A7 随评审公开 | 随评审更新 | 评审意见逐条回应入台账，未闭环项公开挂起并说明原因 |

**表 B3 里程碑矩阵（概念，每项里程碑同时给出未达成时的处置——只承诺能兑现的路径）**

| 阶段 | 里程碑 | 判定条件 | 关联项目 | 未达成时处置 |
| --- | --- | --- | --- | --- |
| 征集期 | 提交包通过 G0–G3 | 门控全 PASS | 全部 | 按 Q1–Q3 修复重验，不推无关内容凑数 |
| 评审期 | 评审反馈逐条闭环 | 回应记录公开 | 全部 | 未闭环项入意见—回应台账公开挂起并说明原因 |
| P1 近期 | 三重点区先行启动 | 放行证据齐备 | JZ-03/04/05/06 | 证据不足不进入 P2 节拍，按证据门复核 |
| P1 近期 | 导行与场景轻量试点 | P2 测试无重大事故 | JZ-11、场景卡 | 降级为影子运行；重大事故即停并人工接管 |
| P2 中期 | 绿廊全线贯通 | P4 复盘通过 | JZ-01/02 | P4 复盘失败公开失败记录，分段验收后再续 |
| P2 中期 | 新基建示范落地 | 审批通过 | JZ-09/10 | 审批未过退回 P1 要件，不承诺替代审批 |
| P3 远期 | 南部更新带专项评估 | 拆改留评估通过 | JZ-08 | 评估延后至条件齐备，不抢跑 |
| P3 远期 | 留白弹性用地启动 | 官方条件确认 | RES-01..04 | 等待官方条件，以官方确认为准不替代决策 |

**表 B4 实施路径模块映射（概念，每模块给"本稿交付"与"继续门槛"——门槛未满足不声称完成）**：JZ 项目与实施路径逐项映射，按公开征集组织材料与既有城市更新实践组织为概念模块 M01–M10（示意性序号，非官方模块清单），只有 M03/M04/M09/M10 达到 complete_as_concept（本稿交付完整），其余模块明确标注所需官方输入——不把"方法框架"写成"已落地" [depth:renewal_project_list]：

| 模块（官方实施路径） | 本稿交付（可定位） | 继续门槛（所需官方输入/授权） |
| --- | --- | --- |
| M01 项目基本信息 | 表 JZ 12 项身份与范围（[data:geometry/site_boundary.geojson#PROV-SITE-001]） | 官方边界确认、实施主体确定 |
| M02 前期评估 | 现状研判五锚点（第七章）；权属/审批预检 | 官方现状调查、在建项目清单 |
| M03 功能定位 | 场景卡 S/M/L 面积档（第六章，12 卡全覆盖） | 控规、产业目录口径确认 |
| M04 规划方案 | 用地结构 13 类、三期分期（第三/五章） | 详细规划批复 |
| M05 建筑设计 | 概念体量 8–12 百万 m² 量级（概念） | 建筑红线、结构/消防/无障碍复核 |
| M06 土地利用 | 用地兼容建议（概念） | 权属、批准用途 |
| M07 未登记建筑处置 | no-build 门（不主张拆除） | 登记状态、文保鉴定 |
| M08 资金方案 | 表 A3 成本复算框架（复算基数×单价区间） | 资金授权、真实报价 |
| M09 产业业态与运营 | 1+X+1 映射（第三章）；三源资金 | 运营主体、准入协议 |
| M10 建设时序 | 三期分期 + 表 6.8 试点 0–100 日检查点 | 审批/备案、场地准入 |

> 表注：十模块路径对应海淀区城市更新导则实施环节；complete_as_concept 仅表示本稿交付完整，不表示官方许可；任一门槛未满足时按 P4 复盘规则挂起对应模块，不跳过。

## 指标体系、面积复算与合规矩阵

指标体系（`metrics.json`）含 **76 项**，分七类管理（表内列出全部 76 项及数值）：

**① 空间类 known（14 项，从提交几何直接复算，EPSG:4548）**：总体设计范围面积（site_area_sqm，实测 11,412,825.4 m²——**展示精度 0.1 m²，此处数值只是本包几何图层在 EPSG:4548 下的机器复算值，复算全值（含更多小数位）见 metrics.json；它不是官方认定面积，官方口径 11,400,000 m²，偏差 0.11%**；精度纪律：展示值与全值分离，任何依赖全值的计算从 metrics.json 取值而不是从正文展示值反推）、建筑基底面积（building_footprint_area_sqm，约 110.3 ha）、绿地率（green_ratio，25.0%）、公共空间比例（public_space_ratio，约 5.9 ha、0.52%）、重点区数量（key_area_count，3）、重点区总面积（key_area_total_area_sqm，约 369.3 ha）、用地地块数（land_parcel_count，155 地块）、用地类别数（land_use_class_count，13 类）、建筑栋数（building_count，84）、绿地要素数（green_space_count，21：12 公园＋9 防护）、公共空间节点数（public_space_node_count，16：6 广场＋6 导视＋3 测试＋1 健康导引）、道路段数（road_segment_count，13）、分期区数（phasing_zone_count，3）、约束区数（constraint_zone_count，3）。空间类全部从 `geometry/*.geojson` 复算：图层计数类指标直接来自图层要素数（[metric:land_parcel_count] [metric:land_use_class_count] [metric:building_count]），绿地、公共空间节点与道路段计数见 [metric:green_space_count] [metric:public_space_node_count] [metric:road_segment_count]。

**② 功能比例 known（7 项，按本包概念图层 EPSG:4548 复算，非官方用地口径）**：科研 0802 21.9%、商业 05 7.0%、住宅 0701 13.6%、道路 1207 10.7%、绿地 1401＋1402 25.0%、留白 16 2.7%、文教体医合计 14.4%（区间口径与 1+X+1 映射见 ASSUME-005 与第三章表）。各比例按概念图层复算（[metric:research_0802_ratio] [metric:commercial_05_ratio] [metric:residential_0701_ratio]）；道路、绿地与留白比例分别登记（[metric:roads_1207_ratio] [metric:green_1401_1402_ratio] [metric:reserve_16_ratio]），文教体医合计见 [metric:culture_edu_sports_medical_ratio]。

**③ 方案元素计数 known（19 项，按正文登记）**：12 场景卡、3 产业测试场景、8 用户画像、3 朝圣地标、6 全球案例、9 几何图层、4 脉冲节拍、5 回滚触发器、120 合成检查任务（15 合格＋105 失败分支）、11 服务护照必填字段、5 运营证据门、8 首个 100 天步骤、12 同任务等价登记、4 资金渠道、11 一次性投入项目、3 异议门、3 应急层级、5 公共底线指标、15 项服务推演对象。元素计数均登记于正文与结构文件（[metric:scenario_card_count] [metric:industry_test_scenario_count] [metric:persona_count]），朝圣地标、全球案例与几何图层计数见 [metric:pilgrimage_landmark_count] [metric:ecosystem_case_count] [metric:geometry_layer_count]。

协议与资金类计数另登记于 simulation.json 与投入清单（[metric:pulse_beat_count] [metric:rollback_trigger_class_count] [metric:simulation_task_count]），资金渠道与一次性项目计数见 [metric:funding_channel_count] [metric:investment_item_count]，异议门、应急层级与公共底线指标计数见 [metric:objection_gate_count] [metric:emergency_tier_count] [metric:bottom_line_indicator_count]。

演练失败分支与服务护照字段计数见 [metric:synthetic_negative_branch_count] [metric:service_passport_required_field_count]；运营证据门、首个 100 天步骤与同任务等价登记计数见 [metric:operational_evidence_gate_count] [metric:first_100_days_action_count] [metric:same_task_equivalence_scenario_count]。


几何图层校验率（9/9 通过空间复核，与 ④ 类"分期区与约束区数量登记于几何图层"同源）见 [metric:geometry_layer_validation_ratio]，复算路径随几何登记。

**④ 管控类 unknown（12 项，官方条件缺失，不进入任何结论）**：容积率（floor_area_ratio）、建筑高度（building_height_m）、建筑密度（building_density）、法定绿地率（statutory_green_ratio）、退线（setback_m）、受影响户数（affected_household_count）、补偿预算（mitigation_budget_cny）、算力规模（compute_capacity）、年参与人次（annual_participant_count）、已批场景数（approved_scenario_count）、开发者转化率（developer_to_pilot_conversion_ratio）、年度运营成本（annual_operation_cost_cny，概念区间 0.05–0.15 亿元/年见 ASSUME-005）——reason 均已说明待补条件与复算路径；分期区与约束区数量登记于几何图层（[metric:phasing_zone_count] [metric:constraint_zone_count]），重点区总量复算见 [metric:key_area_total_area_sqm]。

**⑤ 绩效类 unknown（3 项，公告 1.5(2) 规划指标体系）**：AI 创新指数（ai_innovation_index）、人才密度（talent_density）、产值规模（ai_output_value）——公式与数据来源均已登记，待官方统计发布后复算。
**⑥ 机制 coverage known（9 项：8 项核验式覆盖率全部 =1.0，风险登记 8 维为计数）**：场景卡五维承诺覆盖率——失败降级（12/12 每行 KPI 与退出条件列非空）、数据与人工边界（12/12）、运营主体（12/12）、退出后空间处置（12/12，见第六章"AI 的有限作用与退出后空间处置"表）、护照登记完整率（15/15，simulation.json 逐项核验，15 项服务全部完成 11 字段护照登记）；机制完整性——四拍通过证据覆盖率（4/4，协议表每拍有通过证据与未通过处置）、回滚映射覆盖率（5/5 触发器与场景卡退出条件一一对应）、几何图层校验率（9/9 通过空间复核）；风险登记（8 维风险清单，risk.json）。覆盖率类公式均为"核验式"而非"声明式"：公式写明分子/分母与核验对象，评审可逐行复核（[metric:scenario_fallback_coverage_ratio] [metric:scenario_data_boundary_coverage_ratio] [metric:scenario_operator_coverage_ratio]）；退出处置与护照通过率见 [metric:scenario_exit_path_coverage_ratio] [metric:simulation_p1_pass_ratio]；四拍、回滚与风险登记见 [metric:protocol_gate_coverage_ratio] [metric:risk_rollback_mapping_ratio] [metric:risk_item_count]。

**⑦ v10.4 数据资产族 known（12 项，机器可读、可重跑）**：四段退场红利合同覆盖率（15/15 服务全部持有 BASE→BOOST→BLACKOUT→BEQUEST）、停摆条款覆盖率（15/15，与五类回滚触发器一一对应）、退场契约覆盖率（15/15，无退场契约不得发布）、状态机状态数（8 态：proposed→removed_archived，blackout_drill/bequest_audit 不可跳过）、状态机转移门数（8 条转移各带角色与证据门）、双闸门数（16 门：G0-G7 项目闸＋C0-C7 场景闸）、治理角色数（8 角色，含"不得替代"双栏与缺岗兜底）、治理宪法条款数（5 条，含"运营者不得自证其退场审计"）、回执可复算率（120/120，node simulate-check.js 退出码契约 0/1/2）、七维证据索引覆盖（7 维逐维指向可打开文件）；另意见台账 3 条（#846/#1029/#1368）与证据等级 5 级（L1-L5）登记于正文。

全部 10 项 source_files 指向 visual/assets/ 数据资产族，评审可逐一打开复核（[metric:contract_coverage_ratio] [metric:state_machine_state_count] [metric:dual_gateway_gate_count]）。

停摆/退场条款覆盖率见 [metric:blackout_clause_coverage_ratio] 与 [metric:bequest_clause_coverage_ratio]，治理角色、宪法条款与回执复算计数见 [metric:governance_role_count] [metric:simulation_rerun_receipt_ratio] [metric:review_evidence_dimension_count]；意见台账与证据等级登记于正文（表 A9、设计依据章）。

所有 known 指标均可从 GeoJSON 复算，面积与绿地率另经公开地图量测与官方 planning_limits.json 数值交叉验证（交叉验证记录见 [source:AREA-CROSSCHECK]）[metric:site_area_sqm] [data:geometry/green_space.geojson#GREEN-001] [depth:metrics_recalculation]。metrics.json 条目不另设分类字段，①-⑦ 七类管理以本章分类为准，JSON 保持 schema 精简。

**创新指标体系替代度量建议（回应公告 1.5(2)1"规划指标体系"；官方 AI 创新指数/人才密度/产值三项公式未发布，本方案不虚构数值，先给出可落地、可复算的概念替代度量，待官方口径发布后按 P4 替换）**：

| 官方点名指标（unknown，见 metrics.json） | 本方案概念替代度量 | 数据来源（全部可复算） | 更新时点 |
| --- | --- | --- | --- |
| AI 创新指数 | 开发者密度（开发者工位数/万人）+ 场景覆盖数（12 卡）× 场景开放度（P3 公开运行数/登记数） | 场景卡表、simulation.json 护照登记 | 每季度随场景状态灯更新 |
| 人才密度 | 工程师与研究者千人占比（概念区间，基于院落与发布厅容量与公开就业数据，不虚构统计） | 用户画像表、origin 发布厅容量 | 官方人才统计发布后替换 |
| 产值贡献 | 已登记服务的运营与测试活动量（预约场次、测试任务数），不以产值口径声称经济贡献 | simulation.json 回执计数 | 官方产业口径发布后替换 |

三项替代度量均标注为**概念度量**，用于方案内部跟踪与展示，不构成任何官方统计口径；官方口径发布后 30 天内完成替换并公开 diff（证据失效级联规则适用）。

**指标三栏表（能说明 / 不能说明）**：指标体系的诚实边界与主张同等重要——下表把"能说明什么"与"不能说明什么"逐项分列，避免把指标数值误读为现实结论 [depth:metrics_recalculation]：

| 指标或指标族 | 能说明 | 不能说明 |
| --- | --- | --- |
| 面积/比例/计数（14 项空间类） | 本包几何图层在 EPSG:4548 下的面积与数量，可字节级重放 | 官方现状口径下的法定面积、存量绿地率与审批依据 |
| 功能比例（7 项） | 概念图层口径下的用地结构组织意图 | 官方用地平衡结论；非现状存量 |
| 协议/护照/门/状态机/双闸门/合同族 | 机制登记的完整性与机器可核验性（105 条拦截可重跑） | 服务安全、有效、合规或获批；现场运行表现 |
| 覆盖率族（=1.0 的 8 项＋合同 3 项） | 声明字段在登记文件中的完整性（核验式） | 现实中任何一项服务的交付质量 |
| 演练通过率（120/120） | 规则实现闭合、失败分支全部被拦截 | 公众接受度、实际安全性或监管放行 |
| 管控类 unknown（12 项）与绩效类 unknown（3 项） | 明确承认官方条件缺失、不进入任何结论 | 无——本项设计为"不作任何说明"并给出复算路径 |
| 意见台账与证据等级（3 条／5 级） | 对公开质疑的登记回应与全文章节证据口径 | 官方对方案的认可程度 |

| 指标 | 当前值 | 置信度 | 用途 |
| --- | --- | --- | --- |
| 总体设计范围面积 | 11,412,825.4 m2 | 高（实测复算） | 全部空间比例的分母 |
| 建筑基底面积 | 约 110.3 ha | 中（概念体量） | 建筑规模量级参考 |
| 绿地率 | 25.0% | 中（provisional 边界） | 蓝绿系统绩效 |
| 公共空间比例 | 约 5.9 ha（0.52%） | 中（provisional 边界） | 公共空间系统绩效 |
| 重点区数量 | 3 | 高（图层核对） | 详细设计范围确认 |
| 重点区总面积 | 约 369.3 ha | 高（实测复算） | 详细设计总量（偏差见 ASSUME-002） |
| 用地地块数 | 155 | 高（图层核对） | 无缝覆盖完整性证据 |
| 用地类别数 | 13 | 高（图层核对） | 分类结构证据（按 MNR 指南） |
| 建筑栋数 | 84 | 高（图层核对） | 体量组织规模证据 |
| 绿地要素数 | 21（12 公园＋9 防护） | 高（图层核对） | 蓝绿系统要素证据 |
| 公共空间节点数 | 16（6＋6＋3＋1） | 高（图层核对） | 场景落位节点证据 |
| 道路段数 | 13 | 高（图层核对） | 交通骨架要素证据 |
| 分期区数 | 3 | 高（图层核对） | 分期实施框架证据 |
| 约束区数 | 3 | 高（图层核对） | 敏感边界披露证据 |
| 科研 0802 比例 | 21.9%（概念图层复算） | 中（概念口径） | 1+X+1 功能结构（区间见 ASSUME-005） |
| 商业 05 比例 | 7.0%（概念图层复算） | 中（概念口径） | 1+X+1 功能结构 |
| 住宅 0701 比例 | 13.6%（概念图层复算） | 中（概念口径） | 1+X+1 功能结构 |
| 道路 1207 比例 | 10.7%（概念图层复算） | 中（概念口径） | 1+X+1 功能结构 |
| 绿地 1401＋1402 比例 | 25.0%（概念图层复算） | 中（概念口径） | 1+X+1 功能结构 |
| 留白 16 比例 | 2.7%（概念图层复算） | 中（概念口径） | 1+X+1 功能结构 |
| 文教体医比例 | 14.4%（概念图层复算） | 中（概念口径） | 1+X+1 功能结构 |
| 场景卡数 | 12（登记于正文） | 高（文本核对） | agent.3 覆盖证据 |
| 产业测试场景数 | 3（登记于正文） | 高（文本核对） | agent.3 覆盖证据 |
| 用户画像数 | 8（登记于正文） | 高（文本核对） | agent.3 覆盖证据 |
| 朝圣地标数 | 3（登记于正文） | 高（文本核对） | agent.4 覆盖证据 |
| 全球案例数 | 6（登记于正文） | 高（文本核对） | agent.2 覆盖证据 |
| 几何图层数 | 9（登记于正文） | 高（文本核对） | 成果包结构证据 |
| 脉冲节拍数 | 4（登记于 simulation.json） | 高（文本核对） | 运营机制框架证据 |
| 回滚触发器类数 | 5（登记于 simulation.json） | 高（文本核对） | 风险管控框架证据 |
| 模拟推演任务数 | 120（15 合格＋105 失败分支，simulation.json 逐条回执，simulate-check.js 可重跑） | 高（回执哈希核验） | 协议可执行性证据 |
| 失败分支拦截数 | 105（全部被拦截，任一放行即演练失败） | 高（回执哈希核验） | 演练闭合性证据 |
| 退场红利合同覆盖率 | 15/15（BASE→BOOST→BLACKOUT→BEQUEST 四段全覆盖） | 高（dividend-contracts.json 逐条核验） | 退场契约完整性证据 |
| 状态机状态数 | 8（proposed→removed_archived；blackout_drill/bequest_audit 不可跳过） | 高（state-machine.json 逐条核验） | 生命周期刚性边界证据 |
| 双闸门数 | 16（G0-G7 项目闸＋C0-C7 场景闸，C 门与护照 11 字段对应） | 高（implementation-gates.json 核验） | 推进放行边界证据 |
| 服务护照必填字段数 | 11（缺项退回、不进入下一环节） | 高（simulation.json 登记） | 准入判定证据 |
| 运营证据门数 | 5（E0–E4，日历不能代替门） | 高（simulation.json 登记） | 推进放行证据 |
| 首个 100 天步骤数 | 8（D1–14 至 D91–100） | 高（正文登记） | 最小可复演单元证据 |
| 同任务等价登记数 | 12（逐卡登记人工/低技术路径） | 高（正文登记） | 公共包容证据 |
| 资金渠道数 | 4（登记于正文） | 高（文本核对） | 资金机制框架证据 |
| 一次性投入项目数 | 11（登记于正文） | 高（文本核对） | 更新项目清单证据 |
| 异议门数 | 3（登记于正文） | 高（文本核对） | 异议处理机制证据 |
| 应急层级数 | 3（登记于 simulation.json） | 高（文本核对） | 应急机制证据 |
| 公共底线指标数 | 5（登记于正文） | 高（文本核对） | 公共利益保障证据 |
| 容积率 | unknown | 待官方条件 | 不进入任何结论 |
| 建筑高度 | unknown | 待官方条件 | 不进入任何结论 |
| 建筑密度 | unknown | 待官方条件 | 不进入任何结论 |
| 法定绿地率 | unknown | 待官方条件 | 以官方控规口径为准 |
| 退线 | unknown | 待官方条件 | 以官方红线为准 |
| 受影响户数 | unknown | 待现状调查 | 拆改留不做结论 |
| 补偿预算 | unknown | 待官方投资计划 | 概念区间见 ASSUME-005 |
| 算力规模 | unknown | 待产业落地 | 概念方向见第六章 |
| 年参与人次 | unknown | 待运营数据 | 转化漏斗见 ASSUME-005 |
| 已批场景数 | unknown | 待 P1 门 | 全部场景为概念申报 |
| 开发者转化率 | unknown | 待运营数据 | 转化漏斗见 ASSUME-005 |
| 年度运营成本 | unknown | 待官方投资计划 | 概念区间 0.05–0.15 亿元/年见 ASSUME-005 |
| AI 创新指数 | unknown | 待官方统计 | 公告 1.5(2) 规划指标（公式已登记） |
| 人才密度 | unknown | 待官方统计 | 公告 1.5(2) 规划指标（公式已登记） |
| 产值规模 | unknown | 待官方统计 | 公告 1.5(2) 规划指标（公式已登记） |
| 场景失败降级覆盖率 | 12/12 = 1.0 | 高（行级核验） | 场景卡全部声明失败降级/退出条件 |
| 场景数据边界覆盖率 | 12/12 = 1.0 | 高（行级核验） | 场景卡全部声明数据与人工边界 |
| 场景运营主体覆盖率 | 12/12 = 1.0 | 高（行级核验） | 场景卡全部声明运营主体 |
| 场景退出处置覆盖率 | 12/12 = 1.0 | 高（行级核验） | 场景卡全部有退出后空间处置 |
| P1 申报通过率 | 15/15 = 1.0 | 高（simulation.json 核验） | 15 项服务全部完成 11 字段护照登记并通过 E0–E1 核验 |
| 四拍通过证据覆盖率 | 4/4 = 1.0 | 高（行级核验） | P1-P4 每拍有通过证据与未通过处置 |
| 回滚映射覆盖率 | 5/5 = 1.0 | 高（行级核验） | 五类触发器与退出条件一一对应 |
| 几何图层校验率 | 9/9 = 1.0 | 高（空间复核） | 9 类图层通过拓扑/CRS 校验 |
| 风险登记数 | 8 | 高（risk.json 核对） | 八维风险清单全部登记 |

口径说明：public_space_ratio 按 `metrics.json` 公式（public_space_area_sqm / site_area_sqm）统计 `geometry/public_space.geojson` 全部 16 个公共空间节点（6 处广场 + 6 处导视 + 3 处测试 + 1 处健康导引，合计约 5.9 ha、0.52%），不含中央绿廊与街道慢行空间；若按"广场+绿廊+慢行道"复合口径估算约 18–22%（概念区间，口径定义与复算路径见 metrics.json），本方案指标与图件均使用窄口径并在置信度列标注。

**测算口径汇总表（概念建议）**：

| 指标/概念 | 口径定义 | 复算路径 |
| --- | --- | --- |
| 总体设计区面积 | PROV-SITE-001 多边形面积（EPSG:4548） | geometry/site_boundary.geojson → metrics site_area_sqm |
| 绿地率 | 1401 公园绿地＋1402 防护绿地面积/总面积 | geometry/green_space.geojson → metrics green_ratio |
| 公共空间比例 | 16 个节点（6 广场＋6 导视＋3 测试＋1 健康导引）/总面积 | geometry/public_space.geojson → metrics public_space_ratio |
| 1+X+1 功能比例 | 各地类面积/总面积（仅计 1401/1402 为绿地口径） | geometry/land_use.geojson → 第三章表 1 |
| 拆改留分档 | 三档优先序排序（不编造比例，官方数据发布后校准） | 第五章表（ASSUME-005） |
| 投入量级 | 11 项一次性建设＋1 项年度运营，逐项区间 | 第十章投入量级矩阵 |

**边界敏感性扫描（概念建议）**：官方边界与重点区 polygon 发布后须重算全部图层与指标（P4 程序）；发布前按本包 provisional 边界的偏差对各指标的敏感性扫描如下：

| 指标 | 边界偏差来源 | 敏感性 | 影响区间 |
| --- | --- | --- | --- |
| 总体设计区面积 | PROV-SITE-001 拟合 +0.11% | 低（整体平移/缩放） | 比例类指标变化在 ±0.2% 内 |
| 三重点区面积 | PROV-KEY 占位矩形 +0.24% | 低（占位形状） | 面积差 ≤±2 ha |
| 绿地率 | 边界偏差传导 | 中（绿量沿廊道集中） | ±1.0% |
| 公共空间比例 | 边界偏差传导 | 中（节点尺度小） | ±0.1% |
| 功能比例结构 | 官方图层替换 | 高（完全重算） | 全量重算并重新披露（P4） |

**评审可以自己重算计数**：本包主张"空间计数可从提交几何直接复算"。零依赖重算器 `visual/assets/verify-counts.js`（不需要 Python、不需要联网、不调用本包任何生成脚本）从 `geometry/*.geojson` 独立数出全部 9 项计数指标（重点区/地块/用地类别/建筑/绿地/公共空间/道路/分期/约束区），与 `metrics.json` 逐项比对，退出码即结论（**0 = 全部复现，实测 9/9**）。范围刻意限于纯计数：面积与比例需要 EPSG:4548 投影，由生成链复算——一个假装会投影的零依赖脚本，正是本包在勘误册 E12 里记录的那种"检查测了方便测的东西"。

**复算纪律（触发事件 → 必须重算的范围）**：本包对自己的规则与它对城市的规则同源——**超限整段重测，不局部打补丁**：

| 触发事件 | 必须重算的范围 |
| --- | --- |
| 官方 polygon / 重点区边界发布 | **全部图层与全部指标整体重算**，不得只替换单个文件（P4 程序，见第十四章） |
| 任一几何图层修改 | 指标 → 图纸 → HTML → A3/A0 → manifest 哈希，全链重跑 |
| 语料 / 标准引用更新 | 重跑同场扫描与勘误校验（build_track_scan.py / build_errata.py），旧计数不得直接引用 |
| 管辖归属或权属核定 | 视同边界变更，相关服务按 E0 重新登记并整段复核 |

**包级置信度**：本包整体置信度取 **medium**——包内绝大多数已发布数值算得准（可复算），但建立在官方 provisional 边界之上；官方边界多边形发布后须整体重算（见上表）。这与勘误册 E10/E11 记录的两处官方几何缺陷（关键区质心偏移、边界与遗址公园不相交）同源，本包不因"官方数据缺失"而降低自己的披露标准。

![图 6 核心指标与证据图（概念建议；数据来源：geometry/*.geojson 经 EPSG:4548 复算）](assets/figures/metrics-evidence.png)

指标分三类管理：① 可由提交几何直接复算的空间指标（面积、比例、分期面积）；② 需官方控规支撑的管控指标（容积率、高度、密度、退线、红线——目前 `unknown`）；③ 需运营数据校准的绩效指标（AI 创新指数、人才密度、产值规模——已按公告 1.5(2) 规划指标体系登记公式与数据来源，状态 `unknown` 待官方统计 [metric:ai_innovation_index] [metric:talent_density] [metric:ai_output_value]）。三类分别进入 `metrics.json`、`assumptions.json` 与 `compliance_matrix.json`，避免把运营愿景误写成审定规划条件 [standard:PROJECT-OFFICIAL-ANNOUNCEMENT]。

合规矩阵覆盖公告 1.3、1.4、1.5 与 agent.1–agent.6 全部必选任务：agent.1 命名体系与标识（本节与第三章）、agent.2 全球案例与生态图谱（第三章）、agent.3 场景卡/测试场景/画像（第六章）、agent.4 朝圣地标与荣誉展示（第六章）、agent.5 文化叙事与导视（第九章）、agent.6 活动体系与社区运营（第十章）。`scripts/spatial_review.py` 与 `scripts/visual_review.py` 的结果是 formal 自检证据。

**标准适用边界**：`standard_matrix.json` 十四项标准响应中十三项为 addressed、一项（建筑工程设计文件编制深度规定 2016 版）为 data_gap、待官方建筑条件后启用；九项规划/治理法规之外新增五项技术标准（无人机条例、北京市无人机规章、智能网联路测规范、车路云一体化试点、无障碍设计规范 GB 50763），使场景技术路径可复核 [standard:UNMANNED-AIRCRAFT-REGULATIONS] [standard:ICV-ROAD-TEST-REGULATIONS] [standard:BARRIER-FREE-DESIGN-CODE]；任何标准响应仅约束本方案自身的表达与证据方式，不替代官方审批与法定审查程序 [standard:MOHURD-CONTROL-DETAILED-PLANNING] [standard:GENERATIVE-AI-INTERIM-MEASURES]。

**任务书 13 维自评（概念建议）**：对照 agent_taskbook 补充评审维度逐维自评（自评仅代表方案自身立场，供专业评审复核）。自评只给两态——「已闭合」（本方案已给出该维度的证据链）与「待补」（需官方条件或后续深化），不给模糊的中间分，避免"看似已答、实则未答"的维度在评审时悬空：

| 评审维度 | 证据指向 | 本方案回应 | 已闭合/待补 | 待补条件 |
| --- | --- | --- | --- | --- |
| 目标契合度 | 第三、六章；compliance_matrix.json 1.3.x | 生态图谱、创新链与朝圣地标体系服务全球 AI 产业高地与朝圣地目标 | 已闭合 | 官方统计发布后复算指标 |
| 功能匹配度 | 第三章三大定位五大功能映射表；compliance_matrix.json 1.3/1.5 | 三大定位、五大功能、三区两翼与 1+X+1 产业体系均建映射表逐条对照 | 已闭合 | 与官方产业目录逐项核对 |
| 品牌识别度 | 第八章命名与 VI 品牌延展 3 表 | 智脉一带命名体系、Logo 符号学、差异化对比与衍生应用论证 | 待补 | VI 图元落地需官方审批 |
| 区域协同性 | 第三章六类接口（含两区一带） | 北纬社区/未来科学城/怀柔科学城/经开区/京津冀/两区一带六类接口 | 已闭合 | 跨区协议待官方确认 |
| 规划创新性 | 第六章脉冲协议、第四章留白登记 | 智脉脉冲协议运营机制、留白弹性用地与控规边界声明 | 已闭合 | 控制条件发布后启用 |
| 产业支撑度 | 第三章六类机制+1+X+1 表 | 六类空间机制与算力、数据、场景开放测试体系 | 已闭合 | 算力供给待产业落地 |
| 场景可感知度 | 第六章三性评估矩阵与展开卡 | 12 张场景卡、3 个测试场景、3 个朝圣地标全部可体验、可展示、可推广 | 已闭合 | 详细设计阶段深化八要素 |
| 空间明确性 | 9 类 geometry 图层引用 | 全部场景落位于图层的节点、廊道或区域 | 已闭合 | 官方几何发布后重算 |
| 可转化性 | 第十章投入矩阵+时序表 | 协议化运行边界、牵头主体、放行证据、投入量级与参与时序 | 已闭合 | 投资计划待官方确认 |
| 表达完整性 | 成果包清单 | 双语正文、6 张图（含生态图谱）、A3 文册、A0 展板、离线 HTML 与结构化登记 | 已闭合 | — |
| 公开合规性 | sources.json、copyright_statement.md | 仅公开资料、provisional 披露、清权登记、HTML 零外链 | 已闭合 | 新引标准条目已补文号 |
| 国际传播力 | 第六章国际传播文案 | AI Pulse Belt 英文命名、30s pitch、社媒模板与受众分层 | 待补 | 实际发布须官方批准 |
| 长期运营价值 | 第六章漏斗表+品牌 IP+地标运营卡 | 年度活动体系、转化漏斗、荣誉阶梯、三源资金与治理结构 | 已闭合 | 运营数据按年度校准 |

## 风险、版权与合规说明

**双语要求**：本方案中文主文件与英文对照译稿 `proposal.en.md` 完整对齐（bilingual_contract_version 1）；A3/A0 图纸、HTML 与含文字图件均提供双语表达，优先使用 `docs/terminology-glossary.md` 推荐译法。所有图片、图纸、图标、数据与代码资产在 `sources.json` 与 `report/copyright_statement.md` 中说明来源、许可与授权状态；HTML 页面不加载远程脚本、远程地图瓦片、远程字体、iframe、表单或外部 API，不跟踪评审者行为。

**表达完整性自述（可核验声明）**：`visual/index.html`（及 `index.en.html`）为零外部请求单文件，可直接以 `file://` 离线打开（gen_05 管线内置 `http://`/`https://` 断言，CI 与 self_check 双重校验）；图层开关为原生 checkbox，完整支持键盘操作（Tab 聚焦、Space 切换），地图容器带 role/ARIA 标注与可见焦点样式——键盘用户与屏幕阅读器用户可完成全部图层浏览。此项主张的核验方法：对 `visual/*.html` 全文检索外部 URL（应为 0 命中），并在浏览器中以键盘完成图层开关与悬浮信息查看。

**合规分列原则（法定义务 / 自愿标准 / 概念建议三态分列）**：本方案全部主张按法律效力分列，不混用、不越级——**法定义务**（个人信息保护、无障碍环境建设、空域管理、未成年人保护等，见下表与 compliance_matrix.json）：逐条外置核验，任何场景不得以"试点""概念"为由豁免；**自愿采用标准**（GB/T 系列与行业、团体标准）：一律注明"自愿采用、非强制、以正式发布文本为准"，把自愿采用的标准读成普遍法定义务本身就是误导；**概念建议**（脉冲协议、运营安排、资金属性等机制性内容）：一律表述为建议，不表述为既定政策、审批结果或实施承诺。三项分列同时反向约束：法定义务同样不得被降格为"可选项"。法定义务清单逐项登记于 compliance_matrix.json 并给出核验动作与责任主体：

| 法定义务领域 | 对应主张（本章节位置） | 核验动作 | 责任主体 |
| --- | --- | --- | --- |
| 个人信息与隐私 | 数据最小化、留存期上限、不采集未成年人数据（第六章场景卡逐卡声明） | PIA 评估 + 台账抽查（风险监控节拍·每月） | 运营主体 |
| 无障碍环境 | 无障碍 AI 导行站人工替代率 100% 兜底、公共空间无障碍复核（第六章公共底线量化表） | 现场核验 + 季度独立复测（风险监控节拍·每季） | 第三方+残联 |
| 空域管理 | 无人机配送航线为概念航线，审批未过不开通（第六章卡 06） | 空域审批前置核验（P1 申报要件） | 配送企业+空域监管 |
| 文物保护 | 文保构件低干预、AI 展示装置站外可撤回（本章文保专项） | 文保单位前置确认（P1 申报要件） | 文保单位 |

**刻意不给什么（边界纪律清单）**：与"给什么"同等重要的是"不给什么"。本节集中声明方案在正式资料到位前**刻意不提供**的八类正式最终结论，每项附原因与替代物——评审无须在正文中逐处寻找边界声明，一览即可核验本方案没有越界：

| 刻意不给什么（正式最终结论） | 为什么不给 | 给什么替代（概念级） |
| --- | --- | --- |
| 总投资测算与成本决算 | 无正式工程量与授权评估 | 资金属性+成本量级相对区间（更新项目清单章实施矩阵，承诺"有量可询价，无量不报总投资"） |
| 容积率、建筑高度、密度、退线 | 无控规与审批语境 | 概念容量区间与设计原则（用地与建筑章） |
| 拆改留比例与具体名单 | 无地块权属与建筑现状数据 | 拆改留分档排序与试点单元 JZ-01 先行验证（更新项目清单章） |
| 土地权属与处置结论 | 权属资料缺失（assumptions.json A-CONTROLS-001） | 更新利益协调机制建议与申诉路径 |
| 审批判断与实施承诺 | 方案非审批主体 | 申报要件+通过证据+未通过处置（脉冲协议 P1–P4） |
| 官方背书与"已确定政府决策"表述 | 无任何授权 | 全部机制标注"概念建议"，边界以法定为准 |
| 个人数据画像与行为轨迹采集 | 隐私底线（个人信息保护法） | 聚合统计、数据最小化、留存期上限（第六章逐卡声明） |
| 文物保护干预方案 | 无文保介入资格 | 低干预原则+展示装置可撤回+冲突以撤回为默认路径（本章文保专项） |

八项纪律与边界条款逐条对应（agent_taskbook.boundary_clause 的"土地权属、投资测算、开发时序和审批判断"），并落实为 compliance_matrix.json 与 risk.json 的登记项；若任何一项被误读为正式结论，以本清单为澄清基准。

**逐资产权利摘要（机器可核验的许可台账）**：全部 52 个资产文件的来源、制作方式与许可状态逐项登记于 `report/copyright_statement.md`（逐资产台账 52 行）；下表为评审需要的核心摘要——每类资产给出制作链路、权利状态与核验位置，评审无须信任自述，只须打开台账对应行核对：

| 资产类别 | 来源/制作方式 | 许可/权利状态 | 核验位置 |
| --- | --- | --- | --- |
| 正文与结构化数据（proposal.md/en、12 个 JSON） | agent 依据任务书与注册来源生成 | COMMUNITY-DISPLAY-ONLY（manifest 登记） | copyright_statement.md 第 1–2 行、sources.json 18 条注册 |
| 几何图层（9 个 geojson） | 由官方 provisional_boundaries.geojson 派生 + agent 概念生成 | Provisional；不声称官方边界（PROV-KEY 标记） | copyright_statement.md 第 3–11 行、assumptions.json |
| 六张图件 × zh/en（12 个 png） | matplotlib 自提交几何与指标渲染（固定画布） | Agent 生成；无第三方图像 | copyright_statement.md 第 12 行 |
| A3/A0 图纸（4 份 pdf） | reportlab 自提交几何与指标渲染 | Agent 生成；无第三方图像 | copyright_statement.md 第 13 行 |
| HTML（proposal.html/en、index.html/en） | agent 生成单文件静态页 | 零外部请求：无远程脚本/瓦片/字体/iframe/表单/API | copyright_statement.md 第 14 行 + 离线断言（全文检索外部 URL 应为 0 命中） |
| 音频导览（audio-tour.mp3/vtt/md） | edge-tts 系统音合成，字幕与文字稿同源 | Agent 生成；无第三方音频与音乐 | copyright_statement.md 第 28–29 行 |
| 多模态短片（pulse-belt-tour.mp4，171.6 s） | 六图＋旁白合成（imageio-ffmpeg） | Agent 生成；无第三方实拍素材/音乐 | copyright_statement.md 第 30 行 |
| Logo 图元与 VI 规范 | agent 设计概念（"脉"字＋铁轨—波形母题） | 概念建议，落地前须经官方审批 | copyright_statement.md 第 32 行 |
| 底图/影像 | 无第三方底图；全部地图内容来自提交 GeoJSON | n/a | copyright_statement.md 第 33 行 |
| 字体 | 仅系统字体：SimHei（随 Windows 授权）、DejaVu Sans（OFL，随 matplotlib 捆绑） | 本包不复制、不分发任何字体文件 | copyright_statement.md 第 34 行 |
| 合成语音 | edge-tts 在线神经语音（仅生成时使用） | 包内不携带语音数据 | copyright_statement.md 第 35 行 |

台账口径与本表一致：不能证明再分发权的资产不进入投稿；任何超出展示与评审用途的使用须另行清权（公告知识产权条款 8.1 边界）[source:OFFICIAL-ANNOUNCEMENT]。

**防自证边界（概念建议）**：本章不自证"方案无风险"，而是把风险三重外置——**边界外置**：法定/管制边界高于方案自设机制，冲突时以法定为准；**证据外置**：一切主张挂接可复核的登记、台账与几何图层，不依赖方案自述；**处置外置**：异常与回滚由公开节拍驱动，处置记录全部公开。评审无须信任方案的自述，只须核验登记。为落实边界外置，每一项自设机制同时声明其法定边界与空间后果：

| 本方案自设机制 | 法定/管制边界 | 方案自设部分 | 空间后果 |
| --- | --- | --- | --- |
| 脉冲协议 P1–P4 | 规划审批、行业监管与法定评估 | 协议为运行机制建议，不替代审批 | 申报台、沙盒、档案墙均为可逆公共设施 |
| 拆改留分档排序 | 控规、权属与文保法定程序 | 只给排序不给比例，官方数据发布前不构成结论 | 不产生任何拆除承诺 |
| 低空配送概念航线 | 空域管理规章 | 概念航线，空域审批未过不开通 | 起降点用地可回退绿地 |
| 无障碍 AI 导行 | 无障碍环境建设法 | 现场核验不符即停用，人工替代率 100% 兜底 | 导航桩可移除，保留人工引导台 |
| 数据最小化 | 个人信息保护法 | 留存期上限 30 天、不采集敏感信息 | 数据删除确认入 P4 复盘 |

**风险与缺资料清单**：official boundary、key area、控规、道路红线、地块权属、建筑现状、市政管线、文保与公共服务缺口均进入 `assumptions.json`（[assumption:ASSUME-001]/[assumption:ASSUME-002]/[assumption:ASSUME-003]、[assumption:A-CONTROLS-001]、[assumption:ASSUME-004]）与本节；任何缺少官方控规、道路红线、权属、市政、消防或文保条件的结论均降级为待确认事项 [depth:risk_missing_data] [data:geometry/constraints.geojson#CONSTRAINTS-01] [source:SITE-PACKAGE]。

**风险登记与人工复核清单**：八维风险清单（数据隐私、实施复杂度、公众接受度、运维成本、政策不确定性、空间争议、技术成熟度、公平与包容性）逐项登记于 `risk.json`，其中实施复杂度与政策不确定性为高关注项并附人工复核要求 [depth:risk_missing_data] [data:risk.json]；十九项概念节点、廊道与区域登记于 `spatial.json`（disclaimer=concept-only，3 重点区+4 廊道+12 节点，可逐项打开核对），全部为概念表达、不代表审定结论，概念对象按 `public_level=public/cleared` 标注，供方案卡片公开展示 [data:spatial.json]；对应几何仅在 `geometry/*.geojson` 中以 `provisional_constraint` 呈现，其中 3 项重点区边界（PROV-KEY-001/002/003）不升级为官方边界、不构成实施承诺 [data:geometry/key_areas.geojson#PROV-KEY-001]。

**风险监控节拍（概念建议）**：风险登记（`risk.json` 八维清单与五类回滚触发器 R-01–R-05）配套固定监控节拍，避免"登记即搁置"：

| 节拍 | 监控动作 | 责任主体 | 异常处置 |
| --- | --- | --- | --- |
| 即时（事件驱动） | 五类回滚触发器判定（安全/隐私/文保/经济/生态）[data:risk.json#rollback_trigger_registry] | 运营主体 | 触发即执行预案分级 |
| 每日 | 状态灯、运行台账与投诉入口巡检 | 片区站 | 异常 24h 内挂起 |
| 每周 | 事故与投诉摘要、数据边界抽查 | 运营秘书处（建议） | 摘要公开 |
| 每月 | 公众反馈复核、隐私日志抽样 | 公众委员会 | 发现项进台账 |
| 每季 | 独立复测、安全演练、无障碍现场核验 | 第三方+残联 | 复测报告公开 |
| 年度 | P4 复盘、续办听证、风险清单重评 | 秘书处+委员会 | 决议公开留存 |

**应急预案分级（概念建议）**：场景异常按三级响应处置，处置记录全部进入失败公开记录与 P4 复盘：

| 响应级别 | 触发情形 | 处置动作 | 时限 |
| --- | --- | --- | --- |
| 一级·即停 | 人身安全事故、隐私泄露、文保构件冲突（对应 R-01/R-02/R-03） | 立即停用、人工接管、现场警示 | 30 分钟内人工接管 |
| 二级·限期整改 | 机械故障、内容投诉、能耗失控、数据留存越界 | 停用或降级运行，限期修复后复测 | 24h 内给出处置方案 |
| 三级·观察调整 | 准点率下滑、参与率不足、爽约率偏高 | 台账监控、参数调整、运营复盘 | 7 天内调整并公示 |

**证据失效级联降级**：若本方案引用的任何来源（`sources.json` 登记条目或官方数据）被撤回、失效或修正，对应主张、指标、图件与合规矩阵条目同步降级为待确认，并重算受影响几何与指标；降级记录进入变更记录与脉冲协议 P4 复盘。

**文保专项（概念建议）**：清华园车站遗址与沿线历史构件一律低干预处理，AI 展示装置全部站外可撤回、不依附文物构件、不改变遗址结构；大钟寺周边设计以风貌协调为底线，与文保单位的冲突处理以撤回方案为默认路径。

**术语一致性**：核心概念（智脉一带、一带三核、脉冲协议等）的中英文译法以 `docs/terminology-glossary.md` 为准，中英两文件逐段对齐（bilingual_contract_version 1），A3/A0 图纸与 HTML 采用同一术语体系。

**人工签署前的双语实质等价核查**：中文主文件与英文译稿以同一事实骨架分别专业写作，代理辅助的逐对核查比较 `proposal.md`/`proposal.en.md`、四份 HTML、十二张含文字图件与四份 PDF 的标题、数字、证据等级、来源状态、警示语与图位；固定 ID（JZ-01–12、SC-01–12、E0–E4、G0–G7/C0–C7、R-01–05）、关键计数（12 项更新项目、12 张场景卡、120 条合成检查、9 类图层、15 项服务）、三档成本量级与"概念建议/待确认"边界逐项一致。中英版允许段落长度与构图留白不同，但不得新增另一语言没有的事实、承诺或现状断言。当前记录为 `agent_checked_pending_named_human_signoff`——在具名人工复核者签署前，不自称已完成人工翻译审定；该核查是投稿 QA，不是翻译、版权或无障碍认证。

本方案不声称官方批准、审定控规、最终土地权属、最终建设规模或保证实施。AI agent 对事实、来源、版权、空间数据、指标与表达负责；维护者和专业评审可依据自检结果、空间复核与合规矩阵要求返修或拒绝。

## 参考资料

- brief/public-brief.md
- brief/site-package/design_brief.json
- brief/site-package/agent_taskbook.json
- brief/site-package/allowed_design_space.json
- brief/site-package/enums/
- brief/site-package/ranges/planning_limits.json
- brief/site-package/geometry/provisional_boundaries.geojson
- data/source_registry.json
- data/processed/agent_fact_pack.md
- 同行参考：open-city-ai/haidian 已合并案例「人字智带」（PR #1701）、「The Living Rail」（PR #925），用于机制转译边界与表达深度对照 [source:PEER-REFERENCE]
- 标准响应与机器索引：`standard_matrix.json` 十四项标准响应（九项规划/治理法规 + 五项技术标准）及 data_gap 说明；完整出处与许可以场地包登记为准，见 `sources.json`、`metrics.json`、`compliance_matrix.json`、`standard_matrix.json` 与 `design_depth_matrix.json` 结构化清单 [source:SITE-PACKAGE]
