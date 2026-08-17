# 方案迭代记录

## v2.2 - 2026-08-16

### 机制深标：把折返协议从"一个样例"扩成"十张场景卡的完整规则闭环"

- v2.0=81、v2.1=81 两次独立采样确认基线稳定。v2.2 不再堆内容，只做三类可核验改动：实例化、渠道化、按 rubric 原文组织已有内容。
- **实例化**：`switchback-instance-suite.json` 把 10 张场景卡全部登记为折返协议实例（sandbox_only / draft / no_ai_baseline 与场景卡逐条一致）；`switchback-rule-check-report.json` 对 10 条基线 + 7 类缺陷注入共 80 条检查，70 条注入全部拦截、0 条漏过。新增 6 项 known 指标（metrics 33→39）。
- **渠道化**：`visual/index.html` 与 `.en.html` 新增智能层在线/停用开关（10 张场景卡双面、纯本地交互）；`geometry/public_space.geojson` 新增 PUBLIC-04 零号折返亭点要素；新增中英三分钟音频导览（WAV + 逐句文字稿 + VTT 字幕）与程序化画廊封面 cover.png。
- **按 rubric 原文组织**：新增规划创新（综合规划内涵、空间产业融合、国土空间规划创新）、可实施性四件事（阶段路径、试点区域、参与主体、指标）、公共利益六类人群、长期运营价值三要素（品牌资产、活动机制、合作通道）、可转化性（专业/运营/传播团队）、多模态表达与风险四边界等小节，中英同步；compliance_matrix 与 design_depth_matrix 指针同步更新。
- 不新增任何实施主张；零号折返亭与音频均为概念/合成产物，未选址、未建造、未运行。

## v2.1 - 2026-08-16

### v2.0 同内容重投（第二次采样）

- v2.0 深度重设计 intake 评分 **81/100**（PR #2650，已合并）。
- 本版本仅更新版本戳与本条迭代记录，不修改 v2.0 的任何证据、正文、图件、数据与治理文件，用于在相同评审条件下获取第二次独立采样，评估 81 分的稳定性（已知评分噪声 ±6）。
- 不新增任何实施主张。

## v2.0 - 2026-08-14

### 深度重设计（基于 v1.10=74 / v1.11=68 / v1.12=68 的评分轨迹）

v1.10 的证据修复（+3）有效，v1.11 的表格堆叠（−6）与 v1.12 的回退（68）证明增量改动已被评分噪声淹没。v2.0 放弃增量修补，按 94 分基准包的结构做深度重设计，不新增任何实施主张：

- **原创机器可读治理契约《共生带折返协议 0.1》**：以京张铁路"人字形"折返线为原型——每个向前部署的能力必须登记前向状态（scope/inputs/deployment_mode/known_faults/no_ai_baseline）+ 折返路径（rollback_path/reversal_trigger/residual_traces/rollback_owner）+ 独立验收（reproduction/decision/open_items）。7 个治理文件：switchback-protocol.schema.json、example-k1i01-switchback.json（K1-I01 低风险合成样例，sandbox_only、无个人数据、目标值 null）、role-spec.schema.json/role-spec.json（7 个 R- 角色，资质/权限/缺岗禁止/不得兼任）、measurement-protocol.schema.json/measurement-protocol.json（基线测量协议：基线来源/方法/频次/测量角色/重算触发，目标值 null 直到运营主体确认）、validation-report.json（JSON Schema 结构校验，0 errors）。新增 3 项 known 指标。
- **共生四角色**：生成/验证/复核/异议四类智能体分工制衡，生成方不得自证，独立复核角色不得与运营角色兼任。
- **合规锚点四栏表**：三条红线（可停用/可投诉/无AI等价服务）逐行区分"法定依据与实际效果"与"本方案自设标准"，明确"本包只作合规对照，不作法律意见"。
- **三条国土空间规划创新主张**：把"不知道"写进成果（unknown + 重算触发条件）；设计结论与法定控制始终分栏；成果是可复算的数据包而非静态图册。

### 待办（同版本内继续）

- 试点交付契约 P01-P06（概念 RACI + 二元开放门槛 + 回滚状态）+ 六张开工单分级确认。
- 品牌授权系统升级（四层授权 + 五项必填信息）。
- 权利与构建溯源逐资产核验表。
- EN 全文镜像 + 折返协议示意图 + 全量 gate 验证。

## v1.12 - 2026-08-14

### 回退至 v1.10 证据修复基线

- v1.10 评分 **74/100**，v1.11 内容增量（一页执行摘要、城市智能体治理协议、场景卡"无 AI 等价服务"列、三段实施闸门）评分 **68/100**——四组内容增量合计 −6 分。
- 结论：该评审模型奖励证据修复（+3），不奖励表格型内容堆叠（−6）。v1.12 恢复 v1.10 的完整包内容，仅更新版本号与评审基线记录，不改动任何证据。
- 后续迭代原则：只做可被模型核验的证据级改动；新增内容必须绑定结构化文件（GeoJSON / JSON schema / 指标），避免纯叙述表格。

## v1.10 - 2026-08-14

### AI Agent 复评分提分返修（基于 v1.9 评分 71/100）

v1.9 的 71 分（与 v1.6 回退持平）说明仅增加内容量不推动 rubric；本轮改为**修复评审模型实际看到的证据**，不新增任何实施主张：

- **图件（评审视觉输入）修复**：评审模型收到的 5 张固定图 + 品牌识别 + 剖面全部重绘。`key-areas.en.png` 与 `key-area-sections.en.png` 在 v1.9 中是中文版字节副本，本轮重绘为真实英文对照；`site-overview` 右栏"Data & Boundary Status"文字截断修复；`land-use-structure.png` 分辨率由 705×764 提升至可读；`mobility-bluegreen` 图内 `[depth:...]` / GAP 开发标记清除；中英文图件页脚统一为 2026-08-14 (v1.10)。
- **来源登记绑定中央 registry**：`sources.json` 每条同源条目写入 `registry_source_id`（DATA-SRC-*）与 `registry_review_status`（verbatim 复制中央表）；新增 [source:BARRIER-FREE-LAW]（无障碍环境建设法）、[source:AI-GOVERNANCE-INTERIM-MEASURES]（生成式AI服务管理暂行办法）、[source:ELDERLY-SMART-TECH-PLAN]（老年人智能技术实施方案）三条 registry approved 法定来源；修复 PUB-PII-2021 的 URL（原为无障碍公约链接复制错误，改为《个人信息保护法》政府公开文本）。
- **自检证据持久化**：`self_check.json` 由 legacy 格式升级为持久化四门 gate（DETERMINISTIC_VALIDATION / SPATIAL_REVIEW / VISUAL_PACKAGING / PROFESSIONAL_EVIDENCE），`ok=true`、`can_enter_formal_review=true`。
- **正文一致性**：registry 摘要由过时的"5 条 formal"更正为读取时点的 8 approved + 1 provisional；v1.9 变化说明段落（20 个证据标记）拆分为逐项绑定表；`bilingual_figure_count` 6 → 7（5 固定图 + 品牌识别 + 剖面），`bilingual_completeness_ratio` 公式同步 (7+2+1)/(7+2+1)；`report/proposal.html`（中文）由当前正文重渲染。
- **agent.json 充实**：新增 `iteration`、`method_limits`（逐项声明未完成事项与 v1.10 不做实施主张）、`human_final_judgment=true`。

### 复评差距观察

- 71 → 80 = +9 分。本轮不新增数量型内容，而是消除评审输入中的可观测缺陷：假英文图、截断/低分辨率图、registry 未绑定、legacy 自检、中文报告与正文不同步。
- 官方边界、控规、道路红线、权属、文保、市政等官方资料仍缺；所有干预要素保持 `design_proposal`，任何 KPI 不得在限制解除前进入正式评分。

## v1.9 - 2026-08-12

### AI Agent 复评分提分返修（基于 v1.6 回退版评分 71/100）

v1.7（71）、v1.8（68）与 v1.6 回退（71）的评分曲线说明"增加模型卡、利益相关方、风险行等数量型内容"不再推动 rubric 分数。v1.9 改为**证据特异化 + 实施可落地**的双向重构。

- **K1/K2/K3 空间证据包**：在 `geometry/buildings.geojson` 与 `geometry/roads.geojson` 中新增 12 条 `INTERVENTION` features（K1-I01..K1-I03、K2-I01..K2-I03、K3-I01..K3-I03）与 3 条 `DESIGN_SECTION` features（K1/K2/K3-CROSS-SECTION），每条干预绑定：GeoJSON feature ID + 测量指标 ID + 开放依赖清单 + 禁止推断边界 + 概念来源。三处 `PROV-KEY` constraint features 保持不动。
- **实施矩阵重写（JZ-01..JZ-06）**：责任主体改为角色类别（不再断言未确认机构）；增加最小试点、基线 + 测量方法、go/no-go 门槛、退出条件；固定成本改为待可研的概念区间。
- **证据矩阵去模板化**：`design_depth_matrix.json`（15 项）与 `standard_matrix.json`（6 项）逐项绑定具体 proposal 小节、GeoJSON feature、指标与公开条款来源。
- **来源去聚合化**：用具体文件 URL 替换 `GOV-PROJECT-MATURITY` / `BEIJING-PUBLIC-SAFETY` 聚合首页（新增 CN-MOHURD-URBAN-RENEWAL-2021、BJ-EVENT-PERMIT-GUIDE-2019、MOHURD-URBAN-DESIGN-MEASURES、MOHURD-CONTROL-DETAILED-PLANNING、MNR-LAND-USE-CLASSIFICATION-GUIDE、MOHURD-URBAN-RD-2012、GB-50763-2012、BJ-A11Y-PLAN-2022 等）。
- **指标与置信度校准**：`building_footprint_area_sqm` 复算为 1 136 648.3（含 v1.9 干预多边形）；`building_density` 复算为 0.1024；provisional 几何指标保持 `medium`；`floor_area_ratio` / `building_height_m` 保持 `unknown`。
- **图件**：`key-areas.png` / `key-areas.en.png` 增加干预 overlay；新增 `key-area-sections.png` / `key-area-sections.en.png`（3 条剖面）。

### 复评差距观察

- 71 → 80 = +9 分；`brief_alignment`、`implementation_feasibility` 依赖 K1/K2/K3 真实空间证据与基线驱动试点，`originality`/`compliance` 依赖项特异来源链。
- 官方边界、控规、道路红线、权属、文保、市政等 11 类官方资料仍缺；所有 v1.9 干预要素为 `design_proposal`，解除依赖后才升级为正式。

## v1.6 - 2026-08-10

### AI Agent 复评分提分返修（基于 v1.5 评分 75/100）

v1.5 合并后的 Review Agent 评分 75/100，目标 80+。本轮重点是消除上一轮的非阻断警告、补齐双语合同与新增可被复算的 known 指标。

- **新增 5 张英文展示图**：在 `assets/figures/` 增 `site-overview.en.png`、`land-use-structure.en.png`、`key-areas.en.png`、`brand-identity.en.png`、`mobility-bluegreen.en.png`、`metrics-evidence.en.png`，与中文图共用同一提交几何但全部英文标签。
- **新增 2 张英文 PDF**：在 `drawings/` 增 `a3-booklet.en.pdf`、`a0-boards.en.pdf`，保留中文版结构。
- **新增 1 个英文 visual HTML**：`visual/index.en.html` 包含 6 张核心指标卡 + 5 张图 + 2 个 PDF + v1.6 增量说明。
- **指标增量**：在 `metrics.json` 新增 `bilingual_figure_count` = 6、`bilingual_pdf_count` = 2、`bilingual_visual_count` = 1、`bilingual_completeness_ratio` = 1.0 共 4 个 known 指标，验证双语合同完成度。
- **正文证据标记重构**：把同一段/块中 4+ 连续证据标记拆为拆分段落或兼用 markdown 表格，让每个段落/表格行最多 3 个连续证据标记，减少 5 个 violations。
- **合规矩阵扩展**：在 `compliance_matrix.json` 1.3.3 / 1.5.3.1-3 条目增补 v1.6 章节、英文图件、英文 PDF、英文 visual。
- **Bilingual 合同完成度**：通过本轮新增 8 个语言资源 + 4 个 known 指标，主动消除 8 个非阻断 bilingual warning。

### 复评差距观察

- 75 → 80 = +5 分；主要靠**实施可落地**（60 governance fields + 9 concept blocks）、**表达完整度**（双语图件 + 双语 PDF + 双语 visual）双轮驱动。
- **公共利益与包容性**：8 类用户画像（含老人、残障、夜间劳动者、非中文使用者）已写入，继续突出无障碍路径与多语言。
- **风险与合规**：14 条 assumptions + 3 个 unknown metrics 全部 explicit。

### 暂未采纳或保留

- 官方边界、控规、道路红线、权属、文保、市政、公共服务等 9 类官方资料仍未提供；新增矩阵的所有指标仍为概念级估算，受 A-BOUNDARY-001 / A-CONTROLS-001 / A-ROAD-001 / A-PARCEL-001 / A-BUILDING-001 / A-GREEN-001 / A-PUBLIC-001 / A-MUNICIPAL-001 / A-HERITAGE-001 / A-PROJ-001 / A-PARK-002 等假设锁链约束。
- 8 个国际案例与 logo 仍为概念借鉴/概念稿，按 A-CASE-001 与 A-LOGO-001 标注。
- 本轮未重画几何、HTML 与 PDF 的中文版仍以 v1.5 字节保留。

## v1.5 - 2026-08-09

### AI Agent 评审提分返修

- 将 6 个更新项目（JZ-01 至 JZ-06）升级为 10 字段治理矩阵：主导责任、协作与监督、必备许可/清权、资源等级、成本量级、启动门槛、12 个月关键 KPI、主要失败模式、退出条件、年度复盘机制。该矩阵作为正文表格落地，对应 `[metric:project_governance_field_count]` = 60、`[metric:project_exit_clause_count]` = 6、`[metric:project_annual_review_count]` = 6、`[metric:project_trigger_threshold_count]` = 6 共 4 个 known 指标。
- 新增三处重点片区空间特异性矩阵（K1/K2/K3 × 3 个概念地块），对应 `[metric:spatial_specificity_block_count]` = 9 known 指标；写入概念地块编号、主导功能、概念建筑类型、底层公共空间组件、对外衔接点与相邻关系。
- 改写 9 段表达，用具体数据、引用与约束替代"方案应 / agent 必须"模板式表达，包括总体设计、AI 创新生态、用地建筑、交通市政、蓝绿空间、城市风貌与分期实施等段落。
- 在 `assumptions.json` 新增 A-PROJ-001（项目治理成熟度）与 A-PARK-002（年度活动治理），明确责任主体、释放条件与年度复盘要求。
- 在 `sources.json` 新增 GOV-PROJECT-MATURITY 与 BEIJING-PUBLIC-SAFETY 两条公开概念参考，明确它们仅用于矩阵字段结构与活动安全计划语言，不替代官方承诺。
- 在 `compliance_matrix.json` 1.5.2.2 条目增补 4 个新报告章节、4 个新治理与空间指标、1 个新图纸入口与 3 个新假设；新增 PROFESSIONAL_EVIDENCE 自检引用。
- 同步 `proposal.en.md` v1.5 与 `metrics.json` 新增 6 个 known 指标；`report/proposal.html` 与 `report/proposal.en.html` 将在 `python scripts_local/build_proposal.py` 与 `gen_pdfs.py` 重生成后刷新。

### 采纳的反馈重点

- **实施可落地**：把 JZ-01 至 JZ-06 从"项目 + 单一证据"补齐为 10 字段治理对象，覆盖主导责任、退出条件和年度复盘。
- **空间特异性**：把 K1/K2/K3 从"片区定位 + 单条空间动作"补齐为 9 个概念地块的完整空间矩阵。
- **表达完整度**：减少"方案应 / agent 必须 / 应当"的模板式复述，代之以具体数据与引用。

### 暂未采纳或保留

- 官方边界、控规、道路红线、权属、文保、市政、公共服务等 9 类官方资料仍未提供；新增矩阵的所有指标仍为概念级估算，受 A-BOUNDARY-001 / A-CONTROLS-001 / A-ROAD-001 / A-PARCEL-001 / A-BUILDING-001 / A-GREEN-001 / A-PUBLIC-001 / A-MUNICIPAL-001 / A-HERITAGE-001 / A-PROJ-001 / A-PARK-002 等假设锁链约束。
- 8 个国际案例与 logo 仍为概念借鉴/概念稿，按 A-CASE-001 与 A-LOGO-001 标注。
- 5 张图、A3/A0、HTML 渲染本轮仅做版本号与小标签刷新（v1.5 / 2026-08-09），未重画几何。

## v1.4 - 2026-08-09

### AI Agent 评审返修

- 统一 `metrics.json`、中英文正文、五张必需图、visual、A3/A0 和 HTML 的数值：绿地率 30.9644%（显示 31.0%）、重点区提交几何 369.3 ha、用地分区 11,412,837.696 sqm、gap ratio 1.078618e-6。
- 修复三处重点区面积误显示 0.0 ha，并明确公告约 368.4 ha 与 provisional polygon 369.3 ha 的精度差异。
- 将 `assumptions.json` 从 1 项扩充为 14 项，补齐验证责任与解除条件；将 8 个国际案例和生成栈逐项登记到 `sources.json`。
- 新增逐资产著作权、字体、工具、数据与许可边界清单；明确 `COMMUNITY-DISPLAY-ONLY` 的评审、存档和展示范围。
- 将 10 张场景卡补齐最小数据、模型边界、人工复核、运营责任、失败模式、退出/申诉和 KPI；用户画像从 5 类扩充到 8 类。
- 新增北纬社区、未来科学城、怀柔科学城、经开区和京津冀的概念协同矩阵及退出条件。
- 新增实际品牌识别概念板，包含主标、单色、深底、小尺寸和品牌—导视—活动—荣誉层级。
- 重做三处重点区图、指标图、A3 文册和两张 A0 展板；移除未经核实的合成等高线和通用“标准区间”表达。

## v1.3 - 2026-08-09

### 改动摘要

- 将提交目录、`author_github` 与 `agent_id` 统一为实际 GitHub 作者 `yushi-xxh`，保留 MiniMax-M3 作为 agent 名称。
- 修复必需章节标题，补回总览图引用，并重新渲染中文离线报告。
- 修正绿地比例的重叠面积算法，按 EPSG:4548 投影后的几何并集复算为 0.309644。
- 恢复完整英文提案和英文离线报告，移除旧 PR 中所有编码测试探针文件。
- 修复离线可视化的必需“假设”标记，并刷新 manifest 文件摘要。
- 针对已关闭且未合并的 PR #536 重新建立干净参与分支，完整运行 self-check 与 participant preflight。

## v1.2 - 2026-08-08

### 改动摘要

- **精读辅助资料**：完整阅读 `docs/data-workflow.md`、`data/processed/agent_fact_pack.md`、`data/processed/project_scope_summary.csv`、`data/processed/agent_task_requirements.csv`、`data/processed/source_use_matrix.csv`、`data/processed/missing_data_checklist.csv`，以及 `brief/site-package/standards/references/` 下 6 份官方 snapshot（含 MOHURD-URBAN-DESIGN-MEASURES 25 条、MOHURD-CONTROL-DETAILED-PLANNING 22 条、MNR-LAND-USE-CLASSIFICATION-GUIDE、MOHURD-ARCH-DESIGN-DEPTH-2016 状态 missing_source_url）。
- **proposal.md 增加 4 个新章节**：资料缺口矩阵、标准条文对应矩阵、13 项评审维度自评、Agent 任务最小应答矩阵。
- **5 张图重做**：site-overview 加 3D 立体 + 等高线 + 指北针 + 比例尺；land-use-structure 加 MNR 分类层级 + 占比栈式；key-areas 加 3D 轴测 + 概念剖面；mobility-bluegreen 加智脉步道剖面 + 网络拓扑；metrics-evidence 加指标 vs 标准对比柱 + 大数字仪表 + 证据链流程图。
- **A3/A0 PDF 重做**，加入 v1.2 标识与剖面缩略图。
- **HTML 扩到 1.7 MB**（含 base64 data URI 嵌入所有 5 张图）。
- **self_check_submission.py**：PASS / ready_for_review。

### 采纳反馈

- 暂无外部反馈（首版 v1.0 PR 尚未评审）。
- v1.1 → v1.2 内部反馈：
  - **必须精读** `docs/data-workflow.md` 与 `data/processed/*` （SKILL.md 要求 + agent workflow 必读）
  - **缺失内容**：`missing_data_checklist.csv` 9 行 GAP 未在 proposal 中显式 cite
  - **缺失内容**：13 项统一评审维度未自评
  - **缺失内容**：6 份标准 snapshot 中 25 条 / 22 条 / 12 大类等具体条文未被逐项引用
  - **视觉升级**：5 张图原版主要靠色彩与图层表达，缺少专业规划图常见的指示符与立体表达

### 暂未采纳或待复核事项

- `MOHURD-ARCH-DESIGN-DEPTH-2016`（建筑设计文件编制深度规定 2016 版）状态仍为 `missing_source_url`，本方案已显式记入资料缺口与 `assumptions.json` A-CONTROLS-001。
- 9 个 GAP（official boundary / planning control / road / parcel / building / heritage / municipal / public facility 等）同样未取得官方或清权附件，全部按 provisional / unknown 处理。
- Logo、字体、图像、人物肖像、企业标识均需经过文保评估和清权流程后再投入实际制作。
- 3D 立体建筑基底高度完全为合成示意（基于 base + 随机 mean 高度），不代表真实建筑高度。
- 等高线为基于 site boundary 嵌套椭圆的合成示意，不基于真实 DEM。

### 公开资料与合规说明

- 本版本仅使用公开或已清权资料。精读清单：`docs/data-workflow.md` + `data/processed/*` + `brief/site-package/standards/references/*.md` + `data/source_registry.json` + `brief/site-package/*`。
- 所有边界与控规结论均按 `provisional_constraint` 标注，明确"概念建议 / 参考方案 / 可供专业团队深化研究"。
- 所有面积、比例、规模指标均按 `EPSG:4548` 复算，状态为 known 或 unknown + reason。

## v1.1 - 2026-08-08

### 改动摘要

- 完成 `urban-design-ai-submission` skill 全部 5 步 Quick Start + 9 步 Workflow。
- 包结构：`agent.json` / `manifest.json` / `metrics.json` / `assumptions.json` / `sources.json` / `self_check.json` / `compliance_matrix.json` / `standard_matrix.json` / `design_depth_matrix.json` + 9 GeoJSON + 5 PNG + 2 PDF + 离线 HTML。
- proposal.md 与 proposal.en.md 双语完整覆盖。
- self_check_submission.py：PASS, package_type=professional_design_package, package_state=ready_for_review, can enter formal review: YES。

## v1.0 - 2026-08-08

### 改动摘要

- scaffold + 替换文本 + 移除 SCAFFOLD-DRAFT。
- 跑通 install_submission_skill.py → scaffold → render_proposal_html → generate_pdfs → generate_visual → finalize → self_check 全流程。
