"""Optional visual/interaction smoke tests. Requires Python Playwright + Chromium.
Uses locally injected page assets so tests can run even in an environment where
browser navigation to file:// and localhost is administratively restricted.
"""
import json
from pathlib import Path
from playwright.sync_api import sync_playwright

ROOT=Path(__file__).resolve().parents[1]
DOCS=ROOT/'docs'
EVIDENCE=ROOT/'evidence'
EVIDENCE.mkdir(exist_ok=True)
report={'date':'2026-11-23','platform':'Chromium via Python Playwright, static HTML/CSS/JS injection','checks':[]}

def verify(name,ok,detail):
    report['checks'].append({'name':name,'passed':bool(ok),'detail':detail})
    if not ok: print('FAIL',name,detail)

def load_page(browser,name,width,height):
    page=browser.new_page(viewport={'width':width,'height':height})
    errors=[]
    page.on('pageerror',lambda err:errors.append(str(err)))
    page.set_content((DOCS/(name+'.html')).read_text(encoding='utf-8'),wait_until='domcontentloaded')
    page.add_style_tag(content=(DOCS/'style.css').read_text(encoding='utf-8'))
    if name in ('wiki','slides'):
        page.add_script_tag(content=(DOCS/'data.js').read_text(encoding='utf-8'))
        page.add_script_tag(content=(DOCS/('site.js' if name=='wiki' else 'slides.js')).read_text(encoding='utf-8'))
    return page,errors

with sync_playwright() as p:
    browser=p.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox'])
    for name in ['index','wiki','slides','workflow']:
        page,errors=load_page(browser,name,1440,900)
        if name=='slides':
            verify('14 slides in data',len(page.evaluate('window.WIKI_DATA.slides'))==14,'slide data array')
            verify('next button advances',page.locator('.slide').count()==1,'initial slide visible')
            page.locator('#next-slide').click()
            verify('next button advances',page.locator('#slide-num').inner_text()=='02','after clicking next, index is 02')
            for idx in range(14):
                page.locator(f'.progress-dot[data-slide-index="{idx}"]').click()
                sourcecount=page.locator('.slide .sources a').count()-1
                expected=page.evaluate('(idx)=>window.WIKI_DATA.slides[idx].sources.length',idx)
                verify('slide source links %02d'%(idx+1),sourcecount==expected,f'{sourcecount} matches expected {expected}')
                if idx==5:
                    page.screenshot(path=str(EVIDENCE/'slide-rag-pipeline.png'))
            page.locator('.progress-dot[data-slide-index="12"]').click()
            page.locator('[data-quiz-index="1"]').click()
            verify('interactive quiz', '答對了' in page.locator('.quiz-result').inner_text(),'correct answer reveals feedback')
            page.screenshot(path=str(EVIDENCE/'slide-quiz.png'))
        if name=='wiki':
            verify('wiki renders',page.locator('#wiki-article h1').count()==1,'concept header is rendered')
            page.locator('#wiki-search').fill('RAG')
            verify('wiki keyword search',page.locator('#concept-links a').count()>0,'at least one matching Wiki concept')
            page.locator('#wiki-search').fill('')
            page.locator('#source-links a').first.click()
            page.wait_for_function("document.querySelector('#wiki-article h1')?.textContent?.includes('Attention')",timeout=3000)
            verify('wiki source details', 'Attention' in page.locator('#wiki-article h1').inner_text(),'source detail opens')
        if name=='workflow':
            verify('workflow six nodes',page.locator('.flow-node').count()==6,'six process nodes')
            page.screenshot(path=str(EVIDENCE/'workflow-graph.png'))
        if name=='index':page.screenshot(path=str(EVIDENCE/'website-home.png'))
        verify('desktop horizontal overflow '+name,page.evaluate('document.documentElement.scrollWidth <= innerWidth'),'1440px desktop')
        verify('JavaScript errors desktop '+name,len(errors)==0,str(errors))
        page.close()
    for name in ['index','wiki','slides','workflow']:
        page,errors=load_page(browser,name,390,844)
        if name=='slides':page.locator('.progress-dot[data-slide-index="5"]').click()
        actual=page.evaluate('document.documentElement.scrollWidth')
        verify('mobile horizontal overflow '+name,actual<=390,f'scrollWidth={actual}px, viewport=390px')
        verify('JavaScript errors mobile '+name,len(errors)==0,str(errors))
        if name=='slides':page.screenshot(path=str(EVIDENCE/'slide-mobile-rag.png'))
        page.close()
    browser.close()
report['passed']=all(x['passed'] for x in report['checks'])
report['check_count']=len(report['checks'])
(ROOT/'logs'/'browser-check.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print(('PASS' if report['passed'] else 'FAIL'),f"| {report['check_count']} browser assertions | desktop + 390px mobile")
if not report['passed']:raise SystemExit(1)
