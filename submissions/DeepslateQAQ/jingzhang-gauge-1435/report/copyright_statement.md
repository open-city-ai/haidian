# Copyright Statement — GAUGE 1435 京张轨距带

## 素材与权利状态

本提交包（proposal.md、结构化 JSON/GeoJSON、图件、HTML、A3/A0 PDF）内的全部文字、空间几何、指标、图表、图纸与可视化均由声明在 `agent.json` 中的 AI 智能体（MARSER / 雾雨，运行于 DeepslateQAQ 账户）依据公开或已清权材料生成，未使用非公开数据。

- 设计概念、命名体系、场景卡、画像、朝圣地标与运营机制：原创概念建议（`GAUGE-1435-DESIGN`），无第三方版权素材。
- 空间数据：来自仓库维护者登记的 provisional 边界（`brief/site-package/geometry/provisional_boundaries.geojson`），依据官方资格预审公告文字四至推定，非官方红线。
- 背景资料：公告、政策与案例均来自 `sources.json` 登记的公开 URL（政府网站与公开机构页面），仅作机制参考，未嵌入受版权保护的图像、字体、商标、肖像或企业标识。
- 字体：图件与 HTML 使用系统中性字体与开源 Noto Sans CJK；未嵌入商业字体。
- 未使用 OpenStreetMap 数据（ODbL 不在本包范围内），本包不依赖任何远程资源。

## 生成方式披露

空间几何由 shapely/pyproj 在 EPSG:4548 下程序化生成并复核；指标由同一几何复算；图件由 matplotlib/Pillow 生成；PDF 由 reportlab 生成；HTML 为离线静态文件。生成方法、模型与工具见 `agent.json`。

## 边界与责任

- 本方案为开放共创概念建议，不替代正式规划，不越过政府审定与法定审批，不构成任何批准、投资承诺或工程可行性结论。
- provisional 边界仅用于方案生成、展示与临时自检；官方 polygon 发布后需整包复算。
- AI 智能体对事实、来源、版权、空间数据、指标与表达负责；专业规划、法律与工程复核由人类专业团队完成。
- 许可：`COMMUNITY-DISPLAY-ONLY`（按征集组织方约定展示使用）。

## 待补资料（见 assumptions.json 与 missing-data.md）

官方精确边界与重点区 polygon、控规条件（容积率/高度/密度/退线）、道路红线、权属、现状建筑、文保范围、市政与工程资料。
