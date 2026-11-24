import { adminCookie, isWpsAdmin } from '../../lib/wps-admin-auth';
import { wpsStore } from '../../lib/wps-store';

export async function GET(request, { params }) {
  const { id } = await params;
  if (!/^[a-f0-9-]{36}$/.test(id)) return new Response(null, { status: 404 });
  const db = wpsStore();
  const src = '/blog-media/' + id;
  const published = db.prepare(`SELECT 1 FROM posts WHERE status='published' AND
    (json_extract(data, '$.image') = ? OR instr(json_extract(data, '$.html'), ?) > 0) LIMIT 1`).get(src, 'src="' + src + '"');
  if (!published && !isWpsAdmin(request.cookies.get(adminCookie)?.value)) return new Response(null, { status: 404 });
  const image = db.prepare('SELECT content FROM blog_media WHERE id = ?').get(id);
  if (!image) return new Response(null, { status: 404 });
  return new Response(image.content, { headers: {
    'Content-Type': 'image/webp', 'Cache-Control': 'private, no-store',
    'X-Robots-Tag': published ? 'index' : 'noindex',
  } });
}
