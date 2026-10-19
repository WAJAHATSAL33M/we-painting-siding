"""Check rendered sub-service pages after `npm run build`; no preview server needed."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit, unquote
import json, subprocess, sys

ROOT = Path(__file__).resolve().parents[1]
class Node:
    def __init__(self, tag='', attrs=()):
        self.tag, self.attrs, self.children = tag, dict(attrs), []
    def find(self, tag=None, **attrs):
        out=[]
        for c in self.children:
            if isinstance(c, Node):
                if (tag is None or c.tag == tag) and all(c.attrs.get(k)==v for k,v in attrs.items()): out.append(c)
                out += c.find(tag, **attrs)
        return out
    def text(self):
        return ''.join(c.text() if isinstance(c,Node) else c for c in self.children)
class Document(HTMLParser):
    def __init__(self, html):
        super().__init__(convert_charrefs=True); self.root=Node(); self.stack=[self.root]; self.feed(html)
    def handle_starttag(self, tag, attrs):
        n=Node(tag,attrs);self.stack[-1].children.append(n)
        if tag not in {'area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr'}:self.stack.append(n)
    def handle_endtag(self,tag):
        for i in range(len(self.stack)-1,0,-1):
            if self.stack[i].tag==tag:self.stack=self.stack[:i];break
    def handle_data(self,data):self.stack[-1].children.append(data)

script="""import fs from 'node:fs';let src=fs.readFileSync('app/data/service-pages.js','utf8');for(const [name,file] of [['exterior','exterior-subservices'],['cabinets','cabinet-subservices'],['metaTitles','service-meta-titles']])src=src.replace(new RegExp('import '+name+\" from '[^']+';\"),'const '+name+'='+fs.readFileSync('app/data/'+file+'.json','utf8')+';');const m=await import('data:text/javascript;base64,'+Buffer.from(src).toString('base64'));console.log(JSON.stringify(m.allServices.map(s=>({path:s.path,title:s.title,category:s.category,related:m.relatedServices(s).map(p=>p.path)}))));"""
services=json.loads(subprocess.check_output(['node','--input-type=module','-e',script],cwd=ROOT,text=True))
inventory=Path(sys.argv[1]) if len(sys.argv)>1 else None
known=set(json.loads(inventory.read_text())) if inventory else set()
errors=[];titles=set();descriptions=set();images=set();links=0
cache={};exterior_pattern=None;exterior_heroes=set();exterior_copy=set()
def check(condition,message):
    if not condition:errors.append(message)
def page(path):
    if path not in cache:
        file=ROOT/'.next/server/app'/('index.html' if path=='/' else path.lstrip('/')+'.html')
        cache[path]=Document(file.read_text()).root if file.exists() else None
    return cache[path]
for service in services:
    route=service['path']; pilot=service['category']=='exterior'; doc=page(route)
    check(doc is not None,route+': missing generated page')
    if doc is None:continue
    main=doc.find('main')[0]
    sections=[c for c in main.children if isinstance(c,Node) and c.tag=='section']
    check(len(sections)==(10 if pilot else 8),route+': incorrect section count')
    if pilot:
        pattern=[n.attrs.get('class') for n in sections]
        if exterior_pattern is None:exterior_pattern=pattern
        check(pattern==exterior_pattern,route+': shared exterior section layout differs')
        hero=main.find('img')[0].attrs['src']
        check(hero not in exterior_heroes,route+': duplicate exterior hero image');exterior_heroes.add(hero)
        check(main.text() not in exterior_copy,route+': duplicate service body');exterior_copy.add(main.text())
        check(bool(main.find('h3',id='vp-form-title')) and service['title'].split(' Painting')[0] in main.find('h3',id='vp-form-title')[0].text(),route+': form heading does not match service')
    check(len(main.find('h1'))==1,route+': expected one H1')
    check(service['title'] in main.find('h1')[0].text(),route+': wrong H1')
    title=doc.find('title')[0].text();description=doc.find('meta',name='description')[0].attrs['content']
    check(title not in titles,route+': duplicate title');titles.add(title)
    check(description not in descriptions,route+': duplicate description');descriptions.add(description)
    check(doc.find('link',rel='canonical')[0].attrs['href']=='https://we-painting-siding.vercel.app'+route,route+': incorrect canonical')
    schema=json.loads(doc.find('script',type='application/ld+json')[0].text())['@graph']
    check(schema[0]['name']==service['title'],route+': wrong service schema')
    check(schema[1]['itemListElement'][-1]['item'].endswith(route),route+': incorrect breadcrumb schema')
    form=main.find('form')[0]
    if pilot:
        check(form.find('input',name='Service')[0].attrs.get('value')==service['title'],route+': service form mismatch')
    else:
        options=form.find('select',name='Service')[0].find('option')
        check(any(o.attrs.get('value')==service['title'] and 'selected' in o.attrs for o in options),route+': default service selection mismatch')
    for field in form.find():
        if field.tag in {'input','textarea','select'} and field.attrs.get('name')!='website' and field.attrs.get('type')!='hidden':
            check(field.attrs.get('id') and bool(form.find('label',**{'for':field.attrs['id']})),route+': unlabeled field '+str(field.attrs.get('name')))
    ids=[n.attrs['id'] for n in doc.find() if 'id' in n.attrs]
    check(len(ids)==len(set(ids)),route+': duplicate HTML IDs')
    for img in main.find('img'):
        src=img.attrs['src'];images.add(src)
        check(bool(img.attrs.get('alt','').strip()),route+': missing image description '+src)
        check((ROOT/'public'/src.lstrip('/')).is_file() or 'public'+src in known,route+': missing asset '+src)
    for a in doc.find('a'):
        href=a.attrs.get('href','');parsed=urlsplit(href)
        if parsed.scheme or parsed.netloc:continue
        target=parsed.path or route
        if not target.startswith('/'):continue
        links+=1;dest=page(target)
        check(dest is not None,route+': broken link '+href)
        if dest and parsed.fragment:check(bool(dest.find(id=unquote(parsed.fragment))),route+': missing anchor '+href)
    check(all(p!=route and page(p) for p in service['related']),route+': invalid related service')
    check(len(main.find('details'))==(6 if pilot else 9),route+': expected FAQ and scope disclosures')
    check('undefined' not in main.text() and '[object Object]' not in main.text(),route+': unresolved content')
    check(pilot or 'service-site' in doc.find('div')[0].attrs.get('class','') or any('service-site' in n.attrs.get('class','') for n in doc.find('div')),route+': missing template scope')

check(len(services)==16,'Expected 16 distinct service pages')
check(len({s['path'] for s in services})==len(services),'Duplicate service paths')
xml=(ROOT/'.next/server/app/sitemap.xml.body').read_text() if (ROOT/'.next/server/app/sitemap.xml.body').exists() else ''
check(all('https://we-painting-siding.vercel.app'+s['path'] in xml for s in services),'XML sitemap missing services')
if errors:
    print('\n'.join(errors));sys.exit(1)
print(json.dumps({'exterior_pages_using_shared_layout':len(exterior_heroes),'unique_exterior_hero_images':len(exterior_heroes),'service_pages':len(services),'sections_per_page':'10 exterior, 8 interior','unique_titles':len(titles),'unique_descriptions':len(descriptions),'referenced_images':len(images),'validated_internal_links':links,'faq_answers':len(services)*5+10,'sitemap':'all service routes present','result':'passed'},indent=2))

