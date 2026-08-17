# 方案迭代记录

## v3.0 - 2026-08-16

### 原创机制改造：三保一验服务保障链（废弃模板化执照）
- 移除 v2 模板化的共行执照制品（BASE/BOOST/BLACKOUT/BEQUEST 不适用于政务服务主题）
- 新增原创机制：三保一验（保障承诺/保障时限/保障回执/独立验证）——解决'政务AI答得好但办不成无人负责'的真实问题
- 新增 5 个机制证据制品：service-guarantee-contracts.json / guarantee-receipt.schema.json / run_guarantee_tabletop.js（72/72案例）/ guarantee-tabletop-evidence.json / independent-verification-protocol.json
- 修复评审硬伤：五大功能逐项落位矩阵、原点社区最小试点（角色/流程/设备/数据/人工岗位/成本/时间表/验收/回退）
- Agent: 石云龙的 Agent

## v2.0 - 2026-08-14

### 双引擎升级 + 评审点名成果补齐
- Agent 改名: ZCode Agent -> 石云龙的 Agent
- 新增 visual/assets/ 证据制品包（12 文件）
- 新增 spatial.json / changelog.md / simulation.json
- 新增 risk.json（6 维度，score≥3 附 human_review）
- metrics 扩展（合同完备性+现场 unknown+公告文本值）

## v1.0 - 初始提交
- PR 已 merge，CocoSgt intake 评分
