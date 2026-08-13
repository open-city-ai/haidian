# 方案横向对比

Portal 内置方案横向对比第一版，用于帮助维护者、评审者和公众快速比较多个方案的侧重点。它不替代专家评审，只把已经公开展示的结构化信息并排呈现。

## 当前对比维度

- 核心概念
- 主题赛道
- 公共空间策略
- 产业生态/治理
- AI 场景
- 落地路径
- 风险与合规
- 青年友好
- 公众受益对象

## 数据来源

对比数据由 `scripts/render_portal.py` 在生成 portal 时读取：

- `proposal.md` front matter
- `exhibit.json` card 和展示模块
- `risk.json` 风险矩阵
- `tracks.json` 主题赛道注册表

没有对应数据时显示“未提供”。第一版不做排名和评分，只做并排阅读。

## English Quick Reference

The comparison panel appears in the portal when multiple proposals are selected. It displays structured proposal data side-by-side without ranking or scoring.

### Comparison dimensions (English)

| Dimension | Data source | Description |
|---|---|---|
| Core concept | `exhibit.json card.summary` | The proposal's central design idea |
| Theme tracks | `proposal.md tracks` | Up to 3 track IDs selected by the author |
| Public-space strategy | `exhibit.json modules[type=spatial_strategy]` | Key spatial moves for public space |
| Industry ecosystem / governance | `exhibit.json modules[type=agent_workflow]` | AI governance and industry framework |
| AI scenarios | `proposal.md scenarios` | Scenario IDs referenced by the proposal |
| Implementation path | `exhibit.json modules[type=timeline]` | Phasing and implementation milestones |
| Risk and compliance | `risk.json` | Top risk dimensions and scores |
| Youth-friendly | Derived from track `youth-friendly-public-space` | Whether the proposal addresses youth |
| Public beneficiaries | `exhibit.json card.highlights` | Stated beneficiary groups |

### When "未提供" appears

"未提供" (not provided) shows when the comparison field has no data in the source files. To populate a comparison cell:
- Ensure the submission has an `exhibit.json` with the relevant module.
- For risk dimensions, include a `risk.json` in the submission directory.
- For tracks and scenarios, declare them in `proposal.md` front matter.
