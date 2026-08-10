# 版权声明 / Copyright Statement

## 资产来源与权利登记 / Asset Provenance and Rights Registry

| 资产类别 | 文件 | 来源/生成方式 | 许可/授权状态 | 约束 |
|---------|------|-------------|-------------|------|
| 方案正文 | proposal.md | AI Agent OpenSquilla 生成 | COMMUNITY-DISPLAY-ONLY | 仅限本次开源征集评审与展示 |
| 空间数据 | geometry/*.geojson | AI Agent 基于 site-package provisional boundary 生成 | 同上 | 临时边界仅限生成/展示/自检 |
| 指标数据 | metrics.json, compliance_matrix.json 等 | AI Agent 从 GeoJSON EPSG:4548 投影计算 | 同上 | 临时边界派生指标需复算 |
| 论证图 | assets/figures/*.png | Python matplotlib+Pillow 程序化生成 | 程序化输出，无第三方图片 | 字体 Noto Sans SC（SIL OFL v1.1 开源许可），可商用 |
| 图纸 | drawings/*.pdf | Python fpdf2 程序化生成 | 程序化输出 | 同上 |
| 网页 | visual/index.html, report/proposal.html | 脚手架+AI Agent 编辑 | 程序化纯静态 HTML/CSS | 离线可打开，无外部依赖 |
| 数据来源 | sources.json | 引用 data/source_registry.json | 遵循仓库 source registry | 已登记 5 项 formal 来源 + 1 项 provisional |

## 字体声明 / Font Notice

本投稿包使用 Noto Sans SC（Noto Sans SC）作为 PDF 和 PNG 输出字体。Noto Sans SC 为 Microsoft Windows 操作系统自带字体。当前阶段用于设计讨论和概念展示属合理使用；若进入正式出版或商业分发，字体商用授权需由接收方单独确认，或替换为开源中文字体（如思源Noto Sans SC Source Han Sans / Noto Sans CJK）。

## 数据边界声明 / Data Boundary Notice

- 空间图层基于 provisional_boundaries.geojson 中的临时粗略边界生成。
- 临时边界不是官方红线，不构成审批依据，不得用于精确面积计算或法定控制。
- 所有基于临时边界的面积、比例和空间关系均标注为 provisional，并在 manifest.validation_claim.known_blockers 中披露。
- 正式官方 polygon 发布后，需完整替换所有 geometry/ 文件、重新计算全部指标、更新全部图纸和 HTML、并重新运行自检。

## 第三方内容 / Third-Party Content

- 本投稿包不含远程图片、第三方地图瓦片、远程脚本、API 请求、iframe 或表单提交。PDF 中嵌入的 Noto Sans SC 字体为本地 OFL 开源字体，非远程加载。
- 本投稿包不含非公开地图、秘密数据、伪造官方背书或未经授权的第三方知识产权。
- brief/site-package/ 下引用文件的来源、许可和公开性审查已在 data/source_registry.json 和 sources.json 中登记。

## AI 生成声明 / AI Generation Disclosure

本投稿包全部文本、几何数据、指标、图表、图纸和网页均由 AI agent OpenSquilla（GitHub: openvictory）生成。生成过程基于 brief/site-package/ 中的公开/清权资料。所有设计判断为 AI 共创概念建议，不替代专业规划设计、政府审定或法定审批。

## 权利归属 / Rights

投稿者（openvictory）保留对 AI 生成内容的署名权。投稿内容遵循仓库许可证 COMMUNITY-DISPLAY-ONLY，仅限本次百年京张AI创新带城市设计开源征集评审、展示和社区讨论。
