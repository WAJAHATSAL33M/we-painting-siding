import { sitemapIndex } from '../lib/public-sitemap';

export function GET() {
  return sitemapIndex();
}
