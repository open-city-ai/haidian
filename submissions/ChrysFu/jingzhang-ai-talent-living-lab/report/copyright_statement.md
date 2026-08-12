# 版权、工具与公开边界声明

## 投稿与许可

- 投稿作者：ChrysFu；生成 Agent：OpenAI Codex。
- 投稿许可：`COMMUNITY-DISPLAY-ONLY`，最终适用范围以官方仓库最新规则为准。
- 本包只公开城市服务闭环、空间方法、运营原则和由本次报名数据生成的城市设计表达；不含任何私有项目名称、合作主体清单、内部推演、成本测算、产品配方、产品目录或采购参数。

## 资产来源台账

| 资产 | 生成与来源 | 权利与限制 |
| --- | --- | --- |
| `proposal.md` / `proposal.en.md` | 本次投稿原创中英文文本，依据 `sources.json` 所列公开资料 | 不复制第三方长文本、商标、图纸或受限内容 |
| `geometry/*.geojson` / JSON 矩阵 | 官方公开任务信息、仓库 provisional 边界与本次 agent_generated_design 派生 | 临时边界不是官方红线；设计几何不是法定或工程结论 |
| `assets/figures/*.png` | 由同一 GeoJSON、metrics、simulation 和矩阵确定性自绘 | 未使用外部图片、远程地图瓦片、企业标识、人物肖像或风格参考中的事实内容 |
| `assets/identity/*.svg` | 本次投稿原创识别标志 | 仅用于本方案识别，不声称赛事或政府官方标识 |
| `report/*.html` / `visual/*.html` | 本地静态 HTML 与内联 CSS | 无 CDN、远程字体、跟踪代码、表单、iframe 或远程脚本 |
| `drawings/*.pdf` | 由本包图件本地排版生成 | PDF 是解释层，不替代 GeoJSON、metrics 或官方规划附件 |
| `relative-massing-3d.png` | BBBike/OpenStreetMap 背景数据与 Blender 5.2.0 LTS 程序化功能、立面和轴测渲染 | 功能分类与立面均为设计推断，不是官方用途或现状测绘；`.qgz`、`.blend` 与 GLB 源模型保留在本地派生目录，不进入 GitHub 报名包 |

## 字体、依赖与开源工具

- 中文图件使用 macOS 系统字体 Hiragino Sans GB；英文图件使用系统 Arial。PDF 由 ReportLab 生成并嵌入/子集化所需字形；HTML 不分发字体文件，使用本地系统字体回退。
- Geo MCP `0.3.0`：MIT；用于文件元数据、几何有效性、CRS 与空间关系复核。
- QGIS LTR `3.34.15` 与 `haidian-qgis`：QGIS 本体及插件按各自开源许可；QGIS MCP 仓库为 GPL-2.0。只读取派生工程，不改写报名源 GeoJSON。
- PlanX `4.10.5`：GPL-3.0；只输出 `agent_generated_design` 概念网络诊断，不分发其源代码或把结果表述为官方绩效。
- BBBike/OpenStreetMap：ODbL；仅用于彩色功能分析模型的背景城市肌理，不用于官方边界、控规、现状认证或工程结论。
- Blender `5.2.0 LTS`：用于程序化功能色、立面构件和轴测表达；功能与立面细节属于本次设计推断。
- AI Analysis Diagram Factory：Apache-2.0；只使用模板路由、几何锁定与 QA 方法，不复制参考图片或把风格参考作为事实来源。
- 其余 Python 依赖与版本由本地构建环境管理；报名包不再分发第三方运行库。完整事实来源、公开网址、许可和限制见 `sources.json`。

## 公开与专业边界

- 全球案例只引用机构或政府官网的公开机制，不复制其图片、图纸、商标或受限内容。
- `SITE_BOUNDARY`、三个 `KEY_AREA` 和约束包络均为 provisional rough geometry，不构成审批依据、精确面积依据或法定规划结论。
- PlanX 的 pedshed、步行性和绿地触达数字只用于概念设计网络自检；真实十五分钟可达性、人口覆盖、坡度、高程、FSI、OSR、日照、热环境和工程容量保持 unknown。
