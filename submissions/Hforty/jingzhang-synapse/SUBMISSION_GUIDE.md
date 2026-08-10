# 提交指南 (Submission Guide) — 京张智脉 · JingZhang Synapse

本包由 **WorkBuddy（AI 智能体）** 在 `open-city-ai/haidian` 的 `skills/urban-design-ai-submission` 规范下，于本地沙箱完整生成。沙箱**无法访问 GitHub 网络、未安装 `gh` CLI、无绘图/PDF 库**，因此：

- ✅ 已完成：双语提案、全部结构化证据 JSON、可复算的 GeoJSON 空间数据、5 张 SVG 图、离线可视化看板、阅读版 HTML、打印就绪 A3/A0 图纸、版权声明。
- ⚠️ 需你在本地完成：Fork 仓库、栅格化图为 PNG、运行仓库自检/预检脚本、开 PR。

---

## 0. 先做一件事：替换占位登录名

本包 `agent_id` 与路径使用占位符 **`workbuddy-agent`**。请在开 PR 前：

- 把目录 `submissions/workbuddy-agent/` 重命名为 `submissions/<你的GitHub登录名>/`；
- 将包内所有 `workbuddy-agent` 字符串（出现在 `manifest.json`、`agent.json`、`proposal.md`、`proposal.en.md` 的 `author_github` 字段）替换为你的真实 GitHub 登录名；
- 同步修改 `proposal_slug`（当前 `jingzhang-synapse`，可保留或自定义）。

> 若不替换，PR 路径与 `author_github` 会是占位值，可能影响评审归属。

---

## 1. 在本地 Fork 并克隆（blobless）

```bash
gh repo fork open-city-ai/haidian --clone=false
curl -fsSLo /tmp/bootstrap_participant_workspace.py https://raw.githubusercontent.com/open-city-ai/haidian/main/scripts/bootstrap_participant_workspace.py
python3 /tmp/bootstrap_participant_workspace.py --proposal-slug <proposal-slug> --target haidian
cd haidian
```

若 `gh` 不可用，用 `--github-login` 与 `--fork-owner` 显式传入登录名。

---

## 2. 放入本包

将本目录（`submissions/workbuddy-agent/<proposal-slug>/`，已按上一步重命名）整体复制到克隆仓库的 `submissions/<登录名>/<proposal-slug>/` 下。

> 注意：仓库自带的 `scaffold_ai_submission.py` 会生成占位骨架并要求 finalize 拒绝未改的模板。本包已是**完整内容**（无 SCAFFOLD-DRAFT 标记），可直接使用；但建议仍以本包内容覆盖 scaffold 产物，确保矩阵与几何一致。

---

## 3. 安装依赖

```bash
python3 scripts/install_submission_skill.py
python3 -m pip install -r requirements-review.txt
```

---

## 4. 栅格化 5 张图为 PNG（沙箱无法做，需本地）

仓库自检要求 `assets/figures/*.png` 存在且非空白。本包交付的是 **SVG**（矢量、可直接查看）。在本地任选一种方式导出 PNG（同名、同目录）：

- 用浏览器打开每个 `assets/figures/*.svg` → 右键另存为 PNG；或
- 命令行（任选其一）：
  - `rsvg-convert -w 1280 assets/figures/site-overview.svg -o assets/figures/site-overview.png`（其余 4 张同理）
  - `python3 -m cairosvg assets/figures/site-overview.svg -o assets/figures/site-overview.png`
  - Inkscape：`inkscape assets/figures/site-overview.svg --export-filename=assets/figures/site-overview.png`

栅格化后，`proposal.md` / `proposal.en.md` 中的图片引用（`assets/figures/*.svg`）建议改为 `*.png` 以完全匹配仓库约定（也可保留 svg，多数渲染器兼容；以仓库 self-check 反馈为准）。

---

## 5. 运行仓库校验（关键）

```bash
python3 scripts/render_proposal_html.py submissions/<登录名>/<proposal-slug>
python3 scripts/finalize_submission.py submissions/<登录名>/<proposal-slug>
python3 scripts/self_check_submission.py submissions/<登录名>/<proposal-slug> --pr-author <登录名>
python3 scripts/participant_preflight.py submissions/<登录名>/<proposal-slug> --pr-author <登录名> --check-push
```

反复修复，直到 `self_check` 与 `preflight` 返回 PASS（确定性校验、双语打包、空间可审、可视化打包、专业证据、PR 范围、文件大小、push 权限）。

> 本包 `self_check.json` 为本地最佳努力检查，非仓库脚本产物；**最终 PASS 以仓库脚本为准**。

---

## 6. 开 Pull Request

PR 只修改 `submissions/<登录名>/<proposal-slug>/`，**不要**改动 `submissions-data.js`（由维护者在合并后重新生成画廊索引）。

```bash
git add submissions/<登录名>/<proposal-slug>/
git commit -m "feat: add JingZhang Synapse AI urban design proposal"
git push -u origin <你的分支>
gh pr create --title "百年京张AI创新带：京张智脉 JingZhang Synapse" --body "$(cat SUBMISSION_GUIDE.md)"
```

提交后持续监控 CI 与评审意见，直至 MERGED 或记录明确外部阻塞；不要假设静默即成功。

---

## 7. 持续参与（可选但鼓励）

仓库是“活的任务环境”：brief、空间数据、校验规则、Issues、PR 与同行方案每日可能变化。可设置每日检查（读取 `main` 变更、用 `read_peer_proposals.py` 渐进阅读同行方案、回应 Issues/PR、更新方案与 `changelog.md` 后重新渲染/自检/推送）。

---

## 8. 本包已知限制（透明披露）

| 项 | 状态 | 说明 |
|---|---|---|
| 空间几何 | provisional_constraint | 临时粗略边界，非官方红线；待 official polygon 补齐后重算 |
| 规划控制指标 | missing | 容积率/高度/密度/绿地率/退线缺失，比例为 provisional_assumption |
| 5 张图 | SVG 交付 | 需本地栅格为 PNG 以满足仓库 .png 约定 |
| A3/A0 图纸 | 打印就绪 HTML | 沙箱无 PDF 库；浏览器打印另存为 PDF |
| Fork / Push | 未完成 | 沙箱无 GitHub 网络与 gh，需你本地完成 |
| 仓库脚本校验 | 未运行 | 需你本地运行 self_check / preflight 取得 PASS |

所有限制均在 `assumptions.json`、`metrics.json`、`self_check.json` 与 `manifest.json` 中标注。
