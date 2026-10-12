# Homepage reference refresh — 13 October 2026

Reference: the reattached `We paint siding Homepage.pdf` (PDF title `We Paint Siding New Demo`, 11 pages). Its sections were visually inspected before implementation.

The homepage now follows the reference's denser composition: textured image/copy hero and service scenes; flanking photos in the two-service introduction; narrow exterior/cabinet bands; a process introduction beside five steps; floating knowledge card; compact featured/gallery arrangement; About photo with an adjacent sidebar; a three-column FAQ; a photograph behind the desktop quote form; and a navy footer with a painted edge. Tablet and phone rules reflow those arrangements into readable grids or stacked content.

Eight decorative SVG masks were traced from brush silhouettes in the actual PDF: paper edge, mirrored photo edge, underline, vertical divider, process line, footer edge, corner stroke and painted ribbon. The PDF is flattened, so masks recover silhouettes from the supplied pixels rather than an original editable brush asset. Text-shaped cutouts inside the traced regions were filled; the output masks contain paths only, with no reference wording or photographs. The existing website blue/paper/navy colours fill them. No new photographs or generated replacements were used.

The current homepage's rendered wording, heading text, section IDs and image source sequence were compared with the pre-restyle build and remain identical. All 59 inner pages retain their main content, headings, sections and images. Their existing shared header/footer styling is retained; the painted navy footer is scoped to the homepage. Its supplied original logo remains unchanged, on a white backing so its JPEG background blends into that area.

Scroll reveal and photo-hover motion are progressive enhancements. Content starts visible without JavaScript. The reveal observer only runs on the homepage and exits when reduced motion is requested; CSS also disables the reveal/hover motion for that preference.

Validation: Next.js production build; all 60 routes' text/image/heading/section preservation; unique IDs and one H1 per route; ARIA targets; asset paths; CSS and SVG syntax; source breakpoint declarations. Browser screenshots and real-device rendering are unavailable in this environment, so no pixel-perfect rendering or complete browser/device QA is claimed. The reference's layouts are adapted around the current longer copy and current photos.
