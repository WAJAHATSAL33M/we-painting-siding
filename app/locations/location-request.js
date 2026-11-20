'use client';
import {useRef,useState} from 'react';
import {submitEnquiry} from '../lib/submit-enquiry';
export default function LocationRequest({city=""}){const[files,setFiles]=useState([]),[error,setError]=useState(''),[status,setStatus]=useState(''),[busy,setBusy]=useState(false),[drag,setDrag]=useState(false);const input=useRef(null);
function addFiles(incoming){const next=[...files],errors=[];for(const file of Array.from(incoming||[])){if(!/\.(jpe?g|png|heic|heif)$/i.test(file.name)){errors.push(file.name+': use JPG, PNG or HEIC.');continue}if(file.size>10*1024*1024){errors.push(file.name+': maximum size is 10 MB.');continue}if(next.some(f=>f.name===file.name&&f.size===file.size&&f.lastModified===file.lastModified))continue;if(next.length>=10){errors.push('Add up to 10 photos.');break}next.push(file)}setFiles(next);setError(errors.join(' '));setStatus('');if(input.current)input.current.value=''}
async function submit(event) {
  event.preventDefault();
  if (busy) return;
  const form = event.currentTarget;
  setError('');
  setStatus('');
  setBusy(true);
  try {
    await submitEnquiry(form, 'location', files);
    form.reset();
    setFiles([]);
    setStatus('Your project enquiry has been sent.');
  } catch (error) {
    setError(error.message);
  } finally {
    setBusy(false);
  }
}
return <form method="post" className="lm-form" onSubmit={submit} aria-label="Local painting project request"><h3>Your project details</h3><div className="lm-form-two"><label htmlFor="lm-name">Full Name <b>*</b><input id="lm-name" name="Full Name" autoComplete="name" placeholder="Your full name" required maxLength={100}/></label><label htmlFor="lm-email">Email Address <b>*</b><input id="lm-email" name="Email Address" autoComplete="email" type="email" placeholder="you@example.com" required maxLength={200}/></label></div><div className="lm-form-three"><label htmlFor="lm-city">City <b>*</b><input id="lm-city" defaultValue={city} name="City" autoComplete="address-level2" placeholder="Your city" required maxLength={100}/></label><label htmlFor="lm-postal">Postal Code <b>*</b><input id="lm-postal" name="Postal Code" autoComplete="postal-code" placeholder="A1A 1A1" required maxLength={12}/></label><label htmlFor="lm-phone">Phone <small>(optional)</small><input id="lm-phone" name="Phone" autoComplete="tel" type="tel" placeholder="(123) 456-7890" maxLength={30}/></label></div><label htmlFor="lm-service">Painting Service <b>*</b><select id="lm-service" name="Painting Service" required defaultValue=""><option value="" disabled>Select a service</option><option>Exterior Painting</option><option>Interior Painting</option><option>Exterior & Interior Painting</option><option>Cabinet Painting (Interior)</option></select></label><p className="lm-field-help">Exterior Painting, Interior Painting, or both. Cabinet painting is part of Interior Painting.</p><label htmlFor="lm-details">Project Details <b>*</b><textarea id="lm-details" name="Project Details" required rows={3} maxLength={5000} placeholder="Tell us about your project. For example: what you would like to paint, areas or rooms, and any other details."/></label><div><label htmlFor="lm-photos">Add Photos <small>(optional)</small></label><div className={'lm-upload'+(drag?' lm-dragging':'')} onDragOver={e=>{e.preventDefault();setDrag(true)}} onDragLeave={()=>setDrag(false)} onDrop={e=>{e.preventDefault();setDrag(false);addFiles(e.dataTransfer.files)}}><svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><rect x="3" y="4" width="26" height="24" rx="2"/><circle cx="11" cy="11" r="3"/><path d="m4 26 9-10 6 6 4-5 6 9"/></svg><div><strong>Choose photos</strong> or drag and drop<small>JPG, PNG or HEIC. Up to 10 photos, 10 MB each, 15 MB total.</small></div><input ref={input} id="lm-photos" type="file" accept=".jpg,.jpeg,.png,.heic,.heif" multiple onChange={e=>addFiles(e.target.files)}/></div>{files.length>0&&<ul className="lm-files">{files.map((f,i)=><li key={f.name+f.lastModified}><span>{f.name}</span><button type="button" onClick={()=>setFiles(files.filter((_,n)=>n!==i))} aria-label={'Remove '+f.name}>Remove</button></li>)}</ul>}</div><label className="lm-consent"><input type="checkbox" required name="Privacy Consent" value="Yes"/><span>I agree to the <a href="/privacy-policy">Privacy Policy.</a> <b>*</b></span></label>{error&&<p className="lm-error" role="alert">{error}</p>}<input type="text" name="website" hidden tabIndex={-1} autoComplete="off"/><button className="ah-button" type="submit" disabled={busy}>{busy?'Sending…':'Send My Project Request'}<span aria-hidden="true">⟶</span></button><p className="lm-status" role="status">{status}</p></form>}
