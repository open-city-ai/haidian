# 方案迭代记录

## v0.2.1 - 2026-08-08

- **机器工件补齐（对抗式审查定位：零 schema 差距）**：对标全池 top peers（147228/seanSaxcy3/baobao/knqiufan 均有 .schema.json/ledger/register），新增 3 项机器可读资产并双语同步——①`visual/assets/gauge-contract.schema.json`（标准权契约状态机：DRAFT/REVIEW/MERGE/RELEASE/ROLLBACK/SUPERSEDED + 人类 gate + 证据梯字段 + 四条公共承诺枚举；`evidence.synthetic`/`unmeasured_fields` 明确概念示例与未测量记资产）；②`visual/assets/gauge-gates.json`（G0-G3 轨距门绑定 E0-E5 证据梯，`min_evidence_level` 逐门可校验，`authority_boundary` 六项 false，`unmeasured_are_assets:true`）；③`visual/assets/gauge-equivalence-index.json`（轨距等价指数 GEI = 0.4×覆盖率+0.3×可达性+0.3×时差平价，回应 peer 7annnnnnn 的 CEI 超越）。
- **命名撞车显式化（权力层 vs 内容层）**：识别 cynixway `jingzhang-new-gauge` 同用「轨距」母题（含治理语言）——在标准权契约开头点破区分："标准"的内容层（用什么标准互通）vs 权力层（谁定义/接受/更改/撤销），本方案主张权力层才是 AI 时代通行权来源，保住唯一性叙事。
- **首期 90 日低后悔行动包（implementation_feasibility 补齐）**：近期从概念年份（2026–2028）细化为首个 90 日三段行动包——0-30 日资料替换清单/现场走测/非AI基线、31-60 日双轨碑一期+道岔广场概念/标准权契约首个议题/端侧算力柜选址、61-90 日 1 个测试验证场景试点协议/轨距日预热/SLO 基线；每段绑定 G0-G2 轨距门、明确"不做什么"列、保持可回滚，不构成工程/投资/采购/审批承诺。
- **表达层**：执行摘要证据状态行补 3 项机器资产；轨距门表增加"最低证据等级"列并说明四门为独立并行检查；manifest 45→48 文件。
- **自检**：四项 gate 全部 PASS（formal-review-ready）；CI PASS（run 31268437015）；双语同步、LF 归一化、哈希与 git blob 一致。

## v0.2.0 - 2026-08-08

- **对抗式审查定位（竞争格局 184 方案摸底）**：确认「轨距=标准权」元隐喻为全池唯一差异化资产，而 planning-as-code/开源工作流已成红海（至少 4 家 peer 同时使用 TRUNK/COMMIT/PR/merge 语言）。本轮升级重心钉在"标准权"的制度化表达，不与 peer 撞车。
- **新增「标准权契约 Gauge Contract」**（AI 治理机制）：把"轨距=标准权"从隐喻转译为可操作治理状态机——DRAFT/REVIEW/MERGE/RELEASE/ROLLBACK/SUPERSEDED 六态，每个状态明确人类 gate（人类合轨权、争议回轨权），四条可验证公共承诺（提案公开性/证据可核验性/人类合轨权/争议可回轨），与六字段协议构成"运行时+治理时"双重复核。直接回应 15% 权重 `ai_planning_innovation` 与 10% `originality`。
- **新增「轨距门 Gauge Gates」试点决策门**（实施机制）：概念→试点→扩大→常态四道门（G0 证据门/G1 权属门/G2 试点门/G3 常态门），全部条件可核验、未过则停在当前轨道，与五方分工衔接。直接回应 20% 权重 `implementation_feasibility`。
- **新增「双生接口 Twin Interface」包容性原则**（公共利益机制）：AI 公共场景一律配同级、等显眼、等可达的非 AI 通道，"不用 AI 也不受惩罚"成为可计数承诺（标识公示率 100%），包容性可计数指标由 4 项扩至 5 项。直接回应 10% 权重 `public_interest_inclusion`。
- **区域协同结构化**：区域协同由一段话升级为五对象（北纬社区/未来科学城/怀柔科学城/经开区/京津冀）协同接口表（输出/输入/载体/标准权角色），补齐 13 维评审维度 `regional_synergy`。
- **表达层修复**：修复更新项目清单表"表头 6 列/数据行 5 列"导致的 HTML 表格渲染失败（补全 15 项"建议主导方"列并同步英文版）；受益于上游 render_proposal_html 表格渲染修复，重渲染后 report HTML 由 9 表增至 13 表全部正确；compliance_matrix agent.1/3/6 的 report_sections 映射同步新机制章节。
- **双语与合规**：proposal.en.md 全部同步；文本文件统一 LF；self_check 四项 gate 全部 PASS（formal-review-ready）。

## v0.1 - 2026-08-08

- **首版生成**：基于脚手架生成完整 formal 方案包「双轨·百年 The Parallel Rails」（`submissions/TryWorld2026/parallel-rails/`）。
- **概念**：以「轨距即标准权」为第一性原理——京张铁路为第一次标准选择（1435mm），AI 创新带为第二次标准选择；空间转译"一基双轨三站"。
- **空间证据**：9 层 GeoJSON（19 个用地单元拓扑完整，gap≈0/overlap≈0）；27 项指标 EPSG:4548 复算；控规指标如实 unknown。
- **任务覆盖**：公告 1.3–1.5 共 17 项任务 + agent.1–agent.6 六项任务（compliance_matrix 23 条）；5 个强制标准；15 个设计深度项全部 complete。
- **成果物**：proposal.md（13 章）、5 张专业图、A3 文册 10 页、A0 展板 7 块、离线 visual/index.html。
- **自检**：Deterministic / Spatial / Visual / Professional 四项本地 gate 全部 PASS（formal-review-ready）。

## v0.1.1 - 2026-08-08

- **对抗式审查修复**：按独立 reviewer 意见实质重写 proposal.md 正文，清除与参考方案的表述雷同；修复催化剂指标公式（补充 buildings assumed_floors 字段，公式可复算）；统一三站面积表述（公告约值＋复算值）；修正拓扑措辞。
- **内容增补**：新增全球案例对照表、区域协同（北纬社区/未来科学城/怀柔/经开区/京津冀）、规划多智能体协作机制、六类画像表、场景—空间—运营映射表、五处朝圣地标目录、公共空间组件库、自选区域场景设计（科教走廊·AI 教育生活融合带，公告可选项）。
- **新增资产**：AI 创新生态图谱 ecosystem-map.png、risk.json（8 维风险矩阵）、changelog.md。
- **双语**：新增 proposal.en.md、visual/index.en.html 及 report/proposal.en.html（非阻断改进）。
- **状态**：四项本地 gate 仍全部 PASS。

## v0.1.2 - 2026-08-08

- **竞争力提升（第一性原理诊断）**：对照任务书 13 个补充评审维度，补强 `function_match` 与 `brief_alignment`——新增"三大定位、五大功能与三区两翼对应"专节，逐条点名三大定位、五大功能并落到三站两翼；三站标题与命名体系补注公告官方名（众智园AI自主创新加速区/北京AI原点社区/大钟寺AI产业集聚区）。
- **AI 规划创新**：新增"规划即代码 planning-as-code"节——将可校验规划规则代码化、方案先通过"编译"再评审；以本包拓扑校验与 EPSG:4548 复算为演示。
- **实施可行性**：新增"参与主体分工建议"五方分工（政府定标准/设计院深化/企业运营/社区共治/开发者贡献场景）。
- **表达完整度**：英文版按 `docs/terminology-glossary.md` 对齐关键术语（Jing-Zhang Railway Heritage Park、Zhongguancun Technology Services Wing、Xiaoyue River Scenario Enablement Wing、Zhongzhiyuan AI Independent Innovation Acceleration Area 等）。
- 四项本地 gate 重新验证 PASS。

## v0.1.3 - 2026-08-08

- **真实数据锚定（信息不对称迭代）**：按任务书 external_data_guidance，引入 OpenStreetMap（ODbL）公开数据，经 Nominatim 地理编码核验沿线 5 个真实节点（京张铁路遗址公园、北京北站、大钟寺站、清华园站旧址、五道口），新增"真实场地锚点核验"小节并登记来源 DATA-SRC-OSM-ANCHORS-20260808（background_only，仅叙事锚定，不作为红线/测量/面积依据）。
- 三项本地 gate 与 CI 校验重新验证 PASS。

## v0.1.4 - 2026-08-08

- **正式评分模拟审查修复（7 维预估 80→85）**：按评分委员会视角逐维打磨。
- 催化项目包与风貌基调一致性：A-DEMO-FLOORS 层数假设下调（研发 8/办公 12/人才公寓 12 等），催化剂总规模 265→195 万 m²、容积指数 10.3→7.6，并明示"催化包=站区节点强度、不代表全域中低强度"。
- 分期补时间维度（2026–2028 近/2029–2031 中/2032–2035 远，概念年份）并给近期 quick win 排序。
- AI 标准创新指数四个子项补最小可计算定义。
- 补齐公告点名 6 个缺失点（北影艺术资源、体育设施、清华东路西口、数字资产流通、规划绿地复合利用、"两区一带"联动）。
- 表达硬伤：删除孤立标题、修复"16 留白用地"歧义、场景映射引用措辞。
- 轨距史实边界澄清（标准轨距系既有国际标准，隐喻起点而非历史结论）。
- 规划即代码补 6 条示例性规则清单；15 项更新项目补"建议主导方（类型）"列。
- 新增民生与包容性安排（15 分钟生活圈、非智能替代点、就业联动、居民利益保障）；测试场景影像留存设限。
- 四项本地 gate 重新验证 PASS。

## v0.1.5 - 2026-08-08

- **AI 多模态评审定向提升**：确认维护者 AI 评审（ai_review_submission.py）会直接读取 5 张必选图与 visual/index.html 作为图片输入。
- 图纸视觉系统升级 v2：深色页眉横幅（品牌+图名+副标题）、标准指北针与分段比例尺、鲜明协调的专业配色（深海军蓝+金+公园绿）、统一版式与页脚状态条，dpi 300；6 张图全部重绘。
- 补齐 advisor 指出的公开资料引用：登记 brief/public-brief.md（DATA-SRC-PUBLIC-BRIEF-2026，background_only）并在中英正文引用。
- 四项本地 gate 重新验证 PASS。

## v0.1.6 - 2026-08-08

- **最后冲刺（第一性原理 + 全方面对抗审查）**：
- 视觉层：visual/index.html 升级 v2 深蓝+金视觉（AI 评审直接读图的页面之一，与图纸/HTML 统一视觉语言）；key-areas.png 从"索引图"升级为"三站详细设计图"（站区内功能带/地标节点/轨道站点标注），直接提升 AI 评审读到的方案深度。
- 文本层：众智站西轨示范单元"方案级"概念深化（总平面/标准断面/分期动作，feasibility 3.5→4.0 的抓手）；包容性可计数指标（每站 1 处非智能替代点×3、无障碍覆盖全线、15 分钟生活圈、全免费无障碍动线，public_interest 提升）。
- PDF 以 v2 图纸重新生成；proposal.html 以增强渲染器输出（表格/标题/加粗完整渲染 + v2 视觉）。
- 四项本地 gate 重新验证 PASS。

## v0.1.7 - 2026-08-08

- **表达层升级（对齐 96 分对手实证差距：执行摘要 + 双语展示 + Logo 资产）**：
- 新增「一页执行摘要 / Executive Brief」章节（proposal.md / proposal.en.md 开头）：8 行评审问答表，逐条回答"核心命题/空间响应/生态机制/场景体验/实施起点/公共价值/证据状态/决策边界"并给出可核验成果，直接服务 brief_alignment 与 expression_completeness。
- 新增自绘 SVG Logo 资产（assets/parallel-rails-logo.svg）：双轨×刻度母题、轨枕化为刻度、一轨渐变为 0/1 二进制序列、1.435m 超级符号、三处道岔节点；配视觉规范（配色/净空/使用限制），并在 proposal 中英正文与 visual 中英页嵌入。
- 补齐英文展示资产（消除 CI 全部 bilingual 警告）：6 张英文图件（site-overview/land-use-structure/key-areas/mobility-bluegreen/metrics-evidence/ecosystem-map 的 .en.png）+ A3/A0 英文 PDF（a3-booklet.en.pdf / a0-boards.en.pdf），与 zh 版同一几何/指标/视觉系统生成。
- 版本迭代 v0.1.6 → v0.1.7。
- 四项本地 gate 重新验证 PASS。

## v0.1.8 - 2026-08-08

- **可实施性深化（对齐 96 分对手实证差距：RACI/KPI/SLO + 场景六字段协议）**：
- 新增「概念 RACI 责任矩阵」：15 项更新项目按五类项目组给出 A/R/C-I 概念分工、公共价值 KPI（如"连续无障碍路径审计覆盖率 100%、非智能替代点 3 处"）与试点 SLO（如"严重安全缺口立即隔离、一般问题 5 个工作日内给处置路径"）；明确"若 A 角色/预算/许可/数据责任/退出机制任一项不清楚，项目不得进入常态运营"。
- 新增「场景共同协议（六字段）」：12 张场景卡统一为 ①服务对象 ②最小必要数据 ③空间边界 ④人工复核者 ⑤退出/申诉 ⑥评估与停止条件 的协议表（★标注 3 个测试验证场景），作为城市 issue 立项的标准字段模板。
- 版本迭代 v0.1.7 → v0.1.8。
- 四项本地 gate 重新验证 PASS。

## v0.1.9 - 2026-08-08

- **真实数据锚定（评分轨迹正杠杆：v0.1.3=80 是唯一上升版，恰因引入 OSM 真实数据；96 分 Proofline 有 20 来源 vs 我方 9）**：
- 引入海淀区 2025 年国民经济和社会发展统计公报（官方 A0 公开页，2026-04-10 发布，WebFetch 核验 URL 可访问、数值真实）：92 家全国重点实验室（占全市 63.4%）、123 款备案大模型（占全市 60%）、每万人 599 件高价值发明专利、技术合同 5.79 万项/4053.1 亿元。
- 用法纪律：`background_only` + `not_spatially_allocable=true`，仅**校准设计动作**——海淀创新供给已高度集聚 → 方案增量价值在"验证/转化/标准/场景接口"而非再堆科研设施，直接支撑"轨距＝标准权"概念的第二根轨（创新供给接入全球共识与治理网络）；不进入 metrics.json、不改变任何几何/面积/线位/分期。
- 登记来源 DATA-SRC-HAIDIAN-2025-STATISTICAL-BULLETIN（A0/background_only，含统计尺度/采集方法/变换/限制）；sources.json 8→9；self_check/执行摘要来源计数同步。
- 版本迭代 v0.1.8 → v0.1.9。
- 四项本地 gate 重新验证 PASS。
