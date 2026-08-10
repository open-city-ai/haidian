# 版权、许可与生成说明

本投稿由 GitHub 用户 `baobao-byte` 以 `COMMUNITY-DISPLAY-ONLY` 许可提交。方案命名、中文正文、治理机制、场景卡、指标口径、图例、信息图与版式为本次投稿生成并经人工可读性复核的原创表达。逐资产生成链、上游输入、外部嵌入情况和复核动作登记如下。

九层 GeoJSON 使用仓库 provisional geometry 与投稿的概念设计规则派生；上游资料的权利与用途边界以 `sources.json`、`assumptions.json` 和各 feature properties 为准。投稿不把 provisional 边界主张为官方红线，不把机器复算面积主张为法定指标。

五张 PNG、A0/A3 PDF、两个 HTML 仅使用本投稿文本、本地结构化数据、基础几何图元和操作系统可用字体；不嵌入外部照片、新闻截图、商业地图瓦片、第三方 Logo、案例图表、远程脚本、API、iframe 或外部字体文件。国际案例只做有来源的短事实转述与机制抽象，不复制其品牌视觉或网页表达。

PDF 为跨设备中文显示嵌入运行环境所提供文泉驿正黑字体子集，不附带可安装字体文件。仓库渲染脚本与本地开源库仅作为生成工具，工具权利归各自权利人。机器检查不能替代最终法律确权；如维护者发现疑点，投稿人将配合补证、更正或撤下对应资产。

## 逐资产权利与生成证据登记（v1.1）

本表的“原创”指本投稿中由声明的 AI agent 根据投稿文字、仓库可用数据与基础几何图元生成的表达；不表示仓库上游数据的权利发生转移。所有图面均不嵌入外部照片、新闻截图、商业地图瓦片、第三方 Logo、外部字体文件或案例网页素材。

|资产|内容与生成链|输入/上游|外部嵌入|权利与审查动作|
|---|---|---|---|---|
|`proposal.md`、`report/narrative.md`|本次方案原创中文叙述、表格与机制设计|`sources.json` 登记的一手公开来源只作事实转述|无|按本许可展示；逐条来源可回查|
|`geometry/*.geojson`|仓库 provisional 边界与投稿概念设计规则派生的九层几何|`BOUNDARY-SOURCE`、`KEY-AREA-SOURCE`；精度限制见 properties|无|上游边界权利沿原来源；投稿仅主张派生表达；官方图到位后替换|
|`assets/figures/site-overview.png`|原创证据链、范围与状态图解|投稿文本、几何摘要|无|核查像素文件离线、无品牌/照片|
|`assets/figures/land-use-structure.png`|原创“一区三点两翼”与概念用地图解|投稿概念几何|无|不得当作法定用地图|
|`assets/figures/key-areas.png`|原创三区任务卡与 provisional 范围图解|`key_areas.geojson`|无|不得当作官方重点区边界|
|`assets/figures/mobility-bluegreen.png`|v1.1 原创重绘：慢行—蓝绿—验证站复合网络、实施边界卡|`roads/green_space/public_space.geojson` 与投稿策略|无|固定安全区与自动换行；人工检查四边未裁切|
|`assets/figures/metrics-evidence.png`|原创指标证据链与复算状态图|`metrics.json`、`assumptions.json`|无|数字均标 provisional/low，不构成控制指标|
|`drawings/a0-boards.pdf`|v1.1 将五图与原创文本重新排成 3 张 A0 竖版展板|上述本地资产|无|嵌入文泉驿正黑字体子集；检查页面尺寸、有效版心和边缘安全区|
|`drawings/a3-booklet.pdf`|v1.1 将五图重新排成 5 页 A3 横版设计册|上述本地资产|无|同上；无外链资源|
|`report/proposal.html`|仓库脚本从 `proposal.md` 离线渲染|本地 Markdown 与 PNG|无|禁止 CDN/API/iframe；离线检查|
|`visual/index.html`|原创离线交互展示|本地内嵌 SVG/文本与指标|无|不请求网络；状态口径与 metrics 对齐|
|`agent.json`、JSON 矩阵与清单|投稿结构化原创整理|仓库 schema、任务书与标准快照|无|事实/标准权利归原发布者；本投稿只主张编排表达|

## 可复核检查
1. `sources.json`：核对外部事实来源、用途和不可用途；国际案例不复制其视觉资产。
2. `sha256sum` / `manifest.json`：核对每个已声明文件的内容摘要。
3. HTML 离线扫描：不得出现远程脚本、样式、字体、图片、iframe 或 API 请求。
4. PDF/PNG 人工视觉检查：标题、图例、状态水印、四边安全区与中文可读性。
5. 法律边界：机器检查不替代最终确权；若维护者发现权利疑点，投稿人将更正或撤下对应资产。


## v1.2 bilingual assets

- `proposal.en.md`, `report/proposal.en.html`, `visual/index.en.html`: English counterpart authored for this iteration from the Chinese proposal; no machine service, remote asset or third-party template is embedded. Terminology and boundary statements were manually aligned with the primary file.
- `assets/figures/*.en.png`: five original English display diagrams generated locally with Pillow from submission-authored text and geometric primitives. Font: system DejaVu Sans (`/usr/share/fonts/truetype/dejavu/`), distributed under the Bitstream Vera-derived permissive licence; glyphs are rasterised, no font file is redistributed.
- `drawings/a0-boards.en.pdf`, `drawings/a3-booklet.en.pdf`: locally assembled only from the five English raster diagrams above. No external photograph, map tile, logo, iframe, script, tracker or API is included.
- Reviewer action before public display: compare Chinese/English meaning, confirm text fit and contrast, run accessibility review, and retain the provisional-geometry warning. These counterparts are generated communication artefacts, not independently approved translations.


## v1.3 生成链增量

- 五张中文核心图由投稿原创的确定性 Pillow 本地绘制流程生成，仅使用投稿文字、基础几何图元与系统文泉驿正黑字体；不联网、不嵌入照片、地图瓦片、Logo、追踪器或第三方模板。
- PDF 由投稿原创的本地 PyMuPDF 编排流程生成，将本地 PNG 排为 A3 横向五页及 A0 横向三页，并生成辅助英文册；PDF 仅嵌入本地栅格图与系统字体子集。
- `proposal.md`、中文 PNG、中文 A3/A0、`report/proposal.html` 与 `visual/index.html` 为 v1.3 主要审查资产；英文正文已同步新增章节，但五张英文 PNG 保留 v1.2 图形语义，不声明与 v1.3 中文图逐像素或逐模块等义。
- 复核动作：检查生成输入均为投稿本地资产；检查 PNG 尺寸、PDF 物理页尺寸、HTML 离线资源、manifest 摘要和 provisional/low-confidence 警示。确定性生成流程不构成官方数据、工程安全或法定规划认证。


## v1.4 可审计资产增量

- `visual/assets/delivery-matrix.json`、`pilot-protocols.json`、`civic-agent-receipt.schema.json` 与 `example-p1-receipt.json` 均为本投稿原创结构化编排；不含真实自然人身份、真实运行日志或第三方秘密。示例收据以 `synthetic_example` 明示，不构成项目已运行证据。
- `visual/assets/asset-rights.json` 对中文/英文图、PDF、HTML 逐项记录作者、外部媒体、字体/渲染、许可与 SHA-256；任何资产修改后均重算摘要。
- v1.4 中英文 `metrics-evidence` 图以本地 Pillow、基础图元和系统文泉驿正黑生成；A3/A0 由本地 PyMuPDF 将五张本地图编排，不嵌入远程媒体、商业模板或追踪代码。
- 新增来源字段仅登记事实来源、可用/不可用范围、许可与限制；不得将来源登记误读为对第三方表达的权利主张。

## v1.5 品牌与重绘资产增量

- `assets/figures/civic-loop-logo.svg` 为本投稿原创概念标志，以基础矢量图元表达双轨、三节点与开放缺口；不使用政府机关、企业、赛事或第三方品牌标识，不主张官方背书。
- 中英文五张核心图均由本投稿文字、仓库 provisional geometry、基础图元与系统本地字体重新生成；无照片、地图瓦片、远程字体、商业模板、追踪器或外部生成服务。
- 四份 PDF 仅将新版核心图离线栅格编排为 A3/A0 页面；压缩不新增外部内容，页面仍保留 conceptual / provisional 警示。
- `visual/assets/asset-rights.json` 已登记概念标志并刷新全部新版图与 PDF 的 SHA-256；最终 manifest 还需与整包内容同步校验。

## v1.9 展板与渲染修复增量

- 中英文 A0 三板由本地 PyMuPDF 重新编排，直接组合十张本地原创 2400×1350 核心图与矢量文字，不再把单张 1854×1312 栅格底图拉伸铺满 A0；未做像素上采样后冒充高清的处理。
- A0 新增的三个 AI 朝圣地标文字只引用投稿已有 provisional GeoJSON 标识与 `A-LANDMARKS-001` 假设，不嵌入外部地图、照片、品牌或未授权字体，也不构成精确点位、规划许可或政府背书。
- 中英文 HTML 由仓库离线渲染脚本从清理后的 Markdown 生成，不使用远程资源；`visual/index.en.html` 与英文报告同步，避免不受支持的 Markdown 标记进入截图与文本层。
- 复核动作包括 PDF 页面/嵌图尺寸与可检索文字检查、离线资源检查、逐资产 SHA-256 和 manifest 全包摘要刷新。


## v2.7 视觉证据与专业图册增量

- 中英文五张核心图由本投稿文字、provisional GeoJSON、基础几何图元和系统文泉驿正黑字体离线生成；无外部照片、地图瓦片、商业模板、远程字体、追踪器或生成服务。
- 中英文 A3 均为 1190.551×841.89 pt、14 页；中英文 A0 均为 3370.394×2383.937 pt、3 页。四份 PDF 均保留可检索矢量文本，并与 canonical figures 使用同一视觉语法。
- 图面仅表达概念结构、证据等级、公众任务链和停止门槛；临时几何不主张为法定红线，未知绩效不主张为通过。
- 复核动作包括 PNG 尺寸、PDF 物理页尺寸、页数、文本层、前 3 页渲染、离线资源、逐资产哈希与 manifest 全包摘要。
