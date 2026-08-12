# 轨迹织城 v2.2 叙事简报

## 一句话说明

RailWeave（轨迹织城）把百年京张理解为一条持续服务城市日常的公共经线：众智园、北京 AI 原点社区和大钟寺不是三个孤立项目，而是由公共空间、慢行联系、验证流程、人才服务和首用场景共同编织的三个结点。AI 作为可拆卸、可停止、可复核的纬线接入，不替代普通通行、人工服务、专业判断或法定程序。

本成果是面向开放征集的概念性城市设计研究。其工作范围、重点片区索引、功能组件、项目清单、时间切片、成本控制带和责任角色均需在正式边界、权属、现状调查、专业条件、公众参与及依法履行的程序基础上确认。它不构成政府审定、规划许可、项目立项、预算批复、采购决定、合作安排、投资承诺、建设时序或工程可行性结论。

## 从空间骨架到可撤回的服务网络

方案以京张铁路遗址公共空间为纵向经线，以清河、小月河、高校与转河方向的横向联系为纬线，组织众智园的受控验证、AI 原点的需求协同与大钟寺的首用转化。三处重点区域使用差异化的空间与服务接口：北部强调隔离、复现、故障注入和独立验证；中部强调全龄服务、共学、人工协同和问题转译；南部强调真实需求、依法采购、持续运营评估与退出。所有具体位置仍以临时工作索引表达，不能作为官方红线、产权、拆改留、建筑规模、道路工程或地下连通依据。

本轮将抽象结构进一步落实为 L4 与 L5 分层叠合的空间工作图。锁定日期的开放底图用于识别道路、步骑、轨道、具名站点、水系、建筑方位和具名京张公园图形，临时几何用于表达方案任务。以 2026-05-06 OSM 具名公园多边形和 `SITE-001` 为输入，在 EPSG:4547 下复算的平面最短边界距离留档值约 412.684 米，按整米显示为约 413 米；完整输入、最近点、查询条件和非测绘限制登记在 `visual/assets/spatial_source_conflicts.json`。该结果只作为资料冲突，不作一致性包装；正式边界到位后统一重算。大钟寺研究窗依据任务书具名站点线索作近似平移，保持经纬度跨度，投影面积较原工作窗变化约 0.027%，并控制在 `SITE-001` 内；具名站点约位于工作窗西侧 90 米，但不据此认定正式重点区边界、站口或工程线位。

RailWeave 的核心不是增加更多自动化设施，而是保持一条不依赖模型、账号或网络的公共服务经线。每个 AI 场景必须说明公共问题、经线保障、纬线接入、结点责任、数据禁区、人工复核、普通服务等价、解编触发和残留维护物。场景停止后，固定导视、纸质资料、人工服务、失败档案、维护说明或其他经确认的公共工具应能够继续工作；若缺少维护责任或恢复资源，场景不得进入现场。

## 两套彼此独立的门

v2.2 将实施判断分为两套不能互相替代的门。

“织体成熟门”审查城市与项目是否具备承载条件，重点包括空间与场地权利、无障碍和公共通行、消防与相关专业条件、人员和运维资源、数据与设备接口、退出资源及场地恢复能力。它回答的是“这个结点能否承担一项试点”，而不是“某个模型是否表现良好”。

“线程准入门”审查单项 AI 服务能否进入该结点，重点包括公共目的、版本与适用范围、数据禁区、人工终决、申诉、非数字等价服务、停止条件、到期复核和解编回执。它回答的是“这条 AI 纬线是否可以接入”，而不是“空间已经具备就可以默认上线”。

现场研究须同时通过两门。一项服务即使完成合成测试，也不能绕过场地、专业和运营条件；一个项目即使具备空间和资金，也不能绕过数据、人工、公共利益与退出审查。具体门槛、责任机构和签认方式仍须由有权主体及专业团队依法确定。

## S06：90 日全龄无障碍信息服务切片

S06 选择“全龄无障碍信息服务”作为一项可供专业团队进一步研究的时间盒。第 0—30 日只建立无 AI 基线：由专业人员与代表性使用者共同核查关键路径，记录固定导视、纸质导览、电话和人工服务的完成率、等待、距离、费用与求助情况，并确认数据字段、巡检责任和申诉渠道。普通路径或人工服务存在关键阻断时，不进入下一阶段。

第 31—60 日为封闭的合成与影子验证。系统只使用合成路线事件测试过期信息、错误建议、断网、数据禁区和停止恢复；AI 建议不直接向公众生效，而由人工逐条比较。若出现身份或残障画像、不可解释误导或无法完成解编，原型返回整改，不进入限量共测。

第 61—90 日仅在场地、数据、专业、公众和运营授权均成立时，研究限定空间、时段和参与规模的共测。人工、电话、纸质、触觉与固定导视继续提供普通服务；拒绝 AI 不应增加费用、等待惩罚或异地行程。第 90 日形成续期、整改、暂停或退出建议，不自动延长、不自动扩区。

S06 同时要求在未来依法确认的 90 日试点成本中，单列足以覆盖动态接口停用、数据清理与访问撤销、导视校正、人工服务恢复、设备撤离、场地修复和独立退出复核的退出恢复资源。现阶段不设固定比例或金额；工程量、价格、责任和资金来源须经核验并依法确定后，方可进入预算或采购文件。

## 72 个合成分支能证明什么

`visual/assets/weave_contracts.json` 为 S01—S12 各建立一份 RailWeave 织入契约。标准库 runner 对每个场景执行六个合成分支：正常、缺人工复核、缺普通服务等价、命中数据禁区、责任角色漂移和解编失败，共 72 个用例。当前 receipt 记录 12 个正常分支按规则通过，60 个缺陷分支全部失败关闭；结构与用例共 1498 条断言通过。

这一结果只证明当前 JSON 契约和 runner 对这些合成输入按预期作出 `PASS` 或 `BLOCK`，以及输入文件在 receipt 中具有可复核哈希。它不证明路线真实可达、模型有效、设备安全、公众接受、服务公平、数据处理合法、资金可得、采购可行或现场可以实施。真实观察值继续保持待获取状态；后续如获授权，应另行预登记样本、阈值、人员、场地、投诉、事故和退出方法，并由相应专业人员与有权主体复核。

## 交接给后续专业与公众过程

v2.2 的价值在于把“建议做什么”进一步拆成“为什么、由谁复核、缺什么不能开始、失败时如何停止、退出后留下什么”。后续深化应优先补充正式 GIS/CAD、权属与建筑调查、交通和无障碍现场核验、文保、水务、市政、消防、生态、运营、采购与全寿命成本资料；同时通过可访问的线上、线下、电话、纸质和人工渠道邀请受影响公众参与。

在上述条件未满足前，RailWeave 仍是一套可讨论、可复算、可失败关闭的研究性接口，而不是已经确定的城市项目。任何引用者均应连同来源、假设、临时几何、权利声明和验证边界一起阅读，不应只截取效果图、成本比例或合成 PASS。

## English Brief

### In one sentence

RailWeave treats the Centennial Jing-Zhang corridor as a public warp that continues to support everyday urban life. Zhongzhiyuan, Beijing AI Origin Community, and Dazhongsi are not three isolated projects but three nodes woven together by public space, walking links, validation processes, talent services, and first-use scenarios. AI enters as a removable, stoppable, and reviewable weft; it does not replace ordinary access, staffed service, professional judgement, or statutory procedure.

This is a conceptual urban-design study for the open call. Its working extent, key-area locators, functional components, project list, time slices, cost-control bands, and responsibility roles remain subject to confirmation through official boundaries, site rights, baseline surveys, professional conditions, public participation, and all legally required procedures. It is not a government determination, planning permission, project approval, approved budget, procurement decision, partnership arrangement, investment commitment, construction programme, or engineering-feasibility finding.

### From spatial armature to a withdrawable service network

The proposal uses the Jing-Zhang railway-heritage public realm as a longitudinal warp and connections towards the Qinghe River, Xiaoyue River, universities, and Zhuanhe River as crosswise wefts. Together they organise controlled validation at Zhongzhiyuan, demand coordination at AI Origin, and first-use conversion at Dazhongsi. The three key areas have differentiated spatial and service interfaces: isolation, reproduction, fault injection, and independent validation in the north; all-age services, shared learning, human coordination, and problem translation in the centre; and real demand, lawful procurement, sustained-use review, and exit in the south. All locations remain temporary working locators and are not official redlines or evidence for ownership, retain–renovate–demolish decisions, building scale, road engineering, or underground connections.

This revision turns the abstract structure into a layered L4–L5 spatial working plan. A date-locked open basemap identifies road, walking and cycling, rail, named-station, water, building-orientation, and named Jing-Zhang park leads, while provisional geometry carries design tasks. Using the 2026-05-06 OSM named-park polygons and `SITE-001`, the archived planar minimum boundary-distance value in EPSG:4547 is approximately 412.684 m and is displayed to the nearest metre as approximately 413 m. Complete inputs, nearest points, query conditions, and non-survey limitations are recorded in `visual/assets/spatial_source_conflicts.json`. The result is registered as a source conflict rather than presented as alignment, and the whole package will be recalculated when the official boundary arrives. Using the brief's named-station clue, the Dazhongsi study window has been approximately translated while retaining its longitude and latitude spans; its projected area differs from the earlier window by about 0.027%. The window remains within `SITE-001`, and the named station lies about 90 m west of it. This does not establish an official key-area boundary, station entrance, or engineering alignment.

RailWeave is not primarily an exercise in adding automated facilities. It preserves a public-service warp that does not depend on a model, account, or network. Every AI scenario must state its public problem, warp safeguard, weft connection, node responsibility, prohibited data, human review, ordinary-service equivalence, unweaving trigger, and maintained residual. After a scenario stops, fixed signs, paper information, staffed service, failure records, maintenance instructions, or other confirmed public tools should remain usable. A scenario cannot enter the field without a maintenance steward and restoration resources.

### Two independent gates

Version 2.2 separates implementation decisions into two gates that cannot substitute for each other.

The Fabric Maturity Gate asks whether the city and project can carry a pilot. It reviews space and site rights, accessibility and ordinary passage, fire safety and other professional conditions, staffing and operating resources, data and equipment interfaces, exit resources, and the ability to restore the site. It does not ask whether a particular model performs well.

The Thread Admission Gate asks whether one AI service may enter that node. It reviews the public purpose, version and scope, prohibited data, human final decision, appeal, non-digital equivalent service, stop conditions, expiry review, and unweaving receipt. A ready space does not place an AI service into operation by default.

Field study requires both gates. A service that passes synthetic tests cannot bypass site, professional, or operating conditions; a project with space and funding cannot bypass data, human, public-interest, or exit review. The actual thresholds, accountable organisations, and sign-off methods remain to be lawfully determined by authorised entities and professional teams.

### S06: a 90-day all-age accessible-information slice

S06 uses the All-Age Accessible Information Service as a time-boxed subject for further professional study. Days 0–30 establish a non-AI baseline only. Professionals and representative users review critical routes together; record completion, waiting, distance, cost, and help requests for fixed signs, paper guides, telephone, and staffed service; and confirm data fields, inspection responsibility, and appeal channels. A critical barrier in the ordinary route or staffed service prevents progression.

Days 31–60 are closed synthetic and shadow validation. Synthetic route events test stale information, wrong advice, network loss, prohibited data, stopping, and restoration. AI advice does not become public-facing and is compared item by item by a human reviewer. Identity or disability profiling, unexplained misdirection, or failure to unweave returns the prototype for correction.

Days 61–90 may study limited co-testing only if site, data, professional, public, and operating authorisations are all in place. Staffed, telephone, paper, tactile, and fixed-sign channels continue to provide ordinary service. Refusing AI should not add cost, waiting penalties, or an off-site journey. Day 90 produces a recommendation to renew, correct, pause, or exit; there is no automatic extension or spatial expansion.

S06 also requires a future lawfully confirmed 90-day pilot cost plan to identify exit-restoration resources sufficient for dynamic-interface shutdown, data clearance and access revocation, sign correction, restoration of staffed service, equipment removal, site repair, and independent exit review. No fixed percentage or amount is prescribed at this stage. Quantities, prices, responsibilities and funding sources must be verified and lawfully determined before entering any budget or procurement document.

### What the 72 synthetic branches prove

`visual/assets/weave_contracts.json` contains one RailWeave weave contract for each of S01–S12. A standard-library runner executes six synthetic branches per scenario: normal, missing human review, missing ordinary-service equivalence, prohibited-data input, responsibility drift, and failed unweaving. The 72-case receipt records 12 normal branches passing and all 60 defective branches failing closed. A total of 1,498 structural and case assertions pass.

This result proves only that the current JSON contracts and runner return the expected `PASS` or `BLOCK` for those synthetic inputs and that the receipt records checkable hashes for its inputs. It does not prove real route accessibility, model effectiveness, equipment safety, public acceptance, service equity, lawful data processing, available funding, feasible procurement, or field implementability. Real observations remain pending. If a future pilot is authorised, its sample, thresholds, people, site, complaints, incidents, and exit methods must be preregistered separately and reviewed by the relevant professionals and authorised entities.

### Handover to professional and public processes

The contribution of v2.2 is to decompose “what is proposed” into “why it is proposed, who reviews it, which missing conditions prevent a start, how failure stops the activity, and what remains after exit.” Further work should prioritise official GIS/CAD, site-rights and building surveys, field checks for transport and accessibility, and evidence for heritage, water, municipal systems, fire safety, ecology, operations, procurement, and whole-life cost. Affected publics should participate through accessible online, offline, telephone, paper, and staffed channels.

Until those conditions are met, RailWeave remains a research interface that can be discussed, recalculated, and made to fail closed, not a determined urban project. Any reuse should preserve its sources, assumptions, provisional geometry, rights statement, and verification boundary rather than extracting only a rendering, cost percentage, or synthetic PASS.
