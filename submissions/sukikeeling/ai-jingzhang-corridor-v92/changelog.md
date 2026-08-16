# 方案迭代记录

## v9.2 - 2026-08-14
**多模态呈现强化（当前版本）**
**基于**：v9.1（79 分，四门 formal-review-ready）。
**变更**：
- 新增多模态：概念短片 `assets/media/switchback-{zh,en}.mp4`（10s，Seedance 2.0 Fast 生成），双语字幕 `.vtt`，文字稿与权利说明 `switchback.md`，海报与封面 `cover.png`/`switchback-poster.jpg`。
- `visual/index.html` 与 `visual/index.en.html` 嵌入概念短片（控件可见、不自动播放、preload=metadata、双语 track）。
- manifest 登记多模态（role: video/caption_track/transcript/media_poster）+ 顶楼 `cover_image`。
- 字幕与文字稿对齐 v9.1 折返等价基准（SWB）语境：折返点＝拔线点·三方会签·不自动续行·AI关闭后仍可用。
- 不动 v9.1 正文、geometry、操作工件（已验证有效）；保留人字治理核心与四门 self_check 基座。
**待复核**：多模态对表达完整度维度的提升效果；视频为概念可视化非测绘 footage。

## v9.1 - 2026-08-14
**可复演操作工件（对标 90+ 赢家）**
**结果**：79/100（APPROVED，四门全过）。打破 v8.2-v8.10 在 70-77 的横盘。
**变更**：在 v8.1（K0，84 分）基座补入 5 个可复演操作工件（非治理叙事）：
1. 拔线测试操作层：8 个 SWB 折返点声明 ai_off_path/human_handoff/gate_id/operating_mode/responsible_role 五字段（constraints.geojson）。
2. 折返等价基准 SWB v0.1：可取走即用公共产品，4 组件绑机器可读文件 + 硬约束（swb-spec.json）。
3. K标版本治理证明已转动：变更回执 CR-2026-08-14-001 闭合 v8.1 折返点缺机器可读绑定的缺口（governance-receipts.json）。
4. OP-01 桌面配对试点：12 案开放数据可复演，AI开关等价差 0.333（pilot-evidence.json，方法学演示）。
5. risk.json：8 项风险维度停止/恢复规则；metrics.json +3 项等价指标。
**教训**：加"可复演操作工件"（对标 budoyh96/lqqk794 的 AI-off 收敛点）有效；加"治理叙事"（v8.2-v8.10）无效。

## v8.1 - 2026-08-10
**P0 修复基线（高水位 84）**
**结果**：84/100（APPROVED，本仓库高水位）。
**基线**：v8 + P0 三项修复（METRIC_RECALC / 双语实质等价 / 冲突精确值）。人字治理四机制：折返点/坡度分级/K标/道岔三态。原创性 5/5（v8 评审）。

## v8 - 2026-08-10
**人字形折返治理成文**
**结果**：70/100（CHANGES_REQUESTED，含七维详细评审）。
**首次**：从京张铁路青龙桥人字形展线生长出折返治理制度原型，原创性 5/5。评审给出 P0/P1 详细修复路径。
