'use client';

import { useEffect, useRef, useState } from 'react';

const endpoint = '/api/admin-wps/media';

export function MediaPicker({ target, onClose, onChoose }) {
  const dialog = useRef(null);
  useEffect(() => { dialog.current.showModal(); }, []);
  return <dialog className="wps-media-dialog" ref={dialog} aria-labelledby="wps-media-title" onCancel={onClose}>
    <header className="wps-title">
      <h2 id="wps-media-title">Choose {target === 'inline' ? 'an article image' : 'a featured image'}</h2>
      <button type="button" className="wps-secondary" onClick={onClose}>Close</button>
    </header>
    <MediaLibrary onChoose={onChoose}/>
  </dialog>;
}

export default function MediaLibrary({ onChoose }) {
  const [media, setMedia] = useState(null);
  const [query, setQuery] = useState('');
  const [limit, setLimit] = useState(24);
  const [selected, setSelected] = useState(null);
  const [alt, setAlt] = useState('');
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);
  const [revision, setRevision] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    fetch(endpoint, { signal: controller.signal, cache: 'no-store' })
      .then(async response => {
        const result = await response.json();
        if (!response.ok) throw new Error(result.error);
        setMedia(result.media);
      }).catch(error => {
        if (!controller.signal.aborted) setError(error.message);
      });
    return () => controller.abort();
  }, [revision]);

  function select(item) {
    setSelected(item);
    setAlt(item.alt);
  }

  async function upload(event) {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    setError('');
    if (file.size > 8 * 1024 * 1024) {
      setError('Images must be no larger than 8 MB.');
      return;
    }
    setUploading(true);
    try {
      const response = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': file.type }, body: file });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error);
      setQuery('');
      select({ src: result.src, alt: '', posts: [], uploaded: true });
      setRevision(current => current + 1);
    } catch (error) { setError(error.message || 'The image could not be uploaded.'); }
    finally { setUploading(false); }
  }

  const visible = (media || []).filter(item =>
    [item.src, item.alt, ...item.posts.map(post => post.title)].join(' ').toLowerCase().includes(query.trim().toLowerCase())
  );
  return <section className="wps-media-library" aria-label="Blog media">
    <div className="wps-filters">
      <input type="search" aria-label="Search images" placeholder="Search by image or post" value={query}
        onChange={event => { setQuery(event.target.value); setLimit(24); }}/>
      <label className="wps-media-upload">
        <span>{uploading ? 'Uploading…' : 'Upload image'}</span>
        <input type="file" accept="image/jpeg,image/png,image/webp" onChange={upload} disabled={uploading}/>
      </label>
    </div>
    {error && <p role="alert" className="wps-error">{error}</p>}
    {!media && !error && <p role="status">Loading images…</p>}
    {media && !visible.length && <p>No matching images.</p>}
    <div className="wps-media-grid">
      {visible.slice(0, limit).map(item => <button type="button" key={item.src} className="wps-media-tile"
        onClick={() => select(item)} aria-pressed={selected?.src === item.src}>
        <img src={item.src} alt="" loading="lazy"/>
        <span>{item.alt || (item.uploaded ? 'Uploaded image' : item.src.split('/').pop())}</span>
      </button>)}
    </div>
    {visible.length > limit && <button type="button" className="wps-secondary" onClick={() => setLimit(limit + 24)}>Show more images</button>}
    {selected && <div className="wps-media-details">
      {selected.posts.length > 0 && <p>Used in {selected.posts.map(post => post.title).join(', ')}</p>}
      {onChoose ? <>
        <label>Alt text for this post<input value={alt} maxLength={250} onChange={event => setAlt(event.target.value)}/></label>
        <button type="button" className="wps-primary" disabled={!alt.trim() || uploading} onClick={() => onChoose(selected.src, alt.trim())}>Use selected image</button>
      </> : <>
        {selected.alt && <p>Alt text: {selected.alt}</p>}
        <a href={selected.src} className="wps-secondary" target="_blank" rel="noreferrer">Open full image ↗</a>
      </>}
    </div>}
  </section>;
}
