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

## Exterior Painting main service page
The /exterior-painting route follows all ten sections of the Exterior Painting Main Page PDF: hero, explanation, ten exterior services, eight surface considerations, four-step approach, residential/commercial property types, why painting matters, service areas, fourteen native FAQ disclosures and closing CTA. Shared navigation and footer link to the new route; quote and contact actions use /contact. The established typography, colors, container and spacing are retained. No brush decorations or handwritten accents are used. Specific service/location subpages are not invented; cards and area links direct to the relevant quote flow. FAQ answer text is provided for the collapsed questions in the reference.

Three new assets were generated with the built-in image-generation tool and optimized under public/images/exterior: house.webp (navy siding Ontario home, white gable/porch trim, charcoal roof and hydrangeas), commercial.webp (cream/charcoal low-rise commercial building with black storefront windows and landscaping), skyline.webp (Toronto and CN Tower across Lake Ontario from a rocky lakeshore). Prompts requested sharp natural wide photography without lettering, logos, watermarks or graphic overlays. Existing generated painter and trim-detail assets supplement the process section. The region map uses the existing allowed Google Maps embed.

## Exterior subservice pages
Ten statically generated routes share the six-section PDF template: service hero, explanation, coverage, four-step approach, owner considerations, and related services/CTA. Each route has unique title/description, service-specific copy, scope and preparation notes, and two newly generated image assets. The existing typography, colors, container width, spacing and responsive rules are retained; no brush graphics or handwritten accents are used. Header dropdown entries, homepage icons, main service cards and related-service cards connect to the individual routes. A compact links-only dataset is used by the shared client navigation.

Data: app/data/exterior-subservices.json. Template: app/exterior-painting/[service]/page.js. Each service has public/images/subservices/<slug>/hero.webp and detail.webp, created with the built-in image-generation tool. Prompt subjects: spray painting (charcoal home / masked airless application with respirator); aluminum (blue aluminum bungalow / coating aluminum lap panels); siding (blue gabled home / roller on prepared siding); vinyl (sage home / inspecting finished vinyl); brick (off-white brick home / brush on brick and mortar); stucco (cream stucco home / roller on textured wall); wood (blue clapboard cottage / brush on wood grain); eavestrough/fascia (coordinated roofline / careful fascia application); windows/doors (navy entry / detail brush on door panel); commercial (cream/charcoal building / coating storefront wall). All prompts request sharp, realistic wide photographs in natural daylight without lettering, logos, watermarks or decorative brush overlays. The images are illustrative, not documented client projects.


## Cabinet painting main page

`/cabinet-painting` follows the ten sections of the supplied cabinet design, with the established paper background, Poppins typography, blue/ink palette, content width and responsive gutters. Brushes, handwritten accents and small section labels remain omitted. Header, footer and homepage cabinet links connect to the page and its five service anchors. The service-area section uses the existing Ontario locations and live map. Before/after imagery is explicitly identified as illustrative, rather than client project photography.

Eight images were created with the built-in image generation tool and saved as optimized WebP files at `public/images/cabinet/`. Final prompt set:

- `public/images/cabinet/kitchen.webp`: Use case: photorealistic-natural. Asset type: cabinet painting website photograph. Bright Ontario home kitchen with professionally painted soft white shaker cabinets, navy blue island, quartz counters, warm wood stools, black hardware, pendant lights, daylight. Wide architectural interior photo. No text logos watermark.
- `public/images/cabinet/vanity.webp`: Use case: photorealistic-natural. Asset type: cabinet painting website photograph. Elegant bright bathroom with professionally painted sage gray double vanity cabinetry, white quartz top, black faucets, mirrors, small plant, light tile. Wide architectural photo, realistic finish, no text logos watermark.
- `public/images/cabinet/doors.webp`: Use case: photorealistic-natural. Asset type: cabinet painting website photograph. Cabinet painting detail photo: two freshly painted shaker cabinet doors and one drawer front, soft white and slate blue, carefully resting on clean workbench, crisp smooth satin finish, natural workshop light. No text logos watermark.
- `public/images/cabinet/box.webp`: Use case: photorealistic-natural. Asset type: cabinet painting website photograph. Close interior photo of a professionally painted light gray cabinet box with door open, clean shelves, silver hinges, face frame and exposed end panel visible, quartz counter above. No text logos watermark.
- `public/images/cabinet/builtins.webp`: Use case: photorealistic-natural. Asset type: cabinet painting website photograph. Refreshed white built-in cabinetry and bookshelves in a bright living room, lower paneled doors, warm brass handles, books ceramics plants, window at left, subtle navy chair. Architectural photo. No text logos watermark.
- `public/images/cabinet/before-kitchen.webp`: Use case: photorealistic-natural. Asset type: cabinet painting website photograph. Photorealistic side-by-side before and after kitchen cabinet painting concept, two equal panels, same exact kitchen viewpoint and cabinet layout, original honey oak cabinetry at left, professionally painted soft white cabinets navy island at right. Same countertops appliances hardware room in both, only cabinet paint changes. Straight vertical split. No labels text watermark.
- `public/images/cabinet/before-vanity.webp`: Use case: photorealistic-natural. Asset type: cabinet painting website photograph. Photorealistic side-by-side before and after bathroom vanity cabinet painting concept, two equal panels, exact same vanity bathroom viewpoint and layout, honey oak wood vanity at left, sage gray painted vanity at right. Same white countertop mirror black faucet objects lighting in both. Only cabinet paint changes. Straight vertical split. No text labels watermark.
- `public/images/cabinet/before-builtins.webp`: Use case: photorealistic-natural. Asset type: cabinet painting website photograph. Photorealistic side-by-side before and after living room built-in cabinet painting concept, two equal panels, same exact cabinetry shelves objects room viewpoint and daylight in both, honey oak cabinetry at left, soft white painted cabinetry at right. Only cabinet paint changes. Straight vertical split. No text labels watermark.

Validation: production build, ten-section structure, metadata, navigation anchors and image files/alt descriptions. Browser visual QA was unavailable in this managed environment.


## Location pages

`/locations` follows the five-section location reference: hero, service directory, exterior/cabinet services, local service explanation, and location closing directory. `/locations/[location]` statically generates all 25 communities from `app/data/locations.json`, using the eight-section reference: hero, local services, owner planning guidance, services for properties, project considerations, nearby communities, FAQ, and local service closing. The existing shared shell, self-hosted Poppins, blue/ink colors, paper background, responsive gutters and whitespace remain; brush graphics and handwritten captions are omitted. Header Locations links to the overview and every city. Existing about/exterior/cabinet area listings now link to the same pages.

Responsive live Google Maps embeds replace the reference maps and use a city-specific query on each local page. Burlington's additional nearby communities within Hamilton link to the Hamilton service page. Interior/specialty service links lead to contact because dedicated pages are not yet present. Existing quote delivery behavior is unchanged.

Four newly generated illustrative photos, not extracted from either PDF and not presented as documented client work or exact city landmarks, are optimized as WebP in `public/images/locations/`: exterior, cabinet, interior, and community. Built-in image generation prompt subjects: Southern Ontario home with slate-blue siding and white trim; white shaker kitchen with navy island and quartz worktops; freshly painted warm-white living room with blue cushions; generic Southern Ontario residential neighbourhood with mature trees and maintained homes. All requested high-resolution realistic daylight photographs without text, logos, watermarks, or brush overlays. These shared assets support the cloned template without falsely labeling generated streetscapes as specific landmarks.

Validation: Next.js production build; all 25 city routes and overview; correct five/eight section counts; local navigation/anchor and image checks. The cloud browser cannot reach the local server, so local visual QA is unavailable.
