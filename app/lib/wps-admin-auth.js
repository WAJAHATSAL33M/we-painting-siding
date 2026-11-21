import { createHash, randomBytes, timingSafeEqual } from 'node:crypto';
import { wpsStore } from './wps-store';

const initialPasswordHash = '0a82e44e30a5cce1c5ee34da9ced136ad17e8c65c5f7e68262c3269d8b423146';
const passwordHash = () => process.env.WPS_ADMIN_PASSWORD_HASH ?? initialPasswordHash;
const digest = value => createHash('sha256').update(value).digest();
const sessionKey = token => digest(passwordHash() + ':' + token).toString('hex');
const lifetime = 8 * 60 * 60;
export const adminCookie = 'wps_admin_session';

export function checkAdminPassword(username, password) {
  const expected = passwordHash();
  return username === 'admin' && typeof password === 'string' && password.length <= 256 &&
    /^[a-f0-9]{64}$/i.test(expected) &&
    timingSafeEqual(digest(password), Buffer.from(expected, 'hex'));
}

function sessions() {
  const db = wpsStore();
  db.exec('CREATE TABLE IF NOT EXISTS admin_sessions (token TEXT PRIMARY KEY, expires INTEGER NOT NULL)');
  return db;
}

export function startAdminSession() {
  const token = randomBytes(32).toString('base64url');
  const now = Date.now();
  const db = sessions();
  db.prepare('DELETE FROM admin_sessions WHERE expires <= ?').run(now);
  db.prepare('INSERT INTO admin_sessions VALUES (?, ?)').run(sessionKey(token), now + lifetime * 1000);
  return token;
}

export function isWpsAdmin(token) {
  return /^[a-zA-Z0-9_-]{43}$/.test(token || '') && Boolean(
    sessions().prepare('SELECT 1 FROM admin_sessions WHERE token = ? AND expires > ?').get(sessionKey(token), Date.now())
  );
}

export function endAdminSession(token) {
  if (/^[a-zA-Z0-9_-]{43}$/.test(token || '')) {
    sessions().prepare('DELETE FROM admin_sessions WHERE token = ?').run(sessionKey(token));
  }
}

export const adminCookieOptions = {
  httpOnly: true, secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict', path: '/', maxAge: lifetime,
};
