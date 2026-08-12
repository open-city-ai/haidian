# 逐资产版权与来源台账 (Rights Ledger)


本文件提供了本方案提交包中所有视觉资产、数据、代码和内容的版权、许可及来源声明。所有列出资产均已完成清权，若存在任何无法明确证明版权归属的外部资产，团队承诺无条件替换。

| 资产类型 | 资产名称 / 文件路径 | 来源机构 / 作者 | 许可证协议 (License) | 授权说明 / 核验记录 |
| --- | --- | --- | --- | --- |
| **字体 (Fonts)** | Noto Sans SC | Google (OFL) | SIL Open Font License (OFL) | 用于 PDF 嵌入、图表与报告渲染。v8.0 起 PDF 已嵌入 Noto Sans SC 字库文件，确保跨平台中文显示。字体来源：https://fonts.google.com/specimen/Noto+Sans+SC（Google Fonts，获取时间 2026-08-11） |
| **字体 (Fonts)** | PingFang SC / SimHei | Apple / Microsoft | 本地系统许可 | v7.0 前通过本地系统 API 调用渲染，未直接分发字库文件。v8.0 起 PDF 已切换至 Noto Sans SC 嵌入方案，不再依赖系统字体 |
| **代码依赖库** | `geopandas`、`matplotlib`、`shapely`、`fpdf2` | Open Source Contributors | BSD / Matplotlib License / LGPL | 在 Python 脚本中调用生成可视化图表和 PDF。`fpdf2` 用于 v8.0 PDF 字体嵌入生成。所有依赖均为 PyPI 公开发行版 |
| **地图与几何数据** | `geometry/*.geojson`（10 个图层） | YuanYii AI Agent | CC-BY 4.0 | 由 AI Agent 基于 `provisional_boundaries.geojson` 通过 geopandas/shapely 拓扑演算自动生成（2026-08）。生成过程：读取 brief/site-package 临时边界 → 分区/缓冲/叠加分析 → 输出 GeoJSON。所有边界标注 `official_boundary=false`，不构成法定规划红线 |
| **视觉资产 (Logo)** | `assets/figures/logo.png` + `logo.en.png` | YuanYii AI Agent | CC-BY 4.0 | 由 AI Agent 通过文本描述生成（seedream/图片生成工具，2026-08）。概念视觉方向，非最终品牌标识。生成 prompt 方向："双轨铁路钢轨 + 神经网络拓扑节点，深蓝金色配色，简洁现代风格" |
| **视觉资产 (图件)** | `assets/figures/*.png`（12 张） | YuanYii AI Agent | CC-BY 4.0 | 由 Python/matplotlib 基于 GeoJSON 和 metrics.json 数据自动渲染生成（2026-08）。图件为概念阶段可视化，部分缺地名/比例尺/北箭头/来源标注 |
| **国际案例资料** | 六大全球 AI 案例对比数据 | 见生态图谱表格中各案例来源链接 | CC-BY-SA 3.0 / 公开信息 | 案例事实性信息来源于各案例官方网站和公开学术/政府报告（URL 见 proposal.md 生态图谱表格）。已标注获取时间和适用范围，不作为投资或政策建议 |
| **前端交互代码** | `visual/index.html` + `index.en.html` | YuanYii AI Agent | MIT License | 自包含 HTML（无外部 CSS/JS/字体依赖），交互式总览文件自主编写。CSS 样式为原创设计，数据通过 data-metric 属性绑定 metrics.json 值 |

## 声明 (Declaration)
> 本清单由作者自主核查。所有空间几何均为临时数据（Provisional Data），本说明亦不构成对现实世界法定规划的正式审批背书。
