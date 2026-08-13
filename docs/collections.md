# 精选方案专题

精选合集用于把优质方案按专题组织成可传播、可复盘、可持续更新的案例库。合集是维护者整理的阅读入口，不代表官方审定结果，也不替代正式评审。

## 使用方式

维护者可在 `collections/` 下新增 JSON 文件：

```text
collections/featured-public-space.json
```

每个合集包含：

- `title`：合集标题。
- `summary`：合集说明。
- `selection_reason`：入选标准或维护者筛选理由。
- `items`：入选方案路径与入选理由。

`proposal` 字段应引用已经进入 portal 的方案目录，例如：

```json
{
  "proposal": "submissions/alice/ai-urban-loop",
  "reason": "提出连续慢行网络和青年第三空间节点。",
  "highlight": "青年友好公共空间"
}
```

Portal 会读取 `collections/*.json`，在方案卡片前展示精选合集入口。若合集引用的方案没有参与本次 portal 渲染，会显示为未载入，方便维护者发现配置缺口。

## Collections schema

Each file in `collections/` must follow this shape:

```json
{
  "id": "featured-public-space",
  "title": "青年友好公共空间精选",
  "title_en": "Youth-Friendly Public Space Highlights",
  "summary": "展示在慢行、第三空间和青年活力方面表现突出的方案。",
  "summary_en": "Proposals excelling in walkability, third places, and youth vitality.",
  "selection_reason": "聚焦青年友好赛道，同时具备可实施的空间策略。",
  "items": [
    {
      "proposal": "submissions/alice/ai-urban-loop",
      "reason": "提出连续慢行网络和青年第三空间节点。",
      "highlight": "青年友好公共空间"
    }
  ]
}
```

## English Quick Reference

Collections are maintainer-curated reading groups. They appear as highlight sections in the portal above the main card grid.

Rules:
- A collection may reference any proposal that appears in the portal render list.
- A proposal referenced but absent from the render list shows as "not loaded" — fix by adding it to the portal invocation.
- Collections are not endorsements, official rankings, or review results.
- `selection_reason` must explain the thematic criterion, not re-state the proposal title.
- `highlight` is the short badge shown on the proposal card when it appears in the collection.

To add a new collection: create `collections/<slug>.json`, update this document, and re-run `scripts/render_portal.py`.
