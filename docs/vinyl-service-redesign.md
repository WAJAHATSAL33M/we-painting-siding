# Vinyl siding: local service page pilot

Scope: `/exterior-painting/vinyl-siding-painting` only. Shared navigation, footer, Poppins, navy/blue palette and core page gutters are retained. No brushes, signatures or numbered section eyebrows.

## Benchmark and design decisions

Reviewed first-party service page content on 2026-10-17:

- Five Star Painting: https://www.fivestarpainting.com/residential/exteriors/painting-vinyl-siding/
- CertaPro York: https://certapro.com/york/vinyl-aluminum-siding-services/
- CertaPro Toronto: https://certapro.com/toronto/residential-painting/services/vinyl-siding-painting/
- Home Painters Toronto: https://www.homepainterstoronto.com/vinyl-windows-and-siding-painting/

The useful pattern is an explicit service/location headline, an early estimate path, service-specific scope, project evidence, preparation information and practical questions. This is a content/hierarchy review, not a visual browser audit or a claim that these sites rank highest globally.

The implementation has five main sections: direct local-service hero and community starter; service scope with company before/after photos; four-step preparation process; local coverage and service-specific project draft form; FAQs and complementary services. An anchor strip supports browsing. The hero selection carries into the quote form through React context. A mobile action hides while the quote area or footer is visible.

The supplied company photo pair is labelled before/after, with no drag overlay because its camera positions differ. No unverified project location, rating, warranty, response time or office is introduced. The other two photos are illustrative. The directory contains 25 communities; coverage availability is confirmed for each property.

The form exports a local ZIP containing the project brief and selected photo bytes. It does not send an enquiry and explicitly says so before submission and in its result message. Real delivery requires a separately configured recipient/backend.

## Technical content

Benjamin Moore vinyl painting guidance and Sherwin-Williams warped vinyl guidance informed cautious preparation and colour text. Suitability, product instructions and siding manufacturer limitations must be checked; painting is not presented as a repair for damaged siding.

- https://www.benjaminmoore.com/en-ca/contractors/job-solutions/professional-how-to-guides/painting-vinyl-siding
- https://www.sherwin-williams.com/en-us/project-center/maintenance-repair/how-to-repair-warped-vinyl-siding

## Validation and limits

Production build generates all 65 routes. `python scripts/check-vinyl-page.py` checks generated HTML, five sections, FAQ semantics, form labels, 25 community choices, metadata, structured data, internal links/anchors, image dimensions and isolation of other service routes. CSS contract and available-width checks cover 320–1920 px, including mobile, tablet and desktop breakpoints. A ZIP payload round-trip verifies the helper preserves brief and photo bytes.

These checks do not constitute rendered device testing. The managed environment lacks the supported browser-control capability; device screenshots, measured browser overflow, visual alignment and interactive browser sign-off remain unverified. A scratch-only memory telemetry fallback enables the build when `/proc/self/statm` is absent; it is not deployed.
