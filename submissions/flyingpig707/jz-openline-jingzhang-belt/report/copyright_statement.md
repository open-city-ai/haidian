# 版权声明与资产清单 / Copyright & Asset Rights Statement

> **原则**：本声明在无法独立核实任何资产的法律权利状态前，不宣称所有资产已完成法律权利清理。所有声明以"可核实时记录、不可核实时如实标注"为指导原则。

## 许可 / License

本方案（"京张开源线｜JZ OPENLINE：城市开源操作系统城市设计提案"）采用 **COMMUNITY-DISPLAY-ONLY** 许可，仅供"百年京张AI创新带城市设计国际方案征集"赛事展示与学术交流使用。未经组织方书面授权，不得用于商业用途、二次分发或超出赛事范围的公开传播。

## 概念性设计声明 / Conceptual Design Disclaimer

郑重声明：本方案中涉及的全部拆除、改建与保留建议、新建与改造桥梁/连接体方案、道路断面调整建议、轨道车站接口设想、建筑设计体量、建筑功能定位与实施时序列——均为**城市设计概念建议（conceptual urban design proposals）**，不替代以下正式文件与程序中的任何决定：
- 《北京市城乡规划条例》及相关控制性详细规划的法定约束；
- 建设工程可行性研究、初步设计或施工图设计审查；
- 铁路/轨道/交通/水务/文物/消防等专项行政主管部门的审批或许可；
- 任何土地或建筑权属人的法律权利。

方案中的面积、体量、高度、容量和距离均以 metrics.json 中的概念复算值或 unknown 声明为准；geometry/ 中的 geojson 图层在官方红线/控规/权属数据发布前为 provisional_only（见 geometry 图层属性 source_type），不得用于审批或工程判断。

## 坐标系与投影声明 / CRS Declaration

geometry/ 目录下的所有 geojson 文件采用 WGS84 地理坐标系（经纬度，lon≈116.3°, lat≈40.0°）存储。metrics.json 中声明的面积与长度指标在概念层以 EPSG:4548 投影进行复算。两组坐标系差异导致以下影响：
- 平面视角存在约 1/cos(40°)≈1.305 的东西向——南北向比例拉伸（已在 visual 图件中用 1.305 宽高比补偿，见 figures/）；
- 概念复算面积与严格投影面积之间存在近似误差；
- 正式面积、比例、红线关系和空间分析以官方发布的 EPSG:4548 数据为准。

待官方的总体设计范围 polygon 和三处重点区域 polygon（EPSG:4548）发布后，geometry/ 全部图层和 metrics.json 全部指标须重新生成与复算。

## 资产来源 / Asset Sources

| 资产类型 | 来源 | 许可状态 |
| --- | --- | --- |
| 方案文本（proposal.md / proposal.en.md） | WorkBuddy Urban Design Agent 原创撰写，人类操作者审核 | COMMUNITY-DISPLAY-ONLY |
| GeoJSON 图层（geometry/*.geojson） | 由 WorkBuddy Agent 从场地包 provisional boundary 与公开地图数据程序化生成，标注 source_type=agent_generated_design | COMMUNITY-DISPLAY-ONLY |
| 指标数据（metrics.json） | 由 spatial_review 和 agent 从提交图层复算 | COMMUNITY-DISPLAY-ONLY |
| PNG 图纸（assets/figures/*.png） | 由 matplotlib 从 GeoJSON 图层程序化渲染（v2：gen_jz_openline_assets_v2.py 基于 Arial Unicode MS 字体），不含第三方图片/地图瓦片 | COMMUNITY-DISPLAY-ONLY |
| PDF 文册/展板（drawings/*.pdf） | 由 matplotlib PdfPages 从 PNG 图纸拼合导出 | COMMUNITY-DISPLAY-ONLY |
| HTML 展示（report/*.html / visual/*.html） | 静态 HTML，不加载远程资源、CDN、iframe 或跟踪代码 | COMMUNITY-DISPLAY-ONLY |

## 字体清单与权利声明 / Font Inventory & Rights Statement

方案图件（PNG 和 PDF）出于技术可读性考虑，在 v2 生成过程中使用了 **Arial Unicode MS**（/Library/Fonts/Arial Unicode.ttf）作为通用 CJK+Latin 渲染字体。该字体随 macOS 操作系统分发，在系统字体使用惯例下嵌入与分发图件。

方案品牌层声明的设计目标字体及其声明状态：

| 字体名称 | 用途 | 实际渲染字体（图件生成阶段） | 设计目标字体（最终出版） | 许可状态 |
|---|---|---|---|---|
| **Arial Unicode MS** | 图件通用 CJK+Latin 渲染 | ✓ 图件中嵌入的字形子集 | — | 随 macOS 操作系统分发；系统字体使用惯例覆盖嵌入/分发 |
| **Source Han Sans / 思源黑体** | 中文正文字体 | ✗ 图件阶段未使用 | 正式出版阶段替换 | **待核实**：SIL OFL v1.1 开源许可；商业品牌的 brands/advertising 使用权需独立查阅许可条款 |
| **Inter** | 英文正文与数字字体 | ✗ 图件阶段未使用 | 正式出版阶段替换 | **待核实**：SIL OFL v1.1 开源许可；静态/可变字体版本与嵌入方式须确认 |
| **IBM Plex Mono** | 英文等宽/代码字体 | ✗ 图件阶段未使用 | 正式出版阶段替换 | **待核实**：SIL OFL v1.1 开源许可；版本与嵌入方式须确认 |
| **Hiragino Sans GB** | —（v1 曾被引用） | ✗ v2 已移除，未在图件中嵌入 | —（v2 不再使用） | 随 macOS 操作系统分发 |
| **DejaVu Sans Mono** | ASCII 等宽标签 | ✓ 仅用于纯 ASCII/拉丁文字段（v2 已移除所有 DejaVu 含中文的调用） | — | 自由许可（Bitstream/DejaVu font license） |

**当前阶段不宣称** Source Han Sans、Inter 和 IBM Plex Mono 的商业许可已获得或法律权利已清理。上述品牌字体的正式商业使用、嵌入与分发须在正式出版前由权利人委托专业机构进行独立核实。

## Logo / 标识资产 / Logo & Brand Marks

| 资产 | 文件路径 | 生成方式 | 权利状态 |
|---|---|---|---|
| **JZOpenlineLOGO.png** | visual/assets/JZOpenlineLOGO.png | WorkBuddy AI 辅助生成（Prompt-based）；核心图形：交叉折线（铁路—代码—开源隐喻）+ 中心点 | **待核实**：商标近似检索未完成；AI 生成内容的版权/商标归属因司法管辖区而异；当前不宣称可商标化的独占权 |
| **品牌色板** | proposal.md 视觉规范章节 | 人工+AI 辅助设计：#C84630 朱红源自京张旧铁路色调，#146CFF 蓝与 #B7F000 青柠源自开源/科技社区 | 色彩系统不具有可版权性；作为品牌资产指南使用 |

## 无第三方素材声明 / Third-Party-Free Declaration

- 本方案所有图纸、图表、地图均由 Python 代码（matplotlib + shapely）从提交的 GeoJSON 图层直接生成
- 不包含任何照片、卫星影像、第三方地图瓦片、图标库或 stock 图片
- 不包含任何企业 logo、品牌标识、人物肖像或受版权保护的图像（JZOpenlineLOGO.png 为方案自创品牌资产）
- HTML 页面不加载 CDN、远程脚本、iframe、外部 API 或跟踪代码

## 数据来源引用 / Data Source Attribution

方案使用的非原创数据来源均已在 `sources.json` 中登记，包括：
- 官方公告 [source:OFFICIAL-ANNOUNCEMENT]
- 面向智能体任务书 [source:AGENT-TASKBOOK]
- 场地包临时边界 [source:BOUNDARY-SOURCE]
- 重点区域公告面积 [source:KEY-AREA-SOURCE]
- 资料登记表 [source:SOURCE-REGISTRY]
- 加工事实包 [source:PROCESSED-FACT-PACK]

所有正式证据仅允许使用 5 项 approved 来源；临时边界仅为 provisional_only；PROCESSED-FACT-PACK、临时 polygon 和背景叙事不得升级为正式事实来源。

## 京张铁路文化遗产 / Jingzhang Railway Cultural Heritage

方案中涉及京张铁路历史文化遗产的内容，均基于公开史料和官方公告信息，用于城市设计叙事和文化导览建议。具体保护范围、建设控制地带和保护措施以文物主管部门公布的官方文件为准。

## AI 生成内容披露 / AI-Generation Disclosure

本方案由 WorkBuddy Urban Design Agent（基于大语言模型的多模态智能体运行时）在人类操作者监督下生成。Agent 的职责包括：
- 读取结构化任务书和场地资料包
- 生成符合规范格式的 GeoJSON 图层
- 从图层复算空间指标
- 渲染图纸和 HTML 展示（v2 图件基于真实 GeoJSON 生成，见 gen_jz_openline_assets_v2.py）
- 执行自检流程

最终内容由人类操作者审核后提交。

## 未完成的权利清理事项 / Outstanding Rights Clearance

1. **品牌字体许可**：Source Han Sans、Inter、IBM Plex Mono 的正式商业许可与嵌入方式须在出版前由权利人委托专业机构核实。
2. **Logo 商标检索**：JZOpenlineLOGO.png 未进行商标近似检索；正式商业使用前须由知识产权事务所进行。
3. **生成资产完整记录**：图件生成脚本与命令行的完整记录、随机种子和中间资产未归档——仅记录关键要素（脚本路径 /tmp/gen_jz_openline_assets_v2.py）。
4. **坐标系确认**：正式提交前需确认官方接受的坐标系格式并对全部图层执行投影转换（当前 geojson 为 WGS84 经纬度，metrics 以 EPSG:4548 概念层计算）。

> **不可核实时不宣称已清权**：本声明的所有"待核实"和"未完成"事项，不视为此声明已默认涵盖或清理。正式商业使用前，建议由权利人委托专业机构对所有清单项目进行逐项审计。
