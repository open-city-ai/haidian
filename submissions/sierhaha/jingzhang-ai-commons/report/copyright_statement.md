# 版权与合规声明（Copyright Statement）

本文件说明提交包 `submissions/sierhaha/jingzhang-ai-commons`（双螺旋创新带方案，v0.2）内全部交付物的生成方式、素材来源、字体与工具链使用情况，供评审进行版权与来源核查。

## 1. 生成方式声明

本提交包内所有文本、空间几何（GeoJSON）、指标（metrics.json）、矩阵（compliance/standard/design-depth）、示意图（assets/figures/*.png）、报告 HTML（report/*.html）、可视化仪表盘（visual/*.html）与图纸（drawings/*.pdf）均由声明的 AI 智能体 **sier-hermes**（运行于 Hermes Agent CLI，模型 deepseek-v4-flash）编写/生成，并经确定性校验脚本（finalize_submission.py / self_check_submission.py / participant_preflight.py）验证。

生成过程使用的自动化脚本清单（位于参赛者本地工作区，未随提交包分发）：
- `tools/gen_geometry.py`：基于场地包 provisional 边界生成用地/建筑/道路/绿地/公共空间/约束/分期 GeoJSON，面积在 EPSG:4548 下复算；
- `tools/gen_metrics.py`、`tools/gen_matrices.py`：生成指标与三张矩阵；
- `tools/gen_figures.py`：使用 matplotlib 生成全部正式图；
- `tools/gen_visual.py`、`tools/gen_drawings.py`：生成离线 HTML 仪表盘与 A3/A0 PDF。

## 2. 素材来源

- 全部空间数据由智能体基于 `brief/site-package/geometry/provisional_boundaries.geojson`（临时约束范围）推导生成，属设计推导数据，不来源于任何商业地图、OSM、新闻示意图或未清权底图。
- 全部示意图为程序化绘制（matplotlib），不包含任何第三方照片、渲染图、截图、商标、Logo、人物肖像或企业标识。
- 文本中引用的政策背景（如国务院《2030年前碳达峰行动方案》，国发〔2021〕23号）为公开政府文件的事实性引用，出处见 `sources.json`（POLICY-CARBON-PEAK）。
- 专业标准依据仓库内 `brief/site-package/standards/references/` 的本地快照，出处见 `standard_matrix.json` 与 `sources.json`。

## 3. 字体使用

- 图件与图纸（PDF）使用 **Noto Sans CJK SC（OFL-1.1 开源字体，fonts-noto-cjk 包）** 渲染，由 matplotlib 嵌入显示所需字体子集；字体可自由使用、嵌入与分发（SIL Open Font License 1.1），无版权清权障碍。
- 无任何专有字体（如 SimHei/微软雅黑）用于本包交付物。

## 4. 工具链与许可证

| 组件 | 用途 | 许可证 |
| --- | --- | --- |
| Python 3.11 | 生成与校验运行环境 | PSF License |
| matplotlib | 图件/图纸绘制 | PSF 兼容（matplotlib license） |
| shapely | 空间几何运算 | BSD-3-Clause |
| pyproj | EPSG:4548 坐标投影与面积计算 | MIT |
| Pillow | 图像处理 | HPND |
| Noto Sans CJK SC | 图件与 PDF 中文字体 | SIL Open Font License 1.1 |
| jsonschema | 结构化校验 | MIT |

以上组件均以未修改形式使用，不改变其许可证义务。

## 5. 外部资源声明

- `visual/index.html` 与 `report/proposal.html` 为完全离线静态文件，不加载任何 CDN、远程地图瓦片、外部脚本、外部字体、iframe 或跟踪代码。
- 本包不包含任何需要另行授权的第三方视觉素材；若后续修订引入外部素材，将先完成清权并更新本声明。

## 6. 边界与事实性声明

- 本方案边界为临时约束范围（provisional constraint），非官方红线；官方 polygon 发布后全部面积类指标需复算。
- 本方案不声称官方批准、审定控规、最终权属、最终建设规模或保证实施；所有空间与机制建议为概念建议或参考方案。
