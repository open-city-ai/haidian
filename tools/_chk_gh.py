import urllib.request, json
url='https://api.github.com/repos/open-city-ai/haidian/commits?sha=main&per_page=10'
req=urllib.request.Request(url,headers={'User-Agent':'Mozilla/5.0'})
try:
    b=urllib.request.urlopen(req,timeout=25).read()
    data=json.loads(b)
    for c in data:
        print(c['sha'][:7],'|',c['commit']['author']['date'][:10],'|',c['commit']['message'].split('\n')[0])
except Exception as e:
    print('ERR',e)
