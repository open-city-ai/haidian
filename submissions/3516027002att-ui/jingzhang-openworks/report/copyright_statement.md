# 版权与素材清权声明 / Copyright Statement

## 一、成果生成与权属

本投稿包（`proposal.md`、`geometry/*.geojson`、`metrics.json`、三个矩阵、七张图纸、A3 文册、A0 展板、`visual/index.html` 与生成源 `build/`）由声明的 AI agent 生成，投稿人 GitHub 账号 `3516027002att-ui`。

依据官方公告 8.1 知识产权条款：应征文件和设计成果的知识产权由主办单位／承办单位与应征人共同享有；应征人对其应征规划设计文件享有署名权。本投稿按开源征集机制提交，许可标记为 `COMMUNITY-DISPLAY-ONLY`。

## 二、资料来源与清权状态

全部资料来自公开来源或仓库登记的清权资料，逐条记录于 `sources.json`，并回引 `data/source_registry.json` 的 `source_id`：

- 《百年京张AI创新带城市设计国际方案征集资格预审公告》——官方公开页面本地快照，`usable_for_formal="yes"`。
- 《面向全球智能体开展百年京张AI创新带城市设计开源征集任务书摘录》——用户提供的清权摘录，`usable_for_formal="yes"`。
- 《城市设计管理办法》《城市、镇控制性详细规划编制审批办法》《国土空间调查、规划、用途管制用地用海分类指南》——部委官方公开文本本地快照，`usable_for_formal="yes"`。
- `brief/site-package/geometry/provisional_boundaries.geojson`——仓库维护的临时粗略几何，`usable_for_formal="provisional_only"`，仅用于生成、可视化与入口自检。
- 《建筑工程设计文件编制深度规定（2016年版）》——仓库登记为 `missing_source_url`，本方案仅作待补参照项，未作为已满足的权威依据。

**本方案未使用**：非公开规划图件、非公开空间数据、内部控制指标、企业内部数据、个人隐私数据、商业地图底图与瓦片、新闻示意图、宣传图、外部地图截图、OSM 推测边界，以及 `brief/site-package/geometry/study_area_bbox.geojson`。

## 三、图像与字体

`assets/figures/*.png`、`drawings/*.pdf` 与 `visual/index.html` 中的全部图形均由本投稿包内的 GeoJSON 与 `metrics.json` 派生生成，不含任何第三方图片、渲染图、卫星影像或航片。

`visual/index.html` 与 `report/proposal.html` 不加载远程图片、外部脚本、外部字体、CDN 资源、iframe、表单或 API 请求；字体仅以系统字体族名声明（`-apple-system`、`PingFang SC`、`Microsoft YaHei`、`Noto Sans CJK SC` 等），不嵌入任何字体文件。

图纸使用生成环境允许嵌入的系统字体，并在 PDF 中按实际使用字形进行子集嵌入，不分发完整字体文件。

## 四、未授权素材声明

本方案不使用未经授权的商标、企业标识、人物肖像、论文图像或其他版权材料。

正文与图纸中提及的高校、企业、地名与项目名称，均为对公开事实的引述或对公告内容的回应，不含任何未经授权的标识使用，也不构成对任何机构的代言或背书。

第五章所述视觉识别方向（人字形母题、色彩建议）为**概念方向建议**，其中涉及的具体字体、图像与标识须在深化阶段由专业团队完成清权后方可使用。

第九章所述四处 AI 朝圣地标为**概念建议**，不得表述为已批准建设项目。

## 五、AI 生成责任与人工复核

本方案由 AI agent 生成，生成方式、依据来源与限制已在 `agent.json`、`sources.json`、`assumptions.json` 中披露。

方案的最终判断权属于人类评审与专业团队。本方案全部空间落地内容均表述为"概念建议""参考方案"或"可供专业团队深化研究"，不替代正式规划，不构成政府审定结论，不声称取得任何形式的政府批准、官方背书或实施承诺。

## 六、侵权责任承担

如本投稿包内容被认定存在侵犯第三方知识产权的情形，投稿人承担相应责任，并配合组织方按规则处理。
