import {sitemapXmlResponse, lastmodFor} from '../lib/sitemap-xml';
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export async function GET(){
  const paths = ['/', '/about', '/contact', '/our-work', '/faq', '/warranty', '/sitemap'];
  return sitemapXmlResponse(paths.map((path) => ({path, lastmod: lastmodFor(path)})));
}
