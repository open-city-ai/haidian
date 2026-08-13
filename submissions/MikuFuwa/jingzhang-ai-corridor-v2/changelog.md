# 方案迭代记录

## v2.4 - 2026-08-12

### 改动摘要（哈希验收通过后写入）

- **P0-1 三区断面**：验证核 A-A / 原点 B-B / 大钟寺 C-C；平面剖切线写入 `visual/assets/section_cuts.json` 与各 `detail_*.json`；`key-areas.png` 升级为「平面+剖切+断面」双行；新增 `key-area-sections.png` 合板；A0 增断面板。
- **P0-2 用地二次碎化**：在 v2.3 mosaic 上再切街坊进深，`land_use` **units=100**（目标 70–100）；median aspect≈1.50（禁通长竖彩带）；site 全覆盖 spatial PASS。
- **真重渲**：五核心 figure + en + overview.svg + A0/A3；**相对 v2.3 SHA-256 均已变化**（见包外 `_build_v24/render_veto_report.json`）。
- 指标：green_ratio=0.257067；public_space_ratio=0.095189；building_count=177；land_use_unit_count=100；FAR **unknown**；confidence medium；边界 provisional。
- 正文/agent/narrative 版本钉到 v2.4；manifest 0.2.0 增补断面图与 section_cuts 条目。

### 五图哈希（相对 v2.3）

- `site-overview.png`: `eec662d5a59f…` → `dbcb09e83319…` CHANGED
- `land-use-structure.png`: `7628c7c4280e…` → `3f9cd6977647…` CHANGED
- `key-areas.png`: `028f7fa3021c…` → `e44fe7c07f14…` CHANGED
- `mobility-bluegreen.png`: `95bb4ea77fe2…` → `1a451f2463a6…` CHANGED
- `metrics-evidence.png`: `0ab9515449df…` → `34cb66de19a8…` CHANGED

### 硬规则执行说明

- 先几何与重渲，后人眼/哈希否决，**最后**写本 changelog。
- 未宣称官方红线/控规 FAR；断面为相对标高示意。

### 暂未采纳或待复核

- 真实测绘底图与 official polygon 仍缺。
- 人类 T2 专业红队未外部签字。
- GitHub CI 以 push 后 submission-validation 为准。

## v2.3 - 2026-08-12

### 改动摘要（哈希验收通过后写入）

- **用地形态**：`land_use` 重建为街坊/功能单元拼贴（median aspect≈3.4，否决通长竖向彩带）；units=50。
- **建筑形态**：三核簇群 + 脊缘界面；buildings=177；核密廊疏叙事。
- **慢行**：命名断点 B1/B2/B3 + 站城口袋提示 + 机器人可回退试验段。
- **真重渲**：site-overview / land-use-structure / key-areas / mobility-bluegreen / metrics-evidence 及 en 副本；A0 8 板、A3 16 页；overview.svg；**五图 SHA-256 相对 v2.2 均已变化**（见包外 `_build_v23/render_veto_report.json`）。
- 指标：green_ratio=0.257067；public_space_ratio=0.095189；building_density=0.015007（概念）；FAR unknown；confidence medium。
- manifest 保持 schema 0.2.0；agent_detail 更新为 v2.3。

### 硬规则执行说明

- 先几何与重渲，后人眼/哈希否决，**最后**写本 changelog。
- 未宣称未完成的官方红线/控规指标。

### 暂未采纳或待复核

- 真实测绘底图与 official polygon 仍缺。
- 人类 T2 专业红队未外部签字。
- GitHub CI 以 push 后 submission-validation 为准。

## v2.2 - 2026-08-11

### 改动摘要

- 几何二次结构化、图面 2.0、A0 八板/A3 十六页、renewal_projects、英文等义加深。
- 后续 **v2.2.1**：manifest schema 0.2.0（去 size、规范 role）以通过 CI。

## v2.1 - 2026-08-11

### 改动摘要

- 消灭空壳 A0/A3：重做 ≥7 板 A0 与 10 页级 A3 图文 PDF（含真地图嵌入）。
- 五张 figure 改为由 GeoJSON 投影的互异空间图；几何结构化与离线 visual；metrics medium + provisional。
