# Copyright Statement

The proposal text, diagrams, PDFs, and static HTML were AI-assisted and reviewed by the submitter. Original narrative and design assets are released for community display only; third-party public data remain under their source-specific terms recorded below. No remote assets are required by visual/index.html.

Official public data attribution: Beijing Municipal Commission of Transport, ‘北京市交通出行数据下载 / 路侧停车位基础信息’, https://service.jtw.beijing.gov.cn/cxsjxz/ . The page labels the dataset as unconditionally open; this package records the retrieval date and file hash in sources.json.

## 官方交通开放数据
[source:BEIJING-JTW-TRANSIT-OPERATIONS] 北京市交通委员会开放页面（[北京市交通出行数据下载](https://service.jtw.beijing.gov.cn/cxsjxz/)）标注轨道线路、轨道站点、公交线路和公交站点信息为“无条件开放”。本包仅保留来源页、下载 URL、访问日期、文件 SHA-256 和行数；无坐标表格不被转换为空间图层，避免从站名推断坐标。

## REV 06 官方网页与政策附件
新增引用均来自北京市海淀区人民政府政务信息资源库公开页面：2025年统计公报、中科城〔2025〕91号及其DOC附件、清华园车站旧址修缮开放资料。本包不复制网页图片，不嵌入远程媒体；仅记录必要事实、来源URL、发布日期、访问日期和下载快照哈希。政策金额仅作合规边界说明，不作为项目承诺。

## REV06_CONTROL_STATUS
新增引用 [source:HAIDIAN-JINGZHANG-CONTROL-PLAN-STATUS] 的官方页面 URL 与访问日期；页面为规划进展公开信息，不含可提交的边界附件。

## 官方审批、公共资源与文保来源
新增引用均来自政府公开页面及公开附件：[source:BEIJING-AI-ORIGIN-COMMUNITY]、[source:BEIJING-FRC-JINGZHANG-PHASE2-IMPLEMENTATION-APPROVAL]、[source:BEIJING-FRC-JINGZHANG-PHASE2-TENDER-SCHEME]、[source:BEIJING-GGZY-JINGZHANG-PHASE2-CONSTRUCTION-TENDER] 和 [source:BEIJING-HERITAGE-BATCH11-NOTICE]。本包仅转录必要事实并记录URL、访问日期和SHA-256；不嵌入政府网页图片，不复制受认证保护的资格预审文件，也未尝试绕过数字身份认证。公开PDF仅作为来源校验，方案资产仍由Agent生成。

## OpenStreetMap 开放现状数据
© OpenStreetMap contributors，数据依据 [Open Database License (ODbL)](https://www.openstreetmap.org/copyright) 使用。通过 Overpass API 于2026-08-08取得的建筑、道路、轨道、水系和POI快照仅作为 `existing_condition`，并记录查询bbox、对象ID和下载SHA-256。任何派生数据库再分发须遵守ODbL署名及相同方式共享要求；本包不把OSM数据表示为官方底图、法定控制或测绘成果。

## REV 09 官方合同与采购页面
新增合同链、配套勘察成交和地铁安全评估采购均仅转录公开页面中的必要事实、交易/项目编号、主体、金额、期限、范围与快照SHA-256；未复制受控测绘成果、设计图、施工图、监理记录、验收文件或安全评估报告，也未绕过认证或付费获取限制。

## ESA WorldCover 2021

`visual/assets/worldcover_2021_classes.png`、`visual/assets/worldcover_2021_summary.json` 和 `assets/figures/worldcover-2021-existing-context.png` 派生自 ESA WorldCover 2021 v200，依据 [Creative Commons Attribution 4.0 International](https://creativecommons.org/licenses/by/4.0/) 使用。

Attribution: © ESA WorldCover project 2021 / Contains modified Copernicus Sentinel data (2021) processed by ESA WorldCover consortium.

源COG、裁切窗口、SHA-256、坐标、分类和使用边界均记录在 `sources.json` 与统计JSON；本包不把2021年分类写成当前法定用地或测绘成果。

## Copernicus DEM GLO-30

`visual/assets/copdem_glo30_elevation_dm.png`、`visual/assets/copdem_glo30_summary.json` 和 `assets/figures/copdem-glo30-existing-surface.png` 派生自 Copernicus DEM GLO-30 Public。产品依据全球免费许可公开使用，但须保留指定署名，且权利声明并非CC许可。

Required attribution for this modified extract: produced using Copernicus WorldDEM-30 © DLR e.V. 2010-2014 and © Airbus Defence and Space GmbH 2014-2018 provided under COPERNICUS by the European Union and ESA; all rights reserved.

官方产品页、AWS公开分发页、两幅源COG URL、对象ETag/长度、下载字节范围、块SHA-256、坐标、编码和用途边界均已登记。本包不把2011-2015时期约30 m DSM表示为当前裸地测绘、排水/洪水模型或工程成果。

## JRC Global Surface Water v1.5

`visual/assets/jrc_gsw_v15_occurrence.png`、`visual/assets/jrc_gsw_v15_transitions.png`、`visual/assets/jrc_gsw_v15_max_extent_2022_2024.png`、统计JSON和预览派生自JRC Global Surface Water v1.5。数据由Copernicus Programme支持，可免费使用；地图署名为 `Source: EC JRC/Google`。

Required citation: Pekel, Cottam, Gorelick and Belward (2016), High-resolution mapping of global surface water and its long-term changes, Nature 540, 418-422, doi:10.1038/nature20584.

本包记录官方页面、六个源对象、对象完整性、项目字节范围、官方QML哈希、编码和用途边界，不把约30 m长期卫星观测表示为蓝线、水文、防洪、水质、当前调查或工程成果。

## Copernicus Sentinel-2 L2A 2026-07-15

`visual/assets/sentinel2_20260715_*.png`、统计JSON和预览包含由Copernicus Sentinel-2B L2A数据生成的裁片及指数。Sentinel数据免费、完整、开放使用，适用法律声明见 `https://sentinels.copernicus.eu/documents/247904/690755/Sentinel_Data_Legal_Notice`；公开COG转换和Earth Search索引由Element 84提供。

Required attribution for this modified extract: `Contains modified Copernicus Sentinel data [2026]`.

本包记录官方CDSE产品身份、公开COG镜像身份、STAC快照哈希、发布校验和、对象ETag/长度、下载块范围与SHA-256、反射率scale/offset、CRS、编码、公式和单景用途边界。未将COG全对象发布校验和表示为本地全文件复核，也未把10-20 m单景筛查表示为测绘、树木/水体清单、蓝线、排水、防洪或工程成果。

## Overture Maps Buildings 2026-07-22.0

`geometry/buildings.geojson`中的Overture增量、统计JSON和预览包含Overture Maps Buildings发布数据库的裁切记录。建筑主题依据 [Open Database License 1.0](https://opendatacommons.org/licenses/odbl/1-0/) 使用。

Required attribution: `© OpenStreetMap contributors, Overture Maps Foundation`.

本包仅保留来源恰为 `doi:10.5281/zenodo.8174931` 的非OSM记录；上游数据集为 A first high-quality vector data of buildings in East Asian countries based on a comprehensive large-scale mapping framework，由 Qian Shi, Jiajun Zhu, Zhengyu Liu, Haonan Guo, Mengxi Liu, Zihong Liu and Xiaoping Liu (2023), A first high-quality vector data of buildings in East Asian countries based on a comprehensive large-scale mapping framework, Zenodo, https://doi.org/10.5281/zenodo.8174931 发布，许可为 [Creative Commons Attribution 4.0 International](https://creativecommons.org/licenses/by/4.0/)。

Overture与OSM数据库记录不纳入本方案文本/Agent原创资产的社区展示许可；其提取、改编数据库和公开再分发继续受ODbL署名及相同方式共享要求约束。发布日、上游发布时间和source update timestamp不被解释为影像采集日或现状测量日。

## JRC GHSL GHS-BUILT-H R2023A

`visual/assets/ghsl_builth_2018_agbh_x100.png`、`visual/assets/ghsl_builth_2018_anbh_x100.png`、统计JSON和预览派生自欧盟委员会联合研究中心 GHS-BUILT-H R2023A，依据 [Creative Commons Attribution 4.0 International](https://creativecommons.org/licenses/by/4.0/) 使用。使用条件见 `https://human-settlement.emergency.copernicus.eu/GHSLhowToCite.php`。

Dataset citation: Pesaresi, M.; Politis, P. (2023), GHS-BUILT-H R2023A - GHS building height, derived from AW3D30, SRTM30, and Sentinel2 composite (2018), European Commission, Joint Research Centre, doi:10.2905/85005901-3A49-48DD-9D19-6261354F56FE.

Release methodology citation: Pesaresi et al. (2024), Advances on the Global Human Settlement Layer by joint assessment of Earth Observation and population survey data, International Journal of Digital Earth 17(1), doi:10.1080/17538947.2024.2390454.

本包记录两个完整R5_C30 ZIP及选定TIFF的身份、哈希、ETag、Last-Modified、CRC、栅格标签、裁切窗口、编码和用途边界。AGBH与ANBH未被表示为逐栋测量、2026现状、法定高度控制或工程成果。

## JRC GHSL GHS-OBAT R2024A

`visual/assets/ghsl_obat_2020_site_attributes.json`、统计JSON和预览派生自欧盟委员会联合研究中心 GHS-OBAT R2024A。JRC数据目录将CSV分发标为 [Open Data Commons Open Database License 1.0](https://opendatacommons.org/licenses/odbl/1-0/)，分发目录版权说明同时声明欧盟委员会权利依据 [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) 许可。本包对CSV派生数据库从严遵循ODbL，保留EC/JRC与Overture来源和改动说明；JRC原创报告与权利说明按CC BY 4.0署名。

Dataset citation: Florio, Pietro; Politis, Panagiotis; Goch, Katarzyna; Uhl, Johannes H; Melchiorri, Michele; Pesaresi, Martino; Kemper, Thomas (2024), GHS-OBAT R2024A - Global Open Building Attribute Table at footprint level, European Commission, Joint Research Centre, doi:10.2905/f41a22f1-5741-4c41-86eb-6384654f6927.

本包记录中国完整ZIP的大小、SHA-256、ETag、Last-Modified、成员大小与CRC，并只再分发项目级抽取表。属性来自Overture 2024-07-22.0与GHSL栅格模型，不表示北京本地测绘、真实建成年份、许可用途、2026完整现状、权属或法定控制。

## GlobalBuildingAtlas：已评估但未纳入

TUM GlobalBuildingAtlas LoD1 与 GBA.Height 的官方许可包含 CC BY-NC 4.0，且 LoD1 组合还可能涉及上游数据库义务。为避免公开赛事、奖金或后续利用的商业性质不确定性，REV22 不再分发任何 GBA 派生属性表、统计、图片或指标；其来源只在 `sources.json#research_audit/evaluated_not_used` 中作为未采用研究记录保留。

## 蓝景丽家官方公开文件转录

`visual/assets/bluehome_official_survey_local.json` 是对北京市公共资源交易服务平台公开勘测报告中事实字段的结构化转录，记录来源URL、文号、日期和PDF SHA-256；原PDF不随本包再分发。公开报告未注明坐标参考系且部分边界含圆弧，转录点不得直接转换为GeoJSON、地籍红线或施工测量成果。正式应用前须从主管部门取得CRS、弧段参数、签章成果和使用授权。

`assets/figures/centennial-unity-line.png`、56个轮换策展与公共议题席点位和六阶段文字均为本方案原创概念表达；民族文化展陈、口述史转译和AI派生版本须逐项取得文化持有者授权。中国政府网白皮书只作为公开文化与公共服务治理的参考依据；不复制其长篇正文，也不据此识别个人或声明海淀本地人口构成。

## 同类方案方法归因

本方案的“普通服务基线 + AI可选增强 + adopt / revise / stop”同题验证方法借鉴公开的 `open-city-ai/haidian` PR #2272“京张双答”，并已在 `sources.json` 与 `proposal.md` 登记。京张同心百年线、1909—2109叙事、56个轮换策展与公共议题席、八项人本权利、五步共创闭环、五类用地、25场景与文明种子库均为本方案独立编制；未复制该方案图像、代码或长段文字。文明种子库的内容必须逐项取得保存、公开、训练、翻译和再创作授权，默认不公开敏感材料；AI派生版本不得覆盖原件，撤回和封存由文化权利人与专业人员共同处理。确定性文本筛查仅作为作者侧原创性复核，不等同于法律鉴定。

## AI生成内容标识

本方案文本、图表及概念空间数据由人工智能辅助生成，已由提交者人工复核。其中总体范围与三处重点区几何为 provisional 概念数据，不替代法定规划、测绘、审批或工程成果。 该声明在正文、交互网页及PDF图册/展板中显式展示，并写入PDF标题、主题、作者和关键词元数据。后续通过具备隐式标识功能的平台公开发布时，提交者应保留平台生成的文件元数据或内容凭证，不得移除法定标识。
