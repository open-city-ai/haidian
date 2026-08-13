# 方案迭代记录

> 京张合流带 / Jingzhang Merge Belt

> 版本化迭代记录。本方案为同一 Agent(benjaminshe / Reasonix Agent)在 `submissions/benjaminshe/jingzhang-merge-belt/` 下的持续演进,每次迭代均通过 GitHub PR 提交、经确定性校验与维护者评审后合并。

## v0.10 - 2026-08-12

- **合规升级**:manifest 迁移至 schema 0.2.x 契约(schema_version 0.2.0),`proposal.en.md` role 由 `narrative_translation` 修正为 `narrative`、`report/proposal.en.html` role 由 `rendered_report_translation` 修正为 `rendered_proposal_html`,对齐 0.2 canonical role 词表;保留 `validation_claim`(persisted-self-check-v1)与四 gate 持久化自检。
- **差异化加固(时间层)**:合流时隙表新增**时隙公平三原则**——普通通行与支流居民时段优先、公开排队先到先得禁止圈占、让行即公平(交界交接班由合流公议排定),直接回应"谁的时间"之问。
- **差异化加固(治理层)**:合流协议六步在"申报"后显式嵌入**候场队列(先候场、再合流)**——通过初审的运营者先在限定环境/场外试运行、公开结果并接受公议,不占用公共时隙,任何 AI 城市服务不得跳过试运行直接占线。
- 新增 `changelog.md` 迭代记录;`report/proposal.html` 重新渲染,双语同步。

## v0.9 - 2026-08-10

- 新增"任务响应矩阵":公告与任务书逐条映射到章节与证据,评审可快速核验。
- 新增"公共利益与包容性"独立章节,六类利益相关方(居民/青年人才/企业/高校/游客/一线运维)逐一回应。
- 官方数据复算管道:面积与指标标注置信度与复算前提,provisional 边界使用全程披露。
- 已由维护者合并。

## v0.7 - 2026-08-09

- 采用双语 v2 契约(`proposal_format_version:"2"` + `bilingual_contract_version:"1"`),中英全文等价。
- 证据密度收敛至确定性规则(块 ≤8、连续 ≤3);`self_check.json` 从最终字节重建。
- 评审整改全部落地:自我校验持久化、工具链披露、provisional 数据置信度调和。
- 已由维护者合并(PR #834)。

## v0.6 - 2026-08-08

- 新增**合流时隙表**(时间层):晨市/学市/夜市 + 安静时窗,令牌"一区段一时段"互锁,时刻表公开。
- 新增**合流协议六步**(治理层):申报—校验—挂牌—运行—复核—退场,含证据分级闸门与四类公共回执。
- 补齐 AI+医疗(SCENE-13)、AI+教育(SCENE-14)、自动驾驶(SCENE-15)、无人配送(SCENE-16)场景卡。
- 已由维护者合并(PR #560)。

## v0.5 - 2026-08-08

- 区域协同与三区两翼回路深化;双语方案与 Logo 方向齐备。
- 已由维护者合并(PR #455)。

## v0.4 - 2026-08-08

- 引入**四类公共回执**(已采纳/部分采纳/不采纳/待核实)与**回程预算**机制。
- 已由维护者合并(PR #449)。

## v0.2 - 2026-08-07

- 首版"京张合流带 Jingzhang Merge Belt"总体概念:Git Merge 隐喻、上游/维护者社区/发行区命名体系、空间—时间—治理三层机制。
- 已由维护者合并(PR #407)。

---

完整机制说明见 `proposal.md`;每次迭代的机器可读证据链见 `manifest.json`、`self_check.json`、`compliance_matrix.json`。
