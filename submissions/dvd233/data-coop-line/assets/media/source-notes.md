# 数据合作社、数据捐赠与城市数据公地：一手来源核验

- 核验日期：2026-08-14
- 适用方案：`submissions/dvd233/data-coop-line/`
- 资料状态：参赛方案自采的公开一手来源，建议统一按 `background_only` 使用；尚未进入 `data/source_registry.json`，不得表述为中央来源登记表已经批准的 formal 依据。

## 使用边界

本笔记服务于 `agent_taskbook.json` 要求的全球 AI 创新生态案例、场景开放机制、公共利益治理和长期运营设计。案例可支持“为什么建议设置某种组织、流程或空间载体”的背景论证，不能替代中国现行法律、项目法定规划条件、官方红线、数据权属判断、政府批准或实施承诺。

“可合法引用”在这里指：引用公开网页的少量事实，采用自行概括的中文表达，清楚标注发布者、URL 和访问日期。不从来源页面复制图片、视频、图表、Logo、长段文字或网页视觉资产；除非来源另有明确许可，不推定网页内容可以再分发。MIDATA 所称 GPLv3 只覆盖其开源软件，不自动覆盖网页文字和图片。荷兰国家算法登记册明确允许复用一般网页文本（另有限制标记的内容除外），但图片通常不得复用；本方案仍宜只做事实转述和链接引用。

## 筛选结论

| source_id | 案例 | 类型 | 最适合支撑的主张 | 核心转译 |
|---|---|---|---|---|
| `CASE-LCR-CIVIC-DATA-COOP` | Liverpool City Region Civic Data Cooperative | 城市数据合作/参与式受托 | 城市数据基础设施可与公共服务共创、社区参与和长期承接机构同时设计 | 数据合作社会员厅、受托审议室、隐私保护数据沙箱、社区章程 |
| `CASE-MIDATA-COOPERATIVE` | MIDATA Cooperative | 个人数据合作社 | 可把选择性授权、会员治理、撤回和访问留痕做成同一制度闭环 | 动态同意台账、会员大会、用途授权、撤回入口、访问日志 |
| `CASE-EU-DECODE-732546` | DECODE Barcelona/Amsterdam pilots | 城市数据公地试点 | 数据主体可通过开放标准和细粒度授权参与城市数据协作 | 用途令牌、开放治理协议、隐私保护公民感知、开源工具链 |
| `CASE-AMDEX-DATA-EXCHANGE` | AMdEX | 中立数据交换/数字公证 | 共享协议可以被翻译成可机器执行、监控和审计的规则 | 数据不集中搬运、机器可执行用途/期限条款、审计与争议处理 |
| `CASE-OPEN-HUMANS` | Open Humans | 自愿数据捐赠与社群研究 | 数据捐赠应区分接收方和公开层级，并提供删除与退出路径 | 分级可见、接收方清单、账户删除、备份删除时限、风险告知 |
| `CASE-ODI-GLA-GREENWICH-DATA-TRUST` | ODI × GLA/Greenwich data trust pilot | 城市数据受托试点 | 独立受托治理的重点是决定谁能因何目的、为谁利益访问数据 | 独立受托委员会、目的审查、利益冲突、申诉与年度公开报告 |
| `CASE-AMSTERDAM-ALGORITHM-REGISTER` | Amsterdam entries in the Dutch Algorithm Register | 公共算法透明 | 城市 AI 运行应有公众可查的用途、状态、影响评估和停用记录 | 算法/数据使用登记、影响评估、联系人、版本与停用档案 |
| `CASE-EU-CITCOM-AI-TEF` | CitCom.ai | 城市 AI 测试与实验设施 | 数据合作机制需要与真实城市试验、验证和监管沙盒衔接 | 物理+虚拟测试单元、分级验证、监管沙盒接口、跨节点复用 |

## 1. Liverpool City Region Civic Data Cooperative

- 推荐 `source_id`：`CASE-LCR-CIVIC-DATA-COOP`
- 原始/官方 URL：<https://www.liverpool.ac.uk/civic-health-innovation-labs/research/completed-projects/cdc/>
- 发布者：University of Liverpool，Civic Health Innovation Labs；页面说明该项目由 Liverpool City Region Combined Authority 与 University of Liverpool 于 2020 年共同设立。
- 核验日期：2026-08-14
- 来源性质：项目完成后的运营方/承接机构一手总结。

### 页面实际证明的内容

页面把五年项目模型概括为三条互相连接的工作线：安全、隐私保护的数据基础设施；公共服务、居民、研究者和企业共同设计的数据赋能解决方案；让社区参与决定数据和 AI 如何被治理、访问和应用。页面还说明原项目资金在 2026 年结束后，其使命由 Civic Health Innovation Labs 和 LCR Civic HealthTech Innovation Zone 承接，并继续以社区数据与 AI 章程作为透明、问责和公众声音的制度基础。

### 可用于何种主张

- 城市数据合作不只是建设数据库，还需要把技术设施、公共服务问题和公众参与放进同一个运营模型。
- 短期项目资金结束前应预先指定长期承接机构、章程和维护责任。
- 城市数据可被表述为需要受托治理的“共享社区资产”，但不能据此推断其法律所有权属于社区。

### 可迁移机制

在京张沿线设置“数据合作社会员厅 + 隐私保护数据沙箱 + 公共问题征集台 + 受托审议室”四联空间；建立居民、园区企业、高校、公共服务机构四方参与的章程委员会；每个场景先登记公共问题、数据最小化方案、允许用途、退出方式和承接单位，再进入测试。

### 不可过度推断

- 页面没有证明所有居民都成为合作社会员，也没有证明居民拥有全部城市数据。
- 页面没有提供可归因于该项目的经济增长、健康改善或算法公平量化结果。
- 同页指向的 Liverpool City Region Digital Commons 门户在本次访问时首页统计显示 `0 Datasets / 0 organisations / 0 Groups / 0 Resources`；因此不能仅凭门户使命说明声称其当前已有大量可用数据。门户可作为后续核查线索：<https://lcrdigitalcommons.com/>。

### 权利与引用说明

未在目标页面确认通用开放内容许可。只转述上述事实并保留链接与发布者，不复用网页图片、品牌视觉或长段原文。

## 2. MIDATA Cooperative

- 推荐 `source_id`：`CASE-MIDATA-COOPERATIVE`
- 原始/官方 URL：<https://www.midata.coop/en/cooperative/>
- 发布者：MIDATA Cooperative（Zurich, Switzerland）
- 核验日期：2026-08-14
- 来源性质：合作社自述及治理说明；页面显示 2026-07-17 有更新。

### 页面实际证明的内容

MIDATA 页面称其为 2015 年成立的非营利合作社，运营个人数据平台并作为数据收集的受托方。账户持有人可对医疗研究和临床研究授予选择性访问，可成为合作社会员并通过会员大会参与治理。页面明确写明会员可随时撤回个人数据、所有数据集加密、每次访问留痕，净盈余重新投入平台公共服务。页面也说明 Open MIDATA Server 软件以 GNU GPLv3 发布。

### 可用于何种主张

- “数据捐赠”不应等同一次性、无限期、全用途转让；可以采用逐项目选择性访问和持续控制。
- 合作社治理可以让数据账户持有人同时成为规则制定参与者。
- 撤回、加密和访问日志应被写进产品与运营流程，而不只是隐私口号。

### 可迁移机制

设计“场景—数据—用途—期限—接收方”五联动态同意单；同意记录默认有期限，到期自动复核；设置会员大会、公共利益席位、技术与法律顾问席位；每次访问形成可查询日志；居民可从线下服务台、无障碍网页或人工热线提出暂停、撤回和删除请求。

### 不可过度推断

- 瑞士合作社制度和健康数据规则不能直接替代中国数据、个人信息、网络安全或医疗监管要求。
- “可随时撤回个人数据”不等于可以删除已经依法匿名化的研究成果、已发布统计结果或第三方合法保留副本；具体效果需由本项目规则和适用法律另行界定。
- GPLv3 是软件许可证，不是网页文字、Logo、图片或数据的统一开放许可。

### 权利与引用说明

可引用合作社自述的组织和流程事实。网页资产不作再分发；如复用其开源软件，应另行核对具体代码仓库、版本、许可证文本和依赖。

## 3. EU DECODE：Barcelona 与 Amsterdam 城市试点

- 推荐 `source_id`：`CASE-EU-DECODE-732546`
- 原始/官方 URL：<https://cordis.europa.eu/project/id/732546>
- 发布者：European Commission CORDIS；项目由 Institut Municipal Barcelona Innovacio i Tecnologia 协调。
- 核验日期：2026-08-14
- 来源性质：欧盟研究项目事实页；项目期为 2016-12-01 至 2019-12-31，页面标记 `Project closed`。

### 页面实际证明的内容

CORDIS 事实页说明 DECODE 研发面向在线身份、个人及其他数据和集体治理的分布式开放架构；数据主体可通过灵活授权和开放标准协议决定信息访问权；架构在 Barcelona 与 Amsterdam 的数字民主、公民感知和协作经济领域进行了四个试点。项目目标是让公民生产、访问和控制数据，并探索去中心化、可持续、commons-based 的数据经济。

### 可用于何种主张

- 城市数据公地可以把细粒度访问权和开放治理协议嵌入技术架构。
- 公民感知、数字民主和协作经济可作为同一数据公地的不同试验类型。
- 开源工具、开放挑战和社会创新者参与可以构成数据公地的创新生态入口。

### 可迁移机制

为京张场景发行“用途令牌”：只包含指定数据字段、接收方、目的、期限和撤回入口；对非个人公共数据使用开放目录，对个人或敏感数据使用受控沙箱；场景上线前开放规则评议和小规模公民测试；将协议模板、数据字典和非敏感代码作为可复用公共资产发布。

### 不可过度推断

- DECODE 已于 2019 年结束，不能写成 Barcelona 或 Amsterdam 当前仍普遍运行的常设城市制度。
- CORDIS 事实页证明项目目标、架构与试点范围，不足以证明大规模采用、长期财政可持续或城市级社会成效。
- 页面写明数据主体决定访问权，但没有在该事实页明确承诺“所有数据和所有衍生结果均可随时撤回”。

### 权利与引用说明

CORDIS 是欧盟官方项目事实页。正文可用短事实转述和链接；不从页面复制项目图像或第三方附件，除非单独核对附件权利。

## 4. AMdEX

- 推荐 `source_id`：`CASE-AMDEX-DATA-EXCHANGE`
- 原始/官方 URL：<https://amdex.eu/about/>
- 发布者：AMdEX；页面列明发起方为 AMS-IX、SURF、University of Amsterdam、DEXES 与 Amsterdam Economic Board，并获 European Regional Development Fund 共同资助。
- 核验日期：2026-08-14
- 来源性质：项目/运营方一手说明。

### 页面实际证明的内容

AMdEX 将自身描述为创新 fieldlab，开发和测试把现实世界数据共享政策翻译为数字协议的服务，使协议可被执行、监控和控制。其目标是提供中立基础设施，让数据所有方保留控制，并提供可审计机制。页面在“Collaborative governance”部分使用将来时，称 AMdEX 将被置于合作实体手中。

### 可用于何种主张

- 数据合作不必以集中收走全部原始数据为前提；可以把控制留在数据持有方，并以中立交换层执行协议。
- 法律、联盟政策和技术执行之间需要机器可读的衔接层。
- 审计追踪和争议处理应成为数据交换的基础服务。

### 可迁移机制

设置“京张数据公证层”：数据仍保存在高校、企业、社区或公共机构原系统；交换层只发放可验证访问凭证并执行用途、字段、期限、频次和再共享限制；为每次访问生成不可抵赖但不暴露敏感内容的审计记录；设立协议模板库和争议仲裁流程。

### 不可过度推断

- AMdEX 自述中的“中立”“可信”“合规”属于设计目标，不能自动证明任何具体交易已经合法、安全或公平。
- 页面称合作实体治理为未来安排，不能写成已经完全落地并经独立验证的合作社治理。
- 其制度与技术不能替代本项目所需的个人信息保护影响评估、数据分类分级、网络安全和主管部门审查。

### 权利与引用说明

页面标有 copyright。只转述机制事实并引用链接；不复用网页图形、视频、Logo 或代码。若采用软件或协议实现，需另查相应仓库和许可证。

## 5. Open Humans

- 推荐 `source_id`：`CASE-OPEN-HUMANS`
- 原始/官方 URL：<https://www.openhumans.org/about/>；数据政策：<https://www.openhumans.org/data-use/>
- 发布者：Open Humans Foundation，501(c)(3) nonprofit
- 核验日期：2026-08-14
- 来源性质：平台运营方说明与现行数据政策。

### 页面实际证明的内容

Open Humans 允许个人导入个人数据，并选择向研究者、其他成员或公众分享；只有被选择的接收方可访问个人账户数据。数据政策称非公开个人数据原则上在取得同意并告知共享内容和接收方后才对外提供，但也列出法律程序、紧急伤害预防、服务提供商等例外。账户或文件可随时删除，账户数据和关联文件会从主数据库立即移除，受限备份在 60 天后永久删除。政策同时提醒，第三方项目对其自身数据实践负责。

### 可用于何种主张

- 自愿数据贡献应当把“给谁、给什么、公开到何种程度”分开选择。
- 撤回机制需要给出主系统删除与备份删除的不同时间边界。
- 参与者必须在捐赠前看到可识别性和第三方接收风险，而非只看到公共利益叙事。

### 可迁移机制

提供私有、合作社受托、指定项目、公开四级可见性；建立接收方清单和逐项授权；在无障碍网页与线下柜台同时提供账户暂停、文件删除和整户退出；明确主系统处理时限、备份清除时限、已经向第三方披露后的边界；对公开数据设置二次确认和风险提示。

### 不可过度推断

- 删除平台账户不能保证第三方已下载的数据、已经形成的研究结果或公开内容的所有副本同步消失。
- Open Humans 是美国非营利平台，不是城市政府数据合作社，也不能证明其模式符合中国特定场景的监管要求。
- 平台成员数和活动数是运营方实时自报，不宜用作本项目效益预测。

### 权利与引用说明

平台代码开源不代表网页内容、成员数据或第三方项目资料可自由复用。本方案只引用政策条款的概括，不复制成员数据或页面资产。

## 6. ODI × Greater London Authority / Royal Borough of Greenwich 数据受托试点

- 推荐 `source_id`：`CASE-ODI-GLA-GREENWICH-DATA-TRUST`
- 原始/项目 URL：<https://theodi.org/insights/projects/data-trusts/>
- 发布者：Open Data Institute；页面说明其与 UK Office for Artificial Intelligence、Innovate UK 合作。
- 核验日期：2026-08-14
- 来源性质：实施机构对三项 data trust 研究与试点的汇总页，其中包括 GLA/Greenwich 城市数据试点。

### 页面实际证明的内容

ODI 将 data trust 作为可信数据受托的一种路径，并把试点中的 data trust 描述为提供独立数据受托的法律结构。页面明确列出 Greater London Authority 与 Royal Borough of Greenwich 的城市数据试点，同时强调数据受托只是多种数据访问和治理路径之一。

### 可用于何种主张

- “数据信托”不是技术数据库的别名，其核心是独立受托、访问决策、目的与公共利益边界。
- 在采用信托一词前，应先明确法律载体、受托义务、决策人和问责方式。
- 合作社、信托、数据交换和开放数据目录是不同工具，不应混称。

### 可迁移机制

建立独立受托委员会，席位覆盖居民/残障人士与老年人代表、数据贡献方、场景使用方、公共服务和法律伦理专家；按“谁申请—何种数据—何种目的—预期谁受益—替代方案—退出与申诉”审议；发布年度访问统计、拒绝理由分类、投诉处理和风险事件摘要。

### 不可过度推断

- 该页面描述的是 2018–2019 前后的研究与试点，不能写成 GLA/Greenwich 已经建立并持续运营永久城市数据信托。
- ODI 明确认为 data trust 只是众多治理路径之一；不能把它写成适用于所有数据或所有组织的最佳唯一方案。
- 英国法律结构不能直接移植为中国法定“信托”安排；在本方案中更稳妥的表述是“独立受托治理机制（概念建议）”。

### 权利与引用说明

只引用 ODI 项目事实和其对 data trust 的概括，不复制报告图表或案例页面视觉资产；如需使用具体法律结论，应另行读取并核对其完整法律报告。

## 7. Amsterdam 在荷兰国家算法登记册中的公开登记

- 推荐 `source_id`：`CASE-AMSTERDAM-ALGORITHM-REGISTER`
- 城市条目 URL：<https://algoritmes.overheid.nl/nl/organisatie/gm0363/gemeente-amsterdam>
- 登记册说明：<https://algoritmes.overheid.nl/nl/footer/over>
- 版权/复用说明：<https://algoritmes.overheid.nl/nl/footer/copyright>
- 发布者：Dutch National Algorithm Register；具体算法描述由 Gemeente Amsterdam 发布。
- 核验日期：2026-08-14
- 来源性质：政府公共登记平台及城市机构自报条目。

### 页面实际证明的内容

Amsterdam 组织页列出多种在用、开发中或停用的算法/AI 系统，并显示用途摘要、发布类别、状态及已登记的影响评估类型，例如 DPIA、IAMA、Privacy Quickscan。登记册说明页称其目标包括提高政府算法的可查找性、可解释性和社会监督能力。版权页允许复用一般网页文本，除非某部分另有版权限制；图片通常不得复用，除非明确授权。

### 可用于何种主张

- 城市 AI 场景上线后仍需持续登记，而不是只在试点审批时留一份材料。
- 公众登记应包含用途、运行状态、影响评估、责任机构和停用历史。
- 数据合作社的内部访问日志应与面向公众的算法/场景登记册配套。

### 可迁移机制

设置“京张 AI 场景公开登记台”：每项场景发布责任主体、目的、数据类别、影响人群、是否作出影响权益的决定、人工复核、影响评估、投诉入口、上线/暂停/停用日期和版本；在公共空间设置二维码与非数字化纸质/人工查询路径；保留停用记录而不是删除历史。

### 不可过度推断

- 登记意味着信息被公开，不代表算法已经被独立认证为合法、公平、安全或准确。
- 不同条目的字段完整度不一，页面可见部分记录的影响评估栏为空；因此不能声称所有系统均已完成影响评估。
- 荷兰登记字段和监管体系只能作为治理案例，不能替代中国的合规评估或批准程序。

### 权利与引用说明

可按登记册版权页复用一般文本，但本方案仍采用自行概括、标注来源的最小引用方式。不得复用没有明确授权的图片、视频或信息图。

## 8. CitCom.ai：欧盟城市与社区 AI 测试和实验设施

- 推荐 `source_id`：`CASE-EU-CITCOM-AI-TEF`
- 原始/官方 URL：<https://digital-strategy.ec.europa.eu/en/policies/testing-and-experimentation-facilities>
- 发布者：European Commission，Shaping Europe’s Digital Future
- 页面最后更新：2025-05-21
- 核验日期：2026-08-14
- 来源性质：欧盟委员会政策与项目说明页。

### 页面实际证明的内容

欧盟委员会将 Testing and Experimentation Facilities 描述为向技术提供者开放的大规模参考设施，结合物理与虚拟设施，在真实环境中支持 AI 软硬件的集成、测试、验证和示范，并可与主管机关合作支持监管沙盒。CitCom.ai 是面向智慧城市与社区的永久测试设施网络，按 Nordic、Central、South 三个 super nodes 及卫星/子节点组织，覆盖 POWER、MOVE、CONNECT 三类主题；页面称其五年项目目标包括长期财务可持续。

### 可用于何种主张

- 数据合作社不能只停留在数据授权界面，还需要可控的真实城市试验、分级验证和停止机制。
- 物理空间、虚拟设施、监管沙盒和跨区域节点可以构成同一测试基础设施网络。
- 城市 AI 场景应先验证再扩大，不应直接把试点当成常态公共服务。

### 可迁移机制

把京张沿线组织为“一个治理总台 + 三个重点区测试节点 + 若干卫星场景”：数据合作社总台负责授权、受托审查和审计；重点区提供室内/半开放/真实公共空间三级测试；每项试验预设准入、监测、人工接管、暂停、退出、复盘和跨节点复用条件；高影响场景进入主管部门指导下的监管沙盒接口。

### 不可过度推断

- “permanent”描述网络设施定位，不证明每一处节点、每项服务或所有资金已经永久锁定。
- “expected to achieve long-term financial sustainability”是预期，不是已经实现的财务结果。
- 欧盟监管沙盒和 AI Act 语境不能直接移植为中国项目的许可或豁免机制。

### 权利与引用说明

该页可作为欧盟官方政策/项目事实来源。只做事实概括和链接引用；不复用页面图片或项目品牌资产。

## 跨案例转译：建议形成的京张闭环

1. **加入与贡献**：居民、科研团队、园区企业、公共服务机构可选择加入；个人数据默认不进入公共目录，按项目逐项授权。
2. **动态同意**：记录数据字段、目的、接收方、期限、再共享限制、人工复核和撤回入口；提供网页、电话、线下服务台和无障碍格式。
3. **独立受托**：合作社会员治理与独立受托委员会分工；前者决定长期章程，后者审议具体访问申请和利益冲突。
4. **数据不集中搬运**：优先采用受控访问、联合计算或沙箱；交换层执行机器可读协议并生成审计日志。
5. **先试后扩**：在物理+虚拟测试单元内验证准确性、安全、公平、可达性、人工接管和退出，再决定是否扩大。
6. **公开登记**：对外公布场景用途、数据类别、责任主体、影响评估、运行状态、投诉和停用历史；公开登记不替代独立审计。
7. **撤回与善后**：区分停止未来访问、删除主系统数据、清除备份、第三方既有副本、已匿名化结果和已发布统计，明确每类边界与时限。
8. **长期承接**：试点开始时即指定运营主体、年度公开报告、维护资金、退出条件和项目资金结束后的承接安排。

## 建议追加到 `sources.json` 的结构化条目

以下仅为建议，由主任务整合；本研究未修改 `sources.json`。字段在现有 `id/url/source_type/usage` 基础上增加发布者、访问日期、用途层级、许可和限制，便于后续人工审查。

```json
[
  {
    "id": "CASE-LCR-CIVIC-DATA-COOP",
    "title": "Civic Data Cooperative (CDC)",
    "publisher": "University of Liverpool, Civic Health Innovation Labs",
    "url": "https://www.liverpool.ac.uk/civic-health-innovation-labs/research/completed-projects/cdc/",
    "accessed_date": "2026-08-14",
    "source_type": "public_primary_case",
    "usable_for_formal": "background_only",
    "usage": "Participatory civic data stewardship, privacy-preserving infrastructure, public-service co-design, and post-project operating succession.",
    "license_or_terms": "Public webpage; no blanket content-reuse licence confirmed. Cite factual paraphrases and URL only.",
    "usage_limit": "Does not prove community legal ownership of all city data, universal resident membership, or quantified social/economic outcomes."
  },
  {
    "id": "CASE-MIDATA-COOPERATIVE",
    "title": "MIDATA Cooperative",
    "publisher": "MIDATA Cooperative",
    "url": "https://www.midata.coop/en/cooperative/",
    "accessed_date": "2026-08-14",
    "source_type": "public_primary_case",
    "usable_for_formal": "background_only",
    "usage": "Selective data access, cooperative member governance, withdrawal, encryption, access logging, and nonprofit reinvestment.",
    "license_or_terms": "Web content licence not inferred; GPLv3 statement applies to Open MIDATA Server software, not automatically to page content or data.",
    "usage_limit": "Not a Chinese-law compliance precedent; withdrawal does not automatically erase lawful third-party copies or completed results."
  },
  {
    "id": "CASE-EU-DECODE-732546",
    "title": "Decentralised Citizens Owned Data Ecosystem (DECODE)",
    "publisher": "European Commission CORDIS",
    "url": "https://cordis.europa.eu/project/id/732546",
    "accessed_date": "2026-08-14",
    "source_type": "official_public_case",
    "usable_for_formal": "background_only",
    "usage": "Flexible data-access entitlements, open data-governance agreements, and Barcelona/Amsterdam pilots in digital democracy, citizen sensing, and collaborative economy.",
    "license_or_terms": "Use attributed factual paraphrase from the official project fact sheet; third-party assets and attachments require separate rights checks.",
    "usage_limit": "Project closed in 2019; not evidence of a current permanent citywide regime or long-term impact."
  },
  {
    "id": "CASE-AMDEX-DATA-EXCHANGE",
    "title": "AMdEX",
    "publisher": "AMdEX",
    "url": "https://amdex.eu/about/",
    "accessed_date": "2026-08-14",
    "source_type": "public_primary_case",
    "usable_for_formal": "background_only",
    "usage": "Machine-enforceable data-sharing agreements, neutral exchange infrastructure, auditability, and collaborative governance design.",
    "license_or_terms": "Copyrighted project webpage; cite factual paraphrases and URL only unless a separate asset licence is verified.",
    "usage_limit": "Cooperative governance is described prospectively; the page does not independently certify every exchange as compliant, secure, neutral, or fair."
  },
  {
    "id": "CASE-OPEN-HUMANS",
    "title": "Open Humans",
    "publisher": "Open Humans Foundation",
    "url": "https://www.openhumans.org/about/",
    "policy_url": "https://www.openhumans.org/data-use/",
    "accessed_date": "2026-08-14",
    "source_type": "public_primary_case",
    "usable_for_formal": "background_only",
    "usage": "Recipient-specific voluntary data sharing, visibility choices, account deletion, backup deletion timing, and third-party risk disclosure.",
    "license_or_terms": "Open-source software status does not grant reuse rights to member data or all website content; cite policy facts only.",
    "usage_limit": "Platform deletion cannot be described as guaranteed deletion of all third-party copies, published data, or completed research outputs."
  },
  {
    "id": "CASE-ODI-GLA-GREENWICH-DATA-TRUST",
    "title": "Data Trusts research and Greater London Authority / Royal Borough of Greenwich pilot",
    "publisher": "Open Data Institute",
    "url": "https://theodi.org/insights/projects/data-trusts/",
    "accessed_date": "2026-08-14",
    "source_type": "public_primary_case",
    "usable_for_formal": "background_only",
    "usage": "Independent data stewardship, purpose-and-benefit access decisions, and an urban data-trust pilot reference.",
    "license_or_terms": "Cite attributed factual paraphrases; verify rights separately before reproducing report figures or long excerpts.",
    "usage_limit": "Research/pilot evidence only; not proof of a permanent operational London data trust and not a Chinese-law trust structure."
  },
  {
    "id": "CASE-AMSTERDAM-ALGORITHM-REGISTER",
    "title": "Gemeente Amsterdam entries in the Dutch Algorithm Register",
    "publisher": "Dutch National Algorithm Register / Gemeente Amsterdam",
    "url": "https://algoritmes.overheid.nl/nl/organisatie/gm0363/gemeente-amsterdam",
    "accessed_date": "2026-08-14",
    "source_type": "official_public_case",
    "usable_for_formal": "background_only",
    "usage": "Public algorithm inventory with purpose, lifecycle status, impact category, and recorded assessment types.",
    "license_or_terms": "Registry states general text may be reused unless restrictions are marked; images normally require explicit permission. Attribution retained.",
    "usage_limit": "Registration is transparency, not independent certification of legality, fairness, security, accuracy, or assessment completeness."
  },
  {
    "id": "CASE-EU-CITCOM-AI-TEF",
    "title": "CitCom.ai Testing and Experimentation Facility for Smart Cities and Communities",
    "publisher": "European Commission, Shaping Europe’s Digital Future",
    "url": "https://digital-strategy.ec.europa.eu/en/policies/testing-and-experimentation-facilities",
    "published_or_updated_date": "2025-05-21",
    "accessed_date": "2026-08-14",
    "source_type": "official_public_case",
    "usable_for_formal": "background_only",
    "usage": "Physical and virtual real-world AI testing, validation, demonstration, networked city nodes, and regulatory-sandbox interfaces.",
    "license_or_terms": "Use attributed factual paraphrase from the European Commission page; do not reuse visual assets without a separate rights check.",
    "usage_limit": "Long-term financial sustainability is an expectation, not a verified achieved result; EU regulatory sandboxes do not confer Chinese approvals."
  }
]
```

## 正文引用建议

正文每个设计判断只邻接 1–3 条关键引用，完整限制保留在 `sources.json`。可采用以下表述：

- “参考 Liverpool 的参与式数据受托模型与 MIDATA 的选择性授权/撤回机制，本方案提出数据合作社会员治理与独立访问审议分层运行；这是概念建议，不构成数据权属或合规结论。`[source:CASE-LCR-CIVIC-DATA-COOP] [source:CASE-MIDATA-COOPERATIVE]`”
- “参考 AMdEX 的机器可执行共享协议与 Open Humans 的接收方选择、删除时限边界，本方案把用途、期限、接收方、撤回和第三方副本限制写入场景卡。`[source:CASE-AMDEX-DATA-EXCHANGE] [source:CASE-OPEN-HUMANS]`”
- “参考 Amsterdam 的公开算法登记和 CitCom.ai 的真实环境分级测试，本方案设置先试后扩、状态可查、可暂停、可退出的城市 AI 场景门禁。`[source:CASE-AMSTERDAM-ALGORITHM-REGISTER] [source:CASE-EU-CITCOM-AI-TEF]`”
