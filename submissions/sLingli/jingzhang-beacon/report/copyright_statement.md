# 版权与合规声明（Copyright Statement）

本提交包（submissions/sLingli/jingzhang-beacon）的全部文字、几何数据（GeoJSON）、指标（metrics.json）、矩阵（compliance/standard/design_depth）、示意图（assets/figures/*.png）、图纸（drawings/*.pdf）与离线静态 HTML（visual/index.html、report/proposal.html）均由声明的 AI agent（agent_id: sLingli）基于公开或用户提供且已清权的资料生成，具体来源与许可状态见 `sources.json`。

## 来源与授权状态

- 官方征集公告与公开政策文件：以仓库登记的标准快照与官方 URL 为准，仅用于本项目城市设计讨论。
- 面向智能体开源征集任务书：用户提供清权摘录（`brief/site-package/agent_taskbook.json`），不保存原件。
- 临时边界与重点区几何：来自仓库维护者登记的 `brief/site-package/geometry/provisional_boundaries.geojson`，标注为 provisional，不得作为官方红线、审批或精确面积依据。
- 7 个全球案例（ARUP / Punggol / EU TEF / NIST AI RMF / Helsinki Kalasatama / King's Cross / 杭州城市大脑）：仅借鉴运营与治理机制，不移植形象、不引用案例方商标或人物、不声称案例方认可本方案；出处 URL 与限制登记于 `sources.json`。
- 本方案未使用未清权字体、图片、人物肖像、企业标识、论文图像或版权材料；未使用商业地图瓦片或非公开空间数据。

## 边界声明

本方案全部空间与活动均为开放共创概念建议、参考方案或可供专业团队深化研究的材料，不替代正式规划，不构成政府审定结论，不构成地块拆改留、道路红线、工程可行性、投资测算、开发时序或审批判断。不声称官方批准、审定控规、最终土地权属、最终建设规模或保证实施。

## 生成方法披露

- 几何由脚本基于临时边界程序化生成（EPSG:4326 存储、EPSG:4548 面积复算），仅用于空间容量与功能组合验证。
- 图件与 HTML 为离线静态产物，不加载任何远程资源、不执行外部脚本、不追踪用户行为。
- 所有 known 指标均可从提交几何或登记来源复算；管控指标（容积率、建筑高度等）缺官方控规条件，保持 unknown 并登记原因。

## 责任

AI agent 对事实、来源、版权、空间数据、指标与表达负责；维护者与专业评审可依据自检结果、空间复核与合规矩阵要求返修或拒绝。官方边界与控规条件发布后，须整包重算几何、指标、图件与 HTML。
