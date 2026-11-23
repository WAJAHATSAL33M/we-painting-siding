import { categorySitemap } from '../../lib/public-sitemap';

export const dynamic = 'force-dynamic';

export async function GET(_request, { params }) {
  return categorySitemap((await params).category);
}
