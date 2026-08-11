# Copyright & Source Statement（逐资产清单）

本清单按资产类型列明作者/生成方式、许可证、字体嵌入状态、地图与数据衍生过程、代码依赖与再利用限制。**在完整清权证据齐备前，本方案不声称已完成全部版权清权**；涉及第三方名称、商标、肖像或受版权形象的内容，均以"概念方向稿 / 待清权"标注，正式对外使用须另行取得权利方授权。

## 一、文本与叙述资产

| 资产 | 作者 / 生成方式 | 许可证 | 限制 |
| --- | --- | --- | --- |
| proposal.md / proposal.en.md | AI agent（lzcapp）生成，依据公告与任务书 | COMMUNITY-DISPLAY-ONLY | 仅展示，非官方文件 |
| report/narrative.md | AI agent 生成 | COMMUNITY-DISPLAY-ONLY | 仅展示 |
| report/narrative.md（含文化叙事） | AI agent 生成（概念方向稿） | COMMUNITY-DISPLAY-ONLY | 名称/文案待商标查重与权利方确认 |
| visual/assets/*.json（案例/生态图谱/场景/画像/地标/运营） | AI agent 生成，基于公开资料归纳 | COMMUNITY-DISPLAY-ONLY | 案例为公开资料归纳，非法定对标 |
| visual/assets/landmarks.json / visual/assets/operations.json | AI agent 生成（概念方向稿） | COMMUNITY-DISPLAY-ONLY | 形态/品牌待工程与标识清权 |

## 二、图像与图纸资产（assets/figures/*.png、drawings/*.pdf）

| 资产 | 作者 / 生成方式 | 许可证 | 字体 | 限制 |
| --- | --- | --- | --- | --- |
| site-overview.png 等 5 张 PNG | AI agent 经 gen_artifacts.py（matplotlib，离线 Agg）生成 | COMMUNITY-DISPLAY-ONLY | 嵌入本地 Microsoft YaHei（系统字体，须遵守其许可） | 边界为 provisional，非官方红线 |
| a3-booklet.pdf / a0-boards.pdf | AI agent 经 gen_artifacts.py（ReportLab）组装 PNG + 表格 | COMMUNITY-DISPLAY-ONLY | 同上 | 同上 |
| visual/logo_direction（SVG 方向稿） | AI agent 纯几何生成 | COMMUNITY-DISPLAY-ONLY | 无外部素材 | 无受版权形象 |

字体说明：中文字型使用本机 Microsoft YaHei（微软正黑），其使用受微软字体许可约束；本方案仅以嵌入方式用于本次展示，不等同于已获得再分发授权。若需对外发布，应替换为已授权或开源字体（如 Noto Sans SC）并确认许可。

## 三、地图与空间数据资产（geometry/*.geojson）

| 资产 | 来源 / 生成方式 | 许可证 | 限制 |
| --- | --- | --- | --- |
| site_boundary.geojson / key_areas.geojson | 由维护者登记的 provisional 边界派生（BOUNDARY-SOURCE / KEY-AREA-SOURCE），标记 official_boundary=false | provisional_only | 非官方红线，待 official polygons 替换后重算 |
| land_use / buildings / roads / green_space / public_space / phasing / constraints | AI agent 在 provisional 边界内生成的设计分区与方案图层 | agent-generated design | 受 provisional 边界精度限制；控规/权属/市政条件缺失项为待确认 |

空间数据声明：所有 GeoJSON 均为 provisional 设计图层，不作为法定控规、审批或精确面积依据；official boundary 到位后须整体重算。坐标系为 EPSG:4548（投影面面积复算）。

## 四、代码与依赖资产

| 资产 | 来源 | 许可证 | 限制 |
| --- | --- | --- | --- |
| gen_artifacts.py | 投稿配套脚本（AI agent 编写） | 随投稿 COMMUNITY-DISPLAY-ONLY | 离线运行，无远程依赖 |
| scripts/render_proposal_html.py 等仓库脚本 | 组织方提供 | 仓库许可 | 非投稿内容，仅本地渲染使用 |
| Python 依赖（matplotlib / shapely / reportlab） | 开源第三方库 | 各自开源许可 | 仅本地生成，产物不含其代码 |

## 五、复用与外部资产限制

- 本方案不加载远程脚本、远程地图瓦片、远程字体、iframe、表单或外部 API。
- 凡涉及企业名称、商标、肖像、历史影像或受版权形象的内容，均标注"待清权"，不在未完成清权前用于对外传播。
- 引用自 sources.json 的公开/已清权资料，遵从各来源声明的用途边界；provisional-only 与 background-only 资料不得升级为 official boundary 或政府实施承诺。

## 六、清权状态结论

当前为**partial / pending-clearance**：文本、图像、图纸、GeoJSON 与代码均由 AI agent 生成或来自已登记 provisional 资料；第三方字体与潜在商标/肖像仍需在正式对外发布前完成清权确认。本声明随 assets 与 sources 更新而更新。
