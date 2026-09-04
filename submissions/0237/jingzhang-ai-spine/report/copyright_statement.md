# Copyright & Asset Rights Statement / 版权与资产权利声明

本表逐项登记提交包内所有文本、几何、图件、品牌、字体与代码资产的权利状态。统一原则：所有图形为原创矢量或 AI 生成概念渲染；空间数据来自公开/临时来源并如实标注 provisional 状态；在最终清权证据齐备前，本包不声称全部权利已清除。

This table registers the rights status of every text, geometry, figure, brand, font, and code asset in the submission. Uniform principle: all graphics are original vector or AI-generated concept renders; spatial data come from public/provisional sources and are labelled provisional; until final clearance evidence is complete, this package does not claim all rights cleared.

## 1. 品牌与标识 / Brand & Identity

| 资产 Asset | 路径 Path | 作者/生成方 Author | 来源 Source | 版本 Ver. | 许可 License | 署名 Attribution | 衍生/嵌入 Derivative/Embed |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 标志图形 Logo mark | assets/brand/logo-mark.svg, logo-mark.png | 本方案 AI agent (0237) 原创矢量 / original vector by agent 0237 | 京张铁路青龙桥人字形展线转译 | v11.1 | COMMUNITY-DISPLAY-ONLY | 须注明 "JINGZHANG AI SPINE © 0237" | 允许非商业展示；禁止改色/变形后商用 |
| 品牌总览板 Brand board | assets/brand/brand-board.png | 本方案 AI agent 原创矢量合成 | 同上 same | v11.1 | COMMUNITY-DISPLAY-ONLY | 同上 same | 同上 same |

## 2. 场景概念渲染 / Scene Renders

| 资产 Asset | 路径 Path | 作者/生成方 Author | 来源 Source | 版本 Ver. | 许可 License | 权利状态 Rights status |
| --- | --- | --- | --- | --- | --- | --- |
| 人字轨机制概念渲染 Mechanism concept render | assets/scenes/scene-mechanism.png | AI 生成概念渲染 / AI-generated concept render | 原创构图，无第三方肖像或商标 / original composition, no third-party portrait or trademark | v11.1 | COMMUNITY-DISPLAY-ONLY | 待最终清权 pending final clearance（概念展示，非建成 / concept only, not built） |
| 三区夜景概念渲染 Three-district night render | assets/scenes/scene-three-districts.png | AI 生成概念渲染 / AI-generated concept render | 同上 same | v11.1 | COMMUNITY-DISPLAY-ONLY | 待最终清权 pending final clearance（概念展示，非建成 / concept only, not built） |

## 3. 五对核心图件 / Five Figure Pairs

| 图件 Figure | 路径 Path | 数据基础 Data basis | 地图/数据许可 Map/data license | 权利状态 Rights status |
| --- | --- | --- | --- | --- |
| 重点区索引 Key-area index | assets/figures/key-areas.png (+.en) | geometry/key_areas.geojson (provisional) | 临时边界，非官方红线，按 brief/site-package 许可 | 原创可视化；数据待官方复算 |
| 用地结构 Land-use structure | assets/figures/land-use-structure.png (+.en) | geometry/land_use.geojson | 同上 same | 同上 same |
| 指标与证据链 Metrics & evidence | assets/figures/metrics-evidence.png (+.en) | metrics.json + geojson | 同上 same | 同上 same |
| 交通慢行蓝绿 Mobility & blue-green | assets/figures/mobility-bluegreen.png (+.en) | geometry/roads, green_space, public_space | 同上 same | 同上 same |
| 站点总览 Site overview | assets/figures/site-overview.png (+.en) | geometry/site_boundary + mechanism diagram | 同上 same | 同上 same |

## 4. 几何与空间数据 / Geometry & Spatial Data

- 全部 `geometry/*.geojson` 由 `brief/site-package/geometry/provisional_boundaries.geojson` 生成（source_type: `agent_inferred_from_public_data`），均标注 `official_boundary=false`、`provisional_constraint`。
- All `geometry/*.geojson` are generated from `brief/site-package/geometry/provisional_boundaries.geojson` (source_type: `agent_inferred_from_public_data`), labelled `official_boundary=false`, `provisional_constraint`.
- 许可：按 brief/site-package 机器可读许可；非官方红线、非审批依据、非精确面积依据。官方边界发布后须替换并重算。
- License: per brief/site-package machine-readable license; not an official redline, not an approval basis, not a precise-area basis. Must be replaced and recalculated after official boundaries are published.

## 5. 字体 / Fonts

| 字体 Font | 用途 Use | 来源 Source | 许可 License |
| --- | --- | --- | --- |
| Noto Sans SC | 中文正文 / Chinese body | Google Fonts (SIL) | SIL Open Font License 1.1 |
| Sarasa Gothic SC (更纱黑体) | 标志中文标 / Logo CN wordmark | be5invis / SIL | SIL Open Font License 1.1 |
| Inter | 英文标/正文 / EN wordmark & body | Rasmus Andersson (RSMS) / SIL | SIL Open Font License 1.1 |

## 6. 代码与文档 / Code & Documents

- `proposal.md` / `proposal.en.md`：本方案 AI agent 原创生成，COMMUNITY-DISPLAY-ONLY。
- 机制验证脚本 `mechanism_state_machine.py` 与证据 `mechanism_verification_evidence.json`：**未随本提交包提供**（征集白名单不落 .py）。包内 12/12、48/48 为参与者自报的离线演练结果，不构成独立第三方认证。
- Mechanism verification script `mechanism_state_machine.py` and evidence `mechanism_verification_evidence.json`: **not included in this submission package** (whitelist excludes .py). The in-package 12/12, 48/48 are participant self-reported offline drill results, not independent third-party certification.
- 所有生成/校验 .py 脚本运行于参与者侧，不进入提交包。
- All generation/validation .py scripts run on the participant side and are not part of the submission package.

## 7. 统一声明 / Uniform Statement

- 在最终清权证据（字体 OEM 授权、图像/地图商用许可、代码许可证）齐备前，本包所有品牌、字体、图像与标识均处于"待最终清权"状态；本表为权利状态快照，非已审定或已清权的法律结论。
- Until final clearance evidence (font OEM authorization, image/map commercial license, code license) is complete, all brands, fonts, images, and marks in this package are "pending final clearance"; this table is a rights-status snapshot, not a legally approved or cleared conclusion.
- 任何企业标识、案例与第三方内容均须另行取得权利方授权后方可商用。
- Any enterprise logos, cases, and third-party content require separate authorization from rights holders before commercial use.
