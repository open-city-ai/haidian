# 应征规划设计方案著作权声明与逐资产权利台账

## 一、总体声明

1. 本方案《智轨京张 The AI Line：百年京张AI创新带城市设计方案》由 AI agent（Claude Fable 5，经由 Claude Code 运行）生成，提交者 GitHub 账号为 linzhuo606，对提交行为负责；方案无障碍框架由提交者（盲人城市使用者）以第一人称经验定义。
2. 方案文本与图件按 CC-BY-4.0 开放许可发布（署名 linzhuo606），供开源社区、专业团队与主办/承办单位在本项目范围内复核、修改与再创作；正式征集活动的知识产权安排以官方公告第8.1条及正式征集文件为准。
3. 本方案为开放共创的概念建议，不替代正式规划，不构成政府审定结论、审批依据、投资承诺或工程实施方案。

## 二、逐资产权利台账

**图像资产（全部原创矢量绘制，无第三方图片/照片/地图截图/AI图库素材）**
- assets/figures/site-overview.png 等六张核心图纸（含生态图谱）：由本包 GeoJSON/metrics 经 matplotlib 程序化绘制，原创，CC-BY-4.0。
- assets/figures/brand-logo.png：品牌标识概念稿，原创矢量绘制，图形与文字组合未检索到既有商标冲突，但**尚未进行正式商标近似检索与注册**，正式启用前必须完成查重（图上已标"概念稿未注册"）。
- drawings/*.pdf、visual/index.html 内嵌 SVG：同上，由同一数据源程序化生成，原创。

**字体使用**
- 图纸与 PDF 中文渲染使用 Microsoft YaHei（微软雅黑，随 Windows 系统授权），仅以文档内嵌子集/栅格形式出现，不分发字体文件本体；正式出版物或商标注册需另行确认字体商用授权或替换为开源字体（候选：思源黑体 SIL OFL）。
- visual/index.html 不内嵌字体，使用系统字体栈回退。

**代码依赖（仅用于生成，不随包分发）**
- Python 生态：shapely（BSD-3）、pyproj（MIT）、matplotlib（PSF/BSD 风格）、Pillow（MIT-CMU）、jsonschema（MIT）。均为宽松许可，生成产物不受其许可传染。

**数据来源（详见 sources.json 六项登记）**
- 官方公告快照、智能体任务书摘录、公开资料登记表、事实包、临时边界 polygon、站点包：许可与可用性分级见 sources.json 各条 usage_note；OSM 与商业地图数据未用于任何图层。

**生成工具与方法披露**
- 生成模型：Claude Fable 5（Anthropic），经 Claude Code 环境驱动本仓库脚本完成；全部生成脚本可复现（AI原生规划工作流见 proposal.md 指标体系章）。
- 无障碍案例引用（马尔堡、日本点字砖、NaviLens、Wayfindr、新加坡BCA等）为公开常识性事实提及，未复制其受版权保护的表达。

**第三方权利风险自查结论**：未使用人物肖像、企业标识、论文图表、新闻图片、受版权保护的地图底图或未清权数据；唯一待办为 Logo 正式商标查重（见上）。

## 三、其他

方案使用的全部资料来源与许可状态登记于 `sources.json`；数据精度限制与假设登记于 `assumptions.json`；本台账随版本更新维护。
