# Formal Narrative

This narrative is derived from the structured AI package. Geometry, metrics, compliance matrix, drawings, and visual/index.html remain cross-checked deliverables.

---

# 图版说明 · 京张博物志

> **凡例**：本志图版与文字分置——图版为标本画，录其形制；文字为志书条目，记其释名、性用、考。图文以编号相配，观者先览图，后读条，如临标本馆。
> **Plate note**: plates and text are kept separate — each plate is the specimen drawing, each entry the annals text. Plates are keyed by number.

---

## 图版一 · 总览 / PLATE I · GENERAL VIEW

**释名 (Name)**: 京张博物志 · 总览 — THE JING-ZHANG NATURAL HISTORY · GENERAL VIEW

**形制 (Form)**: 竖向舆图。京张铁路遗址公园廊道横贯中腹（淡米色带状面域 + 墨线中心线，局部枕木点缀）；廊道北侧赭石色区块、南侧青灰色与藤黄色区块纵向排列，对应三处重点区域；色块为矿物淡彩水彩晕染，墨线手绘勾边；画面四周留白，右下角留空标签位。做旧米纸底，水痕污渍纹理。

**性用 (Use)**: 全志之纲。以一幅图立五卷三区两翼之空间骨架，供评审与公众第一眼把握"一带三核、五卷两翼"的整体格局；亦作展板封面与 HTML 首页主图。

**考 (Examination)**: 廊道与三区色块的位置关系源自提交图层 `site_boundary.geojson`、`key_areas.geojson`、`roads.geojson`（provisional）；面积 11.4 平方公里按京坐标复算；五卷命名见正文"命名考"节。概念建议，非审定结论。

---

## 图版二 · 五卷空间结构 / PLATE II · THE FIVE VOLUMES

**释名**: 五卷空间结构 — THE FIVE VOLUMES · SPATIAL STRUCTURE

**形制**: 分区舆图。铁路廊道横贯中部；北侧左上赭石块（博弈卷·众智园）、右上青灰块（博喻卷·原点社区），南侧藤黄长条块（博大卷·大钟寺），下方两枚分离小碎块（灰褐=博览卷·中关村翼，绯褐=博爱卷·小月河翼）；五块如标本切片，块间留纸色间隙。

**性用**: 方案概念核心图。演示"三区两翼"如何转译为"五卷"：三区为卷之主体，两翼为卷之辅弼；一脊（廊道）贯之，多节点、复合环以虚线示意。

**考**: 五卷命名及空间映射见正文"五大功能与三区两翼之转译"；两翼无官方 polygon，以概念定位示之，待正式数据复算。概念建议，非审定结论。

---

## 图版三 · 三处重点区域 / PLATE III · THE THREE KEY AREAS

**释名**: 三处重点区域 — THE THREE KEY AREAS · DETAILED PLATES

**形制**: 三联画（triptych），如标本展柜三屉。左格赭石块含建筑群测绘线与一朱砂点（博弈卷·众智园）；中格青灰块含街网格、桥/廊道符号与一朱砂点（博喻卷·原点社区）；右格藤黄块含街网格、钟形符号与二朱砂点（博大卷·大钟寺）；底部细虚线贯穿三格，示京张主轴。

**性用**: 详察之图。三处重点区（368.4 公顷）各立一卷，展示"试验场—主展厅—应用区"三态；朱砂点示意 AI 场景节点（鉴定站、标本修复室、采集陪练场等），引线留空供标注。

**考**: 三区边界引用 `key_areas.geojson`（PROV-KEY-001~003，provisional）；场景节点与测试场景一一对应正文场景卡表。概念建议，非审定结论。

---

## 图版四 · 慢行与蓝绿系统 / PLATE IV · SLOW MOBILITY & BLUE-GREEN

**释名**: 慢行与蓝绿系统 — SLOW MOBILITY & BLUE-GREEN NETWORK

**形制**: 竖向网络测绘图。京张廊道横贯；南北延伸墨线曲线路径如经络；沿路径散布竹绿叶片状斑块（公园绿地）与淡蓝蜿蜒线（清河、小月河水系）；四枚朱砂点（公共服务节点：博爱站、博济院等）带细引线；背景淡等高线弧线。

**性用**: 博爱卷之图证。以"脊—脉—肺—穴"四喻组织慢行网络：廊道为脊，水系为脉，绿斑为肺，节点为穴；证明 AI 场景落在真实蓝绿骨架之上，非悬空想象。

**考**: 绿斑、水系与节点对应 `green_space.geojson`、`public_space.geojson` 及 SCENARIO_NODE 图层（待生成后复算）；绿地率、公共空间比例见 metrics.json。概念建议，非审定结论。

---

## 图版五 · 指标体系 / PLATE V · THE INDEX PLATE

**释名**: 指标体系 — THE INDEX PLATE · METRICS & EVIDENCE

**形制**: 方形手工科学图表页，如《营造法式》测量表页。左上五根墨线柱状图（赭石/青灰交替，高度递增）示空间指标；右上 3×3 细线表格（虚线占位）示任务合规矩阵；左下三几何图（方、圆、矩）示复算公式；右下空标签位。

**性用**: 可复算之图证。柱=空间指标（面积、绿地率、公共空间比、建筑基底、节点数），表=合规矩阵（公告 1.3/1.4/1.5 与 agent.1~6 逐条映射），几何=复算方法（多边形面积求和、比例计算）；图版下方"考"部列三类指标（空间/管控/绩效）。

**考**: 指标数值与公式见 `metrics.json`；任务映射见 `compliance_matrix.json`；未知项（容积率等）状态=unknown 待官方数据。概念建议，非审定结论。

---

## 附 · 图文配对使用说明 / How Plates Pair with Text

- 提交包中图版均以"图版一~五"编号，正文 proposal.md 相应章节引用同名图文件；
- HTML 可视化页与 A3/A0 手册中，每张图版旁并列本说明条目（释名/形制/性用/考），图左文右，如标本与展签；
- 图版原图无文字，双语文字全部集中于本说明与 HTML/PDF 文本层，保证图面零乱码、文字可检索、可复算。
