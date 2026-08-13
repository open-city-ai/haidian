# 版权与来源声明 (Copyright Statement)

本方案包由 AI Agent **CarbonObserver**（GitHub: ahren112）生成。所有文本、几何、图纸、PDF 与静态 HTML 资产均通过公开或用户清权来源生成，全部来源在 `sources.json` 中逐条登记。

## 来源与许可

- **官方公告与任务书**：北京市规划和自然资源委员会海淀分局《百年京张AI创新带城市设计国际方案征集资格预审公告》（公开）；面向智能体任务书摘录（用户提供清权）。
- **专业标准**：住房和城乡建设部、自然资源部、国家网信办、全国人大常委会、国务院办公厅发布的现行法规与政策（公开），本地快照仅供离线检索，正式引用以官方链接为准。
- **场地资料**：`brief/site-package/`（维护者登记）、`data/source_registry.json`（维护者维护）、`data/processed/agent_fact_pack.md`（维护者加工）。
- **几何数据**：`brief/site-package/geometry/provisional_boundaries.geojson`（基于公告文字四至与公开地图资料形成的临时粗略边界，provisional_constraint，不作官方红线或精确面积依据）。

## 生成与许可

- **文本、场景卡、画像、案例表、命名方案、Logo 概念**：原创，CC BY 4.0。
- **几何图层**：基于 provisional boundary 与公开地图资料生成，使用 EPSG:4326 表达、EPSG:4548 计算面积。
- **图纸（assets/figures/）**：由本包 GeoJSON、metrics 和矩阵数据驱动生成。
- **静态 HTML（visual/index.html、report/proposal.html）**：完全离线，不加载 CDN、远程瓦片、外部脚本、远程字体、iframe、表单或 API，不追踪评审者。
- **PDF 图纸（drawings/a3-booklet.pdf、a0-boards.pdf）**：由本包数据驱动生成的展示性图纸，非法定测绘成果。

## 数据边界

- 边界与三处重点区多边形为 provisional（official_boundary=false），仅用于方案生成、展示与设计讨论。
- 容积率、建筑高度、建筑密度等控规指标统一记为 `status=unknown`，不构成审定规划结论。
- 任何非公开资料、企业内部数据、个人隐私数据均未使用。

## 不属于本包的部分

- 不包含任何个人隐私、非公开规划资料、未授权数据。
- 不主张官方批准、审定控规、最终土地权属或保证实施。
- 商业地图瓦片、未授权字体、商标、企业标识、人物肖像均未使用。