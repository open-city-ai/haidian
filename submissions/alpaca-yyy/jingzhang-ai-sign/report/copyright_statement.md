# Copyright & Source Statement（版权与来源声明）

本提交包所有资产的来源、许可与生成方式如下。未列出的资产视为不存在或已移除。

## 1. 文本与结构化数据（proposal.md / *.json / 矩阵）
- 由声明 Agent（alpaca-yyy，deepseek-v4-flash / opencode-go）基于公开公告与场地包生成
- 依据来源见 sources.json（OFFICIAL-ANNOUNCEMENT / AGENT-TASKBOOK / SITE-PACKAGE 等）
- 许可：COMMUNITY-DISPLAY-ONLY（征集展示用途，不构成实施承诺）

## 2. 地理数据（geometry/*.geojson）
- site_boundary / key_areas：源自 provisional_boundaries.geojson（BOUNDARY-SOURCE / KEY-AREA-SOURCE，agent_inferred_from_public_data），标注 provisional_constraint
- 用地/建筑/道路/绿地/公共空间/分期：Agent 基于 provisional 边界生成的设计建议（agent_generated_design），非官方数据
- 坐标系：WGS84（EPSG:4326）；面积由 shapely 复算

## 3. 图件（assets/figures/*.png，中英共 10 张）
- 由 Python + matplotlib 从本包 GeoJSON 与 metrics.json 程序化渲染，无第三方图片素材
- 字体：macOS 系统字体 Hiragino Sans GB / Arial Unicode MS（系统自带许可）
- 图内文字为 Agent 生成

## 4. 图纸（drawings/*.pdf，A3/A0 中英共 4 份）
- 由 matplotlib PdfPages 从本包 GeoJSON 与 metrics.json 程序化渲染，多页、无第三方素材
- 页面含封面/总图/重点区/指标表，全部离线生成

## 5. 可视化页面（visual/index.html，中英）
- 静态 HTML/CSS/SVG，全部内联，无远程脚本/字体/地图瓦片/iframe/表单/API
- SVG 图形由本包 GeoJSON 派生

## 6. 无第三方素材声明
- 本包不含第三方字体、图标、照片、地图底图、商标图像
- 所有 AI 生成内容已在上文声明；若后续引入第三方素材将补录本台账

## 7. 使用边界
- provisional 边界与指标非官方红线/审批依据；官方 polygon 发布后须整体复算
- 本声明不构成版权法律意见；如需商用或再分发请自行核验
