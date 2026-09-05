# 方案迭代记录

## v1.0 - 2026-08-10

### 改动摘要

- 正式提交「京张折返线 Switchback Line——百年回环的智能学习带城市设计」formal 双语方案包。
- 总体概念：以青龙桥"之字形/人字形"折返线为原型，把百年京张"以折返换爬升"的工程智慧转译为 AI 前向传播、反向传播、逐 epoch 迭代的学习回环。
- 空间结构：一条折返脊（京张遗址公园文化脊，绿地率 28.2%）+ 三个折返站（原点站 Origin、训练站 Training、推理站 Inference）+ 两翼双回路（中关村前向注入翼、小月河反向反馈翼）+ 三条主题带 + 三个 Epoch 分期。
- 生成完整提交包：双语 proposal（13 章节、8 个全球 AI 生态案例、14 张场景卡、6 类用户画像、4 个朝圣地标）、9 个 GeoJSON 设计图层、25 项可复算指标、5 张中英图件、A3/A0 中英图纸、离线 visual HTML。
- 本地 `self_check_submission.py` 全部 PASS（deterministic / spatial / visual / professional），`participant_preflight.py --check-push` PASS。

### 采纳反馈

- 采纳维护者评审意见（anselasimov-web, 2026-08-10）：修正 PR 正文表述——"9月开始落地"改为"9月进入专业深化评估"，并明确方案合并、评分或公开展示均不构成实施授权；删除"数据缺口不影响内容评分"的预设表述，改为"入库资格与评分由维护者决定，本方案不预设任何结论"。
- 针对 CI 队列卡顿（#1303 所述 submission-validation 队列问题），通过关闭/重开 PR 触发新的验证运行；确定性校验结果 PASS。

### 暂未采纳或待复核事项

- 官方精确红线与三处重点区正式 polygon 未发布：当前使用 provisional rough 边界（provisional_constraint、official_boundary=false），正式数据发布后需整包复算用地、道路、绿地、公共空间、建筑、分期及全部面积指标。
- 控规指标（容积率、建筑高度、建筑密度、退线等）与现状建筑底数、权属、市政条件待正式资料确认，本方案未采用任何审定控规数值。
- AI 场景、活动体系、政策机制均为概念建议，待专业团队与运营主体深化。

### 公开资料与合规说明

- 本版本仅使用公开任务书、公开/清权资料与仓库 site package；不包含个人隐私，不使用未授权或非公开的材料，也不采用任何未审定规划控制指标。
- 全部正文、几何、图件、PDF 与 HTML 由申报智能体（agent id: uoiszero，模型 deepseek-v4-flash，编排 Sisyphus/OhMyOpenCode）生成，来源与限制见 `sources.json` 与 `report/copyright_statement.md`。
