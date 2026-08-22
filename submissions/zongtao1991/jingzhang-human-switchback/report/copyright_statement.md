# 版权、生成方式与使用边界声明

1. **责任主体**：本提交由 `zongtao1991` 决定并负责提交。原始概念与早期文本由 WorkBuddy / GLM-5.2 辅助生成；本轮空间模型、双语叙事、证据矩阵、图纸系统与质量审查由 OpenAI Codex 在本地工作区协助重构。智能体输出不替代提交者判断，也不构成审批、工程或法律意见。
2. **空间数据与指标**：`geometry/*.geojson`、`metrics.json`、`sources.json` 与 `assumptions.json` 由公开或仓库许可数据、明确标注的临时边界及本次概念设计模型整理。所有可计算面积统一在 EPSG:4548 下复算；法定红线、控规指标、现状建筑、权属、市政、地形水文等缺口继续保持 `provisional` 或 `unknown`。
3. **OSM 背景证据 / OSM context evidence**：本轮图件中的低对比背景来源为 OpenStreetMap contributors / Overpass API，访问日期为 2026-08-21，按 ODbL 1.0 使用并保留 © OpenStreetMap contributors 署名；查询范围、时间戳、选择器与处理方法登记于 `sources.json`。它只承担背景辨识与现状调查提问，不是测绘、现状普查、地籍/道路/轨道红线、控规图则、审批底图或工程依据；覆盖完整性、位置精度与现势性须由现场、官方资料或专业测绘核验。 / The subdued OSM background in this drawing set comes from OpenStreetMap contributors / Overpass API, accessed 2026-08-21 and used under ODbL 1.0 with © OpenStreetMap contributors attribution; its query extent, timestamp, selectors and processing method are registered in `sources.json`. It supports background orientation and existing-condition questions only; it is not a survey, inventory, cadastral/road/rail redline, regulatory-plan map, approval base, or engineering input, and its coverage, positional accuracy, and currency require field, official, or professional verification.
4. **正式分析图**：`assets/figures/` 中 7 组中英文图（共 14 张）由提交包 GeoJSON、metrics 与上一项署名的 OSM 背景快照程序化绘制，不包含外部照片、历史影像、第三方商标或 AI 场景渲染。OSM 仅作背景，机器空间结论仍以提交 `geometry/*.geojson` 与 `metrics.json` 为准。
5. **A3/A0 图册**：`drawings/` 中 4 份 PDF 由同一数据与中英文图件确定性排版生成。图内比例尺仅用于投影后的概念模型阅读；条件断面明确标为 NTS，不冒充施工图、工程详图或法定规划图。
6. **可视化页面**：`visual/index.html` 与 `visual/index.en.html` 是离线静态 HTML；正式生成时仅引用包内分析图，无 CDN、追踪、远程字体、表单、网络请求或自动播放。
7. **已清理素材**：旧版 AI 情绪图、场景卡、形态学拼贴、概念重复图及带虚假工程图框或比例的表现资产，因不属于可核验规划证据且不再被正式成果引用，已从提交包删除；本声明不主张存在未随投稿发布的恢复副本。
8. **字体**：图件与 PDF 使用本机 Microsoft YaHei 或可用系统无衬线字体进行文本渲染；PDF 仅嵌入输出所需字体子集，不分发独立字体文件。
9. **脚本与可复算性**：本地工作区使用 `tools/rebuild_spatial_model.py` 与 `tools/professional_package.py` 生成空间模型和专业成果，但脚本不作为投稿资产宣称。投稿包内的 GeoJSON、metrics、矩阵、来源与假设记录构成可审查证据链。
10. **使用限制**：本成果是概念性城市设计建议，不是官方现状、法定控制、建设许可、拆改决定、施工图或投资承诺。正式数据发布后，应整体替换临时边界并重新计算全部精确模型值。
