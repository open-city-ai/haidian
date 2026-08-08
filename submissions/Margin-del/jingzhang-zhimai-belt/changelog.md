# 方案迭代记录

## v1.0 - 2026-08-08

首次正式提交：`submissions/Margin-del/jingzhang-zhimai-belt/`。

- 设计概念：「一脉三核、双翼两环、多点场景」京张智脉 AI 创新共同体。
- 生成内容：
  - `proposal.md` 完整方案正文（覆盖 agent.1—agent.6 全部必答内容）。
  - 9 个 `geometry/*.geojson` 图层（site/key_areas/land_use/buildings/roads/green_space/public_space/constraints/phasing）。
  - `metrics.json` 指标（EPSG:4548 复算）。
  - `assets/figures/*.png` 五张展示级城市设计图。
  - `report/proposal.html` 离线阅读版与 `report/copyright_statement.md`。
  - `drawings/a3-booklet.pdf` 与 `drawings/a0-boards.pdf` 图纸。
  - `visual/index.html` 离线电子展示页。
- 自检：Deterministic PASS / Spatial PASS / Visual PASS / Professional Evidence PASS → `formal-review-ready`。
- 边界状态：provisional intake（官方 polygon 发布后整体重算）。

## 待复核事项

- [ ] official 三层范围与三处重点区 polygon 发布后，整体重算 GeoJSON、指标、五图、HTML 与 PDF。
- [ ] 控规指标（FAR、高度、密度、退线）与道路红线取得后补齐。
- [ ] 现状建筑、权属、文保、市政、消防资料取得后深化拆改留结论。
