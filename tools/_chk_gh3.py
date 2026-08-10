import urllib.request, json
prev='14bce12f'
new=[]
page=1
while True:
    url=f'https://api.github.com/repos/open-city-ai/haidian/commits?sha=main&per_page=100&page={page}'
    req=urllib.request.Request(url,headers={'User-Agent':'Mozilla/5.0'})
    b=urllib.request.urlopen(req,timeout=25).read()
    data=json.loads(b)
    if not data:
        break
    found=False
    for c in data:
        h=c['sha'][:7]
        if h==prev:
            found=True
            break
        new.append((h,c['commit']['author']['date'][:10],c['commit']['message'].split('\n')[0]))
    if found or len(data)<100:
        break
    page+=1
print('total new commits since',prev,':',len(new))
# summary of PR merges
import re
prs=set(re.findall(r'#(\d+)', ' '.join(s for _,_,s in new)))
print('涉及 PR 数：',len(prs))
# count by date
from collections import Counter
dates=Counter(d for _,d,_ in new)
print('按日期分布：',dict(dates))
# newest 20
print('--- 最新 20 条 ---')
for h,d,s in new[:20]:
    print(h,'|',d,'|',s)
