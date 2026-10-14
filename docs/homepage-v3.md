# Approved homepage implementation — October 2026

Implements the finalized desktop/mobile concept as HTML, React and scoped CSS, not flattened mockup screenshots. Full-width section backgrounds wrap a centred, fluid container up to 1600px. The mobile breakpoint is 760px; navigation collapses at 1020px, with intermediate adjustments at 1240px and small-phone refinements at 380px.

## Sections
1. Utility strip, unchanged logo, responsive navigation and inside/out hero.
2. Equal exterior/interior service gateways.
3. Company before/after comparison with siding, brick and stucco selectors.
4. Exterior surface feature and ten service links.
5. Interior feature, with cabinet painting nested inside it.
6. Five-step process and preparation/commitment panel.
7. Company imagery, approach and team philosophy.
8. Responsive real Google Maps regional embed, searchable communities and all 25 location links.
9. Six FAQ disclosures and five subordinate planning-guide links.
10. Exterior/interior quote selector, conditional interior service, local draft form and responsive footer.

Interior navigation links into the homepage section; existing cabinet routes remain available. Inner-page layouts are retained; their shared navigation now groups cabinetry under Interior Painting. No new interior detail pages are implied by the homepage section links.

The map opens on the Greater Toronto and Hamilton area. Selecting a listed community and submitting the location search focuses the embedded map on that Ontario community. It is a real provider map with native pan/zoom and a fallback external map link. Provider labels/controls remain intact; restrained desaturation aligns it with the concept. The mockup's artificial boundary and placeholder are not published.

Quote delivery remains explicitly draft-only, matching the approved mockup and existing behavior. No personal data is submitted. Service selections can preset the interior detail in the planning form. No business phone, reviews, certification, warranty or project statistics have been invented.

## Image provenance
Exterior, worker, van and before/after photographs come from the supplied company collection. The original logo is unchanged. Existing illustrative living-room and supplied cabinet inspiration remain identified as inspiration.

Two supplementary bitmap assets were generated using the built-in image generation tool and optimized as WebP:
- `public/images/home-v3/interior.webp`: bright Ontario living/dining room with blue-grey accent wall, white trim, cream sofa, oak coffee table and an open dining-room doorway; realistic daylight, no logos or text.
- `public/images/home-v3/interior-overview.webp`: edit of the existing illustrative room, preserving architecture and furnishings while changing the main wall to blue-grey and cushions to muted blue/cream; no logos or text.

These are illustrative finish inspiration, not company project photographs. All page imagery is distinct; the logo is intentionally reused in header/footer.

## Validation
- `npm run build -- --webpack`: passed; all 62 routes generated.
- DOM interaction checks: navigation opening/Escape/focus return, project switching, comparison range position, city filtering/map focus, interior presets, exterior/interior form state, and draft download passed.
- Prerendered HTML: ten sections, single H1, unique IDs, all image assets, all 25 communities and 122 internal route links verified.
- CSS isolation/full-width main override and responsive rules reviewed at 1240/1020/760/380 breakpoints.
- `git diff --check`: passed.
- Browser visual verification is unavailable in this managed workspace; no screenshot-based or device-rendering QA is claimed.
