# 版权与生成说明

本投稿包的中英文正文、结构化 JSON/GeoJSON、离线 HTML、视觉标记、图件版式与 A3/A0 图纸由 Codex × AmyLili28 为本次开源征集生成。提交包按仓库的展示与共创许可语境提供；任何后续复用仍需保留来源、贡献者与状态边界。

`assets/media/second-encounter-cover-v1.png` 及七张 `assets/media/se-*-v1.jpg` 概念底图由 OpenAI ImageGen 生成，并逐项登记于 `sources.json`。七张底图分别承担走廊鸟瞰、时间轴测、创造亭、会面长桌、照护工坊、无障碍返回路径与十二场景拼贴的气氛表达；不包含真实场地测绘、可识别真实人物、授权商标或官方标识。场景拼贴第 5 格展示板上的极小非语义纹理已在最终图中由确定性信息卡完整遮蔽。生成底图不得被解释为现状照片、公众意见、访谈样本、官方效果图、审定规划、运行成效或机构承诺。

`site-overview`、`land-use-structure`、`key-areas`、`mobility-bluegreen`、`people-rights`、`scenario-contracts` 与 `metrics-evidence` 七组中英最终图以这些底图为概念气氛层，并由独立升级脚本通过 Pillow 确定性叠加中英标题、编号、人物权利、场景名称、试点状态、数值、临时几何索引与证据边界。`regional-collaboration`、`cases-ecosystem`、`components-identity`、`operations-raci` 与 `pilot-operations` 五组中英图仍为数据与方案结构驱动的确定性信息图。任何可读文字、数字与方案边界均不是图像模型生成内容；几何和指标只按投稿包中标注为低置信度的临时 GeoJSON/`metrics.json` 使用。

Pillow 中文图件使用当前 macOS 系统提供的 STHeiti，英文图件使用系统 Arial；均只输出栅格结果，不分发系统字体。PDF 由 ReportLab 生成；中文使用当前系统 `/System/Library/Fonts/Supplemental/Arial Unicode.ttf` 并嵌入子集，英文使用 PDF 标准 Helvetica。未把系统字体文件放入投稿包，也不对其外部再分发权作授权声明。

离线 HTML 使用随包提供的 `visual/assets/JingZhangCJK.css`。该 CSS 以 data URI 内嵌 Noto Sans SC 字符子集，并在文件头完整保留 SIL Open Font License 1.1 文本；不依赖远程字体服务。2026-08-31 的回归修复按 `report/proposal.html`、`report/proposal.en.html`、`visual/index.html` 与 `visual/index.en.html` 四份最终文件重建子集，确认其中 974 个非 ASCII 唯一码位全部有字形；中文协议按钮强制继承该字体，英文首屏的语言切换则使用纯英文真实文本以消除加载时序依赖。子集只为保证本投稿现有中英文字符在离线 Linux、macOS 与 Windows 环境可读，不用于商标或政府标识。

外部事实与案例仅通过 `sources.json` 登记的公开链接引用；未复制外部网页图片、地图瓦片、字体、商标或同行方案资产。同行方案仅用于差异化比较。所有空间落地建议均为概念建议、参考方案或可供专业团队深化研究，不替代正式规划，不构成政府审定结论。
