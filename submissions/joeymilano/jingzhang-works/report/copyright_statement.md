# 版权、来源与工具说明 / Copyright, Sources, and Tools

本提交的中英文正文、任务合同、确定性编译器、GeoJSON 设计图层、原创图表、离线 HTML 和 PDF 版式由 joeymilano 本次参赛制作，并以 `COMMUNITY-DISPLAY-ONLY` 许可提交。

空间底稿仅使用仓库内公开临时 geometry。外部案例只以文字摘要和一手公开链接引用，不复制其图纸、商标、代码或数据结构。其他参赛方案仅提供一般机制启发，逐条记录于 `visual/assets/peer_influence_ledger.json`。

v1.4 的 A3 文册与 A0 展板嵌入 16 张来自 Wikimedia Commons 的真实照片。每张照片的作者、日期、许可、许可链接、原始页面、压缩或裁切方式、使用角色和本地文件路径均登记在 `visual/assets/photo_credits.json`，并在 PDF 页内给出紧邻署名。照片按各自 Public Domain、CC BY-SA 3.0 或 CC BY-SA 4.0 条款使用；对 CC BY-SA 照片仅做尺寸压缩与版面裁切。照片只表达京张历史、海淀城市气质或北京其他地点的服务做法参考，不构成项目现场踏勘、官方边界、实施现状或绩效证据。

v1.8 新增两张由参赛者定向生成的“好用服务间”概念图。两图采用同一视角，分别说明辅助开放和断网后的纯人工降级状态。生成方式、提示摘要、编辑关系、像素尺寸、文件哈希和证据边界登记在 `visual/assets/generated_media_ledger.json`。图像只承担空间与运行状态说明，不构成现场照片、场地测量、实施现状、施工效果、服务开放、政府背书或绩效证据。图中细小偶发字符不承担信息，全部判断以本提交叠加的中英文标签和结构化记录为准。

v1.9 没有新增生成式图像。`shift-evidence.png` 与 `shift-evidence.en.png` 由参赛者编写的 `works_bay_shift_book.json` 确定性绘制，文字、线条、节点和数值都来自同一份结构化工作单。两图说明参考工作量、询价对象和故障响应时限，不构成人员排班、供应商报价、预算、服务开放或现场执行证据。

v1.10 仍没有新增生成式图像。新增的首班开门闸盒来自参赛者编写的 `first_authorized_shift_packet.json`，当前七张回执均为空白，不构成授权、验收、采购、开放或现场演练证据。

v1.11 没有新增生成式图像。中英概念用地图由参赛者依据既有六个概念分区和八要素采用单确定性重绘；名称避让、编号、连线和色块只负责提高可读性，不增加法定用地或现场事实。

图件使用 Python、Shapely、pyproj 和 Pillow 生成。PDF 使用 ReportLab 生成，标题采用系统 Songti / Georgia 字体子集，正文采用 Arial Unicode 字体子集，元数据采用 SF Mono 字体子集。PDF 视觉系统以“电子杂志 × 铁路工作单”为方向，采用牛皮纸色、煤褐色、衬线大标题、纪实照片和差异化页面节奏。双语 HTML 把 Google Noto Sans SC 的 OFL 子集和许可正文嵌入本地 CSS；字符语料、字体尺寸、二进制哈希和 Chromium 重放结果登记在 `visual/assets/cjk_font_ledger.json`。HTML 仍完全离线，无外部图片、地图瓦片、运行时远程字体、CDN、追踪、表单或 API。

English summary. All text, contracts, compiler code, design geometry, original diagrams, offline HTML, and PDF layouts were created for this entry. The A3 and A0 PDFs embed sixteen real Wikimedia Commons photographs under their respective Public Domain, CC BY-SA 3.0, or CC BY-SA 4.0 terms. `visual/assets/photo_credits.json` records attribution, licence, original page, modifications, local path, use, and an explicit non-field-evidence role. Version 1.8 adds two participant-directed concept illustrations produced with OpenAI built-in image generation. `visual/assets/generated_media_ledger.json` records their prompts, edit relationship, hashes, dimensions, and strict conceptual-only evidence role. Versions 1.9, 1.10, and 1.11 add no generated image. The shift figure and first-shift gate wallet are participant-authored operating designs and do not prove roster, quotation, budget, opening, or field execution. The v1.11 land-use pair is deterministically redrawn from the existing six concept zones and eight-resource order; its label avoidance, numbering, connectors, and colours add readability rather than statutory or field facts. Version 1.10 embeds OFL-licensed Noto Sans SC subsets and the licence text in one local CSS file; `visual/assets/cjk_font_ledger.json` records source, licence, corpus, size, binary hashes, and Chromium replay. External cases remain primary-source summaries. No competitor asset, proprietary map, corporate mark, runtime remote font, tracking, form, or API is embedded.
