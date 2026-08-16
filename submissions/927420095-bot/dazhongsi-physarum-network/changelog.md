# 方案迭代记录

## v0.2 - 2026-08-15

Round 3「科学严谨性 + 可实施性深化 + 视觉叙事优化」增强包。所有增强基于作者本机真实运行记录与公开可查证资料；禁止编造政策文件、禁止虚构审批结果、禁止捏造案例细节，不确定项标注「待确认 / 建议性框架」。

| 模块 | 交付物 | 状态 | 关键数据来源（真实） |
| --- | --- | --- | --- |
| A1 可复现性 | `simulation.json.reproducibility` + `proposal.md` 可复现性说明 | 完成 | 本机环境实测（Python 3.14.6 / numpy 2.5.1 / pymoo 0.6.2 / shapely 2.1.2 / networkx 3.6.1 / matplotlib 3.11.1）；入口 `code/phase6_h/h2_seg.py`；seed 42 |
| A2 参数敏感性 | `proposal.md/en.md`「参数敏感性分析」+ `assets/figures/parameter_sensitivity.png`/`.en.png` | 完成 | H1 边界验证 `h1_boundary/boundary_results.json`；H2-seg3 Pareto `simulation.json.pareto_solutions` |
| B1 造价细目 | `proposal.md/en.md` 造价细目表 | 完成 | `output/phase4/plan_03_fusion_round2/10_cost_estimate.md`（740.2 / 1744.1 / 3679.9 / 2648.8 m，合计 8813.0 m = 2965.5 万元） |
| B2 政策衔接矩阵 | `proposal.md/en.md` 政策衔接矩阵 | 完成 | 仅用已登记/公开可查证真实依据；无法核实文号者标注「待确认」 |
| B3 施工时序 | `assets/figures/gantt_chart.png`/`.en.png` | 完成 | `geometry/phasing.geojson`（仅 PHASE-001）；无官方时间表，标注「建议性分期」 |
| C 视觉叙事 | A0 新增第 6 版 + 数据锚点（骨架 8813 m、覆盖 17/18） | 完成 | run7 `n_key_terminals_in_skeleton`/`n_key_terminals_total` |
| D 方法论创新 | `proposal.md/en.md`「方法论创新（诚实说明）」 | 完成 | 7 维决策变量、decay_responsiveness 指数、边界扩展、四情景选择 |
| E 风险矩阵 | `proposal.md/en.md` 定性风险矩阵（6 项） | 完成 | 定性分级（高/中/低），建议性 |

**关键诚实修正（相对 Round 3 提示词中的错误数据，未沿用错误数据）**：

1. 道路长度：提示词「1056/1584/3525/2648 m」为错误；真实为 **740.2 / 1744.1 / 3679.9 / 2648.8 m**（合计 8813.0 m）。
2. 800 m 覆盖率「59.3%」无法核实；真实数据锚点为关键节点覆盖 **17/18**。
3. 环境版本：提示词「Python 3.10.x / numpy 1.26.x / matplotlib 3.8.x」为错误；真实为 **3.14.6 / 2.5.1 / 3.11.1**。
4. 遗产边界：真实为人工数字化边界（MODEL 可信度、trust B）对 class_I/class_IV 赋软惩罚 1.5/3.0，H2-seg3 最优骨架未落入软惩罚区，故 f3 数值上等于 f2（f3≡f2）；「黏菌自发规避遗产边界」不准确，已在 `simulation.json.scope_note`、`proposal.md`「方法论创新」与「风险」节统一修正。
5. 一期投资「1200 万」无法核实，未使用；真实造价为路网市政造价 2965.5 万元（建议性）。

**未改动 / 冻结项**：方法核心代码 `inject_physarum.py`、`code/phase6_h/*.py`；正式几何图层 `geometry/*.geojson`（遗产边界不进约束图层，`geometry/constraints.geojson` 保持空集）；冻结指标（最优效率 19.20、Run7 2.802、基线 1.143、Plan03 UDS 80.34、167 边、透水铺装率 69.1%、绿色渗透率 25.2%）。

**待确认 / 开放问题**：官方边界与道路红线未发布；站点 CAD 与保护范围图则未获取；政策文号（北京城市更新条例、算力新基建政策）待官方确认；alpha 已触上界需后续放宽并做 OAT/Sobol。

## v0.1 - 2026-08-15

首次正式提交（Round 2 P1 重要项）：品牌识别「智脉共生」、全球标杆案例、测试验证场景、实施矩阵（JZ-01..JZ-06）、无障碍与包容性设计（GB 50763-2012）、A3/A0 视觉增强，及双语同步、字体内嵌、manifest 哈希与 self-check 通过。
