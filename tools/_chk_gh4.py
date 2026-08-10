import urllib.request, json
url='https://api.github.com/repos/open-city-ai/haidian/compare/14bce12f...main'
req=urllib.request.Request(url,headers={'User-Agent':'Mozilla/5.0'})
b=urllib.request.urlopen(req,timeout=20).read()
d=json.loads(b)
print('total_commits:', d.get('total_commits'))
print('ahead_by:', d.get('ahead_by'))
print('status:', d.get('status'))
