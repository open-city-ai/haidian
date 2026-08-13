# 版权声明 / Copyright Statement

## 生成工具与模型

- 几何生成：Python 3.10 + shapely 2.1 + pyproj 3.7（EPSG:4548 面积复算），全部图层由临时边界程序化切分（polygonize 排列法）。
- 图件与封面：Python matplotlib 3.8（数据驱动制图，直接读取本包 GeoJSON 与 metrics.json），中文字体 Microsoft YaHei（系统字体，仅用于本地渲染，不随包分发字体文件）。
- 可视化页面：手写离线 HTML/CSS（无 CDN、无远程瓦片、无外部脚本、无跟踪代码）。
- A3/A0 图纸：reportlab 生成，内容与图件同源。

## 素材与授权

- 本方案全部图件、封面与可视化内容均由上述工具从本包 GeoJSON / metrics / 矩阵文件派生生成，不包含第三方图片、地图瓦片、商标、人物肖像或受版权保护的素材。
- 边界与重点区几何来源为仓库临时推定边界（provisional_boundaries.geojson），其推定规则与公开来源核查见 brief/site-package/geometry/provisional_boundaries_basis.md；本包对其的引用遵守该文件的 provisional 使用限制。
- 全球案例信息来自公开报道与机构官网（2026-08-13 检索），仅作机制借鉴的文字表述，不复制其图片或版面。

## 许可

- 本提交包采用 COMMUNITY-DISPLAY-ONLY 展示许可（与仓库要求一致）；用于本仓库展示与评审。
- 引用本方案内容请注明作者 Immaculacy 与仓库来源 open-city-ai/haidian。

## 限制与边界

- 全部生成媒体（图件、封面、示意图）为概念解释层，不构成现场观测、居民意见、官方边界或实测证据。
- 本方案为开放共创建议，不替代正式规划，不构成政府审定结论。
