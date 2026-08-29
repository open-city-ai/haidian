# 方案迭代记录（jingzhang-gardens）

## v1.2.4 - 2026-08-29（M-7 口径声明落位：frontmatter 三层轨道/场景口径 + 摘要层正典映射）

### 改动摘要

- **M-7（P2，relevance 终评「Q8 md 层 tracks↔scenarios 对齐不可验」）前置落位**：proposal.md / proposal.en.md frontmatter **新增两字段（纯加性，双语文本镜像）**——
  - `tracks_note`：三层口径声明——tracks＝提报轨道分类层（8 项，其中 3 项正文锚定：enterprise-services-ecosystem 西翼要素服务链段 / ai-traffic-walkability「无障碍园径」段 / civic-agent-governance 园规 R1–R5 映射表「可复核」行）；scenarios＝提报摘要层（5 项 highlight slug，**早于正典场景体系的历史命名，保留作提报标识**）；§7.3 场景卡 S-01~S-13＝正典场景层；三层命名空间不要求互相包含。
  - `scenario_mapping`：摘要层 5 slug 全量映射至正典层——ai-traffic-walkability→S-01+园径慢行/无障碍、enterprise-service-copilot→S-09、public-safety-operations-review→§18 专章+S-03 基准评测口径、ai-cultural-guide→S-04、robot-delivery-low-speed→B-03+S-01/S-02 测试组——无悬空、无重名、无外延声明。
- **影响面实测**：渲染脚本仅消费 frontmatter 的 title/summary/translation_file 三字段，新增字段不入 HTML/PDF 输出 → **HTML×2 与 PDF×4 字节不变、无需重渲**（三层同构维持）；仅 md 双语两行 rehash（proposal.md `550a2721…`→`5848b799…`、proposal.en.md `327280d0…`→`451d0fb8…`）。
- **M-6（md 追加件）同批安排**：本条与 md 双语原件、compliance_matrix、visual 双页、changelog 共 6 件经 hub 附件通道一次性发 reviewer-relevance（其 13:05 信选定的 A 通道），供其一轮 certutil 双闸实算同时闭 M-6/M-7/M-2/M-3-post-fix 四项。

### 采纳反馈

- reviewer-relevance 13:05（fec2）：M-6/M-7 定义全文补齐（均为 P2、同批触发、≤70min 一轮可完）；其建议「关包 commit 前完成 M-6 更稳」——本条即按此时序执行（外层 commit 尚未发生）；4 件 post-fix 复验通道选 A（hub 附件再试）+ C（base64 信体内联）兜底、明确拒绝 B（读上游工作区越界）——遵其选择。

### 暂未采纳或待复核事项

- M-6/M-7 的 relevance 独立复验结果待其回执（A 通道若再失联即转 C）。
- 外层工作区 commit 仍待用户执行（命令已随 v1.2.3 更正信送达，gitlink 目标现为内层最新 commit，见 manifest）。

### 公开资料与合规说明

- 同 v1.2 口径；本条仅 frontmatter 元数据加性声明（双语镜像），无正文内容、空间内容与渲染层改动。

## v1.2.3 - 2026-08-29（PDF×4 重渲落位 + M-5 同源闭环：md↔HTML↔PDF 三层全同构）

### 改动摘要

- **PDF×4 重渲落位（design-node 10:47-10:48 批，本轮回执 12:42 全量内联台账 + canonical 直取）**：`report/proposal-A4.pdf` 2,271,191B `c505a37c…`、`report/proposal-Letter.pdf` 2,272,545B `6ad48525…`、`report/proposal.en-A4.pdf` 1,515,330B `f3e57e93…`、`report/proposal.en-Letter.pdf` 1,522,170B `1f42e8d7…`。落位双闸 4/4 PASS（bytes + sha256 逐一核对 design-node 信内台账）；manifest 四行按新真值重锚。字节差 vs 14:59 旧批 +177/+135/+134/+2,153（<0.2%，PDF 对象流压缩非确定性正常范围；en-Letter 稍大 = §15.3 表格分页重排）。
- **M-5（PDF 同源）闭环**：渲染命令（pandoc 3.8.3 + xelatex/TeXLive 2022，Microsoft YaHei CJK）+ 源字节审计链齐备——渲染前后 proposal.md `550a2721…`（199,116B）/ proposal.en.md `327280d0…`（258,115B）与 manifest 登记逐字一致，源零改动三禁令回执（源/manifest/fig-6/7）齐。**§15.3 句漂移（旧批唯一已知差异）随本批消除 → md↔HTML↔PDF 三层全同构**。
- **HTML×2 零改动确认**：design-node 独立重渲（10:51）输出与盘上 `d2e11df4…` / `e8883087…` **逐字节一致**（渲染器确定性，§15.3 句修订对 HTML 输出零影响）→ HTML 两行无需 rehash，跨节点可复现性获证。
- manifest 同步：PDF 四行 rehash + changelog 行 rehash + generated_at + pending_reason（M-5 关闭，外协渲染链全清）。

### 采纳反馈

- design-node ce43 回执（12:42）：两件委托 10:47-10:51 完成但 10:50/10:55 回信经 hub 转运丢失（信体通道首次 observed 破例）——我方 12:25 催报触发全量内联补账；三问全答（收达✓/无阻塞✓/无需降级✓）。

### 暂未采纳或待复核事项

- relevance 终评六项发现至此 M-1~M-5 全闭环（M-1/M-4 v1.2.1、M-2/M-3 v1.2.2、M-5 本条）。
- 外层工作区 commit 仍待用户执行（托管模式对外层仓持 commit-policy exception 口径）。

### 公开资料与合规说明

- 同 v1.2 口径；本条仅渲染产物层（PDF×4 + 台账），无空间内容、正文与机读层改动。

## v1.2.2 - 2026-08-29（relevance 终评 M-2/M-3 落位：机读层 agent_inferred 填实 + visual 场景卡对齐正典）

### 改动摘要

- **M-2（P1）compliance_matrix.json agent_inferred 按行分类填实**：修正此前 23 行 `agent_inferred` 全为空集、与 §17.3 四档口径（carriers：concept_mechanism / rule_schema / trigger_matrix / carrier_design）矛盾、charter.7 R-02 人类复核对象在机读层为空集的缺陷。赋值规则（已写入 annotation_policy）：① concept_mechanism 注于全部 23 行（各行证据清单均含「三层范围工作框架」等本方案自拟的工作流分解与概念机制层）；② rule_schema 加注 3 行（1.5.2.2 / agent.2 / agent.6——园规 R1–R6 实际锚定行）；③ trigger_matrix 加注 2 行（1.5.2.2 / agent.6——§14 触发矩阵锚定行）；④ carrier_design 加注 6 行（1.5.2.4 / 1.5.3.1~1.5.3.3 / agent.4 / agent.6——B 系列业态承载与园丁认证锚定行）。python json.load 验证：23 行、0 空集、载体分布 {concept_mechanism:23, rule_schema:3, trigger_matrix:2, carrier_design:6}。
- **M-3（P1）visual/index.html + visual/index.en.html 场景卡 sheet 对齐正典**：原 10 卡为 S 卡体系建立前的旧命名（开源发布厅 / 人才生活管家 / 低碳算力驿站等——该等场景命名在正文中已不存在），与正文 §7.3 场景卡体系（S-01~S-13）不一致。本轮 zh/en 双语整卡替换为正典 S-01~S-13（名称与一行描述逐卡对齐 §7.3；en 名称对齐 proposal.en.md 正典译名），sheet 标签改「13个AI场景卡（§7.3 S-01~S-13）」，sheet 说明补「与正文 §7.3 一一对应」句。选择整卡替换而非「注节选说明」：旧卡名在正文中已无对应物，节选说明会把失效命名固化进交付物。结构断言：双页各 13 卡、旧命名零残留。
- manifest 同步：compliance_matrix / visual zh+en 三行 rehash + changelog 行 rehash + generated_at / pending_reason 更新（M-2/M-3 自待办清单移除）。

### 采纳反馈

- reviewer-relevance 终评（rel-supp-3-2247）M-2/M-3 于 v1.2.1 承诺「下轮落位」，本轮兑现；M-1/M-4 已于 v1.2.1 修复并经其 10:52 回执闭环，M-5（PDF 同源）仍待 design-node 重渲后一并验。

### 暂未采纳或待复核事项

- M-5（PDF×4 同源）待 design-node HTML×2 / PDF×4 重渲交付后按新真值重锚四行并验同源。
- 外层 commit 仍待用户删除 `.git/index.lock` 陈旧锁后执行。

### 公开资料与合规说明

- 同 v1.2 口径；本次仅机读层与可视化页对齐修复，无空间内容与 proposal 正文改动（proposal.md / proposal.en.md 双语与 report/*.html 均未触碰）。

## v1.2.1 - 2026-08-29（终包锁定后台账修复：relevance 终评 M-1/M-4）

### 改动摘要

- **M-1（P0，relevance 00:02 终评）manifest 哈希台账 4 行修复**：22:50 重锚时新 HTML 哈希（d2e11df4 / e8883087）误贴入两个 A4 PDF 行、HTML 两行未更新，致 4 行损坏且真 PDF 哈希从台账丢失。本轮 certutil 实测修复：`report/proposal.html` 行 → d2e11df4…、`report/proposal.en.html` 行 → e8883087…（与实件一致）；`report/proposal-A4.pdf` 行 → d7a6a7e8…、`report/proposal.en-A4.pdf` 行 → 163206c0…（14:59 批真值恢复；design-node §15.3 重渲交付后按新真值再锚）。Letter 两行经 certutil 复核本就正确（989649be… / df56d5f2…），未动。
- **M-4（P1）metrics.json 三处修复**：site_area_sqm confidence high→medium、assumption 改为 provisional 口径（#PROV-SITE-001, official_boundary=false，与 §15.1 一致）；新增顶层 `sources` 块（五图层来源 + A-1/A-TRIGGER-001 复算触发）；新增 `garden_line_spine_length_m = 9715.87`（ROAD-001，§15.1 配套值入册，兑现 §15.2「全部指标机读化」）。
- manifest 同步：metrics 行 rehash（c3cb5ea4→0cf0191d）+ changelog 行 rehash + pending_reason 更正叙事（22:50 entry 的 d7a6a7e8→d2e11df4 / 163206c0→e8883087 实为 PDF 哈希误作 HTML 哈希，本行更正）。

### 采纳反馈

- reviewer-relevance 补评终评（rel-supp-3-2247，00:02）：六类核查——①HTML 同构通过、②visual 对账数据侧通过、③三矩阵闭环通过、⑤§17.4 通过、⑥机读层通过；M-1 即本轮修复对象，M-4 同窗落位；M-2（agent_inferred 桶空 vs §17.3 口径）、M-3（visual 场景卡 10 vs 正文 12）下轮落位；M-5（PDF 同源）待 design-node 重渲后一并验。

### 暂未采纳或待复核事项

- M-2/M-3 计划下轮：compliance_matrix agent_inferred 逐行补条目（或修 §17.3 口径声明）+ visual/index.html 场景卡 sheet 补齐 S-11/S-12 或注「节选 10/12」。
- PDF×4 仍为 14:59 批（c0b320df 时代源）——§15.3 句漂移为唯一已知差异；design-node 重渲交付后 A4/Letter 四行按新真值重锚 + M-5 同源验。

### 公开资料与合规说明

- 同 v1.2 口径；本次仅台账与机读层修复，无空间内容改动。

## v1.2 - 2026-08-28（终包锁定）

### 改动摘要

- 内容层十项决策（A1-A10，用户 2026-08-28 01:48 全部批准）落位：公共性画像 11 类与三层时段表（A1）、R5 量化基线六项（A2）、园规可达扩展 R6（A3）、S-03 治理产品七项工程规格（A6）、国际名词谱系定位（A7）、遗产保护对接清单（A8）、§14 触发矩阵（A9）、§18 公共安全与灾害韧性专章（A10）。
- 三轮评审意见闭环：originality v2 八问（§6.3/§6.4 回路表述改写为「各自独立运行、偶发性交集」，§11.1 物候限定句，§12.1 口号定位句）；compliance 八问（§17.3 法律免责声明块、四档来源等级表、A-9 机读层行）；ai-urban R3 八问（S-13 智能体沙盒卡、B-01 T3→T2 升级门限三条件、S-01 ODD 与接管预算、AI+ 五领域接入锚点）。
- 机读层：compliance_matrix.json 增补 source_grade_schema（direct_public / derived_public / processed_reference / agent_inferred 四档）；§17.4 人类复核节点附录（charter.7，A-9）双语落位；compliance 回归评审 P0 修复（21:38）：23 行 requirement 逐行补齐 `source_grade` 字段（按 §17.3 四档对 source_ids 做级别映射），proposal 双语 §15.3 行数声明统一为实数 23 行（原「约 53 行」口径废弃）。
- 资产层：fig-6~10 全部双语 PNG 落位（双闸验收：字节 + sha256 + 视觉五维复检）；proposal 双语占位→内嵌升级 10 处完成；report/proposal.html（235,744B）与 report/proposal.en.html（300,897B）本地终渲（用户 12:53 授权通道），图源校验 10/10 zh + 10/10 en。
- PDF×4（proposal zh/en × A4/Letter）由 design-node 以 pandoc 3.8.3 + xelatex（TeXLive 2022，Microsoft YaHei CJK）自同一终版源渲染交付（源文件零改动），本地落位经字节 + sha256 双闸 4/4 通过，登记入 manifest。
- self_check.json 四闸（deterministic / spatial / visual / professional）全 pass，can_enter_formal_review = true；内容门 17 模式扫描 zh/en 均 0 命中。

### 采纳反馈

- reviewer-originality v2：8 问全部处置（Q3/Q5/Q7 全采纳，Q4 重构采纳，Q6/Q8 部分采纳并兑现，Q1/Q2 经用户 A 决策落位）。
- reviewer-compliance v1：8 问全部落位，Q5 机读层按 A-9 验收。
- reviewer-ai-urban R3：8 问处置表已发（Q1/Q4/Q5/Q6/Q7/Q8 ✅，Q2/Q3 概念层闭合 + 挂账），异议窗口至终包关闭。
- design-node P0-P3 系列：P1 切片（园丁认证、触发矩阵）、P2 五图规格、P3 图件三轮重渲全部验收并入包；P0 三块因结构冲突降级为工程层深化候选池，未切片。
- 用户 10 A 决策与 12:53 授权（执行通道恢复 + 时间表要求）。

### 暂未采纳或待复核事项

- P0 工程层深化文本（§18/§19/§5.5 另一视角版本）保留在协作档案，未并入正卷（避免与既有结构重复叙述）。
- 可引用史实锚点（汪菊渊《中国古代园林史》/陈从周《说园》）仅作背景引用，终稿实引前须核对原文与观点归属。
- Letter 版式 PDF 作为 A4 主版式的变体提供（required: false）。

### 公开资料与合规说明

- 本版本仅使用公开任务书与可公开资料；机读层逐行标注来源等级（四档 schema）；不包含个人隐私、涉密资料、内部图件或未审定规划控制指标。
- 本方案为概念提案（concept proposal），不构成合规承诺或认证；开源制度产品的法律免责声明见 §17.3。

## v1.1 - 2026-08-25

### 改动摘要

- manifest 哈希口径修正（metrics.json CRLF→LF canonical，commit ec0fd398）。
- 设计深度矩阵、标准矩阵、合规矩阵三矩阵定稿口径对齐。

## v1.0 - 2026-08-24

### 改动摘要

- jingzhang-gardens 专业设计包首版提交（commit 80f682bc）：proposal 双语、10 类几何图层、5+5 图件、A3 手册与 A0 展板（双语）、visual 总览、manifest 0.2.0 全量登记。

### 采纳反馈

- 任务书硬约束自检（6 条）全过。

### 暂未采纳或待复核事项

- 建设强度、道路线位、设施落位与权属判断需在深化阶段以断面图与现场核对校准。

### 公开资料与合规说明

- 同 v0.1 口径。

## v0.1 - 2026-06-14

### 改动摘要

- 创建方案初稿，说明核心概念、空间与产业方案、AI 治理场景和落地路径。

### 采纳反馈

- 暂无，首版提交。

### 暂未采纳或待复核事项

- 具体建设强度、道路线位、设施落位和权属判断均需基于公开资料进一步复核。

### 公开资料与合规说明

- 本版本仅使用公开任务书和可公开资料，不包含个人隐私、涉密资料、内部图件或未审定规划控制指标。
