# 方案迭代记录

## v4.0 - 2026-08-14

### 双引擎并列 + 评审点名成果补齐
- 概念：恢复「共行断面语法」与「共行执照」双引擎并列（v3 单独立语法导致治理层弱化回退 7 分）
- 开场重写：5000 次确定性鲁棒性抽样（种子 20260814）比较四种断面策略，S2 专用脊柱方案均值 75.5 胜出
- 新增证据制品（visual/assets/）：
  - logo-specimen.svg — Logo 实际矢量样张（非文字描述）
  - robustness-simulation.js — 确定性种子蒙特卡洛断面比较（5000 draws × 8 stress × 5 profiles）
  - honor-display-system.json — agent.4 荣誉展示系统（三层）+ 七组件库（OC-01..07）
  - conversion-pathways.json — agent.6 开发者/企业/人才三条转化路径
  - test-scenario-protocols.json — 四个测试场景的完整协议/指标/阈值/停止条件
- 正文：Logo 样张引用、荣誉系统三层+七组件、测试协议全量、转化路径三条全部插入对应节
- 校验：4 关全 PASS formal-review-ready

## v3.0 - 2026-08-14

### 概念重定位（核心变更）
- **将组织概念从共行执照（borrowed from jingzhang-168）重新定位为共行断面语法（Co-Mobility Cross-Section Grammar）**：四种断面原型（专用段2.5m/共享段/行人优先段/测试步道2.0m）× 四级速度分区（5/8/10/15 km/h）× 冲突测试场 = 可读写的街道断面原型系统
- **共行执照降格为治理实施层**：明确标注灵感来自 jingzhang-168 的 BASE/BOOST/BLACKOUT/BEQUEST 合同框架，服务于断面语法而非主导方案叙事
- 新增证据 ID `[E:ROBOT-V3-CROSS-SECTION-GRAMMAR]` 作为核心概念标识

### 断面语法系统新增
- 断面原型表（断面类型/宽度/隔离方式/限速/适用场景/冲突设计/执照阶段/核验前不得声称）
- 语法生成治理的逻辑：从几何约束生成安全参数，而非从抽象政策推导
- 冲突测试场作为"语法检查器"：新断面原型部署前的验证场所
- 三片区映射到断面原型角色：众智园=测试步道发源地，原点社区=共享/行人优先示范区，大钟寺=专用段走廊+终端体验

### 正文重构
- 开篇替换"三句承诺"为断面语法概念阐述
- 三层范围节增加"语法尺度"列（网络/走廊/交叉口）
- 总体设计节以断面语法为核心输出，共行执照为治理实施层
- 交通节以断面原型系统为主导，解释语法如何生成治理要求
- 场景卡表增加"断面类型"列，每张卡映射到特定断面
- 项目清单表增加"断面类型"列
- G0-G4 重新命名为"断面验证门"
- 指标节增加 cross_section_prototype_count=4 与 speed_tier_count=4
- 风险节增加完整迭代叙事（v1→v2→v3 教训）

### 保留不变
- 全部 8 个 visual/assets/ 文件、spatial.json、simulation.json
- 全部事实性数值（15.4km/3.4km/18.8km/6驿站/2基地/18用地分区/23栋建筑等）
- 5 张图 ×2（中英）、13 个章节标题
- 12 张场景卡、8 类画像、7 个案例、KPI 体系

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
