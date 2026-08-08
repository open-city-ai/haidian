# 方案迭代记录

## v4.0 - 2026-08-08

自评改进 + 必交付物补齐 + 英文对应件

- 补齐 agent.3 必交付物：场景-空间-运营映射矩阵（scenario_space_operation_matrix）——12张场景卡逐张映射到 GeoJSON 空间锚点、运营主体、NG-6 六步。
- 深化 Logo/视觉识别系统：主图形、色彩体系（含 WCAG-AA 对比度）、字体方向、应用场景、延展规则、禁止事项。
- 深化文化导视/符号系统：五段故事节点各配独立导视类型、符号语言、材质方向、无障碍要求。
- 生态图谱补齐四层结构图（标准层→要素层→节点层→场景层）。
- 公共空间组件库细化为6个组件表（模数/功能/无障碍）。
- 指标精度舍入：provisional 派生面积舍入到 100 m²、比率舍入到 4 位（避免虚假精度）。

- 补充英文对应件
- re-trigger CI after ready_for_review：proposal.en.md + proposal.en.html + figures.en.png + drawings.en.pdf + visual/index.en.html。

## v3.0 - 2026-08-08

来源核验 + 同侪学习 + 可实施性深化 + 致谢

- 新增致谢章节：感谢 5 个已合并方案（PR #458 to-real/on-time-city、#469 packbacker-s/civic-craft-line、#377 wms2537/city-model-commons、#405 knqiufan/listening-line、#468 JamisonDong/capability-line）的机制思路启发，逐项说明借鉴内容与本方案的转化方式。

- 修正历史叙事：1435mm 标准轨距为国际标准（Stephenson/UIC 1937），京张铁路采用而非定义；詹天佑真正的工程创新为青龙桥"人"字形折返线与竖井法隧道。来源：Wikipedia/国家铁路局/Chinaculture.org。
- 补齐 7 个全球案例逐项来源（NIH/斯坦福/Centre for Cities/深圳政府/东急/JTC/阿姆斯特丹市政府）。
- 补齐区域协同对象来源（未来科学城/怀柔科学城/经开区/京津冀/遗址公园沿线——均来自政府或学术官网）。
- 同步 upstream main（54 commit），确认资料包（brief/data/scripts/templates/skills/schema）无变更。
- 学习同侪方案（to-real/on-time-city、packbacker-s/civic-craft-line、wms2537/city-model-commons）的可实施性与治理契约做法。

## v2.0 - 2026-08-08

回应 AI Agent 评审意见 (59/100 → 修复)

- 修复 A3/A0 PDF 缺字（注册中文 TTF 字体，消除黑方块）——最高优先级 readiness blocker。
- 修复 5 张主图标签重叠/裁切（几何居中专用区 + 侧栏信息卡布局）。
- 12 张场景卡扩为完整卡（数据流/模型边界/运营主体/KPI/回退/事故响应/生命周期成本）。
- 新增区域协同章节（北纬社区/未来科学城/怀柔科学城/经开区/京津冀）。
- 补齐 agent 交付物：生态图谱、荣誉展示体系、公共空间组件库、文化导视/空间故事线、国际传播文案、长期运营治理。
- 分期三块面改为 6 项目可执行组合（前置条件/主体/成本/审查/KPI/停止回滚/运营责任）。
- 新增公共利益与 AI 治理章节（无障碍/低数字素养/非数字替代/数据最小化/儿童保护/申诉/人审可回滚）。
- 建筑密度标注为"代表性足印样本指标"、confidence=low。
- 外部事实来源台账 + 版权台账（字体/图像/代码许可明细）。

## v1.0 - 2026-08-08

初始正式提交

- 核心概念：京张新轨 / The New Gauge——为 AI 原生城市定下新轨距。
- 一轴三轨两翼空间结构（基准轨/生活轨/产业轨 + 两翼道岔）。
- 9 个 GeoJSON 图层（拓扑安全：零间隙/零重叠/全覆盖）。
- 29 项指标（EPSG:4548 复算，FAR/控规标 unknown）。
- 5 张专业图 + A3/A0 PDF + 离线 visual/index.html。
- 23 项合规矩阵 + 5 标准 + 15 深度项。
- self_check 全 PASS，CI submission-validation: success。
- PR #463 已合并。
