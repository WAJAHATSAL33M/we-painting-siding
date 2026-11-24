import {getPosts} from '../lib/wps-store';
import {sitemapXmlResponse} from '../lib/sitemap-xml';
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export async function GET(){
  const posts = getPosts('published');
  const urls = [{path: '/blog'}, ...posts.map((p) => ({path: '/blog/' + p.slug, lastmod: p.updated || '2026-10-12'}))];
  return sitemapXmlResponse(urls);
}
