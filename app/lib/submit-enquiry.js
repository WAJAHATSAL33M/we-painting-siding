import { maxTotalPhotoBytes } from './enquiry-limits';

export async function submitEnquiry(form, kind, photos = []) {
  if (photos.reduce((size, photo) => size + photo.size, 0) > maxTotalPhotoBytes) {
    throw new Error('Photos must be 15 MB or less in total.');
  }
  const data = new FormData(form);
  data.set('kind', kind);
  data.set('page', window.location.pathname);
  data.delete('photos');
  for (const photo of photos) data.append('photos', photo);

  const response = await fetch('/api/enquiries', { method: 'POST', body: data });
  if (!response.ok) {
    const result = await response.json().catch(() => null);
    throw new Error(result?.error || 'We couldn’t send your request. Please try again.');
  }
  window.location.assign('/thank-you');
}
