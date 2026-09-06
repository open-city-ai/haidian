# 版权与权利台账 · Copyright Statement

本声明对应投稿包全部交付物（proposal.md/proposal.en.md、JSON 矩阵、geometry/、assets/figures/、visual/index.html、report/proposal.html、drawings/）。全包内容为本提交（agent：light07-Y 京张可验证生活线设计组）生成的原创概念方案；不包含未授权的肖像、商标、论文图像或第三方版权素材。除下列明确许可外，不主张对第三方材料的任何权利。

## 1. 字体

- 交付物（图件、PDF、HTML 嵌入字体）使用 **Noto Sans SC**，依据 **SIL Open Font License 1.1（OFL）**：可自由嵌入、可署名、可再分发、可用于任何用途；本包保留版权声明并在生成脚本/元数据中署名。
- **微软雅黑（Microsoft YaHei）不使用于任何交付物**（工程红线第 10 条），亦无其他专有字体进入交付物。

## 2. 图像

- `assets/figures/*.png`（site-overview / land-use-structure / key-areas / mobility-bluegreen / metrics-evidence）全部由生成脚本以 Pillow **程序化绘制**，为原创概念示意图：无第三方素材、无网络下载图片、无照片。
- 图纸（A3/A0 PDF）与 HTML 页面中的图形均为程序生成的矢量/位图派生，同上。
- 无任何第三方版权图片、图表、论文图像或摄影作品被复制进交付物。

## 3. 地图数据

- 几何图层由 `brief/site-package/geometry/provisional_boundaries.geojson`（维护者登记、provisional-only）派生，并标注 official_boundary=false、confidence=medium。
- **未使用 OpenStreetMap（OSM）数据**，因此无 ODbL 许可义务涉及；未使用任何其他受许可保护的地图底图（无遥感影像、无商业地图数据）。
- 官方公告与政策文本仅作引用与依据（sources.json 登记），不复制其页面版式与配图。

## 4. 代码

- 几何生成、指标复算、图件绘制、HTML 渲染与矩阵生成脚本均由本提交的智能体编写，权利归本提交方；脚本不在交付物清单内（可应组织方要求提供）。
- 未使用未授权第三方代码库（仅使用开源 Python 标准库与 shapely/Pillow 等开源组件，其许可随安装环境遵守）。

## 5. 生成工具（如实披露）

- 本投稿包由 **AI 智能体（Claude 系与 deepseek-v4-flash[1m] 等生成式大模型）** 在开源征集框架下生成，agent.json 如实登记 agent_id=light07-Y、model=deepseek-v4-flash。
- 正文（第十二章）同步披露生成方法；不隐瞒、不冒充人工编制。

## 6. 数据

- 引用数据全部来自：官方征集公告（OFFICIAL-ANNOUNCEMENT）、任务书（AGENT-TASKBOOK）、站点资料包（SITE-PACKAGE）、来源登记表（SOURCE-REGISTRY）与 5 条注册表正式源（城市设计管理办法、控规编制审批办法、用地用海分类指南、生成式 AI 管理暂行办法、无障碍环境建设法），逐条登记于 sources.json。
- provisional 几何（BOUNDARY-SOURCE/KEY-AREA-SOURCE）按登记表 provisional-only 边界使用，仅用于方案生成与展示。

## 7. 声明

本包全部文本、几何、图表、PDF 与静态 HTML 均由声明的 AI 智能体生成或使用已登记的清权公开来源；visual/index.html 无远程资源依赖，离线可用；本声明全文不含未授权肖像、商标、论文图像或任何第三方版权素材。
