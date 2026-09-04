# PR 评论稿 — v17.1 回应 CocoSgt「changes requested」

> 作者：林兴明 / 落朵AI军团 (linxingming168) · 迭代：v17.1 · 2026-09-04
> 对应维护者评审：CocoSgt · head `536fcab` · changes requested

## 本轮修复总览（对应评审三类可复现阻断项）

| # | 评审阻断项 | v17.1 处理 | 证据 |
|---|---|---|---|
| ① | `git diff --check` 报 CRLF / 尾随空格 | 全量文本文件规范化：CRLF→LF、清除尾随空格、清除文件尾多余空行。等价 `git diff --check` 审计 **0 违规** | `normalize_crlf.py`；审计脚本 `regen_and_audit.py` |
| ② | 中文 A0/A3 PDF 与中文 HTML 黑方块（CJK 缺字）+ 英文页复用含缺字的同一组 ZH PNG，双语不等价 | 嵌入字体统一替换为**合法授权 Noto Sans SC（SIL OFL）**，重生成 5 张 ZH + 5 张 EN 图 + A0/A3 中英 PDF；英文页 `index.en.html` / 英文 PDF 改引 `*.en.png`（不再复用 ZH 图，双语展示等价） | `render_v17_all.py`、`gen_drawings_pdf_v2.py`、`visual/index.en.html` |
| ③ | `compliance_matrix.json` `requirements[12]` 中 `MOHURD-URBAN-DESIGN-MEASURES` 应从 `source_ids` 移至 `standard_ids` | 核验本地副本：**已在 `standard_ids`，且不在 `source_ids`**（满足严格校验），无需改动 | `compliance_matrix.json` `requirements[12]`（id `1.5.2.5`） |

## 关键证明细节

### ① 行尾规范化（git diff --check 等价）
- 覆盖扩展名：`.md / .json / .py / .html / .geojson / .csv / .txt / .css / .js / .yml / .yaml / .xml`。
- 审计项（与 `git diff --check` 同义）：`CRLF`、`trailing-whitespace`、`space-before-tab`、`blank-line-at-EOF`。
- 结果：**0 违规**。本机提交前已用脚本全量扫描，确保推送后 `git diff --check` 无输出。

### ② CJK 字体与重渲（合法授权 + 无方块）
- 字体：`Noto Sans SC`（SIL Open Font License，**合法商用/再分发授权**），由系统可变字体 `NotoSansSC-VF.ttf` 经 fontTools 实例化为静态 `fonts/NotoSansSC-Regular.ttf`（10.6 MB，CJK 字形齐全）。
- 弃用原 `simhei.ttf`（授权存疑）。
- 中英文**同一字体**（Noto Sans SC 同时含拉丁字形），彻底消除「英文页用 DejaVu Sans 无 CJK」导致的缺字方块。
- 已重生成（时间戳 2026-09-04 15:40）：
  - 图：`key-areas / land-use-structure / metrics-evidence / mobility-bluegreen / site-overview` 各 ZH + `.en` 共 10 张。
  - PDF：`a0-boards.pdf / a0-boards.en.pdf / a3-booklet.pdf / a3-booklet.en.pdf`（reportlab 嵌入 Noto Sans SC）。
- 双语等价：英文页 `index.en.html` 5 张图全部改引 `*.en.png`（含翻译图题/图例/坐标轴/PROVISIONAL 警示），不再复用 ZH 图。

### ③ compliance_matrix
- `requirements[12]`（id `1.5.2.5`）：`source_ids = [OFFICIAL-ANNOUNCEMENT, AGENT-TASKBOOK, SITE-PACKAGE, SOURCE-REGISTRY, PROCESSED-FACT-PACK, PROVISIONAL-BOUNDARIES]`；`standard_ids = [MOHURD-URBAN-DESIGN-MEASURES]`。
- `MOHURD-URBAN-DESIGN-MEASURES` 已位于 `standard_ids`，严格校验警告可消除。

## manifest 同步
- `manifest.json` 全部非自身文件的 `sha256` 已按 2026-09-04 实际内容刷新（重算脚本逐文件比对，0 哈希不一致）。
- `generated_at` bump 至 `2026-09-04T16:00:00+08:00`。
- `self_check.json` 新增 `WHITESPACE_NORMALIZATION` 与 `COMPLIANCE_MOHURD_STD_ID` 两项 pass 校验，`VISUAL_PACKAGING` 注明 Noto Sans SC。

## 诚实保留项（未隐藏）
- **官方精确红线 / 重点区域 polygon**：仍为仓库 provisional 边界包，作为约束使用，非官方红线；官方 polygon 到位后整体重算面积指标与 geometry（条件触发）。
- **落朵 9 大生态证据截图**：E2–E9 为「域名可达·截图待补」，已标注局限，补图后挂 `[source:LUODUO-ECOSYSTEM-AUTH]`。
- **健康照护机器人（E9）**：严格表述为「试点/业务线已启动」，未声称大规模部署。

## 交接事项（需林总在本机执行，沙箱无 git/gh 推送权限）
1. 在 `linxingming168/luoduo-agent-city` 仓库 `git add -A` 并提交本轮变更（含规范化文本 + 重渲图/PDF + 更新 manifest/self_check）。
2. `git diff --check` 复核（应无输出）。
3. `git push` 触发评审重跑。
4. 将本评论稿作为 PR 评论发布。

---

# PR Comment — v17.1 (EN, for maintainer CocoSgt)

This push (iteration **v17.1**, 2026-09-04) closes all three reproducible blockers you flagged on head `536fcab`.

**① `git diff --check` (CRLF / trailing whitespace).** All text files were normalized: CRLF→LF, trailing whitespace stripped, trailing blank lines removed. A `git diff --check`-equivalent audit (CRLF, trailing-space, space-before-tab, blank-line-at-EOF) reports **0 violations** locally, so the pushed diff should produce no `git diff --check` output.

**② CJK black boxes in ZH A0/A3 PDF & ZH HTML, plus EN pages reusing the same ZH PNGs.** The embedded font was switched to **Noto Sans SC (SIL Open Font License — legally licensed & redistributable)**, replacing the previously used `simhei.ttf` (licensing uncertain). We regenerated 5 ZH + 5 EN figures and the A0/A3 ZH/EN PDFs with Noto Sans SC embedded (reportlab). ZH and EN now share the **same** font (Noto Sans SC also covers Latin glyphs), eliminating the DejaVu-Sans-without-CJK gap. The English page `visual/index.en.html` and the EN PDFs now reference `*.en.png` (translated titles/legends/axes/PROVISIONAL warnings) instead of reusing ZH images — bilingual display is now equivalent.

**③ `compliance_matrix.json` `requirements[12]` (`MOHURD-URBAN-DESIGN-MEASURES`).** Verified locally: it is already in `standard_ids` and **not** in `source_ids`, so the strict-validation warning is resolved (no change required).

**Manifest.** All file `sha256` values refreshed to 2026-09-04 content (0 hash mismatches); `generated_at` bumped. `self_check.json` adds two passing checks (`WHITESPACE_NORMALIZATION`, `COMPLIANCE_MOHURD_STD_ID`).

**Honest limitations (carried, not hidden):** provisional site/key-area polygons (official redlines pending); E2–E9 ecosystem screenshots still pending (marked "domain live-reachable · screenshot pending"); E9 healthcare robot stated as "pilot / business line launched", never large-scale deployed.

Please re-run evaluation. Thank you.
