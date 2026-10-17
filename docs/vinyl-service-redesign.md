# Vinyl siding painting: focused service page pilot

Scope: `/exterior-painting/vinyl-siding-painting` only. Other service layouts and all core page designs are retained. Existing metadata and canonical generation stay in the route. The new component renders service and breadcrumb structured data for this page.

## Source audit

The homepage, `about/reference-about.js`, `locations/local-page.js` and Contact use the approved Poppins/navy/blue system with broad image-and-copy compositions, clear section rhythm and shared navigation/footer. The current service wrapper delegates every service to `components/interior-service-template.js`. That template uses eight sections, repeated scope/process/gallery blocks, section labels, numbered feature lists and a large request area. Its `interior-service.css` also reduces heading sizes and spacing relative to About. This is a source-level comparison; browser screenshots of the previous page were not available.

The pilot uses the existing brand tokens, `ah-container`, full shared `SiteHeader`/`SiteFooter`, and five sections: service introduction; suitability and included surfaces; vinyl preparation and colour planning; FAQs with local and complementary-service links; closing project invitation. The hero and editorial image/copy sections follow the scale and rhythm of core pages. The preparation section uses the established navy background. No brush decorations, signatures or numbered section labels are introduced.

## Service content research

- Benjamin Moore, Painting Vinyl Siding and Trim: https://www.benjaminmoore.com/en-ca/contractors/job-solutions/professional-how-to-guides/painting-vinyl-siding — remove contamination, rinse and dry, assess primer requirements, follow siding manufacturer guidance and the exact coating instructions.
- Sherwin-Williams, How to Repair Warped Vinyl Siding: https://www.sherwin-williams.com/en-us/project-center/maintenance-repair/how-to-repair-warped-vinyl-siding — dark colour heat absorption and system-specific colour limits matter; painting does not repair warped siding.
- Google Search Central, Creating Helpful, Reliable, People-First Content: https://developers.google.com/search/docs/fundamentals/creating-helpful-content — write for the visitor’s decision, with descriptive headings and useful topic detail instead of adding generic text to hit a word count.

Sources reviewed 2026-10-17. The page paraphrases relevant guidance without implying brand affiliation, specifying a product for every property, guaranteeing savings or fabricating project evidence. Existing illustrative vinyl imagery was inspected before reuse. Local copy names Southern Ontario and links to existing community pages; it does not invent offices or claim coverage availability without a project discussion.

## Validation and limits

Production Next.js build, generated HTML/metadata/structured-data checks, internal destination and anchor checks, FAQ semantics, local image and dimension checks, and isolation checks for other service routes. Responsive CSS contracts cover stacked layouts, flexible grids, mobile CTA width, touch targets and reduced motion. Available-width calculations cover 320, 360, 390, 430, 600, 768, 820, 900, 1024, 1280, 1440 and 1920 px. These calculations and CSS assertions are not rendered browser tests. The environment lacks the supported browser-control capability, so device screenshots, overflow measurements and visual device sign-off are not claimed.

Run `python scripts/check-vinyl-page.py` after a production build with the three referenced images present. A scratch-only build memory-telemetry fallback is used when `/proc/self/statm` is unavailable; that helper is not deployed.
