import urllib.request, hashlib
url='https://www.beijing.gov.cn/ywdt/gzdt/202605/t20260507_4639102.html'
req=urllib.request.Request(url,headers={'User-Agent':'Mozilla/5.0'})
b=urllib.request.urlopen(req,timeout=25).read()
print(len(b))
print(hashlib.sha256(b).hexdigest())
