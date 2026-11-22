'use client';

import { useId, useState } from 'react';
import { submitEnquiry } from '../lib/submit-enquiry';
import { projectTypes, quoteFields, quoteServices } from '../lib/quote-fields';
import './quote-form.css';

export default function QuoteForm({ kind, id, heading = 'Request a Free Quote', city }) {
  const uid = useId();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  async function submit(event) {
    event.preventDefault();
    if (busy) return;
    setError('');
    setBusy(true);
    try {
      await submitEnquiry(event.currentTarget, kind);
    } catch (error) {
      setError(error.message);
      setBusy(false);
    }
  }

  return <form id={id} className="wps-quote" method="post" onSubmit={submit} aria-labelledby={uid + '-heading'} aria-busy={busy}>
    <h2 id={uid + '-heading'}>{heading}</h2>
    <div className="wps-quote-grid">
      <label>Full name <input name="Full Name" autoComplete="name" required maxLength={quoteFields['Full Name']}/></label>
      <label>Email <input name="Email Address" type="email" autoComplete="email" required maxLength={quoteFields['Email Address']}/></label>
      <label>Phone number <input name="Phone Number" type="tel" autoComplete="tel" required maxLength={quoteFields['Phone Number']}/></label>
      <label>Which service?
        <select name="Service" required defaultValue="">
          <option value="" disabled>Select a service</option>
          {quoteServices.map(service => <option key={service}>{service}</option>)}
        </select>
      </label>
      <label className="wps-quote-wide">Full address including city
        <input name="Full Address" autoComplete="street-address" placeholder="e.g. 123 Main St, Oakville" required maxLength={quoteFields['Full Address']} aria-describedby={city ? uid + '-city' : undefined}/>
        {city && <small id={uid + '-city'}>Include {city} if it’s the project city.</small>}
      </label>
    </div>
    <fieldset>
      <legend>Residential or Commercial</legend>
      <div className="wps-quote-radios">
        {projectTypes.map(type => <label key={type}><input type="radio" name="Project Type" value={type} required/>{type}</label>)}
      </div>
    </fieldset>
    <label>Additional details <span>(optional)</span>
      <textarea name="Additional Details" rows={4} maxLength={quoteFields['Additional Details']}/>
    </label>
    <input type="hidden" name="formVersion" value="quote-v2"/>
    <input type="text" name="website" hidden tabIndex={-1} autoComplete="off"/>
    {error && <p className="wps-quote-error" role="alert">{error}</p>}
    <button className="ah-button" type="submit" disabled={busy}>{busy ? 'Sending…' : 'Request a Free Quote'}</button>
  </form>;
}
