# 投稿包内验收参考 / Package-local acceptance reference

> 本文件只服务于 `submissions/xyh202131/jingzhang-ai-pilgrimage-belt/`，是投稿内可复制参考，不是仓库级 reusable template、公共 PR template 或维护者规范。复制到其他提交或后续 PR 时，不得继承任何 `[x]`。
>
> This file applies only to `submissions/xyh202131/jingzhang-ai-pilgrimage-belt/`. It is a package-local copy reference, not a repository-level reusable template, public PR template, or maintainer policy. No `[x]` may be inherited when it is copied into another submission or later PR.

## 方案叙事摘要 / Narrative summary

AI 朝圣·铁轨新生带 V2 将百年京张定义为一条可审计的 AI 公共创新生产线。小月河场景赋能翼提出真实问题，AI 原点社区共创，众智园验证，大钟寺发布与服务，中关村科技服务翼提供建议性的合规与转化支持，公众反馈和失败证据回流下一年度。

核心创新为 JZ-AIOS 四门制、可逆时空公园、开放基准走廊、可信叙事双螺旋和四季运营协议。空间证据包括 36 个用地单元、180 个体量原型、六门、九处公共空间、三服务区和十二个场景护照节点。全部节点仍处于 G0 概念状态，临时边界和所有设计不得用于审批或工程实施。

Jing-Zhang V2 treats the corridor as an auditable public AI innovation production line: problems enter from the Xiaoyue River wing, co-creation occurs in the AI Origin Community, validation occurs at Zhongzhi Garden, release and staffed service occur at Dazhongsi, and public feedback returns to the next annual cycle. All nodes remain G0 concepts; provisional geometry and design outputs are not approval or engineering evidence.

## 不可变验证证据 / Immutable validation evidence

| Field | Immutable value |
|---|---|
| `validated_commit` | `e71ff206800fbd154cbcb8a3b9b139e600f1bd97` |
| `validation_run_id` | `31273071020` |
| `validation_run_url` | [submission-validation Run 31273071020](https://github.com/open-city-ai/haidian/actions/runs/31273071020) |
| `validation_status` | `SUCCESS` |
| `validation_completed_at_utc` | `2026-08-08T18:55:03Z` |
| `validated_manifest_sha256` | `4b7fc901c06065872b496f8f481914ec9fc6044d23f248946793b17c3445f506` |
| `snapshot_generated_at_utc` | `2026-08-08T19:02:52Z` |

上述记录只证明 exact head `e71ff206…` 及其 manifest 原始 Git blob。任何后续提交都会使这些 `[x]` 对新 head 失去自动继承资格；新 head 是否通过，以 GitHub 上绑定该 head 的可信 check 为准。包内 Markdown 无法在不制造新提交的情况下自证“当前最终 commit”，因此这里保留上一份已完成验证的不可变指针，不把未来运行写成既成事实。

The record above validates only exact head `e71ff206…` and its raw manifest Git blob. A later commit cannot inherit these `[x]` automatically; the trusted GitHub check attached to that later head is authoritative. A package-local Markdown file cannot self-record its own final commit without creating another commit, so this section preserves the last completed immutable pointer and does not claim a future run as completed.

## 状态语义 / Status semantics

- `[x]`：已由上方 exact commit/run 快照或可复现命令验证，只适用于该不可变快照。
- `[ ]`：尚待人工决定、正式资料或现实测试；不自动等于本地 gate 失败。
- 任一内容文件变化后，必须把准备复制的所有 `[x]` 重置为 `[ ]`，重新核验 manifest 哈希并等待新 head 的可信验证。

- `[x]`: verified by the exact commit/run snapshot above or a reproducible command, and valid only for that immutable snapshot.
- `[ ]`: pending a human decision, official material, or real-world testing; it is not automatically a local-gate failure.
- After any content-file change, reset every checkbox intended for copying from `[x]` to `[ ]`, revalidate all manifest hashes, and wait for the trusted check on the new head.

## 已验证快照（仅对应 `e71ff206…`）/ Validated snapshot (`e71ff206…` only)

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

> 以下项目故意保持未勾选。开始下一次增量时，只复制本节并保持全部 `[ ]`；不得复制或继承上方任何 `[x]`、commit、run、manifest SHA 或生成时间。完成一项再勾选一项。
>
> The items below are intentionally unchecked. For the next increment, copy only this section and keep every item at `[ ]`. Do not copy or inherit any `[x]`, commit, run, manifest SHA, or timestamp above. Check each item only after completion.

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
