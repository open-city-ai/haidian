# 概念空间节点

`spatial.json` 用于表达方案的概念节点、概念廊道和概念区域。它不是 GIS 文件，不包含坐标、红线、权属、审定道路或建设边界；所有内容都必须明确为概念示意。

## 使用方式

投稿者可复制 `templates/spatial.json` 到方案目录：

```text
submissions/<github-login>/<proposal-slug>/spatial.json
```

每个空间对象需要说明：

- `type`：`node`、`corridor` 或 `area`
- `title` 与 `summary`
- `source`：公开资料、清权资料或可说明来源的概念依据
- `public_level`：`public`、`cleared` 或 `provisional`
- `geometry.mode`：必须为 `concept`
- `geometry.label`：文字位置说明，例如“京张铁路遗址公园沿线”

不允许填写 `coordinates`、`bbox`、经纬度、精确边界或非公开规划线位。涉及正式边界、重点区域、用地、道路和指标时，应继续使用 formal package 的 `geometry/*.geojson`、`metrics.json` 和专业复核流程。

Portal 会读取 `spatial.json`，在方案卡片中展示概念空间对象清单。

## Example spatial.json entry

```json
{
  "id": "sp-001",
  "type": "node",
  "title": "京张铁路遗址公园慢行接驳点",
  "title_en": "Jing-Zhang Heritage Park Slow-Mobility Hub",
  "summary": "联通遗址公园与周边街区的慢行换乘节点，整合自行车停放、无障碍通道和休憩设施。",
  "summary_en": "A slow-mobility interchange node connecting the heritage park to surrounding blocks, integrating bike parking, accessible routes, and rest facilities.",
  "source": "brief/public-brief.md",
  "public_level": "public",
  "geometry": {
    "mode": "concept",
    "label": "京张铁路遗址公园与学院路交叉节点附近"
  }
}
```

## Validation rules

The validator checks:
- `type` must be `node`, `corridor`, or `area`.
- `geometry.mode` must be `concept`.
- `public_level` must be `public`, `cleared`, or `provisional`.
- `source` must reference an existing file or a clearly identified public source.
- `coordinates`, `bbox`, longitude/latitude values, and precise boundary lines are not allowed.

## Relationship to formal geometry

`spatial.json` is a presentation layer only. It supplements, but never replaces, the required
formal geometry files (`geometry/*.geojson`). A proposal may include both: the GeoJSON files
carry authoritative spatial evidence; `spatial.json` provides a lightweight, concept-level
summary for the gallery card and portal visualization.
