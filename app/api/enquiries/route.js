import nodemailer from 'nodemailer';
import { maxPhotos, maxPhotoBytes, maxTotalPhotoBytes } from '../../lib/enquiry-limits.js';

export const runtime = 'nodejs';

const forms = {
  home: { 'Full Name': 100, 'Phone Number': 30, 'Email Address': 200, Service: 150, 'Additional Details': 5000 },
  contact: { 'Full Name': 100, 'Email Address': 200, 'Phone Number': 30, 'City / Postal Code': 100, 'Painting Services': 30, 'Project Type': 30, 'Project Details': 5000, 'Contact Consent': 3 },
  location: { 'Full Name': 100, 'Email Address': 200, City: 100, 'Postal Code': 12, Phone: 30, 'Painting Service': 150, 'Project Details': 5000, 'Privacy Consent': 3 },
  service: { 'Full Name': 100, 'Email Address': 200, Phone: 30, 'City / Postal Code': 100, Service: 150, 'Project Details': 5000, 'Contact Consent': 3 },
  vinyl: { 'Full name': 100, Email: 200, City: 100, Phone: 30, Service: 150, 'Project details': 5000, 'Contact Consent': 3 },
};

const maxBodyBytes = maxTotalPhotoBytes + 128 * 1024;
const emailPattern = /^[^\s@<>,";:]+@[^\s@<>,";:]+\.[^\s@<>,";:]+$/;
const unavailable = 'We couldn’t send your request right now. Please try again or call us.';
const attempts = new Map();

function reject(error, status = 400) {
  return Response.json({ error }, { status });
}

async function readForm(request) {
  const reader = request.body?.getReader();
  if (!reader) throw new Error('Missing body');
  const chunks = [];
  let length = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    length += value.byteLength;
    if (length > maxBodyBytes) {
      await reader.cancel();
      return null;
    }
    chunks.push(value);
  }
  return new Response(new Blob(chunks), {
    headers: { 'content-type': request.headers.get('content-type') },
  }).formData();
}

function photoExtension(buffer) {
  if (buffer.length < 12) return '';
  if (buffer[0] === 255 && buffer[1] === 216 && buffer[2] === 255) return 'jpg';
  if (buffer.subarray(0, 8).equals(Buffer.from('89504e470d0a1a0a', 'hex'))) return 'png';
  if (buffer.toString('ascii', 0, 4) === 'RIFF' && buffer.toString('ascii', 8, 12) === 'WEBP') return 'webp';
  if (buffer.toString('ascii', 4, 8) === 'ftyp' &&
      /^(heic|heix|hevc|hevx|heim|heis|mif1|msf1)$/.test(buffer.toString('ascii', 8, 12))) return 'heic';
  return '';
}

export async function POST(request) {
  if (request.headers.get('sec-fetch-site') === 'cross-site') return reject('Invalid request.', 403);
  if (!request.headers.get('content-type')?.startsWith('multipart/form-data;')) return reject('Invalid form format.');
  if (Number(request.headers.get('content-length')) > maxBodyBytes) return reject('Photos must be 15 MB or less in total.', 413);

  const { SMTP_HOST, SMTP_PORT = '465', SMTP_USER, SMTP_PASSWORD, ENQUIRY_TO_EMAIL } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASSWORD || !ENQUIRY_TO_EMAIL || !['465', '587'].includes(SMTP_PORT)) {
    return reject(unavailable, 503);
  }

  const now = Date.now();
  for (const [key, entry] of attempts) {
    if (entry.expires <= now) attempts.delete(key);
  }
  const ip = request.headers.get('x-forwarded-for')?.split(',').at(-1)?.trim() || 'unknown';
  const entry = attempts.get(ip) || { count: 0, expires: now + 600_000 };
  if (entry.count >= 12) return reject('Too many requests. Please try again in a few minutes.', 429);
  if (attempts.size < 5000 || attempts.has(ip)) {
    entry.count++;
    attempts.set(ip, entry);
  }

  let data;
  try {
    data = await readForm(request);
  } catch {
    return reject('The request could not be read. Please try again.');
  }
  if (!data) return reject('Photos must be 15 MB or less in total.', 413);
  if (data.get('website')) return reject('Invalid request.');

  const kind = data.get('kind');
  if (typeof kind !== 'string' || !Object.hasOwn(forms, kind)) return reject('Invalid form.');
  const lines = [];
  let email;
  for (const [field, limit] of Object.entries(forms[kind])) {
    const values = data.getAll(field);
    const optional = field === 'Phone' || field === 'Additional Details';
    const maxValues = field === 'Painting Services' ? 2 : 1;
    if ((!optional && !values.length) || values.length > maxValues ||
        values.some(value => typeof value !== 'string' || value.length > limit ||
          (!optional && !value.trim()) || (field.endsWith('Consent') && value !== 'Yes'))) {
      return reject('Please check the ' + field.toLowerCase() + ' field.');
    }
    if (field.startsWith('Email')) {
      email = values[0].trim();
      if (!emailPattern.test(email)) return reject('Please enter a valid email address.');
    }
    lines.push(field + ': ' + values.map(value => value.trim()).join(', '));
  }

  const photos = data.getAll('photos');
  if ((kind === 'home' && photos.length) || photos.length > maxPhotos ||
      photos.some(photo => typeof photo === 'string' || !photo.size || photo.size > maxPhotoBytes) ||
      photos.reduce((size, photo) => size + photo.size, 0) > maxTotalPhotoBytes) {
    return reject('Upload up to 10 photos, 10 MB each and 15 MB total.', 413);
  }

  const attachments = [];
  for (const [index, photo] of photos.entries()) {
    const content = Buffer.from(await photo.arrayBuffer());
    const extension = photoExtension(content);
    if (!extension) return reject('Use JPG, PNG, WebP or HEIC photos.');
    attachments.push({ filename: 'project-photo-' + (index + 1) + '.' + extension, content });
  }

  const page = data.get('page');
  const source = typeof page === 'string' && /^\/[a-z0-9/-]{0,250}$/i.test(page) ? page : '/';
  try {
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: SMTP_PORT === '465',
      requireTLS: SMTP_PORT === '587',
      auth: { user: SMTP_USER, pass: SMTP_PASSWORD },
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 20000,
    });
    const result = await transporter.sendMail({
      from: { name: 'We Paint Siding Website', address: SMTP_USER },
      to: ENQUIRY_TO_EMAIL,
      replyTo: email,
      subject: 'New painting enquiry',
      text: ['Form: ' + kind, 'Page: ' + source, '', ...lines].join('\n'),
      attachments,
    });
    if (!result.accepted.length) return reject(unavailable, 502);
    return Response.json({ ok: true });
  } catch (error) {
    console.error('Enquiry email failed', error.code || error.name);
    return reject(unavailable, 502);
  }
}
