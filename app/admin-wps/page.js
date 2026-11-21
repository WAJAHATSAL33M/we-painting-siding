import { cookies } from 'next/headers';
import { adminCookie, isWpsAdmin } from '../lib/wps-admin-auth';
import Dashboard from './dashboard';
import './dashboard.css';
import './login.css';

export const metadata = { title: 'WPS Admin', robots: { index: false, follow: false, noarchive: true, noimageindex: true } };

export default async function AdminPage() {
  const jar = await cookies();
  if (isWpsAdmin(jar.get(adminCookie)?.value)) return <Dashboard />;
  const error = jar.get('wps_admin_login_error')?.value;
  const message = error === 'credentials' ? 'The username or password is incorrect.'
    : error === 'limit' ? 'Too many sign-in attempts. Try again in a few minutes.' : '';

  return <main className="wps-login">
    <a href="/" className="wps-login-back">← Back to website</a>
    <section className="wps-login-card" aria-labelledby="wps-login-heading">
      <div className="wps-login-brand"><span aria-hidden="true">W</span>We Paint Siding</div>
      <h1 id="wps-login-heading">Admin sign-in</h1>
      <form action="/api/admin-wps/session" method="post">
        <label htmlFor="wps-username">Username</label>
        <input id="wps-username" name="username" autoComplete="username" autoCapitalize="none" spellCheck={false} required maxLength={80}/>
        <label htmlFor="wps-password">Password</label>
        <input id="wps-password" name="password" type="password" autoComplete="current-password" required maxLength={256}/>
        {message && <p className="wps-login-error" role="alert">{message}</p>}
        <button type="submit">Sign in <span aria-hidden="true">→</span></button>
      </form>
    </section>
  </main>;
}
