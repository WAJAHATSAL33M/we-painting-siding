import {allServices} from './data/service-pages';
import locations from './data/locations.json';
import posts from './data/blog-posts.json';
import policies from './data/support-pages.json';
export default function sitemap(){const paths=['/','/about','/contact','/exterior-painting','/interior-painting','/before-and-after','/blog','/faq','/locations','/sitemap',...allServices.map(s=>s.path),...locations.map(s=>'/locations/'+s.slug),...posts.map(s=>'/blog/'+s.slug),...policies.map(s=>'/'+s.slug)];return [...new Set(paths)].map(path=>({url:'https://we-painting-siding.vercel.app'+path}))}
