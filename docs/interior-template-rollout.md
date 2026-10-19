# Interior detail template rollout

The five `/interior-painting/[service]` pages and `/cabinet-painting` now use a dedicated ten-section interior variant of the exterior theme. Section order: service hero, suitability/overview, room/component scope, preparation process, colour/finish planning, inspiration gallery, quote factors, local coverage, FAQs, project draft form.

The Poppins/navy/blue system, wide containers, button styles, native FAQ disclosures and responsive form are shared with the exterior pages. Interior-specific layouts retain the former image/copy overview and four-part scope idea, with a reversed colour composition and room-access guidance. No brushes, signature accents or numbered eyebrows. Exterior layouts and menus remain unchanged.

`interior-template-content.json` supplies six unique profiles, seven image slots each, scope and six FAQs. The rendered main content uses each image once. Reused images are also checked by repository blob SHA to catch duplicate files under different names. Shared navigation logos are outside this content-image check.

Cabinet images are an explicit visually reviewed allowlist: installed blue-grey kitchen, installed white kitchen, installed protected kitchen, attached/closed cabinet door detail, complete built-ins, complete vanity and complete olive/offwhite kitchen. No cabinet-subservices preparation image, detached door/front, spray rack, workbench or loose cabinet component is used. Existing four images and three generated cabinet photographs were visually inspected. A fourth new photograph gives Basement Painting a lower-level room with high-set windows.

Generated briefs requested complete installed cabinetry with all fronts attached, protected counters/floors, an attached closed-door finish detail, a complete olive/offwhite kitchen, and a finished basement room. Built-in image generation was used. New WebP assets are in `public/images/interior-design/`; no removed-component imagery was generated or approved.

The project form receives the current service, path, prompts and unique interior download slug. It exports the existing local ZIP draft and states that online delivery is not connected. Canonical and Service/Breadcrumb data remain route-specific; Open Graph images follow the selected interior hero.

Validation: production build; 16 service pages with ten sections and six FAQs each; seven non-repeating content images on every interior route; cabinet image allowlist; unique metadata; labels, default service field and schema; internal destinations/anchors; sitemap; shared collapsed menus; CSS syntax and mobile/tablet rules. Supported browser control is unavailable, so rendered device screenshots, measured visual alignment and browser interaction sign-off remain unverified.
