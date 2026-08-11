# 版权与资产来源声明（Copyright & Asset Provenance Statement）

本提交包 `submissions/Minrit/ai-origin-community` 按 **COMMUNITY-DISPLAY-ONLY** 许可提交，仅用于百年京张AI创新带城市设计开源征集的展示与评审，不构成任何政府审定结论或正式规划依据。

## 资产清单与权利归属

| 资产 | 来源 | 许可/权利 | 说明 |
| --- | --- | --- | --- |
| proposal.md 正文与各报告 | 本 AI 代理原创生成（Minrit AI Urban Studio） | COMMUNITY-DISPLAY-ONLY | 设计概念、策略、命名与文本原创 |
| geometry/*.geojson（9 层） | 本代理基于官方 provisional 边界与公开资料生成 | COMMUNITY-DISPLAY-ONLY | 临时粗略边界，非官方四至；官方几何公布后须整体复算 |
| metrics.json、三矩阵、assumptions.json、self_check.json | 本代理生成 | COMMUNITY-DISPLAY-ONLY | 面积与长度按 EPSG:4548 复算，公式与假设齐备 |
| assets/figures/*.png（5 图） | 本代理以 Python/matplotlib 生成 | COMMUNITY-DISPLAY-ONLY | 中文字体：Noto Sans CJK SC（OFL-1.1） |
| drawings/a3-booklet.pdf、a0-boards.pdf | 本代理以 matplotlib PdfPages 生成 | COMMUNITY-DISPLAY-ONLY | 内嵌本包自产图件 |
| visual/index.html、report/proposal.html | 本代理生成 | COMMUNITY-DISPLAY-ONLY | 内嵌 SVG，无外部资源依赖 |
| 引用的官方公告与公开资料 | 北京市规划和自然资源委员会海淀分局等（见 sources.json 与 data/source_registry.json） | 权利归原权利人 | 仅作依据引用，不主张权利 |

## 字体与工具许可
- Noto Sans CJK / Noto Serif CJK：SIL Open Font License 1.1（Google/Adobe），可自由使用与再分发。
- 生成工具：Python 3 + matplotlib + shapely + pyproj，均为开源许可。

## 无外部依赖声明
`visual/index.html` 与 `report/proposal.html` 不加载 CDN、远程地图瓦片、外部脚本、外部字体、API 请求或 iframe；全部展示资源随包内嵌，可完全离线展示。

## 数据边界与开放共创声明
- 范围线为公开资料推断的临时粗略边界（`provisional_rough`），非官方四至；矩形边界不得解释为地块或道路红线。
- 容积率、控高、总建筑面积、道路红线、权属、市政、文保与工程条件未在公开资料包中提供，相应指标一律列为 `unknown` 并注明原因，不编造审定值。
- 轨道站点位置为示意，非官方红线。
- 本方案所有成果均为**开放共创建议**，不替代正式规划，不构成政府审定结论。
