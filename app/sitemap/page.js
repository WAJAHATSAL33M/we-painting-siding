import SiteHome from '../components/site-home';
import exterior from '../data/exterior-service-links.json';
import cabinets from '../data/cabinet-service-links.json';
import locations from '../data/locations.json';
import posts from '../data/blog-posts.json';
import policies from '../data/support-pages.json';
import '../support/support.css';
export const metadata={title:'Sitemap | We Paint Siding',description:'Find services, locations, painting guides and website information.'};
export default function Sitemap(){const groups=[['Main pages',[['Home','/'],['About Us','/about'],['Before & After','/before-and-after'],['Blog','/blog'],['Frequently Asked Questions','/faq'],['Contact Us','/contact']]],['Exterior painting',[['All Exterior Services','/exterior-painting'],...exterior.map(p=>[p.title,'/exterior-painting/'+p.slug])]],['Cabinet painting',[['All Cabinet Services','/cabinet-painting'],...cabinets.map(p=>[p.title,'/cabinet-painting/'+p.slug])]],['Our locations',[['Locations Overview','/locations'],...locations.map(p=>[p.name,'/locations/'+p.slug])]],['Painting guides',posts.map(p=>[p.title,'/blog/'+p.slug])],['Website information',policies.map(p=>[p.title,'/'+p.slug])]];return <SiteHome isSupport><section className="section"><nav className="support-breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span><span>Sitemap</span></nav><div className="support-intro"><h1>Find Your <em>Way Around.</em></h1><p>Explore every service, location and supporting page in one place.</p></div><div className="sitemap-grid">{groups.map(([title,links])=><section key={title}><h2>{title}</h2><ul>{links.map(([label,href])=><li key={href}><a href={href}>{label}</a></li>)}</ul></section>)}</div></section></SiteHome>}
