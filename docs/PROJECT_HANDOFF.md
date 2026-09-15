# Fresh Pressed — September 2026 revision

The existing storefront has been revised in place. Home keeps four featured products; the complete menu and three customizers remain on Shop.

## What changed

- The exact official website SVG replaces the prototype JPEG in the header, mobile header, footer, entrance and offer. Paths, colors and proportions are preserved.
- A continuous announcement marquee has its own pause control, hover/focus pause and reduced-motion support.
- Mobile has a centered logo, consistent SVG controls, readable cards, larger touch targets and a two-column featured grid.
- Mobile category taps apply the filter and scroll results beneath the sticky header/toolbar. The selected category is centered in its horizontally scrollable row. Reduced motion uses immediate scrolling.
- Quick Add, product details and completed customizers open a right cart drawer on desktop or a bottom sheet on mobile. Each line shows its thumbnail, selections, unit price, quantity and total, with quantity editing and removal.
- The cart shows the exact amount needed for the $12 local-delivery minimum. Delivery review is disabled below it; pickup remains available. Taxes and delivery charges are not invented.
- “Good mood. Great bowl.” uses a dominant Tropical Bowl video with a smaller circular supporting photograph.
- “Big flavor. Good energy.” uses an asymmetric central video, oversized type, offset ingredient notes and its own mobile composition.
- Selected official gallery photos add the storefront exterior, bowl detail and smoothie preparation. Stronger supplied media stays in place.

## One pricing source

`site/menu.json` is the active source for prices, sizes, variants and upcharges. `site/catalog.js` derives display prices and `site/pricing.js` calculates details, builders and cart totals in integer cents. Homepage price slots use the same data. Change a price once in the JSON and rebuild.

The live official menu was checked September 13, 2026. There are 53 cards: 50 original named entries and three customizers. Thirteen coffee products now have 21 published variants. Hot Tea and Iced Tea cannot be added because the source tea table has one $3.50 entry without a clear product association. Missing coffee sizes are not offered at inferred prices. See PRICE_AUDIT.md.

`docs/MENU_DATA.json` is the unchanged historical input. It is not imported by the active site and must not be used to update current prices.

## Email offer

The 20% first-order offer collects an email, validates it, explains consent and has loading, error and success states. No coupon is revealed. In this front-end preview, no address is transmitted or stored and no email is sent; the success message says so explicitly.

`site/offer-integration.js` provides the endpoint hook. EMAIL_INTEGRATION.md specifies the server contract and Shopify/Klaviyo welcome automation. The browser does not grant a discount. Shopify checkout must validate live eligibility and discounts.

## Media, accessibility and performance

All supplied media remains available. MEDIA_MANIFEST.md records selected assets; MEDIA_MANIFEST.json inventories local media, source and usage. Category photos are identified in product details where exact named-product imagery was not supplied. No testimonials or ratings are invented.

Videos use local posters, muted inline playback and lazy source assignment. Intersection observers limit mobile playback to one visible video. Offscreen footage pauses; dialogs suspend background footage. Save-Data, reduced motion, global pause and individual controls are respected. Native dialogs contain focus and support Escape. Semantic buttons, links, form labels, live cart feedback and visible focus states remain. Optional read-only WebMCP menu search is independent of standard shopping.

## Verification and remaining integration

See QA_REPORT.md and `scripts/check-menu.mjs`. The Juise reference presented a password screen during research; the design follows the supplied creative brief without copying protected theme code.

This is a working storefront prototype, not an installable Shopify theme. It does not accept payments or create orders, subscriptions, gift cards, customer accounts or marketing subscriptions. Order review is explicitly labeled as a preview.

Before enabling real commerce, connect Shopify product/variant IDs and cart/checkout, map builder choices to approved variants or line-item properties, connect the email endpoint and welcome automation, and confirm tea pricing, hours, pickup scheduling, delivery coverage, taxes and fees. The $12 minimum currently uses merchandise total; configure the owner's approved treatment of discounts in live checkout.

Fresh Pressed: 930 Meriden-Waterbury Turnpike, Plantsville, CT 06479. Phone: (860) 426-0342. Pickup and local delivery are represented. Catering has not been added.
