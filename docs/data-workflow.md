# 公开数据处理指引

本指引用于维护者和 AI agent 处理百年京张 AI 创新带相关公开资料。目标不是把互联网上能找到的内容都塞进方案，而是让每条资料都能说明来源、授权、用途边界和不确定性。

## 1. 资料分层

- `brief/`：已经整理成任务书、规则或 site package 的公开/清权资料。agent 生成方案时优先读取。
- `data/source_registry.json`：维护者维护的共享资料登记表。它记录仓库提供或希望统一复核的资料是否可作为 formal 依据、背景资料或 provisional intake 线索；它不是每个投稿包自采来源的全量清单。
- `data/sources/`：原始公开资料索引或采集记录。
- `data/processed/`：从公开资料清洗出的 Markdown、CSV、字段字典或摘要表。

## 2. 可用性等级

- `usable_for_formal="yes"`：可作为 formal 依据，但仍只能支撑其记录中允许的用途。
- `background_only`：可用于背景叙述、案例、趋势或时间线，不可独立支撑规划控制结论。
- `provisional_only`：只可支撑临时生成、自检、可视化或设计讨论，不能作为官方红线、精确面积或法定控制结论；该组织方数据缺口本身不阻断内容评分。
- `no`：不能用于方案依据，只能作为排除记录或待清权线索。

## 3. Agent 读取流程

1. 读取 `brief/public-brief.md`、`brief/site-package/design_brief.json`、`brief/site-package/allowed_design_space.json`、`brief/site-package/agent_taskbook.json`。
2. 读取 `data/processed/agent_fact_pack.md`，再打开同目录的 `project_scope_summary.csv`、`agent_task_requirements.csv`、`source_use_matrix.csv` 和 `missing_data_checklist.csv`。
3. 读取 `brief/site-package/standards/standards.json` 与 `brief/site-package/standards/references/`。
4. 读取 `data/source_registry.json`，按 `review_status` 和 `usable_for_formal` 使用其中的共享资料；不在中央表中的参赛者自采源，仍须在投稿包 `sources.json` 中独立登记，不能因此获得中央表的 approved 或 formal 资格。
5. 生成方案时，把引用过的资料同步写入投稿目录的 `sources.json`。
6. 在 `proposal.md` 中用 `[source:...]` 标签解释资料如何支撑文字、图层、指标和图纸。
7. 对不能确认的资料，写入 `assumptions.json`、`self_check.json` 和 `proposal.md` 的风险/缺资料章节。

`scripts/scaffold_ai_submission.py` 会在初始 `sources.json` 中加入 `SOURCE-REGISTRY`，并在 `proposal.md` 中解释当前 registry 的 formal/background/provisional 摘要。`scripts/review_submission.py` 会把 `source_registry_summary` 写入 review packet，供维护者或外部评审模型判断资料是否被越界使用。

`data/processed/` 是给 agent 的阅读导航层，不是新的权威来源。正文和矩阵可以引用处理表说明工作流；使用中央共享资料时回到 `source_registry.json` 中的原始 `source_id`，使用方案自采资料时回到投稿包 `sources.json` 中的原始 `source_id`，并在两处都说明用途和限制。

## 3.1 投稿包来源与中央登记表的关系

`data/source_registry.json` 与 `submissions/<github-login>/<proposal-slug>/sources.json` 解决的是两件不同的事：

| 位置 | 责任人 | 记录范围 | 能证明什么 |
| --- | --- | --- | --- |
| `data/source_registry.json` | 维护者 | 仓库共享、组织方提供、已进入统一复核范围的资料 | 中央登记记录中的权威等级、许可摘要、允许用途和复核状态 |
| 投稿包 `sources.json` | 参赛 agent | 该方案实际使用的公开资料、清权资料、仓库文件、案例、数据、图像、字体和工具链依赖 | 该方案对每项来源的出处、用途、限制和清权/再分发说明 |

参赛者不需要、也不应当为了通过投稿校验而把每一条自采源复制进 `data/source_registry.json`。投稿包必须完整维护自己的 `sources.json`；中央表中已有的记录应复用同一 `source_id`，未进入中央表的来源应使用方案内可追溯的 ID，并在正文中说明用途和限制。中央表缺少某条来源不等于该来源自动被批准，也不等于它自动禁止使用：formal 权威结论仍只能使用中央表中明确 `review_status="approved"` 且 `usable_for_formal="yes"` 的资料，或另有明确的官方/清权附件。

字体、PDF 内置字体、Python/Node 依赖、构建工具链等通常是资产或软件许可记录，不是中央公共事实资料。它们默认登记在投稿包的 `sources.json` 或 `report/copyright_statement.md` 中，至少说明名称、版本或来源、许可证、是否随包再分发和对应本地资产/构建路径；只有当它们还被作为仓库共享资料或 formal 事实依据时，才需要进入中央 source registry。

## 4. 新资料入库流程

维护者新增资料时：

1. 确认资料来自公开 URL、官方公开页面、开放许可数据，或用户明确清权后可公开的文件。
2. 在 `data/source_registry.json` 新增记录，填写 `source_id`、发布机构、发布日期、访问日期、许可摘要、可用用途和禁止用途。
3. 如有本地快照或处理文件，写入 `local_paths`。
4. 运行：

```bash
python3 scripts/validate_data_registry.py
```

5. 如果该资料要升级进入 `brief/site-package/`，还要同步更新相关 `sources.json`、标准索引、hash 或 schema 测试。

参赛者不能直接修改维护者控制的 `data/source_registry.json`。如果希望某条自采源进入中央共享登记表，请新建 GitHub Issue，标题使用 `[source-registry] <简短来源名>`，并提供 `source_id`（如已有）、标题、发布机构、URL 或本地路径、发布日期、访问日期、许可证/清权说明、建议的 `authority_level`、`allowed_uses`、`prohibited_uses`、本地快照或 hash，以及希望进入 `brief/site-package/` 的理由。维护者复核后再修改中央表、运行 `validate_data_registry.py`，并按需要更新处理资料、前台摘要和相关测试；Issue 不是批准凭证，合并前仍保持 `needs_review` 边界。

## 5. 从自动发现生成待复核草稿

自动发现结果不直接进入正式资料库。推荐流程：

```bash
python3 scripts/discover_public_sources.py --no-search --no-seed-links
python3 scripts/prepare_source_registry_draft.py --json
```

`prepare_source_registry_draft.py` 会读取 `brief/discovery/candidate-sources.csv`；如果该文件不存在，则读取 `brief/data/auto-crawl-seed-urls.csv`。输出文件为 `data/source_registry.draft.json`，默认被忽略，不提交。

草稿记录有三个特点：

- `review_status` 固定为 `needs_review`。
- 已经登记在 `data/source_registry.json` 的 URL 会被跳过，避免重复入库。
- 需登录、需 userKey、下载密码或访问权不明的资料会标为 `public_access_status="restricted_or_unknown"` 和 `usable_for_formal="no"`。

维护者复核草稿时，至少要确认：

- 发布机构是否准确。
- 是否可以公开访问或已经清权。
- 是否需要保存本地快照。
- 是否可升级为 `usable_for_formal="yes"`，或者只能作为 `background_only`。
- 禁止用途是否写清，尤其是空间边界、控规、道路红线和建设规模。

## 6. 空间资料特殊规则

空间资料比普通文本资料更严格：

- official boundary/key areas 必须来自可信官方公开资料或清权文件，并记录坐标系、转换流程和面积复算结果。
- 文字四至、新闻示意图、OSM、bbox、商业地图截图不得作为 official boundary。
- 暂时粗略边界必须标记为 `provisional_only`，对应 GeoJSON 属性必须使用 `geometry_role="provisional_constraint"` 和 `official_boundary=false`。
- 涉及道路红线、控规地块、建筑高度、开发强度、管线、市政、消防、文保控制线时，没有官方附件就只能写成待补资料或概念建议。

## 7. 清洗输出要求

`data/processed/` 中的处理结果应包含：

- 来源 ID。
- 处理日期。
- 字段说明。
- 单位、坐标系或统计口径。
- 缺失值和不确定性。
- 可用于哪些方案章节、图层或指标。

不要把清洗结果写成比原始资料更确定的结论。比如公开公告只有“约 11.4 平方公里”，处理结果不能写成精确红线面积。

## 8. 投稿引用要求

参赛 agent 在 `sources.json` 中引用资料时，应保留：

- `source_id`
- `title`
- `publisher`
- `url`
- `accessed_date`
- `authority_level`
- `usable_for`
- `not_usable_for`

正文必须说明资料的设计作用。例如：该公告用于确认三层范围和设计任务；临时边界只用于 intake 可视化；专业标准用于风貌、公共空间和控规深度语言，不用于推导本项目已批控规指标。

## Quick Reference (English)

### Source tiers

| `usable_for_formal` value | Meaning |
|---|---|
| `yes` | May be used as authoritative formal evidence; requires `review_status=approved` |
| `background_only` | Context, precedent, trend — not a basis for planning-control conclusions |
| `provisional_only` | Intake, visualization, design discussion only; not official boundary or precise area |
| `no` | Cannot be used as evidence; kept as exclusion record or pending rights-clearance |

### Key scripts

| Task | Command |
|---|---|
| Validate registry | `python3 scripts/validate_data_registry.py` |
| Validate public sources | `python3 scripts/validate_sources.py` |
| Discover candidate sources | `python3 scripts/discover_public_sources.py` |
| Generate review draft | `python3 scripts/prepare_source_registry_draft.py --json` |
| Build frontend data | `python3 scripts/generate_source_registry_data.py` |

### Source registry vs. submission sources.json

The central `data/source_registry.json` covers repository-shared and organizer-provided sources reviewed by maintainers. The submission-package `sources.json` covers every source the participant actually used — including sources not in the central registry. Participants must maintain their own `sources.json`; the absence of a source from the central registry does not automatically permit or prohibit its use.
