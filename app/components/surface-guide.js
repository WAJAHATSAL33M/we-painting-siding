'use client';

import {useState} from 'react';
import {surfaceGuides} from '../data/surface-guides';
import './surface-guide.css';

const roofImage = '/images/surface-guide/roof-edge.webp';

function Arrow(){return <svg viewBox="0 0 24 16" fill="none" aria-hidden="true"><path d="M1 8h21M16 2l6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>}

function Markers({surfaces,active,onSelect,panelId}){
 return <>
  <svg className="sg-leaders" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
   {surfaces.map(s=><g key={s.id} className={active===s.id?'is-active':''}><line x1={s.lx} y1={s.ly} x2={s.x} y2={s.y}/><circle cx={s.x} cy={s.y} r=".65"/></g>)}
  </svg>
  {surfaces.map(s=><button key={s.id} type="button" className={'sg-pin'+(active===s.id?' is-active':'')} style={{'--sg-x':s.x+'%','--sg-y':s.y+'%','--sg-lx':s.lx+'%','--sg-ly':s.ly+'%'}} aria-label={'Show '+s.name.toLowerCase()} aria-pressed={active===s.id} aria-controls={panelId} onClick={()=>onSelect(s.id)}><span className="sg-pin-number">{s.number}</span><span className="sg-pin-label">{s.name}</span></button>)}
 </>;
}

export default function SurfaceGuide({kind}){
 const guide=surfaceGuides[kind];
 const [active,setActive]=useState(guide.initial);
 const selected=guide.surfaces.find(s=>s.id===active);
 const id='surface-guide-'+kind;
 const panelId=id+'-detail';
 const mainSurfaces=guide.surfaces.filter(s=>!s.detail);
 const roofSurfaces=guide.surfaces.filter(s=>s.detail);
 return <section className={'sg-section sg-'+kind} aria-labelledby={id+'-heading'}>
  <div className="ah-container">
   <header className="sg-header">
    <p className="ah-eyebrow">{guide.eyebrow}</p>
    <h2 id={id+'-heading'}>{guide.heading} <em>{guide.accent}</em></h2>
    <p className="sg-intro">{guide.intro}</p>
   </header>
   <div className="sg-grid">
    <div className="sg-selector" role="group" aria-label={guide.eyebrow+' surfaces'}>
     <div className="sg-options">{guide.surfaces.map(s=><button type="button" key={s.id} className={'sg-option'+(active===s.id?' is-active':'')} aria-pressed={active===s.id} aria-controls={panelId} onClick={()=>setActive(s.id)}><span className="sg-option-number">{s.number}</span><span>{s.name}</span><Arrow/></button>)}</div>
     {kind==='interior'?<a className="sg-basement sg-basement-desktop" href="/interior-painting/basement-painting"><strong>Planning a basement?</strong><span>Explore basement painting <Arrow/></span></a>:null}
    </div>
    <div className="sg-visual">
     <div className="sg-main-photo">
      <img src={guide.image} alt={guide.alt} width="1536" height="1024" loading="lazy" decoding="async" data-photo-origin="generated-surface-guide"/>
      <Markers surfaces={mainSurfaces} active={active} onSelect={setActive} panelId={panelId}/>
     </div>
     {roofSurfaces.length?<div className="sg-roof-detail"><p>Roof-edge detail</p><div className="sg-roof-photo"><img src={roofImage} alt="Illustrative close-up distinguishing the fascia board, soffit underside and eavestrough" width="1536" height="1024" loading="lazy" decoding="async" data-photo-origin="generated-surface-guide"/><Markers surfaces={roofSurfaces} active={active} onSelect={setActive} panelId={panelId}/></div></div>:null}
    </div>
    <div className="sg-detail" id={panelId} role="region" aria-label="Selected surface details" aria-live="polite" aria-atomic="true">
     <div className="sg-detail-photo"><img src={selected.detail?roofImage:guide.image} alt={'Close-up location of '+selected.name.toLowerCase()+' in the illustrated property'} width="1536" height="1024" loading="lazy" decoding="async" style={{left:-Math.min(200,Math.max(0,selected.x*3-50))+'%',top:-Math.min(200,Math.max(0,selected.y*3-50))+'%'}} data-photo-origin="generated-surface-guide"/></div>
     <div className="sg-detail-copy"><h3>{selected.number} {selected.name}</h3><p>{selected.description}</p>{selected.tags?<ul className="sg-tags" aria-label="Siding materials">{selected.tags.map(tag=><li key={tag}>{tag}</li>)}</ul>:null}<a className="ah-button sg-service-link" href={selected.href}>{selected.link}<Arrow/></a></div>
    </div>
    {kind==='interior'?<a className="sg-basement sg-basement-mobile" href="/interior-painting/basement-painting"><strong>Planning a basement?</strong><span>Explore basement painting <Arrow/></span></a>:null}
   </div>
   <p className="sg-scope-note">Surfaces shown are examples. Only work listed in your written quote is included.</p>
  </div>
 </section>;
}
