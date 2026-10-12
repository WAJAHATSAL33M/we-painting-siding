# Search intent, content and responsive audit

Research date: 12 October 2026. Website: We Paint Siding. Scope: all 60 existing public routes, plus the 404 template.

The website copy has been rewritten within the existing sections. The primary topics are professional exterior house painting, cabinet painting and local service discovery in the 25 existing Southern Ontario communities. The supporting guides answer suitability, preparation, cost, colour and care questions. Existing URLs, imagery, typography and colours remain in use.

## Research method and limits

Reviewed current public web-search results for service queries, individual material and cabinet-component queries, Ontario painting cost and timing questions, and the cities already in the service directory. Competitor pages were used to understand language and intent, not copied as text or treated as evidence of this business’s prices, credentials, products, facilities or warranties. Manufacturer documentation was used to check general material and preparation guidance. Google Search Central guidance informed the editorial approach.

Direct Google Search result URLs could not be opened by the research tool. This is a qualitative public-search and competitor analysis, not a verified Google ranking report. Google Ads Keyword Planner, Search Console and account-based search-volume data were not available. No monthly search volumes, CPC, difficulty scores or “most searched” rankings are invented. Priorities below describe fit to the business and the page’s purpose; they are not measured demand estimates.

## Keyword and intent priorities

| Page family | Main intent | Primary topic | Questions and related searches incorporated |
| --- | --- | --- | --- |
| Home | Find a suitable painting company | Exterior and cabinet painting in Ontario | Services, preparation, finish updates, Southern Ontario coverage |
| Exterior overview | Compare a house repaint | Exterior house painting | Surface suitability, painting cost factors, weather, included trim |
| Exterior services | Find a material-specific service | Spray, aluminum, siding, vinyl, brick, stucco, wood, fascia, door and commercial painting | Chalking, moisture, peeling coatings, masking, manufacturer colour limits |
| Cabinet overview | Compare repainting with a bigger renovation | Cabinet painting and painted refinishing | Condition, layout, scope, cost, curing and replacement |
| Cabinet services | Plan work on specific components | Kitchen, vanity, doors/fronts, frames/boxes and built-ins | Visible coverage, backs/interiors, damage, hardware and daily use |
| Locations | Find painters for a property location | Painters in each existing city | Local service options, access, preparation, quote details and cost factors |
| Before and After | Explore visual options | Painting before and after | Generated colour concepts with interactive comparisons |
| Blog and FAQ | Make project decisions | Preparation, cost, colour and care | Weather window, repaint vs replace, curing vs drying, quote comparison |
| Policies and sitemap | Understand or navigate the site | Brand-specific information | Forms, hosting, maps and visitor information; no commercial keyword insertion |

`keyword-map.csv` maps all 60 URLs to their focus, related queries, intent, implemented title, description, H1 and measured before/after word counts.

## Findings implemented

1. Replaced metaphor-only main headings with clear service or page topics, while retaining the same heading levels and section layout.
2. Gave each exterior page material-specific explanation, coverage and preparation guidance. Separated the broad siding page from the aluminum, vinyl and wood specialisms.
3. Replaced kitchen-word substitution on cabinet subpages with five individual content profiles. Vanity copy discusses moisture and material condition; doors/fronts discuss faces, backs and edges; frames/boxes distinguish interiors; built-ins discuss shelving and loading after curing.
4. Added individual planning introductions and property considerations for all 25 locations. These are project examples, not claims that a city has one housing type, that an office exists there or that pictured streets are exact landmarks. Reduced repetitive city mentions in shared body text.
5. Answered cost intent through scope factors, without importing competitors’ rates or inventing this company’s prices. Removed fixed project-duration promises and universal claims about paintable materials or savings.
6. Rewrote all five guides within their four sections. Titles and related links now describe the actual article topic. Kept existing article addresses.
7. Corrected generated-image descriptions and example project labels so they do not claim documented client work. Corrected Contact copy so saving a quote draft does not imply submission or a follow-up promise.
8. Revised policy wording for the current website operation without using legal pages to target painting keywords. Policy sections and operational meaning are retained.

## Responsive source audit and fixes

All route families were reviewed through their shared and page-specific stylesheets. Twelve stylesheets were parsed successfully. Breakpoint declaration checks covered 320, 360, 375, 390, 480, 600, 700, 760, 768, 820, 1024, 1100, 1200, 1280, 1440 and 1920 pixel widths. `responsive-audit.json` records the declaration checks and their verification scope.

- Allowed buttons and long headings/links to wrap within their containers. Added minimum-width guards for grid/flex children, form fields and responsive map embeds.
- Increased exterior service arrow targets to 44px and maintained dropdown/link targets suitable for touch.
- Aligned cabinet primary stacking at 760px instead of the inconsistent 700px boundary. Stacked dense cabinet cards at phone widths and made tablet quote strips reflow.
- Stacked dense exterior-service coverage/benefit cards and location closing cards on small screens.
- Improved narrow-screen home benefits, process steps and footer columns. Made newsletter fields reflow with the action.
- Used 16px mobile text in form fields to reduce small-text input zoom behaviour; enlarged mobile footer links and checkbox/radio label targets.

Browser rendering was unavailable. These are source, CSS syntax, breakpoint and production-HTML checks, not screenshot verification, measured overflow tests, browser zoom tests or real mobile/tablet interaction tests. A full visual pass remains unverified; no claim of complete responsiveness or accessibility conformance is made.

## Validation

- Production build passed and generated all 60 normal website routes, plus framework error routes.
- All 60 pages retain their original section counts. One H1 per page; unique page titles and descriptions.
- All internal links and fragment targets, image files/alt text, page IDs and navigation ARIA targets passed checks.
- Main-content word counts exclude shared header/footer and generated scripts. The final change range is -4.9% to 13.3%; no page exceeds a 15% absolute change. Counts include guide contents and related cards, not only prose.
- CSS syntax and the selected active breakpoint declarations passed. Original interactive comparison controls remain native range inputs.
- `content-audit.json` contains the route-by-route measurements and validation results. `git diff --check` passed.

## Sources reviewed

These sources supported intent or general product guidance. Competitor offers are not this website’s offers.

| Source | What was reviewed |
| --- | --- |
| [Google: helpful, reliable content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content) | Reader purpose, descriptive headings and original useful explanation |
| [Google: spam policies](https://developers.google.com/search/docs/essentials/spam-policies) | Keyword stuffing and pages created primarily for similar search queries |
| [Google: title links](https://developers.google.com/search/docs/appearance/title-link) | Descriptive, concise titles consistent with page content |
| [Benjamin Moore: vinyl siding](https://www.benjaminmoore.com/en-ca/contractors/job-solutions/professional-how-to-guides/painting-vinyl-siding) | Substrate preparation and manufacturer-specific colour guidance |
| [Benjamin Moore: exterior preparation](https://www.benjaminmoore.com/en-us/interior-exterior-paints-stains/how-to-advice/exteriors/painting-home-exterior) | Surface preparation, product instructions and weather |
| [Sherwin-Williams: cabinet painting](https://www.sherwin-williams.com/homeowners/update-your-home-office/project-center/update-kitchen-cabinets-in-5-steps) | Cleaning, preparation, primer and application sequencing |
| [Sharrard: Burlington cabinet painting](https://www.sharrardpainting.ca/kitchen-cabinet-painters-burlington/) | Kitchen cabinet painting, spray painting and refinishing terminology |
| [Keystone Painting Group](https://www.keystonepainting.ca/) | Oakville and GTA service discovery and project planning language |
| [Hecra Painting](https://hecrapainting.ca/) | Burlington and adjacent service-area terminology |
| [Fusion Colours: Milton cabinets](https://www.fusioncolours.com/services/kitchen-cabinet-painting-and-refinishing/) | Cabinet painting/refinishing service intent |
| [Bay City Painters: Hamilton](https://www.baycitypainters.ca/services) | Exterior and cabinet service distinction |
| [McHugh: Kitchener-Waterloo services](https://www.mchughpainting.com/services) | Exterior, cabinet and regional service discovery |
| [Blueprint: Cambridge](https://www.blueprintpainting.ca/cambridge-painters) | Residential and commercial project intent |
| [705 Painters: Barrie cabinets](https://705painters.com/cabinet-painting-barrie/) | Components, preparation and cabinet repaint scope |
| [Forest City Painters: London](https://www.forestcitypainters.ca/) | London, Ontario residential service intent |
| [Qpainting: St. Catharines](https://qpaintingservices.com/) | Local exterior and cabinet service categories |
| [Performance Painters: Niagara Falls](https://www.performance-painters.com/) | Exterior components and vanity/kitchen cabinet categories |
| [Superior Painting: Welland](https://superiorpaintingniagara.com/service-areas/painters-welland/) | Local exterior and cabinet refinishing discovery |
| [Alderson: Mississauga](https://www.aldersonelitepainting.ca/painters-mississauga) | City + service query language |
| [Co Painting: North York](https://copainting.ca/painters-north-york/) | Local house/exterior/cabinet search intent |
| [GJ Pro Painting: York Region](https://www.gjpropainting.com/) | Aurora, Newmarket and surrounding service-area terminology |
| [GTA Paint: Caledon](https://gtapaint.com/locations/caledon-painters) | House painting and cabinet service intent |
| [Home To Plus: King City](https://hometopluspainting.ca/locations/king-city/) | Detailed exterior scope and access questions |
| [Great North: exterior painting](https://greatnorthpainting.com/services/exterior-painting/) | Cost, preparation, material and written-scope search intent |
| [Great North: cabinet painting](https://greatnorthpainting.com/services/cabinet-painting/) | Cost, refinishing process and replacement comparison questions |

## Measurement after publication

A verified demand analysis requires the live domain’s Search Console queries and/or Keyword Planner data. Use city and service query groups to compare impressions, clicks and enquiry quality after indexing. Do not treat this rewrite as a promise of rankings. The quote form is still a local draft tool, so it cannot currently measure delivered enquiries.
