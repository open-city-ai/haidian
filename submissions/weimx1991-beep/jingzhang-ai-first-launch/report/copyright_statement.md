# 版权与资产权利台账（Asset Rights Ledger）

> 版本：v2（2026-08-27）
> 原则：仅收录权利清晰、可在方案对比包内再分发的资产。团队自产图件与已授权字体如实登记；第三方图像需替换或标注。

## 一、团队自产图件（team_generated_diagram）

| 资产路径 | 作者 | 来源 | 许可 | 再分发 | 状态 |
|---|---|---|---|---|---|
| assets/figures/site-overview.png | 团队（muxing） | fig_core_five.py + geometry/site_boundary.geojson | 内部使用·设计征集 | OK（团队自产） | approved |
| assets/figures/site-overview.en.png | 团队（muxing） | fig_core_five.py 双语版 + geometry/site_boundary.geojson | 内部使用·设计征集 | OK（团队自产） | approved（真英文版已生成） |
| assets/figures/land-use-structure.png | 团队（muxing） | fig_core_five.py + geometry/land_use.geojson | 内部使用 | OK | approved |
| assets/figures/land-use-structure.en.png | 团队（muxing） | fig_core_five.py 双语版 | 内部使用 | OK | approved（真英文版已生成） |
| assets/figures/key-areas.png | 团队（muxing） | fig_core_five.py + geometry/key_areas.geojson | 内部使用 | OK | approved（几何为概念临时边界，非官方红线） |
| assets/figures/key-areas.en.png | 团队（muxing） | fig_core_five.py 双语版 | 内部使用 | OK | approved（真英文版已生成） |
| assets/figures/mobility-bluegreen.png | 团队（muxing） | fig_core_five.py + geometry/roads.geojson + green_space.geojson | 内部使用 | OK | approved |
| assets/figures/mobility-bluegreen.en.png | 团队（muxing） | fig_core_five.py 双语版 | 内部使用 | OK | approved（真英文版已生成） |
| assets/figures/metrics-evidence.png | 团队（muxing） | fig_core_five.py + metrics.json（运行时现算 5.04% / 575,402㎡ / 22.5%） | 内部使用 | OK | approved（数据与 metrics.json 一致） |
| assets/figures/metrics-evidence.en.png | 团队（muxing） | fig_core_five.py 双语版 + metrics.json | 内部使用 | OK | approved（真英文版已生成，数据与 metrics.json 一致） |
| assets/figures-extra/*.png（30 张证据图与场景放大图） | 团队（muxing） | fig_p0_batch_*.py + geometry/*.geojson | 内部使用·设计征集 | OK（团队自产） | approved |
| drawings/a0-boards.pdf | 团队（muxing） | 团队自产排版 | 内部使用 | OK | approved |
| drawings/a0-boards.en.pdf | 团队（muxing） | 团队自产排版 | 内部使用 | OK | approved（language=neutral，与中文版共享声明；后续可提供独立英文版） |
| drawings/a3-booklet.pdf | 团队（muxing） | 团队自产排版 | 内部使用 | OK | approved |
| drawings/a3-booklet.en.pdf | 团队（muxing） | 团队自产排版 | 内部使用 | OK | approved（language=neutral，与中文版共享声明；后续可提供独立英文版） |

## 二、视觉概念图与踏勘照片

| 资产路径 | 类别 | 来源 | 许可 | 再分发 | 状态 |
|---|---|---|---|---|---|
| visual/assets/concept/*.jpg | concept_render（AI 概念图） | 团队设计 + AI 生成（midjourney 等） | 内部使用（团队自有版权） | 受限（不外发） | approved（已按 AI 内容标识要求登记） |
| visual/assets/photos/*.jpg | field_survey_photo | 团队实地踏勘（2026-08，EXIF 可追溯） | 内部使用 | 受限（团队内部使用） | approved（未经拍摄人同意不外发） |
| visual/assets/concept/Elegant_retro_modern_sightseei*.png | ai_generated_concept | AI 生成（DALL-E / Midjourney） | 内部使用 | 受限（AI 生成标识） | approved（无真人、无版权主题） |

## 三、第三方素材与字体

| 资产/来源 | 类型 | 许可 | 需署名 | 状态 |
|---|---|---|---|---|
| OSM 数据 + CartoDB Voyager 底图（嵌入团队图件） | 底图 | OSM 数据 ODbL；CartoDB Voyager 免费层 | 是 | 图内已标注 "CartoDB Voyager + ODbL" |
| 第三方 logo / 商标 / 受版权保护图像 | — | — | — | 未使用（当前提交包未发现） |
| Noto Sans SC（思源黑体） | 开源字体 | SIL OFL 1.1 | 否 | approved（OFL 允许免费嵌入与再分发） |
| Noto Serif SC（思源宋体） | 开源字体 | SIL OFL 1.1 | 否 | approved（OFL 允许免费嵌入与再分发） |

## 四、肖像与 AI 内容披露

- **肖像**：提交包内出现的人物均为团队自有踏勘照或 AI 概念图，无真实第三方肖像；团队内部使用授权（member self-release），不外发。
- **AI 内容**：AI 生成图均已标注（concept_render / ai_generated_concept），未冒充实景；数据图件（fig_core_five.py、fig_p0_batch_*.py）均为团队自产代码 + 团队自有 GeoJSON。

## 五、使用约束

1. 本台账仅说明本提交包内部使用与再分发范围。
2. 公开部署前需完成：第三方资源（OSM / 字体）最终归属标注复核。
3. PROVISIONAL 几何（site_boundary / key_areas / land_use）仅为投稿概念边界，非官方红线，不得作为面积 / 比例 / 容积率审批依据。
4. 24 小时开放等未确认运营条件已改为建议目标；最终以场地主体、运营规则和专业核查为准。
