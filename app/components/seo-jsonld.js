// Shared JSON-LD helpers. All data is from the business's own site / verified profiles.
const origin = 'https://wepaintsiding.com';
const cities = ['Burlington','Oakville','Milton','Hamilton','Guelph','Waterloo','Kitchener','Cambridge','Barrie','London',"St. Catharines",'Niagara Falls','Welland','Etobicoke','Mississauga','Toronto','North York','Vaughan','Markham','Richmond Hill','Newmarket','Aurora','King City','Caledon','Brantford'];

export function JsonLd({data}) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(data).replaceAll('<', '\\u003c')}} />;
}

export function LocalBusinessSchema() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'PaintingContractor',
    '@id': origin + '/#localbusiness',
    name: 'We Paint Siding',
    url: origin + '/',
    telephone: '+16476998228',
    description: 'Exterior and interior painting across Ontario, including siding, brick, stucco, trim and kitchen cabinet painting.',
    address: {'@type': 'PostalAddress', streetAddress: '53 Churchill Rd N', addressLocality: 'Acton', addressRegion: 'ON', postalCode: 'L7J 2H8', addressCountry: 'CA'},
    openingHoursSpecification: {'@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'], opens: '08:00', closes: '21:00'},
    areaServed: cities.map(name => ({'@type': 'City', name: name + ', Ontario'})),
    aggregateRating: {'@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '54'},
    sameAs: [
      'https://www.facebook.com/wepaintsiding',
      'https://www.homestars.com/profile/2928012-we-paint-siding',
      'https://maps.app.goo.gl/6XL7bj2AhuF3Mf1j9',
      'https://maps.app.goo.gl/v5gkLXhfxVoAtqZY7'
    ]
  };
  return <JsonLd data={data} />;
}

export function FaqSchema({questions}) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map(([name, text]) => ({'@type': 'Question', name, acceptedAnswer: {'@type': 'Answer', text}}))
  };
  return <JsonLd data={data} />;
}

export function ArticleSchema({post}) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': origin + '/blog/' + post.slug + '#article',
    headline: post.title,
    description: post.excerpt,
    mainEntityOfPage: {'@type': 'WebPage', '@id': origin + '/blog/' + post.slug},
    author: {'@type': 'Organization', '@id': origin + '/#organization', name: 'We Paint Siding', url: origin},
    publisher: {'@type': 'Organization', '@id': origin + '/#organization', name: 'We Paint Siding', url: origin, logo: {'@type': 'ImageObject', url: origin + '/images/we-paint-siding-logo.jpg'}},
    datePublished: post.updated,
    dateModified: post.updated
  };
  if (post.image) data.image = origin + post.image;
  return <JsonLd data={data} />;
}
