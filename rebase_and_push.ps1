$env:HTTP_PROXY="http://127.0.0.1:7897"
$env:HTTPS_PROXY="http://127.0.0.1:7897"
git config http.proxy http://127.0.0.1:7897
git config https.proxy http://127.0.0.1:7897

git cherry-pick --abort 2>$null
git rebase --abort 2>$null
Remove-Item .git/shallow.lock, .git/index.lock -ErrorAction SilentlyContinue

Write-Host "1/6. Fetching official main commit..." -ForegroundColor Cyan
git fetch https://github.com/open-city-ai/haidian.git main --depth=1

Write-Host "2/6. Aligning GongYanYu:main with official main..." -ForegroundColor Cyan
git push origin FETCH_HEAD:refs/heads/main --force

Write-Host "3/6. Backing up submission package..." -ForegroundColor Cyan
$subSrc = "submissions/open-city-ai-participant"
$tempBackup = Join-Path $env:TEMP "open-city-ai-participant-backup"
if (Test-Path $tempBackup) { Remove-Item $tempBackup -Recurse -Force }
Copy-Item $subSrc $tempBackup -Recurse -Force

Write-Host "4/6. Creating submission branch on official main..." -ForegroundColor Cyan
git checkout -B submission/jingzhang-ai-compute-green-axis FETCH_HEAD

Write-Host "5/6. Restoring submission files..." -ForegroundColor Cyan
if (Test-Path $subSrc) { Remove-Item $subSrc -Recurse -Force }
Copy-Item $tempBackup $subSrc -Recurse -Force
Remove-Item $tempBackup -Recurse -Force

Write-Host "6/6. Committing and pushing submission branch..." -ForegroundColor Cyan
git add submissions/open-city-ai-participant/
git commit -m "feat: complete urban design AI submission package for Jingzhang Compute-Green Dual Axis"
git push origin submission/jingzhang-ai-compute-green-axis --force

Write-Host "`n==========================================" -ForegroundColor Green
Write-Host "SUCCESS! Rebase and push completed!" -ForegroundColor Green
Write-Host "Open: https://github.com/open-city-ai/haidian/compare/main...GongYanYu:submission/jingzhang-ai-compute-green-axis" -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Green
