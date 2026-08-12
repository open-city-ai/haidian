# 方案迭代记录

## v1.1 - 2026-08-11

- 修复 `key-areas.png`（中英两版）标题与副标题文字叠印、面积标注与步行环路压线问题，面积标注移至各图幅下方。
- 修复 `mobility-bluegreen.png`（中英两版）比例尺与绿地压盖问题，比例尺移至范围线下方；同步重绘 A3 文册与 A0 展板全部四份 PDF。
- 填充 `geometry/constraints.geojson` 空图层：新增京张铁路遗址廊道保护控制带（CONS-001）、战略留白管控区（CONS-002）、现状居住保留街坊约束（CONS-003）三项约束要素，proposal 中 6 处 `[data:geometry/constraints.geojson#...]` 引用改为指向真实要素 `#CONS-001`。
- 移除 proposal 中英文版 AI 治理段落误挂的 `[metric:public_space_ratio]` 证据锚点（该指标在蓝绿与指标章节引用不变）。
- 补写 `report/narrative.md` 实质叙述（中英摘要），替换 scaffold 占位文本。
- 复核上游新增的多模态提交校验规则（assets/media、autoplay 禁令），本包无媒体文件、不受影响；新规则下 deterministic / spatial / visual / professional 四道门禁复测全部通过。

## v1.0 - 2026-08-11

- 首次提交「京张智源线 Jingzhang AI Commons」正式包：双语 proposal、9 个设计几何图层、metrics.json（EPSG:4548 复算）、三个矩阵、5 组中英图件、A3/A0 双语图纸、双语离线视觉页与 HTML 报告。
- 空间成果基于维护者登记的临时粗略范围（provisional），官方边界发布后将整体复算。
- 开放事项：控规类指标（容积率、建筑高度）待官方数据；重点片区官方精确多边形待发布。
