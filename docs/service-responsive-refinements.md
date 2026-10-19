# Service page responsive refinements

Updated the two main painting pages and the shared templates used by ten exterior and six interior/cabinet sub-service pages.

- Exterior detail heroes now retain both container gutters, a separated text/image grid and a rounded image frame, matching the interior treatment.
- Detail-page content grids and main-page split sections stack at 1024px. Tablet scope panels no longer compete for narrow columns.
- Smaller-screen content photos use bounded landscape ratios rather than desktop minimum heights or stretched flex images.
- Form fields, pricing notes, project notes and interior scope/gallery cards stack earlier at 767px.
- Mobile sections have 36px vertical padding; local selectors sit below photographs without negative overlap margins.
- Main-page buttons and service cards stack on phones. Interior main service cards use two columns on tablets.

Validation: production webpack build; generated HTML checks covering all 16 sub-service routes, ten sections each, 96 FAQ answers, 2,744 service links and distinct interior image references; site-wide check of 63 HTML pages, 10,534 internal links and 123 image paths; PostCSS parsing of all changed stylesheets. All passed.

Limit: browser/device rendering is unavailable in this environment. This is a source-level responsive audit and production-build verification, not rendered mobile/tablet visual QA. No claim of actual-device testing is made.
