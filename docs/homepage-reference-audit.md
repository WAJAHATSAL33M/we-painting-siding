# Homepage reference audit — 15 October 2026

Reference: supplied `We paint siding Homepage(2).pdf`, eleven flattened artwork panels. All eleven reference image hashes match the previous supplied demo; this is a detail pass against the accepted live homepage, not a redesign.

## Protected layout

Retain the existing full-width backgrounds, centered 1,440px content shell, section padding, margins, responsive service hierarchy, logo and clean photos. Keep marketing text, benefit labels, captions and form controls as native HTML. Do not restore text-containing PDF panels.

| Reference panel | Review |
| --- | --- |
| 1 Header and hero | Existing links, hero copy, three benefits, photo phrase and bottom tagline retained. Interior stays a primary service per the approved hierarchy. |
| 2 Services | Both core service choices, divider, photo phrase and reassurance row retained; cabinets remain within Interior. |
| 3 Exterior | Ten surface links and all four benefits retained. Lower-right ribbon now uses its own reference silhouette. |
| 4 Process | Five ordered steps and commitment retained. Original pale-to-blue connector restored between the native icon positions; small native decorative phrase restored in the available upper-right desktop space. |
| 5 Interior/cabinets | Five cabinet subservices and three benefits retained. Lower-right ribbon uses the cabinet panel silhouette. |
| 6 Knowledge | Five guide topics, guide CTA and tagline retained. |
| 7 Projects | Featured caption and five project types retained. Exterior Transformation badge moved to upper right. Separate reference silhouettes used for the upper badge and lower project CTA; lower CTA typography matches the uppercase reference. |
| 8 About | Company copy, team statement, photo and all five values retained. |
| 9 FAQs | Seven accordion questions, testimonial and three contact actions retained. Testimonial uses its own reference ribbon silhouette. |
| 10 Quote | Existing quote copy, service choices, interior-only cabinet choice and accessible fields retained. Existing honest local-draft behavior is preserved. |
| 11 Footer | Current brand logo, columns, legal links and disclosures retained. Actual unlettered blue/navy transition replaces the generic transition. Social symbols are SVG icon shapes rather than font glyph approximations. |

## Intentional current behavior

The reference has an older logo, an older copyright year, a demo phone number and an apparent online submission action. Existing current branding, date, contact routing and truthful draft/newsletter disclosures remain. The original handwriting font is not exposed by the flattened PDF; native Allura text remains an approximation. Section-specific paint silhouettes are extracted without readable lettering; provenance is recorded in `public/images/reference-details/provenance.json`.

## Validation

Production build, section/content hierarchy, image/anchor availability, navigation/Escape focus, FAQ expansion, two main services, interior-only cabinet selection and draft download checks pass. All section widths/heights/padding/margins match the recorded accepted geometry at 1,348px. Layouts were checked at 320, 390, 768, 1024, 1280, 1440 and 1920px with no detected horizontal overflow or clipped text. The restored process phrase was checked for overlap with the nearby paragraph and actions; none was detected. A narrow-screen word-wrap issue in the decorative project badge was corrected with fluid type. The temporary review route is removed.
