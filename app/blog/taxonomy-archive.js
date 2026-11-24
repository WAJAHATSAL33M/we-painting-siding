import { notFound } from 'next/navigation';
import { getPosts } from '../lib/wps-store';
import { blogTerms } from '../lib/blog-taxonomy';
import PageShell, { Breadcrumb } from '../support/page-shell';
import { PostCard } from './shared';

export function archiveMetadata(kind, slug) {
  const term = blogTerms(getPosts('published'), kind).get(slug);
  if (!term) return { robots: { index: false } };
  return {
    title: term.label + ' | Painting Guides | We Paint Siding',
    description: 'Browse We Paint Siding guides about ' + term.label + '.',
    alternates: { canonical: 'https://wepaintsiding.com/blog/' + kind + '/' + slug },
  };
}

export default function TaxonomyArchive({ kind, slug }) {
  const term = blogTerms(getPosts('published'), kind).get(slug);
  if (!term) notFound();
  return <PageShell>
    <section className="ed-hero"><div className="ah-container">
      <Breadcrumb title={term.label} blog/>
      <div className="ed-intro"><h1>{term.label}</h1></div>
    </div></section>
    <section className="ed-section ah-container"><div className="blog-grid">
      {term.posts.map(post => <PostCard key={post.id} post={post}/>)}
    </div></section>
  </PageShell>;
}
