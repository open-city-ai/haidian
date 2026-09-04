# 互惠京张专业完整版与机器证据层整合说明

版本日期：2026-08-10

## 本次补完结果

本次按“重点区详细设计 → Agent.6 长期运营 → 逐要求证据闭合”的顺序补完。方案不再把京张理解成一条待建 AI 绿轴，而以已建公共空间的运行绩效为骨架，用产业验证、成果转化、真实采用、完整旅程、公共服务、文化记忆、气候安全和长期退出共同判断公共回报。

三个重点区已经形成可审查但不冒充法定设计的概念成果：一张 11.4 平方公里总体关系图；众智园、AI 原点、大钟寺三张分区详图；两条代表性剖面；18 个类型化试排建筑包络；15 个功能区/场景节点；6 条重点区内部概念接入关系；三组容积率与高度敏感性。所有新增几何均为 `agent_generated_design`、`existing_condition_claim=false`、`approval_status=not_approved`，只在 provisional key-area rectangle 内检验功能邻接、公共界面和容量。official 地块、建筑、权属、控规、道路、文保和市政证据到位后必须逐项替换。

拆改留采用 R-A-I 证据顺序：先 Retain，再 Adapt，最后才研究 Infill。当前 18 个包络全部标为等待逐栋调查；没有任何实际保留、改造、拆除或新建结论。概念试排建筑面积、覆盖率和 FAR 只作为 `conceptual_design_output/not_approved` 记录，不是现状总量、控规指标或建设承诺。

Agent.6 已从“年度活动”闭合为长期运营系统：母品牌“互惠京张”之下设“互惠四季”，由公开问题、受控验证、城市采用、公开复盘四季循环；互惠开发者网络设五类成员和四层治理；场景按八步从申请走到退出；三处地标与逐段公共路线设岗位、P0/P1/P2 SLA 和人民币 400 万—680 万元/年的低置信度轻资产运营情景；国际合作按触达、合格到访、问题匹配、正式申请、获权测试、独立验收、合格首单/合作、留存/回流八阶段记录。全部仍是 `PROPOSAL/not_approved`，不代表活动日期、伙伴、财政、采购或场地已经获批。

## 可独立复核的包内证据

- `sources.json`：98 条来源记录；公开资料只证明其明确支持的背景或规则，不自动升级为项目授权。
- `metrics.json`：179 项记录；unknown 基线保持 `value=null`，方案目标、闸门、情景和概念计算显式标为 `not_approved`。
- `geometry/`：9 组 GeoJSON；site 与 key areas 继续为 provisional/not official，新增建筑、节点和关系线为概念试排。
- `compliance_matrix.json`：23 个公告/任务书 requirement 对应 23 套不同的完整证据指纹，不再用少数泛化映射重复覆盖。
- `self_check.json`：原有检查与 17 项内容/可移植性检查共同区分“本包表达已经闭合”和“official/现场/审批仍未知”。
- `proposal.md` 与 `proposal.en.md`：标题深度、source/metric/data/depth/standard 引用多重集和 19 组图件一一对应。
- A3 中英文各 20 页，A0 中英文各 5 页；HTML 与 PDF 均由同一 proposal、metrics、GeoJSON 和本地图件生成。

原先指向 `work/research/*` 的 metric 证据路径已经改写为投稿包内 `proposal.md`、`report/narrative.md`、`metrics.json`、`sources.json` 或 GeoJSON；包外专题研究只作为工作过程，不再成为独立评审的必要依赖。三档三年轻资产运营情景和 Agent.6 年度地标运营情景保留精确 `CNY` 数值与排除项，均不构成财政承诺。

## 尚未完成且不得被展示替代的事项

仍需有权来源提供三层和三重点区 official polygon、控规与道路红线、逐栋建筑/产权/租约底账、轨道和公交接口、文保控制图件、河湖排水与 CSO、市政容量；还需多时段现场走读、真实使用者参与、运营台账、采购预算和专业专项审查。收到资料后应登记来源、日期、许可、坐标系与哈希，整体重算指标、矩阵、图件、HTML 和 PDF，不能只修改展示图。

本次工作没有发布 GitHub PR、推送远端、替组织方提交、承诺政府审批，亦未把 provisional 或 conceptual 成果写成法定结论。正式提交和实施仍需用户、有权机构与专业责任方另行决定。
