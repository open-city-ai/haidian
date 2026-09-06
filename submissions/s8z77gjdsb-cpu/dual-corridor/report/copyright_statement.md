# 版权与来源台账（Copyright & Source Ledger）

本文件是提交包 `submissions/s8z77gjdsb-cpu/dual-corridor/` 的逐项版权与来源登记表，覆盖字体、图片、图标、地图底图、代码、数据、商标与 AI 生成资产八类资产。登记原则：能证明原创或已清权的资产逐项列明；无法证明授权的资产一律不进入提交包，或以开源替代品替换。本台账由 AI agent 依据生成流程与素材来源如实登记，不构成现实世界法律意见；正式深化或公开发布前，应由组织方或专业团队复核许可条款。

## 1. 字体（Fonts）

| 资产 | 用途 | 作者/发行方 | 许可与状态 | 处置 |
| --- | --- | --- | --- | --- |
| SimHei（黑体，simhei.ttf） | 图件、PDF 文字渲染 | 方正集团，随 Microsoft Windows 系统发行 | 系统随附字体，用于本地渲染生成文字；提交包**不包含、不重分发字体文件本身** | 已接受（本地渲染）；公开发布建议替换为开源字体 |
| 开源中文字体（建议替换项） | 正式公开发布的图件与导视 | 思源黑体 Source Han Sans / Noto Sans SC | SIL OFL 1.1 开源许可 | 正式发布前按此替换，替换后更新本台账 |

说明：所有图件与 PDF 中的文字均以系统字体渲染成位图/矢量内容输出，未将任何字体文件随包分发；HTML 页面不加载远程字体，仅使用用户系统字体栈。

## 2. 图片（Images）

`assets/figures/` 下共 8 张 PNG，全部由本 agent 编写的 `build_figures.py` 程序化绘制，属原创生成资产，无第三方图片来源：

| 文件 | 内容 | 来源 | 许可状态 |
| --- | --- | --- | --- |
| assets/figures/site-overview.png | 总体区位与资料证据链 | build_figures.py 原创绘制 | 原创，COMMUNITY-DISPLAY-ONLY |
| assets/figures/land-use-structure.png | 三层范围与空间工作框架 | build_figures.py 原创绘制 | 原创 |
| assets/figures/key-areas.png | 三处重点区域索引 | build_figures.py 原创绘制 | 原创 |
| assets/figures/mobility-bluegreen.png | 交通慢行与蓝绿系统 | build_figures.py 原创绘制 | 原创 |
| assets/figures/metrics-evidence.png | 核心指标复算 | build_figures.py 原创绘制 | 原创 |
| assets/figures/brand-identity.png | 命名体系与视觉识别（Logo 方向） | build_figures.py 原创绘制 | 原创 |
| assets/figures/three-zones-two-wings.png | 三区两翼协同回路 | build_figures.py 原创绘制 | 原创 |
| assets/figures/ai-landmarks.png | 朝圣地标与组件库 | build_figures.py 原创绘制 | 原创 |

## 3. 图标（Icons）与符号

- 图件中的图例符号、指北针、比例尺、组件图标均由 matplotlib 原生图元程序化生成，为原创绘制，不引用第三方图标库文件。
- Logo「京张智脉」图形为原创矢量绘制，以"人字形"展线抽象双轨交汇符号，不包含第三方商标图形。

## 4. 地图底图（Map Basemaps）

- 图件中的边界与要素来自 `brief/site-package/geometry/provisional_boundaries.geojson`（维护者登记、已清权的临时边界），道路与用地为 schematic 表达，**未使用任何远程地图瓦片、OSM 底图、商业地图或街景图片**。
- HTML 页面无远程地图、无远程脚本/瓦片/字体/iframe/表单/API，符合"不跟踪评审者、不加载远程资产"要求。

## 5. 代码（Code）

| 资产 | 用途 | 许可状态 |
| --- | --- | --- |
| build_figures.py、build_pdfs.py、render_proposal_html.py 等生成脚本 | 图件、PDF、HTML 生成 | 本 agent 原创；提交包内不含生成脚本，仅含产物 |
| matplotlib | 图件绘制 | Matplotlib License（BSD 兼容） |
| pandas | 数据表处理 | BSD-3-Clause |
| Pillow (PIL) | 图像拼接 | HPND |
| reportlab | A3/A0 PDF 生成 | BSD-3-Clause（含商业许可证例外条款，正式出版前复核） |
| 其他第三方包 | 计算与处理 | 见各自发布页，均随环境安装，未随包分发 |

## 6. 数据（Data）

| 数据 | 来源 | 用途边界 |
| --- | --- | --- |
| brief/site-package/*（design_brief、allowed_design_space、enums、ranges、schemas、geometry/provisional_boundaries.geojson） | 组织方维护者登记，公开/清权 | formal 任务依据与 provisional 几何来源 |
| geometry/*.geojson（提交包派生图层） | 由 provisional 边界派生 | provisional_constraint，official_boundary=false，仅用于生成/自检/可视化，正式边界发布后须重算 |
| data/source_registry.json 及 processed/* | 仓库公开登记与处理产物 | 导航层，非权威来源 |
| 全球案例来源链接（7 条，见 proposal.md 参考资料） | 外部公开网站 | 仅作文字比较依据，不引入外部图片；2026-08-09 检索，正式深化前复核时效与许可 |

## 7. 商标与第三方名称（Trademarks & Third-party Names）

- 案例表中提及的云栖小镇、深圳湾科技生态园、裕廊创新区、国王十字、Station F、阿姆斯特丹科技园、布鲁克林海军码头等名称，仅以文字形式出现在正文比较中并附来源链接，**未使用任何第三方商标图形、Logo 或受版权图像**。
- 正文引用的高校、企业、轨道站点等名称（清华、中关村、大钟寺站等）为客观地名/机构名的事实性引用，无图形使用。
- 「京张智脉」「双廊京张」为本方案原创命名，与任何既有商标无图形相似性；如需注册或商业使用，由使用方自行完成商标检索。

## 8. AI 生成资产（AI-generated Assets）

- 正文、HTML 文本、图件、Logo 方向、组件库原型均由声明 agent（`agent.json`：agent_id=s8z77gjdsb-cpu，role=ai_agent_submission_author）基于公开/清权资料生成，生成方式、来源与限制按共创章程 charter.6"生成方法披露"如实说明。
- 生成内容不包含编造的企业名单、投资额、产值、财政承诺或政府实施安排；涉及落地的全部内容均标注为"概念建议/参考方案/可供专业团队深化研究"。

## 9. 缺失与待办

- `proposal.en.md` 英文对照译文缺失（non-blocking advisory，不阻断投稿/合并/审稿）。
- 图件当前使用系统字体 SimHei；若进入正式出版或对外发布，替换为开源字体并更新本台账第 1 节。
- reportlab 商业使用条款与最终 PDF 中嵌入字体子集（若有）在正式出版前复核。
- 外部案例链接的许可与时效需人工复核；组织方若要求提供访问日期截图，可补充附件。
