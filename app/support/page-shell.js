import {SiteHeader,SiteFooter} from '../components/site-chrome';
import '../approved-homepage.css';
import './editorial.css';
export default function PageShell({children}){return <div className="approved-site editorial-site"><a className="ah-skip" href="#main-content">Skip to content</a><SiteHeader/><main id="main-content">{children}</main><SiteFooter/></div>}
export function Breadcrumb({title,blog=false}){return <nav className="ed-breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span>{blog&&<><a href="/blog">Painting Guides</a><span aria-hidden="true">/</span></>}<span aria-current="page">{title}</span></nav>}
