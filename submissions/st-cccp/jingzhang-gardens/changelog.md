# 方案迭代记录（jingzhang-gardens）

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
