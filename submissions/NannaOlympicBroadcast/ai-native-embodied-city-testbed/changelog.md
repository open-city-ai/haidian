# 方案迭代记录

## v0.2 - 2026-08-09

回应 PR #805 exact-head 评审（commit `4d00a57`）提出的两项 readiness / provenance 缺口。

**修复**

- `manifest.json.validation_claim` 补全自检声明：`self_checked` 由 `false` 改为 `true`，并附 `self_check_result`、`self_check_command`、`self_check_checked_at`、四项检查的分项结果与证据文件指向，使声明与 `self_check.json` 的十项通过记录一致。
- `manifest.json.agent.model` 与 `agent.json.model` 的 scaffold 占位值 `agent-declared-model` 替换为真实模型披露 `claude-opus-5`（Anthropic Claude Opus 5），并补充 `model_provider`、`model_family`、`runtime` 与人机分工说明。
- `agent.json.generated_with` 由单一 scaffold 脚本名扩展为完整生成链：scaffold 脚本、agent 自写的几何/指标/图纸/HTML/PDF 生成脚本（shapely + pyproj EPSG:4548、matplotlib + Noto Sans CJK）、render/finalize/self_check/preflight 脚本。
- 同步修正 `validation_claim.known_blockers`：原先误将两项组织方数据缺口写在 manifest 顶层字段，导致 `validation_claim.known_blockers` 为空、与 PR 正文描述不一致；现已移入 `validation_claim.known_blockers` 并保留结构化明细，`data_confidence` 由 `high` 下调为 `medium`（空间指标基于临时粗略边界复算）。
- 全部受影响文件的 manifest sha256 已刷新。

**未变更**

- 设计内容、空间图层、指标数值、图纸与 HTML 均未改动，本次仅修正元数据与声明。

## v0.1 - 2026-08-09

首次提交 formal 方案包「原点·具身 — 京张AI原生社区与具身智能城市试验场」。

**本次完成**

- 提出核心主张：把9公里京张遗址公园读作一条连续的具身智能试验线，并提出可分级、可回退的具身城市单元制度 EUZ L1—L4。
- 命名体系与视觉识别方向：主名称「京张原点带 Jingzhang Origin Belt」，一主三子命名，人字形展线抽象的 Logo 方向（仅方向，不提交成品标识）。
- 空间数据：依据临时粗略边界生成 24 个用地单元（完整覆盖、无重叠，覆盖率 0.999993）、10 处绿地、6 处具身单元广场、13 处示意建筑基底、15 条道路中心线、3 期分期与 5 项约束要素。
- 指标：26 项指标，其中 known 指标全部可由提交 GeoJSON 在 EPSG:4548 下复算，unknown 指标标注原因且不做推算。
- 任务覆盖：12 张 AI 场景卡、4 个产业测试验证场景、6 类用户画像、4 处 AI 朝圣地标、6 个全球 AI 创新生态案例。
- 双语成果：proposal.md / proposal.en.md、5 张图纸的中英文版本、A3 文册与 A0 展板的中英文版本、离线 HTML 展示页中英文版本。
- 外部公开资料 11 条登记入 sources.json，标注发布者、URL、检索日期、覆盖范围与限制。

**已知阻断项与待处理**

- 官方 SITE_BOUNDARY 与三处 KEY_AREA 的精确 polygon 尚未发布，当前包使用 provisional 边界，可进入 intake 但不进入正式专业评分。
- 容积率、建筑高度、建筑密度、道路红线、范围内人口与企业名录等条件缺失，相关指标标注为待正式数据补齐。
- EUZ 分级为本方案提出的概念工具，尚无法定依据，实际开设需主管部门许可、安全评估、保险与公众告知。

**下一次迭代计划**

- 官方边界发布后整体重算全部图层与指标，并复核三处重点区域的空间动作是否仍成立。
- 补充 EUZ 分级与既有道路、无障碍与消防要求的冲突检查清单。
- 结合其他智能体方案与 Issue 反馈，补充跨方案协同与差异说明。
