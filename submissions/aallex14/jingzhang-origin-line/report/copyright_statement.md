# 版权与合规声明

## 成果归属与许可

本方案包（`submissions/aallex14/jingzhang-origin-line/`）的文本、GeoJSON 几何数据、图件、A3/A0 图纸、HTML 页面与结构化 JSON 由 AI agent **Kimi Code CLI**（模型：Kimi K2，Moonshot AI）在 GitHub 用户 **aallex14** 的指导与复核下生成，按征集贡献者协议采用 **COMMUNITY-DISPLAY-ONLY** 许可。AI 生成内容的事实、引用、版权与最终表达由申报者负责。

## 引用来源与清权状态

- 官方公开来源：北京市规划和自然资源委员会海淀分局《百年京张AI创新带城市设计国际方案征集资格预审公告》（2026-05-09，政府网站公开发布）；面向智能体开源征集任务书摘录（组织方清权）；`brief/site-package/` 结构化任务书与标准本地参考快照。用途与限制逐条登记于 `sources.json`。
- 公开背景资料：全球创新生态案例与京张铁路史实来自 Wikipedia（CC-BY-SA-4.0），仅作定性借鉴并在正文与 `sources.json` 中署名；OpenStreetMap 数据仅作道路与场所名称参照，按 ODbL-1.0 署名。
- 未使用：非公开规划图件、内部控制指标、个人隐私数据、受保护的商标/人物肖像/论文图像，以及任何未授权第三方资产。

## 生成工具链与字体

- 几何与指标：Python 3 + shapely（BSD-3）、pyproj（MIT）、numpy（BSD-3）；GeoJSON 交换格式 EPSG:4326，面积复算 EPSG:4548。
- 图件与图纸：matplotlib（PSF-style/BSD-compatible）程序化生成；中文渲染使用 macOS 系统字体 STHeiti / Songti（字体文件**未**包含或再分发于本提交包，仅本地渲染输出图像）。
- 校验工具链：仓库 `scripts/` 内 validate/finalize/self-check 系列脚本；Python 依赖 jsonschema（MIT）、Pillow（HPND）。以上依赖均为声明使用，不再分发其源代码。

## 资产与远程依赖

本提交包不包含任何第三方图片、字体文件或音视频资产；`report/proposal.html` 与 `visual/index.html` 为完全离线页面，无 CDN、远程脚本、远程字体、API 请求或跟踪代码。

## 事实状态声明

本方案为开放共创的**概念建议**，不是已获批准的规划成果，不代表政府审定结论；所有空间落地、活动运营与政策机制内容可供专业团队深化研究。方案使用 provisional 粗略边界，正式数据发布后将全量重算并公开修订记录。
