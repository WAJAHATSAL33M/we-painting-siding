import { SiteHeader, SiteFooter } from '../components/site-chrome';
import { officePhone } from '../data/contact-details';
import '../approved-homepage.css';
import './thank-you.css';

export const metadata = {
  title: 'Request Received | We Paint Siding',
  robots: { index: false, follow: true },
};

export default function ThankYouPage() {
  return <div className="approved-site">
    <a className="ah-skip" href="#main-content">Skip to content</a>
    <SiteHeader/>
    <main className="wps-thanks" id="main-content">
      <section className="wps-thanks-card" aria-labelledby="thanks-heading">
        <span className="wps-thanks-check" aria-hidden="true">✓</span>
        <h1 id="thanks-heading">Thanks for your request</h1>
        <p>We’ve received your enquiry and will contact you shortly to discuss your project.</p>
        <div className="wps-thanks-actions">
          <a className="ah-button" href="/">Back to home</a>
          <a className="wps-thanks-phone" href={officePhone.href}>Call {officePhone.label}</a>
        </div>
      </section>
    </main>
    <SiteFooter/>
  </div>;
}
