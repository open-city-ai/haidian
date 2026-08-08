# 版权与素材权利声明

## 结论

本投稿未使用第三方摄影、卫星影像、抓取规划图、企业商标、远程字体、远程脚本、地图瓦片或运行时外部资产。全部图件、PDF 版式、网页图形和图标均由本投稿的本地确定性构建流程原创生成；外部案例仅以文字摘要和机器可读来源引用。

## 逐项资产登记

| 资产 | 形成方式 | 输入与权利边界 |
| --- | --- | --- |
| `assets/figures/site-overview.png` | Pillow 程序化原创绘制 | 使用提交内 GeoJSON 与 metrics；无外部图片 |
| `assets/figures/land-use-structure.png` | Pillow 程序化原创绘制 | 使用参与者生成 land_use / roads；无外部图片 |
| `assets/figures/key-areas.png` | Pillow 程序化原创绘制 | 使用仓库暂定 key areas 与 agent 内容模型 |
| `assets/figures/mobility-bluegreen.png` | Pillow 程序化原创绘制 | 使用参与者生成 roads / green / public space |
| `assets/figures/metrics-evidence.png` | Pillow 程序化原创绘制 | 使用 metrics / agent / assumptions；无外部图片 |
| `drawings/a3-booklet.pdf` | ReportLab 矢量版式 + 上述原创图件 | 16 页原创方案册 |
| `drawings/a0-boards.pdf` | ReportLab 矢量版式 + 上述原创图件 | 6 张原创展板 |
| `visual/index.html` | 内联 HTML/CSS/SVG 原创界面 | 无 CDN、无远程请求、无跟踪 |

## 几何与资料

- `brief/site-package/geometry/provisional_boundaries.geojson`：由本开源仓库提供；提交中的 `site_boundary.geojson` 与 `key_areas.geojson` 保留其暂定来源、置信度、geometry_role 和 usage_note，不主张为官方红线。
- 其余 design GeoJSON 为参与者依据暂定边界程序化生成的概念建议，不是测绘成果或法定规划。
- 全球案例只在 `sources.json` 中登记机构一手页面，未复制页面中的图像、标识、版式或长段文字。

## 字体与软件

- PNG 使用本机安装的 `Noto Sans CJK SC` Regular/Bold；该字体属于 Noto 项目，按 SIL Open Font License 使用。
- PDF 使用 macOS 系统的 STHeiti SC TrueType Collection 子字体生成可搜索的矢量中文；不把字体文件作为投稿资产再分发。
- Pillow、Shapely、PyProj、ReportLab、PyPDF 与仓库验证脚本仅作为制作/验证工具，依各自许可证使用；本声明不改变它们的许可证。

## AI 与人工责任

文本与程序化视觉由 Codex / GPT-5 在用户授权下生成并通过自动与视觉检查；提交者仍对事实、来源、版权、专业判断与公开发布负责。方案不声称组织方或政府对任何视觉、指标或建设建议背书。
