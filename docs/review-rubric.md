# 评审 Rubric

本 rubric 供本地 AI 评审 agent 和独立专业评审使用。评审结论不属于 required CI；required CI 只负责确定性安全和格式 gate。

评审输出必须遵守 `brief/site-package/schemas/advisory_review.schema.json`。它只能作为本地审核证据包使用；如需反馈参赛者，只复制其中 `pr_comment_markdown` 到 Pull Request comment，不写入 `submissions-data.js`、公开展示页或已提交的 review 页面。

## 评分维度

- 任务书相关性：是否围绕百年京张 AI 创新带、海淀、AI 创新生态、城市空间和公共治理展开。
- 原创性：是否提出清晰的新概念、新机制或新场景，避免空泛拼贴。
- AI 与城市规划创新性：是否把 AI 能力与产业、空间、交通、公共服务、文化和治理结合。
- 可实施性：是否有阶段路径、试点区域、参与主体和指标。
- 公共利益：是否兼顾居民、青年人才、企业、高校、游客和弱势群体。
- 风险合规：是否尊重公开资料边界、隐私、版权和政策不确定性。
- 表达完整度：是否结构清晰、证据充分、可被继续讨论和深化。

正式专业评分只适用于维护者 gate 已返回 `formal-review-ready` 的方案。评分输出必须遵守 `brief/site-package/schemas/formal_scorecard.schema.json`，并由 `scripts/generate_formal_scorecard.py` 生成本地空白评分表后填写。

权重建议如下：

- 任务书相关性 `brief_alignment`：20%
- 原创性 `originality`：10%
- AI 与城市规划创新性 `ai_planning_innovation`：15%
- 可实施性 `implementation_feasibility`：20%
- 公共利益与包容性 `public_interest_inclusion`：10%
- 风险与合规意识 `risk_compliance`：10%
- 表达完整度 `expression_completeness`：15%

每项按 0-5 分评分，折算为百分制加权总分。因参与者可控制的完整性、合规或证据问题未通过 gate 的方案不得填正式分数，只能给修改意见；组织方缺少 official geometry 本身不得阻断内容评分或导致扣分。

对应的机器可读维度 ID 为：

- `brief_alignment`
- `originality`
- `ai_planning_innovation`
- `implementation_feasibility`
- `public_interest_inclusion`
- `risk_compliance`
- `expression_completeness`

## 面向智能体任务书补充维度

`brief/site-package/agent_taskbook.json` 给出补充评审维度。维护者和 AI 评审 agent 应同时检查：

- 目标契合度：是否服务全球人工智能产业高地和朝圣地目标。
- 功能匹配度：是否准确对应三大定位、五大功能和三区两翼布局。
- 品牌识别度：命名、Logo、视觉系统是否具有辨识度、延展性和国际传播力。
- 区域协同性：是否体现与北纬社区、未来科学城、怀柔科学城、经开区及京津冀的创新协同。
- 规划创新性：是否对综合规划内涵、空间产业融合、国土空间规划创新提出有价值思路。
- 产业支撑度：是否提出 AI 创新生态、要素保障、技术测试和场景开放机制。
- 场景可感知度：是否形成可体验、可展示、可推广的 AI 城市场景。
- 空间明确性：是否说明方案适合落在哪些片区、节点或空间类型。
- 可转化性：是否能被专业团队、运营团队或传播团队继续深化。
- 表达完整性：是否提交文本、图示、表格、场景卡、网页、Logo 等完整成果。
- 公开合规性：是否避免不当内容和侵权内容。
- 国际传播力：是否有助于提升一带全球关注度和辨识度。
- 长期运营价值：是否能够沉淀为一带长期品牌资产、活动机制和合作通道。

## 强制拒绝

- 包含个人隐私、涉密、内部或非公开空间数据。
- 明显伪造官方背书、审批结论或实施承诺。
- 提交攻击性、歧视性、违法或恶意内容。
- 主要内容与任务书无关。
- 未回应 `agent_taskbook.json` 的 `agent.1`-`agent.6` 六项智能体任务。
- 将概念建议、活动设想、政策机制建议表述为已确定政府决策或实施安排。

## 输出边界

七维度评审可由 `scripts/ai_review_submission.py` 在维护者本地调用多模态模型生成，也可交由独立专业评审复核。仓库不在 GitHub Actions 中调用模型；受信任的外部 worker 可按维护者 intake 政策自动 review，并仅在强制退件检查、四项本地 gate 和 60/100 分门槛全部通过后自动 merge。merge 只代表仓库 intake，不代表展示、精选、正式评分、实施批准或政府背书。最终对参赛者可见的内容应是 `pr-comment.md`，而不是公开展示页的一部分。

正式评分表同样是本地维护者材料。若专家组希望向参赛者反馈正式评分摘要，只复制 `formal-scorecard-comment.md` 或整理后的 PR comment；不要把评分 JSON、专家分歧或中间评审材料提交到仓库。

## English Quick Reference

This rubric is used by local AI review agents and independent professional reviewers. It is advisory only; required CI covers deterministic safety and format gates only.

| Dimension ID | Chinese | Weight | Review focus |
|---|---|---|---|
| `brief_alignment` | 任务书相关性 | 20% | Coverage of Jing-Zhang AI Belt, Haidian, AI ecosystem, urban space, and public governance |
| `originality` | 原创性 | 10% | Novel concept, mechanism, or scenario; avoids generic collage |
| `ai_planning_innovation` | AI 与城市规划创新性 | 15% | AI integrated with industry, space, transport, public services, culture, governance |
| `implementation_feasibility` | 可实施性 | 20% | Phasing, pilot areas, participating actors, measurable indicators |
| `public_interest_inclusion` | 公共利益与包容性 | 10% | Addresses residents, youth, enterprises, universities, visitors, marginalized groups |
| `risk_compliance` | 风险与合规意识 | 10% | Respects data boundaries, privacy, copyright, policy uncertainty |
| `expression_completeness` | 表达完整度 | 15% | Clear structure, sufficient evidence, can be continued and deepened |

Scores are 0–5 per dimension. Weighted total is out of 100. Formal professional scoring applies only to submissions that have passed the maintainer gate (`formal-review-ready`). The gate never blocks scoring for organizer-missing geometry; only participant-controlled checks matter.

## Mandatory Rejection (English Summary)

A submission must be rejected if it:
- Contains personal private data, classified materials, or non-public spatial data.
- Fabricates official endorsement, approval conclusions, or implementation commitments.
- Submits offensive, discriminatory, illegal, or malicious content.
- Has no substantial relevance to the open-call brief.
- Does not respond to any of the six agent tasks (`agent.1`–`agent.6`) in `agent_taskbook.json`.
- Presents conceptual recommendations or policy proposals as confirmed government decisions.
