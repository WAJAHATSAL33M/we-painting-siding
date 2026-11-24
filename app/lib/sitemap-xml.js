// Shared sitemap helpers: per-path lastmod dates and an XML sitemap response builder.
// Lastmod basis (24 Nov 2026): git commit dates of each route's source file, except blog
// posts, which use their own `updated` field from blog-posts.json (2026-10-12). Pages whose
// content changed in the Nov 2026 SEO batches carry 2026-11-24.
const ORIGIN = 'https://wepaintsiding.com';
export const LASTMOD_DEFAULT = '2026-11-24';
export const LASTMOD_BY_PATH = {
  '/our-work': '2026-11-21',
  '/privacy-policy': '2026-11-22',
  '/cookies-policy': '2026-11-22',
  '/disclaimer': '2026-11-22',
  '/terms-and-conditions': '2026-11-22',
  '/accessibility': '2026-11-22',
};
export function lastmodFor(path, fallback) {
  return LASTMOD_BY_PATH[path] || fallback || LASTMOD_DEFAULT;
}
export function sitemapXmlResponse(urls) {
  const body =
    '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    urls
      .map(
        (u) =>
          `  <url><loc>${ORIGIN}${u.path}</loc><lastmod>${u.lastmod || LASTMOD_DEFAULT}</lastmod></url>`,
      )
      .join('\n') +
    '\n</urlset>';
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
