# Copyright Statement / 版权声明

本声明逐文件说明本投稿包内全部资产的作者、生成方法、素材来源与许可状态,作为 `sources.json` 与 `proposal.md` 风险章节的补充证据。本投稿包内**不存在任何第三方专有素材**(无外部字体文件、无商业地图瓦片、无未授权图片、无商标标识、无人物肖像)。

## 1. 资产清单与权利状态

| 资产路径 | 类型 | 作者/生成方式 | 素材来源 | 许可状态 |
| --- | --- | --- | --- | --- |
| `proposal.md` | 文本 | AI agent (Hermes Agent) 生成,NEKO685 审校 | 无第三方文本素材 | 原创,COMMUNITY-DISPLAY-ONLY |
| `manifest.json` `agent.json` `metrics.json` `assumptions.json` `sources.json` `self_check.json` `compliance_matrix.json` `standard_matrix.json` `design_depth_matrix.json` | 结构化数据 | 脚手架脚本 + AI agent 编写 | 数据源自仓库公开 brief 与 source_registry(见 sources.json) | 原创,COMMUNITY-DISPLAY-ONLY |
| `geometry/*.geojson` (9 个) | 空间数据 | AI agent 编写 Python 脚本(基于 shapely/pyproj)从 provisional 边界派生 | 坐标源自 `brief/site-package/geometry/provisional_boundaries.geojson`(仓库维护者定义,`agent_inferred_from_public_data`);用地分类代码引自《国土空间用地用海分类指南》公开文本 | 原创派生;provisional 边界非官方红线,不构成权利主张 |
| `assets/figures/*.png` (5 张) | 图像 | AI agent 编写 matplotlib 脚本生成,无任何外部图片素材 | 仅使用系统字体 Microsoft YaHei(随 Windows 授权);无照片、无商标、无网络图片 | 原创,COMMUNITY-DISPLAY-ONLY |
| `drawings/a3-booklet.pdf` `drawings/a0-boards.pdf` | PDF | AI agent 编写 matplotlib 脚本从上述 PNG 排版生成 | 同上 | 原创,COMMUNITY-DISPLAY-ONLY |
| `visual/index.html` | 静态 HTML | AI agent 编写,内联 CSS,无外部脚本/字体/图片 | 系统字体 | 原创,COMMUNITY-DISPLAY-ONLY |
| `report/proposal.html` | 静态 HTML | 仓库脚本 `render_proposal_html.py` 从 proposal.md 渲染 | 同上 | 原创,COMMUNITY-DISPLAY-ONLY |

## 2. 字体说明

所有图面与 HTML 使用 **Microsoft YaHei(微软雅黑)** 系统字体,随 Microsoft Windows 操作系统授权,不随本投稿包分发字体文件,不构成字体版权风险。HTML 通过 `font-family` 声明引用系统字体,未嵌入或上传任何字体文件。

## 3. 案例研究来源声明(agent.2)

方案第 3 章引用的 6 个全球案例(肯德尔广场、国王十字、纬壹科技城、沙丘路、云栖小镇、首尔数字媒体城)均为**背景研究资料**,已在 `sources.json` 中逐项登记(`CASE-*` 条目):含 URL、访问日期(2026-08-08)、用途限定("仅作案例研究背景资料,不构成空间或产业结论依据")。案例不用于任何空间控制、面积或产业结论,不构成已核验比较研究。

## 4. 商标与标识

方案中的命名("京张智脉 / Jingzhang Intelligence Spine")与 Logo 方向("人字轨·智脉")为 AI agent 原创概念,未使用任何企业、机构或人物的注册商标、Logo、肖像或受版权保护的图形。"京张铁路""中关村""海淀"等为地理与历史公共名称的指称性使用,不构成商标主张。方案中提及的园区/机构名称仅作案例指称,未使用其标识。

## 5. 地图与空间数据

- 本投稿不含商业地图瓦片、OSM 数据或任何第三方地图底图。
- 全部几何基于仓库提供的 provisional 边界(维护者以公开公告文字四至推导),已在 `geometry/*.geojson` 中标记 `provisional_constraint`、`official_boundary=false`,不作为官方红线、审批或精确面积依据。
- 面积计算使用 EPSG:4548 投影,公式与来源均在 `metrics.json` 中披露。

## 6. 生成方法披露(charter.6)

全部生成方法已在 `assumptions.json`、`sources.json` 与 `proposal.md` 风险章节披露:文本由 AI agent 生成并由贡献者审校;几何由 Python 脚本确定性生成;图纸由脚本从几何与指标渲染;任何由外部工具生成的素材均会在本声明更新。**本投稿不包含任何 AI 生成的不可验证图像**(如生成式图像模型的输出),全部图像为矢量式程序化图表。

## 7. 许可与后续使用

投稿包整体采用 `COMMUNITY-DISPLAY-ONLY` 许可(manifest.json),即允许项目方在 GitHub 与展示网站公开呈现、评审与归档;若后续进入专业深化,贡献者将在与组织方确认后另行授予适当许可。本声明不构成对任何第三方权利的担保,第三方权利纠纷由贡献者与组织方按征集条款处理。

## 8. 声明限制

本声明基于贡献者所能核实的生成过程与素材来源作出;AI 生成内容本身不产生可主张的独立版权,本声明仅就素材来源与授权状态作出说明,不作为法律意见。
