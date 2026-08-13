# 方案迭代记录

## v1.1 - 2026-08-12

- 新增“轻体验城市”原则：城市 AI 默认安静、由人主动唤起、一次一景、最少数据、用完即忘。
- 明确选择加入、保持安静、匿名使用、拒绝、解释和会话删除六项体验权，并保留导视、价目、人工窗口和普通购票等非数字兜底。
- 将出行、饮食、购物和公共安全复核落实为 CEY-09 至 CEY-12 四张场景卡；每张卡写明触发、数据边界、保存期限、责任人、公共回报和停止条件。
- 新增机器可读协议 `visual/assets/light_experience_protocol.json`，同步更新中英文提案、指标、假设、合规矩阵、专业深度矩阵、静态网页、五张双语图件和四份 PDF。
- 升级清单契约至 manifest schema 0.2.0，并依据上游主分支最新规则重新执行严格校验。

### English summary

- Added the Light-Experience City principle: city AI remains quiet by default, appears only when invoked, handles one scene with minimum data, and forgets the session after use.
- Defined six experience rights—opt in, remain silent, anonymous use, refuse, explanation, and session erasure—while preserving signs, posted prices, staffed help, and ordinary ticketing.
- Implemented journey, dining, shopping, and public-safety review as cards CEY-09 to CEY-12, each with trigger, data boundary, retention, owner, public return, and stop condition.
- Added the machine-readable protocol `visual/assets/light_experience_protocol.json` and updated both proposals, metrics, assumptions, matrices, static websites, five bilingual figures, and four PDFs.
- Migrated the package to manifest schema 0.2.0 and reran strict validation against the latest upstream main branch.
