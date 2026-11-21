import { SiteHeader, SiteFooter } from '../components/site-chrome';
import { ProjectGallery, ProjectPhoto } from './project-gallery';
import Comparison from './comparison';
import projects from '../data/work-projects.json';
import '../approved-homepage.css';
import './work.css';

export const metadata = {
  title: 'Our Work | Painting Project Gallery | We Paint Siding',
  description: 'See completed siding, brick, stucco, trim and commercial painting work from Toronto and surrounding Ontario communities.',
  alternates: { canonical: 'https://wepaintsiding.com/our-work' },
};

export default function WorkPage() {
  const hero = projects.gallery.find(project => project.id === projects.featured[0]);
  return <div className="approved-site project-site">
    <a className="ah-skip" href="#main-content">Skip to content</a>
    <SiteHeader/>
    <main id="main-content">
      <section className="project-intro">
        <div className="ah-container project-hero">
          <div>
            <nav aria-label="Breadcrumb"><a href="/">Home</a> / <span aria-current="page">Our Work</span></nav>
            <h1>Our Work</h1>
            <p>See how we’ve refreshed siding, brick, trim and commercial buildings across the GTA and surrounding areas.</p>
            <div className="project-actions"><a className="ah-button" href="#painting-gallery">Browse project photos</a><a className="ah-text-link" href="#comparisons">See before and after ↓</a></div>
          </div>
          <figure><ProjectPhoto photo={hero} alt={hero.title} priority/><figcaption>{hero.title} · {hero.location}</figcaption></figure>
        </div>
      </section>
      <ProjectGallery projects={projects.gallery}/>
      <section className="project-compare-section" id="comparisons" aria-labelledby="project-compare-title">
        <div className="ah-container">
          <h2 id="project-compare-title">Before and after</h2>
          <p>Drag the slider or use your arrow keys to compare photos of the same property.</p>
          <div className="project-compare-grid">
            {projects.comparisons.map(pair => <article key={pair.title}>
              <Comparison pair={pair} title={pair.title}/>
              <div className="project-card-copy"><h3>{pair.title}</h3>{pair.location&&<p>{pair.location}</p>}</div>
            </article>)}
          </div>
        </div>
      </section>
      <section className="project-cta"><div className="ah-container"><div><h2>Planning a repaint?</h2><p>Send photos of your property and tell us what you’d like to change.</p></div><a className="ah-button" href="/contact#quote">Request a Free Quote</a></div></section>
    </main>
    <SiteFooter/>
  </div>;
}
