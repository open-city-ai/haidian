# 著作权与生成方法声明 / Copyright and Generation Statement

## 作者与责任 / Authorship and responsibility

- 申报作者与目录责任人：GitHub 用户 `jitrocky`。
- AI 协作署名：`jitrocky × OpenAI Codex`。OpenAI Codex 协助读取本地资料、组织方案、撰写中文稿、生成忠实英文对照稿并运行确定性检查。
- 最终事实、规划、版权和提交责任由申报者承担；AI 输出不替代规划、建筑、交通、市政、生态、文保、法律或数据保护专业人员的判断。
- Submission author and directory owner: GitHub user `jitrocky`. OpenAI Codex assisted with local-source review, proposal structure, Chinese drafting, faithful English translation, and deterministic checks. The submitter remains responsible for facts, planning claims, rights, and submission decisions.

## 生成方法 / Generation method

文本依据仓库内已批准、已清权或明确标为临时用途的资料，以及 `sources.json` 新登记的六个机构官方一手网页生成。案例网页仅用于事实转述和机制比较；未复制网页文字、图片、标志、视频、课程或宣传性绩效数据。生成过程没有使用非公开政府资料、企业内部资料、个人数据、远程图片或外部地图瓦片，也没有将临时几何升级为官方结论。

The text was generated from approved, rights-cleared, or explicitly provisional local materials plus official primary webpages from six institutions newly registered in `sources.json`. Case webpages support factual paraphrase and mechanism comparison only; no webpage wording, image, logo, video, curriculum, or promotional performance claim was copied. No non-public government material, company-internal material, personal data, remote imagery, or external map tiles were used. Provisional geometry was never promoted to official evidence.

## 来源与许可 / Sources and licenses

- 官方公告和政府专业文件：公开政府页面的本地参考快照；发布机构保留原有权利。允许用途限于来源清单所载的事实、任务和专业参考，不产生项目审批或再许可权。
- 面向智能体任务书：用户提供并清权，允许在本仓库中用于任务响应、场景、品牌、运营和合规边界；不得作为官方红线、法定控规或政府承诺。
- 获批设计说明：用于控制目标人群、“一线三核六类节点”、十二个韧性场景、“预防—发现—响应—恢复”闭环和运营节奏；它是本提交的概念控制文件，不是独立事实权威或正式规划。
- 六个全球案例：Vector Institute、Mila、AI Singapore、Cyber Valley、ETH AI Center 和 Hub71+ AI 的机构官方网页，访问日期均为 2026-08-09。访问时未识别到可供内容再分发的开放许可；正文仅作带链接的事实转述，不复制媒体或品牌资产，也不把机构自述当作独立绩效评估或本地合作事实。
- 临时边界：仓库维护者提供；在明确披露临时属性、精度和限制的前提下，可用于概念内容生成、自检、离线展示、设计讨论和内容评分；不得用作官方红线、精确面积或法定控制依据、土地权属、审批或工程结论。
- 本方案原创文本：按前置元数据采用 `COMMUNITY-DISPLAY-ONLY`。转载、出版、用于其他项目或商业再利用前，应同时核对征集公告知识产权条款及所有底层来源限制，并取得所需书面许可。
- 本次文本没有引入 OpenStreetMap 数据、第三方摄影、企业 Logo、人物肖像、论文插图或未清权字体文件。

Official announcements and professional government references remain subject to their publishers’ rights and are used only within the purposes recorded in `sources.json`. The cleared Agent taskbook is licensed for repository task alignment but not for official spatial or regulatory claims. The approved design statement controls this submission’s users, structure, scenarios, service loop, and operating rhythm; it is not an independent factual authority or official plan. Official institutional webpages for Vector Institute, Mila, AI Singapore, Cyber Valley, ETH AI Center, and Hub71+ AI were accessed on 2026-08-09. No open-content redistribution license was identified; only linked factual paraphrase is used, with no media or brand assets and no treatment of self-description as independent performance evidence or local partnership. When their provisional status, precision, and limits are disclosed, repository provisional boundaries may support concept generation, self-check, offline display, design discussion, and content scoring. They must not support an official redline, a precise-area or statutory-control basis, ownership, approval, or engineering conclusions. Original proposal text uses `COMMUNITY-DISPLAY-ONLY`; republication, publication, reuse in another project, or commercial use requires review of the open-call intellectual-property terms and all underlying source restrictions.

## 字体与工具许可 / Font and tool licensing

- Markdown 文件不嵌入字体。现有 HTML 使用本地系统字体栈，不下载或再分发字体。Task 5 的十张中英文字图件以 `@fontsource/noto-sans-sc` 5.3.0 所含 Noto Sans SC 字形本地栅格化；该字体采用 SIL Open Font License 1.1。本提交只分发完成的 PNG 像素，不再分发字体文件。
- Python 3（PSF License）、Pillow（HPND）、ReportLab（BSD）、pypdf（BSD-3-Clause）、Git（GPL-2.0）与 `jq`（MIT）用于本地读取、绘制、排版、统计和校验；本提交不再分发这些工具的二进制或源代码。
- 仓库自带脚本仅作为本地构建与校验工具使用，保留其仓库原有条款；本声明不为缺少明确许可的第三方组件创设许可。
- No font files are embedded in the Markdown. Existing HTML uses a local system-font stack and downloads no fonts. The ten bilingual figures rasterize Noto Sans SC glyphs locally from `@fontsource/noto-sans-sc` 5.3.0 under the SIL Open Font License 1.1; only finished PNG pixels, not the font files, are redistributed. The four PDFs embed only the Noto Sans SC subsets needed by their pages. Python 3 (PSF License), Pillow (HPND), ReportLab (BSD), pypdf (BSD-3-Clause), Git (GPL-2.0), and `jq` (MIT) were used locally; their binaries and sources are not redistributed in this submission.

## 衍生图方法 / Derived-figure method

正文引用的五组中英文字图使用提交包的 GeoJSON、`metrics.json`、假设、矩阵和自检状态作为唯一数据层，由本地 Python 3.12.13 与 Pillow 12.2.0 确定性绘制；未使用远程底图、截图、生成式图像或未清权素材。临时边界以低对比虚线和精度注释表达，面积和比例直接读取同一份 EPSG:4548 复算指标。最终包包含 1800×1080 的五张中文图及五张相同布局、相同数据的英文图、配对的静态离线 HTML，以及由同一内容模型和图件排版生成的中英文 A3 册与 A0 展板。四册 PDF 使用 ReportLab 生成，并嵌入 Noto Sans SC 字体子集；全部页面已做尺寸、文本提取、字体嵌入、栅格化和视觉检查。

The five bilingual figure pairs use the package GeoJSON, `metrics.json`, assumptions, matrices, and self-check state as their only data layer. They were deterministically drawn with local Python 3.12.13 and Pillow 12.2.0, without remote basemaps, screenshots, generative imagery, or uncleared assets. Provisional boundaries remain low-contrast dashed and precision-annotated; area and ratio labels read the same EPSG:4548-derived metrics. The final package contains five 1800×1080 Chinese figures and five English counterparts with identical layouts and data, paired static offline HTML, and Chinese/English A3 booklets and A0 boards composed from the same content model and figures. ReportLab generated the four PDFs with embedded Noto Sans SC subsets; every page was checked for dimensions, extracted text, embedded fonts, raster integrity, and visual quality.

## 未复制同业方案 / No peer-copy declaration

本次撰写没有读取、下载、改写或复制其他参赛者或智能体的方案、图纸、命名、场景卡或视觉资产。六个具名案例仅来自其机构官方网页；正文转述可核验的组织、空间与运营机制，并明确其制度、资金、伙伴、规模和绩效不能直接迁移。若后续借鉴同业成果，必须先核验许可、署名和事实有效性，并在 `sources.json` 与正文中单独登记。

No peer proposal, drawing, name, scenario card, or visual asset was read, downloaded, rewritten, or copied for this drafting pass. The six named cases use their institutions’ official webpages only. The narrative paraphrases verifiable organizational, spatial, and operating mechanisms and states that institutional settings, funding, partners, scale, and performance do not transfer directly. Any later peer reuse requires license, attribution, and validity review plus separate registration.

## 再分发限制 / Redistribution limitations

提交包可以在本征集仓库和评审界面中按 `COMMUNITY-DISPLAY-ONLY` 展示。不得脱离语境把概念建议宣传为官方批准、已建成项目、确定招商、财政支持或工程承诺；不得单独再分发受限底层来源；不得移除作者、来源、临时边界、隐私和人工复核提示。公告所述共同知识产权和展示条件仍然适用，任何超出社区展示的使用须由权利人书面确认。

The package may be displayed in the open-call repository and review interface under `COMMUNITY-DISPLAY-ONLY`. It may not be presented out of context as approved, built, funded, contracted, or guaranteed; restricted underlying sources may not be redistributed independently; and authorship, provenance, provisional-boundary, privacy, and Human Review notices may not be removed. Uses beyond community display require written clearance from the relevant rights holders.
