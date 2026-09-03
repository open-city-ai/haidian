# 方案迭代记录

## v2.3 - 2026-09-01 （直接 staging 修订，保持 Draft）

- 英文可视化页重建为完整证据页：与中文页对齐覆盖范围、品牌、12 个对标案例、八要素机制、三节点、三类地标、荣誉与组件、六类 persona、10 张场景卡、3 个产业测试协议、用地、慢行蓝绿、分期、开发者社区、转化路径、指标、来源与假设；页面加入 `data-metric` / `data-value`，保持离线相对路径且不含功能性中文。
- 补齐 `assets/figures/logo.en.png`；重绘中英文用地结构与核心指标图，显示值统一约数（1401 ≈ 27.3%、场地约 1,141 ha、绿线约 11.0%、公共空间约 0.45%），机器精度只留在 `metrics.json` 与英文页 `data-value`。
- 统一 20 张 PNG 图件页脚：来源说明与 provisional / 临时概念边界 badge 分成独立行，留出明确间距；英文品牌板去除功能性中文并修复文本包围盒越界。
- 由修订后的双语图件重排 `a0-boards[.en].pdf` 与 `a3-booklet[.en].pdf`，四份均为 2 页，采用相同 2×2 图件网格，复核标题、图框、页脚 badge 与 A0/A3 页边界。
- 本轮仅写入本 staging；未修改 canonical、未 push、未转 Ready；项目检查仅做结构/门禁/视觉复核，不替代 CocoSgt 评审或评分。

## v2.2 - 2026-08-31 （定向响应 CocoSgt review 5049241992，保持 Draft）

- 用地口径统一：按 `geometry/land_use.geojson` 的同一 `land_use_code` 在 EPSG:4548 下聚合；27 个区块归入 7 类且合计 100.0%，移除误导性的“1401=22.7%＋其他4.6%”表述，新增 `land_use_1401_area_sqm` 与 `land_use_1401_ratio`（机器值保留在 metrics，图文展示约 27.3%）。同步 proposal 中英、metrics、assumptions、design-depth matrix、HTML 与双语用地结构图说明。
- A3/A0 图纸进入重排：首页标题改为独立安全区，信息卡下移并避免标题与右上框相交；中英页均保留一亮/一演/一市、夜间公共利益、AI 人工复核与可停用治理、48 小时撤收和 7 日公示边界。

## v0.1.0 - 2026-08-24

- Initial assembly (concept package) for night-economy-lightscape.
- Initial concept narrative assembled with declared AI-agent authorship; subsequently edited for structure.
- Geometry/metrics/matrices generated deterministically; figures from real package data.
- Valroot gates run on 2026-08-24 (results persisted in self_check.json).

## v2.0 - 2026-08-25 （REPAIR ROUND-2，响应 CocoSgt 2026-08-24 CHANGES_REQUESTED）

- 双语合同 v2 补齐：新增 7 张英文图（site-overview/land-use-structure/key-areas/mobility-bluegreen/metrics-evidence/regional-cooperation/brand-vi 的 .en 版）、A0/A3 英文 PDF、report/proposal.en.html 与 visual/index.en.html；proposal.md 声明 bilingual_contract_version=1 与 translation_file=proposal.en.md；proposal.en.md 前页声明 language=en、translation_of=proposal.md；manifest.json 全部 en 条目登记 language=en+translation_of；中英实质等值已人工核对（proposal.md ↔ proposal.en.md 逐节对译）。
- 字体：四个 HTML 页面经 embed_fonts.py 内嵌 Noto Sans SC 子集（zh 页 136—227KB），check_font_coverage.py 全部通过；图件与 PDF 均采用内嵌字体，消除方框字形。
- 图件重绘（figsize 12×8 / 150dpi，标题≥18pt、标注≥13pt、constrained_layout）：总体图、慢行蓝绿图（与总体图分层差异）、三节点三面板详细图、指标图（三项 formal 指标分轴、就近取整）、用地结构图（唯一口径）；新增区域协同接口图与品牌 VI 图板；全部含图例/比例尺/指北针（空间图）及中英双语 PROVISIONAL 印章；ink 覆盖：地图/示意图≥0.08、图表≥0.10（PIL 校验通过，key-areas 由 0.010 提至 0.97）。
- A0/A3 图纸重排：A0 双页高密度排版（首页标题 72pt，含三层范围、一亮一演一市、五项机制与核心指标卡；次页含三节点图、指标图、用地口径、分期/RACI/成本/监测摘要），A3 双页对应紧凑版；均含字体子集与 PROVISIONAL 印章页脚；A3 首屏品牌名统一为 NIGHT·JZ（移除历史遗留的 CMP.JZ/Job 字样）。
- 实质成果补齐：
  - agent.1：新增「品牌与视觉识别」章节 + logo.png + brand-vi 图板 + 品牌在先权利与使用边界声明（内部工作代号，检索完成前不对外注册）。
  - agent.2：对标案例扩至 6 项并逐案登记 sources.json（CASE-SRC-*，含 publisher/url/公布与访问日期/复用边界），"首个/率先"断言标注公开渠道口径、待独立核验。
  - agent.3：场景卡扩至 10 张（含五类核心），新增 3 项产业测试协议（测试假设/沙盒边界/退出条件）并同步 metrics industry_test_scenario_count=3。
  - agent.4：3 个 AI 地标节点＋6 个场景节点落地 public_space 几何并进入三节点图；荣誉展示与组件库以概念清单表述（照明/演艺市集/运营治理三类）。
  - agent.5：文化导视（纸质导览等价并存、信息屏分级）与国际传播文案（VI 图板中英对照）补充。
  - agent.6：年度活动品牌表（夜光市集季/夏夜开放舞台/冬日灯光节）、概念 RACI、准入前置条件、成本定性分级表、监测基线表与停用/撤收流程。
- 区域协同：新增区域协同接口图与 5 行协同对象表（北纬社区/未来科学城/怀柔科学城/经开区/京津冀），全部标注概念、待核验，不暗示既有政府或机构承诺；统筹机制按「未来数据与算力统筹协调机制（概念）」表述。
- 结构化一致性：persona_count 更正为 6（与六类人才画像一致）；global_case_count=6；land_use_zone_count=27；指标置信等级回落为 low/medium 并与 manifest data_confidence=mixed_provisional_and_conceptual 一致；用地“唯一口径”说明新增（7 类代码与占比唯一，green_ratio 11.0% 为绿线概念口径，二者分层解释）；proposal.md 内不再出现≥7 位或多小数位的伪精度数值，显示一律就近取整（约1141公顷/约11.0%/约0.45%）。
- 来源与版权：sources.json 新增逐案来源、license 字段与品牌政策条目；report/copyright_statement.md 扩为「版权声明＋品牌在先权利与使用边界＋资产台账」；assumptions.json 新增 A-BRAND-001/A-MONITOR-001/A-COOP-001/A-LANDUSE-001。
- 矩阵：compliance_matrix（23 条）、standard_matrix（5 条）、design_depth_matrix（15 条）逐条重写 evidence_summary，指向各自真实内容，消除重复样板句。
- 门禁与校验：四个本地门禁 PASS（self_check.json 持久化 formal-review-ready）；validate_local_submission PASS；字体覆盖校验通过。本历史记录不以本地评分替代 CocoSgt 评审。
- 未做：未触碰 agent.json；未新增包/分支/PR；未虚构官方数据（组织方缺项保持 provisional 标注）。


## v2.1 - 2026-08-25 （REPAIR ROUND-3，响应 CocoSgt 2026-08-25 CHANGES_REQUESTED 63.0）

- 图件全面重绘（18 张＋logo，figsize 12×8 @150dpi，1800×1200）：修复剪裁/离屏/重叠/过窄地图问题；所有图件经生成期真实 text-bbox 重叠与离屏检测（matplotlib renderer 逐对窗口包围盒，阈值 3px，最终 0 违规），PIL 实测 ink（地图/示意图≥0.08、图表≥0.10，实测 0.11–0.33）与边缘剪裁（全部 0.0）；en 变体 100% 英文标签（生成期断言 0 中文字符）；每图双语 PROVISIONAL 印章＋图例/比例尺/指北针（空间图）；地图按场地真实长宽比（南北狭长带）布局几何感知坐标范围与 2 列图例区。
- 新增 2 张双语图：ai-ecosystem（全球AI创新生态对标 6 案例＋八要素机制链）、landmarks-night-nodes（功能节点×朝圣地标分化＋荣誉展示体系＋可逆组件库），均入 manifest（language/translation_of 完整登记）。
- A0/A3 图纸重排（2 页×中英）：A0 首页标题 64/60pt、三层范围条带、主场地图放大、一亮一演一市/五机制/AI治理卡片、八要素链与三指标卡，无大块留白；A3 首页标题不剪裁（30/34pt）；PDF 字体子集内嵌（pdf.fonttype 42，NotoSansSC），fitz 逐 span 检查无越界文本。
- agent.2 实质补齐：全球AI创新生态对标表（硅谷/深圳/新加坡 one-north/杭州/波士顿肯德尔广场/特拉维夫 6 案例，逐案 sources.json 登记 ECOSYS-SRC-*，公开渠道机制概述、待独立核验）＋「土地—空间—产业—资本—人才—算力—数据—场景」八要素机制表（含三区两翼落点与复算触发）＋AI 创新生态五层本地架构（数据/算力/模型/场景/治理，概念、可整体停用）。
- agent.4 实质补齐：功能夜游节点与 AI 朝圣地标明确分化（「智环原点」「共笔回声场」「未来之眼」三差异化地标概念，不建永久构筑物）＋荣誉展示体系（三勋章：开源共创/社区共建/市集口碑，无现金无特权、匿名聚合、可退出）＋可逆公共空间组件库 8 类（空间映射＋运营映射＋复用＋成本分级）。
- agent.5 实质补齐：文化叙事三层递进＋中英双语可复用文案库 6 块（使命宣言/电梯陈述/站点导览词/活动邀请/年度公示引言/媒体一句话）＋传播节律与使用边界。
- agent.6 实质补齐：开发者社区运营机制 4 项（伙伴计划/社区节律/资产开放规则/运营支持）、AI 场景开放运营规则（10 场景逐条：数据质量·基准与影子模式·量化通过/失败·人工复核界面·退出条件，阈值均为试点校准预设并随年度公示公开）、人才·企业·开发者非承诺转化路径 4 阶梯（体验者→共创者→试点参与者→生态伙伴，全程非承诺）。
- 用地唯一口径修正：land_use 实际复算（EPSG:4548）7 类合计约 100%（1401=约27.3%、无"其他"行），proposal/图/HTML/PDF 统一；两口径（用地分类 vs 绿线 11.0%）说明保留。
- 结构化一致性：metrics.json 新增 8 项计数（ai_ecosystem_case_count=6、ai_ecosystem_element_count=8、pilgrimage_landmark_count=3、honor_category_count=3、component_library_count=8、communication_copy_count=6、developer_mechanism_count=4、conversion_step_count=4，均以正文可见表格为据）；sources.json 新增 6 条 ECOSYS-SRC-*（21 条）；assumptions.json 新增 5 项（A-ECOSYS-001/A-HONOR-001/A-COMPONENT-001/A-COMMUNITY-001/A-THRESHOLD-001，15 项）；compliance_matrix agent.1-6 证据逐条指向新真实内容并补指标/来源/假设引用；standard/design_depth 矩阵同步扩展。
- HTML：render_proposal_html.py 重生成 report/proposal[.en].html；visual/index[.en].html 就地补章节（AI 创新生态图、朝圣地标/荣誉/组件图、agent.6 扩展说明、来源/假设计数）；4 页最后统一 embed_fonts.py 内嵌 Noto Sans SC 子集，check_font_coverage ALL_FONTS_OK；visual 预览 16 张重渲染。
- 门禁与校验：四道门禁 PASS（self_check.json 持久化 formal-review-ready）；validate_local_submission PASS（66 文件）；figure_qc（真实 ink/剪裁测量＋生成期 text-bbox 重叠检测 0 违规，overlap_clear=True）写入 self_check.json。本历史记录不以本地评分替代 CocoSgt 评审。
- 中英实质等值已人工核对：proposal.md ↔ proposal.en.md 逐节对译（新增八要素/地标/荣誉/组件/文案库/社区/开放规则/转化路径全部等值呈现，en 页 0 功能性中文）。
- 未做：未触碰 agent.json；未新增包/分支/PR；未虚构官方数据；品牌在先权利检索未完成前按内部工作代号处理。
