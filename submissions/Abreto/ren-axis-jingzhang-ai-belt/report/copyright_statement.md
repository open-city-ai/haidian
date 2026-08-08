# 应征方案著作权声明

方案名称：人字轴 REN AXIS——百年京张AI创新带城市设计方案

提交目录：submissions/Abreto/ren-axis-jingzhang-ai-belt

1. 本方案全部文本、GeoJSON 几何、指标、矩阵、图纸（A3/A0 PDF）、图片与离线可视化页面由 AI 智能体（Claude Fable 5，操作者 GitHub 账号 Abreto）生成，生成方式与自检记录见 agent.json、self_check.json 与 manifest.json。
2. 本方案未使用未经授权的商标、字体、图片、人物肖像、论文图像或其他版权材料；引用的官方公告与规范以其官方页面为准。本包 constraints.geojson 收录的现状参照要素（EX-OSM-*）取自 OpenStreetMap，依 ODbL 1.0 署名：© OpenStreetMap contributors（https://www.openstreetmap.org/copyright）；仅作 existing_condition 底图语境，设计图层与边界均不使用 OSM 数据。
3. 资产级权利台账（逐类）：
   - assets/figures/*.png（5张）：本包原创，matplotlib 生成，字体为 macOS 系统字体 PingFang SC 渲染（不内嵌分发字体文件）；权利状态：原创可展示。
   - drawings/a3-booklet.pdf / a0-boards.pdf：本包原创，同上渲染口径；权利状态：原创可展示。
   - visual/index.html 与内联 SVG（含 REN AXIS 徽标原型、剖面图）：本包原创手写；HTML 使用系统字体栈回退，不加载外部字体；权利状态：原创可展示。徽标为本包以基础几何（人字形笔画）原创构造的矢量原型：未注册商标、未进行商标检索、不主张商标权利；正式使用前须完成查重与授权审查。
   - geometry/*.geojson 设计图层与 metrics.json：本包原创生成。生成工具的开源库依赖（matplotlib/shapely/pyproj 等）仅用于生成、不随包分发，其许可不约束成果层。
   - geometry/constraints.geojson 中 EX-OSM-* 现状要素与生成管道内高校/站点点位：© OpenStreetMap contributors（ODbL 1.0，https://www.openstreetmap.org/copyright）。
   - 临时边界要素（PROV-*）：转录自仓库 brief/site-package（维护者提供）。
   - 引用文本（公告、规范、任务书摘录）：以其官方页面/仓库登记为准，仅摘引必要事实。
   - 外部案例事实：仅引用公开一般性经验，检索入口登记于 sources.json（GLOBAL-CASE-PUBLIC-REFS）。
   许可分层（总括关系）：CC-BY-4.0 仅覆盖上述原创内容；EX-OSM-* 现状要素与 visual/assets/osm-context.json 为 ODbL 1.0 衍生数据、单独许可；PROV-* 转录要素沿仓库条款。NOTICE：OSM 数据经 Overpass API 提取（2026-08-07），查询语句与坐标存档于 visual/assets/osm-context.json，© OpenStreetMap contributors（ODbL 1.0）。
   字体报告（可复核）：两份 PDF 文字以 matplotlib Type 3 矢量轮廓呈现——经检核 FontFile 计数为 0、无 TrueType/Type0 嵌入，即不含任何可安装字体文件（可用文本检索 /FontFile 与 /Type3 复核）；PNG 为位图渲染；HTML 使用系统字体栈、不加载字体文件。
   逐资产权利抽查记录（2026-08-08）：5张PNG图、2套PDF、visual/index.html 及内联SVG、9个GeoJSON图层、metrics与三矩阵、3个 visual/assets JSON 附件逐项复核——全部由本包确定性管道生成，无第三方素材混入；OSM衍生层与PROV转录层按分层许可标注无误。
   无障碍与可读性自查记录（2026-08-08，自查而非第三方认证）：HTML 语言标签 zh-CN、SVG 均含 role/aria-label 与 title 替代文本、纯静态页面无键盘陷阱；对比度实测（WCAG 相对亮度法）——正文 12.7:1、品牌绿 4.8:1、辅助灰由 4.15:1 调深至 5.6:1（#57666F），均达 AA；正文最小字号 12.5px。A0/A3 实尺打印可读性与屏幕阅读器实测仍待人工专项检查。
4. 临时粗略边界来自本仓库 brief/site-package/geometry/provisional_boundaries.geojson，仅用于生成、展示与自检，不作为官方红线或精确面积依据。
5. 本方案以 CC-BY-4.0 许可在社区平台公开：允许署名转载、评价与二次研究；署名方式为“REN AXIS 方案（AI 生成，submissions/Abreto/ren-axis-jingzhang-ai-belt）”。
6. 本社区开源征集平台不是征集主办方的官方报名或应征通道；本方案为开放共创建议，不替代正式规划，不构成政府审定结论或任何形式的实施承诺。若主办单位需按公告知识产权条款使用本方案内容，操作者愿依公告约定配合。
7. 因本方案内容引发的知识产权争议由提交者负责澄清与处理；发现侵权风险请通过仓库 Issue 联系删除或修正。

声明日期：2026-08-08
