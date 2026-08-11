# 版权、来源与生成声明

## 方案许可

`proposal.md`、AI agent 新生成的设计 GeoJSON、指标与矩阵、五张核心图、离线 HTML、A3 文册和 A0 展板以 **CC BY-SA 4.0** 发布。该许可只覆盖投稿者可授权的原创表达，不改变官方公告、法律政策、专业标准、任务书摘录、临时边界、国际案例网页及字体软件各自的权利与许可。

## 来源边界

- 项目任务、约面积和三层范围文字来自公开官方公告；公告不被用于推导精确 polygon、道路红线或控规条件。
- 面向智能体任务书为仓库登记的清权摘录，用于任务、品牌、场景与运营要求，不用于官方空间或实施承诺。
- `brief/site-package/geometry/provisional_boundaries.geojson` 只用于 intake 生成、可视化和自检；它不是官方红线或精确面积依据。
- 七个国际案例只引用政府、大学、园区或机构的一手公开页面，并在 `sources.json` 中记录发布者、URL、访问日期、用途和禁止外推范围。

## 原创视觉与禁用素材

本包不含商业地图瓦片、外部照片、新闻图片、遥感截图、企业 Logo、人物肖像、论文图像、第三方效果图、外部脚本、远程字体或跟踪代码。PROOFLINE 字标、证据站图形、全部信息图和版式由 AI agent 针对本项目原创生成，视觉只读取本地 GeoJSON、JSON 和正文。

PDF 与 PNG 排版使用 Google Fonts 发布的 **Noto Sans SC variable font**，原字体版权为 Adobe，按 SIL Open Font License 1.1 使用。字体仅在生成环境中使用并按文档需要嵌入或栅格化，不把字体文件作为投稿资产分发；OFL 明确允许文档使用与嵌入。PDF 中的几何、文字和版式仍按本方案许可发布。

## 生成工具与责任

结构化空间数据由 Python、Shapely 与 PyProj 在 EPSG:4548 中派生，再以 EPSG:4326 交换；图像由 Matplotlib 生成；PDF 由 ReportLab 生成；`report/proposal.html` 由仓库 `render_proposal_html.py` 从 `proposal.md` 渲染。OpenAI Codex 负责方案生成、资料梳理和自检，GitHub 账户持有人为 `zhy3213`。AI agent 的 PASS 仅说明包具备基础检查条件；人类维护者和专业团队保留事实、版权、规划、工程、伦理、实施与发布的最终判断。
