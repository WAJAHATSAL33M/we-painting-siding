import policies from '../data/support-pages.json';
import {sitemapXmlResponse, lastmodFor} from '../lib/sitemap-xml';
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export async function GET(){
  const paths = policies.map((s) => '/' + s.slug);
  return sitemapXmlResponse(paths.map((path) => ({path, lastmod: lastmodFor(path)})));
}
