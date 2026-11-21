'use client';

import { useState } from 'react';

export default function Comparison({ pair, title }) {
  const [position, setPosition] = useState(50);
  return <figure className="project-comparison">
    <div className="project-comparison-stage" style={{ '--position': position + '%' }}>
      <img src={pair.before.src} width={pair.before.width} height={pair.before.height} alt={title + ' before painting'} loading="lazy" decoding="async"/>
      <img className="project-after" src={pair.after.src} width={pair.after.width} height={pair.after.height} alt={title + ' after painting'} loading="lazy" decoding="async"/>
      <span className="project-comparison-handle" aria-hidden="true"><span>↔</span></span>
      <input aria-label={title + ' before and after comparison'} aria-valuetext={position + '% before, ' + (100 - position) + '% after'} type="range" min="0" max="100" value={position}
        onChange={event => setPosition(Number(event.target.value))}/>
      <span className="project-before-tag" aria-hidden="true">Before</span><span className="project-after-tag" aria-hidden="true">After</span>
    </div>
  </figure>;
}
