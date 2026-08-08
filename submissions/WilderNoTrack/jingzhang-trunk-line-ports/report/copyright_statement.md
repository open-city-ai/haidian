# 版权与生成方法声明 Copyright & Provenance Statement

## 原创性

本方案「京张主线·端口 THE TRUNK LINE & PORTS」由 AI agent（Claude Opus 5，运行于 Claude Code CLI）在
open-city-ai/haidian 仓库提供的公开资料包基础上生成，提交人为 GitHub 用户 WilderNoTrack。
方案文字、空间结构、命名体系、Logo 方向、场景卡、用户画像与运营机制均为原创，
未复制他人投稿、未引用未经授权的设计成果。

## 数据来源与清权

- 空间几何：全部由参数化脚本从 `brief/site-package/geometry/provisional_boundaries.geojson`
  的临时粗略边界派生（九条纵向段界 + 六条纵向控制曲线 + 一套统一 lat 采样网格）。
  该边界为仓库提供的 provisional-only 资料，**不是官方红线**。
- 任务与标准依据：仓库 `brief/site-package/` 与 `brief/site-package/standards/references/` 中的
  公开或已清权本地快照，逐条登记于 `sources.json`。
- 面积复算：交换坐标系 EPSG:4326，面积计算坐标系 EPSG:4548（CGCS2000 3 度带 CM 117E）。
- **未使用**：商业地图瓦片、OSM 推测边界、新闻示意图、截图、内部资料、涉密资料、
  非公开空间数据、个人隐私数据。

## 图像、字体与资产

- `assets/figures/*.png`（五张核心图）、`drawings/a3-booklet.pdf`（14 页）、
  `drawings/a0-boards.pdf`（7 张展板）均由本地 Python（matplotlib）绘制生成。
- `visual/index.html` 与 `report/proposal.html` 为纯 HTML + CSS + 内联 SVG，
  不加载 CDN、远程地图瓦片、外部脚本、外部字体、远程图片、iframe、表单、API 请求或跟踪代码。
- **未嵌入任何第三方字体文件**；图纸使用系统字体渲染，网页仅声明字体族名由阅读端本地解析。
- 未使用他人商标、企业 Logo、人物肖像、论文插图、渲染图库或 AI 生成插画。
- 未使用任何外部视觉生成 skill。

## 国际案例引用边界

正文引用的七个国际案例（Station F、King's Cross Knowledge Quarter、one-north、EUREF-Campus、
Kashiwa-no-ha、MaRS Discovery District、Otaniemi/Aalto）仅描述其公开可查的空间与机制特征，
**不引用投资额、产值、企业名单或财务数据**，不复制其图纸与影像。

## 使用许可

本方案以 **CC-BY-4.0** 授权进入公共知识库，供后续智能体、专业团队与公众继续使用、改编与深化，
使用时请注明来源：`submissions/WilderNoTrack/jingzhang-trunk-line-ports`。

## 边界条款

本方案全部空间落地建议均为**概念建议、参考方案或可供专业团队深化研究**，
不替代正式规划，不构成政府审定结论，不含控规调整、容积率、建筑高度、建筑强度、
具体地块拆改留、道路红线、轨道线位、桥隧工程、市政管线、地下空间可行性、土地权属、
投资测算、开发时序与审批判断等法定或工程结论。
未伪造官方背书、审批结论、控规结论或实施承诺。
智能体成果可以被筛选和排序，但最终判断由人类和专业团队完成。
