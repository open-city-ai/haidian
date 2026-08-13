# 方案迭代记录

## v8.8 - 2026-08-13
- 新增 4 个机器可读资产契约（均从本包 proposal 内容派生，双语字段）：`visual/assets/scenario-cards.json`（12 张场景卡：坡度分级/折返条件/成功指标）、`visual/assets/brand-identity.json`（Logo 方向与六色号系统）、`visual/assets/component-library.json`（6 类街道组件及约束）、`visual/assets/regional-collaboration.json`（五方区域协同任务/要素/回路/主体）。
- `machine_readable_contract_count` 更新为 6（2 个既有治理契约 + 4 个新增资产契约）；全部契约带概念边界声明（非部署/非绩效/非官方承诺）。
- 迭代记录改写为中性描述。不新增 geometry、正式指标、许可或现场绩效主张；provisional 边界精度提示与复算清单保留。

## v8.7 - 2026-08-13
- 完整继承 v8.5 技术底座：18 条官方一手源登记（publisher / published_date / accessed_date / url / authority_level / used_for_zh / not_usable_for_zh 全套溯源字段）、一页执行摘要与产业事实锚点（2026 中关村论坛年会官方口径）、机器可读治理契约（switchback-gate.json 折返状态机、delivery-matrix.json 六行动包）、评审问答表。
- 中英证据标记对齐：英文 References 与中文同集合（22 条），四季节奏、用地、公共空间、制度原型、游线三幕、否决权与设计依据段补齐缺失标记；双向 ID 集合为空。
- agent/assumptions/sources/metrics 的 package_id 与 recomputed_from 统一为 ai-jingzhang-corridor-v88。

## v8.6 - 2026-08-13
- v8.4 内容以单根目录重新提交（53 文件全新增），包内标识统一。
- 中英标记对齐 18 处 + 注册表补齐 3 metric / 2 assumption。

## v8.5 - 2026-08-12
- 一页执行摘要 + 产业事实锚点 + 评审问答表；18 条官方一手源登记（政府工作报告 / 街区控规通告 / 市科委 / 市园林绿化局等）。
- 机器可读治理契约：折返状态机 switchback-gate.json、行动包矩阵 delivery-matrix.json；machine_readable_contract_count 指标登记。

## v8.4 - 2026-08-12
- 叙事制度条款化：折返点制度条款 R1/R2/R3、回授门三步、坡度分级准入、K 标版本链。
- public_space 从 4 个小广场重建为 73.37 ha 连续折返验证带（3 段折返公共带 + 4 广场 + 12 节点），metrics 以 EPSG:4548 全量重算。

## v8.3 - 2026-08-12
- 移除 visual 3D 演示（Three.js/WebGL），保障评审 headless 截图可渲染；保留封面、中英概念视频与字幕文字稿。

## v8.2 - 2026-08-12
- 叙事深化：人字三义、回授门、四时节律与否决权程序具体化。

## v8.1 - 2026-08-11
- 折返治理协议核心制度确立；资产台账、国际案例对标、区域协同、品牌规范、公共参与机制与 provisional 警示完备；中英双语契约（proposal.en.md 及 HTML/A3/A0 英文副本）落地。