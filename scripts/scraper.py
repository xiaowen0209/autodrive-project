#!/usr/bin/env python3
"""智驾研究台 - Scrapling 爬虫脚本 (百度搜索)"""
import sys, json, io, urllib.parse
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
from scrapling import Fetcher

def fetch_url(url):
    try:
        page = Fetcher.get(url, stealthy_headers=True)
        title = page.css('title::text').get() or page.css('h1::text').get() or ''
        desc = page.css('meta[name="description"]::attr(content)').get() or ''
        text = ' '.join(page.css('body ::text').getall()).strip()
        import re; text = re.sub(r'\s+', ' ', text)[:10000]
        return {'success': True, 'title': title.strip(), 'description': desc.strip(), 'text': text, 'url': url}
    except Exception as e:
        return {'success': False, 'error': str(e)}

def search_keyword(keyword, count=10):
    """百度搜索 - 国内搜索效果最好"""
    query = f'{keyword} 智能驾驶'
    url = f'https://www.baidu.com/s?wd={urllib.parse.quote(query)}&rn={count*2}'
    page = Fetcher.get(url, stealthy_headers=True)

    results, seen = [], set()
    for item in page.css('.result, .c-container'):
        if len(results) >= count: break
        link = item.css('h3 a')
        href = link.css('::attr(href)').get() or ''
        title = ' '.join(link.css(' ::text').getall()).strip()
        if not href or not title: continue
        if href in seen: continue
        snippet = ' '.join(item.css('.c-abstract ::text, .c-span-last ::text, .c-row ::text, p ::text').getall()).strip()
        seen.add(href)
        results.append({'title': title, 'url': href, 'snippet': snippet, 'source': _detect_source(href + ' ' + title)})
    return {'success': True, 'results': results, 'keyword': keyword, 'engine': 'baidu'}

def analyze_url(url):
    r = fetch_url(url)
    if not r['success']: return r
    t = r['text']; title = r['title']
    brands = [b for b, ks in {
        '华为ADS':['华为','ADS','问界'],'小鹏XNGP':['小鹏','XNGP'],'特斯拉FSD':['特斯拉','FSD'],
        '理想AD Max':['理想','AD Max'],'小米智驾':['小米','SU7'],'地平线HSD':['地平线','HSD'],
        '比亚迪':['比亚迪','BYD','天神之眼']
    }.items() if any(k in t for k in ks)]
    import re
    return {'success':True,'url':url,'title':title,'analysis':{
        'type':'ota' if any(k in t for k in ['OTA','版本','推送','升级']) else 'test' if any(k in t for k in ['实测','测评','试驾']) else 'news',
        'brands':brands,'dates':list(set(re.findall(r'\d{4}[-/年]\d{1,2}[-/月]\d{1,2}',t)))[:5],
        'summary':t[:300],'keyPoints':[s.strip() for s in re.split(r'[。！？]',t) if len(s)>15][:5]
    }}

def _detect_source(url):
    for k,v in {'36kr.com':'36氪','dongchedi.com':'懂车帝','autohome.com.cn':'汽车之家',
                'd1ev.com':'第一电动','zhihu.com':'知乎','jiemian.com':'界面',
                'gasgoo.com':'盖世汽车','xcar.com.cn':'爱卡','ithome.com':'IT之家'}.items():
        if k in url: return v
    return '网页'

if __name__ == '__main__':
    if len(sys.argv)<2: print(json.dumps({'error':'Usage: scraper.py <fetch|search|analyze> [arg]'},ensure_ascii=False)); sys.exit(1)
    cmd=sys.argv[1]
    if cmd=='fetch' and len(sys.argv)>=3: r=fetch_url(sys.argv[2])
    elif cmd=='search' and len(sys.argv)>=3: r=search_keyword(sys.argv[2], int(sys.argv[3]) if len(sys.argv)>=4 else 10)
    elif cmd=='analyze' and len(sys.argv)>=3: r=analyze_url(sys.argv[2])
    else: r={'error':f'Unknown: {cmd}'}
    print(json.dumps(r,ensure_ascii=False))
