---
title: "共檐京张 / JINGZHANG COMMON EAVES：把园区边界变成 AI 公共界面"
author_github: "cygaber"
language: "zh"
license: "COMMUNITY-DISPLAY-ONLY"
summary: "以内核有界、檐下共益为原则，把京张遗址公园作为共同前庭与地址系统，把园区、校园、企业、车站和社区之间的候选边界转化为 P0—P3 分级开放、可人工降级的 AI 公共界面；三处重点区域分别形成验檐、创檐与用檐。"
tracks: ["ai-traffic-walkability"]
scenarios: ["ai-traffic-walkability"]
iteration: "v1.0"
---

# 共檐京张 / JINGZHANG COMMON EAVES

> **核心命题：内核有界，檐下共益 / Secure cores. Civic edges.** 园区不必全面开放，也能在安全边界之外持续向城市交付公共价值。本文所有空间动作均为“概念建议”“参考方案”或“可供专业团队深化研究”的材料，不构成法定规划、政府审定、工程可行性、投资承诺或地块拆改留结论。

## 设计依据与资料清单

本方案把证据分成四级，而不是把所有公开信息混成一张“事实底图”。第一级是项目自身的公告、网站任务包与智能体任务书，它们决定三层范围、任务清单、表达边界和征集语境，分别记录为 [source:OFFICIAL-ANNOUNCEMENT]、[source:SITE-PACKAGE] 与 [source:AGENT-TASKBOOK]；[standard:PROJECT-OFFICIAL-ANNOUNCEMENT] 约束公告任务响应，[standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK] 约束三大定位、五大功能和六项智能体任务。第二级是本地保存的专业标准快照：[standard:MOHURD-URBAN-DESIGN-MEASURES] 用于检查空间、风貌与建筑界面的统筹，[standard:MOHURD-CONTROL-DETAILED-PLANNING] 用于区分设计建议和待确认控规条件，[standard:MNR-LAND-USE-CLASSIFICATION-GUIDE] 用于约束用地编码；[standard:MOHURD-ARCH-DESIGN-DEPTH-2016] 因缺少可核验官方附件，只登记为资料缺口，不被用来证明建筑施工图深度。

第三级是可追溯的背景资料：公开来源总表 [source:SOURCE-REGISTRY] 和处理后的事实包 [source:PROCESSED-FACT-PACK] 只承担导航与交叉核对，不自动升级来源可信等级。京张遗址公园开放空间、沿线社区服务与阶段性建设背景分别由 [source:CONTEXT-JZ-PARK-2024]、[source:CONTEXT-JZ-PARK-2026] 提供；清华园车站等历史线索由 [source:CONTEXT-QINGHUAYUAN-HERITAGE] 提供；区域创新与更新方向由 [source:CONTEXT-HAIDIAN-15TH-PLAN] 提供。上述背景不能替代官方红线、控规、道路红线、权属、市政容量、文保范围或工程勘察。第四级是临时空间约束：[source:BOUNDARY-SOURCE] 和 [source:KEY-AREA-SOURCE] 提供的多边形明确标注为 provisional；[data:geometry/site_boundary.geojson#SITE-001] 与 [data:geometry/key_areas.geojson] 仅用于本次概念生成、图面定位和自检，不是官方界址。

资料不足本身也是设计输入。[data:geometry/constraints.geojson] 将边界精度、控规、道路、建筑现状、权属、市政、防洪、消防、文保等缺项表示为“分析提醒层”，绝不把未知写成禁止建设或已知控制线。可核验层、推演层和缺口层分开，使人类评审者能从正文回到 `sources.json`、`assumptions.json`、三类矩阵与自检结果。现状诊断以“哪些关系可确定、哪些数值可复算、哪些判断必须暂停”为主，而非制造伪精确；这对应 [depth:existing_conditions_diagnosis] 与 [depth:risk_missing_data]。后续如收到官方边界或专业附件，应保留设计逻辑、替换约束层并触发全量重算，而不是把本稿的临时坐标固化为结论。

![证据、空间结构与设计主张总览](assets/figures/site-overview.png)

## 三层范围工作框架

三层范围不是三套互不相干的图，而是一条从区域协同到日常门槛的证据链。统筹研究范围回答“AI 创新如何与城市共同生活”：以百年京张文化带、都市 AI 生活体验带、AI 融合创新带三重定位观察产业、人才、社区和公共空间之间的关系，不制造新增红线。总体设计范围回答“公共界面如何成网”：把京张遗址公园作为共同前庭与地址系统，在临时范围内用候选边界、建筑原型、慢行、蓝绿、公共空间和分期图层验证“三檐、六缝、十二间”的服务协议。重点区域范围回答“最小动作如何在不同门槛落地”：众智园形成验檐、AI 原点形成创檐、大钟寺形成用檐，三者使用同一剖面语言但不复制同一功能。[depth:three_level_scope_framework] 因而不是面积层级表，而是“战略问题—空间原型—运营责任”的逐级落实。

总体约束采用 [data:geometry/site_boundary.geojson#SITE-001]，三处重点区采用 [data:geometry/key_areas.geojson#PROV-KEY-001]、[data:geometry/key_areas.geojson#PROV-KEY-002]、[data:geometry/key_areas.geojson#PROV-KEY-003]。当前 [metric:site_area_sqm] 与三处面积仅是 EPSG:4548 下对 provisional polygon 的几何复算值，可用于校验本包图层闭合，不能用于土地、投资、法定指标或方案优劣的正式评分；[metric:key_area_count] 只证明三个方向性研究对象被完整覆盖。官方 polygon 到位后，应替换 site/key-area 两层，重新裁切 [data:geometry/land_use.geojson]、[data:geometry/buildings.geojson]、[data:geometry/roads.geojson]、[data:geometry/green_space.geojson]、[data:geometry/public_space.geojson] 与 [data:geometry/phasing.geojson]，并重算所有面积、长度和比例。

“共檐”刻意采用**边界型公共基础设施**而不是孤立中心建筑：它优先落在园区与街区、站点与公园、科研与生活之间的候选阈值，让两侧能在不分享全部内部权限的前提下分享一段可达、可停、可问、可验证的公共界面。剖面由城市侧向机构侧依次为：P0 无需注册的公共前檐（无障碍、遮荫、纸面信息、人工求助）；P1 预约共享空间（开源门诊、成果解释、人才服务和小型活动）；P2 受控测试前室（隔离数据、日志、物理停机与强制人工复核）；P3 非开放安全内核（实验室、企业数据和关键设施）。最小可用门槛是 P0 加一个有明确时段的人工服务点；P1—P2 只按场地、治理与运维能力叠加，P3 不因“公共性”叙事而被迫开放。所有尺寸、消防、结构和无障碍细部仍须专业团队复核，这一框架以 [depth:overall_spatial_structure] 约束一致性，以 [standard:MOHURD-URBAN-DESIGN-MEASURES] 约束公共性与风貌统筹。

![三层范围、分级开放与最小启动框架](assets/figures/land-use-structure.png)

## 统筹研究范围产业与未来城市研究

方案主名称“共檐京张”把设计对象从“又一个 AI 园区”转向“不同主体如何共享门槛”。英文名 **JINGZHANG COMMON EAVES** 保留地点识别与公共界面的双重含义；国际解释副题为 **AI at the Civic Edge**，口号为“内核有界，檐下共益 / Secure cores. Civic edges.”。Logo 不使用人字、坡屋顶、双轨或脉冲：两条相向的边界线向城市侧折出水平共享檐，中央留出开放门槛，三个状态节点分别表示验、创、用；暖灰是遗产背景，青蓝标记公共服务，琥珀只表示测试或人工接管。图形、字体排版与色值均为原创方向，不使用企业商标、人物、论文图或未授权字体；文化标识系统与一带主 Logo 分层管理。[source:AGENT-TASKBOOK] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]

三大定位通过同一空间机制相接：百年京张文化带提供“轨枕—门槛—共檐”的时间叙事，都市 AI 生活体验带把交通、教育、健康、法律和生活服务放入可退出的公共场景，AI 融合创新带则把研究、测试、转译、采购与反馈组织成可追溯回路。五大功能不是五块割裂用地：AI 全栈自主创新体系在验证檐完成受控测试；世界级 AI 创新生态在转译檐完成跨机构协作；AI+ 场景赋能新范式沿六条东西缝合路径进入社区；智能化 AI 活力城市在十二间公共服务节点被日常感知；AI 治理全球话语权则通过公开问题单、审查卡与贡献记录形成可复核公共产品。三区两翼形成循环：众智园验证、AI 原点转译、大钟寺面向城市使用，中关村科技服务翼提供知识产权、资本和专业服务建议，小月河场景赋能翼提供可被公众观察的真实问题，但任何招商、资金和政策都不被写成已确定安排。[depth:overall_spatial_structure]

五个国际案例只提取机制，不复制形象。**Kendall Square** 的官方规划把创新区向创新社区转变，并强调步行公共领域、首层活力和周边社区连接；本案转译为“园区门口的共檐”，而非照搬建筑风格。[source:CASE-KENDALL] **新加坡 one-north** 展示多类型研发、生活配套与公共管理平台在同一创新区协同的可能；本案借鉴跨主体服务编排，但不引用其开发强度或治理制度。[source:CASE-ONE-NORTH] **Seoul AI Hub** 提供孵化、人才与 AI 企业支持的集成样本；本案进一步要求支持功能必须能被街道端感知和质询。[source:CASE-SEOUL-AI-HUB] **Maria 01** 说明旧有建成环境可通过适应性再利用承载创业社群；本案由此优先提出“留、适应、界面改造”，不以大拆大建获取辨识度。[source:CASE-MARIA-01] **Barcelona** 的公共—私营创新、知识转移与公民科学实践提示城市本身可以成为共同学习平台；本案将公众问题单、人工复核和公开结果摘要嵌入十二间运营规约。[source:CASE-BARCELONA]

案例比较导向一个原创判断：世界级生态的稀缺资源不只是算力或楼宇，而是**低摩擦但有边界的相遇协议**。京张遗址公园因此是共同前庭与地址系统，不是要求所有机构服从的唯一中心线；三檐是具有不同治理任务的边界原型，六缝是跨越线性阻隔的关系建议，十二间是可被独立运营、关闭、更新的小型服务/测试节点。连续性来自统一服务标准和识别系统，不要求连续新建雨棚，文保、生态或敏感住区段可以留白。它们共同建立“发现问题—受控验证—公共解释—城市采用—开放归档”的循环；任何技术未通过隐私、伦理、安全、运维和人工复核门槛，都可以停在 P2 而不扩散至 P0/P1。该研究结论通过 [data:geometry/roads.geojson]、[data:geometry/public_space.geojson] 与 [metric:scenario_node_count] 落图，可供产业、规划和运营团队分别深化，不构成准入或采购承诺。

## 总体设计范围城市更新与控规深度城市设计

总体结构概括为“共同前庭、三檐、六缝、十二间”。共同前庭沿京张空间走廊提供步行骑行、树荫、公共信息与统一地址；三檐是北、中、南三个差异化边界原型；六缝是连接两侧社区、校园、站点和创新机构的东西向概念关系；十二间是场景、服务与荣誉记录的可替换节点。结构强调边界剖面而非轴线纪念性：临时范围用低对比虚线呈现，主要视觉权重给到 P0—P3 权限梯度、可达性、停留点、验证路径、运营者与人工服务。[data:geometry/roads.geojson] 记录共同前庭慢行线与缝合关系的概念中心线，[data:geometry/green_space.geojson] 记录共檐绿荫与雨洪缓冲建议，[data:geometry/public_space.geojson] 记录公共节点，[depth:overall_spatial_structure] 检查三者是否形成可用网络。

用地不是对现状或法定控规的认定，而是为了验证总体结构能否在单一边界内无缝覆盖的设计分区。[data:geometry/land_use.geojson] 采用规定编码并保持无重叠、无空洞；研究/办公、公共服务、居住服务、商业服务、绿地、开放空间和交通等类别被用作功能兼容性的概念表达，不能推导土地用途调整。[standard:MNR-LAND-USE-CLASSIFICATION-GUIDE] [depth:land_use_layout] 建筑层 [data:geometry/buildings.geojson] 只放置“界面改造、适应性再利用候选、条件性补点”的原型足迹，不是现状建筑普查，也不主张拆除任何具体建筑。概念足迹覆盖率 [metric:building_density_ratio] 和 [metric:building_footprint_area_sqm] 只用于图面复核；容积率、总建筑面积、高度、退界与地下空间均维持 unknown，由 [depth:development_intensity_controls]、[depth:height_massing_character] 明确标出待确认。

更新方法从边界向内逐层递减：第一层修复公共通行与无障碍连续性；第二层把首层或围墙边缘改造成可见、可问、可退出的共享门槛；第三层才讨论内部空间适应性使用；只有在权属、结构、消防、文保、控规与需求都被核验后，才允许专业团队研究条件性新增。这个顺序使“最小可用门槛”可以先通过标识、遮荫、座椅、人工服务与数据最小化规程实现，而不依赖巨构。六条缝合仅表达连接需求，不构成桥隧、道路线形或穿越工程结论。所有道路、绿地、河道、市政与文保叠合须在后续专业底图上重新校验，[data:geometry/constraints.geojson] 保留这些阻断条件，[depth:retain_renovate_demolish] 记录方法而非地块结论。

总体风貌采用“轻檐、长桌、可读构造、可逆插件”四项控制建议：檐体保持轻薄、离散成网而不追求整段覆盖；长桌既是协作家具也是公众评议界面；构造和运行状态可被看懂；传感器、屏幕与标识采用可拆换模块。分级开放剖面必须同时显示 P0 公共前檐、P1 预约共享、P2 受控测试与 P3 安全内核，门槛处给出开放时段、权限、数据用途、运营者、人工联系人、维护状态与关闭条件，不以黑箱自动门制造科技感。[standard:MOHURD-URBAN-DESIGN-MEASURES] 该语言用于指导后续建筑与景观深化，但 [standard:MOHURD-ARCH-DESIGN-DEPTH-2016] 所需官方附件尚缺，故本方案不宣称建筑专业设计深度。

## 重点区域详细设计

**众智园 AI 自主创新加速区——验证檐（Verify Eave）。** 对应临时重点区 [data:geometry/key_areas.geojson#PROV-KEY-001]。定位是把全栈自主创新和 AI 治理从封闭演示间带到“可观察但受控”的园区边缘：一条公开漫步廊观看非敏感测试摘要，一组预约测试间承接模型红队、端侧算力和无障碍导行验证，一处人工审查台负责停止、解释与争议登记。空间结构为“清河/绿荫界面—公开观察带—受控沙盒—内部研发”四层剖面；建筑策略优先界面改造和适应性利用，不指定楼栋拆留；交通策略将慢行到达、物流和受试设备分流；公共空间提供不采集身份的观摩与讨论。风险是河道、防洪、道路、权属、保密和设备安全资料不全，因此所有线位、尺度与场景均须复核，测试节点不能等同批准运营。[depth:three_key_area_detailed_design]

**北京 AI 原点社区——转译檐（Translate Eave）。** 对应 [data:geometry/key_areas.geojson#PROV-KEY-002]。定位是把高校/科研成果翻译为开发者可复用、居民可理解、公共部门可审查的问题与原型。空间结构为“开源长桌—小型发布台—人才与知识产权服务台—社区问题墙—近校慢行环”，它不要求校园开放受限科研数据，而是在边界处建立明确的共享许可。建筑更新以首层可达、弹性小空间和夜间安静边界为先，避免以高强度商业化挤压学习与居住；交通通过步行和骑行缝合建议连接园区、校园、社区，具体校门与道路组织待管理方确认。AI 场景聚焦成果检索、教育辅导、法律信息和社区共创，每个输出保留来源与人工转介。风险包括校园边界、知识产权、未成年人数据、噪声与消防，故“开放”是分时分级而非无条件穿越。[source:CONTEXT-HAIDIAN-15TH-PLAN]

**大钟寺 AI 产业集聚区——入城檐（Welcome Eave）。** 对应 [data:geometry/key_areas.geojson#PROV-KEY-003]。定位是让站城到达者在进入产业网络之前先理解“这里的 AI 能做什么、不能做什么、如何寻求人工帮助”。空间结构为“四向到达口—模型入城门—智能原生服务街—公共问询与路演庭”，着重连接而非制造单一塔楼。建筑建议以首层连续、混合时段服务和可逆展陈改善到达体验；交通提出四象限步行连续性的概念目标，但不主张新增桥隧或改变轨道设施；公共空间提供多语种、无障碍和低技术备用导向。场景包括出行协助、城市服务问询、创作者工具体验与国际访客导览，所有推荐须标明商业关系和退出方式。风险是站点设施、道路交叉口、市政管线、客流和商业权属资料缺失，需由交通、轨道、消防与运营团队共同复核。

三檐采用同一“最小包”：连续无障碍到达、清晰权限牌、一个有人工值守时段的服务点、非个人化运行状态、纸面/电话等低技术备援。具备治理与运维能力后，才追加预约沙盒、事件层和夜间活动。这样即使某处受边界或审批约束无法形成完整建筑，公共价值仍能以较小、可逆动作启动；若人工值守、数据清单或故障回退任一项缺失，对应 AI 功能不得开放。三处概念方案共同由 [metric:key_area_count]、[metric:key_area_total_sqm] 和三项重点区面积指标复核，但面积只描述当前 provisional 图层，不证明建设规模。三檐相互学习的结果进入贡献檐柱，不以企业广告替代公共荣誉。[standard:MOHURD-CONTROL-DETAILED-PLANNING]

![三处重点区域的验证、转译与入城界面](assets/figures/key-areas.png)

## AI 创新生态、人才画像与 AI+ 场景

生态图谱围绕“问题提出者—技术提供者—独立审查者—场地运营者—日常使用者”组织，而不是围绕企业名单。六类画像分别为：①模型/系统工程师，需要可复现测试、数据权限和失败记录；②创业者及成果转化经理，需要小尺度试用、知识产权与采购路径说明；③学生、青年研究者与开源贡献者，需要低门槛协作、导师和贡献记忆；④社区居民、老人、儿童照护者与残障人士，需要清晰语言、无障碍、人工替代和不被强迫数字化；⑤通勤者、骑行者、配送员及站城访客，需要连续导向、短时休息、低延迟帮助和不追踪身份；⑥公共管理者、伦理/安全审查者和场地运营者，需要问题单、停止权、审计日志与跨部门责任界面。每类画像都包含“拒绝使用 AI 仍可获得基本服务”的权利。[source:AGENT-TASKBOOK]

十二张场景卡把空间、数据、人工和风险绑定在一起；“验证”表示受控试验建议，不表示技术成熟或获准部署：

| 编号与场景 | 空间 / 服务对象 | 最小数据与隐私边界 | 人工复核、运营与回退 |
|---|---|---|---|
| SC-01 **全栈模型红队走廊〔验证〕** | 验证檐预约沙盒；模型团队、安全审查者 [data:geometry/public_space.geojson#SC-01] | 合成或已清权测试集；禁止输入商业秘密和个人数据 | 独立审查员可立即停测；只公开风险类别与修复状态，失败即离线评测 |
| SC-02 **端侧算力能耗沙盘〔验证〕** | 验证檐设备间；工程师、运维人员 [data:geometry/public_space.geojson#SC-02] | 设备遥测最小化，不采集使用者身份 | 能源/消防专业人员复核；过载自动切断并切回静态展示 |
| SC-03 **无障碍导行压力测试〔验证〕** | 六缝中的封闭测试段；残障使用者、通勤者 [data:geometry/public_space.geojson#SC-03] | 自愿参与、短期位置数据、端侧处理，原始轨迹不出测试域 | 无障碍专家与参与者拥有否决权；故障切换实体标识和人工引导 |
| SC-04 **公共服务回答可解释性审查〔验证〕** | 转译檐审查桌；居民、法律/政务专业人员 [data:geometry/public_space.geojson#SC-04] | 仅使用公开政策文本与模拟问题，不收集真实个案身份 | 专业人员逐条签核；不确定答案必须拒答并转人工窗口 |
| SC-05 **开源长桌成果转译** | 原点社区；学生、研究者、创业者 [data:geometry/public_space.geojson#SC-05] | 项目自行选择开源范围，默认不上传未授权代码 | 社群主持与知识产权顾问复核；提供无 AI 的面对面协作模式 |
| SC-06 **健康导航而非诊断** | 社区共檐间；居民、照护者 [data:geometry/public_space.geojson#SC-06] | 不保留病历，只基于公开机构服务信息进行科室/流程导航 | 医疗人员审定内容；任何症状判断均转正规医疗服务，紧急情况拨打人工急救 |
| SC-07 **学习路径共编** | 原点社区分时教室；学生、教师、家长 [data:geometry/public_space.geojson#SC-07] | 未成年人需监护同意，禁止画像营销，学习记录可删除 | 教师决定内容和评价；系统故障回到纸质材料与同伴辅导 |
| SC-08 **法律信息分诊** | 共檐公共服务台；居民、创业者 [data:geometry/public_space.geojson#SC-08] | 仅收集完成转介所需的最少事实，不形成自动信用或风险评分 | 律师/法律服务人员终审；明确“非法律意见”并提供人工预约 |
| SC-09 **通勤缝合助手** | 共同前庭与六缝；通勤者、骑行者、访客 [data:geometry/public_space.geojson#SC-09] | 使用公开交通状态和匿名流量聚合，不做人脸识别和个体追踪 | 交通管理/运营人员发布，异常时切回静态路线牌和广播 |
| SC-10 **树荫舒适度管家** | 蓝绿公共空间；老人、儿童、户外工作者 [data:geometry/public_space.geojson#SC-10] | 温湿度、光照等环境数据，不采集身份 | 园林与场地人员复核养护建议；传感器失效不影响空间开放 |
| SC-11 **模型入城门多语问询** | 大钟寺入城檐；国际访客、站城使用者 [data:geometry/public_space.geojson#SC-11] | 对话可选择不留存；敏感问题本地清除，不进行商业暗推 | 人工服务员可接管；离线多语卡、地图和电话构成低技术备用 |
| SC-12 **京张文化证据导览** | 遗址公园公共路径；居民、访客、研究者 [data:geometry/public_space.geojson#SC-12] | 仅引用经核验公开史料，不合成“历史人物证言” | 文史专业人员审核版本；存疑处明确标注并允许公众提交勘误 |

四个验证场景先于服务部署，因为“可用”必须同时满足技术、伦理、空间和运维条件。所有卡使用四级风险门：R0 无个人数据的公开信息可在人工抽检下运行；R1 低敏感、短期数据须明示同意和删除入口；R2 涉及健康、法律、未成年人或位置轨迹时必须受控预约、专业复核；R3 无法解释、无法退出、需要秘密数据或可能造成重大人身/权利影响时不进入公共试点。每个节点都提供状态灯、用途卡、数据清单、负责人、投诉/勘误入口和实体回退，不以“同意服务条款”代替实质知情。场景节点总数由 [metric:scenario_node_count] 复核，验证场景数由 [metric:validation_scenario_count] 复核，画像覆盖由 [metric:persona_count] 复核。

小月河场景赋能翼并非开放全域采数，而是邀请社区提出问题、在受控场地建立原型、用公众可理解的指标评议，再决定是否扩大。中关村科技服务翼则为许可、知识产权、标准、伦理、融资建议和国际协作提供转介；它不承诺资金和招商结果。场景从 SC-01 至 SC-12 沿“验证—转译—日常使用—公开归档”流动，任何阶段均保留停止权与人工复核。[depth:municipal_new_infrastructure] 约束数据与设备基础，[depth:risk_missing_data] 约束未知数据和责任，不成熟技术只进入沙盒，不在公共空间伪装成完整服务。

## 用地、建筑规模与拆改留方案

[data:geometry/land_use.geojson] 是对 provisional site 的完整拓扑分区，用规定 `land_use_code` 表达概念功能，不是现状调查、土地权属或法定用地方案。设计判断是：创新空间的连续性由首层公共界面、慢行和服务时段共同产生，不应仅靠提高研发办公比例。研究/办公承担研发与转译，公共管理与公共服务承担人工审核、人才和社区服务，商业服务提供日常配套，居住及生活服务维持全天候需求，绿地与广场承接无门票公共活动，交通空间保证到达。每个分区面积可由 EPSG:4548 复算，并与 site union 核对无缝无叠；分类响应 [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE] 与 [depth:land_use_layout]，但任何用途转换仍须法定程序。

[data:geometry/buildings.geojson] 只记录十二类共檐界面原型的概念足迹，不能与现状楼栋一一对应。拆改留采用五步决策树：一是**保留**具备使用价值且无明确冲突的既有空间；二是**适应性再利用候选**，在结构、消防、权属和文保核验后研究分时共享；三是**界面改造候选**，优先改善入口、首层、遮荫和可见服务；四是**条件性补点**，仅在控规、权属、结构与公共需求都支持时研究小尺度可逆构筑；五是**未知/暂停**，资料不足时不作拆除或新建判断。这个方法由 [depth:retain_renovate_demolish] 记录；“没有被绘制”为未知，不等于拆除，“被绘制”为设计原型，不等于批准建设。

建筑基底总量 [metric:building_footprint_area_sqm] 与概念覆盖率 [metric:building_density_ratio] 用于检查图面是否过度占地，不能替代批准建筑密度。总建筑面积 [metric:total_floor_area_sqm]、容积率 [metric:floor_area_ratio]、建筑高度 [metric:building_height_m]、批准建筑密度 [metric:approved_building_density] 和退界 [metric:setback_m] 必须保持 unknown，直到取得官方控规、现状测绘、权属和专业论证。风貌建议不是统一造型：公共侧轻薄、透明可读，受控侧允许必要的安全与保密，历史敏感处使用可逆、低干预构件，生活界面控制眩光、噪声和夜间屏幕。[depth:development_intensity_controls] 与 [depth:height_massing_character] 因此同时记录“设计方法完成”和“法定参数未获知”，避免用完整图面掩盖数据缺口。

运营上，每一个“间”须先有责任人、值守时段、维护预算来源建议、故障回退和退出机制，才讨论设备；闲置时可退化为普通长椅、雨棚、公告栏或社区桌。共檐不是一座巨型连续屋顶，连续的是服务协议、导视、慢行和树荫体验，构筑物可以离散；这既降低对现状和权属的不必要干预，也使最小包能逐段验证。所有建筑、设备、照明、结构、消防、能源和无障碍尺寸须由专业团队深化研究，本稿不提供施工依据。

## 交通、轨道、市政与公共服务设施

交通概念由“共同前庭慢行线、六缝、三处到达接口”组成。[data:geometry/roads.geojson] 中的线是连接意向和长度复算对象，不是道路红线或工程线位。共同前庭优先保障步行、轮椅、自行车与必要运维，六缝连接东西两侧社区、校园、园区和公共交通，三处到达接口分别服务北部验证、中部共创和南部公众采用。道路中心线长度 [metric:road_centerline_length_m]、共同前庭慢行线长度 [metric:common_eaves_spine_length_m] 与缝合数量 [metric:cross_stitch_count] 用于比较网络完整性；能否穿越铁路、河道、快速路、校园或产权边界须另做交通、桥隧、防洪与安全论证。[depth:traffic_rail_slow_parking]

分级开放剖面把移动与权限并置。P0 公共前檐至少满足清晰、无障碍、夜间基础照明、遮荫/避雨、非数字信息和人工求助，且在所有 AI 系统关闭时仍可使用；P1 预约共享层增加开源门诊、人才服务、短时活动与最小数据；P2 受控测试前室设置物理边界、预约、数据说明、观察位和停机权；P3 是非开放安全内核，不纳入公共穿越。**最小可用门槛**定义为“P0 连续段 + 一处可识别人工服务 + 一套低技术备援”，不是固定工程宽度；具体净宽、坡度、消防间距、盲道和过街时距由专业团队按现场与规范核定。停车不以新增大面积车库为默认解，优先研究非机动车停放、物流时窗、无障碍上下客与共享停车协同，地下空间不作可行性判断。

市政与新基建采用“公共服务先于设备”的架构：共檐间预留低压电、网络、可关闭端侧算力和环境传感的概念接口；敏感计算默认在受控区，公共侧只显示必要状态和非个人化摘要。供电容量、通信接入、给排水、雨洪、燃气、环卫、消防、应急和数据安全均未取得专业底图，故 [data:geometry/constraints.geojson] 只登记待核查事项，不画假管线。[depth:municipal_new_infrastructure] 要求每项 AI 设施有能源上限建议、人工关闭、离线模式、设备维护和数据删除；若缺任一责任主体，节点只能作为无设备公共空间开放。

公共服务采用“十二间共享目录”：人工问询、人才与知识产权转介、开源协作、教育辅导、健康导航、法律信息、无障碍服务、通勤帮助、环境舒适、文化证据、测试观察与贡献归档。服务可分时共用同一空间，避免以单一部门专用房造成低效。目录仅是运营建议，具体服务资质、人员、场地和采购由相关主体依法确认。轨道、道路、停车、市政与公共服务在图面上同层审查，确保所谓 AI 节点不会阻断普通通行或挤占基本服务。

![交通慢行、开放分级与蓝绿公共空间复合系统](assets/figures/mobility-bluegreen.png)

## 蓝绿空间、公共空间与城市风貌

蓝绿策略把京张遗址公园及清河、小月河相关背景视为连续生活基础，而不是 AI 装饰背景。[source:CONTEXT-JZ-PARK-2024] 支持沿线开放空间、社区连接与慢行公共性的认识，[source:CONTEXT-JZ-PARK-2026] 仅用于理解阶段性建设背景，不能据此宣称全线完成；水系、防洪、蓝线和园林边界仍待官方资料确认。共檐绿荫由 [data:geometry/green_space.geojson] 表达，公共庭、长桌与场景节点由 [data:geometry/public_space.geojson] 表达，概念绿地率 [metric:green_ratio] 和公共空间比例 [metric:public_space_ratio] 用来检查人才生活、热舒适与开放交往是否得到足够空间支持，而不是法定绿地指标。[depth:blue_green_public_space]

公共空间采用“通行—停留—交往—试验”四级梯度：通行空间永远不以注册、扫码或人脸识别为前提；停留空间提供树荫、座椅、饮水和安静角；交往空间允许长桌、讲座和社区共编；试验空间必须物理可辨、可退出、有人工值守且不侵占前三级。树荫舒适度场景只读环境数据，不追踪个人；雨水花园、透水铺装、树阵和遮阳属于概念组件，具体土壤、海绵指标、植物、管线与养护须专业深化。夜间屏幕默认熄屏或低亮，不以高能耗媒体立面营造“科技感”。[standard:MOHURD-URBAN-DESIGN-MEASURES]

四个地标不是高大物体，而是四种公共承诺。①**共檐零号样机 / Eave Prototype 0**：位于验檐，以 1:1 可逆组件公开版本、材料、测试与维护状态。②**翻檐院 / Inside-Out Courtyard**：位于创檐，把原本朝内的门厅服务转向社区，记录许可、贡献者和问题版本。③**责任试用所 / Accountable AI Arcade**：位于用檐，让试用、解释、人工客服、投诉和退回同处发生，不以企业 Logo 构成城市门户。④**京张檐谱 / Eaves Atlas**：沿共同前庭分布，保存经核验的开源贡献、公众问题、维护与撤回记录，贡献者可选择署名或匿名。地标数量由 [metric:landmark_count] 复核；任何构筑均为概念建议，须经过文保、园林、结构、消防、权属与公众评议。

文化叙事采用“轨枕—门槛—檐下长桌”：轨枕代表京张铁路把知识、人员与城市连接起来的历史基础；门槛代表中关村创新从机构内部走向社会应用时必须经过的责任转换；檐下长桌代表 AI 新文化不只崇拜模型，而是公开问题、许可、失败、贡献和照护。清华园车站等历史资料只使用经核验公开来源 [source:CONTEXT-QINGHUAYUAN-HERITAGE]，存疑处标明而不让生成式文本补齐。导视把主品牌、文化证据、场景状态和商业信息分层：主 Logo 负责整体识别，历史标识标注来源，场景牌说明数据/人工/退出，商业标识不得占据公共荣誉位。城市气质是克制、开放、可读、可修正；国际传播短句为 **“Under one eave, intelligence becomes accountable in public.”**

## 更新项目清单、实施政策与分期计划

十二个行动项目按“能否独立产生公共价值”排序，而不是按假定建设年份排序：

| 编号 | 概念项目与空间 | 最小动作 / 主要依赖 | 建议协作与政策工具 |
|---|---|---|---|
| JZ-01 | 共檐连续性审计｜全带 | 徒步/轮椅审计、断点清单；依赖正式底图和现场许可 | 规划、交通、社区、残障使用者；公开问题单 |
| JZ-02 | 众智园验檐｜北段 | P0 到达、人工审查台；依赖园区边界、安全与防洪 | 园区、研究机构、独立审查者；沙盒准入规约 |
| JZ-03 | AI 原点转译檐｜中段 | 开源长桌、成果转介；依赖校园/园区许可与知识产权 | 高校、社区、专业服务；共享时段协议 |
| JZ-04 | 大钟寺入城檐｜南段 | 多语问询、低技术导向；依赖站城、道路、商业权属 | 交通、街区、公共服务；四向到达协同 |
| JZ-05 | 六条东西缝合｜沿线 | 导向、遮荫与安全过街问题图；依赖交通与工程论证 | 交通、园林、属地；微更新项目库 |
| JZ-06 | 十二间组件库｜三檐与共同前庭 | 责任牌、长桌、状态灯、关闭开关；依赖消防和运维 | 设计、运营、社区；可逆组件标准建议 |
| JZ-07 | 开放可信测试廊｜验证檐 | 非敏感测试摘要与停测权；依赖安全、伦理和数据许可 | 研发、安全、公众代表；独立评审协议 |
| JZ-08 | 开源长桌｜转译檐 | 问题、许可、版本与贡献记录；依赖版权审核 | 开源社群、法务、学校；贡献者公约 |
| JZ-09 | 模型入城门｜入城檐 | 能力边界、人工入口、离线地图；依赖客流和无障碍核验 | 站城运营、社区、访客；服务透明度清单 |
| JZ-10 | 贡献檐柱与公共账本｜全带 | 可核验贡献摘要；依赖署名同意和纠错 | 社群、档案、公众；撤回与勘误制度 |
| JZ-11 | 数据与信任治理台｜三檐 | 数据清单、风险门、投诉与审计；依赖责任主体 | 法律、伦理、安全、运营；停止权制度 |
| JZ-12 | 共檐四季运营｜全带 | 轻量年度周期与复盘；依赖场地、安全和维护资源 | 社区、开发者、国际伙伴；开放征集与年度归档 |

项目数量由 [metric:renewal_project_count] 复核，空间分期由 [data:geometry/phasing.geojson] 表达。G1“门槛先行”优先覆盖三处重点区和可独立成立的 P0/人工服务；G2“缝合成网”在正式道路、河道、权属与安全资料确认后连接共同前庭与六缝；G3“扩散共治”在公众复核和运营评估后研究其余候选界面。三道准备闸门的面积 [metric:phase_1_area_sqm]、[metric:phase_2_area_sqm]、[metric:phase_3_area_sqm] 与 [metric:phase_count] 只检查 provisional 边界内无重叠和全覆盖，不是开工时序、投资安排或政府承诺。[depth:renewal_project_list] [depth:phasing_implementation]

政策建议采用五类软性工具：公共界面共享时段协议；AI 场景四级风险门与人工停止权；可逆组件和低技术备援要求；问题—测试—评议—归档的公开账本；公共利益指标优先于曝光量和注册量。年度运营以“春季问题征集—夏季受控原型—秋季公众评议—冬季归档复盘”为概念周期，活动品牌为 **Common Eaves / 共檐四季**。开发者获得真实但最小化的问题说明，居民获得拒绝和勘误渠道，运营者获得故障与维护清单，国际伙伴通过公开双语摘要参与而非索取敏感数据。每次活动都设“转化出口”：进入下一轮沙盒、转交专业服务、作为普通公共服务保留，或因风险关闭；不把流量、招商或资金写成必然结果。[standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]

公众参与贯穿而非压在末端：连续性审计由日常使用者定义问题，场景卡由专业人员和潜在受影响者共同审查，试验结束公开非敏感结果，年度复盘记录关闭与失败。运维的最低条件是责任人、开放时段、维护资金来源建议、设备清单、人工接管和低技术备用；条件不具备时节点退化为普通公共空间，不因追求“AI 示范”而降低基本服务。上述主体和政策均是协作建议，需由组织者、属地和专业团队依法确认。

## 指标体系、面积复算与合规矩阵

指标分为四组。第一组是**几何闭合指标**：[metric:site_area_sqm] 是 provisional site 在 EPSG:4548 下的复算面积，[metric:announced_site_area_sqm] 仅保存公告语境中的近似量级，两者不得混用；[metric:land_use_polygon_count] 检查完整分区，[metric:key_area_count]、[metric:key_area_total_sqm] 以及 [metric:key_area_zhongzhiyuan_area_sqm]、[metric:key_area_origin_area_sqm]、[metric:key_area_dazhongsi_area_sqm] 检查三个方向性研究对象是否被覆盖。第二组是**公共性指标**：[metric:green_space_area_sqm] 与 [metric:green_ratio] 说明树荫、热舒适和生态缓冲的空间基础，[metric:public_space_area_sqm] 与 [metric:public_space_ratio] 说明无需进入机构内部即可交往、求助和评议的空间基础。绿地和公共空间可能叠合时，指标按各自图层定义解释，不能简单相加为土地比例。

第三组是**结构与行动指标**：[metric:road_centerline_length_m]、[metric:common_eaves_spine_length_m]、[metric:cross_stitch_count] 检查共同前庭与六缝是否从口号变成连续网络；[metric:building_footprint_area_sqm] 与 [metric:building_density_ratio] 只衡量概念原型的基底克制程度；[metric:phase_1_area_sqm]、[metric:phase_2_area_sqm]、[metric:phase_3_area_sqm]、[metric:phase_count] 检查分期拓扑；[metric:renewal_project_count] 和 [metric:common_eaves_room_count] 检查十二个行动项目与十二间是否形成可操作清单。第四组是**治理和体验指标**：[metric:scenario_node_count]、[metric:validation_scenario_count]、[metric:persona_count]、[metric:landmark_count] 只计入具有空间位置、数据边界、人工复核、责任主体与回退方式的条目，不把宣传点位计为 AI 场景。

所有已知值须由相应 GeoJSON 复算：边界来自 [data:geometry/site_boundary.geojson]，重点区来自 [data:geometry/key_areas.geojson]，用地来自 [data:geometry/land_use.geojson]，建筑来自 [data:geometry/buildings.geojson]，道路来自 [data:geometry/roads.geojson]，绿地来自 [data:geometry/green_space.geojson]，公共空间和场景来自 [data:geometry/public_space.geojson]，缺口来自 [data:geometry/constraints.geojson]，分期来自 [data:geometry/phasing.geojson]。[depth:metrics_recalculation] 要求数值、单位、公式、源文件、置信度和假设同时存在。AI 创新指数、人才密度、产值、企业数、就业和使用满意度因缺公开可核验基线不报数；总建面、容积率、高度、批准密度和退界同样保持 unknown，禁止用生成值补齐。

合规不是“有矩阵即可”。`compliance_matrix.json` 逐条连接公告 1.3—1.5 与 agent.1—agent.6；`standard_matrix.json` 连接六项标准及资料状态；`design_depth_matrix.json` 的 15 项分别为 [depth:existing_conditions_diagnosis]、[depth:three_level_scope_framework]、[depth:overall_spatial_structure]、[depth:land_use_layout]、[depth:development_intensity_controls]、[depth:height_massing_character]、[depth:retain_renovate_demolish]、[depth:traffic_rail_slow_parking]、[depth:municipal_new_infrastructure]、[depth:blue_green_public_space]、[depth:three_key_area_detailed_design]、[depth:renewal_project_list]、[depth:phasing_implementation]、[depth:metrics_recalculation]、[depth:risk_missing_data]。“complete”表示本方案已给出可审查的方法、证据和缺口，不表示法定资料已经齐全或方案已获批准。

![核心指标、矩阵覆盖与可追溯证据链](assets/figures/metrics-evidence.png)

## 风险、版权与合规说明

首要风险是空间精度。现有 SITE_BOUNDARY 与三个 KEY_AREA polygon 来自 provisional 资料，[source:BOUNDARY-SOURCE] [source:KEY-AREA-SOURCE]；因此所有面积、长度、比例、分区、重点区和分期只服务概念生成与包内一致性，不能用于官方红线、权属、投资、征拆、法定指标或工程方案。第二类风险是专业底图缺失：控规、道路红线、轨道设施、建筑测绘、产权、市政、防洪、消防、文保和公共服务容量尚未齐备，[data:geometry/constraints.geojson] 将其显式列为待核查事项。收到官方资料后须重新投影、裁切、复算、审图，并由规划、建筑、交通、市政、园林、文保、消防、安全与运营团队复核。[standard:MOHURD-CONTROL-DETAILED-PLANNING]

第三类风险是 AI 对人的权利影响。任何场景不得以获得基本公共服务为条件强迫注册、画像或人脸识别；健康、法律、教育、未成年人、位置和安全测试采用更高风险门；系统须说明用途、最少数据、保存期、人工联系人、申诉/删除、停止状态和低技术回退。模型输出不成为医疗诊断、法律意见、执法决定、教育评价或资源分配的自动依据。无法解释、无法退出、无法人工接管或需要秘密数据的场景不进入公共试点。测试失败、关闭与公众异议和成功同样进入归档，最终判断始终由人类与专业团队承担。[standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]

第四类风险是把概念写成承诺。本文的“檐、缝、间、地标、活动、政策工具、主体分工和阶段”均为开放共创建议；不构成政府决策、土地用途调整、审批意见、投资测算、招商承诺、建设时序、道路线位、桥隧或地下空间可行性。对具体建筑不作拆除、新建或高度结论；对文保、河道、绿地和轨道设施不作越界改造建议。专业标准响应仅证明本方案知道应回答什么以及如何深化，[standard:MOHURD-URBAN-DESIGN-MEASURES] 不等同法定审定，[standard:MOHURD-ARCH-DESIGN-DEPTH-2016] 仍为官方文件缺口。[depth:risk_missing_data]

版权与生成责任详见 `report/copyright_statement.md`。方案文字、信息架构、图形、Logo 方向、图表和 GeoJSON 设计层由 OpenAI Codex 在公开/已清权资料约束下原创生成，提交者负责复核；不嵌入远程地图瓦片、新闻图片、企业标志、人物肖像、论文图、商业字体或第三方效果图。外部案例只作文字化机制比较并保留 URL 与用途限制，不复制其图像和设计。当前许可为 COMMUNITY-DISPLAY-ONLY，任何进一步再许可、实施使用或第三方素材引入均需权利人和组织者另行确认。`sources.json` 记录来源，`assumptions.json` 记录推断，`self_check.json` 记录机器校验；这三者与正文冲突时，应暂停使用并人工复核，而不是选择更“完整”的生成叙述。

最后设置三条发布门槛：**证据门**——所有事实、标准、数据和指标可追溯；**公共门**——普通服务不依赖 AI，场景可拒绝、可停止、可申诉；**专业门**——边界、控规、工程和实施结论必须由有权数据和专业团队确认。任何一门未通过，对应成果只作为研究素材展示，不进入公共运行。此约束也是“共檐”的实质：檐不是遮蔽责任，而是让权限、风险、失败和人工照护在城市界面上变得可见。

## 参考资料

项目直接依据包括：官方公告任务 [source:OFFICIAL-ANNOUNCEMENT]、网站任务包 [source:SITE-PACKAGE]、面向智能体任务书 [source:AGENT-TASKBOOK]、公共来源登记册 [source:SOURCE-REGISTRY] 和处理后的事实导航包 [source:PROCESSED-FACT-PACK]。空间约束来源为临时边界记录 [source:BOUNDARY-SOURCE] 与临时重点区记录 [source:KEY-AREA-SOURCE]；二者都不能用于官方红线或精确法定判断。地方背景包括京张遗址公园公开信息 [source:CONTEXT-JZ-PARK-2024]、阶段性建设信息 [source:CONTEXT-JZ-PARK-2026]、清华园车站历史背景 [source:CONTEXT-QINGHUAYUAN-HERITAGE] 与海淀创新/更新政策背景 [source:CONTEXT-HAIDIAN-15TH-PLAN]，引用范围均限于背景叙述。

国际机制比较使用五项官方来源：Kendall Square 创新社区与公共领域 [source:CASE-KENDALL]、新加坡 one-north 综合创新区 [source:CASE-ONE-NORTH]、Seoul AI Hub 创业与人才支持 [source:CASE-SEOUL-AI-HUB]、Helsinki Maria 01 适应性再利用创新社群 [source:CASE-MARIA-01]、Barcelona 科学创新与公民参与体系 [source:CASE-BARCELONA]。这些案例不提供本项目边界、建筑规模、开发强度、财政、招商或工程证据；可转化的只有公共界面、混合生态、适应性更新、人才服务、公开学习和协作治理机制。

专业与项目标准索引为 [standard:PROJECT-OFFICIAL-ANNOUNCEMENT]、[standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]、[standard:MOHURD-URBAN-DESIGN-MEASURES]、[standard:MOHURD-CONTROL-DETAILED-PLANNING]、[standard:MNR-LAND-USE-CLASSIFICATION-GUIDE]、[standard:MOHURD-ARCH-DESIGN-DEPTH-2016]。对应来源记录为 [source:PROJECT-OFFICIAL-ANNOUNCEMENT]、[source:PROJECT-AGENT-OPEN-CALL-TASKBOOK]、[source:MOHURD-URBAN-DESIGN-MEASURES]、[source:MOHURD-CONTROL-DETAILED-PLANNING]、[source:MNR-LAND-USE-CLASSIFICATION-GUIDE] 与 [source:MOHURD-ARCH-DESIGN-DEPTH-2016]；最后一项仅登记缺口，其余也只提供设计和审查框架，不替代本项目法定审批。机器可读成果以九个图层、`metrics.json`、`sources.json`、`assumptions.json`、`compliance_matrix.json`、`standard_matrix.json`、`design_depth_matrix.json` 和 `self_check.json` 为索引；A3/A0、五张图和离线网页是同一证据的阅读层，不是新的事实来源。所有引用、用途限制和访问日期以提交包 JSON 记录为准。
