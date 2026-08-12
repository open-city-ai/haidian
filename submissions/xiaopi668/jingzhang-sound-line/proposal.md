---
title: "京张声音带 / THE SOUND LINE — 会呼喊、可暂停、能被听见的百年京张AI创新带"
author_github: "xiaopi668"
language: "zh"
proposal_format_version: "2"
bilingual_contract_version: "1"
translation_file: "proposal.en.md"
license: "COMMUNITY-DISPLAY-ONLY"
summary: "把百年京张铁路的听觉遗产（汽笛、电报、扳道员口哨、单线呼号）转译为一条『会呼喊、可暂停、能被听见』的AI创新带：沿京张遗址公园组织一条声音脊、三处听阈广场与呼号站网，让每一项进入公共空间的AI服务都持有一个可被市民呼叫、可暂停、可人工复核的公共协议。所有空间建议为基于临时边界的概念方案，指标可自GeoJSON复算。"
tracks: ["jingzhang-heritage-narrative", "civic-agent-governance"]
scenarios: ["ai-cultural-guide", "ai-traffic-walkability", "ai-health-service-navigation"]
iteration: "v1.0"
---

# 京张声音带 / THE SOUND LINE

## 设计依据与资料清单

本方案以『百年京张AI创新带城市设计国际方案征集』为任务起点，核心依据包括：北京市规自委海淀分局发布的资格预审公告（三层范围、三处重点区域、设计任务与成果深度要求）[source:OFFICIAL-ANNOUNCEMENT]、面向智能体的任务书摘录（三大定位、五大功能、三区两翼、六项任务与边界条款）[source:AGENT-TASKBOOK]、公开资料可用性注册表（区分 formal-ready、background-only、provisional-only 与待核材料）[source:SOURCE-REGISTRY]、以及站点资料包中的枚举、规划限值、标准与 schema [source:SITE-PACKAGE]。

设计数据采用**临时粗略边界**。经主办方确认，官方精确边界文件尚未公开发布，因此本方案基于 `brief/site-package/geometry/provisional_boundaries.geojson` 生成总体设计范围（约11.4平方公里）与三处重点区域（众智园约192.1公顷、北京AI原点社区约104.3公顷、大钟寺约72.0公顷）[source:BOUNDARY-SOURCE][data:geometry/site_boundary.geojson#SITE-001][data:geometry/key_areas.geojson#PROV-KEY-001]。该边界仅为文字四至与面积约束推导的粗略范围，**不以任何方式作为官方红线或精确面积复算依据**；待主办方发布正式 polygon 后，本包所有面积、比例与指标将在 EPSG:4548 下整包重算[assumption:A-BOUNDARY-001]。

完整来源、指标、标准、设计深度与任务覆盖，均以 `sources.json`、`metrics.json`、`compliance_matrix.json`、`standard_matrix.json`、`design_depth_matrix.json` 为准，正文只保留与判断直接相关的证据锚点。

![资料证据链与提交包关系图](assets/figures/site-overview.png)

## 三层范围工作框架

**统筹研究范围（约43.6平方公里）**：北至北五环路，东至京藏高速，南至西直门外大街，西至万泉河路。工作目标是回答『AI创新带在京津冀与海淀全域的角色』：与北纬社区、未来科学城、怀柔科学城、经开区及京津冀形成创新协同，研究AI生态、未来城市形态与连续绿色空间体系[source:OFFICIAL-ANNOUNCEMENT][depth:three_level_scope_framework]。**总体设计范围（约11.4平方公里）**：以京张遗址公园周边1—2公里的城市与产业区为对象，达到控制性详细规划的城市设计深度，解决更新、用地、交通、市政、蓝绿与风貌。**重点区域范围（约368.4公顷）**：对众智园、AI原点社区、大钟寺三处开展精细化详细设计[depth:three_key_area_detailed_design]。

三层范围逐级落实：统筹层定产业与协同战略，总体层定空间结构与功能布局，重点区层定可体验的声部化设计。由于边界为 provisional，以下所有空间结论都只代表**方向性设计**，替换正式 polygon 后，`land_use`、`key_areas`、`phasing` 等图层与全部面积指标需重算[assumption:A-BOUNDARY-001][data:geometry/land_use.geojson#SL-LU-001]。

![三层范围与声音脊总图](assets/figures/land-use-structure.png)

## 统筹研究范围产业与未来城市研究

### 一带总体概念与命名体系（agent.1）

本方案提出**『京张声音带 / THE SOUND LINE』**作为一带总体概念。命名取自京张铁路最富辨识度的听觉遗产：一百二十年前，这条『争气路』以锅炉汽笛、电报滴答、扳道员口哨与单线呼号在群山与平原之间传递秩序；今天，AI创新带需要的不是更多噪音，而是**可被听见、可被回应、可被暂停**的公共秩序。主名称『声音带』（Sound Line）、英文名 THE SOUND LINE、子系列命名（呼号站 Call Station、听阈广场 Listening Plaza、声部 Movement、追呼大赛 DX & Call 大赛）构成一套可延展的命名体系，兼顾国际传播与本地记忆。

**Logo方向**：以『声波+道轨』为母题——一条化为铁轨段位的连续声波，既像京张铁路的钢轨，又像音频波形；配色采用『铁轨灰+信号橙+夜空蓝』。信号橙象征『可呼喊/可呼叫』的公共安全色，夜空蓝呼应夜间安静协议与暗夜保护。整套视觉系统不引用任何第三方商标、字体或图像，全部为原创方向，供专业团队深化[assumption:A-SOUND-001][source:AGENT-TASKBOOK]。

### 三大定位·五大功能·三区两翼协同回路

- **三大定位**：百年京张文化带（声音叙事激活遗产）、都市AI生活体验带（可被听见的日常）、AI融合创新带（可呼喊的开放治理）。
- **五大功能**：AI全栈自主创新体系、世界级AI创新生态、AI+场景赋能新范式、智能化AI活力城市、AI治理全球话语权。本方案把**『AI治理全球话语权』**落实为一套看得见、喊得停的公共协议，作为差异化贡献[standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]。

**三区两翼协同回路**：AI原点社区→众智园全栈加速区→大钟寺产业集聚区组成价值主链（成果转译→全栈验证→市场采用），中关村科技服务翼提供要素全球化配置与资本赋能，小月河场景赋能翼承载AI场景与智能活力公共测试。两翼像铁路『主路外的支线』一样为三区输送人才、数据、算力与场景，形成闭环[depth:overall_spatial_structure]。

### 全球AI创新生态案例（agent.2）

选取 6 个可转化为空间/运营/场景机制的全球AI创新生态案例（摘要，均来自公开资料，作参考借鉴而非照搬主张，不构成任何承诺）[source:SOURCE-REGISTRY]：
1. **深圳南山/粤海街道**——从硬件制造到开源硬件与开发者社区的临街转化机制，启示『街道级创新界面』；
2. **杭州城西科创大走廊**——高校、园区、街区慢行贯通的『近校成果转化』，启示AI原点社区定位；
3. **硅谷大学城与校园科技街区**——以公共空间承载VC路演与黑客马拉松的『路演公共化』；
4. **台北/东京秋叶原的电子与宅文化街区**——文化社群转化为消费场景，启示大钟寺智能原生业态；
5. **柏林/阿姆斯特丹的夜间文化与公地治理**——分时复用公共空间与『可暂停』规则，启示听阈分区与安静协议；
6. **全球业余无线电（Ham Radio）社群**——以呼号、频率公约、空中聚会运营全球社群，直接启示本方案的呼号站网、追呼大赛与开发者社区机制[assumption:A-OPERATION-001]。

这些案例转化为三类空间机制：**街道创新界面**（临街试验窗）、**公共路演空间**（可预约的演讲/赛事场所）、**呼号式公共治理**（每项AI服务可被呼叫、可暂停、可人工复核）。

### AI+未来城市形态（agent.3 战略层）

面向『智能化AI活力城市』，本方案主张以**听觉可达+可呼喊治理**作为未来城市形态的第一原则：公共空间不仅是视觉界面，更是**可被听见、可被回应**的界面。城市AI服务不再以『无人值守自动化』为目标，而以**『随时可被呼叫到人工』**为底线，把人的尊严与公共福祉置于自动决策之上（呼应共创宪章 charter.10 人本治理）[source:AGENT-TASKBOOK][depth:blue_green_public_space]。

## 总体设计范围城市更新与控规深度城市设计

### 空间结构与功能布局（agent.1 空间落点）

总体空间结构为**『一脊·三声部·两翼·多呼号站』**：**一脊**——沿京张遗址公园组织的声音脊主题公园带与慢行主廊道（greenway），是全线公共生活的脊柱[data:geometry/green_space.geojson#SL-GREEN-001][metric:green_space_area_sqm]；**三声部**——原点始发声部、众智全栈声部、大钟寺应用声部，承接三处重点区；**两翼**——中关村科技服务翼、小月河场景赋能翼；**多呼号站**——沿脊布置的AI公共节点，每处配呼叫按钮与人工复核界面[data:geometry/public_space.geojson#SL-PUB-001]。

用地以 4 类声音功能分区完整覆盖提交边界（无空隙、无重叠，可由 shp 复算）[data:geometry/land_use.geojson#SL-LU-001][standard:MNR-LAND-USE-CLASSIFICATION-GUIDE]：
- **0802 声音研发创新用地**（AI原点–众智园全栈研发）：承载声学、音频、语音、端侧算力与全栈自主创新。约267.46万平方米[metric:land_use_rnd_area_sqm]；
- **1401 声音脊公共开敞用地**（京张遗址公园活力带）：承载公园、听阈广场、声音无障碍导览与公共测试。约258.93万平方米[metric:land_use_spine_open_area_sqm]；
- **05 声音产业服务与智能原生商业用地**（大钟寺产业集聚）：承载智能原生消费与商务。约336.61万平方米[metric:land_use_industry_service_area_sqm]；
- **0702 声音社区生活与配套服务用地**（小月河场景赋能翼）：承载人才生活、社区服务与场景运营。约278.28万平方米[metric:land_use_community_area_sqm]。

### 开发强度、建筑体量与风貌的真实边界

容积率、建筑高度、开发强度等**法定控制指标**在本方案中如实记为 `unknown`：官方控规与精确边界不在公开资料包内，任何数值都不得伪装为审定指标[metric:floor_area_ratio][assumption:A-CONTROL-UNKNOWN-001]。本包仅保留**概念建筑体量**（约63.6万平方米概念建筑基底，建筑密度约0.056）作为低置信度设计量，供专业团队深化，不等于法定控制值[metric:building_footprint_area_sqm][metric:building_density]。保留/改造/拆除/新建逻辑以『保留文化遗产与既有社区为底色，针灸式改造为主，概念性新建为辅』，具体拆改留结论待权属与工程条件确认[assumption:A-CONTROLS-001][depth:retain_renovate_demolish]。

### AI+未来交通、轨道与市政（agent.3 空间层）

交通策略围绕『缝合被铁路割裂的百年东西』：提出声音脊慢行主廊道（约9.7公里 greenway）与 4 处东西缝合人行连接，缓解慢行断点[data:geometry/roads.geojson#SL-ROAD-001][metric:road_length_m]；轨道站点一体化、停车组织与对外交通为概念方向，实际线位与红线待正式资料[assumption:A-CONTROLS-001][depth:traffic_rail_slow_parking]。市政与新型基础设施聚焦**端侧音频算力驿站**（边缘算力就近服务声音场景）与分布式能源的融合设想，负荷与容量待专业测算[depth:municipal_new_infrastructure]。

![交通慢行与蓝绿公共空间复合系统图](assets/figures/mobility-bluegreen.png)

## 重点区域详细设计（agent.4）

三处重点区以『声部』方式组织，每处给出定位+空间结构+建筑更新+交通慢行+公共空间+AI场景+实施风险的可读小方案；因关键区为 provisional，以下均为方向性设计[data:geometry/key_areas.geojson][assumption:A-BOUNDARY-001]。

### 原点始发声部 / 北京AI原点社区（约104.3公顷）

- **定位**：AI原点社区 = 成果转译与人才特区，声音带『始发站』。
- **空间结构**：以「原点听阈广场」为公共锚点[data:geometry/public_space.geojson#SL-PUB-001]，校区—园区—街区慢行贯通，承载近校成果转化。
- **建筑更新**：保留既有创新肌理，概念性植入 2 处声音研发/端侧算力驿站[data:geometry/buildings.geojson#SL-BLDG-001]。
- **AI场景**：声音无障碍导览、AI呼叫中转站、校园黑客松路演台。
- **实施风险**：涉及校园与社群边界，须多方协商；容积率待控规。[metric:key_area_origin_area_sqm]

### 众智全栈声部 / 众智园AI自主创新加速区（约192.1公顷）

- **定位**：AI全栈自主创新与AI治理话语权的『验证场』。
- **空间结构**：以「回声广场」为验证-运营公共界面[data:geometry/public_space.geojson#SL-PUB-002]，串联全栈研发、端侧算力、安全沙盒。
- **建筑更新**：概念性构建声学研发实验室与端侧算力驿站[data:geometry/buildings.geojson#SL-BLDG-002]。
- **AI场景**：AI产业测试验证、呼号安全沙盒、音频数据标注众包场。
- **实施风险**：产业载体与测试规则需长期运营主体；强度待控规。[metric:key_area_zhongzhiyuan_area_sqm]

### 大钟寺应用声部 / 大钟寺AI产业集聚区（约72.0公顷）

- **定位**：智能原生新业态与国际交往的『应用站』。
- **空间结构**：以「汽笛广场」为产业展示公共界面[data:geometry/public_space.geojson#SL-PUB-003]，围绕大钟寺站TOD组织智能原生商业。
- **建筑更新**：概念性构建智能原生声学商业综合体[data:geometry/buildings.geojson#SL-BLDG-003]。
- **AI场景**：智能原生消费、国际路演、语音客服与多语言声音路牌测试。
- **实施风险**：TOD与商业运营依赖轨道与客流，属概念设想；业态与强度待控规。[metric:key_area_dazhongsi_area_sqm]

![三处重点区域索引与声部设计图](assets/figures/key-areas.png)

## AI 创新生态、人才画像与 AI+ 场景（agent.2·agent.3）

### 五类用户画像（agent.3 必选）

1. **AI创业者/工程师**——需要可路演、可测试、可融资的开源界面；
2. **高校师生/研究者**——需要近校成果转化与慢行贯通；
3. **社区居民/老人与儿童**——需要可听、可暂停、低数字门槛的公共AI；
4. **视障与低数字素养人群**——把听觉可达视为第一受益面（呼应无障碍环境建设法）[standard:BARRIER-FREE-ENVIRONMENT-LAW]；
5. **游客与国际开发者**——需要可体验、可参与、可传播的朝圣与活动路线。[metric:persona_count]

### 十二张AI场景卡（agent.3 必选≥10，含3张产业测试验证）

1. **声音无障碍导览**（呼号站+耳机听景）——服务视障与游客；人工复核：导览内容须专业审校；
2. **AI呼叫中转站**（呼号站呼叫按钮）——市民可一键呼叫人工接线，任何AI服务可被暂停；
3. **汽笛报时与事件脉冲**（声音脊地标）——以汽笛与声音脉冲标记活动与日报时；
4. **夜间安静协议**（听阈分区）——分时降噪，保护居住与暗夜生态；
5. **声景健康诊所**（听阈广场）——测声压与声环境，链接公共健康；
6. **多语言声音路牌**（呼号站）——多语语音标识，服务国际开发者；
7. **语音问答AI（政务透明）**——先答后转人工，呼叫记录公开；
8. **AI产业测试验证场景①**——音频/语音模型的安全、伦理与鲁棒性沙盒测试（呼号站实验室）；
9. **AI产业测试验证场景②**——语音交互无障碍与多语言可及性测试（声音脊导览系统）；
10. **AI产业测试验证场景③**——声音数据标注众包与开放性审计（原点数据标注场）；
11. **智能原生音景商业街**（大钟寺）——声学空间+智能原生消费；
12. **端侧音频算力共享**（算力驿站）——就近算力分担与余热再利用探讨。

每张卡均绑定：空间位置（对应 GeoJSON 图层）、服务对象、运行数据来源、隐私边界、人工复核机制、运营主体、可视化图层与风险[depth:blue_green_public_space][assumption:A-SOUND-001][assumption:A-SOUNDSCAPE-001][metric:scenario_card_count]。

## 用地、建筑规模与拆改留方案

用地布局与面积如上（4类分区合计=提交边界约11.41平方公里[metric:site_area_sqm]），概念建筑基底约63.6万平方米[metric:building_footprint_area_sqm]。**拆改留原则**：保留京张遗址与文化遗产、既有社区与单位院落；以『针灸式』改造激活街道创新界面与公共空间缺口；概念性新建筑集中于 3-4 处经论证的产业/公共节点，避免大拆大建[depth:retain_renovate_demolish][assumption:A-CONTROLS-001]。所有强度、高度、拆改留结论均待正式控规与现状、权属数据，不以本包作任何法定判断[assumption:A-CONTROL-UNKNOWN-001]。

## 交通、轨道、市政与公共服务设施

交通组织围绕『缝合被铁路割裂的百年东西』这一总目标展开，与声音脊公共空间一体设计，而非孤立地布置道路[standard:MOHURD-URBAN-DESIGN-MEASURES]。**慢行优先**：以声音脊 greenway 主廊道（约9.7公里）为南北主轴，叠加 4 处东西缝合人行连接（见 `geometry/roads.geojson`），在横穿铁路断点处以慢行缝合口补全被百年铁路切开的东西联系，缓解步行与骑行断点[data:geometry/roads.geojson#SL-ROAD-001][metric:road_length_m][depth:traffic_rail_slow_parking]。

**轨道与接驳**：以既有轨道站点（如大钟寺站）为锚点提出TOD式一体化接驳与慢行换乘概念，但因官方线位、站点与红线资料不在公开资料包内，均记作待正式资料确认的概念方向[assumption:A-CONTROLS-001]。**停车与非机动车**：沿公共空间边沿与枢纽统筹布局，坚持『慢行优先、接驳优先』，避免以车为本切割公共界面。**市政与新型基础设施**：提出端侧音频算力驿站与分布式能源融合的设想，就近服务声音场景并探讨边缘算力余热再利用；负荷、容量与管网条件待专业测算，不作为工程可行性结论[assumption:A-CONTROL-UNKNOWN-001][depth:municipal_new_infrastructure]。**公共服务**：以创新服务平台（路演/赛事/呼叫值班）、人才生活服务（社区服务用地0702）与无障碍可达服务共同支撑高品质城区目标[standard:BARRIER-FREE-ENVIRONMENT-LAW]。

## 蓝绿空间、公共空间与城市风貌（agent.4·agent.5）

**声音脊公园带**：以京张遗址公园为蓝绿与声音双主轴，绿地率约0.23[metric:green_ratio]，公共空间率约0.04[metric:public_space_ratio]；听阈广场 3 处承载呼叫与公共活动[data:geometry/public_space.geojson#SL-PUB-001]。**风貌**以『听阈公共界面』统筹沿脊建筑：强调可听见、可透光、可停留的街道界面，突破性天际线与高度控制待控规条件[assumption:A-CONTROL-UNKNOWN-001]。

### 四个AI朝圣地标/荣誉展示节点（agent.4 必选≥3）

1. **零号汽笛塔**——原点社区的声音地标与『AI朝圣第一站』，象征从争气路到开源路的接力；
2. **电报打字厅**——把百年前的电报滴答转译为AI通知审计厅，荣誉展示历届开源贡献者；
3. **听阈广场**——可呼喊的公共界面与『市民喊停』纪念地；
4. **声音档案馆**——采集与开放城市声音，沉淀开源声音数据公共资产。

这些地标借用铁路听觉符号（而非照搬景区网红化），与中关村创新文化、开发者社区和公共空间系统连为一体[assumption:A-SOUND-001][metric:pilgrimage_landmark_count]。地标、导视、Logo、字体、图像与人物标识均为原创方向或已清权素材，不以任何方式表述为已批准建设[source:AGENT-TASKBOOK]。

## 更新项目清单、实施政策与分期计划（agent.6）

按三阶段列概念更新项目（对应 `geometry/phasing.geojson`）[data:geometry/phasing.geojson#SL-PHASE-01][metric:phasing_area_sqm]：
- **一期·原点与声音脊示范段（启动·可听见）**：原点听阈广场、零号汽笛塔、首组呼号站与声音无障碍导览；确立『呼号协议』（可呼叫/可暂停/可人工复核）；
- **二期·众智全栈与产业中段（验证·可迭代）**：全栈研发、端侧算力驿站、AI产业测试验证三场景上线，形成产业-测试-运营闭环；
- **三期·大钟寺与小月河场景翼（共创·可运营）**：智能原生业态成网、全球AI活动体系落地、长期运营与品牌资产沉淀[assumption:A-OPERATION-001]。

**长期运营机制（agent.6）**：年度活动体系（春季『京张听阈节』、夏季『夜间安静周』、秋季『追呼大赛DX』、国际开源节）；开发者社区运营（呼号站值班、开源声音数据集、贡献者荣誉榜）；场景开放运营（测试场景开放评审与人工复核）；国际传播与招引转化（多语言声音路牌、追呼大赛邀请函、路演转化通道）。所有活动、招商、资金与政策均为**概念建议或深化方向**，不表述为已确定政府安排[assumption:A-OPERATION-001][source:AGENT-TASKBOOK]。

![核心指标复算与证据链图](assets/figures/metrics-evidence.png)

## 指标体系、面积复算与合规矩阵

**AI创新指数**（概念方向）：以『可呼叫率（每项服务可被人工复核的比例）』为核心指标，辅以人才密度、场景卡上线数、测试验证完成度、绿地与公共空间率、慢行连通长度。**面积复算**：site约1141.28万平方米[metric:site_area_sqm]、绿地约263.26万平方米/绿地率0.23[metric:green_space_area_sqm][metric:green_ratio]、公共空间约51.06万平方米[metric:public_space_area_sqm]、概念建筑基底约63.6万平方米[metric:building_footprint_area_sqm]，道路约14.29公里[metric:road_length_m]，三处重点区面积各一[metric:key_area_count]，全部分期面积可自 `phasing.geojson` 复算[metric:phasing_area_sqm]。

所有面积在 EPSG:4548 下由本包 GeoJSON 复算（复核：spatial_review PASS），仅剩 provisional 边界与法定控制缺数据两项合理警示[depth:metrics_recalculation][assumption:A-BOUNDARY-001]。封面覆盖情况见 `compliance_matrix.json`（23项任务全覆盖）、`standard_matrix.json`（6项标准）、`design_depth_matrix.json`（15项深度全 complete）。

## 风险、版权与合规说明

**资料与版权**：本方案仅使用公开或任务书提供/已清权资料，未使用非公开地图、内部数据、未授权字体/商标/人物肖像；生成媒体均为原创或已清权，版权见 `report/copyright_statement.md`[source:SOURCE-REGISTRY]。**隐私与人工复核**：所有AI场景均设计人工复核与退出机制，禁止以自动化替代人的最终判断；顾及视障与低数字素养群体优先[standard:BARRIER-FREE-ENVIRONMENT-LAW][depth:risk_missing_data]。**概念建议边界**：全部空间落点、活动、招商、资金与政策均为概念建议或参考方案，可被专业团队深化或停止，不构成政府审定结论、批准背书或实施承诺[assumption:A-SOUND-001][assumption:A-OPERATION-001]。**待补资料**：正式边界、控规、现状、权属、声环境实测、工程条件均列为待补项，任何缺失均未伪装为已核事实[assumption:A-CONTROLS-001][assumption:A-CONTROL-UNKNOWN-001]。

## 参考资料

以下为真正影响本方案判断的主要材料（完整机器索引见 `sources.json` 与三个矩阵文件）[source:SOURCE-REGISTRY]：

1. 北京市规划和自然资源委员会海淀分局，《百年京张AI创新带城市设计国际方案征集》资格预审公告（2026-05-09）及附件任务书摘录。
2. open-city-ai/haidian 仓库，`brief/site-package/standards/references/agent-open-call-taskbook-0518.md`（面向智能体任务书）。
3. open-city-ai/haidian 仓库，`brief/site-package/geometry/provisional_boundaries.geojson` 及 `provisional_boundaries_basis.md`（临时边界说明）。
4. open-city-ai/haidian 仓库，`data/source_registry.json`（公开资料可用性注册表）。
5. 《无障碍环境建设法》（2023）——公共空间与公共服务无差别可达要求。
6. 住房和城乡建设部《城市设计管理办法》、《城市居住区规划设计标准》等公开标准，作为城市设计与控规深度框架。
7. 自然资源部《国土空间调查、规划、用途管制用地用海分类指南》——用地分类基准。
8. 北京市人民政府公开门户关于京张铁路遗址公园与中关村创新文化的背景资料（background-only，文化叙事佐证，不作规划证据）。
