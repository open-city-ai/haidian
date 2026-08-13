# 方案迭代记录

## v1.1 - 2026-08-12
- 依据 haidian-submission skill 的 86 分方法论与 AI Review Agent 七维评审口径补强：
- 新增 `risk.json`（八维结构化风险，全部 1-5 分并附缓解措施与人工复核主体）；
- 新增 `visual/assets/scenario-cards.json`（12 张场景卡结构化：空间锚点/数据边界/人工复核/运营主体/风险）；
- 新增 `visual/assets/governance-interlock.json`（"联锁表"开放治理契约 IL-01~IL-06）；
- 新增 `assets/media/logo-vi.svg` 与 `assets/media/logo-vi.png`（人字岔口 + 接口符号 Logo 落地）；
- `proposal.md` / `proposal.en.md` 增厚：执行摘要英文口令 "NO INTERLOCK, NO ROUTE"、试点区间与准入闸门、人力编制概念测算、应急响应预案、AI 技术架构说明；
- 图件与 PDF 重新渲染，manifest 哈希刷新，`self_check --mark-self-checked` 四门 gate 全 PASS。

## v1.0 - 2026-08-11
- PR #1708 合并入库（AI Review Agent 评分 68/100，四门 gate 全 PASS）；
- 按上游 `persisted-self-check-v1` 契约持久化 `self_check.json` 与 `validation_claim`；
- 修复 manifest 哈希、constraints layer 枚举、land_use 拓扑（split 母几何派生，GAP=0）。

## v0.9 - 2026-08-11
- 首版正式包提交：京张联锁带（一轨三岔两翼 + 联锁表治理）；
- 双语契约 v1（proposal.md / proposal.en.md 等义）；
- 9 个 GeoJSON 设计图层、10 张图件、A3/A0 图纸、离线展示板；
- 本地 finalize + self-check 四门 PASS。

## v0.1 - 2026-08-10
- 脚手架生成（scaffold），仅占位骨架。
