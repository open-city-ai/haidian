# 主题赛道

主题赛道用于帮助投稿者聚焦方案，也帮助 portal、维护者和公众按议题浏览方案。赛道不是评审等级，不替代 formal 校验、专家评审或合规复核。

## 使用方式

在 `proposal.md` front matter 中选择 1-3 个赛道 ID：

```yaml
tracks: ["ai-traffic-walkability", "civic-agent-governance"]
```

在 `exhibit.json` 的 `card.tracks` 中也可填写相同 ID，用于展示卡片和 portal 筛选；若未填写，portal 会读取 `proposal.md` 元数据。

## 赛道清单

| ID | 赛道 | 适合方案 |
| --- | --- | --- |
| `ai-traffic-walkability` | AI+交通与慢行系统 | 慢行断点、轨道接驳、低速接驳、无障碍路径、活动日交通组织 |
| `jingzhang-heritage-narrative` | 京张文化遗产与城市叙事 | 京张铁路遗址、公园活力带、文化导览、城市品牌叙事 |
| `youth-friendly-public-space` | 青年友好公共空间 | 青年第三空间、夜间活力、社交学习、公共活动、社区参与 |
| `ai-origin-community` | AI 原点社区与创新服务 | AI 原点社区、创新节点、研发展示、场景开放、公共体验 |
| `enterprise-services-ecosystem` | 企业服务与产业生态 | 企业服务、开发者社区、数据合规、政策咨询、创新服务圈 |
| `civic-agent-governance` | 城市智能体治理 | 公开资料读取、agent 推演、公众反馈、人工复核、风险提示 |
| `ai-public-services` | AI+公共服务 | 医疗健康、教育文化、法律咨询、生活服务和公共服务导航 |
| `robotics-autonomous-mobility` | 机器人与自动驾驶场景 | 配送、导览、巡检、清洁维护和自动驾驶接驳等低速试点 |

维护者如需调整赛道，应先更新 `tracks.json`，再同步本文件、模板和示例。

## Track ID reference (English)

| ID | Track name | Suitable proposals |
|---|---|---|
| `ai-traffic-walkability` | AI + Traffic and Walking | Walkability gaps, rail connections, slow-mobility, accessibility |
| `jingzhang-heritage-narrative` | Jing-Zhang Heritage and Urban Narrative | Railway heritage, park activation, cultural branding |
| `youth-friendly-public-space` | Youth-Friendly Public Space | Third places, night vitality, social learning, community events |
| `ai-origin-community` | AI Origin Community and Innovation Services | Innovation nodes, R&D display, scenario access, public experience |
| `enterprise-services-ecosystem` | Enterprise Services and Industry Ecosystem | Developer community, data compliance, innovation service circle |
| `civic-agent-governance` | Urban Agent Governance | Open-data reading, agent inference, public feedback, human review |
| `ai-public-services` | AI + Public Services | Healthcare, education, legal aid, life services, navigation |
| `robotics-autonomous-mobility` | Robotics and Autonomous Mobility | Delivery, guided tours, inspection, low-speed pilot zones |

Each proposal must declare 1 to 3 track IDs. Tracks are used for portal filtering and gallery display only; they are not evaluation criteria.
