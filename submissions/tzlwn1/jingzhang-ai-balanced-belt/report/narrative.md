# 评审导读 / Reviewer Narrative

本文件是给人工评审的导读：本稿主张什么、如何核验、哪里仍是缺口。完整正文见 `../proposal.md`（中文）与 `../proposal.en.md`（英文），阅读版见 `proposal.html`、`proposal.en.html`。

This is a reading guide for human reviewers: what the proposal claims, how to verify it, and where the gaps remain. The full text is in `../proposal.md` and `../proposal.en.md`, with reading versions in `proposal.html` and `proposal.en.html`.

## 一句话主张 / The claim in one sentence

以京张遗址公园为公共空间主轴，用一条连续慢行主脊、三处重点区锚点和十个落位的 AI 场景节点，把 AI 产业需求转译为可核验的用地、交通、蓝绿与运营安排。

Using the Jing-Zhang heritage park as the public-space armature, one continuous slow-mobility spine, three key-area anchors and ten located AI scenario nodes translate AI industry demand into checkable land-use, mobility, blue-green and operating arrangements.

## 如何核验本稿的空间结论 / How to check the spatial conclusions

| 结论 | 核验方式 | 文件 |
| --- | --- | --- |
| 走廊面积约 11.4 平方公里 | 在 EPSG:4548 下复算站点边界面积 | `geometry/site_boundary.geojson` |
| 用地无缝闭合覆盖、无缝隙无重叠 | 运行仓库空间复核脚本；81 个地块并集等于边界 | `geometry/land_use.geojson` |
| 慢行主脊全线贯通 | 检查 13 条线要素的连通关系与 `road_class=greenway` | `geometry/roads.geojson` |
| 绿地率约 21%、公共空间率约 5% | 按图层面积除以边界面积复算 | `geometry/green_space.geojson`、`geometry/public_space.geojson` |
| 10 个场景节点均有坐标 | 按 `scenario_id` 逐一比对场景卡与节点 | `geometry/public_space.geojson` |
| 每项指标的公式与置信度 | 逐项查看 `formula`、`confidence`、`display_value` | `metrics.json` |
| 每项任务对应的证据 | 23 行任务各自指向章节、图层、指标、图纸、来源与假设 | `compliance_matrix.json` |

## 本稿刻意不给结论的地方 / Where this proposal deliberately stops

容积率、建筑高度、建筑密度、退线、道路红线与断面、轨道站点方案、拆改留分类、涉水工程可行性，全部保持待确认。原因是缺少正式红线、审定控规条件、权属、现状建筑调查与市政资料；在这些条件缺失时给出数值，只会制造虚假精度。八类缺口逐条登记在 `assumptions.json`，四类待确认范围登记在 `geometry/constraints.geojson`。

Floor area ratio, building height and density, setbacks, road boundary lines and cross-sections, station design, the retain-renovate-demolish classification and water-related feasibility all stay pending. Eight data gaps are registered in `assumptions.json` and four pending extents in `geometry/constraints.geojson`.

## 本次修订相对上一版的改动 / What changed in this revision

1. 几何从占位图形改为可用于设计判断的图层：81 个地块无缝分区、13 条道路网络、22 个绿地要素、17 个公共空间要素（含 10 个场景节点与 3 处地标）、13 个建筑组团、3 个分期与 4 类约束范围。
2. 指标置信度与边界真实状态对齐：面积与比例改为 low，并新增对外表达值与精度说明，去掉了与临时边界矛盾的高置信度表述。
3. 图件全部由几何重新绘制，共 14 张（中英各 7 张），按北中南三段并置解决走廊过于狭长的表达问题。
4. 字体改为 Noto Sans SC（SIL OFL 1.1），可随成果合法分发；HTML 以子集化 WOFF2 内嵌，PDF 嵌入静态字重。上一版 PDF 中的专有商业字体已全部移除。
5. 修复中文 A0 误用英文图件的语言映射错误，A0 改为三张图版并配要点栏，A3 改为封面、目录、分章正文与表格的完整版式。
6. 正文从复述任务要求改为给出设计主张，并补齐品牌系统、全球案例机制、三张产业测试场景卡、三处地标与组件库、八类使用者画像（含老年人、残障人士与照护者、儿童、低数字技能与夜间劳动者）、人工后备与故障降级机制、JZ-01 至 JZ-06 完整实施表与长期运营机制。
7. 合规矩阵 23 行改为各自指向实际证据，不再共用同一组章节与图层；假设台账从 1 条扩充为 8 条。
8. 版权台账逐项记录字体、图像、地图与几何、图标、代码、模板、数据与 AI 生成内容八类资产的来源与许可，并列出未清权即不使用的资产清单。

## 责任边界 / Responsibility boundary

本稿为概念建议与参考方案，不声称获得官方批准、审定控规、最终权属或实施保证。运营主体、协同接口与政策工具均为建议，不代表任何单位已经同意。参赛者对事实、来源、版权、空间数据、指标与表达负责。

This is a conceptual proposal. It claims no official approval, approved statutory plan, final ownership or implementation guarantee. Operators, coordination interfaces and policy instruments are proposals, not agreements.
