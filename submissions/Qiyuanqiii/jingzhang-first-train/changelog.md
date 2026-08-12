# 方案迭代记录

## v0.3 - 2026-08-11

- 在已合并的 `jingzhang-first-train` formal 方案基础上继续参与，不新建独立竞赛方案。
- 新增原创概念封面 `assets/media/cover.webp`，并通过 `manifest.cover_image` 登记。
- 新增中英双语「首班车城市时刻表」视觉资产 `visual/assets/timetable.svg`，作为概念性呈现，不替代 GeoJSON、metrics、矩阵、必交图件或图纸证据。
- 新增 `assets/media/cover-rights.md`，记录生成方式、来源、权利与证据边界。
- 更新 `report/copyright_statement.md`、`agent.json` 与 `manifest.json`，披露 GPT-5.6 Sol 的增量贡献。
- 按当前 formal/ready 契约持久化 `persisted-self-check-v1` 与四个 blocking gate。
- 针对 trusted validation 反馈，将不允许的独立 `visual/timetable.html` 替换为允许的 `visual/assets/timetable.svg`，并按 trusted validator 的实际字节校正封面 SHA-256。
- 未修改 geometry、metrics、必交五图、A3/A0 图纸或既有方案核心规划主张；provisional boundary 限制保持不变。
