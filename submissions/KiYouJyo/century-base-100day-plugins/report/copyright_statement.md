# 版权与生成披露 / Copyright and Generation Disclosure

## 生成责任

本方案由 OpenAI Codex（GPT-5 family）在用户人工指导下生成。准确部署标识未向 Agent 暴露，因此 `agent.json` 与 `manifest.json` 只如实声明可知的模型族和限制，不猜测具体模型字符串。用户尚未授权创建 Pull Request、向 upstream 投稿、发布或作出实施承诺；本包只是一套本地验收候选。

## 数据与图件

- 场地与重点区使用仓库 `brief/site-package/geometry/provisional_boundaries.geojson` 的临时粗略几何；不是官方红线、测绘或审批依据。
- 用地、建筑、道路、绿地、公共空间和分期均由本包脚本从临时几何生成，属于概念设计。
- 五组中英文核心图、离线 visual HTML、A3文册和A0展板完全由包内 GeoJSON、metrics.json 与 visual/assets/design_program.json 程序绘制。
- 未下载或嵌入外部案例照片、地图、图表、企业Logo、商标、人物肖像、宣传图、视频、音频或生成式图片。
- 全球案例只对政府、运营方或公共审查的一手资料进行事实释义和链接；来源许可与使用边界逐条记录在 sources.json。外部材料不因本方案许可而被重新许可。

## 字体、第三方库与工具

- 图件与PDF使用系统安装的 `NotoSansSC-VF.ttf`（Noto Sans SC），字体项目按 SIL Open Font License 1.1 发布。PDF仅嵌入生成所需的字体子集；字体文件本身不随提交包再分发。
- 程序生成使用 Python、Pillow、Shapely、pyproj、ReportLab；HTML由仓库 `scripts/render_proposal_html.py` 和本地静态生成逻辑生成；PDF视觉核验使用仓库环境中的 Poppler、pdfplumber 与 pypdf。
- 所有图形为本方案原创的程序化线、面、文字和信息图，不使用外部素材包。

## 许可与边界

本方案原创文字、表格、程序生成图形编排和原创设计内容按 CC BY 4.0 提供，作者标识为 `KiYouJyo / Codex-assisted`。官方公告、仓库资料、外部案例事实、第三方库和字体继续适用各自许可或法定使用边界。任何法定规划、工程、产品、运营或安全结论均需由有权限的人类和专业团队复核；本地自检通过不构成认证、批准或实施授权。

## English summary

OpenAI Codex (GPT-5 family; exact deployment identifier not exposed) generated the package under human direction. All bilingual figures, HTML and PDFs are programmatically derived from package GeoJSON/JSON. No external photographs, maps, logos, portraits, promotional graphics or generated imagery are embedded. Noto Sans SC is used under SIL OFL 1.1 with PDF subsetting; libraries include Pillow, Shapely, pyproj and ReportLab. Original package content is CC BY 4.0, without relicensing official, third-party, library or font material. Geometry and all proposals remain conceptual pending official data and professional review.
