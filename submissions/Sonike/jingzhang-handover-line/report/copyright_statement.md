# 版权、来源与生成声明 / Copyright, Sources and Generation Statement

本方案文字、命名、Logo方向、图形符号、地图表达、版式、GeoJSON设计图层、离线HTML和PDF均为本次投稿原创，或由 `sources.json` 登记且允许使用的仓库公开/清权资料程序化派生。提交者为 Sonike；Codex（GPT-5）负责本轮审计、结构化数据、确定性制图与校验，用户操作的 Claude Opus 5 参与此前多轮方案编辑。不同轮次的智能体协作均不替代人类评审与专业团队的最终判断。

全部中英文对应图均由提交几何、`metrics.json` 与本方案数据在本地确定性渲染，没有使用外部底图、遥感截图、摄影、人物肖像、企业Logo、第三方插画、远程字体、CDN、地图瓦片或生成式图像素材。A3图册和A0展板只嵌入上述原创图件与本方案文字。

## 字体、工具链与构建溯源（逐项可核验）

自 v1.9 起，权利证据不再只放在本文件——同一张表已写入 `proposal.md` 的「权利与构建溯源」小节并登记进 `sources.json`，因为**指向一份文件不等于给出证据**：评审输入只包含 `proposal.md`、`sources.json`、`self_check.json`、`manifest.json` 与三个矩阵，本文件本身不在其中，此前的"版权声明见 report/copyright_statement.md"实际上无法被独立核验。

| 资产类别 | 实际使用 | 权利依据 | 核验命令 |
| --- | --- | --- | --- |
| 图纸拉丁文字 | Helvetica 家族与 ZapfDingbats | PDF 内置基础字体，按名引用，不嵌入不再分发 | `pdffonts drawings/a3-booklet.pdf` → `Type 1 / WinAnsi / emb=no` |
| 图纸中文文字 | Noto Serif SC Light，子集嵌入四套 PDF | SIL Open Font License 1.1（读自字体 name 表 nameID 13/14），OFL 明确允许嵌入子集并随文档再分发 | 同上 → `CID TrueType / UniGB-UCS2-H / emb=yes`，字体名为 `<子集前缀>+NotoSerifSC` |
| 全部栅格产物文字（24 张 PNG 与 2 张 JPEG） | OFL-1.1 的 Noto Sans CJK SC（Medium／Light）与 Noto Sans | OFL 明文允许使用与再分发；字体文件在仓库外工具链目录，仅渲染阶段读取字形 | `find assets -name '*.tt[cf]' -o -name '*.otf'` → 无结果 |
| 工具链 | Python 3.12.13(PSF)、reportlab 4.4.3(BSD)、Pillow 12.3.0(MIT-CMU)、shapely 2.1.2(BSD-3)、pyproj 3.7.2(MIT)、fontTools 4.60.1(MIT)、qpdf 12.3.2(Apache-2.0)、PyMuPDF 1.27.2.3(AGPL-3.0 或 Artifex 商业)、Ghostscript 10.07.0(AGPL-3.0) | 版本与许可逐个读取依赖自身分发元数据或 `--version` 自述 | `importlib.metadata.version()` / `metadata()['License-Expression']`、`gs --version` |

**v1.11 关闭了此前登记在案的中文字体阅读依赖。** v1.10 及更早版本的 CJK 字形 `emb=no`，需要阅读器自带中文字体包；本版把四套 PDF 的中文字体程序替换为子集嵌入的 Noto Serif SC（OFL-1.1，允许嵌入与再分发），只改字体程序、不动内容流，断行与字位逐项不变，内嵌图件经提取比对逐像素相同，PDF 内的字体名对象同步改为 `NotoSerifSC` 以免自述与实际不符。拉丁文字仍不嵌入：基础十四款字体由 PDF 规范要求阅读器自备，不构成显示风险，若为凑 `emb=yes` 而嵌入仿制实现并继续挂 Helvetica 之名反而是更差的溯源。

仍须说明的限制：PyMuPDF 与 Ghostscript 均为 AGPL（PyMuPDF 另有 Artifex 商业许可可选），本包仅将其作为**工具**在本机运行——未分发其代码、未链接进任何交付物，PDF 是工具的输出而非其衍生作品，嵌入的字体子集来自 OFL 字体而非任何 AGPL 组件；若日后需随包分发生成脚本，须先确认这些依赖的分发条件。

`COMMUNITY-DISPLAY-ONLY` 是 `schema/proposal.schema.json` 的 `license` 枚举值之一，仓库未发布其规范条款文本。本包对它的自述含义为：允许为本次开源征集的评审、公开展示、教学与知识沉淀而复制与引用，须保留出处；不授予商业使用，不授予将本包内容表述为法定规划或政府决定的权利；第三方进一步使用时仍须自行核验其中每条外部来源的原始权利状态。

构建溯源：自 v1.9 起全部载体使用同一版本印记，v1.14 已整体重刷为 `JING-ZHANG HANDOVER LINE / PACKAGE v1.14`（图纸另附页码）。此前正文、图纸 v1.6 与图件 v1.0 三套页脚并存的状态已不存在。成果时效以 manifest 的 sha256 与 changelog 为准，不以页脚数字为准。

v1.6 新增的 `visual/assets/governance/shift-ledger.schema.json` 为本方案原创的 JSON Schema Draft 2020-12 机器契约；`example-scn05-shift-ledger.json` 是合成、未执行且角色未授权的沙盒结构样例，不含个人数据，也不连接真实导航、政务、维护或告警服务。`validation-report.json` 仅记录 Schema 元模式与样例结构校验，不能据此声称路线、性能、安全、无障碍质量、法律合规、公众接受度或现场运行已经验证。

v1.6 引用的三部法律法规与政策文件（《生成式人工智能服务管理暂行办法》《中华人民共和国无障碍环境建设法》、国办发〔2020〕45号）均为国家机关依法公开发布的文本。本包只引用条款要义并标注条号与施行日期，不复制全文、不再分发附件，也不构成法律意见；条款适用与个案认定由主管部门和具备资质的法律专业人员负责。海淀区2025年国民经济和社会发展统计公报为区级政府网站公开发布的 HTML 页面，未见明确开放数据许可，因此本包只摘录事实数值并保留发布者、标题与原始链接，不复制页面全文；每项数值的原文表述、采集方法、单位换算与可用/不可用边界逐条记录在 `sources.json`。

**关于一次已撤回的生成式图像。** v1.6.2 与 v1.6.3 曾在 `assets/figures/handover-scene.jpg` 放入一张由 gpt-image-2 生成的概念表现图并逐项披露。自 v1.6.4 起该资产已撤回：同名文件的内容已整体替换为本方案程序化绘制的《交接断面》图件（PIL，1600×1000，与其余图件同一色板与版式规则），包内不再包含任何生成式图像素材，上一段的声明对当前包成立。该路径保留而非删除，理由自 v1.11 起已经改变，此处一并订正：当初保留是因为参赛者 PR 无法删除文件（Issue #647），而 **#671 已合并，`validation_paths_for()` 现在无条件排除 `status == "removed"`，参赛者已可通过 PR 删除文件**。现在保留该路径的理由只有一个——同名文件承载的《交接断面》图件（编号 F/13）本身就是成果的一部分，删除会减少交付内容。

六个国际案例只根据机构官网或城市官方报告转述组织机制；未复制网页文字长段、照片、地图、商标、品牌视觉或受保护图表。案例URL、发布者、检索日期、用途和局限均记录在 `sources.json`。京张铁路与中关村文化叙事采用概念性公共叙事，不主张未核实历史细节。

场地与重点区域采用仓库 `provisional_boundaries.geojson`，明确保留 `official_boundary=false`、`provisional_constraint` 和低置信度；它们不构成官方红线、法定规划、权属或工程依据。官方几何和专业条件可用后，全部派生图层、指标、图件与图纸应重新生成。

本包授权标识为 `COMMUNITY-DISPLAY-ONLY`，用于本次开源征集的公共展示、评审和知识沉淀。任何第三方进一步使用应遵守上游仓库规则、逐项核验来源权利，并不得把概念建议表述为政府批准、专业审定或实施承诺。

---

All text, naming, identity direction, diagrams, map language, layouts, design GeoJSON, offline HTML and PDFs are original to this submission or programmatically derived from public/cleared repository inputs registered in `sources.json`. Sonike submits the work; Codex (GPT-5) carried out the current audit, structured-data authoring, deterministic graphics and validation, while user-operated Claude Opus 5 contributed to earlier editing rounds. All bilingual figures use no remote map, photography, portrait, company mark, third-party illustration, remote font, CDN, tile service or generative-image asset. Human and professional review retains final judgment.

The v1.6 `visual/assets/governance/shift-ledger.schema.json` is an original Draft 2020-12 JSON Schema data contract. `example-scn05-shift-ledger.json` is a synthetic, unexecuted and unauthorised-role sandbox fixture containing no personal data and touching no live navigation, government, maintenance or alert service. `validation-report.json` records schema and instance conformance only; it is not evidence of route quality, performance, safety, accessibility, legal compliance, public acceptance or field operation.

The three statutory and policy instruments cited in v1.6 (the Interim Measures for the Management of Generative AI Services, the Law on the Construction of a Barrier-Free Environment, and State Council General Office Document No. 45 of 2020) are texts published by state organs under law. This package cites the substance of specific articles with article numbers and commencement dates; it reproduces no full text, redistributes no attachment, and offers no legal opinion — application of any provision rests with the competent authorities and qualified legal professionals. The Haidian District 2025 Statistical Communiqué is a public HTML page on a district government site with no explicit open-data licence found, so this package extracts factual values only while preserving publisher, title and original link, and reproduces no page text; the original wording, collection method, unit conversion and usable / not-usable boundary of every value are recorded item by item in `sources.json`.

**On one withdrawn generative image.** v1.6.2 and v1.6.3 placed a gpt-image-2 concept rendering at `assets/figures/handover-scene.jpg` with itemised disclosure. From v1.6.4 that asset is withdrawn: the content of that same path has been wholly replaced by an original programmatically drawn section figure (PIL, 1600×1000, sharing the palette and layout rules of the rest of the set), so the package again contains no generative-image asset and the statement above holds for the current package. The reason for retaining that path has changed as of v1.11, and this is corrected here: it was originally kept because a participant pull request could not delete a file (issue #647), but **#671 has since merged and `validation_paths_for()` now excludes `status == "removed"` unconditionally, so participants can delete files by pull request.** The only remaining reason to keep the path is that the section figure it now carries (numbered F/13) is itself part of the deliverable, and deleting it would remove content.

The six global cases are paraphrased from institutional pages or official city material; no protected image, map, trademark, branded layout or long passage is reproduced. The provisional site and key-area geometry explicitly remain non-official. This package is marked `COMMUNITY-DISPLAY-ONLY` for open-call review, public display and knowledge capture; it must not be represented as statutory approval or a professional implementation decision.

**2026-08-17 栅格字体权利链已完全闭合。** 包内全部 24 张 PNG 与 2 张 JPEG 的文字均由 OFL-1.1 的 Noto Sans CJK SC 与 Noto Sans 栅格化，OFL 明文允许使用与再分发，因此不再依赖对任何条款的解释。迁移分两步完成：先迁五张送审图件，再重建其余七张图件与断面图的生成器后一并迁移；中文取 Medium 档，以补回 Noto CJK 相对 STHeiti 偏细的字面差。`sources.json` 中的 FONT-STHEITI-RASTER 与 FONT-HELVETICA-RASTER 已降级为历史登记，仅说明 v1.15 之前版本的栅格产物由何种字体生成，不再作为当前任何产物的权利依据。`COMMUNITY-DISPLAY-ONLY` 的完整条款（版本 1.0）逐条写在 `proposal.md` 的风险与合规一节。
