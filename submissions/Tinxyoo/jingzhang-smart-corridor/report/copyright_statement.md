# Copyright Statement — 京张智脉·AI创新走廊

本投稿包（submissions/Tinxyoo/jingzhang-smart-corridor/）由声明 AI agent（DeepSeek-V4-Flash 正式版，agent_id=Tinxyoo）生成，所有文字、结构化数据、GeoJSON 几何、SVG 图件、HTML/CSS 代码、PDF 图册及可视化页面均由该 agent 生成或使用已登记公开/清权资料。本声明逐项记录资产类别、来源、许可和授权状态。

## 1. 文字资产

| 资产 | 路径 | 作者/生成者 | 许可/授权状态 |
| --- | --- | --- | --- |
| 中文方案正文 | proposal.md | DeepSeek-V4-Flash (Tinxyoo) | COMMUNITY-DISPLAY-ONLY，按仓库 LICENSE 投稿 |
| 英文方案正文 | proposal.en.md | DeepSeek-V4-Flash (Tinxyoo) | 同上，translation_of=proposal.md |
| 报告叙述 | report/narrative.md | DeepSeek-V4-Flash (Tinxyoo) | 同上 |
| 离线 HTML 报告 | report/proposal.html, report/proposal.en.html | 由 scripts/render_proposal_html.py 从 proposal.md/proposal.en.md 自动渲染 | 同上 |
| 可视化页面 | visual/index.html, visual/index.en.html | DeepSeek-V4-Flash (Tinxyoo) 手写 SVG/CSS/HTML | 同上 |
| 版权声明 | report/copyright_statement.md | DeepSeek-V4-Flash (Tinxyoo) | 同上 |

所有正文内容引用公开公告、任务书和已登记资料的，已在 sources.json 登记来源 ID；引用 docs/terminology-glossary.md 推荐译法的，遵循赛事术语表。

## 2. 字体

| 字体族 | 用途 | 来源 | 许可 |
| --- | --- | --- | --- |
| -apple-system, BlinkMacSystemFont | HTML 报告和可视化页面系统字体栈 | 操作系统内置 | 各操作系统厂商授权，无远程加载 |
| "PingFang SC", "Microsoft YaHei", "Noto Sans CJK SC" | 中文 fallback 字体栈 | 操作系统内置 | 各字体厂商授权，无远程加载 |
| "Helvetica Neue", Arial, sans-serif | 英文 fallback 字体栈 | 操作系统内置 | 同上 |
| ui-monospace, SFMono-Regular, Menlo | 代码与等宽文本 | 操作系统内置 | 同上 |

**未使用任何远程字体、@font-face、CDN 字体或 Google Fonts。** 所有字体均为评审者操作系统自带字体，HTML 离线可打开。

## 3. 图件与图标

| 资产 | 路径 | 生成方式 | 许可/授权状态 |
| --- | --- | --- | --- |
| 5 张中文核心图件 | assets/figures/site-overview.png, land-use-structure.png, key-areas.png, mobility-bluegreen.png, metrics-evidence.png | 由 DeepSeek-V4-Flash (Tinxyoo) 用 Python matplotlib + svgwrite 生成 | COMMUNITY-DISPLAY-ONLY；图内数据派生自 provisional geometry，非官方图纸 |
| 5 张英文图件 | assets/figures/*.en.png | 同上，英文标签版 | 同上 |
| SVG 总览图 | visual/index.html 内嵌 SVG | DeepSeek-V4-Flash (Tinxyoo) 手写 | COMMUNITY-DISPLAY-ONLY |
| PDF A3 文册 | drawings/a3-booklet.pdf, a3-booklet.en.pdf | 由 DeepSeek-V4-Flash (Tinxyoo) 用 ReportLab/weasyprint 生成 | COMMUNITY-DISPLAY-ONLY |
| PDF A0 展板 | drawings/a0-boards.pdf, a0-boards.en.pdf | 同上 | 同上 |

**未使用任何外部图标库（如 FontAwesome、Material Icons）、未引用任何远程图片、未使用未授权的摄影或插画。** 所有图件为程序生成或手写 SVG。

## 4. 地图与空间数据

| 资产 | 来源 | 许可/授权状态 |
| --- | --- | --- |
| geometry/site_boundary.geojson | brief/site-package/geometry/provisional_boundaries.geojson（agent_inferred_from_public_data） | provisional_only，已登记为 sources.json BOUNDARY-SOURCE；非官方红线 |
| geometry/key_areas.geojson | 同上 | 同上，已登记为 KEY-AREA-SOURCE |
| geometry/land_use.geojson, buildings.geojson, roads.geojson, green_space.geojson, public_space.geojson, phasing.geojson, constraints.geojson | DeepSeek-V4-Flash (Tinxyoo) 基于公开任务书和 provisional 边界生成的概念图层 | COMMUNITY-DISPLAY-ONLY；待官方边界发布后重算 |

**未使用 OpenStreetMap、Google Maps、Baidu Maps、商业地图瓦片或任何远程地图服务。** HTML 页面未加载任何远程地图瓦片、tile server 或 iframe。

## 5. 代码依赖

| 依赖 | 用途 | 来源 | 许可 |
| --- | --- | --- | --- |
| Python 3 | 数据处理与图件生成 | 标准运行时 | PSF License |
| matplotlib | PNG 图件生成 | https://matplotlib.org/ | Matplotlib License (BSD-based) |
| svgwrite | SVG 图件生成 | https://pypi.org/project/svgwrite/ | MIT License |
| ReportLab / weasyprint | PDF 生成 | 各自项目 | BSD / BSD-style |
| scripts/render_proposal_html.py | 渲染 proposal.md → HTML | 仓库内置脚本 | 仓库 LICENSE |

HTML 文件未引用任何 JavaScript 库、外部 CSS、CDN 或远程脚本。所有样式为内联 `<style>` 标签。

## 6. AI 生成资产披露

| 资产类别 | 生成工具/模型 | 生成方式 | 复用边界 |
| --- | --- | --- | --- |
| 方案正文（中文/英文） | DeepSeek-V4-Flash 正式版 | 一次性生成 + 评审反馈迭代 | 仅用于本投稿；不用于其他商业项目 |
| 结构化 JSON（manifest/metrics/assumptions/sources/compliance_matrix/standard_matrix/design_depth_matrix/self_check/agent） | DeepSeek-V4-Flash 正式版 | 基于 brief/site-package 模板生成 | 同上 |
| GeoJSON 图层 | DeepSeek-V4-Flash 正式版 | 基于 provisional 边界生成 | 同上 |
| SVG 图件（visual/index.html 内嵌） | DeepSeek-V4-Flash 正式版 | 手写 SVG 代码 | 同上 |
| PNG 图件 | DeepSeek-V4-Flash 正式版 + matplotlib/svgwrite | 程序生成 | 同上 |
| PDF 图册 | DeepSeek-V4-Flash 正式版 + ReportLab/weasyprint | 程序生成 | 同上 |

**所有 AI 生成内容作者（Tinxyoo）对事实、引用、版权和最终表达负责。** 未使用任何未授权的训练数据声明、未复制任何第三方受版权保护的城市设计方案、未声称使用或披露非公开规划图件。

## 7. 引用与第三方资料

所有外部引用资料已在 sources.json 登记来源 ID、路径/URL、source_type 和用途边界。主要引用：

- OFFICIAL-ANNOUNCEMENT: 北京市规划和自然资源委员会海淀分局《百年京张AI创新带城市设计国际方案征集资格预审公告》
- AGENT-TASKBOOK: brief/site-package/agent_taskbook.json
- SITE-PACKAGE: brief/site-package/ 全部公开任务书资料
- SOURCE-REGISTRY: data/source_registry.json 公开资料登记表
- PROCESSED-FACT-PACK: data/processed/agent_fact_pack.md 导航层
- BOUNDARY-SOURCE / KEY-AREA-SOURCE: provisional_boundaries.geojson（agent_inferred_from_public_data，provisional_only）

**未引用任何非公开规划图件、非公开空间数据、内部控制指标或未授权资料。** 涉及建设强度、建筑高度、道路线位等内容时，均标注为待确认条件，未伪装为官方审定结论。

## 8. 署名与展示授权

- 作者 GitHub ID: Tinxyoo
- Agent 名称: DeepSeek-V4-Flash (正式版)
- 投稿 slug: jingzhang-smart-corridor
- 展示授权: 按仓库 LICENSE 和 COMMUNITY-DISPLAY-ONLY 授权 open-city.ai 在 GitHub 和项目展示网站公开展示
- 永久纪念体系: 如入选，同意以 GitHub Name (Tinxyoo) 和 Agent 名称 (DeepSeek-V4-Flash) 纳入永久纪念体系
