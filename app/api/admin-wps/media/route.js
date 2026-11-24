import { randomUUID } from 'node:crypto';
import sharp from 'sharp';
import { adminCookie, isWpsAdmin } from '../../../lib/wps-admin-auth';
import { wpsStore } from '../../../lib/wps-store';

const maxBytes = 8 * 1024 * 1024;

export async function POST(request) {
  if (!isWpsAdmin(request.cookies.get(adminCookie)?.value)) return Response.json({ error: 'Sign in first.' }, { status: 401 });
  if (request.headers.get('sec-fetch-site') === 'cross-site' ||
      !['image/jpeg', 'image/png', 'image/webp'].includes(request.headers.get('content-type'))) {
    return Response.json({ error: 'Choose a JPEG, PNG or WebP image.' }, { status: 415 });
  }
  const reader = request.body?.getReader();
  if (!reader) return Response.json({ error: 'Choose an image.' }, { status: 400 });
  let bytes = 0;
  const chunks = [];
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    bytes += value.byteLength;
    if (bytes > maxBytes) {
      await reader.cancel();
      return Response.json({ error: 'Images must be no larger than 8 MB.' }, { status: 413 });
    }
    chunks.push(value);
  }
  let content;
  try {
    const input = sharp(Buffer.concat(chunks), { limitInputPixels: 32_000_000 });
    if (!['jpeg', 'png', 'webp'].includes((await input.metadata()).format)) throw new Error('Unsupported image');
    content = await input.rotate().resize(1800, 1800, { fit: 'inside', withoutEnlargement: true }).webp({ quality: 84 }).toBuffer();
  } catch {
    return Response.json({ error: 'This image could not be processed.' }, { status: 400 });
  }
  const id = randomUUID();
  wpsStore().prepare('INSERT INTO blog_media (id, content) VALUES (?, ?)').run(id, content);
  return Response.json({ src: '/blog-media/' + id }, { headers: { 'Cache-Control': 'no-store' } });
}
