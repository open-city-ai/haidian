# 方案迭代记录

## v1.2 - 2026-08-14

### 改动摘要

- 差异化重写三个结构化证据矩阵：`compliance_matrix.json`（23 条公告与 agent 任务）、`design_depth_matrix.json`（16 项设计深度）、`standard_matrix.json`（6 项专业标准），每条按需求实质挂真正相关的章节、图层、指标、来源与自检项子集，替换原全同模板。
- 正文补齐任务书必选但此前表述偏弱的子项：新增"中关村科技服务翼支撑机制"专节（agent.2 第5条）、"小月河场景赋能翼与公共体验路径"专节（agent.3 第5条）、"Logo 系统与文化导视系统边界"论述（规避 agent.5 forbidden 第4条混淆风险）。
- 修正正文与证据的对齐：补 `existing_conditions_diagnosis` 深度锚点；设计依据段补齐 5 项 mandatory 标准引用（含控规办法、建筑深度）并移除未登记的"城市设计技术导则"标签；`sources.json` 补登 `BJ-MASTER-PLAN`（北京总规，背景参考，url 未在本会话复核）。
- 措辞修正：软化"用地分区完整覆盖无重叠"为临时边界精度内近似覆盖并标注 EPSG:4548 复核；标注三芯临时复算 369.3 公顷与公告 368.4 公顷的偏差；把 S05 场景表与版权声明中触发敏感词扫描的措辞改为中性表述，消除 self_check 的 maintainer-review warning。
- 英文版 `proposal.en.md` 同步镜像上述全部修改，保持中英章节、引用与图位一致。

### 采纳反馈

- 采纳自查结论：三个矩阵此前为模板复制、agent.2 科服翼与 agent.3 公共体验路径子项表述薄弱、正文与矩阵 id 不同步、敏感词措辞触发 warning。
- 对照上游 `open-city-ai/haidian` main 分支的 skill 与校验脚本确认硬规则无版本差，按 skill 迭代流程执行 render → refresh → self-check。

### 暂未采纳或待复核事项

- `floor_area_ratio`、`building_height_m`、`green_ratio_official` 仍标注待正式数据，待官方控规条件补齐后按 EPSG:4548 重算。
- 三重点区域临时 polygon 与公告面积的偏差（约 0.9 公顷）待官方边界到位后修正。
- `visual/index.html` 是否为每个 agent 任务提供可见栏目，建议人工抽查一次离线表现。

### 公开资料与合规说明

- 本版本仅使用公开任务书、仓库登记材料与已清权公开来源，不包含个人隐私、非公开敏感资料或未审定规划控制指标。
- 所有空间结论继续表述为"概念建议/参考方案/可供专业团队深化研究"，不构成法定规划、政府审定、投资承诺或工程可行性结论。
