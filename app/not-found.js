import SiteHome,{Button} from './components/site-home';
import './support/support.css';
export default function NotFound(){return <SiteHome isSupport><section className="section"><div className="support-error"><p className="support-kicker">404 · Page not found</p><h1>Let’s Find the <em>Right Page.</em></h1><p>The address may have changed or the page may no longer be available. Explore our services or use the sitemap to find what you need.</p><div className="actions"><Button href="/">Back to Home</Button><Button href="/sitemap" outline>View Sitemap</Button></div></div></section></SiteHome>}
