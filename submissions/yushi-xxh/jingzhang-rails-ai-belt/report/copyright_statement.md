# 著作权、许可与生成披露

本提交由 MiniMax-M3 在 GitHub 用户 `yushi-xxh` 授权的本地工作流中生成和修订。方案文字、概念 GeoJSON、图表、品牌概念稿、离线 HTML 和 PDF 均为本次投稿的原创生成成果；事实依据仅来自 `sources.json` 登记的官方公开、仓库登记或用户清权资料。

## 逐资产来源

| 资产 | 作者与工具 | 输入 | 第三方素材 | 权利与用途边界 |
| --- | --- | --- | --- | --- |
| `proposal.md`、`proposal.en.md` | MiniMax-M3；人工指令与校验修订 | 已登记任务书、标准快照、案例官方页面、GeoJSON、metrics 和矩阵 | 不复制第三方正文或图片 | 原创方案文字；案例仅作摘要与方法转译 |
| `geometry/*.geojson` | MiniMax-M3；Python、Shapely、PyProj | 仓库 provisional boundary 与方案参数 | 无外部底图、OSM 或商业地图 | 概念几何；不得作为官方红线、测绘或审批依据 |
| 五张必需 PNG 与品牌识别图 | MiniMax-M3；Python、Matplotlib | 本提交 GeoJSON、`metrics.json`、矩阵与假设 | 无第三方图片、图标、Logo、肖像或地图瓦片 | 原创栅格技术图；provisional/synthetic 状态随图披露 |
| `drawings/*.pdf` | MiniMax-M3；ReportLab | 本提交原创文字与 PNG | 无第三方图片 | 原创排版成果；不构成施工图或政府批准文件 |
| `report/*.html` | 仓库 `render_proposal_html.py` | 本提交 Markdown 和本地图片 | 无远程资源 | 离线阅读版；与 Markdown 同一许可边界 |
| `visual/index.html` | MiniMax-M3；本地 HTML/CSS | 本提交图片、指标、来源与假设 | 无 CDN、远程字体、脚本、地图瓦片、iframe 或追踪器 | 离线展示与评审使用 |

Matplotlib PNG 在 Windows 环境优先使用系统可用的 Microsoft YaHei/SimHei 进行栅格化；未分发字体文件。ReportLab PDF 使用本机字体子集或 Helvetica 进行排版；实际公开发布前应由维护者或专业团队复核嵌入字体许可并在需要时替换为明确可再分发字体。当前提交没有使用企业商标、人物肖像、第三方 Logo 或未经授权的摄影/渲染图。

八个国际案例分别登记为 `CASE-PDD`、`CASE-KALASATAMA`、`CASE-22B`、`CASE-MILA`、`CASE-KQ`、`CASE-AIHUB`、`CASE-SMAP`、`CASE-SACLAY`。方案只基于其官方公开页面提炼方法，不复制原图，不把案例规模、资金、制度或承诺转写为海淀事实。

## 许可说明

`manifest.json` 声明 `COMMUNITY-DISPLAY-ONLY`。本提交同意在本征集仓库及其评审流程中进行读取、自动校验、专业评审、存档和社区展示；该声明不额外授予仓库规则之外的商业使用、再许可、商标采用或工程实施权。后续研究、衍生使用和公开传播仍应遵守仓库规则、来源许可、署名要求及适用法律。

所有空间、品牌、活动和运营内容均为概念建议、参考方案或可供专业团队深化研究的材料，不替代正式规划、版权/商标审查、政府审批或实施承诺。完整生成披露对应 `[source:GENERATION-STACK]`。
