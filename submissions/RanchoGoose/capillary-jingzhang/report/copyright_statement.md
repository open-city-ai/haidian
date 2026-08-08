# 版权、授权与资料合规声明

## 1. 成果生成方式

本投稿包的全部内容——`proposal.md` 正文、九个 GeoJSON 设计图层、`metrics.json` 指标、
三张矩阵、五张派生图、A3 文册、A0 展板与离线 HTML 电子展示页——均由 AI agent 生成：

- GitHub 贡献者：**RanchoGoose**
- Agent：**Claude Opus 5（Claude Code）**
- 生成方式：agent 读取本仓库 `brief/site-package/` 结构化任务书、`data/source_registry.json`
  资料登记表与 `brief/site-package/geometry/provisional_boundaries.geojson` 临时边界后，
  用自行编写的 Python 程序（shapely / pyproj / networkx / matplotlib）从边界出发生成设计几何、
  复算指标并渲染全部图纸与页面。所有空间结论可由提交数据按 `metrics.json` 的 `formula`
  字段重新计算。

作者对本包的事实陈述、资料引用、版权状态与最终表达负责。

## 2. 资料来源与授权状态

| 类别 | 内容 | 来源 | 授权状态 |
| --- | --- | --- | --- |
| 任务与范围 | 公告 1.3/1.4/1.5、三层范围、三处重点区域 | 北京市规划和自然资源委员会海淀分局公告（公开发布） | 公开资料，仅作引用 |
| 智能体任务 | agent.1–agent.6、共创原则、边界条款 | 本仓库 `brief/site-package/agent_taskbook.json` | 仓库提供的已清权摘录 |
| 专业标准 | 六份标准的本地参考快照 | 本仓库 `brief/site-package/standards/references/` | 仓库提供，仅作引用 |
| 空间基础 | provisional 边界与三处重点区域临时范围 | 本仓库 `brief/site-package/geometry/provisional_boundaries.geojson` | 仓库提供，`official_boundary=false` |
| 设计几何 | 用地、路网、建筑、绿地、公共空间、分期、约束 | **本方案原创生成** | 作者原创 |
| 图纸与页面 | 五张派生图、A3、A0、HTML | **本方案原创生成** | 作者原创 |

本包**未使用**：商业地图瓦片或截图、卫星影像、第三方商标或企业标识、人物肖像、
新闻图片、论文插图、任何非公开规划图件、内部数据或个人隐私数据。

## 3. 字体

图纸中的中文字体为渲染环境中的开源字体 **Noto Sans CJK**（SIL Open Font License 1.1）。
HTML 页面不加载任何外部字体文件，仅通过 `font-family` 声明回退到阅读者本机已安装的字体。
本方案在正文中建议的品牌字体方向同样限定为 SIL OFL 等开源许可字体，正式使用前仍须
完成字体授权与商标检索确认。

## 4. 命名与视觉识别

「毛细京张 / CAPILLARY JING-ZHANG」名称、「把 100 米还给城市」宣言、主脉—分脉—毛细
三层命名体系、KM0 里程碑命名、以及以「人」字形折返几何为母题的 Logo 方向，
均为本方案原创的文字与几何描述，未复制任何既有城市、园区、企业的名称或标识。
色彩系统为自定义十六进制色值。**正式采用前仍须由权利人完成商标检索与注册可行性核查。**

## 5. HTML 与静态资源安全

`report/proposal.html` 与 `visual/index.html` 均为离线静态页面：

- 不加载远程脚本、远程样式、远程字体、远程图片或地图瓦片
- 不含 iframe、表单提交、外部接口调用或任何网络请求
- 不含跟踪、统计或指纹采集代码
- `visual/index.html` 的所有地图为从提交 GeoJSON 直接生成的内联 SVG，不依赖任何外部库

## 6. 使用许可

本投稿包以 `COMMUNITY-DISPLAY-ONLY` 提交，授权征集主办方、承办方、open-city.ai 维护者
及本项目展示网站，为本次开源征集的评审、展示、存档与公共知识沉淀目的，
无偿使用、复制与公开展示本包内容，并保留贡献者 GitHub 名称与 Agent 名称的署名。
超出上述范围的商业使用需另行取得作者授权。

## 7. 官方声明边界

本方案不声称获得任何政府批准、审定或背书。本包中的边界、面积、用地、路网、建筑、
分期与指标均为基于 provisional 临时边界的**概念建议与参考方案**，不构成法定规划、
控规调整、拆改留结论、道路线位、工程方案、投资测算、开发时序或实施承诺。
官方红线与官方重点区域 polygon 发布后，全部图层与指标须整体重算。
最终判断由人类专业团队与法定审批程序完成。
