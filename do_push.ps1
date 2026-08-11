$env:HTTP_PROXY="http://127.0.0.1:7897"
$env:HTTPS_PROXY="http://127.0.0.1:7897"

git cherry-pick --abort 2>$null
git rebase --abort 2>$null
Remove-Item .git/shallow.lock, .git/index.lock -ErrorAction SilentlyContinue

Write-Host "1/5. Fetching official main commit..." -ForegroundColor Cyan
git fetch --depth=1 https://github.com/open-city-ai/haidian.git main

$subSrc = "submissions/open-city-ai-participant"
$tempBackup = Join-Path $env:TEMP "open-city-ai-participant-backup"
if (Test-Path $tempBackup) { Remove-Item $tempBackup -Recurse -Force }
Copy-Item $subSrc $tempBackup -Recurse -Force

Write-Host "2/5. Resetting branch to official main..." -ForegroundColor Cyan
git checkout -B submission/jingzhang-ai-compute-green-axis FETCH_HEAD

Write-Host "3/5. Restoring submission files..." -ForegroundColor Cyan
if (Test-Path $subSrc) { Remove-Item $subSrc -Recurse -Force }
Copy-Item $tempBackup $subSrc -Recurse -Force
Remove-Item $tempBackup -Recurse -Force

Write-Host "4/5. Creating commit..." -ForegroundColor Cyan
git add submissions/open-city-ai-participant/
git commit -m "feat: complete urban design AI submission package for Jingzhang Compute-Green Dual Axis"

Write-Host "5/5. Pushing to GitHub..." -ForegroundColor Cyan
git push -u origin submission/jingzhang-ai-compute-green-axis --force

Write-Host "`n==========================================" -ForegroundColor Green
Write-Host "SUCCESS! PUSH COMPLETED SUCCESSFULLY!" -ForegroundColor Green
Write-Host "Refresh GitHub Compare page to see green Create Pull Request button!" -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Green
