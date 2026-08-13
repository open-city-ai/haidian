# 场景卡片库

场景卡片库把 AI 城市应用拆成可复用的标准场景，帮助投稿者引用、组合和扩展方案。场景卡不是落地承诺，也不替代专业设计、审批或公共安全复核。

## 使用方式

方案可在 `proposal.md` front matter 中引用 1-8 个场景 ID：

```yaml
scenarios: ["ai-traffic-walkability", "enterprise-service-copilot"]
```

也可在 `exhibit.json` 的 `card.scenarios` 中填写相同 ID，用于 portal 卡片和筛选。若 `exhibit.json` 未填写，portal 会读取 `proposal.md` 元数据。

## 当前标准场景

| ID | 场景 |
| --- | --- |
| `ai-traffic-walkability` | AI+交通慢行评估 |
| `ai-health-service-navigation` | AI+医疗健康服务导航 |
| `robot-delivery-low-speed` | 机器人低速配送 |
| `ai-cultural-guide` | AI 导览与文化叙事 |
| `enterprise-service-copilot` | 企业服务 Copilot |
| `public-safety-operations-review` | 公共安全与活动运营复核 |

每张场景卡必须说明服务对象、使用情境、所需数据、公共价值、风险点和人工复核机制。

## 维护方式

维护者可在 `scenarios/` 下新增 JSON 文件，并按 `schema/scenario.schema.json` 填写。新增场景后，同步更新本文件，并在相关方案或合集里引用场景 ID。

## Scenario card schema

Each scenario in `scenarios/` must follow `schema/scenario.schema.json`. The required fields are:

| Field | Type | Description |
|---|---|---|
| `id` | string | Unique slug, e.g. `ai-traffic-walkability` |
| `title_zh` | string | Chinese scenario title |
| `title_en` | string | English scenario title |
| `summary_zh` | string | 1–3 sentence Chinese summary |
| `summary_en` | string | 1–3 sentence English summary |
| `service_targets` | array | Who the scenario serves (residents, enterprises, etc.) |
| `required_data` | array | Data inputs needed for this scenario |
| `public_value` | string | The public benefit delivered |
| `risk_notes` | string | Known risks: privacy, safety, equity, operational |
| `human_review_required` | bool | Whether human sign-off is required before deployment |

## Current standard scenarios (English)

| ID | Scenario | Suitable for |
|---|---|---|
| `ai-traffic-walkability` | AI + Traffic and Walking Assessment | Walkability gaps, transit connections, accessible routes |
| `ai-health-service-navigation` | AI + Healthcare Service Navigation | Health guidance, appointment routing, emergency access |
| `robot-delivery-low-speed` | Low-Speed Robot Delivery | Last-mile delivery, service robots, maintenance bots |
| `ai-cultural-guide` | AI Cultural Guide and Narrative | Heritage park interpretation, event wayfinding |
| `enterprise-service-copilot` | Enterprise Service Copilot | Developer community, data compliance, innovation services |
| `public-safety-operations-review` | Public Safety and Event Operations Review | Crowd management, incident routing, human review gate |
