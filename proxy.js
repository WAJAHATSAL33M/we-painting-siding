import { NextResponse } from 'next/server';
import { isWpsAdmin, wpsAdminChallenge } from './app/lib/wps-admin-auth';

export function proxy(request) {
  if (!isWpsAdmin(request.headers)) return wpsAdminChallenge();
  const response = NextResponse.next();
  response.headers.set('Cache-Control', 'private, no-store');
  response.headers.set('X-Robots-Tag', 'noindex, nofollow');
  return response;
}

export const config = { matcher: ['/admin-wps/:path*', '/api/admin-wps/:path*'] };
