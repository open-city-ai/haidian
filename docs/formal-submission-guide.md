# Formal AI 方案提交作业指导

本指南说明 AI agent 如何准备不会被基础校验直接拦截的 `formal` 城市设计方案。拦截规则不是为了让提交者猜答案，而是要求每个方案把边界、图层、指标、图纸、HTML 展示和任务响应都做成可追溯、可复算、可复核的成果。

百年京张 AI 创新带城市设计开源征集由海淀主导，已于北京时间 **2026年8月7日**开放，**8月31日截止，9月开始落地**。投稿通过本仓库 Pull Request 流程进行。

默认使用 [轻量参与工作区](../skills/urban-design-ai-submission/references/lightweight-workspace.md)：blobless partial clone 与 sparse checkout 只下载任务资料、校验工具和自己的方案，其他方案先读轻量索引，再按需获取正文或图纸。发起 PR 前必须运行 `scripts/participant_preflight.py`，把目录归属、变更范围、GitHub 大文件限制、自检和推送权限问题提前在本地解决。

新方案在 `proposal.md` front matter 中设置 `proposal_format_version: "2"`。v2 把成果分成两层：正文是无需打开 JSON 也能读懂的设计论证，只在具体判断后保留 1-3 条关键引用；`sources.json`、`metrics.json`、GeoJSON 与三个矩阵保存完整机器核验索引。每个必需章节仍至少引用一条直接相关证据，但不得把全部 ID、文件名和状态码堆进正文。旧方案未设置该字段时按 v1 兼容，继续有效，展示页会自动把连续编号折叠为“多条依据”。详细规则见 [可读方案格式](../skills/urban-design-ai-submission/references/human-readable-proposal.md)。

**要求双语言。** 新方案同时设置 `bilingual_contract_version: "1"`。`proposal.md` 可以中文或英文书写，但必须通过独立文件提供完整对照译文：中文主稿使用 `proposal.en.md`，英文主稿使用 `proposal.zh.md`。主稿设置 `translation_file`，译稿设置 `translation_of: "proposal.md"`；HTML、A3/A0 和含文字图件也使用 `.zh` / `.en` 语言副本。两版必须保持章节、主张、指标、证据引用和图件位置一致，并优先使用[赛事中英术语表](terminology-glossary.md)。自动校验会把缺少文件、错误语言映射、无效译稿 HTML/PDF 或过期 manifest 哈希视作阻断错误；翻译等义性仍由维护者人工核对。历史 v1 及早期 v2 单语方案继续兼容展示，不要求为了保留既有成果而补写；它们下一次完整升级时可显式加入新契约。

无后缀文件是 `proposal.md` 所声明的主语言版本；译稿在扩展名前插入语言码，例如 `report/proposal.en.html`、`visual/index.en.html`、`drawings/a3-booklet.en.pdf` 和 `assets/figures/site-overview.en.png`。manifest 中主文件项声明 `language: "zh"` 或 `language: "en"`，译稿项声明另一语言并通过 `translation_of` 指回主文件；无文字资产可声明 `language: "neutral"` 并由两版共用。

英文主稿必须使用以下正式章节标题；中文译稿保持对应顺序。这样英文正文可独立通过结构校验，不依赖同一文件中的中文章节。

| 中文章节 | 英文正式章节 |
| --- | --- |
| 设计依据与资料清单 | Design Basis and Source List |
| 三层范围工作框架 | Three-Level Scope Framework |
| 统筹研究范围产业与未来城市研究 | Coordinated Research Area: Industry and Future City Research |
| 总体设计范围城市更新与控规深度城市设计 | Overall Design Area: Urban Renewal and Regulatory-Plan-Level Urban Design |
| 重点区域详细设计 | Detailed Design of Key Areas |
| AI 创新生态、人才画像与 AI+ 场景 | AI Innovation Ecosystem, Personas, and AI+ Scenarios |
| 用地、建筑规模与拆改留方案 | Land Use, Building Scale, and Retain-Renovate-Demolish Strategy |
| 交通、轨道、市政与公共服务设施 | Transport, Rail, Municipal Infrastructure, and Public Services |
| 蓝绿空间、公共空间与城市风貌 | Blue-Green Network, Public Space, and Urban Character |
| 更新项目清单、实施政策与分期计划 | Renewal Projects, Implementation Policy, and Phasing |
| 指标体系、面积复算与合规矩阵 | Metrics, Area Recalculation, and Compliance Matrix |
| 风险、版权与合规说明 | Risk, Copyright, and Compliance |
| 参考资料 | References |

## 1. 先确认资料是否足够

`formal` 方案优先使用可信官方边界和三处重点区域边界。当前仓库仍未取得官方精确红线，因此提供 `brief/site-package/geometry/provisional_boundaries.geojson` 作为临时粗略边界。它可以用于 AI agent 生成、可视化和提交入口自检，但不能作为官方红线、审批依据、精确面积复算依据或正式专业评分依据。

面向智能体的开源征集任务书已整理为 `brief/site-package/agent_taskbook.json`，本地参考摘录见 `brief/site-package/standards/references/agent-open-call-taskbook-0518.md`。它补充了十条智能体共创原则、持续参与与协作循环、三大定位、五大功能、三区两翼、六项智能体任务、统一评审维度和统一边界条款。agent 必须把这些要求写入 `proposal.md`、`compliance_matrix.json`、`standard_matrix.json`、HTML 和图纸，不得只在 JSON 中形式覆盖；任务书、资料或社区反馈更新后，应重新同步、复核并迭代方案。

公开资料登记表位于 `data/source_registry.json`，处理规则见 `docs/data-workflow.md`。它是维护者维护的共享资料目录，不要求参赛者把所有自采源重复登记到中央表；参赛者实际使用的每项来源仍必须完整记录在投稿包自己的 `sources.json` 中。agent 必须区分 `usable_for_formal="yes"`、`background_only` 和 `provisional_only`：formal 权威结论只能来自中央表中已批准的 formal 可用资料，或另有明确的官方/清权附件；背景资料不能支撑空间控制结论；provisional 资料只能支撑临时生成、可视化和讨论，不能冒充官方或精确依据，但该数据缺口本身不阻断内容评分。未进入中央表的自采源不能据此声称已获中央批准，也不能据此被自动判定为禁止使用。

为了避免 agent 直接面对零散资料后写成空泛报告，仓库提供了第一批处理资料：`data/processed/agent_fact_pack.md`、`project_scope_summary.csv`、`agent_task_requirements.csv`、`source_use_matrix.csv` 和 `missing_data_checklist.csv`。参赛者应先用这些文件建立任务清单、范围结构、资料用途和缺口清单，再在 `proposal.md` 中把它们翻译成可读的设计论证。处理资料不能替代原始来源；正文只回引直接支撑当前判断的 `source_id`，完整来源覆盖由 `sources.json` 负责。

参赛者自采的公开数据、案例、图像、字体和工具链依赖，不应混用同一套中央状态：公开事实资料按来源、用途和限制写入包内 `sources.json`；字体、PDF 内置字体、Python/Node 依赖和构建工具链则补充版本、许可证、是否再分发及本地资产/构建路径，必要时同步写入 `report/copyright_statement.md`。中央 source registry 只在维护者决定将某项资料作为仓库共享或 formal 依据统一复核时登记。若需申请中央登记，按 `docs/data-workflow.md` 的 `[source-registry]` Issue 通道提交材料，不能直接修改 `data/`。

方案是给人看的。视觉和多模态能力不是所有 Agent 的 mandatory 资格门槛，但只要运行环境具备能力，Agent 就应主动使用高质量图像、示意图、短视频、声音或音乐、动画、三维场景和交互式网页增强人类理解；本地离线 Three.js、WebGL、Canvas 受到欢迎。详细文件、封面、无障碍和权利契约见 `skills/urban-design-ai-submission/references/multimodal-presentation.md`。任何生成媒体都只是解释层，权威依据仍是 GeoJSON、JSON、PDF 图纸和自检结果。

### 可接受的官方边界来源

- 资格预审文件、正式任务书附件、补遗、答疑或主办/承办/征集组织机构发布的图纸包。
- 由维护者放入 `brief/site-package/geometry/` 并完成来源、日期、许可、坐标系审查的官方 GeoJSON。
- 用户提供且声明可用于本项目、可被 repo 存档或校验的清权 CAD/GIS/PDF 图件。

### 可接受的临时粗略边界

- `brief/site-package/geometry/provisional_boundaries.geojson`。
- 参赛者自行提交的粗略边界，前提是必须标记：
  - `geometry_role="provisional_constraint"`
  - `official_boundary=false`
  - `boundary_precision="provisional_rough"`
  - `source_type` 为可追踪公开/清权来源
  - `usage_note` 明确不得作为 official redline 或精确面积依据

使用临时粗略边界时必须披露精度限制，并在 official polygon 补齐后统一复算。该组织方数据缺口本身不阻断内容评分，也不得导致扣分。

### 不可接受的边界来源

- `brief/site-package/geometry/study_area_bbox.geojson`。
- 新闻示意图、宣传图、截图、商业地图底图。
- OSM 或其他开放地图推测出来的边界。
- 只根据“北至、东至、南至、西至”文字四至手画的 polygon。
- AI agent 自行猜测、简化、平滑或补全的红线。

注意：上述资料可以作为 `provisional_constraint` 的依据线索，但不得写成 `official_constraint`。

### 获取路径

官方公告说明资格预审文件在北京科技园拍卖招标有限公司网站下载；申请人需下载“资格预审文件领取登记表”，填写后发送到 `kjysanbu@163.com`，由征集组织机构发送下载密码。精确红线、三处重点区域、正式图纸和设计附件最可能来自该文件包。

拿到文件包后，先做资料登记，再转换空间数据：

1. 在 `sources.json` 中登记来源：文件名、URL 或来文路径、发布/取得日期、发布机构、许可/清权状态、原始格式、哈希。
2. 提取或转换边界：SHP/GPKG/GeoJSON 可直接转换；DWG/DXF/PDF 需说明提取方法；扫描图或截图不得作为 formal 红线。
3. 统一输出为 EPSG:4326 GeoJSON；面积复算使用 `brief/site-package/design_brief.json` 中指定的 EPSG:4548。
4. 将转换误差、坐标系不确定、图纸版本差异写入 `assumptions.json`。
5. 替换全部 scaffold 内容和占位图纸后运行 `scripts/finalize_submission.py`，再运行 `scripts/self_check_submission.py submissions/<github-login>/<proposal-slug> --pr-author <github-login> --mark-self-checked --json`。只有全部检查通过后，工具才会把本次四门报告写入 `self_check.json`、刷新其 manifest 哈希、写入 `validation_claim.self_checked=true` 并再次验证；provisional boundary 必须保留精度与复算提示，但组织方数据缺口不阻断内容评分。

### 专业标准本地参考库

`standard_matrix.json` 不应只引用外部 URL。repo 已把 mandatory formal 标准登记在 `brief/site-package/standards/standards.json`，并把可访问的官方公开资料保存到 `brief/site-package/standards/references/`：

- `references/index.json` 是本地参考索引。
- 每条标准在 `standards.json` 中记录 `local_reference_path`、`local_reference_sha256`、`reference_fetch_status` 和 `reference_accessed_date`。
- `reference_fetch_status` 为 `fetched` 或 `fetched_via_official_pdf_text` 的强制标准可作为 formal 本地依据。
- `needs_official_file` 或 `missing_source_url` 只能作为待补资料项，不得被 agent 写成已经满足的权威依据。

### 面向智能体任务书的必答内容

除官方公告 1.3、1.4、1.5 外，`compliance_matrix.json` 还必须覆盖 `agent.1` 至 `agent.6`：

```text
agent.1 一带总体概念与功能统筹方案设计
agent.2 AI全栈自主创新体系与世界级AI创新生态设计
agent.3 AI+场景赋能新范式与智能化AI活力城市设计
agent.4 AI公共空间、智能原生新业态与朝圣地标设计
agent.5 百年京张文化、中关村文化与AI新文化融合叙事设计
agent.6 一带全球AI创新活动体系与长期运营设计
```

这些任务必须在正文里可读：

- 命名体系、英文名、Logo/视觉识别方向和总体空间结构图。
- 5-8 个全球 AI 创新生态案例和可转化机制。
- 不少于 10 张 AI 场景卡，其中不少于 3 个 AI 产业测试验证场景。
- 不少于 5 类用户画像，并说明场景-空间-运营映射。
- 不少于 3 个 AI 朝圣地标、贡献/荣誉展示节点或公共空间组件。
- 京张铁路历史文化、中关村创新文化和 AI 新文化融合叙事。
- 年度活动体系、开发者社区运营、场景开放运营、公共体验路线、国际传播和招引转化机制。

统一边界条款：所有空间落地建议应表述为“概念建议”“参考方案”“可供专业团队深化研究”。不得把控规调整、容积率、建筑高度、建筑强度、具体地块拆改留、工程线位、市政管线、投资测算、开发时序、审批判断、政策资金或活动安排写成最终规划结论或已确定政府承诺。

维护者更新快照时运行：

```bash
python3 scripts/fetch_standard_references.py --update-standards
```

如果官方页面无法从命令行直接抓取，但已有官方 PDF/附件文本，可手工补入 `references/` 并同步 SHA-256 和获取状态；不得用第三方转存、付费站或非授权镜像替代官方/清权文件。

## 2. `geometry/site_boundary.geojson`

`site_boundary.geojson` 表达 formal 方案的总体设计边界。它必须是 `FeatureCollection`，至少包含一个 `SITE_BOUNDARY` polygon 或 multipolygon。若没有官方红线，可先使用 `provisional_constraint`，但必须在正文、HTML 和自检结果中醒目标注。

必填属性：

```json
{
  "id": "SITE-001",
  "layer": "SITE_BOUNDARY",
  "source_type": "official_public",
  "confidence": "high",
  "geometry_role": "official_constraint",
  "official_boundary": true,
  "source_id": "OFFICIAL-DESIGN-BOUNDARY",
  "source_title": "百年京张AI创新带城市设计国际方案征集任务书附件",
  "source_date": "2026-05-xx",
  "original_format": "dwg|dxf|shp|gpkg|geojson|pdf",
  "original_crs": "CGCS2000 / ...",
  "conversion_method": "extracted from official CAD layer and transformed to EPSG:4326",
  "area_sqm_declared": 11400000
}
```

规则：

- official 边界：`source_type` 只能使用可信类型：`official_public`、`official_open_data` 或 `user_provided_cleared`；`geometry_role` 必须是 `official_constraint`；`official_boundary` 必须是 `true`；`confidence` 不得为 `low` 或 `unknown`。
- provisional 边界：`geometry_role` 必须是 `provisional_constraint`；`official_boundary` 必须是 `false`；必须说明 `boundary_precision` 和 `usage_note`。
- polygon 必须闭合、非空、坐标合法。
- 面积应与官方文件或公告面积在合理容差内；若正式附件面积不同，以正式附件为准，并在 `sources.json` 说明。

## 3. `geometry/key_areas.geojson`

`key_areas.geojson` 表达三处重点详细设计区域，必须包含三个 `KEY_AREA` feature：

| `area_id` | 名称 | 公告面积 |
| --- | --- | --- |
| `zhongzhiyuan_ai_acceleration_area` | 众智园AI自主创新加速区 | 约 192.1 公顷 |
| `beijing_ai_origin_community` | 北京AI原点社区 | 约 104.3 公顷 |
| `dazhongsi_ai_industry_cluster` | 大钟寺AI产业聚集区 | 约 72.0 公顷 |

每个 feature 必须：

- `layer` 为 `KEY_AREA`。
- official 版本应为 `official_boundary=true`、`geometry_role="official_constraint"`。
- provisional 版本应为 `official_boundary=false`、`geometry_role="provisional_constraint"`，并在正文说明只是粗略重点区。
- 在 `site_boundary.geojson` 内。
- 三个重点区域之间不得重叠。
- 提供 `area_id` 和 `official_area_sqm`；如任务书附件面积与公告不同，以附件为准。

示例属性：

```json
{
  "id": "KEY-001",
  "layer": "KEY_AREA",
  "area_id": "zhongzhiyuan_ai_acceleration_area",
  "name_zh": "众智园AI自主创新加速区",
  "source_type": "official_public",
  "confidence": "high",
  "geometry_role": "official_constraint",
  "official_boundary": true,
  "official_area_sqm": 1921000,
  "source_id": "OFFICIAL-KEY-AREAS"
}
```

## 4. `compliance_matrix.json`

`compliance_matrix.json` 是“任务响应表”。它告诉评审器和人类评审：官方公告 1.3、1.4、1.5 与面向智能体任务书 `agent.1` 至 `agent.6` 的每个必选任务，在方案中由哪些章节、图层、指标、图纸、HTML 页面、来源和自检项支撑。

必须覆盖这些 `requirement_id`：

```text
1.3.1  构建世界级AI创新生态体系
1.3.2  建设适配AI新质生产力的新型城市形态
1.3.3  打造全球AI创新人才向往的高品质城区
1.4.1  统筹研究范围
1.4.2  总体设计范围
1.4.3  重点区域范围
1.5.1.1 统筹研究范围：AI创新生态体系
1.5.1.2 统筹研究范围：适配人工智能的未来城市形态
1.5.2.1 总体设计范围：产业目标与功能布局
1.5.2.2 总体设计范围：城市更新总体框架
1.5.2.3 总体设计范围：交通轨道市政配套设施
1.5.2.4 总体设计范围：京张遗址公园活力带
1.5.2.5 总体设计范围：城市风貌
1.5.3.required 重点区域详细设计必选项
1.5.3.1 众智园AI自主创新加速区
1.5.3.2 北京AI原点社区
1.5.3.3 大钟寺AI产业聚集区
agent.1 一带总体概念与功能统筹方案设计
agent.2 AI全栈自主创新体系与世界级AI创新生态设计
agent.3 AI+场景赋能新范式与智能化AI活力城市设计
agent.4 AI公共空间、智能原生新业态与朝圣地标设计
agent.5 百年京张文化、中关村文化与AI新文化融合叙事设计
agent.6 一带全球AI创新活动体系与长期运营设计
```

每条 requirement 至少包含：

```json
{
  "requirement_id": "1.5.2.2",
  "title_zh": "总体设计范围：城市更新总体框架",
  "mandatory": true,
  "report_sections": ["总体设计范围城市更新与控规深度城市设计"],
  "geojson_layers": ["geometry/land_use.geojson", "geometry/buildings.geojson", "geometry/phasing.geojson"],
  "metrics": ["site_area_sqm", "building_footprint_area_sqm"],
  "drawings": ["drawings/a3-booklet.pdf", "drawings/a0-boards.pdf"],
  "visual_sections": ["建筑与更新项目", "任务覆盖"],
  "source_ids": ["OFFICIAL-ANNOUNCEMENT", "OFFICIAL-DESIGN-BOUNDARY"],
  "assumption_ids": ["A-CONTROLS-001"],
  "self_check_ids": ["LAND_USE_TOPOLOGY", "BOUNDARY_TRUST"]
}
```

如果某条任务没有可定位的章节、图层、指标、图纸或 HTML 证据，就不算完成。

## 5. `standard_matrix.json` 与 `design_depth_matrix.json`

这两个文件用于把“甲级院式成果深度”机器化。它们不是资质证明，而是专业证据链。

`standard_matrix.json` 回答：每条设计判断依据什么标准。每条记录至少包含：

```json
{
  "standard_id": "MOHURD-URBAN-DESIGN-MEASURES",
  "requirement_zh": "统筹城市建筑布局、景观风貌、公共空间和城市特色",
  "professional_dimension": "城市设计",
  "mandatory": true,
  "review_status": "addressed",
  "proposal_sections": ["蓝绿空间、公共空间与城市风貌"],
  "drawing_refs": ["drawings/a0-boards.pdf"],
  "geometry_refs": ["geometry/land_use.geojson", "geometry/public_space.geojson"],
  "metric_refs": ["green_ratio", "public_space_ratio"],
  "source_ids": ["SITE-PACKAGE", "OFFICIAL-ANNOUNCEMENT"],
  "assumption_ids": ["A-CONTROLS-001"],
  "self_check_ids": ["LAND_USE_TOPOLOGY"],
  "evidence_summary_zh": "本条标准通过公共空间图层、绿地/公共空间指标、A0 展板和正文解释落实。"
}
```

`design_depth_matrix.json` 回答：方案是否达到 formal 成果深度。核心项必须全部 `status: "complete"`，包括现状诊断、三层范围、总体结构、用地布局、开发强度或待确认控规条件、建筑高度体量风貌、拆改留、交通轨道慢行停车、市政新基建、蓝绿公共空间、三大重点区详细设计、更新项目清单、分期实施、指标复算、风险和缺资料清单。

每个深度项必须同时提供：

- `proposal_sections`
- `drawing_refs`
- `geometry_refs`
- `metric_refs`
- `source_ids`
- `assumption_ids`
- `self_check_ids`
- `evidence_summary_zh`

缺任何核心项，或核心项不是 `complete`，formal 校验失败。

## 6. `proposal.md` 的可读证据引用

`proposal.md` 是主语言主体方案文本，`.zh.md` / `.en.md` 是与其等义的语言副本。JSON/GeoJSON 证明 agent 真的生成了可复算数据，但人类评审需要在正文中读懂这些数据如何支撑设计判断。

正文必须使用这些引用格式：

```text
[source:SITE-PACKAGE]
[standard:MOHURD-URBAN-DESIGN-MEASURES]
[depth:land_use_layout]
[data:geometry/land_use.geojson#LU-001]
[metric:green_ratio]
```

规则：

- 每个 required section 至少出现一条机器可读证据引用。
- `sources.json` 中的来源应在正文中被引用。
- `standard_matrix.json` 中的标准应在正文中被引用。
- `design_depth_matrix.json` 中的深度项应在正文中被引用。
- 核心 GeoJSON 图层应在正文中解释其设计含义。
- `metrics.json` 中 `status=known` 的指标应在正文中说明公式、来源或空间含义。
- proposal v2 或由当前流程写入 `readiness_contract=persisted-self-check-v1` 的包，`manifest.json.validation_claim.self_checked` 必须为 `true`；它表示作者确实运行并回读了 `self_check.json`，不能用 ready 状态反向替代自检证据。没有该 contract 的历史 ready 包只保留 intake 兼容性警告，并应使用 `self_check_submission.py --mark-self-checked` 迁移。CI 从 trusted base 的 manifest 判断包是历史包、新包还是已经进入 contract 的包；不能通过在 PR head 删除 contract 字段把新包降级为 legacy warning。公开 gallery 为连续性而保留的历史状态只描述展示分类，不构成新的可信正式证据。
- `self_check.json` 是可回读的 contributor-owned 运行记录，结构完整不等于独立可信证明；真正的 provenance 以 `pull_request_target` 的 exact trusted run 或维护者在 trusted checkout 上的重跑为准。

这类引用不是装饰。它要求 agent 在正文中说明：“这个用地分区为什么这样做，来自哪个图层；这个比例怎么复算；这个风貌控制依据哪个标准；这个结论有什么资料缺口。”

正文还必须插入本地派生图，让评审者不打开 JSON 也能读懂主要空间判断。必交并必嵌入：

- `assets/figures/site-overview.png`
- `assets/figures/land-use-structure.png`
- `assets/figures/key-areas.png`
- `assets/figures/mobility-bluegreen.png`
- `assets/figures/metrics-evidence.png`

这些图应由 GeoJSON、metrics、compliance/standard/depth 矩阵和自检结果派生；不得使用远程图片、data URI、未清权地图截图或把图片当作权威面积/边界来源。图是解释层，权威数据仍是 GeoJSON/JSON。

如果提交包包含 `simulation.json`，仿真结果也必须能够从任务台账复算：`task_count` 要等于 `tasks.length`；使用 `simulation_task_count`、`simulation_success_rate`、`tool_schema_pass_rate`、`energy_budget_violations` 或 `audit_completeness` 这些保留指标名时，指标的 `source_files` 应包含 `simulation.json`，并与任务记录逐项一致。成功任务使用 `outcome=success` 或以 `_success` 结尾的结果；能耗违规按 `energy_used_kwh > energy_budget_kwh` 计数。若同时提供 `baselines.urban_llm_harness` 或 `visual/assets/evaluation-baseline.json`，同名聚合值必须一致：`urban_llm_harness` 被定义为任务台账的镜像，不能用一个 scope 字段绕过冲突。其他评测范围须放在不同、说明用途的基线名下，不能在同一个保留指标名下并列两个结果。`ready_for_review` / 双语 v2 包中的冲突会阻断校验，legacy v1 仅给出迁移警告。

### 图面表达质量要求

本项目要求的图面不是 raw data 截图，也不是把 GeoJSON polygon 直接填色后的 debug map。GeoJSON、metrics 和矩阵是证据层；`assets/figures/*.png`、A3/A0 和 `visual/index.html` 是解释层，必须让非技术评审者一眼看懂设计判断、空间主次和资料边界。

图面也不必停留在 SVG 或静态信息板。可把清楚标注为概念表达的体验图、生成图、视频、声音、音乐、动画和三维交互放入 `assets/media/`，并让 `visual/index.html` 通过本地资源提供叙事入口。网站会在方案工作台中直接展示这些媒体；视频必须有 poster、VTT 字幕和 Markdown 文字稿，音频必须有文字稿，所有播放器禁止 autoplay。自定义封面由 `manifest.cover_image` 指向 `assets/media/` 中已登记的图片；空值继续使用默认封面。

每张核心图必须有一个明确主叙事：

- `site-overview.png`：突出总体概念、主轴/主环/核心节点和 official/provisional 状态。
- `land-use-structure.png`：突出空间结构、功能关系、廊道、门户和三层范围传导，不应只是用地色块图。
- `key-areas.png`：突出三处重点区的定位差异、空间联系、项目抓手和风险条件。
- `mobility-bluegreen.png`：突出交通慢行、轨道接驳、蓝绿公共空间连续性和 AI 场景节点。
- `metrics-evidence.png`：突出指标来源、复算关系、待确认控规指标和自检状态。

图面必须具备清晰视觉层级：底图、临时边界、约束和背景信息应低对比度；设计廊道、重点节点、公共空间、AI 场景和核心结论应高对比度。推荐使用曲线廊道、节点网络、透明叠加、重点区 callout、指标卡、分层关系、时间轴、剖面式关系和图例说明。不得让所有图层等权重堆叠，也不得让大面积矩形色块成为主要画面。

使用 provisional boundary 时，尤其要避免把临时矩形或粗略 polygon 画成正式方案构图主体。provisional boundary 应以虚线、淡色边框、注释或水印表达其临时性；真正的图面重点应落在设计意图、空间关系、重点区域、公共空间网络和实施逻辑上。若基础数据本身为矩形 bbox，图面仍应通过廊道、节点、场景、界面和说明表达城市设计主线。

不接受以下低质量图面作为 formal 核心图：

- 原始 GIS/GeoJSON debug map、bbox 截图、未设计排版的工具输出。
- 纯矩形色块拼图、等权重图层堆叠、缺少主次的用地填色图。
- 没有标题、图例、来源/临时性说明、重点标注或设计判断的图片。
- 只追求氛围、渲染、封面感或社交媒体传播感，无法复核空间信息的图片。
- 把 provisional boundary、新闻示意图、外部地图截图或生成插画伪装成 official planning drawing。

评审时可按以下维度判断图面是否合格：主叙事是否明确，设计重点是否突出，层级是否清晰，是否避免 raw data/debug map 感，是否正确淡化临时边界，是否让人不用打开 JSON 就能理解方案。

## 7. `report/proposal.html`

`report/proposal.html` 是从 `proposal.md` 自动渲染出的离线阅读版，用于解决不同 Markdown 预览器对图片路径、中文排版和证据标签显示不一致的问题。它不是第二套主体文本，也不能替代 `proposal.md`、GeoJSON、metrics 或图纸。

提交者每次手动修改 `proposal.md` 后都应运行：

```bash
python3 scripts/render_proposal_html.py submissions/<github-login>/<proposal-slug>
python3 scripts/finalize_submission.py submissions/<github-login>/<proposal-slug>
```

规则：

- 路径固定为 `report/proposal.html`。
- 必须由 `proposal.md` 和本地 `assets/figures/*.png` 生成。
- 图片引用必须指向本地派生图，例如 `../assets/figures/site-overview.png`。
- 不得加载远程图片、外部脚本、iframe、表单、API 请求或跟踪代码。
- HTML 阅读版应让评审者直接看到正文、图片、图注和 `[source:...]`、`[standard:...]`、`[depth:...]`、`[data:...]`、`[metric:...]` 证据标签。

## 8. A3 文册与 A0 展板

PDF 是展示成果，不是权威数据源；但 formal 方案必须提交，作为官方公告中“应征设计成果”的电子文件映射。

### `drawings/a3-booklet.pdf`

建议至少包含：

- 封面、目录、设计团队/agent 说明。
- 设计依据与资料来源。
- 三层范围和官方边界说明。
- 现状诊断和问题清单。
- 统筹研究范围产业与未来城市策略。
- 总体设计范围空间结构、用地、交通、市政、蓝绿系统、风貌控制。
- 三个重点区域详细设计。
- 更新项目清单、实施政策和分期。
- 指标体系、面积复算和合规矩阵摘要。
- AI+ 场景、数据治理和人工复核机制。
- 风险、版权和待补资料清单。

### `drawings/a0-boards.pdf`

建议至少包含：

- 总体设计结构板。
- 用地与城市更新板。
- 交通、轨道、慢行、市政支撑板。
- 京张遗址公园活力带与蓝绿公共空间板。
- 三处重点区域详细设计板。
- AI 场景与实施运营板。
- 指标复核与合规响应板。

图纸中所有面积、比例、范围、重点区域和项目数量应能回溯到 `geometry/*.geojson`、`metrics.json` 或 `compliance_matrix.json`。

## 9. `visual/index.html`

HTML 是必交电子展示页面，用于让评审者快速看懂方案。它不是数据源，必须与结构化数据一致。

### 文件规则

- 路径固定为 `visual/index.html`。
- 必须是 UTF-8 静态 HTML。
- 必须离线可打开。
- 可引用 `visual/assets/*` 本地资源。
- 不得加载 CDN、远程地图瓦片、外部脚本、外部字体、远程图片、iframe、表单、API 请求或跟踪代码。

### 必须可见的内容

页面中必须能看到这些内容：

- 总览地图
- 三层范围
- 重点区域
- 用地分区
- 交通慢行
- 蓝绿公共空间
- 建筑
- 更新项目
- AI 场景
- 核心指标
- 任务覆盖
- 自检状态
- 来源
- 假设

### 推荐视觉 skill 与风格

如投稿者希望借助外部视觉 skill，可优先参考 [JimLiu/baoyu-skills](https://github.com/JimLiu/baoyu-skills/tree/main) 中这些方向：

- `baoyu-markdown-to-html`：适合生成 `report/proposal.html` 阅读版。
- `baoyu-infographic`：适合 `assets/figures/*.png`、HTML 指标图、任务覆盖图和空间证据图。推荐 `technical-schematic`、`subway-map`、`ui-wireframe`、`corporate-memphis`、`pop-laboratory`；推荐 `isometric-map`、`dashboard`、`bento-grid`、`hierarchical-layers`、`linear-progression`、`comparison-matrix`。
- `baoyu-diagram`：适合 AI 服务架构、证据链、评审流程、分期实施、数据治理流程。
- `baoyu-slide-deck`：适合 A3/A0 版式和分屏视觉方向。推荐 `blueprint`、`corporate`、`minimal`、`editorial-infographic`、`intuition-machine`、`scientific`。
- `baoyu-cover-image`：只建议用于封面或 hero，可选 `minimal`、`conceptual`、`typography` 方向。

不建议把 `baoyu-comic`、`baoyu-xhs-images`、娱乐化插图、过度氛围图、童趣图或社交媒体卡片作为 formal 核心成果。详细推荐见 `docs/visual-style-recommendations.md`。

### 指标一致性标记

核心指标必须用 `data-metric` 和 `data-value` 标记，便于 `scripts/visual_review.py` 与 `metrics.json` 对比：

每一个带数值的 `data-metric` 都必须对应 `metrics.json` 中 `status="known"` 且具有数值 `value` 的指标，并且数值必须一致。`unknown`、`not_applicable` 或尚未登记的指标不得在 HTML 中用 `data-value` 渲染成数字；应显示明确的 unknown/pending 文本、原因和复算前置条件。视觉审查会把这类数值声明判为阻断问题，防止单独截屏或摘录后被误读为正式控规或已知事实。

```html
<span data-metric="site_area_sqm" data-value="11400000">1140 公顷</span>
<span data-metric="green_ratio" data-value="0.23">23%</span>
<span data-metric="public_space_ratio" data-value="0.18">18%</span>
```

当前 visual packaging check 至少检查：

- `site_area_sqm`
- `green_ratio`
- `public_space_ratio`

HTML 展示值与 `metrics.json` 不一致会失败。

## 10. 提交前自检

提交前运行：

```bash
python3 -m pip install -r requirements-review.txt
python3 scripts/render_proposal_html.py submissions/<github-login>/<proposal-slug>
python3 scripts/finalize_submission.py submissions/<github-login>/<proposal-slug>
python3 scripts/self_check_submission.py submissions/<github-login>/<proposal-slug> --pr-author <github-login> --mark-self-checked --json
```

这个命令会依次运行：

- required CI 同款 deterministic validation
- trusted spatial review
- visual packaging check
- professional evidence review

全部 PASS 只说明 package 具备进入机器检查和内容评审的基础条件。provisional boundary 会保留精度警示和复算要求，但不会因组织方数据缺口阻断评分。PASS 不代表方案优秀或获得官方批准。

维护者审核 PR 时会运行 `scripts/maintainer_review.py --comment`，并在本地忽略目录 `.maintainer-review/<proposal-slug>/` 生成 `maintainer-comment.md`、`review-summary.json`、`review-input.json`、`review-prompt.md` 和 `advisory-review.md`。维护者只把命令输出复制到 PR comment；maintainer review 结果不提交到仓库，也不进入公开展示页。方案合并到 `main` 后自动进入全部方案页；维护者通过 `gallery-publication.json` 明确暂停展示或决定首页精选，再运行 `scripts/generate_submissions_data.py`。参赛者只提交自己的投稿目录，不修改发布清单或 `submissions-data.js`。

## 11. 缺资料时怎么办

如果缺官方边界或三处重点区域 polygon，不要生成伪 official formal。当前允许两种做法：

1. 使用 `brief/site-package/geometry/provisional_boundaries.geojson` 生成临时 formal intake 包。
2. 在 `proposal.md`、`visual/index.html`、`sources.json`、`assumptions.json` 和 `self_check.json` 中明确写明它是粗略 provisional boundary。
3. 运行完整自检；拓扑、覆盖、指标、可视化、专业证据链仍必须 PASS。
4. 列明替换 official polygons 后需要重算的图层和指标；不得把 provisional geometry 描述为官方红线。
5. 禁止把 bbox、OSM、新闻图、文字四至或 AI 推测边界写成 `official_constraint`。

这不是降低专业要求，而是把“资料暂缺”与“方案生成质量”分开：允许参赛者先提交可读、可查、可复算的 provisional formal 方案，同时避免用漂亮但不可审查的数据误导评审。
