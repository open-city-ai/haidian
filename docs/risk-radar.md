# 风险矩阵

`risk.json` 用于说明方案的主要代价、约束和治理方式。它不用于给方案排名，也不表示风险越低越好；城市创新方案可以有高风险，但必须说清楚为什么、如何缓解、由谁人工复核。

## 使用方式

投稿者可复制 `templates/risk.json` 到方案目录：

```text
submissions/<github-login>/<proposal-slug>/risk.json
```

每个风险维度使用 1-5 分：

- `1`：低风险，常规说明即可。
- `3`：中等风险，需要明确缓解措施。
- `4-5`：高风险，必须填写 `human_review`，说明需要哪些专业或公众参与复核。

## 支持维度

| ID | 维度 |
| --- | --- |
| `data_privacy` | 数据隐私 |
| `implementation_complexity` | 实施复杂度 |
| `public_acceptance` | 公众接受度 |
| `operations_cost` | 运维成本 |
| `policy_uncertainty` | 政策不确定性 |
| `spatial_dispute` | 空间争议 |
| `technology_maturity` | 技术成熟度 |
| `equity_inclusion` | 公平与包容性 |

Portal 会读取 `risk.json`，在方案卡片中展示最高风险项和分值。

## Risk dimension reference (English)

| ID | Dimension | Description |
|---|---|---|
| `data_privacy` | Data Privacy | Risk of exposing personal data, tracking, or using non-public spatial data |
| `implementation_complexity` | Implementation Complexity | Technical, financial, or organizational difficulty of realizing the proposal |
| `public_acceptance` | Public Acceptance | Risk that residents, businesses, or community groups reject the proposal |
| `operations_cost` | Operations Cost | Ongoing maintenance, staffing, or technology costs after deployment |
| `policy_uncertainty` | Policy Uncertainty | Dependence on future regulatory approvals, land-use changes, or official boundaries |
| `spatial_dispute` | Spatial Dispute | Risk of conflict over boundary claims, property rights, or shared use |
| `technology_maturity` | Technology Maturity | Readiness of the AI or technology components; prototype vs. production |
| `equity_inclusion` | Equity and Inclusion | Risk of exclusion, widening inequality, or inadequate accessibility |

## Example risk.json

```json
{
  "version": 1,
  "dimensions": [
    {
      "id": "data_privacy",
      "label": "Data Privacy",
      "score": 3,
      "note": "The scenario uses anonymized pedestrian flow data and does not track individuals.",
      "mitigation": "Use only public, authorized, and aggregated data with documented retention limits."
    },
    {
      "id": "technology_maturity",
      "label": "Technology Maturity",
      "score": 4,
      "note": "Low-speed robot delivery remains at pilot stage without confirmed commercial deployment.",
      "mitigation": "Limit deployment to a reversible supervised pilot with an operational fallback.",
      "human_review": "Transport and safety professionals must review the pilot area before implementation."
    }
  ]
}
```

Scores of 4–5 always require a `human_review` field explaining what professional or community review is needed before implementation. The review rubric evaluates whether high-risk items are adequately disclosed, not whether they are absent.
