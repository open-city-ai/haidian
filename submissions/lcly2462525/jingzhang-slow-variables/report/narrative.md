# 京张慢变量

城市里同时走着两只钟。AI 按季度更新，树荫、土壤、无障碍、街区业态和儿童独立出行要用数年才显出变化。1909 年詹天佑用"人"字形线位让列车爬上关沟——速度要向坡度低头；今天 AI 进入同一条走廊，快的是模型，慢的是城市。本方案允许技术快速小试，只有通过 G1 数据安全、G2 现场人工复核、G3 公众异议处理、G4 慢变量不恶化四道放行门，才获得扩大资格。

众智园负责把数字测准，AI 原点让异议停下来，大钟寺检查承诺有没有兑现。能复算的设计量全部给出，五类慢变量（SV-01 至 SV-05）保持"待一年基线"。完整判断、空间证据与数据边界见 `proposal.md`、GeoJSON、metrics、三份专业矩阵和双语图纸。

---

## 附录：中英等价与交付完整性审计（v1.2 自审）

审计时间：2026-08-14（v1.2 复核 A0 重排后）｜ 审计人：排版与字体子任务代理
范围：`assets/figures/` 12 张图件、`visual/` 两份 HTML、`drawings/` 四份 PDF、`metrics.json` 与 `proposal.md` / `proposal.en.md` 的指标引用。
所有行均给出验证方式，结果全部为 PASS。本文件可复核：每条验证方式都可原样重跑。

## 1. 图件 zh/en 逐对（12 张）

验证方式：`PIL.Image.open().load()` + `Image.verify()` 解码验证；比对像素尺寸；md5 前 12 位比对（不同即确为两个版本）；图内标题/结构经 A0/A3 缩略图逐页目视核对等义。

| 图件 | 尺寸 zh = en | 内容等义 | md5 zh ≠ en（两版确证） | 结果 |
|---|---|---|---|---|
| site-overview.png / .en.png | 2400×1500 = 2400×1500 | 同一底图与版式，仅语言替换 | 41cd0d5ff0c0 / 885c40f7d81d | PASS |
| land-use-structure.png / .en.png | 2400×1500 = 2400×1500 | 同上 | 5c15b64604c5 / 35190a9d95a7 | PASS |
| key-areas.png / .en.png | 2400×1500 = 2400×1500 | 同上 | 424b45d65393 / 495758205daa | PASS |
| slow-variable-section.png / .en.png | 2400×1500 = 2400×1500 | 同上 | 8837f39d7b73 / f2f9852cca07 | PASS |
| mobility-bluegreen.png / .en.png | 2400×1500 = 2400×1500 | 同上 | db256e188e11 / 2a8d4efecc4f | PASS |
| metrics-evidence.png / .en.png | 2400×1500 = 2400×1500 | 同上 | 18e5dd214d62 / 2d4467a8cc6d | PASS |

12 张 PNG 全部通过 `load()` + `verify()`，无截断、无坏块。zh/en 同由 `fig01–06` 各脚本以同一数据源（geometry/*.geojson、metrics.json）生成，仅文案语言不同。

## 2. visual/ 两份 HTML 栏目对应

验证方式：正则提取 `<section id>` 序列与全部 `<h2>` 文本，逐一比对。

| section id | zh 标题 | en 标题 | 结果 |
|---|---|---|---|
| clocks | 两只钟，五类慢变量 | Two Clocks, Five Slow Variables | PASS |
| gates | 四道放行门 | Four Exit Gates | PASS |
| structure | 一条时间主脊，三座工场 | One Time Spine, Three Civic Yards | PASS |
| scenarios | 十二张场景卡，七类使用者 | Twelve Scenario Cards, Seven User Groups | PASS |
| metrics | 核心指标｜指标仪表盘 | Core Metrics: Re-computable, and Honestly Blank | PASS |
| phasing | 更新项目与分期｜把分期写成四季 | Renewal Projects and Phasing, Written as Four Seasons | PASS |
| honesty | 诚实与边界 | Honesty & Boundaries | PASS |

section id 序列完全一致（7 = 7）；副标题（英文 kicker）两版逐字相同。en 页保留 8 个 CJK 字符（京张慢变量 / 中文 / ｜），已随字体子集内嵌覆盖。

## 3. A0 / A3 图纸 zh/en 页数与尺寸对应

验证方式：`pypdf.PdfReader` 读取页数与 mediabox（pt→mm 换算）；`pdftoppm` 渲染 16 页缩略图逐页目视。

| 文件 | 页数 zh = en | 页面尺寸 | 结果 |
|---|---|---|---|
| a0-boards.pdf / .en.pdf | 2 = 2 | 1189.0×841.0 mm（A0 横版） | PASS |
| a3-booklet.pdf / .en.pdf | 6 = 6 | 420.1×296.9 mm（A3 横版） | PASS |

页面内容对应：A0-1 概念与结构 ↔ Concept & Structure；A0-2 深度与证据 ↔ Depth & Evidence；A3 P1–P6 概念/结构/工场/剖面/移动/指标分期逐页对应。四份文件均 ≤ 3MB（1.77–2.58MB）。

v1.2 备注：A0 两页经第二轮重排——页眉右区分别填入「指标速览 METRICS AT A GLANCE」（A0-1）与「合规快照 COMPLIANCE SNAPSHOT」（A0-2）面板，两只钟面板右半加总诀金句块、放行门/留白清单行右端加状态标签（默认否定 DEFAULT·NO / 待补 PENDING）；整页重栅格化 dpi 75→110，图流 JPEG 重压缩（pikepdf），面板正文与注记字号整体上调一档。重排后中英 4 页缩略图逐页复查无大留白、无裁切、无溢出。

## 4. metrics.json 指标在 proposal.md / proposal.en.md 中引用一致

验证方式：按 metrics.json 的 value 派生展示值，在两份 proposal 中 grep 计数比对。

| 指标 | metrics.json 值 | proposal.md | proposal.en.md | 结果 |
|---|---|---|---|---|
| site_area_sqm | 11412825.386 → 11.41 km² | 「11.41」×1 | "11.41" ×1 | PASS |
| building_footprint_area_sqm | 310807.184 | 「31.08 万㎡」×1 | "310,800 m²" ×1（等价表达） | PASS |
| green_ratio | 0.123423 → 12.34% | 「12.34」×1 | "12.34" ×1 | PASS |
| public_space_ratio | 0.073944 → 7.39% | 「7.39」×1 | "7.39" ×1 | PASS |
| floor_area_ratio | unknown（留白） | 「容积率」×4，均标注待正式数据 | "FAR/far" ×5，均标注 awaiting official data | PASS |
| key_area_count | 3 | 「重点区」×4、三工场表述一致 | "Key Area"/"civic yard"/"workshop" 对应表述 | PASS |
| scenario_card_count | 12 | 「十二张」×1 + 「12 张」×1 | "Twelve" ×2 + "12 scenario cards" ×1 | PASS |
| industry_test_count | 3 | 「产业测试」×2 | "industry test" ×2 | PASS |
| slow_variable_count | 5 | 「五类」×12 + 「五个」×1 | "five/Five slow" ×6（全文 17 处 slow variable） | PASS |
| exit_gate_count | 4 | 「放行门」×9；G1×2 G2×1 G3×1 G4×2 | "release gates / four gates" 表述；G1×2 G2×1 G3×1 G4×2（编号计数逐字相同） | PASS |
| slow_variable_baseline | unknown（一年基线后设定） | 「基线」×17 | "baseline/Baseline" ×19 | PASS |

## 5. 附：字体内嵌等价性

验证方式：`embed_font.py` 对两份 HTML 各自按实际用字子集化；playwright 经本地 http server 截图；另将字体栈改为仅嵌入字体的副本截图，与正常截图一致。

| 文件 | 子集字符数（CJK） | woff2 / base64 | 文件增量 | 结果 |
|---|---|---|---|---|
| visual/index.html | 795（691） | 190.9 KB / 254.5 KB | +255.8 KB | PASS |
| visual/index.en.html | 112（8） | 28.5 KB / 38.0 KB | +39.3 KB | PASS |

两版注入的字体栈规则相同（--serif/--sans 栈首、--mono 栈 Menlo 之后），渲染验证一致，HTML 保持完全离线。
