import sanitizeHtml from 'sanitize-html';
import { isWpsAdmin, wpsAdminChallenge } from '../../lib/wps-admin-auth';
import { getPosts, wpsStore } from '../../lib/wps-store';

export const runtime = 'nodejs';

const fail = (error, status = 400) => Response.json({ error }, { status });
const reply = (body) => Response.json(body, { headers: { 'Cache-Control': 'private, no-store' } });
const enquiryStates = ['new', 'in progress', 'closed'];

export function GET(request) {
  if (!isWpsAdmin(request.headers)) return wpsAdminChallenge();
  const db = wpsStore();
  const photoId = new URL(request.url).searchParams.get('photo');
  if (photoId) {
    const photo = db.prepare('SELECT name, content FROM photos WHERE id = ?').get(photoId);
    if (!photo) return fail('Photo not found.', 404);
    return new Response(photo.content, { headers: {
      'Content-Type': 'application/octet-stream',
      'Content-Disposition': 'attachment; filename="' + photo.name + '"',
      'Cache-Control': 'private, no-store',
    } });
  }
  const enquiries = db.prepare('SELECT * FROM enquiries ORDER BY id DESC').all();
  const photos = db.prepare('SELECT id, enquiry_id, name FROM photos ORDER BY id').all();
  return reply({ posts: getPosts(), enquiries, photos });
}

export async function POST(request) {
  if (!isWpsAdmin(request.headers)) return wpsAdminChallenge();
  if (request.headers.get('sec-fetch-site') === 'cross-site' ||
      request.headers.get('content-type')?.split(';')[0].trim() !== 'application/json') {
    return fail('Invalid request format.', 415);
  }
  const raw = await request.text();
  if (raw.length > 250000) return fail('The post is too large.', 413);
  let data;
  try { data = JSON.parse(raw); } catch { return fail('Invalid request.'); }
  if (!data || typeof data !== 'object') return fail('Invalid request.');
  const db = wpsStore();
  const id = Number.isSafeInteger(data.id) && data.id > 0 ? data.id : null;
  if (data.action === 'update-enquiry') {
    if (!id || !enquiryStates.includes(data.status) || typeof data.notes !== 'string' || data.notes.length > 5000) return fail('Invalid enquiry details.');
    const result = db.prepare('UPDATE enquiries SET status = ?, notes = ? WHERE id = ?').run(data.status, data.notes, id);
    return result.changes ? reply({ id }) : fail('Enquiry not found.', 404);
  }
  if (data.action === 'delete-post') {
    const result = db.prepare('DELETE FROM posts WHERE id = ?').run(id);
    return result.changes ? reply({ id }) : fail('Post not found.', 404);
  }
  if (data.action !== 'save-post') return fail('Unknown action.');

  const fields = { title: 180, slug: 150, category: 100, excerpt: 500, seoTitle: 180, image: 400, alt: 250, service: 150, html: 200000 };
  const post = {};
  for (const [key, limit] of Object.entries(fields)) {
    if (typeof data[key] !== 'string' || data[key].length > limit) return fail('Check the ' + key + ' field.');
    post[key] = data[key].trim();
  }
  if (!post.title || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(post.slug)) return fail('Enter a title and a valid URL slug.');
  if (!['draft', 'published'].includes(data.status)) return fail('Choose a valid publication status.');
  if (post.image && !/^\/images\/[a-z0-9_./-]+\.(?:png|jpe?g|webp|avif)$/i.test(post.image)) return fail('Use an existing site image path under /images/.');
  if (post.image.includes('..')) return fail('Use an existing site image path.');
  if (post.service && !/^\/[a-z0-9/-]+$/i.test(post.service)) return fail('Enter a site path for the related service.');
  post.html = sanitizeHtml(post.html, {
    allowedTags: ['p','br','div','h2','h3','h4','strong','b','em','i','u','s','ul','ol','li','blockquote','pre','code','a','hr'],
    allowedAttributes: { a: ['href'] },
    allowedSchemes: ['http','https','mailto','tel'],
    allowProtocolRelative: false,
  });
  if (data.status === 'published' && (!post.category || !post.excerpt || !sanitizeHtml(post.html, { allowedTags: [], allowedAttributes: {} }).trim())) {
    return fail('Add a category, excerpt and article content before publishing.');
  }
  if (db.prepare('SELECT id FROM posts WHERE slug = ? AND id != ?').get(post.slug, id || 0)) return fail('That URL slug is already in use.', 409);
  post.updated = new Date().toISOString().slice(0, 10);
  post.seoTitle ||= post.title;
  post.service ||= '/contact';
  const json = JSON.stringify(post);
  if (id) {
    const result = db.prepare('UPDATE posts SET slug = ?, status = ?, data = ? WHERE id = ?').run(post.slug, data.status, json, id);
    return result.changes ? reply({ id, ...post, status: data.status }) : fail('Post not found.', 404);
  }
  const result = db.prepare('INSERT INTO posts (slug, status, data) VALUES (?, ?, ?)').run(post.slug, data.status, json);
  return reply({ id: Number(result.lastInsertRowid), ...post, status: data.status });
}
