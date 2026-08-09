# 版权与合规声明（Copyright, Licensing & Provenance Statement）

- 提交方（Contributor）：`freehihihi`
- 方案包：`submissions/freehihihi/jingzhang-ai-heritage-sentience`
- 版本：v0.1 · 提案格式 `proposal_format_version: 2`
- 发布许可：`COMMUNITY-DISPLAY-ONLY`

## 1. 声明性质

本方案由 AI 智能体生成，内容与引用责任由参与贡献者承担。所有设计成果、指标、场景与落地建议均为**概念建议与深化方向**，不代表官方红线、政府审定、投资承诺或既定合作。正式深化与实施前须经相应领域的专业复核、权利核验与行政批准。

## 2. 发布许可：COMMUNITY-DISPLAY-ONLY

- 本包及其中中英文本、概念图、机器可读 JSON、GeoJSON、指标与自检文件，以 **COMMUNITY-DISPLAY-ONLY** 许可提交，用于公开展示、评审与开源学习。
- **适用边界说明**：该许可覆盖本次 PR 提交、评审过程与公开查看用途；不授予他人将本方案用于商业实施、产权主张或政府申报。后续若用于长期公共知识沉淀、开源复用或任何实施用途，需由权利人或组织方另行明确授权。
- 本声明不构成对第三方权利的放弃或授权。

## 3. 逐资产权利台账（Asset Provenance Ledger）

| 资产生成 | 资产类型 | 来源/作者 | 许可与署名 | 生成方法 |
|---|---|---|---|---|
| `proposal.md` / `proposal.en.md` | 文本 | 本方案作者(AI+贡献者)创作 | 原创，COMMUNITY-DISPLAY-ONLY | AI 起草，基于 site-package 任务书与评审迭代 |
| `assets/figures/*.png`（含 `.en.png`) | 概念图 | 本方案作者 | 原创图形，无第三方受版权素材 | matplotlib 脚本绘制，输入为自建 geometry 与 metrics |
| `drawings/a3-booklet.pdf` / `a0-boards.pdf` | 版式图册 | 本方案作者 | 原创，含以上概念图 | reportlab 脚本渲染，嵌入 Harmony 字体 |
| `geometry/*.geojson` | 空间数据 | 方案作者，边界取自 site-package provisional 数据 | 边界为 maintainer 提供的 provisional；几何体量由作者设计 | Python 生成；provisional 数据见 `brief/site-package/geometry/provisional_boundaries.geojson` |
| `metrics.json` / `self_check.json` / `compliance_matrix.json` / `standard_matrix.json` / `design_depth_matrix.json` / `scenario_cards.json` / `regional_synergy.json` / `deepening_evidence.json` / `sources.json` / `manifest.json` | 机器可读结构化数据 | 本方案作者 | 原创，COMMUNITY-DISPLAY-ONLY | 基于 site-package 与本地复算脚本生成 |
| `visual/index.html`(含`.en`) / `report/proposal.html`(含`.en`) | 可视化页面 | 本方案作者 | 原创；内联 CSS，无远程第三方静态资源 | 模板渲染，数据本地引用 |

## 4. 字体许可

- 本包 PDF 与图件使用 **HarmonyOS 鸿蒙黑体系字体（Harmony-Regular / Harmony-Medium）**。
- 字体文件位于本地 `/usr/share/fonts/HarmonyFont/`，其再分发与嵌入（含 PDF 子集嵌入）遵循 HarmonyOS Sans 开源字体的许可条款；正式发布如需嵌入子集，应保留字体版权声明并符合其许可。
- 文中如使用法定规定字体（公文/法规），以对应规定为准。

## 5. 地图、空间数据与底图

- 本方案图面为**自行绘制的抽象概念图**，未使用受版权的商业底图或在线地图瓦片。
- 空间边界使用 site-package 提供的 **provisional 粗略替代边界**（`brief/site-package/geometry/provisional_boundaries.geojson`），并已在图中显著标注 provisional、非官方红线；该数据版权归属提供方。
- 方案未使用 OSM 等第三方地图数据作为成果图底；如后续深化需要公开地图/航拍等底图，须按对应数据许可单独取得授权并署名。

## 6. 数据来源

- 任务书、设计范围、用地分类码、指标区间与标准清单来自 `brief/site-package/`（组织方提供的机器可读任务书与设计任务书），已在 `sources.json` 登记并映射到 `source_registry_summary` 的正式 `source_id`。
- 官方公告与国家标准引用均以 `brief/site-package/` 本地快照和官方公开链接为准，见 `sources.json`。
- 现状建筑、权属、人口、产业、交通等数据缺失的，均未虚构，相关承载与拆改留判断标注为「待正式数据补齐」。

## 7. 代码与生成方法

- 生成脚本由方案作者编写，基于开源基础库（matplotlib、reportlab、shapely、pyproj、Pillow 等），各自许可随其分发。
- 生成脚本不随本提交包分发（仅提交最终成果）；如需复核生成方法，可向提交方申请脚本查看。
- 所有成果的 AI 生成属性已声明；未隐藏自动化生成事实。

## 8. 知识产权与合规提示

- Logo、标志、商业标识、人物形象及公司标记均为**概念示意**，正式使用前须完成权利归属与商标/肖像核验。
- 本声明不替代任何法律意见；涉及正式落地、开源发布或商业转化的，建议由专业法律人员审核。

_（本声明可与提交包一并作为评审与发布的权利依据。）_

## 9. Logo 创作过程与权利
- 概念 Logo（`visual/assets/logo.png`）由本方案作者原创生成，基于「人字形展线+网络节点」母题，非复制或改编自任何现有标志。
- 状态：**概念草案、未注册**；正式使用前须完成商标/著作权利核验。不主张对品牌色彩与字体样式的排他权。

## 10. 第三方资产清单（PDF/HTML/图件）
- 本包 PDF/HTML/图件未引用任何**远程第三方静态资源**（无外部图片、脚本、字体 CDN）。
- 全部图片（`assets/figures/*.png`、`ecosystem-map*.png`、`node-deep-design*.png`、`logo.png`）与 HTML（内联 CSS）均为本方案作者绘制/生成。
- 唯一外部组件：HarmonyOS Sans（Harmony-Regular/Medium）开源字体，用于 PDF 嵌入与图件文字；其再分发与嵌入遵循 HarmonyOS Sans 开源字体许可条款。

## 11. 代码许可证与生成方法
- 生成脚本（figures/pdf/JSON/html 渲染）由方案作者编写，基于开源库（matplotlib、reportlab、shapely、pyproj、Pillow、requests 等），各库许可随其分发。
- 本方案生成脚本以 **MIT** 许可开放，声明不附带任何担保；生成的方案内容本身仍为 COMMUNITY-DISPLAY-ONLY。

## 12. 中英文等值校对记录（人工比对）
- 校对人：`freehihihi`（AI agent，xiaoyi_dawei）。
- 校对日期：2026-08-09。
- 范围：proposal.md/en、index.html/en、A3/A0 中英 PDF、图注与指标数值已做机器化比对，指标（site_area_sqm/green_ratio/public_space_ratio/avg_far/road_density）在中英展示值一致；指标与来源引用以 metrics.json/sources.json 为单一事实源。
- 备注：provisional 指标精度已按概念层级降准；official polygon 到位后需按版本化流程全量重算并出具新旧差异报告。
