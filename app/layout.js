import './globals.css';
import './clean-layout.css';
import './responsive.css';
import './home-mockup.css';
import './inner-theme.css';
import './site-chrome.css';
import './site-effects.css';
import './area-map.css';
import './layout-refinements.css';
import SiteEffects from './components/site-effects';
const googleTagManager = "(function () {\n  if (/^\\/admin-wps(?:\\/|$)/i.test(window.location.pathname)) return;\n  window.dataLayer = window.dataLayer || [];\n  window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });\n  const tag = document.createElement('script');\n  tag.async = true;\n  tag.src = 'https://www.googletagmanager.com/gtm.js?id=GTM-PFZLV8JN';\n  document.head.appendChild(tag);\n})();";
export const metadata={title:'Exterior & Interior Painting Ontario | We Paint Siding',description:'Exterior and cabinet painting across the GTA and Ontario. Explore siding, brick, trim and kitchen cabinet colour changes with We Paint Siding.'};
export default function Layout({children}){return <html lang="en"><head><script dangerouslySetInnerHTML={{__html:googleTagManager}}/></head><body>{children}<SiteEffects/></body></html>}
