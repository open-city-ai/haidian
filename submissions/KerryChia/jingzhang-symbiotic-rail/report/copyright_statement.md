# 版权与授权声明 / Copyright Statement

本提交包（`submissions/KerryChia/jingzhang-symbiotic-rail/`）内的正文、几何图层（GeoJSON）、指标（metrics.json）、矩阵（compliance / standard / design_depth）、图纸（PDF）、图表（PNG）与离线静态 HTML 展示成果，均由声明的人工智能智能体生成，或使用 `sources.json` 中列明的公开、清权或用户提供资料。

## 来源与授权边界

- 边界与三处重点区域几何来自 `brief/site-package/geometry/provisional_boundaries.geojson`，属 `provisional_constraint`，仅用于生成、展示、自检与设计讨论，不作为官方红线、审批依据或精确面积依据 [source:BOUNDARY-SOURCE][source:KEY-AREA-SOURCE]。
- 专业标准依据取自仓库本地快照 `brief/site-package/standards/`，正文回引对应标准 ID [standard:PROJECT-OFFICIAL-ANNOUNCEMENT][standard:MOHURD-URBAN-DESIGN-MEASURES]。
- 企业、高校与园区名称仅作为公开背景与概念借鉴，不构成招商、投资或政策承诺；未使用任何未清权的商标、字体、图像、人物肖像或版权材料。

## 本地性与离线要求

`visual/index.html` 与 `report/proposal.html` 均为离线静态页面，不加载 CDN、远程地图瓦片、外部脚本、外部字体、iframe、表单或外部 API，不采集或跟踪评审者行为。

## 授权

本提交为开源共创成果，供社区、专业团队与公众在公开征集语境下阅读与深化；具体许可以 `proposal.md` front matter 中 `license` 字段（COMMUNITY-DISPLAY-ONLY）为准。任何后续商业或出版使用需另行获得相关来源授权。

## 逐资产版权与来源台账

回应评审对"字体、图片、图标、地图、代码与生成资产的作者/许可证证据"的要求，逐项登记如下。COMMUNITY-DISPLAY-ONLY 完整条款：本方案全部成果仅供本次开源征集社区展示、评审与讨论，不授予商业复用、再分发或衍生权利，不构成商标主张，不含任何第三方受保护字体、图像、图标、地图瓦片或人物肖像。

| 资产 | 类型 | 作者 | 生成方法 | 许可证/授权 | 字体嵌入权/复用范围 |
| --- | --- | --- | --- | --- | --- |
| Noto Sans CJK SC（Regular/Bold） | 字体 | Google / Adobe（Noto CJK 项目） | 第三方开源字体 | SIL OFL 1.1 | fsType=0 可嵌入；允许嵌入、使用、复制、再分发；用于 PDF/图件中文渲染 |
| assets/renders/logo-mark.jpg | AI 生成图 | KerryChia（AI 辅助） | AI 文生图（提示词由作者设定） | COMMUNITY-DISPLAY-ONLY | 品牌主标；单色/反白由方案派生；不主张注册商标，不含第三方素材 |
| assets/renders/landmark-origin-lighthouse.jpg | AI 生成图 | KerryChia（AI 辅助） | AI 文生图 | COMMUNITY-DISPLAY-ONLY | 京张原点灯塔概念渲染，非已批准建设 |
| assets/renders/landmark-governance-observatory.jpg | AI 生成图 | KerryChia（AI 辅助） | AI 文生图 | COMMUNITY-DISPLAY-ONLY | 众智园治理观象台概念渲染，非已批准建设 |
| assets/renders/landmark-dazhongsi-roadshow.jpg | AI 生成图 | KerryChia（AI 辅助） | AI 文生图 | COMMUNITY-DISPLAY-ONLY | 大钟寺国际路演客厅概念渲染，非已批准建设 |
| assets/renders/scene-park-ai-experience.jpg | AI 生成图 | KerryChia（AI 辅助） | AI 文生图 | COMMUNITY-DISPLAY-ONLY | 京张遗址公园 AI 体验带场景氛围渲染 |
| assets/figures/*.png | 算法图件 | KerryChia（AI agent 脚本） | matplotlib 基于 geometry/*.geojson 经 EPSG:4548 复算定位 | COMMUNITY-DISPLAY-ONLY | 可核验规划图；图中文字用 Noto Sans CJK SC（OFL 可嵌入）；底图为临时边界 |
| drawings/a3-booklet.pdf / a0-boards.pdf | 文档 | KerryChia（AI agent 脚本） | PyMuPDF 嵌入 Noto CJK 子集 + 上述图件 | COMMUNITY-DISPLAY-ONLY | 嵌入 Noto Sans CJK SC（OFL，fsType=0，已子集化）；A3 横版文册/A0 竖版展板 |
| geometry/*.geojson | 空间数据 | KerryChia（基于 site-package 临时边界构建） | 手工/脚本建模，EPSG:4326 存储、EPSG:4548 复算 | COMMUNITY-DISPLAY-ONLY | provisional_constraint / official_boundary=false，不作官方红线或审批依据 |
| report/proposal.html / visual/index.html | 文档 | KerryChia（维护者脚本渲染） | render_proposal_html.py 渲染 proposal.md | COMMUNITY-DISPLAY-ONLY | 离线静态页，不加载远程脚本/字体/瓦片/iframe，不跟踪评审者 |

**第三方依赖**：唯一第三方资产为 Noto Sans CJK SC 字体（SIL OFL 1.1，已核验 fsType=0 可嵌入，状态 cleared）。**待办**：三个历史来源（RESEARCH-JZ-RAILWAY、RESEARCH-QHY-STATION、RESEARCH-PARK-2023）与五个国际案例的书目已在 `sources.json` 标注 background-only，未经 source_registry 审核批准前不作为正式空间或史实依据；AI 生成渲染图建议正式发布前由作者再次确认无第三方相似性风险。本声明不构成现实世界版权法律意见。
