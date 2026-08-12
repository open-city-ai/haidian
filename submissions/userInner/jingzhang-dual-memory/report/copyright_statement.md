# 版权与资产声明 / Copyright and Asset Statement

本方案正文、英文译文、信息设计、场景卡、展板版式与离线 HTML 由 Codex × userInner 为“京张双记”原创生成。

## 历史与现状照片

1. 京张铁路铁棚车，1909 年及以前，作者谭景棠，来源《京张路工撮影》，Wikimedia Commons。中国及美国公共领域。文件：assets/reference/1909-jingzhang-freight-car-public-domain.jpg。
2. Qinghuayuan Railway Station (20161030162032)，作者 N509FZ，CC BY-SA 4.0。文件：assets/reference/2016-qinghuayuan-platform-cc-by-sa-4.jpg。展板仅作裁切与等比例缩放。
3. IPKR Chinghuayuan Station after renovation (20240331102606)，作者 N509FZ，CC BY-SA 4.0。文件：assets/reference/2024-qinghuayuan-renovated-cc-by-sa-4.jpg。展板仅作裁切与等比例缩放。

完整原始页面登记在 sources.json。含 CC BY-SA 4.0 图片的图面依照相同许可条件共享，并在图面页脚署名。

## 概念效果图与空间底图

assets/renders/ 下八张图由 OpenAI 内置图像生成工具根据本方案文字生成：

- 00-belt-aerial.jpg：总体设计概念鸟瞰；
- 01-qinghuayuan-memory-platform.jpg：清华园共同记忆站台；
- 02-zhongzhiyuan-red-light-court.jpg：众智园红灯试验庭；
- 03-ai-origin-provenance-clinic.jpg：AI 原点来源诊所；
- 04-dazhongsi-inclusive-plaza.jpg：大钟寺普惠服务广场。
- 05-consent-section-perspective-v2.png：60 × 14 米同意剖面场景；同时呈现无 AI 林荫步道、匿名辅助带、围合低速机器人测试庭、物理急停、人工控制台和连续绕行；
- 06-proof-mile-masterplan-v4.jpg：无文字的京张公共创新脊概念总平底图，表现细颗粒街区、轨道公园、东西缝合、三处节点与蓝绿系统；
- 07-public-edge-section-v4.jpg：无文字的连续公共界面剖面，表现铁路遗产修缮、开放首层、可逆公共亭、无账号绕行、无障碍与雨水花园。

这些图均在正文与展板中标注为“概念效果图 / 概念性总平 / 概念性剖面”，不得解释为现状照片、官方设计、已建项目、实测地块或精确建筑方案。v4 底图提示词要求“专业城市设计竞赛图、细颗粒既有城市、线性铁路遗产公园、三处公共创新节点、普通路线优先、无文字无标识、非科幻化”；连续剖面提示词要求“铁路遗产修缮、开放首层人工服务、可逆木钢公共亭、无账号无障碍绕行、雨水花园、本地停止柜、无文字无标识”。生成时未使用第三方照片作为输入，也未要求复现具体人物、商标或受保护设计。

## 空间与数据资产

- 九个 GeoJSON 图层由仓库脚手架及本方案概念设计派生。
- 总体和三处重点区边界来自仓库 provisional_boundaries.geojson，属于临时生成约束，不得解释为官方红线。
- 核心信息图从本包 GeoJSON、metrics.json、方案矩阵、记忆边界护照与原创文字生成，不使用商业地图瓦片或新闻截图。

## 字体与软件

- PNG 图件和 PDF 使用 macOS 系统内置 STHeiti 字体本地渲染；字体仅嵌入最终 PDF，不在仓库中再分发。
- 构建使用 Python、Pillow 和 ReportLab；输出为静态 PNG、PDF 与 HTML。
- HTML 不加载远程脚本、远程字体、地图瓦片、iframe、表单、API 或跟踪代码。
