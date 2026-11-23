import { allServices } from '../data/service-pages';
import locations from '../data/locations.json';
import policies from '../data/support-pages.json';
import { getPosts } from './wps-store';

const origin = 'https://wepaintsiding.com';
const namespace = 'http://www.sitemaps.org/schemas/sitemap/0.9';
export const sitemapCategories = ['core', 'exterior', 'interior', 'locations', 'blog', 'policies'];

function categoryPaths(category) {
  switch (category) {
    case 'core': return ['/', '/about', '/contact', '/our-work', '/faq', '/sitemap'];
    case 'exterior': return ['/exterior-painting', ...allServices.filter(service => service.category === 'exterior').map(service => service.path)];
    case 'interior': return ['/interior-painting', ...allServices.filter(service => service.category === 'interior').map(service => service.path)];
    case 'locations': return ['/locations', ...locations.map(city => '/locations/' + city.slug)];
    case 'blog': return ['/blog', ...getPosts('published').map(post => '/blog/' + post.slug)];
    case 'policies': return policies.map(page => '/' + page.slug);
    default: return [];
  }
}

function xmlResponse(root, entry, paths) {
  const entries = [...new Set(paths)].map(path => {
    const url = new URL(path, origin).href.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
    return '  <' + entry + '><loc>' + url + '</loc></' + entry + '>';
  });
  const xml = ['<?xml version="1.0" encoding="UTF-8"?>', '<' + root + ' xmlns="' + namespace + '">', ...entries, '</' + root + '>'].join('\n') + '\n';
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}

export function sitemapIndex() {
  return xmlResponse('sitemapindex', 'sitemap', sitemapCategories.map(category => '/sitemap-' + category + '.xml'));
}

export function categorySitemap(category) {
  if (!sitemapCategories.includes(category)) return new Response(null, { status: 404 });
  return xmlResponse('urlset', 'url', categoryPaths(category));
}
