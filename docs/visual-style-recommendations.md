# HTML 与图纸视觉风格推荐

本项目允许投稿 agent 自行选择视觉生成工具。以下推荐来自 [JimLiu/baoyu-skills](https://github.com/JimLiu/baoyu-skills/tree/main)，检查版本为 `ce84174bf7af6a178ae2c980f1bdcce4f1c3f7de`。这些 skill 是可选辅助工具，不是本仓库 required CI 的依赖，也不能替代 GeoJSON、metrics、矩阵、PDF 图纸和自检结果。

机器可读推荐见 `brief/site-package/visual_style_recommendations.json`。

## 图面质量原则

本项目的图片、HTML 和展板应服务于“让人看懂设计”，而不是直接展示原始数据。GeoJSON、metrics 和矩阵是权威证据层；图面是解释层，必须把设计判断、空间关系、重点区域和风险边界讲清楚。

优先做到：

- 一图一主叙事：总览图讲总体概念，结构图讲空间关系，重点区图讲差异，交通蓝绿图讲连续性，指标图讲证据链。
- 主次清楚：背景、临时边界和约束低对比；廊道、节点、重点区、AI 场景和核心结论高对比。
- 专业标注：每张图应有标题、图例、重点注释、来源/临时性说明和必要指标。
- 设计表达优先：用曲线廊道、节点网络、透明叠加、callout、指标卡、分层关系、时间轴、剖面式关系表达空间逻辑。
- 临时边界降级：provisional boundary 应以虚线、淡色边框、注释或水印表达，不应成为主视觉构图。

避免出现：

- raw GeoJSON/GIS/debug map 截图。
- 纯矩形色块拼图或等权重图层堆叠。
- 没有图例、没有主标题、没有重点标注、没有资料边界说明的图片。
- 大面积装饰性渐变、氛围渲染、宣传海报式主视觉替代专业图面。
- 把 bbox、provisional polygon、新闻图或外部地图截图画得像官方红线。

## 推荐优先级

| 场景 | 推荐 skill | 推荐用法 |
| --- | --- | --- |
| `report/proposal.html` 阅读版 | `baoyu-markdown-to-html` | 把 `proposal.md` 转成稳定 HTML 阅读版；输出仍必须离线、无远程资源、无脚本，并放在 `report/proposal.html`。 |
| `assets/figures/*.png` 证据图 | `baoyu-infographic` | 用于资料证据链、三层范围、重点区域、交通蓝绿、指标复算等派生图。 |
| `visual/index.html` 的核心图解 | `baoyu-infographic`、`baoyu-diagram` | 信息图用于图层/指标/任务覆盖；diagram 用于流程、证据链、AI 服务架构。 |
| A3 文册 / A0 展板视觉方向 | `baoyu-slide-deck` | 作为版式和分屏方向参考，正式图纸仍需专业图例、比例、来源和指标。 |
| 封面或 hero 视觉 | `baoyu-cover-image` | 只作为可选封面，不得作为核心空间论证。 |

## 推荐风格组合

### 城市设计与空间证据图

- `baoyu-infographic --layout isometric-map --style technical-schematic`
- `baoyu-infographic --layout dashboard --style corporate-memphis`
- `baoyu-infographic --layout hierarchical-layers --style technical-schematic`
- `baoyu-infographic --layout linear-progression --style subway-map`
- `baoyu-infographic --layout dense-modules --style pop-laboratory`

适合：总览地图、三层范围、用地/公共空间/交通复合图、指标仪表盘、任务覆盖图。

### AI 服务与实施机制图

- `baoyu-diagram` 的 `flowchart`
- `baoyu-diagram` 的 `architecture`
- `baoyu-diagram` 的 `data flow`
- `baoyu-diagram` 的 `timeline`

适合：AI 场景治理流程、数据边界、人工复核机制、更新项目分期、评审证据链。

### 展板与文册视觉方向

- `baoyu-slide-deck --style blueprint`
- `baoyu-slide-deck --style corporate`
- `baoyu-slide-deck --style minimal`
- `baoyu-slide-deck --style editorial-infographic`
- `baoyu-slide-deck --style intuition-machine`
- `baoyu-slide-deck --style scientific`

适合：A0 展板分屏、A3 文册章节开页、方案摘要页。

## 不建议作为 formal 核心成果

- `baoyu-comic`：漫画风格不适合严肃评审主成果。
- `baoyu-xhs-images`：社交媒体卡片风格偏传播，不适合作为专业图纸或 formal HTML 主视觉。
- `baoyu-article-illustrator`：文章插图可以辅助说明，但不能作为可复核空间图、指标图或专业图纸。
- 过度氛围化、梦幻、童趣、娱乐、赛博霓虹、像素或纯插画风格，不应用于核心评审图。

## 必须遵守的边界

- `visual/index.html` 和 `report/proposal.html` 必须离线打开，不得加载 CDN、远程地图瓦片、外部脚本、外部字体、远程图片、iframe、表单、API 请求或跟踪代码。
- 图像、图解和 HTML 是展示层；边界、面积、指标、合规响应和正式判断仍以 GeoJSON、JSON、PDF 图纸和自检结果为准。
- 每张图都应有标题、图例、来源说明、指标引用和 official/provisional boundary 状态。
- 不得用生成图、插画、社交媒体卡片或渲染图替代 `geometry/*.geojson`、`metrics.json`、`compliance_matrix.json`、`standard_matrix.json`、`design_depth_matrix.json`。
- 如果使用外部 skill 生成视觉资产，应在 `sources.json` 或 `report/copyright_statement.md` 中记录工具、版本、输入来源和版权说明。
