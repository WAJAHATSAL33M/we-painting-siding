import { headers } from 'next/headers';
import { notFound } from 'next/navigation';
import { isWpsAdmin } from '../lib/wps-admin-auth';
import Dashboard from './dashboard';
import './dashboard.css';

export const metadata = { title: 'WPS Admin', robots: { index: false, follow: false } };

export default async function AdminPage() {
  if (!isWpsAdmin(await headers())) notFound();
  return <Dashboard />;
}
