# Manual Google profile and review sections

No widget subscription, Google API billing, third-party script, tracking integration or automatic review synchronization.

## Placement

- Homepage: both profiles, after the project gallery and before About.
- Exterior and interior main pages: main profile, before FAQs.
- Contact: both profiles, before next steps.
- Oakville location page only: Oakville profile, before the project form. Other location pages are unchanged.

Profiles remain separate; there is no combined rating or review total. Native external links use the exact Google Maps share URLs supplied by the user and identify their new-tab behaviour.

## Verified source status — 6 November 2026

Both supplied share links resolve to the corresponding Google Maps listings:

- Main: `https://maps.app.goo.gl/6XL7bj2AhuF3Mf1j9`, We Paint Siding, Maps feature `0x882b74952c6e3c15:0xc1508a15b52e6db1`.
- Oakville: `https://maps.app.goo.gl/v5gkLXhfxVoAtqZY7`, We Paint Siding Oakville, Maps feature `0x882b43042248eba5:0x9918475cd9292ec1`.

Direct public Google Maps browser verification succeeded after the text-only retrieval attempt. The displayed snapshots are main 4.9 / 5 from 54 reviews, and Oakville 5.0 / 5 from 11 reviews, checked on 6 November 2026. These replace conflicting older directory counts.

Two short, exact excerpts per profile were verified with visible reviewer names and five-star ratings:

- Main: Jada Denis and Peter Gilbert.
- Oakville: Marcin Makowski and Tom Xu.

Excerpts are deliberately brief, labelled as selected excerpts, and preserve the original wording. Each profile contributes 18 quoted words. Reviewer photos are not copied or invented; cards use initials. Links lead to the user-supplied corresponding Google listing. There is no combined rating and no Review/AggregateRating structured data.

Google displayed relative publication dates (Jada: a month ago; Peter: 3 weeks ago; Marcin: 3 months ago; Tom: 2 months ago). Do not invent exact publication dates. The visible date is explicitly the **check date**, not the review publication date.

## Manual updates

`app/data/google-profiles.json` is the content source. Profile fields include `rating`, `reviewCount`, `verifiedOn` (ISO check date). Review entries include `id`, `author`, `text`, `rating`, `verifiedOn`, `sourceUrl` and `verified: true`.

Only verified, attributed and check-dated entries render. Recheck figures and text against Google when updating, retain each review's correct profile, and preserve author wording. The website discloses that this is manually updated; no automatic refresh or subscription is implied.

## Responsive design

Two profile cards on desktop, one column on mobile. A single-profile service section uses a horizontal card on wide screens and stacked content at narrower widths. Native links are keyboard accessible, copy wraps, typography is scoped and existing header/footer/layouts remain unchanged. Reduced-motion preferences suppress card transitions.
