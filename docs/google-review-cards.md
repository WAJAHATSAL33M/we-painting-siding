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

The available Google responses did not expose current individual review text, dates, stars or aggregate totals. Third-party listings showed conflicting/outdated counts. Consequently this release shows real Google profile cards and links only. It does not display invented testimonials, stale aggregate counts, guessed stars/dates, or placeholder review cards.

## Completing selected review cards

User-supplied screenshots or copied review details are needed. Request about three reviews per profile, each with the author, exact text, date as displayed, star rating and a Google review link where available. Preserve author wording and keep each review attached to its actual profile. Do not infer exact dates from relative dates without confirmation.

`app/data/google-profiles.json` is the single manual content source. Each verified entry in a profile's `reviews` array uses:

```json
{
  "id": "unique-reference",
  "author": "Exact displayed reviewer name",
  "text": "Exact verified review wording",
  "publishedDate": "YYYY-MM-DD",
  "rating": 5,
  "sourceUrl": "Google review URL",
  "verified": true
}
```

Only verified, attributed, dated entries render. Review cards include a manually-updated disclosure. There is no Review or AggregateRating structured data added to the business's own website. Reviewer photos are not invented or copied: cards use the author's initial.

## Responsive design

Two profile cards on desktop, one column on mobile. A single-profile service section uses a horizontal card on wide screens and stacked content at narrower widths. Native links are keyboard accessible, copy wraps, typography is scoped and existing header/footer/layouts remain unchanged. Reduced-motion preferences suppress card transitions.
