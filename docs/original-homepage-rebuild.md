# Original homepage design rebuild

Visual reference: the 11-page `We paint siding Homepage(1).pdf` supplied on 15 October 2026. This replaces the recent homepage layout, rather than layering more brush effects over it.

The ten homepage sections and footer follow the reference order: hero, services overview, exterior painting and surface links, process and commitment, interior painting with cabinet services, painting knowledge, project gallery, company and values, FAQs and contact options, quote request, dark footer. Exterior and Interior Painting are the two main services; Cabinet Painting remains within Interior.

Original photographic panels, brush edges, handwriting and blue paint accents are extracted from the supplied artwork. No new images were generated. `public/images/original-home/provenance.json` records the source crops. SVG alpha masks for the underline and timeline also use original source pixels. Native HTML supplies the main headings, paragraphs, menus, links, process steps, cards, FAQs and forms. The existing company logo is retained, including a transparent light variant for the dark footer.

The layout uses a named inline-size container. Desktop proportions and phone/tablet layout changes respond to the same component width. Temporary responsive review routes rendered that actual component at 1280, 768, 390 and 360 pixels; they were removed after QA. Browser review exposed and corrected text fragments in the flattened artwork, crowded process copy, desktop card overflows, a hover/click conflict, and wrong responsive artwork selection. No heading or paragraph horizontal overflow was found at the reviewed widths. Phone navigation opens on first click, Cabinet Painting sits inside Interior, and Escape closes the dropdown.

Production build and DOM integration checks cover all ten sections, a single H1, unique IDs, image files, anchor targets, navigation/Escape/focus, single FAQ expansion, two core service choices, conditional interior options, and quote draft download. Internal links resolve to existing generated routes. Existing quote and newsletter delivery limitations remain explicit: the form downloads a local draft; it does not send a lead, and newsletter registration is not active.

The reference contains a desktop composition, so phone and tablet versions are responsive adaptations of that composition. Native text, the updated hierarchy, real routes, company branding, and honest form states intentionally replace flattened demo equivalents. No universal pixel-identical claim is made.
