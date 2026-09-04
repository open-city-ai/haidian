# 方案迭代记录

人字形 The REN Line · 迭代履历

> 本文件记录方案包的版本演进、每次迭代响应了什么反馈、以及仍然开放的问题。全部空间内容始终为概念建议,不构成审定结论。

## v1.9 - 2026-08-23

**引用纹理修正版:响应内部引用质量审计,收窄5处论证偏弱段落+2处引用越界**

**动机**:响应内部引用质量审计(`review/CITATION-AUDIT-20260822.md`)对 `proposal.md`(v1.7正文,121处`[source:]`标签、86个引用事件)的逐点分级——审计结论是全篇83.7%已是论证式、0孤儿源,标签密度与真正的"ren-axis"高分对手(Abreto包,92分)基本持平,不存在系统性问题;真正需要动手的是5类共约14个引用事件(4处装饰式+10处偏弱支撑式中最集中的几处)与另外发现的2处引用越界(`SRC-M13-SPLIT`/`SRC-PREQUAL-2026`的具体细节被源文件未涵盖的措辞覆盖)。本版不改概念、不改数值、不改任何几何/图纸/指标,只做正文引用措辞的收紧与一处结构性改写(参考资料结尾章),全部改写只使用包内既有 `sources.json` 条目,**零新增source_id**。

- **agent.2全球案例·案例2/3/4/5/7零来源问题**:五案例(肯德尔广场、Station F、one-north、Cornell Tech、柏叶UDCK)数字全篇无`sources.json`对应条目,是审计发现的唯一成片证据缺口。本版**不做新调研**(参照`review/REN-AXIS-LESSONS-20260820.md`案例B的纪律,新增资料获取需求另行立项),仅在案例列表前加一句诚实的证据链披露,并给案例1(King's Cross)段落自身补一次行内 `[source:SRC-KINGSCROSS-ULI]`(该来源已注册、已在别处5处正确复用)。
- **参考资料结尾章重写**:仿 `review/REN-AXIS-LESSONS-20260820.md`案例E的三层证据认识论叙事,复用本包"设计依据与资料清单"章已定义的formal任务依据/临时粗略边界/背景论证三级框架,把原来的纯文件路径清单改写为"每层能证明什么、不能证明什么"的说明;结构化文件清单本身逐字保留。
- **两处引用越界收窄**:①"轨道与站城一体化"段(原L289)——`SRC-M13-SPLIT`只支撑"13号线拆分工程(13A/13B)在建",不支撑"清华东路站转正""与15号线换乘"两个具体细节(经GET核实源报道未出现相关字样),已改为把这两个细节标注为"本方案的推断,尚待专项确认";同段`SRC-PREQUAL-2026`只支撑"四象限步行连通"任务,不支撑"站内连通"这一本方案自拟的概念解法,已收窄措辞、拆分两句。②同一处越界在全文另外2处(众智园/原点社区详设章、轨道覆盖率段)重复出现,一并收窄,确保`SRC-M13-SPLIT`全文4次出现口径一致。
- **公共空间包容性验收段标签漂移修正**:`SRC-HD-CENSUS7`(七普人口数据)原挂在"验收人不是设计方,而是五类画像的代表与街道议事会"这句制度设计表述上,与该来源登记用途(学院路街道人口规模)无证据关系,已删除该处误挂标签;该来源在人才画像段的正确用法保留不动。
- **智能线三层架构段引用拉伸修正**:`SRC-AIPLUS-1081`原覆盖"锚点数据按目录制公开,不做人脸识别常态部署"整句,但源文件(京发改〔2024〕1081号)登记范围只到"空间计算先行先试",不含人脸识别相关内容;已拆分两句,标签只保留在源文件确实支撑的半句,"不做人脸识别"改为显式标注为本方案自设的治理约束。
- **背景论证表与公共服务设施段收窄**:`SRC-STATE-AIPLUS`(国务院意见)与`SRC-HD-STATS-2025`(区级人口/GDP统计)两处均属"总纲性引用未落地到具体决策"的偏弱支撑链,仿`REN-AXIS-LESSONS`案例A三段式("引用来源→说清能证明什么/不能证明什么→据此收窄措辞"),分别收窄为"不直接推导本方案具体设计取值"(前者)与"不直接推导三类设施各自的类型/数量/布点"(后者)。
- **三矩阵陈旧数字同步**:compliance/design_depth/standard三份矩阵中26处旧建筑体量口径(243栋/279,251㎡/3,886,869㎡/FAR1.0525/密度7.56%及BF-ID区间)同步为buildings.geojson与metrics.json现行值(248栋/285,551.4㎡/3,953,480㎡/1.0706/7.73%);三重点区分组为非均匀变化(众智园110不变/原点75→81/大钟寺58→57),BF-ID区间随实值重排。
- **validation_claim诚信修正**:`manifest.json` validation_claim由脚手架默认值(data_confidence:"high"、known_blockers:[])修正为如实声明——data_confidence改为mixed_provisional_and_conceptual,known_blockers登记4条外部数据缺口(对应assumptions.json A-BOUNDARY/A-KEYAREA/A-CONTROLS/A-DATA-001),附中英说明注;这与本方案在社区评审中对他人包提出的同类要求(#3725先例)保持一致。
- **英文展示层修复**:`visual/index.en.html` Assumptions板块5条假设由中文残留替换为与proposal.en.md一致的规范英译;`proposal.en.md` Cornell Tech案例删除一处无来源支撑的月份词(December,中文母本无此词)。
- **frontmatter**:`proposal.md`/`proposal.en.md` 的 `iteration` 字段由 `v1.7`(v1.8未触及正文,该字段此前正确地未随v1.8推进)更新为 `v1.9`;详见 `contrib/V19-prep/frontmatter-patch.md` 的版本号判定逻辑。
- **manifest刷新**:`proposal.md`/`proposal.en.md`(正文改动)、`report/proposal.html`/`report/proposal.en.html`(随正文用当前main的`scripts/render_proposal_html.py`重渲)、`self_check.json`(重跑校验)、`changelog.md`(本条目)共6个文件sha256按`scripts/refresh_submission_manifest.py`统一刷新;`manifest.generated_at`同步更新为本次实际执行时间戳。`visual/index.en.html`因Assumptions板块英译修复,sha256一并刷新;`visual/index.html`(中文页)不受影响。三份矩阵文件与`manifest.json`(validation_claim)的sha256同步刷新。`schema_version`保持`0.1.0`不变。
- **双语契约**:全部改写同步给出对应英文改写(见`contrib/V19-prep/modified-*.en.md`),证据标签序列zh/en改动位置逐位对齐;`bilingual_contract_version`保持`"1"`不变。
- 自检:待应用后以当前main校验脚本重跑`validate_local_submission`与`self_check_submission`,预期四门PASS(本次改写不涉及schema、geometry、metrics,不改变既有4条legacy advisory的判定路径)。

## v1.8 - 2026-08-19

**展示层同步与元数据修正版**

**动机**:响应内部 portal/visual 展示通道审计(`review/PORTAL-AUDIT-20260820.md`)发现的两项低成本缺口——①`manifest.json.generated_at` 自 v1.0 脚手架后从未更新,官方列表画廊管线按该字段降序排序,v1.6/v1.7 两轮实质性内容更新后仍被排在"12天未更新"的位置,对评委造成内容停滞的错误印象;②v1.6 新增的 `phasing-plan.png`/`scenario-index.png` 两图已在 `manifest.json` 与 `proposal.md` 正文注册引用,但未镜像进 `visual/assets/` 也未被 `visual/index.html`/`index.en.html` 引用,visual 展示通道图面覆盖率(10图)落后于 `assets/figures` 已具备的水平(12图)。本版不改概念、不新增任何图纸、不改任何既有正文内容,仅做展示层装配与一处元数据字段更新。

- **`manifest.generated_at` 刷新**:从 v1.0 遗留值 `2026-08-07T16:52:50Z` 更新为本次改动实际执行时间 `2026-08-19T16:05:35Z`;该字段是官方列表画廊管线(`scripts/generate_submissions_data.py` → `submissions-data.js`)按日期降序排序的排序键(已读源码确认),不在文件级 sha256 校验范围内,单独更新不影响哈希链。
- **`phasing-plan`/`scenario-index` 图装配进 visual 通道**:两图(各含中英,共4张 PNG)从 `assets/figures/` 原样复制到 `visual/assets/`(与 `key-area-*` 系列已有镜像模式一致,复制后字节与源文件逐一 sha256 核对 MATCH,不重新生成);`visual/index.html`/`visual/index.en.html` 分别在"分期实施"/"Phased Implementation"章 h2 后插入 `phasing-plan(.en).png` 的 `<figure>`,在"AI 场景节点"/"AI Scenario Nodes"章 h2 后插入 `scenario-index(.en).png` 的 `<figure>`,套用页内既有 `<figure><img><figcaption></figure>` 模式,中英各插入2处、逐位对称;BeautifulSoup 解析确认新增4个 `<img src>` 全部可在 `visual/assets/` 目录下落地解析,无断链。
- **manifest 新增4条 `visual_asset` 条目**:`visual/assets/{phasing-plan,scenario-index}{,.en}.png`,`role` 与既有 `key-area-*` 镜像条目一致(`visual_asset`,`required: false`);连带用当前 main 的 `scripts/refresh_submission_manifest.py` 统一刷新受影响文件 sha256(含新增4条,以及因插入图引用而改动的 `visual/index.html`/`visual/index.en.html` 两份);`schema_version` 保持 `0.1.0` 不变,未设置 `readiness_contract`(与 v1.5-v1.7 一致)。
- 自检:当前 main 校验脚本下 `validate_local_submission` 与 `self_check_submission` 四门全部 PASS;双语契约检查通过(证据标签序列 zh/en 与 v1.7 基线完全一致,未增未减);详见 `contrib/V18/VERIFICATION.md`。

## v1.7 - 2026-08-19

**评审通道图像完整性与展板可读性修复版**

**动机**:响应内部红队预演(`review/RED-TEAM-20260819.md`)发现的具体缺口——官方"专家离线评审包"工具(`export_review_packet.py`)按 `proposal.md` 正文顺序原样内嵌 `![]()` 引用的图片渲染给人工评委,A3/A0 图纸本身不会被这条通道读取;而"总体概念与命名体系"(agent.1)整章此前零图像引用,是评委经这条通道阅读时唯一读不到图的正文主章。同时响应展板专项审计(`review/A0-AUDIT-20260819.md`)对 A0 展板的"3秒测试"不及格判定、A0内嵌位图仅~100dpi的实测瓶颈,以及 v1.6 新增的分期图/场景索引图未传导到 A0 的缺口。本版不改概念、不改任何既有图纸的构图与配色、不动 `tools/gen_drawings.py` 的 A3 生成代码。

- **评审包通道图像修复**:`proposal.md`/`proposal.en.md` "总体概念与命名体系"(agent.1)章内,紧贴"总体空间结构为一撇一捺一顶点"段落后各插入一行既有图引用(复用 `site-overview(.en).png`,该图已在"设计依据与资料清单"章出现,此处按内容对应重复引用,不新增图像资产);中英各增 1 行,逐位同步,证据标签序列不变。核查确认"分期实施地图→phasing-plan.png"与"场景章→scenario-index.png"两处 v1.6 已插入到位,本版无需重复处理。
- **A0-1 总览板重设计(3秒测试)**:人字形主意象由"页顶3%宽小logo"放大为版面视觉锚点——复用既有 `ren_mark()` 抽象标记逻辑(未新建PNG资产、未改动5张既有正式图纸),尺寸/线宽显著放大(横向占页面宽度约3%→约15%,线宽约×2.4~2.6倍),置于品牌区与内容区之间的独立醒目位置,并标注"一撇·记忆线/一捺·智能线"双语小注;`site-overview.png`/`key-areas.png` 两行相应收窄(高度约0.39→0.28页面分数)但保留完整,30秒读结构的信息链未被削弱。`scenario-index.png`(v1.6产物)以窄高比例插入嵌入 `key-areas.png` 行右侧新增小图列,首次上A0板。
- **A0-2 系统板重设计(文字密度)**:面板标题字号提升(21/20pt→24/22pt);每行由"读图要点标题+4条项目符号+免责声明"精简为单条最具信息量的要点(原4条项目符号选其一,不改写原文措辞、逐字取自既有文案),免责声明由每行重复改为页尾单条共享;文字块由实测29个降至12个。同时新增第5行 `phasing-plan.png`(JZ-2026-11,v1.6产物,此前未上A0),行距/图框高度按比例收窄以容纳新增行。
- **A0 内嵌位图 dpi 100→150**:定位到 `tools/gen_drawings.py` 的 `page()` 函数——A0/A3 共享该函数创建 matplotlib figure 时未显式传 `dpi`,统一沿用 rcParams 默认 100dpi 在嵌入 PDF 时重新采样图片,与源PNG本身150dpi无关(根因见 `review/A0-AUDIT-20260819.md` 第3节复现实验)。修复方式:给 `page()` 新增可选形参 `dpi=None`(不传即保留原行为,A3 全部调用点未改、行为不变),仅在 A0-1/A0-2 两处 `page()` 调用显式传 `dpi=150`。`pdfimages -list` 实测:A0 内嵌位图 x-ppi/y-ppi 由 100/100 提升到 150/150。目标值定为150而非审计建议的"200左右":150为 `gen_figures.py` 源PNG的原生dpi(`new_fig()` 用 `dpi=150`),150已是"不丢失源信息"的上限,200会对150dpi的源像素做无意义插值放大且体积更大;实测改为200会使提交包总体积(38.3MB→约41MB)超过 `validate_submission.py` 的40MiB硬限制(`MAX_TOTAL_BYTES`,已实测触发 `changed files total ... exceeds 41943040` 错误),150在体积与清晰度之间是当前约束下的可行折中,如实记录未采纳200的原因。
- **A3 回归验证**:`tools/gen_drawings.py` 的 A3 生成代码段本身未改动一行;曾用改动后的脚本重渲 A3 验证页数与内容,确认中英均保持 16 页、`cmp -l` 逐字节比对显示仅 PDF 内部 `/CreationDate` 时间戳(4字节,位于文件尾部 trailer)与 v1.6 不同、其余字节相同;为避免这一与代码改动无关的时间戳差异被计入本次改动的文件体积与diff,最终提交物保留 v1.6 原始 `a3-booklet(.en).pdf` 字节(sha256 与 v1.6 完全一致),不采用重渲后的副本,确认 A3 零回归。
- **manifest 刷新**:`drawings/a0-boards(.en).pdf`(中英各1份)因 A0 重设计与 dpi 提升重渲,体积从约3.06/3.14MB增至约4.04/4.20MB;`drawings/a3-booklet(.en).pdf` 保持 v1.6 原始字节不变;`proposal.md`/`proposal.en.md` 各新增1行图引用、frontmatter `iteration` 由 `v1.5` 更新为 `v1.7`(此前 v1.6 未同步更新此字段,一并修正);`report/proposal(.en).html` 随 `proposal.md`/`.en.md` 改动用当前 main 的 `scripts/render_proposal_html.py` 重渲;`manifest.json` 用当前 main 的 `scripts/refresh_submission_manifest.py` 统一刷新受影响文件 sha256;`schema_version` 保持 `0.1.0` 不变;未设置 `readiness_contract`(与 v1.5/v1.6 一致,避免把既有4条 legacy advisory WARNING 升级为阻断 ERROR);提交包总体积由34.5MB增至约36.5MB,在40MiB硬限制内(margin约3.5MB)。
- 自检:当前 main 校验脚本下 `validate_local_submission` 与 `self_check_submission` 四门全部 PASS;双语契约检查通过(证据标签序列 zh/en 完全一致);详见 `contrib/V17/VERIFICATION.md`。

## v1.6 - 2026-08-19

**图面增强版:响应图面可读性审计,补齐显示面必填项**

**动机**:响应 issue #2955 对图面可读性的批评方向("场景卡是没意义的东西"“文字替代空间”),并对照内部图面审计(`review/FIGURE-AUDIT-20260819.md`)与展示面情报(`review/SEPT-INTEL-20260819.md`)补齐两项此前缺失的显示面必填项(`risk.json`、`manifest.cover_image`)。本版不改概念、不改既有5张正式图纸的构图与配色,只做增量标注与全新补充图。

- **道路真实路名标注**:在 `site-overview`/`key-areas`/`mobility-bluegreen` 三图(中英共6张PNG)上,取 `roads.geojson` 中10条"现状参照"道路,按可见范围与文字实际字宽做避让式标注(中文用简称、英文用拼音),自建避障算法与已放置标注互相让位,避免与站名、重点区编号徽标重叠;拥挤处按净空不足自动跳过而非强行压字。三图五道口—学院路一带最终中文标注8/10条、英文标注视文字宽度略少,均如实以算法结果为准,不手工凑数。
- **分期实施地图(新增 JZ-2026-11)**:按 `phasing.geojson` 的三期几何,套用本包既有蓝图绿色系(`#2F6B50`/`#3E8663`/`#5FA083`)三级色阶绘制 `phasing-plan.png`(中英),标注 PH-1/2/3 期号,图例含年份(近期2026-2028/中期2028-2031/远期2031-2035,与 proposal.md 分期段落逐字一致)与阶段门摘要;`gen_drawings.py` 在 A3 图册"实施与运营"页(原 P14)后插入该图新页(中英 PDF 均为 16 页,原风险合规页顺延为 P16)。
- **12场景卡定位小图(新增)**:`public_space.geojson` 中已有 `layer=SCENARIO_NODE` 的12个场景锚点真实坐标(非质心近似),据此绘制 `scenario-index.png`(中英),嵌入 A3 图册场景卡页(原 P13)右侧新增小图列(卡片本身仅按比例收窄、文字内容未改动);同图追加到 `proposal.md`/`proposal.en.md` 场景表之后。
- **P2 概念页缩略图**:复用已有 `site-overview.png`(未新生成图像),以缩略图形式插入 P2"一句话方案"框内既有留白处,中英 A3 同步。
- **`risk.json` 新增**:据 proposal.md 风险登记册 R-01~R-09,按 `schema/risk.schema.json` 归并为8个维度(`policy_uncertainty` 合并承载 R-01+R-04,其余 R-02/03/05/06/07/08/09 各占一维,原文各条款均以"(R-0X)"标注在 note 字段中保留可追溯性),写入包根并在 `manifest.json` 注册(`role: risk_matrix`,参照同 schema_version 0.1.0 的 `budoyh/jingzhang-168` 包用法)。
- **`manifest.cover_image` 新增**:复制 `site-overview.png` 为 `assets/media/cover.png`,`manifest.json` 顶层新增 `cover_image` 字段并在 `files[]` 注册(`role: media_poster`,参照 `budoyh/jingzhang-168` 包格式)。
- **正文小改**:`proposal.md`/`proposal.en.md` 场景表后与分期段落后各插入一行新图引用(合计4行,含中英各2处),格式与既有图引用一致;证据标签序列未增未减。
- **报告与manifest重渲**:用当前 main 的 `scripts/render_proposal_html.py` 重新生成 `report/proposal.html`/`report/proposal.en.html`;`visual/index.html`/`visual/index.en.html` 引用路径未变,内容未改动,但其对应的 `visual/assets/{site-overview,key-areas,mobility-bluegreen}{,.en}.png` 6个副本随改动图同步刷新(此前发现这6个副本是独立文件而非同一路径,不同步会导致 visual 画廊仍显示图面增强前的旧图);`drawings/*.pdf` 中英各2份因新增图册页与图面变化全部重渲;所有改动/新增文件 sha256 按 `scripts/refresh_submission_manifest.py` 统一刷新;`schema_version` 保持 `0.1.0` 不变,未设置 `readiness_contract`。
- 自检:当前 main 校验脚本下 `validate_local_submission` 与 `self_check_submission` 四门全部 PASS;双语契约检查通过(证据标签序列 zh/en 完全一致);详见 `contrib/V16/VERIFICATION.md`。

## v1.5 - 2026-08-16

**风险、资金与规则化治理的正文深化**

**动机**:响应评审反馈中反复出现的三类关切——风险披露停留在原则层、实施章几乎不谈资金闭合、治理承诺缺少"什么情况下必须停"的规则化表述。本版不改概念、不改数值、不加交付物品类,只把这三类内容以成段插入与小节扩写的方式补进 `proposal.md` 正文,并同步等义英文。

- **风险章新增「风险登记册」**:九类风险(边界与数据缺口、隐私与数据治理、公平包容与数字鸿沟、文保与风貌、权属与实施协调、交通测试与人身安全、资金与运营可持续、场景失效与运维、治理公信与叙事)逐类登记四个字段——触发条件 / 缓解 / 退出 / 残余风险。残余风险为必填项,如实写出无法由本方案消除的部分。
- **场景章新增「十二张卡的逐卡风险注记」**:每张场景卡一行,写明本卡最主要的一类风险、触发条件与"触发即停"的否定条件;与既有「治理四件套」表配套,不新增场景卡、不改动既有表格。
- **实施章新增「资金机制」节**:分期概算逻辑(只说概算应当怎么组织,不给造价与投资测算)、资金来源三档分档表(财政与政策工具 / 社会资本 / 运营自平衡,每档附使用边界的否定条件)、四个资金调节阀(顺序、比例、退出、公开),以及与阶段门的接口。**全节为概念层表述,不预设金额、不构成政府资金承诺,政策适用性一律标注待官方条件确认。**
- **指标章新增「指标主张的使用边界」**:八条否定条件式规则,明确本方案的数值不得被拿去做什么(未经官方红线确认不得用于法定用途、校验值不得被引用为强度诉求、unknown 项不得赋值、版本号不一致的数值不得混用等),不预设任何新阈值。
- **公共空间章新增「包容性验收」**:七处公共空间节点开放前的四条走查线路(轮椅与婴儿车 / 视障与听障 / 老龄与适老 / 无智能终端),仅当无障碍验收通过方可开放,并如实写出走查覆盖不到的残余风险。
- **另新增两处小节**:更新项目清单后的「清单的读法」(按是否新增建设量分组、依赖条件为硬前置、与登记册的对应关系),运营 KPI 表后的「阈值、停用与风险的公众参与接口」(议定—触发—复核三步)。
- **正文增量**:`proposal.md` +132 行 / +8,960 字符(47,810 → 56,770 字符);`proposal.en.md` 逐段等义对译 +132 行,证据标签逐位对齐(322/322 序列完全一致)。**未删除任何既有内容,未改动任何既有证据标签、任何指标数值、任何几何与图纸,未新增交付物品类。**
- **报告重渲**:用当前 main 的 `scripts/render_proposal_html.py` 重新生成 `report/proposal.html` 与 `report/proposal.en.html`。修复英文报告中 301 处中文证据角标残留(`来源/标准/深度/空间数据/指标`),现全部为英文标签(`Source/Standard/Depth/Spatial data/Metric`),英文报告内证据角标的中文残留归零。
- **manifest**:所有改动文件 sha256 按仓库字节刷新;`schema_version` 保持 `0.1.0` 不变,未设置 `readiness_contract`(避免在 `self_check.json` 门 ID 未同步的情况下把既有 4 条 legacy advisory WARNING 升级为阻断性 ERROR)。
- 自检:当前 main 校验脚本下 `validate_local_submission` 与 `self_check_submission` 四门全部 PASS;双语契约检查通过。

## v1.4.3 - 2026-08-11

**文保保护范围示范性补登**

**动机**:响应 issue #1774《约束数据源索引》——该索引把 `HERITAGE_PROTECTION` 评为六类约束中唯一「高可操作」的一类,理由是保护范围四至被逐处、以文字形式主动公开。本版把这条结论从索引落成可复核的实例,验证「文字四至 → 推定面」这条路径能否被第三方独立复现。

- **新增 1 个 `HERITAGE_PROTECTION` 要素**(`geometry/constraints.geojson`,既有 7 个要素逐字节未动,只做追加):`CN-HP-01` 平绥西直门车站旧址 · 保护范围(1)子区(站房 J01 / 过街天桥 G01 / 西雨棚 J03),7,069.7 ㎡,完全落在 SITE-001 设计范围内。第十一批北京市文物保护单位(京政发〔2025〕3 号)。
- **`geometry_role: provisional_constraint` / `official_boundary: false`**,是本包第一次用 `provisional_constraint` 承载文物保护范围。(说明:该枚举值已有其他投稿包在文保层使用——45 包随机抽样中有 2 个;本次的不同之处不在枚举值,而在几何来自官方公布的**文字四至逐字转译**并附完整复核链,而非位置示意。)
- **可复核性写进 properties**:逐字保留四至原文(`boundary_text_verbatim_zh`)、公布文号、北京市文物局详情页 URL 与访问日期(2026-08-11)、转译方法与偏移量、锚点出处(OpenStreetMap way id,ODbL 1.0 署名)、误差量级,以及「几米级误差,不得用于任何法定用途;官方矢量/图纸公布后必须整体替换」的声明。
- **如实登记未转译项,不硬登**:清华园车站旧址(四至同样公开)在 SITE-001 之外约 1,261 m,虽落在统筹研究范围内,按最小改动面原则本次不登入,转译草稿已留档待场外参照口径明确后再议;恩佑寺山门、恩慕寺山门距 SITE-001 约 3,620 m 且在统筹研究范围外,不登入;平绥西直门车站旧址保护范围(2)—(6)五个子区本体轮廓无可查证坐标,不转译、不外推;`CN-HP-01` 西界因西雨棚(J03)无可查证坐标改自 J01 西墙起算,已在 `derivation_method` 标明该侧为保守内缩、系统性偏小 10—20 m。
- **附带自查发现(本版未改动,如实记录)**:本包既有三处「位置近似」文保示意要素与按 OpenStreetMap 核实的位置存在偏差(约 695 / 1,350 / 1,509 m)。三者原已标注「位置近似,以文物部门公布为准」,本版不做订正,留待与官方矢量一并处理,避免在无官方依据时二次外推;此与 issue #1029 记录的上游临时边界偏差同源。
- 自检:最新 main 校验脚本下 validate 与 self_check 全部 PASS;`spatial_review` 不读取 `constraints.geojson`,本次追加不触发任何空间检查项变化;`metrics.json`、`proposal.md`、图纸与 visual 均未改动。

## v1.4 - 2026-08-10

**空间深度包**(PR #1042)

**动机**:入库评审(Review Agent 76/100)后自查,方案"机制强、图面浅"——重点区只有索引图、无断面、用地为程序化条带。本版正面补足空间深度,并主动签署双语契约。

- **用地重构**:85 个程序化条带 → 140 个贴合真实街廓的用地单元。切割体系从"轴线缓冲+纬度横切"升级为叠加 17 条现状道路参照线(6 条东西向+11 条折线,全部标注 `agent_inferred_from_public_data` / 位置近似);拓扑保持零缺口、零重叠,覆盖缺口 0.0 ㎡。
- **10 张深度图纸(中英)**:三处重点区分幅详图(JZ-2026-06/07/08,含分幅索引、组团逻辑、现状参照、实施风险)、三概念断面(JZ-2026-09:缝合线三通行带 3.5+2.5+1.5m、绿廊界面退台与"行道树冠线天空开口"判读线、大钟寺站城连通三层关系)、三大朝圣地标概念轴测(JZ-2026-10:换向台缓坡道 1:11 无障碍+陡台阶双流线、新站匾墙 3×8 匾阵、K.P.0 里程碑阵)。A3 图册 10→15 页,visual 新增深度图纸章节。
- **新增 12 项指标**(全部 EPSG:4548 程序化复算并在正文挂签):绿廊 500m 服务覆盖率 90.7%、轨道站 800m 覆盖率 54.8%(如实注明北端待 13 号线扩能改善)、缝合线平均间距 1,080.8m、三重点区分项概念 FAR 与建筑密度、记忆线长度、设计路网长度、平均地块面积等;指标总数 38→50。
- **正文**:新增"一页结论"(评审关切×证据索引);三处重点区小方案扩写(现状参照/组团逻辑/实施敏感点逐条化)、八案例机制细节实化、运营会员分档与首届峰会概念日程、场景间"喂给关系"成段;指标38→50项全量挂签;区域协同扩写(AI 北纬社区错位分工、三城联动、亦庄示范区政策同源、京张高铁—张家口算力枢纽的"百年前运煤、今天运算力"呼应);智能线"感知—算力—服务"三层架构;证据密度按 v2 规则整改(块内≤8、连排≤3)。
- **双语契约**:frontmatter 声明 `proposal_format_version: "2"` + `bilingual_contract_version: "1"`,自愿把双语等义从建议升级为对本包的阻断性检查。
- 自检:最新 main 校验脚本下 self_check PASS / formal-review-ready,四门全过。

## v1.3 - 2026-08-09

**中文润色 + 完整英文对应件**(PR #989)

**动机**:响应社区复核(@147228)"若目标是双语公开展示,建议补齐英文对应件"的提醒;同时完成全文去翻译腔修订。

- `proposal.en.md` 全文等义译稿(证据标签与中文版逐位对齐,121 处),`report/proposal.en.html`、`visual/index.en.html`、5 张英文图纸、英文版 A3/A0;术语遵循 `docs/terminology-glossary.md`。
- 中文正文 36 处语言修订(欧化句式清理),程序化验证标签计数逐类一致、数字零变动。
- 三个生成器(figures/visual/drawings)双语化改造,中文产物逐字节回归不变。

## v1.0 - 2026-08-08

**首版正式包**(PR #678)

- 总概念**人字形 The REN Line**:一撇=下行·记忆线(已建成 9km 遗址公园绿廊,只做运营叠加不重复设计),一捺=上行·智能线(算力/数据/机器人路权/空间计算叠加廊道),顶点=AI 原点社区换向站;众智园/大钟寺双机牵引;总体理念响应人民城市理念,"现代化人民城市六维"对位六项 agent 任务。
- 完整正式包:proposal.md 十三章、9 层 GeoJSON(用地全覆盖分区)、35 项指标、三矩阵(23 任务/6 标准/15 深度项)、36 条来源逐条注明机构/日期/URL、6 条假设、5 张图纸、A3/A0、离线 visual。
- 维护者入库决定:Review Agent 76/100,强制拒绝检查与四道本地门全部通过。

## 对社区反馈与自查问题的响应记录

- **@147228 两次 exact-head 复核**(#678):双语建议 → v1.3 全量补齐;provisional 口径确认 → 全文保持"临时边界不升级为官方红线"表述。
- **自查发现上游数据疑点**(制作 JZ-08 分幅详图时):provisional_boundaries.geojson 中大钟寺重点区多边形质心落于北京北站一带,距大钟寺地铁站约 2.26km → 已复算并提交 **issue #1029** 供维护者核实;修正前本包 JZ-08 以"图外指向"如实表达,正文与图注注明;官方修正后全部面积类指标可由生成脚本一键重算。
- **上游工具与文档回馈**:参与迭代过程中踩到的重复 finalize 哈希基线问题 → 提交 `--refinalize` 补丁(PR #1043,含 208 行测试);全流程经验整理为《参与者迭代指南》(PR #1044)。

## 开放问题

1. 官方精确红线与三重点区边界:待发布;发布后重算全部面积类指标并出 v1.5。
2. issue #1029(大钟寺 provisional 边界):待维护者确认;结论无论哪个方向,本包按官方口径跟进。
3. 街区控规获批(2026 年内预期):获批且公开后,开发强度章从"概念测算+待确认"升级为对照校核。
4. 轨道站 800m 覆盖率北端缺口:13 号线扩能工程(13A/13B)通车时间官方未公布,覆盖率将随之改善,指标保持如实。
