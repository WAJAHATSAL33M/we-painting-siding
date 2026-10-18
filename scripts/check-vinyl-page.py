"""Validate the built ten-section pilot and site-wide exterior catalogue.
Checks generated HTML and CSS; does not claim browser/device visual QA.
"""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit,unquote
import json,sys
ROOT=Path(__file__).resolve().parents[1]
class Node:
 def __init__(self,tag='',attrs=()):self.tag,self.attrs,self.children=tag,dict(attrs),[]
 def all(self,tag=None,**attrs):
  out=[]
  for n in self.children:
   if isinstance(n,Node):
    if (tag is None or n.tag==tag) and all(n.attrs.get(k)==v for k,v in attrs.items()):out.append(n)
    out+=n.all(tag,**attrs)
  return out
 def text(self):return ''.join(n.text() if isinstance(n,Node) else n for n in self.children)
class Parser(HTMLParser):
 def __init__(self,s):super().__init__();self.root=Node();self.stack=[self.root];self.feed(s)
 def handle_starttag(self,t,a):
  n=Node(t,a);self.stack[-1].children.append(n)
  if t not in {'area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr'}:self.stack.append(n)
 def handle_endtag(self,t):
  for i in range(len(self.stack)-1,0,-1):
   if self.stack[i].tag==t:self.stack=self.stack[:i];break
 def handle_data(self,d):self.stack[-1].children.append(d)
errors=[]
def check(ok,msg):
 if not ok:errors.append(msg)
built=ROOT/'.next/server/app'
pages={('/' if p.relative_to(built).as_posix()=='index.html' else '/'+p.relative_to(built).as_posix()[:-5]):Parser(p.read_text()).root for p in built.rglob('*.html')}
route='/exterior-painting/vinyl-siding-painting';doc=pages[route];main=doc.all('main')[0]
sections=[n for n in main.children if isinstance(n,Node) and n.tag=='section']
check(len(sections)==10,'Pilot has ten sections')
check(len(main.all('h1'))==1,'One H1')
check(len(main.all('details'))==6,'Six native FAQ disclosures')
check(len(main.all('form'))==1,'One project form')
check('Online enquiry delivery is not connected.' in main.text(),'Enquiry delivery remains honest')
check('Illustrative transformation concept' in main.text(),'Concept project image is labelled')
check(main.all('input',name='Service')[0].attrs.get('value')=='Vinyl Siding Painting','Draft retains service context')
for field in main.all('input')+main.all('textarea')+main.all('select'):
 if field.attrs.get('type')=='hidden' or field.attrs.get('name')=='website':continue
 check(bool(field.attrs.get('id')) and bool(main.all('label',**{'for':field.attrs.get('id')})),'Associated label for '+str(field.attrs.get('id')))
check(len(main.all('select')[0].all('option'))==27,'All 25 communities and fallback options')
check(doc.all('link',rel='canonical')[0].attrs['href']=='https://we-painting-siding.vercel.app'+route,'Pilot canonical')
graph=json.loads(doc.all('script',type='application/ld+json')[0].text())['@graph']
check(graph[0]['name']=='Vinyl Siding Painting','Service schema')
check(len(graph[1]['itemListElement'])==4,'Siding parent appears in structured breadcrumb')
known=set(json.loads(Path(sys.argv[1]).read_text())) if len(sys.argv)>1 else set()
links=0;images=set()
for path,page in pages.items():
 if path.startswith('/_'):continue
 ids=[n.attrs['id'] for n in page.all() if 'id' in n.attrs]
 check(len(ids)==len(set(ids)),path+': duplicate IDs')
 for a in page.all('a'):
  href=a.attrs.get('href','');u=urlsplit(href)
  if u.scheme or u.netloc:continue
  target=u.path or path
  check(target in pages,path+': missing internal destination '+href)
  if target in pages and u.fragment:check(bool(pages[target].all(id=unquote(u.fragment))),path+': missing anchor '+href)
  check('/exterior-painting/spray-painting' not in href and '/exterior-painting/exterior-window-door-painting' not in href,path+': retired service link '+href)
  links+=1
 for img in page.all('img'):
  src=img.attrs.get('src','');images.add(src)
  if src.startswith('/'):
   check((ROOT/'public'/src.lstrip('/')).is_file() or 'public'+src in known,path+': missing image '+src)
 catalogue=json.loads((ROOT/'app/data/exterior-service-links.json').read_text())
 header=page.all('header')[0] if page.all('header') else None
 if header:
  tree=[n for n in header.all('ul') if 'wps-exterior-tree' in n.attrs.get('class','')]
  check(bool(tree),path+': nested exterior menu exists')
  if tree:
   check(len(tree[0].all('a'))==10,path+': menu includes ten services')
   check(len(tree[0].all('ul'))==1 and len(tree[0].all('ul')[0].all('a'))==3,path+': siding has three nested children')
for s in catalogue:
 r='/exterior-painting/'+s['slug'];check(r in pages,'Service exists: '+r)
 if r in pages:
  p=pages[r];check(s['title'] in p.all('h1')[0].text(),'Service H1 matches '+r)
  check(p.all('link',rel='canonical')[0].attrs['href'].endswith(r),'Canonical matches '+r)
check('/exterior-painting/spray-painting' not in pages,'Retired spray route is removed')
check('/exterior-painting/exterior-window-door-painting' not in pages,'Combined window/door route is removed')
css=(ROOT/'app/exterior-painting/[service]/vinyl-page.css').read_text()
check('@media(max-width:899px)' in css and '@media(max-width:599px)' in css,'Tablet/mobile responsive breakpoints')
check('grid-template-columns:minmax(0,1fr)' in css,'Flexible stacked grids')
check('prefers-reduced-motion:reduce' in css,'Reduced motion rule')
check('height:100vh' not in css,'No viewport-height section constraints')
check('overflow:hidden' not in css.split('.vp-page .vp-form')[1].split('/* Responsive')[0],'Form content can grow')
print(json.dumps({'result':'failed' if errors else 'passed','html_pages':len(pages),'pilot_sections':len(sections),'internal_links_checked':links,'image_paths_checked':len(images),'visual_browser_testing':'unavailable; not claimed','errors':errors},indent=2));sys.exit(bool(errors))
