import {allServices} from '../data/service-pages';
import {sitemapXmlResponse, lastmodFor} from '../lib/sitemap-xml';
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export async function GET(){
  const paths = ['/interior-painting', ...allServices.filter((s) => s.category === 'interior').map((s) => s.path)];
  return sitemapXmlResponse([...new Set(paths)].map((path) => ({path, lastmod: lastmodFor(path)})));
}
