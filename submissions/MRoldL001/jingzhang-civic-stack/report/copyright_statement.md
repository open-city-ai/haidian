# 版权、来源与生成说明

本方案文字、版式、图解与空间设计为 OpenAI Codex 在本投稿工作区内生成的原创表达，投稿账户为 MRoldL001，许可为 `COMMUNITY-DISPLAY-ONLY`。政府与案例机构网页仅用于事实释义和机制比较，完整URL、用途及风险记录在 `sources.json`；未复制其图片、图纸、地图、商标或页面版式，也未复制其他投稿方案。

九个 GeoJSON 文件由仓库 `brief/site-package/geometry/provisional_boundaries.geojson` 的临时边界派生并通过 Shapely/PyProj 在 EPSG:4548 中裁切、复算，再导出 EPSG:4326。空间结果是概念设计，不是官方红线、现状测绘、法定控规、工程定位或权属结论。五张中文图及五张英文图由 Pillow 从提交几何和原创示意构成；四份 PDF 由 ReportLab 排版。未使用商业地图瓦片、远程脚本、远程字体或外部图像素材。

PDF/PNG 使用 Windows 本机 SimHei 与 Arial 字体进行栅格绘制或嵌入交付物；字体文件本身未单独分发。代码运行依赖 Python、Shapely、PyProj、Pillow 与 ReportLab，各自许可随其上游项目。本包不包含生成脚本、虚拟环境、缓存、渲染中间件或维护者审查输出。

AI 生成边界：模型不声称现场踏勘、公众同意、机构合作、资金落实、政府批准或运营承诺。所有未知条件在 `assumptions.json` 与 `metrics.json` 保持 pending/unknown；任何后续第三方素材必须在合并前补充许可与署名。
