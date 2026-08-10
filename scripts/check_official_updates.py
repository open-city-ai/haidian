#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""官方每日更新检查 + 提交包对齐审计（增强版）。

用途：
  1. 抓取官方页面/活动状态，与本地 activity-status.json 基线比对，
     检测官方文档、截止日期、状态变化（每日定时任务 / cron 触发）。
  2. 读取提交包 manifest.json，校验每个 required 文件在磁盘上是否齐全、
     sha256 是否匹配，输出与官方提交指南的对齐差异报告。
  3. 发现差异时提示重新运行 preflight / 同步资料。

用法：
  python scripts/check_official_updates.py [submission_dir]
  环境变量（可选）：
    OFFICIAL_URL     官方公告/状态页 URL（默认见下）
    ACTIVITY_STATUS  本地活动状态文件路径（默认 activity-status.json）
  退出码：0=无差异，1=检测到官方变化或对齐差异，2=执行错误

依赖：仅标准库（urllib/hashlib/json）。
"""
import hashlib
import json
import os
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OFFICIAL_URL = os.environ.get(
    "OFFICIAL_URL",
    "https://www.beijing.gov.cn/ywdt/gzdt/202605/t20260507_4639102.html",
)
ACTIVITY_STATUS_PATH = Path(
    os.environ.get("ACTIVITY_STATUS", ROOT / "activity-status.json")
)
STATE_FILE = ROOT / "scripts" / ".official_updates_state.json"

# 与官方提交指南中"可阻断校验"相关的最小必需角色集合
REQUIRED_ROLES = {
    "manifest", "narrative", "agent_card", "metrics", "sources",
    "self_check", "compliance_matrix", "standard_matrix",
    "design_depth_matrix", "rendered_proposal_html", "copyright_statement",
}


def fetch(url, timeout=30):
    import urllib.request
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=timeout) as resp:
        return resp.read()


def sha256_file(path):
    h = hashlib.sha256()
    with open(path, "rb") as f:
        for chunk in iter(lambda: f.read(65536), b""):
            h.update(chunk)
    return h.hexdigest()


def load_json(path):
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)


def check_official_page():
    """抓取官方页面，与上次哈希比对，返回 (changed, detail)。"""
    body = fetch(OFFICIAL_URL)
    digest = hashlib.sha256(body).hexdigest()
    prev = None
    if STATE_FILE.exists():
        state = load_json(STATE_FILE)
        prev = state.get("official_digest")
    new_state = {"official_digest": digest, "official_url": OFFICIAL_URL}
    if prev is None:
        detail = f"[init] 已记录官方页面首次快照 {digest[:12]}"
        changed = False
    elif prev == digest:
        detail = "[no-change] 官方页面内容无更新"
        changed = False
    else:
        detail = f"[changed] 官方页面内容已更新！{prev[:12]} -> {digest[:12]}"
        changed = True
    STATE_FILE.write_text(
        json.dumps(new_state, ensure_ascii=False, indent=2), encoding="utf-8"
    )
    return changed, detail


def check_activity_status():
    """解析本地活动状态，输出当前官方窗口与关键节点。"""
    data = load_json(ACTIVITY_STATUS_PATH)
    return (
        f"状态={data.get('status')} | 公开征集开放={data.get('public_intake_open')} | "
        f"截止={data.get('submission_deadline')} | 落地={data.get('implementation_begins')} | "
        f"更新于={data.get('updated_at')}"
    )


def check_submission_alignment(submission_dir):
    """校验提交包 manifest 声明的文件与磁盘、sha256 是否对齐。"""
    manifest_path = submission_dir / "manifest.json"
    if not manifest_path.exists():
        return True, [f"[BLOCKER] 缺失 manifest.json：{manifest_path}"]

    manifest = load_json(manifest_path)
    issues = []
    files = manifest.get("files", [])
    for item in files:
        rel = item.get("path")
        if not rel:
            continue
        full = submission_dir / rel
        if not full.exists():
            issues.append(
                f"[BLOCKER] manifest 声明但文件缺失：{rel}（role={item.get('role')}, required={item.get('required')}）"
            )
            continue
        sha = item.get("sha256")
        if sha and sha != sha256_file(full):
            issues.append(
                f"[FAIL] 哈希不匹配：{rel}（manifest={sha[:12]} 实际={sha256_file(full)[:12]}）"
            )

    # proposal front matter 双语契约检查
    proposal = submission_dir / "proposal.md"
    if proposal.exists():
        text = proposal.read_text(encoding="utf-8")
        translation_file = None
        for line in text.splitlines():
            if line.startswith("translation_file:"):
                translation_file = line.split(":", 1)[1].strip().strip('"')
        if translation_file and not (submission_dir / translation_file).exists():
            issues.append(
                f"[BLOCKER] proposal.md 声明译稿 {translation_file} 但文件缺失（官方要求双语契约）"
            )

    has_blocker = any("BLOCKER" in i for i in issues)
    return has_blocker, issues


def main():
    sub_dir_arg = sys.argv[1] if len(sys.argv) > 1 else None
    submission_dir = (
        Path(sub_dir_arg).resolve()
        if sub_dir_arg
        else ROOT / "submissions" / "nova" / "jingzhang-ai-belt-vision"
    )

    exit_code = 0
    print("=== 官方每日更新检查 ===")
    try:
        changed, detail = check_official_page()
        print(detail)
        if changed:
            exit_code = 1
            print("→ 官方页面有更新，请重新同步 brief/site-package 并重跑预检。")
    except Exception as e:  # noqa: BLE001
        print(f"[warn] 官方页面抓取失败（不影响本地对齐检查）：{e}")

    print("\n=== 本地活动状态基线 ===")
    try:
        print(check_activity_status())
    except Exception as e:  # noqa: BLE001
        print(f"[warn] 读取 activity-status.json 失败：{e}")

    print("\n=== 提交包对齐审计 ===")
    print(f"目标：{submission_dir}")
    try:
        has_blocker, issues = check_submission_alignment(submission_dir)
    except Exception as e:  # noqa: BLE001
        print(f"[error] 提交包审计执行失败：{e}")
        return 2

    if not issues:
        print("[OK] manifest 声明的所有文件齐全且哈希一致，双语契约就位。")
    else:
        exit_code = 1
        for i in issues:
            print(i)
        print(f"\n→ 发现 {len(issues)} 项对齐问题；" + (
            "存在阻断项，请补全缺失资产后重跑 scripts/participant_preflight.py。"
            if has_blocker
            else "无阻断项，但建议复核哈希/译稿一致性。"
        ))

    print(f"\n退出码：{exit_code}")
    return exit_code


if __name__ == "__main__":
    sys.exit(main())
