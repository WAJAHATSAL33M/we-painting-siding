import profiles from '../data/google-profiles.json';
import './customer-reviews.css';

function ExternalArrow(){return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 18 18 6M6 6h12v12" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>}
function ProfileIcon(){return <svg viewBox="0 0 32 32" fill="none" aria-hidden="true"><path d="M26 13c0 8-10 16-10 16S6 21 6 13a10 10 0 1 1 20 0Z" stroke="currentColor" strokeWidth="1.7"/><circle cx="16" cy="13" r="3.5" stroke="currentColor" strokeWidth="1.7"/></svg>}

// Manual editorial content only. Empty review arrays render genuine profile links,
// never placeholder quotes, guessed dates, stars or aggregate ratings.
export default function CustomerReviews({profile='both',context='general'}){
 const keys=profile==='both'?['main','oakville']:[profile];
 const selected=keys.map(key=>({key,...profiles[key]}));
 const reviews=selected.flatMap(p=>p.reviews.filter(r=>r.verified&&r.author&&r.text&&r.publishedDate&&r.sourceUrl).map(r=>({...r,profileName:p.name,profileKey:p.key})));
 const id='google-reviews-'+context;
 return <section className={'gr-section'+(selected.length===1?' gr-single':'')} aria-labelledby={id}>
  <div className="ah-container">
   <div className="gr-heading"><div><p className="ah-eyebrow">Customer feedback</p><h2 id={id}>Hear from customers.<br/><em>Explore our Google reviews.</em></h2></div><p>{selected.length===2?'Find customer feedback on our main and Oakville Google Business Profiles. Each listing has its own reviews.':profile==='oakville'?'Read customer experiences on our Oakville Google Business Profile.':'Explore customer feedback on our main Google Business Profile.'}</p></div>
   <div className="gr-profiles">{selected.map(p=><article className="gr-profile" key={p.key}>
    <div className="gr-profile-icon"><ProfileIcon/></div>
    <div className="gr-profile-copy"><p className="gr-profile-label">{p.label}</p><h3>{p.name}</h3><p>{p.description}</p></div>
    <a className="gr-google-link" href={p.url} target="_blank" rel="noopener noreferrer" aria-label={'Read reviews for '+p.name+' on Google (opens in a new tab)'}>Read reviews on Google<ExternalArrow/></a>
   </article>)}</div>
   {reviews.length>0?<><div className="gr-review-grid">{reviews.map(r=><figure className="gr-review" key={r.profileKey+'-'+r.id}>
    <figcaption><span className="gr-avatar" aria-hidden="true">{r.author.trim().slice(0,1)}</span><div><strong>{r.author}</strong><span>{r.profileName}</span></div></figcaption>
    {Number.isInteger(r.rating)&&r.rating>=1&&r.rating<=5?<p className="gr-stars" aria-label={r.rating+' out of 5 stars'}><span aria-hidden="true">{'★'.repeat(r.rating)}{'☆'.repeat(5-r.rating)}</span></p>:null}
    <blockquote><p>{r.text}</p></blockquote>
    <div className="gr-review-footer"><time dateTime={r.publishedDate}>{new Intl.DateTimeFormat('en-CA',{year:'numeric',month:'short',day:'numeric',timeZone:'UTC'}).format(new Date(r.publishedDate))}</time><a href={r.sourceUrl} target="_blank" rel="noopener noreferrer">Read on Google<ExternalArrow/><span className="ah-sr-only"> (opens in a new tab)</span></a></div>
   </figure>)}</div><p className="gr-editorial-note">Selected Google reviews, updated manually. Visit the profiles for current ratings and all reviews.</p></>:null}
  </div>
 </section>;
}
