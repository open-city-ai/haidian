# Copyright and Rights Statement / 版权与权利声明

## 1. Original submission / 原创成果

“第二轨｜京张公共智能场”的方案文本、设计数据、GeoJSON、指标、矩阵、图解、版式、静态网页及构建脚本由申报人俎菀芃与其声明的 AI agent 为本次开源征集共同组织和生成。除下述来源外，不含第三方成套图纸、未授权字体或远程网页资产。

The proposal text, design data, GeoJSON, metrics, matrices, diagrams, layouts, static website and build scripts for *The Second Track | Jing-Zhang Public Intelligence Field* were organized and generated for this open call by Wanpeng Zu and the declared AI agent. Except for the registered sources below, the package contains no third-party drawing set, uncleared font or remotely loaded web asset.

## 2. Repository and official material / 仓库与官方资料

公告、任务书、场地包、标准索引、数据登记表与临时边界按 `sources.json` 登记，仅在其许可和权威等级内使用。仓库临时边界不是正式红线；方案不会据此声称法定面积、已批控规或行政认可。

The announcement, taskbook, site package, standards index, source registry and provisional boundaries are recorded in `sources.json` and used only within their stated authority. The provisional geometry is not an official redline and is not used to claim statutory area, approved controls or administrative endorsement.

## 3. External cases / 外部案例

Punggol Digital District、Smart Kalasatama、SHIFT、AMS Urban Living Labs、Decidim、Mila、Knowledge Quarter London 与 Quayside 审计仅作为机制参考：开放平台、敏捷试验、真实场景测试、共同创造、公共参与、负责任 AI、知识网络与治理问责。方案不复制其图像、图纸或数值，也不把其成效迁移为本地预测。

The eight external cases are mechanism references only. No third-party image, drawing or numerical performance claim is redistributed or transferred to the Beijing site.

## 4. Author and Phase I continuity / 作者与一期连续性

ASLA National Capital Chapter 页面用于核验 Wanpeng Zu 在 Jingzhang Railway Park 中被列为 Project Manager/Lead Designer；ASLA 访谈和 TLS 页面仅提供专业背景。风景园林论文仅用于京张铁路遗址公园一期项目语境，不被用作俎菀芃署名证明。上述资料不代表原项目团队、出版机构或征集组织方认可本方案。

The ASLA-NCC project page supports the listed Project Manager/Lead Designer role. The ASLA interview and TLS page provide professional context. The journal paper is used only for Phase I project context and not as proof of Wanpeng Zu's authorship. None implies endorsement by the former project team, publishers or competition organizers.

## 5. Fonts, software and delivery / 字体、软件与交付

PNG 图解使用本机 Microsoft YaHei（中文）与 Arial（英文）渲染，文字已栅格化；字体文件不随成果包再分发。四个正式 PDF 由 ReportLab 4.4.9 构建：中文使用 Microsoft YaHei / Microsoft YaHei Bold，英文使用 Arial / Arial Bold，均以 TrueType 子集嵌入 PDF；字体文件本身不单独分发。网页为离线静态成果，不加载 CDN、远程字体、地图瓦片、iframe、表单、追踪器或外部 API。Python 依赖与构建工具仅用于生成和核验，除许可允许的运行时文件外不随包再分发。

The PNG figures use locally installed Microsoft YaHei (Chinese) and Arial (English), rasterized into the images; the font files are not redistributed. All four final PDFs are built with ReportLab 4.4.9: Microsoft YaHei / Microsoft YaHei Bold for Chinese and Arial / Arial Bold for English, embedded as TrueType subsets. The font files are not separately distributed. The website is fully static and offline: no CDN, remote font, map tile, iframe, form, tracker or external API is loaded. Build dependencies are used for generation and validation and are not redistributed unless their licenses allow it.

## 6. Generated media / 生成影像

十张中英文图解由本包 `tools/build_figures.py` 从本地 JSON、GeoJSON 和指标文件程序化生成，没有使用生成式图像、第三方底图或远程影像。投稿封面 `assets/media/cover.webp` 于 2026-08-24 使用 OpenAI 内置 ImageGen 生成，未输入第三方图像；提示以“稳定的铁路遗产第一轨、蓝绿色公共关系第二轨、开放道岔、多年龄公共生活、AI 作为隐形基础设施”为核心，并明确排除机器人、巨屏、霓虹、品牌、文字、政府标志和获批方案式鸟瞰。俎菀芃完成人工筛选，随后仅进行 16:9 居中裁切与 WebP 压缩。该图标记为 synthetic / conceptual，仅表达设计意图，不是现状、真实人物、铁路运营状态、工程承诺或行政批准的证据。

The ten bilingual figures are generated programmatically by `tools/build_figures.py` from local JSON, GeoJSON and metric files, without generative imagery, third-party basemaps or remote visuals. The submission cover at `assets/media/cover.webp` was generated on 2026-08-24 with OpenAI's built-in ImageGen and no third-party image input. Its prompt centered on a stable railway-heritage First Track, a teal public-relations Second Track, an open switch, multi-age public life and AI as invisible infrastructure, while excluding robots, giant screens, neon, brands, text, government marks and approved-masterplan imagery. Wanpeng Zu selected the output; post-processing was limited to a centered 16:9 crop and WebP compression. The image is synthetic / conceptual design intent only, not evidence of existing conditions, real individuals, railway operation, engineering commitment or approval.

## 7. Exclusions / 排除项

本包不主张对赛事名称、政府文件、第三方机构名称与链接拥有权利；不收录一期项目的原始照片、施工图或未明确清权的专业成果。若后续加入任何第三方资产，必须先更新 `sources.json` 和本声明，再重新生成 manifest 与自检记录。

The package claims no ownership over the call name, government documents, third-party organization names or links. It excludes Phase I source photographs, construction drawings and any professional asset without explicit clearance. Any later third-party asset requires prior source-ledger and rights-statement updates, followed by manifest and self-check regeneration.
