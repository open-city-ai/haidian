import subprocess
import sys

sub_dir = r"submissions/open-city-ai-participant/jingzhang-ai-compute-green-axis"

py_exe = sys.executable
res = subprocess.run([py_exe, "scripts/finalize_submission.py", sub_dir], capture_output=True, text=True, encoding="utf-8")

print("--- FINALIZE STDOUT ---")
print(res.stdout)
print("--- FINALIZE STDERR ---")
print(res.stderr)
print("FINALIZE RETURN CODE:", res.returncode)
