# 方案迭代记录 / Iteration Changelog

## v3.0 - 2026-08-13

**Spatialization / urban-design deepening.** V3.0 延续 V2 的 Auditable Noonline SLA，并未提高任何 Verified SLA。升级重点是把服务协议转译为可解析、可复算、可阅读的城市空间系统：1 条抽象服务参考线被组织为 11 条概念 LineString；12 个 primary service nodes、8 个 secondary physical support points 与 5 个 concept manual fallback points 被明确关联到重点区、路线和 AI-OFF 使用逻辑。

为消除“全线连续服务”的过度表达，V3.0 将网络分为两级：Level 1 是众智园、AI 原点、大钟寺及直接接入的 SLA service support network，其 primary + secondary 概念支持点间距最大值为 389.182 m / 383.376 m / 326.913 m，中位数为 272.789 m，超过 400 m 为 0；Level 2 是 `ROAD-001` 与 `ROAD-003` 构成的 inter-zone Jing-Zhang connector，只承担路线识别、京张空间序列与基础 AI-OFF 导向，不声称 `<=400 m` SLA 覆盖。这些均为 provisional concept geometry-derived design metrics，不是现场步行、设施或运营证明。

三个重点区进一步形成不同空间原型：众智园为“人行—缓冲—可观测测试”的 Research Test Validation Porch；AI 原点为京张记忆、无手机解释、双语入口和公共停留构成的 Civic Living Room；大钟寺为“轨道—入口—过街—短停/服务—主路线”的 Transit Lunch Interface。四类典型断面、京张空间序列、WP-01~06 与 Phase 0~3 被放入更新后的 bilingual figures、A3 booklet、A0 board、offline visual 和 rendered proposal，Engine 与 field-verification workflow 保留为 secondary evidence。

**Evidence boundary unchanged.** 所有路线、节点、二级支持点、人工兜底、遮阴、座椅、饮水、入口、过街、无障碍和责任人条件仍为 `concept_design` / `provisional` / `not_field_verified`；本轮没有伪造官方边界、既有设施、承诺单位或现场数据。`Target SLA = A / Verified SLA = B`、`SLA-B = C`、`SLA-C = C` 与 `AI_OFF_TEST = PASS_WITH_PROVISIONAL_PHYSICAL_NETWORK` 保持不变。专业现场核验仍优先于 AI 置信度，缺少关键证据不会升级主张。

**Spatialization / urban-design deepening.** V3.0 extends V2's Auditable Noonline SLA without raising any Verified SLA. It translates the service protocol into a parseable, recomputable and review-readable spatial system: one abstract service reference becomes 11 concept LineStrings; 12 primary service nodes, 8 secondary physical support points and 5 concept manual-fallback points are explicitly linked to key areas, routes and AI-OFF use.

To remove any overclaim of corridor-wide continuous service, V3.0 uses two levels. Level 1 is the SLA service-support network in Zhongzhiyuan, AI Origin, Dazhongsi and direct access. Its maximum primary-plus-secondary concept-support gaps are 389.182 m / 383.376 m / 326.913 m, with a 272.789 m median and zero gaps above 400 m. Level 2 is the `ROAD-001` and `ROAD-003` inter-zone Jing-Zhang connector, carrying route recognition, the heritage sequence and basic AI-OFF wayfinding only, with no `<=400 m` SLA coverage claim. These are provisional, concept-geometry-derived design metrics, not observed walking, facility or operational evidence.

The three key areas are differentiated as a Research Test Validation Porch, a Jing-Zhang AI Civic Living Room, and a Transit Lunch Interface. Four typical sections, the Jing-Zhang spatial sequence, WP-01~06 and Phase 0~3 are presented in updated bilingual figures, A3 booklet, A0 board, offline visual and rendered proposal; the Engine and field-verification workflow remain secondary evidence. All routes, nodes, supports, fallbacks, shade, seating, water, entries, crossings, accessibility and staffing remain `concept_design` / `provisional` / `not_field_verified`. Target SLA = A / Verified SLA = B, SLA-B = C, SLA-C = C and AI_OFF_TEST = PASS_WITH_PROVISIONAL_PHYSICAL_NETWORK are unchanged.

## v2.0 - 2026-08-13

本次 V2 沿用已合并 V1 的同一 submission 目录、概念性 `ROAD-001` 与现有空间方案，未新增 geometry，也未声称已完成现场核验。迭代只将既有 Noonline SLA Engine 中已披露的 evidence gaps 转化为可执行、可审计和可回写的核验工作流。

V2 新增离线 field-verification workflow：从既有三类 SLA 路径、概念节点和八类 evidence gaps 自动推导 45 项任务；每项初始为 `unknown`，并采用 `unknown → scheduled → observed → verified / rejected` 状态机。AI 被明确禁止写入任何现场观察、确认或拒绝状态；人类确认或拒绝必须提供 verifier、timestamp 与 evidence reference。

SLA-A promotion gate 将 18 项 mandatory evidence 明确写入机器逻辑。当前所有 mandatory task 均未完成，故 `promotion = blocked`，`Target SLA = A` 和 `Verified SLA = B` 保持不变。拒绝 mandatory evidence 会要求保持 B 或进入降级复核；即使未来全部 mandatory evidence 由人类核验，系统也只允许后续 Engine/政策复核，绝不自动写入 A。

本轮加入 2026 年官方京张铁路遗址公园沿线街区控规公告作为规划语境来源，并明确其不能用作官方 GIS、设施 inventory、现场核验替代物或 SLA-A 升级证据。中英文 proposal、offline visual、机器 ledger 和双语 field pack 已对齐；所有实际遮阴、饮水、座椅、入口、过街、绕行与人工服务条件继续保持 provisional / unknown / not_field_verified。

## v0.1 - 2026-08-13

V1 建立了 Target SLA = A / Verified SLA = B 的 Noonline SLA 设计框架、三类 SLA 路径、12 个概念服务节点、5 个概念人工兜底点、离线 Engine、失败案例与 AI-OFF 概念测试。V1 已明确临时边界、概念节点与未完成现场核验的证据边界。
