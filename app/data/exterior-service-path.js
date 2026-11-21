export function exteriorServicePath(slug) {
  return slug === 'siding-painting' ? '/siding-painting' : '/exterior-painting/' + slug;
}
