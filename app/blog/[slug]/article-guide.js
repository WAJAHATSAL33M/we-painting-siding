'use client';

import { useEffect, useState } from 'react';

export default function ArticleGuide({ postSlug }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const headings = [...document.querySelectorAll('#article-copy h2')];
    setItems(headings.flatMap((heading, index) => {
      const title = heading.textContent.trim();
      if (!title) return [];
      if (!heading.id) {
        let id = 'article-section-' + (index + 1);
        while (document.getElementById(id)) id += '-heading';
        heading.id = id;
      }
      return [{ id: heading.id, title }];
    }));

    // Managed HTML headings receive their anchors after hydration.
    if (location.hash.startsWith('#article-section-')) {
      document.getElementById(location.hash.slice(1))?.scrollIntoView();
    }
  }, [postSlug]);

  if (!items.length) return null;

  const links = (
    <ul>
      {items.map(({ id, title }) => <li key={id}><a href={'#' + encodeURIComponent(id)}>{title}</a></li>)}
    </ul>
  );

  return (
    <aside className="wps-article-guide">
      <nav className="wps-article-guide-desktop" aria-label="In this guide">
        <p>In this guide</p>
        {links}
      </nav>
      <details className="wps-article-guide-mobile">
        <summary>In this guide</summary>
        <nav aria-label="In this guide">{links}</nav>
      </details>
    </aside>
  );
}
