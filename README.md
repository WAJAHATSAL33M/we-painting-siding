# We Paint Siding — PDF homepage rebuild

Next.js homepage reconstructed section by section from the supplied We Paint Siding New Demo PDF. All page text, navigation, cards, forms, and icons are HTML/SVG components, not screenshots.

## Development
Node.js 24. Run npm ci, then npm run dev.
Production: npm run build, then npm start.
Vercel: Next.js preset, repository root, default build settings.

## Clean layout update
Handwritten accents and signature wrappers are removed. The homepage uses a wider 1480px container with fluid gutters, clear spacing between sections, matching service cards with aligned image and content columns, and normal-flow image captions. Desktop, tablet and mobile grids use explicit breakpoints, with single-column service cards and gallery cards on small phones. All core sections, branding, imagery, links and form behaviors are preserved.

## Marked screenshot corrections
Hero and feature imagery are grouped with their benefit rows. Detached captions are removed, exterior service icons are aligned in cards, the commitment label is part of its copy, FAQ imagery sits below the intro, and the quote form uses visible labels alongside compact supporting imagery. The existing container width, gutters and section spacing are retained.

## Reference design
The 11 reference sections are preserved:
1. Header and fresh-finish hero.
2. Two aligned service cards and benefits strip.
3. Exterior painting feature and ten service icons.
4. Five-step painting process and commitment band.
5. Cabinet painting feature and five cabinetry service summaries.
6. Painting knowledge feature, resource panel, and five guides.
7. Featured project and five gallery tiles.
8. About feature, craftsmanship sidebar, and benefits strip.
9. Seven FAQ accordions and three contact options.
10. Quote section with project form.
11. Clean footer, brand mark, five columns, social controls, newsletter form, and legal links.

Sampled reference colors: paper #f5f4f3, heading ink #071b2c, primary blue #0968af. Poppins 400–900 and Allura 400 are self-hosted under public/fonts, with SIL Open Font License notices included. The original PDF has no font resources; these fonts were selected by visual comparison, not extracted.

## New imagery
Every image referenced by the homepage is newly generated with the built-in image-generation tool and integrated as an optimized WebP in public/images/v2. No image is extracted from the PDF.

Prompt briefs:
- house.webp: sharp natural daylight photograph of an Ontario white siding home with charcoal gables, black windows, warm wood porch soffit, stone foundation, hydrangeas and blue sky.
- kitchen.webp: daylight kitchen with slate blue shaker cabinetry, brass handles, marble counters, wood stools and clear glass pendants.
- painter.webp: professional painter from behind painting blue siding, white WePaint Siding shirt and charcoal cap.
- tools.webp: closeup of a gloved brush applying blue paint, paint can and ladder beside blue wood siding.
- living.webp: airy white living room with fireplace, bookshelves, blue cushions, cream seating and garden windows.
- door.webp: navy front door with brass hardware, white trim, stone porch and potted plants.
- brick.webp: pale painted brick facade with a large arched dark-framed window and leafy surroundings.
- vanity.webp: navy double vanity with brass handles/faucets, white counter, mirrors and sconces.

These are illustrative website images, not verified client-project photographs. The gallery identifies that distinction. Original generated PNGs are retained separately in the task workspace; only optimized WebPs are shipped.

## Interactive behavior
Responsive menu and service/location dropdowns; seven native FAQ disclosures; working section links; accessible information dialogs with keyboard focus handling; project-request draft download.

Business delivery destinations have not been supplied. Quote submissions explicitly download a local draft and do not claim to send it. Newsletter submission explains that subscriptions are not yet available. Social profiles are not guessed. Configure real destinations and a validated, rate-limited backend before enabling lead/newsletter delivery.

Homepage-only navigation uses section links until the remaining website pages are built.

## Validation
Production compilation and static page generation passed with webpack. Workspace memory-reporting compatibility was supplied through an untracked test-only preload; it is not part of the app or deployment. Built HTML is checked for a single H1, valid section anchors, new image files, alternative text and all expected FAQ/dropdown controls. Browser visual verification is unavailable in this workspace.

The owner has authorized pushing and deploying requested changes without repeated confirmation.

## About Us page
The /about route follows all nine sections of the supplied About Us PDF: introduction, story/purpose, beliefs, approach, core services, craftsmanship, Southern Ontario service areas, gallery and closing CTA. Shared header/footer navigation links to both pages. Typography, container width and gutters inherit the homepage system; decorative brushes and handwritten accents are omitted. The gallery offers working category filters and clearly labels illustrative images. Unverified project counts and satisfaction figures from the mockup are not published.

Four new images were generated with the built-in image-generation tool and optimized as WebP under public/images/about: team.webp (painter rolling white trim beside blue siding), detail.webp (gloved hand carefully brushing white exterior molding), office.webp (modern navy reception with white desk and glass meeting room), van.webp (unbranded contractor van beside a painted Ontario house at late afternoon). Prompt constraints: wide, sharp natural photography, no logos, lettering, watermark or brush graphics. Existing generated homepage photographs supply the house, kitchen, living room and detail gallery. These images are illustrative.

The region map uses a Google Maps embed, with a narrowly scoped frame-src allowance and an external map fallback link. No business phone number was supplied; the closing secondary CTA directs to the project-request area. Production build and static checks cover both routes; browser visual verification is unavailable in this workspace.

## Contact Us page
The /contact route follows the four Contact Us PDF sections: contact introduction/request form, four-step follow-up process, core services and Ontario service areas, and the closing request/areas panel with trust strip. Shared navigation links Home, About Us and Contact across all three routes. The form preserves the reference fields and choices with native validation, a multiple-service check, and a local quote-request draft download. Direct delivery remains unconfigured and is clearly disclosed. The page adds no sections, brush decorations or handwritten accents.

Three new photographs were created using the built-in image-generation tool and optimized in public/images/contact: tools.webp (ladder, white paint bucket with blue paint and roller on a drop cloth at an Ontario porch), house.webp (white/charcoal gabled home, hydrangeas and late-afternoon light), kitchen.webp (white upper/navy lower cabinets and island, brass hardware, wood floor and stone counters). Prompts requested sharp natural wide photography without lettering, logos, watermarks or graphic overlays.

Contact hero form correction: explicit full-width block text controls, shared typography, light borders, white rounded card, paired field grid, full-width project textarea and independent checkbox/radio sizing. This removes browser-default inline controls seen in the supplied screenshot.
