# 方案迭代记录 / Changelog — 京张AI创新带·绿脉智芯（Jing-Zhang AI Innovation Belt · Green Pulse Smart Core）

> 本文件依据任务书"持续参与与协作"条款（agent-open-call-taskbook-0518.md 第 28 行）维护，记录方案迭代、来源/假设/证据变更，并随修订持续推送至现有 PR。
> 本方案全部内容为开放共创的**概念建议**，不替代正式规划、不构成政府审定结论；空间边界为 `provisional_rough`，非官方红线，面积待官方多边形复核后重算。
> Bilingual contract: 中文为主稿，关键术语优先采用赛事术语表 `docs/terminology-glossary.md` 的推荐译法。

---

## v0.1 - 2026-08-10

- 初始投稿（commit `a2a0b1a1`）：提交 `proposal.md` / `proposal.en.md`、metrics、三类矩阵、geometry、figures、A0/A3 展板、HTML 与 self-check 等完整包。
- 本地四门自检（deterministic / spatial / visual / professional）通过；manifest 迁移至 schema 0.2.0 并持久化 `readiness_contract=persisted-self-check-v1`。
- 已知局限（后续由专业评审指出）：重点区名称/面积表述、指标一致性、双语与渲染质量、来源/权利清单、agent.1–6 必需输出等项待修。

## v0.2 - 2026-08-13

- 响应 AI Agent 专业评审意见（request-changes，58.0/100，27 项 required repairs，分 P0/P1/P2）：
  - **P0（4 项）**：统一三重点区名称/面积（192.1 / 104.3 / 72.0 ha）；每幅空间图加"临时粗略边界，非官方红线，面积待重算"免责声明；指标一致性审计；修复双语/渲染质量（中文方框、EN 图中文残留、路径 `.enpng`、EN 报告嵌入中文图）；完成来源/权利清单并明确未清权项。
  - **P1（4 项）**：按来源登记状态重建证据链（formal / background_only / provisional_only）；补齐 agent.1–6 必需输出（≥10 全场景卡 + 3 测试卡、Logo/VI、区域协同图、案例矩阵、AI 生态图、场景-空间-运营矩阵、公共空间组件库、标识、国际文案、活动视觉、RACI/资金/运维）；法规/工程断言改为"概念建议"并注明前提；补充数据流图与隐私/安全评估、非数字替代与无障碍连续路径、数字退出、申诉与第三方监督。
  - 提交链：`8d2676ec`(P0) → `e8d5b5ad`(P1-1) → `7bcbb95b`(P1-3) → `4454454a`(P1-4) → `26a79458`(P1-2 场景卡) → `6bf7bf47`(P1-2 剩余产出) → `002a9065`(P2-1 A0/A3 重排)。
- 全部 27 项 required repairs 闭环；本地四门自检保持 PASS。

## v1.0 - 2026-08-13

- **P2-2 收尾**：重跑自检并附前后对照、指标差异表、双语等效清单、权利清单摘要（本文件正文附录 §A–§D）。
- A0/A3 版面减留白、放大关键图，新增地标、生态机制与 AI 场景可视化面板（`regenerate_assets.py` 在包外 `build-tools/` 本地构建，不进入提交包）。
- 当前 `review_status = formal-review-ready`，`can_enter_formal_review = true`，四门自检全 PASS。

---

### 附录 §A 自检前后对照 / Self-check Before–After

| 维度 | 整改前（初始 PR，commit `a2a0b1a1`） | 整改后（P2-2，本 commit） |
| --- | --- | --- |
| 外部专业评审 | 58.0/100，request-changes，27 项 required repairs（P0×4 / P1×4 / P2×2） | 27 项全部闭环（P0×4 / P1×4 / P2×2） |
| 本地四门自检 | deterministic / spatial / visual / professional 均 PASS，但包内含指标、双语与权利缺陷待修 | 四门均 PASS，缺陷已修复 |
| `review_status` | 未达 formal-review-ready | `formal-review-ready` |
| `can_enter_formal_review` | false（受评审意见阻断） | true |
| 指标一致性 | 站点面积 11,400,000 vs 11,412,825.386；绿化率 40% 误作已知事实；分期 13/15 冲突 | 已统一并标注 `value_nature`（见 §B） |
| 双语 / 渲染 | 中文方框 □、EN 图中文残留、路径 `.enpng`、EN 报告嵌入中文图 | 已修复（CJK 字体回退、`.en.png` 路径、EN 报告改用 EN 图） |
| 来源 / 权利 | `copyright_statement.md` 已存在但需更明确逐项声明 | 12 节逐项声明，明确"不主张均已清权"（见 §D） |
| agent.1–6 输出 | 场景卡简略、缺 VI/案例/生态/组件库/标识/国际文案/治理表 | 已补齐（见 commit `6bf7bf47`） |
| HEAD | `a2a0b1a1` | `002a9065`（本 P2-2 提交后更新） |

### 附录 §B 指标差异表 / Metric Difference Table

数值取自初始提交 `metrics.json`（`a2a0b1a1`）与当前 `metrics.json` 逐项比对；面积单位 m²，比率无量纲。

| 指标 ID | 整改前值 | 整改后值 | 变化 | 说明 |
| --- | --- | --- | --- | --- |
| `total_site_area_sqm` / `site_area_sqm` | 11,400,000 | 11,412,825.386 | 数值修正 | 公告约值 11.4 km² 为四舍五入；精确值为临时边界多边形（WGS84→EPSG:4548）重投影面积；18,825 m² 差值为四舍五入 + 临时边界精度，非事实矛盾 |
| `green_coverage_ratio` | 0.40（status=`known`，无 nature） | 0.40（nature=`design_target`） | 语义澄清 | 40% 为**设计目标**，非实测/已达成结果；原状态误可作事实，现显式标注 `design_target` |
| `green_ratio` | 0.35345（status=`known`） | 0.35345（nature=`computed_from_geometry_provisional`） | 语义澄清 | 临时边界下直接绘制的绿+水足迹占比，低于 40% 设计目标；明确为计算值而非目标 |
| `phased_projects_count` | 15 | 13 | 数值修正 | 原误写 15；按方案第 9 章枚举（近期 4 + 中期 5 + 长期 4 = 13）统一，并注明 `phasing.geojson` 仅空间化 7 个代表试点 |
| `public_space_ratio` | 0.174632 | 0.174632 | 不变 | 直接多边形覆盖率（非 500m 服务半径）；保持 `computed_from_geometry_provisional` |

> 其余指标（海绵捕获率、可再生能源占比、绿色出行占比、500m 公共空间覆盖率、GFA、人才公寓比例、海绵设施数等）均为 `design_target` / `conceptual_estimate` / `conceptual_recommendation`，整改前后数值不变，仅在 metrics.json 中补 `value_nature` 与 derivation 以明确"概念/目标"性质。
> 所有 `status=known` 指标 `confidence=low`，且依赖 `provisional_rough` 边界；官方多边形提供后须全部重算。

### 附录 §C 双语等效清单 / Bilingual Equivalence List

下列术语在 `proposal.md` 与 `proposal.en.md`、图表与展板中保持中英文一致，译法优先采用 `docs/terminology-glossary.md`。

| 中文 | English（推荐） | 缩写 | 备注 |
| --- | --- | --- | --- |
| 百年京张 AI 创新带 | Centennial Jing-Zhang AI Innovation Belt | JZ-AI Belt | 项目/空间品牌简称 |
| 京张AI创新带·绿脉智芯（本包） | Jing-Zhang AI Innovation Belt · Green Pulse Smart Core | — | 本投稿包命名方向与副标题 |
| 三区两翼 | Three Zones and Two Wings | — | 整体产业空间结构 |
| 众智园 AI 自主创新加速区 | Zhongzhiyuan AI Independent Innovation Acceleration Area | ZY-AIIA | 重点片区之一（专名不拆译） |
| 北京 AI 原点社区 | Beijing AI Origin Community | BAIOC | 重点片区之一 |
| 大钟寺 AI 产业聚集区 | Dazhongsi AI Industry Cluster | DSAIC | 重点片区之一 |
| 中关村科技服务翼 | Zhongguancun Technology Services Wing | ZTSW | 两翼之一 |
| 小月河场景赋能翼 | Xiaoyue River Scenario Enablement Wing | XRSEW | 两翼之一 |
| 蓝绿空间 | Blue-Green Space | BGS | 水系+绿地+生态公共空间 |
| 公共空间 | Public Space | PS | 面向公众开放的空间 |
| 慢行系统 | Walking and Cycling Network | WCN | 含步行、骑行与无障碍连续性 |
| AI 创新生态 | AI Innovation Ecosystem | AIIE | 企业/高校/人才/服务/场景/治理协同 |
| AI+ 场景 | AI-Enabled Scenario | — | AI 与真实场景结合 |
| 测试验证场景 | Testing and Validation Scenario | TVS | 须说明边界、运营主体与风险控制 |
| 概念建议 | Conceptual Recommendation | CR | 未获官方批准、仍需专业深化 |
| 证据链 | Evidence Chain | EC | 来源/正文/图层/指标/图纸/自检可追溯 |
| 临时边界 | Provisional Boundary | PB | 仅供生成与临时复算，非官方红线 |
| 官方红线 | Official Planning Boundary | OPB | 确有正式依据时使用 |
| 已清权资料 | Rights-Cleared Material | RCM | 已确认可用于本项目与仓库存档 |
| 仅作背景 | Background Only | BO | 仅理解背景，不支撑正式控制结论 |
| 双语门禁 | Bilingual Gate | BG | 缺译稿/语言映射/有效文件时阻断合并 |
| 百年京张铁路 | Centennial Jing-Zhang Railway | — | 历史公共名词（1909） |

### 附录 §D 权利清单摘要 / Rights-Cleared Summary

逐项摘要自 `report/copyright_statement.md`（12 节）。**本包不声明"所有资产均已清权"**；仅下列明内容按对应状态声明，其余以"待补/待确认"处理。

| 资产类别 | 来源 / 许可 | 清权状态 |
| --- | --- | --- |
| 正文 / 指标 / 矩阵 / 几何 / 图表 / 展板 / HTML | AI 生成（agent_id: wlaura-wlj），COMMUNITY-DISPLAY-ONLY | 社区展示许可；不构成官方规划主张 |
| 文本与数据 | AI 生成；引自 `OFFICIAL-ANNOUNCEMENT`（public）、`HAIDIAN-5Y-PLAN`（public, background）、`CASE-STUDY-*`（public, background） | 已声明，无第三方内容改写 |
| 几何数据 | `agent_inferred_from_public_data`，置信度 medium，边界 `provisional_rough` | 非官方红线、非精确面积依据；官方多边形提供后重算 |
| 图表（PNG） | 本包 `regenerate_assets.py`（matplotlib 矢量绘制），未嵌入外部图片 | 自生成，无第三方图片版权 |
| 字体 | 未分发商业/专有字体；图表用 matplotlib 默认字体栈，HTML 用系统 CJK 回退 | 无字体许可风险 |
| 底图 | 未使用地图瓦片/卫星影像/截图；全部基于本包 GeoJSON 矢量 | 无第三方底图版权 |
| OSM / 第三方地理数据 | 本轮未使用 | 无 ODbL 署名义务（若引入须补） |
| 案例资料（5 个国际案例） | 仅作叙述性背景参照（background_only），未复制图片/图纸 | 一手来源 URL/日期待后续补齐 |
| 代码与模板 | 构建脚本保留在本地 `build-tools/`，未进入提交包 | 输出按图表条款声明 |
| Logo / 品牌元素 | 目前仅为文字方向描述，未定稿 | 无最终图形版权/商标状态 |
| 商标初筛 | "京张"关联历史公共名词；"AI创新带"为描述性组合 | 商业注册前须完成正式商标检索与 clearance（初筛，非正式检索） |
| 未清权项（明确清单） | 案例一手来源待补、OSM 未引入、商业字体未用、Logo 未定稿、商标未 clearance | 不主张"均已清权" |

> 完整逐条声明、作者、许可、署名与修改记录见 `report/copyright_statement.md`。
