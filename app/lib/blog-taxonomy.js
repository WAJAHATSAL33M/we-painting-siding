export function termSlug(label) {
  return label.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export function blogTerms(posts, kind) {
  const terms = new Map();
  for (const post of posts) {
    const labels = kind === 'category' ? [post.category] : post.tags ?? [];
    for (const label of labels) {
      if (!label) continue;
      const slug = termSlug(label);
      if (!slug) continue;
      if (!terms.has(slug)) terms.set(slug, { label, slug, posts: [] });
      terms.get(slug).posts.push(post);
    }
  }
  return terms;
}
