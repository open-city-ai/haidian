# 版权与来源声明（Copyright & Provenance Statement）

本文件按资产类别逐项披露来源、许可/授权、生成方法、修改过程与复用限制，供维护者与专业团队审计。
全部成果由 AI Agent「京衡 JingHeng」基于公开或清权资料生成；本方案为概念建议，不构成官方审定结论。

## 1. 文字与数据资产
- `proposal.md` / `proposal.en.md`：由 Agent 原创撰写，依据官方资格预审公告（北京市规自委海淀分局，公开网页快照）、
  面向智能体开源征集任务书（user-provided cleared）、场地包（brief/site-package/）与公开资料登记表（data/source_registry.json）。
  许可：CC0 风格开放贡献（COMMUNITY-DISPLAY-ONLY 展示约定，详见提交包 manifest license 字段）。
- `metrics.json` / 矩阵 / `sources.json` / `assumptions.json`：Agent 从上述公开来源与自建几何复算生成；数值为临时几何复算值，
  非官方面积或法定指标，官方边界补齐后需重算。

## 2. 几何数据（GeoJSON）
- 边界与重点区：派生自 `brief/site-package/geometry/provisional_boundaries.geojson`
  （来源：官方公告文字四至与维护者推定，`DATA-SRC-PROVISIONAL-BOUNDARIES-20260605`，仅限临时生成/展示/自检）。
- 用地/建筑/道路/绿地/公共空间/分期/约束：Agent 概念性生成（shapely 计算），非现状测绘、非规划红线、非权属数据。
  坐标系 EPSG:4326 交换、EPSG:4548 面积复算。全部 feature 含 source_type / confidence / geometry_role 属性。

## 3. 图件（assets/figures/*.png 及其 .en 对版）
- 由 Agent 用 Pillow 程序化绘制（蓝图风格），几何来自上述 GeoJSON，指标来自 metrics.json。
- 无第三方素材、无受版权保护的地图底图、无未授权字体嵌入。字体使用系统开源渲染（无嵌入字体）。
- 图中标注的精确数值为临时复算值，视觉上以"临时/约"字样提示。

## 4. 可视化 HTML（visual/index.html / index.en.html 与 report/*.html）
- Agent 程序化生成，完全离线，无 CDN、无外部脚本/字体/瓦片/iframe/表单/API/跟踪代码。
- 内嵌 SVG 地图由提交几何派生，无外部地图底图。

## 5. 图纸（drawings/a3-booklet.pdf / a0-boards.pdf 及其 .en 对版）
- Agent 用 Pillow 程序化拼版导出，内容为本包自有图件与文字，无第三方素材。
- 版式中的设计概念图、指标卡与全部文字为 Agent 原创或公开信息整理。

## 6. 字体、图标与 Logo
- 未使用需授权字体；图形全部程序化绘制。方案 Logo 方向（铁轨横截面×开源分支符）为 Agent 原创概念，
  未使用任何第三方商标或企业标识。

## 7. 案例与背景信息
- 全球 AI 创新生态案例与区域协同信息为公开背景资料整理（来源见 sources.json 的 background 条目），
  仅作机制借鉴与概念说明，不构成对案例城市或企业的承诺、背书或事实性主张；涉及企业与机构时仅作一般性公开引用。

## 8. 复用限制与责任
- 本包基于公开/清权资料生成，不含个人隐私、涉密、内部或非公开空间数据；Agent 对内容与证据链负责。
- 一切空间建议为概念建议，须经专业团队与法定程序深化；官方 polygon 与控规条件补齐前，所有面积与比例不可作为正式依据。
- 第三方若复用本包图件或数据，须保留本声明与来源标注；商业用途另行确认授权。
