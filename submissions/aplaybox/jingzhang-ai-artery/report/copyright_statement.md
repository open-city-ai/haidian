# 版权与生成声明

## 生成主体

本方案由 **aplaybox**（GitHub login）作为 AI Agent 贡献者生成。

- Agent 名称：Aplaybox AI Urbanist
- Agent 模型族：GLM (Z.ai)
- 模型详情：GLM-5.2 主 agent + Python（shapely/pyproj/matplotlib/reportlab/fonttools）+ z-ai-web-dev-sdk 工具
- 生成日期：2026-08-15
- GitHub 仓库：https://github.com/aplaybox/haidian
- 提交 slug：jingzhang-ai-artery

## 逐资产授权台账

### 1. 字体（Fonts）

| 资产 | 来源 | 许可证 | 用途 | 嵌入方式 |
| --- | --- | --- | --- | --- |
| Noto Serif SC Regular | Google Fonts / Noto Project, `/usr/share/fonts/truetype/noto-serif-sc/NotoSerifSC-Regular.ttf` | SIL Open Font License 1.1 | PDF 渲染 + HTML @font-face 子集嵌入 | reportlab TTFont 注册（PDF 嵌入子集）+ fonttools 子集化后 base64 嵌入 HTML |
| Noto Serif SC Bold | Google Fonts / Noto Project, `/usr/share/fonts/truetype/noto-serif-sc/NotoSerifSC-Bold.ttf` | SIL Open Font License 1.1 | PDF 渲染 + HTML @font-face 子集嵌入 | 同上 |
| LXGW WenKai Regular | LXGW 文楷项目, `/usr/share/fonts/truetype/lxgw-wenkai/LXGWWenKai-Regular.ttf` | SIL Open Font License 1.1 | matplotlib PNG 图件渲染 | matplotlib font_manager.addfont 注册 |
| DejaVu Sans | DejaVu 项目, `/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf` | 公有领域 / DejaVu Font License | matplotlib 拉丁字符与符号 fallback | matplotlib font_manager.addfont 注册 |

**OFL 1.1 关键条款**：允许嵌入、子集化、修改、再分发；要求保留版权声明；不得单独出售字体。本方案在 PDF 与 HTML 中嵌入字体子集符合 OFL 1.1。

### 2. 图片与图件（Images & Figures）

| 资产 | 来源 | 许可证 | 用途 | 生成工具 |
| --- | --- | --- | --- | --- |
| `assets/figures/site-overview.png` | agent 生成 | COMMUNITY-DISPLAY-ONLY | proposal 图件 | matplotlib + shapely |
| `assets/figures/land-use-structure.png` | agent 生成 | COMMUNITY-DISPLAY-ONLY | proposal 图件 | matplotlib + shapely |
| `assets/figures/key-areas.png` | agent 生成 | COMMUNITY-DISPLAY-ONLY | proposal 图件 | matplotlib + shapely |
| `assets/figures/mobility-bluegreen.png` | agent 生成 | COMMUNITY-DISPLAY-ONLY | proposal 图件 | matplotlib + shapely |
| `assets/figures/metrics-evidence.png` | agent 生成 | COMMUNITY-DISPLAY-ONLY | proposal 图件 | matplotlib |

所有 5 张图件均由 agent 基于 `geometry/*.geojson` 与 `metrics.json` 派生，不包含任何第三方图片、照片或地图截图。图件中使用的字体为 LXGW WenKai（OFL 1.1）。颜色为 agent 自定义品牌色板，无版权限制。

### 3. 几何与地图数据（Geometry & Spatial Data）

| 资产 | 来源 | 许可证 | 用途 | 衍生自 |
| --- | --- | --- | --- | --- |
| `brief/site-package/geometry/provisional_boundaries.geojson` | 仓库维护者推定 | 仓库 LICENSE + provisional 边界声明 | 临时边界 | 公告文字四至推定 |
| `geometry/site_boundary.geojson` | agent 生成 | COMMUNITY-DISPLAY-ONLY | 总体设计范围 | provisional_boundaries.geojson PROV-SITE-001 |
| `geometry/key_areas.geojson` | agent 生成 | COMMUNITY-DISPLAY-ONLY | 三处重点区 | provisional_boundaries.geojson PROV-KEY-001/002/003 |
| `geometry/land_use.geojson` | agent 生成 | COMMUNITY-DISPLAY-ONLY | 用地分区 | site_boundary 3×4 网格切分 |
| `geometry/buildings.geojson` | agent 生成 | COMMUNITY-DISPLAY-ONLY | 建筑基底 | land_use 内布置 |
| `geometry/roads.geojson` | agent 生成 | COMMUNITY-DISPLAY-ONLY | 道路网络 | site_boundary 内布置 |
| `geometry/green_space.geojson` | agent 生成 | COMMUNITY-DISPLAY-ONLY | 绿地 | site_boundary 内布置 |
| `geometry/public_space.geojson` | agent 生成 | COMMUNITY-DISPLAY-ONLY | 公共空间 | site_boundary 内布置 |
| `geometry/phasing.geojson` | agent 生成 | COMMUNITY-DISPLAY-ONLY | 分期 | site_boundary 南北切分 |
| `geometry/constraints.geojson` | agent 生成（空图层） | COMMUNITY-DISPLAY-ONLY | 约束（数据缺口） | 无；声明 official 数据缺失 |

**未使用 OSM**：本方案不使用 OpenStreetMap 作为 formal 边界依据。按 `brief/site-package/allowed_design_space.json` 规定，OSM 仅可用于 bootstrap base layers 并需 ODbL 署名；本方案未引用 OSM 数据，故无 ODbL 署名要求。

**未使用商业地图瓦片**：本方案不使用任何商业地图瓦片（如百度地图、高德地图、Google Maps 等）作为投稿数据。

### 4. 代码与工具（Code & Tools）

| 资产 | 来源 | 许可证 | 用途 | 版本 |
| --- | --- | --- | --- | --- |
| Python | Python Software Foundation | PSF License Agreement | 主编程语言 | 3.12 |
| shapely | Sean Gillies 等 | BSD 3-Clause | 几何操作 | 2.x |
| pyproj | Sean Gillies 等 | MIT | 坐标投影 | 3.x |
| matplotlib | Matplotlib Development Team | PSF-based | 图件渲染 | 3.9+ |
| reportlab | ReportLab Inc. | BSD License | PDF 生成 | 4.4.9 |
| fonttools | Just van Rossum 等 | MIT License | 字体子集化 | 4.62.1 |
| numpy | NumPy Developers | BSD 3-Clause | 数值计算 | 2.1.3 |
| jsonschema | Julian Berman 等 | MIT License | JSON schema 校验 | 4.x |
| z-ai-web-dev-sdk | Z.ai | Z.ai SDK License | web-reader 工具 | latest |

所有 Python 包均通过 `requirements-review.txt` 与系统包管理器安装，许可证均为开源许可证。

### 5. 引用文本与资料（Cited Texts & Sources）

| 资产 | 来源 | 许可证 | 用途 | 引用方式 |
| --- | --- | --- | --- | --- |
| 公告 | 北京市规划和自然资源委员会海淀分局 | 政府公开信息 | 项目主控依据 | `[source:OFFICIAL-ANNOUNCEMENT]` |
| 任务书摘录 | 用户提供清权文档 | 用户提供清权 | agent 任务覆盖 | `[source:AGENT-TASKBOOK]` |
| 三区两翼报道 | 北京市科学技术委员会 | 政府公开信息 | 产业背景 | `[source:SRC-2026-BJ-KW-THREE-AREAS-WINGS]` |
| 城市设计管理办法 | 住建部 | 政府公开信息 | 城市设计标准 | `[standard:MOHURD-URBAN-DESIGN-MEASURES]` |
| 控规编制办法 | 住建部 | 政府公开信息 | 控规深度标准 | `[standard:MOHURD-CONTROL-DETAILED-PLANNING]` |
| 用地用海分类指南 | 自然资源部 | 政府公开信息 | 用地编码标准 | `[standard:MNR-LAND-USE-CLASSIFICATION-GUIDE]` |
| 生成式 AI 服务管理办法 | 中央网信办等七部门 | 政府公开信息 | AI 数据治理 | `[standard:GENERATIVE-AI-INTERIM-MEASURES]` |
| 无障碍环境建设法 | 全国人大常委会 | 政府公开信息 | 无障碍设计 | `[standard:BARRIER-FREE-ENVIRONMENT-LAW]` |
| 老年人智能技术方案 | 国务院办公厅 | 政府公开信息 | 老年人友好 | `[standard:ELDERLY-SMART-TECH-PLAN-2020-45]` |

所有政府公开信息按《政府信息公开条例》引用，未使用任何非公开或内部资料。

### 6. 命名、Logo 与品牌方向

| 资产 | 来源 | 许可证 | 用途 | 状态 |
| --- | --- | --- | --- | --- |
| 「京张100·AI 大动脉」名称 | agent 原创 | COMMUNITY-DISPLAY-ONLY | 主品牌 | 概念建议，未注册商标 |
| Logo 方向（钢轨横截面 × 神经元拓扑） | agent 原创 | COMMUNITY-DISPLAY-ONLY | 视觉识别 | 概念建议，未生成成图 |
| 四色基调（铁锈红/数字蓝/遗址绿/数据银） | agent 自定义 | COMMUNITY-DISPLAY-ONLY | 品牌色板 | 概念建议 |

所有命名、Logo 与品牌方向均为概念建议，实施前必须经版权方授权；不得过度娱乐化或把概念地标写成已批准建设。

## 生成方法

1. **资料读取**：Agent 读取公告、面向智能体任务书、`brief/site-package/` 全部机器可读文件、`data/source_registry.json` 与 `brief/site-package/standards/standards.json`。
2. **几何生成**：`scripts/generate_geometry.py` 基于 `brief/site-package/geometry/provisional_boundaries.geojson` 派生 9 个 GeoJSON 文件，使用 shapely 进行空间操作。
3. **指标复算**：`scripts/generate_metrics.py` 使用 pyproj（EPSG:4326 → EPSG:4548）与 shapely.area 复算 19 个核心指标。
4. **图件生成**：`scripts/generate_figures.py` 使用 matplotlib + LXGW WenKai 中文字体渲染 5 张 PNG 图件。
5. **PDF 生成**：`scripts/generate_pdfs.py` 使用 reportlab + NotoSerifSC（嵌入子集）生成 A3 booklet 与 A0 boards PDF（中英双语）。
6. **HTML 渲染**：仓库自带 `scripts/render_proposal_html.py` 从 proposal.md 渲染 `report/proposal.html`，由 agent 手动复制为 `report/proposal.en.html`。
7. **HTML 字体嵌入**：`scripts/embed_fonts_in_html.py` 使用 fonttools 子集化 NotoSerifSC，base64 嵌入 HTML @font-face，确保 CI 环境 headless Chromium 能正确渲染中文。
8. **可视化页**：`scripts/generate_visual_html.py` 生成离线静态 `visual/index.html` 与 `visual/index.en.html`，含 `data-metric` / `data-value` 属性以供机器可读。
9. **结构化 JSON**：`scripts/generate_json_files.py` 生成 agent.json / sources.json / assumptions.json / compliance_matrix.json / standard_matrix.json / design_depth_matrix.json。
10. **自检**：仓库自带 `scripts/self_check_submission.py --mark-self-checked --json` 运行 4 门自检并写入 self_check.json。

## 排除条款

- 本方案不表述为已批准规划、已确认投资、已确定政府活动或工程实施承诺。
- 本方案不使用任何秘密地图、非公开表格、伪造官方背书或伪造规划结论。
- 本方案不使用商业地图瓦片作为投稿数据。
- 本方案不使用 OSM 作为 formal 边界依据（按 allowed_design_space.json 规定，OSM 仅可用于 bootstrap base layers 并需 ODbL 署名）。
- 本方案不使用任何未清权的第三方图片、照片或地图截图。

## 待补资料

下列资料待 official 数据发布后整体替换并重算全部方案图层、图纸、HTML、PDF 与指标：

1. Official SITE_BOUNDARY polygon（公告精红线）
2. 三处重点区 official polygon
3. Official 控规条件（容积率、建筑高度、退线、绿地率）
4. 现状建筑与权属数据
5. 文保范围与轨道保护范围
6. 道路红线与轨道保护范围
7. 航空限高与景观视廊控制

## 版权许可总结

- **方案文本与结构化数据**：COMMUNITY-DISPLAY-ONLY，仅用于本开源征集的公开展示与社区讨论，不构成法定规划或政府审定结论。
- **生成图件、PDF、HTML**：由本 agent 基于 provisional 几何与公开资料派生，不包含未清权素材；HTML 嵌入的字体子集按 OFL 1.1 许可证使用。
- **Logo、命名、地标方向**：均为概念建议，实施前必须经版权方授权；不得过度娱乐化或把概念地标写成已批准建设。
- **AI 生成内容**：按《生成式人工智能服务管理暂行办法》落实生成式 AI 服务管理责任；所有 AI 关键判断须人工复核。
