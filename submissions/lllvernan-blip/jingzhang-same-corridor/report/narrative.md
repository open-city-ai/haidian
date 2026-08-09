# 核验勘误附录

- 方案：同廊三线 / Same Corridor, Three Times
- 记录 ID：`ERRATA-SAME-CORRIDOR-20260809`
- 用途：集中说明坐标核验、空间表达和指标复算中已发现的口径差异，避免 provisional 或概念表达被当作 official 事实。
- 状态：随提交包一并审阅；不替代 official boundary、测绘、工程断面、控规或审批文件。

## 1. 重点区锚点与 provisional polygon

| 差异项 | 核验结论 | 当前处理 | 后续触发 |
|---|---|---|---|
| 五道口站、清华东路西口站与北京 AI 原点社区 provisional polygon 的关系 | 两站均位于当前 provisional polygon 外侧，不能直接把该 polygon 解释为双站点站域 | 保留 provisional polygon；在图面和正文中标为锚点失配，原型以“校园—站点—公园—东侧街区”接口表达 | official key-area polygon 发布后，替换 `geometry/key_areas.geojson`，重算 P-B、S05 和相关面积 |
| 大钟寺站与 provisional 大钟寺重点区 | 大钟寺站距 polygon 最近点约 1.7 km，距中心约 2.2 km，不能直接把 polygon 解释为站域 | 使用锚点修正示意，不替代 official polygon；S02/P-C 以四象限步行和文保前场为设计问题 | official key-area polygon、文保约束和站域出入口发布后，重建重点区与 S02/P-C 路径 |
| 重点区面积 | 公告口径约 368.4 ha；当前 provisional polygon 按 EPSG:4548 复算约 369.3 ha | 两种口径并列标注；369.3 ha 仅为当前几何复算值，不是公告边界的修订 | official polygon 发布后统一替换并复算 `key_areas_total_area_sqm` |

依据：`COORD-CHECK-20260808`、`A-KEYAREA-ANCHOR-003`、`DATA-SRC-PROVISIONAL-BOUNDARIES-20260605`。

## 2. 历史旧址与现走廊

清华园车站旧址位于现遗址公园和现铁路走廊以西。公开点位只支持“旧址不是现走廊上的连续节点”这一最小判断，不支持把旧址线性画回现铁路或地铁线位。

当前处理：S06 采用当代记忆寻径，保留旧址作为 verified heritage anchor；`s06_memory_route_length_m` 保持 `unknown`，待历史资料审校、当代步行路径和权威网络资料具备后计算。

禁止误读：旧址点位、记忆路线和现状三线共廊不是同一条连续基础设施。

依据：`COORD-CHECK-20260808`、`A-MEMORY-ROUTE-011`、`metrics.json#s06_memory_route_length_m`。

## 3. 平面共廊与垂向关系

坐标核验支持：选定样本段内，站点、遗址公园、现状轨道及公开地物形成百米级平面接近，可以作为共同城市接口问题讨论，并生成 S01–S10 剖面候选。

坐标核验不支持：

- 三线沿全长始终保持 100–200 m 间距；
- 三线在每一段严格上下叠置；
- 京张高铁隧道埋深、13 号线结构标高、公园地表标高已确认；
- 任一固定设施已通过铁路保护、结构、消防或施工影响审查。

当前处理：图纸中的“三层”是设计阅读层，不是工程竖向断面；垂向耦合只作为 `V / 垂向耦合候选`，相关工程指标保持 `unknown` 或 `conditional_official_control`。

依据：`COORD-CHECK-20260808`、`A-VERTICAL-RELATION-004`、`A-LINE13-ENGINEERING-005`、`metrics.json#s03_reversible_elevated_interface_length_m`。

## 4. 分期覆盖范围与公共节点去重

### 4.1 分期

PHASE-1 与 PHASE-2 使用同一 provisional envelope，面积均为约 369.3 ha。这是阶段覆盖范围相同，不是近期与中期实施动作相同：

- PHASE-1：不依赖未确认工程的可逆接口、过境链、四象限步行、首层开放带、记忆寻径和场景试点；
- PHASE-2：以 13 号线扩能提升、重点区正式边界发布等条件为触发的接口深化；
- PHASE-3：正式边界、控规、文保、蓝线、市政等资料发布后替换 provisional 图层并复算。

### 4.2 公共节点

S09 与 S10 的剖面线为同一清河—北段接口的反向表达，生成的公共节点几何重复。当前生成器已去除相同几何，`geometry/public_space.geojson` 保留 2 个不重复节点，`public_space_area_sqm` 按几何并集计算，不重复计面积。

后续若 S09/S10 获得不同的正式空间边界或控制条件，才恢复为两个独立节点并分别复算。

## 5. 资料替换与指标复算顺序

任一正式资料发布后执行以下顺序，不直接覆盖当前 provisional 值：

1. 固定资料版本、发布日期和来源哈希；
2. 替换 official site boundary、key-area polygon、道路红线、建筑底图、文保、蓝线或工程图层；
3. 在 EPSG:4548 等经专业确认的投影坐标系下检查有效性、范围、重叠和拓扑；
4. 重建 9 个标准 GeoJSON 图层；
5. 复算面积汇总、S01–S10 剖面指标和 P-A/P-B/P-C 原型指标；
6. 复核 18 项 unknown 的 baseline、target、pass/failure 和 fallback 记录；
7. 同步更新 proposal.md、评审 HTML、visual 看板、A3/A0 图纸、self_check.json 与 manifest SHA-256；
8. 只有 deterministic、spatial、visual、professional 四类检查再次通过后，才将包状态推进到下一次正式审阅。

## 6. 证据边界

本附录所称“核验”是公开资料和 provisional geometry 层面的分析核验。`diagnosis/` 与 `brief/` 路径属于仓库级过程资料和组织方资料，不等于提交包已经拥有 official redline 或工程底图。提交包内的 `value`、面积和图形状态均不得超出其 `evidence_class` 所允许的用途。
