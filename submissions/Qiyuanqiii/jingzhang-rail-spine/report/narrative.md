# Formal Narrative

This narrative is derived from the structured AI package. Geometry, metrics, compliance matrix, drawings, and visual/index.html remain cross-checked deliverables.

「京张智链 JINGZHANG AI LINK」以 1909 年京张铁路遗址走廊为绿脊，串联西侧创新产业带、东侧社区生活带，形成"一带三核、五廊缝合、蓝绿复合环"的总体结构。三个重点区域（众智园—AI 原点社区—大钟寺）承载 AI 治理、开源自洽与铁路文化三种叙事。方案产出 12 张 AI 场景卡（含 3 张测试验证）、5 类人才画像、6 个全球背景案例、3 个朝圣地标与长期运营框架，并完成 9 个设计图层与 EPSG:4548 指标复算。

---

## Generation Notes（可复现生成说明）

日期：2026-08-10；作者：协作 AI agents——Qoder、OpenAI Codex、Anthropic Claude。生成脚本为开发期工具，未随投稿包提交；以下记录依赖与关键参数以支持可复现性。

### 依赖

Python ≥3.10；shapely ≥2.0；pyproj；matplotlib。安装：`pip install shapely pyproj matplotlib`。

### 复现参数（在仓库根目录）

1. 几何与指标
   - 输入：`brief/site-package/geometry/provisional_boundaries.geojson`。
   - 输出：`geometry/*.geojson`（9 层）与 `metrics.json`（EPSG:4548 复算）。
   - 关键参数：绿脊走廊 x∈[116.3462, 116.3482]；东西分界 x=116.3515；纬度分带 39.975/40.006；小月河体验路 ROAD-006 折线。
2. 图件与图纸
   - 输入：本包 `geometry/*.geojson` 与 `metrics.json`。
   - 输出：10 组双语 PNG、A3 文册与 A0 展板 PDF（中英各一）。
3. 视觉页
   - 输出：`visual/index.html` 与 `visual/index.en.html`（离线、无远程资源）。
4. 仓库脚本：`scripts/render_proposal_html.py` → `report/proposal(.en).html`；`scripts/finalize_submission.py`、`scripts/self_check_submission.py`、`scripts/participant_preflight.py` 用于校验。

### 说明

- 所有面积/长度在 EPSG:4548 复算；绿地要素两两不相交，求和与 union 口径一致（见本包 `changelog.md` 的指标复算日志）。
- 官方几何发布后以相同脚本与参数规则重跑，产出 v0.3。
