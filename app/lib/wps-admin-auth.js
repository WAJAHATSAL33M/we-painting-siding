import { createHash, timingSafeEqual } from 'node:crypto';

const initialPasswordHash = '0a82e44e30a5cce1c5ee34da9ced136ad17e8c65c5f7e68262c3269d8b423146';

export function isWpsAdmin(headers) {
  const authorization = headers.get('authorization') || '';
  const token = /^Basic ([A-Za-z0-9+/]{1,400}={0,2})$/i.exec(authorization)?.[1];
  if (!token) return false;

  const credentials = Buffer.from(token, 'base64').toString('utf8');
  if (!credentials.startsWith('admin:')) return false;

  const digest = process.env.WPS_ADMIN_PASSWORD_HASH ?? initialPasswordHash;
  if (!/^[a-f0-9]{64}$/i.test(digest)) return false;
  const actual = createHash('sha256').update(credentials.slice('admin:'.length)).digest();
  return timingSafeEqual(actual, Buffer.from(digest, 'hex'));
}

export function wpsAdminChallenge() {
  return new Response('Admin sign-in required.', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="We Paint Siding Admin", charset="UTF-8"',
      'Cache-Control': 'private, no-store',
      'X-Robots-Tag': 'noindex, nofollow',
    },
  });
}
