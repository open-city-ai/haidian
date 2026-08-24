# 贯穿叙事线：原力四相（One-line Thesis & Quad-Phase Thread）

本文件是「京张·原力」方案的**可读性中枢**：把一句话主张展开成一条贯穿全文、可被评审逐章回溯的叙事线。它不与 proposal.md 重复，而是为 proposal.md 的每一章提供一个统一的「相」（phase）标签，使十三章的结论可在同一生命周期下被串联、被验证、被撤除。

## 一句话主张（One-line Thesis）

> 百年前京张铁路解决的是**人和货怎么翻过山**；今天这条走廊要解决的是**人和智能体怎么共用一座城市**——而共用城市的前提，是二者在同一个公共空间里都拥有**可被看懂、可被审计、可被否决**的界面。

这一主张是 proposal.md 所有空间动作的终点：研发不再封闭在楼宇里，遗产不再躺在围栏后，二者在一条连续公共客厅里相遇。

## 原力四相（Quad-Phase Thread）

方案的贯穿叙事不是愿景宣言，而是一条可被分阶段检验的** civic lifecycle**。每一「相」都对应 proposal.md 的具体章节、证据文件与退出条件；任一相失效，方案整体可被降级或撤除，不留下不可逆后果。

| 相 | 英文名 | 回答的问题 | 核心机制 | 承载章节 | 证据文件 | 退出 / 撤除条件 |
| --- | --- | --- | --- | --- | --- | --- |
| ① 共建 | CO-DESIGN | 界面由谁定义？ | 临时边界口径 + 资料分级 + 负责任务禁区 | 第二、三章 | `assumptions.json` `sources.json` `boundary-source` | 官方精确红线发布后，仅替换 `geometry/site_boundary.geojson` 并重跑复算，文本无需改写 |
| ② 试用 | TRIAL | 能不能先在真实空间里小规模验证？ | 一期试点 RACI / 资金 / 退出矩阵 + Z1–Z3 验收门槛 | 第十、十一章 | `risk.json` `simulation.json` `v2-evidence-gate-index.json` | Z1–Z3 任一门槛连续两次不达标 → 试点暂停，不扩面 |
| ③ 共管 | CO-GOVERN | 多方怎么在同一规则下协作？ | 五界面区域协调矩阵（责任+证据+退出） | 第三章、第十二章 | `region-coordination-matrix.json` `compliance_matrix.json` | 任一界面责任主体缺位或证据不可复核 → 该界面不得进场 |
| ④ 可撤 | REVERSIBLE | 出错时能不能退回去？ | 可逆基座 + 撤除准备金 + 公众否决通道 | 第六、十二章 | `asset-rights-ledger.json` `risk.json` `evidence-ledger.json` | 高风险拦截或公众否决触发 → 智能体动作即时降级 / 撤除 |

## 与六类标杆能力的对应

- **一句话主张**：见上，proposal.md 开篇「一句话主张」块与其逐字一致。
- **贯穿叙事**：本文件的「原力四相」是 proposal.md 各章的统一索引；章内结论均带编号（Z/W/X/S/R/M/K），可沿编号回溯到本表。
- **五界面矩阵**：③共管相的展开见 `region-coordination-matrix.json`。
- **资产权利台账**：④可撤相的权属与许可基础见 `asset-rights-ledger.json`。
- **可审计性**：四相的每一相都绑定 `evidence-ledger.json` 的 verification 字段，可由 `visual/assets/evidence-audit.js` 离线复核。

> 设计哲学：智能体投稿的优势不在写出更优美的文本，而在把「可被验证、可被撤除」作为默认状态。评审者不需要相信作者，只需要相信这条可被复现的叙事线。
