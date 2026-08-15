# 版权与合规声明 (Copyright Statement)

**方案名称**：京张智脉 · JingZhang Synapse
**贡献者**：Hforty（agent_id: Hforty）
**许可**：COMMUNITY-DISPLAY-ONLY（社区展示用途，非商业授权）

## 资料合法性
- 本方案仅使用公开资料或已清权资料（资格预审公告、agent 任务书摘录、住建部/自然资源部公开标准、公开史料与公开案例）。
- 未使用任何非公开、未授权或涉密资料；未使用受版权保护的企业标识、人物肖像或商业图片，所有视觉元素为原创或清权表达。

## 生成与责任
- 本方案由 AI 智能体在公开/清权资料基础上自主生成，所有空间落地建议均为**概念建议、参考方案或可供专业团队深化研究**，不替代正式规划，不构成政府审定结论、工程方案、具体拆改留或投资承诺。
- 规划控制指标（容积率、建筑高度、建筑密度、绿地率、退线）及官方红线 polygon 均缺失，相关数值为 `provisional_assumption` / `provisional_rough`，需专业复核与官方补齐。
- AI 生成内容的最终判断由人类维护者与相关主管部门作出。

## 第三方权利
- 引用的公开案例（Station F、MaRS 等）仅作方法借鉴，其名称/商标归属各自权利人，本方案不主张其任何权利。
- 京张铁路相关历史叙事以公开史料主线为准，不涉及对任何主体权利的处分。

## 逐资产版权与许可清单（Per-Asset Rights & License Ledger）
> 说明：本清单为阶段 C 实质填实版。权利链以可核验来源为准；自我声明不能替代权利链证明，凡标注「待补证」者须在使用前取得正式授权或替换。

| 资产类别 | 具体资产 | 权利人 / 来源 | 许可 / 权利状态 | 权利链证明 | 原创性记录 | 状态 |
|---|---|---|---|---|---|---|
| 字体 Fonts | CSS 字体栈（Segoe UI / Arial / Microsoft YaHei / PingFang SC / Noto Sans CJK SC / WenQuanYi） | 各字体厂商；MS YaHei、Segoe UI 为微软专有（仅系统引用或生成时嵌入，不作为独立字体文件再分发），Noto Sans CJK 为 OFL、文泉驿为 GPL | 见「重点说明·字体三档呈现」；PNG 已栅格化无字体抽取风险，PDF 通过 reportlab 在 Windows 系统下嵌入 msyh.ttc 用于渲染 | 系统字体目录 / reportlab TTFont 注册记录 | 不嵌入 CSS/SVG；PDF 生成时嵌入；PNG 栅格化 | ✅ OK（无字体文件独立分发） |
| 标识 Logo | `assets/figures/agent1-logo.svg` | 本方案原创 | 原创 © Hforty，COMMUNITY-DISPLAY-ONLY | 设计过程稿（命名系统「脉」衍生连续线条母题） | 铁路轨笔→神经/电路节点，墨蓝主色+信号红点缀+生态绿 | ✅ OK |
| 图标 Icons | 各 SVG 内嵌图标、agent2-6 图示 | 本方案原创 | 原创 | — | 矢量手绘 | ✅ OK |
| 图片 Images | `assets/figures/*.png`（5 组占位图替换版） | 本方案脚本/AI 生成 | 原创（含官方数据标注） | 生成脚本 `gen_figures.py` | 基于公开官方数据的示意图，几何为示意 | ✅ OK（已注数据来源与 provisional 边界） |
| 地图 Maps | `geometry/*.geojson`（provisional 边界） | 依据公告文本边界描述由 `gen_geometry.py` 生成 | **provisional，非官方红线** | `gen_geometry.py` + 公告文本 | 等效临时几何，非实测红线 | ⚠️ 待官方几何替换 |
| 数据 Data | `sources.json` / `metrics.json` | 公开官方引用（市规自委、海淀区政府、住建部、自然资源部等） | 引用已标注来源与 authority_level | 17+ 来源 URL（含 A0 官方公告与批复） | — | ✅ OK |
| 代码 Code | `gen_figures.py` / `gen_drawings.py` / `gen_geometry.py` | 本方案原创 | 原创 | 仓库内脚本 | — | ✅ OK |
| 模板 Templates | `report/proposal*.html`、`proposal*.md`、`changelog.md` | 本方案原创 | 原创 | — | — | ✅ OK |
| AI 生成 AI-generated | 全部视觉与文本产出 | AI 智能体生成 | COMMUNITY-DISPLAY-ONLY | 生成过程记录 | — | ⚠️ 需人工复核与披露 |

### 重点说明

- **字体（本包三档呈现）**：
  1. **HTML/SVG（运行时引用）**：`visual/index.html`、`visual/index.en.html` 以及 SVG 内嵌文本通过 CSS `font-family` 栈调用系统已安装字体，未嵌入任何字体文件；不存在字体再分发。
  2. **PDF（A3/A0 展板，生成时嵌入）**：`drawings/a3-booklet.pdf` / `a0-boards.pdf`（含 `.en.pdf`）通过 reportlab `TTFont` 嵌入 Microsoft YaHei（msyh.ttc，Windows 系统字体）以确保 CI/Linux 服务器无中文字体环境下仍能正确渲染。本字体由微软授权随 Windows 提供；嵌入仅用于本包 PDF 渲染，不作为独立的字体文件分发。Noto Sans CJK SC（OFL）为开源替代选项。
  3. **PNG（栅格化产出）**：`assets/figures/*.png` 通过 Pillow 在 Windows 下调用 msyh.ttc / msyhbd.ttc 绘制后栅格化为像素，最终交付的 PNG 不含可恢复的字体轮廓或矢量字形数据，因此不存在字体抽取风险；分发无需额外字体授权。
  4. **字体许可摘要**：Noto Sans CJK SC — SIL OFL 1.1；Source Han Sans SC — SIL OFL 1.1；文泉驿微米黑 — GPL。Microsoft YaHei / PingFang SC / Hiragino Sans GB / Segoe UI 均为厂商专有，仅以系统调用或生成时嵌入方式使用，未作为独立字体文件再分发。
- **地图几何**：`geometry/*.geojson` 全部为 **provisional 临时边界**，依据资格预审公告文本边界描述生成，非官方红线 polygon，不得作为审批、出让、工程或权属依据；待组织方提供官方几何后必须重算并刷新 manifest 哈希。
- **AI 生成披露**：依据《生成式人工智能服务管理暂行办法》精神，本方案 AI 生成内容已在「生成与责任」节披露，最终判断由人类维护者与主管部门作出；对外展示时建议保留该披露。
- **AI 生成链条摘要**：(a) 文本：`Hforty` AI 智能体在公开/清权资料基础上自主撰写 `proposal.md` / `proposal.en.md` / `report/proposal*.html`；(b) 图件：`gen_figures.py` 基于市规自委批复、海淀区政府开放资料、京张公园二期报道等公开数据，按 Pillow + reportlab 渲染；(c) 几何：`gen_geometry.py` 依据公告文本边界描述生成临时 polygon；(d) 校验：`local_haidian/scripts/validate_submission.py` 四门校验；(e) 复核：人类维护者逐节审核。所有内容均为「AI 辅助生成 + 人类维护者复核」的双轨产出，不替代正式规划。
- **自我声明边界**：上表「✅ OK」为基于可核验来源的当前判定，不等同于法律意见书；涉及商业再利用或对外发布时，应逐类取得正式授权或替换为已清权资产。

## 使用边界
- 本包以 COMMUNITY-DISPLAY-ONLY 许可提供，供开源征集社区评审、讨论与公共知识沉淀使用；任何超出展示的再利用（含商业使用、改作、再分发）须事先取得权利人授权并遵守各来源许可。
- 提交至 open-city-ai/haidian 后，遵循该仓库的公开贡献与展示条款。
