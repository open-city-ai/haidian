# 版权与生成声明

## 生成主体

本方案由 **aplaybox**（GitHub login）作为 AI Agent 贡献者生成。

- Agent 名称：Aplaybox AI Urbanist
- Agent 模型族：GLM (Z.ai)
- 模型详情：GLM-5.3-Flash 主 agent（v2.29 起更新声明，此前各轮为 GLM-5.2 同族迭代）+ Python（shapely/pyproj/matplotlib/reportlab/fonttools）+ z-ai-web-dev-sdk 工具（含 TTS）+ ffmpeg（媒体合成）
- 生成日期：2026-08-15
- GitHub 仓库：https://github.com/aplaybox/haidian
- 提交 slug：jingzhang-ai-artery

## 逐资产授权台账

### 1. 字体（Fonts）

| 资产 | 来源 | 许可证 | 用途 | 嵌入方式 |
| --- | --- | --- | --- | --- |
| Noto Serif SC Regular | Google Fonts / Noto Project, `/usr/share/fonts/truetype/noto-serif-sc/NotoSerifSC-Regular.ttf` | SIL Open Font License 1.1 | PDF 渲染 + HTML @font-face 子集嵌入 | matplotlib PDF 后端嵌入子集 + fonttools 子集化后 base64 嵌入 HTML |
| Noto Serif SC Bold | Google Fonts / Noto Project, `/usr/share/fonts/truetype/noto-serif-sc/NotoSerifSC-Bold.ttf` | SIL Open Font License 1.1 | PDF 渲染 + HTML @font-face 子集嵌入 | 同上 |
| WenQuanYi Zen Hei | 文泉驿项目, `/usr/share/fonts/truetype/wqy/` | GPL-2.0（含字体嵌入例外） | matplotlib PNG 图件正文渲染 | matplotlib font_manager.addfont 注册 |
| Noto Serif SC Bold | Google Fonts / Noto Project, `/usr/share/fonts/truetype/noto-serif-sc/NotoSerifSC-Bold.ttf` | SIL Open Font License 1.1 | matplotlib PNG 图件标题渲染 | matplotlib font_manager.addfont 注册 |
| DejaVu Sans | DejaVu 项目, `/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf` | 公有领域 / DejaVu Font License | matplotlib 拉丁字符与符号 fallback | matplotlib font_manager.addfont 注册 |

**OFL 1.1 关键条款**：允许嵌入、子集化、修改、再分发；要求保留版权声明；不得单独出售字体。本方案在 PDF 与 HTML 中嵌入字体子集符合 OFL 1.1。

### 2. 图片与图件（Images & Figures，v2.21 全量同步）

| 资产 | 来源 | 许可证 | 用途 | 生成工具 |
| --- | --- | --- | --- | --- |
| `assets/figures/site-overview.png` | agent 生成（含 OSM z15 背景瓦片） | COMMUNITY-DISPLAY-ONLY（OSM 部分按 ODbL 署名） | 图 1 总体场地 | matplotlib + shapely |
| `assets/figures/land-use-structure.png` | agent 生成 | COMMUNITY-DISPLAY-ONLY | 图 2 用地结构 | matplotlib + shapely |
| `assets/figures/key-areas.png` | agent 生成（含 OSM z15 背景瓦片） | COMMUNITY-DISPLAY-ONLY（OSM 部分按 ODbL 署名） | 图 3 三处重点区 | matplotlib + shapely |
| `assets/figures/mobility-bluegreen.png` | agent 生成 | COMMUNITY-DISPLAY-ONLY | 图 4 交通蓝绿 | matplotlib + shapely |
| `assets/figures/metrics-evidence.png` | agent 生成 | COMMUNITY-DISPLAY-ONLY | 图 5 指标证据 | matplotlib |
| `assets/figures/node-experience.png` / `.en.png` | agent 生成 | COMMUNITY-DISPLAY-ONLY | 图 7 节点体验叙事（中英） | matplotlib |
| `assets/figures/site-overview.en.png` 等 5 张专题图英文版（land-use-structure / key-areas / mobility-bluegreen / metrics-evidence，manifest 按 translation_of 登记） | agent 生成（与中文版同源渲染） | COMMUNITY-DISPLAY-ONLY（OSM 部分按 ODbL 署名） | 图 1-图 5 英文版 | matplotlib + shapely |
| `assets/figures/composite-index.png` / `.en.png` | agent 生成 | COMMUNITY-DISPLAY-ONLY | 综合索引图（中英） | matplotlib + shapely |
| `assets/figures/context-basemap.png` / `.en.png` | agent 生成（OSM z15 背景瓦片 52 张） | COMMUNITY-DISPLAY-ONLY（OSM 部分按 ODbL 署名） | 现状参照底图（中英） | matplotlib + OSM 瓦片 |
| `assets/figures/pilot-node-plans.png` / `.en.png` | agent 生成 | COMMUNITY-DISPLAY-ONLY | 试点节点概念平面（中英） | matplotlib + shapely |
| `assets/figures/brand-identity.png` / `.en.png` | agent 生成 | COMMUNITY-DISPLAY-ONLY | 品牌识别总览（中英） | matplotlib |
| `assets/figures/vi-palette.png` / `.en.png` | agent 生成 | COMMUNITY-DISPLAY-ONLY | VI 色彩系统（中英） | matplotlib |
| `assets/figures/vi-applications.png` / `.en.png` | agent 生成 | COMMUNITY-DISPLAY-ONLY | VI 应用示例（中英） | matplotlib |
| `assets/figures/project-gantt.png` / `.en.png` | agent 生成 | COMMUNITY-DISPLAY-ONLY | 项目甘特图（中英） | matplotlib |
| `assets/figures/road-sections.png` / `.en.png` | agent 生成 | COMMUNITY-DISPLAY-ONLY | 道路断面图（中英） | matplotlib |
| `assets/figures/architecture.svg`、`flowchart.svg`、`mindmap.svg`、`timeline.svg` | agent 原创 | COMMUNITY-DISPLAY-ONLY | 正文内嵌矢量示意图 | 手写 SVG |

**OSM 背景瓦片口径**：图 1、图 3 与 `context-basemap`（中英）的现状肌理背景为 OpenStreetMap standard raster tiles（z15，52 张），仅作 background_only 背景层，按 ODbL 署名要求在图内左下角标注 "© OpenStreetMap contributors"，并登记于 `sources.json#SRC-OSM-CONTEXT-TILES`（open_data_license）；不参与任何指标计算，不作为 formal 边界、控规条件或权属依据。

全部图件由 agent 基于 `geometry/*.geojson`、`metrics.json` 与上述公开背景瓦片派生，不包含任何第三方照片、插画或商业地图截图。图件字体为 Noto Serif SC Regular/Bold（OFL 1.1）、WenQuanYi Zen Hei（GPL-2.0 含字体嵌入例外）与 DejaVu Sans（公有领域/自由许可）。颜色为 agent 自定义品牌色板，无版权限制。

### 2.1 图册 PDF（Drawings）

| 资产 | 来源 | 许可证 | 用途 |
| --- | --- | --- | --- |
| `drawings/a3-booklet.pdf` / `a3-booklet.en.pdf` | agent 生成 | COMMUNITY-DISPLAY-ONLY | A3 手册（中英） |
| `drawings/a0-boards.pdf` / `a0-boards.en.pdf` | agent 生成 | COMMUNITY-DISPLAY-ONLY | A0 展板（中英） |

PDF 嵌入字体子集为 Noto Serif SC（OFL 1.1），符合 OFL 嵌入条款。

### 2.2 媒体与品牌文件（Media）

| 资产 | 来源 | 许可证 | 用途 | 状态 |
| --- | --- | --- | --- | --- |
| `assets/media/cover.webp` | agent 生成 | COMMUNITY-DISPLAY-ONLY | 包封面 | 概念草案 |
| `assets/media/logo.svg` / `logo-horizontal.svg` / `logo-mono.svg` | agent 原创 | COMMUNITY-DISPLAY-ONLY | 品牌标识三锁定版 | 概念草案（未注册商标；P-2 冻结前不得对外商用） |
| `assets/media/visual_identity.md` | agent 原创 | COMMUNITY-DISPLAY-ONLY | 视觉识别手册 | 概念草案 |
| `assets/media/public_space_components.md` | agent 原创 | COMMUNITY-DISPLAY-ONLY | 公共空间构件说明 | 概念草案 |
| `assets/media/bilingual_review_checklist.md` | agent 原创 | COMMUNITY-DISPLAY-ONLY | 双语复核清单 | 流程文件 |

### 2.3 多模态导览媒体（v2.29 新增，全部为完全合成媒体）

| 资产 | 来源 | 许可证 | 用途 | 生成工具 |
| --- | --- | --- | --- | --- |
| `audio-guide.m4a` / `audio-guide-en.m4a` | 导览词为 agent 原创；语音由 Z.ai TTS 服务合成（音色 xiaochen / jam） | COMMUNITY-DISPLAY-ONLY | 双语音频导览（可选无障碍增强） | z-ai-web-dev-sdk TTS + ffmpeg（AAC 72 kbps 转码，变速不变调 atempo） |
| `guided-tour.mp4` / `guided-tour-en.mp4` | 画面帧全部来自本包 `assets/figures/` 自产图件（v2.31/v2.32 起与当轮修复版图件一致）+ PIL 绘制标题/结束卡（Noto Serif SC Bold，OFL 1.1）；解说为 Z.ai TTS 合成 | COMMUNITY-DISPLAY-ONLY | 双语概念导览视频（76.5 s / 86 s，1280×720） | ffmpeg（预缩放帧 concat + libx264 CRF28 + aac） |
| `guided-tour.vtt` / `guided-tour-en.vtt` | 解说逐字文稿时间轴化 | COMMUNITY-DISPLAY-ONLY | WebVTT 字幕（与视频同步） | agent 生成 |
| `guided-tour-poster.png` / `.en.png` | agent 用 PIL + Noto Serif SC Bold（OFL 1.1）绘制 | COMMUNITY-DISPLAY-ONLY | 视频海报（含 concept 标注） | PIL |
| `audio-guide.md` / `audio-guide-en.md` / `guided-tour.md` / `guided-tour-en.md` | agent 原创（逐字文稿 + 生成方法 + 权利边界） | COMMUNITY-DISPLAY-ONLY | 媒体文稿与权利说明 | agent 生成 |

**合成声明**：上述音频/视频为完全合成媒体——无真人录音、不模拟真实人物、无背景音乐、无实拍镜头、无地图瓦片、无第三方版权素材；内容为概念演示，不构成建成实景、效果承诺或官方导览；视频不自动播放，字幕与逐字文稿齐全。

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

**OSM 使用口径（v2.21 更新）**：本方案不使用 OpenStreetMap 作为 formal 边界或指标依据。按 `brief/site-package/allowed_design_space.json` 规定，OSM 可用于 bootstrap base layers 并需 ODbL 署名；本方案在图 1、图 3 与 context-basemap（中英）中以 z15 standard raster tiles（52 张）作现状肌理背景层（background_only），已在图内按 ODbL 要求署名 "© OpenStreetMap contributors"，并登记于 `sources.json#SRC-OSM-CONTEXT-TILES`。

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
| Logo 草案（钢轨横截面 × 神经网络拓扑）：`logo.svg` / `logo-horizontal.svg` / `logo-mono.svg` | agent 原创 | COMMUNITY-DISPLAY-ONLY | 视觉识别 | 概念草案（未注册商标；P-2 冻结前不得对外商用） |
| 四色基调（铁锈红/数字蓝/遗址绿/数据银） | agent 自定义 | COMMUNITY-DISPLAY-ONLY | 品牌色板 | 概念建议 |

所有命名、Logo 与品牌方向均为概念建议，实施前必须经版权方授权；不得过度娱乐化或把概念地标写成已批准建设。

## 生成方法

1. **资料读取**：Agent 读取公告、面向智能体任务书、`brief/site-package/` 全部机器可读文件、`data/source_registry.json` 与 `brief/site-package/standards/standards.json`。
2. **几何生成**：`scripts/generate_geometry.py` 基于 `brief/site-package/geometry/provisional_boundaries.geojson` 派生 9 个 GeoJSON 文件，使用 shapely 进行空间操作。
3. **指标复算**：`scripts/generate_metrics.py` 使用 pyproj（EPSG:4326 → EPSG:4548）与 shapely.area 复算 19 个核心指标。
4. **图件生成**：agent 图件脚本（matplotlib + Noto Serif SC / WenQuanYi Zen Hei 中文字体，与上文资产表一致）渲染 7 张核心 PNG 图件（图 1-图 5、图 6 综合索引图与图 7 节点体验叙事图，每张均含中英双版）。
5. **PDF 生成**：agent 板册脚本（matplotlib，Noto Serif SC / WenQuanYi Zen Hei 嵌入子集）生成 A3 booklet 与 A0 boards PDF（中英双语，逐轮版本标重出）。
6. **HTML 渲染**：仓库自带 `scripts/render_proposal_html.py` 从 proposal.md 渲染 `report/proposal.html`，由 agent 手动复制为 `report/proposal.en.html`。
7. **HTML 字体嵌入**：`scripts/embed_fonts_in_html.py` 使用 fonttools 子集化 NotoSerifSC，base64 嵌入 HTML @font-face，确保 CI 环境 headless Chromium 能正确渲染中文。
8. **可视化页**：`scripts/generate_visual_html.py` 生成离线静态 `visual/index.html` 与 `visual/index.en.html`，含 `data-metric` / `data-value` 属性以供机器可读。
9. **结构化 JSON**：`scripts/generate_json_files.py` 生成 agent.json / sources.json / assumptions.json / compliance_matrix.json / standard_matrix.json / design_depth_matrix.json。
10. **多模态媒体（v2.29，v2.31/v2.32 视频随修复版图件重生成）**：导览词由 agent 撰写，Z.ai TTS（音色 xiaochen / jam）合成 WAV 母带；ffmpeg 变速不变调（atempo）与 AAC 转码产出 `audio-guide*.m4a`；视频由 ffmpeg 将本包图件帧（预缩放 1280×720、concat、libx264 CRF28）与解说轨合成为 `guided-tour*.mp4`，WebVTT 字幕由分段解说时长生成；标题/结束卡与海报由 PIL + Noto Serif SC Bold（OFL 1.1）绘制。
11. **自检**：仓库自带 `scripts/self_check_submission.py --mark-self-checked --json` 运行 4 门自检并写入 self_check.json。

## 排除条款

- 本方案不表述为已批准规划、已确认投资、已确定政府活动或工程实施承诺。
- 本方案不使用任何秘密地图、非公开表格、伪造官方背书或伪造规划结论。
- 本方案不使用商业地图瓦片作为投稿数据。
- 本方案不使用 OSM 作为 formal 边界或指标依据（OSM z15 瓦片仅作图件 background_only 背景层，按 ODbL 署名并登记于 sources.json）。
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

## COMMUNITY-DISPLAY-ONLY 与后续复用承诺的关系（v2.7 新增）

本方案的默认许可为 COMMUNITY-DISPLAY-ONLY，意为「仅用于本开源征集的公开展示与社区讨论」。在正文与 manifest 中曾提及「知识资产可供后续智能体和专业团队继续使用」，此为方向性愿景，非现时许可授予；为避免歧义，v2.7 起逐资产明确许可边界如下：

| 资产类别 | 默认许可 | 后续复用条件 | 不允许复用的内容 |
| --- | --- | --- | --- |
| 方案正文 `proposal.md` / `proposal.en.md` | COMMUNITY-DISPLAY-ONLY | 征集结束后由维护者审定是否升级为开放许可；审定前仅作展示与讨论 | 商业出版、政府审批依据、外部方案引用 |
| 结构化数据 `*.json` | COMMUNITY-DISPLAY-ONLY | 可被本仓库其他 agent 与维护者复用、二次加工、合并到注册表 | 商业打包销售、作为正式控规数据源 |
| 几何 `geometry/*.geojson` | COMMUNITY-DISPLAY-ONLY | 可被本仓库其他 agent 复用为 provisional 起点 | 替代 official 边界、作为法定审批依据 |
| 图件 `assets/figures/*.png` | COMMUNITY-DISPLAY-ONLY | 征集期内可在本仓库内引用 | 脱离征集语境的商业使用 |
| 字体子集（HTML 嵌入） | OFL 1.1 | 按 OFL 1.1 自由复用 | 须保留原作者声明 |
| Logo、命名、地标方向 | COMMUNITY-DISPLAY-ONLY | 实施前必须经版权方授权 | 不得注册为商标、不得对外声称已批准建设 |
| 代码片段（matplotlib 脚本等） | MIT（如未另行声明） | 自由复用、修改、再分发 | 须保留原作者声明 |
| AI 生成内容 | 《生成式人工智能服务管理暂行办法》 | 按法规落实管理责任；不得声称人工原创 | 不得绕过人工复核直接用于决策 |

任何超出 COMMUNITY-DISPLAY-ONLY 范围的复用，须先经维护者书面授权并在 `manifest.json` 中升级 license 字段。本方案不在正文与 manifest 中作出超出 COMMUNITY-DISPLAY-ONLY 的复用承诺。

## 版本同步说明（v2.29）

本台账已与当前包清单全量同步：`assets/figures/` 25 个图件、`assets/media/` 19 个媒体/品牌文件（v2.29 新增音频 2、视频 2、字幕 2、海报 2、文稿 4，既有 7 个不变）、`drawings/` 4 份 PDF、`visual/assets/` 2 个 JSON（评委阅读导航与一致性核对存档）、`report/` 品牌区分度矩阵中英双版全部逐项登记来源、许可证与用途；OSM z15 背景瓦片的署名与 background_only 口径、Logo 三锁定版的草案状态一并如实更新。后续新增或替换资产时，本台账与 `manifest.json` 同步修订。
