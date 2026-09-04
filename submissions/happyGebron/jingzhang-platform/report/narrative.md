# Formal Narrative

This narrative is derived from the structured AI package. Geometry, metrics, compliance matrix, drawings, and visual/index.html remain cross-checked deliverables.

---

# 中英文等价性检查记录 (Bilingual Equivalence Check Record)

检查日期：2026-08-12（提交前最终轮）
检查方法：逐资产结构对照 + 单源数据核对（metrics.json / geometry 为唯一数据源，两种语言页面均从同一文件读取，不存在各自维护的数值）。

## 1. 检查范围与结论

| 资产对 | 检查项 | 结果 |
| --- | --- | --- |
| proposal.md / proposal.en.md | 标题一一对应（含 H1 共 20 vs 20，正文 19 节 vs 19 节） | 通过 |
| proposal.md / proposal.en.md | Markdown 表格行数（80 vs 80） | 通过 |
| assets/figures/*.png（5 图 × 中英文 10 张） | 同名图对（site-overview、land-use-structure、key-areas、mobility-bluegreen、metrics-evidence） | 通过 |
| visual/index.html / index.en.html | 区块镜像：总览地图/三层范围/重点区域/AI场景/核心指标/任务覆盖/自检状态/来源/假设（EN 为对应英文标题） | 通过 |
| visual/index.html / index.en.html | `data-value` 指标集完全一致（均来自 metrics.json） | 通过 |
| drawings/a3-booklet.pdf / a3-booklet.en.pdf | 页数 10 vs 10，页目一一对应（见 copyright_statement.md §4.1） | 通过 |
| drawings/a0-boards.pdf / a0-boards.en.pdf | 板数 4 vs 4，板目一一对应（见 copyright_statement.md §4.2） | 通过 |
| sources.json / assumptions.json / compliance_matrix.json | 单语言登记文件，无双语漂移风险（19 条来源、7 条假设、23 项要求） | 通过 |

## 2. 数值一致性核对（同一数据源）

场地面积 11,412,825.4 m²、绿地率 0.133947（13.3947%）、公共空间占比 0.023376（2.3376%）、重点片区 3 处（合计复算 3,692,893.0 m²，公告 368.4 ha / 复算 369.3 ha）、用地块数 14、建筑 314 栋（基底 1,248,218.6 m²）、路网 23,849.4 m、分期覆盖 11,414,842.2 m² —— 上述数值在中英文正文、HTML 指标卡、图件标注、A3/A0 页脚与 metrics.json 中逐处核对一致；差异仅存在于「公告值 vs 复算值」这一组有意保留的对照（两值均标注来源）。

## 3. 逐页比较记录（A3 文册 / A0 展板）

| 页码/板号 | 中文页题 | 英文页题 | 图件对照 | 指标卡对照 | 结论 |
| --- | --- | --- | --- | --- | --- |
| A3-01 | 封面 | Cover | — | 5 项指标带一致 | 通过 |
| A3-02 | 总览与三层范围 | Overview & Three-Level Scope | site-overview(.en) | — | 通过 |
| A3-03 | 重点区域 | Key Areas | key-areas(.en) | 368.4/369.3 ha 对照表一致 | 通过 |
| A3-04 | 用地结构与分期 | Land Use & Phasing | land-use-structure(.en) | 14 块/分期/建筑指标一致 | 通过 |
| A3-05 | 交通与蓝绿公共空间 | Mobility & Blue-Green Public Space | mobility-bluegreen(.en) | 23.8 km/13.39%/2.34% 一致 | 通过 |
| A3-06 | AI生态图谱与场景体系 | AI Ecosystem & Scenarios | 12 场景卡（中英 12 vs 12） | 六项治理一致 | 通过 |
| A3-07 | 包容性设计 | Inclusive Design | 6 画像 vs 6 personas | 四项机制一致 | 通过 |
| A3-08 | 指标体系与证据链 | Metrics & Evidence Chain | metrics-evidence(.en) | 12 行指标表一致 | 通过 |
| A3-09 | 实施运营与更新 | Implementation & Operation | JZ-01~06 vs JZ-01~06 | 运营四板块一致 | 通过 |
| A3-10 | 版权、来源与假设 | Copyright, Sources & Assumptions | 7 假设 vs 7 assumptions | 许可声明一致 | 通过 |
| A0-B01 | 总体概念与总览地图 | Overall Concept & Overview | site-overview(.en) | 指标带一致 | 通过 |
| A0-B02 | AI生态、场景与治理 | AI Ecosystem, Scenarios & Governance | 12 卡 + T1~T3 表（中英一致） | 治理/协同表一致 | 通过 |
| A0-B03 | 重点区域与公共空间 | Key Areas & Public Space | key-areas(.en) | 面积对照 + 组件库一致 | 通过 |
| A0-B04 | 实施运营与指标证据 | Implementation & Metrics Evidence | mobility-bluegreen(.en) + metrics-evidence(.en) | 12 项指标表一致 | 通过 |

## 4. 等价性边界声明

1. 本记录的“等价”指结构、数值、图件、表格与引用编号的逐项一致；两种语言的措辞由同一撰写流程产出，若评审发现任何措辞级偏差，按评审意见修复并更新本记录。
2. 中文页面的图件文件名不带语言后缀（如 site-overview.png），英文页面使用 site-overview.en.png，两者均由仓库根目录 `tools/generate_figures.py` 从同一几何与指标生成。
3. HTML 页面为离线静态文件，两种语言均不加载远程资源；`data-value` 均取自 metrics.json（已与 zh/en 页面比对一致）。
4. 本记录与 copyright_statement.md §4 的页目表互为依据；任何页面增删必须同步更新两处。

## 5. 复跑命令（任何语言或数据改动后必须重跑并更新本记录）

以下命令均在仓库根目录运行（工具位于仓库根目录 `tools/`，随分支一并提交，不进入提交包）：

```bash
python3 tools/recompute_metrics.py    # 指标复算（EPSG:4548）
python3 tools/generate_figures.py     # 5 图 × 中英文 PNG
python3 tools/generate_visual.py      # visual/index.html + index.en.html
python3 tools/generate_drawings.py    # A3 文册 + A0 展板（中英文）
python3 scripts/render_proposal_html.py submissions/happyGebron/jingzhang-platform --out submissions/happyGebron/jingzhang-platform/report/proposal.html
```
