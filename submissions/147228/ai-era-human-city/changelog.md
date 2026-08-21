# 方案迭代记录

## v1.7 - 2026-08-10

- 新增从同源 provisional GeoJSON 与节点计划生成的空间证据图谱：总览与三处重点区缩放同时呈现人优先线、蓝绿缓冲、十个场景节点、四段公共接口和人工兜底。
- 增加 `ai-era-spatial-atlas-v17.json` 与确定性 runner，检查三处重点区、每区四段功能带、十个场景节点、双语 SVG/PNG 尺寸及非官方边界；不新增 geometry、指标、许可、容量或现场结果。
- 增加众智园一条空间决策差分：用反事实的单一机器展示入口与本包采用的普通到达—人工接管—受限模拟—冻结退出进行并置，新增 `ai-era-spatial-delta-readout.json`；差分只属于 `design_target`，不提供尺寸或现场绩效。
- 中英文 proposal、主图、HTML、PDF、manifest 与双语/权利台账将随本轮重新生成；所有空间动作仍是概念建议/参考方案，供专业团队深化研究。

## v1.6 - 2026-08-10

- 对齐中英文 proposal 的证据引用多重集，补回重点区、公共空间、标准与来源的对应标记；英文候选名保留为受保护的代码文本，双语审计不再把它误判为未翻译正文。
- 重新生成英文离线 HTML、A0/A3 图册并刷新 manifest 哈希；不改变 geometry、正式 metrics、来源等级、概念性实施边界、公共排序或官方评分主张。

## v1.5 - 2026-08-10

- 修复双语评审图板的 CJK 混排换行：项目族表格现在按可见字符宽度分栏，长句不会越过右侧卡片边界。
- 为英文任务书三联卡、四季卡和项目族卡单独设定字号与行高，避免标题、正文和脚注互相覆盖。
- 将八张审阅图板的 SVG/PNG 尺寸一致性重新设为可执行门禁（1600×1000），避免栅格化工具生成正方形 PNG 时造成横向裁切或比例漂移。
- 只改善表达层与渲染可读性，不修改 geometry、正式 metrics、来源等级、实施边界或任何官方评分主张。

## v1.4 - 2026-08-10

- 将画像与公平协议从 6 类扩为 9 类，单独补入青年学生与初入行者、首次到访者与国际访客、公共服务与一线维护人员；每类均绑定场景、临时空间锚点、普通替代路径和停止条件。
- 新增 `ai-era-people-fairness-audit.json` 与确定性 runner，复核 9 类必需群体、10 张场景卡、10 个空间要素覆盖，并保持 `official_boundary=false`、`operational_status=not_authorized_not_run`。
- 同步中英文 proposal、metrics、离线 visual index 与双语审校范围；新增内容仍是概念设计视角，不升级为人口调查、无障碍认证、现场公平结果或官方评分。

## v1.3 - 2026-08-10

- 新增 `ai-era-provisional-spatial-readout.json` 与确定性 runner，从同一组 provisional GeoJSON 复算 3 个重点区、9 段相邻锚点的最小顶点间距，并明确它不是路线、服务半径、无障碍结论或工程尺寸。
- 在图 06 的中英文图板中增加关系读数和统一的非官方边界说明，缩短英文标签并修复节点名称与色块的遮挡，重新生成 PNG。
- 同步双语 proposal 与 `metrics.json`；不改变 geometry、正式面积、现场绩效、许可、运营主体、公共排序或官方评分边界。

## v1.2 - 2026-08-10

- 新增 `taskbook-culture-operations-atlas-v12.json` 与双语图 10，把 agent.4 公共空间/地标、agent.5 文化叙事、agent.6 全球活动/长期运营落到三处 provisional 公共空间锚点、四季节奏和五个概念项目族。
- 生成器与确定性 runner 增加三项任务书位置、三处地标、四季运营和非官方评分边界检查；同步中英文 proposal、离线 visual index、权利台账与双语审校范围。
- 只补充包内字段的表达级索引，不改变 geometry、正式 metrics、来源等级、公共排序或实施边界。

## v1.1 - 2026-08-10

- 从既有 ordinary journey、traceability 与 implementation JSON 合约生成三张双语审阅图板，分别覆盖 5 步任务链、5 步回退、6 项验收、10 张场景卡和 5 个概念项目族的 G0/G1 门。
- 新增 `build-ai-era-evidence-boards.js` 与 `run-ai-era-evidence-boards.js`；生成器和校验器均为本地、可复现、包内数据驱动，并显式保留 `not_an_official`、`result_status=not_run` 与 G0 边界。
- 同步中英文 proposal、HTML 看板、manifest 与权利台账；图板只改善评审可读性，不新增现场绩效、许可、授权、部署或官方评分结论。

## v1.0 - 2026-08-10

- 在中英文设计依据入口前置六层“证据等级与公共任务边界”表，区分 formal 任务/标准、来源分级、临时空间、包内派生证据、背景方法和合成回放。
- 明确未登记背景、provisional、unknown、design_target、not_authorized_not_run 与本地 PASS 的禁用升级路径，不把它们写成海淀现状、现场绩效、专业批准或官方评分。
- 重新生成双语 proposal report，并刷新 manifest 哈希；不改变 geometry、正式 metrics、来源等级或实施边界。

## v0.9 - 2026-08-10

- 新增原创双语矢量示意图，把节点级功能带直接呈现为普通到达、人工解释/服务、受控状态与冻结复盘/退出四段序列；示意图不表示地图、红线、断面、体量或工程尺寸。
- 同步正文、双语 HTML、manifest 与权利台账；继续保持 provisional geometry、unknown 现场基线、人工回退和无许可/部署/绩效主张。

## v0.8 - 2026-08-10

- 将三处重点区的公共界面继续压到节点级，新增双语 `ai-era-spatial-interface-plans.json`，用现有 provisional geometry 锚点表达普通到达、人工解释、受控状态、冻结复盘与退出的连续关系。
- 功能带明确为无尺度概念状态，不新增几何、尺寸、容量、工程、许可、运营或绩效主张；中英文 proposal 与 HTML 需同步刷新。

## v0.7 - 2026-08-10

- 将三处重点区从关系示意推进到可比较的公共界面与可逆服务动作，删除越界的概念 FAR/层数范围，保留人工前台、普通路径、可撤回设备与专业复核顺序；正式控制指标继续保持 unknown。
- 为 G0、G1、G2 增加提交后季度窗口，并把参与主体落到属地规划、街道、公共服务、专业复核和运营责任等机构类型；具体机构、合同、预算、许可和实施结果仍待确认。
- 同步中英文 proposal 与离线 HTML，未改变几何、指标、来源等级或官方状态。

## v0.6 - 2026-08-10

- 将 SCN-02 技能再造走廊、SCN-04 夜间人工服务接入普通人离线回放，补齐转岗者和夜班人员两类入口；四条路线均绑定现有 persona、phase 和 GeoJSON 要素。
- 将回放契约扩为 4/4 路线、8 个夹具、5 个失败路径和 3 个普通/人工替代路径；失败仍只触发冻结、暂停、拒绝或回到 G0，不产生现场绩效。
- 中英文 proposal、HTML、traceability index、evidence summary 和 manifest 同步；不新增外部事实、许可、运营主体、个人数据或官方评分声明。

## v0.5 - 2026-08-10

- Added a bilingual reviewer-visible traceability crosswalk for all ten G0 scenario cards, with applicable agent.4/5/6 tasks, conceptual project families, seven rubric dimensions, and spatial/metric evidence; SCN-03 and SCN-06 are the two cards linked to ordinary-person replay routes.
- Kept the crosswalk explicitly non-scoring and G0-only; provisional geometry, design targets, synthetic replay, and missing field data remain bounded.

## v0.4 - 2026-08-09

- Added a bilingual first-screen executive brief with a five-step ordinary-person acceptance chain: enter/choose, request, take over, appeal/exit, and independently replay before deciding expand/repair/exit.
- Bound each step to visible service, retained evidence, and a fail-closed action; preserved the G0-only concept boundary and did not add permit, operator, budget, partnership, deployment, or performance claims.
- Added an offline ordinary-person journey contract and runner: two existing scenario routes resolve to real package features, five journey steps and five rollback steps cover six acceptance checks, and three negative fixtures stop or return to G0 while an ordinary fixture continues. This remains synthetic structure evidence only.
- Regenerated both offline reports and refreshed package hashes.

## v0.3 - 2026-08-09

- Added a bilingual narrative-level implementation loop that names G0/G1/G2 stages, proposed participating roles, acceptance evidence/metrics, and freeze/withdrawal conditions.
- Linked the narrative to the structured implementation and scenario-operation matrices while keeping all roles provisional and preserving the G0-only, no-permit/no-deployment boundary.

## v0.2 - 2026-08-09

- 按任务书原名重建 agent.4、agent.5、agent.6 的任务映射，并补齐一带候选名、英文命名体系、概念 Logo 方向、文化导视、全球活动与长期运营机制。
- 增加 6 个比较案例的限制表、6 类用户画像、10 张 G0 场景卡、3 个低尺度地标、公共问题贡献簿、组件库、5 个项目族与区域协同关系表。
- 补齐逐资产权利台账、双语逐项配对审校、HTML/PDF 无障碍审计边界和外部背景资料的注册表禁止升级说明。
- 统一 EPSG:4548 面积计算与舍入；绿地概念层以当前 geometry 的单一算法输出，清除旧的 0.464 平方米不一致。
- 重绘五张图、A3/A0 图册和离线看板，明确所有空间动作是概念建议/参考方案，可供专业团队深化研究。
