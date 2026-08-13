# 方案迭代记录 / Iteration Changelog

## v2.0 - 2026-08-13

本次 V2 沿用已合并 V1 的同一 submission 目录、概念性 `ROAD-001` 与现有空间方案，未新增 geometry，也未声称已完成现场核验。迭代只将既有 Noonline SLA Engine 中已披露的 evidence gaps 转化为可执行、可审计和可回写的核验工作流。

V2 新增离线 field-verification workflow：从既有三类 SLA 路径、概念节点和八类 evidence gaps 自动推导 45 项任务；每项初始为 `unknown`，并采用 `unknown → scheduled → observed → verified / rejected` 状态机。AI 被明确禁止写入任何现场观察、确认或拒绝状态；人类确认或拒绝必须提供 verifier、timestamp 与 evidence reference。

SLA-A promotion gate 将 18 项 mandatory evidence 明确写入机器逻辑。当前所有 mandatory task 均未完成，故 `promotion = blocked`，`Target SLA = A` 和 `Verified SLA = B` 保持不变。拒绝 mandatory evidence 会要求保持 B 或进入降级复核；即使未来全部 mandatory evidence 由人类核验，系统也只允许后续 Engine/政策复核，绝不自动写入 A。

本轮加入 2026 年官方京张铁路遗址公园沿线街区控规公告作为规划语境来源，并明确其不能用作官方 GIS、设施 inventory、现场核验替代物或 SLA-A 升级证据。中英文 proposal、offline visual、机器 ledger 和双语 field pack 已对齐；所有实际遮阴、饮水、座椅、入口、过街、绕行与人工服务条件继续保持 provisional / unknown / not_field_verified。

## v0.1 - 2026-08-13

V1 建立了 Target SLA = A / Verified SLA = B 的 Noonline SLA 设计框架、三类 SLA 路径、12 个概念服务节点、5 个概念人工兜底点、离线 Engine、失败案例与 AI-OFF 概念测试。V1 已明确临时边界、概念节点与未完成现场核验的证据边界。
