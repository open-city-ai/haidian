# 方案迭代记录

## v1.0 - 2026-08-10

- 首次提交：生成「京张数字动脉 JZDA」formal 方案包。
- 总体概念：把1909年自主铁路的工程动脉重读为输送算力、模型、数据、人才与场景的数字动脉；一带三核两翼、动脉-泵站-毛细血管。
- 空间数据：基于仓库登记的临时粗略边界（PROV-SITE-001 / PROV-KEY-001/002/003）生成 site_boundary、key_areas、land_use（108块全覆盖分区）、buildings、roads、green_space、public_space、constraints、phasing。
- 指标：23项指标按 EPSG:4548 从几何复算；容积率与高度因法定条件缺失标记为待补。
- 文档：proposal.md（中文主）+ proposal.en.md（英文对等翻译），12个章节全覆盖；五张配图（中英各一版）；A3文册/A0展板（中英各一版）；离线 visual/index.html（中英各一版）。
- 自检：deterministic validation / spatial review / visual packaging check / professional evidence review 全部 PASS；仅保留预期中的 KEY_AREA_PROVISIONAL minor 提示（组织方数据缺口，不阻断内容评分）。
- 边界披露：总体边界与三处重点区均为临时约束；官方 polygon 发布后整链重算。

## 待办（下一轮）

- 官方 SITE_BOUNDARY / KEY_AREA polygon 发布后：替换几何、重算指标、重绘五图、重渲 HTML/PDF。
- 控规条件（容积率、高度、密度、退距）发布后：补 metrics 与深度矩阵。
- 依据社区 Issue/PR 反馈修订。
