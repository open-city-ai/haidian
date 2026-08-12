# 版权、来源与责任声明

## 总原则

本投稿采用 COMMUNITY-DISPLAY-ONLY 许可声明。许可范围以仓库规则和投稿者最终确认版本为准；该声明不转授第三方背景网站、官方文件或临时空间数据的版权，也不改变其原有权利与用途限制。

本投稿未纳入外部照片、插画、地图截图、地图瓦片、第三方图标、第三方字体文件、企业商标图形、人物肖像、音频或视频。案例仅以事实性名称和 URL 作背景引用，没有复制案例网站的图片、Logo、版式或长段文字。英文机构名称仅作必要的指称性引用，不代表授权、合作或背书。

## 逐资产权利台账

| 资产或资产组 | 形成方式与权利状态 | 外部依赖 | 允许用途与限制 |
| --- | --- | --- | --- |
| proposal.md | 本投稿原创中文方案文字，由 AI 工具辅助研究、组织与起草，投稿者负责选择、核验与发布 | 正式资料和背景案例只以短摘要及证据标签引用 | 可按投稿许可展示；不得把概念建议改述为官方批准或承诺 |
| proposal.en.md | 对 proposal.md 的完整独立英文译稿，章节、主张、证据和图位对齐 | 使用仓库术语表；不复制第三方译文 | 与中文主稿共同展示；语义一致性由投稿者最终复核 |
| report/narrative.md | 从主体方案原创提炼的派生摘要 | 无外部文字资产 | 仅作阅读导航，不替代主体方案或机器证据 |
| visual/assets/question-ledger.schema.json、question-ledger.example.json | 本投稿原创的问题治理交换格式与 12 项概念示例 | 来源、假设与设计 feature 仅以 ID 引用 | 用于展示问题、责任、验证门和退出条件；不是实际运营台账、审批或采购记录 |
| compliance_matrix.json、standard_matrix.json、design_depth_matrix.json、sources.json | 本投稿原创的结构化编排；官方要求、标准状态和来源字段作事实性登记 | 对仓库 schema、任务书、标准索引和来源登记表进行映射 | 可用于校验和审查；背景或 provisional 来源不得被升级为正式控制依据 |
| geometry/*.geojson 与 metrics.json | 由仓库 provisional geometry、统一分类和投稿生成逻辑派生；原始来源权利与限制保留 | PROVISIONAL-BOUNDARIES；无外部地图、OSM 或截图 | 仅支撑概念生成、面积与拓扑校核及图解；不得作为官方红线、精确面积或审批依据 |
| assets/figures/site-overview.png 及 .en.png | 由本投稿文字、GeoJSON、metrics 和矩阵程序派生的原创信息图 | 无外部图片、地图底图、图标或字体文件 | 中文和英文阅读版使用；图不是边界或指标的权威数据源 |
| assets/figures/land-use-structure.png 及 .en.png | 同上，原创结构图 | 无外部视觉资产 | 只解释空间结构和 provisional 状态 |
| assets/figures/key-areas.png 及 .en.png | 同上，原创重点区信息图 | 无外部视觉资产 | 只解释三处重点区责任、场景与风险 |
| assets/figures/mobility-bluegreen.png 及 .en.png | 同上，原创交通慢行与蓝绿关系图 | 无外部视觉资产 | 不构成道路、轨道、市政或景观工程图 |
| assets/figures/metrics-evidence.png 及 .en.png | 同上，原创指标与证据图 | 无外部视觉资产 | 展示 metric 状态和关系，不替代 metrics.json |
| drawings/a3-booklet.pdf、drawings/a0-boards.pdf 及语言对应版 | 由本投稿的文字、图件、结构化数据和原创版式程序生成 | 不嵌入外部照片、商标或第三方版式模板 | PDF 是展示成果，不是权威空间或指标来源；最终导出须复核字体嵌入许可 |
| report/proposal.html、visual/index.html 及语言对应版 | 由本投稿 Markdown、结构化数据和本地 CSS/HTML 程序派生 | 无 CDN、远程脚本、远程字体、远程图片、地图瓦片、iframe、表单、API 或追踪 | 可离线展示；网页代码和版式不改变底层证据的权威顺序 |
| “京张开放题｜JING-ZHANG OPEN CHALLENGES”名称、Logo 与 VI 方向 | 本投稿原创概念：3 段开放框、2 个接口、1 个公众圆点及状态语法 | 不使用铁路企业标志、第三方商标图形或人物形象 | 仅作为本方案品牌方向；不主张注册商标权，不暗示官方采用 |
| 8 个 background_case_study | 仅登记机构名称、官方或机构 URL、简要机制和局限 | 外部网站内容权利归原权利人 | 仅作方法背景；不得支撑京张规划控制、政府承诺、投资、工程结论或视觉资产复用 |

## 字体、图片与商标

- 投稿目录不包含或再分发字体文件。PNG 与 PDF 使用本机 `/usr/share/fonts/truetype/droid/DroidSansFallbackFull.ttf` 和 DejaVu Sans：前者来自 Debian `fonts-droid-fallback` 包并按 Apache-2.0 许可，后者按 DejaVu 字体许可；PDF 仅嵌入渲染所需子集。HTML 使用系统字体回退，不从 CDN 或远程地址加载字体。
- 所有核心 PNG 均为程序派生信息图，不使用外部照片、卫星图、商业地图、OSM 底图、新闻图或生成式氛围插画。
- 不包含第三方企业 Logo、机构徽标或注册商标图形。案例名称只为说明来源而以纯文字出现。
- 不包含人物照片、肖像、声音或可识别个人数据。

## AI 工具与人类责任

AI 工具参与了公开资料检索辅助、案例归纳、方案写作、翻译、结构化映射、GeoJSON/metrics 派生、图件与 HTML/PDF 生成建议。AI 工具不是作者权利保证人、规划审批主体、注册专业人员或法律责任主体，也不能代表主办方、政府、来源机构或案例机构作出承诺。

GitHub 投稿者承担最终责任，包括：

1. 核对每个来源、URL、访问日期、允许用途和禁止用途；
2. 确认无未授权图片、字体、商标、肖像、代码或个人数据进入提交包；
3. 核对中英文主张、指标、图件与状态一致；
4. 将 provisional geometry 与官方资料严格区分，并在官方数据到位后整体复算；
5. 对规划、建筑、交通、市政、景观、消防、文保、隐私、安全和工程结论寻求相应专业复核；
6. 在提交前复核 PDF 字体嵌入、HTML 离线依赖、manifest 哈希与最终资产清单。

如后续发现权利、来源、翻译、数据或专业判断错误，应公开更正版本；涉及不确定授权的资产应立即移除或替换。安全地撤下一项资产或停止一项不合规试验，属于本方案所主张的责任实践。
