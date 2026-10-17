"""Verify the built pilot page's structure, links, SEO and responsive CSS contracts.
This is not a substitute for browser/device visual testing.
"""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit, unquote
import json, re, sys

ROOT=Path(__file__).resolve().parents[1]
class Node:
    def __init__(self,tag='',attrs=()):self.tag,self.attrs,self.children=tag,dict(attrs),[]
    def all(self,tag=None,**attrs):
        result=[]
        for n in self.children:
            if isinstance(n,Node):
                if (tag is None or tag==n.tag) and all(n.attrs.get(k)==v for k,v in attrs.items()):result.append(n)
                result+=n.all(tag,**attrs)
        return result
    def text(self):return ''.join(n.text() if isinstance(n,Node) else n for n in self.children)
class Parser(HTMLParser):
    def __init__(self,html):
        super().__init__();self.root=Node();self.stack=[self.root];self.feed(html)
    def handle_starttag(self,tag,attrs):
        n=Node(tag,attrs);self.stack[-1].children.append(n)
        if tag not in {'area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr'}:self.stack.append(n)
    def handle_endtag(self,tag):
        for i in range(len(self.stack)-1,0,-1):
            if self.stack[i].tag==tag:self.stack=self.stack[:i];break
    def handle_data(self,data):self.stack[-1].children.append(data)

route='/exterior-painting/vinyl-siding-painting'
directory=ROOT/'.next/server/app'
doc=Parser((directory/(route.lstrip('/')+'.html')).read_text()).root
main=doc.all('main')[0];errors=[];tested_links=0
def check(test,detail):
    if not test:errors.append(detail)
sections=[n for n in main.children if isinstance(n,Node) and n.tag=='section']
check(len(sections)==5,'The pilot must have five sections')
check(len(main.all('h1'))==1,'Exactly one H1')
check('Vinyl Siding Painting' in main.all('h1')[0].text(),'Service-specific H1')
check(len(main.all('details'))==5,'Five accessible native FAQ disclosures')
check(all(n.all('summary') for n in main.all('details')),'Every FAQ needs a summary')
ids=[n.attrs['id'] for n in doc.all() if 'id' in n.attrs]
check(len(ids)==len(set(ids)),'No duplicate IDs')
check('Online enquiry delivery is not connected yet' in main.text(),'Honest enquiry status')
check(not any(s in main.text() for s in ['undefined','[object Object]','Lorem ipsum']),'No unresolved content')
check(len(main.all('form'))==1,'One service-specific project form')
check(main.all('input',name='Service')[0].attrs.get('value')=='Vinyl Siding Painting','Draft retains service context')
for field in main.all('input')+main.all('textarea')+main.all('select'):
    if field.attrs.get('type')=='hidden' or field.attrs.get('name')=='website':continue
    check(bool(field.attrs.get('id')) and bool(main.all('label',**{'for':field.attrs.get('id')})),'Visible form control has an associated label')
check(len(main.all('select')[0].all('option'))==27,'All 25 communities and fallback options are present')
check('Southern Ontario' in main.all('h1')[0].text(),'Location-specific H1')
check(doc.all('link',rel='canonical')[0].attrs['href']=='https://we-painting-siding.vercel.app'+route,'Canonical retains existing URL')
graph=json.loads(doc.all('script',type='application/ld+json')[0].text())['@graph']
check(graph[0]['name']=='Vinyl Siding Painting','Service structured data')
check(graph[1]['itemListElement'][-1]['item'].endswith(route),'Breadcrumb structured data')
for img in main.all('img'):
    check(bool(img.attrs.get('alt')),'Image needs descriptive alternative text')
    check((ROOT/'public'/img.attrs['src'].lstrip('/')).is_file(),'Pilot image must exist locally: '+img.attrs['src'])
    check(img.attrs.get('width') and img.attrs.get('height'),'Image dimensions reduce layout shift')
check(sum(n.attrs.get('fetchpriority')=='high' for n in main.all('img'))==1,'Only hero image loads at high priority')
for a in main.all('a'):
    value=a.attrs.get('href','');u=urlsplit(value)
    if u.scheme or u.netloc:continue
    target=u.path or route
    file=directory/('index.html' if target=='/' else target.lstrip('/')+'.html')
    check(file.is_file(),'Internal destination exists: '+value)
    if file.is_file() and u.fragment:
        destination=doc if target==route else Parser(file.read_text()).root
        check(bool(destination.all(id=unquote(u.fragment))),'Anchor exists: '+value)
    tested_links+=1

# Check that the pilot is the only route using this design.
for name in ['spray-painting','brick-painting','aluminum-painting','siding-painting']:
    other=(directory/('exterior-painting/'+name+'.html')).read_text()
    check('ip-detail' in other and 'vl-hero-grid' not in other,'Other service layout is preserved: '+name)

css=(ROOT/'app/exterior-painting/[service]/vinyl-page.css').read_text()
check('@media(max-width:899px)' in css and '@media(max-width:599px)' in css,'Tablet and mobile breakpoints')
tablet=css.split('@media(max-width:899px)',1)[1].split('@media(max-width:599px)',1)[0]
check(all('.vl-page '+name in tablet for name in ['.vl-hero-grid','.vl-service-grid','.vl-quote-grid','.vl-faq-grid','.vl-section-heading']),'All main grids collapse on tablet')
check('grid-template-columns:minmax(0,1fr)' in tablet,'Stacked grids can shrink without min-content overflow')
mobile=css.split('@media(max-width:599px)',1)[1]
check('.vl-page .vl-hero-actions>.ah-button{width:100%' in mobile,'Mobile CTA fills available width')
check('prefers-reduced-motion:reduce' in css,'Reduced motion supported')
check('min-height:44px' in css,'Text links provide touch targets')
check(not re.search(r'(?<![-\w])(?:min-width|width):[3-9]\d\dpx',css),'No rigid wide content widths')
widths=[320,360,390,430,600,768,820,900,1024,1280,1440,1920]
for width in widths:
    gutter=max(24,min(width*.034,64));inner=min(width,1760)-2*gutter
    main_columns=1 if width<=899 else 2
    gap=max(30,min(width*.04,64))
    column=inner if main_columns==1 else (inner-gap)/2
    check(column>=260,'Readable available content width at '+str(width))
result={'result':'failed' if errors else 'passed','sections':len(sections),'faqs':len(main.all('details')),'checked_internal_links':tested_links,'responsive_css_widths':widths,'visual_browser_test':'unavailable; not claimed','errors':errors}
print(json.dumps(result,indent=2));sys.exit(bool(errors))
