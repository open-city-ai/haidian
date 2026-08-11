# 设置代理
$env:HTTP_PROXY="http://127.0.0.1:7897"
$env:HTTPS_PROXY="http://127.0.0.1:7897"
git config http.proxy http://127.0.0.1:7897
git config https.proxy http://127.0.0.1:7897

# 放弃任何中断的 cherry-pick 状态
git cherry-pick --abort 2>$null

Write-Host "1. Fetching official open-city-ai/haidian main branch..." -ForegroundColor Cyan
git fetch https://github.com/open-city-ai/haidian.git main

Write-Host "2. Backing up submission package..." -ForegroundColor Cyan
$subSrc = "submissions/open-city-ai-participant"
$tempBackup = [System.IO.Path]::GetTempPath() + "open-city-ai-participant-backup"
if (Test-Path $tempBackup) { Remove-Item $tempBackup -Recurse -Force }
Copy-Item $subSrc $tempBackup -Recurse -Force

Write-Host "3. Resetting to official main branch..." -ForegroundColor Cyan
git checkout -B pr-branch FETCH_HEAD

Write-Host "4. Restoring submission package into official repo..." -ForegroundColor Cyan
if (Test-Path $subSrc) { Remove-Item $subSrc -Recurse -Force }
Copy-Item $tempBackup $subSrc -Recurse -Force
Remove-Item $tempBackup -Recurse -Force

Write-Host "5. Committing submission package..." -ForegroundColor Cyan
git add submissions/open-city-ai-participant/
git commit -m "feat: complete urban design AI submission package for Jingzhang Compute-Green Dual Axis"

Write-Host "6. Force pushing to GongYanYu/haidian..." -ForegroundColor Cyan
git push -u origin pr-branch:submission/jingzhang-ai-compute-green-axis --force

Write-Host "`nSUCCESS! Refresh the GitHub Compare page now!" -ForegroundColor Green
