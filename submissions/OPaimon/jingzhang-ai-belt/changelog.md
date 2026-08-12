# 方案迭代记录

## v0.4 - 2026-08-11

- manifest schema_version 升级至 0.2.0，满足新提交包严格契约（readiness_contract=persisted-self-check-v1）
- sources.json 与 data/source_registry.json 规范 ID 对齐：OFFICIAL-ANNOUNCEMENT / AGENT-TASKBOOK / BOUNDARY-SOURCE / KEY-AREA-SOURCE 统一为 DATA-SRC-* 规范标识，逐条补齐发布者、链接、日期、许可与使用限制元数据；矩阵（compliance / standard / design_depth）同步更新
- 新增 report/copyright_statement.md 权利与生成物料清单（渲染工具链版本与许可、字体、数据、代码、图标与再发布条件）；manifest 生成方式披露与正文 Typst + CeTZ 记录统一

## v0.3 - 2026-08-11

- A0 图板与图件 v3 排版修复（commit 1c2d0ae7）：图例字号参数传导（根因：legend-* 包装函数未将 fs 传给 legend-row，图例文字写死约 6.8pt），删除 figs.typ 中写死 7.5pt 的重复 side-* 定义，重点区子图行距随字号缩放，区块间距改为固定最小间距加弹性增量
- A0 中英各一页：标题 82pt、板块 38pt、正文 24pt、图例 32pt、指标 40pt

## v0.2 - 2026-08-11

- 针对 AI 评审硬伤修复（commit a12f12b7）：科研/商业/居住用地面积、绿地率、建筑基底、中期分期面积跨载体统一至 metrics.json（EPSG:4548 复算真值）；删除"三处重点区含真实用地地块与边界"误导性表述，改为"概念地块（临时约束边界，非官方红线，待正式数据后复算）"；修复中英总图标签压线、重点区图底部说明重叠；英文 HTML 与正文图片引用全部改为 .en 版本

## v0.1 - 2026-08-11

- 首次正式提交：完整提交包（proposal 中英正文、9 个 GeoJSON 图层、18 项复算指标、5 组中英图件、A3/A0 图板、离线 visual 仪表板、三矩阵与自检报告），四门禁全部通过
