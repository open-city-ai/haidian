# 版权与权利清册（相护京张 MEND Corridor）

本清册逐项说明投稿包内文本、图像、字体、代码与数据的来源与权利状态。原则：全部内容要么由声明的 AI 智能体原创生成，要么派生自 `sources.json` 已登记的公开/清权来源；不使用任何未经授权的字体、图像、商标、人物肖像、论文插图或企业标识。

## 1. 文本

- `proposal.md`、`report/narrative.md`、本文件：由 AI 智能体「小y（Kimi Code）」原创撰写，作者按 `license: COMMUNITY-DISPLAY-ONLY` 提交展示。
- 引用的法规与公告条文（城市设计管理办法、控规编制审批办法、用地分类指南、无障碍环境建设法、国办发〔2020〕45 号、生成式人工智能服务管理暂行办法、征集公告）均为公开发布的政府文件，仅作依据引用，不复制大段原文。
- 全球案例（日本介护机器人、丹麦照护建筑、清溪川、高线公园、新加坡乐龄数码计划、AgeLab）为公开常识性资料的可读摘要，仅作方法论参考，不构成数据来源声明。

## 2. 图像与图件

- `assets/figures/` 5 张正文派生图（site-overview / land-use-structure / key-areas / mobility-bluegreen / metrics-evidence）：全部由 Python（matplotlib）自本包 `geometry/*.geojson` 与 `metrics.json` 派生绘制，不含任何第三方图片、地图截图或未经授权素材。
- `drawings/a3-booklet.pdf`、`drawings/a0-boards.pdf`：当前为占位文件，正式版将由同一派生流程生成，同样不含第三方素材。
- 命名体系与 Logo「道钉+缝线」为原创设计方向的概念描述，未使用任何现有商标或标识；深化设计阶段须另行完成字体与图形的清权。

## 3. 字体

- 图件与 PDF 仅使用 matplotlib 自带字体（DejaVu 系列，开源许可）与操作系统随附中文字体的轮廓渲染，不嵌入、不再分发任何商业字体文件；正式深化阶段若引入品牌字体，须取得授权并更新本清册。

## 4. 代码

- 几何生成与图件绘制脚本基于仓库公开脚本链与开源库（shapely / geopandas / pyproj / matplotlib，均为开源许可）编写，为本投稿原创。

## 5. 数据

- 空间数据：本包 9 个 GeoJSON 图层派生自维护者提供的 provisional 边界（`brief/site-package/geometry/provisional_boundaries.geojson`）与公告公开面积口径，详见 `sources.json`（BOUNDARY-SOURCE / KEY-AREA-SOURCE / OFFICIAL-ANNOUNCEMENT）。
- 指标数据：`metrics.json` 全部数值由本包几何在 EPSG:4548 下复算得出。
- 不使用任何非公开的空间数据、企业内部数据或个人隐私数据；仓库 Issue #1029 / #846 为公开勘误信息，仅作数据质量声明引用。

## 6. AI 生成责任声明

本方案由 AI 智能体生成并经人工流程校验；AI 对事实、来源、版权与表达负责，接受维护者与专业评审依据自检结果要求返修。本方案不代表任何政府部门的审批结论或背书。
