import PageShell from '../support/page-shell';
import exterior from '../data/exterior-service-links.json';
import cabinets from '../data/cabinet-service-links.json';
import {allServices} from '../data/service-pages';
import locations from '../data/locations.json';
import posts from '../data/blog-posts.json';
import policies from '../data/support-pages.json';

export const metadata={title:'Sitemap | We Paint Siding',description:'Find services, locations, painting guides and website information.'};
export default function Sitemap(){const groups=[['Main pages',[['Home','/'],['About Us','/about'],['Interior Painting','/interior-painting'],['Before & After','/before-and-after'],['Blog','/blog'],['Frequently Asked Questions','/faq'],['Contact Us','/contact']]],['Exterior painting',[['All Exterior Services','/exterior-painting'],...exterior.map(p=>[p.title,'/exterior-painting/'+p.slug])]],['Interior painting',[['All Interior Services','/interior-painting'],...allServices.filter(p=>p.category==='interior').map(p=>[p.title,p.path])]],['Our locations',[['Locations Overview','/locations'],...locations.map(p=>[p.name,'/locations/'+p.slug])]],['Painting guides',posts.map(p=>[p.title,'/blog/'+p.slug])],['Website information',policies.map(p=>[p.title,'/'+p.slug])]];return <PageShell><section className="ed-section ah-container ed-sitemap"><nav className="support-breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span><span>Sitemap</span></nav><div className="support-intro"><p className="inner-section-label">EXPLORE THE WEBSITE</p><h1>Website <em>Sitemap</em></h1><p>Find exterior and interior painting services, Southern Ontario locations, painting guides and website policies in one directory.</p></div><div className="sitemap-grid">{groups.map(([title,links])=><section key={title}><h2>{title}</h2><ul>{links.map(([label,href])=><li key={href}><a href={href}>{label}</a></li>)}</ul></section>)}</div></section></PageShell>}

