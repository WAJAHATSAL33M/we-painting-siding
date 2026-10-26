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
export const metadata={title:'Exterior & Interior Painting Ontario | We Paint Siding',description:'Exterior and cabinet painting across the GTA and Southern Ontario. Explore siding, brick, trim and kitchen cabinet colour changes with We Paint Siding.'};
export default function Layout({children}){return <html lang="en"><body>{children}<SiteEffects/></body></html>}
