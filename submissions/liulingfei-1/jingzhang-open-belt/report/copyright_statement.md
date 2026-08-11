# Copyright Statement / 版权声明

本提交包的原创内容采用 **CC-BY-4.0** 许可。范围包括中英文方案、设计 GeoJSON、指标与程序数据、离线 HTML、A3/A0 PDF、`open-belt-mark.svg` 以及本版新绘的中英文图件。

## 图件与生成方式

- 本轮使用本地 Pillow 绘图流程，从包内 GeoJSON、`metrics.json`、方案程序数据与 OSM 语境层绘制十组中英文技术图。所有地图、平面、剖面、构件、标注与版式都是本包新绘，没有使用商业地图截图。
- 中英文 A3/A0 PDF 由 Pillow 和 ReportLab 编排。PNG 使用 macOS 系统字体栅格化，PDF 使用系统提供的中文 CID 字形。本包不分发可安装字体文件。
- `assets/scenes/zhongzhiyuan-test-court.jpg`、`ai-origin-service-court.jpg`、`dazhongsi-evening-court.jpg` 与 `xiaoyuehe-crossing.jpg` 分四次通过 OpenAI 图像生成工具制作，没有输入第三方参考图。四张图只表达概念气氛，不作现状、边界、权属、文保、建设状态或工程证据。图中人物与设施均为概念想象，不对应真实个人，也不表示项目已建成或获批。
- `assets/scenes/open-belt-axonometric.jpg` 由同一工具单独生成，随后作为 `ecosystem-space.png` 中英文图件的轴测底图。它把三处院落并置为一张空间语言合成图，不表示三处场地真实相邻，也不提供测绘尺度、建筑现状或工程落位证据。

## 外部资料与分层许可

- 临时边界来自仓库 `brief/site-package/geometry/provisional_boundaries.geojson`，沿用原权利和用途边界，不纳入本提交包的 CC-BY-4.0 重新许可。
- `visual/assets/osm-context-*.json` 及其派生背景来自 © OpenStreetMap contributors，采用 ODbL 1.0。本版于 2026-08-09 从 Overpass 提取三处重点区周边 516 个建筑轮廓。查询、时间、范围和限制保存在 `osm-context-buildings-query.json` 与 `osm-context-buildings-metadata.json`，原始响应 SHA-256 为 `fe262129f031b7cb73f642c3e4eaf1804459a44a4287ab42257a36d8db82a6ea`。OSM 只作背景制图和概念分析，不支撑官方红线、权属、法定控制、拆留判断、竣工状态或精确面积。
- `assets/reference/qinghuayuan-station-2024.jpg` 来自 Wikimedia Commons，作者 N509FZ，原文件名为 `IPKR Chinghuayuan Station after renovation (20240331102606).jpg`，采用 CC BY-SA 4.0。本包只做裁切，裁切版继续采用 CC BY-SA 4.0。
- 公告、规划、文保、水务、交通、统计和国际案例等外部页面保留各自权利。本包只引用事实与方法，不嵌入对方的地图截图、商标或远程资产。

## 同行方案署名

本版「9 公里 → 800 米 → 120 米」的三级尺度组织受 [Abreto 的 REN AXIS 方案](https://github.com/open-city-ai/haidian/tree/main/submissions/Abreto/ren-axis-jingzhang-ai-belt) 启发。REN AXIS 以 CC BY 4.0 发布，原方案使用 9 公里带状整体、800 米站区与 80 至 150 米街坊原型串起三个尺度。本提交只借鉴这种组织方法，全部图形、图层、标注、配色和资产均为新绘，没有复制对方的图片、SVG、PDF、几何或代码。

## 边界声明

所有空间内容均为概念建议，供专业团队继续核查和深化。它不构成法定规划、审批、工程、权属、投资或政府承诺。正式边界到位后，需重算图层和指标，并同步更新图纸与 HTML。
