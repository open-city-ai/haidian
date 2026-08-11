# 逐资产版权、许可与生成方法清单

本清单与 `sources.json` 一起构成投稿包的权属说明。所有空间建议、品牌方向、活动和运营路径都是概念建议、参考方案和可供专业团队深化研究的材料，不构成官方批准或实施承诺。

| 资产 | 作者/来源 | 许可或状态 | 生成/使用方法 | 限制 |
| --- | --- | --- | --- | --- |
| `proposal.md` | 本投稿 AI agent 生成，人工整理 | `COMMUNITY-DISPLAY-ONLY` | 根据仓库任务书、标准快照、来源登记和本包结构化数据写作 | 不替代专业规划、审批或事实核验 |
| `agent.json`、JSON 矩阵与 `metrics.json` | 本投稿 AI agent 生成 | 投稿包内审计资产 | 结构化记录任务覆盖、假设、指标和证据链 | 机器字段不替代正式控制条件 |
| `geometry/*.geojson` | 仓库临时边界 + 本投稿设计层 | 仓库公开/清权资料；设计层为本包原创 | 使用 EPSG:4326 几何，面积按 EPSG:4548 复算 | `SITE_BOUNDARY` 和 `KEY_AREA` 为 provisional，不能作 official redline |
| `assets/figures/*.png` | 本投稿 AI agent 生成 | 本包原创示意图 | 从 GeoJSON、metrics、矩阵和假设生成技术图解，不使用外部地图截图 | 解释层，不替代 JSON/GeoJSON |
| `assets/identity/logo-direction.svg` | 本投稿 AI agent 生成 | 本包原创方向稿 | 由铁路斜线、开放环和三点节点构成，未复制现有商标或 Logo | 仅为方向稿，正式注册和商标检索待后续 |
| `drawings/a3-booklet.pdf`、`drawings/a0-boards.pdf` | 本投稿 AI agent 生成 | 本包原创排版输出 | 由五张本地 PNG、正文证据和指标卡排版生成 | 图纸内容随官方 geometry 替换后必须重排 |
| `report/proposal.html`、`visual/index.html` | 本投稿 AI agent 生成 | 本包原创离线 HTML | 本地 CSS、内嵌 SVG/文本和本地 PNG；无 CDN、地图瓦片、外部脚本、字体、iframe、API 或跟踪 | 仅用于离线阅读和展示 |
| 系统字体 | Windows `Microsoft YaHei` / `Deng` 回退 | 不随包分发字体文件 | 本地渲染时按系统回退 | 用户端字体差异可能影响排版，需复核 |
| 图标、图形、地图、照片、人物、企业 Logo、商标 | 未使用外部素材 | 不适用 | 所有图形均由本包代码/矢量方向和几何数据绘制 | 禁止从案例官网复制图片、Logo 或商标 |
| 全球案例 URL | 各案例官方公开页面，详见 `sources.json` | `background_only` | 仅比较公开机制和转译启示 | 不表示合作、投资、招商、政策或本地事实 |
| 仓库官方公告、标准快照、清权任务书 | `sources.json` 中登记的官方/清权来源 | 按仓库和来源记录使用 | 只引用其允许用途 | 不能由公告文字推断精确 polygon、红线或工程参数 |

本包不含个人数据、内部文件、未授权图片、论文图像、外部字体文件或第三方商标。未来若替换为组织方 official geometry，或加入照片、Logo、图标、地图底图、数据集、供应商或合作机构，必须新增逐资产来源、许可、授权范围和生成方法，并重新进行版权、空间、指标和自检审查。
