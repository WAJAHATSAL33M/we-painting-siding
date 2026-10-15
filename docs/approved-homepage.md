# Approved homepage implementation

The official `/` route now uses `app/components/approved-homepage.js` and `app/approved-homepage.css`. It implements the eleven approved desktop preview panels as ten main content sections plus the footer: Header/Hero, Our Services, Exterior Painting, Our Painting Process, Cabinet Painting, Painting Knowledge, Our Work, About Us, FAQs, Get a Free Quote, Footer.

The blue/navy Poppins design uses clean architectural photographs, service cards, a five-step navy process section, cabinet directory, five guide cards, a six-image gallery, five company values, seven native FAQ accordions, quote form and five-column footer. Presentation text is HTML; mockup screenshots are not used as page backgrounds. There are no decorative paint textures, masks, handwriting or signature accents.

The existing inner pages remain unchanged. The homepage has a keyboard/touch accessible mobile menu, service/location dropdowns, section anchors and links to the existing service, location, blog, project and legal routes. Layout changes at 1500, 1280, 768 and 380 pixels; dense grids reflow and forms stack on phones. Motion respects the reduced-motion preference. Photos load lazily except the hero, have alt descriptions, and are delivered as optimized WebP.

## Image assets and final briefs

The built-in image generation tool created the following independent photographs using the approved desktop previews as visual references. Each brief included: “Use case: photorealistic-natural. High resolution landscape architectural website photograph. Reproduce the photographed subject from the approved reference only; no website UI, labels, logo, lettering, handwriting or decorative brush graphics.”

- `public/images/approved-home/house.webp`: White gabled Ontario home, black windows/garage, natural timber gabled porch, stone bases, white hydrangeas and trees; frontal three-quarter architectural view.
- `public/images/approved-home/kitchen.webp`: White upper and navy lower shaker cabinetry, quartz island, brass pulls, glass pendants, light stools, natural daylight.
- `public/images/approved-home/slate-house.webp`: Two-story slate blue painted siding home, white trim, natural timber porch and landscaped garden.
- `public/images/approved-home/door.webp`: Navy double front doors, brass hardware, white siding surround, balanced potted plants, timber porch ceiling.
- `public/images/approved-home/brick.webp`: White painted brick corner, tall black-framed window, white hydrangeas, leafy summer trees.
- `public/images/approved-home/vanity.webp`: Navy double vanity, brass pulls and faucets, pale quartz, rectangular mirrors and warm sconces.
- `public/images/approved-home/painter.webp`: Candid professional painter from behind in plain white cap and shirt, carefully finishing exterior white siding in natural daylight.
- `public/images/approved-home/tools.webp`: Silver paint can, blue roller and aluminum ladder beside blue siding and a white window frame.
- `public/images/approved-home/living.webp`: White sofa, navy cushions, black-framed windows, white fireplace and built-ins, pale wood table and greenery.
- `public/images/approved-home/detail.webp`: Close-up gloved hand applying rich blue paint with a flat brush to blue horizontal siding; realistic grain and clean wet finish.
- `public/images/approved-home/cabinet-feature.webp`: Soft slate blue upper/lower shaker cabinetry and island, quartz counters, brass pulls, three pendants, bright window, light oak flooring and upholstered stools.

The gallery identifies these as illustrative design images, not verified client project photographs. Company project photographs remain on the existing project routes.

## Form behavior and validation

The homepage preserves the current browser-only request-draft download behavior; it does not send enquiries. The form explains this before submission and reports that the draft was downloaded rather than sent. Newsletter and social controls keep their existing unavailable states and show honest feedback. No external delivery service was added by this visual redesign.

Production build, generated HTML structure, internal links/fragments, unique IDs, labels, image files, WebP readability and CSS syntax are checked before publication. Browser visual testing is unavailable in this managed environment, so pixel matching and real-device behavior are not asserted as verified. The memory-reporting compatibility preload used for local builds is outside the repository and is not shipped.
