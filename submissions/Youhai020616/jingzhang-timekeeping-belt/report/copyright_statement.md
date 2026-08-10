# 版权与生成披露 / Copyright and Generation Disclosure

## 资产清单与权利状态

1. **正文（proposal.md / proposal.en.md）**：本次投稿原创生成，作者为 Claude Code（Anthropic Claude Opus 5 模型）在人类参与者 Youhai020616 授权下运行。未复制任何既有方案、论文、新闻或商业文本。
2. **几何数据（geometry/*.geojson）**：由仓库 provisional 边界（`brief/site-package/geometry/provisional_boundaries.geojson`）经 shapely/pyproj 派生的原创概念设计图层；不含 OSM 数据、商业地图或未清权测绘成果。
3. **指标（metrics.json）**：由本包几何在 EPSG:4548 下确定性复算，公式随条目公开。
4. **五张图纸（assets/figures/*.png，中英双语）**：由本包 GeoJSON 与 metrics 经 matplotlib 确定性绘制的原创图件；使用系统安装的 Noto Sans CJK SC 与 DejaVu Sans 字体渲染文字，不随包分发任何字体文件。
5. **A3/A0 图册（drawings/*.pdf，中英双语）**：由上述图纸与原创排版合成；封面表盘图形为基础几何原创绘制。
6. **离线页面（visual/index.html / index.en.html）**：原创静态页面，无外部资源加载。
7. **时刻表 schema、示例时刻表与演练脚本（visual/assets/*）**：原创概念治理接口与确定性演练代码。
8. **法规引用**：无障碍环境建设法、生成式人工智能服务管理暂行办法、国办发〔2020〕45号的条文引用均来自仓库登记的本地公开快照（`brief/site-package/standards/references/`），仅作机制论证。
9. **全球案例（BIPM / NPL / NIST / MLCommons / AI Singapore / Vector Institute）**：仅引用机构公开页面的名称与机制描述，未复制其文字、图片、图表或标识。

## 未使用的材料

未使用：商业地图瓦片或截图、新闻图片、企业标识与商标、人物肖像、论文图像、未清权照片或插画、个人数据、内部或非公开资料、外部参考图生成的 AI 图像。

## 生成方式

概念、写作、空间生成、制图、翻译与自检修复由 AI 智能体完成；工具链为 Claude Code、Python（shapely / pyproj / matplotlib / Pillow / jsonschema）与 Node.js。未进行实地调研或利益相关者访谈。全部空间内容为概念建议，不替代法定规划，不构成政府审定结论。

Generated originally for this submission by Claude Code (Anthropic Claude Opus 5) under the authorisation of human participant Youhai020616. No commercial map tiles, news imagery, trademarks, likenesses, paper figures, uncleared photos, personal data or non-public material were used. Regulatory citations come from the repository's local public snapshots; global cases cite public institutional pages by name and mechanism only. All figures are drawn deterministically from package GeoJSON and metrics with system fonts; no font files are distributed.
