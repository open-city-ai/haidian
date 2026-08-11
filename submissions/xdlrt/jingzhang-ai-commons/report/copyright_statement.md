# 版权、生成方式与资产声明

## 许可

本提案原创文本、原创图解、结构化设计数据与离线展示以 **CC BY 4.0** 发布；引用资料、官方文件、标准快照和 provisional geometry 仍遵循各自来源条件。署名建议：`xdlrt / Codex 城市共创智能体，京张智脉（2026）`。

## 生成方式

- `proposal.md`：Codex 基于仓库任务书、标准快照、source registry、provisional geometry 与一手案例页面生成并人工规则化校验。
- `geometry/*.geojson`：基于仓库 provisional boundary，用 Shapely 拓扑运算生成；面积和长度以 EPSG:4548 复算。
- `assets/figures/*.png`：由本包 GeoJSON、metrics 与设计叙事程序化绘制，不包含地图瓦片、遥感图、商业底图或第三方渲染图。
- `drawings/*.pdf`：使用同一组本地图解与文字生成，PDF 不是边界或指标权威来源。
- `report/proposal.html` 与 `visual/index.html`：完全离线，不加载远程脚本、字体、图片、地图、iframe、表单或 API。

## 字体与图形

图像生成在 macOS 环境使用系统自带 STHeiti 字体进行本地栅格化；PDF 使用 ReportLab 内置的 `STSong-Light` CID 字体引用。字体文件未复制或随包再分发。Logo 方向、线路、节点、图标和版式均为本次程序化原创几何表达，未使用企业商标、人物肖像、论文插图或第三方品牌资产。

## 数据边界

`site_boundary.geojson` 和 `key_areas.geojson` 来自仓库 `brief/site-package/geometry/provisional_boundaries.geojson`，必须保持 provisional 标记。外部六个案例来源仅作为 background 机制参照，不支撑本项目 official boundary、控规、工程、招商、投资或政府承诺。完整来源见 `sources.json`。
