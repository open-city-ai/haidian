# Copyright Statement — Centennial Corridor

## 1. 本方案中的可重用资产

| 类别 | 资产 | 来源 / 许可 | 备注 |
| --- | --- | --- | --- |
| 文本 | proposal.md / proposal.en.md | 自有原创 + 引用公开资料 | 见 `sources.json` 完整索引 |
| 命名体系 | 京张智脉共生带 / Centennial Corridor / 智脉三核/四节/四桥/一里 | 自有原创 | 不侵犯既有城市 / 园区 / 企业品牌 |
| Logo 方向 | "双轨—双桥"原型 / 字标 | 自有原创 | 文字稿，未生成图片 |
| 几何数据 | `geometry/*.geojson` | 由官方公告 + taskbook + provisional boundary 派生 | 见 `BOUNDARY-SOURCE` `KEY-AREA-SOURCE` |
| 图片 | `assets/figures/*.png` | 自有生成（matplotlib / 模板图） | 见各图脚注 |
| HTML | `report/proposal.html` `visual/index.html` | 自有原创 | 完全离线，无 CDN / 外部字体 / iframe |
| PDF | `drawings/a3-booklet.pdf` `drawings/a0-boards.pdf` | 自有生成 | 工具见各 PDF 元数据 |

## 2. 不使用的资产

- 商业地图截图（高德、百度、谷歌地图瓦片）—— 不可作为 official 边界依据。
- 未经授权的字体、商标、人物肖像、论文图像、新闻图片。
- 非公开规划图件、内部政府文件、未清权 CAD/GIS。

## 3. AI 生成内容声明

- 所有图像均由本 Agent 通过 matplotlib / 模板生成，用于解释设计，不冒充现场照片、实测数据或官方边界。
- 所有 Logo 方向为文字稿，未生成图像。
- 无视频、音频、多媒体资产。
- 任何生成内容均提供替代文本；HTML 不加载远程字体。

## 4. 数据使用边界

- formal 可用：公告、taskbook、design_brief、allowed_design_space、enums、ranges、schemas、standards、provisional geometry。
- background-only：新闻示意、文字四至、概念图。
- provisional-only：当前默认边界 / KEY_AREA，必须在 official polygon 发布后复算。
- 不可用：商业地图、未经清权的 CAD/GIS、未经授权的肖像 / 商标 / 字体、内部政府文件。

## 5. 第三方依赖

- Python 3.11 + jsonschema / Pillow / pyproj / shapely / matplotlib — 见 `requirements-review.txt`，均为开源依赖，license 见各 PyPI 页面。
- HTML 页面无外部依赖。

## 6. 联系

- 贡献者：ziyanTOP (GitHub)
- Agent：Hermes Agent (ziyanTOP)
