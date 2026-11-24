const tagManager = 'https://www.googletagmanager.com';
const measurementEndpoints = [
  tagManager,
  'https://analytics.google.com',
  'https://*.google-analytics.com',
  'https://www.google.com',
  'https://www.google.ca',
  'https://*.g.doubleclick.net',
  'https://www.googleadservices.com',
  'https://pagead2.googlesyndication.com',
].join(' ');

function contentSecurityPolicy(measurementEnabled) {
  return [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' " + tagManager +
      (measurementEnabled ? ' https://www.googleadservices.com https://www.google.com' : ''),
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data:" + (measurementEnabled ? ' ' + measurementEndpoints : ''),
    "font-src 'self'",
    "connect-src 'self'" + (measurementEnabled ? ' ' + measurementEndpoints + ' https://ad.doubleclick.net' : ''),
    "frame-src 'self' https://www.google.com" + (measurementEnabled ? ' ' + tagManager : ''),
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "object-src 'none'",
  ].join('; ');
}

export default {
  poweredByHeader: false,
  async redirects() {
    return [
      // Existing redirects (unchanged, 23 Nov 2026)
      { source: '/before-and-after', destination: '/our-work', permanent: true },
      { source: '/exterior-painting/siding-painting', destination: '/siding-painting', permanent: true },
      { source: '/cabinet-painting', destination: '/interior-painting/cabinet-painting', permanent: true },
      { source: "/exterior-painting/spray-painting", destination: "/exterior-painting", permanent: true },
      { source: "/exterior-painting/exterior-window-door-painting", destination: "/exterior-painting/window-painting", permanent: true },
      { source: "/interior-painting/trim-baseboard-painting", destination: "/interior-painting/trim-painting", permanent: true },
      { source: "/interior-painting/interior-door-painting", destination: "/interior-painting/door-painting", permanent: true },
      { source: "/interior-painting/stair-railing-painting", destination: "/interior-painting", permanent: true },
      { source: "/interior-painting/whole-home-painting", destination: "/interior-painting", permanent: true },
      { source: "/interior-painting/commercial-interior-painting", destination: "/interior-painting", permanent: true },
      // P0 fix 24 Nov 2026: was /cabinet-painting/:service -> /cabinet-painting -> /interior-painting/cabinet-painting (2 hops); now direct, one hop
      { source: "/cabinet-painting/:service", destination: "/interior-painting/cabinet-painting", permanent: true },
      { source: "/terms-of-use", destination: "/terms-and-conditions", permanent: true },

      // --- P0: old WordPress URLs (all verified 404 on 23 Nov 2026) ---
      // City roots
      { source: '/mississauga', destination: '/locations/mississauga', permanent: true },
      { source: '/toronto', destination: '/locations/toronto', permanent: true },
      { source: '/north-york', destination: '/locations/north-york', permanent: true },
      { source: '/milton', destination: '/locations/milton', permanent: true },
      { source: '/hamilton', destination: '/locations/hamilton', permanent: true },
      { source: '/burlington', destination: '/locations/burlington', permanent: true },
      { source: '/oakville', destination: '/locations/oakville', permanent: true },
      // No-location cities -> hub (no /locations/brampton or /locations/woodstock page exists)
      { source: '/brampton', destination: '/locations', permanent: true },
      { source: '/woodstock', destination: '/locations', permanent: true },
      // City service pages
      { source: '/oakville/exterior-painting', destination: '/locations/oakville', permanent: true },
      { source: '/burlington/exterior-painting', destination: '/locations/burlington', permanent: true },
      // Old service hub + services (aluminum FIRST - slug changes, see note below)
      { source: '/exterior-painting-services', destination: '/exterior-painting', permanent: true },
      { source: '/exterior-painting-services/aluminum-siding-painting', destination: '/exterior-painting/aluminum-painting', permanent: true },
      { source: '/exterior-painting-services/wood-siding-painting', destination: '/exterior-painting/wood-siding-painting', permanent: true },
      { source: '/exterior-painting-services/brick-painting', destination: '/exterior-painting/brick-painting', permanent: true },
      // Catch-all for any other old /exterior-painting-services/* slug (must sit AFTER the aluminum rule)
      { source: '/exterior-painting-services/:path*', destination: '/exterior-painting/:path*', permanent: true },
      // Other old roots
      { source: '/projects', destination: '/our-work', permanent: true },
      { source: '/kitchen-cabinet-painting', destination: '/interior-painting/cabinet-painting', permanent: true },
      { source: '/exterior-painting/vinyl-siding', destination: '/exterior-painting/vinyl-siding-painting', permanent: true },
      // Deep posts -> nearest service page (no matching new blog post exists)
      { source: '/exterior-painting/vinyl-siding/oakville-painter/mastering-blue-grey-vinyl-siding-paint-in-oakville-2', destination: '/exterior-painting/vinyl-siding-painting', permanent: true },
      { source: '/exterior-painting/the-longevity-of-painted-aluminum-siding-what-to-expect', destination: '/exterior-painting/aluminum-painting', permanent: true },
      { source: '/exterior-painting/vinyl-siding/niagara-falls-painter/creative-approaches-to-painting-vinyl-house-exteriors-in-niagara-falls', destination: '/exterior-painting/vinyl-siding-painting', permanent: true },
      { source: '/exterior-painting/choosing-weather-resistant-paint-for-brick-surfaces', destination: '/exterior-painting/brick-painting', permanent: true },
      { source: '/exterior-painting/spray-painting/troubleshooting-common-problems-in-exterior-spray-painting', destination: '/exterior-painting', permanent: true },
      { source: '/uncategorized/choosing-the-right-paint-for-exterior-stairs-a-comprehensive-guide', destination: '/exterior-painting', permanent: true },
      { source: '/uncategorized', destination: '/blog', permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          { key: 'Strict-Transport-Security', value: 'max-age=31536000' },
          { key: 'Content-Security-Policy', value: contentSecurityPolicy(true) },
        ],
      },
      ...['/admin-wps/:path*', '/api/:path*'].map(source => ({
        source,
        headers: [{ key: 'Content-Security-Policy', value: contentSecurityPolicy(false) }],
      })),
    ];
  },
};
