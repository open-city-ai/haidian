# Copyright Statement / 版权声明

本提交包（submission package）的全部原创内容采用 **CC-BY-4.0** 许可，包括：

- `proposal.md` 与 `proposal.en.md` 原创方案文字、叙事及完整英译
- 八组 `assets/figures/*.png` 与 `*.en.png` 原创数据图解，由提交 GeoJSON、OSM 现状语境、公开资料与指标确定性生成，没有使用商业地图截图
- `assets/figures/three-courtyards-concept.png` 为本轮通过 OpenAI 图像生成工具制作并人工筛选的原创概念场景，没有输入第三方参考图；它采用 CC-BY-4.0，只表达空间气氛，不承担现状、文保、边界或工程证据
- `geometry/*.geojson` agent 设计图层（由同一 provisional 边界确定性切分生成）
- `spatial.json` 与 `visual/assets/open-belt-program.json` 原创机器可读概念索引与方案账本
- `visual/assets/osm-context-*.json` 是由 OpenStreetMap / Overpass 提取、筛选并分层保存的语境层，采用 ODbL 1.0，不纳入本方案 CC-BY-4.0 原创许可
- `report/proposal*.html`、`visual/index*.html` 原创离线中英文 HTML
- `drawings/a3-booklet*.pdf`、`drawings/a0-boards*.pdf` 原创中英文图纸（解释层）

## 权利边界

- 仓库 `brief/site-package/geometry/provisional_boundaries.geojson` 的临时边界数据不被本方案重新许可，权利归 open-city-ai/haidian 仓库及其来源方。
- 外部网页来源（官方公告、规划、文保、水务、交通、统计、国际案例、NIST/UNESCO/PIPL/WCAG 等）保留各自权利；除下列明确清权照片外，本包不嵌入其照片、地图截图、商标或远程资产，只作事实与机制引用。
- `assets/reference/qinghuayuan-station-2024.jpg` 源自 Wikimedia Commons 文件 `IPKR Chinghuayuan Station after renovation (20240331102606).jpg`，作者 N509FZ，采用 CC BY-SA 4.0。本包只做裁切以避免无关人物成为画面主体；该裁切版本继续采用 CC BY-SA 4.0，并在 HTML、A3/A0 和 `sources.json` 中署名与标注修改。
- `assets/figures/three-courtyards-concept.png` 由 OpenAI 内置图像生成工具根据本方案文字提示生成。图中人物、设施和空间均为概念想象，没有对应真实个人，也不表示项目已经建成或获得批准。
- `visual/assets/osm-context-*.json` 及其派生背景线来自 © OpenStreetMap contributors，采用 ODbL 1.0；通过 Overpass API 于 2026-08-08 提取。查询、bbox、日期、分层转换说明和原始响应 SHA-256 均保存在同目录 JSON。OSM 仅作背景制图与概念分析，不作为官方红线、权属、法定控制、竣工保证或精确面积来源。
- PNG 图件采用 macOS 系统黑体完成本地栅格化；PDF 文本嵌入系统提供的 Arial Unicode 字形，仅用于成果排版，不对字体本身重新许可。HTML 不打包字体文件，使用本机字体回退栈。
- 本方案不使用企业标识或未授权品牌图形；清华园照片裁切后仅保留极小的公共场所偶然人物，不进行身份识别、人物分析或肖像性使用。
- 命名「京张开源带 JZ·OPEN」与视觉识别方向为概念建议，不申请商标；本版不声称拥有独立注册 Logo。

## 生成方式披露（agent.json）

- 文字与设计候选由 AI 协助生成；来源选择、许可证、概念方向与远端发布由人类用户决定。
- 几何和指标由 shapely 与 pyproj 复算；八组技术图件由 Pillow 从同一提交数据绘制，PDF 使用 ReportLab 排版。OSM 只进入现状语境层，概念场景图单独披露生成方法。

## 边界声明

所有空间建议均为「概念建议」「参考方案」或「可供专业团队深化研究」，不构成法定规划、审批、工程、权属、投资或政府承诺。临时边界（provisional）不视为官方红线，官方 polygon 到位后须整体重算并更新全部图层、指标、图纸与 HTML。
