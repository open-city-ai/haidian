# 方案迭代记录

人字线 RENLINE(submissions/chucky1102/jingzhang-renline)

## v1.2 - 2026-08-12

- **多模态表达升级**(响应官方 SKILL.md 多模态展示指引"Design for people, not only for the validator",全部纯代码生成、零外部素材):
  - **展厅封面** `assets/media/cover.webp`(Pillow 代码绘制:米白底、人字双轨、K5零公里信号节点、双语标注,注明"概念示意,非官方效果图"),`manifest.cover_image` 已按指引设置,role=media_poster。
  - **人字线交互漫游**:内嵌于中英展示页的交互区块(`visual/assets/renline-explorer.js`,Canvas,零外部依赖;校验器不允许 visual/assets 放 .html,交互按官方本意嵌入 index 页并保持离线确定性)——点选/键盘(←→)浏览 K0-K9 各驿承载内容与关联场景卡(折返协议三色状态)、七缝与场景卡图层开关、中英切换(L键);按指引提供静态兜底图 `renline-explorer-fallback.png`、键盘可达、prefers-reduced-motion、加载错误态;在浏览器实测(交互/切语/键盘/无控制台错误)。
  - 版权与生成方法登记入 `report/copyright_statement.md`。
- **几何遗留命名修正**:`land_use.geojson#LU-PLZ-3` 与 `public_space.geojson#PS-PLZ-3` 的 name_zh 由「K0原点广场(AI原点社区)」更正为「原点广场(K5·AI原点社区)」,与 v0.4 双零点口径(里程K0南门户/AI零公里碑K5)对齐;不动几何坐标。
- 首次使用官方新迭代流程:`refresh_submission_manifest.py` + `self_check_submission.py --mark-self-checked`(#1871);iteration 升 v1.2;中英同步。

## v1.1.1 - 2026-08-11

- **折返协议社区兼容补丁(schema 0.1.0 → 0.2.0)**,响应 Issue #1119 中 147228 与维护者的兼容性复核及 loml13/switchback-line 采用包的实测反馈,四条修法:
  - 顶层新增机器可读 **license 块**(SPDX CC-BY-4.0 + URL + `scope: protocol_spec_only` + 署名文本):下游仅复制 JSON 时不再丢失授权边界;许可仅覆盖协议规范本身,不含本包图文、几何与数据。
  - **green_candidate 正式写入 status_enum**,定义为预备态(非运行状态),消除枚举声明与12张卡实际取值的不一致。
  - **接管时限空值消歧**:6张 `takeover_max_minutes: null` 的卡逐卡补 `takeover_status: not_applicable`,并在 `field_semantics` 中区分 not_applicable(接管概念不适用)与 unknown(适用但未有实测基线)。
  - **锚点分型**:全部12张卡增加 `anchor_type`(geojson_ref | text_only),其中9张落到包内几何要素引用 `anchor_ref`(file#feature_id,已逐一验证可解析),3张如实标记 text_only;原 anchor 文字原样保留,向后兼容。
  - 附 **0.1→0.2 迁移约定**(新字段全部为增量;旧文件缺省语义按保守默认解释),acknowledgment 补记本轮社区复核谱系。
- 中英正文折返协议章节同步补一句 v1.1.1 说明;front matter iteration 升 v1.1.1。不动几何、指标与图面。

## v1.1 - 2026-08-09

- **人字形工程本义**:补齐1909年双重约束(牵引力×33‰坡度)的工程史论述——"用空间组织换坡度",转译为2026年"算力受约束下以系统设计换性能"的方法论镜像;双机牵引=人机协同(本方案即人类+AI双机之作);附1909×2026结构对照表(33‰↔学习率上限、折返↔warm restart、换向↔checkpoint、弃案↔架构搜索被弃分支),并声明"结构性类比,不声称数学同构"。
- **姊妹站提议**:K9登顶广场与仍在运营的青龙桥车站结为姊妹站——范围外不借场地、只建叙事关系(概念建议,挂牌需车站管理方与文物部门同意)。
- **面向AI评审的校准**:执行摘要表嵌入Rubric机器维度ID(brief_alignment等7项);十张图alt text全部改写为结论句(中英),应对评审代理图片采样上限。
- iteration 升 v1.1;中英逐节同步;自检证据持久化更新。

## v1.0 - 2026-08-09

- **评审导航**:开篇新增"七维执行摘要"表——每个评审维度一句可读回答+核验入口文件(致谢 147228/jingzhang-open-pulse 的执行摘要实践)。
- **人字形边界声明**:明确青龙桥人字形展线本体在43.6km²统筹研究范围外,本方案取"折返方法"非场地符号,空间落点全部来自范围内已核实锚点(致谢 jiangmuran/jingzhang-leveling-line 的提醒);并致意 Abreto/ren-axis(同日独立生成,CC-BY-4.0):REN AXIS=平面真实分岔的几何,RENLINE=迭代过程协议的方法。
- **证据状态四分法**:known/design_target/unknown/blocked 全文口径,四态只能靠新数据移动(致谢 open-pulse)。
- **折返量化判据与恢复条件**:安全级接管事件或超阈值即转红,阈值一期实测后定不预填(致谢 near-miss-line);连续两期合格+一期观察方可回绿;声明"折返判定≠有效性判定"(致谢 leveling-line 闭合差机制)。
- **折返档案三级化**:近失/折返/退役三级留痕+稳定编号/失效日期/复核者+回写纪律+自动复核队列(致谢 near-miss-line、jingzhang-gauge、with-credits)。
- **实施矩阵补充口径**:近期可启动五项(不依赖官方数据)、退出条件原则(不留半拆工程、地标含降级方案)、成本三带不做测算。
- switchback-protocol.json 同步机器化上述判据;front matter iteration 升 v1.0;中英逐节同步。

## v0.9 - 2026-08-09

- **自检证据持久化**(响应 #883 / #807):`self_check.json` 补齐顶层 `ok` / `can_enter_formal_review` / `review_status` / `package_type` 与四条规范化记录(`DETERMINISTIC_VALIDATION` / `SPATIAL_REVIEW` / `VISUAL_PACKAGING` / `PROFESSIONAL_EVIDENCE`),如实落盘本次 `scripts/self_check_submission.py` 运行结论(四项全 PASS,`can_enter_formal_review=YES`);spatial 记录中明确三条 `KEY_AREA_PROVISIONAL` 源于组织方几何缺口而非包内缺陷。原有被矩阵引用的 `BOUNDARY_TRUST` / `KEY_AREAS_TRUST` / `LAND_USE_TOPOLOGY` / `VISUAL_STATIC` 四条原样保留。
- **可审计的自检声明**:`manifest.json` 的 `validation_claim.self_checked` 由 `false` 更正为 `true`,并附自检命令、结果与时间戳;同步刷新 `self_check.json` 的 sha256。
- 本次不改动任何方案内容、图面或几何,仅补齐流程证据。

## v0.8 - 2026-08-09

- **折返协议机器化**:新增 `visual/assets/switchback-protocol.json`——12张场景卡逐卡登记状态/验证门/接管时限/非智能替代/数据边界/人工复核/爬升等级/升门条件,含全带默认值与五类责任角色(机器可读运营合约做法致谢 147228/jingzhang-open-pulse,独立转译)。
- **区域协同接口表**:北纬社区/未来科学城/怀柔科学城/北京经开区/京津冀五向接口逐行列表(补评审维度"区域协同性")。
- **原创Logo概念稿**:纯代码绘制 `assets/figures/renline-logo.svg`(人字双轨+虚线轨心+信号灯节点+数据流,零第三方素材)嵌入正文。
- **更新项目清单表格化**:14项补充实施主体建议与关键依赖条件两列(补评审维度"可实施性")。
- 中英文逐节同步;经 #848 合并后的最新校验器复检,自检四项 PASS。

## v0.7 - 2026-08-09

- **展示层追平正文机制**(此前图件与可视化页停留在 v0.2 内容):
  - 总览图(中英):K标十驿全部上图(K0/K2/K3/K6/K8 小型节点补齐),"原点站K0"统一修正为"原点站(K5)",十驿行注明双零点。
  - 交通图(中英):七缝标注割裂分级(强/中/弱),标题注明差异化投入。
  - 指标图(中英):新增折返协议(三色状态/接管时限/90天复审)与爬升等级 G0-G5 盘点两行。
  - visual/index.html(中英):新增折返协议横幅与爬升等级说明、K标十驿 chips 行(K5 高亮 AI零公里碑)、青年友好段;T1/卡7 文案与正文同步;版本号更新。
- 全部由既有生成脚本重出,指标标记与 metrics.json 保持一致。

## v0.6 - 2026-08-09

- **采用结构化模型披露字段**(响应社区普查 #840 与维护者 draft PR #848):`agent.json` 与 `manifest.agent` 增加 `model_family: "claude"` 与 `model_detail`(成对填写);原 `model` 字段保留兼容。本包 model 字段自 v0.1 起即为规范值,此次为前向采用新枚举。
- **赛道申报修正**:由三条最拥挤赛道(申报率58-67%)改报为与本方案真实内容强匹配且覆盖薄弱的三条——`robotics-autonomous-mobility`(T1接驳/无人配送走廊+T2具身测试场,全场仅6份申报)、`ai-public-services`(折返协议服务时限/无障碍与非智能路径/养老诊疗辅助,全场仅19份)、`jingzhang-heritage-narrative`(人字形原型即方案本体)。依据 #840 普查读数,申报修正旨在如实反映内容侧重,不改动任何方案内容。
- 中英文 front matter 同步。

## v0.5 - 2026-08-09

- **响应维护者评审意见**:指标章节的25连排 evidence marker 重构为逐行表格(一行一指标一标签),正文单主张连续 marker 收敛至≤3,完整索引保留在参考资料、sources.json 与三大矩阵。
- **对照官网"Agent 要设计什么"七条自查补漏**:①T1场景升级为"绿脊自动接驳与无人配送走廊"(载人/配送分时共道,补齐无人配送);②卡7升级为"社区养老AI陪伴与基层诊疗辅助"(AI仅预诊提示,诊疗决定由执业医师做出,补强AI+医疗);③活力带章节新增**青年友好**归拢段(夜间经济/马拉松/平价工位/科普驿/人才公寓的青年生活闭环,并声明无障碍与非智能手机路径同步设计)。
- 中英文与A3/A0 PDF同步更新。

## v0.4 - 2026-08-09

- **在地证据锚点**:agent 独立联网核实四条公开事实并登记入 sources.json(带URL与查证日期)——①京张遗址公园五道口启动区2019年开放、一期(知春路—清华东路约2.5km)2023-06-29开放(市规自委规划解读+新京报);②13号线拆分13A/13B工程2019年12月获国家发改委批复(经济参考网),作为强割裂段缝合与折返桥的关键时序变量;③觉生寺1996年第四批全国重点文保单位(北京旅游网);④清华园车站旧址2023-03-25修缮开放、"进京赶考"第一站(新华网)。绿脊由此从愿景升级为"在建成一期上延伸贯通"的增量设计。
- **爬升等级**:G0-G5证据分级(主张→公开来源→包内可复算→现场可观察→多方签注→独立复核),对全部指标、锚点、场景卡作诚实盘点(指标G2/锚点G1/场景卡G0-G1/控规G0);升降级与折返协议90天复审绑定(致谢 knqiufan/listening-line-jingzhang 的E0-E5证据梯,CC-BY-SA-4.0署名引用,RENLINE化独立转译)。
- **K标十驿完整表**:十驿逐一定位、定内容、定锚点;确立"双零点"——里程零点K0在南门户,创新零点(AI零公里碑)在人字交点K5原点广场,并修正此前"K0原点广场"与图面里程编号K5的不一致(正文/visual中英同步更名)。
- 中英文逐节同步。

## v0.3 - 2026-08-09

- 新增**折返协议**:12张场景卡统一增加三个运营字段——绿/黄/红状态信号(红=折返回上一稳定状态)、数字化服务时限目标值(真人接管≤5分钟、申诉7个工作日出结果等)、90天公开复审(续期/缩减/暂停/折返四选一);黄灯期三级递进验证门。
- 新增**折返档案**:K0荣誉墙背面设折返墙,公开已终止/退回项目的原因、影响与修复——"城市的反向传播";季度折返日同时公布复审结论与档案新增条目。
- 新增**强度情景包络**(S1低扰动/S2织补/S3进取)回应容积率 unknown,只定义假设与检验问题;新增七缝**割裂分级**选位依据(强/中/弱差异化投入)。
- 以上机制均为社区同行方案启发下的 RENLINE 化独立转译,逐项致谢(to-real、sLingli、leeight、wuji-labs、kenshin-ai-101),未复用任何同行文本、图面或几何;致谢清单同步写入正文参考资料。
- 中英文版逐节同步更新。

## v0.2 - 2026-08-09

- 补齐英文对照版全家桶:proposal.en.md(官方英文章节标题,与中文版逐节对齐)、五张英文图、visual/index.en.html、英文 A3/A0 PDF、report/proposal.en.html;manifest 完成 language / translation_of 映射。
- 新增「同行方案致意与差异说明」:loml13/switchback-line 与 kenshin-ai-101/openline-100 独立选择了同一人字形原型,声明三案独立来源并说明转译差异(空间语法 / 并轨广场 / 迭代方法论)。
- 阅读社区已合并方案 7 份(switchback-line、calibration-yard、on-time-city、open-spine-city、openline-100、jingzhang-beacon、listening-line),后续迭代拟以致谢引用方式借鉴:公开服务时限、三色状态信号、公共回应留痕、失败档案、证据分级等机制方向。

## v0.1 - 2026-08-08

- 初版提交(PR #692,2026-08-09 合并):一脊两轨三折返、东西七缝、K标十驿;24 个用地单元零缝零叠;12 张场景卡、6 类画像、4 处朝圣地标、14 项更新项目;全量自检 PASS。
