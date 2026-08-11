# 方案迭代记录

## v1.4.1 - 2026-08-09

### 改动摘要（证据新鲜度与状态语义修复）

- `self_check.json`：在最终 v1.4 包内容定型后重跑官方四项 gate 自检并持久化；`generated_at` 更新为实跑时间；新增 `input_sha256`（对包内除 self_check.json 与 manifest.json 外全部 39 个文件的内容摘要），证明四项 gate 是在最终包内容上跑的。
- `self_check.json` BOUNDARY_TRUST / KEY_AREAS_TRUST 消息改写：明确其 pass 认证的是 intake 就绪（临时几何已诚实披露），不是法定评分资格；官方红线/重点区 polygon 到位前不得用于法定或工程用途。
- `self_check.json` notes 新增状态语义与新鲜度不变量说明：formal-review-ready 指仓库 intake 与正式评审资格；本文件在每次包内容变更后重新生成并重刷哈希，保证 self_check.generated_at 不早于最新包产出物。
- `manifest.json`：哈希全量重刷，generated_at 与 self_check.generated_at 对齐（同一时刻，满足新鲜度不变量）。

### 采纳反馈

- 按评审意见修复证据新鲜度：旧自检时间戳早于包定型时间 10 小时，重跑并持久化新时间戳与输入摘要，使哈希不仅锁住自检文件，还能证明自检跑在最终内容上。
- 按评审意见消除状态歧义：同一 gate 不再呈现“既 ready 又未 ready”的读法；pass+major 的含义限定为 intake 可接受、法定评分前需替换官方几何。

## v1.4 - 2026-08-09

### 改动摘要

- 新增「七个交付问题：专业交接表」（第 11 章）：把交接必须回答的七个问题（任务贴合、原创可复现、AI—空间耦合、实施入口、公共利益、风险约束、继续深化）逐一落到包内可核验对象与下一责任位，便于维护者与接收团队不开包通读即可完成交接。
- 新增「故障演练设计：48 小时合成联调」（第 13 章）：以桌面推演形式设计四类故障注入（服务不可用/评测不通过/申诉升级/数据撤回）对应的三色信号状态迁移与验证点；明确不接触公众、不使用真实个人数据、不连接真实城市系统，且本包只交付演练设计、不声称已执行。
- `self_check.json`：视觉检查项由 VISUAL_STATIC 更名为规范命名 VISUAL_PACKAGING，使四条规范化检查（确定性校验/空间复核/视觉打包/专业证据）与公开口径一致；三个矩阵中 44 处引用同步更新。
- `agent.json`：补充可选的 model_family/model_detail 结构化披露字段（other / Qoder Lingma Agent），与既有 model 字段一致。
- `compliance_matrix.json`：新章节映射到 agent.1/agent.4/agent.5 与 1.5.1.1；iteration 升级为 v1.4。
- 更新日志去除具体 PR 编号引用，改为中性表述。

### 采纳反馈

- 参照高分已合并方案的交接方法：前置专业交接表与故障演练设计，全部挂接三色信号主题；演练只交付设计不声称执行，不新增伪精确承诺。
- 对齐社区公开的自检证据规范化口径：四条检查项采用统一命名，顶层 ok/can_enter_formal_review/review_status 字段保持持久化。

## v1.3.2 - 2026-08-09

### 改动摘要（模型溯源同步）

- `manifest.json.agent.model`：由 scaffold 占位符 `agent-declared-model` 重新生成为已披露 agent 卡片的实际模型 `Qoder Lingma Agent (agentic IDE)`，与 `agent.json` 完全一致；agent_id 与 agent_name 同步核对无差异。
- 按已披露 agent 卡片重刷 manifest（LF 归一 + 全量哈希重算），并重跑官方全量四项 gate 自检（PASS，formal-review-ready），`self_check.json` 顶层状态字段保持持久化。

### 采纳反馈

- 评审指出确定性绿灯不能替代模型溯源一致性：agent 卡片已披露真实模型但 manifest 仍残留占位符。修复方式为从 agent.json 重新生成 manifest.agent 块并复验全部哈希与自检。

## v1.3.1 - 2026-08-09

### 改动摘要（投稿状态一致性修复）

- `agent.json`：model 由占位符改为实际 agent 披露（Qoder Lingma Agent，agentic IDE），补充 generated_with 与 disclosure 字段。
- `self_check.json`：持久化官方全量四项 gate 自检结果，新增顶层 `ok=true`、`can_enter_formal_review=true`、`review_status=formal-review-ready`、`gates` 与 `spatial_issue_ids`；原明细检查项保留。
- `manifest.json`：`validation_claim.self_checked` 同步为 true（与 package_state=ready_for_review 一致）；`data_confidence` 由 high 降级为 medium，并新增 data_confidence_rationale 说明 provisional 几何限制与官方数据到位后的复算义务。
- 全量文本 LF 归一化后重刷 manifest 哈希；本地自检与 CI 口径一致（上游已并入 LF 校验修复）。

### 采纳反馈

- 按评审意见修复四处状态不一致：ready 声明与 self_checked 标志、self_check.json 顶层状态字段、agent 披露、provisional 几何下的数据置信度说明。

## v1.3 - 2026-08-09

### 改动摘要

- 新增「空间产业融合：信号格网的产业职能」（第 4 章）：用地分类与产业职能/供给方式映射表，三条融合规则（黄灯限期供给、绿灯稳定供给、红灯可收回再配置），回应任务书规划创新性维度的空间产业融合要求。
- 新增「落位清单与深化移交」（第 11 章）：六项成果逐条给出适合落位的片区/节点、空间类型、前置依赖与深化接收方，回应空间明确性与可转化性维度。
- 新增「区级公开统计：用来收敛问题，不用来制造目标」（第 3 章）：引《北京市海淀区 2025 年统计公报》三条可核验发现，各自收敛一个设计判断并写明不能证明什么；全部标 background_only、not_spatially_allocable，不进 metrics、不改几何。
- 新增「合规基线：三条红线的法定依据」（第 13 章）：可停止/申诉时限/无 AI 等价路径三条红线锚定到《生成式人工智能服务管理暂行办法》第 14/15/17 条、《无障碍环境建设法》第 39 条与国办发〔2020〕45 号；只引条款要义，不构成法律意见。
- sources.json 重建为溯源记录：18 条来源逐条登记 authority_level、evidence_class、collection_method、spatial/temporal coverage、license 与 usable_for/not_usable_for；新增 4 条法定/统计来源。
- 风险章改为风险矩阵（风险—处理—深化动作—登记编号 R-01~R-04）；指标章保留完整复算值并说明小数位含义；开篇新增中英双语七行执行摘要；参考资料索引补入新来源 ID。
- compliance_matrix 新增映射（1.3.1/1.5.1.1/agent.1/agent.2/agent.3）；iteration 升级为 v1.3。

### 采纳反馈

- 参照高分已合并方案的溯源方法论：把已有判断的出处写实（法定依据锚定、来源溯源字段、区级统计收敛问题）；同时补上其本轮未做的空间/产业深度（空间产业融合、落位清单），避免纯证据化迭代偏离空间方案主线。

### 暂未采纳或待复核事项

- 同前：官方边界与控规指标缺失，待 official 数据发布后整包重算；图纸套数（A3 六页）未扩充，待后续迭代评估。

## v1.2 - 2026-08-08

### 改动摘要

- 新增第 6 章《AI 原生城市形态与规划方法（信号态城市）》，正面回应公告 1.5(1)：城市形态从静态分区到信号格网（城市功能要素可寻址、有状态、可替换）、自适应可进化的城市发展模式（更新即可回滚的信号提交，三期即三道合并门槛）、可感知可交互与感知边界、多智能体四角色制衡（生成/验证/复核/异议）、国土空间规划创新三条主张（信号态成果/双轨表达/把不知道写进成果）。
- 新增「区域创新协同：信号接力」小节：未来科学城/怀柔科学城（策源端）→ 众智园（验证端）→ AI 原点（开源端）→ 大钟寺（体验端）→ 经开区/京津冀（放大端），北纬社区为带上中转节点；回应任务书区域协同维度。
- 补齐任务书点名成果：场景-空间-运营映射（第 7 章）、公共空间组件库与荣誉展示体系（第 10 章）、东西缝合南北连通表述、实施主体与年度评估指标（第 11 章）。
- 总体设计章新增信号机制体系段落；参考资料补入 brief/public-brief.md；章节重编号 1–14，iteration 升级为 v1.2；compliance_matrix.json 的 1.5.1.1 / 1.5.1.2 / agent.1 映射到新章节。
- 重新执行 render_proposal_html → self_check_submission，全部 PASS。

### 采纳反馈

- 参照已合并高分方案的迭代方法：全包检索公告与共创宪章点名概念，将出现 0 次的概念（自适应/可进化、城市功能要素、空间组织方式、可感知可交互、多智能体、生产/生活方式、国土空间规划创新、区域协同、组件库、场景-空间-运营映射）逐一补齐；全部新内容挂接三色信号语言主题，不偏离方案主线。

### 暂未采纳或待复核事项

- 同前：官方边界与控规指标缺失，待 official 数据发布后整包重算；图纸套数（A3 六页）未扩充，待后续迭代评估。

## v1.1 - 2026-08-08

### 改动摘要

- 重建全部五张演示图（中英双版）：分辨率由约 700–1700px 提升至 2400–3360px，统一图例、三色信标标注与 provisional 边界声明；修复关键区标签裁切与 A0 构图留白问题。
- 重建 A3 文册与 A0 展板（中英双版）：改用矢量文字与矢量地图绘制，打印分辨率与可读性提升；指标页数值经坐标级文本提取复核，与 `metrics.json` 一致（绿地率 11.34%、公共空间率 0.36%、建筑密度 31.75%、场景卡 12 / 测试 3 / 画像 5 / 地标 3 / 案例 7、分期 147.4/204.8/96.5 万㎡）。
- `proposal.md` 与 `proposal.en.md` 润色：全章节加编号（1–13，与任务书/评审维度对位）；重点区详细设计补充三处临时 polygon 包内复算面积（约 192.9 / 104.3 / 72.0 万㎡），并与公告公开的约 192.1 / 104.3 / 72.0 公顷量级对照；`iteration` 升级为 v1.1。
- 重新执行 render_proposal_html → finalize_submission → self_check_submission，全部 PASS。

### 采纳反馈

- 参照已合并同伴方案（如 savon66/jingzhang-ai-innovation-belt）的编号章节结构与重点区面积标注做法，提升评审可对照性。
- 内部复核发现旧版 PDF 图为低分辨率栅格、A0 展板留白过多，已全部重建。

### 暂未采纳或待复核事项

- 同 v1.0：官方边界与控规指标缺失，待 official 数据发布后整包重算。

## v1.0 - 2026-08-08

### 改动摘要

- 创建「京张信标 JINGZHANG BEACON」正式提交包：以百年京张铁路信号体系为原型，把 AI 城市运行状态转译为绿/黄/红三色公共信号语言。
- 空间结构：一脊（信号脊绿带）、三核（众智园验证信标 / AI 原点开源信标 / 大钟寺体验信标）、双翼（中关村科技服务翼 / 小月河场景赋能翼）。
- 交付内容：proposal.md（主语言中文）+ proposal.en.md（完整英文对照）；9 个 GeoJSON 图层（用地 35 单元完整覆盖、建筑 107、道路 6、绿地 7、公共空间 3、分期 7）；metrics.json 26 项指标；compliance/standard/design_depth 三矩阵；5 张演示图（中英双版）；A3 文册与 A0 展板（中英双版）；离线 visual/index.html（中英双版）。
- 覆盖 agent.1–agent.6 六项智能体任务：命名/Logo 方向、7 个全球机制案例、12 张 AI 场景卡（含 3 张产业测试验证场景）、5 类用户画像、3 处 AI 朝圣地标、京张信标节年度活动与开发者社区运营机制。
- 通过 render → finalize → self_check（formal-review-ready）→ participant_preflight 全部检查。

### 采纳反馈

- 首版提交，暂无外部评审反馈。
- 内部复盘采纳：修复地图类图构图比例（site 为南北 1:7 狭长走廊，改用竖长画布 + 显式坐标范围）；补齐双语材料、changelog 与完整 self_check 条目。

### 暂未采纳或待复核事项

- 官方 `SITE_BOUNDARY` 与三处 `KEY_AREA` 精确 polygon 缺失，全部几何为 `provisional_constraint`；official 数据发布后须整包重算并提交差异报告。
- 控规指标（容积率、建筑高度、建筑密度、绿地率、退线）、道路红线、权属、市政容量与文保控制缺官方依据，保持 unknown/待确认。
- 场景卡、活动体系、朝圣地标、招商与政策均为概念建议，需专业团队深化；不表述为已确定政府安排。

### 公开资料与合规说明

- 仅使用公开任务书、官方公告、仓库登记标准快照与清权资料；不使用非公开地图、内部表格、未清权图片或伪造官方背书。
- 图片、图纸、数据与代码资产来源与许可见 `sources.json` 与 `report/copyright_statement.md`。
- 本方案不声称官方批准、审定控规、最终土地权属、最终建设规模或保证实施。
