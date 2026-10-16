/** A real geographic map; city labels do not imply a business address or boundary. */
export default function AreaMap({area='Southern Ontario',zoom=8,className=''}){
 const query=area==='Southern Ontario'?'Southern Ontario, Canada':area+', Ontario, Canada';
 const encoded=encodeURIComponent(query);
 return <figure className={'wps-area-map '+className}>
  <div className="wps-map-heading"><span className="wps-map-pin" aria-hidden="true">⌖</span><div><strong>{area}</strong><span>Explore the local area</span></div><a href={'https://www.google.com/maps/search/?api=1&query='+encoded} target="_blank" rel="noopener noreferrer">Open map <span aria-hidden="true">↗</span></a></div>
  <iframe src={'https://www.google.com/maps?q='+encoded+'&z='+zoom+'&output=embed'} title={'Interactive map of '+area+', Canada'} loading="lazy" allowFullScreen referrerPolicy="strict-origin-when-cross-origin"/>
  <figcaption>Area reference only. Share your postal code to confirm project availability.</figcaption>
 </figure>
}
