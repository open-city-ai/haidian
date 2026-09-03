# 知识产权与资产使用授权声明 (Copyright & License Disclosures)

## 一、 方案成果总体授权 (Overall Package License)

本城市设计方案包《京张运行图 · The Jingzhang Diagram》（`submissions/Juwan-Hwang/jingzhang-diagram`）由作者 **Juwan-Hwang** 原创编制，在本次"百年京张AI创新带"开源设计竞赛框架下以 **`COMMUNITY-DISPLAY-ONLY`** 许可证发布，供组织方评审、社区公开展示及学术交流使用。`COMMUNITY-DISPLAY-ONLY` 仅覆盖下表所列的原创表达类文件（正文、图件、PDF、报告 HTML）；凡另行标注其他许可的资产（CC BY、CC0、CC BY-SA、MIT、OFL 字体）以各自许可为准，不与总体展示许可相互覆盖。

---

## 二、 逐项资产与权利清单 (Itemized Rights & Assets Schedule)

| 资产类别 | 对应路径 / 文件 | 权利归属与作者 | 授权协议 / 许可口径 | 修改与再分发条件 |
|---|---|---|---|---|
| **自绘图件** | `assets/figures/*.png` (20组双语图件) | 作者 Juwan-Hwang 以 Python matplotlib + Noto Sans SC 字体原创绘制 | COMMUNITY-DISPLAY-ONLY | 仅供本次竞赛展示与方案评估，未经许可不得商用 |
| **设计成果文本** | `proposal.md`, `proposal.en.md`, `report/*.html` | 作者 Juwan-Hwang 原创编写（HTML 由仓库 `scripts/render_proposal_html.py` 离线渲染） | COMMUNITY-DISPLAY-ONLY | 署名作者，仅供公开评审展示 |
| **内嵌字体** | `visual/assets/fonts/notosanssc-subset.css`（WOFF2 data URI 子集） | 字形版权归 Google LLC 与思源字体贡献者；由作者从 Noto Sans SC（可变字体）按本包实际用字子集化生成 | SIL Open Font License 1.1 | OFL 1.1 允许嵌入网页与文档（含本包的 CSS/PDF 嵌入），随包分发须保留 OFL 声明；不得单独售卖字体本身 |
| **PDF 展板与文本册** | `drawings/a0-boards*.pdf`, `a3-booklet*.pdf` | 作者 Juwan-Hwang 原创排版（图件 + 内嵌 OFL 字体子集） | COMMUNITY-DISPLAY-ONLY | 仅供竞赛评审与展示阅读 |
| **空间拓扑数据** | `geometry/*.geojson` (9类空间图层) | 作者依据组织方 `brief/site-package` 提供的 provisional 边界与枚举衍生编制 | CC BY 4.0 / Open Data | 标注来源，非官方规划审批红线 |
| **矩阵与指标数据** | `metrics.json`, `compliance_matrix.json` 等 | 作者依据设计方案测算编制 | CC0 1.0 Universal | 允许自由引用与复算 |
| **场景演练台账** | `simulation.json` (10项离线合成任务) | 作者基于固定随机种子离线合成 | CC0 1.0 Universal | 离线演练读数，非现场实测承诺 |
| **SEB 治理套件** | `visual/assets/seb-spec.json`, `seb-tabletop-run.js`, `jingzhang-seb-fixtures.json`, `seb-snapshot.json`, `seb-change-receipt-sample.json` | 规范与校验器快照源自社区开放贡献 SEB v0.5.0（Issue #2549，原作者署名见文件内 `attribution`）；fixtures 与收据样例由作者按本方案场景编制 | CC BY-SA 4.0 | 保留原作者署名；派生文件以同等方式共享；运行结果仅为参与者桌面自检，不构成第三方认证 |
| **可视化交互页** | `visual/index.html`, `visual/index.en.html` | 作者 Juwan-Hwang 原创开发 | MIT License | 允许开源复用，保留版权声明 |

---

## 三、 资产级来源与权利台账 (Asset-Level Source & Rights Ledger)

按评审要求逐项列出：类别（事实引用 / 第三方素材 / 自绘图 / 字体 / SEB 代码）、作者或发布者、URL 或版本、访问日期、许可原文或可引用依据、是否改编、署名位置、允许用途。全部条目与 `sources.json` 的 id 一一对应，正式可用性以组织方 registry review 结论为准；在完成登记前，本台账为投稿方来源清单（background/provisional），不作为正式清权证明。

| # | 资产 / 引用 | 类别 | 作者 / 发布者 | URL 或版本 | 访问日期 | 许可原文 / 可引用依据 | 是否改编 | 署名位置 | 允许用途 |
|---|---|---|---|---|---|---|---|---|---|
| 1 | `assets/figures/spatial-structure*.png`、`key-area-plan-*.png`、`switchback-section*.png`、`site-overview*.png`、`land-use-structure*.png`、`key-areas*.png`、`mobility-bluegreen*.png`、`metrics-evidence*.png`（20 张） | 自绘图 | 作者 Juwan-Hwang（工具：Python matplotlib；底图几何：本包 `geometry/*.geojson`，衍生自组织方 provisional 边界） | 本包内文件（无外部素材） | 2026-09-02 重绘 | 作者资产级声明：全部图件为作者原创绘制，未嵌入任何第三方地图瓦片、底图截图或受版权保护的图像素材 | 否（原创；几何数据为 provisional 衍生） | `report/copyright_statement.md` 本条 + 图件页脚来源行 | 竞赛评审展示与学术交流（COMMUNITY-DISPLAY-ONLY） |
| 2 | `drawings/a0-boards*.pdf`、`a3-booklet*.pdf`（4 份） | 自绘排版 | 作者 Juwan-Hwang（工具：PyMuPDF；内容 = 上述自绘图件 + 封面文字） | 本包内文件 | 2026-09-02 重建 | 同上，作者原创排版声明；内嵌字体见第 3 条 | 否 | 本条 | 竞赛评审展示与阅读 |
| 3 | Noto Sans SC 子集（`visual/assets/fonts/notosanssc-subset.css` 内 WOFF2 data URI；PDF 封面子集 TTF） | 字体 | Google LLC 与思源字体贡献者（子集化：作者，源版本 Noto Sans SC Variable，本机 OFL 发行版） | https://fonts.google.com/noto/specimen/Noto+Sans+SC （`FONT-NOTOSANSSC-OFL`） | 2026-09-01 | SIL Open Font License 1.1：允许使用、研究、修改、再分发与文档嵌入（"OFL allows the licensed fonts to be used, studied, modified and redistributed freely… embedded in documents"），不得单独售卖 | 是（按本包用字子集化，未改字形） | `sources.json` FONT-NOTOSANSSC-OFL 条目 + CSS 文件头注释 + 本条 | 本包 HTML/PDF 离线渲染 |
| 4 | SEB v0.5.0 规范与桌面校验器快照（`visual/assets/seb-spec.json`、`seb-tabletop-run.js`、`seb-snapshot.json`） | 第三方素材（社区开源贡献） | SEB 社区贡献者（Issue #2549，署名见文件内 `attribution` 字段） | https://github.com/open-city-ai/haidian/issues/2549 （`SEB-V0.5`） | 2026-08-31 | CC BY-SA 4.0：须署名（BY）、派生作品以相同方式共享（SA）；许可原文 https://creativecommons.org/licenses/by-sa/4.0/legalcode | 否（快照逐字节入包；版本号 v0.5.0） | 文件内 `attribution` + `sources.json` SEB-V0.5 条目 + 本条 | 桌面自检推演与第三方离线复跑；运行结果为参与者自述，非第三方认证 |
| 5 | `visual/assets/jingzhang-seb-fixtures.json`、`seb-change-receipt-sample.json` | 第三方素材之派生（CC BY-SA） | 作者按本方案 12 场景卡编制（基于 SEB v0.5.0 判据结构） | 本包内文件 | 2026-09-01 | CC BY-SA 4.0（派生文件以同等方式共享，保留原规范署名） | 是（派生编制） | 文件内说明字段 + 本条 | 同上，桌面自检 |
| 6 | 事实引用：詹天佑 1914 演说、京张高铁官方定调、1909 通车时间线、文保名录与四至 | 事实引用 | 中国科协 / 交通运输部 / 国铁集团 / 北京市政府与北京市文物局 | 见 `sources.json` AUTHORITY-*、HERITAGE-* 条目（含 URL） | 2026-08-31 | 政府与官方机构公开发布内容；引用注明出处；本包仅转载事实性表述，未复制受版权保护的全文或图纸 | 否（仅引用事实与短语文句） | `sources.json` 对应条目 + `assumptions.json` A-FACT 系列 + 正文引用标记 | 方案叙事与合规论证；史实核对为投稿者自检，待 registry review |
| 7 | 全球案例背景资料（Kendall Square、King's Cross、Station F、Mila、Superblocks、Quayside、High Line） | 事实引用（公开背景） | 各案例官方机构 / 维基百科 | 见 `sources.json` CASE-* 条目（含 URL） | 2026-09-02 | 公开网页背景资料；本包仅归纳公开机制事实并标注来源，未复制其图片、报告全文或受版权保护内容 | 否（机制归纳为作者撰写） | `sources.json` CASE-* 条目 + 正文案例对照表 | case_study_table 机制借鉴与风险教训；正式可用性待 registry review |
| 8 | `geometry/*.geojson` 九图层 | 第三方素材之派生（组织方数据） | 组织方 provisional 边界（`brief/site-package/geometry/provisional_boundaries.geojson`）+ 作者衍生设计图层 | 本包内文件（`BOUNDARY-SOURCE` / `KEY-AREA-SOURCE`） | 2026-08-10 起 | 组织方征集框架内提供的 provisional 数据，允许参与者用于生成、自检与展示；作者衍生部分以 CC BY 4.0 开放并标注来源 | 是（衍生编制） | 各 GeoJSON properties 的 source_type/source_id 字段 + 本条 | 方案生成、复算与展示；非官方红线 |
| 9 | `visual/index.html`、`visual/index.en.html` 交互代码 | 自绘代码 | 作者 Juwan-Hwang | 本包内文件 | 2026-09-02 | MIT License（保留版权声明与许可文本即可复用） | 否（原创） | 本条 | 开源复用 |
| 10 | `simulation.json`、`metrics.json`、各矩阵 JSON | 自产数据 | 作者 Juwan-Hwang | 本包内文件 | 2026-09-02 | CC0 1.0 Universal（公有领域奉献） | 否 | 本条 | 自由引用与复算 |

---

## 四、 外部引用与事实数据声明

1. **历史与官方公报**：京张高铁官方定调引自交通运输部公报（`AUTHORITY-MOT-HSR`）；詹天佑演说引自中国科协科学家精神档案（`AUTHORITY-ZHANTIANYOU`）；通车史料引自国铁集团文献（`AUTHORITY-JINGZHANG-1909`）。上述核对为投稿者自检（待 registry review），不构成组织方或第三方核定结论；
2. **文保区划数据**：清华园车站旧址与觉生寺（大钟寺）文保名录引自北京市人民政府京政发〔2025〕3号与北京市文物局主动公开名录（`HERITAGE-LIST-11TH` 至 `HERITAGE-DAZHONGSI`）；
3. **免责与边界声明**：本方案属于概念性城市设计成果，所有涉及规划审批、工程施工、文物干预及商业运营之内容，均须在取得官方正式法定规划许可后方可实施。本声明中全部"投稿方来源清单"条目在完成组织方 registry review 前均为 background/provisional 地位，不得作为正式规划依据引用。
