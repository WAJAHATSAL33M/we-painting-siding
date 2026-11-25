import { notFound } from 'next/navigation';
import CompanyImage from '../../components/company-image';
import { ArticleSchema } from '../../components/seo-jsonld';
import { SiteHeader, SiteFooter } from '../../components/site-chrome';
import { termSlug } from '../../lib/blog-taxonomy';
import { getPosts, wpsStore } from '../../lib/wps-store';
import { readingTime } from '../shared';
import '../../approved-homepage.css';
import './article.css';
import ArticleGuide from './article-guide';
import ArticleActions from './article-actions';

export const dynamic = 'force-dynamic';

export async function generateMetadata({params}){const {slug}=await params;const post=getPosts('published').find(p=>p.slug===slug);return post?{title:post.seoTitle || post.title, description:post.seoDescription || post.excerpt,alternates:{canonical:'https://wepaintsiding.com/blog/'+slug},openGraph:{type:'article',title:post.seoTitle || post.title,description:post.seoDescription || post.excerpt,url:'https://wepaintsiding.com/blog/'+slug,images:post.image?[{url:'https://wepaintsiding.com'+post.image,alt:post.alt||post.title}]:undefined}}:{}}

export default async function BlogPost({ params }) {
  const { slug } = await params;
  const posts = getPosts('published');
  const post = posts.find(item => item.slug === slug);
  if (!post) notFound();

  const comments = wpsStore().prepare(
    "SELECT id, name, body FROM blog_comments WHERE post_id = ? AND status = 'approved' ORDER BY id"
  ).all(post.id).map(comment => ({ ...comment }));
  const related = posts.filter(item => item.slug !== slug).slice(0, 3);

  return (
    <div className="approved-site wps-article-page">
      <a className="ah-skip" href="#main-content">Skip to content</a>
      <SiteHeader />
      <main id="main-content" className="wps-article-main">
        <ArticleSchema post={post} />
        <article>
          <header className="wps-article-hero">
            <div className={post.image ? "wps-article-frame wps-article-split" : "wps-article-frame"}>
              <div className="wps-article-intro">
                <nav className="wps-article-breadcrumb" aria-label="Breadcrumb">
                  <a href="/blog">Blog</a>
                  {post.category && <>
                    <span aria-hidden="true">/</span>
                    <a href={'/blog/category/' + termSlug(post.category)}>{post.category}</a>
                  </>}
                </nav>
                <h1>{post.title}</h1>
                {post.excerpt && <p className="wps-article-excerpt">{post.excerpt}</p>}
                <p className="wps-article-byline">We Paint Siding <span aria-hidden="true">·</span> {readingTime(post)} min read</p>
              </div>
              {post.image && (
                <CompanyImage
                  className="wps-article-cover"
                  src={post.image}
                  alt={post.alt}
                  width="1536"
                  height="1024"
                  fetchPriority="high"
                />
              )}
            </div>
          </header>
          <div className="wps-article-frame wps-article-body">
            <ArticleGuide postSlug={slug} />
            <div className="wps-article-prose" id="article-copy">
              {post.html ? (
                <div dangerouslySetInnerHTML={{ __html: post.html }} />
              ) : post.sections?.map((section, index) => (
                <section key={section.title} id={'part-' + (index + 1)}>
                  <h2>{section.title}</h2>
                  {section.paragraphs.map((paragraph, paragraphIndex) => (
                    <p key={paragraphIndex}>{paragraph}</p>
                  ))}
                </section>
              ))}
            </div>
            <div>
              {post.tags?.length > 0 && (
                <ul className="wps-article-tags" aria-label="Article tags">
                  {post.tags.map(tag => <li key={tag}><a href={'/blog/tag/' + termSlug(tag)}>{tag}</a></li>)}
                </ul>
              )}
              <ArticleActions key={slug} slug={slug} title={post.title} comments={comments} />
            </div>
          </div>
        </article>
        <div className="wps-article-frame wps-article-more">
          {related.length > 0 && (
            <nav className="wps-article-related" aria-labelledby="related-guides">
              <h2 id="related-guides">More painting guides</h2>
              <ul>
                {related.map(item => <li key={item.slug}><a href={'/blog/' + item.slug}>{item.title}</a></li>)}
              </ul>
            </nav>
          )}
          <a className="wps-article-back" href="/blog">← Back to the blog</a>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
