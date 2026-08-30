# 方案迭代记录

## v0.2.8 - 2026-08-30

- 按评审意见重制 A0 展板（drawings/a0-boards.pdf 与 a0-boards.en.pdf，单页横版，图文并茂）：标题区 + 整体鸟瞰主图 + 一句话方案 + 五项核心指标 chips + Logo 概念图；第二排为一脊两带三区结构图、用地结构图、三大定位五大功能转译图、交通慢行×蓝绿系统图、组件库示意图（各附要点）；第三排为三处重点区域效果图与 6×2 共 12 张场景卡图阵；底栏为三期分期、风险与版权说明。
- 展板内嵌图使用本地降采样副本控体积（单张约 5.5 MB）；四门自检重跑保持 PASS。
- 参与者署名由占位登录名更正为 GitHub 登录名 shiningwater，提交目录改为 submissions/shiningwater/jingzhang-ai-spine，agent.json 与双语 proposal 的 author_github / agent_id 同步更新。

## v0.2.7 - 2026-08-30

- 按评审意见重制 A3 图册（drawings/a3-booklet.pdf 与 a3-booklet.en.pdf，各 10 页，图文并茂），内容与 proposal.html 正文同步：
  - 封面：整体鸟瞰 + 一句话方案 + 版本与边界状态；
  - 01 设计依据与场地真实性（五类资料 + ODbL/临时边界声明 + 证据链图）；
  - 02 总体概念与命名（脊核站巷 + Logo 概念图 + 三大定位五大功能转译图）；
  - 03 空间结构一脊两带三区（结构示意图 + 要点）；
  - 04 三处重点区域（三张区域效果图 + 定位要点）；
  - 05 十二张AI场景卡（4×3 图卡网格 + 隐私边界说明）；
  - 06 用地与拆改留（146 单元数据 + 用地结构图）；
  - 07 交通蓝绿与风貌（复合系统图 + 组件库示意图 + 朝圣地标 3+1）；
  - 08 核心指标与证据链（场地 11,412,825 m² / 绿地 24.1% / 公共空间 3.6% 等）；
  - 09 实施分期与合规（三期面积 + 风险 + 版权）。
- 图集内嵌图片使用本地降采样副本控制体积（单册约 3.5 MB）；A0 展板未改动；iteration 升至 v0.2.7；四门自检重跑保持 PASS。

## v0.2.6 - 2026-08-30

- 按评审意见新增三张重点区域概念效果图（assets/media/，AI 生成，风格与整体鸟瞰一致——黄昏光照、淡蓝 AI 数据光带、每帧 1—2 名中国人、无人群、建成环境遵循 OSM 类型学、无场地外北京地标）：keyarea-zhongzhiyuan（低层院所园区+开源广场+智脊北段公园）、keyarea-ai-origin（红砖高校界面+开源会客厅+AI原点纪念馆）、keyarea-dazhongsi（存量商业改造+智港广场+遗产机车+高架线），分别插入中英方案三处重点区域段之后。
- "城市风貌与公共空间组件库"新增图标式示意图（assets/figures/component-library(.en).png，matplotlib 原创绘制）：风貌三原则（遗产真实/界面谦逊/技术可逆）× 智轨座椅、突触灯柱、开源信息亭三类组件卡片。
- **交通慢行与蓝绿公共空间复合系统图按评审意见从"交通市政/蓝绿风貌"阅读版面移除**；因征集校验强制要求五张必需图件必须嵌入方案（`must embed required human-readable diagram`），该图改以"平台必需图件"标注移至"指标、面积复算与合规矩阵"一节，文件保留在包内。
- 为满足 40 MiB 变更文件总量上限，全部媒体图由 PNG 转 JPEG（质量 88，概念图视觉无损），封面、场景卡链接与版权声明同步更新；iteration 升至 v0.2.6；指标与几何未改动，四门自检重跑保持 PASS。

## v0.2.5 - 2026-08-30

- 按评审意见为方案正文新增三张概念配图（中英各一套，matplotlib 原创绘制，assets/figures/）：
  - `brand-logo.png`：视觉识别 Logo 概念——"轨道截面×神经元突触"叠合图形，主色京张青灰+AI亮蓝，附砖红点缀与配色 chips；
  - `positioning-translation.png`：三大定位（百年京张文化带/都市AI生活体验带/AI融合创新带）→ 空间载体，五大功能 → 承载区（众智园/AI原点社区/大钟寺+全线）的对应关系图；
  - `spine-structure.png`：一脊两带三区空间结构示意（点=智站7座、线=主脊与6条缝合巷、面=三区椭圆与两带色带），标注三区公告面积与真实公园衔接点。
- 三图分别插入中英方案"总体概念与命名""三大定位与五大功能的空间转译""空间结构：一脊两带三区"段落之后；manifest 以 proposal_figure（zh/en translation_of 配对）登记。
- iteration 升至 v0.2.5；指标与几何未改动，四门自检重跑保持 PASS。

## v0.2.4 - 2026-08-30

- 按评审意见再次重绘整体鸟瞰图（assets/media/overview-birdseye.png）：机位由正俯视改为自场地南缘北望的斜视角，使**大钟寺AI产业集聚区重点区域的设计在前景可读**——红砖玻璃改造商业体+屋顶绿台、北京北智港广场、保留机车与轨道段遗产展示、13号线高架及站厅、北京北站枢纽；主脊绿廊自此向北纵深退去，沿线站亭与缝合桥清晰。
- 其余真实环境约束保持不变：东侧灰砖住宅板楼与零星塔楼、西侧红砖高校、北端清河湿地与防护绿带；黄昏光照 + 主脊上方淡蓝 AI 数据光带的未来感表达延续 v0.2.3；几乎无行人、无场地外地标。
- report/copyright_statement.md 更新替代文本；iteration 升至 v0.2.4；指标与几何未改动，四门自检重跑保持 PASS。

## v0.2.3 - 2026-08-30

- 按评审意见重绘整体鸟瞰图（assets/media/overview-birdseye.png）：直接依据 proposal.md 的"京张智脊"概念生成——9.7 公里遗址公园慢行主脊沿真实京包线廊道居中贯通，沿线站亭、三处重点区域、东西向缝合关系清晰；高空宏观视角、黄昏光照、主脊上方淡蓝色 AI 数据光带表达"智能之脊"未来感。
- 周边环境仍严格对应真实场地：东侧六层灰砖住宅板楼与零星高层塔楼、西侧红砖高校界面、北端清河湿地与防护绿带（源自 OSM building:levels 与功能锚点）；画面中几乎看不到行人，未出现场地外的北京地标。
- report/copyright_statement.md 同步更新该图替代文本与生成说明；iteration 升至 v0.2.3；指标与几何未改动，四门自检重跑保持 PASS。

## v0.2.2 - 2026-08-30

按评审意见修订全部 13 张概念意象图（人物与现状景观）：

- **人物数量压缩**：每幅画面明确限定 1—2 人、不出现人群；鸟瞰图限定"该尺度下几乎看不到行人"。集会类场景（开发者大会前广场、创客集市、治理沙盒）改为安静的平日状态，不再用人流暗示空间容量。
- **人物形象**：画面中出现的每个人均明确指定为中国人（如"一位中国老人在长椅上休息""两名中国学生""一名中国工作人员"），着日常当代服装，不涉及任何真实人物的肖像。
- **现状景观改为有据可依**：建成环境特征来自 OpenStreetMap 的 `building:levels` 与建筑类型标签（场地 bbox 内 273 栋带层数标注的建筑，ODbL 1.0）——169 栋为 1 层、6 层为最常见的多层类型、18—25 层塔楼为少数；类型分布为公寓 19、住宅 14、宿舍 9、独栋 5、中小学 4、高校 3、零售 3、商业 2、工业 2、火车站 1。画面据此表现为六层灰砖住宅板楼为主、零星高层塔楼，高校为红砖建筑，行道树取国槐、银杏、杨树与清河沿岸柳树。
- **明确不使用百度街景**：其程序化调用需商业授权 API key，许可不允许再授权进开源提交；且征集规则禁止商业地图素材作为提交数据。OSM 仅用于建成环境"类型学"参考，绝不用于边界、面积或规划控制结论。
- 方案正文（中英）新增"关于效果图的三点说明"，场景卡表格新增"意向图"列，把 12 张场景卡配图与正文逐条对应；`report/copyright_statement.md` 同步写入生成方法、人物约束与替代文本。
- iteration 升至 v0.2.2；指标与几何未改动，四门自检重跑保持 PASS。

## v0.2.1 - 2026-08-30

- 新增概念意向图 13 张（assets/media/）：1 张整体鸟瞰 + 12 张 AI 场景卡（SC-01…SC-12），统一"京张青灰+砖红+少量AI蓝"写实建筑可视化风格，图中不含文字/标识/商标。
- 鸟瞰图设为 manifest.cover_image（方案封面）。
- 生成方法、替代文本与"非现场证据"声明写入 report/copyright_statement.md；媒体文件在 manifest 中以 role=media_poster 登记。
- 包内路径规则：assets/ 只允许图片扩展名，report/ 只允许 copyright_statement.md、narrative.md、proposal*.html，文字版媒体说明不能另建 md 文件。
- 四门自检与 participant_preflight 仍全部 PASS。

## v0.2 - 2026-08-23

- 按评审意见根本性修正设计方法：路网与用地不再程序化虚构，改为贴合真实场地。
- 新增 OSM 现状底图（Overpass API，2026-08-23，ODbL 署名）：constraints.geojson 现为真实现状层（学清路/学院路/西土城路等主次干路、京包线及废弃铁路段、现状水系）。
- 智脊慢行主脊改沿京包线真实廊道，串联北京北、蓟门桥、西土城、学院桥、六道口、学知园六处轨道站点；广场改为站前广场。
- 用地按真实路网切分（146 单元），用地性质参照真实功能锚点（北影、中冶建研院、石油勘探院、北航科技园、五道口商业、大钟寺商圈、高校界面、居住区）赋码；绿地系统叠加元大都城垣遗址公园等真实公园。
- 新增六条东西向慢行缝合段应对廊道割裂；场景卡全部锚定真实站点与地段。
- 指标重算：绿地比例 24.1%、公共空间比例 3.6%、建筑基底密度 12.8%；新增现状主次干路长度（45.1km）与场地内轨道站点数（7）指标。
- sources.json 新增 OSM-CONTEXT 记录（含 ODbL 署名与使用边界）；assumptions.json 扩展至 5 条。

## v0.1 - 2026-08-23

- Initial formal concept package for 京张智脊 JingZhang AI Spine (shiningwater/jingzhang-ai-spine).
- Scaffolded with `scripts/scaffold_ai_submission.py --stage formal`, then replaced all scaffold content:
  - Participant-authored geometry: 55-unit land-use partition of the provisional boundary, green/public-space layers, 48 conceptual building footprints, 10 road centerlines, 3 phasing bands, 3 constraint hints, 12 scenario nodes.
  - `metrics.json` recomputed in EPSG:4548 (29 metrics; FAR/height recorded unknown pending official data).
  - Bilingual proposal (`proposal.md` zh + `proposal.en.md`), proposal format v2, bilingual contract v1.
  - Five required figures plus English counterparts (data-driven, matplotlib).
  - A3 booklet and A0 board PDFs in zh and en.
  - Offline `visual/index.html` + `index.en.html` evidence dashboard with inline SVG map.
- Known limitations: provisional rough boundary (PROV-SITE-001); statutory controls pending official data; constraints layer is inferred at low confidence. See `assumptions.json`.
