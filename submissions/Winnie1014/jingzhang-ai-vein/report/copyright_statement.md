# Copyright Statement

本声明说明本投稿包内自生成内容、字体、图标/素材、软件依赖与构建工具的来源、版本、许可证、是否随包再分发及使用限制。本投稿包不随包再分发任何第三方字体、图标、素材或依赖库；所有图形、图件与 HTML 均为提交时本地生成。

## 1. 自生成内容

- 投稿包内的 `proposal.md` / `proposal.en.md`、全部 JSON/GeoJSON 结构化数据、`visual/index.html` / `visual/index.en.html`、`assets/figures/*.png`、`drawings/*.pdf`、`report/*.html` 均由声明于 `agent.json` 的 AI agent（ZCode GLM Plus，模型 GLM-Plus）在本仓库工具链下生成，或以已登记公开/清权资料为依据整理。
- 正文中的中文为原创表述；英文版为同一方案的中文等义译文，术语优先采用 `docs/terminology-glossary.md` 的赛事推荐译法。
- 所有图件均为程序化绘制（PIL / ReportLab），不包含外部图片、地图截图或未清权素材；几何数据以本包 `geometry/*.geojson` 为唯一来源。
- 生成与校验过程记录于 `self_check.json` 与 `manifest.json`；最终哈希由工具重生成，未手工编辑。

## 2. 字体

本投稿包**不随包分发任何字体文件**。图形与 PDF 在生成时使用本机系统字体：

| 用途 | 字体 | 来源 | 许可/使用限制 |
| --- | --- | --- | --- |
| 中文图件/PDF | Hiragino Sans GB（`/System/Library/Fonts/Hiragino Sans GB.ttc`） | Apple macOS 系统字体 | 随 macOS 授权使用；不随包再分发 |
| 中文备用 | STHeiti（`/System/Library/Fonts/STHeiti Medium.ttc`、`STHeiti Light.ttc`） | Apple macOS 系统字体 | 随 macOS 授权使用；不随包再分发 |
| 中文字体备用 | Songti（`/System/Library/Fonts/Songti.ttc`） | Apple macOS 系统字体 | 随 macOS 授权使用；不随包再分发 |
| 英文图件/PDF | Helvetica / Helvetica Neue | Apple macOS 系统字体 | 随 macOS 授权使用；不随包再分发 |

本包生成的字体不嵌入 PDF；PDF 仅依赖阅读端系统字体。由于未再分发字体文件，不涉及第三方字体再许可问题。若评审端在缺少上述字体的系统上打开 PDF，可能以替代字体渲染，属于阅读环境差异，不影响内容本身。

## 3. 图标与素材

- 图件与 HTML 中的图标、符号、示意图均为**程序化绘制的原创矢量/位图**，不使用任何第三方图标库、素材库或照片。
- 未使用任何人物肖像、企业标识、商标、论文图像或受版权保护的地图底图。
- 图件中出现的站名、道路名与片区名称仅作为公开文字信息的标注，不复制任何受版权保护的图面。

## 4. 软件依赖与构建工具

本投稿包的生成与校验使用以下软件；它们**不随包再分发**，仅为构建环境依赖：

| 名称 | 版本（生成时） | 来源 | 许可证 | 用途 |
| --- | --- | --- | --- | --- |
| Python | 3.14 | python.org / Homebrew | PSF License | 脚本解释器 |
| Pillow | 12.x | PyPI | HPND（MIT 兼容） | 图件位图渲染 |
| ReportLab | 5.x | PyPI | BSD-3-Clause | A3/A0 PDF 排版 |
| Shapely | 2.x | PyPI | BSD-3-Clause | 几何计算与拓扑校验 |
| pyproj | 3.x | PyPI | MIT | EPSG:4326↔EPSG:4548 坐标变换与面积复算 |
| jsonschema | 4.x | PyPI | MIT | JSON schema 校验 |

仓库内校验与渲染脚本（`scripts/render_proposal_html.py`、`scripts/finalize_submission.py`、`scripts/self_check_submission.py`、`scripts/participant_preflight.py` 等）由开源征集仓库提供，版权归其作者，使用遵循仓库许可证。

## 5. 引用资料的许可边界

- 正文引用并登记于 `sources.json` 的公开资料（资格预审公告、任务书摘录、国家标准、政府页面、案例机构官网）均仅在各自允许用途内引用公开事实，不复制受版权保护的作品，不随包再分发原文。
- 全球案例仅引用机构官网公开的事实性信息作为机制背景与转化解读，不构成对案例机构的任何授权使用或背书。
- 本投稿包整体采用 front matter 声明的 `COMMUNITY-DISPLAY-ONLY` 许可参与展示；除声明许可外，不授予任何第三方复制或商业使用权利。

## 6. 明确声明

本方案**不笼统声称“全部已清权”**。可确认的是：所有图件、文本、数据结构为提交时本地原创生成，未引入外部受版权素材；引用的第三方公开资料均在各自允许用途内使用并在 `sources.json` 逐条登记发布者、日期、许可与使用限制；字体与软件依赖不随包再分发。任何后续引入的外部素材、字体或依赖，须先完成许可确认并同步登记到 `sources.json` / 本声明后再提交。
