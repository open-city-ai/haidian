# 方案迭代记录

## v2.7 - 2026-08-11

- 跟随主线双语渲染器重生成英文 HTML 报告，证据标签在英文页显示为 `Source`、`Standard`、`Depth`、`Spatial data` 与 `Metric`，不改正文、几何、指标或图件内容。
- 用当前主线自检器重新持久化四道门禁与 `manifest.validation_claim`；`PROFESSIONAL_EVIDENCE` 以包内可回读的 pass 记录，避免旧版自检快照被新验证器误判为未完成。
- 本轮只修复双语证据表达与自检快照一致性；继续保持临时边界、未授权/未运行、未知输入和不产生官方分数的边界。

## v2.6 - 2026-08-10

- 新增 `public-interest-coverage-v26.json` 与确定性 runner，在既有 6 类基础 persona 外补充青年初入行者、开发者与研究者、首次到访者与国际访客；每类回接已有场景和 GeoJSON 锚点，并登记受益、影响风险、人工替代、停止条件与待补证据。
- 中英文 proposal 明确 6 类基础 persona + 3 类公共利益扩展的关系；新增内容不改写人口、服务、就业、无障碍或官方评分结论。
- 修复离线引用审计对 `depth:brief_alignment` 的错误阻断：该标识是 reviewer navigation 中明确登记的 formal 维度，不是设计深度矩阵中的行；审计现在只接受设计深度项或已登记 reviewer 维度，并新增未知 depth 负样本，避免放宽为任意字符串。
- 刷新 `human-city-reference-audit.json` 与 manifest 哈希；当前中英文提案共 703 条包内引用、134 个唯一引用全部解析，仍不产生官方评分或现场绩效结论。

## v2.5 - 2026-08-10

- 新增双语图 27“公共空间连接、组件与社群转化”和两个结构化台账：`public-space-connector-atlas-v25.json` 以南北贯通、东西缝合和五类人本组件把 agent.4 落到既有空间锚点；`developer-community-conversion-v25.json` 以“公开问题—共学复核—受控场景—版本发布”四阶段把 agent.6 的开发者社群、场景开放和标准/知识外溢写成可停止、可回放的概念链。
- 公共贡献三联展明确为概念展示，不是官方荣誉/奖励系统；所有新增空间和运营表达继续保持 `official_boundary=false`、`geometry_role=provisional_constraint`、`operational_status=not_authorized_not_run`、`performance_results=null` 与 `not_a_score=true`，不新增几何、指标、运营方、许可、资金或绩效结论。
- 同步中英文 proposal、离线 visual index、双语审计、确定性 checker、HTML、PDF/图册与 manifest；不修改正式 metrics、来源等级、`submissions-data.js`、`gallery-publication.json` 或公开排序。

## v2.4 - 2026-08-10

- 为 23 条公告 / 任务书要求各自增加差异化、包内可回读的 `evidence_items`，并在 reviewer evidence map 中标注差异化主张与复核边界。
- 为全部开放假设增加 `priority` 与保守的补料排序说明；优先级是排程工具，不是缺口已解决的证据。
- 为 PUE 与绿电占比增加明确标注为未测量的政策参考基线，不改变正式 metric value / status。
- 将既有 `people_first` / `baseline_reproduction` 的三项 `decision_diff` 展开为双语首屏可回读表；仅提高空间取舍可见性，不把概念比较升级为推荐、正式面积或运行结果。
- 同步中英文 proposal 与 reviewer navigation index；不改 geometry、官方边界结论、分数或公共发布状态。

## v2.3 - 2026-08-10

- 新增双语图 26“城市 API 六步可回放序列”与 `city-api-sequence-v23.json`：目录、授权、调用、日志、审计、退出逐步绑定既有空间锚点、场景、发布门、人工等效和停止/回退动作；新增离线 checker 与证据回读。
- 为 6 个测试类场景补充 `first_evidence_needed_zh/en` 与 `first_evidence_owner_zh/en`，明确授权前第一份资料和待授权复核角色，不把建议角色升级为运营主体。
- `parametric-tradeoff-study-evidence.json` 新增由既有 baseline/variant shares 和派生面积回算的 `decision_diff`，只表达概念取舍，不改变正式 geometry、metrics、图纸或发布状态。
- 同步中英文 proposal、离线 visual index、PDF/HTML、双语图件和 manifest；修复中文 visual index 重复图 24。保持 `official_boundary=false`、`geometry_role=provisional_constraint`、`operational_status=not_authorized_not_run` 与所有 unknown；不修改 `submissions-data.js` / `gallery-publication.json`。

## v2.2 - 2026-08-10

- 将 `site-overview.png` / `.en.png` 改为评审首屏空间证据复合板：左侧从七个包内 GeoJSON 读取同源显示变换底图，右侧把三处重点区 × 五段空间动作、人工等效与停止/回退压成可读卡片，底部显式列出 EPSG:4548 指标输入和未补齐资料。
- 新增 `visual/assets/reviewer-facing-atlas-v22.json`、确定性构建器和离线 checker；checker 约束 3 区、5 阶段、每区 5 节点、7 个几何图层、`official_boundary=false`、`geometry_role=provisional_constraint` 与 `not_authorized_not_run` 边界。
- 中英文 proposal 增加图 25 及首屏阅读说明，修正正文“16 个空间场景节点”的过期表述为当前包内 17 个；HTML、PDF、manifest 在本轮随后重渲染和刷新。
- 本轮只改善评审首屏的空间清晰度与场景可感知度，不改变正式 geometry、metrics、来源等级、运营授权或公共排序，不修改 `submissions-data.js` / `gallery-publication.json`。

## v2.1 - 2026-08-10

- 新增双语图 24“空间动作房间”和 `visual/assets/spatial-action-rooms-v21.json`：三处临时重点区分别回答人本问题，并共同沿“到达与人工入口—公共解释与选择—受限机器接口—蓝绿停留与恢复—退出、申诉与回放”五段空间路径展开；每个节点同时登记人工等效、机器边界、停止/回退动作、GeoJSON 锚点、场景与指标引用。
- 将图 24 作为表达级城市设计板接入中英文 proposal、离线 visual index、PDF 与 manifest；修正中文 visual index 重复出现图 22 的导航噪音。
- 新增离线构建脚本，输出 3 个重点区 × 5 个节点的确定性结构；所有节点仅重排既有 provisional geometry 与场景证据，不新增几何、正式 metrics、工程断面、容量、运营主体、许可或政策结论。
- 本轮继续明确 `official_boundary=false`、`geometry_role=provisional_constraint`、`operational_status=not_authorized_not_run`；不修改来源等级、公共排序、`submissions-data.js` 或 `gallery-publication.json`。

## v2.0 - 2026-08-10

- 新增双语图 23“公共空间—文化—运营年度图谱”和 `visual/assets/public-culture-operations-atlas-v20.json`，把三座概念地标、四季版本节奏、五个项目族和“钢轨—时间—接口”文化语法接回空间锚点、资料门与退出动作。
- 前置中英文 proposal 的 v2.0 章节，补足任务书 agent.4（公共空间/地标）、agent.5（文化叙事）和 agent.6（年度运营）的可见设计证据；所有内容仍是概念建议 / 参考方案，供专业团队深化研究。
- 同步离线 visual index、制图方法、双语审计、reviewer navigation、PDF 图册与 manifest；checker 增加 3 landmarks / 4 seasons / 5 project families / cultural grammar 的结构回归。
- 本轮不修改 geometry、正式 metrics、来源等级、公共排序或 `submissions-data.js` / `gallery-publication.json`，不指定运营方、场地、许可、资金、容量或绩效。

## v1.9 - 2026-08-10

- 新增双语图 22“任务书—空间响应一页图”和 `visual/assets/brief-alignment-atlas-v19.json`，把任务书三大定位、五大功能、三区两翼与四条差异化主线逐行接回空间锚点、场景、metrics 和资料缺口。
- 将 v1.9 一页执行摘要前置到中英文 proposal，离线 visual index 增加同源图件与台账入口；每个空间单元继续明确 `official_boundary=false`、`geometry_role=provisional_constraint`，不新增工程尺寸、运营主体、投资或政策确定性。
- 扩展 `check-human-city-v15-assets.js` 的双语回归门禁，检查 3 positions / 5 functions / 3 areas / 2 wings / 4 chains、图 22 双语路径及非评分边界；更新制图方法、双语审计与 reviewer navigation。
- 本轮是任务书契合度与表达完整度的实质空间证据补强，不修改 geometry、正式 metrics、来源等级、公共排序或 `submissions-data.js` / `gallery-publication.json`。

## v1.8 - 2026-08-10

- 新增 `visual/assets/formal-scorecard-readback-v18.json` 与图 21 双语证据地图，把仓库七个 formal workflow 问题、模板权重、最短证据路径、已知边界和下一步授权核验放到同一回读顺序中；明确不生成分数、不代表主办方评分。
- 同步 `reviewer-navigation-index.json`、制图方法、双语审计、proposal、离线 visual HTML、PDF 图册和 manifest，使 v1.8 入口可从图面回到结构化证据；模板权重、临时几何和 unknown 的证据边界保持原级别。
- 这轮只补评审可读性与证据导航，不修改 geometry、正式 metrics、来源等级、公共排序或 `submissions-data.js` / `gallery-publication.json`。

## v1.7 - 2026-08-10

- 在五张评审核心图中增加三处重点区放大框、场景节点族、廊道交叉规则和几何到指标到缺口的回读链；放大框读取同一批 GeoJSON，不产生新的边界、线位或指标。
- 新增 `visual/assets/spatial-proof-v17.json`，记录短轴展开仅为阅读、像素不参与度量、重点区放大只作临时锚点的显示规则；同步双语 proposal、visual HTML、制图方法和双语审计。
- 以 v1.7 图件重建五页双语 A3 图册与 A0 展板；保留 `official_boundary=false`、`geometry_role=provisional_constraint`、`operational_status=not_authorized_not_run` 与所有 unknown。
- 这轮改进只针对场景可感知度、空间明确性和表达完整度，不改正式 geometry、metrics、来源等级、公共排序或 `submissions-data.js` / `gallery-publication.json`。

## v1.6 - 2026-08-10

- 将评审窗口中的五张中英核心图改为同源真实空间证据图：临时总体边界、六块分区、三处重点区真实轮廓、五条概念中心线、绿地、公共接口和十六个场景节点均从包内 GeoJSON 读取；新增 `visual/assets/spatial-proof-v16.json` 记录输入、EPSG:4548 显示变换和精度边界。
- 以 v1.6 图件重建五页双语 A3 图册与 A0 展板，并同步中英文 proposal、离线 HTML、双语审计和制图方法；图上北向旋转只用于长廊阅读，临时边界、未知指标和未授权/未运行状态不变。
- 在中英文设计依据入口前置六层“证据等级与人本决策边界”表，分别说明任务/标准、来源登记、临时空间、包内推演、行政背景和合成方法能支持什么、不能支持什么。
- 明确 `provisional`、`unknown`、`design_target`、`not_authorized_not_run` 与本地 checker PASS 的审阅含义，不把包内回放升级为现场证据、专业批准、政府实施结论或竞赛分数。
- 重新生成双语 proposal report，并刷新 manifest 与清权台账哈希；不改变 geometry、正式 metrics、来源等级或公开排序。

## v1.5 - 2026-08-10

- 把三处临时重点区按公告南北顺序串成一条“先走通日常、再调用机器”的人本主轴，新增图 16 与中英结构化数据；主轴只重排既有 GeoJSON 锚点，不新增距离、断面、容量或运营事实。
- 在既有三组参数候选之外，新增固定种子 128 组候选、四个概念比较镜头、非支配筛选和可回放证据，图 17 只表达计算取舍，不把代理值写成 AI 能力、居民结果或正式推荐。
- 将既有 PF-A—PF-E、发布门、进入证据和失败回退压成概念交付主线图 18，建议角色、责任、预算、工期、许可和运营状态仍保持未确认。
- 同步中英文 proposal、离线 visual/report、manifest 和本地构建器；未改 geometry、正式 metrics、来源等级、公开排序、`submissions-data.js` 或 `gallery-publication.json`。
- 修正双语审计台账仍停在 v1.0 的过期标记，将图 16—18、128 组搜索和交付主线纳入 v1.5 范围；checker 新增双语证据引用与审计版本回归检查。

## v1.4 - 2026-08-10

- 新增 `visual/assets/human-city-spatial-sequence.json` 与中英离线图件，把 v1.3 动作图谱继续压到三处重点区的“到达—人工服务—机器边界—蓝绿停留—退出”空间序列。
- 在中英文正文加入每处重点区的空间手势、机器允许范围、失效动作与最小资料门；评审者可从图面回到既有 GeoJSON 锚点和发布门，而不必把治理台账当作城市空间结论。
- 保留 `visual/assets/spatial-action-node-plans.json` 的节点级回溯；所有功能带和界面关系明确为无尺度概念，不新增尺寸、容量、许可、运营或现场结果主张。

本轮为实质性人本审阅与空间证据迭代，不是公共排序、日期或名称操作；未修改 `submissions-data.js`、`gallery-publication.json`，也未改动其它投稿包。

## v1.3 - 2026-08-10

## 新增

- 新增三处重点区空间动作图谱，把每处临时重点区拆成入口、受控测试/服务、证据回放和停止/退出四步，并逐项绑定 GeoJSON 锚点、角色类别、指标与待补资料；所有边界继续标记为 `official_boundary=false`、`geometry_role=provisional_constraint`。
- 新增区域协同接口台账与双语图件，覆盖技术、标准、知识、OPC 小团队和国际软配套五层；接口只交换可复核问题、证据与版本，不声称伙伴、企业、行政协议、投资或服务结果。
- 新增作者原创概念识别台账与双语图件，将轨道、开放括号和人工确认点用于图签、人工停止、版本门和资料缺口提示；明确不构成主办方、政府、企业或项目官方标识。
- 中英文 proposal、离线 visual index 和证据链接新增图 12—14，并保留所有既有 geometry、metrics、unknown、场景卡、发布门和临时边界限制。

## 不变与限制

- 未修改任何临时边界、用地、重点区、道路、绿地、公共空间、建筑或分期坐标；未改写正式 `metrics.json` 数值、比例、线长、置信度、假设或 `unknown` 指标；未新增正式空间指标。
- 空间动作、区域接口和概念识别只证明设计判断与审阅路径更可见，不证明官方红线、工程断面、交通/空域安全、能源绩效、居民或就业结果、运营主体、许可、投资、伙伴关系或实施。
- 未修改 `submissions-data.js` 或 `gallery-publication.json`，未通过日期、slug 或公共排序文件改变展示顺序；公开排序和发布继续由维护者流程决定。

## v1.2 - 2026-08-10

- 将总体空间动作、三处重点区、四条价值链、三道发布门与可重算指标前置到中英文 proposal 的首个阅读章节，避免评审先看到治理台账而看不到城市设计判断。
- 将 A/B/C/D 差异化主线逐项回接到用地、道路、场景节点、发布门和数据缺口；不新增官方边界、现场绩效、许可、运营者、投资或政策确定性主张。
- 将五张必需图件以同一 geometry/metrics 证据链重绘并同步中英版本，作为本轮空间表达的可见入口；旧版本地图仅作底图裁切，不引入新的空间数值。

## v1.1 - 2026-08-10

## 新增

- 将版本流水从正文首屏收束为一段阅读说明，把普通读者先带到核心概念、三处重点区和服务链；完整 runner、台账与参数化记录仍保留在包内。
- 在三处重点区补入概念体量范围、首层公共界面和先行专业证据，明确 FAR、层数、权属、工程容量与最终拆改留继续保持 `unknown`。
- 同步中英文 proposal 与离线展示页，未修改几何、正式指标、来源等级、公开排序或官方状态。

## v1.0 - 2026-08-10

## 新增

- 新增 `governance-startup-protocol.json` 和无网络 runner，将 6/6 准备度场景、3/3 发布门、8/8 必填字段接入五阶段授权前启动程序；显式保持未授权、未确认运营者，不虚构机构、许可或现场结果。
- 新增 `ai-design-exploration-log.json` 和确定性检查器，将五个关键 AI 辅助取舍登记为“证据→人类判断→保留/拒绝”的结构化回放；它是事后结构化索引，不是逐字模型对话或现场实验。
- 双语提案与离线展示页补入 v1.0 的启动程序、禁止启动条件、人工责任选择规则和设计取舍回放入口。
- 去除正文中图 11 的重复嵌图，保留唯一图件与参数化台账交叉引用，并显式说明 17 张场景卡与 16 个几何节点之间由 SC-D04 复用既有锚点造成的差异。

## 不变与限制

- 未修改任何临时边界、用地、重点区、道路、绿地、公共空间、建筑或分期坐标，也未改写正式 `metrics.json` 数值、比例、线长、置信度、假设或 `unknown` 指标；没有新增正式空间指标。
- 新 runner 的 PASS 只证明包内引用、边界、负样本和启动条件可以离线复核，不证明授权、人员到位、现场运营、工程、保险、能源/气候绩效、就业结果、公众接受或官方评分。
- 未修改 `submissions-data.js` 或 `gallery-publication.json`，未通过日期、slug 或公共排序文件改变展示顺序；公开排序和发布继续由维护者流程决定。

## v0.9 - 2026-08-10

## 新增

- 新增 `HUMAN-CITY-RECEIPT-0.1` 合成人本交接凭证，覆盖 3 个合成案例、H0-H5 六道交接门、6 个空间引用、等效人工路径、不可写回字段与负样本；`run-human-city-receipt.js` 在无网络、无个人数据、无外部系统条件下确定性复核并生成证据。
- 将交接凭证的 8 个回放字段逐案例登记，并明确摘要哈希与 release note 在授权前保持未生成或未关联；新增案例字段缺失负样本，避免“契约声明了字段、案例没有字段”仍然通过。
- 将准备度台账的版本检查改为与 `scenario-cards.json` 的跨文件一致性检查，并让 8 个准备度字段都拒绝旁路的授权值；负样本从 2 个扩展到 3 个，覆盖缺字段、误填数值和误填责任值。
- 将参数化取舍研究扩展为四个目标镜头：人本底线、机器可调用性、可逆与韧性、公共可达；runner 复核比较下限与非支配关系，仍保持三组概念候选和正式基线回接。
- 在实施矩阵补入 H0-H5 的抽象角色交接协议，并同步更新双语正文、离线展示页、评审导航、制图方法、双语审计、场景台账和合规证据地图。

## 不变与限制

- 未修改任何临时边界、用地、重点区、道路、绿地、公共空间、建筑或分期坐标，也未改写正式 `metrics.json` 数值、比例、线长、置信度、假设或 `unknown` 指标；没有新增正式空间指标。
- 合成交接凭证、四个目标镜头和负样本 PASS 只证明包内结构与停止条件可回放，不证明现实运营、人员值守、许可、工程、保险、能源/气候绩效、就业结果、公众接受或官方评分。
- 未修改 `submissions-data.js` 或 `gallery-publication.json`，未通过日期、slug 或公共排序文件改变展示顺序；公开排序和发布继续由维护者流程决定。

## v0.8 - 2026-08-10

## 新增

- 新增 `visual/assets/pilot-readiness-register.json`，覆盖 6 个 `test_validation=true` 场景，逐项登记基线、样本与时间窗、成功/停止条件、人工替代、责任、复核周期和删除证明。
- 新增 `visual/assets/check-pilot-readiness.js`，在无网络、无个人数据、无外部系统的条件下重解 6/6 测试场景、8/8 必填字段，并验证缺字段和虚构数值的负样本会失败。
- 将现场走访、居民验证、利益相关方参与和现场测量的状态显式保持为未开展或未采集，并把同意、匿名聚合、人工替代、异议处理和删除证明写成授权前最低协议。
- 双语提案新增“可以开始”表格，说明谁在什么阶段补齐什么证据；离线展示页增加台账和 runner 入口。

- 将任务书点名的中关村科技服务翼落到 `SC-D04`“要素配置台”，补足 IP、合规、公共数据授权和京津冀应用转化的空间—服务接口；场景卡保留人工咨询、纸面材料、授权核验、冲突披露和冻结条件，不指定机构、资本方或已签协议。
- 新增三组参数化空间取舍候选，比较当前六层概念功能带、人本优先、平衡和机器协同；`run-parametric-tradeoff-study.js` 对 share 求和、面积公式、基线回接和概念边界作确定性复核，图 11 提供中英对照表达。
- 将中英场景注册更新为 17 张卡。SC-D04 复用既有两个空间锚点，因此几何节点仍为 16 个；验收图谱、场景—空间—运行矩阵、评审导航、制图方法和双语审计同步更新。
- 更新 `compliance_matrix.json` 的评审证据地图和 `design_depth_matrix.json` 的逐项证据焦点；正文将新增内容接入总体空间结构、任务书、指标和本地引用审计。

## 不变与限制

- 未修改临时边界、用地、重点区、道路、绿地、公共空间、场景或分期坐标，也未改写已知面积、比例、线长、置信度、假设或 `unknown` 指标。
- 台账只证明进入条件被逐项登记，不证明现场基线、居民接受、人员值守、许可、部署或社会绩效；本包不包含现场走访、居民访谈、问卷、运营日志或真实服务结果。
- 未修改临时边界、用地、重点区、道路、绿地、公共空间、建筑或分期坐标，也未改写任何正式 `metrics.json` 数值、比例、线长、置信度、假设或 `unknown` 指标；三组参数只作概念比较，不产生 FAR、建筑高度、工程、投资、政策或实施结论。
- 参数化 runner、引用审计、验收图谱、普通人服务链、接口原型和评审导航均为离线结构化证据；PASS 不代表官方评分、批准、现场绩效、许可、运营或实施准备度。
- 未修改 `submissions-data.js` 或 `gallery-publication.json`，未通过日期、slug 或公共排序文件改变展示顺序；公开排序和发布继续由维护者流程决定。

## v0.7 - 2026-08-10

## 新增

- 新增图 10“评审证据地图”及其中英文对照图：将任务书的 13 项统一评审维度、仓库 formal scorecard 的 7 项工作流问题与五条可回放证据脊放在同一阅读页，但明确分开来源与边界；不把仓库模板百分比写成主办方评分，也不推断本投稿得分。
- 将 `reviewer-navigation-index.json` 升级为双层导航：7 项工作流问题的维度与百分比回接 `scripts/review_submission.py` / `scripts/generate_formal_scorecard.py`，13 项任务书维度回接 `brief/site-package/agent_taskbook.json`；任务书未登记权重的部分保持未加权。
- 新增无网络、无个人数据、无外部系统的 `run-reviewer-navigation-audit.js` 及其结构化证据。它验证 13/13 任务书维度、7/7 工作流问题、模板百分比一致和 42/42 包内文件路径解析；缺少一个任务书维度或替换成不存在的文件路径的负样本必须 FAIL。
- 重制全部双语图件、10 页双语 A3 图册和 6 页双语 A0 展板，纳入图 10，并把图件版本、离线展示页、提案、摘要和 manifest 同步到同一阅读路径。

## 不变与限制

- 未修改临时边界、用地、重点区、道路、绿地、公共空间、场景或分期坐标，也未改写任何已知面积、比例、线长、场景计数、置信度、假设或 `unknown` 指标。
- 导航审计 PASS 只证明任务书/仓库词表、模板权重与包内文件路径可离线回溯；不证明设计质量、来源权威、版权或数据许可、现场绩效、公众结果、评审判断、分数、许可或实施。
- 未修改 `submissions-data.js` 或 `gallery-publication.json`，未通过日期、slug 或公共排序文件改变展示顺序；公开排序和发布继续由维护者流程决定。

## v0.6 - 2026-08-10

## 新增

- 新增图 09“人本城市验收图谱”及其中文/英文对照图：将既有 6 类使用者、16 张场景卡、10 条代表性人物路径、临时空间锚点与 3 段发布门放到同一审阅面。每条人物路径都显示人本底线、人工替代和停止/回退，而不是把这些条件留在分散的 JSON 台账中。
- 新增 `visual/assets/human-city-acceptance-atlas.json`，只引用现有 persona、场景卡和发布门 ID；它明确区分完整的 16 场景清单与仅为阅读而选取的 10 条代表性链接，不把代表性人物误写为唯一受影响人群。
- 新增无网络、无个人数据、无外部系统的 `check-human-city-acceptance-atlas.js` 及其结构化证据。它重解 6/6 人物路径、16/16 场景卡、10/10 代表性链接、30/30 代表性空间引用、45/45 全部场景空间引用与 3/3 发布门；虚构人物锚点必须 FAIL。
- 重制全部双语图件、9 页双语 A3 图册和 5 页双语 A0 展板，使图 09 与现有图 01–08 保持统一图例、临时边界说明、离线展示与 PDF 审阅路径。

## 不变与限制

- 未修改临时边界、用地、重点区、道路、绿地、公共空间、场景或分期坐标，也未改写任何已知面积、比例、线长、场景计数、置信度、假设或 `unknown` 指标。
- 图谱 PASS 只证明本包引用、人工底线和停止条件可离线回溯；不证明现实服务点、人员值守、人群覆盖、无障碍、运行安全、许可、工程可行性、投资或社会绩效。
- 未修改 `submissions-data.js` 或 `gallery-publication.json`，未通过日期、slug 或公共排序文件改变展示顺序；公开排序和发布继续由维护者流程决定。

## v0.3 - 2026-08-09

- 持久化当前 main 提交上的真实四门自检结果、生成器版本、UTC 时间和 formal-review readiness；这只是本地包证据，不是官方评分或实施批准。
- 刷新 `self_check.json` 与本变更记录的 manifest 哈希；没有修改几何、指标值、现场绩效、许可、部署或公开排序声明。
- 继续明确临时边界与重点区的精度限制，三条 `KEY_AREA_PROVISIONAL` 只是不阻断内容评审的提示。

本轮为实质性证据与治理设计迭代，不是公共排序、日期或名称操作；未修改 `submissions-data.js`、`gallery-publication.json`，也未改动其它投稿包。

## v0.5 - 2026-08-10

## 新增

- 新增两种中英对照的**非尺度化空间接口原型**及图 08：AI 原点社区的人工等价服务/技能转型接口，以及众智园的人机测试/人工停止接口。它们把既有公共空间、建筑、道路、绿地、场景和发布门锚点重新组织为可读关系，不画成实际道路横断面、工程尺寸、容量、线位或运营承诺。
- 新增 `visual/assets/human-machine-interface-prototypes.json`，逐层登记空间锚点、普通人服务链步骤、触发器、资料门、人工优先原则与失效即闭环动作；所有角色均为抽象建议角色，不指定现实运营方。
- 新增无网络、无个人数据、无外部系统的 `check-human-machine-interface-prototypes.js` 及其结构化证据。它离线重解两套原型的空间锚点、服务链、资料门和双语停止措辞；17 项检查通过，且虚构空间锚点的负样本必须 FAIL。
- 补齐 `spatial-figure-method.json` 中此前未登记的图 07，并加入图 08、普通人服务链、资料就绪度与空间接口的输入/输出/精度边界；重制双语 A3/A0 图册与离线展示页以纳入图 08。

## 不变与限制

- 未修改临时边界、用地、重点区、道路、绿地、公共空间、场景或分期坐标，也未改写任何已知面积、比例、线长、场景计数、置信度、假设或 `unknown` 指标。
- 接口原型的本地 PASS 只证明包内引用可回溯，不证明现实断面、人员值守、无障碍、运行安全、路权、许可、投资、工程可行性或实施绩效；正式或清权资料到位后仍须全量重算并经专业审阅。
- 未修改 `submissions-data.js` 或 `gallery-publication.json`，未通过日期、slug 或公共排序文件改变展示顺序；公开排序和发布继续由维护者流程决定。

## v0.4 评审可回放加固 - 2026-08-10

## 新增

- 新增 `visual/assets/reviewer-navigation-index.json`，把正式评审七个维度映射到最短证据路径、阅读顺序和仍不能由本包证明的边界；明确该索引不是评分器或分数承诺。
- 新增无网络 `run-human-city-reference-audit.js` 与 `human-city-reference-audit.json`，对中英正文的 278 个 `[metric:]`、`[source:]`、`[data:]`、`[depth:]`、`[standard:]` 标记进行包内解析，当前 78 个唯一引用全部回接，两个未知引用负样本按预期 FAIL。
- 将资料就绪度、执行矩阵和发布门台账的包级 `package_iteration` 对齐到 v0.5，并让普通人服务链 runner 将三份治理台账纳入上下文检查。
- 双语提案和离线展示页增加评审导航、正文引用审计和 runner 入口，保持图纸与结构化证据可回到同一文件。

## 不变与限制

- 没有修改任何几何、面积、比例、线长、场景数量或既有指标；v0.2/v0.3 的阶段标签仍作为历史/阶段语义保留。
- 引用解析只证明包内 ID 和空间要素可回接，不证明事实真伪、来源权威、许可、运营、现场绩效或公众结果；正式评审仍由维护者执行。
- 未修改 `generated_at`、slug、`submissions-data.js` 或 `gallery-publication.json`；公共排序与发布继续由维护者流程决定。

## v0.4 - 2026-08-09

## 新增

- 新增中英对照的一页普通人服务链摘要，将进入与选择、请求、人工接管、退出/申诉和独立回放连成可审阅闭环。
- 新增离线确定性验收契约与运行器，检查五个步骤、四类触发器、等效人工路径、失效即闭环和独立复核结构；`performance_results=null`、`operational_status=not_authorized_not_run`，本地 fixture 不声称人员值守、真实可访问性、公众接受、安全绩效、许可或实施。
- 把两条最小回放路线绑定到既有场景卡、persona、空间锚点和发布门；缺少人工停止动作或使用不存在空间锚点的两个负样本必须得到 `FAIL`。
- 新增 runner 的结构化 trace coverage：5 个唯一 step ID、4 个被引用 trigger ID 与全部登记 evidence field 必须可解析，才能得到 PASS。
- 强化 runner 的空间校验：每条路线引用不仅要匹配场景卡，还必须解析到投稿包 GeoJSON 中真实存在的 feature ID；本轮证据记录为 4/4 空间引用解析成功。
- 新增 `visual/assets/data-readiness-register.json` 和中英对照图 07，将 7 类资料缺口逐项关联到 12 项 assumption、相关场景、空间层、指标、发布门、最低证据、建议审阅角色、资料缺失时的回退动作和全量重算触发器。
- 新增 `sustained_employment_transition_rate` 与 `manual_service_equivalence_rate` 两项 `unknown` 指标，并补入对应 assumption。它们分别要求经同意基线/带薪路径/随访，以及服务目录/同等人工替代/真实走读；不允许由走廊长度、培训人次、网页可访问性或全球暴露率推断。
- 重制所有中英图件与双语 A3 图册，使图 05 明确展示新增 unknown，图 07 以“最低资料—进入门—缺失时”的结构呈现资料就绪度；双语离线展示页增加图 07 与台账入口。

## 不变与限制

- 未修改任何临时边界、用地、重点区、道路、绿地、公共空间、场景或分期坐标，也未改写既有面积、比例、线长、场景计数和既有指标值。
- 服务链本地 PASS、负样本拒绝与资料就绪度台账均不指定运营方、审批时点、工程方案、投资、实际许可或已完成绩效；任何资料不足的社会、服务、能源和气候结果保持 `unknown` 或概念状态。
- 未修改 `generated_at`、slug、`submissions-data.js` 或 `gallery-publication.json`；公共排序与发布继续由维护者流程决定。

## v0.3 - 2026-08-09

## 新增

- 补入图 01 的中英文重点区图例（1/2/3），同步写入提案、离线展示页和制图方法登记；未改变几何、指标、边界或发布层数值。
- 从既有 `geometry/*.geojson` 与 `metrics.json` 重绘六张中英对照空间图，补入图号、对应图例、0–2 km 比例尺、原始北向标识和临时边界精度说明；为走廊阅读仅作 90° 顺时针显示旋转。
- 以同一批重绘图更新双语 A3 图册、双语 A0 展板、双语正式提案、双语离线展示页和一页摘要；离线展示页新增制图方法入口，并以响应式尺寸展示发布门图。
- 新增 `visual/assets/spatial-figure-method.json`，登记所有输入 GeoJSON、EPSG:4548 复算规则、显示变换、比例尺范围、双语图件/图册和不应升级的精度边界。

## 不变与限制

- 临时边界、用地、重点区、道路、绿地、公共空间、场景和分期的坐标及所有 `metrics.json` 数值、置信度、假设与 `unknown` 状态均未改动。
- 图纸只改善空间证据的可读性，不构成官方红线、地籍测绘、法定指标、道路或工程线位、许可、可行性、投资、实施或已确定政策。
- 未修改 `generated_at`、slug、`submissions-data.js` 或 `gallery-publication.json`；公共排序与发布继续由维护者流程决定。

## v0.2 - 2026-08-09

## 新增

- 为 16 个 A/B/C/D 场景新增离线场景卡与场景—空间—运行矩阵，逐项写明建议对象、空间锚点、人工替代、资料边界、验收所需证据与停止条件。
- 为 v0.1、v0.2、v1.0 三段概念分期新增进入门、推进门、退出门台账，并将这些门写入 `geometry/phasing.geojson` 的属性。
- 新增用户公平、执行责任、指标复算、权利清算、双语一致性与可访问性审计台账。
- 在正文与双语离线展示页补充“人本城市操作系统”的四项运行机制：人类优先、证据发布、空间—服务接口、退出与修复，并明确 unknown 与概念建议边界。
- 新增双语发布门图，更新五张必交图的证据标识，重制双语 A3 图册、双语 A0 展板和离线展示页。

## 不变与限制

- 临时边界坐标、用地分区坐标、面积、比例、线长、场景数量和所有 `unknown` 指标均未因本轮叙述更新而改写。
- 所有空间和制度表述仍为概念建议/参考方案，供专业团队深化研究；不构成政府审批、工程可行性、投资、实施、路权、数据授权或绩效声明。
- 官方边界、控规、道路、市政、权属、文保、蓝线、现状与运营资料到位后，必须重新计算 geometry、metrics、图件、HTML、PDF 和发布门判断。
