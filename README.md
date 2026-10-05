# We Paint Siding — PDF homepage rebuild

Next.js homepage reconstructed section by section from the supplied We Paint Siding New Demo PDF. All page text, navigation, cards, forms, and icons are HTML/SVG components, not screenshots.

## Development
Node.js 24. Run npm ci, then npm run dev.
Production: npm run build, then npm start.
Vercel: Next.js preset, repository root, default build settings.

## Clean layout update
Brush-edge shapes, paint underlines, decorative stroke dividers and brush backgrounds have been removed. Handwritten accents are horizontal and occupy dedicated layout space. Text, photos, resource cards, captions and forms use aligned grids with consistent section padding. Mobile layouts place section copy before photography. Gallery captions appear below photos. The existing colors, fonts, images, and section content are retained.

## Reference design
The 11 reference sections are preserved:
1. Header and fresh-finish hero.
2. Two core services, brush dividers, and benefits strip.
3. Exterior painting feature and ten service icons.
4. Five-step painting process and commitment band.
5. Cabinet painting feature and five cabinetry service summaries.
6. Painting knowledge feature, resource panel, and five guides.
7. Featured project and five gallery tiles.
8. About feature, craftsmanship sidebar, and benefits strip.
9. Seven FAQ accordions and three contact options.
10. Quote section with project form.
11. Brush-edged footer, brand mark, five columns, social controls, newsletter form, and legal links.

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
