---
title: "京张开放题｜JING-ZHANG OPEN CHALLENGES：城市出题，全球共答，公众评议"
author_github: "Last-emo-boy"
language: "zh"
translation_file: "proposal.en.md"
license: "COMMUNITY-DISPLAY-ONLY"
summary: "把百年京张组织为一套公共问题治理与城市设计框架：问题经权利和数据清查、全球共答、分级验证、受控场测与公众评议后，开放归档、迭代或退出；同时以日常修补和照护检验 AI 是否真正改善城市生活。"
tracks: ["ai-traffic-walkability", "enterprise-services-ecosystem", "civic-agent-governance"]
scenarios: ["ai-cultural-guide", "enterprise-service-copilot", "robot-delivery-low-speed"]
iteration: "v1.0"
---

# 京张开放题｜JING-ZHANG OPEN CHALLENGES

**城市出题，全球共答，公众评议。**

*The City Poses. The World Co-solves. The Public Reviews.*

## 设计依据与资料清单

本方案的首要判断是：百年京张不应只展示 AI 产品，而应成为一套能公开提出城市问题、核查权利与数据、验证答案、接收公众意见并允许失败退出的公共制度原型。城市设计因此同时处理两条线：纵向是“城市出题 → 权利与数据清查 → 全球共答 → 实验室验证 → 受控场测 → 公众评议 → 开放归档、迭代或退出”；横向是遮阴、座椅、过街、无障碍、导视、设施报修和一线劳动等日常修补与照护。前者保证创新可审查，后者防止方案只服务大型活动和技术展示。[source:OFFICIAL-ANNOUNCEMENT] [source:AGENT-TASKBOOK] [standard:PROJECT-OFFICIAL-ANNOUNCEMENT] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]

证据按用途分层，不互相越权：

| 证据层 | 本方案采用方式 | 明确禁用 |
| --- | --- | --- |
| 正式可用资料 | 公告用于任务、范围语义与成果深度；任务书用于品牌、生态、场景、文化和运营要求；三项公开专业标准用于城市设计、控规边界和用地分类 [source:MOHURD-URBAN-DESIGN-MEASURES] [source:MOHURD-CONTROL-DETAILED-PLANNING] [source:MNR-LAND-USE-CLASSIFICATION] | 不由通用标准推导本项目已获批的地块控制、工程条件或实施决定 |
| 临时空间资料 | 仓库 provisional polygon 仅支撑生成、图解、自检和概念讨论 [source:PROVISIONAL-BOUNDARIES] [data:geometry/site_boundary.geojson#SITE-001] [data:geometry/key_areas.geojson#PROV-KEY-001] | 不称官方红线，不支撑精确面积、法定控规、审批或投资结论 |
| 背景案例 | 8 个案例只用于比较机制，并在来源表统一标记为 background_case_study | 不支撑京张规划控制、政府承诺、资金、招商或工程可行性 |
| 待补标准 | 建筑专业深度文件尚无可用官方文件，只作深化清单 [source:ARCH-DESIGN-DEPTH-DATA-GAP] [standard:MOHURD-ARCH-DESIGN-DEPTH-2016] | 不把非官方镜像当作正式依据 |

当前临时底板覆盖 11.41 km² [metric:site_area_sqm]；24 个建筑原型的基底合计 10.16 ha [metric:building_footprint_area_sqm]；绿地约 114.45 ha、占 10.03% [metric:green_ratio]；12 处公共场景空间约 10.16 ha、占 0.89% [metric:public_space_ratio]；三处重点区共 3 个 [metric:key_area_count]。这些数值随 provisional polygon 计算，不是官方面积。容积率 [metric:floor_area_ratio] 缺少法定控制与可计容建筑面积，暂不形成数值；官方边界、现状、权属、控规、道路、市政、消防、文保和公共服务底账到位后须更新整包。[depth:existing_conditions_diagnosis] [depth:risk_missing_data] [data:geometry/constraints.geojson]

| 已知事实 | 未取得资料 | 对本轮设计的影响 | 补数动作 |
| --- | --- | --- | --- |
| 公告明确三层工作范围、三处重点区名称与任务 [source:OFFICIAL-ANNOUNCEMENT] | 官方 SITE 与 KEY_AREA polygon | 只表达空间关系，不确定红线、地块和精确规模 | 用官方附件替换 SITE-001 与 PROV-KEY-001—003，并重算面积与图件 |
| 仓库提供 provisional SITE-001 与三处粗略重点区 [source:PROVISIONAL-BOUNDARIES] | 地籍、权属、现状建筑测绘与控规 | 21 个用地单元和 24 个建筑对象仅为设计原型 | 叠加地籍、测绘、权属和法定控制，逐对象复核保留、改造与填充 |
| 任务书明确三区两翼、场景、人才、地标与运营要求 [source:AGENT-TASKBOOK] | 真实用户研究、运营主体、预算与审批 | 场景采用分级测试、人工接管和退出条件，不承诺开放运营 | 开展共创访谈、无障碍审计、运营容量与责任主体确认 |
| 当前 constraints 图层为 0 个 feature [metric:constraints_feature_count] | 文保、水务、树木、管线、消防与市政约束几何 | 不做工程线位、高度、岸线或设施容量结论 | 取得正式资料后逐层冲突检查并更新风险清单 |

![资料、空间与公共评议的证据关系](assets/figures/site-overview.png)

## 三层范围工作框架

设计判断是用三层范围承接三类不同问题，而不是把一张粗略边界放大三次。统筹研究范围回答“哪些公共问题值得全球共同解决”；总体设计范围回答“问题如何落到日常城市系统”；重点区域范围回答“什么条件下可以测试、复盘或退出”。这一分工来自公告工作层级，并由临时空间数据提供可替换的工作底板。[source:OFFICIAL-ANNOUNCEMENT] [standard:PROJECT-OFFICIAL-ANNOUNCEMENT] [depth:three_level_scope_framework]

| 层级 | 设计任务 | “开放题”成果 | 数据与缺口 |
| --- | --- | --- | --- |
| 统筹研究范围 | 产业生态、未来城市、国际协作 | 公共问题目录、三定位五功能、案例转译、年度议程 | 战略研究不新增精确红线；产业、人口和设施基线仍待正式数据 |
| 总体设计范围 | 城市更新、功能布局、交通市政、风貌 | “问题册 + 验证链 + 日常照护网”的概念结构 | 以 [data:geometry/site_boundary.geojson#SITE-001]、[data:geometry/land_use.geojson#LU-001] 为临时底板；法定控制待补 |
| 重点区域范围 | 三处片区详细设计 | AI 原点社区负责提题与组队，众智园负责研发与验证，大钟寺负责公众评议与采用 | 三处范围见 [data:geometry/key_areas.geojson#PROV-KEY-001] 至 PROV-KEY-003；边界均为 provisional |

空间协作关系采用清晰的责任链：**AI 原点社区（问与组队）→ 众智园（答与验证）→ 小月河场景赋能翼（低风险试用）→ 大钟寺（评议与采用）→ 中关村科技服务翼（匹配知识产权、人才、算力、数据与专业服务）→ 返回题库形成新版本。** 同时，日常照护网横向连接社区、遗址公园、站点和园区，让小修小补不必等待大型创新项目。该结构是概念建议，不是已确定的机构分工或政府运营安排。[depth:overall_spatial_structure] [metric:key_area_count]

官方 polygon 到位后，需替换 [data:geometry/site_boundary.geojson#SITE-001] 与三个 KEY_AREA feature，再重新生成 land use、buildings、roads、green space、public space、phasing 和所有面积指标；在此之前，三层范围的设计深度完整不等于官方数据完整。

![三层范围、验证责任链与日常照护网](assets/figures/land-use-structure.png)

## 统筹研究范围产业与未来城市研究

### 品牌与 VI

总品牌为 **“京张开放题｜JING-ZHANG OPEN CHALLENGES”**。“开放题”既指尚无唯一答案的城市问题，也指题目、数据条件、评测方法、公众意见和失败记录尽可能开放。英文采用 Open Challenges 以强调持续参与；每个具体项目对象称 Open Question，避免把城市治理误解为一次性竞赛。

Logo 概念由 **3 段开放框、2 个外向接口和 1 个中央公众圆点**构成：三区提供不同验证环境，两翼连接外部资源，公众位于判断中心；负形可读为问号但不复制铁路、人字轨或企业标志。状态语法为“? 提题、{ } 共答、△ 测试、○ 评议、↺ 迭代或退出”。主色建议为京张锈红、研究靛蓝、小月河青，所有状态同时使用文字、形状和纹理，避免只凭红绿辨识。标题优先采用开放授权或系统字体；实际字库与嵌入方式须在最终导出前完成许可复核。Logo、导视和文化解说分为三个层级，不以企业 Logo 墙代替公共贡献记录。[source:AGENT-TASKBOOK] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]

### 三定位、五功能、三区两翼

| 任务书要素 | 开放题转译 | 空间或运营落点 |
| --- | --- | --- |
| 百年京张文化带 | 从“工程难题如何被解决”讲到“城市问题如何被共同承担” | 遗址公园的百年难题档案、口述史与失败复盘 |
| 都市 AI 生活体验带 | 居民拥有提题、知情、拒绝、申诉和撤回权 | 大钟寺公众试用、社区问题诊所、日常照护网 |
| AI 融合创新带 | 科研、工程、验证、采用与开放知识连续衔接 | AI 原点社区—众智园—小月河—大钟寺责任链 |
| AI 全栈自主创新体系 | 模型、数据、算力、评测、安全和能耗证据 | 众智园的 T01、T03 与证据发布 |
| 世界级 AI 创新生态 | 跨高校、机构、企业和国际人才围绕真实问题组队 | AI 原点社区的开放驻留与问题工作坊 |
| AI+ 场景赋能新范式 | 先清权、后分级、再进入可撤回的真实场景 | 小月河场景赋能翼与 G0—G4 成熟度闸门 |
| 智能化 AI 活力城市 | 让商户、居民、访客在可解释条件下试用并反馈 | 大钟寺体验、服务与公共评议 |
| AI 治理全球话语权 | 公开方法、失败、停止理由和公众回执 | 全带开放题库与年度评议发布 |

三区分别是众智园 AI 自主创新加速区、北京 AI 原点社区、大钟寺 AI 产业聚集区；两翼分别是中关村科技服务翼和小月河场景赋能翼。三处空间不做同质化园区：众智园技术深度最高、公众暴露最低；AI 原点社区知识交换和人才密度最高；大钟寺公众接触与市场反馈最强。两翼只提供概念性的要素匹配与低风险场测界面，不承诺资金、招商、数据供给、测试许可或公共运营。[data:geometry/key_areas.geojson#PROV-KEY-002] [depth:overall_spatial_structure]

### 8 个背景案例及其转译边界

| 案例 | 可转译机制 | 不可直接套用 |
| --- | --- | --- |
| AI Singapore 100 Experiments [source:CASE-AISINGAPORE-100E] | 将问题定义、基线、实施和交接组织为可核验项目，并连接工程培养 | 不复制资助额度、周期或政策条件 |
| Mila [source:CASE-MILA] | 非营利研究机构连接高校、开放科学、产业采用与负责任 AI | 研究机构经验不等于城市规划管理权 |
| Vector Institute [source:CASE-VECTOR-INSTITUTE] | 独立中介连接研究、人才和行业采用 | 不把伙伴、规模或资金推演为京张承诺 |
| Punggol Digital District [source:CASE-PUNGGOL-DIGITAL-DISTRICT] | 产业区、大学和数字运营平台共址，可参考学习—运营—场测关系 | 高密感知必须先做必要性、隐私与安全审查 |
| 上海模速空间 [source:CASE-SHANGHAI-MOSU-SPACE] | 算力、开放数据、评测、金融与合规服务的邻近配置 | 不把公开报道中的招商、融资或企业统计写成未来保证 |
| Pittsburgh Robotics Network 与 CMU NREC [source:CASE-PITTSBURGH-ROBOTICS] | 区域产业网络与现实应用机器人研发并存，可参考具身 AI 供应链和测试协作 | 机构自述规模和投资数据不用于本地对标承诺 |
| Knowledge Quarter London [source:CASE-KNOWLEDGE-QUARTER-LONDON] | 铁路门户周边以会员网络组织知识交换、公众开放和地方营造 | 其并非 AI 专项园区，也无单一空间治理模式可照搬 |
| STATION F [source:CASE-STATION-F] | 共享场所内用多类项目与公共支持服务覆盖创业不同阶段 | 创业园区不等于完整城市街区，不复制企业数量和融资指标 |

案例共同启发的不是“复制一个园区”，而是建立问题所有者、验证者、使用者和受影响公众之间的责任关系。资料缺口在于尚无京张产业主体、人才需求、空间成本、服务容量和国际参与基线；案例只支撑方法讨论，不支撑本地规模结论。[depth:existing_conditions_diagnosis]

## 总体设计范围城市更新与控规深度城市设计

总体设计的判断是把“开放题”作为更新组织方法，而非新增一种法定用地。概念结构包括：沿京张铁路遗址公园的公共问题展示与步行界面；连接三区两翼的验证责任链；跨社区、园区和站点的日常照护网；以及可撤回的临时测试点。现有用地、建筑、道路、绿地、公共空间和分期图层共同表达这一结构，但均基于 provisional boundary。[standard:MOHURD-URBAN-DESIGN-MEASURES] [depth:overall_spatial_structure]

城市更新建议分四类动作：

1. **先修补日常界面**：优先识别过街断点、无障碍缺口、遮阴与座椅不足、夜间导视、非机动车停放、设施报修和一线人员工作条件；这些低扰动动作也是 S11、S12 的公共利益检验。
2. **再嵌入共享功能**：在既有建筑和公共空间中概念性嵌入问题诊所、开放研究、测试预约、公众评议和人才服务，优先可逆改造。
3. **后讨论开发强度**：土地用途、总建筑规模、容积率、建筑密度、高度和退线必须等待官方控规、权属、现状测绘与工程条件；当前 [metric:floor_area_ratio] 为 unknown，不给出替代值。[standard:MOHURD-CONTROL-DETAILED-PLANNING] [depth:development_intensity_controls]
4. **以退出条件约束新设施**：任何传感、机器人、数字标识或临时构筑物均需写明目的、期限、人工负责人、事故处置、恢复方式与拆除责任，不能因“试验”而长期占用公共空间。

用地分区 [data:geometry/land_use.geojson#LU-001] 至 LU-021 是覆盖 SITE-001 的 21 个概念单元，不是已批准用途；建筑图层 [data:geometry/buildings.geojson#BLDG-001] 至 BLDG-024 包含保留、改造、填充各 8 个原型，不能直接对应现实地块的拆改留决定；道路 [data:geometry/roads.geojson#ROAD-001] 至 ROAD-013 只表达 9 条横向日常接缝与 4 条局部辅助联系，不是工程线位。

待补资料包括 official boundary、地块与权属、现状建筑质量、规划许可、道路红线、轨道出入口、市政容量、消防、文保、树木与地下管线。补齐后需由相应专业团队深化研究并依法履行程序；本方案不代表任何政府批准、投资或实施承诺。[data:geometry/constraints.geojson] [depth:risk_missing_data]

## 重点区域详细设计

三处重点区的判断均采用“定位 + 空间结构 + 建筑更新 + 交通慢行 + 公共空间 + AI 场景 + 实施风险”，但功能深度不同。以下均为可供专业团队深化的参考方案；三个 polygon 仅为临时粗略范围，不能确定地块边界、建设规模或拆改留。[standard:PROJECT-OFFICIAL-ANNOUNCEMENT] [depth:three_key_area_detailed_design] [metric:key_area_count]

### 众智园 AI 自主创新加速区

- **定位**：开放模型与具身 AI 的研发、评测、安全和能耗证据区。
- **空间结构**：建议把高风险技术测试置于受控室内或封闭场地，把公开方法、失败项和治理讨论置于外围可访问界面；清河关联空间承担低碳交往与生态教育，不承担未经批准的工程改造。
- **建筑更新**：优先评估既有研发建筑的可逆适配；新建、拆除、高度和总量均待现状、权属、控规和结构鉴定。
- **交通与公共空间**：员工、访客、物流、测试设备和公众参观分时分区；以步行、骑行和接驳概念改善到达。
- **场景**：T01 开放模型考场、T03 建筑能源影子孪生；“全球解题台”作为功能节点，不作建筑落地结论。
- **风险**：敏感数据、模型攻击、设备安全、能耗和误把测试标签当官方认证。

空间索引为 [data:geometry/key_areas.geojson#PROV-KEY-001]；研发与验证原型引用 [data:geometry/buildings.geojson#BLDG-007]、[data:geometry/buildings.geojson#BLDG-015]，场景落位引用 [data:geometry/public_space.geojson#SCN-001] 与 [data:geometry/public_space.geojson#SCN-003]。建筑基底和绿地比例分别见 [metric:building_footprint_area_sqm]、[metric:green_ratio]。

### 北京 AI 原点社区

- **定位**：公共问题提出、开放研究、跨机构组队和国际人才日常服务区。
- **空间结构**：建议用连续首层共享界面连接问题诊所、开源协作、成果发布、知识产权与生活服务；校园、园区和社区之间强调步行与无障碍连接。
- **建筑更新**：优先盘活可适配空间，保留真实使用者和一线运营；任何拆改留必须经产权、结构、消防、租赁与社区影响核查。
- **交通与公共空间**：把短时到访、日常通勤、夜间协作与居民安静需求分开管理。
- **场景**：S04 有出处的科研助手、S05 国际人才落地助手；“百年难题档案馆”连接铁路工程史、中关村创新文化和当年问题。
- **风险**：科研与个人数据越权、人才服务误导、活动扰民和创新叙事挤压社区生活。

空间索引为 [data:geometry/key_areas.geojson#PROV-KEY-002]，公共界面由 [data:geometry/public_space.geojson#SCN-004] 与 [data:geometry/public_space.geojson#SCN-005] 表达；其比例仅引用 [metric:public_space_ratio]。

### 大钟寺 AI 产业聚集区

- **定位**：AI 产品可解释体验、中小企业采用、公众对比评议和国际交流区。
- **空间结构**：建议围绕轨道到达、四象限步行联系和商业公共界面组织低门槛试用；每项体验同时展示数据来源、人工复核、能耗、期限和退出说明。
- **建筑更新**：以既有商业、办公和公共空间的分时复合为先，避免用大型展示建筑替代街区日常服务。
- **交通与公共空间**：高峰通勤、展会客流、配送和社区慢行需分别评估；本方案不确定道路工程与站点改造。
- **场景**：S09 AI 产品说明卡体验市集、S10 中小商户内容与翻译工作室；“城市评议厅”提供试用、申诉和回执。
- **风险**：商业宣传冒充公共认证、合成内容侵权、数字排斥和大型活动挤占公共空间。

空间索引为 [data:geometry/key_areas.geojson#PROV-KEY-003]，概念联系为 [data:geometry/roads.geojson#ROAD-001]；正式站点、道路与客流数据尚缺。

![三处重点区域的不同责任与实施风险](assets/figures/key-areas.png)

## AI 创新生态、人才画像与 AI+ 场景

创新生态的设计判断不是按“企业—人才—资本”抽象分类，而是把每道开放题映射到真实使用者、受影响者、一线运营者、验证者和责任人。每道题建立 Q-ID，至少包含题主、受益群体、问题基线、允许数据、权利状态、风险级别、测试地点、成功与停止条件、人工负责人、到期日和开放成果许可。[source:AGENT-TASKBOOK] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]

### Persona

| Persona | 关键需求 | 空间与运营响应 | 不可越过的边界 |
| --- | --- | --- | --- |
| 模型研究者与开源维护者 | 可复现实验、贡献声誉、跨机构协作 | AI 原点组队，众智园验证，公开失败与版本记录 | 未公开科研数据不得默认进入题库 |
| AI 初创团队的产品、测试与合规人员 | 低成本验证、专业服务、真实反馈 | T01—T03 分级测试，中关村翼匹配服务 | 场测与服务匹配不等于许可、融资或采购 |
| 本地居民与照护者 | 安全、安静、无障碍、拒绝和申诉 | 问题诊所、公众评议厅、线下渠道、日常照护网 | 不把居民行为用于画像营销 |
| 商户、物业、环卫和园林等一线运营者 | 工具可用、工作量可控、故障有人负责 | 共同定义 S10—S12，保留人工接管和报修 | 不以自动化转移安全责任或隐形增加劳动 |
| 规划、法律、伦理、安全与社会组织评议者 | 可追溯证据、独立复核、停止权 | G0—G4 闸门、公开意见与异议记录 | 不由单一技术团队自行批准升级 |
| 国际人才、学生与短期访客 | 多语信息、短期参与、可信服务 | S05、S07、开放驻留与无障碍体验路线 | 不自动判断签证、就业、住房或资格 |

### 12 张场景卡

| ID | 场景与落位 | 数据、人工与运营边界 | 失败与退出 |
| --- | --- | --- | --- |
| **T01** | 众智园“开放模型考场”：安全、偏差、隐私、鲁棒性与能耗评测 [data:geometry/public_space.geojson#SCN-001] | 只用公开、清权或合成数据；方法和失败项公开；专家签署 | 未满足基线、权利不清或不可复现即停止，不发“官方认证” |
| **T02** | 小月河“具身 AI 慢速测试”：配送、巡检、无障碍辅助机器人在封闭或分时环境测试 [data:geometry/public_space.geojson#SCN-002] | 地理围栏、安全员、急停、限定时段；进入公共空间须另行审查 | 近失事件、投诉超出处理能力或无法安全接管即退回 G1/G2 |
| **T03** | 众智园“建筑能源影子孪生”：预测与调度算法以 shadow mode 验证 [data:geometry/public_space.geojson#SCN-003] | 默认只提出建议，不直接控制设备；设施专业人员决定真实执行 | 节能证据不足、舒适度受损或数据越权即停用并保留日志 |
| S04 | AI 原点“有出处的科研助手” [data:geometry/public_space.geojson#SCN-004] | 每条回答显示来源与不确定性；可转人工馆员 | 无法给出出处或涉及未授权成果时拒答 |
| S05 | AI 原点—中关村翼“国际人才落地助手” [data:geometry/public_space.geojson#SCN-005] | 只解释公开流程，提供人工窗口 | 不自动决定签证、就业、住房、补贴或资格 |
| S06 | 中关村翼“算力、数据与专业服务导航” [data:geometry/public_space.geojson#SCN-006] | 透明列出条件与提供方，人工确认 | 无可用资源时明确返回“未匹配”，不承诺配额或融资 |
| S07 | 遗址公园“无障碍文化伴游” [data:geometry/public_space.geojson#SCN-007] | 自愿启用；字幕、音频、简明文本与离线模式并行；不做人脸识别 | 内容错误可现场更正并发版本回执 |
| S08 | 小月河“生物多样性公民科学助手” [data:geometry/public_space.geojson#SCN-008] | 环境数据时空聚合，不采个人轨迹 | 干扰栖息地或识别敏感物种位置时降低精度或停止公开 |
| S09 | 大钟寺“AI 产品说明卡体验市集” [data:geometry/public_space.geojson#SCN-009] | 展示数据、能耗、隐私、人工复核、有效期与退出方法 | 说明卡不完整、误导或投诉未处理即撤展 |
| S10 | 大钟寺“中小商户内容与翻译工作室” [data:geometry/public_space.geojson#SCN-010] | 人工发布、版权来源记录、合成内容标识 | 发现虚假代言、歧视或侵权即下线并通知受影响者 |
| S11 | 全带“公共空间舒适度协同助手” [data:geometry/public_space.geojson#SCN-011] | 只用天气、设施状态和聚合使用数据提出遮阴、座椅与活动建议；运营人员决定 | 若建议增加维护负担或排斥弱势群体，转为人工共设计 |
| S12 | 社区节点“城市问题分流与共设计助手” [data:geometry/public_space.geojson#SCN-012] | 排序逻辑可解释，线下与人工通道并存；居民可申诉、更正、撤回 | 系统性忽略少数群体时暂停自动排序并公开修订 |

T01—T03 是产业测试验证场景；它们和其余场景共用成熟度闸门：**G0 纸面审查 → G1 合成数据实验 → G2 封闭场测 → G3 有监督公共 Beta → G4 有条件复制或退役**。每次升级必须重新检查数据权利、风险、人工接管、事故响应、无障碍、维护能力和到期时间；G4 同时允许“退出”，不把扩张视为唯一成功。[data:geometry/public_space.geojson#SCN-001] [data:geometry/roads.geojson#ROAD-001] [depth:risk_missing_data]

公众评议不是点赞。每条意见生成 **公共回执**：记录已采纳、部分采纳、不采纳或待核实；给出理由、负责人、预计复核节点和可申诉渠道。年度公开通过、未通过、主动停止和到期退役的题目；安全地停止一个不适当试验，也计入责任贡献。当前缺少真实用户研究、影响评估和运营主体授权，因此所有场景仍是概念建议。

## 用地、建筑规模与拆改留方案

用地判断是让法定分类与“开放题”运营叠加表达：AI 研发、产业服务、社区服务和公园开敞空间仍使用可校验 land_use_code；问题诊所、测试预约、公共评议等是运营层，不自造新的法定用地类别。[source:MNR-LAND-USE-CLASSIFICATION] [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE] [depth:land_use_layout]

[data:geometry/land_use.geojson#LU-001] 至 LU-021 将 SITE-001 分为 21 个无 gap、无 overlap 的概念单元；其用途仍需法定规划确认。建筑图层 [data:geometry/buildings.geojson#BLDG-001] 至 BLDG-024 的基底合计 101,646 m² [metric:building_footprint_area_sqm]，但总建筑面积、容积率、建筑密度、高度和开发强度仍需官方控规与逐栋测绘；[metric:floor_area_ratio] 暂无计算条件。[standard:MOHURD-CONTROL-DETAILED-PLANNING] [depth:development_intensity_controls]

拆改留采用“先调查、后分类、再决策”的筛选框架：

| 类别 | 概念判断 | 必须补齐的依据 |
| --- | --- | --- |
| 保留 | 具有遗产、公共服务、持续使用或低碳价值的建筑优先保留评估 | 文保、产权、结构、消防、实际使用 |
| 改造 | 能以低扰动适配共享研究、人才服务、社区服务或日常照护的空间优先可逆改造 | 租赁、结构、设备、无障碍、运营维护 |
| 拆除 | 仅作为经法定程序认定的危险、冲突或确无适配价值对象的候选，不在本方案落到地块 | 权属、鉴定、补偿、社会影响、审批 |
| 新建 | 只有在既有空间无法满足经证明的公共需求时才进入比较 | 控规、交通、市政、消防、能耗、全生命周期成本 |

体量与风貌建议以连续首层、可访问公共界面、对遗址公园与水系的低压迫关系为方向；不提出最终高度数值。[depth:height_massing_character] [depth:retain_renovate_demolish] [standard:MOHURD-ARCH-DESIGN-DEPTH-2016]。建筑专业成果深度条目已完整响应，但官方建筑深度文件、现状测绘和工程条件仍是数据缺口，两者不得混同。

## 交通、轨道、市政与公共服务设施

交通判断是优先修复“最后一段日常到达”，再讨论活动客流和技术测试。概念建议包括：校区—园区—社区的连续步行与骑行、轨道站点出入口至公共界面的无障碍联系、非机动车有序停放、配送与测试设备错时、活动高峰临时管理以及保留人工导视。道路中心线 [data:geometry/roads.geojson#ROAD-001] 只表达关系，不是道路红线或工程线位。[standard:MOHURD-URBAN-DESIGN-MEASURES] [depth:traffic_rail_slow_parking]

市政与新型基础设施采用“最小必要、可维护、可撤回”原则：

- 端侧算力、网络和感知设备按场景按需布置，明确数据保留期、维护人和拆除责任；
- T03 先以影子模式验证，任何真实设备控制均由设施专业人员另行批准；
- 充电、能源、雨洪、给排水、消防和地下管线必须以正式容量与工程资料深化；
- 公共服务保留电话、窗口、纸质和人工协助，不以 App 作为唯一入口；
- 数据平台之间只交换完成题目所需的最小字段，不建设无明确目的的全域人群监测。

相关资料缺口登记于 [data:geometry/constraints.geojson]，总体范围见 [metric:site_area_sqm]，专业深化项见 [depth:municipal_new_infrastructure]。目前缺少轨道出入口、道路等级、交通量、停车、管线、负荷、消防、应急和公共服务容量，故所有设施布局均是概念建议，不是工程结论或政府建设安排。

![交通慢行、蓝绿空间与低风险场景关系](assets/figures/mobility-bluegreen.png)

## 蓝绿空间、公共空间与城市风貌

蓝绿空间的判断是把京张铁路遗产、清河与小月河相关空间作为公共记忆、日常照护和低风险学习的共同界面，而不是技术展陈背景。连续绿地和公共空间由 [data:geometry/green_space.geojson#GREEN-001] 与 [data:geometry/public_space.geojson#SCN-011] 表达，当前比例只引用 [metric:green_ratio] 与 [metric:public_space_ratio]。[standard:MOHURD-URBAN-DESIGN-MEASURES] [depth:blue_green_public_space]

文化叙事采用三层时间：**京张铁路的工程报国与公共基础设施史 → 中关村以问题驱动的科研和创业文化 → AI 时代对权利、失败和公共责任的再定义**。展示不只纪念成功者，还记录提出问题的居民、一线维护者、验证失败的团队、要求停止的评议者和完成复盘的人。历史材料、人物、照片和档案在取得来源与展示许可前只列题目，不纳入图面资产。

三处地标均是功能节点的概念建议：

1. **百年难题档案馆｜Century Challenge Archive**：建议位于 AI 原点社区或遗址公园关联节点，呈现历史难题、当年题库、公开证据、失败复盘和版本更正。
2. **全球解题台｜Global Co-solving Forum**：建议位于众智园，以可读方式展示题目、团队、G0—G4 状态、测试边界、停止理由与可复用成果。
3. **城市评议厅｜Civic Review Forum**：建议位于大钟寺，提供对比试用、人工解释、意见提交、申诉和公共回执。

日常照护网由小尺度对象构成：阴凉、饮水、座椅、厕所、无障碍、照明、过街、安静角落、儿童与老人停留点、维修工位和清晰导视。它们按季度公开问题、责任人和处理状态，使空间品质不依赖年度盛会。城市风貌建议强调耐久、可修、可替换的构件和清晰状态标识；不使用未清权图片、第三方字体文件、企业商标或人物肖像，也不把地标写成已批准建设。

待补资料包括遗产价值评估、水务与生态约束、树木调查、无障碍审计、公共空间权属、维护预算与真实使用研究；补齐前不得确定构筑物、岸线、照明或景观工程。

## 更新项目清单、实施政策与分期计划

项目清单按“证据准备—低扰动原型—受控验证—公众评议—条件性扩展或退出”排序，不按未确认的建设时序排序。[data:geometry/phasing.geojson#PHASE-001] 是概念性分期索引，不是政府实施计划。[depth:renewal_project_list] [depth:phasing_implementation]

| 项目包 | 概念内容 | 前置条件与退出条件 |
| --- | --- | --- |
| P01 开放题库与权利清查台 | Q-ID、题主、受益人、数据权利、风险、期限和许可 | 无合法数据或无公共问题即不立项；公开撤题与理由 |
| P02 日常照护问题诊所 | 线下征题、设施报修、无障碍和一线劳动问题 | 必须有人工受理、公共回执和维护责任人 |
| P03 众智园验证环境 | T01、T03、专家复核和失败发布 | 安全、数据、能耗或设施条件不足即降级或停止 |
| P04 小月河低速场测界面 | T02、S08 与分时低风险测试 | 无地理围栏、安全员、急停或生态许可即不开启 |
| P05 AI 原点开放研究与人才服务 | S04、S05、驻留、组队和知识产权咨询 | 不处理未授权科研与个人数据；服务不承诺资格 |
| P06 大钟寺公众评议与中小企业采用 | S09、S10、公众回执和人工帮助 | 误导、侵权、投诉无响应或挤占日常服务即撤展 |
| P07 三地标与贡献档案 | 档案馆、解题台、评议厅及责任贡献记录 | 先做可逆展陈；无权利清单不展示第三方资产 |
| P08 证据与退出档案 | 年度 changelog、事故、申诉、未通过和退役记录 | 不能只发布成功案例；到期未复核自动暂停 |

实施包统一为三个空间阶段，与单个场景的 G0—G4 测试等级分开管理：**PHASE-001 公开出题与可逆修补**承接 G0 纸面审查、G1 合成数据实验；**PHASE-002 封闭共答与受控验证**承接 G2 封闭场测；**PHASE-003 公众评议与采用/退役**承接 G3 有监督公共 Beta、G4 有条件复制或退役。[data:geometry/phasing.geojson#PHASE-001] [data:geometry/phasing.geojson#PHASE-002] [data:geometry/phasing.geojson#PHASE-003] 三个 polygon 只是工作包络，不表示确定年份、投资、征收或审批顺序。

年度四季运营为概念建议：

- **春季：征题与清权**——居民、研究者、企业和运营者提交问题，先检查公共利益、数据权利和可测试性；
- **夏季：全球共答**——跨学科组队、开发者驻留、导师门诊和开放方法工作坊；
- **秋季：受控场测**——按 G0—G4 进入众智园、小月河和大钟寺的不同环境，并保持人工接管；
- **冬季：JZ Open Challenges Review Week**——发布通过、未通过、主动停止与到期退役项目，展示公共回执和下一年度问题。

常设机制包括月度问题诊所、测试预约、事故与退出记录、开发者社区维护、公共体验路线、国际传播和后续跟踪。招引、采购、投资、政策和活动安排均不作政府承诺；任何 6/12 个月跟踪周期都需由未来运营主体确认。

## 指标体系、面积复算与合规矩阵

当前空间面积、比例和线长来自 9 个 GeoJSON；persona 数来自正文，案例数来自正文与 sources.json。主要结果如下：

| 指标 | 设计意义 | 当前证据与限制 |
| --- | --- | --- |
| [metric:site_area_sqm] | 决定所有面积比例的分母 | 由 provisional [data:geometry/site_boundary.geojson#SITE-001] 复算，不用于官方精确面积 |
| [metric:building_footprint_area_sqm] | 检查空间供给与开敞界面的关系 | 仅反映方案建筑基底 [data:geometry/buildings.geojson#BLDG-001]，不是现状或获批总量 |
| [metric:green_ratio] | 检查生态、遮阴与日常停留支撑 | 来自 [data:geometry/green_space.geojson#GREEN-001]，需随官方边界和生态资料重算 |
| [metric:public_space_ratio] | 检查公共评议与日常交往的空间条件 | 来自 [data:geometry/public_space.geojson#SCN-001] 至 SCN-012，不等于全部空间可依法开放 |
| [metric:key_area_count] | 检查三处必选重点区是否齐备 | 数量可核验，面积与边界仍 provisional |
| [metric:floor_area_ratio] | 检查开发强度 | 缺官方控规与可计容建筑面积，当前不计算 |

| 用地结构 | 当前量化 | 设计判断与限制 |
| --- | --- | --- |
| 总体与拓扑 | 11,412,825 m² [metric:land_use_area_sqm]；覆盖率 1.0 [metric:land_use_coverage_ratio]；gap 0 m² [metric:land_use_gap_area_sqm]；overlap 0 m² [metric:land_use_overlap_area_sqm] | 21 个单元 [metric:land_use_zone_count]、12 类用途 [metric:land_use_category_count] 只对应当前 provisional SITE-001 |
| 商业服务 | 164.12 ha [metric:land_use_area_sqm_05] | 支撑大钟寺体验、市民评议和中小企业服务，不等于商业开发指标 |
| 居住 | 城镇 161.13 ha [metric:land_use_area_sqm_0701]；农村宅基地 137.20 ha [metric:land_use_area_sqm_0702] | 保留日常生活与照护界面，具体权属与更新方式待调查 |
| 公共服务 | 科研 137.28 ha [metric:land_use_area_sqm_0802]；文化 54.30 ha [metric:land_use_area_sqm_0803]；教育 126.05 ha [metric:land_use_area_sqm_0804]；体育 32.77 ha [metric:land_use_area_sqm_0805]；医疗 68.71 ha [metric:land_use_area_sqm_0806] | 为问题提出、研发验证和公共服务预留功能关系，不形成地块许可 |
| 开敞与留白 | 公园 145.02 ha [metric:land_use_area_sqm_1401]；防护绿地 23.94 ha [metric:land_use_area_sqm_1402]；广场 53.41 ha [metric:land_use_area_sqm_1403]；留白 37.36 ha [metric:land_use_area_sqm_16] | 优先保障横向树荫、雨洪、日常停留与可逆试验 |

| 建筑原型 | 当前量化 | 使用边界 |
| --- | --- | --- |
| 基底 | 101,646 m² [metric:building_footprint_area_sqm]，占 SITE-001 的 0.8906% [metric:building_footprint_ratio] | 仅为 24 个概念原型 [metric:building_prototype_count]，不是现状建筑盘点 |
| 干预方式 | 保留 8 个 [metric:retain_prototype_count]；改造 8 个 [metric:renovate_prototype_count]；填充 8 个 [metric:infill_prototype_count] | 每个对象仍需产权、结构、消防、文保和实际使用核查 |

| 慢行、蓝绿与公共空间 | 当前量化 | 设计判断与限制 |
| --- | --- | --- |
| 绿地 | 1,144,469 m² [metric:green_space_area_sqm]，占 10.03% [metric:green_ratio]；其中横向与节点绿地约占 94.51% | 重点支持横向树荫缝、河岸缓冲和口袋照护空间，非已批准绿线 |
| 公共场景空间 | 101,648 m² [metric:public_space_area_sqm]，占 0.89% [metric:public_space_ratio] | 12 个场景的设计包络，不表示全部空间已获公共开放许可 |
| 慢行线网 | 总长见 [metric:road_centerline_length_m]；横向接缝见 [metric:cross_corridor_slow_length_m]，纵向辅助段见 [metric:longitudinal_slow_length_m] | 13 条概念线 [metric:road_feature_count]，其中横向 9 条 [metric:cross_corridor_count]、纵向局部 4 条 [metric:longitudinal_line_count]；不替代道路红线与工程设计 |

| 三个实施包 | 当前量化 | 与场景测试等级的关系 |
| --- | --- | --- |
| PHASE-001 | [metric:phase_1_area_sqm]，[metric:phase_1_ratio] | G0/G1：公开出题、清权、基线与可逆修补 |
| PHASE-002 | [metric:phase_2_area_sqm]，[metric:phase_2_ratio] | G2：封闭共答与受控验证 |
| PHASE-003 | [metric:phase_3_area_sqm]，[metric:phase_3_ratio] | G3/G4：有监督评议、采用或退役 |
| 全域关系 | 3 个工作包 [metric:phase_count]，覆盖 SITE-001 [metric:phase_coverage_ratio] | 成熟度包络，不是确定开发时序 |

| 任务与重点区 | 当前量化 | 使用边界 |
| --- | --- | --- |
| 三处重点区 | 合计 [metric:key_area_total_sqm]；众智园 [metric:key_area_zhongzhiyuan_sqm]、AI 原点 [metric:key_area_ai_origin_sqm]、大钟寺 [metric:key_area_dazhongsi_sqm] | [metric:key_area_count] 为 3；面积来自 provisional_rough polygon |
| 公共程序 | 12 个场景 [metric:scenario_count]、6 类 persona [metric:persona_count]、8 个案例 [metric:case_count]、3 个地标 [metric:landmark_count] | 数量对应本提案内容，不代表已批准运营项目 |
| 正式约束 | 当前 0 个 feature [metric:constraints_feature_count] | 表示约束资料未入包，不表示现实中没有文保、水务、消防、市政或生态约束 |
| 待官方数据 | [metric:floor_area_ratio]、[metric:gross_floor_area_sqm]、[metric:road_area_sqm] | 分别需要法定控规、逐栋可计容面积与正式道路面/红线 |

compliance_matrix.json 对公告 17 项和 agent.1—agent.6 共 23 项逐条使用不同的章节、图层、指标、图纸、来源与自检证据，不以统一 payload 代替设计判断。standard_matrix.json 对 5 项可用标准标记 addressed，并把建筑设计深度标准保持 nonmandatory data_gap。design_depth_matrix.json 的 15 个核心深度项均为 complete，表示应交成果链已经展开；每项另列 official_data_gap，明确这不等于官方红线、控规、权属、现状或工程数据已经取得。[depth:metrics_recalculation] [standard:MOHURD-CONTROL-DETAILED-PLANNING]

图层替换、面积复算、矩阵和图件必须同版更新；如果 official polygon 到位而任一比例、图件或引用仍沿用 provisional 结果，应视为证据版本不一致。

![面积、覆盖关系与实施条件](assets/figures/metrics-evidence.png)

## 风险、版权与合规说明

| 风险 | 控制与退出条件 |
| --- | --- |
| 临时边界被误读为官方控制 | 所有图文持续标注 provisional；官方 polygon 到位后整包重算，旧版归档但停止引用 [source:PROVISIONAL-BOUNDARIES] |
| 权属、拆改留和工程结论越权 | 仅给筛选方法和概念建议；缺权属、控规、鉴定、市政、消防、文保即不作地块结论 [depth:risk_missing_data] |
| AI 数据、隐私和安全事件 | 数据最小化、用途限定、人工接管、事故记录、申诉和到期删除；高风险场景不能越级进入公共环境 |
| 商业展示冒充公共认证 | 所有测试状态写清提供方、方法、有效期与限制；无官方授权不使用“认证”“批准”等表述 |
| 失败被隐藏 | 未通过、主动停止、投诉、修订和退役与成功项目同版公开；无复盘不得升级 |
| 数字排斥与维护负担 | 线下、人工、电话和纸质通道并存；把居民和一线运营者纳入评议，工具增加负担时暂停 |
| 活动挤压日常生活 | 日常照护问题优先；噪声、通行、生态或投诉无法控制时缩小、改期或取消 |
| 版权与品牌风险 | 逐资产权利台账见 report/copyright_statement.md；不使用外部图片、第三方字体文件、企业商标或人物肖像 |

本方案文字、VI 方向和程序派生图由本投稿原创生成；案例只作事实性名称和链接引用，不复制网页图片、Logo、版式或长文本。AI 工具负责辅助研究、写作、结构化与派生表达，不能承担法律或专业责任；GitHub 投稿者负责来源、许可、数据、翻译、空间、工程与最终提交复核。[source:ARCH-DESIGN-DEPTH-DATA-GAP] [standard:MOHURD-ARCH-DESIGN-DEPTH-2016]

所有空间、运营与政策内容均为概念建议、参考方案或可供专业团队深化研究的材料；不构成政府承诺、规划审批、精确控规、权属判断、拆改留决定、工程可行性、投资测算、采购、招商、资金或活动安排。

## 参考资料

- [source:OFFICIAL-ANNOUNCEMENT] 百年京张 AI 创新带城市设计国际方案征集资格预审公告，正式任务与范围语义。
- [source:AGENT-TASKBOOK] 面向全球智能体的开源征集任务书摘录，品牌、生态、场景、文化、运营与统一边界条款。
- [source:MOHURD-URBAN-DESIGN-MEASURES] 城市设计管理办法，本地官方快照。
- [source:MOHURD-CONTROL-DETAILED-PLANNING] 城市、镇控制性详细规划编制审批办法，本地官方快照。
- [source:MNR-LAND-USE-CLASSIFICATION] 国土空间调查、规划、用途管制用地用海分类指南，本地官方快照。
- [source:PROVISIONAL-BOUNDARIES] 仓库临时粗略边界，仅用于生成、自检、图解与讨论。
- [source:ARCH-DESIGN-DEPTH-DATA-GAP] 建筑工程设计文件编制深度规定（2016 年版）待补官方文件记录。
- [source:CASE-AISINGAPORE-100E]、[source:CASE-MILA]、[source:CASE-VECTOR-INSTITUTE]、[source:CASE-PUNGGOL-DIGITAL-DISTRICT]、[source:CASE-SHANGHAI-MOSU-SPACE]、[source:CASE-PITTSBURGH-ROBOTICS]、[source:CASE-KNOWLEDGE-QUARTER-LONDON]、[source:CASE-STATION-F]：8 个 background_case_study，访问日期均为 2026-08-08；URL、允许与禁止用途见 sources.json。
- 专业响应索引：[standard:PROJECT-OFFICIAL-ANNOUNCEMENT]、[standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]、[standard:MOHURD-URBAN-DESIGN-MEASURES]、[standard:MOHURD-CONTROL-DETAILED-PLANNING]、[standard:MNR-LAND-USE-CLASSIFICATION-GUIDE]、[standard:MOHURD-ARCH-DESIGN-DEPTH-2016]。
- 设计深度索引：[depth:existing_conditions_diagnosis]、[depth:three_level_scope_framework]、[depth:overall_spatial_structure]、[depth:land_use_layout]、[depth:development_intensity_controls]、[depth:height_massing_character]、[depth:retain_renovate_demolish]、[depth:traffic_rail_slow_parking]、[depth:municipal_new_infrastructure]、[depth:blue_green_public_space]、[depth:three_key_area_detailed_design]、[depth:renewal_project_list]、[depth:phasing_implementation]、[depth:metrics_recalculation]、[depth:risk_missing_data]。
