# 附录D · AI辅助识别试点协议与实施审批矩阵（协议文本，未批准）

> 本附录为**协议文本建议**：D.1 为慢行断点AI识别的0—1年可复现试点协议；D.2 为场景落地的实施审批前置矩阵。两者均**未经任何主体批准**，仅为建议工作口径。

## D.1 慢行断点AI识别试点协议（0—1年，可复现）

### D.1.1 数据冻结与口径

- 数据源：osm-202608 冻结快照（ODbL 授权），叠加现场踏勘台账；
- 明确声明：不使用任何个人轨迹、信令或涉密测绘数据。

### D.1.2 五步流程

| 步骤 | 内容 | 责任（建议） |
| --- | --- | --- |
| S1 | AI候选生成：从冻结数据中识别潜在慢行断点 | 技术组 |
| S2 | 双人独立真值标注：两名标注员互盲作业 | 标注组 |
| S3 | 混淆矩阵评估：AI候选 vs 人工真值 | 技术组 |
| S4 | 人工优先级排序：按安全/连通收益排序 | 规划组 |
| S5 | 决策留痕：每次采纳/驳回均记录理由 | 秘书组 |

### D.1.3 阈值与停止规则（建议值，试点开始前须重新校准）

- 召回率 ≥ 0.9、精确率 ≥ 0.6 方可进入 S4；
- 相似度阈值 tau ≥ 0.5；AI 置信度 < 0.5 一律转人工；
- 停止规则：连续两轮评估不达标即暂停试点并复盘；
- 审计日志留存 ≥ 3 年；
- n < 30 的样本仅用于方法验证，不用于任何对外结论。

## D.2 场景实施审批前置矩阵（JT-01—JT-05 + 配套2项，建议口径）

| # | 场景 | 空间类型 | 建议主责 | 缺失输入 | 审批前置 | 成本等级 | 参考KPI | 停止/回退 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| JT-01 | 慢行断点打通 | 道路/铁路界面 | 区级交通部门（建议） | 涉铁协议 | 铁路部门同意 + 交通评价 | 中 | 断点减少数 | 涉铁未同意即回退 |
| JT-02 | 站城缝合通廊 | 轨站周边 | 属地街道+地铁方（建议） | 用地权属 | 权属协商 + 无障碍审查 | 中 | 绕行系数下降 | 权属不清即暂停 |
| JT-03 | 遗址公园段 | 铁路遗产/绿地 | 园林+文保部门（建议） | 文保评估 | 文保审批 + 涉铁审批 | 高 | 开放段长度 | 审批未过不做实体 |
| JT-04 | 沿线退距绿化 | 铁路退距 | 园林部门（建议） | 退距复核 | 现行标准与铁路部门复核 | 低 | 绿化长度 | 复核不过即调整 |
| JT-05 | 极端降水四预试点 | 河道/下穿 | 水务+应急部门（建议） | 气象数据接口 | 数据协议 + 应急预案备案 | 中 | 推演完整率 | 预案未备案不运行 |
| JT-P1 | 资产匹配沙盘 | 数字平台 | 平台运营方（建议） | 资产权属清单 | 权属登记 + 隐私评估 | 低 | 匹配采纳率 | 隐私评估未过不开放 |
| JT-P2 | 社群Agent试点 | 数字平台 | 社区居委会（建议） | 居民同意机制 | 知情同意 + 人工复核配置 | 低 | 参与率 | 无同意机制不上线 |

声明：本矩阵不给出工程结论或法定规划判断；每项实施以当期审批为准。

---

## English Summary

Appendix D proposes (unapproved) two instruments: a reproducible 0–1-year pilot protocol for AI-assisted detection of slow-traffic breakpoints — frozen OSM ODbL snapshot, five steps (AI candidates → dual independent ground-truthing → confusion matrix → human prioritisation → decision logging), suggested thresholds (recall ≥0.9, precision ≥0.6, tau ≥0.5, sub-0.5 confidence routed to humans) with stop rules, ≥3-year audit logs, and n<30 restricted to method validation; and a pre-approval matrix JT-01–JT-05 plus two platform pilots listing spatial type, suggested owner, missing inputs, clearance prerequisites, cost grade, reference KPIs and stop/fallback rules for each, with no engineering or statutory-planning conclusions.
