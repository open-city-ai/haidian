# Copyright, licence and authenticity / 版权、许可与真实性

## 分层许可 / Component licences

截至 2026-08-28，投稿方 `xyh202131` 将本包中其原创的文字、表格、图解、SVG、PNG 导出、编辑版式、自编 JSON 与概念 GeoJSON 转化按 **CC BY 4.0** 许可。署名：`Twin-Track Jing-Zhang / 双轨京张, xyh202131, CC BY 4.0`。许可全文：<https://creativecommons.org/licenses/by/4.0/>。

As of 2026-08-28, contributor `xyh202131` licenses contributor-owned text, tables, diagrams, SVG source, PNG exports, editorial layout, package-authored JSON and conceptual GeoJSON transformations under **CC BY 4.0**. Attribution: `Twin-Track Jing-Zhang / 双轨京张, xyh202131, CC BY 4.0`. Full terms: <https://creativecommons.org/licenses/by/4.0/>.

投稿方自编的回放与离线交互代码采用 **MIT License**：Copyright (c) 2026 xyh202131。任何获得本软件及相关文档副本的人，可不受限制地使用、复制、修改、合并、发布、分发、再许可和/或销售，但所有副本或实质部分须保留上述版权和许可声明。本软件按现状提供，不作任何明示或默示担保；作者或版权持有人不对因本软件或其使用产生的索赔、损害或其他责任负责。

Contributor-authored replay and offline interaction code is under the **MIT License**. Copyright (c) 2026 xyh202131. Permission is granted, free of charge, to any person obtaining a copy of the Software and associated documentation to use, copy, modify, merge, publish, distribute, sublicense, and/or sell it, subject to including this copyright and permission notice in all copies or substantial portions. The Software is provided AS IS, without warranty; the authors or copyright holders shall not be liable for claims, damages or other liability arising from the Software or its use.

## 第三方与字体 / Third-party data and font

- `geometry/constraints.geojson` 含 OpenStreetMap 方向性背景，署名 `© OpenStreetMap contributors`，数据库许可为 **ODbL 1.0**：<https://opendatacommons.org/licenses/odbl/1-0/>。该层不进入 CC BY 授权；任何符合衍生数据库定义的再分发须保留署名与相同方式共享。它不是官方道路红线、铁路保护边界、市政线位、测绘或批准依据。
- 四份 PDF 的可见页眉、页题、说明和页脚在本地构建时使用 `NotoSansCJKsc-Regular.otf`（SHA-256 `2c76254f6fc379fddfce0a7e84fb5385bb135d3e399294f6eeb6680d0365b74b`）与 Pillow 12.2.0 确定性栅格化，既有投稿方 PNG 图件同样以像素嵌入；R60 首次以 fontTools 4.62.1 从同一 OFL 字体生成最小 OTF 语义子集并嵌入 PDF，R62 沿用相同语义层方法，只将当前轮次标签重建为稳定评审标签，使 44/44 页可搜索、复制且保持可见版式不变。四份离线 HTML 通过 `visual/assets/offline-cjk-font.css` 共用由同一源字体生成的 WOFF2 子集，避免干净浏览器缺少 CJK 系统字体时出现方框；R77.1 以相同 fontTools 4.62.1 和 SHA-256 不变的源字体将当前四个 HTML 的完整字符并集更新为 1167 个 Unicode 码点，两个新进程构建字节一致，WOFF2 SHA-256 为 `5e736da1ef53dead6543f39c0ffb8f91f2841f30bbba2e5d0747c1be7a0d18c0`。字体采用 **SIL Open Font License 1.1**：<https://openfontlicense.org/>；完整源字体不作为独立文件分发。四份 PDF 仍是定页视觉出版物，不声明 tagged-PDF/UA 或无障碍合规；配套离线 HTML 承担完整机器可读与键盘阅读入口。
- R66 仅在四个既有页位加入投稿方原创政策任务门面板：由本地 Chrome 使用包内 OFL WOFF2 确定性栅格化，再以本地 `pypdf` / `reportlab` 合并；没有远程资源、模型 API 或第三方媒体。该面板的完整机器可读内容保留在双语 proposal、HTML 与 `visual/assets/policy-to-task-register.json`，不得因 PDF 的栅格面板而宣称该新增面板本身具有完整语义文本层。
- Repository-provided provisional inputs, cited policy pages, cases, standards, trademarks, names and links are not relicensed. Their uses remain bounded by `sources.json` and `visual/assets/source-governance-register.json`.

## 逐路径自查 / File-by-file contributor inventory

R79 从当前四份 PDF 本地确定性派生四张全页缩略图谱，仅复现投稿方既有版式与已登记 OFL 字体的可见栅格结果，不引入第三方图像、远程资源、模型 API 或新事实。图谱按投稿方自有编辑内容适用 CC BY 4.0；PDF 本体及其组件许可不变。图谱只用于快速核对页数、顺序、版式连续性和中英配对，小字与完整内容仍以原 PDF 为准，不构成现场、批准、官方边界、现实结果或专业接责证据。

R79 locally and deterministically derives four all-page thumbnail atlases from the current PDFs. R105 updates the single exact-package count on A3-13 and A0-07 in both languages from 162 to 167 and refreshes those four atlas cells; no design claim, geometry, metric, page count or professional boundary changes. The atlases reproduce only the contributor's existing layouts and visible raster output from the registered OFL font, with no third-party image, remote resource, model API or new fact. The atlases are CC BY 4.0 contributor editorial content; component licences remain unchanged. They support rapid checks of page count, order, publication continuity and bilingual pairing only. Small text and complete content remain authoritative in the source PDFs, and the atlases establish no site, approval, official-boundary, real-result or professional-duty evidence.

`visual/assets/file-rights-inventory.json` 覆盖本次分发树的每个路径，并分别记录投稿方原创内容、投稿方代码、OSM 衍生数据库、仓库 provisional 输入、嵌入字体与仅引用外部来源的许可路径。该清单可以证明“每个文件都有明确处理决定”，但它仍是投稿方自查，不等同于独立法律意见、独立逐文件权利审计或商标检索。

`visual/assets/file-rights-inventory.json` covers every path in the current distribution tree and distinguishes contributor-authored content, contributor code, OSM-derived database content, repository provisional inputs, embedded font software and citation-only external sources. It proves that every file has an explicit handling decision, but remains a contributor inventory rather than independent legal advice, an independent file-level rights audit or a trademark search.

**当前精确投稿包决定。** 当前精确投稿包 167/167 个路径均已记录作者/权利人、来源、适用许可或处理、署名、变更、再分发和例外。最终 PR exact head 绑定 `manifest.json` 的 Git blob，manifest 再以 SHA-256 绑定 166 个非 manifest 路径；manifest 自身不写自哈希以避免循环。该精确版本可按组件条款用于仓库评审、展示与再分发；不存在单一整包许可。`independent_file_level_audit_completed=false` 只表示尚无外部独立法律结论，不表示当前包仍有未处置路径，也不是仓库评审或展示阻断。未来公共装置、外部品牌发布和专业实施仍须另行审查、批准与签约。

**Current exact-package decision.** All 167/167 paths record author/rightsholder, source, applicable licence or handling, attribution, transformation, redistribution and exceptions. The final PR exact head binds the `manifest.json` Git blob, whose SHA-256 records bind 166 non-manifest paths; the manifest intentionally has no circular self-hash. This exact version may be reviewed, displayed and redistributed under component-specific terms; no single package-wide licence exists. `independent_file_level_audit_completed=false` records the absence of an external independent legal finding, not an undisposed current-package path or a repository-review/display blocker. Future public installation, external brand release and professional implementation still require separate review, approval and contracts.

## R65.1 权利状态消歧 / R65.1 rights-state disambiguation

`metrics.json` 中的 `time_museum_uncleared_content_count` 现在只统计当前精确包内“没有投稿方再分发处置的时间博物馆图像或文本路径”，当前值为 0；它不统计未来馆藏、口述史、公共装置或策展内容。来源登记 52/52 与逐路径清单 167/167 已对齐。新增的 `policy-to-task-register.json` 只包含投稿方编写的政策—任务映射；政策原文、网页版式与标识不嵌入、不重新许可。该 0 是投稿方清单结论，不冒充独立法律意见、独立逐文件法律审计或商标检索；新增任何历史图片、长文本、地图、字体、口述史或生成内容时必须重新登记和判断。

The `time_museum_uncleared_content_count` in `metrics.json` now counts only current exact-package time-museum image or text paths lacking a contributor redistribution decision; its current value is 0. It does not cover future collections, oral histories, public installations or curatorial content. Source governance is aligned at 52/52 and the path inventory at 167/167. The added `policy-to-task-register.json` contains only contributor-authored policy-to-task mappings; policy text, page layout and marks are neither embedded nor relicensed. This zero is a contributor-inventory conclusion, not independent legal advice, an independent file-level legal audit or trademark review; any new historical image, long text, map, font, oral history or generated content requires a new record and decision.

## R63 人本出版更新 / R63 human-first publication update

R63 仅在原路径重建投稿方原创的人本任务链图件、既有概念海报、双语离线页面和四份固定页出版物。图件与海报由本地确定性 SVG/Python/Pillow 流程产生；四份 PDF 使用已登记的 Noto Sans CJK SC OFL 字体源形成可见字形与语义子集。A3 仍为 14+14 页、A0 仍为 8+8 页，44/44 页可搜索/复制且两次新进程构建字节一致；不声明 tagged PDF/UA 或无障碍达标。

R63 rebuilt only the contributor-authored human-task figures, existing conceptual poster, paired offline pages and four fixed-page publications in place. The figures and poster use deterministic local SVG/Python/Pillow methods; the four PDFs use the registered Noto Sans CJK SC OFL source for visible glyphs and a semantic subset. A3 remains 14+14 pages and A0 remains 8+8 pages; 44/44 pages are searchable/copyable and two fresh-process builds are byte-identical. Tagged PDF/UA or accessibility conformance is not claimed.

本轮没有新增媒体路径或类型。既有 MP4、VTT、文字稿、八镜结构与 54 秒编辑节奏未改；只重建既有 `four-state-cover.webp`。匿名站立/轮椅符号是投稿方概念角色，不是现场照片、真实人员、居民意见、公众反馈、无障碍结果或已建成状态。

No media path or type was added. The retained MP4, VTT, transcript, eight-shot sequence and 54-second editorial pacing are unchanged; only the existing `four-state-cover.webp` was rebuilt. Anonymous standing and wheeled symbols are contributor-authored conceptual roles, not site photographs, real people, resident views, public feedback, accessibility results or built conditions.

## 第59轮概念媒体方法 / Round 59 concept-media method

- `four-state-cover.webp`、54 秒无声 H.264 视频、双语 VTT、双语文字稿和四态合同均为投稿方原创概念表达，采用 Python 3.14.7、Pillow 12.2.0、Chrome 151.0.7922.174、FFmpeg/FFprobe 6.1.1 与登记的 Noto Sans CJK SC 源字体在本地确定性生成；未访问网络、未调用模型 API、未下载或嵌入外部媒体，不含音乐、配音或音轨。Chrome SHA-256 为 `b6d40f55e48e61760335d18f46abcec929e1a11b8330e7f2b501037584af4aa4`；FFmpeg 为 `0c4760db80d73a6ddc05c828a20c1b51c84bf61f4fcecff17f759c3edab800fb`；FFprobe 为 `01b99c76134e5c7a6b3f40f1d6c1e50f1084d5d5d763dfec1fde66bb1b575346`。工具二进制与源 OTF 不随包分发，继续适用各自独立许可。
- The cover, silent 54-second H.264 video, bilingual VTT, bilingual transcript and four-state contract are contributor-authored conceptual expression, produced locally and deterministically with Python 3.14.7, Pillow 12.2.0, Chrome 151.0.7922.174, FFmpeg/FFprobe 6.1.1 and the registered Noto source. No network, model API, download, external media, voice, music or audio stream was used. Tool binaries and the source OTF are not redistributed and retain independent licences.

## 真实性与排除 / Authenticity and exclusions

- 第59轮确定性概念媒体不是模型生成的现场图像；本轮新增的四张真实感场景则明确披露为模型生成的合成 G0 概念图。两类媒体均不冒充现场、居民意见、批准方案、无障碍结果、现实恢复时间或运营证据；54 秒仍仅为编辑播放节奏。
- 许可不把临时几何升级为官方红线，也不证明现场踏勘、规划批准、工程可行性、无障碍达标、现实服务效果、责任接受、G1 或专业签署。
- 独立法律意见、逐文件独立权利审计与商标检索仍未提供；许可声明不冒充上述专业结论。

- The R59 deterministic concept media is not model-generated site imagery; the four newly added photorealistic scenes are explicitly disclosed as model-generated synthetic G0 concepts. Neither class is presented as field evidence, resident opinion, approved design, accessibility result, real recovery duration or operational proof; 54 seconds remains editorial pacing only.
- These licences do not establish an official boundary, field survey, planning approval, engineering feasibility, accessibility compliance, real service result, accepted duty, G1 status or professional sign-off.
- Independent legal advice, independent file-level rights audit and trademark search remain absent; this notice does not claim those professional conclusions.
## R64 责任接收图更新 / R64 duty-acceptance figure update

R64 在原路径重构投稿方自有的双语专业交接 SVG/PNG，并让中英文离线页面与固定页 PDF 引用同一图意。图件由本地确定性 Python/SVG/Chrome 流程生成，仅转译既有 H01—H07、候选与真实性边界；没有新增第三方素材、模型生成媒体、照片、人物、声音、字体、来源或远程依赖。投稿方图形内容继续采用 CC BY 4.0；Noto 字体组件继续适用 SIL OFL 1.1。

R64 rebuilt the contributor-owned bilingual professional-handoff SVG/PNG files in place and aligned paired offline pages and fixed-page PDFs to the same meaning. The figure uses a deterministic local Python/SVG/Chrome workflow and only translates existing H01-H07, candidate and truth-boundary fields. It adds no third-party material, model-generated media, photograph, person, voice, font, source or remote dependency. Contributor visual content remains CC BY 4.0; Noto font components remain under SIL OFL 1.1.

图中角色均为未确认的角色类型，不代表真实机构、人员、排班、责任接受、专业意见、批准或实施授权；当前 0/7 接受与 G0/NO-GO 必须保留。R64 本身无新媒体；后续真实感场景另按下节披露。

## R105 真实感场景生成 / R105 photorealistic scene generation

`twin-track-master-scene.webp`、`zhongzhiyuan-verify-scene.webp`、`origin-community-cocreate-scene.webp` 与 `dazhongsi-publish-scene.webp` 由 OpenAI 图像生成工具根据本投稿包已存在的“双轨京张”、三种不可互换原型、普通任务与 G0 / NO-GO 边界生成。未提供现场照片、地图截图、私人图像、可识别真实人物、第三方 Logo 或未公开资料作为输入。原始 `1672 × 941` PNG 由 Pillow 12.2.0 本地转换为 RGB WebP（quality 82, method 6），原始 PNG 不随包分发；完整方法、逐图读法、署名、许可与限制见 `assets/media/real-scene-visuals.md`。

The four WebP scenes were generated with the OpenAI image-generation tool from Twin-Track Jing-Zhang, the three non-interchangeable prototypes, ordinary tasks and G0 / NO-GO boundaries already present in this package. No site photograph, map screenshot, private image, identifiable real person, third-party logo or non-public material was supplied. Source `1672 × 941` PNGs were converted locally to RGB WebP with Pillow 12.2.0 (quality 82, method 6); the source PNGs are not distributed. The full method, per-image reading, attribution, licence and limits are recorded in `assets/media/real-scene-visuals.md`.

四张图均为合成、非比例、非证据的概念表达。图中人物不是真实参与者；建筑、构件、植物、天气和照明不证明现状或方案。不得据此推导官方几何、准确落位、权属、规划控制、工程可行性、消防、无障碍达标、预算、工期、恢复时长、伙伴、责任接受、批准、公众反馈、现场结果或 G1。投稿方 `xyh202131` 对提示词整合、选择、编排、披露与转换负责，并将投稿副本作为投稿方视觉内容按 CC BY 4.0 提供，同时保留生成平台适用条款。

All four images are synthetic, not to scale and non-evidentiary concept expression. Depicted people are not real participants; buildings, components, planting, weather and lighting establish no existing condition or approved scheme. They cannot support official geometry, exact siting, ownership, statutory control, engineering feasibility, fire finding, accessibility compliance, budget, programme, recovery duration, partner, accepted duty, approval, public feedback, field result or G1. Contributor `xyh202131` is responsible for prompt synthesis, selection, sequencing, disclosure and conversion, and offers the submitted copies as contributor visual content under CC BY 4.0, subject also to applicable generation-platform terms.

All depicted roles are unconfirmed role types, not real institutions, people, shifts, accepted duties, professional opinions, approvals or implementation authority. The current 0/7 acceptance and G0/NO-GO boundary must remain. No new media was added.
