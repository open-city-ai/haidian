# 版权与开放共创声明

本提交包中的方案文字、结构化数据、GeoJSON 设计图层、信息图、Logo 方向、离线网页、A3 文册与 A0 展板均由 OpenAI Codex（GPT-5）与 JacksonHe04 为本次征集原创生成。

图面未嵌入第三方摄影、人物肖像、商标、论文图像或远程素材；使用系统字体进行显示和 PDF 嵌入。全球案例仅以原创文字概括，来源链接列于 `sources.json`，不复制原网页图文。组织方提供的公开任务数据与临时边界按其原有说明使用。

本方案作为开放共创建议提交，可供组织方、公众和专业团队继续研究、评议与深化；不替代正式规划，不构成政府审定结论。后续使用者应继续核查数据许可、字体与第三方权利，并在官方边界与控制条件到位后重新复算。

## 逐资产权利台账

|资产范围|形成方式|权利/许可状态|第三方内容|核验位置|
|---|---|---|---|---|
|`proposal.md`、`proposal.en.md`、`report/narrative.md`|本次原创撰写与翻译|提交者以 CC-BY-4.0 开放|外部事实仅作短句概括并列源|`sources.json`、本文件|
|`assets/figures/*.png` 及对应 `.en.png`|由同一生成器以自绘几何、文字和提交数据生成|原创图形，CC-BY-4.0|无摄影、肖像、商标、论文图像或远程素材|`manifest.json` 逐文件 SHA-256|
|`drawings/a3-booklet*.pdf`、`a0-boards*.pdf`|由原创文本与上述原创图件排版生成|原创汇编，CC-BY-4.0|无外部嵌入图片|PDF 元数据与 `manifest.json`|
|`visual/index*.html`、`report/proposal*.html`|本地静态 HTML/CSS 原创实现|原创代码与内容，CC-BY-4.0|无远程脚本、字体、图像或追踪器|HTML 源码与静态安全检查|
|`geometry/land_use`、`buildings`、`roads`、`green_space`、`public_space`、`constraints`、`phasing`|在提交边界内原创生成的概念设计图层|作为方案内容 CC-BY-4.0 开放|不含 OSM 或第三方地块/建筑数据|GeoJSON `source_type` 与 manifest|
|`geometry/site_boundary.geojson`、`key_areas.geojson`|保留组织方站点包的临时几何与来源说明|继承源资料边界；不主张为提交者原创或官方红线|来源为 `brief/site-package/geometry/provisional_boundaries.geojson`|图层属性、`sources.json`|
|`agent.json`、矩阵、指标、假设和自检 JSON|本次结构化生成|原创结构化响应，CC-BY-4.0|标准 ID 与任务 ID 来自组织方公开包|各 JSON 与 schemas 校验|
|`risk.json`、`visual/assets/*.json`|由在场契约、行动包、Gate、资源账与风险登记的同一内容源生成|原创机器证据，CC-BY-4.0|合成样例明确标记，未使用真实个人或运营数据|JSON Schema、manifest 与正文交叉引用|
|网页显示与 PDF 字形|使用 macOS 系统 PingFang / Arial Unicode 进行本地显示或字形嵌入|不随提交包再分发字体文件；字体权利不因本声明改变|系统字体|提交目录不存在字体文件|
|全球案例与国际原则|仅原创文字概括并链接官方页面|不复制原网页视觉或长段原文|来源权利归各发布者|`sources.json` 中逐条 URL|

所有可提交文件的最终哈希均由 `manifest.json` 记录；生成器本身位于本地忽略目录，不作为参赛资产提交。后续若新增图片、字体、地图瓦片、品牌标识或数据，必须先在本台账增加单独条目，再进入展示版本。
