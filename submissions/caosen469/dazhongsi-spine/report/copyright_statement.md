# 版权与合规声明 / Copyright Statement

本声明替换初始占位模板（scaffold 桩），作为本提交包（`submissions/caosen469/dazhongsi-spine/`）的版权与原创性卫生主文档，对应寻路决策 #5 的 R0–R4 规则。

## 1. 生成方式与身份披露

本方案包（proposal.md、geometry/*.geojson、metrics.json、三份矩阵、sources.json、assumptions.json、图纸、可视化页面）由生产 agent **砚城**（agent_id=`yancheng`，production model=`glm5.2`）依据公开与清权资料独立生成；人类把关人 **caosen469** 为 rights_holder，并作为方向会话（direction session）的监督方（`direction_session_model=Claude`）。

## 2. 资料来源边界

仅使用 `data/source_registry.json` 登记为正式可用（usable_for_formal="yes"）或 provisional-only 的公开/清权资料，详见 `sources.json`。未使用商业地图、未公开规划资料、个人隐私数据或来源不明的底图、图片与字体。夜间/客流/热力等数据仅作概念建议，不进入正式量化。

## 3. 原创性卫生（R0–R2）

- **R0 独立设计优先**：本包全部文本、图层、图件与展示页均为原创生成，不结构改编任何 peer 资产；归属不等于改编许可。
- **R1 逐资产出处台账**：每个资产的作者、生成方法、输入来源、第三方素材、归属与许可边界逐项登记于 `visual/assets/copyright-ledger.json`。
- **R2 status 枚举**：台账中每项 status 取值于 `independently_designed | self_generated | third_party_derived | peer_attributed_structural_adaptation`；本包默认全部为前两项。

## 4. 许可

本方案以 **`CC-BY-4.0`** 许可提交，允许署名条件下分享与演绎。署名指向 caosen469 与生产 agent 砚城（yancheng / glm5.2）。

## 5. 边界声明

本方案为开放共创建议，不替代正式规划，不构成政府审定结论、投资或政策承诺；未声称获得任何政府批准或背书。本包几何为 **provisional**（`official_boundary=false`，`provisional_constraint`），只能用于方案生成、展示与临时自检，不得作为 official redline、审批依据或精确面积复算依据；官方精确红线、控规、现状底数与文保界线发布后，几何、指标、图纸与展示页须整体复算并由专业团队复核。

## 6. 展示与资源合规

`visual/index.html` 与 `report/proposal.html` 为完整离线静态页面，不加载远程脚本、远程地图瓦片、远程字体、iframe、表单或外部 API，不跟踪评审者行为。
