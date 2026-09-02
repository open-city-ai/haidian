# Change log

## v0.8 - 2026-08-31（官网合规最终装配＋PR #4300 评审闭合）

- 以 2026-08-31 Work 完整 formal 包为展示基线：纳入最新版 proposal、英文镜像、高清图片、A3/A0 与 18 页中英补充展示；不改 geometry、canonical SCN 或指标值。
- 增补 PR #4300 评审显影层：三大定位、五大功能、三区两翼、8 要素生态/产业—空间图谱、区域协作、品牌/Logo 方向、三类地标、荣誉/组件/文化导视、Agent.6 RACI、P01–P10＋12 SCN 统一运营责任矩阵与人才/企业转换路径。
- 中文 report/visual 改为离线 CJK fallback：主层由 Ubuntu/Debian `fonts-noto-cjk` 的 Noto Sans CJK SC Regular（SIL OFL 1.1）按本方案实际可见字符生成并改名为 `Youmen CJK Review Subset`，另保留两份仓库内已公开分发的 OFL 子集作次级 fallback；不依赖 CDN 或评审机系统中文字体。
- 外部协作、资金、运营主体、点位与专业深化继续标为 design proposal / proposed / unknown，不新增已落实承诺。
- `self_check.json` 保持原内容；新 head 的重型 spatial / visual / professional gates 由 GitHub trusted `submission-validation` 复跑。

## v0.7 - 2026-08-30（提交身份闭合与正式门前装配）

- 依据已认证 GitHub 会话，将投稿目录与中英文 `author_github` 从可逆占位符迁移为 `Alisaway`。
- 保持 N7-1f v0.2 的 geometry、P01–P10、12 个 canonical 场景、双语 A3/A0、五张核心图及全部设计判断不变。
- 清除仅与身份未定、未运行持久化自检有关的阻断记录；官方精确红线缺失继续由 provisional 标记、assumptions 与整体复算机制诚实披露，不作为伪阻断。
- 重新生成双语 proposal HTML、刷新 manifest 哈希，并在四门全部通过后写入持久化 self-check。

# 方案迭代记录

## v0.6 - 2026-08-27（N7-1f 三条生活回环丰肉修订可审候选，未重新冻结）

- 以 N7-1e 冻结版为只读基线，增加三条生活回环阅读层：游客从主动开启、落地前任务包、到站安顿、公共体验到回住处／离城与关权；本地商户、青年与银龄劳动者从真实需求、开放服务卡、逐单私人匹配到常规服务、复杂复测培训与能力回流；智慧课堂从轻量当日任务包、具名接责、真人实体交接、课后站明确接收到家庭接回与关权。
- 新增双语京张三区逻辑回环图：大钟寺、AI 原点、众智园形成闭合关系，中心留空；京张仍为非中央公共接口带，`SCN-JZ-03` 只作为断电／屏幕退出异常分支。图不表达位置、距离、路线、边界或 official geometry。
- A3 双语文册改为八页总—分—总：P1 总题眼，P2 地与证据，P3 游客，P4 本地经济，P5 家庭与孩子，P6 夜晚／照护／异常，P7 三区总收束，P8 落地与证据门。A0 保持 N7-1e 字节不变。
- 三条生活回环只作为既有 P01–P10、12 个 SCN 与五个 canonical LOOP 的叙事叠加层；未新增或改写 P／SCN／LOOP ID，也未改 DZS-02 的 P08／P09 映射、JZ `interface_only` 角色或 P11 未激活状态。
- “约 30%／70%”只保留为讨论中的情景原型，不写作既定政策、固定补贴比例、预算或运营承诺；商户、岗位、订单、收益、运营者与服务成效均保持待验证。
- 本轮未改 geometry、Git、身份、`agent.json`、`self_check.json`、`manifest.json`、`package_state=scaffold`、结构化证据或 A0；状态为 `REVIEW_CANDIDATE__NOT_REFROZEN`，审后仍须另立人类决定方可重冻或进入提交流程。

## v0.5 - 2026-08-26（N7-1d 场景显影与全包重生工作副本）

- 从 N7-1c v0.2 的只读基线建立独立 `worktree_n7_1d`；未覆盖 N7-1c，未执行 Git 操作，未移动 `pending-github-id`，也未提前改变 `package_state=scaffold`。
- 精确挂载并锁定 N3 v0.1、N2-B v0.1 与六个场景原始包；10/10 ZIP 均通过 SHA-256 与 CRC。12/12 场景可追溯，28/28 个现有原始文件逐文件锁哈希；8 张具备原始 machine+ZH+EN，SCN-ZZY-02/03 与 SCN-DZS-02/03 保持原始 ZH-only 缺口，不以 N3/N6 派生桥替代原始来源。
- 新建 `data/processed/scenes/scene_cards.normalized.v0.1.json` 作为 12 场景唯一显示源；保持 DZS-02 仅 P08/P09、JZ 为 `interface_only`、全部 metric 值为 null、全部 `card_ready=false` 与 `formal_ready=false`。
- 从该单一源重生双语 `key-areas` 证明图、proposal、report 与 visual 的四组场景入口；三区各 3 张，京张 3 张明确为跨区公共连续性接口层而非第四重点区。
- 施工中发现 `key-areas.en.png` 曾被后续直写截断为 196,673 B；坏字节与完整图前缀逐字节一致，属于写入中断／竞争类事故而非内容漂移。builder 已改为同目录临时文件、完整解码与 `<5 MiB` 合同校验、`fsync` 后 `os.replace` 原子提交；最终恢复为 422,059 B、SHA-256 `d66a23f5ed4be4749d8e4e676c64c9fcac49cbf4d8712cd206d3bd145ab06c95`，且无临时 PNG 残留。
- 删除旧英文重点区图的固定像素遮罩、坐标元数据和“遮罩必须存在”验证条件，改为新源图 SHA、嵌入、页码、裁切与旧遮罩零残留反向校验。
- 全量重生 18 个 live-text SVG、4 份 PDF、18 页 QA 与联系表；双次重建 PDF 字节稳定，字体覆盖、PNG CRC/解码、嵌入关系和旧遮罩零残留均通过独立证据校验。
- 11.4 km² 母图进入 `MATCH_GEOMETRY_EXACT__BYTE_DIFFERENT_FORMAL_SCHEMA_DERIVATION` 分支：68/68 非空要素 geometry 一致，9/9 submission geometry 文件相对 N7-1c 零漂移；根目录工作母图采用已裁决的正式 schema 派生字节。
- review feedback 已拆分为 `current_required_repairs` 与 `conditional_follow_ups`。原始来源深度、现场／机构／专业证据、official geometry 与已验证 GitHub login 均保持条件性后续，不冒充本轮可修或已闭合事实。
- 经用户批准，以最小披露的 agent preview 挂载 6 个公开页面与 10 张既有图件；原子 PNG 与可见标题修复后，Chrome 桌面／手机完整 12/12 复跑通过，应用页面 0 error/warn、0 blocking、0 major。早先的 URL 环境阻断及历史 checkpoint 仅作过程证据；最终复验不建立新 checkpoint，以保持不碰 Git。
- 身份、合法目录、持久化 self-check 与 official finalization 尚待人类提供已验证 login 和当前官方工作树，因此本轮内容冻结不改变 `package_state=scaffold`，不声称提交 ready。

## v0.4 - 2026-08-25（N7-1b 工作副本）

- 将首页前三分钟改为同一普通家庭的 `15:30` 真人交接探针与 `21:40` 停电回家探针，先呈现真实空间问题、证据门与 P04/P05/P06/P10 首期工作包，再进入三层范围与完整系统。
- 登记园所级时间证据门：`15:30` 不是北京或全国幼儿园典型放学事实；目标园所当期作息、错峰、延时服务与接送／滞留责任在取得具名、同周期证据前均保持 unknown。
- 登记 D1 的 35 个对象／40 个 concept target 字段和 FAR、建筑高度、建筑密度、法定绿地率、退界五项 statutory unknown；未修改 geometry 坐标、拓扑、feature ID 或 official 状态。
- 修复重点区双语图件叠字及英文图件标题／底注截断，并重新生成双语 proposal HTML。
- 历史 A3/A0 仅有派生 PDF，当前又缺完整 CJK 字体；因此四份 PDF 原字节保留，另建可追踪双语源合同与阻断记录，不声称已经植入 P1。
- `pending-github-id`、`validation_claim.self_checked=false`、`spatial=not_run` 与 `formal_review_ready=false` 保持不变；本副本不提交、不推送。

## v0.3 - 2026-08-24

- 在官方 main commit `37f5541dfab74d7f89aa0f57bf1c64ab542b036b` 的真实 formal scaffold 上迁入 N5.2/N6 已审内容。
- 将 canonical proposal slug 统一回 `youmen-city`；GitHub PR author 仍保持占位，禁止在身份确认前提交。
- 按当前契约迁移 metrics、design-depth、risk、constraints、visual 与 bilingual manifest。
- 保留 P01–P10、12 张 canonical 场景、五套城市网络和 provisional geometry 的原有设计判断。
- 当前工作树继续接受 current-main render、finalize、four-gate self-check 与 participant preflight 验证；外部身份、真实 Git worktree 和依赖环境另行解锁。

## v0.2 - 2026-08-22

- 合并两份 N5.1 分叉包并完成 N6/N5.2 内部修复。
- 保留中英成对图件、HTML、A3 文册与 A0 展板。
- 修复 tracks、官方 scenario IDs、英文正文残余中文与双语图纸空版问题。
- 当时仍保持 `package_state=scaffold`，尚未接入 current-main 官方脚本。

## v0.1 - 2026-08-21

- 建立三层范围、P01–P10、12 张场景、空间图层、来源、假设、指标和风险的第一份正式形态工作包。
