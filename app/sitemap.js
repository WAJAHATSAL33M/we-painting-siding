import { blogTerms } from './lib/blog-taxonomy';
import {allServices} from './data/service-pages';
import locations from './data/locations.json';
import {getPosts} from './lib/wps-store';
import {lastmodFor} from './lib/sitemap-xml';
export const dynamic = 'force-dynamic';
import policies from './data/support-pages.json';
export default function sitemap(){const posts=getPosts('published');const paths=['/','/about','/contact','/exterior-painting','/interior-painting','/our-work','/blog','/faq','/warranty','/locations','/sitemap',...allServices.map(s=>s.path),...locations.map(s=>'/locations/'+s.slug),...posts.map(s=>'/blog/'+s.slug),...['category','tag'].flatMap(kind=>Array.from(blogTerms(posts,kind).keys(),slug=>'/blog/'+kind+'/'+slug)),...policies.map(s=>'/'+s.slug)];const postLastmod={};posts.forEach(p=>{postLastmod['/blog/'+p.slug]=p.updated||'2026-10-12'});return [...new Set(paths)].map(path=>({url:'https://wepaintsiding.com'+path,lastModified:postLastmod[path]||lastmodFor(path)}))}
