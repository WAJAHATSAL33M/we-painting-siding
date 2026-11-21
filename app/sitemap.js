import {allServices} from './data/service-pages';
import locations from './data/locations.json';
import {getPosts} from './lib/wps-store';
export const dynamic = 'force-dynamic';
import policies from './data/support-pages.json';
export default function sitemap(){const posts=getPosts('published');const paths=['/','/about','/contact','/exterior-painting','/interior-painting','/our-work','/blog','/faq','/locations','/sitemap',...allServices.map(s=>s.path),...locations.map(s=>'/locations/'+s.slug),...posts.map(s=>'/blog/'+s.slug),...policies.map(s=>'/'+s.slug)];return [...new Set(paths)].map(path=>({url:'https://wepaintsiding.com'+path}))}
