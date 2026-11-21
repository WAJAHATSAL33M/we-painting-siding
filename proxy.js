import { NextResponse } from 'next/server';

const publicOrigin = 'https://wepaintsiding.com';

export function proxy(request) {
  const response = NextResponse.next();
  const { pathname } = request.nextUrl;

  if (/^\/(?:admin-wps|api\/admin-wps|images\/admin)(?:\/|$)/.test(pathname)) {
    response.headers.set('Cache-Control', 'private, no-store');
    response.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive, noimageindex');
  } else if (/^\/(?:[a-z0-9-]+(?:\/[a-z0-9-]+)?)?$/.test(pathname)) {
    response.headers.set('Link', '<' + publicOrigin + pathname + '>; rel="canonical"');
  }

  return response;
}

export const config = {
  matcher: [
    '/admin-wps/:path*', '/api/admin-wps/:path*', '/images/admin/:path*',
    '/', '/about', '/contact', '/exterior-painting', '/interior-painting',
    '/locations', '/blog', '/blog/:slug', '/sitemap', '/privacy-policy',
    '/cookies-policy', '/disclaimer', '/terms-and-conditions', '/accessibility',
  ],
};
