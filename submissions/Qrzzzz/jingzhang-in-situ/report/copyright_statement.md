# 版权、来源与再分发声明

本台账用于本次投稿包的路径级权利核验，不构成法律意见或不侵权保证。`COMMUNITY-DISPLAY-ONLY` 是本投稿的展示许可标签，不能覆盖第三方字体、工具、数据或平台条款。公开可访问、第一方发布或由生成式工具产生，也不自动等于允许复制、嵌入、修改或再分发；每项资产仍须按下表的权利基础和限制单独判断。

## 1. 台账字段与状态

最终发布前，每个路径必须具备：作者或权利人、来源 URL 或本地输入路径、创建/生成/修改日期、生成与转换方法、工具/模型及精确版本、输入资产及 SHA-256、许可证或许可依据、是否嵌入或再分发、署名位置、生成式内容状态、限制、证据路径、输出 SHA-256、复核人和复核日期。

状态只有三种：

- `cleared`：已取得可核验的原创、许可或再分发依据，并已完成最终文件哈希对账。
- `needs_evidence`：来源或限制已知，但仍缺精确版本、哈希、许可副本、嵌入证明或人工复核。
- `replace`：无法证明权利，或许可与当前嵌入/再分发方式冲突；发布前必须替换或移除。

## 2. 正文、JSON 与表格

| 精确路径 | 作者/生成方式 | 来源与许可基础 | 嵌入/再分发 | 限制 | 状态 |
|---|---|---|---|---|---|
| `proposal.md`; `proposal.en.md`; `report/narrative.md` | 投稿者在 Codex 辅助下编写和修订 | 投稿者原创表达；事实和案例仅按 `sources.json` 的逐项边界引用；投稿标签 `COMMUNITY-DISPLAY-ONLY` | 随投稿包再分发 | AI 辅助不构成不侵权保证；英文版本已于 2026-08-13 对照专名、数字、ID、来源标记和限制完成终稿复核 | `cleared`；最终 SHA-256 由 manifest 逐路径记录 |
| `agent.json`; `manifest.json`; `self_check.json`; `metrics.json`; `assumptions.json`; `sources.json`; `compliance_matrix.json`; `standard_matrix.json`; `design_depth_matrix.json` | 投稿者与仓库脚本生成/维护的结构化元数据 | 仓库 schema、任务书与已登记来源；不复制其他投稿的表达、图件或专有资产 | 随投稿包再分发 | schema 兼容不代表现实数据获专业确认；权威状态由字段与限制单独表达 | `cleared`；2026-08-13 与最终 manifest 对账 |

`sources.json` 中的全球案例仅允许短篇事实转述、署名和链接，不复制网页图片、Logo、地图、长段文字或版式，也不在本地镜像页面。案例机制属于 `background_only`，不得替代本地现状、法定控制、合作承诺或绩效证据。

## 3. GeoJSON 与空间数据

| 精确路径 | 作者/来源 | 状态与允许用途 | 禁止用途 | 权利状态 |
|---|---|---|---|---|
| `geometry/site_boundary.geojson`; `geometry/key_areas.geojson` | 从仓库登记的 `DATA-SRC-PROVISIONAL-BOUNDARIES-20260605` 派生；其依据为官方公告文字、位置线索和约面积 | `provisional_only`、`low`；仅用于临时生成、离线展示、入口自检和醒目标注的方案内容评审 | 官方红线、精确空间证据、法定或工程结论、审批、权属、控规或实施依据 | 版权/再分发 `cleared`；数据权威仍为 `provisional_only`，正式几何到位后必须替换并全量重算 |
| `geometry/buildings.geojson`; `geometry/green_space.geojson`; `geometry/land_use.geojson`; `geometry/phasing.geojson`; `geometry/public_space.geojson`; `geometry/roads.geojson` | 投稿者/agent 在临时范围内原创生成的概念设计层；输入链为本包 GeoJSON、assumptions 与 proposal | `conceptual_design`、`medium`；用于表达设计假设和可回退方案 | 不得称为测绘现状、审定用地、道路红线、批准建筑、工程线位、预算或工期承诺 | 版权/再分发 `cleared`；最终哈希由 manifest 记录，数据权威限制保持不变 |
| `geometry/constraints.geojson` | 投稿者/agent 维护的刻意空集合 | 登记未取得官方控规、权属、道路、文保、市政等几何的缺口 | 不得以推定线代替 `official_constraint` | `cleared` 作为缺口说明；若将来加入要素须重新清权 |

GeoJSON 中的数值小数位只服务机器复算，不提高来源权威；对公众展示必须使用合理约数和临时状态说明。

## 4. F01—F11 双语图件

所有图件均应由投稿者/agent 依据本包结构化文本与 GeoJSON 本地绘制，不使用第三方底图、地图瓦片、图库照片、企业 Logo 或未授权图标。当前图件由本地 Pillow 流程生成；最终必须登记生成脚本、Pillow 精确版本、字体文件、输入文件和每张输出的 SHA-256。

| 图号 | 中文路径 | 英文路径 | 当前状态与限制 |
|---|---|---|---|
| F01 | `assets/figures/site-overview.png` | `assets/figures/site-overview.en.png` | `cleared`；原创本地栅格图，临时边界；已重渲染并完成 manifest 对账 |
| F02 | `assets/figures/land-use-structure.png` | `assets/figures/land-use-structure.en.png` | 现有；概念设计，不是审定用地或逐栋拆改留结论 |
| F03 | `assets/figures/key-areas.png` | `assets/figures/key-areas.en.png` | 现有；三处重点区边界为 `provisional_only` |
| F04 | `assets/figures/mobility-bluegreen.png` | `assets/figures/mobility-bluegreen.en.png` | 现有；概念慢行/蓝绿结构，不是工程线位 |
| F05 | `assets/figures/metrics-evidence.png` | `assets/figures/metrics-evidence.en.png` | 现有；只能显示低置信、可重算、约数指标 |
| F06 | `assets/figures/identity-system.png` | `assets/figures/identity-system.en.png` | 已生成；Logo 为原创几何，不使用铁路标识、企业商标或未授权字标 |
| F07 | `assets/figures/ai-ecosystem.png` | `assets/figures/ai-ecosystem.en.png` | 已生成；全球案例机制仅作有来源的背景转述，不复制案例视觉资产 |
| F08 | `assets/figures/scenario-matrix.png` | `assets/figures/scenario-matrix.en.png` | 已生成；场景、角色、数据流和界面符号均为原创示意 |
| F09 | `assets/figures/landmarks-components.png` | `assets/figures/landmarks-components.en.png` | 已生成；地标、组件库和贡献展示为概念设计，不使用第三方人物肖像、Logo 或荣誉标志 |
| F10 | `assets/figures/culture-wayfinding.png` | `assets/figures/culture-wayfinding.en.png` | 已生成；导视符号为原创，专名与双语文本仍须人工复核 |
| F11 | `assets/figures/operations-pathway.png` | `assets/figures/operations-pathway.en.png` | 已生成；运营主体、资金、审批和服务能力均明确为建议，不写成既定承诺 |

F01—F11 均已由同一可复现流程重建；最终文件哈希由 `manifest.json` 逐路径记录，任何再次重渲染都会使既有哈希作废并触发重新核验。

## 5. PDF 与 HTML

| 精确路径 | 生成链 | 嵌入资产 | 许可与限制 | 状态 |
|---|---|---|---|---|
| `drawings/a3-booklet.pdf`; `drawings/a3-booklet.en.pdf`; `drawings/a0-boards.pdf`; `drawings/a0-boards.en.pdf` | 本地图件经 ReportLab 5.0.0 排版输出 | 图件、文本和 Noto Sans SC PDF 子集字体 | ReportLab 为 BSD 类许可；`pdffonts` 已确认四份 PDF 仅列嵌入、子集化并带 Unicode 映射的 Noto Sans SC，不含 Windows 字体 | `cleared`，仍须在任何重渲染后复查 |
| `report/proposal.html`; `report/proposal.en.html`; `visual/index.html`; `visual/index.en.html` | 仓库/本地渲染脚本生成的离线 HTML | 本地图件、本地 CSS 和 `visual/assets/font-subset.css` 中的本地字体数据 | 不使用 CDN、远程脚本、远程地图瓦片、iframe 或远程字体；四份 HTML 均通过本地样式引用同一字体子集 | `cleared`，网络与缺字检查通过；双语语义仍按独立人工复核处理 |

## 6. 字体

采用 **Noto Sans SC / Noto Sans CJK SC** 的本地子集，许可证为 [SIL Open Font License 1.1](https://github.com/notofonts/noto-cjk/blob/main/Sans/LICENSE)，官方上游为 [notofonts/noto-cjk](https://github.com/notofonts/noto-cjk)。OFL 允许使用、嵌入、修改和再分发，但再分发副本须附带版权与许可证文本，字体不能脱离软件单独售卖，修改版须遵守 Reserved Font Name 条款，且不得暗示字体作者背书。

实际权利记录：

- `visual/assets/font-subset.css`：包含两个本地 `@font-face` WOFF2 data URI；源为 Noto Sans SC 2.004，源文件 SHA-256 为 `d68bafcb48a2707749396aa12bbbd833cb70401f3a9a689fd2902c7e0d295964`，CSS SHA-256 由最终 manifest 记录。
- `visual/assets/NotoSansSC-OFL-1.1.css`：在允许的离线资产格式内，以可直接阅读的版权注释随包提供上游字体版权声明与完整 SIL OFL 1.1 文本；该文件已纳入 manifest，不承担运行时样式。
- PNG/PDF 使用从同一源文件固定化的静态字重；静态 TTF 不作为独立文件随包分发，PDF 中仅嵌入实际使用的子集。
- 子集由 fontTools 4.63.0 生成，图件由 Pillow 12.2.0 生成，PDF 由 ReportLab 5.0.0 生成；运行时不依赖操作系统字体。

Noto Sans SC 以 SIL OFL 1.1 许可使用、修改、嵌入和再分发；本节保留官方上游与许可证链接、源版本、源哈希、子集方法和限制。四份 HTML、全部 PNG 和四份 PDF 已核对为同一 Noto 字体链，未使用或分发 Microsoft YaHei。字体链状态为 `cleared`；任何源版本、字符集或生成工具变化都会触发重新核验。

## 7. 封面状态

原 `assets/media/cover.webp` 缺少足够的输入与生成链证据，已于 2026-08-13 从提交目录、manifest 文件清单和 `cover_image` 中移除。当前包不再分发该资产，也不以生成式氛围图作为封面、现状或设计证据；gallery 可使用仓库默认封面机制。

## 8. 代码、工具与第三方库

| 路径/工具 | 用途 | 许可证/权利边界 | 状态 |
|---|---|---|---|
| `scripts/render_proposal_html.py`; `scripts/scaffold_ai_submission.py` | 仓库 HTML/投稿脚手架与渲染流程 | 仓库提交基线 `65714fd5665c172dc92409fe17bbbc4fd9a62320`；脚本 SHA-256 分别为 `e8ef134357b8b0b9068629117661d76b19aa248210083bfb34ba15547c82460c`、`f0d98e7d76d90ca94db8e54e4baa6874b462eb9fab5857502ba21df07fd55432`；不把工具权利误写成输出内容许可 | `cleared` 作为生成证据；脚本本身不随投稿包重复分发 |
| `visual/assets/rebuild-visuals-source.json` | 当前 F01—F11、PDF、visual HTML 与字体子集生成器的可审阅 Python 源码快照 | 因投稿白名单不接受 `.py`，以 JSON 的 `source` 字段随包分发并纳入 manifest；还原后的 Python 源 SHA-256 为 `23856b69524768c341aabb587feadc88b33fff7a7d7137c29360a05194b9300e`，还原说明、依赖与输入均在 JSON/源码常量中固定 | `cleared`；审阅者可直接提取、复核并运行 |
| Pillow 12.2.0 | PNG 绘制 | MIT-CMU 类许可；工具许可不改变输入数据或输出内容权利 | `cleared` |
| ReportLab 5.0.0 | PDF 生成 | BSD 类许可；工具许可不替代嵌入字体权利，本包字体权利单列核验 | `cleared` |
| fontTools 4.63.0 | 字体固定化与 WOFF2 子集 | MIT 类许可；输出继续受 Noto Sans SC 的 OFL 1.1 约束 | `cleared` |

本轮静态盘点未发现四份 HTML 加载 CDN、远程 JavaScript、远程 CSS、远程地图瓦片、iframe 或图库图片，也未发现独立第三方图标包；这是当前文件快照的技术观察，不是永久权利保证。任何后续新增的图标、地图、照片、字体、组件或外部库都必须先新增台账条目。

## 9. 发布前封口检查

1. 以最终 manifest 展开全部文件路径，禁止用无边界通配符掩盖遗漏。
2. 核对 F01—F11 中英文实际文件名、生成输入、字体和输出哈希。
3. 核对 `visual/assets/font-subset.css` 的 data-URI 子集、OFL 来源记录，并保持 HTML 网络请求为零。
4. 用 PDF 字体检查工具确认四份 PDF 仅嵌入 Noto 子集，且许可证记录一致。
5. 保留 Pillow、ReportLab、fontTools 与随包渲染脚本证据；未完成权利核验的可选封面已移除。
6. 人工双语等价审查于 2026-08-13 完成，覆盖专名、数字、SC/CX/IM/C 编号、图号、来源标记和临时状态措辞。
7. 对照最终 SHA-256 更新本台账；任何文件重渲染后原有清权状态自动退回 `needs_evidence`，直至重新复核。
