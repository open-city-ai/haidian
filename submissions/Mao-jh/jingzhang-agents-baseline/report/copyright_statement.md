# Copyright & Asset License Ledger（版权与逐资产许可台账）

> 本台账按「资产类别 → 来源 → 许可状态 → 核验方式」逐项登记，确保每一份进入提交包的可核验资产（字体、图片、图标、地图、数据、代码、生成资产、文档）均有许可文本或可核验链接，满足逐资产版权可溯源要求。

## 1. 数据资产（Data）

| 资产 | 来源 | 许可状态 | 核验方式 |
| :--- | :--- | :--- | :--- |
| 项目 brief / 任务书 / enums / ranges / schemas | `brief/site-package/`（组织方提供，`AGENT-TASKBOOK` / `SITE-PACKAGE`） | 组织方授权本项目开源共创使用 | `sources.json#SITE-PACKAGE`、`#AGENT-TASKBOOK` |
| 公告任务与范围 | 海淀区规自委公告 [OFFICIAL-ANNOUNCEMENT](https://ghzrzyw.beijing.gov.cn/zhengwuxinxi/tzgg/hd/202605/t20260509_4643047.html) | 政府公开信息，可引用 | `sources.json#OFFICIAL-ANNOUNCEMENT` |
| 事实数字（60%、1200 万辆、123 款等） | `data/processed/agent_fact_pack.md`（源自已抓取公开资料） | 已清权公开资料，每条带出处 URL | `sources.json#PROCESSED-FACT-PACK` + 事实包内出处 URL |
| 临时边界几何 | `brief/site-package/geometry/provisional_boundaries.geojson` | provisional-only，非官方红线，仅 intake 讨论 | `sources.json#BOUNDARY-SOURCE`、`#KEY-AREA-SOURCE` |

## 2. 地图与几何（Map / Geometry）

| 资产 | 来源 | 许可状态 | 核验方式 |
| :--- | :--- | :--- | :--- |
| `geometry/*.geojson`（9 层） | 由本 Agent 依据 provisional 边界与公开数据生成的**设计提案**几何 | 原创生成资产，可自由分发 | 图层内 `source_type=agent_generated_design`、`geometry_role=design_proposal` |
| 总览图 / 索引图的几何示意 | 同一组 GeoJSON 派生 | 原创生成 | `visual/index.html` 与 `assets/figures/*.png` |

## 3. 图片与图表（Figures / Diagrams）

| 资产 | 来源 | 许可状态 | 核验方式 |
| :--- | :--- | :--- | :--- |
| `assets/figures/*.png`（5 张） | 由本 Agent 用 PIL 依据 metrics/GeoJSON 生成的示意图 | 原创生成资产（CC0 同义：作者放弃权利） | manifest 内 sha256；图中注明由提交包派生 |

## 4. 字体（Fonts）

| 资产 | 来源 | 许可状态 | 核验方式 |
| :--- | :--- | :--- | :--- |
| 正文 / 展板 / 图件中文字体 | 系统字体 `Microsoft YaHei (msyh.ttc)` 等 | **仅在本地渲染时使用，不随提交包分发/嵌入**；提交包不含字体文件 | 提交包内无 `.ttf/.ttc/.otf` 字体资产；渲染依赖评审环境系统字体 |
| `visual/index.html` / `report/proposal.html` 字体栈 | 系统字体（PingFang SC / Microsoft YaHei / Noto Sans CJK SC） | 未打包、无外部字体请求 | HTML 无远程字体 URL（offline static 校验通过） |

## 5. 图标 / Logo / 视觉资产

| 资产 | 作者/署名 | 许可状态（正文或可核验链接） | 展示条款 | 核验方式 |
| :--- | :--- | :--- | :--- | :--- |
| 方案内图标与色块 | 提交 Agent（Mao-jh）原创绘制 | 原创绘制，作者按开源共创协议共享；无第三方图标库依赖 | 离线展示，随提交包分发 | `visual/index.html` 内联 SVG，无外部资源 |
| **主标志** `assets/brand/jingzhang-railfirst-logo.svg` | 提交 Agent（Mao-jh）原创绘制 | 原创生成资产；作者声明放弃权利（CC0 同义），随提交包开源共享 | 仅作概念品牌展示；不构成商标注册主张；正式使用前需商标近似检索 | 文件内作者注释 + `manifest.json` sha256 + 本节 §5.1 |

### 5.1 VI 视觉识别与品牌规则

主标志为矢量构造，母题「一段被连续绿廊包裹的轨道线，自北向南逐渐长出建筑形体」，直接表达“先轨后城”时序，非通用矩形色块。规则如下：

- **色彩**：遗址锈色 `#8A4B2A`（主/轨道线/历史锚点）、海淀科技蓝 `#295F9F`（辅/建筑形体/AI 数据锚点）、公园绿 `#15803D`（绿廊）、墨色 `#162033`（正文）、灰 `#667085`（次级）。深色底版时锈色提升 `#C07A4E`、科技蓝提升 `#5B8FD6`，保证对比度（正文 ≥ 4.5:1、大标题 ≥ 3:1）。
- **字体与许可**：品牌/导视文字用系统字体栈 `PingFang SC / Microsoft YaHei / Noto Sans CJK SC`（中）、`Arial / Helvetica Neue`（英），不嵌入提交包、无第三方字体请求。
- **留白/最小尺寸/禁用**：标志四周留白 ≥ 轨道图形宽度 1/8；彩色主标志 ≥ 28mm、纯图标 ≥ 12mm（以下用单色版）；禁用拉伸/旋转/投影/改色/叠压/高噪声底图。
- **双语导视**：中文为上、英文为下；节点导视用「锈色标识板 + 白色文字 + 无障碍触感」，呼应弱势群体连续无障碍路线（见 `proposal.md` 包容性章节）。
- **作者声明**：本标志与 VI 由提交 Agent（GitHub `Mao-jh`）原创绘制，`agent.json` 声明生成模型，按开源共创协议共享。
- **商标检索状态**：未正式注册，当前为概念品牌规范；正式使用前须完成中国商标局近似检索并评估在先权利冲突，有冲突则按本节 §8 替换或删除。
- **字体版权**：仅用系统字体且不嵌入，无字体版权负担。

> 本 VI 规则贯穿方案空间、产业、公共空间与运营传播语境，由 `proposal.md` 命名体系约束其空间化，避免停在命名层。

## 6. 代码（Code）

| 资产 | 来源 | 许可状态 | 核验方式 |
| :--- | :--- | :--- | :--- |
| 提交包生成 / 校验脚本 | `haidian/scripts/`（scaffold、finalize、self_check、work_* 等） | 仓库开源代码，许可随仓库 | 仓库根 LICENSE / README |

## 7. 生成资产（AI-Generated Assets）

| 资产 | 来源 | 许可状态 | 核验方式 |
| :--- | :--- | :--- | :--- |
| `proposal.md` 正文、`report/*`、`visual/index.html`、PDF、矩阵 | 由声明 Agent（Mao-jh）生成 | 提交者/Agent 声明的生成内容，自愿开源共享 | `agent.json` 声明 model；manifest 记录 `agent_id` |
| 所有生成文本与空间方案 | Agent 原创 | 本提交按竞赛开源共创协议共享 | — |

## 8. 总体声明

1. 本提交包**不包含**任何第三方专有字体、图标库、地图瓦片、远程脚本、远程图片或 iframe 资源；所有视觉资产均离线可用。
2. 本台账对每项可核验资产给出「作者/署名 + 许可正文或可核验链接 + 展示条款 + 核验方式」；凡许可无法核验的资产一律不进入提交包，或以 `数据缺失`/`假设` 标注，不做臆测性归属。
3. 引用的公开事实均可在 `data/processed/agent_fact_pack.md` 中溯源到具体出处 URL；provisional 几何不冒充官方红线。
4. 若某项资产的实际许可要求与上述描述不一致，请在评审中提示，我们将按需替换或删除。
5. **官方几何复算承诺**：官方 polygon / 控规条件发布后，本提交包将以同一生成链整体复算 GeoJSON、指标、分期、图纸、HTML 与 PDF，刷新 `manifest.json` 哈希、`self_check.json` 与 `validation_claim` 状态，并保留复算差异版本记录；当前所有派生指标均标 `provisional / pending_recalculation`，不以临时数据冒充审定精度（避免保留 6 位小数误导精度，取整口径统一于 `metrics.json`）。
6. 任何组织方未提供的官方 polygon、控规条件均不臆造，相关指标在 `metrics.json` 中标注为 `unknown` 并说明原因。
7. **纪念设施碑刻授权**：若参与者 GitHub ID 被用于纪念设施/碑刻，须先取得本人自愿书面授权；参与者可随时要求撤回、更正或匿名化，组织方应在公开前完成核对并提供相应渠道。
8. **公开展示前人工审核前置**：展示前须经人工视觉、无障碍（键盘/屏幕阅读器/替代文本/色彩对比度）、来源与版权专项审核；本包数字成果均由脚本生成，人工仅作审批与最终判断。
9. **数据保护与伦理**：方案遵守数据最小化、公开来源、可解释与人工复核原则；不收集或输出未经授权的个人画像；商标近似检索与在先权利冲突评估须在使用品牌/标志前完成（见 §5.1）。
