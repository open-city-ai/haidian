# 版权与生成声明

## 一、总述

本方案正文、双语翻译、数据图、概念剖面与场景插画、离线 HTML 和图纸版式由 Codex GPT-5.1 于 2026-08-12 生成初版；2026-08-13 的视觉体系重绘（全部数据图、剖面与场景插画）、离线 HTML 重做、图纸版式重排与叙事修订由 Kimi Code 在人工指导下完成。规划关系图从本包 GeoJSON 与 metrics 派生；场景插画为本地程序化原创表达，仅说明未来试点可能的空间使用，不构成现场影像、公众意见、建筑方案批准或建成承诺。基础事实仅来自 `sources.json` 所列公开或用户清权材料；未使用秘密地图、商业地图截图、第三方图片、企业标识或未经授权字体。

以下清单按资产类别逐项登记作者、工具、来源与许可，并给出可独立复核的核验方式。包内资产均已在 `manifest.json` 登记 sha256 哈希，评审方可按哈希复核文件与本声明所涉内容的一致性。

## 二、逐资产版权清单

### 1. 数据图件 PNG（assets/figures/，共 12 张：中文 6 张 + 英文 6 张）

| 资产 | 类型 | 作者与工具 | 来源与许可 | 可核验方式 |
| --- | --- | --- | --- | --- |
| `site-overview.png` / `site-overview.en.png` | 场地总览图 | AI 生成（Kimi Code 视觉体系，2026-08-13），本地脚本 `fig01_site_overview.py` 程序化绘制 | 原创图件；几何取自本包 `geometry/*.geojson`，无底图数据 | 见下方工具链说明与统一核验方式 |
| `land-use-structure.png` / `land-use-structure.en.png` | 用地结构图 | 同上，`fig02_land_use_structure.py` | 同上 | 同上 |
| `key-areas.png` / `key-areas.en.png` | 重点片区图 | 同上，`fig03_key_areas.py` | 同上 | 同上 |
| `slow-variable-section.png` / `slow-variable-section.en.png` | 概念剖面图 | 同上，`fig04_slow_variable_section.py` | 纯自绘剖面，无地理底图 | 同上 |
| `mobility-bluegreen.png` / `mobility-bluegreen.en.png` | 出行与蓝绿系统图 | 同上，`fig05_mobility_bluegreen.py` | 图中"淡化底图"为本包自绘 `land_use` 几何，非外部底图 | 同上 |
| `metrics-evidence.png` / `metrics-evidence.en.png` | 指标证据图 | 同上，`fig06_metrics_evidence.py` | 数据取自本包 `metrics.json` | 同上 |

工具链与统一核验方式：全部图件由本地 matplotlib 脚本（`fig01`–`fig06` 及公共模块 `jzmap.py`、`style.py`）程序化生成，坐标经 EPSG:4326→EPSG:4548 投影（pyproj）。脚本不随包分发，生成脚本与参数记录由作者留存、随包备查，应评审要求可提供复核（对应关系详见第五节）。脚本 import 语句可复核：未导入 openstreetmap、contextily、cartopy 或任何瓦片/底图库，即全部地图为无底图、几何来自本包自绘 GeoJSON 的原创表达，不涉及 © OpenStreetMap contributors 署名义务。图内文字使用 macOS 系统字体 Songti SC / PingFang SC / Menlo 渲染（Apple 系统字体随 macOS 许可使用，不单独再分发字体文件，详见第 7 节）。各文件哈希见 `manifest.json`。

### 2. 图纸 PDF（drawings/，共 4 份）

| 资产 | 类型 | 作者与工具 | 来源与许可 | 可核验方式 |
| --- | --- | --- | --- | --- |
| `a0-boards.pdf` / `a0-boards.en.pdf` | A0 横版展板（各 2 页） | AI 生成，本地脚本 `make_drawings.py`（matplotlib PdfPages + Pillow）程序化排版 | 原创版式；内容内嵌第 1 节 12 张 PNG，文本以 macOS 系统字体渲染嵌入 | 脚本可复核；文件哈希见 `manifest.json` |
| `a3-booklet.pdf` / `a3-booklet.en.pdf` | A3 横版图册（各 6 页） | 同上 | 同上 | 同上 |

### 3. 离线 HTML（共 4 份）

| 资产 | 类型 | 作者与工具 | 来源与许可 | 可核验方式 |
| --- | --- | --- | --- | --- |
| `visual/index.html` / `visual/index.en.html` | 沉浸式叙事页（中/英） | AI 生成并人工指导修订；纯内联 CSS，无构建依赖 | 原创代码与文案；仅按相对路径引用本包 PNG；无外部资源 | `grep` 可复核：无 `<script>`、无 `<link>`、无 http(s) 外部引用；哈希见 `manifest.json` |
| `report/proposal.html` / `report/proposal.en.html` | 方案书排版页（中/英） | 同上 | 同上 | 同上 |

字体说明：四份 HTML 均已内嵌 Noto Sans SC 子集字体（SIL Open Font License 1.1，来自 notofonts/noto-cjk 开源项目），由本地脚本 `embed_font.py` 以 pyftsubset 生成 woff2 子集并 base64 内嵌为 `@font-face`（字体名 `JZ Noto Sans SC`）；子集只含各页面实际用字与可打印 ASCII，未携带完整字库。OFL 1.1 允许子集化与文档嵌入，该内嵌符合许可条款；子集化流程与复核方式详见第 7 节与第五节。

### 4. 正文与数据文本

| 资产 | 类型 | 作者与工具 | 来源与许可 | 可核验方式 |
| --- | --- | --- | --- | --- |
| `proposal.md` / `proposal.en.md` | 方案正文（中/英） | AI 辅助生成：Codex GPT-5.1 初版（2026-08-12）+ Kimi Code 叙事修订（2026-08-13），全程人工指导 | 原创文本；事实性内容仅引自 `sources.json` 登记来源 | 哈希见 `manifest.json`；来源逐条对应 `sources.json` |
| `report/narrative.md` | 叙事说明 | 同上 | 同上 | 同上 |
| `metrics.json`、`agent.json` 及各矩阵 JSON | 指标与元数据 | AI 生成，人工复核 | 原创结构化数据 | 哈希见 `manifest.json` |

### 5. 空间几何 GeoJSON（geometry/，共 9 份）

| 资产 | 类型 | 作者与工具 | 来源与许可 | 可核验方式 |
| --- | --- | --- | --- | --- |
| `site_boundary`、`land_use`、`roads`、`green_space`、`public_space`、`key_areas`、`buildings`、`constraints`、`phasing`（各 `.geojson`） | 概念设计几何图层 | AI 生成自绘几何（provisional 状态） | 非官方数据；`sources.json` 登记为 `agent_inferred_from_public_data`（源自 site-package 的 `provisional_boundaries.geojson`），沿用 `assumptions.json` A-CONTROLS-001 口径：法定使用前须由专业人士对照官方附件确认 | 来源与状态见 `sources.json` BOUNDARY-SOURCE / KEY-AREA-SOURCE 及 `assumptions.json`；哈希见 `manifest.json` |

### 6. 数据与来源登记（署名方式）

| 资产 | 类型 | 作者与工具 | 来源与许可 | 可核验方式 |
| --- | --- | --- | --- | --- |
| `sources.json` | 来源登记（20 条） | 人工与 AI 共同登记 | 逐条登记官方公开（official_public）、公开新闻（news_public）、用户清权（user_provided_cleared）与仓库登记来源，含 URL、类型与用途；背景事实按 `assumptions.json` A-LOCAL-FACTS-002 仅作叙事用途，不进入正式证据层 | 登记本身即署名；各 URL 可公开访问复核 |
| `assumptions.json` | 假设与状态登记 | 同上 | 标明待专业确认项与背景专用项 | 同上 |

### 7. 字体许可

| 字体 | 用途 | 许可 | 合规要点 | 可核验方式 |
| --- | --- | --- | --- | --- |
| Songti SC、PingFang SC、Menlo | 图件 PNG 与图纸 PDF 的文字渲染；HTML 系统字体栈 | Apple 系统字体，随 macOS 软件许可使用 | 仅用于在本机生成图件与嵌入 PDF，不复制、不再分发字体文件 | 绘图脚本与 HTML 的 font-family 声明可复核；包内无任何字体文件（无 *.ttf/*.otf/*.woff*） |
| Noto Sans SC（子集） | 四份 HTML 内嵌显示字体 | SIL Open Font License 1.1（notofonts/noto-cjk 开源项目） | OFL 1.1 明确允许子集化与文档内嵌入；仅嵌入字形子集，随 HTML 一同分发符合条款 | 字体来源项目公开可查；四份 HTML 中可 grep 到 `@font-face` 与 `embed-font:JZ Noto Sans SC:start/end` 标记块，可核对子集声明；包内无独立字体文件 |

### 8. 代码依赖许可

| 依赖 | 用途 | 许可 | 可核验方式 |
| --- | --- | --- | --- |
| matplotlib | 图件绘制与 PDF 排版 | PSF 风格许可（matplotlib license） | `style.py`、`make_drawings.py` 等脚本 import 语句（脚本随包备查） |
| numpy | 数值计算 | BSD（BSD-3-Clause） | 同上 |
| Pillow（PIL） | PNG 读取与 PDF 拼版 | HPND（Historical Permission Notice and Disclaimer） | `make_drawings.py:17` `from PIL import Image` |
| pyproj | EPSG:4326→4548 坐标投影 | MIT | `style.py:150` `from pyproj import Transformer` |
| shapely | 几何处理（生成工具链登记组成） | BSD（BSD-3-Clause） | 项目工具链登记；许可证文本见其官方开源仓库 |
| pypdf | PDF 处理（生成工具链登记组成） | BSD（BSD-3-Clause） | 同上 |
| reportlab | PDF 生成（生成工具链登记组成） | BSD | 同上 |

说明：matplotlib、numpy、Pillow、pyproj 为当前绘图/排版脚本直接导入的依赖，可按上表逐行核验；shapely、pypdf、reportlab 为项目登记的生成工具链组成，许可类型以各项目官方仓库的许可证文件为准。本表仅登记许可类型，不转载许可证全文。

## 三、排除项声明

本投稿包不包含：现场照片或任何摄影影像；第三方图片、插画或图标素材；人物肖像；企业标识或商标图形；商业地图截图或在线底图瓦片；涉密数据或个人隐私数据；未经授权的字体文件。

## 四、原创与合规总声明

本投稿全部文字、图件、几何、代码与版式为 AI 辅助、人工指导下的原创成果，不存在侵犯第三方版权的资产；引用的事实性信息均已在 `sources.json` 逐条署名，使用边界已在 `assumptions.json` 声明。成果以 `COMMUNITY-DISPLAY-ONLY` 许可参与本次开源征集。所有空间、运营和政策表述均为概念建议，不构成官方批准、投资承诺、工程可行性或法定规划结论。

## 五、生成链条可复核记录

本节把"由谁生成、怎样复核"写成可检查的记录，替代单纯自声明。

### 1. 字体子集化流程

四份 HTML（`visual/index.html`、`visual/index.en.html`、`report/proposal.html`、`report/proposal.en.html`）内嵌的 `JZ Noto Sans SC` 子集由本地脚本 `embed_font.py` 生成：脚本收集各页面实际用到的字符（去重后并入可打印 ASCII 0x20–0x7E），调用 pyftsubset 将源字体 `NotoSansCJKsc-Regular.otf`（SIL Open Font License 1.1，notofonts/noto-cjk 开源项目）子集化为 woff2，再以 base64 内嵌为 `@font-face`，并把嵌入字体名注入 CSS 字体栈。子集只含页面用字，不含完整字库；脚本幂等，重复运行不产生重复嵌入。复核方式：在任一 HTML 中检索 `embed-font:JZ Noto Sans SC:start/end` 标记块与 `@font-face` 声明；包内不携带独立字体文件。

### 2. 图件与脚本对应关系

| 产出 | 生成脚本 | 输入 | 复核方式 |
| --- | --- | --- | --- |
| `assets/figures/` 12 张 PNG（中英各 6 张） | `fig01_site_overview.py`–`fig06_metrics_evidence.py`（公共模块 `jzmap.py`、`style.py`） | 本包 `geometry/*.geojson`、`metrics.json` | 脚本 import 语句可复核无底图库；产物哈希见 `manifest.json` |
| `drawings/` 4 份图纸 PDF | `make_drawings.py` | 上述 12 张 PNG | 同上 |
| 4 份 HTML 的字体内嵌 | `embed_font.py` | 页面用字＋OFL 源字体 | HTML 内标记块可 grep 复核 |

生成脚本不随包分发；脚本与参数记录由作者留存、随包备查，应评审要求可提供。投稿包内不引用仓库外路径。

### 3. 逐类素材的可复核清单

| 素材类别 | 作者 | 许可/来源 | 核验方式 |
| --- | --- | --- | --- |
| 字体 | 图件与 PDF 文字：Apple 系统字体（Songti SC / PingFang SC / Menlo）本机渲染；HTML 显示字体：Noto Sans SC 子集 | macOS 系统字体随系统许可使用，不再分发字体文件；SIL OFL 1.1 | 绘图脚本 font-family 声明与 HTML 标记块可复核；包内无字体文件 |
| 地图底图 | 无底图；全部地图为本包自绘 GeoJSON 几何的程序化表达 | 原创；不涉及 © OpenStreetMap contributors 署名义务 | 绘图脚本 import 语句可复核（无瓦片/底图库） |
| 数据 | 指标与几何：AI 生成、人工复核；事实性信息：见 `sources.json` 逐条登记 | 原创结构化数据＋公开或清权来源 | `manifest.json` 哈希＋`sources.json` 登记 URL 公开可访问 |
| 插画 | AI 生成（Kimi Code 视觉体系），本地程序化原创表达 | 原创；不使用第三方图片，不冒充现场影像 | 第三节排除项声明＋哈希 |
| AI 生成文本 | Codex GPT-5.1 初版（2026-08-12）＋Kimi Code 修订（2026-08-13 起），全程人工指导 | 原创文本 | 事实逐条对应 `sources.json`；哈希见 `manifest.json` |

### 4. 许可边界：COMMUNITY-DISPLAY-ONLY

本包以 `COMMUNITY-DISPLAY-ONLY` 许可参与本次开源征集。其含义为：仅授权征集主办方与评审方为评审、展示与档案目的公开显示本包内容；不授予复制、改编、再分发、商业使用或衍生创作的许可；包内几何与指标为 provisional 概念成果，不构成可复用数据产品或法定依据的授权；任何超出评审展示范围的使用，须另行取得作者书面许可。本声明不扩大授权承诺，也不减损各第三方组成部分（字体、开源依赖）各自许可证下的既有权利。
