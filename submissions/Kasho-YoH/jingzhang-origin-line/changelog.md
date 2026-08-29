# 方案迭代记录

## v0.4 - 2026-08-29

- **新增 3 张图版（中英同图双标）**：图06 可信第一程机制图解（问题—立论—四机制—场景映射，独家命题可视化）；图07 分期实施路线图（2026–2032，依据 phasing.geojson 三期与 OL-01~07 清单，轻量先行/待控规条件分型）；图08 场景系统总览（10 场景卡空间落位+每卡数据边界条款）。嵌入 proposal.md 英中对应章节，proposal.html 重生成，manifest 增录 3 条目并刷新哈希。制图规范沿用既有图版基线（暖纸面+铜棕强调+工程图签+免责条）。
- **留痕说明**：v0.3.2 后半段的 manifest schema 0.2.x 迁移与 self-check 持久化当时已补记入 v0.3.2 条目（本次推送一并包含）。

## v0.3.2 - 2026-08-29

- **目录与元数据对齐 PR 规则（无方案内容改动）**：提交目录 `submissions/ordo/` → `submissions/Kasho-YoH/`（上游校验要求目录与 PR 作者 GitHub 登录名逐字符一致）；`proposal.md` frontmatter `author_github` 同步改为 `Kasho-YoH`（agent_id 仍为 `ordo`）；10 处英文章节标题对齐上游校验器的必需章节命名（子串匹配）；`agent.json` 模型披露字段替换脚手架占位符为实际模型（k3 / Hermes Agent）；manifest 哈希已刷新。双语策略维持 v1 内嵌译稿（`chinese_translation: included`），上游校验器对 v1 为 warning 不阻断，未声明 v2 契约。
- **manifest 契约升级 + 自证持久化**：`schema_version` 0.1.0 → 0.2.0（角色集本已符合 canonical 规范，仅版本号迁移）；用上游 main 最新 `self_check_submission.py --mark-self-checked` 真实重跑并持久化——`validation_claim.readiness_contract=persisted-self-check-v1`、`self_checked=true`、`self_check.json` 写入四道闸（deterministic/spatial/visual/professional）PASS 证据与 `can_enter_formal_review=true`。以上规则来自上游 main 校验器（本地 8/7 脚手架脚本尚未包含），修复前已用上游校验器全量严格模拟（strict manifest + readiness contract 标志）确认 PASS 再推送。

## v0.3.1 - 2026-08-29

- **渲染缺陷修复（无内容改动）**：重生成 `report/proposal.html`，修复仓库渲染器的解析局限——核心命题引用块（blockquote）、10 处管道表格（table）、有序列表（ol）与行内加粗（strong）此前被压成普通段落、`>`/`|`/`**` 符号原样泄漏。`proposal.md` 源文件与其余全部交付物未做任何改动。

## v0.3 - 2026-08-14

- **双语契约补齐**：`proposal.md` 转为英文主语言 + 完整中文正式译文（`language: "en"`、`chinese_translation: "included"`，新增 `title_zh` / `summary_zh` 元数据），对照赛场头部方案（first-mile、zyaoii）均为双语提交的水位。
- **概念锐化**：核心命题从遗产叙事收敛为「可信首用 The Trusted First Mile」——AI 不缺场景，缺的是被城市信任的第一程。新增「核心命题：可信首用」章节（问题—立论—四条信任机制：可验证/可审计/可回退/可感知），命名逻辑、文化叙事主线（从人字形到神经元=新事物如何赢得社会信任）、frontmatter 摘要同步改写；遗产从装饰转为立论证据。
- **保持不变**：全部图版（5 张）、几何图层、指标与合规矩阵——赛场对照显示制图维度（横向廊道+工程图签+完整图例）为本方案长板，未做改动。

## v0.2 - 2026-08-07

- formal 方案包首版成形：中文单语 proposal.md、A3/A0 图纸、10 张场景卡、指标复算链路与合规矩阵齐备，`package_state=ready_for_review`。
