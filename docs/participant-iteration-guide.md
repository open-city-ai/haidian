# 参与者迭代指南

> 本指南由参赛者 anselasimov-web 及其 AI 代理维护,基于对 200+ 个真实 CI 失败案例的诊断经验与当前 main 的逐项实核。所有命令可复制执行;以维护者与官方 CI 的最终判定为准。

# PR #1044《参与者迭代与轻量参与指引》上篇重写：过时内容修订（PART 1）

> 执行人：参与者（GitHub: anselasimov-web） | 执行时间（UTC）：2026-08-18
> 原稿基准：PR #1044 head `d110958c4a88f481bcfff638c0516b21dc940065`（`docs/participant-iteration-guide.md`，266 行）
> **本次实核基准：当前 `main` = `9113d62cce44847d71a1f5b6f8e606f34f84dadf`（committed 2026-08-18T15:13:41Z，
> "Merge pull request #3306 from amberplay/..."）**——比 `contrib/ASSETS-CHECK-20260814.md` 的基准 `bb2a44c4`（2026-08-16）
> 又新了约 2 天、约百余次提交，本文对全部 6 处必改逐条在这个更新的基准上重新读源码复核，未发现与
> ASSETS-CHECK 结论相悖之处（详见各节"实核依据"）。
> 范围：只覆盖 ASSETS-CHECK 的 B-1～B-6（6 处"已经过时，必须改"）。C-1～C-7（"完全缺失，建议补"）
> 不在本次范围内，留给下篇（新增章节）处理。
> 本文件只产出修订后的章节文本，**未修改仓库、未推送、未评论**。

---

## 索引：6 处必改 → 原稿位置 → 本文件对应节

| # | 必改内容 | 原稿位置（head `d110958c`） | 本文件对应节 |
| --- | --- | --- | --- |
| 1 | refresh_submission_manifest.py 用法 + 前置条件 + `--mark-self-checked` 串联顺序 | §3.2 全节（第 155-167 行） | 第一节 |
| 2 | 并发模型改 per-PR `cancel-in-progress: true` | §1.2 第 2 条（第 41 行）+ §5 表（第 255 行） | 第二节 |
| 3 | CRLF 根因已由 git blob 哈希修复，改写现状 + 双保险建议 | §5 表 CRLF 行（第 258 行） | 第三节 |
| 4 | 清理 #953/#585/#959/#1043/#1064 五个已 closed 提案引用 | §3.2 第 164 行 | 并入第一节 |
| 5 | `is_review_queue_candidate` 改名别名豁免 | §1.1 第 20 行 | 第四节 |
| 6 | bootstrap 参数变更（sparse 集合、REQUIRED_FILES） | §4.1（第 227 行、第 230 行附近） | 第五节 |

（第 4 项与第 1 项共享同一段原文，故合并撰写；额外顺手修正了 §1.1 中一处与本次改动同句、可用同一次源码核实证伪的旧措辞，见第四节末尾说明。）

---

## 第一节：§3.2 全节重写（对应必改 #1、#4）

### 原稿位置

`docs/participant-iteration-guide.md` §3.2「已定稿包：不要手工伪装成 scaffold」，head `d110958c` 第 155-167 行。核心断言：
"当前 `main` 的 `scripts/finalize_submission.py` ……没有稳定的'再次定稿'接口"，并列出
"Issue #953、PR #585、#959、#1043、#1064、#1071" 六个"尚未合并的实现提案"。

### 实核依据（当前 main = `9113d62c`）

- `scripts/refresh_submission_manifest.py` **已存在于 main**（`gh api repos/open-city-ai/haidian/contents/scripts/refresh_submission_manifest.py?ref=9113d62c` 返回 200，4630 字节）。落地 PR：[#1871](https://github.com/open-city-ai/haidian/pull/1871)「Add safe manifest refresh for ready packages」，`state=MERGED`，`mergedAt=2026-08-11T16:18:34Z`。
- 该工具内部调用 `finalize_submission.manifest_digests()`（`refresh_submission_manifest.py:16`），后者调用 `git_blob_sha256()`（`finalize_submission.py:40,93`），与 `validate_submission.py:22,1583` 的校验路径共用同一套"临时 Git index + `git add` + `git show :<path>`"机制（`scripts/git_blob_hashes.py` 全文已读，2988 字节）。
- `finalize_submission.py:115` 的 `package_state must be scaffold before finalization` 报错逻辑**未变**，仍只服务首次晋级；`refresh_submission_manifest.py:27` 反过来要求 `package_state == "ready_for_review"`，两个工具互斥、边界清楚。
- 五个原引用的实现提案现状（`gh api graphql` 逐一查询，2026-08-18）：

  | 编号 | 类型 | 状态 |
  | --- | --- | --- |
  | #953 | Issue | CLOSED 2026-08-14T21:06:11Z |
  | #585 | PR | CLOSED（未合并）2026-08-14T18:05:25Z |
  | #959 | PR | CLOSED（未合并）2026-08-14T18:05:20Z |
  | #1043 | PR | CLOSED（未合并）2026-08-10T03:46:53Z |
  | #1064 | PR | CLOSED（未合并）2026-08-14T09:09:18Z |

  五个全部 closed 且均未合并——这条能力线最终不是靠它们中任何一个落地的，而是由 PR [#2522](https://github.com/open-city-ai/haidian/pull/2522)「Fix manifest refresh for missing declared hashes」（`mergedAt=2026-08-14T09:06:59Z`）把 Git-blob 哈希机制的核心提交（`0d9f733f3` fix: hash manifests as pending Git blobs、`5ca37f236` fix: contain pending blob hash paths、`6433ca349` fix(tooling): fail closed on unstaged manifest paths）整合进 main 补完的；4 分钟后 Issue [#1062](https://github.com/open-city-ai/haidian/issues/1062) 被关闭（`closedAt=2026-08-14T09:10:18Z`）。canonical 参照应改指 **#1871（刷新工具）+ #1062（CRLF 根因追踪，含完整复现与修复讨论）+ #2522（实际落地提交）**。
- `.gitattributes`（`ref=9113d62c`，blob `95703dd72`）内容仍只有 `*.pdf binary` 一行，**没有**加 `* text=auto eol=lf`——维护者 CocoSgt 在 #1062 评论（2026-08-09T18:26:21Z）明确说明"暂不加入……避免把可能重写工作树的政策变更和缺陷修复捆绑"。这条现状确认了"双保险建议"仍然必要（见第三节）。
- "CRLF 工作区死循环"的具体现场证据：Issue #1062 评论区 `dysprosium231`（2026-08-11T02:42:05Z）记录了一个包已经 PASS 并推送后，因后续 `git rebase upstream/main` 把工作区文本重写成 CRLF（`core.autocrlf=true`），导致自检突然重新报 `sha256 mismatch`——内容一个字节没动；`147228`（2026-08-11T04:22:49Z 附近）与 `lzcapp`（2026-08-11T03:58:40Z）的跟帖建议"先 `git add --renormalize` 或固定工作区为 LF，再 refinalize，避免 rebase 二次污染"。这条经验被吸收进下面的"前置条件 1"。

### 修订后文本（替换原第 155-167 行）

```markdown
### 3.2 已定稿包：用 `refresh_submission_manifest.py` 刷新哈希

当前 `main` 的 `scripts/finalize_submission.py` 仍然只负责把首次投稿从 `scaffold` 晋级为
`ready_for_review`——它拒绝第二次运行（`package_state must be scaffold before finalization`，
`finalize_submission.py:115`）是有意的状态机边界，不应通过下面两种手工操作绕过：

- 把 `package_state` 从 `ready_for_review` 改回 `scaffold`；
- 把 `files[].sha256` 批量置零、删除或改成任意占位值。

已定稿包现在有了官方的刷新入口：`scripts/refresh_submission_manifest.py`
（[#1871](https://github.com/open-city-ai/haidian/pull/1871) 合并于 2026-08-11T16:18:34Z；
随后 [#2522](https://github.com/open-city-ai/haidian/pull/2522) 于 2026-08-14T09:06:59Z
补齐了 Git-blob 哈希机制的收尾修复）。用法：

```bash
python3 scripts/refresh_submission_manifest.py submissions/<login>/<slug> --json
```

**前置条件（跳过任一条都可能白跑一轮，甚至陷入下面说的死循环）：**

1. **先把工作区行尾归一成 LF，再刷新，不要反过来。** 该工具通过临时 Git index 对
   `manifest.json` 里已声明的每个文件跑一次 `git add`，用 Git 实际会生成的 blob 字节算
   sha256（`scripts/git_blob_hashes.py::git_blob_sha256()`），不是直接读工作区原始字节。
   只要你在刷新前后保持同一份 `core.autocrlf` / `.gitattributes` 配置，工作区当前是
   CRLF 还是 LF 本身不影响刷新结果是否正确；**但如果中间插了一次 `rebase` / `merge` /
   `checkout` 把工作区文本重新写成 CRLF，刷新出来的哈希会对不上你真正要提交的字节**——
   这正是 [#1062](https://github.com/open-city-ai/haidian/issues/1062)（"25/47 个 CI 失败
   PR 的真实根因是 Windows CRLF 行尾"，2026-08-14T09:10:18Z closed）里记录的"事后损坏"路径：
   包本来是对的，一次 `rebase` 就能在没人改内容的情况下让它突然报 `sha256 mismatch`，而且
   **这个循环不会自己停**——只要还在同一份反复被 checkout 重写的 CRLF 工作区里"刷新→自检→
   失败→再刷新"，每一轮都会得到一个当时看似正确、下次 checkout 又被推翻的哈希。仓库目前
   没有在 `.gitattributes` 里加 `* text=auto eol=lf`（维护者原话："暂不加入，避免把可能
   重写工作树的政策变更和缺陷修复捆绑"），这道保险需要参与者自己上：在提交目录所在仓库里
   （不要改全局配置）执行一次

   ```bash
   git config core.autocrlf false
   git config core.eol lf
   git add --renormalize .
   ```

   或者直接重新 checkout 一次自己的投稿目录，确认 `git status` 干净后再进入下一步。

2. `manifest.json` 的 `package_state` 必须已经是 `ready_for_review`；`scaffold` 包仍然只能
   用 `finalize_submission.py`，刷新工具会直接拒绝并报错退出。

3. 刷新工具只处理**已经在 `manifest.json` 的 `files[]` 里声明过路径**的条目（拒绝绝对路径、
   `..`、重复 path）；新增文件需要先手工把条目加进 `files[]`（含 `path`/`role` 等字段），
   刷新工具才会替它补上 `sha256`——它不会自己发现工作区里的新文件。

刷新会把 `validation_claim.self_checked` 顺手置回 `false`，所以下一步必须紧跟着重新自检并
**带上 `--mark-self-checked`**，工具自己的输出也会给出这条 `next_command`：

```bash
python3 scripts/refresh_submission_manifest.py submissions/<login>/<slug> --json
# ok=true 时按输出里的 next_command 原样执行：
python3 scripts/self_check_submission.py submissions/<login>/<slug> \
  --pr-author <login> --mark-self-checked --json
```

不要跳过 `--mark-self-checked` 单独重跑一次不带该参数的自检——`self_checked` 已经被刷新
工具置回 `false`，四门检查即使全绿也不会自动把它改回 `true`；只有带 `--mark-self-checked`
的这次运行会在校验通过后写回 `manifest.json` 与 `self_check.json` 并原地复核一遍，失败会
自动回滚已写入的证据。

刷新摘要本身不是重新通过四门检查的证据——它只处理哈希这一项，`--mark-self-checked` 之后
的完整自检结果才是。

对已定稿包进行迭代时：先在新分支修改并重生成派生物；如果只是 `files[]` 中已声明文件的
字节变了（内容改了、图重出了），跑上面的刷新命令即可；如果涉及新增/删除文件或
`package_state` 以外的结构性字段改动，刷新工具不处理这类改动，仍以当次 `main` 的
`--help` 与脚本源码为准。
```

---

## 第二节：并发模型重写（对应必改 #2）

### 原稿位置

§1.2「一次迭代会发生什么」第 2 条（第 41 行）；§5 表"fork 的第一个 PR……no checks reported"行（第 255 行）。原文断言 workflow "全仓库共用一个串行 concurrency group（`group: submission-validation`，`cancel-in-progress: false`，`queue: max`）"。

### 实核依据（当前 main = `9113d62c`）

直接读取 `.github/workflows/submission-validation.yml`（`ref=9113d62c`，blob `858622737`，2021 字节）：

```yaml
concurrency:
  group: submission-validation-pr-${{ github.event.pull_request.number }}
  cancel-in-progress: true
```
（workflow 级，第 15-17 行）

```yaml
    concurrency:
      group: submission-validation-api
      cancel-in-progress: false
      queue: max
```
（job 级，第 30-33 行；注释原文："Every validation calls the GitHub API to enumerate and
hydrate the PR. Keep those calls serialized across PRs to avoid secondary-rate-limit 403s,
while retaining one pending slot per PR at the workflow level. The API lock must keep all
distinct PRs eligible; per-PR cancellation above already removes superseded heads before
they reach this queue."）

原文描述的"全仓库共用一个串行 group、`group: submission-validation`"这个 group 名字和粒度
在当前 main 上都不存在了——现在是两层：workflow 级按 PR 号分组、`cancel-in-progress: true`；
job 级才是全仓库共用、`cancel-in-progress: false`。与 ASSETS-CHECK-20260814 的 B-3 结论一致，
在两天后的 main 上复核未变。

### 修订后文本

**替换原 §1.2 第 2 条（第 41 行）：**

```markdown
- 并发模型是两层的（`.github/workflows/submission-validation.yml`）：workflow 级按**每个
  PR** 分组（`group: submission-validation-pr-${{ github.event.pull_request.number }}`，
  `cancel-in-progress: true`）——同一个 PR 只要有新 head 到达，旧 head 还没跑完的那次运行
  会被直接取消，不再占位；job 内部还有一层全仓库共用的串行组（`group:
  submission-validation-api`，`cancel-in-progress: false`，`queue: max`），因为每次校验都要
  调用 GitHub API 枚举并 hydrate PR，这层是为了避免触发 secondary rate limit。两层叠加的
  实际效果：**推送新 commit 会立刻杀掉你自己这个 PR 上还没跑完的旧 run，但新 run 仍要重新
  排到全仓库 API 队列的末尾**。所以连续推送不会让你更快拿到结果——每推一次，前一次排队积累
  的位置就作废，你排到的是当时的队尾；投稿高峰期这样反而更慢。**结论没变，机制变了：一次
  改完整再推，推完就等，不要边跑边推、更不要连推。**
```

**替换原 §5 表"no checks reported"行（第 255 行）：**

```markdown
| fork 的第一个 PR 建好后长时间显示 no checks reported，或推送后迟迟没有新结果 | `submission-validation` 用 `pull_request_target` 触发，job 有 `draft == false` 条件；并发模型是两层的——workflow 级按 PR 号分组且 `cancel-in-progress: true`（旧 head 会被自动取消），job 内部还有一层全仓库共用、`cancel-in-progress: false`、专门串行化 GitHub API 调用的队列（避免 secondary rate limit）。连续推送只会不断取消自己的旧 run 并重新排到 API 队列末尾，不会更快 | 先确认不是 draft；然后 `gh pr checks <PR> --repo open-city-ai/haidian --watch --interval 15` 或依赖通知低频复查。**一次推完整再等**，不要连续推送，也不要发空评论催促或高频轮询 |
```

---

## 第三节：CRLF 现状与双保险建议（对应必改 #3）

### 原稿位置

§5 表"Windows 上本地自检 PASS，推送后 CI 大面积报 `manifest.json: sha256 mismatch`……"行（第 258 行）。原文的"解法"仍在教参与者手工 `b.replace(b"\n", b"\r\n")` 重算比对，并说"未合并 PR 只作为背景，不是稳定工具"。

### 实核依据（当前 main = `9113d62c`）

- `scripts/validate_submission.py`（`ref=9113d62c`，blob `98e23278e`，135952 字节，3262 行）第 22 行 `from git_blob_hashes import git_blob_sha256`，第 1583 行调用 `git_blob_sha256(manifest_files, cwd=repo_root)`，第 1643-1660 行是校验器自带的 CRLF/LF 归因文案：
  ```
  "; declared digest matches the CRLF form, but Git is validating LF bytes. "
  "Regenerate manifest.json from the exact bytes committed to Git (for example, "
  "use an LF checkout or repository-local core.autocrlf=false before a fresh checkout)"
  ```
  以及反向情形（声明值匹配 LF、实际在验 CRLF）的对称提示，第 1655-1660 行。
- `scripts/self_check_submission.py`（`ref=9113d62c`）经 `build_self_check()`（第 262 行起）调用
  `validate_local_submission.py`（子进程，第 272-286 行）；`validate_local_submission.py`
  （`ref=9113d62c`，blob `2de9cc20c`）第 33 行 `from validate_submission import format_report,
  validate_submission`——本地自检与 CI 现在共用同一套 `validate_submission()` 校验逻辑，
  因而共用同一套 `git_blob_sha256()` 哈希口径。这解释了为什么"本地 PASS、推送后 CI 大面积
  mismatch"这类历史现象（Issue #1062 统计的 25/47 个 CI 失败 PR）在工具层面已经消失。
- `.gitattributes`（`ref=9113d62c`）仍只有 `*.pdf binary` 一行，未加 `* text=auto eol=lf`
  （核实同第一节）。这意味着行尾归一完全依赖参与者本地的 `core.autocrlf` 配置在"刷新/自检"
  与"实际 `git add`/`commit`"之间保持一致，仓库侧没有兜底。

### 修订后文本（替换原 §5 表 CRLF 行，第 258 行）

```markdown
| Windows 上手工核对 sha256 时，按文件字节算出的哈希与 `manifest.json` 声明值对不上，但 `self_check_submission.py` / CI 都是 PASS | 这不是 bug：校验器和本地自检现在共用同一套逻辑，都按 **Git 实际会提交的 blob** 算哈希（`scripts/git_blob_hashes.py::git_blob_sha256()`，临时 Git index 跑 `git add` 后 `git show :<path>`），不是按你手上文件的原始字节；只要工作区当前的 `core.autocrlf` / `.gitattributes` 配置在你刷新哈希和实际 `git add`/`commit` 之间没变过，两者就会一致 | 这一类历史误伤（[#1062](https://github.com/open-city-ai/haidian/issues/1062) 统计的 25/47 个 CI 失败 PR）已经在工具层修完，不需要再手工 `b.replace(...)` 归一重算；如果就是想手工核对，用 `git show <sha>:<path>` 取出 Git 实际存的字节再算 sha256，不要直接对工作区文件算。**仍然值得设的双保险**：仓库没有在 `.gitattributes` 里加 `* text=auto eol=lf`，行尾归一完全靠本地配置——按 3.2 节的做法在提交目录里设 `core.autocrlf=false` + `core.eol=lf` 并 `git add --renormalize .`，可以防住 `rebase` / `merge` / `checkout` 事后把工作区改回 CRLF 这条路径（[#1062](https://github.com/open-city-ai/haidian/issues/1062) 评论区有过一次已合并投稿在 rebase 后被打回的真实记录） |
```

---

## 第四节：`is_review_queue_candidate` 改名别名豁免（对应必改 #5）

### 原稿位置

§1.1「分支命名惯例」第 20 行："`scripts/github_pr_validation.py` 的
`is_review_queue_candidate()` 按 PR 作者、变更路径和 head SHA 判定：它要求每个变更文件都
形如 `submissions/<pr-author>/<slug>/...`……**从不读取分支名**。"

### 实核依据（当前 main = `9113d62c`）

- `scripts/github_pr_validation.py`（`ref=9113d62c`，blob `5cc743cfb`）第 443-460 行，函数
  签名已改为 `is_review_queue_candidate(changed_files, pr_author, authorized_legacy_dirs=None)`；
  判定逻辑第 457 行：
  ```python
  or (parts[1].casefold() != pr_author.casefold() and proposal_dir not in authorized_legacy_dirs)
  ```
  即目录 owner 段与 PR 作者不一致时，只要该目录在 `authorized_legacy_dirs` 里也放行。
  第 669 行 `authorized_legacy_dirs = authorized_legacy_submission_dirs(...)` 是调用方，
  第 765 行把它传给下游 `authorized_legacy_submission_dirs=` 形参。
- `scripts/participant_owner_aliases.py`（`ref=9113d62c`，blob `de83e17e1`，2351 字节）
  第 17-58 行 `authorized_legacy_submission_dirs(repo_root, github_user_id, current_login)`：
  必须同时满足 `github_user_id` 精确匹配（拒绝 bool、拒绝非 int）**和** `current_login`
  按 `casefold()` 匹配别名表里的 `current_login`，任一不满足直接返回空集（fail-closed）。
- `data/participant_owner_aliases.json`（`ref=9113d62c`）当前内容：
  ```json
  {
    "schema_version": "0.1.0",
    "aliases": [
      {
        "github_user_id": 51290995,
        "current_login": "zyaoii",
        "legacy_login": "zymk8353",
        "legacy_submission_dirs": [
          "submissions/zymk8353/jingzhang-safe-return-line",
          "submissions/zymk8353/jingzhang-safe-charge-line",
          "submissions/zymk8353/jingzhang-ready-aed-line",
          "submissions/zymk8353/jingzhang-level-access-line"
        ]
      }
    ]
  }
  ```
  1 条别名、4 个目录，与 ASSETS-CHECK-20260814 的 B-5 一致，落地 PR
  [#2237](https://github.com/open-city-ai/haidian/pull/2237)（merged 2026-08-16T02:49:21Z）。
- `scripts/self_check_submission.py`（`ref=9113d62c`）第 483-487 行新增 `--pr-author-id`
  参数（"Stable numeric GitHub user ID; required only for a maintainer-approved login
  alias"），与上面的双重校验对应。
- **顺手核实并修正一处相邻旧措辞**：原句"按 PR 作者、变更路径和 **head SHA** 判定"把
  `is_review_queue_candidate()` 的职责范围写宽了——该函数签名里没有 head SHA 参数（见上）；
  head SHA 复核是同一脚本里另一个独立函数 `is_current_pull_request_head()`
  （`github_pr_validation.py:318`）的职责，对应原稿 §1.2 第 43 行"校验在写评论、贴标签前会用
  `is_current_pull_request_head()` 再核对一次 head SHA"那句。这处更正与 5 处必改无关，是
  改写同一句话时顺带用同一次源码读取核实的，未额外展开。

### 修订后文本（替换原 §1.1 第 20 行）

```markdown
仓库没有强制分支名。`scripts/github_pr_validation.py` 的
`is_review_queue_candidate(changed_files, pr_author, authorized_legacy_dirs=None)`
按 PR 作者与变更路径判定（head SHA 的核对是同一脚本里另一个函数
`is_current_pull_request_head()` 的职责，见 1.2 节）：它要求每个变更文件都形如
`submissions/<pr-author>/<slug>/...`（作者名按 `casefold()` 不区分大小写比对）且全部落在
同一个 slug 目录下——**除非该目录被登记为一次经核实的 GitHub 改名**。仓库维护一张改名
别名表 `data/participant_owner_aliases.json`
（[#2237](https://github.com/open-city-ai/haidian/pull/2237) 合并于 2026-08-16T02:49:21Z，
`scripts/participant_owner_aliases.py::authorized_legacy_submission_dirs()`），当前登记
1 条：`zymk8353 → zyaoii`，覆盖 4 个旧目录。核验是双重锁定：既要 GitHub 的稳定数字
`github_user_id` 命中，也要当前登录名命中别名表里的 `current_login`，任一对不上就整体判
空集（fail-closed，不会放行）；对应地，`self_check_submission.py` /
`participant_preflight.py` 都多了一个 `--pr-author-id` 参数用来传这个数字 ID。
**"从不读取分支名"这句仍然成立**——别名豁免看的是目录与经核实身份的映射，不看分支名，也
不是"目录归属可以自行声明"的口子；日常新建目录仍然必须是
`submissions/<你的 PR 作者名>/<slug>`。已合并记录里能看到 `submission/...`、
`iteration/...`、`codex/...`、`feat/...`、`agent/...` 甚至直接从 fork 的 `main` 合并的
各种形式，都能正常入队。所以下面是惯例，不是规则。
```

---

## 第五节：bootstrap_participant_workspace.py 参数更新（对应必改 #6）

### 原稿位置

§4.1「bootstrap_participant_workspace.py」，第 227 行（sparse 目录集合）与其后关于
`REQUIRED_FILES` 的那条要点（原第 230 行附近，"非 dry-run 时会检查一组必需文件"）。

### 实核依据（当前 main = `9113d62c`）

直接读取 `scripts/bootstrap_participant_workspace.py`（`ref=9113d62c`，blob `8dc3f5a4c`，
12692 字节，359 行）：

```python
DEFAULT_SPARSE_PATHS = (
    "/.github", "/brief", "/data", "/docs", "/schema", "/scripts", "/skills",
    "/scenarios", "/sources", "/templates", "/tracks.json",
    "/requirements-review.txt", "/requirements-translation.txt",
)                                                          # 第 60-74 行，13 项，全带前导 /
REQUIRED_FILES = (
    "skills/urban-design-ai-submission/SKILL.md",
    "brief/site-package/agent_taskbook.json",
    "data/source_registry.json", "sources/public-sources.json",
    "scripts/scaffold_ai_submission.py", "scripts/self_check_submission.py",
    "requirements-review.txt", "tracks.json",
)                                                          # 第 75-84 行，8 项
REQUIRED_DIRECTORIES = ("scenarios",)                      # 第 85 行，仅此一项
```

第 166 行 `["git", "sparse-checkout", "set", "--no-cone", *DEFAULT_SPARSE_PATHS]` 确认切到
`--no-cone` 模式。第 154-165 行 clone 参数仍是
`--filter=blob:none --sparse --depth=<N> --single-branch --branch <branch>`，第 305-308 行
`--depth` 默认值仍是 `50`——这两条原文已经写对，不需要改，本次只核实未变。

### 修订后文本

**替换原"sparse 目录固定为……"一条：**

```markdown
- sparse 检出集合已经从 10 个目录扩到 **13 项**，且切到了 `--no-cone` 模式、每项都带前导
  `/`（`git sparse-checkout set --no-cone /.github /brief /data /docs /schema /scripts
  /skills /scenarios /sources /templates /tracks.json /requirements-review.txt
  /requirements-translation.txt`，脚本里的 `DEFAULT_SPARSE_PATHS`），再加上
  `submissions/<login>/<slug>`。比原来多出的三项是 `/tracks.json`、
  `/requirements-review.txt`、`/requirements-translation.txt`——赛道注册表和翻译依赖清单
  现在也是轻量工作区的必需件。`scenarios/` 和 `sources/` 仍然不能省，校验器与评分脚本要
  读它们。
```

**替换原"非 dry-run 时会检查一组必需文件……"一条：**

```markdown
- 非 dry-run 时会检查一组必需文件是否落地，清单从 7 项扩到了 **8 项**，其中两处路径比
  原来写的更具体：`skills/urban-design-ai-submission/SKILL.md`（不是裸 `SKILL.md`）、
  `brief/site-package/agent_taskbook.json`（不是裸 `agent_taskbook.json`），再加
  `data/source_registry.json`、`sources/public-sources.json`、
  `scripts/scaffold_ai_submission.py`、`scripts/self_check_submission.py`、
  `requirements-review.txt`，以及新增的 `tracks.json`（`REQUIRED_FILES`）；目录层面只检查
  `scenarios/` 是否存在（`REQUIRED_DIRECTORIES`），并报告工作区体积、是否
  sparse/shallow/partial；缺文件或缺目录即 `ok=false`，进程退出码为 1。
```

其余两条（clone 参数、`--depth` 默认 50）核实后确认未变，**不改**。

---

## 附：§4.2 的一处衔接性补充（非必改，但与第一节相关，避免读者误读）

§4.2「本地无法完成 Git 操作时的边界」讨论的是"本地 `git add`/`write-tree`/`push` 本身跑
不通"这种更底层的情况，和第一节改写的 3.2 节"已定稿包换哈希用受支持工具"不是同一个问题。
`refresh_submission_manifest.py` 解决的是哈希刷新，不解决"完全没法完成一次 Git 提交动作"。
§4.2 关于"不把 GitHub Git Data API 组装流程当稳定提交路径"的判断，本次核实**仍然成立**：

- Issue #1071（原稿引用的、承载"9月进入专业深化评估"措辞来源的 PR）现状：`state=OPEN`，
  `mergeStateStatus=DIRTY`，`updatedAt=2026-08-10T21:25:43Z`，与 ASSETS-CHECK-20260814
  核实结果一致，两天内无变化。
- `main` 的 `scripts/` 目录（`git/trees/9113d62c?recursive=1` 全量列举）中未见任何
  `git_data_api` / `commit_assembly` / `tree_assembl` 类脚本落地。

因此 §4.2 正文**不需要改写**，只建议在该节开头加一句衔接：

```markdown
本节讨论的是"本地 Git 操作本身跑不通"这种更底层的情况，和 3.2 节"已定稿包换哈希用受支持
工具"不是一回事——已定稿包的哈希刷新已经有 `refresh_submission_manifest.py` 这个落地工具；
但如果你的问题是本地完全没法完成一次 Git 提交动作，下面这条边界仍然成立：
```

**保留 §4.2 原有的"不把任何未合并参数……Git Data API……未合并 PR 只作为背景，不是稳定
工具"这几句原文不动**——这几句对应 `tests/test_participant_iteration_guide.py` 的
`test_unmerged_tools_are_not_stable_commands` 契约测试（断言文本中必须出现
`"不把任何未合并参数"`、`"不把 GitHub Git Data API"`、`"未合并 PR 只作为背景，不是稳定
工具"`）。这几处断言原本命中的是 §3.2；第一节改写后 §3.2 不再包含这些短语（因为刷新工具
已经合并、不再是"未合并参数"的例子），若不做任何处理会让该契约测试失败。让这几句原文继续
留在 §4.2（Git Data API 场景依然真实适用）可以保住测试断言不破，同时内容仍然准确——但
**该测试文件本身建议在下篇的 PR 描述里同步走一次 review，确认测试断言的落点从"§3.2"变成
"§4.2"这件事本身也写进 PR 说明，避免维护者看 diff 时以为测试没检查到位**。测试文件改写
不在本次 PART 1 范围内。

---

## 实核依据清单（汇总）

| 依据 | 类型 | 值 |
| --- | --- | --- |
| main 基准 | commit | `9113d62cce44847d71a1f5b6f8e606f34f84dadf`，2026-08-18T15:13:41Z |
| PR #1044 head | commit | `d110958c4a88f481bcfff638c0516b21dc940065`（不变） |
| refresh_submission_manifest.py | 文件 @ main | 存在，4630 字节，blob `f4651302e` |
| PR #1871 | PR | MERGED 2026-08-11T16:18:34Z |
| PR #2522 | PR | MERGED 2026-08-14T09:06:59Z |
| Issue #1062 | Issue | CLOSED 2026-08-14T09:10:18Z |
| Issue #953 | Issue | CLOSED 2026-08-14T21:06:11Z（未合并） |
| PR #585 | PR | CLOSED 2026-08-14T18:05:25Z（未合并） |
| PR #959 | PR | CLOSED 2026-08-14T18:05:20Z（未合并） |
| PR #1043 | PR | CLOSED 2026-08-10T03:46:53Z（未合并） |
| PR #1064 | PR | CLOSED 2026-08-14T09:09:18Z（未合并） |
| PR #1071 | PR | OPEN，`mergeStateStatus=DIRTY`，2026-08-10T21:25:43Z（未变） |
| .github/workflows/submission-validation.yml | 文件 @ main | blob `858622737`；第 15-17 行（workflow 级并发）、第 30-33 行（job 级并发） |
| scripts/validate_submission.py | 文件 @ main | blob `98e23278e`；第 22、1583、1643-1660 行（git blob 哈希 + CRLF 归因文案） |
| scripts/git_blob_hashes.py | 文件 @ main | blob `a441fc2d1`，全文已读 |
| scripts/finalize_submission.py | 文件 @ main | blob `4ebfea0d0`；第 78-96 行（manifest_digests）、第 115 行 |
| scripts/self_check_submission.py | 文件 @ main | blob `2afa5cb40`；第 262-286 行、第 483-487 行（`--pr-author-id`） |
| scripts/validate_local_submission.py | 文件 @ main | blob `2de9cc20c`；第 33 行 |
| .gitattributes | 文件 @ main | blob `95703dd72`；仅 `*.pdf binary` |
| .github/workflows/submission-validation.yml job 注释 | 文本 | "per-PR cancellation above already removes superseded heads before they reach this queue" |
| scripts/github_pr_validation.py | 文件 @ main | blob `5cc743cfb`；第 318、443-460、669、765 行 |
| scripts/participant_owner_aliases.py | 文件 @ main | blob `de83e17e1`；第 17-58 行 |
| data/participant_owner_aliases.json | 文件 @ main | 1 条别名：`zymk8353 → zyaoii`，4 目录 |
| PR #2237 | PR | MERGED 2026-08-16T02:49:21Z |
| scripts/bootstrap_participant_workspace.py | 文件 @ main | blob `8dc3f5a4c`；第 60-74（sparse）、75-85（required）、154-165（clone）、166（sparse-checkout set）、305-308（--depth）行 |
| PR #1044 review 历史 | GitHub API | CocoSgt CHANGES_REQUESTED 2026-08-10T03:45:51Z；无新活动至 2026-08-18（`gh pr view 1044 --json updatedAt` = 2026-08-10T09:19:05Z） |

全部核实通过 `gh api`（`GH_TOKEN` 只读，scopes `repo, workflow`）与逐文件 `contents` 端点
拉取源码后本地 `grep`/通读完成；未对仓库执行任何写操作。

---

## 与 ASSETS-CHECK-20260814.md 的差异说明

本次在 `9113d62c`（比 ASSETS-CHECK 基准 `bb2a44c4` 新约 2 天）上逐条复核 B-1～B-6，
**结论与 ASSETS-CHECK 完全一致，未发现因这两天新提交而产生的偏差**。额外补充的实证：

- 补上了 B-1/B-2 的最终 canonical 落地 PR（#2522）及其合并时间，ASSETS-CHECK 原文只到
  "问题域是通过 #1871 等其他 PR 解决的"，未点名 #2522；
  本文追踪到具体承接 commit（`0d9f733f3` / `5ca37f236` / `6433ca349`）与合并 PR。
- 补上了 Issue #1062 评论区的"CRLF 死循环"具体证据链（`dysprosium231` 2026-08-11T02:42:05Z
  的 rebase 事后损坏案例），把任务里要求的"死循环警告"落到可引用的一手记录。
- 补上了 B-5 的完整校验机制细节（`github_user_id` + `current_login` 双重锁定、
  `--pr-author-id` 参数），ASSETS-CHECK 原文只提到"经核实的改名别名"这一层。
- 新增一处顺手修正（§1.1"按……head SHA 判定"的表述），与 5 处必改中的第 5 项共享同一句
  原文、同一次源码核实，未额外增加复核成本。


## 6. manifest-schema 0.2.x 强制门

`brief/site-package/schemas/manifest.schema.json` 是 `manifest.json` 的结构契约,分 `0.1.x`(legacy-compatible)和 `0.2.x`(强制前向契约)两条线(`schema_version` 字段的 pattern 是 `^0\.(?:1|2)\.\d+$`,见 schema 第 20-24 行)。触发这道门槛的不是"你手动选择升级",而是 GitHub 对这次 PR 里 `manifest.json` 的**文件状态**:

```python
# scripts/github_pr_validation.py:400-411 (strict_manifest_paths_for)
for item in files:
    if item.get("status") not in {"added", "copied", "renamed"}:
        continue
    filename = item.get("filename")
    if isinstance(filename, str) and filename.endswith("/manifest.json"):
        paths.add(filename)
```

即:一个 `manifest.json` 只要在这次 PR 里的 GitHub diff 状态是 `added`(首投)、`copied` 或 `renamed`(包括改名/挪目录),就会被塞进 `strict_manifest_paths`,进而在 `scripts/validate_submission.py:1710-1717` 里被判定为 `strict_schema = True`——此时若 `schema_version` 不是 `0.2.x`,直接报错 `new manifests must adopt schema_version 0.2.x; legacy 0.1.x packages remain advisory until their manifest is revised`(`:1716`)。只是 `modified`(在原地改内容,状态仍是 `modified`)不会触发这道强制门,历史 `0.1.x` 包留着不动依然只是 advisory——但一旦你把整个投稿目录改名、或者把 `manifest.json` 复制到新路径,状态就变成 `renamed`/`copied`,门槛照样落下来,复制/改名不能绕过迁移。

三个坑,都是我方在 200+ PR 复核里实测过的:

**坑一:role 27 词表不是自由文本,升级前必须先跑 `legacy_role_findings` 预检。** `0.2.x` 下 `files[]` 每一项的 `role` 只能是 schema `allOf` 分支里枚举的 27 个词之一(`manifest, agent_card, metrics, assumptions, sources, self_check, compliance_matrix, standard_matrix, design_depth_matrix, geometry, drawing, narrative, copyright_statement, visualization, proposal_figure, rendered_proposal_html, video, audio, media_poster, caption_track, transcript, changelog, asset, figure, evidence_data, verification_script, other`),逐一清点正好 27 个(schema 第 240-267 行)。旧 `0.1.x` 包里常见的自造 role(比如 `depth_id`、`results` 这类,WORKLOG 里 #1998 一例机械修复 490→266 条)在 0.2.x 下会整批报错。升级前先跑一遍预检,不要盲目 bump 版本号再逐条改:

```bash
python3 scripts/validate_manifest_schema.py --manifest submissions/<login>/<slug>/manifest.json --json
```

输出里的 `legacy_role_findings` 会把每条非规范 role 分成三类(`scripts/manifest_schema.py:118-160`):`author_typo_candidate`(路径能唯一反推出规范 role,大概率是手误)、`invalid_role_token`(不是合法 snake_case token)、`schema_gap_or_extension`(合法 token 但不在 27 词表里,该用 `role: other` + `role_detail`)。这个函数只在 `schema_version` 以 `0.1.` 开头时才产生输出——先看这份清单,再决定怎么改,比直接 bump 版本号踩一堆新增枚举错快得多。

**坑二:`role_detail` 只在 `role=other` 时合法,写别的角色带了它反而报错。** schema 的 if/then/else(第 285-301 行)是双向的:`role="other"` 时 `required: [role_detail]`;否则 `not: {required: [role_detail]}`——也就是说规范 role(比如 `role: "drawing"`)如果还带着一个 `role_detail` 字段,`0.2.x` 下同样判错,不是"多写没关系"。

**坑三:`validation_claim` 顶层白名单封闭,自定义键要走 `extensions.x-*`,但这条逃逸通道只在 `validation_claim` 这一层,`files[]` 条目层不认。** `0.2.x` 下 `validation_claim` 是 `additionalProperties: false`(schema 第 314-334 行的 `allOf` 分支),只认 `self_checked`、`known_blockers`、`data_confidence`、`readiness_contract`、`extensions` 五个键;想挂自定义验证声明,必须放进 `validation_claim.extensions["x-你的命名"] = {"schema_version": "1.0", "data": {...}}`(键名必须匹配 `^x-[a-z][a-z0-9_-]{1,63}$`)。但 `files[]` 的每个条目本身,无论 schema 版本,顶层一直是 `additionalProperties: false`(schema 第 130-133 行,不在任何 `allOf` if/then 里,0.1.x 和 0.2.x 都适用)——没有对应的 `extensions` 出口。手写包常见的错法是往 `files[]` 条目里加自定义字段(比如给某条目手加 `size_bytes`),以为跟 `validation_claim` 一样能逃逸,实际上会被 `additionalProperties: false` 直接拒收(WORKLOG #2243 一例:5 个条目手加 `size_bytes` 记入了 50 条错误里的 3 条)。

本地复现用 `--strict-manifest`,不要只跑默认 advisory 模式:

```bash
python3 scripts/validate_local_submission.py \
  submissions/<login>/<slug> --pr-author <login> --strict-manifest
```

`docs/manifest-schema-migration.md`(主干已有,自成一节)把这套迁移边界写得更完整,可以对照读。

---

## 7. symlink 全包禁令

`submission_directory_is_safe()`(`scripts/validate_submission.py:421-437`)在校验器读任何包内文件**之前**先跑一遍:先查投稿目录本身路径上有没有符号链接(`first_symbolic_link()`,`:406-412`,逐段 `is_symlink()`),再对整个目录树 `os.walk(base, followlinks=False)`,查每一个子目录名和文件名——**不是只查根目录、也不是只查 `manifest.json` 声明的路径**,包内任意深度、任意位置出现一个 symlink,立即报错 `symbolic links are not allowed in submission packages`(`report_symbolic_link()`,`:416-418`)并返回 `False`。调用点在主校验流程里(`:3145-3148`),一旦某个投稿目录被判定不安全,该目录会被整体加入 `unsafe_submission_dirs`,后续 `proposal.md`/`risk.json` 等一系列检查对它直接跳过——即包内一处 symlink 会连带影响同目录下其余检查的执行,不是"扣一条分单独报错"那么轻。

媒体文件路径还有第二道独立检查:`validate_media_manifest_entries()` 对 `assets/media/` 下每个引用路径再单独跑一次 `first_symbolic_link()`(`:754-757`),双重把关。

本地自查最直接:

```bash
find submissions/<login>/<slug> -type l
```

有输出就是真实文件(用 `cp` 而不是软链接放进去)而不是链接;Windows 环境下打包/复制素材时用 `robocopy` 或直接文件复制,不要用 mklink/junction。CI 端不会给你机会解释"这是我本地环境的问题"——它在读任何一个内容字段之前就已经拒绝了整个包。

---

## 8. constraints 空图层的 data_gap 机器可读声明

`geometry/constraints.geojson`(法定管控红线层)是唯一一个官方明确允许"空"的正式几何文件——`FORMAL_NONEMPTY_GEOMETRY_FILES` 常量(`:200-207`)里七个正式图层(`site_boundary`/`key_areas`/`land_use`/`roads`/`green_space`/`public_space`/`phasing`)都要求非空,唯独 `constraints.geojson` 不在其中,注释写明"目前没有已发布的官方管控几何,留空是合法且被接受的结果"(`:208-211`)。但从 2026-08-11 起(PR #1690 合并),空 `constraints.geojson` 多了一条**advisory 级**(不阻断)检查:必须在某处显式声明"为什么是空的",否则拿到一条 warning。

两条路径任选其一,函数 `validate_empty_constraints_declaration()`(`:1108-1130`)按顺序检查:

**路径一:在 `constraints.geojson` 文件本身写一个顶层 truthy 键。** `constraints_file_declares_data_gap()`(`:1073-1077`)认四个键名之一:`data_gap`、`data_gaps`、`missing_official_layers`、`constraint_status`(`CONSTRAINTS_DATA_GAP_DECLARATION_KEYS`,`:213-218`)。最简单的写法:

```json
{
  "type": "FeatureCollection",
  "data_gap": {
    "reason": "no official regulatory-control geometry published for this site as of the submission date",
    "checked_sources": ["sources/public-sources.json"]
  },
  "features": []
}
```

**路径二:在 `assumptions.json` 里登记一条覆盖管控缺口的假设。** `assumptions_declare_constraints_gap()`(`:1080-1098`)接受两种匹配:条目的 `id`/`assumption_id` 命中正则 `control|constraint|regulat`(不区分大小写),或者条目任意字符串字段(含中文)命中 `管控`、`控规`、`红线`、`约束`、`控制线`、`文保`、`regulatory control`、`redline` 等词之一(`CONSTRAINTS_GAP_ASSUMPTION_TERMS`,`:219-234`)。脚手架默认生成的 `A-CONTROLS-001` 假设条目本身就能命中,新手不用额外做什么;只要没删掉它就自动满足。

**这条检查只是 warning,不影响 CI 通过与否**——报错文案本身写明"empty constraint layer is accepted and is not a blocking issue"(`:1126`)。但它同时明确禁止反向操作:警告文案末尾特别提示"Keep the feature list empty unless you have citable official or cleared geometry - never fabricate constraint geometry, and never label an inferred surface `official_constraint`"(`:1128-1130`)——即宁可留空吃一条 warning,也不要为了消掉这条 warning 去编造管控几何。

这条机制本身来自 Issue #1631 第 3 项("数据信号:双语产物同字节与空 constraints 图层——两个现行校验未覆盖的盲区"),由 PR #1690(`feat(scaffold+validate): 空 constraints 的机器可读缺口声明与 warning 级提示,不改变通过判定`)落地,2026-08-11T07:59:51Z 合并(merge commit `d89526ec618b81266dd919207bb29240510d02ea`)。

**更新(2026-08-20):** Issue #1631 第 3 项里提到的另一个盲区——"双语产物同字节"——此前一直没有对应检查,现在也补上了同级别的机器可读提示。PR #1689(`report_identical_bilingual_artifacts()`,`scripts/validate_submission.py:2530` 起,merge commit `e289e4abc` 于 2026-08-20T04:43:30Z 合并)在四个条件同时满足时才打一条 **warning**(不参与 `report.ok`,历史包不追溯):该条目声明了 `translation_of`,或声明了 `language: "zh"/"en"` 且文件名带对应语言码后缀;该条目与其对应的主文件条目**都没有**声明 `language: "neutral"`;两个文件在磁盘上都存在;两个文件字节 sha256 相同。合法的无文字/语言中立产物(比如一张不含文字的场地区位图)只要声明 `language: "neutral"` 就会被跳过,不会被误伤;这条提示只提醒,不阻断 CI,也不影响是否能合并。

---

## 9. tracks.json / scenarios 根级注册表

投稿如果在 `proposal.md` front matter 或 manifest 里声明了 `tracks` / `scenarios` 字段,校验器要拿它们去对两张**仓库根级注册表**核验合法性:`load_track_registry()`(`:496-512`)读根目录 `tracks.json` 的 `tracks[]` 数组,按 `id` 建索引;`load_scenario_registry()`(`:517-530`)读根目录 `scenarios/` 整个目录下每个 `*.json` 文件,同样按 `id` 建索引。校验逻辑(`validate_track_metadata()`/`validate_scenario_metadata()`,`:534-577`)先查 `TRACK_ID_RE`/`SCENARIO_ID_RE` 格式(`^[a-z0-9][a-z0-9-]{2,63}$`),再查 id 是不是在注册表里。

**这里的坑不在你的包,在你的本地 checkout。** 两个加载函数都走 `policy_file(repo_root, relative_path)`(`:939-943`):先看 `repo_root/relative_path` 存不存在,不存在才退回脚本自身仓库根(`POLICY_ROOT = Path(__file__).resolve().parents[1]`,`:27`)——但这个兜底路径和你实际跑校验的 `repo_root` 通常是**同一棵树**(脚本就躺在你 checkout 里的 `scripts/` 下),兜底救不了真正缺文件的稀疏检出。如果你的轻量工作区没物化 `tracks.json` 或 `scenarios/` 目录,`load_track_registry()`/`load_scenario_registry()` 会直接返回空字典,`validate_track_metadata()` 见到空注册表报 `tracks registry is missing or invalid`(`:551`)——这条错误看起来像"仓库注册表坏了",实际上是本地检出不全,包内容本身完全没问题。

`scripts/bootstrap_participant_workspace.py` 已经把这两项补进了官方稀疏检出清单,`--dry-run` 打印出的 `DEFAULT_SPARSE_PATHS`(`:61-73`)正好 13 项:

```
/.github /brief /data /docs /schema /scripts /skills
/scenarios /sources /templates
/tracks.json /requirements-review.txt /requirements-translation.txt
```

用 `git sparse-checkout set --no-cone` (不是 `--cone`)执行——这不是随意选择:cone 模式下 git 2.34 这类版本本地实测无法取到仓库根级的单文件 `/tracks.json`(cone 模式的 pattern 语义按目录组织,不认独立的根级文件 pattern),必须用 `--no-cone` 才能把 `/tracks.json` 这条写进去。`REQUIRED_FILES`(`:75-84`)8 项里也包含 `tracks.json`,`REQUIRED_DIRECTORIES`(`:85`)包含 `scenarios`,非 dry-run 时脚本会自动检查缺文件并把 `report["ok"]` 置 false。已有的手工 sparse 工作区如果是在这两项加进清单之前建的,补一条命令就够,不用重新克隆:

```bash
git sparse-checkout add /tracks.json /scenarios
```

一句话记住:**本地复现校验(尤其是 `--strict-manifest` 或涉及 track/scenario 元数据的包)必须带上 `/tracks.json` 和 `/scenarios/`,否则拿到的 registry 报错是假错,不代表 CI 真会这样判。**

---

## 10. 多模态 / media 契约

投稿包可以带视频、音频作为补充材料,但 `assets/media/` 下的每个文件都要在 `manifest.json` 里登记,并且要满足一套比普通图片资产严格得多的契约(`validate_media_manifest_entries()`,`:713-816`,PR `8669417e6`"feat: support multimodal proposal presentations" 于 2026-08-10T17:44:28Z 合并落地;`2e2fd0a28`"Fix media-specific size validation (#1831)" 于 2026-08-11T11:01:06Z 修正了体积上限的适用范围)。

**路径与角色是强绑定的**,扩展名直接决定要求的 `role`:`.mp4`/`.webm` → `video`,`.mp3`/`.m4a`/`.ogg` → `audio`,`.vtt` → `caption_track`,`.md` → `transcript`,其余(png/jpg/jpeg/webp)→ `media_poster`;声明的 `role` 跟扩展名推出的 `expected_role` 不一致直接报错(`:739-752`),且必须落在 `assets/media/` 目录下,别的位置一律拒收。

**视频比音频多两个必需引用。** 两者都要求 `title_zh`/`title_en`/`description_zh`/`description_en` 四个字段各至少 2 字符,以及一个 `transcript` 引用(指向 manifest 里另一条 `role=transcript` 的条目);视频额外要求 `poster`(指向 `role=media_poster`)和 `caption`(指向 `role=caption_track`)——三个引用字段(`poster`/`caption`/`transcript`)每一个都要求目标路径**已经在 manifest 里列出**,并且目标条目的 `role` 精确匹配(`:776-793`)。

**文件内容也会被实测,不是只看扩展名。** 视频/音频文件会做容器魔数校验(`media_signature_is_valid()`,`:686-710`):mp4/m4a 检查 offset 4-8 是不是 `ftyp`,webm 检查开头 4 字节 `\x1a\x45\xdf\xa3`,mp3 检查 `ID3` 头或帧同步位,ogg 检查 `OggS`——把文件改名伪装扩展名过不了这关。`caption_track`(`.vtt`)文件要求 UTF-8 且去空白后以 `WEBVTT` 开头(`:806-813`);`transcript`(`.md`)文件要求 UTF-8 且去空白后长度 ≥ 20 字符(`:814-820`),纯占位文本会被拦。

**体积上限按类型分别设置**(`:298-300`,`:3096-3111`):视频 `MAX_VIDEO_BYTES = 20 MiB`,音频 `MAX_AUDIO_BYTES = 8 MiB`,`assets/media/` 下其余文件(poster/caption/transcript)沿用通用资产上限 `MAX_ASSET_BYTES = 5 MiB`。

schema 侧对应字段(`brief/site-package/schemas/manifest.schema.json` 第 172-183 行)是 `poster`(pattern 限定 `assets/media/*.{png,jpg,jpeg,webp}`)、`caption`(限定 `.vtt`)、`transcript`(限定 `.md`)——路径格式在 schema 层就先卡一道,内容规则在 `validate_submission.py` 再卡一道。

`cover_image` 字段(展示用封面图,与 media 契约共用同一套角色体系)如果设置了,必须是 `assets/media/` 下的 PNG/JPEG/WebP,manifest 里列出,且对应条目 `role` 必须是 `media_poster`(`:1673-1699`)——即封面图和视频海报共用同一个角色语义,不是两套体系。

---

## 11. known_blockers 非空会挡正式评分

`validation_claim.known_blockers` 是 schema 必填数组字段(schema 第 12 行 `required` 列表含 `validation_claim`,`validation_claim.required` 含 `known_blockers`,schema 第 202-208 行),类型是字符串数组,允许为空数组。但一旦这个数组**非空**,`validate_submission.py:1699-1706` 会打一条 warning:

```
{proposal_dir}/manifest.json: known_blockers present; submission may pass intake
but cannot enter formal professional scoring until resolved
```

这条不是确定性校验的阻断错误——CI 依然可以是绿的,PR 依然可以合并入库(intake)。但措辞已经写明:**只要 `known_blockers` 数组里还有条目,这个包就进不了正式专业评分**。换句话说,`known_blockers` 不是"写给自己看的 TODO 列表",而是一个会被机器读取、直接影响能否进入下一阶段评审的字段。自检工具确认没有遗留阻断项之后,记得把这个数组清空(而不是留着几条"已经不算数"的旧记录),否则包会一直卡在"入库但不进正式评分"的状态,自己却看不出 CI 哪里报错——因为它本来就不报错,只报 warning。

```bash
python3 -c "
import json, pathlib
p = pathlib.Path('submissions/<login>/<slug>/manifest.json')
data = json.loads(p.read_text(encoding='utf-8'))
print('known_blockers:', data.get('validation_claim', {}).get('known_blockers'))
"
```

确认为空数组 `[]` 或字段不存在,再提交定稿版本。

---

## 12. GeoJSON / metrics 收紧(2026-08-12 ~ 08-14 新增校验)

近期 main 上线了三条几何/指标层面的类型收紧,都属于"老包重新生成几何或指标时容易新中招"的类型——旧包如果一直没有重跑校验,直到这次迭代重新生成产物才会第一次撞见:

| 校验 | 位置 | commit(实测存在) | 判定逻辑 |
| --- | --- | --- | --- |
| 拒绝布尔值坐标 | `coordinate_pair_is_valid()` `:1006-1016` | `74d4946f0`(2026-08-13T23:06:46Z)"reject boolean GeoJSON coordinates" | Python `bool` 是 `int` 子类,`isinstance(True, int)` 为真;显式加 `isinstance(item, bool)` 排除,否则 `[true, false]` 会被当成合法坐标对放过 |
| 拒绝非有限坐标 | 同上,`:1010` | `b1fbc9c4e`(2026-08-14T01:08:08Z)"reject non-finite GeoJSON ordinates" | `math.isfinite(item)` 排除 `NaN`/`Infinity`/`-Infinity`;JSON 标准本不允许这几个值,但某些几何生成库序列化时会漏查 |
| 拒绝布尔值 metric | `is_json_number()`(`scripts/metric_types.py:9-19`) | `d6a98b5ef`(2026-08-12T18:07:53Z)"reject boolean metric values"(移植自 PR #2080,原分支产生冲突后由本仓库重新在 main 上落地) | 同样是 `bool` 继承 `int` 的坑:`metrics.json` 里 `status: "known"` 的条目如果 `value` 写成 `true`/`false`,过去会被当成合法数值放行;现在显式判 `isinstance(value, bool)` 为假才算数字(`validate_submission.py:1302` 调用) |

`coordinate_pair_is_valid()` 同时保留了原有的经纬度范围检查(`-180 ≤ lon ≤ 180`,`-90 ≤ lat ≤ 90`)和类型检查(必须是 `list`、长度 ≥ 2、每个分量是 `int`/`float`),三条新老规则叠加生效。配套测试提交 `3425973d6`(2026-08-13T23:28:25Z,"test(validation): cover all GeoJSON ordinates")把回归测试补到了所有九层几何文件。

自查建议:重新生成 GeoJSON 前,检查生成脚本有没有可能把某个 `null`/未定义值序列化成 `NaN` 或把某个开关量误写成布尔值直接塞进坐标数组或 `metrics.json` 的 `value` 字段;Python 端最简单的排查是在写盘前跑一遍:

```python
import json, math

def scan(obj, path=""):
    if isinstance(obj, bool):
        yield f"{path}: bool leaked into numeric position"
    elif isinstance(obj, float) and not math.isfinite(obj):
        yield f"{path}: non-finite float {obj}"
    elif isinstance(obj, list):
        for i, v in enumerate(obj):
            yield from scan(v, f"{path}[{i}]")
    elif isinstance(obj, dict):
        for k, v in obj.items():
            yield from scan(v, f"{path}.{k}")

data = json.loads(open("geometry/site_boundary.geojson", encoding="utf-8").read())
for issue in scan(data):
    print(issue)
```

---

## 13. PNG 解码预算(2026-08-19 新增校验)

`scripts/validate_submission.py` 新增了对 PNG 文件的结构完整性与解码体积校验(commit `298500d70`,2026-08-19T13:53:31Z 合并,"fix: reject corrupt PNG submission assets")。这不是只看扩展名或文件体积:校验器逐字节解析 PNG chunk 结构(签名、每个 chunk 的 CRC、IHDR/PLTE/IDAT/IEND 出现顺序与唯一性),并且**真的用 `zlib` 解压一遍 IDAT 流**,核对解压出来的扫描线字节数与 IHDR 声明的宽高、位深、颜色类型、隔行扫描(Adam7)方式算出的期望值是否一致(`png_integrity_result()`,`:768-949`);伪装扩展名或被截断/损坏的 PNG 过不了这一关(调用点在 `validate_manifest_file()` 里,`:1859-1868`)。

**新增的两条解码体积上限,是本节要提醒的重点:**

```python
MAX_PNG_INFLATED_BYTES = 128 * 1024 * 1024         # 单张 PNG 解码后体积上限(128 MiB),:306
MAX_TOTAL_PNG_INFLATED_BYTES = 1024 * 1024 * 1024  # 整包全部 PNG 解码后累计上限(1024 MiB),:307
```

单张图按 IHDR 声明的宽高/位深/颜色类型算出的解码后期望字节数(逐行 `1`(过滤字节)`+ 行字节数`,隔行扫描另按 Adam7 七趟分别累加)超过 128 MiB 直接拒收;整包所有 PNG **累计**解码体积超过 1024 MiB 同样拒收——且后面每一张图能用的额度会被前面已经"花掉"的预算压缩(`:1859-1868`,`remaining_budget = MAX_TOTAL_PNG_INFLATED_BYTES - report.png_inflated_bytes`),报错落在预算被打满那一刻正在检查的那张图上,但那张图本身未必有问题。

**现象**:manifest 里逐张单看都不算离谱大小的高分辨率 PNG(比如若干张 7200×4200 的成图/详图),累加解码体积很容易冲上 2 GB 量级——单张(以 truecolor 8-bit、7200×4200 估算,解码后约 86 MiB)还留在 128 MiB 单张上限以内,但同一个包里放上二三十张同量级大图,总解码预算就会在中途某一张上被打满。

**根因**:这是分辨率/张数选择问题,不是文件损坏。解码后体积只取决于 IHDR 的宽×高×位深×通道数,与 PNG 压缩后的磁盘体积没有必然对应关系——压缩率高、磁盘体积不大的高分辨率图,解码后依然是宽×高直接相乘的原始像素体积,这条预算按的是解压后的字节数,不是你在磁盘上看到的文件大小。

**修法**:按实际展示/评审需要控制分辨率(网页预览、评审阅读通常不需要 7200px 宽的整幅原图,可以另存一版降采样图作为 `visualization`/`proposal_figure`,真正需要保留的高精度版本只放一两张代表性的,而不是整批同分辨率导出);或者控制大图总张数,给包里 PNG 的总解码体积留出余量。JPEG/WebP 不受这两条 PNG 专属解码上限约束,确有必要保留全分辨率存档图时可以考虑改用这两种格式(仍需满足各角色既有的 `MAX_ASSET_BYTES`/`MAX_DRAWING_BYTES` 等磁盘体积上限,这两条没有变)。

**自验**:本地按 IHDR 尺寸估算一遍解码体积,比反复推送去撞 CI 快(不需要真的解压):

```python
import pathlib
from PIL import Image  # 只读 header,不解压;等价逻辑可参考 validate_submission.py:png_integrity_result()

total = 0
for p in sorted(pathlib.Path("submissions/<login>/<slug>").rglob("*.png")):
    with Image.open(p) as im:
        w, h = im.size
        channels = {"L": 1, "LA": 2, "RGB": 3, "RGBA": 4, "P": 1}.get(im.mode, 4)
    inflated = h * (1 + (w * channels * 8 + 7) // 8)  # 8-bit、非隔行估算
    total += inflated
    print(f"{p}: ~{inflated / 1024 / 1024:.1f} MiB decoded, running total {total / 1024 / 1024:.1f} MiB")

print("超出 1024 MiB 总预算" if total > 1024 * 1024 * 1024 else "预算内")
```

---

## 附:常见 CI 失败速查表

> 来自对 200+ 个真实失败案例的诊断——本账号在本仓库累计深审 213+ 条评审记录(见本地运维日志),覆盖 CRLF 哈希失配、readiness 契约缺口、0.2.x 迁移、PNG 解码预算、手写包结构错位、越界路径、分支严重落后 main、CI 基础设施抖动八大类根因。下表是这八类的一行判定法与一行修法,按"先查哪类最快命中"的经验顺序排列,不代表出现频率排序。(2026-08-20 增补 PNG 解码预算、分支严重落后 main 两类,并补全 readiness 契约缺口一类的具体枚举值,见文末"2026-08-20 时效性增补说明"。)

| 根因类别 | 一行判定法 | 一行修法 |
| --- | --- | --- |
| **CRLF 哈希失配** | 报错形如 `sha256 mismatch`,且错误文案里出现"declared digest matches the CRLF form, but Git is validating LF bytes"(或反过来 LF/CRLF 互换,`validate_submission.py:1650-1660`);或本地对同一文件分别算 CRLF 字节哈希与 `git_blob_sha256()` 摘要,两者其一命中声明值 | 不要手工用文件字节重算哈希;跑官方 `finalize_submission.py`/`refresh_submission_manifest.py` 重新生成 manifest,让哈希基线对齐 Git pending blob(`scripts/git_blob_hashes.py::git_blob_sha256()`),不要在 CRLF 工作区里自己 `bytes.replace(b"\n", b"\r\n")` 逆算 |
| **契约缺口(readiness/self_check)** | 报错含 `unsupported readiness_contract`——`readiness_contract` 当前只有**一个**合法值 `"persisted-self-check-v1"`(`PERSISTED_READINESS_CONTRACT`,`validate_submission.py:30`);实测常见的手写错法是沿用旧文案自造 `"participant-reviewed"` 这类取值,报错原文形如 `unsupported readiness_contract 'participant-reviewed'`(`:2007-2009`)。另外两种报错是 `must set validation_claim.self_checked=true`、或 `must persist pass/blocking gates for ...`(`validate_readiness_claim()`,`:1725-1800`);常伴随手写 `self_check.json` 体积远小于官方产物(官方产物量级 ~8000 字节,手写常见 ~1000-1500 字节) | 跑 `python3 scripts/self_check_submission.py <dir> --pr-author <login> --mark-self-checked`,不要手改 `validation_claim.readiness_contract`/`self_check.json` 的字段值去"凑合法"——包括不要照抄旧文档、旧包或直觉写出的 `participant-reviewed` 之类取值,唯一受支持的值就是 `persisted-self-check-v1`,且必须由自检工具写入,不是手填 |
| **0.2.x 迁移未过** | 报错含 `new manifests must adopt schema_version 0.2.x`,或 `published schema blocking: ... role ... must be one of [...]`/`role_detail`(见本文 §6) | manifest 是 `added`/`copied`/`renamed` 状态时必须先跑 `validate_manifest_schema.py` 看 `legacy_role_findings`,再决定手改还是重新 scaffold;`role` 只能落在 27 词表或 `other`+`role_detail`,自定义验证声明放 `validation_claim.extensions.x-*`,不要塞进 `files[]` 条目 |
| **PNG 解码预算超限** | 报错含 `invalid PNG` 且原因文案是 `IHDR dimensions exceed the safe decoding limit` 或 `IDAT stream expands beyond the IHDR dimensions`(`png_integrity_result()`,`validate_submission.py:768-949`,commit `298500d70` 2026-08-19 新增);常见误判方向是以为报错指向的那一张图坏了或太大,其实单张常常不大,撞的是**整包所有 PNG 累计**共享的 1024 MiB 解码预算(`MAX_TOTAL_PNG_INFLATED_BYTES`,`:307`),不是单张 128 MiB 上限(`MAX_PNG_INFLATED_BYTES`,`:306`)(见本文 §13) | 按需要降分辨率或减少同批次高分辨率大图张数,不要重新导出"同样大小"的图再试;先用 §13 的估算脚本按 IHDR 宽高预估解码体积再决定要不要精简 |
| **手写包结构错位** | 症状是同一份 manifest/self_check/matrix 里**大量**字段名系统性对不上契约(比如整份用 `manifest_version`/`artifacts`/`type` 而不是官方的 `schema_version`/`files`/`role`;`self_check.checks` 写成对象不是数组);错误条数常常一次性几十到几百条,且集中在少数几个文件 | 与其逐条对错误清单改,不如重跑 `python3 scripts/scaffold_ai_submission.py <login> <slug>` 生成空骨架,再把已有内容(proposal 正文、图纸、图片)原样搬进新骨架——实测比逐条修复系统性错位快得多,四门校验(SPATIAL/VISUAL/PROFESSIONAL/DETERMINISTIC)直接从新骨架起步全绿 |
| **越界(改动跑出自己目录)** | 若 PR 改动的路径**全部**不在 `submissions/` 下(比如整包错放到仓库根目录),`is_non_submission_pr()` 返回 True(`github_pr_validation.py:464-485`),CI 只贴一条"non-submission code/docs/test PR; participant package validation was not applicable"的信息性评论——**这条看起来友好的绿色评论恰恰意味着你的包从未被当作投稿校验过、也不会进入评审队列**;若改动确实在 `submissions/` 下但混了别人目录或跨了多个目录,`is_review_queue_candidate()` 返回 False(要求单一 `submissions/<pr-author>/<slug>/` 根,`:443-462`),包会被正常校验但排不进评审队列 | 提交前自查 `gh pr diff <PR> --name-only`,确认全部路径都以 `submissions/<你的登录名>/<你的 slug>/` 开头且只有这一个根目录;误放到仓库根或混了他人目录要重新开分支只放自己目录的改动,不要在同一 PR 里裹带任何仓库根文件 |
| **分支严重落后 main** | PR 改动路径都在自己目录下、内容看起来正常,却一次性报出几十到上百条互不相关的错误(哈希失配、字段缺失、schema 版本不对等混杂,彼此看不出共同原因);`gh api repos/open-city-ai/haidian/compare/main...<head_sha>` 的 `behind_by` 达到三位数以上提交 | 不要逐条对错误清单改——绝大多数是下游症状,根因是校验器实际检出的树上找不到你包文件对应的历史版本;备份自己的投稿目录,从最新 `upstream/main` 开一个新分支,把投稿目录整个复制回去再提交,不要在陈旧分支上直接 rebase/merge 硬解决(冲突量可能同样巨大) |
| **CI 基础设施抖动** | `gh api .../commits/<head_sha>/check-runs` 返回 `total_count: 0` 且 `check-suites` 的 `conclusion` 是 `failure`/`cancelled`,同时最近若干次同一 workflow 的其它运行大多数 `conclusion: success` 且带真实 job 数(说明不是普遍故障,是这一次调度或队列抖动);或 run 本身 `conclusion: cancelled` 且耗时接近 `timeout-minutes` 上限(队列排队超时) | 不要立刻推新 commit 去"重试"——先用 `gh run list --workflow=submission-validation.yml --limit 20` 确认基础设施整体是否恢复;确认某次 run 已经真正终止(`status: completed`)且距今数小时以上仍是 0 job,再推新 head 触发新一轮校验;高峰期本身会排队是设计如此(`concurrency: group: submission-validation-api, queue: max`),不是故障,不要频繁轮询或空评论催促 |


---

## 2026-08-20 时效性增补说明

本文件在原有内容基础上做了一次时效性核实与增补,核实基准为当前 `main`(`e289e4abc`,2026-08-20)。增补内容:

- 新增 **§13 PNG 解码预算**,对应 commit `298500d70`(2026-08-19 合并)新增的 PNG 结构完整性 + 解码体积校验;
- CI 速查表新增 **PNG 解码预算超限**、**分支严重落后 main** 两个根因类别(原六类扩到八类);
- CI 速查表"契约缺口(readiness/self_check)"一行补上了 `readiness_contract` 当前唯一合法值 `persisted-self-check-v1` 与实测常见错误取值 `participant-reviewed`;
- §8 补充说明 PR #1689(2026-08-20 合并)已经把 Issue #1631 第 3 项提到的"双语产物同字节"盲区补上了 warning 级检查,不再是未覆盖状态。

未改动原有 6 处必改章节(第一~五节)、§4.2 衔接说明、§6/§7/§9/§10/§11/§12 正文——均已核实仍然成立,不存在因这几天新提交产生的偏差。核实过程未对仓库执行任何写操作,仅使用 `gh api` 只读端点。
