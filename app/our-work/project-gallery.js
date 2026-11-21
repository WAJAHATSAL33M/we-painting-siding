'use client';

import { useState } from 'react';

const pageSize = 12;

export function ProjectPhoto({ photo, alt, priority = false }) {
  return <img src={photo.src} alt={alt} width={photo.width} height={photo.height}
    loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : undefined} decoding="async"/>;
}

export function ProjectGallery({ projects }) {
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [limit, setLimit] = useState(pageSize);
  const categories = [...new Set(projects.map(project => project.category))];
  const locations = [...new Set(projects.map(project => project.location).filter(Boolean))].sort();
  const filtered = projects.filter(project =>
    (!category || project.category === category) && (!location || project.location === location)
  );
  return <section id="painting-gallery" className="project-gallery" aria-labelledby="project-gallery-title">
    <div className="ah-container">
      <div className="project-gallery-title"><div><h2 id="project-gallery-title">Project gallery</h2><p>Browse completed jobs by surface or location.</p></div>
        <label>Location<select value={location} onChange={event => { setLocation(event.target.value); setLimit(pageSize); }}>
          <option value="">All locations</option>{locations.map(city => <option key={city}>{city}</option>)}
        </select></label>
      </div>
      <div className="project-filters" aria-label="Project categories">
        {['', ...categories].map(value => <button type="button" key={value} aria-pressed={category === value}
          onClick={() => { setCategory(value); setLimit(pageSize); }}>{value || 'All projects'}</button>)}
      </div>
      <p className="project-result" role="status">{filtered.length ? 'Showing ' + Math.min(filtered.length, limit) + ' of ' + filtered.length + ' photos' : 'No photos match these filters.'}</p>
      <div className="project-grid">{filtered.slice(0, limit).map(photo => <article key={photo.id}>
        <a href={photo.src} aria-label={'View full photo of ' + photo.title}><ProjectPhoto photo={photo} alt={photo.title}/></a>
        <div className="project-card-copy"><h3>{photo.title}</h3><p>{[photo.category, photo.location].filter(Boolean).join(' · ')}</p></div>
      </article>)}</div>
      {filtered.length > limit && <button className="ah-button project-more" type="button" onClick={() => setLimit(current => current + pageSize)}>Show more project photos</button>}
    </div>
  </section>;
}
