# Shared painting sub-service template

The approved architectural theme now covers 23 service routes: ten exterior services, seven general interior services, Cabinet Painting within Interior Painting, and its five cabinet component/room services. Existing exterior and cabinet URLs are retained. Interior main-page cards and the shared navigation now open the new interior detail pages.

`app/data/service-pages.js` provides each route’s name, introduction, surface guidance, scope, preparation, coating considerations, photos, FAQs, metadata and related services. The existing exterior and cabinet content is reused where relevant; interior profiles include service-specific details for walls, ceilings, trim, doors, stairs, whole-home and commercial projects.

All pages use eight sections: hero, suitability overview, scope, process, finish inspiration, local coverage, FAQs/related services, and project request. A shared compact footer follows. The hero uses a heading/introduction row above a wide photo with a restrained caption, distinct from the homepage’s navy copy panel. No brush decorations, handwriting or numbered section labels are used.

The template preserves Poppins, navy/blue colours, wide content gutters and purposeful section spacing. Scoped responsive styles switch multi-column layouts to two columns and then a single column, with readable form controls, wrapping breadcrumbs and native keyboard-accessible FAQ disclosures. Existing homepage and main service layouts are preserved.

Existing service-specific repository photography is reused. Gallery imagery is identified as illustrative finish inspiration, without invented project testimonials or before/after claims. The local section links to verified existing community pages. Each route has its own title, description, canonical, Open Graph image, Service data and breadcrumb data. `/sitemap.xml` and `/robots.txt` include the service routes.

The service-specific form validates required fields, accepts up to ten photos of up to 10 MB each and exports the project brief and original photo bytes together as a ZIP. It clearly states that online enquiry delivery is not connected. No contact details or backend integration were invented.

Validation: production Next.js build; generated HTML checks across all 23 service routes for eight sections, one H1, unique metadata, canonicals, structured data, service-specific form values, labels, IDs, internal links and anchors, referenced image paths, FAQs and XML sitemap coverage. ZIP contents and CRC were verified. Local build memory telemetry requires a scratch-only fallback because this environment does not mount `/proc/self/statm`; this fallback is not deployed. Browser visual QA is unavailable in this environment, so no device screenshots or visual pass are claimed.

Run after a production build: `python scripts/check-service-pages.py`. When the checkout does not contain all existing remote assets, an optional JSON array of repository file paths may be passed as the first argument for asset validation.
