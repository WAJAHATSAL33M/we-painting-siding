import locations from '../data/locations.json';
import {sitemapXmlResponse, lastmodFor} from '../lib/sitemap-xml';
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export async function GET(){
  const paths = ['/locations', ...locations.map((s) => '/locations/' + s.slug)];
  return sitemapXmlResponse(paths.map((path) => ({path, lastmod: lastmodFor(path)})));
}
