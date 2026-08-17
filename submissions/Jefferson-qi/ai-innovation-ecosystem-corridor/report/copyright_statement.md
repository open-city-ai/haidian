# 版权声明与逐项来源清单 / Copyright Statement & Itemized Source Ledger

## 一、版权声明 / Copyright Statement

### 中文

本方案《AI创新生态廊 · 百年京张的智能新生》由AI智能体（WorkBuddy）生成，作为"百年京张AI创新带城市设计开源征集"的概念建议方案提交。

**许可**：方案文本、图纸和结构化数据在 COMMUNITY-DISPLAY-ONLY 许可下提供。

**AI生成声明**：本方案由AI智能体生成，所有内容均为概念建议、参考方案或可供专业团队深化研究的材料。不替代正式规划，不构成政府审定结论，不包含容积率、建筑高度、具体拆改留、道路红线或工程实施结论。最终判断由人类和专业团队完成。

**边界声明**：所有空间落地建议表述为"概念建议""参考方案""可供专业团队深化研究"。临时粗略边界不得作为官方红线、审批依据或精确面积复算依据。

## 二、逐项版权与来源清单 / Itemized Copyright & Source Ledger

### 2.1 字体 / Fonts

| 项目 | 来源 | 许可状态 | 使用范围 |
|------|------|----------|----------|
| 中文字体 | 系统内置字体（SimHei、SimSun、Microsoft YaHei） | 操作系统附带许可，可用于本地渲染 | proposal.html、PPTX、PNG图件 |
| 英文字体 | 系统内置字体（Arial、Calibri） | 操作系统附带许可 | 英文文档和图件 |
| 代码字体 | 等宽字体（Consolas） | 操作系统附带许可 | 代码文件 |

**声明**：未使用任何未授权的第三方字体文件。所有字体均来自操作系统自带字体库。

### 2.2 图标与视觉元素 / Icons & Visual Elements

| 项目 | 来源 | 许可状态 | 使用范围 |
|------|------|----------|----------|
| Logo概念方向 | AI生成原创设计 | COMMUNITY-DISPLAY-ONLY | 封面、节点标识 |
| 图表色彩系统 | 自定义配色方案 | COMMUNITY-DISPLAY-ONLY | 所有图件 |
| 空间示意图符号 | 程序生成（Python PIL/reportlab） | COMMUNITY-DISPLAY-ONLY | PNG图件 |
| PPTX图标形状 | python-pptx内置形状 | MIT许可（python-pptx库） | PPTX演示文稿 |

**声明**：Logo和视觉识别方向为概念建议，未使用未授权的图标库、矢量素材或设计模板。实际Logo设计需由专业视觉设计团队深化并完成字体和图像清权。

### 2.3 地图与空间数据 / Maps & Spatial Data

| 项目 | 来源 | 许可状态 | 使用范围 |
|------|------|----------|----------|
| 临时粗略边界 | 仓库维护者提供（provisional_boundaries.geojson） | provisional，仅用于AI生成和展示 | 所有空间图层 |
| 道路网概念布局 | 方案设计生成 | COMMUNITY-DISPLAY-ONLY | geometry/roads.geojson |
| 用地分区 | 方案设计生成 | COMMUNITY-DISPLAY-ONLY | geometry/land_use.geojson |
| 建筑足迹 | 方案设计生成 | COMMUNITY-DISPLAY-ONLY | geometry/buildings.geojson |
| 公共空间节点 | 方案设计生成 | COMMUNITY-DISPLAY-ONLY | geometry/public_space.geojson |
| 绿地系统 | 方案设计生成 | COMMUNITY-DISPLAY-ONLY | geometry/green_space.geojson |
| OpenStreetMap | OSM Foundation | ODbL 1.0（需署名） | 仅作为背景参照，未直接嵌入图件 |

**声明**：所有空间数据均基于仓库提供的临时粗略边界生成，未使用非公开政府数据。OSM数据仅作为概念参照，如正式使用需按ODbL许可要求署名。

### 2.4 图片与照片 / Images & Photos

| 项目 | 来源 | 许可状态 | 使用范围 |
|------|------|----------|----------|
| 方案配图 | 程序生成的示意图（Python PIL/reportlab） | COMMUNITY-DISPLAY-ONLY | HTML、PNG |
| 案例参考图 | 无直接引用图片，仅文字描述 | N/A | N/A |

**声明**：未使用任何外部照片、渲染图或未授权图片。所有图件均为程序生成的概念示意图。

### 2.5 数据与统计 / Data & Statistics

| 项目 | 来源 | 许可状态 | 验证状态 |
|------|------|----------|----------|
| 面积数据（43.6/11.4/3.684km²） | 官方资格预审公告 | A0级正式来源 | 已验证 |
| 波士顿/纽约风投、独角兽等统计 | 外部参考材料（SRC-EXTERNAL-REF-BOSTON-NY） | external_reference | 未独立验证，仅作背景参考 |
| OPC五模块十四要素 | 外部参考材料（SRC-EXTERNAL-REF-OPC） | external_reference | 未独立验证，仅作概念参考 |
| 三区两翼政策信息 | 北京科委公开网页（SRC-2026-BJ-KW-THREE-AREAS-WINGS） | A1级，未进入approved_formal_sources | URL可达性已验证，内容未独立核验 |
| 1+X+1产业体系信息 | 海淀区政府公开网页（SRC-2026-HAIDIAN-1X1） | A1级，未进入approved_formal_sources | URL可达性已验证，内容未独立核验 |

**声明**：来自外部参考材料（波士顿/纽约研究、OPC简介）的统计数字均未独立核验原始出处，仅作为概念论述的背景参考，不作为正式证据使用。三区两翼和1+X+1政策信息来自政府公开网页，URL可达性已验证，但未列入approved_formal_sources清单。

### 2.6 代码与脚本 / Code & Scripts

| 项目 | 来源 | 许可状态 | 使用范围 |
|------|------|----------|----------|
| generate_figures.py | AI生成 | COMMUNITY-DISPLAY-ONLY | PNG图件生成 |
| generate_geometry.py | AI生成 | COMMUNITY-DISPLAY-ONLY | GeoJSON生成 |
| generate_metadata.py | AI生成 | COMMUNITY-DISPLAY-ONLY | JSON元数据生成 |
| generate_pdfs.py | AI生成 | COMMUNITY-DISPLAY-ONLY | PDF生成 |
| python-pptx | 开源库 | MIT许可 | PPTX生成 |
| reportlab | 开源库 | BSD许可 | PDF生成 |
| Pillow (PIL) | 开源库 | MIT-like许可 | PNG生成 |
| PyMuPDF (fitz) | 开源库 | AGPL许可 | PDF渲染（仅本地使用） |

**声明**：所有代码脚本由AI智能体生成，使用开源库遵循各自许可协议。

### 2.7 外部文档与参考资料 / External Documents & References

| 项目 | 来源 | 许可状态 | 验证状态 |
|------|------|----------|----------|
| 全球AI创新生态案例（谷歌、One-North等6个） | 公开资料研究 | background | 公开信息，仅作研究参照 |
| 波士顿/纽约对比研究 | 用户提供的外部参考材料 | external_reference | 未独立验证 |
| OPC创新社区简介 | 用户提供的外部参考材料 | external_reference | 未独立验证 |
| 新加坡邻里中心模式 | 公开资料研究 | background | 公开信息，仅作研究参照 |
| 纽约高线公园模式 | 公开资料研究 | background | 公开信息，仅作研究参照 |
| 巴黎Station F模式 | 公开资料研究 | background | 公开信息，仅作研究参照 |

**声明**：引用的全球案例信息均来自公开资料，仅作为研究参照，不构成对任何企业或机构的官方背书。波士顿/纽约研究和OPC简介为用户提供的外部参考材料，未经独立验证。

### 2.8 网页模板 / Web Templates

| 项目 | 来源 | 许可状态 | 使用范围 |
|------|------|----------|----------|
| proposal.html | AI生成原创HTML/CSS | COMMUNITY-DISPLAY-ONLY | 方案展示 |
| visual/index.html | AI生成原创HTML/CSS | COMMUNITY-DISPLAY-ONLY | 视觉索引 |

**声明**：未使用任何第三方网页模板、CSS框架（如Bootstrap、Tailwind）或JavaScript库。所有HTML/CSS均为AI生成的原创代码。

## 三、待清权事项 / Pending Clearance Items

以下事项需在正式发布前由专业团队完成清权：

1. **Logo正式设计**：当前Logo仅为概念方向，需专业视觉设计团队完成正式设计并清权字体和图像元素。
2. **地图底图**：如正式图件需使用地图底图，需获取相应测绘资质和许可。
3. **外部统计数据**：波士顿/纽约研究和OPC简介中的统计数据需追溯原始出处并独立验证。
4. **案例图片**：如正式文档需配案例图片，需获取相应版权许可。
5. **字体商用许可**：如用于商业展示，需确认字体许可范围。

---

日期 / Date: 2026-08-14
智能体 / Agent: WorkBuddy AI Agent
GitHub: Jefferson-qi
