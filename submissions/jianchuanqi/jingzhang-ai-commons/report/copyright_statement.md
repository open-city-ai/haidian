# 版权、作者与资产权利台账

## 1. 投稿作者与许可范围

本投稿的责任作者和 GitHub 提交者均为 `jianchuanqi`。方案文字、结构化设计数据、程序化图表、PDF 图册和离线 HTML 由 `jianchuanqi` 在 OpenClaw 环境中使用 AI 辅助构思、写作和编码，并经人工选择、编辑、核验后提交。投稿元数据声明的许可为 `COMMUNITY-DISPLAY-ONLY`；除来源自身许可明确允许的范围外，本声明不扩大任何第三方资料的复制、再分发或商业使用权限。

## 2. 逐资产来源与生成方式

| 资产 | 作者/生成者 | 生成方式与输入 | 外部资产 | 权利与使用状态 |
| --- | --- | --- | --- | --- |
| `proposal.md`、`report/narrative.md` | `jianchuanqi`，AI 辅助 | 根据公开征集文件、仓库任务包、方案 GeoJSON、指标与矩阵撰写并人工编辑 | 仅引用 `sources.json` 登记资料 | 原创表达；第三方事实和案例不转授权 |
| `geometry/*.geojson` | `jianchuanqi`，AI 辅助 | 以仓库 `brief/site-package/geometry/provisional_boundaries.geojson` 为临时约束，程序化生成概念设计几何 | 临时边界来源为仓库资料 | 投稿设计几何可随方案展示；临时边界不是官方红线，不得作为审批或精确面积依据 |
| `metrics.json`、三个矩阵、`assumptions.json`、`self_check.json` | `jianchuanqi`，AI 辅助 | 从提交几何、任务要求、标准索引与人工判断整理；已知空间指标由 GeoJSON 复算 | 任务与标准依据见 `sources.json`、`standard_matrix.json` | 原创结构化成果；不声称标准原文版权或官方认证 |
| `assets/figures/site-overview.png` | `jianchuanqi`，AI 辅助 | Python/Pillow 11.3.0 程序化绘制；输入为本投稿文字、几何、指标和证据关系 | 无照片、图标库、地图瓦片或外部图片 | 原创栅格图；仅随投稿许可展示 |
| `assets/figures/land-use-structure.png` | 同上 | Python/Pillow 11.3.0 程序化绘制空间结构、节点和循环关系 | 无外部图像资产 | 原创栅格图；仅随投稿许可展示 |
| `assets/figures/key-areas.png` | 同上 | Python/Pillow 11.3.0 程序化绘制三处临时重点区索引和任务信息 | 临时重点区几何来自仓库资料 | 原创表达；临时几何限制同上 |
| `assets/figures/mobility-bluegreen.png` | 同上 | Python/Pillow 11.3.0 程序化绘制慢行、蓝绿和公共空间关系 | 无远程底图或外部图像 | 原创栅格图；仅随投稿许可展示 |
| `assets/figures/metrics-evidence.png` | 同上 | Python/Pillow 11.3.0 程序化绘制指标及证据链 | 无外部图像资产 | 原创栅格图；仅随投稿许可展示 |
| `drawings/a3-booklet.pdf` | `jianchuanqi`，AI 辅助 | 由上述 5 张原创 PNG 使用 Pillow 11.3.0 PDF driver 合成为 5 页图册 | 不嵌入外部 PDF、矢量图、照片或可提取字体 | 原创派生成果；仅随投稿许可展示 |
| `drawings/a0-boards.pdf` | 同上 | 将原创图面组合成 1 页 3600×2200 像素展板，并由 Pillow 11.3.0 PDF driver 输出 | 无外部图像资产 | 原创派生成果；仅随投稿许可展示 |
| `report/proposal.html` | `jianchuanqi`，AI 辅助 | 由本仓库 `scripts/render_proposal_html.py` 从 `proposal.md` 派生；本地 CSS | 加载同一投稿内的 5 张 PNG，不加载远程资源 | 派生阅读版；仓库脚本权利依原仓库许可，本投稿不主张其代码著作权 |
| `visual/index.html` | `jianchuanqi`，AI 辅助 | 本地 HTML/CSS 编排投稿内容和图面 | 无远程脚本、字体、地图瓦片、iframe、表单或 API | 原创离线展示页；仅随投稿许可展示 |

## 3. 字体、地图、代码与 AI 声明

- PNG 中的文字由 Pillow 调用运行环境中的 macOS 系统字体渲染为像素；字体文件未复制、打包或嵌入投稿。优先使用系统 `PingFang.ttc`，不可用时回退至系统中文字体或 Pillow 默认字体。
- 两份 PDF 的页面为栅格图像，不嵌入字体文件。HTML 仅声明系统字体栈，由评审者设备选择本地字体；仓库内不附带字体文件。
- 图面没有使用 OpenStreetMap、商业地图、遥感影像或远程地图瓦片，也没有使用外部图标库、企业商标、人物肖像和第三方照片。
- 提交包没有附加生成脚本。生成与校验过程中使用 Python、Pillow 11.3.0 以及本仓库公开脚本；这些工具仅是生成手段，不构成投稿者对工具代码的权利主张。
- AI 只作为辅助工具，不被列为作者或权利主体。`jianchuanqi` 对最终选择、编辑、来源披露和投稿内容负责。

## 4. 数据与参考资料清权边界

正式任务依据、仓库资料、临时边界以及六个国际案例逐项登记于 `sources.json`。案例页面仅支持背景研究和文字引用，不复制其图片、标识、页面设计或数据集，也不用于推导本地规划控制、工程绩效或机构承诺。仓库临时边界只用于 intake 展示和概念讨论；官方几何发布后必须替换并重算。

本台账说明当前提交包内资产的作者、生成方式、来源和已知限制，不构成对第三方网站、标准全文、系统字体、仓库脚本或组织名称的再许可，也不构成法律意见。若维护者发现具体第三方权利冲突，投稿者将删除、替换或进一步补充授权证明。
