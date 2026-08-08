---
title: "京张168：把一周还给城市"
summary: "用一张公开、可撤回、可人工接管的168小时城市运行图，把铁路的时间组织能力转译为AI创新带的公共空间、测试场景与治理协议。"
author: "budoyh"
author_github: "budoyh"
language: "zh"
license: "COMMUNITY-DISPLAY-ONLY"
tracks: ["youth-friendly-public-space", "civic-agent-governance", "enterprise-services-ecosystem"]
scenarios: ["ai-traffic-walkability", "robot-delivery-low-speed", "ai-cultural-guide", "public-safety-operations-review", "enterprise-service-copilot", "ai-health-service-navigation"]
---

# 京张168：把一周还给城市

> 设计命题：一座AI城市不应只追问“有多少平方米”，还应回答“这些平方米在一周中的什么时刻、由谁、按什么规则使用”。京张168把百年京张铁路的运行图文化转译为城市公共运行图，以 `m²·h/week` 衡量空间共享能力；AI负责解释、预约、仿真与复盘，人的安宁、申诉与人工接管始终优先。

![总体概念与三层范围](assets/figures/site-overview.png)

## 设计依据与资料清单

本方案首先区分“权威任务”“可用资料”“背景案例”和“设计假设”。征集公告是范围和任务主控依据 [source:OFFICIAL-ANNOUNCEMENT] [standard:PROJECT-OFFICIAL-ANNOUNCEMENT]，智能体任务书提供六项任务、十条原则、品牌、场景、画像与运营要求 [source:AGENT-TASKBOOK] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]；仓库站点包、来源注册表和事实包分别承担字段约束、可用性分级和导航，不相互替代 [source:SITE-PACKAGE] [source:SOURCE-REGISTRY] [source:PROCESSED-FACT-PACK]。城市设计、控规内容和用地分类采用 [standard:MOHURD-URBAN-DESIGN-MEASURES]、[standard:MOHURD-CONTROL-DETAILED-PLANNING]、[standard:MNR-LAND-USE-CLASSIFICATION-GUIDE] 作为方法与审查框架。

当前公开包没有官方总体红线和三处重点区域精确多边形，故仅使用 [source:BOUNDARY-SOURCE] 与 [source:KEY-AREA-SOURCE] 的临时粗略几何 [data:geometry/site_boundary.geojson#SITE-001] [data:geometry/key_areas.geojson#PROV-KEY-001]。所有面积、比例、道路、建筑和分期只在这套几何上自洽复算，并受 [assumption:A-BOUNDARY-001] 约束；控规、红线、权属、市政、消防、文保与现状建筑缺口集中登记在 [data:geometry/constraints.geojson#CONSTRAINTS-REGISTER] 和 [assumption:A-CONTROLS-001]。因此本方案可参与内容共创和机器审查，但不主张审批效力。

七个国际案例只作为“机制样本”：Kalasatama以节省人的时间而非设备数量定义价值 [source:CASE-KALASATAMA]；Marineterrein强调真实城市、昼夜季节和可逆试验 [source:CASE-MARINETERREIN]；one-north的 work-live-play-learn 混合 [source:CASE-ONE-NORTH] 与 Punggol 的空间调换学习系统 [source:CASE-PUNGGOL] 支撑分时共享；伦敦 Knowledge Quarter 的机构网络 [source:CASE-KNOWLEDGE-QUARTER]、Paris-Saclay 的概念验证—成熟化—转移链 [source:CASE-PARIS-SACLAY]、Kendall Square 以公共空间连接创新区 [source:CASE-KENDALL]，共同说明“创新带”首先是一组可进入、可协作、可复核的关系，而非复制某个指标。

## 三层范围工作框架

三层范围使用同一条证据链，但回答不同问题。[depth:three_level_scope_framework] 在约43.6平方公里统筹研究范围讨论产业网络、人才流动和未来城市制度；在约11.4平方公里总体设计范围 [data:geometry/site_boundary.geojson#SITE-001] 落实一带、三时区、两翼和六条横向缝合；在三处重点区域 [data:geometry/key_areas.geojson#PROV-KEY-001] [data:geometry/key_areas.geojson#PROV-KEY-002] [data:geometry/key_areas.geojson#PROV-KEY-003] 细化“空间—时段—运营者—停止条件”。三层之间不是按比例放大同一张图，而是从网络假设到空间结构再到可试点协议逐级增加可执行性。

总体结构称为“一带三时区两翼十二刻”。一带是约 9.34 公里的168时间带 [metric:time_ribbon_length_m] [data:geometry/roads.geojson#ROAD-168]；三时区由南向北分别是城市客厅时区、知识换乘时区、模型验证时区；两翼不是封闭园区，而是时间带两侧可按周调换的研发、生活与公共服务单元；十二刻是十二个场景节点。六条东西支线 [metric:crosslink_count] 让铁路线性遗产从“边界”变成跨越式公共骨架 [depth:overall_spatial_structure]。

每项设计动作都使用四行运行表：空间是谁的、何时开放、由谁值守、何时停止。06:00–22:00是公共空间目标时窗，22:00–06:00为静默窗口；研发建筑的公共底层主要在工作日晚间和周末开放，避免将“24/7创新”建立在居民、保洁、保安和维护人员的无休劳动之上 [assumption:A-TIME-001]。若官方几何更新，则首先重算范围、拓扑、面积和比例，再校准项目与时段，不以叙事保护错误坐标。

![三处重点区域运行图](assets/figures/key-areas.png)

## 统筹研究范围产业与未来城市研究

产业研究不以企业名单堆砌，而以“从问题到公开验证再到规模化”的链条组织：高校与研究机构提供问题、方法和人才；企业与公共服务机构提供受控场景；模型验证园形成测试、红队、能耗和失败档案；知识换乘站将成果翻译为政策、采购、创业与公众可理解的材料；城市开放客厅承担展示、国际交流和真实使用反馈。每一环均设人工复核与退出机制，避免把试点成功率等同于公共价值。

全球案例对照形成五条本地判据。第一，时间收益必须可被真实用户感知，而不是“部署量”；第二，试验必须跨日夜、季节和人群，且可恢复原状；第三，工作、生活、学习和公共文化要在日程上混合，不仅在用地标签上混合；第四，机构网络需要共享议程、空间和知识接口；第五，技术转移必须留下概念验证、失效、成熟和责任边界的记录。它们分别回接 [source:CASE-KALASATAMA] [source:CASE-MARINETERREIN] [source:CASE-ONE-NORTH] [source:CASE-PUNGGOL] [source:CASE-KNOWLEDGE-QUARTER] [source:CASE-PARIS-SACLAY] [source:CASE-KENDALL]，但不把外国制度和强度直接当作北京参数。

未来城市的关键基础设施因此包括“公开运行图、预约账本、模型版本牌、失败档案、人工服务台和静默时段”，而不只有传感器和算力。运行图每周公示空间容量、场景、时段、责任人和替代路径；预约系统只采集完成服务所需的最小数据；版本牌标注模型、数据时间、适用范围与申诉入口；失败档案记录暂停原因和修正状态；没有智能手机的人可在人工服务台取得同等服务。这个制度接口构成城市智能体治理的最小产品 [assumption:A-AI-001]。

## 总体设计范围城市更新与控规深度城市设计

总体设计以可复算拓扑为底板。本方案的独特机制不是再造一个“智慧平台”，而是把时间分配机制、人工接管体系与十二节点场景网络写入同一份公开运行图：空间开放、AI试验、静默维护和停止责任可被共同回读。[data:geometry/land_use.geojson#LU-001] 将临时总体边界无缝分为 24 个时空单元 [metric:land_use_parcel_count]，中央公园带、两侧研发/生活/公共服务用地形成连续但非单一功能的走廊 [depth:land_use_layout]。用地代码依据 [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE]；真正的法定兼容性、容积率、建筑密度和高度必须等待控规与权属资料，故 [metric:floor_area_ratio] 与 [metric:average_building_height_m] 明确为 unknown，而非填入“看起来合理”的数值 [depth:development_intensity_controls]。

城市更新采用“调查后保留优先—低扰动改造—可逆加建—最后才讨论拆除”的门槛。十四个概念建筑基底 [data:geometry/buildings.geojson#BLDG-001] 只表达共享底层、创新单元和公共开窗时段，其面积 [metric:building_footprint_area_sqm] 不代表现状盘点 [assumption:A-BUILDING-001]。[depth:retain_renovate_demolish] 要求在官方现状、结构安全、文保、租约、权属和碳评估到位后逐栋判定；在此之前拆除面积 [metric:demolition_area_sqm] 必须保持 unknown。[depth:height_massing_character] 以“连续街墙、开敞首层、铁路视廊、日照与安静界面”作为待校核方向，不给出伪精确高度线。

交通、市政、蓝绿和公共空间不是附图。[data:geometry/roads.geojson#ROAD-168] 表达主慢行线与六条缝合支线，[data:geometry/green_space.geojson#GREEN-168] 和 [data:geometry/public_space.geojson#PUBLIC-168] 分别表达生态连续性与可运营的公共时间带。[depth:traffic_rail_slow_parking]、[depth:municipal_new_infrastructure] 与 [depth:blue_green_public_space] 把无障碍、轨道接驳、装卸错峰、雨洪、能源、算力散热和人工接管列为后续专业校核对象。

![用地与周开放结构](assets/figures/land-use-structure.png)

## 重点区域详细设计

众智园“模型验证园”位于临时重点范围 [data:geometry/key_areas.geojson#PROV-KEY-001]。空间动作是把封闭的技术展示改造成三段可复核流程：09:00前进行安全检查，09:00–20:00开放合成数据门诊、模型红队工棚和能耗沙盒，20:00后停止户外测试并归档版本、异常与人工处置。失败档案馆面向公众解释“哪里不可用”，其价值不是制造完美演示，而是让退出机制可见。正式落位须复核清河、防洪、生态、道路和权属条件。

AI原点“知识换乘站”位于 [data:geometry/key_areas.geojson#PROV-KEY-002]。围绕高校—科研—创业—社区的换乘关系，设置成果翻译台、开源协作桌、企业服务台、夜校共享教室和实验室时间银行；工作日白天服务研究转移，晚间转向学习与公众参与，周末举办开源维护与家庭友好活动。无障碍寻路与健康服务仅做服务导航，不诊断、不画像；没有移动端的访客可通过人工柜台获得相同信息。

大钟寺“城市开放客厅”位于 [data:geometry/key_areas.geojson#PROV-KEY-003]。重点不是再造一个巨型地标，而是缝合站点四象限、铁路叙事和周边生活：开源发车板发布本周场景、版本和空闲空间；遗产声音站采用明确授权的口述与档案；小型路演与国际交流在21:00前结束；低速机器人只在11:00–15:00受控路线试行并为行人、轮椅和配送劳动者让行 [assumption:A-DELIVERY-001]。三片区由 [depth:three_key_area_detailed_design] 统一检查功能、建筑、交通、公共空间、运营和停止条件，而非只给口号。

## AI 创新生态、人才画像与 AI+ 场景

六类画像定义服务底线 [metric:persona_count]：科研人员需要可预约验证设备与失败保密期；初创工程师需要合规、采购和算力导航；学生需要低门槛夜校和作品发布；带儿童的社区居民需要安静、安全、可看护的活动；配送与维护劳动者需要清晰路权、休息点和人工排班；老年与残障访客需要无障碍路线、纸面信息和人工服务。画像不对应个人追踪标签，系统不得把兴趣、健康或职业变成隐性评分。

十二张场景卡 [metric:scenario_card_count] 共享字段“地点/窗口/最小数据/人工复核/停止条件”：①合成数据门诊【测试】检查数据许可与偏差，发现真实个人数据即停止；②模型红队工棚【测试】在隔离样本中验证鲁棒性，越界调用即下线；③低速机器人时窗【测试】11:00–15:00封闭路线，人工安全员可一键停机；④端侧能耗沙盒【测试】比较能耗与服务质量，超热或扰民即回退；⑤企业服务 Copilot 只导航公开政策并由柜员复核；⑥健康服务导航只指路挂号，不诊断；⑦无障碍寻路允许用户报告障碍并提供人工路线；⑧夜校共享教室用容量而非身份分配；⑨实验室时间银行公开空闲时段与责任人；⑩遗产声音站只使用清权内容；⑪静默街道协议以噪声阈值触发人工巡查而非自动处罚；⑫城市模型阅览室公开版本、假设和申诉。

其中四个明确测试/验证场景 [metric:test_scenario_count] 均先在可恢复原状的最小空间运行两周，评价服务完成率、人工接管率、投诉、无障碍阻断、能耗和恢复时间；出现未成年人风险、敏感数据泄露、不可解释拒绝服务、无障碍通道受阻、连续两次人工接管失败或责任人缺席即暂停。场景与仓库六类标准场景相连，但十二张卡是本方案的空间化运营拆分 [data:geometry/public_space.geojson#PUBLIC-168]。

四个AI标志/荣誉节点 [metric:landmark_count] 不塑造技术崇拜：168时钟显示本周公共时间；模型版本院公开模型和数据日期；失败档案馆纪念被及时停止的试验；开源发车板把维护者、贡献者和社区问题列为“到发信息”。标识“168”由七列二十四行的运行图网格和一条橙色时间带构成，中文名“京张168”，英文名“JINGZHANG 168 / GIVE THE WEEK BACK TO THE CITY”，图形与本提交视觉均为原创几何构成。

## 用地、建筑规模与拆改留方案

用地采用“基本用途 + 周开放协议”双标签：研发单元不能因为代码属于产业用地而永久封闭，公园也不能因为标注公共而忽略夜间安宁。中央时间公园形成连续绿色骨架，两侧时区单元按北部验证、中部转化、南部城市服务组织；24 个拓扑单元覆盖临时边界且不重叠 [data:geometry/land_use.geojson#LU-001]。这一结构用于比较选择，不替代法定用地方案。

建筑策略使用三张表。第一张“调查表”记录年代、结构、使用、权属、租约、文化价值、能耗、消防和无障碍；第二张“动作表”只允许保留、修缮、性能改造、可逆加建、待定五类，在证据充分前不出现拆除；第三张“开放表”记录首层何时、由谁、以何种容量向公众开放。概念基底总面积为 249,984 平方米 [metric:building_footprint_area_sqm]，仅用于表达位置与底层策略。

强度、高度和风貌遵循“先承载力，后形态”：交通、市政、学校医疗、日照、微气候和历史视廊共同限定容量。没有官方数据时，方案只给校核顺序，不给 FAR、高度或拆除量。任何后续版本若填入这些数值，必须附官方来源、坐标版本、公式和变化日志，并重新运行 [depth:metrics_recalculation]；这也是把“AI生成”变成可问责设计的必要门槛。

## 交通、轨道、市政与公共服务设施

交通结构为“一纵六横、站城优先、慢行连续”。主线 [data:geometry/roads.geojson#ROAD-168] 提供约 9.34 公里连续步行骑行骨架，六条支线 [metric:crosslink_count] 将两侧街区接入，而非把铁路遗产做成封闭景观。轨道站点周边优先处理四象限过街、风雨连廊、轮椅坡度、自行车停放和夜间照明；机动车与装卸在外围和错峰窗口组织。低速机器人不获得永久专用路权，只能在人工安全员、低速、可停机的试验时窗内共享支路。

市政与新基建采用“看不见也要可维护”的原则：雨水花园、可渗铺装和树阵先承接日常雨洪；算力节点靠近可核验的电力、冷却和维护条件，并公开能耗与热排放边界；传感器采用最少数量、短留存和边缘处理；公共 Wi-Fi、充电、照明和应急广播保留物理开关与人工巡检。[data:geometry/constraints.geojson#CONSTRAINTS-REGISTER] 未提供管线与消防条件，因此这些内容都是设施策略而非工程布点。

公共服务以“导航不替代专业判断”为边界。企业服务、健康、法律与教育智能体只解释公开信息、提示资料、预约人工服务；涉及资格、医疗、法律或安全的决定必须由有资质人员完成。服务台同时提供数字端、纸面端和人工端，关键告示至少中文与英文，并考虑低视力、听障和认知障碍。运行故障时恢复静态指示牌、电话和现场人员，不把App可用性当作城市可达性。

![交通、蓝绿与公共时间带](assets/figures/mobility-bluegreen.png)

## 蓝绿空间、公共空间与城市风貌

京张时间公园 [data:geometry/green_space.geojson#GREEN-168] 是生态带，也是周运行图的“纸张”。按临时几何复算，绿地面积 1,531,755 平方米 [metric:green_space_area_sqm]，绿地率 13.42% [metric:green_ratio]；这些是设计几何结果，不是法定指标。空间以连续树冠、雨水路径、安静边缘和横向缝合为主，活动设施靠近可达入口，生态敏感和居民界面保留低照度、低噪声窗口。

公共时间带 [data:geometry/public_space.geojson#PUBLIC-168] 面积 865,644 平方米 [metric:public_space_area_sqm]，公共空间率 7.58% [metric:public_space_ratio]。目标开放时间为每周 112 小时 [metric:weekly_public_open_hours]，由此形成约 97.0 百万 m²·h/week 的“公共时间供给” [metric:public_space_weekly_sqm_hours]。该指标不奖励通宵开放：静默、维护、儿童安全和劳动者休息是供给质量的一部分，实际时段必须由试点反馈校准。

风貌不采用蓝紫霓虹和巨型屏幕塑造“AI感”。材料延续铁路运行图的纸、墨、钢与时间刻度：暖色铺地和深蓝导视形成基础，橙色只标记开放窗口，红色仅用于数据缺口或暂停状态。铁路遗产构件须先完成文保与结构核验再利用；新地标保持人尺度和可关闭性。夜景优先脚下照明和入口识别，22:00后降低亮度与声环境负担。

## 更新项目清单、实施政策与分期计划

九项更新项目 [metric:renewal_project_count] 构成可分离的实施包：JZ168-01公开运行图与人工服务台；02六条慢行缝合与无障碍审计；03众智园模型验证园；04原点知识换乘站；05大钟寺城市开放客厅；06时间公园雨洪与静默界面；07共享首层与夜校；08版本院、失败档案和开源发车板；09开放数据、投诉与评估机制。每项都要明确空间、运营者、维护预算、数据最小化、停止条件和恢复原状责任。

三期空间写入 [data:geometry/phasing.geojson#PHASE-01] [depth:phasing_implementation]。一期先做南段城市客厅、运行图原型和两个无实体改造的服务试点，用真实排班验证制度；二期在资料闭环后推进中段慢行缝合、共享首层和知识换乘；三期才扩展北段模型验证园并联运全带。所有阶段以官方边界、权属、管线、消防、文保、无障碍、运营主体和资金确认作为闸门，闸门未过则停在研究或临时活动层级。

运营日历每周滚动、季度复盘、年度开源。周一发布空闲空间与问题单，周三夜校和维护者会议，周五公开演示必须同时公开限制，周末家庭与无障碍优先；每季度举行“失败也有价值”复盘，公开暂停和修正；每年举办“京张168开放周”，邀请全球案例伙伴和本地居民共同审查，而不是只办发布会。项目清单由 [depth:renewal_project_list] 检查，政策重点是空间共享协议、责任保险、无障碍审计、数据治理、微更新许可和维护采购。

## 指标体系、面积复算与合规矩阵

指标分为三类。几何指标由EPSG:4548中的提交多边形复算：总体面积 11,412,825 平方米 [metric:site_area_sqm]、建筑基底、绿地和公共空间面积与比例；结构指标统计重点区域、用地单元、支线、场景、画像、地标和项目；运行指标用开放小时与 `m²·h/week` 检查“空间是否真的被分享”。所有已知指标的机器索引为：[metric:site_area_sqm]、[metric:building_footprint_area_sqm]、[metric:green_space_area_sqm]、[metric:green_ratio]、[metric:public_space_area_sqm]、[metric:public_space_ratio]、[metric:key_area_count]、[metric:land_use_parcel_count]、[metric:time_ribbon_length_m]、[metric:crosslink_count]、[metric:scenario_card_count]、[metric:test_scenario_count]、[metric:persona_count]、[metric:landmark_count]、[metric:weekly_public_open_hours]、[metric:public_space_weekly_sqm_hours]、[metric:renewal_project_count]。指标值、公式、来源文件、置信度与假设均在 `metrics.json`，HTML中三个核心空间指标与之同值。

面积复算遵循同一边界、同一投影、并集去重：用地单元必须覆盖总体边界且互不重叠，绿地和公共空间允许语义叠合但分别以几何并集计面积，建筑基底以并集避免重复，线长度按投影坐标计算。[depth:metrics_recalculation] 要求官方边界替换后一次性重算全部派生值，不手工修表。三处重点区域数量为 3 [metric:key_area_count]，但公布的192.1、104.3和72.0公顷只作为任务规模信息，不伪装成当前粗略多边形的精确面积。

合规矩阵覆盖公告17条任务和智能体6项任务，专业深度覆盖 [depth:existing_conditions_diagnosis] [depth:three_level_scope_framework] [depth:overall_spatial_structure] [depth:land_use_layout] [depth:development_intensity_controls] [depth:height_massing_character] [depth:retain_renovate_demolish] [depth:traffic_rail_slow_parking] [depth:municipal_new_infrastructure] [depth:blue_green_public_space] [depth:three_key_area_detailed_design] [depth:renewal_project_list] [depth:phasing_implementation] [depth:metrics_recalculation] [depth:risk_missing_data]。其中“完成”表示已给出成果或明确的ABSTAIN流程，不表示缺失数据已经存在。

![指标、证据与实施闸门](assets/figures/metrics-evidence.png)

## 风险、版权与合规说明

最大风险是把临时几何和概念建筑误读为官方方案 [source:BOUNDARY-SOURCE]。为此，边界、重点区域、用地、建筑、道路和分期均标注来源、置信度与角色；任何图纸均显示“PROVISIONAL / 非官方红线”。第二类风险是AI越权：不做人脸识别、信用评分、自动执法、健康诊断或不可申诉决策；最小数据、短留存、人工复核、停止开关和等价离线服务构成统一条件 [assumption:A-AI-001]。第三类风险是“创新”挤压安宁与劳动权，因此设置静默时段、人工排班和公共投诉回读。

缺资料清单包括官方总体与重点区多边形、控规与用地、道路红线、轨道接口、现状建筑、权属租约、市政消防、文保古树、公共服务容量、生态雨洪和运营主体。它们统一进入 [assumption:A-CONTROLS-001] [assumption:A-BUILDING-001]，不得以网页搜索、图像猜测或AI补全替代。低速机器人另受 [assumption:A-DELIVERY-001] 约束；公共时段受 [assumption:A-TIME-001] 约束。正式实施前的停止条件比“愿景承诺”优先。

文字、图形、GeoJSON、HTML和PDF为本次提交原创或基于仓库明确允许的临时数据衍生；外部案例仅作事实性概括并逐项列源，不复制其图像、图纸和长段文字。许可为 COMMUNITY-DISPLAY-ONLY，仅允许本征集仓库展示与审查；任何第三方图像、字体或商标均未嵌入。品牌“京张168”不声称官方授权，不暗示政府采纳，不构成规划、工程、采购、法律、医疗或安全承诺。

## 参考资料

权威与本地资料：征集公告 [source:OFFICIAL-ANNOUNCEMENT]、智能体任务书 [source:AGENT-TASKBOOK]、站点包 [source:SITE-PACKAGE]、仓库公开任务说明 `brief/public-brief.md`、来源注册表 [source:SOURCE-REGISTRY]、事实包 [source:PROCESSED-FACT-PACK]、临时总体边界 [source:BOUNDARY-SOURCE]、临时重点区域 [source:KEY-AREA-SOURCE]。国际背景：Smart Kalasatama [source:CASE-KALASATAMA]、Marineterrein Living Lab [source:CASE-MARINETERREIN]、one-north [source:CASE-ONE-NORTH]、Punggol Digital District [source:CASE-PUNGGOL]、Knowledge Quarter [source:CASE-KNOWLEDGE-QUARTER]、Paris-Saclay [source:CASE-PARIS-SACLAY]、Connect Kendall Square [source:CASE-KENDALL]。

空间证据索引：[data:geometry/site_boundary.geojson#SITE-001] [data:geometry/key_areas.geojson#PROV-KEY-001] [data:geometry/land_use.geojson#LU-001] [data:geometry/buildings.geojson#BLDG-001] [data:geometry/roads.geojson#ROAD-168] [data:geometry/green_space.geojson#GREEN-168] [data:geometry/public_space.geojson#PUBLIC-168] [data:geometry/constraints.geojson#CONSTRAINTS-REGISTER] [data:geometry/phasing.geojson#PHASE-01]。标准索引：[standard:PROJECT-OFFICIAL-ANNOUNCEMENT] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK] [standard:MOHURD-URBAN-DESIGN-MEASURES] [standard:MOHURD-CONTROL-DETAILED-PLANNING] [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE] [standard:MOHURD-ARCH-DESIGN-DEPTH-2016]。其中建筑工程深度标准当前是仓库标记的数据缺口，只作为需补充的审查接口，不冒充已取得的权威正文。这些机器引用使文字、图层、数值、资料和审查项能够相互回读，而不是依赖无法追溯的渲染图。
