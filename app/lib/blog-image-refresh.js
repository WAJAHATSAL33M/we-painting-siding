import refresh from '../data/blog-image-refresh.json' with { type: 'json' };

const escapeHtml = value => value.replace(/[&<>"']/g, char => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
})[char]);

export function refreshBlogImages(db) {
  const findPost = db.prepare("SELECT id, data FROM posts WHERE slug = ? AND status = 'published'");
  const updatePost = db.prepare('UPDATE posts SET data = ? WHERE id = ?');

  for (const [slug, { image, alt, images }] of Object.entries(refresh)) {
    const row = findPost.get(slug);
    if (!row) continue;

    const post = JSON.parse(row.data);
    const originalHtml = post.html || post.sections?.map((section, index) =>
      '<h2 id="part-' + (index + 1) + '">' + escapeHtml(section.title) + '</h2>' +
      section.paragraphs.map(text => '<p>' + escapeHtml(text) + '</p>').join('')
    ).join('') || '';

    const oldImage = /<img\b(?:[^"'<>]|"[^"]*"|'[^']*')*>/gi;
    const withoutImages = originalHtml.replace(oldImage, '')
      .replace(/<(p|div|figure)\b[^>]*>\s*<\/\1>/gi, '');
    const bySection = new Map(images.map(photo => [photo.section, photo]));
    let section = 0;
    const html = withoutImages.replace(/<\/h2\s*>/gi, closingTag => {
      const photo = bySection.get(++section);
      if (!photo) return closingTag;
      return closingTag + '<img src="' + escapeHtml(photo.src) + '" alt="' +
        escapeHtml(photo.alt) + '" loading="lazy">';
    });

    if (section < Math.max(...bySection.keys())) {
      continue;
    }
    updatePost.run(JSON.stringify({ ...post, image, alt, html }), row.id);
  }
}
