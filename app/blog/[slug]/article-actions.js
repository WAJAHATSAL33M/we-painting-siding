'use client';

import { useState } from 'react';

export default function ArticleActions({ slug, title, comments }) {
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [copyStatus, setCopyStatus] = useState('');
  const url = 'https://wepaintsiding.com/blog/' + slug;
  const encodedUrl = encodeURIComponent(url);
  const links = [
    ['Facebook', 'https://www.facebook.com/sharer/sharer.php?u=' + encodedUrl],
    ['LinkedIn', 'https://www.linkedin.com/sharing/share-offsite/?url=' + encodedUrl],
    ['WhatsApp', 'https://wa.me/?text=' + encodeURIComponent(title + ' ' + url)],
  ];

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopyStatus('Link copied.');
    } catch {
      setCopyStatus(url);
    }
  }

  async function submit(event) {
    event.preventDefault();
    if (submitting) return;
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form));
    setSubmitting(true);
    setFeedback(null);

    try {
      const response = await fetch('/api/blog-comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, slug }),
      });
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || 'Your comment could not be sent. Please try again.');
      }
      form.reset();
      setFeedback({ text: 'Thanks for commenting. Your comment will appear after approval.' });
    } catch (error) {
      setFeedback({ error: true, text: error.message });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="wps-article-actions">
      <section aria-labelledby="share-article">
        <h2 id="share-article">Share this article</h2>
        <div className="wps-share-links">
          {links.map(([label, href]) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer">{label}</a>
          ))}
          <button type="button" onClick={copyLink}>Copy link</button>
        </div>
        <p role="status">{copyStatus}</p>
      </section>
      <section aria-labelledby="article-comments">
        <h2 id="article-comments">Comments</h2>
        {comments.length ? (
          <ul className="wps-comment-list">
            {comments.map(comment => (
              <li key={comment.id}><strong>{comment.name}</strong><p>{comment.body}</p></li>
            ))}
          </ul>
        ) : <p>No comments yet.</p>}
        <form className="wps-comment-form" onSubmit={submit}>
          <h3>Leave a comment</h3>
          <label>Name<input name="name" required maxLength={80} autoComplete="name" /></label>
          <label>Comment<textarea name="body" required maxLength={2000} rows={5} /></label>
          <label hidden>Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
          <button type="submit" disabled={submitting}>{submitting ? 'Submitting…' : 'Submit comment'}</button>
          {feedback && <p role={feedback.error ? 'alert' : 'status'}>{feedback.text}</p>}
        </form>
      </section>
    </div>
  );
}
