# 方案迭代记录

## v2.51 - 2026-08-10

- 将 O4 的合成满意度代理拆成时间、等待、拥挤、路缘、无障碍、可靠性和人流冲突七项可回读组成，66.44 的总分由组成项重构得到，误差不超过 0.05。
- 新增 `utility-welfare-screen.json`、`utility-welfare-readout.json`、双语数据图板和 `run-utility-welfare-screen.js`，把六类群体、四个候选与硬门放在同一张证据屏上；居民满意度调查响应数保持为 0。
- 将代理拆解接入区域 runner、compact readout parity、claim audit、评审导航、双语 proposal 和 manifest。它是合成聚合屏查，不能替代居民满意度、员工偏好、公众接受度或现场运营绩效。
- 第一名项目、公开榜单文件、Mobility 历史最高分保护线、官方临时边界和空中候选 `blocked` 状态未改动。

## v2.50 - 2026-08-10

- 将区域通勤首屏标题与状态徽标改为“人口规模压力测试／合成回放完成”，同步中英文 SVG、PNG、正文和 HTML alt，避免把 3,122,000 的人口规模参考误读成真实通勤覆盖；模拟读数、输入和评分保护线未改变。
- 新增 `activity-completion-screen.json` 与 population-scale activity-chain runner：四个地面情景各遍历 3,122,000 名合成代理，分开记录准时闭合、延误、有限延期、主要活动不可达和返程未闭合。
- 新增双语活动链状态图板并接入 proposal、离线 visual index、claim audit、评审导航和 manifest；名义 O4 链闭合 91.06%，压力情景失败保留为 `stop_and_calibrate`，不写成现场韧性或居民结果。
- 地面回退限定为一次且受容量/可达性约束，步行/无障碍来源不静默改道，空中候选继续 `blocked`；第一名项目、公开榜单文件、官方临时边界和分数保护线未改动。

## v2.49 - 2026-08-10

- 新增方式参数与方式权重逐项溯源，234 条声明字段明确为 `agent_proposed` 或 `design_target`，现场观测数保持为 0，并新增双语校准债务图板。
- 新增企业与居民公共决策凭证，登记八类公开问题、授权输入、责任人、回复凭证、申诉、暂停和撤回路径，响应 Issue #1061 对现场证据与公众意见边界的反馈。
- 新增居民参与方法参考和 Issue #1061 来源记录。所有字段继续保持 `not_authorized_not_run`，不修改模拟数值、临时几何、第一名项目、公开榜单或官方评分文件。

## v2.48 - 2026-08-10

- 新增双语 `mobility-ordinary-journey-contract.json`，用一个合成照护者把 AI 原点社区、大钟寺、无障碍走查、人工换乘、断网回退、返程和投诉复核连成六步普通人经历。
- 新增 `run-mobility-ordinary-journey.js` 与 evidence readback，复演 8 项验收、6 个负例、3 个正常样本和 5 个回滚动作；不联网、不接触个人数据、不产生现场结论。
- 将四个由回放主动暴露的现场缺口保留为 `unknown`，没有用合成交通读数替代日期化无障碍走查、返程服务、站口责任或投诉回应时长。
- 新增中英双语普通人经历图板并接入离线 visual index、双语 proposal 和评审导航；临时几何、现场未知、`not_authorized_not_run`、空中候选 blocked 和分数保护边界保持不变。

## v2.47 - 2026-08-10

- 响应 Issue #1368，将包完整性、内容评审资格和官方空间数据依赖的正式专业评分资格拆成三条状态轴。
- 新增双语 `review-status-contract.json` 与状态图板，明确 `package_state=ready_for_review`、`content_review_eligible=true` 和 `professional_scoring_eligible=false` 的各自含义与阻断项。
- 评审状态板只澄清资格语义，不新增现场数据、模拟输入、官方边界、实施许可或榜单文件；第一名项目保持不变。

## v2.46 - 2026-08-10

- 在已有群体满意度和通勤时间尾部之外，新增可达性代理 P10、P50、P90 分箱，并把最低群体的 P10 差距接入名义与压力候选门。O4 名义读数为 5 个代理点，O2 强天气压力读数为 20 个代理点，门槛分别为 20 和 30 个代理点。
- 新增双语 `distributional-accessibility-board` 及离线生成器，把六类合成群体、最低一成、总体分位线和两套门槛放在独立读出面；区域证据链由六个视角扩展为七个视角。
- 正文、claim audit、评审导航、区域读出和 manifest 对齐到 v2.46。可达性读数仍是合成充分性屏查，不替代居民体验、无障碍走查、服务审计、运营承诺或现场绩效；未修改第一名项目、公开榜单文件和官方临时边界。
- 参考分组交通公平研究使用分布尾部和充分性门槛的检查顺序，未导入外部人口属性、系数或海淀现场结论 [source:TRANSPORT-EQUITY-DISTRIBUTION-2023]。

## v2.45 - 2026-08-10

- 参考分组交通公平研究，把同一份区域 runner 的每人合成时间和综合出行压力按六类群体做分箱回读，新增各组 P50/P90 时间、满意度代理 P10/P50/P90、最弱群体 P10 和分布差距。
- 保留群体满意度均值差距 12 分硬门，并新增群体满意度 P10 差距 20 分名义门；四类压力情景分别用 18 分均值门和 30 分 P10 门，分布读数同时进入候选排序与稳健性回读；O4 仍为名义候选，O2 仍为稳健性参照。
- 新增双语 `distributional-equity-board`，更新区域 runner 的六视角证据链；所有读数仍标记为合成屏查，不替代居民调查、日期化 OD、现场无障碍审计或运营绩效。
- 未修改第一名项目、公开榜单文件或官方临时边界；本轮仅扩大可复核的群体分布证据。

## v2.44 - 2026-08-10

- 对照 Issue #1058 的 manifest schema 迁移边界，将本轮新增的区域通勤双语 PNG 登记为 canonical `proposal_figure`，不改写交通包既有 legacy role，也不批量触碰其他投稿。
- 重新核对新增文件的双语对应关系与 SHA-256；本次只修正 manifest 语义，不改变图面、仿真输入或任何指标读数。

## v2.43 - 2026-08-10

- 将区域级 3,122,000 合成代理的全量通勤读出提升为标准 `metrics-evidence` 双语看板，让首轮视觉评审先看到人口覆盖、方式重分配、容量门槛、无障碍代理、外部汽车流入与聚合动线。
- 修正英文区域看板的长标题与边界标签，统一图板角标、双语 PDF 和 manifest 的版本链；不新增现场客流、居民满意度、运力或运营结果。
- 保持 AM 去程与 PM 返程的质量守恒、合成代理、临时几何和空中出行 blocked 边界；第一名项目与公开榜单文件未修改。

## v2.42 - 2026-08-10

- 针对 Issue #951 补充包内来源登记边界，明确 `sources.json` 是本方案的完整来源记录；中央 registry 的缺席不能单独构成批准、禁止或风险扣分依据，社区来源仍按用途和证据强度受限使用。
- 对照当前上游主线补入无障碍环境建设法、适老化服务政策和生成式人工智能服务管理暂行办法的来源与标准映射，写清它们能支持什么以及不能替代什么。
- 把 P0 证据计划改成有顺序的公示、分组 OD、无障碍与人员动线走查，登记拟由交通主管部门、街道、残联或专业复核机构和老年人代表承担的角色；这些角色仍未确认或分配。
- 将顶层证据台账从 4 项未知扩展为与 `metrics.json` 一致的 18 项，并为每项挂上风险维度；不新增现场数据、模拟读数或运营结论。
- 中英文正文保持同一证据边界，第一名项目和公开榜单文件未修改。
- 将中英文 proposal front matter 的迭代号与本记录的最新版本统一为 `v2.42`，并重新生成报告与 manifest 哈希。
- 参考 Issue #1119 的 Switchback Protocol 增加有署名的状态、回退、复核、申诉和回写 crosswalk；不复制其机器 schema、数值默认值或授权含义。
- 新增三节点普通路线连续性合同、四类读者检查和 10 个正负 fixture；阻断、交接不可见、无纸面/电话入口或 baseline 越界时均 fail-closed。
- 新增 M-01 至 M-10 逐行场景—节点—运营合同，补上触发、通过、责任、证据、失败动作和非 AI 等价服务，并以 4 个负例回放验证。
- 新增独立 `verify.js`，检查 provisional 节点锚点、关系道路、分析图网络、十张场景卡与运营合同；5 个 self-test 覆盖边界升级、节点丢失、未知节点和现场状态冒充。
- 清理当前交通包中的旧身份/跨包引用，保持本包独立 scope、`unknown` 基线、`not_authorized_not_run` 和不构成实施/许可的边界。
- 吸收 Issue #1029 的位置边界反馈，明确 `PROV-KEY-003` 沿用临时源几何且不由投稿者自行平移；将官方锚点发布后的整包重算触发器写入 assumptions、正文和证据状态。

## v2.38 - 2026-08-10

- 把风险登记、证据等级和品牌体验段落改成更直接的中英文表述，去掉提示式冒号和破折号；没有改变模型、数据、实施边界或第一名项目。

## v2.37 - 2026-08-10

- 新增根目录 `risk.json` 与 `visual/assets/mobility-risk-register.json`，把八个风险维度、18 个 unknown 指标、证据路径、触发条件、人工等价入口、停止动作和责任角色收成一条可回读链。
- 新增 `run-mobility-risk-audit.js`；检查风险状态仍限定为 `controlled_by_gate`、`unknown`、`blocked_until_evidence` 或 `not_started`，所有未知指标均被覆盖，空中地面接驳保持 `blocked_until_evidence`。
- 中英文正文和评审导航前置风险登记入口；这只是包内风险/证据链接，不是现场风险评估、专业签字、运营许可、公众同意或官方评分。
- 不新增现场 OD、居民/企业访谈、班次、容量、权属、空域或绩效数据；保留 provisional geometry、合成代理和普通公共交通/人工回退边界。
- 在中英文群体运力图和容量闭合图中显式区分 O4 基础压力屏与声明输入下的反事实闭合敏感性。
- 保留现有 332,639 人次容量溢出代理与 +301,925 声明服务单元，不新增运力、班次、采购、居民绩效或实施主张。
- 让“补给后队列为零”只表示模型屏查闭合，不再让读者把它读成当前运营能力；同步双语图题、图注和证据边界。
- 修正居民运力图的 1.00× 与 1.35× 参考线坐标，并把容量闭合免责声明移到同源 ribbon 之前的独立区域，避免刻度误读和文字遮挡。

## v2.36 - 2026-08-10

- 在中英文交通设计依据入口前置六层证据等级表，把任务/政策、临时空间、包内读数、合成代理、背景方法和尚未取得的现场基线分开。
- 为每层同时列出可支持与禁用结论，并明确 `known`、`unknown`、`design_target`、`blocked` 和本地 PASS 不代表现场绩效、专业批准、P1/P2 授权或竞赛分数。
- 重新生成双语 proposal report，并刷新 manifest 与清权台账哈希；不改变 provisional geometry、交通指标、运行边界或公开排序。

## v2.35 - 2026-08-10

- 新增三处重点区的中英双语地面界面图，分别把企业到岗、居民日常和轨道换乘画成普通人能先读懂的入口、等待、停放、求助与回退关系。
- 只画可撤回的地面动作，不新增体量、层数、客流、容量、产权、路权或运行许可主张；同步任务书交叉表、评审导航和双语视觉页入口。
- 同步中英文 claim-audit 与视觉页的数字措辞，修正 `BLDG-001` 回接并让合成读数补充可由同源 runner 回读；这些数字仍不代表现场绩效。
- 统一 proposal、proposal.en 与 changelog 的迭代版本；保留 provisional 几何、unknown 基线、空中候选 blocked 和第一名项目不变。
- 将 6 张中英地面界面图纳入 `run-presentation-polish.js` 的可重跑检查，核对文件、viewBox、矩形边界、双语关键语义和文本对照；脚本 PASS 仍只代表图面结构可读，不代表现场无障碍、值守或运营结果。
## v2.34 - 2026-08-10

- 新增中英双语任务书交叉表，把 agent.1 至 agent.6 对应到本交通包的正文入口、图件、结构化证据和未声称边界。
- 新增任务书交付交叉图板，让评审先看交通包实际负责什么，再进入长篇证据链；图板是导航，不是评分。
- 修正任务书覆盖的表达层级，明确整带品牌、产业生态、文化系统、地标和年度活动不由本交通包冒充完成。

## v2.33 - 2026-08-10

- 新增 `m09-curb-spatial-prototype.json` 与中英文节点级路缘功能带表，把 M-09 从 readiness 字段接回人行连续、人工交接、可关闭服务窗口和应急退避。
- 删除三处重点区中未被现场资料支持的 FAR、层数和高度范围，改为公共界面与可逆服务关系；正式强度、体量、容量和上部高度继续待专业资料。
- 保留 provisional geometry、unknown、not_authorized_not_run、人工/公共交通回退和不构成实施/许可的边界。

## v2.32 - 2026-08-10

- 将 M-09 四条合成请求各自补成 pilot-readiness card，逐项登记 baseline、观察对象/样本/时间窗、成功与停止条件、责任和独立停机复核、人工等价服务、保留/删除边界、复核周期与申诉入口。
- 新增 `mobility-pilot-readiness.json`、固定回读证据和负样本 runner；故意删除 owner、填入观察值或删除凭证的样本均被拒绝。
- 维持 `unknown`、`not_available_before_authorization` 与 `not_authorized_not_run`，不把 readiness PASS、桌面演练 PASS 或论文方法写成现场基线、P1 资格或运营结果。
- 收敛 v2.31 的可见表达：用两句验收入口说明替代重复的四行 M-09 摘要表，保留 fixture 回读、冻结/回退/缺口/P1-P2 判据和 `performance_results=null` 边界。
- 将三处公告约面积从体量表列收敛为一条任务尺度说明，保留 provisional、未知现状和不构成控规指标的边界；恢复简洁的空间体量表，减少审计腔和重复内容。
- 本轮针对合并 head 63/100 的可读性回归修复，不声称官方提分、实施授权或公共 gallery 发布。

## v2.31 - 2026-08-10

- 在中英文一页执行摘要中把 M-09 的 4 条合成请求、4 个触发事件、回退路径和 PASS 判据逐项配对，令离线桌面演练成为可见的空间验收入口；保留 `performance_results=null` 与 `not_authorized_not_run` 边界。
- 在三处重点区体量表增加公告约面积作为任务尺度锚点，明确它不是现状建筑面积、地块边界或控规指标；不补写未经资料支持的上部高度、现状建筑或客流数据。
- 保留中英双语一致、临时几何、现场未知值、可逆试点和第一名项目边界。

## v2.30 - 2026-08-10

- 新增中英文“为什么这是京张的公共空间方案”入口，把百年京张、AI 创新带、区域协作、可感知 AI+、双语传播和长期运营翻译成站口、公共空间、建筑首层、路缘和维护点五类真实空间界面。
- 这不是关键词清单：企业、高校、社区和维护者仍按待核角色进入时段账本，历史、合作、活动、许可和绩效均未被写成事实；新增内容只补任务书响应和空间叙事，不改模拟输入或指标。
- 保留三处 provisional 重点区、可逆设施、人工回退、未知基线和第一名项目边界。
- 中英文正文收敛到同一份标题、图件和证据顺序，删除合并主线后遗留的重复审计导航；不减少正式章节和结构化证据。
- 场景卡板改为按字段长度自动换行和自适应卡片高度，品牌板与场景板的离线索引更新改为幂等，重复回放不会叠加区块。
- 保持 3,122,000 人合成回放、现场未知边界、空中候选阻断、第一名项目路径和公网发布状态不变。

## v2.29 - 2026-08-10

- 删除中文 proposal 末尾重复的“证据回读”审计块，把空间判断保留在对应正文段落，减少重复导航和审计腔。
- 在中英文重点区设计入口补充众智园、AI 原点社区、大钟寺的概念 FAR、公共界面层数、空间动作与首要专业证据；范围仅用于方案比较，不替代控规、许可、测绘或建设承诺。
- 保留 provisional 几何、现场未知值、可逆试点、人工回退和第一名项目边界不变。

## v2.28 - 2026-08-10

- 新增中英双语 `mobility-spatial-plan.svg`，把三处 provisional 重点区、概念关系线、对外通勤接口和五种路缘状态放回一张空间关系图；图件明确不表达官方红线、现状站点容量或实测 OD。
- 在区域 runner JSON 和五张相关图板中增加 evidence chain，按“区域覆盖 → 网络边节点 → 运力缺口 → 资源敏感性 → 稳健性”说明同一份合成聚合证据的五种读出，避免重复读数被误解为独立结果。
- 中英文 proposal 增加普通人阅读入口，减少模型版本流水对正文的干扰；不改变任何合成输入、候选读数、现场未知边界、空中候选阻断、第一名项目路径或公网发布状态。

## v2.27 - 2026-08-10

- 将 M-01 至 M-10 十张场景卡补成逐场景启动检查，分别登记责任角色、最小证据、物理核对、人工/公共交通回退和缺证据时的停止动作。
- 新增 `visual/assets/pilot-startup-checklist.json` 与离线校验器，核对十张卡覆盖、证据路径、人工回退和 `not_authorized_not_run` 边界；不虚构启动日期、合作方、许可、预算或现场效果。
- 中英文 proposal 和评审索引新增“试点什么时候能开始”入口；不改变 3,122,000 人合成模拟、容量与回退读数、空中候选阻断、第一名项目路径或公网发布状态。

## v2.26 - 2026-08-10

- 增加四类人入口，把居民、企业员工、照护与无障碍、对外通勤分别写成可核对的情景，不把它们写成已验证需求。
- 增加中英文“失败与回退”图板，按容量压力、硬门缺证和回退不足画出冻结、人工/公共交通接管、记录和回到 P0 的顺序；阈值沿用现有 network-flow 与 resilience readout 的设计门槛。
- 更新评审导览与离线 visual index，标出首要读者和失败入口；不改变合成模型、unknown 状态、空中候选阻断、第一名项目路径或公网发布状态。

## v2.25 - 2026-08-10

- 新增 `visual/assets/site-and-stakeholder-evidence.json`，逐项披露是否到场、公开与经授权资料边界、推断需求、受影响群体、未解决反对意见和 P0 证据任务；不填居民访谈、企业协议或现场绩效。
- 在 assumptions 和中英文 proposal 前置现场/利益相关者证据状态，把“谁受影响、什么仍未知、怎样才能进入 P1/P2”写成普通人可读的入口。
- 不改变任何合成模型输入、候选读数、容量屏查、空中候选阻断、第一名项目路径或公网发布状态。

## v2.24 - 2026-08-10

- 将中文 proposal 的长句、标题标点和“人不是流量点”等表达改为更直接的公共文本，保留合成读数、未知边界、空中出行阻断和人工回退的原意。
- 在中英文 proposal 中明确 O4 只是声明输入下的名义筛选候选，O2 只是压力情景下的稳健性参照；两者都不能替代现场数据或授权实施。
- 同步迭代号；不改动模型输入、候选读数、图件内容、第一名项目路径或现场证据边界。

## v2.23 - 2026-08-10

- 将 headline 数字统一改称“综合出行压力代理分”或明确的合成屏查读数，避免把模型字段 `satisfaction_proxy` 读成居民调查或公众接受。
- 新增 `visual/assets/claim-audit.json` 与 `run-claim-audit.js`，对中英文正文中的 9 个关键数字检查状态标签、同段边界、来源 runner 和禁止的居民满意度 headline。
- 在双语 proposal 前置四类读数标签，补充一份评审可以在短时间内复核的主张披露入口；不改变任何模型输入、数值、候选排名或现场证据边界。
- 保留“合成、设计闸门、文件已知、待正式数据补齐”的区分；claim audit 是披露自审，不是模型有效性、居民满意度、专业审批或实施授权证明。

## v2.22 - 2026-08-10

- Replayed the full population-scale mobility evidence package onto the current mainline and kept the regional, capacity, network-flow, resource-pressure and resilience readouts together.
- Retained the current 29-record metrics schema audit (`known=11`, `unknown=18`) and the closed projected-length formula expression without changing metric values, sources, statuses or claim boundaries.
- Recomputed the manifest after resolving the mainline metric-schema entries; no first-place package path is included in this change.

## v2.21 - 2026-08-10

- Added a deterministic recovery-time ledger that consumes the existing B3 synthetic runner output and exposes three events × seven groups without changing model inputs.
- Added bilingual `resilience-recovery-board.svg` figures with fallback coverage, TTR gates, slowest-group comparison and a seven-group matrix.
- Kept all TTR values explicitly synthetic recovery-time proxies; no incident-response, local resilience, accessibility-audit or p90 claim is made, and the air candidate remains blocked.
- Persisted `candidate_selection_audit` in `regional-scale-commute-readout.json` for the O1/O2/O3/O4 nominal and robustness rankings, including processing, mass-conservation, hard-gate and privacy metadata from the deterministic runner.
- Added `run-regional-readout-audit.js` to compare the committed compact readout with a fresh deterministic runner replay.
- No local field, operations, performance or rights claim added; unknowns remain unchanged.

## v2.20 - 2026-08-10

- Added a bilingual relative resource-pressure ledger linking synthetic passenger-kilometres to replaceable external mode-intensity references.
- Added deterministic `run-resource-pressure-screen.js` and readout checks for all 3,122,000-agent scenarios, known-mode mass conservation, explicit enterprise-shuttle unknowns and the air-mobility gate.
- Added polished bilingual `resource-pressure-board.svg`; O4’s known-mode relative index is 30.4% below B0 under the declared screen, but no local energy, fuel, emissions, fleet or environmental-benefit claim is made.
- Added EEA and NCHRP method references with a strict boundary against importing external averages as Haidian coefficients.

## v2.19 - 2026-08-09

- Added a bilingual population-scale network-flow screen that expands the same 3,122,000-agent regional replay into declared node/edge paths for metro, bus, bicycle, walking/accessibility, car and enterprise shuttle.
- Added deterministic edge/node pressure, time-slice, group, OD and vehicle/service-equivalent ledgers with mass-conservation, accessible-corridor and air-gate checks.
- Added polished bilingual network-pressure boards; kept all graph, capacity and performance values explicitly synthetic and non-operational.

## v2.18 - 2026-08-09

- Added a bilingual seven-dimension reviewer evidence index that maps each rubric dimension to the shortest package entry, strongest evidence surface and remaining boundary; it is navigation only, not a score or implementation claim.

- Added a bilingual one-page executive brief at the top of both readable proposals.
- Bound one ordinary-person door-to-door chain to choice, request, takeover, fail-closed exit and independent replay.
- Kept the M-09 evidence explicitly synthetic/offline with `performance_results=null` and `operational_status=not_authorized_not_run`.

## v2.17 - 2026-08-09

- Added a bilingual capacity-closure screen and deterministic runner that independently scans the smallest synthetic service-unit multiplier for metro, bus, bicycle, walking/accessibility, car and enterprise shuttle under the 1.35x peak-load and zero-residual-queue gate.
- The screen exposes the O4 declared-input gap (+301,925 service units in the combined counterfactual) while keeping the result explicitly non-operational: no local timetable, procurement, fleet, permit or performance claim is made.

## v2.16 - 2026-08-09

- Added bilingual `mobility-tabletop-board.svg` data boards so the M-09 trigger → freeze → fallback → log → review contract is legible at a glance.
- Kept `performance_results=null`, `local_baseline=unknown`, `gate_effect=none` and `not_authorized_not_run` prominent on the board; the visual does not turn an offline rehearsal into local performance evidence.

## v2.15 - 2026-08-09

- Added a minimum offline tabletop for the existing M-09 storm/network-outage fallback path.
- Added a machine-readable contract, deterministic replay runner and evidence output for four synthetic requests, six acceptance checks and five reversible rollback steps.
- Kept `performance_results=null` and `operational_status=not_authorized_not_run`; the rehearsal does not claim staffing, accessibility performance, public acceptance, safety or implementation.

## v1.0 - 2026-08-09

- Created an independent enterprise–resident mobility submission package.
- Replaced autonomy-first narrative with demand ledger, curb states, rail/bus feeder logic and four service levels.
- Added Beijing transport and Haidian parking-service evidence, employer TDM and curb-management research.
- Regenerated bilingual figures, offline visual pages and A3/A0 boards.

## v1.2 - 2026-08-09

- Added an explicit multi-agent queue/network sandbox for residents, enterprise employees, carers/children, visitors, logistics, night workers, metro trains, buses, bicycles, cars, walking/wheelchair flows and the gated air candidate.
- Added synthetic, clearly non-local readouts for queues, station load, transfer wait and curb service, with a calibration list for dated OD, headways, capacity, signals, conflicts and accessibility.
- Refreshed the simulation and evidence boards and added bilingual model-object diagrams with readable units, thresholds, status gates and source notes.

## v1.3 - 2026-08-09

- Added inspectable trip-leg templates for external enterprise commuting, resident services, shuttle transfers, logistics windows and ground-first air fallback.
- Added a dependency-free deterministic runner at `visual/assets/run-mobility-simulation.js`; it recalculates grouped mode shares, service supply, one-minute queues and calibration fields without network access.
- Added activity/agent-based multimodal and grouped accessibility method references; formal calibration now calls for mode share, road/curb volume, door-to-door time, distance and distributional access checks rather than a single efficiency score.

## v1.4 - 2026-08-09

- Added machine-readable `model_family` and `model_detail` disclosure fields while retaining the legacy `model` field for compatibility.

## v1.5 - 2026-08-09

- Added B1, a deterministic enterprise-only flexible arrival-window sensitivity test: 20% of the declared enterprise demand is shifted later across a wider window while resident, care, visitor, logistics and night-worker demand is protected.
- Kept B1 separate from the headline scenario score: it is a method-informed design sensitivity, not a local mode-choice effect, and it requires grouped OD/mode-share calibration before operational use.

## v1.6 - 2026-08-09

- Added bilingual `activity-adaptation.svg` evidence boards so the B1 enterprise flex-window readout is visible in the proposal, not only in the JSON runner output.

## v1.7 - 2026-08-09

- Added explicit B1 guardrails and calibration fields for employee schedule acceptance, rescheduling cost, transit timetable compatibility and grouped mode-share change; queue reduction alone is not treated as an operational optimum.

## v1.8 - 2026-08-09

- Added a machine-readable behavioural choice contract for grouped mode/departure-time choice, cross-boundary OD, generalized-cost components and hard-gate ordering; it imports no paper coefficients.
- Added bilingual `multimodal-choice-board.svg` evidence boards for enterprise, resident, care, logistics and night-worker journeys, with the air candidate visibly blocked until review gates pass.
- Added current departure-time/crowding and transit-oriented UAM method references; the B1 board now identifies the JSON model version consistently.

## v1.9 - 2026-08-09

- Added B3 ground-resilience and equity sensitivity for nominal operation, a 30-minute metro disruption and severe-weather bicycle suppression with declared bus fallback.
- Added deterministic fallback coverage, queue person-minutes, slowest-group gap/recovery proxies and fail-closed policy thresholds; no synthetic value is presented as local p90 or resilience performance.
- Added bilingual `resilience-equity-board.svg` evidence boards and method references on multimodal resilience and agent-based transport equity.

## v2.0 - 2026-08-09

- Added bilingual `system-efficiency-board.svg` evidence boards that put candidate efficiency, grouped enterprise/resident demand, hard gates and the S1 readouts on one version-consistent v1.3 surface.
- Replaced the proposal and offline visual-page simulation image references with the v1.3 board; the retained v1.2 raster remains an historical source asset rather than the current evidence surface.

## v2.1 - 2026-08-09

- Added `regional-scale-commute.json` and `run-regional-commute-simulation.js`: a deterministic 3.122-million-agent synthetic morning-flow stress test that processes every declared population-scale agent and publishes only group, zone, mode and route-template aggregates.
- Added B0/O1/R1 comparison outputs for mode reassignment, p50/p90 travel-time proxies, generalized cost, accessibility completion, people-flow conflict, external-car inflow and a clearly labelled synthetic satisfaction proxy.
- Added bilingual `regional-scale-commute-board.svg` evidence boards and an official population-reference citation; actual workforce shares, OD, capacity, performance and satisfaction remain calibration requirements.

## v2.2 - 2026-08-09

- Added a full-population lexicographic policy search over O1 transit-priority, O2 equity-balanced and O3 active-first profiles; every candidate is replayed over all 3,122,000 synthetic agents before selection.
- Selected O3 under the declared hard gates and proxy objective, and synchronized the bilingual evidence boards and proposal readouts to the selected policy rather than a hand-picked scenario.

## v2.3 - 2026-08-09

- Aligned the runner’s optimized-policy checks with the full-replay-selected policy, so machine checks, comparison output and evidence boards all refer to O3 rather than silently retaining O1.

## v2.4 - 2026-08-09

- Removed the last hard-coded O1 selection phrase from the regional runner; the interpretation now reports the policy actually selected by the full replay.

## v2.5 - 2026-08-09

- Added candidate-level peak mode-load ratios and capacity-overflow person-trips to the population-scale replay output and selected-policy readout, making congestion/capacity evidence inspectable before adding a capacity-balanced policy.

## v2.6 - 2026-08-09

- Added O4 capacity-balanced policy search and a declared 1.35x maximum peak mode-load hard gate; the selected policy must now satisfy capacity, accessibility, privacy, mass-conservation and air-candidate gates before satisfaction ranking.

## v2.7 - 2026-08-09

- Added an independent full-population PM return-leg coverage screen for the selected policy. It replays all 3,122,000 agents with reversed aggregate route chains while keeping morning policy selection unchanged; the return readout is explicitly a synthetic coverage check, not an observed evening OD claim.

## v2.8 - 2026-08-09

- Corrected the regional distance ledger: passenger kilometres are now separate from vehicle/service-unit kilometres; the earlier aggregate was not labelled precisely enough for metro, bus, bicycle and walking modes.
- Added a machine-readable service-unit ledger for metro departures, bus departures, bicycle slots, continuous accessible-path slots, car vehicle equivalents and enterprise shuttle vehicles, including required units, available units, load ratio and synthetic unit-kilometres.
- Added explicit runner checks for service-ledger completeness and service-unit-based vehicle-kilometre calculation, and refreshed the bilingual regional board and proposal readouts to v2.8.

## v2.9 - 2026-08-09

- Added an independent population-scale grouped departure-time choice screen: only the declared enterprise group can enter a synthetic 20-minute flex window, while residents, care/children, visitors, logistics/maintenance and night workers remain protected from unvalidated shifting.
- Added full-population band conservation, protected-group and rescheduling-cost checks; the screen remains separate from O1/O2/O3/O4 ranking until local behaviour, headway and 15-minute capacity evidence is available.
- Added bilingual `activity-choice-operations-board.svg` evidence boards pairing time-band redistribution with O4 metro/bus/bicycle/accessibility/car/shuttle service-unit loads, and synchronized the proposal readouts.

## v2.10 - 2026-08-09

- Added an independent three-slice service-time operations screen: grouped demand is assigned to synthetic metro departures, bus departures, bicycle slots, accessible-path slots, car equivalents and enterprise shuttles with FIFO residual-capacity carry.
- Added boarded trips, failed-boarding attempts, residual queue, queue person-minutes and scheduled service-kilometre outputs for the full 3,122,000-agent screen; mass conservation and declared service-unit totals are checked.
- Kept the operations gate separate from policy ranking and made the current synthetic result fail closed (`3.2431x` peak slice load, `452,668` end-of-window residual queue), so the candidate cannot be described as an operable timetable before dated supply, capacity and boarding evidence exists.
- Added bilingual `service-time-operations-board.svg`, updated the proposal/report/offline visual pages, and recorded schedule-based capacity-constrained transit assignment sources.

## v2.11 - 2026-08-09

- Added an independent bounded adaptive-recourse screen that tests group-constrained alternate-mode movement against same-slice spare capacity after primary FIFO boarding, while carrying unresolved queues forward.
- Added group × source-mode × target-mode × time-slice flows, recourse person-minute cost, residual queues by mode/group, share-limit checks, mode-capacity checks and an explicit protected walking/accessibility source guard.
- Under the synthetic O4 inputs, 68,814.9 trips move from metro to car within declared bounds; the end-of-window queue falls to 383,853.1, but the 3.2431x peak and non-zero queue keep the operations gate failed closed. The recourse screen remains outside policy ranking and local route-choice claims.
- Added bilingual `adaptive-recourse-board.svg`, refreshed proposal/readout/offline visual pages, and made denied-boarding transfer, alternate-mode acceptance, accessible/care constraints and spare-capacity observations explicit calibration requirements.

## v2.12 - 2026-08-09

- Converted the responsibility-and-acceptance contract into `visual/assets/responsibility-acceptance-contract.json` with bilingual role fields, required dated readback fields, P0/P1/P2 acceptance targets, group dimensions, calibration inputs and fail-safe human fallback channels.
- Kept all thresholds explicitly marked as `design_target`; they do not assert current performance, institutional partnership, permit, procurement or budget decisions.
- Synchronized both proposals, rendered reports, offline visual pages and manifest hashes so the operational acceptance chain can be inspected without personal trajectories, enterprise identities or vehicle identifiers.

## v2.13 - 2026-08-09

- Added a full-population robustness screen: each O1/O2/O3/O4 candidate is replayed under nominal ground coordination, a 30-minute metro disruption, severe-weather bicycle constraint and multimodal capacity shock.
- Added machine-readable scenario summaries, stress-gate status, worst-case satisfaction, accessibility gap, peak load, overflow and calibration requirements; the screen retains aggregates only and keeps the air candidate blocked.
- Under the declared synthetic inputs, O2 is the robustness-screen winner while O4 remains the nominal-efficiency winner; O3 exits on the capacity-shock load gate. This is a sensitivity ranking, not a local resilience or implementation claim.
- Added bilingual `robustness-screen-board.svg`, synchronized proposal/readout/model version and recorded the exact system-optimum transit method reference without importing paper coefficients.

## v2.14 - 2026-08-09

- Added group-level mode counts/shares, satisfaction proxies and accessibility-completion proxies to the population-scale runner and selected-policy readout.
- Added bilingual `resident-vehicle-capacity-board.svg`: residents, carers/children, night workers and logistics/maintenance are visible alongside metro, bus, bicycle, accessible-path, car and enterprise-shuttle pressure.
- Made the 1.00× declared capacity line, 1.35× candidate gate and 332,639 synthetic capacity-overflow person-trips explicit, so the board points to adding service and calibration rather than presenting pressure as solved.
