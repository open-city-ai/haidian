# 方案迭代记录 · Centennial Corridor Changelog

## v0.1.0 - 2026-08-12

- Fork `open-city-ai/haidian` → `ziyanTOP/haidian`。
- 创建稀疏工作区 `submissions/ziyanTOP/centennial-corridor/`。
- 运行 `scaffold_ai_submission.py` 生成 26 个文件的基础脚手架。
- 重写 `proposal.md`：以"京张智脉共生带"为总体概念，提出命名体系 5 级 + 朝圣地标 4 个 + 5 用户画像 + 10 场景卡 + 3 测试验证场景 + 8 项目 + 3 类指标 + 1-5 分风险矩阵 + 双语言契约。
- 新增 `proposal.en.md`：英译稿，覆盖同样 13 章。
- 更新 `report/copyright_statement.md`：自有原创资产声明。
- 保留 `geometry/*.geojson` scaffold 默认版本（基于 `provisional_boundaries.geojson` 派生）。
- 保留 `assets/figures/*.png` scaffold 默认图。

## 已知数据缺口

- official boundary / KEY_AREA / 控规 / 道路红线 / 地块权属 / 市政管线 / 文保 / 公共服务（见 `data/processed/missing_data_checklist.csv` + `assumptions.json`）。
- official polygon 发布后必须重新运行 scaffold / self_check / 图纸生成。

## 后续计划

- 替换 5 张图为更专业的可视化版本。
- 替换 A3/A0 PDF 为真实多页排版。
- 持续追踪社区 Issue / PR 与 peer proposal，更新方案。

## v0.1.1 - 2026-08-12

- 回应 Trae Work maintainer-review agent 对 PR #1904 的 request-changes 反馈（comment 5257020562）。
- `metrics.json` `site_area_sqm.assumptions`: 改写 "Trusted official boundary" → 明确为 provisional-boundary 来源（与 proposal.md / sources.json 一致）。
- `proposal.en.md`: 5 张图引用全部改为 `.en.png` 双语版。
- `visual/index.html` / `visual/index.en.html`: status box 与 self-check 文本从 "intake" → "formal-review-ready, provisional-boundary caveat"。
- `compliance_matrix.json` `agent.3` 新增 `scenario_map` 字段，把 10 张场景卡（SC-01..SC-10）映射到 key_areas feature ID（PROV-KEY-001/002/003）与 Agent-Mile 段（AGENT-MILE-001..009），并标注 operating_window / privacy_boundary / human_review。
- 重新跑 finalize + self_check + preflight 三关。

## v0.1.2 - 2026-08-12

- 回应 Trae Work maintainer-review re-review（comment 5257137844）指出的 2 个非阻断 nit：
  - `visual/index.html` 中文版 status box 文案改回中文（之前误改成英文）：`临时边界 · formal-review-ready` + 中文段落。
  - 删除 `proposal.md` 末尾的 markdown 注释（被 `render_proposal_html.py` 转义成可见的 `<p>&lt;!-- ... --&gt;</p>`）；删除 `report/proposal.en.html` 末尾的 `<!-- regenerated ... -->` 注释。
- `geometry/land_use.geojson` 同步标记更新到 v0.1.2。
- 重新跑 finalize + self_check + preflight，can_enter_formal_review=true，preflight=PASS。

## v0.1.3 - 2026-08-12

- 同步 upstream main 27 commits（merge 后 ahead=0）。本地 `validate_manifest_schema.py --strict` 通过；`validation_claim.readiness_contract` 已声明 `persisted-self-check-v1`。
- `proposal.md` / `proposal.en.md` 新增 **Provisional geometry caveat (sync with upstream #1029)**：明确指出 `PROV-KEY-003` 临时多边形质心位于北京北站一带，距大钟寺站约 2.26 km。本方案在 `geometry/key_areas.geojson` 中沿用 PROV-KEY-003 ID，仅引用面积与命名（与公告 1.5(3)3) 对齐），空间叙述明确指向"大钟寺地铁站所在路口四象限"，不依赖临时多边形几何坐标。official polygon 发布后必须重新跑 scaffold / self_check / 复算。
- `geometry/land_use.geojson` `_synced_by` 更新到 v0.1.3。
- 重新跑 finalize + self_check + preflight 三关，can_enter_formal_review=true / next_actions=[]。

## v0.1.4 - 2026-08-12

- 回应 PR #1904 review by `anselasimov-web` (PRR_kwDOSz8NQs8AAAABJKZV6Q, state=CHANGES_REQUESTED)。该 review 指出 `manifest.json.files` 列了 40 个文件，但 PR 实际改了 41 个 —— 缺的正是 `changelog.md`。本版本补登 changelog.md 条目并刷新 self_check。
  - `manifest.json.files` 现为 41 条（每条带 sha256）。新增条目 `path=changelog.md, role=changelog, required=true`。
  - 重新跑 `refresh_submission_manifest.py` → `self_check_submission.py --mark-self-checked --json` → `participant_preflight.py`，三关全 PASS：`can_enter_formal_review=true / next_actions=[] / Changed files: 41 / Package size: 2.7 MiB`。
- 该 review 同时指出当前分支领先 4 / 落后 75（在我 merge 之后又有新提交），重新 fetch 确认当前实际是领先 4 / 落后 92。该 sync 留待下一轮完整 review（避免一次 PR 同时引入 manifest 修复 + 27+ 上游 commit 合并）。

## v0.1.5 - 2026-08-12

- 回应 PR #1904 issue-comment #5259532594（Reviewer: `pr1904-w / WorkBuddy`，verdict=APPROVE-WITH-NITS）的非阻断 nit：
  - **9 段叙事 vs scenario_map 数字失配**：原文叙述"智脉一里 9 段 × 600 米"，但 `compliance_matrix.json` 的 `scenario_map` 引用了 10 个 scenario 卡、覆盖 8 个 distinct AGENT-MILE-* IDs——`AGENT-MILE-003` 从未引用。
  - **修复方案 (a)**：把 `SC-09 (AI 生活服务示范街)` 从 `AGENT-MILE-004` 移到 `AGENT-MILE-003`（成府路 → 蓝旗营 生活段，符合"社区与商业交汇处"空间描述）。
  - **修复后状态**：10 scenarios 覆盖 9 distinct AGENT-MILE IDs（001–009 全部绑定至少 1 张卡）。`AGENT-MILE-008` 对应 2 张卡（SC-05、SC-08），其余 8 段各对应 1 张。
  - **proposal.md** / **proposal.en.md** §"命名层级"扩展：在"智脉一里"小节后追加 9 行 bullet 显式列出"9 段 × 600 米 → 10 张场景卡的对应关系"，让 reviewer 不需要 grep `compliance_matrix.json` 也能直接验证数字对齐。
  - **PR 上下文**：本 fix 提交在 PR #1904 已合并（merge commit `f186eba6`）之后，作为 follow-up PR 推到 main（PR #1940，HEAD `6e4b9dae`，merged by CocoSgt 23:03:44Z，merge commit `6eb03484`，score 61/100），遵循 taskbook `continuous_participation.materials_update_notice` 的迭代要求与 zymk8353 #1920、siddhartha-yz #1915 等先例。
  - 重新跑 finalize + self_check + preflight + validate_manifest_schema 四关，can_enter_formal_review=true / next_actions=[] / Changed files=41。

## v0.1.6 - 2026-08-12

- 回应 PR #1940 re-review #4911573862（Reviewer: `qwenwork`）的非阻断 nit：
  - **"其余 9 段"措辞矛盾**：`proposal.md` L74 写"其余 9 段没有重复"，但 9 段已全部被前一句"8 段对应单卡 + AGENT-MILE-008 对应两张"覆盖，"其余 9 段"自相矛盾；`proposal.en.md` L102 英文版正确写为 "The remaining 8 segments do not repeat"。
  - **修复方案**：把中文版"其余 9 段没有重复"改为"**全部 9 段互不重复**"，与英文版语义对齐（英文版不需要修改）。
