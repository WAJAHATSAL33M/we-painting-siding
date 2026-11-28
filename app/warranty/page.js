import PageShell, { Breadcrumb } from '../support/page-shell';
import './warranty.css';

export const metadata = {
  title: 'Painting Warranty | We Paint Siding',
  description: 'Review the We Paint Siding warranty periods, covered surfaces, exclusions, and how to request warranty service.',
  alternates: { canonical: 'https://wepaintsiding.com/warranty' },
};

const coverage = [
  ['10 years', 'Non-peeling · aluminum & vinyl'],
  ['5 years', 'Non-peeling · wood & masonry'],
  ['5 years', 'Cabinet painting'],
  ['1 year', 'Roof painting'],
];

function Disclosure({ title, open = false, children }) {
  return <details className="warranty-disclosure" open={open}>
    <summary>{title}</summary>
    <div>{children}</div>
  </details>;
}

export default function WarrantyPage() {
  return <PageShell>
    <section className="warranty-hero">
      <div className="ah-container warranty-hero-inner">
        <div>
          <Breadcrumb title="Warranty" />
          <h1>Painting Warranty</h1>
          <p>See what’s covered, how long it lasts, and what to keep on file.</p>
        </div>
        <svg className="warranty-shield" viewBox="0 0 100 110" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M50 8C37 16 24 20 12 23v24c0 24 13 43 38 55 25-12 38-31 38-55V23C76 20 63 16 50 8Z" />
          <path d="m34 53 11 11 23-25" />
        </svg>
      </div>
    </section>

    <div className="ah-container warranty-content">
      <aside className="warranty-notice">
        <span aria-hidden="true">ⓘ</span>
        <div><strong>Your invoice is your reference</strong>
          <p>Coverage applies to the surfaces We Paint Siding painted for your project, subject to any exceptions in your individual warranty. Warranty details are usually included in your final invoice. Keep that invoice or your separate warranty document in case you need service.</p>
        </div>
      </aside>

      <section aria-labelledby="warranty-coverage">
        <h2 id="warranty-coverage">Coverage at a glance</h2>
        <ul className="warranty-coverage">
          {coverage.map(([duration, label]) => <li key={label}><strong>{duration}</strong><span>{label}</span></li>)}
        </ul>
      </section>

      <section aria-labelledby="warranty-details">
        <h2 id="warranty-details">Warranty details</h2>
        <Disclosure title="10-year non-peeling coverage" open>
          <p>Covered surfaces include aluminum and/or vinyl siding, soffits, eavestroughs, downspouts, trimming, capping, fascia, window surrounds, aluminum window frames (vinyl frames are excluded), door trims, solid doors, garage doors, porch undersides, shutters, metal or vinyl fencing, pillars, and columns.</p>
          <p>Under this coverage, paint coatings applied by We Paint Siding are guaranteed against peeling, flaking, blistering, or other coating failure caused by normal and natural environmental conditions for 10 years from the date on your invoice or warranty document.</p>
          <p>If peeling or flaking occurs, We Paint Siding will prepare and repaint the affected area as necessary. We’ll make every effort to identify the cause, check for a wider issue, and determine whether further warranty work is required.</p>
        </Disclosure>
        <Disclosure title="5-year non-peeling coverage">
          <p>Covered surfaces include wood, masonry, stucco or cement-board siding, board and batten, bricks, blocks or walls, wood soffits, trimming, capping, fascia, window surrounds, window frames, solid doors, garage doors, porch undersides, shutters, fencing, railings, and wood or masonry pillars or columns.</p>
        </Disclosure>
        <Disclosure title="Cabinet and roof painting">
          <ul>
            <li><strong>Cabinet painting</strong> is covered by a 5-year warranty.</li>
            <li><strong>Roof painting</strong> is covered by a 1-year warranty.</li>
          </ul>
        </Disclosure>
      </section>

      <div className="warranty-bottom">
        <section aria-labelledby="warranty-exclusions">
          <h2 id="warranty-exclusions">What’s excluded</h2>
          <Disclosure title="Excluded surfaces">
            <ul>
              <li>Metal screen doors.</li>
              <li>Metal or vinyl surfaces that were already peeling.</li>
              <li>Coatings applied over an existing peeling paint layer (inter-coat peeling).</li>
              <li>The innermost frames of sliding windows or doors.</li>
              <li>Flooring surfaces, including decking.</li>
              <li>Painted caulking that loses adhesion, cracks, shrinks, or separates over time.</li>
            </ul>
          </Disclosure>
          <Disclosure title="Excluded situations">
            <ul>
              <li>Damage to the paint finish from physical impact.</li>
              <li>Colour fading. Noticeable fading is generally expected to take 10 years or more.</li>
              <li>Surfaces in direct contact with the ground or exposed to regular moisture.</li>
              <li>Wood with brown, white, or soft rot.</li>
              <li>Wood heavily pitted or grooved by weathering or rot.</li>
              <li>Wood or masonry where poor or damaged construction traps moisture and prevents drainage or ventilation.</li>
              <li>Paint applied over caulking that fails to adhere properly.</li>
              <li>Masonry that crumbles or detaches from the surface beneath it.</li>
            </ul>
          </Disclosure>
        </section>
        <section aria-labelledby="warranty-service">
          <h2 id="warranty-service">If you need warranty service</h2>
          <p>Have your invoice or warranty document handy and <a href="/contact">contact us</a>.</p>
          <aside className="warranty-notice">
            <span aria-hidden="true">ⓘ</span>
            <strong>Coverage begins after full payment for the finished job.</strong>
          </aside>
        </section>
      </div>
    </div>
  </PageShell>;
}
