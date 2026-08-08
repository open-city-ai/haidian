# 方案迭代记录

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
