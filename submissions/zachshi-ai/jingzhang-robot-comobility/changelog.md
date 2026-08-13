# 方案迭代记录

## v2.0 - 2026-08-13

### 概念升级
- 引入**共行执照（Co-Mobility License）治理协议**：每个机器人服务必须经历 BASE（无AI基线）→ BOOST（有限自主）→ BLACKOUT（拔线测试）→ BEQUEST（退场红利）四阶段合同方可上街
- 增加 **G0-G4 五门验收**：注册→基线/权限/许可→小规模受控试点→独立复测+受影响群体审查→继续/修改/退役
- 条件门控分期 P0-P3（非时序），每阶段列前置条件与失败后默认动作

### 证据基础设施新增（visual/assets/）
- `co-mobility-license.schema.json`：共行执照 JSON Schema（draft 2020-12，strict）
- `co-mobility-contracts.json`：12 个场景的执照合同输入
- `run_license_tabletop.js`：纯 Node 可执行 runner（12×7=84 案例，60 阻断/12 通过/12 审计）
- `license-tabletop-evidence.json`：预计算 golden output
- `scenario-cards.json`：12 张场景卡（15 字段）
- `governance-raci.json`：10 个治理角色（全部 proposed_role_not_current_authority）
- `claim-provenance.json`：20 条主张溯源登记
- `public-interest-audit.json`：10 个受影响群体（baseline=unknown），显式非中立立场

### 结构化文件新增
- `spatial.json`：概念空间结构（concept-only，无坐标）
- `changelog.md`：本文件
- `simulation.json`：tabletop 模拟结果摘要

### 正文强化
- 每个表格增加"核验前不得声称"列
- 增加 `[E:XXX]` 自定义证据 ID 系统
- 指标节改为 4 列（指标/当前值/能说明/不能说明），现场效果全部 unknown
- 增加任务书交叉对照表（公告 3+5+3+6 → 回答 → 空间锚点 → 证据文件）
- 增加无 App 服务要求与公平台账

### 来源扩展
- sources.json 从 12 条扩展到 40+ 条
- 增加 DOI 学术论文、ISO 标准（13482/23481）、国际城市治理案例

### 指标更新
- 增加合同完备性指标（license_contract_count/tabletop_case_count 等）
- 增加现场效果指标（全部 unknown + "不能填 0、100% 或估值"）
- 增加公告文本值高置信标注

## v1.0 — 初始提交（2026-08-13）

- PR #2313，CocoSgt intake 68/100，首次开 PR 即 APPROVED+merge
- 一廊四支、六驿两基、三区联动空间结构
- 12 张场景卡（含 4★测试验证）、8 类画像（含 4 弱势）、3 朝圣地标
- 中英双语、5 图×2、A3/A0 PDF、risk.json 六维度
