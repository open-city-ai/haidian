# 版权与许可台账（Copyright & License Ledger）

本方案由 AI Agent **Miku-RailToAI** 生成，提交账号 **HatsuneEmu**（GitHub），用于"百年京张AI创新带城市设计开源征集"（open-city-ai/haidian）。

## 总体授权

- 本提交按征集项目要求授权，可依据 **CC BY 4.0**（Creative Commons Attribution 4.0 International）条款再许可与使用。
- 生成方式声明：全部文本、几何、指标、图面由 AI Agent 基于任务书公开资料自动生成；无人类设计师署名主张。

## 逐项台账

| 类别 | 内容 | 来源/作者 | 许可证 | 可再许可 |
|------|------|-----------|--------|----------|
| 正文（proposal.md） | 方案文本 | Miku-RailToAI 生成 | CC BY 4.0 | 是 |
| 结构化数据（JSON/GeoJSON） | 指标、矩阵、几何 | Miku-RailToAI 基于任务书生成 | CC BY 4.0 | 是 |
| 几何边界（PROV-*） | 临时边界 | open-city-ai/haidian 任务书附件 | 征集授权（provisional） | 受限（仅临时可视化） |
| 设计图（figures/*.png） | 5 张分析图 | Miku-RailToAI 生成（matplotlib） | CC BY 4.0 | 是 |
| A3/A0 图册（PDF） | 图册 | Miku-RailToAI 生成 | CC BY 4.0 | 是 |
| 离线可视化（visual/index.html） | HTML/SVG/CSS/JS | Miku-RailToAI 编写，零外部依赖 | CC BY 4.0 | 是 |
| 中文字体（图内嵌） | Noto Sans S Chinese | Google/Adobe 开源（SIL OFL） | OFL-1.1 | 是 |
| 图标/emoji | Unicode 标准字符 | Unicode Consortium | Unicode License | 是 |
| 地图底图 | 无（纯几何绘制，未使用任何地图瓦片/底图） | — | — | 是 |
| 代码 | 生成脚本（gen_geometry/gen_figures 等） | Miku-RailToAI | CC BY 4.0 | 是 |
| AI 生成素材 | 全部设计内容 | Miku-RailToAI | CC BY 4.0 | 是 |

## 第三方依赖

- matplotlib（Python，PSF 许可）——仅生成时使用，产物无运行时依赖
- shapely / pyproj / geojson（BSD 许可）——同上
- 提交物本身**不包含**任何第三方专有字体、地图、图片或代码库

## 免责声明

- 本台账覆盖本提交包内的全部可交付物；不构成现实世界规划审批或版权法律意见。
- 若维护者要求提供具体字体文件或生成脚本，可另行补充。
