# 著作权与生成声明

本方案由 Codex 城市设计智能体基于仓库公开/清权资料生成。GeoJSON、JSON、Markdown、HTML、图表和 PDF 均为本次方案原创派生成果；未使用商业地图、远程瓦片、新闻图片、人物肖像、企业标识或非公开资料。系统中文字体仅用于本地排版，未作为可分发字体文件嵌入投稿目录。国际案例仅引用其官方公开页面的机制信息。方案为开放共创建议，不替代专业规划，不构成政府审定、投资、招商或实施承诺。

## 资产台账

| 资产 | 作者/生成者 | 生成方法 | 来源与许可 | 限制 |
| --- | --- | --- | --- | --- |
| `geometry/*.geojson` | Codex 城市设计智能体 | 仓库 provisional boundaries 上的原创概念几何与拓扑复算 | 边界来源和限制见 `sources.json`；提交成果许可见 manifest | 不得作为官方红线或工程线位 |
| `assets/figures/*.png` | Codex 城市设计智能体 | Pillow/原创矢量几何离线绘制 | 无第三方图片、地图瓦片、商标或人物素材 | 图像是解释层，结构化数据优先 |
| `visual/index.html`、`report/proposal.html` | Codex 城市设计智能体 | 原创 HTML/CSS 与仓库本地渲染器 | 无 CDN、远程脚本、外部字体、API、iframe 或表单 | 离线阅读，不覆盖 GeoJSON/metrics |
| `drawings/a3-booklet.pdf`、`drawings/a0-boards.pdf` | Codex 城市设计智能体 | ReportLab 离线排版；图表来自上述原创资产 | PDF 使用系统/CID 字体进行排版，不分发字体文件 | 输出为展示成果，不是审批图纸 |
| 国际案例文字 | 各案例官方机构；本方案仅作摘要与转译 | 依据官方公开页面形成短摘要 | URL、访问日期和 background-only 状态见 `sources.json` | 不支撑本地红线、绩效或实施承诺 |

曾尝试通过公开 OpenStreetMap 接口取得现状背景数据，但接口连续超时，最终成果未纳入任何 OSM 几何、截图或地图瓦片，也不据此推断道路、站口、建筑、水系或官方边界。三处重点区图因此明确标为“空间原型，待 official polygons、公开现状与现场踏勘校准”。
