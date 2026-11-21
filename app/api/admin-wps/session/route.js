import { cookies } from 'next/headers';
import { adminCookie, adminCookieOptions, checkAdminPassword, endAdminSession, startAdminSession } from '../../../lib/wps-admin-auth';

const attempts = new Map();
const route = '/admin-wps';
const back = (suffix = '') => new Response(null, { status: 303, headers: {
  Location: route + suffix, 'Cache-Control': 'private, no-store',
} });

export async function POST(request) {
  const origin = request.headers.get('origin');
  const host = request.headers.get('x-forwarded-host') || request.headers.get('host');
  if (request.headers.get('sec-fetch-site') === 'cross-site' ||
      (origin && URL.canParse(origin) && new URL(origin).host !== host) ||
      !request.headers.get('content-type')?.startsWith('application/x-www-form-urlencoded')) {
    return new Response('Invalid request.', { status: 403 });
  }
  const reader = request.body?.getReader();
  if (!reader) return back('?error=credentials');
  const decoder = new TextDecoder();
  let encoded = '';
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    encoded += decoder.decode(value, { stream: true });
    if (encoded.length > 4096) {
      await reader.cancel();
      return new Response('Request too large.', { status: 413 });
    }
  }
  const form = new URLSearchParams(encoded + decoder.decode());
  const jar = await cookies();
  const token = jar.get(adminCookie)?.value;
  if (form.get('action') === 'logout') {
    endAdminSession(token);
    jar.set(adminCookie, '', { ...adminCookieOptions, maxAge: 0 });
    return back();
  }
  const now = Date.now();
  for (const [key, entry] of attempts) {
    if (entry.expires <= now) attempts.delete(key);
  }
  const ip = request.headers.get('x-forwarded-for')?.split(',').at(-1)?.trim() || 'unknown';
  const attempt = attempts.get(ip) || { count: 0, expires: now + 10 * 60 * 1000 };
  if (attempt.count >= 10 || (!attempts.has(ip) && attempts.size >= 2000)) return back('?error=limit');
  if (!checkAdminPassword(form.get('username')?.trim(), form.get('password'))) {
    attempt.count++;
    attempts.set(ip, attempt);
    return back('?error=credentials');
  }
  attempts.delete(ip);
  endAdminSession(token);
  jar.set(adminCookie, startAdminSession(), adminCookieOptions);
  return back();
}
