# 资产权利、生成链与再分发台账

> Asset rights, provenance, attribution, redistribution, and replacement ledger
> 台账日期：2026-08-22｜适用对象：`submissions/zongtao1991/jingzhang-human-switchback/` v5.0

## 0. 台账效力与状态口径

- 本台账逐路径说明本提交实际发布的图像、PDF、HTML、字体、空间数据，以及只在本地生成环境中使用而**未随投稿再分发**的脚本和依赖。文件身份以同一提交版本的 `manifest.json` SHA-256 为准；任一资产内容或哈希改变后，本台账和 manifest 必须一起复核、刷新并重新自检。
- `公开许可已核对` 表示已找到发布者的许可文本，并核对当前用途；它不是对第三方数据库中每一个对象逐项担保。`参与者原创声明` 表示 `zongtao1991` 对选择、编排、设计判断和本地生成结果承担提交责任，但机器检查不能独立证明现实世界的著作权归属。`待人工/专业确认` 不得解释为已清权。
- 本台账记录的参与者授权范围限于本投稿在 PR、仓库方案页、评审、展览及本项目后续深化中的必要存储、复制和展示；本台账本身不扩大任何第三方许可。仓库根目录在本次检查时未见统一 `LICENSE`；因此不得仅因文件在 GitHub 上公开，就推定参与者原创内容采用 MIT、CC BY、CC0 或其他开放许可。若本成果被认定为正式应征成果，公告第 8.1 条的共同知识产权、署名、项目内使用和展示规则仍优先适用；超出本项目的复用须另行取得应征人及相应主办/承办主体的确认。
- 本台账不是律师意见、商标注册检索、肖像授权书或权属证明。它把可核事实、参与者声明和未完成事项分开记录，不用“待查”冒充“已清权”。

## 1. 责任主体与 AI 生成披露

| 项目 | 记录 | 权利/限制状态 |
| --- | --- | --- |
| 提交责任主体 | GitHub 账号 `zongtao1991`；本提交在该账号分支与 PR 下发布 | 参与者对提交、来源声明和后续异议处理负责 |
| 早期概念与文本 | `agent.json` 登记 WorkBuddy / GLM-5.2；早期名称、概念和文字曾由该环境辅助 | 精确提示词、模型构建号和完整生成日志未随包发布；只能作为来源披露，不能作为独立权属证明 |
| 本轮重构 | OpenAI Codex 在本地工作区协助重建空间模型、双语文本、图件、HTML、A3/A0 和审计记录 | Codex 的精确后端构建与逐轮提示日志未写入包；最终选择、编排和提交决定归提交责任主体 |
| 图像生成方式 | 最终 14 张 PNG 全部由本地 Python 脚本从结构化数据程序化绘制；未使用 ImageGen、扩散模型、第三方参考图、照片拼贴或截图作为最终像素来源 | 不对模型训练语料作未获证据支持的声明；本批 PNG 的可审计输入限于下表所列本地数据和 OSM 开放数据语境 |
| 人工权利确认 | 机器已完成文件、依赖、字体嵌入、远程资源和可见第三方素材检查 | 现实世界权属和公告条款仍须提交者/主办方按其流程作最终判断 |

## 2. 十四张 PNG 的逐路径台账

### 2.1 共用生成链

- 本地脚本：`tools/professional_package.py`（作者工作区 SHA-256 `f3ec1bc6addf44ddc5b24847878d77169e574978336ad8fc3c3445e3bdd1df68`，未随投稿分发）。
- 结构化输入：提交包 `geometry/*.geojson`、`metrics.json`、`assumptions.json` 及矩阵；场地与三重点区来自仓库明确标注的 provisional geometry，其余用地、体量、中心线、绿地、公共空间和分期是参与者概念设计模型。
- 绘图环境：Python 3.10.11、Matplotlib 3.10.9、Pillow 10.1.0、Shapely 2.1.2 / GEOS 3.13.1、pyproj 3.7.1 / PROJ 9.5.1。所有 PNG 为 4,800 × 3,000、带 sRGB ICC、无 EXIF/作者位置元数据、无透明图层。
- 字体像素由本机 Microsoft YaHei 6.31 渲染为完整词句；没有把字体逐字形转换成可复用位图库，也没有分发 `msyh.ttc`。字体许可边界见第 7 节。
- 图件选择、版式、颜色、注记和设计图层为本提交的参与者原创声明；第三方数据只包括按第 6 节署名的 OSM 低对比背景。没有第三方照片、历史影像、论文插图、商业地图瓦片、人物肖像或企业 Logo。

| 资产 ID / 路径 | 生成输入与第三方成分 | 许可、署名与再分发 | 限制及替换触发 |
| --- | --- | --- | --- |
| FIG-01-ZH `assets/figures/site-overview.png`<br>FIG-01-EN `assets/figures/site-overview.en.png` | 概念 GeoJSON/metrics + OSM 建筑、道路、轨道、水绿和交通点低对比语境 | 参与者原创声明；OSM 部分为 ODbL 1.0，图内保留 `© OpenStreetMap contributors` 与许可名，完整链接见第 6 节 | OSM 署名被裁切、图件脱离本台账单独印刷且无许可 URL、或出现未经核对的外部素材时，停止分发并恢复署名或移除背景 |
| FIG-02-ZH `assets/figures/land-use-structure.png`<br>FIG-02-EN `assets/figures/land-use-structure.en.png` | 参与者概念用地、体量、道路 + OSM 低对比语境 | 同上；用地色块和统计只来自提交模型，不继承外部案例图样 | 正式用地/地块资料到位、分类或模型改变时必须重绘；不得把图面当法定用地图 |
| FIG-03-ZH `assets/figures/key-areas.png`<br>FIG-03-EN `assets/figures/key-areas.en.png` | 三处 provisional 范围、参与者概念设计、模型切线 + OSM 低对比语境 | 同上；没有外部重点区设计图或参考效果图 | 官方重点区红线、现状建筑、标高或约束到位即整体替换/复算；任何外部参考图进入像素前须新增授权记录 |
| FIG-04-ZH `assets/figures/mobility-bluegreen.png`<br>FIG-04-EN `assets/figures/mobility-bluegreen.en.png` | 参与者中心线、绿地、公共空间、节点 + OSM 道路/轨道语境 | 同上；OSM 只作背景辨识，不生成本提案线位 | 官方道路、轨道、蓝绿或市政资料到位即重绘；不得以该图主张工程线位或容量 |
| FIG-05-ZH `assets/figures/metrics-evidence.png`<br>FIG-05-EN `assets/figures/metrics-evidence.en.png` | 只从提交 GeoJSON、metrics 和分期统计绘制；图面不含 OSM 几何 | 参与者原创声明；页脚仍保留整套图件的统一 OSM 来源披露，但本图数据柱/数值不是 OSM 派生 | 指标公式、GeoJSON 或分期改变即重绘；未知法定控制不得补画成已知值 |
| FIG-06-ZH `assets/figures/existing-context-and-data-gap.png`<br>FIG-06-EN `assets/figures/existing-context-and-data-gap.en.png` | OSM 是本图主要低对比语境；叠加 provisional 范围和资料缺口说明，不显示参与者体量冒充现状 | 参与者编排 + ODbL 1.0；保留 OSM 署名、快照日期和非测绘声明 | 该图不得脱离署名与限制说明；若需要现状调查结论，必须用官方/专业测绘替换 OSM |
| FIG-07-ZH `assets/figures/three-key-areas-sections-kit.png`<br>FIG-07-EN `assets/figures/three-key-areas-sections-kit.en.png` | 三处概念平面、实际模型相交体量、参与者切线和试点协议 + OSM 低对比语境 | 参与者原创声明 + ODbL 1.0；断面是设计模型条件剖面，不含外部建筑摄影或第三方工程图 | 现状地形、工程标高、真实建筑或产权资料到位即替换；不得以 NTS 条件剖面主张施工可行性 |

## 3. 四份 PDF 的逐路径台账

| 路径 | 页数 / 生成链 | 字体与第三方内容 | 再分发与限制 |
| --- | --- | --- | --- |
| `drawings/a3-booklet.pdf` | 12 页；ReportLab 5.0.1 + Pillow 10.1.0；由中文 PNG、三张临时生成的重点区细化页、场景/协议表和同一 GeoJSON/metrics 排版 | Microsoft YaHei 6.31 子集内嵌；ASCII 另引用 PDF 标准 14 字体 Helvetica、未嵌入字体程序；包含图件中的 OSM 静态语境，无外部照片/Logo | PDF 可随本投稿分发和打印；不得提取/再托管微软字体；若脱离整包单独发布，必须同时保留 OSM 署名与本台账链接/许可 URL |
| `drawings/a3-booklet.en.pdf` | 12 页；与中文册同源、英文排版 | 同上；已核对 Microsoft YaHei 子集内嵌，Helvetica 未嵌入 | 同上；中英文资产改变后须同步复核，不得用译本缺失掩盖权利说明 |
| `drawings/a0-boards.pdf` | 2 页；Matplotlib 3.10.9 `PdfPages` 矢量输出；同一设计模型和 OSM 语境 | Microsoft YaHei 6.31 以 Type0 / CIDFontType2 子集内嵌；无外部照片/第三方表现图 | 可随投稿分发/打印；图内比例和 provisional 警示必须保留；字体不得抽取为独立文件 |
| `drawings/a0-boards.en.pdf` | 2 页；与中文展板同源、英文排版 | 同上 | 同上 |

PDF 对象检查显示 A0 的 `MicrosoftYaHei` / `MicrosoftYaHei-Bold` 与 A3 的 `MicrosoftYaHei-0` 均为嵌入子集；A3 的 `/Helvetica` 为未嵌入的标准字体引用。PDF 不是施工图、法定规划图或官方现状图，里面的 OSM、比例尺和条件剖面不能升级为权属、红线或工程证据。

## 4. 两份 report HTML 与两份 visual HTML

| 路径 | 来源/代码 | 字体、图片和网络 | 权利与替换触发 |
| --- | --- | --- | --- |
| `report/proposal.html` | 由中文 `proposal.md` 经仓库 `scripts/render_proposal_html.py`（本次核对 SHA-256 `b2b8802978e6902def9b60c157efadefaa4777fdf77af19c636b2960bec3d959`）渲染 | 只引用本包中文 PNG 与共享本地 Noto Sans SC 子集；无 CDN、远程字体、iframe、表单、追踪或脚本 | 文本/图件权利随其源资产；渲染器由仓库为投稿流程提供，但仓库未见统一 LICENSE，故不对其代码授予额外开放许可；离开本征集复用模板前须由维护者确认许可或替换 CSS 包装 |
| `report/proposal.en.html` | 由 `proposal.en.md` 经同一仓库渲染器生成 | 只引用英文 PNG 与同一共享本地字体资产；无远程依赖 | 同上；必须与中文权利说明和来源等级保持等义 |
| `visual/index.html` | 本地 `tools/professional_package.py` 生成的投稿专用 HTML/CSS；没有外部框架或复制的网页模板 | 只引用本包中文 PNG 与共享本地字体；无 CDN、远程瓦片、API、脚本、iframe、表单、追踪或自动播放 | 参与者原创声明；未授予独立于本投稿/公告条款的开放源码许可。若加入第三方库、图标、地图或媒体，须先新增逐资产许可记录，否则移除 |
| `visual/index.en.html` | 与中文 visual 同源的英文输出 | 只引用英文 PNG 与同一共享本地字体资产；无远程依赖 | 同上 |

`assets/media/`、自定义封面、视频、音频、音乐、Three.js、外部图标库和远程 Web 组件均未进入本版提交；因此不存在未登记的媒体演员、声音、音乐或运行时许可。

## 5. GeoJSON、Markdown 与结构化设计数据

| 路径/类别 | 来源与权利状态 | 允许用途 | 限制/替换触发 |
| --- | --- | --- | --- |
| `geometry/site_boundary.geojson`、`geometry/key_areas.geojson` | 来自仓库维护者的 `brief/site-package/geometry/provisional_boundaries.geojson`；许可摘要是为本征集 intake、生成、离线可视化和讨论提供的 provisional repository data。仓库无统一 LICENSE，故不主张其可被无限制移作他用 | 本项目的临时生成边界、图示和低置信度概念比较 | 不是官方红线、精确边界或法定面积依据；官方 polygon 到位即整体替换并重算全部派生物 |
| `geometry/land_use.geojson`、`buildings.geojson`、`roads.geojson`、`green_space.geojson`、`public_space.geojson`、`phasing.geojson` | 由参与者概念模型脚本 `tools/rebuild_spatial_model.py`（SHA-256 `ce676a34e4ee6ddbb5d35b107fc1fb4670c31a459aa9c91f6e2948c792a2f782`，未随投稿分发）从 provisional 范围确定性派生；**不吸附、不抄取 OSM 建筑或道路线位** | 本提案内部拓扑、面积复算、方案比较和解释 | 参与者原创声明，不是测绘、现状资产、地块、权属、拆改留、法定控制或工程线位；正式资料或方案变化即重建 |
| `geometry/constraints.geojson` | 空的数据缺口层，仅登记“尚无可核约束数据” | 告知评审当前不能下结论 | 空层不得解释为没有轨道、文保、管线、洪涝、消防或其他约束；正式约束到位即替换 |
| `metrics.json`、矩阵、`assumptions.json` | 参与者对上述提交 GeoJSON 的公式、统计和证据映射；部分事实依据来自 `sources.json` | 机器复算和审计 | 数据/公式变化须同步刷新；案例或政策引用不授予复制来源页面图片的权利 |
| `proposal.md`、`proposal.en.md`、`report/narrative.md` | 参与者在第 1 节所列 AI 环境辅助下编排的方案文本；英文稿为同源翻译，第三方事实只作摘要并通过 `sources.json` 标识来源，没有复制来源页面图片或版式 | 按第 0 节的参与者原创声明和项目内使用边界处理；事实来源本身仍归各发布者 | 未另授开放许可；文本或来源变化须同步双语稿、HTML、引用和台账，不得把摘要改成无出处的长篇复制 |
| `agent.json`、`manifest.json`、`self_check.json`、`compliance_matrix.json`、`standard_matrix.json`、`design_depth_matrix.json`、`sources.json` | 参与者/AI 辅助形成的身份、文件哈希、自检、证据映射和来源元数据；不内嵌第三方页面正文、图片或版式 | 用于本投稿的机器校验、审计与来源追溯 | 机器可读不等于另授开放许可；任何资产、结论或来源记录变化均须刷新相应元数据，不能保留失效哈希或把来源链接写成转载授权 |

结构化文件的参与者部分没有另行声明开放数据许可；本项目展示、评审和深化以第 0 节为边界。任何人在本项目之外再发布这些文件前，应先确认参与者/主办承办主体的权利安排，而不是从 GitHub 可下载性推断许可。

## 6. OSM / Overpass 开放数据台账

- 来源记录：`sources.json#DATA-SRC-OSM-OVERPASS-CONTEXT-20260821`；发布者为 OpenStreetMap contributors，经 Overpass API 获取，访问日期 2026-08-21，OSM 基准时间 `2026-08-20T20:52:15Z`，查询 bbox 为 `39.936,116.3365,40.0295,116.3585`。
- 本地采集脚本：`tools/fetch_osm_context.py`（SHA-256 `f9715898d340c004a93475412c26f6ea24e706263db63c32d125b1635e797883`，未随投稿分发）；作者工作区缓存 `data/osm-context.geojson` 含 4,940 项查询/清洗结果，**缓存和原始 Overpass 响应均未放入投稿包**。
- 许可证：[OpenStreetMap Copyright and License](https://www.openstreetmap.org/copyright)；数据库法律文本为 [Open Data Commons ODbL 1.0](https://opendatacommons.org/licenses/odbl/1-0/)。必须显示 `© OpenStreetMap contributors`，并说明数据按 ODbL 1.0 提供。
- 本版只把 OSM 转成低对比静态背景，属于用于解读方案的 Produced Work；未把 OSM 数据写入提交 `geometry/*.geojson` 或 metrics。静态图/PDF 保留简短署名，本台账提供完整许可 URL。若将某张图脱离整包用于无链接的独立印刷，应在同页或紧邻说明中补上 `https://www.openstreetmap.org/copyright`；若未来分发原始提取、实质性提取或派生数据库，则须另行随数据提供 ODbL 许可/URL、保留通知并履行适用的相同许可义务。
- 图件程序只对少量 `BASE_TRANSIT_POINT` 显示普通地名/站名文本；商业建筑名、`brand` / `operator` 标签和商标图形没有作为标签或 Logo 绘制。OSM、站名和机构名只作描述性识别，不表示权利人赞助、认可或合作。
- OSM 的覆盖、分类、位置和现势性未经现场/官方/专业测绘核验；任何版权投诉、数据删除请求、署名缺失或与官方资料冲突，均触发删除相关背景并重新生成，而不是继续传播有争议像素。

## 7. 字体嵌入、分发与替换规则

| 字体/资产 | 使用路径与核验结果 | 许可与再分发 | 禁止事项/替换触发 |
| --- | --- | --- | --- |
| Microsoft YaHei 6.31（Windows `msyh.ttc` Regular + `msyhbd.ttc` Bold） | 14 张 PNG 中为已栅格化词句；4 份 PDF 中只嵌入所用字形子集。已分别核对常规体和粗体 TTC：name table 记载 `© 2024 Microsoft Corporation`、部分字形 `© 2024 Beijing Founder Electronics Co. Ltd.`；两者 `OS/2.fsType=0x0008`，即 Editable embedding，且均未设置 no-subsetting 位 | 微软 [Font redistribution FAQ](https://learn.microsoft.com/en-us/typography/fonts/font-faq) 允许把 Windows 字体用于图形输出，并在应用遵守 OpenType/TrueType 嵌入标志时嵌入文档；[OpenType OS/2 规范](https://learn.microsoft.com/en-us/typography/opentype/spec/os2#fstype) 将 `0x0008` 定义为可编辑嵌入。本投稿仅分发图形输出和 PDF 子集，两个 TTC 均未分发 | 不得从 Windows 复制 TTC 到仓库/服务器，不得转 WOFF/WOFF2、自托管、拆出后另行分发或修改。若源字体版本/许可/`fsType` 改变、PDF 不再是文档嵌入、或需要网页自托管，立即改用已核对的开放字体并重生成 |
| Helvetica（PDF 标准 14 名称） | 仅 A3 的 ASCII 文本引用 `/Helvetica`，PDF 检查显示没有嵌入字体程序 | 没有从本机复制或再分发 Helvetica 字体文件；查看器自行提供标准字体或替代字体 | 不得把字体名引用解释为 Helvetica 字体授权；如要求 PDF/A 或完全离线同字形复现，应以 Noto 开放字体重新生成并嵌入 |
| `visual/assets/lucid-sans-sc.woff2.css`（Noto Sans SC 2.004 子集；Adobe Source Han Sans / Noto CJK 系列的 Google Fonts 品牌版本） | 一份共享本地 CSS 资产内嵌 base64 WOFF2，供 `report/proposal*.html` 与 `visual/index*.html` 离线使用；子集由 Python 3.10.11、fontTools 4.63.0、Brotli 1.1.0 生成，覆盖当前双语文本及 GB2312 基础字符。最终 CSS：2,704,542 bytes，SHA-256 `4e96c12d9022a5d21eb6506efae5955d7e59f8088c1529e031b410a53ceb1a22`；内嵌 WOFF2：2,024,836 bytes，SHA-256 `9d9f45950fae19f2340eaac322b25833d3f591f7f748cd4b84b13bcf71d36535` | 上游固定为 Google Fonts [`ofl/notosanssc`](https://github.com/google/fonts/tree/ec626514f79f831f1ab848a82114a0ce7e2d6372/ofl/notosanssc) commit `ec626514f79f831f1ab848a82114a0ce7e2d6372`；原 TTF SHA-256 `a3041811a78c361b1de50f953c805e0244951c21c5bd412f7232ef0d899af0da`，官方 OFL SHA-256 `1c05c68c34f9708415aada51f17e1b0092d2cea709bf4a94cd38114f9e73d7d9`；字体 nameID 16 为 `Noto Sans SC`，版权为 `Copyright 2014-2021 Adobe (http://www.adobe.com/), with Reserved Font Name 'Source'`；许可为 [SIL Open Font License 1.1](https://github.com/google/fonts/blob/ec626514f79f831f1ab848a82114a0ce7e2d6372/ofl/notosanssc/OFL.txt)。CSS 文件头完整保留上游 OFL 文本，字体 nameID 0/13/14 保留版权、许可名称和 URL，`OS/2.fsType=0`。OFL 允许使用、嵌入、修改和随作品再分发；字体不得单独售卖，修改版不得使用被保留名称，且字体本身不能改换其他许可。OFL 不传染使用该字体生成的文档 | 不得删除 CSS 文件头的版权/OFL、不得把字体本体改授参与者许可、不得单独售卖；若子集缺字、name table/OFL 丢失、官方源或哈希不匹配，停止发布并从同一固定源重新子集或替换为另一已清权开放字体 |
| CSS 系统回退名 | HTML 的后备栈可列出 `system-ui`、Segoe UI、Arial、sans-serif；这些名字只在用户设备已有字体时由浏览器调用 | CSS 中列出字体名不复制字体文件，也不构成网页自托管 | 不得把 Windows 字体文件随网页捆绑；本地 Noto 子集应保持首选以保证 Linux/离线中文可读 |

## 8. 代码、构建工具与依赖许可

以下工具只存在于作者/审计环境，**没有把其源码、wheel、DLL、字体文件或可执行文件复制进投稿包**。记录它们是为了可复算和许可审计；使用这些工具生成的 PNG/PDF/GeoJSON 不会自动继承工具的源码许可。

| 工具/版本 | 用途 | 许可证/来源 | 随包再分发 |
| --- | --- | --- | --- |
| Python 3.10.11 | 运行所有本地生成与检查脚本 | PSF License，[Python license](https://docs.python.org/3/license.html) | 否 |
| Requests 2.32.3 | 调用 Overpass API | Apache-2.0，[psf/requests v2.32.3](https://github.com/psf/requests/tree/v2.32.3) | 否 |
| Matplotlib 3.10.9 | 14 张 PNG 和 A0 矢量 PDF | Matplotlib License Agreement 1.3.0+，[license](https://matplotlib.org/stable/project/license.html) | 否 |
| Pillow 10.1.0 | PNG sRGB/压缩、A3 嵌图准备 | HPND，[Pillow 10.1.0](https://github.com/python-pillow/Pillow/tree/10.1.0) | 否 |
| pyproj 3.7.1 / PROJ 9.5.1 | EPSG:4326 ↔ EPSG:4548 转换 | MIT，[pyproj](https://github.com/pyproj4/pyproj/tree/3.7.1) / [PROJ](https://github.com/OSGeo/PROJ) | 否 |
| Shapely 2.1.2 / GEOS 3.13.1 | 几何生成、裁切、拓扑、相交剖面 | BSD-3-Clause / LGPL-2.1-or-later，[Shapely](https://github.com/shapely/shapely/tree/2.1.2) / [GEOS](https://github.com/libgeos/geos) | 否 |
| ReportLab 5.0.1 | A3 PDF 版式与文档字体子集 | BSD License，[ReportLab](https://www.reportlab.com/) | 否 |
| fontTools 4.63.0 / Brotli 1.1.0 | Noto Sans SC WOFF2 子集化和压缩 | MIT / MIT，[fontTools](https://github.com/fonttools/fonttools/tree/4.63.0) / [Brotli](https://github.com/google/brotli/tree/v1.1.0) | 否；只分发 OFL 字体子集 |
| `scripts/render_proposal_html.py` | 从 Markdown 生成两份 report HTML | 仓库维护者提供、仅使用 Python 标准库；本次未发现仓库根 LICENSE | 不分发脚本副本；当前输出仅按本征集流程使用。若离开本项目复用其 HTML/CSS 模板，须先由维护者确认许可或替换模板 |
| `tools/fetch_osm_context.py`、`rebuild_spatial_model.py`、`professional_package.py` | OSM 背景、空间模型、图件/PDF/visual 的本地确定性生成链 | 为本提交在用户工作区编写；SHA-256 见本台账 | 未列入 manifest、未随包再分发；如脚本遗失，现有输出仍可审查但不能宣称完整可重建，须恢复脚本或降低复现声明 |

HTML 内没有第三方 JavaScript、Node 包、地图 SDK、Canvas/WebGL 运行时、图标字体或分析追踪代码；因此本版不存在未登记的前端运行时许可证。

## 9. 商标、肖像、第三方内容与文本引用

- **人物与肖像**：14 张 PNG、4 份 PDF 和 4 份 HTML 不含人物照片、合成人像、可识别声音或人物形象；不存在肖像授权书。任何未来加入的人物/声音必须先取得可公开、可再分发的书面授权并逐文件登记，否则移除。
- **第三方图片/图形**：没有外部照片、效果图、论文图像、历史影像、商业底图、第三方图标、企业 Logo 或他人方案图面。`sources.json` 中的政策、新闻和案例页面只作为事实/背景引用，页面图片和版式没有复制进投稿。
- **名称与机构**：OpenStreetMap、Overpass、Microsoft、Noto、Google Fonts、GitHub、城市/高校/案例名称仅用于来源、工具或事实性指称，不表示赞助、合作或背书；未使用其图形商标。
- **本提案名称/字标**：`京张明带·数字山水`、`THE LUCID SHANSHUI`、`明责·明界·明退`、双轨字标与配色是参与者概念方向，未标注 `®` 或 `™`，也没有把第三方企业标识作为组成部分。当前**未完成 CNIPA 或其他法域的正式商标可注册性/近似检索**；它们可用于本次概念评审，但在商业运营、商品服务、域名或长期品牌启用前必须由人类完成指定类别检索。发现近似权利、异议或混淆风险时立即更名/重绘，不得把“原创命名”写成“已获商标权”。
- **竞赛与再利用边界**：官方公告第 8.1 条要求应征人保证第三方权利并规定主办/承办方、应征人的项目内使用和展示边界。本台账没有替参与者或主办方扩大、放弃或重新解释这些权利。

## 10. 发布前权利闸门与处置顺序

- [x] 14 张 PNG 路径、生成链、OSM 成分和字体像素来源已登记；无 EXIF/位置元数据。
- [x] 4 份 PDF 的页数、生成器、嵌入字体与非嵌入标准字体已检查。
- [x] 2 份 report HTML 和 2 份 visual HTML 不加载远程内容，且共享本地 OFL 字体资产。
- [x] OSM 快照、查询、许可、署名、未随包分发的数据库缓存和再分发触发已登记。
- [x] 未发现照片、肖像、声音、视频、第三方 Logo、论文图像、商业地图瓦片或外部前端库。
- [ ] 提交者/维护者仍须在合并或公开精选前，按各自流程确认现实世界权属、公告条款适用和本台账与当前 manifest SHA 一致。
- [ ] 概念品牌在商业/长期运营启用前仍须完成指定类别和法域的正式商标检索；在此之前不得宣称注册或独占权。

处置顺序固定为：**暂停传播相关资产 → 保留证据与版本哈希 → 核对权利人/许可/来源 → 能补证则补证并重生成 → 不能补证则删除或替换 → 刷新 manifest 与 self-check → 再申请人工版权复核**。任何权利异议不以“AI 生成”“公开网页可访问”或“GitHub 可下载”为免责理由。
