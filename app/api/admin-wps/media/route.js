import { randomUUID } from 'node:crypto';
import sanitizeHtml from 'sanitize-html';
import sharp from 'sharp';
import { adminCookie, isWpsAdmin } from '../../../lib/wps-admin-auth';
import { getPosts, wpsStore } from '../../../lib/wps-store';

const maxBytes = 8 * 1024 * 1024;

export function GET(request) {
  if (!isWpsAdmin(request.cookies.get(adminCookie)?.value)) return Response.json({ error: 'Sign in first.' }, { status: 401 });
  const media = new Map();
  const allowed = /^\/(?:blog-media\/[a-f0-9-]{36}|images\/[a-z0-9_./-]+\.(?:png|jpe?g|webp|avif))$/i;
  for (const { id } of wpsStore().prepare('SELECT id FROM blog_media ORDER BY rowid DESC').all()) {
    const src = '/blog-media/' + id;
    media.set(src, { src, alt: '', posts: [], uploaded: true });
  }
  for (const post of getPosts()) {
    function collect(src, alt) {
      if (typeof src !== 'string' || !allowed.test(src) || src.includes('..')) return;
      const item = media.get(src) ?? { src, alt: '', posts: [], uploaded: false };
      if (!item.alt && typeof alt === 'string') item.alt = alt;
      if (!item.posts.some(entry => entry.id === post.id)) {
        item.posts.push({ id: post.id, title: post.title, status: post.status });
      }
      media.set(src, item);
    }
    collect(post.image, post.alt);
    if (post.html) sanitizeHtml(post.html, {
      allowedTags: ['img'],
      transformTags: { img: (tagName, attribs) => {
        collect(attribs.src, attribs.alt);
        return { tagName, attribs };
      } },
    });
  }
  return Response.json({ media: [...media.values()] }, { headers: { 'Cache-Control': 'private, no-store' } });
}

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
