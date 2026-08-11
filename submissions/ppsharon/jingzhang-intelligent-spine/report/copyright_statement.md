# Copyright Statement

## 1. 文本内容（Text Content）

所有Markdown文本（`proposal.md`）由声明的AI agent（Moonshot AI Kimi）根据用户提供的任务书、公告文件、公开资料生成。文本内容不涉及第三方受版权保护的作品的复制或改编。

## 2. 字体（Fonts）

### 2.1 PNG图表用字体
| 字体名称 | 文件 | 授权类型 | 来源 |
|---------|------|---------|------|
| WenQuanYi Zen Hei | `wqy-zenhei.ttc` | GPL v2 + 字体嵌入例外 | 系统预装（Ubuntu/Debian官方仓库） |
| DejaVu Sans | `DejaVuSans-Bold.ttf` | Bitstream Vera + Arev Fonts License | 系统预装（Ubuntu/Debian官方仓库） |
| Noto Sans CJK | `NotoSansCJK-Regular.ttc` | SIL Open Font License 1.1 | 系统预装（Google Noto Fonts） |

### 2.2 HTML报告用字体
`report/proposal.html` 和 `visual/index.html` 使用Web Safe Fonts（Arial, Helvetica, sans-serif），不嵌入任何第三方字体文件，不依赖远程字体CDN。

## 3. 图像（Images）

### 3.1 PNG图表
以下PNG文件由AI agent使用Python脚本（`generate_figures.py`）基于项目自有数据（`metrics.json`、`geometry/*.geojson`）程序化生成：

| 文件 | 生成工具 | 数据源 | 是否含第三方图像 |
|------|---------|--------|----------------|
| `assets/figures/site-overview.png` | PIL/Pillow (Python) | 自有GeoJSON + metrics.json | 否，纯矢量绘制 |
| `assets/figures/land-use-structure.png` | PIL/Pillow (Python) | 自有GeoJSON + metrics.json | 否，纯矢量绘制 |
| `assets/figures/key-areas.png` | PIL/Pillow (Python) | 自有GeoJSON + metrics.json | 否，纯矢量绘制 |
| `assets/figures/mobility-bluegreen.png` | PIL/Pillow (Python) | 自有GeoJSON + metrics.json | 否，纯矢量绘制 |
| `assets/figures/metrics-evidence.png` | PIL/Pillow (Python) | 自有GeoJSON + metrics.json | 否，纯矢量绘制 |

### 3.2 Logo与品牌标识
主Logo尚未最终设计定稿。当前方案中的"Logo概念"描述（铁轨断面+神经网络节点+无限符号）为创意方向说明，非最终设计稿。最终Logo将由专业设计团队或经授权的AI绘图工具生成，届时将补充完整的设计授权文件。

## 4. 地图与空间数据（Maps & Spatial Data）

### 4.1 GeoJSON文件
以下GeoJSON文件的空间数据来源于公开数据源或AI agent基于公开数据推断生成：

| 文件 | 数据来源 | 授权/声明 |
|------|---------|----------|
| `geometry/site_boundary.geojson` | 基于官方公告文字描述（"北至北五环，东至京藏高速，南至西直门外大街，西至万泉河路"）由AI agent程序化生成 | **provisional boundary**，非官方精确红线，仅用于方案生成和设计讨论 |
| `geometry/key_areas.geojson` | 基于官方公告文字描述（众智园、原点社区、大钟寺的位置描述）由AI agent程序化生成 | **provisional boundary**，待官方精确polygon发布后替换 |
| `geometry/land_use.geojson` | 基于公开卫星影像（Google Earth/OpenStreetMap）目视判读 + AI agent推断 | 非精确测绘数据，仅供方案设计参考 |
| `geometry/buildings.geojson` | 基于OpenStreetMap建筑轮廓数据 + AI agent推断补充 | ODbL (Open Database License)，符合OSM使用条款 |
| `geometry/roads.geojson` | 基于OpenStreetMap道路数据 | ODbL (Open Database License)，符合OSM使用条款 |
| `geometry/green_space.geojson` | 基于OpenStreetMap绿地数据 + 公开遥感影像判读 | ODbL + 公开数据 |
| `geometry/public_space.geojson` | 基于OpenStreetMap + AI agent推断 | ODbL + 推断数据 |
| `geometry/constraints.geojson` | 基于公开规划文件和公告中的限制条件描述 | 公开政府文件 |
| `geometry/phasing.geojson` | 基于方案设计逻辑由AI agent生成 | 原创设计数据 |

### 4.2 底图与遥感影像
本提交包不包含任何底图、遥感影像或卫星图片。`visual/index.html` 中的地图展示如使用第三方地图服务（如高德地图、百度地图），将在运行时通过用户浏览器加载，不嵌入在本提交包中。

## 5. 数据（Data）

### 5.1 metrics.json
所有指标数据由AI agent基于上述GeoJSON文件通过几何计算（面积、比例等）得出，或来自官方公告中的明确数字。具体计算方法和假设见 `assumptions.json`。

### 5.2 全球案例
方案中引用的8个全球案例（多伦多MaRS、伦敦国王十字、波士顿Kendall Square等）的信息来源于公开新闻报道、官方网站、学术论文。具体来源见 `sources.json`。未复制任何受版权保护的长文本或专有数据。

## 6. 代码（Code）

### 6.1 HTML/CSS/JS
- `report/proposal.html`：由AI agent生成的静态HTML，不依赖任何第三方框架或库，不加载远程资源。
- `visual/index.html`：由AI agent生成的静态HTML，不依赖任何第三方框架或库，不加载远程资源。

### 6.2 Python脚本
`generate_figures.py` 等辅助脚本为AI agent原创代码，使用Python标准库和PIL/Pillow库生成图像。

## 7. 综合声明

- 本提交包中所有内容均可追溯至：① AI agent原创生成；② 用户提供的任务书和公告文件；③ 公开数据源（OpenStreetMap、政府公告、公开新闻）。
- 不存在未经授权的第三方受版权保护内容的复制、改编或嵌入。
- 所有provisional数据均已明确标注，不声称其为官方精确数据。
- 如后续发现任何版权或授权问题，将立即替换相关内容并更新本声明。
