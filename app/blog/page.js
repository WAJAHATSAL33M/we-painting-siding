import SiteHome from '../components/site-home';
import posts from '../data/blog-posts.json';
import Archive from './archive';
import {BlogCTA} from './shared';
import '../support/support.css';
export const metadata={title:'Painting Blog & Guides | We Paint Siding',description:'Explore practical painting guides, cabinet refresh ideas, colour inspiration and project planning advice.'};
export default function BlogPage(){const feature=posts[0];return <SiteHome isSupport supportKey="blog"><section className="section"><nav className="support-breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span><span>Blog</span></nav><div className="support-intro"><h1>Painting Knowledge. <em>Better Project Decisions.</em></h1><p>Practical guides for refreshing your exterior, cabinetry and the spaces you call home.</p></div><div className="blog-feature"><img src={feature.image} alt={feature.alt} width="1536" height="1024" fetchPriority="high"/><div><p className="support-kicker">Featured guide · {feature.category}</p><h2>{feature.title}</h2><p>{feature.excerpt}</p><a className="text-link" href={'/blog/'+feature.slug}>Read the guide <span aria-hidden="true">→</span></a></div></div></section><section className="section" id="articles"><h2>Ideas, Advice & <em>Painting Guides</em></h2><Archive posts={posts}/><BlogCTA/></section></SiteHome>}
