import urllib.request, json
url='https://api.github.com/repos/open-city-ai/haidian/commits?sha=main&per_page=100'
req=urllib.request.Request(url,headers={'User-Agent':'Mozilla/5.0'})
b=urllib.request.urlopen(req,timeout=25).read()
data=json.loads(b)
prev='14bce12f'
new=[]
for c in data:
    h=c['sha'][:7]
    if h==prev:
        break
    new.append((h,c['commit']['author']['date'][:10],c['commit']['message'].split('\n')[0]))
print('total new commits since',prev,':',len(new))
for h,d,s in new:
    print(h,'|',d,'|',s)
