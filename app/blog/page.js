import CompanyImage from '../components/company-image';
import company from '../data/company-photos.json';
import SiteHome from '../components/site-home';
import posts from '../data/blog-posts.json';
import Archive from './archive';
import {BlogCTA} from './shared';
import '../support/support.css';
export const metadata={title:'Painting Guides: Prep, Cost & Colour | We Paint Siding',description:'Read exterior and cabinet painting guides from We Paint Siding. Explore cost factors, surface preparation, colour choices and caring for painted finishes.'};
export default function BlogPage(){const feature=posts[0];return <SiteHome isSupport supportKey="blog"><section className="section"><nav className="support-breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span><span>Blog</span></nav><div className="support-intro"><p className="inner-section-label">PAINTING GUIDES</p><h1>Painting Guides. <em>Preparation, Colour and Care.</em></h1><p>Plan an exterior or cabinet repaint with practical guidance on scope, cost factors, preparation, colour and ongoing care.</p></div><div className="blog-feature"><CompanyImage src={company.blogFeature} alt={feature.alt} width="1536" height="1024" fetchPriority="high"/><div><p className="support-kicker">Featured guide · {feature.category}</p><h2>{feature.title}</h2><p>{feature.excerpt}</p><a className="text-link" href={'/blog/'+feature.slug}>Read the guide <span aria-hidden="true">→</span></a></div></div></section><section className="section" id="articles"><p className="inner-section-label">PLAN YOUR PROJECT</p><h2>Exterior & Cabinet <em>Painting Advice</em></h2><Archive posts={posts}/><BlogCTA/></section></SiteHome>}
