# 方案迭代记录

## v0.3 - 2026-08-10

### 中文

本次增量不改变已提交的空间图层、图件、图册或概念设计结论，只更新公开 Python engine 的实现状态与证据边界。

### 新增资格化证据

- 公开仓库固定到 `e4e815f01569f608acd7145b0b7fd2acb0fc874c`；qualification implementation 固定到 `518110263155b67295a2e31359cbb9a9cbdd0750`。
- 138 项 Python 3.12 测试通过；wheel/sdist 与全新环境 CLI export/replay 通过。
- 32 个 matched worlds × 13 arms = 416 runs；bounded export 与完整重放通过。Manifest SHA-256：`972383e823db3cace81b37764907a7e95b68ede4422d9f38554350ce5fe04b35`。
- 64 个 matched worlds × 13 arms = 832 runs；bounded export 与完整重放通过。Manifest SHA-256：`b5662bb670132178ce59feaa9d10562ea7aeb89c6ebaa9fe67f9212900b52b90`。
- 8-world policy sweep 与六场景 stress canary 均完成 source-pinned bounded replay。

### 当前解释

64-world synthetic qualification 中，P1 accessibility 与 P2 environment 的平均方向有利；P3 rent surrogate 平均恶化且 50/64 worlds 受损，P3 unemployment 也高于 P0。P0–P3 在声明的 13 个 objectives 下均为 non-dominated，因此没有“综合政策全面改善”的结论。

这些结果不使用真实海淀 OD、交通容量/计数、建筑、地块、权属、企业、工资、租金、环境、公共服务或公共财政数据。它们不是海淀校准、预测、成本估算、工程建议、实施批准或政府认可。随包 `smoke-v1` 保留为初始 intake artifact，不被重写或重新标记。

### English

This increment does not alter the submitted spatial layers, figures, drawings or concept-design conclusions. It updates only the implementation status and evidence boundary of the public Python engine.

### Added qualification evidence

- Public repository pinned to `e4e815f01569f608acd7145b0b7fd2acb0fc874c`; qualification implementation pinned to `518110263155b67295a2e31359cbb9a9cbdd0750`.
- 138 Python 3.12 tests passed; wheel/sdist and fresh-environment CLI export/replay passed.
- 32 matched worlds × 13 arms = 416 runs completed bounded export and full replay. Manifest SHA-256: `972383e823db3cace81b37764907a7e95b68ede4422d9f38554350ce5fe04b35`.
- 64 matched worlds × 13 arms = 832 runs completed bounded export and full replay. Manifest SHA-256: `b5662bb670132178ce59feaa9d10562ea7aeb89c6ebaa9fe67f9212900b52b90`.
- An 8-world policy sweep and six-scenario stress canary both completed source-pinned bounded replay.

### Current interpretation

In the 64-world synthetic qualification, the mean directions for P1 accessibility and P2 environment were favourable. P3 worsened the mean rent surrogate with 50 of 64 worlds harmed, and P3 unemployment was also higher than P0. P0–P3 were all non-dominated across the 13 declared objectives, so there is no claim that the integrated policy improves every outcome.

No observed Haidian OD, transport capacity/count, building, parcel, ownership, firm, wage, rent, environment, public-service or public-finance dataset was used. This is not Haidian calibration, forecasting, cost estimation, engineering advice, implementation approval or government endorsement. The bundled `smoke-v1` remains the original intake artifact and is neither rewritten nor relabelled.
