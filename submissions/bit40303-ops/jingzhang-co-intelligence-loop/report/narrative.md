## REV 22 提交前合规整改

本方案文本、图表及概念空间数据由人工智能辅助生成，已由提交者人工复核。其中总体范围与三处重点区几何为 provisional 概念数据，不替代法定规划、测绘、审批或工程成果。 GlobalBuildingAtlas 的 CC BY-NC 派生表、图片和指标已从公开提交包完整移除；现行个人信息、网络数据、生成式AI与生成内容标识要求已纳入实施闸门。作品标题统一为“各民族共创的 AI 日常城市”，避免将价值主张误读为身份识别。A0展板改为总体空间与治理实施两张独立叙事图，不再缩排A3页面。

## REV 25 京张档案图谱、文化AI展馆与内容扩展


# Formal Narrative

## REV 25 民族文化展陈、日常城市服务与文明种子库

本轮将“民族 AI”收束为“民族文化展陈 × AI”：以口述史、工艺、语言和共同建设叙事为展陈内容，由文化持有者、社区代表和专业人员共同策展，AI负责多语转写、字幕、知识关联、无障碍讲解和教育版本生成；同时保留8项使用者权利与5步共创闭环。56席是轮换的共同策展与公共议题席，不采集或推断个人民族身份，不代表法定民族机构或本地人口统计。

本轮将方案重构为“一轴三核两翼五类用地”的民族文化展陈与 AI 日常城市，并新增“京张文明种子库 / Jingzhang Living Archive”：AI研发创新用地、AI绿地与开放空间、AI线下产业服务、社区服务与配套、民族文化展陈与国际传播共同形成空间账本；种子库以一库三站、七步保存、三方责任把传统文化的授权原件、人工校勘和AI派生版本纳入可迁移长期保存机制。五类用地的面积、比例和用途来自包内 `geometry/land_use.geojson` 与 `metrics.json`，属于概念分区，不冒充法定控规。

新增 `visual/assets/service_system.json` 作为场景与治理的结构化事实源：六类日常链路共25个场景，覆盖研发、交通、公共服务、社区、照护和文化；每个场景绑定用户、AI增强、具名人工负责人和退出路径。新增 E05 文明种子库场景绑定文化权利人、专业守护人和技术托管人，不把单一平台或区块链写成永久承诺。56席作为轮换的共同策展与公共议题席，不采集或推断个人民族身份。

交互页面 `visual/index.html` 增加用地账本、重点区工作台、产业链、轮换策展席与公共议题矩阵、文明种子库七步交互、场景筛选、普通服务/AI增强/退出复原对比、六类用户日常旅程、证据仪表盘和四阶段实施闸门。A3 七页图册与 A0 两张展板按同一数据源重出；页面和图册均保留 provisional 边界提示、证据等级和人工复核要求。

REV25 将网页从常见的深色大图仪表盘改为“京张铁路文化档案馆”式图谱界面：米白图纸底、京张红轨道索引、宋体展签、档案编号和总图图版形成项目专属识别。新增京张民族文化AI展馆，四个展厅、五步参观路线和六类文化媒介均进入 `visual/assets/service_system.json#cultural_ai_museum`；交互展项明确AI转译、人工校勘和文明种子库保存关系。

### REV 21 场景证据与电子化基础设施增补

为接近参考项目的“空间评审工作台”深度，页面新增场景 URL 状态：`?scenario=G01&station=origin&mode=compare` 可复现任一场景、重点区和查看模式。每个场景由普通基线、可选 AI、停止/恢复三段组成，并显示最小数据、具名责任人、证据等级和四项待现场指标。新增12类、38个概念 AI 节点，覆盖研发、安全、中试、产业服务、交通、无障碍、政务、社区、照护、教育就业、民族文化展陈和 AI 绿地；同时建立感知、边缘、数据、模型、服务、治理六层电子化基础设施栈。结构化字段集中在 `visual/assets/service_system.json`，并已纳入 `metrics.json` 与 `manifest.json`。

This narrative is derived from the structured AI package. Geometry, metrics, compliance matrix, drawings, and visual/index.html remain cross-checked deliverables.

本轮公开资料增强接入北京市交通委员会路侧停车位基础信息：在 provisional SITE-001 内筛选并去重 19 处记录，共 985 个泊位。来源、抓取日期、文件哈希和空间筛选规则见 sources.json、assumptions.json 与 geometry/public_space.geojson。

## 官方交通运营目录补充
[source:BEIJING-JTW-TRANSIT-OPERATIONS] 北京市交通委员会的[北京市交通出行数据下载](https://service.jtw.beijing.gov.cn/cxsjxz/)页面将轨道线路、轨道站点、公交线路和公交站点信息标注为“无条件开放”。本次采用四份 XLSX 下载快照，记录 22 条轨道线路、1,079 条轨道站点服务记录、1,165 条公交线路、58,697 条公交站点服务记录，并从轨道站点表中精确匹配到 31 条周边名称服务记录。四份表格没有可核验的项目坐标，因此只用于接驳、首末班和公交服务运营背景，不生成项目空间点位。来源和哈希见 `sources.json`。

## REV 06 官方背景补充
[source:HAIDIAN-2025-STATISTICAL-BULLETIN] 海淀区2025年统计公报补充创新、人口、公共服务和环境的区级初步统计；[source:HAIDIAN-AI-POLICY-2025] 中科城〔2025〕91号用于校准AI生态机制，但不转换为本项目资金或审批承诺；[source:HAIDIAN-QINGHUAYUAN-STATION-RESTORATION] 清华园车站旧址资料补充既有修缮、绿化、轨道和展陈基线。三组资料均记录官方URL、访问日期和下载快照SHA-256；区级统计不冒充项目范围数据，文化数据不生成法定几何。

## REV06_CONTROL_STATUS
[source:HAIDIAN-JINGZHANG-CONTROL-PLAN-DRAFT] 海淀区政府2024年公示已公开HD00-1601等街区控规草案PDF：官方栅格范围、‘一带一轴、两心多点’结构、2035年人口/用地/建筑规模、设施数量、路网密度和绿色出行目标均已写入 `metrics.json`。附件同时声明图纸为过程稿、最终以规划审批为准；公开范围与竞赛11.4平方公里及三处重点区不等同，且没有SHP/GeoJSON/CAD，所以计算几何继续标记为provisional。

[source:HAIDIAN-2026-GOVERNMENT-WORK-REPORT] 海淀区2026年政府工作报告确认沿线街区控规通过技术审查；本包不把技术审查写成市政府批复或法定红线。

[source:HAIDIAN-JINGZHANG-PHASE2-PROJECT] 官方项目页补充京张二期南起西直门、北至北五环，用地53.09万平方米、长度9千米；只作公共空间尺度基线，不生成竞赛或工程polygon。

## REV 08 多渠道公开数据补充
[source:BEIJING-YLLHJ-JINGZHANG-PHASE2-SUPPORTING-COMPLETION] 北京市园林绿化局将项目状态更新到2026年7月：二期配套项目已完工，北段清华东路至北五环整体建设约30.01公顷，南段为西直门至知春路附属配套工程。公开页没有竣工图或测量坐标，文字面积不转换为as-built polygon。

[source:BEIJING-CCGP-JINGZHANG-PHASE2-SUPPORTING-SURVEY] 中国政府采购网确认二期配套项目勘察及相关服务预算62.15万元、期限15日历天，但采购文件需现场取得，公开页不含勘察报告、现状测绘或坐标；该来源证明成果应由委托方持有，不关闭建筑、市政和安全数据请求。

[source:BEIJING-JINGZHANG-2025-OPERATIONS] 北京市政府门户援引公园管理方称2025年举办主题活动60多场、游客430多万人次；结构化指标只记录60场和430万人次的公开下限，不用于未来需求承诺。

[source:BEIJING-AI-ORIGIN-2026-ECOSYSTEM] 北京市政府门户公开AI原点社区更大政策范围的37所高校、10个新型研发机构、52个全国重点实验室、106个国家级科研机构、1.23万名AI学者，以及439家入驻企业/325家AI企业/74%占比。这些数值不冒充104.3公顷竞赛重点区内统计。

## 公开审批、文保与范围口径补充
[source:BEIJING-FRC-JINGZHANG-PHASE2-IMPLEMENTATION-APPROVAL] 与 [source:BEIJING-GGZY-JINGZHANG-PHASE2-CONSTRUCTION-TENDER] 补充西直门至知春路23.08公顷批准建设包、计划总投资1.6252亿元、计划工期339日及施工专业范围；[source:BEIJING-FRC-JINGZHANG-PHASE2-TENDER-SCHEME] 补充勘察、设计、施工、监理单项合同估算。23.08公顷建设包与53.09公顷全走廊项目展示口径、11.4平方公里竞赛范围分别记录，均不反推polygon。

[source:BEIJING-AI-ORIGIN-COMMUNITY] 官方页面的约3平方公里AI原点社区是以五道口为核心的更大政策创新街区，不等于征集公告104.3公顷重点设计区。[source:BEIJING-HERITAGE-BATCH11-NOTICE] 已确认清华园车站旧址为第十一批北京市文物保护单位第26项；北京市公共数据平台虽然存在历史文保控制范围目录，但公开文件版本为2020-10-19且下载/API需统一身份认证，不能覆盖2025年第十一批。通知所称保护范围及建设控制地带图纸仍未作为公开附件提供，本包不使用通用缓冲区冒充法定控制线。

## 缺失数据接入闭环
`sources.json` 新增8类数据索取协议，覆盖竞赛边界、最终控规、建筑现状、权属、道路交通、文保、市政和环境安全。每项明确责任部门、最低字段、格式、验收条件、替换对象及隐私控制；正式资料到位后统一替换provisional层、按EPSG:4548复算并重出全部成果。

## REV 09 合同链与开放现状补充
[source:BEIJING-GGZY-JINGZHANG-PHASE2-SURVEY-CONTRACT] 公开主项目控制测量、地形图、树木、地下管线和工程勘察的签约范围与中材地质工程勘查研究院这一专业单位；主/配套设计、施工和监理合同进一步锁定北京北林地景园林规划设计院、北京金都园林绿化和北京中城建建设管理等成果链主体。公开页证明成果存在并给出申请路径，但没有附测绘、设计、施工、监理或验收文件。

[source:BEIJING-CCGP-JINGZHANG-PHASE2-SUPPORTING-SURVEY-AWARD] 补齐配套勘察成交主体和60.8万元成交价；[source:BEIJING-CCGP-JINGZHANG-METRO-SAFETY-ASSESSMENT] 补齐53万元地铁安全评估采购状态。最终评估报告仍是受控数据请求。

[source:OPENSTREETMAP-JINGZHANG-EXISTING-CONTEXT] 以 ODbL 开放数据补入建筑、道路、轨道、水系和设施/交通点现状参考，全部按 provisional SITE-001 裁切并保留对象ID、下载哈希和许可。该层只支撑概念阶段现状理解和现场核查，不替代官方红线、权属、专业测绘或地下设施资料。

[source:BEIJING-YLLHJ-JINGZHANG-CONNECTIVITY-CONTEXT] 补充既有走廊16.8公顷绿地转化、5条东西向道路连通、8处断点打通及近70个社区/约45万人服务背景；均按非polygon文字指标管理。

## REV 10 官方目录与开放地表覆盖

[source:TIANDITU-HAIDIAN-OFFICIAL-GEO-CATALOG] 将高精度底图缺口收敛为明确的受控申请：临时项目范围相交502个独立1:500图幅，最新目录版本分为2024版253幅和2021版249幅；样本均为秘密DWG，由北京市测绘设计研究院分发。公开包只保存目录事实，不保存受控成果。

[source:ESA-WORLDCOVER-JINGZHANG-2021] 从CC BY 4.0免登录COG提取188×1050像元项目裁片，保留EPSG:4326地理参考、源文件哈希、临时边界遮罩和分类统计。其2021年约10 m分类只作地表覆盖背景，与法定用地、现状测绘和最终边界分层管理。

## REV 11 开放数字表面高程筛查

[source:COPERNICUS-DEM-GLO30-JINGZHANG] 通过Copernicus官方产品页和AWS开放数据登记页核验GLO-30产品、许可、精度、坐标与免账户分发路径。仅下载跨39°/40°纬线的两个相交COG内部块，保留对象ETag、长度、Range和SHA-256，生成57×315的16位EGM2008分米高程裁片、统计JSON和预览。

该层补齐的是2011-2015时期约30 m数字表面模型背景。建筑、基础设施和植被会进入高程，临时边界也会影响统计，因此高程与坡度只用于概念阶段地形理解和复测优先级，不关闭现状裸地测绘、排水、洪水、土方、无障碍、管线和验收数据请求。

## REV 12 长期水体与近期遥感现状

[source:JRC-GSW-V15-JINGZHANG] 核验JRC Global Surface Water v1.5官方版本、许可、引用、处理说明和QML分类，按字节范围取得occurrence、transitions与2022-2024 extent的六个相交源对象项目行，生成三幅64×350无损代码栅格、统计JSON和预览。该层补充1984-2024长期水体观测筛查，不替代蓝线、窄/覆盖水体调查、排水、防洪、水质或现状测量。

[source:COPERNICUS-SENTINEL2-L2A-JINGZHANG-20260715] 通过Copernicus CDSE官方STAC和Earth Search公开COG交叉核对2026-07-15 Sentinel-2B L2A产品。按Range取得B02/B03/B04/B08和SCL各两个内部块，保留发布校验和、对象元数据、项目块SHA-256、CRS、窗口、scale/offset及公式，生成原始DN、SCL、NDVI、NDWI和预览。该层补充单景近期光学现状，不替代多季遥感、现场生态、树木、建筑、水文、蓝线或工程调查。

## REV 13 开放建筑轮廓增量

[source:OVERTURE-MAPS-BUILDINGS-JINGZHANG-20260722] 通过Overture Maps官方客户端取得Buildings 2026-07-22.0发布的项目bbox记录，保存客户端状态、原始GeoJSON SHA-256、schema、许可和署名。按provisional SITE-001裁切、以EPSG:4548复算联合面积，并与既有OSM对象ID及几何比较；排除全部含OSM来源的Overture记录，仅将2834条来源恰为东亚建筑Zenodo DOI的非OSM轮廓接入existing-condition层。该增量改善公开建筑覆盖，但不提供正式边界、权属、楼层、高度、用途、年代、状况、拆改、消防、结构、管线、竣工或测绘结论。

## REV 14 开放建筑高度网格背景

[source:JRC-GHSL-BUILT-H-R2023A-JINGZHANG-2018] 核验欧盟JRC GHS-BUILT-H R2023A技术页、下载页、许可与引用要求，取得覆盖北京的R5_C30 AGBH/ANBH完整瓦片。保留ZIP/TIFF哈希、ETag、Last-Modified、CRC、栅格标签和19×106项目窗口，以uint16百分之一无损编码并生成统计与预览。该层只补充2018年约100 m建筑体量密度和建成表面平均高度背景，不提供逐栋高度、层数、面积、用途、状况、权属或法定控制；正式building_height_m继续保持unknown。

## REV 15 开放逐栋模型属性子集

[source:JRC-GHSL-GHS-OBAT-R2024A-JINGZHANG-2020] 取得并完整校验JRC GHS-OBAT R2024A中国CSV包，流式扫描全国记录，以临时SITE-001筛选并与当前OSM/Overture建筑执行严格一对一质心与面积关联。输出保留项目级模型高度、功能、年代、面积、周长、紧凑度、匹配方法/置信度和未匹配统计。2024与2026非OSM GERS ID零直连、当前覆盖率28.5051%、官方中国少报风险和欧洲验证误差均明确披露；正式高度、用途、年代、权属和现状测绘缺口没有被模型数据关闭。

## REV 16 开放全球LoD1模型补充


## REV 17 开放高度栅格逐栋补齐


## REV 18 蓝景丽家官方数据与京张同心百年线

[source:BEIJING-GGZY-BLUEHOME-LAND-2025] 的19项公开附件将大钟寺片区补充到地块级。`2025规自（海）测字0074号`公开107个Y/X点、9个地块/道路点序及面积；京规自（海）供审函〔2025〕0006号公开01/03A地块指标；北京市规自委案例页确认蓝景丽家位于大钟寺试点片区。公开报告未注明CRS且边界含圆弧，故本包只保存原始点表，不重投影、不生成GeoJSON、不把3.95公顷子项目外推为72公顷竞赛重点区。纠正后的大钟寺概念面和相关设计节点仍标记为provisional。

空间叙事重构为1909—2109“京张同心百年线”：六个首尾连续的策展时段沿走廊展开，依次承接自主筑路、工业建设、科教报国、网络协作、绿色更新和共同智能。56个同尺度、无中心、轮换策展的公共议题席围绕多样文化内容和共同建设展开，空间席位不永久绑定民族身份或文化标签。席位不推断个人民族身份，不使用人脸识别或强制注册，并保留线下人工服务。这是概念治理机制，不是本地人口统计、官方历史分期或实施承诺。
