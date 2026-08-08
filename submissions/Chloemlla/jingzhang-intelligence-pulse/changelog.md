# 方案迭代记录

## v0.6 - 2026-08-08

- 第四轮质量强化：新增 AI 治理与规则话语权（公告五大功能之五展开，agent.2/6）、命名体系与视觉识别方向（agent.1）、空间文化表达载体（agent.5）；proposal 迭代号升至 v0.5。
- 同步可视化页面任务覆盖清单。
- 重渲染 report/proposal.html，manifest sha256 与 LF 检出行对齐；self_check 四层 PASS，`formal-review-ready`。

## v0.5 - 2026-08-08

- 第三轮质量强化：新增东西缝合与南北贯通概念策略（agent.4）、大钟寺智能原生消费与商务场景（agent.4）、开发者社区运营机制（三层结构+双场运营，agent.6）；proposal 迭代号升至 v0.4。
- 同步可视化页面（重点区域注明智能原生业态与缝合策略、任务覆盖补开发者社区）。
- 重渲染 report/proposal.html，manifest sha256 与 LF 检出行对齐；self_check 四层 PASS，`formal-review-ready`。

## v0.4 - 2026-08-08

- 第二轮质量强化：新增土地/空间/产业/资金/人才/算力/数据/场景八类机制与中关村科技服务翼支撑机制（agent.2）、场景-空间-运营映射表（agent.3）、公共利益与包容机制、荣誉展示体系（agent.4）、AI 增强规划工作流说明；proposal 迭代号升至 v0.3。
- 同步可视化页面（蓝绿公共空间补荣誉展示卡片、AI 场景注明场景-空间-运营映射）。
- 重渲染 report/proposal.html，manifest sha256 与 LF 检出行对齐；self_check 四层 PASS，`formal-review-ready`。

## v0.3 - 2026-08-08

- 强化方案质量：新增 AI 创新生态图谱（六类主体三类流动，agent.2）、公共空间组件库（agent.4）、导视·标识·符号系统方向（agent.5）、活动品牌与传播视觉系统（agent.6）、国际传播叙事（agent.5/6）、更新项目清单表格（八类×分期×实施主体×政策依赖），并将 proposal 迭代号升至 v0.2。
- 同步可视化页面：蓝绿公共空间板块补组件库与导视标识卡片、更新项目板块补活动品牌与国际传播标签、任务覆盖板块列出全部新增成果。
- 重渲染 report/proposal.html，包内文本文件归一化为 LF，manifest sha256 重新对齐 LF 检出行；self_check 四层全部 PASS，`formal-review-ready`。

## v0.2 - 2026-08-08

- 修复 deterministic CI：manifest.json 全部登记文件 sha256 已按 LF 检出行重算，与 CI 检出字节一致。
- 修复 changelog.md 结构：补齐 `# 方案迭代记录` 标题与版本标题格式。
- 补充说明：site_boundary 与重点区域为临时粗略范围（provisional），官方 polygon 到位后需重算全部面积类指标。

## v0.1 - 2026-08-08

- 建立"京张智脉"总体概念与"一带三核两翼"空间结构，完成命名与 Logo 概念。
- 使用临时粗略边界（provisional）生成 formal 提交包：site_boundary、三处重点区域，均标注 `official_boundary=false`，替换官方 polygon 后需重算面积类指标。
- 完成 9 层几何（site_boundary / key_areas / land_use / buildings / roads / green_space / public_space / constraints / phasing），land_use 全场地无缝隙无重叠。
- 撰写 `proposal.md`：13 个必需章节、12 张 AI 场景卡（含 3 张测试验证场景）、6 类人才画像、7 个全球生态案例、4 处朝圣地标、六项智能体任务全部展开。
- 生成 5 张证据图、`report/proposal.html`、A3 文册与 A0 展板、离线 `visual/index.html`（14 个必需模块 + 3 项 data-metric 指标）。
- 填写 compliance_matrix（23 项）、standard_matrix（6 项）、design_depth_matrix（15 项）、sources（11 项）、assumptions（9 项）。
- 自检结果：deterministic validation / spatial review / visual packaging / professional evidence 全部 PASS，`formal-review-ready`。

## 待复核事项

- 官方 SITE_BOUNDARY 与 KEY_AREA polygon 发布后，需重切 land_use 并复算全部面积类指标。
- 容积率、建筑高度、密度、退线等法定控制条件待控规与主管部门确认。
- 现状建筑、权属、轨道线位、市政容量与投资测算需专业团队深化。
