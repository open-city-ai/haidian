# 版权与合规声明（Copyright & Compliance Statement）

## 一、内容性质声明

本投稿包（jingzhang-ai-spine）内的全部文本方案、几何数据、图表、PDF 图册与静态 HTML 展示物，均由声明的人工智能智能体（Tokeny AI 桌面智能体工作台多模型协作）基于公开资料、清权（已授权/可自由使用）资料与用户提供资料生成，属**概念性设计建议**，不构成正式的规划、土地、工程或法律文件。

## 二、使用范围限定

- 本包仅用于**社区展示（COMMUNITY-DISPLAY-ONLY）**用途，不用于商业运营、法定规划审批或招投标正式成果。
- 未经主管部门书面确认，本包内容不得作为实施依据；任何落地实施均须以官方发布的法定规划与设计文件为准。

## 三、知识产权与素材合规

- 除下述需进一步核验的项目外，本包不包含、也不使用未经授权的字体、图片、商标、图标或其他第三方受版权保护素材。
- 地图底图与几何数据来源于公开资料与清权资料的数字化转绘，数据来源逐条登记于 `sources.json`；几何数据按 `geometry/*.geojson` 分发。
- **素材来源与权利登记现状（与 sources.json / assumptions.json 一致）**：
  - `buildings.geojson` 建筑基底为公开影像/底图目视转绘（A-BUILDING-001）；该影像/底图的逐项发布者、URL、访问日期、许可与转绘记录尚未随投稿补齐，因此本包**不**对其主张"全部清权"，须按 `BUILDING-BASE-001` 补齐来源后方可用于正式评审。
  - 全球 AI 创新生态七案例仅作背景经验（`CASE-BACKGROUND-REFERENCE`，A-CASE-001），不作定量对标、不主张逐案例转载授权。
  - 字体为系统自带与内嵌子集（`FONT-RENDERING-001`），随包分发渲染产物而非字体源文件；Noto 系列为 SIL OFL 1.1，微软雅黑随 Windows 授权仅用于渲染。
- 文中出现的项目名称、站点名称等标识仅作指代用途，其商标与名称权利归原权利人所有。
- 对任何无法证明允许再利用或分发的内容，本包按"替换或删除"原则处理；在来源补齐前不把相关转绘结果表述为已获完整清权。

## 四、Provisional 边界声明

- 本包采用的边界（`site_boundary.geojson`、`key_areas.geojson`）为基于征集公告公开附图与公开资料的 **provisional（临时）边界**，未经官方 CAD/GIS 源文件核验。
- 相关限制与复算触发条件详见 `assumptions.json`（A-BOUNDARY-001、A-CONTROLS-001 等）与 `self_check.json`（BOUNDARY_TRUST、KEY_AREAS_TRUST 为 major 级、标记 provisional 待官方替换）。
- 官方边界或控规数据发布后，须替换几何层并重跑全部指标复算后方可用于正式成果。

## 五、工具链开源许可

- 本包构建过程使用 shapely、pyproj、matplotlib、reportlab 等开源软件库，均为 BSD / Apache / MIT 类宽松开源许可。
- 上述工具链仅用于本地几何复算、制图与图册排版构建；构建产物随投稿包分发，工具链源码不再随包分发。
- `visual/index.html` 为静态页面，不依赖任何远程资源。

## 六、AI 生成内容披露

- 依据征集活动对 AI 参与的要求与本包 `agent.json` 声明，本方案由 AI 智能体生成并在正式提交前经人工复核。
- 全部指标（`metrics.json`）由几何数据确定性复算，不依赖模型推测值。
