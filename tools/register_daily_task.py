#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""注册每日官方更新检查的 Windows 计划任务（一次性脚本，注册后可删除）。
每日 09:00 自动运行 tools/daily_official_updates.py。
"""
import subprocess
import sys

PY = r"C:\Users\Administrator\AppData\Local\Programs\Python\Python314\python.exe"
SCRIPT = r"D:\Nova\haidian-full-2\tools\daily_official_updates.py"

task_name = "NovaDailyOfficialCheck"
task_run = f'"{PY}" -X utf8 "{SCRIPT}"'

cmd = [
    "schtasks", "/Create", "/TN", task_name, "/TR", task_run,
    "/SC", "DAILY", "/ST", "09:00", "/F",
]
r = subprocess.run(cmd, capture_output=True, text=True, encoding="utf-8", errors="replace")
print(r.stdout)
print(r.stderr)
sys.exit(r.returncode)
