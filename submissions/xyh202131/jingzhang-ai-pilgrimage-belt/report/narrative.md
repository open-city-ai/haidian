# 方案叙事摘要与验收清单 / Narrative and acceptance checklist

AI 朝圣·铁轨新生带 V2 将百年京张定义为一条可审计的 AI 公共创新生产线。小月河场景赋能翼提出真实问题，AI 原点社区共创，众智园验证，大钟寺发布与服务，中关村科技服务翼提供建议性的合规与转化支持，公众反馈和失败证据回流下一年度。

核心创新为 JZ-AIOS 四门制、可逆时空公园、开放基准走廊、可信叙事双螺旋和四季运营协议。空间证据包括 36 个用地单元、180 个体量原型、六门、九处公共空间、三服务区和十二个场景护照节点。全部节点仍处于 G0 概念状态，临时边界和所有设计不得用于审批或工程实施。

Jing-Zhang V2 treats the corridor as an auditable public AI innovation production line: problems enter from the Xiaoyue River wing, co-creation occurs in the AI Origin Community, validation occurs at Zhongzhi Garden, release and staffed service occur at Dazhongsi, and public feedback returns to the next annual cycle. All nodes remain G0 concepts; provisional geometry and design outputs are not approval or engineering evidence.

## 状态语义 / Status semantics

- `[x]`：已由当前 Git/manifest 快照或可复现命令验证。
- `[ ]`：尚待人工决定、正式资料或现实测试；不自动等于本地 gate 失败。
- 任一内容文件变化后，必须重新核验本清单与 manifest 哈希。

- `[x]`: verified by the current Git/manifest snapshot or a reproducible command.
- `[ ]`: pending a human decision, official material, or real-world testing; it is not automatically a local-gate failure.
- Revalidate this checklist and all manifest hashes after any content-file change.

## 当前验收快照 / Current acceptance snapshot

### 范围与完整性 / Scope and integrity

- [x] 变更只位于 `submissions/xyh202131/jingzhang-ai-pilgrimage-belt/`。
- [x] `package_type=professional_design_package` 且 `package_state=ready_for_review`。
- [x] manifest 登记 48 个路径，47 个非自引用内容文件均有 SHA-256。
- [x] 权利台账覆盖 48 个 manifest 路径，无漏项、未知路径或重复归组。
- [x] 中文主稿、英文展示稿及对应离线 HTML 的关键数字与边界一致。

- [x] Changes stay inside `submissions/xyh202131/jingzhang-ai-pilgrimage-belt/`.
- [x] `package_type=professional_design_package` and `package_state=ready_for_review`.
- [x] The manifest declares 48 paths and SHA-256 values for all 47 non-self-referential content files.
- [x] The rights ledger covers all 48 manifest paths with no missing, unknown, or duplicate grouping.
- [x] Key numbers and boundaries align across the Chinese report, English display copy, and paired offline HTML.

### 自动化 gate / Automated gates

- [x] 严格 advisory score 为 8/8，`needs-work=0`、`missing=0`。
- [x] deterministic、spatial、visual 与 professional review 均为 PASS。
- [x] 综合 self-check 为 `ok=true`、`review_status=formal-review-ready`。
- [x] participant preflight 无目录外文件和内容 blocker。
- [x] 47 个内容文件哈希与暂存/提交 Git blob 逐项一致。
- [x] `git diff --check` 无空白错误。

- [x] Strict advisory score is 8/8 with `needs-work=0` and `missing=0`.
- [x] Deterministic, spatial, visual, and professional review gates pass.
- [x] Combined self-check reports `ok=true` and `review_status=formal-review-ready`.
- [x] Participant preflight reports no out-of-scope file or content blocker.
- [x] All 47 content hashes match staged/committed Git blobs.
- [x] `git diff --check` reports no whitespace error.

### 证据边界 / Evidence boundaries

- [x] 场地与三处重点区保持 provisional，不冒充官方红线或精确面积依据。
- [x] 25 条来源均记录可用与禁用范围；已完成刷新审计数保持为 0。
- [x] 全部 AI 场景保持 G0，不声明已批准、已建设、已运行或已获机构承诺。
- [x] 非 AI 通道、人工兜底、申诉、停止与退役字段只证明设计覆盖，不冒充现场效果。
- [x] 权利总体状态保持 `not_fully_cleared`，独立逐文件清权审计完成数为 0。

- [x] The site and three key areas remain provisional and are not represented as official redlines or precise-area evidence.
- [x] All 25 sources record permitted and prohibited uses; completed refresh audits remain at 0.
- [x] Every AI scenario remains at G0, with no claim of approval, construction, operation, or institutional commitment.
- [x] Non-AI access, human fallback, grievance, stop, and retirement fields prove design coverage only, not field performance.
- [x] Overall rights status remains `not_fully_cleared`, with 0 completed independent file-level clearance audits.

## 仍需人工或外部完成 / Human or external completion still required

- [ ] 维护者完成人工内容、视觉与版权判断并决定是否合并/发布。
- [ ] 正式边界、控规和现状资料到位后完成差异比对与全量复算。
- [ ] 完成许可条款、字体、OSM 衍生数据库、工具输出、Logo/商标和可编辑源的独立权利审计。
- [ ] 完成适用的规划、建筑、交通、市政、景观、消防、铁路安全、无障碍、数据安全和法律审查。
- [ ] 在获批、限时、限域和有责任主体的条件下完成现场或受控测试。

- [ ] Maintainers complete human content, visual, and rights judgment and decide whether to merge or publish.
- [ ] After official geometry, controls, and existing-condition material arrive, complete difference analysis and full recalculation.
- [ ] Complete independent review of license terms, fonts, OSM-derived databases, tool outputs, logo/trademarks, and editable sources.
- [ ] Complete applicable planning, architecture, transport, municipal, landscape, fire, railway-safety, accessibility, data-security, and legal review.
- [ ] Complete field or controlled testing only under approved, time-bounded, place-bounded, and accountable conditions.

## 下次 PR 可复制模板 / Copyable checklist for the next PR

> 以下项目故意保持未勾选。开始下一次增量时复制到 PR 描述，完成一项再勾选一项。
>
> The items below are intentionally unchecked. Copy them into the next PR description and check each item only after completion.

- [ ] 从最新 `origin/main` 创建独立分支，确认前一个投稿 PR 已合并或关闭。
- [ ] 只实现一个可命名、可验证的小增量，只修改自己的投稿目录。
- [ ] 同步中文主稿、英文展示稿和对应离线 HTML。
- [ ] 不新增虚构审批、合作方、资金、建设、运行、测试或清权结果。
- [ ] 内容先暂存；从暂存 Git blob 计算 SHA-256；manifest 最后暂存。
- [ ] 运行 strict score、deterministic、spatial、visual、professional、self-check 与 participant preflight。
- [ ] 提交后复核 committed Git blob 哈希；fork 推送 dry-run 通过。
- [ ] 创建 Ready PR（非 Draft），确认文件范围、无冲突和可信 `submission-validation`。

- [ ] Branch from the latest `origin/main` after the previous submission PR is merged or closed.
- [ ] Implement one named, verifiable increment and modify only the contributor-owned package.
- [ ] Synchronize the Chinese report, English display copy, and paired offline HTML.
- [ ] Add no fabricated approval, partner, funding, construction, operation, test, or rights-clearance result.
- [ ] Stage content first, calculate SHA-256 from staged Git blobs, and stage the manifest last.
- [ ] Run strict score, deterministic, spatial, visual, professional, self-check, and participant preflight gates.
- [ ] Reverify committed Git blob hashes and pass the fork push dry-run.
- [ ] Open a Ready PR (not Draft) and confirm file scope, mergeability, and trusted `submission-validation`.

## 复现命令 / Reproduction commands

```powershell
$pkg = 'submissions/xyh202131/jingzhang-ai-pilgrimage-belt'
python scripts/score_submission.py "$pkg/proposal.md" --strict --json
python scripts/spatial_review.py $pkg --json
python scripts/visual_review.py $pkg --json
python scripts/professional_review.py $pkg --json
python scripts/self_check_submission.py $pkg --pr-author xyh202131 --json
python scripts/participant_preflight.py $pkg --pr-author xyh202131 --json
git diff --check
```

若 `origin` 指向只读公共仓库，对可写 fork 另行执行 `git push --dry-run fork HEAD:<branch>`。

If `origin` is the read-only canonical repository, separately run `git push --dry-run fork HEAD:<branch>` against the writable fork.
