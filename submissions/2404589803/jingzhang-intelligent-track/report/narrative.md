# 生成方法、复算路径与一致性约定

本文件是提交包的方法学附录，目的只有一个：让评审者**不必相信 `proposal.md` 里的任何数字**，而可以按下面的规则独立重建几何、重算指标并核对图纸与页面。设计判断本身见 `proposal.md`；本文件只说明这些判断是怎样变成机器可读证据的。

## 1. 坐标、精度与拓扑策略

- 存储坐标系：`EPSG:4326`（经纬度），与 `brief/site-package/` 的图层策略一致。
- 面积与长度计算坐标系：`EPSG:4548`（CGCS2000 / 3-degree Gauss-Kruger CM 117E），与 `scripts/spatial_review.py` 完全一致，因此复核脚本与本方案不会出现两套面积。
- 所有布尔运算（并、差、交）在 `EPSG:4326` 上对**精度对齐后的**几何执行，对齐网格为 `1e-7` 度（约 1.1 厘米）。这一步是用地分区能够做到"边界共享、零重叠、零覆盖缺口"的原因：相邻多边形共用完全相同的顶点坐标，不会产生细长的缝隙多边形（sliver）。
- 面积小于 50 平方米的碎片在布尔运算后被丢弃，避免把浮点噪声写进成果。
- 缓冲（buffer）操作先投影到 `EPSG:4548`、按真实米数缓冲、再投回 `EPSG:4326`，因此"绿脊宽度 115 米"是真实的地面宽度，不是度数近似。

## 2. 图层生成顺序与依赖关系

图层之间是有向依赖的，必须按下列顺序生成；跳步会破坏覆盖完整性：

1. `site_boundary.geojson` ← 直接来自 `brief/site-package/geometry/provisional_boundaries.geojson#PROV-SITE-001`（`provisional_only` 资料，未做任何形状修改）。
2. `key_areas.geojson` ← 直接来自同一文件的 `PROV-KEY-001..003`，属性标注 `official_boundary=false`、`geometry_role=provisional_constraint`、`boundary_precision=provisional_rough`。
3. `green_space.geojson` ← 以「人」字三笔中心线按真实米数缓冲生成：主脊 115 米、西南支脊 72 米、东南支脊 58 米，再并入沿线口袋公园与北五环沿线防护绿地，最后与提交边界求交。
4. `public_space.geojson` ← 在绿脊与重点区域节点处生成广场与三处 AI 朝圣地标前场；**只统计广场与地标前场**，不把绿地内部活动场地重复计入，这是 `public_space_ratio` 偏低（2.20%）而非虚高的原因。
5. `land_use.geojson` ← 先放置绿地与广场，再用提交边界减去已占用部分，把剩余空间按片区定位切分为 110 个用地图元，用地代码取自 `brief/site-package/enums/land_use_codes.json`。因此用地层在构造上就等于"提交边界的完整划分"，覆盖缺口为 0 平方米是构造结果而不是事后修补。
6. `buildings.geojson` ← 在非绿地、非广场的用地内按街区放置示意性建筑基底，尺寸、朝向与形态（含 L 形与围合院落）按片区区分，仅用于表达城市形态意图。
7. `roads.geojson` ← 慢行主廊、支线与五处东西向缝合连接的建议中心线。
8. `phasing.geojson` ← 三期实施范围。
9. `constraints.geojson` ← 三处 AI 服务分区（沿「人」字骨架 400 米走廊与重点区域求交）与 12 处 AI 场景锚点。

## 3. 指标复算公式

`metrics.json` 中每项 known 指标都带 `formula` 与 `source_files`，可逐项独立验证。核心公式如下（面积单位平方米，长度单位米，均在 `EPSG:4548` 下计算）：

| 指标 | 公式 |
| --- | --- |
| `site_area_sqm` | `area(union(site_boundary))` |
| `green_space_area_sqm` | `area(union(green_space))` |
| `green_ratio` | `green_space_area_sqm / site_area_sqm` |
| `public_space_area_sqm` | `area(union(public_space))` |
| `public_space_ratio` | `public_space_area_sqm / site_area_sqm` |
| `building_footprint_area_sqm` | `area(union(buildings))` |
| `ai_service_zone_area_sqm` | `area(union(constraints 中 AI_SERVICE_ZONE 要素))` |
| `road_centerline_length_m` | `sum(length(roads))` |
| `land_use_polygon_count` 等计数类 | `count(features)` |

四项开发强度指标（`floor_area_ratio`、`building_height_m`、`building_density`、`total_gfa_sqm`）与 `official_green_ratio_requirement` 一律标注 `unknown` 并给出原因：官方控规条件缺失时，推测值只会制造虚假的精确感。

复核命令：

```bash
python scripts/spatial_review.py submissions/2404589803/jingzhang-intelligent-track
python scripts/self_check_submission.py submissions/2404589803/jingzhang-intelligent-track --pr-author 2404589803
```

## 4. 图纸与页面的生成约定

- 5 张演示图、A3 图册（13 页）、A0 展板（3 张）与 `visual/index.html` 全部由提交几何与 `metrics.json` 程序化生成，**指标数值一律读取自 `metrics.json`，不接受手工填写**。因此人类可读成果在机制上无法与机器可读证据脱节。
- 图 01、图 02、图 04 的图面北向朝右：场地为南北狭长的线性走廊，图面旋转 90 度是为了在横向图幅内保持可读比例，图内均标注了朝向说明；图 01 另附一张**正北向、非比例**的「人」字概念示意，避免旋转后母题失读。
- `visual/index.html` 与 `report/proposal.html` 为纯离线静态页面：不加载远程脚本、远程字体与远程地图瓦片，不含 iframe、表单与外部接口调用，不跟踪评审者行为。
- A3 图册与 A0 展板中的表格（AI 场景卡、更新项目清单、指标表、任务覆盖表、假设表）同样从 `compliance_matrix.json`、`design_depth_matrix.json`、`assumptions.json` 与 `metrics.json` 读取，避免多处维护造成版本漂移。

## 5. 一致性与失效条件

- 结构化数据是唯一事实来源：若正文、图纸、HTML 与 `geometry/*.geojson`、`metrics.json` 出现矛盾，**以结构化数据为准**。
- 官方 `SITE_BOUNDARY` 与三处 `KEY_AREA` 精确 polygon 发布后，必须按第 2 节的顺序**整包重算**（几何 → 指标 → 矩阵 → 图纸 → 页面），而不是只替换单个文件；届时全部面积与比例指标都会变化。
- 本提交包中的绿地率与公共空间比例是设计建议值，不是官方管控指标；示意建筑基底不是现状建筑普查值，不得作为建筑规模结论。
- 全部成果为面向开源征集的概念建议与参考方案，不替代法定规划，不构成政府审定结论、拆改留方案、工程可行性结论或投资判断。
