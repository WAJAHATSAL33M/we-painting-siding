import { wpsStore } from '../../lib/wps-store';

export const runtime = 'nodejs';

const fail = (error, status = 400) => Response.json({ error }, { status });

export async function POST(request) {
  if (request.headers.get('sec-fetch-site') === 'cross-site' ||
      request.headers.get('content-type')?.split(';')[0].trim() !== 'application/json') {
    return fail('Invalid request format.', 415);
  }
  if (Number(request.headers.get('content-length')) > 12000) return fail('Comment is too long.', 413);

  let data;
  try {
    const raw = await request.text();
    if (raw.length > 12000) return fail('Comment is too long.', 413);
    data = JSON.parse(raw);
  } catch {
    return fail('Invalid comment request.');
  }

  const name = typeof data?.name === 'string' ? data.name.trim() : '';
  const body = typeof data?.body === 'string' ? data.body.trim() : '';
  const slug = data?.slug;
  if (typeof slug !== 'string' || slug.length > 150 || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) ||
      !name || name.length > 80 || !body || body.length > 2000) {
    return fail('Enter a name and a comment of up to 2,000 characters.');
  }
  if (data.website) return Response.json({ ok: true }, { status: 202 });

  const db = wpsStore();
  const result = db.prepare(`
    INSERT INTO blog_comments (post_id, name, body)
    SELECT id, ?, ? FROM posts WHERE slug = ? AND status = 'published'
  `).run(name, body, slug);
  if (!result.changes) return fail('Blog post not found.', 404);

  return Response.json({ ok: true }, { status: 202 });
}
