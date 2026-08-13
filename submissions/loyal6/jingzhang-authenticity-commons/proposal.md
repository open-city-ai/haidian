---
title: "京张验真公地"
author_github: "loyal6"
language: "zh"
proposal_format_version: "2"
bilingual_contract_version: "1"
translation_file: "proposal.en.md"
license: "COMMUNITY-DISPLAY-ONLY"
summary: "以铁路遗产为公共脊梁，把内容来源验证、线下无屏服务、受害者纠错恢复和产业验证档案组织成三带三核六站的城市公共基础设施。"
tracks: ["enterprise-services-ecosystem", "civic-agent-governance", "ai-public-services"]
scenarios: ["ai-health-service-navigation", "enterprise-service-copilot", "public-safety-operations-review", "ai-cultural-guide", "ai-traffic-walkability"]
---

# 京张验真公地

> **先验证，再相信 / Verify Before Trust**

京张验真公地（JZAC）不是“判真中心”，而是一套让证据可见、让不确定性可说、让错误可撤销、让不会或不愿使用智能手机的人仍能获得同等服务的城市公共基础设施。其空间原型为“一脊三带、三核六站、两翼互馈”：以京张铁路遗产和连续公共空间为验真公地主脊；把百年京张文化带、都市AI生活体验带、AI融合创新带叠合为文化—生活—产业三类工作界面；以众智园、北京AI原点社区、大钟寺三处重点片区为评测、转化与可信采购锚点；设置公众验真台、评测工坊、证据档案室、纠错恢复站、可信采购台、无屏服务窗六种可复制站点。中关村科技服务翼把验证档案转译为知识产权、资本、采购和风险服务；小月河场景赋能翼把真实城市问题反馈为测试任务与公共服务改进。

## 设计依据与资料清单

方案的第一依据是征集公告和面向智能体任务书；三层范围面积与三处重点片区名称、南北顺序和公告面积属于可引用事实。仓库目前没有可公开下载、可核验坐标系的官方精确 polygon、控规、道路红线、权属、市政和现状建筑测绘。因此，`geometry/site_boundary.geojson` 和 `geometry/key_areas.geojson` 明确保持 `provisional_constraint`、`official_boundary=false`；其余设计图层只在该临时边界内表达拓扑关系与相对指标，不能作为审批、征拆、投资或工程放线依据。法定容积率、建筑高度、建筑密度、法定绿地率、退线与建筑控制线全部为 unknown [source:OFFICIAL-ANNOUNCEMENT] [source:BOUNDARY-SOURCE] [depth:existing_conditions_diagnosis]。

本方案进一步查阅了11组官方或第一方案例。共同启发不是“建立一个万能真相分数”，而是把来源声明、检测、人工复核、撤销、申诉、采购和长期运营组合成制度。C2PA 明确证明内容与来源声明的关联，不判断事实真伪；NIST OpenMFC 提醒以盲测、定位、鲁棒性和多指标评价代替单一准确率；赫尔辛基和阿姆斯特丹展示登记、反馈和采购条款；AI Singapore 展示从问题界定到交接的验证链；Zollverein 说明工业遗产可以成为持续工作的公共与创意基础设施，而非被消费的布景 [source:CASE-C01] [source:CASE-C03] [source:CASE-C10]。

| 案例 | 核心机制 | 可转译 | 不照搬 | 局限 |
| --- | --- | --- | --- | --- |
| C01 C2PA Content Credentials | Cryptographically verifiable provenance manifests and edit history. | Adopt signed provenance receipts, revocation status and explicit separation between provenance and truth. | Do not make a C2PA-valid asset automatically true or safe. | Coverage depends on adoption and intact metadata. |
| C02 DARPA Semantic Forensics | Semantic detection, attribution and characterization of manipulated media. | Combine multiple forensic signals and keep analytic uncertainty visible. | Do not translate defence research into pervasive civic surveillance. | Automated detectors drift as generation methods change. |
| C03 NIST OpenMFC | Open benchmark evaluation for manipulation detection and localization. | Use blind tests, validators, versioned datasets and multiple performance metrics. | Do not publish one leaderboard score as a universal certification. | Historic benchmarks may not represent current local media and languages. |
| C04 NIST AI RMF and AIRC | Govern, map, measure and manage AI risks with TEVV resources. | Use named owners, pre-release gates, monitoring, incident response and human oversight. | Do not claim NIST alignment equals regulatory approval. | Voluntary framework needs contextual tailoring. |
| C05 Helsinki AI Register | Public register explains municipal AI systems and allows feedback. | Publish purpose, data, operator, oversight, lifecycle status and feedback route. | Do not limit transparency to web users; retain staffed and paper access. | Disclosure quality depends on continuing departmental updates. |
| C06 Amsterdam Algorithm Lifecycle Approach | Algorithm register plus procurement clauses and lifecycle tools. | Bind evidence disclosure to procurement and supplier contracts. | Do not copy legal clauses without Chinese law and procurement review. | A register can become ceremonial if audit and remedy are weak. |
| C07 AI Singapore 100 Experiments | Problem scoping, co-funded PoC/MVP delivery, engineering teams and knowledge transfer. | Stage validation from scoped problem to PoC, production readiness and handover dossier. | Do not promise identical funding or eligibility. | Requires sponsor capacity, data readiness and co-investment. |
| C08 Munich Re aiSure | Risk engineering links evidence about AI performance to insurance products. | Design a reproducibility dossier that underwriters may inspect. | The commons must not set premiums or guarantee insurability. | Commercial underwriting criteria are product- and market-specific. |
| C09 Finnish media literacy framework | Media literacy is embedded in education and lifelong learning. | Pair public verification with repeatable teacher-led learning and non-formal education. | Do not assume Finnish curricula or institutions can be copied directly. | Learning outcomes require trained educators, not only tools. |
| C10 Zollverein industrial heritage reuse | Retained industrial heritage supports culture, design, creative industry and public life. | Use retained railway fabric as working civic infrastructure, not scenery. | Do not equate heritage branding with proven local conservation status. | Local ownership, conservation and fire-safety conditions remain decisive. |
| C11 EU Verifiable Credentials | Issuer-holder-verifier model, trust lists, selective disclosure and auditability. | Use minimum disclosure, revocation and offline/proximity verification patterns. | Do not require a smartphone wallet for public access. | The EU legal trust framework does not apply automatically in Beijing. |

完整出处、用途和限制见 `sources.json` 与 `visual/assets/global-cases.json`。概念封面由 OpenAI 图像生成工具制作，仅表达“遗产空间 + 人工服务 + 证据链”的气质，不参与空间与指标证明。

![总体框架与证据层级](assets/figures/site-overview.png)

## 三层范围工作框架

43.6平方公里统筹研究范围负责产业链、治理链与两翼协同；11.4平方公里总体设计范围负责把服务网络落到城市更新、用地、慢行、蓝绿公共空间和运营节点；368.4公顷重点范围负责三处片区的功能、建筑适配、交通接口、公共空间和分期。三层不增加新的伪精确边界，而是形成“战略假设—空间原型—可实施单元—验证指标”的逐层收敛 [standard:PROJECT-OFFICIAL-ANNOUNCEMENT] [depth:three_level_scope_framework]。

统筹层提出验证档案的互认字段、公开风险分级和两翼服务目录；总体层以六站约15分钟步行接驳为概念目标，但不以缺少路网和人口数据的情况下声称真实覆盖率；重点层以一座站、一个产业测试族、一个公共服务族和一套纠错机制形成最小可行单元。官方 polygon 到位后，九个 GeoJSON、五类图件和所有 known 空间指标必须整体重算，不能局部替换 [data:geometry/site_boundary.geojson#SITE-001] [metric:site_area_sqm]。

## 统筹研究范围产业与未来城市研究

JZAC 把“可信”从宣传语变为可交易但不可垄断的公共能力。企业不获得永久认证，而获得有版本、有用途、有到期日、可撤销的验证档案；档案把供应商声明、盲测结果、适用边界、人工复核、整改与申诉分开。初创企业可把档案带入孵化评审；采购者查看与本用途相关的证据；投资人查看能力成熟度与未解决风险；保险人只把可复现实验作为承保参考。中关村科技服务翼组织知识产权、法务、资本与风险工程；小月河场景赋能翼组织健康、教育、商户、交通、遗产和社区纠错场景，形成“问题—测试—整改—再验证—场景复盘”的闭环 [source:AGENT-TASKBOOK] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]。

未来城市形态因此不是被大屏和摄像头覆盖的“智能街区”，而是可进入、可停留、可解释的公共工作台：保留红砖、站房、轨道记忆和树荫，以可逆的室内改造、首层开放和小型服务亭嵌入六站；屏幕只是一个选项，纸张、电话、手语、音频和人工柜台具有同等权利。方案禁止连续人脸识别、跨场景轨迹拼接、自动黑名单和不可申诉的信誉分。

## 总体设计范围城市更新与控规深度城市设计

总体结构为“轨道遗产验真绿脊 + 三类横向联络 + 六站公共界面”。`land_use.geojson` 把临时边界拓扑完整划分为六个概念用途：可信商业与产业服务、包容社区服务、京张文化与公共展示、媒介素养与教育协作、评测研发与成果转化、北部生态与开放试验；多边形无缝、无重叠，但用途不是法定调整。`roads.geojson` 只表达慢行、骑行、步行和轨道接驳的设计中心线，不表达道路红线。`buildings.geojson` 中12个更新单元均为“保留或适配”的示意载体，未取得测绘、权属、结构与文保条件前不承诺拆除或新建 [data:geometry/land_use.geojson#LU-001] [data:geometry/buildings.geojson#BLDG-001] [depth:retain_renovate_demolish]。

![用地结构与三带叠合](assets/figures/land-use-structure.png)

六站采用同一空间协议：临街可见入口、无障碍连续路径、两种以上人工交流方式、可关闭的隐私会谈位、清洁/污染文件分流、等待与陪同座席、公开方法墙、纸面收据打印、设备隔离与安全储存。小型站可嵌入现有社区服务设施，大型评测工坊需独立网络、许可数据隔离、样本留存和红队复测空间。所有建筑高度、容积率、建筑密度、消防疏散和设备荷载均待专业深化，不以概念面积替代 [depth:development_intensity_controls] [metric:building_footprint_area_sqm]。

## 重点区域详细设计

**众智园AI自主创新加速区——评测与标准锚点。** 北部以评测工坊、开放基准场、标准协作室和模型上线闸门为核心；沿清河方向组织低干扰步行、雨洪与户外演示；研发人员与公众参观流线分开，测试数据不进入公共展示。产业成果在这里完成“声明—测试—整改—复测”，再进入科技服务翼。片区面积192.1公顷为公告值，提交 polygon 仅为临时占位 [data:geometry/key_areas.geojson#PROV-KEY-001]。

**北京AI原点社区——成果转化与纠错锚点。** 中部把近校成果发布、开源协作、媒介素养教室、证据档案室和纠错恢复站组合在可步行首层；人才服务不以高门槛园区会所替代社区日常服务。被误标的个人和小企业可冻结传播标签、调阅证据、获得独立复核，并把更正同步到原发布渠道。片区面积104.3公顷为公告值 [data:geometry/key_areas.geojson#PROV-KEY-002]。

**大钟寺AI产业聚集区——可信采购与无屏服务锚点。** 南部依托轨道接驳组织可信采购台、小商户合同/发票验真、内容与创作者权利服务、国际双语路演和无屏服务窗。路演必须展示测试边界与失败案例，不以营销演示替代验证。无手机者在15分钟服务目标内完成受理、人工回拨和纸面收据；具体步行时间需在官方路网和站点数据到位后复核。片区面积72.0公顷为公告值 [data:geometry/key_areas.geojson#PROV-KEY-003]。

![三处重点区域与空间协议](assets/figures/key-areas.png)

## AI 创新生态、人才画像与 AI+ 场景

方案设置15个场景，其中5个是产业测试/验证场景，并明确包含AI+医疗、AI+教育和AI+商业。每个场景记录用户、空间、数据边界、人工复核、无屏可达、输出、成功条件和禁止事项。共同的五步验真协议是：①说明要验证的具体主张；②登记来源声明和版本；③组合密码学来源、取证检测和外部证据；④由适格人工复核高影响结论；⑤签发可撤销、可申诉、有时效的收据。系统允许“无法确定”，严禁把未解决强行压成真假二元值 [source:CASE-C01] [source:CASE-C04]。

| 场景 | 类型 | 空间 | 流程 | 输出 | 无屏 / 人工复核 |
| --- | --- | --- | --- | --- | --- |
| S01 多模态来源登记与验真受理 | industry_validation | 众智园评测工坊 | 登记来源声明—校验签名与编辑历史—检测异常—人工复核—出具分级收据 | 可撤销验真收据与证据包 | 是 / required |
| S02 图像视频深伪基准挑战 | industry_validation | 众智园开放评测场 | 许可数据入场—盲测—分群误差评估—对抗复测—发布模型卡 | 版本化基准报告 | 否 / required |
| S03 模型上线前信息完整性闸门 | industry_validation | 北京AI原点社区发布厅 | 用途界定—数据与版权审查—红队测试—公众影响复核—限域发布 | 上线条件单与拒绝理由单 | 否 / release_committee |
| S04 中小企业可信采购验证 | industry_validation | 大钟寺可信采购台 | 核验供应商声明—抽测样品—核对服务边界—成本风险评估—生成采购参考档案 | 采购参考档案 | 是 / required |
| S05 AI保险与责任可复现工作台 | industry_validation | 中关村科技服务翼风险会诊室 | 界定损失事件—复现实验—核对控制措施—人工归因—形成承保参考 | 承保参考与整改清单 | 否 / risk_engineer |
| S06 医疗消息验真与就诊前澄清 | ai_health | 社区卫生服务嵌入式验真窗 | 提交消息—识别来源与篡改—对照权威公开信息—医生复核—给出就医分流 | 澄清卡与就医建议来源 | 是 / clinician |
| S07 教育材料与招生凭证验真 | ai_education | 原点社区媒介素养教室 | 识别内容来源—核对凭证签发方—课堂共评—教师裁决—记录纠错 | 学习用来源卡或凭证核验记录 | 是 / teacher_or_issuer |
| S08 商户合同、发票与促销素材验真 | ai_business | 大钟寺无屏服务窗 | 纸面或文件受理—核对签发与版本—风险提示—必要时转人工/法律渠道—打印收据 | 纸质验真收据 | 是 / required_for_adverse |
| S09 社区突发谣言分诊 | civic_service | 小月河场景赋能翼社区节点 | 快速受理—标注不确定性—查证来源—人工联合复核—多渠道发布更正 | 带时间戳的澄清公告 | 是 / incident_team |
| S10 老年人反诈无屏验真 | inclusive_service | 六站通用的人工服务台 | 携带纸张或口述—工作人员代录—回拨官方渠道—风险分级—打印下一步 | 大字号纸质收据与回执编号 | 是 / mandatory |
| S11 无障碍音视频说明验证 | inclusive_service | 全线无障碍验真台 | 选择沟通方式—提供等价材料—解释置信边界—支持人复核—带走易读结果 | 易读、盲文/音频或手语版本结果 | 是 / accessible_service_staff |
| S12 创作者版权与内容履历登记 | creative_industry | 京张文化带创作档案室 | 自愿登记—权利声明—版本签名—使用授权—撤销/纠错 | 内容履历与授权记录 | 否 / rights_adviser |
| S13 交通与公共告示版本核验 | urban_service | 大钟寺站及慢行接驳节点 | 扫描或人工输入公告编号—核对签发方—显示有效期—提供纸面替代—报告伪造 | 当前有效版本提示 | 是 / station_staff |
| S14 受害者纠错与信誉恢复 | recovery_appeal | 公地纠错恢复站 | 提出异议—冻结传播标签—调阅证据—独立复核—同步更正—追踪恢复 | 更正通知、撤销记录与修复计划 | 是 / independent_panel |
| S15 京张工业遗产数字档案验真 | heritage | 百年京张文化带遗产节点 | 登记档案来源—保留原件关联—专家注释—公众纠错—版本发布 | 可追溯数字档案 | 是 / heritage_expert |

12类画像均有从到达、受理、复核、结果到失败恢复的完整旅程。P01 明确代表无智能手机的退休居民；P02 覆盖轮椅和低视力；医疗、教育、商户、创业、创作、新闻、研究、国际访客和公共窗口角色均进入同一矩阵。详细五步旅程与数据保留边界见 `visual/assets/persona-journeys.json`。

| 画像 | 目标 | 完整旅程 | 失败恢复 |
| --- | --- | --- | --- |
| P01 无智能手机的退休居民 | 确认微信群里的体检通知是否真实 | 带打印件到无屏窗 → 工作人员代录且不要求账户 → 回拨公开机构电话 → 临床人员复核紧急性 → 取得大字号收据并可电话申诉 | 人工暂停、独立复核、同渠道更正 |
| P02 使用轮椅且低视力的访客 | 平等读取并质疑验真结论 | 沿无障碍慢行到服务台 → 选择语音和易读模式 → 工作人员解释置信边界 → 支持人共同复核 → 以音频和纸面双版本带走结果 | 人工暂停、独立复核、同渠道更正 |
| P03 社区医生 | 迅速处理可能伤害患者的伪医疗消息 | 接收分诊而非自动诊断 → 查看来源和篡改证据 → 比对权威公开指南 → 签署人工意见 → 将急症直接转入医疗服务 | 人工暂停、独立复核、同渠道更正 |
| P04 中学教师 | 把真假判断转化为媒介素养课程 | 选择清权案例 → 学生分组检查来源 → 讨论签名与事实的区别 → 教师归纳不确定性 → 保存匿名教学复盘而非学生画像 | 人工暂停、独立复核、同渠道更正 |
| P05 学生家长 | 核验招生材料与收费通知 | 提交纸面或电子材料 → 核对签发方与版本 → 发现疑点时暂停付款 → 通过学校官方渠道复核 → 领取可申诉记录 | 人工暂停、独立复核、同渠道更正 |
| P06 大钟寺小商户 | 低成本核验供应商AI产品和合同 | 预约或直接到采购台 → 说明经营需求 → 查阅分层测试证据 → 比较全周期成本与限制 → 取得非黑箱采购参考档案 | 人工暂停、独立复核、同渠道更正 |
| P07 早期AI创业者 | 用可复现证据进入孵化、采购和保险 | 登记明确用途 → 完成盲测和红队 → 修复后复测 → 形成版本化验证档案 → 自主决定向投资人披露的范围 | 人工暂停、独立复核、同渠道更正 |
| P08 独立影像创作者 | 证明作品履历并处理被冒用内容 | 自愿登记原始版本 → 设置许可和撤销条件 → 发现仿冒后提交异议 → 人工核对权利边界 → 同步更正并跟踪恢复 | 人工暂停、独立复核、同渠道更正 |
| P09 社区记者 | 在突发事件中快速但审慎地核查素材 | 提交素材及上下文 → 查看取证与来源结果 → 标注未解决问题 → 与现场来源交叉核验 → 发布带时间戳的更正机制 | 人工暂停、独立复核、同渠道更正 |
| P10 评测研究员 | 获得合规基准并公开方法限制 | 申请数据用途 → 在隔离环境运行测试 → 报告分群误差 → 接受独立复核 → 发布可复现协议不泄露数据 | 人工暂停、独立复核、同渠道更正 |
| P11 国际来访采购经理 | 跨语言理解本地AI方案的证据质量 | 从轨道接驳到双语服务台 → 选择中英对照档案 → 观看测试流程而非营销秀 → 提出技术和伦理质询 → 带走有时效与撤销状态的摘要 | 人工暂停、独立复核、同渠道更正 |
| P12 公共服务窗口人员 | 在不扩大权限的前提下处置伪造告示 | 核对公开签发名录 → 显示当前有效版本 → 登记线下工单 → 通知有权部门处理 → 将更正同步到原发布位置 | 人工暂停、独立复核、同渠道更正 |

## 用地、建筑规模与拆改留方案

本方案采用“先留后改、可逆优先、用途先行、结构再判”的更新方法。A类是原貌保留和安全修缮的铁路遗产及具潜在价值建筑；B类是通过首层开放、室内适配、无障碍和设备更新承载六站的既有建筑；C类是待测绘和权属确认后再论证的补充体量。`buildings.geojson` 只画12个概念更新单元，不把它们称为现状建筑，也没有 demolition=true。取得建筑普查后，以身份ID匹配、结构安全、遗产价值、全生命周期碳和运营适配五项重新分类 [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE] [depth:height_massing_character]。

法定开发强度全部保留 unknown。设计层可复算的只有临时范围面积、概念建筑基底、设计绿地、六站公共空间和中心线长度；它们只用于比较方案内部结构。法定绿地率不能用设计绿地比例冒充，建筑密度不能以示意单元计算，建筑规模不能由假定层数推导。`assumptions.json` 记录边界、控规、现状、工程、运营和技术成熟度六类前置条件。

## 交通、轨道、市政与公共服务设施

交通采用“公共交通到达—慢行主脊—横向缝合—最后50米无障碍”的层级。南部大钟寺强调轨道接驳与四象限步行衔接；中部原点社区强调校区、园区、社区首层连续；北部众智园强调跨环路与清河公共界面。提交的5条中心线均被裁剪在临时边界内，长度可复算，但道路等级、断面、交叉口、停车和桥下空间需以正式交通资料复核 [data:geometry/roads.geojson#ROAD-001] [depth:traffic_rail_slow_parking]。

![慢行、蓝绿与六站网络](assets/figures/mobility-bluegreen.png)

市政策略坚持低资源与边缘安全：公共台不依赖云端连续连接，核心受理可以离线生成案件号；评测数据通过隔离区、许可清单和删除证明管理；能源、算力、排水、消防、网络冗余与设备散热均为工程深化前置。没有官方管线数据时，`constraints.geojson` 保持空要素并说明缺口，不画假管线 [data:geometry/constraints.geojson#CONSTRAINTS] [depth:municipal_new_infrastructure]。

## 蓝绿空间、公共空间与城市风貌

京张遗产绿脊不是“科技秀场”，而是六站之间的日常公共客厅。线性绿地承担遮荫、雨洪、骑行和停留；横向绿廊把小月河场景赋能翼与主脊相连；六个公共空间多边形表示有人值守的服务界面。无障碍连续、夜间安全、座椅与陪同位优先于互动装置。设计绿地比例和六站公共空间比例来自提交图层 union/sum，仅用于内部结构评价，不是规划绿地率 [data:geometry/green_space.geojson#GREEN-001] [metric:green_ratio]。

风貌采用“铁路深蓝 + 低饱和青绿 + 暖琥珀 + 砖红 + 纸白”，保留工业材料的时间痕迹；新增构件轻量、可拆、与原构筑物留缝。公共方法墙用清楚的句子说明“来源有效不等于事实真实”“检测有误差”“不确定可保留”“结果可申诉”。不设置人脸框、监控意象、巨型屏幕或仿赛博城市符号。

## 更新项目清单、实施政策与分期计划

近期0—18个月先启动无屏服务窗、公众验真台、清权教学案例、许可基准和更正台账，以运营协议、隐私/无障碍/安全评审为闸门；中期18—36个月在官方边界、权属、建筑和工程资料到位后适配六站，连接三核并试行验证档案进入孵化和采购；远期36—60个月依据独立成效评估建立走廊治理体，探索保险风险参考与国际评测交换。每一期都可停止、回退或缩小，不以“已获批准”表述 [data:geometry/phasing.geojson#PHASE-001] [depth:phasing_implementation]。

项目包包括：JZAC-01无屏服务协议、JZAC-02多模态开放基准、JZAC-03三核六站适配、JZAC-04纠错恢复与同渠道更正、JZAC-05可信采购档案、JZAC-06媒介素养课程、JZAC-07创作者履历与遗产档案、JZAC-08独立治理与年度影响审计。资金建议由公共服务购买、专业评测/培训/合同服务和研究资助组合；核心公众无屏服务免费，禁止出售案件数据和用黑箱评分创收。

## 指标体系、面积复算与合规矩阵

`metrics.json` 把指标分为 known、unknown：known 只来自提交几何或结构化矩阵；unknown 明确原因。当前可复算项包括临时总体面积、概念更新基底、设计绿地比例、六站公共空间比例、慢行中心线长度、六站数、15场景、12旅程、5个产业验证场景和3个重点片区。容积率、高度、密度、法定绿地率和退线全部未知 [metric:site_area_sqm] [metric:verification_station_count] [depth:metrics_recalculation]。

运营绩效不伪装为空间控制：建议统计无手机办理完成率、人工复核等待、结论撤销率、同渠道更正时效、申诉改判率、不同沟通方式的服务差异、基准版本过期率、企业整改后复测通过率，以及公众是否理解“来源≠真相”。这些需在真实运营后形成基线和目标；当前只给定义，不捏造目标达成值。

![指标、验证档案与四道门禁](assets/figures/metrics-evidence.png)

## 风险、版权与合规说明

最高风险不是“检测不够准”本身，而是把不准的结果包装成权威，造成服务拒绝、声誉损害和数字排斥。风险控制包括：高影响不利结论两人复核；所有收据有适用范围、到期、撤销和申诉；不跨场景画像；不建人脸库；不自动拒绝医疗、教育、公共或商业服务；更正必须返回原发布渠道；敏感案件按最小字段、用途隔离和到期删除；独立治理委员会至少包括公众服务、研究、企业、无障碍、法律和医疗角色。完整风险矩阵见 `risk.json` [depth:risk_missing_data] [source:C2PA-HARMS]。

主稿、HTML、A3、A0和五幅含文字图均提供独立英文副本。GeoJSON、指标和 JSON 矩阵为语言中立的数据事实。所有HTML离线运行，不加载CDN、远程地图、远程字体、表单或网络请求。封面为AI生成概念图并披露工具；五幅证据图、九个GeoJSON和PDF排版由本地确定性脚本生成。方案不声称官方批准、法定控规、最终权属、最终建设规模或保证实施。

## 参考资料

完整机器索引见 `sources.json`；全球案例的迁移、不迁移与局限见 `visual/assets/global-cases.json`；场景、旅程和实施模型分别见 `visual/assets/scenarios.json`、`visual/assets/persona-journeys.json`、`visual/assets/implementation.json`。关键官方依据包括征集公告、任务书、C2PA规范、NIST AI RMF/OpenMFC、赫尔辛基AI登记、阿姆斯特丹算法工具、AI Singapore 100E、芬兰媒介素养与 UNESCO Zollverein 条目 [source:SITE-PACKAGE] [source:CASE-C04] [source:CASE-C07]。
