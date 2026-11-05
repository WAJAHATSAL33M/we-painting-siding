# Property surface guides

Added after the introduction and before the service cards on `/exterior-painting` and `/interior-painting`. Existing sections, navigation and footer are retained.

## Behaviour and scope

- Shared client component: `app/components/surface-guide.js`.
- Page-specific content, percentage coordinates and service links: `app/data/surface-guides.js`.
- Real text and native buttons, pressed state, visible focus and a live detail region; no text is baked into the photographs.
- Exterior: siding, brick/masonry, window frames, exterior doors, fascia, soffits and eavestroughs. The latter three use a separate roof-edge photograph.
- Interior: walls, ceilings, trim, installed doors and installed cabinets. Basement painting remains a separate space-level service link.
- The selected surface controls the detail explanation, zoomed photo and service link. Only work in the written quote is included.
- Wide: selector / photograph / details. Tablet: selector and photograph, then horizontal details. Phone: photograph, two-column selector and details. At 360px and below the roof-edge inset becomes a separate close-up beneath the house to keep its controls usable. Photographs retain their complete 3:2 framing, so markers do not drift with image cropping.
- All photo markers are percentage anchored. Reduced-motion preferences remove control transitions.

## Generated assets and prompt specifications

Built-in image generation; final optimized assets in `public/images/surface-guide/`, all 1536 × 1024 WebP. These are illustrative images, not company project documentation.

| Asset | Prompt subject and constraints |
| --- | --- |
| exterior.webp | Straight front view of an Ontario bungalow, blue-grey horizontal siding, lower red brick wall, opaque white window frame, installed charcoal door, visible fascia/soffit/gutter. Clear unobstructed surfaces, natural light. |
| interior.webp | Open-plan Ontario interior, sage walls, white ceiling and trim, installed charcoal door and fitted navy cabinetry. Low minimal furniture and clear surface boundaries. |
| roof-edge.webp | Accurate close-up of white vertical fascia, perforated soffit underside and charcoal eavestrough, with distinct real construction geometry. |

All prompts request photorealistic architectural photography, with no labels, UI, text, watermarks, logos, people, painting tools or detached doors. All labels and interactions are implemented separately in HTML/CSS/React.

## Verification

- JS/JSX and CSS parse checks; asset dimensions and marker coordinates checked.
- All 12 selections exercised against the rendered React component to check selected states, content and service links.
- Local full build is blocked by the environment's `uv_resident_set_memory` error. Managed browser preview is unavailable because its preview daemon mailbox is absent. Do not report a visual device/browser pass from this environment.
- Production compilation and deployed page/image checks are performed through the normal GitHub/Vercel workflow.
